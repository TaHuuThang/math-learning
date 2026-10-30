/**
 * Nhập câu hỏi hàng loạt: giáo viên điền bảng mẫu trong Excel, chọn cả bảng, sao chép và dán vào trang nhập
 * (dữ liệu dạng TSV), hoặc dán nội dung tệp CSV. Mỗi dòng là một câu; câu được gắn vào dạng toán theo mã dạng.
 */
import { sql, type Queryable } from '../server/db';
import { QUESTION_TYPES, parseNumber, type QuestionType } from '../shared/grading';
import { findMathErrors } from '../shared/richtext';
import { figureToSvg } from '../shared/figure';
import { emptyQuestionInput, type QuestionInput } from './questions';

export const IMPORT_COLUMNS = ['ma_dang', 'ma_bai', 'hinh_thuc', 'muc_do', 'de_bai', 'A', 'B', 'C', 'D', 'dap_an', 'loi_giai', 'goi_y', 'hinh_ve', 'don_vi', 'diem'] as const;
type Col = (typeof IMPORT_COLUMNS)[number];

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();

const HEADER_ALIASES: Record<string, Col> = {
  ma_dang: 'ma_dang', 'ma dang': 'ma_dang', dang: 'ma_dang', 'dang toan': 'ma_dang', 'ma dang toan': 'ma_dang',
  ma_bai: 'ma_bai', 'ma bai': 'ma_bai', bai: 'ma_bai',
  hinh_thuc: 'hinh_thuc', 'hinh thuc': 'hinh_thuc', loai: 'hinh_thuc', 'loai cau': 'hinh_thuc',
  muc_do: 'muc_do', 'muc do': 'muc_do', muc: 'muc_do',
  de_bai: 'de_bai', 'de bai': 'de_bai', de: 'de_bai', 'noi dung': 'de_bai', 'cau hoi': 'de_bai',
  a: 'A', b: 'B', c: 'C', d: 'D',
  dap_an: 'dap_an', 'dap an': 'dap_an',
  loi_giai: 'loi_giai', 'loi giai': 'loi_giai', 'huong dan giai': 'loi_giai',
  goi_y: 'goi_y', 'goi y': 'goi_y',
  hinh_ve: 'hinh_ve', 'hinh ve': 'hinh_ve', hinh: 'hinh_ve',
  don_vi: 'don_vi', 'don vi': 'don_vi',
  diem: 'diem',
};

/** Tách bảng TSV/CSV (hỗ trợ ô có dấu ngoặc kép, xuống dòng trong ô như Excel sao chép ra). */
export function parseTable(text: string): string[][] {
  const src = text.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const firstLine = src.split('\n', 1)[0] ?? '';
  const delim = firstLine.includes('\t') ? '\t' : (firstLine.match(/;/g)?.length ?? 0) > (firstLine.match(/,/g)?.length ?? 0) ? ';' : ',';
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += ch;
      continue;
    }
    if (ch === '"' && cell === '') quoted = true;
    else if (ch === delim) {
      row.push(cell);
      cell = '';
    } else if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

export function typeFromText(s: string): QuestionType | null {
  const v = fold(s).replace(/[_-]/g, ' ');
  if ((QUESTION_TYPES as string[]).includes(s.trim())) return s.trim() as QuestionType;
  if (['tn', 'trac nghiem', 'trac nghiem 4 phuong an', 'mcq', 'tnkq'].includes(v)) return 'mcq';
  if (['ds', 'dung sai', 'dung/sai', 'true false', 'd/s'].includes(v)) return 'true_false';
  if (['tln', 'tra loi ngan', 'short answer', 'tlngan'].includes(v)) return 'short_answer';
  if (['tl', 'tu luan', 'essay'].includes(v)) return 'essay';
  if (['hh', 'tlhh', 'tu luan hinh hoc', 'hinh hoc', 'geometry essay'].includes(v)) return 'geometry_essay';
  return null;
}

export function levelFromText(s: string): number | null {
  const v = fold(s).replace(/\s+/g, ' ');
  const map: Record<string, number> = { '1': 1, '2': 2, '3': 3, '4': 4, nb: 1, 'nhan biet': 1, th: 2, 'thong hieu': 2, vd: 3, 'van dung': 3, vdc: 4, 'van dung cao': 4 };
  return map[v] ?? null;
}

/** "Đ S Đ S", "ĐSĐS", "D,S,D,S", "1 0 1 0", "Đúng Sai Đúng Sai" → [true, false, true, false]. */
export function truthsFromText(s: string): (boolean | null)[] {
  const v = fold(s).replace(/dung/g, 'd').replace(/sai/g, 's');
  let tokens = v.split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.length === 1 && tokens[0].length === 4) tokens = tokens[0].split('');
  return tokens.map((t) => (['d', 't', '1', 'true'].includes(t) ? true : ['s', 'f', '0', 'false'].includes(t) ? false : null));
}

export interface ImportRow {
  line: number;
  input: QuestionInput;
  topicLabel: string | null;
  errors: string[];
}

interface TopicRef {
  id: number;
  lessonId: number;
  code: string | null;
  title: string;
}

/** Đọc bảng và kiểm tra từng dòng giống như khi soạn câu hỏi trên trang. */
export async function prepareImport(q: Queryable, textbookId: number, text: string, status: 'draft' | 'published'): Promise<{ rows: ImportRow[]; headerErrors: string[] }> {
  const table = parseTable(text);
  if (table.length < 2) return { rows: [], headerErrors: ['Chưa có dữ liệu: cần dòng tiêu đề và ít nhất một dòng câu hỏi.'] };
  const header = table[0].map((h) => HEADER_ALIASES[fold(h).replace(/_/g, ' ')] ?? HEADER_ALIASES[fold(h)] ?? null);
  const headerErrors: string[] = [];
  for (const need of ['hinh_thuc', 'de_bai'] as Col[]) if (!header.includes(need)) headerErrors.push(`Thiếu cột "${need}" ở dòng tiêu đề.`);
  if (!header.includes('ma_dang') && !header.includes('ma_bai')) headerErrors.push('Cần cột "ma_dang" (mã dạng toán) hoặc "ma_bai" (mã bài).');
  if (headerErrors.length) return { rows: [], headerErrors };

  const topics = await q.many<TopicRef>(sql`
    select t.id, t.lesson_id, t.code, t.title from topics t join lessons l on l.id = t.lesson_id where l.textbook_id = ${textbookId}`);
  const lessons = await q.many<{ id: number; code: string | null }>(sql`select id, code from lessons where textbook_id = ${textbookId}`);
  const topicByCode = new Map(topics.filter((t) => t.code).map((t) => [t.code!.toUpperCase(), t]));
  const topicById = new Map(topics.map((t) => [t.id, t]));
  const lessonByCode = new Map(lessons.filter((l) => l.code).map((l) => [l.code!.toUpperCase(), l.id]));

  const rows: ImportRow[] = [];
  for (const [i, cells] of table.slice(1).entries()) {
    const get = (c: Col) => {
      const k = header.indexOf(c);
      return k >= 0 ? (cells[k] ?? '').trim() : '';
    };
    const errors: string[] = [];
    const type = typeFromText(get('hinh_thuc'));
    const input = emptyQuestionInput(type ?? 'mcq');
    input.status = status;
    if (!type) errors.push(`Hình thức "${get('hinh_thuc')}" không hợp lệ (dùng TN, DS, TLN, TL hoặc HH).`);

    let topicLabel: string | null = null;
    const dang = get('ma_dang');
    if (dang) {
      const m = /^#?(\d+)$/.exec(dang);
      const tp = m ? topicById.get(Number(m[1])) : topicByCode.get(dang.toUpperCase());
      if (!tp) errors.push(`Không tìm thấy dạng toán mã "${dang}".`);
      else {
        input.topicId = tp.id;
        input.lessonId = tp.lessonId;
        topicLabel = `${tp.code ?? '#' + tp.id} · ${tp.title}`;
      }
    } else if (get('ma_bai')) {
      const lid = lessonByCode.get(get('ma_bai').toUpperCase());
      if (!lid) errors.push(`Không tìm thấy bài mã "${get('ma_bai')}".`);
      else input.lessonId = lid;
    } else errors.push('Thiếu mã dạng toán (hoặc mã bài).');

    const lv = get('muc_do') ? levelFromText(get('muc_do')) : 1;
    if (!lv) errors.push(`Mức độ "${get('muc_do')}" không hợp lệ (1–4 hoặc NB, TH, VD, VDC).`);
    input.level = lv ?? 1;
    const pts = get('diem') ? Number(get('diem').replace(',', '.')) : 1;
    if (!(pts > 0 && pts <= 100)) errors.push('Điểm phải lớn hơn 0 và không quá 100.');
    input.points = pts > 0 ? pts : 1;
    input.stem = get('de_bai');
    input.solution = get('loi_giai');
    input.hint = get('goi_y');
    input.figure = get('hinh_ve');
    if (!input.stem) errors.push('Đề bài đang để trống.');

    const texts: [string, string][] = [['Đề bài', input.stem], ['Lời giải', input.solution], ['Gợi ý', input.hint]];
    const opts = (['A', 'B', 'C', 'D'] as const).map((c) => get(c));
    const ans = get('dap_an');
    if (type === 'mcq') {
      input.options = opts;
      opts.forEach((o, k) => {
        if (!o) errors.push(`Phương án ${'ABCD'[k]} đang để trống.`);
        texts.push([`Phương án ${'ABCD'[k]}`, o]);
      });
      const c = fold(ans).toUpperCase();
      if (!/^[A-D]$/.test(c)) errors.push('Đáp án trắc nghiệm phải là một trong A, B, C, D.');
      input.correct = c;
      if (new Set(opts.filter(Boolean).map((o) => o.replace(/\s+/g, ''))).size < opts.filter(Boolean).length) errors.push('Có hai phương án trùng nhau.');
    } else if (type === 'true_false') {
      const values = truthsFromText(ans);
      if (values.length !== 4 || values.some((v) => v === null)) errors.push('Đáp án Đúng/Sai cần đủ 4 ý, ví dụ "Đ S Đ S".');
      input.statements = opts.map((t, k) => ({ text: t, value: values[k] ?? null }));
      opts.forEach((o, k) => {
        if (!o) errors.push(`Ý ${'abcd'[k]}) đang để trống (điền ở cột ${'ABCD'[k]}).`);
        texts.push([`Ý ${'abcd'[k]})`, o]);
      });
    } else if (type === 'short_answer') {
      input.accepted = ans
        .split(/[;|\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 10);
      input.unit = get('don_vi').slice(0, 20);
      if (!input.accepted.length) errors.push('Câu trả lời ngắn cần đáp án ở cột dap_an (nhiều đáp án cách nhau bởi dấu ;).');
      for (const a of input.accepted) if (parseNumber(a) === null && !/[a-zA-Z\\]/.test(a)) errors.push(`Đáp án "${a}" không đọc được thành số.`);
    }
    if (type === 'geometry_essay' && !input.figure) errors.push('Câu tự luận hình học cần hình vẽ ở cột hinh_ve.');
    if (input.figure) figureToSvg(input.figure).errors.forEach((e) => errors.push('Hình vẽ – ' + e));
    for (const [name, t] of texts) if (t) findMathErrors(t).forEach((e) => errors.push(`${name}: ${e}`));
    rows.push({ line: i + 2, input, topicLabel, errors });
  }
  return { rows, headerErrors };
}

/** Tệp mẫu CSV (UTF-8 có BOM để Excel đọc đúng tiếng Việt). */
export function templateCsv(): string {
  const esc = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  const rows: string[][] = [
    [...IMPORT_COLUMNS],
    ['T8.B01.D1', '', 'TN', 'NB', 'Biểu thức nào sau đây là đơn thức?', '\\(x + 1\\)', '\\(3x^2y\\)', '\\(\\dfrac{1}{x}\\)', '\\(x - y\\)', 'B', 'Chỉ \\(3x^2y\\) là tích của số với các biến.', '', '', '', '1'],
    ['T8.B01.D1', '', 'DS', 'TH', 'Mỗi khẳng định sau đúng hay sai?', '\\(5\\) là đơn thức.', '\\(x + y\\) là đơn thức.', '\\(\\dfrac{x}{2}\\) là đơn thức.', '\\(\\dfrac{2}{x}\\) là đơn thức.', 'Đ S Đ S', 'a) Đúng. b) Sai. c) Đúng. d) Sai.', '', '', '', '1'],
    ['T8.B01.D3', '', 'TLN', 'NB', 'Bậc của đơn thức \\(4x^3y^2\\) là bao nhiêu?', '', '', '', '', '5', 'Tổng số mũ: 3 + 2 = 5.', '', '', '', '1'],
    ['T8.B04.D5', '', 'TL', 'VD', 'Chứng minh \\((x - 1)(x + 1) = x^2 - 1\\).', '', '', '', '', '', 'Vế trái \\(= x^2 + x - x - 1 = x^2 - 1\\).', '', '', '', '1'],
    ['T8.B10.D1', '', 'HH', 'VD', 'Cho tứ giác ABCD có \\(\\widehat{A} = 80^\\circ\\), \\(\\widehat{B} = 100^\\circ\\), \\(\\widehat{C} = 2\\widehat{D}\\). Tính \\(\\widehat{C}\\), \\(\\widehat{D}\\).', '', '', '', '', '', '\\(\\widehat{C} = 120^\\circ\\), \\(\\widehat{D} = 60^\\circ\\).', '', 'A(0,0) B(5,0) C(6,3) D(1,3)\nABCDA', '', '1'],
  ];
  return '﻿' + rows.map((r) => r.map(esc).join(',')).join('\r\n') + '\r\n';
}
