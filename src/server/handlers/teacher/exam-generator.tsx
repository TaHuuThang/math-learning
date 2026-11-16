import { LuShuffle, LuWandSparkles } from 'react-icons/lu';
import { HttpError, redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { intParam, requireBook } from '../common';
import { getCourseTree, chapterLabel, lessonLabel, topicOptions } from '../../../domain/curriculum';
import {
  DEFAULT_TYPE_POINTS,
  blueprintVariants,
  createBlueprint,
  defaultBlueprint,
  deleteUnusedVariants,
  generateVariants,
  getBlueprint,
  listBlueprints,
  updateBlueprint,
  validateBlueprint,
  type BlueprintConfig,
} from '../../../domain/exam-blueprints';
import { Badge, Button, EmptyState, ErrorList, Notice, PageTitle, Panel, PostForm, buttonClass } from '../../../ui/components/ui';
import { LEVEL_LABELS, TYPE_LABELS, TYPE_SHORT, formatDate } from '../../../shared/labels';
import { QUESTION_TYPES, type QuestionType } from '../../../shared/grading';
import { AREA_LABELS, CHAPTER_AREAS, type ExamOrder } from '../../../shared/exam-gen';
import type { FormData } from '../../http/context';

function readConfig(form: FormData): BlueprintConfig {
  const c = defaultBlueprint();
  const ints = (name: string) => [...new Set(form.all(name).map(Number).filter((n) => Number.isInteger(n) && n > 0))];
  c.title = form.str('title', 160);
  c.chapterIds = ints('chuong');
  c.lessonIds = ints('bai');
  c.topicIds = ints('dang');
  c.typeCounts = {};
  c.typePoints = {};
  for (const t of QUESTION_TYPES) {
    const n = Math.max(0, Math.min(80, form.int(`so-${t}`) ?? 0));
    if (n) c.typeCounts[t] = n;
    const pts = form.num(`diem-${t}`);
    c.typePoints[t] = pts && pts > 0 ? Math.round(pts * 100) / 100 : DEFAULT_TYPE_POINTS[t];
  }
  c.levels = [...new Set(form.all('muc').map(Number).filter((n) => n >= 1 && n <= 4))].sort();
  c.levelWeights = {};
  for (const l of [1, 2, 3, 4]) c.levelWeights[l] = Math.max(0, Math.min(100, form.num(`ti-le-${l}`) ?? 0));
  if (!Object.values(c.levelWeights).some((w) => w > 0)) c.levelWeights = { 1: 4, 2: 3, 3: 2, 4: 1 };
  c.balanceAreas = form.str('can-doi') === '1';
  const d = form.int('thoi-gian');
  c.duration = d && d > 0 ? d : null;
  c.variants = Math.max(1, Math.min(12, form.int('so-ma-de') ?? 1));
  c.sameQuestions = form.str('chung-cau') !== '0';
  c.shuffleQuestions = form.str('dao-cau') === '1';
  c.shuffleOptions = form.str('dao-phuong-an') === '1';
  c.order = (['type', 'level', 'random'] as ExamOrder[]).find((o) => o === form.str('thu-tu')) ?? 'type';
  c.showAnswers = form.str('xem-dap-an') === '1';
  return c;
}

async function BlueprintForm({ ctx, cfg, action, submit }: { ctx: Ctx; cfg: BlueprintConfig; action: string; submit: string }) {
  const book = await requireBook(ctx);
  const tree = await getCourseTree(ctx.db, book.id, null);
  const chapters = tree.flatMap((s) => s.chapters.filter((c) => c.kind === 'chapter').map((c) => ({ ...c, semester: s.name })));
  const topics = await topicOptions(ctx.db, book.id);
  const total = QUESTION_TYPES.reduce((s, t) => s + (cfg.typeCounts[t] ?? 0) * (cfg.typePoints[t] ?? DEFAULT_TYPE_POINTS[t]), 0);
  return (
    <PostForm action={action} className="space-y-6">
      <Panel className="space-y-5 p-5">
        <div>
          <label htmlFor="f-title" className="mb-1.5 block text-sm font-semibold text-ink-2">
            Tên đề <span className="text-le">*</span>
          </label>
          <input id="f-title" name="title" required maxLength={160} defaultValue={cfg.title} placeholder="Ví dụ: Kiểm tra giữa học kì I – Toán 8" className="w-full rounded-xl border border-line-2 px-3.5 py-2.5 text-[15px] focus:border-tim-500 focus:outline-none" />
        </div>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-2">Phạm vi kiến thức – chương</legend>
          <div className="grid gap-2 md:grid-cols-2">
            {chapters.map((c) => (
              <label key={c.id} className="flex items-start gap-2 rounded-xl border border-line px-3 py-2 text-[14.5px]">
                <input type="checkbox" name="chuong" value={c.id} defaultChecked={cfg.chapterIds.includes(c.id)} className="mt-1 h-4 w-4 accent-[#3b2a8c]" />
                <span>
                  {chapterLabel(c)}
                  <span className="block text-[12.5px] text-ink-3">
                    {c.semester} · {AREA_LABELS[CHAPTER_AREAS[c.code] ?? 'algebra']}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="f-bai" className="mb-1.5 block text-sm font-semibold text-ink-2">
              … hoặc chọn bài cụ thể (giữ Ctrl để chọn nhiều)
            </label>
            <select id="f-bai" name="bai" multiple size={8} defaultValue={cfg.lessonIds.map(String)} className="w-full rounded-xl border border-line-2 px-2 py-2 text-[14px]">
              {chapters.map((c) => (
                <optgroup key={c.id} label={chapterLabel(c)}>
                  {c.lessons
                    .filter((l) => l.kind === 'lesson')
                    .map((l) => (
                      <option key={l.id} value={l.id}>
                        {lessonLabel(l)}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-dang" className="mb-1.5 block text-sm font-semibold text-ink-2">
              … hoặc dạng toán cụ thể
            </label>
            <select id="f-dang" name="dang" multiple size={8} defaultValue={cfg.topicIds.map(String)} className="w-full rounded-xl border border-line-2 px-2 py-2 text-[14px]">
              {[...new Set(topics.map((t) => t.lesson))].map((lesson) => (
                <optgroup key={lesson} label={lesson}>
                  {topics
                    .filter((t) => t.lesson === lesson)
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
        <p className="text-[13px] text-ink-3">Câu hỏi được lấy trong hợp của các chương/bài/dạng đã chọn; chỉ lấy câu đã xuất bản (đã duyệt).</p>
      </Panel>

      <Panel className="space-y-5 p-5">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-2">Số câu và điểm mỗi câu theo hình thức</legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {QUESTION_TYPES.map((t) => (
              <div key={t} className="rounded-xl border border-line p-3 text-[14px]">
                <div className="font-semibold">{TYPE_LABELS[t]}</div>
                <label className="mt-2 block text-[12.5px] text-ink-3">
                  Số câu
                  <input type="number" name={`so-${t}`} min={0} max={80} defaultValue={cfg.typeCounts[t] ?? 0} className="mt-0.5 w-full rounded-lg border border-line-2 px-2 py-1.5 text-[15px]" />
                </label>
                <label className="mt-2 block text-[12.5px] text-ink-3">
                  Điểm mỗi câu
                  <input type="number" name={`diem-${t}`} min={0.05} max={10} step={0.05} defaultValue={cfg.typePoints[t] ?? DEFAULT_TYPE_POINTS[t]} className="mt-0.5 w-full rounded-lg border border-line-2 px-2 py-1.5 text-[15px]" />
                </label>
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-[13px] text-ink-3">Tổng điểm theo cấu hình hiện tại: {total.toLocaleString('vi-VN')} điểm. Có thể sửa điểm từng câu ở trang của mỗi mã đề.</p>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-2">Mức độ và tỉ lệ</legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((l) => (
              <div key={l} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-[14.5px]">
                <input type="checkbox" name="muc" value={l} defaultChecked={cfg.levels.includes(l)} className="h-4 w-4 accent-[#3b2a8c]" aria-label={LEVEL_LABELS[l]} />
                <span className="flex-1">{LEVEL_LABELS[l]}</span>
                <input type="number" name={`ti-le-${l}`} min={0} max={100} defaultValue={cfg.levelWeights[l] ?? 0} aria-label={`Tỉ lệ ${LEVEL_LABELS[l]}`} className="w-16 rounded-lg border border-line-2 px-2 py-1 text-[14px]" />
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-[13px] text-ink-3">Tỉ lệ tương đối, ví dụ 4 : 3 : 2 : 1 hoặc 40 : 30 : 20 : 10. Mức nào thiếu câu thì lấy bù ở mức gần nhất.</p>
          <label className="mt-3 flex items-center gap-2 text-[15px]">
            <input type="checkbox" name="can-doi" value="1" defaultChecked={cfg.balanceAreas} className="h-4 w-4 accent-[#3b2a8c]" /> Cân đối giữa Số và Đại số, Hình học, Thống kê – Xác suất (theo số bài của mỗi mạch trong phạm vi)
          </label>
        </fieldset>
      </Panel>

      <Panel className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-4">
        <label className="block text-sm font-semibold text-ink-2">
          Thời gian làm bài (phút)
          <input type="number" name="thoi-gian" min={5} max={240} defaultValue={cfg.duration ?? ''} className="mt-1.5 w-full rounded-xl border border-line-2 px-3 py-2 text-[15px] font-normal" />
        </label>
        <label className="block text-sm font-semibold text-ink-2">
          Số mã đề
          <input type="number" name="so-ma-de" min={1} max={12} defaultValue={cfg.variants} className="mt-1.5 w-full rounded-xl border border-line-2 px-3 py-2 text-[15px] font-normal" />
        </label>
        <label className="block text-sm font-semibold text-ink-2">
          Các mã đề
          <select name="chung-cau" defaultValue={cfg.sameQuestions ? '1' : '0'} className="mt-1.5 w-full rounded-xl border border-line-2 px-3 py-2 text-[15px] font-normal">
            <option value="1">Cùng bộ câu hỏi, đảo thứ tự</option>
            <option value="0">Mỗi mã đề chọn câu riêng</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-ink-2">
          Thứ tự câu
          <select name="thu-tu" defaultValue={cfg.order} className="mt-1.5 w-full rounded-xl border border-line-2 px-3 py-2 text-[15px] font-normal">
            <option value="type">Theo phần: TN → Đ/S → TLN → Tự luận</option>
            <option value="level">Từ dễ đến khó</option>
            <option value="random">Ngẫu nhiên</option>
          </select>
        </label>
        <div className="space-y-2 text-[15px] md:col-span-2 lg:col-span-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="dao-cau" value="1" defaultChecked={cfg.shuffleQuestions} className="h-4 w-4 accent-[#3b2a8c]" /> Đảo thứ tự câu giữa các mã đề (trong từng phần)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="dao-phuong-an" value="1" defaultChecked={cfg.shuffleOptions} className="h-4 w-4 accent-[#3b2a8c]" /> Đảo thứ tự phương án trắc nghiệm (đáp án và lời giải tự đổi theo)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="xem-dap-an" value="1" defaultChecked={cfg.showAnswers} className="h-4 w-4 accent-[#3b2a8c]" /> Cho học sinh xem đáp án và lời giải sau khi nộp
          </label>
        </div>
      </Panel>
      <div className="flex flex-wrap gap-3">
        <Button size="lg">
          <LuWandSparkles aria-hidden="true" /> {submit}
        </Button>
        <a href="/giao-vien/de-kiem-tra" className={buttonClass('ghost', 'lg')}>
          Hủy
        </a>
      </div>
    </PostForm>
  );
}

export async function generatorPage(ctx: Ctx, opts: { cfg?: BlueprintConfig; errors?: string[] } = {}): Promise<Res> {
  const user = requireTeacher(ctx);
  const saved = await listBlueprints(ctx.db, user.id, user.role === 'admin');
  const form = await BlueprintForm({ ctx, cfg: opts.cfg ?? defaultBlueprint(), action: '/giao-vien/de-kiem-tra/tu-dong', submit: 'Lưu cấu hình và tạo mã đề' });
  return page(
    ctx,
    { title: 'Tạo đề tự động', layout: 'dashboard', section: 'tests', status: opts.errors?.length ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/de-kiem-tra', label: 'Đề kiểm tra' }, { label: 'Tạo đề tự động' }]}
        title="Tạo đề tự động từ ngân hàng câu hỏi"
        sub="Chọn phạm vi, số câu từng hình thức, mức độ, thời gian và số mã đề. Hệ thống lấy câu ngẫu nhiên đúng phạm vi, không trùng câu, phân bố mức độ theo tỉ lệ, đảo câu và phương án an toàn."
      />
      <ErrorList errors={opts.errors} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">{form}</div>
        <Panel className="h-fit p-5">
          <h2 className="text-lg font-extrabold">Cấu hình đã lưu</h2>
          {saved.length ? (
            <ul className="mt-3 divide-y divide-line">
              {saved.map((b) => (
                <li key={b.id} className="py-2.5">
                  <a href={`/giao-vien/de-kiem-tra/cau-hinh/${b.id}`} className="font-semibold hover:text-tim-700">
                    {b.title}
                  </a>
                  <div className="text-[12.5px] text-ink-3">
                    {b.variants} mã đề · {formatDate(b.updatedAt)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[14px] text-ink-3">Chưa có cấu hình nào.</p>
          )}
        </Panel>
      </div>
    </>,
  );
}

export async function generatorAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const cfg = readConfig(await ctx.form());
  const errors = validateBlueprint(cfg);
  if (errors.length) return generatorPage(ctx, { cfg, errors });
  const id = await createBlueprint(ctx.db, book.id, user.id, cfg);
  const bp = (await getBlueprint(ctx.db, id))!;
  const res = await generateVariants(ctx.db, bp, cfg.variants);
  if (res.error) return redirect(`/giao-vien/de-kiem-tra/cau-hinh/${id}`, { type: 'error', message: res.error }, ctx);
  return redirect(
    `/giao-vien/de-kiem-tra/cau-hinh/${id}`,
    { type: res.shortfall ? 'info' : 'success', message: `Đã tạo ${res.created.length} mã đề.${res.shortfall ? ` Ngân hàng còn thiếu ${res.shortfall} câu so với yêu cầu – mỗi mã đề gồm các câu hiện có.` : ''}` },
    ctx,
  );
}

async function loadBlueprint(ctx: Ctx) {
  const user = requireTeacher(ctx);
  const bp = await getBlueprint(ctx.db, intParam(ctx, 'id'));
  if (!bp || (bp.createdBy !== user.id && user.role !== 'admin')) throw new HttpError(404, 'Không tìm thấy cấu hình đề.');
  return bp;
}

export async function blueprintPage(ctx: Ctx, errors?: string[]): Promise<Res> {
  const bp = await loadBlueprint(ctx);
  const variants = await blueprintVariants(ctx.db, bp.id);
  const c = bp.config;
  const editing = ctx.query.get('sua') === '1';
  const form = editing ? await BlueprintForm({ ctx, cfg: c, action: `/giao-vien/de-kiem-tra/cau-hinh/${bp.id}/sua`, submit: 'Lưu cấu hình' }) : null;
  const typeSummary = QUESTION_TYPES.filter((t) => (c.typeCounts[t] ?? 0) > 0)
    .map((t) => `${c.typeCounts[t]} ${TYPE_SHORT[t as QuestionType].toLowerCase()} (${(c.typePoints[t] ?? 1).toLocaleString('vi-VN')} đ/câu)`)
    .join(', ');
  return page(
    ctx,
    { title: bp.title, layout: 'dashboard', section: 'tests', status: errors?.length ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/de-kiem-tra', label: 'Đề kiểm tra' }, { href: '/giao-vien/de-kiem-tra/tu-dong', label: 'Tạo đề tự động' }, { label: bp.title }]}
        title={bp.title}
        sub={`${typeSummary} · ${c.levels.map((l) => LEVEL_LABELS[l]).join(', ')} · ${c.duration ? `${c.duration} phút` : 'không giới hạn thời gian'}`}
        actions={
          !editing && (
            <a href={`?sua=1`} className={buttonClass('secondary', 'md')}>
              Sửa cấu hình
            </a>
          )
        }
      />
      <ErrorList errors={errors} />
      {editing ? (
        form
      ) : (
        <>
          <Panel className="overflow-x-auto">
            <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
              <strong>Các mã đề</strong>
              <PostForm action={`/giao-vien/de-kiem-tra/cau-hinh/${bp.id}/them`} className="ml-auto flex items-center gap-2">
                <label className="text-[14px]">
                  Thêm
                  <input type="number" name="so" min={1} max={12} defaultValue={1} className="mx-2 w-16 rounded-lg border border-line-2 px-2 py-1" />
                  mã đề
                </label>
                <Button size="sm">
                  <LuShuffle aria-hidden="true" /> Tạo thêm
                </Button>
              </PostForm>
              <PostForm action={`/giao-vien/de-kiem-tra/cau-hinh/${bp.id}/tao-lai`} confirm="Xóa các mã đề chưa có học sinh làm và tạo lại theo cấu hình hiện tại?">
                <Button size="sm" variant="quiet">
                  Tạo lại các mã đề chưa dùng
                </Button>
              </PostForm>
            </div>
            {variants.length ? (
              <table className="data-table min-w-[640px]">
                <thead>
                  <tr>
                    <th className="w-24">Mã đề</th>
                    <th>Đề</th>
                    <th className="w-32">Câu / điểm</th>
                    <th className="w-28">Bài nộp</th>
                    <th className="w-28">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v) => (
                    <tr key={v.id}>
                      <td className="font-mono font-bold">{v.variantCode}</td>
                      <td>
                        <a href={`/giao-vien/de-kiem-tra/${v.id}`} className="font-semibold hover:text-tim-700 hover:underline">
                          {v.title}
                        </a>
                      </td>
                      <td className="text-[14px]">
                        {v.questionCount} câu / {v.totalPoints.toLocaleString('vi-VN')} đ
                      </td>
                      <td className="text-[14px]">
                        <a href={`/giao-vien/de-kiem-tra/${v.id}/ket-qua`} className="hover:underline">
                          {v.submissions}
                        </a>
                      </td>
                      <td>
                        <Badge tone={v.status === 'published' ? 'tre' : 'gray'}>{v.status === 'published' ? 'Đang mở' : v.status === 'closed' ? 'Đã đóng' : 'Bản nháp'}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState title="Chưa có mã đề">Bấm “Tạo thêm” để sinh mã đề từ cấu hình.</EmptyState>
            )}
          </Panel>
          <Notice tone="info" className="mt-5">
            Mỗi mã đề là một đề kiểm tra: mở mã đề để xem trước, sửa điểm từng câu, <strong>giao cho lớp</strong> và mở đề. Phương án trắc nghiệm đã đảo theo từng mã đề; khi chấm, hệ thống tự đổi về đáp án gốc nên đáp
            án và lời giải luôn đúng.
          </Notice>
        </>
      )}
    </>,
  );
}

export async function blueprintAction(ctx: Ctx): Promise<Res> {
  const bp = await loadBlueprint(ctx);
  const action = ctx.params.action;
  const back = `/giao-vien/de-kiem-tra/cau-hinh/${bp.id}`;
  if (action === 'sua') {
    const cfg = readConfig(await ctx.form());
    const errors = validateBlueprint(cfg);
    if (errors.length) return blueprintPage(ctx, errors);
    await updateBlueprint(ctx.db, bp.id, cfg);
    return redirect(back, { type: 'success', message: 'Đã lưu cấu hình. Mã đề mới sẽ tạo theo cấu hình này.' }, ctx);
  }
  if (action === 'them') {
    const n = Math.max(1, Math.min(12, (await ctx.form()).int('so') ?? 1));
    const res = await generateVariants(ctx.db, bp, n);
    if (res.error) return redirect(back, { type: 'error', message: res.error }, ctx);
    return redirect(back, { type: 'success', message: `Đã tạo thêm ${res.created.length} mã đề.` }, ctx);
  }
  if (action === 'tao-lai') {
    const removed = await deleteUnusedVariants(ctx.db, bp.id);
    const res = await generateVariants(ctx.db, bp, Math.max(1, removed || bp.config.variants));
    if (res.error) return redirect(back, { type: 'error', message: res.error }, ctx);
    return redirect(back, { type: 'success', message: `Đã tạo lại ${res.created.length} mã đề (xóa ${removed} mã đề chưa có bài làm).` }, ctx);
  }
  throw new HttpError(404);
}
