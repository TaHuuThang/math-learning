import type { ReactNode } from 'react';
import { LuArrowDown, LuArrowUp, LuEye, LuEyeOff, LuMap } from 'react-icons/lu';
import { HttpError, redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { intParam, requireBook } from '../common';
import { sql } from '../../db';
import { chapterLabel, getCourseTree, getLessonById, getLessonSections, lessonLabel, type LessonSection } from '../../../domain/curriculum';
import {
  DIFFICULTY_LABELS,
  LEVEL_LABELS,
  VERIFY_LABELS,
  getChapterById,
  getLessonThemes,
  getThemesByLesson,
  getTopicById,
  getTopicQuestionCounts,
  topicKey,
  type Level,
  type VerifyStatus,
} from '../../../domain/knowledge';
import {
  ContentError,
  createChapter,
  createLesson,
  createTheme,
  createTopic,
  deleteTheme,
  deleteTopic,
  mathErrors,
  moveChapter,
  moveLesson,
  moveTheme,
  moveTopic,
  setChapterStatus,
  setLessonStatus,
  setTopicStatus,
  updateChapter,
  updateLessonMeta,
  updateTheme,
  updateTopic,
} from '../../../domain/content-admin';
import { Island } from '../../../ui/Island';
import { Badge, Button, Checkbox, ErrorList, Field, PageTitle, Panel, PostForm, Rich, Select, TextArea, buttonClass, cx } from '../../../ui/components/ui';
import { LevelBadges, QuestionCoverage, VerifyBadge } from '../../../ui/components/knowledge';
import { LESSON_KIND_LABELS, SECTION_LABELS, formatDateTime } from '../../../shared/labels';
import { findMathErrors, renderRich } from '../../../shared/richtext';
import { ExamplePanel, FormulaPanel, ImagePanel, handleExampleAction, handleFormulaAction, loadExamples, loadFormulas, recentImages } from './lesson-v3-editor';

const STATUS_OPTIONS = [
  { value: 'published', label: 'Xuất bản – học sinh thấy' },
  { value: 'draft', label: 'Ẩn – chỉ giáo viên thấy' },
];
const VERIFY_OPTIONS = (['verified', 'needs_review', 'unverified'] as VerifyStatus[]).map((v) => ({ value: v, label: VERIFY_LABELS[v] }));
const RICH_HINT = 'Công thức cùng dòng \\( … \\), dòng riêng \\[ … \\]. Dòng bắt đầu bằng "- " thành danh sách. **chữ đậm**.';
const verify = (v: string): VerifyStatus => (['verified', 'needs_review', 'unverified'].includes(v) ? (v as VerifyStatus) : 'unverified');

/** Nút nhỏ gửi một thao tác (lên, xuống, ẩn/hiện…). */
function ActionButton({ action, fields, label, children, confirm, danger, disabled }: { action: string; fields: Record<string, string | number>; label: string; children: ReactNode; confirm?: string; danger?: boolean; disabled?: boolean }) {
  return (
    <PostForm action={action} confirm={confirm}>
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <button className={buttonClass('quiet', 'sm', cx('px-2', danger && 'text-le hover:bg-le-soft'))} aria-label={label} title={label} disabled={disabled}>
        {children}
      </button>
    </PostForm>
  );
}

function RichInput({ name, label, value, rows = 3, hint = RICH_HINT, required }: { name: string; label: string; value: string | null; rows?: number; hint?: string; required?: boolean }) {
  return <Island name="RichField" props={{ name, label, defaultValue: value ?? '', initialHtml: value ? renderRich(value) : '', rows, hint, required: !!required }} />;
}

const nullable = (s: string) => (s.trim() ? s.trim() : null);

// ---------------- /giao-vien/chuong-trinh ----------------

export async function curriculumAdminPage(ctx: Ctx, errors?: string[]): Promise<Res> {
  requireTeacher(ctx);
  const book = await requireBook(ctx);
  const [tree, themes, chapters] = await Promise.all([
    getCourseTree(ctx.db, book.id, null, true),
    getThemesByLesson(ctx.db, book.id, true),
    ctx.db.many<{ id: number; status: string; verifyStatus: VerifyStatus; verifyNote: string | null }>(sql`
      select id, status, verify_status, verify_note from chapters where textbook_id = ${book.id}`),
  ]);
  const chMeta = new Map(chapters.map((c) => [c.id, c]));
  const A = '/giao-vien/chuong-trinh';
  return page(
    ctx,
    { title: 'Chương trình & bài học', layout: 'dashboard', section: 'curriculum', status: errors ? 422 : 200 },
    <>
      <PageTitle
        title="Chương trình & bài học"
        sub={`${book.title} – ${book.series}. Thêm, sửa, sắp xếp, ẩn hoặc xuất bản chương và bài; bấm "Soạn" để soạn nội dung, chủ đề và dạng toán của bài.`}
        actions={
          <>
            <a href={`/hoc/${book.slug}/ban-do`} className={buttonClass('secondary', 'md')}>
              <LuMap aria-hidden="true" /> Bản đồ kiến thức
            </a>
            <a href={`/chuong-trinh/${book.slug}/ppct`} className={buttonClass('quiet', 'md')}>
              Phân phối chương trình
            </a>
          </>
        }
      />
      <ErrorList errors={errors} />
      <div className="space-y-10">
        {tree.map((s) => (
          <section key={s.id}>
            <h2 className="mb-3 text-xl font-extrabold">{s.name}</h2>
            <div className="space-y-4">
              {s.chapters.map((c, ci) => {
                const m = chMeta.get(c.id);
                return (
                  <Panel key={c.id} className="overflow-x-auto">
                    <div className="flex flex-wrap items-center gap-2 border-b border-line bg-mist/60 px-5 py-3">
                      <span className="font-extrabold">{chapterLabel(c)}</span>
                      {c.status !== 'published' && <Badge tone="gray">Đang ẩn</Badge>}
                      {m && <VerifyBadge status={m.verifyStatus} note={m.verifyNote} />}
                      <span className="ml-auto flex items-center gap-1">
                        <ActionButton action={A} fields={{ _action: 'move-chapter', id: c.id, dir: -1 }} label="Đưa chương lên" disabled={ci === 0}>
                          <LuArrowUp aria-hidden="true" />
                        </ActionButton>
                        <ActionButton action={A} fields={{ _action: 'move-chapter', id: c.id, dir: 1 }} label="Đưa chương xuống" disabled={ci === s.chapters.length - 1}>
                          <LuArrowDown aria-hidden="true" />
                        </ActionButton>
                        <ActionButton
                          action={A}
                          fields={{ _action: 'chapter-status', id: c.id, status: c.status === 'published' ? 'draft' : 'published' }}
                          label={c.status === 'published' ? 'Ẩn chương' : 'Xuất bản chương'}
                        >
                          {c.status === 'published' ? <LuEyeOff aria-hidden="true" /> : <LuEye aria-hidden="true" />}
                        </ActionButton>
                        <a href={`/giao-vien/chuong/${c.id}`} className={buttonClass('secondary', 'sm')}>
                          Sửa chương
                        </a>
                      </span>
                    </div>
                    <table className="data-table min-w-[860px]">
                      <thead>
                        <tr>
                          <th className="w-24">Mã</th>
                          <th>Mục</th>
                          <th className="w-16">Tiết</th>
                          <th className="w-24">Nội dung</th>
                          <th className="w-28">Chủ đề / dạng</th>
                          <th className="w-20">Bài tập</th>
                          <th className="w-28">Trạng thái</th>
                          <th className="w-44" />
                        </tr>
                      </thead>
                      <tbody>
                        {c.lessons.map((l, li) => {
                          const ths = themes.get(l.id) ?? [];
                          return (
                            <tr key={l.id}>
                              <td className="text-[13px] text-ink-3">{l.code ?? '—'}</td>
                              <td>
                                <a href={`/hoc/${book.slug}/bai/${l.slug}`} className="font-medium hover:text-tim-700 hover:underline">
                                  {lessonLabel(l)}
                                </a>
                              </td>
                              <td>{l.periods}</td>
                              <td>{l.sectionCount ? `${l.sectionCount} mục` : <span className="text-ink-3">Chưa có</span>}</td>
                              <td>
                                {ths.filter((th) => th.id).length} / {ths.reduce((n, th) => n + th.topics.length, 0)}
                              </td>
                              <td>{l.questionCount}</td>
                              <td>{l.status === 'published' ? <Badge tone="tre">Xuất bản</Badge> : <Badge tone="gray">Ẩn</Badge>}</td>
                              <td>
                                <span className="flex items-center justify-end gap-1">
                                  <ActionButton action={A} fields={{ _action: 'move-lesson', id: l.id, dir: -1 }} label="Đưa bài lên" disabled={li === 0}>
                                    <LuArrowUp aria-hidden="true" />
                                  </ActionButton>
                                  <ActionButton action={A} fields={{ _action: 'move-lesson', id: l.id, dir: 1 }} label="Đưa bài xuống" disabled={li === c.lessons.length - 1}>
                                    <LuArrowDown aria-hidden="true" />
                                  </ActionButton>
                                  <ActionButton
                                    action={A}
                                    fields={{ _action: 'lesson-status', id: l.id, status: l.status === 'published' ? 'draft' : 'published' }}
                                    label={l.status === 'published' ? 'Ẩn bài' : 'Xuất bản bài'}
                                  >
                                    {l.status === 'published' ? <LuEyeOff aria-hidden="true" /> : <LuEye aria-hidden="true" />}
                                  </ActionButton>
                                  <a href={`/giao-vien/bai-hoc/${l.id}`} className={buttonClass('quiet', 'sm')}>
                                    Soạn
                                  </a>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <details className="border-t border-line px-5 py-3">
                      <summary className="text-[14px] font-semibold text-tim-700">Thêm bài / mục vào chương này</summary>
                      <PostForm action={A} className="mt-3 grid gap-3 md:grid-cols-[110px_minmax(0,1fr)_200px_90px_220px_auto] md:items-end">
                        <input type="hidden" name="_action" value="add-lesson" />
                        <input type="hidden" name="chapter_id" value={c.id} />
                        <Field label="Số bài" name="number" type="number" min={1} max={200} hint="Bỏ trống nếu không phải bài học" />
                        <Field label="Tên bài / mục" name="title" required maxLength={200} />
                        <Select label="Loại" name="kind" defaultValue="lesson" options={Object.entries(LESSON_KIND_LABELS).map(([value, label]) => ({ value, label }))} />
                        <Field label="Số tiết" name="periods" type="number" min={0} max={20} defaultValue={1} />
                        <Select label="Trạng thái" name="status" defaultValue="draft" options={STATUS_OPTIONS} />
                        <Button size="sm">Thêm</Button>
                      </PostForm>
                    </details>
                  </Panel>
                );
              })}
            </div>
            <details className="mt-4 rounded-[18px] border border-dashed border-line-2 bg-white px-5 py-3">
              <summary className="text-[14px] font-semibold text-tim-700">Thêm chương vào {s.name}</summary>
              <PostForm action={A} className="mt-3 grid gap-3 md:grid-cols-[110px_minmax(0,1fr)_220px_auto] md:items-end">
                <input type="hidden" name="_action" value="add-chapter" />
                <input type="hidden" name="semester_id" value={s.id} />
                <Field label="Mã chương" name="code" required maxLength={8} hint="Ví dụ: XI, TN3" />
                <Field label="Tên chương" name="title" required maxLength={200} />
                <Select label="Loại" name="kind" defaultValue="chapter" options={[{ value: 'chapter', label: 'Chương' }, { value: 'activity', label: 'Hoạt động trải nghiệm' }]} />
                <Button size="sm">Thêm chương</Button>
              </PostForm>
              <p className="mt-2 text-[13px] text-ink-3">Chương mới ở trạng thái ẩn và được đánh dấu "Chưa đối chiếu" cho tới khi giáo viên kiểm tra với SGK.</p>
            </details>
          </section>
        ))}
      </div>
    </>,
  );
}

export async function curriculumAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const form = await ctx.form();
  const action = form.str('_action');
  const id = form.int('id');
  const dir = form.int('dir') === -1 ? -1 : 1;
  const back = '/giao-vien/chuong-trinh';
  const inBook = async (table: 'chapters' | 'lessons', rowId: number | null) =>
    rowId !== null &&
    !!(await ctx.db.one(table === 'chapters' ? sql`select 1 from chapters where id = ${rowId} and textbook_id = ${book.id}` : sql`select 1 from lessons where id = ${rowId} and textbook_id = ${book.id}`));
  try {
    if (action === 'add-chapter') {
      const code = form.str('code', 8).toUpperCase();
      const title = form.str('title', 200);
      const errs: string[] = [];
      if (!/^[A-Z0-9]{1,8}$/.test(code)) errs.push('Mã chương chỉ gồm chữ in hoa không dấu và chữ số (ví dụ XI, TN3).');
      if (!title) errs.push('Chưa nhập tên chương.');
      if (errs.length) return curriculumAdminPage(ctx, errs);
      const cid = await createChapter(ctx.db, book.id, { semesterId: form.int('semester_id') ?? 0, code, title, kind: form.str('kind') === 'activity' ? 'activity' : 'chapter', description: null }, user.id);
      return redirect(`/giao-vien/chuong/${cid}`, { type: 'success', message: 'Đã thêm chương (đang ẩn). Hãy soạn mục tiêu, kiến thức trọng tâm rồi xuất bản.' }, ctx);
    }
    if (action === 'move-chapter' && (await inBook('chapters', id))) {
      await moveChapter(ctx.db, id!, dir);
      return redirect(back);
    }
    if (action === 'chapter-status' && (await inBook('chapters', id))) {
      await setChapterStatus(ctx.db, id!, form.str('status'));
      return redirect(back, { type: 'success', message: form.str('status') === 'draft' ? 'Đã ẩn chương.' : 'Đã xuất bản chương.' }, ctx);
    }
    if (action === 'add-lesson') {
      const chapterId = form.int('chapter_id');
      if (!(await inBook('chapters', chapterId))) throw new HttpError(404);
      const title = form.str('title', 200);
      const periods = form.int('periods');
      const number = form.int('number');
      if (!title) return curriculumAdminPage(ctx, ['Chưa nhập tên bài.']);
      if (periods !== null && (periods < 0 || periods > 20)) return curriculumAdminPage(ctx, ['Số tiết từ 0 đến 20.']);
      const kind = (['lesson', 'practice', 'review', 'activity'].includes(form.str('kind')) ? form.str('kind') : 'lesson') as 'lesson';
      const res = await createLesson(ctx.db, chapterId!, { number: kind === 'lesson' ? number : null, title, kind, periods, status: form.str('status') === 'published' ? 'published' : 'draft', code: null }, user.id);
      return redirect(`/giao-vien/bai-hoc/${res.id}`, { type: 'success', message: 'Đã thêm bài. Soạn mã bài, mục tiêu, chủ đề và dạng toán ở trang này.' }, ctx);
    }
    if (action === 'move-lesson' && (await inBook('lessons', id))) {
      await moveLesson(ctx.db, id!, dir);
      return redirect(back);
    }
    if (action === 'lesson-status' && (await inBook('lessons', id))) {
      await setLessonStatus(ctx.db, id!, form.str('status'), user.id);
      return redirect(back, { type: 'success', message: form.str('status') === 'draft' ? 'Đã ẩn bài.' : 'Đã xuất bản bài.' }, ctx);
    }
  } catch (err) {
    if (err instanceof ContentError) return curriculumAdminPage(ctx, [err.message]);
    throw err;
  }
  throw new HttpError(400, 'Thao tác không hợp lệ.');
}

// ---------------- /giao-vien/chuong/:id ----------------

export async function chapterEditorPage(ctx: Ctx, errors?: string[]): Promise<Res> {
  requireTeacher(ctx);
  const chapter = await getChapterById(ctx.db, intParam(ctx, 'id'));
  if (!chapter) throw new HttpError(404, 'Không tìm thấy chương.');
  const book = await ctx.db.one<{ slug: string }>(sql`select slug from textbooks where id = ${chapter.textbookId}`);
  const label = chapterLabel(chapter);
  const A = `/giao-vien/chuong/${chapter.id}`;
  return page(
    ctx,
    { title: `Sửa: ${label}`, layout: 'dashboard', section: 'curriculum', status: errors ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/chuong-trinh', label: 'Chương trình & bài học' }, { label }]}
        title={label}
        sub={`${chapter.semesterName} · ${chapter.kind === 'chapter' ? 'Chương' : 'Hoạt động thực hành trải nghiệm'}`}
        actions={
          <a href={`/hoc/${book!.slug}/chuong/${encodeURIComponent(chapter.code)}`} className={buttonClass('secondary', 'md')}>
            Xem như học sinh
          </a>
        }
      />
      <ErrorList errors={errors} />
      <PostForm action={A} className="space-y-6">
        <Panel className="grid gap-4 p-5 md:grid-cols-[140px_minmax(0,1fr)_260px]">
          <Field label="Mã chương" name="code" required maxLength={8} defaultValue={chapter.code} />
          <Field label="Tên chương" name="title" required maxLength={200} defaultValue={chapter.title} />
          <Select label="Trạng thái" name="status" defaultValue={chapter.status} options={STATUS_OPTIONS} />
          <TextArea className="md:col-span-3" label="Mô tả ngắn" name="description" defaultValue={chapter.description} rows={2} />
        </Panel>
        <Panel className="space-y-4 p-5">
          <RichInput name="objectives" label="Mục tiêu cần đạt" value={chapter.objectives} rows={4} />
          <RichInput name="key_points" label="Kiến thức trọng tâm" value={chapter.keyPoints} rows={4} />
          <RichInput name="formulas" label="Công thức cần nhớ" value={chapter.formulas} rows={4} />
        </Panel>
        <Panel className="grid gap-4 p-5 md:grid-cols-[260px_minmax(0,1fr)]">
          <Select label="Đối chiếu với SGK" name="verify_status" defaultValue={chapter.verifyStatus} options={VERIFY_OPTIONS} />
          <TextArea label="Ghi chú đối chiếu (nguồn, điểm cần kiểm tra)" name="verify_note" defaultValue={chapter.verifyNote} rows={2} />
        </Panel>
        <Button>Lưu chương</Button>
      </PostForm>
    </>,
  );
}

export async function chapterEditorAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const chapterId = intParam(ctx, 'id');
  const form = await ctx.form();
  const code = form.str('code', 8).toUpperCase();
  const title = form.str('title', 200);
  const u = {
    code,
    title,
    description: nullable(form.text('description', 1000)),
    objectives: nullable(form.text('objectives', 8000)),
    keyPoints: nullable(form.text('key_points', 8000)),
    formulas: nullable(form.text('formulas', 8000)),
    status: form.str('status') === 'draft' ? ('draft' as const) : ('published' as const),
    verifyStatus: verify(form.str('verify_status')),
    verifyNote: nullable(form.text('verify_note', 2000)),
  };
  const errors: string[] = [];
  if (!/^[A-Z0-9]{1,8}$/.test(code)) errors.push('Mã chương chỉ gồm chữ in hoa không dấu và chữ số.');
  if (!title) errors.push('Tên chương không được để trống.');
  errors.push(...mathErrors([['Mục tiêu', u.objectives], ['Kiến thức trọng tâm', u.keyPoints], ['Công thức', u.formulas]]));
  if (errors.length) return chapterEditorPage(ctx, errors);
  try {
    await updateChapter(ctx.db, chapterId, u, user.id);
  } catch (err) {
    if (err instanceof ContentError) return chapterEditorPage(ctx, [err.message]);
    throw err;
  }
  return redirect(`/giao-vien/chuong/${chapterId}`, { type: 'success', message: 'Đã lưu chương.' }, ctx);
}

// ---------------- /giao-vien/bai-hoc/:id ----------------

const SECTION_KINDS = ['concept', 'definition', 'property', 'theorem', 'rule', 'formula', 'special', 'condition', 'note', 'knowledge', 'objective', 'example'] as const;

function SectionForm({ lessonId, s, idx }: { lessonId: number; s?: LessonSection; idx: string }) {
  return (
    <PostForm action={`/giao-vien/bai-hoc/${lessonId}`} className="space-y-3">
      <input type="hidden" name="_action" value={s ? 'update-section' : 'add-section'} />
      {s && <input type="hidden" name="section_id" value={s.id} />}
      <div className="grid gap-3 sm:grid-cols-[200px_minmax(0,1fr)]">
        <Select label="Loại" name="kind" defaultValue={s?.kind ?? 'knowledge'} options={SECTION_KINDS.map((k) => ({ value: k, label: SECTION_LABELS[k] }))} />
        <Field label="Tiêu đề (không bắt buộc)" name="title" defaultValue={s?.title ?? ''} maxLength={200} />
      </div>
      <Island
        name="RichField"
        props={{
          name: 'body',
          label: 'Nội dung',
          defaultValue: s?.body ?? '',
          initialHtml: s ? renderRich(s.body) : '',
          rows: 7,
          required: true,
          hint: 'Công thức cùng dòng \\( … \\), dòng riêng \\[ … \\]. Dòng bắt đầu bằng "- " thành danh sách. **chữ đậm**. Hình vẽ: [hinh] … [/hinh].',
        }}
        key={`body-${idx}`}
      />
      <TextArea label="Công thức nổi bật (mã TeX, không bắt buộc)" name="formula" rows={2} defaultValue={s?.formula ?? ''} hint="Hiện trong khung công thức của mục. Ví dụ: x^m \cdot x^n = x^{m+n}" />
      <Island
        name="RichField"
        props={{ name: 'example', label: 'Ví dụ ngắn (không bắt buộc)', defaultValue: s?.example ?? '', initialHtml: s?.example ? renderRich(s.example) : '', rows: 3 }}
        key={`ex-${idx}`}
      />
      <Island
        name="RichField"
        props={{ name: 'solution', label: 'Lời giải (chỉ dùng cho loại Ví dụ của bản cũ)', defaultValue: s?.solution ?? '', initialHtml: s?.solution ? renderRich(s.solution) : '', rows: 3 }}
        key={`sol-${idx}`}
      />
      <Select label="Trạng thái" name="status" defaultValue={s?.status ?? 'published'} options={STATUS_OPTIONS} />
      <Button>{s ? 'Lưu mục này' : 'Thêm vào bài'}</Button>
    </PostForm>
  );
}

export async function lessonEditorPage(ctx: Ctx, errors?: string[]): Promise<Res> {
  requireTeacher(ctx);
  const lesson = await getLessonById(ctx.db, intParam(ctx, 'id'));
  if (!lesson) throw new HttpError(404, 'Không tìm thấy bài học.');
  const book = await ctx.db.one<{ slug: string; title: string }>(sql`select slug, title from textbooks where id = ${lesson.textbookId}`);
  const [sections, themes, formulas, images] = await Promise.all([getLessonSections(ctx.db, lesson.id), getLessonThemes(ctx.db, lesson.textbookId, lesson.id, true), loadFormulas(ctx, lesson.id), recentImages(ctx)]);
  const label = lessonLabel(lesson);
  const A = `/giao-vien/bai-hoc/${lesson.id}`;
  const realThemes = themes.filter((th) => th.id);
  const topicCount = themes.reduce((n, th) => n + th.topics.length, 0);
  return page(
    ctx,
    { title: `Soạn: ${label}`, layout: 'dashboard', section: 'curriculum', status: errors ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/chuong-trinh', label: 'Chương trình & bài học' }, { href: `/giao-vien/chuong/${lesson.chapterId}`, label: chapterLabel({ kind: lesson.chapterKind, code: lesson.chapterCode, title: lesson.chapterTitle }) }, { label }]}
        title={label}
        sub={`${lesson.code ? lesson.code + ' · ' : ''}${LESSON_KIND_LABELS[lesson.kind]} · cập nhật ${formatDateTime(lesson.updatedAt)}`}
        actions={
          <>
            <a href={`/hoc/${book!.slug}/bai/${lesson.slug}`} className={buttonClass('secondary', 'md')}>
              Xem như học sinh
            </a>
            <a href={`/giao-vien/cau-hoi?bai=${lesson.id}`} className={buttonClass('quiet', 'md')}>
              Câu hỏi của bài
            </a>
          </>
        }
      />
      <ErrorList errors={errors} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Chủ đề và dạng toán ({realThemes.length} chủ đề, {topicCount} dạng)</h2>
            <p className="mt-1 text-[14px] text-ink-3">Bài → Chủ đề → Dạng toán → Bài tập. Bấm tên dạng toán để soạn kiến thức, dấu hiệu, phương pháp, các bước, lỗi sai, ví dụ và mức độ.</p>
            <div className="mt-4 space-y-4">
              {themes.map((th, ti) => (
                <div key={th.id || 'khac'} className="rounded-2xl border border-line">
                  <div className="flex flex-wrap items-center gap-2 border-b border-line bg-mist/50 px-4 py-2.5">
                    <span className="font-bold">{th.title}</span>
                    {th.code && <span className="text-[12px] text-ink-3">{th.code}</span>}
                    {th.status === 'draft' && <Badge tone="gray">Đang ẩn</Badge>}
                    {th.id > 0 && (
                      <span className="ml-auto flex items-center gap-1">
                        <ActionButton action={A} fields={{ _action: 'move-theme', theme_id: th.id, dir: -1 }} label="Đưa chủ đề lên" disabled={ti === 0}>
                          <LuArrowUp aria-hidden="true" />
                        </ActionButton>
                        <ActionButton action={A} fields={{ _action: 'move-theme', theme_id: th.id, dir: 1 }} label="Đưa chủ đề xuống" disabled={ti === realThemes.length - 1}>
                          <LuArrowDown aria-hidden="true" />
                        </ActionButton>
                      </span>
                    )}
                  </div>
                  <ul className="divide-y divide-line">
                    {th.topics.map((t, k) => (
                      <li key={t.id} className="flex flex-wrap items-center gap-2 px-4 py-2">
                        <a href={`/giao-vien/dang-toan/${t.id}`} className="min-w-0 flex-1 text-[15px] font-medium hover:text-tim-700 hover:underline">
                          {t.title}
                        </a>
                        <span className="text-[12px] text-ink-3">{t.code}</span>
                        <LevelBadges levels={t.levels} />
                        <span className="text-[12.5px] text-ink-3">{t.questionCount} câu</span>
                        {t.status === 'draft' && <Badge tone="gray">Ẩn</Badge>}
                        <span className="flex items-center gap-1">
                          <ActionButton action={A} fields={{ _action: 'move-topic', topic_id: t.id, dir: -1 }} label="Đưa dạng lên" disabled={k === 0}>
                            <LuArrowUp aria-hidden="true" />
                          </ActionButton>
                          <ActionButton action={A} fields={{ _action: 'move-topic', topic_id: t.id, dir: 1 }} label="Đưa dạng xuống" disabled={k === th.topics.length - 1}>
                            <LuArrowDown aria-hidden="true" />
                          </ActionButton>
                          <ActionButton
                            action={A}
                            fields={{ _action: 'topic-status', topic_id: t.id, status: t.status === 'published' ? 'draft' : 'published' }}
                            label={t.status === 'published' ? 'Ẩn dạng toán' : 'Xuất bản dạng toán'}
                          >
                            {t.status === 'published' ? <LuEyeOff aria-hidden="true" /> : <LuEye aria-hidden="true" />}
                          </ActionButton>
                        </span>
                      </li>
                    ))}
                    {!th.topics.length && <li className="px-4 py-2 text-[14px] text-ink-3">Chưa có dạng toán.</li>}
                  </ul>
                  {th.id > 0 && (
                    <details className="border-t border-line px-4 py-2.5">
                      <summary className="text-[13.5px] font-semibold text-tim-700">Sửa chủ đề</summary>
                      <PostForm action={A} className="mt-3 space-y-2">
                        <input type="hidden" name="_action" value="update-theme" />
                        <input type="hidden" name="theme_id" value={th.id} />
                        <Field label="Tên chủ đề" name="title" required maxLength={300} defaultValue={th.title} />
                        <TextArea label="Mô tả" name="description" defaultValue={th.description} rows={2} />
                        <Select label="Trạng thái" name="status" defaultValue={th.status} options={STATUS_OPTIONS} />
                        <Button size="sm" variant="secondary">
                          Lưu chủ đề
                        </Button>
                      </PostForm>
                      <PostForm action={A} className="mt-2" confirm="Xóa chủ đề này? Các dạng toán của chủ đề vẫn được giữ lại (chuyển sang nhóm Dạng toán khác).">
                        <input type="hidden" name="_action" value="delete-theme" />
                        <input type="hidden" name="theme_id" value={th.id} />
                        <button className={buttonClass('ghost', 'sm', 'text-le hover:bg-le-soft')}>Xóa chủ đề</button>
                      </PostForm>
                    </details>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 border-t border-line pt-4 lg:grid-cols-2">
              <PostForm action={A} className="space-y-2">
                <input type="hidden" name="_action" value="add-theme" />
                <h3 className="font-bold">Thêm chủ đề</h3>
                <Field label="Tên chủ đề" name="title" required maxLength={300} />
                <TextArea label="Mô tả (không bắt buộc)" name="description" rows={2} />
                <Button size="sm">Thêm chủ đề</Button>
              </PostForm>
              <PostForm action={A} className="space-y-2">
                <input type="hidden" name="_action" value="add-topic" />
                <h3 className="font-bold">Thêm dạng toán</h3>
                <Field label="Tên dạng toán" name="title" required maxLength={200} />
                <Select label="Thuộc chủ đề" name="theme_id" defaultValue={realThemes[0]?.id ?? ''} options={[...realThemes.map((th) => ({ value: th.id, label: th.title })), { value: '', label: 'Chưa xếp chủ đề' }]} />
                <Button size="sm">Thêm và soạn dạng toán</Button>
              </PostForm>
            </div>
          </Panel>

          <section>
            <h2 className="mb-3 text-lg font-extrabold">Nội dung bài học ({sections.length} mục)</h2>
            <div className="space-y-4">
              {sections.map((s, i) => (
                <Panel key={s.id} className="p-5">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge>{SECTION_LABELS[s.kind]}</Badge>
                      {s.title && <strong>{s.title}</strong>}
                      {s.status === 'draft' && <Badge tone="gray">Đang ẩn</Badge>}
                    </div>
                    <div className="flex gap-1">
                      <ActionButton action={A} fields={{ _action: 'section-status', section_id: s.id, status: s.status === 'published' ? 'draft' : 'published' }} label={s.status === 'published' ? 'Ẩn mục' : 'Xuất bản mục'}>
                        {s.status === 'published' ? <LuEyeOff aria-hidden="true" /> : <LuEye aria-hidden="true" />}
                      </ActionButton>
                      <ActionButton action={A} fields={{ _action: 'move-section', section_id: s.id, dir: -1 }} label="Đưa lên" disabled={i === 0}>
                        Lên
                      </ActionButton>
                      <ActionButton action={A} fields={{ _action: 'move-section', section_id: s.id, dir: 1 }} label="Đưa xuống" disabled={i === sections.length - 1}>
                        Xuống
                      </ActionButton>
                      <ActionButton action={A} fields={{ _action: 'delete-section', section_id: s.id }} label="Xóa" confirm="Xóa mục nội dung này?" danger>
                        Xóa
                      </ActionButton>
                    </div>
                  </div>
                  <Rich src={s.body} />
                  {s.formula && (
                    <div className="formula-frame mt-3 px-4 py-2">
                      <Rich src={`\\[${s.formula}\\]`} />
                    </div>
                  )}
                  {s.example && (
                    <div className="mt-3 rounded-xl border border-dashed border-tim-200 px-4 py-2">
                      <div className="text-[13px] font-semibold text-ink-3">Ví dụ</div>
                      <Rich src={s.example} />
                    </div>
                  )}
                  {s.solution && (
                    <div className="mt-2 rounded-xl bg-mist px-4 py-2">
                      <div className="text-[13px] font-semibold text-ink-3">Lời giải</div>
                      <Rich src={s.solution} />
                    </div>
                  )}
                  <details className="mt-3 border-t border-line pt-3">
                    <summary className="text-[14px] font-semibold text-tim-700">Sửa mục này</summary>
                    <div className="mt-3">
                      <SectionForm lessonId={lesson.id} s={s} idx={String(s.id)} />
                    </div>
                  </details>
                </Panel>
              ))}
            </div>
          </section>
          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Thêm mục nội dung</h2>
            <SectionForm lessonId={lesson.id} idx="new" />
          </Panel>
          <div id="cong-thuc-bai" className="scroll-mt-24">
            <FormulaPanel action={A} formulas={formulas} />
          </div>
        </div>

        <div className="space-y-6">
          <ImagePanel next={A} images={images} />
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Thông tin bài</h2>
            <PostForm action={A} className="mt-3 space-y-3">
              <input type="hidden" name="_action" value="info" />
              <Field label="Tên bài" name="title" required defaultValue={lesson.title} maxLength={200} />
              <TextArea label="Tóm tắt" name="summary" defaultValue={lesson.summary} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Số tiết" name="periods" type="number" min={0} max={20} defaultValue={lesson.periods} />
                <Field label="Thời lượng (phút)" name="minutes" type="number" min={0} max={600} defaultValue={lesson.estimatedMinutes} />
              </div>
              <Select label="Trạng thái" name="status" defaultValue={lesson.status} options={STATUS_OPTIONS} />
              <Button variant="secondary">Lưu thông tin</Button>
            </PostForm>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Bản đồ kiến thức của bài</h2>
            <PostForm action={A} className="mt-3 space-y-3">
              <input type="hidden" name="_action" value="meta" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Mã bài" name="code" maxLength={20} defaultValue={lesson.code} hint="Ví dụ T8.B12" />
                <Field label="Số thứ tự bài" name="number" type="number" min={1} max={200} defaultValue={lesson.number} />
              </div>
              <Select
                label="Mức độ khó của bài"
                name="difficulty"
                defaultValue={lesson.difficulty ?? ''}
                options={[{ value: '', label: 'Chưa xác định' }, ...([1, 2, 3, 4] as Level[]).map((l) => ({ value: l, label: DIFFICULTY_LABELS[l] }))]}
              />
              <RichInput name="objectives" label="Mục tiêu kiến thức" value={lesson.objectives} />
              <RichInput name="prerequisites" label="Kiến thức nền tảng" value={lesson.prerequisites} />
              <RichInput name="concepts" label="Các khái niệm quan trọng" value={lesson.concepts} />
              <RichInput name="formulas" label="Công thức" value={lesson.formulas} />
              <RichInput name="properties" label="Tính chất" value={lesson.properties} />
              <RichInput name="theorems" label="Định lí" value={lesson.theorems} />
              <RichInput name="applications" label="Ứng dụng thực tế" value={lesson.applications} />
              <Select label="Đối chiếu với SGK" name="verify_status" defaultValue={lesson.verifyStatus} options={VERIFY_OPTIONS} />
              <TextArea label="Ghi chú đối chiếu" name="verify_note" defaultValue={lesson.verifyNote} rows={2} />
              <Button variant="secondary">Lưu bản đồ kiến thức</Button>
            </PostForm>
          </Panel>
        </div>
      </div>
    </>,
  );
}

export async function lessonEditorAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const lessonId = intParam(ctx, 'id');
  const lesson = await getLessonById(ctx.db, lessonId);
  if (!lesson) throw new HttpError(404);
  const form = await ctx.form();
  const back = `/giao-vien/bai-hoc/${lessonId}`;
  const touch = () => ctx.db.exec(sql`update lessons set updated_at = now(), updated_by = ${user.id} where id = ${lessonId}`);
  const action = form.str('_action');
  const dir = form.int('dir') === -1 ? -1 : 1;
  const topicOfLesson = async () => {
    const id = form.int('topic_id');
    if (!id || !(await ctx.db.one(sql`select 1 from topics where id = ${id} and lesson_id = ${lessonId}`))) throw new HttpError(404);
    return id;
  };

  try {
    if (action === 'info') {
      const title = form.str('title', 200);
      if (!title) return lessonEditorPage(ctx, ['Tên bài không được để trống.']);
      const periods = form.int('periods');
      const minutes = form.int('minutes');
      if ((periods !== null && (periods < 0 || periods > 20)) || (minutes !== null && (minutes < 0 || minutes > 600))) return lessonEditorPage(ctx, ['Số tiết từ 0–20, thời lượng từ 0–600 phút.']);
      await ctx.db.exec(sql`
        update lessons set title = ${title}, summary = ${form.text('summary', 1000).trim() || null}, periods = ${periods}, estimated_minutes = ${minutes},
          status = ${form.str('status') === 'draft' ? 'draft' : 'published'}, updated_at = now(), updated_by = ${user.id}
        where id = ${lessonId}`);
      return redirect(back, { type: 'success', message: 'Đã lưu thông tin bài.' }, ctx);
    }

    if (action === 'meta') {
      const code = form.str('code', 20).toUpperCase() || null;
      const difficulty = form.int('difficulty');
      const m = {
        code,
        number: form.int('number'),
        difficulty: difficulty && difficulty >= 1 && difficulty <= 4 ? (difficulty as Level) : null,
        objectives: nullable(form.text('objectives', 8000)),
        prerequisites: nullable(form.text('prerequisites', 8000)),
        concepts: nullable(form.text('concepts', 8000)),
        formulas: nullable(form.text('formulas', 8000)),
        properties: nullable(form.text('properties', 8000)),
        theorems: nullable(form.text('theorems', 8000)),
        verifyStatus: verify(form.str('verify_status')),
        verifyNote: nullable(form.text('verify_note', 2000)),
      };
      const errors: string[] = [];
      if (code && !/^[A-Z0-9.-]{1,20}$/.test(code)) errors.push('Mã bài chỉ gồm chữ in hoa không dấu, chữ số, dấu chấm và gạch nối.');
      errors.push(
        ...mathErrors([
          ['Mục tiêu', m.objectives],
          ['Kiến thức nền tảng', m.prerequisites],
          ['Khái niệm', m.concepts],
          ['Công thức', m.formulas],
          ['Tính chất', m.properties],
          ['Định lí', m.theorems],
        ]),
      );
      if (errors.length) return lessonEditorPage(ctx, errors);
      const applications = nullable(form.text('applications', 8000));
      const appErrors = findMathErrors(applications ?? '').map((e) => 'Ứng dụng thực tế: ' + e);
      if (appErrors.length) return lessonEditorPage(ctx, appErrors);
      await updateLessonMeta(ctx.db, lessonId, m, user.id);
      await ctx.db.exec(sql`update lessons set applications = ${applications} where id = ${lessonId}`);
      return redirect(back, { type: 'success', message: 'Đã lưu bản đồ kiến thức của bài.' }, ctx);
    }

    const formulaRes = await handleFormulaAction(ctx, lessonId, form, back, (errs) => lessonEditorPage(ctx, errs));
    if (formulaRes) {
      await touch();
      return formulaRes;
    }

    if (action === 'add-section' || action === 'update-section') {
      const kind = form.str('kind');
      const body = form.text('body', 20000).trim();
      const solution = form.text('solution', 20000).trim();
      const formula = form.text('formula', 4000).trim();
      const example = form.text('example', 8000).trim();
      const st = form.str('status') === 'draft' ? 'draft' : 'published';
      const errors: string[] = [];
      if (!(SECTION_KINDS as readonly string[]).includes(kind)) errors.push('Loại mục không hợp lệ.');
      if (!body) errors.push('Nội dung không được để trống.');
      if (/\\\(|\\\[/.test(formula)) errors.push('Ô công thức nổi bật chỉ nhập mã TeX, không kèm \\( \\) hay \\[ \\].');
      errors.push(
        ...findMathErrors(body),
        ...findMathErrors(solution).map((e) => 'Lời giải: ' + e),
        ...(formula ? findMathErrors(`\\[${formula}\\]`).map((e) => 'Công thức: ' + e) : []),
        ...findMathErrors(example).map((e) => 'Ví dụ: ' + e),
      );
      if (errors.length) return lessonEditorPage(ctx, errors);
      if (action === 'add-section') {
        await ctx.db.exec(sql`
          insert into lesson_sections (lesson_id, kind, title, body, solution, formula, example, status, sort_order)
          values (${lessonId}, ${kind}, ${form.str('title', 200) || null}, ${body}, ${solution || null}, ${formula || null}, ${example || null}, ${st},
            (select coalesce(max(sort_order), 0) + 1 from lesson_sections where lesson_id = ${lessonId}))`);
      } else {
        const n = await ctx.db.exec(sql`
          update lesson_sections set kind = ${kind}, title = ${form.str('title', 200) || null}, body = ${body}, solution = ${solution || null},
            formula = ${formula || null}, example = ${example || null}, status = ${st}, updated_at = now()
          where id = ${form.int('section_id')} and lesson_id = ${lessonId}`);
        if (!n) throw new HttpError(404);
      }
      await touch();
      return redirect(back, { type: 'success', message: action === 'add-section' ? 'Đã thêm mục nội dung.' : 'Đã lưu mục nội dung.' }, ctx);
    }

    if (action === 'section-status') {
      await ctx.db.exec(sql`update lesson_sections set status = ${form.str('status') === 'draft' ? 'draft' : 'published'}, updated_at = now() where id = ${form.int('section_id')} and lesson_id = ${lessonId}`);
      await touch();
      return redirect(back, { type: 'success', message: form.str('status') === 'draft' ? 'Đã ẩn mục nội dung.' : 'Đã xuất bản mục nội dung.' }, ctx);
    }

    if (action === 'delete-section') {
      await ctx.db.exec(sql`delete from lesson_sections where id = ${form.int('section_id')} and lesson_id = ${lessonId}`);
      await touch();
      return redirect(back, { type: 'success', message: 'Đã xóa mục nội dung.' }, ctx);
    }

    if (action === 'move-section') {
      const id = form.int('section_id');
      await ctx.db.tx(async (t) => {
        const rows = await t.many<{ id: number }>(sql`select id from lesson_sections where lesson_id = ${lessonId} order by sort_order, id`);
        const i = rows.findIndex((r) => r.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= rows.length) return;
        [rows[i], rows[j]] = [rows[j], rows[i]];
        for (const [k, r] of rows.entries()) await t.exec(sql`update lesson_sections set sort_order = ${k + 1} where id = ${r.id}`);
      });
      await touch();
      return redirect(back);
    }

    if (action === 'add-theme' || action === 'update-theme') {
      const title = form.str('title', 300);
      if (!title) return lessonEditorPage(ctx, ['Tên chủ đề không được để trống.']);
      const description = nullable(form.text('description', 2000));
      if (action === 'add-theme') await createTheme(ctx.db, lessonId, title, description, 'published');
      else await updateTheme(ctx.db, lessonId, form.int('theme_id') ?? 0, title, description, form.str('status'));
      await touch();
      return redirect(back, { type: 'success', message: 'Đã lưu chủ đề.' }, ctx);
    }
    if (action === 'delete-theme') {
      await deleteTheme(ctx.db, lessonId, form.int('theme_id') ?? 0);
      await touch();
      return redirect(back, { type: 'success', message: 'Đã xóa chủ đề; các dạng toán của chủ đề vẫn được giữ.' }, ctx);
    }
    if (action === 'move-theme') {
      await moveTheme(ctx.db, lessonId, form.int('theme_id') ?? 0, dir);
      return redirect(back);
    }

    if (action === 'add-topic') {
      const title = form.str('title', 200);
      if (!title) return lessonEditorPage(ctx, ['Tên dạng toán không được để trống.']);
      const id = await createTopic(ctx.db, lessonId, form.int('theme_id'), title, user.id);
      await touch();
      return redirect(`/giao-vien/dang-toan/${id}`, { type: 'success', message: 'Đã thêm dạng toán (đang ẩn). Soạn nội dung rồi chọn "Xuất bản".' }, ctx);
    }
    if (action === 'move-topic') {
      await moveTopic(ctx.db, await topicOfLesson(), dir);
      return redirect(back);
    }
    if (action === 'topic-status') {
      await setTopicStatus(ctx.db, await topicOfLesson(), form.str('status'), user.id);
      return redirect(back, { type: 'success', message: form.str('status') === 'draft' ? 'Đã ẩn dạng toán.' : 'Đã xuất bản dạng toán.' }, ctx);
    }
  } catch (err) {
    if (err instanceof ContentError) return lessonEditorPage(ctx, [err.message]);
    throw err;
  }
  throw new HttpError(400, 'Thao tác không hợp lệ.');
}

// ---------------- /giao-vien/dang-toan/:id ----------------

export async function topicEditorPage(ctx: Ctx, errors?: string[]): Promise<Res> {
  requireTeacher(ctx);
  const topic = await getTopicById(ctx.db, intParam(ctx, 'id'));
  if (!topic) throw new HttpError(404, 'Không tìm thấy dạng toán.');
  const lesson = await getLessonById(ctx.db, topic.lessonId);
  const book = await ctx.db.one<{ slug: string }>(sql`select slug from textbooks where id = ${lesson!.textbookId}`);
  const themes = (await getLessonThemes(ctx.db, lesson!.textbookId, lesson!.id, true)).filter((th) => th.id);
  const [counts, examples, images] = await Promise.all([getTopicQuestionCounts(ctx.db, topic.id), loadExamples(ctx, topic.id), recentImages(ctx, 6)]);
  const A = `/giao-vien/dang-toan/${topic.id}`;
  const label = lessonLabel(lesson!);
  return page(
    ctx,
    { title: `Dạng toán: ${topic.title}`, layout: 'dashboard', section: 'curriculum', status: errors ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/chuong-trinh', label: 'Chương trình & bài học' }, { href: `/giao-vien/bai-hoc/${lesson!.id}`, label }, { label: topic.title }]}
        title={topic.title}
        sub={`${topic.code ?? 'Chưa có mã'} · ${label}`}
        actions={
          <>
            <a href={`/hoc/${book!.slug}/bai/${lesson!.slug}/dang/${topicKey(topic)}`} className={buttonClass('secondary', 'md')}>
              Xem như học sinh
            </a>
            <a href={`/giao-vien/cau-hoi?dang=${topic.id}`} className={buttonClass('quiet', 'md')}>
              Câu hỏi của dạng ({counts.total})
            </a>
          </>
        }
      />
      <ErrorList errors={errors} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <PostForm action={A} className="min-w-0 space-y-6">
          <input type="hidden" name="_action" value="save" />
          <Panel className="grid gap-4 p-5 md:grid-cols-2">
            <Field className="md:col-span-2" label="Tên dạng toán" name="title" required maxLength={200} defaultValue={topic.title} />
            <Select label="Thuộc chủ đề" name="theme_id" defaultValue={topic.themeId ?? ''} options={[...themes.map((th) => ({ value: th.id, label: th.title })), { value: '', label: 'Chưa xếp chủ đề' }]} />
            <Select label="Trạng thái" name="status" defaultValue={topic.status} options={STATUS_OPTIONS} />
            <Field label="Đường dẫn (slug)" name="slug" maxLength={80} defaultValue={topic.slug ?? ''} hint="Bỏ trống để tạo tự động từ tên." />
            <fieldset>
              <legend className="mb-1.5 text-sm font-semibold text-ink-2">Mức độ phù hợp</legend>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {([1, 2, 3, 4] as Level[]).map((l) => (
                  <Checkbox key={l} name="levels" value={String(l)} label={LEVEL_LABELS[l]} defaultChecked={topic.levels.includes(l)} />
                ))}
              </div>
            </fieldset>
          </Panel>
          <Panel className="space-y-4 p-5">
            <RichInput name="knowledge" label="Kiến thức sử dụng" value={topic.knowledge} />
            <RichInput name="signs" label="Dấu hiệu nhận biết" value={topic.signs} />
            <RichInput name="method" label="Phương pháp giải" value={topic.method} />
            <RichInput name="steps" label="Các bước giải" value={topic.steps} rows={5} hint='Mỗi bước một dòng, bắt đầu bằng "- ", ví dụ: - **Bước 1.** …' />
            <RichInput name="mistakes" label="Lỗi sai thường gặp" value={topic.mistakes} rows={4} />
            <RichInput name="example" label="Ví dụ minh họa (đề bài)" value={topic.example} rows={4} />
            <RichInput name="example_solution" label="Lời giải ví dụ" value={topic.exampleSolution} rows={5} />
          </Panel>
          <Button>Lưu dạng toán</Button>
        </PostForm>
        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Bài tập của dạng</h2>
            <QuestionCoverage byType={counts.byType} byLevel={counts.byLevel} levels={topic.levels} />
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`/giao-vien/cau-hoi/moi?loai=mcq&dang=${topic.id}`} className={buttonClass('primary', 'sm')}>
                Thêm câu hỏi
              </a>
              <a href="/giao-vien/cau-hoi/nhap" className={buttonClass('secondary', 'sm')}>
                Nhập hàng loạt
              </a>
            </div>
            <p className="mt-3 text-[13px] text-ink-3">Mã dạng để dùng khi nhập câu hỏi hàng loạt: <strong>{topic.code ?? `#${topic.id}`}</strong></p>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Xóa dạng toán</h2>
            <p className="mt-1 text-[14px] text-ink-2">Câu hỏi của dạng vẫn được giữ trong ngân hàng câu hỏi (chỉ bỏ liên kết với dạng).</p>
            <PostForm action={A} className="mt-3" confirm="Xóa dạng toán này?">
              <input type="hidden" name="_action" value="delete" />
              <button className={buttonClass('ghost', 'sm', 'text-le hover:bg-le-soft')}>Xóa dạng toán</button>
            </PostForm>
          </Panel>
          <ImagePanel next={A} images={images} />
        </div>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <ExamplePanel action={A} examples={examples} levels={topic.levels} notes={topic.notes ?? null} />
        </div>
      </div>
    </>,
  );
}

export async function topicEditorAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const topicId = intParam(ctx, 'id');
  const topic = await getTopicById(ctx.db, topicId);
  if (!topic) throw new HttpError(404);
  const form = await ctx.form();
  const exampleRes = await handleExampleAction(ctx, topicId, form, `/giao-vien/dang-toan/${topicId}`, (errs) => topicEditorPage(ctx, errs));
  if (exampleRes) return exampleRes;
  if (form.str('_action') === 'delete') {
    await deleteTopic(ctx.db, topicId);
    return redirect(`/giao-vien/bai-hoc/${topic.lessonId}`, { type: 'success', message: 'Đã xóa dạng toán.' }, ctx);
  }
  const u = {
    themeId: form.int('theme_id'),
    title: form.str('title', 200),
    slug: form.str('slug', 80),
    levels: [...new Set(form.all('levels').map(Number))].filter((n) => n >= 1 && n <= 4).sort() as Level[],
    status: form.str('status') === 'draft' ? ('draft' as const) : ('published' as const),
    knowledge: nullable(form.text('knowledge', 8000)),
    signs: nullable(form.text('signs', 8000)),
    method: nullable(form.text('method', 8000)),
    steps: nullable(form.text('steps', 8000)),
    mistakes: nullable(form.text('mistakes', 8000)),
    example: nullable(form.text('example', 8000)),
    exampleSolution: nullable(form.text('example_solution', 8000)),
  };
  const errors: string[] = [];
  if (!u.title) errors.push('Tên dạng toán không được để trống.');
  errors.push(
    ...mathErrors([
      ['Kiến thức', u.knowledge],
      ['Dấu hiệu', u.signs],
      ['Phương pháp', u.method],
      ['Các bước', u.steps],
      ['Lỗi sai', u.mistakes],
      ['Ví dụ', u.example],
      ['Lời giải ví dụ', u.exampleSolution],
    ]),
  );
  if (errors.length) return topicEditorPage(ctx, errors);
  try {
    await updateTopic(ctx.db, topicId, u, user.id);
  } catch (err) {
    if (err instanceof ContentError) return topicEditorPage(ctx, [err.message]);
    throw err;
  }
  return redirect(`/giao-vien/dang-toan/${topicId}`, { type: 'success', message: 'Đã lưu dạng toán.' }, ctx);
}
