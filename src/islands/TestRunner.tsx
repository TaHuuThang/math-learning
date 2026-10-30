import { useEffect, useRef, useState } from 'react';
import type { QuestionView } from '../domain/questions';
import { TYPE_LABELS } from '../shared/labels';
import { AnswerInput, QuestionBody, isAnswered, postJson, type AnswerValue } from './shared';

export interface TestRunnerProps {
  resultId: number;
  title: string;
  questions: (QuestionView & { testPoints: number })[];
  deadline: string | null;
  serverNow: string;
  draft: Record<string, AnswerValue>;
}

function fmtRemaining(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

export default function TestRunner({ resultId, title, questions, deadline, serverNow, draft }: TestRunnerProps) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(draft ?? {});
  const [remaining, setRemaining] = useState<number | null>(deadline ? new Date(deadline).getTime() - new Date(serverNow).getTime() : null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const offset = useRef(0);
  const dirty = useRef(false);
  const latest = useRef(answers);
  const submitted = useRef(false);
  latest.current = answers;

  const answeredCount = questions.filter((q) => isAnswered(q, answers[String(q.id)])).length;

  async function submit(auto = false) {
    if (submitted.current) return;
    submitted.current = true;
    setSubmitting(true);
    setError(null);
    try {
      const res = await postJson<{ redirect: string }>(`/api/kiem-tra/nop/${resultId}`, { answers: latest.current, auto });
      window.location.href = res.redirect;
    } catch (err) {
      submitted.current = false;
      setSubmitting(false);
      setError((err as Error).message);
    }
  }

  // Đồng hồ đếm ngược theo giờ máy chủ
  useEffect(() => {
    if (!deadline) return;
    offset.current = new Date(serverNow).getTime() - Date.now();
    const end = new Date(deadline).getTime();
    const tick = () => {
      const left = end - (Date.now() + offset.current);
      setRemaining(left);
      if (left <= 0) void submit(true);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tự lưu nháp 1,5 giây sau lần sửa cuối
  useEffect(() => {
    if (!dirty.current) return;
    const id = window.setTimeout(async () => {
      setSaveState('saving');
      try {
        await postJson(`/api/kiem-tra/luu/${resultId}`, { answers: latest.current });
        setSaveState('saved');
      } catch {
        setSaveState('error');
      }
    }, 1500);
    return () => window.clearTimeout(id);
  }, [answers, resultId]);

  // Nhắc khi rời trang lúc chưa nộp
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!submitted.current) e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  function update(qid: number, v: AnswerValue) {
    dirty.current = true;
    setAnswers((a) => ({ ...a, [String(qid)]: v }));
  }

  const low = remaining !== null && remaining < 5 * 60_000;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8">
      <div>
        <div className="sticky top-16 z-10 -mx-4 mb-5 flex flex-wrap items-center gap-3 border-b border-line bg-white/95 px-4 py-3 backdrop-blur md:mx-0 md:rounded-2xl md:border">
          <div className="min-w-0 flex-1">
            <div className="truncate font-bold">{title}</div>
            <div className="text-[13px] text-ink-3">
              Đã làm {answeredCount}/{questions.length} câu
              {saveState === 'saving' && ' – đang lưu…'}
              {saveState === 'saved' && ' – đã lưu nháp'}
              {saveState === 'error' && ' – chưa lưu được, kiểm tra mạng'}
            </div>
          </div>
          {remaining !== null && (
            <div
              className={['rounded-xl px-3 py-1.5 font-mono text-lg font-bold tabular-nums', low ? 'bg-le text-white' : 'bg-tim-50 text-tim-800'].join(' ')}
              role="timer"
              aria-label="Thời gian còn lại"
            >
              {fmtRemaining(remaining)}
            </div>
          )}
          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={submitting}
            className="rounded-xl bg-tim-700 px-5 py-2.5 font-semibold text-white hover:bg-tim-800 disabled:opacity-50"
          >
            Nộp bài
          </button>
        </div>

        {confirming && (
          <div role="alertdialog" aria-labelledby="confirm-title" className="mb-5 rounded-2xl border-2 border-tim-700 bg-tim-50 p-5">
            <h2 id="confirm-title" className="text-lg font-bold">
              Nộp bài ngay?
            </h2>
            <p className="mt-1 text-[15px] text-ink-2">
              {answeredCount < questions.length
                ? `Em còn ${questions.length - answeredCount} câu chưa làm. Sau khi nộp sẽ không sửa được bài.`
                : 'Em đã làm tất cả các câu. Sau khi nộp sẽ không sửa được bài.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => submit(false)} disabled={submitting} className="rounded-xl bg-tim-700 px-5 py-2.5 font-semibold text-white hover:bg-tim-800 disabled:opacity-50">
                {submitting ? 'Đang nộp…' : 'Nộp bài'}
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

        <div className="space-y-5">
          {questions.map((q, i) => (
            <article key={q.id} id={`cau-${i + 1}`} className="scroll-mt-36 rounded-[22px] border border-line bg-white p-5 md:p-7">
              <header className="mb-3 flex flex-wrap items-center gap-2 text-[13px]">
                <h2 className="mr-1 text-lg font-extrabold">Câu {i + 1}</h2>
                <span className="rounded-md bg-tim-50 px-2 py-0.5 font-semibold text-tim-700">{TYPE_LABELS[q.type]}</span>
                <span className="text-ink-3">{q.testPoints.toLocaleString('vi-VN')} điểm</span>
              </header>
              <QuestionBody q={q} />
              <div className="mt-5">
                <AnswerInput q={q} value={answers[String(q.id)]} onChange={(v) => update(q.id, v)} disabled={submitting} />
              </div>
            </article>
          ))}
        </div>
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-line bg-white p-4">
          <div className="mb-3 text-sm font-bold">Danh sách câu</div>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) => (
              <a
                key={q.id}
                href={`#cau-${i + 1}`}
                className={[
                  'flex h-9 items-center justify-center rounded-lg text-sm font-bold',
                  isAnswered(q, answers[String(q.id)]) ? 'bg-tim-700 text-white' : 'bg-mist text-ink-3 hover:bg-tim-50',
                ].join(' ')}
              >
                {i + 1}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
