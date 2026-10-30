import { LuFileSpreadsheet } from 'react-icons/lu';
import { redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { requireBook } from '../common';
import { prepareImport, templateCsv, IMPORT_COLUMNS, type ImportRow } from '../../../domain/question-import';
import { saveQuestion } from '../../../domain/questions';
import { Badge, Button, ErrorList, Notice, PageTitle, Panel, PostForm, Select, buttonClass } from '../../../ui/components/ui';
import { LEVEL_LABELS, TYPE_LABELS } from '../../../shared/labels';
import { plainExcerpt } from '../../../shared/richtext';

const GUIDE: [string, string][] = [
  ['ma_dang', 'Mã dạng toán, ví dụ T8.B01.D2 (xem ở trang soạn dạng toán). Có thể thay bằng ma_bai nếu câu chưa thuộc dạng nào.'],
  ['hinh_thuc', 'TN = trắc nghiệm 4 phương án; DS = Đúng/Sai 4 ý; TLN = trả lời ngắn; TL = tự luận; HH = tự luận hình học.'],
  ['muc_do', '1–4 hoặc NB, TH, VD, VDC.'],
  ['de_bai', 'Đề bài. Công thức viết \\( … \\) hoặc \\[ … \\].'],
  ['A, B, C, D', 'TN: bốn phương án. DS: bốn ý a), b), c), d).'],
  ['dap_an', 'TN: A/B/C/D. DS: ví dụ "Đ S Đ S". TLN: đáp án số, nhiều đáp án cách nhau bởi dấu ;. TL, HH: để trống.'],
  ['loi_giai, goi_y', 'Lời giải chi tiết, gợi ý (không bắt buộc).'],
  ['hinh_ve', 'Hình vẽ mô tả bằng văn bản (bắt buộc với HH), ví dụ: A(0,0) B(4,0) C(0,3) rồi xuống dòng ABCA.'],
  ['don_vi, diem', 'Đơn vị của câu trả lời ngắn; điểm mặc định (bỏ trống = 1).'],
];

export async function importPage(ctx: Ctx, opts: { text?: string; status?: 'draft' | 'published'; rows?: ImportRow[]; headerErrors?: string[] } = {}): Promise<Res> {
  requireTeacher(ctx);
  const rows = opts.rows;
  const ok = rows?.filter((r) => !r.errors.length) ?? [];
  const bad = rows?.filter((r) => r.errors.length) ?? [];
  return page(
    ctx,
    { title: 'Nhập câu hỏi hàng loạt', layout: 'dashboard', section: 'questions', status: opts.headerErrors?.length ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/cau-hoi', label: 'Ngân hàng câu hỏi' }, { label: 'Nhập hàng loạt' }]}
        title="Nhập câu hỏi hàng loạt"
        sub="Soạn nhiều câu trong Excel rồi đưa vào ngân hàng một lần. Mỗi dòng là một câu, gắn vào dạng toán theo mã dạng."
        actions={
          <a href="/giao-vien/cau-hoi/nhap/mau.csv" className={buttonClass('secondary', 'md')}>
            <LuFileSpreadsheet aria-hidden="true" /> Tải tệp mẫu (CSV mở bằng Excel)
          </a>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          <ErrorList errors={opts.headerErrors} />
          <PostForm action="/giao-vien/cau-hoi/nhap" className="space-y-3">
            <input type="hidden" name="_action" value="preview" />
            <label htmlFor="f-data" className="block text-sm font-semibold text-ink-2">
              Dán bảng câu hỏi vào đây <span className="text-le">*</span>
            </label>
            <textarea
              id="f-data"
              name="data"
              required
              rows={12}
              defaultValue={opts.text ?? ''}
              spellCheck={false}
              className="w-full rounded-xl border border-line-2 bg-white px-3 py-2 font-mono text-[13px] leading-relaxed focus:border-tim-500"
              placeholder={IMPORT_COLUMNS.join('\t')}
            />
            <p className="text-[13px] text-ink-3">Trong Excel: chọn cả bảng (kể cả dòng tiêu đề), nhấn Ctrl+C rồi dán vào ô trên. Cũng có thể mở tệp .csv bằng Notepad, sao chép toàn bộ và dán.</p>
            <div className="flex flex-wrap items-end gap-3">
              <Select label="Trạng thái câu được nhập" name="status" defaultValue={opts.status ?? 'draft'} options={[{ value: 'draft', label: 'Bản nháp – kiểm tra rồi xuất bản sau' }, { value: 'published', label: 'Xuất bản ngay' }]} />
              <Button variant="secondary">Kiểm tra dữ liệu</Button>
            </div>
          </PostForm>

          {rows && (
            <Panel className="overflow-x-auto">
              <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
                <strong>Kết quả kiểm tra</strong>
                <Badge tone="tre">{ok.length} dòng hợp lệ</Badge>
                {bad.length > 0 && <Badge tone="le">{bad.length} dòng có lỗi</Badge>}
                {ok.length > 0 && (
                  <PostForm action="/giao-vien/cau-hoi/nhap" className="ml-auto">
                    <input type="hidden" name="_action" value="import" />
                    <input type="hidden" name="status" value={opts.status ?? 'draft'} />
                    <textarea name="data" hidden readOnly defaultValue={opts.text ?? ''} />
                    <Button size="sm">
                      Nhập {ok.length} câu hợp lệ{bad.length ? ` (bỏ qua ${bad.length} dòng lỗi)` : ''}
                    </Button>
                  </PostForm>
                )}
              </div>
              <table className="data-table min-w-[820px]">
                <thead>
                  <tr>
                    <th className="w-14">Dòng</th>
                    <th className="w-60">Dạng toán</th>
                    <th className="w-36">Hình thức / mức</th>
                    <th>Đề bài</th>
                    <th className="w-72">Kiểm tra</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.line} className={r.errors.length ? 'bg-le-soft/50' : ''}>
                      <td className="text-ink-3">{r.line}</td>
                      <td className="text-[13.5px]">{r.topicLabel ?? <span className="text-ink-3">—</span>}</td>
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
                        ) : (
                          <span className="font-semibold text-tre">Hợp lệ</span>
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
            Dòng tiêu đề phải có tên cột như tệp mẫu (thứ tự cột tùy ý). Mỗi câu được kiểm tra như khi soạn trên trang: phương án, đáp án, công thức, hình vẽ.
          </Notice>
        </Panel>
      </div>
    </>,
  );
}

export async function importAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const form = await ctx.form();
  const text = form.text('data', 3_000_000);
  const status = form.str('status') === 'published' ? 'published' : 'draft';
  const { rows, headerErrors } = await prepareImport(ctx.db, book.id, text, status);
  if (form.str('_action') !== 'import' || headerErrors.length) return importPage(ctx, { text, status, rows, headerErrors });
  const ok = rows.filter((r) => !r.errors.length);
  let saved = 0;
  const failed: string[] = [];
  for (const r of ok) {
    const res = await saveQuestion(ctx.db, null, book.id, r.input, user.id);
    if (res.id) saved++;
    else failed.push(`Dòng ${r.line}: ${res.error}`);
  }
  if (failed.length) return importPage(ctx, { text, status, rows, headerErrors: [`Đã nhập ${saved} câu. Không nhập được:`, ...failed] });
  const skipped = rows.length - ok.length;
  return redirect(
    `/giao-vien/cau-hoi${status === 'draft' ? '?trang-thai=draft' : ''}`,
    { type: 'success', message: `Đã nhập ${saved} câu hỏi${status === 'draft' ? ' ở trạng thái bản nháp' : ''}.${skipped ? ` Bỏ qua ${skipped} dòng có lỗi.` : ''}` },
    ctx,
  );
}

export async function importTemplate(ctx: Ctx): Promise<Res> {
  requireTeacher(ctx);
  return { type: 'bytes', status: 200, contentType: 'text/csv; charset=utf-8', body: templateCsv() };
}
