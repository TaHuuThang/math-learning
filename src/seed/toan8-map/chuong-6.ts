import { es, mcq, r, sa, tf, type MapChapter } from './types';

/** Chương VI. Phân thức đại số – Bài 21 đến Bài 24. */
export const CHUONG_6: MapChapter = {
  code: 'VI',
  objectives: `- Nhận biết phân thức đại số, điều kiện xác định, giá trị của phân thức, hai phân thức bằng nhau.
- Mô tả tính chất cơ bản của phân thức; rút gọn phân thức, quy đồng mẫu thức nhiều phân thức.
- Thực hiện cộng, trừ, nhân, chia phân thức; vận dụng giải bài toán thực tế.`,
  keyPoints: r`- Phân thức \(\dfrac{A}{B}\) (\(B\) khác đa thức 0); điều kiện xác định \(B \ne 0\).
- Tính chất cơ bản: nhân (chia) cả tử và mẫu với cùng một đa thức khác 0 (một nhân tử chung); quy tắc đổi dấu.
- Quy tắc cộng, trừ (cùng mẫu, khác mẫu), nhân, chia phân thức; kết quả luôn rút gọn.`,
  formulas: r`\[\dfrac{A}{B} = \dfrac{C}{D} \Leftrightarrow AD = BC;\qquad \dfrac{A}{B} = \dfrac{A\cdot M}{B\cdot M} = \dfrac{-A}{-B}\]
\[\dfrac{A}{M} + \dfrac{B}{M} = \dfrac{A + B}{M};\qquad \dfrac{A}{B} - \dfrac{C}{D} = \dfrac{A}{B} + \dfrac{-C}{D}\]
\[\dfrac{A}{B}\cdot\dfrac{C}{D} = \dfrac{AC}{BD};\qquad \dfrac{A}{B} : \dfrac{C}{D} = \dfrac{A}{B}\cdot\dfrac{D}{C}\]`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 2 (VietJack) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-6a', objectives: 'Củng cố phân thức đại số, điều kiện xác định, tính chất cơ bản, rút gọn và quy đồng mẫu thức.' },
    { slug: 'luyen-tap-chung-6b', objectives: 'Củng cố cộng, trừ, nhân, chia phân thức và dãy phép tính với phân thức.' },
    { slug: 'bai-tap-cuoi-chuong-6', objectives: 'Ôn tập toàn Chương VI: phân thức, tính chất cơ bản và các phép tính; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 21 ----------------
    {
      slug: 'bai-21-phan-thuc-dai-so',
      difficulty: 2,
      objectives: `- Nhận biết phân thức đại số, tử thức, mẫu thức.
- Nhận biết hai phân thức bằng nhau.
- Xác định điều kiện xác định và tính giá trị của phân thức.`,
      prerequisites: '- Phân số, hai phân số bằng nhau (Toán 6).\n- Đa thức, nhân đa thức (Chương I); phân tích đa thức thành nhân tử (Chương II).',
      concepts: r`Phân thức đại số \(\dfrac{A}{B}\); tử thức, mẫu thức; điều kiện xác định; giá trị của phân thức; hai phân thức bằng nhau.`,
      formulas: r`\(\dfrac{A}{B} = \dfrac{C}{D}\) nếu \(A\cdot D = B\cdot C\).`,
      properties: r`- Mỗi đa thức cũng được coi là một phân thức có mẫu thức bằng 1.
- Điều kiện xác định của phân thức \(\dfrac{A}{B}\) là \(B \ne 0\).`,
      themes: [
        {
          title: 'Phân thức đại số',
          description: 'Nhận biết phân thức, tử thức, mẫu thức; hai phân thức bằng nhau.',
          types: [
            {
              slug: 'tu-thuc-mau-thuc',
              title: 'Xác định tử thức, mẫu thức',
              levels: [1],
              knowledge: r`Phân thức đại số có dạng \(\dfrac{A}{B}\), trong đó \(A\), \(B\) là các đa thức, \(B\) khác đa thức 0; \(A\) là tử thức, \(B\) là mẫu thức.`,
              signs: 'Đề yêu cầu nhận biết biểu thức nào là phân thức, chỉ ra tử thức và mẫu thức.',
              method: 'Viết biểu thức dưới dạng thương của hai đa thức; kiểm tra mẫu khác đa thức 0.',
              steps: `- **Bước 1.** Xác định phần trên và phần dưới dấu gạch phân số.
- **Bước 2.** Kiểm tra cả hai là đa thức và mẫu khác đa thức 0.
- **Bước 3.** Với đa thức (không có mẫu), mẫu thức bằng 1.`,
              mistakes: '- Cho rằng đa thức không phải là phân thức.\n- Ghi thiếu dấu khi chỉ ra tử thức, mẫu thức.',
              example: r`Chỉ ra tử thức, mẫu thức của các phân thức \(\dfrac{x + 1}{x - 2}\); \(\dfrac{5}{2x + y}\); \(3x^2 - 1\).`,
              solution: r`\(\dfrac{x + 1}{x - 2}\): tử \(x + 1\), mẫu \(x - 2\). \(\dfrac{5}{2x + y}\): tử \(5\), mẫu \(2x + y\). \(3x^2 - 1 = \dfrac{3x^2 - 1}{1}\): tử \(3x^2 - 1\), mẫu \(1\).`,
              exercises: [
                mcq(1, 'Biểu thức nào sau đây **không** phải là phân thức đại số?', [r`\(\dfrac{x - 1}{x + 3}\)`, r`\(x^2 + 2\)`, r`\(\dfrac{2x}{0}\)`, r`\(\dfrac{1}{y}\)`], 'C', r`Mẫu thức phải khác đa thức 0, nên \(\dfrac{2x}{0}\) không phải là phân thức.`),
                tf(1, r`Cho phân thức \(\dfrac{x^2 - 1}{2x + 4}\). Mỗi khẳng định sau đúng hay sai?`, [
                  [r`Tử thức là \(x^2 - 1\).`, true],
                  [r`Mẫu thức là \(2x\).`, false],
                  [r`Mẫu thức bằng 0 khi \(x = -2\).`, true],
                  [r`Đa thức \(x^2 - 1\) cũng là một phân thức.`, true],
                ], r`a) Đúng. b) Sai: mẫu thức là \(2x + 4\). c) Đúng: \(2\cdot(-2) + 4 = 0\). d) Đúng: \(x^2 - 1 = \dfrac{x^2 - 1}{1}\).`),
              ],
            },
            {
              slug: 'hai-phan-thuc-bang-nhau',
              title: 'Hai phân thức bằng nhau',
              levels: [1, 2],
              knowledge: r`\(\dfrac{A}{B} = \dfrac{C}{D}\) nếu \(A\cdot D = B\cdot C\).`,
              signs: 'Đề yêu cầu kiểm tra hai phân thức có bằng nhau không, hoặc tìm đa thức chưa biết để hai phân thức bằng nhau.',
              method: 'So sánh hai tích chéo AD và BC (nhân đa thức, thu gọn).',
              steps: `- **Bước 1.** Tính tích chéo A·D và B·C.
- **Bước 2.** Thu gọn và so sánh.
- **Bước 3.** Kết luận (hoặc suy ra đa thức chưa biết).`,
              mistakes: '- Nhân "thẳng" (A·C và B·D) thay vì nhân chéo.\n- Sai dấu khi khai triển.',
              example: r`Chứng minh \(\dfrac{x - 1}{x^2 - 1} = \dfrac{1}{x + 1}\).`,
              solution: r`\((x - 1)(x + 1) = x^2 - 1 = (x^2 - 1)\cdot1\). Hai tích chéo bằng nhau nên hai phân thức bằng nhau.`,
              exercises: [
                mcq(1, r`Phân thức nào bằng phân thức \(\dfrac{x}{x + 2}\)?`, [r`\(\dfrac{x^2}{x^2 + 2x}\)`, r`\(\dfrac{x^2}{x^2 + 2}\)`, r`\(\dfrac{x + 1}{x + 3}\)`, r`\(\dfrac{2x}{x + 4}\)`], 'A', r`\(x\cdot(x^2 + 2x) = x^3 + 2x^2 = x^2(x + 2)\) nên \(\dfrac{x}{x + 2} = \dfrac{x^2}{x^2 + 2x}\).`),
                sa(2, r`Tìm đa thức \(A\) biết \(\dfrac{A}{x - 3} = \dfrac{2x^2 + 6x}{x^2 - 9}\). Đa thức \(A\) có dạng \(ax\). Tìm \(a\).`, ['2'], r`\(A(x^2 - 9) = (x - 3)(2x^2 + 6x) = 2x(x - 3)(x + 3)\), suy ra \(A = 2x\), \(a = 2\).`),
              ],
            },
          ],
        },
        {
          title: 'Điều kiện xác định và giá trị của phân thức',
          description: 'Tìm điều kiện xác định, tính giá trị, bài toán thực tế.',
          types: [
            {
              slug: 'dieu-kien-xac-dinh-phan-thuc',
              title: 'Tìm điều kiện xác định của phân thức',
              levels: [1, 2, 3],
              knowledge: r`Phân thức \(\dfrac{A}{B}\) xác định khi \(B \ne 0\); \(PQ \ne 0\) khi \(P \ne 0\) và \(Q \ne 0\).`,
              signs: 'Đề hỏi điều kiện xác định, hoặc giá trị nào của biến làm phân thức không xác định.',
              method: 'Cho mẫu thức khác 0; phân tích mẫu thành nhân tử rồi cho từng nhân tử khác 0.',
              steps: r`- **Bước 1.** Viết điều kiện mẫu thức \(\ne 0\).
- **Bước 2.** Phân tích mẫu thành nhân tử.
- **Bước 3.** Cho từng nhân tử khác 0, kết luận.`,
              mistakes: r`- Cho tử thức khác 0 thay vì mẫu thức.
- Viết "\(x \ne 0\) hoặc \(x \ne 4\)" (phải là "và").`,
              example: r`Tìm điều kiện xác định của phân thức \(\dfrac{3}{x^2 - 4x}\).`,
              solution: r`\(x^2 - 4x = x(x - 4) \ne 0\) khi \(x \ne 0\) và \(x \ne 4\).`,
              exercises: [
                mcq(1, r`Điều kiện xác định của phân thức \(\dfrac{x + 1}{x - 5}\) là`, [r`\(x \ne 5\)`, r`\(x \ne -1\)`, r`\(x \ne 0\)`, r`\(x = 5\)`], 'A', r`Mẫu thức \(x - 5 \ne 0\) khi \(x \ne 5\).`),
                sa(2, r`Phân thức \(\dfrac{2x}{x^2 - 9}\) không xác định tại hai giá trị của \(x\). Tổng hai giá trị đó bằng bao nhiêu?`, ['0'], r`\(x^2 - 9 = (x - 3)(x + 3) = 0\) khi \(x = 3\) hoặc \(x = -3\). Tổng bằng 0.`),
                es(3, r`Tìm điều kiện xác định của phân thức \(\dfrac{x}{x^2 + 1}\). Giải thích.`, r`\(x^2 \ge 0\) nên \(x^2 + 1 \ge 1 > 0\) với mọi \(x\). Mẫu luôn khác 0, phân thức xác định với mọi \(x\).`),
              ],
            },
            {
              slug: 'gia-tri-phan-thuc',
              title: 'Tính giá trị của phân thức',
              levels: [2, 3],
              knowledge: 'Điều kiện xác định; rút gọn phân thức trước khi thay số; phân thức bằng 0 khi tử bằng 0 và mẫu khác 0.',
              signs: 'Đề cho giá trị của biến và yêu cầu tính giá trị phân thức, hoặc tìm x để phân thức bằng một số cho trước.',
              method: 'Kiểm tra giá trị của biến thỏa điều kiện xác định, rồi thay vào (nên rút gọn trước).',
              steps: `- **Bước 1.** Tìm điều kiện xác định.
- **Bước 2.** Kiểm tra giá trị của biến có thỏa điều kiện không.
- **Bước 3.** Thay số và tính (hoặc giải đẳng thức để tìm x, đối chiếu điều kiện).`,
              mistakes: '- Thay giá trị làm mẫu bằng 0 mà vẫn tính.\n- Khi tìm x để phân thức bằng 0, quên loại giá trị làm mẫu bằng 0.',
              example: r`Tính giá trị của phân thức \(\dfrac{x^2 - 1}{x + 3}\) tại \(x = 2\) và tại \(x = -3\).`,
              solution: r`Điều kiện \(x \ne -3\). Tại \(x = 2\): \(\dfrac{4 - 1}{5} = \dfrac35\). Tại \(x = -3\) phân thức không xác định.`,
              exercises: [
                sa(2, r`Tính giá trị của phân thức \(\dfrac{2x - 1}{x + 1}\) tại \(x = 3\).`, ['5/4', '1,25'], r`\(\dfrac{2\cdot3 - 1}{3 + 1} = \dfrac{5}{4}\).`),
                sa(3, r`Tìm \(x\) để phân thức \(\dfrac{x - 2}{x + 1}\) có giá trị bằng 0.`, ['2'], r`Điều kiện \(x \ne -1\). Phân thức bằng 0 khi \(x - 2 = 0\), tức là \(x = 2\) (thỏa điều kiện).`),
              ],
            },
            {
              slug: 'bai-toan-thuc-te-phan-thuc',
              title: 'Bài toán thực tế về phân thức',
              levels: [3],
              knowledge: 'Biểu diễn đại lượng bằng phân thức (thời gian = quãng đường : vận tốc, năng suất…); tính giá trị của phân thức.',
              signs: 'Đề mô tả tình huống thực tế có đại lượng là thương của hai đại lượng chứa biến.',
              method: 'Lập phân thức biểu thị đại lượng cần tìm, xác định điều kiện thực tế của biến, rồi tính giá trị.',
              steps: `- **Bước 1.** Xác định công thức liên hệ (thời gian = quãng đường : vận tốc…).
- **Bước 2.** Viết phân thức theo biến đã cho.
- **Bước 3.** Thay giá trị của biến, tính và ghi đơn vị.`,
              mistakes: '- Lập ngược tử và mẫu (vận tốc : quãng đường).\n- Quên đơn vị.',
              example: 'Một ô tô đi quãng đường 120 km với vận tốc x (km/h). Viết phân thức biểu thị thời gian ô tô đi hết quãng đường và tính thời gian đó khi x = 48.',
              solution: r`Thời gian: \(\dfrac{120}{x}\) (giờ). Khi \(x = 48\): \(\dfrac{120}{48} = 2{,}5\) giờ.`,
              exercises: [
                sa(3, r`Một bể chứa 1 500 lít nước. Một vòi chảy được \(x\) lít mỗi phút nên thời gian vòi chảy đầy bể là \(\dfrac{1500}{x}\) phút. Tính thời gian đó khi \(x = 60\).`, ['25'], r`\(\dfrac{1500}{60} = 25\) phút.`, 'phút'),
                sa(3, r`Một nhóm bạn góp 600 nghìn đồng mua quà. Nếu có \(x\) bạn góp đều nhau thì mỗi bạn góp \(\dfrac{600}{x}\) nghìn đồng. Nếu có thêm 5 bạn cùng góp thì mỗi bạn góp bao nhiêu khi \(x = 35\)?`, ['15'], r`Khi có thêm 5 bạn, mỗi bạn góp \(\dfrac{600}{x + 5}\) nghìn đồng. Với \(x = 35\): \(\dfrac{600}{40} = 15\) nghìn đồng.`, 'nghìn đồng'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 22 ----------------
    {
      slug: 'bai-22-tinh-chat-co-ban-cua-phan-thuc-dai-so',
      difficulty: 3,
      objectives: `- Mô tả tính chất cơ bản của phân thức đại số và quy tắc đổi dấu.
- Rút gọn phân thức; quy đồng mẫu thức nhiều phân thức.`,
      prerequisites: '- Phân tích đa thức thành nhân tử (Bài 9).\n- Hai phân thức bằng nhau (Bài 21).',
      concepts: 'Tính chất cơ bản của phân thức; quy tắc đổi dấu; rút gọn phân thức; mẫu thức chung; quy đồng mẫu thức.',
      formulas: r`\(\dfrac{A}{B} = \dfrac{A\cdot M}{B\cdot M}\) (\(M\) khác đa thức 0); \(\dfrac{A}{B} = \dfrac{A : N}{B : N}\) (\(N\) là một nhân tử chung); \(\dfrac{A}{B} = \dfrac{-A}{-B}\).`,
      properties: `- Rút gọn: phân tích tử và mẫu thành nhân tử rồi chia cả tử và mẫu cho các nhân tử chung.
- Mẫu thức chung gồm BCNN của các hệ số và mọi nhân tử có mặt ở các mẫu, mỗi nhân tử lấy với số mũ lớn nhất.`,
      themes: [
        {
          title: 'Tính chất cơ bản và rút gọn phân thức',
          description: 'Vận dụng tính chất cơ bản, quy tắc đổi dấu; rút gọn phân thức.',
          types: [
            {
              slug: 'van-dung-tinh-chat-co-ban',
              title: 'Vận dụng tính chất cơ bản của phân thức',
              levels: [1, 2],
              knowledge: r`\(\dfrac{A}{B} = \dfrac{A\cdot M}{B\cdot M}\); \(\dfrac{A}{B} = \dfrac{-A}{-B}\).`,
              signs: 'Điền đa thức vào chỗ trống để hai phân thức bằng nhau; đổi dấu tử và mẫu.',
              method: 'So sánh hai mẫu (hoặc hai tử) để tìm đa thức M đã nhân thêm, rồi nhân phần còn lại với M.',
              steps: `- **Bước 1.** Phân tích các mẫu (tử) thành nhân tử.
- **Bước 2.** Tìm đa thức M đã nhân (hoặc chia) để mẫu cũ thành mẫu mới.
- **Bước 3.** Nhân (chia) tử tương ứng với M.`,
              mistakes: '- Chỉ nhân mẫu mà quên nhân tử.\n- Đổi dấu tử mà không đổi dấu mẫu.',
              example: r`a) Điền đa thức thích hợp: \(\dfrac{x}{x - 2} = \dfrac{\ldots}{x^2 - 4}\).
b) Viết \(\dfrac{1 - x}{3 - x}\) thành phân thức có mẫu \(x - 3\).`,
              solution: r`a) \(x^2 - 4 = (x - 2)(x + 2)\) nên đa thức cần điền là \(x(x + 2) = x^2 + 2x\).
b) \(\dfrac{1 - x}{3 - x} = \dfrac{-(1 - x)}{-(3 - x)} = \dfrac{x - 1}{x - 3}\).`,
              exercises: [
                mcq(1, r`\(\dfrac{-2}{1 - x}\) bằng`, [r`\(\dfrac{2}{x - 1}\)`, r`\(\dfrac{2}{1 - x}\)`, r`\(\dfrac{-2}{x - 1}\)`, r`\(\dfrac{2}{-x - 1}\)`], 'A', r`Đổi dấu cả tử và mẫu: \(\dfrac{-2}{1 - x} = \dfrac{2}{x - 1}\).`),
                sa(2, r`Cho \(\dfrac{3}{x + 1} = \dfrac{A}{x^2 - 1}\). Đa thức \(A\) có dạng \(ax + b\). Tính \(a + b\).`, ['0'], r`\(x^2 - 1 = (x + 1)(x - 1)\) nên \(A = 3(x - 1) = 3x - 3\). Vậy \(a + b = 0\).`),
              ],
            },
            {
              slug: 'rut-gon-phan-thuc',
              title: 'Rút gọn phân thức',
              levels: [2, 3],
              knowledge: 'Phân tích đa thức thành nhân tử; tính chất cơ bản của phân thức.',
              signs: 'Đề yêu cầu rút gọn phân thức (thường tử, mẫu có dạng hằng đẳng thức hoặc có nhân tử chung), có thể kèm tính giá trị.',
              method: 'Phân tích tử và mẫu thành nhân tử, chia cả tử và mẫu cho nhân tử chung.',
              steps: `- **Bước 1.** Phân tích tử và mẫu thành nhân tử (đổi dấu nếu cần để thấy nhân tử chung).
- **Bước 2.** Chia cả tử và mẫu cho các nhân tử chung.
- **Bước 3.** Viết kết quả; nếu tính giá trị thì thay số vào phân thức đã rút gọn (đối chiếu điều kiện).`,
              mistakes: r`- "Rút gọn" từng hạng tử: \(\dfrac{x + 2}{x + 5} = \dfrac{2}{5}\) là sai.
- Rút gọn khi chưa phân tích thành nhân tử.`,
              example: r`Rút gọn phân thức \(\dfrac{x^2 - 4}{x^2 + 2x}\).`,
              solution: r`\(\dfrac{x^2 - 4}{x^2 + 2x} = \dfrac{(x - 2)(x + 2)}{x(x + 2)} = \dfrac{x - 2}{x}\).`,
              exercises: [
                mcq(2, r`Rút gọn phân thức \(\dfrac{3x^2y}{6xy^2}\) được`, [r`\(\dfrac{x}{2y}\)`, r`\(\dfrac{x}{2}\)`, r`\(\dfrac{2x}{y}\)`, r`\(\dfrac{x}{2y^2}\)`], 'A', r`Chia cả tử và mẫu cho \(3xy\): \(\dfrac{3x^2y}{6xy^2} = \dfrac{x}{2y}\).`),
                sa(3, r`Rút gọn phân thức \(\dfrac{x^2 - 6x + 9}{x^2 - 9}\) rồi tính giá trị của nó tại \(x = 5\).`, ['0,25', '1/4'], r`\(\dfrac{(x - 3)^2}{(x - 3)(x + 3)} = \dfrac{x - 3}{x + 3}\). Tại \(x = 5\): \(\dfrac{2}{8} = \dfrac14\).`),
              ],
            },
          ],
        },
        {
          title: 'Quy đồng mẫu thức',
          description: 'Tìm mẫu thức chung; quy đồng; bài tập tổng hợp.',
          types: [
            {
              slug: 'quy-dong-mau-thuc',
              title: 'Quy đồng mẫu thức nhiều phân thức',
              levels: [2, 3],
              knowledge: 'Mẫu thức chung; nhân tử phụ; tính chất cơ bản của phân thức.',
              signs: 'Đề yêu cầu quy đồng mẫu thức của hai hay nhiều phân thức, hoặc tìm mẫu thức chung.',
              method: 'Phân tích các mẫu thành nhân tử, tìm mẫu thức chung, tìm nhân tử phụ của từng mẫu rồi nhân cả tử và mẫu với nhân tử phụ.',
              steps: `- **Bước 1.** Phân tích các mẫu thành nhân tử.
- **Bước 2.** Lập mẫu thức chung (BCNN hệ số, mỗi nhân tử lấy số mũ lớn nhất).
- **Bước 3.** Tìm nhân tử phụ (MTC chia cho từng mẫu), nhân vào tử và mẫu.`,
              mistakes: '- Lấy tích tất cả các mẫu làm mẫu chung khi các mẫu có nhân tử chung (mẫu chung quá phức tạp).\n- Quên nhân tử phụ với tử thức.',
              example: r`Quy đồng mẫu thức hai phân thức \(\dfrac{1}{x^2 - 4}\) và \(\dfrac{3}{x^2 + 2x}\).`,
              solution: r`\(x^2 - 4 = (x - 2)(x + 2)\); \(x^2 + 2x = x(x + 2)\). Mẫu thức chung: \(x(x - 2)(x + 2)\).
\(\dfrac{1}{x^2 - 4} = \dfrac{x}{x(x - 2)(x + 2)}\); \(\dfrac{3}{x^2 + 2x} = \dfrac{3(x - 2)}{x(x - 2)(x + 2)}\).`,
              exercises: [
                mcq(2, r`Mẫu thức chung đơn giản nhất của \(\dfrac{1}{2x}\), \(\dfrac{3}{x^2}\), \(\dfrac{5}{4x^3}\) là`, [r`\(4x^3\)`, r`\(8x^6\)`, r`\(2x^3\)`, r`\(4x^2\)`], 'A', r`BCNN của 2, 1, 4 là 4; lũy thừa lớn nhất của \(x\) là \(x^3\). Mẫu thức chung: \(4x^3\).`),
                es(3, r`Quy đồng mẫu thức hai phân thức \(\dfrac{x}{x - 1}\) và \(\dfrac{2}{1 - x^2}\).`, r`\(\dfrac{2}{1 - x^2} = \dfrac{-2}{x^2 - 1} = \dfrac{-2}{(x - 1)(x + 1)}\). Mẫu thức chung: \((x - 1)(x + 1)\).
\(\dfrac{x}{x - 1} = \dfrac{x(x + 1)}{(x - 1)(x + 1)}\); \(\dfrac{2}{1 - x^2} = \dfrac{-2}{(x - 1)(x + 1)}\).`),
              ],
            },
            {
              slug: 'rut-gon-tinh-gia-tri-phan-thuc-tong-hop',
              title: 'Rút gọn và tính giá trị phân thức, tìm giá trị nguyên',
              legacy: ['Bài tập tổng hợp'],
              levels: [3, 4],
              knowledge: 'Rút gọn phân thức; điều kiện xác định; tách phân thức thành phần nguyên và phần phân số; ước của số nguyên.',
              signs: 'Đề cho phân thức, yêu cầu rút gọn rồi tính giá trị, hoặc tìm giá trị nguyên của biến để phân thức có giá trị nguyên.',
              method: 'Rút gọn; với bài tìm giá trị nguyên, viết phân thức dạng số nguyên cộng một phân số có tử là hằng số rồi xét ước.',
              steps: r`- **Bước 1.** Tìm điều kiện xác định và rút gọn.
- **Bước 2.** Viết \(\dfrac{ax + b}{cx + d} = k + \dfrac{m}{cx + d}\) (\(k\), \(m\) là số nguyên).
- **Bước 3.** Cho mẫu là ước của \(m\), tìm \(x\) và đối chiếu điều kiện xác định.`,
              mistakes: '- Quên loại các giá trị không thỏa điều kiện xác định.\n- Chỉ xét ước dương.',
              example: r`Cho \(P = \dfrac{x^2 + 2x + 1}{x^2 - 1}\). Rút gọn \(P\) và tìm các giá trị nguyên của \(x\) để \(P\) có giá trị nguyên.`,
              solution: r`Điều kiện \(x \ne \pm1\). \(P = \dfrac{(x + 1)^2}{(x - 1)(x + 1)} = \dfrac{x + 1}{x - 1} = 1 + \dfrac{2}{x - 1}\).
\(P\) nguyên khi \(x - 1 \in \{-2; -1; 1; 2\}\), tức là \(x \in \{-1; 0; 2; 3\}\). Loại \(x = -1\). Vậy \(x \in \{0; 2; 3\}\).`,
              exercises: [
                sa(3, r`Cho \(P = \dfrac{x^2 - 4x + 4}{x^2 - 2x}\). Tính giá trị của \(P\) tại \(x = 4\).`, ['0,5', '1/2'], r`\(P = \dfrac{(x - 2)^2}{x(x - 2)} = \dfrac{x - 2}{x}\). Tại \(x = 4\): \(P = \dfrac{2}{4} = \dfrac12\).`),
                sa(4, r`Tìm các giá trị nguyên của \(x\) để \(P = \dfrac{2x + 3}{x + 1}\) có giá trị nguyên. Tính tổng các giá trị đó.`, ['-2'], r`\(P = 2 + \dfrac{1}{x + 1}\) (điều kiện \(x \ne -1\)). \(P\) nguyên khi \(x + 1 \in \{-1; 1\}\), tức là \(x \in \{-2; 0\}\). Tổng bằng \(-2\).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 23 ----------------
    {
      slug: 'bai-23-phep-cong-va-phep-tru-phan-thuc-dai-so',
      difficulty: 3,
      objectives: `- Thực hiện phép cộng, phép trừ hai phân thức (cùng mẫu, khác mẫu).
- Vận dụng tính chất giao hoán, kết hợp để cộng, trừ nhiều phân thức; giải bài toán thực tế.`,
      prerequisites: '- Rút gọn phân thức, quy đồng mẫu thức (Bài 22).',
      concepts: 'Tổng, hiệu của hai phân thức; phân thức đối.',
      formulas: r`\(\dfrac{A}{M} + \dfrac{B}{M} = \dfrac{A + B}{M}\); \(\dfrac{A}{B} - \dfrac{C}{D} = \dfrac{A}{B} + \dfrac{-C}{D}\); phân thức đối của \(\dfrac{A}{B}\) là \(\dfrac{-A}{B}\).`,
      properties: '- Phép cộng phân thức có tính chất giao hoán và kết hợp.\n- Kết quả phép tính cần được rút gọn (nếu có thể).',
      themes: [
        {
          title: 'Cộng, trừ phân thức',
          description: 'Cộng, trừ hai phân thức; cộng, trừ nhiều phân thức.',
          types: [
            {
              slug: 'cong-hai-phan-thuc',
              title: 'Cộng hai phân thức',
              levels: [1, 2],
              knowledge: 'Cộng hai phân thức cùng mẫu: cộng các tử, giữ nguyên mẫu. Khác mẫu: quy đồng rồi cộng.',
              signs: 'Tổng của hai phân thức (cùng mẫu, khác mẫu, hoặc mẫu đối nhau).',
              method: 'Nếu khác mẫu thì quy đồng (đổi dấu khi hai mẫu đối nhau), cộng các tử, rút gọn.',
              steps: `- **Bước 1.** Phân tích các mẫu, tìm mẫu thức chung (đổi dấu nếu hai mẫu đối nhau).
- **Bước 2.** Quy đồng và cộng các tử.
- **Bước 3.** Thu gọn tử, rút gọn phân thức.`,
              mistakes: r`- Cộng tử với tử, mẫu với mẫu: \(\dfrac{1}{x} + \dfrac{1}{y} = \dfrac{2}{x + y}\) là sai.
- Không rút gọn kết quả.`,
              example: r`Tính: a) \(\dfrac{x}{x - 1} + \dfrac{1}{1 - x}\); b) \(\dfrac{1}{x} + \dfrac{2}{x + 1}\).`,
              solution: r`a) \(\dfrac{x}{x - 1} + \dfrac{1}{1 - x} = \dfrac{x}{x - 1} - \dfrac{1}{x - 1} = \dfrac{x - 1}{x - 1} = 1\).
b) \(\dfrac{x + 1}{x(x + 1)} + \dfrac{2x}{x(x + 1)} = \dfrac{3x + 1}{x(x + 1)}\).`,
              exercises: [
                mcq(1, r`\(\dfrac{2x}{x + 3} + \dfrac{6}{x + 3}\) bằng`, [r`\(2\)`, r`\(\dfrac{8x}{x + 3}\)`, r`\(1\)`, r`\(x + 3\)`], 'A', r`\(\dfrac{2x + 6}{x + 3} = \dfrac{2(x + 3)}{x + 3} = 2\).`),
                sa(2, r`Cho \(\dfrac{1}{x} + \dfrac{1}{x + 2} = \dfrac{ax + b}{x(x + 2)}\). Tính \(a + b\).`, ['4'], r`\(\dfrac{(x + 2) + x}{x(x + 2)} = \dfrac{2x + 2}{x(x + 2)}\). Vậy \(a + b = 4\).`),
              ],
            },
            {
              slug: 'tru-hai-phan-thuc',
              title: 'Trừ hai phân thức',
              levels: [1, 2],
              knowledge: r`\(\dfrac{A}{B} - \dfrac{C}{D} = \dfrac{A}{B} + \dfrac{-C}{D}\).`,
              signs: 'Hiệu của hai phân thức.',
              method: 'Cộng với phân thức đối (hoặc quy đồng rồi trừ các tử), chú ý đặt tử bị trừ trong ngoặc.',
              steps: `- **Bước 1.** Quy đồng mẫu thức.
- **Bước 2.** Trừ các tử (đặt tử thứ hai trong ngoặc).
- **Bước 3.** Thu gọn, rút gọn.`,
              mistakes: r`- Quên ngoặc: \(\dfrac{x + 3}{M} - \dfrac{x + 1}{M} = \dfrac{x + 3 - x + 1}{M}\) là sai.`,
              example: r`Tính \(\dfrac{x + 3}{x^2 - 1} - \dfrac{1}{x - 1}\).`,
              solution: r`\(= \dfrac{x + 3 - (x + 1)}{(x - 1)(x + 1)} = \dfrac{2}{x^2 - 1}\).`,
              exercises: [
                mcq(1, r`\(\dfrac{5x}{x - 2} - \dfrac{10}{x - 2}\) bằng`, [r`\(5\)`, r`\(\dfrac{5x + 10}{x - 2}\)`, r`\(5x\)`, r`\(\dfrac{5}{x - 2}\)`], 'A', r`\(\dfrac{5x - 10}{x - 2} = \dfrac{5(x - 2)}{x - 2} = 5\).`),
                sa(2, r`Cho \(\dfrac{2}{x - 1} - \dfrac{2}{x + 1} = \dfrac{a}{x^2 - 1}\). Tìm \(a\).`, ['4'], r`\(\dfrac{2(x + 1) - 2(x - 1)}{(x - 1)(x + 1)} = \dfrac{4}{x^2 - 1}\). Vậy \(a = 4\).`),
              ],
            },
            {
              slug: 'cong-tru-nhieu-phan-thuc',
              title: 'Cộng, trừ nhiều phân thức',
              levels: [2, 3, 4],
              knowledge: 'Quy tắc cộng, trừ; tính chất giao hoán, kết hợp; tách phân thức: \\(\\dfrac{1}{n(n + 1)} = \\dfrac{1}{n} - \\dfrac{1}{n + 1}\\).',
              signs: 'Biểu thức gồm ba phân thức trở lên nối bởi dấu cộng, trừ; chứng minh đẳng thức phân thức.',
              method: 'Quy đồng tất cả về một mẫu chung (hoặc nhóm hợp lí, tách phân thức), cộng trừ các tử và rút gọn.',
              steps: `- **Bước 1.** Phân tích các mẫu, nhóm các phân thức thuận tiện.
- **Bước 2.** Quy đồng, cộng trừ các tử.
- **Bước 3.** Thu gọn tử, phân tích thành nhân tử để rút gọn.`,
              mistakes: '- Sai dấu khi trừ nhiều phân thức.\n- Dừng lại khi kết quả còn rút gọn được.',
              example: r`Tính \(\dfrac{1}{x - 2} + \dfrac{1}{x + 2} - \dfrac{4}{x^2 - 4}\).`,
              solution: r`\(= \dfrac{(x + 2) + (x - 2) - 4}{x^2 - 4} = \dfrac{2x - 4}{(x - 2)(x + 2)} = \dfrac{2}{x + 2}\).`,
              exercises: [
                sa(3, r`Rút gọn biểu thức \(\dfrac{x}{x - 3} - \dfrac{3}{x + 3} - \dfrac{18}{x^2 - 9}\).`, ['1'], r`\(\dfrac{x(x + 3) - 3(x - 3) - 18}{x^2 - 9} = \dfrac{x^2 - 9}{x^2 - 9} = 1\).`),
                es(4, r`Chứng minh \(\dfrac{1}{x(x + 1)} + \dfrac{1}{(x + 1)(x + 2)} + \dfrac{1}{(x + 2)(x + 3)} = \dfrac{3}{x(x + 3)}\).`, r`Dùng \(\dfrac{1}{n(n + 1)} = \dfrac{1}{n} - \dfrac{1}{n + 1}\): vế trái \(= \dfrac1x - \dfrac{1}{x + 1} + \dfrac{1}{x + 1} - \dfrac{1}{x + 2} + \dfrac{1}{x + 2} - \dfrac{1}{x + 3} = \dfrac1x - \dfrac{1}{x + 3} = \dfrac{3}{x(x + 3)}\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng phép cộng, trừ phân thức',
          description: 'Bài toán thực tế về năng suất, chuyển động.',
          types: [
            {
              slug: 'thuc-te-cong-tru-phan-thuc',
              title: 'Bài toán thực tế',
              levels: [3],
              knowledge: 'Năng suất (phần công việc làm trong một đơn vị thời gian) = 1 : thời gian hoàn thành; thời gian = quãng đường : vận tốc.',
              signs: 'Bài toán làm chung công việc, hai vòi nước, chuyển động nhiều chặng có đại lượng dạng phân thức.',
              method: 'Biểu diễn từng đại lượng bằng phân thức, lập tổng (hiệu), rút gọn rồi tính giá trị.',
              steps: `- **Bước 1.** Viết phân thức cho từng phần (năng suất, thời gian…).
- **Bước 2.** Cộng, trừ các phân thức và rút gọn.
- **Bước 3.** Thay giá trị của biến, trả lời kèm đơn vị.`,
              mistakes: '- Cộng thời gian hoàn thành thay vì cộng năng suất khi làm chung.',
              example: r`Hai vòi cùng chảy vào một bể. Vòi thứ nhất chảy riêng đầy bể trong \(x\) giờ, vòi thứ hai trong \(x + 2\) giờ. Viết phân thức biểu thị phần bể hai vòi chảy được trong 1 giờ.`,
              solution: r`Trong 1 giờ: vòi một chảy \(\dfrac1x\) bể, vòi hai chảy \(\dfrac{1}{x + 2}\) bể. Cả hai: \(\dfrac1x + \dfrac{1}{x + 2} = \dfrac{2x + 2}{x(x + 2)}\) (bể).`,
              exercises: [
                sa(3, r`Với hai vòi ở ví dụ và \(x = 4\), trong 1 giờ cả hai vòi chảy được bao nhiêu phần bể? (viết dưới dạng phân số)`, ['5/12'], r`\(\dfrac14 + \dfrac16 = \dfrac{5}{12}\) bể.`),
                sa(3, r`Một người đi xe đạp 20 km với vận tốc \(x\) km/h rồi đi bộ 4 km với vận tốc \(x - 10\) km/h. Tổng thời gian là \(\dfrac{20}{x} + \dfrac{4}{x - 10}\) giờ. Tính tổng thời gian đó (theo phút) khi \(x = 15\).`, ['128'], r`\(\dfrac{20}{15} + \dfrac{4}{5} = \dfrac43 + \dfrac45 = \dfrac{32}{15}\) giờ \(= 128\) phút.`, 'phút'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 24 ----------------
    {
      slug: 'bai-24-phep-nhan-va-phep-chia-phan-thuc-dai-so',
      difficulty: 3,
      objectives: `- Thực hiện phép nhân, phép chia hai phân thức.
- Vận dụng tính chất của phép nhân; thực hiện dãy phép tính; tìm thành phần chưa biết; giải bài toán thực tế.`,
      prerequisites: '- Rút gọn phân thức (Bài 22); cộng, trừ phân thức (Bài 23).',
      concepts: 'Tích, thương của hai phân thức; phân thức nghịch đảo.',
      formulas: r`\(\dfrac{A}{B}\cdot\dfrac{C}{D} = \dfrac{A\cdot C}{B\cdot D}\); \(\dfrac{A}{B} : \dfrac{C}{D} = \dfrac{A}{B}\cdot\dfrac{D}{C}\) (\(\dfrac{C}{D} \ne 0\)).`,
      properties: r`- Phép nhân phân thức có tính chất giao hoán, kết hợp, phân phối đối với phép cộng.
- Phân thức nghịch đảo của \(\dfrac{A}{B}\) (\(A \ne 0\)) là \(\dfrac{B}{A}\).`,
      themes: [
        {
          title: 'Nhân, chia phân thức',
          description: 'Quy tắc nhân, chia hai phân thức.',
          types: [
            {
              slug: 'nhan-phan-thuc',
              title: 'Nhân phân thức',
              levels: [1, 2],
              knowledge: 'Nhân các tử với nhau, các mẫu với nhau; rút gọn.',
              signs: 'Tích của hai hay nhiều phân thức.',
              method: 'Phân tích các tử và mẫu thành nhân tử trước khi nhân để rút gọn nhanh.',
              steps: `- **Bước 1.** Phân tích tử và mẫu của các phân thức thành nhân tử.
- **Bước 2.** Viết tích các tử trên tích các mẫu.
- **Bước 3.** Rút gọn các nhân tử chung.`,
              mistakes: '- Nhân ra hết rồi mới rút gọn, rất dài và dễ sai.\n- Rút gọn một hạng tử của tổng thay vì một nhân tử.',
              example: r`Tính \(\dfrac{x^2 - 4}{3x}\cdot\dfrac{6x^2}{x + 2}\).`,
              solution: r`\(= \dfrac{(x - 2)(x + 2)\cdot6x^2}{3x(x + 2)} = 2x(x - 2)\).`,
              exercises: [
                mcq(1, r`\(\dfrac{2x}{y}\cdot\dfrac{y^2}{4x^2}\) bằng`, [r`\(\dfrac{y}{2x}\)`, r`\(\dfrac{2y}{x}\)`, r`\(\dfrac{x}{2y}\)`, r`\(\dfrac{y^2}{2x}\)`], 'A', r`\(\dfrac{2x\cdot y^2}{y\cdot4x^2} = \dfrac{y}{2x}\).`),
                sa(2, r`Rút gọn tích \(\dfrac{x - 1}{x + 2}\cdot\dfrac{x^2 - 4}{x^2 - 1}\) được \(\dfrac{x + a}{x + 1}\). Tìm \(a\).`, ['-2'], r`\(\dfrac{(x - 1)(x - 2)(x + 2)}{(x + 2)(x - 1)(x + 1)} = \dfrac{x - 2}{x + 1}\). Vậy \(a = -2\).`),
              ],
            },
            {
              slug: 'chia-phan-thuc',
              title: 'Chia phân thức',
              levels: [1, 2],
              knowledge: r`\(\dfrac{A}{B} : \dfrac{C}{D} = \dfrac{A}{B}\cdot\dfrac{D}{C}\); phân thức nghịch đảo.`,
              signs: 'Thương của hai phân thức; tìm phân thức nghịch đảo.',
              method: 'Nhân phân thức bị chia với phân thức nghịch đảo của phân thức chia, rồi rút gọn.',
              steps: `- **Bước 1.** Viết phân thức nghịch đảo của số chia.
- **Bước 2.** Chuyển phép chia thành phép nhân.
- **Bước 3.** Phân tích thành nhân tử và rút gọn.`,
              mistakes: '- Nghịch đảo nhầm phân thức bị chia.\n- Quên điều kiện phân thức chia khác 0.',
              example: r`Tính \(\dfrac{4x^2}{x - 1} : \dfrac{2x}{x^2 - 1}\).`,
              solution: r`\(= \dfrac{4x^2}{x - 1}\cdot\dfrac{(x - 1)(x + 1)}{2x} = 2x(x + 1)\).`,
              exercises: [
                mcq(1, r`Phân thức nghịch đảo của \(\dfrac{x - 3}{x + 1}\) là`, [r`\(\dfrac{x + 1}{x - 3}\)`, r`\(\dfrac{3 - x}{x + 1}\)`, r`\(\dfrac{x + 3}{x - 1}\)`, r`\(\dfrac{1}{x - 3}\)`], 'A', r`Phân thức nghịch đảo của \(\dfrac{A}{B}\) là \(\dfrac{B}{A}\).`),
                sa(2, r`Cho \(\dfrac{x^2 - 9}{x} : \dfrac{x + 3}{2x} = ax + b\). Tính \(a + b\).`, ['-4'], r`\(\dfrac{(x - 3)(x + 3)}{x}\cdot\dfrac{2x}{x + 3} = 2(x - 3) = 2x - 6\). Vậy \(a + b = -4\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng các phép tính với phân thức',
          description: 'Tìm thành phần chưa biết, dãy phép tính, bài toán thực tế.',
          types: [
            {
              slug: 'tim-thanh-phan-chua-biet-phan-thuc',
              title: 'Tìm thành phần chưa biết',
              levels: [2, 3],
              knowledge: 'Quan hệ giữa các thành phần của phép cộng, trừ, nhân, chia.',
              signs: 'Đẳng thức có một phân thức chưa biết trong phép cộng, trừ, nhân hoặc chia.',
              method: 'Biểu diễn phân thức chưa biết qua các phân thức đã biết (như với số), rồi thực hiện phép tính và rút gọn.',
              steps: `- **Bước 1.** Xác định vai trò của phân thức chưa biết (thừa số, số bị chia, số hạng…).
- **Bước 2.** Viết phân thức chưa biết bằng phép tính ngược.
- **Bước 3.** Tính và rút gọn.`,
              mistakes: '- Dùng sai phép tính ngược (biết tích mà lại nhân).',
              example: r`Tìm phân thức \(P\) biết \(P\cdot\dfrac{x + 1}{x} = \dfrac{x^2 - 1}{x^2}\).`,
              solution: r`\(P = \dfrac{x^2 - 1}{x^2} : \dfrac{x + 1}{x} = \dfrac{(x - 1)(x + 1)}{x^2}\cdot\dfrac{x}{x + 1} = \dfrac{x - 1}{x}\).`,
              exercises: [
                sa(2, r`Tìm \(Q\) biết \(Q : \dfrac{2}{x} = \dfrac{x}{4}\) (\(x \ne 0\)).`, ['0,5', '1/2'], r`\(Q = \dfrac{x}{4}\cdot\dfrac{2}{x} = \dfrac12\).`),
                sa(3, r`Tìm phân thức \(A\) biết \(\dfrac{x}{x - 1} - A = \dfrac{1}{x - 1}\) (\(x \ne 1\)).`, ['1'], r`\(A = \dfrac{x}{x - 1} - \dfrac{1}{x - 1} = \dfrac{x - 1}{x - 1} = 1\).`),
              ],
            },
            {
              slug: 'tong-hop-cac-phep-tinh-phan-thuc',
              title: 'Bài tập tổng hợp các phép tính',
              levels: [3, 4],
              knowledge: 'Thứ tự thực hiện phép tính; cộng, trừ, nhân, chia phân thức; rút gọn.',
              signs: 'Biểu thức có ngoặc và nhiều phép tính khác nhau với phân thức; rút gọn hoặc chứng minh không phụ thuộc biến.',
              method: 'Thực hiện trong ngoặc trước, rồi nhân chia, cộng trừ; rút gọn sau mỗi bước.',
              steps: `- **Bước 1.** Tìm điều kiện xác định của biểu thức.
- **Bước 2.** Tính trong ngoặc (quy đồng, rút gọn).
- **Bước 3.** Thực hiện phép nhân, chia còn lại và rút gọn.`,
              mistakes: '- Bỏ qua điều kiện xác định.\n- Thực hiện sai thứ tự phép tính.',
              example: r`Rút gọn \(P = \left(\dfrac{1}{x - 1} - \dfrac{1}{x + 1}\right) : \dfrac{2}{x^2 - 1}\) (\(x \ne \pm1\)).`,
              solution: r`\(\dfrac{1}{x - 1} - \dfrac{1}{x + 1} = \dfrac{2}{x^2 - 1}\). Do đó \(P = \dfrac{2}{x^2 - 1}\cdot\dfrac{x^2 - 1}{2} = 1\).`,
              exercises: [
                sa(3, r`Rút gọn biểu thức \(\left(\dfrac{x}{x - 2} - \dfrac{2}{x + 2}\right)\cdot\dfrac{x^2 - 4}{x^2 + 4}\) (\(x \ne \pm2\)).`, ['1'], r`\(\dfrac{x(x + 2) - 2(x - 2)}{x^2 - 4} = \dfrac{x^2 + 4}{x^2 - 4}\). Nhân với \(\dfrac{x^2 - 4}{x^2 + 4}\) được 1.`),
                es(4, r`Chứng minh giá trị của biểu thức \(\left(\dfrac{x + 1}{x - 1} - \dfrac{x - 1}{x + 1}\right) : \dfrac{4x}{x^2 - 1}\) không phụ thuộc vào \(x\) (\(x \ne 0\), \(x \ne \pm1\)).`, r`\(\dfrac{x + 1}{x - 1} - \dfrac{x - 1}{x + 1} = \dfrac{(x + 1)^2 - (x - 1)^2}{x^2 - 1} = \dfrac{4x}{x^2 - 1}\).
Do đó biểu thức bằng \(\dfrac{4x}{x^2 - 1}\cdot\dfrac{x^2 - 1}{4x} = 1\), không phụ thuộc vào \(x\).`),
              ],
            },
            {
              slug: 'thuc-te-nhan-chia-phan-thuc',
              title: 'Bài toán thực tế',
              levels: [3],
              knowledge: 'Diện tích, năng suất, số chuyến… biểu diễn bằng phân thức; nhân, chia, trừ phân thức.',
              signs: 'Tình huống thực tế mà đại lượng cần tìm là tích, thương hoặc hiệu của các phân thức.',
              method: 'Lập biểu thức phân thức theo công thức thực tế, rút gọn rồi thay số.',
              steps: `- **Bước 1.** Viết công thức liên hệ giữa các đại lượng.
- **Bước 2.** Lập và rút gọn phân thức.
- **Bước 3.** Tính giá trị, trả lời kèm đơn vị.`,
              mistakes: '- Lập ngược phép chia.\n- Quên rút gọn trước khi thay số.',
              example: r`Một hình chữ nhật có diện tích \(\dfrac{x^2 - 1}{x}\) (m²) và chiều dài \(\dfrac{x + 1}{x}\) (m). Tính chiều rộng.`,
              solution: r`Chiều rộng \(= \dfrac{x^2 - 1}{x} : \dfrac{x + 1}{x} = \dfrac{(x - 1)(x + 1)}{x}\cdot\dfrac{x}{x + 1} = x - 1\) (m).`,
              exercises: [
                sa(3, 'Với hình chữ nhật ở ví dụ, khi x = 5 thì chiều rộng bằng bao nhiêu mét?', ['4'], r`Chiều rộng \(x - 1 = 4\) m.`, 'm'),
                sa(3, r`Cần chuyển 120 tấn hàng, mỗi xe chở \(x\) tấn nên số chuyến là \(\dfrac{120}{x}\). Nếu mỗi xe chở thêm 2 tấn thì số chuyến giảm bao nhiêu khi \(x = 10\)?`, ['2'], r`Số chuyến giảm: \(\dfrac{120}{x} - \dfrac{120}{x + 2} = \dfrac{240}{x(x + 2)}\). Với \(x = 10\): \(\dfrac{240}{120} = 2\) chuyến.`, 'chuyến'),
              ],
            },
          ],
        },
      ],
    },
  ],
};
