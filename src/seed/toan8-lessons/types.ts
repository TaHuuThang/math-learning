/**
 * Định dạng nội dung bài học giai đoạn 3 (Prompt 3): Giới thiệu – Khám phá kiến thức mới – Công thức cần nhớ –
 * Ví dụ minh họa theo mức độ cho từng dạng toán (đề, phân tích, kiến thức, giả thiết/kết luận, hình vẽ, các bước,
 * kết luận, nhận xét) – Những lưu ý khi giải.
 * Văn bản dùng cú pháp nội dung của trang web: \( … \) / \[ … \], "- " là danh sách, **đậm**, [hinh]…[/hinh], [sodo]…[/sodo].
 */
import type { Level } from '../toan8-map/types';

export type TheoryKind = 'concept' | 'definition' | 'property' | 'theorem' | 'rule' | 'formula' | 'special' | 'condition' | 'note';

/** Một mục "Khám phá kiến thức mới": giải thích dễ hiểu, công thức (nếu có), ví dụ ngắn (nếu có). */
export interface TheoryItem {
  kind: TheoryKind;
  title: string;
  body: string;
  formula?: string;
  example?: string;
}

/** Một thẻ trong "CÔNG THỨC CẦN NHỚ". tex: công thức TeX (không có \[ \]). */
export interface FormulaCard {
  name: string;
  tex: string;
  symbols: string;
  condition?: string;
  example: string;
}

export interface FormulaGroup {
  group: string;
  items: FormulaCard[];
}

/** Ví dụ minh họa: mỗi phần tử của steps là một bước của lời giải (hiện lần lượt). */
export interface WorkedExample {
  level: Level;
  problem: string;
  analysis: string;
  knowledge: string;
  steps: string[];
  answer: string;
  tip?: string;
  /** Hình học: giả thiết, kết luận, hình vẽ (cú pháp [hinh], không kèm thẻ). */
  given?: string;
  toProve?: string;
  figure?: string;
}

export interface LessonContent {
  slug: string;
  /** Ứng dụng thực tế của kiến thức. */
  applications: string;
  theory: TheoryItem[];
  formulas: FormulaGroup[];
  /** Ví dụ theo slug dạng toán (trong bản đồ kiến thức của bài). */
  examples: Record<string, WorkedExample[]>;
  /** Những lưu ý khi giải theo slug dạng toán. */
  notes?: Record<string, string>;
}

// ---------- Hàm viết tắt ----------
export const r = String.raw;

export const th = (kind: TheoryKind, title: string, body: string, formula?: string, example?: string): TheoryItem => ({
  kind,
  title,
  body,
  ...(formula ? { formula } : {}),
  ...(example ? { example } : {}),
});

export const fc = (name: string, tex: string, symbols: string, example: string, condition?: string): FormulaCard => ({
  name,
  tex,
  symbols,
  example,
  ...(condition ? { condition } : {}),
});

/** Ví dụ đại số / thống kê / xác suất. */
export const ex = (level: Level, problem: string, analysis: string, knowledge: string, steps: string[], answer: string, tip?: string): WorkedExample => ({
  level,
  problem,
  analysis,
  knowledge,
  steps,
  answer,
  ...(tip ? { tip } : {}),
});

/** Ví dụ hình học: có hình vẽ, giả thiết, kết luận. */
export const gx = (
  level: Level,
  problem: string,
  figure: string,
  given: string,
  toProve: string,
  analysis: string,
  knowledge: string,
  steps: string[],
  answer: string,
  tip?: string,
): WorkedExample => ({
  level,
  problem,
  figure,
  given,
  toProve,
  analysis,
  knowledge,
  steps,
  answer,
  ...(tip ? { tip } : {}),
});
