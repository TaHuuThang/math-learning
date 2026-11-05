/**
 * Tương tác nhỏ cho trang bài học / dạng toán (dùng chung bản máy chủ và bản HTML):
 *  - "Lời giải từng bước": mở ra chỉ hiện bước 1, bấm "Bước tiếp theo" để xem dần; xem hết mới hiện kết luận, mẹo.
 *  - Mục lục bài học: tô đậm mục đang đọc.
 *  - Lọc công thức theo từ khóa / chỉ công thức yêu thích (trang Công thức).
 */
import { foldVi } from '../shared/search';

export function enhanceExamples(onViewed: (id: number) => void) {
  document.querySelectorAll<HTMLDetailsElement>('details[data-steps-root]').forEach((d) => {
    const article = d.closest<HTMLElement>('[data-example]');
    const id = Number(article?.dataset.example);
    const steps = [...d.querySelectorAll<HTMLElement>('[data-step]')];
    const after = [...d.querySelectorAll<HTMLElement>('[data-after-steps]')];
    const next = d.querySelector<HTMLButtonElement>('[data-step-next]');
    const all = d.querySelector<HTMLButtonElement>('[data-step-all]');
    const reset = d.querySelector<HTMLButtonElement>('[data-step-reset]');
    if (!steps.length || !next || !all || !reset) return;
    let shown = 0;
    let reported = false;
    const render = () => {
      steps.forEach((s, i) => (s.hidden = i >= shown));
      const done = shown >= steps.length;
      after.forEach((a) => (a.hidden = !done));
      next.hidden = done;
      all.hidden = done;
      reset.hidden = !done;
      next.textContent = `Bước tiếp theo (${Math.min(shown + 1, steps.length)}/${steps.length})`;
      if (done && !reported && id) {
        reported = true;
        const badge = article?.querySelector<HTMLElement>('[data-viewed-badge]');
        if (badge) badge.hidden = false;
        onViewed(id);
      }
    };
    d.addEventListener('toggle', () => {
      if (d.open && shown === 0) {
        shown = 1;
        render();
      }
    });
    next.addEventListener('click', () => {
      shown++;
      render();
      steps[shown - 1]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    all.addEventListener('click', () => {
      shown = steps.length;
      render();
    });
    reset.addEventListener('click', () => {
      shown = 1;
      reported = true;
      render();
    });
    // Trước khi mở: ẩn sẵn để khi mở không bị nháy
    shown = 0;
    steps.forEach((s, i) => (s.hidden = i > 0));
    after.forEach((a) => (a.hidden = true));
  });
}

/** Tô đậm mục đang đọc trong mục lục bài học. */
export function enhanceToc() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const targets = links.map((a) => document.getElementById(a.dataset.tocLink!)).filter((x): x is HTMLElement => !!x);
  const obs = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        links.forEach((a) => a.classList.toggle('toc-active', a.dataset.tocLink === en.target.id));
      }
    },
    { rootMargin: '-20% 0px -70% 0px' },
  );
  targets.forEach((t) => obs.observe(t));
}

/** Lọc thẻ công thức: ô tìm [data-formula-filter], ô "chỉ yêu thích" [data-formula-favonly]. */
export function enhanceFormulaFilter(isFavorite: (id: number) => boolean) {
  const input = document.querySelector<HTMLInputElement>('[data-formula-filter]');
  const favOnly = document.querySelector<HTMLInputElement>('[data-formula-favonly]');
  if (!input && !favOnly) return;
  const cards = [...document.querySelectorAll<HTMLElement>('[data-formula]')];
  const groups = [...document.querySelectorAll<HTMLElement>('[data-formula-group]')];
  const count = document.querySelector<HTMLElement>('[data-formula-count]');
  const apply = () => {
    const words = foldVi(input?.value ?? '').split(/\s+/).filter(Boolean);
    let n = 0;
    for (const c of cards) {
      const text = c.dataset.formulaText ?? '';
      const ok = words.every((w) => text.includes(w)) && (!favOnly?.checked || isFavorite(Number(c.dataset.formula)));
      c.hidden = !ok;
      if (ok) n++;
    }
    for (const g of groups) g.hidden = ![...g.querySelectorAll<HTMLElement>('[data-formula]')].some((c) => !c.hidden);
    if (count) count.textContent = `${n} công thức`;
  };
  input?.addEventListener('input', apply);
  favOnly?.addEventListener('change', apply);
  apply();
}

/** Chuyển nhanh giữa các dạng toán trong mục "Ví dụ minh họa": chỉ hiện ví dụ của dạng được chọn. */
export function enhanceExampleChips() {
  const nav = document.querySelector<HTMLElement>('[data-ex-chips]');
  if (!nav) return;
  const chips = [...nav.querySelectorAll<HTMLAnchorElement>('[data-ex-chip]')];
  const groups = [...document.querySelectorAll<HTMLElement>('[data-ex-group]')];
  const select = (key: string) => {
    chips.forEach((c) => c.classList.toggle('ex-chip-on', c.dataset.exChip === key));
    groups.forEach((g) => (g.hidden = key !== 'all' && g.dataset.exGroup !== key));
  };
  chips.forEach((c) =>
    c.addEventListener('click', (e) => {
      e.preventDefault();
      select(c.dataset.exChip!);
      nav.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }),
  );
  // Mở thẳng một ví dụ (#vd-…) hoặc một nhóm (#vdg-…) từ liên kết
  const hash = location.hash.slice(1);
  const target = hash ? document.getElementById(hash) : null;
  const group = target?.closest<HTMLElement>('[data-ex-group]');
  if (group) select(group.dataset.exGroup!);
}
