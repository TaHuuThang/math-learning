import { sql, type Database, type Queryable } from '../server/db';
import { TOAN8_CONTENT } from './toan8-content';
import { TOAN8_LESSONS } from './toan8-lessons';
import type { LessonContent } from './toan8-lessons/types';

/**
 * Nạp nội dung bài học giai đoạn 3 (khám phá kiến thức, công thức cần nhớ, ví dụ minh họa) vào sách "toan-8".
 * Mỗi bài chỉ nạp một lần (seed_marks 'toan8-v3:<slug>'), không ghi đè phần giáo viên đã soạn:
 *  - Lí thuyết: nạp khi bài chưa có mục nội dung, hoặc các mục hiện có còn nguyên như bản mẫu giai đoạn 1 (thì thay).
 *  - Công thức: nạp khi bài chưa có công thức.  - Ví dụ: nạp cho dạng toán chưa có ví dụ.
 *  - Ứng dụng thực tế, lưu ý khi giải: chỉ điền ô trống.
 */
export async function applyLessonContent(db: Database, log: (m: string) => void = console.log): Promise<number> {
  const book = await db.one<{ id: number }>(sql`select id from textbooks where slug = 'toan-8'`);
  if (!book) return 0;
  let applied = 0;
  const stats = { theory: 0, formulas: 0, examples: 0, kept: [] as string[] };
  for (const content of TOAN8_LESSONS) {
    const key = `toan8-v3:${content.slug}`;
    if (await db.one(sql`select 1 from seed_marks where key = ${key}`)) continue;
    await db.tx(async (t) => {
      const lesson = await t.one<{ id: number }>(sql`select id from lessons where textbook_id = ${book.id} and slug = ${content.slug}`);
      if (!lesson) throw new Error(`Nội dung bài học: không tìm thấy bài ${content.slug}`);
      await applyOne(t, lesson.id, content, stats);
      await t.exec(sql`insert into seed_marks (key, note) values (${key}, 'Nội dung bài học giai đoạn 3')`);
    });
    applied++;
  }
  if (applied) {
    log(`Đã nạp nội dung ${applied} bài học: ${stats.theory} mục kiến thức, ${stats.formulas} công thức, ${stats.examples} ví dụ minh họa.`);
    if (stats.kept.length) log(`Giữ nguyên lí thuyết giáo viên đã soạn ở: ${stats.kept.join(', ')}.`);
  }
  return applied;
}

async function applyOne(t: Queryable, lessonId: number, c: LessonContent, stats: { theory: number; formulas: number; examples: number; kept: string[] }) {
  await t.exec(sql`update lessons set applications = coalesce(applications, ${c.applications}) where id = ${lessonId}`);

  // ----- Khám phá kiến thức mới -----
  const existing = await t.many<{ id: number; kind: string; title: string | null; body: string; solution: string | null }>(sql`
    select id, kind, title, body, solution from lesson_sections where lesson_id = ${lessonId} order by sort_order, id`);
  const original = TOAN8_CONTENT[c.slug]?.sections ?? [];
  const untouched =
    existing.length > 0 &&
    existing.length === original.length &&
    existing.every((s, i) => s.kind === original[i].kind && (s.title ?? null) === (original[i].title ?? null) && s.body === original[i].body && (s.solution ?? null) === (original[i].solution ?? null));
  if (untouched) await t.exec(sql`delete from lesson_sections where lesson_id = ${lessonId}`);
  if (existing.length === 0 || untouched) {
    for (const [i, it] of c.theory.entries()) {
      await t.exec(sql`
        insert into lesson_sections (lesson_id, kind, title, body, formula, example, sort_order)
        values (${lessonId}, ${it.kind}, ${it.title}, ${it.body}, ${it.formula ?? null}, ${it.example ?? null}, ${i + 1})`);
      stats.theory++;
    }
  } else stats.kept.push(c.slug);

  // ----- Công thức cần nhớ -----
  if (!(await t.one(sql`select 1 from formulas where lesson_id = ${lessonId}`))) {
    let n = 0;
    for (const g of c.formulas) {
      for (const f of g.items) {
        await t.exec(sql`
          insert into formulas (lesson_id, group_title, name, tex, symbols, condition, example, sort_order)
          values (${lessonId}, ${g.group}, ${f.name}, ${f.tex}, ${f.symbols}, ${f.condition ?? null}, ${f.example}, ${++n})`);
        stats.formulas++;
      }
    }
  }

  // ----- Ví dụ minh họa, lưu ý khi giải -----
  for (const [slug, examples] of Object.entries(c.examples)) {
    const topic = await t.one<{ id: number }>(sql`select id from topics where lesson_id = ${lessonId} and slug = ${slug}`);
    if (!topic) throw new Error(`Nội dung bài học ${c.slug}: không tìm thấy dạng toán ${slug}`);
    if (await t.one(sql`select 1 from worked_examples where topic_id = ${topic.id}`)) continue;
    for (const [i, e] of examples.entries()) {
      await t.exec(sql`
        insert into worked_examples (topic_id, level, problem, analysis, knowledge, given, to_prove, figure, steps, answer, tip, sort_order)
        values (${topic.id}, ${e.level}, ${e.problem}, ${e.analysis}, ${e.knowledge}, ${e.given ?? null}, ${e.toProve ?? null}, ${e.figure ?? null},
          ${JSON.stringify(e.steps)}::jsonb, ${e.answer}, ${e.tip ?? null}, ${i + 1})`);
      stats.examples++;
    }
  }
  for (const [slug, note] of Object.entries(c.notes ?? {})) {
    await t.exec(sql`update topics set notes = coalesce(notes, ${note}) where lesson_id = ${lessonId} and slug = ${slug}`);
  }
}
