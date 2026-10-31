/**
 * Đồ thị hàm số trên mặt phẳng tọa độ (khối [bieudo] với "loai: dothi").
 *
 *   [bieudo]
 *   loai: dothi
 *   ham so: 2x + 1; -x + 3      ← các hàm số bậc nhất (hoặc hằng số), cách nhau bởi ;
 *   x: -3; 3                    ← khoảng giá trị của x (mặc định -4; 4)
 *   y: -2; 6                    ← khoảng giá trị của y (mặc định tự tính)
 *   diem: A(1; 3); B(0; 1)      ← các điểm cần đánh dấu (có đường gióng)
 *   tieude: Đồ thị hàm số y = 2x + 1
 *   [/bieudo]
 */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const COLORS = ['#4d39a9', '#d9822b', '#18875c', '#e5484d'];

export interface Linear {
  a: number;
  b: number;
  label: string;
}

function parseNum(s: string): number | null {
  const t = s.replace(',', '.');
  if (t.includes('/')) {
    const [p, q] = t.split('/');
    const n = Number(p);
    const d = Number(q);
    return Number.isFinite(n) && Number.isFinite(d) && d !== 0 ? n / d : null;
  }
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

/** "2x + 1", "-x + 3", "0,5x - 2", "1/2x", "3" → {a, b}. */
export function parseLinear(src: string): Linear | null {
  const raw = src.trim();
  const t = raw.replace(/\s+/g, '').replace(/−/g, '-').replace(/^y=/i, '');
  if (!t || !/^[0-9xX.,/+-]+$/.test(t)) return null;
  const terms = t.match(/[+-]?[^+-]+/g);
  if (!terms) return null;
  let a = 0;
  let b = 0;
  for (const term of terms) {
    if (/x/i.test(term)) {
      const c = term.replace(/x/i, '');
      const v = c === '' || c === '+' ? 1 : c === '-' ? -1 : parseNum(c);
      if (v === null) return null;
      a += v;
    } else {
      const v = parseNum(term);
      if (v === null) return null;
      b += v;
    }
  }
  return { a, b, label: `y = ${raw.replace(/^y\s*=\s*/i, '')}` };
}

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100).replace('.', ','));

export function graphToSvg(fields: Record<string, string>): { svg: string; errors: string[] } {
  const errors: string[] = [];
  const lines: Linear[] = [];
  for (const f of (fields.functions ?? '').split(';').map((s) => s.trim()).filter(Boolean)) {
    const l = parseLinear(f);
    if (!l) errors.push(`Không đọc được hàm số "${f}" (chỉ hỗ trợ dạng ax + b).`);
    else lines.push(l);
  }
  const points: { name: string; x: number; y: number }[] = [];
  const pointRe = /([A-Za-z][A-Za-z0-9']*)\s*\(\s*(-?[\d.,/]+)\s*[;|]\s*(-?[\d.,/]+)\s*\)/g;
  for (const m of (fields.points ?? '').matchAll(pointRe)) {
    const x = parseNum(m[2]);
    const y = parseNum(m[3]);
    if (x === null || y === null) errors.push(`Tọa độ điểm ${m[1]} không hợp lệ.`);
    else points.push({ name: m[1], x, y });
  }
  if (fields.points && !points.length) errors.push('Điểm viết theo dạng A(1; 3), các điểm cách nhau bởi dấu chấm phẩy.');
  if (!lines.length && !points.length) errors.push('Cần ít nhất một hàm số (dòng "ham so:") hoặc một điểm (dòng "diem:").');
  const range = (s: string | undefined, def: [number, number]): [number, number] => {
    if (!s) return def;
    const [p, q] = s.split(';').map((x) => parseNum(x.trim()));
    if (p === null || q === null || p === undefined || q === undefined || p >= q || q - p > 40) {
      errors.push('Khoảng giá trị viết dạng "-3; 3" (số nhỏ trước, độ rộng không quá 40).');
      return def;
    }
    return [p, q];
  };
  const [x0, x1] = range(fields.xRange, [-4, 4]);
  let autoY: [number, number] = [-1, 1];
  {
    const ys = [0, ...points.map((p) => p.y), ...lines.flatMap((l) => [l.a * x0 + l.b, l.a * x1 + l.b])];
    autoY = [Math.max(-10, Math.floor(Math.min(...ys)) - 1), Math.min(10, Math.ceil(Math.max(...ys)) + 1)];
  }
  const [y0, y1] = range(fields.yRange, autoY);
  if (errors.length) return { svg: '', errors };

  const W = 380;
  const top = fields.title ? 44 : 24;
  const pad = 26;
  const unit = Math.min((W - 2 * pad) / (x1 - x0), 360 / (y1 - y0), 46);
  const plotW = unit * (x1 - x0);
  const plotH = unit * (y1 - y0);
  const left = (W - plotW) / 2;
  const H = top + plotH + pad + 4;
  const X = (x: number) => left + (x - x0) * unit;
  const Y = (y: number) => top + (y1 - y) * unit;
  const parts: string[] = [];
  if (fields.title) parts.push(`<text x="${W / 2}" y="18" text-anchor="middle" font-weight="700" font-size="14">${esc(fields.title)}</text>`);
  const step = x1 - x0 > 20 || y1 - y0 > 20 ? 2 : 1;
  for (let x = Math.ceil(x0); x <= x1; x += step) parts.push(`<line x1="${X(x)}" y1="${Y(y1)}" x2="${X(x)}" y2="${Y(y0)}" stroke="#ebe9f3"/>`);
  for (let y = Math.ceil(y0); y <= y1; y += step) parts.push(`<line x1="${X(x0)}" y1="${Y(y)}" x2="${X(x1)}" y2="${Y(y)}" stroke="#ebe9f3"/>`);
  // Trục tọa độ
  const ax = y0 <= 0 && 0 <= y1 ? Y(0) : Y(y0);
  const ay = x0 <= 0 && 0 <= x1 ? X(0) : X(x0);
  parts.push(`<line x1="${X(x0) - 4}" y1="${ax}" x2="${X(x1) + 10}" y2="${ax}" stroke="#1b1a2e" stroke-width="1.3"/>`);
  parts.push(`<path d="M${X(x1) + 12},${ax} l-8,-4 v8 z" fill="#1b1a2e"/>`);
  parts.push(`<line x1="${ay}" y1="${Y(y0) + 4}" x2="${ay}" y2="${Y(y1) - 10}" stroke="#1b1a2e" stroke-width="1.3"/>`);
  parts.push(`<path d="M${ay},${Y(y1) - 12} l-4,8 h8 z" fill="#1b1a2e"/>`);
  parts.push(`<text x="${X(x1) + 8}" y="${ax + 16}" font-size="12" font-style="italic">x</text>`);
  parts.push(`<text x="${ay + 7}" y="${Y(y1) - 6}" font-size="12" font-style="italic">y</text>`);
  parts.push(`<text x="${ay - 11}" y="${ax + 14}" font-size="11">O</text>`);
  for (let x = Math.ceil(x0); x <= x1; x += step) {
    if (x === 0) continue;
    parts.push(`<line x1="${X(x)}" y1="${ax - 3}" x2="${X(x)}" y2="${ax + 3}" stroke="#1b1a2e"/>`);
    parts.push(`<text x="${X(x)}" y="${ax + 14}" text-anchor="middle" font-size="10.5" fill="#45435e">${fmt(x)}</text>`);
  }
  for (let y = Math.ceil(y0); y <= y1; y += step) {
    if (y === 0) continue;
    parts.push(`<line x1="${ay - 3}" y1="${Y(y)}" x2="${ay + 3}" y2="${Y(y)}" stroke="#1b1a2e"/>`);
    parts.push(`<text x="${ay - 6}" y="${Y(y) + 4}" text-anchor="end" font-size="10.5" fill="#45435e">${fmt(y)}</text>`);
  }
  // Vùng đã có chữ (số trên hai trục, nhãn đã đặt) để nhãn đường thẳng không chồng lên
  type Box = [number, number, number, number];
  const taken: Box[] = [
    [X(x0) - 4, ax - 4, X(x1) + 14, ax + 17],
    [ay - 26, Y(y1) - 14, ay + 4, Y(y0) + 4],
  ];
  for (const pt of points) taken.push([X(pt.x) - 5, Y(pt.y) - 19, X(pt.x) + 8 + pt.name.length * 8, Y(pt.y) + 5]);
  const hit = (b: Box) => taken.some((t) => b[0] < t[2] && b[2] > t[0] && b[1] < t[3] && b[3] > t[1]);
  // Đường thẳng (cắt theo khung)
  lines.forEach((l, i) => {
    const pts: [number, number][] = [];
    const add = (x: number, y: number) => {
      if (x >= x0 - 1e-9 && x <= x1 + 1e-9 && y >= y0 - 1e-9 && y <= y1 + 1e-9 && !pts.some((p) => Math.abs(p[0] - x) < 1e-9 && Math.abs(p[1] - y) < 1e-9)) pts.push([x, y]);
    };
    add(x0, l.a * x0 + l.b);
    add(x1, l.a * x1 + l.b);
    if (l.a !== 0) {
      add((y0 - l.b) / l.a, y0);
      add((y1 - l.b) / l.a, y1);
    }
    if (pts.length < 2) return;
    pts.sort((p, q) => p[0] - q[0]);
    const [p, q] = [pts[0], pts[pts.length - 1]];
    const color = COLORS[i % COLORS.length];
    parts.push(`<line x1="${X(p[0]).toFixed(1)}" y1="${Y(p[1]).toFixed(1)}" x2="${X(q[0]).toFixed(1)}" y2="${Y(q[1]).toFixed(1)}" stroke="${color}" stroke-width="2.4"/>`);
    // Nhãn đặt sát đường thẳng: thử lần lượt các vị trí dọc theo đường, hai phía, chọn chỗ không chồng chữ khác
    const w = l.label.length * 6.9;
    let best: { x: number; y: number; anchor: string; box: Box } | null = null;
    for (const t of [0.85, 0.7, 0.55, 0.4, 0.25, 0.12]) {
      const px = X(p[0] + (q[0] - p[0]) * t);
      const py = Y(p[1] + (q[1] - p[1]) * t);
      for (const side of [1, -1]) {
        // side 1: phía trên đường thẳng; side -1: phía dưới
        const startAnchor = (l.a < 0) === (side === 1);
        const lx = px + (startAnchor ? 8 : -8);
        const ly = side === 1 ? py - 8 : py + 17;
        const box: Box = startAnchor ? [lx - 2, ly - 12, lx + w + 2, ly + 4] : [lx - w - 2, ly - 12, lx + 2, ly + 4];
        const inside = box[0] >= left - 2 && box[2] <= W - 2 && box[1] >= top - 4 && box[3] <= top + plotH + 4;
        if (inside && !hit(box)) {
          best = { x: lx, y: ly, anchor: startAnchor ? 'start' : 'end', box };
          break;
        }
        if (!best && inside) best = { x: lx, y: ly, anchor: startAnchor ? 'start' : 'end', box };
      }
      if (best && !hit(best.box)) break;
    }
    if (best) {
      taken.push(best.box);
      parts.push(
        `<text x="${best.x.toFixed(1)}" y="${best.y.toFixed(1)}" text-anchor="${best.anchor}" font-size="12" font-weight="700" fill="${color}" stroke="#fff" stroke-width="3" paint-order="stroke">${esc(l.label)}</text>`,
      );
    }
  });
  // Điểm và đường gióng
  for (const pt of points) {
    if (pt.x < x0 || pt.x > x1 || pt.y < y0 || pt.y > y1) continue;
    if (pt.x !== 0) parts.push(`<line x1="${X(pt.x)}" y1="${Y(pt.y)}" x2="${ay}" y2="${Y(pt.y)}" stroke="#706e88" stroke-dasharray="4 3"/>`);
    if (pt.y !== 0) parts.push(`<line x1="${X(pt.x)}" y1="${Y(pt.y)}" x2="${X(pt.x)}" y2="${ax}" stroke="#706e88" stroke-dasharray="4 3"/>`);
    parts.push(`<circle cx="${X(pt.x)}" cy="${Y(pt.y)}" r="3.6" fill="#e5484d"/>`);
    parts.push(`<text x="${X(pt.x) + 6}" y="${Y(pt.y) - 6}" font-size="12.5" font-weight="700">${esc(pt.name)}</text>`);
  }
  const label = `${fields.title ? fields.title + '. ' : ''}${lines.map((l) => l.label).join('; ')}${points.length ? (lines.length ? '; ' : '') + points.map((p) => `${p.name}(${fmt(p.x)}; ${fmt(p.y)})`).join('; ') : ''}`;
  const svg = `<svg class="chart-svg" viewBox="0 0 ${W} ${H.toFixed(0)}" width="${W}" height="${H.toFixed(0)}" role="img" aria-label="${esc(label)}" font-family="inherit" fill="#1b1a2e"><title>${esc(label)}</title>${parts.join('')}</svg>`;
  return { svg, errors: [] };
}
