// Mã trình duyệt của bản HTML ngoại tuyến (một tệp, chạy được khi mở bằng file://).
import type { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import LocalPractice from './LocalPractice';
import { ContinuePanel, LessonComplete, ProgressPage, StatsPanel } from './panels';
import { load, markViewed } from './store';
import { SearchPanel, StudyCorner, initStudyFeatures } from './study';
import type { OfflinePractice } from './types';

function readJson<T>(id: string): T | null {
  const el = document.getElementById(id);
  if (!el?.textContent) return null;
  try {
    return JSON.parse(el.textContent) as T;
  } catch {
    return null;
  }
}

function mount(selector: string, render: (el: HTMLElement) => ReactElement | null) {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const node = render(el);
    if (node) createRoot(el).render(node);
  });
}

// Đánh dấu trạng thái bài trong mục lục / thanh bên / tiến độ chương
function decorate() {
  const s = load();
  document.querySelectorAll<HTMLElement>('[data-ls]').forEach((el) => {
    const slug = el.dataset.ls!;
    el.classList.toggle('is-done', !!s.completed[slug]);
    el.classList.toggle('is-progress', !s.completed[slug] && !!s.viewed[slug]);
    el.setAttribute('aria-label', s.completed[slug] ? 'Đã học xong' : s.viewed[slug] ? 'Đang học' : 'Chưa học');
  });
  document.querySelectorAll<HTMLElement>('[data-cp]').forEach((el) => {
    const slugs = (el.dataset.cp ?? '').split(',').filter(Boolean);
    const done = slugs.filter((x) => s.completed[x]).length;
    const bar = el.querySelector<HTMLElement>('.bar > span');
    const text = el.querySelector<HTMLElement>('[data-cp-text]');
    if (bar) bar.style.width = `${slugs.length ? Math.round((done / slugs.length) * 100) : 0}%`;
    if (text) text.textContent = `${done}/${slugs.length} mục đã học xong`;
    el.hidden = false;
  });
}

const lessonSlug = document.body.dataset.lesson;
if (lessonSlug) markViewed(lessonSlug);
decorate();
window.addEventListener('ml-progress', decorate);

mount('[data-local-practice]', (el) => {
  const data = readJson<OfflinePractice>(el.dataset.localPractice!);
  const lessonOf = readJson<Record<number, string>>(el.dataset.lessonOf ?? '') ?? undefined;
  return data ? <LocalPractice data={data} lessonOf={lessonOf} /> : null;
});
mount('[data-panel=continue]', () => <ContinuePanel />);
mount('[data-panel=stats]', () => <StatsPanel />);
mount('[data-panel=progress]', () => <ProgressPage />);
mount('[data-panel=complete]', (el) => <LessonComplete slug={el.dataset.slug!} />);
mount('[data-panel=corner]', () => <StudyCorner />);
mount('[data-panel=search]', () => <SearchPanel />);
initStudyFeatures();

// Chế độ trình chiếu
const PRESENT_KEY = 'ml-present';
function applyPresent(on: boolean) {
  document.documentElement.classList.toggle('present', on);
  document.querySelectorAll<HTMLButtonElement>('[data-present-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(on));
    const label = b.querySelector('[data-present-label]');
    if (label) label.textContent = on ? 'Thoát trình chiếu' : 'Trình chiếu';
  });
}
try {
  if (document.querySelector('[data-present-toggle]')) applyPresent(localStorage.getItem(PRESENT_KEY) === '1');
} catch {
  /* bộ nhớ trình duyệt bị chặn */
}
document.querySelectorAll<HTMLButtonElement>('[data-present-toggle]').forEach((b) => {
  b.addEventListener('click', () => {
    const on = !document.documentElement.classList.contains('present');
    applyPresent(on);
    try {
      localStorage.setItem(PRESENT_KEY, on ? '1' : '0');
    } catch {
      /* bỏ qua */
    }
    if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => undefined);
    if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
  });
});

// Menu thả xuống trên điện thoại: đóng khi bấm ra ngoài
document.addEventListener('click', (e) => {
  document.querySelectorAll<HTMLDetailsElement>('details[data-menu][open]').forEach((d) => {
    if (!d.contains(e.target as Node)) d.open = false;
  });
});
