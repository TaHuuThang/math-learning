/**
 * Định dạng dữ liệu bản đồ kiến thức (giai đoạn 2).
 * Sách → Học kì → Chương → Bài → Chủ đề → Dạng toán → Bài tập.
 * Văn bản dùng cú pháp nội dung của trang web: công thức \( … \) / \[ … \], "- " đầu dòng là danh sách, **đậm**.
 */
import type { SeedQuestion } from '../toan8-questions';

export type Level = 1 | 2 | 3 | 4;
export type VerifyStatus = 'verified' | 'needs_review' | 'unverified';

export interface Verify {
  status: VerifyStatus;
  note: string;
}

/** Bài tập luyện tập của một dạng – được nạp vào ngân hàng câu hỏi và gắn với dạng đó. */
export type MapExercise = Omit<SeedQuestion, 'lesson' | 'topic'>;

export interface MapType {
  slug: string;
  title: string;
  /** Tên cũ (giai đoạn 1) để nối đúng dạng toán đã có trong CSDL. */
  legacy?: string[];
  /** Các mức độ phù hợp với bản chất dạng toán (1 Nhận biết, 2 Thông hiểu, 3 Vận dụng, 4 Vận dụng cao). */
  levels: Level[];
  knowledge: string;
  signs: string;
  method: string;
  steps: string;
  mistakes: string;
  example: string;
  solution: string;
  exercises: MapExercise[];
}

export interface MapTheme {
  title: string;
  description?: string;
  types: MapType[];
}

export interface MapLesson {
  slug: string;
  difficulty: Level;
  objectives: string;
  prerequisites: string;
  concepts: string;
  formulas?: string;
  properties?: string;
  theorems?: string;
  themes: MapTheme[];
}

/** Luyện tập chung, bài tập cuối chương, hoạt động trải nghiệm: không có dạng toán riêng. */
export interface MapAux {
  slug: string;
  objectives: string;
  /** Sửa tên mục theo SGK (chỉ áp dụng khi giáo viên chưa đổi tên). */
  title?: { from: string; to: string };
  verify?: Verify;
}

export interface MapChapter {
  code: string;
  objectives: string;
  keyPoints: string;
  formulas: string;
  verify: Verify;
  lessons: MapLesson[];
  aux: MapAux[];
}

// ---------- Hàm viết tắt cho bài tập ----------
type Common = { solution: string; hint?: string };

/** Băm chuỗi (FNV-1a) – dùng để xếp vị trí đáp án đúng ổn định, không ngẫu nhiên theo lần chạy. */
function hashText(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Trắc nghiệm 4 phương án. Người soạn có thể ghi đáp án đúng ở bất kì vị trí nào;
 * hàm này đổi chỗ phương án đúng sang vị trí A/B/C/D theo mã băm của đề để đáp án
 * phân bố đều (giao diện không tự trộn phương án). Lời giải không được nhắc tên phương án.
 */
export const mcq = (level: Level, stem: string, options: [string, string, string, string], correct: 'A' | 'B' | 'C' | 'D', solution: string, extra: Partial<Common> = {}): MapExercise => {
  const from = 'ABCD'.indexOf(correct);
  const to = hashText(stem) % 4;
  const opts = [...options] as [string, string, string, string];
  [opts[from], opts[to]] = [opts[to], opts[from]];
  return {
    type: 'mcq',
    level,
    stem,
    options: opts,
    correct: 'ABCD'[to] as 'A' | 'B' | 'C' | 'D',
    solution,
    ...extra,
  };
};

export const tf = (level: Level, stem: string, statements: [string, boolean][], solution: string): MapExercise => ({
  type: 'true_false',
  level,
  stem,
  statements,
  solution,
});

export const sa = (level: Level, stem: string, accepted: string[], solution: string, unit?: string): MapExercise => ({
  type: 'short_answer',
  level,
  stem,
  accepted,
  solution,
  ...(unit ? { unit } : {}),
});

export const es = (level: Level, stem: string, solution: string, hint?: string): MapExercise => ({
  type: 'essay',
  level,
  stem,
  solution,
  ...(hint ? { hint } : {}),
});

export const ge = (level: Level, stem: string, figure: string, solution: string, hint?: string): MapExercise => ({
  type: 'geometry_essay',
  level,
  stem,
  figure,
  solution,
  ...(hint ? { hint } : {}),
});

export const r = String.raw;
