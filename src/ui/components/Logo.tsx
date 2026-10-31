import { BRAND } from '../../shared/brand';
import { LOGO_VIEWBOX, logoInnerSvg, type LogoVariant } from '../../shared/logo';

/**
 * Logo THANG MATH LEARNING (chữ lồng TM: chữ T là cây thước, chân phải chữ M là bút chì; bong bóng kí hiệu toán).
 * Hình vẽ lấy từ src/shared/logo.ts – sửa ở đó là đổi trên mọi trang và biểu tượng tab.
 */
export function LogoMark({ size = 48, variant = 'compact' }: { size?: number; variant?: LogoVariant }) {
  const [x, y, w, h] = LOGO_VIEWBOX[variant];
  return (
    <svg
      width={size}
      height={Math.round((size * h) / w)}
      viewBox={`${x} ${y} ${w} ${h}`}
      aria-hidden="true"
      className="shrink-0"
      dangerouslySetInnerHTML={{ __html: logoInnerSvg(variant) }}
    />
  );
}

const WORDMARK_SIZES = {
  sm: { main: 'text-[15px]', sub: 'mt-[3px] text-[8.5px] tracking-[0.42em]' },
  md: { main: 'text-[15px] sm:text-[17px]', sub: 'mt-[4px] text-[8.5px] tracking-[0.42em] sm:text-[9.5px] sm:tracking-[0.44em]' },
  lg: { main: 'text-[22px]', sub: 'mt-[5px] text-[12px] tracking-[0.46em]' },
  xl: { main: 'text-[30px]', sub: 'mt-[6px] text-[14.5px] tracking-[0.5em]' },
} as const;

/**
 * Tên chữ hai dòng như mẫu logo: "THANG MATH" đậm, "LEARNING" giãn chữ bên dưới.
 * inline: một dòng (dùng ở thanh đầu trang hẹp).
 */
export function Wordmark({ size = 'md', align = 'left', inline, className = '' }: { size?: keyof typeof WORDMARK_SIZES; align?: 'left' | 'center'; inline?: boolean; className?: string }) {
  const words = BRAND.split(' ');
  const main = words.slice(0, -1).join(' ') || BRAND;
  const sub = words.length > 1 ? words[words.length - 1] : '';
  if (inline) return <span className={`font-extrabold tracking-tight text-logo ${className}`}>{BRAND}</span>;
  const s = WORDMARK_SIZES[size];
  return (
    <span className={`inline-flex flex-col leading-none ${align === 'center' ? 'items-center text-center' : ''} ${className}`}>
      <span className={`whitespace-nowrap font-extrabold tracking-tight text-logo ${s.main}`}>{main}</span>
      {sub && <span className={`font-semibold text-logo-2 ${s.sub} ${align === 'center' ? 'pl-[0.5em]' : ''}`}>{sub}</span>}
    </span>
  );
}

export function Logo({ compact, size = 'md', href = '/' }: { compact?: boolean; size?: 'md' | 'lg'; href?: string }) {
  return (
    <a href={href} className="flex shrink-0 items-center gap-2 no-underline sm:gap-2.5" aria-label={`${BRAND} – Trang chủ`}>
      {size === 'lg' ? (
        <LogoMark size={96} variant="full" />
      ) : (
        <span className="contents">
          <span className="sm:hidden">
            <LogoMark size={40} />
          </span>
          <span className="hidden sm:block">
            <LogoMark size={48} />
          </span>
        </span>
      )}
      {!compact && <Wordmark size={size} />}
    </a>
  );
}

/** Logo đầy đủ (bong bóng kí hiệu toán + tên chữ căn giữa) – trang đăng nhập, chân trang. */
export function LogoFull({ size = 132, href = '/' }: { size?: number; href?: string }) {
  return (
    <a href={href} className="inline-flex flex-col items-center gap-1 no-underline" aria-label={`${BRAND} – Trang chủ`}>
      <LogoMark size={size} variant="full" />
      <Wordmark size={size >= 120 ? 'xl' : 'lg'} align="center" />
    </a>
  );
}
