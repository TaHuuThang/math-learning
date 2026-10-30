import { BRAND } from '../../shared/brand';

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#3B2A8C" />
      <path d="M8 0v32M16 0v32M24 0v32M0 8h32M0 16h32M0 24h32" stroke="#fff" strokeOpacity=".13" strokeWidth="1" />
      <polyline points="6.5,23.5 11.5,9.5 16,18.5 20.5,9.5 25.5,23.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="25.5" cy="23.5" r="3.2" fill="#FFD84D" stroke="#3B2A8C" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ compact }: { compact?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-2.5 text-ink no-underline" aria-label={`${BRAND} – Trang chủ`}>
      <LogoMark />
      {!compact && <span className="text-[17px] font-extrabold tracking-tight leading-none">{BRAND}</span>}
    </a>
  );
}
