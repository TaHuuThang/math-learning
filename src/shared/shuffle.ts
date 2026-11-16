/**
 * Đảo thứ tự câu hỏi và phương án một cách an toàn.
 *
 * Thứ tự phương án được lưu dạng chuỗi "CADB": vị trí hiển thị thứ i (A, B, C, D) là phương án gốc order[i].
 * Học sinh chọn theo nhãn hiển thị; máy chủ đổi về nhãn gốc trước khi chấm, nên đáp án và lời giải
 * (gắn với phương án gốc, không nhắc tên phương án) luôn đúng.
 */

export const MCQ_LABELS = ['A', 'B', 'C', 'D'] as const;
export const IDENTITY_ORDER = 'ABCD';

/** Băm chuỗi FNV-1a 32 bit. */
export function hashText(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Bộ sinh số ngẫu nhiên có hạt giống (mulberry32) – cùng hạt giống cho cùng dãy số. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Một hoán vị ngẫu nhiên của các phương án hiện có (mặc định ABCD). */
export function randomOptionOrder(rand: () => number = Math.random, labels: string = IDENTITY_ORDER): string {
  return shuffle(labels.split(''), rand).join('');
}

export function isValidOrder(order: unknown, labels: string = IDENTITY_ORDER): order is string {
  return typeof order === 'string' && order.length === labels.length && [...order].sort().join('') === [...labels].sort().join('');
}

/** Nhãn hiển thị → nhãn gốc. */
export function toOriginalLabel(order: string | null | undefined, display: string): string {
  if (!order) return display;
  const i = MCQ_LABELS.indexOf(display as (typeof MCQ_LABELS)[number]);
  return i >= 0 && i < order.length ? order[i] : display;
}

/** Nhãn gốc → nhãn hiển thị. */
export function toDisplayLabel(order: string | null | undefined, original: string): string {
  if (!order) return original;
  const i = order.indexOf(original);
  return i >= 0 ? MCQ_LABELS[i] : original;
}

/** Sắp lại danh sách phương án gốc theo thứ tự hiển thị, gán nhãn hiển thị mới. */
export function reorderOptions<T extends { label: string }>(options: T[], order: string | null | undefined): (T & { originalLabel: string })[] {
  if (!order || !isValidOrder(order, options.map((o) => o.label).join(''))) return options.map((o) => ({ ...o, originalLabel: o.label }));
  return [...order].map((orig, i) => {
    const o = options.find((x) => x.label === orig)!;
    return { ...o, label: MCQ_LABELS[i], originalLabel: orig };
  });
}
