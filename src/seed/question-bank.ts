import { sql, type Database, type Queryable } from '../server/db';
import { hashText } from '../shared/shuffle';
import { emptyQuestionInput, getQuestions, qualityOf, questionToInput, type QuestionInput } from '../domain/questions';
import { TOAN8_BANK } from './toan8-bank';
import type { BankQ } from './toan8-bank/types';

export const BANK_SOURCE = 'Ngân hàng câu hỏi GĐ4 – tự biên soạn theo SGK Toán 8 KNTT';

/**
 * Đổi câu soạn trong tệp nguồn thành dữ liệu soạn câu hỏi của trang (QuestionInput).
 * Trắc nghiệm: phương án đúng (viết đầu tiên) được đặt vào vị trí theo mã băm của đề để đáp án phân bố đều A/B/C/D;
 * giải thích đi cùng phương án.
 */
export function bankToInput(q: BankQ, lessonId: number | null, topicId: number | null): QuestionInput {
  const input = emptyQuestionInput(q.type);
  input.lessonId = lessonId;
  input.topicId = topicId;
  input.level = q.level;
  input.points = q.points ?? 1;
  input.status = 'published';
  input.stem = q.stem;
  input.solution = q.solution;
  input.hint = q.hint ?? '';
  input.rubric = q.rubric ?? '';
  input.figure = q.figure ?? '';
  if (q.type === 'mcq') {
    const opts = [...q.options!];
    const notes = [0, 1, 2, 3].map((i) => q.notes?.[i] ?? '');
    const to = hashText(q.stem) % 4;
    [opts[0], opts[to]] = [opts[to], opts[0]];
    [notes[0], notes[to]] = [notes[to], notes[0]];
    input.options = opts;
    input.optionNotes = notes;
    input.correct = 'ABCD'[to];
  }
  if (q.type === 'true_false') input.statements = q.statements!.map(([text, value, note]) => ({ text, value, note }));
  if (q.type === 'short_answer') {
    input.accepted = q.accepted!;
    input.unit = q.unit ?? '';
    input.tolerance = q.tol ?? 0;
    input.match = q.match ?? 'auto';
  }
  return input;
}

async function insertInput(t: Queryable, textbookId: number, input: QuestionInput, warnings: string[]) {
  const settings =
    input.type === 'short_answer'
      ? { tolerance: input.tolerance, ...(input.unit ? { unit: input.unit } : {}), ...(input.match !== 'auto' ? { match: input.match } : {}) }
      : {};
  const status = warnings.length ? 'review' : 'published';
  const row = await t.one<{ id: number }>(sql`
    insert into questions (exercise_type_id, textbook_id, lesson_id, topic_id, level, stem, settings, points, status, source, quality_issues)
    values ((select id from exercise_types where code = ${input.type}), ${textbookId}, ${input.lessonId}, ${input.topicId}, ${input.level},
      ${input.stem}, ${settings}, ${input.points}, ${status}, ${BANK_SOURCE}, ${JSON.stringify(warnings)}::jsonb)
    returning id`);
  const qid = row!.id;
  if (input.type === 'mcq') {
    for (const [i, text] of input.options.entries())
      await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order, explanation)
        values (${qid}, ${'ABCD'[i]}, ${text}, ${'ABCD'[i] === input.correct}, ${i + 1}, ${input.optionNotes[i] || null})`);
  } else if (input.type === 'true_false') {
    for (const [i, s] of input.statements.entries())
      await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order, explanation)
        values (${qid}, ${'abcd'[i]}, ${s.text}, ${!!s.value}, ${i + 1}, ${s.note || null})`);
  } else if (input.type === 'short_answer') {
    for (const [i, a] of input.accepted.entries())
      await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order) values (${qid}, ${String(i + 1)}, ${a}, true, ${i + 1})`);
  }
  await t.exec(sql`insert into solutions (question_id, kind, content) values (${qid}, 'full', ${input.solution})`);
  if (input.hint) await t.exec(sql`insert into solutions (question_id, kind, content, sort_order) values (${qid}, 'hint', ${input.hint}, 1)`);
  if (input.rubric) await t.exec(sql`insert into solutions (question_id, kind, content, sort_order) values (${qid}, 'rubric', ${input.rubric}, 2)`);
  if (input.figure) {
    const img = await t.one<{ id: number }>(sql`
      insert into images (kind, figure_source, alt, purpose) values ('figure', ${input.figure}, 'Hình vẽ minh họa đề bài', 'question') returning id`);
    await t.exec(sql`insert into question_images (question_id, image_id, sort_order) values (${qid}, ${img!.id}, 0)`);
  }
  return status;
}

/**
 * Nạp ngân hàng câu hỏi giai đoạn 4. Mỗi bài nạp một lần (seed_marks 'toan8-bank-v4:<slug>'), không đụng câu giáo viên soạn.
 * Câu không qua được bộ kiểm tra chất lượng sẽ ở trạng thái "chờ duyệt".
 * Kèm hai việc một lần: sửa phương án nhiễu trùng giá trị ở câu mẫu cũ, ghi cảnh báo chất lượng cho câu có sẵn.
 */
export async function applyQuestionBank(db: Database, log: (m: string) => void = console.log): Promise<number> {
  const book = await db.one<{ id: number }>(sql`select id from textbooks where slug = 'toan-8'`);
  if (!book) return 0;

  if (!(await db.one(sql`select 1 from seed_marks where key = 'toan8-fix-v4'`))) {
    await db.tx(async (t) => {
      await t.exec(sql`
        update answers set content = ${String.raw`\(\dfrac{-2}{x + 1}\)`}
        where content = ${String.raw`\(\dfrac{-2}{x - 1}\)`} and not is_correct
          and question_id in (select id from questions where stem = ${String.raw`\(\dfrac{-2}{1 - x}\) bằng`})`);
      // ghi cảnh báo chất lượng cho các câu đã có (không đổi trạng thái)
      const ids = (await t.many<{ id: number }>(sql`select id from questions where textbook_id = ${book.id} and quality_issues = '[]'::jsonb`)).map((r) => r.id);
      const levels = new Map((await t.many<{ id: number; levels: number[] }>(sql`select id, levels from topics`)).map((x) => [x.id, (x.levels ?? []).map(Number)]));
      for (const q of await getQuestions(t, ids)) {
        const w = qualityOf(questionToInput(q), q.topicId ? levels.get(q.topicId) : undefined).warnings;
        if (w.length) await t.exec(sql`update questions set quality_issues = ${JSON.stringify(w)}::jsonb where id = ${q.id}`);
      }
      await t.exec(sql`insert into seed_marks (key, note) values ('toan8-fix-v4', 'Sửa câu mẫu và ghi cảnh báo chất lượng')`);
    });
  }

  let lessons = 0;
  const stats = { published: 0, review: 0 };
  for (const bl of TOAN8_BANK) {
    const key = `toan8-bank-v4:${bl.slug}`;
    if (await db.one(sql`select 1 from seed_marks where key = ${key}`)) continue;
    await db.tx(async (t) => {
      const lesson = await t.one<{ id: number }>(sql`select id from lessons where textbook_id = ${book.id} and slug = ${bl.slug}`);
      if (!lesson) throw new Error(`Ngân hàng câu hỏi: không tìm thấy bài ${bl.slug}`);
      const topics = new Map(
        (await t.many<{ id: number; slug: string | null; levels: number[] }>(sql`select id, slug, levels from topics where lesson_id = ${lesson.id}`)).map((x) => [
          x.slug ?? '',
          { id: x.id, levels: (x.levels ?? []).map(Number) },
        ]),
      );
      for (const q of bl.questions) {
        const tp = topics.get(q.dang);
        if (!tp) throw new Error(`Ngân hàng câu hỏi: bài ${bl.slug} không có dạng toán "${q.dang}"`);
        const input = bankToInput(q, lesson.id, tp.id);
        const report = qualityOf(input, tp.levels);
        if (report.errors.length) throw new Error(`Ngân hàng câu hỏi (${bl.slug}): ${report.errors[0]} – ${q.stem.slice(0, 60)}`);
        const st = await insertInput(t, book.id, input, report.warnings);
        stats[st === 'review' ? 'review' : 'published']++;
      }
      await t.exec(sql`insert into seed_marks (key, note) values (${key}, ${`${bl.questions.length} câu hỏi giai đoạn 4`})`);
    });
    lessons++;
  }
  if (lessons) log(`Đã nạp ngân hàng câu hỏi ${lessons} bài: ${stats.published} câu xuất bản${stats.review ? `, ${stats.review} câu chờ duyệt` : ''}.`);
  return lessons;
}
