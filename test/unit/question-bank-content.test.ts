/**
 * Kiểm tra ngân hàng câu hỏi giai đoạn 4 (src/seed/toan8-bank): mỗi câu gắn đúng bài, dạng toán, mức độ phù hợp với dạng;
 * qua bộ kiểm tra chất lượng KHÔNG lỗi và KHÔNG cảnh báo (nên được xuất bản ngay); đề bài không trùng nhau;
 * in bảng tiến độ so với mục tiêu ban đầu của mỗi bài.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TOAN8_MAP } from '../../src/seed/toan8-map';
import type { MapLesson } from '../../src/seed/toan8-map/types';
import { TOAN8_QUESTIONS } from '../../src/seed/toan8-questions';
import { TOAN8_BANK } from '../../src/seed/toan8-bank';
import { bankToInput } from '../../src/seed/question-bank';
import { qualityOf } from '../../src/domain/questions';
import { matchShortAnswer } from '../../src/shared/answer-match';
import { stemKey } from '../../src/shared/exam-gen';
import type { QuestionType } from '../../src/shared/grading';

const mapLessons = new Map<string, MapLesson>();
for (const c of TOAN8_MAP) for (const l of c.lessons) mapLessons.set(l.slug, l);

/** Bài có nội dung hình học phù hợp câu tự luận hình học có hình vẽ. */
export const GEOMETRY_LESSONS = new Set([
  'bai-10-tu-giac',
  'bai-11-hinh-thang-can',
  'bai-12-hinh-binh-hanh',
  'bai-13-hinh-chu-nhat',
  'bai-14-hinh-thoi-va-hinh-vuong',
  'bai-15-dinh-li-thales-trong-tam-giac',
  'bai-16-duong-trung-binh-cua-tam-giac',
  'bai-17-tinh-chat-duong-phan-giac-cua-tam-giac',
  'bai-33-hai-tam-giac-dong-dang',
  'bai-34-ba-truong-hop-dong-dang-cua-hai-tam-giac',
  'bai-35-dinh-li-pythagore-va-ung-dung',
  'bai-36-cac-truong-hop-dong-dang-cua-hai-tam-giac-vuong',
  'bai-37-hinh-dong-dang',
  'bai-38-hinh-chop-tam-giac-deu',
  'bai-39-hinh-chop-tu-giac-deu',
]);

const TARGET: Record<QuestionType, number> = { mcq: 15, true_false: 10, short_answer: 10, essay: 5, geometry_essay: 3 };

test('ngân hàng GĐ4: bài, dạng toán, mức độ hợp lệ; qua kiểm tra chất lượng không lỗi, không cảnh báo', () => {
  const seenLesson = new Set<string>();
  for (const bl of TOAN8_BANK) {
    assert.ok(!seenLesson.has(bl.slug), `trùng bài ${bl.slug}`);
    seenLesson.add(bl.slug);
    const ml = mapLessons.get(bl.slug);
    assert.ok(ml, `bài ${bl.slug} không có trong bản đồ kiến thức`);
    const types = new Map(ml!.themes.flatMap((th) => th.types).map((t) => [t.slug, t]));
    for (const [i, q] of bl.questions.entries()) {
      const where = `${bl.slug} câu ${i + 1} (${q.type}) "${q.stem.slice(0, 50)}"`;
      const t = types.get(q.dang);
      assert.ok(t, `${where}: không có dạng "${q.dang}"`);
      assert.ok(t!.levels.includes(q.level), `${where}: mức ${q.level} không thuộc mức của dạng (${t!.levels.join(',')})`);
      if (q.type === 'geometry_essay') assert.ok(GEOMETRY_LESSONS.has(bl.slug), `${where}: bài không có nội dung hình học`);
      const report = qualityOf(bankToInput(q, 1, 1), t!.levels);
      assert.deepEqual(report.errors, [], `${where}: lỗi`);
      assert.deepEqual(report.warnings, [], `${where}: cảnh báo`);
      if (q.type === 'mcq') assert.equal(q.options!.length, 4);
      if (q.type === 'true_false') {
        assert.equal(q.statements!.length, 4, `${where}: cần 4 nhận định`);
        q.statements!.forEach(([, , note], k) => assert.ok(note.trim().length >= 6, `${where}: nhận định ${'abcd'[k]} thiếu giải thích`));
      }
      if (q.type === 'short_answer') for (const a of q.accepted!) assert.ok(matchShortAnswer(a, q.accepted!, { mode: q.match, unit: q.unit, tolerance: q.tol }).ok, `${where}: đáp án "${a}" không tự khớp`);
      if (q.type === 'essay' || q.type === 'geometry_essay') assert.ok((q.rubric ?? '').split('\n').filter(Boolean).length >= 2, `${where}: thang điểm cần ít nhất 2 ý`);
      assert.ok(!/\$\{/.test(q.stem + q.solution), `${where}: còn sót \${…}`);
    }
  }
});

test('ngân hàng GĐ4: không trùng đề bài (kể cả với câu mẫu giai đoạn 1–2)', () => {
  const seen = new Map<string, string>();
  const add = (stem: string, where: string, parts: unknown) => {
    const k = stemKey(stem + JSON.stringify(parts ?? ''));
    assert.ok(!seen.has(k), `trùng đề: "${stem.slice(0, 60)}" (${where} và ${seen.get(k)})`);
    seen.set(k, where);
  };
  for (const q of TOAN8_QUESTIONS) add(q.stem, `mẫu ${q.lesson}`, q.options ?? q.statements?.map((x) => x[0]));
  for (const c of TOAN8_MAP)
    for (const l of c.lessons) for (const th of l.themes) for (const t of th.types) for (const ex of t.exercises) add(ex.stem, `bản đồ ${l.slug}`, ex.options ?? ex.statements?.map((x) => x[0]));
  for (const bl of TOAN8_BANK) for (const q of bl.questions) add(q.stem, `GĐ4 ${bl.slug}`, q.options ? [...q.options].sort() : q.statements?.map((x) => x[0]));
});

test('ngân hàng GĐ4: tiến độ so với mục tiêu ban đầu (15 TN, 10 Đ/S, 10 TLN, 5 TL, 3 HH mỗi bài)', () => {
  const counts = new Map<string, Record<QuestionType, number>>();
  const zero = (): Record<QuestionType, number> => ({ mcq: 0, true_false: 0, short_answer: 0, essay: 0, geometry_essay: 0 });
  for (const slug of mapLessons.keys()) counts.set(slug, zero());
  for (const q of TOAN8_QUESTIONS) counts.get(q.lesson) && counts.get(q.lesson)![q.type]++;
  for (const c of TOAN8_MAP) for (const l of c.lessons) for (const th of l.themes) for (const t of th.types) for (const ex of t.exercises) counts.get(l.slug)![ex.type]++;
  for (const bl of TOAN8_BANK) for (const q of bl.questions) counts.get(bl.slug)![q.type]++;
  let total = 0;
  let met = 0;
  const lines: string[] = [];
  for (const [slug, c] of counts) {
    const geo = GEOMETRY_LESSONS.has(slug);
    const ok = (Object.keys(TARGET) as QuestionType[]).every((t) => (t === 'geometry_essay' && !geo) || c[t] >= TARGET[t]);
    if (ok) met++;
    total += Object.values(c).reduce((a, b) => a + b, 0);
    lines.push(`${ok ? '✓' : '·'} ${slug.slice(0, 34).padEnd(34)} TN ${c.mcq} · ĐS ${c.true_false} · TLN ${c.short_answer} · TL ${c.essay}${geo ? ` · HH ${c.geometry_essay}` : ''}`);
  }
  console.log(`  Ngân hàng câu hỏi: ${total} câu; ${met}/${counts.size} bài đạt mục tiêu ban đầu.\n  ` + lines.join('\n  '));
  assert.ok(total > 0);
});
