import { sql, type Queryable } from '../server/db';
import { TIME_ZONE } from '../shared/labels';

export interface EarnedAchievement {
  code: string;
  name: string;
  description: string;
  icon: string;
  tier: string;
}

/** Cộng điểm kinh nghiệm; sự kiện có `ref` chỉ được cộng một lần. Trả về số điểm thực cộng. */
export async function awardXp(q: Queryable, userId: string, amount: number, reason: string, ref: string | null): Promise<number> {
  if (amount <= 0) return 0;
  const n = await q.exec(sql`
    insert into xp_events (user_id, amount, reason, ref) values (${userId}, ${amount}, ${reason}, ${ref})
    on conflict do nothing`);
  return n > 0 ? amount : 0;
}

export async function totalXp(q: Queryable, userId: string): Promise<number> {
  const r = await q.one<{ xp: number }>(sql`select coalesce(sum(amount), 0)::int as xp from xp_events where user_id = ${userId}`);
  return r?.xp ?? 0;
}

/** Số ngày luyện tập liên tiếp tính đến hôm nay (hoặc hôm qua). */
export async function practiceStreak(q: Queryable, userId: string): Promise<number> {
  const rows = await q.many<{ d: string }>(sql`
    select distinct to_char(created_at at time zone ${TIME_ZONE}, 'YYYY-MM-DD') as d
    from question_responses where user_id = ${userId} and created_at > now() - interval '120 days'
    order by d desc`);
  if (!rows.length) return 0;
  const days = rows.map((r) => r.d);
  const fmt = (t: number) => new Date(t).toLocaleDateString('en-CA', { timeZone: TIME_ZONE });
  const today = fmt(Date.now());
  const yesterday = fmt(Date.now() - 86_400_000);
  if (days[0] !== today && days[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1] + 'T00:00:00Z').getTime();
    const cur = new Date(days[i] + 'T00:00:00Z').getTime();
    if (prev - cur === 86_400_000) streak++;
    else break;
  }
  return streak;
}

interface Metrics {
  lessonsCompleted: number;
  chapterDone: boolean;
  correctDistinct: number;
  streak: number;
  testsSubmitted: number;
  perfectTest: boolean;
  challengeCorrect: number;
}

async function metrics(q: Queryable, userId: string): Promise<Metrics> {
  const m = await q.one<Omit<Metrics, 'streak' | 'chapterDone'>>(sql`
    select
      (select count(*)::int from learning_progress where user_id = ${userId} and status = 'completed') as lessons_completed,
      (select count(distinct question_id)::int from question_responses where user_id = ${userId} and status = 'correct') as correct_distinct,
      (select count(*)::int from test_results where student_id = ${userId} and status in ('submitted', 'graded')) as tests_submitted,
      exists (select 1 from test_results where student_id = ${userId} and status = 'graded' and max_score > 0 and score = max_score) as perfect_test,
      (select count(distinct question_id)::int from question_responses where user_id = ${userId} and context = 'challenge' and status = 'correct') as challenge_correct`);
  const chapter = await q.one<{ done: boolean }>(sql`
    select exists (
      select 1 from chapters c
      where c.kind = 'chapter'
        and exists (select 1 from lessons l where l.chapter_id = c.id and l.status = 'published')
        and not exists (
          select 1 from lessons l where l.chapter_id = c.id and l.status = 'published'
            and not exists (select 1 from learning_progress p where p.lesson_id = l.id and p.user_id = ${userId} and p.status = 'completed'))
    ) as done`);
  return { ...m!, chapterDone: !!chapter?.done, streak: await practiceStreak(q, userId) };
}

const RULES: Record<string, (m: Metrics, xp: number) => boolean> = {
  first_lesson: (m) => m.lessonsCompleted >= 1,
  lessons_5: (m) => m.lessonsCompleted >= 5,
  chapter_done: (m) => m.chapterDone,
  correct_10: (m) => m.correctDistinct >= 10,
  correct_50: (m) => m.correctDistinct >= 50,
  streak_3: (m) => m.streak >= 3,
  first_test: (m) => m.testsSubmitted >= 1,
  perfect_test: (m) => m.perfectTest,
  challenge_3: (m) => m.challengeCorrect >= 3,
  xp_500: (_, xp) => xp >= 500,
};

/** Kiểm tra và trao huy hiệu mới đạt được (kèm điểm thưởng). Chỉ áp dụng cho học sinh. */
export async function evaluateAchievements(q: Queryable, userId: string): Promise<EarnedAchievement[]> {
  const role = await q.one<{ code: string }>(sql`select r.code from users u join roles r on r.id = u.role_id where u.id = ${userId}`);
  if (role?.code !== 'student') return [];
  const all = await q.many<EarnedAchievement & { id: number; xpReward: number; earned: boolean }>(sql`
    select a.id, a.code, a.name, a.description, a.icon, a.tier, a.xp_reward,
      exists (select 1 from user_achievements ua where ua.achievement_id = a.id and ua.user_id = ${userId}) as earned
    from achievements a order by a.sort_order`);
  const pending = all.filter((a) => !a.earned && RULES[a.code]);
  if (!pending.length) return [];
  const m = await metrics(q, userId);
  const earned: EarnedAchievement[] = [];
  // Hai lượt: phần thưởng của huy hiệu lượt đầu có thể giúp đạt mốc điểm (xp_500)
  for (let pass = 0; pass < 2; pass++) {
    const xp = await totalXp(q, userId);
    for (const a of pending) {
      if (earned.some((e) => e.code === a.code)) continue;
      if (!RULES[a.code](m, xp)) continue;
      const n = await q.exec(sql`insert into user_achievements (user_id, achievement_id) values (${userId}, ${a.id}) on conflict do nothing`);
      if (n > 0) {
        await awardXp(q, userId, a.xpReward, 'achievement', a.code);
        earned.push({ code: a.code, name: a.name, description: a.description, icon: a.icon, tier: a.tier });
      }
    }
  }
  return earned;
}

export interface AchievementView extends EarnedAchievement {
  earnedAt: Date | null;
  xpReward: number;
}

export async function listAchievements(q: Queryable, userId: string | null): Promise<AchievementView[]> {
  return q.many<AchievementView>(sql`
    select a.code, a.name, a.description, a.icon, a.tier, a.xp_reward, ua.earned_at
    from achievements a left join user_achievements ua on ua.achievement_id = a.id and ua.user_id = ${userId}
    order by a.sort_order`);
}

export interface LeaderRow {
  userId: string;
  fullName: string;
  xp: number;
  rank: number;
}

/** Bảng xếp hạng học sinh theo điểm kinh nghiệm (toàn bộ hoặc 7 ngày gần nhất, có thể lọc theo lớp). */
export async function leaderboard(q: Queryable, opts: { range: 'all' | 'week'; classId?: number | null; limit: number }): Promise<LeaderRow[]> {
  const since = opts.range === 'week' ? sql`and e.created_at > now() - interval '7 days'` : sql.empty;
  const classFilter = opts.classId ? sql`and u.id in (select student_id from class_members where class_id = ${opts.classId})` : sql.empty;
  return q.many<LeaderRow>(sql`
    select u.id as user_id, u.full_name, sum(e.amount)::int as xp,
      rank() over (order by sum(e.amount) desc)::int as rank
    from xp_events e join users u on u.id = e.user_id join roles r on r.id = u.role_id
    where r.code = 'student' and u.status = 'active' ${since} ${classFilter}
    group by u.id, u.full_name
    having sum(e.amount) > 0
    order by xp desc, u.full_name
    limit ${opts.limit}`);
}

export async function userRank(q: Queryable, userId: string): Promise<number | null> {
  const r = await q.one<{ rank: number }>(sql`
    select rank from (
      select e.user_id, rank() over (order by sum(e.amount) desc)::int as rank
      from xp_events e join users u on u.id = e.user_id join roles r on r.id = u.role_id
      where r.code = 'student' group by e.user_id
    ) x where user_id = ${userId}`);
  return r?.rank ?? null;
}
