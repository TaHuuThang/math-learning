import { HttpError, redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { intParam, requireBook } from '../common';
import type { FormData } from '../../http/context';
import {
  addQuestionsToTest,
  createTest,
  deleteTest,
  getAttempt,
  getTestForTeacher,
  gradeManual,
  hasSubmissions,
  listTestsForTeacher,
  moveQuestionInTest,
  removeQuestionFromTest,
  resultDetails,
  setAssignments,
  setQuestionPoints,
  setTestStatus,
  testAssignments,
  testQuestionStats,
  testQuestions,
  testResultsTable,
  updateTest,
  validateTestInput,
  type TestInput,
  type TestRow,
} from '../../../domain/tests';
import { listClasses } from '../../../domain/classes';
import { lessonLabel, lessonOptions } from '../../../domain/curriculum';
import { listQuestions } from '../../../domain/questions';
import { UserInputError } from '../../../domain/users';
import { ResultQuestionList } from '../tests-student';
import { Badge, Button, Checkbox, EmptyState, ErrorList, Field, Html, Notice, PageTitle, Panel, PostForm, Select, TextArea, buttonClass } from '../../../ui/components/ui';
import { LEVEL_LABELS, TIME_ZONE, TYPE_SHORT, formatDateTime, formatNumber, percent } from '../../../shared/labels';
import { QUESTION_TYPES, toTenScale } from '../../../shared/grading';
import { plainExcerpt } from '../../../shared/richtext';

const STATUS: Record<string, [string, 'tre' | 'gray' | 'cam']> = {
  draft: ['Bản nháp', 'gray'],
  published: ['Đang phát', 'tre'],
  closed: ['Đã đóng', 'cam'],
};

/** Ô datetime-local hiển thị theo giờ Việt Nam. */
function toLocalInput(d: Date | null) {
  if (!d) return '';
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
}

function fromLocalInput(v: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v)) return null;
  return new Date(`${v}:00+07:00`);
}

function readTestForm(form: FormData): TestInput {
  return {
    title: form.str('title', 200),
    description: form.text('description', 2000),
    durationMinutes: form.int('duration'),
    showAnswers: form.bool('show_answers'),
    maxAttempts: form.int('max_attempts') ?? 1,
    opensAt: fromLocalInput(form.str('opens_at', 20)),
    closesAt: fromLocalInput(form.str('closes_at', 20)),
  };
}

function TestInfoFields({ t }: { t?: Partial<Omit<TestInput, 'description'>> & { description?: string | null } }) {
  return (
    <div className="space-y-3">
      <Field label="Tên đề" name="title" required defaultValue={t?.title} maxLength={200} placeholder="Kiểm tra 15 phút – Chương I" />
      <TextArea label="Hướng dẫn cho học sinh" name="description" defaultValue={t?.description ?? ''} rows={2} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Thời gian (phút)" name="duration" type="number" min={1} max={240} defaultValue={t?.durationMinutes ?? ''} hint="Để trống: không giới hạn" />
        <Field label="Số lần làm tối đa" name="max_attempts" type="number" min={1} max={10} defaultValue={t?.maxAttempts ?? 1} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Mở lúc (không bắt buộc)" name="opens_at" type="datetime-local" defaultValue={toLocalInput(t?.opensAt ?? null)} />
        <Field label="Đóng lúc (không bắt buộc)" name="closes_at" type="datetime-local" defaultValue={toLocalInput(t?.closesAt ?? null)} />
      </div>
      <Checkbox name="show_answers" label="Cho học sinh xem đáp án và lời giải sau khi nộp" defaultChecked={t?.showAnswers ?? true} />
    </div>
  );
}

export async function testsPage(ctx: Ctx, errors?: string[], values?: TestInput): Promise<Res> {
  const user = requireTeacher(ctx);
  const tests = await listTestsForTeacher(ctx.db, user);
  return page(
    ctx,
    { title: 'Đề kiểm tra', layout: 'dashboard', section: 'tests', status: errors ? 422 : 200 },
    <>
      <PageTitle title="Đề kiểm tra" sub="Tạo đề từ ngân hàng câu hỏi, giao cho lớp, theo dõi bài nộp và chấm câu tự luận." />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          {tests.length ? (
            <Panel className="overflow-x-auto">
              <table className="data-table min-w-[760px]">
                <thead>
                  <tr>
                    <th>Đề</th>
                    <th>Câu / điểm</th>
                    <th>Lớp</th>
                    <th>Bài nộp</th>
                    <th>Trạng thái</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {tests.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <a href={`/giao-vien/de-kiem-tra/${t.id}`} className="font-semibold hover:text-tim-700 hover:underline">
                          {t.title}
                        </a>
                        <div className="text-[12px] text-ink-3">
                          {t.durationMinutes ? `${t.durationMinutes} phút` : 'Không giới hạn'} · tạo {formatDateTime(t.createdAt)}
                          {user.role === 'admin' ? ` · ${t.createdByName}` : ''}
                        </div>
                      </td>
                      <td>
                        {t.questionCount} câu / {formatNumber(t.totalPoints)} đ
                      </td>
                      <td className="text-[14px]">{t.classNames ?? <span className="text-ink-3">Chưa giao</span>}</td>
                      <td>
                        {t.submissions}
                        {t.pendingManual > 0 && <div className="text-[12px] font-semibold text-cam">{t.pendingManual} câu chờ chấm</div>}
                      </td>
                      <td>
                        <Badge tone={STATUS[t.status][1]}>{STATUS[t.status][0]}</Badge>
                      </td>
                      <td className="whitespace-nowrap text-right">
                        <a href={`/giao-vien/de-kiem-tra/${t.id}/ket-qua`} className={buttonClass('quiet', 'sm')}>
                          Kết quả
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
          ) : (
            <EmptyState title="Chưa có đề kiểm tra">Tạo đề ở khung bên cạnh, sau đó thêm câu hỏi và giao cho lớp.</EmptyState>
          )}
        </div>
        <Panel className="h-fit p-5">
          <h2 className="mb-3 text-lg font-extrabold">Tạo đề mới</h2>
          <ErrorList errors={errors} />
          <PostForm action="/giao-vien/de-kiem-tra">
            <TestInfoFields t={values} />
            <Button className="mt-4 w-full">Tạo đề</Button>
          </PostForm>
        </Panel>
      </div>
    </>,
  );
}

export async function createTestAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const input = readTestForm(await ctx.form());
  const errors = validateTestInput(input);
  if (errors.length) return testsPage(ctx, errors, input);
  const id = await createTest(ctx.db, book.id, user.id, input);
  return redirect(`/giao-vien/de-kiem-tra/${id}`, { type: 'success', message: 'Đã tạo đề. Thêm câu hỏi từ ngân hàng ở bên dưới.' }, ctx);
}

async function loadTest(ctx: Ctx): Promise<{ test: TestRow }> {
  const user = requireTeacher(ctx);
  const test = await getTestForTeacher(ctx.db, intParam(ctx, 'id'), user);
  if (!test) throw new HttpError(404, 'Không tìm thấy đề hoặc đề không do thầy/cô tạo.');
  return { test };
}

export async function testDetailPage(ctx: Ctx, errors?: string[]): Promise<Res> {
  const user = requireTeacher(ctx);
  const { test } = await loadTest(ctx);
  const book = await requireBook(ctx);
  const [questions, assigned, classes, locked, lessons] = await Promise.all([
    testQuestions(ctx.db, test.id),
    testAssignments(ctx.db, test.id),
    listClasses(ctx.db, user),
    hasSubmissions(ctx.db, test.id),
    lessonOptions(ctx.db, book.id),
  ]);
  const pickLesson = Number(ctx.query.get('bai')) || null;
  const pickType = ctx.query.get('loai') || null;
  const bank = await listQuestions(ctx.db, { textbookId: book.id, lessonId: pickLesson, type: pickType, status: 'published' }, 60, 0);
  const inTest = new Set(questions.map((q) => q.questionId));
  const candidates = bank.rows.filter((q) => !inTest.has(q.id));
  const base = `/giao-vien/de-kiem-tra/${test.id}`;
  return page(
    ctx,
    { title: test.title, layout: 'dashboard', section: 'tests', status: errors ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/de-kiem-tra', label: 'Đề kiểm tra' }, { label: test.title }]}
        title={test.title}
        sub={`${test.questionCount} câu · ${formatNumber(test.totalPoints)} điểm (quy đổi thang 10) · ${test.durationMinutes ? `${test.durationMinutes} phút` : 'không giới hạn thời gian'}`}
        actions={
          <>
            <Badge tone={STATUS[test.status][1]} className="self-center text-sm">
              {STATUS[test.status][0]}
            </Badge>
            <a href={`${base}/ket-qua`} className={buttonClass('secondary', 'md')}>
              Kết quả ({test.submissions})
            </a>
          </>
        }
      />
      <ErrorList errors={errors} />
      {locked && <Notice tone="warn" className="mb-5">Đã có học sinh làm bài: không thể thay đổi câu hỏi và điểm để đảm bảo công bằng. Vẫn có thể sửa thông tin, lớp được giao và trạng thái.</Notice>}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <Panel>
            <div className="border-b border-line px-5 py-3 font-extrabold">Câu hỏi trong đề</div>
            {questions.length ? (
              <ol className="divide-y divide-line">
                {questions.map((q, i) => (
                  <li key={q.questionId} className="flex flex-wrap items-start gap-3 px-5 py-3">
                    <span className="w-8 shrink-0 pt-0.5 font-bold text-tim-700">{i + 1}.</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge>{TYPE_SHORT[q.type as keyof typeof TYPE_SHORT]}</Badge>
                        <Badge tone="gray">{LEVEL_LABELS[q.level]}</Badge>
                        {q.status !== 'published' && <Badge tone="le">Câu đã bị ẩn</Badge>}
                      </div>
                      <div className="mt-1 text-[14px]">{plainExcerpt(q.stem, 140)}</div>
                      <div className="text-[12px] text-ink-3">
                        #{q.questionId}
                        {q.lessonTitle ? ` · ${lessonLabel({ kind: q.lessonKind ?? 'lesson', number: q.lessonNumber, title: q.lessonTitle })}` : ''}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <PostForm action={`${base}/cau-hoi/${q.questionId}`} className="flex items-center gap-1">
                        <input type="hidden" name="_action" value="points" />
                        <input
                          name="points"
                          type="number"
                          step="0.25"
                          min="0.25"
                          max="100"
                          defaultValue={q.points}
                          disabled={locked}
                          aria-label={`Điểm câu ${i + 1}`}
                          className="w-20 rounded-lg border border-line-2 px-2 py-1 text-[14px]"
                        />
                        <button className={buttonClass('quiet', 'sm')} disabled={locked}>
                          Lưu điểm
                        </button>
                      </PostForm>
                      <PostForm action={`${base}/cau-hoi/${q.questionId}`}>
                        <input type="hidden" name="_action" value="up" />
                        <button className={buttonClass('quiet', 'sm')} disabled={i === 0} aria-label="Đưa lên">
                          ↑
                        </button>
                      </PostForm>
                      <PostForm action={`${base}/cau-hoi/${q.questionId}`}>
                        <input type="hidden" name="_action" value="down" />
                        <button className={buttonClass('quiet', 'sm')} disabled={i === questions.length - 1} aria-label="Đưa xuống">
                          ↓
                        </button>
                      </PostForm>
                      <PostForm action={`${base}/cau-hoi/${q.questionId}`}>
                        <input type="hidden" name="_action" value="remove" />
                        <button className={buttonClass('ghost', 'sm', 'text-le hover:bg-le-soft')} disabled={locked}>
                          Bỏ
                        </button>
                      </PostForm>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="px-5 py-6 text-[15px] text-ink-2">Đề chưa có câu hỏi. Chọn câu từ ngân hàng ở khung bên dưới.</p>
            )}
          </Panel>

          {!locked && (
            <Panel>
              <div className="border-b border-line px-5 py-3 font-extrabold">Thêm câu từ ngân hàng</div>
              <form method="get" className="grid gap-3 border-b border-line px-5 py-4 md:grid-cols-[2fr_1fr_auto]">
                <Select label="Bài học" name="bai" defaultValue={pickLesson ?? ''} autoSubmit options={[{ value: '', label: 'Tất cả bài' }, ...lessons.map((l) => ({ value: l.id, label: l.label, group: l.chapter }))]} />
                <Select label="Hình thức" name="loai" defaultValue={pickType ?? ''} autoSubmit options={[{ value: '', label: 'Tất cả' }, ...QUESTION_TYPES.map((t) => ({ value: t, label: TYPE_SHORT[t] }))]} />
                <div className="flex items-end">
                  <button className={buttonClass('secondary', 'md')}>Lọc</button>
                </div>
              </form>
              {candidates.length ? (
                <PostForm action={`${base}/cau-hoi`}>
                  <ul className="max-h-[480px] divide-y divide-line overflow-y-auto">
                    {candidates.map((q) => (
                      <li key={q.id}>
                        <label className="flex cursor-pointer items-start gap-3 px-5 py-3 hover:bg-tim-50/60">
                          <input type="checkbox" name="question_id" value={q.id} className="mt-1 h-4 w-4 accent-[#3b2a8c]" />
                          <span className="min-w-0">
                            <span className="flex flex-wrap gap-1.5">
                              <Badge>{TYPE_SHORT[q.type]}</Badge>
                              <Badge tone="gray">{LEVEL_LABELS[q.level]}</Badge>
                            </span>
                            <span className="mt-1 block text-[14px]">{plainExcerpt(q.stem, 140)}</span>
                            <span className="block text-[12px] text-ink-3">
                              #{q.id}
                              {q.lessonTitle ? ` · ${lessonLabel({ kind: q.lessonKind ?? 'lesson', number: q.lessonNumber, title: q.lessonTitle })}` : ''}
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-line px-5 py-3">
                    <Button>Thêm các câu đã chọn</Button>
                  </div>
                </PostForm>
              ) : (
                <p className="px-5 py-6 text-[15px] text-ink-2">Không còn câu đã xuất bản phù hợp bộ lọc.</p>
              )}
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Phát đề</h2>
            <p className="text-[14px] text-ink-2">
              {test.status === 'draft' && 'Đề đang là bản nháp – học sinh chưa thấy.'}
              {test.status === 'published' && 'Học sinh trong các lớp được giao đang thấy đề.'}
              {test.status === 'closed' && 'Đề đã đóng – học sinh xem lại được kết quả nhưng không làm mới.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {test.status !== 'published' && (
                <PostForm action={`${base}/trang-thai`}>
                  <input type="hidden" name="status" value="published" />
                  <Button>Phát đề</Button>
                </PostForm>
              )}
              {test.status === 'published' && (
                <PostForm action={`${base}/trang-thai`} confirm="Đóng đề? Học sinh sẽ không bắt đầu lượt làm mới.">
                  <input type="hidden" name="status" value="closed" />
                  <Button variant="secondary">Đóng đề</Button>
                </PostForm>
              )}
              {test.status === 'published' && !locked && (
                <PostForm action={`${base}/trang-thai`}>
                  <input type="hidden" name="status" value="draft" />
                  <Button variant="quiet">Chuyển về nháp</Button>
                </PostForm>
              )}
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Giao cho lớp</h2>
            {classes.length ? (
              <PostForm action={`${base}/lop`} className="space-y-2">
                {classes.map((c) => (
                  <Checkbox key={c.id} name="class_id" value={String(c.id)} defaultChecked={assigned.includes(c.id)} label={`${c.name} (${c.schoolYear})`} hint={`${c.memberCount} học sinh`} />
                ))}
                <Button variant="secondary" className="mt-2">
                  Lưu lớp được giao
                </Button>
              </PostForm>
            ) : (
              <p className="text-[14px] text-ink-2">
                Thầy/cô chưa có lớp.{' '}
                <a href="/giao-vien/lop" className="font-semibold text-tim-700 underline">
                  Tạo lớp
                </a>
              </p>
            )}
          </Panel>
          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Thông tin đề</h2>
            <PostForm action={base}>
              <TestInfoFields t={test} />
              <Button variant="secondary" className="mt-4">
                Lưu thông tin
              </Button>
            </PostForm>
          </Panel>
          {!locked && (
            <PostForm action={`${base}/xoa`} confirm="Xóa đề kiểm tra này?">
              <Button variant="danger">Xóa đề</Button>
            </PostForm>
          )}
        </div>
      </div>
    </>,
  );
}

export async function testAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const { test } = await loadTest(ctx);
  const base = `/giao-vien/de-kiem-tra/${test.id}`;
  const form = await ctx.form();
  const action = ctx.params.action ?? 'info';
  try {
    switch (action) {
      case 'info': {
        const input = readTestForm(form);
        const errors = validateTestInput(input);
        if (errors.length) return testDetailPage(ctx, errors);
        await updateTest(ctx.db, test.id, input);
        return redirect(base, { type: 'success', message: 'Đã lưu thông tin đề.' }, ctx);
      }
      case 'cau-hoi': {
        const ids = form
          .all('question_id')
          .map(Number)
          .filter((n) => Number.isInteger(n) && n > 0)
          .slice(0, 100);
        if (!ids.length) return redirect(base, { type: 'error', message: 'Chưa chọn câu hỏi nào.' }, ctx);
        await addQuestionsToTest(ctx.db, test.id, ids);
        return redirect(base, { type: 'success', message: `Đã thêm ${ids.length} câu vào đề.` }, ctx);
      }
      case 'lop': {
        const ids = form.all('class_id').map(Number).filter((n) => Number.isInteger(n) && n > 0);
        await setAssignments(ctx.db, test.id, user, ids);
        return redirect(base, { type: 'success', message: 'Đã lưu danh sách lớp được giao.' }, ctx);
      }
      case 'trang-thai': {
        const status = form.str('status');
        if (!['draft', 'published', 'closed'].includes(status)) throw new HttpError(400);
        if (status === 'draft' && (await hasSubmissions(ctx.db, test.id))) throw new UserInputError('Đề đã có bài làm, không thể chuyển về nháp.');
        await setTestStatus(ctx.db, test, status as 'draft' | 'published' | 'closed');
        return redirect(base, { type: 'success', message: status === 'published' ? 'Đã phát đề cho các lớp được giao.' : status === 'closed' ? 'Đã đóng đề.' : 'Đã chuyển đề về bản nháp.' }, ctx);
      }
      case 'xoa':
        await deleteTest(ctx.db, test.id);
        return redirect('/giao-vien/de-kiem-tra', { type: 'success', message: 'Đã xóa đề.' }, ctx);
      default:
        throw new HttpError(404);
    }
  } catch (err) {
    if (err instanceof UserInputError) return redirect(base, { type: 'error', message: err.message }, ctx);
    throw err;
  }
}

export async function testQuestionAction(ctx: Ctx): Promise<Res> {
  const { test } = await loadTest(ctx);
  const qid = intParam(ctx, 'qid');
  const base = `/giao-vien/de-kiem-tra/${test.id}`;
  const form = await ctx.form();
  try {
    switch (form.str('_action')) {
      case 'remove':
        await removeQuestionFromTest(ctx.db, test.id, qid);
        break;
      case 'up':
        await moveQuestionInTest(ctx.db, test.id, qid, -1);
        break;
      case 'down':
        await moveQuestionInTest(ctx.db, test.id, qid, 1);
        break;
      case 'points':
        await setQuestionPoints(ctx.db, test.id, qid, form.num('points') ?? 0);
        break;
      default:
        throw new HttpError(400);
    }
  } catch (err) {
    if (err instanceof UserInputError) return redirect(base, { type: 'error', message: err.message }, ctx);
    throw err;
  }
  return redirect(base);
}

export async function testResultsPage(ctx: Ctx): Promise<Res> {
  const { test } = await loadTest(ctx);
  const [rows, qstats, questions] = await Promise.all([testResultsTable(ctx.db, test.id), testQuestionStats(ctx.db, test.id), testQuestions(ctx.db, test.id)]);
  const submitted = rows.filter((r) => r.status && r.status !== 'in_progress');
  const tens = submitted.map((r) => toTenScale(r.score ?? 0, r.maxScore ?? 0));
  const avg = tens.length ? tens.reduce((a, b) => a + b, 0) / tens.length : null;
  return page(
    ctx,
    { title: `Kết quả: ${test.title}`, layout: 'dashboard', section: 'tests' },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/de-kiem-tra', label: 'Đề kiểm tra' }, { href: `/giao-vien/de-kiem-tra/${test.id}`, label: test.title }, { label: 'Kết quả' }]}
        title={`Kết quả: ${test.title}`}
        sub={`${submitted.length}/${rows.length} học sinh đã nộp${avg !== null ? ` · điểm trung bình ${formatNumber(avg)}/10` : ''}`}
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Panel className="overflow-x-auto">
          {rows.length ? (
            <table className="data-table min-w-[640px]">
              <thead>
                <tr>
                  <th>Học sinh</th>
                  <th>Lớp</th>
                  <th>Trạng thái</th>
                  <th>Điểm (/10)</th>
                  <th>Nộp lúc</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.studentId}>
                    <td>
                      <div className="font-semibold">{r.fullName}</div>
                      <div className="font-mono text-[12px] text-ink-3">@{r.username}</div>
                    </td>
                    <td>{r.className ?? '–'}</td>
                    <td>
                      {!r.status && <Badge tone="gray">Chưa làm</Badge>}
                      {r.status === 'in_progress' && <Badge tone="hl">Đang làm</Badge>}
                      {r.status === 'submitted' && <Badge tone="cam">Chờ chấm {r.pendingManual} câu</Badge>}
                      {r.status === 'graded' && <Badge tone="tre">Đã chấm</Badge>}
                      {r.attempts > 1 && <span className="ml-1 text-[12px] text-ink-3">lần {r.attempts}</span>}
                    </td>
                    <td className="font-bold tabular-nums">{r.status && r.status !== 'in_progress' ? formatNumber(toTenScale(r.score ?? 0, r.maxScore ?? 0)) : '–'}</td>
                    <td className="text-[13px] text-ink-3">{r.submittedAt ? formatDateTime(r.submittedAt) : ''}</td>
                    <td className="whitespace-nowrap text-right">
                      {r.resultId && r.status !== 'in_progress' && (
                        <>
                          <a href={`/kiem-tra/ket-qua/${r.resultId}`} className={buttonClass('quiet', 'sm')}>
                            Xem bài
                          </a>{' '}
                          {r.pendingManual > 0 && (
                            <a href={`/giao-vien/cham-bai/${r.resultId}`} className={buttonClass('primary', 'sm')}>
                              Chấm
                            </a>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-5">
              <EmptyState title="Chưa có học sinh được giao đề">Giao đề cho lớp trong trang chi tiết đề.</EmptyState>
            </div>
          )}
        </Panel>
        <Panel className="h-fit p-5">
          <h2 className="mb-3 text-lg font-extrabold">Tỉ lệ đúng từng câu</h2>
          <ol className="space-y-2.5">
            {questions.map((q, i) => {
              const s = qstats.find((x) => x.questionId === q.questionId);
              const rate = s && s.answered ? percent(s.correct, s.answered) : null;
              return (
                <li key={q.questionId}>
                  <div className="flex justify-between text-[14px]">
                    <span>
                      Câu {i + 1} <span className="text-ink-3">({TYPE_SHORT[q.type as keyof typeof TYPE_SHORT]})</span>
                    </span>
                    <span className="font-semibold">{rate === null ? 'chưa có' : `${rate}%`}</span>
                  </div>
                  <div className="bar mt-1">
                    <span style={{ width: `${rate ?? 0}%`, background: rate !== null && rate < 50 ? 'var(--color-le)' : undefined }} />
                  </div>
                </li>
              );
            })}
          </ol>
        </Panel>
      </div>
    </>,
  );
}

// ---------------- Chấm tự luận ----------------

async function loadAttemptForGrading(ctx: Ctx) {
  const user = requireTeacher(ctx);
  const attempt = await getAttempt(ctx.db, intParam(ctx, 'id'));
  if (!attempt || (user.role !== 'admin' && attempt.testCreatedBy !== user.id)) throw new HttpError(404, 'Không tìm thấy bài làm.');
  return { user, attempt };
}

export async function gradingPage(ctx: Ctx, errors?: string[]): Promise<Res> {
  const { attempt } = await loadAttemptForGrading(ctx);
  const questions = await resultDetails(ctx.db, attempt, true);
  const manual = questions.filter((q) => !q.autoGraded);
  return page(
    ctx,
    { title: `Chấm bài: ${attempt.studentName}`, layout: 'dashboard', section: 'tests', status: errors ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: `/giao-vien/de-kiem-tra/${attempt.testId}/ket-qua`, label: 'Kết quả đề' }, { label: attempt.studentName }]}
        title={`Chấm tự luận – ${attempt.studentName}`}
        sub={`${attempt.title} · điểm hiện tại ${formatNumber(attempt.score ?? 0)}/${formatNumber(attempt.maxScore ?? 0)} · còn ${attempt.pendingManual} câu chờ chấm`}
      />
      <ErrorList errors={errors} />
      {manual.length === 0 ? (
        <Notice>Bài này không có câu tự luận.</Notice>
      ) : (
        <div className="space-y-5">
          {manual.map((q) => (
            <Panel key={q.id} className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge>{TYPE_SHORT[q.type]}</Badge>
                {q.status === 'pending' ? <Badge tone="cam">Chờ chấm</Badge> : <Badge tone="tre">Đã chấm</Badge>}
                <span className="text-[14px] text-ink-3">Tối đa {formatNumber(q.testPoints)} điểm</span>
              </div>
              <Html html={q.stemHtml} className="prose-math" />
              {q.mediaHtml.map((h, k) => (
                <Html key={k} html={h} className="mt-2 flex justify-center" />
              ))}
              <div className="mt-4 rounded-xl border border-line bg-mist p-4">
                <div className="mb-1 text-[13px] font-semibold text-ink-3">Bài làm của học sinh</div>
                <div className="whitespace-pre-wrap text-[15px]">{(q.response as { text?: string } | null)?.text || <em className="text-ink-3">Không trả lời</em>}</div>
              </div>
              {q.solutionHtml && (
                <details className="mt-3">
                  <summary className="text-[14px] font-semibold text-tim-700">Hướng dẫn chấm / lời giải</summary>
                  <Html html={q.solutionHtml} className="prose-math mt-2" />
                </details>
              )}
              {q.responseId && (
                <PostForm action={`/giao-vien/cham-bai/${attempt.id}`} className="mt-4 grid gap-3 md:grid-cols-[160px_minmax(0,1fr)_auto] md:items-end">
                  <input type="hidden" name="response_id" value={q.responseId} />
                  <input type="hidden" name="max" value={q.testPoints} />
                  <Field label="Điểm" name="points" type="number" step="0.25" min={0} max={q.testPoints} required defaultValue={q.status === 'pending' ? '' : (q.pointsAwarded ?? '')} />
                  <Field label="Nhận xét (học sinh xem được)" name="feedback" defaultValue={q.feedback ?? ''} maxLength={1000} />
                  <Button>Lưu điểm</Button>
                </PostForm>
              )}
            </Panel>
          ))}
        </div>
      )}
      <div className="mt-8">
        <h2 className="mb-3 text-lg font-extrabold">Toàn bộ bài làm</h2>
        <ResultQuestionList questions={questions} reveal />
      </div>
    </>,
  );
}

export async function gradingAction(ctx: Ctx): Promise<Res> {
  const { user, attempt } = await loadAttemptForGrading(ctx);
  const form = await ctx.form();
  const responseId = form.int('response_id');
  const points = form.num('points');
  const questions = await resultDetails(ctx.db, attempt, false);
  const q = questions.find((x) => x.responseId === responseId);
  if (!q || q.autoGraded) throw new HttpError(400, 'Câu không cần chấm tay.');
  if (points === null) return gradingPage(ctx, ['Nhập điểm cho câu.']);
  try {
    await gradeManual(ctx.db, attempt, responseId!, points, q.testPoints, form.str('feedback', 1000), user.id);
  } catch (err) {
    if (err instanceof UserInputError) return gradingPage(ctx, [err.message]);
    throw err;
  }
  return redirect(`/giao-vien/cham-bai/${attempt.id}`, { type: 'success', message: 'Đã lưu điểm.' }, ctx);
}
