import type { ReactNode } from 'react';
import { renderMath } from '../../shared/richtext';
import { cx } from './ui';
export { BadgeMark, tierLabel } from './badge';

/**
 * Hình minh họa trang chủ: chứng minh hằng đẳng thức (a + b)² = a² + 2ab + b² bằng diện tích –
 * hình vuông cạnh a + b chia thành 4 phần.
 */
export function AreaModel() {
  const a = 168;
  const b = 92;
  const o = 36;
  const s = a + b;
  const label = (x: number, y: number, tex: string, color = '#1b1a2e', size = 'text-[22px]', chip = false) => (
    <foreignObject x={x - 60} y={y - 22} width="120" height="44">
      <div className={cx('flex h-full items-center justify-center font-semibold', size)} style={{ color }}>
        <span className={chip ? 'rounded bg-white px-1 leading-none' : 'leading-none'} dangerouslySetInnerHTML={{ __html: renderMath(tex, false) }} />
      </div>
    </foreignObject>
  );
  return (
    <figure className="relative">
      <svg viewBox={`0 0 ${s + o + 28} ${s + o + 28}`} className="h-auto w-full max-w-[400px]" role="img" aria-label="Hình vuông cạnh a cộng b được chia thành hình vuông a bình phương, hai hình chữ nhật ab và hình vuông b bình phương">
        <rect x={o} y={o} width={a} height={a} fill="#3B2A8C" />
        <rect x={o + a} y={o} width={b} height={a} fill="#FFD84D" />
        <rect x={o} y={o + a} width={a} height={b} fill="#FFD84D" />
        <rect x={o + a} y={o + a} width={b} height={b} fill="#18875C" />
        <rect x={o} y={o} width={s} height={s} fill="none" stroke="#1b1a2e" strokeWidth="3" />
        <path d={`M${o + a} ${o}V${o + s}M${o} ${o + a}H${o + s}`} stroke="#1b1a2e" strokeWidth="2" strokeDasharray="7 6" />
        {/* kích thước cạnh */}
        <path d={`M${o} ${o - 22}v12M${o + a} ${o - 22}v12M${o + s} ${o - 22}v12M${o + 2} ${o - 16}H${o + a - 2}M${o + a + 2} ${o - 16}H${o + s - 2}`} stroke="#706e88" strokeWidth="1.4" />
        <path d={`M${o - 22} ${o}h12M${o - 22} ${o + a}h12M${o - 22} ${o + s}h12M${o - 16} ${o + 2}V${o + a - 2}M${o - 16} ${o + a + 2}V${o + s - 2}`} stroke="#706e88" strokeWidth="1.4" />
        {label(o + a / 2, o - 16, 'a', '#45435e', 'text-[18px]', true)}
        {label(o + a + b / 2, o - 16, 'b', '#45435e', 'text-[18px]', true)}
        {label(o - 16, o + a / 2, 'a', '#45435e', 'text-[18px]', true)}
        {label(o - 16, o + a + b / 2, 'b', '#45435e', 'text-[18px]', true)}
        {label(o + a / 2, o + a / 2, 'a^2', '#ffffff', 'text-[34px]')}
        {label(o + a + b / 2, o + a / 2, 'ab')}
        {label(o + a / 2, o + a + b / 2, 'ab')}
        {label(o + a + b / 2, o + a + b / 2, 'b^2', '#ffffff')}
      </svg>
      <figcaption className="mt-3 text-center text-[20px] text-ink" dangerouslySetInnerHTML={{ __html: renderMath('(a+b)^2 = a^2 + 2ab + b^2', false) }} />
    </figure>
  );
}

export function StatLine({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line py-2.5 last:border-0">
      <span className="text-[15px] text-ink-2">{label}</span>
      <span className="text-right">
        <span className="text-lg font-bold tabular-nums">{value}</span>
        {sub && <span className="block text-[12px] text-ink-3">{sub}</span>}
      </span>
    </div>
  );
}
