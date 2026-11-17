/** Ngân hàng câu hỏi GĐ4 – Chương II. Hằng đẳng thức đáng nhớ và ứng dụng (Bài 6 – Bài 9). */
import { es, mc, r, sa, tf, type BankLesson } from './types';

const HT6 = 'hoan-thanh-hang-dang-thuc-binh-phuong';
const TG6 = 'tinh-gia-tri-rut-gon-bieu-thuc-binh-phuong';
const TX6 = 'tim-x-hang-dang-thuc-binh-phuong';
const CM6 = 'chung-minh-voi-hang-dang-thuc-binh-phuong';
const GT6 = 'tim-gia-tri-nho-nhat-lon-nhat';

const B6: BankLesson = {
  slug: 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu',
  questions: [
    mc(1, HT6, r`Khai triển \((x + 3)^2\) được`, [r`\(x^2 + 6x + 9\)`, r`\(x^2 + 9\)`, r`\(x^2 + 3x + 9\)`, r`\(x^2 + 6x + 6\)`], r`\((x + 3)^2 = x^2 + 2\cdot x\cdot3 + 3^2 = x^2 + 6x + 9\).`, [
      'Bình phương số thứ nhất, cộng hai lần tích, cộng bình phương số thứ hai.',
      'Thiếu hạng tử "hai lần tích" \\(6x\\).',
      'Quên nhân 2 ở hạng tử giữa.',
      r`Viết \(3^2 = 6\) là sai.`,
    ]),
    mc(1, HT6, r`Đa thức \(x^2 - 16\) viết dưới dạng tích là`, [r`\((x - 4)(x + 4)\)`, r`\((x - 4)^2\)`, r`\((x - 16)(x + 16)\)`, r`\((x - 8)(x + 8)\)`], r`\(x^2 - 16 = x^2 - 4^2 = (x - 4)(x + 4)\) (hiệu hai bình phương).`, [
      'Hiệu hai bình phương.',
      r`\((x - 4)^2 = x^2 - 8x + 16\), khác \(x^2 - 16\).`,
      r`16 là bình phương của 4, không phải của 16.`,
      r`16 là \(4^2\), không phải \(8^2\).`,
    ]),
    mc(1, HT6, r`Điền vào chỗ trống: \(x^2 + \ldots + 25 = (x + 5)^2\).`, [r`\(10x\)`, r`\(5x\)`, r`\(25x\)`, r`\(2x\)`], r`Hạng tử giữa là hai lần tích: \(2\cdot x\cdot5 = 10x\).`, [
      r`\(2\cdot x\cdot5\).`,
      'Quên nhân 2.',
      r`Nhầm 25 là hệ số của hạng tử giữa.`,
      r`Chỉ lấy hệ số 2, quên nhân với 5.`,
    ]),
    mc(2, HT6, r`Khai triển \(\left(2x - \dfrac12\right)^2\) được`, [r`\(4x^2 - 2x + \dfrac14\)`, r`\(4x^2 - x + \dfrac14\)`, r`\(4x^2 - 2x - \dfrac14\)`, r`\(2x^2 - 2x + \dfrac14\)`], r`\(\left(2x - \dfrac12\right)^2 = (2x)^2 - 2\cdot2x\cdot\dfrac12 + \left(\dfrac12\right)^2 = 4x^2 - 2x + \dfrac14\).`, [
      undefined,
      'Quên nhân 2 ở hai lần tích.',
      r`Bình phương của \(\dfrac12\) là số dương \(\dfrac14\).`,
      r`\((2x)^2 = 4x^2\), không phải \(2x^2\).`,
    ]),
    mc(2, HT6, r`Biểu thức \(9x^2 - 12xy + 4y^2\) viết dưới dạng bình phương của một hiệu là`, [r`\((3x - 2y)^2\)`, r`\((3x + 2y)^2\)`, r`\((9x - 4y)^2\)`, r`\((3x - 4y)^2\)`], r`\(9x^2 = (3x)^2\), \(4y^2 = (2y)^2\), \(12xy = 2\cdot3x\cdot2y\). Vậy \(9x^2 - 12xy + 4y^2 = (3x - 2y)^2\).`, [
      undefined,
      'Hạng tử giữa mang dấu trừ nên là bình phương của một hiệu.',
      r`\(9x^2\) là bình phương của \(3x\), không phải của \(9x\).`,
      r`\(4y^2 = (2y)^2\).`,
    ]),
    mc(2, TG6, r`Tính nhanh \(99^2\).`, [r`\(9801\)`, r`\(9901\)`, r`\(9999\)`, r`\(9799\)`], r`\(99^2 = (100 - 1)^2 = 10000 - 200 + 1 = 9801\).`, [
      undefined,
      r`Hai lần tích là \(2\cdot100\cdot1 = 200\), không phải 100.`,
      'Thiếu hạng tử hai lần tích, chỉ lấy \\(100^2 - 1\\).',
      r`\(1^2 = 1\) được cộng chứ không trừ.`,
    ]),
    mc(2, TG6, r`Tính nhanh \(53\cdot47\).`, [r`\(2491\)`, r`\(2509\)`, r`\(2391\)`, r`\(2500\)`], r`\(53\cdot47 = (50 + 3)(50 - 3) = 50^2 - 3^2 = 2500 - 9 = 2491\).`, [
      undefined,
      r`Hiệu hai bình phương: phải trừ \(3^2\).`,
      r`Tính sai \(50^2 = 2400\).`,
      r`Quên trừ \(3^2 = 9\).`,
    ]),
    mc(3, TG6, r`Rút gọn biểu thức \((x + 2)^2 - (x - 2)^2\) được`, [r`\(8x\)`, r`\(0\)`, r`\(8\)`, r`\(2x^2 + 8\)`], r`\((x^2 + 4x + 4) - (x^2 - 4x + 4) = 8x\). Có thể dùng hiệu hai bình phương: \((x + 2 - x + 2)(x + 2 + x - 2) = 4\cdot2x = 8x\).`, [
      undefined,
      'Hai bình phương không bằng nhau vì hạng tử giữa trái dấu.',
      r`Bỏ ngoặc sai dấu ở hạng tử \(4\).`,
      'Đã cộng hai bình phương thay vì trừ.',
    ]),
    mc(3, TG6, r`Giá trị của biểu thức \(x^2 - 6x + 9\) tại \(x = 103\) là`, [r`\(10000\)`, r`\(100\)`, r`\(10609\)`, r`\(9409\)`], r`\(x^2 - 6x + 9 = (x - 3)^2\). Tại \(x = 103\): \(100^2 = 10000\).`, [
      undefined,
      'Quên bình phương.',
      r`Đó là \(103^2\), chưa trừ \(6x\) và cộng 9.`,
      r`Tính nhầm \((103 - 6)^2\).`,
    ]),
    mc(2, TX6, r`Các giá trị của \(x\) thỏa mãn \(x^2 - 25 = 0\) là`, [r`\(x = 5\) hoặc \(x = -5\)`, r`\(x = 5\)`, r`\(x = 25\)`, r`\(x = 25\) hoặc \(x = -25\)`], r`\(x^2 - 25 = (x - 5)(x + 5) = 0\) nên \(x = 5\) hoặc \(x = -5\).`, [
      undefined,
      'Bỏ sót nghiệm âm.',
      r`\(x^2 = 25\) chứ không phải \(x = 25\).`,
      'Chưa lấy căn bậc hai.',
    ]),
    mc(3, TX6, r`Giá trị của \(x\) thỏa mãn \((x + 1)^2 - (x - 1)^2 = 12\) là`, [r`\(x = 3\)`, r`\(x = 6\)`, r`\(x = -3\)`, r`\(x = 12\)`], r`\((x + 1)^2 - (x - 1)^2 = 4x\). Vậy \(4x = 12\), \(x = 3\).`, [
      undefined,
      r`Rút gọn sai thành \(2x\).`,
      'Sai dấu khi chuyển vế.',
      'Chưa rút gọn vế trái.',
    ]),
    mc(3, CM6, r`Với mọi giá trị của \(x\), biểu thức \(x^2 - 4x + 5\) luôn`, [r`lớn hơn hoặc bằng \(1\)`, r`lớn hơn hoặc bằng \(5\)`, r`bằng 0 khi \(x = 2\)`, r`có thể nhận giá trị âm`], r`\(x^2 - 4x + 5 = (x - 2)^2 + 1 \ge 1\) với mọi \(x\); dấu bằng khi \(x = 2\).`, [
      undefined,
      r`Tại \(x = 2\) biểu thức bằng 1 < 5.`,
      r`Tại \(x = 2\) biểu thức bằng 1.`,
      r`\((x - 2)^2 + 1 \ge 1 > 0\).`,
    ]),
    mc(3, GT6, r`Giá trị nhỏ nhất của biểu thức \(A = x^2 + 2x + 4\) là`, [r`\(3\)`, r`\(4\)`, r`\(1\)`, r`\(-1\)`], r`\(A = (x + 1)^2 + 3 \ge 3\); dấu bằng khi \(x = -1\). Vậy giá trị nhỏ nhất của \(A\) là 3.`, [
      undefined,
      r`Đó là giá trị tại \(x = 0\), chưa phải nhỏ nhất.`,
      r`Tách sai: \(x^2 + 2x + 4 \ne (x + 1)^2 + 1\).`,
      r`\(-1\) là giá trị của \(x\), không phải giá trị nhỏ nhất của \(A\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, HT6, 'Xét tính đúng sai của các đẳng thức sau (với mọi \\(a\\), \\(b\\)):', [
      [r`\((a - b)^2 = a^2 - 2ab + b^2\).`, true, 'Đây là hằng đẳng thức bình phương của một hiệu.'],
      [r`\((a + b)^2 = a^2 + b^2\).`, false, r`Thiếu hạng tử \(2ab\).`],
      [r`\(a^2 - b^2 = (a - b)(a + b)\).`, true, 'Hằng đẳng thức hiệu hai bình phương.'],
      [r`\((a - b)^2 = (b - a)^2\).`, true, r`Hai số đối nhau có bình phương bằng nhau.`],
    ]),
    tf(2, HT6, r`Cho biểu thức \(P = 4x^2 + 4x + 1\).`, [
      [r`\(P = (2x + 1)^2\).`, true, r`\((2x)^2 + 2\cdot2x\cdot1 + 1^2\).`],
      [r`\(P = (4x + 1)^2\).`, false, r`\((4x + 1)^2 = 16x^2 + 8x + 1\).`],
      [r`\(P = 0\) khi \(x = -\dfrac12\).`, true, r`\(2\cdot\left(-\dfrac12\right) + 1 = 0\).`],
      [r`\(P\) nhận giá trị âm khi \(x = -1\).`, false, r`\(P(-1) = (-1)^2 = 1 > 0\); thực ra \(P \ge 0\) với mọi \(x\).`],
    ]),
    tf(2, TG6, 'Dùng hằng đẳng thức để tính nhanh:', [
      [r`\(101^2 = 10201\).`, true, r`\((100 + 1)^2 = 10000 + 200 + 1\).`],
      [r`\(49\cdot51 = 2499\).`, true, r`\((50 - 1)(50 + 1) = 2500 - 1\).`],
      [r`\(98^2 = 9604\).`, true, r`\((100 - 2)^2 = 10000 - 400 + 4\).`],
      [r`\(31^2 - 29^2 = 4\).`, false, r`\((31 - 29)(31 + 29) = 2\cdot60 = 120\).`],
    ]),
    tf(3, TG6, r`Cho \(A = (x + 3)^2 - (x - 3)(x + 3)\).`, [
      [r`Rút gọn được \(A = 6x + 18\).`, true, r`\(x^2 + 6x + 9 - (x^2 - 9) = 6x + 18\).`],
      [r`Tại \(x = -3\) thì \(A = 0\).`, true, r`\(6\cdot(-3) + 18 = 0\).`],
      [r`\(A = 18\) với mọi \(x\).`, false, r`\(A\) còn hạng tử \(6x\).`],
      [r`Với mọi số nguyên \(x\), \(A\) chia hết cho 6.`, true, r`\(A = 6(x + 3)\).`],
    ]),
    tf(2, TX6, r`Xét phương trình \((x - 2)^2 = 9\).`, [
      [r`\(x = 5\) thỏa mãn.`, true, r`\((5 - 2)^2 = 9\).`],
      [r`\(x = -1\) thỏa mãn.`, true, r`\((-1 - 2)^2 = 9\).`],
      [r`\(x = 11\) thỏa mãn.`, false, r`\((11 - 2)^2 = 81\).`],
      [r`Có đúng hai giá trị của \(x\) thỏa mãn.`, true, r`\(x - 2 = 3\) hoặc \(x - 2 = -3\).`],
    ]),
    tf(3, TX6, r`Xét đẳng thức \(4x^2 - 4x + 1 = 0\).`, [
      [r`Vế trái bằng \((2x - 1)^2\).`, true, r`\((2x)^2 - 2\cdot2x\cdot1 + 1\).`],
      [r`\(x = \dfrac12\) thỏa mãn.`, true, r`\(2x - 1 = 0\).`],
      [r`\(x = -\dfrac12\) thỏa mãn.`, false, r`Khi đó \((2x - 1)^2 = 4\).`],
      [r`Có hai giá trị khác nhau của \(x\) thỏa mãn.`, false, r`Chỉ có \(x = \dfrac12\).`],
    ]),
    tf(3, CM6, 'Xét tính đúng sai (với mọi giá trị của biến):', [
      [r`\(x^2 + 6x + 10 > 0\).`, true, r`\(x^2 + 6x + 10 = (x + 3)^2 + 1 \ge 1\).`],
      [r`\((a + b)^2 - (a - b)^2 = 4ab\).`, true, r`\((a^2 + 2ab + b^2) - (a^2 - 2ab + b^2) = 4ab\).`],
      [r`\(x^2 - x + 1\) có thể bằng 0.`, false, r`\(x^2 - x + 1 = \left(x - \dfrac12\right)^2 + \dfrac34 \ge \dfrac34\).`],
      [r`\(-x^2 + 2x - 2 < 0\).`, true, r`\(-x^2 + 2x - 2 = -(x - 1)^2 - 1 \le -1\).`],
    ]),
    tf(4, CM6, r`Cho hai số \(a\), \(b\) thỏa mãn \(a + b = 5\) và \(ab = 6\).`, [
      [r`\(a^2 + b^2 = 13\).`, true, r`\(a^2 + b^2 = (a + b)^2 - 2ab = 25 - 12\).`],
      [r`\((a - b)^2 = 1\).`, true, r`\((a - b)^2 = (a + b)^2 - 4ab = 25 - 24\).`],
      [r`\(a^2 + b^2 = 25\).`, false, r`Quên trừ \(2ab\).`],
      [r`\((a + b)^2 - 4ab = (a - b)^2\) với mọi \(a\), \(b\).`, true, r`Khai triển hai vế đều được \(a^2 - 2ab + b^2\).`],
    ]),
    tf(3, GT6, r`Cho \(P = x^2 - 8x + 20\).`, [
      [r`\(P = (x - 4)^2 + 4\).`, true, r`\(x^2 - 8x + 16 + 4\).`],
      [r`Giá trị nhỏ nhất của \(P\) là 4, đạt khi \(x = 4\).`, true, r`\((x - 4)^2 \ge 0\).`],
      [r`Giá trị nhỏ nhất của \(P\) là 20, đạt khi \(x = 0\).`, false, r`\(P(4) = 4 < 20\).`],
      [r`\(P\) có giá trị lớn nhất.`, false, r`\(P\) lớn tùy ý khi \(x\) lớn.`],
    ]),
    tf(4, GT6, r`Cho \(Q = -x^2 + 6x - 5\).`, [
      [r`\(Q = 4 - (x - 3)^2\).`, true, r`\(-(x^2 - 6x + 9) + 4\).`],
      [r`Giá trị lớn nhất của \(Q\) là 4, đạt khi \(x = 3\).`, true, r`\(-(x - 3)^2 \le 0\).`],
      [r`\(Q \le -5\) với mọi \(x\).`, false, r`\(Q(3) = 4 > -5\).`],
      [r`\(Q\) có giá trị nhỏ nhất là \(-5\).`, false, r`\(Q\) nhỏ tùy ý khi \(x\) lớn (ví dụ \(Q(10) = -45\)).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, TG6, r`Tính nhanh giá trị của \(102^2 - 4\cdot102 + 4\).`, '10000', r`\(102^2 - 2\cdot102\cdot2 + 2^2 = (102 - 2)^2 = 100^2 = 10000\).`),
    sa(3, TX6, r`Tìm \(x\) biết \((x + 5)^2 - x^2 = 45\).`, '2', r`\(x^2 + 10x + 25 - x^2 = 45 \iff 10x = 20 \iff x = 2\).`),
    sa(3, GT6, r`Tìm giá trị nhỏ nhất của biểu thức \(x^2 - 10x + 30\).`, '5', r`\(x^2 - 10x + 30 = (x - 5)^2 + 5 \ge 5\); dấu bằng khi \(x = 5\).`),
    // ---- Tự luận ----
    es(3, CM6, r`Cho \(A = (2x + 1)^2 - 4x(x + 1)\). Chứng minh rằng giá trị của \(A\) không phụ thuộc vào giá trị của biến \(x\).`, r`\(A = 4x^2 + 4x + 1 - 4x^2 - 4x = 1\).
Vậy \(A = 1\) với mọi \(x\), không phụ thuộc vào \(x\).`, r`0,5 điểm: khai triển đúng \((2x + 1)^2\) và \(4x(x + 1)\).
0,5 điểm: rút gọn được \(A = 1\) và kết luận.`),
    es(3, TX6, r`Tìm \(x\), biết:
a) \((x - 3)^2 - (x + 2)^2 = 15\); b) \(9x^2 - 6x + 1 = 0\).`, r`a) \(x^2 - 6x + 9 - x^2 - 4x - 4 = 15 \iff -10x + 5 = 15 \iff x = -1\).
b) \((3x - 1)^2 = 0 \iff 3x - 1 = 0 \iff x = \dfrac13\).`, r`0,5 điểm: câu a, rút gọn đúng và tìm được \(x = -1\).
0,5 điểm: câu b, nhận ra \((3x - 1)^2\) và tìm được \(x = \dfrac13\).`),
    es(4, GT6, r`a) Tìm giá trị nhỏ nhất của \(A = x^2 - 3x + 5\).
b) Tìm giá trị lớn nhất của \(B = 4x - x^2 + 1\).`, r`a) \(A = \left(x - \dfrac32\right)^2 + 5 - \dfrac94 = \left(x - \dfrac32\right)^2 + \dfrac{11}{4} \ge \dfrac{11}{4}\). Giá trị nhỏ nhất của \(A\) là \(\dfrac{11}{4}\) khi \(x = \dfrac32\).
b) \(B = -(x^2 - 4x + 4) + 5 = 5 - (x - 2)^2 \le 5\). Giá trị lớn nhất của \(B\) là 5 khi \(x = 2\).`, r`0,5 điểm: câu a, đưa về \(\left(x - \dfrac32\right)^2 + \dfrac{11}{4}\), kết luận đúng giá trị và \(x\).
0,5 điểm: câu b, đưa về \(5 - (x - 2)^2\), kết luận đúng giá trị và \(x\).`),
  ],
};

const HT7 = 'hoan-thanh-hang-dang-thuc-lap-phuong';
const TG7 = 'tinh-gia-tri-rut-gon-bieu-thuc-lap-phuong';
const TX7 = 'tim-x-hang-dang-thuc-lap-phuong';
const CM7 = 'chung-minh-hang-dang-thuc-lap-phuong';

const B7: BankLesson = {
  slug: 'bai-7-lap-phuong-cua-mot-tong-lap-phuong-cua-mot-hieu',
  questions: [
    mc(1, HT7, r`Hằng đẳng thức lập phương của một tổng là \((a + b)^3 = \ldots\)`, [r`\(a^3 + 3a^2b + 3ab^2 + b^3\)`, r`\(a^3 + b^3\)`, r`\(a^3 + 3ab + b^3\)`, r`\(a^3 + a^2b + ab^2 + b^3\)`], r`\((a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3\).`, [
      undefined,
      'Thiếu hai hạng tử ở giữa.',
      'Sai các hạng tử ở giữa.',
      'Hệ số của hai hạng tử giữa là 3.',
    ]),
    mc(1, HT7, r`Khai triển \((x - 1)^3\) được`, [r`\(x^3 - 3x^2 + 3x - 1\)`, r`\(x^3 - 1\)`, r`\(x^3 - 3x^2 - 3x - 1\)`, r`\(x^3 + 3x^2 - 3x - 1\)`], r`\((x - 1)^3 = x^3 - 3x^2\cdot1 + 3x\cdot1^2 - 1^3 = x^3 - 3x^2 + 3x - 1\).`, [
      'Dấu xen kẽ: cộng, trừ, cộng, trừ.',
      'Thiếu hai hạng tử ở giữa.',
      r`Hạng tử \(3x\) mang dấu cộng.`,
      r`Hạng tử \(3x^2\) mang dấu trừ.`,
    ]),
    mc(1, HT7, r`Biểu thức \(x^3 - 3x^2 + 3x - 1\) viết gọn là`, [r`\((x - 1)^3\)`, r`\((x + 1)^3\)`, r`\((1 - x)^3\)`, r`\((x - 3)^3\)`], r`Đây là khai triển của lập phương một hiệu \((x - 1)^3\).`, [
      undefined,
      'Các dấu xen kẽ nên là lập phương một hiệu.',
      r`\((1 - x)^3 = 1 - 3x + 3x^2 - x^3\), là số đối của biểu thức đã cho.`,
      r`Số hạng cuối \(-1 = -1^3\) nên số thứ hai là 1.`,
    ]),
    mc(2, HT7, r`Khai triển \((x + 2)^3\) được`, [r`\(x^3 + 6x^2 + 12x + 8\)`, r`\(x^3 + 8\)`, r`\(x^3 + 6x^2 + 6x + 8\)`, r`\(x^3 + 3x^2 + 3x + 8\)`], r`\((x + 2)^3 = x^3 + 3\cdot x^2\cdot2 + 3\cdot x\cdot2^2 + 2^3 = x^3 + 6x^2 + 12x + 8\).`, [
      undefined,
      'Thiếu hai hạng tử giữa.',
      r`\(3\cdot x\cdot2^2 = 12x\), không phải \(6x\).`,
      'Quên nhân với 2 và \\(2^2\\) ở hai hạng tử giữa.',
    ]),
    mc(2, HT7, r`Khai triển \((2x - y)^3\) được`, [r`\(8x^3 - 12x^2y + 6xy^2 - y^3\)`, r`\(8x^3 - y^3\)`, r`\(8x^3 - 6x^2y + 6xy^2 - y^3\)`, r`\(2x^3 - 6x^2y + 6xy^2 - y^3\)`], r`\((2x)^3 - 3(2x)^2y + 3\cdot2x\cdot y^2 - y^3 = 8x^3 - 12x^2y + 6xy^2 - y^3\).`, [
      undefined,
      'Thiếu hai hạng tử giữa.',
      r`\(3\cdot(2x)^2\cdot y = 12x^2y\).`,
      r`\((2x)^3 = 8x^3\).`,
    ]),
    mc(2, HT7, r`Biểu thức \(x^3 + 9x^2 + 27x + 27\) bằng`, [r`\((x + 3)^3\)`, r`\((x + 9)^3\)`, r`\((x - 3)^3\)`, r`\((3x + 3)^3\)`], r`\(27 = 3^3\), \(9x^2 = 3\cdot x^2\cdot3\), \(27x = 3\cdot x\cdot3^2\). Vậy biểu thức bằng \((x + 3)^3\).`, [
      undefined,
      r`\((x + 9)^3\) có số hạng cuối \(729\).`,
      'Mọi hạng tử đều dương nên là lập phương một tổng.',
      r`Hạng tử đầu là \(x^3\), không phải \(27x^3\).`,
    ]),
    mc(2, TG7, r`Tính \(101^3\) bằng hằng đẳng thức.`, [r`\(1\,030\,301\)`, r`\(1\,000\,001\)`, r`\(1\,010\,101\)`, r`\(1\,003\,001\)`], r`\((100 + 1)^3 = 1\,000\,000 + 3\cdot10\,000 + 3\cdot100 + 1 = 1\,030\,301\).`, [
      undefined,
      'Thiếu hai hạng tử giữa.',
      'Quên hệ số 3 ở hai hạng tử giữa.',
      'Tính sai hai hạng tử giữa.',
    ]),
    mc(2, TG7, r`Giá trị của \(x^3 + 3x^2 + 3x + 1\) tại \(x = 99\) là`, [r`\(1\,000\,000\)`, r`\(10\,000\)`, r`\(970\,299\)`, r`\(100\)`], r`\(x^3 + 3x^2 + 3x + 1 = (x + 1)^3\). Tại \(x = 99\): \(100^3 = 1\,000\,000\).`, [
      undefined,
      r`Đó là \(100^2\), còn biểu thức là lập phương.`,
      r`Đó là \(99^3\), chưa cộng các hạng tử còn lại.`,
      'Chưa lập phương.',
    ]),
    mc(3, TG7, r`Rút gọn \((x + 1)^3 - (x - 1)^3\) được`, [r`\(6x^2 + 2\)`, r`\(2\)`, r`\(6x + 2\)`, r`\(2x^3 + 6x\)`], r`\((x^3 + 3x^2 + 3x + 1) - (x^3 - 3x^2 + 3x - 1) = 6x^2 + 2\).`, [
      undefined,
      r`Hai hạng tử \(3x^2\) trái dấu nên không triệt tiêu.`,
      r`Rút gọn sai hạng tử \(6x^2\).`,
      'Đã cộng hai lập phương thay vì trừ.',
    ]),
    mc(3, TG7, r`Rút gọn \((x + 2)^3 - x^3 - 8\) được`, [r`\(6x^2 + 12x\)`, r`\(0\)`, r`\(6x^2 + 12x + 16\)`, r`\(3x^2 + 6x\)`], r`\((x + 2)^3 = x^3 + 6x^2 + 12x + 8\); trừ \(x^3\) và \(8\) còn \(6x^2 + 12x\).`, [
      undefined,
      r`\((x + 2)^3 \ne x^3 + 8\).`,
      r`Trừ 8 chứ không cộng.`,
      r`Quên nhân 2 và \(2^2\).`,
    ]),
    mc(2, TX7, r`Giá trị của \(x\) thỏa mãn \((x - 1)^3 = 8\) là`, [r`\(x = 3\)`, r`\(x = 9\)`, r`\(x = 2\)`, r`\(x = -1\)`], r`\(8 = 2^3\) nên \(x - 1 = 2\), suy ra \(x = 3\).`, [
      undefined,
      r`\(x - 1 = 8\) là sai, phải lấy số có lập phương bằng 8.`,
      r`Chưa cộng thêm 1.`,
      r`Lập phương của \(-2\) là \(-8\), không phải 8.`,
    ]),
    mc(3, TX7, r`Giá trị của \(x\) thỏa mãn \(x^3 + 3x^2 + 3x + 1 = 27\) là`, [r`\(x = 2\)`, r`\(x = 3\)`, r`\(x = 26\)`, r`\(x = 8\)`], r`Vế trái là \((x + 1)^3\). \((x + 1)^3 = 27 = 3^3\) nên \(x + 1 = 3\), \(x = 2\).`, [
      undefined,
      r`Quên trừ 1: \(x + 1 = 3\).`,
      'Chuyển vế mà chưa viết gọn lập phương.',
      r`Thử lại: \(9^3 \ne 27\).`,
    ]),
    mc(3, CM7, r`Cho \(x + y = 3\) và \(xy = 2\). Giá trị của \(x^3 + y^3\) là`, [r`\(9\)`, r`\(27\)`, r`\(45\)`, r`\(21\)`], r`\(x^3 + y^3 = (x + y)^3 - 3xy(x + y) = 27 - 3\cdot2\cdot3 = 9\).`, [
      undefined,
      r`Đó là \((x + y)^3\), chưa trừ \(3xy(x + y)\).`,
      r`Phải trừ \(3xy(x + y)\), không cộng.`,
      r`Chỉ trừ \(3xy = 6\), quên nhân với \(x + y\).`,
    ]),
    mc(3, CM7, r`Rút gọn \((a + b)^3 - (a - b)^3\) được`, [r`\(6a^2b + 2b^3\)`, r`\(2b^3\)`, r`\(2a^3 + 6ab^2\)`, r`\(0\)`], r`\((a^3 + 3a^2b + 3ab^2 + b^3) - (a^3 - 3a^2b + 3ab^2 - b^3) = 6a^2b + 2b^3\).`, [
      undefined,
      r`Quên hai hạng tử \(3a^2b\) không triệt tiêu.`,
      'Đó là tổng của hai lập phương.',
      'Hai lập phương không bằng nhau.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, HT7, 'Xét tính đúng sai (với mọi \\(a\\), \\(b\\)):', [
      [r`\((a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3\).`, true, 'Hằng đẳng thức lập phương của một hiệu.'],
      [r`\((a + b)^3 = a^3 + b^3\).`, false, r`Thiếu \(3a^2b + 3ab^2\).`],
      [r`\((-a - b)^3 = -(a + b)^3\).`, true, r`\(-a - b = -(a + b)\) và lập phương của số đối là số đối của lập phương.`],
      [r`\((a - b)^3 = (b - a)^3\).`, false, r`\((b - a)^3 = -(a - b)^3\).`],
    ]),
    tf(2, HT7, r`Cho biểu thức \(M = 8x^3 + 12x^2 + 6x + 1\).`, [
      [r`\(M = (2x + 1)^3\).`, true, r`\((2x)^3 + 3(2x)^2\cdot1 + 3\cdot2x\cdot1 + 1\).`],
      [r`\(M = (8x + 1)^3\).`, false, r`\((8x)^3 = 512x^3\).`],
      [r`Tại \(x = 0\) thì \(M = 1\).`, true, r`Chỉ còn hạng tử tự do 1.`],
      [r`Tại \(x = -\dfrac12\) thì \(M = 0\).`, true, r`\(2\cdot\left(-\dfrac12\right) + 1 = 0\).`],
    ]),
    tf(2, HT7, r`Khai triển \((3 - x)^3\).`, [
      [r`\((3 - x)^3 = 27 - 27x + 9x^2 - x^3\).`, true, r`\(3^3 - 3\cdot9x + 3\cdot3x^2 - x^3\).`],
      [r`Hệ số của \(x^2\) là 9.`, true, r`\(3\cdot3\cdot x^2 = 9x^2\).`],
      [r`Hạng tử tự do là 9.`, false, r`Hạng tử tự do là \(3^3 = 27\).`],
      [r`\((3 - x)^3 = -(x - 3)^3\).`, true, r`\(3 - x = -(x - 3)\).`],
    ]),
    tf(2, TG7, 'Dùng hằng đẳng thức, kiểm tra các kết quả:', [
      [r`\(21^3 = 9261\).`, true, r`\((20 + 1)^3 = 8000 + 1200 + 60 + 1\).`],
      [r`\(99^3 = 970\,299\).`, true, r`\((100 - 1)^3 = 1\,000\,000 - 30\,000 + 300 - 1\).`],
      [r`\(19^3 = 6859\).`, true, r`\((20 - 1)^3 = 8000 - 1200 + 60 - 1\).`],
      [r`\(11^3 = 1111\).`, false, r`\((10 + 1)^3 = 1000 + 300 + 30 + 1 = 1331\).`],
    ]),
    tf(3, TG7, r`Cho \(A = (x + 1)^3 - x(x^2 + 3x + 3)\).`, [
      [r`\(A = 1\).`, true, r`\(x^3 + 3x^2 + 3x + 1 - x^3 - 3x^2 - 3x = 1\).`],
      [r`Giá trị của \(A\) phụ thuộc vào \(x\).`, false, r`\(A = 1\) với mọi \(x\).`],
      [r`Tại \(x = 100\) thì \(A = 1\).`, true, r`\(A\) luôn bằng 1.`],
      [r`\(A = 2x + 1\).`, false, 'Rút gọn đúng được \\(A = 1\\).'],
    ]),
    tf(2, TX7, r`Xét đẳng thức \((x + 2)^3 = -8\).`, [
      [r`Suy ra \(x + 2 = -2\).`, true, r`\((-2)^3 = -8\).`],
      [r`\(x = -4\) thỏa mãn.`, true, r`\((-4 + 2)^3 = -8\).`],
      [r`\(x = 0\) thỏa mãn.`, false, r`\((0 + 2)^3 = 8\).`],
      [r`Có hai giá trị của \(x\) thỏa mãn.`, false, r`Chỉ có một số có lập phương bằng \(-8\) nên chỉ có \(x = -4\).`],
    ]),
    tf(3, TX7, r`Xét đẳng thức \(x^3 - 6x^2 + 12x - 8 = 0\).`, [
      [r`Vế trái bằng \((x - 2)^3\).`, true, r`\(x^3 - 3x^2\cdot2 + 3x\cdot2^2 - 2^3\).`],
      [r`\(x = 2\) thỏa mãn.`, true, r`\((2 - 2)^3 = 0\).`],
      [r`\(x = -2\) thỏa mãn.`, false, r`\((-4)^3 = -64\).`],
      [r`\(x = 8\) thỏa mãn.`, false, r`\((8 - 2)^3 = 216\).`],
    ]),
    tf(3, CM7, r`Cho \(a + b = 4\) và \(ab = 3\).`, [
      [r`\(a^3 + b^3 = 28\).`, true, r`\((a + b)^3 - 3ab(a + b) = 64 - 36\).`],
      [r`\(a^2 + b^2 = 10\).`, true, r`\((a + b)^2 - 2ab = 16 - 6\).`],
      [r`\((a + b)^3 = 64\).`, true, r`\(4^3 = 64\).`],
      [r`\(a^3 + b^3 = 64\).`, false, r`\(a^3 + b^3 \ne (a + b)^3\).`],
    ]),
    tf(4, CM7, 'Xét tính đúng sai (với mọi \\(a\\), \\(b\\)):', [
      [r`\((a + b)^3 = a^3 + b^3 + 3ab(a + b)\).`, true, r`\(3a^2b + 3ab^2 = 3ab(a + b)\).`],
      [r`\((a - b)^3 = a^3 - b^3 - 3ab(a - b)\).`, true, r`\(-3a^2b + 3ab^2 = -3ab(a - b)\).`],
      [r`\((a + b)^3 + (a - b)^3 = 2a^3 + 6ab^2\).`, true, r`Các hạng tử \(\pm3a^2b\) và \(\pm b^3\) triệt tiêu.`],
      [r`\((a + b)^3 - (a - b)^3 = 2b^3\).`, false, r`Kết quả đúng là \(6a^2b + 2b^3\).`],
    ]),
    tf(3, TG7, r`Cho \(B = (x - 1)^3 - (x + 1)^3\).`, [
      [r`\(B = -6x^2 - 2\).`, true, r`\((x^3 - 3x^2 + 3x - 1) - (x^3 + 3x^2 + 3x + 1)\).`],
      [r`\(B < 0\) với mọi \(x\).`, true, r`\(-6x^2 - 2 \le -2\).`],
      [r`Tại \(x = 0\) thì \(B = 0\).`, false, r`\(B(0) = -2\).`],
      [r`\(B = 2\) với mọi \(x\).`, false, r`\(B\) phụ thuộc vào \(x\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, TG7, r`Tính giá trị của \(x^3 - 3x^2 + 3x - 1\) tại \(x = 11\).`, '1000', r`\(x^3 - 3x^2 + 3x - 1 = (x - 1)^3\). Tại \(x = 11\): \(10^3 = 1000\).`),
    sa(3, TX7, r`Tìm \(x\) biết \((x - 1)^3 - x^3 + 3x^2 = 5\).`, '2', r`\(x^3 - 3x^2 + 3x - 1 - x^3 + 3x^2 = 3x - 1\). Vậy \(3x - 1 = 5\), \(x = 2\).`),
    sa(3, CM7, r`Cho \(x - y = 2\) và \(xy = 15\). Tính \(x^3 - y^3\).`, '98', r`\(x^3 - y^3 = (x - y)^3 + 3xy(x - y) = 8 + 3\cdot15\cdot2 = 98\).`),
    // ---- Tự luận ----
    es(2, HT7, r`Khai triển: a) \(\left(x + \dfrac12\right)^3\); b) \((2x - 3y)^3\).`, r`a) \(x^3 + 3x^2\cdot\dfrac12 + 3x\cdot\dfrac14 + \dfrac18 = x^3 + \dfrac32x^2 + \dfrac34x + \dfrac18\).
b) \((2x)^3 - 3(2x)^2\cdot3y + 3\cdot2x\cdot(3y)^2 - (3y)^3 = 8x^3 - 36x^2y + 54xy^2 - 27y^3\).`, r`0,5 điểm: câu a, đủ 4 hạng tử, đúng hệ số.
0,5 điểm: câu b, đúng dấu và hệ số của 4 hạng tử.`),
    es(3, TG7, r`Rút gọn biểu thức \(A = (x + 3)^3 - (x + 9)(x^2 + 27)\) rồi tính giá trị của \(A\) tại \(x = 2026\).`, r`\((x + 3)^3 = x^3 + 9x^2 + 27x + 27\).
\((x + 9)(x^2 + 27) = x^3 + 27x + 9x^2 + 243\).
\(A = 27 - 243 = -216\) với mọi \(x\), nên tại \(x = 2026\) thì \(A = -216\).`, r`0,5 điểm: khai triển đúng hai biểu thức.
0,5 điểm: rút gọn được \(A = -216\) và kết luận giá trị.`),
    es(3, TX7, r`Tìm \(x\), biết:
a) \((x + 1)^3 - (x - 1)^3 = 26\); b) \(x^3 + 9x^2 + 27x + 27 = -64\).`, r`a) Vế trái bằng \(6x^2 + 2\). \(6x^2 + 2 = 26 \iff x^2 = 4 \iff x = 2\) hoặc \(x = -2\).
b) \((x + 3)^3 = -64 = (-4)^3 \iff x + 3 = -4 \iff x = -7\).`, r`0,5 điểm: câu a, rút gọn đúng và tìm đủ hai giá trị.
0,5 điểm: câu b, viết được \((x + 3)^3\) và tìm \(x = -7\).`),
    es(4, CM7, r`Cho \(a + b = 1\). Chứng minh rằng \(a^3 + b^3 + 3ab = 1\).`, r`\(a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 1 - 3ab\) (vì \(a + b = 1\)).
Do đó \(a^3 + b^3 + 3ab = 1 - 3ab + 3ab = 1\).`, r`0,5 điểm: viết được \(a^3 + b^3 = (a + b)^3 - 3ab(a + b)\).
0,5 điểm: thay \(a + b = 1\) và kết luận.`),
  ],
};

const HT8 = 'hoan-thanh-hang-dang-thuc-tong-hieu-lap-phuong';
const TG8 = 'tinh-gia-tri-bieu-thuc-tong-hieu-lap-phuong';
const RG8 = 'rut-gon-chung-minh-bay-hang-dang-thuc';

const B8: BankLesson = {
  slug: 'bai-8-tong-va-hieu-hai-lap-phuong',
  questions: [
    mc(1, HT8, r`Hằng đẳng thức tổng hai lập phương là \(a^3 + b^3 = \ldots\)`, [r`\((a + b)(a^2 - ab + b^2)\)`, r`\((a + b)(a^2 + ab + b^2)\)`, r`\((a + b)^3\)`, r`\((a + b)(a^2 + b^2)\)`], r`\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\).`, [
      undefined,
      'Thừa số thứ hai có hạng tử \\(-ab\\).',
      r`\((a + b)^3\) còn thêm \(3a^2b + 3ab^2\).`,
      r`Thiếu hạng tử \(-ab\).`,
    ]),
    mc(1, HT8, r`Hằng đẳng thức hiệu hai lập phương là \(a^3 - b^3 = \ldots\)`, [r`\((a - b)(a^2 + ab + b^2)\)`, r`\((a - b)(a^2 - ab + b^2)\)`, r`\((a - b)^3\)`, r`\((a - b)(a^2 + 2ab + b^2)\)`], r`\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\).`, [
      undefined,
      r`Hạng tử \(ab\) mang dấu cộng.`,
      r`\((a - b)^3\) còn thêm \(-3a^2b + 3ab^2\).`,
      r`Hạng tử giữa là \(ab\), không phải \(2ab\).`,
    ]),
    mc(1, HT8, r`Đa thức \(x^3 + 8\) bằng`, [r`\((x + 2)(x^2 - 2x + 4)\)`, r`\((x + 2)(x^2 + 2x + 4)\)`, r`\((x + 2)(x^2 - 4x + 4)\)`, r`\((x + 8)(x^2 - 8x + 64)\)`], r`\(x^3 + 8 = x^3 + 2^3 = (x + 2)(x^2 - 2x + 4)\).`, [
      undefined,
      r`Hạng tử giữa của thừa số thứ hai mang dấu trừ.`,
      r`Hạng tử giữa là \(x\cdot2 = 2x\).`,
      r`\(8 = 2^3\), số thứ hai là 2.`,
    ]),
    mc(1, HT8, r`Đa thức \(x^3 - 64\) bằng`, [r`\((x - 4)(x^2 + 4x + 16)\)`, r`\((x - 4)(x^2 - 4x + 16)\)`, r`\((x - 8)(x^2 + 8x + 64)\)`, r`\((x - 4)^3\)`], r`\(64 = 4^3\) nên \(x^3 - 64 = (x - 4)(x^2 + 4x + 16)\).`, [
      undefined,
      r`Với hiệu hai lập phương, hạng tử \(4x\) mang dấu cộng.`,
      r`\(64 = 4^3\), không phải \(8^3\).`,
      r`\((x - 4)^3 \ne x^3 - 64\).`,
    ]),
    mc(2, HT8, r`Viết \(27x^3 - 1\) dưới dạng tích.`, [r`\((3x - 1)(9x^2 + 3x + 1)\)`, r`\((3x - 1)(9x^2 - 3x + 1)\)`, r`\((3x - 1)(9x^2 + 6x + 1)\)`, r`\((3x - 1)(3x^2 + 3x + 1)\)`], r`\(27x^3 - 1 = (3x)^3 - 1^3 = (3x - 1)(9x^2 + 3x + 1)\).`, [
      undefined,
      'Hạng tử giữa mang dấu cộng.',
      r`Hạng tử giữa là \(3x\cdot1 = 3x\), không phải \(6x\).`,
      r`\((3x)^2 = 9x^2\).`,
    ]),
    mc(2, HT8, r`Kết quả của phép nhân \((x - 3)(x^2 + 3x + 9)\) là`, [r`\(x^3 - 27\)`, r`\(x^3 + 27\)`, r`\((x - 3)^3\)`, r`\(x^3 - 9\)`], r`Đây là hằng đẳng thức hiệu hai lập phương: \(x^3 - 3^3 = x^3 - 27\).`, [
      undefined,
      'Thừa số đầu là \\(x - 3\\) nên được hiệu.',
      'Đây không phải lập phương của một hiệu.',
      r`\(3^3 = 27\).`,
    ]),
    mc(2, HT8, r`Kết quả của phép nhân \((2x + y)(4x^2 - 2xy + y^2)\) là`, [r`\(8x^3 + y^3\)`, r`\(2x^3 + y^3\)`, r`\((2x + y)^3\)`, r`\(8x^3 - y^3\)`], r`\((2x + y)\left((2x)^2 - 2x\cdot y + y^2\right) = (2x)^3 + y^3 = 8x^3 + y^3\).`, [
      undefined,
      r`\((2x)^3 = 8x^3\).`,
      'Đây là tổng hai lập phương, không phải lập phương một tổng.',
      'Thừa số đầu là tổng nên kết quả là tổng.',
    ]),
    mc(2, TG8, r`Giá trị của biểu thức \((x + 1)(x^2 - x + 1)\) tại \(x = 3\) là`, [r`\(28\)`, r`\(26\)`, r`\(64\)`, r`\(10\)`], r`\((x + 1)(x^2 - x + 1) = x^3 + 1\). Tại \(x = 3\): \(27 + 1 = 28\).`, [
      undefined,
      r`Đó là \(x^3 - 1\).`,
      r`Đó là \((x + 1)^3\).`,
      r`Chỉ tính \(x^2 + 1\).`,
    ]),
    mc(3, TG8, r`Cho \(x - y = 1\) và \(xy = 6\). Giá trị của \(x^3 - y^3\) là`, [r`\(19\)`, r`\(7\)`, r`\(1\)`, r`\(-17\)`], r`\(x^2 + y^2 = (x - y)^2 + 2xy = 13\). \(x^3 - y^3 = (x - y)(x^2 + xy + y^2) = 1\cdot(13 + 6) = 19\).`, [
      undefined,
      r`Dùng nhầm \(x^2 - xy + y^2\).`,
      r`Đó là \((x - y)^3\).`,
      r`\(x^3 - y^3 = (x - y)^3 + 3xy(x - y)\): cộng chứ không trừ.`,
    ]),
    mc(3, TG8, r`Tính nhanh \(\dfrac{37^3 + 13^3}{37^2 - 37\cdot13 + 13^2}\).`, [r`\(50\)`, r`\(24\)`, r`\(481\)`, r`\(2500\)`], r`Tử bằng \((37 + 13)(37^2 - 37\cdot13 + 13^2)\) nên phân số bằng \(37 + 13 = 50\).`, [
      undefined,
      'Dùng nhầm hiệu \\(37 - 13\\).',
      'Đó là tích \\(37\\cdot13\\).',
      r`Đó là \(50^2\).`,
    ]),
    mc(3, RG8, r`Rút gọn \((x + 2)(x^2 - 2x + 4) - (x - 2)(x^2 + 2x + 4)\) được`, [r`\(16\)`, r`\(0\)`, r`\(2x^3\)`, r`\(2x^3 + 16\)`], r`\((x^3 + 8) - (x^3 - 8) = 16\).`, [
      undefined,
      r`Hai tích không bằng nhau: \(x^3 + 8\) và \(x^3 - 8\).`,
      'Đã cộng hai tích và bỏ sót hằng số.',
      'Đó là tổng hai tích.',
    ]),
    mc(3, RG8, r`Rút gọn \((x - 1)^3 - (x - 1)(x^2 + x + 1)\) được`, [r`\(-3x^2 + 3x\)`, r`\(0\)`, r`\(-3x^2 + 3x - 2\)`, r`\(3x^2 - 3x\)`], r`\((x^3 - 3x^2 + 3x - 1) - (x^3 - 1) = -3x^2 + 3x\).`, [
      undefined,
      r`\((x - 1)^3 \ne x^3 - 1\).`,
      r`\(-1 - (-1) = 0\): hằng số triệt tiêu.`,
      'Sai dấu khi bỏ ngoặc.',
    ]),
    mc(4, RG8, r`Cho \(a + b = 3\) và \(a^2 + b^2 = 5\). Giá trị của \(a^3 + b^3\) là`, [r`\(9\)`, r`\(15\)`, r`\(27\)`, r`\(21\)`], r`\(2ab = (a + b)^2 - (a^2 + b^2) = 9 - 5 = 4\) nên \(ab = 2\). \(a^3 + b^3 = (a + b)(a^2 - ab + b^2) = 3\cdot(5 - 2) = 9\).`, [
      undefined,
      r`Quên trừ \(ab\) trong thừa số thứ hai.`,
      r`Đó là \((a + b)^3\).`,
      r`Thừa số thứ hai là \(a^2 - ab + b^2\), không phải \(a^2 + ab + b^2\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, HT8, 'Xét tính đúng sai:', [
      [r`\(x^3 + 1 = (x + 1)(x^2 - x + 1)\).`, true, 'Tổng hai lập phương.'],
      [r`\(x^3 - 1 = (x - 1)(x^2 - x + 1)\).`, false, r`Đúng phải là \((x - 1)(x^2 + x + 1)\).`],
      [r`\(a^3 + b^3 = (a + b)^3\).`, false, r`\((a + b)^3 = a^3 + b^3 + 3ab(a + b)\).`],
      [r`\(8 - y^3 = (2 - y)(4 + 2y + y^2)\).`, true, r`Hiệu hai lập phương \(2^3 - y^3\).`],
    ]),
    tf(2, HT8, r`Cho \(P = (x - 2)(x^2 + 2x + 4)\).`, [
      [r`\(P = x^3 - 8\).`, true, 'Hiệu hai lập phương.'],
      [r`Tại \(x = 2\) thì \(P = 0\).`, true, r`\(8 - 8 = 0\).`],
      [r`Tại \(x = 0\) thì \(P = 8\).`, false, r`\(P(0) = -8\).`],
      [r`\(P = (x - 2)^3\).`, false, r`\((x - 2)^3 = x^3 - 6x^2 + 12x - 8\).`],
    ]),
    tf(2, HT8, 'Xét tính đúng sai:', [
      [r`\((x + 2)(x^2 - 2x + 4) = x^3 + 8\).`, true, 'Tổng hai lập phương.'],
      [r`\(x^2 - 2x + 4 = (x - 2)^2\).`, false, r`\((x - 2)^2 = x^2 - 4x + 4\).`],
      [r`\(x^2 - 2x + 4 > 0\) với mọi \(x\).`, true, r`\(x^2 - 2x + 4 = (x - 1)^2 + 3 \ge 3\).`],
      [r`\(125 + x^3 = (5 + x)(25 - 5x + x^2)\).`, true, r`Tổng hai lập phương \(5^3 + x^3\).`],
    ]),
    tf(2, TG8, 'Kiểm tra các kết quả tính nhanh:', [
      [r`\((10 + 1)(100 - 10 + 1) = 1001\).`, true, r`\(10^3 + 1^3\).`],
      [r`\((20 - 1)(400 + 20 + 1) = 7999\).`, true, r`\(20^3 - 1^3 = 8000 - 1\).`],
      [r`\(99^3 + 1 = 100\cdot(99^2 - 99 + 1)\).`, true, r`\(99^3 + 1^3 = (99 + 1)(99^2 - 99 + 1)\).`],
      [r`\(6^3 + 4^3 = 10^3\).`, false, r`\(216 + 64 = 280 \ne 1000\).`],
    ]),
    tf(3, TG8, r`Cho \(x + y = 5\) và \(xy = 4\).`, [
      [r`\(x^2 + y^2 = 17\).`, true, r`\(25 - 2\cdot4\).`],
      [r`\(x^3 + y^3 = 65\).`, true, r`\((x + y)^3 - 3xy(x + y) = 125 - 60\).`],
      [r`\(x^3 + y^3 = 125\).`, false, r`Đó là \((x + y)^3\).`],
      [r`\(x^2 - xy + y^2 = 13\).`, true, r`\(17 - 4 = 13\).`],
    ]),
    tf(3, RG8, r`Cho \(A = (x + 3)(x^2 - 3x + 9) - x^3\).`, [
      [r`\(A = 27\).`, true, r`\(x^3 + 27 - x^3\).`],
      [r`Giá trị của \(A\) phụ thuộc vào \(x\).`, false, r`\(A = 27\) với mọi \(x\).`],
      [r`\(A = (x + 3)^3 - x^3\).`, false, r`\((x + 3)(x^2 - 3x + 9) = x^3 + 27 \ne (x + 3)^3\).`],
      [r`\(A > 0\) với mọi \(x\).`, true, r`\(A = 27 > 0\).`],
    ]),
    tf(4, RG8, 'Xét tính đúng sai (với mọi \\(a\\), \\(b\\)):', [
      [r`\((a + b)^3 - 3ab(a + b) = a^3 + b^3\).`, true, r`Khai triển \((a + b)^3\) rồi rút gọn.`],
      [r`\(a^3 - b^3 = (a - b)^3 + 3ab(a - b)\).`, true, r`\((a - b)^3 = a^3 - b^3 - 3ab(a - b)\).`],
      [r`Nếu \(a + b = 0\) thì \(a^3 + b^3 = 0\).`, true, r`\(a^3 + b^3 = (a + b)(a^2 - ab + b^2) = 0\).`],
      [r`Nếu \(a = b\) thì \(a^3 - b^3 = 2a^3\).`, false, r`Khi \(a = b\) thì \(a^3 - b^3 = 0\).`],
    ]),
    tf(3, RG8, r`Cho \(B = (2x - 1)(4x^2 + 2x + 1) - 8x^3 + 5\).`, [
      [r`\(B = 4\).`, true, r`\(8x^3 - 1 - 8x^3 + 5\).`],
      [r`Giá trị của \(B\) không phụ thuộc vào \(x\).`, true, r`\(B = 4\) với mọi \(x\).`],
      [r`Tại \(x = 1\) thì \(B = 5\).`, false, r`\(B(1) = 4\).`],
      [r`\(B = -1\).`, false, r`\((2x - 1)(4x^2 + 2x + 1) = 8x^3 - 1\); cộng thêm 5 được 4.`],
    ]),
    tf(2, TG8, r`Cho \(Q = (x - 1)(x^2 + x + 1)\).`, [
      [r`Tại \(x = 1\) thì \(Q = 0\).`, true, r`\(Q = x^3 - 1\).`],
      [r`Tại \(x = 2\) thì \(Q = 7\).`, true, r`\(8 - 1 = 7\).`],
      [r`Tại \(x = -1\) thì \(Q = 0\).`, false, r`\((-1)^3 - 1 = -2\).`],
      [r`Tại \(x = 10\) thì \(Q = 999\).`, true, r`\(1000 - 1 = 999\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, TG8, r`Tính giá trị của \((x + 4)(x^2 - 4x + 16)\) tại \(x = -2\).`, '56', r`Biểu thức bằng \(x^3 + 64\). Tại \(x = -2\): \(-8 + 64 = 56\).`),
    sa(2, TG8, r`Tính \(15^3 + 5^3\) bằng cách dùng hằng đẳng thức tổng hai lập phương.`, '3500', r`\(15^3 + 5^3 = (15 + 5)(15^2 - 15\cdot5 + 5^2) = 20\cdot(225 - 75 + 25) = 20\cdot175 = 3500\).`),
    sa(3, TG8, r`Cho \(x + y = 6\) và \(xy = 8\). Tính \(x^3 + y^3\).`, '72', r`\(x^3 + y^3 = (x + y)^3 - 3xy(x + y) = 216 - 144 = 72\).`),
    sa(3, TG8, r`Cho \(x - y = 3\) và \(xy = 10\). Tính \(x^3 - y^3\).`, '117', r`\(x^3 - y^3 = (x - y)^3 + 3xy(x - y) = 27 + 90 = 117\).`),
    sa(3, RG8, r`Rút gọn biểu thức \((x + 1)(x^2 - x + 1) - (x - 1)(x^2 + x + 1)\).`, '2', r`\((x^3 + 1) - (x^3 - 1) = 2\).`),
    sa(3, RG8, r`Tìm \(x\) biết \((x + 2)(x^2 - 2x + 4) - x(x^2 - 3) = 20\).`, '4', r`\(x^3 + 8 - x^3 + 3x = 20 \iff 3x = 12 \iff x = 4\).`),
    sa(4, RG8, r`Cho \(a + b = 2\) và \(ab = -3\). Tính \(a^3 + b^3\).`, '26', r`\(a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 8 - 3\cdot(-3)\cdot2 = 8 + 18 = 26\).`),
    // ---- Tự luận ----
    es(2, HT8, r`Viết các đa thức sau dưới dạng tích: a) \(8x^3 + 27\); b) \(1 - 64y^3\).`, r`a) \(8x^3 + 27 = (2x)^3 + 3^3 = (2x + 3)(4x^2 - 6x + 9)\).
b) \(1 - 64y^3 = 1^3 - (4y)^3 = (1 - 4y)(1 + 4y + 16y^2)\).`, r`0,5 điểm: câu a, xác định đúng \(2x\), 3 và viết đúng tích.
0,5 điểm: câu b, xác định đúng \(1\), \(4y\) và viết đúng tích.`),
    es(3, RG8, r`Rút gọn biểu thức \(A = (x - 2)^3 - (x - 2)(x^2 + 2x + 4) + 6x^2\) rồi tính giá trị của \(A\) tại \(x = -\dfrac13\).`, r`\((x - 2)^3 = x^3 - 6x^2 + 12x - 8\); \((x - 2)(x^2 + 2x + 4) = x^3 - 8\).
\(A = x^3 - 6x^2 + 12x - 8 - x^3 + 8 + 6x^2 = 12x\).
Tại \(x = -\dfrac13\): \(A = -4\).`, r`0,5 điểm: dùng đúng hai hằng đẳng thức và rút gọn được \(A = 12x\).
0,5 điểm: thay số đúng, \(A = -4\).`),
    es(4, RG8, r`Cho ba số \(a\), \(b\), \(c\) thỏa mãn \(a + b + c = 0\). Chứng minh rằng \(a^3 + b^3 + c^3 = 3abc\).`, r`Từ \(a + b + c = 0\) suy ra \(a + b = -c\).
\(a^3 + b^3 = (a + b)^3 - 3ab(a + b) = -c^3 + 3abc\).
Do đó \(a^3 + b^3 + c^3 = -c^3 + 3abc + c^3 = 3abc\).`, r`0,5 điểm: viết được \(a^3 + b^3 = (a + b)^3 - 3ab(a + b)\) và thay \(a + b = -c\).
0,5 điểm: rút gọn và kết luận \(a^3 + b^3 + c^3 = 3abc\).`),
  ],
};

const DN = 'dat-nhan-tu-chung';
const HD = 'su-dung-hang-dang-thuc';
const NH = 'nhom-hang-tu';
const TB = 'tach-hang-tu-them-bot-hang-tu';
const TX9 = 'tim-x-phan-tich-nhan-tu';
const TG9 = 'tinh-gia-tri-phan-tich-nhan-tu';

const B9: BankLesson = {
  slug: 'bai-9-phan-tich-da-thuc-thanh-nhan-tu',
  questions: [
    mc(1, DN, r`Phân tích \(6x^2 - 9x\) thành nhân tử được`, [r`\(3x(2x - 3)\)`, r`\(3x(2x - 9)\)`, r`\(3x(2x + 3)\)`, r`\(6x(x - 9)\)`], r`Nhân tử chung là \(3x\): \(6x^2 - 9x = 3x\cdot2x - 3x\cdot3 = 3x(2x - 3)\).`, [
      undefined,
      r`\(9x : 3x = 3\), không phải 9.`,
      'Sai dấu trong ngoặc.',
      r`\(6x\) không phải nhân tử chung của \(9x\).`,
    ]),
    mc(1, DN, r`Nhân tử chung lớn nhất (có hệ số dương) của \(5x^2y - 10xy^2\) là`, [r`\(5xy\)`, r`\(5x\)`, r`\(10xy\)`, r`\(xy\)`], r`ƯCLN của 5 và 10 là 5; biến chung \(x\), \(y\) lấy số mũ nhỏ nhất. Nhân tử chung là \(5xy\) và \(5x^2y - 10xy^2 = 5xy(x - 2y)\).`, [
      undefined,
      r`Còn biến \(y\) chung.`,
      r`10 không phải ước của 5.`,
      'Còn thiếu hệ số chung 5.',
    ]),
    mc(2, DN, r`Phân tích \(x(x - 2) + 3(x - 2)\) thành nhân tử được`, [r`\((x - 2)(x + 3)\)`, r`\((x - 2)(x - 3)\)`, r`\((x + 2)(x + 3)\)`, r`\(3x(x - 2)\)`], r`Nhân tử chung \(x - 2\): \(x(x - 2) + 3(x - 2) = (x - 2)(x + 3)\).`, [
      undefined,
      r`Sai dấu của 3.`,
      r`Nhân tử chung là \(x - 2\).`,
      'Đã nhân \\(x\\) với 3 thay vì cộng.',
    ]),
    mc(2, DN, r`Phân tích \(2x(x - 5) - (5 - x)\) thành nhân tử được`, [r`\((x - 5)(2x + 1)\)`, r`\((x - 5)(2x - 1)\)`, r`\((5 - x)(2x - 1)\)`, r`\((x + 5)(2x + 1)\)`], r`\(-(5 - x) = x - 5\) nên \(2x(x - 5) + (x - 5) = (x - 5)(2x + 1)\).`, [
      undefined,
      r`Chưa đổi dấu \(-(5 - x) = +(x - 5)\).`,
      'Sai dấu cả hai thừa số.',
      r`Nhân tử chung là \(x - 5\).`,
    ]),
    mc(2, HD, r`Phân tích \(x^2 - 10x + 25\) thành nhân tử được`, [r`\((x - 5)^2\)`, r`\((x + 5)^2\)`, r`\((x - 5)(x + 5)\)`, r`\((x - 25)^2\)`], r`\(x^2 - 2\cdot x\cdot5 + 5^2 = (x - 5)^2\).`, [
      undefined,
      'Hạng tử giữa mang dấu trừ.',
      r`\((x - 5)(x + 5) = x^2 - 25\).`,
      r`\(25 = 5^2\).`,
    ]),
    mc(2, HD, r`Phân tích \(4x^2 - 9y^2\) thành nhân tử được`, [r`\((2x - 3y)(2x + 3y)\)`, r`\((2x - 3y)^2\)`, r`\((4x - 9y)(4x + 9y)\)`, r`\((2x - 9y)(2x + 9y)\)`], r`\(4x^2 - 9y^2 = (2x)^2 - (3y)^2 = (2x - 3y)(2x + 3y)\).`, [
      undefined,
      'Đó là bình phương của một hiệu.',
      r`\(4x^2 = (2x)^2\), không phải \((4x)^2\).`,
      r`\(9y^2 = (3y)^2\).`,
    ]),
    mc(3, HD, r`Phân tích \((x + 1)^2 - 16\) thành nhân tử được`, [r`\((x - 3)(x + 5)\)`, r`\((x + 3)(x - 5)\)`, r`\((x - 15)(x + 17)\)`, r`\((x - 4)(x + 4)\)`], r`\((x + 1)^2 - 4^2 = (x + 1 - 4)(x + 1 + 4) = (x - 3)(x + 5)\).`, [
      undefined,
      'Sai dấu trong hai thừa số.',
      r`\(16 = 4^2\), không dùng 16.`,
      r`Bỏ sót \(+1\) trong \(x + 1\).`,
    ]),
    mc(2, NH, r`Phân tích \(x^2 - xy + x - y\) thành nhân tử được`, [r`\((x - y)(x + 1)\)`, r`\((x + y)(x - 1)\)`, r`\((x - y)(x - 1)\)`, r`\((x + y)(x + 1)\)`], r`\((x^2 - xy) + (x - y) = x(x - y) + (x - y) = (x - y)(x + 1)\).`, [
      undefined,
      'Sai dấu cả hai thừa số.',
      r`Nhóm \((x - y)\) thứ hai có hệ số \(+1\).`,
      r`Nhân tử chung là \(x - y\).`,
    ]),
    mc(3, NH, r`Phân tích \(x^2 - 2x + 1 - y^2\) thành nhân tử được`, [r`\((x - 1 - y)(x - 1 + y)\)`, r`\((x + 1 - y)(x + 1 + y)\)`, r`\((x - 1 - y)^2\)`, r`\((x - y)(x + y) - 1\)`], r`Nhóm \((x^2 - 2x + 1) - y^2 = (x - 1)^2 - y^2 = (x - 1 - y)(x - 1 + y)\).`, [
      undefined,
      r`\(x^2 - 2x + 1 = (x - 1)^2\), không phải \((x + 1)^2\).`,
      'Hiệu hai bình phương cho tích của hai thừa số khác nhau.',
      'Biểu thức này chưa phải dạng tích và khác đa thức đã cho.',
    ]),
    mc(4, TB, r`Phân tích \(x^2 - 5x + 6\) thành nhân tử được`, [r`\((x - 2)(x - 3)\)`, r`\((x + 2)(x + 3)\)`, r`\((x - 1)(x - 6)\)`, r`\((x + 1)(x - 6)\)`], r`Tách \(-5x = -2x - 3x\): \(x^2 - 2x - 3x + 6 = x(x - 2) - 3(x - 2) = (x - 2)(x - 3)\).`, [
      undefined,
      r`Tích này bằng \(x^2 + 5x + 6\).`,
      r`Tích này bằng \(x^2 - 7x + 6\).`,
      r`Tích này bằng \(x^2 - 5x - 6\).`,
    ]),
    mc(3, TX9, r`Các giá trị của \(x\) thỏa mãn \(x^2 - 4x = 0\) là`, [r`\(x = 0\) hoặc \(x = 4\)`, r`\(x = 4\)`, r`\(x = 0\) hoặc \(x = -4\)`, r`\(x = 2\) hoặc \(x = -2\)`], r`\(x^2 - 4x = x(x - 4) = 0\) nên \(x = 0\) hoặc \(x = 4\).`, [
      undefined,
      r`Không được chia hai vế cho \(x\) (làm mất nghiệm \(x = 0\)).`,
      'Sai dấu nghiệm thứ hai.',
      r`Nhầm với \(x^2 - 4 = 0\).`,
    ]),
    mc(2, TG9, r`Tính nhanh \(37\cdot64 + 37\cdot36\).`, [r`\(3700\)`, r`\(370\)`, r`\(37\,000\)`, r`\(2368\)`], r`\(37\cdot64 + 37\cdot36 = 37\cdot(64 + 36) = 37\cdot100 = 3700\).`, [
      undefined,
      r`\(64 + 36 = 100\), không phải 10.`,
      r`\(37\cdot100 = 3700\).`,
      r`Mới tính \(37\cdot64\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, DN, 'Xét tính đúng sai của các phân tích sau:', [
      [r`\(3x + 6 = 3(x + 2)\).`, true, 'Nhân tử chung 3.'],
      [r`\(x^2 + x = x(x + 1)\).`, true, r`Nhân tử chung \(x\).`],
      [r`\(4x^2 - 2x = 2x(2x - 2)\).`, false, r`Đúng phải là \(2x(2x - 1)\).`],
      [r`\(5x^3 - 10x^2 = 5x^2(x - 2)\).`, true, r`Nhân tử chung \(5x^2\).`],
    ]),
    tf(2, DN, 'Xét tính đúng sai của các phân tích sau:', [
      [r`\(a(x - y) - b(y - x) = (x - y)(a + b)\).`, true, r`\(-b(y - x) = b(x - y)\).`],
      [r`\(x(x - 1) - (x - 1) = (x - 1)^2\).`, true, r`\((x - 1)(x - 1)\).`],
      [r`\(2(x + 3) + x(x + 3) = (x + 3)(x + 2)\).`, true, r`Nhân tử chung \(x + 3\).`],
      [r`\(3x(x - 2) - 6(2 - x) = 3(x - 2)^2\).`, false, r`\(3x(x - 2) + 6(x - 2) = 3(x - 2)(x + 2)\).`],
    ]),
    tf(2, HD, 'Xét tính đúng sai của các phân tích sau:', [
      [r`\(x^2 - 1 = (x - 1)(x + 1)\).`, true, 'Hiệu hai bình phương.'],
      [r`\(x^2 + 4 = (x + 2)^2\).`, false, r`\((x + 2)^2 = x^2 + 4x + 4\).`],
      [r`\(x^3 - 1 = (x - 1)(x^2 + x + 1)\).`, true, 'Hiệu hai lập phương.'],
      [r`\(9 - 6x + x^2 = (3 - x)^2\).`, true, 'Bình phương của một hiệu.'],
    ]),
    tf(3, HD, r`Phân tích \(16x^2 - (x - 3)^2\) thành nhân tử.`, [
      [r`\(16x^2 - (x - 3)^2 = (4x - x + 3)(4x + x - 3)\).`, true, r`\((4x)^2 - (x - 3)^2\); chú ý đổi dấu khi bỏ ngoặc.`],
      [r`Kết quả bằng \((3x + 3)(5x - 3)\).`, true, r`\(4x - x + 3 = 3x + 3\); \(4x + x - 3 = 5x - 3\).`],
      [r`Kết quả bằng \(3(x + 1)(5x - 3)\).`, true, r`\(3x + 3 = 3(x + 1)\).`],
      [r`Kết quả bằng \((3x - 3)(5x + 3)\).`, false, r`Sai dấu khi bỏ ngoặc \(-(x - 3)\).`],
    ]),
    tf(2, NH, 'Xét tính đúng sai của các phân tích sau:', [
      [r`\(xy + x + y + 1 = (x + 1)(y + 1)\).`, true, r`\(x(y + 1) + (y + 1)\).`],
      [r`\(ax - ay + bx - by = (a + b)(x - y)\).`, true, r`\(a(x - y) + b(x - y)\).`],
      [r`\(x^2 - 3x + xy - 3y = (x - 3)(x + y)\).`, true, r`\(x(x - 3) + y(x - 3)\).`],
      [r`\(x^2 + 2x + 1 - y^2 = (x + 1 - y)^2\).`, false, r`Đúng là \((x + 1 - y)(x + 1 + y)\).`],
    ]),
    tf(3, NH, r`Cho \(A = x^3 - x^2 - 4x + 4\).`, [
      [r`\(A = (x - 1)(x^2 - 4)\).`, true, r`\(x^2(x - 1) - 4(x - 1)\).`],
      [r`\(A = (x - 1)(x - 2)(x + 2)\).`, true, r`\(x^2 - 4 = (x - 2)(x + 2)\).`],
      [r`\(A = 0\) tại \(x = -2\).`, true, r`Thừa số \(x + 2 = 0\).`],
      [r`\(A = 0\) tại \(x = 4\).`, false, r`\(A(4) = 3\cdot2\cdot6 = 36\).`],
    ]),
    tf(3, TX9, r`Xét đẳng thức \(x^3 - 9x = 0\).`, [
      [r`Vế trái bằng \(x(x - 3)(x + 3)\).`, true, r`\(x(x^2 - 9)\).`],
      [r`\(x = 3\) thỏa mãn.`, true, r`\(27 - 27 = 0\).`],
      [r`Có đúng hai giá trị của \(x\) thỏa mãn.`, false, r`Có ba giá trị: \(0\); \(3\); \(-3\).`],
      [r`\(x = 9\) thỏa mãn.`, false, r`\(729 - 81 \ne 0\).`],
    ]),
    tf(3, TG9, r`Cho \(B = x^2 - 2xy + y^2\) với \(x = 57\), \(y = 7\).`, [
      [r`\(B = (x - y)^2\).`, true, 'Bình phương của một hiệu.'],
      [r`\(B = 2500\).`, true, r`\((57 - 7)^2 = 50^2\).`],
      [r`\(B = 3250\).`, false, r`Tính đúng là 2500.`],
      [r`\(B = 50\).`, false, 'Quên bình phương.'],
    ]),
    tf(4, TB, 'Xét tính đúng sai của các phân tích (tách hoặc thêm bớt hạng tử):', [
      [r`\(x^2 + 3x + 2 = (x + 1)(x + 2)\).`, true, r`Tách \(3x = x + 2x\).`],
      [r`\(x^2 - x - 6 = (x - 3)(x + 2)\).`, true, r`Tách \(-x = -3x + 2x\).`],
      [r`\(x^4 + 4 = (x^2 + 2)^2 - 4x^2\).`, true, r`Thêm bớt \(4x^2\).`],
      [r`\(x^4 + 4 = (x^2 + 2)^2\).`, false, r`\((x^2 + 2)^2 = x^4 + 4x^2 + 4\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(3, TG9, r`Tính nhanh giá trị của \(x^2 - y^2\) tại \(x = 87{,}5\) và \(y = 12{,}5\).`, '7500', r`\(x^2 - y^2 = (x - y)(x + y) = 75\cdot100 = 7500\).`),
    sa(3, TX9, r`Tìm tất cả các giá trị của \(x\) thỏa mãn \(2x(x - 3) - (3 - x) = 0\). (Viết các giá trị cách nhau bởi dấu ";")`, 'x = 3; x = -1/2', r`\(2x(x - 3) + (x - 3) = (x - 3)(2x + 1) = 0\) nên \(x = 3\) hoặc \(x = -\dfrac12\).`),
    // ---- Tự luận ----
    es(2, DN, r`Phân tích các đa thức sau thành nhân tử:
a) \(12x^3y - 18x^2y^2\); b) \(3x(x - 2y) + 6y(2y - x)\).`, r`a) \(12x^3y - 18x^2y^2 = 6x^2y(2x - 3y)\).
b) \(3x(x - 2y) - 6y(x - 2y) = 3(x - 2y)(x - 2y) = 3(x - 2y)^2\).`, r`0,5 điểm: câu a, tìm đúng nhân tử chung \(6x^2y\).
0,5 điểm: câu b, đổi dấu đúng và viết được \(3(x - 2y)^2\).`),
    es(3, NH, r`Phân tích các đa thức sau thành nhân tử:
a) \(x^2 - 2xy + y^2 - 9\); b) \(x^3 + 2x^2 + x - xy^2\).`, r`a) \((x - y)^2 - 3^2 = (x - y - 3)(x - y + 3)\).
b) \(x(x^2 + 2x + 1 - y^2) = x\left[(x + 1)^2 - y^2\right] = x(x + 1 - y)(x + 1 + y)\).`, r`0,5 điểm: câu a, nhóm đúng và dùng hiệu hai bình phương.
0,5 điểm: câu b, đặt nhân tử chung \(x\) rồi phân tích hết.`),
    es(3, TX9, r`Tìm \(x\), biết: a) \(5x(x - 1) = x - 1\); b) \(x^3 - 4x = 0\).`, r`a) \(5x(x - 1) - (x - 1) = 0 \iff (x - 1)(5x - 1) = 0 \iff x = 1\) hoặc \(x = \dfrac15\).
b) \(x(x - 2)(x + 2) = 0 \iff x = 0\); \(x = 2\) hoặc \(x = -2\).`, r`0,5 điểm: câu a, chuyển vế, phân tích và tìm đủ hai giá trị (không chia hai vế cho \(x - 1\)).
0,5 điểm: câu b, phân tích đúng và tìm đủ ba giá trị.`),
    es(4, TB, r`Phân tích các đa thức sau thành nhân tử: a) \(x^2 - 7x + 12\); b) \(x^4 + 64\).`, r`a) Tách \(-7x = -3x - 4x\): \(x^2 - 3x - 4x + 12 = x(x - 3) - 4(x - 3) = (x - 3)(x - 4)\).
b) Thêm bớt \(16x^2\): \(x^4 + 16x^2 + 64 - 16x^2 = (x^2 + 8)^2 - (4x)^2 = (x^2 - 4x + 8)(x^2 + 4x + 8)\).`, r`0,5 điểm: câu a, tách đúng hạng tử và phân tích đúng.
0,5 điểm: câu b, thêm bớt \(16x^2\) và dùng hiệu hai bình phương.`),
  ],
};

export const BANK_CHUONG_2: BankLesson[] = [B6, B7, B8, B9];
