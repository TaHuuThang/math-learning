import { es, mcq, r, sa, tf, type MapChapter } from './types';

/** Chương VII. Phương trình bậc nhất và hàm số bậc nhất – Bài 25 đến Bài 29. */
export const CHUONG_7: MapChapter = {
  code: 'VII',
  objectives: `- Nhận biết phương trình bậc nhất một ẩn; giải phương trình bậc nhất và phương trình đưa được về dạng ax + b = 0.
- Giải quyết bài toán thực tiễn bằng cách lập phương trình bậc nhất một ẩn.
- Nhận biết khái niệm hàm số, đồ thị của hàm số, mặt phẳng tọa độ, tọa độ của một điểm.
- Thiết lập bảng giá trị và vẽ đồ thị hàm số bậc nhất; nhận biết hệ số góc, hai đường thẳng song song, cắt nhau; vận dụng vào thực tiễn.`,
  keyPoints: r`- Phương trình \(ax + b = 0\) (\(a \ne 0\)) có nghiệm duy nhất \(x = -\dfrac{b}{a}\); quy tắc chuyển vế, quy tắc nhân với một số khác 0.
- Ba bước giải bài toán bằng cách lập phương trình: lập phương trình – giải phương trình – trả lời.
- Hàm số \(y = f(x)\); đồ thị của hàm số là tập hợp các điểm \((x; f(x))\) trên mặt phẳng tọa độ.
- Đồ thị hàm số \(y = ax + b\) (\(a \ne 0\)) là một đường thẳng cắt trục tung tại điểm có tung độ \(b\).
- \(a\) là hệ số góc; hai đường thẳng song song, trùng nhau, cắt nhau được nhận biết qua hệ số góc và hệ số \(b\).`,
  formulas: r`\[ax + b = 0\ (a \ne 0) \Leftrightarrow x = -\dfrac{b}{a}\]
\[y = ax + b\ (a \ne 0):\quad \text{giao với } Oy:\ (0; b);\quad \text{giao với } Ox:\ \left(-\dfrac{b}{a}; 0\right)\]
\[d: y = ax + b,\ d': y = a'x + b':\quad d \parallel d' \Leftrightarrow a = a',\ b \ne b';\qquad d \text{ cắt } d' \Leftrightarrow a \ne a'\]`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 2 (VietJack) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-7a', objectives: 'Củng cố phương trình bậc nhất một ẩn, phương trình đưa được về dạng ax + b = 0 và giải bài toán bằng cách lập phương trình.' },
    { slug: 'luyen-tap-chung-7b', objectives: 'Củng cố hàm số, mặt phẳng tọa độ, đồ thị hàm số bậc nhất và hệ số góc của đường thẳng.' },
    { slug: 'bai-tap-cuoi-chuong-7', objectives: 'Ôn tập toàn Chương VII: phương trình bậc nhất, giải toán bằng cách lập phương trình, hàm số bậc nhất và đồ thị; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 25 ----------------
    {
      slug: 'bai-25-phuong-trinh-bac-nhat-mot-an',
      difficulty: 2,
      objectives: `- Nhận biết phương trình một ẩn và nghiệm của phương trình.
- Nhận biết phương trình bậc nhất một ẩn; giải phương trình bậc nhất một ẩn.
- Giải phương trình đưa được về dạng ax + b = 0; vận dụng vào bài toán thực tế đơn giản.`,
      prerequisites: '- Quy tắc chuyển vế, tìm số chưa biết (Toán 6, Toán 7).\n- Thu gọn đa thức, hằng đẳng thức đáng nhớ (Chương I, II).',
      concepts: r`Phương trình một ẩn \(A(x) = B(x)\); vế trái, vế phải; nghiệm của phương trình; giải phương trình; phương trình bậc nhất một ẩn \(ax + b = 0\) (\(a \ne 0\)).`,
      formulas: r`\(ax + b = 0\) (\(a \ne 0\)) \(\Leftrightarrow ax = -b \Leftrightarrow x = -\dfrac{b}{a}\).`,
      properties: `- Quy tắc chuyển vế: chuyển một hạng tử từ vế này sang vế kia của phương trình và đổi dấu hạng tử đó.
- Quy tắc nhân (chia) với một số: nhân (hoặc chia) cả hai vế của phương trình với cùng một số khác 0.
- Phương trình bậc nhất một ẩn luôn có nghiệm duy nhất.`,
      themes: [
        {
          title: 'Phương trình một ẩn và nghiệm',
          description: 'Kiểm tra nghiệm; nhận dạng phương trình bậc nhất một ẩn.',
          types: [
            {
              slug: 'kiem-tra-nghiem',
              title: 'Kiểm tra một số có là nghiệm của phương trình',
              levels: [1, 2],
              knowledge: r`Số \(x_0\) là nghiệm của phương trình \(A(x) = B(x)\) nếu giá trị của hai vế tại \(x = x_0\) bằng nhau.`,
              signs: 'Đề cho phương trình và một hay nhiều số, hỏi số nào là nghiệm; hoặc tìm tham số m biết phương trình nhận một số cho trước làm nghiệm.',
              method: 'Thay giá trị của ẩn vào từng vế, tính rồi so sánh hai kết quả.',
              steps: r`- **Bước 1.** Tính giá trị vế trái tại \(x = x_0\).
- **Bước 2.** Tính giá trị vế phải tại \(x = x_0\).
- **Bước 3.** So sánh: bằng nhau thì \(x_0\) là nghiệm. Nếu tìm tham số \(m\): cho hai vế bằng nhau rồi giải tìm \(m\).`,
              mistakes: r`- Chỉ tính một vế rồi kết luận.
- Thay số âm không đặt trong ngoặc: \((-2)^2 = 4\) nhưng \(-2^2 = -4\).`,
              example: r`Trong các số \(-1\); \(2\); \(3\), số nào là nghiệm của phương trình \(3x - 1 = x + 5\)?`,
              solution: r`- \(x = -1\): vế trái \(= -4\), vế phải \(= 4\), không bằng nhau.
- \(x = 2\): vế trái \(= 5\), vế phải \(= 7\), không bằng nhau.
- \(x = 3\): vế trái \(= 8\), vế phải \(= 8\). Vậy \(x = 3\) là nghiệm của phương trình.`,
              exercises: [
                mcq(1, r`Số nào sau đây là nghiệm của phương trình \(2x + 3 = 7\)?`, [r`\(x = 2\)`, r`\(x = 5\)`, r`\(x = -2\)`, r`\(x = 3\)`], 'A', r`\(2\cdot2 + 3 = 7\) nên \(x = 2\) là nghiệm.`),
                tf(2, r`Cho phương trình \(x^2 - 1 = 3(x - 1)\). Mỗi khẳng định sau đúng hay sai?`, [
                  [r`\(x = 1\) là nghiệm của phương trình.`, true],
                  [r`\(x = 2\) là nghiệm của phương trình.`, true],
                  [r`\(x = -1\) là nghiệm của phương trình.`, false],
                  [r`\(x = 0\) là nghiệm của phương trình.`, false],
                ], r`a) \(0 = 0\), đúng. b) \(3 = 3\), đúng. c) Vế trái \(0\), vế phải \(-6\), sai. d) Vế trái \(-1\), vế phải \(-3\), sai.`),
                sa(2, r`Tìm \(m\) để phương trình \(2x + m = 3x - 1\) nhận \(x = 4\) làm nghiệm.`, ['3'], r`Thay \(x = 4\): \(8 + m = 12 - 1 = 11\), suy ra \(m = 3\).`),
              ],
            },
            {
              slug: 'nhan-dang-phuong-trinh-bac-nhat',
              title: 'Nhận dạng phương trình bậc nhất một ẩn',
              levels: [1],
              knowledge: r`Phương trình dạng \(ax + b = 0\), với \(a\), \(b\) là hai số đã cho và \(a \ne 0\), gọi là phương trình bậc nhất một ẩn.`,
              signs: 'Đề yêu cầu chỉ ra phương trình bậc nhất một ẩn trong các phương trình cho trước, hoặc xác định các hệ số a, b.',
              method: r`Kiểm tra phương trình có một ẩn, ẩn chỉ có bậc 1 và hệ số của ẩn khác 0; viết về dạng \(ax + b = 0\) để đọc \(a\), \(b\).`,
              steps: `- **Bước 1.** Kiểm tra phương trình chỉ có một ẩn.
- **Bước 2.** Kiểm tra ẩn chỉ có bậc 1 (không có bình phương, không có ẩn ở mẫu).
- **Bước 3.** Viết về dạng ax + b = 0, đọc a, b và kiểm tra a ≠ 0.`,
              mistakes: r`- Coi \(0x + 3 = 0\) là phương trình bậc nhất một ẩn.
- Lấy sai dấu của \(b\): phương trình \(2x - 5 = 0\) có \(b = -5\).`,
              example: r`Trong các phương trình sau, phương trình nào là phương trình bậc nhất một ẩn? Chỉ ra hệ số \(a\), \(b\).
a) \(2x - 5 = 0\); b) \(x^2 + 1 = 0\); c) \(0x + 3 = 0\); d) \(\dfrac12 - 3y = 0\).`,
              solution: r`a) Là phương trình bậc nhất ẩn \(x\): \(a = 2\), \(b = -5\).
b) Không phải (ẩn có bậc 2).
c) Không phải (hệ số của ẩn bằng 0).
d) Là phương trình bậc nhất ẩn \(y\): \(-3y + \dfrac12 = 0\), \(a = -3\), \(b = \dfrac12\).`,
              exercises: [
                mcq(1, 'Phương trình nào sau đây là phương trình bậc nhất một ẩn?', [r`\(3x - 7 = 0\)`, r`\(x^2 - 4 = 0\)`, r`\(0x + 5 = 0\)`, r`\(\dfrac{1}{x} + 2 = 0\)`], 'A', r`\(3x - 7 = 0\) có dạng \(ax + b = 0\) với \(a = 3 \ne 0\).`),
                tf(1, r`Cho phương trình \(5 - 2x = 0\). Mỗi khẳng định sau đúng hay sai?`, [
                  ['Đây là phương trình bậc nhất một ẩn.', true],
                  [r`Hệ số \(a = 2\).`, false],
                  [r`Hệ số \(b = 5\).`, true],
                  ['Phương trình không có nghiệm.', false],
                ], r`Viết lại: \(-2x + 5 = 0\), nên \(a = -2\), \(b = 5\). Phương trình bậc nhất một ẩn luôn có nghiệm duy nhất, ở đây \(x = 2{,}5\).`),
              ],
            },
          ],
        },
        {
          title: 'Giải phương trình bậc nhất một ẩn',
          description: 'Giải phương trình ax + b = 0 và phương trình đưa được về dạng đó.',
          types: [
            {
              slug: 'giai-phuong-trinh-bac-nhat',
              title: 'Giải phương trình bậc nhất một ẩn',
              levels: [1, 2],
              knowledge: r`\(ax + b = 0\) (\(a \ne 0\)) \(\Leftrightarrow x = -\dfrac{b}{a}\); quy tắc chuyển vế, quy tắc nhân.`,
              signs: r`Phương trình có dạng \(ax + b = 0\) hoặc \(ax + b = c\), ẩn chỉ xuất hiện ở một vế.`,
              method: 'Chuyển hạng tử tự do sang vế phải (đổi dấu), rồi chia hai vế cho hệ số của ẩn.',
              steps: r`- **Bước 1.** Chuyển vế: \(ax = -b\).
- **Bước 2.** Chia hai vế cho \(a\): \(x = -\dfrac{b}{a}\).
- **Bước 3.** Kết luận nghiệm của phương trình.`,
              mistakes: r`- Chuyển vế mà không đổi dấu.
- Chia sai: \(2x = 6 \Rightarrow x = 6 - 2\) là sai; \(-x = 4 \Rightarrow x = 4\) là sai (phải là \(x = -4\)).`,
              example: r`Giải các phương trình: a) \(4x - 12 = 0\); b) \(7 - 3x = 0\).`,
              solution: r`a) \(4x = 12\), suy ra \(x = 3\).
b) \(-3x = -7\), suy ra \(x = \dfrac{7}{3}\).`,
              exercises: [
                mcq(1, r`Nghiệm của phương trình \(5x + 10 = 0\) là`, [r`\(x = -2\)`, r`\(x = 2\)`, r`\(x = -5\)`, r`\(x = 5\)`], 'A', r`\(5x = -10\), suy ra \(x = -2\).`),
                sa(1, r`Giải phương trình \(3x - 2 = 0\) (viết nghiệm dưới dạng phân số).`, ['2/3'], r`\(3x = 2\), suy ra \(x = \dfrac23\).`),
                sa(2, r`Giải phương trình \(\dfrac{2}{3}x - 4 = 0\).`, ['6'], r`\(\dfrac23x = 4\), suy ra \(x = 4 : \dfrac23 = 6\).`),
              ],
            },
            {
              slug: 'phuong-trinh-dua-ve-ax-b',
              title: 'Giải phương trình đưa được về dạng ax + b = 0',
              levels: [2, 3, 4],
              knowledge: 'Quy tắc bỏ dấu ngoặc, quy đồng mẫu số rồi khử mẫu; quy tắc chuyển vế; hằng đẳng thức để thu gọn.',
              signs: 'Phương trình có dấu ngoặc, có mẫu là các số, hoặc ẩn ở cả hai vế; sau khi thu gọn, các hạng tử bậc hai (nếu có) triệt tiêu.',
              method: 'Bỏ ngoặc (hoặc quy đồng rồi khử mẫu), chuyển hạng tử chứa ẩn sang một vế, hằng số sang vế kia, thu gọn về dạng ax = c.',
              steps: r`- **Bước 1.** Bỏ dấu ngoặc; nếu có mẫu thì quy đồng mẫu hai vế rồi khử mẫu.
- **Bước 2.** Chuyển các hạng tử chứa ẩn sang một vế, các hằng số sang vế kia.
- **Bước 3.** Thu gọn được \(ax = c\); nếu \(a \ne 0\) thì \(x = \dfrac{c}{a}\). (Nếu thu gọn được \(0x = c\) thì phương trình vô nghiệm khi \(c \ne 0\), nghiệm đúng với mọi \(x\) khi \(c = 0\).)`,
              mistakes: r`- Khi khử mẫu, quên nhân hạng tử không có mẫu với mẫu chung.
- Dấu trừ trước phân số: \(-\dfrac{x - 1}{3}\) khử mẫu thành \(-(x - 1) = -x + 1\), không phải \(-x - 1\).
- Bỏ ngoặc có dấu trừ phía trước mà không đổi dấu các hạng tử trong ngoặc.`,
              example: r`Giải các phương trình: a) \(2(x - 3) + 5 = 3x - 6\); b) \(\dfrac{x - 1}{2} + \dfrac{x + 2}{3} = \dfrac{x + 13}{6}\).`,
              solution: r`a) \(2x - 6 + 5 = 3x - 6 \Leftrightarrow 2x - 1 = 3x - 6 \Leftrightarrow -x = -5 \Leftrightarrow x = 5\).
b) Nhân hai vế với 6: \(3(x - 1) + 2(x + 2) = x + 13 \Leftrightarrow 5x + 1 = x + 13 \Leftrightarrow 4x = 12 \Leftrightarrow x = 3\).`,
              exercises: [
                sa(2, r`Giải phương trình \(3(x - 2) = x + 4\).`, ['5'], r`\(3x - 6 = x + 4 \Leftrightarrow 2x = 10 \Leftrightarrow x = 5\).`),
                sa(3, r`Giải phương trình \(\dfrac{2x + 1}{3} - \dfrac{x - 1}{2} = 1\).`, ['1'], r`Nhân hai vế với 6: \(2(2x + 1) - 3(x - 1) = 6 \Leftrightarrow 4x + 2 - 3x + 3 = 6 \Leftrightarrow x = 1\).`),
                mcq(3, r`Phương trình \(2(x + 1) = 2x + 3\)`, ['vô nghiệm', r`có nghiệm \(x = 1\)`, r`có nghiệm \(x = \dfrac12\)`, r`nghiệm đúng với mọi \(x\)`], 'A', r`\(2x + 2 = 2x + 3 \Leftrightarrow 0x = 1\): không có giá trị nào của \(x\) thỏa mãn, phương trình vô nghiệm.`),
                sa(4, r`Giải phương trình \((x + 2)^2 - x(x - 1) = 10\).`, ['1,2', '6/5'], r`\(x^2 + 4x + 4 - x^2 + x = 10 \Leftrightarrow 5x + 4 = 10 \Leftrightarrow x = \dfrac65 = 1{,}2\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng phương trình bậc nhất',
          description: 'Tìm giá trị của ẩn thỏa mãn điều kiện; bài toán thực tế đơn giản.',
          types: [
            {
              slug: 'tim-x-de-bieu-thuc-nhan-gia-tri',
              title: 'Tìm giá trị của ẩn để biểu thức nhận giá trị cho trước',
              levels: [2, 3],
              knowledge: 'Lập phương trình từ điều kiện "biểu thức A có giá trị bằng k" hoặc "hai biểu thức có giá trị bằng nhau, hơn kém nhau".',
              signs: 'Đề hỏi "tìm x để giá trị của biểu thức … bằng …", "để hai biểu thức có giá trị bằng nhau", "biểu thức này lớn hơn biểu thức kia … đơn vị".',
              method: 'Viết phương trình biểu thị điều kiện của đề rồi giải phương trình đó.',
              steps: `- **Bước 1.** Viết phương trình theo yêu cầu (A = k, A = B hoặc A − B = k).
- **Bước 2.** Giải phương trình.
- **Bước 3.** Trả lời.`,
              mistakes: '- "A lớn hơn B là 4 đơn vị" nhưng lại viết B − A = 4.',
              example: r`Tìm \(x\) để giá trị của biểu thức \(A = 3x - 5\) lớn hơn giá trị của biểu thức \(B = x + 1\) là 4 đơn vị.`,
              solution: r`\(A - B = 4 \Leftrightarrow (3x - 5) - (x + 1) = 4 \Leftrightarrow 2x - 6 = 4 \Leftrightarrow x = 5\). (Khi đó \(A = 10\), \(B = 6\).)`,
              exercises: [
                sa(2, r`Tìm \(x\) để biểu thức \(A = 4x - 3\) có giá trị bằng 9.`, ['3'], r`\(4x - 3 = 9 \Leftrightarrow 4x = 12 \Leftrightarrow x = 3\).`),
                sa(3, r`Tìm \(x\) để hai biểu thức \(\dfrac{x + 3}{2}\) và \(\dfrac{2x - 1}{3}\) có giá trị bằng nhau.`, ['11'], r`\(3(x + 3) = 2(2x - 1) \Leftrightarrow 3x + 9 = 4x - 2 \Leftrightarrow x = 11\). Khi đó hai biểu thức cùng bằng 7.`),
              ],
            },
            {
              slug: 'thuc-te-dan-toi-phuong-trinh',
              title: 'Bài toán thực tế dẫn tới phương trình',
              levels: [3],
              knowledge: 'Biểu diễn đại lượng chưa biết bằng ẩn; lập phương trình bậc nhất từ quan hệ trong đề (giá tiền, công thức vật lí…).',
              signs: 'Tình huống thực tế ngắn mà đại lượng cần tìm thỏa mãn một đẳng thức có sẵn hoặc dễ lập (tổng tiền, công thức đổi đơn vị…).',
              method: 'Viết biểu thức của các đại lượng theo ẩn, lập phương trình theo mối liên hệ, giải và đối chiếu thực tế.',
              steps: `- **Bước 1.** Gọi ẩn, đặt điều kiện cho ẩn.
- **Bước 2.** Lập phương trình.
- **Bước 3.** Giải phương trình, đối chiếu điều kiện và trả lời kèm đơn vị.`,
              mistakes: '- Quên đơn vị.\n- Không đối chiếu điều kiện thực tế (số người, số sản phẩm phải là số tự nhiên…).',
              example: 'Giá vé vào cổng một khu vui chơi là 50 nghìn đồng/người, mỗi lượt chơi trò chơi giá x nghìn đồng. Bạn An vào cổng và chơi 4 lượt, hết tất cả 130 nghìn đồng. Tìm x.',
              solution: r`Ta có phương trình \(50 + 4x = 130 \Leftrightarrow 4x = 80 \Leftrightarrow x = 20\). Mỗi lượt chơi giá 20 nghìn đồng.`,
              exercises: [
                sa(3, 'Một hãng taxi tính 15 nghìn đồng cho km đầu tiên và 12 nghìn đồng cho mỗi km tiếp theo. Một hành khách trả 111 nghìn đồng. Hỏi hành khách đã đi bao nhiêu km?', ['9'], r`Gọi quãng đường là \(x\) km (\(x > 1\)). \(15 + 12(x - 1) = 111 \Leftrightarrow 12(x - 1) = 96 \Leftrightarrow x = 9\).`, 'km'),
                sa(3, r`Nhiệt độ \(F\) (độ F) và nhiệt độ \(C\) (độ C) liên hệ theo công thức \(F = 1{,}8C + 32\). Ở bao nhiêu độ C thì nhiệt độ tính theo độ F bằng 77?`, ['25'], r`\(1{,}8C + 32 = 77 \Leftrightarrow 1{,}8C = 45 \Leftrightarrow C = 25\).`, '°C'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 26 ----------------
    {
      slug: 'bai-26-giai-bai-toan-bang-cach-lap-phuong-trinh',
      difficulty: 3,
      objectives: `- Nắm vững các bước giải bài toán bằng cách lập phương trình.
- Giải các bài toán thực tiễn về chuyển động, năng suất, tỉ số phần trăm, hình học, quan hệ giữa các số bằng phương trình bậc nhất một ẩn.`,
      prerequisites: '- Giải phương trình bậc nhất một ẩn (Bài 25).\n- Công thức quãng đường, chu vi, diện tích; tỉ số phần trăm (Toán 6, Toán 7).',
      concepts: 'Chọn ẩn và điều kiện của ẩn; biểu diễn đại lượng chưa biết theo ẩn; lập phương trình; đối chiếu nghiệm với điều kiện.',
      formulas: r`\(s = v\cdot t\); khối lượng công việc \(=\) năng suất \(\times\) thời gian; \(a\%\) của \(A\) là \(\dfrac{A\cdot a}{100}\); hình chữ nhật: \(P = 2(a + b)\), \(S = a\cdot b\).`,
      properties: `- **Bước 1. Lập phương trình:** chọn ẩn và đặt điều kiện thích hợp cho ẩn; biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết; lập phương trình biểu thị mối quan hệ giữa các đại lượng.
- **Bước 2.** Giải phương trình.
- **Bước 3. Trả lời:** kiểm tra nghiệm tìm được có thỏa mãn điều kiện của ẩn không rồi kết luận.`,
      themes: [
        {
          title: 'Bài toán chuyển động',
          description: 'Quãng đường, vận tốc, thời gian; chuyển động trên dòng nước.',
          types: [
            {
              slug: 'bai-toan-chuyen-dong',
              title: 'Bài toán chuyển động',
              levels: [2, 3, 4],
              knowledge: r`\(s = v\cdot t\); vận tốc xuôi dòng \(=\) vận tốc riêng \(+\) vận tốc dòng nước; vận tốc ngược dòng \(=\) vận tốc riêng \(-\) vận tốc dòng nước.`,
              signs: 'Đề có quãng đường, vận tốc, thời gian của một hay hai vật chuyển động (đi – về, đuổi kịp, gặp nhau, xuôi – ngược dòng).',
              method: 'Lập bảng vận tốc – thời gian – quãng đường cho từng chuyển động; chọn một đại lượng làm ẩn, biểu diễn các đại lượng còn lại, lập phương trình từ quan hệ chưa dùng.',
              steps: `- **Bước 1.** Chọn ẩn (thường là quãng đường, vận tốc hoặc thời gian), đặt điều kiện; đổi đơn vị thống nhất (phút → giờ).
- **Bước 2.** Lập bảng v – t – s, lập phương trình.
- **Bước 3.** Giải, đối chiếu điều kiện, trả lời.`,
              mistakes: '- Không đổi phút ra giờ.\n- Nhầm vận tốc xuôi dòng và ngược dòng.\n- Quên điều kiện vận tốc ngược dòng phải dương.',
              example: 'Một ô tô đi từ A đến B với vận tốc 50 km/h, lúc về ô tô đi với vận tốc 40 km/h nên thời gian về nhiều hơn thời gian đi 30 phút. Tính quãng đường AB.',
              solution: r`Gọi quãng đường AB là \(x\) (km), \(x > 0\). Thời gian đi \(\dfrac{x}{50}\) giờ, thời gian về \(\dfrac{x}{40}\) giờ; 30 phút \(= \dfrac12\) giờ.
Ta có \(\dfrac{x}{40} - \dfrac{x}{50} = \dfrac12 \Leftrightarrow 5x - 4x = 100 \Leftrightarrow x = 100\) (thỏa mãn). Quãng đường AB dài 100 km.`,
              exercises: [
                mcq(2, r`Một người đi xe đạp với vận tốc \(x\) (km/h) trong 2 giờ 30 phút. Quãng đường người đó đi được (km) là`, [r`\(2{,}5x\)`, r`\(2{,}3x\)`, r`\(\dfrac{x}{2{,}5}\)`, r`\(230x\)`], 'A', r`2 giờ 30 phút \(= 2{,}5\) giờ nên quãng đường là \(2{,}5x\) km.`),
                sa(3, 'Lúc 7 giờ, một xe máy đi từ A đến B với vận tốc 40 km/h. Lúc 8 giờ, một ô tô cũng đi từ A đến B với vận tốc 60 km/h. Hỏi ô tô đuổi kịp xe máy lúc mấy giờ?', ['10'], r`Gọi thời gian ô tô đi đến lúc đuổi kịp là \(t\) giờ (\(t > 0\)). Khi đó xe máy đã đi \(t + 1\) giờ. \(60t = 40(t + 1) \Leftrightarrow 20t = 40 \Leftrightarrow t = 2\). Ô tô đuổi kịp xe máy lúc \(8 + 2 = 10\) giờ.`, 'giờ'),
                sa(3, 'Một ca nô xuôi dòng từ A đến B hết 4 giờ và ngược dòng từ B về A hết 5 giờ. Vận tốc dòng nước là 2 km/h. Tính quãng đường AB.', ['80'], r`Gọi vận tốc riêng của ca nô là \(x\) (km/h), \(x > 2\). \(4(x + 2) = 5(x - 2) \Leftrightarrow x = 18\). Quãng đường AB: \(4\cdot(18 + 2) = 80\) km.`, 'km'),
                es(4, 'Một người dự định đi xe máy từ A đến B với vận tốc 36 km/h. Sau khi đi được 1 giờ, người đó dừng lại nghỉ 15 phút, sau đó tăng vận tốc thêm 9 km/h nên đến B đúng thời gian dự định. Tính quãng đường AB.', r`Gọi quãng đường AB là \(x\) (km), \(x > 36\). Thời gian dự định: \(\dfrac{x}{36}\) giờ.
Thực tế: đi 1 giờ được 36 km, nghỉ \(\dfrac14\) giờ, quãng đường còn lại \(x - 36\) km đi với vận tốc 45 km/h hết \(\dfrac{x - 36}{45}\) giờ.
Phương trình: \(1 + \dfrac14 + \dfrac{x - 36}{45} = \dfrac{x}{36}\). Nhân hai vế với 180: \(180 + 45 + 4(x - 36) = 5x \Leftrightarrow x = 81\) (thỏa mãn).
Vậy quãng đường AB dài 81 km.`),
              ],
            },
          ],
        },
        {
          title: 'Bài toán năng suất và tỉ số phần trăm',
          description: 'Kế hoạch – thực tế, làm vượt mức; tăng, giảm theo phần trăm.',
          types: [
            {
              slug: 'bai-toan-nang-suat',
              title: 'Bài toán năng suất',
              levels: [3],
              knowledge: r`Khối lượng công việc \(=\) năng suất \(\times\) thời gian; thời gian \(=\) khối lượng công việc \(:\) năng suất.`,
              signs: 'Đề nói về số sản phẩm làm được mỗi ngày, kế hoạch và thực tế, làm vượt mức, hoàn thành sớm hoặc muộn.',
              method: 'Lập bảng năng suất – thời gian – khối lượng công việc cho kế hoạch và thực tế; chọn ẩn, lập phương trình.',
              steps: `- **Bước 1.** Chọn ẩn (số sản phẩm theo kế hoạch, số ngày…), đặt điều kiện.
- **Bước 2.** Biểu diễn thời gian (hoặc khối lượng) theo kế hoạch và thực tế; lập phương trình.
- **Bước 3.** Giải, đối chiếu điều kiện, trả lời.`,
              mistakes: '- Nhầm năng suất với khối lượng công việc.\n- Quên điều kiện số ngày, số sản phẩm là số nguyên dương.',
              example: 'Theo kế hoạch, một tổ sản xuất mỗi ngày làm 50 sản phẩm. Thực tế mỗi ngày tổ làm được 57 sản phẩm nên đã hoàn thành sớm hơn kế hoạch 1 ngày và còn làm thêm được 13 sản phẩm. Hỏi theo kế hoạch, tổ phải làm bao nhiêu sản phẩm?',
              solution: r`Gọi số sản phẩm theo kế hoạch là \(x\) (\(x\) nguyên dương). Thời gian theo kế hoạch: \(\dfrac{x}{50}\) ngày. Thực tế tổ làm \(x + 13\) sản phẩm trong \(\dfrac{x}{50} - 1\) ngày.
\(57\left(\dfrac{x}{50} - 1\right) = x + 13 \Leftrightarrow 57x - 2850 = 50x + 650 \Leftrightarrow 7x = 3500 \Leftrightarrow x = 500\).
Theo kế hoạch tổ phải làm 500 sản phẩm.`,
              exercises: [
                sa(3, 'Một xưởng may theo kế hoạch mỗi ngày may 40 chiếc áo. Nhờ cải tiến kĩ thuật, mỗi ngày xưởng may được 50 chiếc áo nên đã hoàn thành kế hoạch sớm 3 ngày. Hỏi theo kế hoạch xưởng phải may bao nhiêu chiếc áo?', ['600'], r`Gọi số áo theo kế hoạch là \(x\). \(\dfrac{x}{40} - \dfrac{x}{50} = 3 \Leftrightarrow 5x - 4x = 600 \Leftrightarrow x = 600\).`, 'chiếc'),
                sa(3, 'Một đội công nhân dự định mỗi ngày sửa 15 m đường. Thực tế mỗi ngày đội sửa được 20 m nên hoàn thành sớm hơn dự định 2 ngày. Tính chiều dài đoạn đường.', ['120'], r`Gọi chiều dài đoạn đường là \(x\) (m). \(\dfrac{x}{15} - \dfrac{x}{20} = 2 \Leftrightarrow 4x - 3x = 120 \Leftrightarrow x = 120\).`, 'm'),
              ],
            },
            {
              slug: 'bai-toan-ti-so-phan-tram',
              title: 'Bài toán tỉ số phần trăm',
              levels: [2, 3],
              knowledge: r`\(a\%\) của \(A\) là \(\dfrac{A\cdot a}{100}\); tăng \(a\%\): giá trị mới \(= A\left(1 + \dfrac{a}{100}\right)\); giảm \(a\%\): giá trị mới \(= A\left(1 - \dfrac{a}{100}\right)\).`,
              signs: 'Đề có tăng, giảm theo phần trăm: giá khuyến mại, vượt mức kế hoạch theo phần trăm, dân số, số học sinh tăng.',
              method: 'Gọi đại lượng ban đầu là ẩn, biểu diễn đại lượng sau khi tăng (giảm) theo phần trăm, lập phương trình.',
              steps: `- **Bước 1.** Gọi ẩn là đại lượng ban đầu (giá gốc, số lượng theo kế hoạch…).
- **Bước 2.** Biểu diễn đại lượng sau khi thay đổi, lập phương trình.
- **Bước 3.** Giải, trả lời.`,
              mistakes: '- Tính phần trăm trên giá đã giảm thay vì giá gốc.\n- Cho rằng giảm 10% rồi tăng 10% thì trở về giá cũ.',
              example: 'Một cửa hàng giảm giá 20% cho một chiếc áo nên bạn Lan chỉ phải trả 240 nghìn đồng. Hỏi giá ban đầu của chiếc áo là bao nhiêu?',
              solution: r`Gọi giá ban đầu là \(x\) (nghìn đồng), \(x > 0\). Giá sau khi giảm: \(0{,}8x\). \(0{,}8x = 240 \Leftrightarrow x = 300\). Giá ban đầu là 300 nghìn đồng.`,
              exercises: [
                mcq(2, r`Một món hàng giá \(x\) nghìn đồng được giảm giá 15%. Giá mới của món hàng (nghìn đồng) là`, [r`\(0{,}85x\)`, r`\(0{,}15x\)`, r`\(x - 15\)`, r`\(1{,}15x\)`], 'A', r`Giá mới \(= x - 0{,}15x = 0{,}85x\).`),
                sa(2, 'Năm nay số học sinh của một trường tăng 5% so với năm trước và bằng 840 học sinh. Năm trước trường có bao nhiêu học sinh?', ['800'], r`\(1{,}05x = 840 \Leftrightarrow x = 800\).`, 'học sinh'),
                sa(3, 'Theo kế hoạch, hai xí nghiệp phải làm tổng cộng 360 dụng cụ. Thực tế xí nghiệp I vượt mức 12%, xí nghiệp II vượt mức 10% nên cả hai làm được 400 dụng cụ. Theo kế hoạch, xí nghiệp I phải làm bao nhiêu dụng cụ?', ['200'], r`Gọi số dụng cụ xí nghiệp I phải làm theo kế hoạch là \(x\) (\(0 < x < 360\)). \(1{,}12x + 1{,}1(360 - x) = 400 \Leftrightarrow 0{,}02x = 4 \Leftrightarrow x = 200\).`, 'dụng cụ'),
              ],
            },
          ],
        },
        {
          title: 'Bài toán hình học và quan hệ giữa các số',
          description: 'Chu vi, diện tích; quan hệ số lượng, tuổi.',
          types: [
            {
              slug: 'bai-toan-chu-vi-dien-tich',
              title: 'Bài toán chu vi, diện tích hình chữ nhật',
              levels: [2, 3],
              knowledge: r`Hình chữ nhật có chiều dài \(a\), chiều rộng \(b\): chu vi \(2(a + b)\), diện tích \(ab\).`,
              signs: 'Đề cho quan hệ giữa chiều dài, chiều rộng, chu vi; hoặc diện tích thay đổi khi tăng, giảm các kích thước.',
              method: 'Gọi một kích thước là ẩn, biểu diễn kích thước còn lại; lập phương trình từ chu vi hoặc từ phần diện tích thay đổi (các hạng tử bậc hai triệt tiêu).',
              steps: `- **Bước 1.** Gọi chiều rộng (hoặc chiều dài) là x, điều kiện x > 0.
- **Bước 2.** Biểu diễn kích thước còn lại theo x, lập phương trình.
- **Bước 3.** Giải, kiểm tra điều kiện, trả lời.`,
              mistakes: '- Nhầm nửa chu vi với chu vi.\n- Khi diện tích thay đổi, quên nhân đủ các hạng tử khi khai triển.',
              example: 'Một mảnh vườn hình chữ nhật có chu vi 56 m, chiều dài hơn chiều rộng 4 m. Tính diện tích mảnh vườn.',
              solution: r`Gọi chiều rộng là \(x\) (m), \(x > 0\); chiều dài \(x + 4\). Nửa chu vi: \(x + x + 4 = 28 \Leftrightarrow x = 12\). Chiều dài 16 m. Diện tích \(12\cdot16 = 192\) m².`,
              exercises: [
                sa(2, 'Một hình chữ nhật có chiều dài gấp 3 lần chiều rộng và chu vi bằng 64 cm. Tính chiều rộng của hình chữ nhật.', ['8'], r`Nửa chu vi 32 cm: \(x + 3x = 32 \Leftrightarrow x = 8\).`, 'cm'),
                sa(3, 'Một mảnh đất hình chữ nhật có chiều dài hơn chiều rộng 5 m. Nếu tăng chiều rộng thêm 3 m và giảm chiều dài 2 m thì diện tích tăng thêm 24 m². Tính chiều rộng ban đầu của mảnh đất.', ['15'], r`Gọi chiều rộng là \(x\) (m). \((x + 3)(x + 3) - x(x + 5) = 24 \Leftrightarrow x + 9 = 24 \Leftrightarrow x = 15\). (Kiểm tra: \(15\cdot20 = 300\), \(18\cdot18 = 324\).)`, 'm'),
              ],
            },
            {
              slug: 'bai-toan-quan-he-so-tuoi',
              title: 'Bài toán về quan hệ giữa các số, tuổi',
              levels: [2, 3],
              knowledge: 'Biểu diễn quan hệ "gấp", "hơn", "kém", tổng – hiệu bằng biểu thức; sau n năm tuổi của mọi người đều tăng thêm n.',
              signs: 'Đề cho tổng, hiệu, quan hệ gấp nhiều lần giữa các số; tuổi hiện nay và sau (trước) một số năm; phân số thay đổi tử, mẫu.',
              method: 'Gọi một số (một tuổi) là ẩn, biểu diễn các số còn lại, lập phương trình theo quan hệ ở thời điểm đề cho.',
              steps: `- **Bước 1.** Gọi ẩn, đặt điều kiện (thường là số tự nhiên).
- **Bước 2.** Biểu diễn các số khác theo ẩn, lập phương trình.
- **Bước 3.** Giải, đối chiếu điều kiện, trả lời.`,
              mistakes: '- Sau n năm chỉ cộng thêm tuổi của một người.\n- Nhầm "gấp 3 lần" với "hơn 3".',
              example: 'Hiện nay tuổi mẹ gấp 3 lần tuổi con. Sau 12 năm nữa tuổi mẹ chỉ còn gấp 2 lần tuổi con. Tính tuổi con hiện nay.',
              solution: r`Gọi tuổi con hiện nay là \(x\) (\(x\) nguyên dương), tuổi mẹ \(3x\). Sau 12 năm: \(3x + 12 = 2(x + 12) \Leftrightarrow x = 12\). Con 12 tuổi, mẹ 36 tuổi.`,
              exercises: [
                sa(2, 'Tổng của hai số là 90, số lớn gấp đôi số bé. Tìm số bé.', ['30'], r`\(x + 2x = 90 \Leftrightarrow x = 30\).`),
                sa(3, r`Một phân số có tử số bé hơn mẫu số 3 đơn vị. Nếu tăng tử số thêm 7 đơn vị và giữ nguyên mẫu số thì được phân số bằng \(\dfrac32\). Tìm tử số của phân số ban đầu.`, ['5'], r`Gọi tử số là \(x\), mẫu số \(x + 3\). \(\dfrac{x + 7}{x + 3} = \dfrac32 \Leftrightarrow 2x + 14 = 3x + 9 \Leftrightarrow x = 5\). Phân số ban đầu \(\dfrac58\).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 27 ----------------
    {
      slug: 'bai-27-khai-niem-ham-so-va-do-thi-cua-ham-so',
      difficulty: 2,
      objectives: `- Nhận biết khái niệm hàm số; hàm số cho bằng bảng, bằng công thức; tính giá trị của hàm số.
- Nhận biết mặt phẳng tọa độ, tọa độ của một điểm; xác định một điểm khi biết tọa độ của nó.
- Nhận biết đồ thị của hàm số.`,
      prerequisites: '- Đại lượng tỉ lệ thuận, tỉ lệ nghịch (Toán 7).\n- Tính giá trị của biểu thức đại số (Toán 7, Chương I).',
      concepts: r`Hàm số, biến số; giá trị của hàm số \(f(x)\); mặt phẳng tọa độ \(Oxy\), trục hoành \(Ox\), trục tung \(Oy\), gốc tọa độ \(O\); hoành độ, tung độ; đồ thị của hàm số.`,
      properties: r`- Nếu đại lượng \(y\) phụ thuộc vào đại lượng thay đổi \(x\) sao cho với mỗi giá trị của \(x\) ta luôn xác định được chỉ một giá trị tương ứng của \(y\) thì \(y\) là hàm số của \(x\), \(x\) gọi là biến số.
- Điểm \(M\) có hoành độ \(x_0\), tung độ \(y_0\) được viết \(M(x_0; y_0)\). Điểm nằm trên trục hoành có tung độ bằng 0; điểm nằm trên trục tung có hoành độ bằng 0.
- Đồ thị của hàm số \(y = f(x)\) là tập hợp tất cả các điểm \((x; f(x))\) trên mặt phẳng tọa độ.`,
      themes: [
        {
          title: 'Khái niệm hàm số',
          description: 'Hàm số cho bằng bảng, bằng công thức; giá trị của hàm số.',
          types: [
            {
              slug: 'ham-so-cho-boi-bang-cong-thuc',
              title: 'Nhận biết hàm số cho bởi bảng, công thức',
              legacy: ['Hàm số cho bởi bảng, công thức'],
              levels: [1, 2],
              knowledge: r`\(y\) là hàm số của \(x\) nếu mỗi giá trị của \(x\) xác định được đúng một giá trị tương ứng của \(y\).`,
              signs: 'Đề cho bảng giá trị hoặc công thức (hoặc mô tả bằng lời), hỏi y có phải là hàm số của x không.',
              method: 'Kiểm tra từng giá trị của x: có ứng với đúng một giá trị của y hay không.',
              steps: `- **Bước 1.** Xét từng giá trị của x trong bảng (hoặc theo công thức).
- **Bước 2.** Nếu có một giá trị của x ứng với hai giá trị khác nhau của y thì y không phải là hàm số của x.
- **Bước 3.** Kết luận.`,
              mistakes: '- Cho rằng hai giá trị khác nhau của x có cùng giá trị y thì y không là hàm số (thực ra vẫn là hàm số).\n- Nhầm vai trò của x và y.',
              example: r`Mỗi bảng sau có cho \(y\) là hàm số của \(x\) không?
Bảng 1:
| \(x\) | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| \(y\) | 5 | 5 | 7 | 9 |

Bảng 2:
| \(x\) | 1 | 1 | 2 | 3 |
|---|---|---|---|---|
| \(y\) | 2 | 4 | 6 | 8 |`,
              solution: r`Bảng 1: mỗi giá trị của \(x\) ứng với đúng một giá trị của \(y\) (hai giá trị \(x = 1\), \(x = 2\) cùng ứng với \(y = 5\) vẫn được), nên \(y\) là hàm số của \(x\).
Bảng 2: giá trị \(x = 1\) ứng với hai giá trị \(y = 2\) và \(y = 4\), nên \(y\) không phải là hàm số của \(x\).`,
              exercises: [
                mcq(1, r`Công thức nào sau đây **không** cho \(y\) là hàm số của \(x\)?`, [r`\(y^2 = x\)`, r`\(y = 2x - 1\)`, r`\(y = x^2\)`, r`\(y = 5\)`], 'A', r`Với \(y^2 = x\), giá trị \(x = 4\) ứng với hai giá trị \(y = 2\) và \(y = -2\), nên \(y\) không là hàm số của \(x\).`),
                tf(2, 'Mỗi khẳng định sau đúng hay sai?', [
                  ['Chu vi y của hình vuông là hàm số của độ dài cạnh x.', true],
                  [r`Hàm số \(y = 3\) (với mọi \(x\)) là một hàm số.`, true],
                  ['Nếu hai giá trị khác nhau của x cho cùng một giá trị y thì y không là hàm số của x.', false],
                  ['Diện tích S của hình tròn là hàm số của bán kính r.', true],
                ], r`a) \(y = 4x\): đúng. b) Đúng (hàm hằng). c) Sai: chỉ cần mỗi \(x\) ứng với một \(y\). d) \(S = \pi r^2\): đúng.`),
              ],
            },
            {
              slug: 'tinh-gia-tri-ham-so',
              title: 'Tính giá trị của hàm số',
              levels: [1, 2, 3],
              knowledge: r`\(f(a)\) là giá trị của hàm số \(y = f(x)\) tại \(x = a\).`,
              signs: r`Đề cho công thức \(y = f(x)\), yêu cầu tính \(f(a)\), lập bảng giá trị, so sánh các giá trị, hoặc tìm \(x\) khi biết \(f(x)\).`,
              method: 'Thay giá trị của biến vào công thức rồi tính; tìm x khi biết f(x) = k thì giải phương trình f(x) = k.',
              steps: r`- **Bước 1.** Thay \(x = a\) vào công thức.
- **Bước 2.** Tính theo thứ tự thực hiện phép tính.
- **Bước 3.** (Nếu tìm \(x\)) giải phương trình \(f(x) = k\).`,
              mistakes: r`- Thay số âm không đặt trong ngoặc.
- Nhầm \(f(2)\) là \(f\cdot 2\).`,
              example: r`Cho hàm số \(y = f(x) = 2x^2 - 1\). Tính \(f(0)\), \(f(-1)\), \(f\left(\dfrac12\right)\).`,
              solution: r`\(f(0) = -1\); \(f(-1) = 2\cdot1 - 1 = 1\); \(f\left(\dfrac12\right) = 2\cdot\dfrac14 - 1 = -\dfrac12\).`,
              exercises: [
                sa(1, r`Cho hàm số \(y = f(x) = 3x - 2\). Tính \(f(-1)\).`, ['-5'], r`\(f(-1) = 3\cdot(-1) - 2 = -5\).`),
                mcq(2, r`Cho hàm số \(f(x) = x^2 + 1\). Khẳng định nào sau đây đúng?`, [r`\(f(-2) = f(2)\)`, r`\(f(-2) = -3\)`, r`\(f(0) = 0\)`, r`\(f(1) = 1\)`], 'A', r`\(f(-2) = 5 = f(2)\); \(f(0) = 1\); \(f(1) = 2\).`),
                sa(3, r`Cho hàm số \(y = f(x) = 5 - 2x\). Tìm \(x\) để \(f(x) = 11\).`, ['-3'], r`\(5 - 2x = 11 \Leftrightarrow -2x = 6 \Leftrightarrow x = -3\).`),
              ],
            },
          ],
        },
        {
          title: 'Mặt phẳng tọa độ và đồ thị của hàm số',
          description: 'Tọa độ của một điểm; vẽ và đọc đồ thị hàm số.',
          types: [
            {
              slug: 'toa-do-diem',
              title: 'Tọa độ của một điểm trên mặt phẳng tọa độ',
              levels: [1, 2],
              knowledge: r`Mỗi điểm \(M\) trên mặt phẳng tọa độ \(Oxy\) xác định một cặp số \((x_0; y_0)\): \(x_0\) là hoành độ, \(y_0\) là tung độ. Điểm trên trục \(Ox\) có tung độ 0, điểm trên trục \(Oy\) có hoành độ 0.`,
              signs: 'Đề yêu cầu đọc tọa độ các điểm trên hình, biểu diễn điểm khi biết tọa độ, hoặc nhận biết điểm nằm trên trục tọa độ.',
              method: 'Từ điểm kẻ các đường vuông góc xuống hai trục để đọc hoành độ, tung độ; làm ngược lại để biểu diễn điểm.',
              steps: r`- **Bước 1.** Từ \(M\) kẻ đường thẳng vuông góc với \(Ox\), cắt \(Ox\) tại điểm biểu diễn số \(x_0\) (hoành độ).
- **Bước 2.** Từ \(M\) kẻ đường thẳng vuông góc với \(Oy\), cắt \(Oy\) tại điểm biểu diễn số \(y_0\) (tung độ).
- **Bước 3.** Viết \(M(x_0; y_0)\).`,
              mistakes: '- Viết ngược thứ tự (tung độ trước, hoành độ sau).\n- Nhầm dấu khi điểm nằm bên trái trục tung hoặc phía dưới trục hoành.',
              example: r`Viết tọa độ của các điểm \(A\), \(B\), \(C\), \(D\) trong hình sau.
[bieudo]
loai: dothi
diem: A(2; 3); B(-3; 1); C(-2; -2); D(3; 0)
x: -4; 4
y: -3; 4
[/bieudo]`,
              solution: r`\(A(2; 3)\), \(B(-3; 1)\), \(C(-2; -2)\), \(D(3; 0)\) (điểm \(D\) nằm trên trục hoành nên tung độ bằng 0).`,
              exercises: [
                mcq(1, 'Điểm nào sau đây nằm trên trục tung?', [r`\(M(0; 3)\)`, r`\(N(3; 0)\)`, r`\(P(1; 1)\)`, r`\(Q(-2; 3)\)`], 'A', 'Điểm nằm trên trục tung có hoành độ bằng 0.'),
                tf(2, r`Cho các điểm \(A(2; -1)\), \(B(-3; 0)\), \(C(0; 4)\), \(D(-1; -5)\). Mỗi khẳng định sau đúng hay sai?`, [
                  [r`Điểm \(B\) nằm trên trục hoành.`, true],
                  [r`Điểm \(C\) có hoành độ bằng 4.`, false],
                  [r`Điểm \(A\) có tung độ bằng \(-1\).`, true],
                  [r`Điểm \(D\) có hoành độ là số dương.`, false],
                ], r`a) Tung độ của \(B\) bằng 0: đúng. b) Hoành độ của \(C\) bằng 0: sai. c) Đúng. d) Hoành độ của \(D\) là \(-1\): sai.`),
                sa(2, r`Trên mặt phẳng tọa độ (đơn vị trên các trục là xăng-ti-mét), cho hình chữ nhật \(ABCD\) với \(A(1; 1)\), \(B(5; 1)\), \(C(5; 4)\). Tính diện tích hình chữ nhật.`, ['12'], r`\(AB = 5 - 1 = 4\) cm, \(BC = 4 - 1 = 3\) cm. Diện tích \(4\cdot3 = 12\) cm². (Điểm \(D(1; 4)\).)`, 'cm²'),
              ],
            },
            {
              slug: 've-doc-do-thi',
              title: 'Vẽ và đọc đồ thị hàm số',
              levels: [2, 3],
              knowledge: r`Đồ thị của hàm số \(y = f(x)\) là tập hợp các điểm \((x; f(x))\); điểm \(M(x_0; y_0)\) thuộc đồ thị khi và chỉ khi \(y_0 = f(x_0)\).`,
              signs: 'Đề yêu cầu vẽ đồ thị hàm số cho bằng bảng, kiểm tra điểm thuộc đồ thị, hoặc đọc thông tin trên đồ thị.',
              method: 'Lập bảng giá trị và biểu diễn các điểm (x; f(x)); để kiểm tra điểm thuộc đồ thị, thay hoành độ vào công thức rồi so sánh với tung độ.',
              steps: r`- **Bước 1.** Lập bảng các cặp giá trị tương ứng \((x; y)\).
- **Bước 2.** Biểu diễn các điểm trên mặt phẳng tọa độ.
- **Bước 3.** Đọc đồ thị: giá trị của hàm số tại \(x = a\) là tung độ của điểm thuộc đồ thị có hoành độ \(a\).`,
              mistakes: '- Nối các điểm rời rạc thành đường khi hàm số chỉ cho bởi bảng.\n- Thay nhầm tung độ vào vị trí của hoành độ.',
              example: r`Cho hàm số \(y = 2x\). Trong các điểm \(A(1; 2)\), \(B(-1; 2)\), \(C(2; 4)\), điểm nào thuộc đồ thị của hàm số?
[bieudo]
loai: dothi
ham so: 2x
diem: A(1; 2); B(-1; 2); C(2; 4)
x: -3; 3
y: -3; 5
[/bieudo]`,
              solution: r`\(2\cdot1 = 2\): \(A\) thuộc đồ thị. \(2\cdot(-1) = -2 \ne 2\): \(B\) không thuộc đồ thị. \(2\cdot2 = 4\): \(C\) thuộc đồ thị.`,
              exercises: [
                mcq(2, r`Điểm nào sau đây thuộc đồ thị của hàm số \(y = -3x + 1\)?`, [r`\(M(1; -2)\)`, r`\(N(1; 2)\)`, r`\(P(0; -1)\)`, r`\(Q(-1; -2)\)`], 'A', r`\(-3\cdot1 + 1 = -2\) nên \(M(1; -2)\) thuộc đồ thị.`),
                sa(3, r`Điểm \(A(2; m)\) thuộc đồ thị của hàm số \(y = x^2 - 3\). Tìm \(m\).`, ['1'], r`\(m = 2^2 - 3 = 1\).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 28 ----------------
    {
      slug: 'bai-28-ham-so-bac-nhat-va-do-thi-cua-ham-so-bac-nhat',
      difficulty: 3,
      objectives: `- Nhận biết hàm số bậc nhất y = ax + b (a ≠ 0); thiết lập bảng giá trị của hàm số bậc nhất.
- Vẽ đồ thị của hàm số bậc nhất.
- Vận dụng hàm số bậc nhất và đồ thị vào giải quyết bài toán thực tiễn.`,
      prerequisites: '- Khái niệm hàm số, mặt phẳng tọa độ, đồ thị (Bài 27).\n- Giải phương trình bậc nhất một ẩn (Bài 25).',
      concepts: r`Hàm số bậc nhất \(y = ax + b\) (\(a \ne 0\)); bảng giá trị; đồ thị của hàm số bậc nhất là một đường thẳng.`,
      formulas: r`Đồ thị \(y = ax + b\) (\(a \ne 0\)) đi qua \(P(0; b)\) và \(Q\left(-\dfrac{b}{a}; 0\right)\); đồ thị \(y = ax\) đi qua \(O(0; 0)\) và \(A(1; a)\).`,
      properties: r`- Đồ thị của hàm số \(y = ax + b\) (\(a \ne 0\)) là một đường thẳng: cắt trục tung tại điểm có tung độ bằng \(b\); song song với đường thẳng \(y = ax\) nếu \(b \ne 0\) và trùng với đường thẳng \(y = ax\) nếu \(b = 0\).
- Để vẽ đồ thị chỉ cần xác định hai điểm phân biệt thuộc đồ thị.`,
      themes: [
        {
          title: 'Hàm số bậc nhất',
          description: 'Nhận dạng hàm số bậc nhất; bảng giá trị.',
          types: [
            {
              slug: 'nhan-dang-ham-so-bac-nhat',
              title: 'Nhận dạng hàm số bậc nhất',
              levels: [1, 2],
              knowledge: r`Hàm số bậc nhất là hàm số cho bởi công thức \(y = ax + b\), trong đó \(a\), \(b\) là các số cho trước và \(a \ne 0\).`,
              signs: r`Đề cho nhiều công thức, hỏi hàm số nào là hàm số bậc nhất, chỉ ra \(a\), \(b\); hoặc tìm \(m\) để hàm số là (không là) hàm số bậc nhất.`,
              method: r`Thu gọn công thức về dạng \(y = ax + b\), xác định \(a\), \(b\) và kiểm tra \(a \ne 0\).`,
              steps: r`- **Bước 1.** Thu gọn công thức về dạng \(y = ax + b\).
- **Bước 2.** Xác định hệ số \(a\), \(b\).
- **Bước 3.** Kiểm tra \(a \ne 0\) (nếu có tham số \(m\): cho hệ số của \(x\) khác 0).`,
              mistakes: r`- Coi \(y = 3\) (tức \(a = 0\)) là hàm số bậc nhất.
- Coi \(y = \dfrac{2}{x} + 1\) là hàm số bậc nhất.
- Không thu gọn trước: \(y = 2(x - 1) + 3 = 2x + 1\) vẫn là hàm số bậc nhất.`,
              example: r`Hàm số nào là hàm số bậc nhất? Chỉ ra \(a\), \(b\): a) \(y = 1 - 5x\); b) \(y = x^2 + 2\); c) \(y = \dfrac{x + 1}{3}\); d) \(y = 0x + 4\).`,
              solution: r`a) Là hàm số bậc nhất, \(a = -5\), \(b = 1\).
b) Không (có \(x^2\)).
c) \(y = \dfrac13x + \dfrac13\): là hàm số bậc nhất, \(a = b = \dfrac13\).
d) Không (\(a = 0\)).`,
              exercises: [
                mcq(1, 'Hàm số nào sau đây là hàm số bậc nhất?', [r`\(y = 2 - 3x\)`, r`\(y = x^2 - 1\)`, r`\(y = \dfrac{2}{x} + 1\)`, r`\(y = 0x + 5\)`], 'A', r`\(y = 2 - 3x = -3x + 2\) có \(a = -3 \ne 0\).`),
                sa(2, r`Tìm giá trị của \(m\) để hàm số \(y = (m - 2)x + 3\) **không** là hàm số bậc nhất.`, ['2'], r`Hàm số không là hàm số bậc nhất khi hệ số của \(x\) bằng 0: \(m - 2 = 0 \Leftrightarrow m = 2\).`),
                tf(2, r`Cho hàm số \(y = 3(x - 1) + 2\). Mỗi khẳng định sau đúng hay sai?`, [
                  ['Đây là hàm số bậc nhất.', true],
                  [r`Hệ số \(a = 3\).`, true],
                  [r`Hệ số \(b = 2\).`, false],
                  [r`Đồ thị của hàm số đi qua điểm \(M(1; 2)\).`, true],
                ], r`Thu gọn: \(y = 3x - 1\), nên \(a = 3\), \(b = -1\). Tại \(x = 1\): \(y = 2\), nên \(M(1; 2)\) thuộc đồ thị.`),
              ],
            },
            {
              slug: 'bang-gia-tri-ham-so-bac-nhat',
              title: 'Lập bảng giá trị, tính giá trị của hàm số bậc nhất',
              legacy: ['Tính giá trị của hàm số'],
              levels: [1, 2],
              knowledge: r`Giá trị của hàm số \(y = ax + b\) tại \(x = x_0\) là \(a x_0 + b\).`,
              signs: 'Đề yêu cầu tính giá trị của hàm số bậc nhất, hoàn thành bảng giá trị, hoặc tìm x khi biết giá trị của y.',
              method: 'Thay từng giá trị x vào công thức; khi biết y thì giải phương trình ax + b = y.',
              steps: `- **Bước 1.** Viết bảng với các giá trị x cho trước.
- **Bước 2.** Tính y = ax + b cho từng giá trị x.
- **Bước 3.** Điền vào bảng (hoặc giải phương trình để tìm x).`,
              mistakes: '- Sai dấu khi x âm.\n- Nhầm vai trò của a và b.',
              example: r`Hoàn thành bảng giá trị của hàm số \(y = 2x - 3\):
| \(x\) | \(-1\) | 0 | 1 | 2 |
|---|---|---|---|---|
| \(y\) | ? | ? | ? | ? |`,
              solution: r`| \(x\) | \(-1\) | 0 | 1 | 2 |
|---|---|---|---|---|
| \(y\) | \(-5\) | \(-3\) | \(-1\) | 1 |`,
              exercises: [
                sa(1, r`Cho hàm số \(y = -2x + 5\). Tính giá trị của \(y\) khi \(x = 3\).`, ['-1'], r`\(y = -2\cdot3 + 5 = -1\).`),
                sa(2, r`Cho hàm số \(y = \dfrac12x + 1\). Tìm \(x\) để \(y = 4\).`, ['6'], r`\(\dfrac12x + 1 = 4 \Leftrightarrow \dfrac12x = 3 \Leftrightarrow x = 6\).`),
              ],
            },
          ],
        },
        {
          title: 'Đồ thị của hàm số bậc nhất',
          description: 'Vẽ đồ thị; điểm thuộc đồ thị, xác định hệ số.',
          types: [
            {
              slug: 've-do-thi-ham-so-bac-nhat',
              title: 'Vẽ đồ thị hàm số bậc nhất',
              levels: [2, 3],
              knowledge: r`Đồ thị \(y = ax + b\) (\(a \ne 0\)) là đường thẳng; chỉ cần hai điểm phân biệt, thường lấy giao điểm với hai trục: \((0; b)\) và \(\left(-\dfrac{b}{a}; 0\right)\).`,
              signs: 'Đề yêu cầu vẽ đồ thị hàm số bậc nhất, vẽ hai đồ thị trên cùng một mặt phẳng tọa độ, tìm giao điểm của đồ thị với các trục.',
              method: 'Xác định hai điểm thuộc đồ thị (giao với hai trục hoặc hai điểm có tọa độ nguyên), vẽ đường thẳng đi qua hai điểm đó.',
              steps: r`- **Bước 1.** Cho \(x = 0\) thì \(y = b\): được điểm \(P(0; b)\).
- **Bước 2.** Cho \(y = 0\) thì \(x = -\dfrac{b}{a}\): được điểm \(Q\left(-\dfrac{b}{a}; 0\right)\) (nếu tọa độ lẻ, chọn điểm khác có tọa độ nguyên).
- **Bước 3.** Vẽ đường thẳng \(PQ\). (Nếu \(b = 0\): vẽ đường thẳng đi qua \(O\) và \(A(1; a)\).)`,
              mistakes: r`- Chỉ vẽ đoạn thẳng \(PQ\) mà không kéo dài thành đường thẳng.
- Tính sai giao điểm với trục hoành thành \(x = \dfrac{b}{a}\) (sai dấu).`,
              example: r`Vẽ đồ thị của hàm số \(y = 2x - 4\).`,
              solution: r`Cho \(x = 0\) thì \(y = -4\): điểm \(P(0; -4)\). Cho \(y = 0\) thì \(x = 2\): điểm \(Q(2; 0)\). Đồ thị là đường thẳng \(PQ\):
[bieudo]
loai: dothi
ham so: 2x - 4
diem: P(0; -4); Q(2; 0)
x: -1; 4
y: -5; 3
[/bieudo]`,
              exercises: [
                mcq(2, r`Đồ thị của hàm số \(y = -x + 3\) cắt trục hoành tại điểm`, [r`\((3; 0)\)`, r`\((0; 3)\)`, r`\((-3; 0)\)`, r`\((0; -3)\)`], 'A', r`Cho \(y = 0\): \(-x + 3 = 0 \Leftrightarrow x = 3\). Giao điểm \((3; 0)\).`),
                mcq(2, r`Đồ thị của hàm số \(y = 3x + 2\) cắt trục tung tại điểm có tung độ bằng`, [r`\(2\)`, r`\(3\)`, r`\(-\dfrac23\)`, r`\(0\)`], 'A', r`Cho \(x = 0\) thì \(y = 2\).`),
                es(3, r`Vẽ đồ thị của hai hàm số \(y = x + 1\) và \(y = -2x + 4\) trên cùng một mặt phẳng tọa độ. Tìm tọa độ giao điểm của hai đồ thị.`, r`\(y = x + 1\) đi qua \((0; 1)\) và \((-1; 0)\); \(y = -2x + 4\) đi qua \((0; 4)\) và \((2; 0)\).
Hoành độ giao điểm: \(x + 1 = -2x + 4 \Leftrightarrow x = 1\), khi đó \(y = 2\). Giao điểm \(A(1; 2)\).
[bieudo]
loai: dothi
ham so: x + 1; -2x + 4
diem: A(1; 2)
x: -2; 3
y: -2; 5
[/bieudo]`),
              ],
            },
            {
              slug: 'diem-thuoc-do-thi-tim-he-so',
              title: 'Điểm thuộc đồ thị, xác định hệ số của hàm số',
              levels: [2, 3, 4],
              knowledge: r`Điểm \(M(x_0; y_0)\) thuộc đồ thị hàm số \(y = ax + b\) khi và chỉ khi \(y_0 = a x_0 + b\).`,
              signs: 'Đề cho đồ thị đi qua một điểm, cắt trục tung hoặc trục hoành tại điểm cho trước; yêu cầu tìm a hoặc b, hoặc tìm điểm cố định.',
              method: 'Thay tọa độ điểm vào công thức hàm số được phương trình bậc nhất với ẩn là hệ số cần tìm.',
              steps: r`- **Bước 1.** Viết điều kiện \(y_0 = a x_0 + b\).
- **Bước 2.** Giải phương trình tìm hệ số chưa biết, kiểm tra \(a \ne 0\).
- **Bước 3.** Viết hàm số hoặc kết luận.`,
              mistakes: r`- Thay nhầm \(x_0\) và \(y_0\).
- Quên kiểm tra điều kiện \(a \ne 0\).`,
              example: r`Tìm \(a\) để đồ thị hàm số \(y = ax + 3\) đi qua điểm \(A(2; -1)\).`,
              solution: r`\(A\) thuộc đồ thị nên \(-1 = 2a + 3 \Leftrightarrow a = -2\) (thỏa mãn \(a \ne 0\)). Hàm số \(y = -2x + 3\).`,
              exercises: [
                sa(2, r`Đồ thị hàm số \(y = 2x + b\) đi qua điểm \(M(1; 5)\). Tìm \(b\).`, ['3'], r`\(5 = 2\cdot1 + b \Leftrightarrow b = 3\).`),
                sa(3, r`Đồ thị hàm số \(y = ax - 4\) cắt trục hoành tại điểm có hoành độ bằng 2. Tìm \(a\).`, ['2'], r`Điểm \((2; 0)\) thuộc đồ thị: \(0 = 2a - 4 \Leftrightarrow a = 2\).`),
                es(4, r`Cho hàm số \(y = (m - 1)x + 2m\) (\(m \ne 1\)). Chứng minh rằng đồ thị của hàm số luôn đi qua một điểm cố định với mọi \(m \ne 1\). Tìm tọa độ điểm đó.`, r`Viết \(y = m(x + 2) - x\). Với \(x = -2\) thì \(y = 2\) với mọi \(m\).
Thật vậy, thay \(x = -2\): \((m - 1)(-2) + 2m = -2m + 2 + 2m = 2\). Vậy đồ thị luôn đi qua điểm cố định \((-2; 2)\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng hàm số bậc nhất',
          description: 'Bài toán thực tiễn: cước phí, chi phí, lượng nước, so sánh phương án.',
          types: [
            {
              slug: 'thuc-te-ham-so-bac-nhat',
              title: 'Bài toán thực tế về hàm số bậc nhất',
              levels: [3, 4],
              knowledge: r`Đại lượng thay đổi đều theo \(x\): \(y = (\text{lượng thay đổi trên mỗi đơn vị})\cdot x + (\text{giá trị ban đầu})\) là hàm số bậc nhất.`,
              signs: 'Bài toán cước taxi, cước điện thoại, chi phí sản xuất, lượng nước trong bể, quãng đường theo thời gian, so sánh hai phương án giá.',
              method: 'Lập công thức y = ax + b (a là lượng thay đổi trên mỗi đơn vị, b là giá trị ban đầu), rồi tính giá trị hoặc giải phương trình; dùng đồ thị để so sánh các phương án.',
              steps: `- **Bước 1.** Xác định giá trị ban đầu (b) và lượng thay đổi trên mỗi đơn vị (a).
- **Bước 2.** Viết công thức y = ax + b.
- **Bước 3.** Tính giá trị tại x cho trước, hoặc tìm x khi biết y; so sánh các phương án.`,
              mistakes: '- Nhầm vai trò của a và b (lấy phí cố định làm hệ số của x).\n- Không đổi đơn vị trước khi lập công thức.',
              example: 'Một bể đang chứa 200 lít nước. Người ta mở vòi cho nước chảy vào bể, mỗi phút 25 lít. a) Viết công thức tính lượng nước y (lít) có trong bể sau x phút. b) Sau bao lâu bể có 700 lít nước?',
              solution: r`a) \(y = 25x + 200\).
b) \(25x + 200 = 700 \Leftrightarrow x = 20\). Sau 20 phút bể có 700 lít nước.`,
              exercises: [
                sa(3, r`Cước điện thoại của một gói gồm phí thuê bao 30 nghìn đồng mỗi tháng và 2 nghìn đồng cho mỗi phút gọi. Gọi \(y\) (nghìn đồng) là số tiền phải trả trong tháng khi gọi \(x\) phút. Tháng này bạn Minh trả 150 nghìn đồng. Minh đã gọi bao nhiêu phút?`, ['60'], r`\(y = 2x + 30\). \(2x + 30 = 150 \Leftrightarrow x = 60\).`, 'phút'),
                sa(4, 'Hãng xe A cho thuê xe với phí cố định 200 nghìn đồng và 8 nghìn đồng cho mỗi km; hãng xe B: phí cố định 120 nghìn đồng và 10 nghìn đồng cho mỗi km. Với quãng đường bao nhiêu km thì số tiền thuê xe của hai hãng bằng nhau?', ['40'], r`Số tiền thuê: hãng A \(y = 8x + 200\), hãng B \(y = 10x + 120\). \(8x + 200 = 10x + 120 \Leftrightarrow x = 40\). Đi dưới 40 km thuê hãng B rẻ hơn, trên 40 km thuê hãng A rẻ hơn.`, 'km'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 29 ----------------
    {
      slug: 'bai-29-he-so-goc-cua-duong-thang',
      difficulty: 3,
      objectives: `- Nhận biết khái niệm hệ số góc của đường thẳng y = ax + b (a ≠ 0).
- Sử dụng hệ số góc để nhận biết và giải thích sự cắt nhau hoặc song song của hai đường thẳng cho trước.`,
      prerequisites: '- Hàm số bậc nhất và đồ thị (Bài 28).\n- Giải phương trình bậc nhất một ẩn (Bài 25).',
      concepts: r`Hệ số góc \(a\) của đường thẳng \(y = ax + b\) (\(a \ne 0\)); hai đường thẳng song song, trùng nhau, cắt nhau.`,
      formulas: r`\(d: y = ax + b\), \(d': y = a'x + b'\) (\(a, a' \ne 0\)): \(d \parallel d'\) khi \(a = a'\), \(b \ne b'\); \(d\) trùng \(d'\) khi \(a = a'\), \(b = b'\); \(d\) cắt \(d'\) khi \(a \ne a'\).`,
      properties: r`- \(a > 0\): góc tạo bởi đường thẳng \(y = ax + b\) và trục \(Ox\) là góc nhọn; \(a < 0\): góc đó là góc tù.
- Các đường thẳng có cùng hệ số góc tạo với trục \(Ox\) các góc bằng nhau.
- Hai đường thẳng có hệ số góc khác nhau và cùng hệ số \(b\) cắt nhau tại điểm \((0; b)\) trên trục tung.`,
      themes: [
        {
          title: 'Hệ số góc của đường thẳng',
          description: 'Xác định hệ số góc; liên hệ với góc tạo bởi đường thẳng và trục Ox.',
          types: [
            {
              slug: 'xac-dinh-he-so-goc',
              title: 'Xác định hệ số góc của đường thẳng',
              levels: [1, 2],
              knowledge: r`Đường thẳng \(y = ax + b\) (\(a \ne 0\)) có hệ số góc là \(a\).`,
              signs: 'Đề hỏi hệ số góc của đường thẳng cho bởi công thức (có thể chưa thu gọn), hoặc nhận xét góc tạo bởi đường thẳng và trục Ox.',
              method: r`Đưa về dạng \(y = ax + b\); hệ số của \(x\) là hệ số góc.`,
              steps: r`- **Bước 1.** Thu gọn công thức về dạng \(y = ax + b\).
- **Bước 2.** Đọc hệ số góc \(a\).
- **Bước 3.** (Nếu cần) xét dấu của \(a\) để biết góc tạo bởi đường thẳng và trục \(Ox\) là góc nhọn hay góc tù.`,
              mistakes: r`- Nhầm hệ số góc với hệ số \(b\).
- Với \(y = 3 - 2x\), cho rằng hệ số góc là 3.`,
              example: r`Tìm hệ số góc của các đường thẳng: a) \(y = 3 - 2x\); b) \(y = \dfrac{x + 4}{2}\); c) \(y = 5x\).`,
              solution: r`a) \(y = -2x + 3\): hệ số góc \(-2\). b) \(y = \dfrac12x + 2\): hệ số góc \(\dfrac12\). c) Hệ số góc 5.`,
              exercises: [
                mcq(1, r`Hệ số góc của đường thẳng \(y = 4 - 3x\) là`, [r`\(-3\)`, r`\(4\)`, r`\(3\)`, r`\(-4\)`], 'A', r`\(y = -3x + 4\) có hệ số góc \(-3\).`),
                sa(2, r`Đường thẳng \(y = \dfrac{2x - 1}{4}\) có hệ số góc bằng bao nhiêu?`, ['0,5', '1/2'], r`\(y = \dfrac12x - \dfrac14\), hệ số góc \(\dfrac12\).`),
                tf(2, r`Cho đường thẳng \(d: y = -2x + 1\). Mỗi khẳng định sau đúng hay sai?`, [
                  [r`Hệ số góc của \(d\) là \(-2\).`, true],
                  [r`Góc tạo bởi \(d\) và trục \(Ox\) là góc nhọn.`, false],
                  [r`\(d\) cắt trục tung tại điểm có tung độ bằng 1.`, true],
                  [r`\(d\) song song với đường thẳng \(y = 2x + 1\).`, false],
                ], r`a) Đúng. b) \(a = -2 < 0\) nên góc đó là góc tù: sai. c) Đúng. d) Hai hệ số góc \(-2\) và \(2\) khác nhau nên hai đường thẳng cắt nhau: sai.`),
              ],
            },
          ],
        },
        {
          title: 'Vị trí tương đối của hai đường thẳng',
          description: 'Song song, trùng nhau, cắt nhau; bài toán có tham số.',
          types: [
            {
              slug: 'song-song-cat-nhau',
              title: 'Nhận biết hai đường thẳng song song, cắt nhau',
              levels: [1, 2],
              knowledge: r`\(d: y = ax + b\), \(d': y = a'x + b'\) (\(a, a' \ne 0\)): song song \(\Leftrightarrow a = a',\ b \ne b'\); trùng nhau \(\Leftrightarrow a = a',\ b = b'\); cắt nhau \(\Leftrightarrow a \ne a'\).`,
              signs: 'Đề cho hai (hay nhiều) đường thẳng, hỏi vị trí tương đối; chọn các cặp đường thẳng song song; tìm giao điểm.',
              method: 'So sánh hệ số góc trước; nếu bằng nhau thì so sánh tiếp hệ số b. Giao điểm: giải phương trình hoành độ ax + b = a\'x + b\'.',
              steps: `- **Bước 1.** Đưa các đường thẳng về dạng y = ax + b.
- **Bước 2.** So sánh hai hệ số góc: khác nhau thì cắt nhau.
- **Bước 3.** Nếu hai hệ số góc bằng nhau: b khác nhau thì song song, b bằng nhau thì trùng nhau.`,
              mistakes: '- Chỉ so sánh hệ số b.\n- Kết luận song song khi hai hệ số góc bằng nhau mà quên kiểm tra b khác nhau.',
              example: r`Cho các đường thẳng \(d_1: y = 2x + 1\); \(d_2: y = 2x - 3\); \(d_3: y = -x + 1\); \(d_4: y = 1 + 2x\). Xét vị trí tương đối của các cặp đường thẳng.`,
              solution: r`\(d_1\) trùng \(d_4\) (cùng \(a = 2\), \(b = 1\)); \(d_1 \parallel d_2\) và \(d_2 \parallel d_4\) (\(a = 2\), \(b\) khác nhau); \(d_3\) cắt \(d_1\), \(d_2\), \(d_4\) (hệ số góc \(-1 \ne 2\)); \(d_3\) và \(d_1\) cắt nhau tại \((0; 1)\) trên trục tung.
[bieudo]
loai: dothi
ham so: 2x + 1; 2x - 3; -x + 1
x: -3; 3
y: -5; 5
[/bieudo]`,
              exercises: [
                mcq(1, r`Đường thẳng nào sau đây song song với đường thẳng \(y = 3x - 1\)?`, [r`\(y = 3x + 2\)`, r`\(y = -3x - 1\)`, r`\(y = x - 1\)`, r`\(y = \dfrac13x + 2\)`], 'A', r`Cùng hệ số góc 3 và \(2 \ne -1\).`),
                sa(2, r`Hai đường thẳng \(y = 2x + 3\) và \(y = -x + 6\) cắt nhau tại điểm có hoành độ bằng bao nhiêu?`, ['1'], r`\(2x + 3 = -x + 6 \Leftrightarrow 3x = 3 \Leftrightarrow x = 1\).`),
              ],
            },
            {
              slug: 'tim-tham-so-song-song-cat-nhau',
              title: 'Tìm tham số để hai đường thẳng song song hoặc cắt nhau',
              levels: [2, 3],
              knowledge: 'Điều kiện song song, trùng nhau, cắt nhau của hai đường thẳng; điều kiện để hàm số là hàm số bậc nhất (hệ số của x khác 0).',
              signs: 'Hệ số của đường thẳng chứa tham số m; đề yêu cầu tìm m để hai đường thẳng song song, trùng nhau hoặc cắt nhau.',
              method: 'Viết điều kiện về hệ số theo m (kèm điều kiện hệ số góc khác 0), giải và đối chiếu điều kiện.',
              steps: `- **Bước 1.** Viết điều kiện để các hàm số là hàm số bậc nhất (hệ số của x khác 0).
- **Bước 2.** Lập điều kiện: song song (a = a', b ≠ b'), trùng nhau (a = a', b = b'), cắt nhau (a ≠ a').
- **Bước 3.** Giải tìm m, đối chiếu điều kiện, kết luận.`,
              mistakes: '- Quên điều kiện b ≠ b\' khi tìm m để hai đường thẳng song song.\n- Quên điều kiện hệ số góc khác 0.',
              example: r`Cho \(d: y = (m + 1)x + 3\) (\(m \ne -1\)) và \(d': y = 2x - 1\). Tìm \(m\) để a) \(d \parallel d'\); b) \(d\) cắt \(d'\).`,
              solution: r`a) \(d \parallel d' \Leftrightarrow m + 1 = 2\) và \(3 \ne -1\), tức là \(m = 1\).
b) \(d\) cắt \(d' \Leftrightarrow m + 1 \ne 2 \Leftrightarrow m \ne 1\). Kết hợp điều kiện: \(m \ne 1\) và \(m \ne -1\).`,
              exercises: [
                sa(2, r`Tìm \(m\) để đường thẳng \(y = (2m - 1)x + 4\) song song với đường thẳng \(y = 3x + 1\).`, ['2'], r`\(2m - 1 = 3 \Leftrightarrow m = 2\); khi đó \(4 \ne 1\) nên hai đường thẳng song song.`),
                sa(3, r`Tìm \(m\) để hai đường thẳng \(y = 2x + m - 3\) và \(y = 2x + 5 - m\) trùng nhau.`, ['4'], r`Hai hệ số góc bằng nhau; trùng nhau khi \(m - 3 = 5 - m \Leftrightarrow m = 4\).`),
                mcq(3, r`Với giá trị nào của \(m\) thì hai đường thẳng \(y = (m - 2)x + 1\) và \(y = 3x + 1\) cắt nhau?`, [r`\(m \ne 5\) và \(m \ne 2\)`, r`\(m = 5\)`, r`\(m \ne 2\)`, r`\(m = 2\)`], 'A', r`Cần \(m - 2 \ne 0\) (hàm số bậc nhất) và \(m - 2 \ne 3\), tức là \(m \ne 2\) và \(m \ne 5\).`),
              ],
            },
          ],
        },
        {
          title: 'Xác định đường thẳng',
          description: 'Tìm hàm số bậc nhất từ hệ số góc, quan hệ song song, điểm thuộc đồ thị.',
          types: [
            {
              slug: 'tim-ham-so-bac-nhat',
              title: 'Tìm hàm số bậc nhất thỏa mãn yêu cầu',
              levels: [3, 4],
              knowledge: 'Hai đường thẳng song song có cùng hệ số góc; điểm thuộc đồ thị thì tọa độ thỏa mãn công thức; giao điểm với trục tung là (0; b).',
              signs: 'Đề yêu cầu xác định hàm số y = ax + b biết đồ thị song song với một đường thẳng và đi qua một điểm, có hệ số góc cho trước, hoặc đi qua hai điểm.',
              method: 'Dùng từng dữ kiện để lập điều kiện cho a, b: song song (hoặc hệ số góc) cho a; điểm thuộc đồ thị cho b.',
              steps: r`- **Bước 1.** Gọi hàm số cần tìm là \(y = ax + b\) (\(a \ne 0\)).
- **Bước 2.** Từ dữ kiện song song hoặc hệ số góc suy ra \(a\); thay tọa độ điểm để tìm \(b\) (kiểm tra \(b \ne b'\) nếu song song). Nếu biết hai điểm: thay cả hai rồi trừ vế theo vế để tìm \(a\).
- **Bước 3.** Viết hàm số.`,
              mistakes: '- Quên kiểm tra b ≠ b\' (đường thẳng tìm được trùng với đường thẳng đã cho).',
              example: r`Xác định hàm số \(y = ax + b\) biết đồ thị của nó song song với đường thẳng \(y = -2x + 5\) và đi qua điểm \(A(1; 1)\).`,
              solution: r`Song song nên \(a = -2\). Đi qua \(A(1; 1)\): \(1 = -2 + b \Leftrightarrow b = 3 \ne 5\) (thỏa mãn). Hàm số \(y = -2x + 3\).`,
              exercises: [
                sa(3, r`Hàm số \(y = ax + b\) có đồ thị song song với đường thẳng \(y = 3x\) và cắt trục tung tại điểm có tung độ bằng \(-2\). Tính \(a + b\).`, ['1'], r`\(a = 3\), \(b = -2\) nên \(a + b = 1\).`),
                sa(4, r`Đồ thị hàm số \(y = ax + b\) đi qua hai điểm \(A(1; 3)\) và \(B(-1; -1)\). Tìm \(a\).`, ['2'], r`\(3 = a + b\) và \(-1 = -a + b\). Trừ vế theo vế: \(4 = 2a \Leftrightarrow a = 2\) (khi đó \(b = 1\)).`),
                es(4, r`Xác định hàm số bậc nhất có đồ thị đi qua điểm \(M(1; 4)\) và cắt đường thẳng \(y = x - 1\) tại điểm có hoành độ bằng 3.`, r`Điểm thuộc đường thẳng \(y = x - 1\) có hoành độ 3 là \(N(3; 2)\). Đồ thị \(y = ax + b\) đi qua \(M\) và \(N\): \(4 = a + b\), \(2 = 3a + b\). Trừ vế theo vế: \(2a = -2 \Leftrightarrow a = -1\), \(b = 5\).
Hàm số cần tìm \(y = -x + 5\) (hệ số góc \(-1 \ne 1\) nên đồ thị đúng là cắt đường thẳng \(y = x - 1\)).`),
              ],
            },
          ],
        },
      ],
    },
  ],
};
