/**
 * Ngân hàng câu hỏi mẫu Toán 8 (tự biên soạn, đủ 5 hình thức) – giáo viên có thể sửa, ẩn hoặc xóa.
 */
import type { QuestionType } from '../shared/grading';

const r = String.raw;

export interface SeedQuestion {
  lesson: string;
  topic?: number; // chỉ số dạng toán trong bài (bắt đầu 0)
  type: QuestionType;
  level: 1 | 2 | 3 | 4;
  stem: string;
  options?: [string, string, string, string]; // A–D
  correct?: 'A' | 'B' | 'C' | 'D';
  statements?: [string, boolean][]; // a–d
  accepted?: string[];
  unit?: string;
  figure?: string;
  solution: string;
  hint?: string;
}

export const TOAN8_QUESTIONS: SeedQuestion[] = [
  // ---------- Bài 1. Đơn thức ----------
  {
    lesson: 'bai-1-don-thuc',
    topic: 0,
    type: 'mcq',
    level: 1,
    stem: 'Biểu thức nào sau đây là đơn thức?',
    options: [r`\(x + 1\)`, r`\(-\dfrac{2}{3}x^2y\)`, r`\(\dfrac{1}{x}\)`, r`\(2x - y\)`],
    correct: 'B',
    solution: r`Chỉ \(-\dfrac{2}{3}x^2y\) là tích của một số với các biến. Các biểu thức còn lại có phép cộng, phép trừ hoặc có biến ở mẫu.`,
  },
  {
    lesson: 'bai-1-don-thuc',
    topic: 2,
    type: 'mcq',
    level: 2,
    stem: r`Bậc của đơn thức \(-5x^3y^2z\) là`,
    options: ['3', '5', '6', r`\(-5\)`],
    correct: 'C',
    solution: r`Bậc bằng tổng số mũ của các biến: \(3 + 2 + 1 = 6\).`,
  },
  {
    lesson: 'bai-1-don-thuc',
    topic: 1,
    type: 'short_answer',
    level: 2,
    stem: r`Thu gọn đơn thức \(A = 2x^2y \cdot (-3)xy^2\) rồi cho biết hệ số của \(A\).`,
    accepted: ['-6'],
    solution: r`\(A = 2 \cdot (-3) \cdot x^2 \cdot x \cdot y \cdot y^2 = -6x^3y^3\). Hệ số của \(A\) là \(-6\).`,
    hint: 'Nhân các hệ số với nhau trước.',
  },
  {
    lesson: 'bai-1-don-thuc',
    topic: 3,
    type: 'true_false',
    level: 2,
    stem: r`Cho các đơn thức \(A = 3x^2y\), \(B = -\dfrac{1}{2}x^2y\), \(C = 3xy^2\).`,
    statements: [
      [r`\(A\) và \(B\) là hai đơn thức đồng dạng.`, true],
      [r`\(A\) và \(C\) là hai đơn thức đồng dạng.`, false],
      [r`\(A + B = \dfrac{5}{2}x^2y\).`, true],
      [r`Đơn thức \(C\) có bậc 2.`, false],
    ],
    solution: r`\(A\), \(B\) cùng phần biến \(x^2y\) nên đồng dạng; \(C\) có phần biến \(xy^2\) khác \(x^2y\).
\(A + B = \left(3 - \dfrac{1}{2}\right)x^2y = \dfrac{5}{2}x^2y\). Đơn thức \(C\) có bậc \(1 + 2 = 3\).`,
  },
  // ---------- Bài 2. Đa thức ----------
  {
    lesson: 'bai-2-da-thuc',
    topic: 2,
    type: 'mcq',
    level: 1,
    stem: r`Bậc của đa thức \(P = x^4 - 3x^2y^3 + 2xy - 7\) là`,
    options: ['4', '5', '7', '2'],
    correct: 'B',
    solution: r`Hạng tử \(-3x^2y^3\) có bậc \(2 + 3 = 5\), là bậc cao nhất trong các hạng tử. Vậy \(P\) có bậc 5.`,
  },
  {
    lesson: 'bai-2-da-thuc',
    topic: 3,
    type: 'short_answer',
    level: 2,
    stem: r`Tính giá trị của đa thức \(Q = x^2 - 2xy + y^2\) tại \(x = 3\), \(y = -1\).`,
    accepted: ['16'],
    solution: r`\(Q = 3^2 - 2 \cdot 3 \cdot (-1) + (-1)^2 = 9 + 6 + 1 = 16\).`,
  },
  // ---------- Bài 3 ----------
  {
    lesson: 'bai-3-phep-cong-va-phep-tru-da-thuc',
    topic: 0,
    type: 'mcq',
    level: 2,
    stem: r`Cho \(A = 2x^2 - 3xy + 1\) và \(B = x^2 + xy - 4\). Đa thức \(A - B\) bằng`,
    options: [r`\(x^2 - 2xy - 3\)`, r`\(x^2 - 4xy + 5\)`, r`\(3x^2 - 2xy - 3\)`, r`\(x^2 - 4xy - 3\)`],
    correct: 'B',
    solution: r`\(A - B = 2x^2 - 3xy + 1 - x^2 - xy + 4 = x^2 - 4xy + 5\).`,
  },
  {
    lesson: 'bai-3-phep-cong-va-phep-tru-da-thuc',
    topic: 1,
    type: 'essay',
    level: 3,
    stem: r`Tìm đa thức \(M\) biết \(M - \left(3x^2y - 2xy^2 + 1\right) = x^2y + xy^2 - 4\).`,
    solution: r`\(M = \left(x^2y + xy^2 - 4\right) + \left(3x^2y - 2xy^2 + 1\right) = 4x^2y - xy^2 - 3\).`,
  },
  // ---------- Bài 4 ----------
  {
    lesson: 'bai-4-phep-nhan-da-thuc',
    topic: 2,
    type: 'mcq',
    level: 2,
    stem: r`Kết quả của phép nhân \((x - 2)(x + 3)\) là`,
    options: [r`\(x^2 + x - 6\)`, r`\(x^2 - x - 6\)`, r`\(x^2 + 5x - 6\)`, r`\(x^2 - 6\)`],
    correct: 'A',
    solution: r`\((x - 2)(x + 3) = x^2 + 3x - 2x - 6 = x^2 + x - 6\).`,
  },
  {
    lesson: 'bai-4-phep-nhan-da-thuc',
    topic: 3,
    type: 'true_false',
    level: 3,
    stem: r`Cho biểu thức \(P = (x + 1)(x - 1) - x(x - 2)\).`,
    statements: [
      [r`\(P = 2x - 1\).`, true],
      [r`Giá trị của \(P\) tại \(x = 0\) bằng 1.`, false],
      [r`\(P = 0\) khi \(x = \dfrac{1}{2}\).`, true],
      [r`Giá trị của \(P\) không phụ thuộc vào \(x\).`, false],
    ],
    solution: r`\(P = x^2 - 1 - x^2 + 2x = 2x - 1\). Tại \(x = 0\): \(P = -1\). \(P = 0 \Leftrightarrow x = \dfrac{1}{2}\). \(P\) phụ thuộc vào \(x\).`,
  },
  {
    lesson: 'bai-4-phep-nhan-da-thuc',
    topic: 1,
    type: 'short_answer',
    level: 3,
    stem: r`Tìm \(x\) biết \(x(x + 2) - x^2 = 10\).`,
    accepted: ['5'],
    solution: r`\(x^2 + 2x - x^2 = 10 \Leftrightarrow 2x = 10 \Leftrightarrow x = 5\).`,
  },
  // ---------- Bài 5 ----------
  {
    lesson: 'bai-5-phep-chia-da-thuc-cho-don-thuc',
    topic: 0,
    type: 'mcq',
    level: 1,
    stem: r`Kết quả của phép chia \(15x^4y^3 : 5x^2y\) là`,
    options: [r`\(3x^2y^2\)`, r`\(3x^2y^3\)`, r`\(10x^2y^2\)`, r`\(3x^6y^4\)`],
    correct: 'A',
    solution: r`\(15x^4y^3 : 5x^2y = 3x^{4-2}y^{3-1} = 3x^2y^2\).`,
  },
  {
    lesson: 'bai-5-phep-chia-da-thuc-cho-don-thuc',
    topic: 1,
    type: 'short_answer',
    level: 2,
    stem: r`Cho \(\left(6x^3y^2 - 9x^2y^2 + 3xy^2\right) : 3xy^2 = ax^2 + bx + c\). Tính \(a + b + c\).`,
    accepted: ['0'],
    solution: r`Thương bằng \(2x^2 - 3x + 1\) nên \(a = 2\), \(b = -3\), \(c = 1\) và \(a + b + c = 0\).`,
  },
  // ---------- Bài 6 ----------
  {
    lesson: 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu',
    topic: 0,
    type: 'mcq',
    level: 1,
    stem: r`Khai triển \((x + 3)^2\) được`,
    options: [r`\(x^2 + 9\)`, r`\(x^2 + 3x + 9\)`, r`\(x^2 + 6x + 9\)`, r`\(x^2 + 6x + 3\)`],
    correct: 'C',
    solution: r`\((x + 3)^2 = x^2 + 2 \cdot x \cdot 3 + 3^2 = x^2 + 6x + 9\).`,
  },
  {
    lesson: 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu',
    topic: 1,
    type: 'short_answer',
    level: 2,
    stem: r`Tính nhanh \(98 \cdot 102\).`,
    accepted: ['9996'],
    solution: r`\(98 \cdot 102 = (100 - 2)(100 + 2) = 100^2 - 2^2 = 9\,996\).`,
  },
  {
    lesson: 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu',
    topic: 0,
    type: 'true_false',
    level: 2,
    stem: 'Xét tính đúng, sai của các khẳng định sau.',
    statements: [
      [r`\((a - b)^2 = (b - a)^2\) với mọi \(a\), \(b\).`, true],
      [r`\(a^2 - b^2 = (a - b)^2\) với mọi \(a\), \(b\).`, false],
      [r`\(x^2 - 10x + 25 = (x - 5)^2\).`, true],
      [r`\((2x + 1)^2 = 4x^2 + 2x + 1\).`, false],
    ],
    solution: r`\((a - b)^2 = (b - a)^2\) đúng. \(a^2 - b^2 = (a - b)(a + b)\), nói chung khác \((a - b)^2\). \(x^2 - 10x + 25 = (x - 5)^2\) đúng. \((2x + 1)^2 = 4x^2 + 4x + 1\).`,
  },
  {
    lesson: 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu',
    topic: 2,
    type: 'short_answer',
    level: 4,
    stem: r`Tìm giá trị nhỏ nhất của biểu thức \(A = x^2 - 6x + 11\).`,
    accepted: ['2'],
    solution: r`\(A = x^2 - 6x + 9 + 2 = (x - 3)^2 + 2 \ge 2\). Dấu bằng xảy ra khi \(x = 3\). Giá trị nhỏ nhất của \(A\) là 2.`,
    hint: r`Viết \(A\) dưới dạng \((x - a)^2 + b\).`,
  },
  // ---------- Bài 7 ----------
  {
    lesson: 'bai-7-lap-phuong-cua-mot-tong-lap-phuong-cua-mot-hieu',
    topic: 0,
    type: 'mcq',
    level: 2,
    stem: r`Biểu thức \(x^3 - 6x^2 + 12x - 8\) bằng`,
    options: [r`\((x - 2)^3\)`, r`\((x + 2)^3\)`, r`\((x - 8)^3\)`, r`\((2 - x)^3\)`],
    correct: 'A',
    solution: r`\(x^3 - 6x^2 + 12x - 8 = x^3 - 3 \cdot x^2 \cdot 2 + 3 \cdot x \cdot 2^2 - 2^3 = (x - 2)^3\).`,
  },
  {
    lesson: 'bai-7-lap-phuong-cua-mot-tong-lap-phuong-cua-mot-hieu',
    topic: 1,
    type: 'short_answer',
    level: 3,
    stem: r`Tính giá trị của biểu thức \(x^3 + 3x^2 + 3x + 1\) tại \(x = 9\).`,
    accepted: ['1000'],
    solution: r`\(x^3 + 3x^2 + 3x + 1 = (x + 1)^3\). Tại \(x = 9\): \((9 + 1)^3 = 1\,000\).`,
  },
  // ---------- Bài 8 ----------
  {
    lesson: 'bai-8-tong-va-hieu-hai-lap-phuong',
    topic: 0,
    type: 'mcq',
    level: 2,
    stem: r`\(x^3 - 27\) bằng`,
    options: [r`\((x - 3)\left(x^2 + 3x + 9\right)\)`, r`\((x - 3)\left(x^2 - 3x + 9\right)\)`, r`\((x - 3)^3\)`, r`\((x + 3)\left(x^2 - 3x + 9\right)\)`],
    correct: 'A',
    solution: r`\(x^3 - 27 = x^3 - 3^3 = (x - 3)\left(x^2 + 3x + 9\right)\).`,
  },
  {
    lesson: 'bai-8-tong-va-hieu-hai-lap-phuong',
    topic: 2,
    type: 'essay',
    level: 3,
    stem: r`Rút gọn biểu thức \(A = (x + 2)\left(x^2 - 2x + 4\right) - (x - 1)\left(x^2 + x + 1\right)\).`,
    solution: r`\(A = \left(x^3 + 8\right) - \left(x^3 - 1\right) = 9\).`,
  },
  // ---------- Bài 9 ----------
  {
    lesson: 'bai-9-phan-tich-da-thuc-thanh-nhan-tu',
    topic: 1,
    type: 'mcq',
    level: 2,
    stem: r`Phân tích \(x^2 - 9\) thành nhân tử được`,
    options: [r`\((x - 3)^2\)`, r`\((x - 9)(x + 1)\)`, r`\((x - 3)(x + 3)\)`, r`\((x - 3)(x + 9)\)`],
    correct: 'C',
    solution: r`\(x^2 - 9 = x^2 - 3^2 = (x - 3)(x + 3)\).`,
  },
  {
    lesson: 'bai-9-phan-tich-da-thuc-thanh-nhan-tu',
    topic: 3,
    type: 'short_answer',
    level: 3,
    stem: r`Tìm \(x > 0\) biết \(x^3 - 16x = 0\).`,
    accepted: ['4'],
    solution: r`\(x^3 - 16x = x\left(x^2 - 16\right) = x(x - 4)(x + 4) = 0\). Với \(x > 0\) ta được \(x = 4\).`,
  },
  {
    lesson: 'bai-9-phan-tich-da-thuc-thanh-nhan-tu',
    topic: 2,
    type: 'true_false',
    level: 3,
    stem: r`Cho đa thức \(P = x^2 - 2xy + y^2 - 4\).`,
    statements: [
      [r`\(P = (x - y)^2 - 4\).`, true],
      [r`\(P = (x - y - 2)(x - y + 2)\).`, true],
      [r`Tại \(x = 5\), \(y = 3\) thì \(P = 4\).`, false],
      [r`Nếu \(x - y = 2\) thì \(P = 0\).`, true],
    ],
    solution: r`\(P = (x - y)^2 - 2^2 = (x - y - 2)(x - y + 2)\). Tại \(x = 5\), \(y = 3\): \(P = 2^2 - 4 = 0\). Nếu \(x - y = 2\) thì \(P = 4 - 4 = 0\).`,
  },
  {
    lesson: 'bai-9-phan-tich-da-thuc-thanh-nhan-tu',
    topic: 5,
    type: 'essay',
    level: 4,
    stem: r`Phân tích đa thức \(x^2 - 5x + 6\) thành nhân tử bằng phương pháp tách hạng tử.`,
    solution: r`\(x^2 - 5x + 6 = x^2 - 2x - 3x + 6 = x(x - 2) - 3(x - 2) = (x - 2)(x - 3)\).`,
  },
  // ---------- Bài 10. Tứ giác ----------
  {
    lesson: 'bai-10-tu-giac',
    topic: 0,
    type: 'short_answer',
    level: 2,
    stem: r`Tứ giác \(ABCD\) có \(\widehat{A} = 65^\circ\), \(\widehat{B} = 117^\circ\), \(\widehat{C} = 71^\circ\). Số đo góc \(D\) bằng bao nhiêu độ?`,
    accepted: ['107'],
    unit: '°',
    solution: r`\(\widehat{D} = 360^\circ - \left(65^\circ + 117^\circ + 71^\circ\right) = 107^\circ\).`,
  },
  {
    lesson: 'bai-10-tu-giac',
    topic: 0,
    type: 'geometry_essay',
    level: 3,
    stem: r`Cho tứ giác \(ABCD\) như hình vẽ, có \(\widehat{A} = 80^\circ\), \(\widehat{B} = 100^\circ\) và \(\widehat{C} = 2\widehat{D}\). Tính số đo các góc \(C\) và \(D\).`,
    figure: `A(0,0) B(5,0) C(6.2,3.4) D(0.8,3)
ABCDA
goc(D,A,B) goc(A,B,C)`,
    solution: r`Ta có \(\widehat{C} + \widehat{D} = 360^\circ - \left(80^\circ + 100^\circ\right) = 180^\circ\).
Mà \(\widehat{C} = 2\widehat{D}\) nên \(3\widehat{D} = 180^\circ\), suy ra \(\widehat{D} = 60^\circ\) và \(\widehat{C} = 120^\circ\).`,
  },
  // ---------- Bài 11. Hình thang cân ----------
  {
    lesson: 'bai-11-hinh-thang-can',
    topic: 2,
    type: 'geometry_essay',
    level: 3,
    stem: r`Cho hình thang cân \(ABCD\) (\(AB \parallel CD\), \(AB < CD\)). Kẻ các đường cao \(AH\) và \(BK\) (\(H, K\) thuộc \(CD\)). Chứng minh \(DH = CK\).`,
    figure: `A(1.6,3) B(4.4,3) C(6,0) D(0,0) H(1.6,0) K(4.4,0)
ABCDA
AH:dash BK:dash
vuong(A,H,D) vuong(B,K,C)`,
    solution: r`Xét \(\triangle AHD\) và \(\triangle BKC\) lần lượt vuông tại \(H\) và \(K\), có:
- \(AD = BC\) (hai cạnh bên của hình thang cân);
- \(\widehat{D} = \widehat{C}\) (hai góc kề đáy lớn của hình thang cân).
Do đó \(\triangle AHD = \triangle BKC\) (cạnh huyền – góc nhọn), suy ra \(DH = CK\).`,
  },
  // ---------- Bài 35. Pythagore ----------
  {
    lesson: 'bai-35-dinh-li-pythagore-va-ung-dung',
    topic: 0,
    type: 'short_answer',
    level: 2,
    stem: r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\) cm, \(AC = 8\) cm. Độ dài cạnh \(BC\) bằng bao nhiêu xăng-ti-mét?`,
    accepted: ['10'],
    unit: 'cm',
    figure: `A(0,0) B(0,3) C(4,0)
ABCA
vuong(B,A,C)`,
    solution: r`\(BC^2 = AB^2 + AC^2 = 36 + 64 = 100\), suy ra \(BC = 10\) cm.`,
  },
  {
    lesson: 'bai-35-dinh-li-pythagore-va-ung-dung',
    topic: 1,
    type: 'mcq',
    level: 2,
    stem: 'Bộ ba độ dài nào sau đây là độ dài ba cạnh của một tam giác vuông?',
    options: ['2 cm, 3 cm, 4 cm', '5 cm, 12 cm, 13 cm', '4 cm, 5 cm, 6 cm', '6 cm, 7 cm, 9 cm'],
    correct: 'B',
    solution: r`\(5^2 + 12^2 = 25 + 144 = 169 = 13^2\) nên theo định lí Pythagore đảo, đó là ba cạnh của một tam giác vuông.`,
  },
];
