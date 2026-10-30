/**
 * Hình vẽ hình học mô tả bằng văn bản → SVG (dùng cho câu tự luận hình học).
 *
 *   A(0,4) B(-3,0) C(4,0) H(0,0)   ← điểm: Tên(x, y)
 *   AB BC CA                        ← đoạn thẳng (tên điểm một chữ cái), hoặc A1-B2
 *   AH:dash                         ← nét đứt
 *   vuong(A,H,B)                    ← kí hiệu góc vuông tại H
 *   goc(B,A,C)                      ← cung đánh dấu góc tại A
 *   tron(O,3)                       ← đường tròn tâm O bán kính 3
 *   # dòng chú thích
 */

export interface FigurePoint {
  name: string;
  x: number;
  y: number;
}

export interface Figure {
  points: FigurePoint[];
  segments: { a: string; b: string; dashed: boolean }[];
  rightAngles: { a: string; v: string; b: string }[];
  angles: { a: string; v: string; b: string }[];
  circles: { center: string; r: number }[];
  errors: string[];
}

const POINT_NAME = /^[A-Z][0-9']*$/;

export function parseFigure(src: string): Figure {
  const fig: Figure = { points: [], segments: [], rightAngles: [], angles: [], circles: [], errors: [] };
  const byName = new Map<string, FigurePoint>();
  const pending: { line: number; run: () => void }[] = [];

  src.split(/\r?\n/).forEach((rawLine, idx) => {
    const lineNo = idx + 1;
    const line = rawLine.replace(/#.*$/, '').trim();
    if (!line) return;
    const rest = line.replace(/([A-Za-z][A-Za-z0-9']*)\s*\(([^()]*)\)/g, (_, name: string, args: string) => {
      const parts = args.split(',').map((s) => s.trim());
      if (POINT_NAME.test(name)) {
        const [x, y] = parts.map(Number);
        if (parts.length !== 2 || !Number.isFinite(x) || !Number.isFinite(y)) {
          fig.errors.push(`Dòng ${lineNo}: điểm ${name} cần 2 tọa độ số, ví dụ ${name}(1,2).`);
        } else if (byName.has(name)) {
          fig.errors.push(`Dòng ${lineNo}: điểm ${name} được khai báo hai lần.`);
        } else {
          const p = { name, x, y };
          byName.set(name, p);
          fig.points.push(p);
        }
        return ' ';
      }
      const cmd = name.toLowerCase();
      pending.push({
        line: lineNo,
        run: () => {
          if (cmd === 'vuong' || cmd === 'goc') {
            if (parts.length !== 3 || parts.some((p) => !byName.has(p))) {
              fig.errors.push(`Dòng ${lineNo}: ${cmd}(...) cần 3 điểm đã khai báo, ví dụ ${cmd}(A,H,B).`);
              return;
            }
            const item = { a: parts[0], v: parts[1], b: parts[2] };
            (cmd === 'vuong' ? fig.rightAngles : fig.angles).push(item);
          } else if (cmd === 'tron') {
            const r = Number(parts[1]);
            if (parts.length !== 2 || !byName.has(parts[0]) || !(r > 0)) {
              fig.errors.push(`Dòng ${lineNo}: tron(O, r) cần tâm đã khai báo và bán kính dương.`);
              return;
            }
            fig.circles.push({ center: parts[0], r });
          } else {
            fig.errors.push(`Dòng ${lineNo}: không hiểu lệnh "${name}(...)".`);
          }
        },
      });
      return ' ';
    });
    for (const token of rest.split(/[\s,;]+/).filter(Boolean)) {
      pending.push({
        line: lineNo,
        run: () => {
          const [body, flag] = token.split(':');
          const dashed = flag === 'dash' || flag === 'dut';
          const names = body.includes('-') ? body.split('-') : (body.match(/[A-Z][0-9']*/g) ?? []);
          if (names.join(body.includes('-') ? '-' : '') !== body || names.length < 2) {
            fig.errors.push(`Dòng ${lineNo}: không hiểu "${token}". Đoạn thẳng viết dạng AB hoặc A1-B.`);
            return;
          }
          for (const n of names) {
            if (!byName.has(n)) {
              fig.errors.push(`Dòng ${lineNo}: điểm ${n} chưa được khai báo tọa độ.`);
              return;
            }
          }
          // ABC → AB, BC (đường gấp khúc)
          for (let i = 0; i + 1 < names.length; i++) fig.segments.push({ a: names[i], b: names[i + 1], dashed });
        },
      });
    }
  });
  pending.forEach((p) => p.run());
  if (!fig.points.length && !fig.errors.length) fig.errors.push('Chưa có điểm nào. Khai báo điểm dạng A(0,0).');
  return fig;
}

function fmt(n: number) {
  return Number(n.toFixed(2)).toString();
}

function escapeXml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

/** SVG tự co giãn (viewBox), nét theo currentColor để hợp mọi nền. */
export function renderFigureSvg(fig: Figure, opts: { maxWidth?: number; maxHeight?: number; label?: string } = {}): string {
  const maxW = opts.maxWidth ?? 420;
  const maxH = opts.maxHeight ?? 320;
  if (!fig.points.length) return '';
  const byName = new Map(fig.points.map((p) => [p.name, p]));
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of fig.points) {
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
  }
  for (const c of fig.circles) {
    const o = byName.get(c.center)!;
    minX = Math.min(minX, o.x - c.r); maxX = Math.max(maxX, o.x + c.r);
    minY = Math.min(minY, o.y - c.r); maxY = Math.max(maxY, o.y + c.r);
  }
  const w = Math.max(maxX - minX, 1e-6);
  const h = Math.max(maxY - minY, 1e-6);
  const pad = 28;
  const scale = Math.min((maxW - 2 * pad) / w, (maxH - 2 * pad) / h);
  const width = Math.round(w * scale + 2 * pad);
  const height = Math.round(h * scale + 2 * pad);
  const X = (x: number) => pad + (x - minX) * scale;
  const Y = (y: number) => height - pad - (y - minY) * scale;
  const cx = fig.points.reduce((s, p) => s + X(p.x), 0) / fig.points.length;
  const cy = fig.points.reduce((s, p) => s + Y(p.y), 0) / fig.points.length;

  const parts: string[] = [];
  for (const c of fig.circles) {
    const o = byName.get(c.center)!;
    parts.push(`<circle cx="${fmt(X(o.x))}" cy="${fmt(Y(o.y))}" r="${fmt(c.r * scale)}" fill="none" stroke="currentColor" stroke-width="1.6"/>`);
  }
  for (const s of fig.segments) {
    const a = byName.get(s.a)!, b = byName.get(s.b)!;
    parts.push(
      `<line x1="${fmt(X(a.x))}" y1="${fmt(Y(a.y))}" x2="${fmt(X(b.x))}" y2="${fmt(Y(b.y))}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"${s.dashed ? ' stroke-dasharray="6 5"' : ''}/>`,
    );
  }
  const unit = (from: FigurePoint, to: FigurePoint) => {
    const dx = X(to.x) - X(from.x), dy = Y(to.y) - Y(from.y);
    const len = Math.hypot(dx, dy) || 1;
    return [dx / len, dy / len];
  };
  for (const r of fig.rightAngles) {
    const v = byName.get(r.v)!, a = byName.get(r.a)!, b = byName.get(r.b)!;
    const [ux, uy] = unit(v, a), [wx, wy] = unit(v, b);
    const s = 11, vx = X(v.x), vy = Y(v.y);
    parts.push(
      `<path d="M${fmt(vx + ux * s)} ${fmt(vy + uy * s)} L${fmt(vx + (ux + wx) * s)} ${fmt(vy + (uy + wy) * s)} L${fmt(vx + wx * s)} ${fmt(vy + wy * s)}" fill="none" stroke="currentColor" stroke-width="1.3"/>`,
    );
  }
  for (const g of fig.angles) {
    const v = byName.get(g.v)!, a = byName.get(g.a)!, b = byName.get(g.b)!;
    const [ux, uy] = unit(v, a), [wx, wy] = unit(v, b);
    const r = 20, vx = X(v.x), vy = Y(v.y);
    const cross = ux * wy - uy * wx;
    parts.push(
      `<path d="M${fmt(vx + ux * r)} ${fmt(vy + uy * r)} A${r} ${r} 0 0 ${cross > 0 ? 1 : 0} ${fmt(vx + wx * r)} ${fmt(vy + wy * r)}" fill="none" stroke="var(--fig-accent, currentColor)" stroke-width="1.5"/>`,
    );
  }
  for (const p of fig.points) {
    const px = X(p.x), py = Y(p.y);
    let dx = px - cx, dy = py - cy;
    const len = Math.hypot(dx, dy);
    if (len < 1) { dx = 0; dy = -1; } else { dx /= len; dy /= len; }
    parts.push(`<circle cx="${fmt(px)}" cy="${fmt(py)}" r="2.6" fill="currentColor"/>`);
    parts.push(
      `<text x="${fmt(px + dx * 15)}" y="${fmt(py + dy * 15 + 5)}" text-anchor="middle" font-family="KaTeX_Main, 'Times New Roman', serif" font-style="italic" font-size="16" fill="currentColor">${escapeXml(p.name)}</text>`,
    );
  }
  const label = escapeXml(opts.label ?? `Hình vẽ gồm các điểm ${fig.points.map((p) => p.name).join(', ')}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}" class="figure-svg">${parts.join('')}</svg>`;
}

export function figureToSvg(src: string, opts?: Parameters<typeof renderFigureSvg>[1]): { svg: string; errors: string[] } {
  const fig = parseFigure(src);
  return { svg: fig.errors.length ? '' : renderFigureSvg(fig, opts), errors: fig.errors };
}
