/**
 * Bản đồ kiến thức: Bài → Chủ đề (bảng themes) → Dạng toán (bảng topics) → Bài tập (questions.topic_id).
 */
import { sql, type Queryable } from '../server/db';
import type { QuestionType } from '../shared/grading';
import type { ChapterNode, LessonNode, SemesterNode } from './curriculum';

export type Level = 1 | 2 | 3 | 4;
export type VerifyStatus = 'verified' | 'needs_review' | 'unverified';
export type PublishStatus = 'draft' | 'published';

export interface TopicNode {
  id: number;
  lessonId: number;
  themeId: number | null;
  code: string | null;
  slug: string | null;
  title: string;
  levels: Level[];
  status: PublishStatus;
  method: string | null;
  sortOrder: number;
  questionCount: number;
}

export interface ThemeNode {
  id: number;
  lessonId: number;
  code: string | null;
  title: string;
  description: string | null;
  status: PublishStatus;
  sortOrder: number;
  topics: TopicNode[];
}

/** Đường dẫn (phần cuối) của trang dạng toán: slug, hoặc "d-<id>" với dạng chưa có slug. */
export const topicKey = (t: { id: number; slug: string | null }) => t.slug ?? `d-${t.id}`;

/** Toàn bộ chủ đề – dạng toán của một sách, gom theo bài. Dạng chưa gắn chủ đề nằm trong nhóm "Dạng toán khác". */
export async function getThemesByLesson(q: Queryable, textbookId: number, includeDrafts = false): Promise<Map<number, ThemeNode[]>> {
  const themes = await q.many<Omit<ThemeNode, 'topics'>>(sql`
    select th.id, th.lesson_id, th.code, th.title, th.description, th.status, th.sort_order
    from themes th join lessons l on l.id = th.lesson_id
    where l.textbook_id = ${textbookId} and (${includeDrafts}::boolean or th.status = 'published')
    order by th.lesson_id, th.sort_order, th.id`);
  const hiddenThemes = includeDrafts
    ? new Set<number>()
    : new Set(
        (await q.many<{ id: number }>(sql`
          select th.id from themes th join lessons l on l.id = th.lesson_id where l.textbook_id = ${textbookId} and th.status <> 'published'`)).map((r) => r.id),
      );
  const topics = await q.many<TopicNode>(sql`
    select t.id, t.lesson_id, t.theme_id, t.code, t.slug, t.title, t.levels, t.status, t.method, t.sort_order,
      (select count(*)::int from questions qq where qq.topic_id = t.id and qq.status = 'published') as question_count
    from topics t join lessons l on l.id = t.lesson_id
    where l.textbook_id = ${textbookId} and (${includeDrafts}::boolean or t.status = 'published')
    order by t.lesson_id, t.sort_order, t.id`);
  const out = new Map<number, ThemeNode[]>();
  const byId = new Map<number, ThemeNode>();
  for (const th of themes) {
    const node: ThemeNode = { ...th, topics: [] };
    byId.set(th.id, node);
    if (!out.has(th.lessonId)) out.set(th.lessonId, []);
    out.get(th.lessonId)!.push(node);
  }
  for (const tp of topics) {
    tp.levels = (tp.levels ?? []).map(Number).sort() as Level[];
    if (tp.themeId && hiddenThemes.has(tp.themeId)) continue;
    const th = tp.themeId ? byId.get(tp.themeId) : undefined;
    if (th) {
      th.topics.push(tp);
      continue;
    }
    if (!out.has(tp.lessonId)) out.set(tp.lessonId, []);
    const list = out.get(tp.lessonId)!;
    let other = list.find((x) => x.id === 0);
    if (!other) {
      other = { id: 0, lessonId: tp.lessonId, code: null, title: 'Dạng toán khác', description: null, status: 'published', sortOrder: 999, topics: [] };
      list.push(other);
    }
    other.topics.push(tp);
  }
  return out;
}

export async function getLessonThemes(q: Queryable, textbookId: number, lessonId: number, includeDrafts = false) {
  return (await getThemesByLesson(q, textbookId, includeDrafts)).get(lessonId) ?? [];
}

export const countTopics = (themes: ThemeNode[] | undefined) => (themes ?? []).reduce((n, th) => n + th.topics.length, 0);

// ---------------- Chương ----------------

export interface ChapterMeta {
  id: number;
  textbookId: number;
  semesterId: number;
  semesterNumber: number;
  semesterName: string;
  code: string;
  title: string;
  description: string | null;
  kind: 'chapter' | 'activity';
  objectives: string | null;
  keyPoints: string | null;
  formulas: string | null;
  status: PublishStatus;
  verifyStatus: VerifyStatus;
  verifyNote: string | null;
  sortOrder: number;
}

const CHAPTER_COLS = sql`c.id, c.textbook_id, c.semester_id, s.number as semester_number, s.name as semester_name, c.code, c.title, c.description, c.kind,
  c.objectives, c.key_points, c.formulas, c.status, c.verify_status, c.verify_note, c.sort_order`;

export async function getChapterByCode(q: Queryable, textbookId: number, code: string) {
  return q.one<ChapterMeta>(sql`
    select ${CHAPTER_COLS} from chapters c join semesters s on s.id = c.semester_id where c.textbook_id = ${textbookId} and c.code = ${code}`);
}

export async function getChapterById(q: Queryable, id: number) {
  return q.one<ChapterMeta>(sql`select ${CHAPTER_COLS} from chapters c join semesters s on s.id = c.semester_id where c.id = ${id}`);
}

export async function getChapterMetas(q: Queryable, textbookId: number) {
  return q.many<ChapterMeta>(sql`
    select ${CHAPTER_COLS} from chapters c join semesters s on s.id = c.semester_id where c.textbook_id = ${textbookId} order by c.sort_order`);
}

export type ChapterState = 'done' | 'in_progress' | 'not_started';

export interface ChapterSummary {
  lessons: number;
  completed: number;
  started: number;
  topics: number;
  questions: number;
  state: ChapterState;
}

export function summarizeChapter(c: ChapterNode, themes: Map<number, ThemeNode[]>): ChapterSummary {
  const lessons = c.lessons.length;
  const completed = c.lessons.filter((l) => l.progress === 'completed').length;
  const started = c.lessons.filter((l) => l.progress).length;
  const topics = c.lessons.reduce((n, l) => n + countTopics(themes.get(l.id)), 0);
  const questions = c.lessons.reduce((n, l) => n + l.questionCount, 0);
  const state: ChapterState = lessons > 0 && completed === lessons ? 'done' : started > 0 ? 'in_progress' : 'not_started';
  return { lessons, completed, started, topics, questions, state };
}

export const CHAPTER_STATE_LABELS: Record<ChapterState, string> = {
  done: 'Đã hoàn thành',
  in_progress: 'Đang học',
  not_started: 'Chưa bắt đầu',
};

export function findChapter(tree: SemesterNode[], code: string): { chapter: ChapterNode; semester: SemesterNode } | null {
  for (const s of tree) for (const c of s.chapters) if (c.code === code) return { chapter: c, semester: s };
  return null;
}

// ---------------- Dạng toán ----------------

export interface TopicDetail {
  id: number;
  lessonId: number;
  themeId: number | null;
  code: string | null;
  slug: string | null;
  title: string;
  knowledge: string | null;
  signs: string | null;
  method: string | null;
  steps: string | null;
  mistakes: string | null;
  example: string | null;
  exampleSolution: string | null;
  levels: Level[];
  status: PublishStatus;
  sortOrder: number;
  updatedAt: Date;
  themeTitle: string | null;
  themeStatus: PublishStatus | null;
}

const TOPIC_COLS = sql`t.id, t.lesson_id, t.theme_id, t.code, t.slug, t.title, t.knowledge, t.signs, t.method, t.steps, t.mistakes, t.example,
  t.example_solution, t.levels, t.status, t.sort_order, t.updated_at, th.title as theme_title, th.status as theme_status`;

function fixLevels<T extends { levels: Level[] } | null>(t: T): T {
  if (t) t.levels = (t.levels ?? []).map(Number).sort() as Level[];
  return t;
}

/** Tìm dạng toán theo khóa trong đường dẫn: slug, hoặc "d-<id>". */
export async function getTopicByKey(q: Queryable, lessonId: number, key: string) {
  const m = /^d-(\d+)$/.exec(key);
  const where = m ? sql`t.id = ${Number(m[1])}` : sql`t.slug = ${key}`;
  return fixLevels(
    await q.one<TopicDetail>(sql`
      select ${TOPIC_COLS} from topics t left join themes th on th.id = t.theme_id where t.lesson_id = ${lessonId} and ${where}`),
  );
}

export async function getTopicById(q: Queryable, id: number) {
  return fixLevels(await q.one<TopicDetail>(sql`select ${TOPIC_COLS} from topics t left join themes th on th.id = t.theme_id where t.id = ${id}`));
}

export async function getTopicQuestionCounts(q: Queryable, topicId: number) {
  const rows = await q.many<{ code: QuestionType; n: number; level: number }>(sql`
    select et.code, qq.level, count(*)::int as n from questions qq join exercise_types et on et.id = qq.exercise_type_id
    where qq.topic_id = ${topicId} and qq.status = 'published' group by et.code, qq.level`);
  const byType: Partial<Record<QuestionType, number>> = {};
  const byLevel: Partial<Record<Level, number>> = {};
  for (const r of rows) {
    byType[r.code] = (byType[r.code] ?? 0) + r.n;
    byLevel[r.level as Level] = (byLevel[r.level as Level] ?? 0) + r.n;
  }
  return { byType, byLevel, total: rows.reduce((n, r) => n + r.n, 0) };
}

export const LEVEL_LABELS: Record<Level, string> = { 1: 'Nhận biết', 2: 'Thông hiểu', 3: 'Vận dụng', 4: 'Vận dụng cao' };
export const LEVEL_SHORT: Record<Level, string> = { 1: 'NB', 2: 'TH', 3: 'VD', 4: 'VDC' };
export const VERIFY_LABELS: Record<VerifyStatus, string> = { verified: 'Đã đối chiếu SGK', needs_review: 'Cần kiểm tra', unverified: 'Chưa đối chiếu' };
export const DIFFICULTY_LABELS: Record<Level, string> = { 1: 'Cơ bản', 2: 'Trung bình', 3: 'Khá', 4: 'Khó' };

/** Bỏ dấu tiếng Việt và tạo slug cho đường dẫn. */
export function slugify(s: string, max = 70): string {
  const out = s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return out.slice(0, max).replace(/-+$/g, '') || 'muc';
}

export type { LessonNode };
