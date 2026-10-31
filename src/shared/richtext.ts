import katex from 'katex';
import { figureToSvg } from './figure';
import { chartToSvg } from './chart';

/**
 * Văn bản bài học / câu hỏi:
 *  - công thức cùng dòng: \( ... \)   – công thức dòng riêng: \[ ... \]
 *  - dòng bắt đầu bằng "- " → danh sách; "1. " → danh sách đánh số
 *  - **chữ đậm**; dòng trống tách đoạn
 *  - hình vẽ hình học: [hinh] A(0,0) B(4,0) C(1,3)  ABCA [/hinh]  (xem shared/figure.ts)
 *  - biểu đồ thống kê: [bieudo] loai: cot … [/bieudo]  (xem shared/chart.ts)
 *  - bảng: các dòng liền nhau bắt đầu bằng "|", ví dụ "| Tháng | 1 | 2 |"; dòng "|---|---|" ngay sau dòng đầu → dòng đầu là tiêu đề
 * Mọi chữ thường đều được escape HTML; chỉ KaTeX sinh mã HTML (trust=false) → an toàn khi chèn.
 */

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/**
 * KaTeX ghi cảnh báo "No character metrics…" cho mỗi chữ tiếng Việt có dấu trong \text{…} (không có số đo phông,
 * nhưng vẫn hiển thị đúng bằng phông dự phòng). Tắt riêng cảnh báo đó để nhật ký máy chủ không bị nhiễu.
 */
function quietKatex<T>(fn: () => T): T {
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].startsWith('No character metrics')) return;
    warn(...args);
  };
  try {
    return fn();
  } finally {
    console.warn = warn;
  }
}

export function renderMath(tex: string, display: boolean): string {
  try {
    return quietKatex(() => katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: 'ignore',
      trust: false,
      output: 'htmlAndMathml',
      maxSize: 20,
      maxExpand: 500,
    }));
  } catch {
    return `<code class="math-error">${escapeHtml(tex)}</code>`;
  }
}

const MATH_RE = /\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]/g;
const TOKEN_RE = /\u0000(\d+)\u0000/g;

interface Extracted {
  text: string;
  math: { tex: string; display: boolean; figure?: boolean; chart?: boolean }[];
}

const FIGURE_RE = /\[hinh\]([\s\S]*?)\[\/hinh\]/g;
const CHART_RE = /\[bieudo\]([\s\S]*?)\[\/bieudo\]/g;

function renderChartBlock(source: string): string {
  const { svg, errors } = chartToSvg(source.trim());
  if (errors.length) return `<span class="math-error">Biểu đồ lỗi: ${escapeHtml(errors[0])}</span>`;
  return `<span class="lesson-chart">${svg}</span>`;
}

function renderFigureBlock(source: string): string {
  const { svg, errors } = figureToSvg(source.trim(), { maxWidth: 380, maxHeight: 280 });
  if (errors.length) return `<span class="math-error">Hình vẽ lỗi: ${escapeHtml(errors[0])}</span>`;
  return `<span class="lesson-figure">${svg}</span>`;
}

function extractMath(src: string): Extracted {
  const math: Extracted['math'] = [];
  const withCharts = src.replace(CHART_RE, (_, body: string) => {
    math.push({ tex: body, display: true, chart: true });
    return `\u0000${math.length - 1}\u0000`;
  });
  const withFigures = withCharts.replace(FIGURE_RE, (_, body: string) => {
    math.push({ tex: body, display: true, figure: true });
    return `\u0000${math.length - 1}\u0000`;
  });
  const text = withFigures.replace(MATH_RE, (_, inline: string | undefined, display: string | undefined) => {
    math.push(inline !== undefined ? { tex: inline, display: false } : { tex: display!, display: true });
    return `\u0000${math.length - 1}\u0000`;
  });
  return { text, math };
}

function formatInline(text: string, math: Extracted['math']): string {
  let html = escapeHtml(text.replace(/\u0000/g, '\u0001')).replace(/\u0001/g, '\u0000');
  html = html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\n/g, '<br>');
  return html.replace(TOKEN_RE, (_, n: string) => {
    const m = math[Number(n)];
    if (!m) return '';
    if (m.figure) return renderFigureBlock(m.tex);
    if (m.chart) return renderChartBlock(m.tex);
    return m.display ? `<span class="math-display">${renderMath(m.tex, true)}</span>` : renderMath(m.tex, false);
  });
}

/** Hiển thị một đoạn ngắn (phương án, ý, tiêu đề) – không tạo đoạn văn / danh sách. */
export function renderRichInline(src: string): string {
  const { text, math } = extractMath(src.trim());
  return formatInline(text, math);
}

/** Hiển thị văn bản nhiều đoạn. */
export function renderRich(src: string): string {
  const { text, math } = extractMath(src.replace(/\r\n?/g, '\n').trim());
  if (!text) return '';
  const lines = text.split('\n');
  const out: string[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let table: string[] = [];

  const flushPara = () => {
    if (!para.length) return;
    const joined = para.join('\n');
    const onlyDisplay = /^\s*\u0000(\d+)\u0000\s*$/.exec(joined);
    const single = onlyDisplay ? math[Number(onlyDisplay[1])] : undefined;
    if (single?.chart) {
      out.push(`<figure class="chart-block">${renderChartBlock(single.tex)}</figure>`);
    } else if (single?.figure) {
      out.push(`<figure class="figure-block">${renderFigureBlock(single.tex)}</figure>`);
    } else if (single?.display) {
      out.push(`<div class="math-block">${renderMath(single.tex, true)}</div>`);
    } else {
      out.push(`<p>${formatInline(joined, math)}</p>`);
    }
    para = [];
  };
  const flushTable = () => {
    if (!table.length) return;
    const cells = (row: string) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
    const isSep = (row: string) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(row.trim());
    const rows = table.filter((r) => !isSep(r));
    const header = table.length > 1 && isSep(table[1]);
    const html = rows
      .map((r, i) => {
        const tag = header && i === 0 ? 'th' : 'td';
        return `<tr>${cells(r).map((c) => `<${tag}>${formatInline(c, math)}</${tag}>`).join('')}</tr>`;
      })
      .join('');
    out.push(`<div class="rich-table-wrap"><table class="rich-table">${header ? `<thead>${html.split('</tr>')[0]}</tr></thead><tbody>${html.slice(html.indexOf('</tr>') + 5)}</tbody>` : `<tbody>${html}</tbody>`}</table></div>`);
    table = [];
  };
  const flushList = () => {
    if (!list) return;
    const tag = list.ordered ? 'ol' : 'ul';
    out.push(`<${tag}>${list.items.map((i) => `<li>${formatInline(i, math)}</li>`).join('')}</${tag}>`);
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = /^\s*[-•]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (/^\s*\|/.test(line)) {
      flushPara();
      flushList();
      table.push(line);
      continue;
    }
    flushTable();
    if (!line.trim()) {
      flushPara();
      flushList();
    } else if (bullet || numbered) {
      flushPara();
      const ordered = !bullet;
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
    } else if (list && /^\s{2,}\S/.test(raw)) {
      list.items[list.items.length - 1] += '\n' + line.trim();
    } else {
      flushList();
      para.push(line);
    }
  }
  flushTable();
  flushPara();
  flushList();
  return out.join('');
}

const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', n: 'ⁿ', '-': '⁻' };
const SYMBOLS: [RegExp, string][] = [
  [/\\(left|right|big|Big)/g, ''],
  [/\^\\circ/g, '°'],
  [/\\widehat\{([^}]*)\}/g, '∠$1'],
  [/\\(d?frac)\{([^{}]*)\}\{([^{}]*)\}/g, '$2/$3'],
  [/\\sqrt\{([^{}]*)\}/g, '√$1'],
  [/\\(cdot)/g, '·'],
  [/\\(times)/g, '×'],
  [/\\(ne|neq)\b/g, '≠'],
  [/\\(le|leq)\b/g, '≤'],
  [/\\(ge|geq)\b/g, '≥'],
  [/\\Leftrightarrow/g, '⇔'],
  [/\\Rightarrow/g, '⇒'],
  [/\\parallel/g, '∥'],
  [/\\perp/g, '⊥'],
  [/\\triangle/g, '△'],
  [/\\pi\b/g, 'π'],
  [/\\,/g, ' '],
];

/** Bản rút gọn dạng chữ (cho bảng, tiêu đề): đổi kí hiệu LaTeX thường gặp sang kí tự Unicode. */
export function plainExcerpt(src: string, max = 140): string {
  let t = src.replace(/\[bieudo\][\s\S]*?\[\/bieudo\]/g, ' (biểu đồ) ').replace(/\[hinh\][\s\S]*?\[\/hinh\]/g, ' ').replace(/\\\(|\\\)|\\\[|\\\]/g, '');
  for (const [re, rep] of SYMBOLS) t = t.replace(re, rep);
  t = t
    .replace(/\^\{([0-9n-]+)\}/g, (_, d: string) => [...d].map((c) => SUP[c] ?? c).join(''))
    .replace(/\^([0-9n])/g, (_, d: string) => SUP[d] ?? d)
    .replace(/\\text\{([^}]*)\}/g, '$1')
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[{}]/g, '')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return t.length > max ? t.slice(0, max - 1).trimEnd() + '…' : t;
}

/** Kiểm tra cú pháp công thức – trả về danh sách lỗi (tiếng Việt) để báo khi soạn. */
export function findMathErrors(src: string): string[] {
  const errors: string[] = [];
  const opens = (src.match(/\\\(/g) ?? []).length;
  const closes = (src.match(/\\\)/g) ?? []).length;
  if (opens !== closes) errors.push('Số dấu mở \\( và đóng \\) không bằng nhau.');
  const dOpen = (src.match(/\\\[/g) ?? []).length;
  const dClose = (src.match(/\\\]/g) ?? []).length;
  if (dOpen !== dClose) errors.push('Số dấu mở \\[ và đóng \\] không bằng nhau.');
  const { math } = extractMath(src);
  for (const m of math) {
    if (m.figure) {
      const { errors: figErrors } = figureToSvg(m.tex);
      for (const e of figErrors) errors.push('Hình vẽ: ' + e);
      continue;
    }
    if (m.chart) {
      for (const e of chartToSvg(m.tex).errors) errors.push('Biểu đồ: ' + e);
      continue;
    }
    try {
      katex.renderToString(m.tex, { throwOnError: true, strict: 'ignore', displayMode: m.display });
    } catch (err) {
      errors.push(`Công thức "${m.tex.slice(0, 40)}" bị lỗi: ${(err as Error).message.replace(/^KaTeX parse error: /, '')}`);
    }
  }
  return errors;
}
