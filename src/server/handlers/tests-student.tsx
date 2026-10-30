import { LuClipboardCheck, LuClock } from 'react-icons/lu';
import { HttpError, json, redirect, type Ctx, type Res } from '../http/context';
import { page } from '../http/render';
import { intParam } from './common';
import { requireUser, isStaff } from '../auth/guards';
import {
  attemptQuestionViews,
  getAttempt,
  listTestsForStudent,
  resultDetails,
  saveDraft,
  startAttempt,
  studentTest,
  submitAttempt,
  testAvailability,
  type AttemptRow,
  type ResultQuestion,
} from '../../domain/tests';
import { UserInputError } from '../../domain/users';
import { Island } from '../../ui/Island';
import { Badge, Button, EmptyState, LinkButton, Notice, PageTitle, Panel, PostForm, Html } from '../../ui/components/ui';
import { formatDateTime, formatNumber, TYPE_LABELS } from '../../shared/labels';
import { toTenScale } from '../../shared/grading';
import { escapeHtml } from '../../shared/richtext';
import type { AnswerValue } from '../../islands/shared';

function availabilityBadge(t: { status: string; opensAt: Date | null; closesAt: Date | null }) {
  const a = testAvailability(t);
  if (a === 'open') return <Badge tone="tre">Đang mở</Badge>;
  if (a === 'not_yet') return <Badge tone="cam">Mở lúc {formatDateTime(t.opensAt)}</Badge>;
  return <Badge tone="gray">Đã đóng</Badge>;
}

export async function studentTestsPage(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  if (isStaff(user)) {
    return page(
      ctx,
      { title: 'Kiểm tra' },
      <>
        <PageTitle title="Kiểm tra" sub="Giáo viên tạo đề từ ngân hàng câu hỏi, giao cho lớp và xem kết quả trong trang giáo viên." />
        <LinkButton href="/giao-vien/de-kiem-tra">Quản lý đề kiểm tra</LinkButton>
      </>,
    );
  }
  const tests = await listTestsForStudent(ctx.db, user.id);
  return page(
    ctx,
    { title: 'Kiểm tra' },
    <>
      <PageTitle title="Kiểm tra" sub="Các đề thầy cô giao cho lớp của em. Bài được chấm tự động; câu tự luận do thầy cô chấm." />
      {tests.length === 0 ? (
        <EmptyState icon={<LuClipboardCheck />} title="Chưa có đề kiểm tra nào" action={<LinkButton href="/ca-nhan">Nhập mã lớp</LinkButton>}>
          Khi thầy cô giao đề cho lớp của em, đề sẽ hiện ở đây. Nếu em chưa vào lớp, hãy nhập mã lớp ở trang cá nhân.
        </EmptyState>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tests.map((t) => {
            const avail = testAvailability(t);
            const ten = t.bestScore !== null && t.bestMax ? toTenScale(t.bestScore, t.bestMax) : null;
            return (
              <Panel key={t.id} className="flex flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">{availabilityBadge(t)}</div>
                <h2 className="mt-2 text-lg font-extrabold">{t.title}</h2>
                <p className="mt-1 text-[14px] text-ink-3">
                  {t.questionCount} câu · {t.durationMinutes ? `${t.durationMinutes} phút` : 'không giới hạn thời gian'} · {t.teacherName}
                </p>
                {t.closesAt && <p className="text-[14px] text-ink-3">Hạn nộp: {formatDateTime(t.closesAt)}</p>}
                <div className="mt-4 flex flex-1 flex-wrap items-end justify-between gap-3">
                  <div className="text-[14px]">
                    {ten !== null ? (
                      <span>
                        Điểm: <strong className="text-lg">{formatNumber(ten)}</strong>/10
                        {t.pendingManual > 0 && <span className="text-ink-3"> (chờ chấm tự luận)</span>}
                      </span>
                    ) : (
                      <span className="text-ink-3">Chưa làm</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {t.lastResultId && (
                      <LinkButton href={`/kiem-tra/ket-qua/${t.lastResultId}`} variant="secondary" size="sm">
                        Xem bài
                      </LinkButton>
                    )}
                    {t.inProgressId ? (
                      <LinkButton href={`/kiem-tra/lam/${t.inProgressId}`} size="sm">
                        Làm tiếp
                      </LinkButton>
                    ) : avail === 'open' && t.attempts < t.maxAttempts ? (
                      <LinkButton href={`/kiem-tra/${t.id}`} size="sm">
                        {t.attempts ? 'Làm lại' : 'Vào làm bài'}
                      </LinkButton>
                    ) : null}
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </>,
  );
}

export async function testIntroPage(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const id = intParam(ctx, 'id');
  const t = await studentTest(ctx.db, id, user.id);
  if (!t) throw new HttpError(404, 'Không tìm thấy đề kiểm tra hoặc đề không được giao cho lớp của em.');
  if (t.inProgressId) return redirect(`/kiem-tra/lam/${t.inProgressId}`);
  const avail = testAvailability(t);
  const canStart = avail === 'open' && t.attempts < t.maxAttempts;
  return page(
    ctx,
    { title: t.title },
    <div className="mx-auto max-w-2xl">
      <PageTitle crumbs={[{ href: '/kiem-tra', label: 'Kiểm tra' }, { label: t.title }]} title={t.title} />
      <Panel className="p-6">
        {t.description && <p className="mb-4 text-[15px] text-ink-2">{t.description}</p>}
        <dl className="grid grid-cols-2 gap-4 text-[15px]">
          <div>
            <dt className="text-ink-3">Số câu</dt>
            <dd className="text-xl font-bold">{t.questionCount}</dd>
          </div>
          <div>
            <dt className="text-ink-3">Thời gian</dt>
            <dd className="text-xl font-bold">{t.durationMinutes ? `${t.durationMinutes} phút` : 'Không giới hạn'}</dd>
          </div>
          <div>
            <dt className="text-ink-3">Số lần làm</dt>
            <dd className="text-xl font-bold">
              {t.attempts}/{t.maxAttempts}
            </dd>
          </div>
          <div>
            <dt className="text-ink-3">Trạng thái</dt>
            <dd className="mt-1">{availabilityBadge(t)}</dd>
          </div>
        </dl>
        <ul className="mt-5 list-disc space-y-1 pl-5 text-[14px] text-ink-2">
          <li>Bài làm được lưu nháp tự động; nếu mất mạng em có thể mở lại và làm tiếp.</li>
          {t.durationMinutes && <li>Đồng hồ chạy theo giờ máy chủ, hết giờ bài tự nộp.</li>}
          <li>Sau khi nộp không sửa được bài.</li>
        </ul>
        {canStart ? (
          <PostForm action={`/kiem-tra/${t.id}/bat-dau`} className="mt-6">
            <Button size="lg">
              <LuClock aria-hidden="true" /> Bắt đầu làm bài
            </Button>
          </PostForm>
        ) : (
          <Notice tone="info" className="mt-6">
            {avail !== 'open' ? 'Đề hiện không mở.' : 'Em đã dùng hết số lần làm bài.'}
          </Notice>
        )}
      </Panel>
    </div>,
  );
}

export async function startTestAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const id = intParam(ctx, 'id');
  try {
    const resultId = await startAttempt(ctx.db, id, user.id);
    return redirect(`/kiem-tra/lam/${resultId}`);
  } catch (err) {
    if (err instanceof UserInputError) return redirect(`/kiem-tra/${id}`, { type: 'error', message: err.message }, ctx);
    throw err;
  }
}

async function ownAttempt(ctx: Ctx): Promise<AttemptRow> {
  const user = requireUser(ctx);
  const attempt = await getAttempt(ctx.db, intParam(ctx, 'id'));
  if (!attempt || attempt.studentId !== user.id) throw new HttpError(404, 'Không tìm thấy bài làm.');
  return attempt;
}

export async function takeTestPage(ctx: Ctx): Promise<Res> {
  const attempt = await ownAttempt(ctx);
  if (attempt.status !== 'in_progress') return redirect(`/kiem-tra/ket-qua/${attempt.id}`);
  const questions = await attemptQuestionViews(ctx.db, attempt.testId);
  return page(
    ctx,
    { title: attempt.title, wide: true },
    <Island
      name="TestRunner"
      props={{
        resultId: attempt.id,
        title: attempt.title,
        questions,
        deadline: attempt.deadlineAt ? attempt.deadlineAt.toISOString() : null,
        serverNow: new Date().toISOString(),
        draft: (attempt.draftAnswers ?? {}) as Record<string, AnswerValue>,
      }}
    />,
  );
}

export async function saveDraftApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ error: 'Phiên đăng nhập đã hết.' }, 401);
  const attempt = await ownAttempt(ctx);
  const body = (await ctx.json()) as { answers?: unknown };
  if (!body.answers || typeof body.answers !== 'object') return json({ error: 'Thiếu bài làm.' }, 400);
  try {
    await saveDraft(ctx.db, attempt, body.answers as Record<string, unknown>);
  } catch (err) {
    if (err instanceof UserInputError) return json({ error: err.message }, 409);
    throw err;
  }
  return json({ ok: true, savedAt: new Date().toISOString() });
}

export async function submitTestApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ error: 'Phiên đăng nhập đã hết. Đăng nhập lại – bài nháp vẫn được giữ.' }, 401);
  const attempt = await ownAttempt(ctx);
  const body = (await ctx.json()) as { answers?: unknown };
  const answers = body.answers && typeof body.answers === 'object' ? (body.answers as Record<string, unknown>) : null;
  try {
    await submitAttempt(ctx.db, attempt, answers);
  } catch (err) {
    if (err instanceof UserInputError) return json({ error: err.message, redirect: `/kiem-tra/ket-qua/${attempt.id}` }, 409);
    throw err;
  }
  ctx.setFlash({ type: 'success', message: 'Đã nộp bài.' });
  return json({ redirect: `/kiem-tra/ket-qua/${attempt.id}` });
}

function describeResponse(q: ResultQuestion): string {
  const r = q.response as { kind?: string; choice?: string; values?: Record<string, boolean>; text?: string } | null;
  if (!r || r.kind === 'empty') return '<em>Không trả lời</em>';
  if (r.kind === 'mcq') return `Chọn <strong>${escapeHtml(r.choice ?? '')}</strong>`;
  if (r.kind === 'true_false')
    return Object.entries(r.values ?? {})
      .sort()
      .map(([k, v]) => `${escapeHtml(k)}) ${v ? 'Đúng' : 'Sai'}`)
      .join('; ');
  return `<span class="whitespace-pre-wrap">${escapeHtml(r.text ?? '')}</span>`;
}

export function ResultQuestionList({ questions, reveal }: { questions: ResultQuestion[]; reveal: boolean }) {
  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <Panel key={q.id} className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-extrabold">Câu {i + 1}</h3>
              <Badge>{TYPE_LABELS[q.type]}</Badge>
            </div>
            <div className="flex items-center gap-2">
              {q.status === 'correct' && <Badge tone="tre">Đúng</Badge>}
              {q.status === 'partial' && <Badge tone="hl">Đúng một phần</Badge>}
              {q.status === 'incorrect' && <Badge tone="le">Chưa đúng</Badge>}
              {q.status === 'pending' && <Badge tone="cam">Chờ chấm</Badge>}
              <span className="text-[14px] font-semibold tabular-nums">
                {q.pointsAwarded === null ? '–' : formatNumber(q.pointsAwarded)}/{formatNumber(q.testPoints)} điểm
              </span>
            </div>
          </div>
          <Html html={q.stemHtml} className="prose-math mt-3" />
          {q.mediaHtml.map((h, k) => (
            <Html key={k} html={h} className="mt-2 flex justify-center" />
          ))}
          {q.options && (
            <ul className="mt-3 grid gap-2 md:grid-cols-2">
              {q.options.map((o) => (
                <li key={o.label} className={'flex gap-2 rounded-xl border px-3 py-2 ' + (reveal && q.correctChoice === o.label ? 'border-tre bg-tre-soft' : 'border-line')}>
                  <strong>{o.label}.</strong>
                  <Html html={o.html} className="prose-math" />
                </li>
              ))}
            </ul>
          )}
          {q.statements && (
            <ul className="mt-3 space-y-1.5">
              {q.statements.map((s) => (
                <li key={s.label} className="flex gap-2">
                  <strong>{s.label})</strong>
                  <Html html={s.html} className="prose-math flex-1" />
                  {reveal && q.correctValues && <span className="text-[14px] font-semibold text-tre">{q.correctValues[s.label] ? 'Đúng' : 'Sai'}</span>}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 rounded-xl bg-mist px-4 py-3 text-[15px]">
            <span className="text-ink-3">Bài làm: </span>
            <span dangerouslySetInnerHTML={{ __html: describeResponse(q) }} />
          </div>
          {reveal && q.acceptedHtml && (
            <p className="mt-2 text-[15px]">
              Đáp số đúng: <strong dangerouslySetInnerHTML={{ __html: q.acceptedHtml.join(' hoặc ') }} />
            </p>
          )}
          {q.feedback && (
            <p className="mt-2 rounded-xl border border-hl bg-hl-soft px-4 py-2 text-[15px]">
              <strong>Nhận xét của giáo viên:</strong> {q.feedback}
            </p>
          )}
          {reveal && q.solutionHtml && (
            <details className="mt-3">
              <summary className="font-semibold text-tim-800">Xem lời giải</summary>
              <Html html={q.solutionHtml} className="prose-math mt-2" />
            </details>
          )}
        </Panel>
      ))}
    </div>
  );
}

export async function testResultPage(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const attempt = await getAttempt(ctx.db, intParam(ctx, 'id'));
  if (!attempt) throw new HttpError(404);
  const isOwner = attempt.studentId === user.id;
  const isTeacher = user.role === 'admin' || attempt.testCreatedBy === user.id;
  if (!isOwner && !isTeacher) throw new HttpError(404);
  if (attempt.status === 'in_progress' && isOwner) return redirect(`/kiem-tra/lam/${attempt.id}`);
  const reveal = isTeacher || attempt.showAnswers;
  const questions = await resultDetails(ctx.db, attempt, reveal);
  const ten = attempt.score !== null && attempt.maxScore ? toTenScale(attempt.score, attempt.maxScore) : null;
  return page(
    ctx,
    { title: `Kết quả: ${attempt.title}` },
    <div className="mx-auto max-w-4xl">
      <PageTitle
        crumbs={isTeacher && !isOwner ? [{ href: `/giao-vien/de-kiem-tra/${attempt.testId}/ket-qua`, label: 'Kết quả đề' }, { label: attempt.studentName }] : [{ href: '/kiem-tra', label: 'Kiểm tra' }, { label: 'Kết quả' }]}
        title={attempt.title}
        sub={`${attempt.studentName} · lần ${attempt.attemptNo} · nộp lúc ${formatDateTime(attempt.submittedAt)}`}
        actions={isTeacher && attempt.pendingManual > 0 ? <LinkButton href={`/giao-vien/cham-bai/${attempt.id}`}>Chấm tự luận</LinkButton> : undefined}
      />
      <Panel className="mb-6 flex flex-wrap items-center gap-8 p-6">
        <div>
          <div className="text-[14px] text-ink-3">Điểm (thang 10)</div>
          <div className="text-[48px] font-extrabold leading-none text-tim-700">{ten === null ? '–' : formatNumber(ten)}</div>
        </div>
        <div className="text-[15px] text-ink-2">
          <div>
            Điểm thô: {formatNumber(attempt.score ?? 0)}/{formatNumber(attempt.maxScore ?? 0)}
          </div>
          <div>Câu đúng: {questions.filter((q) => q.status === 'correct').length}/{questions.length}</div>
          {attempt.pendingManual > 0 && <div className="font-semibold text-cam">{attempt.pendingManual} câu tự luận chờ giáo viên chấm – điểm có thể thay đổi.</div>}
        </div>
      </Panel>
      {!reveal && <Notice className="mb-4">Thầy cô chọn không hiện đáp án cho đề này.</Notice>}
      <ResultQuestionList questions={questions} reveal={reveal} />
    </div>,
  );
}
