import { useId } from 'react';
import { BRAND } from '../../shared/brand';

/**
 * Biểu tượng chữ lồng T + M: chữ T vàng (Thắng, Toán) cắm vào đáy chữ M trắng (Math),
 * trên nền tím chuyển sắc có lưới ô li mờ. Bản tĩnh giống hệt nằm ở public/favicon.svg.
 */
const M_POINTS = '6.5,25.5 10.5,12 16,20.5 21.5,12 25.5,25.5';
const T_PATH = 'M7 6.8H25M16 6.8V20.5';

export function LogoMark({ size = 34 }: { size?: number }) {
  const gid = 'ml-logo-' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5541C4" />
          <stop offset="1" stopColor="#2B1E70" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gid})`} />
      <path d="M8 0v32M16 0v32M24 0v32M0 8h32M0 16h32M0 24h32" stroke="#fff" strokeOpacity=".1" strokeWidth="1" />
      <g transform="translate(0 1.1)" opacity=".45" fill="none" stroke="#170E4A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points={M_POINTS} />
        <path d={T_PATH} />
      </g>
      <polyline points={M_POINTS} fill="none" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
      <path d={T_PATH} fill="none" stroke="#FFD84D" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

/** Tên chữ: từ đầu (THẮNG) màu tím thương hiệu, phần còn lại màu chữ thường. */
export function Wordmark({ className = '' }: { className?: string }) {
  const [first, ...rest] = BRAND.split(' ');
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      <span className="text-tim-700">{first}</span>
      {rest.length > 0 && ' ' + rest.join(' ')}
    </span>
  );
}

export function Logo({ compact }: { compact?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-2.5 text-ink no-underline" aria-label={`${BRAND} – Trang chủ`}>
      <LogoMark />
      {!compact && <Wordmark className="text-[17px] leading-none" />}
    </a>
  );
}
