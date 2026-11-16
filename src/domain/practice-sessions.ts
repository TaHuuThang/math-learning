/**
 * Phiên luyện tập / đề luyện tập của học sinh.
 *
 * Hai chế độ:
 * - practice (luyện tập): học sinh bấm "Kiểm tra" từng câu, xem ngay đúng/sai, lời giải và kiến thức cần ôn;
 * - exam (làm đề): làm hết rồi nộp; có thể giới hạn thời gian; chấm khi nộp.
 * Mọi câu trả lời được lưu vào question_responses (gắn với phiên) để xem lại, thống kê câu hay sai và mức thành thạo.
 */
import { sql, type Database, type Queryable } from '../server/db';
import { gradeResponse, isAutoGraded, normalizeResponse, toTenScale, type GradeStatus, type QuestionType, type ResponsePayload } from '../shared/grading';
import { generateExam, stemKey, CHAPTER_AREAS, type ExamOrder, type PoolItem } from '../shared/exam-gen';
import { isValidOrder, randomOptionOrder, toDisplayLabel, toOriginalLabel } from '../shared/shuffle';
import { plainExcerpt, renderRich } from '../shared/richtext';
import { awardXp, evaluateAchievements, type EarnedAchievement } from './gamification';
import { getQuestions, revealAnswer, toView, type AnswerReveal, type QuestionFull, type QuestionView } from './questions';
import { topicKey } from './knowledge';
import { XP_CHALLENGE, XP_CORRECT } from './practice';

export type SessionKind = 'lesson' | 'topic' | 'chapter' | 'mixed' | 'level' | 'retry' | 'chapter_test' | 'challenge';
export type SessionMode = 'practice' | 'exam';

export const KIND_LABELS: Record<SessionKind, string> = {
  lesson: 'Theo bài',
  topic: 'Theo dạng toán',
  chapter: 'Theo chương',
  mixed: 'Tổng hợp',
  level: 'Theo mức độ',
  retry: 'Làm lại câu sai',
  chapter_test: 'Kiểm tra cuối chương',
  challenge: 'Thử thách',
};

export interface SessionScope {
  lessonIds?: number[];
  chapterIds?: number[];
  topicIds?: number[];
  questionIds?: number[];
}

export interface SessionConfig {
  scope: SessionScope;
  types: QuestionType[];
  levels: number[];
  count: number;
  typeCounts?: Partial<Record<QuestionType, number>>;
  levelWeights?: Partial<Record<number, number>>;
  balanceAreas?: boolean;
  order: ExamOrder;
  shuffleOptions: boolean;
  timeLimit: number | null;
  /** Mô tả phạm vi cho người đọc, ví dụ "Chương I, Chương III". */
  scopeLabel: string;
}

export interface SessionRow {
  id: number;
  userId: string;
  textbookId: number;
  kind: SessionKind;
  mode: SessionMode;
  title: string;
  config: SessionConfig;
  questionIds: number[];
  optionOrders: Record<string, string>;
  flagged: number[];
  draftAnswers: Record<string, unknown>;
  timeLimitMinutes: number | null;
  status: 'in_progress' | 'submitted';
  startedAt: Date;
  deadlineAt: Date | null;
  submittedAt: Date | null;
  durationSeconds: number | null;
  correctCount: number | null;
  partialCount: number | null;
  incorrectCount: number | null;
  blankCount: number | null;
  pendingCount: number | null;
  score: number | null;
  maxScore: number | null;
}

export class SessionError extends Error {}

const GRACE_MS = 60_000;
const SESSION_COLS = sql`id, user_id, textbook_id, kind, mode, title, config, question_ids, option_orders, flagged, draft_answers, time_limit_minutes,
  status, started_at, deadline_at, submitted_at, duration_seconds, correct_count, partial_count, incorrect_count, blank_count, pending_count,
  score::float as score, max_score::float as max_score`;

export async function getSession(q: Queryable, id: number): Promise<SessionRow | null> {
  return q.one<SessionRow>(sql`select ${SESSION_COLS} from practice_sessions where id = ${id}`);
}

// ---------------- Tạo phiên ----------------

/** Lấy các câu đã xuất bản trong phạm vi, kèm độ ưu tiên: 2 = từng làm sai chưa làm đúng, 1 = chưa làm, 0 = đã làm đúng. */
export async function loadPool(q: Queryable, textbookId: number, cfg: Pick<SessionConfig, 'scope' | 'types' | 'levels'>, userId: string): Promise<PoolItem[]> {
  const s = cfg.scope;
  const arr = (x?: number[]) => (x && x.length ? x : null);
  const rows = await q.many<{ id: number; type: QuestionType; level: number; topicId: number | null; lessonId: number; chapterCode: string; lessonOrder: number; stem: string; priority: number }>(sql`
    select qq.id, et.code as type, qq.level, qq.topic_id, qq.lesson_id, c.code as chapter_code, (c.sort_order * 100 + l.sort_order) as lesson_order,
      qq.stem || '|' || coalesce((select string_agg(a.content, '|' order by a.sort_order) from answers a where a.question_id = qq.id), '') as stem,
      coalesce((select case when bool_or(r.status = 'correct') then 0 else 2 end
                from question_responses r where r.user_id = ${userId} and r.question_id = qq.id and r.status <> 'pending'), 1) as priority
    from questions qq join exercise_types et on et.id = qq.exercise_type_id
    join lessons l on l.id = qq.lesson_id join chapters c on c.id = l.chapter_id
    where qq.textbook_id = ${textbookId} and qq.status = 'published' and l.status = 'published'
      and (${arr(s.lessonIds)}::int[] is null or qq.lesson_id = any(${arr(s.lessonIds)}::int[]))
      and (${arr(s.chapterIds)}::int[] is null or l.chapter_id = any(${arr(s.chapterIds)}::int[]))
      and (${arr(s.topicIds)}::int[] is null or qq.topic_id = any(${arr(s.topicIds)}::int[]))
      and (${arr(s.questionIds)}::int[] is null or qq.id = any(${arr(s.questionIds)}::int[]))
      and et.code = any(${cfg.types}::text[]) and qq.level = any(${cfg.levels}::int[])`);
  return rows.map((r) => ({
    id: r.id,
    type: r.type,
    level: r.level,
    topicId: r.topicId,
    lessonId: r.lessonId,
    area: CHAPTER_AREAS[r.chapterCode] ?? null,
    stemKey: stemKey(r.stem),
    priority: r.priority,
    lessonOrder: r.lessonOrder,
  }));
}

export async function createSession(
  db: Database,
  userId: string,
  textbookId: number,
  kind: SessionKind,
  mode: SessionMode,
  title: string,
  cfg: SessionConfig,
  rand: () => number = Math.random,
): Promise<{ id?: number; error?: string; shortfall?: number }> {
  const pool = await loadPool(db, textbookId, cfg, userId);
  if (!pool.length) return { error: 'Chưa có câu hỏi đã xuất bản phù hợp với lựa chọn này. Hãy mở rộng phạm vi, loại câu hoặc mức độ.' };
  // luyện tập: ưu tiên câu chưa làm đúng; làm đề: không ưu tiên, chọn ngẫu nhiên đều
  const items = mode === 'exam' && kind !== 'retry' ? pool.map((p) => ({ ...p, priority: 0 })) : pool;
  const gen = generateExam(
    items,
    { count: cfg.count, typeCounts: cfg.typeCounts, levels: cfg.levels, levelWeights: cfg.levelWeights, balanceAreas: cfg.balanceAreas, order: cfg.order },
    rand,
  );
  if (!gen.ids.length) return { error: 'Chưa có câu hỏi phù hợp.' };
  const types = new Map(pool.map((p) => [p.id, p.type]));
  const orders: Record<string, string> = {};
  if (cfg.shuffleOptions) for (const id of gen.ids) if (types.get(id) === 'mcq') orders[String(id)] = randomOptionOrder(rand);
  const limit = mode === 'exam' && cfg.timeLimit ? Math.min(240, Math.max(1, Math.round(cfg.timeLimit))) : null;
  const row = await db.one<{ id: number }>(sql`
    insert into practice_sessions (user_id, textbook_id, kind, mode, title, config, question_ids, option_orders, time_limit_minutes, deadline_at)
    values (${userId}, ${textbookId}, ${kind}, ${mode}, ${title.slice(0, 200)}, ${cfg}, ${gen.ids}::int[], ${orders}, ${limit},
      case when ${limit}::int is null then null else now() + make_interval(mins => ${limit}::int) end)
    returning id`);
  return { id: row!.id, shortfall: gen.shortfall };
}

// ---------------- Hiển thị ----------------

export interface ReviewInfo {
  label: string;
  href: string;
  lessonHref: string | null;
  knowledgeHtml: string | null;
  topicId: number | null;
  topicTitle: string | null;
  lessonId: number | null;
  lessonTitle: string | null;
}

/** Kiến thức cần ôn của từng câu: dạng toán (kiến thức sử dụng) và bài học chứa câu. */
export async function reviewInfo(q: Queryable, questions: Pick<QuestionFull, 'id' | 'lessonId' | 'topicId'>[], bookSlug: string): Promise<Map<number, ReviewInfo>> {
  const topicIds = [...new Set(questions.map((x) => x.topicId).filter((x): x is number => !!x))];
  const lessonIds = [...new Set(questions.map((x) => x.lessonId).filter((x): x is number => !!x))];
  const topics = new Map(
    (await q.many<{ id: number; slug: string | null; title: string; knowledge: string | null; status: string }>(sql`
      select id, slug, title, knowledge, status from topics where id = any(${topicIds}::int[])`)).map((t) => [t.id, t]),
  );
  const lessons = new Map(
    (await q.many<{ id: number; slug: string; title: string; number: number | null; status: string }>(sql`
      select id, slug, title, number, status from lessons where id = any(${lessonIds}::int[])`)).map((l) => [l.id, l]),
  );
  const out = new Map<number, ReviewInfo>();
  for (const x of questions) {
    const l = x.lessonId ? lessons.get(x.lessonId) : undefined;
    const t = x.topicId ? topics.get(x.topicId) : undefined;
    const lessonHref = l && l.status === 'published' ? `/hoc/${bookSlug}/bai/${l.slug}` : null;
    const lessonTitle = l ? `${l.number ? `Bài ${l.number}. ` : ''}${l.title}` : null;
    if (t && l && t.status === 'published' && lessonHref) {
      out.set(x.id, {
        label: `Dạng toán “${t.title}”`,
        href: `${lessonHref}/dang/${topicKey(t)}#phuong-phap`,
        lessonHref,
        knowledgeHtml: t.knowledge ? renderRich(plainExcerptKeepMath(t.knowledge, 420)) : null,
        topicId: t.id,
        topicTitle: t.title,
        lessonId: l.id,
        lessonTitle,
      });
    } else if (lessonHref && l) {
      out.set(x.id, { label: `Bài học “${lessonTitle}”`, href: `${lessonHref}#kham-pha`, lessonHref, knowledgeHtml: null, topicId: null, topicTitle: null, lessonId: l.id, lessonTitle });
    }
  }
  return out;
}

/** Cắt ngắn văn bản nhưng giữ nguyên công thức (không cắt giữa \( … \)). */
function plainExcerptKeepMath(src: string, max: number): string {
  if (src.length <= max) return src;
  const lines = src.split('\n');
  let out = '';
  for (const line of lines) {
    if ((out + line).length > max && out) break;
    out += (out ? '\n' : '') + line;
  }
  return out.length > max * 1.6 ? plainExcerpt(src, max) : out;
}

export interface SessionQuestion extends QuestionView {
  review?: { label: string; href: string };
}

export interface SessionFeedback extends AnswerReveal {
  status: GradeStatus;
  score: number | null;
  correctCount?: number;
  note?: string;
  xpGained: number;
  achievements: EarnedAchievement[];
  review?: { label: string; href: string; knowledgeHtml: string | null; lessonHref: string | null };
  rubricHtml?: string;
}

export async function sessionQuestions(q: Queryable, s: SessionRow, bookSlug: string): Promise<{ questions: SessionQuestion[]; full: QuestionFull[]; reviews: Map<number, ReviewInfo> }> {
  const full = await getQuestions(q, s.questionIds);
  const reviews = await reviewInfo(q, full, bookSlug);
  const questions = full.map((f) => {
    const r = reviews.get(f.id);
    return { ...toView(f, s.mode === 'practice', s.optionOrders[String(f.id)]), ...(r ? { review: { label: r.label, href: r.href } } : {}) };
  });
  return { questions, full, reviews };
}

/** Đổi câu trả lời đã lưu (nhãn gốc) sang nhãn hiển thị để vẽ lại giao diện. */
export function responseForDisplay(type: QuestionType, resp: unknown, order: string | undefined): Record<string, unknown> | null {
  if (!resp || typeof resp !== 'object') return null;
  const r = resp as Record<string, unknown>;
  if (type === 'mcq' && typeof r.choice === 'string') return { choice: toDisplayLabel(order, r.choice) };
  if (type === 'true_false' && r.values) return { values: r.values };
  if (typeof r.text === 'string') return { text: r.text, ...(Array.isArray(r.images) ? { images: r.images } : {}) };
  return null;
}

function feedbackOf(f: QuestionFull, order: string | undefined, grade: { status: GradeStatus; score: number | null; correctCount?: number; note?: string }, review: ReviewInfo | undefined): Omit<SessionFeedback, 'xpGained' | 'achievements'> {
  return {
    status: grade.status,
    score: grade.score,
    ...(grade.correctCount !== undefined ? { correctCount: grade.correctCount } : {}),
    ...(grade.note ? { note: grade.note } : {}),
    ...revealAnswer(f, order),
    ...(review ? { review: { label: review.label, href: review.href, knowledgeHtml: review.knowledgeHtml, lessonHref: review.lessonHref } } : {}),
    ...(f.rubric && !isAutoGraded(f.type) ? { rubricHtml: renderRich(f.rubric) } : {}),
  };
}

/** Phản hồi của các câu đã kiểm tra trong phiên (để vẽ lại khi tải lại trang). */
export async function existingFeedback(q: Queryable, s: SessionRow, full: QuestionFull[], reviews: Map<number, ReviewInfo>) {
  const rows = await q.many<{ questionId: number; response: unknown; status: GradeStatus; score: number | null }>(sql`
    select distinct on (question_id) question_id, response, status, score::float as score
    from question_responses where practice_session_id = ${s.id} order by question_id, id desc`);
  const feedback: Record<string, SessionFeedback> = {};
  const answers: Record<string, unknown> = {};
  for (const r of rows) {
    const f = full.find((x) => x.id === r.questionId);
    if (!f) continue;
    const order = s.optionOrders[String(f.id)];
    const resp = r.response as ResponsePayload;
    const correctCount =
      f.type === 'true_false' && resp && resp.kind === 'true_false' ? f.answers.filter((a) => resp.values[a.label] === a.isCorrect).length : undefined;
    feedback[String(f.id)] = { ...feedbackOf(f, order, { status: r.status, score: r.score, correctCount }, reviews.get(f.id)), xpGained: 0, achievements: [] };
    const disp = responseForDisplay(f.type, r.response, order);
    if (disp) answers[String(f.id)] = disp;
  }
  return { feedback, answers };
}

// ---------------- Trả lời, lưu nháp, nộp bài ----------------

function toOriginalResponse(f: QuestionFull, raw: unknown, order: string | undefined): unknown {
  if (f.type === 'mcq' && raw && typeof raw === 'object' && typeof (raw as { choice?: unknown }).choice === 'string') {
    return { choice: toOriginalLabel(order, (raw as { choice: string }).choice) };
  }
  return raw;
}

/** Ảnh bài làm phải do chính học sinh tải lên. */
async function ownImages(q: Queryable, userId: string, resp: ResponsePayload | null): Promise<ResponsePayload | null> {
  if (!resp || resp.kind !== 'essay' || !resp.images?.length) return resp;
  const ok = await q.many<{ id: number }>(sql`
    select id from images where id = any(${resp.images}::int[]) and created_by = ${userId} and purpose = 'response'`);
  const keep = resp.images.filter((i) => ok.some((o) => o.id === i));
  return keep.length ? { ...resp, images: keep } : { kind: 'essay', text: resp.text };
}

function assertOpen(s: SessionRow) {
  if (s.status !== 'in_progress') throw new SessionError('Bài này đã nộp.');
  if (s.deadlineAt && Date.now() > s.deadlineAt.getTime() + GRACE_MS) throw new SessionError('Đã hết giờ làm bài.');
}

/** Chế độ luyện tập: chấm ngay một câu. */
export async function checkSessionAnswer(db: Database, s: SessionRow, questionId: number, raw: unknown, bookSlug: string): Promise<SessionFeedback> {
  assertOpen(s);
  if (s.mode !== 'practice') throw new SessionError('Đề này chấm khi nộp bài.');
  if (!s.questionIds.includes(questionId)) throw new SessionError('Câu hỏi không thuộc lượt luyện tập này.');
  const [f] = await getQuestions(db, [questionId]);
  if (!f) throw new SessionError('Câu hỏi không còn tồn tại.');
  const order = s.optionOrders[String(questionId)];
  let resp = normalizeResponse(f.type, toOriginalResponse(f, raw, order));
  if (!resp) throw new SessionError('Bài làm không hợp lệ.');
  resp = await ownImages(db, s.userId, resp);
  const grade = gradeResponse(f.type, f.answers, f.settings, resp);
  const reviews = await reviewInfo(db, [f], bookSlug);
  return db.tx(async (t) => {
    const done = await t.one(sql`select 1 from question_responses where practice_session_id = ${s.id} and question_id = ${questionId}`);
    if (done) throw new SessionError('Câu này đã được kiểm tra.');
    await t.exec(sql`
      insert into question_responses (user_id, question_id, context, response, status, score, points_awarded, practice_session_id)
      values (${s.userId}, ${questionId}, ${s.kind === 'challenge' ? 'challenge' : 'practice'}, ${resp}, ${grade.status}, ${grade.score},
        ${grade.score === null ? null : grade.score * f.points}, ${s.id})`);
    let xpGained = 0;
    if (grade.status === 'correct') {
      xpGained = await awardXp(t, s.userId, s.kind === 'challenge' ? XP_CHALLENGE : XP_CORRECT, s.kind === 'challenge' ? 'challenge_correct' : 'practice_correct', `q:${questionId}`);
    }
    const achievements = await evaluateAchievements(t, s.userId);
    return { ...feedbackOf(f, order, grade, reviews.get(f.id)), xpGained, achievements };
  });
}

export async function saveSessionDraft(q: Queryable, s: SessionRow, answers: Record<string, unknown>, flagged: unknown) {
  assertOpen(s);
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(answers ?? {}).slice(0, 300)) if (/^\d+$/.test(k) && s.questionIds.includes(Number(k))) clean[k] = v;
  const flags = Array.isArray(flagged) ? [...new Set(flagged.map(Number).filter((n) => s.questionIds.includes(n)))] : s.flagged;
  if (JSON.stringify(clean).length > 200_000) throw new SessionError('Bài làm quá dài.');
  await q.exec(sql`update practice_sessions set draft_answers = ${clean}, flagged = ${flags}::int[] where id = ${s.id} and status = 'in_progress'`);
}

export interface SubmitSummary {
  total: number;
  correct: number;
  partial: number;
  incorrect: number;
  blank: number;
  pending: number;
  score: number;
  maxScore: number;
  xp: number;
  achievements: EarnedAchievement[];
}

/** Nộp bài: chấm các câu chưa chấm, tổng hợp kết quả, khóa phiên. */
export async function submitSession(db: Database, s: SessionRow, answers: Record<string, unknown> | null): Promise<SubmitSummary> {
  if (s.status !== 'in_progress') throw new SessionError('Bài này đã nộp.');
  const full = await getQuestions(db, s.questionIds);
  return db.tx(async (t) => {
    const locked = await t.one<{ status: string; draftAnswers: Record<string, unknown>; deadlineAt: Date | null }>(sql`
      select status, draft_answers, deadline_at from practice_sessions where id = ${s.id} for update`);
    if (!locked || locked.status !== 'in_progress') throw new SessionError('Bài này đã nộp.');
    const late = locked.deadlineAt && Date.now() > locked.deadlineAt.getTime() + GRACE_MS;
    const source = !late && answers ? answers : locked.draftAnswers;
    const already = await t.many<{ questionId: number; status: GradeStatus; score: number | null; response: { kind?: string } }>(sql`
      select question_id, status, score::float as score, response from question_responses where practice_session_id = ${s.id}`);
    const done = new Map(already.map((a) => [a.questionId, a]));
    let correct = 0;
    let partial = 0;
    let incorrect = 0;
    let blank = 0;
    let pending = 0;
    let score = 0;
    let maxScore = 0;
    let xp = 0;
    for (const f of full) {
      maxScore += f.points;
      let status: GradeStatus;
      let sc: number | null;
      let empty = false;
      const prev = done.get(f.id);
      if (prev) {
        status = prev.status;
        sc = prev.score;
        empty = prev.response?.kind === 'empty';
      } else {
        const order = s.optionOrders[String(f.id)];
        let resp = normalizeResponse(f.type, toOriginalResponse(f, source[String(f.id)], order));
        resp = await ownImages(t, s.userId, resp);
        const g = gradeResponse(f.type, f.answers, f.settings, resp);
        empty = !resp || (resp.kind === 'essay' ? !resp.text && !resp.images?.length : resp.kind === 'true_false' ? !Object.keys(resp.values).length : resp.kind === 'mcq' ? !resp.choice : !resp.text);
        status = empty ? 'incorrect' : g.status;
        sc = empty ? 0 : g.score;
        await t.exec(sql`
          insert into question_responses (user_id, question_id, context, response, status, score, points_awarded, practice_session_id)
          values (${s.userId}, ${f.id}, 'practice', ${empty ? { kind: 'empty' } : resp}, ${status}, ${sc}, ${sc === null ? null : sc * f.points}, ${s.id})`);
        if (status === 'correct') xp += await awardXp(t, s.userId, XP_CORRECT, 'practice_correct', `q:${f.id}`);
      }
      if (empty) blank++;
      else if (status === 'correct') correct++;
      else if (status === 'partial') partial++;
      else if (status === 'pending') pending++;
      else incorrect++;
      score += (sc ?? 0) * f.points;
    }
    score = Math.round(score * 1000) / 1000;
    await t.exec(sql`
      update practice_sessions set status = 'submitted', submitted_at = now(),
        duration_seconds = greatest(0, extract(epoch from (now() - started_at))::int),
        correct_count = ${correct}, partial_count = ${partial}, incorrect_count = ${incorrect}, blank_count = ${blank}, pending_count = ${pending},
        score = ${score}, max_score = ${maxScore}, draft_answers = '{}'::jsonb
      where id = ${s.id}`);
    const achievements = await evaluateAchievements(t, s.userId);
    return { total: full.length, correct, partial, incorrect, blank, pending, score, maxScore, xp, achievements };
  });
}

// ---------------- Kết quả ----------------

export interface ResultItem {
  view: SessionQuestion;
  reveal: AnswerReveal;
  response: Record<string, unknown> | null;
  status: GradeStatus | 'blank';
  score: number | null;
  note?: string;
  review: ReviewInfo | undefined;
  rubricHtml?: string;
  type: QuestionType;
  pointsAwarded: number | null;
  feedback: string | null;
}

export interface TopicStat {
  key: string;
  title: string;
  lessonTitle: string | null;
  href: string | null;
  topicId: number | null;
  total: number;
  /** Tổng điểm (0..total) của các câu đã chấm. */
  earned: number;
  graded: number;
  pct: number | null;
}

export async function sessionResult(q: Queryable, s: SessionRow, bookSlug: string) {
  const { questions, full, reviews } = await sessionQuestions(q, s, bookSlug);
  const rows = await q.many<{ questionId: number; response: unknown; status: GradeStatus; score: number | null; pointsAwarded: number | null; feedback: string | null }>(sql`
    select distinct on (question_id) question_id, response, status, score::float as score, points_awarded::float as points_awarded, feedback
    from question_responses where practice_session_id = ${s.id} order by question_id, id desc`);
  const byQ = new Map(rows.map((r) => [r.questionId, r]));
  const items: ResultItem[] = full.map((f, i) => {
    const r = byQ.get(f.id);
    const order = s.optionOrders[String(f.id)];
    const empty = !r || (r.response as { kind?: string })?.kind === 'empty';
    let note: string | undefined;
    if (f.type === 'short_answer' && r && !empty) {
      const g = gradeResponse(f.type, f.answers, f.settings, r.response as ResponsePayload);
      note = g.note;
    }
    return {
      view: questions[i],
      reveal: revealAnswer(f, order),
      response: empty ? null : responseForDisplay(f.type, r!.response, order),
      status: empty ? 'blank' : r!.status,
      score: r?.score ?? null,
      note,
      review: reviews.get(f.id),
      rubricHtml: f.rubric && !isAutoGraded(f.type) ? renderRich(f.rubric) : undefined,
      type: f.type,
      pointsAwarded: r?.pointsAwarded ?? null,
      feedback: r?.feedback ?? null,
    };
  });
  // Thống kê theo dạng toán (hoặc theo bài khi câu chưa gắn dạng)
  const stats = new Map<string, TopicStat>();
  for (const it of items) {
    const rv = it.review;
    const key = rv?.topicId ? `t${rv.topicId}` : `l${rv?.lessonId ?? 0}`;
    if (!stats.has(key))
      stats.set(key, {
        key,
        title: rv?.topicTitle ?? rv?.lessonTitle ?? 'Khác',
        lessonTitle: rv?.topicTitle ? rv.lessonTitle : null,
        href: rv?.href ?? null,
        topicId: rv?.topicId ?? null,
        total: 0,
        earned: 0,
        graded: 0,
        pct: null,
      });
    const st = stats.get(key)!;
    st.total++;
    if (it.status !== 'pending') {
      st.graded++;
      st.earned += it.status === 'blank' ? 0 : it.score ?? 0;
    }
  }
  for (const st of stats.values()) st.pct = st.graded ? Math.round((st.earned / st.graded) * 100) : null;
  const byTopic = [...stats.values()];
  const weak = byTopic.filter((t) => t.pct !== null && t.pct < 60).sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0));
  const gradedMax = full.reduce((sum, f, i) => sum + (items[i].status === 'pending' ? 0 : f.points), 0);
  const ten = toTenScale(s.score ?? 0, gradedMax);
  return { items, byTopic, weak, ten, gradedMax };
}

// ---------------- Lịch sử, câu hay sai, mức thành thạo ----------------

export async function listSessions(q: Queryable, userId: string, limit = 30, offset = 0) {
  const rows = await q.many<SessionRow>(sql`
    select ${SESSION_COLS} from practice_sessions where user_id = ${userId} order by started_at desc limit ${limit} offset ${offset}`);
  const total = await q.one<{ n: number }>(sql`select count(*)::int as n from practice_sessions where user_id = ${userId}`);
  return { rows, total: total?.n ?? 0 };
}

export interface WrongQuestionRow {
  questionId: number;
  type: QuestionType;
  level: number;
  stem: string;
  wrongCount: number;
  attempts: number;
  lastAt: Date;
  lessonTitle: string | null;
  lessonNumber: number | null;
  topicTitle: string | null;
}

/** Câu hay sai: câu học sinh từng làm sai và lần làm gần nhất vẫn chưa đúng. */
export async function wrongQuestions(q: Queryable, userId: string, textbookId: number, limit = 50): Promise<WrongQuestionRow[]> {
  return q.many<WrongQuestionRow>(sql`
    with agg as (
      select question_id,
        count(*) filter (where status in ('incorrect', 'partial'))::int as wrong_count,
        count(*)::int as attempts,
        max(created_at) as last_at,
        (array_agg(status order by created_at desc))[1] as last_status
      from question_responses where user_id = ${userId} and status <> 'pending'
      group by question_id
    )
    select a.question_id, et.code as type, qq.level, qq.stem, a.wrong_count, a.attempts, a.last_at,
      l.title as lesson_title, l.number as lesson_number, t.title as topic_title
    from agg a join questions qq on qq.id = a.question_id join exercise_types et on et.id = qq.exercise_type_id
    left join lessons l on l.id = qq.lesson_id left join topics t on t.id = qq.topic_id
    where a.wrong_count > 0 and a.last_status <> 'correct' and qq.status = 'published' and qq.textbook_id = ${textbookId}
    order by a.wrong_count desc, a.last_at desc limit ${limit}`);
}

export type MasteryLevel = 'none' | 'review' | 'learning' | 'good' | 'mastered';
export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  none: 'Chưa luyện',
  review: 'Cần ôn lại',
  learning: 'Đang tiến bộ',
  good: 'Khá vững',
  mastered: 'Thành thạo',
};

export function masteryOf(answered: number, recent: number | null): MasteryLevel {
  if (!answered || recent === null) return 'none';
  if (recent >= 0.85 && answered >= 6) return 'mastered';
  if (recent >= 0.65) return 'good';
  if (recent >= 0.4) return 'learning';
  return 'review';
}

export interface TopicMasteryRow {
  topicId: number;
  topicTitle: string;
  topicSlug: string | null;
  lessonId: number;
  lessonSlug: string;
  lessonTitle: string;
  lessonNumber: number | null;
  chapterId: number;
  chapterCode: string;
  chapterTitle: string;
  questionCount: number;
  answered: number;
  distinctCorrect: number;
  /** Điểm trung bình 8 lần làm gần nhất (0..1). */
  recent: number | null;
  mastery: MasteryLevel;
}

/** Mức thành thạo từng dạng toán và tiến độ (số câu đã làm đúng / số câu của dạng). */
export async function topicMastery(q: Queryable, userId: string, textbookId: number): Promise<TopicMasteryRow[]> {
  const rows = await q.many<Omit<TopicMasteryRow, 'mastery'>>(sql`
    with resp as (
      select qq.topic_id, r.question_id, r.score, r.status,
        row_number() over (partition by qq.topic_id order by r.created_at desc) as rn
      from question_responses r join questions qq on qq.id = r.question_id
      where r.user_id = ${userId} and r.status <> 'pending' and qq.topic_id is not null and qq.textbook_id = ${textbookId}
    ), stat as (
      select topic_id, count(*)::int as answered,
        count(distinct question_id) filter (where status = 'correct')::int as distinct_correct,
        avg(coalesce(score, 0)) filter (where rn <= 8) as recent
      from resp group by topic_id
    )
    select t.id as topic_id, t.title as topic_title, t.slug as topic_slug, l.id as lesson_id, l.slug as lesson_slug, l.title as lesson_title,
      l.number as lesson_number, c.id as chapter_id, c.code as chapter_code, c.title as chapter_title,
      (select count(*)::int from questions qq where qq.topic_id = t.id and qq.status = 'published') as question_count,
      coalesce(s.answered, 0) as answered, coalesce(s.distinct_correct, 0) as distinct_correct, s.recent::float as recent
    from topics t join lessons l on l.id = t.lesson_id join chapters c on c.id = l.chapter_id
    left join stat s on s.topic_id = t.id
    where l.textbook_id = ${textbookId} and t.status = 'published' and l.status = 'published'
    order by c.sort_order, l.sort_order, t.sort_order`);
  return rows.map((r) => ({ ...r, mastery: masteryOf(r.answered, r.recent) }));
}

/** Đổi thời lượng (giây) sang chữ: "12 phút 05 giây". */
export function formatDuration(sec: number | null): string {
  if (sec === null || sec === undefined) return '–';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h) return `${h} giờ ${String(m).padStart(2, '0')} phút`;
  if (m) return `${m} phút ${String(s).padStart(2, '0')} giây`;
  return `${s} giây`;
}

export { isValidOrder };
