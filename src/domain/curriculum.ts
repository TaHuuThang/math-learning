import { sql, type Queryable } from '../server/db';
import type { QuestionType } from '../shared/grading';

export interface GradeRow {
  id: number;
  level: number;
  name: string;
  status: 'active' | 'coming_soon' | 'hidden';
  textbookSlug: string | null;
  lessonCount: number;
}

export async function listGrades(q: Queryable): Promise<GradeRow[]> {
  return q.many<GradeRow>(sql`
    select g.id, g.level, g.name, g.status, t.slug as textbook_slug,
      (select count(*)::int from lessons l where l.textbook_id = t.id and l.status = 'published') as lesson_count
    from grades g
    left join textbooks t on t.grade_id = g.id and t.is_default and t.status = 'published'
    where g.status <> 'hidden'
    order by g.sort_order, g.level`);
}

export interface Textbook {
  id: number;
  slug: string;
  title: string;
  series: string;
  program: string;
  description: string | null;
  status: string;
  gradeLevel: number;
  gradeStatus: string;
}

export async function getTextbook(q: Queryable, slug: string): Promise<Textbook | null> {
  return q.one<Textbook>(sql`
    select t.id, t.slug, t.title, t.series, t.program, t.description, t.status, g.level as grade_level, g.status as grade_status
    from textbooks t join grades g on g.id = t.grade_id where t.slug = ${slug}`);
}

export async function getDefaultTextbookForGrade(q: Queryable, level: number) {
  return q.one<Textbook>(sql`
    select t.id, t.slug, t.title, t.series, t.program, t.description, t.status, g.level as grade_level, g.status as grade_status
    from textbooks t join grades g on g.id = t.grade_id where g.level = ${level} and t.is_default`);
}

export type LessonKind = 'lesson' | 'practice' | 'review' | 'activity';

export interface LessonNode {
  id: number;
  code: string | null;
  slug: string;
  number: number | null;
  title: string;
  kind: LessonKind;
  periods: number | null;
  summary: string | null;
  status: string;
  chapterId: number;
  sectionCount: number;
  topicCount: number;
  questionCount: number;
  progress: 'in_progress' | 'completed' | null;
}

export interface ChapterNode {
  id: number;
  code: string;
  title: string;
  description: string | null;
  kind: 'chapter' | 'activity';
  status: 'draft' | 'published';
  lessons: LessonNode[];
}

export interface SemesterNode {
  id: number;
  number: number;
  name: string;
  chapters: ChapterNode[];
}

export function lessonLabel(l: { kind: string; number: number | null; title: string }) {
  return l.kind === 'lesson' && l.number ? `Bài ${l.number}. ${l.title}` : l.title;
}

export function chapterLabel(c: { kind: string; code: string; title: string }) {
  return c.kind === 'chapter' ? `Chương ${c.code}. ${c.title}` : c.title;
}

/** Cây Học kì → Chương → Bài, kèm tiến độ của người học (nếu có). */
export async function getCourseTree(q: Queryable, textbookId: number, userId: string | null, includeDrafts = false): Promise<SemesterNode[]> {
  const semesters = await q.many<{ id: number; number: number; name: string }>(
    sql`select id, number, name from semesters where textbook_id = ${textbookId} order by number`,
  );
  const chapters = await q.many<ChapterNode & { semesterId: number }>(sql`
    select id, code, title, description, kind, status, semester_id from chapters
    where textbook_id = ${textbookId} and (${includeDrafts}::boolean or status = 'published') order by sort_order`);
  const lessons = await q.many<LessonNode>(sql`
    select l.id, l.code, l.slug, l.number, l.title, l.kind, l.periods, l.summary, l.status, l.chapter_id,
      (select count(*)::int from lesson_sections s where s.lesson_id = l.id) as section_count,
      (select count(*)::int from topics t where t.lesson_id = l.id and (${includeDrafts}::boolean or t.status = 'published')) as topic_count,
      (select count(*)::int from questions qq where qq.lesson_id = l.id and qq.status = 'published') as question_count,
      lp.status as progress
    from lessons l
    left join learning_progress lp on lp.lesson_id = l.id and lp.user_id = ${userId}
    where l.textbook_id = ${textbookId} and (${includeDrafts}::boolean or l.status = 'published')
    order by l.sort_order`);
  const byChapter = new Map<number, LessonNode[]>();
  for (const l of lessons) {
    if (!byChapter.has(l.chapterId)) byChapter.set(l.chapterId, []);
    byChapter.get(l.chapterId)!.push(l);
  }
  return semesters.map((s) => ({
    ...s,
    chapters: chapters
      .filter((c) => c.semesterId === s.id)
      .map((c) => ({ id: c.id, code: c.code, title: c.title, description: c.description, kind: c.kind, status: c.status, lessons: byChapter.get(c.id) ?? [] })),
  }));
}

export function flattenLessons(tree: SemesterNode[]) {
  return tree.flatMap((s) => s.chapters.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c, semester: s }))));
}

export interface LessonSection {
  id: number;
  kind: 'objective' | 'knowledge' | 'formula' | 'example' | 'note';
  title: string | null;
  body: string;
  solution: string | null;
  sortOrder: number;
}

export interface Topic {
  id: number;
  title: string;
  method: string | null;
  sortOrder: number;
  questionCount: number;
}

export interface LessonDetail {
  id: number;
  textbookId: number;
  slug: string;
  number: number | null;
  title: string;
  kind: LessonKind;
  summary: string | null;
  periods: number | null;
  estimatedMinutes: number | null;
  status: string;
  updatedAt: Date;
  chapterId: number;
  chapterCode: string;
  chapterTitle: string;
  chapterKind: 'chapter' | 'activity';
  semesterNumber: number;
  semesterName: string;
  code: string | null;
  objectives: string | null;
  prerequisites: string | null;
  concepts: string | null;
  formulas: string | null;
  properties: string | null;
  theorems: string | null;
  difficulty: 1 | 2 | 3 | 4 | null;
  verifyStatus: 'verified' | 'needs_review' | 'unverified';
  verifyNote: string | null;
  chapterStatus: 'draft' | 'published';
  sortOrder: number;
}

const LESSON_COLS = sql`l.id, l.textbook_id, l.slug, l.number, l.title, l.kind, l.summary, l.periods, l.estimated_minutes, l.status, l.updated_at,
  l.code, l.objectives, l.prerequisites, l.concepts, l.formulas, l.properties, l.theorems, l.difficulty, l.verify_status, l.verify_note, l.sort_order,
  c.id as chapter_id, c.code as chapter_code, c.title as chapter_title, c.kind as chapter_kind, c.status as chapter_status,
  s.number as semester_number, s.name as semester_name`;

export async function getLessonBySlug(q: Queryable, textbookId: number, slug: string) {
  return q.one<LessonDetail>(sql`
    select ${LESSON_COLS}
    from lessons l join chapters c on c.id = l.chapter_id join semesters s on s.id = c.semester_id
    where l.textbook_id = ${textbookId} and l.slug = ${slug}`);
}

export async function getLessonById(q: Queryable, id: number) {
  return q.one<LessonDetail>(sql`
    select ${LESSON_COLS}
    from lessons l join chapters c on c.id = l.chapter_id join semesters s on s.id = c.semester_id
    where l.id = ${id}`);
}

export async function getLessonSections(q: Queryable, lessonId: number) {
  return q.many<LessonSection>(sql`
    select id, kind, title, body, solution, sort_order from lesson_sections where lesson_id = ${lessonId} order by sort_order, id`);
}

export async function getLessonTopics(q: Queryable, lessonId: number) {
  return q.many<Topic>(sql`
    select t.id, t.title, t.method, t.sort_order,
      (select count(*)::int from questions qq where qq.topic_id = t.id and qq.status = 'published') as question_count
    from topics t where t.lesson_id = ${lessonId} order by t.sort_order, t.id`);
}

export async function getLessonQuestionCounts(q: Queryable, lessonId: number) {
  const rows = await q.many<{ code: QuestionType; n: number }>(sql`
    select et.code, count(*)::int as n from questions qq join exercise_types et on et.id = qq.exercise_type_id
    where qq.lesson_id = ${lessonId} and qq.status = 'published' group by et.code`);
  return Object.fromEntries(rows.map((r) => [r.code, r.n])) as Partial<Record<QuestionType, number>>;
}

export interface PlanItem {
  position: number;
  title: string;
  lessonSlug: string | null;
  periods: number;
  periodFrom: number;
  periodTo: number;
  weeks: string;
  equipment: string | null;
  note: string | null;
}

export async function getTeachingPlan(q: Queryable, textbookId: number) {
  const plan = await q.one<{ id: number; schoolYear: string; title: string }>(sql`
    select id, school_year, title from teaching_plans where textbook_id = ${textbookId} order by school_year desc limit 1`);
  if (!plan) return null;
  const items = await q.many<PlanItem>(sql`
    select i.position, i.title, l.slug as lesson_slug, i.periods, i.period_from, i.period_to, i.weeks, i.equipment, i.note
    from teaching_plan_items i left join lessons l on l.id = i.lesson_id
    where i.plan_id = ${plan.id} order by i.position`);
  return { ...plan, items };
}

/** Danh sách bài (cho ô chọn) gom theo chương. */
export async function lessonOptions(q: Queryable, textbookId: number) {
  return q.many<{ id: number; label: string; chapter: string }>(sql`
    select l.id,
      case when l.kind = 'lesson' and l.number is not null then 'Bài ' || l.number || '. ' || l.title else l.title end as label,
      case when c.kind = 'chapter' then 'Chương ' || c.code || '. ' || c.title else c.title end as chapter
    from lessons l join chapters c on c.id = l.chapter_id
    where l.textbook_id = ${textbookId} order by c.sort_order, l.sort_order`);
}

export async function topicOptions(q: Queryable, textbookId: number) {
  return q.many<{ id: number; lessonId: number; label: string; lesson: string }>(sql`
    select t.id, t.lesson_id, case when t.code is not null then t.code || ' · ' || t.title else t.title end as label,
      case when l.kind = 'lesson' and l.number is not null then 'Bài ' || l.number || '. ' || l.title else l.title end as lesson
    from topics t join lessons l on l.id = t.lesson_id join chapters c on c.id = l.chapter_id
    where l.textbook_id = ${textbookId} order by c.sort_order, l.sort_order, t.sort_order`);
}
