import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gradeResponse, levelFromXp, normalizeResponse, parseNumber, toTenScale, type AnswerKey } from '../../src/shared/grading';

const mcq: AnswerKey[] = ['A', 'B', 'C', 'D'].map((l) => ({ label: l, content: l, isCorrect: l === 'C' }));
const tf: AnswerKey[] = [
  { label: 'a', content: '', isCorrect: true },
  { label: 'b', content: '', isCorrect: false },
  { label: 'c', content: '', isCorrect: true },
  { label: 'd', content: '', isCorrect: false },
];

test('trắc nghiệm: đúng / sai / bỏ trống', () => {
  assert.deepEqual(gradeResponse('mcq', mcq, {}, { kind: 'mcq', choice: 'C' }), { status: 'correct', score: 1 });
  assert.deepEqual(gradeResponse('mcq', mcq, {}, { kind: 'mcq', choice: 'A' }), { status: 'incorrect', score: 0 });
  assert.deepEqual(gradeResponse('mcq', mcq, {}, null), { status: 'incorrect', score: 0 });
});

test('Đúng/Sai: thang 0 – 0,1 – 0,25 – 0,5 – 1 theo số ý đúng', () => {
  const g = (values: Record<string, boolean>) => gradeResponse('true_false', tf, {}, { kind: 'true_false', values });
  assert.equal(g({ a: true, b: false, c: true, d: false }).score, 1);
  assert.equal(g({ a: true, b: false, c: true, d: false }).status, 'correct');
  assert.equal(g({ a: true, b: false, c: true, d: true }).score, 0.5);
  assert.equal(g({ a: true, b: false, c: false, d: true }).score, 0.25);
  assert.equal(g({ a: true, b: true, c: false, d: true }).score, 0.1);
  assert.equal(g({ a: false, b: true, c: false, d: true }).score, 0);
  assert.equal(g({ a: false, b: true, c: false, d: true }).status, 'incorrect');
  assert.equal(g({ a: true }).status, 'partial');
});

test('đọc số kiểu Việt Nam và quốc tế', () => {
  assert.equal(parseNumber('-1,5'), -1.5);
  assert.equal(parseNumber('1.5'), 1.5);
  assert.equal(parseNumber('3/4'), 0.75);
  assert.equal(parseNumber('−2'), -2);
  assert.equal(parseNumber(' 1 000 '), 1000);
  assert.equal(parseNumber('1.234,5'), 1234.5);
  assert.equal(parseNumber('9996'), 9996);
  assert.equal(parseNumber('abc'), null);
  assert.equal(parseNumber('1/0'), null);
  assert.equal(parseNumber(''), null);
});

test('trả lời ngắn: so sánh theo giá trị, có sai số', () => {
  const ans: AnswerKey[] = [{ label: '1', content: '0,5', isCorrect: true }];
  const g = (text: string, tolerance = 0) => gradeResponse('short_answer', ans, { tolerance }, { kind: 'short_answer', text });
  assert.equal(g('1/2').status, 'correct');
  assert.equal(g('0.5').status, 'correct');
  assert.equal(g('.5').status, 'correct');
  assert.equal(g('0,49').status, 'incorrect');
  assert.equal(g('0,49', 0.02).status, 'correct');
  const text: AnswerKey[] = [{ label: '1', content: 'x = 2', isCorrect: true }];
  assert.equal(gradeResponse('short_answer', text, {}, { kind: 'short_answer', text: 'X=2' }).status, 'correct');
});

test('tự luận: chờ giáo viên chấm; bỏ trống = 0 điểm', () => {
  assert.deepEqual(gradeResponse('essay', [], {}, { kind: 'essay', text: 'Lời giải' }), { status: 'pending', score: null });
  assert.deepEqual(gradeResponse('geometry_essay', [], {}, { kind: 'essay', text: '  ' }), { status: 'incorrect', score: 0 });
});

test('không tin dữ liệu từ trình duyệt', () => {
  assert.equal(normalizeResponse('mcq', { choice: 'E' }), null);
  assert.equal(normalizeResponse('mcq', { choice: 'A; drop' }), null);
  assert.deepEqual(normalizeResponse('true_false', { values: { a: true, z: true, b: 'yes' } }), { kind: 'true_false', values: { a: true } });
  assert.equal(normalizeResponse('short_answer', { text: 'x'.repeat(101) }), null);
  assert.equal(normalizeResponse('essay', 'chuỗi'), null);
});

test('quy đổi thang 10 và cấp độ', () => {
  assert.equal(toTenScale(7, 8), 8.75);
  assert.equal(toTenScale(1, 3), 3.25);
  assert.equal(toTenScale(0, 0), 0);
  assert.deepEqual(levelFromXp(0), { level: 1, current: 0, next: 100 });
  assert.deepEqual(levelFromXp(100), { level: 2, current: 0, next: 150 });
  assert.deepEqual(levelFromXp(260), { level: 3, current: 10, next: 200 });
});
