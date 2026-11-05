// Kiểm thử đầu-cuối: chạy máy chủ thật + PostgreSQL thật + trình duyệt Chromium (Playwright).
// Cách chạy:  E2E_DATABASE_URL=postgres://.../csdl_trong node test/e2e/run.mjs
// CSDL phải trống (kiểm thử tạo quản trị viên đầu tiên). Ảnh chụp lưu ở test/e2e/screenshots.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(path.join(root, 'package.json'));
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright');
const DB = process.env.E2E_DATABASE_URL;
if (!DB) {
  console.error('Cần đặt E2E_DATABASE_URL (một CSDL PostgreSQL trống).');
  process.exit(2);
}
const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE = `http://localhost:${PORT}`;
const SHOTS = path.join(root, 'test/e2e/screenshots');
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const pageErrors = [];
async function step(name, fn) {
  const t = Date.now();
  try {
    await fn();
    results.push({ name, ok: true, ms: Date.now() - t });
    console.log(`  ✔ ${name}`);
  } catch (err) {
    results.push({ name, ok: false, error: err.message });
    console.log(`  ✖ ${name}\n      ${err.message.split('\n').slice(0, 4).join('\n      ')}`);
    throw err;
  }
}

// ---------- máy chủ ----------
const server = spawn(process.execPath, [path.join(root, 'dist/server.mjs'), 'serve'], {
  cwd: root,
  env: { ...process.env, DATABASE_URL: DB, PORT: String(PORT), HOST: '127.0.0.1' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverLog = '';
server.stdout.on('data', (d) => (serverLog += d));
server.stderr.on('data', (d) => (serverLog += d));
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(`${BASE}/api/suc-khoe`);
    if (r.ok) break;
  } catch {
    /* chưa sẵn sàng */
  }
  await new Promise((r) => setTimeout(r, 250));
}

const browser = await chromium.launch();
async function newPage(viewport = { width: 1440, height: 900 }) {
  const ctx = await browser.newContext({ viewport, locale: 'vi-VN', timezoneId: 'Asia/Ho_Chi_Minh' });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  const page = await ctx.newPage();
  page.on('pageerror', (e) => pageErrors.push(`${page.url()}: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/^Failed to load resource/.test(m.text())) pageErrors.push(`${page.url()}: ${m.text()}`);
  });
  page.on('dialog', (d) => d.accept());
  return page;
}
const shot = (page, name, full = true) => page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: full });
const hydrated = (page) =>
  page.waitForFunction(() => [...document.querySelectorAll('[data-island]')].every((el) => Object.keys(el).some((k) => k.startsWith('__reactContainer'))));
async function flash(page) {
  return (await page.locator('[role=status], [role=alert]').first().textContent())?.trim() ?? '';
}
async function login(page, username, password) {
  await page.goto(`${BASE}/dang-nhap`);
  await page.fill('input[name=username]', username);
  await page.fill('input[name=password]', password);
  await Promise.all([page.waitForNavigation(), page.click('button:has-text("Đăng nhập")')]);
}

const state = {};
let failed = false;
console.log('Kiểm thử đầu-cuối THANG MATH LEARNING');
try {
  const admin = await newPage();
  const teacher = await newPage();
  const student = await newPage();

  await step('Trang chủ khách: đủ các khu vực, Toán 8 mở, khối khác "Sắp ra mắt"', async () => {
    await admin.goto(BASE);
    for (const h of ['Chọn khối lớp', 'Tiếp tục học', 'Chủ đề nổi bật', 'Bài tập mới', 'Thử thách Toán học', 'Bảng xếp hạng', 'Thống kê tiến độ', 'Thành tích học tập']) {
      assert.ok(await admin.getByRole('heading', { name: h }).count(), `thiếu khu vực ${h}`);
    }
    assert.equal(await admin.locator('a[href="/hoc/toan-8"]').filter({ hasText: '8' }).count() > 0, true);
    assert.equal(await admin.locator('[aria-disabled=true]').count(), 3);
    assert.ok((await admin.locator('.katex').count()) > 0, 'hình minh họa có công thức KaTeX');
    await shot(admin, '01-trang-chu-khach');
  });

  await step('Cài đặt ban đầu: tạo quản trị viên, trang tự khóa sau đó', async () => {
    await admin.goto(`${BASE}/dang-nhap`);
    assert.ok(admin.url().endsWith('/cai-dat-ban-dau'));
    await admin.fill('input[name=full_name]', 'Tạ Hữu Thắng');
    await admin.fill('input[name=username]', 'admin');
    await admin.fill('input[name=password]', 'QuanTri2026');
    await admin.fill('input[name=password2]', 'QuanTri2026');
    await Promise.all([admin.waitForNavigation(), admin.click('button:has-text("Tạo tài khoản quản trị")')]);
    assert.ok(admin.url().endsWith('/quan-tri/tai-khoan'));
    const r = await fetch(`${BASE}/cai-dat-ban-dau`, { redirect: 'manual' });
    assert.equal(r.status, 303);
  });

  await step('Quản trị tạo tài khoản giáo viên', async () => {
    await admin.selectOption('select[name=role]', 'teacher');
    await admin.fill('form[action="/quan-tri/tai-khoan"] input[name=full_name]', 'Nguyễn Thị Giáo');
    await admin.fill('form[action="/quan-tri/tai-khoan"] input[name=username]', 'gv.toan');
    await admin.fill('form[action="/quan-tri/tai-khoan"] input[name=password]', 'GiaoVien2026');
    await Promise.all([admin.waitForNavigation(), admin.click('button:has-text("Tạo tài khoản")')]);
    assert.match(await flash(admin), /Đã tạo tài khoản gv\.toan/);
    await shot(admin, '20-quan-tri-tai-khoan');
    await admin.goto(`${BASE}/quan-tri`);
    assert.ok(await admin.getByText('PostgreSQL').count());
    await shot(admin, '21-quan-tri-he-thong');
  });

  await step('Giáo viên đăng nhập, tạo lớp 8A1 và tài khoản học sinh', async () => {
    await login(teacher, 'gv.toan', 'GiaoVien2026');
    assert.ok(teacher.url().endsWith('/giao-vien'));
    await teacher.goto(`${BASE}/giao-vien/lop`);
    await teacher.fill('input[name=name]', '8A1');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Tạo lớp")')]);
    state.classUrl = teacher.url();
    state.joinCode = await teacher.locator('button[data-copy]').getAttribute('data-copy');
    assert.match(state.joinCode, /^[A-Z2-9]{6}$/);
    await teacher.fill('form[action$="/them-hoc-sinh"] input[name=full_name]', 'Trần Thị Bình');
    await teacher.fill('form[action$="/them-hoc-sinh"] input[name=username]', 'binh.tran');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Tạo và thêm vào lớp")')]);
    const text = await teacher.locator('[role=status]').first().textContent();
    const m = /mật khẩu tạm:\s*([a-z0-9]+)/.exec(text);
    assert.ok(m, 'hiện mật khẩu tạm');
    state.binhPassword = m[1];
  });

  await step('Giáo viên soạn câu trắc nghiệm có công thức (xem trước trực tiếp)', async () => {
    await teacher.goto(`${BASE}/giao-vien/cau-hoi/moi?loai=mcq`);
    await hydrated(teacher);
    await teacher.selectOption('select[name=lesson_id]', { label: 'Bài 1. Đơn thức' });
    await teacher.fill('textarea[name=stem]', 'Hệ số của đơn thức \\(-\\dfrac{3}{4}x^2y^5\\) là');
    await teacher.waitForFunction(() => document.querySelector('textarea[name=stem]')?.closest('[data-island]')?.querySelector('.katex .mfrac'));
    await teacher.fill('textarea[name=option_A]', '\\(\\dfrac{3}{4}\\)');
    await teacher.fill('textarea[name=option_B]', '\\(-\\dfrac{3}{4}\\)');
    await teacher.fill('textarea[name=option_C]', '\\(x^2y^5\\)');
    await teacher.fill('textarea[name=option_D]', '7');
    await teacher.check('input[name=correct][value=B]');
    await teacher.fill('textarea[name=solution]', 'Hệ số là phần số: \\(-\\dfrac{3}{4}\\).');
    await teacher.waitForTimeout(600); // xem trước cập nhật sau 0,2 giây
    assert.ok((await teacher.locator('[data-island=RichField] .katex').count()) >= 5, 'xem trước công thức các phương án');
    await shot(teacher, '22-soan-cau-hoi');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu câu hỏi")')]);
    assert.match(teacher.url(), /\/giao-vien\/cau-hoi\/\d+\/xem$/);
    assert.ok((await teacher.locator('.katex').count()) >= 4);
    await shot(teacher, '23-xem-cau-hoi');
  });

  await step('Chặn XSS: mã HTML trong đề bị vô hiệu hóa', async () => {
    await teacher.goto(`${BASE}/giao-vien/cau-hoi/moi?loai=short_answer`);
    await hydrated(teacher);
    await teacher.selectOption('select[name=lesson_id]', { label: 'Bài 1. Đơn thức' });
    await teacher.fill('textarea[name=stem]', '<img src=x onerror="window.__xss=1"> Tính \\(2 \\cdot 3\\).');
    await teacher.fill('textarea[name=accepted]', '6');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu câu hỏi")')]);
    assert.equal(await teacher.locator('img[src="x"]').count(), 0);
    assert.equal(await teacher.evaluate(() => window.__xss), undefined);
    assert.ok((await teacher.content()).includes('&lt;img src=x'));
  });

  await step('Báo lỗi khi soạn thiếu dữ liệu, giữ nguyên nội dung đã nhập', async () => {
    await teacher.goto(`${BASE}/giao-vien/cau-hoi/moi?loai=true_false`);
    await hydrated(teacher);
    await teacher.selectOption('select[name=lesson_id]', { label: 'Bài 2. Đa thức' });
    await teacher.fill('textarea[name=stem]', 'Câu thiếu ý \\(x^2');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu câu hỏi")')]);
    const err = await teacher.locator('[role=alert]').first().textContent();
    assert.match(err, /Chọn Đúng hoặc Sai/);
    assert.match(err, /Ý a\) đang để trống/);
    assert.match(err, /không bằng nhau/);
    assert.equal(await teacher.inputValue('textarea[name=stem]'), 'Câu thiếu ý \\(x^2');
  });

  await step('Giáo viên soạn câu tự luận hình học có hình vẽ', async () => {
    await teacher.goto(`${BASE}/giao-vien/cau-hoi/moi?loai=geometry_essay`);
    await hydrated(teacher);
    await teacher.selectOption('select[name=lesson_id]', { label: 'Bài 1. Đơn thức' });
    await teacher.fill('textarea[name=stem]', 'Cho tam giác \\(ABC\\) vuông tại \\(A\\), đường cao \\(AH\\). Viết đơn thức biểu thị diện tích tam giác theo \\(AB = 3x\\), \\(AC = 4y\\).');
    await teacher.fill('textarea[name=figure]', 'A(0,3) B(0,0) C(4,0)\nABCA\nvuong(B,A,C)');
    await teacher.waitForSelector('[data-island=FigureField] svg');
    await teacher.fill('textarea[name=solution]', '\\(S = \\dfrac{1}{2} \\cdot 3x \\cdot 4y = 6xy\\).');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu câu hỏi")')]);
    assert.ok(await teacher.locator('svg.figure-svg').count());
  });

  await step('Giáo viên tạo đề, thêm câu Bài 1 từ ngân hàng, giao lớp và phát đề', async () => {
    await teacher.goto(`${BASE}/giao-vien/de-kiem-tra`);
    await teacher.fill('input[name=title]', 'Kiểm tra 15 phút – Đơn thức');
    await teacher.fill('input[name=duration]', '15');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Tạo đề")')]);
    state.testUrl = teacher.url().split('?')[0];
    await Promise.all([teacher.waitForNavigation(), teacher.selectOption('select[name=bai]', { label: 'Bài 1. Đơn thức' })]);
    const boxes = teacher.locator('input[name=question_id]');
    state.testQuestionCount = await boxes.count();
    assert.ok(state.testQuestionCount >= 6, 'có câu mẫu và câu vừa soạn');
    for (let i = 0; i < state.testQuestionCount; i++) await boxes.nth(i).check();
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Thêm các câu đã chọn")')]);
    assert.match(await flash(teacher), /Đã thêm/);
    // phát đề khi chưa giao lớp → báo lỗi rõ ràng
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Phát đề")')]);
    assert.match(await flash(teacher), /Chọn ít nhất một lớp/);
    await teacher.check('input[name=class_id]');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu lớp được giao")')]);
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Phát đề")')]);
    assert.match(await flash(teacher), /Đã phát đề/);
    await shot(teacher, '24-de-kiem-tra');
  });

  await step('Học sinh tự đăng ký bằng mã lớp', async () => {
    await student.goto(`${BASE}/dang-ky`);
    await student.fill('input[name=full_name]', 'Lê Minh An');
    await student.fill('input[name=username]', 'an.le');
    await student.fill('input[name=password]', 'HocSinh2026');
    await student.fill('input[name=password2]', 'HocSinh2026');
    await student.fill('input[name=class_code]', state.joinCode.toLowerCase());
    await Promise.all([student.waitForNavigation(), student.click('button:has-text("Tạo tài khoản")')]);
    assert.match(await flash(student), /vào lớp 8A1/);
  });

  await step('Học bài: Toán 8 → Học kì → Chương → Bài, công thức KaTeX, đánh dấu học xong', async () => {
    await student.goto(`${BASE}/hoc/toan-8/bai/bai-1-don-thuc`);
    const crumbs = await student.locator('nav[aria-label="Đường dẫn"]').textContent();
    for (const c of ['Toán 8', 'Học kì I', 'Chương I. Đa thức', 'Bài 1. Đơn thức']) assert.ok(crumbs.includes(c), `đường dẫn thiếu ${c}`);
    for (const h of [/Giới thiệu bài học/, /Mục tiêu cần đạt/, /Khám phá kiến thức mới/, /CÔNG THỨC CẦN NHỚ/, /Ví dụ minh họa/, /Hướng dẫn giải các dạng toán/, /Luyện tập/, /Ghi chú của em/])
      assert.ok(await student.getByRole('heading', { name: h }).count(), `thiếu mục ${h}`);
    assert.ok((await student.locator('.katex').count()) > 10);
    assert.equal(await student.locator('.math-error').count(), 0, 'không có công thức lỗi');
    await shot(student, '02-bai-hoc');
    await Promise.all([student.waitForNavigation(), student.click('button:has-text("Đánh dấu đã học xong")')]);
    const f = await flash(student);
    assert.match(f, /\+20 XP/);
    assert.match(f, /Bước chân đầu tiên/);
    // chế độ trình chiếu
    await student.click('[data-present-toggle]');
    assert.ok(await student.evaluate(() => document.documentElement.classList.contains('present')));
    await shot(student, '03-trinh-chieu', false);
    await student.click('[data-present-toggle]');
  });

  await step('Bài học đầy đủ: lời giải từng bước, lưu bài và công thức yêu thích, ghi chú, góc học tập, xem nhanh công thức, tìm kiếm', async () => {
    await student.goto(`${BASE}/hoc/toan-8/bai/bai-1-don-thuc`);
    // mục lục bài học + thẻ công thức
    assert.ok((await student.locator('[data-toc-link]').count()) >= 6, 'mục lục bài học');
    assert.ok((await student.locator('[data-formula]').count()) >= 3, 'có thẻ công thức cần nhớ');
    // lời giải từng bước: mở ra chỉ thấy bước 1, bấm tiếp mới thấy bước 2, xem hết mới hiện kết luận
    const ex = student.locator('[data-example]').nth(2);
    await ex.locator('details[data-steps-root] > summary').click();
    assert.equal(await ex.locator('[data-step]:visible').count(), 1);
    assert.equal(await ex.locator('[data-after-steps]:visible').count(), 0, 'chưa hiện kết luận');
    await ex.locator('[data-step-next]').click();
    assert.equal(await ex.locator('[data-step]:visible').count(), 2);
    await ex.locator('[data-step-all]').click();
    assert.ok(await ex.locator('[data-after-steps]:visible').count(), 'xem hết thì hiện kết luận');
    assert.ok(await ex.locator('[data-viewed-badge]').isVisible());
    // chuyển nhanh giữa các dạng toán
    await student.locator('[data-ex-chip]').nth(2).click();
    assert.equal(await student.locator('[data-ex-group]:visible').count(), 1, 'chỉ hiện ví dụ của dạng đã chọn');
    await student.locator('[data-ex-chip=all]').click();
    // lưu bài yêu thích, công thức yêu thích, ghi chú
    await Promise.all([student.waitForNavigation(), student.click('button:has-text("Lưu bài yêu thích")')]);
    assert.ok(await student.getByText('★ Bài yêu thích').count());
    await Promise.all([student.waitForNavigation(), student.locator('[data-formula] .fav-btn').first().click()]);
    assert.equal(await student.locator('[data-formula] .fav-btn').first().getAttribute('aria-pressed'), 'true');
    await student.fill('#note-body', 'Nhớ: thu gọn rồi mới tìm bậc.');
    await Promise.all([student.waitForNavigation(), student.click('button:has-text("Lưu ghi chú")')]);
    assert.match(await flash(student), /ghi chú/i);
    await shot(student, '06-bai-hoc-day-du');
    await student.goto(`${BASE}/goc-hoc-tap`);
    const corner = await student.locator('main').textContent();
    for (const t of ['Bài 1. Đơn thức', 'Nhớ: thu gọn rồi mới tìm bậc.', 'Công thức yêu thích (1)', 'Ví dụ em đã xem lời giải (1)']) assert.ok(corner.includes(t), `góc học tập thiếu "${t}"`);
    await shot(student, '07-goc-hoc-tap');
    // xem nhanh công thức: lọc theo từ khóa, chỉ yêu thích
    await student.goto(`${BASE}/cong-thuc`);
    const all = await student.locator('[data-formula]:visible').count();
    await student.fill('[data-formula-filter]', 'dong dang');
    const filtered = await student.locator('[data-formula]:visible').count();
    assert.ok(filtered > 0 && filtered < all, 'lọc công thức không dấu');
    await student.fill('[data-formula-filter]', '');
    await student.check('[data-formula-favonly]');
    assert.equal(await student.locator('[data-formula]:visible').count(), 1, 'chỉ công thức yêu thích');
    // tìm kiếm không dấu
    await student.goto(`${BASE}/tim-kiem?q=don%20thuc%20dong%20dang`);
    assert.match(await student.locator('main a[href*="bai-1-don-thuc"]').first().textContent(), /Đơn thức|đồng dạng/i);
    await shot(student, '08-tim-kiem');
  });

  await step('Luyện tập: chấm ngay, hiện lời giải, cộng XP, tổng kết lượt', async () => {
    await student.goto(`${BASE}/luyen-tap/bai/bai-1-don-thuc`);
    await hydrated(student);
    let n = 0;
    for (;;) {
      const art = student.locator('article');
      if (await art.locator('[aria-label="Chọn phương án"]').count()) await art.locator('[role=radio]').nth(1).click();
      else if (await art.locator('[aria-label^="Ý "]').count()) {
        const groups = art.locator('[aria-label^="Ý "]');
        for (let i = 0; i < (await groups.count()); i++) await groups.nth(i).locator('button:has-text("Đúng")').click();
      } else if (await art.locator('input[inputmode=decimal]').count()) await art.locator('input[inputmode=decimal]').fill('-6');
      else await art.locator('textarea').fill('Diện tích \\(S = 6xy\\).');
      await art.locator('button:has-text("Kiểm tra"), button:has-text("Gửi bài làm")').click();
      await art.locator('[role=status]').waitFor();
      if ((await art.locator('[role=status]').textContent()).includes('Chưa đúng')) {
        assert.ok(await art.locator('[role=status] a:has-text("Dạng toán"), [role=status] a:has-text("Bài học")').count(), 'làm sai: gợi ý kiến thức cần ôn lại');
        state.reviewHints = (state.reviewHints ?? 0) + 1;
      }
      n++;
      if (n === 1) await shot(student, '04-luyen-tap-phan-hoi');
      const next = art.locator('button:has-text("Câu tiếp theo")');
      if (await next.count()) await next.click();
      else {
        await art.locator('button:has-text("Xem kết quả")').click();
        break;
      }
    }
    await student.getByRole('heading', { name: 'Kết quả lượt luyện tập' }).waitFor();
    state.practiced = n;
    assert.ok(n >= 6);
    await shot(student, '05-luyen-tap-tong-ket');
  });

  await step('Kiểm tra: làm bài có giờ, tự lưu nháp, tải lại không mất bài, nộp bài', async () => {
    await student.goto(`${BASE}/kiem-tra`);
    await shot(student, '06-danh-sach-kiem-tra');
    await Promise.all([student.waitForNavigation(), student.click('a:has-text("Vào làm bài")')]);
    await Promise.all([student.waitForNavigation(), student.click('button:has-text("Bắt đầu làm bài")')]);
    assert.match(student.url(), /\/kiem-tra\/lam\/\d+$/);
    state.resultUrl = student.url().replace('/lam/', '/ket-qua/');
    await hydrated(student);
    assert.match(await student.locator('[role=timer]').textContent(), /^1[45]:\d\d$/);
    const arts = student.locator('article');
    for (let i = 0; i < (await arts.count()); i++) {
      const a = arts.nth(i);
      if (await a.locator('[aria-label="Chọn phương án"]').count()) await a.locator('[role=radio]').nth(1).click();
      else if (await a.locator('[aria-label^="Ý "]').count()) {
        const g = a.locator('[aria-label^="Ý "]');
        for (let k = 0; k < (await g.count()); k++) await g.nth(k).locator('button').nth(k % 2).click();
      } else if (await a.locator('input[inputmode=decimal]').count()) await a.locator('input[inputmode=decimal]').fill('6');
      else await a.locator('textarea').fill('S = 1/2 · 3x · 4y = 6xy');
    }
    await student.getByText('đã lưu nháp').waitFor({ timeout: 8000 });
    await shot(student, '07-lam-kiem-tra');
    await student.reload();
    await hydrated(student);
    assert.equal(await student.locator('input[inputmode=decimal]').first().inputValue(), '6', 'bài nháp được khôi phục');
    await student.click('button:has-text("Nộp bài")');
    await student.locator('[role=alertdialog]').waitFor();
    await Promise.all([student.waitForURL(/\/kiem-tra\/ket-qua\/\d+$/), student.locator('[role=alertdialog] button:has-text("Nộp bài")').click()]);
    assert.ok(await student.getByText('Điểm (thang 10)').count());
    assert.ok(await student.getByText('chờ giáo viên chấm').count());
    await shot(student, '08-ket-qua-kiem-tra');
    // không nộp được lần hai
    const again = await student.evaluate(async (u) => {
      const t = document.querySelector('meta[name=csrf-token]').content;
      const r = await fetch(u, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': t }, body: '{"answers":{}}' });
      return r.status;
    }, state.resultUrl.replace('/kiem-tra/ket-qua/', '/api/kiem-tra/nop/'));
    assert.equal(again, 409);
  });

  await step('Trang cá nhân: tiến độ, câu đã làm, tỉ lệ đúng, XP, huy hiệu, lịch sử', async () => {
    await student.goto(`${BASE}/ca-nhan`);
    for (const t of ['Điểm kinh nghiệm', 'Tiến độ học tập', 'Câu đã làm', 'Tiến độ theo chương', 'Lịch sử luyện tập', 'Bài học đang học']) assert.ok(await student.getByText(t).count(), `thiếu ${t}`);
    assert.ok((await student.locator('table.data-table tbody tr').count()) >= 6);
    assert.ok(await student.getByText('8A1').count());
    await shot(student, '09-ca-nhan');
    await student.goto(`${BASE}/thanh-tich`);
    assert.ok(await student.getByText('Lê Minh An').count(), 'có tên trên bảng xếp hạng');
    await shot(student, '10-thanh-tich');
    await student.goto(BASE);
    assert.ok(await student.getByText('Học tiếp').count());
    await shot(student, '11-trang-chu-hoc-sinh');
  });

  await step('Giáo viên xem kết quả và chấm câu tự luận', async () => {
    await teacher.goto(`${state.testUrl}/ket-qua`);
    assert.ok(await teacher.getByText('Lê Minh An').count());
    assert.ok(await teacher.getByText(/Chờ chấm/).count());
    await shot(teacher, '25-ket-qua-de');
    await Promise.all([teacher.waitForNavigation(), teacher.click('a:has-text("Chấm")')]);
    const forms = teacher.locator('form:has(input[name=response_id])');
    const count = await forms.count();
    assert.ok(count >= 1);
    for (let i = 0; i < count; i++) {
      await teacher.locator('form:has(input[name=response_id])').nth(i).locator('input[name=points]').fill('1');
      await teacher.locator('form:has(input[name=response_id])').nth(i).locator('input[name=feedback]').fill('Trình bày tốt.');
      await Promise.all([teacher.waitForNavigation(), teacher.locator('form:has(input[name=response_id])').nth(i).locator('button').click()]);
    }
    assert.match(await teacher.locator('h1').textContent(), /Chấm tự luận/);
    await teacher.goto(`${state.testUrl}/ket-qua`);
    assert.ok(await teacher.getByText('Đã chấm').count());
    await student.goto(state.resultUrl);
    assert.ok(await student.getByText('Trình bày tốt.').count(), 'học sinh thấy nhận xét');
  });

  await step('Dashboard giáo viên: tổng quan, lớp, học sinh, thống kê, chương trình, soạn bài', async () => {
    await teacher.goto(`${BASE}/giao-vien`);
    await shot(teacher, '26-giao-vien-tong-quan');
    await teacher.goto(state.classUrl);
    assert.ok(await teacher.getByText('Lê Minh An').count());
    await shot(teacher, '27-lop-hoc');
    await teacher.goto(`${BASE}/giao-vien/hoc-sinh`);
    assert.equal(await teacher.locator('tbody tr').count(), 2);
    await teacher.goto(`${BASE}/giao-vien/thong-ke`);
    assert.ok(await teacher.getByText('Tỉ lệ trả lời đúng theo chương').count());
    await shot(teacher, '28-thong-ke');
    await teacher.goto(`${BASE}/giao-vien/cau-hoi`);
    await shot(teacher, '29-ngan-hang-cau-hoi');
    await teacher.goto(`${BASE}/giao-vien/chuong-trinh`);
    await shot(teacher, '30-chuong-trinh');
    // soạn thêm mục kiến thức cho Bài 11
    await teacher.click('tr:has-text("Bài 11. Hình thang cân") a:has-text("Soạn")');
    await teacher.waitForLoadState('load');
    await hydrated(teacher);
    const addForm = teacher.locator('form:has(input[name=_action][value=add-section])');
    await addForm.locator('select[name=kind]').selectOption('formula');
    await addForm.locator('input[name=title]').fill('Hình thang cân');
    await addForm.locator('textarea[name=body]').fill('\\[\\widehat{C} = \\widehat{D},\\quad AD = BC,\\quad AC = BD\\]');
    await Promise.all([teacher.waitForNavigation(), addForm.locator('button:has-text("Thêm vào bài")').click()]);
    assert.match(await flash(teacher), /Đã thêm mục nội dung/);
    await shot(teacher, '31-soan-bai-hoc');
    await student.goto(`${BASE}/hoc/toan-8/bai/bai-11-hinh-thang-can`);
    assert.ok(await student.locator('article[id^="kt-"]', { hasText: 'Hình thang cân' }).count(), 'học sinh thấy nội dung mới');
  });

  await step('Giáo viên soạn công thức, ví dụ minh họa, ảnh minh họa và ẩn/hiện – không cần sửa mã', async () => {
    await teacher.goto(`${BASE}/giao-vien/chuong-trinh`);
    await teacher.click('tr:has-text("Bài 2. Đa thức") a:has-text("Soạn")');
    await teacher.waitForLoadState('load');
    await hydrated(teacher);
    const lessonEditor = teacher.url();
    // tải ảnh minh họa (PNG 1×1)
    const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    await teacher.setInputFiles('#image-file', { name: 'hinh.png', mimeType: 'image/png', buffer: png });
    await Promise.all([teacher.waitForNavigation(), teacher.click('form[enctype="multipart/form-data"] button')]);
    const up = await flash(teacher);
    const code = /\[anh:(\d+)\]/.exec(up)?.[0];
    assert.ok(code, 'tải ảnh lên được mã chèn');
    // ảnh không phải PNG/JPEG/WebP bị từ chối
    await teacher.setInputFiles('#image-file', { name: 'x.png', mimeType: 'image/png', buffer: Buffer.from('<svg onload=alert(1)>') });
    await Promise.all([teacher.waitForNavigation(), teacher.click('form[enctype="multipart/form-data"] button')]);
    assert.match(await flash(teacher), /Chỉ nhận ảnh/);
    // thêm công thức có ảnh trong ví dụ
    await hydrated(teacher);
    await teacher.click('summary:has-text("+ Thêm công thức")');
    const ff = teacher.locator('form:has(input[name=_action][value=add-formula])');
    await ff.locator('[name=group_title]').fill('Kiểm thử');
    await ff.locator('[name=name]').fill('Công thức kiểm thử');
    await ff.locator('[name=tex]').fill('P(x) + 0 = P(x)');
    await ff.locator('textarea[name=symbols]').fill('- \\(P(x)\\): đa thức bất kì');
    await ff.locator('textarea[name=example]').fill(`\\(x^2 + 0 = x^2\\). ${code}`);
    await Promise.all([teacher.waitForNavigation(), ff.locator('button:has-text("Thêm công thức")').click()]);
    assert.match(await flash(teacher), /Đã thêm công thức/);
    await student.goto(`${BASE}/hoc/toan-8/bai/bai-2-da-thuc`);
    const card = student.locator('[data-formula]', { hasText: 'Công thức kiểm thử' });
    assert.ok(await card.count(), 'học sinh thấy công thức mới');
    assert.ok(await card.locator('img.lesson-image').count(), 'ảnh minh họa hiện trong nội dung');
    // ẩn công thức → học sinh không thấy
    await teacher.goto(lessonEditor);
    await Promise.all([teacher.waitForNavigation(), teacher.locator('button[aria-label="Ẩn công thức"]').last().click()]);
    await student.reload();
    assert.equal(await student.locator('[data-formula]', { hasText: 'Công thức kiểm thử' }).count(), 0, 'công thức đã ẩn');
    // thêm ví dụ minh họa cho một dạng toán, báo lỗi công thức sai
    await teacher.goto(lessonEditor);
    await Promise.all([teacher.waitForNavigation(), teacher.locator('a[href^="/giao-vien/dang-toan/"]').first().click()]);
    await hydrated(teacher);
    await teacher.click('summary:has-text("+ Thêm ví dụ")');
    let ef = teacher.locator('form:has(input[name=_action][value=add-example])');
    await ef.locator('select[name=level]').selectOption('2');
    await ef.locator('textarea[name=problem]').fill('Lỗi \\(\\frac{1}{\\)');
    await ef.locator('textarea[name=steps]').fill('Bước 1');
    await ef.locator('textarea[name=answer]').fill('x');
    await ef.locator('button:has-text("Thêm ví dụ")').click();
    await teacher.waitForLoadState('load');
    assert.ok(await teacher.getByText('bị lỗi').count(), 'báo lỗi công thức trong ví dụ');
    await hydrated(teacher);
    await teacher.click('summary:has-text("+ Thêm ví dụ")');
    ef = teacher.locator('form:has(input[name=_action][value=add-example])');
    await ef.locator('select[name=level]').selectOption('2');
    await ef.locator('textarea[name=problem]').fill('Ví dụ kiểm thử: \\(x^2 - x^2 + 3x\\) có phải đa thức bậc 2?');
    await ef.locator('textarea[name=steps]').fill('Thu gọn: \\(x^2 - x^2 + 3x = 3x\\).\nĐa thức \\(3x\\) có bậc 1.');
    await ef.locator('textarea[name=answer]').fill('Không, đa thức có bậc 1.');
    await Promise.all([teacher.waitForNavigation(), ef.locator('button:has-text("Thêm ví dụ")').click()]);
    assert.match(await flash(teacher), /Đã thêm ví dụ/);
    await shot(teacher, '32-soan-vi-du');
    const topicPublic = await teacher.locator('a:has-text("Xem như học sinh")').getAttribute('href');
    await student.goto(`${BASE}${topicPublic}`);
    const added = student.locator('[data-example]', { hasText: 'Ví dụ kiểm thử' });
    assert.ok(await added.count(), 'học sinh thấy ví dụ mới trên trang dạng toán');
    await added.locator('details[data-steps-root] > summary').click();
    assert.equal(await added.locator('[data-step]:visible').count(), 1);
  });

  await step('Học sinh do giáo viên tạo: đăng nhập, đổi mật khẩu', async () => {
    const binh = await newPage({ width: 390, height: 844 });
    await login(binh, 'binh.tran', state.binhPassword);
    assert.equal(new URL(binh.url()).pathname, '/');
    await shot(binh, '12-di-dong-trang-chu');
    await binh.goto(`${BASE}/ca-nhan`);
    await binh.fill('input[name=current]', state.binhPassword);
    await binh.fill('form[action="/ca-nhan/mat-khau"] input[name=password]', 'MatKhauMoi9');
    await binh.fill('input[name=password2]', 'MatKhauMoi9');
    await Promise.all([binh.waitForNavigation(), binh.click('button:has-text("Đổi mật khẩu")')]);
    assert.match(await flash(binh), /Đã đổi mật khẩu/);
    await binh.goto(`${BASE}/hoc/toan-8/bai/bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu`);
    await shot(binh, '13-di-dong-bai-hoc');
    // học sinh khác không xem được bài làm của An
    const r = await binh.goto(state.resultUrl);
    assert.equal(r.status(), 404);
    await binh.context().close();
  });

  await step('Bảo mật: CSRF, phân quyền, chuyển hướng đăng nhập, giới hạn đăng nhập sai', async () => {
    const noCsrf = await fetch(`${BASE}/dang-nhap`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'username=admin&password=QuanTri2026', redirect: 'manual' });
    assert.equal(noCsrf.status, 403);
    const crossSite = await fetch(`${BASE}/dang-xuat`, { method: 'POST', headers: { Origin: 'https://evil.example', 'Content-Type': 'application/x-www-form-urlencoded' }, body: '_csrf=x', redirect: 'manual' });
    assert.equal(crossSite.status, 403);
    const guest = await fetch(`${BASE}/ca-nhan`, { redirect: 'manual' });
    assert.equal(guest.status, 303);
    assert.equal(guest.headers.get('location'), '/dang-nhap?next=%2Fca-nhan');
    const api = await fetch(`${BASE}/api/luyen-tap/tra-loi`, { method: 'POST' });
    assert.equal(api.status, 403); // không có mã CSRF
    const r = await student.goto(`${BASE}/giao-vien`);
    assert.equal(r.status(), 403);
    const r2 = await student.goto(`${BASE}/quan-tri`);
    assert.equal(r2.status(), 403);
    const r3 = await teacher.goto(`${BASE}/quan-tri/tai-khoan`);
    assert.equal(r3.status(), 403);
    const headers = (await fetch(BASE)).headers;
    assert.match(headers.get('content-security-policy'), /script-src 'self'/);
    assert.equal(headers.get('x-frame-options'), 'SAMEORIGIN');
    assert.match(headers.get('set-cookie') ?? '', /HttpOnly; SameSite=Lax/);
    const bf = await newPage();
    for (let i = 0; i < 5; i++) await login(bf, 'an.le', 'saimatkhau' + i);
    await login(bf, 'an.le', 'HocSinh2026');
    assert.match(await bf.locator('[role=alert]').textContent(), /quá nhiều lần/);
    await bf.context().close();
  });

  await step('Trang công khai khác: chương trình, mục lục, PPCT, luyện tập, thử thách', async () => {
    const g = await newPage();
    await g.goto(`${BASE}/chuong-trinh`);
    await shot(g, '14-chuong-trinh');
    await g.goto(`${BASE}/hoc/toan-8`);
    assert.equal(await g.locator('h3').count(), 12);
    await shot(g, '15-muc-luc');
    await g.goto(`${BASE}/chuong-trinh/toan-8/ppct`);
    assert.equal(await g.locator('tbody tr').count(), 82);
    await shot(g, '16-ppct');
    await g.goto(`${BASE}/luyen-tap`);
    await shot(g, '17-luyen-tap');
    await g.goto(`${BASE}/thu-thach`);
    assert.ok(g.url().includes('/dang-nhap?next=%2Fthu-thach'));
    await g.goto(`${BASE}/khong-ton-tai`);
    assert.ok(await g.getByText('Không tìm thấy trang').count());
    await g.context().close();
    await student.goto(`${BASE}/thu-thach`);
    await hydrated(student);
    await shot(student, '18-thu-thach');
  });

  // ---------------- Giai đoạn 2: bản đồ kiến thức ----------------
  await step('Bản đồ kiến thức (học sinh): Toán 8 → Học kì → Chương → Bài → Chủ đề → Dạng toán, luyện tập dạng, kiểm tra cuối chương', async () => {
    await student.goto(`${BASE}/hoc/toan-8`);
    const course = await student.locator('main').textContent();
    for (const t of ['Học kì I', 'Học kì II', 'dạng toán', 'bài tập']) assert.ok(course.includes(t), `mục lục thiếu "${t}"`);
    await student.goto(`${BASE}/hoc/toan-8/ban-do`);
    const map = await student.locator('main').textContent();
    for (const t of ['Học kì I', 'Học kì II', 'Đa thức', 'Một số hình khối trong thực tiễn', 'Bài 39. Hình chóp tứ giác đều', 'Vẽ đồ thị hàm số bậc nhất']) assert.ok(map.includes(t), `bản đồ thiếu "${t}"`);
    assert.equal(await student.locator('main details').count(), 12, 'bản đồ có đủ 12 mục chương');
    await shot(student, '40-ban-do-kien-thuc');
    // Chương → danh sách bài
    await student.goto(`${BASE}/hoc/toan-8/chuong/VII`);
    for (const h of ['Mục tiêu cần đạt', 'Kiến thức trọng tâm', 'Công thức cần nhớ', 'Danh sách bài học', 'Chủ đề và hệ thống dạng toán', 'Bài tập tổng hợp', 'Kiểm tra cuối chương'])
      assert.ok(await student.getByRole('heading', { name: h }).count(), `trang chương thiếu "${h}"`);
    assert.ok(await student.getByText('mục đã học xong').count(), 'có tiến độ chương');
    assert.equal(await student.locator('.math-error').count(), 0);
    await shot(student, '41-chuong-7');
    // Bài → Dạng toán
    await Promise.all([student.waitForNavigation(), student.click('section[aria-labelledby=ds-bai] a:has-text("Bài 28.")')]);
    assert.match(student.url(), /bai-28-ham-so-bac-nhat/);
    await Promise.all([student.waitForNavigation(), student.locator('a:has-text("Vẽ đồ thị hàm số bậc nhất")').first().click()]);
    assert.match(student.url(), /\/dang\//);
    for (const h of ['Kiến thức sử dụng', 'Dấu hiệu nhận biết', 'Phương pháp giải', 'Lỗi sai thường gặp', /^Ví dụ minh họa/, 'Bài tập luyện tập'])
      assert.ok(await student.getByRole('heading', { name: h }).count(), `trang dạng toán thiếu "${h}"`);
    assert.ok((await student.locator('svg.chart-svg').count()) >= 1, 'có đồ thị hàm số trong lời giải');
    assert.equal(await student.locator('.math-error').count(), 0);
    await shot(student, '42-dang-toan');
    await Promise.all([student.waitForNavigation(), student.click('a:has-text("Luyện tập dạng này")')]);
    await hydrated(student);
    assert.ok(await student.locator('article').count(), 'có câu luyện tập của dạng');
    // Kiểm tra cuối chương
    await student.goto(`${BASE}/luyen-tap/chuong/VIII/kiem-tra`);
    await hydrated(student);
    assert.ok(await student.getByText('Kiểm tra cuối chương').count());
    assert.ok(await student.locator('article').count());
    await shot(student, '43-kiem-tra-cuoi-chuong');
  });

  await step('Quản lý chương trình không cần sửa mã: thêm, đổi tên, sắp xếp, ẩn / xuất bản chương, bài, chủ đề, dạng toán', async () => {
    await teacher.goto(`${BASE}/giao-vien/chuong-trinh`);
    await teacher.getByText('Thêm chương vào Học kì II').click();
    const form = teacher.locator('form:has(input[name=_action][value=add-chapter])').nth(1);
    await form.locator('input[name=code]').fill('XI');
    await form.locator('input[name=title]').fill('Chương thử nghiệm');
    await Promise.all([teacher.waitForURL(/giao-vien\/chuong\/\d+/), form.locator('button').click()]);
    const chapterUrl = teacher.url();
    // đổi tên chương, soạn mục tiêu (có công thức)
    await teacher.fill('input[name=title]', 'Chương ôn tập mở rộng');
    await teacher.fill('textarea[name=objectives]', '- Mục tiêu thử \\(x^2 + 1\\).');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu chương")')]);
    assert.match(await flash(teacher), /Đã lưu chương/);
    // chương mới đang ẩn: học sinh chưa thấy
    const hidden = await student.goto(`${BASE}/hoc/toan-8/chuong/XI`);
    assert.equal(hidden.status(), 404, 'chương nháp bị ẩn với học sinh');
    // thêm bài vào chương mới
    await teacher.goto(`${BASE}/giao-vien/chuong-trinh`);
    const det = teacher.locator('details:has(input[name=_action][value=add-lesson])').last();
    await det.locator('summary').click();
    await det.locator('input[name=number]').fill('40');
    await det.locator('input[name=title]').fill('Bài thử nghiệm');
    await Promise.all([teacher.waitForURL(/giao-vien\/bai-hoc\/\d+/), det.locator('button').click()]);
    const lessonUrl = teacher.url();
    await teacher.fill('input[name=code]', 'T8.B40');
    await teacher.locator('form:has(input[value=meta]) textarea[name=concepts]').fill('Khái niệm thử.');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu bản đồ kiến thức")')]);
    assert.match(await flash(teacher), /Đã lưu bản đồ kiến thức/);
    // chủ đề, dạng toán
    const themeForm = teacher.locator('form:has(input[value=add-theme])');
    await themeForm.locator('input[name=title]').fill('Chủ đề thử nghiệm');
    await Promise.all([teacher.waitForNavigation(), themeForm.locator('button').click()]);
    assert.match(await flash(teacher), /Đã lưu chủ đề/);
    const topicForm = teacher.locator('form:has(input[value=add-topic])');
    await topicForm.locator('input[name=title]').fill('Dạng thử nghiệm số một');
    await Promise.all([teacher.waitForURL(/giao-vien\/dang-toan\/\d+/), topicForm.locator('button').click()]);
    const topicUrl = teacher.url();
    await teacher.check('input[name=levels][value="2"]');
    await teacher.check('input[name=levels][value="3"]');
    await teacher.fill('textarea[name=method]', 'Phương pháp thử \\(a + b\\).');
    await teacher.fill('textarea[name=steps]', '- **Bước 1.** Làm A.\n- **Bước 2.** Làm B.');
    await teacher.selectOption('select[name=status]', 'published');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu dạng toán")')]);
    assert.match(await flash(teacher), /Đã lưu dạng toán/);
    await shot(teacher, '44-soan-dang-toan');
    // xuất bản bài và chương → học sinh thấy
    await teacher.goto(lessonUrl);
    await teacher.selectOption('form:has(input[value=info]) select[name=status]', 'published');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu thông tin")')]);
    await teacher.goto(chapterUrl);
    await teacher.selectOption('select[name=status]', 'published');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu chương")')]);
    const shown = await student.goto(`${BASE}/hoc/toan-8/chuong/XI`);
    assert.equal(shown.status(), 200);
    assert.ok(await student.getByRole('heading', { name: 'Chương XI. Chương ôn tập mở rộng' }).count(), 'tên chương mới');
    assert.ok(await student.getByText('Dạng thử nghiệm số một').count(), 'học sinh thấy dạng toán mới');
    // sắp xếp: thêm bài thứ hai rồi đưa nó lên trước bài 40
    await teacher.goto(`${BASE}/giao-vien/chuong-trinh`);
    const det2 = teacher.locator('details:has(input[name=_action][value=add-lesson])').last();
    await det2.locator('summary').click();
    await det2.locator('input[name=number]').fill('41');
    await det2.locator('input[name=title]').fill('Bài thử hai');
    await det2.locator('select[name=status]').selectOption('published').catch(() => {});
    await Promise.all([teacher.waitForURL(/giao-vien\/bai-hoc\/\d+/), det2.locator('button').click()]);
    await teacher.selectOption('form:has(input[value=info]) select[name=status]', 'published');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu thông tin")')]);
    await teacher.goto(`${BASE}/giao-vien/chuong-trinh`);
    const row41 = teacher.locator('tr:has-text("Bài 41. Bài thử hai")');
    await Promise.all([teacher.waitForNavigation(), row41.locator('button[aria-label="Đưa bài lên"]').click()]);
    await student.goto(`${BASE}/hoc/toan-8/chuong/XI`);
    const order = await student.locator('section[aria-labelledby=ds-bai] li').allTextContents();
    assert.ok(order[0].includes('Bài 41') && order[1].includes('Bài 40'), `thứ tự bài sau khi sắp xếp: ${order.join(' / ')}`);
    await teacher.goto(topicUrl);
    await teacher.selectOption('select[name=status]', 'draft');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Lưu dạng toán")')]);
    await student.goto(`${BASE}/hoc/toan-8/chuong/XI`);
    assert.equal(await student.getByText('Dạng thử nghiệm số một').count(), 0, 'dạng toán ẩn thì học sinh không thấy');
  });

  await step('Nhập câu hỏi hàng loạt theo mã dạng toán: kiểm tra trước, báo lỗi từng dòng, nhập câu hợp lệ', async () => {
    await teacher.goto(`${BASE}/giao-vien/cau-hoi/nhap`);
    const tsv = [
      'ma_dang\thinh_thuc\tmuc_do\tde_bai\tA\tB\tC\tD\tdap_an\tloi_giai',
      'T8.B28.D3\tTN\tTH\tĐồ thị hàm số \\(y = 2x\\) đi qua điểm nào?\t\\((1; 2)\\)\t\\((2; 1)\\)\t\\((1; 1)\\)\t\\((0; 2)\\)\tA\tThay \\(x = 1\\) được \\(y = 2\\).',
      'T8.B28.D3\tTLN\tVD\tĐồ thị \\(y = 3x - 6\\) cắt trục hoành tại điểm có hoành độ bằng?\t\t\t\t\t2\t\\(3x - 6 = 0 \\Leftrightarrow x = 2\\).',
      'T8.B99.D9\tTN\tNB\tLỗi mã\t1\t2\t3\t4\tA\t',
    ].join('\n');
    await teacher.fill('textarea[name=data]', tsv);
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Kiểm tra dữ liệu")')]);
    assert.ok(await teacher.getByText('2 dòng hợp lệ').count(), 'đếm dòng hợp lệ');
    assert.ok(await teacher.getByText('Không tìm thấy dạng toán mã "T8.B99.D9"').count(), 'báo lỗi mã dạng');
    await shot(teacher, '45-nhap-cau-hoi');
    await Promise.all([teacher.waitForNavigation(), teacher.click('button:has-text("Nhập 2 câu hợp lệ")')]);
    assert.match(await flash(teacher), /Đã nhập 2 câu hỏi/);
  });

  await step('Không có lỗi JavaScript trên các trang đã mở', async () => {
    assert.deepEqual(pageErrors, []);
  });
} catch {
  failed = true;
} finally {
  await browser.close();
  server.kill();
}

const ok = results.filter((r) => r.ok).length;
console.log(`\n${ok}/${results.length} bước đạt.${failed ? ' CÓ LỖI.' : ''}`);
if (failed && serverLog) console.log('--- nhật ký máy chủ ---\n' + serverLog.slice(-3000));
if (pageErrors.length) console.log('Lỗi trang:', pageErrors);
fs.writeFileSync(path.join(SHOTS, 'ket-qua.json'), JSON.stringify({ at: new Date().toISOString(), results, pageErrors }, null, 2));
process.exit(failed ? 1 : 0);
