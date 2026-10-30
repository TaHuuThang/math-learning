import { sql, type Database, type Queryable } from '../server/db';
import { ACHIEVEMENTS } from './achievements';
import { TOAN8_CHAPTERS, TOAN8_PPCT_2026 } from './toan8-structure';
import { TOAN8_CONTENT } from './toan8-content';
import { TOAN8_QUESTIONS } from './toan8-questions';

const LABELS_MCQ = ['A', 'B', 'C', 'D'];
const LABELS_TF = ['a', 'b', 'c', 'd'];

/** Dữ liệu danh mục: môn, khối lớp, huy hiệu. Chạy lại nhiều lần không sao. */
export async function seedBase(db: Queryable) {
  await db.exec(sql`insert into subjects (code, name) values ('toan', 'Toán') on conflict (code) do nothing`);
  for (const level of [6, 7, 8, 9]) {
    await db.exec(sql`
      insert into grades (level, name, status, sort_order)
      values (${level}, ${'Lớp ' + level}, ${level === 8 ? 'active' : 'coming_soon'}, ${level})
      on conflict (level) do nothing`);
  }
  for (const [i, a] of ACHIEVEMENTS.entries()) {
    await db.exec(sql`
      insert into achievements (code, name, description, icon, tier, xp_reward, sort_order)
      values (${a.code}, ${a.name}, ${a.description}, ${a.icon}, ${a.tier}, ${a.xp}, ${i + 1})
      on conflict (code) do update set name = excluded.name, description = excluded.description,
        icon = excluded.icon, tier = excluded.tier, xp_reward = excluded.xp_reward, sort_order = excluded.sort_order`);
  }
}

/** Chương trình Toán 8 KNTT: chỉ tạo khi chưa có sách "toan-8". */
export async function seedToan8(db: Database, log: (m: string) => void = console.log): Promise<boolean> {
  const exists = await db.one(sql`select id from textbooks where slug = 'toan-8'`);
  if (exists) return false;
  await db.tx(async (t) => {
    const subject = await t.one<{ id: number }>(sql`select id from subjects where code = 'toan'`);
    const grade = await t.one<{ id: number }>(sql`select id from grades where level = 8`);
    const book = await t.one<{ id: number }>(sql`
      insert into textbooks (subject_id, grade_id, slug, title, series, series_code, program, description, status, is_default)
      values (${subject!.id}, ${grade!.id}, 'toan-8', 'Toán 8', 'Kết nối tri thức với cuộc sống', 'kntt', 'GDPT 2018',
        'Toán 8 theo bộ sách Kết nối tri thức với cuộc sống, Chương trình giáo dục phổ thông 2018.', 'published', true)
      returning id`);
    const textbookId = book!.id;
    const semesterIds: Record<number, number> = {};
    for (const n of [1, 2]) {
      const s = await t.one<{ id: number }>(sql`
        insert into semesters (textbook_id, number, name) values (${textbookId}, ${n}, ${n === 1 ? 'Học kì I' : 'Học kì II'}) returning id`);
      semesterIds[n] = s!.id;
    }
    const lessonIds = new Map<string, number>();
    const topicIds = new Map<string, number[]>();
    for (const [ci, ch] of TOAN8_CHAPTERS.entries()) {
      const chapter = await t.one<{ id: number }>(sql`
        insert into chapters (textbook_id, semester_id, code, title, description, kind, sort_order)
        values (${textbookId}, ${semesterIds[ch.semester]}, ${ch.code}, ${ch.title}, ${ch.description ?? null}, ${ch.kind}, ${ci + 1})
        returning id`);
      for (const [li, l] of ch.lessons.entries()) {
        const content = TOAN8_CONTENT[l.slug];
        const lesson = await t.one<{ id: number }>(sql`
          insert into lessons (textbook_id, chapter_id, number, slug, title, kind, summary, periods, estimated_minutes, status, sort_order)
          values (${textbookId}, ${chapter!.id}, ${l.number ?? null}, ${l.slug}, ${l.title}, ${l.kind}, ${content?.summary ?? null},
            ${l.periods}, ${content?.minutes ?? l.periods * 45}, 'published', ${li + 1})
          returning id`);
        lessonIds.set(l.slug, lesson!.id);
        if (content) {
          for (const [si, s] of content.sections.entries()) {
            await t.exec(sql`
              insert into lesson_sections (lesson_id, kind, title, body, solution, sort_order)
              values (${lesson!.id}, ${s.kind}, ${s.title ?? null}, ${s.body}, ${s.solution ?? null}, ${si + 1})`);
          }
        }
        const ids: number[] = [];
        for (const [ti, title] of (l.topics ?? []).entries()) {
          const topic = await t.one<{ id: number }>(sql`
            insert into topics (lesson_id, title, method, sort_order)
            values (${lesson!.id}, ${title}, ${content?.methods?.[ti] ?? null}, ${ti + 1}) returning id`);
          ids.push(topic!.id);
        }
        topicIds.set(l.slug, ids);
      }
    }

    const plan = await t.one<{ id: number }>(sql`
      insert into teaching_plans (textbook_id, school_year, title)
      values (${textbookId}, '2026-2027', 'Phân phối chương trình Toán 8 – năm học 2026-2027') returning id`);
    for (const [i, item] of TOAN8_PPCT_2026.entries()) {
      await t.exec(sql`
        insert into teaching_plan_items (plan_id, position, title, lesson_id, periods, period_from, period_to, weeks, equipment, note)
        values (${plan!.id}, ${i + 1}, ${item.title}, ${item.lesson ? (lessonIds.get(item.lesson) ?? null) : null}, ${item.periods},
          ${item.from}, ${item.to}, ${item.weeks}, ${item.equipment ?? null}, ${item.note ?? null})`);
    }

    for (const q of TOAN8_QUESTIONS) {
      const lessonId = lessonIds.get(q.lesson);
      if (!lessonId) throw new Error('Câu hỏi mẫu tham chiếu bài không tồn tại: ' + q.lesson);
      const topicId = q.topic !== undefined ? (topicIds.get(q.lesson)?.[q.topic] ?? null) : null;
      const settings = q.type === 'short_answer' ? { tolerance: 0, ...(q.unit ? { unit: q.unit } : {}) } : {};
      const row = await t.one<{ id: number }>(sql`
        insert into questions (exercise_type_id, textbook_id, lesson_id, topic_id, level, stem, settings, points, status, source)
        values ((select id from exercise_types where code = ${q.type}), ${textbookId}, ${lessonId}, ${topicId}, ${q.level}, ${q.stem},
          ${settings}, 1, 'published', 'Câu hỏi mẫu – Tạ Hữu Thắng')
        returning id`);
      const qid = row!.id;
      if (q.type === 'mcq') {
        for (const [i, opt] of q.options!.entries()) {
          await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order)
            values (${qid}, ${LABELS_MCQ[i]}, ${opt}, ${LABELS_MCQ[i] === q.correct}, ${i + 1})`);
        }
      } else if (q.type === 'true_false') {
        for (const [i, [text, ok]] of q.statements!.entries()) {
          await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order)
            values (${qid}, ${LABELS_TF[i]}, ${text}, ${ok}, ${i + 1})`);
        }
      } else if (q.type === 'short_answer') {
        for (const [i, a] of q.accepted!.entries()) {
          await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order)
            values (${qid}, ${String(i + 1)}, ${a}, true, ${i + 1})`);
        }
      }
      await t.exec(sql`insert into solutions (question_id, kind, content) values (${qid}, 'full', ${q.solution})`);
      if (q.hint) await t.exec(sql`insert into solutions (question_id, kind, content, sort_order) values (${qid}, 'hint', ${q.hint}, 1)`);
      if (q.figure) {
        const img = await t.one<{ id: number }>(sql`
          insert into images (kind, figure_source, alt) values ('figure', ${q.figure}, 'Hình vẽ minh họa đề bài') returning id`);
        await t.exec(sql`insert into question_images (question_id, image_id, sort_order) values (${qid}, ${img!.id}, 0)`);
      }
    }
  });
  log(`Đã tạo chương trình Toán 8 KNTT: ${TOAN8_CHAPTERS.length} chương, ${TOAN8_PPCT_2026.length} mục PPCT, ${TOAN8_QUESTIONS.length} câu hỏi mẫu.`);
  return true;
}

export async function seedAll(db: Database, log: (m: string) => void = console.log) {
  await seedBase(db);
  await seedToan8(db, log);
}
