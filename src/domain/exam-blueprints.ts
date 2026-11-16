/**
 * Đề kiểm tra tạo tự động của giáo viên: lưu cấu hình (phạm vi, số câu từng loại, mức độ, thời gian…)
 * và sinh nhiều mã đề (101, 102, …). Mỗi mã đề là một đề kiểm tra bình thường (giao lớp, chấm, thống kê như cũ).
 */
import { sql, type Database, type Queryable } from '../server/db';
import { QUESTION_TYPES, type QuestionType } from '../shared/grading';
import { DEFAULT_LEVEL_WEIGHTS, generateExam, TYPE_ORDER, type ExamOrder, type PoolItem } from '../shared/exam-gen';
import { randomOptionOrder, shuffle } from '../shared/shuffle';
import { loadPool } from './practice-sessions';

export interface BlueprintConfig {
  title: string;
  chapterIds: number[];
  lessonIds: number[];
  topicIds: number[];
  typeCounts: Partial<Record<QuestionType, number>>;
  typePoints: Partial<Record<QuestionType, number>>;
  levels: number[];
  levelWeights: Record<number, number>;
  balanceAreas: boolean;
  duration: number | null;
  variants: number;
  /** Các mã đề dùng chung bộ câu hỏi (chỉ đảo thứ tự) hay mỗi mã đề chọn câu riêng. */
  sameQuestions: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  order: ExamOrder;
  showAnswers: boolean;
}

export const DEFAULT_TYPE_POINTS: Record<QuestionType, number> = { mcq: 0.25, true_false: 1, short_answer: 0.5, essay: 1, geometry_essay: 1 };

export function defaultBlueprint(): BlueprintConfig {
  return {
    title: '',
    chapterIds: [],
    lessonIds: [],
    topicIds: [],
    typeCounts: { mcq: 12, true_false: 4, short_answer: 6 },
    typePoints: { ...DEFAULT_TYPE_POINTS },
    levels: [1, 2, 3, 4],
    levelWeights: { ...DEFAULT_LEVEL_WEIGHTS },
    balanceAreas: true,
    duration: 45,
    variants: 2,
    sameQuestions: true,
    shuffleQuestions: true,
    shuffleOptions: true,
    order: 'type',
    showAnswers: true,
  };
}

export function validateBlueprint(c: BlueprintConfig): string[] {
  const errors: string[] = [];
  if (!c.title.trim()) errors.push('Nhập tên đề.');
  if (!c.chapterIds.length && !c.lessonIds.length && !c.topicIds.length) errors.push('Chọn phạm vi kiến thức (ít nhất một chương, bài hoặc dạng toán).');
  const total = QUESTION_TYPES.reduce((s, t) => s + (c.typeCounts[t] ?? 0), 0);
  if (!total) errors.push('Nhập số câu cho ít nhất một hình thức.');
  if (total > 80) errors.push('Một đề tối đa 80 câu.');
  if (!c.levels.length) errors.push('Chọn ít nhất một mức độ.');
  if (!(c.variants >= 1 && c.variants <= 12)) errors.push('Số mã đề từ 1 đến 12.');
  if (c.duration !== null && !(c.duration >= 5 && c.duration <= 240)) errors.push('Thời gian làm bài từ 5 đến 240 phút.');
  for (const t of QUESTION_TYPES) if ((c.typePoints[t] ?? 1) <= 0 || (c.typePoints[t] ?? 1) > 10) errors.push(`Điểm mỗi câu ${t} phải trong khoảng 0–10.`);
  return errors;
}

export interface BlueprintRow {
  id: number;
  textbookId: number;
  title: string;
  config: BlueprintConfig;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getBlueprint(q: Queryable, id: number): Promise<BlueprintRow | null> {
  return q.one<BlueprintRow>(sql`select id, textbook_id, title, config, created_by, created_at, updated_at from exam_blueprints where id = ${id}`);
}

export async function listBlueprints(q: Queryable, userId: string, isAdmin: boolean) {
  return q.many<BlueprintRow & { variants: number }>(sql`
    select b.id, b.textbook_id, b.title, b.config, b.created_by, b.created_at, b.updated_at,
      (select count(*)::int from tests t where t.blueprint_id = b.id) as variants
    from exam_blueprints b where ${isAdmin} or b.created_by = ${userId} order by b.updated_at desc limit 50`);
}

export async function blueprintVariants(q: Queryable, id: number) {
  return q.many<{ id: number; title: string; variantCode: string; status: string; questionCount: number; totalPoints: number; submissions: number }>(sql`
    select t.id, t.title, t.variant_code, t.status,
      (select count(*)::int from test_questions tq where tq.test_id = t.id) as question_count,
      (select coalesce(sum(points), 0)::float from test_questions tq where tq.test_id = t.id) as total_points,
      (select count(*)::int from test_results r where r.test_id = t.id) as submissions
    from tests t where t.blueprint_id = ${id} order by t.variant_code`);
}

/** Đảo thứ tự câu: giữ nguyên các phần theo hình thức nếu đề xếp theo phần. */
function arrange(ids: number[], types: Map<number, QuestionType>, cfg: BlueprintConfig, rand: () => number): number[] {
  if (!cfg.shuffleQuestions) return ids;
  if (cfg.order === 'type') return TYPE_ORDER.flatMap((t) => shuffle(ids.filter((id) => types.get(id) === t), rand));
  if (cfg.order === 'level') return ids; // đề xếp từ dễ đến khó: giữ thứ tự mức độ
  return shuffle(ids, rand);
}

/**
 * Sinh `count` mã đề mới từ cấu hình (mã đề tiếp nối các mã đề đã có).
 * Trả về số câu còn thiếu nếu ngân hàng không đủ câu theo yêu cầu.
 */
export async function generateVariants(db: Database, bp: BlueprintRow, count: number, rand: () => number = Math.random): Promise<{ created: number[]; shortfall: number; error?: string }> {
  const cfg = bp.config;
  const pool: PoolItem[] = (
    await loadPool(
      db,
      bp.textbookId,
      {
        scope: { chapterIds: cfg.chapterIds, lessonIds: cfg.lessonIds, topicIds: cfg.topicIds },
        types: QUESTION_TYPES.filter((t) => (cfg.typeCounts[t] ?? 0) > 0),
        levels: cfg.levels,
      },
      bp.createdBy,
    )
  ).map((p) => ({ ...p, priority: 0 }));
  if (!pool.length) return { created: [], shortfall: 0, error: 'Ngân hàng chưa có câu hỏi đã xuất bản trong phạm vi và mức độ đã chọn.' };
  const types = new Map(pool.map((p) => [p.id, p.type]));
  const genCfg = { count: 0, typeCounts: cfg.typeCounts, levels: cfg.levels, levelWeights: cfg.levelWeights, balanceAreas: cfg.balanceAreas, order: cfg.order };
  const existing = await db.many<{ code: string }>(sql`select variant_code as code from tests where blueprint_id = ${bp.id}`);
  let nextCode = Math.max(100, ...existing.map((e) => Number(e.code) || 100)) + 1;
  const shared = cfg.sameQuestions ? generateExam(pool, genCfg, rand) : null;
  let shortfall = shared?.shortfall ?? 0;
  const used = new Set<number>();
  const created: number[] = [];
  for (let v = 0; v < count; v++) {
    let ids: number[];
    if (shared) ids = shared.ids;
    else {
      // ưu tiên câu chưa dùng ở mã đề trước để các mã đề khác nhau nhiều nhất
      const g = generateExam(pool.map((p) => ({ ...p, priority: used.has(p.id) ? 0 : 1 })), genCfg, rand);
      ids = g.ids;
      shortfall = Math.max(shortfall, g.shortfall);
    }
    ids.forEach((id) => used.add(id));
    const ordered = arrange(ids, types, cfg, rand);
    const code = String(nextCode++);
    const testId = await db.tx(async (t) => {
      const row = await t.one<{ id: number }>(sql`
        insert into tests (textbook_id, title, description, duration_minutes, show_answers, max_attempts, created_by, blueprint_id, variant_code)
        values (${bp.textbookId}, ${`${cfg.title.trim()} – Mã đề ${code}`.slice(0, 200)}, ${`Tạo tự động từ cấu hình "${cfg.title.trim()}".`}, ${cfg.duration},
          ${cfg.showAnswers}, 1, ${bp.createdBy}, ${bp.id}, ${code})
        returning id`);
      for (const [i, qid] of ordered.entries()) {
        const type = types.get(qid)!;
        const order = cfg.shuffleOptions && type === 'mcq' ? randomOptionOrder(rand) : null;
        await t.exec(sql`
          insert into test_questions (test_id, question_id, sort_order, points, option_order)
          values (${row!.id}, ${qid}, ${i + 1}, ${cfg.typePoints[type] ?? 1}, ${order})`);
      }
      return row!.id;
    });
    created.push(testId);
  }
  await db.exec(sql`update exam_blueprints set updated_at = now() where id = ${bp.id}`);
  return { created, shortfall };
}

export async function createBlueprint(db: Database, textbookId: number, userId: string, cfg: BlueprintConfig): Promise<number> {
  const row = await db.one<{ id: number }>(sql`
    insert into exam_blueprints (textbook_id, title, config, created_by) values (${textbookId}, ${cfg.title.trim()}, ${cfg}, ${userId}) returning id`);
  return row!.id;
}

export async function updateBlueprint(db: Database, id: number, cfg: BlueprintConfig) {
  await db.exec(sql`update exam_blueprints set title = ${cfg.title.trim()}, config = ${cfg}, updated_at = now() where id = ${id}`);
}

/** Xóa các mã đề chưa có bài làm (để tạo lại). */
export async function deleteUnusedVariants(db: Database, id: number): Promise<number> {
  const rows = await db.many<{ id: number }>(sql`
    delete from tests t where t.blueprint_id = ${id} and not exists (select 1 from test_results r where r.test_id = t.id) returning id`);
  return rows.length;
}
