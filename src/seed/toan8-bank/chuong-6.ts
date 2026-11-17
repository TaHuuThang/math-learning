/** Ngân hàng câu hỏi GĐ4 – Chương VI. Phân thức đại số (Bài 21 – Bài 24). */
import { es, mc, r, sa, tf, type BankLesson } from './types';

const TM = 'tu-thuc-mau-thuc';
const HB = 'hai-phan-thuc-bang-nhau';
const DK = 'dieu-kien-xac-dinh-phan-thuc';
const GT = 'gia-tri-phan-thuc';
const TT = 'bai-toan-thuc-te-phan-thuc';

const B21: BankLesson = {
  slug: 'bai-21-phan-thuc-dai-so',
  questions: [
    mc(1, TM, 'Biểu thức nào sau đây KHÔNG phải là phân thức đại số?', [r`\(\dfrac{x + 1}{0}\)`, r`\(\dfrac{x}{3}\)`, r`\(x^2 + 1\)`, r`\(\dfrac{5}{x - y}\)`], 'Mẫu của phân thức phải khác đa thức 0.', [
      'Mẫu bằng 0 nên không phải phân thức.',
      'Tử và mẫu là đa thức, mẫu khác 0.',
      'Mỗi đa thức là một phân thức có mẫu bằng 1.',
      'Tử và mẫu là đa thức, mẫu khác đa thức 0.',
    ]),
    mc(1, TM, r`Mẫu thức của phân thức \(\dfrac{2x - 1}{x^2 + 3}\) là`, [r`\(x^2 + 3\)`, r`\(2x - 1\)`, r`\(x^2\)`, r`\(3\)`], 'Mẫu thức là đa thức viết dưới gạch phân số.', [
      undefined,
      'Đó là tử thức.',
      'Phải lấy cả đa thức ở mẫu.',
      'Phải lấy cả đa thức ở mẫu.',
    ]),
    mc(1, TM, 'Mỗi đa thức cũng được coi là một phân thức có mẫu bằng', [r`\(1\)`, r`\(0\)`, 'chính đa thức đó', r`\(x\)`], r`\(A = \dfrac{A}{1}\).`, [
      undefined,
      'Mẫu phải khác 0.',
      r`\(\dfrac{A}{A} = 1\), không bằng \(A\).`,
      r`\(\dfrac{A}{x} \ne A\).`,
    ]),
    mc(1, HB, r`Hai phân thức \(\dfrac{A}{B}\) và \(\dfrac{C}{D}\) bằng nhau khi`, [r`\(A\cdot D = B\cdot C\)`, r`\(A\cdot C = B\cdot D\)`, r`\(A + D = B + C\)`, r`\(A - C = B - D\)`], 'Định nghĩa hai phân thức bằng nhau: tích chéo bằng nhau.', [
      undefined,
      'Nhân sai cặp.',
      'Không phải định nghĩa.',
      'Không phải định nghĩa.',
    ]),
    mc(2, HB, r`Phân thức nào sau đây bằng phân thức \(\dfrac{x}{x - 1}\)?`, [r`\(\dfrac{x^2}{x^2 - x}\)`, r`\(\dfrac{x + 1}{x}\)`, r`\(\dfrac{x^2}{(x - 1)^2}\)`, r`\(\dfrac{2x}{x - 2}\)`], r`\(x\cdot(x^2 - x) = x^2(x - 1) = (x - 1)\cdot x^2\) nên hai phân thức bằng nhau.`, [
      undefined,
      'Cộng 1 vào tử và mẫu không giữ nguyên phân thức.',
      'Chỉ bình phương tử và mẫu không giữ nguyên phân thức.',
      'Nhân tử với 2 nhưng mẫu không nhân 2.',
    ]),
    mc(2, HB, r`Đa thức \(A\) thỏa mãn \(\dfrac{A}{x + 2} = \dfrac{x^2 - 4}{(x + 2)^2}\) là`, [r`\(x - 2\)`, r`\(x + 2\)`, r`\(x^2 - 4\)`, r`\(1\)`], r`\(A(x + 2)^2 = (x + 2)(x^2 - 4) = (x + 2)^2(x - 2)\) nên \(A = x - 2\).`, [
      undefined,
      'Sai dấu.',
      'Chưa chia cho \\(x + 2\\).',
      'Rút gọn sai.',
    ]),
    mc(1, DK, r`Phân thức \(\dfrac{3}{x - 5}\) xác định khi`, [r`\(x \ne 5\)`, r`\(x \ne -5\)`, r`\(x \ne 3\)`, r`\(x = 5\)`], r`Mẫu khác 0: \(x - 5 \ne 0 \iff x \ne 5\).`, [
      undefined,
      'Sai dấu.',
      'Điều kiện đặt cho mẫu, không phải tử.',
      'Khi đó mẫu bằng 0.',
    ]),
    mc(2, DK, r`Phân thức \(\dfrac{x + 1}{x^2 - 9}\) xác định khi`, [r`\(x \ne 3\) và \(x \ne -3\)`, r`\(x \ne 3\)`, r`\(x \ne 9\)`, r`\(x \ne -1\)`], r`\(x^2 - 9 = (x - 3)(x + 3) \ne 0 \iff x \ne 3\) và \(x \ne -3\).`, [
      undefined,
      r`Bỏ sót \(x \ne -3\).`,
      r`\(x^2 \ne 9\), không phải \(x \ne 9\).`,
      'Điều kiện đặt cho mẫu.',
    ]),
    mc(3, DK, r`Phân thức \(\dfrac{2}{x^2 + 1}\) xác định khi`, [r`với mọi giá trị của \(x\)`, r`\(x \ne 1\)`, r`\(x \ne -1\)`, r`\(x \ne 1\) và \(x \ne -1\)`], r`\(x^2 + 1 \ge 1 > 0\) với mọi \(x\) nên mẫu luôn khác 0.`, [
      undefined,
      r`Tại \(x = 1\) mẫu bằng 2.`,
      r`Tại \(x = -1\) mẫu bằng 2.`,
      r`Nhầm với \(x^2 - 1\).`,
    ]),
    mc(2, GT, r`Giá trị của phân thức \(\dfrac{x^2 - 1}{x + 3}\) tại \(x = 2\) là`, [r`\(\dfrac35\)`, r`\(1\)`, r`\(\dfrac53\)`, r`\(3\)`], r`\(\dfrac{4 - 1}{2 + 3} = \dfrac35\).`, [
      undefined,
      'Tính sai tử.',
      'Đảo tử và mẫu.',
      'Chỉ tính tử.',
    ]),
    mc(3, GT, r`Phân thức \(\dfrac{x - 2}{x + 1}\) có giá trị bằng 0 khi`, [r`\(x = 2\)`, r`\(x = -1\)`, r`\(x = 0\)`, r`\(x = -2\)`], r`Phân thức bằng 0 khi tử bằng 0 và mẫu khác 0: \(x = 2\) (khi đó mẫu bằng 3).`, [
      undefined,
      'Khi đó phân thức không xác định.',
      r`Tại \(x = 0\) giá trị là \(-2\).`,
      'Sai dấu.',
    ]),
    mc(3, GT, r`Giá trị của phân thức \(\dfrac{x^2 - 4}{x - 2}\) tại \(x = 2\) là`, ['không xác định', r`\(4\)`, r`\(0\)`, r`\(2\)`], r`Tại \(x = 2\) mẫu bằng 0 nên phân thức không xác định, dù rút gọn được thành \(x + 2\).`, [
      undefined,
      r`Thay vào \(x + 2\) sau khi rút gọn là sai vì \(x = 2\) không thỏa điều kiện xác định.`,
      'Tử bằng 0 nhưng mẫu cũng bằng 0.',
      'Không có cơ sở.',
    ]),
    mc(3, TT, r`Một ô tô đi quãng đường 150 km với vận tốc \(x\) (km/h). Phân thức biểu thị thời gian đi (giờ) là`, [r`\(\dfrac{150}{x}\)`, r`\(150x\)`, r`\(\dfrac{x}{150}\)`, r`\(150 + x\)`], 'Thời gian bằng quãng đường chia vận tốc.', [
      undefined,
      'Đó là quãng đường nếu đi 150 giờ.',
      'Đảo ngược phép chia.',
      'Không có ý nghĩa.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, TM, r`Cho phân thức \(\dfrac{x^2 + 1}{3x}\).`, [
      [r`Tử thức là \(x^2 + 1\).`, true, 'Đa thức trên gạch phân số.'],
      [r`Mẫu thức là \(3x\).`, true, 'Đa thức dưới gạch phân số.'],
      ['Đây là một đa thức.', false, 'Biến nằm ở mẫu nên không phải đa thức.'],
      [r`Phân thức xác định khi \(x \ne 0\).`, true, r`\(3x \ne 0\).`],
    ]),
    tf(1, TM, 'Xét tính đúng sai:', [
      ['Mỗi số thực là một phân thức.', true, 'Số \\(a = \\dfrac{a}{1}\\).'],
      ['Số 0 là một phân thức.', true, r`\(0 = \dfrac01\).`],
      [r`\(\dfrac1x\) là một đa thức.`, false, 'Biến ở mẫu.'],
      [r`\(\dfrac{2x}{5}\) là một phân thức.`, true, 'Tử và mẫu là đa thức.'],
    ]),
    tf(1, HB, 'Xét tính đúng sai:', [
      [r`\(\dfrac{x}{2} = \dfrac{3x}{6}\).`, true, r`\(x\cdot6 = 2\cdot3x\).`],
      [r`\(\dfrac{x + 1}{1} = x + 1\).`, true, 'Đa thức là phân thức có mẫu 1.'],
      [r`\(\dfrac1x = \dfrac{x}{x^2}\).`, true, r`\(1\cdot x^2 = x\cdot x\).`],
      [r`\(\dfrac{x + 2}{x + 3} = \dfrac23\).`, false, r`\(3(x + 2) \ne 2(x + 3)\) nói chung.`],
    ]),
    tf(2, HB, r`Cho \(P = \dfrac{x^2 - 1}{x + 1}\) và \(Q = x - 1\).`, [
      [r`\((x^2 - 1)\cdot1 = (x + 1)(x - 1)\).`, true, 'Hiệu hai bình phương.'],
      [r`\(P = Q\) với \(x \ne -1\).`, true, 'Tích chéo bằng nhau.'],
      [r`\(P\) xác định tại \(x = -1\).`, false, 'Mẫu bằng 0.'],
      [r`\(Q\) xác định với mọi \(x\).`, true, 'Đa thức luôn xác định.'],
    ]),
    tf(2, DK, 'Xét tính đúng sai về điều kiện xác định:', [
      [r`\(\dfrac{1}{x - 2}\) xác định khi \(x \ne 2\).`, true, 'Mẫu khác 0.'],
      [r`\(\dfrac{x}{x^2 + 4}\) xác định với mọi \(x\).`, true, r`\(x^2 + 4 > 0\).`],
      [r`\(\dfrac{x + 1}{x(x - 3)}\) xác định khi \(x \ne 0\) và \(x \ne 3\).`, true, 'Mỗi thừa số khác 0.'],
      [r`\(\dfrac{5}{x^2 - 1}\) xác định khi \(x \ne 1\).`, false, r`Còn \(x \ne -1\).`],
    ]),
    tf(3, DK, r`Cho \(P = \dfrac{x + 2}{x^2 + 4x + 4}\).`, [
      [r`Mẫu bằng \((x + 2)^2\).`, true, 'Bình phương của một tổng.'],
      [r`\(P\) xác định khi \(x \ne -2\).`, true, r`\((x + 2)^2 \ne 0\).`],
      [r`\(P\) xác định khi \(x \ne 2\).`, false, r`Mẫu bằng 0 tại \(x = -2\).`],
      [r`\(P = \dfrac{1}{x + 2}\) với \(x \ne -2\).`, true, r`\((x + 2)(x + 2) = 1\cdot(x + 2)^2\).`],
    ]),
    tf(2, GT, r`Cho phân thức \(\dfrac{2x + 1}{x - 1}\).`, [
      [r`Tại \(x = 2\) giá trị là 5.`, true, r`\(\dfrac{5}{1}\).`],
      [r`Tại \(x = 0\) giá trị là \(-1\).`, true, r`\(\dfrac{1}{-1}\).`],
      [r`Tại \(x = 1\) giá trị là 0.`, false, 'Phân thức không xác định tại \\(x = 1\\).'],
      [r`Tại \(x = -\dfrac12\) giá trị là 0.`, true, 'Tử bằng 0, mẫu khác 0.'],
    ]),
    tf(3, GT, r`Cho phân thức \(\dfrac{x^2 - 9}{x^2 + 3x}\).`, [
      [r`Điều kiện xác định: \(x \ne 0\) và \(x \ne -3\).`, true, r`\(x(x + 3) \ne 0\).`],
      [r`Phân thức bằng 0 khi \(x = 3\).`, true, 'Tử bằng 0, mẫu khác 0.'],
      [r`Phân thức bằng 0 khi \(x = -3\).`, false, 'Khi đó phân thức không xác định.'],
      [r`Tại \(x = 1\) giá trị là \(-2\).`, true, r`\(\dfrac{1 - 9}{1 + 3}\).`],
    ]),
    tf(3, TT, r`Một vòi nước chảy riêng thì đầy bể trong \(x\) giờ (\(x > 0\)).`, [
      [r`Trong 1 giờ vòi chảy được \(\dfrac1x\) bể.`, true, 'Năng suất bằng công việc chia thời gian.'],
      [r`Điều kiện của \(x\) là \(x > 0\).`, true, 'Thời gian dương.'],
      [r`Trong 3 giờ vòi chảy được \(\dfrac3x\) bể.`, true, r`\(3\cdot\dfrac1x\).`],
      [r`Trong 1 giờ vòi chảy được \(x\) bể.`, false, 'Đảo ngược.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, GT, r`Tính giá trị của phân thức \(\dfrac{x^2 + 2x}{x - 3}\) tại \(x = -1\).`, '1/4', r`\(\dfrac{1 - 2}{-1 - 3} = \dfrac{-1}{-4} = \dfrac14\).`),
    sa(3, DK, r`Tìm các giá trị của \(x\) làm phân thức \(\dfrac{x + 5}{x^2 - 4x}\) không xác định. (Viết các giá trị cách nhau bởi dấu ";")`, 'x = 0; x = 4', r`\(x^2 - 4x = x(x - 4) = 0 \iff x = 0\) hoặc \(x = 4\).`),
    sa(3, GT, r`Tìm \(x\) để phân thức \(\dfrac{2x - 6}{x + 1}\) có giá trị bằng 0.`, '3', r`Tử bằng 0: \(x = 3\); khi đó mẫu bằng 4 khác 0.`),
    sa(3, TT, r`Một xe đi quãng đường 120 km với vận tốc \(x\) (km/h) và quay về với vận tốc \(x + 10\) (km/h). Tính tổng thời gian đi và về khi \(x = 30\).`, '7', r`\(\dfrac{120}{30} + \dfrac{120}{40} = 4 + 3 = 7\) giờ.`, { unit: 'giờ' }),
    // ---- Tự luận ----
    es(2, DK, r`Tìm điều kiện xác định của các phân thức: a) \(\dfrac{x - 1}{2x + 6}\); b) \(\dfrac{3x}{x^2 - 25}\).`, r`a) \(2x + 6 \ne 0 \iff x \ne -3\).
b) \(x^2 - 25 = (x - 5)(x + 5) \ne 0 \iff x \ne 5\) và \(x \ne -5\).`, r`0,5 điểm: câu a.
0,5 điểm: câu b, đủ hai điều kiện.`),
    es(2, HB, r`Chứng tỏ các cặp phân thức sau bằng nhau:
a) \(\dfrac{x^2 - 2x}{x^2 - 4}\) và \(\dfrac{x}{x + 2}\); b) \(\dfrac{3 - x}{x^2 - 9}\) và \(\dfrac{-1}{x + 3}\).`, r`a) \((x^2 - 2x)(x + 2) = x(x - 2)(x + 2) = x(x^2 - 4)\). Tích chéo bằng nhau.
b) \((3 - x)(x + 3) = -(x - 3)(x + 3) = -(x^2 - 9) = (x^2 - 9)\cdot(-1)\). Tích chéo bằng nhau.`, r`0,5 điểm: câu a, tính đúng hai tích chéo.
0,5 điểm: câu b, đổi dấu đúng và kết luận.`),
    es(3, GT, r`Cho phân thức \(P = \dfrac{x^2 - 1}{x^2 + x}\).
a) Tìm điều kiện xác định. b) Tính \(P\) tại \(x = 2\). c) Tìm \(x\) để \(P = 0\).`, r`a) \(x(x + 1) \ne 0 \iff x \ne 0\) và \(x \ne -1\).
b) \(P(2) = \dfrac{3}{6} = \dfrac12\).
c) Tử bằng 0: \(x = 1\) hoặc \(x = -1\); đối chiếu điều kiện, loại \(x = -1\). Vậy \(x = 1\).`, r`0,25 điểm: câu a.
0,25 điểm: câu b.
0,5 điểm: câu c, có đối chiếu điều kiện xác định.`),
    es(3, TT, r`Một đội công nhân dự định làm 600 sản phẩm trong \(x\) ngày (\(x > 2\)). Thực tế đội hoàn thành sớm hơn dự định 2 ngày.
a) Viết phân thức biểu thị số sản phẩm mỗi ngày theo dự định và theo thực tế.
b) Tính hai giá trị đó khi \(x = 12\).`, r`a) Dự định: \(\dfrac{600}{x}\) sản phẩm/ngày; thực tế: \(\dfrac{600}{x - 2}\) sản phẩm/ngày.
b) Khi \(x = 12\): dự định 50 sản phẩm/ngày; thực tế 60 sản phẩm/ngày.`, r`0,5 điểm: câu a, hai phân thức đúng.
0,5 điểm: câu b, tính đúng hai giá trị.`),
  ],
};

const VD = 'van-dung-tinh-chat-co-ban';
const RG = 'rut-gon-phan-thuc';
const QD = 'quy-dong-mau-thuc';
const TH = 'rut-gon-tinh-gia-tri-phan-thuc-tong-hop';

const B22: BankLesson = {
  slug: 'bai-22-tinh-chat-co-ban-cua-phan-thuc-dai-so',
  questions: [
    mc(1, VD, r`Đẳng thức \(\dfrac{A}{B} = \dfrac{A\cdot M}{B\cdot M}\) đúng khi`, [r`\(M\) khác đa thức 0`, r`\(M\) là đa thức bất kì`, r`\(M = 0\)`, r`\(M\) là số dương`], 'Nhân cả tử và mẫu với cùng một đa thức khác đa thức 0.', [
      undefined,
      'Không được nhân với đa thức 0.',
      'Khi đó mẫu bằng 0.',
      'Đa thức khác 0 bất kì đều được, không chỉ số dương.',
    ]),
    mc(1, VD, r`Theo quy tắc đổi dấu, \(\dfrac{-x}{2 - x}\) bằng`, [r`\(\dfrac{x}{x - 2}\)`, r`\(\dfrac{x}{2 - x}\)`, r`\(\dfrac{x}{x + 2}\)`, r`\(\dfrac{-x}{x + 2}\)`], 'Đổi dấu cả tử và mẫu: \\(\\dfrac{-x}{2 - x} = \\dfrac{x}{x - 2}\\).', [
      undefined,
      'Chỉ đổi dấu tử, chưa đổi dấu mẫu.',
      'Đổi dấu mẫu sai: \\(-(2 - x) = x - 2\\).',
      'Đổi dấu mẫu sai.',
    ]),
    mc(2, VD, r`Điền vào chỗ trống: \(\dfrac{x + 1}{x - 1} = \dfrac{\ldots}{x^2 - 1}\).`, [r`\((x + 1)^2\)`, r`\(x + 1\)`, r`\(x^2 + 1\)`, r`\(x^2 - 1\)`], r`Mẫu được nhân với \(x + 1\) nên tử cũng nhân với \(x + 1\): \((x + 1)^2\).`, [
      undefined,
      'Chưa nhân tử với \\(x + 1\\).',
      r`\((x + 1)^2 \ne x^2 + 1\).`,
      'Nhân sai.',
    ]),
    mc(2, RG, r`Rút gọn phân thức \(\dfrac{12x^3y}{18xy^2}\) được`, [r`\(\dfrac{2x^2}{3y}\)`, r`\(\dfrac{2x^3}{3y^2}\)`, r`\(\dfrac{2x}{3y}\)`, r`\(\dfrac{6x^2}{y}\)`], r`Chia tử và mẫu cho \(6xy\): \(\dfrac{2x^2}{3y}\).`, [
      undefined,
      'Chưa chia phần biến.',
      'Chia sai số mũ của \\(x\\).',
      'Chia sai hệ số.',
    ]),
    mc(2, RG, r`Rút gọn phân thức \(\dfrac{x^2 - 9}{x + 3}\) được`, [r`\(x - 3\)`, r`\(x + 3\)`, r`\(x^2 - 3\)`, r`\(-3\)`], r`\(\dfrac{(x - 3)(x + 3)}{x + 3} = x - 3\).`, [
      undefined,
      'Sai dấu.',
      'Gạch hạng tử sai.',
      'Gạch hạng tử sai.',
    ]),
    mc(3, RG, r`Rút gọn phân thức \(\dfrac{x^2 - 6x + 9}{x^2 - 9}\) được`, [r`\(\dfrac{x - 3}{x + 3}\)`, r`\(\dfrac{x + 3}{x - 3}\)`, r`\(\dfrac{6x}{9}\)`, r`\(1\)`], r`\(\dfrac{(x - 3)^2}{(x - 3)(x + 3)} = \dfrac{x - 3}{x + 3}\).`, [
      undefined,
      'Đảo ngược kết quả.',
      'Gạch hạng tử sai.',
      'Tử và mẫu không bằng nhau.',
    ]),
    mc(3, RG, r`Rút gọn phân thức \(\dfrac{2x - 2y}{y^2 - x^2}\) được`, [r`\(\dfrac{-2}{x + y}\)`, r`\(\dfrac{2}{x + y}\)`, r`\(\dfrac{2}{x - y}\)`, r`\(\dfrac{-2}{x - y}\)`], r`\(\dfrac{2(x - y)}{-(x - y)(x + y)} = \dfrac{-2}{x + y}\).`, [
      undefined,
      r`Quên dấu trừ khi đổi \(y^2 - x^2 = -(x^2 - y^2)\).`,
      'Rút gọn sai thừa số.',
      'Rút gọn sai thừa số.',
    ]),
    mc(2, QD, r`Mẫu thức chung đơn giản nhất của \(\dfrac{1}{2x}\) và \(\dfrac{5}{3x^2}\) là`, [r`\(6x^2\)`, r`\(6x^3\)`, r`\(5x^2\)`, r`\(3x^2\)`], 'Lấy BCNN của 2 và 3 là 6, lũy thừa cao nhất của \\(x\\) là \\(x^2\\).', [
      undefined,
      'Là mẫu chung nhưng chưa đơn giản nhất.',
      'Không chia hết cho \\(2x\\).',
      'Không chia hết cho \\(2x\\).',
    ]),
    mc(2, QD, r`Mẫu thức chung của \(\dfrac{1}{x - 1}\) và \(\dfrac{1}{x + 1}\) là`, [r`\((x - 1)(x + 1)\)`, r`\(x - 1\)`, r`\(x + 1\)`, r`\(2x\)`], 'Hai mẫu không có nhân tử chung nên mẫu chung là tích của chúng.', [
      undefined,
      r`Không chia hết cho \(x + 1\).`,
      r`Không chia hết cho \(x - 1\).`,
      'Cộng hai mẫu không được mẫu chung.',
    ]),
    mc(3, QD, r`Mẫu thức chung đơn giản nhất của \(\dfrac{5}{x^2 - 9}\) và \(\dfrac{x}{3x + 9}\) là`, [r`\(3(x - 3)(x + 3)\)`, r`\((x^2 - 9)(3x + 9)\)`, r`\(x^2 - 9\)`, r`\(3(x + 3)^2\)`], r`\(x^2 - 9 = (x - 3)(x + 3)\); \(3x + 9 = 3(x + 3)\). Mẫu chung: \(3(x - 3)(x + 3)\).`, [
      undefined,
      'Là mẫu chung nhưng chưa đơn giản nhất.',
      'Không chia hết cho 3.',
      r`Không chia hết cho \(x - 3\).`,
    ]),
    mc(3, TH, r`Rút gọn \(P = \dfrac{x^2 - 4}{x^2 + 2x}\) rồi tính giá trị tại \(x = -1\) được`, [r`\(3\)`, r`\(-3\)`, r`\(1\)`, 'không xác định'], r`\(P = \dfrac{(x - 2)(x + 2)}{x(x + 2)} = \dfrac{x - 2}{x}\) (với \(x \ne 0\), \(x \ne -2\)). Tại \(x = -1\): \(\dfrac{-3}{-1} = 3\).`, [
      undefined,
      'Sai dấu khi chia hai số âm.',
      'Rút gọn sai.',
      r`\(x = -1\) thỏa mãn điều kiện xác định.`,
    ]),
    mc(4, TH, r`Cho \(Q = \dfrac{3x + 3}{x^2 - 1}\). Có bao nhiêu số nguyên \(x\) để \(Q\) nhận giá trị nguyên?`, [r`\(4\)`, r`\(2\)`, r`\(3\)`, r`\(6\)`], r`\(Q = \dfrac{3}{x - 1}\) với \(x \ne \pm1\). \(Q\) nguyên khi \(x - 1 \in \{-3; -1; 1; 3\}\), tức \(x \in \{-2; 0; 2; 4\}\); cả bốn giá trị thỏa điều kiện.`, [
      undefined,
      'Bỏ sót các ước âm.',
      'Loại nhầm một giá trị.',
      'Đếm thừa.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, VD, 'Xét tính đúng sai về tính chất cơ bản của phân thức:', [
      [r`\(\dfrac{A}{B} = \dfrac{-A}{-B}\).`, true, 'Quy tắc đổi dấu.'],
      [r`\(\dfrac{A}{B} = \dfrac{A + M}{B + M}\).`, false, 'Cộng cùng một đa thức không giữ nguyên phân thức.'],
      ['Chia cả tử và mẫu cho một nhân tử chung được phân thức bằng phân thức đã cho.', true, 'Tính chất cơ bản.'],
      [r`\(\dfrac{x - y}{y - x} = -1\) (với \(x \ne y\)).`, true, 'Tử và mẫu đối nhau.'],
    ]),
    tf(2, VD, 'Xét tính đúng sai:', [
      [r`\(\dfrac{x}{x - 2} = \dfrac{x(x + 2)}{x^2 - 4}\).`, true, r`Nhân tử và mẫu với \(x + 2\).`],
      [r`\(\dfrac{3}{x + 1} = \dfrac{3x}{x^2 + x}\).`, true, r`Nhân tử và mẫu với \(x\).`],
      [r`\(\dfrac{2 - x}{3 - x} = \dfrac{x - 2}{x - 3}\).`, true, 'Đổi dấu cả tử và mẫu.'],
      [r`\(\dfrac{x + 1}{x + 2} = \dfrac12\).`, false, 'Không được gạch hạng tử \\(x\\).'],
    ]),
    tf(2, RG, 'Xét tính đúng sai của các phép rút gọn:', [
      [r`\(\dfrac{6x^2y}{9xy^2} = \dfrac{2x}{3y}\).`, true, r`Chia cho \(3xy\).`],
      [r`\(\dfrac{3x + 6}{x + 2} = 3\).`, true, r`\(\dfrac{3(x + 2)}{x + 2}\).`],
      [r`\(\dfrac{x + 2}{x + 4} = \dfrac12\).`, false, 'Không được gạch hạng tử.'],
      [r`\(\dfrac{x^2 - 1}{x - 1} = x + 1\).`, true, 'Hiệu hai bình phương.'],
    ]),
    tf(2, RG, 'Xét tính đúng sai của các phép rút gọn:', [
      [r`\(\dfrac{(x - y)^2}{y - x} = y - x\).`, true, r`\((x - y)^2 = (y - x)^2\).`],
      [r`\(\dfrac{5x - 10}{x - 2} = 5\).`, true, r`\(\dfrac{5(x - 2)}{x - 2}\).`],
      [r`\(\dfrac{x^2 + x}{x} = x + 1\).`, true, r`Chia cho \(x\).`],
      [r`\(\dfrac{x^2 + 4}{x + 2} = x + 2\).`, false, r`\(x^2 + 4 \ne (x + 2)^2\).`],
    ]),
    tf(3, RG, r`Cho \(A = \dfrac{x^3 - 1}{x^2 - 1}\).`, [
      [r`\(x^3 - 1 = (x - 1)(x^2 + x + 1)\).`, true, 'Hiệu hai lập phương.'],
      [r`\(A = \dfrac{x^2 + x + 1}{x + 1}\) với \(x \ne \pm1\).`, true, r`Chia tử và mẫu cho \(x - 1\).`],
      [r`\(A\) xác định tại \(x = 1\).`, false, 'Mẫu bằng 0.'],
      [r`Tại \(x = 0\) thì \(A = 1\).`, true, r`\(\dfrac{-1}{-1}\).`],
    ]),
    tf(2, QD, r`Quy đồng mẫu thức hai phân thức \(\dfrac{1}{x^2 - x}\) và \(\dfrac{2}{x^2 - 1}\).`, [
      [r`\(x^2 - x = x(x - 1)\).`, true, 'Đặt nhân tử chung.'],
      [r`Mẫu thức chung là \(x(x - 1)(x + 1)\).`, true, 'Lấy các nhân tử với số mũ lớn nhất.'],
      [r`Nhân tử phụ của phân thức thứ nhất là \(x + 1\).`, true, 'Mẫu chung chia cho \\(x(x - 1)\\).'],
      [r`\((x^2 - x)(x^2 - 1)\) là mẫu thức chung đơn giản nhất.`, false, 'Có nhân tử chung \\(x - 1\\) bị lặp.'],
    ]),
    tf(3, QD, r`Quy đồng mẫu thức hai phân thức \(\dfrac{3}{x - 2}\) và \(\dfrac{5}{2 - x}\).`, [
      [r`\(\dfrac{5}{2 - x} = \dfrac{-5}{x - 2}\).`, true, 'Đổi dấu tử và mẫu.'],
      [r`Có thể chọn mẫu thức chung là \(x - 2\).`, true, 'Sau khi đổi dấu, hai mẫu như nhau.'],
      [r`Mẫu thức chung phải là \((x - 2)(2 - x)\).`, false, 'Không cần, vì hai mẫu đối nhau.'],
      [r`Sau khi quy đồng, tử của phân thức thứ hai là \(-5\).`, true, r`\(\dfrac{-5}{x - 2}\).`],
    ]),
    tf(3, TH, r`Cho \(P = \dfrac{x^2 - 2x}{x^2 - 4}\).`, [
      [r`Điều kiện xác định: \(x \ne 2\) và \(x \ne -2\).`, true, r`\(x^2 - 4 \ne 0\).`],
      [r`\(P = \dfrac{x}{x + 2}\).`, true, r`Chia tử và mẫu cho \(x - 2\).`],
      [r`Tại \(x = 2\) thì \(P = \dfrac12\).`, false, r`\(x = 2\) không thỏa điều kiện xác định.`],
      [r`\(P = 0\) khi \(x = 0\).`, true, 'Tử bằng 0, mẫu khác 0.'],
    ]),
    tf(4, TH, r`Cho \(Q = \dfrac{2x + 4}{x^2 + 2x}\).`, [
      [r`\(Q = \dfrac2x\) với \(x \ne 0\), \(x \ne -2\).`, true, r`\(\dfrac{2(x + 2)}{x(x + 2)}\).`],
      [r`\(x = -2\) làm \(Q\) nhận giá trị nguyên.`, false, r`\(x = -2\) không thỏa điều kiện xác định.`],
      [r`Có đúng 3 số nguyên \(x\) để \(Q\) nguyên.`, true, r`\(x \in \{-1; 1; 2\}\).`],
      [r`\(Q(1) = 2\).`, true, r`\(\dfrac21\).`],
    ]),
    tf(3, TH, r`Cho \(R = \dfrac{x^2 - 1}{x^2 + 2x + 1}\).`, [
      [r`\(R = \dfrac{x - 1}{x + 1}\) với \(x \ne -1\).`, true, r`\(\dfrac{(x - 1)(x + 1)}{(x + 1)^2}\).`],
      [r`\(R(0) = -1\).`, true, r`\(\dfrac{-1}{1}\).`],
      [r`\(R = 1\) khi \(x = 0\).`, false, r`\(R(0) = -1\).`],
      [r`Điều kiện xác định là \(x \ne -1\).`, true, r`\((x + 1)^2 \ne 0\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, RG, r`Rút gọn phân thức \(\dfrac{x^2 + 5x}{x^2 - 25}\).`, 'x/(x - 5)', r`\(\dfrac{x(x + 5)}{(x - 5)(x + 5)} = \dfrac{x}{x - 5}\).`),
    sa(2, RG, r`Rút gọn phân thức \(\dfrac{4x - 8}{x^2 - 4x + 4}\).`, '4/(x - 2)', r`\(\dfrac{4(x - 2)}{(x - 2)^2} = \dfrac{4}{x - 2}\).`),
    sa(3, RG, r`Rút gọn phân thức \(\dfrac{x^3 + 8}{x^2 - 2x + 4}\).`, 'x + 2', r`\(x^3 + 8 = (x + 2)(x^2 - 2x + 4)\) nên phân thức bằng \(x + 2\).`),
    sa(2, VD, r`Tìm đa thức \(A\) thỏa mãn \(\dfrac{x}{x + 3} = \dfrac{A}{x^2 - 9}\).`, 'x^2 - 3x', r`Mẫu được nhân với \(x - 3\) nên \(A = x(x - 3) = x^2 - 3x\).`),
    sa(3, TH, r`Rút gọn \(P = \dfrac{x^2 - 1}{x^2 - x}\) rồi tính giá trị của \(P\) tại \(x = 3\).`, '4/3', r`\(P = \dfrac{(x - 1)(x + 1)}{x(x - 1)} = \dfrac{x + 1}{x}\). Tại \(x = 3\): \(\dfrac43\).`),
    sa(4, TH, r`Có bao nhiêu số nguyên \(x\) để phân thức \(\dfrac{x^2 + 2x - 3}{x^2 - 2x + 1}\) nhận giá trị nguyên?`, '6', r`Phân thức bằng \(\dfrac{(x + 3)(x - 1)}{(x - 1)^2} = \dfrac{x + 3}{x - 1} = 1 + \dfrac{4}{x - 1}\) (\(x \ne 1\)). \(x - 1 \in \{\pm1; \pm2; \pm4\}\) cho \(x \in \{-3; -1; 0; 2; 3; 5\}\): 6 giá trị.`),
    // ---- Tự luận ----
    es(2, VD, r`Dùng tính chất cơ bản của phân thức, điền đa thức thích hợp vào chỗ trống:
a) \(\dfrac{3}{x - 2} = \dfrac{\ldots}{x^2 - 4}\); b) \(\dfrac{x^2 + 2x}{x^2 - 4} = \dfrac{x}{\ldots}\).`, r`a) Mẫu nhân với \(x + 2\) nên tử là \(3(x + 2) = 3x + 6\).
b) Tử chia cho \(x + 2\) nên mẫu là \((x^2 - 4) : (x + 2) = x - 2\).`, r`0,5 điểm: câu a.
0,5 điểm: câu b.`),
    es(3, RG, r`Rút gọn các phân thức: a) \(\dfrac{x^2 - xy}{y^2 - x^2}\); b) \(\dfrac{x^3 - 27}{x^2 + 3x + 9}\).`, r`a) \(\dfrac{x(x - y)}{-(x - y)(x + y)} = \dfrac{-x}{x + y}\).
b) \(\dfrac{(x - 3)(x^2 + 3x + 9)}{x^2 + 3x + 9} = x - 3\).`, r`0,5 điểm: câu a, phân tích và đổi dấu đúng.
0,5 điểm: câu b, dùng đúng hằng đẳng thức.`),
    es(3, QD, r`Quy đồng mẫu thức hai phân thức \(\dfrac{1}{x^2 + 3x}\) và \(\dfrac{2}{x^2 - 9}\).`, r`\(x^2 + 3x = x(x + 3)\); \(x^2 - 9 = (x - 3)(x + 3)\). Mẫu chung: \(x(x - 3)(x + 3)\).
\(\dfrac{1}{x^2 + 3x} = \dfrac{x - 3}{x(x - 3)(x + 3)}\); \(\dfrac{2}{x^2 - 9} = \dfrac{2x}{x(x - 3)(x + 3)}\).`, r`0,5 điểm: phân tích mẫu và tìm đúng mẫu chung.
0,5 điểm: tìm đúng nhân tử phụ và viết hai phân thức mới.`),
    es(4, TH, r`Cho \(A = \dfrac{x^2 - 4x + 4}{x^2 - 4}\).
a) Tìm điều kiện xác định và rút gọn \(A\). b) Tính \(A\) tại \(x = 4\). c) Tìm các số nguyên \(x\) để \(A\) nhận giá trị nguyên.`, r`a) \(x \ne \pm2\); \(A = \dfrac{(x - 2)^2}{(x - 2)(x + 2)} = \dfrac{x - 2}{x + 2}\).
b) \(A(4) = \dfrac26 = \dfrac13\).
c) \(A = 1 - \dfrac{4}{x + 2}\). \(x + 2 \in \{\pm1; \pm2; \pm4\}\) cho \(x \in \{-6; -4; -3; -1; 0; 2\}\); loại \(x = 2\). Vậy \(x \in \{-6; -4; -3; -1; 0\}\).`, r`0,25 điểm: câu a.
0,25 điểm: câu b.
0,5 điểm: câu c, tìm đủ và loại giá trị không thỏa điều kiện.`),
  ],
};

const CH = 'cong-hai-phan-thuc';
const TR = 'tru-hai-phan-thuc';
const CN = 'cong-tru-nhieu-phan-thuc';
const TE = 'thuc-te-cong-tru-phan-thuc';

const B23: BankLesson = {
  slug: 'bai-23-phep-cong-va-phep-tru-phan-thuc-dai-so',
  questions: [
    mc(1, CH, r`Kết quả của phép cộng \(\dfrac{x}{x + 1} + \dfrac{1}{x + 1}\) là`, [r`\(1\)`, r`\(\dfrac{x + 1}{2x + 2}\)`, r`\(\dfrac{x}{x + 1}\)`, r`\(2\)`], r`\(\dfrac{x + 1}{x + 1} = 1\) (với \(x \ne -1\)).`, [
      undefined,
      'Không cộng các mẫu.',
      'Quên cộng tử thứ hai.',
      'Tính sai.',
    ]),
    mc(1, CH, r`Kết quả của phép cộng \(\dfrac{2x}{x - 3} + \dfrac{5}{x - 3}\) là`, [r`\(\dfrac{2x + 5}{x - 3}\)`, r`\(\dfrac{2x + 5}{2x - 6}\)`, r`\(\dfrac{7x}{x - 3}\)`, r`\(\dfrac{2x + 5}{(x - 3)^2}\)`], 'Cùng mẫu: cộng tử, giữ nguyên mẫu.', [
      undefined,
      'Không cộng các mẫu.',
      r`\(2x + 5 \ne 7x\).`,
      'Không nhân các mẫu.',
    ]),
    mc(2, CH, r`Kết quả của phép cộng \(\dfrac1x + \dfrac{1}{x + 1}\) là`, [r`\(\dfrac{2x + 1}{x(x + 1)}\)`, r`\(\dfrac{2}{2x + 1}\)`, r`\(\dfrac{2}{x(x + 1)}\)`, r`\(\dfrac{1}{x}\)`], r`\(\dfrac{x + 1 + x}{x(x + 1)} = \dfrac{2x + 1}{x(x + 1)}\).`, [
      undefined,
      'Cộng tử với tử, mẫu với mẫu là sai.',
      'Quên nhân tử với nhân tử phụ.',
      'Tính sai.',
    ]),
    mc(2, CH, r`Kết quả của phép cộng \(\dfrac{2}{x - 1} + \dfrac{3}{1 - x}\) là`, [r`\(\dfrac{-1}{x - 1}\)`, r`\(\dfrac{5}{x - 1}\)`, r`\(\dfrac{1}{x - 1}\)`, r`\(\dfrac{5}{2x - 2}\)`], r`\(\dfrac{3}{1 - x} = \dfrac{-3}{x - 1}\); tổng \(\dfrac{2 - 3}{x - 1} = \dfrac{-1}{x - 1}\).`, [
      undefined,
      'Chưa đổi dấu phân thức thứ hai.',
      'Sai dấu.',
      'Cộng các mẫu là sai.',
    ]),
    mc(1, TR, r`Kết quả của phép trừ \(\dfrac{5x}{x + 2} - \dfrac{3x}{x + 2}\) là`, [r`\(\dfrac{2x}{x + 2}\)`, r`\(2x\)`, r`\(\dfrac{8x}{x + 2}\)`, r`\(\dfrac{x}{x + 2}\)`], 'Cùng mẫu: trừ tử, giữ nguyên mẫu.', [
      undefined,
      'Mất mẫu.',
      'Cộng thay vì trừ.',
      'Tính sai.',
    ]),
    mc(2, TR, r`Phân thức đối của \(\dfrac{x - 1}{x + 2}\) là`, [r`\(\dfrac{1 - x}{x + 2}\)`, r`\(\dfrac{x + 2}{x - 1}\)`, r`\(\dfrac{x + 1}{x - 2}\)`, r`\(\dfrac{x - 1}{x - 2}\)`], r`Phân thức đối có tử đổi dấu: \(\dfrac{-(x - 1)}{x + 2} = \dfrac{1 - x}{x + 2}\).`, [
      undefined,
      'Đó là phân thức nghịch đảo.',
      'Đổi dấu sai.',
      'Đổi dấu sai.',
    ]),
    mc(2, TR, r`Kết quả của phép trừ \(\dfrac{1}{x - 2} - \dfrac{1}{x + 2}\) là`, [r`\(\dfrac{4}{x^2 - 4}\)`, r`\(0\)`, r`\(\dfrac{2x}{x^2 - 4}\)`, r`\(\dfrac{-4}{x^2 - 4}\)`], r`\(\dfrac{(x + 2) - (x - 2)}{x^2 - 4} = \dfrac{4}{x^2 - 4}\).`, [
      undefined,
      'Hai phân thức khác nhau.',
      'Cộng thay vì trừ.',
      'Sai dấu khi bỏ ngoặc.',
    ]),
    mc(2, TR, r`Kết quả của phép trừ \(\dfrac{x}{x - y} - \dfrac{y}{x - y}\) là`, [r`\(1\)`, r`\(0\)`, r`\(\dfrac{1}{x - y}\)`, r`\(\dfrac{x + y}{x - y}\)`], r`\(\dfrac{x - y}{x - y} = 1\) (với \(x \ne y\)).`, [
      undefined,
      'Tử bằng \\(x - y\\), không bằng 0.',
      'Rút gọn sai.',
      'Cộng thay vì trừ.',
    ]),
    mc(3, CN, r`Kết quả của \(\dfrac{1}{x - 1} + \dfrac{1}{x + 1} - \dfrac{2}{x^2 - 1}\) là`, [r`\(\dfrac{2}{x + 1}\)`, r`\(0\)`, r`\(\dfrac{2x}{x^2 - 1}\)`, r`\(\dfrac{2}{x - 1}\)`], r`\(\dfrac{x + 1 + x - 1 - 2}{x^2 - 1} = \dfrac{2(x - 1)}{(x - 1)(x + 1)} = \dfrac{2}{x + 1}\).`, [
      undefined,
      'Tính sai tử.',
      'Quên trừ phân thức thứ ba.',
      'Rút gọn sai thừa số.',
    ]),
    mc(3, CN, r`Kết quả của \(\dfrac{x}{x - 3} - \dfrac{3}{x + 3} - \dfrac{18}{x^2 - 9}\) là`, [r`\(1\)`, r`\(0\)`, r`\(\dfrac{x + 3}{x - 3}\)`, r`\(\dfrac{x^2 + 9}{x^2 - 9}\)`], r`Tử sau khi quy đồng: \(x(x + 3) - 3(x - 3) - 18 = x^2 - 9\). Kết quả \(\dfrac{x^2 - 9}{x^2 - 9} = 1\).`, [
      undefined,
      'Tính sai tử.',
      'Rút gọn sai.',
      r`Sai dấu ở \(-3(x - 3)\).`,
    ]),
    mc(4, CN, r`Kết quả của \(\dfrac{1}{x(x + 1)} + \dfrac{1}{(x + 1)(x + 2)}\) là`, [r`\(\dfrac{2}{x(x + 2)}\)`, r`\(\dfrac{1}{x(x + 2)}\)`, r`\(\dfrac{2}{x(x + 1)(x + 2)}\)`, r`\(\dfrac{1}{x + 2}\)`], r`Tách: \(\dfrac1x - \dfrac{1}{x + 1} + \dfrac{1}{x + 1} - \dfrac{1}{x + 2} = \dfrac{2}{x(x + 2)}\).`, [
      undefined,
      'Tính sai tử.',
      'Quy đồng với mẫu \\(x(x + 1)(x + 2)\\) nhưng tính sai tử.',
      'Thiếu số hạng.',
    ]),
    mc(3, TE, r`Vòi thứ nhất chảy đầy bể trong \(x\) giờ, vòi thứ hai chảy đầy bể trong \(2x\) giờ. Trong 1 giờ cả hai vòi chảy được`, [r`\(\dfrac{3}{2x}\) bể`, r`\(\dfrac{1}{3x}\) bể`, r`\(\dfrac{2}{3x}\) bể`, r`\(\dfrac{3x}{2}\) bể`], r`\(\dfrac1x + \dfrac{1}{2x} = \dfrac{3}{2x}\) (bể).`, [
      undefined,
      'Cộng thời gian rồi nghịch đảo là sai.',
      'Nghịch đảo kết quả đúng.',
      'Đó là nghịch đảo.',
    ]),
    mc(3, TE, r`Một người đi quãng đường 60 km với vận tốc \(x\) (km/h) và về với vận tốc \(x + 5\) (km/h). Thời gian về ít hơn thời gian đi là`, [r`\(\dfrac{300}{x(x + 5)}\) giờ`, r`\(12\) giờ`, r`\(\dfrac{5}{x(x + 5)}\) giờ`, r`\(\dfrac{300}{x + 5}\) giờ`], r`\(\dfrac{60}{x} - \dfrac{60}{x + 5} = \dfrac{60(x + 5) - 60x}{x(x + 5)} = \dfrac{300}{x(x + 5)}\).`, [
      undefined,
      'Không có cơ sở.',
      'Quên nhân 60.',
      'Quy đồng sai.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, CH, 'Xét tính đúng sai:', [
      [r`\(\dfrac{A}{M} + \dfrac{B}{M} = \dfrac{A + B}{M}\).`, true, 'Cộng hai phân thức cùng mẫu.'],
      [r`\(\dfrac{A}{B} + \dfrac{C}{D} = \dfrac{A + C}{B + D}\).`, false, 'Phải quy đồng mẫu.'],
      ['Phép cộng phân thức có tính chất giao hoán.', true, 'Như phép cộng phân số.'],
      [r`\(\dfrac1x + \dfrac1x = \dfrac2x\).`, true, 'Cùng mẫu.'],
    ]),
    tf(2, CH, r`Cho \(S = \dfrac{3}{x + 2} + \dfrac{x}{x + 2}\).`, [
      [r`\(S = \dfrac{x + 3}{x + 2}\).`, true, 'Cộng tử.'],
      [r`\(S(0) = \dfrac32\).`, true, 'Thay số.'],
      [r`\(S(-3) = 0\).`, true, 'Tử bằng 0, mẫu khác 0.'],
      [r`\(S = \dfrac{3x}{x + 2}\).`, false, 'Cộng tử chứ không nhân.'],
    ]),
    tf(2, CH, r`Thực hiện phép cộng \(\dfrac{1}{2x} + \dfrac{1}{3x}\).`, [
      [r`Mẫu thức chung là \(6x\).`, true, 'BCNN của 2 và 3 là 6.'],
      [r`Tổng bằng \(\dfrac{5}{6x}\).`, true, r`\(\dfrac{3 + 2}{6x}\).`],
      [r`Tổng bằng \(\dfrac{2}{5x}\).`, false, 'Cộng tử với tử, mẫu với mẫu là sai.'],
      [r`Tại \(x = 1\) tổng bằng \(\dfrac56\).`, true, 'Thay số.'],
    ]),
    tf(1, TR, 'Xét tính đúng sai:', [
      [r`Phân thức đối của \(\dfrac2x\) là \(\dfrac{-2}{x}\).`, true, 'Tổng bằng 0.'],
      [r`\(-\dfrac{A}{B} = \dfrac{A}{-B}\).`, true, 'Quy tắc đổi dấu.'],
      [r`\(\dfrac{A}{B} - \dfrac{C}{D} = \dfrac{A}{B} + \left(-\dfrac{C}{D}\right)\).`, true, 'Quy tắc trừ.'],
      [r`Phân thức đối của \(\dfrac{x - 1}{x}\) là \(\dfrac{x + 1}{x}\).`, false, r`Phân thức đối là \(\dfrac{1 - x}{x}\).`],
    ]),
    tf(2, TR, r`Cho \(T = \dfrac{x + 1}{x - 1} - \dfrac{2}{x - 1}\).`, [
      [r`\(T = \dfrac{x - 1}{x - 1}\).`, true, 'Trừ tử.'],
      [r`\(T = 1\) với \(x \ne 1\).`, true, 'Rút gọn.'],
      [r`\(T(1) = 1\).`, false, r`\(T\) không xác định tại \(x = 1\).`],
      [r`Giá trị của \(T\) không phụ thuộc vào \(x\) (với \(x \ne 1\)).`, true, r`\(T = 1\).`],
    ]),
    tf(2, TR, 'Xét tính đúng sai của các phép trừ:', [
      [r`\(\dfrac{x}{x - 2} - \dfrac{2}{x - 2} = 1\).`, true, r`\(\dfrac{x - 2}{x - 2}\).`],
      [r`\(\dfrac3x - \dfrac1x = \dfrac2x\).`, true, 'Cùng mẫu.'],
      [r`\(\dfrac{x + 3}{x} - \dfrac3x = 1\).`, true, r`\(\dfrac{x}{x}\).`],
      [r`\(\dfrac{2x}{x + 1} - \dfrac{2}{x + 1} = 2\).`, false, r`Kết quả là \(\dfrac{2(x - 1)}{x + 1}\).`],
    ]),
    tf(3, CN, r`Cho \(M = \dfrac{1}{x - 1} - \dfrac{1}{x + 1}\).`, [
      [r`Mẫu thức chung là \(x^2 - 1\).`, true, r`\((x - 1)(x + 1)\).`],
      [r`\(M = \dfrac{2}{x^2 - 1}\).`, true, r`\(\dfrac{x + 1 - x + 1}{x^2 - 1}\).`],
      [r`\(M = 0\).`, false, 'Hai phân thức khác nhau.'],
      [r`\(M(2) = \dfrac23\).`, true, r`\(\dfrac{2}{3}\).`],
    ]),
    tf(4, CN, 'Xét tính đúng sai (với điều kiện các phân thức xác định):', [
      [r`\(\dfrac{1}{x(x + 1)} = \dfrac1x - \dfrac{1}{x + 1}\).`, true, 'Quy đồng vế phải.'],
      [r`\(\dfrac{1}{x(x + 2)} = \dfrac1x - \dfrac{1}{x + 2}\).`, false, r`Vế phải bằng \(\dfrac{2}{x(x + 2)}\).`],
      [r`\(\dfrac{2}{x(x + 2)} = \dfrac1x - \dfrac{1}{x + 2}\).`, true, 'Quy đồng vế phải.'],
      [r`\(\dfrac{1}{x(x + 1)} + \dfrac{1}{(x + 1)(x + 2)} = \dfrac{2}{x(x + 2)}\).`, true, 'Tách rồi triệt tiêu.'],
    ]),
    tf(3, CN, r`Cho \(N = \dfrac{2x}{x^2 - 1} - \dfrac{1}{x - 1}\).`, [
      [r`\(N = \dfrac{1}{x + 1}\).`, true, r`\(\dfrac{2x - (x + 1)}{x^2 - 1} = \dfrac{x - 1}{x^2 - 1}\).`],
      [r`Mẫu thức chung là \((x - 1)(x + 1)\).`, true, r`\(x^2 - 1 = (x - 1)(x + 1)\).`],
      [r`\(N(0) = 1\).`, true, r`\(\dfrac{1}{1}\).`],
      [r`\(N = \dfrac{1}{x - 1}\).`, false, r`\(N = \dfrac{1}{x + 1}\).`],
    ]),
    tf(3, TE, r`Người thứ nhất làm xong một công việc trong \(x\) giờ, người thứ hai làm xong trong \(x + 3\) giờ.`, [
      [r`Trong 1 giờ người thứ nhất làm được \(\dfrac1x\) công việc.`, true, 'Năng suất.'],
      [r`Trong 1 giờ cả hai làm được \(\dfrac{2x + 3}{x(x + 3)}\) công việc.`, true, r`\(\dfrac1x + \dfrac{1}{x + 3}\).`],
      [r`Khi \(x = 6\), trong 1 giờ cả hai làm được \(\dfrac{5}{18}\) công việc.`, true, r`\(\dfrac{15}{54}\).`],
      [r`Trong 1 giờ cả hai làm được \(\dfrac{2}{2x + 3}\) công việc.`, false, 'Cộng thời gian rồi nghịch đảo là sai.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, CH, r`Thực hiện phép tính \(\dfrac{x}{x - 1} + \dfrac{1}{1 - x}\) (với \(x \ne 1\)).`, '1', r`\(\dfrac{x}{x - 1} - \dfrac{1}{x - 1} = \dfrac{x - 1}{x - 1} = 1\).`),
    sa(2, TR, r`Rút gọn \(\dfrac{x^2}{x - 2} - \dfrac{4}{x - 2}\).`, 'x + 2', r`\(\dfrac{x^2 - 4}{x - 2} = \dfrac{(x - 2)(x + 2)}{x - 2} = x + 2\).`),
    sa(3, CN, r`Rút gọn \(\dfrac{1}{x - 2} + \dfrac{1}{x + 2} - \dfrac{4}{x^2 - 4}\).`, '2/(x + 2)', r`\(\dfrac{x + 2 + x - 2 - 4}{x^2 - 4} = \dfrac{2(x - 2)}{(x - 2)(x + 2)} = \dfrac{2}{x + 2}\).`),
    sa(4, CN, r`Tính giá trị của \(\dfrac{1}{x(x + 1)} + \dfrac{1}{(x + 1)(x + 2)} + \dfrac{1}{(x + 2)(x + 3)}\) tại \(x = 1\).`, '3/4', r`Tổng bằng \(\dfrac1x - \dfrac{1}{x + 3} = \dfrac{3}{x(x + 3)}\). Tại \(x = 1\): \(\dfrac34\).`),
    sa(3, TE, 'Vòi thứ nhất chảy đầy bể trong 4 giờ, vòi thứ hai chảy đầy bể trong 6 giờ. Trong 1 giờ cả hai vòi chảy được bao nhiêu phần bể?', '5/12', r`\(\dfrac14 + \dfrac16 = \dfrac{3 + 2}{12} = \dfrac{5}{12}\) (bể).`),
    // ---- Tự luận ----
    es(2, CH, r`Thực hiện phép cộng: a) \(\dfrac{3}{2x} + \dfrac{5}{4x}\); b) \(\dfrac{x}{x - 2} + \dfrac{2}{2 - x}\).`, r`a) \(\dfrac{6}{4x} + \dfrac{5}{4x} = \dfrac{11}{4x}\).
b) \(\dfrac{x}{x - 2} - \dfrac{2}{x - 2} = \dfrac{x - 2}{x - 2} = 1\) (với \(x \ne 2\)).`, r`0,5 điểm: câu a, quy đồng đúng.
0,5 điểm: câu b, đổi dấu và rút gọn đúng.`),
    es(2, TR, r`Thực hiện phép trừ: a) \(\dfrac{x + 4}{x + 2} - \dfrac{2}{x + 2}\); b) \(\dfrac{1}{x - 1} - \dfrac{2}{x^2 - 1}\).`, r`a) \(\dfrac{x + 2}{x + 2} = 1\) (với \(x \ne -2\)).
b) \(\dfrac{x + 1 - 2}{x^2 - 1} = \dfrac{x - 1}{(x - 1)(x + 1)} = \dfrac{1}{x + 1}\).`, r`0,5 điểm: câu a.
0,5 điểm: câu b, quy đồng và rút gọn đúng.`),
    es(3, CN, r`Chứng minh rằng với \(x \ne 3\) và \(x \ne -3\), giá trị của biểu thức \(\dfrac{1}{x - 3} - \dfrac{1}{x + 3} - \dfrac{6}{x^2 - 9}\) luôn bằng 0.`, r`Mẫu chung \(x^2 - 9 = (x - 3)(x + 3)\).
Tử: \((x + 3) - (x - 3) - 6 = 0\).
Vậy biểu thức bằng \(\dfrac{0}{x^2 - 9} = 0\) với mọi \(x \ne \pm3\).`, r`0,5 điểm: quy đồng đúng.
0,5 điểm: tính đúng tử bằng 0 và kết luận.`),
    es(3, TE, r`Đội A làm xong một đoạn đường trong \(x\) ngày, đội B làm xong đoạn đường đó trong \(x + 5\) ngày.
a) Viết phân thức biểu thị phần công việc cả hai đội làm được trong một ngày.
b) Với \(x = 10\), hỏi nếu làm chung thì hai đội làm xong trong bao nhiêu ngày?`, r`a) \(\dfrac1x + \dfrac{1}{x + 5} = \dfrac{2x + 5}{x(x + 5)}\) (công việc).
b) Với \(x = 10\): \(\dfrac{25}{150} = \dfrac16\) công việc mỗi ngày, nên làm chung xong trong 6 ngày.`, r`0,5 điểm: câu a.
0,5 điểm: câu b.`),
  ],
};

const NP = 'nhan-phan-thuc';
const CP = 'chia-phan-thuc';
const TC = 'tim-thanh-phan-chua-biet-phan-thuc';
const TH4 = 'tong-hop-cac-phep-tinh-phan-thuc';
const TT4 = 'thuc-te-nhan-chia-phan-thuc';

const B24: BankLesson = {
  slug: 'bai-24-phep-nhan-va-phep-chia-phan-thuc-dai-so',
  questions: [
    mc(1, NP, r`Quy tắc nhân hai phân thức: \(\dfrac{A}{B}\cdot\dfrac{C}{D} = \ldots\)`, [r`\(\dfrac{AC}{BD}\)`, r`\(\dfrac{A + C}{B + D}\)`, r`\(\dfrac{AD}{BC}\)`, r`\(\dfrac{AC}{B + D}\)`], 'Nhân tử với tử, mẫu với mẫu.', [
      undefined,
      'Không cộng.',
      'Đó là phép chia.',
      'Mẫu phải nhân.',
    ]),
    mc(1, NP, r`Kết quả của phép nhân \(\dfrac{2x}{3}\cdot\dfrac{9}{4x^2}\) là`, [r`\(\dfrac{3}{2x}\)`, r`\(\dfrac{3x}{2}\)`, r`\(\dfrac{2}{3x}\)`, r`\(\dfrac{6}{x}\)`], r`\(\dfrac{18x}{12x^2} = \dfrac{3}{2x}\).`, [
      undefined,
      'Rút gọn sai số mũ.',
      'Đảo ngược kết quả.',
      'Rút gọn sai hệ số.',
    ]),
    mc(2, NP, r`Kết quả của phép nhân \(\dfrac{x^2 - 1}{x + 3}\cdot\dfrac{x + 3}{x - 1}\) là`, [r`\(x + 1\)`, r`\(x - 1\)`, r`\(1\)`, r`\((x + 1)(x + 3)\)`], r`\(\dfrac{(x - 1)(x + 1)(x + 3)}{(x + 3)(x - 1)} = x + 1\).`, [
      undefined,
      'Sai dấu.',
      r`Còn thừa số \(x + 1\).`,
      r`\(x + 3\) đã rút gọn.`,
    ]),
    mc(2, NP, r`Kết quả của phép nhân \(\dfrac{x - 2}{x}\cdot\dfrac{x^2}{x^2 - 4}\) là`, [r`\(\dfrac{x}{x + 2}\)`, r`\(\dfrac{x}{x - 2}\)`, r`\(\dfrac{1}{x + 2}\)`, r`\(\dfrac{x^2}{x + 2}\)`], r`\(\dfrac{(x - 2)x^2}{x(x - 2)(x + 2)} = \dfrac{x}{x + 2}\).`, [
      undefined,
      'Rút gọn sai thừa số.',
      r`Còn thừa số \(x\).`,
      r`Chưa rút gọn \(x\).`,
    ]),
    mc(1, CP, r`Phân thức nghịch đảo của \(\dfrac{x - 1}{x + 2}\) (với \(x \ne 1\), \(x \ne -2\)) là`, [r`\(\dfrac{x + 2}{x - 1}\)`, r`\(\dfrac{1 - x}{x + 2}\)`, r`\(\dfrac{x + 1}{x - 2}\)`, r`\(\dfrac{x + 2}{1 - x}\)`], 'Đổi chỗ tử và mẫu.', [
      undefined,
      'Đó là phân thức đối.',
      'Đổi dấu sai.',
      'Đổi chỗ tử và mẫu nhưng lại đổi dấu mẫu.',
    ]),
    mc(1, CP, r`Quy tắc chia hai phân thức: \(\dfrac{A}{B} : \dfrac{C}{D} = \ldots\) (với \(\dfrac{C}{D} \ne 0\))`, [r`\(\dfrac{AD}{BC}\)`, r`\(\dfrac{AC}{BD}\)`, r`\(\dfrac{A - C}{B - D}\)`, r`\(\dfrac{BC}{AD}\)`], 'Nhân với phân thức nghịch đảo của phân thức chia.', [
      undefined,
      'Đó là phép nhân.',
      'Không trừ.',
      'Đảo ngược kết quả.',
    ]),
    mc(2, CP, r`Kết quả của phép chia \(\dfrac{6x^2}{5y} : \dfrac{3x}{10y^2}\) là`, [r`\(4xy\)`, r`\(2x\)`, r`\(\dfrac{9x^3}{25y^3}\)`, r`\(\dfrac{4x}{y}\)`], r`\(\dfrac{6x^2}{5y}\cdot\dfrac{10y^2}{3x} = \dfrac{60x^2y^2}{15xy} = 4xy\).`, [
      undefined,
      'Rút gọn sai.',
      'Đã nhân thay vì chia.',
      'Rút gọn sai số mũ của \\(y\\).',
    ]),
    mc(2, CP, r`Kết quả của phép chia \(\dfrac{x^2 - 9}{2x} : \dfrac{x + 3}{4x}\) là`, [r`\(2(x - 3)\)`, r`\(\dfrac{x - 3}{2}\)`, r`\(2(x + 3)\)`, r`\(\dfrac{(x + 3)^2}{8x^2}\)`], r`\(\dfrac{(x - 3)(x + 3)}{2x}\cdot\dfrac{4x}{x + 3} = 2(x - 3)\).`, [
      undefined,
      'Rút gọn sai hệ số.',
      'Sai dấu.',
      'Đã nhân thay vì chia.',
    ]),
    mc(2, TC, r`Phân thức \(M\) thỏa mãn \(M\cdot\dfrac{x + 2}{x} = \dfrac{x^2 - 4}{x^2}\) là`, [r`\(\dfrac{x - 2}{x}\)`, r`\(\dfrac{x + 2}{x}\)`, r`\(\dfrac{x}{x - 2}\)`, r`\(\dfrac{x - 2}{x^2}\)`], r`\(M = \dfrac{x^2 - 4}{x^2} : \dfrac{x + 2}{x} = \dfrac{(x - 2)(x + 2)}{x^2}\cdot\dfrac{x}{x + 2} = \dfrac{x - 2}{x}\).`, [
      undefined,
      'Sai dấu.',
      'Đảo ngược kết quả.',
      'Rút gọn sai mẫu.',
    ]),
    mc(3, TC, r`Phân thức \(N\) thỏa mãn \(N : \dfrac{x}{x + 2} = \dfrac{(x + 2)^2}{x^2}\) là`, [r`\(\dfrac{x + 2}{x}\)`, r`\(\dfrac{x}{x + 2}\)`, r`\(\dfrac{(x + 2)^3}{x^3}\)`, r`\(1\)`], r`\(N = \dfrac{(x + 2)^2}{x^2}\cdot\dfrac{x}{x + 2} = \dfrac{x + 2}{x}\).`, [
      undefined,
      'Đảo ngược kết quả.',
      'Đã chia thay vì nhân.',
      'Rút gọn sai.',
    ]),
    mc(3, TH4, r`Kết quả của \(\left(\dfrac{1}{x - 1} + \dfrac{1}{x + 1}\right) : \dfrac{2x}{x^2 - 1}\) là`, [r`\(1\)`, r`\(0\)`, r`\(2x\)`, r`\(\dfrac{4x^2}{(x^2 - 1)^2}\)`], r`Trong ngoặc bằng \(\dfrac{2x}{x^2 - 1}\); chia cho chính nó được 1.`, [
      undefined,
      'Tính sai trong ngoặc.',
      'Rút gọn sai.',
      'Đã nhân thay vì chia.',
    ]),
    mc(4, TH4, r`Kết quả của \(\left(\dfrac{x}{x - 2} - \dfrac{2}{x + 2}\right)\cdot\dfrac{x^2 - 4}{x^2 + 4}\) là`, [r`\(1\)`, r`\(x^2 + 4\)`, r`\(\dfrac{x^2 + 4}{x^2 - 4}\)`, r`\(0\)`], r`Trong ngoặc: \(\dfrac{x(x + 2) - 2(x - 2)}{x^2 - 4} = \dfrac{x^2 + 4}{x^2 - 4}\); nhân với \(\dfrac{x^2 - 4}{x^2 + 4}\) được 1.`, [
      undefined,
      'Rút gọn sai.',
      'Đó mới là kết quả trong ngoặc.',
      'Tính sai tử trong ngoặc.',
    ]),
    mc(3, TT4, r`Một hình chữ nhật có diện tích \(\dfrac{x^2 - 9}{x}\) (m²) và chiều rộng \(\dfrac{x - 3}{2}\) (m). Chiều dài hình chữ nhật là`, [r`\(\dfrac{2(x + 3)}{x}\) m`, r`\(\dfrac{x + 3}{2x}\) m`, r`\(\dfrac{2x}{x + 3}\) m`, r`\(\dfrac{x + 3}{x}\) m`], r`\(\dfrac{x^2 - 9}{x} : \dfrac{x - 3}{2} = \dfrac{(x - 3)(x + 3)}{x}\cdot\dfrac{2}{x - 3} = \dfrac{2(x + 3)}{x}\).`, [
      undefined,
      'Đã nhân thay vì chia.',
      'Đảo ngược kết quả.',
      'Quên nhân 2.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, NP, 'Xét tính đúng sai:', [
      [r`\(\dfrac{A}{B}\cdot\dfrac{C}{D} = \dfrac{AC}{BD}\).`, true, 'Quy tắc nhân.'],
      [r`\(\dfrac{A}{B}\cdot\dfrac{B}{A} = 1\) (với \(A\), \(B\) khác 0).`, true, 'Hai phân thức nghịch đảo.'],
      ['Phép nhân phân thức có tính chất giao hoán.', true, 'Như phép nhân phân số.'],
      [r`\(\dfrac{A}{B}\cdot\dfrac{C}{D} = \dfrac{A + C}{B + D}\).`, false, 'Không cộng.'],
    ]),
    tf(2, NP, r`Cho \(P = \dfrac{3x}{x + 1}\cdot\dfrac{x^2 - 1}{6x^2}\).`, [
      [r`\(P = \dfrac{x - 1}{2x}\).`, true, r`\(\dfrac{3x(x - 1)(x + 1)}{(x + 1)6x^2}\).`],
      [r`\(P(1) = 0\).`, true, 'Tử bằng 0.'],
      [r`\(P\) không xác định tại \(x = -1\).`, true, r`Mẫu \(x + 1 = 0\).`],
      [r`\(P = \dfrac{x + 1}{2x}\).`, false, r`\(P = \dfrac{x - 1}{2x}\).`],
    ]),
    tf(2, NP, 'Xét tính đúng sai (với điều kiện các phân thức xác định):', [
      [r`\(\dfrac{x}{y}\cdot\dfrac{y}{x} = 1\).`, true, 'Nghịch đảo nhau.'],
      [r`\(\dfrac{2x}{3}\cdot\dfrac{3}{2x} = 1\).`, true, 'Nghịch đảo nhau.'],
      [r`\(\dfrac{x^2}{y}\cdot\dfrac{y^2}{x} = xy\).`, true, r`\(\dfrac{x^2y^2}{xy}\).`],
      [r`\(\dfrac{x + 1}{x}\cdot\dfrac{x}{x - 1} = 1\).`, false, r`Kết quả là \(\dfrac{x + 1}{x - 1}\).`],
    ]),
    tf(1, CP, 'Xét tính đúng sai:', [
      [r`Phân thức nghịch đảo của \(\dfrac{x}{3}\) là \(\dfrac3x\) (với \(x \ne 0\)).`, true, 'Đổi chỗ tử và mẫu.'],
      [r`Phân thức nghịch đảo của \(\dfrac{-2}{x}\) là \(\dfrac{-x}{2}\).`, true, 'Tích bằng 1.'],
      [r`\(\dfrac{A}{B} : \dfrac{C}{D} = \dfrac{A}{B}\cdot\dfrac{D}{C}\) (với \(\dfrac{C}{D} \ne 0\)).`, true, 'Quy tắc chia.'],
      ['Phân thức 0 có phân thức nghịch đảo.', false, 'Không có phân thức nào nhân với 0 được 1.'],
    ]),
    tf(2, CP, r`Cho \(Q = \dfrac{x^2 - 4}{x^2} : \dfrac{x - 2}{x}\).`, [
      [r`\(Q = \dfrac{x + 2}{x}\).`, true, r`\(\dfrac{(x - 2)(x + 2)}{x^2}\cdot\dfrac{x}{x - 2}\).`],
      [r`Điều kiện: \(x \ne 0\) và \(x \ne 2\).`, true, 'Mẫu khác 0 và phân thức chia khác 0.'],
      [r`\(Q(1) = 3\).`, true, r`\(\dfrac{3}{1}\).`],
      [r`\(Q(2) = 2\).`, false, r`\(x = 2\) không thỏa điều kiện.`],
    ]),
    tf(2, TC, r`Cho phân thức \(A\) thỏa mãn \(A\cdot\dfrac{x - 1}{x + 2} = \dfrac{x - 1}{x}\).`, [
      [r`\(A = \dfrac{x + 2}{x}\).`, true, r`\(A = \dfrac{x - 1}{x} : \dfrac{x - 1}{x + 2}\).`],
      [r`\(A(1) = 3\).`, true, r`\(\dfrac31\).`],
      [r`\(A = \dfrac{(x - 1)^2}{x(x + 2)}\).`, false, 'Đó là phép nhân, phải dùng phép chia.'],
      [r`\(A\) tìm được bằng phép chia \(\dfrac{x - 1}{x} : \dfrac{x - 1}{x + 2}\).`, true, 'Thừa số chưa biết bằng tích chia thừa số đã biết.'],
    ]),
    tf(3, TC, r`Cho phân thức \(B\) thỏa mãn \(B : \dfrac{2}{x + 1} = \dfrac{x^2 - 1}{4}\).`, [
      [r`\(B = \dfrac{x^2 - 1}{4}\cdot\dfrac{2}{x + 1}\).`, true, 'Số bị chia bằng thương nhân số chia.'],
      [r`\(B = \dfrac{x - 1}{2}\).`, true, 'Rút gọn.'],
      [r`\(B(3) = 1\).`, true, r`\(\dfrac{2}{2}\).`],
      [r`\(B = \dfrac{x + 1}{2}\).`, false, r`\(B = \dfrac{x - 1}{2}\).`],
    ]),
    tf(3, TH4, r`Cho \(E = \left(\dfrac{x}{x + 1} + \dfrac{1}{x - 1}\right)\cdot\dfrac{x^2 - 1}{x^2 + 1}\).`, [
      [r`Biểu thức trong ngoặc bằng \(\dfrac{x^2 + 1}{x^2 - 1}\).`, true, r`\(x(x - 1) + (x + 1) = x^2 + 1\).`],
      [r`\(E = 1\) với \(x \ne \pm1\).`, true, 'Nhân với nghịch đảo.'],
      [r`Điều kiện xác định là \(x \ne 1\) và \(x \ne -1\).`, true, 'Các mẫu khác 0.'],
      [r`\(E(0) = 0\).`, false, r`\(E = 1\) với mọi \(x\) thỏa điều kiện.`],
    ]),
    tf(4, TH4, r`Cho \(F = \left(1 - \dfrac1x\right) : \left(x - \dfrac1x\right)\).`, [
      [r`\(F = \dfrac{1}{x + 1}\).`, true, r`\(\dfrac{x - 1}{x}\cdot\dfrac{x}{(x - 1)(x + 1)}\).`],
      [r`Điều kiện: \(x \ne 0\), \(x \ne 1\), \(x \ne -1\).`, true, 'Mẫu khác 0 và phân thức chia khác 0.'],
      [r`Với \(x = -2\) thì \(F\) nhận giá trị nguyên.`, true, r`\(F(-2) = -1\).`],
      [r`Với \(x = 0\) thì \(F\) nhận giá trị nguyên.`, false, r`\(x = 0\) không thỏa điều kiện.`],
    ]),
    tf(3, TT4, r`Một người đi quãng đường \(\dfrac{x^2 - 1}{x}\) (km) trong \(\dfrac{x - 1}{2x}\) giờ (\(x > 1\)).`, [
      [r`Vận tốc là \(2(x + 1)\) km/h.`, true, r`\(\dfrac{x^2 - 1}{x} : \dfrac{x - 1}{2x}\).`],
      [r`Khi \(x = 9\), vận tốc là 20 km/h.`, true, r`\(2\cdot10\).`],
      [r`Vận tốc là \(\dfrac{x + 1}{2}\) km/h.`, false, 'Đã nhân thay vì chia.'],
      [r`Điều kiện \(x > 1\) để thời gian dương.`, true, r`\(x - 1 > 0\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, CP, r`Rút gọn \(\dfrac{x^2 - 1}{x} : \dfrac{x + 1}{x^2}\).`, 'x^2 - x', r`\(\dfrac{(x - 1)(x + 1)}{x}\cdot\dfrac{x^2}{x + 1} = x(x - 1) = x^2 - x\).`),
    sa(3, TH4, r`Rút gọn \(\left(\dfrac{x + 1}{x - 1} - \dfrac{x - 1}{x + 1}\right) : \dfrac{4x}{x^2 - 1}\).`, '1', r`Trong ngoặc: \(\dfrac{(x + 1)^2 - (x - 1)^2}{x^2 - 1} = \dfrac{4x}{x^2 - 1}\); chia cho \(\dfrac{4x}{x^2 - 1}\) được 1.`),
    sa(3, TT4, r`Một hình chữ nhật có diện tích \(\dfrac{x^2 + 2x}{3}\) (m²) và chiều rộng \(\dfrac{x}{6}\) (m). Tính chiều dài khi \(x = 4\).`, '12', r`Chiều dài \(\dfrac{x(x + 2)}{3}\cdot\dfrac{6}{x} = 2(x + 2)\). Khi \(x = 4\): 12 m.`, { unit: 'm' }),
    // ---- Tự luận ----
    es(2, NP, r`Thực hiện phép nhân: a) \(\dfrac{5x}{y^2}\cdot\dfrac{y^3}{10x^2}\); b) \(\dfrac{x^2 - 4}{3x}\cdot\dfrac{6x}{x + 2}\).`, r`a) \(\dfrac{5xy^3}{10x^2y^2} = \dfrac{y}{2x}\).
b) \(\dfrac{(x - 2)(x + 2)\cdot6x}{3x(x + 2)} = 2(x - 2)\).`, r`0,5 điểm: câu a.
0,5 điểm: câu b, phân tích và rút gọn đúng.`),
    es(2, CP, r`Thực hiện phép chia: a) \(\dfrac{x^2 - 25}{x + 3} : \dfrac{x - 5}{x^2 - 9}\); b) \(\dfrac{4x}{x - 1} : \dfrac{2x^2}{1 - x}\).`, r`a) \(\dfrac{(x - 5)(x + 5)}{x + 3}\cdot\dfrac{(x - 3)(x + 3)}{x - 5} = (x + 5)(x - 3)\).
b) \(\dfrac{4x}{x - 1}\cdot\dfrac{1 - x}{2x^2} = \dfrac{-4x(x - 1)}{2x^2(x - 1)} = -\dfrac2x\).`, r`0,5 điểm: câu a.
0,5 điểm: câu b, đổi dấu đúng.`),
    es(3, TH4, r`Chứng minh rằng với \(x \ne \pm2\), giá trị của biểu thức \(\left(\dfrac{1}{x - 2} - \dfrac{1}{x + 2}\right)\cdot\dfrac{x^2 - 4}{8}\) không phụ thuộc vào \(x\).`, r`Trong ngoặc: \(\dfrac{(x + 2) - (x - 2)}{x^2 - 4} = \dfrac{4}{x^2 - 4}\).
Biểu thức bằng \(\dfrac{4}{x^2 - 4}\cdot\dfrac{x^2 - 4}{8} = \dfrac12\), không phụ thuộc vào \(x\).`, r`0,5 điểm: tính đúng biểu thức trong ngoặc.
0,5 điểm: nhân, rút gọn và kết luận.`),
    es(4, TH4, r`Cho \(P = \left(\dfrac{x}{x - 3} - \dfrac{9}{x^2 - 3x}\right) : \dfrac{x + 3}{2}\).
a) Tìm điều kiện xác định và rút gọn \(P\). b) Tìm các số nguyên \(x\) để \(P\) nhận giá trị nguyên.`, r`a) Điều kiện: \(x \ne 0\), \(x \ne 3\), \(x \ne -3\).
Trong ngoặc: \(\dfrac{x^2 - 9}{x(x - 3)} = \dfrac{x + 3}{x}\). \(P = \dfrac{x + 3}{x}\cdot\dfrac{2}{x + 3} = \dfrac2x\).
b) \(P\) nguyên khi \(x \in \{-2; -1; 1; 2\}\); các giá trị này đều thỏa điều kiện.`, r`0,5 điểm: câu a, đủ điều kiện và rút gọn đúng.
0,5 điểm: câu b.`),
  ],
};

export const BANK_CHUONG_6: BankLesson[] = [B21, B22, B23, B24];
