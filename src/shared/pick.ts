/**
 * Chọn câu theo số câu mỗi mức độ (đề kiểm tra cuối chương); mức nào thiếu câu thì bù bằng câu ở mức gần nhất.
 * Đầu vào nên được xáo trộn sẵn. Kết quả xếp từ dễ đến khó. Dùng chung cho máy chủ và bản HTML.
 */
export function chooseByLevel<T extends { level: number }>(rows: T[], plan: Record<number, number>): T[] {
  const total = Object.values(plan).reduce((a, b) => a + b, 0);
  const picked: T[] = [];
  const left = [...rows];
  for (const level of [1, 2, 3, 4]) {
    for (let k = 0; k < (plan[level] ?? 0); k++) {
      const i = left.findIndex((r) => r.level === level);
      if (i < 0) break;
      picked.push(left.splice(i, 1)[0]);
    }
  }
  const want: number[] = [];
  for (const level of [1, 2, 3, 4]) {
    const missing = (plan[level] ?? 0) - picked.filter((p) => p.level === level).length;
    for (let k = 0; k < missing; k++) want.push(level);
  }
  for (const level of want) {
    if (picked.length >= total || !left.length) break;
    left.sort((a, b) => Math.abs(a.level - level) - Math.abs(b.level - level));
    picked.push(left.shift()!);
  }
  return picked.sort((a, b) => a.level - b.level);
}

/** Cấu trúc đề kiểm tra cuối chương: số câu mỗi mức độ (NB, TH, VD, VDC). */
export const CHAPTER_TEST_PLAN: Record<number, number> = { 1: 4, 2: 3, 3: 2, 4: 1 };
