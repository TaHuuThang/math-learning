import { LuDownload, LuFileSpreadsheet, LuUpload } from 'react-icons/lu';
import { redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { sql } from '../../db';
import { requireBook } from '../common';
import {
  EXPORT_COL_WIDTHS,
  EXPORT_HEADER,
  IMPORT_COLUMNS,
  parseTable,
  prepareImport,
  questionToRow,
  templateRows,
  toCsv,
  type ImportRow,
} from '../../../domain/question-import';
import { canEditQuestion, getQuestion, getQuestions, listQuestions, saveQuestion } from '../../../domain/questions';
import { Badge, Button, ErrorList, Notice, PageTitle, Panel, PostForm, Select, buttonClass } from '../../../ui/components/ui';
import { LEVEL_LABELS, TYPE_LABELS } from '../../../shared/labels';
import { plainExcerpt } from '../../../shared/richtext';
import { readXlsx, writeXlsx, XLSX_MIME } from '../../xlsx';
import { questionFilters } from './question-filters';

const GUIDE: [string, string][] = [
  ['ma_cau', 'Để trống với câu mới. Tệp xuất ra có sẵn mã câu: sửa trong Excel rồi nhập lại thì câu đó được cập nhật.'],
  ['ma_dang', 'Mã dạng toán, ví dụ T8.B01.D2 (xem ở trang soạn dạng toán). Có thể thay bằng ma_bai nếu câu chưa thuộc dạng nào.'],
  ['hinh_thuc', 'TN = trắc nghiệm 4 phương án; DS = Đúng/Sai 4 ý; TLN = trả lời ngắn; TL = tự luận; HH = tự luận hình học.'],
  ['muc_do', '1–4 hoặc NB, TH, VD, VDC.'],
  ['de_bai', 'Đề bài. Công thức viết \\( … \\) hoặc \\[ … \\].'],
  ['A, B, C, D', 'TN: bốn phương án. DS: bốn nhận định a), b), c), d).'],
  ['dap_an', 'TN: A/B/C/D. DS: ví dụ "Đ S Đ S". TLN: đáp số; nhiều cách viết được chấp nhận thì cách nhau bởi dấu |. Tập nghiệm viết "1; -2". TL, HH: để trống.'],
  ['gt_A … gt_D', 'Giải thích từng phương án (vì sao đúng / vì sao sai) hoặc từng nhận định Đúng/Sai.'],
  ['loi_giai, goi_y', 'Lời giải chi tiết; gợi ý (không bắt buộc).'],
  ['thang_diem', 'Hướng dẫn chấm câu tự luận, mỗi dòng một ý, ví dụ "0,5 điểm: …".'],
  ['hinh_ve', 'Hình vẽ mô tả bằng văn bản (bắt buộc với HH), ví dụ: A(0,0) B(4,0) C(0,3) rồi xuống dòng ABCA.'],
  ['don_vi, quy_tac, sai_so', 'Câu trả lời ngắn: đơn vị (học sinh ghi đơn vị khác cùng loại được tự đổi); quy tắc chấm: tự động / số / biểu thức / nhân tử / tập nghiệm / nguyên văn; sai số cho phép.'],
  ['diem', 'Điểm mặc định của câu (bỏ trống = 1).'],
];

const STATUS_OPTIONS = [
  { value: 'review', label: 'Chờ duyệt – tôi kiểm tra rồi duyệt sau (khuyên dùng)' },
  { value: 'published', label: 'Xuất bản ngay câu không có cảnh báo (câu có cảnh báo → chờ duyệt)' },
  { value: 'draft', label: 'Bản nháp' },
];
type ImportStatus = 'review' | 'published' | 'draft';

export async function importPage(ctx: Ctx, opts: { table?: string[][]; text?: string; status?: ImportStatus; rows?: ImportRow[]; headerErrors?: string[] } = {}): Promise<Res> {
  requireTeacher(ctx);
  const rows = opts.rows;
  const ok = rows?.filter((r) => !r.errors.length) ?? [];
  const bad = rows?.filter((r) => r.errors.length) ?? [];
  const warn = ok.filter((r) => r.warnings.length);
  const updates = ok.filter((r) => r.updateId);
  return page(
    ctx,
    { title: 'Nhập câu hỏi hàng loạt', layout: 'dashboard', section: 'questions', status: opts.headerErrors?.length ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/cau-hoi', label: 'Ngân hàng câu hỏi' }, { label: 'Nhập hàng loạt' }]}
        title="Nhập câu hỏi từ Excel"
        sub="Soạn nhiều câu trong Excel rồi đưa vào ngân hàng một lần. Mỗi dòng là một câu, gắn vào dạng toán theo mã dạng. Mọi câu đều qua bộ kiểm tra chất lượng."
        actions={
          <>
            <a href="/giao-vien/cau-hoi/nhap/mau.xlsx" className={buttonClass('secondary', 'md')}>
              <LuFileSpreadsheet aria-hidden="true" /> Tệp mẫu Excel
            </a>
            <a href="/giao-vien/cau-hoi/nhap/mau.csv" className={buttonClass('quiet', 'md')}>
              Tệp mẫu CSV
            </a>
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          <ErrorList errors={opts.headerErrors} />
          <PostForm action="/giao-vien/cau-hoi/nhap" encType="multipart/form-data" className="space-y-4 rounded-[18px] border border-line bg-white p-5">
            <input type="hidden" name="_action" value="preview" />
            <div>
              <label htmlFor="f-file" className="block text-sm font-semibold text-ink-2">
                Chọn tệp Excel (.xlsx) hoặc CSV
              </label>
              <input id="f-file" type="file" name="file" accept=".xlsx,.csv,.tsv,.txt" className="mt-1.5 block w-full text-[15px] file:mr-3 file:rounded-lg file:border-0 file:bg-tim-50 file:px-3 file:py-2 file:font-semibold file:text-tim-800" />
            </div>
            <div>
              <label htmlFor="f-data" className="block text-sm font-semibold text-ink-2">
                … hoặc dán bảng câu hỏi vào đây
              </label>
              <textarea
                id="f-data"
                name="data"
                rows={8}
                defaultValue={opts.text ?? ''}
                spellCheck={false}
                className="mt-1.5 w-full rounded-xl border border-line-2 bg-white px-3 py-2 font-mono text-[13px] leading-relaxed focus:border-tim-500"
                placeholder={IMPORT_COLUMNS.join('\t')}
              />
              <p className="text-[13px] text-ink-3">Trong Excel: chọn cả bảng (kể cả dòng tiêu đề), nhấn Ctrl+C rồi dán vào ô trên.</p>
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <Select label="Câu được nhập sẽ ở trạng thái" name="status" defaultValue={opts.status ?? 'review'} options={STATUS_OPTIONS} />
              <Button variant="secondary">
                <LuUpload aria-hidden="true" /> Kiểm tra dữ liệu
              </Button>
            </div>
          </PostForm>

          {rows && (
            <Panel className="overflow-x-auto">
              <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
                <strong>Kết quả kiểm tra</strong>
                <Badge tone="tre">{ok.length} dòng dùng được</Badge>
                {updates.length > 0 && <Badge tone="tim">{updates.length} dòng cập nhật câu có sẵn</Badge>}
                {warn.length > 0 && <Badge tone="hl">{warn.length} dòng có cảnh báo → chờ duyệt</Badge>}
                {bad.length > 0 && <Badge tone="le">{bad.length} dòng có lỗi</Badge>}
                {ok.length > 0 && (
                  <PostForm action="/giao-vien/cau-hoi/nhap" className="ml-auto">
                    <input type="hidden" name="_action" value="import" />
                    <input type="hidden" name="status" value={opts.status ?? 'review'} />
                    <textarea name="table" hidden readOnly defaultValue={JSON.stringify(opts.table ?? [])} />
                    <Button size="sm">
                      Nhập {ok.length} câu{bad.length ? ` (bỏ qua ${bad.length} dòng lỗi)` : ''}
                    </Button>
                  </PostForm>
                )}
              </div>
              <table className="data-table min-w-[860px]">
                <thead>
                  <tr>
                    <th className="w-14">Dòng</th>
                    <th className="w-56">Dạng toán</th>
                    <th className="w-36">Hình thức / mức</th>
                    <th>Đề bài</th>
                    <th className="w-80">Kiểm tra</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.line} className={r.errors.length ? 'bg-le-soft/50' : r.warnings.length ? 'bg-hl-soft/40' : ''}>
                      <td className="text-ink-3">{r.line}</td>
                      <td className="text-[13.5px]">
                        {r.topicLabel ?? <span className="text-ink-3">—</span>}
                        {r.updateId && <div className="mt-1 text-[12px] font-semibold text-tim-700">Cập nhật câu #{r.updateId}</div>}
                      </td>
                      <td className="text-[13.5px]">
                        {TYPE_LABELS[r.input.type]}
                        <br />
                        <span className="text-ink-3">{LEVEL_LABELS[r.input.level]}</span>
                      </td>
                      <td className="text-[14px]">{plainExcerpt(r.input.stem, 140)}</td>
                      <td className="text-[13px]">
                        {r.errors.length ? (
                          <ul className="list-disc space-y-0.5 pl-4 text-le">
                            {r.errors.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        ) : r.warnings.length ? (
                          <ul className="list-disc space-y-0.5 pl-4 text-[#7a5a00]">
                            {r.warnings.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="font-semibold text-tre">Đạt</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
          )}
        </div>
        <Panel className="h-fit p-5">
          <h2 className="text-lg font-extrabold">Các cột của bảng</h2>
          <dl className="mt-3 space-y-2.5 text-[14px]">
            {GUIDE.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[13px] font-semibold text-tim-700">{k}</dt>
                <dd className="text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
          <Notice tone="info" className="mt-4">
            Dòng tiêu đề phải có tên cột như tệp mẫu (thứ tự cột tùy ý). Câu có lỗi không được nhập; câu có cảnh báo (thiếu lời giải, chưa giải thích, hai phương án cùng giá trị…) vào hàng <strong>chờ duyệt</strong>, chưa
            xuất hiện với học sinh.
          </Notice>
        </Panel>
      </div>
    </>,
  );
}

async function readUpload(ctx: Ctx): Promise<{ table: string[][]; text: string; error?: string }> {
  const form = await ctx.form();
  const tableJson = form.text('table', 4_000_000);
  if (tableJson) {
    try {
      const t = JSON.parse(tableJson) as unknown;
      if (Array.isArray(t) && t.every((r) => Array.isArray(r))) return { table: (t as unknown[][]).map((r) => r.map((c) => String(c ?? ''))), text: '' };
    } catch {
      /* bỏ qua */
    }
  }
  const file = (await ctx.files()).find((f) => f.field === 'file' && f.data.length > 0);
  if (file) {
    const name = file.filename.toLowerCase();
    if (name.endsWith('.xlsx') || file.data.subarray(0, 2).toString('latin1') === 'PK') {
      try {
        return { table: readXlsx(file.data), text: '' };
      } catch (err) {
        return { table: [], text: '', error: (err as Error).message };
      }
    }
    const text = file.data.toString('utf8');
    return { table: parseTable(text), text: '' };
  }
  const text = form.text('data', 3_000_000);
  return { table: parseTable(text), text };
}

export async function importAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const form = await ctx.form();
  const st = form.str('status');
  const status: ImportStatus = st === 'published' || st === 'draft' ? st : 'review';
  const { table, text, error } = await readUpload(ctx);
  if (error) return importPage(ctx, { status, headerErrors: [error] });
  const { rows, headerErrors } = await prepareImport(ctx.db, book.id, table, status === 'draft' ? 'draft' : 'published');
  if (form.str('_action') !== 'import' || headerErrors.length) return importPage(ctx, { table, text, status, rows, headerErrors });
  const ok = rows.filter((r) => !r.errors.length);
  let created = 0;
  let updated = 0;
  let review = 0;
  const failed: string[] = [];
  for (const r of ok) {
    if (r.updateId) {
      const existing = await getQuestion(ctx.db, r.updateId);
      if (!existing || !canEditQuestion(existing, user)) {
        failed.push(`Dòng ${r.line}: không có quyền sửa câu #${r.updateId}.`);
        continue;
      }
    }
    const res = await saveQuestion(ctx.db, r.updateId, book.id, r.input, user.id, { forceReview: status === 'review' });
    if (!res.id) {
      failed.push(`Dòng ${r.line}: ${res.error}`);
      continue;
    }
    if (r.updateId) updated++;
    else created++;
    if (res.status === 'review') review++;
  }
  if (failed.length) return importPage(ctx, { table, text, status, rows, headerErrors: [`Đã nhập ${created + updated} câu. Không nhập được:`, ...failed] });
  const skipped = rows.length - ok.length;
  const parts = [`Đã thêm ${created} câu`, updated ? `cập nhật ${updated} câu` : '', review ? `${review} câu đang chờ duyệt` : '', skipped ? `bỏ qua ${skipped} dòng lỗi` : ''].filter(Boolean);
  return redirect(`/giao-vien/cau-hoi${review ? '?trang-thai=review' : ''}`, { type: 'success', message: parts.join(', ') + '.' }, ctx);
}

export async function importTemplate(ctx: Ctx): Promise<Res> {
  requireTeacher(ctx);
  const rows = templateRows();
  if (ctx.path.endsWith('.xlsx'))
    return { type: 'bytes', status: 200, contentType: XLSX_MIME, body: writeXlsx(rows, { sheetName: 'Ngân hàng câu hỏi', colWidths: EXPORT_COL_WIDTHS }), filename: 'mau-ngan-hang-cau-hoi.xlsx' };
  return { type: 'bytes', status: 200, contentType: 'text/csv; charset=utf-8', body: toCsv(rows), filename: 'mau-ngan-hang-cau-hoi.csv' };
}

/** Xuất các câu theo bộ lọc hiện tại ra Excel hoặc CSV. */
export async function exportQuestions(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const f = questionFilters(ctx, user.id, book.id);
  const { rows } = await listQuestions(ctx.db, f, 5000, 0);
  const full = await getQuestions(ctx.db, rows.map((r) => r.id));
  const info = await ctx.db.many<{ id: number; topicCode: string | null; topicTitle: string | null; lessonCode: string | null; lessonTitle: string | null; lessonNumber: number | null; chapterCode: string | null; chapterTitle: string | null }>(sql`
    select qq.id, t.code as topic_code, t.title as topic_title, l.code as lesson_code, l.title as lesson_title, l.number as lesson_number,
      c.code as chapter_code, c.title as chapter_title
    from questions qq left join topics t on t.id = qq.topic_id left join lessons l on l.id = qq.lesson_id left join chapters c on c.id = l.chapter_id
    where qq.id = any(${rows.map((r) => r.id)}::int[])`);
  const byId = new Map(info.map((i) => [i.id, i]));
  const table = [
    EXPORT_HEADER,
    ...full.map((qf) => {
      const i = byId.get(qf.id);
      return questionToRow(qf, {
        topicCode: i?.topicCode ?? null,
        lessonCode: i?.lessonCode ?? null,
        chapter: i?.chapterCode ? `Chương ${i.chapterCode}. ${i.chapterTitle}` : '',
        lesson: i?.lessonTitle ? `${i.lessonNumber ? `Bài ${i.lessonNumber}. ` : ''}${i.lessonTitle}` : '',
        topic: i?.topicTitle ?? '',
      });
    }),
  ];
  const stamp = new Date().toISOString().slice(0, 10);
  if (ctx.query.get('dinh-dang') === 'csv') return { type: 'bytes', status: 200, contentType: 'text/csv; charset=utf-8', body: toCsv(table), filename: `ngan-hang-cau-hoi-${stamp}.csv` };
  return {
    type: 'bytes',
    status: 200,
    contentType: XLSX_MIME,
    body: writeXlsx(table, { sheetName: 'Ngân hàng câu hỏi', colWidths: EXPORT_COL_WIDTHS }),
    filename: `ngan-hang-cau-hoi-${stamp}.xlsx`,
  };
}

export const EXPORT_ICON = LuDownload;
