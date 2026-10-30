import { HttpError, redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { intParam, requireBook } from '../common';
import { sql } from '../../db';
import { chapterLabel, getCourseTree, getLessonById, getLessonSections, getLessonTopics, lessonLabel, type LessonSection } from '../../../domain/curriculum';
import { Island } from '../../../ui/Island';
import { Badge, Button, ErrorList, Field, PageTitle, Panel, PostForm, Rich, Select, TextArea, buttonClass } from '../../../ui/components/ui';
import { LESSON_KIND_LABELS, SECTION_LABELS, formatDateTime } from '../../../shared/labels';
import { findMathErrors, renderRich } from '../../../shared/richtext';

export async function curriculumAdminPage(ctx: Ctx): Promise<Res> {
  requireTeacher(ctx);
  const book = await requireBook(ctx);
  const tree = await getCourseTree(ctx.db, book.id, null, true);
  return page(
    ctx,
    { title: 'Chương trình & bài học', layout: 'dashboard', section: 'curriculum' },
    <>
      <PageTitle
        title="Chương trình & bài học"
        sub={`${book.title} – ${book.series}. Chọn một mục để soạn mục tiêu, kiến thức, công thức, ví dụ và dạng toán.`}
        actions={
          <a href={`/chuong-trinh/${book.slug}/ppct`} className={buttonClass('secondary', 'md')}>
            Phân phối chương trình
          </a>
        }
      />
      <div className="space-y-8">
        {tree.map((s) => (
          <section key={s.id}>
            <h2 className="mb-3 text-xl font-extrabold">{s.name}</h2>
            <div className="space-y-4">
              {s.chapters.map((c) => (
                <Panel key={c.id} className="overflow-x-auto">
                  <div className="border-b border-line bg-mist/60 px-5 py-3 font-extrabold">{chapterLabel(c)}</div>
                  <table className="data-table min-w-[720px]">
                    <thead>
                      <tr>
                        <th>Mục</th>
                        <th className="w-20">Số tiết</th>
                        <th className="w-28">Nội dung</th>
                        <th className="w-24">Dạng toán</th>
                        <th className="w-24">Câu hỏi</th>
                        <th className="w-32">Trạng thái</th>
                        <th className="w-24" />
                      </tr>
                    </thead>
                    <tbody>
                      {c.lessons.map((l) => (
                        <tr key={l.id}>
                          <td>
                            <a href={`/hoc/${book.slug}/bai/${l.slug}`} className="font-medium hover:text-tim-700 hover:underline">
                              {lessonLabel(l)}
                            </a>
                          </td>
                          <td>{l.periods}</td>
                          <td>{l.sectionCount ? `${l.sectionCount} mục` : <span className="text-ink-3">Chưa có</span>}</td>
                          <td>{l.topicCount}</td>
                          <td>{l.questionCount}</td>
                          <td>{l.status === 'published' ? <Badge tone="tre">Đã xuất bản</Badge> : <Badge tone="gray">Bản nháp</Badge>}</td>
                          <td className="text-right">
                            <a href={`/giao-vien/bai-hoc/${l.id}`} className={buttonClass('quiet', 'sm')}>
                              Soạn
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Panel>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>,
  );
}

const SECTION_KINDS = ['objective', 'knowledge', 'formula', 'example', 'note'] as const;

function SectionForm({ lessonId, s, idx }: { lessonId: number; s?: LessonSection; idx: string }) {
  return (
    <PostForm action={`/giao-vien/bai-hoc/${lessonId}`} className="space-y-3">
      <input type="hidden" name="_action" value={s ? 'update-section' : 'add-section'} />
      {s && <input type="hidden" name="section_id" value={s.id} />}
      <div className="grid gap-3 sm:grid-cols-[200px_minmax(0,1fr)]">
        <Select label="Loại" name="kind" defaultValue={s?.kind ?? 'knowledge'} options={SECTION_KINDS.map((k) => ({ value: k, label: SECTION_LABELS[k] }))} />
        <Field label="Tiêu đề (không bắt buộc)" name="title" defaultValue={s?.title ?? ''} maxLength={200} />
      </div>
      <Island
        name="RichField"
        props={{
          name: 'body',
          label: 'Nội dung',
          defaultValue: s?.body ?? '',
          initialHtml: s ? renderRich(s.body) : '',
          rows: 7,
          required: true,
          hint: 'Công thức cùng dòng \\( … \\), dòng riêng \\[ … \\]. Dòng bắt đầu bằng "- " thành danh sách. **chữ đậm**. Hình vẽ: [hinh] … [/hinh].',
        }}
        key={`body-${idx}`}
      />
      <Island
        name="RichField"
        props={{ name: 'solution', label: 'Lời giải (dùng cho Ví dụ)', defaultValue: s?.solution ?? '', initialHtml: s?.solution ? renderRich(s.solution) : '', rows: 4 }}
        key={`sol-${idx}`}
      />
      <Button>{s ? 'Lưu mục này' : 'Thêm vào bài'}</Button>
    </PostForm>
  );
}

export async function lessonEditorPage(ctx: Ctx, errors?: string[]): Promise<Res> {
  requireTeacher(ctx);
  const lesson = await getLessonById(ctx.db, intParam(ctx, 'id'));
  if (!lesson) throw new HttpError(404, 'Không tìm thấy bài học.');
  const book = await ctx.db.one<{ slug: string; title: string }>(sql`select slug, title from textbooks where id = ${lesson.textbookId}`);
  const [sections, topics] = await Promise.all([getLessonSections(ctx.db, lesson.id), getLessonTopics(ctx.db, lesson.id)]);
  const label = lessonLabel(lesson);
  return page(
    ctx,
    { title: `Soạn: ${label}`, layout: 'dashboard', section: 'curriculum', status: errors ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/chuong-trinh', label: 'Chương trình & bài học' }, { label }]}
        title={label}
        sub={`${chapterLabel({ kind: lesson.chapterKind, code: lesson.chapterCode, title: lesson.chapterTitle })} · ${LESSON_KIND_LABELS[lesson.kind]} · cập nhật ${formatDateTime(lesson.updatedAt)}`}
        actions={
          <>
            <a href={`/hoc/${book!.slug}/bai/${lesson.slug}`} className={buttonClass('secondary', 'md')}>
              Xem như học sinh
            </a>
            <a href={`/giao-vien/cau-hoi?bai=${lesson.id}`} className={buttonClass('quiet', 'md')}>
              Câu hỏi của bài
            </a>
          </>
        }
      />
      <ErrorList errors={errors} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <section>
            <h2 className="mb-3 text-lg font-extrabold">Nội dung bài học ({sections.length} mục)</h2>
            <div className="space-y-4">
              {sections.map((s, i) => (
                <Panel key={s.id} className="p-5">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge>{SECTION_LABELS[s.kind]}</Badge>
                      {s.title && <strong>{s.title}</strong>}
                    </div>
                    <div className="flex gap-1">
                      <PostForm action={`/giao-vien/bai-hoc/${lesson.id}`}>
                        <input type="hidden" name="_action" value="move-section" />
                        <input type="hidden" name="section_id" value={s.id} />
                        <input type="hidden" name="dir" value="-1" />
                        <button className={buttonClass('quiet', 'sm')} disabled={i === 0} aria-label="Đưa lên">
                          Lên
                        </button>
                      </PostForm>
                      <PostForm action={`/giao-vien/bai-hoc/${lesson.id}`}>
                        <input type="hidden" name="_action" value="move-section" />
                        <input type="hidden" name="section_id" value={s.id} />
                        <input type="hidden" name="dir" value="1" />
                        <button className={buttonClass('quiet', 'sm')} disabled={i === sections.length - 1} aria-label="Đưa xuống">
                          Xuống
                        </button>
                      </PostForm>
                      <PostForm action={`/giao-vien/bai-hoc/${lesson.id}`} confirm="Xóa mục nội dung này?">
                        <input type="hidden" name="_action" value="delete-section" />
                        <input type="hidden" name="section_id" value={s.id} />
                        <button className={buttonClass('ghost', 'sm', 'text-le hover:bg-le-soft')}>Xóa</button>
                      </PostForm>
                    </div>
                  </div>
                  <Rich src={s.body} />
                  {s.solution && (
                    <div className="mt-2 rounded-xl bg-mist px-4 py-2">
                      <div className="text-[13px] font-semibold text-ink-3">Lời giải</div>
                      <Rich src={s.solution} />
                    </div>
                  )}
                  <details className="mt-3 border-t border-line pt-3">
                    <summary className="text-[14px] font-semibold text-tim-700">Sửa mục này</summary>
                    <div className="mt-3">
                      <SectionForm lessonId={lesson.id} s={s} idx={String(s.id)} />
                    </div>
                  </details>
                </Panel>
              ))}
            </div>
          </section>
          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Thêm mục nội dung</h2>
            <SectionForm lessonId={lesson.id} idx="new" />
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Thông tin bài</h2>
            <PostForm action={`/giao-vien/bai-hoc/${lesson.id}`} className="mt-3 space-y-3">
              <input type="hidden" name="_action" value="info" />
              <Field label="Tên bài" name="title" required defaultValue={lesson.title} maxLength={200} />
              <TextArea label="Tóm tắt" name="summary" defaultValue={lesson.summary} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Số tiết" name="periods" type="number" min={0} max={20} defaultValue={lesson.periods} />
                <Field label="Thời lượng (phút)" name="minutes" type="number" min={0} max={600} defaultValue={lesson.estimatedMinutes} />
              </div>
              <Select label="Trạng thái" name="status" defaultValue={lesson.status} options={[{ value: 'published', label: 'Đã xuất bản – học sinh thấy' }, { value: 'draft', label: 'Bản nháp – chỉ giáo viên thấy' }]} />
              <Button variant="secondary">Lưu thông tin</Button>
            </PostForm>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Dạng toán ({topics.length})</h2>
            <ol className="mt-3 space-y-3">
              {topics.map((t, i) => (
                <li key={t.id} className="rounded-xl border border-line p-3">
                  <details>
                    <summary className="text-[15px]">
                      <strong>{i + 1}.</strong> {t.title}
                      <span className="block text-[12px] text-ink-3">{t.questionCount} câu hỏi · {t.method ? 'có phương pháp' : 'chưa có phương pháp'}</span>
                    </summary>
                    <PostForm action={`/giao-vien/bai-hoc/${lesson.id}`} className="mt-3 space-y-2">
                      <input type="hidden" name="_action" value="update-topic" />
                      <input type="hidden" name="topic_id" value={t.id} />
                      <Field label="Tên dạng toán" name="title" required defaultValue={t.title} maxLength={200} />
                      <TextArea label="Phương pháp giải" name="method" defaultValue={t.method} rows={3} />
                      <Button size="sm" variant="secondary">
                        Lưu
                      </Button>
                    </PostForm>
                    <PostForm action={`/giao-vien/bai-hoc/${lesson.id}`} className="mt-2" confirm="Xóa dạng toán này? Câu hỏi thuộc dạng này vẫn được giữ.">
                      <input type="hidden" name="_action" value="delete-topic" />
                      <input type="hidden" name="topic_id" value={t.id} />
                      <button className={buttonClass('ghost', 'sm', 'text-le hover:bg-le-soft')}>Xóa dạng toán</button>
                    </PostForm>
                  </details>
                </li>
              ))}
            </ol>
            <PostForm action={`/giao-vien/bai-hoc/${lesson.id}`} className="mt-4 space-y-2 border-t border-line pt-4">
              <input type="hidden" name="_action" value="add-topic" />
              <Field label="Thêm dạng toán" name="title" required maxLength={200} />
              <TextArea label="Phương pháp giải" name="method" rows={3} />
              <Button size="sm">Thêm dạng toán</Button>
            </PostForm>
          </Panel>
        </div>
      </div>
    </>,
  );
}

export async function lessonEditorAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const lessonId = intParam(ctx, 'id');
  const lesson = await getLessonById(ctx.db, lessonId);
  if (!lesson) throw new HttpError(404);
  const form = await ctx.form();
  const back = `/giao-vien/bai-hoc/${lessonId}`;
  const touch = () => ctx.db.exec(sql`update lessons set updated_at = now(), updated_by = ${user.id} where id = ${lessonId}`);
  const action = form.str('_action');

  if (action === 'info') {
    const title = form.str('title', 200);
    if (!title) return lessonEditorPage(ctx, ['Tên bài không được để trống.']);
    const periods = form.int('periods');
    const minutes = form.int('minutes');
    if ((periods !== null && (periods < 0 || periods > 20)) || (minutes !== null && (minutes < 0 || minutes > 600))) return lessonEditorPage(ctx, ['Số tiết từ 0–20, thời lượng từ 0–600 phút.']);
    await ctx.db.exec(sql`
      update lessons set title = ${title}, summary = ${form.text('summary', 1000).trim() || null}, periods = ${periods}, estimated_minutes = ${minutes},
        status = ${form.str('status') === 'draft' ? 'draft' : 'published'}, updated_at = now(), updated_by = ${user.id}
      where id = ${lessonId}`);
    return redirect(back, { type: 'success', message: 'Đã lưu thông tin bài.' }, ctx);
  }

  if (action === 'add-section' || action === 'update-section') {
    const kind = form.str('kind');
    const body = form.text('body', 20000).trim();
    const solution = form.text('solution', 20000).trim();
    const errors: string[] = [];
    if (!(SECTION_KINDS as readonly string[]).includes(kind)) errors.push('Loại mục không hợp lệ.');
    if (!body) errors.push('Nội dung không được để trống.');
    errors.push(...findMathErrors(body), ...findMathErrors(solution).map((e) => 'Lời giải: ' + e));
    if (errors.length) return lessonEditorPage(ctx, errors);
    if (action === 'add-section') {
      await ctx.db.exec(sql`
        insert into lesson_sections (lesson_id, kind, title, body, solution, sort_order)
        values (${lessonId}, ${kind}, ${form.str('title', 200) || null}, ${body}, ${solution || null},
          (select coalesce(max(sort_order), 0) + 1 from lesson_sections where lesson_id = ${lessonId}))`);
    } else {
      const n = await ctx.db.exec(sql`
        update lesson_sections set kind = ${kind}, title = ${form.str('title', 200) || null}, body = ${body}, solution = ${solution || null}
        where id = ${form.int('section_id')} and lesson_id = ${lessonId}`);
      if (!n) throw new HttpError(404);
    }
    await touch();
    return redirect(back, { type: 'success', message: action === 'add-section' ? 'Đã thêm mục nội dung.' : 'Đã lưu mục nội dung.' }, ctx);
  }

  if (action === 'delete-section') {
    await ctx.db.exec(sql`delete from lesson_sections where id = ${form.int('section_id')} and lesson_id = ${lessonId}`);
    await touch();
    return redirect(back, { type: 'success', message: 'Đã xóa mục nội dung.' }, ctx);
  }

  if (action === 'move-section') {
    const id = form.int('section_id');
    const dir = form.int('dir') === -1 ? -1 : 1;
    await ctx.db.tx(async (t) => {
      const rows = await t.many<{ id: number }>(sql`select id from lesson_sections where lesson_id = ${lessonId} order by sort_order, id`);
      const i = rows.findIndex((r) => r.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= rows.length) return;
      [rows[i], rows[j]] = [rows[j], rows[i]];
      for (const [k, r] of rows.entries()) await t.exec(sql`update lesson_sections set sort_order = ${k + 1} where id = ${r.id}`);
    });
    await touch();
    return redirect(back);
  }

  if (action === 'add-topic' || action === 'update-topic') {
    const title = form.str('title', 200);
    if (!title) return lessonEditorPage(ctx, ['Tên dạng toán không được để trống.']);
    const method = form.text('method', 4000).trim() || null;
    if (action === 'add-topic') {
      await ctx.db.exec(sql`
        insert into topics (lesson_id, title, method, sort_order)
        values (${lessonId}, ${title}, ${method}, (select coalesce(max(sort_order), 0) + 1 from topics where lesson_id = ${lessonId}))`);
    } else {
      await ctx.db.exec(sql`update topics set title = ${title}, method = ${method} where id = ${form.int('topic_id')} and lesson_id = ${lessonId}`);
    }
    await touch();
    return redirect(back, { type: 'success', message: 'Đã lưu dạng toán.' }, ctx);
  }

  if (action === 'delete-topic') {
    await ctx.db.exec(sql`delete from topics where id = ${form.int('topic_id')} and lesson_id = ${lessonId}`);
    await touch();
    return redirect(back, { type: 'success', message: 'Đã xóa dạng toán.' }, ctx);
  }

  throw new HttpError(400, 'Thao tác không hợp lệ.');
}
