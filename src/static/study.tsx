/**
 * Bản HTML – tính năng học tập giai đoạn 3 lưu trong trình duyệt: bài/công thức yêu thích, ghi chú theo bài,
 * ví dụ đã xem lời giải, Góc học tập và Tìm kiếm kiến thức.
 */
import { useState } from 'react';
import { enhanceExampleChips, enhanceExamples, enhanceFormulaFilter, enhanceToc } from '../client/lesson-enhance';
import { SEARCH_KIND_LABELS, searchEntries, type SearchEntry, type SearchKind } from '../shared/search';
import { load, markExample, saveNote, toggleFavFormula, toggleFavLesson } from './store';

declare global {
  interface Window {
    ML_CORNER?: { examples: Record<string, { href: string; title: string; text: string }>; formulas: Record<string, { href: string; name: string; lesson: string; html: string }> };
    ML_SEARCH?: SearchEntry[];
  }
}

/** Đường dẫn tương đối từ trang hiện tại về gốc bản HTML. */
function rootPrefix(): string {
  const css = document.querySelector<HTMLLinkElement>('link[href$="assets/app.css"]')?.getAttribute('href') ?? 'assets/app.css';
  return css.replace(/assets\/app\.css$/, '');
}

function paintLessonFav(b: HTMLButtonElement, on: boolean) {
  b.setAttribute('aria-pressed', String(on));
  const label = b.querySelector('[data-fav-label]');
  if (label) label.textContent = on ? 'Bỏ yêu thích' : 'Lưu bài yêu thích';
  b.querySelector('svg')?.classList.toggle('fill-current', on);
}

function paintFormulaFav(b: HTMLButtonElement, on: boolean) {
  b.setAttribute('aria-pressed', String(on));
  b.textContent = on ? '★' : '☆';
  b.title = on ? 'Bỏ khỏi công thức yêu thích' : 'Lưu vào công thức yêu thích';
}

export function initStudyFeatures() {
  const s = load();
  document.querySelectorAll<HTMLButtonElement>('[data-fav-lesson]').forEach((b) => {
    const slug = b.dataset.favLesson!;
    paintLessonFav(b, !!s.favLessons[slug]);
    b.addEventListener('click', () => paintLessonFav(b, toggleFavLesson(slug)));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-fav-formula]').forEach((b) => {
    const id = Number(b.dataset.favFormula);
    paintFormulaFav(b, !!s.favFormulas[String(id)]);
    b.addEventListener('click', () => {
      paintFormulaFav(b, toggleFavFormula(id));
      document.querySelector<HTMLInputElement>('[data-formula-favonly]')?.dispatchEvent(new Event('change'));
    });
  });
  document.querySelectorAll<HTMLTextAreaElement>('textarea[data-note]').forEach((ta) => {
    const slug = ta.dataset.note!;
    const status = ta.parentElement?.querySelector<HTMLElement>('[data-note-status]');
    ta.value = s.notes[slug]?.body ?? '';
    let timer: number | undefined;
    ta.addEventListener('input', () => {
      if (status) status.textContent = 'Đang lưu…';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        saveNote(slug, ta.value);
        if (status) status.textContent = ta.value.trim() ? `Đã lưu lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} (trong trình duyệt này).` : 'Ghi chú trống – đã xóa.';
      }, 500);
    });
  });
  document.querySelectorAll<HTMLElement>('[data-example]').forEach((a) => {
    if (s.examples[a.dataset.example!]) {
      const badge = a.querySelector<HTMLElement>('[data-viewed-badge]');
      if (badge) badge.hidden = false;
    }
  });
  enhanceExamples((id) => markExample(id));
  enhanceToc();
  enhanceExampleChips();
  enhanceFormulaFilter((id) => !!load().favFormulas[String(id)]);
  if (location.search.includes('yeu-thich')) {
    const fav = document.querySelector<HTMLInputElement>('[data-formula-favonly]');
    if (fav) {
      fav.checked = true;
      fav.dispatchEvent(new Event('change'));
    }
  }
}

// ---------------- Góc học tập ----------------

export function StudyCorner() {
  const s = load();
  const data = window.ML_DATA;
  const corner = window.ML_CORNER ?? { examples: {}, formulas: {} };
  const R = rootPrefix();
  const lessonOf = (slug: string) => data?.lessons.find((l) => l.slug === slug);
  const favLessons = Object.entries(s.favLessons).sort((a, b) => b[1].localeCompare(a[1]));
  const notes = Object.entries(s.notes).sort((a, b) => b[1].t.localeCompare(a[1].t));
  const favFormulas = Object.keys(s.favFormulas).filter((id) => corner.formulas[id]);
  const viewed = Object.entries(s.examples)
    .filter(([id]) => corner.examples[id])
    .sort((a, b) => b[1].localeCompare(a[1]))
    .slice(0, 40);
  const box = 'rounded-[18px] border border-line bg-white p-5';
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className={box}>
          <h2 className="mb-3 text-lg font-extrabold">★ Bài học yêu thích ({favLessons.length})</h2>
          {favLessons.length ? (
            <ul className="divide-y divide-line">
              {favLessons.map(([slug]) => (
                <li key={slug} className="py-2">
                  <a href={`${R}bai/${slug}.html`} className="font-semibold text-tim-800 hover:underline">
                    {lessonOf(slug)?.label ?? slug}
                  </a>
                  <div className="text-[13px] text-ink-3">{lessonOf(slug)?.chapter}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-ink-2">Chưa có. Bấm "Lưu bài yêu thích" ở đầu mỗi bài học.</p>
          )}
        </section>
        <section className={box}>
          <h2 className="mb-3 text-lg font-extrabold">Ghi chú của em ({notes.length})</h2>
          {notes.length ? (
            <ul className="space-y-3">
              {notes.map(([slug, n]) => (
                <li key={slug} className="rounded-xl bg-mist px-4 py-3">
                  <a href={`${R}bai/${slug}.html#ghi-chu`} className="font-semibold text-tim-800 hover:underline">
                    {lessonOf(slug)?.label ?? slug}
                  </a>
                  <p className="mt-1 whitespace-pre-line text-[14.5px] text-ink-2">{n.body.length > 280 ? n.body.slice(0, 279) + '…' : n.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-ink-2">Chưa có ghi chú. Mỗi bài học có ô "Ghi chú của em" ở cuối bài.</p>
          )}
        </section>
      </div>
      <section>
        <h2 className="mb-3 text-lg font-extrabold">☆ Công thức yêu thích ({favFormulas.length})</h2>
        {favFormulas.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {favFormulas.map((id) => {
              const f = corner.formulas[id];
              return (
                <a key={id} href={`${R}${f.href}`} className="block rounded-[16px] border border-line bg-white px-4 py-3 hover:border-tim-300">
                  <div className="text-[13px] text-ink-3">{f.lesson}</div>
                  <div className="font-bold text-tim-800">{f.name}</div>
                  <div className="prose-math mt-1 overflow-x-auto" dangerouslySetInnerHTML={{ __html: f.html }} />
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-[15px] text-ink-2">
            Chưa có. Mở{' '}
            <a href={`${R}cong-thuc.html`} className="font-semibold text-tim-700 underline">
              Công thức cần nhớ
            </a>{' '}
            và bấm ☆ ở công thức em hay dùng.
          </p>
        )}
      </section>
      <section>
        <h2 className="mb-3 text-lg font-extrabold">Ví dụ em đã xem lời giải ({viewed.length})</h2>
        {viewed.length ? (
          <div className="divide-y divide-line rounded-[18px] border border-line bg-white">
            {viewed.map(([id]) => {
              const e = corner.examples[id];
              return (
                <a key={id} href={`${R}${e.href}`} className="block px-5 py-3 hover:bg-tim-50/60">
                  <div className="text-[13px] text-ink-3">{e.title}</div>
                  <div className="mt-0.5 text-[15px]">{e.text}</div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-[15px] text-ink-2">Khi em mở hết lời giải từng bước của một ví dụ, ví dụ đó sẽ được lưu ở đây để xem lại.</p>
        )}
      </section>
    </div>
  );
}

// ---------------- Tìm kiếm ----------------

const SUGGEST = ['hằng đẳng thức', 'phân tích đa thức thành nhân tử', 'hình bình hành', 'định lí Thalès', 'đường trung bình', 'phân thức', 'phương trình bậc nhất', 'hệ số góc', 'xác suất', 'tam giác đồng dạng', 'Pythagore', 'hình chóp'];

export function SearchPanel() {
  const initial = new URLSearchParams(location.search).get('q') ?? '';
  const [q, setQ] = useState(initial);
  const entries = window.ML_SEARCH ?? [];
  const R = rootPrefix();
  const results: SearchEntry[] = q.trim() ? searchEntries(entries, q, 80) : [];
  const kinds = (['lesson', 'topic', 'formula', 'theory', 'example'] as SearchKind[]).filter((k) => results.some((r) => r.kind === k));
  return (
    <div>
      <form
        role="search"
        className="mb-6 flex max-w-2xl gap-2"
        onSubmit={(e: Event) => {
          e.preventDefault();
          history.replaceState(null, '', `?q=${encodeURIComponent(q)}`);
        }}
      >
        <label htmlFor="q" className="sr-only">
          Từ khóa
        </label>
        <input
          id="q"
          type="search"
          value={q}
          autoFocus
          onChange={(e: { target: HTMLInputElement }) => setQ(e.target.value)}
          placeholder="Ví dụ: hằng đẳng thức, hình bình hành, xác suất…"
          className="w-full flex-1 rounded-xl border border-line-2 bg-white px-4 py-2.5 text-[16px] outline-none focus:border-tim-500 focus:ring-2 focus:ring-tim-200"
        />
      </form>
      {q.trim() && !results.length && <p className="rounded-xl bg-tim-50 px-4 py-3 text-[15px]">Không tìm thấy kết quả cho "{q}". Thử từ khóa ngắn hơn hoặc từ khác.</p>}
      {results.length > 0 && <p className="mb-4 text-[14.5px] text-ink-3">{results.length} kết quả{results.length >= 80 ? ' (hiện 80 kết quả đầu)' : ''}.</p>}
      <div className="space-y-8">
        {kinds.map((k) => (
          <section key={k}>
            <h2 className="mb-2 text-lg font-extrabold">{SEARCH_KIND_LABELS[k]}</h2>
            <div className="divide-y divide-line rounded-[18px] border border-line bg-white">
              {results
                .filter((r) => r.kind === k)
                .map((r, i) => (
                  <a key={i} href={`${R}${r.href}`} className="block px-5 py-3 hover:bg-tim-50/60">
                    <div className="font-semibold text-tim-800">{r.title}</div>
                    <div className="text-[13px] text-ink-3">{r.context}</div>
                    {r.snippet && <div className="mt-0.5 text-[14.5px] text-ink-2">{r.snippet}</div>}
                  </a>
                ))}
            </div>
          </section>
        ))}
      </div>
      {!q.trim() && (
        <div className="rounded-[18px] border border-line bg-white p-5">
          <h2 className="mb-2 font-extrabold">Gợi ý tìm kiếm</h2>
          <div className="flex flex-wrap gap-2">
            {SUGGEST.map((t) => (
              <button key={t} type="button" onClick={() => setQ(t)} className="rounded-full border border-line px-3 py-1.5 text-[14px] hover:border-tim-300 hover:text-tim-800">
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
