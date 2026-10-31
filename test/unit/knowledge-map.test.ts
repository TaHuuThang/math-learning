/**
 * Kiểm tra chất lượng bản đồ kiến thức Toán 8 (giai đoạn 2):
 * đối chiếu mục lục SGK, đủ chương/bài, không trùng, mỗi dạng toán đủ 8 thành phần, bài tập hợp lệ.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TOAN8_CHAPTERS } from '../../src/seed/toan8-structure';
import { TOAN8_MAP, lessonCodes } from '../../src/seed/toan8-map';
import type { MapExercise } from '../../src/seed/toan8-map/types';
import { findMathErrors } from '../../src/shared/richtext';
import { figureToSvg } from '../../src/shared/figure';
import { parseNumber } from '../../src/shared/grading';
import { chooseByLevel } from '../../src/shared/pick';

/**
 * Mục lục SGK Toán 8 – Kết nối tri thức với cuộc sống (tập 1, 2), chép độc lập để đối chiếu
 * (nguồn: VietJack, Hoatieu – mục lục giải SGK; PPCT 2026-2027 của giáo viên).
 * L = luyện tập chung, R = bài tập cuối chương; số là số bài.
 */
const SGK: { code: string; title: string; items: (number | 'L' | 'R' | string)[] }[] = [
  { code: 'I', title: 'Đa thức', items: [1, 2, 3, 'L', 4, 5, 'L', 'R'] },
  { code: 'II', title: 'Hằng đẳng thức đáng nhớ và ứng dụng', items: [6, 7, 8, 'L', 9, 'L', 'R'] },
  { code: 'III', title: 'Tứ giác', items: [10, 11, 'L', 12, 'L', 13, 14, 'L', 'R'] },
  { code: 'IV', title: 'Định lí Thalès', items: [15, 16, 17, 'L', 'R'] },
  { code: 'V', title: 'Dữ liệu và biểu đồ', items: [18, 19, 20, 'L', 'R'] },
  {
    code: 'TN1',
    title: 'Hoạt động thực hành trải nghiệm (Học kì I)',
    items: ['Công thức lãi kép', 'Thực hiện tính toán trên đa thức với phần mềm GeoGebra', 'Vẽ hình đơn giản với phần mềm GeoGebra', 'Phân tích đặc điểm khí hậu Việt Nam'],
  },
  { code: 'VI', title: 'Phân thức đại số', items: [21, 22, 'L', 23, 24, 'L', 'R'] },
  { code: 'VII', title: 'Phương trình bậc nhất và hàm số bậc nhất', items: [25, 26, 'L', 27, 28, 29, 'L', 'R'] },
  { code: 'VIII', title: 'Mở đầu về tính xác suất của biến cố', items: [30, 31, 32, 'L', 'R'] },
  { code: 'IX', title: 'Tam giác đồng dạng', items: [33, 34, 'L', 35, 36, 37, 'L', 'R'] },
  { code: 'X', title: 'Một số hình khối trong thực tiễn', items: [38, 39, 'L', 'R'] },
  {
    code: 'TN2',
    title: 'Hoạt động thực hành trải nghiệm (Học kì II)',
    items: [
      'Một vài ứng dụng của hàm số bậc nhất trong tài chính',
      'Ứng dụng định lí Thalès, định lí Pythagore và tam giác đồng dạng để đo chiều cao, khoảng cách',
      'Thực hành tính toán trên phân thức đại số và vẽ đồ thị hàm số với phần mềm GeoGebra',
      'Mô tả thí nghiệm ngẫu nhiên với phần mềm Excel',
    ],
  },
];

/** Tên 39 bài theo SGK. */
const SGK_LESSONS: Record<number, string> = {
  1: 'Đơn thức', 2: 'Đa thức', 3: 'Phép cộng và phép trừ đa thức', 4: 'Phép nhân đa thức', 5: 'Phép chia đa thức cho đơn thức',
  6: 'Hiệu hai bình phương. Bình phương của một tổng hay một hiệu', 7: 'Lập phương của một tổng. Lập phương của một hiệu',
  8: 'Tổng và hiệu hai lập phương', 9: 'Phân tích đa thức thành nhân tử', 10: 'Tứ giác', 11: 'Hình thang cân', 12: 'Hình bình hành',
  13: 'Hình chữ nhật', 14: 'Hình thoi và hình vuông', 15: 'Định lí Thalès trong tam giác', 16: 'Đường trung bình của tam giác',
  17: 'Tính chất đường phân giác của tam giác', 18: 'Thu thập và phân loại dữ liệu', 19: 'Biểu diễn dữ liệu bằng bảng, biểu đồ',
  20: 'Phân tích số liệu thống kê dựa vào biểu đồ', 21: 'Phân thức đại số', 22: 'Tính chất cơ bản của phân thức đại số',
  23: 'Phép cộng và phép trừ phân thức đại số', 24: 'Phép nhân và phép chia phân thức đại số', 25: 'Phương trình bậc nhất một ẩn',
  26: 'Giải bài toán bằng cách lập phương trình', 27: 'Khái niệm hàm số và đồ thị của hàm số', 28: 'Hàm số bậc nhất và đồ thị của hàm số bậc nhất',
  29: 'Hệ số góc của đường thẳng', 30: 'Kết quả có thể và kết quả thuận lợi', 31: 'Cách tính xác suất của biến cố bằng tỉ số',
  32: 'Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng', 33: 'Hai tam giác đồng dạng', 34: 'Ba trường hợp đồng dạng của hai tam giác',
  35: 'Định lí Pythagore và ứng dụng', 36: 'Các trường hợp đồng dạng của hai tam giác vuông', 37: 'Hình đồng dạng', 38: 'Hình chóp tam giác đều',
  39: 'Hình chóp tứ giác đều',
};

const auxTitle = new Map(TOAN8_MAP.flatMap((c) => c.aux.filter((a) => a.title).map((a) => [a.slug, a.title!.to] as const)));

test('đối chiếu mục lục SGK: tên chương, thứ tự chương', () => {
  assert.deepEqual(
    TOAN8_CHAPTERS.map((c) => [c.code, c.title]),
    SGK.map((c) => [c.code, c.title]),
  );
  assert.deepEqual(
    TOAN8_CHAPTERS.map((c) => c.semester),
    [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
    'Học kì I: Chương I–V và HĐTN tập 1; Học kì II: Chương VI–X và HĐTN tập 2',
  );
});

test('đối chiếu mục lục SGK: tên bài, thứ tự bài trong từng chương', () => {
  for (const [i, ch] of TOAN8_CHAPTERS.entries()) {
    const want = SGK[i].items;
    const got = ch.lessons.map((l) => (l.kind === 'lesson' ? l.number! : l.kind === 'practice' ? 'L' : l.kind === 'review' ? 'R' : auxTitle.get(l.slug) ?? l.title));
    assert.deepEqual(got, want, `Chương ${ch.code}: thứ tự mục`);
    for (const l of ch.lessons) {
      if (l.kind === 'lesson') assert.equal(l.title, SGK_LESSONS[l.number!], `Tên Bài ${l.number}`);
      if (l.kind === 'review') assert.equal(l.title, `Bài tập cuối chương ${ch.code}`);
      if (l.kind === 'practice') assert.equal(l.title, 'Luyện tập chung');
    }
  }
  const numbers = TOAN8_CHAPTERS.flatMap((c) => c.lessons.filter((l) => l.kind === 'lesson').map((l) => l.number));
  assert.deepEqual(numbers, Array.from({ length: 39 }, (_, i) => i + 1), 'Bài 1–39 liên tục, không thiếu, không trùng');
});

test('không trùng: slug bài, mã bài', () => {
  const slugs = TOAN8_CHAPTERS.flatMap((c) => c.lessons.map((l) => l.slug));
  assert.equal(new Set(slugs).size, slugs.length);
  const codes = [...lessonCodes().values()];
  assert.equal(new Set(codes).size, codes.length);
  assert.equal(codes.length, slugs.length);
  for (const c of codes) assert.match(c, /^T8\.(B\d\d|C\d+\.(LT\d|ON)|TN\d\.HD\d)$/);
});

test('bản đồ kiến thức phủ đủ 12 mục chương và mọi bài', () => {
  assert.deepEqual(
    [...TOAN8_MAP.map((c) => c.code)].sort(),
    TOAN8_CHAPTERS.map((c) => c.code).sort(),
    'mỗi chương (kể cả hoạt động trải nghiệm) có dữ liệu bản đồ',
  );
  for (const ch of TOAN8_CHAPTERS) {
    const m = TOAN8_MAP.find((x) => x.code === ch.code)!;
    const lessons = ch.lessons.filter((l) => l.kind === 'lesson').map((l) => l.slug);
    const others = ch.lessons.filter((l) => l.kind !== 'lesson').map((l) => l.slug);
    assert.deepEqual(m.lessons.map((l) => l.slug), lessons, `Chương ${ch.code}: đủ bài, đúng thứ tự`);
    assert.deepEqual(m.aux.map((a) => a.slug).sort(), [...others].sort(), `Chương ${ch.code}: đủ mục luyện tập / ôn tập / hoạt động`);
    assert.ok(m.objectives.trim() && m.keyPoints.trim(), `Chương ${ch.code}: có mục tiêu, kiến thức trọng tâm`);
    if (ch.kind === 'chapter') assert.ok(m.formulas.trim(), `Chương ${ch.code}: có công thức cần nhớ`);
    for (const a of m.aux) assert.ok(a.objectives.trim(), `${a.slug}: có mục tiêu`);
  }
});

function checkText(where: string, text: string | undefined) {
  if (!text) return;
  assert.deepEqual(findMathErrors(text), [], `${where}: lỗi công thức`);
}

function checkExercise(where: string, ex: MapExercise) {
  checkText(`${where} – đề`, ex.stem);
  checkText(`${where} – lời giải`, ex.solution);
  checkText(`${where} – gợi ý`, ex.hint);
  assert.ok(ex.stem.trim() && ex.solution.trim(), `${where}: có đề và lời giải`);
  if (ex.type === 'mcq') {
    assert.equal(ex.options?.length, 4, `${where}: 4 phương án`);
    assert.equal(new Set(ex.options!.map((o) => o.replace(/\s+/g, ''))).size, 4, `${where}: phương án không trùng`);
    assert.match(ex.correct ?? '', /^[A-D]$/, `${where}: đáp án A–D`);
    ex.options!.forEach((o, i) => checkText(`${where} – phương án ${'ABCD'[i]}`, o));
  }
  if (ex.type === 'true_false') {
    assert.equal(ex.statements?.length, 4, `${where}: 4 ý`);
    ex.statements!.forEach(([s], i) => checkText(`${where} – ý ${'abcd'[i]}`, s));
    assert.ok(ex.statements!.some(([, v]) => v) && ex.statements!.some(([, v]) => !v), `${where}: có cả ý đúng và ý sai`);
  }
  if (ex.type === 'short_answer') {
    assert.ok(ex.accepted?.length, `${where}: có đáp án`);
    for (const a of ex.accepted!) assert.notEqual(parseNumber(a), null, `${where}: đáp án "${a}" đọc được thành số`);
  }
  if (ex.type === 'geometry_essay') assert.ok(ex.figure, `${where}: có hình vẽ`);
  if (ex.figure) assert.deepEqual(figureToSvg(ex.figure).errors, [], `${where}: hình vẽ hợp lệ`);
}

test('mỗi bài: mã, mục tiêu, kiến thức nền, khái niệm, chủ đề, dạng toán', () => {
  for (const ch of TOAN8_MAP) {
    for (const l of ch.lessons) {
      const where = l.slug;
      assert.ok(l.objectives.trim() && l.prerequisites.trim() && l.concepts.trim(), `${where}: mục tiêu, kiến thức nền, khái niệm`);
      assert.ok(l.difficulty >= 1 && l.difficulty <= 4);
      for (const k of ['objectives', 'prerequisites', 'concepts', 'formulas', 'properties', 'theorems'] as const) checkText(`${where}.${k}`, l[k]);
      assert.ok(l.themes.length >= 1, `${where}: có chủ đề`);
      const slugs = new Set<string>();
      const titles = new Set<string>();
      for (const th of l.themes) {
        assert.ok(th.title.trim() && th.types.length >= 1, `${where} / ${th.title}: chủ đề có dạng toán`);
        for (const ty of th.types) {
          const w = `${where} / ${ty.slug}`;
          assert.match(ty.slug, /^[a-z0-9-]+$/);
          assert.ok(!slugs.has(ty.slug), `${w}: slug trùng`);
          assert.ok(!titles.has(ty.title), `${w}: tên dạng trùng`);
          slugs.add(ty.slug);
          titles.add(ty.title);
          for (const k of ['knowledge', 'signs', 'method', 'steps', 'mistakes', 'example', 'solution'] as const) {
            assert.ok(ty[k].trim(), `${w}: thiếu ${k}`);
            checkText(`${w}.${k}`, ty[k]);
          }
          assert.ok(ty.levels.length >= 1 && ty.levels.every((x, i, a) => x >= 1 && x <= 4 && (i === 0 || a[i - 1] < x)), `${w}: mức độ tăng dần, không trùng`);
          assert.ok(ty.exercises.length >= 2, `${w}: ít nhất 2 bài tập luyện tập`);
          ty.exercises.forEach((ex, i) => {
            checkExercise(`${w} #${i + 1}`, ex);
            assert.ok(ty.levels.includes(ex.level), `${w} #${i + 1}: mức độ bài tập (${ex.level}) thuộc mức độ của dạng`);
          });
        }
      }
    }
  }
});

test('đề kiểm tra cuối chương chọn đúng cấu trúc mức độ và bù mức thiếu', () => {
  const pool = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3].map((level, id) => ({ id, level }));
  const got = chooseByLevel(pool, { 1: 4, 2: 3, 3: 2, 4: 1 });
  assert.equal(got.length, 10);
  assert.deepEqual(got.map((g) => g.level), [1, 1, 1, 1, 2, 2, 2, 3, 3, 3]);
  assert.equal(new Set(got.map((g) => g.id)).size, 10);
});

test('đáp án đúng của câu trắc nghiệm phân bố đều ở A, B, C, D (giao diện không trộn phương án)', () => {
  const count: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  let total = 0;
  for (const ch of TOAN8_MAP)
    for (const l of ch.lessons)
      for (const th of l.themes)
        for (const ty of th.types)
          for (const ex of ty.exercises)
            if (ex.type === 'mcq') {
              count[ex.correct!]++;
              total++;
            }
  for (const k of 'ABCD') assert.ok(count[k] >= total * 0.1 && count[k] <= total * 0.45, `Đáp án ${k}: ${count[k]}/${total}`);
});

test('không trùng câu hỏi: đề bài tập trong bản đồ không lặp lại nhau và không lặp câu mẫu giai đoạn 1', async () => {
  const { TOAN8_QUESTIONS } = await import('../../src/seed/toan8-questions');
  // So cả đề lẫn phương án / các ý (nhiều câu Đúng/Sai dùng chung lời dẫn "Mỗi khẳng định sau đúng hay sai?")
  const norm = (q: { stem: string; options?: string[]; statements?: [string, boolean][] }) =>
    [q.stem, ...[...(q.options ?? []), ...(q.statements ?? []).map(([t]) => t)].sort()].join(' | ').replace(/\s+/g, ' ').trim();
  const seen = new Map<string, string>();
  for (const q of TOAN8_QUESTIONS) seen.set(norm(q), `câu mẫu giai đoạn 1 (${q.lesson})`);
  for (const ch of TOAN8_MAP)
    for (const l of ch.lessons)
      for (const th of l.themes)
        for (const ty of th.types)
          for (const ex of ty.exercises) {
            const k = norm(ex);
            assert.ok(!seen.has(k), `${l.slug} / ${ty.slug}: đề trùng với ${seen.get(k)}: "${k.slice(0, 60)}…"`);
            seen.set(k, `${l.slug} / ${ty.slug}`);
          }
});
