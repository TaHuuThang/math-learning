import type { ReactNode } from 'react';
import { LuBookOpen, LuBrain, LuClipboardCheck, LuCrown, LuFlame, LuLock, LuMountain, LuNotebookPen, LuRocket, LuStar, LuTarget } from 'react-icons/lu';

export const BADGE_ICONS: Record<string, (p: { className?: string }) => ReactNode> = {
  book: LuBookOpen,
  notebook: LuNotebookPen,
  mountain: LuMountain,
  target: LuTarget,
  brain: LuBrain,
  flame: LuFlame,
  clipboard: LuClipboardCheck,
  crown: LuCrown,
  rocket: LuRocket,
  star: LuStar,
};

const TIERS: Record<string, { fill: string; stroke: string; text: string; label: string }> = {
  bronze: { fill: '#FDF0DC', stroke: '#C86B00', text: '#8A4A00', label: 'Đồng' },
  silver: { fill: '#E8E4FA', stroke: '#6550C3', text: '#3B2A8C', label: 'Bạc' },
  gold: { fill: '#FFF5CC', stroke: '#D9A400', text: '#7A5A00', label: 'Vàng' },
};

/** Huy hiệu hình lục giác; chưa đạt → màu xám có ổ khóa. */
export function BadgeMark({ icon, tier, earned, size = 64 }: { icon: string; tier: string; earned: boolean; size?: number }) {
  const t = TIERS[tier] ?? TIERS.bronze;
  const Icon = BADGE_ICONS[icon] ?? LuStar;
  const fill = earned ? t.fill : '#F4F4F9';
  const stroke = earned ? t.stroke : '#CFCCE0';
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="absolute inset-0">
        <path d="M32 3 L57 17.5 L57 46.5 L32 61 L7 46.5 L7 17.5 Z" fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <span className="relative" style={{ color: earned ? t.text : '#A9A6BD', fontSize: size * 0.4 }}>
        {earned ? <Icon /> : <LuLock />}
      </span>
    </span>
  );
}

export function tierLabel(tier: string) {
  return TIERS[tier]?.label ?? '';
}
