import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useApp } from '../app-context';
import { renderRich, renderRichInline } from '../../shared/richtext';
import { LuCircleAlert, LuCircleCheck, LuInfo } from 'react-icons/lu';

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'quiet';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-tim-700 text-white hover:bg-tim-800 shadow-[0_2px_0_0_#1e154b]',
  secondary: 'bg-white text-tim-800 border-2 border-tim-700 hover:bg-tim-50',
  ghost: 'bg-transparent text-tim-700 hover:bg-tim-50',
  danger: 'bg-white text-le border-2 border-le hover:bg-le-soft',
  quiet: 'bg-mist text-ink-2 hover:bg-tim-50 hover:text-tim-800',
};
const SIZES: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-[15px] px-4 py-2.5 rounded-xl gap-2',
  lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5',
};

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra?: string) {
  return cx(
    'inline-flex items-center justify-center font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
    VARIANTS[variant],
    SIZES[size],
    extra,
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: { children: ReactNode; variant?: Variant; size?: Size; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} type={rest.type ?? 'submit'} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <a href={href} className={buttonClass(variant, size, className)}>
      {children}
    </a>
  );
}

/** Biểu mẫu POST có sẵn mã chống CSRF. data-confirm → hỏi xác nhận trước khi gửi. */
export function PostForm({
  action,
  children,
  className,
  confirm,
  id,
  encType,
}: {
  action: string;
  children: ReactNode;
  className?: string;
  confirm?: string;
  id?: string;
  encType?: 'multipart/form-data';
}) {
  const { csrfToken } = useApp();
  return (
    <form method="post" action={action} className={className} data-confirm={confirm} id={id} encType={encType}>
      <input type="hidden" name="_csrf" value={csrfToken} />
      {children}
    </form>
  );
}

export function Panel({ children, className, as = 'section' }: { children: ReactNode; className?: string; as?: 'section' | 'div' | 'article' }) {
  const Tag = as;
  return <Tag className={cx('bg-white border border-line rounded-[var(--radius-card)]', className)}>{children}</Tag>;
}

export function Badge({ children, tone = 'tim', className }: { children: ReactNode; tone?: 'tim' | 'tre' | 'cam' | 'le' | 'gray' | 'hl'; className?: string }) {
  const tones = {
    tim: 'bg-tim-50 text-tim-700 border-tim-200',
    tre: 'bg-tre-soft text-tre border-[#bfe5d0]',
    cam: 'bg-cam-soft text-cam border-[#f3d6a8]',
    le: 'bg-le-soft text-le border-[#f6c4c6]',
    gray: 'bg-mist text-ink-3 border-line',
    hl: 'bg-hl-soft text-[#7a5a00] border-[#f2df95]',
  } as const;
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold leading-5 whitespace-nowrap', tones[tone], className)}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, tone = 'tim', label }: { value: number; tone?: 'tim' | 'tre'; label?: string }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cx('bar', tone === 'tre' && 'bar-tre')} role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span style={{ width: `${v}%` }} />
    </div>
  );
}

export function ProgressRing({ value, size = 64, stroke = 7, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? `${v}%`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-tim-100)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-tim-700)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${(v / 100) * c} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={size * 0.26} fontWeight={700} fill="var(--color-ink)">
        {Math.round(v)}%
      </text>
    </svg>
  );
}

export function Rich({ src, className, inline }: { src: string; className?: string; inline?: boolean }) {
  if (inline) return <span className={className} dangerouslySetInnerHTML={{ __html: renderRichInline(src) }} />;
  return <div className={cx('prose-math', className)} dangerouslySetInnerHTML={{ __html: renderRich(src) }} />;
}

export function Html({ html, className }: { html: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function FlashBanner() {
  const { flash } = useApp();
  if (!flash) return null;
  return <Notice tone={flash.type === 'error' ? 'error' : flash.type === 'success' ? 'success' : 'info'}>{flash.message}</Notice>;
}

export function Notice({ tone = 'info', children, className }: { tone?: 'info' | 'success' | 'error' | 'warn'; children: ReactNode; className?: string }) {
  const styles = {
    info: ['bg-tim-50 border-tim-200 text-tim-900', <LuInfo key="i" />],
    success: ['bg-tre-soft border-[#bfe5d0] text-[#0f5c3e]', <LuCircleCheck key="s" />],
    error: ['bg-le-soft border-[#f6c4c6] text-[#9b1c22]', <LuCircleAlert key="e" />],
    warn: ['bg-cam-soft border-[#f3d6a8] text-[#7a4200]', <LuCircleAlert key="w" />],
  } as const;
  const [cls, icon] = styles[tone];
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={cx('flex gap-3 items-start rounded-xl border px-4 py-3 text-[15px]', cls, className)}>
      <span className="mt-1 shrink-0 text-lg">{icon}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function ErrorList({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <Notice tone="error" className="mb-4">
      {errors.length === 1 ? (
        errors[0]
      ) : (
        <ul className="list-disc pl-4">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </Notice>
  );
}

export const inputClass =
  'w-full rounded-xl border border-line-2 bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-3 focus:border-tim-500 focus:outline-none focus:ring-4 focus:ring-tim-100';

export function Field({
  label,
  name,
  type = 'text',
  defaultValue,
  required,
  hint,
  autoComplete,
  placeholder,
  min,
  max,
  step,
  error,
  className,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
  hint?: string;
  autoComplete?: string;
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  error?: string;
  className?: string;
  maxLength?: number;
}) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-2">
        {label}
        {required && <span className="text-le"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue ?? undefined}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cx(inputClass, error && 'border-le')}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[13px] text-ink-3">
          {hint}
        </p>
      )}
      {error && <p className="mt-1 text-[13px] font-medium text-le">{error}</p>}
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
  required,
  hint,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  className?: string;
}) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-2">
        {label}
        {required && <span className="text-le"> *</span>}
      </label>
      <textarea id={id} name={name} rows={rows} defaultValue={defaultValue ?? ''} required={required} placeholder={placeholder} className={cx(inputClass, 'font-mono text-[14px] leading-relaxed')} />
      {hint && <p className="mt-1 text-[13px] text-ink-3">{hint}</p>}
    </div>
  );
}

export function Select({
  label,
  name,
  options,
  defaultValue,
  required,
  className,
  autoSubmit,
  hint,
}: {
  label: string;
  name: string;
  options: { value: string | number; label: string; group?: string }[];
  defaultValue?: string | number | null;
  required?: boolean;
  className?: string;
  autoSubmit?: boolean;
  hint?: string;
}) {
  const id = `f-${name}`;
  const groups = new Map<string, typeof options>();
  for (const o of options) {
    const g = o.group ?? '';
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(o);
  }
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-2">
        {label}
        {required && <span className="text-le"> *</span>}
      </label>
      <select id={id} name={name} defaultValue={defaultValue ?? undefined} required={required} data-autosubmit={autoSubmit ? '' : undefined} className={cx(inputClass, 'pr-8')}>
        {[...groups.entries()].map(([g, opts]) =>
          g ? (
            <optgroup key={g} label={g}>
              {opts.map((o) => (
                <option key={String(o.value)} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ) : (
            opts.map((o) => (
              <option key={String(o.value)} value={o.value}>
                {o.label}
              </option>
            ))
          ),
        )}
      </select>
      {hint && <p className="mt-1 text-[13px] text-ink-3">{hint}</p>}
    </div>
  );
}

export function Checkbox({ name, label, defaultChecked, value = 'on', hint }: { name: string; label: ReactNode; defaultChecked?: boolean; value?: string; hint?: string }) {
  return (
    <label className="flex items-start gap-2.5 text-[15px] cursor-pointer">
      <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} className="mt-1 h-4 w-4 accent-[#3b2a8c]" />
      <span>
        {label}
        {hint && <span className="block text-[13px] text-ink-3">{hint}</span>}
      </span>
    </label>
  );
}

export function EmptyState({ icon, title, children, action }: { icon?: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-line-2 bg-white/60 px-6 py-10 text-center">
      {icon && <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-tim-50 text-2xl text-tim-600">{icon}</div>}
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {children && <div className="mx-auto mt-1.5 max-w-md text-[15px] text-ink-2">{children}</div>}
      {action && <div className="mt-5 flex justify-center gap-3">{action}</div>}
    </div>
  );
}

export function PageTitle({ title, sub, actions, crumbs }: { title: ReactNode; sub?: ReactNode; actions?: ReactNode; crumbs?: { href?: string; label: string }[] }) {
  return (
    <div className="mb-6">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-ink md:text-[32px]">{title}</h1>
          {sub && <p className="mt-1.5 max-w-3xl text-[15px] text-ink-2">{sub}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Đường dẫn" className="mb-3 text-sm text-ink-3">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-line-2">/</span>}
            {it.href ? (
              <a href={it.href} className="hover:text-tim-700 hover:underline">
                {it.label}
              </a>
            ) : (
              <span aria-current="page" className="font-medium text-ink-2">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Pager({ page, pages, base }: { page: number; pages: number; base: string }) {
  if (pages <= 1) return null;
  const href = (p: number) => `${base}${base.includes('?') ? '&' : '?'}trang=${p}`;
  return (
    <nav className="mt-4 flex items-center justify-between text-sm" aria-label="Phân trang">
      <span className="text-ink-3">
        Trang {page}/{pages}
      </span>
      <div className="flex gap-2">
        {page > 1 && (
          <a className={buttonClass('quiet', 'sm')} href={href(page - 1)}>
            Trang trước
          </a>
        )}
        {page < pages && (
          <a className={buttonClass('quiet', 'sm')} href={href(page + 1)}>
            Trang sau
          </a>
        )}
      </div>
    </nav>
  );
}
