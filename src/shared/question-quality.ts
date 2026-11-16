/**
 * Bộ kiểm tra chất lượng câu hỏi trước khi đưa vào ngân hàng chính thức.
 *
 * - Lỗi (errors): câu không thể dùng (thiếu đề, thiếu phương án, không đúng một đáp án đúng, công thức/hình vẽ lỗi…) → không lưu được.
 * - Cảnh báo (warnings): câu dùng được nhưng cần giáo viên xem lại (thiếu lời giải, lời giải nhắc tên phương án, hai phương án
 *   cùng giá trị, mức độ không hợp với dạng toán, điểm trong đề không có trong hình…) → câu được đánh dấu "chờ duyệt".
 */
import { sameMathValue, validateAccepted, type AnswerRule } from './answer-match';
import type { QuestionType } from './grading';
import { parseFigure } from './figure';
import { findMathErrors } from './richtext';

export interface QualityInput {
  type: QuestionType;
  stem: string;
  level: number;
  /** Mức độ phù hợp của dạng toán (nếu câu gắn với dạng toán). */
  topicLevels?: number[];
  options?: string[];
  /** Nhãn phương án đúng (A–D). */
  correct?: string;
  optionNotes?: string[];
  statements?: { text: string; value: boolean | null; note?: string }[];
  accepted?: string[];
  rule?: AnswerRule;
  solution: string;
  hint?: string;
  rubric?: string;
  figure?: string;
}

export interface QualityReport {
  errors: string[];
  warnings: string[];
}

const LETTER_REF = /(?:[pP]hương án|[đĐ]áp án|[cC]họn|[cC]âu)\s*\(?\s*[A-D](?![\p{L}\d'(=])/u;

function plainLen(s: string) {
  return s.replace(/\\\(|\\\)|\\\[|\\\]/g, '').replace(/\s+/g, ' ').trim().length;
}

export function checkQuestion(q: QualityInput): QualityReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const stem = q.stem.trim();
  if (!stem) errors.push('Chưa có nội dung câu hỏi.');
  else if (plainLen(stem) < 12) warnings.push('Đề bài quá ngắn – kiểm tra xem đã đủ dữ kiện chưa.');

  const texts: [string, string][] = [
    ['Đề bài', q.stem],
    ['Lời giải', q.solution],
    ['Gợi ý', q.hint ?? ''],
    ['Thang điểm', q.rubric ?? ''],
  ];

  if (q.type === 'mcq') {
    const opts = q.options ?? [];
    if (opts.length !== 4 || opts.some((o) => !o.trim())) errors.push('Câu trắc nghiệm cần đủ 4 phương án A, B, C, D.');
    if (!q.correct || !/^[A-D]$/.test(q.correct)) errors.push('Chọn đúng một phương án đúng.');
    const norm = opts.map((o) => o.replace(/\s+/g, ''));
    if (new Set(norm.filter(Boolean)).size < norm.filter(Boolean).length) errors.push('Có hai phương án viết giống nhau.');
    for (let i = 0; i < opts.length; i++)
      for (let j = i + 1; j < opts.length; j++)
        if (opts[i] && opts[j] && norm[i] !== norm[j] && sameMathValue(opts[i], opts[j])) {
          const right = q.correct && ('ABCD'[i] === q.correct || 'ABCD'[j] === q.correct);
          warnings.push(
            right
              ? `Phương án ${'ABCD'[i]} và ${'ABCD'[j]} có cùng giá trị – câu có hai đáp án đúng.`
              : `Hai phương án nhiễu ${'ABCD'[i]} và ${'ABCD'[j]} có cùng giá trị – học sinh dễ loại trừ, nên thay một phương án.`,
          );
        }
    opts.forEach((o, i) => texts.push([`Phương án ${'ABCD'[i]}`, o]));
    (q.optionNotes ?? []).forEach((n, i) => texts.push([`Giải thích phương án ${'ABCD'[i]}`, n ?? '']));
    const correctIdx = q.correct ? 'ABCD'.indexOf(q.correct) : -1;
    const wrongNotes = (q.optionNotes ?? []).filter((n, i) => i !== correctIdx && n?.trim()).length;
    if (q.level >= 2 && wrongNotes === 0) warnings.push('Chưa giải thích vì sao các phương án nhiễu sai (nên có khi phương án nhiễu phản ánh lỗi thường gặp).');
  }

  if (q.type === 'true_false') {
    const st = q.statements ?? [];
    if (st.length !== 4) errors.push('Câu Đúng/Sai cần đủ 4 nhận định a, b, c, d.');
    st.forEach((s, i) => {
      const l = 'abcd'[i];
      if (!s.text.trim()) errors.push(`Nhận định ${l}) đang để trống.`);
      if (s.value === null) errors.push(`Chưa chọn Đúng hoặc Sai cho nhận định ${l}).`);
      if (!s.note?.trim()) warnings.push(`Nhận định ${l}) chưa có giải thích.`);
      texts.push([`Nhận định ${l})`, s.text], [`Giải thích ${l})`, s.note ?? '']);
    });
    if (st.length === 4 && st.every((s) => s.value === true)) warnings.push('Cả 4 nhận định đều Đúng – nên có cả nhận định Sai để phân hóa.');
    if (st.length === 4 && st.every((s) => s.value === false)) warnings.push('Cả 4 nhận định đều Sai – nên có cả nhận định Đúng để phân hóa.');
  }

  if (q.type === 'short_answer') {
    const acc = (q.accepted ?? []).map((a) => a.trim()).filter(Boolean);
    if (!acc.length) errors.push('Nhập ít nhất một đáp án được chấp nhận.');
    else validateAccepted(acc, q.rule ?? {}).forEach((e) => errors.push('Đáp án: ' + e));
  }

  if (q.type === 'essay' || q.type === 'geometry_essay') {
    if (!q.rubric?.trim()) warnings.push('Câu tự luận nên có thang điểm (hướng dẫn chấm) để giáo viên chấm thống nhất.');
  }

  if (q.type === 'geometry_essay' && !q.figure?.trim()) errors.push('Câu tự luận hình học cần hình vẽ.');
  if (q.figure?.trim()) {
    const fig = parseFigure(q.figure);
    fig.errors.forEach((e) => errors.push('Hình vẽ – ' + e));
    if (!fig.errors.length) {
      const names = new Set(fig.points.map((p) => p.name));
      // tên điểm viết trong công thức của đề: \(ABC\), \(\triangle ABC\), \(AH \perp BC\)
      const mentioned = new Set<string>();
      for (const m of q.stem.matchAll(/\\\((.*?)\\\)/g)) {
        const tex = m[1].replace(/\\[a-zA-Z]+/g, ' ').replace(/[_^]\{?[^}\s]*\}?/g, ' ');
        for (const w of tex.matchAll(/(?<![A-Za-z])([A-Z](?:[A-Z]|'|\d)*)(?![a-z])/g)) {
          for (const p of w[1].match(/[A-Z]'*\d*/g) ?? []) mentioned.add(p);
        }
      }
      const missing = [...mentioned].filter((p) => !names.has(p) && p.length <= 3 && !/^[SPV]$/.test(p));
      if (missing.length) warnings.push(`Đề nhắc điểm ${missing.join(', ')} nhưng hình vẽ không có – kiểm tra hình có đúng giả thiết không.`);
    }
  }

  const sol = q.solution.trim();
  if (!sol) warnings.push('Chưa có lời giải / giải thích.');
  else if (plainLen(sol) < 15) warnings.push('Lời giải quá ngắn – học sinh cần được giải thích.');
  if (q.type === 'mcq' && LETTER_REF.test(sol)) warnings.push('Lời giải nhắc tên phương án (A, B, C, D) – khi đảo phương án sẽ sai. Hãy nêu nội dung đáp án thay vì tên.');

  if (q.topicLevels?.length && !q.topicLevels.includes(q.level)) warnings.push(`Mức độ ${q.level} không nằm trong các mức phù hợp của dạng toán (${q.topicLevels.join(', ')}).`);

  for (const [name, text] of texts) if (text) findMathErrors(text).forEach((e) => errors.push(`${name}: ${e}`));
  return { errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}
