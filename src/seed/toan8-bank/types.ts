/**
 * Định dạng soạn ngân hàng câu hỏi giai đoạn 4 (tự biên soạn theo SGK Toán 8 KNTT, không chép nguyên văn).
 * Văn bản dùng cú pháp nội dung của trang: công thức \( … \), "- " đầu dòng là danh sách.
 *
 * Quy ước khi soạn:
 * - Trắc nghiệm: phương án ĐÚNG viết ĐẦU TIÊN; khi nạp, hệ thống tự đặt phương án đúng vào vị trí A/B/C/D theo mã băm của đề
 *   (đáp án phân bố đều) và giải thích đi theo phương án. Lời giải không nhắc tên phương án.
 * - Đúng/Sai: mỗi nhận định kèm giá trị và giải thích.
 * - Trả lời ngắn: đáp án viết dạng số hoặc biểu thức (nhiều cách viết thì liệt kê); đơn vị ghi riêng.
 * - Tự luận: có lời giải và thang điểm (mỗi dòng một ý).
 */
import type { QuestionType } from '../../shared/grading';
import type { MatchMode } from '../../shared/answer-match';

export type Level = 1 | 2 | 3 | 4;

export interface BankQ {
  type: QuestionType;
  level: Level;
  /** slug dạng toán trong bài. */
  dang: string;
  stem: string;
  options?: [string, string, string, string];
  notes?: (string | undefined)[];
  statements?: [string, boolean, string][];
  accepted?: string[];
  unit?: string;
  tol?: number;
  match?: MatchMode;
  solution: string;
  hint?: string;
  rubric?: string;
  figure?: string;
  points?: number;
}

export interface BankLesson {
  slug: string;
  questions: BankQ[];
}

export const r = String.raw;

/** Trắc nghiệm: options[0] là phương án đúng; notes (nếu có) giải thích theo cùng thứ tự. */
export const mc = (level: Level, dang: string, stem: string, options: [string, string, string, string], solution: string, notes?: (string | undefined)[]): BankQ => ({
  type: 'mcq',
  level,
  dang,
  stem,
  options,
  solution,
  ...(notes ? { notes } : {}),
});

/** Đúng/Sai 4 nhận định: [nội dung, đúng?, giải thích]. */
export const tf = (level: Level, dang: string, stem: string, statements: [string, boolean, string][], solution?: string): BankQ => ({
  type: 'true_false',
  level,
  dang,
  stem,
  statements,
  solution: solution ?? statements.map(([, v, n], i) => `- ${'abcd'[i]}) ${v ? 'Đúng' : 'Sai'}. ${n}`).join('\n'),
});

/** Trả lời ngắn. */
export const sa = (level: Level, dang: string, stem: string, accepted: string | string[], solution: string, opt: { unit?: string; tol?: number; match?: MatchMode } = {}): BankQ => ({
  type: 'short_answer',
  level,
  dang,
  stem,
  accepted: Array.isArray(accepted) ? accepted : [accepted],
  solution,
  ...opt,
});

/** Tự luận (có thang điểm). */
export const es = (level: Level, dang: string, stem: string, solution: string, rubric: string, points = 1): BankQ => ({ type: 'essay', level, dang, stem, solution, rubric, points });

/** Tự luận hình học có hình vẽ. */
export const ge = (level: Level, dang: string, stem: string, figure: string, solution: string, rubric: string, points = 1): BankQ => ({
  type: 'geometry_essay',
  level,
  dang,
  stem,
  figure,
  solution,
  rubric,
  points,
});
