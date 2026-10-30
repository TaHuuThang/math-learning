import { useEffect, useRef, useState } from 'react';
import { figureToSvg } from '../shared/figure';

export interface FigureFieldProps {
  name: string;
  defaultValue: string;
  initialSvg: string;
  required?: boolean;
}

const SAMPLE = `A(0,3) B(-2,0) C(4,0) H(0,0)
ABCA
AH:dash
vuong(A,H,C)`;

/** Soạn hình vẽ hình học bằng văn bản, xem trước SVG ngay. */
export default function FigureField({ name, defaultValue, initialSvg, required }: FigureFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [svg, setSvg] = useState(initialSvg);
  const [errors, setErrors] = useState<string[]>([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = window.setTimeout(() => {
      if (!value.trim()) {
        setSvg('');
        setErrors([]);
        return;
      }
      const res = figureToSvg(value);
      setSvg(res.svg);
      setErrors(res.errors);
    }, 150);
    return () => window.clearTimeout(id);
  }, [value]);

  return (
    <div>
      <div className="mb-1.5 flex flex-wrap items-end justify-between gap-2">
        <label htmlFor={`f-${name}`} className="text-sm font-semibold text-ink-2">
          Hình vẽ{required && <span className="text-le"> *</span>}
        </label>
        {!value.trim() && (
          <button type="button" onClick={() => setValue(SAMPLE)} className="rounded-md border border-line bg-white px-2 py-0.5 text-[12px] text-ink-2 hover:border-tim-300">
            Chèn hình mẫu
          </button>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <textarea
          id={`f-${name}`}
          name={name}
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          className="w-full rounded-xl border border-line-2 bg-white px-3.5 py-2.5 font-mono text-[14px] leading-relaxed focus:border-tim-500 focus:outline-none focus:ring-4 focus:ring-tim-100"
          placeholder={SAMPLE}
        />
        <div className="flex min-h-[8rem] items-center justify-center rounded-xl border border-dashed border-line-2 bg-white p-3" aria-live="polite">
          {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <span className="text-[14px] text-ink-3">Hình xem trước hiện ở đây.</span>}
        </div>
      </div>
      {errors.length > 0 && (
        <ul className="mt-1.5 list-disc pl-5 text-[13px] text-le">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      <p className="mt-1 text-[13px] text-ink-3">
        Điểm: <code>A(0,3)</code>. Đoạn thẳng: <code>AB BC</code>, đường gấp khúc <code>ABCA</code>, nét đứt <code>AH:dash</code>. Góc vuông tại H: <code>vuong(A,H,C)</code>. Đánh dấu góc:{' '}
        <code>goc(B,A,C)</code>. Đường tròn: <code>tron(O,2)</code>.
      </p>
    </div>
  );
}
