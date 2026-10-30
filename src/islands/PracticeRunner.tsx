import { useState } from 'react';
import type { QuestionView } from '../domain/questions';
import { LEVEL_LABELS, TYPE_LABELS } from '../shared/labels';
import { AnswerInput, QuestionBody, isComplete, postJson, type AnswerValue, type Reveal } from './shared';

export interface Feedback extends Reveal {
  status: 'correct' | 'partial' | 'incorrect' | 'pending';
  score: number | null;
  correctCount?: number;
  solutionHtml?: string;
  xpGained: number;
  achievements: { code: string; name: string; description: string }[];
}

export interface PracticeRunnerProps {
  questions: QuestionView[];
  context: 'practice' | 'challenge';
  restartHref: string;
  backHref: string;
  backLabel: string;
}

export type GradeFn = (q: QuestionView, answer: AnswerValue, context: 'practice' | 'challenge') => Promise<Feedback>;

const serverGrade: GradeFn = (q, answer, context) => postJson<Feedback>('/api/luyen-tap/tra-loi', { questionId: q.id, response: answer, context });

function statusText(f: Feedback, total: number | undefined, pendingText: string) {
  switch (f.status) {
    case 'correct':
      return 'Chính xác!';
    case 'partial':
      return `Đúng ${f.correctCount ?? 0}/${total ?? 4} ý.`;
    case 'pending':
      return pendingText;
    default:
      return 'Chưa đúng.';
  }
}

export default function PracticeRunner(props: PracticeRunnerProps) {
  return <PracticeCore {...props} grade={serverGrade} pendingText="Đã gửi bài làm – giáo viên sẽ chấm." pendingSummary="câu tự luận đang chờ giáo viên chấm." />;
}

/** Giao diện luyện tập dùng chung: bản trực tuyến chấm trên máy chủ, bản HTML chấm ngay trong trình duyệt. */
export function PracticeCore({
  questions,
  context,
  restartHref,
  backHref,
  backLabel,
  grade,
  pendingText,
  pendingSummary,
}: PracticeRunnerProps & { grade: GradeFn; pendingText: string; pendingSummary: string }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [feedback, setFeedback] = useState<Record<number, Feedback>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = questions[index];
  const fb = q ? feedback[q.id] : undefined;
  const total = questions.length;

  async function check() {
    if (!q || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await grade(q, answers[q.id] ?? {}, context);
      setFeedback((f) => ({ ...f, [q.id]: res }));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    const list = Object.values(feedback);
    const graded = list.filter((f) => f.status !== 'pending');
    const correct = graded.filter((f) => f.status === 'correct').length;
    const xp = list.reduce((s, f) => s + f.xpGained, 0);
    const badges = list.flatMap((f) => f.achievements);
    return (
      <div className="rounded-[22px] border border-line bg-white p-6 md:p-10">
        <h2 className="text-2xl font-extrabold">Kết quả lượt luyện tập</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-tim-50 p-5">
            <div className="text-[13px] text-ink-3">Câu đúng</div>
            <div className="text-3xl font-extrabold text-tim-800">
              {correct}/{graded.length}
            </div>
          </div>
          <div className="rounded-2xl bg-tre-soft p-5">
            <div className="text-[13px] text-ink-3">Tỉ lệ chính xác</div>
            <div className="text-3xl font-extrabold text-tre">{graded.length ? Math.round((correct / graded.length) * 100) : 0}%</div>
          </div>
          <div className="rounded-2xl bg-hl-soft p-5">
            <div className="text-[13px] text-ink-3">Điểm kinh nghiệm nhận được</div>
            <div className="text-3xl font-extrabold text-[#7a5a00]">+{xp} XP</div>
          </div>
        </div>
        {list.length > graded.length && <p className="mt-4 text-[15px] text-ink-2">{list.length - graded.length} {pendingSummary}</p>}
        {badges.length > 0 && (
          <div className="mt-5 rounded-2xl border-2 border-hl bg-hl-soft p-4">
            <div className="font-bold">Huy hiệu mới</div>
            <ul className="mt-1 list-disc pl-5 text-[15px]">
              {badges.map((b) => (
                <li key={b.code}>
                  <strong>{b.name}</strong> – {b.description}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={restartHref} className="inline-flex items-center rounded-xl bg-tim-700 px-5 py-3 font-semibold text-white hover:bg-tim-800">
            Luyện thêm lượt mới
          </a>
          <a href={backHref} className="inline-flex items-center rounded-xl border-2 border-tim-700 px-5 py-3 font-semibold text-tim-800 hover:bg-tim-50">
            {backLabel}
          </a>
        </div>
      </div>
    );
  }

  if (!q) return null;
  const answered = isComplete(q, answers[q.id]);

  return (
    <div>
      <ol className="mb-5 flex flex-wrap gap-2" aria-label="Tiến độ lượt luyện tập">
        {questions.map((qq, i) => {
          const f = feedback[qq.id];
          return (
            <li key={qq.id}>
              <span
                aria-current={i === index ? 'step' : undefined}
                aria-label={`Câu ${i + 1}${f ? (f.status === 'correct' ? ': đúng' : f.status === 'incorrect' ? ': chưa đúng' : f.status === 'pending' ? ': chờ chấm' : ': đúng một phần') : ''}`}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold',
                  i === index && 'ring-2 ring-tim-700 ring-offset-2',
                  f?.status === 'correct' ? 'bg-tre text-white' : f?.status === 'incorrect' ? 'bg-le text-white' : f ? 'bg-hl text-ink' : i === index ? 'bg-white text-tim-800' : 'bg-tim-50 text-ink-3',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {i + 1}
              </span>
            </li>
          );
        })}
      </ol>

      <article className="rounded-[22px] border border-line bg-white p-5 md:p-8" aria-labelledby={`q-title-${q.id}`}>
        <header className="mb-4 flex flex-wrap items-center gap-2 text-[13px]">
          <h2 id={`q-title-${q.id}`} className="mr-2 text-lg font-extrabold text-ink">
            Câu {index + 1}/{total}
          </h2>
          <span className="rounded-md bg-tim-50 px-2 py-0.5 font-semibold text-tim-700">{TYPE_LABELS[q.type]}</span>
          <span className="rounded-md bg-mist px-2 py-0.5 font-semibold text-ink-2">{LEVEL_LABELS[q.level]}</span>
        </header>

        <QuestionBody q={q} />

        <div className="mt-6">
          <AnswerInput q={q} value={answers[q.id]} disabled={!!fb || busy} reveal={fb} onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} />
        </div>

        {q.hintHtml && !fb && (
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

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-[#f6c4c6] bg-le-soft px-4 py-3 text-[15px] text-[#9b1c22]">
            {error}
          </p>
        )}

        {fb && (
          <div
            role="status"
            className={[
              'mt-6 rounded-2xl border-2 p-4 md:p-5',
              fb.status === 'correct' ? 'border-tre bg-tre-soft' : fb.status === 'pending' ? 'border-tim-300 bg-tim-50' : fb.status === 'partial' ? 'border-hl bg-hl-soft' : 'border-le bg-le-soft',
            ].join(' ')}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong className="text-lg">{statusText(fb, q.statements?.length, pendingText)}</strong>
              {fb.xpGained > 0 && <span className="rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-[#7a5a00]">+{fb.xpGained} XP</span>}
            </div>
            {fb.achievements.length > 0 && (
              <p className="mt-2 text-[15px]">
                Em vừa nhận huy hiệu: <strong>{fb.achievements.map((a) => a.name).join(', ')}</strong>
              </p>
            )}
            {fb.solutionHtml && (
              <div className="mt-3 rounded-xl bg-white/80 p-4">
                <div className="mb-1 text-sm font-bold text-ink-2">Lời giải</div>
                <div className="prose-math" dangerouslySetInnerHTML={{ __html: fb.solutionHtml }} />
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!fb ? (
            <button
              type="button"
              onClick={check}
              disabled={!answered || busy}
              className="rounded-xl bg-tim-700 px-6 py-3 font-semibold text-white shadow-[0_2px_0_0_#1e154b] hover:bg-tim-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? 'Đang chấm…' : q.type === 'essay' || q.type === 'geometry_essay' ? 'Gửi bài làm' : 'Kiểm tra'}
            </button>
          ) : index + 1 < total ? (
            <button type="button" onClick={() => setIndex(index + 1)} className="rounded-xl bg-tim-700 px-6 py-3 font-semibold text-white hover:bg-tim-800">
              Câu tiếp theo
            </button>
          ) : (
            <button type="button" onClick={() => setDone(true)} className="rounded-xl bg-tim-700 px-6 py-3 font-semibold text-white hover:bg-tim-800">
              Xem kết quả
            </button>
          )}
          {!fb && !answered && <span className="text-[14px] text-ink-3">{q.type === 'true_false' ? 'Chọn Đúng hoặc Sai cho cả 4 ý.' : 'Chọn hoặc nhập câu trả lời để kiểm tra.'}</span>}
        </div>
      </article>
    </div>
  );
}
