/**
 * Bộ chấm điểm – hàm thuần, không phụ thuộc CSDL, dùng chung cho luyện tập và kiểm tra.
 */
import { matchShortAnswer, type MatchMode } from './answer-match';

export type QuestionType = 'mcq' | 'true_false' | 'short_answer' | 'essay' | 'geometry_essay';
export const QUESTION_TYPES: QuestionType[] = ['mcq', 'true_false', 'short_answer', 'essay', 'geometry_essay'];

export interface AnswerKey {
  label: string;
  content: string;
  isCorrect: boolean;
}

export interface QuestionSettings {
  /** Trả lời ngắn: sai số tuyệt đối chấp nhận (mặc định 0). */
  tolerance?: number;
  /** Trả lời ngắn: đơn vị hiển thị cạnh ô nhập (học sinh ghi đơn vị khác cùng loại thì được tự đổi). */
  unit?: string;
  /** Trả lời ngắn: quy tắc so khớp do giáo viên chọn (mặc định tự nhận biết). */
  match?: MatchMode;
}

export type ResponsePayload =
  | { kind: 'mcq'; choice: string }
  | { kind: 'true_false'; values: Record<string, boolean> }
  | { kind: 'short_answer'; text: string }
  | { kind: 'essay'; text: string; images?: number[] };

export type GradeStatus = 'correct' | 'partial' | 'incorrect' | 'pending';

export interface GradeResult {
  status: GradeStatus;
  /** Tỉ lệ điểm 0..1; null khi chờ giáo viên chấm. */
  score: number | null;
  correctCount?: number;
  /** Ghi chú khi chấm trả lời ngắn (đổi đơn vị, chưa ở dạng tích…). */
  note?: string;
}

/** Thang điểm câu Đúng/Sai theo số ý đúng (0–4 ý) – theo cấu trúc đề từ năm 2025. */
export const TRUE_FALSE_LADDER = [0, 0.1, 0.25, 0.5, 1] as const;

export function isAutoGraded(type: QuestionType) {
  return type === 'mcq' || type === 'true_false' || type === 'short_answer';
}

/** Đọc số viết kiểu Việt Nam hoặc quốc tế: "-1,5"; "1.5"; "3/4"; "−2"; "1 000". */
export function parseNumber(input: string): number | null {
  let s = input.trim().replace(/[−–]/g, '-').replace(/\s+/g, '');
  if (!s) return null;
  const frac = /^([+-]?)(\d+(?:[.,]\d+)?)\/(\d+(?:[.,]\d+)?)$/.exec(s);
  if (frac) {
    const num = Number(frac[2].replace(',', '.'));
    const den = Number(frac[3].replace(',', '.'));
    if (!den) return null;
    return (frac[1] === '-' ? -1 : 1) * (num / den);
  }
  // "1.234,5" hoặc "1,234.5" → bỏ dấu phân cách hàng nghìn
  if (/^[+-]?\d{1,3}(\.\d{3})+,\d+$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^[+-]?\d{1,3}(,\d{3})+\.\d+$/.test(s)) s = s.replace(/,/g, '');
  else s = s.replace(',', '.');
  if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function normalizeText(s: string) {
  return s.trim().toLowerCase().replace(/[−–]/g, '-').replace(/\s+/g, '');
}

/** Kiểm tra và chuẩn hóa bài làm nhận từ trình duyệt (không tin dữ liệu phía máy khách). */
export function normalizeResponse(type: QuestionType, raw: unknown): ResponsePayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  switch (type) {
    case 'mcq':
      return typeof r.choice === 'string' && /^[A-D]$/.test(r.choice) ? { kind: 'mcq', choice: r.choice } : null;
    case 'true_false': {
      if (!r.values || typeof r.values !== 'object') return null;
      const values: Record<string, boolean> = {};
      for (const [k, v] of Object.entries(r.values as Record<string, unknown>)) {
        if (/^[a-d]$/.test(k) && typeof v === 'boolean') values[k] = v;
      }
      return { kind: 'true_false', values };
    }
    case 'short_answer':
      return typeof r.text === 'string' && r.text.length <= 100 ? { kind: 'short_answer', text: r.text.trim() } : null;
    case 'essay':
    case 'geometry_essay': {
      if (typeof r.text !== 'string' || r.text.length > 10_000) return null;
      const images = Array.isArray(r.images) ? r.images.filter((x): x is number => Number.isInteger(x) && (x as number) > 0).slice(0, 4) : [];
      return images.length ? { kind: 'essay', text: r.text.trim(), images } : { kind: 'essay', text: r.text.trim() };
    }
  }
}

export function isEmptyResponse(resp: ResponsePayload | null): boolean {
  if (!resp) return true;
  switch (resp.kind) {
    case 'mcq':
      return !resp.choice;
    case 'true_false':
      return Object.keys(resp.values).length === 0;
    case 'essay':
      return !resp.text.trim() && !resp.images?.length;
    default:
      return !resp.text.trim();
  }
}

export function gradeResponse(
  type: QuestionType,
  answers: AnswerKey[],
  settings: QuestionSettings,
  response: ResponsePayload | null,
): GradeResult {
  if (isEmptyResponse(response)) return { status: 'incorrect', score: 0 };
  switch (type) {
    case 'mcq': {
      if (response!.kind !== 'mcq') return { status: 'incorrect', score: 0 };
      const correct = answers.find((a) => a.isCorrect);
      const ok = !!correct && correct.label === response!.choice;
      return { status: ok ? 'correct' : 'incorrect', score: ok ? 1 : 0 };
    }
    case 'true_false': {
      if (response!.kind !== 'true_false') return { status: 'incorrect', score: 0 };
      const values = response!.values;
      let correctCount = 0;
      for (const a of answers) if (values[a.label] === a.isCorrect) correctCount++;
      const score = TRUE_FALSE_LADDER[Math.min(correctCount, 4)];
      const total = answers.length;
      return {
        status: correctCount === total ? 'correct' : correctCount === 0 ? 'incorrect' : 'partial',
        score: total === 4 ? score : correctCount / Math.max(total, 1),
        correctCount,
      };
    }
    case 'short_answer': {
      if (response!.kind !== 'short_answer') return { status: 'incorrect', score: 0 };
      const given = response!.text;
      const accepted = answers.map((a) => a.content);
      let m = matchShortAnswer(given, accepted, { mode: settings.match, tolerance: settings.tolerance, unit: settings.unit });
      // tương thích cách chấm cũ: so khớp chữ sau chuẩn hóa
      if (!m.ok && answers.some((a) => normalizeText(a.content) === normalizeText(given))) m = { ok: true };
      return { status: m.ok ? 'correct' : 'incorrect', score: m.ok ? 1 : 0, ...(m.note ? { note: m.note } : {}) };
    }
    case 'essay':
    case 'geometry_essay':
      return { status: 'pending', score: null };
  }
}

/** Đổi tổng điểm sang thang 10, làm tròn 0,25 như cách chấm thông thường. */
export function toTenScale(score: number, max: number): number {
  if (max <= 0) return 0;
  return Math.round((score / max) * 10 * 4) / 4;
}

/** Cấp độ học sinh theo điểm kinh nghiệm: mỗi cấp cần nhiều hơn cấp trước 50 XP. */
export function levelFromXp(xp: number): { level: number; current: number; next: number } {
  let level = 1;
  let need = 100;
  let floor = 0;
  while (xp >= floor + need) {
    floor += need;
    level++;
    need += 50;
  }
  return { level, current: xp - floor, next: need };
}
