import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findMathErrors, plainExcerpt, renderRich, renderRichInline } from '../../src/shared/richtext';
import { figureToSvg, parseFigure } from '../../src/shared/figure';
import { TOAN8_CHAPTERS, TOAN8_PPCT_2026 } from '../../src/seed/toan8-structure';
import { TOAN8_CONTENT } from '../../src/seed/toan8-content';
import { TOAN8_QUESTIONS } from '../../src/seed/toan8-questions';

test('văn bản: escape HTML, công thức, danh sách, chữ đậm', () => {
  const html = renderRich('<script>alert(1)</script> **đậm** \\(x^2\\)\n\n- ý 1\n- ý 2\n\n\\[a+b\\]');
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('<strong>đậm</strong>'));
  assert.ok(html.includes('class="katex"'));
  assert.ok(html.includes('<ul><li>ý 1</li><li>ý 2</li></ul>'));
  assert.ok(html.includes('class="math-block"'));
  assert.ok(!renderRichInline('a\n\nb').includes('<p>'));
});

test('KaTeX không cho chèn liên kết hay mã', () => {
  const html = renderRich('\\(\\href{javascript:alert(1)}{x}\\) \\(\\htmlId{a}{b}\\)');
  assert.ok(!/href\s*=\s*"javascript/i.test(html), 'không có liên kết javascript:');
  assert.ok(!/<a[\s>]/.test(html), 'không sinh thẻ <a>');
  assert.ok(!html.includes('id="a"'));
});

test('báo lỗi công thức bằng tiếng Việt', () => {
  assert.deepEqual(findMathErrors('\\(x^2\\)'), []);
  assert.equal(findMathErrors('\\(x^2').length, 1);
  assert.ok(findMathErrors('\\(\\frac{1}{\\)')[0].includes('bị lỗi'));
});

test('rút gọn văn bản có công thức', () => {
  assert.equal(plainExcerpt('Tính \\(x^2 + \\dfrac{1}{2}\\) và \\(\\widehat{A} = 60^\\circ\\)'), 'Tính x² + 1/2 và ∠A = 60°');
});

test('hình vẽ hình học: đọc mô tả và vẽ SVG', () => {
  const fig = parseFigure('A(0,3) B(-2,0) C(4,0) H(0,0)\nABCA\nAH:dash\nvuong(A,H,C)\ngoc(B,A,C)');
  assert.deepEqual(fig.errors, []);
  assert.equal(fig.points.length, 4);
  assert.equal(fig.segments.length, 4);
  assert.equal(fig.segments[3].dashed, true);
  const { svg } = figureToSvg('A(0,3) B(-2,0) C(4,0)\nABCA');
  assert.ok(svg.startsWith('<svg'));
  assert.ok(svg.includes('>A</text>'));
  assert.ok(figureToSvg('A(0,0)\nAX').errors[0].includes('chưa được khai báo'));
  assert.ok(figureToSvg('A(1)').errors.length > 0);
  assert.ok(figureToSvg('A(0,0) B(1,1)\nvuong(A,B)').errors.length > 0);
  assert.ok(!figureToSvg('A(0,0) B(1,1)\n<script>').svg.includes('<script'));
});

test('dữ liệu Toán 8: PPCT khớp cấu trúc chương trình', () => {
  const slugs = new Set(TOAN8_CHAPTERS.flatMap((c) => c.lessons.map((l) => l.slug)));
  assert.equal(slugs.size, TOAN8_CHAPTERS.flatMap((c) => c.lessons).length, 'slug bài học không trùng');
  for (const item of TOAN8_PPCT_2026) if (item.lesson) assert.ok(slugs.has(item.lesson), `PPCT tham chiếu bài không tồn tại: ${item.lesson}`);
  // mỗi bài trong cấu trúc có đúng một dòng PPCT, số tiết khớp
  for (const c of TOAN8_CHAPTERS) {
    for (const l of c.lessons) {
      const rows = TOAN8_PPCT_2026.filter((i) => i.lesson === l.slug);
      assert.equal(rows.length, 1, `${l.slug} phải có đúng 1 dòng PPCT`);
      assert.equal(rows[0].periods, l.periods, `số tiết ${l.slug}`);
    }
  }
  assert.equal(TOAN8_PPCT_2026.reduce((n, i) => n + i.periods, 0), 140, 'tổng 140 tiết');
  let expected = 1;
  for (const i of TOAN8_PPCT_2026) {
    assert.equal(i.from, expected, `tiết bắt đầu của "${i.title}"`);
    assert.equal(i.to - i.from + 1, i.periods);
    expected = i.to + 1;
  }
  const numbers = TOAN8_CHAPTERS.flatMap((c) => c.lessons.filter((l) => l.number).map((l) => l.number!)).sort((a, b) => a - b);
  assert.deepEqual(numbers, Array.from({ length: 39 }, (_, i) => i + 1), 'đủ Bài 1 – Bài 39');
});

test('nội dung và câu hỏi mẫu: công thức không lỗi, đáp án hợp lệ', () => {
  for (const [slug, c] of Object.entries(TOAN8_CONTENT)) {
    for (const s of c.sections) {
      assert.deepEqual(findMathErrors(s.body), [], `${slug}: ${s.title ?? s.kind}`);
      if (s.solution) assert.deepEqual(findMathErrors(s.solution), [], `${slug}: lời giải ${s.title}`);
    }
  }
  for (const q of TOAN8_QUESTIONS) {
    const texts = [q.stem, q.solution, ...(q.options ?? []), ...(q.statements ?? []).map((s) => s[0]), q.hint ?? ''];
    for (const t of texts) assert.deepEqual(findMathErrors(t), [], q.stem);
    if (q.type === 'mcq') assert.ok(q.options?.length === 4 && q.correct);
    if (q.type === 'true_false') assert.equal(q.statements?.length, 4);
    if (q.type === 'short_answer') assert.ok(q.accepted?.length);
    if (q.figure) assert.deepEqual(figureToSvg(q.figure).errors, []);
  }
});
