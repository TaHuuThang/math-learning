/**
 * Quản trị chương trình: thêm/sửa chương, bài, chủ đề, dạng toán; sắp xếp; ẩn/xuất bản.
 * Mọi thao tác ghi đều kiểm tra phạm vi (đúng sách, đúng bài) trước khi sửa.
 */
import { sql, type Database, type Queryable } from '../server/db';
import { findMathErrors } from '../shared/richtext';
import { slugify, type Level } from './knowledge';

export class ContentError extends Error {}

const STATUS = (v: string): 'draft' | 'published' => (v === 'draft' ? 'draft' : 'published');

/** Kiểm tra lỗi công thức trong các ô văn bản; trả về danh sách lỗi có tên ô. */
export function mathErrors(fields: [string, string | null | undefined][]): string[] {
  const out: string[] = [];
  for (const [name, text] of fields) if (text) findMathErrors(text).forEach((e) => out.push(`${name}: ${e}`));
  return out;
}

// ---------------- Chương ----------------

/** Đánh số lại thứ tự chương: học kì I trước, học kì II sau, giữ thứ tự hiện có trong mỗi học kì. */
async function renumberChapters(t: Queryable, textbookId: number) {
  const rows = await t.many<{ id: number }>(sql`
    select c.id from chapters c join semesters s on s.id = c.semester_id where c.textbook_id = ${textbookId} order by s.number, c.sort_order, c.id`);
  for (const [i, r] of rows.entries()) await t.exec(sql`update chapters set sort_order = ${i + 1} where id = ${r.id}`);
}

export interface ChapterInput {
  semesterId: number;
  code: string;
  title: string;
  kind: 'chapter' | 'activity';
  description: string | null;
}

export async function createChapter(db: Database, textbookId: number, input: ChapterInput, userId: string): Promise<number> {
  return db.tx(async (t) => {
    const sem = await t.one(sql`select 1 from semesters where id = ${input.semesterId} and textbook_id = ${textbookId}`);
    if (!sem) throw new ContentError('Học kì không hợp lệ.');
    if (await t.one(sql`select 1 from chapters where textbook_id = ${textbookId} and code = ${input.code}`)) {
      throw new ContentError(`Đã có chương mang mã "${input.code}".`);
    }
    const row = await t.one<{ id: number }>(sql`
      insert into chapters (textbook_id, semester_id, code, title, description, kind, sort_order, status, verify_status, verify_note, updated_by)
      values (${textbookId}, ${input.semesterId}, ${input.code}, ${input.title}, ${input.description}, ${input.kind}, 32000, 'draft',
        'unverified', 'Chương do giáo viên thêm – cần đối chiếu với SGK.', ${userId})
      returning id`);
    await renumberChapters(t, textbookId);
    return row!.id;
  });
}

export async function moveChapter(db: Database, chapterId: number, dir: -1 | 1) {
  await db.tx(async (t) => {
    const c = await t.one<{ textbookId: number; semesterId: number }>(sql`select textbook_id, semester_id from chapters where id = ${chapterId}`);
    if (!c) throw new ContentError('Không tìm thấy chương.');
    const rows = await t.many<{ id: number }>(sql`select id from chapters where semester_id = ${c.semesterId} order by sort_order, id`);
    const i = rows.findIndex((r) => r.id === chapterId);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= rows.length) return;
    const ids = rows.map((r) => r.id);
    [ids[i], ids[j]] = [ids[j], ids[i]];
    for (const [k, id] of ids.entries()) await t.exec(sql`update chapters set sort_order = ${k + 1} where id = ${id}`);
    await renumberChapters(t, c.textbookId);
  });
}

export interface ChapterUpdate {
  code: string;
  title: string;
  description: string | null;
  objectives: string | null;
  keyPoints: string | null;
  formulas: string | null;
  status: 'draft' | 'published';
  verifyStatus: 'verified' | 'needs_review' | 'unverified';
  verifyNote: string | null;
}

export async function updateChapter(db: Database, chapterId: number, u: ChapterUpdate, userId: string) {
  const c = await db.one<{ textbookId: number }>(sql`select textbook_id from chapters where id = ${chapterId}`);
  if (!c) throw new ContentError('Không tìm thấy chương.');
  if (await db.one(sql`select 1 from chapters where textbook_id = ${c.textbookId} and code = ${u.code} and id <> ${chapterId}`)) {
    throw new ContentError(`Đã có chương khác mang mã "${u.code}".`);
  }
  await db.exec(sql`
    update chapters set code = ${u.code}, title = ${u.title}, description = ${u.description}, objectives = ${u.objectives},
      key_points = ${u.keyPoints}, formulas = ${u.formulas}, status = ${u.status}, verify_status = ${u.verifyStatus},
      verify_note = ${u.verifyNote}, updated_at = now(), updated_by = ${userId}
    where id = ${chapterId}`);
}

export async function setChapterStatus(db: Database, chapterId: number, status: string) {
  await db.exec(sql`update chapters set status = ${STATUS(status)}, updated_at = now() where id = ${chapterId}`);
}

// ---------------- Bài ----------------

async function uniqueLessonSlug(t: Queryable, textbookId: number, base: string) {
  let slug = base;
  for (let k = 2; await t.one(sql`select 1 from lessons where textbook_id = ${textbookId} and slug = ${slug}`); k++) slug = `${base}-${k}`;
  return slug;
}

export interface LessonCreate {
  number: number | null;
  title: string;
  kind: 'lesson' | 'practice' | 'review' | 'activity';
  periods: number | null;
  status: 'draft' | 'published';
  code: string | null;
}

export async function createLesson(db: Database, chapterId: number, input: LessonCreate, userId: string): Promise<{ id: number; slug: string }> {
  return db.tx(async (t) => {
    const c = await t.one<{ textbookId: number }>(sql`select textbook_id from chapters where id = ${chapterId}`);
    if (!c) throw new ContentError('Không tìm thấy chương.');
    if (input.code && (await t.one(sql`select 1 from lessons where textbook_id = ${c.textbookId} and code = ${input.code}`))) {
      throw new ContentError(`Mã bài "${input.code}" đã được dùng.`);
    }
    const base = slugify(input.kind === 'lesson' && input.number ? `bai ${input.number} ${input.title}` : input.title);
    const slug = await uniqueLessonSlug(t, c.textbookId, base);
    const row = await t.one<{ id: number }>(sql`
      insert into lessons (textbook_id, chapter_id, number, slug, title, kind, periods, status, sort_order, code, verify_status, verify_note, updated_by)
      values (${c.textbookId}, ${chapterId}, ${input.number}, ${slug}, ${input.title}, ${input.kind}, ${input.periods}, ${input.status},
        (select coalesce(max(sort_order), 0) + 1 from lessons where chapter_id = ${chapterId}), ${input.code},
        'unverified', 'Mục do giáo viên thêm – cần đối chiếu với SGK.', ${userId})
      returning id`);
    return { id: row!.id, slug };
  });
}

export async function moveLesson(db: Database, lessonId: number, dir: -1 | 1) {
  await db.tx(async (t) => {
    const l = await t.one<{ chapterId: number }>(sql`select chapter_id from lessons where id = ${lessonId}`);
    if (!l) throw new ContentError('Không tìm thấy bài.');
    const rows = await t.many<{ id: number }>(sql`select id from lessons where chapter_id = ${l.chapterId} order by sort_order, id`);
    const i = rows.findIndex((r) => r.id === lessonId);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= rows.length) return;
    const ids = rows.map((r) => r.id);
    [ids[i], ids[j]] = [ids[j], ids[i]];
    for (const [k, id] of ids.entries()) await t.exec(sql`update lessons set sort_order = ${k + 1} where id = ${id}`);
  });
}

export async function setLessonStatus(db: Database, lessonId: number, status: string, userId: string) {
  await db.exec(sql`update lessons set status = ${STATUS(status)}, updated_at = now(), updated_by = ${userId} where id = ${lessonId}`);
}

export interface LessonMetaUpdate {
  code: string | null;
  number: number | null;
  difficulty: Level | null;
  objectives: string | null;
  prerequisites: string | null;
  concepts: string | null;
  formulas: string | null;
  properties: string | null;
  theorems: string | null;
  verifyStatus: 'verified' | 'needs_review' | 'unverified';
  verifyNote: string | null;
}

export async function updateLessonMeta(db: Database, lessonId: number, m: LessonMetaUpdate, userId: string) {
  const l = await db.one<{ textbookId: number }>(sql`select textbook_id from lessons where id = ${lessonId}`);
  if (!l) throw new ContentError('Không tìm thấy bài.');
  if (m.code && (await db.one(sql`select 1 from lessons where textbook_id = ${l.textbookId} and code = ${m.code} and id <> ${lessonId}`))) {
    throw new ContentError(`Mã bài "${m.code}" đã được dùng cho bài khác.`);
  }
  await db.exec(sql`
    update lessons set code = ${m.code}, number = ${m.number}, difficulty = ${m.difficulty}, objectives = ${m.objectives},
      prerequisites = ${m.prerequisites}, concepts = ${m.concepts}, formulas = ${m.formulas}, properties = ${m.properties},
      theorems = ${m.theorems}, verify_status = ${m.verifyStatus}, verify_note = ${m.verifyNote}, updated_at = now(), updated_by = ${userId}
    where id = ${lessonId}`);
}

// ---------------- Chủ đề ----------------

async function nextCode(t: Queryable, table: 'themes' | 'topics', prefix: string): Promise<string> {
  const rows = await t.many<{ code: string }>(
    table === 'themes'
      ? sql`select code from themes where code like ${prefix + '%'}`
      : sql`select code from topics where code like ${prefix + '%'}`,
  );
  const used = new Set(rows.map((r) => r.code));
  let k = 1;
  while (used.has(`${prefix}${k}`)) k++;
  return `${prefix}${k}`;
}

export async function createTheme(db: Database, lessonId: number, title: string, description: string | null, status: string): Promise<number> {
  return db.tx(async (t) => {
    const l = await t.one<{ code: string | null }>(sql`select code from lessons where id = ${lessonId}`);
    if (!l) throw new ContentError('Không tìm thấy bài.');
    const code = l.code ? await nextCode(t, 'themes', `${l.code}.CD`) : null;
    const row = await t.one<{ id: number }>(sql`
      insert into themes (lesson_id, code, title, description, status, sort_order)
      values (${lessonId}, ${code}, ${title}, ${description}, ${STATUS(status)}, (select coalesce(max(sort_order), 0) + 1 from themes where lesson_id = ${lessonId}))
      returning id`);
    return row!.id;
  });
}

export async function updateTheme(db: Database, lessonId: number, themeId: number, title: string, description: string | null, status: string) {
  const n = await db.exec(sql`
    update themes set title = ${title}, description = ${description}, status = ${STATUS(status)}, updated_at = now()
    where id = ${themeId} and lesson_id = ${lessonId}`);
  if (!n) throw new ContentError('Không tìm thấy chủ đề.');
}

/** Xóa chủ đề: các dạng toán của chủ đề được giữ lại (chuyển sang "Dạng toán khác"). */
export async function deleteTheme(db: Database, lessonId: number, themeId: number) {
  await db.exec(sql`delete from themes where id = ${themeId} and lesson_id = ${lessonId}`);
}

export async function moveTheme(db: Database, lessonId: number, themeId: number, dir: -1 | 1) {
  await db.tx(async (t) => {
    const rows = await t.many<{ id: number }>(sql`select id from themes where lesson_id = ${lessonId} order by sort_order, id`);
    const i = rows.findIndex((r) => r.id === themeId);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= rows.length) return;
    const ids = rows.map((r) => r.id);
    [ids[i], ids[j]] = [ids[j], ids[i]];
    for (const [k, id] of ids.entries()) await t.exec(sql`update themes set sort_order = ${k + 1} where id = ${id}`);
  });
}

// ---------------- Dạng toán ----------------

async function uniqueTopicSlug(t: Queryable, lessonId: number, base: string, exceptId: number | null) {
  let slug = base;
  for (let k = 2; await t.one(sql`select 1 from topics where lesson_id = ${lessonId} and slug = ${slug} and id <> ${exceptId ?? 0}`); k++) slug = `${base}-${k}`;
  return slug;
}

async function checkTheme(t: Queryable, lessonId: number, themeId: number | null) {
  if (themeId && !(await t.one(sql`select 1 from themes where id = ${themeId} and lesson_id = ${lessonId}`))) {
    throw new ContentError('Chủ đề không thuộc bài này.');
  }
}

export async function createTopic(db: Database, lessonId: number, themeId: number | null, title: string, userId: string): Promise<number> {
  return db.tx(async (t) => {
    const l = await t.one<{ code: string | null }>(sql`select code from lessons where id = ${lessonId}`);
    if (!l) throw new ContentError('Không tìm thấy bài.');
    await checkTheme(t, lessonId, themeId);
    const code = l.code ? await nextCode(t, 'topics', `${l.code}.D`) : null;
    const slug = await uniqueTopicSlug(t, lessonId, slugify(title), null);
    const row = await t.one<{ id: number }>(sql`
      insert into topics (lesson_id, theme_id, code, slug, title, sort_order, status, updated_by)
      values (${lessonId}, ${themeId}, ${code}, ${slug}, ${title}, (select coalesce(max(sort_order), 0) + 1 from topics where lesson_id = ${lessonId}), 'draft', ${userId})
      returning id`);
    return row!.id;
  });
}

export interface TopicUpdate {
  themeId: number | null;
  title: string;
  slug: string;
  levels: Level[];
  status: 'draft' | 'published';
  knowledge: string | null;
  signs: string | null;
  method: string | null;
  steps: string | null;
  mistakes: string | null;
  example: string | null;
  exampleSolution: string | null;
}

export async function updateTopic(db: Database, topicId: number, u: TopicUpdate, userId: string) {
  await db.tx(async (t) => {
    const tp = await t.one<{ lessonId: number }>(sql`select lesson_id from topics where id = ${topicId}`);
    if (!tp) throw new ContentError('Không tìm thấy dạng toán.');
    await checkTheme(t, tp.lessonId, u.themeId);
    const slug = await uniqueTopicSlug(t, tp.lessonId, slugify(u.slug || u.title), topicId);
    await t.exec(sql`
      update topics set theme_id = ${u.themeId}, title = ${u.title}, slug = ${slug}, levels = ${u.levels}::smallint[], status = ${u.status},
        knowledge = ${u.knowledge}, signs = ${u.signs}, method = ${u.method}, steps = ${u.steps}, mistakes = ${u.mistakes},
        example = ${u.example}, example_solution = ${u.exampleSolution}, updated_at = now(), updated_by = ${userId}
      where id = ${topicId}`);
  });
}

/** Xóa dạng toán: câu hỏi của dạng vẫn giữ trong ngân hàng (bỏ liên kết dạng). */
export async function deleteTopic(db: Database, topicId: number) {
  await db.exec(sql`delete from topics where id = ${topicId}`);
}

/** Đổi chỗ dạng toán với dạng liền kề trong cùng chủ đề, rồi đánh số lại theo thứ tự hiển thị. */
export async function moveTopic(db: Database, topicId: number, dir: -1 | 1) {
  await db.tx(async (t) => {
    const tp = await t.one<{ lessonId: number; themeId: number | null }>(sql`select lesson_id, theme_id from topics where id = ${topicId}`);
    if (!tp) throw new ContentError('Không tìm thấy dạng toán.');
    const rows = await t.many<{ id: number; themeId: number | null }>(sql`
      select t.id, t.theme_id from topics t left join themes th on th.id = t.theme_id
      where t.lesson_id = ${tp.lessonId} order by th.sort_order nulls last, t.sort_order, t.id`);
    const i = rows.findIndex((r) => r.id === topicId);
    let j = i + dir;
    while (j >= 0 && j < rows.length && rows[j].themeId !== tp.themeId) j += dir;
    if (i < 0 || j < 0 || j >= rows.length) return;
    [rows[i], rows[j]] = [rows[j], rows[i]];
    for (const [k, r] of rows.entries()) await t.exec(sql`update topics set sort_order = ${k + 1} where id = ${r.id}`);
  });
}

export async function setTopicStatus(db: Database, topicId: number, status: string, userId: string) {
  await db.exec(sql`update topics set status = ${STATUS(status)}, updated_at = now(), updated_by = ${userId} where id = ${topicId}`);
}
