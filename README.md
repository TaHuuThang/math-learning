# MATH LEARNING – nền tảng học Toán THCS

Website học Toán cho học sinh THCS Việt Nam (Toán 6–9). Giai đoạn 1 mở **Toán 8 – Kết nối tri thức với cuộc sống (GDPT 2018)**; Toán 6, 7, 9 hiển thị "Sắp ra mắt" và được bổ sung bằng dữ liệu, không phải viết lại hệ thống.

## 1. Chạy website

Cần **PostgreSQL 13 trở lên**. Bản dựng sẵn nằm trong `dist/` – chỉ cần **Node.js 20 trở lên**, không phải cài thư viện nào khác.

### Cách A – Docker (gọn nhất, cho máy chủ trường)
```bash
docker compose up -d          # chạy PostgreSQL + website
# mở http://localhost:3000
```

### Cách B – Máy tính Windows / macOS có sẵn PostgreSQL
1. Cài Node.js (bản LTS) từ nodejs.org và PostgreSQL từ postgresql.org.
2. Tạo cơ sở dữ liệu trống, ví dụ trong pgAdmin hoặc `psql`:
   ```sql
   create user mathapp with password 'doi_mat_khau_nay';
   create database math_learning owner mathapp;
   ```
3. Sao chép `.env.example` thành `.env`, sửa dòng `DATABASE_URL`.
4. Windows: bấm đúp `CHAY-MATH-LEARNING.bat`. macOS/Linux: `./chay-math-learning.sh` (hoặc `npm start`).
5. Mở `http://localhost:3000`. Học sinh cùng mạng Wi‑Fi/LAN của trường mở `http://<địa-chỉ-IP-máy-giáo-viên>:3000`.

### Cách C – Đưa lên Internet
Dùng PostgreSQL đám mây (Neon, Supabase…) và một dịch vụ chạy Node.js/Docker (Render, Railway, Fly.io, VPS):
- `DATABASE_URL=postgres://…?sslmode=require` (`verify-full` để kiểm tra chứng chỉ), `TRUST_PROXY=1`.
- Lệnh chạy: `node dist/server.mjs serve`. Kiểm tra sống: `GET /api/suc-khoe`.

### Cách D – Bản HTML mở thẳng, không cần máy chủ
```bash
node dist/server.mjs export-html --out math-learning-html
```
Lệnh tạo thư mục gồm `index.html` và khoảng 100 trang (mục lục, PPCT, 74 bài học, luyện tập từng bài/chương, thử thách, tiến độ). Mở `index.html` bằng Chrome/Edge/Firefox, hoặc đưa cả thư mục lên Google Drive, GitHub Pages, Netlify, trang web trường. Bài làm chấm ngay trong trình duyệt; tiến độ, XP, huy hiệu lưu trên máy đang dùng (có nút sao lưu/khôi phục). Bản HTML không có tài khoản, lớp, đề kiểm tra, chấm tự luận, bảng xếp hạng, và đáp án nằm trong mã trang – dùng để tự học, không dùng để kiểm tra lấy điểm. Nội dung lấy từ CSDL lúc xuất: soạn thêm bài/câu hỏi trên bản máy chủ rồi xuất lại.

### Lần đầu khởi động
Hệ thống tự tạo bảng, nạp chương trình Toán 8 (12 chương/mục trải nghiệm, 74 mục bài, 82 dòng phân phối chương trình 2026‑2027, 30 câu hỏi mẫu, 10 huy hiệu) rồi mời **tạo tài khoản quản trị** tại `/cai-dat-ban-dau`. Trang này tự khóa khi đã có quản trị viên. Có thể tạo bằng dòng lệnh:
```bash
node dist/server.mjs create-admin --username admin --password MatKhau2026 --name "Tạ Hữu Thắng"
```
Thứ tự dùng: quản trị tạo tài khoản giáo viên → giáo viên tạo lớp (có mã lớp) → học sinh đăng ký kèm mã lớp hoặc giáo viên tạo tài khoản trong lớp.

## GitHub và đường link cho học sinh (GitHub Pages)
Kho GitHub chứa mã nguồn, bản dựng chạy được `dist/` và bản HTML `docs/`.

**Bật đường link (làm một lần):** trên trang kho GitHub → **Settings** → **Pages** → *Source*: **Deploy from a branch** → *Branch*: **main**, thư mục **/docs** → **Save**. Sau khoảng 1 phút, bản HTML có ở `https://<tên-tài-khoản>.github.io/<tên-kho>/`. GitHub Pages miễn phí cần kho để chế độ **Public**.

**Mỗi lần cập nhật:**
```bash
npm run build      # dựng lại dist/ khi sửa mã
npm run docs       # xuất lại bản HTML vào docs/ (trang cũ được thay sạch)
git add -A && git commit -m "Nội dung cập nhật" && git push
```
Đường link GitHub Pages tự cập nhật khoảng 1 phút sau khi đẩy lên. Máy chủ trường (nếu có) lấy bản mới bằng `git pull` rồi khởi động lại `CHAY-MATH-LEARNING.bat`.

Tệp `.env` (mật khẩu CSDL) không bao giờ được đưa lên GitHub (đã khai báo trong `.gitignore`).

## 2. Lệnh cho người phát triển
```bash
npm install            # cài công cụ dựng (cần mạng)
npm run build          # dựng dist/
npm run dev            # dựng lại + khởi động lại khi sửa mã
npm run typecheck      # kiểm tra kiểu TypeScript
npm test               # kiểm thử đơn vị; thêm TEST_DATABASE_URL=… để chạy cả kiểm thử PostgreSQL
E2E_DATABASE_URL=postgres://…/csdl_trong npm run test:e2e   # kiểm thử đầu-cuối bằng Chromium
node dist/server.mjs migrate | seed | create-admin | serve | export-html
node test/e2e/static.mjs math-learning-html   # kiểm thử bản HTML (mở bằng file://)
```

## 3. Công nghệ và lý do chọn

| Lớp | Lựa chọn | Lý do |
|---|---|---|
| Giao diện | **React 19 + TypeScript**, dựng trên máy chủ (SSR) + "đảo tương tác" | Trang tải nhanh trên máy yếu/phòng máy, vẫn chạy khi JavaScript lỗi; chỉ phần cần tương tác (luyện tập, làm bài, soạn công thức) mới nạp React. |
| Kiểu dáng | **Tailwind CSS v4** (màu viết bằng mã hex) | Nhất quán, dễ bảo trì; màu hex chạy được trên trình duyệt cũ ở trường. |
| Thành phần giao diện | Bộ thành phần riêng trong `src/ui/components` (nút, ô nhập, bảng, huy hiệu…) + biểu tượng Lucide | Không phụ thuộc thư viện ngoài; phong cách "vở ô li – mực tím" riêng. |
| Máy chủ | **Node.js** thuần (`node:http`), bộ định tuyến và phiên đăng nhập tự viết | Bản dựng `dist/server.mjs` là **một tệp chạy được ngay**, không cần `node_modules` – dễ cài ở trường. |
| Cơ sở dữ liệu | **PostgreSQL**, migration SQL, trình kết nối giao thức PostgreSQL v3 viết sẵn (SCRAM‑SHA‑256, SSL, nhóm kết nối, giao dịch) | Quan hệ rõ ràng, ràng buộc toàn vẹn; truy vấn luôn có tham số (chống SQL injection). |
| Công thức | **KaTeX** (dựng trên máy chủ, phông đi kèm) | Công thức hiển thị ngay, không cần mạng, đúng cú pháp LaTeX giáo viên quen dùng. |
| Hình học | **SVG** từ mô tả văn bản (`A(0,3) B(-2,0)… ABCA vuong(A,H,C)`) | Hình nét, phóng to khi trình chiếu, lưu gọn trong CSDL, sửa được bằng chữ. |

Ghi chú: yêu cầu ban đầu đề xuất Next.js. Môi trường xây dựng không tải được gói npm nên dự án dùng React + Node.js trực tiếp; kiến trúc (SSR, module, phân quyền, PostgreSQL) tương đương và có thể chuyển sang Next.js sau mà giữ nguyên `src/domain`, `src/shared`, `migrations`.

## 4. Cấu trúc thư mục
```
migrations/001_init.sql        Lược đồ CSDL (tự áp dụng khi khởi động)
src/
  server/
    main.ts                    Điểm vào: serve | migrate | seed | create-admin
    config.ts                  Đọc .env và cấu hình
    routes.ts                  Bảng định tuyến trang học sinh, tài khoản
    http/                      Máy chủ HTTP, bộ định tuyến, ngữ cảnh yêu cầu, dựng trang React
    db/                        Trình kết nối PostgreSQL (pg/), câu SQL có tham số (sql.ts), migration
    auth/                      Băm mật khẩu scrypt, phiên đăng nhập, giới hạn đăng nhập sai, phân quyền
    handlers/                  Xử lý từng trang: home, curriculum, practice, tests-student, profile, auth, admin
      teacher/                 Dashboard giáo viên: overview, classes, content, questions, tests, stats
  domain/                      Nghiệp vụ + truy vấn: curriculum, progress, questions, practice, tests,
                               classes, users, gamification, stats
  shared/                      Dùng chung máy chủ & trình duyệt: chấm điểm, văn bản có công thức, hình vẽ SVG, nhãn
  islands/                     Thành phần tương tác: PracticeRunner, TestRunner, RichField, FigureField
  ui/                          Bố cục (SiteLayout, DashboardLayout, AuthLayout) và thành phần giao diện
  client/main.tsx              Gắn React cho các đảo, xác nhận thao tác, chế độ trình chiếu
  static/                      Bản HTML ngoại tuyến: xuất trang (export.tsx), lưu tiến độ trong trình duyệt (store.ts),
                               luyện tập chấm trên máy (LocalPractice.tsx), bảng tiến độ (panels.tsx)
  seed/                        Dữ liệu khởi tạo: cấu trúc Toán 8 + PPCT, nội dung bài mẫu, câu hỏi mẫu, huy hiệu
  styles/app.css               Hệ màu, lưới ô li, khung công thức, chế độ trình chiếu
scripts/                       build.mjs, dev.mjs, test.mjs
test/unit                      Kiểm thử chấm điểm, nội dung, hình vẽ, trình kết nối PostgreSQL
test/e2e/run.mjs               Kiểm thử đầu-cuối 20 bước bằng Chromium
dist/                          Bản dựng chạy được (server.mjs + public/assets)
```

## 5. Cơ sở dữ liệu
Không có gì "cứng" cho Toán 8: môn → khối → **bộ sách (textbooks)** → học kì → chương → bài.

| Nhóm | Bảng |
|---|---|
| Người dùng | `roles`, `users`, `students`, `teachers`, `sessions`, `login_attempts`, `audit_logs` |
| Lớp học | `classes` (mã lớp), `class_members` |
| Chương trình | `subjects`, `grades`, `textbooks`, `semesters`, `chapters`, `lessons`, `lesson_sections`, `topics` (dạng toán), `teaching_plans`, `teaching_plan_items` (PPCT theo năm học) |
| Câu hỏi | `exercise_types` (5 hình thức), `questions`, `answers` (phương án/ý/đáp án), `solutions` (lời giải, gợi ý), `images`, `question_images` |
| Kiểm tra | `tests`, `test_questions`, `test_assignments`, `test_results` |
| Học tập | `question_responses` (mọi lượt trả lời), `learning_progress`, `xp_events`, `achievements`, `user_achievements` |

**Thêm Toán 6/7/9:** thêm một tệp trong `src/seed/` theo mẫu `toan8-structure.ts` (chương, bài, PPCT) và gọi trong `seed/run.ts`, rồi vào **Quản trị → Khối lớp** chuyển khối đó sang "Đang mở". Có thể thêm nhiều bộ sách cho một khối (`series_code` khác nhau).

## 6. Chức năng đã hoạt động
- **Trang chủ**: đủ các khu vực theo yêu cầu, dữ liệu thật từ CSDL; Toán 8 vào được, 6/7/9 "Sắp ra mắt".
- **Chương trình học**: Toán 8 → Học kì → Chương → Bài; mục lục có tiến độ; trang phân phối chương trình 2026‑2027 (82 dòng, 140 tiết, 35 tuần).
- **Trang bài học**: mục tiêu, kiến thức, công thức (khung "ghi nhớ"), ví dụ có lời giải ẩn/hiện, các dạng toán và phương pháp, bài tập; thanh bên chương/bài/tiến độ; đánh dấu học xong; **chế độ trình chiếu** (chữ to, ẩn thanh bên, toàn màn hình).
- **Luyện tập** đủ 5 hình thức: trắc nghiệm 4 phương án, Đúng/Sai 4 ý (thang 0,1–0,25–0,5–1), trả lời ngắn (hiểu 0,5 = 0.5 = 1/2, có sai số, đơn vị), tự luận và tự luận hình học có hình vẽ (giáo viên chấm). Chấm ngay, hiện lời giải, ưu tiên câu chưa làm đúng; **Thử thách Toán học** (câu vận dụng – vận dụng cao).
- **Kiểm tra**: giáo viên tạo đề từ ngân hàng, giao lớp, đặt thời gian/khung mở–đóng/số lần làm; học sinh làm bài có đồng hồ theo giờ máy chủ, tự lưu nháp, hết giờ tự nộp; chấm tự động + giáo viên chấm tự luận kèm nhận xét; thống kê tỉ lệ đúng từng câu.
- **Thành tích**: điểm kinh nghiệm (mỗi sự kiện chỉ cộng một lần), cấp độ, 10 huy hiệu, bảng xếp hạng (tất cả / 7 ngày / theo lớp).
- **Trang cá nhân học sinh**: thông tin, khối lớp, lớp, tiến độ theo chương, bài đang học, số câu đã làm, tỉ lệ chính xác, XP, huy hiệu, lịch sử luyện tập, vào lớp bằng mã, đổi mật khẩu.
- **Giáo viên**: tổng quan; lớp học (mã lớp, tạo tài khoản học sinh, đặt lại mật khẩu); học sinh; chương trình & soạn bài (mục nội dung có xem trước công thức trực tiếp, dạng toán, trạng thái xuất bản); ngân hàng câu hỏi (lọc, soạn 5 hình thức với xem trước KaTeX và hình vẽ, nhân bản, xóa an toàn → lưu trữ); đề kiểm tra; chấm bài; thống kê theo chương, câu hay sai, điểm trung bình.
- **Quản trị**: tài khoản (tạo giáo viên/quản trị, khóa/mở khóa, đặt lại mật khẩu), trạng thái khối lớp, thông tin hệ thống, nhật ký thao tác.

## 7. Bảo mật
Mật khẩu băm **scrypt** có muối; phiên lưu bằng mã băm SHA‑256, cookie `HttpOnly; SameSite=Lax` (+`Secure` khi HTTPS); chống **CSRF** (mã double‑submit + kiểm tra Origin); khóa tạm sau 5 lần đăng nhập sai/15 phút; phân quyền ở mọi trang và API (học sinh/giáo viên/quản trị, giáo viên chỉ thấy lớp và đề của mình); mọi truy vấn có tham số; văn bản người dùng luôn được escape (KaTeX `trust: false`); tiêu đề CSP, X‑Frame‑Options, nosniff; chống chuyển hướng mở; đáp án không gửi xuống trình duyệt trước khi chấm.

## 8. Chưa làm ở giai đoạn này
- Nội dung lý thuyết đầy đủ mới có ở Chương I, Chương II, Bài 10 và Bài 35 (11 mục); các bài khác đã có cấu trúc, số tiết, dạng toán và hiện thông báo "đang được biên soạn". Giáo viên soạn tiếp trong **Chương trình & bài học**.
- Ngân hàng câu hỏi mới có 30 câu mẫu (Chương I, II, Bài 10, 11, 35).
- Chưa có: tải ảnh lên cho câu hỏi (bảng `images` đã hỗ trợ, giao diện chưa có nút tải), nhập câu hỏi từ Word/Excel, quên mật khẩu qua email, GeoGebra nhúng, ứng dụng di động riêng.
- Kiểm tra kiểu TypeScript trong môi trường xây dựng dùng khai báo React rút gọn (`tsconfig.offline.json`) vì không tải được `@types/react`; khi có mạng hãy chạy `npm install && npm run typecheck`.
