/**
 * Tạo đề tự động từ ngân hàng câu hỏi – hàm thuần, dùng cho đề luyện tập của học sinh và đề kiểm tra của giáo viên.
 *
 * Nguyên tắc: chỉ lấy câu trong phạm vi đã lọc; không lặp câu (kể cả câu trùng đề bài); phân bố mức độ theo tỉ lệ,
 * mức nào thiếu thì bù bằng mức gần nhất; trải đều các dạng toán; cân đối các mạch kiến thức (đại số, hình học,
 * thống kê – xác suất) theo tỉ lệ số bài của mỗi mạch trong phạm vi; ưu tiên câu có độ ưu tiên cao (câu chưa làm đúng).
 */
import type { QuestionType } from './grading';
import { shuffle } from './shuffle';

export type Area = 'algebra' | 'geometry' | 'stats';

export const AREA_LABELS: Record<Area, string> = { algebra: 'Số và Đại số', geometry: 'Hình học và Đo lường', stats: 'Thống kê và Xác suất' };

/** Mạch kiến thức của các chương Toán 8 KNTT. */
export const CHAPTER_AREAS: Record<string, Area> = {
  I: 'algebra',
  II: 'algebra',
  III: 'geometry',
  IV: 'geometry',
  V: 'stats',
  VI: 'algebra',
  VII: 'algebra',
  VIII: 'stats',
  IX: 'geometry',
  X: 'geometry',
};

export interface PoolItem {
  id: number;
  type: QuestionType;
  level: number;
  topicId: number | null;
  lessonId: number | null;
  area: Area | null;
  /** Khóa đề bài đã chuẩn hóa – câu trùng đề bài coi là một. */
  stemKey: string;
  /** Lớn hơn = ưu tiên hơn (ví dụ câu chưa làm đúng). */
  priority?: number;
  /** Thứ tự bài trong sách – dùng khi xếp đề. */
  lessonOrder?: number;
}

export type ExamOrder = 'level' | 'type' | 'random';

export interface GenConfig {
  /** Tổng số câu (khi không chia theo loại). */
  count: number;
  /** Số câu theo từng loại; nếu có thì bỏ qua count. */
  typeCounts?: Partial<Record<QuestionType, number>>;
  /** Mức độ được phép (1–4). */
  levels: number[];
  /** Tỉ lệ mức độ, ví dụ {1: 4, 2: 3, 3: 2, 4: 1}. Mặc định chia đều theo các mức được phép. */
  levelWeights?: Partial<Record<number, number>>;
  /** Cân đối các mạch kiến thức. */
  balanceAreas?: boolean;
  order?: ExamOrder;
}

export const DEFAULT_LEVEL_WEIGHTS: Record<number, number> = { 1: 4, 2: 3, 3: 2, 4: 1 };
export const TYPE_ORDER: QuestionType[] = ['mcq', 'true_false', 'short_answer', 'essay', 'geometry_essay'];

export interface GenResult {
  ids: number[];
  /** Số câu còn thiếu so với yêu cầu (ngân hàng không đủ câu). */
  shortfall: number;
  byLevel: Record<number, number>;
  byType: Partial<Record<QuestionType, number>>;
}

/** Chia n theo trọng số, làm tròn bằng phương pháp phần dư lớn nhất. */
export function apportion(n: number, weights: Record<string, number>): Record<string, number> {
  const keys = Object.keys(weights).filter((k) => weights[k] > 0);
  const total = keys.reduce((s, k) => s + weights[k], 0);
  const out: Record<string, number> = {};
  if (!total || n <= 0) {
    for (const k of Object.keys(weights)) out[k] = 0;
    return out;
  }
  let used = 0;
  const rem: [string, number][] = [];
  for (const k of keys) {
    const exact = (n * weights[k]) / total;
    out[k] = Math.floor(exact);
    used += out[k];
    rem.push([k, exact - out[k]]);
  }
  rem.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  for (let i = 0; used < n; i++, used++) out[rem[i % rem.length][0]]++;
  for (const k of Object.keys(weights)) out[k] ??= 0;
  return out;
}

/**
 * Phân bổ có giới hạn: mỗi nhóm không vượt số câu có sẵn; phần thiếu chuyển sang nhóm gần nhất
 * (theo thứ tự trong `neighbours`) rồi đến các nhóm còn chỗ.
 */
function cappedApportion(n: number, weights: Record<string, number>, caps: Record<string, number>, neighbours: (k: string) => string[]): Record<string, number> {
  const target = apportion(n, weights);
  const out: Record<string, number> = {};
  for (const k of Object.keys(target)) out[k] = Math.min(target[k], caps[k] ?? 0);
  // dồn phần thiếu sang nhóm gần
  for (const k of Object.keys(target)) {
    let need = target[k] - Math.min(target[k], caps[k] ?? 0);
    for (const nb of neighbours(k)) {
      if (need <= 0) break;
      const room = (caps[nb] ?? 0) - (out[nb] ?? 0);
      const take = Math.min(room, need);
      if (take > 0) {
        out[nb] = (out[nb] ?? 0) + take;
        need -= take;
      }
    }
  }
  return out;
}

/** Chọn k câu trong nhóm, trải đều các dạng toán, ưu tiên câu ưu tiên cao. */
function pickSpread(items: PoolItem[], k: number, rand: () => number): PoolItem[] {
  if (k <= 0) return [];
  const byTopic = new Map<string, PoolItem[]>();
  for (const it of shuffle(items, rand)) {
    const key = String(it.topicId ?? `l${it.lessonId ?? 0}`);
    if (!byTopic.has(key)) byTopic.set(key, []);
    byTopic.get(key)!.push(it);
  }
  for (const list of byTopic.values()) list.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  // dạng có câu ưu tiên cao được lấy trước
  const groups = shuffle([...byTopic.values()], rand).sort((a, b) => (b[0].priority ?? 0) - (a[0].priority ?? 0));
  const out: PoolItem[] = [];
  for (let round = 0; out.length < k; round++) {
    let added = false;
    for (const g of groups) {
      if (out.length >= k) break;
      if (g[round]) {
        out.push(g[round]);
        added = true;
      }
    }
    if (!added) break;
  }
  return out;
}

function levelNeighbours(levels: number[]) {
  return (k: string) =>
    levels
      .map(String)
      .filter((x) => x !== k)
      .sort((a, b) => Math.abs(Number(a) - Number(k)) - Math.abs(Number(b) - Number(k)) || Number(a) - Number(b));
}

function generateForType(pool: PoolItem[], count: number, cfg: GenConfig, rand: () => number): PoolItem[] {
  const levels = cfg.levels.length ? cfg.levels : [1, 2, 3, 4];
  const weights: Record<string, number> = {};
  for (const l of levels) weights[String(l)] = cfg.levelWeights?.[l] ?? (cfg.levelWeights ? 0 : DEFAULT_LEVEL_WEIGHTS[l] ?? 1);
  const caps: Record<string, number> = {};
  for (const l of levels) caps[String(l)] = pool.filter((p) => p.level === l).length;
  const perLevel = cappedApportion(count, weights, caps, levelNeighbours(levels));
  const chosen: PoolItem[] = [];
  for (const l of levels) {
    const k = perLevel[String(l)] ?? 0;
    const items = pool.filter((p) => p.level === l);
    if (!cfg.balanceAreas) {
      chosen.push(...pickSpread(items, k, rand));
      continue;
    }
    const areas = [...new Set(items.map((i) => i.area ?? 'algebra'))];
    const aw: Record<string, number> = {};
    const ac: Record<string, number> = {};
    for (const a of areas) {
      // trọng số mạch = số bài khác nhau của mạch trong toàn bộ phạm vi
      aw[a] = new Set(pool.filter((p) => (p.area ?? 'algebra') === a).map((p) => p.lessonId)).size || 1;
      ac[a] = items.filter((i) => (i.area ?? 'algebra') === a).length;
    }
    const perArea = cappedApportion(k, aw, ac, (key) => areas.filter((x) => x !== key));
    for (const a of areas) chosen.push(...pickSpread(items.filter((i) => (i.area ?? 'algebra') === a), perArea[a] ?? 0, rand));
  }
  return chosen;
}

export function generateExam(poolRaw: PoolItem[], cfg: GenConfig, rand: () => number = Math.random): GenResult {
  // bỏ câu trùng đề bài (giữ câu ưu tiên cao hơn)
  const seen = new Map<string, PoolItem>();
  for (const p of poolRaw) {
    if (cfg.levels.length && !cfg.levels.includes(p.level)) continue;
    const prev = seen.get(p.stemKey);
    if (!prev || (p.priority ?? 0) > (prev.priority ?? 0)) seen.set(p.stemKey, p);
  }
  const pool = [...seen.values()];
  let chosen: PoolItem[] = [];
  let requested = 0;
  if (cfg.typeCounts && Object.values(cfg.typeCounts).some((n) => (n ?? 0) > 0)) {
    for (const t of TYPE_ORDER) {
      const n = Math.max(0, Math.floor(cfg.typeCounts[t] ?? 0));
      if (!n) continue;
      requested += n;
      chosen.push(...generateForType(pool.filter((p) => p.type === t), n, cfg, rand));
    }
  } else {
    requested = Math.max(0, Math.floor(cfg.count));
    chosen = generateForType(pool, requested, cfg, rand);
  }
  // không bao giờ trùng câu
  const ids = new Set<number>();
  chosen = chosen.filter((c) => (ids.has(c.id) ? false : (ids.add(c.id), true)));

  const order = cfg.order ?? 'level';
  if (order === 'random') chosen = shuffle(chosen, rand);
  else if (order === 'level') chosen.sort((a, b) => a.level - b.level || (a.lessonOrder ?? 0) - (b.lessonOrder ?? 0));
  else chosen.sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) || a.level - b.level || (a.lessonOrder ?? 0) - (b.lessonOrder ?? 0));

  const byLevel: Record<number, number> = {};
  const byType: Partial<Record<QuestionType, number>> = {};
  for (const c of chosen) {
    byLevel[c.level] = (byLevel[c.level] ?? 0) + 1;
    byType[c.type] = (byType[c.type] ?? 0) + 1;
  }
  return { ids: chosen.map((c) => c.id), shortfall: Math.max(0, requested - chosen.length), byLevel, byType };
}

/** Khóa so trùng đề bài: bỏ khoảng trắng, chữ thường, bỏ kí hiệu công thức. */
export function stemKey(stem: string): string {
  return stem
    .toLowerCase()
    .replace(/\\[()[\]]/g, '')
    .replace(/\s+/g, '')
    .slice(0, 400);
}
