import { sql, type Database, type Queryable } from '../server/db';
import { awardXp, evaluateAchievements, practiceStreak, totalXp, userRank, type EarnedAchievement } from './gamification';
import { levelFromXp } from '../shared/grading';

export const XP_LESSON_COMPLETED = 20;

/** Ghi nhận học sinh mở bài học (đang học). */
export async function touchLesson(q: Queryable, userId: string, lessonId: number) {
  await q.exec(sql`
    insert into learning_progress (user_id, lesson_id) values (${userId}, ${lessonId})
    on conflict (user_id, lesson_id) do update set last_viewed_at = now(), view_count = learning_progress.view_count + 1`);
}

export async function completeLesson(db: Database, userId: string, lessonId: number): Promise<{ xp: number; achievements: EarnedAchievement[] }> {
  return db.tx(async (t) => {
    await t.exec(sql`
      insert into learning_progress (user_id, lesson_id, status, completed_at) values (${userId}, ${lessonId}, 'completed', now())
      on conflict (user_id, lesson_id) do update set status = 'completed', completed_at = coalesce(learning_progress.completed_at, now()), last_viewed_at = now()`);
    const xp = await awardXp(t, userId, XP_LESSON_COMPLETED, 'lesson_completed', `lesson:${lessonId}`);
    const achievements = await evaluateAchievements(t, userId);
    return { xp, achievements };
  });
}

export async function reopenLesson(q: Queryable, userId: string, lessonId: number) {
  await q.exec(sql`update learning_progress set status = 'in_progress', completed_at = null where user_id = ${userId} and lesson_id = ${lessonId}`);
}

export interface ContinueLesson {
  slug: string;
  textbookSlug: string;
  title: string;
  number: number | null;
  kind: string;
  chapterCode: string;
  chapterTitle: string;
  status: string;
  lastViewedAt: Date;
}

export async function continueLesson(q: Queryable, userId: string): Promise<ContinueLesson | null> {
  return q.one<ContinueLesson>(sql`
    select l.slug, t.slug as textbook_slug, l.title, l.number, l.kind, c.code as chapter_code, c.title as chapter_title, p.status, p.last_viewed_at
    from learning_progress p join lessons l on l.id = p.lesson_id join chapters c on c.id = l.chapter_id join textbooks t on t.id = l.textbook_id
    where p.user_id = ${userId} and l.status = 'published'
    order by (p.status = 'in_progress') desc, p.last_viewed_at desc limit 1`);
}

export interface UserStats {
  lessonsCompleted: number;
  lessonsInProgress: number;
  lessonsTotal: number;
  answered: number;
  correct: number;
  graded: number;
  accuracy: number;
  xp: number;
  level: number;
  levelCurrent: number;
  levelNext: number;
  streak: number;
  rank: number | null;
  badges: number;
}

export async function userStats(q: Queryable, userId: string, textbookId: number | null): Promise<UserStats> {
  const r = await q.one<{
    lessonsCompleted: number;
    lessonsInProgress: number;
    lessonsTotal: number;
    answered: number;
    correct: number;
    graded: number;
    badges: number;
  }>(sql`
    select
      (select count(*)::int from learning_progress p join lessons l on l.id = p.lesson_id
        where p.user_id = ${userId} and p.status = 'completed' and (${textbookId}::int is null or l.textbook_id = ${textbookId})) as lessons_completed,
      (select count(*)::int from learning_progress p join lessons l on l.id = p.lesson_id
        where p.user_id = ${userId} and p.status = 'in_progress' and (${textbookId}::int is null or l.textbook_id = ${textbookId})) as lessons_in_progress,
      (select count(*)::int from lessons l where l.status = 'published' and (${textbookId}::int is null or l.textbook_id = ${textbookId})) as lessons_total,
      (select count(*)::int from question_responses where user_id = ${userId}) as answered,
      (select count(*)::int from question_responses where user_id = ${userId} and status = 'correct') as correct,
      (select count(*)::int from question_responses where user_id = ${userId} and status <> 'pending') as graded,
      (select count(*)::int from user_achievements where user_id = ${userId}) as badges`);
  const xp = await totalXp(q, userId);
  const lv = levelFromXp(xp);
  return {
    ...r!,
    accuracy: r!.graded ? Math.round((r!.correct / r!.graded) * 100) : 0,
    xp,
    level: lv.level,
    levelCurrent: lv.current,
    levelNext: lv.next,
    streak: await practiceStreak(q, userId),
    rank: await userRank(q, userId),
  };
}

export interface ChapterProgress {
  code: string;
  title: string;
  kind: string;
  total: number;
  completed: number;
  answered: number;
  correct: number;
}

export async function chapterProgress(q: Queryable, userId: string, textbookId: number): Promise<ChapterProgress[]> {
  return q.many<ChapterProgress>(sql`
    select c.code, c.title, c.kind,
      count(l.id) filter (where l.status = 'published')::int as total,
      count(p.lesson_id) filter (where p.status = 'completed' and l.status = 'published')::int as completed,
      (select count(*)::int from question_responses r join questions qq on qq.id = r.question_id join lessons l2 on l2.id = qq.lesson_id
        where r.user_id = ${userId} and l2.chapter_id = c.id and r.status <> 'pending') as answered,
      (select count(*)::int from question_responses r join questions qq on qq.id = r.question_id join lessons l2 on l2.id = qq.lesson_id
        where r.user_id = ${userId} and l2.chapter_id = c.id and r.status = 'correct') as correct
    from chapters c
    left join lessons l on l.chapter_id = c.id
    left join learning_progress p on p.lesson_id = l.id and p.user_id = ${userId}
    where c.textbook_id = ${textbookId}
    group by c.id order by c.sort_order`);
}

export interface HistoryRow {
  id: number;
  createdAt: Date;
  status: string;
  context: string;
  score: number | null;
  questionId: number;
  stem: string;
  type: string;
  lessonTitle: string | null;
  lessonNumber: number | null;
  lessonKind: string | null;
  lessonSlug: string | null;
}

export async function practiceHistory(q: Queryable, userId: string, limit = 25): Promise<HistoryRow[]> {
  return q.many<HistoryRow>(sql`
    select r.id, r.created_at, r.status, r.context, r.score, qq.id as question_id, qq.stem, et.code as type,
      l.title as lesson_title, l.number as lesson_number, l.kind as lesson_kind, l.slug as lesson_slug
    from question_responses r join questions qq on qq.id = r.question_id join exercise_types et on et.id = qq.exercise_type_id
    left join lessons l on l.id = qq.lesson_id
    where r.user_id = ${userId}
    order by r.created_at desc limit ${limit}`);
}

export async function platformStats(q: Queryable) {
  return (await q.one<{ lessons: number; lessonsWithContent: number; questions: number; students: number }>(sql`
    select
      (select count(*)::int from lessons where status = 'published') as lessons,
      (select count(distinct lesson_id)::int from lesson_sections) as lessons_with_content,
      (select count(*)::int from questions where status = 'published') as questions,
      (select count(*)::int from users u join roles r on r.id = u.role_id where r.code = 'student' and u.status = 'active') as students`))!;
}
