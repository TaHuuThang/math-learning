/**
 * Sơ đồ quan hệ giữa các kiến thức (khối [sodo] trong nội dung) → SVG.
 *
 *   [sodo]
 *   A(1,0) Tứ giác                 ← nút: Tên(cột, hàng) nhãn  (cột, hàng là số, có thể lẻ 0,5)
 *   B(1,1) Hình thang
 *   C(0,2) Hình thang cân
 *   A > B : hai cạnh đối song song  ← mũi tên từ A đến B, sau dấu ":" là điều kiện (không bắt buộc)
 *   B - C                           ← nối không mũi tên
 *   # dòng chú thích
 *   [/sodo]
 *
 * Mọi chữ được escape; không nhận mã SVG/HTML từ người soạn.
 */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

interface Node {
  name: string;
  col: number;
  row: number;
  label: string;
  tone: number;
}
interface Edge {
  from: string;
  to: string;
  arrow: boolean;
  label: string;
}

const TONES = [
  { fill: '#f4f2fd', stroke: '#8b7ad6', text: '#2c1f6c' },
  { fill: '#e2f4ea', stroke: '#18875c', text: '#0f5a3d' },
  { fill: '#fdf0dc', stroke: '#c86b00', text: '#7a4100' },
  { fill: '#e6f0fd', stroke: '#3d7ad6', text: '#1d3f75' },
];

export function parseDiagram(src: string): { nodes: Node[]; edges: Edge[]; errors: string[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const errors: string[] = [];
  const byName = new Map<string, Node>();
  const pendingEdges: { line: number; text: string }[] = [];
  src.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) return;
    const node = /^([A-Za-z][A-Za-z0-9]*)\s*\(\s*(-?[\d.,]+)\s*[,;]\s*(-?[\d.,]+)\s*\)\s*(\*{0,3})\s*(.+)$/.exec(line);
    if (node) {
      const [, name, c, r, stars, label] = node;
      const col = Number(c.replace(',', '.'));
      const row = Number(r.replace(',', '.'));
      if (!Number.isFinite(col) || !Number.isFinite(row)) errors.push(`Dòng ${i + 1}: vị trí của nút ${name} không hợp lệ.`);
      else if (byName.has(name)) errors.push(`Dòng ${i + 1}: nút ${name} khai báo hai lần.`);
      else {
        const n = { name, col, row, label: label.trim(), tone: stars.length };
        byName.set(name, n);
        nodes.push(n);
      }
      return;
    }
    pendingEdges.push({ line: i + 1, text: line });
  });
  for (const { line, text } of pendingEdges) {
    const m = /^([A-Za-z][A-Za-z0-9]*)\s*(>|-)\s*([A-Za-z][A-Za-z0-9]*)\s*(?::\s*(.*))?$/.exec(text);
    if (!m) {
      errors.push(`Dòng ${line}: không hiểu "${text.slice(0, 30)}". Nút viết A(0,0) Nhãn; mũi tên viết A > B : điều kiện.`);
      continue;
    }
    const [, from, op, to, label] = m;
    if (!byName.has(from) || !byName.has(to)) {
      errors.push(`Dòng ${line}: nút ${!byName.has(from) ? from : to} chưa được khai báo.`);
      continue;
    }
    edges.push({ from, to, arrow: op === '>', label: (label ?? '').trim() });
  }
  if (!nodes.length && !errors.length) errors.push('Sơ đồ cần ít nhất một nút, ví dụ A(0,0) Tứ giác.');
  return { nodes, edges, errors };
}

/** Bẻ dòng nhãn theo số kí tự tối đa. */
function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if (cur && (cur + ' ' + w).length > max) {
      lines.push(cur);
      cur = w;
    } else cur = cur ? cur + ' ' + w : w;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

export function diagramToSvg(src: string): { svg: string; errors: string[] } {
  const { nodes, edges, errors } = parseDiagram(src);
  if (errors.length) return { svg: '', errors };
  const CW = 178;
  const RH = 96;
  const BW = 150;
  const minCol = Math.min(...nodes.map((n) => n.col));
  const minRow = Math.min(...nodes.map((n) => n.row));
  const pad = 14;
  const pos = new Map<string, { x: number; y: number; h: number; lines: string[] }>();
  for (const n of nodes) {
    const lines = wrap(n.label, 20);
    const h = 18 + lines.length * 16;
    pos.set(n.name, { x: pad + (n.col - minCol) * CW, y: pad + (n.row - minRow) * RH, h, lines });
  }
  const W = Math.max(...[...pos.values()].map((p) => p.x)) + BW + pad;
  const H = Math.max(...[...pos.values()].map((p) => p.y + p.h)) + pad;
  const parts: string[] = [];
  parts.push('<defs><marker id="sd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#45435e"/></marker></defs>');
  const labels: string[] = [];
  for (const e of edges) {
    const a = pos.get(e.from)!;
    const b = pos.get(e.to)!;
    const ac = { x: a.x + BW / 2, y: a.y + a.h / 2 };
    const bc = { x: b.x + BW / 2, y: b.y + b.h / 2 };
    // Điểm ra/vào ở mép hộp theo hướng nối
    const edgePoint = (p: { x: number; y: number; h: number }, c: { x: number; y: number }, toward: { x: number; y: number }) => {
      const dx = toward.x - c.x;
      const dy = toward.y - c.y;
      const sx = dx === 0 ? Infinity : BW / 2 / Math.abs(dx);
      const sy = dy === 0 ? Infinity : p.h / 2 / Math.abs(dy);
      const s = Math.min(sx, sy);
      return { x: c.x + dx * s, y: c.y + dy * s };
    };
    const p1 = edgePoint(a, ac, bc);
    const p2 = edgePoint(b, bc, ac);
    parts.push(
      `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#45435e" stroke-width="1.6"${e.arrow ? ' marker-end="url(#sd-arrow)"' : ''}/>`,
    );
    if (e.label) {
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const ls = wrap(e.label, 26);
      ls.forEach((t, i) =>
        labels.push(
          `<text x="${mx.toFixed(1)}" y="${(my + 4 + (i - (ls.length - 1) / 2) * 13).toFixed(1)}" text-anchor="middle" font-size="11.5" fill="#706e88" stroke="#fff" stroke-width="3.5" paint-order="stroke">${esc(t)}</text>`,
        ),
      );
    }
  }
  for (const n of nodes) {
    const p = pos.get(n.name)!;
    const t = TONES[n.tone % TONES.length];
    parts.push(`<rect x="${p.x}" y="${p.y}" width="${BW}" height="${p.h}" rx="12" fill="${t.fill}" stroke="${t.stroke}" stroke-width="1.5"/>`);
    p.lines.forEach((line, i) =>
      parts.push(`<text x="${p.x + BW / 2}" y="${p.y + 22 + i * 16}" text-anchor="middle" font-size="13.5" font-weight="700" fill="${t.text}">${esc(line)}</text>`),
    );
  }
  const label = `Sơ đồ: ${nodes.map((n) => n.label).join(', ')}`;
  const svg = `<svg class="diagram-svg" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" width="${W.toFixed(0)}" height="${H.toFixed(0)}" role="img" aria-label="${esc(label)}" font-family="inherit">${parts.join('')}${labels.join('')}</svg>`;
  return { svg, errors: [] };
}
