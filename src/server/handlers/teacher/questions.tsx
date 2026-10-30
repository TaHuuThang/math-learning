import { HttpError, redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { sql } from '../../db';
import { intParam, paging, queryString, requireBook } from '../common';
import { lessonLabel, lessonOptions, topicOptions } from '../../../domain/curriculum';
import {
  canEditQuestion,
  deleteQuestion,
  duplicateQuestion,
  emptyQuestionInput,
  getQuestion,
  listQuestions,
  parseQuestionForm,
  questionToInput,
  revealAnswer,
  saveQuestion,
  toView,
  type QuestionInput,
} from '../../../domain/questions';
import { Island } from '../../../ui/Island';
import { Badge, Button, EmptyState, ErrorList, Field, Html, Notice, PageTitle, Pager, Panel, PostForm, Select, buttonClass, cx } from '../../../ui/components/ui';
import { LEVEL_LABELS, STATUS_LABELS, TYPE_LABELS, TYPE_SHORT, formatDate } from '../../../shared/labels';
import { QUESTION_TYPES, type QuestionType } from '../../../shared/grading';
import { plainExcerpt, renderRich, renderRichInline } from '../../../shared/richtext';
import { figureToSvg } from '../../../shared/figure';
import { AnswerInput, QuestionBody } from '../../../islands/shared';

const PER_PAGE = 30;

export async function questionBankPage(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const f = {
    lessonId: Number(ctx.query.get('bai')) || null,
    type: ctx.query.get('loai') || null,
    level: Number(ctx.query.get('muc')) || null,
    status: ctx.query.get('trang-thai') || null,
    mine: ctx.query.get('cua-toi') === '1',
    search: ctx.query.get('q')?.slice(0, 80) || null,
    topicId: Number(ctx.query.get('dang')) || null,
  };
  const pg = paging(ctx, PER_PAGE);
  const { rows, total } = await listQuestions(
    ctx.db,
    { textbookId: book.id, lessonId: f.lessonId, type: f.type, level: f.level, status: f.status, mineOf: f.mine ? user.id : null, search: f.search, topicId: f.topicId },
    pg.limit,
    pg.offset,
  );
  const lessons = await lessonOptions(ctx.db, book.id);
  const qs = queryString({ bai: f.lessonId, dang: f.topicId, loai: f.type, muc: f.level, 'trang-thai': f.status, 'cua-toi': f.mine ? 1 : null, q: f.search });
  return page(
    ctx,
    { title: 'Ngân hàng câu hỏi', layout: 'dashboard', section: 'questions' },
    <>
      <PageTitle
        title="Ngân hàng câu hỏi"
        sub={`${total} câu hỏi phù hợp. Câu đã xuất bản xuất hiện trong luyện tập của học sinh và có thể đưa vào đề kiểm tra.`}
        actions={
          <>
          <a href="/giao-vien/cau-hoi/nhap" className={buttonClass('secondary', 'md')}>
            Nhập hàng loạt từ Excel
          </a>
          <details className="relative" data-menu>
            <summary className={buttonClass('primary', 'md')}>Tạo câu hỏi</summary>
            <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-lg">
              {QUESTION_TYPES.map((t) => (
                <a key={t} href={`/giao-vien/cau-hoi/moi?loai=${t}${f.lessonId ? `&bai=${f.lessonId}` : ''}${f.topicId ? `&dang=${f.topicId}` : ''}`} className="block rounded-lg px-3 py-2 text-[15px] hover:bg-tim-50">
                  {TYPE_LABELS[t]}
                </a>
              ))}
            </div>
          </details>
          </>
        }
      />
      {f.topicId && (
        <Notice tone="info" className="mb-4">
          Đang lọc theo một dạng toán.{' '}
          <a className="font-semibold underline" href={`/giao-vien/cau-hoi${queryString({ bai: f.lessonId, loai: f.type, muc: f.level, 'trang-thai': f.status, q: f.search })}`}>
            Bỏ lọc dạng toán
          </a>
        </Notice>
      )}
      <form method="get" className="mb-5 grid gap-3 rounded-[18px] border border-line bg-white p-4 md:grid-cols-[2fr_1.2fr_1fr_1fr_1.4fr_auto]">
        {f.topicId && <input type="hidden" name="dang" value={f.topicId} />}
        <Select label="Bài học" name="bai" defaultValue={f.lessonId ?? ''} autoSubmit options={[{ value: '', label: 'Tất cả bài' }, ...lessons.map((l) => ({ value: l.id, label: l.label, group: l.chapter }))]} />
        <Select label="Hình thức" name="loai" defaultValue={f.type ?? ''} autoSubmit options={[{ value: '', label: 'Tất cả' }, ...QUESTION_TYPES.map((t) => ({ value: t, label: TYPE_SHORT[t] }))]} />
        <Select label="Mức độ" name="muc" defaultValue={f.level ?? ''} autoSubmit options={[{ value: '', label: 'Tất cả' }, ...[1, 2, 3, 4].map((l) => ({ value: l, label: LEVEL_LABELS[l] }))]} />
        <Select
          label="Trạng thái"
          name="trang-thai"
          defaultValue={f.status ?? ''}
          autoSubmit
          options={[{ value: '', label: 'Đang dùng' }, { value: 'published', label: 'Đã xuất bản' }, { value: 'draft', label: 'Bản nháp' }, { value: 'archived', label: 'Lưu trữ' }]}
        />
        <Field label="Tìm trong nội dung" name="q" defaultValue={f.search ?? ''} />
        <div className="flex items-end gap-3 pb-1">
          <label className="flex items-center gap-2 text-[14px]">
            <input type="checkbox" name="cua-toi" value="1" defaultChecked={f.mine} className="h-4 w-4 accent-[#3b2a8c]" /> Của tôi
          </label>
          <button className={buttonClass('secondary', 'md')}>Lọc</button>
        </div>
      </form>
      {rows.length ? (
        <Panel className="overflow-x-auto">
          <table className="data-table min-w-[900px]">
            <thead>
              <tr>
                <th className="w-14">Mã</th>
                <th>Nội dung</th>
                <th className="w-48">Bài</th>
                <th className="w-28">Mức độ</th>
                <th className="w-24">Tỉ lệ đúng</th>
                <th className="w-28">Trạng thái</th>
                <th className="w-44" />
              </tr>
            </thead>
            <tbody>
              {rows.map((q) => (
                <tr key={q.id}>
                  <td className="font-mono text-[13px] text-ink-3">#{q.id}</td>
                  <td>
                    <Badge className="mb-1">{TYPE_SHORT[q.type]}</Badge>
                    <div className="text-[14px]">{plainExcerpt(q.stem, 120)}</div>
                    <div className="mt-0.5 text-[12px] text-ink-3">{q.createdByName ? `${q.createdByName} · ` : q.source ? `${q.source} · ` : ''}sửa {formatDate(q.updatedAt)}</div>
                  </td>
                  <td className="text-[13px]">{q.lessonTitle ? lessonLabel({ kind: q.lessonKind ?? 'lesson', number: q.lessonNumber, title: q.lessonTitle }) : '–'}</td>
                  <td className="text-[13px]">{LEVEL_LABELS[q.level]}</td>
                  <td className="text-[13px]">{q.correctRate === null ? '–' : `${q.correctRate}% (${q.responses})`}</td>
                  <td>
                    <Badge tone={q.status === 'published' ? 'tre' : 'gray'}>{STATUS_LABELS[q.status]}</Badge>
                  </td>
                  <td className="whitespace-nowrap text-right">
                    <a href={`/giao-vien/cau-hoi/${q.id}/xem`} className={buttonClass('quiet', 'sm')}>
                      Xem
                    </a>{' '}
                    {canEditQuestion(q, user) ? (
                      <a href={`/giao-vien/cau-hoi/${q.id}`} className={buttonClass('quiet', 'sm')}>
                        Sửa
                      </a>
                    ) : (
                      <PostForm action={`/giao-vien/cau-hoi/${q.id}/nhan-ban`} className="inline">
                        <button className={buttonClass('quiet', 'sm')}>Nhân bản</button>
                      </PostForm>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      ) : (
        <EmptyState title="Không có câu hỏi phù hợp">Đổi bộ lọc hoặc tạo câu hỏi mới.</EmptyState>
      )}
      <Pager page={pg.page} pages={pg.pages(total)} base={`/giao-vien/cau-hoi${qs}`} />
    </>,
  );
}

async function editorPage(ctx: Ctx, opts: { id: number | null; input: QuestionInput; errors?: string[]; status?: number }): Promise<Res> {
  const book = await requireBook(ctx);
  const [lessons, topics] = await Promise.all([lessonOptions(ctx.db, book.id), topicOptions(ctx.db, book.id)]);
  const { input } = opts;
  const t = input.type;
  const title = opts.id ? `Sửa câu hỏi #${opts.id}` : `Câu hỏi mới: ${TYPE_LABELS[t]}`;
  const figure = input.figure ? figureToSvg(input.figure) : { svg: '', errors: [] };
  const action = opts.id ? `/giao-vien/cau-hoi/${opts.id}` : '/giao-vien/cau-hoi/moi';
  return page(
    ctx,
    { title, layout: 'dashboard', section: 'questions', status: opts.status ?? 200 },
    <>
      <PageTitle crumbs={[{ href: '/giao-vien/cau-hoi', label: 'Ngân hàng câu hỏi' }, { label: opts.id ? `#${opts.id}` : 'Câu mới' }]} title={title} sub={TYPE_LABELS[t]} />
      <ErrorList errors={opts.errors} />
      <PostForm action={action} className="space-y-6">
        <input type="hidden" name="type" value={t} />
        <Panel className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
          <Select
            className="xl:col-span-2"
            label="Bài học"
            name="lesson_id"
            required
            defaultValue={input.lessonId ?? ''}
            options={[{ value: '', label: 'Chọn bài học' }, ...lessons.map((l) => ({ value: l.id, label: l.label, group: l.chapter }))]}
          />
          <Select
            className="xl:col-span-3"
            label="Dạng toán (không bắt buộc)"
            name="topic_id"
            defaultValue={input.topicId ?? ''}
            hint="Dạng toán phải thuộc bài học đã chọn."
            options={[{ value: '', label: 'Không chọn' }, ...topics.map((tp) => ({ value: tp.id, label: tp.label, group: tp.lesson }))]}
          />
          <Select label="Mức độ" name="level" defaultValue={input.level} options={[1, 2, 3, 4].map((l) => ({ value: l, label: LEVEL_LABELS[l] }))} />
          <Field label="Điểm mặc định" name="points" type="number" step="0.25" min="0.25" max="100" defaultValue={input.points} />
          <Select label="Trạng thái" name="status" defaultValue={input.status} options={[{ value: 'published', label: 'Xuất bản' }, { value: 'draft', label: 'Bản nháp' }]} />
        </Panel>

        <Panel className="space-y-5 p-5">
          <Island name="RichField" props={{ name: 'stem', label: 'Đề bài', defaultValue: input.stem, initialHtml: input.stem ? renderRich(input.stem) : '', rows: 5, required: true }} />

          {t === 'mcq' && (
            <fieldset className="space-y-4">
              <legend className="mb-2 text-sm font-semibold text-ink-2">Bốn phương án – chọn phương án đúng</legend>
              {['A', 'B', 'C', 'D'].map((l, i) => (
                <div key={l} className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)]">
                  <label className={cx('flex h-fit items-center gap-2 rounded-xl border-2 px-3 py-2 font-bold', 'border-line')}>
                    <input type="radio" name="correct" value={l} defaultChecked={input.correct === l} className="h-4 w-4 accent-[#18875c]" required /> Đúng: {l}
                  </label>
                  <Island name="RichField" props={{ name: `option_${l}`, label: `Phương án ${l}`, defaultValue: input.options[i], initialHtml: input.options[i] ? renderRichInline(input.options[i]) : '', rows: 2, inline: true }} />
                </div>
              ))}
            </fieldset>
          )}

          {t === 'true_false' && (
            <fieldset className="space-y-4">
              <legend className="mb-2 text-sm font-semibold text-ink-2">Bốn ý a, b, c, d – chọn Đúng/Sai cho từng ý</legend>
              {['a', 'b', 'c', 'd'].map((l, i) => (
                <div key={l} className="grid gap-3 md:grid-cols-[150px_minmax(0,1fr)]">
                  <div className="flex h-fit flex-col gap-1.5 rounded-xl border border-line p-2.5 text-[14px]">
                    <span className="font-bold">Ý {l})</span>
                    <label className="flex items-center gap-2">
                      <input type="radio" name={`tf_${l}`} value="true" defaultChecked={input.statements[i].value === true} className="accent-[#18875c]" /> Đúng
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name={`tf_${l}`} value="false" defaultChecked={input.statements[i].value === false} className="accent-[#e5484d]" /> Sai
                    </label>
                  </div>
                  <Island
                    name="RichField"
                    props={{ name: `stmt_${l}`, label: `Nội dung ý ${l})`, defaultValue: input.statements[i].text, initialHtml: input.statements[i].text ? renderRichInline(input.statements[i].text) : '', rows: 2, inline: true }}
                  />
                </div>
              ))}
            </fieldset>
          )}

          {t === 'short_answer' && (
            <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
              <div>
                <label htmlFor="f-accepted" className="mb-1.5 block text-sm font-semibold text-ink-2">
                  Đáp án được chấp nhận <span className="text-le">*</span>
                </label>
                <textarea
                  id="f-accepted"
                  name="accepted"
                  rows={3}
                  defaultValue={input.accepted.join('\n')}
                  className="w-full rounded-xl border border-line-2 px-3.5 py-2.5 font-mono text-[14px] focus:border-tim-500 focus:outline-none"
                />
                <p className="mt-1 text-[13px] text-ink-3">Mỗi dòng một đáp án. Số được so sánh theo giá trị: 0,5 = 0.5 = 1/2.</p>
              </div>
              <Field label="Sai số cho phép" name="tolerance" type="number" step="any" min="0" defaultValue={input.tolerance} hint="0 = phải đúng tuyệt đối." />
              <Field label="Đơn vị (không bắt buộc)" name="unit" defaultValue={input.unit} maxLength={20} hint="VD: cm, °" />
            </div>
          )}

          {(t === 'essay' || t === 'geometry_essay') && (
            <Notice tone="info">Câu tự luận do giáo viên chấm. Lời giải bên dưới hiển thị cho học sinh sau khi nộp và dùng làm hướng dẫn chấm.</Notice>
          )}

          <Island name="FigureField" props={{ name: 'figure', defaultValue: input.figure, initialSvg: figure.svg, required: t === 'geometry_essay' }} />
        </Panel>

        <Panel className="space-y-5 p-5">
          <Island name="RichField" props={{ name: 'solution', label: 'Lời giải / hướng dẫn chấm', defaultValue: input.solution, initialHtml: input.solution ? renderRich(input.solution) : '', rows: 5 }} />
          <Island name="RichField" props={{ name: 'hint', label: 'Gợi ý (hiện khi học sinh bấm "Xem gợi ý")', defaultValue: input.hint, initialHtml: input.hint ? renderRich(input.hint) : '', rows: 2 }} />
        </Panel>

        <div className="flex flex-wrap gap-3">
          <Button size="lg">Lưu câu hỏi</Button>
          {!opts.id && (
            <Button size="lg" variant="secondary" name="_next" value="new">
              Lưu và tạo câu tiếp
            </Button>
          )}
          <a href="/giao-vien/cau-hoi" className={buttonClass('ghost', 'lg')}>
            Hủy
          </a>
        </div>
      </PostForm>
      {opts.id && (
        <PostForm action={`/giao-vien/cau-hoi/${opts.id}/xoa`} className="mt-8 border-t border-line pt-6" confirm="Xóa câu hỏi này? Nếu câu đã có bài làm hoặc nằm trong đề, câu sẽ được chuyển vào lưu trữ.">
          <Button variant="danger">Xóa câu hỏi</Button>
        </PostForm>
      )}
    </>,
  );
}

export async function newQuestionPage(ctx: Ctx): Promise<Res> {
  requireTeacher(ctx);
  const type = (ctx.query.get('loai') ?? 'mcq') as QuestionType;
  if (!QUESTION_TYPES.includes(type)) throw new HttpError(404);
  const input = emptyQuestionInput(type);
  input.lessonId = Number(ctx.query.get('bai')) || null;
  const dang = Number(ctx.query.get('dang')) || null;
  if (dang) {
    const tp = await ctx.db.one<{ lessonId: number }>(sql`select lesson_id from topics where id = ${dang}`);
    if (tp) {
      input.topicId = dang;
      input.lessonId = tp.lessonId;
    }
  }
  return editorPage(ctx, { id: null, input });
}

export async function createQuestionAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const form = await ctx.form();
  const { input, errors } = parseQuestionForm(form);
  if (errors.length) return editorPage(ctx, { id: null, input, errors, status: 422 });
  const res = await saveQuestion(ctx.db, null, book.id, input, user.id);
  if (res.error) return editorPage(ctx, { id: null, input, errors: [res.error], status: 422 });
  if (form.str('_next') === 'new') {
    return redirect(`/giao-vien/cau-hoi/moi?loai=${input.type}&bai=${input.lessonId}${input.topicId ? `&dang=${input.topicId}` : ''}`, { type: 'success', message: `Đã lưu câu hỏi #${res.id}. Soạn câu tiếp theo.` }, ctx);
  }
  return redirect(`/giao-vien/cau-hoi/${res.id}/xem`, { type: 'success', message: `Đã lưu câu hỏi #${res.id}.` }, ctx);
}

async function loadEditable(ctx: Ctx) {
  const user = requireTeacher(ctx);
  const q = await getQuestion(ctx.db, intParam(ctx, 'id'));
  if (!q) throw new HttpError(404, 'Không tìm thấy câu hỏi.');
  if (!canEditQuestion(q, user)) throw new HttpError(403, 'Câu hỏi do giáo viên khác soạn. Hãy dùng "Nhân bản" để tạo bản của mình.');
  return { user, q };
}

export async function editQuestionPage(ctx: Ctx): Promise<Res> {
  const { q } = await loadEditable(ctx);
  return editorPage(ctx, { id: q.id, input: questionToInput(q) });
}

export async function updateQuestionAction(ctx: Ctx): Promise<Res> {
  const { user, q } = await loadEditable(ctx);
  const form = await ctx.form();
  const { input, errors } = parseQuestionForm(form);
  input.type = q.type; // không đổi hình thức sau khi tạo
  if (errors.length) return editorPage(ctx, { id: q.id, input, errors, status: 422 });
  const res = await saveQuestion(ctx.db, q.id, q.textbookId, input, user.id);
  if (res.error) return editorPage(ctx, { id: q.id, input, errors: [res.error], status: 422 });
  return redirect(`/giao-vien/cau-hoi/${q.id}/xem`, { type: 'success', message: 'Đã lưu thay đổi.' }, ctx);
}

export async function deleteQuestionAction(ctx: Ctx): Promise<Res> {
  const { q } = await loadEditable(ctx);
  const result = await deleteQuestion(ctx.db, q.id);
  return redirect(
    '/giao-vien/cau-hoi',
    { type: 'success', message: result === 'deleted' ? `Đã xóa câu hỏi #${q.id}.` : `Câu hỏi #${q.id} đã có bài làm hoặc nằm trong đề nên được chuyển vào lưu trữ.` },
    ctx,
  );
}

export async function duplicateQuestionAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const id = await duplicateQuestion(ctx.db, intParam(ctx, 'id'), user.id);
  if (!id) throw new HttpError(404);
  return redirect(`/giao-vien/cau-hoi/${id}`, { type: 'success', message: `Đã tạo bản sao #${id} (bản nháp).` }, ctx);
}

export async function previewQuestionPage(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const q = await getQuestion(ctx.db, intParam(ctx, 'id'));
  if (!q) throw new HttpError(404);
  const view = toView(q);
  const reveal = revealAnswer(q);
  const value =
    q.type === 'mcq'
      ? { choice: reveal.correctChoice }
      : q.type === 'true_false'
        ? { values: reveal.correctValues }
        : q.type === 'short_answer'
          ? { text: q.answers[0]?.content ?? '' }
          : { text: '' };
  return page(
    ctx,
    { title: `Câu hỏi #${q.id}`, layout: 'dashboard', section: 'questions' },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/cau-hoi', label: 'Ngân hàng câu hỏi' }, { label: `#${q.id}` }]}
        title={`Câu hỏi #${q.id}`}
        sub={`${TYPE_LABELS[q.type]} · ${LEVEL_LABELS[q.level]} · ${q.points} điểm · ${STATUS_LABELS[q.status]}${q.usedInTests ? ` · dùng trong ${q.usedInTests} đề` : ''}`}
        actions={
          <>
            {canEditQuestion(q, user) && (
              <a href={`/giao-vien/cau-hoi/${q.id}`} className={buttonClass('primary', 'md')}>
                Sửa
              </a>
            )}
            <PostForm action={`/giao-vien/cau-hoi/${q.id}/nhan-ban`}>
              <button className={buttonClass('secondary', 'md')}>Nhân bản</button>
            </PostForm>
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Panel className="p-6">
          <div className="mb-3 text-[13px] font-semibold text-ink-3">Học sinh nhìn thấy (đã đánh dấu đáp án đúng)</div>
          <QuestionBody q={view} />
          <div className="mt-5">
            <AnswerInput q={view} value={value} onChange={() => undefined} disabled reveal={reveal} />
          </div>
        </Panel>
        <div className="space-y-4">
          {reveal.solutionHtml && (
            <Panel className="p-5">
              <h2 className="mb-2 font-extrabold">Lời giải</h2>
              <Html html={reveal.solutionHtml} className="prose-math" />
            </Panel>
          )}
          {view.hintHtml && (
            <Panel className="p-5">
              <h2 className="mb-2 font-extrabold">Gợi ý</h2>
              <Html html={view.hintHtml} className="prose-math" />
            </Panel>
          )}
          <Panel className="p-5 text-[14px] text-ink-2">
            <div>Tạo bởi: {q.createdByName ?? q.source ?? 'Hệ thống'}</div>
            <div>Ngày tạo: {formatDate(q.createdAt)}</div>
            <div>Sửa lần cuối: {formatDate(q.updatedAt)}</div>
          </Panel>
        </div>
      </div>
    </>,
  );
}
