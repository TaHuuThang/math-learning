/** Tìm kiếm kiến thức không phân biệt dấu (dùng chung cho bản máy chủ và bản HTML). */
export function foldVi(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase();
}

export type SearchKind = 'lesson' | 'theory' | 'formula' | 'topic' | 'example';

export interface SearchEntry {
  kind: SearchKind;
  title: string;
  /** Bài / chương chứa mục này. */
  context: string;
  snippet: string;
  href: string;
  /** Văn bản đã bỏ dấu để so khớp. */
  text: string;
}

export const SEARCH_KIND_LABELS: Record<SearchKind, string> = {
  lesson: 'Bài học',
  theory: 'Kiến thức',
  formula: 'Công thức',
  topic: 'Dạng toán',
  example: 'Ví dụ',
};

const norm = (s: string) => ` ${foldVi(s).replace(/[^a-z0-9]+/g, ' ').trim()} `;

/**
 * Mọi từ khóa phải xuất hiện ở đầu một từ (tiêu đề hoặc nội dung). Xếp hạng: khớp cả cụm > khớp từng cặp từ liền nhau
 * > khớp ở tiêu đề > loại mục (bài học, dạng toán, công thức trước). Giúp "don thuc dong dang" ra "đơn thức đồng dạng"
 * trước "tam giác đồng dạng".
 */
export function searchEntries<T extends SearchEntry>(entries: T[], query: string, limit = 60): T[] {
  const words = foldVi(query).split(/[^a-z0-9]+/).filter((w) => w.length > 0);
  if (!words.length) return [];
  const phrase = ` ${words.join(' ')}`;
  const pairs = words.slice(1).map((w, i) => ` ${words[i]} ${w}`);
  const scored: { e: T; score: number }[] = [];
  for (const e of entries) {
    const title = norm(e.title);
    const text = norm(e.text);
    if (!words.every((w) => title.includes(` ${w}`) || text.includes(` ${w}`))) continue;
    let score = 0;
    for (const w of words) {
      if (title.includes(` ${w}`)) score += 5;
      if (title.includes(` ${w} `)) score += 2;
    }
    if (words.length > 1) {
      if (title.includes(phrase)) score += 25;
      else if (text.includes(phrase)) score += 12;
      for (const p of pairs) score += title.includes(p) ? 6 : text.includes(p) ? 3 : 0;
    }
    if (title.trim() === words.join(' ')) score += 20;
    score += { lesson: 4, topic: 3, formula: 3, theory: 2, example: 0 }[e.kind];
    scored.push({ e, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.e);
}
