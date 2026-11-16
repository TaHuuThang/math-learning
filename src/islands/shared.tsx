import type { QuestionView } from '../domain/questions';
import EssayInput from './EssayInput';

/** Câu trả lời phía trình duyệt (chưa kiểm tra) – máy chủ luôn kiểm tra lại. */
export type AnswerValue = { choice?: string; values?: Record<string, boolean>; text?: string; images?: number[] };

export interface Reveal {
  correctChoice?: string;
  correctValues?: Record<string, boolean>;
  acceptedHtml?: string[];
  /** Giải thích từng phương án (theo nhãn hiển thị) / từng nhận định. */
  notesHtml?: Record<string, string>;
}

export function csrfToken(): string {
  if (typeof document === 'undefined') return '';
  return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
}

export async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken(), Accept: 'application/json' },
    body: JSON.stringify(body),
    credentials: 'same-origin',
  });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* không phải JSON */
  }
  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error ?? `Lỗi ${res.status}. Kiểm tra kết nối mạng rồi thử lại.`;
    throw new Error(msg);
  }
  return data as T;
}

export function isAnswered(q: QuestionView, v: AnswerValue | undefined): boolean {
  if (!v) return false;
  if (q.type === 'mcq') return !!v.choice;
  if (q.type === 'true_false') return Object.keys(v.values ?? {}).length > 0;
  return !!v.text?.trim() || !!v.images?.length;
}

export function isComplete(q: QuestionView, v: AnswerValue | undefined): boolean {
  if (!v) return false;
  if (q.type === 'true_false') return Object.keys(v.values ?? {}).length === (q.statements?.length ?? 4);
  return isAnswered(q, v);
}

function cls(...p: (string | false | undefined | null)[]) {
  return p.filter(Boolean).join(' ');
}

export function QuestionBody({ q }: { q: QuestionView }) {
  return (
    <div className="space-y-3">
      <div className="prose-math text-[17px] leading-relaxed" dangerouslySetInnerHTML={{ __html: q.stemHtml }} />
      {q.mediaHtml.map((h, i) => (
        <div key={i} className="flex justify-center rounded-xl border border-line bg-white p-3" dangerouslySetInnerHTML={{ __html: h }} />
      ))}
    </div>
  );
}

export function AnswerInput({
  q,
  value,
  onChange,
  disabled,
  reveal,
  onUpload,
}: {
  q: QuestionView;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
  disabled?: boolean;
  reveal?: Reveal | null;
  onUpload?: (file: File) => Promise<number>;
}) {
  if (q.type === 'mcq') {
    return (
      <div className="grid gap-3 md:grid-cols-2" role="radiogroup" aria-label="Chọn phương án">
        {q.options!.map((o) => {
          const chosen = value?.choice === o.label;
          const isRight = reveal?.correctChoice === o.label;
          const isWrong = reveal && chosen && !isRight;
          return (
            <button
              key={o.label}
              type="button"
              role="radio"
              aria-checked={chosen}
              disabled={disabled}
              onClick={() => onChange({ choice: o.label })}
              className={cls(
                'flex items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left text-[16px] transition-colors',
                !reveal && chosen && 'border-tim-700 bg-tim-50',
                !reveal && !chosen && 'border-line bg-white hover:border-tim-300',
                reveal && isRight && 'border-tre bg-tre-soft',
                isWrong && 'border-le bg-le-soft',
                reveal && !isRight && !isWrong && 'border-line bg-white opacity-70',
                disabled && 'cursor-default',
              )}
            >
              <span
                className={cls(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[15px] font-bold',
                  reveal && isRight ? 'bg-tre text-white' : isWrong ? 'bg-le text-white' : chosen ? 'bg-tim-700 text-white' : 'bg-tim-50 text-tim-700',
                )}
              >
                {o.label}
              </span>
              <span className="prose-math min-w-0 pt-0.5" dangerouslySetInnerHTML={{ __html: o.html }} />
            </button>
          );
        })}
      </div>
    );
  }

  if (q.type === 'true_false') {
    const values = value?.values ?? {};
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        {q.statements!.map((s, i) => {
          const v = values[s.label];
          const correct = reveal?.correctValues?.[s.label];
          const ok = reveal && v !== undefined && v === correct;
          return (
            <div key={s.label} className={cls('flex flex-wrap items-center gap-3 px-4 py-3', i > 0 && 'border-t border-line', reveal && (ok ? 'bg-tre-soft/60' : 'bg-le-soft/50'))}>
              <span className="font-bold text-tim-700">{s.label})</span>
              <span className="min-w-[200px] flex-1">
                <span className="prose-math" dangerouslySetInnerHTML={{ __html: s.html }} />
                {reveal?.notesHtml?.[s.label] && (
                  <span className="mt-1 block text-[14px] text-ink-2">
                    <strong className={correct ? 'text-tre' : 'text-le'}>{correct ? 'Đúng' : 'Sai'}:</strong>{' '}
                    <span className="prose-math" dangerouslySetInnerHTML={{ __html: reveal.notesHtml[s.label] }} />
                  </span>
                )}
              </span>
              <div className="flex gap-2" role="radiogroup" aria-label={`Ý ${s.label}`}>
                {[true, false].map((b) => {
                  const chosen = v === b;
                  const isAnswer = reveal && correct === b;
                  return (
                    <button
                      key={String(b)}
                      type="button"
                      role="radio"
                      aria-checked={chosen}
                      disabled={disabled}
                      onClick={() => onChange({ values: { ...values, [s.label]: b } })}
                      className={cls(
                        'min-w-[64px] rounded-xl border-2 px-3 py-1.5 text-sm font-semibold',
                        chosen && !reveal && 'border-tim-700 bg-tim-700 text-white',
                        !chosen && !reveal && 'border-line-2 bg-white text-ink-2 hover:border-tim-300',
                        reveal && isAnswer && 'border-tre bg-tre text-white',
                        reveal && !isAnswer && chosen && 'border-le bg-le text-white',
                        reveal && !isAnswer && !chosen && 'border-line bg-white text-ink-3',
                      )}
                    >
                      {b ? 'Đúng' : 'Sai'}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (q.type === 'short_answer') {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-2" htmlFor={`ans-${q.id}`}>
          Đáp số
        </label>
        <div className="flex max-w-sm items-center gap-2">
          <input
            id={`ans-${q.id}`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            maxLength={100}
            disabled={disabled}
            value={value?.text ?? ''}
            onChange={(e) => onChange({ text: e.target.value })}
            className={cls(
              'w-full rounded-xl border-2 bg-white px-4 py-2.5 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-tim-100',
              reveal ? 'border-line' : 'border-line-2 focus:border-tim-500',
            )}
            placeholder="Ví dụ: -1,5 · 3/4 · 2x + 1 · x = 1; x = -2"
          />
          {q.unit && <span className="text-lg font-semibold text-ink-2">{q.unit}</span>}
        </div>
        <p className="mt-1.5 text-[13px] text-ink-3">
          Số thập phân dùng dấu phẩy hoặc dấu chấm; phân số viết a/b; lũy thừa viết x^2; căn viết √ hoặc sqrt(); nhiều giá trị cách nhau bởi dấu ;
          {q.unit ? ` · Đơn vị: ${q.unit} (ghi đơn vị khác cùng loại cũng được, ví dụ m thay cho cm).` : ''}
        </p>
        {reveal?.acceptedHtml && (
          <p className="mt-2 text-[15px]">
            Đáp số đúng: <strong dangerouslySetInnerHTML={{ __html: reveal.acceptedHtml.join(' hoặc ') }} />
            {q.unit ? ` ${q.unit}` : ''}
          </p>
        )}
      </div>
    );
  }

  return <EssayInput id={`ans-${q.id}`} value={value} onChange={(v) => onChange(v)} disabled={disabled} onUpload={onUpload} />;
}
