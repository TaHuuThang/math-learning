import { es, mcq, r, sa, tf, type MapChapter } from './types';

/** Chương II. Hằng đẳng thức đáng nhớ và ứng dụng – Bài 6 đến Bài 9. */
export const CHUONG_2: MapChapter = {
  code: 'II',
  objectives: `- Nhận biết và viết được bảy hằng đẳng thức đáng nhớ.
- Vận dụng hằng đẳng thức để khai triển, viết gọn, tính nhanh, rút gọn, tính giá trị biểu thức và chứng minh.
- Phân tích đa thức thành nhân tử bằng các phương pháp đặt nhân tử chung, sử dụng hằng đẳng thức, nhóm hạng tử.`,
  keyPoints: `- Bảy hằng đẳng thức đáng nhớ và hai chiều sử dụng: khai triển, viết gọn.
- Ba phương pháp phân tích đa thức thành nhân tử và cách phối hợp chúng.
- Ứng dụng: tính nhanh, tìm x (đưa về tích bằng 0), chứng minh, tìm giá trị nhỏ nhất, lớn nhất.`,
  formulas: r`\[A^2 - B^2 = (A + B)(A - B)\]
\[(A + B)^2 = A^2 + 2AB + B^2;\qquad (A - B)^2 = A^2 - 2AB + B^2\]
\[(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3;\qquad (A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3\]
\[A^3 + B^3 = (A + B)(A^2 - AB + B^2);\qquad A^3 - B^3 = (A - B)(A^2 + AB + B^2)\]`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 1 (VietJack, Hoatieu) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-2a', objectives: 'Củng cố bảy hằng đẳng thức đáng nhớ: khai triển, viết gọn, tính nhanh, rút gọn và tính giá trị biểu thức.' },
    { slug: 'luyen-tap-chung-2b', objectives: 'Củng cố phân tích đa thức thành nhân tử, phối hợp các phương pháp; vận dụng tìm x và tính nhanh.' },
    { slug: 'bai-tap-cuoi-chuong-2', objectives: 'Ôn tập toàn Chương II: hệ thống bảy hằng đẳng thức và các phương pháp phân tích đa thức thành nhân tử; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 6 ----------------
    {
      slug: 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu',
      difficulty: 2,
      objectives: `- Nhận biết khái niệm hằng đẳng thức.
- Mô tả các hằng đẳng thức hiệu hai bình phương, bình phương của một tổng, bình phương của một hiệu.
- Vận dụng để tính nhanh, rút gọn, tính giá trị biểu thức, tìm x và chứng minh.`,
      prerequisites: r`- Nhân đa thức với đa thức (Bài 4).
- Lũy thừa bậc hai: \(a^2 = a\cdot a\); \((ab)^2 = a^2b^2\).`,
      concepts: 'Hằng đẳng thức; hiệu hai bình phương; bình phương của một tổng; bình phương của một hiệu.',
      formulas: r`\[A^2 - B^2 = (A + B)(A - B)\]
\[(A + B)^2 = A^2 + 2AB + B^2\]
\[(A - B)^2 = A^2 - 2AB + B^2\]`,
      properties: r`- Hằng đẳng thức là đẳng thức mà hai vế luôn nhận cùng một giá trị khi thay các chữ bằng các số tùy ý.
- \((A - B)^2 = (B - A)^2\); \(A^2 \ge 0\) với mọi \(A\), dấu "=" xảy ra khi \(A = 0\).`,
      themes: [
        {
          title: 'Ba hằng đẳng thức bậc hai',
          description: 'Hiệu hai bình phương, bình phương của một tổng, bình phương của một hiệu – khai triển và viết gọn.',
          types: [
            {
              slug: 'hoan-thanh-hang-dang-thuc-binh-phuong',
              title: 'Hoàn thành các hằng đẳng thức',
              levels: [1, 2],
              knowledge: r`\(A^2 - B^2 = (A + B)(A - B)\); \((A \pm B)^2 = A^2 \pm 2AB + B^2\).`,
              signs: r`Biểu thức có dạng \((A \pm B)^2\), \((A + B)(A - B)\) cần khai triển; hoặc dạng \(A^2 \pm 2AB + B^2\), \(A^2 - B^2\) cần viết gọn; điền vào chỗ trống.`,
              method: 'Xác định A, B rồi áp dụng công thức theo chiều khai triển hoặc chiều viết gọn.',
              steps: r`- **Bước 1.** Nhận dạng hằng đẳng thức, xác định \(A\) và \(B\) (có thể là đơn thức như \(2x\), \(3y\)).
- **Bước 2.** Viết theo công thức; với chiều viết gọn, kiểm tra hạng tử \(2AB\).
- **Bước 3.** Thu gọn, chú ý \((2x)^2 = 4x^2\).`,
              mistakes: r`- Viết \((A + B)^2 = A^2 + B^2\) (thiếu \(2AB\)).
- Viết \((2x)^2 = 2x^2\); đúng là \(4x^2\).
- Sai dấu: \((x - 3)^2 = x^2 - 6x - 9\) là sai, đúng là \(x^2 - 6x + 9\).`,
              example: r`a) Khai triển \((2x + 3y)^2\).
b) Viết \(x^2 - 10x + 25\) dưới dạng bình phương của một hiệu.`,
              solution: r`a) \((2x + 3y)^2 = (2x)^2 + 2\cdot2x\cdot3y + (3y)^2 = 4x^2 + 12xy + 9y^2\).
b) \(x^2 - 10x + 25 = x^2 - 2\cdot x\cdot5 + 5^2 = (x - 5)^2\).`,
              exercises: [
                mcq(1, r`Khai triển \((x - 4)^2\) được`, [r`\(x^2 - 8x + 16\)`, r`\(x^2 - 16\)`, r`\(x^2 - 4x + 16\)`, r`\(x^2 + 8x + 16\)`], 'A', r`\((x - 4)^2 = x^2 - 2\cdot x\cdot 4 + 4^2 = x^2 - 8x + 16\).`),
                mcq(2, r`Biểu thức \(9x^2 - 4y^2\) bằng`, [r`\((3x - 2y)(3x + 2y)\)`, r`\((9x - 4y)(9x + 4y)\)`, r`\((3x - 2y)^2\)`, r`\((3x - 4y)(3x + 4y)\)`], 'A', r`\(9x^2 - 4y^2 = (3x)^2 - (2y)^2 = (3x - 2y)(3x + 2y)\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng hằng đẳng thức bậc hai',
          description: 'Tính nhanh, rút gọn, tìm x, chứng minh và tìm giá trị nhỏ nhất, lớn nhất.',
          types: [
            {
              slug: 'tinh-gia-tri-rut-gon-bieu-thuc-binh-phuong',
              title: 'Tính giá trị của biểu thức, rút gọn biểu thức',
              levels: [2, 3],
              knowledge: 'Ba hằng đẳng thức bậc hai; viết số dưới dạng tổng hoặc hiệu với số tròn chục, tròn trăm.',
              signs: r`Tính nhanh các số gần số tròn (như \(99^2\), \(101\cdot99\)); biểu thức chứa bình phương cần rút gọn trước khi thay số.`,
              method: 'Biến đổi về hằng đẳng thức để rút gọn, sau đó mới thay số và tính.',
              steps: `- **Bước 1.** Viết số hoặc biểu thức về dạng A + B, A − B (ví dụ 99 = 100 − 1).
- **Bước 2.** Áp dụng hằng đẳng thức, rút gọn.
- **Bước 3.** Thay giá trị (nếu có) và tính.`,
              mistakes: r`- Thay số trước khi rút gọn làm phép tính dài, dễ sai.
- Quên đổi dấu khi trừ một bình phương: \(-(x - 1)^2 = -x^2 + 2x - 1\).`,
              example: r`a) Tính nhanh \(99^2\).
b) Rút gọn rồi tính giá trị của \(A = (x + 2)^2 - (x - 2)^2\) tại \(x = 25\).`,
              solution: r`a) \(99^2 = (100 - 1)^2 = 10000 - 200 + 1 = 9801\).
b) \(A = (x^2 + 4x + 4) - (x^2 - 4x + 4) = 8x\). Tại \(x = 25\): \(A = 200\).`,
              exercises: [
                sa(2, r`Tính nhanh \(101^2\).`, ['10201'], r`\(101^2 = (100 + 1)^2 = 10000 + 200 + 1 = 10201\).`),
                sa(3, r`Rút gọn biểu thức \(B = (2x - 1)^2 - 4x(x - 1)\) rồi tính giá trị của \(B\) tại \(x = 2026\).`, ['1'], r`\(B = 4x^2 - 4x + 1 - 4x^2 + 4x = 1\). Vậy \(B = 1\) với mọi \(x\), nên tại \(x = 2026\) thì \(B = 1\).`),
              ],
            },
            {
              slug: 'tim-x-hang-dang-thuc-binh-phuong',
              title: 'Tìm x bằng hằng đẳng thức bậc hai',
              levels: [2, 3],
              knowledge: r`Ba hằng đẳng thức bậc hai; tìm \(x\) từ đẳng thức dạng \(ax = b\) (\(a \ne 0\)).`,
              signs: r`Đẳng thức chứa \(x\) trong các bình phương; sau khi khai triển, các hạng tử \(x^2\) triệt tiêu.`,
              method: r`Khai triển các hằng đẳng thức, thu gọn để được đẳng thức dạng \(ax = b\) rồi tìm \(x\).`,
              steps: r`- **Bước 1.** Khai triển các bình phương.
- **Bước 2.** Thu gọn (các hạng tử \(x^2\) triệt tiêu).
- **Bước 3.** Tìm \(x\) và thử lại.`,
              mistakes: r`- Sai dấu khi bỏ ngoặc đứng sau dấu trừ.
- Khai triển \((x + 3)^2\) thiếu hạng tử \(6x\).`,
              example: r`Tìm \(x\), biết \((x + 3)^2 - x^2 = 21\).`,
              solution: r`\(x^2 + 6x + 9 - x^2 = 21\), suy ra \(6x = 12\), do đó \(x = 2\).`,
              exercises: [
                sa(2, r`Tìm \(x\), biết \((x - 2)^2 - x(x + 1) = 9\).`, ['-1'], r`\(x^2 - 4x + 4 - x^2 - x = 9\), tức là \(-5x + 4 = 9\), suy ra \(-5x = 5\), do đó \(x = -1\).`),
                sa(3, r`Tìm \(x\), biết \((2x + 1)^2 - (2x - 1)^2 = 24\).`, ['3'], r`\((4x^2 + 4x + 1) - (4x^2 - 4x + 1) = 8x = 24\), suy ra \(x = 3\).`),
              ],
            },
            {
              slug: 'chung-minh-voi-hang-dang-thuc-binh-phuong',
              title: 'Chứng minh đẳng thức, chứng minh biểu thức luôn dương',
              levels: [3, 4],
              knowledge: r`Ba hằng đẳng thức bậc hai; \(A^2 \ge 0\) với mọi \(A\).`,
              signs: 'Đề yêu cầu chứng minh một đẳng thức chứa bình phương, hoặc chứng minh biểu thức luôn dương (không âm) với mọi giá trị của biến.',
              method: r`Biến đổi một vế thành vế kia; để chứng minh luôn dương, viết biểu thức thành một bình phương cộng với một số dương.`,
              steps: r`- **Bước 1.** Khai triển, hoặc gom về bình phương: \(x^2 + 2ax = (x + a)^2 - a^2\).
- **Bước 2.** Đánh giá: \((x + a)^2 \ge 0\).
- **Bước 3.** Kết luận.`,
              mistakes: '- Chỉ thử vài giá trị của x rồi kết luận "luôn dương".\n- Thêm bớt sai hằng số khi tạo bình phương.',
              example: r`Chứng minh \(x^2 - 4x + 5 > 0\) với mọi \(x\).`,
              solution: r`\(x^2 - 4x + 5 = (x^2 - 4x + 4) + 1 = (x - 2)^2 + 1 \ge 1 > 0\) với mọi \(x\).`,
              exercises: [
                es(3, r`Chứng minh \((a + b)^2 - (a - b)^2 = 4ab\).`, r`Vế trái \(= (a^2 + 2ab + b^2) - (a^2 - 2ab + b^2) = 4ab\) = vế phải.`),
                es(4, r`Chứng minh biểu thức \(x^2 + 6x + 10\) luôn dương với mọi giá trị của \(x\).`, r`\(x^2 + 6x + 10 = (x^2 + 6x + 9) + 1 = (x + 3)^2 + 1 \ge 1 > 0\) với mọi \(x\).`),
              ],
            },
            {
              slug: 'tim-gia-tri-nho-nhat-lon-nhat',
              title: 'Tìm giá trị nhỏ nhất, lớn nhất của biểu thức',
              legacy: ['Tìm x, chứng minh, tìm giá trị lớn nhất – nhỏ nhất'],
              levels: [3, 4],
              knowledge: r`\(A^2 \ge 0\), dấu "=" xảy ra khi \(A = 0\); thêm bớt để tạo bình phương của một tổng (hiệu).`,
              signs: r`Tìm giá trị nhỏ nhất (lớn nhất) của biểu thức dạng \(x^2 + bx + c\) (hoặc \(-x^2 + bx + c\)).`,
              method: r`Viết biểu thức thành \((x + m)^2 + k\) – giá trị nhỏ nhất là \(k\) khi \(x = -m\); hoặc \(k - (x + m)^2\) – giá trị lớn nhất là \(k\).`,
              steps: r`- **Bước 1.** Nhóm \(x^2 \pm 2mx\) rồi thêm bớt \(m^2\).
- **Bước 2.** Viết thành \((x \pm m)^2 + k\) hoặc \(k - (x \pm m)^2\).
- **Bước 3.** Đánh giá và chỉ ra giá trị của \(x\) để dấu "=" xảy ra.`,
              mistakes: '- Quên chỉ ra giá trị của x tại đó biểu thức đạt giá trị nhỏ nhất (lớn nhất).\n- Với hệ số của x² âm lại đi tìm giá trị nhỏ nhất.',
              example: r`Tìm giá trị lớn nhất của \(B = -x^2 + 2x + 3\).`,
              solution: r`\(B = -(x^2 - 2x + 1) + 4 = 4 - (x - 1)^2 \le 4\). Dấu "=" xảy ra khi \(x = 1\). Vậy giá trị lớn nhất của \(B\) là 4.`,
              exercises: [
                sa(3, r`Giá trị nhỏ nhất của biểu thức \(A = x^2 + 4x + 7\) là bao nhiêu?`, ['3'], r`\(A = (x + 2)^2 + 3 \ge 3\), dấu "=" khi \(x = -2\). Giá trị nhỏ nhất là 3.`),
                sa(4, r`Giá trị lớn nhất của biểu thức \(B = 5 + 6x - x^2\) là bao nhiêu?`, ['14'], r`\(B = -(x^2 - 6x + 9) + 14 = 14 - (x - 3)^2 \le 14\), dấu "=" khi \(x = 3\). Giá trị lớn nhất là 14.`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 7 ----------------
    {
      slug: 'bai-7-lap-phuong-cua-mot-tong-lap-phuong-cua-mot-hieu',
      difficulty: 2,
      objectives: `- Mô tả hằng đẳng thức lập phương của một tổng, lập phương của một hiệu.
- Vận dụng để khai triển, viết gọn, tính nhanh, rút gọn, tính giá trị biểu thức và tìm x.`,
      prerequisites: '- Ba hằng đẳng thức ở Bài 6.\n- Nhân đa thức với đa thức (Bài 4).',
      concepts: 'Lập phương của một tổng; lập phương của một hiệu.',
      formulas: r`\[(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3\]
\[(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3\]`,
      properties: r`- Các hệ số trong khai triển lần lượt là 1; 3; 3; 1. Với lập phương của một hiệu, các dấu xen kẽ +, −, +, −.
- \((A - B)^3 = -(B - A)^3\); \((A + B)^3 = A^3 + B^3 + 3AB(A + B)\).`,
      themes: [
        {
          title: 'Lập phương của một tổng, một hiệu',
          description: 'Khai triển và viết gọn lập phương của một tổng, một hiệu.',
          types: [
            {
              slug: 'hoan-thanh-hang-dang-thuc-lap-phuong',
              title: 'Hoàn thành các hằng đẳng thức',
              levels: [1, 2],
              knowledge: r`\((A \pm B)^3 = A^3 \pm 3A^2B + 3AB^2 \pm B^3\).`,
              signs: r`Biểu thức dạng \((A \pm B)^3\) cần khai triển, hoặc đa thức bốn hạng tử dạng \(A^3 \pm 3A^2B + 3AB^2 \pm B^3\) cần viết gọn.`,
              method: r`Xác định \(A\), \(B\); khi viết gọn, kiểm tra hai hạng tử giữa có đúng bằng \(3A^2B\) và \(3AB^2\).`,
              steps: r`- **Bước 1.** Xác định \(A\), \(B\) (với chiều viết gọn: \(A^3\), \(B^3\) là hai hạng tử đầu, cuối).
- **Bước 2.** Áp dụng công thức, chú ý dấu.
- **Bước 3.** Thu gọn từng hạng tử.`,
              mistakes: r`- Viết \((A + B)^3 = A^3 + B^3\).
- Quên hệ số 3 ở hai hạng tử giữa; viết \((2x)^3 = 2x^3\) (đúng là \(8x^3\)).
- Sai dấu ở lập phương của một hiệu.`,
              example: r`a) Khai triển \((x + 2)^3\).
b) Viết \(8x^3 - 12x^2 + 6x - 1\) dưới dạng lập phương của một hiệu.`,
              solution: r`a) \((x + 2)^3 = x^3 + 3\cdot x^2\cdot2 + 3\cdot x\cdot2^2 + 2^3 = x^3 + 6x^2 + 12x + 8\).
b) \(8x^3 - 12x^2 + 6x - 1 = (2x)^3 - 3(2x)^2\cdot1 + 3\cdot2x\cdot1^2 - 1^3 = (2x - 1)^3\).`,
              exercises: [
                mcq(1, r`Khai triển \((x - 1)^3\) được`, [r`\(x^3 - 3x^2 + 3x - 1\)`, r`\(x^3 - 1\)`, r`\(x^3 - 3x^2 - 3x - 1\)`, r`\(x^3 + 3x^2 + 3x - 1\)`], 'A', r`\((x - 1)^3 = x^3 - 3x^2\cdot1 + 3x\cdot1^2 - 1^3 = x^3 - 3x^2 + 3x - 1\).`),
                sa(2, r`Biết \(x^3 + 9x^2 + 27x + 27 = (x + a)^3\). Tìm \(a\).`, ['3'], r`\(x^3 + 3\cdot x^2\cdot3 + 3\cdot x\cdot3^2 + 3^3 = (x + 3)^3\), nên \(a = 3\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng hằng đẳng thức lập phương',
          description: 'Tính nhanh, rút gọn, tìm x và chứng minh.',
          types: [
            {
              slug: 'tinh-gia-tri-rut-gon-bieu-thuc-lap-phuong',
              title: 'Tính giá trị của biểu thức, rút gọn biểu thức',
              levels: [2, 3],
              knowledge: 'Hằng đẳng thức lập phương của một tổng, một hiệu.',
              signs: 'Biểu thức có dạng khai triển của một lập phương; tính nhanh với số tròn; rút gọn hiệu các lập phương.',
              method: 'Viết gọn thành lập phương (hoặc khai triển rồi thu gọn) trước khi thay số.',
              steps: `- **Bước 1.** Nhận ra dạng lập phương của một tổng (hiệu).
- **Bước 2.** Viết gọn hoặc khai triển, thu gọn.
- **Bước 3.** Thay số và tính.`,
              mistakes: '- Thay số trực tiếp vào biểu thức bốn hạng tử, tính dài và dễ nhầm.\n- Bỏ ngoặc sai dấu khi trừ một lập phương.',
              example: r`Tính giá trị của \(A = x^3 - 6x^2 + 12x - 8\) tại \(x = 12\).`,
              solution: r`\(A = x^3 - 3\cdot x^2\cdot2 + 3\cdot x\cdot2^2 - 2^3 = (x - 2)^3\). Tại \(x = 12\): \(A = 10^3 = 1000\).`,
              exercises: [
                sa(2, r`Tính nhanh \(99^3 + 3\cdot99^2 + 3\cdot99 + 1\).`, ['1000000'], r`Biểu thức bằng \((99 + 1)^3 = 100^3 = 1\,000\,000\).`),
                sa(3, r`Rút gọn biểu thức \(B = (x + 1)^3 - (x - 1)^3 - 6x^2\).`, ['2'], r`\((x + 1)^3 - (x - 1)^3 = (x^3 + 3x^2 + 3x + 1) - (x^3 - 3x^2 + 3x - 1) = 6x^2 + 2\). Do đó \(B = 2\).`),
              ],
            },
            {
              slug: 'tim-x-hang-dang-thuc-lap-phuong',
              title: 'Tìm x bằng hằng đẳng thức lập phương',
              legacy: ['Tìm x và các dạng khác'],
              levels: [2, 3],
              knowledge: r`Hằng đẳng thức lập phương; \(A^3 = B^3 \Leftrightarrow A = B\).`,
              signs: r`Đẳng thức chứa \((x \pm a)^3\); sau khi khai triển, các hạng tử bậc ba, bậc hai triệt tiêu; hoặc một vế là lập phương của một số.`,
              method: r`Khai triển rồi thu gọn về dạng \(ax = b\); hoặc viết hai vế thành lập phương rồi so sánh cơ số.`,
              steps: r`- **Bước 1.** Khai triển (hoặc viết gọn thành lập phương).
- **Bước 2.** Thu gọn, đưa về \(ax = b\) hoặc \((x + m)^3 = k^3\).
- **Bước 3.** Tìm \(x\).`,
              mistakes: r`- Từ \((x + 1)^3 = 27\) suy ra \(x + 1 = 9\) (nhầm lập phương với bình phương).`,
              example: r`Tìm \(x\), biết \((x + 1)^3 - x^3 - 3x^2 = 10\).`,
              solution: r`\(x^3 + 3x^2 + 3x + 1 - x^3 - 3x^2 = 10\), suy ra \(3x + 1 = 10\), do đó \(x = 3\).`,
              exercises: [
                sa(2, r`Tìm \(x\), biết \(x^3 + 3x^2 + 3x + 1 = 27\).`, ['2'], r`\((x + 1)^3 = 3^3\), suy ra \(x + 1 = 3\), do đó \(x = 2\).`),
                sa(3, r`Tìm \(x\), biết \((x - 2)^3 - x(x^2 - 6x) = 4\).`, ['1'], r`\(x^3 - 6x^2 + 12x - 8 - x^3 + 6x^2 = 12x - 8 = 4\), suy ra \(x = 1\).`),
              ],
            },
            {
              slug: 'chung-minh-hang-dang-thuc-lap-phuong',
              title: 'Chứng minh đẳng thức, tính giá trị theo tổng và tích',
              levels: [3, 4],
              knowledge: r`\((a + b)^3 = a^3 + b^3 + 3ab(a + b)\); \((a - b)^3 = a^3 - b^3 - 3ab(a - b)\).`,
              signs: r`Chứng minh đẳng thức chứa lập phương; hoặc biết \(a + b\), \(ab\) (hay \(a - b\), \(ab\)), yêu cầu tính \(a^3 + b^3\), \(a^3 - b^3\).`,
              method: r`Khai triển vế phức tạp; biểu diễn \(a^3 + b^3\) qua \(a + b\) và \(ab\).`,
              steps: r`- **Bước 1.** Khai triển hoặc dùng \(a^3 + b^3 = (a + b)^3 - 3ab(a + b)\).
- **Bước 2.** Thay các giá trị đã biết (nếu có).
- **Bước 3.** Kết luận.`,
              mistakes: r`- Viết \(a^3 + b^3 = (a + b)^3\).
- Quên thừa số \((a + b)\) trong \(3ab(a + b)\).`,
              example: r`Chứng minh \((a + b)^3 - (a - b)^3 = 2b(3a^2 + b^2)\).`,
              solution: r`Vế trái \(= (a^3 + 3a^2b + 3ab^2 + b^3) - (a^3 - 3a^2b + 3ab^2 - b^3) = 6a^2b + 2b^3 = 2b(3a^2 + b^2)\) = vế phải.`,
              exercises: [
                es(3, r`Chứng minh \((a + b)^3 = a^3 + b^3 + 3ab(a + b)\).`, r`Vế trái \(= a^3 + 3a^2b + 3ab^2 + b^3 = a^3 + b^3 + 3ab(a + b)\) = vế phải.`),
                sa(4, r`Cho \(a + b = 3\) và \(ab = 2\). Tính \(a^3 + b^3\).`, ['9'], r`\(a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 27 - 3\cdot2\cdot3 = 9\).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 8 ----------------
    {
      slug: 'bai-8-tong-va-hieu-hai-lap-phuong',
      difficulty: 2,
      objectives: `- Mô tả hằng đẳng thức tổng hai lập phương, hiệu hai lập phương.
- Vận dụng bảy hằng đẳng thức để viết tích thành tổng (hiệu) và ngược lại, tính giá trị, rút gọn, chứng minh.`,
      prerequisites: '- Các hằng đẳng thức ở Bài 6, Bài 7.\n- Nhân đa thức với đa thức.',
      concepts: 'Tổng hai lập phương; hiệu hai lập phương; bình phương thiếu của một tổng, của một hiệu.',
      formulas: r`\[A^3 + B^3 = (A + B)(A^2 - AB + B^2)\]
\[A^3 - B^3 = (A - B)(A^2 + AB + B^2)\]`,
      properties: r`- \(A^2 - AB + B^2\) gọi là bình phương thiếu của hiệu; \(A^2 + AB + B^2\) gọi là bình phương thiếu của tổng.
- Không nhầm \(A^3 + B^3\) với \((A + B)^3\).`,
      themes: [
        {
          title: 'Tổng và hiệu hai lập phương',
          description: 'Viết tổng (hiệu) hai lập phương thành tích và ngược lại.',
          types: [
            {
              slug: 'hoan-thanh-hang-dang-thuc-tong-hieu-lap-phuong',
              title: 'Hoàn thành các hằng đẳng thức đã biết',
              levels: [1, 2],
              knowledge: r`\(A^3 + B^3 = (A + B)(A^2 - AB + B^2)\); \(A^3 - B^3 = (A - B)(A^2 + AB + B^2)\).`,
              signs: r`Biểu thức dạng \(A^3 \pm B^3\) (như \(x^3 + 8\), \(27x^3 - 1\)) hoặc tích \((A \pm B)(A^2 \mp AB + B^2)\).`,
              method: r`Viết mỗi số hạng thành lập phương của một biểu thức để xác định \(A\), \(B\), rồi áp dụng công thức.`,
              steps: r`- **Bước 1.** Viết \(8 = 2^3\), \(27x^3 = (3x)^3\)… để tìm \(A\), \(B\).
- **Bước 2.** Áp dụng công thức, chú ý dấu trong bình phương thiếu.
- **Bước 3.** Thu gọn.`,
              mistakes: r`- Viết sai dấu: \(A^3 + B^3 = (A + B)(A^2 + AB + B^2)\) là sai.
- Nhầm bình phương thiếu với bình phương đủ (\(A^2 - 2AB + B^2\)).
- Viết \((3x)^3 = 9x^3\); đúng là \(27x^3\).`,
              example: r`a) Viết \(x^3 + 8\) dưới dạng tích.
b) Viết \((3x - 1)(9x^2 + 3x + 1)\) dưới dạng hiệu hai lập phương.`,
              solution: r`a) \(x^3 + 8 = x^3 + 2^3 = (x + 2)(x^2 - 2x + 4)\).
b) \((3x - 1)\left[(3x)^2 + 3x\cdot1 + 1^2\right] = (3x)^3 - 1^3 = 27x^3 - 1\).`,
              exercises: [
                mcq(1, r`\(x^3 + 27\) bằng`, [r`\((x + 3)(x^2 - 3x + 9)\)`, r`\((x + 3)(x^2 + 3x + 9)\)`, r`\((x + 3)^3\)`, r`\((x - 3)(x^2 + 3x + 9)\)`], 'A', r`\(x^3 + 3^3 = (x + 3)(x^2 - 3x + 9)\).`),
                tf(2, 'Mỗi khẳng định sau đúng hay sai?', [
                  [r`\(8x^3 - 1 = (2x - 1)(4x^2 + 2x + 1)\).`, true],
                  [r`\(x^3 + y^3 = (x + y)^3\).`, false],
                  [r`\((x - 2)(x^2 + 2x + 4) = x^3 - 8\).`, true],
                  [r`\(27 + y^3 = (3 + y)(9 + 3y + y^2)\).`, false],
                ], r`a) Đúng (hiệu hai lập phương với \(A = 2x\), \(B = 1\)). b) Sai vì \((x + y)^3 = x^3 + 3x^2y + 3xy^2 + y^3\). c) Đúng. d) Sai: \(27 + y^3 = (3 + y)(9 - 3y + y^2)\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng bảy hằng đẳng thức',
          description: 'Tính giá trị, rút gọn, chứng minh với các hằng đẳng thức đáng nhớ.',
          types: [
            {
              slug: 'tinh-gia-tri-bieu-thuc-tong-hieu-lap-phuong',
              title: 'Tính giá trị của biểu thức',
              levels: [2, 3],
              knowledge: r`Tổng, hiệu hai lập phương; \(x^3 - y^3 = (x - y)\left[(x - y)^2 + 3xy\right]\).`,
              signs: r`Biểu thức là tích dạng \((A \pm B)(A^2 \mp AB + B^2)\) cần tính tại giá trị cho trước; hoặc biết \(x \pm y\), \(xy\), cần tính \(x^3 \pm y^3\).`,
              method: 'Viết gọn biểu thức bằng hằng đẳng thức rồi thay số; với dữ kiện tổng – tích, biểu diễn biểu thức cần tính qua tổng và tích.',
              steps: `- **Bước 1.** Viết gọn bằng hằng đẳng thức.
- **Bước 2.** Thay giá trị đã biết.
- **Bước 3.** Tính và kết luận.`,
              mistakes: '- Khai triển tích rồi mới thay số, tính dài.\n- Sai dấu khi lập phương số âm: (−3)³ = −27.',
              example: r`Tính giá trị của \(C = (x - 3)(x^2 + 3x + 9)\) tại \(x = 5\).`,
              solution: r`\(C = x^3 - 27\). Tại \(x = 5\): \(C = 125 - 27 = 98\).`,
              exercises: [
                sa(2, r`Tính giá trị của biểu thức \((x + 2)(x^2 - 2x + 4)\) tại \(x = -3\).`, ['-19'], r`Biểu thức bằng \(x^3 + 8\). Tại \(x = -3\): \(-27 + 8 = -19\).`),
                sa(3, r`Cho \(x - y = 2\) và \(xy = 3\). Tính \(x^3 - y^3\).`, ['26'], r`\(x^3 - y^3 = (x - y)(x^2 + xy + y^2) = (x - y)\left[(x - y)^2 + 3xy\right] = 2(4 + 9) = 26\).`),
              ],
            },
            {
              slug: 'rut-gon-chung-minh-bay-hang-dang-thuc',
              title: 'Rút gọn, chứng minh và các dạng khác',
              levels: [3, 4],
              knowledge: 'Bảy hằng đẳng thức đáng nhớ; nhân đa thức.',
              signs: 'Biểu thức gồm nhiều tích, lũy thừa có dạng hằng đẳng thức cần rút gọn; đẳng thức cần chứng minh.',
              method: 'Nhận ra từng hằng đẳng thức, viết gọn (hoặc khai triển), sau đó thu gọn.',
              steps: `- **Bước 1.** Đánh dấu từng cụm có dạng hằng đẳng thức.
- **Bước 2.** Áp dụng hằng đẳng thức cho từng cụm.
- **Bước 3.** Thu gọn và kết luận.`,
              mistakes: '- Áp dụng nhầm công thức tổng với hiệu hai lập phương.\n- Bỏ ngoặc sai dấu.',
              example: r`Rút gọn \(A = (x + 2)(x^2 - 2x + 4) - (x^3 - 1)\).`,
              solution: r`\(A = (x^3 + 8) - x^3 + 1 = 9\).`,
              exercises: [
                sa(3, r`Rút gọn biểu thức \((2x - 1)(4x^2 + 2x + 1) - 8x^3\).`, ['-1'], r`\((2x - 1)(4x^2 + 2x + 1) = 8x^3 - 1\). Do đó biểu thức bằng \(-1\).`),
                es(4, r`Chứng minh rằng nếu \(a + b + c = 0\) thì \(a^3 + b^3 + c^3 = 3abc\).`, r`Từ \(a + b + c = 0\) suy ra \(c = -(a + b)\). Khi đó
\[a^3 + b^3 + c^3 = a^3 + b^3 - (a + b)^3 = -3ab(a + b) = 3abc.\]`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 9 ----------------
    {
      slug: 'bai-9-phan-tich-da-thuc-thanh-nhan-tu',
      difficulty: 3,
      objectives: `- Hiểu thế nào là phân tích đa thức thành nhân tử.
- Phân tích đa thức thành nhân tử bằng các phương pháp đặt nhân tử chung, sử dụng hằng đẳng thức, nhóm hạng tử.
- Vận dụng để tìm x, tính nhanh và tính giá trị biểu thức.`,
      prerequisites: '- Bảy hằng đẳng thức đáng nhớ (Bài 6 – Bài 8).\n- Tính chất phân phối của phép nhân đối với phép cộng.',
      concepts: 'Phân tích đa thức thành nhân tử (viết đa thức thành tích của những đa thức); nhân tử chung.',
      formulas: r`\(AB + AC = A(B + C)\); \(A\cdot B = 0\) khi và chỉ khi \(A = 0\) hoặc \(B = 0\).`,
      properties: r`- Có thể phối hợp nhiều phương pháp; thường đặt nhân tử chung trước (nếu có).
- Đổi dấu để làm xuất hiện nhân tử chung: \(-(A - B) = B - A\).`,
      themes: [
        {
          title: 'Các phương pháp phân tích đa thức thành nhân tử',
          description: 'Đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử, tách – thêm bớt hạng tử.',
          types: [
            {
              slug: 'dat-nhan-tu-chung',
              title: 'Phương pháp đặt nhân tử chung',
              levels: [1, 2],
              knowledge: r`\(AB + AC = A(B + C)\); nhân tử chung gồm ước chung lớn nhất của các hệ số và lũy thừa chung của các biến.`,
              signs: 'Các hạng tử có chung thừa số (số, biến hoặc biểu thức trong ngoặc), có thể phải đổi dấu mới thấy.',
              method: 'Tìm nhân tử chung của mọi hạng tử, đặt ra ngoài ngoặc; trong ngoặc là thương của từng hạng tử với nhân tử chung.',
              steps: r`- **Bước 1.** Tìm ƯCLN của các hệ số và lũy thừa nhỏ nhất của mỗi biến chung (hoặc biểu thức chung).
- **Bước 2.** Đổi dấu nếu cần: \(2(1 - y) = -2(y - 1)\).
- **Bước 3.** Viết nhân tử chung ra ngoài, chia từng hạng tử cho nó.`,
              mistakes: '- Quên hạng tử bằng chính nhân tử chung (thương là 1).\n- Đặt nhân tử chung chưa triệt để (còn thừa số chung trong ngoặc).\n- Đổi dấu sai.',
              example: r`a) Phân tích \(6x^2y - 9xy^2 + 3xy\) thành nhân tử.
b) Phân tích \(x(y - 1) - 2(1 - y)\) thành nhân tử.`,
              solution: r`a) \(6x^2y - 9xy^2 + 3xy = 3xy(2x - 3y + 1)\).
b) \(x(y - 1) - 2(1 - y) = x(y - 1) + 2(y - 1) = (y - 1)(x + 2)\).`,
              exercises: [
                mcq(1, r`Phân tích \(4x^2 - 8x\) thành nhân tử được`, [r`\(4x(x - 2)\)`, r`\(4x(x - 8)\)`, r`\(2x(2x - 8)\)`, r`\(4x(x + 2)\)`], 'A', r`Nhân tử chung là \(4x\): \(4x^2 - 8x = 4x(x - 2)\).`),
                sa(2, r`Phân tích \(3x(x - 5) - 2(5 - x) = (x - 5)(ax + b)\). Tính \(a + b\).`, ['5'], r`\(3x(x - 5) - 2(5 - x) = 3x(x - 5) + 2(x - 5) = (x - 5)(3x + 2)\). Vậy \(a + b = 5\).`),
              ],
            },
            {
              slug: 'su-dung-hang-dang-thuc',
              title: 'Phương pháp sử dụng hằng đẳng thức',
              levels: [2, 3],
              knowledge: 'Bảy hằng đẳng thức đáng nhớ theo chiều viết gọn.',
              signs: r`Đa thức có dạng vế phải của một hằng đẳng thức: hiệu hai bình phương, tam thức \(A^2 \pm 2AB + B^2\), tổng (hiệu) hai lập phương…`,
              method: 'Nhận dạng hằng đẳng thức, xác định A, B rồi viết đa thức thành tích.',
              steps: `- **Bước 1.** Viết các hạng tử thành bình phương, lập phương của các biểu thức.
- **Bước 2.** Nhận dạng và áp dụng hằng đẳng thức.
- **Bước 3.** Kiểm tra từng nhân tử có phân tích tiếp được không.`,
              mistakes: r`- Áp dụng \(A^2 + B^2 = (A + B)(A - B)\) (sai, chỉ có hiệu hai bình phương).
- Nhầm \(A^2 + 2AB + B^2\) với \(A^2 + AB + B^2\).`,
              example: r`Phân tích thành nhân tử: a) \(4x^2 - 25\); b) \(x^3 + 27\).`,
              solution: r`a) \(4x^2 - 25 = (2x)^2 - 5^2 = (2x - 5)(2x + 5)\).
b) \(x^3 + 27 = (x + 3)(x^2 - 3x + 9)\).`,
              exercises: [
                mcq(2, r`Phân tích \(x^2 + 10x + 25\) thành nhân tử được`, [r`\((x + 5)^2\)`, r`\((x - 5)^2\)`, r`\((x + 5)(x - 5)\)`, r`\((x + 25)^2\)`], 'A', r`\(x^2 + 2\cdot x\cdot5 + 5^2 = (x + 5)^2\).`),
                sa(3, r`Phân tích \((x + 1)^2 - 9 = (x + a)(x + b)\) với \(a < b\). Tìm \(b\).`, ['4'], r`\((x + 1)^2 - 3^2 = (x + 1 - 3)(x + 1 + 3) = (x - 2)(x + 4)\). Vậy \(a = -2\), \(b = 4\).`),
              ],
            },
            {
              slug: 'nhom-hang-tu',
              title: 'Phương pháp nhóm hạng tử',
              levels: [2, 3],
              knowledge: 'Đặt nhân tử chung; hằng đẳng thức; tính chất giao hoán, kết hợp của phép cộng.',
              signs: 'Đa thức có từ bốn hạng tử, không có nhân tử chung cho tất cả nhưng có nhân tử chung (hoặc hằng đẳng thức) theo từng nhóm.',
              method: 'Nhóm các hạng tử thích hợp sao cho mỗi nhóm phân tích được và xuất hiện nhân tử chung giữa các nhóm.',
              steps: `- **Bước 1.** Chọn cách nhóm (thường nhóm hai hạng tử có nhân tử chung, hoặc nhóm thành hằng đẳng thức).
- **Bước 2.** Phân tích từng nhóm.
- **Bước 3.** Đặt nhân tử chung của các nhóm.`,
              mistakes: '- Đặt dấu "−" trước ngoặc khi nhóm nhưng quên đổi dấu các hạng tử trong ngoặc.\n- Chọn cách nhóm không làm xuất hiện nhân tử chung mà không thử cách khác.',
              example: r`Phân tích \(x^2 - xy + 3x - 3y\) thành nhân tử.`,
              solution: r`\(x^2 - xy + 3x - 3y = (x^2 - xy) + (3x - 3y) = x(x - y) + 3(x - y) = (x - y)(x + 3)\).`,
              exercises: [
                mcq(2, r`Phân tích \(ax + ay - bx - by\) thành nhân tử được`, [r`\((x + y)(a - b)\)`, r`\((x - y)(a + b)\)`, r`\((a + b)(x + y)\)`, r`\((a - b)(x - y)\)`], 'A', r`\(a(x + y) - b(x + y) = (x + y)(a - b)\).`),
                sa(3, r`Phân tích \(x^2 + 4x + 4 - y^2 = (x + y + m)(x - y + m)\). Tìm \(m\).`, ['2'], r`\((x^2 + 4x + 4) - y^2 = (x + 2)^2 - y^2 = (x + 2 + y)(x + 2 - y)\). Vậy \(m = 2\).`),
              ],
            },
            {
              slug: 'tach-hang-tu-them-bot-hang-tu',
              title: 'Tách hạng tử, thêm bớt hạng tử (nâng cao)',
              levels: [4],
              knowledge: r`Nhóm hạng tử; hằng đẳng thức hiệu hai bình phương. Tam thức \(x^2 + bx + c\) tách \(bx = mx + nx\) với \(m + n = b\), \(mn = c\).`,
              signs: r`Tam thức bậc hai \(x^2 + bx + c\) không có dạng hằng đẳng thức; đa thức như \(x^4 + 4\) cần thêm bớt để tạo hiệu hai bình phương.`,
              method: 'Tách một hạng tử thành hai (hoặc thêm và bớt cùng một hạng tử) để có thể nhóm hoặc dùng hằng đẳng thức.',
              steps: r`- **Bước 1.** Với \(x^2 + bx + c\): tìm hai số \(m\), \(n\) có tổng \(b\), tích \(c\).
- **Bước 2.** Tách \(bx = mx + nx\) (hoặc thêm bớt để tạo bình phương).
- **Bước 3.** Nhóm hạng tử và đặt nhân tử chung (hoặc dùng hiệu hai bình phương).`,
              mistakes: '- Chọn hai số có tổng đúng nhưng tích sai (hoặc ngược lại).\n- Thêm một hạng tử mà quên bớt chính hạng tử đó.',
              example: r`Phân tích thành nhân tử: a) \(x^2 + 5x + 6\); b) \(x^4 + 4\).`,
              solution: r`a) \(x^2 + 5x + 6 = x^2 + 2x + 3x + 6 = x(x + 2) + 3(x + 2) = (x + 2)(x + 3)\).
b) \(x^4 + 4 = x^4 + 4x^2 + 4 - 4x^2 = (x^2 + 2)^2 - (2x)^2 = (x^2 - 2x + 2)(x^2 + 2x + 2)\).`,
              exercises: [
                sa(4, r`Phân tích \(x^2 - 7x + 12 = (x - a)(x - b)\) với \(a < b\). Tìm \(a\).`, ['3'], r`Hai số có tổng \(-7\) và tích 12 là \(-3\), \(-4\): \(x^2 - 3x - 4x + 12 = x(x - 3) - 4(x - 3) = (x - 3)(x - 4)\). Vậy \(a = 3\).`),
                es(4, r`Phân tích đa thức \(x^4 + 64\) thành nhân tử.`, r`\(x^4 + 64 = x^4 + 16x^2 + 64 - 16x^2 = (x^2 + 8)^2 - (4x)^2 = (x^2 - 4x + 8)(x^2 + 4x + 8)\).`),
              ],
            },
          ],
        },
        {
          title: 'Ứng dụng phân tích đa thức thành nhân tử',
          description: 'Tìm x bằng cách đưa về tích bằng 0; tính nhanh, tính giá trị biểu thức.',
          types: [
            {
              slug: 'tim-x-phan-tich-nhan-tu',
              title: 'Tìm đại lượng chưa biết (tìm x)',
              levels: [2, 3],
              knowledge: r`\(A\cdot B = 0\) khi và chỉ khi \(A = 0\) hoặc \(B = 0\); các phương pháp phân tích thành nhân tử.`,
              signs: r`Đẳng thức có một vế bằng 0 (hoặc chuyển được về 0), vế kia là đa thức bậc hai, bậc ba theo \(x\).`,
              method: 'Chuyển hết sang một vế, phân tích vế đó thành tích rồi cho từng nhân tử bằng 0.',
              steps: `- **Bước 1.** Chuyển vế để một vế bằng 0.
- **Bước 2.** Phân tích vế còn lại thành nhân tử.
- **Bước 3.** Cho từng nhân tử bằng 0, tìm x và kết luận đủ các giá trị.`,
              mistakes: r`- Chia hai vế cho \(x\) làm mất nghiệm \(x = 0\) (ví dụ từ \(x^2 = 4x\) suy ra \(x = 4\)).
- Chỉ nêu một giá trị của \(x\) khi có hai giá trị.`,
              example: r`Tìm \(x\), biết \(x^2 - 4x = 0\).`,
              solution: r`\(x(x - 4) = 0\), suy ra \(x = 0\) hoặc \(x = 4\).`,
              exercises: [
                sa(2, r`Tìm \(x < 0\), biết \(x^2 - 25 = 0\).`, ['-5'], r`\((x - 5)(x + 5) = 0\), suy ra \(x = 5\) hoặc \(x = -5\). Vì \(x < 0\) nên \(x = -5\).`),
                sa(3, r`Tìm giá trị nguyên của \(x\) thỏa mãn \(2x(x - 3) + x - 3 = 0\).`, ['3'], r`\((x - 3)(2x + 1) = 0\), suy ra \(x = 3\) hoặc \(x = -\dfrac12\). Giá trị nguyên là \(x = 3\).`),
              ],
            },
            {
              slug: 'tinh-gia-tri-phan-tich-nhan-tu',
              title: 'Tính giá trị của biểu thức',
              levels: [2, 3],
              knowledge: 'Phân tích đa thức thành nhân tử; hằng đẳng thức hiệu hai bình phương.',
              signs: 'Tính nhanh hiệu hai bình phương của các số; tính giá trị biểu thức khi biết tổng (hiệu) của các biến hoặc tại giá trị làm các nhân tử đẹp.',
              method: 'Phân tích biểu thức thành tích (hoặc biểu diễn qua các đại lượng đã biết) rồi thay số.',
              steps: `- **Bước 1.** Phân tích biểu thức thành nhân tử.
- **Bước 2.** Thay giá trị đã biết vào từng nhân tử.
- **Bước 3.** Tính tích.`,
              mistakes: '- Thay số trực tiếp khi số lớn, tính dài và dễ sai.',
              example: r`a) Tính nhanh \(37^2 - 13^2\).
b) Tính giá trị của \(x^2 - xy - 5x + 5y\) tại \(x = 15\), \(y = 5\).`,
              solution: r`a) \(37^2 - 13^2 = (37 - 13)(37 + 13) = 24\cdot50 = 1200\).
b) \(x^2 - xy - 5x + 5y = x(x - y) - 5(x - y) = (x - y)(x - 5) = 10\cdot10 = 100\).`,
              exercises: [
                sa(2, r`Tính nhanh \(87^2 - 13^2\).`, ['7400'], r`\((87 - 13)(87 + 13) = 74\cdot100 = 7400\).`),
                sa(3, r`Tính giá trị của biểu thức \(A = x^2 + 2xy + y^2 - 4x - 4y\), biết \(x + y = 6\).`, ['12'], r`\(A = (x + y)^2 - 4(x + y) = 36 - 24 = 12\).`),
              ],
            },
          ],
        },
      ],
    },
  ],
};
