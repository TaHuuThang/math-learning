import { chooseByLevel } from '../shared/pick';
import { sql, type Database, type Queryable } from '../server/db';
import type { FormData } from '../server/http/context';
import { QUESTION_TYPES, type AnswerKey, type QuestionSettings, type QuestionType } from '../shared/grading';
import { escapeHtml, renderRich, renderRichInline } from '../shared/richtext';
import { figureToSvg } from '../shared/figure';
import { MATCH_MODES, type MatchMode } from '../shared/answer-match';
import { checkQuestion } from '../shared/question-quality';
import { reorderOptions, toDisplayLabel } from '../shared/shuffle';

export interface QuestionImage {
  id: number;
  kind: 'upload' | 'figure';
  figureSource: string | null;
  alt: string;
}

export interface QuestionFull {
  id: number;
  type: QuestionType;
  textbookId: number;
  lessonId: number | null;
  topicId: number | null;
  level: number;
  stem: string;
  settings: QuestionSettings;
  points: number;
  status: QuestionStatus;
  source: string | null;
  createdBy: string | null;
  createdByName: string | null;
  createdAt: Date;
  updatedAt: Date;
  answers: (AnswerKey & { id: number; sortOrder: number; explanation: string | null })[];
  solution: string | null;
  hint: string | null;
  rubric: string | null;
  images: QuestionImage[];
  usedInTests: number;
  qualityIssues: string[];
  verifiedAt: Date | null;
}

export type QuestionStatus = 'draft' | 'review' | 'published' | 'archived';
export const QUESTION_STATUS_LABELS: Record<QuestionStatus, string> = {
  draft: 'Bản nháp',
  review: 'Chờ duyệt',
  published: 'Đã xuất bản',
  archived: 'Lưu trữ',
};

export async function getQuestions(q: Queryable, ids: number[]): Promise<QuestionFull[]> {
  if (!ids.length) return [];
  const rows = await q.many<Omit<QuestionFull, 'answers' | 'solution' | 'hint' | 'rubric' | 'images'>>(sql`
    select qq.id, et.code as type, qq.textbook_id, qq.lesson_id, qq.topic_id, qq.level, qq.stem, qq.settings, qq.points, qq.status,
      qq.source, qq.created_by, u.full_name as created_by_name, qq.created_at, qq.updated_at, qq.quality_issues, qq.verified_at,
      (select count(*)::int from test_questions tq where tq.question_id = qq.id) as used_in_tests
    from questions qq join exercise_types et on et.id = qq.exercise_type_id left join users u on u.id = qq.created_by
    where qq.id = any(${ids}::int[])`);
  const answers = await q.many<AnswerKey & { id: number; sortOrder: number; questionId: number; explanation: string | null }>(sql`
    select id, question_id, label, content, is_correct, sort_order, explanation from answers where question_id = any(${ids}::int[]) order by sort_order`);
  const sols = await q.many<{ questionId: number; kind: string; content: string }>(sql`
    select question_id, kind, content from solutions where question_id = any(${ids}::int[])`);
  const imgs = await q.many<QuestionImage & { questionId: number }>(sql`
    select qi.question_id, i.id, i.kind, i.figure_source, i.alt
    from question_images qi join images i on i.id = qi.image_id where qi.question_id = any(${ids}::int[]) order by qi.sort_order`);
  const byId = new Map(
    rows.map((r) => [
      r.id,
      {
        ...r,
        points: Number(r.points),
        answers: answers.filter((a) => a.questionId === r.id),
        solution: sols.find((s) => s.questionId === r.id && s.kind === 'full')?.content ?? null,
        hint: sols.find((s) => s.questionId === r.id && s.kind === 'hint')?.content ?? null,
        rubric: sols.find((s) => s.questionId === r.id && s.kind === 'rubric')?.content ?? null,
        images: imgs.filter((i) => i.questionId === r.id),
      } as QuestionFull,
    ]),
  );
  return ids.map((id) => byId.get(id)).filter(Boolean) as QuestionFull[];
}

export async function getQuestion(q: Queryable, id: number) {
  return (await getQuestions(q, [id]))[0] ?? null;
}

// ---------------- Hiển thị cho học sinh (không lộ đáp án) ----------------

export interface QuestionView {
  id: number;
  type: QuestionType;
  level: number;
  points: number;
  stemHtml: string;
  mediaHtml: string[];
  options?: { label: string; html: string }[];
  statements?: { label: string; html: string }[];
  unit?: string;
  hintHtml?: string;
  /** Khi làm sai: liên kết ôn lại kiến thức (dạng toán hoặc bài học). */
  review?: { label: string; href: string };
}

export function imageHtml(img: QuestionImage): string {
  if (img.kind === 'figure' && img.figureSource) {
    const { svg, errors } = figureToSvg(img.figureSource, { maxWidth: 400, maxHeight: 300 });
    return errors.length ? `<p class="math-error">Hình vẽ lỗi: ${escapeHtml(errors[0])}</p>` : svg;
  }
  return `<img src="/media/${img.id}" alt="${escapeHtml(img.alt || 'Hình minh họa')}" loading="lazy" class="max-w-full h-auto rounded-lg">`;
}

/**
 * Đề bài cho học sinh – không kèm đáp án. `order` (ví dụ "CADB") là thứ tự phương án hiển thị khi đề được đảo phương án.
 */
export function toView(q: QuestionFull, includeHint = true, order?: string | null): QuestionView {
  const view: QuestionView = {
    id: q.id,
    type: q.type,
    level: q.level,
    points: q.points,
    stemHtml: renderRich(q.stem),
    mediaHtml: q.images.map(imageHtml),
  };
  if (q.type === 'mcq') view.options = reorderOptions(q.answers, order).map((a) => ({ label: a.label, html: renderRichInline(a.content) }));
  if (q.type === 'true_false') view.statements = q.answers.map((a) => ({ label: a.label, html: renderRichInline(a.content) }));
  if (q.type === 'short_answer' && q.settings.unit) view.unit = q.settings.unit;
  if (includeHint && q.hint) view.hintHtml = renderRich(q.hint);
  return view;
}

export interface AnswerReveal {
  correctChoice?: string;
  correctValues?: Record<string, boolean>;
  acceptedHtml?: string[];
  solutionHtml?: string;
  /** Giải thích từng phương án (theo nhãn hiển thị) hoặc từng nhận định. */
  notesHtml?: Record<string, string>;
}

export function revealAnswer(q: QuestionFull, order?: string | null): AnswerReveal {
  const out: AnswerReveal = {};
  if (q.type === 'mcq') {
    const orig = q.answers.find((a) => a.isCorrect)?.label;
    out.correctChoice = orig ? toDisplayLabel(order, orig) : undefined;
  }
  if (q.type === 'true_false') out.correctValues = Object.fromEntries(q.answers.map((a) => [a.label, a.isCorrect]));
  if (q.type === 'short_answer') out.acceptedHtml = q.answers.map((a) => renderRichInline(a.content));
  if (q.solution) out.solutionHtml = renderRich(q.solution);
  if (q.type === 'mcq' || q.type === 'true_false') {
    const notes: Record<string, string> = {};
    for (const a of q.answers) {
      if (!a.explanation?.trim()) continue;
      notes[q.type === 'mcq' ? toDisplayLabel(order, a.label) : a.label] = renderRichInline(a.explanation);
    }
    if (Object.keys(notes).length) out.notesHtml = notes;
  }
  return out;
}

// ---------------- Danh sách cho giáo viên ----------------

export interface QuestionListRow {
  id: number;
  type: QuestionType;
  level: number;
  stem: string;
  status: string;
  points: number;
  lessonId: number | null;
  lessonTitle: string | null;
  lessonNumber: number | null;
  lessonKind: string | null;
  chapterCode: string | null;
  createdBy: string | null;
  createdByName: string | null;
  source: string | null;
  updatedAt: Date;
  responses: number;
  correctRate: number | null;
  issueCount: number;
}

export interface QuestionFilters {
  textbookId: number;
  lessonId?: number | null;
  type?: string | null;
  level?: number | null;
  status?: string | null;
  mineOf?: string | null;
  search?: string | null;
  topicId?: number | null;
  /** Chỉ câu có cảnh báo chất lượng. */
  issues?: boolean;
}

function filterSql(f: QuestionFilters) {
  const type = f.type && (QUESTION_TYPES as string[]).includes(f.type) ? f.type : null;
  const status = f.status && ['draft', 'review', 'published', 'archived'].includes(f.status) ? f.status : null;
  const search = f.search ? `%${f.search.toLowerCase()}%` : null;
  return sql`
    where qq.textbook_id = ${f.textbookId}
      and (${f.lessonId ?? null}::int is null or qq.lesson_id = ${f.lessonId ?? null})
      and (${f.topicId ?? null}::int is null or qq.topic_id = ${f.topicId ?? null})
      and (${type}::text is null or et.code = ${type})
      and (${f.level ?? null}::int is null or qq.level = ${f.level ?? null})
      and (${status}::text is null or qq.status = ${status})
      and (${status}::text is not null or qq.status <> 'archived')
      and (${f.mineOf ?? null}::uuid is null or qq.created_by = ${f.mineOf ?? null})
      and (${search}::text is null or lower(qq.stem) like ${search} or qq.id::text = ${f.search ?? ''})
      and (not ${!!f.issues} or jsonb_array_length(qq.quality_issues) > 0)`;
}

export async function listQuestions(q: Queryable, f: QuestionFilters, limit: number, offset: number) {
  const where = filterSql(f);
  const rows = await q.many<QuestionListRow>(sql`
    select qq.id, et.code as type, qq.level, qq.stem, qq.status, qq.points, qq.lesson_id,
      l.title as lesson_title, l.number as lesson_number, l.kind as lesson_kind, c.code as chapter_code,
      qq.created_by, u.full_name as created_by_name, qq.source, qq.updated_at, jsonb_array_length(qq.quality_issues) as issue_count,
      (select count(*)::int from question_responses r where r.question_id = qq.id and r.status <> 'pending') as responses,
      (select round(100.0 * count(*) filter (where r.status = 'correct') / nullif(count(*), 0))::int
         from question_responses r where r.question_id = qq.id and r.status <> 'pending') as correct_rate
    from questions qq join exercise_types et on et.id = qq.exercise_type_id
    left join lessons l on l.id = qq.lesson_id left join chapters c on c.id = l.chapter_id
    left join users u on u.id = qq.created_by
    ${where}
    order by c.sort_order nulls last, l.sort_order nulls last, qq.id
    limit ${limit} offset ${offset}`);
  const total = await q.one<{ n: number }>(sql`
    select count(*)::int as n from questions qq join exercise_types et on et.id = qq.exercise_type_id ${where}`);
  return { rows: rows.map((r) => ({ ...r, points: Number(r.points) })), total: total?.n ?? 0 };
}

export async function latestQuestions(q: Queryable, textbookId: number, limit: number) {
  return q.many<{ id: number; type: QuestionType; level: number; stem: string; lessonSlug: string; lessonTitle: string; lessonNumber: number | null; lessonKind: string; createdAt: Date }>(sql`
    select qq.id, et.code as type, qq.level, qq.stem, l.slug as lesson_slug, l.title as lesson_title, l.number as lesson_number, l.kind as lesson_kind, qq.created_at
    from questions qq join exercise_types et on et.id = qq.exercise_type_id join lessons l on l.id = qq.lesson_id
    where qq.textbook_id = ${textbookId} and qq.status = 'published' and l.status = 'published'
    order by qq.created_at desc, qq.id desc limit ${limit}`);
}

// ---------------- Chọn câu hỏi để luyện tập ----------------

export type PracticeScope =
  | { kind: 'lesson'; lessonId: number }
  | { kind: 'chapter'; chapterId: number }
  | { kind: 'topic'; topicId: number }
  | { kind: 'challenge'; textbookId: number };

/** Ưu tiên câu chưa làm đúng, sau đó ngẫu nhiên. */
export async function pickPracticeQuestionIds(q: Queryable, scope: PracticeScope, userId: string, limit: number): Promise<number[]> {
  const where =
    scope.kind === 'lesson'
      ? sql`qq.lesson_id = ${scope.lessonId}`
      : scope.kind === 'chapter'
        ? sql`l.chapter_id = ${scope.chapterId}`
        : scope.kind === 'topic'
          ? sql`qq.topic_id = ${scope.topicId}`
          : sql`qq.textbook_id = ${scope.textbookId} and qq.level >= 3 and et.code in ('mcq', 'true_false', 'short_answer')`;
  const rows = await q.many<{ id: number }>(sql`
    select qq.id
    from questions qq join exercise_types et on et.id = qq.exercise_type_id
    left join lessons l on l.id = qq.lesson_id
    where qq.status = 'published' and (l.id is null or l.status = 'published') and ${where}
    order by exists (select 1 from question_responses r where r.question_id = qq.id and r.user_id = ${userId} and r.status = 'correct'),
      random()
    limit ${limit}`);
  return rows.map((r) => r.id);
}

/**
 * Đề kiểm tra cuối chương: chọn ngẫu nhiên câu chấm tự động theo số câu mỗi mức độ;
 * mức nào thiếu câu thì bù bằng câu ở mức gần nhất. Câu xếp từ dễ đến khó.
 */
export async function pickChapterTestIds(q: Queryable, chapterId: number, plan: Record<number, number>): Promise<number[]> {
  const rows = await q.many<{ id: number; level: number }>(sql`
    select qq.id, qq.level
    from questions qq join exercise_types et on et.id = qq.exercise_type_id join lessons l on l.id = qq.lesson_id
    where l.chapter_id = ${chapterId} and qq.status = 'published' and l.status = 'published'
      and et.code in ('mcq', 'true_false', 'short_answer')
    order by random()`);
  return chooseByLevel(rows, plan).map((r) => r.id);
}

// ---------------- Soạn câu hỏi (giáo viên) ----------------

export interface QuestionInput {
  type: QuestionType;
  lessonId: number | null;
  topicId: number | null;
  level: number;
  points: number;
  /** Trạng thái giáo viên muốn: nháp hoặc đưa vào ngân hàng (published). Câu còn cảnh báo sẽ thành "chờ duyệt". */
  status: 'draft' | 'published';
  stem: string;
  options: string[];
  optionNotes: string[];
  correct: string;
  statements: { text: string; value: boolean | null; note: string }[];
  accepted: string[];
  tolerance: number;
  unit: string;
  match: MatchMode;
  solution: string;
  hint: string;
  rubric: string;
  figure: string;
  /** Giáo viên xác nhận đã kiểm tra câu hỏi (duyệt dù còn cảnh báo). */
  approve: boolean;
}

export function emptyQuestionInput(type: QuestionType): QuestionInput {
  return {
    type,
    lessonId: null,
    topicId: null,
    level: 1,
    points: 1,
    status: 'published',
    stem: '',
    options: ['', '', '', ''],
    optionNotes: ['', '', '', ''],
    correct: '',
    statements: ['a', 'b', 'c', 'd'].map(() => ({ text: '', value: null, note: '' })),
    accepted: [],
    tolerance: 0,
    unit: '',
    match: 'auto',
    solution: '',
    hint: '',
    rubric: '',
    figure: '',
    approve: false,
  };
}

export function questionToInput(qf: QuestionFull): QuestionInput {
  const input = emptyQuestionInput(qf.type);
  input.lessonId = qf.lessonId;
  input.topicId = qf.topicId;
  input.level = qf.level;
  input.points = qf.points;
  input.status = qf.status === 'draft' || qf.status === 'archived' ? 'draft' : 'published';
  input.stem = qf.stem;
  if (qf.type === 'mcq') {
    input.options = ['A', 'B', 'C', 'D'].map((l) => qf.answers.find((a) => a.label === l)?.content ?? '');
    input.optionNotes = ['A', 'B', 'C', 'D'].map((l) => qf.answers.find((a) => a.label === l)?.explanation ?? '');
    input.correct = qf.answers.find((a) => a.isCorrect)?.label ?? '';
  }
  if (qf.type === 'true_false') {
    input.statements = ['a', 'b', 'c', 'd'].map((l) => {
      const a = qf.answers.find((x) => x.label === l);
      return { text: a?.content ?? '', value: a ? a.isCorrect : null, note: a?.explanation ?? '' };
    });
  }
  if (qf.type === 'short_answer') {
    input.accepted = qf.answers.map((a) => a.content);
    input.tolerance = qf.settings.tolerance ?? 0;
    input.unit = qf.settings.unit ?? '';
    input.match = qf.settings.match ?? 'auto';
  }
  input.solution = qf.solution ?? '';
  input.hint = qf.hint ?? '';
  input.rubric = qf.rubric ?? '';
  input.figure = qf.images.find((i) => i.kind === 'figure')?.figureSource ?? '';
  return input;
}

/** Chạy bộ kiểm tra chất lượng trên dữ liệu soạn câu hỏi. */
export function qualityOf(input: QuestionInput, topicLevels?: number[]) {
  return checkQuestion({
    type: input.type,
    stem: input.stem,
    level: input.level,
    topicLevels,
    options: input.type === 'mcq' ? input.options : undefined,
    correct: input.type === 'mcq' ? input.correct : undefined,
    optionNotes: input.type === 'mcq' ? input.optionNotes : undefined,
    statements: input.type === 'true_false' ? input.statements : undefined,
    accepted: input.type === 'short_answer' ? input.accepted : undefined,
    rule: input.type === 'short_answer' ? { mode: input.match, tolerance: input.tolerance, unit: input.unit || undefined } : undefined,
    solution: input.solution,
    hint: input.hint,
    rubric: input.type === 'essay' || input.type === 'geometry_essay' ? input.rubric : undefined,
    figure: input.figure,
  });
}

export function parseQuestionForm(form: FormData): { input: QuestionInput; errors: string[] } {
  const errors: string[] = [];
  const type = form.str('type') as QuestionType;
  if (!(QUESTION_TYPES as string[]).includes(type)) return { input: emptyQuestionInput('mcq'), errors: ['Loại câu hỏi không hợp lệ.'] };
  const input = emptyQuestionInput(type);
  input.lessonId = form.int('lesson_id');
  input.topicId = form.int('topic_id');
  input.level = Math.min(4, Math.max(1, form.int('level') ?? 1));
  input.points = form.num('points') ?? 1;
  input.status = form.str('status') === 'draft' ? 'draft' : 'published';
  input.approve = form.str('approve') === '1';
  input.stem = form.text('stem', 8000).trim();
  input.solution = form.text('solution', 8000).trim();
  input.hint = form.text('hint', 2000).trim();
  input.rubric = form.text('rubric', 4000).trim();
  input.figure = form.text('figure', 4000).trim();

  if (!(input.points > 0 && input.points <= 100)) errors.push('Điểm của câu hỏi phải lớn hơn 0 và không quá 100.');
  if (!input.lessonId && !input.topicId) errors.push('Chọn bài học (hoặc dạng toán) cho câu hỏi.');

  if (type === 'mcq') {
    input.options = ['A', 'B', 'C', 'D'].map((l) => form.text(`option_${l}`, 2000).trim());
    input.optionNotes = ['A', 'B', 'C', 'D'].map((l) => form.text(`note_${l}`, 2000).trim());
    input.correct = form.str('correct');
  }
  if (type === 'true_false') {
    input.statements = ['a', 'b', 'c', 'd'].map((l) => {
      const v = form.str(`tf_${l}`);
      return { text: form.text(`stmt_${l}`, 2000).trim(), value: v === 'true' ? true : v === 'false' ? false : null, note: form.text(`note_${l}`, 2000).trim() };
    });
  }
  if (type === 'short_answer') {
    input.accepted = form
      .text('accepted', 1000)
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 10);
    input.tolerance = Math.abs(form.num('tolerance') ?? 0);
    input.unit = form.str('unit', 20);
    const m = form.str('match') as MatchMode;
    input.match = MATCH_MODES.some((x) => x.value === m) ? m : 'auto';
  }
  errors.push(...qualityOf(input).errors);
  return { input, errors };
}

/** Kiểm tra bài và dạng toán thuộc đúng sách; nếu chọn dạng toán thì bài lấy theo dạng toán. */
async function resolveLessonTopic(q: Queryable, textbookId: number, input: QuestionInput): Promise<{ error: string | null; topicLevels?: number[] }> {
  let topicLevels: number[] | undefined;
  if (input.topicId) {
    const t = await q.one<{ lessonId: number; textbookId: number; levels: number[] }>(sql`
      select t.lesson_id, l.textbook_id, t.levels from topics t join lessons l on l.id = t.lesson_id where t.id = ${input.topicId}`);
    if (!t || t.textbookId !== textbookId) return { error: 'Dạng toán không hợp lệ.' };
    if (input.lessonId && input.lessonId !== t.lessonId) return { error: 'Dạng toán đã chọn không thuộc bài học đã chọn.' };
    input.lessonId = t.lessonId;
    topicLevels = (t.levels ?? []).map(Number);
  }
  if (input.lessonId) {
    const l = await q.one(sql`select 1 from lessons where id = ${input.lessonId} and textbook_id = ${textbookId}`);
    if (!l) return { error: 'Bài học không hợp lệ.' };
  }
  return { error: null, topicLevels };
}

export interface SaveQuestionResult {
  id?: number;
  error?: string;
  status?: QuestionStatus;
  warnings?: string[];
}

/**
 * Lưu câu hỏi. Câu giáo viên muốn xuất bản nhưng còn cảnh báo chất lượng → "chờ duyệt" (không vào ngân hàng chính thức),
 * trừ khi giáo viên đánh dấu đã kiểm tra.
 */
export async function saveQuestion(
  db: Database,
  id: number | null,
  textbookId: number,
  input: QuestionInput,
  userId: string | null,
  opts: { forceReview?: boolean } = {},
): Promise<SaveQuestionResult> {
  return db.tx(async (t) => {
    const { error, topicLevels } = await resolveLessonTopic(t, textbookId, input);
    if (error) return { error };
    const report = qualityOf(input, topicLevels);
    if (report.errors.length) return { error: report.errors[0] };
    const warnings = report.warnings;
    const status: QuestionStatus = input.status === 'draft' ? 'draft' : opts.forceReview || (warnings.length && !input.approve) ? 'review' : 'published';
    const verified = status === 'published' && input.approve;
    const settings: QuestionSettings =
      input.type === 'short_answer'
        ? { tolerance: input.tolerance, ...(input.unit ? { unit: input.unit } : {}), ...(input.match !== 'auto' ? { match: input.match } : {}) }
        : {};
    let qid = id;
    if (qid) {
      await t.exec(sql`
        update questions set exercise_type_id = (select id from exercise_types where code = ${input.type}), lesson_id = ${input.lessonId},
          topic_id = ${input.topicId}, level = ${input.level}, stem = ${input.stem}, settings = ${settings}, points = ${input.points},
          status = ${status}, quality_issues = ${JSON.stringify(warnings)}::jsonb, updated_at = now(),
          verified_by = case when ${verified} then ${userId}::uuid else null end,
          verified_at = case when ${verified} then now() else null end
        where id = ${qid}`);
      await t.exec(sql`delete from answers where question_id = ${qid}`);
      await t.exec(sql`delete from solutions where question_id = ${qid}`);
    } else {
      const row = await t.one<{ id: number }>(sql`
        insert into questions (exercise_type_id, textbook_id, lesson_id, topic_id, level, stem, settings, points, status, created_by, quality_issues,
          verified_by, verified_at)
        values ((select id from exercise_types where code = ${input.type}), ${textbookId}, ${input.lessonId}, ${input.topicId}, ${input.level},
          ${input.stem}, ${settings}, ${input.points}, ${status}, ${userId}, ${JSON.stringify(warnings)}::jsonb,
          case when ${verified} then ${userId}::uuid else null end, case when ${verified} then now() else null end)
        returning id`);
      qid = row!.id;
    }
    if (input.type === 'mcq') {
      for (const [i, text] of input.options.entries()) {
        const label = 'ABCD'[i];
        await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order, explanation)
          values (${qid}, ${label}, ${text}, ${label === input.correct}, ${i + 1}, ${input.optionNotes[i] || null})`);
      }
    } else if (input.type === 'true_false') {
      for (const [i, st] of input.statements.entries()) {
        await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order, explanation)
          values (${qid}, ${'abcd'[i]}, ${st.text}, ${!!st.value}, ${i + 1}, ${st.note || null})`);
      }
    } else if (input.type === 'short_answer') {
      for (const [i, a] of input.accepted.entries()) {
        await t.exec(sql`insert into answers (question_id, label, content, is_correct, sort_order) values (${qid}, ${String(i + 1)}, ${a}, true, ${i + 1})`);
      }
    }
    if (input.solution) await t.exec(sql`insert into solutions (question_id, kind, content) values (${qid}, 'full', ${input.solution})`);
    if (input.hint) await t.exec(sql`insert into solutions (question_id, kind, content, sort_order) values (${qid}, 'hint', ${input.hint}, 1)`);
    if (input.rubric && (input.type === 'essay' || input.type === 'geometry_essay'))
      await t.exec(sql`insert into solutions (question_id, kind, content, sort_order) values (${qid}, 'rubric', ${input.rubric}, 2)`);
    // Hình vẽ: thay hình vẽ cũ (nếu có) bằng hình mới; ảnh tải lên giữ nguyên
    await t.exec(sql`
      delete from images where id in (
        select i.id from question_images qi join images i on i.id = qi.image_id where qi.question_id = ${qid} and i.kind = 'figure')`);
    if (input.figure) {
      const img = await t.one<{ id: number }>(sql`
        insert into images (kind, figure_source, alt, created_by, purpose) values ('figure', ${input.figure}, 'Hình vẽ minh họa đề bài', ${userId}, 'question') returning id`);
      await t.exec(sql`insert into question_images (question_id, image_id, sort_order) values (${qid}, ${img!.id}, 0)`);
    }
    return { id: qid!, status, warnings };
  });
}

/** Duyệt câu hỏi chờ duyệt (giáo viên đã kiểm tra) → đưa vào ngân hàng chính thức. */
export async function approveQuestions(db: Database, ids: number[], userId: string): Promise<number> {
  if (!ids.length) return 0;
  const rows = await db.many<{ id: number }>(sql`
    update questions set status = 'published', verified_by = ${userId}, verified_at = now(), updated_at = now()
    where id = any(${ids}::int[]) and status = 'review' returning id`);
  return rows.length;
}

/** Câu đã dùng trong đề kiểm tra thì chuyển sang lưu trữ thay vì xóa (giữ kết quả bài làm). */
export async function deleteQuestion(db: Database, id: number): Promise<'deleted' | 'archived'> {
  return db.tx(async (t) => {
    const used = await t.one<{ n: number }>(sql`select count(*)::int as n from test_questions where question_id = ${id}`);
    const answered = await t.one<{ n: number }>(sql`select count(*)::int as n from question_responses where question_id = ${id}`);
    if ((used?.n ?? 0) > 0 || (answered?.n ?? 0) > 0) {
      await t.exec(sql`update questions set status = 'archived', updated_at = now() where id = ${id}`);
      return 'archived';
    }
    await t.exec(sql`delete from images where id in (select image_id from question_images where question_id = ${id}) and kind = 'figure'`);
    await t.exec(sql`delete from questions where id = ${id}`);
    return 'deleted';
  });
}

export async function duplicateQuestion(db: Database, id: number, userId: string): Promise<number | null> {
  const qf = await getQuestion(db, id);
  if (!qf) return null;
  const input = questionToInput(qf);
  input.status = 'draft';
  const res = await saveQuestion(db, null, qf.textbookId, input, userId);
  return res.id ?? null;
}

export function canEditQuestion(q: { createdBy: string | null }, user: { id: string; role: string }) {
  return user.role === 'admin' || q.createdBy === null || q.createdBy === user.id;
}
