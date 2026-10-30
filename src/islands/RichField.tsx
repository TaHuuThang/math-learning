import { useEffect, useRef, useState } from 'react';

export interface RichFieldProps {
  name: string;
  label: string;
  defaultValue: string;
  initialHtml: string;
  rows?: number;
  hint?: string;
  required?: boolean;
  inline?: boolean;
}

const SNIPPETS: { label: string; title: string; before: string; after: string }[] = [
  { label: '\\( \\)', title: 'Công thức cùng dòng', before: '\\(', after: '\\)' },
  { label: '\\[ \\]', title: 'Công thức dòng riêng', before: '\\[', after: '\\]' },
  { label: 'a/b', title: 'Phân số', before: '\\dfrac{', after: '}{}' },
  { label: 'xⁿ', title: 'Lũy thừa', before: '^{', after: '}' },
  { label: '√', title: 'Căn bậc hai', before: '\\sqrt{', after: '}' },
  { label: '∠', title: 'Góc', before: '\\widehat{', after: '}' },
  { label: '°', title: 'Độ', before: '^\\circ', after: '' },
  { label: '·', title: 'Dấu nhân', before: ' \\cdot ', after: '' },
  { label: '≠', title: 'Khác', before: ' \\ne ', after: '' },
  { label: '⇔', title: 'Tương đương', before: ' \\Leftrightarrow ', after: '' },
];

type Renderer = typeof import('../shared/richtext');

/** Ô soạn văn bản có công thức + xem trước trực tiếp (KaTeX tải khi cần). */
export default function RichField({ name, label, defaultValue, initialHtml, rows = 4, hint, required, inline }: RichFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [html, setHtml] = useState(initialHtml);
  const [errors, setErrors] = useState<string[]>([]);
  const ref = useRef<HTMLTextAreaElement>(null);
  const renderer = useRef<Renderer | null>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = window.setTimeout(async () => {
      renderer.current ??= await import('../shared/richtext');
      const r = renderer.current;
      setHtml(inline ? r.renderRichInline(value) : r.renderRich(value));
      setErrors(r.findMathErrors(value));
    }, 200);
    return () => window.clearTimeout(id);
  }, [value, inline]);

  function insert(before: string, after: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + before.length + selected.length;
      el.setSelectionRange(pos, pos);
    });
  }

  const id = `f-${name}`;
  return (
    <div>
      <div className="mb-1.5 flex flex-wrap items-end justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-ink-2">
          {label}
          {required && <span className="text-le"> *</span>}
        </label>
        <div className="flex flex-wrap gap-1" aria-label="Chèn mẫu công thức">
          {SNIPPETS.map((s) => (
            <button
              key={s.label}
              type="button"
              title={s.title}
              aria-label={`Chèn ${s.title.toLowerCase()}`}
              onClick={() => insert(s.before, s.after)}
              className="rounded-md border border-line bg-white px-2 py-0.5 font-mono text-[12px] text-ink-2 hover:border-tim-300 hover:text-tim-800"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <textarea
          ref={ref}
          id={id}
          name={name}
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          className="w-full rounded-xl border border-line-2 bg-white px-3.5 py-2.5 font-mono text-[14px] leading-relaxed focus:border-tim-500 focus:outline-none focus:ring-4 focus:ring-tim-100"
        />
        <div className="min-h-[3rem] rounded-xl border border-dashed border-line-2 bg-mist/60 px-3.5 py-2.5" aria-live="polite">
          <div className="mb-1 text-[12px] font-semibold text-ink-3">Xem trước</div>
          {value.trim() ? <div className="prose-math text-[15px]" dangerouslySetInnerHTML={{ __html: html }} /> : <div className="text-[14px] text-ink-3">Chưa có nội dung.</div>}
        </div>
      </div>
      {errors.length > 0 && (
        <ul className="mt-1.5 list-disc pl-5 text-[13px] text-le">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      {hint && <p className="mt-1 text-[13px] text-ink-3">{hint}</p>}
    </div>
  );
}
