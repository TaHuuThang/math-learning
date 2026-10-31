import { sql, type Database, type Queryable } from '../server/db';
import { TOAN8_MAP, lessonCodes } from './toan8-map';
import type { MapExercise, MapLesson, Verify } from './toan8-map/types';
import { insertSeedQuestion } from './run';

/**
 * Mỗi gói bản đồ kiến thức chỉ nạp một lần (bảng seed_marks). Gói mới thì đặt khóa mới.
 * v2: đủ Chương I–X. Nạp lại trên CSDL đã có v1 là an toàn: chủ đề, dạng toán đã có mã được giữ nguyên
 * (chỉ điền ô trống) và không thêm lại bài tập luyện tập cho các dạng đó.
 */
export const MAP_KEY = 'toan8-map-v2';
export const MAP_SOURCE = 'Bản đồ kiến thức Toán 8 – câu mẫu';

/**
 * Nạp bản đồ kiến thức vào sách "toan-8": mã bài, mục tiêu, khái niệm…, chủ đề, dạng toán, bài tập luyện tập.
 * Chỉ điền vào ô còn trống (coalesce) nên không ghi đè nội dung giáo viên đã sửa; dạng toán cũ (giai đoạn 1)
 * được nối theo tên để giữ nguyên câu hỏi đã gắn với nó.
 */
export async function applyKnowledgeMap(db: Database, log: (m: string) => void = console.log): Promise<boolean> {
  if (await db.one(sql`select 1 from seed_marks where key = ${MAP_KEY}`)) return false;
  const book = await db.one<{ id: number }>(sql`select id from textbooks where slug = 'toan-8'`);
  if (!book) return false;
  const codes = lessonCodes();
  const stats = { themes: 0, types: 0, linked: 0, questions: 0 };

  await db.tx(async (t) => {
    // Mã cho mọi mục của sách (kể cả mục không có trong bản đồ)
    for (const [slug, code] of codes) {
      await t.exec(sql`update lessons set code = ${code} where textbook_id = ${book.id} and slug = ${slug} and code is null
        and not exists (select 1 from lessons x where x.textbook_id = ${book.id} and x.code = ${code})`);
    }
    for (const ch of TOAN8_MAP) {
      await t.exec(sql`
        update chapters set objectives = coalesce(objectives, ${ch.objectives || null}), key_points = coalesce(key_points, ${ch.keyPoints || null}),
          formulas = coalesce(formulas, ${ch.formulas || null}),
          verify_status = case when verify_status = 'unverified' then ${ch.verify.status} else verify_status end,
          verify_note = coalesce(verify_note, ${ch.verify.note})
        where textbook_id = ${book.id} and code = ${ch.code}`);
      for (const a of ch.aux) {
        if (a.title) {
          await t.exec(sql`update lessons set title = ${a.title.to} where textbook_id = ${book.id} and slug = ${a.slug} and title = ${a.title.from}`);
        }
        await setLessonMeta(t, book.id, a.slug, { objectives: a.objectives }, a.verify ?? ch.verify);
      }
      for (const l of ch.lessons) {
        const lessonId = await setLessonMeta(t, book.id, l.slug, l, ch.verify);
        if (!lessonId) throw new Error(`Bản đồ kiến thức: không tìm thấy bài ${l.slug}`);
        await applyLesson(t, book.id, lessonId, codes.get(l.slug)!, l, stats);
      }
    }
    await t.exec(sql`insert into seed_marks (key, note) values (${MAP_KEY}, ${`${stats.themes} chủ đề, ${stats.types} dạng toán, ${stats.questions} câu`})`);
  });
  log(`Đã nạp bản đồ kiến thức Toán 8: ${stats.themes} chủ đề, ${stats.types} dạng toán (${stats.linked} dạng nối với dữ liệu cũ), ${stats.questions} câu luyện tập.`);
  return true;
}

async function setLessonMeta(t: Queryable, textbookId: number, slug: string, m: Partial<MapLesson>, verify: Verify): Promise<number | null> {
  const row = await t.one<{ id: number }>(sql`
    update lessons set
      objectives = coalesce(objectives, ${m.objectives ?? null}),
      prerequisites = coalesce(prerequisites, ${m.prerequisites ?? null}),
      concepts = coalesce(concepts, ${m.concepts ?? null}),
      formulas = coalesce(formulas, ${m.formulas ?? null}),
      properties = coalesce(properties, ${m.properties ?? null}),
      theorems = coalesce(theorems, ${m.theorems ?? null}),
      difficulty = coalesce(difficulty, ${m.difficulty ?? null}),
      verify_status = case when verify_status = 'unverified' then ${verify.status} else verify_status end,
      verify_note = coalesce(verify_note, ${verify.note})
    where textbook_id = ${textbookId} and slug = ${slug}
    returning id`);
  return row?.id ?? null;
}

async function applyLesson(
  t: Queryable,
  textbookId: number,
  lessonId: number,
  lessonCode: string,
  l: MapLesson,
  stats: { themes: number; types: number; linked: number; questions: number },
) {
  const existing = await t.many<{ id: number; title: string; code: string | null }>(sql`
    select id, title, code from topics where lesson_id = ${lessonId} order by sort_order, id`);
  const used = new Set<number>();
  let n = 0;
  for (const [ti, th] of l.themes.entries()) {
    const themeCode = `${lessonCode}.CD${ti + 1}`;
    let theme = await t.one<{ id: number }>(sql`select id from themes where code = ${themeCode}`);
    if (!theme) {
      theme = await t.one<{ id: number }>(sql`
        insert into themes (lesson_id, code, title, description, sort_order) values (${lessonId}, ${themeCode}, ${th.title}, ${th.description ?? null}, ${ti + 1})
        returning id`);
      stats.themes++;
    }
    for (const ty of th.types) {
      n++;
      const code = `${lessonCode}.D${n}`;
      const names = [ty.title, ...(ty.legacy ?? [])];
      const byCode = existing.find((e) => e.code === code);
      const match = byCode ?? existing.find((e) => !e.code && !used.has(e.id) && names.includes(e.title));
      let topicId: number;
      if (match) {
        used.add(match.id);
        stats.linked++;
        await t.exec(sql`
          update topics set code = coalesce(code, ${code}), slug = coalesce(slug, ${ty.slug}), theme_id = coalesce(theme_id, ${theme!.id}),
            title = case when title = any(${ty.legacy ?? []}::text[]) then ${ty.title} else title end,
            knowledge = coalesce(knowledge, ${ty.knowledge}), signs = coalesce(signs, ${ty.signs}), method = coalesce(method, ${ty.method}),
            steps = coalesce(steps, ${ty.steps}), mistakes = coalesce(mistakes, ${ty.mistakes}), example = coalesce(example, ${ty.example}),
            example_solution = coalesce(example_solution, ${ty.solution}),
            levels = case when cardinality(levels) = 0 then ${ty.levels}::smallint[] else levels end,
            sort_order = ${n}, updated_at = now()
          where id = ${match.id}`);
        topicId = match.id;
      } else {
        const row = await t.one<{ id: number }>(sql`
          insert into topics (lesson_id, theme_id, code, slug, title, knowledge, signs, method, steps, mistakes, example, example_solution, levels, sort_order)
          values (${lessonId}, ${theme!.id}, ${code}, ${ty.slug}, ${ty.title}, ${ty.knowledge}, ${ty.signs}, ${ty.method}, ${ty.steps}, ${ty.mistakes},
            ${ty.example}, ${ty.solution}, ${ty.levels}::smallint[], ${n})
          returning id`);
        topicId = row!.id;
      }
      stats.types++;
      // Dạng đã có mã từ lần nạp trước: bài tập luyện tập đã có (hoặc giáo viên đã chỉnh), không thêm lại.
      if (byCode) continue;
      for (const ex of ty.exercises) {
        // Không thêm câu trùng hệt một câu đã có trong bài (ví dụ câu mẫu giai đoạn 1): cùng đề và cùng tập phương án / các ý.
        if (await hasSameQuestion(t, lessonId, ex)) continue;
        await insertSeedQuestion(t, textbookId, lessonId, topicId, ex, MAP_SOURCE);
        stats.questions++;
      }
    }
  }
  // Dạng toán cũ không có trong bản đồ (ví dụ do giáo viên thêm) đứng sau, giữ nguyên.
  let k = n;
  for (const e of existing) if (!used.has(e.id)) await t.exec(sql`update topics set sort_order = ${++k} where id = ${e.id}`);
}

async function hasSameQuestion(t: Queryable, lessonId: number, ex: MapExercise): Promise<boolean> {
  const rows = await t.many<{ id: number; type: string }>(sql`
    select q.id, et.code as type from questions q join exercise_types et on et.id = q.exercise_type_id
    where q.lesson_id = ${lessonId} and q.stem = ${ex.stem}`);
  const mine = [...(ex.options ?? []), ...(ex.statements ?? []).map(([s]) => s)].sort().join('\n');
  for (const r of rows) {
    if (r.type !== ex.type) continue;
    if (r.type !== 'mcq' && r.type !== 'true_false') return true;
    const ans = await t.many<{ content: string }>(sql`select content from answers where question_id = ${r.id}`);
    if (ans.map((a) => a.content).sort().join('\n') === mine) return true;
  }
  return false;
}
