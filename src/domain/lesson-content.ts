/**
 * Giai đoạn 3: công thức cần nhớ, ví dụ minh họa từng bước, bài/công thức yêu thích, ghi chú, ví dụ đã xem, tìm kiếm.
 */
import { sql, type Queryable } from '../server/db';
import { lessonLabel, chapterLabel } from './curriculum';
import { topicKey, type Level } from './knowledge';
import { foldVi, type SearchEntry } from '../shared/search';
import { plainExcerpt } from '../shared/richtext';

type Status = 'draft' | 'published';

export interface FormulaCardRow {
  id: number;
  lessonId: number;
  groupTitle: string;
  name: string;
  tex: string;
  symbols: string | null;
  condition: string | null;
  example: string | null;
  status: Status;
  sortOrder: number;
}

export interface WorkedExampleRow {
  id: number;
  topicId: number;
  level: Level;
  problem: string;
  analysis: string | null;
  knowledge: string | null;
  given: string | null;
  toProve: string | null;
  figure: string | null;
  steps: string[];
  answer: string | null;
  tip: string | null;
  status: Status;
  sortOrder: number;
}

const pub = (onlyPublished: boolean, col = 'status') => (onlyPublished ? sql.raw(`and ${col} = 'published'`) : sql.empty);

// ---------------- Công thức ----------------

export async function getLessonFormulas(q: Queryable, lessonId: number, onlyPublished = false) {
  return q.many<FormulaCardRow>(sql`
    select id, lesson_id, group_title, name, tex, symbols, condition, example, status, sort_order
    from formulas where lesson_id = ${lessonId} ${pub(onlyPublished)} order by sort_order, id`);
}

export interface BookFormula extends FormulaCardRow {
  lessonSlug: string;
  lessonLabel: string;
  chapterCode: string;
  chapterLabel: string;
}

/** Mọi công thức đã xuất bản của sách, theo thứ tự chương – bài (trang Xem nhanh công thức). */
export async function getBookFormulas(q: Queryable, bookId: number): Promise<BookFormula[]> {
  const rows = await q.many<FormulaCardRow & { lessonSlug: string; lessonKind: string; lessonNumber: number | null; lessonTitle: string; chapterCode: string; chapterKind: string; chapterTitle: string }>(sql`
    select f.id, f.lesson_id, f.group_title, f.name, f.tex, f.symbols, f.condition, f.example, f.status, f.sort_order,
      l.slug as lesson_slug, l.kind as lesson_kind, l.number as lesson_number, l.title as lesson_title,
      c.code as chapter_code, c.kind as chapter_kind, c.title as chapter_title
    from formulas f join lessons l on l.id = f.lesson_id join chapters c on c.id = l.chapter_id join semesters s on s.id = c.semester_id
    where l.textbook_id = ${bookId} and f.status = 'published' and l.status = 'published' and c.status = 'published'
    order by s.number, c.sort_order, l.sort_order, f.sort_order, f.id`);
  return rows.map((r) => ({
    ...r,
    lessonLabel: lessonLabel({ kind: r.lessonKind, number: r.lessonNumber, title: r.lessonTitle }),
    chapterLabel: chapterLabel({ kind: r.chapterKind, code: r.chapterCode, title: r.chapterTitle }),
  }));
}

// ---------------- Ví dụ minh họa ----------------

function fixExample<T extends WorkedExampleRow | null>(r: T): T {
  if (r) {
    r.level = Number(r.level) as Level;
    if (typeof r.steps === 'string') r.steps = JSON.parse(r.steps);
    r.steps = (r.steps ?? []).map(String);
  }
  return r;
}

const EXAMPLE_COLS = sql`e.id, e.topic_id, e.level, e.problem, e.analysis, e.knowledge, e.given, e.to_prove, e.figure, e.steps, e.answer, e.tip, e.status, e.sort_order`;

export async function getTopicExamples(q: Queryable, topicId: number, onlyPublished = false) {
  const rows = await q.many<WorkedExampleRow>(sql`
    select ${EXAMPLE_COLS} from worked_examples e where e.topic_id = ${topicId} ${pub(onlyPublished, 'e.status')}
    order by e.level, e.sort_order, e.id`);
  return rows.map(fixExample);
}

export async function getExampleById(q: Queryable, id: number) {
  return fixExample(await q.one<WorkedExampleRow>(sql`select ${EXAMPLE_COLS} from worked_examples e where e.id = ${id}`));
}

/** Ví dụ của mọi dạng toán trong bài, nhóm theo dạng (theo thứ tự dạng trong bài). */
export async function getLessonExamples(q: Queryable, lessonId: number, onlyPublished = false): Promise<Map<number, WorkedExampleRow[]>> {
  const rows = await q.many<WorkedExampleRow>(sql`
    select ${EXAMPLE_COLS} from worked_examples e join topics t on t.id = e.topic_id
    where t.lesson_id = ${lessonId} ${pub(onlyPublished, 'e.status')} ${onlyPublished ? sql`and t.status = 'published'` : sql.empty}
    order by t.sort_order, t.id, e.level, e.sort_order, e.id`);
  const out = new Map<number, WorkedExampleRow[]>();
  for (const r of rows.map(fixExample)) {
    if (!out.has(r.topicId)) out.set(r.topicId, []);
    out.get(r.topicId)!.push(r);
  }
  return out;
}

// ---------------- Bài yêu thích, công thức yêu thích, ghi chú, ví dụ đã xem ----------------

export async function isLessonFavorite(q: Queryable, userId: string, lessonId: number) {
  return !!(await q.one(sql`select 1 from lesson_favorites where user_id = ${userId} and lesson_id = ${lessonId}`));
}

export async function toggleLessonFavorite(q: Queryable, userId: string, lessonId: number): Promise<boolean> {
  const removed = await q.one(sql`delete from lesson_favorites where user_id = ${userId} and lesson_id = ${lessonId} returning 1`);
  if (removed) return false;
  await q.exec(sql`insert into lesson_favorites (user_id, lesson_id) values (${userId}, ${lessonId}) on conflict do nothing`);
  return true;
}

export async function toggleFormulaFavorite(q: Queryable, userId: string, formulaId: number): Promise<boolean> {
  const removed = await q.one(sql`delete from formula_favorites where user_id = ${userId} and formula_id = ${formulaId} returning 1`);
  if (removed) return false;
  await q.exec(sql`insert into formula_favorites (user_id, formula_id) values (${userId}, ${formulaId}) on conflict do nothing`);
  return true;
}

export async function getFavoriteFormulaIds(q: Queryable, userId: string): Promise<Set<number>> {
  const rows = await q.many<{ formulaId: number }>(sql`select formula_id from formula_favorites where user_id = ${userId}`);
  return new Set(rows.map((r) => r.formulaId));
}

export interface LessonRef {
  lessonId: number;
  slug: string;
  label: string;
  chapterLabel: string;
}

const LESSON_REF = sql`l.id as lesson_id, l.slug, l.kind, l.number, l.title, c.kind as chapter_kind, c.code as chapter_code, c.title as chapter_title`;
type LessonRefRow = { lessonId: number; slug: string; kind: string; number: number | null; title: string; chapterKind: string; chapterCode: string; chapterTitle: string };
const toRef = (r: LessonRefRow): LessonRef => ({
  lessonId: r.lessonId,
  slug: r.slug,
  label: lessonLabel(r),
  chapterLabel: chapterLabel({ kind: r.chapterKind, code: r.chapterCode, title: r.chapterTitle }),
});

export async function getFavoriteLessons(q: Queryable, userId: string): Promise<(LessonRef & { at: Date })[]> {
  const rows = await q.many<LessonRefRow & { createdAt: Date }>(sql`
    select ${LESSON_REF}, f.created_at from lesson_favorites f join lessons l on l.id = f.lesson_id join chapters c on c.id = l.chapter_id
    where f.user_id = ${userId} and l.status = 'published' order by f.created_at desc`);
  return rows.map((r) => ({ ...toRef(r), at: r.createdAt }));
}

export async function getLessonNote(q: Queryable, userId: string, lessonId: number) {
  return (await q.one<{ body: string; updatedAt: Date }>(sql`select body, updated_at from lesson_notes where user_id = ${userId} and lesson_id = ${lessonId}`)) ?? null;
}

export async function saveLessonNote(q: Queryable, userId: string, lessonId: number, body: string) {
  const text = body.replace(/\r\n?/g, '\n').trim().slice(0, 5000);
  if (!text) {
    await q.exec(sql`delete from lesson_notes where user_id = ${userId} and lesson_id = ${lessonId}`);
    return;
  }
  await q.exec(sql`
    insert into lesson_notes (user_id, lesson_id, body) values (${userId}, ${lessonId}, ${text})
    on conflict (user_id, lesson_id) do update set body = excluded.body, updated_at = now()`);
}

export async function getNotes(q: Queryable, userId: string): Promise<(LessonRef & { body: string; updatedAt: Date })[]> {
  const rows = await q.many<LessonRefRow & { body: string; updatedAt: Date }>(sql`
    select ${LESSON_REF}, n.body, n.updated_at from lesson_notes n join lessons l on l.id = n.lesson_id join chapters c on c.id = l.chapter_id
    where n.user_id = ${userId} order by n.updated_at desc`);
  return rows.map((r) => ({ ...toRef(r), body: r.body, updatedAt: r.updatedAt }));
}

export async function markExampleViewed(q: Queryable, userId: string, exampleId: number) {
  await q.exec(sql`
    insert into example_views (user_id, example_id) select ${userId}, id from worked_examples where id = ${exampleId}
    on conflict (user_id, example_id) do update set viewed_at = now()`);
}

export interface ViewedExample extends LessonRef {
  exampleId: number;
  level: Level;
  problem: string;
  topicTitle: string;
  topicKey: string;
  viewedAt: Date;
}

export async function getViewedExamples(q: Queryable, userId: string, limit = 50): Promise<ViewedExample[]> {
  const rows = await q.many<LessonRefRow & { exampleId: number; level: number; problem: string; topicId: number; topicSlug: string | null; topicTitle: string; viewedAt: Date }>(sql`
    select ${LESSON_REF}, e.id as example_id, e.level, e.problem, t.id as topic_id, t.slug as topic_slug, t.title as topic_title, v.viewed_at
    from example_views v join worked_examples e on e.id = v.example_id join topics t on t.id = e.topic_id
      join lessons l on l.id = t.lesson_id join chapters c on c.id = l.chapter_id
    where v.user_id = ${userId} order by v.viewed_at desc limit ${limit}`);
  return rows.map((r) => ({
    ...toRef(r),
    exampleId: r.exampleId,
    level: Number(r.level) as Level,
    problem: r.problem,
    topicTitle: r.topicTitle,
    topicKey: topicKey({ id: r.topicId, slug: r.topicSlug }),
    viewedAt: r.viewedAt,
  }));
}

export async function getViewedExampleIds(q: Queryable, userId: string): Promise<Set<number>> {
  const rows = await q.many<{ exampleId: number }>(sql`select example_id from example_views where user_id = ${userId}`);
  return new Set(rows.map((r) => r.exampleId));
}

// ---------------- Tìm kiếm kiến thức ----------------

export interface SearchHrefs {
  lesson: (slug: string) => string;
  topic: (lessonSlug: string, key: string) => string;
}

/** Tập mục để tìm kiếm: bài học, mục kiến thức, công thức, dạng toán, ví dụ (đã xuất bản). */
export async function buildSearchEntries(q: Queryable, bookId: number, hrefs: SearchHrefs): Promise<SearchEntry[]> {
  const lessons = await q.many<{ id: number; slug: string; kind: string; number: number | null; title: string; summary: string | null; concepts: string | null; objectives: string | null; chapterKind: string; chapterCode: string; chapterTitle: string }>(sql`
    select l.id, l.slug, l.kind, l.number, l.title, l.summary, l.concepts, l.objectives, c.kind as chapter_kind, c.code as chapter_code, c.title as chapter_title
    from lessons l join chapters c on c.id = l.chapter_id join semesters s on s.id = c.semester_id
    where l.textbook_id = ${bookId} and l.status = 'published' and c.status = 'published' order by s.number, c.sort_order, l.sort_order`);
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const ids = lessons.map((l) => l.id);
  if (!ids.length) return [];
  const label = (l: (typeof lessons)[number]) => lessonLabel(l);
  const out: SearchEntry[] = [];
  const add = (e: Omit<SearchEntry, 'text'>, extra: string) => out.push({ ...e, text: foldVi(`${e.title} ${e.snippet} ${extra}`).slice(0, 1200) });
  for (const l of lessons) {
    const chap = chapterLabel({ kind: l.chapterKind, code: l.chapterCode, title: l.chapterTitle });
    add({ kind: 'lesson', title: label(l), context: chap, snippet: plainExcerpt(l.summary ?? l.objectives ?? '', 160), href: hrefs.lesson(l.slug) }, plainExcerpt(`${l.concepts ?? ''} ${l.objectives ?? ''}`, 900));
  }
  const sections = await q.many<{ id: number; lessonId: number; kind: string; title: string | null; body: string; formula: string | null }>(sql`
    select id, lesson_id, kind, title, body, formula from lesson_sections
    where lesson_id = any(${ids}::int[]) and status = 'published' and kind not in ('objective', 'example') order by lesson_id, sort_order`);
  for (const s of sections) {
    const l = byId.get(s.lessonId)!;
    if (!s.title) continue;
    add({ kind: 'theory', title: s.title, context: label(l), snippet: plainExcerpt(s.body, 160), href: `${hrefs.lesson(l.slug)}#kt-${s.id}` }, plainExcerpt(`${s.body} ${s.formula ?? ''}`, 900));
  }
  const formulas = await q.many<{ id: number; lessonId: number; name: string; tex: string; symbols: string | null; groupTitle: string }>(sql`
    select id, lesson_id, name, tex, symbols, group_title from formulas where lesson_id = any(${ids}::int[]) and status = 'published' order by lesson_id, sort_order`);
  for (const f of formulas) {
    const l = byId.get(f.lessonId)!;
    add({ kind: 'formula', title: f.name, context: label(l), snippet: plainExcerpt(`\\(${f.tex}\\)`, 160), href: `${hrefs.lesson(l.slug)}#ct-${f.id}` }, `${f.groupTitle} ${plainExcerpt(f.symbols ?? '', 400)}`);
  }
  const topics = await q.many<{ id: number; lessonId: number; slug: string | null; title: string; signs: string | null; method: string | null }>(sql`
    select id, lesson_id, slug, title, signs, method from topics where lesson_id = any(${ids}::int[]) and status = 'published' order by lesson_id, sort_order`);
  const topicById = new Map(topics.map((t) => [t.id, t]));
  for (const t of topics) {
    const l = byId.get(t.lessonId)!;
    add({ kind: 'topic', title: t.title, context: label(l), snippet: plainExcerpt(t.signs ?? t.method ?? '', 160), href: hrefs.topic(l.slug, topicKey(t)) }, plainExcerpt(`${t.signs ?? ''} ${t.method ?? ''}`, 900));
  }
  const examples = await q.many<{ id: number; topicId: number; level: number; problem: string }>(sql`
    select e.id, e.topic_id, e.level, e.problem from worked_examples e join topics t on t.id = e.topic_id
    where t.lesson_id = any(${ids}::int[]) and e.status = 'published' and t.status = 'published' order by t.lesson_id, t.sort_order, e.level, e.sort_order`);
  for (const e of examples) {
    const t = topicById.get(e.topicId);
    if (!t) continue;
    const l = byId.get(t.lessonId)!;
    add({ kind: 'example', title: `Ví dụ – ${t.title}`, context: label(l), snippet: plainExcerpt(e.problem, 160), href: `${hrefs.topic(l.slug, topicKey(t))}#vd-${e.id}` }, plainExcerpt(e.problem, 600));
  }
  return out;
}

/**
 * Gợi ý ôn tập khi học sinh làm sai: dẫn tới dạng toán (kiến thức, phương pháp, ví dụ) hoặc bài học của câu hỏi.
 * Trả về theo id câu hỏi.
 */
export async function getReviewLinks(
  q: Queryable,
  questions: { id: number; lessonId: number | null; topicId: number | null }[],
  hrefs: SearchHrefs,
): Promise<Map<number, { label: string; href: string }>> {
  const topicIds = [...new Set(questions.map((x) => x.topicId).filter((x): x is number => !!x))];
  const lessonIds = [...new Set(questions.map((x) => x.lessonId).filter((x): x is number => !!x))];
  const topics = new Map(
    (await q.many<{ id: number; slug: string | null; title: string; lessonSlug: string }>(sql`
      select t.id, t.slug, t.title, l.slug as lesson_slug from topics t join lessons l on l.id = t.lesson_id
      where t.id = any(${topicIds}::int[]) and t.status = 'published'`)).map((t) => [t.id, t]),
  );
  const lessons = new Map(
    (await q.many<{ id: number; slug: string; title: string }>(sql`select id, slug, title from lessons where id = any(${lessonIds}::int[]) and status = 'published'`)).map((l) => [l.id, l]),
  );
  const out = new Map<number, { label: string; href: string }>();
  for (const x of questions) {
    const t = x.topicId ? topics.get(x.topicId) : undefined;
    if (t) out.set(x.id, { label: `Dạng toán “${t.title}”`, href: `${hrefs.topic(t.lessonSlug, topicKey(t))}#phuong-phap` });
    else if (x.lessonId && lessons.has(x.lessonId)) {
      const l = lessons.get(x.lessonId)!;
      out.set(x.id, { label: `Bài học “${l.title}”`, href: `${hrefs.lesson(l.slug)}#kham-pha` });
    }
  }
  return out;
}
