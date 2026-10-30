import { es, mcq, r, sa, tf, type MapChapter } from './types';

/** Chương I. Đa thức – Bài 1 đến Bài 5. */
export const CHUONG_1: MapChapter = {
  code: 'I',
  objectives: `- Nhận biết đơn thức, đa thức nhiều biến; xác định hệ số, phần biến, bậc.
- Thu gọn, cộng, trừ, nhân đa thức; chia đa thức cho đơn thức (trường hợp chia hết).
- Tính giá trị của đa thức; vận dụng các phép tính để chứng minh đẳng thức và giải bài toán thực tế.`,
  keyPoints: `- Đơn thức thu gọn, hệ số, phần biến, bậc; đơn thức đồng dạng.
- Đa thức thu gọn và bậc của đa thức.
- Quy tắc cộng, trừ, nhân đa thức; chia đơn thức, đa thức cho đơn thức.`,
  formulas: r`\[x^m\cdot x^n = x^{m+n};\qquad x^m : x^n = x^{m-n}\ (m \ge n)\]
\[A(B + C) = AB + AC\]
\[(A + B)(C + D) = AC + AD + BC + BD\]`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 1 (VietJack, Hoatieu) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-1a', objectives: 'Củng cố Bài 1 – Bài 3: đơn thức, đa thức, cộng và trừ đa thức; rèn kĩ năng thu gọn, tìm bậc và tính giá trị.' },
    { slug: 'luyen-tap-chung-1b', objectives: 'Củng cố Bài 4 – Bài 5: nhân đa thức, chia đa thức cho đơn thức; chứng minh biểu thức không phụ thuộc vào biến.' },
    { slug: 'bai-tap-cuoi-chuong-1', objectives: 'Ôn tập toàn Chương I: hệ thống kiến thức về đơn thức, đa thức và các phép tính; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 1 ----------------
    {
      slug: 'bai-1-don-thuc',
      difficulty: 1,
      objectives: `- Nhận biết đơn thức, đơn thức thu gọn; chỉ ra hệ số, phần biến và bậc của đơn thức.
- Nhận biết đơn thức đồng dạng; cộng, trừ các đơn thức đồng dạng.
- Tính giá trị của đơn thức khi biết giá trị của các biến.`,
      prerequisites: r`- Biểu thức đại số, giá trị của biểu thức (Toán 7).
- Lũy thừa với số mũ tự nhiên: \(x^m\cdot x^n = x^{m+n}\).`,
      concepts: 'Đơn thức; đơn thức thu gọn; hệ số; phần biến; bậc của đơn thức; đơn thức đồng dạng.',
      formulas: r`\(a\,x^my^n + b\,x^my^n = (a + b)\,x^my^n\); \(a\,x^my^n - b\,x^my^n = (a - b)\,x^my^n\)`,
      properties: `- Mỗi số thực khác 0 là một đơn thức bậc 0; số 0 là đơn thức không có bậc.
- Hai đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và có cùng phần biến.`,
      themes: [
        {
          title: 'Đơn thức và đơn thức thu gọn',
          description: 'Khái niệm đơn thức, đơn thức thu gọn, hệ số, phần biến, bậc và giá trị của đơn thức.',
          types: [
            {
              slug: 'nhan-dien-don-thuc',
              title: 'Nhận diện đơn thức',
              levels: [1],
              knowledge: 'Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.',
              signs: 'Đề cho nhiều biểu thức, yêu cầu chỉ ra biểu thức nào là (hoặc không là) đơn thức.',
              method: 'Kiểm tra xem biểu thức có phải là một số, một biến hay một tích giữa các số và các biến hay không.',
              steps: `- **Bước 1.** Xét lần lượt từng biểu thức.
- **Bước 2.** Biểu thức có phép cộng, phép trừ giữa các hạng tử chứa biến, hoặc có phép chia cho biến, thì không phải đơn thức.
- **Bước 3.** Kết luận.`,
              mistakes: r`- Cho rằng \(\dfrac{x}{3}\) không phải đơn thức. Thực ra \(\dfrac{x}{3} = \dfrac{1}{3}x\) là đơn thức.
- Cho rằng một số (như \(5\) hay \(-\dfrac{1}{2}\)) không phải đơn thức.
- Nhầm \(\dfrac{3}{x}\) là đơn thức (biến nằm ở mẫu).`,
              example: r`Trong các biểu thức \(3x^2y\); \(x + y\); \(-\dfrac{1}{2}\); \(\dfrac{2}{x}\); \(\dfrac{xy}{3}\); \(4(x - 1)\), biểu thức nào là đơn thức?`,
              solution: r`Các đơn thức: \(3x^2y\); \(-\dfrac{1}{2}\); \(\dfrac{xy}{3} = \dfrac{1}{3}xy\).
Không phải đơn thức: \(x + y\) và \(4(x - 1) = 4x - 4\) (có phép cộng, trừ); \(\dfrac{2}{x}\) (có phép chia cho biến).`,
              exercises: [
                mcq(1, r`Biểu thức nào sau đây **không** là đơn thức?`, [r`\(-5x^3\)`, r`\(\dfrac{x^2y}{4}\)`, r`\(7\)`, r`\(2x + y\)`], 'D', r`\(2x + y\) là tổng của hai đơn thức nên không phải đơn thức. Các biểu thức còn lại là một số hoặc tích của số với các biến.`),
                tf(1, 'Xét các biểu thức sau. Mỗi khẳng định đúng hay sai?', [
                  [r`\(\dfrac{1}{3}x^2y^3\) là đơn thức.`, true],
                  [r`\(x - 2y\) là đơn thức.`, false],
                  [r`Số \(0\) là đơn thức.`, true],
                  [r`\(\dfrac{3}{y}\) là đơn thức.`, false],
                ], r`a) Đúng: tích của số \(\dfrac13\) với các biến. b) Sai: có phép trừ. c) Đúng: mỗi số là một đơn thức. d) Sai: có phép chia cho biến.`),
              ],
            },
            {
              slug: 'thu-gon-don-thuc',
              title: 'Thu gọn đơn thức, xác định hệ số và phần biến',
              levels: [1, 2],
              knowledge: r`Đơn thức thu gọn chỉ gồm một số, hoặc tích của một số với các biến, mỗi biến xuất hiện một lần với số mũ nguyên dương. Quy tắc \(x^m\cdot x^n = x^{m+n}\).`,
              signs: 'Đơn thức có một biến xuất hiện nhiều lần hoặc có nhiều thừa số là số.',
              method: 'Nhân các thừa số là số với nhau, nhân các lũy thừa cùng biến với nhau.',
              steps: r`- **Bước 1.** Nhóm các thừa số là số với nhau, các lũy thừa cùng biến với nhau.
- **Bước 2.** Tính tích các số (được hệ số); với mỗi biến dùng \(x^m\cdot x^n = x^{m+n}\).
- **Bước 3.** Viết hệ số trước, phần biến sau; chỉ ra hệ số và phần biến.`,
              mistakes: r`- Nhân số mũ thay vì cộng: \(x^2\cdot x^3 = x^6\) là sai, đúng là \(x^5\).
- Quên dấu âm của hệ số.
- Tính sai lũy thừa của tích: \((-2x)^2 = 4x^2\), không phải \(-4x^2\).`,
              example: r`Thu gọn đơn thức \(A = -2x^2y\cdot\dfrac{3}{4}xy^3\) rồi chỉ ra hệ số và phần biến.`,
              solution: r`\(A = \left(-2\cdot\dfrac{3}{4}\right)\left(x^2\cdot x\right)\left(y\cdot y^3\right) = -\dfrac{3}{2}x^3y^4\).
Hệ số là \(-\dfrac{3}{2}\), phần biến là \(x^3y^4\).`,
              exercises: [
                sa(1, r`Thu gọn đơn thức \(3x\cdot(-2)xy^2\). Hệ số của đơn thức thu gọn bằng bao nhiêu?`, ['-6'], r`\(3x\cdot(-2)xy^2 = \left[3\cdot(-2)\right](x\cdot x)y^2 = -6x^2y^2\). Hệ số là \(-6\).`),
                mcq(2, r`Thu gọn đơn thức \(\left(-\dfrac{1}{2}x^2y\right)\cdot 4xy^2z\cdot x\) ta được`, [r`\(-2x^4y^3z\)`, r`\(2x^4y^3z\)`, r`\(-2x^3y^3z\)`, r`\(-\dfrac{1}{2}x^4y^3z\)`], 'A', r`Hệ số: \(-\dfrac12\cdot4 = -2\). Phần biến: \(x^{2+1+1}y^{1+2}z = x^4y^3z\). Vậy kết quả là \(-2x^4y^3z\).`),
              ],
            },
            {
              slug: 'tim-bac-cua-don-thuc',
              title: 'Tìm bậc của đơn thức',
              levels: [1, 2],
              knowledge: 'Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến trong đơn thức đó (sau khi thu gọn).',
              signs: 'Đề hỏi bậc của một đơn thức (đã hoặc chưa thu gọn).',
              method: 'Thu gọn đơn thức rồi cộng số mũ của tất cả các biến.',
              steps: `- **Bước 1.** Thu gọn đơn thức (nếu chưa thu gọn).
- **Bước 2.** Cộng số mũ của tất cả các biến; biến không ghi số mũ có số mũ 1.
- **Bước 3.** Kết luận bậc của đơn thức.`,
              mistakes: r`- Cộng cả số mũ của hệ số: \(2^3x^2\) có bậc 2, không phải 5.
- Bỏ sót biến có số mũ 1.
- Quên rằng số khác 0 có bậc 0, còn số 0 không có bậc.`,
              example: r`Tìm bậc của đơn thức \(B = 5x^2y\cdot(-xy^2z)\).`,
              solution: r`Thu gọn: \(B = -5x^3y^3z\). Bậc của \(B\) là \(3 + 3 + 1 = 7\).`,
              exercises: [
                sa(1, r`Bậc của đơn thức \(-\dfrac{2}{3}x^4y^2z\) là bao nhiêu?`, ['7'], r`Tổng số mũ các biến: \(4 + 2 + 1 = 7\).`),
                mcq(2, r`Đơn thức \(2^3x^2y\cdot 3xy^2\) có bậc là`, ['6', '9', '5', '3'], 'A', r`Thu gọn: \(2^3x^2y\cdot3xy^2 = 24x^3y^3\). Bậc là \(3 + 3 = 6\). Số mũ 3 của cơ số 2 thuộc hệ số nên không tính.`),
              ],
            },
            {
              slug: 'tinh-gia-tri-cua-don-thuc',
              title: 'Tính giá trị của đơn thức',
              levels: [1, 2, 3],
              knowledge: 'Giá trị của biểu thức đại số tại các giá trị cho trước của biến; thu gọn đơn thức.',
              signs: 'Đề cho giá trị cụ thể của các biến, yêu cầu tính giá trị của đơn thức (hoặc đại lượng thực tế được biểu diễn bằng đơn thức).',
              method: 'Thu gọn đơn thức (nếu cần), thay giá trị của các biến vào rồi tính.',
              steps: `- **Bước 1.** Thu gọn đơn thức.
- **Bước 2.** Thay giá trị của các biến; số âm đặt trong ngoặc.
- **Bước 3.** Tính lũy thừa trước, nhân sau.`,
              mistakes: r`- Không đặt số âm trong ngoặc: \(-2^2 = -4\) nhưng \((-2)^2 = 4\).
- Thay số khi chưa thu gọn làm phép tính dài, dễ sai.`,
              example: r`Tính giá trị của đơn thức \(C = -3x^2y\) tại \(x = -2\), \(y = \dfrac{1}{3}\).`,
              solution: r`\(C = -3\cdot(-2)^2\cdot\dfrac{1}{3} = -3\cdot4\cdot\dfrac13 = -4\).`,
              exercises: [
                sa(2, r`Tính giá trị của đơn thức \(2xy^2\cdot(-x)\) tại \(x = 1\), \(y = -3\).`, ['-18'], r`Thu gọn: \(2xy^2\cdot(-x) = -2x^2y^2\). Tại \(x = 1\), \(y = -3\): \(-2\cdot1^2\cdot(-3)^2 = -2\cdot9 = -18\).`),
                sa(3, r`Một bể cá dạng hình hộp chữ nhật có chiều dài \(2x\) (dm), chiều rộng \(x\) (dm), chiều cao \(3y\) (dm). Thể tích của bể là đơn thức \(V = 6x^2y\) (dm³). Tính \(V\) khi \(x = 5\), \(y = 2\).`, ['300'], r`\(V = 2x\cdot x\cdot3y = 6x^2y\). Với \(x = 5\), \(y = 2\): \(V = 6\cdot25\cdot2 = 300\) (dm³).`, 'dm³'),
              ],
            },
          ],
        },
        {
          title: 'Đơn thức đồng dạng',
          description: 'Nhận biết đơn thức đồng dạng; cộng, trừ các đơn thức đồng dạng.',
          types: [
            {
              slug: 'cong-tru-don-thuc-dong-dang',
              title: 'Cộng, trừ các đơn thức đồng dạng',
              levels: [1, 2, 3],
              knowledge: 'Hai đơn thức đồng dạng có hệ số khác 0 và cùng phần biến. Muốn cộng (trừ) các đơn thức đồng dạng, ta cộng (trừ) các hệ số và giữ nguyên phần biến.',
              signs: 'Tổng hoặc hiệu của các đơn thức có cùng phần biến (sau khi thu gọn).',
              method: 'Thu gọn từng đơn thức, nhận ra các đơn thức đồng dạng rồi cộng, trừ hệ số.',
              steps: `- **Bước 1.** Thu gọn từng đơn thức.
- **Bước 2.** Nhận biết các đơn thức đồng dạng (cùng phần biến).
- **Bước 3.** Cộng, trừ các hệ số và giữ nguyên phần biến.`,
              mistakes: r`- Coi \(x^2y\) và \(xy^2\) là đồng dạng (phần biến khác nhau).
- Cộng cả số mũ: \(2x^2 + 3x^2 = 5x^4\) là sai, đúng là \(5x^2\).`,
              example: r`Tính \(4x^2y - \dfrac{1}{2}x^2y + x\cdot(-3xy)\).`,
              solution: r`Ta có \(x\cdot(-3xy) = -3x^2y\). Ba đơn thức đồng dạng nên
\[4x^2y - \dfrac12x^2y - 3x^2y = \left(4 - \dfrac12 - 3\right)x^2y = \dfrac12x^2y.\]`,
              exercises: [
                mcq(1, r`Đơn thức nào đồng dạng với đơn thức \(-3xy^2\)?`, [r`\(-3x^2y\)`, r`\(\dfrac{1}{2}xy^2\)`, r`\(3xy\)`, r`\(xy^2z\)`], 'B', r`\(\dfrac12xy^2\) có hệ số khác 0 và cùng phần biến \(xy^2\) với \(-3xy^2\).`),
                sa(2, r`Thu gọn \(5xy^3 - 2xy^3 + \dfrac{1}{2}xy\cdot 4y^2\) được đơn thức \(a\,xy^3\). Tìm \(a\).`, ['5'], r`\(\dfrac12xy\cdot4y^2 = 2xy^3\). Do đó tổng bằng \((5 - 2 + 2)xy^3 = 5xy^3\), suy ra \(a = 5\).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 2 ----------------
    {
      slug: 'bai-2-da-thuc',
      difficulty: 1,
      objectives: `- Nhận biết đa thức, hạng tử của đa thức, đa thức thu gọn.
- Thu gọn đa thức và tìm bậc của đa thức.
- Tính giá trị của đa thức khi biết giá trị của các biến.`,
      prerequisites: '- Đơn thức, đơn thức đồng dạng, cộng trừ đơn thức đồng dạng (Bài 1).\n- Đa thức một biến (Toán 7).',
      concepts: 'Đa thức; hạng tử; đa thức thu gọn; bậc của đa thức.',
      properties: `- Mỗi đơn thức cũng được coi là một đa thức.
- Đa thức thu gọn là đa thức không có hai hạng tử nào đồng dạng.
- Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó.`,
      themes: [
        {
          title: 'Đa thức và đa thức thu gọn',
          description: 'Nhận diện đa thức, hạng tử; thu gọn đa thức; bậc của đa thức.',
          types: [
            {
              slug: 'nhan-dien-da-thuc',
              title: 'Nhận diện đa thức',
              levels: [1],
              knowledge: 'Đa thức là tổng của những đơn thức; mỗi đơn thức trong tổng gọi là một hạng tử của đa thức.',
              signs: 'Đề yêu cầu chỉ ra biểu thức nào là đa thức, hoặc chỉ ra các hạng tử của đa thức.',
              method: 'Viết biểu thức thành tổng các đơn thức; nếu viết được thì đó là đa thức.',
              steps: r`- **Bước 1.** Coi phép trừ là cộng với số đối: \(x - 2y = x + (-2y)\).
- **Bước 2.** Kiểm tra mỗi hạng tử có phải đơn thức không (không có biến ở mẫu).
- **Bước 3.** Kết luận, chỉ ra các hạng tử kèm dấu.`,
              mistakes: r`- Quên dấu của hạng tử: các hạng tử của \(x^2 - 3y\) là \(x^2\) và \(-3y\).
- Cho rằng một đơn thức không phải là đa thức.`,
              example: r`Biểu thức \(P = 3x^2y - \dfrac{1}{2}xy + 5\) có phải là đa thức không? Chỉ ra các hạng tử của \(P\).`,
              solution: r`\(P\) là tổng của ba đơn thức nên \(P\) là đa thức. Các hạng tử: \(3x^2y\); \(-\dfrac{1}{2}xy\); \(5\).`,
              exercises: [
                mcq(1, 'Biểu thức nào sau đây **không** phải là đa thức?', [r`\(x^2 - 2xy + 1\)`, r`\(5xy\)`, r`\(\dfrac{x + 1}{y}\)`, r`\(\dfrac{1}{2}x - y^3\)`], 'C', r`\(\dfrac{x + 1}{y}\) có biến ở mẫu nên không viết được thành tổng các đơn thức.`),
                tf(1, r`Cho đa thức \(Q = 2x^3 - xy + 4y - 7\). Mỗi khẳng định sau đúng hay sai?`, [
                  [r`\(Q\) có 4 hạng tử.`, true],
                  [r`Hạng tử thứ hai của \(Q\) là \(xy\).`, false],
                  [r`\(-7\) là một hạng tử của \(Q\).`, true],
                  [r`Mỗi hạng tử của \(Q\) là một đơn thức.`, true],
                ], r`\(Q = 2x^3 + (-xy) + 4y + (-7)\): có 4 hạng tử, hạng tử thứ hai là \(-xy\) (mang dấu âm), \(-7\) là một hạng tử, mỗi hạng tử đều là đơn thức.`),
              ],
            },
            {
              slug: 'thu-gon-da-thuc',
              title: 'Thu gọn đa thức',
              levels: [1, 2],
              knowledge: 'Đơn thức đồng dạng; cộng, trừ đơn thức đồng dạng.',
              signs: 'Đa thức có các hạng tử đồng dạng hoặc hạng tử chưa thu gọn.',
              method: 'Thu gọn từng hạng tử, nhóm các hạng tử đồng dạng rồi cộng, trừ chúng.',
              steps: `- **Bước 1.** Thu gọn từng hạng tử (nếu cần).
- **Bước 2.** Nhóm các hạng tử đồng dạng, giữ nguyên dấu đứng trước mỗi hạng tử.
- **Bước 3.** Cộng, trừ các hạng tử đồng dạng; viết đa thức kết quả.`,
              mistakes: '- Đổi sai dấu khi nhóm các hạng tử.\n- Bỏ sót hạng tử không có hạng tử đồng dạng với nó.',
              example: r`Thu gọn đa thức \(M = x^2y + 3xy - 2x^2y + 5 - xy\).`,
              solution: r`\(M = (x^2y - 2x^2y) + (3xy - xy) + 5 = -x^2y + 2xy + 5\).`,
              exercises: [
                sa(1, r`Thu gọn đa thức \(4x^2 - 3xy + x^2 + 5xy - 2\). Hệ số của hạng tử \(xy\) trong đa thức thu gọn là bao nhiêu?`, ['2'], r`\(4x^2 - 3xy + x^2 + 5xy - 2 = 5x^2 + 2xy - 2\). Hệ số của \(xy\) là \(2\).`),
                mcq(2, r`Thu gọn đa thức \(N = 2x^3y - x^2 + \dfrac{1}{2}x^3y + 3x^2 - x^3y\) ta được`, [r`\(\dfrac{3}{2}x^3y + 2x^2\)`, r`\(\dfrac{5}{2}x^3y + 2x^2\)`, r`\(\dfrac{3}{2}x^3y - 2x^2\)`, r`\(\dfrac{3}{2}x^3y + 4x^2\)`], 'A', r`\(N = \left(2 + \dfrac12 - 1\right)x^3y + (-1 + 3)x^2 = \dfrac32x^3y + 2x^2\).`),
              ],
            },
            {
              slug: 'tim-bac-cua-da-thuc',
              title: 'Tìm bậc của đa thức',
              levels: [1, 2],
              knowledge: 'Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn.',
              signs: 'Đề hỏi bậc của đa thức (thường cho đa thức chưa thu gọn).',
              method: 'Thu gọn đa thức, tìm bậc của từng hạng tử rồi chọn bậc lớn nhất.',
              steps: `- **Bước 1.** Thu gọn đa thức.
- **Bước 2.** Tìm bậc của từng hạng tử.
- **Bước 3.** Bậc lớn nhất là bậc của đa thức.`,
              mistakes: '- Tìm bậc khi chưa thu gọn: hạng tử bậc cao có thể bị triệt tiêu.\n- Lấy tổng bậc của các hạng tử.',
              example: r`Tìm bậc của đa thức \(P = x^4y - 2xy^2 + 3 - x^4y + x^2y^2\).`,
              solution: r`Thu gọn: \(P = -2xy^2 + x^2y^2 + 3\) (hai hạng tử \(x^4y\) và \(-x^4y\) triệt tiêu).
Bậc các hạng tử lần lượt là 3; 4; 0. Vậy \(P\) có bậc 4 (không phải bậc 5).`,
              exercises: [
                sa(1, r`Bậc của đa thức \(3x^2y^3 - xy + 7x^4\) là bao nhiêu?`, ['5'], r`Bậc các hạng tử: \(3x^2y^3\) bậc 5; \(-xy\) bậc 2; \(7x^4\) bậc 4. Bậc của đa thức là 5.`),
                sa(2, r`Tìm bậc của đa thức \(2x^3y^2 - x + 4 - 2x^3y^2 + x^2y\).`, ['3'], r`Thu gọn: \(-x + 4 + x^2y\). Bậc các hạng tử: 1; 0; 3. Bậc của đa thức là 3.`),
              ],
            },
          ],
        },
        {
          title: 'Giá trị của đa thức',
          description: 'Tính giá trị của đa thức tại các giá trị cho trước của biến, kể cả trong bài toán thực tế.',
          types: [
            {
              slug: 'tinh-gia-tri-cua-da-thuc',
              title: 'Tính giá trị của đa thức',
              levels: [2, 3],
              knowledge: 'Thu gọn đa thức; thay giá trị của biến và thực hiện phép tính.',
              signs: 'Đề cho giá trị của các biến (hoặc đại lượng thực tế biểu diễn bằng đa thức) và yêu cầu tính giá trị.',
              method: 'Thu gọn đa thức trước, sau đó thay giá trị của các biến vào đa thức thu gọn.',
              steps: `- **Bước 1.** Thu gọn đa thức.
- **Bước 2.** Thay giá trị của các biến (số âm đặt trong ngoặc).
- **Bước 3.** Tính và kết luận (kèm đơn vị nếu là bài toán thực tế).`,
              mistakes: '- Thay số khi chưa thu gọn khiến phép tính dài, dễ sai.\n- Sai dấu khi lũy thừa số âm.',
              example: r`Tính giá trị của đa thức \(A = x^2y - 2xy + 3x^2y + xy\) tại \(x = -1\), \(y = 2\).`,
              solution: r`Thu gọn: \(A = 4x^2y - xy\). Tại \(x = -1\), \(y = 2\): \(A = 4\cdot1\cdot2 - (-1)\cdot2 = 8 + 2 = 10\).`,
              exercises: [
                sa(2, r`Tính giá trị của đa thức \(x^2 + 2xy - 3x^2 + y^2\) tại \(x = 2\), \(y = -1\).`, ['-11'], r`Thu gọn: \(-2x^2 + 2xy + y^2\). Tại \(x = 2\), \(y = -1\): \(-8 + 2\cdot2\cdot(-1) + 1 = -8 - 4 + 1 = -11\).`),
                sa(3, r`Một mảnh vườn hình chữ nhật có chiều dài \(x\) (m), chiều rộng \(y\) (m). Người ta làm một lối đi rộng 1 m chạy dọc hết chiều dài mảnh vườn. Diện tích phần còn lại là \(S = xy - x\) (m²). Tính \(S\) khi \(x = 20\), \(y = 8\).`, ['140'], r`\(S = 20\cdot8 - 20 = 160 - 20 = 140\) (m²).`, 'm²'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 3 ----------------
    {
      slug: 'bai-3-phep-cong-va-phep-tru-da-thuc',
      difficulty: 1,
      objectives: `- Thực hiện phép cộng, phép trừ hai đa thức.
- Vận dụng tìm đa thức chưa biết và biểu diễn đại lượng thực tế.`,
      prerequisites: '- Thu gọn đa thức (Bài 2).\n- Quy tắc dấu ngoặc.',
      concepts: 'Tổng của hai đa thức; hiệu của hai đa thức.',
      properties: `- Phép cộng đa thức có tính chất giao hoán và kết hợp.
- Bỏ dấu ngoặc có dấu "−" đứng trước thì phải đổi dấu tất cả các hạng tử trong ngoặc.`,
      themes: [
        {
          title: 'Cộng, trừ hai đa thức',
          description: 'Quy tắc cộng, trừ đa thức và vận dụng vào bài toán thực tế.',
          types: [
            {
              slug: 'cong-tru-da-thuc',
              title: 'Thực hiện cộng, trừ đa thức',
              levels: [1, 2],
              knowledge: 'Quy tắc dấu ngoặc; cộng, trừ các hạng tử đồng dạng.',
              signs: r`Đề yêu cầu tính \(A + B\), \(A - B\) với \(A\), \(B\) là các đa thức.`,
              method: 'Viết tổng (hiệu) với mỗi đa thức trong ngoặc, bỏ ngoặc, nhóm các hạng tử đồng dạng rồi thu gọn.',
              steps: `- **Bước 1.** Viết hai đa thức trong ngoặc, nối bởi dấu "+" hoặc "−".
- **Bước 2.** Bỏ ngoặc (đổi dấu các hạng tử nếu trước ngoặc là dấu "−").
- **Bước 3.** Nhóm các hạng tử đồng dạng và thu gọn.`,
              mistakes: '- Khi trừ, chỉ đổi dấu hạng tử đầu tiên của đa thức bị trừ mà quên đổi dấu các hạng tử còn lại.',
              example: r`Cho \(A = 3x^2 - 2xy + y^2\) và \(B = x^2 + xy - 4y^2\). Tính \(A - B\).`,
              solution: r`\(A - B = (3x^2 - 2xy + y^2) - (x^2 + xy - 4y^2) = 3x^2 - 2xy + y^2 - x^2 - xy + 4y^2 = 2x^2 - 3xy + 5y^2\).`,
              exercises: [
                mcq(1, r`Cho \(A = x^2 + 2xy\) và \(B = 3x^2 - xy\). Tổng \(A + B\) bằng`, [r`\(4x^2 + xy\)`, r`\(4x^2 + 3xy\)`, r`\(-2x^2 + 3xy\)`, r`\(4x^2 - xy\)`], 'A', r`\(A + B = (x^2 + 3x^2) + (2xy - xy) = 4x^2 + xy\).`),
                sa(2, r`Cho \(M = 2x^2y - 3xy + 1\) và \(N = x^2y + xy - 4\). Thu gọn \(M - N\). Hệ số của hạng tử \(xy\) là bao nhiêu?`, ['-4'], r`\(M - N = 2x^2y - 3xy + 1 - x^2y - xy + 4 = x^2y - 4xy + 5\). Hệ số của \(xy\) là \(-4\).`),
              ],
            },
            {
              slug: 'bai-toan-thuc-te-cong-tru-da-thuc',
              title: 'Biểu diễn đại lượng thực tế bằng tổng, hiệu đa thức',
              levels: [2, 3],
              knowledge: 'Biểu diễn đại lượng bằng biểu thức đại số; cộng, trừ đa thức.',
              signs: 'Các kích thước, số lượng được cho bằng biểu thức chứa biến; đề yêu cầu viết đa thức biểu thị chu vi, tổng hay phần chênh lệch.',
              method: 'Lập biểu thức là tổng (hiệu) của các đa thức theo nội dung bài toán rồi thu gọn.',
              steps: `- **Bước 1.** Xác định đại lượng cần tìm là tổng hay hiệu của những đại lượng nào.
- **Bước 2.** Viết biểu thức, thu gọn đa thức.
- **Bước 3.** Thay giá trị của biến (nếu có) và ghi đơn vị.`,
              mistakes: '- Quên nhân 2 khi tính chu vi hình chữ nhật.\n- Thiếu đơn vị hoặc nhầm đơn vị.',
              example: r`Một tam giác có độ dài ba cạnh là \(2x + y\), \(x + 3y\) và \(3x - y\) (cm). Viết đa thức biểu thị chu vi tam giác và tính chu vi khi \(x = 2\), \(y = 1\).`,
              solution: r`Chu vi: \((2x + y) + (x + 3y) + (3x - y) = 6x + 3y\) (cm). Khi \(x = 2\), \(y = 1\): chu vi bằng \(12 + 3 = 15\) (cm).`,
              exercises: [
                sa(2, r`Một hình chữ nhật có chiều dài \(3x + 2\) (m) và chiều rộng \(x + 1\) (m). Chu vi hình chữ nhật là đa thức \(ax + b\). Tính \(a + b\).`, ['14'], r`Chu vi: \(2\left[(3x + 2) + (x + 1)\right] = 2(4x + 3) = 8x + 6\). Vậy \(a + b = 8 + 6 = 14\).`),
                sa(3, r`Bạn An có \(5x + 20\) nghìn đồng. An mua vở hết \(2x + 7\) nghìn đồng và mua bút hết \(x + 3\) nghìn đồng. Tính số tiền An còn lại khi \(x = 10\).`, ['30'], r`Số tiền còn lại: \((5x + 20) - (2x + 7) - (x + 3) = 2x + 10\) (nghìn đồng). Khi \(x = 10\): \(2\cdot10 + 10 = 30\) nghìn đồng.`, 'nghìn đồng'),
              ],
            },
          ],
        },
        {
          title: 'Đa thức chưa biết',
          description: 'Tìm đa thức thỏa mãn một đẳng thức cộng, trừ cho trước.',
          types: [
            {
              slug: 'tim-da-thuc-chua-biet',
              title: 'Tìm đa thức chưa biết',
              levels: [2, 3],
              knowledge: r`Quan hệ giữa các thành phần của phép cộng, phép trừ: \(P + Q = R \Rightarrow P = R - Q\); \(P - Q = R \Rightarrow P = R + Q\); \(Q - P = R \Rightarrow P = Q - R\).`,
              signs: r`Đẳng thức có chứa đa thức chưa biết (thường kí hiệu \(P\), \(Q\), \(C\)…) trong phép cộng hoặc phép trừ.`,
              method: 'Biểu diễn đa thức chưa biết qua tổng hoặc hiệu của các đa thức đã biết rồi thu gọn.',
              steps: `- **Bước 1.** Xác định đa thức chưa biết đóng vai trò số hạng, số bị trừ hay số trừ.
- **Bước 2.** Viết đa thức chưa biết bằng tổng hoặc hiệu tương ứng.
- **Bước 3.** Bỏ ngoặc, thu gọn.`,
              mistakes: r`- Nhầm vai trò số bị trừ và số trừ: từ \(Q - P = R\) suy ra \(P = Q - R\), không phải \(P = Q + R\).`,
              example: r`Tìm đa thức \(P\), biết \(P + (x^2 - 2xy) = 3x^2 + xy - 1\).`,
              solution: r`\(P = (3x^2 + xy - 1) - (x^2 - 2xy) = 3x^2 + xy - 1 - x^2 + 2xy = 2x^2 + 3xy - 1\).`,
              exercises: [
                sa(2, r`Tìm đa thức \(P\), biết \(P - (2x^2 - y^2) = x^2 + 3y^2\). Đa thức \(P\) có dạng \(ax^2 + by^2\). Tính \(a + b\).`, ['5'], r`\(P = (x^2 + 3y^2) + (2x^2 - y^2) = 3x^2 + 2y^2\). Vậy \(a + b = 3 + 2 = 5\).`),
                mcq(3, r`Cho \(A = x^2 - 2y + xy + 1\) và \(B = x^2 + y - x^2y^2 - 1\). Đa thức \(C\) thỏa mãn \(A - C = B\) là`, [r`\(x^2y^2 + xy - 3y + 2\)`, r`\(-x^2y^2 + xy - 3y + 2\)`, r`\(x^2y^2 + xy - y\)`, r`\(2x^2 - y + xy - x^2y^2\)`], 'A', r`Từ \(A - C = B\) suy ra \(C = A - B = x^2 - 2y + xy + 1 - x^2 - y + x^2y^2 + 1 = x^2y^2 + xy - 3y + 2\).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 4 ----------------
    {
      slug: 'bai-4-phep-nhan-da-thuc',
      difficulty: 2,
      objectives: `- Thực hiện nhân hai đơn thức, nhân đơn thức với đa thức, nhân hai đa thức.
- Vận dụng phép nhân đa thức để rút gọn, chứng minh đẳng thức, chứng minh biểu thức không phụ thuộc vào biến.`,
      prerequisites: r`- Đơn thức thu gọn, đa thức thu gọn (Bài 1, 2).
- Tính chất phân phối \(a(b + c) = ab + ac\); quy tắc \(x^m\cdot x^n = x^{m+n}\).`,
      concepts: 'Tích của hai đơn thức; tích của đơn thức với đa thức; tích của hai đa thức.',
      formulas: r`\[A(B + C) = AB + AC\]
\[(A + B)(C + D) = AC + AD + BC + BD\]`,
      properties: '- Phép nhân đa thức có tính chất giao hoán, kết hợp và phân phối đối với phép cộng.',
      themes: [
        {
          title: 'Nhân đơn thức',
          description: 'Nhân hai đơn thức; nhân đơn thức với đa thức.',
          types: [
            {
              slug: 'nhan-hai-don-thuc',
              title: 'Nhân hai đơn thức',
              levels: [1, 2],
              knowledge: r`Nhân hệ số với hệ số, nhân phần biến với phần biến; \(x^m\cdot x^n = x^{m+n}\); \((ab)^n = a^nb^n\).`,
              signs: 'Tích của hai hay nhiều đơn thức (có thể có lũy thừa của đơn thức).',
              method: 'Nhân các hệ số với nhau và nhân các lũy thừa cùng biến với nhau.',
              steps: `- **Bước 1.** Tính lũy thừa của đơn thức (nếu có).
- **Bước 2.** Nhân các hệ số.
- **Bước 3.** Nhân các phần biến, cộng số mũ của cùng một biến.`,
              mistakes: r`- \((2xy)^2 = 2x^2y^2\) là sai, đúng là \(4x^2y^2\).
- Quên dấu âm khi nhân hệ số âm.`,
              example: r`Tính \((-2x^2y)\cdot(3xy^3)\).`,
              solution: r`\((-2x^2y)\cdot(3xy^3) = (-2\cdot3)\left(x^2\cdot x\right)\left(y\cdot y^3\right) = -6x^3y^4\).`,
              exercises: [
                sa(1, r`Tích \(\left(-\dfrac{1}{3}x^2y\right)\cdot(6xy^2)\) là một đơn thức có hệ số bằng bao nhiêu?`, ['-2'], r`\(\left(-\dfrac13\cdot6\right)x^3y^3 = -2x^3y^3\). Hệ số là \(-2\).`),
                mcq(2, r`Kết quả của phép nhân \((2xy)^2\cdot(-3x)\) là`, [r`\(-12x^3y^2\)`, r`\(-6x^3y^2\)`, r`\(12x^3y^2\)`, r`\(-12x^2y^2\)`], 'A', r`\((2xy)^2 = 4x^2y^2\). Do đó \(4x^2y^2\cdot(-3x) = -12x^3y^2\).`),
              ],
            },
            {
              slug: 'nhan-don-thuc-voi-da-thuc',
              title: 'Nhân đơn thức với đa thức',
              levels: [1, 2, 3],
              knowledge: r`Muốn nhân một đơn thức với một đa thức, ta nhân đơn thức với từng hạng tử của đa thức rồi cộng các tích: \(A(B + C) = AB + AC\).`,
              signs: 'Một đơn thức nhân với một đa thức (thường ở dạng đơn thức đứng trước ngoặc).',
              method: 'Nhân đơn thức với từng hạng tử của đa thức, chú ý dấu, rồi thu gọn.',
              steps: `- **Bước 1.** Nhân đơn thức với từng hạng tử trong ngoặc (kể cả dấu).
- **Bước 2.** Cộng các tích lại.
- **Bước 3.** Thu gọn nếu có hạng tử đồng dạng.`,
              mistakes: '- Quên nhân với hạng tử cuối cùng hoặc hạng tử là số.\n- Sai dấu khi đơn thức có hệ số âm.',
              example: r`Tính \(2x(3x^2 - xy + 4)\).`,
              solution: r`\(2x(3x^2 - xy + 4) = 2x\cdot3x^2 - 2x\cdot xy + 2x\cdot4 = 6x^3 - 2x^2y + 8x\).`,
              exercises: [
                mcq(1, r`Kết quả của phép nhân \(-3x(x^2 - 2y)\) là`, [r`\(-3x^3 + 6xy\)`, r`\(-3x^3 - 6xy\)`, r`\(3x^3 - 6xy\)`, r`\(-3x^2 + 6xy\)`], 'A', r`\(-3x\cdot x^2 + (-3x)\cdot(-2y) = -3x^3 + 6xy\).`),
                sa(2, r`Thu gọn biểu thức \(x(2x - 3) - 2x(x + 1)\) được đơn thức \(ax\). Tìm \(a\).`, ['-5'], r`\(2x^2 - 3x - 2x^2 - 2x = -5x\). Vậy \(a = -5\).`),
              ],
            },
          ],
        },
        {
          title: 'Nhân đa thức với đa thức',
          description: 'Quy tắc nhân hai đa thức.',
          types: [
            {
              slug: 'nhan-da-thuc-voi-da-thuc',
              title: 'Nhân đa thức với đa thức',
              levels: [2, 3],
              knowledge: 'Muốn nhân một đa thức với một đa thức, ta nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng các tích với nhau.',
              signs: 'Tích của hai đa thức trong ngoặc, mỗi đa thức có từ hai hạng tử trở lên.',
              method: 'Nhân từng hạng tử của đa thức thứ nhất với cả đa thức thứ hai, sau đó thu gọn.',
              steps: `- **Bước 1.** Nhân hạng tử thứ nhất của đa thức thứ nhất với từng hạng tử của đa thức thứ hai; làm tương tự với các hạng tử còn lại.
- **Bước 2.** Cộng tất cả các tích.
- **Bước 3.** Nhóm và thu gọn các hạng tử đồng dạng.`,
              mistakes: '- Bỏ sót tích (số tích phải bằng số hạng tử của đa thức thứ nhất nhân với số hạng tử của đa thức thứ hai).\n- Sai dấu khi nhân hai hạng tử âm.',
              example: r`Tính \((x - 2)(x^2 + 3x - 1)\).`,
              solution: r`\((x - 2)(x^2 + 3x - 1) = x^3 + 3x^2 - x - 2x^2 - 6x + 2 = x^3 + x^2 - 7x + 2\).`,
              exercises: [
                mcq(2, r`Kết quả của phép nhân \((2x - 1)(x + 3)\) là`, [r`\(2x^2 + 5x - 3\)`, r`\(2x^2 + 7x - 3\)`, r`\(2x^2 - 5x - 3\)`, r`\(2x^2 + 5x + 3\)`], 'A', r`\(2x\cdot x + 2x\cdot3 - x - 3 = 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3\).`),
                sa(2, r`Khai triển và thu gọn \((x + 2y)(x - y)\). Hệ số của hạng tử \(xy\) là bao nhiêu?`, ['1'], r`\((x + 2y)(x - y) = x^2 - xy + 2xy - 2y^2 = x^2 + xy - 2y^2\). Hệ số của \(xy\) là 1.`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng phép nhân đa thức',
          description: 'Rút gọn biểu thức để chứng minh đẳng thức hoặc chứng minh giá trị không phụ thuộc vào biến.',
          types: [
            {
              slug: 'bieu-thuc-khong-phu-thuoc-bien',
              title: 'Chứng minh giá trị biểu thức không phụ thuộc vào biến',
              levels: [3, 4],
              knowledge: 'Nhân đơn thức với đa thức, nhân đa thức với đa thức; thu gọn đa thức.',
              signs: 'Đề yêu cầu chứng minh giá trị của biểu thức không phụ thuộc vào giá trị của biến (hoặc tìm giá trị không đổi đó).',
              method: 'Thực hiện các phép nhân và thu gọn; nếu kết quả là một hằng số thì giá trị biểu thức không phụ thuộc vào biến.',
              steps: `- **Bước 1.** Thực hiện các phép nhân trong biểu thức.
- **Bước 2.** Thu gọn: các hạng tử chứa biến phải triệt tiêu hết.
- **Bước 3.** Kết luận biểu thức luôn bằng hằng số tìm được.`,
              mistakes: '- Sai dấu khi bỏ ngoặc có dấu "−" đứng trước tích.\n- Kết luận khi các hạng tử chứa biến chưa triệt tiêu hết (cần kiểm tra lại phép tính).',
              example: r`Chứng minh giá trị của biểu thức \(A = x(2x + 1) - 2x(x - 3) - 7x + 5\) không phụ thuộc vào giá trị của biến \(x\).`,
              solution: r`\(A = 2x^2 + x - 2x^2 + 6x - 7x + 5 = 5\). Vậy \(A = 5\) với mọi \(x\), tức là giá trị của \(A\) không phụ thuộc vào \(x\).`,
              exercises: [
                es(3, r`Chứng minh giá trị của biểu thức \(B = (x - 1)(x + 2) - x(x + 1) + 7\) không phụ thuộc vào giá trị của biến.`, r`\(B = x^2 + 2x - x - 2 - x^2 - x + 7 = 5\). Vậy \(B = 5\) với mọi \(x\).`),
                sa(3, r`Biểu thức \(C = (2x + 3)(x - 1) - 2x(x + 1) + x\) có giá trị không đổi với mọi \(x\). Giá trị đó bằng bao nhiêu?`, ['-3'], r`\((2x + 3)(x - 1) = 2x^2 + x - 3\). Do đó \(C = 2x^2 + x - 3 - 2x^2 - 2x + x = -3\).`),
              ],
            },
            {
              slug: 'chung-minh-dang-thuc-phep-nhan',
              title: 'Chứng minh đẳng thức',
              levels: [3, 4],
              knowledge: 'Nhân đa thức với đa thức; thu gọn đa thức; tính chất chia hết.',
              signs: 'Đề cho một đẳng thức chứa các tích đa thức, yêu cầu chứng minh; hoặc chứng minh một biểu thức chia hết cho một số.',
              method: 'Biến đổi vế phức tạp thành vế còn lại, hoặc biến đổi cả hai vế về cùng một biểu thức.',
              steps: `- **Bước 1.** Chọn vế phức tạp hơn để khai triển.
- **Bước 2.** Thực hiện phép nhân, thu gọn.
- **Bước 3.** So sánh với vế còn lại và kết luận.`,
              mistakes: '- Biến đổi đồng thời hai vế như giải phương trình (chuyển vế) rồi kết luận ngay – cách trình bày này dễ sai logic.\n- Với bài chia hết: chưa viết được biểu thức thành tích có thừa số là số chia đã kết luận.',
              example: r`Chứng minh \((x + y)(x^2 - xy + y^2) = x^3 + y^3\).`,
              solution: r`Vế trái \(= x^3 - x^2y + xy^2 + x^2y - xy^2 + y^3 = x^3 + y^3\) = vế phải. Đẳng thức được chứng minh.`,
              exercises: [
                es(3, r`Chứng minh \((x - 1)(x^2 + x + 1) = x^3 - 1\).`, r`Vế trái \(= x^3 + x^2 + x - x^2 - x - 1 = x^3 - 1\) = vế phải.`),
                es(4, r`Chứng minh rằng với mọi số nguyên \(n\), biểu thức \(n(n + 5) - (n - 3)(n + 2)\) chia hết cho 6.`, r`\(n(n + 5) - (n - 3)(n + 2) = n^2 + 5n - (n^2 - n - 6) = 6n + 6 = 6(n + 1)\).
Vì \(n\) nguyên nên \(6(n + 1)\) chia hết cho 6.`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 5 ----------------
    {
      slug: 'bai-5-phep-chia-da-thuc-cho-don-thuc',
      difficulty: 2,
      objectives: `- Nhận biết đơn thức (đa thức) chia hết cho đơn thức.
- Thực hiện chia đơn thức cho đơn thức, chia đa thức cho đơn thức trong trường hợp chia hết.`,
      prerequisites: r`- Quy tắc \(x^m : x^n = x^{m-n}\) với \(m \ge n\).
- Nhân đơn thức với đa thức (Bài 4).`,
      concepts: 'Đơn thức chia hết cho đơn thức; thương; đa thức chia hết cho đơn thức.',
      formulas: r`\(x^m : x^n = x^{m-n}\ (m \ge n)\); \((A + B) : C = A : C + B : C\)`,
      properties: `- Đơn thức A chia hết cho đơn thức B (B ≠ 0) khi mỗi biến của B đều là biến của A với số mũ không lớn hơn số mũ của nó trong A.
- Đa thức A chia hết cho đơn thức B khi mọi hạng tử của A đều chia hết cho B.`,
      themes: [
        {
          title: 'Chia đơn thức cho đơn thức',
          description: 'Điều kiện chia hết và quy tắc chia đơn thức cho đơn thức.',
          types: [
            {
              slug: 'chia-don-thuc-cho-don-thuc',
              title: 'Chia đơn thức cho đơn thức',
              levels: [1, 2],
              knowledge: r`Đơn thức A chia hết cho đơn thức B khi mỗi biến của B là biến của A với số mũ không lớn hơn. Muốn chia, ta chia hệ số của A cho hệ số của B và chia lũy thừa của từng biến: \(x^m : x^n = x^{m-n}\).`,
              signs: 'Phép chia hai đơn thức, hoặc câu hỏi đơn thức nào chia hết cho đơn thức nào.',
              method: 'Kiểm tra điều kiện chia hết, sau đó chia hệ số cho hệ số, lũy thừa của từng biến cho lũy thừa cùng biến.',
              steps: `- **Bước 1.** Kiểm tra A chia hết cho B.
- **Bước 2.** Chia hệ số của A cho hệ số của B.
- **Bước 3.** Chia lũy thừa từng biến (trừ số mũ); nhân các kết quả.`,
              mistakes: r`- Chia số mũ thay vì trừ: \(x^6 : x^2 = x^3\) là sai, đúng là \(x^4\).
- Không kiểm tra điều kiện chia hết (ví dụ \(xy : x^2\) không chia hết).`,
              example: r`Tính \(12x^4y^3 : (-3x^2y)\).`,
              solution: r`\(12x^4y^3 : (-3x^2y) = \left[12 : (-3)\right]\left(x^4 : x^2\right)\left(y^3 : y\right) = -4x^2y^2\).`,
              exercises: [
                mcq(1, r`Đơn thức nào sau đây **không** chia hết cho đơn thức \(2x^2y\)?`, [r`\(4x^3y\)`, r`\(-x^2y^2\)`, r`\(6xy^3\)`, r`\(\dfrac{1}{2}x^5y\)`], 'C', r`\(6xy^3\) có số mũ của \(x\) là 1, nhỏ hơn số mũ 2 của \(x\) trong \(2x^2y\), nên không chia hết.`),
                sa(2, r`Thực hiện phép chia \(\left(-15x^3y^4z\right) : \left(5xy^2z\right)\) được \(a\,x^2y^2\). Tìm \(a\).`, ['-3'], r`\(-15 : 5 = -3\); \(x^3 : x = x^2\); \(y^4 : y^2 = y^2\); \(z : z = 1\). Vậy \(a = -3\).`),
              ],
            },
          ],
        },
        {
          title: 'Chia đa thức cho đơn thức',
          description: 'Quy tắc chia đa thức cho đơn thức và tìm đa thức chưa biết.',
          types: [
            {
              slug: 'chia-da-thuc-cho-don-thuc',
              title: 'Chia đa thức cho đơn thức',
              levels: [1, 2, 3],
              knowledge: 'Muốn chia đa thức A cho đơn thức B (trường hợp chia hết), ta chia mỗi hạng tử của A cho B rồi cộng các kết quả.',
              signs: 'Phép chia một đa thức (có nhiều hạng tử) cho một đơn thức.',
              method: 'Chia từng hạng tử của đa thức cho đơn thức, giữ nguyên dấu từng hạng tử.',
              steps: `- **Bước 1.** Kiểm tra mọi hạng tử của đa thức đều chia hết cho đơn thức.
- **Bước 2.** Chia từng hạng tử cho đơn thức.
- **Bước 3.** Cộng các thương.`,
              mistakes: '- Quên hạng tử bằng chính số chia (thương của nó là 1).\n- Sai dấu khi đơn thức chia có hệ số âm.',
              example: r`Tính \((6x^3y^2 - 9x^2y^3 + 3x^2y) : 3x^2y\).`,
              solution: r`\(= 6x^3y^2 : 3x^2y - 9x^2y^3 : 3x^2y + 3x^2y : 3x^2y = 2xy - 3y^2 + 1\).`,
              exercises: [
                mcq(1, r`Kết quả của phép chia \((8x^3 - 4x^2 + 2x) : 2x\) là`, [r`\(4x^2 - 2x + 1\)`, r`\(4x^2 - 2x\)`, r`\(4x^3 - 2x^2 + 1\)`, r`\(4x^2 + 2x + 1\)`], 'A', r`\(8x^3 : 2x = 4x^2\); \(-4x^2 : 2x = -2x\); \(2x : 2x = 1\).`),
                sa(3, r`Đa thức \(5x^4y^3 - 2x^3y^2 + x^2y^4\) chia hết cho đơn thức \(x^ny^2\) (\(n\) là số tự nhiên). Giá trị lớn nhất của \(n\) là bao nhiêu?`, ['2'], r`Mọi hạng tử phải chia hết cho \(x^ny^2\). Số mũ của \(x\) trong các hạng tử là 4; 3; 2 nên \(n \le 2\); số mũ của \(y\) đều lớn hơn hoặc bằng 2. Giá trị lớn nhất của \(n\) là 2.`),
              ],
            },
            {
              slug: 'tim-da-thuc-khi-biet-tich-hoac-thuong',
              title: 'Tìm đa thức chưa biết khi biết tích hoặc thương',
              legacy: ['Tìm đa thức chưa biết khi biết tích hoặc thương'],
              levels: [2, 3],
              knowledge: r`Quan hệ giữa các thành phần của phép nhân, phép chia: \(A\cdot B = C \Rightarrow A = C : B\); \(A : B = Q \Rightarrow A = Q\cdot B\).`,
              signs: 'Đẳng thức chứa đa thức chưa biết nhân với (hoặc chia cho) một đơn thức; bài toán thực tế biết diện tích và một kích thước.',
              method: 'Biểu diễn đa thức chưa biết qua phép chia (khi biết tích) hoặc phép nhân (khi biết thương).',
              steps: `- **Bước 1.** Xác định đa thức chưa biết là thừa số hay số bị chia.
- **Bước 2.** Thực hiện phép chia hoặc phép nhân tương ứng.
- **Bước 3.** Thu gọn và kết luận.`,
              mistakes: '- Khi biết thương, lại đem chia thay vì nhân.',
              example: r`Tìm đa thức \(A\), biết \(A\cdot 2xy = 6x^3y^2 - 4x^2y\).`,
              solution: r`\(A = (6x^3y^2 - 4x^2y) : 2xy = 3x^2y - 2x\).`,
              exercises: [
                sa(2, r`Tìm đa thức \(Q\), biết \(Q : (-3x) = x^2 - 2x + 5\). Hệ số của \(x^2\) trong \(Q\) là bao nhiêu?`, ['6'], r`\(Q = (x^2 - 2x + 5)\cdot(-3x) = -3x^3 + 6x^2 - 15x\). Hệ số của \(x^2\) là 6.`),
                sa(3, r`Một hình chữ nhật có diện tích \(6x^2y + 9xy^2\) (cm²) và chiều rộng \(3xy\) (cm). Chiều dài hình chữ nhật là đa thức \(ax + by\). Tính \(a + b\).`, ['5'], r`Chiều dài \(= (6x^2y + 9xy^2) : 3xy = 2x + 3y\). Vậy \(a + b = 2 + 3 = 5\).`),
              ],
            },
          ],
        },
      ],
    },
  ],
};
