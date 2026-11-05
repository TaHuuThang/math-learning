/** Chương VII. Phương trình bậc nhất và hàm số bậc nhất – nội dung bài học giai đoạn 3 (Bài 25 – Bài 29). */
import { ex, fc, r, th, type LessonContent } from './types';

const BAI_25: LessonContent = {
  slug: 'bai-25-phuong-trinh-bac-nhat-mot-an',
  applications: r`- Tìm một số lượng chưa biết từ dữ kiện: số vé, số sản phẩm, số tiền.
- Tính ngược trong công thức vật lí, hóa học: biết \(s\), \(v\) tìm \(t\).
- Là công cụ để giải bài toán bằng cách lập phương trình (Bài 26).`,
  theory: [
    th('definition', 'Phương trình một ẩn và nghiệm', r`- Phương trình ẩn \(x\) có dạng \(A(x) = B(x)\), trong đó vế trái \(A(x)\) và vế phải \(B(x)\) là hai biểu thức của cùng biến \(x\).
- Giá trị \(x = x_0\) làm hai vế có cùng giá trị gọi là **nghiệm** của phương trình.
- **Giải phương trình** là tìm tất cả các nghiệm của phương trình đó.`, undefined,
      r`\(x = 2\) là nghiệm của \(3x - 1 = x + 3\) vì hai vế cùng bằng 5.`),
    th('definition', 'Phương trình bậc nhất một ẩn', r`Phương trình dạng \(ax + b = 0\), với \(a\), \(b\) là hai số đã cho và \(a \ne 0\), gọi là **phương trình bậc nhất một ẩn**.`, r`ax + b = 0\quad (a \ne 0)`,
      r`\(2x - 3 = 0\) (\(a = 2\), \(b = -3\)); \(3 - 0{,}5y = 0\) (\(a = -0{,}5\), \(b = 3\)).`),
    th('rule', 'Hai quy tắc biến đổi phương trình', r`- **Quy tắc chuyển vế**: chuyển một hạng tử từ vế này sang vế kia và đổi dấu hạng tử đó.
- **Quy tắc nhân (chia)**: nhân (hoặc chia) cả hai vế với cùng một số khác 0.`),
    th('rule', 'Cách giải phương trình bậc nhất một ẩn', r`Phương trình \(ax + b = 0\) (\(a \ne 0\)) có nghiệm duy nhất:`, r`ax + b = 0 \iff ax = -b \iff x = -\dfrac{b}{a}`,
      r`\(3x - 12 = 0 \iff 3x = 12 \iff x = 4\).`),
    th('rule', 'Phương trình đưa được về dạng ax + b = 0', r`- Bỏ dấu ngoặc (hoặc quy đồng mẫu rồi khử mẫu).
- Chuyển các hạng tử chứa ẩn sang một vế, các hằng số sang vế kia.
- Thu gọn và giải phương trình nhận được.`),
    th('special', 'Trường hợp đặc biệt', r`Sau khi thu gọn được \(0x = c\):
- Nếu \(c \ne 0\): phương trình **vô nghiệm**.
- Nếu \(c = 0\): phương trình **nghiệm đúng với mọi** \(x\).`),
    th('note', 'Lưu ý', r`Khi khử mẫu, nhân **mọi hạng tử** của cả hai vế với mẫu chung; tử là đa thức thì đặt trong ngoặc.`),
  ],
  formulas: [
    {
      group: 'Giải phương trình',
      items: [
        fc('Nghiệm của phương trình bậc nhất', r`ax + b = 0 \iff x = -\dfrac{b}{a}`, r`- \(a \ne 0\), \(b\): hệ số`, r`\(5 - 2x = 0 \iff x = \dfrac52\).`, r`\(a \ne 0\).`),
        fc('Chuyển vế', r`A + B = C \iff A = C - B`, r`- \(A, B, C\): biểu thức`, r`\(x + 7 = 10 \iff x = 3\).`),
        fc('Nhân hai vế', r`A = B \iff kA = kB`, r`- \(k\): số khác 0`, r`\(\dfrac{x}{3} = 2 \iff x = 6\).`, r`\(k \ne 0\).`),
      ],
    },
  ],
  examples: {
    'kiem-tra-nghiem': [
      ex(1, r`\(x = 2\) có phải là nghiệm của phương trình \(3x - 1 = x + 3\) không?`,
        'Thay \\(x = 2\\) vào từng vế rồi so sánh.',
        'Nghiệm của phương trình.',
        [r`Vế trái: \(3\cdot2 - 1 = 5\); vế phải: \(2 + 3 = 5\).`, r`Hai vế bằng nhau nên \(x = 2\) là nghiệm.`],
        r`\(x = 2\) là nghiệm.`),
      ex(2, r`Trong các số \(-1\); \(0\); \(2\), số nào là nghiệm của phương trình \(x^2 - x = 2\)?`,
        'Thay lần lượt từng số vào vế trái và so sánh với 2.',
        'Nghiệm của phương trình.',
        [r`\(x = -1\): \(1 + 1 = 2\). Đúng.`, r`\(x = 0\): \(0 - 0 = 0 \ne 2\).`, r`\(x = 2\): \(4 - 2 = 2\). Đúng.`],
        r`Các nghiệm là \(-1\) và \(2\).`,
        'Một phương trình có thể có nhiều nghiệm; phải thử hết các số.'),
    ],
    'nhan-dang-phuong-trinh-bac-nhat': [
      ex(1, r`Trong các phương trình sau, phương trình nào là phương trình bậc nhất một ẩn? Chỉ ra hệ số \(a\), \(b\).
\(2x - 3 = 0\); \(x^2 + 1 = 0\); \(0x + 5 = 0\); \(3 - 0{,}5y = 0\); \(\dfrac1x + 2 = 0\).`,
        'So sánh với dạng \\(ax + b = 0\\), \\(a \\ne 0\\).',
        'Định nghĩa phương trình bậc nhất một ẩn.',
        [r`\(2x - 3 = 0\): bậc nhất, \(a = 2\), \(b = -3\). \(3 - 0{,}5y = 0\): bậc nhất ẩn \(y\), \(a = -0{,}5\), \(b = 3\).`, r`\(x^2 + 1 = 0\) có \(x^2\); \(0x + 5 = 0\) có \(a = 0\); \(\dfrac1x + 2 = 0\) có ẩn ở mẫu: không phải phương trình bậc nhất.`],
        r`Hai phương trình bậc nhất: \(2x - 3 = 0\) và \(3 - 0{,}5y = 0\).`),
    ],
    'giai-phuong-trinh-bac-nhat': [
      ex(1, r`Giải phương trình \(3x - 12 = 0\).`,
        'Chuyển vế hằng số rồi chia cho hệ số của \\(x\\).',
        'Quy tắc chuyển vế, quy tắc chia.',
        [r`\(3x = 12\).`, r`\(x = 4\).`],
        r`Phương trình có nghiệm \(x = 4\).`),
      ex(2, r`Giải các phương trình: a) \(5 - 2x = 0\); b) \(\dfrac12x + 3 = 0\).`,
        'Hệ số của \\(x\\) âm hoặc là phân số: vẫn chuyển vế rồi chia (hoặc nhân với nghịch đảo).',
        'Cách giải phương trình bậc nhất.',
        [r`a) \(-2x = -5 \iff x = \dfrac52\).`, r`b) \(\dfrac12x = -3 \iff x = -6\).`],
        r`a) \(x = \dfrac52\); b) \(x = -6\).`),
    ],
    'phuong-trinh-dua-ve-ax-b': [
      ex(2, r`Giải phương trình \(2(x - 3) + 5 = x + 4\).`,
        'Bỏ ngoặc, chuyển vế, thu gọn.',
        'Phương trình đưa được về dạng \\(ax + b = 0\\).',
        [r`\(2x - 6 + 5 = x + 4\).`, r`\(2x - x = 4 + 1\).`, r`\(x = 5\).`],
        r`\(x = 5\).`),
      ex(3, r`Giải phương trình \(\dfrac{x - 1}{2} - \dfrac{x + 1}{3} = 1\).`,
        'Quy đồng với mẫu chung 6 rồi khử mẫu; đặt tử trong ngoặc.',
        'Quy đồng, khử mẫu; quy tắc chuyển vế.',
        [r`Nhân hai vế với 6: \(3(x - 1) - 2(x + 1) = 6\).`, r`\(3x - 3 - 2x - 2 = 6\).`, r`\(x - 5 = 6 \iff x = 11\).`],
        r`\(x = 11\).`,
        'Lỗi thường gặp: quên đặt \\(x + 1\\) trong ngoặc nên chỉ đổi dấu \\(x\\) mà không đổi dấu 1.'),
      ex(4, r`Giải các phương trình: a) \((x + 2)^2 - x(x - 1) = 10\); b) \(3(x - 1) = 3x + 2\); c) \(2(x + 1) - 3 = 2x - 1\).`,
        'Khai triển, thu gọn; chú ý các trường hợp hệ số của \\(x\\) bằng 0.',
        r`Hằng đẳng thức; phương trình dạng \(0x = c\).`,
        [r`a) \(x^2 + 4x + 4 - x^2 + x = 10 \iff 5x = 6 \iff x = \dfrac65\).`, r`b) \(3x - 3 = 3x + 2 \iff 0x = 5\): phương trình vô nghiệm.`, r`c) \(2x - 1 = 2x - 1 \iff 0x = 0\): phương trình nghiệm đúng với mọi \(x\).`],
        r`a) \(x = \dfrac65\); b) vô nghiệm; c) nghiệm đúng với mọi \(x\).`,
        'Không phải phương trình nào cũng có đúng một nghiệm – luôn xét trường hợp \\(0x = c\\).'),
    ],
    'tim-x-de-bieu-thuc-nhan-gia-tri': [
      ex(2, r`Tìm \(x\) để biểu thức \(A = 3x - 7\) có giá trị bằng 8.`,
        'Lập phương trình \\(A = 8\\) rồi giải.',
        'Giải phương trình bậc nhất.',
        [r`\(3x - 7 = 8\).`, r`\(3x = 15 \iff x = 5\).`],
        r`\(x = 5\).`),
      ex(3, r`Tìm \(x\) để hai biểu thức \(\dfrac{2x + 1}{3}\) và \(\dfrac{x - 2}{2}\) có giá trị bằng nhau.`,
        'Cho hai biểu thức bằng nhau để được phương trình; khử mẫu.',
        'Phương trình đưa về dạng \\(ax + b = 0\\).',
        [r`\(\dfrac{2x + 1}{3} = \dfrac{x - 2}{2}\).`, r`Nhân hai vế với 6: \(2(2x + 1) = 3(x - 2) \iff 4x + 2 = 3x - 6\).`, r`\(x = -8\). Thử lại: hai biểu thức cùng bằng \(-5\).`],
        r`\(x = -8\).`),
    ],
    'thuc-te-dan-toi-phuong-trinh': [
      ex(3, r`Vé vào một công viên: người lớn 50 000 đồng, trẻ em 30 000 đồng. Một nhóm gồm 3 người lớn và một số trẻ em đã trả tổng cộng 330 000 đồng. Nhóm có bao nhiêu trẻ em?`,
        'Gọi số trẻ em là \\(x\\); tổng tiền = tiền vé người lớn + tiền vé trẻ em.',
        'Lập và giải phương trình bậc nhất.',
        [r`Gọi số trẻ em là \(x\) (\(x\) nguyên dương).`, r`Phương trình: \(3\cdot50\,000 + 30\,000x = 330\,000\).`, r`\(30\,000x = 180\,000 \iff x = 6\) (thỏa mãn).`],
        'Nhóm có 6 trẻ em.'),
    ],
  },
  notes: {
    'kiem-tra-nghiem': 'Thay giá trị vào cả hai vế, tính riêng từng vế rồi so sánh.',
    'nhan-dang-phuong-trinh-bac-nhat': 'Phải đưa về đúng dạng \\(ax + b = 0\\) và kiểm tra \\(a \\ne 0\\); ẩn không ở mẫu, không có lũy thừa bậc cao.',
    'giai-phuong-trinh-bac-nhat': 'Chuyển vế nhớ đổi dấu; chia hai vế cho hệ số của ẩn (khác 0).',
    'phuong-trinh-dua-ve-ax-b': 'Bỏ ngoặc, khử mẫu cẩn thận; nếu thu được \\(0x = c\\) thì kết luận vô nghiệm hoặc vô số nghiệm.',
    'tim-x-de-bieu-thuc-nhan-gia-tri': 'Chuyển yêu cầu “biểu thức bằng…” thành phương trình rồi giải; thử lại kết quả.',
    'thuc-te-dan-toi-phuong-trinh': 'Chọn ẩn và điều kiện phù hợp thực tế (nguyên dương), đối chiếu điều kiện trước khi trả lời.',
  },
};

const BAI_26: LessonContent = {
  slug: 'bai-26-giai-bai-toan-bang-cach-lap-phuong-trinh',
  applications: r`- Tính quãng đường, vận tốc, thời gian trong giao thông; thời điểm hai xe gặp nhau.
- Lập kế hoạch sản xuất, tính năng suất, số sản phẩm.
- Tính giá trước và sau khi giảm giá, lãi suất, dân số tăng theo tỉ lệ phần trăm.`,
  theory: [
    th('rule', 'Các bước giải bài toán bằng cách lập phương trình', r`- **Bước 1. Lập phương trình**: chọn ẩn, ghi đơn vị và điều kiện; biểu diễn các đại lượng chưa biết theo ẩn; lập phương trình biểu thị mối quan hệ giữa các đại lượng.
- **Bước 2. Giải phương trình**.
- **Bước 3. Trả lời**: kiểm tra nghiệm có thỏa mãn điều kiện của ẩn không rồi kết luận.`),
    th('concept', 'Các dạng toán thường gặp', r`- Chuyển động: \(s = v\cdot t\).
- Năng suất: khối lượng công việc = năng suất × thời gian.
- Tỉ số phần trăm: tăng \(p\%\) thì giá trị mới bằng \((1 + p\%)\) lần giá trị cũ.
- Hình học: chu vi, diện tích.
- Quan hệ giữa các số, tuổi.`),
    th('rule', 'Chuyển động trên dòng nước', r`Vận tốc xuôi dòng bằng vận tốc riêng cộng vận tốc dòng nước; vận tốc ngược dòng bằng vận tốc riêng trừ vận tốc dòng nước.`, r`v_{\text{xuôi}} = v_{\text{riêng}} + v_{\text{nước}};\quad v_{\text{ngược}} = v_{\text{riêng}} - v_{\text{nước}}`),
    th('note', 'Lưu ý', r`- Thường chọn ẩn là đại lượng đề bài hỏi.
- Thống nhất đơn vị (phút – giờ, m – km) trước khi lập phương trình.
- Lập bảng các đại lượng giúp nhìn rõ quan hệ.`),
  ],
  formulas: [
    {
      group: 'Chuyển động',
      items: [
        fc('Quãng đường – vận tốc – thời gian', r`s = v\cdot t`, r`- \(s\): quãng đường; \(v\): vận tốc; \(t\): thời gian`, r`\(v = 40\) km/h, \(t = 3\) giờ: \(s = 120\) km.`, 'Cùng hệ đơn vị.'),
        fc('Xuôi dòng, ngược dòng', r`v_{\text{xuôi}} = v + v_n,\quad v_{\text{ngược}} = v - v_n`, r`- \(v\): vận tốc riêng; \(v_n\): vận tốc dòng nước`, r`\(v = 18\), \(v_n = 2\): xuôi 20 km/h, ngược 16 km/h.`),
      ],
    },
    {
      group: 'Năng suất, phần trăm, hình học',
      items: [
        fc('Khối lượng công việc', r`A = N\cdot t`, r`- \(A\): khối lượng công việc; \(N\): năng suất; \(t\): thời gian`, r`50 sản phẩm/ngày trong 10 ngày: 500 sản phẩm.`),
        fc('Tăng, giảm theo phần trăm', r`a_{\text{mới}} = a\,(1 \pm p\%)`, r`- \(a\): giá trị ban đầu; \(p\%\): tỉ lệ tăng (+) hoặc giảm (−)`, r`Giảm 20% từ 300 000 đồng còn \(300\,000\cdot0{,}8 = 240\,000\) đồng.`),
        fc('Chu vi, diện tích hình chữ nhật', r`P = 2(a + b),\quad S = a\cdot b`, r`- \(a, b\): chiều dài, chiều rộng`, r`\(a = 17\), \(b = 11\): \(P = 56\).`),
      ],
    },
  ],
  examples: {
    'bai-toan-chuyen-dong': [
      ex(2, r`Một xe máy đi từ A đến B với vận tốc 40 km/h hết nhiều thời gian hơn một ô tô đi với vận tốc 60 km/h là 1 giờ. Tính quãng đường AB.`,
        'Gọi quãng đường là ẩn; thời gian của mỗi xe bằng quãng đường chia vận tốc; hiệu thời gian là 1 giờ.',
        'Công thức \\(t = \\dfrac{s}{v}\\); lập và giải phương trình.',
        [r`Gọi quãng đường AB là \(x\) (km), \(x > 0\).`, r`Thời gian xe máy: \(\dfrac{x}{40}\) giờ; ô tô: \(\dfrac{x}{60}\) giờ. Phương trình: \(\dfrac{x}{40} - \dfrac{x}{60} = 1\).`, r`Nhân hai vế với 120: \(3x - 2x = 120 \iff x = 120\) (thỏa mãn).`],
        'Quãng đường AB dài 120 km.'),
      ex(3, r`Lúc 7 giờ, một xe máy đi từ A về B với vận tốc 40 km/h. Lúc 8 giờ, một ô tô cũng đi từ A về B với vận tốc 60 km/h. Hỏi ô tô đuổi kịp xe máy lúc mấy giờ?`,
        'Khi gặp nhau, hai xe đi được cùng quãng đường từ A; xe máy đi lâu hơn ô tô 1 giờ.',
        'Chuyển động cùng chiều; lập phương trình.',
        [r`Gọi thời gian ô tô đi đến lúc gặp là \(t\) (giờ), \(t > 0\); xe máy đã đi \(t + 1\) giờ.`, r`Phương trình: \(60t = 40(t + 1)\).`, r`\(20t = 40 \iff t = 2\) (thỏa mãn). Thời điểm gặp: \(8 + 2 = 10\) giờ.`],
        'Ô tô đuổi kịp xe máy lúc 10 giờ.',
        'Lập bảng (vận tốc – thời gian – quãng đường) cho từng xe giúp viết phương trình nhanh.'),
      ex(4, r`Một ca nô xuôi dòng từ bến A đến bến B hết 4 giờ và ngược dòng từ B về A hết 5 giờ. Biết vận tốc dòng nước là 2 km/h, tính khoảng cách AB.`,
        'Quãng đường xuôi và ngược bằng nhau; vận tốc xuôi, ngược phụ thuộc vận tốc riêng của ca nô.',
        'Vận tốc xuôi dòng, ngược dòng; lập phương trình.',
        [r`Gọi vận tốc riêng của ca nô là \(x\) (km/h), \(x > 2\).`, r`Vận tốc xuôi \(x + 2\), ngược \(x - 2\). Phương trình: \(4(x + 2) = 5(x - 2)\).`, r`\(4x + 8 = 5x - 10 \iff x = 18\) (thỏa mãn).`, r`AB \(= 4\cdot(18 + 2) = 80\) (km).`],
        'Khoảng cách AB là 80 km.',
        'Có thể chọn ẩn là quãng đường AB cũng được; chọn vận tốc riêng làm ẩn cho phương trình gọn hơn.'),
    ],
    'bai-toan-nang-suat': [
      ex(3, r`Theo kế hoạch, mỗi ngày một tổ sản xuất phải làm 50 sản phẩm. Thực tế, mỗi ngày tổ làm được 57 sản phẩm nên đã hoàn thành trước kế hoạch 1 ngày và còn làm thêm được 13 sản phẩm. Theo kế hoạch, tổ phải làm bao nhiêu sản phẩm?`,
        'Số ngày theo kế hoạch hơn số ngày thực tế 1 ngày; số sản phẩm thực tế nhiều hơn kế hoạch 13.',
        'Khối lượng công việc = năng suất × thời gian.',
        [r`Gọi số sản phẩm theo kế hoạch là \(x\), \(x\) nguyên dương.`, r`Số ngày kế hoạch \(\dfrac{x}{50}\); thực tế làm \(x + 13\) sản phẩm trong \(\dfrac{x + 13}{57}\) ngày.`, r`Phương trình: \(\dfrac{x}{50} - \dfrac{x + 13}{57} = 1\).`, r`Nhân với 2850: \(57x - 50x - 650 = 2850 \iff 7x = 3500 \iff x = 500\).`],
        'Theo kế hoạch, tổ phải làm 500 sản phẩm.',
        'Kiểm tra: kế hoạch 10 ngày; thực tế 513 sản phẩm trong 9 ngày, đúng 57 sản phẩm/ngày.'),
    ],
    'bai-toan-ti-so-phan-tram': [
      ex(2, r`Một chiếc áo sau khi giảm giá 20% có giá 240 000 đồng. Hỏi giá ban đầu của chiếc áo là bao nhiêu?`,
        'Giá sau khi giảm 20% bằng 80% giá ban đầu.',
        'Tỉ số phần trăm; giải phương trình.',
        [r`Gọi giá ban đầu là \(x\) (đồng), \(x > 0\).`, r`Phương trình: \(x\cdot(1 - 20\%) = 240\,000 \iff 0{,}8x = 240\,000\).`, r`\(x = 300\,000\).`],
        'Giá ban đầu là 300 000 đồng.',
        'Không lấy 240 000 cộng 20% của 240 000 – 20% được tính trên giá ban đầu.'),
      ex(3, r`Năm ngoái, tổng dân số của hai tỉnh A và B là 4 triệu người. Năm nay dân số tỉnh A tăng 1,1%, tỉnh B tăng 1,2%, tổng dân số hai tỉnh là 4 045 000 người. Tính dân số mỗi tỉnh năm ngoái.`,
        'Gọi dân số tỉnh A năm ngoái là ẩn; biểu diễn dân số năm nay của mỗi tỉnh theo tỉ lệ tăng.',
        'Tăng theo tỉ lệ phần trăm; lập phương trình.',
        [r`Gọi dân số tỉnh A năm ngoái là \(x\) (người), \(0 < x < 4\,000\,000\); tỉnh B là \(4\,000\,000 - x\).`, r`Phương trình: \(1{,}011x + 1{,}012(4\,000\,000 - x) = 4\,045\,000\).`, r`\(4\,048\,000 - 0{,}001x = 4\,045\,000 \iff x = 3\,000\,000\).`],
        'Năm ngoái tỉnh A có 3 triệu người, tỉnh B có 1 triệu người.'),
    ],
    'bai-toan-chu-vi-dien-tich': [
      ex(2, r`Một hình chữ nhật có chu vi 56 m, chiều dài hơn chiều rộng 6 m. Tính các kích thước của hình chữ nhật.`,
        'Gọi chiều rộng là ẩn; chiều dài bằng chiều rộng cộng 6.',
        'Chu vi hình chữ nhật; lập phương trình.',
        [r`Gọi chiều rộng là \(x\) (m), \(x > 0\); chiều dài \(x + 6\) (m).`, r`Phương trình: \(2(x + x + 6) = 56 \iff 4x + 12 = 56\).`, r`\(x = 11\) (thỏa mãn); chiều dài 17 m.`],
        'Chiều rộng 11 m, chiều dài 17 m.'),
      ex(3, r`Một mảnh vườn hình chữ nhật có chiều dài gấp 3 lần chiều rộng. Nếu tăng chiều rộng thêm 5 m và giảm chiều dài đi 5 m thì diện tích tăng thêm 75 m². Tính các kích thước của mảnh vườn.`,
        'Viết diện tích mới và diện tích cũ theo ẩn; hiệu bằng 75.',
        'Diện tích hình chữ nhật; nhân đa thức; lập phương trình.',
        [r`Gọi chiều rộng là \(x\) (m), \(x > 0\); chiều dài \(3x\) (m), cần \(3x > 5\).`, r`Phương trình: \((x + 5)(3x - 5) - 3x\cdot x = 75\).`, r`\(3x^2 + 10x - 25 - 3x^2 = 75 \iff 10x = 100 \iff x = 10\) (thỏa mãn).`],
        'Chiều rộng 10 m, chiều dài 30 m.',
        'Kiểm tra: \\(15\\cdot25 - 10\\cdot30 = 375 - 300 = 75\\).'),
    ],
    'bai-toan-quan-he-so-tuoi': [
      ex(2, r`Tổng của hai số là 90, số này gấp đôi số kia. Tìm hai số đó.`,
        'Gọi số nhỏ là ẩn, số lớn gấp đôi.',
        'Lập và giải phương trình.',
        [r`Gọi số nhỏ là \(x\); số lớn là \(2x\).`, r`\(x + 2x = 90 \iff x = 30\).`],
        'Hai số là 30 và 60.'),
      ex(3, r`Năm nay tuổi mẹ gấp 3 lần tuổi con. Sau 12 năm nữa, tuổi mẹ chỉ còn gấp 2 lần tuổi con. Tính tuổi con năm nay.`,
        'Sau 12 năm, tuổi mỗi người đều tăng 12.',
        'Bài toán về tuổi; lập phương trình.',
        [r`Gọi tuổi con năm nay là \(x\) (tuổi), \(x\) nguyên dương; tuổi mẹ \(3x\).`, r`Sau 12 năm: \(3x + 12 = 2(x + 12)\).`, r`\(3x + 12 = 2x + 24 \iff x = 12\) (thỏa mãn).`],
        'Năm nay con 12 tuổi (mẹ 36 tuổi).',
        'Hiệu số tuổi hai người không đổi theo thời gian.'),
    ],
  },
  notes: {
    'bai-toan-chuyen-dong': 'Lập bảng vận tốc – thời gian – quãng đường cho từng đối tượng; thống nhất đơn vị giờ, km.',
    'bai-toan-nang-suat': 'Phân biệt kế hoạch và thực tế; khối lượng công việc = năng suất × thời gian.',
    'bai-toan-ti-so-phan-tram': 'Tỉ lệ phần trăm luôn tính trên giá trị ban đầu; tăng \\(p\\%\\) thì nhân với \\(1 + p\\%\\).',
    'bai-toan-chu-vi-dien-tich': 'Biểu diễn mọi kích thước theo một ẩn; kiểm tra các kích thước sau khi thay đổi vẫn dương.',
    'bai-toan-quan-he-so-tuoi': 'Tuổi mọi người cùng tăng (giảm) như nhau theo thời gian; ẩn là số nguyên dương.',
  },
};

const BAI_27: LessonContent = {
  slug: 'bai-27-khai-niem-ham-so-va-do-thi-cua-ham-so',
  applications: r`- Mô tả sự phụ thuộc giữa các đại lượng: quãng đường theo thời gian, tiền điện theo số điện, cước taxi theo số km.
- Xác định vị trí trên bản đồ, màn hình, bàn cờ bằng tọa độ.
- Đọc đồ thị để biết xu hướng, tìm giá trị tương ứng mà không cần tính.`,
  theory: [
    th('definition', 'Hàm số', r`Nếu đại lượng \(y\) phụ thuộc vào đại lượng thay đổi \(x\) sao cho với mỗi giá trị của \(x\) ta luôn xác định được **chỉ một** giá trị tương ứng của \(y\) thì \(y\) được gọi là **hàm số** của \(x\), và \(x\) gọi là **biến số**. Hàm số có thể cho bằng bảng hoặc bằng công thức.`, undefined,
      r`\(s = 50t\) cho quãng đường \(s\) là hàm số của thời gian \(t\).`),
    th('concept', 'Kí hiệu và giá trị của hàm số', r`Hàm số \(y\) của \(x\) thường viết \(y = f(x)\). Giá trị của hàm số tại \(x = a\) kí hiệu \(f(a)\).`, r`f(x) = 2x - 3 \Rightarrow f(2) = 1`),
    th('special', 'Hàm hằng', r`Nếu \(y\) luôn nhận một giá trị không đổi khi \(x\) thay đổi (ví dụ \(y = 5\)) thì \(y\) vẫn là hàm số của \(x\), gọi là **hàm hằng**.`),
    th('definition', 'Mặt phẳng tọa độ', r`Hai trục số \(Ox\) (trục hoành) và \(Oy\) (trục tung) vuông góc tại gốc \(O\) tạo thành **mặt phẳng tọa độ** \(Oxy\). Mỗi điểm \(M\) xác định một cặp số \((x_0; y_0)\): \(x_0\) là **hoành độ**, \(y_0\) là **tung độ**, viết \(M(x_0; y_0)\).`),
    th('property', 'Điểm trên các trục', r`- Điểm nằm trên trục hoành có tung độ bằng 0: \(M(a; 0)\).
- Điểm nằm trên trục tung có hoành độ bằng 0: \(N(0; b)\).`),
    th('definition', 'Đồ thị của hàm số', r`**Đồ thị** của hàm số \(y = f(x)\) là tập hợp tất cả các điểm \(M(x; f(x))\) trên mặt phẳng tọa độ.`, r`M(x_0; y_0) \in \text{đồ thị} \iff y_0 = f(x_0)`),
    th('note', 'Lưu ý', r`Viết tọa độ hoành độ trước, tung độ sau; \(A(2; 3)\) khác \(B(3; 2)\).`),
  ],
  formulas: [
    {
      group: 'Hàm số và đồ thị',
      items: [
        fc('Giá trị của hàm số', r`y = f(x),\quad f(a) \text{ là giá trị tại } x = a`, r`- \(x\): biến số; \(y\): hàm số`, r`\(f(x) = x^2 - 2x\): \(f(-2) = 8\).`),
        fc('Điểm thuộc đồ thị', r`M(x_0; y_0) \in \text{đồ thị} \iff y_0 = f(x_0)`, r`- \(x_0\): hoành độ; \(y_0\): tung độ`, r`\(A(1; 2)\) thuộc đồ thị \(y = 2x\) vì \(2\cdot1 = 2\).`),
      ],
    },
  ],
  examples: {
    'ham-so-cho-boi-bang-cong-thuc': [
      ex(1, r`Một ô tô chạy với vận tốc 50 km/h. Quãng đường \(s\) (km) đi được sau \(t\) giờ là \(s = 50t\). \(s\) có phải là hàm số của \(t\) không? Lập bảng giá trị của \(s\) khi \(t = 1; 2; 3; 4\).`,
        'Kiểm tra: mỗi giá trị của \\(t\\) cho đúng một giá trị của \\(s\\).',
        'Định nghĩa hàm số cho bằng công thức.',
        [r`Với mỗi \(t\), công thức \(s = 50t\) cho đúng một giá trị \(s\) nên \(s\) là hàm số của \(t\).`, r`\(t = 1; 2; 3; 4\) cho \(s = 50; 100; 150; 200\).`],
        r`\(s\) là hàm số của \(t\).
| \(t\) (giờ) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| \(s\) (km) | 50 | 100 | 150 | 200 |`),
      ex(2, r`Công thức nào sau đây cho \(y\) là hàm số của \(x\)? a) \(y = 3x - 1\); b) \(y = 5\); c) \(|y| = x\).`,
        'Tìm xem có giá trị nào của \\(x\\) ứng với hai giá trị khác nhau của \\(y\\) không.',
        'Định nghĩa hàm số; hàm hằng.',
        [r`a) Mỗi \(x\) cho đúng một \(y = 3x - 1\): là hàm số.`, r`b) Mọi \(x\) đều cho \(y = 5\): là hàm số (hàm hằng).`, r`c) Với \(x = 2\) có \(y = 2\) hoặc \(y = -2\): không phải hàm số.`],
        'a) và b) cho \\(y\\) là hàm số của \\(x\\); c) không.'),
    ],
    'tinh-gia-tri-ham-so': [
      ex(1, r`Cho hàm số \(f(x) = 2x - 3\). Tính \(f(0)\), \(f(2)\), \(f(-1)\).`,
        'Thay từng giá trị của \\(x\\) vào công thức.',
        'Giá trị của hàm số.',
        [r`\(f(0) = 2\cdot0 - 3 = -3\); \(f(2) = 4 - 3 = 1\).`, r`\(f(-1) = -2 - 3 = -5\).`],
        r`\(f(0) = -3\); \(f(2) = 1\); \(f(-1) = -5\).`),
      ex(2, r`Cho hàm số \(y = f(x) = x^2 - 2x\). Tính \(f(-2)\), \(f\left(\dfrac12\right)\) và tìm \(x\) để \(f(x) = 0\).`,
        'Thay số để tính; để tìm \\(x\\), lập phương trình \\(f(x) = 0\\) và phân tích thành nhân tử.',
        'Giá trị của hàm số; phương trình tích.',
        [r`\(f(-2) = 4 + 4 = 8\); \(f\left(\dfrac12\right) = \dfrac14 - 1 = -\dfrac34\).`, r`\(f(x) = 0 \iff x(x - 2) = 0 \iff x = 0\) hoặc \(x = 2\).`],
        r`\(f(-2) = 8\); \(f\left(\dfrac12\right) = -\dfrac34\); \(f(x) = 0\) khi \(x = 0\) hoặc \(x = 2\).`),
      ex(3, r`Giá cước một hãng taxi: 12 000 đồng cho km đầu tiên, mỗi km tiếp theo 10 000 đồng. Viết công thức tính số tiền \(y\) (đồng) phải trả khi đi \(x\) km (\(x \ge 1\)). \(y\) có là hàm số của \(x\) không? Tính số tiền khi đi 8 km.`,
        'Tiền = tiền km đầu + tiền các km còn lại (\\(x - 1\\) km).',
        'Hàm số cho bằng công thức; giá trị của hàm số.',
        [r`\(y = 12\,000 + 10\,000(x - 1) = 10\,000x + 2\,000\).`, r`Mỗi \(x\) cho đúng một giá trị \(y\) nên \(y\) là hàm số của \(x\).`, r`Khi \(x = 8\): \(y = 80\,000 + 2\,000 = 82\,000\) (đồng).`],
        r`\(y = 10\,000x + 2\,000\); đi 8 km trả 82 000 đồng.`),
    ],
    'toa-do-diem': [
      ex(1, r`Biểu diễn các điểm \(A(2; 3)\), \(B(-1; 2)\), \(C(0; -2)\), \(D(-3; 0)\) trên mặt phẳng tọa độ. Điểm nào nằm trên các trục tọa độ?`,
        'Từ hoành độ trên \\(Ox\\) và tung độ trên \\(Oy\\), kẻ đường gióng để xác định điểm.',
        'Tọa độ của một điểm; điểm trên các trục.',
        [r`Mỗi điểm: đi theo trục hoành đến hoành độ, rồi theo phương thẳng đứng đến tung độ.`, r`\(C(0; -2)\) có hoành độ 0 nên nằm trên trục tung; \(D(-3; 0)\) có tung độ 0 nên nằm trên trục hoành.`],
        r`\(C\) nằm trên trục tung, \(D\) nằm trên trục hoành.
[bieudo]
loai: dothi
diem: A(2; 3); B(-1; 2); C(0; -2); D(-3; 0)
x: -4; 4
y: -3; 4
[/bieudo]`),
      ex(2, r`Cho \(A(1; 1)\), \(B(4; 1)\), \(C(4; 3)\). Tìm tọa độ điểm \(D\) để \(ABCD\) là hình chữ nhật và tính diện tích hình chữ nhật đó.`,
        r`\(AB\) nằm ngang, \(BC\) thẳng đứng: \(D\) có hoành độ của \(A\), tung độ của \(C\).`,
        'Tọa độ điểm; hình chữ nhật.',
        [r`\(AB\) song song với \(Ox\), \(BC\) song song với \(Oy\) nên \(D\) có hoành độ bằng hoành độ của \(A\) và tung độ bằng tung độ của \(C\): \(D(1; 3)\).`, r`\(AB = 4 - 1 = 3\); \(BC = 3 - 1 = 2\). Diện tích \(= 3\cdot2 = 6\) (đơn vị diện tích).`],
        r`\(D(1; 3)\); diện tích bằng 6.
[bieudo]
loai: dothi
diem: A(1; 1); B(4; 1); C(4; 3); D(1; 3)
x: -1; 5
y: -1; 4
[/bieudo]`),
    ],
    've-doc-do-thi': [
      ex(2, r`Hàm số \(y = f(x)\) cho bởi bảng: \(x = -2; -1; 0; 1; 2\) tương ứng \(y = 4; 1; 0; 1; 4\). Vẽ đồ thị của hàm số.`,
        'Đồ thị là tập hợp các điểm \\((x; y)\\) trong bảng.',
        'Đồ thị của hàm số cho bằng bảng.',
        [r`Các điểm của đồ thị: \((-2; 4)\), \((-1; 1)\), \((0; 0)\), \((1; 1)\), \((2; 4)\).`, r`Biểu diễn năm điểm này trên mặt phẳng tọa độ; đồ thị gồm đúng năm điểm đó.`],
        r`Đồ thị gồm 5 điểm:
[bieudo]
loai: dothi
diem: A(-2; 4); B(-1; 1); E(0; 0); C(1; 1); D(2; 4)
x: -3; 3
y: -1; 5
[/bieudo]`,
        'Hàm số cho bằng bảng chỉ có các điểm rời rạc – không nối chúng lại.'),
      ex(3, r`Quãng đường \(y\) (km) một người đi bộ được sau \(x\) giờ là \(y = 5x\) (\(0 \le x \le 3\)), có đồ thị như hình. Dựa vào đồ thị (và kiểm tra bằng công thức), cho biết: a) sau 1,5 giờ người đó đi được bao nhiêu km; b) đi 12 km thì mất bao lâu.
[bieudo]
loai: dothi
ham so: 5x
x: 0; 3
y: 0; 15
diem: M(2; 10)
[/bieudo]`,
        'Đọc giá trị trên đồ thị: từ \\(x\\) gióng lên đồ thị rồi sang trục tung (và ngược lại).',
        'Đọc đồ thị; giá trị của hàm số; phương trình bậc nhất.',
        [r`a) \(x = 1{,}5\): \(y = 5\cdot1{,}5 = 7{,}5\) (km).`, r`b) \(y = 12\): \(5x = 12 \iff x = 2{,}4\) (giờ), tức 2 giờ 24 phút.`],
        r`a) 7,5 km; b) 2,4 giờ (2 giờ 24 phút).`),
    ],
  },
  notes: {
    'ham-so-cho-boi-bang-cong-thuc': 'Chỉ cần một giá trị của \\(x\\) ứng với hai giá trị \\(y\\) khác nhau là \\(y\\) không phải hàm số của \\(x\\).',
    'tinh-gia-tri-ham-so': 'Thay giá trị vào biến (số âm đặt trong ngoặc); tìm \\(x\\) khi biết \\(f(x)\\) thì giải phương trình.',
    'toa-do-diem': 'Hoành độ viết trước, tung độ viết sau; điểm trên trục hoành có tung độ 0, trên trục tung có hoành độ 0.',
    've-doc-do-thi': 'Đồ thị là tập hợp các điểm \\((x; f(x))\\); đọc đồ thị bằng đường gióng song song với các trục.',
  },
};

const BAI_28: LessonContent = {
  slug: 'bai-28-ham-so-bac-nhat-va-do-thi-cua-ham-so-bac-nhat',
  applications: r`- Mô tả các quan hệ "giá cố định + giá theo số lượng": cước taxi, tiền điện, tiền nước, tiền thuê xe.
- So sánh hai phương án (hai hãng, hai gói cước) bằng cách xét giao điểm hai đồ thị.
- Dự đoán lượng nước trong bể, quãng đường theo thời gian khi tốc độ không đổi.`,
  theory: [
    th('definition', 'Hàm số bậc nhất', r`Hàm số bậc nhất là hàm số cho bởi công thức \(y = ax + b\), trong đó \(a\), \(b\) là các số cho trước và \(a \ne 0\).`, r`y = ax + b\quad (a \ne 0)`,
      r`\(y = 3x - 2\) (\(a = 3\), \(b = -2\)); \(y = \dfrac{x}{3}\) (\(a = \dfrac13\), \(b = 0\)).`),
    th('property', 'Đồ thị của hàm số bậc nhất', r`Đồ thị của hàm số \(y = ax + b\) (\(a \ne 0\)) là một **đường thẳng**:
- Cắt trục tung tại điểm có tung độ bằng \(b\).
- Song song với đường thẳng \(y = ax\) nếu \(b \ne 0\); trùng với đường thẳng \(y = ax\) nếu \(b = 0\).`),
    th('rule', 'Cách vẽ đồ thị', r`Xác định hai điểm phân biệt của đồ thị rồi vẽ đường thẳng đi qua hai điểm đó. Thường chọn:
- \(P(0; b)\) – giao điểm với trục tung;
- \(Q\left(-\dfrac{b}{a}; 0\right)\) – giao điểm với trục hoành (hoặc một điểm có hoành độ dễ tính).`),
    th('condition', 'Điểm thuộc đồ thị', r`Điểm \(M(x_0; y_0)\) thuộc đồ thị hàm số \(y = ax + b\) khi và chỉ khi \(y_0 = ax_0 + b\).`, r`M(x_0; y_0) \in d \iff y_0 = ax_0 + b`),
    th('special', 'Trường hợp đặc biệt', r`- \(b = 0\): đồ thị \(y = ax\) đi qua gốc tọa độ \(O\) và điểm \((1; a)\).
- \(a = 0\): \(y = b\) là hàm hằng (không phải hàm số bậc nhất), đồ thị là đường thẳng song song với trục hoành.`),
    th('note', 'Lưu ý', r`Muốn xác định \(y = ax + b\), cần đủ hai dữ kiện (hai điểm, hoặc một điểm và một hệ số) để lập đủ hai đẳng thức.`),
  ],
  formulas: [
    {
      group: 'Hàm số bậc nhất',
      items: [
        fc('Dạng tổng quát', r`y = ax + b\quad (a \ne 0)`, r`- \(a\): hệ số của \(x\); \(b\): hệ số tự do`, r`\(y = -x + 3\): \(a = -1\), \(b = 3\).`, r`\(a \ne 0\).`),
        fc('Giao điểm với hai trục', r`Oy:\ (0; b),\qquad Ox:\ \left(-\dfrac{b}{a}; 0\right)`, r`- \(a \ne 0\)`, r`\(y = 2x - 4\): cắt \(Oy\) tại \((0; -4)\), cắt \(Ox\) tại \((2; 0)\).`),
        fc('Điểm thuộc đồ thị', r`M(x_0; y_0) \in d \iff y_0 = ax_0 + b`, r`- \(d\): đồ thị \(y = ax + b\)`, r`\(A(1; 1)\) thuộc \(y = 3x - 2\) vì \(3\cdot1 - 2 = 1\).`),
      ],
    },
  ],
  examples: {
    'nhan-dang-ham-so-bac-nhat': [
      ex(1, r`Trong các hàm số \(y = 3x - 2\); \(y = 5 - x\); \(y = 2x^2 + 1\); \(y = 4\); \(y = \dfrac{x}{3}\), hàm số nào là hàm số bậc nhất? Chỉ ra \(a\), \(b\).`,
        'So sánh với dạng \\(y = ax + b\\), \\(a \\ne 0\\).',
        'Định nghĩa hàm số bậc nhất.',
        [r`\(y = 3x - 2\): \(a = 3\), \(b = -2\). \(y = 5 - x\): \(a = -1\), \(b = 5\). \(y = \dfrac{x}{3}\): \(a = \dfrac13\), \(b = 0\).`, r`\(y = 2x^2 + 1\) có \(x^2\); \(y = 4\) có \(a = 0\): không phải hàm số bậc nhất.`],
        r`Các hàm số bậc nhất: \(y = 3x - 2\); \(y = 5 - x\); \(y = \dfrac{x}{3}\).`),
      ex(2, r`Tìm \(m\) để hàm số \(y = (m - 2)x + 3\) là hàm số bậc nhất. Với \(m = 5\), chỉ ra hệ số \(a\), \(b\).`,
        'Điều kiện là hệ số của \\(x\\) khác 0.',
        'Định nghĩa hàm số bậc nhất.',
        [r`Hàm số là bậc nhất khi \(m - 2 \ne 0\), tức \(m \ne 2\).`, r`Với \(m = 5\): \(y = 3x + 3\), \(a = 3\), \(b = 3\).`],
        r`\(m \ne 2\); khi \(m = 5\): \(a = 3\), \(b = 3\).`),
    ],
    'bang-gia-tri-ham-so-bac-nhat': [
      ex(1, r`Cho hàm số \(y = 2x + 1\). Lập bảng giá trị với \(x = -2; -1; 0; 1; 2\).`,
        'Thay từng giá trị của \\(x\\) vào công thức.',
        'Giá trị của hàm số bậc nhất.',
        [r`\(x = -2 \Rightarrow y = -3\); \(x = -1 \Rightarrow y = -1\); \(x = 0 \Rightarrow y = 1\).`, r`\(x = 1 \Rightarrow y = 3\); \(x = 2 \Rightarrow y = 5\).`],
        r`| \(x\) | \(-2\) | \(-1\) | 0 | 1 | 2 |
|---|---|---|---|---|---|
| \(y\) | \(-3\) | \(-1\) | 1 | 3 | 5 |`),
      ex(2, r`Cho \(f(x) = -3x + 5\). Tính \(f(-1)\), \(f\left(\dfrac23\right)\) và tìm \(x\) để \(f(x) = -1\).`,
        'Thay số để tính giá trị; giải phương trình để tìm \\(x\\).',
        'Giá trị của hàm số; phương trình bậc nhất.',
        [r`\(f(-1) = 3 + 5 = 8\); \(f\left(\dfrac23\right) = -2 + 5 = 3\).`, r`\(-3x + 5 = -1 \iff -3x = -6 \iff x = 2\).`],
        r`\(f(-1) = 8\); \(f\left(\dfrac23\right) = 3\); \(x = 2\).`),
    ],
    've-do-thi-ham-so-bac-nhat': [
      ex(2, r`Vẽ đồ thị của hàm số \(y = -x + 3\).`,
        'Tìm giao điểm với hai trục tọa độ rồi nối.',
        'Cách vẽ đồ thị hàm số bậc nhất.',
        [r`Cho \(x = 0\) thì \(y = 3\): điểm \(P(0; 3)\).`, r`Cho \(y = 0\) thì \(x = 3\): điểm \(Q(3; 0)\).`, r`Vẽ đường thẳng đi qua \(P\) và \(Q\).`],
        r`Đồ thị là đường thẳng \(PQ\):
[bieudo]
loai: dothi
ham so: -x + 3
diem: P(0; 3); Q(3; 0)
x: -1; 4
y: -1; 4
[/bieudo]`),
      ex(3, r`Vẽ trên cùng một mặt phẳng tọa độ đồ thị của hai hàm số \(y = x + 1\) và \(y = -2x + 4\). Tìm tọa độ giao điểm của hai đồ thị.`,
        'Vẽ từng đường thẳng qua hai điểm; hoành độ giao điểm là nghiệm của phương trình hoành độ.',
        'Vẽ đồ thị; giải phương trình bậc nhất.',
        [r`\(y = x + 1\) qua \((0; 1)\) và \((-1; 0)\); \(y = -2x + 4\) qua \((0; 4)\) và \((2; 0)\).`, r`Hoành độ giao điểm: \(x + 1 = -2x + 4 \iff 3x = 3 \iff x = 1\).`, r`Tung độ: \(y = 1 + 1 = 2\). Giao điểm \(I(1; 2)\).`],
        r`Giao điểm \(I(1; 2)\).
[bieudo]
loai: dothi
ham so: x + 1; -2x + 4
diem: I(1; 2)
x: -2; 3
y: -1; 5
[/bieudo]`,
        'Đọc giao điểm trên hình rồi kiểm tra lại bằng phép tính.'),
    ],
    'diem-thuoc-do-thi-tim-he-so': [
      ex(2, r`Trong các điểm \(A(1; 1)\), \(B(2; 5)\), \(C(-1; -4)\), điểm nào thuộc đồ thị hàm số \(y = 3x - 2\)?`,
        'Thay hoành độ vào hàm số, so sánh kết quả với tung độ.',
        'Điểm thuộc đồ thị hàm số.',
        [r`\(A\): \(3\cdot1 - 2 = 1\). Đúng bằng tung độ.`, r`\(B\): \(3\cdot2 - 2 = 4 \ne 5\). \(C\): \(3\cdot(-1) - 2 = -5 \ne -4\).`],
        r`Chỉ có điểm \(A\) thuộc đồ thị.`),
      ex(3, r`Xác định hệ số \(a\) để đồ thị hàm số \(y = ax + 3\) đi qua điểm \(A(2; 7)\).`,
        'Thay tọa độ của \\(A\\) vào hàm số để có phương trình ẩn \\(a\\).',
        'Điểm thuộc đồ thị; phương trình bậc nhất.',
        [r`\(A \in\) đồ thị nên \(7 = a\cdot2 + 3\).`, r`\(2a = 4 \iff a = 2\) (thỏa mãn \(a \ne 0\)).`],
        r`\(a = 2\), hàm số \(y = 2x + 3\).`),
      ex(4, r`Xác định hàm số \(y = ax + b\) biết đồ thị đi qua hai điểm \(A(1; 3)\) và \(B(-1; -1)\).`,
        'Mỗi điểm cho một đẳng thức; cộng (trừ) hai đẳng thức để tìm \\(a\\), \\(b\\).',
        'Điểm thuộc đồ thị; giải phương trình.',
        [r`\(A \in\) đồ thị: \(a + b = 3\); \(B \in\) đồ thị: \(-a + b = -1\).`, r`Cộng hai đẳng thức: \(2b = 2 \iff b = 1\); suy ra \(a = 2\).`, r`Kiểm tra: \(2\cdot1 + 1 = 3\), \(2\cdot(-1) + 1 = -1\). Đúng.`],
        r`\(y = 2x + 1\).`,
        'Hai điểm phân biệt xác định đúng một đường thẳng.'),
    ],
    'thuc-te-ham-so-bac-nhat': [
      ex(3, r`Một bể đang chứa 50 lít nước. Người ta mở vòi chảy thêm vào bể mỗi phút 4 lít. a) Viết hàm số biểu thị lượng nước \(y\) (lít) trong bể sau \(x\) phút. b) Sau bao lâu bể có 130 lít nước?`,
        'Lượng nước = lượng ban đầu + lượng chảy thêm.',
        'Hàm số bậc nhất trong thực tế; phương trình bậc nhất.',
        [r`a) \(y = 4x + 50\) (\(x \ge 0\)).`, r`b) \(4x + 50 = 130 \iff 4x = 80 \iff x = 20\).`],
        r`a) \(y = 4x + 50\); b) sau 20 phút.`),
      ex(4, r`Hãng taxi A tính 15 000 đồng mở cửa và 11 000 đồng mỗi km; hãng B tính 10 000 đồng mở cửa và 12 000 đồng mỗi km. a) Viết hàm số biểu thị số tiền \(y_A\), \(y_B\) (đồng) khi đi \(x\) km. b) Đi bao nhiêu km thì hai hãng thu tiền bằng nhau? c) Đi 10 km nên chọn hãng nào?`,
        'Mỗi hãng là một hàm số bậc nhất; hai hãng bằng tiền tại hoành độ giao điểm của hai đồ thị.',
        'Hàm số bậc nhất; giao điểm hai đồ thị; phương trình.',
        [r`a) \(y_A = 11\,000x + 15\,000\); \(y_B = 12\,000x + 10\,000\).`, r`b) \(11\,000x + 15\,000 = 12\,000x + 10\,000 \iff 1000x = 5000 \iff x = 5\) (km).`, r`c) Với \(x = 10\): \(y_A = 125\,000\), \(y_B = 130\,000\). Nên chọn hãng A.`],
        r`Bằng nhau khi đi 5 km; đi 10 km chọn hãng A (rẻ hơn 5 000 đồng).
[bieudo]
loai: dothi
ham so: 1,1x + 1,5; 1,2x + 1
x: 0; 10
y: 0; 14
diem: I(5; 7)
tieude: Số tiền (chục nghìn đồng) theo số km
[/bieudo]`,
        'Sau giao điểm, đường nào thấp hơn thì phương án đó rẻ hơn.'),
    ],
  },
  notes: {
    'nhan-dang-ham-so-bac-nhat': 'Đưa về dạng \\(y = ax + b\\) và kiểm tra \\(a \\ne 0\\); có tham số thì đặt điều kiện cho hệ số của \\(x\\).',
    'bang-gia-tri-ham-so-bac-nhat': 'Thay số cẩn thận (số âm đặt trong ngoặc); tìm \\(x\\) khi biết \\(y\\) thì giải phương trình.',
    've-do-thi-ham-so-bac-nhat': 'Chỉ cần hai điểm; ưu tiên giao điểm với hai trục, nếu \\(b = 0\\) thì chọn thêm điểm \\((1; a)\\).',
    'diem-thuoc-do-thi-tim-he-so': 'Điểm thuộc đồ thị thì tọa độ thỏa mãn công thức; mỗi dữ kiện cho một phương trình.',
    'thuc-te-ham-so-bac-nhat': 'Xác định phần cố định (\\(b\\)) và phần thay đổi theo đơn vị (\\(a\\)); so sánh phương án bằng giao điểm hai đồ thị.',
  },
};

const BAI_29: LessonContent = {
  slug: 'bai-29-he-so-goc-cua-duong-thang',
  applications: r`- Hệ số góc cho biết đại lượng thay đổi nhanh hay chậm: giá cước mỗi km, tốc độ chảy của vòi nước.
- Độ dốc của đường, mái nhà, đường trượt được mô tả bằng hệ số góc.
- Nhận biết hai phương án tăng cùng tốc độ (song song) hay sẽ gặp nhau (cắt nhau).`,
  theory: [
    th('definition', 'Hệ số góc', r`Đường thẳng \(y = ax + b\) (\(a \ne 0\)) có **hệ số góc** là \(a\).`, undefined, r`\(y = 3x - 1\) có hệ số góc 3; \(y = -x + 2\) có hệ số góc \(-1\).`),
    th('property', 'Góc tạo bởi đường thẳng và trục Ox', r`Gọi \(\alpha\) là góc tạo bởi đường thẳng \(y = ax + b\) với tia \(Ox\) (tính ngược chiều kim đồng hồ):
- \(a > 0\) thì \(\alpha\) là góc nhọn; \(a\) càng lớn thì góc càng lớn.
- \(a < 0\) thì \(\alpha\) là góc tù.`),
    th('condition', 'Vị trí của hai đường thẳng', r`Với \(d: y = ax + b\) và \(d': y = a'x + b'\) (\(a, a' \ne 0\)):`, r`d \parallel d' \iff a = a',\ b \ne b';\quad d \equiv d' \iff a = a',\ b = b';\quad d \text{ cắt } d' \iff a \ne a'`),
    th('special', 'Cắt nhau tại một điểm trên trục tung', r`\(d\) và \(d'\) cắt nhau tại một điểm trên trục tung khi \(a \ne a'\) và \(b = b'\).`),
    th('note', 'Lưu ý', r`Khi đường thẳng có tham số, luôn kèm điều kiện hệ số của \(x\) khác 0 (để là hàm số bậc nhất) và đối chiếu kết quả với điều kiện này.`),
  ],
  formulas: [
    {
      group: 'Hệ số góc và vị trí hai đường thẳng',
      items: [
        fc('Song song', r`d \parallel d' \iff a = a',\ b \ne b'`, r`- \(d: y = ax + b\), \(d': y = a'x + b'\)`, r`\(y = 2x + 1\) và \(y = 2x - 3\) song song.`),
        fc('Trùng nhau', r`d \equiv d' \iff a = a',\ b = b'`, r`- như trên`, r`\(y = 3x + 2\) và \(y = \dfrac{6x + 4}{2}\) trùng nhau.`),
        fc('Cắt nhau', r`d \text{ cắt } d' \iff a \ne a'`, r`- như trên`, r`\(y = 2x + 1\) và \(y = -x + 1\) cắt nhau tại \((0; 1)\).`),
      ],
    },
  ],
  examples: {
    'xac-dinh-he-so-goc': [
      ex(1, r`Xác định hệ số góc của các đường thẳng: \(y = 3x - 1\); \(y = -x + 2\); \(y = \dfrac{1 - 2x}{3}\).`,
        'Đưa về dạng \\(y = ax + b\\) rồi đọc \\(a\\).',
        'Định nghĩa hệ số góc.',
        [r`\(y = 3x - 1\): hệ số góc 3; \(y = -x + 2\): hệ số góc \(-1\).`, r`\(y = \dfrac{1 - 2x}{3} = -\dfrac23x + \dfrac13\): hệ số góc \(-\dfrac23\).`],
        r`\(3\); \(-1\); \(-\dfrac23\).`),
      ex(2, r`Góc tạo bởi mỗi đường thẳng \(y = 2x + 1\) và \(y = -x + 3\) với trục \(Ox\) là góc nhọn hay góc tù?`,
        'Xét dấu hệ số góc.',
        'Quan hệ giữa dấu của hệ số góc và góc tạo với trục Ox.',
        [r`\(y = 2x + 1\) có \(a = 2 > 0\): góc nhọn.`, r`\(y = -x + 3\) có \(a = -1 < 0\): góc tù.`],
        r`Đường thứ nhất tạo góc nhọn, đường thứ hai tạo góc tù với \(Ox\).
[bieudo]
loai: dothi
ham so: 2x + 1; -x + 3
x: -2; 4
y: -2; 5
[/bieudo]`),
    ],
    'song-song-cat-nhau': [
      ex(1, r`Xét vị trí tương đối của các cặp đường thẳng: \(d_1: y = 2x + 1\); \(d_2: y = 2x - 3\); \(d_3: y = -x + 1\).`,
        'So sánh hệ số góc, rồi hệ số tự do.',
        'Điều kiện song song, cắt nhau.',
        [r`\(d_1\), \(d_2\): \(a = a' = 2\), \(b \ne b'\) nên song song.`, r`\(d_1\), \(d_3\): \(2 \ne -1\) nên cắt nhau; lại có \(b = b' = 1\) nên cắt nhau tại điểm \((0; 1)\) trên trục tung.`, r`\(d_2\), \(d_3\): \(2 \ne -1\) nên cắt nhau.`],
        r`\(d_1 \parallel d_2\); \(d_1\) cắt \(d_3\) tại \((0; 1)\); \(d_2\) cắt \(d_3\).`),
      ex(2, r`Hai đường thẳng \(d: y = 3x - 2\) và \(d': y = \dfrac{6x + 4}{2}\) có vị trí như thế nào?`,
        'Rút gọn \\(d\'\\) về dạng \\(y = ax + b\\) trước khi so sánh.',
        'Vị trí của hai đường thẳng.',
        [r`\(d': y = 3x + 2\).`, r`\(a = a' = 3\), \(b = -2 \ne 2 = b'\) nên \(d \parallel d'\).`],
        r`\(d \parallel d'\).`),
    ],
    'tim-tham-so-song-song-cat-nhau': [
      ex(2, r`Tìm \(m\) để đường thẳng \(y = (m + 1)x + 3\) song song với đường thẳng \(y = 2x - 1\).`,
        'Song song: hệ số góc bằng nhau, hệ số tự do khác nhau.',
        'Điều kiện hai đường thẳng song song.',
        [r`Điều kiện: \(m + 1 = 2\) và \(3 \ne -1\).`, r`\(m = 1\) (khi đó \(m + 1 = 2 \ne 0\), thỏa mãn).`],
        r`\(m = 1\).`),
      ex(3, r`Cho \(d: y = (m - 1)x + 2m\) (\(m \ne 1\)) và \(d': y = 3x - 4\). Tìm \(m\) để: a) \(d \parallel d'\); b) \(d\) cắt \(d'\) tại một điểm trên trục tung.`,
        'a) \\(a = a\'\\), \\(b \\ne b\'\\). b) \\(a \\ne a\'\\), \\(b = b\'\\).',
        'Vị trí của hai đường thẳng; điều kiện hàm số bậc nhất.',
        [r`a) \(m - 1 = 3 \iff m = 4\); khi đó \(2m = 8 \ne -4\). Vậy \(m = 4\).`, r`b) \(2m = -4 \iff m = -2\); khi đó \(m - 1 = -3 \ne 3\) và \(m \ne 1\). Vậy \(m = -2\).`],
        r`a) \(m = 4\); b) \(m = -2\).`,
        'Sau khi tìm \\(m\\), luôn thay lại để kiểm tra điều kiện còn lại.'),
    ],
    'tim-ham-so-bac-nhat': [
      ex(3, r`Xác định hàm số bậc nhất \(y = ax + b\) biết đồ thị song song với đường thẳng \(y = -2x + 1\) và đi qua điểm \(M(1; 3)\).`,
        'Song song cho \\(a\\); đi qua \\(M\\) cho \\(b\\).',
        'Điều kiện song song; điểm thuộc đồ thị.',
        [r`Song song với \(y = -2x + 1\) nên \(a = -2\), \(b \ne 1\).`, r`Đi qua \(M(1; 3)\): \(3 = -2\cdot1 + b \iff b = 5\) (thỏa mãn \(b \ne 1\)).`],
        r`\(y = -2x + 5\).`),
      ex(4, r`Xác định hàm số \(y = ax + b\) biết đồ thị cắt trục tung tại điểm có tung độ \(-3\) và đi qua giao điểm của hai đường thẳng \(y = x + 1\) và \(y = -x + 5\).`,
        'Tìm giao điểm trước; tung độ gốc cho \\(b\\).',
        'Giao điểm hai đường thẳng; điểm thuộc đồ thị.',
        [r`Giao điểm: \(x + 1 = -x + 5 \iff x = 2\), \(y = 3\). Điểm \(I(2; 3)\).`, r`Cắt trục tung tại tung độ \(-3\) nên \(b = -3\).`, r`Đi qua \(I\): \(3 = 2a - 3 \iff a = 3\).`],
        r`\(y = 3x - 3\).
[bieudo]
loai: dothi
ham so: x + 1; -x + 5; 3x - 3
diem: I(2; 3)
x: -1; 4
y: -4; 6
[/bieudo]`,
        'Ba đường thẳng cùng đi qua \\(I\\): đây cũng là cách chứng minh ba đường thẳng đồng quy.'),
    ],
  },
  notes: {
    'xac-dinh-he-so-goc': 'Đưa về dạng \\(y = ax + b\\) rồi đọc hệ số góc \\(a\\) (cả dấu); \\(a > 0\\) góc nhọn, \\(a < 0\\) góc tù.',
    'song-song-cat-nhau': 'So sánh hệ số góc trước: khác nhau thì cắt nhau; bằng nhau thì xét hệ số tự do (song song hoặc trùng).',
    'tim-tham-so-song-song-cat-nhau': 'Viết đủ các điều kiện (cả \\(b \\ne b\'\\) và hệ số của \\(x\\) khác 0) rồi đối chiếu kết quả.',
    'tim-ham-so-bac-nhat': 'Chuyển mỗi dữ kiện thành một đẳng thức của \\(a\\), \\(b\\); song song cho \\(a\\), cắt trục tung cho \\(b\\).',
  },
};

export const CHUONG_7: LessonContent[] = [BAI_25, BAI_26, BAI_27, BAI_28, BAI_29];
