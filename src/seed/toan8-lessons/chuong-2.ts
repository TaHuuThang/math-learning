/** Chương II. Hằng đẳng thức đáng nhớ và ứng dụng – nội dung bài học giai đoạn 3 (Bài 6 – Bài 9). */
import { ex, fc, r, th, type LessonContent } from './types';

const BAI_6: LessonContent = {
  slug: 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu',
  applications: r`- Tính nhẩm nhanh: \(102^2 = 10\,404\); \(98\cdot102 = 9996\).
- Tính diện tích hình vuông khi cạnh tăng thêm một đoạn: \((a + b)^2 = a^2 + 2ab + b^2\) (ghép hình vuông và hình chữ nhật).
- Tìm giá trị lớn nhất, nhỏ nhất của đại lượng (chi phí, diện tích) trong bài toán tối ưu đơn giản.`,
  theory: [
    th('definition', 'Hằng đẳng thức', r`**Hằng đẳng thức** là đẳng thức mà hai vế luôn nhận cùng một giá trị khi thay các chữ bằng những số tùy ý.`, undefined,
      r`\(a(b + c) = ab + ac\) là một hằng đẳng thức; còn \(x + 1 = 3\) không phải (chỉ đúng khi \(x = 2\)).`),
    th('rule', 'Bình phương của một tổng', r`Bình phương của một tổng bằng bình phương số thứ nhất, cộng hai lần tích hai số, cộng bình phương số thứ hai.`,
      r`(A + B)^2 = A^2 + 2AB + B^2`, r`\((x + 3)^2 = x^2 + 2\cdot x\cdot3 + 3^2 = x^2 + 6x + 9\).`),
    th('rule', 'Bình phương của một hiệu', r`Bình phương của một hiệu bằng bình phương số thứ nhất, trừ hai lần tích hai số, cộng bình phương số thứ hai.`,
      r`(A - B)^2 = A^2 - 2AB + B^2`, r`\((2x - 1)^2 = 4x^2 - 4x + 1\).`),
    th('rule', 'Hiệu hai bình phương', r`Hiệu hai bình phương bằng tích của hiệu hai số với tổng hai số đó.`,
      r`A^2 - B^2 = (A - B)(A + B)`, r`\(99\cdot101 = (100 - 1)(100 + 1) = 100^2 - 1 = 9999\).`),
    th('property', 'Dùng hằng đẳng thức theo hai chiều', r`- Chiều từ trái sang phải: **khai triển** (bỏ ngoặc).
- Chiều từ phải sang trái: **viết gọn** thành bình phương hoặc tích – dùng để rút gọn, phân tích, tính nhanh.`, undefined,
      r`\(x^2 + 4x + 4 = x^2 + 2\cdot x\cdot2 + 2^2 = (x + 2)^2\).`),
    th('special', 'Trường hợp đặc biệt', r`- \((A - B)^2 = (B - A)^2\); \((-A - B)^2 = (A + B)^2\).
- \(A^2 + B^2\) **không** bằng \((A + B)^2\): thiếu hạng tử \(2AB\).
- \((A + B)^2 \ge 0\) và \((A - B)^2 \ge 0\) với mọi \(A, B\).`),
    th('note', 'Lưu ý', r`- Xác định đúng \(A\) và \(B\) trước khi áp dụng, nhất là khi \(A, B\) là biểu thức: \((2x - 3y)^2\) có \(A = 2x\), \(B = 3y\).
- Viết biểu thức dạng \((x + a)^2 + m\) để chứng minh luôn dương, tìm giá trị nhỏ nhất.`),
  ],
  formulas: [
    {
      group: 'Ba hằng đẳng thức bậc hai',
      items: [
        fc('Bình phương của một tổng', r`(A + B)^2 = A^2 + 2AB + B^2`, r`- \(A, B\): số hoặc biểu thức`, r`\((x + 5)^2 = x^2 + 10x + 25\).`),
        fc('Bình phương của một hiệu', r`(A - B)^2 = A^2 - 2AB + B^2`, r`- \(A, B\): số hoặc biểu thức`, r`\((3 - y)^2 = 9 - 6y + y^2\).`),
        fc('Hiệu hai bình phương', r`A^2 - B^2 = (A - B)(A + B)`, r`- \(A, B\): số hoặc biểu thức`, r`\(4x^2 - 9 = (2x - 3)(2x + 3)\).`),
      ],
    },
    {
      group: 'Hệ quả thường dùng',
      items: [
        fc('Liên hệ tổng và hiệu', r`(A + B)^2 - (A - B)^2 = 4AB`, r`- \(A, B\): số hoặc biểu thức`, r`\((x + 1)^2 - (x - 1)^2 = 4x\).`),
        fc('Tổng hai bình phương', r`A^2 + B^2 = (A + B)^2 - 2AB`, r`- \(A, B\): số hoặc biểu thức`, r`Nếu \(a + b = 5\), \(ab = 6\) thì \(a^2 + b^2 = 25 - 12 = 13\).`),
        fc('Bình phương không âm', r`(A \pm B)^2 + m \ge m`, r`- \(m\): hằng số`, r`\(x^2 + 4x + 7 = (x + 2)^2 + 3 \ge 3\).`, r`Dấu "=" xảy ra khi \(A \pm B = 0\).`),
      ],
    },
  ],
  examples: {
    'hoan-thanh-hang-dang-thuc-binh-phuong': [
      ex(1, r`Khai triển: a) \((x + 3)^2\); b) \((y - 5)^2\); c) \((x - 2)(x + 2)\).`,
        'Mỗi biểu thức có dạng một hằng đẳng thức bậc hai; xác định \\(A\\), \\(B\\) rồi thay vào.',
        'Bình phương của một tổng, một hiệu; hiệu hai bình phương.',
        [r`a) \(A = x\), \(B = 3\): \((x + 3)^2 = x^2 + 6x + 9\).`, r`b) \(A = y\), \(B = 5\): \((y - 5)^2 = y^2 - 10y + 25\).`, r`c) \((x - 2)(x + 2) = x^2 - 2^2 = x^2 - 4\).`],
        r`\(x^2 + 6x + 9\); \(y^2 - 10y + 25\); \(x^2 - 4\).`),
      ex(2, r`Điền vào chỗ trống để được hằng đẳng thức:
a) \(x^2 + 8x + \ldots = (\ldots)^2\);
b) \(4a^2 - \ldots + 9b^2 = (2a - 3b)^2\);
c) \(\ldots - 25 = (3x - 5)(3x + 5)\).`,
        r`So sánh với mẫu \(A^2 \pm 2AB + B^2\) và \(A^2 - B^2\) để tìm phần còn thiếu.`,
        'Ba hằng đẳng thức bậc hai, dùng theo chiều viết gọn.',
        [r`a) \(x^2 = A^2\) nên \(A = x\); \(8x = 2\cdot x\cdot B\) nên \(B = 4\). Điền \(16\) và \(x + 4\).`, r`b) \(A = 2a\), \(B = 3b\) nên \(2AB = 12ab\). Điền \(12ab\).`, r`c) \((3x - 5)(3x + 5) = (3x)^2 - 5^2 = 9x^2 - 25\). Điền \(9x^2\).`],
        r`a) \(x^2 + 8x + 16 = (x + 4)^2\); b) \(12ab\); c) \(9x^2\).`,
        'Tìm \\(B\\) từ hạng tử giữa: \\(B = \\dfrac{\\text{hạng tử giữa}}{2A}\\).'),
    ],
    'tinh-gia-tri-rut-gon-bieu-thuc-binh-phuong': [
      ex(2, r`Tính nhanh: a) \(102^2\); b) \(49^2\); c) \(98\cdot102\).`,
        'Viết các số dưới dạng tổng, hiệu với số tròn trăm, tròn chục để dùng hằng đẳng thức.',
        'Bình phương của một tổng, một hiệu; hiệu hai bình phương.',
        [r`a) \(102^2 = (100 + 2)^2 = 10\,000 + 400 + 4 = 10\,404\).`, r`b) \(49^2 = (50 - 1)^2 = 2500 - 100 + 1 = 2401\).`, r`c) \(98\cdot102 = (100 - 2)(100 + 2) = 10\,000 - 4 = 9996\).`],
        r`\(10\,404\); \(2401\); \(9996\).`),
      ex(3, r`Rút gọn rồi tính giá trị của \(B = (2x + 1)^2 + (2x - 1)^2 - 2(2x + 1)(2x - 1)\) tại \(x = 2026\).`,
        r`Đặt \(a = 2x + 1\), \(b = 2x - 1\) thì \(B = a^2 + b^2 - 2ab\) – đúng dạng bình phương của một hiệu.`,
        r`\((A - B)^2 = A^2 - 2AB + B^2\) dùng theo chiều viết gọn.`,
        [r`\(B = \left[(2x + 1) - (2x - 1)\right]^2\).`, r`\((2x + 1) - (2x - 1) = 2\) nên \(B = 2^2 = 4\).`, r`Giá trị của \(B\) không phụ thuộc vào \(x\), tại \(x = 2026\) vẫn bằng 4.`],
        r`\(B = 4\).`,
        'Nhìn biểu thức như một khối \\(A\\), \\(B\\) thay vì khai triển từng phần giúp tính rất nhanh.'),
    ],
    'tim-x-hang-dang-thuc-binh-phuong': [
      ex(2, r`Tìm \(x\), biết \((x + 3)^2 - x^2 = 15\).`,
        r`Khai triển \((x + 3)^2\); các hạng tử \(x^2\) triệt tiêu.`,
        'Bình phương của một tổng; tìm \\(x\\) từ \\(ax + b = c\\).',
        [r`\(x^2 + 6x + 9 - x^2 = 15\).`, r`\(6x + 9 = 15\), suy ra \(6x = 6\).`, r`\(x = 1\).`],
        r`\(x = 1\).`),
      ex(3, r`Tìm \(x\), biết \((2x - 1)^2 - (2x + 3)(2x - 3) = 6\).`,
        'Khai triển bình phương của một hiệu và tích dạng hiệu hai bình phương.',
        'Bình phương của một hiệu; hiệu hai bình phương.',
        [r`\((2x - 1)^2 = 4x^2 - 4x + 1\); \((2x + 3)(2x - 3) = 4x^2 - 9\).`, r`Vế trái: \(4x^2 - 4x + 1 - 4x^2 + 9 = -4x + 10\).`, r`\(-4x + 10 = 6\) nên \(x = 1\).`, r`Thử lại: \(1^2 - 5\cdot(-1) = 6\). Đúng.`],
        r`\(x = 1\).`),
    ],
    'chung-minh-voi-hang-dang-thuc-binh-phuong': [
      ex(3, r`Chứng minh đẳng thức \((a + b)^2 - (a - b)^2 = 4ab\).`,
        'Khai triển hai bình phương ở vế trái rồi thu gọn.',
        'Bình phương của một tổng, một hiệu.',
        [r`\((a + b)^2 = a^2 + 2ab + b^2\); \((a - b)^2 = a^2 - 2ab + b^2\).`, r`Vế trái \(= a^2 + 2ab + b^2 - a^2 + 2ab - b^2 = 4ab\) = vế phải.`],
        'Đẳng thức được chứng minh.',
        'Có thể dùng hiệu hai bình phương: \\([(a + b) - (a - b)][(a + b) + (a - b)] = 2b\\cdot2a\\).'),
      ex(4, r`Chứng minh biểu thức \(P = x^2 - 6x + 11\) luôn dương với mọi giá trị của \(x\).`,
        r`Tách \(11 = 9 + 2\) để tạo bình phương \((x - 3)^2\).`,
        r`Bình phương của một hiệu; \((x - 3)^2 \ge 0\).`,
        [r`\(P = x^2 - 2\cdot x\cdot3 + 9 + 2 = (x - 3)^2 + 2\).`, r`Vì \((x - 3)^2 \ge 0\) với mọi \(x\) nên \(P \ge 2 > 0\).`],
        r`\(P = (x - 3)^2 + 2 > 0\) với mọi \(x\).`,
        'Lấy nửa hệ số của \\(x\\) (ở đây là 3) để biết cần thêm số nào tạo bình phương.'),
    ],
    'tim-gia-tri-nho-nhat-lon-nhat': [
      ex(3, r`a) Tìm giá trị nhỏ nhất của \(A = x^2 + 4x + 7\).
b) Tìm giá trị lớn nhất của \(B = -x^2 + 6x - 2\).`,
        'Đưa về dạng \\((x + a)^2 + m\\) (để tìm nhỏ nhất) hoặc \\(m - (x + a)^2\\) (để tìm lớn nhất).',
        r`Bình phương của một tổng, một hiệu; \((x + a)^2 \ge 0\).`,
        [r`a) \(A = (x^2 + 4x + 4) + 3 = (x + 2)^2 + 3 \ge 3\). Dấu "=" khi \(x = -2\).`, r`b) \(B = -(x^2 - 6x + 9) + 7 = 7 - (x - 3)^2 \le 7\). Dấu "=" khi \(x = 3\).`],
        r`Giá trị nhỏ nhất của \(A\) là 3 khi \(x = -2\); giá trị lớn nhất của \(B\) là 7 khi \(x = 3\).`,
        'Luôn chỉ ra giá trị của biến để dấu "=" xảy ra – thiếu bước này bài làm chưa trọn vẹn.'),
      ex(4, r`Tìm giá trị nhỏ nhất của \(C = x^2 - 2xy + 2y^2 + 2y + 5\).`,
        r`Có hai biến: nhóm \(x^2 - 2xy + y^2 = (x - y)^2\), phần còn lại \(y^2 + 2y + 5\) tạo bình phương theo \(y\).`,
        'Bình phương của một hiệu, một tổng; tổng các số không âm.',
        [r`\(C = (x^2 - 2xy + y^2) + (y^2 + 2y + 1) + 4\).`, r`\(C = (x - y)^2 + (y + 1)^2 + 4 \ge 4\).`, r`Dấu "=" khi \(y + 1 = 0\) và \(x - y = 0\), tức \(y = -1\), \(x = -1\).`],
        r`Giá trị nhỏ nhất của \(C\) là 4, đạt khi \(x = y = -1\).`,
        'Với hai biến, tách thành tổng các bình phương rồi cho từng bình phương bằng 0.'),
    ],
  },
  notes: {
    'hoan-thanh-hang-dang-thuc-binh-phuong': 'Viết rõ \\(A\\), \\(B\\) trước khi thay; khi \\(A\\) có hệ số (như \\(2x\\)) phải bình phương cả hệ số: \\((2x)^2 = 4x^2\\).',
    'tinh-gia-tri-rut-gon-bieu-thuc-binh-phuong': 'Tìm cấu trúc chung của biểu thức (coi một nhóm là \\(A\\), nhóm kia là \\(B\\)) trước khi khai triển.',
    'tim-x-hang-dang-thuc-binh-phuong': 'Khai triển, thu gọn đưa về \\(ax = b\\); thử lại nghiệm vào đề bài.',
    'chung-minh-voi-hang-dang-thuc-binh-phuong': 'Để chứng minh biểu thức luôn dương, đưa về dạng \\((\\ldots)^2 + m\\) với \\(m > 0\\).',
    'tim-gia-tri-nho-nhat-lon-nhat': 'Kết luận phải nêu cả giá trị nhỏ nhất (lớn nhất) và giá trị của biến làm dấu "=" xảy ra.',
  },
};

const BAI_7: LessonContent = {
  slug: 'bai-7-lap-phuong-cua-mot-tong-lap-phuong-cua-mot-hieu',
  applications: r`- Tính thể tích khối lập phương khi cạnh tăng hoặc giảm: \((a + b)^3\).
- Tính nhẩm lập phương của các số gần số tròn: \(101^3 = (100 + 1)^3\).
- Tính giá trị biểu thức đối xứng khi biết tổng và tích: \(x^3 + y^3 = (x + y)^3 - 3xy(x + y)\).`,
  theory: [
    th('rule', 'Lập phương của một tổng', r`Lập phương của một tổng bằng lập phương số thứ nhất, cộng ba lần tích bình phương số thứ nhất với số thứ hai, cộng ba lần tích số thứ nhất với bình phương số thứ hai, cộng lập phương số thứ hai.`,
      r`(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3`, r`\((x + 1)^3 = x^3 + 3x^2 + 3x + 1\).`),
    th('rule', 'Lập phương của một hiệu', r`Lập phương của một hiệu có các hạng tử như lập phương của một tổng nhưng **dấu xen kẽ** \(+, -, +, -\).`,
      r`(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3`, r`\((x - 2)^3 = x^3 - 6x^2 + 12x - 8\).`),
    th('property', 'Nhận biết một khai triển lập phương', r`- Có 4 hạng tử, hai hạng tử ngoài là lập phương \(A^3\), \(B^3\).
- Các hệ số (khi \(A, B\) là đơn thức hệ số 1) lần lượt là \(1; 3; 3; 1\).
- Số mũ của \(A\) giảm dần \(3, 2, 1, 0\), số mũ của \(B\) tăng dần \(0, 1, 2, 3\).`),
    th('rule', 'Dạng viết theo tổng và tích', r`Nhóm hai hạng tử giữa ta được công thức hay dùng khi biết \(A + B\) và \(AB\).`,
      r`(A + B)^3 = A^3 + B^3 + 3AB(A + B)`, r`Nếu \(x + y = 3\), \(xy = 2\) thì \(x^3 + y^3 = 27 - 3\cdot2\cdot3 = 9\).`),
    th('special', 'Trường hợp đặc biệt', r`- \((-A)^3 = -A^3\); \((A - B)^3 = -(B - A)^3\).
- \((A + B)^3\) **khác** \(A^3 + B^3\).`),
    th('note', 'Lưu ý', r`Khi \(A\) có hệ số, nhớ lũy thừa cả hệ số: \((2x)^3 = 8x^3\), \(3(2x)^2\cdot1 = 12x^2\).`),
  ],
  formulas: [
    {
      group: 'Hằng đẳng thức bậc ba',
      items: [
        fc('Lập phương của một tổng', r`(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3`, r`- \(A, B\): số hoặc biểu thức`, r`\((x + 2)^3 = x^3 + 6x^2 + 12x + 8\).`),
        fc('Lập phương của một hiệu', r`(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3`, r`- \(A, B\): số hoặc biểu thức`, r`\((2x - 1)^3 = 8x^3 - 12x^2 + 6x - 1\).`),
      ],
    },
    {
      group: 'Dạng viết gọn theo tổng (hiệu) và tích',
      items: [
        fc('Lập phương tổng theo tổng và tích', r`(A + B)^3 = A^3 + B^3 + 3AB(A + B)`, r`- \(A + B\): tổng; \(AB\): tích`, r`\(x + y = 2\), \(xy = -3\): \(x^3 + y^3 = 8 + 18 = 26\).`),
        fc('Lập phương hiệu theo hiệu và tích', r`(A - B)^3 = A^3 - B^3 - 3AB(A - B)`, r`- \(A - B\): hiệu; \(AB\): tích`, r`\(a - b = 1\), \(ab = 6\): \(a^3 - b^3 = 1 + 18 = 19\).`),
      ],
    },
  ],
  examples: {
    'hoan-thanh-hang-dang-thuc-lap-phuong': [
      ex(1, r`Khai triển \((x + 2)^3\).`,
        r`Biểu thức có dạng \((A + B)^3\) với \(A = x\), \(B = 2\).`,
        'Lập phương của một tổng.',
        [r`\((x + 2)^3 = x^3 + 3\cdot x^2\cdot2 + 3\cdot x\cdot2^2 + 2^3\).`, r`\(= x^3 + 6x^2 + 12x + 8\).`],
        r`\(x^3 + 6x^2 + 12x + 8\).`),
      ex(2, r`Viết \(8x^3 - 12x^2 + 6x - 1\) dưới dạng lập phương của một hiệu.`,
        r`Hai hạng tử ngoài \(8x^3 = (2x)^3\) và \(1 = 1^3\); dấu xen kẽ nên là lập phương của một hiệu.`,
        'Lập phương của một hiệu, dùng theo chiều viết gọn.',
        [r`Chọn \(A = 2x\), \(B = 1\).`, r`Kiểm tra: \(3A^2B = 3\cdot4x^2 = 12x^2\); \(3AB^2 = 6x\). Khớp với đề.`, r`Vậy \(8x^3 - 12x^2 + 6x - 1 = (2x - 1)^3\).`],
        r`\((2x - 1)^3\).`,
        'Luôn kiểm tra hai hạng tử giữa trước khi kết luận.'),
    ],
    'tinh-gia-tri-rut-gon-bieu-thuc-lap-phuong': [
      ex(2, r`Tính giá trị của biểu thức \(x^3 + 3x^2 + 3x + 1\) tại \(x = 99\).`,
        r`Biểu thức là khai triển của \((x + 1)^3\); viết gọn trước rồi mới thay số.`,
        'Lập phương của một tổng (chiều viết gọn).',
        [r`\(x^3 + 3x^2 + 3x + 1 = (x + 1)^3\).`, r`Tại \(x = 99\): \((99 + 1)^3 = 100^3 = 1\,000\,000\).`],
        r`Giá trị bằng \(1\,000\,000\).`),
      ex(3, r`Rút gọn biểu thức \(A = (x + 1)^3 - (x - 1)^3 - 6x^2\).`,
        'Khai triển hai lập phương rồi thu gọn.',
        'Lập phương của một tổng, một hiệu.',
        [r`\((x + 1)^3 = x^3 + 3x^2 + 3x + 1\); \((x - 1)^3 = x^3 - 3x^2 + 3x - 1\).`, r`Hiệu: \((x + 1)^3 - (x - 1)^3 = 6x^2 + 2\).`, r`\(A = 6x^2 + 2 - 6x^2 = 2\).`],
        r`\(A = 2\).`),
    ],
    'tim-x-hang-dang-thuc-lap-phuong': [
      ex(2, r`Tìm \(x\), biết \(x^3 - 6x^2 + 12x - 8 = 27\).`,
        r`Vế trái là \((x - 2)^3\); vế phải \(27 = 3^3\).`,
        r`Lập phương của một hiệu; \(a^3 = b^3 \Rightarrow a = b\).`,
        [r`\((x - 2)^3 = 3^3\).`, r`\(x - 2 = 3\), nên \(x = 5\).`],
        r`\(x = 5\).`),
      ex(3, r`Tìm \(x\), biết \((x + 1)^3 - x(x^2 + 3x) = 10\).`,
        r`Khai triển rồi thu gọn, các hạng tử \(x^3\), \(x^2\) triệt tiêu.`,
        'Lập phương của một tổng; nhân đơn thức với đa thức.',
        [r`\((x + 1)^3 = x^3 + 3x^2 + 3x + 1\); \(x(x^2 + 3x) = x^3 + 3x^2\).`, r`Vế trái: \(3x + 1 = 10\).`, r`\(x = 3\).`],
        r`\(x = 3\).`),
    ],
    'chung-minh-hang-dang-thuc-lap-phuong': [
      ex(3, r`Chứng minh \((a + b)^3 = a^3 + b^3 + 3ab(a + b)\).`,
        'Biến đổi vế phải rồi so sánh với khai triển lập phương của một tổng.',
        'Lập phương của một tổng; nhân đơn thức với đa thức.',
        [r`Vế phải: \(a^3 + b^3 + 3a^2b + 3ab^2\).`, r`Sắp xếp lại: \(a^3 + 3a^2b + 3ab^2 + b^3 = (a + b)^3\) = vế trái.`],
        'Đẳng thức được chứng minh.'),
      ex(4, r`Cho \(x + y = 3\) và \(xy = 2\). Tính \(x^3 + y^3\).`,
        r`Không cần tìm \(x, y\); dùng \(x^3 + y^3 = (x + y)^3 - 3xy(x + y)\).`,
        'Lập phương của một tổng viết theo tổng và tích.',
        [r`\(x^3 + y^3 = (x + y)^3 - 3xy(x + y)\).`, r`\(= 3^3 - 3\cdot2\cdot3 = 27 - 18 = 9\).`, r`Kiểm tra: \(x = 1\), \(y = 2\) thỏa mãn đề và \(1 + 8 = 9\).`],
        r`\(x^3 + y^3 = 9\).`,
        'Bài cho tổng và tích: hãy biểu diễn biểu thức cần tính qua \\(x + y\\) và \\(xy\\).'),
    ],
  },
  notes: {
    'hoan-thanh-hang-dang-thuc-lap-phuong': 'Nhớ mẫu hệ số 1 – 3 – 3 – 1; với lập phương của một hiệu, dấu xen kẽ bắt đầu bằng dấu cộng.',
    'tinh-gia-tri-rut-gon-bieu-thuc-lap-phuong': 'Nhận ra biểu thức là một lập phương để viết gọn trước khi thay số.',
    'tim-x-hang-dang-thuc-lap-phuong': 'Hai lập phương bằng nhau thì hai cơ số bằng nhau: \\(a^3 = b^3 \\Rightarrow a = b\\).',
    'chung-minh-hang-dang-thuc-lap-phuong': 'Khi đề cho tổng và tích, biểu diễn qua \\(S = x + y\\), \\(P = xy\\) thay vì tìm từng số.',
  },
};

const BAI_8: LessonContent = {
  slug: 'bai-8-tong-va-hieu-hai-lap-phuong',
  applications: r`- Tính nhanh các biểu thức số dạng \(a^3 \pm b^3\).
- Phân tích đa thức có dạng \(x^3 \pm a^3\) thành nhân tử (Bài 9).
- Rút gọn biểu thức, chứng minh chia hết: \(a^3 + b^3\) luôn chia hết cho \(a + b\).`,
  theory: [
    th('rule', 'Tổng hai lập phương', r`Tổng hai lập phương bằng tích của tổng hai số với bình phương thiếu của hiệu hai số.`,
      r`A^3 + B^3 = (A + B)(A^2 - AB + B^2)`, r`\(x^3 + 8 = x^3 + 2^3 = (x + 2)(x^2 - 2x + 4)\).`),
    th('rule', 'Hiệu hai lập phương', r`Hiệu hai lập phương bằng tích của hiệu hai số với bình phương thiếu của tổng hai số.`,
      r`A^3 - B^3 = (A - B)(A^2 + AB + B^2)`, r`\(27 - y^3 = (3 - y)(9 + 3y + y^2)\).`),
    th('concept', 'Bình phương thiếu', r`- \(A^2 - AB + B^2\) gọi là **bình phương thiếu của hiệu** \(A - B\) (so với \((A - B)^2\) thiếu một \(AB\)).
- \(A^2 + AB + B^2\) gọi là **bình phương thiếu của tổng** \(A + B\).`),
    th('property', 'Bảy hằng đẳng thức đáng nhớ', r`- \((A + B)^2 = A^2 + 2AB + B^2\)
- \((A - B)^2 = A^2 - 2AB + B^2\)
- \(A^2 - B^2 = (A - B)(A + B)\)
- \((A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3\)
- \((A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3\)
- \(A^3 + B^3 = (A + B)(A^2 - AB + B^2)\)
- \(A^3 - B^3 = (A - B)(A^2 + AB + B^2)\)`),
    th('note', 'Mẹo nhớ dấu', r`Dấu ở thừa số thứ nhất **giống** dấu của đề (tổng → \(A + B\)); dấu của \(AB\) trong thừa số thứ hai **ngược lại**.`),
    th('special', 'Trường hợp hay gặp', r`- \(x^3 + 1 = (x + 1)(x^2 - x + 1)\); \(x^3 - 1 = (x - 1)(x^2 + x + 1)\).
- \(8x^3 - 27 = (2x)^3 - 3^3 = (2x - 3)(4x^2 + 6x + 9)\).`),
  ],
  formulas: [
    {
      group: 'Tổng và hiệu hai lập phương',
      items: [
        fc('Tổng hai lập phương', r`A^3 + B^3 = (A + B)(A^2 - AB + B^2)`, r`- \(A, B\): số hoặc biểu thức
- \(A^2 - AB + B^2\): bình phương thiếu của hiệu`, r`\(x^3 + 27 = (x + 3)(x^2 - 3x + 9)\).`),
        fc('Hiệu hai lập phương', r`A^3 - B^3 = (A - B)(A^2 + AB + B^2)`, r`- \(A, B\): số hoặc biểu thức
- \(A^2 + AB + B^2\): bình phương thiếu của tổng`, r`\(x^3 - 8 = (x - 2)(x^2 + 2x + 4)\).`),
      ],
    },
    {
      group: 'Liên hệ với lập phương của tổng, hiệu',
      items: [
        fc('Tổng hai lập phương theo tổng và tích', r`A^3 + B^3 = (A + B)^3 - 3AB(A + B)`, r`- \(A + B\): tổng; \(AB\): tích`, r`\(a + b = 5\), \(ab = 6\): \(a^3 + b^3 = 125 - 90 = 35\).`),
        fc('Hiệu hai lập phương theo hiệu và tích', r`A^3 - B^3 = (A - B)^3 + 3AB(A - B)`, r`- \(A - B\): hiệu; \(AB\): tích`, r`\(a - b = 1\), \(ab = 6\): \(a^3 - b^3 = 1 + 18 = 19\).`),
      ],
    },
  ],
  examples: {
    'hoan-thanh-hang-dang-thuc-tong-hieu-lap-phuong': [
      ex(1, r`Viết dưới dạng tích: a) \(x^3 + 27\); b) \(8 - y^3\).`,
        r`Viết mỗi số hạng thành lập phương: \(27 = 3^3\), \(8 = 2^3\).`,
        'Tổng và hiệu hai lập phương.',
        [r`a) \(x^3 + 3^3 = (x + 3)(x^2 - 3x + 9)\).`, r`b) \(2^3 - y^3 = (2 - y)(4 + 2y + y^2)\).`],
        r`\((x + 3)(x^2 - 3x + 9)\); \((2 - y)(4 + 2y + y^2)\).`),
      ex(2, r`Điền vào chỗ trống: a) \((2x - \ldots)(4x^2 + \ldots + 1) = 8x^3 - 1\); b) \((x + 3y)(\ldots) = x^3 + 27y^3\).`,
        r`So sánh với mẫu: tìm \(A\), \(B\) từ hai lập phương ở vế phải.`,
        'Tổng và hiệu hai lập phương.',
        [r`a) \(8x^3 - 1 = (2x)^3 - 1^3\): \(A = 2x\), \(B = 1\), \(AB = 2x\). Điền \(1\) và \(2x\).`, r`b) \(x^3 + 27y^3 = x^3 + (3y)^3\): \(A = x\), \(B = 3y\). Thừa số thứ hai là \(x^2 - 3xy + 9y^2\).`],
        r`a) \((2x - 1)(4x^2 + 2x + 1)\); b) \(x^2 - 3xy + 9y^2\).`),
    ],
    'tinh-gia-tri-bieu-thuc-tong-hieu-lap-phuong': [
      ex(2, r`Tính giá trị của \(A = (x + 2)(x^2 - 2x + 4)\) tại \(x = -3\).`,
        r`Tích có dạng \((A + B)(A^2 - AB + B^2)\) nên bằng \(x^3 + 8\).`,
        'Tổng hai lập phương (chiều nhân ngược).',
        [r`\(A = x^3 + 2^3 = x^3 + 8\).`, r`Tại \(x = -3\): \(A = -27 + 8 = -19\).`],
        r`\(A = -19\).`),
      ex(3, r`Tính nhanh \(M = \dfrac{37^3 + 13^3}{50} - 37\cdot13\).`,
        r`\(37 + 13 = 50\): dùng tổng hai lập phương để rút gọn phân số.`,
        'Tổng hai lập phương; bình phương của một hiệu.',
        [r`\(37^3 + 13^3 = 50\,(37^2 - 37\cdot13 + 13^2)\).`, r`\(M = 37^2 - 37\cdot13 + 13^2 - 37\cdot13 = 37^2 - 2\cdot37\cdot13 + 13^2\).`, r`\(M = (37 - 13)^2 = 24^2 = 576\).`],
        r`\(M = 576\).`,
        'Thấy tổng hai cơ số tròn (50) là dấu hiệu dùng tổng hai lập phương.'),
    ],
    'rut-gon-chung-minh-bay-hang-dang-thuc': [
      ex(3, r`Rút gọn \(A = (x + 1)(x^2 - x + 1) - (x - 1)(x^2 + x + 1)\).`,
        'Hai tích lần lượt là tổng và hiệu hai lập phương.',
        'Tổng và hiệu hai lập phương.',
        [r`\((x + 1)(x^2 - x + 1) = x^3 + 1\); \((x - 1)(x^2 + x + 1) = x^3 - 1\).`, r`\(A = (x^3 + 1) - (x^3 - 1) = 2\).`],
        r`\(A = 2\).`),
      ex(4, r`Cho \(a + b = 5\), \(ab = 6\) và \(a > b\). Tính \(a^3 + b^3\) và \(a^3 - b^3\).`,
        r`Biểu diễn qua tổng và tích; tìm \(a - b\) nhờ \((a - b)^2 = (a + b)^2 - 4ab\).`,
        'Bảy hằng đẳng thức đáng nhớ.',
        [r`\(a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 125 - 90 = 35\).`, r`\((a - b)^2 = 25 - 24 = 1\), mà \(a > b\) nên \(a - b = 1\).`, r`\(a^3 - b^3 = (a - b)(a^2 + ab + b^2) = 1\cdot\left[(a + b)^2 - ab\right] = 25 - 6 = 19\).`, r`Kiểm tra với \(a = 3\), \(b = 2\): \(27 + 8 = 35\), \(27 - 8 = 19\).`],
        r`\(a^3 + b^3 = 35\); \(a^3 - b^3 = 19\).`,
        'Điều kiện \\(a > b\\) dùng để chọn \\(a - b = 1\\) chứ không phải \\(-1\\).'),
    ],
  },
  notes: {
    'hoan-thanh-hang-dang-thuc-tong-hieu-lap-phuong': 'Viết từng số hạng thành lập phương trước (\\(8x^3 = (2x)^3\\)); dấu của \\(AB\\) trong thừa số thứ hai ngược dấu đề bài.',
    'tinh-gia-tri-bieu-thuc-tong-hieu-lap-phuong': 'Nhận dạng tích \\((A \\pm B)(A^2 \\mp AB + B^2)\\) để thu gọn thành \\(A^3 \\pm B^3\\) trước khi thay số.',
    'rut-gon-chung-minh-bay-hang-dang-thuc': 'Ghi nhớ bảy hằng đẳng thức theo cả hai chiều; với bài cho tổng và tích, đưa mọi thứ về \\(a + b\\) và \\(ab\\).',
  },
};

const BAI_9: LessonContent = {
  slug: 'bai-9-phan-tich-da-thuc-thanh-nhan-tu',
  applications: r`- Giải phương trình tích \(A\cdot B = 0\) (tìm \(x\)).
- Tính nhanh giá trị biểu thức: \(77^2 + 77\cdot23 = 77\cdot100\).
- Rút gọn phân thức đại số (Chương VI), chứng minh chia hết.`,
  theory: [
    th('definition', 'Phân tích đa thức thành nhân tử', r`**Phân tích đa thức thành nhân tử** (hay thừa số) là biến đổi đa thức đó thành một tích của những đa thức.`, undefined,
      r`\(x^2 - 3x = x(x - 3)\); \(x^2 - 9 = (x - 3)(x + 3)\).`),
    th('rule', 'Phương pháp đặt nhân tử chung', r`Tìm nhân tử chung của các hạng tử (ƯCLN của các hệ số nhân với lũy thừa chung có số mũ nhỏ nhất của các biến), rồi đặt ra ngoài dấu ngoặc.`,
      r`AB + AC = A(B + C)`, r`\(6x^2y - 9xy^2 = 3xy(2x - 3y)\).`),
    th('rule', 'Phương pháp dùng hằng đẳng thức', r`Viết đa thức dưới dạng vế phải của một hằng đẳng thức rồi biến đổi thành tích (bình phương, lập phương hoặc tích).`, undefined,
      r`\(x^2 - 6x + 9 = (x - 3)^2\); \(x^3 + 1 = (x + 1)(x^2 - x + 1)\).`),
    th('rule', 'Phương pháp nhóm hạng tử', r`Nhóm các hạng tử thích hợp để mỗi nhóm phân tích được, đồng thời xuất hiện nhân tử chung (hoặc hằng đẳng thức) giữa các nhóm.`, undefined,
      r`\(x^2 - xy + x - y = x(x - y) + (x - y) = (x - y)(x + 1)\).`),
    th('special', 'Đổi dấu để xuất hiện nhân tử chung', r`Dùng \(B - A = -(A - B)\) để tạo nhân tử chung.`, r`B - A = -(A - B)`,
      r`\(x(y - 1) - 2(1 - y) = x(y - 1) + 2(y - 1) = (y - 1)(x + 2)\).`),
    th('rule', 'Ứng dụng: tìm x từ tích bằng 0', r`Một tích bằng 0 khi và chỉ khi có ít nhất một thừa số bằng 0.`, r`A\cdot B = 0 \iff A = 0 \ \text{hoặc}\ B = 0`,
      r`\(x(x - 3) = 0\) nên \(x = 0\) hoặc \(x = 3\).`),
    th('note', 'Thứ tự nên thử', r`- Đặt nhân tử chung (nếu có).
- Dùng hằng đẳng thức.
- Nhóm hạng tử; phối hợp nhiều phương pháp.
Phân tích đến khi các nhân tử không phân tích tiếp được nữa.`),
  ],
  formulas: [
    {
      group: 'Các phương pháp cơ bản',
      items: [
        fc('Đặt nhân tử chung', r`AB + AC - AD = A(B + C - D)`, r`- \(A\): nhân tử chung
- \(B, C, D\): phần còn lại của mỗi hạng tử`, r`\(4x^3 - 2x = 2x(2x^2 - 1)\).`),
        fc('Hiệu hai bình phương', r`A^2 - B^2 = (A - B)(A + B)`, r`- \(A, B\): biểu thức`, r`\((x + 1)^2 - 4 = (x - 1)(x + 3)\).`),
        fc('Bình phương của tổng, hiệu', r`A^2 \pm 2AB + B^2 = (A \pm B)^2`, r`- \(A, B\): biểu thức`, r`\(4x^2 + 4x + 1 = (2x + 1)^2\).`),
        fc('Tổng, hiệu hai lập phương', r`A^3 \pm B^3 = (A \pm B)(A^2 \mp AB + B^2)`, r`- \(A, B\): biểu thức`, r`\(x^3 - 27 = (x - 3)(x^2 + 3x + 9)\).`),
      ],
    },
    {
      group: 'Ứng dụng',
      items: [
        fc('Tích bằng 0', r`A\cdot B = 0 \iff A = 0 \ \text{hoặc}\ B = 0`, r`- \(A, B\): các thừa số`, r`\((x - 4)(3x + 2) = 0 \iff x = 4\) hoặc \(x = -\dfrac23\).`),
        fc('Đổi dấu', r`B - A = -(A - B)`, r`- \(A, B\): biểu thức`, r`\(5(3 - x) = -5(x - 3)\).`),
      ],
    },
  ],
  examples: {
    'dat-nhan-tu-chung': [
      ex(1, r`Phân tích thành nhân tử: a) \(6x^2 - 9x\); b) \(5x^2y + 10xy^2\).`,
        'Tìm ƯCLN của các hệ số và lũy thừa chung của biến.',
        'Phương pháp đặt nhân tử chung.',
        [r`a) Nhân tử chung \(3x\): \(6x^2 - 9x = 3x(2x - 3)\).`, r`b) Nhân tử chung \(5xy\): \(5x^2y + 10xy^2 = 5xy(x + 2y)\).`],
        r`\(3x(2x - 3)\); \(5xy(x + 2y)\).`,
        'Kiểm tra bằng cách nhân ngược lại.'),
      ex(2, r`Phân tích thành nhân tử: \(2x(x - 3) - 5(3 - x)\).`,
        r`Hai nhóm có \(x - 3\) và \(3 - x\) đối nhau: đổi dấu để có nhân tử chung.`,
        r`Đặt nhân tử chung; \(3 - x = -(x - 3)\).`,
        [r`\(-5(3 - x) = 5(x - 3)\).`, r`Biểu thức \(= 2x(x - 3) + 5(x - 3) = (x - 3)(2x + 5)\).`],
        r`\((x - 3)(2x + 5)\).`),
    ],
    'su-dung-hang-dang-thuc': [
      ex(2, r`Phân tích thành nhân tử: a) \(x^2 - 16\); b) \(9x^2 + 6x + 1\); c) \(x^3 - 8\).`,
        'Mỗi đa thức là vế phải của một hằng đẳng thức.',
        'Hiệu hai bình phương; bình phương của một tổng; hiệu hai lập phương.',
        [r`a) \(x^2 - 4^2 = (x - 4)(x + 4)\).`, r`b) \((3x)^2 + 2\cdot3x\cdot1 + 1^2 = (3x + 1)^2\).`, r`c) \(x^3 - 2^3 = (x - 2)(x^2 + 2x + 4)\).`],
        r`\((x - 4)(x + 4)\); \((3x + 1)^2\); \((x - 2)(x^2 + 2x + 4)\).`),
      ex(3, r`Phân tích thành nhân tử: \((x + 2)^2 - (2x - 1)^2\).`,
        r`Dạng \(A^2 - B^2\) với \(A = x + 2\), \(B = 2x - 1\).`,
        'Hiệu hai bình phương với \\(A, B\\) là đa thức.',
        [r`\(= \left[(x + 2) - (2x - 1)\right]\left[(x + 2) + (2x - 1)\right]\).`, r`\((x + 2) - (2x - 1) = 3 - x\); \((x + 2) + (2x - 1) = 3x + 1\).`, r`Kết quả: \((3 - x)(3x + 1)\).`],
        r`\((3 - x)(3x + 1)\).`,
        'Đặt \\(B\\) trong ngoặc khi trừ để không sai dấu.'),
    ],
    'nhom-hang-tu': [
      ex(2, r`Phân tích thành nhân tử: \(x^2 - xy + 3x - 3y\).`,
        r`Nhóm hai hạng tử đầu và hai hạng tử cuối sẽ cùng xuất hiện \(x - y\).`,
        'Nhóm hạng tử; đặt nhân tử chung.',
        [r`\(= (x^2 - xy) + (3x - 3y)\).`, r`\(= x(x - y) + 3(x - y)\).`, r`\(= (x - y)(x + 3)\).`],
        r`\((x - y)(x + 3)\).`),
      ex(3, r`Phân tích thành nhân tử: \(x^2 - 2x + 1 - y^2\).`,
        r`Ba hạng tử đầu là \((x - 1)^2\); sau đó là hiệu hai bình phương.`,
        'Nhóm hạng tử; bình phương của một hiệu; hiệu hai bình phương.',
        [r`\(= (x^2 - 2x + 1) - y^2 = (x - 1)^2 - y^2\).`, r`\(= (x - 1 - y)(x - 1 + y)\).`],
        r`\((x - y - 1)(x + y - 1)\).`,
        'Nhóm sao cho mỗi nhóm có “dáng” hằng đẳng thức hoặc nhân tử chung.'),
    ],
    'tach-hang-tu-them-bot-hang-tu': [
      ex(4, r`Phân tích thành nhân tử: \(x^2 - 5x + 6\).`,
        r`Không có nhân tử chung, không phải hằng đẳng thức: tách \(-5x = -2x - 3x\) vì \((-2)\cdot(-3) = 6\).`,
        'Tách hạng tử; nhóm hạng tử.',
        [r`\(x^2 - 5x + 6 = x^2 - 2x - 3x + 6\).`, r`\(= x(x - 2) - 3(x - 2)\).`, r`\(= (x - 2)(x - 3)\).`],
        r`\((x - 2)(x - 3)\).`,
        'Với \\(x^2 + bx + c\\): tìm hai số có tổng \\(b\\) và tích \\(c\\).'),
      ex(4, r`Phân tích thành nhân tử: \(x^4 + 4\).`,
        r`Thêm và bớt \(4x^2\) để tạo bình phương \((x^2 + 2)^2\), rồi dùng hiệu hai bình phương.`,
        'Thêm bớt hạng tử; hiệu hai bình phương.',
        [r`\(x^4 + 4 = x^4 + 4x^2 + 4 - 4x^2 = (x^2 + 2)^2 - (2x)^2\).`, r`\(= (x^2 + 2 - 2x)(x^2 + 2 + 2x)\).`, r`\(= (x^2 - 2x + 2)(x^2 + 2x + 2)\).`],
        r`\((x^2 - 2x + 2)(x^2 + 2x + 2)\).`),
    ],
    'tim-x-phan-tich-nhan-tu': [
      ex(2, r`Tìm \(x\), biết \(x^2 - 3x = 0\).`,
        'Phân tích vế trái thành tích rồi cho từng thừa số bằng 0.',
        r`Đặt nhân tử chung; \(A\cdot B = 0 \iff A = 0\) hoặc \(B = 0\).`,
        [r`\(x(x - 3) = 0\).`, r`\(x = 0\) hoặc \(x - 3 = 0\), tức \(x = 3\).`],
        r`\(x = 0\) hoặc \(x = 3\).`,
        'Không chia hai vế cho \\(x\\) – sẽ làm mất nghiệm \\(x = 0\\).'),
      ex(3, r`Tìm \(x\), biết \((2x - 1)^2 - (x + 3)^2 = 0\).`,
        'Vế trái là hiệu hai bình phương.',
        'Hiệu hai bình phương; tích bằng 0.',
        [r`\(\left[(2x - 1) - (x + 3)\right]\left[(2x - 1) + (x + 3)\right] = 0\).`, r`\((x - 4)(3x + 2) = 0\).`, r`\(x = 4\) hoặc \(x = -\dfrac{2}{3}\).`],
        r`\(x = 4\) hoặc \(x = -\dfrac23\).`),
    ],
    'tinh-gia-tri-phan-tich-nhan-tu': [
      ex(2, r`Tính giá trị của biểu thức \(x^2 + xy\) tại \(x = 77\), \(y = 23\).`,
        r`Đặt nhân tử chung để xuất hiện \(x + y = 100\).`,
        'Đặt nhân tử chung.',
        [r`\(x^2 + xy = x(x + y)\).`, r`Tại \(x = 77\), \(y = 23\): \(77\cdot100 = 7700\).`],
        r`Giá trị bằng 7700.`),
      ex(3, r`Tính giá trị của \(A = x^2 - y^2 - 2y - 1\) tại \(x = 93\), \(y = 6\).`,
        r`Nhóm \(y^2 + 2y + 1 = (y + 1)^2\) rồi dùng hiệu hai bình phương.`,
        'Nhóm hạng tử; hiệu hai bình phương.',
        [r`\(A = x^2 - (y^2 + 2y + 1) = x^2 - (y + 1)^2\).`, r`\(A = (x - y - 1)(x + y + 1)\).`, r`Tại \(x = 93\), \(y = 6\): \(A = 86\cdot100 = 8600\).`],
        r`\(A = 8600\).`),
    ],
  },
  notes: {
    'dat-nhan-tu-chung': 'Lấy ƯCLN của các hệ số và mỗi biến chung với số mũ nhỏ nhất; dùng đổi dấu khi hai nhóm đối nhau.',
    'su-dung-hang-dang-thuc': 'Viết từng hạng tử thành bình phương, lập phương để nhận ra hằng đẳng thức; \\(A, B\\) có thể là đa thức.',
    'nhom-hang-tu': 'Thử nhiều cách nhóm; nhóm đúng khi các nhóm có chung nhân tử hoặc tạo thành hằng đẳng thức.',
    'tach-hang-tu-them-bot-hang-tu': 'Tam thức \\(x^2 + bx + c\\): tách \\(bx\\) theo hai số có tổng \\(b\\), tích \\(c\\); thêm bớt để tạo bình phương đủ.',
    'tim-x-phan-tich-nhan-tu': 'Chuyển hết sang một vế cho vế kia bằng 0, phân tích thành tích; không chia cho biểu thức chứa \\(x\\).',
    'tinh-gia-tri-phan-tich-nhan-tu': 'Phân tích trước để xuất hiện số tròn chục, tròn trăm rồi mới thay số.',
  },
};

export const CHUONG_2: LessonContent[] = [BAI_6, BAI_7, BAI_8, BAI_9];
