/**
 * So khớp câu trả lời ngắn – hàm thuần, chạy được cả trên máy chủ lẫn trong trình duyệt (bản HTML).
 *
 * Hỗ trợ: số nguyên, số thập phân (dấu phẩy hoặc dấu chấm), phân số a/b, căn (√, sqrt), biểu thức có biến
 * (so sánh tương đương bằng cách tính giá trị tại nhiều điểm), tập nghiệm "x = 1; x = -2",
 * kết quả có đơn vị (tự đổi cm ↔ m, cm² ↔ m², giờ ↔ phút…), dạng tích khi đề yêu cầu phân tích thành nhân tử.
 */

export type MatchMode = 'auto' | 'number' | 'expression' | 'factored' | 'set' | 'exact';

export const MATCH_MODES: { value: MatchMode; label: string; help: string }[] = [
  { value: 'auto', label: 'Tự nhận biết', help: 'Đáp án là số → so sánh giá trị; có biến → so sánh biểu thức tương đương; có dấu ";" → tập nghiệm.' },
  { value: 'number', label: 'Giá trị số', help: 'Chấp nhận mọi cách viết cùng giá trị: 0,5 = 0.5 = 1/2; có sai số nếu đặt.' },
  { value: 'expression', label: 'Biểu thức tương đương', help: 'Chấp nhận biểu thức bằng nhau với mọi giá trị của biến, ví dụ x^2+2x+1 và (x+1)^2.' },
  { value: 'factored', label: 'Dạng tích (phân tích thành nhân tử)', help: 'Phải tương đương với đáp án và được viết dưới dạng tích.' },
  { value: 'set', label: 'Tập nghiệm / nhiều giá trị', help: 'Các giá trị cách nhau bởi dấu ";", không phân biệt thứ tự, ví dụ "x = 1; x = -2".' },
  { value: 'exact', label: 'Đúng nguyên văn', help: 'So sánh chữ sau khi bỏ khoảng trắng và chữ hoa/thường.' },
];

export interface AnswerRule {
  mode?: MatchMode;
  /** Sai số tuyệt đối chấp nhận. */
  tolerance?: number;
  /** Đơn vị của đáp án (hiển thị cạnh ô nhập, dùng để đổi đơn vị). */
  unit?: string;
}

export interface MatchResult {
  ok: boolean;
  /** Ghi chú cho học sinh, ví dụ "Đơn vị không phù hợp". */
  note?: string;
}

// ---------------- Đơn vị ----------------

interface UnitDef {
  dim: string;
  factor: number;
}

const UNITS: Record<string, UnitDef> = {};
function defUnits(dim: string, list: [string[], number][]) {
  for (const [names, factor] of list) for (const n of names) UNITS[n] = { dim, factor };
}
defUnits('L', [[['mm'], 1e-3], [['cm'], 1e-2], [['dm'], 1e-1], [['m'], 1], [['km'], 1e3]]);
defUnits('A', [[['mm2', 'mm²'], 1e-6], [['cm2', 'cm²'], 1e-4], [['dm2', 'dm²'], 1e-2], [['m2', 'm²'], 1], [['ha'], 1e4], [['km2', 'km²'], 1e6]]);
defUnits('V', [[['mm3', 'mm³'], 1e-9], [['cm3', 'cm³', 'ml'], 1e-6], [['dm3', 'dm³', 'l', 'lít'], 1e-3], [['m3', 'm³'], 1]]);
defUnits('M', [[['g'], 1e-3], [['kg'], 1], [['yến'], 10], [['tạ'], 100], [['tấn'], 1000]]);
defUnits('T', [[['s', 'giây'], 1], [['phút', 'ph'], 60], [['giờ', 'h'], 3600], [['ngày'], 86400]]);
defUnits('S', [[['m/s'], 1], [['km/h', 'km/giờ'], 1000 / 3600]]);
defUnits('D', [[['°', 'độ'], 1]]);
defUnits('P', [[['%'], 0.01]]);

const UNIT_NAMES = Object.keys(UNITS).sort((a, b) => b.length - a.length);

function unitKey(u: string): string {
  return u.trim().toLowerCase().replace(/\s+/g, '').replace(/\^2$/, '²').replace(/\^3$/, '³');
}

/** Tách đơn vị ở cuối câu trả lời (nếu có). */
function splitUnit(text: string, expectedUnit: string | undefined): { value: string; unit: string | null } {
  const t = text.trim();
  const candidates = [...(expectedUnit ? [expectedUnit.trim()] : []), ...UNIT_NAMES];
  for (const u of candidates) {
    if (!u) continue;
    const lower = t.toLowerCase();
    const ul = u.toLowerCase();
    if (lower.endsWith(ul) && lower.length > ul.length) {
      const rest = t.slice(0, t.length - u.length);
      // đơn vị chữ phải đứng sau số hoặc khoảng trắng, tránh cắt nhầm biến ("2m" là 2 mét, nhưng "am" thì không)
      const before = rest.slice(-1);
      if (/[a-zà-ỹ]/i.test(ul[0]) && !/[\d\s)]/.test(before)) continue;
      return { value: rest.trim(), unit: u };
    }
  }
  return { value: t, unit: null };
}

/** Hệ số đổi từ đơn vị học sinh ghi sang đơn vị của đáp án; null nếu không đổi được. */
function unitFactor(given: string, expected: string): number | null {
  const g = UNITS[unitKey(given)];
  const e = UNITS[unitKey(expected)];
  if (!g || !e) return unitKey(given) === unitKey(expected) ? 1 : null;
  if (g.dim !== e.dim) return null;
  return g.factor / e.factor;
}

// ---------------- Chuẩn hóa cách viết ----------------

/** Đổi cách viết LaTeX / kí hiệu đặc biệt sang dạng phẳng: \dfrac{a}{b} → (a)/(b), √2 → sqrt(2), x² → x^2. */
export function toPlainMath(input: string): string {
  let s = input.trim();
  s = s.replace(/\\\(|\\\)|\\\[|\\\]|\$/g, '');
  // \dfrac{a}{b}, \frac{a}{b} (cho phép lồng một tầng ngoặc)
  const brace = String.raw`\{((?:[^{}]|\{[^{}]*\})*)\}`;
  const fracRe = new RegExp(String.raw`\\[dt]?frac\s*` + brace + String.raw`\s*` + brace);
  for (let i = 0; i < 10 && fracRe.test(s); i++) s = s.replace(fracRe, '(($1)/($2))');
  // \dfrac12, \frac{1}2: tử/mẫu một kí tự không có ngoặc
  s = s.replace(/\\[dt]?frac\s*(\{[^{}]*\}|[0-9a-zA-Z])\s*(\{[^{}]*\}|[0-9a-zA-Z])/g, (_, a: string, b: string) => `((${a.replace(/^\{|\}$/g, '')})/(${b.replace(/^\{|\}$/g, '')}))`);
  const sqrtRe = new RegExp(String.raw`\\sqrt\s*` + brace);
  for (let i = 0; i < 10 && sqrtRe.test(s); i++) s = s.replace(sqrtRe, 'sqrt($1)');
  s = s
    .replace(/\\left|\\right/g, '')
    .replace(/\\cdot|\\times|×|·/g, '*')
    .replace(/\\div|÷|:/g, '/')
    .replace(/\\pi|π/g, 'pi')
    .replace(/\\circ|°/g, '°')
    .replace(/\^\{([^{}]*)\}/g, '^($1)')
    .replace(/[{}]/g, (c) => (c === '{' ? '(' : ')'))
    .replace(/\[/g, '(')
    .replace(/\]/g, ')')
    .replace(/[−–—]/g, '-')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/\\,|\\;|\\!|~/g, ' ');
  // √x, √(..), √12 → sqrt(..)
  s = s.replace(/√\s*\(/g, 'sqrt(').replace(/√\s*([0-9.,]+|[a-z])/gi, 'sqrt($1)');
  return s;
}

// ---------------- Bộ phân tích biểu thức ----------------

type Node =
  | { k: 'num'; v: number }
  | { k: 'var'; name: string }
  | { k: 'neg'; a: Node }
  | { k: 'bin'; op: '+' | '-' | '*' | '/' | '^'; a: Node; b: Node }
  | { k: 'fn'; name: 'sqrt'; a: Node };

type Tok = { t: 'num'; v: number } | { t: 'id'; v: string } | { t: 'op'; v: string };

function tokenize(src: string): Tok[] | null {
  const s = src.replace(/\s+/g, '');
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.,]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9]/.test(s[j])) j++;
      // phần thập phân: dấu "." hoặc "," theo sau là chữ số
      if (j < s.length && (s[j] === '.' || s[j] === ',') && /[0-9]/.test(s[j + 1] ?? '')) {
        j++;
        while (j < s.length && /[0-9]/.test(s[j])) j++;
      }
      if (j === i) return null;
      const v = Number(s.slice(i, j).replace(',', '.'));
      if (!Number.isFinite(v)) return null;
      out.push({ t: 'num', v });
      i = j;
      continue;
    }
    if (/[a-z]/i.test(c)) {
      if (s.startsWith('sqrt', i)) {
        out.push({ t: 'id', v: 'sqrt' });
        i += 4;
        continue;
      }
      if (s.startsWith('pi', i)) {
        out.push({ t: 'id', v: 'pi' });
        i += 2;
        continue;
      }
      out.push({ t: 'id', v: c.toLowerCase() });
      i++;
      continue;
    }
    if ('+-*/^()'.includes(c)) {
      out.push({ t: 'op', v: c });
      i++;
      continue;
    }
    return null;
  }
  // nhân ngầm: 2x, x(x+1), (a)(b), 2sqrt(3), x y
  const res: Tok[] = [];
  for (let k = 0; k < out.length; k++) {
    const prev = res[res.length - 1];
    const cur = out[k];
    const prevEnds = prev && (prev.t === 'num' || (prev.t === 'id' && prev.v !== 'sqrt') || (prev.t === 'op' && prev.v === ')'));
    const curStarts = cur.t === 'num' || cur.t === 'id' || (cur.t === 'op' && cur.v === '(');
    if (prevEnds && curStarts && !(prev.t === 'num' && cur.t === 'num')) res.push({ t: 'op', v: '*' });
    res.push(cur);
  }
  return res;
}

function parseTokens(toks: Tok[]): Node | null {
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => peek()?.t === 'op' && peek()!.v === v;
  function expr(): Node | null {
    let left = term();
    while (left && (isOp('+') || isOp('-'))) {
      const op = (toks[p++] as { v: '+' | '-' }).v;
      const right = term();
      if (!right) return null;
      left = { k: 'bin', op, a: left, b: right };
    }
    return left;
  }
  function term(): Node | null {
    let left = unary();
    while (left && (isOp('*') || isOp('/'))) {
      const op = (toks[p++] as { v: '*' | '/' }).v;
      const right = unary();
      if (!right) return null;
      left = { k: 'bin', op, a: left, b: right };
    }
    return left;
  }
  function unary(): Node | null {
    if (isOp('-')) {
      p++;
      const a = unary();
      return a ? { k: 'neg', a } : null;
    }
    if (isOp('+')) {
      p++;
      return unary();
    }
    return power();
  }
  function power(): Node | null {
    const base = atom();
    if (base && isOp('^')) {
      p++;
      const exp = unary();
      return exp ? { k: 'bin', op: '^', a: base, b: exp } : null;
    }
    return base;
  }
  function atom(): Node | null {
    const tk = peek();
    if (!tk) return null;
    if (tk.t === 'num') {
      p++;
      return { k: 'num', v: tk.v };
    }
    if (tk.t === 'id') {
      p++;
      if (tk.v === 'pi') return { k: 'num', v: Math.PI };
      if (tk.v === 'sqrt') {
        const a = atom();
        return a ? { k: 'fn', name: 'sqrt', a } : null;
      }
      return { k: 'var', name: tk.v };
    }
    if (tk.v === '(') {
      p++;
      const e = expr();
      if (!e || !isOp(')')) return null;
      p++;
      return e;
    }
    return null;
  }
  const node = expr();
  return node && p === toks.length ? node : null;
}

export function parseExpression(src: string): Node | null {
  const plain = toPlainMath(src);
  if (!plain || plain.length > 300) return null;
  const toks = tokenize(plain);
  if (!toks || !toks.length) return null;
  return parseTokens(toks);
}

function evalNode(n: Node, env: Record<string, number>): number {
  switch (n.k) {
    case 'num':
      return n.v;
    case 'var':
      return env[n.name] ?? NaN;
    case 'neg':
      return -evalNode(n.a, env);
    case 'fn':
      return Math.sqrt(evalNode(n.a, env));
    case 'bin': {
      const a = evalNode(n.a, env);
      const b = evalNode(n.b, env);
      switch (n.op) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          return a / b;
        case '^':
          return Math.pow(a, b);
      }
    }
  }
}

function varsOf(n: Node, set = new Set<string>()): Set<string> {
  if (n.k === 'var') set.add(n.name);
  else if (n.k === 'neg' || n.k === 'fn') varsOf(n.a, set);
  else if (n.k === 'bin') {
    varsOf(n.a, set);
    varsOf(n.b, set);
  }
  return set;
}

/** Giá trị của biểu thức không chứa biến (ví dụ "3/4", "2√3", "-1,5"), hoặc null. */
export function constantValue(src: string): number | null {
  const n = parseExpression(src);
  if (!n || varsOf(n).size) return null;
  const v = evalNode(n, {});
  return Number.isFinite(v) ? v : null;
}

function close(a: number, b: number, tol = 0): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  return Math.abs(a - b) <= tol + 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
}

// Các điểm thử cố định (không ngẫu nhiên) để kết quả chấm ổn định giữa các lần chạy
const SAMPLES = [0.37, 1.61, -0.83, 2.29, -1.47, 0.59, 3.11, -2.13];

/** Hai biểu thức bằng nhau với mọi giá trị của biến (thử tại 8 bộ giá trị). */
export function equivalent(a: Node, b: Node): boolean {
  const vars = [...new Set([...varsOf(a), ...varsOf(b)])].sort();
  let compared = 0;
  for (let i = 0; i < SAMPLES.length; i++) {
    const env: Record<string, number> = {};
    vars.forEach((v, j) => (env[v] = SAMPLES[(i + j * 3) % SAMPLES.length] + j * 0.11));
    const x = evalNode(a, env);
    const y = evalNode(b, env);
    if (!Number.isFinite(x) && !Number.isFinite(y)) continue; // cả hai không xác định tại điểm này
    if (!close(x, y, 1e-7 * Math.max(1, Math.abs(x)))) return false;
    compared++;
  }
  return compared >= 4;
}

/** Biểu thức có được viết dưới dạng tích (nhân tử) không: phép nhân/lũy thừa ở ngoài cùng. */
function isProduct(n: Node): boolean {
  if (n.k === 'neg') return isProduct(n.a);
  if (n.k === 'bin' && (n.op === '*' || n.op === '^')) return true;
  return false;
}

// ---------------- So khớp ----------------

function stripLhs(s: string): string {
  // "x = 3" → "3"; "y = 2x + 1" → "2x + 1"; "f(x) = …" → "…"
  return s.replace(/^\s*(?:[a-z]\s*(?:\(\s*[a-z]\s*\))?|[a-z]_?\d?)\s*=\s*/i, '');
}

function normalizeExact(s: string): string {
  return toPlainMath(s).toLowerCase().replace(/\s+/g, '').replace(/\*/g, '');
}

function splitSet(raw: string): string[] {
  const s = raw.trim().replace(/^S\s*=\s*/i, '').replace(/^\\?\{\s*/, '').replace(/\s*\\?\}$/, '');
  let parts = s.split(/;|\bhoặc\b|\bvà\b|\bor\b/i);
  if (parts.length === 1) parts = s.split(/,\s+|,(?=\s*[a-z]\s*=)/i);
  return parts.map((p) => stripLhs(p.trim())).filter(Boolean);
}

function valueOf(text: string): { num: number | null; node: Node | null } {
  const node = parseExpression(text);
  if (!node) return { num: null, node: null };
  if (varsOf(node).size === 0) {
    const v = evalNode(node, {});
    return { num: Number.isFinite(v) ? v : null, node };
  }
  return { num: null, node };
}

function detectMode(accepted: string[]): Exclude<MatchMode, 'auto'> {
  if (accepted.some((a) => a.includes(';'))) return 'set';
  if (accepted.every((a) => constantValue(stripLhs(a)) !== null)) return 'number';
  if (accepted.every((a) => parseExpression(stripLhs(a)) !== null)) return 'expression';
  return 'exact';
}

/** Chấm một câu trả lời ngắn theo danh sách đáp án được chấp nhận và quy tắc của giáo viên. */
export function matchShortAnswer(givenRaw: string, accepted: string[], rule: AnswerRule = {}): MatchResult {
  const given = givenRaw.trim();
  if (!given || !accepted.length) return { ok: false };
  const mode = !rule.mode || rule.mode === 'auto' ? detectMode(accepted) : rule.mode;
  const tol = Math.abs(rule.tolerance ?? 0);

  if (mode === 'exact') {
    const g = normalizeExact(given);
    return { ok: accepted.some((a) => normalizeExact(a) === g) };
  }

  if (mode === 'set') {
    const g = splitSet(given);
    for (const a of accepted) {
      const e = splitSet(a);
      if (e.length !== g.length) continue;
      const used = new Set<number>();
      const allMatch = e.every((ea) => {
        const ev = valueOf(ea);
        const idx = g.findIndex((ga, j) => {
          if (used.has(j)) return false;
          const gv = valueOf(ga);
          if (ev.num !== null && gv.num !== null) return close(ev.num, gv.num, tol);
          if (ev.node && gv.node) return equivalent(ev.node, gv.node);
          return normalizeExact(ga) === normalizeExact(ea);
        });
        if (idx < 0) return false;
        used.add(idx);
        return true;
      });
      if (allMatch) return { ok: true };
    }
    if (accepted.some((a) => splitSet(a).length !== g.length)) {
      const n = splitSet(accepted[0]).length;
      if (n !== g.length) return { ok: false, note: `Đáp số gồm ${n} giá trị (viết cách nhau bởi dấu ";").` };
    }
    return { ok: false };
  }

  // Tách đơn vị
  let text = stripLhs(given);
  let factor = 1;
  let unitNote: string | undefined;
  const { value, unit } = mode === 'number' || rule.unit ? splitUnit(text, rule.unit) : { value: text, unit: null };
  if (unit) {
    text = stripLhs(value);
    if (rule.unit) {
      const f = unitFactor(unit, rule.unit);
      if (f === null) return { ok: false, note: `Đơn vị "${unit}" không phù hợp (đáp số tính bằng ${rule.unit}).` };
      factor = f;
      if (f !== 1) unitNote = `Đã đổi ${unit} sang ${rule.unit}.`;
    }
  }

  if (mode === 'number') {
    const g = constantValue(text);
    if (g === null) return { ok: false, note: 'Chưa đọc được số. Viết số nguyên, số thập phân hoặc phân số a/b.' };
    const ok = accepted.some((a) => {
      const e = constantValue(stripLhs(a));
      return e !== null && close(e, g * factor, tol);
    });
    return ok ? { ok, ...(unitNote ? { note: unitNote } : {}) } : { ok: false };
  }

  // expression / factored
  const gNode = parseExpression(text);
  if (!gNode) return { ok: false, note: 'Chưa đọc được biểu thức. Dùng ^ cho lũy thừa, ví dụ x^2 + 2x.' };
  const eq = accepted.some((a) => {
    const e = parseExpression(stripLhs(a));
    return !!e && equivalent(e, gNode);
  });
  if (!eq) return { ok: false };
  if (mode === 'factored' && !isProduct(gNode)) return { ok: false, note: 'Biểu thức bằng đáp số nhưng chưa viết dưới dạng tích.' };
  return { ok: true };
}

/** Kiểm tra đáp án của giáo viên đọc được theo quy tắc đã chọn (dùng trong bộ kiểm tra chất lượng). */
export function validateAccepted(accepted: string[], rule: AnswerRule = {}): string[] {
  const errors: string[] = [];
  const mode = !rule.mode || rule.mode === 'auto' ? detectMode(accepted) : rule.mode;
  for (const a of accepted) {
    const su = splitUnit(stripLhs(a), undefined);
    if (su.unit && constantValue(su.value) !== null) {
      errors.push(`Đáp án "${a}" có kèm đơn vị – chỉ ghi số, đơn vị nhập ở ô "Đơn vị".`);
      continue;
    }
    if (mode === 'number' && constantValue(stripLhs(a)) === null) errors.push(`Đáp án "${a}" không phải là số.`);
    if ((mode === 'expression' || mode === 'factored') && !parseExpression(stripLhs(a))) errors.push(`Không đọc được biểu thức "${a}".`);
    if (mode === 'factored') {
      const n = parseExpression(stripLhs(a));
      if (n && !isProduct(n)) errors.push(`Đáp án "${a}" chưa ở dạng tích.`);
    }
    if (mode === 'set' && !splitSet(a).every((x) => valueOf(x).node || x)) errors.push(`Không đọc được tập nghiệm "${a}".`);
  }
  // mọi đáp án chấp nhận phải khớp chính nó
  for (const a of accepted) if (!matchShortAnswer(a, [a], rule).ok && !errors.length) errors.push(`Đáp án "${a}" không tự khớp với quy tắc chấm – kiểm tra lại cách viết.`);
  if (rule.unit && !UNITS[unitKey(rule.unit)] && rule.unit.length > 20) errors.push('Đơn vị quá dài.');
  return errors;
}

/** Hai phương án trắc nghiệm có cùng giá trị toán học (ví dụ 1/2 và 0,5) – dùng để phát hiện câu có hai đáp án đúng. */
export function sameMathValue(a: string, b: string): boolean {
  const pa = parseExpression(a);
  const pb = parseExpression(b);
  if (!pa || !pb) return false;
  return equivalent(pa, pb);
}
