/**
 * Kiểm tra nội dung bài học giai đoạn 3 (lí thuyết, công thức cần nhớ, ví dụ minh họa):
 * mỗi bài có đủ phần, mỗi dạng toán có ví dụ cho mọi mức độ phù hợp, công thức/hình vẽ/sơ đồ hợp lệ.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TOAN8_MAP } from '../../src/seed/toan8-map';
import type { MapLesson } from '../../src/seed/toan8-map/types';
import { TOAN8_LESSONS } from '../../src/seed/toan8-lessons';
import type { WorkedExample } from '../../src/seed/toan8-lessons/types';
import { findMathErrors } from '../../src/shared/richtext';
import { figureToSvg } from '../../src/shared/figure';

const mapLessons = new Map<string, MapLesson>();
for (const c of TOAN8_MAP) for (const l of c.lessons) mapLessons.set(l.slug, l);

function checkText(text: string | undefined, where: string) {
  if (!text) return;
  assert.deepEqual(findMathErrors(text), [], `${where}: lỗi công thức`);
  assert.ok(!/\$\{/.test(text), `${where}: còn sót \${…}`);
}

test('nội dung bài học: không trùng bài, bài có trong bản đồ kiến thức', () => {
  const seen = new Set<string>();
  for (const c of TOAN8_LESSONS) {
    assert.ok(!seen.has(c.slug), `trùng nội dung bài ${c.slug}`);
    seen.add(c.slug);
    assert.ok(mapLessons.has(c.slug), `bài ${c.slug} không có trong bản đồ kiến thức`);
  }
});

test('nội dung bài học: đủ các phần, công thức hợp lệ', () => {
  for (const c of TOAN8_LESSONS) {
    assert.ok(c.applications.trim().length > 20, `${c.slug}: thiếu ứng dụng thực tế`);
    checkText(c.applications, `${c.slug} ứng dụng`);
    assert.ok(c.theory.length >= 4, `${c.slug}: cần ít nhất 4 mục khám phá kiến thức`);
    for (const [i, t] of c.theory.entries()) {
      const w = `${c.slug} lí thuyết ${i + 1}`;
      assert.ok(t.title.trim() && t.body.trim(), `${w}: thiếu tiêu đề hoặc nội dung`);
      assert.ok(!/\\\(/.test(t.title), `${w}: tiêu đề không chứa công thức`);
      checkText(t.body, w);
      checkText(t.example, `${w} ví dụ`);
      if (t.formula) checkText(`\\[${t.formula}\\]`, `${w} công thức`);
    }
    const cards = c.formulas.flatMap((g) => g.items);
    assert.ok(cards.length >= 1, `${c.slug}: cần ít nhất 1 công thức cần nhớ`);
    for (const g of c.formulas) {
      assert.ok(g.group.trim() && g.items.length, `${c.slug}: nhóm công thức rỗng`);
      for (const f of g.items) {
        const w = `${c.slug} công thức "${f.name}"`;
        assert.ok(f.tex.trim() && f.symbols.trim() && f.example.trim(), `${w}: thiếu công thức, kí hiệu hoặc ví dụ`);
        assert.ok(!/\\\(|\\\[/.test(f.tex), `${w}: tex không kèm \\( \\[`);
        checkText(`\\[${f.tex}\\]`, w);
        checkText(f.symbols, `${w} kí hiệu`);
        checkText(f.example, `${w} ví dụ`);
        checkText(f.condition, `${w} điều kiện`);
      }
    }
  }
});

function checkExample(e: WorkedExample, where: string) {
  assert.ok(e.problem.trim() && e.analysis.trim() && e.knowledge.trim() && e.answer.trim(), `${where}: thiếu đề, phân tích, kiến thức hoặc kết luận`);
  assert.ok(e.steps.length >= 2, `${where}: lời giải cần ít nhất 2 bước`);
  for (const [k, v] of Object.entries({ problem: e.problem, analysis: e.analysis, knowledge: e.knowledge, answer: e.answer, tip: e.tip, given: e.given, toProve: e.toProve })) checkText(v, `${where} ${k}`);
  e.steps.forEach((s, i) => {
    assert.ok(s.trim(), `${where} bước ${i + 1} rỗng`);
    assert.ok(!s.includes('\n'), `${where} bước ${i + 1}: mỗi bước một dòng`);
    checkText(s, `${where} bước ${i + 1}`);
  });
  if (e.figure) assert.deepEqual(figureToSvg(e.figure).errors, [], `${where}: hình vẽ hợp lệ`);
  if (e.given || e.toProve || e.figure) assert.ok(e.given && e.toProve && e.figure, `${where}: ví dụ hình học cần đủ hình vẽ, GT, KL`);
}

test('ví dụ minh họa: mỗi dạng toán có ví dụ cho từng mức độ phù hợp, đúng dạng của bài', () => {
  for (const c of TOAN8_LESSONS) {
    const lesson = mapLessons.get(c.slug)!;
    const types = lesson.themes.flatMap((t) => t.types);
    const slugs = new Set(types.map((t) => t.slug));
    for (const key of Object.keys(c.examples)) assert.ok(slugs.has(key), `${c.slug}: dạng ${key} không có trong bài`);
    for (const key of Object.keys(c.notes ?? {})) assert.ok(slugs.has(key), `${c.slug}: lưu ý cho dạng lạ ${key}`);
    for (const t of types) {
      const list = c.examples[t.slug] ?? [];
      const levels = list.map((e) => e.level);
      for (const lv of t.levels) assert.ok(levels.includes(lv), `${c.slug} › ${t.slug}: thiếu ví dụ mức ${lv}`);
      assert.deepEqual([...levels].sort(), levels, `${c.slug} › ${t.slug}: ví dụ xếp từ dễ đến khó`);
      list.forEach((e, i) => checkExample(e, `${c.slug} › ${t.slug} VD${i + 1}`));
      assert.ok(c.notes?.[t.slug], `${c.slug} › ${t.slug}: thiếu "Những lưu ý khi giải"`);
      checkText(c.notes?.[t.slug], `${c.slug} › ${t.slug} lưu ý`);
    }
  }
});

test('nội dung bài học: tiến độ phủ toàn chương trình', () => {
  const done = new Set(TOAN8_LESSONS.map((c) => c.slug));
  const missing = [...mapLessons.keys()].filter((s) => !done.has(s));
  const examples = TOAN8_LESSONS.reduce((n, c) => n + Object.values(c.examples).reduce((a, l) => a + l.length, 0), 0);
  console.log(`  Nội dung giai đoạn 3: ${done.size}/${mapLessons.size} bài, ${examples} ví dụ minh họa.${missing.length ? ` Chưa có: ${missing.join(', ')}` : ''}`);
  assert.ok(done.size > 0);
});
