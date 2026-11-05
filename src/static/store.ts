/**
 * Lưu tiến độ của bản HTML ngoại tuyến trong trình duyệt (localStorage).
 * Khi trình duyệt chặn bộ nhớ (chế độ ẩn danh nghiêm ngặt…), tiến độ chỉ giữ đến khi đóng trang.
 */
import { levelFromXp } from '../shared/grading';
import type { OfflineData } from './types';

const KEY = 'math-learning-html-v1';

export interface StoredResponse {
  q: number;
  s: 'correct' | 'partial' | 'incorrect' | 'pending';
  c: 'practice' | 'challenge';
  t: string;
  lesson?: string;
}

export interface Store {
  v: 1;
  completed: Record<string, string>;
  viewed: Record<string, string>;
  last?: string;
  responses: StoredResponse[];
  xp: Record<string, number>;
  badges: Record<string, string>;
  /** Giai đoạn 3: bài yêu thích (slug → thời điểm), công thức yêu thích (id → thời điểm), ghi chú theo bài, ví dụ đã xem. */
  favLessons: Record<string, string>;
  favFormulas: Record<string, string>;
  notes: Record<string, { body: string; t: string }>;
  examples: Record<string, string>;
}

let memory: Store | null = null;
let persistent = true;

function empty(): Store {
  return { v: 1, completed: {}, viewed: {}, responses: [], xp: {}, badges: {}, favLessons: {}, favFormulas: {}, notes: {}, examples: {} };
}

export function load(): Store {
  if (memory) return memory;
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Store) : null;
    memory = parsed && parsed.v === 1 ? { ...empty(), ...parsed } : empty();
  } catch {
    persistent = false;
    memory = empty();
  }
  return memory;
}

export function save(s: Store) {
  memory = s;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    persistent = false;
  }
}

export function isPersistent() {
  load();
  return persistent;
}

export function resetAll() {
  memory = empty();
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* bỏ qua */
  }
}

const data = (): OfflineData =>
  window.ML_DATA ?? { bookTitle: '', exportedAt: '', lessons: [], chapters: [], achievements: [] };

function award(s: Store, ref: string, amount: number): number {
  if (amount <= 0 || s.xp[ref] !== undefined) return 0;
  s.xp[ref] = amount;
  return amount;
}

export function totalXp(s: Store) {
  return Object.values(s.xp).reduce((a, b) => a + b, 0);
}

function localDay(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function streak(s: Store): number {
  const days = [...new Set(s.responses.map((r) => localDay(r.t)))].sort().reverse();
  if (!days.length) return 0;
  const today = localDay(new Date().toISOString());
  const yesterday = localDay(new Date(Date.now() - 86_400_000).toISOString());
  if (days[0] !== today && days[0] !== yesterday) return 0;
  let n = 1;
  for (let i = 1; i < days.length; i++) {
    const diff = (new Date(days[i - 1] + 'T00:00:00').getTime() - new Date(days[i] + 'T00:00:00').getTime()) / 86_400_000;
    if (Math.round(diff) === 1) n++;
    else break;
  }
  return n;
}

function correctDistinct(s: Store, ctx?: 'challenge') {
  return new Set(s.responses.filter((r) => r.s === 'correct' && (!ctx || r.c === ctx)).map((r) => r.q)).size;
}

const RULES: Record<string, (s: Store) => boolean> = {
  first_lesson: (s) => Object.keys(s.completed).length >= 1,
  lessons_5: (s) => Object.keys(s.completed).length >= 5,
  chapter_done: (s) => data().chapters.some((c) => c.kind === 'chapter' && c.lessons.length > 0 && c.lessons.every((l) => s.completed[l])),
  correct_10: (s) => correctDistinct(s) >= 10,
  correct_50: (s) => correctDistinct(s) >= 50,
  streak_3: (s) => streak(s) >= 3,
  challenge_3: (s) => correctDistinct(s, 'challenge') >= 3,
  xp_500: (s) => totalXp(s) >= 500,
};

export interface EarnedBadge {
  code: string;
  name: string;
  description: string;
}

/** Xét huy hiệu mới (2 lượt: phần thưởng huy hiệu có thể giúp đạt mốc 500 XP). */
function evaluate(s: Store): { badges: EarnedBadge[]; xp: number } {
  const earned: EarnedBadge[] = [];
  let xp = 0;
  for (let pass = 0; pass < 2; pass++) {
    for (const a of data().achievements) {
      if (s.badges[a.code] || !RULES[a.code]?.(s)) continue;
      s.badges[a.code] = new Date().toISOString();
      xp += award(s, `badge:${a.code}`, a.xp);
      earned.push({ code: a.code, name: a.name, description: a.description });
    }
  }
  return { badges: earned, xp };
}

export function markViewed(slug: string) {
  const s = load();
  s.viewed[slug] ??= new Date().toISOString();
  s.last = slug;
  save(s);
}

export function completeLesson(slug: string) {
  const s = load();
  s.completed[slug] ??= new Date().toISOString();
  s.last = slug;
  const xp = award(s, `lesson:${slug}`, 20);
  const ev = evaluate(s);
  save(s);
  return { xp: xp + ev.xp, badges: ev.badges };
}

export function reopenLesson(slug: string) {
  const s = load();
  delete s.completed[slug];
  save(s);
}

export function recordResponse(r: Omit<StoredResponse, 't'>) {
  const s = load();
  s.responses.push({ ...r, t: new Date().toISOString() });
  if (s.responses.length > 2000) s.responses = s.responses.slice(-2000);
  let xp = 0;
  if (r.s === 'correct') xp = award(s, `${r.c}:${r.q}`, r.c === 'challenge' ? 20 : 10);
  const ev = evaluate(s);
  save(s);
  return { xp: xp + ev.xp, badges: ev.badges };
}

export function hasCorrect(qid: number) {
  return load().responses.some((r) => r.q === qid && r.s === 'correct');
}

export function stats() {
  const s = load();
  const graded = s.responses.filter((r) => r.s !== 'pending');
  const correct = graded.filter((r) => r.s === 'correct').length;
  const xp = totalXp(s);
  const lv = levelFromXp(xp);
  return {
    completed: Object.keys(s.completed).length,
    inProgress: Object.keys(s.viewed).filter((k) => !s.completed[k]).length,
    total: data().lessons.length,
    answered: s.responses.length,
    graded: graded.length,
    correct,
    accuracy: graded.length ? Math.round((correct / graded.length) * 100) : 0,
    xp,
    level: lv.level,
    levelCurrent: lv.current,
    levelNext: lv.next,
    streak: streak(s),
    badges: Object.keys(s.badges).length,
  };
}

/** Sao lưu / khôi phục để chuyển tiến độ sang máy khác. */
export function exportJson() {
  return JSON.stringify(load(), null, 1);
}

export function importJson(text: string) {
  const parsed = JSON.parse(text) as Store;
  if (!parsed || parsed.v !== 1 || typeof parsed.completed !== 'object' || !Array.isArray(parsed.responses)) throw new Error('Tệp không phải bản sao lưu tiến độ của trang.');
  save({ ...empty(), ...parsed });
}

// ---------------- Giai đoạn 3: yêu thích, ghi chú, ví dụ đã xem ----------------

const now = () => new Date().toISOString();

export function toggleFavLesson(slug: string): boolean {
  const s = load();
  if (s.favLessons[slug]) delete s.favLessons[slug];
  else s.favLessons[slug] = now();
  save(s);
  return !!s.favLessons[slug];
}

export function toggleFavFormula(id: number): boolean {
  const s = load();
  const k = String(id);
  if (s.favFormulas[k]) delete s.favFormulas[k];
  else s.favFormulas[k] = now();
  save(s);
  return !!s.favFormulas[k];
}

export function saveNote(slug: string, body: string) {
  const s = load();
  const text = body.trim().slice(0, 5000);
  if (text) s.notes[slug] = { body: text, t: now() };
  else delete s.notes[slug];
  save(s);
}

export function markExample(id: number) {
  const s = load();
  s.examples[String(id)] = now();
  save(s);
}
