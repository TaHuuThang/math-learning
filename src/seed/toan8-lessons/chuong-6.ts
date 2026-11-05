/** Chương VI. Phân thức đại số – nội dung bài học giai đoạn 3 (Bài 21 – Bài 24). */
import { ex, fc, r, th, type LessonContent } from './types';

const BAI_21: LessonContent = {
  slug: 'bai-21-phan-thuc-dai-so',
  applications: r`- Biểu thị thời gian, năng suất, giá trung bình: thời gian đi quãng đường \(s\) với vận tốc \(v\) là \(\dfrac{s}{v}\).
- Biểu thị tỉ lệ, mật độ: số học sinh trên một máy tính, lượng nước trên một người.
- Chuẩn bị cho giải phương trình, bài toán chuyển động, năng suất ở Chương VII.`,
  theory: [
    th('definition', 'Phân thức đại số', r`**Phân thức đại số** (gọi tắt là phân thức) là biểu thức có dạng \(\dfrac{A}{B}\), trong đó \(A\), \(B\) là những đa thức và \(B\) khác đa thức 0. \(A\) gọi là **tử thức** (tử), \(B\) gọi là **mẫu thức** (mẫu).`, undefined,
      r`\(\dfrac{x^2 - 1}{2x + 3}\); \(\dfrac{5}{x - y}\); \(\dfrac{3x}{7}\) là các phân thức.`),
    th('special', 'Trường hợp đặc biệt', r`- Mỗi đa thức \(A\) cũng là một phân thức với mẫu bằng 1: \(A = \dfrac{A}{1}\).
- Mỗi số thực cũng là một phân thức; số 0 là phân thức \(\dfrac01\).`),
    th('condition', 'Điều kiện xác định của phân thức', r`Điều kiện xác định của phân thức \(\dfrac{A}{B}\) là điều kiện của biến để mẫu \(B\) khác 0.`, r`\dfrac{A}{B}\ \text{xác định} \iff B \ne 0`,
      r`\(\dfrac{x + 1}{x - 5}\) xác định khi \(x \ne 5\).`),
    th('definition', 'Giá trị của phân thức', r`Giá trị của phân thức tại giá trị cho trước của biến (thỏa mãn điều kiện xác định) là số nhận được khi thay giá trị đó vào phân thức rồi tính.`),
    th('definition', 'Hai phân thức bằng nhau', r`Hai phân thức \(\dfrac{A}{B}\) và \(\dfrac{C}{D}\) gọi là bằng nhau nếu \(A\cdot D = B\cdot C\).`, r`\dfrac{A}{B} = \dfrac{C}{D} \iff A\cdot D = B\cdot C`,
      r`\(\dfrac{x}{3} = \dfrac{x^2}{3x}\) vì \(x\cdot3x = 3\cdot x^2\).`),
    th('note', 'Lưu ý', r`Chỉ tính giá trị của phân thức tại những giá trị của biến thỏa mãn điều kiện xác định; với giá trị làm mẫu bằng 0, phân thức không có giá trị.`),
  ],
  formulas: [
    {
      group: 'Phân thức',
      items: [
        fc('Điều kiện xác định', r`\dfrac{A}{B}\ \text{xác định} \iff B \ne 0`, r`- \(A\): tử thức; \(B\): mẫu thức`, r`\(\dfrac{1}{x^2 - 9}\) xác định khi \(x \ne 3\) và \(x \ne -3\).`),
        fc('Hai phân thức bằng nhau', r`\dfrac{A}{B} = \dfrac{C}{D} \iff A\cdot D = B\cdot C`, r`- \(A, B, C, D\): đa thức; \(B, D\) khác 0`, r`\(\dfrac{x - 2}{x^2 - 4} = \dfrac{1}{x + 2}\) vì \((x - 2)(x + 2) = (x^2 - 4)\cdot1\).`),
      ],
    },
  ],
  examples: {
    'tu-thuc-mau-thuc': [
      ex(1, r`Chỉ ra tử thức và mẫu thức của mỗi phân thức: \(\dfrac{x^2 - 1}{2x + 3}\); \(\dfrac{5}{x - y}\); \(\dfrac{3x}{7}\); \(x^2 + 1\).`,
        'Tử thức nằm trên, mẫu thức nằm dưới dấu gạch phân số; đa thức là phân thức có mẫu bằng 1.',
        'Định nghĩa phân thức, tử thức, mẫu thức.',
        [r`\(\dfrac{x^2 - 1}{2x + 3}\): tử \(x^2 - 1\), mẫu \(2x + 3\). \(\dfrac{5}{x - y}\): tử \(5\), mẫu \(x - y\).`, r`\(\dfrac{3x}{7}\): tử \(3x\), mẫu \(7\). \(x^2 + 1 = \dfrac{x^2 + 1}{1}\): tử \(x^2 + 1\), mẫu \(1\).`],
        'Tử thức lần lượt: \\(x^2 - 1\\); \\(5\\); \\(3x\\); \\(x^2 + 1\\). Mẫu thức: \\(2x + 3\\); \\(x - y\\); \\(7\\); \\(1\\).'),
    ],
    'hai-phan-thuc-bang-nhau': [
      ex(1, r`Hai phân thức \(\dfrac{x}{3}\) và \(\dfrac{x^2}{3x}\) có bằng nhau không?`,
        'So sánh hai tích chéo \\(A\\cdot D\\) và \\(B\\cdot C\\).',
        'Định nghĩa hai phân thức bằng nhau.',
        [r`\(x\cdot3x = 3x^2\); \(3\cdot x^2 = 3x^2\).`, r`Hai tích bằng nhau nên hai phân thức bằng nhau.`],
        r`\(\dfrac{x}{3} = \dfrac{x^2}{3x}\).`),
      ex(2, r`Tìm đa thức \(A\) thỏa mãn \(\dfrac{A}{x - 1} = \dfrac{x^2 + x}{x^2 - 1}\).`,
        'Dùng định nghĩa hai phân thức bằng nhau để lập đẳng thức chứa \\(A\\), rồi phân tích thành nhân tử.',
        'Hai phân thức bằng nhau; phân tích đa thức thành nhân tử.',
        [r`\(A\cdot(x^2 - 1) = (x - 1)(x^2 + x)\).`, r`Vế phải \(= (x - 1)\cdot x(x + 1) = x(x^2 - 1)\).`, r`So sánh hai vế: \(A = x\).`],
        r`\(A = x\).`,
        'Thử lại: \\(\\dfrac{x}{x - 1} = \\dfrac{x(x + 1)}{(x - 1)(x + 1)} = \\dfrac{x^2 + x}{x^2 - 1}\\).'),
    ],
    'dieu-kien-xac-dinh-phan-thuc': [
      ex(1, r`Tìm điều kiện xác định của phân thức \(\dfrac{3}{x - 5}\).`,
        'Cho mẫu khác 0.',
        'Điều kiện xác định của phân thức.',
        [r`Phân thức xác định khi \(x - 5 \ne 0\).`, r`Tức là \(x \ne 5\).`],
        r`\(x \ne 5\).`),
      ex(2, r`Tìm điều kiện xác định của các phân thức \(\dfrac{x + 1}{x^2 - 9}\) và \(\dfrac{2x}{x^2 + 1}\).`,
        'Phân tích mẫu thành nhân tử để thấy các giá trị làm mẫu bằng 0.',
        'Điều kiện xác định; hiệu hai bình phương.',
        [r`\(x^2 - 9 = (x - 3)(x + 3) \ne 0\) khi \(x \ne 3\) và \(x \ne -3\).`, r`\(x^2 + 1 \ge 1 > 0\) với mọi \(x\) nên \(\dfrac{2x}{x^2 + 1}\) xác định với mọi \(x\).`],
        r`\(\dfrac{x + 1}{x^2 - 9}\): \(x \ne \pm3\); \(\dfrac{2x}{x^2 + 1}\): xác định với mọi \(x\).`),
      ex(3, r`Tìm điều kiện xác định của \(\dfrac{x + 2}{x^2 - 3x}\) và \(\dfrac{5}{x^2 + 4x + 4}\).`,
        'Phân tích mẫu thành nhân tử: một tích khác 0 khi mọi thừa số khác 0.',
        'Đặt nhân tử chung; hằng đẳng thức; điều kiện xác định.',
        [r`\(x^2 - 3x = x(x - 3) \ne 0\) khi \(x \ne 0\) và \(x \ne 3\).`, r`\(x^2 + 4x + 4 = (x + 2)^2 \ne 0\) khi \(x \ne -2\).`],
        r`\(\dfrac{x + 2}{x^2 - 3x}\): \(x \ne 0\), \(x \ne 3\); \(\dfrac{5}{x^2 + 4x + 4}\): \(x \ne -2\).`,
        'Không được rút gọn rồi mới tìm điều kiện – phải tìm điều kiện từ mẫu ban đầu.'),
    ],
    'gia-tri-phan-thuc': [
      ex(2, r`Tính giá trị của phân thức \(\dfrac{x^2 - 1}{x + 2}\) tại \(x = 3\) và tại \(x = -2\).`,
        'Kiểm tra điều kiện xác định \\(x \\ne -2\\) trước khi thay số.',
        'Điều kiện xác định; giá trị của phân thức.',
        [r`Điều kiện xác định: \(x \ne -2\).`, r`Tại \(x = 3\): \(\dfrac{9 - 1}{3 + 2} = \dfrac{8}{5}\).`, r`\(x = -2\) không thỏa mãn điều kiện xác định nên phân thức không có giá trị tại \(x = -2\).`],
        r`Tại \(x = 3\) giá trị là \(\dfrac85\); tại \(x = -2\) phân thức không xác định.`),
      ex(3, r`Cho \(P = \dfrac{x^2 - 4}{x^2 + 2x}\). a) Tìm điều kiện xác định. b) Tính \(P\) tại \(x = 1\). c) Tìm \(x\) để \(P = 0\).`,
        'Phân thức bằng 0 khi tử bằng 0 và mẫu khác 0.',
        'Điều kiện xác định; giá trị của phân thức; hiệu hai bình phương.',
        [r`a) \(x^2 + 2x = x(x + 2) \ne 0\) khi \(x \ne 0\), \(x \ne -2\).`, r`b) \(P(1) = \dfrac{1 - 4}{1 + 2} = -1\).`, r`c) \(P = 0\) khi \(x^2 - 4 = 0\), tức \(x = 2\) hoặc \(x = -2\); đối chiếu điều kiện, loại \(x = -2\).`],
        r`a) \(x \ne 0\), \(x \ne -2\); b) \(P = -1\); c) \(x = 2\).`,
        'Luôn đối chiếu nghiệm tìm được với điều kiện xác định.'),
    ],
    'bai-toan-thuc-te-phan-thuc': [
      ex(3, r`Một ô tô đi quãng đường 120 km với vận tốc \(x\) (km/h). Lúc về, ô tô đi với vận tốc lớn hơn lúc đi 10 km/h.
a) Viết phân thức biểu thị thời gian đi và thời gian về.
b) Tính thời gian đi và về khi \(x = 50\).`,
        'Thời gian = quãng đường : vận tốc; vận tốc lúc về là \\(x + 10\\).',
        'Phân thức biểu thị đại lượng thực tế; giá trị của phân thức.',
        [r`a) Thời gian đi: \(\dfrac{120}{x}\) (giờ); thời gian về: \(\dfrac{120}{x + 10}\) (giờ), với \(x > 0\).`, r`b) Khi \(x = 50\): thời gian đi \(\dfrac{120}{50} = 2{,}4\) giờ; thời gian về \(\dfrac{120}{60} = 2\) giờ.`],
        r`Thời gian đi \(\dfrac{120}{x}\) giờ, về \(\dfrac{120}{x + 10}\) giờ; với \(x = 50\): 2,4 giờ và 2 giờ.`,
        'Ghi điều kiện thực tế của biến (vận tốc dương) cùng với điều kiện xác định.'),
    ],
  },
  notes: {
    'tu-thuc-mau-thuc': 'Đa thức là phân thức có mẫu bằng 1; số cũng là phân thức.',
    'hai-phan-thuc-bang-nhau': 'Dùng tích chéo \\(A\\cdot D = B\\cdot C\\); khi tìm đa thức chưa biết, phân tích thành nhân tử để so sánh.',
    'dieu-kien-xac-dinh-phan-thuc': 'Phân tích mẫu thành nhân tử và cho từng thừa số khác 0; tìm điều kiện trước khi rút gọn.',
    'gia-tri-phan-thuc': 'Kiểm tra điều kiện xác định trước khi thay số; phân thức bằng 0 khi tử bằng 0 và mẫu khác 0.',
    'bai-toan-thuc-te-phan-thuc': 'Xác định công thức liên hệ các đại lượng (quãng đường – vận tốc – thời gian, …), ghi điều kiện thực tế của biến.',
  },
};

const BAI_22: LessonContent = {
  slug: 'bai-22-tinh-chat-co-ban-cua-phan-thuc-dai-so',
  applications: r`- Rút gọn biểu thức để tính giá trị nhanh và chính xác.
- Quy đồng mẫu thức để cộng, trừ các phân thức (Bài 23) và giải phương trình chứa ẩn ở mẫu.
- Tìm giá trị nguyên của biến để biểu thức nhận giá trị nguyên.`,
  theory: [
    th('property', 'Tính chất cơ bản của phân thức', r`- Nếu nhân cả tử và mẫu của một phân thức với cùng một đa thức khác đa thức 0 thì được một phân thức bằng phân thức đã cho.
- Nếu chia cả tử và mẫu của một phân thức cho một nhân tử chung của chúng thì được một phân thức bằng phân thức đã cho.`,
      r`\dfrac{A}{B} = \dfrac{A\cdot M}{B\cdot M}\ (M \ne 0);\quad \dfrac{A}{B} = \dfrac{A : N}{B : N}`),
    th('rule', 'Quy tắc đổi dấu', r`Nếu đổi dấu cả tử và mẫu của một phân thức thì được một phân thức bằng phân thức đã cho.`, r`\dfrac{A}{B} = \dfrac{-A}{-B}`,
      r`\(\dfrac{2 - x}{3 - x} = \dfrac{x - 2}{x - 3}\).`),
    th('rule', 'Rút gọn phân thức', r`- Phân tích tử và mẫu thành nhân tử (nếu cần) để tìm nhân tử chung.
- Chia cả tử và mẫu cho nhân tử chung.`, undefined,
      r`\(\dfrac{3x - 6}{x^2 - 4} = \dfrac{3(x - 2)}{(x - 2)(x + 2)} = \dfrac{3}{x + 2}\).`),
    th('rule', 'Quy đồng mẫu thức nhiều phân thức', r`- Phân tích các mẫu thành nhân tử rồi tìm **mẫu thức chung** (MTC): tích của các nhân tử, mỗi nhân tử lấy với số mũ lớn nhất.
- Tìm **nhân tử phụ** của mỗi mẫu (MTC chia cho mẫu đó).
- Nhân tử và mẫu của mỗi phân thức với nhân tử phụ tương ứng.`, undefined,
      r`\(\dfrac{1}{2x}\), \(\dfrac{3}{x^2}\) có MTC \(2x^2\): \(\dfrac{x}{2x^2}\), \(\dfrac{6}{2x^2}\).`),
    th('note', 'Lưu ý', r`- Chỉ rút gọn **nhân tử** chung, không rút gọn **hạng tử**: \(\dfrac{x + 2}{x + 3} \ne \dfrac23\).
- Giá trị của phân thức sau khi rút gọn chỉ dùng được với các giá trị của biến thỏa mãn điều kiện xác định của phân thức ban đầu.`),
  ],
  formulas: [
    {
      group: 'Tính chất cơ bản',
      items: [
        fc('Nhân tử và mẫu', r`\dfrac{A}{B} = \dfrac{A\cdot M}{B\cdot M}`, r`- \(M\): đa thức khác đa thức 0`, r`\(\dfrac{x}{x - 1} = \dfrac{x(x + 1)}{x^2 - 1}\).`),
        fc('Chia tử và mẫu cho nhân tử chung', r`\dfrac{A}{B} = \dfrac{A : N}{B : N}`, r`- \(N\): nhân tử chung của \(A\) và \(B\)`, r`\(\dfrac{6x^2y}{9xy^3} = \dfrac{2x}{3y^2}\).`),
        fc('Quy tắc đổi dấu', r`\dfrac{A}{B} = \dfrac{-A}{-B}`, r`- \(A, B\): đa thức, \(B \ne 0\)`, r`\(\dfrac{-x}{1 - x} = \dfrac{x}{x - 1}\).`),
      ],
    },
    {
      group: 'Quy đồng mẫu thức',
      items: [
        fc('Nhân tử phụ', r`\text{nhân tử phụ} = \text{MTC} : \text{mẫu}`, r`- MTC: mẫu thức chung`, r`MTC \(2(x - 2)(x + 2)\), mẫu \(2x + 4\): nhân tử phụ \(x - 2\).`),
      ],
    },
  ],
  examples: {
    'van-dung-tinh-chat-co-ban': [
      ex(1, r`Điền đa thức thích hợp vào chỗ trống: \(\dfrac{x}{x - 1} = \dfrac{\ldots}{x^2 - 1}\).`,
        'Mẫu mới \\(x^2 - 1 = (x - 1)(x + 1)\\): mẫu cũ đã được nhân với \\(x + 1\\).',
        'Tính chất cơ bản của phân thức.',
        [r`\(x^2 - 1 = (x - 1)(x + 1)\) nên mẫu được nhân với \(x + 1\).`, r`Nhân tử với \(x + 1\): \(x(x + 1) = x^2 + x\).`],
        r`Điền \(x^2 + x\).`),
      ex(2, r`a) Dùng quy tắc đổi dấu, viết \(\dfrac{2 - x}{3 - x}\) và \(\dfrac{-x}{1 - x}\) thành phân thức có mẫu với hệ số của \(x\) dương.
b) Chứng tỏ \(\dfrac{x^2 + 2x}{x^2 - 4} = \dfrac{x}{x - 2}\).`,
        'a) Đổi dấu cả tử và mẫu. b) Chia cả tử và mẫu cho nhân tử chung \\(x + 2\\).',
        'Quy tắc đổi dấu; tính chất cơ bản của phân thức.',
        [r`a) \(\dfrac{2 - x}{3 - x} = \dfrac{x - 2}{x - 3}\); \(\dfrac{-x}{1 - x} = \dfrac{x}{x - 1}\).`, r`b) \(\dfrac{x^2 + 2x}{x^2 - 4} = \dfrac{x(x + 2)}{(x - 2)(x + 2)}\).`, r`Chia tử và mẫu cho \(x + 2\): được \(\dfrac{x}{x - 2}\).`],
        r`a) \(\dfrac{x - 2}{x - 3}\); \(\dfrac{x}{x - 1}\). b) Đẳng thức đúng (với \(x \ne \pm2\)).`),
    ],
    'rut-gon-phan-thuc': [
      ex(2, r`Rút gọn: a) \(\dfrac{6x^2y}{9xy^3}\); b) \(\dfrac{3x - 6}{x^2 - 4}\).`,
        'a) Chia tử và mẫu cho ƯCLN của hệ số và lũy thừa chung. b) Phân tích tử, mẫu thành nhân tử.',
        'Rút gọn phân thức; đặt nhân tử chung; hiệu hai bình phương.',
        [r`a) Nhân tử chung \(3xy\): \(\dfrac{6x^2y}{9xy^3} = \dfrac{2x}{3y^2}\).`, r`b) \(\dfrac{3(x - 2)}{(x - 2)(x + 2)} = \dfrac{3}{x + 2}\).`],
        r`a) \(\dfrac{2x}{3y^2}\); b) \(\dfrac{3}{x + 2}\).`),
      ex(3, r`Rút gọn phân thức \(\dfrac{x^2 - 2x + 1}{x^3 - 1}\).`,
        'Tử là bình phương của một hiệu, mẫu là hiệu hai lập phương: cùng có nhân tử \\(x - 1\\).',
        'Hằng đẳng thức; rút gọn phân thức.',
        [r`\(x^2 - 2x + 1 = (x - 1)^2\); \(x^3 - 1 = (x - 1)(x^2 + x + 1)\).`, r`Chia tử và mẫu cho \(x - 1\): \(\dfrac{x - 1}{x^2 + x + 1}\).`],
        r`\(\dfrac{x - 1}{x^2 + x + 1}\).`),
    ],
    'quy-dong-mau-thuc': [
      ex(2, r`Quy đồng mẫu thức hai phân thức \(\dfrac{1}{2x}\) và \(\dfrac{3}{x^2}\).`,
        'MTC lấy hệ số 2 và lũy thừa cao nhất \\(x^2\\).',
        'Quy đồng mẫu thức.',
        [r`MTC \(= 2x^2\).`, r`Nhân tử phụ: \(2x^2 : 2x = x\); \(2x^2 : x^2 = 2\).`, r`\(\dfrac{1}{2x} = \dfrac{x}{2x^2}\); \(\dfrac{3}{x^2} = \dfrac{6}{2x^2}\).`],
        r`\(\dfrac{x}{2x^2}\) và \(\dfrac{6}{2x^2}\).`),
      ex(3, r`Quy đồng mẫu thức hai phân thức \(\dfrac{1}{x^2 - 4}\) và \(\dfrac{x}{2x + 4}\).`,
        'Phân tích các mẫu thành nhân tử trước khi tìm MTC.',
        'Phân tích đa thức thành nhân tử; quy đồng mẫu thức.',
        [r`\(x^2 - 4 = (x - 2)(x + 2)\); \(2x + 4 = 2(x + 2)\). MTC \(= 2(x - 2)(x + 2)\).`, r`Nhân tử phụ lần lượt là \(2\) và \(x - 2\).`, r`\(\dfrac{1}{x^2 - 4} = \dfrac{2}{2(x - 2)(x + 2)}\); \(\dfrac{x}{2x + 4} = \dfrac{x(x - 2)}{2(x - 2)(x + 2)}\).`],
        r`\(\dfrac{2}{2(x - 2)(x + 2)}\) và \(\dfrac{x(x - 2)}{2(x - 2)(x + 2)}\).`,
        'Để MTC ở dạng tích giúp tìm nhân tử phụ và rút gọn về sau dễ hơn.'),
    ],
    'rut-gon-tinh-gia-tri-phan-thuc-tong-hop': [
      ex(3, r`Cho \(A = \dfrac{x^2 - 9}{x^2 + 3x}\). Rút gọn \(A\) rồi tính giá trị của \(A\) tại \(x = -1\).`,
        'Tìm điều kiện xác định, rút gọn, kiểm tra \\(x = -1\\) thỏa mãn điều kiện rồi thay số.',
        'Điều kiện xác định; rút gọn phân thức.',
        [r`Điều kiện: \(x(x + 3) \ne 0\), tức \(x \ne 0\), \(x \ne -3\).`, r`\(A = \dfrac{(x - 3)(x + 3)}{x(x + 3)} = \dfrac{x - 3}{x}\).`, r`\(x = -1\) thỏa mãn điều kiện: \(A = \dfrac{-1 - 3}{-1} = 4\).`],
        r`\(A = \dfrac{x - 3}{x}\); tại \(x = -1\), \(A = 4\).`),
      ex(4, r`Cho \(B = \dfrac{2x + 6}{x^2 + 3x}\). Tìm các giá trị nguyên của \(x\) để \(B\) nhận giá trị nguyên.`,
        'Rút gọn \\(B\\) về dạng \\(\\dfrac{k}{\\text{biểu thức}}\\); \\(B\\) nguyên khi mẫu là ước của \\(k\\).',
        'Rút gọn phân thức; ước của số nguyên; điều kiện xác định.',
        [r`Điều kiện: \(x \ne 0\), \(x \ne -3\). \(B = \dfrac{2(x + 3)}{x(x + 3)} = \dfrac{2}{x}\).`, r`\(B\) nguyên khi \(x\) là ước của 2: \(x \in \{-2; -1; 1; 2\}\).`, r`Các giá trị này đều thỏa mãn điều kiện xác định.`],
        r`\(x \in \{-2; -1; 1; 2\}\).`,
        'Đừng quên loại các giá trị vi phạm điều kiện xác định (ở đây \\(x = -3\\) không xuất hiện nhưng phải kiểm tra).'),
    ],
  },
  notes: {
    'van-dung-tinh-chat-co-ban': 'So sánh mẫu (hoặc tử) cũ và mới để biết đã nhân, chia với đa thức nào; đổi dấu thì đổi cả tử lẫn mẫu.',
    'rut-gon-phan-thuc': 'Phân tích tử và mẫu thành nhân tử rồi mới chia; chỉ chia nhân tử chung, không gạch hạng tử.',
    'quy-dong-mau-thuc': 'Phân tích mẫu thành nhân tử, MTC lấy mỗi nhân tử với số mũ lớn nhất; để ý nhân tử đối nhau như \\(x - 2\\) và \\(2 - x\\).',
    'rut-gon-tinh-gia-tri-phan-thuc-tong-hop': 'Tìm điều kiện xác định trước, rút gọn sau; mọi giá trị tìm được phải đối chiếu điều kiện.',
  },
};

const BAI_23: LessonContent = {
  slug: 'bai-23-phep-cong-va-phep-tru-phan-thuc-dai-so',
  applications: r`- Tính tổng công việc hai vòi nước, hai người cùng làm trong một giờ: \(\dfrac1a + \dfrac1b\).
- Tính tổng thời gian đi và về khi vận tốc khác nhau.
- Rút gọn biểu thức trước khi giải phương trình, bài toán thực tế.`,
  theory: [
    th('rule', 'Cộng hai phân thức cùng mẫu', r`Muốn cộng hai phân thức có cùng mẫu thức, ta cộng các tử thức với nhau và giữ nguyên mẫu thức.`, r`\dfrac{A}{M} + \dfrac{B}{M} = \dfrac{A + B}{M}`,
      r`\(\dfrac{2x + 1}{x + 3} + \dfrac{x - 4}{x + 3} = \dfrac{3x - 3}{x + 3}\).`),
    th('rule', 'Cộng hai phân thức khác mẫu', r`Muốn cộng hai phân thức có mẫu khác nhau, ta quy đồng mẫu thức rồi cộng các phân thức có cùng mẫu vừa tìm được.`),
    th('definition', 'Phân thức đối', r`Hai phân thức gọi là đối nhau nếu tổng của chúng bằng 0. Phân thức đối của \(\dfrac{A}{B}\) là \(-\dfrac{A}{B}\).`, r`-\dfrac{A}{B} = \dfrac{-A}{B} = \dfrac{A}{-B}`),
    th('rule', 'Trừ hai phân thức', r`Muốn trừ phân thức \(\dfrac{A}{B}\) cho phân thức \(\dfrac{C}{D}\), ta cộng \(\dfrac{A}{B}\) với phân thức đối của \(\dfrac{C}{D}\).`, r`\dfrac{A}{B} - \dfrac{C}{D} = \dfrac{A}{B} + \left(-\dfrac{C}{D}\right)`),
    th('property', 'Tính chất của phép cộng', r`Phép cộng phân thức có tính chất giao hoán và kết hợp; có thể nhóm các phân thức cùng mẫu hoặc dễ quy đồng để tính nhanh.`),
    th('note', 'Lưu ý', r`- Dấu trừ trước một phân thức áp dụng cho **cả tử thức**: đặt tử trong ngoặc khi trừ.
- Luôn rút gọn kết quả (nếu được).`),
  ],
  formulas: [
    {
      group: 'Cộng, trừ phân thức',
      items: [
        fc('Cộng cùng mẫu', r`\dfrac{A}{M} + \dfrac{B}{M} = \dfrac{A + B}{M}`, r`- \(M\): mẫu thức chung, khác 0`, r`\(\dfrac{x}{x + 1} + \dfrac{1}{x + 1} = 1\).`),
        fc('Trừ cùng mẫu', r`\dfrac{A}{M} - \dfrac{B}{M} = \dfrac{A - B}{M}`, r`- \(M\): mẫu thức chung, khác 0`, r`\(\dfrac{3x}{x - 1} - \dfrac{3}{x - 1} = 3\).`),
        fc('Cộng khác mẫu', r`\dfrac{A}{B} + \dfrac{C}{D} = \dfrac{AD + BC}{BD}`, r`- \(B, D\): mẫu khác 0 (có thể dùng MTC nhỏ hơn \(BD\))`, r`\(\dfrac{1}{x} + \dfrac{1}{x + 2} = \dfrac{2x + 2}{x(x + 2)}\).`),
        fc('Tách phân thức', r`\dfrac{1}{k(k + 1)} = \dfrac{1}{k} - \dfrac{1}{k + 1}`, r`- \(k\): biểu thức khác 0 và khác \(-1\)`, r`\(\dfrac{1}{x(x + 1)} = \dfrac1x - \dfrac{1}{x + 1}\).`),
      ],
    },
  ],
  examples: {
    'cong-hai-phan-thuc': [
      ex(1, r`Thực hiện phép cộng \(\dfrac{2x + 1}{x + 3} + \dfrac{x - 4}{x + 3}\).`,
        'Hai phân thức cùng mẫu: cộng các tử.',
        'Cộng hai phân thức cùng mẫu.',
        [r`\(\dfrac{(2x + 1) + (x - 4)}{x + 3} = \dfrac{3x - 3}{x + 3}\).`, r`Tử \(3(x - 1)\) và mẫu \(x + 3\) không có nhân tử chung nên không rút gọn được.`],
        r`\(\dfrac{3x - 3}{x + 3}\).`),
      ex(2, r`Thực hiện phép cộng \(\dfrac{1}{x - 2} + \dfrac{3}{x + 2}\).`,
        'Hai mẫu khác nhau: quy đồng với MTC \\((x - 2)(x + 2)\\).',
        'Quy đồng mẫu thức; cộng phân thức.',
        [r`MTC \(= (x - 2)(x + 2)\).`, r`\(\dfrac{x + 2}{(x - 2)(x + 2)} + \dfrac{3(x - 2)}{(x - 2)(x + 2)} = \dfrac{4x - 4}{(x - 2)(x + 2)}\).`],
        r`\(\dfrac{4x - 4}{x^2 - 4}\).`),
    ],
    'tru-hai-phan-thuc': [
      ex(1, r`Thực hiện phép trừ \(\dfrac{3x}{x - 1} - \dfrac{3}{x - 1}\).`,
        'Cùng mẫu: trừ các tử rồi rút gọn.',
        'Trừ hai phân thức cùng mẫu; rút gọn.',
        [r`\(\dfrac{3x - 3}{x - 1} = \dfrac{3(x - 1)}{x - 1}\).`, r`Rút gọn: \(= 3\) (với \(x \ne 1\)).`],
        r`\(3\).`),
      ex(2, r`Thực hiện phép trừ \(\dfrac{x}{x - 3} - \dfrac{9}{x^2 - 3x}\).`,
        'Mẫu thứ hai \\(x^2 - 3x = x(x - 3)\\) chính là MTC.',
        'Quy đồng; trừ phân thức; rút gọn.',
        [r`MTC \(= x(x - 3)\).`, r`\(\dfrac{x\cdot x}{x(x - 3)} - \dfrac{9}{x(x - 3)} = \dfrac{x^2 - 9}{x(x - 3)}\).`, r`\(= \dfrac{(x - 3)(x + 3)}{x(x - 3)} = \dfrac{x + 3}{x}\).`],
        r`\(\dfrac{x + 3}{x}\).`),
    ],
    'cong-tru-nhieu-phan-thuc': [
      ex(2, r`Tính \(\dfrac{1}{x} + \dfrac{2}{x + 1} - \dfrac{1}{x(x + 1)}\).`,
        'MTC là \\(x(x + 1)\\); quy đồng ba phân thức rồi cộng, trừ tử.',
        'Quy đồng mẫu; cộng, trừ phân thức.',
        [r`MTC \(= x(x + 1)\).`, r`Tử: \((x + 1) + 2x - 1 = 3x\).`, r`Kết quả: \(\dfrac{3x}{x(x + 1)} = \dfrac{3}{x + 1}\).`],
        r`\(\dfrac{3}{x + 1}\).`),
      ex(3, r`Tính \(\dfrac{x}{x - 2} - \dfrac{2}{x + 2} - \dfrac{8}{x^2 - 4}\).`,
        'MTC là \\(x^2 - 4 = (x - 2)(x + 2)\\).',
        'Quy đồng mẫu; trừ phân thức; rút gọn.',
        [r`Tử sau khi quy đồng: \(x(x + 2) - 2(x - 2) - 8\).`, r`\(= x^2 + 2x - 2x + 4 - 8 = x^2 - 4\).`, r`Kết quả: \(\dfrac{x^2 - 4}{x^2 - 4} = 1\) (với \(x \ne \pm2\)).`],
        r`\(1\).`),
      ex(4, r`Tính nhanh \(\dfrac{1}{x(x + 1)} + \dfrac{1}{(x + 1)(x + 2)} + \dfrac{1}{(x + 2)(x + 3)}\).`,
        'Mỗi phân thức có dạng \\(\\dfrac{1}{k(k + 1)}\\): tách thành hiệu để các số hạng triệt tiêu dần.',
        r`\(\dfrac{1}{k(k + 1)} = \dfrac1k - \dfrac{1}{k + 1}\).`,
        [r`Tách: \(\left(\dfrac1x - \dfrac{1}{x + 1}\right) + \left(\dfrac{1}{x + 1} - \dfrac{1}{x + 2}\right) + \left(\dfrac{1}{x + 2} - \dfrac{1}{x + 3}\right)\).`, r`Các số hạng ở giữa triệt tiêu: \(= \dfrac1x - \dfrac{1}{x + 3}\).`, r`\(= \dfrac{x + 3 - x}{x(x + 3)} = \dfrac{3}{x(x + 3)}\).`],
        r`\(\dfrac{3}{x(x + 3)}\).`,
        'Nhận ra hai thừa số ở mẫu hơn kém nhau 1 là dấu hiệu dùng kĩ thuật tách phân thức.'),
    ],
    'thuc-te-cong-tru-phan-thuc': [
      ex(3, r`Hai vòi nước cùng chảy vào một bể cạn. Nếu chảy riêng, vòi thứ nhất chảy đầy bể trong \(x\) giờ, vòi thứ hai trong \(x + 2\) giờ.
a) Viết phân thức biểu thị phần bể cả hai vòi chảy được trong 1 giờ.
b) Tính phần bể đó khi \(x = 4\).`,
        'Trong 1 giờ, vòi chảy đầy bể trong \\(a\\) giờ thì chảy được \\(\\dfrac1a\\) bể.',
        'Phân thức biểu thị năng suất; cộng phân thức.',
        [r`Trong 1 giờ: vòi thứ nhất chảy \(\dfrac1x\) bể, vòi thứ hai chảy \(\dfrac{1}{x + 2}\) bể.`, r`a) Cả hai vòi: \(\dfrac1x + \dfrac{1}{x + 2} = \dfrac{2x + 2}{x(x + 2)}\) (bể).`, r`b) Khi \(x = 4\): \(\dfrac{10}{24} = \dfrac{5}{12}\) (bể).`],
        r`a) \(\dfrac{2x + 2}{x(x + 2)}\) bể; b) \(\dfrac{5}{12}\) bể.`,
        'Bài toán làm chung: đổi “thời gian làm xong” thành “phần việc làm được trong một đơn vị thời gian”.'),
    ],
  },
  notes: {
    'cong-hai-phan-thuc': 'Cùng mẫu thì cộng tử; khác mẫu thì quy đồng trước; rút gọn kết quả.',
    'tru-hai-phan-thuc': 'Đặt tử của phân thức bị trừ trong ngoặc để đổi dấu đúng mọi hạng tử.',
    'cong-tru-nhieu-phan-thuc': 'Phân tích các mẫu, tìm MTC một lần cho tất cả; chú ý các mẫu đối nhau và kĩ thuật tách phân thức.',
    'thuc-te-cong-tru-phan-thuc': 'Đặt ẩn, biểu diễn các đại lượng bằng phân thức, rồi cộng, trừ; kiểm tra điều kiện thực tế.',
  },
};

const BAI_24: LessonContent = {
  slug: 'bai-24-phep-nhan-va-phep-chia-phan-thuc-dai-so',
  applications: r`- Tính chiều dài khi biết diện tích và chiều rộng là các phân thức; tính quãng đường khi biết vận tốc và thời gian.
- Đổi đơn vị, tính tỉ lệ trong khoa học: mật độ, năng suất.
- Rút gọn biểu thức phức tạp trước khi tính giá trị hoặc tìm giá trị nguyên.`,
  theory: [
    th('rule', 'Nhân hai phân thức', r`Muốn nhân hai phân thức, ta nhân các tử thức với nhau, các mẫu thức với nhau.`, r`\dfrac{A}{B}\cdot\dfrac{C}{D} = \dfrac{A\cdot C}{B\cdot D}`,
      r`\(\dfrac{3x}{y^2}\cdot\dfrac{y}{6x^2} = \dfrac{3xy}{6x^2y^2} = \dfrac{1}{2xy}\).`),
    th('property', 'Tính chất của phép nhân', r`Phép nhân phân thức có tính chất giao hoán, kết hợp và phân phối đối với phép cộng.`, r`\dfrac{A}{B}\left(\dfrac{C}{D} + \dfrac{E}{F}\right) = \dfrac{A}{B}\cdot\dfrac{C}{D} + \dfrac{A}{B}\cdot\dfrac{E}{F}`),
    th('definition', 'Phân thức nghịch đảo', r`Hai phân thức gọi là nghịch đảo của nhau nếu tích của chúng bằng 1. Phân thức nghịch đảo của \(\dfrac{A}{B}\) (\(A \ne 0\)) là \(\dfrac{B}{A}\).`),
    th('rule', 'Chia hai phân thức', r`Muốn chia phân thức \(\dfrac{A}{B}\) cho phân thức \(\dfrac{C}{D}\) khác 0, ta nhân \(\dfrac{A}{B}\) với phân thức nghịch đảo của \(\dfrac{C}{D}\).`, r`\dfrac{A}{B} : \dfrac{C}{D} = \dfrac{A}{B}\cdot\dfrac{D}{C}\quad \left(\dfrac{C}{D} \ne 0\right)`),
    th('rule', 'Thứ tự thực hiện phép tính', r`Trong ngoặc trước; nhân, chia trước; cộng, trừ sau – giống như với các số.`),
    th('note', 'Lưu ý', r`Phân tích tử và mẫu thành nhân tử **trước khi nhân** để rút gọn ngay, tránh khai triển dài. Khi chia, cần thêm điều kiện phân thức chia khác 0.`),
  ],
  formulas: [
    {
      group: 'Nhân, chia phân thức',
      items: [
        fc('Nhân phân thức', r`\dfrac{A}{B}\cdot\dfrac{C}{D} = \dfrac{AC}{BD}`, r`- \(B, D\): đa thức khác 0`, r`\(\dfrac{x^2 - 1}{2x + 4}\cdot\dfrac{x + 2}{x - 1} = \dfrac{x + 1}{2}\).`),
        fc('Phân thức nghịch đảo', r`\dfrac{A}{B}\cdot\dfrac{B}{A} = 1`, r`- \(A, B\): đa thức khác 0`, r`Nghịch đảo của \(\dfrac{x - 2}{x + 1}\) là \(\dfrac{x + 1}{x - 2}\).`),
        fc('Chia phân thức', r`\dfrac{A}{B} : \dfrac{C}{D} = \dfrac{A}{B}\cdot\dfrac{D}{C}`, r`- \(\dfrac{C}{D} \ne 0\)`, r`\(\dfrac{4x}{5y} : \dfrac{2x}{15y^2} = 6y\).`),
      ],
    },
  ],
  examples: {
    'nhan-phan-thuc': [
      ex(1, r`Tính \(\dfrac{3x}{y^2}\cdot\dfrac{y}{6x^2}\).`,
        'Nhân tử với tử, mẫu với mẫu rồi rút gọn.',
        'Quy tắc nhân phân thức; rút gọn.',
        [r`\(\dfrac{3x\cdot y}{y^2\cdot6x^2} = \dfrac{3xy}{6x^2y^2}\).`, r`Rút gọn cho \(3xy\): \(\dfrac{1}{2xy}\).`],
        r`\(\dfrac{1}{2xy}\).`),
      ex(2, r`Tính \(\dfrac{x^2 - 1}{2x + 4}\cdot\dfrac{x + 2}{x - 1}\).`,
        'Phân tích các tử, mẫu thành nhân tử trước khi nhân.',
        'Nhân phân thức; hiệu hai bình phương; rút gọn.',
        [r`\(= \dfrac{(x - 1)(x + 1)}{2(x + 2)}\cdot\dfrac{x + 2}{x - 1}\).`, r`Rút gọn \(x - 1\) và \(x + 2\): \(= \dfrac{x + 1}{2}\).`],
        r`\(\dfrac{x + 1}{2}\).`),
    ],
    'chia-phan-thuc': [
      ex(1, r`Tính \(\dfrac{4x}{5y} : \dfrac{2x}{15y^2}\).`,
        'Chuyển phép chia thành phép nhân với nghịch đảo.',
        'Quy tắc chia phân thức.',
        [r`\(= \dfrac{4x}{5y}\cdot\dfrac{15y^2}{2x} = \dfrac{60xy^2}{10xy}\).`, r`\(= 6y\).`],
        r`\(6y\).`),
      ex(2, r`Tính \(\dfrac{x^2 - 4}{x^2 + x} : \dfrac{x - 2}{x + 1}\).`,
        'Nhân với nghịch đảo, phân tích thành nhân tử và rút gọn.',
        'Chia phân thức; phân tích đa thức thành nhân tử.',
        [r`\(= \dfrac{(x - 2)(x + 2)}{x(x + 1)}\cdot\dfrac{x + 1}{x - 2}\).`, r`\(= \dfrac{x + 2}{x}\).`],
        r`\(\dfrac{x + 2}{x}\).`),
    ],
    'tim-thanh-phan-chua-biet-phan-thuc': [
      ex(2, r`Tìm phân thức \(M\), biết \(M\cdot\dfrac{x}{x + 1} = \dfrac{x^2}{x^2 - 1}\).`,
        '\\(M\\) là một thừa số: thừa số = tích : thừa số kia.',
        'Chia phân thức.',
        [r`\(M = \dfrac{x^2}{x^2 - 1} : \dfrac{x}{x + 1} = \dfrac{x^2}{(x - 1)(x + 1)}\cdot\dfrac{x + 1}{x}\).`, r`\(M = \dfrac{x}{x - 1}\).`],
        r`\(M = \dfrac{x}{x - 1}\).`),
      ex(3, r`Tìm phân thức \(N\), biết \(N : \dfrac{x - 3}{x} = \dfrac{x^2 + 3x}{x^2 - 9}\).`,
        '\\(N\\) là số bị chia: số bị chia = thương × số chia.',
        'Nhân phân thức; phân tích đa thức thành nhân tử.',
        [r`\(N = \dfrac{x^2 + 3x}{x^2 - 9}\cdot\dfrac{x - 3}{x}\).`, r`\(= \dfrac{x(x + 3)(x - 3)}{(x - 3)(x + 3)\,x} = 1\) (với \(x \ne 0\), \(x \ne \pm3\)).`],
        r`\(N = 1\).`,
        'Kết quả có thể là một hằng số – vẫn phải ghi điều kiện của biến.'),
    ],
    'tong-hop-cac-phep-tinh-phan-thuc': [
      ex(3, r`Rút gọn biểu thức \(\left(\dfrac{1}{x - 1} - \dfrac{1}{x + 1}\right) : \dfrac{2}{x^2 - 1}\).`,
        'Làm phép trừ trong ngoặc trước, rồi chia.',
        'Thứ tự thực hiện phép tính; trừ và chia phân thức.',
        [r`Trong ngoặc: \(\dfrac{(x + 1) - (x - 1)}{(x - 1)(x + 1)} = \dfrac{2}{x^2 - 1}\).`, r`Chia: \(\dfrac{2}{x^2 - 1} : \dfrac{2}{x^2 - 1} = 1\) (với \(x \ne \pm1\)).`],
        r`Biểu thức bằng 1.`),
      ex(4, r`Cho \(Q = \left(\dfrac{x + 1}{x - 1} - \dfrac{x - 1}{x + 1}\right) : \dfrac{2x}{x + 1}\). a) Rút gọn \(Q\). b) Tìm \(x\) nguyên để \(Q\) nhận giá trị nguyên.`,
        'Rút gọn trong ngoặc bằng hiệu hai bình phương ở tử; sau đó \\(Q\\) có dạng \\(\\dfrac{k}{x - 1}\\).',
        'Cộng, trừ, chia phân thức; ước của số nguyên; điều kiện xác định.',
        [r`Điều kiện: \(x \ne 1\), \(x \ne -1\), \(x \ne 0\).`, r`Trong ngoặc: \(\dfrac{(x + 1)^2 - (x - 1)^2}{(x - 1)(x + 1)} = \dfrac{4x}{(x - 1)(x + 1)}\).`, r`\(Q = \dfrac{4x}{(x - 1)(x + 1)}\cdot\dfrac{x + 1}{2x} = \dfrac{2}{x - 1}\).`, r`\(Q\) nguyên khi \(x - 1 \in \{-2; -1; 1; 2\}\), tức \(x \in \{-1; 0; 2; 3\}\); đối chiếu điều kiện, loại \(x = -1\), \(x = 0\).`],
        r`a) \(Q = \dfrac{2}{x - 1}\); b) \(x \in \{2; 3\}\).`,
        'Điều kiện \\(x \\ne 0\\) xuất hiện do phép chia cho \\(\\dfrac{2x}{x + 1}\\) – rất dễ bỏ sót.'),
    ],
    'thuc-te-nhan-chia-phan-thuc': [
      ex(3, r`Một hình chữ nhật có diện tích \(\dfrac{x^2 - 1}{x}\) (m²) và chiều rộng \(\dfrac{x - 1}{2}\) (m), với \(x > 1\). Tìm phân thức biểu thị chiều dài, rồi tính chiều dài khi \(x = 3\).`,
        'Chiều dài = diện tích : chiều rộng.',
        'Chia phân thức; giá trị của phân thức.',
        [r`Chiều dài: \(\dfrac{x^2 - 1}{x} : \dfrac{x - 1}{2} = \dfrac{(x - 1)(x + 1)}{x}\cdot\dfrac{2}{x - 1} = \dfrac{2(x + 1)}{x}\) (m).`, r`Khi \(x = 3\): \(\dfrac{2\cdot4}{3} = \dfrac83\) (m).`, r`Kiểm tra: chiều rộng \(1\) m, diện tích \(\dfrac{8}{3}\) m² \(= \dfrac83\cdot1\). Đúng.`],
        r`Chiều dài \(\dfrac{2(x + 1)}{x}\) m; khi \(x = 3\) là \(\dfrac83\) m.`),
    ],
  },
  notes: {
    'nhan-phan-thuc': 'Phân tích thành nhân tử rồi rút gọn chéo trước khi nhân để kết quả gọn.',
    'chia-phan-thuc': 'Đổi chia thành nhân với nghịch đảo; điều kiện: phân thức chia khác 0.',
    'tim-thanh-phan-chua-biet-phan-thuc': 'Xác định vai trò của phân thức cần tìm (thừa số, số bị chia, số chia) rồi dùng phép tính ngược.',
    'tong-hop-cac-phep-tinh-phan-thuc': 'Ghi đủ điều kiện xác định (cả điều kiện từ phép chia), làm theo thứ tự phép tính, rút gọn từng bước.',
    'thuc-te-nhan-chia-phan-thuc': 'Viết công thức liên hệ các đại lượng, thay phân thức vào và rút gọn; kiểm tra lại bằng số cụ thể.',
  },
};

export const CHUONG_6: LessonContent[] = [BAI_21, BAI_22, BAI_23, BAI_24];
