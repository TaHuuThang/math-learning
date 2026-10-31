/**
 * Biểu đồ thống kê mô tả bằng văn bản → SVG (dùng trong bài học, câu hỏi; bản máy chủ và bản HTML).
 *
 *   [bieudo]
 *   loai: cot            ← cot | cotkep | doanthang | quat | dothi (đồ thị hàm số, xem shared/graph.ts)
 *   tieude: Số sách quyên góp của các lớp
 *   nhan: 8A; 8B; 8C; 8D
 *   so lieu: 45; 60; 50; 35
 *   so lieu 2: 40; 52; 47; 30      ← chỉ với cotkep (hoặc doanthang hai đường)
 *   ten: Nam; Nữ                    ← tên hai dãy số liệu (chú giải)
 *   donvi: cuốn
 *   [/bieudo]
 *
 * Mọi chữ đều được escape; không chấp nhận mã SVG/HTML từ người soạn.
 */
import { graphToSvg } from './graph';

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export type ChartKind = 'cot' | 'cotkep' | 'doanthang' | 'quat';

export interface ChartSpec {
  kind: ChartKind;
  title: string;
  labels: string[];
  series: number[][];
  names: string[];
  unit: string;
}

const COLORS = ['#4d39a9', '#d9822b', '#18875c', '#e5484d', '#8b7ad6', '#c9a227', '#2f7fb8', '#7a5a00'];
const KEY: Record<string, keyof ChartSpec | 'series1' | 'series2'> = {
  loai: 'kind',
  'tieu de': 'title',
  tieude: 'title',
  nhan: 'labels',
  'so lieu': 'series1',
  solieu: 'series1',
  'so lieu 1': 'series1',
  'so lieu 2': 'series2',
  solieu2: 'series2',
  ten: 'names',
  'don vi': 'unit',
  donvi: 'unit',
};

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();

const list = (s: string) =>
  s
    .split(';')
    .map((x) => x.trim())
    .filter((x) => x !== '');

const num = (s: string) => Number(s.replace(/\s/g, '').replace(',', '.'));

export function parseChart(source: string): { spec: ChartSpec | null; errors: string[] } {
  const errors: string[] = [];
  const spec: ChartSpec = { kind: 'cot', title: '', labels: [], series: [], names: [], unit: '' };
  const raw: Record<string, string> = {};
  for (const line of source.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf(':');
    if (i < 0) {
      errors.push(`Dòng "${t.slice(0, 30)}" thiếu dấu hai chấm.`);
      continue;
    }
    const k = KEY[fold(t.slice(0, i))];
    if (!k) {
      errors.push(`Không hiểu mục "${t.slice(0, i)}".`);
      continue;
    }
    raw[k] = t.slice(i + 1).trim();
  }
  const kind = fold(raw.kind ?? 'cot').replace(/\s+/g, '');
  if (!['cot', 'cotkep', 'doanthang', 'quat'].includes(kind)) errors.push('Loại biểu đồ phải là cot, cotkep, doanthang hoặc quat.');
  spec.kind = (['cot', 'cotkep', 'doanthang', 'quat'].includes(kind) ? kind : 'cot') as ChartKind;
  spec.title = (raw.title ?? '').slice(0, 120);
  spec.unit = (raw.unit ?? '').slice(0, 30);
  spec.labels = list(raw.labels ?? '').slice(0, 16);
  spec.names = list(raw.names ?? '').slice(0, 2);
  for (const k of ['series1', 'series2'] as const) {
    if (!raw[k]) continue;
    const vals = list(raw[k]).map(num);
    if (vals.some((v) => !Number.isFinite(v) || v < 0)) errors.push('Số liệu phải là các số không âm, cách nhau bởi dấu chấm phẩy.');
    spec.series.push(vals.map((v) => (Number.isFinite(v) && v >= 0 ? v : 0)));
  }
  if (!spec.labels.length) errors.push('Thiếu dòng "nhan:" (tên các cột, các mốc).');
  if (!spec.series.length) errors.push('Thiếu dòng "so lieu:".');
  if (spec.kind === 'cotkep' && spec.series.length < 2) errors.push('Biểu đồ cột kép cần thêm dòng "so lieu 2:".');
  for (const s of spec.series) if (s.length !== spec.labels.length) errors.push('Số giá trị trong "so lieu" phải bằng số nhãn.');
  if (spec.kind === 'quat' && spec.series[0] && spec.series[0].reduce((a, b) => a + b, 0) <= 0) errors.push('Biểu đồ hình quạt cần tổng số liệu lớn hơn 0.');
  return { spec: errors.length ? null : spec, errors };
}

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : String(Math.round(v * 10) / 10).replace('.', ','));

function niceStep(max: number): number {
  const raw = max / 5;
  const p = 10 ** Math.floor(Math.log10(raw || 1));
  for (const m of [1, 2, 2.5, 5, 10]) if (raw <= m * p) return m * p;
  return 10 * p;
}

function text(x: number, y: number, s: string, extra = '') {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" ${extra}>${escapeHtml(s)}</text>`;
}

const GRAPH_KEYS: Record<string, string> = { 'ham so': 'functions', hamso: 'functions', x: 'xRange', y: 'yRange', diem: 'points', 'tieu de': 'title', tieude: 'title', loai: 'kind' };

export function chartToSvg(source: string): { svg: string; errors: string[] } {
  const firstKind = /^\s*loai\s*:\s*(.+)$/im.exec(fold(source));
  if (firstKind && firstKind[1].replace(/\s+/g, '') === 'dothi') {
    const fields: Record<string, string> = {};
    const errors: string[] = [];
    for (const line of source.split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf(':');
      const k = i < 0 ? undefined : GRAPH_KEYS[fold(t.slice(0, i))];
      if (!k) errors.push(`Không hiểu dòng "${t.slice(0, 30)}" của đồ thị.`);
      else fields[k] = t.slice(i + 1).trim();
    }
    if (errors.length) return { svg: '', errors };
    return graphToSvg(fields);
  }
  const { spec, errors } = parseChart(source);
  if (!spec) return { svg: '', errors };
  const W = 460;
  const H = 280;
  const top = (spec.title ? 34 : 14) + (spec.unit && spec.kind !== 'quat' ? 14 : 0);
  const parts: string[] = [];
  const summary = spec.labels.map((l, i) => `${l}: ${spec.series.map((s) => fmt(s[i])).join(' / ')}`).join('; ');
  if (spec.title) parts.push(text(W / 2, 20, spec.title, 'text-anchor="middle" font-weight="700" font-size="14"'));

  if (spec.kind === 'quat') {
    const vals = spec.series[0];
    const total = vals.reduce((a, b) => a + b, 0);
    const cx = 130;
    const cy = top + (H - top) / 2;
    const rr = Math.min(105, (H - top) / 2 - 8);
    let a0 = -Math.PI / 2;
    vals.forEach((v, i) => {
      const frac = v / total;
      const a1 = a0 + frac * 2 * Math.PI;
      const color = COLORS[i % COLORS.length];
      if (frac >= 0.9999) parts.push(`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="${color}" stroke="#fff" stroke-width="2"/>`);
      else if (frac > 0) {
        const p0 = [cx + rr * Math.cos(a0), cy + rr * Math.sin(a0)];
        const p1 = [cx + rr * Math.cos(a1), cy + rr * Math.sin(a1)];
        parts.push(
          `<path d="M${cx},${cy} L${p0[0].toFixed(2)},${p0[1].toFixed(2)} A${rr},${rr} 0 ${frac > 0.5 ? 1 : 0} 1 ${p1[0].toFixed(2)},${p1[1].toFixed(2)} Z" fill="${color}" stroke="#fff" stroke-width="2"/>`,
        );
      }
      if (frac >= 0.06) {
        const am = (a0 + a1) / 2;
        parts.push(text(cx + rr * 0.62 * Math.cos(am), cy + rr * 0.62 * Math.sin(am) + 4, `${fmt(Math.round(frac * 1000) / 10)}%`, 'text-anchor="middle" fill="#fff" font-weight="700" font-size="12"'));
      }
      a0 = a1;
    });
    spec.labels.forEach((l, i) => {
      const y = top + 14 + i * 22;
      parts.push(`<rect x="262" y="${y - 10}" width="14" height="14" rx="3" fill="${COLORS[i % COLORS.length]}"/>`);
      parts.push(text(282, y + 2, `${l} (${fmt(Math.round((vals[i] / total) * 1000) / 10)}%)`, 'font-size="12.5"'));
    });
  } else {
    const left = 46;
    const right = 14;
    const bottom = 42;
    const plotH = H - top - bottom;
    const plotW = W - left - right;
    const max = Math.max(...spec.series.flat(), 0);
    const step = niceStep(max || 1);
    // Luôn chừa ít nhất 8% phía trên để ghi số trên cột cao nhất
    const yMax = Math.max(step, Math.ceil((max * 1.08) / step) * step);
    const y = (v: number) => top + plotH - (v / yMax) * plotH;
    for (let v = 0; v <= yMax + 1e-9; v += step) {
      parts.push(`<line x1="${left}" y1="${y(v).toFixed(1)}" x2="${W - right}" y2="${y(v).toFixed(1)}" stroke="${v === 0 ? '#45435e' : '#e3e1ee'}" stroke-width="1"/>`);
      parts.push(text(left - 6, y(v) + 4, fmt(v), 'text-anchor="end" font-size="11" fill="#706e88"'));
    }
    if (spec.unit) parts.push(text(4, top - 10, `Đơn vị: ${spec.unit}`, 'text-anchor="start" font-size="11" fill="#706e88"'));
    const n = spec.labels.length;
    const slot = plotW / n;
    spec.labels.forEach((l, i) => parts.push(text(left + slot * (i + 0.5), H - bottom + 16, l, 'text-anchor="middle" font-size="12"')));
    if (spec.kind === 'cot' || spec.kind === 'cotkep') {
      const k = spec.kind === 'cotkep' ? 2 : 1;
      const bw = Math.min(46, (slot * 0.62) / k);
      spec.series.slice(0, k).forEach((s, si) => {
        s.forEach((v, i) => {
          const x = left + slot * (i + 0.5) - (bw * k) / 2 + si * bw;
          parts.push(`<rect x="${x.toFixed(1)}" y="${y(v).toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="${(y(0) - y(v)).toFixed(1)}" rx="2" fill="${COLORS[si]}"/>`);
          parts.push(text(x + (bw - 2) / 2, y(v) - 4, fmt(v), 'text-anchor="middle" font-size="11" font-weight="600"'));
        });
      });
    } else {
      spec.series.slice(0, 2).forEach((s, si) => {
        const pts = s.map((v, i) => [left + slot * (i + 0.5), y(v)]);
        parts.push(`<polyline points="${pts.map((p) => p.map((c) => c.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="${COLORS[si]}" stroke-width="2.5" stroke-linejoin="round"/>`);
        pts.forEach(([px, py], i) => {
          parts.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.5" fill="${COLORS[si]}"/>`);
          parts.push(text(px, py - 8, fmt(s[i]), 'text-anchor="middle" font-size="11" font-weight="600"'));
        });
      });
    }
    if (spec.names.length && spec.series.length > 1) {
      spec.names.forEach((nm, i) => {
        const x = left + i * 120;
        parts.push(`<rect x="${x}" y="${H - 16}" width="12" height="12" rx="2" fill="${COLORS[i]}"/>`);
        parts.push(text(x + 17, H - 6, nm, 'font-size="12"'));
      });
    }
  }
  const label = `${spec.title ? spec.title + '. ' : ''}${summary}${spec.unit ? ` (${spec.unit})` : ''}`;
  const svg = `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escapeHtml(label)}" font-family="inherit" fill="#1b1a2e"><title>${escapeHtml(label)}</title>${parts.join('')}</svg>`;
  return { svg, errors: [] };
}
