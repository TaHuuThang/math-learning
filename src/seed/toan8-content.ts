/**
 * Nội dung bài học thí điểm (Chương I, Chương II, Bài 10, Bài 35) – biên soạn theo SGK Toán 8
 * Kết nối tri thức với cuộc sống; diễn đạt lại, không sao chép nguyên văn sách.
 * Công thức viết bằng LaTeX trong \( \) hoặc \[ \].
 */
const r = String.raw;

export interface SeedSection {
  kind: 'objective' | 'knowledge' | 'formula' | 'example' | 'note';
  title?: string;
  body: string;
  solution?: string;
}

export interface SeedLessonContent {
  summary: string;
  minutes: number;
  sections: SeedSection[];
  /** Phương pháp giải cho từng dạng toán, theo thứ tự trong cấu trúc. */
  methods?: (string | null)[];
}

export const TOAN8_CONTENT: Record<string, SeedLessonContent> = {
  'bai-1-don-thuc': {
    summary: 'Đơn thức nhiều biến, đơn thức thu gọn, bậc của đơn thức và cộng trừ đơn thức đồng dạng.',
    minutes: 45,
    sections: [
      {
        kind: 'objective',
        body: r`- Nhận biết đơn thức, đơn thức thu gọn; chỉ ra hệ số, phần biến và bậc của đơn thức.
- Nhận biết các đơn thức đồng dạng; cộng, trừ được các đơn thức đồng dạng.
- Tính được giá trị của đơn thức khi biết giá trị của các biến.`,
      },
      {
        kind: 'knowledge',
        title: 'Đơn thức',
        body: r`**Đơn thức** là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.

Ví dụ: \(5\); \(x\); \(-\dfrac{1}{2}x^2y\); \(3xy^2z\) là các đơn thức. Các biểu thức \(x + 1\); \(2x - y\); \(\dfrac{1}{x}\) không phải là đơn thức.`,
      },
      {
        kind: 'knowledge',
        title: 'Đơn thức thu gọn và bậc của đơn thức',
        body: r`- **Đơn thức thu gọn** là đơn thức chỉ gồm một số, hoặc có dạng tích của một số với các biến, mỗi biến chỉ xuất hiện một lần và được nâng lên lũy thừa với số mũ nguyên dương.
- Trong đơn thức thu gọn, phần số gọi là **hệ số**, phần còn lại gọi là **phần biến**. Ta thường viết hệ số trước, phần biến sau.
- **Bậc** của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến trong đơn thức đó.
- Mỗi số thực khác 0 là một đơn thức bậc 0. Số 0 là đơn thức không có bậc.`,
      },
      {
        kind: 'knowledge',
        title: 'Đơn thức đồng dạng',
        body: r`- Hai **đơn thức đồng dạng** là hai đơn thức có hệ số khác 0 và có cùng phần biến.
- Để cộng (hay trừ) các đơn thức đồng dạng, ta cộng (hay trừ) các hệ số với nhau và giữ nguyên phần biến.`,
      },
      {
        kind: 'formula',
        title: 'Cộng, trừ đơn thức đồng dạng',
        body: r`\[a\,x^m y^n + b\,x^m y^n = (a + b)\,x^m y^n\]
\[a\,x^m y^n - b\,x^m y^n = (a - b)\,x^m y^n\]`,
      },
      {
        kind: 'example',
        title: 'Thu gọn đơn thức',
        body: r`Thu gọn đơn thức \(A = 2x^2y \cdot \left(-3xy^3\right)\). Chỉ ra hệ số, phần biến và bậc của \(A\).`,
        solution: r`\(A = 2 \cdot (-3) \cdot x^2 \cdot x \cdot y \cdot y^3 = -6x^3y^4\).

Hệ số: \(-6\); phần biến: \(x^3y^4\); bậc: \(3 + 4 = 7\).`,
      },
      {
        kind: 'example',
        title: 'Cộng các đơn thức đồng dạng',
        body: r`Tính \(3x^2y - 5x^2y + \dfrac{1}{2}x^2y\).`,
        solution: r`\(3x^2y - 5x^2y + \dfrac{1}{2}x^2y = \left(3 - 5 + \dfrac{1}{2}\right)x^2y = -\dfrac{3}{2}x^2y\).`,
      },
      {
        kind: 'note',
        body: r`Khi tính giá trị của một đơn thức, nên thu gọn đơn thức trước rồi mới thay giá trị của các biến.`,
      },
    ],
    methods: [
      'Chỉ các biểu thức gồm một số, một biến, hoặc tích của các số và các biến mới là đơn thức (không có phép cộng, trừ, không có biến ở mẫu, không có biến trong căn).',
      'Nhân các hệ số với nhau; viết mỗi biến một lần với số mũ bằng tổng các số mũ của biến đó.',
      'Thu gọn đơn thức rồi cộng số mũ của tất cả các biến.',
      'Cộng (trừ) các hệ số, giữ nguyên phần biến.',
    ],
  },

  'bai-2-da-thuc': {
    summary: 'Đa thức nhiều biến, thu gọn đa thức, bậc của đa thức và giá trị của đa thức.',
    minutes: 45,
    sections: [
      {
        kind: 'objective',
        body: r`- Nhận biết đa thức và các hạng tử của đa thức.
- Thu gọn được đa thức và xác định bậc của đa thức.
- Tính được giá trị của đa thức khi biết giá trị của các biến.`,
      },
      {
        kind: 'knowledge',
        title: 'Đa thức',
        body: r`**Đa thức** là một tổng của những đơn thức; mỗi đơn thức trong tổng gọi là một **hạng tử** của đa thức. Mỗi đơn thức cũng được coi là một đa thức.

Ví dụ: \(x^2y - 3xy + 2\) là đa thức có ba hạng tử \(x^2y\), \(-3xy\) và \(2\).`,
      },
      {
        kind: 'knowledge',
        title: 'Đa thức thu gọn và bậc của đa thức',
        body: r`- **Đa thức thu gọn** là đa thức không có hai hạng tử nào đồng dạng. Muốn thu gọn, ta nhóm các hạng tử đồng dạng rồi cộng (trừ) chúng.
- **Bậc của đa thức** (đã thu gọn) là bậc của hạng tử có bậc cao nhất.
- Số 0 cũng là một đa thức, gọi là **đa thức không**; đa thức không không có bậc.`,
      },
      {
        kind: 'example',
        title: 'Thu gọn và tìm bậc',
        body: r`Thu gọn và tìm bậc của đa thức \(P = 3x^2y - xy^2 + 2x^2y + 4xy^2 - 5\).`,
        solution: r`\(P = \left(3x^2y + 2x^2y\right) + \left(-xy^2 + 4xy^2\right) - 5 = 5x^2y + 3xy^2 - 5\).

Hạng tử \(5x^2y\) và \(3xy^2\) có bậc 3, hạng tử \(-5\) có bậc 0. Vậy \(P\) có bậc 3.`,
      },
      {
        kind: 'example',
        title: 'Tính giá trị của đa thức',
        body: r`Tính giá trị của \(Q = x^2 - 2xy + y^2\) tại \(x = 3\), \(y = -1\).`,
        solution: r`\(Q = 3^2 - 2 \cdot 3 \cdot (-1) + (-1)^2 = 9 + 6 + 1 = 16\).`,
      },
    ],
    methods: [
      'Đa thức là tổng của các đơn thức; mỗi đơn thức (kể cả một số) cũng là một đa thức.',
      'Nhóm các hạng tử đồng dạng rồi cộng, trừ hệ số của chúng.',
      'Thu gọn đa thức trước, sau đó tìm hạng tử có bậc cao nhất.',
      'Thu gọn đa thức (nếu được) rồi thay giá trị của các biến và tính.',
    ],
  },

  'bai-3-phep-cong-va-phep-tru-da-thuc': {
    summary: 'Quy tắc cộng, trừ hai đa thức và tìm đa thức chưa biết.',
    minutes: 45,
    sections: [
      {
        kind: 'objective',
        body: r`- Thực hiện được phép cộng, phép trừ hai đa thức.
- Vận dụng tìm đa thức chưa biết trong một tổng hoặc một hiệu.`,
      },
      {
        kind: 'knowledge',
        title: 'Cộng, trừ hai đa thức',
        body: r`Để cộng (hay trừ) hai đa thức, ta làm như sau:
1. Viết tổng (hay hiệu) hai đa thức, mỗi đa thức đặt trong một dấu ngoặc.
2. Bỏ dấu ngoặc: nếu trước ngoặc có dấu "−" thì đổi dấu mọi hạng tử trong ngoặc.
3. Nhóm các hạng tử đồng dạng rồi thu gọn.

Phép cộng đa thức cũng có tính chất giao hoán và kết hợp như phép cộng các số.`,
      },
      {
        kind: 'example',
        title: 'Tính tổng và hiệu',
        body: r`Cho \(A = x^2y + 2xy - 3\) và \(B = 3x^2y - xy + 1\). Tính \(A + B\) và \(A - B\).`,
        solution: r`\(A + B = \left(x^2y + 2xy - 3\right) + \left(3x^2y - xy + 1\right) = 4x^2y + xy - 2\).

\(A - B = x^2y + 2xy - 3 - 3x^2y + xy - 1 = -2x^2y + 3xy - 4\).`,
      },
      {
        kind: 'example',
        title: 'Tìm đa thức chưa biết',
        body: r`Tìm đa thức \(M\) biết \(M + \left(2x^2 - xy\right) = 5x^2 + 3xy - 1\).`,
        solution: r`\(M = \left(5x^2 + 3xy - 1\right) - \left(2x^2 - xy\right) = 3x^2 + 4xy - 1\).`,
      },
    ],
    methods: [
      'Bỏ ngoặc (chú ý đổi dấu khi trước ngoặc có dấu trừ), nhóm và thu gọn các hạng tử đồng dạng.',
      'Nếu M + A = B thì M = B − A; nếu M − A = B thì M = B + A; nếu A − M = B thì M = A − B.',
    ],
  },

  'bai-4-phep-nhan-da-thuc': {
    summary: 'Nhân đơn thức với đơn thức, đơn thức với đa thức, đa thức với đa thức.',
    minutes: 90,
    sections: [
      {
        kind: 'objective',
        body: r`- Thực hiện được phép nhân hai đơn thức, nhân đơn thức với đa thức, nhân hai đa thức.
- Vận dụng để rút gọn biểu thức, chứng minh giá trị của biểu thức không phụ thuộc vào biến.`,
      },
      {
        kind: 'knowledge',
        title: 'Quy tắc nhân',
        body: r`- **Nhân hai đơn thức:** nhân các hệ số với nhau và nhân các phần biến với nhau.
- **Nhân đơn thức với đa thức:** nhân đơn thức với từng hạng tử của đa thức rồi cộng các tích.
- **Nhân đa thức với đa thức:** nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng các tích.`,
      },
      {
        kind: 'formula',
        title: 'Ghi nhớ',
        body: r`\[x^m \cdot x^n = x^{m+n}\]
\[A\,(B + C) = AB + AC\]
\[(A + B)(C + D) = AC + AD + BC + BD\]`,
      },
      {
        kind: 'example',
        title: 'Nhân đơn thức với đa thức',
        body: r`Tính \(2x\left(3x^2 - 5x + 1\right)\).`,
        solution: r`\(2x\left(3x^2 - 5x + 1\right) = 6x^3 - 10x^2 + 2x\).`,
      },
      {
        kind: 'example',
        title: 'Nhân hai đa thức',
        body: r`Tính \((x - 2)\left(x^2 + 3x - 1\right)\).`,
        solution: r`\((x - 2)\left(x^2 + 3x - 1\right) = x^3 + 3x^2 - x - 2x^2 - 6x + 2 = x^3 + x^2 - 7x + 2\).`,
      },
      {
        kind: 'example',
        title: 'Biểu thức không phụ thuộc vào biến',
        body: r`Chứng minh giá trị của biểu thức \(P = (x + 3)(x - 2) - x(x + 1)\) không phụ thuộc vào \(x\).`,
        solution: r`\(P = x^2 - 2x + 3x - 6 - x^2 - x = -6\). Vậy \(P = -6\) với mọi giá trị của \(x\).`,
      },
    ],
    methods: [
      'Nhân hệ số với hệ số, lũy thừa cùng cơ số thì cộng số mũ.',
      'Nhân đơn thức với từng hạng tử của đa thức, chú ý dấu.',
      'Nhân từng hạng tử của đa thức thứ nhất với từng hạng tử của đa thức thứ hai rồi thu gọn.',
      'Thực hiện phép nhân, thu gọn; nếu kết quả là một hằng số thì biểu thức không phụ thuộc vào biến.',
      'Biến đổi vế phức tạp thành vế còn lại, hoặc biến đổi cả hai vế về cùng một biểu thức.',
    ],
  },

  'bai-5-phep-chia-da-thuc-cho-don-thuc': {
    summary: 'Chia đơn thức cho đơn thức, chia đa thức cho đơn thức (trường hợp chia hết).',
    minutes: 45,
    sections: [
      {
        kind: 'objective',
        body: r`- Nhận biết khi nào đơn thức, đa thức chia hết cho một đơn thức.
- Thực hiện được phép chia đơn thức cho đơn thức, đa thức cho đơn thức.`,
      },
      {
        kind: 'knowledge',
        title: 'Chia đơn thức cho đơn thức',
        body: r`- Đơn thức \(A\) **chia hết** cho đơn thức \(B \ne 0\) khi mỗi biến của \(B\) đều là biến của \(A\) với số mũ không lớn hơn số mũ của nó trong \(A\).
- Muốn chia \(A\) cho \(B\) (trường hợp chia hết): chia hệ số của \(A\) cho hệ số của \(B\); chia lũy thừa của từng biến trong \(A\) cho lũy thừa của cùng biến đó trong \(B\); rồi nhân các kết quả với nhau.`,
      },
      {
        kind: 'knowledge',
        title: 'Chia đa thức cho đơn thức',
        body: r`Đa thức \(A\) chia hết cho đơn thức \(B\) khi mọi hạng tử của \(A\) đều chia hết cho \(B\). Khi đó ta chia từng hạng tử của \(A\) cho \(B\) rồi cộng các kết quả.`,
      },
      {
        kind: 'formula',
        title: 'Ghi nhớ',
        body: r`\[x^m : x^n = x^{m - n} \quad (m \ge n,\ x \ne 0)\]
\[(A + B) : C = A : C + B : C\]`,
      },
      {
        kind: 'example',
        title: 'Chia hai đơn thức',
        body: r`Tính \(12x^4y^3 : \left(-3x^2y\right)\).`,
        solution: r`\(12x^4y^3 : \left(-3x^2y\right) = \dfrac{12}{-3}\,x^{4-2}\,y^{3-1} = -4x^2y^2\).`,
      },
      {
        kind: 'example',
        title: 'Chia đa thức cho đơn thức',
        body: r`Tính \(\left(6x^3y^2 - 9x^2y + 3xy\right) : 3xy\).`,
        solution: r`\(\left(6x^3y^2 - 9x^2y + 3xy\right) : 3xy = 2x^2y - 3x + 1\).`,
      },
    ],
    methods: [
      'Chia hệ số cho hệ số, chia lũy thừa cùng biến (trừ số mũ) rồi nhân các kết quả.',
      'Chia từng hạng tử của đa thức cho đơn thức rồi cộng các kết quả.',
      'Nếu A · B = C thì A = C : B; nếu A : B = C thì A = C · B.',
    ],
  },

  'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu': {
    summary: 'Ba hằng đẳng thức: hiệu hai bình phương, bình phương của một tổng, bình phương của một hiệu.',
    minutes: 90,
    sections: [
      {
        kind: 'objective',
        body: r`- Nhận biết khái niệm hằng đẳng thức.
- Mô tả và vận dụng các hằng đẳng thức: hiệu hai bình phương, bình phương của một tổng, bình phương của một hiệu.`,
      },
      {
        kind: 'knowledge',
        title: 'Hằng đẳng thức',
        body: r`**Hằng đẳng thức** là đẳng thức mà hai vế luôn nhận cùng một giá trị khi thay các chữ bằng các số tùy ý.`,
      },
      { kind: 'formula', title: 'Hiệu hai bình phương', body: r`\[A^2 - B^2 = (A + B)(A - B)\]` },
      { kind: 'formula', title: 'Bình phương của một tổng', body: r`\[(A + B)^2 = A^2 + 2AB + B^2\]` },
      { kind: 'formula', title: 'Bình phương của một hiệu', body: r`\[(A - B)^2 = A^2 - 2AB + B^2\]` },
      {
        kind: 'example',
        title: 'Tính nhanh',
        body: r`Tính nhanh \(102^2\) và \(99 \cdot 101\).`,
        solution: r`\(102^2 = (100 + 2)^2 = 10\,000 + 400 + 4 = 10\,404\).

\(99 \cdot 101 = (100 - 1)(100 + 1) = 100^2 - 1 = 9\,999\).`,
      },
      {
        kind: 'example',
        title: 'Viết về dạng bình phương',
        body: r`Viết \(x^2 - 6x + 9\) dưới dạng bình phương của một hiệu.`,
        solution: r`\(x^2 - 6x + 9 = x^2 - 2 \cdot x \cdot 3 + 3^2 = (x - 3)^2\).`,
      },
      {
        kind: 'note',
        body: r`\((A - B)^2 = (B - A)^2\), nhưng nói chung \((A - B)^2 \ne A^2 - B^2\).`,
      },
    ],
    methods: [
      'Nhận dạng A, B trong biểu thức rồi áp dụng đúng hằng đẳng thức theo chiều xuôi hoặc ngược.',
      'Biến đổi biểu thức về dạng hằng đẳng thức để rút gọn, sau đó thay số.',
      'Đưa về dạng (A ± B)² + c để tìm giá trị nhỏ nhất (hoặc −(A ± B)² + c để tìm giá trị lớn nhất).',
    ],
  },

  'bai-7-lap-phuong-cua-mot-tong-lap-phuong-cua-mot-hieu': {
    summary: 'Hằng đẳng thức lập phương của một tổng và lập phương của một hiệu.',
    minutes: 135,
    sections: [
      {
        kind: 'objective',
        body: r`- Mô tả hằng đẳng thức lập phương của một tổng, lập phương của một hiệu.
- Vận dụng để khai triển, rút gọn và tính nhanh giá trị biểu thức.`,
      },
      { kind: 'formula', title: 'Lập phương của một tổng', body: r`\[(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3\]` },
      { kind: 'formula', title: 'Lập phương của một hiệu', body: r`\[(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3\]` },
      {
        kind: 'example',
        title: 'Khai triển',
        body: r`Khai triển \((x + 2)^3\).`,
        solution: r`\((x + 2)^3 = x^3 + 3 \cdot x^2 \cdot 2 + 3 \cdot x \cdot 2^2 + 2^3 = x^3 + 6x^2 + 12x + 8\).`,
      },
      {
        kind: 'example',
        title: 'Viết về dạng lập phương',
        body: r`Viết \(8x^3 - 12x^2 + 6x - 1\) dưới dạng lập phương của một hiệu.`,
        solution: r`\(8x^3 - 12x^2 + 6x - 1 = (2x)^3 - 3 \cdot (2x)^2 \cdot 1 + 3 \cdot 2x \cdot 1^2 - 1^3 = (2x - 1)^3\).`,
      },
      { kind: 'note', body: r`\((A - B)^3 = -(B - A)^3\).` },
    ],
    methods: [
      'Xác định A, B rồi khai triển theo công thức; với chiều ngược, nhận ra các hạng tử A³, 3A²B, 3AB², B³.',
      'Đưa biểu thức về dạng (A ± B)³ rồi thay giá trị của biến.',
      'Dùng hằng đẳng thức để đưa phương trình về dạng (A ± B)³ = k³ hoặc tích bằng 0.',
    ],
  },

  'bai-8-tong-va-hieu-hai-lap-phuong': {
    summary: 'Hằng đẳng thức tổng hai lập phương, hiệu hai lập phương và tổng kết bảy hằng đẳng thức.',
    minutes: 90,
    sections: [
      {
        kind: 'objective',
        body: r`- Mô tả hằng đẳng thức tổng hai lập phương và hiệu hai lập phương.
- Vận dụng bảy hằng đẳng thức đáng nhớ để tính toán, rút gọn biểu thức.`,
      },
      { kind: 'formula', title: 'Tổng hai lập phương', body: r`\[A^3 + B^3 = (A + B)\left(A^2 - AB + B^2\right)\]` },
      { kind: 'formula', title: 'Hiệu hai lập phương', body: r`\[A^3 - B^3 = (A - B)\left(A^2 + AB + B^2\right)\]` },
      {
        kind: 'example',
        title: 'Viết dưới dạng tích',
        body: r`Viết \(x^3 + 27\) dưới dạng tích.`,
        solution: r`\(x^3 + 27 = x^3 + 3^3 = (x + 3)\left(x^2 - 3x + 9\right)\).`,
      },
      {
        kind: 'example',
        title: 'Rút gọn biểu thức',
        body: r`Rút gọn \((x - 1)\left(x^2 + x + 1\right) - x^3\).`,
        solution: r`\((x - 1)\left(x^2 + x + 1\right) - x^3 = x^3 - 1 - x^3 = -1\).`,
      },
      {
        kind: 'note',
        title: 'Bảy hằng đẳng thức đáng nhớ',
        body: r`1. \((A + B)^2 = A^2 + 2AB + B^2\)
2. \((A - B)^2 = A^2 - 2AB + B^2\)
3. \(A^2 - B^2 = (A + B)(A - B)\)
4. \((A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3\)
5. \((A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3\)
6. \(A^3 + B^3 = (A + B)\left(A^2 - AB + B^2\right)\)
7. \(A^3 - B^3 = (A - B)\left(A^2 + AB + B^2\right)\)`,
      },
    ],
    methods: [
      'Nhận dạng A³ ± B³ hoặc tích (A ± B)(A² ∓ AB + B²) để viết theo chiều phù hợp.',
      'Dùng hằng đẳng thức rút gọn biểu thức trước, sau đó thay số.',
      'Phối hợp các hằng đẳng thức để rút gọn, chứng minh đẳng thức hoặc tìm x.',
    ],
  },

  'bai-9-phan-tich-da-thuc-thanh-nhan-tu': {
    summary: 'Phân tích đa thức thành nhân tử bằng đặt nhân tử chung, hằng đẳng thức, nhóm hạng tử.',
    minutes: 90,
    sections: [
      {
        kind: 'objective',
        body: r`- Phân tích được đa thức thành nhân tử bằng các phương pháp: đặt nhân tử chung, sử dụng hằng đẳng thức, nhóm hạng tử.
- Vận dụng để tìm x và tính nhanh giá trị biểu thức.`,
      },
      {
        kind: 'knowledge',
        title: 'Phân tích đa thức thành nhân tử',
        body: r`**Phân tích đa thức thành nhân tử** (hay thừa số) là biến đổi đa thức đó thành một tích của những đa thức.

Các phương pháp thường dùng:
- **Đặt nhân tử chung**.
- **Sử dụng hằng đẳng thức** đáng nhớ.
- **Nhóm hạng tử** thích hợp để làm xuất hiện nhân tử chung hoặc hằng đẳng thức.
- Phối hợp nhiều phương pháp.`,
      },
      { kind: 'formula', title: 'Đặt nhân tử chung', body: r`\[AB + AC = A\,(B + C)\]` },
      {
        kind: 'example',
        title: 'Đặt nhân tử chung',
        body: r`Phân tích \(6x^2y - 9xy^2\) thành nhân tử.`,
        solution: r`\(6x^2y - 9xy^2 = 3xy \cdot 2x - 3xy \cdot 3y = 3xy\,(2x - 3y)\).`,
      },
      {
        kind: 'example',
        title: 'Dùng hằng đẳng thức',
        body: r`Phân tích \(4x^2 - 25\) thành nhân tử.`,
        solution: r`\(4x^2 - 25 = (2x)^2 - 5^2 = (2x - 5)(2x + 5)\).`,
      },
      {
        kind: 'example',
        title: 'Nhóm hạng tử',
        body: r`Phân tích \(x^2 - xy + 3x - 3y\) thành nhân tử.`,
        solution: r`\(x^2 - xy + 3x - 3y = \left(x^2 - xy\right) + (3x - 3y) = x(x - y) + 3(x - y) = (x - y)(x + 3)\).`,
      },
      {
        kind: 'example',
        title: 'Tìm x',
        body: r`Tìm \(x\) biết \(x^2 - 4x = 0\).`,
        solution: r`\(x^2 - 4x = 0 \Leftrightarrow x(x - 4) = 0\), suy ra \(x = 0\) hoặc \(x = 4\).`,
      },
      {
        kind: 'note',
        body: r`Nên đặt nhân tử chung trước (nếu có), sau đó mới dùng hằng đẳng thức hoặc nhóm hạng tử.`,
      },
    ],
    methods: [
      'Tìm ước chung lớn nhất của các hệ số và các biến chung với số mũ nhỏ nhất làm nhân tử chung.',
      'Nhận dạng đa thức là vế phải của một trong bảy hằng đẳng thức.',
      'Nhóm các hạng tử sao cho mỗi nhóm có nhân tử chung hoặc là hằng đẳng thức, rồi đặt nhân tử chung của các nhóm.',
      'Phân tích vế trái thành nhân tử rồi dùng: A · B = 0 khi A = 0 hoặc B = 0.',
      'Phân tích thành nhân tử rồi thay giá trị của biến để tính nhanh.',
      'Tách một hạng tử thành nhiều hạng tử, hoặc thêm bớt cùng một hạng tử để xuất hiện hằng đẳng thức.',
    ],
  },

  'bai-10-tu-giac': {
    summary: 'Tứ giác, tứ giác lồi và định lí tổng các góc của một tứ giác.',
    minutes: 45,
    sections: [
      {
        kind: 'objective',
        body: r`- Mô tả tứ giác, tứ giác lồi.
- Giải thích và vận dụng định lí tổng các góc của một tứ giác lồi bằng \(360^\circ\).`,
      },
      {
        kind: 'knowledge',
        title: 'Tứ giác',
        body: r`**Tứ giác** \(ABCD\) là hình gồm bốn đoạn thẳng \(AB, BC, CD, DA\), trong đó không có hai đoạn thẳng nào cùng nằm trên một đường thẳng.
- \(A, B, C, D\) là các **đỉnh**; \(AB, BC, CD, DA\) là các **cạnh**; \(AC\) và \(BD\) là hai **đường chéo**.
- **Tứ giác lồi** là tứ giác luôn nằm về một phía của đường thẳng chứa bất kì cạnh nào của tứ giác đó.

[hinh]
A(0,0) B(6,0) C(7,3.6) D(1.4,4)
ABCDA
AC:dash BD:dash
[/hinh]`,
      },
      {
        kind: 'formula',
        title: 'Tổng các góc của một tứ giác',
        body: r`\[\widehat{A} + \widehat{B} + \widehat{C} + \widehat{D} = 360^\circ\]`,
      },
      {
        kind: 'example',
        title: 'Tính số đo góc',
        body: r`Cho tứ giác \(ABCD\) có \(\widehat{A} = 70^\circ\), \(\widehat{B} = 110^\circ\), \(\widehat{C} = 95^\circ\). Tính \(\widehat{D}\).`,
        solution: r`Vì tổng các góc của tứ giác bằng \(360^\circ\) nên \(\widehat{D} = 360^\circ - \left(70^\circ + 110^\circ + 95^\circ\right) = 85^\circ\).`,
      },
    ],
    methods: [
      'Dùng định lí tổng bốn góc bằng 360°, kết hợp các điều kiện đề bài (tỉ lệ, hiệu, tổng giữa các góc).',
      'Dùng bất đẳng thức tam giác trong các tam giác tạo bởi cạnh và đường chéo.',
    ],
  },

  'bai-35-dinh-li-pythagore-va-ung-dung': {
    summary: 'Định lí Pythagore, định lí Pythagore đảo và ứng dụng tính độ dài.',
    minutes: 90,
    sections: [
      {
        kind: 'objective',
        body: r`- Giải thích định lí Pythagore và định lí Pythagore đảo.
- Tính độ dài cạnh trong tam giác vuông; nhận biết tam giác vuông; giải quyết bài toán thực tế.`,
      },
      {
        kind: 'knowledge',
        title: 'Định lí Pythagore',
        body: r`Trong một tam giác vuông, bình phương độ dài cạnh huyền bằng tổng bình phương độ dài hai cạnh góc vuông.

[hinh]
A(0,0) B(0,3) C(4,0)
ABCA
vuong(B,A,C)
[/hinh]`,
      },
      {
        kind: 'formula',
        title: 'Tam giác ABC vuông tại A',
        body: r`\[BC^2 = AB^2 + AC^2\]`,
      },
      {
        kind: 'knowledge',
        title: 'Định lí Pythagore đảo',
        body: r`Nếu một tam giác có bình phương độ dài một cạnh bằng tổng bình phương độ dài hai cạnh kia thì tam giác đó là tam giác vuông.`,
      },
      {
        kind: 'example',
        title: 'Tính cạnh huyền',
        body: r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 5\) cm, \(AC = 12\) cm. Tính \(BC\).`,
        solution: r`\(BC^2 = AB^2 + AC^2 = 25 + 144 = 169\), suy ra \(BC = 13\) cm.`,
      },
    ],
    methods: [
      'Xác định cạnh huyền (đối diện góc vuông) rồi áp dụng BC² = AB² + AC².',
      'So sánh bình phương cạnh lớn nhất với tổng bình phương hai cạnh còn lại.',
      'Mô hình hóa tình huống thực tế bằng một tam giác vuông rồi áp dụng định lí.',
    ],
  },
};
