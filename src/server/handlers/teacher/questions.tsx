import { HttpError, redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { sql } from '../../db';
import { intParam, paging, queryString, requireBook } from '../common';
import { lessonLabel, lessonOptions, topicOptions } from '../../../domain/curriculum';
import {
  approveQuestions,
  canEditQuestion,
  deleteQuestion,
  duplicateQuestion,
  emptyQuestionInput,
  getQuestion,
  listQuestions,
  parseQuestionForm,
  qualityOf,
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
import { MATCH_MODES } from '../../../shared/answer-match';
import { sniffImage } from '../../http/multipart';
import { questionFilters } from './question-filters';

const PER_PAGE = 30;

export async function questionBankPage(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const f = questionFilters(ctx, user.id, book.id);
  const pg = paging(ctx, PER_PAGE);
  const { rows, total } = await listQuestions(ctx.db, f, pg.limit, pg.offset);
  const reviewCount = (await ctx.db.one<{ n: number }>(sql`select count(*)::int as n from questions where textbook_id = ${book.id} and status = 'review'`))?.n ?? 0;
  const reviewMode = f.status === 'review';
  const lessons = await lessonOptions(ctx.db, book.id);
  const qs = queryString({ bai: f.lessonId, dang: f.topicId, loai: f.type, muc: f.level, 'trang-thai': f.status, 'cua-toi': f.mine ? 1 : null, q: f.search, 'canh-bao': f.issues ? 1 : null });
  const exportQs = qs ? qs + '&' : '?';
  return page(
    ctx,
    { title: 'Ngân hàng câu hỏi', layout: 'dashboard', section: 'questions' },
    <>
      <PageTitle
        title="Ngân hàng câu hỏi"
        sub={`${total} câu hỏi phù hợp. Chỉ câu đã xuất bản (đã qua kiểm tra hoặc đã duyệt) mới xuất hiện trong luyện tập và đề kiểm tra.`}
        actions={
          <>
          {reviewCount > 0 && !reviewMode && (
            <a href="/giao-vien/cau-hoi?trang-thai=review" className={buttonClass('secondary', 'md')}>
              Chờ duyệt ({reviewCount})
            </a>
          )}
          <a href="/giao-vien/cau-hoi/nhap" className={buttonClass('secondary', 'md')}>
            Nhập từ Excel
          </a>
          <details className="relative" data-menu>
            <summary className={buttonClass('secondary', 'md')}>Xuất</summary>
            <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-lg">
              <a href={`/giao-vien/cau-hoi/xuat${exportQs}dinh-dang=xlsx`} className="block rounded-lg px-3 py-2 text-[15px] hover:bg-tim-50">
                Excel (.xlsx) – theo bộ lọc
              </a>
              <a href={`/giao-vien/cau-hoi/xuat${exportQs}dinh-dang=csv`} className="block rounded-lg px-3 py-2 text-[15px] hover:bg-tim-50">
                CSV – theo bộ lọc
              </a>
            </div>
          </details>
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
      {reviewMode && (
        <Notice tone="warn" className="mb-4">
          Câu <strong>chờ duyệt</strong> chưa xuất hiện với học sinh. Mở từng câu để xem cảnh báo của bộ kiểm tra, sửa nếu cần, rồi duyệt; hoặc chọn nhiều câu đã kiểm tra và bấm “Duyệt các câu đã chọn”.
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
          options={[
            { value: '', label: 'Đang dùng' },
            { value: 'published', label: 'Đã xuất bản' },
            { value: 'review', label: 'Chờ duyệt' },
            { value: 'draft', label: 'Bản nháp' },
            { value: 'archived', label: 'Lưu trữ' },
          ]}
        />
        <Field label="Tìm trong nội dung" name="q" defaultValue={f.search ?? ''} />
        <div className="flex items-end gap-3 pb-1">
          <label className="flex items-center gap-2 text-[14px]">
            <input type="checkbox" name="cua-toi" value="1" defaultChecked={f.mine} className="h-4 w-4 accent-[#3b2a8c]" /> Của tôi
          </label>
          <label className="flex items-center gap-2 text-[14px]">
            <input type="checkbox" name="canh-bao" value="1" defaultChecked={f.issues} className="h-4 w-4 accent-[#3b2a8c]" /> Có cảnh báo
          </label>
          <button className={buttonClass('secondary', 'md')}>Lọc</button>
        </div>
      </form>
      {rows.length ? (
        <Panel className="overflow-x-auto">
          {reviewMode && (
            <div className="flex items-center gap-3 border-b border-line px-5 py-3">
              <button form="bulk-approve" className={buttonClass('primary', 'sm')}>
                Duyệt các câu đã chọn
              </button>
              <span className="text-[13px] text-ink-3">Chỉ duyệt câu thầy/cô đã đọc kĩ đề, đáp án và lời giải.</span>
            </div>
          )}
          <table className="data-table min-w-[900px]">
            <thead>
              <tr>
                {reviewMode && <th className="w-10" />}
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
                  {reviewMode && (
                    <td>
                      <input type="checkbox" form="bulk-approve" name="ids" value={q.id} aria-label={`Chọn câu #${q.id}`} className="h-4 w-4 accent-[#3b2a8c]" />
                    </td>
                  )}
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
                    <Badge tone={q.status === 'published' ? 'tre' : q.status === 'review' ? 'hl' : 'gray'}>{STATUS_LABELS[q.status]}</Badge>
                    {q.issueCount > 0 && <div className="mt-1 text-[12px] font-semibold text-[#7a5a00]">{q.issueCount} cảnh báo</div>}
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
      {reviewMode && <PostForm id="bulk-approve" action="/giao-vien/cau-hoi/duyet" className="hidden">{null}</PostForm>}
      <Pager page={pg.page} pages={pg.pages(total)} base={`/giao-vien/cau-hoi${qs}`} />
    </>,
  );
}

async function editorPage(ctx: Ctx, opts: { id: number | null; input: QuestionInput; errors?: string[]; status?: number; issues?: string[] }): Promise<Res> {
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
      {opts.issues && opts.issues.length > 0 && (
        <Notice tone="warn" className="mb-4">
          <strong>Bộ kiểm tra chất lượng còn cảnh báo:</strong>
          <ul className="mt-1 list-disc pl-5">
            {opts.issues.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </Notice>
      )}
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
          <Select
            label="Trạng thái"
            name="status"
            defaultValue={input.status}
            options={[
              { value: 'published', label: 'Đưa vào ngân hàng' },
              { value: 'draft', label: 'Bản nháp' },
            ]}
            hint="Câu còn cảnh báo chất lượng sẽ ở trạng thái Chờ duyệt."
          />
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
                  <div className="space-y-2">
                    <Island name="RichField" props={{ name: `option_${l}`, label: `Phương án ${l}`, defaultValue: input.options[i], initialHtml: input.options[i] ? renderRichInline(input.options[i]) : '', rows: 2, inline: true }} />
                    <Island
                      name="RichField"
                      props={{ name: `note_${l}`, label: `Giải thích phương án ${l} (vì sao đúng / sai – lỗi thường gặp)`, defaultValue: input.optionNotes[i], initialHtml: input.optionNotes[i] ? renderRichInline(input.optionNotes[i]) : '', rows: 1, inline: true }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[13px] text-ink-3">Học sinh chọn sai sẽ thấy giải thích của phương án đã chọn. Lời giải không nên nhắc tên phương án (A, B…) vì phương án có thể được đảo thứ tự.</p>
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
                  <div className="space-y-2">
                    <Island
                      name="RichField"
                      props={{ name: `stmt_${l}`, label: `Nội dung ý ${l})`, defaultValue: input.statements[i].text, initialHtml: input.statements[i].text ? renderRichInline(input.statements[i].text) : '', rows: 2, inline: true }}
                    />
                    <Island
                      name="RichField"
                      props={{ name: `note_${l}`, label: `Giải thích ý ${l})`, defaultValue: input.statements[i].note, initialHtml: input.statements[i].note ? renderRichInline(input.statements[i].note) : '', rows: 1, inline: true }}
                    />
                  </div>
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
                <p className="mt-1 text-[13px] text-ink-3">Mỗi dòng một cách viết được chấp nhận. Số so sánh theo giá trị: 0,5 = 0.5 = 1/2. Tập nghiệm viết "1; -2".</p>
              </div>
              <Field label="Sai số cho phép" name="tolerance" type="number" step="any" min="0" defaultValue={input.tolerance} hint="0 = phải đúng tuyệt đối." />
              <Field label="Đơn vị (không bắt buộc)" name="unit" defaultValue={input.unit} maxLength={20} hint="VD: cm, cm², °, phút. Học sinh ghi đơn vị khác cùng loại (m, mm…) được tự đổi." />
              <div className="md:col-span-3">
                <Select label="Quy tắc chấm" name="match" defaultValue={input.match} options={MATCH_MODES.map((m) => ({ value: m.value, label: m.label }))} />
                <ul className="mt-1.5 space-y-0.5 text-[13px] text-ink-3">
                  {MATCH_MODES.map((m) => (
                    <li key={m.value}>
                      <strong>{m.label}:</strong> {m.help}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {(t === 'essay' || t === 'geometry_essay') && (
            <>
              <Notice tone="info">Câu tự luận do giáo viên chấm (hệ thống không tự kết luận đúng/sai). Lời giải và thang điểm hiển thị cho học sinh sau khi nộp.</Notice>
              <Island
                name="RichField"
                props={{ name: 'rubric', label: 'Thang điểm / hướng dẫn chấm (mỗi dòng một ý, ví dụ "0,5 điểm: …")', defaultValue: input.rubric, initialHtml: input.rubric ? renderRich(input.rubric) : '', rows: 4 }}
              />
            </>
          )}

          <Island name="FigureField" props={{ name: 'figure', defaultValue: input.figure, initialSvg: figure.svg, required: t === 'geometry_essay' }} />
        </Panel>

        <Panel className="space-y-5 p-5">
          <Island name="RichField" props={{ name: 'solution', label: 'Lời giải / hướng dẫn chấm', defaultValue: input.solution, initialHtml: input.solution ? renderRich(input.solution) : '', rows: 5 }} />
          <Island name="RichField" props={{ name: 'hint', label: 'Gợi ý (hiện khi học sinh bấm "Xem gợi ý")', defaultValue: input.hint, initialHtml: input.hint ? renderRich(input.hint) : '', rows: 2 }} />
        </Panel>

        <label className="flex items-start gap-2 rounded-xl border border-line bg-white p-4 text-[15px]">
          <input type="checkbox" name="approve" value="1" className="mt-1 h-4 w-4 accent-[#3b2a8c]" />
          <span>
            Tôi đã kiểm tra kĩ đề bài, đáp án, lời giải và hình vẽ – <strong>duyệt câu này</strong> (đưa vào ngân hàng chính thức kể cả khi bộ kiểm tra còn cảnh báo).
          </span>
        </label>
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
  return redirect(`/giao-vien/cau-hoi/${res.id}/xem`, savedFlash(res.id!, res.status, res.warnings), ctx);
}

function savedFlash(id: number, status: string | undefined, warnings: string[] | undefined) {
  if (status === 'review')
    return { type: 'info' as const, message: `Đã lưu câu #${id} ở trạng thái Chờ duyệt vì: ${(warnings ?? []).slice(0, 3).join(' ')} Sửa câu hoặc bấm Duyệt sau khi kiểm tra.` };
  return { type: 'success' as const, message: `Đã lưu câu hỏi #${id}${status === 'draft' ? ' (bản nháp)' : ''}.` };
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
  return editorPage(ctx, { id: q.id, input: questionToInput(q), issues: q.qualityIssues });
}

export async function updateQuestionAction(ctx: Ctx): Promise<Res> {
  const { user, q } = await loadEditable(ctx);
  const form = await ctx.form();
  const { input, errors } = parseQuestionForm(form);
  input.type = q.type; // không đổi hình thức sau khi tạo
  if (errors.length) return editorPage(ctx, { id: q.id, input, errors, status: 422 });
  const res = await saveQuestion(ctx.db, q.id, q.textbookId, input, user.id);
  if (res.error) return editorPage(ctx, { id: q.id, input, errors: [res.error], status: 422 });
  return redirect(`/giao-vien/cau-hoi/${q.id}/xem`, savedFlash(q.id, res.status, res.warnings), ctx);
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
  const topic = q.topicId ? await ctx.db.one<{ levels: number[]; title: string }>(sql`select levels, title from topics where id = ${q.topicId}`) : null;
  const report = qualityOf(questionToInput(q), topic?.levels?.map(Number));
  const uploads = q.images.filter((i) => i.kind === 'upload');
  const editable = canEditQuestion(q, user);
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
        sub={`${TYPE_LABELS[q.type]} · ${LEVEL_LABELS[q.level]} · ${q.points} điểm · ${STATUS_LABELS[q.status]}${topic ? ` · ${topic.title}` : ''}${q.usedInTests ? ` · dùng trong ${q.usedInTests} đề` : ''}`}
        actions={
          <>
            {q.status === 'review' && editable && (
              <PostForm action={`/giao-vien/cau-hoi/${q.id}/duyet`}>
                <button className={buttonClass('primary', 'md')}>Duyệt – đưa vào ngân hàng</button>
              </PostForm>
            )}
            {editable && (
              <a href={`/giao-vien/cau-hoi/${q.id}`} className={buttonClass(q.status === 'review' ? 'secondary' : 'primary', 'md')}>
                Sửa
              </a>
            )}
            <PostForm action={`/giao-vien/cau-hoi/${q.id}/nhan-ban`}>
              <button className={buttonClass('secondary', 'md')}>Nhân bản</button>
            </PostForm>
          </>
        }
      />
      {q.status === 'review' && (
        <Notice tone="warn" className="mb-4">
          Câu đang <strong>chờ duyệt</strong>: học sinh chưa thấy câu này. Kiểm tra đề, đáp án, lời giải, hình vẽ rồi bấm Duyệt.
        </Notice>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <Panel className="p-6">
            <div className="mb-3 text-[13px] font-semibold text-ink-3">Xem trước như học sinh (đã đánh dấu đáp án đúng)</div>
            <QuestionBody q={view} />
            <div className="mt-5">
              <AnswerInput q={view} value={value} onChange={() => undefined} disabled reveal={reveal} />
            </div>
            {q.type === 'mcq' && reveal.notesHtml && (
              <div className="mt-4 rounded-xl bg-mist p-4">
                <div className="mb-1 text-sm font-bold text-ink-2">Giải thích các phương án</div>
                <ul className="space-y-1 text-[15px]">
                  {Object.entries(reveal.notesHtml)
                    .sort(([x], [y]) => x.localeCompare(y))
                    .map(([l, h]) => (
                      <li key={l}>
                        <strong className={l === reveal.correctChoice ? 'text-tre' : ''}>{l}.</strong> <Html className="prose-math inline" html={h} />
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </Panel>
          {reveal.solutionHtml && (
            <Panel className="p-5">
              <h2 className="mb-2 font-extrabold">Lời giải</h2>
              <Html html={reveal.solutionHtml} className="prose-math" />
            </Panel>
          )}
          {q.rubric && (
            <Panel className="p-5">
              <h2 className="mb-2 font-extrabold">Thang điểm / hướng dẫn chấm</h2>
              <Html html={renderRich(q.rubric)} className="prose-math" />
            </Panel>
          )}
        </div>
        <div className="space-y-4">
          <Panel className="p-5">
            <h2 className="mb-2 font-extrabold">Kiểm tra chất lượng</h2>
            {report.errors.length === 0 && report.warnings.length === 0 ? (
              <p className="text-[15px] font-semibold text-tre">Đạt tất cả tiêu chí tự động: đề có nội dung, đúng một đáp án đúng, phương án không trùng giá trị, đáp án đọc được, có lời giải, công thức và hình vẽ hiển thị được.</p>
            ) : (
              <ul className="list-disc space-y-1 pl-5 text-[14px]">
                {report.errors.map((e, i) => (
                  <li key={`e${i}`} className="text-le">
                    {e}
                  </li>
                ))}
                {report.warnings.map((w, i) => (
                  <li key={`w${i}`} className="text-[#7a5a00]">
                    {w}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-[12.5px] text-ink-3">Bộ kiểm tra không thay được việc giáo viên đọc lại: hãy tự giải lại câu hỏi trước khi duyệt.</p>
          </Panel>
          {view.hintHtml && (
            <Panel className="p-5">
              <h2 className="mb-2 font-extrabold">Gợi ý</h2>
              <Html html={view.hintHtml} className="prose-math" />
            </Panel>
          )}
          <Panel className="p-5">
            <h2 className="mb-2 font-extrabold">Ảnh minh họa</h2>
            {uploads.length ? (
              <ul className="space-y-3">
                {uploads.map((img) => (
                  <li key={img.id} className="flex items-center gap-3">
                    <img src={`/media/${img.id}`} alt={img.alt} className="h-20 w-auto rounded-lg border border-line" />
                    {editable && (
                      <PostForm action={`/giao-vien/cau-hoi/${q.id}/anh/${img.id}/xoa`} confirm="Bỏ ảnh này khỏi câu hỏi?">
                        <button className={buttonClass('quiet', 'sm')}>Bỏ ảnh</button>
                      </PostForm>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[14px] text-ink-3">Chưa có ảnh tải lên. Hình vẽ hình học nên tạo bằng ô “Hình vẽ” trong trang sửa để nét khi phóng to.</p>
            )}
            {editable && (
              <PostForm action={`/giao-vien/cau-hoi/${q.id}/anh`} encType="multipart/form-data" className="mt-3 space-y-2">
                <input type="file" name="file" accept="image/png,image/jpeg,image/webp" required className="block w-full text-[14px]" />
                <input name="alt" maxLength={200} placeholder="Mô tả ảnh (cho người dùng trình đọc màn hình)" className="w-full rounded-lg border border-line-2 px-3 py-1.5 text-[14px]" />
                <button className={buttonClass('secondary', 'sm')}>Tải ảnh lên (PNG, JPEG, WebP ≤ 3 MB)</button>
              </PostForm>
            )}
          </Panel>
          <Panel className="p-5 text-[14px] text-ink-2">
            <div>Tạo bởi: {q.createdByName ?? q.source ?? 'Hệ thống'}</div>
            <div>Ngày tạo: {formatDate(q.createdAt)}</div>
            <div>Sửa lần cuối: {formatDate(q.updatedAt)}</div>
            {q.verifiedAt && <div>Duyệt lúc: {formatDate(q.verifiedAt)}</div>}
          </Panel>
        </div>
      </div>
    </>,
  );
}

export async function approveQuestionAction(ctx: Ctx): Promise<Res> {
  const { user, q } = await loadEditable(ctx);
  const n = await approveQuestions(ctx.db, [q.id], user.id);
  return redirect(`/giao-vien/cau-hoi/${q.id}/xem`, n ? { type: 'success', message: `Đã duyệt câu #${q.id} – câu đã vào ngân hàng chính thức.` } : { type: 'info', message: 'Câu này không ở trạng thái chờ duyệt.' }, ctx);
}

export async function bulkApproveAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const form = await ctx.form();
  const ids = [...new Set(form.all('ids').map(Number).filter((n) => Number.isInteger(n) && n > 0))].slice(0, 200);
  const editable = (await ctx.db.many<{ id: number; createdBy: string | null }>(sql`select id, created_by from questions where id = any(${ids}::int[])`)).filter((q) => canEditQuestion(q, user)).map((q) => q.id);
  const n = await approveQuestions(ctx.db, editable, user.id);
  return redirect('/giao-vien/cau-hoi?trang-thai=review', { type: n ? 'success' : 'info', message: n ? `Đã duyệt ${n} câu hỏi.` : 'Chưa chọn câu nào (hoặc không có quyền duyệt).' }, ctx);
}

/** Tải ảnh lên cho câu hỏi hoặc bỏ ảnh khỏi câu hỏi. */
export async function questionImageAction(ctx: Ctx): Promise<Res> {
  const { user, q } = await loadEditable(ctx);
  const back = `/giao-vien/cau-hoi/${q.id}/xem`;
  if (ctx.params.imageId) {
    const imgId = Number(ctx.params.imageId);
    await ctx.db.tx(async (t) => {
      await t.exec(sql`delete from question_images where question_id = ${q.id} and image_id = ${imgId}`);
      await t.exec(sql`delete from images where id = ${imgId} and kind = 'upload' and not exists (select 1 from question_images where image_id = ${imgId})`);
    });
    return redirect(back, { type: 'success', message: 'Đã bỏ ảnh.' }, ctx);
  }
  const form = await ctx.form();
  const file = (await ctx.files()).find((f) => f.field === 'file');
  if (!file || !file.data.length) return redirect(back, { type: 'error', message: 'Chưa chọn ảnh.' }, ctx);
  if (file.data.length > 3 * 1024 * 1024) return redirect(back, { type: 'error', message: 'Ảnh lớn hơn 3 MB.' }, ctx);
  const mime = sniffImage(file.data);
  if (!mime) return redirect(back, { type: 'error', message: 'Chỉ nhận ảnh PNG, JPEG hoặc WebP.' }, ctx);
  await ctx.db.tx(async (t) => {
    const img = await t.one<{ id: number }>(sql`
      insert into images (kind, mime, data, byte_size, alt, created_by, is_public, purpose)
      values ('upload', ${mime}, ${file.data}, ${file.data.length}, ${form.str('alt', 200) || 'Hình minh họa đề bài'}, ${user.id}, false, 'question') returning id`);
    const max = await t.one<{ m: number }>(sql`select coalesce(max(sort_order), 0)::int as m from question_images where question_id = ${q.id}`);
    await t.exec(sql`insert into question_images (question_id, image_id, sort_order) values (${q.id}, ${img!.id}, ${(max?.m ?? 0) + 1})`);
    await t.exec(sql`update questions set updated_at = now() where id = ${q.id}`);
  });
  return redirect(back, { type: 'success', message: 'Đã thêm ảnh vào câu hỏi.' }, ctx);
}
