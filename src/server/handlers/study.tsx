/**
 * Tính năng hỗ trợ học sinh (giai đoạn 3): xem nhanh công thức, công thức yêu thích, góc học tập
 * (bài yêu thích, ghi chú, ví dụ đã xem), tìm kiếm kiến thức, ghi nhận ví dụ đã xem lời giải.
 */
import { LuSearch } from 'react-icons/lu';
import { HttpError, json, redirect, safeNext, type Ctx, type Res } from '../http/context';
import { page } from '../http/render';
import { DEFAULT_BOOK, intParam, requireBook } from './common';
import { requireUser } from '../auth/guards';
import {
  buildSearchEntries,
  getBookFormulas,
  getFavoriteFormulaIds,
  getFavoriteLessons,
  getNotes,
  getViewedExamples,
  markExampleViewed,
  toggleFormulaFavorite,
  type BookFormula,
} from '../../domain/lesson-content';
import { FormulaCard } from '../../ui/components/lesson-v3';
import { LevelBadges } from '../../ui/components/knowledge';
import { EmptyState, Notice, PageTitle, Panel, PostForm, buttonClass, cx, inputClass } from '../../ui/components/ui';
import { SEARCH_KIND_LABELS, searchEntries, type SearchEntry, type SearchKind } from '../../shared/search';
import { formatDate } from '../../shared/labels';
import { plainExcerpt } from '../../shared/richtext';
import { sql } from '../db';

/** Gom công thức theo chương → bài (trang Xem nhanh công thức, Góc học tập). */
function byChapterLesson(formulas: BookFormula[]) {
  const chapters: { label: string; lessons: { slug: string; label: string; items: BookFormula[] }[] }[] = [];
  for (const f of formulas) {
    let c = chapters.find((x) => x.label === f.chapterLabel);
    if (!c) chapters.push((c = { label: f.chapterLabel, lessons: [] }));
    let l = c.lessons.find((x) => x.slug === f.lessonSlug);
    if (!l) c.lessons.push((l = { slug: f.lessonSlug, label: f.lessonLabel, items: [] }));
    l.items.push(f);
  }
  return chapters;
}

function FavButton({ id, on, next }: { id: number; on: boolean; next: string }) {
  return (
    <PostForm action={`/cong-thuc/${id}/yeu-thich`}>
      <input type="hidden" name="next" value={next} />
      <button className="fav-btn" aria-pressed={on} title={on ? 'Bỏ khỏi công thức yêu thích' : 'Lưu vào công thức yêu thích'}>
        {on ? '★' : '☆'}
      </button>
    </PostForm>
  );
}

// ---------------- /cong-thuc ----------------

export async function formulasPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx, DEFAULT_BOOK);
  const [formulas, favs] = await Promise.all([getBookFormulas(ctx.db, book.id), ctx.user ? getFavoriteFormulaIds(ctx.db, ctx.user.id) : Promise.resolve(new Set<number>())]);
  const chapters = byChapterLesson(formulas);
  return page(
    ctx,
    { title: 'Công thức cần nhớ – Toán 8', description: 'Xem nhanh mọi công thức Toán 8 theo chương, bài; lưu công thức yêu thích để ôn tập.' },
    <>
      <PageTitle
        crumbs={[{ href: `/hoc/${book.slug}`, label: book.title }, { label: 'Công thức cần nhớ' }]}
        title="Công thức cần nhớ"
        sub={`${formulas.length} công thức của ${book.title}, xếp theo chương và bài. Gõ từ khóa để lọc nhanh${ctx.user ? ', bấm ☆ để lưu công thức yêu thích' : ''}.`}
      />
      <div className="no-print sticky top-16 z-10 -mx-1 mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 backdrop-blur">
        <label className="flex min-w-[220px] flex-1 items-center gap-2">
          <span className="sr-only">Lọc công thức</span>
          <input type="search" data-formula-filter placeholder="Lọc: hằng đẳng thức, diện tích, xác suất…" className={cx(inputClass, 'py-2')} />
        </label>
        {ctx.user && (
          <label className="flex items-center gap-2 text-[14.5px]">
            <input type="checkbox" data-formula-favonly className="h-4 w-4 accent-tim-700" /> Chỉ công thức yêu thích ({favs.size})
          </label>
        )}
        <span data-formula-count className="text-[13.5px] text-ink-3">
          {formulas.length} công thức
        </span>
      </div>
      {!formulas.length && <EmptyState title="Chưa có công thức">Giáo viên thêm công thức trong trình soạn bài học.</EmptyState>}
      <div className="space-y-10">
        {chapters.map((c) => (
          <section key={c.label} data-formula-group>
            <h2 className="mb-4 text-[22px] font-extrabold tracking-tight">{c.label}</h2>
            <div className="space-y-6">
              {c.lessons.map((l) => (
                <div key={l.slug} data-formula-group>
                  <h3 className="mb-3 text-[16px] font-extrabold">
                    <a href={`/hoc/${book.slug}/bai/${l.slug}#cong-thuc`} className="text-tim-800 hover:underline">
                      {l.label}
                    </a>
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {l.items.map((f) => (
                      <div key={f.id} data-fav={favs.has(f.id) ? '1' : '0'} className="contents">
                        <FormulaCard f={f} context={f.groupTitle || undefined} fav={ctx.user ? <FavButton id={f.id} on={favs.has(f.id)} next={`/cong-thuc#ct-${f.id}`} /> : undefined} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>,
  );
}

export async function toggleFormulaFavoriteAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const id = intParam(ctx, 'id');
  if (!(await ctx.db.one(sql`select 1 from formulas where id = ${id}`))) throw new HttpError(404);
  const form = await ctx.form();
  const on = await toggleFormulaFavorite(ctx.db, user.id, id);
  return redirect(safeNext(form.str('next', 300), '/cong-thuc'), { type: 'success', message: on ? 'Đã lưu vào công thức yêu thích.' : 'Đã bỏ khỏi công thức yêu thích.' }, ctx);
}

// ---------------- /goc-hoc-tap ----------------

export async function studyCornerPage(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx, DEFAULT_BOOK);
  const [lessons, notes, examples, favIds, formulas] = await Promise.all([
    getFavoriteLessons(ctx.db, user.id),
    getNotes(ctx.db, user.id),
    getViewedExamples(ctx.db, user.id, 40),
    getFavoriteFormulaIds(ctx.db, user.id),
    getBookFormulas(ctx.db, book.id),
  ]);
  const favFormulas = formulas.filter((f) => favIds.has(f.id));
  const lessonHref = (slug: string) => `/hoc/${book.slug}/bai/${slug}`;
  return page(
    ctx,
    { title: 'Góc học tập của em' },
    <>
      <PageTitle title="Góc học tập của em" sub="Bài học và công thức em đã lưu, ghi chú cá nhân và các ví dụ em đã xem lời giải – để ôn lại nhanh." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <h2 className="mb-3 text-lg font-extrabold">★ Bài học yêu thích ({lessons.length})</h2>
          {lessons.length ? (
            <ul className="divide-y divide-line">
              {lessons.map((l) => (
                <li key={l.lessonId} className="py-2">
                  <a href={lessonHref(l.slug)} className="font-semibold text-tim-800 hover:underline">
                    {l.label}
                  </a>
                  <div className="text-[13px] text-ink-3">{l.chapterLabel}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-ink-2">Chưa có. Bấm "Lưu bài yêu thích" ở đầu mỗi bài học.</p>
          )}
        </Panel>
        <Panel className="p-5">
          <h2 className="mb-3 text-lg font-extrabold">Ghi chú của em ({notes.length})</h2>
          {notes.length ? (
            <ul className="space-y-3">
              {notes.map((n) => (
                <li key={n.lessonId} className="rounded-xl bg-mist px-4 py-3">
                  <a href={`${lessonHref(n.slug)}#ghi-chu`} className="font-semibold text-tim-800 hover:underline">
                    {n.label}
                  </a>
                  <p className="mt-1 whitespace-pre-line text-[14.5px] text-ink-2">{n.body.length > 280 ? n.body.slice(0, 279) + '…' : n.body}</p>
                  <div className="mt-1 text-[12px] text-ink-3">{formatDate(n.updatedAt)}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-ink-2">Chưa có ghi chú. Mỗi bài học có ô "Ghi chú của em" ở cuối bài.</p>
          )}
        </Panel>
      </div>
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-extrabold">☆ Công thức yêu thích ({favFormulas.length})</h2>
        {favFormulas.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {favFormulas.map((f) => (
              <FormulaCard key={f.id} f={f} context={<a href={`${lessonHref(f.lessonSlug)}#ct-${f.id}`} className="hover:underline">{f.lessonLabel}</a>} fav={<FavButton id={f.id} on next="/goc-hoc-tap" />} />
            ))}
          </div>
        ) : (
          <p className="text-[15px] text-ink-2">
            Chưa có. Mở <a href="/cong-thuc" className="font-semibold text-tim-700 underline">Công thức cần nhớ</a> và bấm ☆ ở công thức em hay dùng.
          </p>
        )}
      </section>
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-extrabold">Ví dụ em đã xem lời giải ({examples.length})</h2>
        {examples.length ? (
          <Panel className="divide-y divide-line">
            {examples.map((e) => (
              <a key={e.exampleId} href={`${lessonHref(e.slug)}/dang/${e.topicKey}#vd-${e.exampleId}`} className="block px-5 py-3 hover:bg-tim-50/60">
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-ink-3">
                  <LevelBadges levels={[e.level]} /> {e.topicTitle} · {e.label} · {formatDate(e.viewedAt)}
                </div>
                <div className="mt-0.5 text-[15px]">{plainExcerpt(e.problem, 160)}</div>
              </a>
            ))}
          </Panel>
        ) : (
          <p className="text-[15px] text-ink-2">Khi em mở hết lời giải từng bước của một ví dụ, ví dụ đó sẽ được lưu ở đây để xem lại.</p>
        )}
      </section>
    </>,
  );
}

/** Ghi nhận học sinh đã xem hết lời giải của một ví dụ (gọi từ trình duyệt). */
export async function exampleViewedApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ ok: false }, 200);
  await markExampleViewed(ctx.db, ctx.user.id, intParam(ctx, 'id'));
  return json({ ok: true });
}

// ---------------- /tim-kiem ----------------

let cache: { at: number; bookId: number; entries: SearchEntry[] } | null = null;

export async function searchPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx, DEFAULT_BOOK);
  const q = (ctx.query.get('q') ?? '').slice(0, 100).trim();
  if (!cache || cache.bookId !== book.id || Date.now() - cache.at > 120_000) {
    cache = {
      at: Date.now(),
      bookId: book.id,
      entries: await buildSearchEntries(ctx.db, book.id, { lesson: (slug) => `/hoc/${book.slug}/bai/${slug}`, topic: (slug, key) => `/hoc/${book.slug}/bai/${slug}/dang/${key}` }),
    };
  }
  const results = q ? searchEntries(cache.entries, q, 80) : [];
  const kinds = (['lesson', 'topic', 'formula', 'theory', 'example'] as SearchKind[]).filter((k) => results.some((r) => r.kind === k));
  return page(
    ctx,
    { title: q ? `Tìm: ${q}` : 'Tìm kiếm kiến thức' },
    <>
      <PageTitle title="Tìm kiếm kiến thức" sub="Tìm bài học, mục kiến thức, công thức, dạng toán và ví dụ. Gõ có dấu hay không dấu đều được." />
      <form action="/tim-kiem" method="get" className="mb-6 flex max-w-2xl gap-2" role="search">
        <label htmlFor="q" className="sr-only">
          Từ khóa
        </label>
        <input id="q" name="q" type="search" defaultValue={q} autoFocus placeholder="Ví dụ: hằng đẳng thức, hình bình hành, xác suất…" className={cx(inputClass, 'flex-1')} />
        <button className={buttonClass('primary', 'md')}>
          <LuSearch aria-hidden="true" /> Tìm
        </button>
      </form>
      {q && !results.length && <Notice tone="info">Không tìm thấy kết quả cho "{q}". Thử từ khóa ngắn hơn hoặc từ khác.</Notice>}
      {q && results.length > 0 && <p className="mb-4 text-[14.5px] text-ink-3">{results.length} kết quả{results.length >= 80 ? ' (hiện 80 kết quả đầu)' : ''}.</p>}
      <div className="space-y-8">
        {kinds.map((k) => (
          <section key={k}>
            <h2 className="mb-2 text-lg font-extrabold">{SEARCH_KIND_LABELS[k]}</h2>
            <Panel className="divide-y divide-line">
              {results
                .filter((r) => r.kind === k)
                .map((r, i) => (
                  <a key={i} href={r.href} className="block px-5 py-3 hover:bg-tim-50/60">
                    <div className="font-semibold text-tim-800">{r.title}</div>
                    <div className="text-[13px] text-ink-3">{r.context}</div>
                    {r.snippet && <div className="mt-0.5 text-[14.5px] text-ink-2">{r.snippet}</div>}
                  </a>
                ))}
            </Panel>
          </section>
        ))}
      </div>
      {!q && (
        <Panel className="p-5">
          <h2 className="mb-2 font-extrabold">Gợi ý tìm kiếm</h2>
          <div className="flex flex-wrap gap-2">
            {['hằng đẳng thức', 'phân tích đa thức thành nhân tử', 'hình bình hành', 'định lí Thalès', 'đường trung bình', 'phân thức', 'phương trình bậc nhất', 'hệ số góc', 'xác suất', 'tam giác đồng dạng', 'Pythagore', 'hình chóp'].map((t) => (
              <a key={t} href={`/tim-kiem?q=${encodeURIComponent(t)}`} className="rounded-full border border-line px-3 py-1.5 text-[14px] hover:border-tim-300 hover:text-tim-800">
                {t}
              </a>
            ))}
          </div>
        </Panel>
      )}
    </>,
  );
}
