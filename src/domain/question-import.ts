/**
 * Nhập / xuất ngân hàng câu hỏi bằng bảng tính.
 * - Nhập: tải tệp Excel (.xlsx) hoặc CSV, hoặc chọn cả bảng trong Excel → sao chép → dán (TSV).
 * - Xuất: tệp Excel (.xlsx) hoặc CSV cùng cột với tệp nhập; sửa trong Excel rồi nhập lại, dòng có "ma_cau" sẽ cập nhật câu đó.
 * Mỗi dòng là một câu; câu được gắn vào dạng toán theo mã dạng (hoặc vào bài theo mã bài).
 */
import { sql, type Queryable } from '../server/db';
import { QUESTION_TYPES, type QuestionType } from '../shared/grading';
import { MATCH_MODES, type MatchMode } from '../shared/answer-match';
import { emptyQuestionInput, qualityOf, type QuestionFull, type QuestionInput } from './questions';
import { LEVEL_SHORT, TYPE_LABELS } from '../shared/labels';

export const IMPORT_COLUMNS = [
  'ma_cau', 'ma_dang', 'ma_bai', 'hinh_thuc', 'muc_do', 'de_bai', 'A', 'B', 'C', 'D', 'dap_an',
  'gt_A', 'gt_B', 'gt_C', 'gt_D', 'loi_giai', 'goi_y', 'thang_diem', 'hinh_ve', 'don_vi', 'quy_tac', 'sai_so', 'diem',
] as const;
/** Cột chỉ để đọc khi xuất (bỏ qua khi nhập). */
export const EXPORT_INFO_COLUMNS = ['chuong', 'bai', 'dang_toan', 'trang_thai', 'canh_bao'] as const;
type Col = (typeof IMPORT_COLUMNS)[number];

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();

const HEADER_ALIASES: Record<string, Col> = {
  ma_cau: 'ma_cau', 'ma cau': 'ma_cau', id: 'ma_cau', 'ma cau hoi': 'ma_cau',
  ma_dang: 'ma_dang', 'ma dang': 'ma_dang', dang: 'ma_dang', 'dang toan': 'ma_dang', 'ma dang toan': 'ma_dang',
  ma_bai: 'ma_bai', 'ma bai': 'ma_bai', bai: 'ma_bai',
  hinh_thuc: 'hinh_thuc', 'hinh thuc': 'hinh_thuc', loai: 'hinh_thuc', 'loai cau': 'hinh_thuc',
  muc_do: 'muc_do', 'muc do': 'muc_do', muc: 'muc_do',
  de_bai: 'de_bai', 'de bai': 'de_bai', de: 'de_bai', 'noi dung': 'de_bai', 'cau hoi': 'de_bai',
  a: 'A', b: 'B', c: 'C', d: 'D',
  dap_an: 'dap_an', 'dap an': 'dap_an',
  gt_a: 'gt_A', 'gt a': 'gt_A', gt_b: 'gt_B', 'gt b': 'gt_B', gt_c: 'gt_C', 'gt c': 'gt_C', gt_d: 'gt_D', 'gt d': 'gt_D',
  loi_giai: 'loi_giai', 'loi giai': 'loi_giai', 'huong dan giai': 'loi_giai',
  goi_y: 'goi_y', 'goi y': 'goi_y',
  thang_diem: 'thang_diem', 'thang diem': 'thang_diem', 'huong dan cham': 'thang_diem',
  hinh_ve: 'hinh_ve', 'hinh ve': 'hinh_ve', hinh: 'hinh_ve',
  don_vi: 'don_vi', 'don vi': 'don_vi',
  quy_tac: 'quy_tac', 'quy tac': 'quy_tac', 'quy tac cham': 'quy_tac',
  sai_so: 'sai_so', 'sai so': 'sai_so',
  diem: 'diem',
};

const MATCH_ALIASES: Record<string, MatchMode> = {
  '': 'auto', auto: 'auto', 'tu dong': 'auto', 'tu nhan biet': 'auto',
  so: 'number', number: 'number', 'gia tri': 'number', 'gia tri so': 'number',
  'bieu thuc': 'expression', expression: 'expression', 'tuong duong': 'expression',
  'nhan tu': 'factored', 'dang tich': 'factored', factored: 'factored',
  'tap nghiem': 'set', set: 'set', 'nhieu gia tri': 'set',
  'nguyen van': 'exact', exact: 'exact', chu: 'exact',
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
  warnings: string[];
  /** Có mã câu đã tồn tại → cập nhật câu đó. */
  updateId: number | null;
}

interface TopicRef {
  id: number;
  lessonId: number;
  code: string | null;
  title: string;
  levels: number[];
}

/** Đọc bảng và kiểm tra từng dòng bằng cùng bộ kiểm tra chất lượng như khi soạn câu hỏi trên trang. */
export async function prepareImport(q: Queryable, textbookId: number, table: string[][], status: 'draft' | 'published'): Promise<{ rows: ImportRow[]; headerErrors: string[] }> {
  if (table.length < 2) return { rows: [], headerErrors: ['Chưa có dữ liệu: cần dòng tiêu đề và ít nhất một dòng câu hỏi.'] };
  const header = table[0].map((h) => HEADER_ALIASES[fold(h).replace(/_/g, ' ')] ?? HEADER_ALIASES[fold(h)] ?? null);
  const headerErrors: string[] = [];
  for (const need of ['hinh_thuc', 'de_bai'] as Col[]) if (!header.includes(need)) headerErrors.push(`Thiếu cột "${need}" ở dòng tiêu đề.`);
  if (!header.includes('ma_dang') && !header.includes('ma_bai')) headerErrors.push('Cần cột "ma_dang" (mã dạng toán) hoặc "ma_bai" (mã bài).');
  if (headerErrors.length) return { rows: [], headerErrors };

  const topics = await q.many<TopicRef>(sql`
    select t.id, t.lesson_id, t.code, t.title, t.levels from topics t join lessons l on l.id = t.lesson_id where l.textbook_id = ${textbookId}`);
  const lessons = await q.many<{ id: number; code: string | null }>(sql`select id, code from lessons where textbook_id = ${textbookId}`);
  const topicByCode = new Map(topics.filter((t) => t.code).map((t) => [t.code!.toUpperCase(), t]));
  const topicById = new Map(topics.map((t) => [t.id, t]));
  const lessonByCode = new Map(lessons.filter((l) => l.code).map((l) => [l.code!.toUpperCase(), l.id]));
  const ids = table
    .slice(1)
    .map((r) => Number((r[header.indexOf('ma_cau')] ?? '').replace(/^#/, '')))
    .filter((n) => Number.isInteger(n) && n > 0);
  const existing = new Set(
    (await q.many<{ id: number }>(sql`select id from questions where id = any(${ids}::int[]) and textbook_id = ${textbookId} and status <> 'archived'`)).map((r) => r.id),
  );

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
    const idRaw = Number(get('ma_cau').replace(/^#/, ''));
    const updateId = Number.isInteger(idRaw) && existing.has(idRaw) ? idRaw : null;
    if (get('ma_cau') && !updateId) errors.push(`Không tìm thấy câu mã "${get('ma_cau')}" để cập nhật (để trống ô ma_cau nếu là câu mới).`);

    let topicLabel: string | null = null;
    let topicLevels: number[] | undefined;
    const dang = get('ma_dang');
    if (dang) {
      const m = /^#?(\d+)$/.exec(dang);
      const tp = m ? topicById.get(Number(m[1])) : topicByCode.get(dang.toUpperCase());
      if (!tp) errors.push(`Không tìm thấy dạng toán mã "${dang}".`);
      else {
        input.topicId = tp.id;
        input.lessonId = tp.lessonId;
        topicLabel = `${tp.code ?? '#' + tp.id} · ${tp.title}`;
        topicLevels = (tp.levels ?? []).map(Number);
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
    input.rubric = get('thang_diem');
    input.figure = get('hinh_ve');

    const opts = (['A', 'B', 'C', 'D'] as const).map((c) => get(c));
    const notes = (['gt_A', 'gt_B', 'gt_C', 'gt_D'] as const).map((c) => get(c));
    const ans = get('dap_an');
    if (type === 'mcq') {
      input.options = opts;
      input.optionNotes = notes;
      input.correct = fold(ans).toUpperCase();
    } else if (type === 'true_false') {
      const values = truthsFromText(ans);
      if (values.length !== 4 || values.some((v) => v === null)) errors.push('Đáp án Đúng/Sai cần đủ 4 ý, ví dụ "Đ S Đ S".');
      input.statements = opts.map((t, k) => ({ text: t, value: values[k] ?? null, note: notes[k] }));
    } else if (type === 'short_answer') {
      input.accepted = ans
        .split(/\s*\|\s*|\n/)
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 10);
      input.unit = get('don_vi').slice(0, 20);
      const mm = MATCH_ALIASES[fold(get('quy_tac'))];
      if (get('quy_tac') && !mm) errors.push(`Quy tắc chấm "${get('quy_tac')}" không hợp lệ (dùng: tự động, số, biểu thức, nhân tử, tập nghiệm, nguyên văn).`);
      input.match = mm ?? 'auto';
      const tol = get('sai_so') ? Number(get('sai_so').replace(',', '.')) : 0;
      if (!(tol >= 0)) errors.push('Sai số phải là số không âm.');
      input.tolerance = tol >= 0 ? tol : 0;
    }
    const report = qualityOf(input, topicLevels);
    errors.push(...report.errors);
    rows.push({ line: i + 2, input, topicLabel, errors: [...new Set(errors)], warnings: report.warnings, updateId });
  }
  return { rows, headerErrors };
}

function csvEscape(s: string) {
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Bảng → CSV (UTF-8 có BOM để Excel đọc đúng tiếng Việt). */
export function toCsv(rows: string[][]): string {
  return '\ufeff' + rows.map((r) => r.map((c) => csvEscape(c ?? '')).join(',')).join('\r\n') + '\r\n';
}

const TYPE_SHORT: Record<QuestionType, string> = { mcq: 'TN', true_false: 'DS', short_answer: 'TLN', essay: 'TL', geometry_essay: 'HH' };
const MATCH_TEXT: Record<MatchMode, string> = { auto: '', number: 'số', expression: 'biểu thức', factored: 'nhân tử', set: 'tập nghiệm', exact: 'nguyên văn' };

/** Một câu hỏi → một dòng bảng xuất (cùng cột với tệp nhập + cột thông tin). */
export function questionToRow(
  qf: QuestionFull,
  info: { topicCode: string | null; lessonCode: string | null; chapter: string; lesson: string; topic: string },
): string[] {
  const byLabel = (l: string) => qf.answers.find((a) => a.label === l);
  const cells: Record<string, string> = {
    ma_cau: String(qf.id),
    ma_dang: info.topicCode ?? (qf.topicId ? `#${qf.topicId}` : ''),
    ma_bai: info.topicCode ? '' : info.lessonCode ?? '',
    hinh_thuc: TYPE_SHORT[qf.type],
    muc_do: LEVEL_SHORT[qf.level] ?? String(qf.level),
    de_bai: qf.stem,
    loi_giai: qf.solution ?? '',
    goi_y: qf.hint ?? '',
    thang_diem: qf.rubric ?? '',
    hinh_ve: qf.images.find((i) => i.kind === 'figure')?.figureSource ?? '',
    diem: String(qf.points).replace('.', ','),
    chuong: info.chapter,
    bai: info.lesson,
    dang_toan: info.topic,
    trang_thai: { draft: 'Bản nháp', review: 'Chờ duyệt', published: 'Đã xuất bản', archived: 'Lưu trữ' }[qf.status],
    canh_bao: qf.qualityIssues.join(' | '),
  };
  if (qf.type === 'mcq') {
    for (const l of ['A', 'B', 'C', 'D']) {
      cells[l] = byLabel(l)?.content ?? '';
      cells['gt_' + l] = byLabel(l)?.explanation ?? '';
    }
    cells.dap_an = qf.answers.find((a) => a.isCorrect)?.label ?? '';
  } else if (qf.type === 'true_false') {
    ['a', 'b', 'c', 'd'].forEach((l, k) => {
      cells['ABCD'[k]] = byLabel(l)?.content ?? '';
      cells['gt_' + 'ABCD'[k]] = byLabel(l)?.explanation ?? '';
    });
    cells.dap_an = ['a', 'b', 'c', 'd'].map((l) => (byLabel(l)?.isCorrect ? 'Đ' : 'S')).join(' ');
  } else if (qf.type === 'short_answer') {
    cells.dap_an = qf.answers.map((a) => a.content).join(' | ');
    cells.don_vi = qf.settings.unit ?? '';
    cells.quy_tac = MATCH_TEXT[qf.settings.match ?? 'auto'];
    cells.sai_so = qf.settings.tolerance ? String(qf.settings.tolerance).replace('.', ',') : '';
  }
  return [...IMPORT_COLUMNS, ...EXPORT_INFO_COLUMNS].map((c) => cells[c] ?? '');
}

export const EXPORT_HEADER: string[] = [...IMPORT_COLUMNS, ...EXPORT_INFO_COLUMNS];
export const EXPORT_COL_WIDTHS = [8, 12, 10, 8, 8, 60, 28, 28, 28, 28, 14, 30, 30, 30, 30, 60, 30, 40, 30, 8, 12, 8, 6, 24, 30, 30, 12, 30];

/** Tệp mẫu (các dòng ví dụ) dùng cho cả CSV và Excel. */
export function templateRows(): string[][] {
  const head: string[] = [...IMPORT_COLUMNS];
  const row = (v: Partial<Record<Col, string>>) => IMPORT_COLUMNS.map((c) => v[c] ?? '');
  return [
    head,
    row({ ma_dang: 'T8.B01.D1', hinh_thuc: 'TN', muc_do: 'NB', de_bai: 'Biểu thức nào sau đây là đơn thức?', A: '\\(x + 1\\)', B: '\\(3x^2y\\)', C: '\\(\\dfrac{1}{x}\\)', D: '\\(x - y\\)', dap_an: 'B', gt_A: 'Có phép cộng nên không phải đơn thức.', gt_C: 'Biến nằm ở mẫu.', gt_D: 'Có phép trừ.', loi_giai: 'Chỉ \\(3x^2y\\) là tích của một số với các biến.' }),
    row({ ma_dang: 'T8.B01.D1', hinh_thuc: 'DS', muc_do: 'TH', de_bai: 'Mỗi khẳng định sau đúng hay sai?', A: '\\(5\\) là đơn thức.', B: '\\(x + y\\) là đơn thức.', C: '\\(\\dfrac{x}{2}\\) là đơn thức.', D: '\\(\\dfrac{2}{x}\\) là đơn thức.', dap_an: 'Đ S Đ S', gt_A: 'Một số cũng là đơn thức.', gt_B: 'Có phép cộng.', gt_C: '\\(\\dfrac{x}{2} = \\dfrac12 x\\).', gt_D: 'Biến ở mẫu.', loi_giai: 'Đơn thức là một số, một biến hoặc tích của các số và các biến.' }),
    row({ ma_dang: 'T8.B01.D3', hinh_thuc: 'TLN', muc_do: 'NB', de_bai: 'Bậc của đơn thức \\(4x^3y^2\\) là bao nhiêu?', dap_an: '5', loi_giai: 'Tổng số mũ: 3 + 2 = 5.' }),
    row({ ma_dang: 'T8.B09.D1', hinh_thuc: 'TLN', muc_do: 'TH', de_bai: 'Phân tích \\(x^2 - 2x\\) thành nhân tử.', dap_an: 'x(x - 2)', quy_tac: 'nhân tử', loi_giai: '\\(x^2 - 2x = x(x - 2)\\).' }),
    row({ ma_dang: 'T8.B04.D5', hinh_thuc: 'TL', muc_do: 'VD', de_bai: 'Chứng minh \\((x - 1)(x + 1) = x^2 - 1\\).', loi_giai: 'Vế trái \\(= x^2 + x - x - 1 = x^2 - 1\\).', thang_diem: '0,5 điểm: nhân đúng đa thức với đa thức\n0,5 điểm: thu gọn và kết luận' }),
    row({ ma_dang: 'T8.B10.D1', hinh_thuc: 'HH', muc_do: 'VD', de_bai: 'Cho tứ giác \\(ABCD\\) có \\(\\widehat{A} = 80^\\circ\\), \\(\\widehat{B} = 100^\\circ\\), \\(\\widehat{C} = 2\\widehat{D}\\). Tính \\(\\widehat{C}\\), \\(\\widehat{D}\\).', loi_giai: '\\(\\widehat{C} + \\widehat{D} = 180^\\circ\\) nên \\(3\\widehat{D} = 180^\\circ\\), \\(\\widehat{D} = 60^\\circ\\), \\(\\widehat{C} = 120^\\circ\\).', thang_diem: '0,5 điểm: tổng hai góc bằng 180°\n0,5 điểm: tính đúng hai góc', hinh_ve: 'A(0,0) B(5,0) C(6,3) D(1,3)\nABCDA' }),
  ];
}

export function typeShortLabel(t: QuestionType) {
  return `${TYPE_SHORT[t]} – ${TYPE_LABELS[t]}`;
}

export const MATCH_HELP = MATCH_MODES;
