import { useEffect, useRef, useState } from 'react';
import type { QuestionView } from '../domain/questions';
import { LEVEL_LABELS, TYPE_LABELS } from '../shared/labels';
import { AnswerInput, QuestionBody, csrfToken, isAnswered, isComplete, postJson, type AnswerValue, type Reveal } from './shared';

export interface FeedbackData extends Reveal {
  status: 'correct' | 'partial' | 'incorrect' | 'pending';
  score: number | null;
  correctCount?: number;
  note?: string;
  solutionHtml?: string;
  xpGained: number;
  achievements: { code: string; name: string; description: string }[];
  review?: { label: string; href: string; knowledgeHtml: string | null; lessonHref: string | null };
  rubricHtml?: string;
}

export type RunnerQuestion = QuestionView & { review?: { label: string; href: string } };

export interface RunnerAdapter {
  check(q: RunnerQuestion, answer: AnswerValue): Promise<FeedbackData>;
  save?(answers: Record<string, AnswerValue>, flagged: number[]): Promise<void>;
  submit(answers: Record<string, AnswerValue>, auto: boolean): Promise<void>;
  upload?(file: File): Promise<number>;
}

export interface SessionRunnerProps {
  sessionId: number;
  title: string;
  mode: 'practice' | 'exam';
  questions: RunnerQuestion[];
  deadline: string | null;
  serverNow: string;
  initialAnswers: Record<string, AnswerValue>;
  initialFlagged: number[];
  initialFeedback: Record<string, FeedbackData>;
  backHref: string;
}

function fmtRemaining(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function cls(...p: (string | false | undefined | null)[]) {
  return p.filter(Boolean).join(' ');
}

async function uploadImage(file: File): Promise<number> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/bai-lam/anh', { method: 'POST', body: fd, headers: { 'X-CSRF-Token': csrfToken(), Accept: 'application/json' }, credentials: 'same-origin' });
  const data = (await res.json().catch(() => null)) as { id?: number; error?: string } | null;
  if (!res.ok || !data?.id) throw new Error(data?.error ?? 'Không tải được ảnh. Thử lại.');
  return data.id;
}

/** Bản trực tuyến: chấm và lưu trên máy chủ. */
export default function SessionRunner(props: SessionRunnerProps) {
  const adapter: RunnerAdapter = {
    check: (q, answer) => postJson<FeedbackData>(`/api/luyen-tap/phien/${props.sessionId}/kiem-tra`, { questionId: q.id, response: answer }),
    save: (answers, flagged) => postJson(`/api/luyen-tap/phien/${props.sessionId}/luu`, { answers, flagged }),
    submit: async (answers, auto) => {
      const res = await postJson<{ redirect: string }>(`/api/luyen-tap/phien/${props.sessionId}/nop`, { answers, auto });
      window.location.href = res.redirect;
    },
    upload: uploadImage,
  };
  return <SessionCore {...props} adapter={adapter} />;
}

export function statusTitle(f: FeedbackData, total = 4) {
  switch (f.status) {
    case 'correct':
      return 'Chính xác!';
    case 'partial':
      return `Đúng ${f.correctCount ?? 0}/${total} ý.`;
    case 'pending':
      return 'Đã lưu bài làm – đối chiếu với lời giải tham khảo.';
    default:
      return 'Chưa đúng.';
  }
}

/** Phản hồi sau khi kiểm tra một câu: đúng/sai, vì sao, kiến thức cần ôn, lời giải. */
export function FeedbackPanel({ q, fb, answer }: { q: RunnerQuestion; fb: FeedbackData; answer?: AnswerValue }) {
  const [open, setOpen] = useState(fb.status === 'pending');
  const chosen = q.type === 'mcq' ? answer?.choice : undefined;
  const whyCorrect = q.type === 'mcq' && fb.correctChoice ? fb.notesHtml?.[fb.correctChoice] : undefined;
  const whyWrong = chosen && chosen !== fb.correctChoice ? fb.notesHtml?.[chosen] : undefined;
  const wrong = fb.status === 'incorrect' || fb.status === 'partial';
  const otherNotes = q.type === 'mcq' && fb.notesHtml ? Object.entries(fb.notesHtml).sort(([a], [b]) => a.localeCompare(b)) : [];
  return (
    <div
      role="status"
      className={cls(
        'mt-6 rounded-2xl border-2 p-4 md:p-5',
        fb.status === 'correct' ? 'border-tre bg-tre-soft' : fb.status === 'pending' ? 'border-tim-300 bg-tim-50' : fb.status === 'partial' ? 'border-hl bg-hl-soft' : 'border-le bg-le-soft',
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <strong className="text-lg">{statusTitle(fb, q.statements?.length)}</strong>
        {fb.xpGained > 0 && <span className="rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-[#7a5a00]">+{fb.xpGained} XP</span>}
      </div>
      {fb.note && <p className="mt-1 text-[15px] text-ink-2">{fb.note}</p>}
      {fb.achievements.length > 0 && (
        <p className="mt-2 text-[15px]">
          Em vừa nhận huy hiệu: <strong>{fb.achievements.map((a) => a.name).join(', ')}</strong>
        </p>
      )}
      {fb.status === 'correct' && whyCorrect && (
        <p className="mt-3 rounded-xl bg-white/80 px-4 py-3 text-[15px]">
          <strong>Vì sao đúng:</strong> <span className="prose-math" dangerouslySetInnerHTML={{ __html: whyCorrect }} />
        </p>
      )}
      {whyWrong && (
        <p className="mt-3 rounded-xl bg-white/80 px-4 py-3 text-[15px]">
          <strong>Phương án {chosen} chưa đúng vì:</strong> <span className="prose-math" dangerouslySetInnerHTML={{ __html: whyWrong }} />
        </p>
      )}
      {wrong && fb.review && (
        <div className="mt-3 rounded-xl bg-white/80 px-4 py-3 text-[15px]">
          <strong>Kiến thức cần xem lại – {fb.review.label}</strong>
          {fb.review.knowledgeHtml && <div className="prose-math mt-1 text-[15px] text-ink-2" dangerouslySetInnerHTML={{ __html: fb.review.knowledgeHtml }} />}
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <a href={fb.review.href} className="font-semibold text-tim-700 underline underline-offset-2">
              Ôn phương pháp và ví dụ của dạng này
            </a>
            {fb.review.lessonHref && (
              <a href={fb.review.lessonHref} className="font-semibold text-tim-700 underline underline-offset-2">
                Mở lại bài học
              </a>
            )}
          </p>
        </div>
      )}
      {(fb.solutionHtml || otherNotes.length > 0 || fb.rubricHtml) && (
        <div className="mt-3">
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="font-semibold text-tim-700 underline-offset-2 hover:underline">
            {open ? 'Ẩn lời giải' : fb.status === 'pending' ? 'Xem lời giải tham khảo' : 'Xem lời giải'}
          </button>
          {open && (
            <div className="mt-2 space-y-3 rounded-xl bg-white/90 p-4">
              {fb.solutionHtml && (
                <div>
                  <div className="mb-1 text-sm font-bold text-ink-2">{fb.status === 'pending' ? 'Lời giải tham khảo' : 'Lời giải'}</div>
                  <div className="prose-math" dangerouslySetInnerHTML={{ __html: fb.solutionHtml }} />
                </div>
              )}
              {otherNotes.length > 0 && (
                <div>
                  <div className="mb-1 text-sm font-bold text-ink-2">Giải thích các phương án</div>
                  <ul className="space-y-1 text-[15px]">
                    {otherNotes.map(([label, html]) => (
                      <li key={label}>
                        <strong className={label === fb.correctChoice ? 'text-tre' : 'text-ink-2'}>{label}.</strong> <span className="prose-math" dangerouslySetInnerHTML={{ __html: html }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {fb.rubricHtml && (
                <div>
                  <div className="mb-1 text-sm font-bold text-ink-2">Hướng dẫn chấm</div>
                  <div className="prose-math text-[15px]" dangerouslySetInnerHTML={{ __html: fb.rubricHtml }} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Giao diện làm bài dùng chung (trực tuyến và bản HTML). */
export function SessionCore({
  title,
  mode,
  questions,
  deadline,
  serverNow,
  initialAnswers,
  initialFlagged,
  initialFeedback,
  backHref,
  adapter,
  submitLabel,
}: Omit<SessionRunnerProps, 'sessionId'> & { adapter: RunnerAdapter; submitLabel?: string }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(initialAnswers ?? {});
  const [flagged, setFlagged] = useState<number[]>(initialFlagged ?? []);
  const [feedback, setFeedback] = useState<Record<string, FeedbackData>>(initialFeedback ?? {});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [large, setLarge] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [remaining, setRemaining] = useState<number | null>(deadline ? new Date(deadline).getTime() - new Date(serverNow).getTime() : null);
  const dirty = useRef(false);
  const submitted = useRef(false);
  const latest = useRef(answers);
  latest.current = answers;

  const total = questions.length;
  const q = questions[index];
  const key = q ? String(q.id) : '';
  const fb = q ? feedback[key] : undefined;
  const answeredCount = questions.filter((x) => isAnswered(x, answers[String(x.id)]) || feedback[String(x.id)]).length;
  const checkedCount = Object.keys(feedback).length;
  const practice = mode === 'practice';

  async function submit(auto = false) {
    if (submitted.current) return;
    submitted.current = true;
    setSubmitting(true);
    setError(null);
    try {
      await adapter.submit(latest.current, auto);
    } catch (err) {
      submitted.current = false;
      setSubmitting(false);
      setError((err as Error).message);
    }
  }

  // Đồng hồ đếm ngược theo giờ máy chủ; hết giờ tự nộp
  useEffect(() => {
    if (!deadline) return;
    const offset = new Date(serverNow).getTime() - Date.now();
    const end = new Date(deadline).getTime();
    const tick = () => {
      const left = end - (Date.now() + offset);
      setRemaining(left);
      if (left <= 0) void submit(true);
    };
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tự lưu bài làm và câu đánh dấu
  useEffect(() => {
    if (!dirty.current || !adapter.save) return;
    const t = window.setTimeout(async () => {
      setSaveState('saving');
      try {
        await adapter.save!(latest.current, flagged);
        setSaveState('saved');
      } catch {
        setSaveState('error');
      }
    }, 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, flagged]);

  // Nhắc khi rời trang lúc chưa nộp
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!submitted.current && dirty.current) e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  // Phím ← → để chuyển câu (thuận tiện khi trình chiếu)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(total - 1, i + 1));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  function update(v: AnswerValue) {
    dirty.current = true;
    setAnswers((a) => ({ ...a, [key]: v }));
  }

  function toggleFlag() {
    dirty.current = true;
    setFlagged((f) => (f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id]));
  }

  async function check() {
    if (!q || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await adapter.check(q, answers[key] ?? {});
      setFeedback((f) => ({ ...f, [key]: res }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function go(i: number) {
    setIndex(Math.max(0, Math.min(total - 1, i)));
    setNavOpen(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!q) return null;
  const low = remaining !== null && remaining < 5 * 60_000;
  const isFlagged = flagged.includes(q.id);
  const complete = isComplete(q, answers[key]);
  const unanswered = total - answeredCount;

  const navGrid = (
    <div>
      <ol className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-5" aria-label="Danh sách câu">
        {questions.map((x, i) => {
          const k = String(x.id);
          const f = feedback[k];
          const done = isAnswered(x, answers[k]) || !!f;
          const fl = flagged.includes(x.id);
          return (
            <li key={x.id}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index ? 'step' : undefined}
                aria-label={`Câu ${i + 1}${f ? (f.status === 'correct' ? ', đúng' : f.status === 'incorrect' ? ', chưa đúng' : f.status === 'pending' ? ', chờ chấm' : ', đúng một phần') : done ? ', đã làm' : ', chưa làm'}${fl ? ', đánh dấu xem lại' : ''}`}
                className={cls(
                  'relative flex h-10 w-full items-center justify-center rounded-lg text-sm font-bold',
                  i === index && 'ring-2 ring-tim-700 ring-offset-2',
                  f ? (f.status === 'correct' ? 'bg-tre text-white' : f.status === 'incorrect' ? 'bg-le text-white' : f.status === 'pending' ? 'bg-tim-300 text-white' : 'bg-hl text-ink') : done ? 'bg-tim-700 text-white' : 'bg-mist text-ink-3 hover:bg-tim-50',
                )}
              >
                {i + 1}
                {fl && <span aria-hidden="true" className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#f59e0b]" />}
              </button>
            </li>
          );
        })}
      </ol>
      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-ink-3">
        <li className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-tim-700" /> Đã làm
        </li>
        <li className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-mist" /> Chưa làm
        </li>
        <li className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-[#f59e0b]" /> Xem lại
        </li>
        {practice && (
          <>
            <li className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-tre" /> Đúng
            </li>
            <li className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-le" /> Sai
            </li>
          </>
        )}
      </ul>
    </div>
  );

  return (
    <div className={cls('session-runner', large && 'runner-large')}>
      <div className="sticky top-14 z-20 -mx-4 mb-5 border-b border-line bg-white/95 px-4 py-3 backdrop-blur md:top-16 md:mx-0 md:rounded-2xl md:border">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="truncate font-bold">{title}</div>
            <div className="text-[13px] text-ink-3">
              {total} câu · Đã làm {answeredCount} · Chưa làm {unanswered}
              {flagged.length > 0 && ` · Xem lại ${flagged.length}`}
              {saveState === 'saving' && ' · đang lưu…'}
              {saveState === 'saved' && ' · đã lưu'}
              {saveState === 'error' && ' · chưa lưu được, kiểm tra mạng'}
            </div>
          </div>
          {remaining !== null && (
            <div role="timer" aria-label="Thời gian còn lại" className={cls('rounded-xl px-3 py-1.5 font-mono text-lg font-bold tabular-nums', low ? 'bg-le text-white' : 'bg-tim-50 text-tim-800')}>
              {fmtRemaining(remaining)}
            </div>
          )}
          <button type="button" onClick={() => setLarge((v) => !v)} aria-pressed={large} className="rounded-xl border border-line-2 bg-white px-3 py-2 text-[14px] font-semibold text-ink-2 hover:border-tim-300">
            {large ? 'Chữ thường' : 'Chữ lớn'}
          </button>
          <button type="button" onClick={() => setConfirming(true)} disabled={submitting} className="rounded-xl bg-tim-700 px-5 py-2.5 font-semibold text-white hover:bg-tim-800 disabled:opacity-50">
            {submitLabel ?? (practice ? 'Kết thúc' : 'Nộp bài')}
          </button>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist" role="progressbar" aria-label="Tiến độ làm bài" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answeredCount}>
          <div className="h-full rounded-full bg-tim-700 transition-all" style={{ width: `${total ? (answeredCount / total) * 100 : 0}%` }} />
        </div>
      </div>

      {confirming && (
        <div role="alertdialog" aria-labelledby="confirm-title" className="mb-5 rounded-2xl border-2 border-tim-700 bg-tim-50 p-5">
          <h2 id="confirm-title" className="text-lg font-bold">
            {practice ? 'Kết thúc lượt luyện tập?' : 'Nộp bài ngay?'}
          </h2>
          <p className="mt-1 text-[15px] text-ink-2">
            {unanswered > 0 ? `Em còn ${unanswered} câu chưa làm${practice ? '' : ' (tính là chưa làm)'}.` : 'Em đã làm tất cả các câu.'}
            {flagged.length > 0 && ` Có ${flagged.length} câu em đánh dấu cần xem lại.`}
            {practice && checkedCount < answeredCount ? ' Các câu đã làm nhưng chưa bấm "Kiểm tra" sẽ được chấm khi kết thúc.' : ''} Sau khi {practice ? 'kết thúc' : 'nộp'} sẽ không sửa được bài.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => submit(false)} disabled={submitting} className="rounded-xl bg-tim-700 px-5 py-2.5 font-semibold text-white hover:bg-tim-800 disabled:opacity-50">
              {submitting ? 'Đang chấm…' : practice ? 'Kết thúc và xem kết quả' : 'Nộp bài'}
            </button>
            <button type="button" onClick={() => setConfirming(false)} disabled={submitting} className="rounded-xl border-2 border-tim-700 bg-white px-5 py-2.5 font-semibold text-tim-800">
              Làm tiếp
            </button>
          </div>
        </div>
      )}
      {error && (
        <p role="alert" className="mb-5 rounded-xl border border-[#f6c4c6] bg-le-soft px-4 py-3 text-[15px] text-[#9b1c22]">
          {error}
        </p>
      )}

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-6">
        <div className="min-w-0">
          <div className="mb-4 lg:hidden">
            <button type="button" onClick={() => setNavOpen((v) => !v)} aria-expanded={navOpen} className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-left text-[15px] font-semibold">
              Danh sách câu ({index + 1}/{total}) {navOpen ? '▲' : '▼'}
            </button>
            {navOpen && <div className="mt-2 rounded-2xl border border-line bg-white p-4">{navGrid}</div>}
          </div>

          <article className="rounded-[22px] border border-line bg-white p-5 md:p-8" aria-labelledby={`q-title-${q.id}`}>
            <header className="mb-4 flex flex-wrap items-center gap-2 text-[13px]">
              <h2 id={`q-title-${q.id}`} className="mr-1 text-lg font-extrabold text-ink">
                Câu {index + 1}/{total}
              </h2>
              <span className="rounded-md bg-tim-50 px-2 py-0.5 font-semibold text-tim-700">{TYPE_LABELS[q.type]}</span>
              <span className="rounded-md bg-mist px-2 py-0.5 font-semibold text-ink-2">{LEVEL_LABELS[q.level]}</span>
              <button
                type="button"
                onClick={toggleFlag}
                aria-pressed={isFlagged}
                className={cls('ml-auto rounded-lg border px-2.5 py-1 font-semibold', isFlagged ? 'border-[#f59e0b] bg-[#fff4dc] text-[#7a4b00]' : 'border-line-2 bg-white text-ink-2 hover:border-tim-300')}
              >
                {isFlagged ? '★ Đã đánh dấu xem lại' : '☆ Đánh dấu xem lại'}
              </button>
            </header>

            <QuestionBody q={q} />

            <div className="mt-6">
              <AnswerInput q={q} value={answers[key]} disabled={!!fb || busy || submitting} reveal={fb} onChange={update} onUpload={adapter.upload} />
            </div>

            {practice && q.hintHtml && !fb && (
              <div className="mt-4">
                {showHint[q.id] ? (
                  <div className="rounded-xl border border-hl bg-hl-soft px-4 py-3">
                    <div className="text-sm font-bold">Gợi ý</div>
                    <div className="prose-math text-[15px]" dangerouslySetInnerHTML={{ __html: q.hintHtml }} />
                  </div>
                ) : (
                  <button type="button" className="text-[15px] font-semibold text-tim-700 underline-offset-2 hover:underline" onClick={() => setShowHint((h) => ({ ...h, [q.id]: true }))}>
                    Xem gợi ý
                  </button>
                )}
              </div>
            )}

            {fb && <FeedbackPanel q={q} fb={fb} answer={answers[key]} />}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => go(index - 1)} disabled={index === 0} className="rounded-xl border-2 border-line-2 bg-white px-4 py-2.5 font-semibold text-ink-2 hover:border-tim-300 disabled:opacity-40">
                ← Câu trước
              </button>
              {practice && !fb && (
                <button
                  type="button"
                  onClick={check}
                  disabled={!complete || busy || submitting}
                  className="rounded-xl bg-tim-700 px-6 py-2.5 font-semibold text-white shadow-[0_2px_0_0_#1e154b] hover:bg-tim-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? 'Đang chấm…' : q.type === 'essay' || q.type === 'geometry_essay' ? 'Gửi bài làm' : 'Kiểm tra'}
                </button>
              )}
              {index + 1 < total ? (
                <button type="button" onClick={() => go(index + 1)} className={cls('rounded-xl px-5 py-2.5 font-semibold', practice && !fb ? 'border-2 border-line-2 bg-white text-ink-2 hover:border-tim-300' : 'bg-tim-700 text-white hover:bg-tim-800')}>
                  Câu tiếp →
                </button>
              ) : (
                <button type="button" onClick={() => setConfirming(true)} className="rounded-xl bg-tim-700 px-5 py-2.5 font-semibold text-white hover:bg-tim-800">
                  {practice ? 'Kết thúc và xem kết quả' : 'Nộp bài'}
                </button>
              )}
              {practice && !fb && !complete && <span className="text-[14px] text-ink-3">{q.type === 'true_false' ? 'Chọn Đúng hoặc Sai cho cả 4 ý rồi bấm Kiểm tra.' : 'Chọn hoặc nhập câu trả lời rồi bấm Kiểm tra.'}</span>}
            </div>
          </article>
          <p className="mt-3 text-center text-[13px] text-ink-3">
            Mẹo: dùng phím ← → để chuyển câu.{' '}
            <a href={backHref} className="underline">
              Thoát (bài làm đã được lưu)
            </a>
          </p>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-44 rounded-2xl border border-line bg-white p-4">
            <div className="mb-3 text-sm font-bold">Danh sách câu</div>
            {navGrid}
          </div>
        </aside>
      </div>
    </div>
  );
}
