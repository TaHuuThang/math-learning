import { sql, type Database, type Queryable } from '../server/db';
import type { SessionUser } from '../server/http/context';
import { gradeResponse, isAutoGraded, normalizeResponse, toTenScale, type GradeStatus, type ResponsePayload } from '../shared/grading';
import { awardXp, evaluateAchievements, type EarnedAchievement } from './gamification';
import { getQuestions, revealAnswer, toView, type AnswerReveal, type QuestionView } from './questions';
import { UserInputError } from './users';

/** Cho phép nộp muộn tối đa 60 giây so với hạn (bù trễ mạng). */
const GRACE_MS = 60_000;

export interface TestRow {
  id: number;
  title: string;
  description: string | null;
  durationMinutes: number | null;
  status: 'draft' | 'published' | 'closed';
  showAnswers: boolean;
  maxAttempts: number;
  opensAt: Date | null;
  closesAt: Date | null;
  createdBy: string;
  createdByName: string;
  createdAt: Date;
  questionCount: number;
  totalPoints: number;
  classNames: string | null;
  submissions: number;
  pendingManual: number;
}

const TEST_SELECT = sql`
  select t.id, t.title, t.description, t.duration_minutes, t.status, t.show_answers, t.max_attempts, t.opens_at, t.closes_at,
    t.created_by, u.full_name as created_by_name, t.created_at,
    (select count(*)::int from test_questions tq where tq.test_id = t.id) as question_count,
    (select coalesce(sum(points), 0)::float from test_questions tq where tq.test_id = t.id) as total_points,
    (select string_agg(c.name, ', ' order by c.name) from test_assignments a join classes c on c.id = a.class_id where a.test_id = t.id) as class_names,
    (select count(*)::int from test_results r where r.test_id = t.id and r.status <> 'in_progress') as submissions,
    (select coalesce(sum(pending_manual), 0)::int from test_results r where r.test_id = t.id) as pending_manual
  from tests t join users u on u.id = t.created_by`;

export async function listTestsForTeacher(q: Queryable, user: SessionUser): Promise<TestRow[]> {
  const all = user.role === 'admin';
  return q.many<TestRow>(sql`${TEST_SELECT} where (${all}::boolean or t.created_by = ${user.id}) order by t.created_at desc`);
}

export async function getTestForTeacher(q: Queryable, id: number, user: SessionUser): Promise<TestRow | null> {
  const t = await q.one<TestRow>(sql`${TEST_SELECT} where t.id = ${id}`);
  if (!t || (user.role !== 'admin' && t.createdBy !== user.id)) return null;
  return t;
}

export interface TestInput {
  title: string;
  description: string;
  durationMinutes: number | null;
  showAnswers: boolean;
  maxAttempts: number;
  opensAt: Date | null;
  closesAt: Date | null;
}

export function validateTestInput(input: TestInput): string[] {
  const errors: string[] = [];
  if (!input.title.trim()) errors.push('Nhập tên đề kiểm tra.');
  if (input.title.length > 200) errors.push('Tên đề tối đa 200 kí tự.');
  if (input.durationMinutes !== null && !(input.durationMinutes >= 1 && input.durationMinutes <= 240)) errors.push('Thời gian làm bài từ 1 đến 240 phút (để trống nếu không giới hạn).');
  if (!(input.maxAttempts >= 1 && input.maxAttempts <= 10)) errors.push('Số lần làm từ 1 đến 10.');
  if (input.opensAt && input.closesAt && input.closesAt <= input.opensAt) errors.push('Thời điểm đóng phải sau thời điểm mở.');
  return errors;
}

export async function createTest(q: Queryable, textbookId: number, userId: string, input: TestInput) {
  const row = await q.one<{ id: number }>(sql`
    insert into tests (textbook_id, title, description, duration_minutes, show_answers, max_attempts, opens_at, closes_at, created_by)
    values (${textbookId}, ${input.title.trim()}, ${input.description.trim() || null}, ${input.durationMinutes}, ${input.showAnswers},
      ${input.maxAttempts}, ${input.opensAt}, ${input.closesAt}, ${userId})
    returning id`);
  return row!.id;
}

export async function updateTest(q: Queryable, id: number, input: TestInput) {
  await q.exec(sql`
    update tests set title = ${input.title.trim()}, description = ${input.description.trim() || null}, duration_minutes = ${input.durationMinutes},
      show_answers = ${input.showAnswers}, max_attempts = ${input.maxAttempts}, opens_at = ${input.opensAt}, closes_at = ${input.closesAt},
      updated_at = now()
    where id = ${id}`);
}

export interface TestQuestionRow {
  questionId: number;
  sortOrder: number;
  points: number;
  type: string;
  level: number;
  stem: string;
  status: string;
  lessonTitle: string | null;
  lessonNumber: number | null;
  lessonKind: string | null;
}

export async function testQuestions(q: Queryable, testId: number): Promise<TestQuestionRow[]> {
  const rows = await q.many<TestQuestionRow>(sql`
    select tq.question_id, tq.sort_order, tq.points, et.code as type, qq.level, qq.stem, qq.status,
      l.title as lesson_title, l.number as lesson_number, l.kind as lesson_kind
    from test_questions tq join questions qq on qq.id = tq.question_id join exercise_types et on et.id = qq.exercise_type_id
    left join lessons l on l.id = qq.lesson_id
    where tq.test_id = ${testId} order by tq.sort_order`);
  return rows.map((r) => ({ ...r, points: Number(r.points) }));
}

export async function hasSubmissions(q: Queryable, testId: number) {
  return !!(await q.one(sql`select 1 from test_results where test_id = ${testId}`));
}

export async function addQuestionsToTest(db: Database, testId: number, questionIds: number[]) {
  if (await hasSubmissions(db, testId)) throw new UserInputError('Đề đã có học sinh làm bài nên không thể thay đổi câu hỏi.');
  await db.tx(async (t) => {
    const max = await t.one<{ m: number }>(sql`select coalesce(max(sort_order), 0)::int as m from test_questions where test_id = ${testId}`);
    let order = max!.m;
    for (const qid of questionIds) {
      const qq = await t.one<{ points: number }>(sql`select points from questions where id = ${qid} and status = 'published'`);
      if (!qq) continue;
      const n = await t.exec(sql`
        insert into test_questions (test_id, question_id, sort_order, points) values (${testId}, ${qid}, ${order + 1}, ${qq.points})
        on conflict do nothing`);
      if (n) order++;
    }
  });
}

export async function removeQuestionFromTest(db: Database, testId: number, questionId: number) {
  if (await hasSubmissions(db, testId)) throw new UserInputError('Đề đã có học sinh làm bài nên không thể thay đổi câu hỏi.');
  await db.exec(sql`delete from test_questions where test_id = ${testId} and question_id = ${questionId}`);
}

export async function moveQuestionInTest(db: Database, testId: number, questionId: number, dir: -1 | 1) {
  await db.tx(async (t) => {
    const rows = await t.many<{ questionId: number }>(sql`select question_id from test_questions where test_id = ${testId} order by sort_order`);
    const i = rows.findIndex((r) => r.questionId === questionId);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= rows.length) return;
    [rows[i], rows[j]] = [rows[j], rows[i]];
    for (const [k, r] of rows.entries()) {
      await t.exec(sql`update test_questions set sort_order = ${k + 1} where test_id = ${testId} and question_id = ${r.questionId}`);
    }
  });
}

export async function setQuestionPoints(db: Database, testId: number, questionId: number, points: number) {
  if (!(points > 0 && points <= 100)) throw new UserInputError('Điểm mỗi câu phải lớn hơn 0 và không quá 100.');
  if (await hasSubmissions(db, testId)) throw new UserInputError('Đề đã có học sinh làm bài nên không thể đổi điểm.');
  await db.exec(sql`update test_questions set points = ${points} where test_id = ${testId} and question_id = ${questionId}`);
}

export async function testAssignments(q: Queryable, testId: number) {
  return (await q.many<{ classId: number }>(sql`select class_id from test_assignments where test_id = ${testId}`)).map((r) => r.classId);
}

export async function setAssignments(db: Database, testId: number, user: SessionUser, classIds: number[]) {
  await db.tx(async (t) => {
    await t.exec(sql`delete from test_assignments where test_id = ${testId}`);
    for (const cid of classIds) {
      await t.exec(sql`
        insert into test_assignments (test_id, class_id)
        select ${testId}, c.id from classes c where c.id = ${cid} and (${user.role === 'admin'}::boolean or c.teacher_id = ${user.id})`);
    }
  });
}

export async function setTestStatus(db: Database, test: TestRow, status: 'draft' | 'published' | 'closed') {
  if (status === 'published') {
    if (test.questionCount === 0) throw new UserInputError('Đề chưa có câu hỏi nào.');
    const assigned = await testAssignments(db, test.id);
    if (!assigned.length) throw new UserInputError('Chọn ít nhất một lớp được giao đề trước khi phát đề.');
  }
  await db.exec(sql`update tests set status = ${status}, updated_at = now() where id = ${test.id}`);
}

export async function deleteTest(db: Database, testId: number) {
  if (await hasSubmissions(db, testId)) throw new UserInputError('Đề đã có bài làm. Hãy "Đóng đề" thay vì xóa để giữ kết quả.');
  await db.exec(sql`delete from tests where id = ${testId}`);
}

// ---------------- Phía học sinh ----------------

export interface StudentTestRow {
  id: number;
  title: string;
  description: string | null;
  durationMinutes: number | null;
  maxAttempts: number;
  opensAt: Date | null;
  closesAt: Date | null;
  status: string;
  questionCount: number;
  teacherName: string;
  attempts: number;
  inProgressId: number | null;
  bestScore: number | null;
  bestMax: number | null;
  lastResultId: number | null;
  pendingManual: number;
}

export async function listTestsForStudent(q: Queryable, studentId: string): Promise<StudentTestRow[]> {
  return q.many<StudentTestRow>(sql`
    select t.id, t.title, t.description, t.duration_minutes, t.max_attempts, t.opens_at, t.closes_at, t.status,
      (select count(*)::int from test_questions tq where tq.test_id = t.id) as question_count,
      u.full_name as teacher_name,
      (select count(*)::int from test_results r where r.test_id = t.id and r.student_id = ${studentId}) as attempts,
      (select r.id from test_results r where r.test_id = t.id and r.student_id = ${studentId} and r.status = 'in_progress' limit 1) as in_progress_id,
      (select max(r.score)::float from test_results r where r.test_id = t.id and r.student_id = ${studentId} and r.status <> 'in_progress') as best_score,
      (select max(r.max_score)::float from test_results r where r.test_id = t.id and r.student_id = ${studentId} and r.status <> 'in_progress') as best_max,
      (select r.id from test_results r where r.test_id = t.id and r.student_id = ${studentId} and r.status <> 'in_progress' order by r.submitted_at desc limit 1) as last_result_id,
      (select coalesce(sum(r.pending_manual), 0)::int from test_results r where r.test_id = t.id and r.student_id = ${studentId}) as pending_manual
    from tests t join users u on u.id = t.created_by
    where t.status in ('published', 'closed')
      and exists (select 1 from test_assignments a join class_members m on m.class_id = a.class_id where a.test_id = t.id and m.student_id = ${studentId})
    order by (t.status = 'published') desc, t.created_at desc`);
}

export async function studentTest(q: Queryable, testId: number, studentId: string) {
  return (await listTestsForStudent(q, studentId)).find((t) => t.id === testId) ?? null;
}

export function testAvailability(t: { status: string; opensAt: Date | null; closesAt: Date | null }, now = new Date()): 'open' | 'not_yet' | 'closed' {
  if (t.status !== 'published') return 'closed';
  if (t.opensAt && now < t.opensAt) return 'not_yet';
  if (t.closesAt && now > t.closesAt) return 'closed';
  return 'open';
}

export async function startAttempt(db: Database, testId: number, studentId: string): Promise<number> {
  return db.tx(async (t) => {
    const test = await studentTest(t, testId, studentId);
    if (!test) throw new UserInputError('Bạn không được giao đề kiểm tra này.');
    if (test.inProgressId) return test.inProgressId;
    if (testAvailability(test) !== 'open') throw new UserInputError('Đề kiểm tra hiện không mở.');
    if (test.attempts >= test.maxAttempts) throw new UserInputError('Bạn đã dùng hết số lần làm bài.');
    // khóa hàng để tránh tạo 2 lượt làm cùng lúc
    await t.one(sql`select id from tests where id = ${testId} for update`);
    const deadline = test.durationMinutes ? sql`now() + make_interval(mins => ${test.durationMinutes})` : sql`null`;
    const row = await t.one<{ id: number }>(sql`
      insert into test_results (test_id, student_id, attempt_no, deadline_at)
      values (${testId}, ${studentId}, ${test.attempts + 1}, ${deadline})
      on conflict (test_id, student_id, attempt_no) do nothing
      returning id`);
    if (!row) throw new UserInputError('Lượt làm bài đã được tạo, hãy tải lại trang.');
    return row.id;
  });
}

export interface AttemptRow {
  id: number;
  testId: number;
  studentId: string;
  studentName: string;
  attemptNo: number;
  status: 'in_progress' | 'submitted' | 'graded';
  draftAnswers: Record<string, unknown>;
  startedAt: Date;
  deadlineAt: Date | null;
  submittedAt: Date | null;
  score: number | null;
  maxScore: number | null;
  pendingManual: number;
  title: string;
  showAnswers: boolean;
  testCreatedBy: string;
  closesAt: Date | null;
}

export async function getAttempt(q: Queryable, resultId: number): Promise<AttemptRow | null> {
  const r = await q.one<AttemptRow>(sql`
    select r.id, r.test_id, r.student_id, u.full_name as student_name, r.attempt_no, r.status, r.draft_answers, r.started_at, r.deadline_at,
      r.submitted_at, r.score::float as score, r.max_score::float as max_score, r.pending_manual,
      t.title, t.show_answers, t.created_by as test_created_by, t.closes_at
    from test_results r join tests t on t.id = r.test_id join users u on u.id = r.student_id where r.id = ${resultId}`);
  return r;
}

export async function attemptQuestionViews(q: Queryable, testId: number): Promise<(QuestionView & { testPoints: number })[]> {
  const tq = await testQuestions(q, testId);
  const full = await getQuestions(q, tq.map((r) => r.questionId));
  return full.map((f) => ({ ...toView(f, false), testPoints: tq.find((r) => r.questionId === f.id)!.points }));
}

export async function saveDraft(q: Queryable, attempt: AttemptRow, answers: Record<string, unknown>) {
  if (attempt.status !== 'in_progress') throw new UserInputError('Bài đã nộp.');
  if (attempt.deadlineAt && Date.now() > attempt.deadlineAt.getTime() + GRACE_MS) throw new UserInputError('Đã hết giờ làm bài.');
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(answers).slice(0, 200)) if (/^\d+$/.test(k)) clean[k] = v;
  await q.exec(sql`update test_results set draft_answers = ${clean} where id = ${attempt.id} and status = 'in_progress'`);
}

/** Chấm và khóa bài. Nộp sau hạn quá 60 giây thì chỉ chấm phần đã lưu nháp. */
export async function submitAttempt(
  db: Database,
  attempt: AttemptRow,
  answers: Record<string, unknown> | null,
): Promise<{ score: number; maxScore: number; pending: number; xp: number; achievements: EarnedAchievement[] }> {
  return db.tx(async (t) => {
    const locked = await t.one<{ status: string; draftAnswers: Record<string, unknown> }>(sql`
      select status, draft_answers from test_results where id = ${attempt.id} for update`);
    if (!locked || locked.status !== 'in_progress') throw new UserInputError('Bài này đã được nộp trước đó.');
    const late = attempt.deadlineAt && Date.now() > attempt.deadlineAt.getTime() + GRACE_MS;
    const source = !late && answers ? answers : locked.draftAnswers;
    const tq = await testQuestions(t, attempt.testId);
    const full = await getQuestions(t, tq.map((r) => r.questionId));
    let score = 0;
    let maxScore = 0;
    let pending = 0;
    for (const qf of full) {
      const pts = tq.find((r) => r.questionId === qf.id)!.points;
      maxScore += pts;
      const resp: ResponsePayload | null = normalizeResponse(qf.type, source[String(qf.id)]);
      const grade = gradeResponse(qf.type, qf.answers, qf.settings, resp);
      if (grade.status === 'pending') pending++;
      const awarded = grade.score === null ? null : Math.round(grade.score * pts * 100) / 100;
      score += awarded ?? 0;
      await t.exec(sql`
        insert into question_responses (user_id, question_id, test_result_id, context, response, status, score, points_awarded)
        values (${attempt.studentId}, ${qf.id}, ${attempt.id}, 'test', ${resp ?? { kind: 'empty' }}, ${grade.status}, ${grade.score}, ${awarded})`);
    }
    score = Math.round(score * 100) / 100;
    await t.exec(sql`
      update test_results set status = ${pending ? 'submitted' : 'graded'}, submitted_at = now(), score = ${score}, max_score = ${maxScore},
        pending_manual = ${pending}, draft_answers = '{}'::jsonb
      where id = ${attempt.id}`);
    const ten = toTenScale(score, maxScore);
    const xp = (await awardXp(t, attempt.studentId, 20 + Math.round(ten * 3), 'test_submitted', `test:${attempt.testId}`)) || 0;
    const achievements = await evaluateAchievements(t, attempt.studentId);
    return { score, maxScore, pending, xp, achievements };
  });
}

export interface ResultQuestion extends QuestionView, AnswerReveal {
  testPoints: number;
  responseId: number | null;
  response: unknown;
  status: GradeStatus | null;
  pointsAwarded: number | null;
  feedback: string | null;
  autoGraded: boolean;
}

export async function resultDetails(q: Queryable, attempt: AttemptRow, reveal: boolean): Promise<ResultQuestion[]> {
  const tq = await testQuestions(q, attempt.testId);
  const full = await getQuestions(q, tq.map((r) => r.questionId));
  const responses = await q.many<{ id: number; questionId: number; response: unknown; status: GradeStatus; pointsAwarded: number | null; feedback: string | null }>(sql`
    select id, question_id, response, status, points_awarded::float as points_awarded, feedback
    from question_responses where test_result_id = ${attempt.id}`);
  return full.map((f) => {
    const r = responses.find((x) => x.questionId === f.id);
    return {
      ...toView(f, false),
      ...(reveal ? revealAnswer(f) : {}),
      testPoints: tq.find((x) => x.questionId === f.id)!.points,
      responseId: r?.id ?? null,
      response: r?.response ?? null,
      status: r?.status ?? null,
      pointsAwarded: r?.pointsAwarded ?? null,
      feedback: r?.feedback ?? null,
      autoGraded: isAutoGraded(f.type),
    };
  });
}

/** Giáo viên chấm câu tự luận; cập nhật lại tổng điểm bài. */
export async function gradeManual(db: Database, attempt: AttemptRow, responseId: number, points: number, maxPoints: number, feedback: string, graderId: string) {
  if (!(points >= 0 && points <= maxPoints)) throw new UserInputError(`Điểm phải từ 0 đến ${maxPoints}.`);
  await db.tx(async (t) => {
    const n = await t.exec(sql`
      update question_responses set points_awarded = ${points}, score = ${maxPoints ? points / maxPoints : 0},
        status = ${points >= maxPoints ? 'correct' : points > 0 ? 'partial' : 'incorrect'},
        feedback = ${feedback.trim() || null}, graded_by = ${graderId}, graded_at = now()
      where id = ${responseId} and test_result_id = ${attempt.id}`);
    if (!n) throw new UserInputError('Không tìm thấy câu trả lời cần chấm.');
    const agg = await t.one<{ score: number; pending: number }>(sql`
      select coalesce(sum(points_awarded), 0)::float as score, count(*) filter (where status = 'pending')::int as pending
      from question_responses where test_result_id = ${attempt.id}`);
    await t.exec(sql`
      update test_results set score = ${Math.round(agg!.score * 100) / 100}, pending_manual = ${agg!.pending},
        status = ${agg!.pending ? 'submitted' : 'graded'}
      where id = ${attempt.id}`);
    await evaluateAchievements(t, attempt.studentId);
  });
}

export interface ResultRow {
  studentId: string;
  fullName: string;
  username: string;
  className: string | null;
  resultId: number | null;
  status: string | null;
  score: number | null;
  maxScore: number | null;
  submittedAt: Date | null;
  pendingManual: number;
  attempts: number;
}

/** Kết quả theo học sinh (lượt làm gần nhất) cho mọi học sinh thuộc lớp được giao. */
export async function testResultsTable(q: Queryable, testId: number): Promise<ResultRow[]> {
  return q.many<ResultRow>(sql`
    with students as (
      select distinct m.student_id, min(c.name) as class_name
      from test_assignments a join class_members m on m.class_id = a.class_id join classes c on c.id = a.class_id
      where a.test_id = ${testId} group by m.student_id
      union
      select r.student_id, null from test_results r where r.test_id = ${testId}
    ), latest as (
      select distinct on (student_id) * from test_results where test_id = ${testId} order by student_id, attempt_no desc
    )
    select u.id as student_id, u.full_name, u.username, max(s.class_name) as class_name, l.id as result_id, l.status,
      l.score::float as score, l.max_score::float as max_score, l.submitted_at, coalesce(l.pending_manual, 0) as pending_manual,
      (select count(*)::int from test_results r where r.test_id = ${testId} and r.student_id = u.id) as attempts
    from students s join users u on u.id = s.student_id left join latest l on l.student_id = u.id
    group by u.id, l.id, l.status, l.score, l.max_score, l.submitted_at, l.pending_manual
    order by max(s.class_name) nulls last, u.full_name`);
}

export async function testQuestionStats(q: Queryable, testId: number) {
  return q.many<{ questionId: number; answered: number; correct: number; avgScore: number | null }>(sql`
    select tq.question_id,
      count(r.id) filter (where r.status <> 'pending')::int as answered,
      count(r.id) filter (where r.status = 'correct')::int as correct,
      avg(r.score)::float as avg_score
    from test_questions tq left join question_responses r on r.question_id = tq.question_id and r.test_result_id in (select id from test_results where test_id = ${testId})
    where tq.test_id = ${testId}
    group by tq.question_id, tq.sort_order order by tq.sort_order`);
}

export async function pendingGrading(q: Queryable, user: SessionUser, limit = 10) {
  const all = user.role === 'admin';
  return q.many<{ resultId: number; testId: number; title: string; studentName: string; submittedAt: Date; pendingManual: number }>(sql`
    select r.id as result_id, t.id as test_id, t.title, u.full_name as student_name, r.submitted_at, r.pending_manual
    from test_results r join tests t on t.id = r.test_id join users u on u.id = r.student_id
    where r.pending_manual > 0 and (${all}::boolean or t.created_by = ${user.id})
    order by r.submitted_at limit ${limit}`);
}
