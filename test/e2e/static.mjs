// Kiểm thử bản HTML ngoại tuyến: mở thẳng bằng file:// trong Chromium.
// Cách chạy:  node test/e2e/static.mjs <thư-mục-đã-xuất>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(path.join(root, 'package.json'));
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright');
const dir = path.resolve(process.argv[2] ?? 'math-learning-html');
const SHOTS = path.join(root, 'test/e2e/screenshots-html');
fs.mkdirSync(SHOTS, { recursive: true });
const url = (f) => pathToFileURL(path.join(dir, f)).href;

const results = [];
const pageErrors = [];
async function step(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`  ✔ ${name}`);
  } catch (err) {
    results.push({ name, ok: false, error: err.message });
    console.log(`  ✖ ${name}\n      ${err.message.split('\n').slice(0, 4).join('\n      ')}`);
    throw err;
  }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'vi-VN' });
await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
const page = await ctx.newPage();
page.on('pageerror', (e) => pageErrors.push(`${page.url()}: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error' && !/^Failed to load resource: net::ERR_FAILED/.test(m.text())) pageErrors.push(`${page.url()}: ${m.text()}`);
});
page.on('dialog', (d) => d.accept());
const shot = (name, full = true, p = page) => p.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: full });

let failed = false;
console.log(`Kiểm thử bản HTML: ${dir}`);
try {
  await step('Mọi liên kết nội bộ và tài nguyên trỏ tới tệp có thật', async () => {
    const files = [];
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') && files.push(path.join(d, e.name))));
    walk(dir);
    const broken = [];
    for (const f of files) {
      const html = fs.readFileSync(f, 'utf8');
      for (const m of html.matchAll(/(?:href|src)="([^"#]+)(#[^"]*)?"/g)) {
        const target = m[1];
        if (/^(https?:|data:|mailto:)/.test(target)) continue;
        if (!fs.existsSync(path.resolve(path.dirname(f), decodeURIComponent(target)))) broken.push(`${path.relative(dir, f)} → ${target}`);
      }
    }
    assert.deepEqual(broken, []);
    assert.ok(files.length >= 90, `số trang: ${files.length}`);
  });

  await step('Trang chủ mở bằng file://: đủ khu vực, công thức KaTeX, phông KaTeX nạp được', async () => {
    await page.goto(url('index.html'));
    for (const h of ['Chọn khối lớp', 'Tiếp tục học', 'Chủ đề nổi bật', 'Bài tập mới', 'Thống kê tiến độ', 'Thử thách Toán học', 'Thành tích học tập']) {
      assert.ok(await page.getByRole('heading', { name: h }).count(), `thiếu ${h}`);
    }
    await page.getByText('Em chưa mở bài học nào').waitFor();
    assert.ok((await page.locator('.katex').count()) > 0);
    assert.ok(await page.evaluate(() => document.fonts.check('16px KaTeX_Main')), 'phông KaTeX');
    await shot('01-trang-chu');
  });

  await step('Bài học: nội dung, đánh dấu học xong, tiến độ cập nhật ở mục lục', async () => {
    await page.goto(url('bai/bai-1-don-thuc.html'));
    for (const h of [/Giới thiệu bài học/, /Mục tiêu cần đạt/, /Khám phá kiến thức mới/, /CÔNG THỨC CẦN NHỚ/, /Ví dụ minh họa/, /Hướng dẫn giải các dạng toán/, /Luyện tập/, /Ghi chú của em/])
      assert.ok(await page.getByRole('heading', { name: h }).count(), `thiếu ${h}`);
    assert.equal(await page.locator('.math-error').count(), 0);
    await page.click('button:has-text("Đánh dấu đã học xong")');
    const msg = await page.locator('[role=status]').first().textContent();
    assert.match(msg, /\+30 XP/); // 20 XP bài học + 10 XP huy hiệu "Bước chân đầu tiên"
    assert.match(msg, /Bước chân đầu tiên/);
    await shot('02-bai-hoc');
    await page.goto(url('muc-luc.html'));
    assert.equal(await page.locator('.ml-status.is-done').count(), 1);
    await page.goto(url('index.html'));
    await page.getByText('Mở bài học').waitFor();
  });

  await step('Bài học đầy đủ: lời giải từng bước, yêu thích, ghi chú lưu trên máy, góc học tập, công thức, tìm kiếm', async () => {
    await page.goto(url('bai/bai-1-don-thuc.html'));
    const ex = page.locator('[data-example]').nth(1);
    await ex.locator('details[data-steps-root] > summary').click();
    assert.equal(await ex.locator('[data-step]:visible').count(), 1);
    await ex.locator('[data-step-all]').click();
    assert.ok(await ex.locator('[data-after-steps]:visible').count());
    await page.click('[data-fav-lesson]');
    assert.equal(await page.getAttribute('[data-fav-lesson]', 'aria-pressed'), 'true');
    await page.locator('[data-fav-formula]').first().click();
    await page.fill('textarea[data-note]', 'Ghi chú bản HTML');
    await page.waitForTimeout(800);
    await page.reload();
    assert.equal(await page.inputValue('textarea[data-note]'), 'Ghi chú bản HTML', 'ghi chú còn sau khi tải lại');
    assert.equal(await page.locator('[data-fav-formula]').first().textContent(), '★');
    assert.ok(await ex.locator('[data-viewed-badge]').isVisible(), 'nhớ ví dụ đã xem');
    await page.goto(url('goc-hoc-tap.html'));
    const corner = await page.locator('main').textContent();
    for (const t of ['Bài 1. Đơn thức', 'Ghi chú bản HTML', 'Công thức yêu thích (1)', 'Ví dụ em đã xem lời giải (1)']) assert.ok(corner.includes(t), `góc học tập thiếu "${t}"`);
    await shot('02b-goc-hoc-tap');
    await page.goto(url('cong-thuc.html'));
    const all = await page.locator('[data-formula]:visible').count();
    await page.fill('[data-formula-filter]', 'dong dang');
    const f = await page.locator('[data-formula]:visible').count();
    assert.ok(f > 0 && f < all, 'lọc công thức');
    await page.goto(url('tim-kiem.html') + '?q=don%20thuc%20dong%20dang');
    await page.locator('main a[href*="bai-1-don-thuc"]').first().waitFor();
    // mọi đích trong chỉ mục tìm kiếm là tệp có thật
    const hrefs = await page.evaluate(() => window.ML_SEARCH.map((e) => e.href));
    for (const h of hrefs) assert.ok(fs.existsSync(path.join(dir, h.split('#')[0])), `chỉ mục tìm kiếm trỏ tới tệp thiếu: ${h}`);
    await shot('02c-tim-kiem', false);
  });

  await step('Luyện tập: chấm ngay trong trình duyệt, lời giải, tổng kết, XP', async () => {
    await page.goto(url('luyen-tap/bai-1-don-thuc.html'));
    const art = page.locator('article');
    await art.waitFor();
    const pool = await page.evaluate(() => JSON.parse(document.getElementById('du-lieu-luyen-tap').textContent).questions.length);
    let n = 0;
    for (;;) {
      if (await art.locator('[aria-label="Chọn phương án"]').count()) await art.locator('[role=radio]').nth(1).click();
      else if (await art.locator('[aria-label^="Ý "]').count()) {
        const g = art.locator('[aria-label^="Ý "]');
        for (let i = 0; i < (await g.count()); i++) await g.nth(i).locator('button:has-text("Đúng")').click();
      } else if (await art.locator('input[inputmode=decimal]').count()) await art.locator('input[inputmode=decimal]').fill('-6');
      else await art.locator('textarea').fill('Lời giải của em');
      await art.locator('button:has-text("Kiểm tra"), button:has-text("Gửi bài làm")').click();
      await art.locator('[role=status]').waitFor();
      n++;
      if (n === 1) await shot('03-luyen-tap-phan-hoi', false);
      const next = art.locator('button:has-text("Câu tiếp theo")');
      if (await next.count()) await next.click();
      else {
        await art.locator('button:has-text("Xem kết quả")').click();
        break;
      }
    }
    await page.getByRole('heading', { name: 'Kết quả lượt luyện tập' }).waitFor();
    assert.equal(n, Math.min(10, pool));
    await shot('04-luyen-tap-tong-ket', false);
  });

  await step('Thử thách và trang luyện tập theo chương', async () => {
    await page.goto(url('thu-thach.html'));
    await page.locator('article').waitFor();
    await page.goto(url('luyen-tap/chuong-ii.html'));
    await page.locator('article').waitFor();
    await page.goto(url('luyen-tap.html'));
    await shot('05-luyen-tap');
  });

  await step('Tiến độ & thành tích: số liệu lưu trên máy, sao lưu và khôi phục', async () => {
    await page.goto(url('tien-do.html'));
    await page.getByText('Điểm kinh nghiệm', { exact: true }).waitFor();
    const text = await page.locator('main').textContent();
    assert.match(text, /1\/\d+ mục học xong/);
    assert.match(text, /Câu #\d+/);
    await shot('06-tien-do');
    const [download] = await Promise.all([page.waitForEvent('download'), page.click('button:has-text("Tải tệp sao lưu")')]);
    const backup = path.join(SHOTS, 'sao-luu.json');
    await download.saveAs(backup);
    await page.click('button:has-text("Xóa tiến độ")');
    await page.getByText('Đã xóa tiến độ').waitFor();
    assert.match(await page.locator('main').textContent(), /0\/\d+ mục học xong/);
    await page.setInputFiles('input[type=file]', backup);
    await page.getByText('Đã khôi phục tiến độ').waitFor();
    assert.match(await page.locator('main').textContent(), /1\/\d+ mục học xong/);
  });

  await step('Chương trình, PPCT, trình chiếu và giao diện điện thoại', async () => {
    await page.goto(url('ppct.html'));
    assert.equal(await page.locator('tbody tr').count(), 82);
    await page.goto(url('chuong-trinh.html'));
    await page.goto(url('bai/bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu.html'));
    await page.click('[data-present-toggle]');
    assert.ok(await page.evaluate(() => document.documentElement.classList.contains('present')));
    await shot('07-trinh-chieu', false);
    await page.click('[data-present-toggle]');
    const m = await ctx.newPage();
    await m.setViewportSize({ width: 390, height: 844 });
    await m.goto(url('index.html'));
    await shot('08-dien-thoai', true, m);
    await m.close();
  });

  await step('Không có lỗi JavaScript', async () => {
    assert.deepEqual(pageErrors, []);
  });
} catch {
  failed = true;
} finally {
  await browser.close();
}
const ok = results.filter((r) => r.ok).length;
console.log(`\n${ok}/${results.length} bước đạt.${failed ? ' CÓ LỖI.' : ''}`);
if (pageErrors.length) console.log('Lỗi trang:', pageErrors);
process.exit(failed ? 1 : 0);
