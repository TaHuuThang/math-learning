import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchShortAnswer, sameMathValue, validateAccepted } from '../../src/shared/answer-match';
import { gradeResponse, normalizeResponse } from '../../src/shared/grading';
import { isValidOrder, randomOptionOrder, reorderOptions, seededRandom, toDisplayLabel, toOriginalLabel } from '../../src/shared/shuffle';
import { apportion, generateExam, stemKey, type PoolItem } from '../../src/shared/exam-gen';
import { checkQuestion } from '../../src/shared/question-quality';
import { readXlsx, writeXlsx } from '../../src/server/xlsx';
import { parseTable, truthsFromText } from '../../src/domain/question-import';

test('trả lời ngắn: phân số, thập phân, cách viết tương đương', () => {
  const ok = (g: string, acc: string[], rule = {}) => matchShortAnswer(g, acc, rule).ok;
  assert.ok(ok('0,5', ['1/2']));
  assert.ok(ok('0.5', ['1/2']));
  assert.ok(ok('2/4', ['0,5']));
  assert.ok(ok('-1,5', ['-3/2']));
  assert.ok(ok('x = 3', ['3']));
  assert.ok(ok('√97', ['\\sqrt{97}']));
  assert.ok(ok('3√3', ['\\sqrt{27}']));
  assert.ok(ok('9,85', ['\\sqrt{97}'], { tolerance: 0.01 }));
  assert.ok(!ok('9,8', ['\\sqrt{97}'], { tolerance: 0.01 }));
  assert.ok(!ok('1,4', ['1,5']));
  assert.ok(!ok('', ['1']));
});

test('trả lời ngắn: đơn vị đo được tự đổi, sai loại đơn vị bị từ chối', () => {
  assert.ok(matchShortAnswer('12 cm', ['12'], { unit: 'cm' }).ok);
  assert.ok(matchShortAnswer('0,12 m', ['12'], { unit: 'cm' }).ok);
  assert.ok(matchShortAnswer('120mm', ['12'], { unit: 'cm' }).ok);
  assert.ok(matchShortAnswer('0,0024 m²', ['24'], { unit: 'cm²' }).ok);
  assert.ok(matchShortAnswer('90 phút', ['1,5'], { unit: 'giờ' }).ok);
  assert.ok(matchShortAnswer('75°', ['75'], { unit: '°' }).ok);
  const bad = matchShortAnswer('12 kg', ['12'], { unit: 'cm' });
  assert.equal(bad.ok, false);
  assert.match(bad.note ?? '', /Đơn vị/);
});

test('trả lời ngắn: biểu thức tương đương, dạng tích, tập nghiệm', () => {
  assert.ok(matchShortAnswer('(x+1)^2', ['x^2 + 2x + 1']).ok);
  assert.ok(matchShortAnswer('6yx²', ['6x^2y']).ok);
  assert.ok(!matchShortAnswer('x^2 + 2x', ['(x+1)^2']).ok);
  assert.ok(matchShortAnswer('(x-2)x', ['x(x - 2)'], { mode: 'factored' }).ok);
  const notProduct = matchShortAnswer('x^2 - 2x', ['x(x - 2)'], { mode: 'factored' });
  assert.equal(notProduct.ok, false);
  assert.match(notProduct.note ?? '', /dạng tích/);
  assert.ok(matchShortAnswer('x = -2; x = 1', ['1; -2']).ok);
  assert.ok(matchShortAnswer('S = {-2; 1}', ['1; -2']).ok);
  assert.ok(matchShortAnswer('-2 hoặc 1', ['1; -2']).ok);
  assert.ok(!matchShortAnswer('1', ['1; -2']).ok);
  assert.ok(matchShortAnswer('Hình thoi', ['hình thoi']).ok);
});

test('kiểm tra đáp án của giáo viên và phương án cùng giá trị', () => {
  assert.equal(validateAccepted(['12']).length, 0);
  assert.ok(validateAccepted(['12 cm']).length > 0, 'đáp án kèm đơn vị phải bị báo');
  assert.ok(validateAccepted(['x^2 - 2x'], { mode: 'factored' }).length > 0);
  assert.ok(sameMathValue('\\(\\dfrac{1}{2}\\)', '\\(0,5\\)'));
  assert.ok(!sameMathValue('\\(x^2\\)', '\\(2x\\)'));
});

test('chấm điểm dùng bộ so khớp mới và giữ thang Đúng/Sai', () => {
  const sa = gradeResponse('short_answer', [{ label: '1', content: '1/2', isCorrect: true }], { unit: 'm' }, normalizeResponse('short_answer', { text: '50 cm' }));
  assert.equal(sa.status, 'correct');
  const tf = gradeResponse(
    'true_false',
    ['a', 'b', 'c', 'd'].map((l, i) => ({ label: l, content: l, isCorrect: i % 2 === 0 })),
    {},
    normalizeResponse('true_false', { values: { a: true, b: false, c: false, d: true } }),
  );
  assert.equal(tf.correctCount, 2);
  assert.equal(tf.score, 0.25);
  const essay = normalizeResponse('essay', { text: '', images: [3, 'x', -1, 4] });
  assert.deepEqual(essay, { kind: 'essay', text: '', images: [3, 4] });
  assert.equal(gradeResponse('essay', [], {}, essay).status, 'pending');
});

test('đảo phương án: đổi nhãn hai chiều, đáp án không bị sai', () => {
  const rand = seededRandom(42);
  for (let i = 0; i < 200; i++) {
    const order = randomOptionOrder(rand);
    assert.ok(isValidOrder(order));
    for (const orig of 'ABCD') assert.equal(toOriginalLabel(order, toDisplayLabel(order, orig)), orig);
  }
  const opts = ['A', 'B', 'C', 'D'].map((l) => ({ label: l, content: `nd ${l}`, isCorrect: l === 'C' }));
  const shown = reorderOptions(opts, 'CADB');
  assert.deepEqual(
    shown.map((o) => o.label),
    ['A', 'B', 'C', 'D'],
  );
  assert.equal(shown[0].content, 'nd C');
  assert.ok(shown[0].isCorrect, 'phương án đúng (gốc C) hiện ở vị trí A');
  assert.equal(toDisplayLabel('CADB', 'C'), 'A');
  assert.equal(toOriginalLabel('CADB', 'A'), 'C');
  assert.equal(reorderOptions(opts, 'XYZW')[0].label, 'A', 'thứ tự không hợp lệ → giữ nguyên');
});

function pool(): PoolItem[] {
  const items: PoolItem[] = [];
  let id = 1;
  for (const area of ['algebra', 'geometry', 'stats'] as const)
    for (let lesson = 1; lesson <= (area === 'stats' ? 1 : 3); lesson++)
      for (let topic = 1; topic <= 3; topic++)
        for (const level of [1, 2, 3, 4])
          for (const type of ['mcq', 'true_false', 'short_answer'] as const) {
            const lid = (area === 'algebra' ? 0 : area === 'geometry' ? 10 : 20) + lesson;
            items.push({ id, type, level, topicId: lid * 10 + topic, lessonId: lid, area, stemKey: `s${id}`, lessonOrder: lid });
            id++;
          }
  return items;
}

test('tạo đề: đúng số câu, không trùng, đúng phạm vi mức độ và tỉ lệ', () => {
  const p = pool();
  const rand = seededRandom(7);
  const g = generateExam(p, { count: 20, levels: [1, 2, 3, 4], levelWeights: { 1: 4, 2: 3, 3: 2, 4: 1 } }, rand);
  assert.equal(g.ids.length, 20);
  assert.equal(new Set(g.ids).size, 20, 'không trùng câu');
  assert.deepEqual(g.byLevel, { 1: 8, 2: 6, 3: 4, 4: 2 });
  const levels = g.ids.map((id) => p.find((x) => x.id === id)!.level);
  assert.deepEqual(levels, [...levels].sort(), 'xếp từ dễ đến khó');
  const only3 = generateExam(p, { count: 10, levels: [3] }, rand);
  assert.ok(only3.ids.every((id) => p.find((x) => x.id === id)!.level === 3), 'không lấy ngoài mức đã chọn');
  // số câu theo từng loại
  const t = generateExam(p, { count: 0, typeCounts: { mcq: 6, true_false: 2, short_answer: 3 }, levels: [1, 2, 3, 4], order: 'type' }, rand);
  assert.deepEqual(t.byType, { mcq: 6, true_false: 2, short_answer: 3 });
  const types = t.ids.map((id) => p.find((x) => x.id === id)!.type);
  assert.deepEqual(types, ['mcq', 'mcq', 'mcq', 'mcq', 'mcq', 'mcq', 'true_false', 'true_false', 'short_answer', 'short_answer', 'short_answer']);
});

test('tạo đề: cân đối mạch kiến thức, bù mức thiếu, báo thiếu câu, bỏ câu trùng đề', () => {
  const p = pool();
  const rand = seededRandom(3);
  const g = generateExam(p, { count: 21, levels: [1, 2, 3, 4], balanceAreas: true }, rand);
  const byArea: Record<string, number> = {};
  for (const id of g.ids) {
    const a = p.find((x) => x.id === id)!.area!;
    byArea[a] = (byArea[a] ?? 0) + 1;
  }
  // tỉ lệ số bài: đại số 3, hình học 3, thống kê 1
  assert.ok(byArea.algebra >= 8 && byArea.geometry >= 8 && byArea.stats >= 1 && byArea.stats <= 5, JSON.stringify(byArea));
  const few = p.filter((x) => x.level !== 4);
  const g2 = generateExam(few, { count: 10, levels: [1, 2, 3, 4], levelWeights: { 4: 10 } }, rand);
  assert.equal(g2.ids.length, 10, 'mức 4 không có câu → lấy bù mức gần nhất');
  const tiny = generateExam(p.slice(0, 5), { count: 10, levels: [1, 2, 3, 4] }, rand);
  assert.equal(tiny.shortfall, 5);
  const dup = [...p.slice(0, 4), { ...p[0], id: 999 }];
  const g3 = generateExam(dup, { count: 5, levels: [1, 2, 3, 4] }, rand);
  assert.equal(g3.ids.length, 4, 'câu trùng đề bài chỉ lấy một lần');
  assert.equal(stemKey('Tính \\(x + 1\\)'), stemKey('tính  \\( x+1 \\)'));
  assert.deepEqual(apportion(10, { a: 1, b: 1, c: 1 }), { a: 4, b: 3, c: 3 });
});

test('kiểm định chất lượng: lỗi chặn lưu, cảnh báo đưa vào chờ duyệt', () => {
  const good = checkQuestion({
    type: 'mcq',
    level: 2,
    stem: 'Kết quả của phép tính \\(2x \\cdot 3x\\) là',
    options: ['\\(6x^2\\)', '\\(5x\\)', '\\(6x\\)', '\\(5x^2\\)'],
    correct: 'A',
    optionNotes: ['Nhân hệ số và nhân phần biến.', 'Cộng nhầm hệ số.', 'Quên nhân phần biến.', 'Cộng hệ số, nhân biến.'],
    solution: 'Nhân hệ số với hệ số, phần biến với phần biến: \\(2x \\cdot 3x = 6x^2\\).',
  });
  assert.deepEqual(good, { errors: [], warnings: [] });
  const twoRight = checkQuestion({ type: 'mcq', level: 1, stem: 'Giá trị của \\(\\dfrac{2}{4}\\) bằng bao nhiêu?', options: ['\\(\\dfrac12\\)', '\\(0,5\\)', '\\(2\\)', '\\(4\\)'], correct: 'A', solution: 'Rút gọn phân số được một phần hai.' });
  assert.ok(twoRight.warnings.some((w) => w.includes('hai đáp án đúng')));
  const letter = checkQuestion({ type: 'mcq', level: 1, stem: 'Chọn câu đúng về đơn thức sau đây', options: ['a', 'b', 'c', 'd'], correct: 'B', solution: 'Đáp án B vì đó là đơn thức.' });
  assert.ok(letter.warnings.some((w) => w.includes('nhắc tên phương án')));
  const broken = checkQuestion({ type: 'mcq', level: 1, stem: '', options: ['a', 'a', '', 'd'], correct: '', solution: '' });
  assert.ok(broken.errors.length >= 3);
  const tf = checkQuestion({ type: 'true_false', level: 2, stem: 'Xét tính đúng sai của các khẳng định', statements: [{ text: 'a', value: true }, { text: 'b', value: null }, { text: 'c', value: false }, { text: 'd', value: true }], solution: 'Giải thích chung đủ dài.' });
  assert.ok(tf.errors.some((e) => e.includes('nhận định b')));
  const geo = checkQuestion({ type: 'geometry_essay', level: 3, stem: 'Cho tam giác \\(ABC\\) có đường cao \\(AH\\). Chứng minh điều cần chứng minh.', figure: 'A(0,3) B(-2,0) C(2,0)\nABCA', solution: 'Lời giải đủ dài để kiểm tra.', rubric: '1 điểm' });
  assert.ok(geo.warnings.some((w) => w.includes('H')), 'điểm H có trong đề nhưng thiếu trong hình');
  const lvl = checkQuestion({ type: 'essay', level: 4, topicLevels: [1, 2], stem: 'Chứng minh đẳng thức sau với mọi x', solution: 'Biến đổi vế trái thành vế phải.', rubric: '1 điểm' });
  assert.ok(lvl.warnings.some((w) => w.includes('Mức độ')));
});

test('Excel: ghi rồi đọc lại đúng nội dung (tiếng Việt, công thức, xuống dòng)', () => {
  const rows = [
    ['ma_cau', 'de_bai', 'A'],
    ['1', 'Tính \\(x^2\\) & <đậm>\ndòng 2', 'Đúng'],
    ['', 'Câu "hai"', '0,5'],
  ];
  const back = readXlsx(writeXlsx(rows, { sheetName: 'Ngân hàng' }));
  assert.deepEqual(back, rows);
  assert.deepEqual(parseTable('a\tb\n"x\ny"\t2\n'), [['a', 'b'], ['x\ny', '2']]);
  assert.deepEqual(truthsFromText('Đ S Đ S'), [true, false, true, false]);
});
