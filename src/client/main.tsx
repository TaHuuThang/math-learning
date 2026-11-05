import type { ReactElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { islands, type IslandName } from '../islands/registry';
import { csrfToken } from '../islands/shared';
import { enhanceExampleChips, enhanceExamples, enhanceFormulaFilter, enhanceToc } from './lesson-enhance';

// Gắn React cho các "đảo" tương tác do máy chủ dựng sẵn
document.querySelectorAll<HTMLElement>('[data-island]').forEach((el) => {
  const name = el.dataset.island as IslandName;
  const Comp = islands[name] as unknown as (p: Record<string, unknown>) => ReactElement;
  if (!Comp) return;
  let props: Record<string, unknown> = {};
  try {
    props = JSON.parse(el.dataset.props ?? '{}');
  } catch {
    return;
  }
  hydrateRoot(el, <Comp {...props} />);
});

// Hỏi xác nhận trước khi gửi biểu mẫu nguy hiểm (xóa, khóa…)
document.addEventListener('submit', (e) => {
  const form = e.target as HTMLFormElement;
  const msg = form.dataset.confirm;
  if (msg && !window.confirm(msg)) e.preventDefault();
});

// Bộ lọc tự gửi khi đổi lựa chọn
document.querySelectorAll<HTMLSelectElement>('select[data-autosubmit]').forEach((s) => {
  s.addEventListener('change', () => s.form?.requestSubmit());
});

// Đóng menu thả xuống khi bấm ra ngoài
document.addEventListener('click', (e) => {
  document.querySelectorAll<HTMLDetailsElement>('details[data-menu][open]').forEach((d) => {
    if (!d.contains(e.target as Node)) d.open = false;
  });
});

// Chế độ trình chiếu (chữ to, ẩn thanh bên) – nhớ theo trình duyệt
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

// Sao chép (mã lớp, mật khẩu tạm)
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((b) => {
  b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy ?? '');
      const old = b.textContent;
      b.textContent = 'Đã sao chép';
      setTimeout(() => (b.textContent = old), 1500);
    } catch {
      /* trình duyệt không cho phép */
    }
  });
});

// Giai đoạn 3: lời giải từng bước, mục lục bài học, lọc công thức
enhanceExamples((id) => {
  if (!document.querySelector('meta[name="ml-user"]')) return;
  fetch(`/api/vi-du/${id}/da-xem`, { method: 'POST', headers: { 'X-CSRF-Token': csrfToken(), Accept: 'application/json' } }).catch(() => undefined);
});
enhanceToc();
enhanceExampleChips();
enhanceFormulaFilter((id) => document.getElementById(`ct-${id}`)?.closest<HTMLElement>('[data-fav]')?.dataset.fav === '1');
