/**
 * Logo THANG MATH LEARNING – một nguồn duy nhất cho trang web, bản HTML và biểu tượng tab (favicon).
 * Ý tưởng theo mẫu thầy Tạ Hữu Thắng thiết kế trên Design.com: chữ lồng "TM", chữ T là cây thước có vạch chia,
 * chân phải chữ M là cây bút chì, tam giác xanh dưới chữ M, xung quanh là các bong bóng kí hiệu toán nhiều màu.
 * Toàn bộ là hình vẽ SVG cố định (không có dữ liệu người dùng).
 */
export const LOGO_INK = '#25306b';
export const LOGO_INK_2 = '#4a5fc1';

const C = { cam: '#f26b2d', do: '#e8434b', xanh: '#3d9ae8', vang: '#f6b91e', la: '#27b36b', hong: '#e8457a', ink: LOGO_INK };

/** Chữ lồng TM, khung 0 0 107 80. */
export function monogramSvg(): string {
  const p: string[] = [];
  // T – cây thước: thanh ngang, thân, vạch chia ở mép trái thân
  p.push(`<rect x="3" y="8" width="49" height="14" rx="1.5" fill="${LOGO_INK}"/>`);
  p.push(`<rect x="19" y="8" width="17" height="64" rx="1.5" fill="${LOGO_INK}"/>`);
  for (let i = 0, y = 26.5; y <= 68; y += 4.2, i++) p.push(`<rect x="19" y="${y.toFixed(1)}" width="${i % 2 ? 4 : 7.5}" height="1.5" fill="#fff"/>`);
  // M – chân trái và hai nét chéo nối vào bút chì
  p.push(`<path d="M55 72V8h12l12 30 12-30v24l-12 30-12-30v40z" fill="${LOGO_INK}"/>`);
  // Bút chì – chân phải của M
  p.push(`<rect x="91" y="8" width="13" height="50" fill="${LOGO_INK}"/>`);
  p.push(`<rect x="96.3" y="8" width="2.4" height="50" fill="#3e4b98"/>`);
  p.push(`<path d="M91 58h13l-6.5 15z" fill="#f4d2a0"/>`);
  p.push(`<path d="M94.9 67h5.2l-2.6 6z" fill="${C.hong}"/>`);
  // Tam giác dưới chữ M
  p.push(`<path d="M73 74h12l-6-9.5z" fill="${C.la}"/>`);
  return p.join('');
}

type Sym = '+' | 'x' | '=' | '÷' | 'pi' | 'sigma';
const n = (v: number) => Number(v.toFixed(2));

function bubble(cx: number, cy: number, r: number, color: string, sym: Sym): string {
  const s = r * 0.5;
  const w = n(Math.max(1.6, r * 0.24));
  const line = (d: string, width = w) => `<path d="${d}" stroke="#fff" stroke-width="${n(width)}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  let g = '';
  if (sym === '+') g = line(`M${n(cx - s)} ${cy}h${n(2 * s)}M${cx} ${n(cy - s)}v${n(2 * s)}`);
  if (sym === 'x') g = line(`M${n(cx - s * 0.75)} ${n(cy - s * 0.75)}l${n(1.5 * s)} ${n(1.5 * s)}M${n(cx + s * 0.75)} ${n(cy - s * 0.75)}l${n(-1.5 * s)} ${n(1.5 * s)}`);
  if (sym === '=') g = line(`M${n(cx - s)} ${n(cy - s * 0.38)}h${n(2 * s)}M${n(cx - s)} ${n(cy + s * 0.38)}h${n(2 * s)}`);
  if (sym === '÷')
    g = line(`M${n(cx - s)} ${cy}h${n(2 * s)}`) + `<circle cx="${cx}" cy="${n(cy - s * 0.62)}" r="${n(w * 0.62)}" fill="#fff"/><circle cx="${cx}" cy="${n(cy + s * 0.62)}" r="${n(w * 0.62)}" fill="#fff"/>`;
  if (sym === 'pi') g = line(`M${n(cx - s)} ${n(cy - s * 0.55)}h${n(2 * s)}M${n(cx - s * 0.45)} ${n(cy - s * 0.55)}v${n(1.45 * s)}M${n(cx + s * 0.45)} ${n(cy - s * 0.55)}v${n(1.15 * s)}q0 ${n(0.3 * s)} ${n(0.35 * s)} ${n(0.3 * s)}`, w * 0.9);
  if (sym === 'sigma') g = line(`M${n(cx + s * 0.7)} ${n(cy - s * 0.8)}h${n(-1.4 * s)}l${n(0.85 * s)} ${n(0.8 * s)}l${n(-0.85 * s)} ${n(0.8 * s)}h${n(1.4 * s)}`, w * 0.85);
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>${g}`;
}

const plus = (cx: number, cy: number, s: number, color: string) =>
  `<path d="M${cx - s} ${cy}h${2 * s}M${cx} ${cy - s}v${2 * s}" stroke="${color}" stroke-width="3.2" stroke-linecap="round"/>`;
const dot = (cx: number, cy: number, r: number, color: string, opacity = 1) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"${opacity < 1 ? ` opacity="${opacity}"` : ''}/>`;

/** Các bong bóng kí hiệu toán quanh chữ lồng (bản đầy đủ). */
function bubblesSvg(): string {
  return [
    bubble(68, -9, 7, C.cam, '+'),
    plus(83, -20, 5, C.xanh),
    bubble(90, -4, 7, C.ink, 'x'),
    bubble(105, -16, 6, C.vang, '÷'),
    plus(118, -2, 5.5, C.do),
    bubble(-12, 38, 7, C.la, '='),
    bubble(-6, 60, 6.5, C.vang, 'pi'),
    bubble(22, 88, 7.5, C.xanh, 'sigma'),
    bubble(50, 84, 7, C.cam, '='),
    dot(34, -3, 2.4, C.ink),
    dot(47, -8, 2.6, C.xanh, 0.7),
    dot(-4, 14, 2.2, C.cam),
    dot(80, 2, 2.4, C.hong),
    dot(44, 40, 2.6, C.vang),
    dot(44, 52, 2, C.ink),
    dot(118, 34, 2.6, C.la),
    dot(113, 70, 2.4, C.cam),
    dot(6, 80, 2, C.do),
    dot(62, 96, 2.2, C.la),
    dot(100, 86, 1.8, C.vang),
  ].join('');
}

export type LogoVariant = 'full' | 'compact' | 'mono';

/** Khung (viewBox) của từng kiểu logo: đầy đủ có bong bóng, gọn cho đầu trang, chỉ chữ lồng. */
export const LOGO_VIEWBOX: Record<LogoVariant, [number, number, number, number]> = {
  full: [-24, -30, 156, 132],
  compact: [0, -17, 107, 97],
  mono: [0, 0, 107, 80],
};

export function logoInnerSvg(variant: LogoVariant): string {
  if (variant === 'full') return bubblesSvg() + monogramSvg();
  if (variant === 'compact') return monogramSvg() + bubble(70, -6, 6.5, C.cam, '+') + bubble(86, -9, 5, C.vang, '÷') + dot(102, -4, 3, C.do);
  return monogramSvg();
}

/** Biểu tượng tab trình duyệt: chữ lồng trên ô vuông trắng bo góc (rõ trên cả thanh tab sáng và tối). */
export function faviconSvg(title: string): string {
  const esc = title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><title>${esc}</title><rect width="120" height="120" rx="26" fill="#fff"/><rect x="2" y="2" width="116" height="116" rx="24" fill="none" stroke="#e3e1ee" stroke-width="3"/><g transform="translate(6.5 19)">${monogramSvg()}</g></svg>\n`;
}
