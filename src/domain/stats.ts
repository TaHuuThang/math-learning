import { sql, type Queryable } from '../server/db';
import type { SessionUser } from '../server/http/context';

export async function teacherOverview(q: Queryable, user: SessionUser) {
  const all = user.role === 'admin';
  return (await q.one<{
    classes: number;
    students: number;
    questionsMine: number;
    questionsPublished: number;
    tests: number;
    testsPublished: number;
    submissions7d: number;
    activeStudents7d: number;
  }>(sql`
    select
      (select count(*)::int from classes c where c.status = 'active' and (${all}::boolean or c.teacher_id = ${user.id})) as classes,
      (select count(distinct m.student_id)::int from class_members m join classes c on c.id = m.class_id
        where ${all}::boolean or c.teacher_id = ${user.id}) as students,
      (select count(*)::int from questions where created_by = ${user.id} and status <> 'archived') as questions_mine,
      (select count(*)::int from questions where status = 'published') as questions_published,
      (select count(*)::int from tests t where ${all}::boolean or t.created_by = ${user.id}) as tests,
      (select count(*)::int from tests t where t.status = 'published' and (${all}::boolean or t.created_by = ${user.id})) as tests_published,
      (select count(*)::int from test_results r join tests t on t.id = r.test_id
        where r.submitted_at > now() - interval '7 days' and (${all}::boolean or t.created_by = ${user.id})) as submissions7d,
      (select count(distinct r.user_id)::int from question_responses r
        where r.created_at > now() - interval '7 days'
          and r.user_id in (select m.student_id from class_members m join classes c on c.id = m.class_id where ${all}::boolean or c.teacher_id = ${user.id})
      ) as active_students7d`))!;
}

export interface ChapterStat {
  code: string;
  title: string;
  kind: string;
  answered: number;
  correct: number;
  students: number;
}

/** Tỉ lệ đúng theo chương của học sinh trong một lớp (hoặc mọi lớp của giáo viên). */
export async function chapterStats(q: Queryable, studentIds: string[], textbookId: number): Promise<ChapterStat[]> {
  return q.many<ChapterStat>(sql`
    select c.code, c.title, c.kind,
      count(r.id) filter (where r.status <> 'pending')::int as answered,
      count(r.id) filter (where r.status = 'correct')::int as correct,
      count(distinct r.user_id)::int as students
    from chapters c
    left join lessons l on l.chapter_id = c.id
    left join questions qq on qq.lesson_id = l.id
    left join question_responses r on r.question_id = qq.id and r.user_id = any(${studentIds}::uuid[])
    where c.textbook_id = ${textbookId}
    group by c.id order by c.sort_order`);
}

export async function lessonCompletionStats(q: Queryable, studentIds: string[], textbookId: number) {
  return q.many<{ code: string; title: string; kind: string; lessons: number; completions: number }>(sql`
    select c.code, c.title, c.kind, count(distinct l.id)::int as lessons,
      count(p.user_id) filter (where p.status = 'completed')::int as completions
    from chapters c join lessons l on l.chapter_id = c.id and l.status = 'published'
    left join learning_progress p on p.lesson_id = l.id and p.user_id = any(${studentIds}::uuid[])
    where c.textbook_id = ${textbookId}
    group by c.id order by c.sort_order`);
}

export async function hardestQuestions(q: Queryable, studentIds: string[], limit = 8) {
  return q.many<{ id: number; stem: string; type: string; answered: number; correct: number; rate: number; lessonTitle: string | null; lessonNumber: number | null; lessonKind: string | null }>(sql`
    select qq.id, qq.stem, et.code as type, count(r.id)::int as answered,
      count(r.id) filter (where r.status = 'correct')::int as correct,
      round(100.0 * count(r.id) filter (where r.status = 'correct') / count(r.id))::int as rate,
      l.title as lesson_title, l.number as lesson_number, l.kind as lesson_kind
    from question_responses r join questions qq on qq.id = r.question_id join exercise_types et on et.id = qq.exercise_type_id
    left join lessons l on l.id = qq.lesson_id
    where r.user_id = any(${studentIds}::uuid[]) and r.status <> 'pending'
    group by qq.id, et.code, l.id
    having count(r.id) >= 3
    order by rate asc, answered desc limit ${limit}`);
}

export async function testAverages(q: Queryable, user: SessionUser, classId: number | null) {
  const all = user.role === 'admin';
  return q.many<{ id: number; title: string; submitted: number; avgTen: number | null; status: string }>(sql`
    select t.id, t.title, t.status,
      count(r.id) filter (where r.status <> 'in_progress')::int as submitted,
      avg(10.0 * r.score / nullif(r.max_score, 0)) filter (where r.status <> 'in_progress')::float as avg_ten
    from tests t left join test_results r on r.test_id = t.id
      and (${classId}::int is null or r.student_id in (select student_id from class_members where class_id = ${classId}))
    where (${all}::boolean or t.created_by = ${user.id})
      and (${classId}::int is null or exists (select 1 from test_assignments a where a.test_id = t.id and a.class_id = ${classId}))
    group by t.id order by t.created_at desc limit 20`);
}

export async function systemInfo(q: Queryable) {
  return (await q.one<{ version: string; migrations: string; users: number; sessions: number; dbSize: string }>(sql`
    select version() as version,
      (select string_agg(version, ', ' order by version) from schema_migrations) as migrations,
      (select count(*)::int from users) as users,
      (select count(*)::int from sessions where expires_at > now()) as sessions,
      pg_size_pretty(pg_database_size(current_database())) as db_size`))!;
}
