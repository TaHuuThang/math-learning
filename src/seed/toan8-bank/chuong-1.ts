/** Ngân hàng câu hỏi GĐ4 – Chương I. Đa thức (Bài 1 – Bài 5). */
import { es, mc, r, sa, tf, type BankLesson } from './types';

const B1: BankLesson = {
  slug: 'bai-1-don-thuc',
  questions: [
    // ---- Trắc nghiệm ----
    mc(1, 'nhan-dien-don-thuc', 'Trong các biểu thức sau, biểu thức nào là đơn thức?', [r`\(\dfrac{1}{2}x^3y\)`, r`\(x^2 - y\)`, r`\(\dfrac{3}{x}y\)`, r`\(2(x + 1)\)`], r`Đơn thức là một số, một biến hoặc tích giữa các số và các biến. \(\dfrac{1}{2}x^3y\) là tích của số \(\dfrac12\) với các biến \(x\), \(y\).`, [
      r`Tích của số \(\dfrac12\) với các biến.`,
      'Có phép trừ nên là đa thức.',
      r`Biến \(x\) nằm ở mẫu.`,
      r`\(2(x + 1) = 2x + 2\) có phép cộng.`,
    ]),
    mc(1, 'nhan-dien-don-thuc', 'Biểu thức nào sau đây KHÔNG phải là đơn thức?', [r`\(x + 5\)`, r`\(-7\)`, r`\(\dfrac{2}{5}xy^2\)`, r`\(x^3\)`], r`\(x + 5\) có phép cộng giữa biến và số nên là đa thức có hai hạng tử, không phải đơn thức.`, [
      'Có phép cộng.',
      'Một số cũng là đơn thức.',
      'Tích của số với các biến.',
      'Một lũy thừa của biến là đơn thức.',
    ]),
    mc(1, 'thu-gon-don-thuc', 'Đơn thức nào sau đây là đơn thức thu gọn?', [r`\(-4x^2y^3\)`, r`\(2x\cdot 3y\)`, r`\(5xyx\)`, r`\(x^2\cdot(-2)y\)`], r`Đơn thức thu gọn chỉ gồm một hệ số đứng trước và mỗi biến xuất hiện một lần dưới dạng lũy thừa: \(-4x^2y^3\).`, [
      'Một hệ số, mỗi biến viết một lần.',
      'Còn hai hệ số 2 và 3 chưa nhân.',
      r`Biến \(x\) xuất hiện hai lần.`,
      'Hệ số chưa đứng ở đầu, chưa nhân gọn.',
    ]),
    mc(2, 'thu-gon-don-thuc', r`Thu gọn đơn thức \(3x^2y\cdot(-2xy^3)\) được`, [r`\(-6x^3y^4\)`, r`\(-6x^2y^3\)`, r`\(6x^3y^4\)`, r`\(x^3y^4\)`], r`Nhân hệ số: \(3\cdot(-2) = -6\); nhân phần biến: \(x^2\cdot x = x^3\), \(y\cdot y^3 = y^4\). Vậy được \(-6x^3y^4\).`, [
      'Nhân hệ số, cộng số mũ của cùng một biến.',
      'Quên cộng số mũ khi nhân lũy thừa cùng cơ số.',
      'Sai dấu: tích một số dương và một số âm là số âm.',
      'Cộng hai hệ số thay vì nhân.',
    ]),
    mc(1, 'tim-bac-cua-don-thuc', r`Bậc của đơn thức \(5x^3y^2z\) là`, [r`\(6\)`, r`\(5\)`, r`\(3\)`, r`\(2\)`], r`Bậc của đơn thức thu gọn (có hệ số khác 0) là tổng số mũ của các biến: \(3 + 2 + 1 = 6\).`, [
      'Tổng số mũ \(3 + 2 + 1\).',
      'Nhầm hệ số 5 là bậc.',
      'Chỉ lấy số mũ lớn nhất.',
      r`Chỉ lấy số mũ của \(y\).`,
    ]),
    mc(2, 'tim-bac-cua-don-thuc', r`Thu gọn rồi tìm bậc của đơn thức \(-\dfrac{2}{3}x^2y\cdot 3xy^2\). Bậc của đơn thức là`, [r`\(6\)`, r`\(5\)`, r`\(3\)`, r`\(4\)`], r`\(-\dfrac{2}{3}x^2y\cdot3xy^2 = -2x^3y^3\), có bậc \(3 + 3 = 6\).`, [
      'Bậc của \(-2x^3y^3\).',
      'Cộng số mũ chưa đủ (quên một thừa số).',
      'Chỉ tính số mũ của một biến.',
      'Lấy bậc của từng thừa số rồi chọn lớn hơn.',
    ]),
    mc(2, 'tinh-gia-tri-cua-don-thuc', r`Giá trị của đơn thức \(-2x^2y\) tại \(x = -1\), \(y = 3\) là`, [r`\(-6\)`, r`\(6\)`, r`\(12\)`, r`\(-3\)`], r`Thay số: \(-2\cdot(-1)^2\cdot3 = -2\cdot1\cdot3 = -6\).`, [
      r`\((-1)^2 = 1\), nhân với \(-2\) và 3.`,
      r`Tính nhầm \((-1)^2 = -1\).`,
      r`Hiểu nhầm \(x^2\) là \(2x\).`,
      'Quên nhân hệ số 2.',
    ]),
    mc(3, 'cong-tru-don-thuc-dong-dang', r`Tổng của ba đơn thức \(2x^2y\), \(-5x^2y\) và \(\dfrac{1}{2}x^2y\) là`, [r`\(-\dfrac{5}{2}x^2y\)`, r`\(\dfrac{5}{2}x^2y\)`, r`\(-\dfrac{5}{2}x^6y^3\)`, r`\(-\dfrac{7}{2}x^2y\)`], r`Ba đơn thức đồng dạng nên cộng hệ số, giữ phần biến: \(\left(2 - 5 + \dfrac12\right)x^2y = -\dfrac{5}{2}x^2y\).`, [
      'Cộng các hệ số, giữ nguyên phần biến.',
      'Sai dấu khi cộng các hệ số.',
      'Không được cộng số mũ khi cộng các đơn thức đồng dạng.',
      r`Trừ nhầm \(\dfrac12\) thay vì cộng.`,
    ]),
    mc(1, 'cong-tru-don-thuc-dong-dang', r`Đơn thức nào đồng dạng với đơn thức \(-4xy^3\)?`, [r`\(\dfrac{1}{3}xy^3\)`, r`\(-4x^3y\)`, r`\(-4xy^2\)`, r`\(xy^3z\)`], r`Hai đơn thức đồng dạng có hệ số khác 0 và cùng phần biến. \(\dfrac13xy^3\) có cùng phần biến \(xy^3\).`, [
      r`Cùng phần biến \(xy^3\).`,
      'Cùng hệ số nhưng phần biến khác.',
      r`Số mũ của \(y\) khác.`,
      r`Có thêm biến \(z\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, 'nhan-dien-don-thuc', 'Xét tính đúng sai của các khẳng định về đơn thức:', [
      [r`\(0\) là một đơn thức.`, true, 'Số 0 được gọi là đơn thức không.'],
      [r`\(\dfrac{x}{3}\) là đơn thức.`, true, r`\(\dfrac{x}{3} = \dfrac13x\) là tích của một số với biến.`],
      [r`\(\dfrac{3}{x}\) là đơn thức.`, false, 'Biến nằm ở mẫu nên không phải đơn thức.'],
      [r`\(x^2y - 1\) là đơn thức.`, false, 'Có phép trừ nên đây là đa thức có hai hạng tử.'],
    ]),
    tf(2, 'thu-gon-don-thuc', r`Cho đơn thức \(A = -\dfrac{1}{2}x^2y\cdot 4xy^3\).`, [
      [r`Thu gọn được \(A = -2x^3y^4\).`, true, r`\(-\dfrac12\cdot4 = -2\); \(x^2\cdot x = x^3\); \(y\cdot y^3 = y^4\).`],
      [r`Hệ số của \(A\) là \(-\dfrac{1}{2}\).`, false, r`Hệ số của đơn thức thu gọn là \(-2\).`],
      [r`Phần biến của \(A\) là \(x^3y^4\).`, true, 'Phần biến là phần còn lại sau hệ số.'],
      [r`Bậc của \(A\) là 4.`, false, r`Bậc là \(3 + 4 = 7\).`],
    ]),
    tf(2, 'tim-bac-cua-don-thuc', 'Xét bậc của các đơn thức sau:', [
      [r`Đơn thức \(7\) có bậc 0.`, true, 'Số khác 0 là đơn thức bậc 0.'],
      [r`Đơn thức \(-x^4\) có bậc 4.`, true, r`Số mũ của \(x\) là 4.`],
      [r`Đơn thức \(2^3x^2y\) có bậc 6.`, false, r`\(2^3\) là hệ số; bậc là \(2 + 1 = 3\).`],
      [r`Đơn thức \(xyz\) có bậc 1.`, false, r`Bậc là \(1 + 1 + 1 = 3\).`],
    ]),
    tf(2, 'tinh-gia-tri-cua-don-thuc', r`Cho đơn thức \(B = 3x^2y^3\).`, [
      [r`Tại \(x = 1\), \(y = -1\) thì \(B = -3\).`, true, r`\(3\cdot1\cdot(-1)^3 = -3\).`],
      [r`Tại \(x = -2\), \(y = 1\) thì \(B = -12\).`, false, r`\((-2)^2 = 4\) nên \(B = 3\cdot4\cdot1 = 12\).`],
      [r`Tại \(x = 0\) thì \(B = 0\) với mọi \(y\).`, true, r`Có thừa số \(x^2 = 0\).`],
      [r`\(B\) luôn nhận giá trị không âm.`, false, r`Khi \(x \ne 0\) và \(y < 0\) thì \(y^3 < 0\) nên \(B < 0\).`],
    ]),
    tf(3, 'tinh-gia-tri-cua-don-thuc', r`Một hình chữ nhật có chiều dài \(2x\) (cm), chiều rộng \(xy\) (cm). Gọi \(S\) là diện tích hình chữ nhật.`, [
      [r`\(S = 2x^2y\) (cm²).`, true, r`\(S = 2x\cdot xy = 2x^2y\).`],
      [r`Khi \(x = 3\), \(y = 2\) thì \(S = 36\) cm².`, true, r`\(2\cdot9\cdot2 = 36\).`],
      [r`\(S\) là đơn thức bậc 2.`, false, r`Bậc của \(2x^2y\) là \(2 + 1 = 3\).`],
      [r`Nếu \(x\) tăng gấp đôi, \(y\) giữ nguyên thì \(S\) tăng gấp đôi.`, false, r`\(x^2\) tăng gấp 4 nên \(S\) tăng gấp 4.`],
    ]),
    tf(2, 'cong-tru-don-thuc-dong-dang', r`Cho các đơn thức \(A = 5x^2y\), \(B = -2x^2y\), \(C = 3xy^2\).`, [
      [r`\(A\) và \(B\) đồng dạng.`, true, r`Cùng phần biến \(x^2y\).`],
      [r`\(A + B = 3x^2y\).`, true, r`\((5 - 2)x^2y = 3x^2y\).`],
      [r`\(A + C = 8x^2y\).`, false, r`\(A\) và \(C\) không đồng dạng nên không cộng hệ số được.`],
      [r`\(A - B = 3x^2y\).`, false, r`\(A - B = (5 + 2)x^2y = 7x^2y\).`],
    ]),
    tf(3, 'cong-tru-don-thuc-dong-dang', r`Một mảnh vườn hình chữ nhật có chiều dài \(5x\) (m), chiều rộng \(2x\) (m). Người ta xây một bể nước hình vuông cạnh \(x\) (m) trong vườn.`, [
      [r`Diện tích mảnh vườn là \(10x^2\) m².`, true, r`\(5x\cdot2x = 10x^2\).`],
      [r`Diện tích bể nước là \(2x^2\) m².`, false, r`Hình vuông cạnh \(x\) có diện tích \(x^2\).`],
      [r`Diện tích phần còn lại là \(9x^2\) m².`, true, r`\(10x^2 - x^2 = 9x^2\).`],
      [r`Với \(x = 4\), diện tích phần còn lại là 36 m².`, false, r`\(9\cdot16 = 144\) m².`],
    ]),
    tf(1, 'thu-gon-don-thuc', r`Cho đơn thức \(M = 0{,}5x^3y\).`, [
      [r`\(M\) là đơn thức thu gọn.`, true, 'Gồm một hệ số và mỗi biến viết một lần dưới dạng lũy thừa.'],
      [r`Hệ số của \(M\) là \(0{,}5\).`, true, 'Hệ số là phần số đứng trước.'],
      [r`Phần biến của \(M\) là \(x^3\).`, false, r`Phần biến là \(x^3y\).`],
      [r`\(M\) và \(\dfrac{1}{2}x^3y\) là cùng một đơn thức.`, true, r`\(0{,}5 = \dfrac12\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, 'tim-bac-cua-don-thuc', r`Bậc của đơn thức \(-9x^5y^2\) là bao nhiêu?`, '7', r`Bậc là tổng số mũ của các biến: \(5 + 2 = 7\).`),
    sa(2, 'thu-gon-don-thuc', r`Thu gọn đơn thức \((-2x^2y)\cdot(-3xy)^2\).`, '-18x^4y^3', r`\((-3xy)^2 = 9x^2y^2\); \((-2x^2y)\cdot9x^2y^2 = -18x^4y^3\).`),
    sa(2, 'tinh-gia-tri-cua-don-thuc', r`Tính giá trị của đơn thức \(\dfrac{3}{4}x^2y\) tại \(x = 2\), \(y = -\dfrac{1}{3}\).`, '-1', r`\(\dfrac34\cdot2^2\cdot\left(-\dfrac13\right) = \dfrac34\cdot4\cdot\left(-\dfrac13\right) = -1\).`),
    sa(3, 'cong-tru-don-thuc-dong-dang', r`Thu gọn \(3xy^2 - \dfrac{1}{2}xy^2 + 2xy^2\) rồi tính giá trị tại \(x = 2\), \(y = -1\).`, '9', r`Thu gọn: \(\left(3 - \dfrac12 + 2\right)xy^2 = \dfrac92xy^2\). Tại \(x = 2\), \(y = -1\): \(\dfrac92\cdot2\cdot1 = 9\).`),
    // ---- Tự luận ----
    es(2, 'thu-gon-don-thuc', r`Thu gọn các đơn thức sau rồi chỉ ra hệ số, phần biến và bậc của mỗi đơn thức:
a) \(A = 2x^2y\cdot(-5)xy^2\); b) \(B = -\dfrac{1}{3}x^3\cdot 6xy^2z\).`, r`a) \(A = -10x^3y^3\): hệ số \(-10\), phần biến \(x^3y^3\), bậc 6.
b) \(B = -2x^4y^2z\): hệ số \(-2\), phần biến \(x^4y^2z\), bậc \(4 + 2 + 1 = 7\).`, r`0,5 điểm: thu gọn đúng \(A\) và nêu đủ hệ số, phần biến, bậc.
0,5 điểm: thu gọn đúng \(B\) và nêu đủ hệ số, phần biến, bậc.`),
    es(3, 'tinh-gia-tri-cua-don-thuc', r`Một khối hộp chữ nhật có các kích thước \(x\), \(2x\) và \(3y\) (cm).
a) Viết đơn thức biểu thị thể tích \(V\) của khối hộp.
b) Tính \(V\) khi \(x = 2\), \(y = 5\).`, r`a) \(V = x\cdot2x\cdot3y = 6x^2y\) (cm³).
b) Khi \(x = 2\), \(y = 5\): \(V = 6\cdot4\cdot5 = 120\) (cm³).`, r`0,5 điểm: viết đúng \(V = 6x^2y\).
0,5 điểm: thay số và tính đúng \(V = 120\) cm³.`),
    es(3, 'cong-tru-don-thuc-dong-dang', r`Cho \(A = 4x^3y^2\), \(B = -\dfrac{3}{2}x^3y^2\), \(C = \dfrac{1}{2}x^3y^2\). Tính \(A + B - C\) và \(A - 2B\).`, r`Ba đơn thức đồng dạng.
\(A + B - C = \left(4 - \dfrac32 - \dfrac12\right)x^3y^2 = 2x^3y^2\).
\(A - 2B = \left(4 + 3\right)x^3y^2 = 7x^3y^2\).`, r`0,5 điểm: tính đúng \(A + B - C = 2x^3y^2\).
0,5 điểm: tính đúng \(A - 2B = 7x^3y^2\).`),
    es(3, 'cong-tru-don-thuc-dong-dang', r`Tìm đơn thức \(M\) biết:
a) \(M + 2xy^3 = 7xy^3\); b) \(\dfrac{1}{2}x^2y - M = -\dfrac{3}{2}x^2y\).`, r`a) \(M = 7xy^3 - 2xy^3 = 5xy^3\).
b) \(M = \dfrac12x^2y - \left(-\dfrac32x^2y\right) = 2x^2y\).`, r`0,5 điểm: tìm đúng \(M = 5xy^3\).
0,5 điểm: tìm đúng \(M = 2x^2y\).`),
    es(3, 'tinh-gia-tri-cua-don-thuc', r`Cho đơn thức \(P = -2x^2y^4\). Chứng tỏ \(P \le 0\) với mọi giá trị của \(x\), \(y\). Khi nào \(P = 0\)?`, r`Với mọi \(x\), \(y\): \(x^2 \ge 0\), \(y^4 \ge 0\) nên \(x^2y^4 \ge 0\), suy ra \(P = -2x^2y^4 \le 0\).
\(P = 0\) khi \(x^2y^4 = 0\), tức \(x = 0\) hoặc \(y = 0\).`, r`0,5 điểm: lập luận \(x^2 \ge 0\), \(y^4 \ge 0\) nên \(P \le 0\).
0,5 điểm: chỉ ra \(P = 0\) khi \(x = 0\) hoặc \(y = 0\).`),
  ],
};

const B2: BankLesson = {
  slug: 'bai-2-da-thuc',
  questions: [
    mc(1, 'nhan-dien-da-thuc', 'Biểu thức nào sau đây là đa thức?', [r`\(x^2 - 3xy + 1\)`, r`\(\dfrac{1}{x} + y\)`, r`\(\dfrac{x + 1}{y}\)`, r`\(\sqrt{x} + 2\)`], r`Đa thức là tổng của những đơn thức. \(x^2 - 3xy + 1\) là tổng của ba đơn thức \(x^2\), \(-3xy\), \(1\).`, [
      'Tổng của ba đơn thức.',
      r`\(\dfrac1x\) không phải đơn thức.`,
      'Có biến ở mẫu.',
      r`Biến nằm dưới dấu căn.`,
    ]),
    mc(1, 'nhan-dien-da-thuc', r`Đa thức \(3x^2y - 2xy + 5\) có bao nhiêu hạng tử?`, [r`\(3\)`, r`\(2\)`, r`\(4\)`, r`\(6\)`], r`Các hạng tử là \(3x^2y\), \(-2xy\) và \(5\): có 3 hạng tử.`, [
      'Mỗi đơn thức trong tổng là một hạng tử.',
      'Quên hạng tử không chứa biến.',
      'Đếm thừa.',
      'Cộng nhầm các hệ số.',
    ]),
    mc(1, 'nhan-dien-da-thuc', 'Khẳng định nào sau đây là đúng?', ['Mỗi đơn thức cũng là một đa thức.', 'Mỗi đa thức cũng là một đơn thức.', 'Đa thức phải có ít nhất hai hạng tử.', 'Số 0 không phải là đa thức.'], 'Đơn thức được coi là đa thức chỉ gồm một hạng tử; điều ngược lại không đúng.', [
      'Đơn thức là đa thức một hạng tử.',
      'Đa thức nhiều hạng tử không phải đơn thức.',
      'Đa thức có thể chỉ có một hạng tử.',
      'Số 0 là đa thức không.',
    ]),
    mc(1, 'thu-gon-da-thuc', r`Trong đa thức \(5x^2y - 3xy^2 + 2x^2y + xy^2\), hạng tử đồng dạng với \(5x^2y\) là`, [r`\(2x^2y\)`, r`\(-3xy^2\)`, r`\(xy^2\)`, r`\(-3xy^2\) và \(xy^2\)`], r`Hạng tử đồng dạng có cùng phần biến \(x^2y\): đó là \(2x^2y\).`, [
      r`Cùng phần biến \(x^2y\).`,
      r`Phần biến \(xy^2\) khác \(x^2y\).`,
      r`Phần biến \(xy^2\) khác \(x^2y\).`,
      r`Hai hạng tử này đồng dạng với nhau, không đồng dạng với \(5x^2y\).`,
    ]),
    mc(2, 'thu-gon-da-thuc', r`Thu gọn đa thức \(4x^2 - 3xy + 2x^2 + 5xy - x^2\) được`, [r`\(5x^2 + 2xy\)`, r`\(7x^2 + 2xy\)`, r`\(5x^2 + 8xy\)`, r`\(5x^2 - 2xy\)`], r`\((4 + 2 - 1)x^2 + (-3 + 5)xy = 5x^2 + 2xy\).`, [
      'Cộng đúng hệ số các hạng tử đồng dạng.',
      r`Bỏ quên dấu trừ trước \(x^2\).`,
      r`Bỏ quên dấu trừ trước \(3xy\).`,
      r`Sai dấu khi tính \(-3 + 5\).`,
    ]),
    mc(2, 'thu-gon-da-thuc', r`Thu gọn đa thức \(P = x^3 - 2x^2y + 3x^2y - x^3 + xy\) được`, [r`\(x^2y + xy\)`, r`\(2x^3 + x^2y + xy\)`, r`\(x^2y\)`, r`\(-x^2y + xy\)`], r`\(x^3 - x^3 = 0\); \(-2x^2y + 3x^2y = x^2y\); còn \(xy\). Vậy \(P = x^2y + xy\).`, [
      'Các hạng tử đồng dạng đã được cộng đúng.',
      r`\(x^3\) và \(-x^3\) đối nhau, tổng bằng 0.`,
      r`Bỏ sót hạng tử \(xy\).`,
      r`Sai dấu: \(-2 + 3 = 1\).`,
    ]),
    mc(1, 'tim-bac-cua-da-thuc', r`Bậc của đa thức \(x^4 - 3x^2y^3 + 2xy\) là`, [r`\(5\)`, r`\(4\)`, r`\(2\)`, r`\(11\)`], r`Các hạng tử có bậc lần lượt 4; 5; 2. Bậc của đa thức là bậc cao nhất: 5.`, [
      r`Bậc của hạng tử \(-3x^2y^3\).`,
      'Chỉ nhìn hạng tử đầu tiên.',
      'Lấy bậc nhỏ nhất.',
      'Cộng bậc của tất cả hạng tử.',
    ]),
    mc(2, 'tim-bac-cua-da-thuc', r`Bậc của đa thức \(2x^3y + 5 - x^3y + xy^2 - x^3y\) là`, [r`\(3\)`, r`\(4\)`, r`\(0\)`, r`\(1\)`], r`Thu gọn: \((2 - 1 - 1)x^3y + xy^2 + 5 = xy^2 + 5\). Bậc của đa thức là bậc của \(xy^2\), bằng 3.`, [
      'Phải thu gọn trước khi tìm bậc.',
      r`Chưa thu gọn: các hạng tử \(x^3y\) đã triệt tiêu.`,
      'Bậc của hạng tử tự do, không phải của đa thức.',
      r`Nhầm bậc của \(xy^2\).`,
    ]),
    mc(2, 'tinh-gia-tri-cua-da-thuc', r`Giá trị của đa thức \(x^2 - 2xy + y^2\) tại \(x = 3\), \(y = -1\) là`, [r`\(16\)`, r`\(4\)`, r`\(10\)`, r`\(2\)`], r`\(3^2 - 2\cdot3\cdot(-1) + (-1)^2 = 9 + 6 + 1 = 16\).`, [
      'Thay đúng và chú ý dấu.',
      r`Sai dấu: \(-2\cdot3\cdot(-1) = +6\).`,
      r`Bỏ sót hạng tử \(-2xy\).`,
      r`Vừa sai dấu \(-2xy\), vừa tính \((-1)^2 = -1\).`,
    ]),
    mc(3, 'tinh-gia-tri-cua-da-thuc', r`Giá trị của đa thức \(2x^2 + 3xy - y^2\) tại \(x = -1\), \(y = 2\) là`, [r`\(-8\)`, r`\(0\)`, r`\(4\)`, r`\(-6\)`], r`\(2\cdot1 + 3\cdot(-1)\cdot2 - 2^2 = 2 - 6 - 4 = -8\).`, [
      'Tính đúng từng hạng tử.',
      r`Tính nhầm \(-y^2 = +4\).`,
      r`Tính nhầm \(3xy = +6\).`,
      r`Tính nhầm \(2x^2 = (2x)^2 = 4\).`,
    ]),
    mc(3, 'tinh-gia-tri-cua-da-thuc', r`Biết \(x - y = 3\). Giá trị của đa thức \(N = 2x - 2y + 5\) là`, [r`\(11\)`, r`\(8\)`, r`\(6\)`, r`\(1\)`], r`\(N = 2(x - y) + 5 = 2\cdot3 + 5 = 11\).`, [
      r`Viết \(2x - 2y = 2(x - y)\).`,
      'Quên nhân 2.',
      'Quên cộng 5.',
      r`Trừ 5 thay vì cộng.`,
    ]),
    mc(2, 'thu-gon-da-thuc', r`Hệ số của hạng tử \(xy\) trong đa thức thu gọn của \(3xy - 2x + 5xy - x^2 - 7xy\) là`, [r`\(1\)`, r`\(15\)`, r`\(8\)`, r`\(-1\)`], r`\(3 + 5 - 7 = 1\), nên hạng tử là \(xy\) với hệ số 1.`, [
      r`\(3 + 5 - 7 = 1\).`,
      'Cộng cả hệ số mang dấu trừ.',
      r`Quên hạng tử \(-7xy\).`,
      'Sai dấu.',
    ]),
    tf(1, 'nhan-dien-da-thuc', r`Cho biểu thức \(P = 2x^2 - \dfrac{1}{3}xy + y^3 - 4\).`, [
      [r`\(P\) là một đa thức.`, true, 'Là tổng của các đơn thức.'],
      [r`\(P\) có 4 hạng tử.`, true, r`\(2x^2\); \(-\dfrac13xy\); \(y^3\); \(-4\).`],
      [r`Hạng tử không chứa biến của \(P\) là \(4\).`, false, r`Hạng tử mang theo dấu đứng trước nên là \(-4\).`],
      [r`\(-\dfrac{1}{3}xy\) là một hạng tử của \(P\).`, true, 'Hạng tử mang theo dấu đứng trước nó.'],
    ]),
    tf(2, 'thu-gon-da-thuc', r`Cho đa thức \(A = 3x^2y - xy + 2x^2y - 5 + 4xy\).`, [
      [r`Dạng thu gọn của \(A\) là \(5x^2y + 3xy - 5\).`, true, r`\((3 + 2)x^2y + (-1 + 4)xy - 5\).`],
      [r`Sau khi thu gọn, \(A\) có 5 hạng tử.`, false, 'Sau khi thu gọn còn 3 hạng tử.'],
      [r`Bậc của \(A\) là 3.`, true, r`Hạng tử bậc cao nhất \(5x^2y\) có bậc 3.`],
      [r`Giá trị của \(A\) tại \(x = 1\), \(y = 1\) là 8.`, false, r`\(5 + 3 - 5 = 3\).`],
    ]),
    tf(2, 'tim-bac-cua-da-thuc', 'Xét bậc của các đa thức sau:', [
      [r`Đa thức \(x^5 - x^5 + 2x^2\) có bậc 5.`, false, r`Thu gọn được \(2x^2\), có bậc 2.`],
      [r`Đa thức \(xy + 3\) có bậc 2.`, true, r`\(xy\) có bậc 2.`],
      [r`Đa thức \(7\) có bậc 0.`, true, 'Số khác 0 có bậc 0.'],
      [r`Đa thức \(x^3y - 2x^4\) có bậc 4.`, true, r`\(x^3y\) và \(2x^4\) đều có bậc 4.`],
    ]),
    tf(2, 'tinh-gia-tri-cua-da-thuc', r`Cho đa thức \(B = x^2 - 3x + 2\).`, [
      [r`Tại \(x = 1\) thì \(B = 0\).`, true, r`\(1 - 3 + 2 = 0\).`],
      [r`Tại \(x = 2\) thì \(B = 0\).`, true, r`\(4 - 6 + 2 = 0\).`],
      [r`Tại \(x = -1\) thì \(B = 0\).`, false, r`\(1 + 3 + 2 = 6\).`],
      [r`Tại \(x = 0\) thì \(B = -2\).`, false, r`Tại \(x = 0\), \(B = 2\).`],
    ]),
    tf(3, 'tinh-gia-tri-cua-da-thuc', r`Một cửa hàng bán \(x\) quyển vở giá 8 nghìn đồng/quyển và \(y\) cái bút giá 5 nghìn đồng/cái. Gọi \(T\) là số tiền (nghìn đồng) thu được.`, [
      [r`\(T = 8x + 5y\).`, true, r`Tiền vở \(8x\), tiền bút \(5y\).`],
      [r`\(T\) là đa thức bậc 2.`, false, r`Các hạng tử \(8x\), \(5y\) đều bậc 1 nên \(T\) bậc 1.`],
      [r`Bán 10 quyển vở và 6 cái bút thì \(T = 110\).`, true, r`\(80 + 30 = 110\).`],
      [r`Nếu \(x = y\) thì \(T = 13x\).`, true, r`\(8x + 5x = 13x\).`],
    ]),
    tf(1, 'nhan-dien-da-thuc', 'Xét các khẳng định về đơn thức và đa thức:', [
      [r`\(x\) vừa là đơn thức vừa là đa thức.`, true, 'Mỗi đơn thức là một đa thức.'],
      [r`\(x^2 + \dfrac{1}{x}\) là đa thức.`, false, r`\(\dfrac1x\) không phải đơn thức.`],
      [r`\(\dfrac{x^2 - y}{3}\) là đa thức.`, true, r`Bằng \(\dfrac13x^2 - \dfrac13y\).`],
      [r`Đa thức \(0\) có bậc 0.`, false, 'Đa thức không không có bậc.'],
    ]),
    tf(2, 'thu-gon-da-thuc', r`Cho \(P = x^2y - 2xy^2 + 3 - 4x^2y + xy^2\).`, [
      [r`Hai hạng tử \(x^2y\) và \(-4x^2y\) đồng dạng.`, true, r`Cùng phần biến \(x^2y\).`],
      [r`Thu gọn \(P\) được \(-3x^2y - xy^2 + 3\).`, true, r`\((1 - 4)x^2y + (-2 + 1)xy^2 + 3\).`],
      [r`\(P\) có bậc 6.`, false, r`Các hạng tử \(x^2y\), \(xy^2\) đều có bậc 3 nên \(P\) bậc 3.`],
      [r`Hạng tử không chứa biến của \(P\) là \(3\).`, true, 'Hạng tử tự do là 3.'],
    ]),
    tf(3, 'tinh-gia-tri-cua-da-thuc', r`Cho đa thức \(C = 2x^2 + y^2\).`, [
      [r`\(C \ge 0\) với mọi \(x\), \(y\).`, true, 'Tổng của hai số không âm.'],
      [r`\(C = 0\) chỉ khi \(x = 0\) và \(y = 0\).`, true, 'Mỗi số hạng không âm nên tổng bằng 0 khi cả hai bằng 0.'],
      [r`Tại \(x = -1\), \(y = 2\) thì \(C = 2\).`, false, r`\(2 + 4 = 6\).`],
      [r`Giá trị của \(C\) tại \(x = 1\), \(y = 3\) và tại \(x = -1\), \(y = -3\) bằng nhau.`, true, 'Các lũy thừa bậc chẵn nên đổi dấu không làm thay đổi giá trị: cùng bằng 11.'],
    ]),
    tf(1, 'tim-bac-cua-da-thuc', r`Cho đa thức \(Q = 4x^3 - x^2y^2 + 7\).`, [
      [r`Hạng tử \(4x^3\) có bậc 3.`, true, r`Số mũ của \(x\) là 3.`],
      [r`Hạng tử \(-x^2y^2\) có bậc 4.`, true, r`\(2 + 2 = 4\).`],
      [r`Bậc của \(Q\) là 7.`, false, 'Bậc của đa thức là bậc cao nhất của các hạng tử: 4.'],
      [r`Hạng tử \(7\) có bậc 1.`, false, 'Số khác 0 có bậc 0.'],
    ]),
    sa(1, 'tim-bac-cua-da-thuc', r`Tìm bậc của đa thức \(3x^2y^4 - x^5 + 2xy - 1\).`, '6', r`Các hạng tử có bậc 6; 5; 2; 0. Bậc của đa thức là 6.`),
    sa(2, 'thu-gon-da-thuc', r`Thu gọn đa thức \(2a^2 - 3ab + 4b^2 - a^2 + 3ab\).`, 'a^2 + 4b^2', r`\((2 - 1)a^2 + (-3 + 3)ab + 4b^2 = a^2 + 4b^2\).`),
    sa(2, 'tinh-gia-tri-cua-da-thuc', r`Tính giá trị của đa thức \(x^3 - 2x^2 + x - 5\) tại \(x = -2\).`, '-23', r`\((-2)^3 - 2\cdot(-2)^2 + (-2) - 5 = -8 - 8 - 2 - 5 = -23\).`),
    sa(3, 'tinh-gia-tri-cua-da-thuc', r`Cho \(A = 3x^2 - 2xy + y^2\). Tính giá trị của \(A\) tại \(x = \dfrac{1}{2}\), \(y = -1\).`, ['11/4', '2,75'], r`\(3\cdot\dfrac14 - 2\cdot\dfrac12\cdot(-1) + 1 = \dfrac34 + 1 + 1 = \dfrac{11}{4}\).`),
    es(2, 'thu-gon-da-thuc', r`Thu gọn các đa thức sau và tìm bậc của chúng:
a) \(M = 5x^2y - 3xy + x^2y - 2xy + 7\); b) \(N = x^4 - 2x^2y^2 + 3x^4 + 2x^2y^2 - 4x^4\).`, r`a) \(M = 6x^2y - 5xy + 7\), bậc 3.
b) \(N = (1 + 3 - 4)x^4 + (-2 + 2)x^2y^2 = 0\): \(N\) là đa thức không, không có bậc.`, r`0,5 điểm: thu gọn đúng \(M\) và nêu bậc 3.
0,5 điểm: thu gọn \(N = 0\) và kết luận đa thức không không có bậc.`),
    es(3, 'tinh-gia-tri-cua-da-thuc', r`Cho đa thức \(P = x^2y + 2xy - 3\). Tính giá trị của \(P\) tại:
a) \(x = 1\), \(y = 2\); b) \(x = -2\), \(y = \dfrac{1}{2}\).`, r`a) \(P = 1\cdot2 + 2\cdot1\cdot2 - 3 = 2 + 4 - 3 = 3\).
b) \(P = 4\cdot\dfrac12 + 2\cdot(-2)\cdot\dfrac12 - 3 = 2 - 2 - 3 = -3\).`, r`0,5 điểm: tính đúng câu a.
0,5 điểm: tính đúng câu b.`),
    es(3, 'tinh-gia-tri-cua-da-thuc', r`Bác Ba có mảnh vườn hình chữ nhật dài \(x\) (m), rộng \(y\) (m). Bác trồng rau trên toàn bộ vườn trừ một lối đi rộng 1 m chạy dọc theo chiều dài vườn.
a) Viết đa thức biểu thị diện tích trồng rau.
b) Tính diện tích đó khi \(x = 20\), \(y = 8\).`, r`a) Lối đi là hình chữ nhật dài \(x\), rộng 1 nên có diện tích \(x\) (m²). Diện tích trồng rau: \(xy - x\) (m²).
b) Khi \(x = 20\), \(y = 8\): \(160 - 20 = 140\) (m²).`, r`0,5 điểm: viết đúng đa thức \(xy - x\).
0,5 điểm: tính đúng 140 m².`),
    es(2, 'tim-bac-cua-da-thuc', r`Cho đa thức \(Q = ax^2y + 3x^2y - 2xy\), trong đó \(a\) là hằng số. Tìm \(a\) để đa thức thu gọn của \(Q\) có bậc 2.`, r`Thu gọn: \(Q = (a + 3)x^2y - 2xy\).
Nếu \(a + 3 \ne 0\) thì \(Q\) có bậc 3. \(Q\) có bậc 2 khi hạng tử bậc 3 mất đi: \(a + 3 = 0\), tức \(a = -3\); khi đó \(Q = -2xy\) có bậc 2.`, r`0,5 điểm: thu gọn đúng \(Q = (a + 3)x^2y - 2xy\).
0,5 điểm: lập luận và tìm đúng \(a = -3\).`),
    es(3, 'tinh-gia-tri-cua-da-thuc', r`Chứng tỏ đa thức \(A = x^2 + 4y^2 + 1\) luôn nhận giá trị dương với mọi \(x\), \(y\).`, r`Với mọi \(x\), \(y\): \(x^2 \ge 0\) và \(4y^2 \ge 0\). Do đó \(A = x^2 + 4y^2 + 1 \ge 1 > 0\).`, r`0,5 điểm: nêu \(x^2 \ge 0\), \(4y^2 \ge 0\).
0,5 điểm: kết luận \(A \ge 1 > 0\).`),
  ],
};

const B3: BankLesson = {
  slug: 'bai-3-phep-cong-va-phep-tru-da-thuc',
  questions: [
    mc(1, 'cong-tru-da-thuc', r`Tổng của hai đa thức \(A = 2x + 3\) và \(B = x - 5\) là`, [r`\(3x - 2\)`, r`\(3x + 8\)`, r`\(x + 8\)`, r`\(3x - 8\)`], r`\(A + B = 2x + 3 + x - 5 = 3x - 2\).`, [
      r`\(2x + x = 3x\); \(3 - 5 = -2\).`,
      r`Sai dấu: \(3 + (-5) = -2\).`,
      'Trừ hai đa thức thay vì cộng.',
      'Cộng các hằng số sai.',
    ]),
    mc(1, 'cong-tru-da-thuc', r`Cho \(A = 4x^2 - x\), \(B = x^2 + 3x\). Hiệu \(A - B\) là`, [r`\(3x^2 - 4x\)`, r`\(3x^2 + 2x\)`, r`\(5x^2 + 2x\)`, r`\(3x^2 - 2x\)`], r`\(A - B = 4x^2 - x - x^2 - 3x = 3x^2 - 4x\).`, [
      'Đổi dấu mọi hạng tử của đa thức trừ.',
      r`Quên đổi dấu \(3x\).`,
      'Cộng hai đa thức thay vì trừ.',
      r`Tính sai \(-x - 3x\).`,
    ]),
    mc(2, 'cong-tru-da-thuc', r`Cho \(P = x^2 - 2xy + y^2\) và \(Q = 2xy - y^2\). Khi đó \(P + Q\) bằng`, [r`\(x^2\)`, r`\(x^2 - 4xy + 2y^2\)`, r`\(x^2 + 2y^2\)`, r`\(x^2 + 4xy\)`], r`\(P + Q = x^2 + (-2xy + 2xy) + (y^2 - y^2) = x^2\).`, [
      'Các hạng tử đồng dạng đối nhau triệt tiêu.',
      r`Đó là \(P - Q\).`,
      r`Sai dấu khi cộng \(y^2\) và \(-y^2\).`,
      r`Sai dấu khi cộng \(-2xy\) và \(2xy\).`,
    ]),
    mc(2, 'cong-tru-da-thuc', r`Kết quả của phép tính \((3a - 2b) - (a - 5b)\) là`, [r`\(2a + 3b\)`, r`\(2a - 7b\)`, r`\(4a - 7b\)`, r`\(2a + 7b\)`], r`\(3a - 2b - a + 5b = 2a + 3b\).`, [
      'Bỏ ngoặc có dấu trừ phải đổi dấu cả hai hạng tử.',
      r`Quên đổi dấu \(-5b\).`,
      'Cộng thay vì trừ và sai dấu.',
      r`Tính sai \(-2b + 5b\).`,
    ]),
    mc(2, 'cong-tru-da-thuc', r`Cho \(A = x^3 - 2x + 1\) và \(B = -x^3 + x^2 + 2x\). Đa thức \(A + B\) có bậc là`, [r`\(2\)`, r`\(3\)`, r`\(0\)`, r`\(6\)`], r`\(A + B = x^2 + 1\), có bậc 2.`, [
      r`\(x^3\) và \(-x^3\) triệt tiêu, còn \(x^2 + 1\).`,
      'Chưa cộng đã kết luận theo bậc của từng đa thức.',
      'Bậc của hạng tử tự do.',
      'Cộng bậc của hai đa thức.',
    ]),
    mc(2, 'cong-tru-da-thuc', r`Rút gọn \((x^2 + 2xy) + (3xy - x^2) - (5xy - y^2)\) được`, [r`\(y^2\)`, r`\(10xy + y^2\)`, r`\(2x^2 + y^2\)`, r`\(-y^2\)`], r`\(x^2 + 2xy + 3xy - x^2 - 5xy + y^2 = y^2\).`, [
      'Mọi hạng tử chứa \(x\) đều triệt tiêu.',
      r`Quên đổi dấu \(5xy\).`,
      r`Quên dấu trừ trước \(x^2\).`,
      r`Quên đổi dấu \(-y^2\).`,
    ]),
    mc(2, 'bai-toan-thuc-te-cong-tru-da-thuc', r`Một hình chữ nhật có chiều dài \(3x + 2\) (cm), chiều rộng \(x + 1\) (cm). Chu vi hình chữ nhật là`, [r`\(8x + 6\) (cm)`, r`\(4x + 3\) (cm)`, r`\(8x + 3\) (cm)`, r`\(6x + 4\) (cm)`], r`Chu vi \(= 2\left[(3x + 2) + (x + 1)\right] = 2(4x + 3) = 8x + 6\) (cm).`, [
      'Chu vi bằng hai lần tổng chiều dài và chiều rộng.',
      'Đó là nửa chu vi.',
      'Chỉ nhân đôi phần chứa biến.',
      'Nhân đôi chiều dài, quên chiều rộng.',
    ]),
    mc(3, 'bai-toan-thuc-te-cong-tru-da-thuc', r`Bạn An có \(2x + 50\) nghìn đồng. Bạn Bình có ít hơn bạn An \(x - 10\) nghìn đồng. Số tiền của bạn Bình là`, [r`\(x + 60\) (nghìn đồng)`, r`\(x + 40\) (nghìn đồng)`, r`\(3x + 40\) (nghìn đồng)`, r`\(3x + 60\) (nghìn đồng)`], r`\((2x + 50) - (x - 10) = 2x + 50 - x + 10 = x + 60\).`, [
      'Trừ đa thức, đổi dấu cả \(-10\).',
      r`Quên đổi dấu \(-10\).`,
      'Cộng thay vì trừ.',
      'Cộng thay vì trừ.',
    ]),
    mc(2, 'tim-da-thuc-chua-biet', r`Tìm đa thức \(M\) biết \(M + (x^2 - 2y) = 3x^2 + y\).`, [r`\(M = 2x^2 + 3y\)`, r`\(M = 4x^2 - y\)`, r`\(M = 2x^2 - y\)`, r`\(M = 2x^2 - 3y\)`], r`\(M = (3x^2 + y) - (x^2 - 2y) = 2x^2 + 3y\).`, [
      'Số hạng chưa biết bằng tổng trừ số hạng đã biết.',
      'Cộng thay vì trừ.',
      r`Quên đổi dấu \(-2y\).`,
      r`Sai dấu khi tính \(y + 2y\).`,
    ]),
    mc(3, 'tim-da-thuc-chua-biet', r`Tìm đa thức \(N\) biết \((5xy - 3x^2) - N = 2xy + x^2\).`, [r`\(N = 3xy - 4x^2\)`, r`\(N = 7xy - 2x^2\)`, r`\(N = 3xy - 2x^2\)`, r`\(N = -3xy + 4x^2\)`], r`Số trừ bằng số bị trừ trừ hiệu: \(N = (5xy - 3x^2) - (2xy + x^2) = 3xy - 4x^2\).`, [
      'Số trừ = số bị trừ − hiệu.',
      'Cộng thay vì trừ.',
      r`Quên đổi dấu \(x^2\).`,
      'Lấy hiệu trừ số bị trừ (ngược dấu).',
    ]),
    mc(3, 'bai-toan-thuc-te-cong-tru-da-thuc', r`Ba cạnh của một tam giác có độ dài \(x + 2\), \(2x - 1\) và \(3x\) (cm). Chu vi tam giác là`, [r`\(6x + 1\) (cm)`, r`\(6x + 3\) (cm)`, r`\(5x + 1\) (cm)`, r`\(6x - 1\) (cm)`], r`\((x + 2) + (2x - 1) + 3x = 6x + 1\) (cm).`, [
      'Cộng ba cạnh.',
      r`Quên dấu trừ của \(-1\).`,
      r`Quên một hạng tử \(x\).`,
      'Sai dấu khi cộng hằng số.',
    ]),
    mc(1, 'cong-tru-da-thuc', r`Để tính hiệu \(A - B\) của hai đa thức, ta`, [r`đổi dấu tất cả các hạng tử của \(B\) rồi cộng với \(A\)`, r`đổi dấu hạng tử đầu tiên của \(B\) rồi cộng với \(A\)`, r`đổi dấu tất cả các hạng tử của \(A\) rồi cộng với \(B\)`, r`giữ nguyên dấu các hạng tử của \(B\) rồi cộng với \(A\)`], r`Bỏ dấu ngoặc có dấu trừ đằng trước thì đổi dấu mọi hạng tử trong ngoặc: \(A - B = A + (-B)\).`, [
      'Đúng quy tắc trừ đa thức.',
      'Phải đổi dấu tất cả hạng tử.',
      'Đổi nhầm đa thức.',
      'Đó là phép cộng.',
    ]),
    tf(1, 'cong-tru-da-thuc', r`Cho \(A = 2x^2 - 3x + 1\) và \(B = x^2 + 3x - 4\).`, [
      [r`\(A + B = 3x^2 - 3\).`, true, r`\((2 + 1)x^2 + (-3 + 3)x + (1 - 4)\).`],
      [r`\(A - B = x^2 - 6x + 5\).`, true, r`\((2 - 1)x^2 + (-3 - 3)x + (1 + 4)\).`],
      [r`\(B - A = x^2 - 6x + 5\).`, false, r`\(B - A\) là đa thức đối của \(A - B\): \(-x^2 + 6x - 5\).`],
      [r`\(A + B\) có bậc 4.`, false, r`\(3x^2 - 3\) có bậc 2.`],
    ]),
    tf(2, 'cong-tru-da-thuc', r`Cho \(P = 3xy - 2x^2 + y^2\) và \(Q = x^2 - 3xy + 2y^2\).`, [
      [r`\(P + Q = -x^2 + 3y^2\).`, true, r`\(3xy - 3xy = 0\); \(-2x^2 + x^2 = -x^2\); \(y^2 + 2y^2 = 3y^2\).`],
      [r`\(P - Q = 6xy - 3x^2 - y^2\).`, true, r`\(3xy + 3xy\); \(-2x^2 - x^2\); \(y^2 - 2y^2\).`],
      [r`\(P + Q\) chứa hạng tử \(xy\).`, false, r`\(3xy\) và \(-3xy\) triệt tiêu.`],
      [r`Tại \(x = 1\), \(y = 1\), giá trị của \(P + Q\) là 4.`, false, r`\(-1 + 3 = 2\).`],
    ]),
    tf(2, 'cong-tru-da-thuc', 'Xét các phép tính với đa thức:', [
      [r`\((x + 1) + (x - 1) = 2x\).`, true, r`\(1 - 1 = 0\).`],
      [r`\((x + 1) - (x - 1) = 0\).`, false, r`\(x + 1 - x + 1 = 2\).`],
      [r`\((a^2 - b^2) - (a^2 + b^2) = -2b^2\).`, true, r`\(a^2 - a^2 - b^2 - b^2\).`],
      [r`\((2x - y) - (y - 2x) = 0\).`, false, r`\(2x - y - y + 2x = 4x - 2y\).`],
    ]),
    tf(3, 'bai-toan-thuc-te-cong-tru-da-thuc', r`Một mảnh đất hình chữ nhật dài \(2x + 5\) (m), rộng \(x + 3\) (m).`, [
      [r`Nửa chu vi mảnh đất là \(3x + 8\) (m).`, true, r`\((2x + 5) + (x + 3)\).`],
      [r`Chu vi mảnh đất là \(6x + 8\) (m).`, false, r`Chu vi \(= 2(3x + 8) = 6x + 16\).`],
      [r`Chiều dài hơn chiều rộng \(x + 2\) (m).`, true, r`\((2x + 5) - (x + 3) = x + 2\).`],
      [r`Khi \(x = 10\), chu vi là 76 m.`, true, r`\(60 + 16 = 76\).`],
    ]),
    tf(3, 'tim-da-thuc-chua-biet', r`Cho \(A = x^2 - 2x + 3\). Tìm đa thức \(B\) trong mỗi trường hợp:`, [
      [r`Nếu \(A + B = 0\) thì \(B = -x^2 + 2x - 3\).`, true, r`\(B = -A\).`],
      [r`Nếu \(A + B = 2x^2\) thì \(B = x^2 + 2x - 3\).`, true, r`\(B = 2x^2 - A\).`],
      [r`Nếu \(A - B = 1\) thì \(B = x^2 - 2x + 4\).`, false, r`\(B = A - 1 = x^2 - 2x + 2\).`],
      [r`Nếu \(B - A = x\) thì \(B = x^2 - x + 3\).`, true, r`\(B = A + x\).`],
    ]),
    tf(2, 'tim-da-thuc-chua-biet', r`Cho \(M + (3x - y) = 5x + 2y\).`, [
      [r`\(M = 5x + 2y - (3x - y)\).`, true, 'Số hạng chưa biết bằng tổng trừ số hạng đã biết.'],
      [r`\(M = 2x + 3y\).`, true, r`\(5x - 3x + 2y + y\).`],
      [r`\(M = 2x + y\).`, false, r`Quên đổi dấu \(-y\) khi bỏ ngoặc.`],
      [r`\(M\) là đa thức bậc 2.`, false, r`\(2x + 3y\) có bậc 1.`],
    ]),
    tf(1, 'cong-tru-da-thuc', 'Xét các khẳng định về quy tắc cộng, trừ đa thức:', [
      ['Để cộng hai đa thức, ta viết liên tiếp các hạng tử của chúng rồi thu gọn.', true, 'Đó là quy tắc cộng đa thức.'],
      ['Khi bỏ dấu ngoặc có dấu trừ đằng trước, ta giữ nguyên dấu các hạng tử trong ngoặc.', false, 'Phải đổi dấu tất cả các hạng tử trong ngoặc.'],
      [r`Phép cộng đa thức có tính chất giao hoán: \(A + B = B + A\).`, true, 'Như phép cộng các số.'],
      [r`\(A - B = B - A\) với mọi đa thức \(A\), \(B\).`, false, r`\(A - B\) và \(B - A\) là hai đa thức đối nhau.`],
    ]),
    tf(3, 'bai-toan-thuc-te-cong-tru-da-thuc', r`Lớp 8A có \(x\) học sinh nam và \(x + 4\) học sinh nữ. Lớp 8B có số học sinh nam nhiều hơn lớp 8A 2 em và số học sinh nữ ít hơn lớp 8A 3 em.`, [
      [r`Lớp 8A có \(2x + 4\) học sinh.`, true, r`\(x + (x + 4)\).`],
      [r`Lớp 8B có \(2x + 3\) học sinh.`, true, r`\((x + 2) + (x + 1)\).`],
      [r`Hai lớp có tất cả \(4x + 6\) học sinh.`, false, r`\((2x + 4) + (2x + 3) = 4x + 7\).`],
      ['Lớp 8A nhiều hơn lớp 8B 1 học sinh.', true, r`\((2x + 4) - (2x + 3) = 1\).`],
    ]),
    tf(3, 'tim-da-thuc-chua-biet', r`Cho \(A = 4x^2y - 3xy + 1\). Đa thức \(B\) thỏa mãn \(A - B = 2x^2y + xy\).`, [
      [r`\(B = A - (2x^2y + xy)\).`, true, 'Số trừ bằng số bị trừ trừ hiệu.'],
      [r`\(B = 2x^2y - 4xy + 1\).`, true, r`\(4x^2y - 2x^2y\); \(-3xy - xy\); \(1\).`],
      [r`\(B\) có bậc 2.`, false, r`\(2x^2y\) có bậc 3.`],
      [r`Tại \(x = 1\), \(y = 1\) thì \(B = -1\).`, true, r`\(2 - 4 + 1 = -1\).`],
    ]),
    tf(2, 'cong-tru-da-thuc', r`Cho \(A = x^3 - x + 2\), \(B = 2x^3 + x - 1\) và \(C = x^3 - 4\).`, [
      [r`\(A + B = 3x^3 + 1\).`, true, r`\(-x + x = 0\); \(2 - 1 = 1\).`],
      [r`\(A + B - C = 2x^3 + 5\).`, true, r`\(3x^3 + 1 - x^3 + 4\).`],
      [r`\(B - A = x^3 + 2x - 3\).`, true, r`\(2x^3 - x^3\); \(x + x\); \(-1 - 2\).`],
      [r`\(A + C = 2x^3 - x - 6\).`, false, r`\(2 + (-4) = -2\) nên \(A + C = 2x^3 - x - 2\).`],
    ]),
    sa(1, 'cong-tru-da-thuc', r`Cho \(A = 5x - 3\) và \(B = 2x + 7\). Thu gọn \(A - B\).`, '3x - 10', r`\(A - B = 5x - 3 - 2x - 7 = 3x - 10\).`),
    sa(2, 'cong-tru-da-thuc', r`Tính \((x^2 - 3x + 2) + (2x^2 + 3x - 5)\).`, '3x^2 - 3', r`\((1 + 2)x^2 + (-3 + 3)x + (2 - 5) = 3x^2 - 3\).`),
    sa(2, 'bai-toan-thuc-te-cong-tru-da-thuc', r`Quãng đường AB dài \(3x + 15\) (km). Một xe đã đi được \(x + 7\) (km). Quãng đường còn lại dài bao nhiêu ki-lô-mét khi \(x = 20\)?`, '48', r`Quãng đường còn lại: \((3x + 15) - (x + 7) = 2x + 8\) (km). Khi \(x = 20\): \(48\) km.`, { unit: 'km' }),
    sa(2, 'tim-da-thuc-chua-biet', r`Tìm đa thức \(M\) biết \(M - (2x^2 - xy) = x^2 + 3xy\).`, '3x^2 + 2xy', r`\(M = (x^2 + 3xy) + (2x^2 - xy) = 3x^2 + 2xy\).`),
    sa(3, 'tim-da-thuc-chua-biet', r`Cho \(A = x^2 + 3x - 1\). Tìm đa thức \(B\) sao cho \(A + B = 0\).`, '-x^2 - 3x + 1', r`\(B = -A = -x^2 - 3x + 1\).`),
    sa(3, 'bai-toan-thuc-te-cong-tru-da-thuc', r`Giá một chiếc bút là \(x\) nghìn đồng, giá một quyển vở đắt hơn bút 3 nghìn đồng. Mua 2 chiếc bút và 5 quyển vở hết bao nhiêu nghìn đồng khi \(x = 4\)?`, '43', r`Số tiền: \(2x + 5(x + 3) = 7x + 15\) (nghìn đồng). Khi \(x = 4\): \(28 + 15 = 43\) (nghìn đồng).`, { unit: 'nghìn đồng' }),
    es(2, 'cong-tru-da-thuc', r`Cho hai đa thức \(A = 3x^2y - 2xy^2 + xy - 1\) và \(B = -x^2y + 2xy^2 + 3xy + 4\). Tính \(A + B\) và \(A - B\).`, r`\(A + B = (3 - 1)x^2y + (-2 + 2)xy^2 + (1 + 3)xy + (-1 + 4) = 2x^2y + 4xy + 3\).
\(A - B = (3 + 1)x^2y + (-2 - 2)xy^2 + (1 - 3)xy + (-1 - 4) = 4x^2y - 4xy^2 - 2xy - 5\).`, r`0,5 điểm: tính đúng \(A + B\).
0,5 điểm: tính đúng \(A - B\) (đổi dấu đúng các hạng tử của \(B\)).`),
    es(3, 'tim-da-thuc-chua-biet', r`Tìm các đa thức \(M\), \(N\) biết:
a) \(M + (5x^2 - 2xy) = 6x^2 + 9xy - y^2\); b) \(N - (x^2 - 3y^2) = 2x^2 + y^2 - xy\).`, r`a) \(M = (6x^2 + 9xy - y^2) - (5x^2 - 2xy) = x^2 + 11xy - y^2\).
b) \(N = (2x^2 + y^2 - xy) + (x^2 - 3y^2) = 3x^2 - 2y^2 - xy\).`, r`0,5 điểm: tìm đúng \(M\).
0,5 điểm: tìm đúng \(N\).`),
    es(3, 'bai-toan-thuc-te-cong-tru-da-thuc', r`Một hình chữ nhật có chiều dài \(4x + 3\) (cm), chiều rộng ngắn hơn chiều dài \(2x - 1\) (cm).
a) Viết đa thức biểu thị chiều rộng.
b) Viết đa thức biểu thị chu vi và tính chu vi khi \(x = 2\).`, r`a) Chiều rộng: \((4x + 3) - (2x - 1) = 2x + 4\) (cm).
b) Chu vi: \(2\left[(4x + 3) + (2x + 4)\right] = 12x + 14\) (cm). Khi \(x = 2\): \(38\) cm.`, r`0,5 điểm: tìm đúng chiều rộng \(2x + 4\).
0,5 điểm: viết đúng chu vi \(12x + 14\) và tính đúng 38 cm.`),
    es(3, 'tim-da-thuc-chua-biet', r`Cho \(A = x^2 - 2y + xy + 1\) và \(B = x^2 + y - x^2y^2 - 1\). Tìm đa thức \(C\) sao cho \(C + A = B\), rồi tính giá trị của \(C\) tại \(x = 1\), \(y = -1\).`, r`\(C = B - A = x^2 + y - x^2y^2 - 1 - x^2 + 2y - xy - 1 = 3y - x^2y^2 - xy - 2\).
Tại \(x = 1\), \(y = -1\): \(C = -3 - 1 + 1 - 2 = -5\).`, r`0,5 điểm: tìm đúng \(C = 3y - x^2y^2 - xy - 2\).
0,5 điểm: tính đúng giá trị \(-5\).`),
  ],
};

const B4: BankLesson = {
  slug: 'bai-4-phep-nhan-da-thuc',
  questions: [
    mc(1, 'nhan-hai-don-thuc', r`Tích \(3x^2\cdot4x^3\) bằng`, [r`\(12x^5\)`, r`\(12x^6\)`, r`\(7x^5\)`, r`\(7x^6\)`], r`Nhân hệ số \(3\cdot4 = 12\); cộng số mũ \(x^2\cdot x^3 = x^5\).`, [
      'Nhân hệ số, cộng số mũ.',
      'Nhân số mũ thay vì cộng.',
      'Cộng hệ số thay vì nhân.',
      'Cộng hệ số và nhân số mũ.',
    ]),
    mc(2, 'nhan-hai-don-thuc', r`Tích \((-2xy^2)\cdot(5x^2y)\) bằng`, [r`\(-10x^3y^3\)`, r`\(10x^3y^3\)`, r`\(-10x^2y^2\)`, r`\(3x^3y^3\)`], r`\((-2)\cdot5 = -10\); \(x\cdot x^2 = x^3\); \(y^2\cdot y = y^3\).`, [
      'Đúng dấu, đúng số mũ.',
      'Sai dấu.',
      'Nhân số mũ sai (phải cộng).',
      'Cộng hệ số thay vì nhân.',
    ]),
    mc(1, 'nhan-don-thuc-voi-da-thuc', r`Kết quả của phép nhân \(2x(x - 3)\) là`, [r`\(2x^2 - 6x\)`, r`\(2x^2 - 3\)`, r`\(2x^2 - 6\)`, r`\(x^2 - 6x\)`], r`\(2x\cdot x - 2x\cdot3 = 2x^2 - 6x\).`, [
      r`Nhân \(2x\) với từng hạng tử.`,
      r`Quên nhân \(2x\) với \(-3\).`,
      r`Nhân \(-3\) với 2 nhưng quên \(x\).`,
      'Quên hệ số 2 ở hạng tử đầu.',
    ]),
    mc(2, 'nhan-don-thuc-voi-da-thuc', r`Kết quả của phép nhân \(-3xy(x^2 - 2y + 1)\) là`, [r`\(-3x^3y + 6xy^2 - 3xy\)`, r`\(-3x^3y - 6xy^2 - 3xy\)`, r`\(-3x^3y + 6xy^2 + 1\)`, r`\(-3x^2y + 6xy^2 - 3xy\)`], r`\(-3xy\cdot x^2 = -3x^3y\); \(-3xy\cdot(-2y) = 6xy^2\); \(-3xy\cdot1 = -3xy\).`, [
      'Nhân với từng hạng tử, chú ý dấu.',
      r`Sai dấu: \((-3xy)\cdot(-2y) = +6xy^2\).`,
      r`Quên nhân \(-3xy\) với 1.`,
      r`Sai số mũ: \(x\cdot x^2 = x^3\).`,
    ]),
    mc(2, 'nhan-da-thuc-voi-da-thuc', r`Kết quả của phép nhân \((x + 2)(x - 5)\) là`, [r`\(x^2 - 3x - 10\)`, r`\(x^2 - 10\)`, r`\(x^2 + 3x - 10\)`, r`\(x^2 - 7x - 10\)`], r`\(x^2 - 5x + 2x - 10 = x^2 - 3x - 10\).`, [
      'Nhân mỗi hạng tử với mỗi hạng tử rồi thu gọn.',
      'Chỉ nhân các hạng tử tương ứng.',
      r`Sai dấu: \(-5x + 2x = -3x\).`,
      'Cộng sai hệ số.',
    ]),
    mc(2, 'nhan-da-thuc-voi-da-thuc', r`Kết quả của phép nhân \((2x - 1)(3x + 4)\) là`, [r`\(6x^2 + 5x - 4\)`, r`\(6x^2 - 4\)`, r`\(6x^2 + 11x - 4\)`, r`\(6x^2 + 5x + 4\)`], r`\(6x^2 + 8x - 3x - 4 = 6x^2 + 5x - 4\).`, [
      'Nhân đủ bốn tích rồi thu gọn.',
      'Thiếu hai tích \(8x\) và \(-3x\).',
      r`Sai dấu tích \((-1)\cdot3x\).`,
      r`Sai dấu tích \((-1)\cdot4\).`,
    ]),
    mc(3, 'nhan-don-thuc-voi-da-thuc', r`Giá trị của biểu thức \(x(x - y) + y(x - y)\) tại \(x = 3\), \(y = 1\) là`, [r`\(8\)`, r`\(10\)`, r`\(4\)`, r`\(6\)`], r`Rút gọn: \(x^2 - xy + xy - y^2 = x^2 - y^2\). Tại \(x = 3\), \(y = 1\): \(9 - 1 = 8\).`, [
      r`\(x^2 - y^2\) tại \(x = 3\), \(y = 1\).`,
      r`Nhầm \(-y^2\) thành \(+y^2\).`,
      r`Tính nhầm thành \((x - y)^2\).`,
      r`Quên hạng tử \(y(x - y)\).`,
    ]),
    mc(3, 'nhan-da-thuc-voi-da-thuc', r`Diện tích hình chữ nhật có chiều dài \(x + 3\) và chiều rộng \(x - 1\) là`, [r`\(x^2 + 2x - 3\)`, r`\(x^2 - 3\)`, r`\(2x + 2\)`, r`\(x^2 + 4x - 3\)`], r`\(S = (x + 3)(x - 1) = x^2 - x + 3x - 3 = x^2 + 2x - 3\).`, [
      'Diện tích = dài × rộng.',
      'Chỉ nhân các hạng tử tương ứng.',
      'Đó là nửa chu vi.',
      r`Sai dấu khi tính \(-x + 3x\).`,
    ]),
    mc(3, 'bieu-thuc-khong-phu-thuoc-bien', r`Biểu thức \(x(x + 2) - x^2 - 2x + 7\) có giá trị bằng`, [r`\(7\)`, r`\(2x + 7\)`, r`\(4x + 7\)`, r`\(-7\)`], r`\(x^2 + 2x - x^2 - 2x + 7 = 7\) với mọi \(x\).`, [
      'Mọi hạng tử chứa biến triệt tiêu.',
      r`Quên trừ \(2x\).`,
      r`Cộng nhầm \(2x + 2x\).`,
      'Sai dấu hằng số.',
    ]),
    mc(4, 'bieu-thuc-khong-phu-thuoc-bien', r`Biểu thức \((x - 1)(x + 1) - x(x - 2) - 2x\) bằng`, [r`\(-1\)`, r`\(1\)`, r`\(4x - 1\)`, r`\(-4x - 1\)`], r`\(x^2 - 1 - x^2 + 2x - 2x = -1\) với mọi \(x\).`, [
      'Giá trị không phụ thuộc vào biến.',
      r`Sai dấu khi khai triển \((x - 1)(x + 1)\).`,
      r`Sai dấu khi bỏ ngoặc \(-x(x - 2)\) và quên trừ \(2x\).`,
      r`Quên đổi dấu \(-2x\) trong ngoặc.`,
    ]),
    mc(3, 'chung-minh-dang-thuc-phep-nhan', 'Đẳng thức nào sau đây đúng với mọi \\(x\\)?', [r`\((x - 2)(x + 3) = x^2 + x - 6\)`, r`\((x - 2)(x + 3) = x^2 - x - 6\)`, r`\((x + 1)(x - 1) = x^2 + 1\)`, r`\(x(x - 3) = x^2 - 3\)`], r`\((x - 2)(x + 3) = x^2 + 3x - 2x - 6 = x^2 + x - 6\).`, [
      'Khai triển vế trái được đúng vế phải.',
      r`Sai dấu hạng tử \(x\).`,
      r`\((x + 1)(x - 1) = x^2 - 1\).`,
      r`\(x(x - 3) = x^2 - 3x\).`,
    ]),
    tf(1, 'nhan-hai-don-thuc', 'Xét các phép nhân đơn thức:', [
      [r`\(x^2\cdot x^3 = x^5\).`, true, r`Cộng số mũ: \(2 + 3 = 5\).`],
      [r`\(2x\cdot3x = 6x\).`, false, r`\(2x\cdot3x = 6x^2\).`],
      [r`\((-x)\cdot(-x^2) = x^3\).`, true, 'Tích của hai biểu thức mang dấu trừ là dương.'],
      [r`\(4xy\cdot\dfrac{1}{4}y = xy\).`, false, r`\(4xy\cdot\dfrac14y = xy^2\).`],
    ]),
    tf(2, 'nhan-don-thuc-voi-da-thuc', r`Cho \(A = 2x(3x - y) - 3y(x - 2y)\).`, [
      [r`\(2x(3x - y) = 6x^2 - 2xy\).`, true, r`Nhân \(2x\) với từng hạng tử.`],
      [r`\(-3y(x - 2y) = -3xy - 6y^2\).`, false, r`\((-3y)\cdot(-2y) = 6y^2\) nên \(= -3xy + 6y^2\).`],
      [r`\(A = 6x^2 - 5xy + 6y^2\).`, true, r`\(-2xy - 3xy = -5xy\).`],
      [r`Tại \(x = 1\), \(y = 1\) thì \(A = 7\).`, true, r`\(6 - 5 + 6 = 7\).`],
    ]),
    tf(2, 'nhan-da-thuc-voi-da-thuc', r`Cho \(P = (x + 3)(x^2 - 3x + 9)\).`, [
      [r`\(P = x^3 + 27\).`, true, r`\(x^3 - 3x^2 + 9x + 3x^2 - 9x + 27 = x^3 + 27\).`],
      [r`\(P\) có bậc 3.`, true, r`Hạng tử bậc cao nhất là \(x^3\).`],
      [r`Tại \(x = -3\) thì \(P = 54\).`, false, r`\(P = -27 + 27 = 0\).`],
      [r`\(P\) có hạng tử \(9x\).`, false, r`\(9x - 9x = 0\) nên \(P\) không có hạng tử bậc nhất.`],
    ]),
    tf(3, 'nhan-da-thuc-voi-da-thuc', r`Một hình hộp chữ nhật có các kích thước \(x\), \(x + 1\) và \(x + 2\) (cm).`, [
      [r`Diện tích mặt có hai kích thước \(x\), \(x + 1\) là \(x^2 + x\) (cm²).`, true, r`\(x(x + 1) = x^2 + x\).`],
      [r`Thể tích là \(x^3 + 3x^2 + 2x\) (cm³).`, true, r`\((x^2 + x)(x + 2) = x^3 + 2x^2 + x^2 + 2x\).`],
      [r`Khi \(x = 2\), thể tích là 20 cm³.`, false, r`\(2\cdot3\cdot4 = 24\) cm³.`],
      ['Thể tích được biểu thị bởi một đa thức bậc 3.', true, r`Hạng tử bậc cao nhất là \(x^3\).`],
    ]),
    tf(3, 'bieu-thuc-khong-phu-thuoc-bien', r`Cho \(B = x(2x + 1) - x^2(x + 2) + x^3 - x + 3\).`, [
      [r`\(x(2x + 1) = 2x^2 + x\).`, true, 'Nhân đơn thức với đa thức.'],
      [r`\(-x^2(x + 2) = -x^3 + 2x^2\).`, false, r`\(-x^2(x + 2) = -x^3 - 2x^2\).`],
      [r`\(B = 3\) với mọi \(x\).`, true, r`\(2x^2 + x - x^3 - 2x^2 + x^3 - x + 3 = 3\).`],
      [r`Giá trị của \(B\) phụ thuộc vào \(x\).`, false, r`\(B\) luôn bằng 3.`],
    ]),
    tf(3, 'chung-minh-dang-thuc-phep-nhan', r`Xét đẳng thức \((a + b)(a - b) = a^2 - b^2\) và các hệ quả của nó.`, [
      [r`Đẳng thức đúng với mọi \(a\), \(b\).`, true, r`\(a^2 - ab + ab - b^2 = a^2 - b^2\).`],
      [r`\(101\cdot99 = 10\,001\).`, false, r`\((100 + 1)(100 - 1) = 10\,000 - 1 = 9\,999\).`],
      [r`\((x + 3)(x - 3) = x^2 - 9\).`, true, r`Áp dụng với \(a = x\), \(b = 3\).`],
      [r`\((2x + 1)(2x - 1) = 2x^2 - 1\).`, false, r`\(= (2x)^2 - 1 = 4x^2 - 1\).`],
    ]),
    tf(2, 'nhan-hai-don-thuc', r`Cho \(M = (-3x^2y)\cdot(2xy^3)\).`, [
      [r`\(M = -6x^3y^4\).`, true, r`\((-3)\cdot2 = -6\); cộng số mũ.`],
      [r`Bậc của \(M\) là 7.`, true, r`\(3 + 4 = 7\).`],
      [r`Hệ số của \(M\) là \(-1\).`, false, r`Hệ số là \(-6\).`],
      [r`Tại \(x = -1\), \(y = 1\) thì \(M = -6\).`, false, r`\(-6\cdot(-1)^3\cdot1 = 6\).`],
    ]),
    tf(3, 'nhan-don-thuc-voi-da-thuc', r`Tìm \(x\) biết \(3x(x - 2) - 3x^2 = 12\).`, [
      [r`Vế trái thu gọn được \(-6x\).`, true, r`\(3x^2 - 6x - 3x^2 = -6x\).`],
      [r`\(x = 2\).`, false, r`\(-6x = 12\) nên \(x = -2\).`],
      [r`\(x = -2\).`, true, r`\(-6\cdot(-2) = 12\).`],
      [r`Có vô số giá trị \(x\) thỏa mãn.`, false, r`Chỉ có một giá trị \(x = -2\).`],
    ]),
    tf(4, 'bieu-thuc-khong-phu-thuoc-bien', r`Cho \(Q = (x - 2)(x + 5) - (x + 1)(x + 2) - ax\), với \(a\) là hằng số.`, [
      [r`\((x - 2)(x + 5) = x^2 + 3x - 10\).`, true, r`\(5x - 2x = 3x\).`],
      [r`\((x + 1)(x + 2) = x^2 + 3x + 2\).`, true, 'Nhân đa thức với đa thức.'],
      [r`Khi \(a = 0\), \(Q = -12\) với mọi \(x\).`, true, r`\(Q = -12 - ax\).`],
      [r`Khi \(a = 1\), giá trị của \(Q\) không phụ thuộc vào \(x\).`, false, r`\(Q = -12 - x\) còn phụ thuộc \(x\).`],
    ]),
    sa(1, 'nhan-hai-don-thuc', r`Thu gọn tích \(\dfrac{1}{2}x^3y\cdot8xy^2\).`, '4x^4y^3', r`\(\dfrac12\cdot8 = 4\); \(x^3\cdot x = x^4\); \(y\cdot y^2 = y^3\).`),
    sa(2, 'nhan-don-thuc-voi-da-thuc', r`Thực hiện phép nhân \(x^2(2x - 3)\) (viết kết quả thu gọn).`, '2x^3 - 3x^2', r`\(x^2\cdot2x - x^2\cdot3 = 2x^3 - 3x^2\).`),
    sa(2, 'nhan-da-thuc-voi-da-thuc', r`Hệ số của \(x\) trong kết quả của phép nhân \((3x - 2)(x + 4)\) là bao nhiêu?`, '10', r`\((3x - 2)(x + 4) = 3x^2 + 12x - 2x - 8 = 3x^2 + 10x - 8\).`),
    sa(3, 'nhan-da-thuc-voi-da-thuc', r`Tìm \(x\) biết \((x + 1)(x + 2) - x(x + 4) = 6\).`, '-4', r`\(x^2 + 3x + 2 - x^2 - 4x = -x + 2 = 6\), suy ra \(x = -4\).`),
    sa(3, 'bieu-thuc-khong-phu-thuoc-bien', r`Biểu thức \(2x(x - 3) - (2x^2 - 6x - 5)\) luôn nhận giá trị bằng bao nhiêu?`, '5', r`\(2x^2 - 6x - 2x^2 + 6x + 5 = 5\).`),
    es(3, 'nhan-da-thuc-voi-da-thuc', r`Thực hiện phép nhân:
a) \((x - 2y)(x^2 + 2xy + 4y^2)\); b) \((2x + 1)(x^2 - x + 3)\).`, r`a) \(x^3 + 2x^2y + 4xy^2 - 2x^2y - 4xy^2 - 8y^3 = x^3 - 8y^3\).
b) \(2x^3 - 2x^2 + 6x + x^2 - x + 3 = 2x^3 - x^2 + 5x + 3\).`, r`0,5 điểm: tính đúng câu a.
0,5 điểm: tính đúng câu b.`),
    es(4, 'chung-minh-dang-thuc-phep-nhan', r`Chứng minh rằng với mọi số nguyên \(n\), biểu thức \((n + 2)(n + 7) - (n - 1)(n + 4)\) chia hết cho 6.`, r`\((n + 2)(n + 7) = n^2 + 9n + 14\); \((n - 1)(n + 4) = n^2 + 3n - 4\).
Hiệu: \(n^2 + 9n + 14 - n^2 - 3n + 4 = 6n + 18 = 6(n + 3)\).
Vì \(n\) nguyên nên \(n + 3\) nguyên, do đó biểu thức chia hết cho 6.`, r`0,5 điểm: khai triển hai tích và rút gọn đúng được \(6n + 18\).
0,5 điểm: viết \(6(n + 3)\) và kết luận chia hết cho 6.`),
  ],
};

const B5: BankLesson = {
  slug: 'bai-5-phep-chia-da-thuc-cho-don-thuc',
  questions: [
    mc(1, 'chia-don-thuc-cho-don-thuc', r`Kết quả của phép chia \(12x^5 : 3x^2\) là`, [r`\(4x^3\)`, r`\(9x^3\)`, r`\(4x^7\)`, r`\(4x^{10}\)`], r`Chia hệ số \(12 : 3 = 4\); trừ số mũ \(x^5 : x^2 = x^3\).`, [
      'Chia hệ số, trừ số mũ.',
      'Trừ hệ số thay vì chia.',
      'Cộng số mũ thay vì trừ.',
      'Nhân số mũ thay vì trừ.',
    ]),
    mc(1, 'chia-don-thuc-cho-don-thuc', r`Đơn thức \(A\) chia hết cho đơn thức \(B\) (\(B \ne 0\)) khi`, [r`mỗi biến của \(B\) đều là biến của \(A\) với số mũ không lớn hơn số mũ của nó trong \(A\)`, r`hệ số của \(A\) chia hết cho hệ số của \(B\)`, r`bậc của \(A\) lớn hơn bậc của \(B\)`, r`\(A\) và \(B\) có cùng phần biến`], 'Điều kiện chia hết liên quan đến các biến và số mũ, không phụ thuộc hệ số.', [
      'Đúng điều kiện chia hết.',
      'Hệ số luôn chia được (khác 0).',
      'Bậc lớn hơn chưa đủ, các biến phải phù hợp.',
      'Chỉ là một trường hợp riêng.',
    ]),
    mc(2, 'chia-don-thuc-cho-don-thuc', r`Kết quả của phép chia \((-15x^4y^3) : (5x^2y)\) là`, [r`\(-3x^2y^2\)`, r`\(3x^2y^2\)`, r`\(-3x^2y^3\)`, r`\(-10x^2y^2\)`], r`\(-15 : 5 = -3\); \(x^4 : x^2 = x^2\); \(y^3 : y = y^2\).`, [
      'Chia hệ số, trừ số mũ từng biến.',
      'Sai dấu.',
      r`Quên chia \(y^3\) cho \(y\).`,
      'Trừ hệ số thay vì chia.',
    ]),
    mc(2, 'chia-don-thuc-cho-don-thuc', 'Phép chia nào sau đây KHÔNG chia hết (thương không phải là đơn thức)?', [r`\(6x^2y : 2xy^2\)`, r`\(6x^2y : 2xy\)`, r`\(6x^2y : 3x^2\)`, r`\(6x^2y : (-y)\)`], r`Trong \(6x^2y : 2xy^2\), biến \(y\) của đơn thức chia có số mũ 2 lớn hơn số mũ 1 trong đơn thức bị chia nên không chia hết.`, [
      r`Số mũ của \(y\) ở đơn thức chia lớn hơn.`,
      r`Chia hết, thương là \(3x\).`,
      r`Chia hết, thương là \(2y\).`,
      r`Chia hết, thương là \(-6x^2\).`,
    ]),
    mc(1, 'chia-da-thuc-cho-don-thuc', r`Kết quả của phép chia \((6x^3 - 4x^2) : 2x\) là`, [r`\(3x^2 - 2x\)`, r`\(3x^3 - 2x^2\)`, r`\(3x^2 - 4x\)`, r`\(4x^2 - 2x\)`], r`Chia từng hạng tử: \(6x^3 : 2x = 3x^2\); \(-4x^2 : 2x = -2x\).`, [
      'Chia từng hạng tử cho đơn thức.',
      'Quên trừ số mũ.',
      'Quên chia hệ số của hạng tử thứ hai.',
      'Trừ hệ số thay vì chia.',
    ]),
    mc(2, 'chia-da-thuc-cho-don-thuc', r`Kết quả của phép chia \((9x^2y^3 - 6x^3y^2 + 3xy) : 3xy\) là`, [r`\(3xy^2 - 2x^2y + 1\)`, r`\(3xy^2 - 2x^2y\)`, r`\(3xy^2 + 2x^2y + 1\)`, r`\(3xy^2 - 2x^2y + 3xy\)`], r`\(9x^2y^3 : 3xy = 3xy^2\); \(-6x^3y^2 : 3xy = -2x^2y\); \(3xy : 3xy = 1\).`, [
      'Chia đủ ba hạng tử.',
      r`Quên thương \(3xy : 3xy = 1\).`,
      'Sai dấu hạng tử thứ hai.',
      'Chưa chia hạng tử cuối.',
    ]),
    mc(2, 'chia-da-thuc-cho-don-thuc', r`Đa thức nào sau đây chia hết cho đơn thức \(2x^2\)?`, [r`\(4x^3 - 6x^2\)`, r`\(4x^3 - 6x\)`, r`\(x^2 + 1\)`, r`\(8x^4 + 2x\)`], r`Đa thức chia hết cho \(2x^2\) khi mọi hạng tử đều chia hết cho \(2x^2\): \(4x^3\) và \(-6x^2\) đều chia hết.`, [
      'Mọi hạng tử chia hết.',
      r`\(-6x\) không chia hết cho \(2x^2\).`,
      r`Hạng tử 1 không chia hết.`,
      r`\(2x\) không chia hết cho \(2x^2\).`,
    ]),
    mc(3, 'chia-da-thuc-cho-don-thuc', r`Giá trị của biểu thức \((10x^3 - 5x^2) : 5x^2\) tại \(x = 3\) là`, [r`\(5\)`, r`\(6\)`, r`\(25\)`, r`\(1\)`], r`\((10x^3 - 5x^2) : 5x^2 = 2x - 1\). Tại \(x = 3\): \(6 - 1 = 5\).`, [
      'Rút gọn rồi thay số.',
      r`Quên hạng tử \(-1\).`,
      'Thay số trước nhưng chia sai.',
      'Quên nhân 2 với \(x\).',
    ]),
    mc(2, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Đa thức \(M\) thỏa mãn \(M\cdot3x = 6x^3 - 9x^2\) là`, [r`\(2x^2 - 3x\)`, r`\(18x^4 - 27x^3\)`, r`\(2x^3 - 3x^2\)`, r`\(3x^2 - 6x\)`], r`\(M = (6x^3 - 9x^2) : 3x = 2x^2 - 3x\).`, [
      'Thừa số chưa biết = tích : thừa số đã biết.',
      'Nhân thay vì chia.',
      'Quên trừ số mũ.',
      'Trừ hệ số thay vì chia.',
    ]),
    mc(3, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Đa thức \(N\) thỏa mãn \(N : (-2xy) = x - 3y\) là`, [r`\(-2x^2y + 6xy^2\)`, r`\(-2x^2y - 6xy^2\)`, r`\(2x^2y - 6xy^2\)`, r`\(-\dfrac{1}{2}x + \dfrac{3}{2}y\)`], r`\(N = -2xy(x - 3y) = -2x^2y + 6xy^2\).`, [
      'Số bị chia = thương × số chia.',
      r`Sai dấu: \((-2xy)\cdot(-3y) = 6xy^2\).`,
      'Sai dấu cả hai hạng tử.',
      'Chia thay vì nhân.',
    ]),
    mc(3, 'chia-da-thuc-cho-don-thuc', r`Thương của phép chia \((4x^4 - 8x^3 + 12x^2) : 4x^2\) có hệ số của \(x\) bằng`, [r`\(-2\)`, r`\(2\)`, r`\(-8\)`, r`\(3\)`], r`Thương là \(x^2 - 2x + 3\); hệ số của \(x\) là \(-2\).`, [
      r`Hạng tử \(-2x\).`,
      'Quên dấu trừ.',
      'Chưa chia hệ số cho 4.',
      'Đó là hạng tử tự do.',
    ]),
    mc(3, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Một hình chữ nhật có diện tích \(6x^2 + 4xy\) (cm²) và chiều rộng \(2x\) (cm). Chiều dài hình chữ nhật là`, [r`\(3x + 2y\) (cm)`, r`\(3x + 4xy\) (cm)`, r`\(12x^3 + 8x^2y\) (cm)`, r`\(3x^2 + 2xy\) (cm)`], r`Chiều dài \(= (6x^2 + 4xy) : 2x = 3x + 2y\) (cm).`, [
      'Chiều dài = diện tích : chiều rộng.',
      'Chỉ chia hạng tử đầu.',
      'Nhân thay vì chia.',
      'Chia hệ số nhưng quên trừ số mũ.',
    ]),
    tf(1, 'chia-don-thuc-cho-don-thuc', 'Xét các phép chia đơn thức sau:', [
      [r`\(x^7 : x^3 = x^4\).`, true, r`Trừ số mũ: \(7 - 3 = 4\).`],
      [r`\(10x^4 : 5x^4 = 2x\).`, false, r`\(x^4 : x^4 = 1\) nên thương là \(2\).`],
      [r`\(-8x^3y : 4xy = -2x^2\).`, true, r`\(-8 : 4 = -2\); \(x^3 : x = x^2\); \(y : y = 1\).`],
      [r`\(x^2 : x^5 = x^3\).`, false, 'Số mũ của đơn thức chia lớn hơn nên không chia hết.'],
    ]),
    tf(2, 'chia-don-thuc-cho-don-thuc', r`Cho \(A = 18x^4y^3z\) và \(B = -6x^2y^3\).`, [
      [r`\(A\) chia hết cho \(B\).`, true, r`Mọi biến của \(B\) đều có trong \(A\) với số mũ không nhỏ hơn.`],
      [r`\(A : B = -3x^2z\).`, true, r`\(18 : (-6) = -3\); \(x^4 : x^2 = x^2\); \(y^3 : y^3 = 1\); còn \(z\).`],
      [r`Thương \(A : B\) có bậc 2.`, false, r`\(-3x^2z\) có bậc 3.`],
      [r`\(B\) chia hết cho \(A\).`, false, r`\(B\) không có biến \(z\) và số mũ của \(x\) nhỏ hơn.`],
    ]),
    tf(2, 'chia-da-thuc-cho-don-thuc', r`Cho \(P = 12x^3y^2 - 8x^2y^3 + 4xy^2\) và \(Q = 4xy^2\).`, [
      [r`\(P\) chia hết cho \(Q\).`, true, r`Mỗi hạng tử của \(P\) đều chia hết cho \(Q\).`],
      [r`\(P : Q = 3x^2 - 2xy + 1\).`, true, 'Chia từng hạng tử.'],
      [r`Thương \(P : Q\) có 2 hạng tử.`, false, r`Có 3 hạng tử vì \(4xy^2 : 4xy^2 = 1\).`],
      [r`Tại \(x = 1\), \(y = 1\), thương \(P : Q\) bằng 2.`, true, r`\(3 - 2 + 1 = 2\).`],
    ]),
    tf(1, 'chia-da-thuc-cho-don-thuc', r`Xét quy tắc chia đa thức \(A\) cho đơn thức \(B\).`, [
      [r`Ta chia từng hạng tử của \(A\) cho \(B\) rồi cộng các kết quả.`, true, 'Đó là quy tắc chia đa thức cho đơn thức.'],
      [r`\(A\) chia hết cho \(B\) khi mọi hạng tử của \(A\) chia hết cho \(B\).`, true, 'Điều kiện chia hết của đa thức cho đơn thức.'],
      [r`Chỉ cần hạng tử bậc cao nhất của \(A\) chia hết cho \(B\).`, false, 'Mọi hạng tử đều phải chia hết.'],
      [r`\((x^2 + x) : x = x\).`, false, r`\((x^2 + x) : x = x + 1\).`],
    ]),
    tf(3, 'chia-da-thuc-cho-don-thuc', r`Cho \(A = (6x^3 - 3x^2 + 9x) : 3x\).`, [
      [r`\(A = 2x^2 - x + 3\).`, true, r`Chia từng hạng tử cho \(3x\).`],
      [r`Tại \(x = -1\) thì \(A = 6\).`, true, r`\(2 + 1 + 3 = 6\).`],
      [r`Tại \(x = 2\) thì \(A = 7\).`, false, r`\(8 - 2 + 3 = 9\).`],
      [r`Phép chia chỉ thực hiện được khi \(x \ne 0\).`, true, r`Đơn thức chia \(3x\) phải khác 0.`],
    ]),
    tf(2, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Cho \(M\cdot2x^2 = 4x^4 - 6x^3 + 2x^2\).`, [
      [r`\(M = (4x^4 - 6x^3 + 2x^2) : 2x^2\).`, true, 'Thừa số chưa biết bằng tích chia thừa số đã biết.'],
      [r`\(M = 2x^2 - 3x + 1\).`, true, 'Chia từng hạng tử.'],
      [r`\(M = 2x^2 - 3x\).`, false, r`\(2x^2 : 2x^2 = 1\), không được bỏ.`],
      [r`\(M\) có bậc 4.`, false, r`\(M\) có bậc 2.`],
    ]),
    tf(3, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Một hình hộp chữ nhật có thể tích \(12x^3 + 6x^2\) (cm³), đáy là hình vuông cạnh \(x\) (cm).`, [
      [r`Diện tích đáy là \(x^2\) (cm²).`, true, r`Hình vuông cạnh \(x\).`],
      [r`Chiều cao bằng \((12x^3 + 6x^2) : x^2\).`, true, 'Chiều cao = thể tích : diện tích đáy.'],
      [r`Chiều cao là \(12x + 6\) (cm).`, true, r`Chia từng hạng tử cho \(x^2\).`],
      [r`Khi \(x = 2\), chiều cao là 24 cm.`, false, r`\(24 + 6 = 30\) cm.`],
    ]),
    tf(2, 'chia-don-thuc-cho-don-thuc', r`Cho \(A = 20x^5y^4\).`, [
      [r`\(A : 4x^2y = 5x^3y^3\).`, true, r`\(20 : 4\); \(x^5 : x^2\); \(y^4 : y\).`],
      [r`\(A : (-5x^5y^4) = -4\).`, true, 'Phần biến giống nhau nên thương là một số.'],
      [r`\(A\) chia hết cho \(2x^6y\).`, false, r`Số mũ của \(x\) ở đơn thức chia lớn hơn nên không chia hết.`],
      [r`\(A : xy^4 = 20x^4\).`, true, r`\(x^5 : x = x^4\); \(y^4 : y^4 = 1\).`],
    ]),
    tf(3, 'chia-da-thuc-cho-don-thuc', r`Cho \(B = (x^3y^2 - 2x^2y^3) : x^2y^2\), với \(x \ne 0\), \(y \ne 0\).`, [
      [r`\(B = x - 2y\).`, true, 'Chia từng hạng tử.'],
      [r`Khi \(x = 2y\) thì \(B = 0\).`, true, r`\(2y - 2y = 0\).`],
      [r`Tại \(x = 3\), \(y = -1\) thì \(B = 1\).`, false, r`\(3 + 2 = 5\).`],
      [r`\(B\) là một đơn thức.`, false, r`\(x - 2y\) là đa thức có hai hạng tử.`],
    ]),
    tf(3, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Cho \(N : 3xy = 2x - y + 1\).`, [
      [r`\(N = 3xy(2x - y + 1)\).`, true, 'Số bị chia bằng thương nhân số chia.'],
      [r`\(N = 6x^2y - 3xy^2 + 3xy\).`, true, r`Nhân \(3xy\) với từng hạng tử.`],
      [r`\(N = 6x^2y - 3xy^2 + 1\).`, false, r`\(3xy\cdot1 = 3xy\).`],
      [r`\(N\) có bậc 3.`, true, r`\(6x^2y\) và \(3xy^2\) có bậc 3.`],
    ]),
    sa(1, 'chia-don-thuc-cho-don-thuc', r`Thực hiện phép chia \(21x^4y^5 : 7x^4y^2\).`, '3y^3', r`\(21 : 7 = 3\); \(x^4 : x^4 = 1\); \(y^5 : y^2 = y^3\).`),
    sa(2, 'chia-don-thuc-cho-don-thuc', r`Tính giá trị của \((-24x^5y^3) : (8x^3y^2)\) tại \(x = -1\), \(y = 2\).`, '-6', r`Thương là \(-3x^2y\). Tại \(x = -1\), \(y = 2\): \(-3\cdot1\cdot2 = -6\).`),
    sa(2, 'chia-da-thuc-cho-don-thuc', r`Thực hiện phép chia \((15x^3 - 10x^2 + 5x) : 5x\).`, '3x^2 - 2x + 1', r`Chia từng hạng tử cho \(5x\): \(3x^2 - 2x + 1\).`),
    sa(3, 'chia-da-thuc-cho-don-thuc', r`Tính giá trị của \((8x^4y - 4x^3y^2) : 4x^3y\) tại \(x = 5\), \(y = 3\).`, '7', r`Thương là \(2x - y\). Tại \(x = 5\), \(y = 3\): \(10 - 3 = 7\).`),
    sa(3, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Tìm đa thức \(M\) biết \(M : (-x^2) = 3x - 2\).`, '-3x^3 + 2x^2', r`\(M = (3x - 2)\cdot(-x^2) = -3x^3 + 2x^2\).`),
    es(2, 'chia-don-thuc-cho-don-thuc', r`Thực hiện các phép chia:
a) \(-27x^3y^4z : 9xy^2\); b) \(\dfrac{3}{4}x^5y^2 : \left(-\dfrac{1}{2}x^2y\right)\).`, r`a) \(-27 : 9 = -3\); \(x^3 : x = x^2\); \(y^4 : y^2 = y^2\); còn \(z\). Kết quả \(-3x^2y^2z\).
b) \(\dfrac34 : \left(-\dfrac12\right) = -\dfrac32\); \(x^5 : x^2 = x^3\); \(y^2 : y = y\). Kết quả \(-\dfrac32x^3y\).`, r`0,5 điểm: tính đúng câu a.
0,5 điểm: tính đúng câu b (chia phân số đúng dấu).`),
    es(2, 'chia-da-thuc-cho-don-thuc', r`Thực hiện phép chia:
a) \((7x^4 - 14x^3 + 21x^2) : 7x^2\); b) \((6x^3y^2 - 9x^2y^3 + 3x^2y^2) : 3x^2y^2\).`, r`a) \(x^2 - 2x + 3\).
b) \(2x - 3y + 1\).`, r`0,5 điểm: câu a, chia đúng cả ba hạng tử.
0,5 điểm: câu b, chia đúng cả ba hạng tử.`),
    es(3, 'chia-da-thuc-cho-don-thuc', r`Cho \(A = (12x^4y^2 - 18x^3y^3 + 6x^2y^2) : 6x^2y^2\). Rút gọn \(A\) rồi tính giá trị của \(A\) tại \(x = -1\), \(y = 2\).`, r`\(A = 2x^2 - 3xy + 1\).
Tại \(x = -1\), \(y = 2\): \(A = 2 - 3\cdot(-1)\cdot2 + 1 = 2 + 6 + 1 = 9\).`, r`0,5 điểm: rút gọn đúng \(A = 2x^2 - 3xy + 1\).
0,5 điểm: thay số và tính đúng \(A = 9\).`),
    es(3, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Một mảnh vườn hình chữ nhật có diện tích \(8x^3 + 12x^2y\) (m²) và chiều rộng \(4x^2\) (m).
a) Tính chiều dài mảnh vườn.
b) Tính chu vi mảnh vườn khi \(x = 1\), \(y = 2\).`, r`a) Chiều dài: \((8x^3 + 12x^2y) : 4x^2 = 2x + 3y\) (m).
b) Khi \(x = 1\), \(y = 2\): chiều dài 8 m, chiều rộng 4 m, chu vi \(2(8 + 4) = 24\) (m).`, r`0,5 điểm: tìm đúng chiều dài \(2x + 3y\).
0,5 điểm: tính đúng chu vi 24 m.`),
    es(3, 'tim-da-thuc-khi-biet-tich-hoac-thuong', r`Tìm đa thức \(M\) biết:
a) \(M\cdot5xy = 10x^2y - 15xy^2 + 5xy\); b) \(M : \dfrac{1}{2}x = 4x - 6\).`, r`a) \(M = (10x^2y - 15xy^2 + 5xy) : 5xy = 2x - 3y + 1\).
b) \(M = \dfrac12x(4x - 6) = 2x^2 - 3x\).`, r`0,5 điểm: tìm đúng \(M\) ở câu a.
0,5 điểm: tìm đúng \(M\) ở câu b.`),
  ],
};

export const BANK_CHUONG_1: BankLesson[] = [B1, B2, B3, B4, B5];
