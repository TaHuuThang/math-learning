/**
 * Trình soạn nội dung giai đoạn 3 cho giáo viên (không cần sửa mã nguồn):
 *  - Công thức cần nhớ của bài: thêm, sửa, xóa, sắp xếp, ẩn/hiện.
 *  - Ví dụ minh họa của dạng toán theo mức độ: thêm, sửa, xóa, sắp xếp, ẩn/hiện; lưu ý khi giải.
 *  - Ảnh minh họa: tải ảnh PNG/JPEG/WebP lên, chèn vào nội dung bằng mã [anh:số].
 */
import type { ReactNode } from 'react';
import { LuArrowDown, LuArrowUp, LuEye, LuEyeOff } from 'react-icons/lu';
import { HttpError, redirect, safeNext, type Ctx, type FormData, type Res } from '../../http/context';
import { requireTeacher } from '../../auth/guards';
import { sql } from '../../db';
import { sniffImage } from '../../http/multipart';
import { getLessonFormulas, getTopicExamples, type FormulaCardRow, type WorkedExampleRow } from '../../../domain/lesson-content';
import { LEVEL_LABELS, type Level } from '../../../domain/knowledge';
import { Island } from '../../../ui/Island';
import { Badge, Button, Field, Panel, PostForm, Rich, Select, TextArea, buttonClass, cx } from '../../../ui/components/ui';
import { FormulaCard, WorkedExample } from '../../../ui/components/lesson-v3';
import { LevelBadges } from '../../../ui/components/knowledge';
import { findMathErrors, renderRich } from '../../../shared/richtext';
import { figureToSvg } from '../../../shared/figure';

const STATUS_OPTIONS = [
  { value: 'published', label: 'Xuất bản – học sinh thấy' },
  { value: 'draft', label: 'Ẩn – chỉ giáo viên thấy' },
];
const HINT = 'Công thức \\( … \\) hoặc \\[ … \\]; "- " đầu dòng là danh sách; **đậm**; ảnh: [anh:số]; sơ đồ: [sodo] … [/sodo].';
const nullable = (s: string) => (s.trim() ? s.trim() : null);
const status = (f: FormData) => (f.str('status') === 'draft' ? 'draft' : 'published');

function Rf({ name, label, value, rows = 3, required, hint = HINT }: { name: string; label: string; value?: string | null; rows?: number; required?: boolean; hint?: string }) {
  return <Island name="RichField" props={{ name, label, defaultValue: value ?? '', initialHtml: value ? renderRich(value) : '', rows, hint, required: !!required }} />;
}

function Act({ action, fields, label, children, confirm, danger, disabled }: { action: string; fields: Record<string, string | number>; label: string; children: ReactNode; confirm?: string; danger?: boolean; disabled?: boolean }) {
  return (
    <PostForm action={action} confirm={confirm}>
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <button className={buttonClass('quiet', 'sm', cx('px-2', danger && 'text-le hover:bg-le-soft'))} aria-label={label} title={label} disabled={disabled}>
        {children}
      </button>
    </PostForm>
  );
}

/** Đổi chỗ một dòng với dòng kề trong bảng có sort_order, trong phạm vi cột cha. */
async function swapOrder(ctx: Ctx, table: 'formulas' | 'worked_examples', parentCol: 'lesson_id' | 'topic_id', parentId: number, id: number, dir: number) {
  await ctx.db.tx(async (t) => {
    const rows = await t.many<{ id: number }>(sql`select id from ${sql.raw(table)} where ${sql.raw(parentCol)} = ${parentId} order by ${sql.raw(table === 'worked_examples' ? 'level, ' : '')}sort_order, id`);
    const i = rows.findIndex((r) => r.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= rows.length) return;
    [rows[i], rows[j]] = [rows[j], rows[i]];
    for (const [k, r] of rows.entries()) await t.exec(sql`update ${sql.raw(table)} set sort_order = ${k + 1}, updated_at = now() where id = ${r.id}`);
  });
}

// ====================== Công thức cần nhớ ======================

function FormulaForm({ action, f, idx }: { action: string; f?: FormulaCardRow; idx: string }) {
  return (
    <PostForm action={action} className="space-y-3">
      <input type="hidden" name="_action" value={f ? 'update-formula' : 'add-formula'} />
      {f && <input type="hidden" name="formula_id" value={f.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nhóm công thức" name="group_title" defaultValue={f?.groupTitle ?? ''} maxLength={200} hint="Ví dụ: Hằng đẳng thức bậc hai" />
        <Field label="Tên công thức" name="name" required defaultValue={f?.name ?? ''} maxLength={200} />
      </div>
      <TextArea label="Công thức (mã TeX, không cần \[ \])" name="tex" required rows={2} defaultValue={f?.tex ?? ''} hint="Ví dụ: (A + B)^2 = A^2 + 2AB + B^2" />
      <Rf name="symbols" label="Ý nghĩa các kí hiệu" value={f?.symbols} key={`sym-${idx}`} />
      <Rf name="condition" label="Điều kiện sử dụng (không bắt buộc)" value={f?.condition} rows={2} key={`cond-${idx}`} />
      <Rf name="example" label="Ví dụ áp dụng" value={f?.example} required key={`ex-${idx}`} />
      <Select label="Trạng thái" name="status" defaultValue={f?.status ?? 'published'} options={STATUS_OPTIONS} />
      <Button size="sm">{f ? 'Lưu công thức' : 'Thêm công thức'}</Button>
    </PostForm>
  );
}

export function FormulaPanel({ action, formulas }: { action: string; formulas: FormulaCardRow[] }) {
  return (
    <Panel className="p-5" as="section">
      <h2 className="text-lg font-extrabold">Công thức cần nhớ ({formulas.length})</h2>
      <p className="mt-1 text-[14px] text-ink-3">Mỗi công thức có tên, mã TeX, ý nghĩa kí hiệu, điều kiện sử dụng và ví dụ. Học sinh xem trong mục "CÔNG THỨC CẦN NHỚ" của bài và trang Công thức.</p>
      <div className="mt-4 space-y-3">
        {formulas.map((f, i) => (
          <div key={f.id} className="rounded-2xl border border-line p-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-[12.5px] text-ink-3">{f.groupTitle || 'Chưa có nhóm'}</span>
              {f.status === 'draft' && <Badge tone="gray">Đang ẩn</Badge>}
              <span className="ml-auto flex items-center gap-1">
                <Act action={action} fields={{ _action: 'move-formula', formula_id: f.id, dir: -1 }} label="Đưa lên" disabled={i === 0}>
                  <LuArrowUp aria-hidden="true" />
                </Act>
                <Act action={action} fields={{ _action: 'move-formula', formula_id: f.id, dir: 1 }} label="Đưa xuống" disabled={i === formulas.length - 1}>
                  <LuArrowDown aria-hidden="true" />
                </Act>
                <Act action={action} fields={{ _action: 'formula-status', formula_id: f.id, status: f.status === 'published' ? 'draft' : 'published' }} label={f.status === 'published' ? 'Ẩn công thức' : 'Xuất bản công thức'}>
                  {f.status === 'published' ? <LuEyeOff aria-hidden="true" /> : <LuEye aria-hidden="true" />}
                </Act>
                <Act action={action} fields={{ _action: 'delete-formula', formula_id: f.id }} label="Xóa công thức" confirm="Xóa công thức này?" danger>
                  Xóa
                </Act>
              </span>
            </div>
            <FormulaCard f={f} />
            <details className="mt-2">
              <summary className="text-[14px] font-semibold text-tim-700">Sửa công thức</summary>
              <div className="mt-3">
                <FormulaForm action={action} f={f} idx={String(f.id)} />
              </div>
            </details>
          </div>
        ))}
        {!formulas.length && <p className="text-[14.5px] text-ink-3">Bài chưa có công thức.</p>}
      </div>
      <details className="mt-4 rounded-2xl border border-dashed border-tim-200 px-4 py-3">
        <summary className="font-semibold text-tim-700">+ Thêm công thức</summary>
        <div className="mt-3">
          <FormulaForm action={action} idx="new" />
        </div>
      </details>
    </Panel>
  );
}

export async function loadFormulas(ctx: Ctx, lessonId: number) {
  return getLessonFormulas(ctx.db, lessonId, false);
}

/** Xử lí thao tác công thức trong trình soạn bài; trả về null nếu không phải thao tác công thức. */
export async function handleFormulaAction(ctx: Ctx, lessonId: number, form: FormData, back: string, fail: (errors: string[]) => Promise<Res>): Promise<Res | null> {
  const action = form.str('_action');
  const id = form.int('formula_id') ?? 0;
  const mine = async () => {
    if (!(await ctx.db.one(sql`select 1 from formulas where id = ${id} and lesson_id = ${lessonId}`))) throw new HttpError(404);
  };
  if (action === 'add-formula' || action === 'update-formula') {
    const v = {
      group: form.str('group_title', 200),
      name: form.str('name', 200),
      tex: form.text('tex', 4000).trim(),
      symbols: form.text('symbols', 4000).trim(),
      condition: nullable(form.text('condition', 4000)),
      example: form.text('example', 8000).trim(),
      status: status(form),
    };
    const errors: string[] = [];
    if (!v.name) errors.push('Tên công thức không được để trống.');
    if (!v.tex) errors.push('Công thức (mã TeX) không được để trống.');
    if (/\\\(|\\\[|\\\)|\\\]/.test(v.tex)) errors.push('Ô công thức chỉ nhập mã TeX, không kèm \\( \\) hay \\[ \\].');
    if (!v.example) errors.push('Cần ví dụ áp dụng.');
    errors.push(...findMathErrors(`\\[${v.tex}\\]`).map((e) => 'Công thức: ' + e));
    errors.push(...findMathErrors(v.symbols).map((e) => 'Kí hiệu: ' + e), ...findMathErrors(v.condition ?? '').map((e) => 'Điều kiện: ' + e), ...findMathErrors(v.example).map((e) => 'Ví dụ: ' + e));
    if (errors.length) return fail(errors);
    if (action === 'add-formula') {
      await ctx.db.exec(sql`
        insert into formulas (lesson_id, group_title, name, tex, symbols, condition, example, status, sort_order)
        values (${lessonId}, ${v.group}, ${v.name}, ${v.tex}, ${v.symbols}, ${v.condition}, ${v.example}, ${v.status},
          (select coalesce(max(sort_order), 0) + 1 from formulas where lesson_id = ${lessonId}))`);
    } else {
      await mine();
      await ctx.db.exec(sql`
        update formulas set group_title = ${v.group}, name = ${v.name}, tex = ${v.tex}, symbols = ${v.symbols}, condition = ${v.condition},
          example = ${v.example}, status = ${v.status}, updated_at = now()
        where id = ${id}`);
    }
    return redirect(back + '#cong-thuc-bai', { type: 'success', message: action === 'add-formula' ? 'Đã thêm công thức.' : 'Đã lưu công thức.' }, ctx);
  }
  if (action === 'delete-formula') {
    await mine();
    await ctx.db.exec(sql`delete from formulas where id = ${id}`);
    return redirect(back + '#cong-thuc-bai', { type: 'success', message: 'Đã xóa công thức.' }, ctx);
  }
  if (action === 'formula-status') {
    await mine();
    await ctx.db.exec(sql`update formulas set status = ${status(form)}, updated_at = now() where id = ${id}`);
    return redirect(back + '#cong-thuc-bai', { type: 'success', message: status(form) === 'draft' ? 'Đã ẩn công thức.' : 'Đã xuất bản công thức.' }, ctx);
  }
  if (action === 'move-formula') {
    await mine();
    await swapOrder(ctx, 'formulas', 'lesson_id', lessonId, id, form.int('dir') === -1 ? -1 : 1);
    return redirect(back + '#cong-thuc-bai');
  }
  return null;
}

// ====================== Ví dụ minh họa của dạng toán ======================

function ExampleForm({ action, e, idx, levels }: { action: string; e?: WorkedExampleRow; idx: string; levels: Level[] }) {
  const lv = e?.level ?? levels[0] ?? 1;
  return (
    <PostForm action={action} className="space-y-3">
      <input type="hidden" name="_action" value={e ? 'update-example' : 'add-example'} />
      {e && <input type="hidden" name="example_id" value={e.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Select label="Mức độ" name="level" defaultValue={lv} options={([1, 2, 3, 4] as Level[]).map((l) => ({ value: l, label: `${LEVEL_LABELS[l]}${levels.includes(l) ? '' : ' (dạng chưa đánh dấu mức này)'}` }))} />
        <Select label="Trạng thái" name="status" defaultValue={e?.status ?? 'published'} options={STATUS_OPTIONS} />
      </div>
      <Rf name="problem" label="Đề bài" value={e?.problem} rows={4} required key={`p-${idx}`} />
      <Rf name="analysis" label="Phân tích đề" value={e?.analysis} rows={2} key={`a-${idx}`} />
      <Rf name="knowledge" label="Kiến thức sử dụng" value={e?.knowledge} rows={2} key={`k-${idx}`} />
      <details className="rounded-xl bg-mist px-4 py-3">
        <summary className="text-[14px] font-semibold text-tim-800">Hình học: hình vẽ, giả thiết, kết luận</summary>
        <div className="mt-3 space-y-3">
          <TextArea label="Hình vẽ (cú pháp [hinh], không cần thẻ [hinh])" name="figure" rows={4} defaultValue={e?.figure ?? ''} hint="Ví dụ: A(0,4) B(-3,0) C(3,0) / AB BC CA / vuong(B,A,C)" />
          <Rf name="given" label="Giả thiết (GT)" value={e?.given} rows={2} key={`g-${idx}`} />
          <Rf name="to_prove" label="Kết luận (KL)" value={e?.toProve} rows={2} key={`kl-${idx}`} />
        </div>
      </details>
      <TextArea label="Lời giải từng bước – mỗi bước một dòng" name="steps" required rows={6} defaultValue={e?.steps.map((s) => s.replace(/\n+/g, ' ')).join('\n') ?? ''} hint="Học sinh bấm “Bước tiếp theo” để xem lần lượt từng dòng." />
      <Rf name="answer" label="Kết luận" value={e?.answer} rows={2} required key={`ans-${idx}`} />
      <Rf name="tip" label="Nhận xét – mẹo (không bắt buộc)" value={e?.tip} rows={2} key={`tip-${idx}`} />
      <Button size="sm">{e ? 'Lưu ví dụ' : 'Thêm ví dụ'}</Button>
    </PostForm>
  );
}

export function ExamplePanel({ action, examples, levels, notes }: { action: string; examples: WorkedExampleRow[]; levels: Level[]; notes: string | null }) {
  const missing = levels.filter((l) => !examples.some((e) => e.level === l && e.status === 'published'));
  return (
    <>
      <Panel className="p-5" as="section">
        <h2 id="vi-du-dang" className="scroll-mt-24 text-lg font-extrabold">
          Ví dụ minh họa theo mức độ ({examples.length})
        </h2>
        <p className="mt-1 text-[14px] text-ink-3">Mỗi ví dụ có đề, phân tích, kiến thức, lời giải từng bước, kết luận, nhận xét – mẹo. Ví dụ hình học có thêm hình vẽ, GT, KL.</p>
        {missing.length > 0 && (
          <p className="mt-2 rounded-xl bg-hl-soft px-3 py-2 text-[14px]">
            Còn thiếu ví dụ mức: <LevelBadges levels={missing} full />
          </p>
        )}
        <div className="mt-4 space-y-4">
          {examples.map((e, i) => (
            <div key={e.id} className="rounded-2xl border border-line p-3">
              <div className="mb-2 flex flex-wrap items-center gap-1">
                <span className="ml-auto flex items-center gap-1">
                  <Act action={action} fields={{ _action: 'move-example', example_id: e.id, dir: -1 }} label="Đưa lên" disabled={i === 0}>
                    <LuArrowUp aria-hidden="true" />
                  </Act>
                  <Act action={action} fields={{ _action: 'move-example', example_id: e.id, dir: 1 }} label="Đưa xuống" disabled={i === examples.length - 1}>
                    <LuArrowDown aria-hidden="true" />
                  </Act>
                  <Act action={action} fields={{ _action: 'example-status', example_id: e.id, status: e.status === 'published' ? 'draft' : 'published' }} label={e.status === 'published' ? 'Ẩn ví dụ' : 'Xuất bản ví dụ'}>
                    {e.status === 'published' ? <LuEyeOff aria-hidden="true" /> : <LuEye aria-hidden="true" />}
                  </Act>
                  <Act action={action} fields={{ _action: 'delete-example', example_id: e.id }} label="Xóa ví dụ" confirm="Xóa ví dụ này?" danger>
                    Xóa
                  </Act>
                </span>
              </div>
              <WorkedExample e={e} index={i + 1} />
              <details className="mt-2">
                <summary className="text-[14px] font-semibold text-tim-700">Sửa ví dụ</summary>
                <div className="mt-3">
                  <ExampleForm action={action} e={e} idx={String(e.id)} levels={levels} />
                </div>
              </details>
            </div>
          ))}
          {!examples.length && <p className="text-[14.5px] text-ink-3">Dạng toán chưa có ví dụ minh họa.</p>}
        </div>
        <details className="mt-4 rounded-2xl border border-dashed border-tim-200 px-4 py-3">
          <summary className="font-semibold text-tim-700">+ Thêm ví dụ</summary>
          <div className="mt-3">
            <ExampleForm action={action} idx="new" levels={levels} />
          </div>
        </details>
      </Panel>
      <Panel className="p-5" as="section">
        <h2 className="text-lg font-extrabold">Những lưu ý khi giải</h2>
        <PostForm action={action} className="mt-3 space-y-3">
          <input type="hidden" name="_action" value="notes" />
          <Rf name="notes" label="Lưu ý (hiện trên trang dạng toán)" value={notes} rows={3} key="notes" />
          <Button size="sm" variant="secondary">
            Lưu lưu ý
          </Button>
        </PostForm>
      </Panel>
    </>
  );
}

export async function loadExamples(ctx: Ctx, topicId: number) {
  return getTopicExamples(ctx.db, topicId, false);
}

export async function handleExampleAction(ctx: Ctx, topicId: number, form: FormData, back: string, fail: (errors: string[]) => Promise<Res>): Promise<Res | null> {
  const action = form.str('_action');
  const id = form.int('example_id') ?? 0;
  const mine = async () => {
    if (!(await ctx.db.one(sql`select 1 from worked_examples where id = ${id} and topic_id = ${topicId}`))) throw new HttpError(404);
  };
  if (action === 'notes') {
    const notes = nullable(form.text('notes', 8000));
    const errors = findMathErrors(notes ?? '');
    if (errors.length) return fail(errors);
    await ctx.db.exec(sql`update topics set notes = ${notes}, updated_at = now() where id = ${topicId}`);
    return redirect(back, { type: 'success', message: 'Đã lưu lưu ý khi giải.' }, ctx);
  }
  if (action === 'add-example' || action === 'update-example') {
    const lv = form.int('level') ?? 0;
    const v = {
      level: lv >= 1 && lv <= 4 ? lv : 0,
      problem: form.text('problem', 8000).trim(),
      analysis: form.text('analysis', 4000).trim(),
      knowledge: form.text('knowledge', 4000).trim(),
      figure: nullable(form.text('figure', 4000)),
      given: nullable(form.text('given', 4000)),
      toProve: nullable(form.text('to_prove', 4000)),
      steps: form
        .text('steps', 16000)
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean),
      answer: form.text('answer', 4000).trim(),
      tip: nullable(form.text('tip', 4000)),
      status: status(form),
    };
    const errors: string[] = [];
    if (!v.level) errors.push('Chọn mức độ của ví dụ.');
    if (!v.problem) errors.push('Đề bài không được để trống.');
    if (!v.steps.length) errors.push('Lời giải cần ít nhất một bước.');
    if (v.steps.length > 30) errors.push('Lời giải tối đa 30 bước.');
    if (!v.answer) errors.push('Cần phần kết luận.');
    const check = (label: string, t: string | null) => errors.push(...findMathErrors(t ?? '').map((e) => `${label}: ${e}`));
    check('Đề bài', v.problem);
    check('Phân tích', v.analysis);
    check('Kiến thức', v.knowledge);
    check('Giả thiết', v.given);
    check('Kết luận (KL)', v.toProve);
    v.steps.forEach((s, i) => check(`Bước ${i + 1}`, s));
    check('Kết luận', v.answer);
    check('Nhận xét', v.tip);
    if (v.figure) errors.push(...figureToSvg(v.figure.replace(/^\[hinh\]|\[\/hinh\]$/g, '')).errors.map((e) => 'Hình vẽ: ' + e));
    if (errors.length) return fail(errors);
    const figure = v.figure?.replace(/^\[hinh\]\s*|\s*\[\/hinh\]$/g, '') ?? null;
    if (action === 'add-example') {
      await ctx.db.exec(sql`
        insert into worked_examples (topic_id, level, problem, analysis, knowledge, given, to_prove, figure, steps, answer, tip, status, sort_order)
        values (${topicId}, ${v.level}, ${v.problem}, ${v.analysis}, ${v.knowledge}, ${v.given}, ${v.toProve}, ${figure}, ${JSON.stringify(v.steps)}::jsonb,
          ${v.answer}, ${v.tip}, ${v.status}, (select coalesce(max(sort_order), 0) + 1 from worked_examples where topic_id = ${topicId}))`);
    } else {
      await mine();
      await ctx.db.exec(sql`
        update worked_examples set level = ${v.level}, problem = ${v.problem}, analysis = ${v.analysis}, knowledge = ${v.knowledge}, given = ${v.given},
          to_prove = ${v.toProve}, figure = ${figure}, steps = ${JSON.stringify(v.steps)}::jsonb, answer = ${v.answer}, tip = ${v.tip}, status = ${v.status}, updated_at = now()
        where id = ${id}`);
    }
    return redirect(back + '#vi-du-dang', { type: 'success', message: action === 'add-example' ? 'Đã thêm ví dụ.' : 'Đã lưu ví dụ.' }, ctx);
  }
  if (action === 'delete-example') {
    await mine();
    await ctx.db.exec(sql`delete from worked_examples where id = ${id}`);
    return redirect(back + '#vi-du-dang', { type: 'success', message: 'Đã xóa ví dụ.' }, ctx);
  }
  if (action === 'example-status') {
    await mine();
    await ctx.db.exec(sql`update worked_examples set status = ${status(form)}, updated_at = now() where id = ${id}`);
    return redirect(back + '#vi-du-dang', { type: 'success', message: status(form) === 'draft' ? 'Đã ẩn ví dụ.' : 'Đã xuất bản ví dụ.' }, ctx);
  }
  if (action === 'move-example') {
    await mine();
    await swapOrder(ctx, 'worked_examples', 'topic_id', topicId, id, form.int('dir') === -1 ? -1 : 1);
    return redirect(back + '#vi-du-dang');
  }
  return null;
}

// ====================== Ảnh minh họa ======================

export interface ImageRow {
  id: number;
  alt: string;
  byteSize: number | null;
  createdAt: Date;
}

export async function recentImages(ctx: Ctx, limit = 12): Promise<ImageRow[]> {
  return ctx.db.many<ImageRow>(sql`select id, alt, byte_size, created_at from images where kind = 'upload' and is_public order by id desc limit ${limit}`);
}

export function ImagePanel({ next, images }: { next: string; images: ImageRow[] }) {
  return (
    <Panel className="p-5" as="section">
      <h2 className="text-lg font-extrabold">Ảnh minh họa, sơ đồ</h2>
      <p className="mt-1 text-[13.5px] text-ink-3">
        Tải ảnh PNG, JPEG hoặc WebP (tối đa 3 MB), rồi dán mã <code>[anh:số]</code> vào bất kì ô nội dung nào. Sơ đồ khối: viết <code>[sodo]</code> … <code>[/sodo]</code>.
      </p>
      <PostForm action="/giao-vien/anh" encType="multipart/form-data" className="mt-3 space-y-2">
        <input type="hidden" name="next" value={next} />
        <label className="block text-sm font-semibold text-ink-2" htmlFor="image-file">
          Chọn ảnh
        </label>
        <input id="image-file" type="file" name="file" accept="image/png,image/jpeg,image/webp" required className="block w-full text-[14px]" />
        <Field label="Mô tả ảnh (cho học sinh khiếm thị)" name="alt" maxLength={200} />
        <Button size="sm" variant="secondary">
          Tải ảnh lên
        </Button>
      </PostForm>
      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3">
          {images.map((img) => (
            <li key={img.id} className="rounded-xl border border-line p-2 text-center">
              <img src={`/media/${img.id}`} alt={img.alt || 'Ảnh minh họa'} className="mx-auto h-20 w-full rounded-lg object-contain" loading="lazy" />
              <input readOnly value={`[anh:${img.id}]`} aria-label="Mã chèn ảnh" className="mt-1 w-full rounded-md bg-mist px-1 py-0.5 text-center font-mono text-[12.5px]" />
            </li>
          ))}
        </ul>
      )}
      <details className="mt-3 text-[13.5px]">
        <summary className="font-semibold text-tim-700">Cách viết sơ đồ</summary>
        <Rich
          className="mt-2 text-[13.5px]"
          src={`Mỗi dòng một khối: tên(cột,hàng) nội dung; thêm * để tô màu. Mũi tên: A > B : nhãn. Ví dụ:
[sodo]
T(1,0) Tứ giác
H(1,1)* Hình thang
B(1,2) Hình bình hành
T > H : có 2 cạnh song song
H > B : 2 cặp cạnh song song
[/sodo]`}
        />
      </details>
    </Panel>
  );
}

/** POST /giao-vien/anh – tải ảnh minh họa công khai. */
export async function uploadImageAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const form = await ctx.form();
  const back = safeNext(form.str('next', 300), '/giao-vien');
  const file = (await ctx.files()).find((f) => f.field === 'file');
  if (!file) return redirect(back, { type: 'error', message: 'Chưa chọn ảnh.' }, ctx);
  if (file.data.length > 3 * 1024 * 1024) return redirect(back, { type: 'error', message: 'Ảnh lớn hơn 3 MB. Hãy giảm kích thước ảnh.' }, ctx);
  const mime = sniffImage(file.data);
  if (!mime) return redirect(back, { type: 'error', message: 'Chỉ nhận ảnh PNG, JPEG hoặc WebP.' }, ctx);
  const row = await ctx.db.one<{ id: number }>(sql`
    insert into images (kind, mime, data, byte_size, alt, created_by, is_public)
    values ('upload', ${mime}, ${file.data}, ${file.data.length}, ${form.str('alt', 200)}, ${user.id}, true) returning id`);
  return redirect(back, { type: 'success', message: `Đã tải ảnh lên. Mã chèn vào nội dung: [anh:${row!.id}]` }, ctx);
}
