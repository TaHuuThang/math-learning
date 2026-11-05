/** Chương I. Đa thức – nội dung bài học giai đoạn 3 (Bài 1 – Bài 5). */
import { ex, fc, r, th, type LessonContent } from './types';

const BAI_1: LessonContent = {
  slug: 'bai-1-don-thuc',
  applications: r`- Biểu thị diện tích, thể tích của các hình có kích thước là chữ: hình chữ nhật dài \(3x\), rộng \(2y\) có diện tích \(6xy\).
- Viết công thức trong Vật lí, Hóa học: quãng đường \(s = vt\), khối lượng \(m = DV\) đều là đơn thức.
- Tính tiền khi mua hàng: mua \(a\) quyển vở, mỗi quyển giá \(b\) đồng thì phải trả \(ab\) đồng.`,
  theory: [
    th('definition', 'Đơn thức', r`**Đơn thức** là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.`, undefined,
      r`\(5\); \(x\); \(-\dfrac12x^2y\); \(\dfrac{xy}{3}\) là các đơn thức. Các biểu thức \(x + 1\); \(2x - y\); \(\dfrac{1}{x}\) không phải là đơn thức.`),
    th('definition', 'Đơn thức thu gọn, hệ số và phần biến',
      r`- **Đơn thức thu gọn** là đơn thức chỉ gồm một số, hoặc có dạng tích của một số với các biến, mỗi biến chỉ xuất hiện một lần với số mũ nguyên dương.
- Trong đơn thức thu gọn, phần số gọi là **hệ số**, phần còn lại gọi là **phần biến**. Ta viết hệ số trước, phần biến sau.
- Muốn thu gọn một đơn thức, ta nhân các số với nhau và nhân các lũy thừa cùng biến với nhau.`,
      r`x^m\cdot x^n = x^{m+n}`,
      r`\(2x^2y\cdot(-3xy^3) = \left[2\cdot(-3)\right](x^2\cdot x)(y\cdot y^3) = -6x^3y^4\): hệ số \(-6\), phần biến \(x^3y^4\).`),
    th('definition', 'Bậc của đơn thức', r`**Bậc** của một đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến có trong đơn thức đó (khi đã thu gọn).`, undefined,
      r`\(-6x^3y^4\) có bậc \(3 + 4 = 7\); \(\dfrac12xyz\) có bậc \(1 + 1 + 1 = 3\).`),
    th('special', 'Trường hợp đặc biệt',
      r`- Mỗi số thực khác 0 là một đơn thức **bậc 0**; số 0 là đơn thức **không có bậc**.
- Đơn thức có hệ số \(1\) hoặc \(-1\) được viết gọn: \(1\cdot xy = xy\); \((-1)\cdot x^2y = -x^2y\).
- Biến không ghi số mũ thì có số mũ là 1.`),
    th('definition', 'Đơn thức đồng dạng', r`Hai **đơn thức đồng dạng** là hai đơn thức (đã thu gọn) có hệ số khác 0 và có **cùng phần biến**.`, undefined,
      r`\(3x^2y\) và \(-\dfrac12x^2y\) đồng dạng. Còn \(x^2y\) và \(xy^2\) không đồng dạng vì phần biến khác nhau.`),
    th('rule', 'Cộng, trừ các đơn thức đồng dạng', r`Để cộng (hay trừ) các đơn thức đồng dạng, ta cộng (hay trừ) các hệ số với nhau và **giữ nguyên phần biến**.`,
      r`a\,x^my^n \pm b\,x^my^n = (a \pm b)\,x^my^n`,
      r`\(5xy^2 - 7xy^2 = (5 - 7)xy^2 = -2xy^2\).`),
    th('rule', 'Tính giá trị của đơn thức', r`Muốn tính giá trị của đơn thức tại những giá trị cho trước của biến, ta thu gọn đơn thức (nếu cần) rồi thay các giá trị đó vào và thực hiện phép tính.`, undefined,
      r`Tại \(x = -1\), \(y = 2\): \(3x^2y = 3\cdot(-1)^2\cdot2 = 6\).`),
    th('note', 'Lưu ý', r`- Chỉ nói đến hệ số, phần biến, bậc khi đơn thức **đã thu gọn**.
- Khi thay số âm vào biến phải đặt số đó trong ngoặc: \((-2)^2 = 4\) nhưng \(-2^2 = -4\).`),
  ],
  formulas: [
    {
      group: 'Lũy thừa và thu gọn đơn thức',
      items: [
        fc('Tích hai lũy thừa cùng cơ số', r`x^m\cdot x^n = x^{m+n}`, r`- \(x\): cơ số (biến)
- \(m, n\): số mũ tự nhiên`, r`\(x^2\cdot x^3 = x^5\); \(y\cdot y^4 = y^5\).`),
        fc('Lũy thừa của một tích', r`(a\,x)^n = a^n x^n`, r`- \(a\): số
- \(x\): biến; \(n\): số mũ tự nhiên`, r`\((-2x)^2 = 4x^2\); \((3y)^3 = 27y^3\).`),
        fc('Bậc của đơn thức', r`\text{bậc}\left(a\,x^my^nz^p\right) = m + n + p`, r`- \(a\): hệ số khác 0
- \(m, n, p\): số mũ của các biến`, r`\(-4x^3y^2\) có bậc \(3 + 2 = 5\).`, r`Đơn thức đã thu gọn, hệ số \(a \ne 0\).`),
      ],
    },
    {
      group: 'Đơn thức đồng dạng',
      items: [
        fc('Cộng hai đơn thức đồng dạng', r`a\,x^my^n + b\,x^my^n = (a + b)\,x^my^n`, r`- \(a, b\): hệ số (khác 0)
- \(x^my^n\): phần biến chung`, r`\(3x^2y + 5x^2y = 8x^2y\).`, 'Hai đơn thức phải có cùng phần biến.'),
        fc('Trừ hai đơn thức đồng dạng', r`a\,x^my^n - b\,x^my^n = (a - b)\,x^my^n`, r`- \(a, b\): hệ số (khác 0)
- \(x^my^n\): phần biến chung`, r`\(2xy^3 - 7xy^3 = -5xy^3\).`, 'Hai đơn thức phải có cùng phần biến.'),
      ],
    },
  ],
  examples: {
    'nhan-dien-don-thuc': [
      ex(1, r`Trong các biểu thức sau, biểu thức nào là đơn thức?
\(-\dfrac{2}{5}x^3y\); \(x^2 - 1\); \(7\); \(\dfrac{5}{xy}\); \(2x\cdot3y^2\); \(\dfrac{x + y}{2}\).`,
        'Đề cho sáu biểu thức. Với mỗi biểu thức, cần kiểm tra nó có phải là một số, một biến hay một tích giữa các số và các biến không.',
        'Định nghĩa đơn thức.',
        [
          r`\(-\dfrac25x^3y\) là tích của số \(-\dfrac25\) với các biến \(x, y\) nên là đơn thức.`,
          r`\(x^2 - 1\) có phép trừ; \(\dfrac{x + y}{2} = \dfrac12x + \dfrac12y\) có phép cộng nên chúng không là đơn thức.`,
          r`\(7\) là một số nên là đơn thức; \(2x\cdot3y^2\) là tích của các số và các biến nên là đơn thức.`,
          r`\(\dfrac{5}{xy}\) có phép chia cho biểu thức chứa biến nên không là đơn thức.`,
        ],
        r`Các đơn thức là \(-\dfrac25x^3y\); \(7\); \(2x\cdot3y^2\).`,
        'Thấy dấu cộng, trừ giữa các phần chứa biến hoặc thấy biến nằm ở mẫu là loại ngay.'),
    ],
    'thu-gon-don-thuc': [
      ex(1, r`Thu gọn đơn thức \(A = 3x^2\cdot5xy\), rồi chỉ ra hệ số và phần biến của \(A\).`,
        'Đơn thức có hai thừa số là số và biến \(x\) xuất hiện hai lần nên chưa thu gọn.',
        r`Quy tắc \(x^m\cdot x^n = x^{m+n}\); khái niệm hệ số, phần biến.`,
        [r`Nhóm các số với nhau, các lũy thừa cùng biến với nhau: \(A = (3\cdot5)(x^2\cdot x)\,y\).`, r`Tính: \(A = 15x^3y\).`, r`Hệ số là \(15\), phần biến là \(x^3y\).`],
        r`\(A = 15x^3y\); hệ số \(15\), phần biến \(x^3y\).`),
      ex(2, r`Thu gọn đơn thức \(B = -\dfrac{2}{3}x^2y^3\cdot\left(-\dfrac{9}{4}xy\right)\cdot(-2x)^2\), rồi chỉ ra hệ số và phần biến của \(B\).`,
        r`Có lũy thừa của một tích \((-2x)^2\) cần tính trước; sau đó nhân các hệ số và các lũy thừa cùng biến.`,
        r`\((ax)^n = a^nx^n\); \(x^m\cdot x^n = x^{m+n}\); quy tắc dấu khi nhân.`,
        [
          r`Tính lũy thừa: \((-2x)^2 = 4x^2\).`,
          r`Nhân các hệ số: \(\left(-\dfrac23\right)\cdot\left(-\dfrac94\right)\cdot4 = \dfrac{3}{2}\cdot4 = 6\).`,
          r`Nhân phần biến: \(x^2\cdot x\cdot x^2 = x^5\); \(y^3\cdot y = y^4\).`,
          r`Vậy \(B = 6x^5y^4\).`,
        ],
        r`\(B = 6x^5y^4\); hệ số \(6\), phần biến \(x^5y^4\).`,
        'Đếm số thừa số âm để xác định dấu của hệ số: có hai thừa số âm nên tích dương.'),
    ],
    'tim-bac-cua-don-thuc': [
      ex(1, r`Tìm bậc của mỗi đơn thức: \(-4x^3y^2\); \(\dfrac12xyz\); \(-9\).`,
        'Các đơn thức đã thu gọn, chỉ cần cộng số mũ của các biến.',
        'Bậc của đơn thức; số khác 0 có bậc 0.',
        [r`\(-4x^3y^2\) có bậc \(3 + 2 = 5\).`, r`\(\dfrac12xyz\) có bậc \(1 + 1 + 1 = 3\).`, r`\(-9\) là số khác 0 nên có bậc \(0\).`],
        'Bậc lần lượt là 5; 3; 0.'),
      ex(2, r`Cho đơn thức \(C = 2^3x^2y\cdot\left(-\dfrac14x^3y^2z\right)\). Thu gọn và tìm bậc của \(C\).`,
        r`Đơn thức chưa thu gọn; số \(2^3\) là một phần của hệ số.`,
        'Thu gọn đơn thức; bậc của đơn thức.',
        [r`Hệ số: \(2^3\cdot\left(-\dfrac14\right) = 8\cdot\left(-\dfrac14\right) = -2\).`, r`Phần biến: \(x^2\cdot x^3 = x^5\); \(y\cdot y^2 = y^3\); \(z\). Vậy \(C = -2x^5y^3z\).`, r`Bậc của \(C\) là \(5 + 3 + 1 = 9\).`],
        r`\(C = -2x^5y^3z\), bậc 9.`,
        r`Số mũ 3 của \(2^3\) thuộc hệ số nên không cộng vào bậc.`),
    ],
    'tinh-gia-tri-cua-don-thuc': [
      ex(1, r`Tính giá trị của đơn thức \(5x^2y\) tại \(x = -1\), \(y = 2\).`,
        'Đơn thức đã thu gọn, thay trực tiếp giá trị của biến.',
        'Giá trị của biểu thức đại số.',
        [r`Thay \(x = -1\), \(y = 2\): \(5\cdot(-1)^2\cdot2\).`, r`Tính: \(5\cdot1\cdot2 = 10\).`],
        r`Giá trị của đơn thức là \(10\).`),
      ex(2, r`Tính giá trị của đơn thức \(D = -\dfrac{1}{2}xy^2\cdot4x^2y\) tại \(x = 2\), \(y = -1\).`,
        'Đơn thức chưa thu gọn; thu gọn trước để phép tính ngắn hơn.',
        'Thu gọn đơn thức; giá trị của biểu thức.',
        [r`Thu gọn: \(D = \left(-\dfrac12\cdot4\right)(x\cdot x^2)(y^2\cdot y) = -2x^3y^3\).`, r`Thay \(x = 2\), \(y = -1\): \(D = -2\cdot2^3\cdot(-1)^3 = -2\cdot8\cdot(-1)\).`, r`\(D = 16\).`],
        r`\(D = 16\).`,
        'Số âm luôn đặt trong ngoặc khi thay vào lũy thừa.'),
      ex(3, r`Một bức tường hình chữ nhật có chiều dài \(4x\) (m) và chiều cao \(\dfrac32y\) (m).
a) Viết đơn thức biểu thị diện tích \(S\) của bức tường.
b) Tính \(S\) khi \(x = 2{,}5\) và \(y = 2\).
c) Sơn mỗi mét vuông tường hết 30 000 đồng. Tính số tiền sơn bức tường đó.`,
        'Diện tích hình chữ nhật bằng chiều dài nhân chiều cao; được một đơn thức. Sau đó thay số và tính tiền.',
        'Nhân đơn thức; giá trị của đơn thức; diện tích hình chữ nhật.',
        [r`a) \(S = 4x\cdot\dfrac32y = 6xy\) (m²).`, r`b) Với \(x = 2{,}5\), \(y = 2\): \(S = 6\cdot2{,}5\cdot2 = 30\) (m²).`, r`c) Số tiền sơn: \(30\cdot30\,000 = 900\,000\) (đồng).`],
        r`\(S = 6xy\); khi \(x = 2{,}5\), \(y = 2\) thì \(S = 30\) m² và tiền sơn là 900 000 đồng.`,
        'Bài toán thực tế: viết biểu thức trước, thay số sau, luôn ghi đơn vị.'),
    ],
    'cong-tru-don-thuc-dong-dang': [
      ex(1, r`Tính \(3x^2y + 5x^2y - x^2y\).`,
        r`Ba đơn thức có cùng phần biến \(x^2y\) nên đồng dạng.`,
        'Cộng, trừ đơn thức đồng dạng.',
        [r`Cộng, trừ các hệ số: \(3 + 5 - 1 = 7\).`, r`Giữ nguyên phần biến: kết quả là \(7x^2y\).`],
        r`\(7x^2y\).`),
      ex(2, r`Thu gọn \(E = \dfrac{1}{2}xy^3 - 2xy\cdot y^2 + \dfrac{3}{4}xy^3\).`,
        r`Đơn thức \(-2xy\cdot y^2\) chưa thu gọn; thu gọn xong sẽ thấy ba đơn thức đồng dạng.`,
        'Thu gọn đơn thức; cộng, trừ đơn thức đồng dạng.',
        [r`Thu gọn: \(-2xy\cdot y^2 = -2xy^3\).`, r`\(E = \left(\dfrac12 - 2 + \dfrac34\right)xy^3\).`, r`\(\dfrac12 - 2 + \dfrac34 = \dfrac{2 - 8 + 3}{4} = -\dfrac34\). Vậy \(E = -\dfrac34xy^3\).`],
        r`\(E = -\dfrac34xy^3\).`),
      ex(3, r`Cho ba đơn thức \(A = 2x^2y\), \(B = -5x^2y\), \(C = a\,x^2y\) (\(a\) là hằng số). Tìm \(a\) để \(A + B + C = 4x^2y\). Khi đó tính giá trị của \(A + B + C\) tại \(x = -1\), \(y = 3\).`,
        r`Ba đơn thức đồng dạng nên tổng là \((2 - 5 + a)x^2y\); so sánh hệ số với \(4\).`,
        'Cộng đơn thức đồng dạng; hai đơn thức bằng nhau khi hệ số bằng nhau.',
        [r`\(A + B + C = (2 - 5 + a)x^2y = (a - 3)x^2y\).`, r`Để tổng bằng \(4x^2y\) thì \(a - 3 = 4\), suy ra \(a = 7\).`, r`Tại \(x = -1\), \(y = 3\): \(4x^2y = 4\cdot(-1)^2\cdot3 = 12\).`],
        r`\(a = 7\); giá trị của tổng là \(12\).`),
    ],
  },
  notes: {
    'nhan-dien-don-thuc': r`Hãy viết gọn biểu thức trước khi kết luận: \(\dfrac{xy}{3} = \dfrac13xy\) là đơn thức, còn \(\dfrac{x + y}{3}\) thì không.`,
    'thu-gon-don-thuc': r`Tính lũy thừa của tích, chẳng hạn \((-2x)^2 = 4x^2\), trước khi nhân; xác định dấu bằng cách đếm số thừa số âm.`,
    'tim-bac-cua-don-thuc': r`Chỉ tìm bậc sau khi thu gọn; số mũ nằm trong hệ số (như \(2^3\)) không tính vào bậc.`,
    'tinh-gia-tri-cua-don-thuc': 'Thu gọn trước rồi mới thay số; số âm luôn đặt trong ngoặc.',
    'cong-tru-don-thuc-dong-dang': 'Chỉ cộng, trừ các đơn thức đồng dạng; phần biến giữ nguyên, không cộng số mũ.',
  },
};

const BAI_2: LessonContent = {
  slug: 'bai-2-da-thuc',
  applications: r`- Biểu thị diện tích phần còn lại của một mảnh đất sau khi xây nhà, làm lối đi: \(2x^2 - y^2\).
- Biểu thị tổng số tiền khi mua nhiều loại hàng: \(8000x + 5000y\) (đồng).
- Mô tả các đại lượng thay đổi trong khoa học, kinh tế bằng biểu thức nhiều hạng tử.`,
  theory: [
    th('definition', 'Đa thức', r`**Đa thức** là một tổng của những đơn thức. Mỗi đơn thức trong tổng gọi là một **hạng tử** của đa thức đó. Mỗi đơn thức cũng được coi là một đa thức.`, undefined,
      r`\(x^2y - 3xy + 5\) là đa thức có ba hạng tử \(x^2y\); \(-3xy\); \(5\).`),
    th('definition', 'Đa thức thu gọn', r`Đa thức thu gọn là đa thức không có hai hạng tử nào đồng dạng. Muốn thu gọn một đa thức, ta nhóm các hạng tử đồng dạng rồi cộng, trừ chúng.`, undefined,
      r`\(3x^2 - 2x + x^2 + 5x = (3x^2 + x^2) + (-2x + 5x) = 4x^2 + 3x\).`),
    th('definition', 'Bậc của đa thức', r`**Bậc** của một đa thức (khác đa thức không) là bậc của hạng tử có bậc cao nhất trong **dạng thu gọn** của đa thức đó.`, undefined,
      r`\(2x^3y - 5xy + 7\) có các hạng tử bậc 4; 2; 0 nên có bậc 4.`),
    th('special', 'Trường hợp đặc biệt', r`- Số 0 cũng là một đa thức, gọi là **đa thức không**; nó không có bậc.
- Một số khác 0 là đa thức bậc 0.`),
    th('rule', 'Giá trị của đa thức', r`Muốn tính giá trị của một đa thức tại những giá trị cho trước của biến, ta thu gọn đa thức rồi thay các giá trị đó vào và tính.`, undefined,
      r`\(P = x^2 + 2x\) tại \(x = -3\): \(P = 9 - 6 = 3\).`),
    th('note', 'Lưu ý', r`Phải thu gọn trước khi tìm bậc: \(x^4 + 2xy - x^4\) thu gọn được \(2xy\), có bậc 2 chứ không phải bậc 4.`),
  ],
  formulas: [
    {
      group: 'Thu gọn và bậc của đa thức',
      items: [
        fc('Thu gọn hạng tử đồng dạng', r`a\,x^my^n + b\,x^my^n = (a + b)\,x^my^n`, r`- \(a, b\): hệ số
- \(x^my^n\): phần biến chung`, r`\(x^2y + 2x^2y = 3x^2y\).`),
        fc('Bậc của đa thức', r`\text{bậc}(P) = \text{bậc lớn nhất của các hạng tử}`, r`- \(P\): đa thức ở dạng thu gọn`, r`\(-3x^2y^2 + 2xy + y^3\) có bậc 4.`, 'Đa thức đã thu gọn và khác đa thức không.'),
      ],
    },
  ],
  examples: {
    'nhan-dien-da-thuc': [
      ex(1, r`Trong các biểu thức \(x^2 - 2xy + 1\); \(\dfrac{3}{x} + y\); \(5xy^2\); \(\dfrac{x - y}{3}\), biểu thức nào là đa thức? Chỉ ra các hạng tử của đa thức \(x^2 - 2xy + 1\).`,
        'Một biểu thức là đa thức khi viết được thành tổng của các đơn thức.',
        'Định nghĩa đa thức, hạng tử; mỗi đơn thức là một đa thức.',
        [r`\(x^2 - 2xy + 1\) là tổng của các đơn thức nên là đa thức; \(5xy^2\) là đơn thức nên cũng là đa thức.`, r`\(\dfrac{x - y}{3} = \dfrac13x - \dfrac13y\) là tổng của hai đơn thức nên là đa thức.`, r`\(\dfrac{3}{x}\) không phải đơn thức nên \(\dfrac3x + y\) không phải đa thức.`, r`Các hạng tử của \(x^2 - 2xy + 1\) là \(x^2\); \(-2xy\); \(1\).`],
        r`Các đa thức: \(x^2 - 2xy + 1\); \(5xy^2\); \(\dfrac{x - y}{3}\).`,
        'Hạng tử mang theo dấu đứng trước nó: hạng tử thứ hai là \\(-2xy\\), không phải \\(2xy\\).'),
    ],
    'thu-gon-da-thuc': [
      ex(1, r`Thu gọn đa thức \(P = 3x^2 - 2x + 5 + x^2 + 4x - 1\).`,
        'Có các nhóm hạng tử đồng dạng: chứa \\(x^2\\), chứa \\(x\\) và các số.',
        'Cộng, trừ đơn thức đồng dạng.',
        [r`Nhóm: \(P = (3x^2 + x^2) + (-2x + 4x) + (5 - 1)\).`, r`Thu gọn: \(P = 4x^2 + 2x + 4\).`],
        r`\(P = 4x^2 + 2x + 4\).`),
      ex(2, r`Thu gọn đa thức \(Q = x^2y - 3xy^2 + 2x^2y + \dfrac{1}{2}xy^2 - xy + 3\).`,
        r`Chú ý \(x^2y\) và \(xy^2\) là hai phần biến khác nhau.`,
        'Nhận biết hạng tử đồng dạng; cộng, trừ hệ số.',
        [r`Nhóm: \(Q = (x^2y + 2x^2y) + \left(-3xy^2 + \dfrac12xy^2\right) - xy + 3\).`, r`\(x^2y + 2x^2y = 3x^2y\); \(-3xy^2 + \dfrac12xy^2 = -\dfrac52xy^2\).`, r`Vậy \(Q = 3x^2y - \dfrac52xy^2 - xy + 3\).`],
        r`\(Q = 3x^2y - \dfrac52xy^2 - xy + 3\).`,
        'Gạch chân các hạng tử đồng dạng cùng một kiểu để không bỏ sót.'),
    ],
    'tim-bac-cua-da-thuc': [
      ex(1, r`Tìm bậc của đa thức \(M = 2x^3y - 5xy + 7\).`,
        'Đa thức đã thu gọn; tìm bậc của từng hạng tử.',
        'Bậc của đơn thức, bậc của đa thức.',
        [r`Bậc của các hạng tử: \(2x^3y\) có bậc 4; \(-5xy\) có bậc 2; \(7\) có bậc 0.`, 'Bậc cao nhất là 4.'],
        r`Đa thức \(M\) có bậc 4.`),
      ex(2, r`Tìm bậc của đa thức \(N = x^5 - 3x^2y^2 + 2xy - x^5 + y^3\).`,
        r`Đa thức chưa thu gọn: \(x^5\) và \(-x^5\) đồng dạng, triệt tiêu nhau.`,
        'Thu gọn đa thức; bậc của đa thức.',
        [r`Thu gọn: \(N = (x^5 - x^5) - 3x^2y^2 + 2xy + y^3 = -3x^2y^2 + 2xy + y^3\).`, r`Bậc các hạng tử: 4; 2; 3.`, r`Bậc của \(N\) là 4.`],
        r`\(N\) có bậc 4.`,
        r`Nếu không thu gọn, dễ kết luận nhầm \(N\) có bậc 5.`),
    ],
    'tinh-gia-tri-cua-da-thuc': [
      ex(2, r`Tính giá trị của đa thức \(A = x^2 + 2xy - 3x^2 + y^2 + 2x^2\) tại \(x = -3\), \(y = 2\).`,
        'Thu gọn trước: các hạng tử chứa \\(x^2\\) có thể triệt tiêu.',
        'Thu gọn đa thức; giá trị của đa thức.',
        [r`Thu gọn: \(x^2 - 3x^2 + 2x^2 = 0\) nên \(A = 2xy + y^2\).`, r`Thay \(x = -3\), \(y = 2\): \(A = 2\cdot(-3)\cdot2 + 2^2 = -12 + 4\).`, r`\(A = -8\).`],
        r`\(A = -8\).`),
      ex(3, r`Bác An có một mảnh đất hình chữ nhật dài \(2x\) (m), rộng \(x\) (m). Bác xây một ngôi nhà có nền hình vuông cạnh \(y\) (m) trên mảnh đất đó, phần còn lại để trồng rau.
a) Viết đa thức \(S\) biểu thị diện tích phần trồng rau.
b) Tính \(S\) khi \(x = 15\), \(y = 10\).`,
        'Diện tích trồng rau = diện tích mảnh đất − diện tích nền nhà.',
        'Diện tích hình chữ nhật, hình vuông; giá trị của đa thức.',
        [r`Diện tích mảnh đất: \(2x\cdot x = 2x^2\) (m²); diện tích nền nhà: \(y^2\) (m²).`, r`a) \(S = 2x^2 - y^2\) (m²).`, r`b) Với \(x = 15\), \(y = 10\): \(S = 2\cdot15^2 - 10^2 = 450 - 100 = 350\) (m²).`],
        r`\(S = 2x^2 - y^2\); khi \(x = 15\), \(y = 10\) thì \(S = 350\) m².`),
    ],
  },
  notes: {
    'nhan-dien-da-thuc': 'Mỗi đơn thức cũng là một đa thức; biểu thức có biến ở mẫu thì không phải đa thức.',
    'thu-gon-da-thuc': 'Hạng tử luôn đi kèm dấu đứng trước nó; sau khi thu gọn không còn hai hạng tử nào đồng dạng.',
    'tim-bac-cua-da-thuc': 'Luôn thu gọn trước; bậc của đa thức là bậc cao nhất của các hạng tử, không phải tổng các bậc.',
    'tinh-gia-tri-cua-da-thuc': 'Thu gọn đa thức trước khi thay số giúp phép tính ngắn và ít sai.',
  },
};

const BAI_3: LessonContent = {
  slug: 'bai-3-phep-cong-va-phep-tru-da-thuc',
  applications: r`- Tính tổng chu vi, tổng diện tích, phần chênh lệch giữa các hình có kích thước biểu thị bằng chữ.
- So sánh số tiền, sản lượng giữa hai người, hai đơn vị bằng hiệu hai đa thức.
- Kiểm tra một đại lượng có thay đổi hay không khi các yếu tố thay đổi.`,
  theory: [
    th('rule', 'Cộng hai đa thức', r`Để cộng hai đa thức, ta viết hai đa thức trong ngoặc nối với nhau bởi dấu \(+\), bỏ dấu ngoặc, nhóm các hạng tử đồng dạng rồi thu gọn.`, undefined,
      r`\((x^2 + 2x) + (3x^2 - 5x + 1) = 4x^2 - 3x + 1\).`),
    th('rule', 'Trừ hai đa thức', r`Để trừ đa thức \(A\) cho đa thức \(B\), ta viết \(A - (B)\), bỏ dấu ngoặc và **đổi dấu tất cả các hạng tử của \(B\)**, rồi thu gọn.`, undefined,
      r`\((x^2 + 2x) - (3x^2 - 5x + 1) = x^2 + 2x - 3x^2 + 5x - 1 = -2x^2 + 7x - 1\).`),
    th('rule', 'Quy tắc dấu ngoặc', r`- Bỏ dấu ngoặc có dấu \(+\) đằng trước: giữ nguyên dấu các hạng tử trong ngoặc.
- Bỏ dấu ngoặc có dấu \(-\) đằng trước: đổi dấu tất cả các hạng tử trong ngoặc.`,
      r`-(a - b + c) = -a + b - c`),
    th('property', 'Tính chất của phép cộng đa thức', r`Phép cộng đa thức có tính chất giao hoán và kết hợp: \(A + B = B + A\); \((A + B) + C = A + (B + C)\). Ngoài ra \(A - B = A + (-B)\).`),
    th('rule', 'Tìm đa thức chưa biết', r`Dùng quan hệ giữa các thành phần của phép cộng, phép trừ:
- \(M + A = B \Rightarrow M = B - A\);
- \(M - A = B \Rightarrow M = B + A\);
- \(A - M = B \Rightarrow M = A - B\).`),
    th('note', 'Lưu ý', 'Luôn đặt mỗi đa thức trong một cặp ngoặc trước khi cộng, trừ. Lỗi hay gặp nhất là chỉ đổi dấu hạng tử đầu tiên của đa thức bị trừ.'),
  ],
  formulas: [
    {
      group: 'Quy tắc dấu ngoặc',
      items: [
        fc('Bỏ ngoặc có dấu cộng', r`+(a - b + c) = a - b + c`, r`- \(a, b, c\): các hạng tử`, r`\(x + (2y - 3) = x + 2y - 3\).`),
        fc('Bỏ ngoặc có dấu trừ', r`-(a - b + c) = -a + b - c`, r`- \(a, b, c\): các hạng tử`, r`\(x - (2y - 3) = x - 2y + 3\).`),
      ],
    },
    {
      group: 'Tìm đa thức chưa biết',
      items: [
        fc('Tìm số hạng của tổng', r`M + A = B \ \Rightarrow\ M = B - A`, r`- \(M\): đa thức cần tìm
- \(A, B\): đa thức đã biết`, r`\(M + x = x^2\) thì \(M = x^2 - x\).`),
        fc('Tìm số bị trừ', r`M - A = B \ \Rightarrow\ M = B + A`, r`- \(M\): đa thức cần tìm`, r`\(M - x = 2\) thì \(M = x + 2\).`),
        fc('Tìm số trừ', r`A - M = B \ \Rightarrow\ M = A - B`, r`- \(M\): đa thức cần tìm`, r`\(x^2 - M = 1\) thì \(M = x^2 - 1\).`),
      ],
    },
  ],
  examples: {
    'cong-tru-da-thuc': [
      ex(1, r`Cho \(A = 3x^2 - 2xy + 1\) và \(B = x^2 + 5xy - 4\). Tính \(A + B\).`,
        'Cộng hai đa thức: bỏ ngoặc, nhóm hạng tử đồng dạng.',
        'Quy tắc cộng đa thức.',
        [r`\(A + B = (3x^2 - 2xy + 1) + (x^2 + 5xy - 4)\).`, r`\(= (3x^2 + x^2) + (-2xy + 5xy) + (1 - 4)\).`, r`\(= 4x^2 + 3xy - 3\).`],
        r`\(A + B = 4x^2 + 3xy - 3\).`),
      ex(2, r`Cho \(P = 2x^2y - 3xy + y^2\) và \(Q = -x^2y + xy - 2y^2 + 1\). Tính \(P - Q\).`,
        r`Phép trừ: khi bỏ ngoặc của \(Q\) phải đổi dấu cả bốn hạng tử.`,
        'Quy tắc trừ đa thức, quy tắc dấu ngoặc.',
        [r`\(P - Q = (2x^2y - 3xy + y^2) - (-x^2y + xy - 2y^2 + 1)\).`, r`Bỏ ngoặc: \(= 2x^2y - 3xy + y^2 + x^2y - xy + 2y^2 - 1\).`, r`Thu gọn: \(= 3x^2y - 4xy + 3y^2 - 1\).`],
        r`\(P - Q = 3x^2y - 4xy + 3y^2 - 1\).`,
        r`Kiểm tra nhanh: \(Q + (P - Q)\) phải bằng \(P\).`),
    ],
    'bai-toan-thuc-te-cong-tru-da-thuc': [
      ex(2, r`Một tam giác có độ dài ba cạnh là \(2x + 1\); \(3x - 2\); \(x + 4\) (cm). Viết đa thức biểu thị chu vi tam giác rồi tính chu vi khi \(x = 2\).`,
        'Chu vi tam giác là tổng độ dài ba cạnh.',
        'Cộng đa thức; giá trị của đa thức.',
        [r`Chu vi: \(C = (2x + 1) + (3x - 2) + (x + 4)\).`, r`\(C = (2x + 3x + x) + (1 - 2 + 4) = 6x + 3\) (cm).`, r`Khi \(x = 2\): \(C = 6\cdot2 + 3 = 15\) (cm).`],
        r`\(C = 6x + 3\) (cm); khi \(x = 2\) thì \(C = 15\) cm.`),
      ex(3, r`Mỗi quyển vở giá 8 000 đồng, mỗi chiếc bút giá 5 000 đồng. Bạn Minh mua \(x\) quyển vở và \(y\) chiếc bút. Bạn Lan mua nhiều hơn Minh 2 quyển vở nhưng ít hơn 1 chiếc bút.
a) Viết đa thức biểu thị số tiền mỗi bạn phải trả.
b) Chứng tỏ Lan luôn trả nhiều hơn Minh một số tiền không đổi.`,
        r`Lan mua \(x + 2\) quyển vở và \(y - 1\) chiếc bút. So sánh bằng hiệu hai đa thức.`,
        'Lập đa thức từ tình huống; trừ đa thức.',
        [r`Minh trả: \(M = 8000x + 5000y\) (đồng).`, r`Lan trả: \(L = 8000(x + 2) + 5000(y - 1) = 8000x + 5000y + 11\,000\) (đồng).`, r`\(L - M = (8000x + 5000y + 11\,000) - (8000x + 5000y) = 11\,000\).`],
        r`Lan luôn trả nhiều hơn Minh 11 000 đồng, dù \(x, y\) bằng bao nhiêu.`,
        'Hiệu không còn chứa biến nghĩa là chênh lệch không phụ thuộc số lượng mua.'),
    ],
    'tim-da-thuc-chua-biet': [
      ex(2, r`Tìm đa thức \(M\), biết \(M + (x^2 - 2xy) = 3x^2 + xy - 1\).`,
        r`\(M\) là một số hạng của tổng; số hạng = tổng − số hạng kia.`,
        r`\(M + A = B \Rightarrow M = B - A\).`,
        [r`\(M = (3x^2 + xy - 1) - (x^2 - 2xy)\).`, r`\(M = 3x^2 + xy - 1 - x^2 + 2xy\).`, r`\(M = 2x^2 + 3xy - 1\).`],
        r`\(M = 2x^2 + 3xy - 1\).`),
      ex(3, r`Tìm đa thức \(N\), biết \((5x^2y - 2xy^2 + 3) - N = 2x^2y + xy^2 - 4\). Tính giá trị của \(N\) tại \(x = 1\), \(y = -1\).`,
        r`\(N\) là số trừ: số trừ = số bị trừ − hiệu.`,
        r`\(A - M = B \Rightarrow M = A - B\); giá trị của đa thức.`,
        [r`\(N = (5x^2y - 2xy^2 + 3) - (2x^2y + xy^2 - 4)\).`, r`\(N = 5x^2y - 2xy^2 + 3 - 2x^2y - xy^2 + 4 = 3x^2y - 3xy^2 + 7\).`, r`Tại \(x = 1\), \(y = -1\): \(N = 3\cdot1\cdot(-1) - 3\cdot1\cdot1 + 7 = -3 - 3 + 7 = 1\).`],
        r`\(N = 3x^2y - 3xy^2 + 7\); giá trị của \(N\) là \(1\).`,
        'Xác định đúng vai trò của đa thức cần tìm (số hạng, số bị trừ hay số trừ) trước khi tính.'),
    ],
  },
  notes: {
    'cong-tru-da-thuc': 'Đặt từng đa thức trong ngoặc; khi trừ, đổi dấu tất cả hạng tử của đa thức bị trừ rồi mới thu gọn.',
    'bai-toan-thuc-te-cong-tru-da-thuc': 'Đặt ẩn rõ ràng, ghi đơn vị; một hiệu không còn chứa biến cho biết đại lượng không phụ thuộc vào biến.',
    'tim-da-thuc-chua-biet': 'Xác định vai trò của đa thức cần tìm trong phép tính rồi dùng quan hệ thành phần; thử lại bằng cách thay vào đề.',
  },
};

const BAI_4: LessonContent = {
  slug: 'bai-4-phep-nhan-da-thuc',
  applications: r`- Tính diện tích hình chữ nhật, thể tích hình hộp khi các kích thước là đa thức: \((2x + 3)(x - 1)\).
- Tính doanh thu = giá bán × số lượng khi cả hai cùng thay đổi.
- Chứng minh tính chất chia hết của số nguyên, chứng minh đẳng thức.`,
  theory: [
    th('rule', 'Nhân hai đơn thức', r`Muốn nhân hai đơn thức, ta nhân các hệ số với nhau và nhân các phần biến với nhau.`, r`(a\,x^m)\cdot(b\,x^n) = ab\,x^{m+n}`,
      r`\(3x^2y\cdot(-2xy^3) = -6x^3y^4\).`),
    th('rule', 'Nhân đơn thức với đa thức', r`Muốn nhân một đơn thức với một đa thức, ta nhân đơn thức với từng hạng tử của đa thức rồi cộng các tích với nhau.`, r`A(B + C) = AB + AC`,
      r`\(2x(x^2 - 3x + 1) = 2x^3 - 6x^2 + 2x\).`),
    th('rule', 'Nhân đa thức với đa thức', r`Muốn nhân một đa thức với một đa thức, ta nhân **mỗi hạng tử** của đa thức này với **từng hạng tử** của đa thức kia rồi cộng các tích với nhau, sau đó thu gọn.`,
      r`(A + B)(C + D) = AC + AD + BC + BD`,
      r`\((x + 2)(x - 3) = x^2 - 3x + 2x - 6 = x^2 - x - 6\).`),
    th('property', 'Tính chất của phép nhân đa thức', r`Phép nhân đa thức có tính chất giao hoán, kết hợp và phân phối đối với phép cộng: \(AB = BA\); \((AB)C = A(BC)\); \(A(B + C) = AB + AC\).`),
    th('rule', 'Chứng minh biểu thức không phụ thuộc vào biến', r`Thực hiện các phép nhân, bỏ ngoặc và thu gọn. Nếu kết quả là một hằng số thì giá trị của biểu thức không phụ thuộc vào giá trị của biến.`),
    th('note', 'Lưu ý', r`- Quy tắc dấu: \((+)(+) = (+)\); \((-)(-) = (+)\); \((+)(-) = (-)\).
- Đa thức có \(m\) hạng tử nhân với đa thức có \(n\) hạng tử cho \(m\cdot n\) tích trước khi thu gọn – đếm để không sót.`),
  ],
  formulas: [
    {
      group: 'Nhân đơn thức',
      items: [
        fc('Nhân hai đơn thức', r`(a\,x^my^p)\cdot(b\,x^ny^q) = ab\,x^{m+n}y^{p+q}`, r`- \(a, b\): hệ số
- \(m, n, p, q\): số mũ`, r`\(2x^2y\cdot3xy^2 = 6x^3y^3\).`),
        fc('Nhân đơn thức với đa thức', r`A(B + C - D) = AB + AC - AD`, r`- \(A\): đơn thức
- \(B, C, D\): các hạng tử của đa thức`, r`\(3x(x - 2) = 3x^2 - 6x\).`),
      ],
    },
    {
      group: 'Nhân đa thức với đa thức',
      items: [
        fc('Nhân hai nhị thức', r`(A + B)(C + D) = AC + AD + BC + BD`, r`- \(A, B, C, D\): các hạng tử (đơn thức)`, r`\((x + 1)(x + 2) = x^2 + 3x + 2\).`),
        fc('Nhân nhị thức với tam thức', r`(A + B)(C + D + E) = AC + AD + AE + BC + BD + BE`, r`- \(A, \dots, E\): các hạng tử`, r`\((x - 2)(x^2 + 3x - 1) = x^3 + x^2 - 7x + 2\).`),
      ],
    },
  ],
  examples: {
    'nhan-hai-don-thuc': [
      ex(1, r`Tính \(3x^2y\cdot4xy^3\).`,
        'Nhân hệ số với hệ số, phần biến với phần biến.',
        r`Quy tắc nhân hai đơn thức; \(x^m\cdot x^n = x^{m+n}\).`,
        [r`Hệ số: \(3\cdot4 = 12\).`, r`Phần biến: \(x^2\cdot x = x^3\); \(y\cdot y^3 = y^4\).`, r`Kết quả: \(12x^3y^4\).`],
        r`\(12x^3y^4\).`),
      ex(2, r`Tính \(\left(-\dfrac{2}{3}x^3y\right)\cdot\left(\dfrac{9}{4}xy^2z\right)\cdot(-2y)\) rồi tìm bậc của kết quả.`,
        'Nhân ba đơn thức; chú ý dấu và phân số.',
        'Quy tắc nhân đơn thức; bậc của đơn thức.',
        [r`Hệ số: \(\left(-\dfrac23\right)\cdot\dfrac94\cdot(-2) = \left(-\dfrac32\right)\cdot(-2) = 3\).`, r`Phần biến: \(x^3\cdot x = x^4\); \(y\cdot y^2\cdot y = y^4\); \(z\).`, r`Kết quả \(3x^4y^4z\) có bậc \(4 + 4 + 1 = 9\).`],
        r`\(3x^4y^4z\), bậc 9.`),
    ],
    'nhan-don-thuc-voi-da-thuc': [
      ex(1, r`Tính \(2x(3x^2 - 5x + 1)\).`,
        'Nhân đơn thức \\(2x\\) với từng hạng tử của đa thức.',
        r`\(A(B + C + D) = AB + AC + AD\).`,
        [r`\(2x(3x^2 - 5x + 1) = 2x\cdot3x^2 + 2x\cdot(-5x) + 2x\cdot1\).`, r`\(= 6x^3 - 10x^2 + 2x\).`],
        r`\(6x^3 - 10x^2 + 2x\).`),
      ex(2, r`Tính \(-\dfrac{1}{2}xy\left(4x^2 - 2xy + 6y^2\right)\).`,
        'Đơn thức có hệ số âm: mỗi tích đổi dấu so với hạng tử ban đầu.',
        'Nhân đơn thức với đa thức; quy tắc dấu.',
        [r`\(-\dfrac12xy\cdot4x^2 = -2x^3y\).`, r`\(-\dfrac12xy\cdot(-2xy) = x^2y^2\).`, r`\(-\dfrac12xy\cdot6y^2 = -3xy^3\).`, r`Cộng lại: \(-2x^3y + x^2y^2 - 3xy^3\).`],
        r`\(-2x^3y + x^2y^2 - 3xy^3\).`),
      ex(3, r`Tìm \(x\), biết \(3x(2x - 1) - 6x(x + 2) = 30\).`,
        r`Nhân phá ngoặc ở vế trái; các hạng tử \(x^2\) sẽ triệt tiêu, còn lại dạng \(ax = b\).`,
        'Nhân đơn thức với đa thức; thu gọn; tìm \\(x\\) từ \\(ax = b\\).',
        [r`\(3x(2x - 1) = 6x^2 - 3x\); \(6x(x + 2) = 6x^2 + 12x\).`, r`Vế trái: \(6x^2 - 3x - 6x^2 - 12x = -15x\).`, r`\(-15x = 30\) nên \(x = -2\).`],
        r`\(x = -2\).`,
        r`Thử lại: \(3\cdot(-2)\cdot(-5) - 6\cdot(-2)\cdot0 = 30\). Đúng.`),
    ],
    'nhan-da-thuc-voi-da-thuc': [
      ex(2, r`Tính \((x - 2)(x^2 + 3x - 1)\).`,
        'Nhị thức nhân tam thức: có \\(2\\cdot3 = 6\\) tích trước khi thu gọn.',
        'Quy tắc nhân đa thức với đa thức.',
        [r`\(x(x^2 + 3x - 1) = x^3 + 3x^2 - x\).`, r`\(-2(x^2 + 3x - 1) = -2x^2 - 6x + 2\).`, r`Cộng và thu gọn: \(x^3 + (3x^2 - 2x^2) + (-x - 6x) + 2 = x^3 + x^2 - 7x + 2\).`],
        r`\(x^3 + x^2 - 7x + 2\).`),
      ex(3, r`Một mảnh vườn hình chữ nhật có chiều dài \(2x + 3\) (m) và chiều rộng \(x - 1\) (m) (\(x > 1\)). Viết đa thức biểu thị diện tích mảnh vườn rồi tính diện tích khi \(x = 5\).`,
        'Diện tích = dài × rộng, là tích hai đa thức.',
        'Nhân đa thức; giá trị của đa thức.',
        [r`\(S = (2x + 3)(x - 1) = 2x^2 - 2x + 3x - 3 = 2x^2 + x - 3\) (m²).`, r`Khi \(x = 5\): \(S = 2\cdot25 + 5 - 3 = 52\) (m²).`, r`Kiểm tra: chiều dài \(13\) m, chiều rộng \(4\) m, \(13\cdot4 = 52\). Đúng.`],
        r`\(S = 2x^2 + x - 3\) (m²); khi \(x = 5\) thì \(S = 52\) m².`),
    ],
    'bieu-thuc-khong-phu-thuoc-bien': [
      ex(3, r`Chứng minh giá trị của biểu thức \(A = x(2x + 1) - x^2(x + 2) + x^3 - x + 3\) không phụ thuộc vào giá trị của \(x\).`,
        'Thực hiện phép nhân, thu gọn; nếu được hằng số thì biểu thức không phụ thuộc vào biến.',
        'Nhân đơn thức với đa thức; thu gọn đa thức.',
        [r`\(x(2x + 1) = 2x^2 + x\); \(x^2(x + 2) = x^3 + 2x^2\).`, r`\(A = 2x^2 + x - x^3 - 2x^2 + x^3 - x + 3\).`, r`Thu gọn: \(A = 3\).`],
        r`\(A = 3\) với mọi \(x\), nên giá trị của \(A\) không phụ thuộc vào \(x\).`),
      ex(4, r`Chứng minh giá trị của biểu thức \(B = (x - 1)(x^2 + x + 1) - (x + 2)(x^2 - 2x + 4)\) không phụ thuộc vào \(x\).`,
        'Hai tích nhị thức nhân tam thức; khai triển cẩn thận từng tích rồi trừ.',
        'Nhân đa thức với đa thức; trừ đa thức.',
        [r`\((x - 1)(x^2 + x + 1) = x^3 + x^2 + x - x^2 - x - 1 = x^3 - 1\).`, r`\((x + 2)(x^2 - 2x + 4) = x^3 - 2x^2 + 4x + 2x^2 - 4x + 8 = x^3 + 8\).`, r`\(B = (x^3 - 1) - (x^3 + 8) = -9\).`],
        r`\(B = -9\) với mọi \(x\).`,
        'Ở Chương II, hai tích này chính là hằng đẳng thức hiệu và tổng hai lập phương, giúp tính nhanh hơn.'),
    ],
    'chung-minh-dang-thuc-phep-nhan': [
      ex(3, r`Chứng minh đẳng thức \((x + 3)(x - 2) = x(x + 1) - 6\).`,
        'Biến đổi từng vế về cùng một đa thức thu gọn.',
        'Nhân đa thức; thu gọn.',
        [r`Vế trái: \((x + 3)(x - 2) = x^2 - 2x + 3x - 6 = x^2 + x - 6\).`, r`Vế phải: \(x(x + 1) - 6 = x^2 + x - 6\).`, 'Hai vế bằng nhau.'],
        'Đẳng thức được chứng minh.'),
      ex(4, r`Chứng minh rằng với mọi số nguyên \(n\), biểu thức \(n(n + 5) - (n - 3)(n + 2)\) luôn chia hết cho 6.`,
        r`Rút gọn biểu thức; nếu được dạng \(6\cdot k\) với \(k\) nguyên thì chia hết cho 6.`,
        'Nhân đa thức; tính chất chia hết.',
        [r`\(n(n + 5) = n^2 + 5n\); \((n - 3)(n + 2) = n^2 + 2n - 3n - 6 = n^2 - n - 6\).`, r`Hiệu: \(n^2 + 5n - (n^2 - n - 6) = 6n + 6 = 6(n + 1)\).`, r`Vì \(n\) nguyên nên \(n + 1\) nguyên, do đó \(6(n + 1)\) chia hết cho 6.`],
        r`Biểu thức bằng \(6(n + 1)\) nên chia hết cho 6 với mọi số nguyên \(n\).`,
        'Bài chia hết: rút gọn rồi đưa về dạng tích có thừa số cần chứng minh.'),
    ],
  },
  notes: {
    'nhan-hai-don-thuc': 'Xác định dấu trước (đếm số thừa số âm), rồi nhân phần số, cuối cùng cộng số mũ của từng biến.',
    'nhan-don-thuc-voi-da-thuc': 'Nhân với từng hạng tử kể cả dấu; đơn thức có hệ số âm làm đổi dấu mọi hạng tử.',
    'nhan-da-thuc-voi-da-thuc': 'Đếm số tích cần có (m·n) trước khi thu gọn; viết các hạng tử theo lũy thừa giảm dần để dễ cộng.',
    'bieu-thuc-khong-phu-thuoc-bien': 'Mục tiêu là thu gọn được một hằng số; nếu còn sót biến hãy kiểm tra lại dấu khi bỏ ngoặc.',
    'chung-minh-dang-thuc-phep-nhan': 'Có thể biến đổi vế phức tạp về vế đơn giản, hoặc biến đổi cả hai vế về cùng một biểu thức.',
  },
};

const BAI_5: LessonContent = {
  slug: 'bai-5-phep-chia-da-thuc-cho-don-thuc',
  applications: r`- Tìm một kích thước của hình chữ nhật, hình hộp khi biết diện tích, thể tích và các kích thước còn lại.
- Chia đều một đại lượng (tiền, sản phẩm) biểu thị bằng đa thức cho một số người, một số ngày.
- Đơn giản hóa biểu thức trước khi tính giá trị.`,
  theory: [
    th('condition', 'Điều kiện để đơn thức chia hết cho đơn thức', r`Đơn thức \(A\) chia hết cho đơn thức \(B\) (\(B \ne 0\)) khi mỗi biến của \(B\) đều là biến của \(A\) với số mũ **không lớn hơn** số mũ của nó trong \(A\).`, undefined,
      r`\(6x^3y^2\) chia hết cho \(2xy^2\); nhưng \(6x^3y^2\) không chia hết cho \(xz\) (vì \(A\) không chứa \(z\)).`),
    th('rule', 'Chia đơn thức cho đơn thức', r`Muốn chia đơn thức \(A\) cho đơn thức \(B\) (trường hợp \(A\) chia hết cho \(B\)): chia hệ số của \(A\) cho hệ số của \(B\); chia lũy thừa của từng biến trong \(A\) cho lũy thừa của cùng biến đó trong \(B\); nhân các kết quả với nhau.`,
      r`x^m : x^n = x^{m-n}\ (x \ne 0,\ m \ge n)`,
      r`\(12x^4y^3 : 3x^2y = 4x^2y^2\).`),
    th('condition', 'Điều kiện để đa thức chia hết cho đơn thức', r`Đa thức \(A\) chia hết cho đơn thức \(B\) khi **mỗi hạng tử** của \(A\) đều chia hết cho \(B\).`),
    th('rule', 'Chia đa thức cho đơn thức', r`Muốn chia đa thức \(A\) cho đơn thức \(B\) (trường hợp chia hết), ta chia mỗi hạng tử của \(A\) cho \(B\) rồi cộng các kết quả với nhau.`,
      r`(A + B - C) : D = A : D + B : D - C : D`,
      r`\((6x^3 - 9x^2 + 3x) : 3x = 2x^2 - 3x + 1\).`),
    th('special', 'Trường hợp đặc biệt', r`- \(x^n : x^n = 1\) với \(x \ne 0\) (quy ước \(x^0 = 1\)).
- Hạng tử bằng đúng đơn thức chia thì thương là \(1\), không phải \(0\).`),
    th('rule', 'Tìm đa thức khi biết tích hoặc thương', r`- \(A\cdot M = B \Rightarrow M = B : A\);
- \(M : A = B \Rightarrow M = A\cdot B\).`),
  ],
  formulas: [
    {
      group: 'Chia đơn thức',
      items: [
        fc('Chia hai lũy thừa cùng cơ số', r`x^m : x^n = x^{m-n}`, r`- \(x\): biến khác 0
- \(m, n\): số tự nhiên, \(m \ge n\)`, r`\(x^5 : x^2 = x^3\).`, r`\(x \ne 0\), \(m \ge n\).`),
        fc('Chia đơn thức cho đơn thức', r`(a\,x^my^p) : (b\,x^ny^q) = \dfrac{a}{b}\,x^{m-n}y^{p-q}`, r`- \(a, b\): hệ số, \(b \ne 0\)
- \(m \ge n\), \(p \ge q\)`, r`\(10x^3y^2 : 5xy = 2x^2y\).`, 'Đơn thức bị chia phải chia hết cho đơn thức chia.'),
      ],
    },
    {
      group: 'Chia đa thức cho đơn thức',
      items: [
        fc('Chia từng hạng tử', r`(A + B - C) : D = A : D + B : D - C : D`, r`- \(A, B, C\): các hạng tử của đa thức
- \(D\): đơn thức khác 0`, r`\((4x^2 - 2x) : 2x = 2x - 1\).`, 'Mỗi hạng tử đều chia hết cho \\(D\\).'),
        fc('Tìm đa thức khi biết tích hoặc thương', r`A\cdot M = B \Rightarrow M = B : A;\quad M : A = B \Rightarrow M = A\cdot B`, r`- \(M\): đa thức cần tìm`, r`\(2x\cdot M = 4x^2 + 2x\) thì \(M = 2x + 1\).`),
      ],
    },
  ],
  examples: {
    'chia-don-thuc-cho-don-thuc': [
      ex(1, r`Tính \(12x^4y^3 : 3x^2y\).`,
        'Chia hệ số cho hệ số, chia lũy thừa từng biến.',
        r`\(x^m : x^n = x^{m-n}\).`,
        [r`Hệ số: \(12 : 3 = 4\).`, r`Phần biến: \(x^4 : x^2 = x^2\); \(y^3 : y = y^2\).`, r`Kết quả: \(4x^2y^2\).`],
        r`\(4x^2y^2\).`),
      ex(2, r`Thực hiện phép chia \(\left(-\dfrac{3}{4}x^5y^4z\right) : \left(\dfrac{1}{2}x^2y^4\right)\), rồi tính giá trị của thương tại \(x = -2\), \(z = 3\).`,
        r`Lũy thừa \(y^4 : y^4 = 1\) nên thương không còn \(y\).`,
        'Chia đơn thức cho đơn thức; giá trị của đơn thức.',
        [r`Hệ số: \(-\dfrac34 : \dfrac12 = -\dfrac34\cdot2 = -\dfrac32\).`, r`Phần biến: \(x^5 : x^2 = x^3\); \(y^4 : y^4 = 1\); giữ \(z\). Thương là \(-\dfrac32x^3z\).`, r`Tại \(x = -2\), \(z = 3\): \(-\dfrac32\cdot(-2)^3\cdot3 = -\dfrac32\cdot(-8)\cdot3 = 36\).`],
        r`Thương là \(-\dfrac32x^3z\); giá trị bằng \(36\).`),
    ],
    'chia-da-thuc-cho-don-thuc': [
      ex(1, r`Tính \((6x^3 - 9x^2 + 3x) : 3x\).`,
        'Chia từng hạng tử cho \\(3x\\).',
        'Quy tắc chia đa thức cho đơn thức.',
        [r`\(6x^3 : 3x = 2x^2\); \(-9x^2 : 3x = -3x\); \(3x : 3x = 1\).`, r`Kết quả: \(2x^2 - 3x + 1\).`],
        r`\(2x^2 - 3x + 1\).`,
        r`Hạng tử \(3x : 3x = 1\), không phải 0.`),
      ex(2, r`Tính \(\left(15x^3y^2 - 6x^2y^3 + 3x^2y^2\right) : \left(-3x^2y^2\right)\).`,
        'Đơn thức chia có hệ số âm: mọi thương đổi dấu.',
        'Chia đa thức cho đơn thức; quy tắc dấu.',
        [r`\(15x^3y^2 : (-3x^2y^2) = -5x\).`, r`\(-6x^2y^3 : (-3x^2y^2) = 2y\).`, r`\(3x^2y^2 : (-3x^2y^2) = -1\).`, r`Kết quả: \(-5x + 2y - 1\).`],
        r`\(-5x + 2y - 1\).`),
      ex(3, r`Một hình chữ nhật có diện tích \(6x^2y + 4xy^2\) (cm²) và chiều rộng \(2xy\) (cm). Tìm đa thức biểu thị chiều dài, rồi tính chiều dài khi \(x = 2\), \(y = 1\).`,
        'Chiều dài = diện tích : chiều rộng.',
        'Chia đa thức cho đơn thức; giá trị của đa thức.',
        [r`Chiều dài: \((6x^2y + 4xy^2) : 2xy = 3x + 2y\) (cm).`, r`Khi \(x = 2\), \(y = 1\): chiều dài \(= 3\cdot2 + 2\cdot1 = 8\) (cm).`, r`Kiểm tra: chiều rộng \(2\cdot2\cdot1 = 4\) cm; diện tích \(6\cdot4\cdot1 + 4\cdot2\cdot1 = 32\) cm² \(= 8\cdot4\). Đúng.`],
        r`Chiều dài là \(3x + 2y\) (cm); khi \(x = 2\), \(y = 1\) thì bằng 8 cm.`),
    ],
    'tim-da-thuc-khi-biet-tich-hoac-thuong': [
      ex(2, r`Tìm đa thức \(M\), biết \(M\cdot2xy = 6x^3y^2 - 4x^2y^3 + 2xy\).`,
        r`\(M\) là một thừa số của tích: thừa số = tích : thừa số kia.`,
        r`\(A\cdot M = B \Rightarrow M = B : A\).`,
        [r`\(M = (6x^3y^2 - 4x^2y^3 + 2xy) : 2xy\).`, r`\(M = 3x^2y - 2xy^2 + 1\).`],
        r`\(M = 3x^2y - 2xy^2 + 1\).`),
      ex(3, r`Tìm đa thức \(P\), biết \(P : \left(-\dfrac{1}{3}x^2\right) = 6x - 9y + 3\). Đa thức \(P\) có bậc bao nhiêu?`,
        r`\(P\) là số bị chia: số bị chia = thương × số chia.`,
        r`\(M : A = B \Rightarrow M = A\cdot B\); nhân đơn thức với đa thức.`,
        [r`\(P = \left(-\dfrac13x^2\right)(6x - 9y + 3)\).`, r`\(P = -2x^3 + 3x^2y - x^2\).`, r`Các hạng tử có bậc 3; 3; 2 nên \(P\) có bậc 3.`],
        r`\(P = -2x^3 + 3x^2y - x^2\), bậc 3.`),
    ],
  },
  notes: {
    'chia-don-thuc-cho-don-thuc': 'Kiểm tra điều kiện chia hết trước; biến có mặt ở đơn thức chia mà không có ở đơn thức bị chia thì phép chia không thực hiện được.',
    'chia-da-thuc-cho-don-thuc': 'Chia lần lượt từng hạng tử, giữ đúng dấu; hạng tử bằng đơn thức chia thì thương bằng 1.',
    'tim-da-thuc-khi-biet-tich-hoac-thuong': 'Thừa số chưa biết = tích : thừa số đã biết; số bị chia = thương × số chia. Thử lại bằng phép tính ngược.',
  },
};

export const CHUONG_1: LessonContent[] = [BAI_1, BAI_2, BAI_3, BAI_4, BAI_5];
