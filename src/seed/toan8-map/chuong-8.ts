import { mcq, r, sa, tf, type MapChapter } from './types';

/** Chương VIII. Mở đầu về tính xác suất của biến cố – Bài 30 đến Bài 32. */
export const CHUONG_8: MapChapter = {
  code: 'VIII',
  objectives: `- Nhận biết kết quả có thể, kết quả đồng khả năng và kết quả thuận lợi cho một biến cố trong trò chơi, thí nghiệm ngẫu nhiên đơn giản.
- Tính xác suất của biến cố bằng tỉ số giữa số kết quả thuận lợi và số kết quả có thể (khi các kết quả đồng khả năng).
- Nhận biết mối liên hệ giữa xác suất thực nghiệm và xác suất; dùng xác suất thực nghiệm ước lượng xác suất, dự đoán, ước lượng số lượng trong thực tế.`,
  keyPoints: r`- Kết quả có thể của một trò chơi, thí nghiệm; các kết quả đồng khả năng; kết quả thuận lợi cho biến cố \(E\).
- Khi các kết quả có thể đồng khả năng: \(P(E) = \dfrac{k}{n}\) (\(k\) kết quả thuận lợi, \(n\) kết quả có thể); \(0 \le P(E) \le 1\).
- Xác suất thực nghiệm của \(E\) sau \(n\) lần thử là \(\dfrac{m}{n}\) (\(m\) là số lần \(E\) xảy ra); khi \(n\) đủ lớn, xác suất thực nghiệm xấp xỉ \(P(E)\).`,
  formulas: r`\[P(E) = \dfrac{\text{số kết quả thuận lợi cho } E}{\text{số kết quả có thể}}\]
\[P(E) \approx \dfrac{m}{n}\ \ (n \text{ đủ lớn});\qquad \text{số lần } E \text{ xảy ra trong } N \text{ lần thử} \approx N\cdot P(E)\]`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 2 (VietJack) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-8a', objectives: 'Củng cố kết quả có thể, kết quả thuận lợi, tính xác suất bằng tỉ số và ước lượng xác suất bằng xác suất thực nghiệm.' },
    { slug: 'bai-tap-cuoi-chuong-8', objectives: 'Ôn tập toàn Chương VIII: xác suất của biến cố, xác suất thực nghiệm và ứng dụng; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 30 ----------------
    {
      slug: 'bai-30-ket-qua-co-the-va-ket-qua-thuan-loi',
      difficulty: 1,
      objectives: `- Nhận biết các kết quả có thể và các kết quả đồng khả năng của một trò chơi, thí nghiệm ngẫu nhiên.
- Nhận biết các kết quả thuận lợi cho một biến cố.`,
      prerequisites: '- Biến cố chắc chắn, biến cố không thể, biến cố ngẫu nhiên (Toán 7).\n- Xác suất thực nghiệm trong các ví dụ đơn giản (Toán 6).',
      concepts: 'Kết quả có thể; kết quả đồng khả năng; biến cố; kết quả thuận lợi cho biến cố.',
      properties: `- Các kết quả có thể là đồng khả năng khi chúng có khả năng xảy ra như nhau (đồng xu, xúc xắc cân đối; các thẻ, viên bi giống nhau về kích thước, khối lượng; vòng quay chia thành các phần bằng nhau).
- Kết quả thuận lợi cho biến cố E là kết quả có thể làm cho E xảy ra.
- Biến cố chắc chắn: mọi kết quả có thể đều thuận lợi; biến cố không thể: không có kết quả thuận lợi nào.`,
      themes: [
        {
          title: 'Kết quả có thể',
          description: 'Liệt kê, đếm kết quả có thể; nhận biết kết quả đồng khả năng.',
          types: [
            {
              slug: 'liet-ke-ket-qua-co-the',
              title: 'Liệt kê, đếm các kết quả có thể',
              levels: [1, 2],
              knowledge: 'Kết quả có thể là các kết quả có thể xảy ra khi thực hiện một trò chơi, thí nghiệm (hành động) ngẫu nhiên.',
              signs: 'Đề mô tả trò chơi, thí nghiệm (gieo xúc xắc, tung đồng xu, rút thẻ, lấy bóng, quay vòng quay) và hỏi các kết quả có thể.',
              method: 'Liệt kê có hệ thống tất cả các kết quả (theo thứ tự số, theo từng đối tượng), không bỏ sót, không lặp.',
              steps: `- **Bước 1.** Xác định hành động và đối tượng của kết quả (mặt xúc xắc, tấm thẻ, từng viên bi…).
- **Bước 2.** Liệt kê có thứ tự tất cả các kết quả.
- **Bước 3.** Đếm số kết quả có thể.`,
              mistakes: '- Coi các viên bi cùng màu là một kết quả khi đề yêu cầu xét từng viên bi.\n- Bỏ sót hoặc lặp kết quả khi liệt kê.',
              example: 'Một hộp có 10 tấm thẻ cùng loại, được đánh số 1; 2; …; 10. Rút ngẫu nhiên một tấm thẻ. Liệt kê các kết quả có thể và cho biết có bao nhiêu kết quả có thể.',
              solution: 'Các kết quả có thể: rút được thẻ số 1, thẻ số 2, …, thẻ số 10. Có 10 kết quả có thể; các thẻ cùng loại và được rút ngẫu nhiên nên các kết quả này đồng khả năng.',
              exercises: [
                mcq(1, 'Gieo một con xúc xắc 6 mặt cân đối. Số kết quả có thể là', ['6', '1', '3', '12'], 'A', 'Có 6 kết quả có thể: xuất hiện mặt 1, 2, 3, 4, 5, 6 chấm.'),
                sa(2, 'Một túi có 3 viên bi đỏ được đánh số 1, 2, 3 và 5 viên bi xanh được đánh số 4, 5, 6, 7, 8; các viên bi có cùng kích thước, khối lượng. Lấy ngẫu nhiên một viên bi. Có bao nhiêu kết quả có thể?', ['8'], 'Mỗi viên bi là một kết quả có thể: có 8 kết quả.'),
                sa(2, 'Tung một đồng xu cân đối hai lần liên tiếp. Có bao nhiêu kết quả có thể?', ['4'], 'Các kết quả có thể: SS, SN, NS, NN (S: sấp, N: ngửa). Có 4 kết quả.'),
              ],
            },
            {
              slug: 'nhan-biet-dong-kha-nang',
              title: 'Nhận biết các kết quả đồng khả năng',
              levels: [1, 2],
              knowledge: 'Các kết quả có thể là đồng khả năng nếu chúng có khả năng xảy ra như nhau.',
              signs: 'Đề hỏi các kết quả có thể có đồng khả năng không, hoặc cần kiểm tra điều kiện này trước khi tính xác suất bằng tỉ số.',
              method: 'Kiểm tra các đối tượng có cân đối, giống nhau về kích thước, khối lượng, được chọn ngẫu nhiên hay không.',
              steps: `- **Bước 1.** Xác định các kết quả có thể.
- **Bước 2.** Kiểm tra các yếu tố: đồ vật cân đối; thẻ, bóng giống nhau; vòng quay chia đều; chọn ngẫu nhiên.
- **Bước 3.** Kết luận các kết quả có đồng khả năng hay không.`,
              mistakes: '- Coi hai kết quả "lấy được bi đỏ" và "lấy được bi xanh" là đồng khả năng khi số bi mỗi màu khác nhau.',
              example: 'Một túi có 2 viên bi đỏ và 3 viên bi xanh có cùng kích thước, khối lượng. Lấy ngẫu nhiên một viên bi. a) Năm kết quả "lấy được viên bi thứ nhất, thứ hai, …, thứ năm" có đồng khả năng không? b) Hai kết quả "lấy được bi đỏ" và "lấy được bi xanh" có đồng khả năng không?',
              solution: 'a) Có, vì các viên bi giống nhau và được lấy ngẫu nhiên. b) Không: có 3 viên bi xanh nhưng chỉ có 2 viên bi đỏ nên khả năng lấy được bi xanh lớn hơn.',
              exercises: [
                mcq(1, 'Trong các thí nghiệm sau, thí nghiệm nào có các kết quả có thể đồng khả năng?', ['Gieo một con xúc xắc cân đối, quan sát số chấm', 'Quay một vòng quay chia thành 3 phần không bằng nhau', 'Lấy một viên bi từ túi có 1 bi đỏ, 4 bi xanh rồi xem màu', 'Gieo một con xúc xắc bị lệch tâm'], 'A', 'Xúc xắc cân đối nên 6 mặt có khả năng xuất hiện như nhau.'),
                tf(2, 'Một hộp có 4 quả bóng xanh và 4 quả bóng đỏ có cùng kích thước, khối lượng. Lấy ngẫu nhiên một quả bóng. Mỗi khẳng định sau đúng hay sai?', [
                  ['Có 8 kết quả có thể.', true],
                  ['Hai khả năng "lấy được bóng xanh" và "lấy được bóng đỏ" có khả năng xảy ra như nhau.', true],
                  ['Biến cố "lấy được bóng vàng" là biến cố chắc chắn.', false],
                  ['Có 4 kết quả thuận lợi cho biến cố "lấy được bóng đỏ".', true],
                ], 'a) Đúng (8 quả bóng). b) Đúng vì số bóng hai màu bằng nhau. c) Sai: đây là biến cố không thể. d) Đúng.'),
              ],
            },
          ],
        },
        {
          title: 'Kết quả thuận lợi cho biến cố',
          description: 'Xác định, đếm các kết quả thuận lợi.',
          types: [
            {
              slug: 'ket-qua-thuan-loi',
              title: 'Liệt kê, đếm các kết quả thuận lợi cho một biến cố',
              levels: [1, 2, 3],
              knowledge: 'Kết quả thuận lợi cho biến cố E là kết quả có thể làm cho E xảy ra.',
              signs: 'Đề cho thí nghiệm và một biến cố mô tả bằng lời ("số chấm là số chẵn", "thẻ ghi số nguyên tố"…), hỏi các kết quả thuận lợi.',
              method: 'Liệt kê các kết quả có thể, rồi chọn những kết quả thỏa mãn điều kiện của biến cố.',
              steps: `- **Bước 1.** Liệt kê các kết quả có thể.
- **Bước 2.** Kiểm tra từng kết quả có làm cho biến cố xảy ra hay không.
- **Bước 3.** Liệt kê, đếm các kết quả thuận lợi.`,
              mistakes: '- Hiểu sai điều kiện của biến cố: số nguyên tố có số 2, không có số 1; "không vượt quá 4" gồm cả số 4.',
              example: 'Gieo một con xúc xắc cân đối. Tìm các kết quả thuận lợi cho biến cố E: "Số chấm xuất hiện là số nguyên tố".',
              solution: 'Các kết quả có thể: mặt 1, 2, 3, 4, 5, 6 chấm. Các kết quả thuận lợi cho E: mặt 2, 3, 5 chấm (3 kết quả).',
              exercises: [
                sa(1, 'Rút ngẫu nhiên một tấm thẻ trong 20 tấm thẻ đánh số từ 1 đến 20. Có bao nhiêu kết quả thuận lợi cho biến cố "Số ghi trên thẻ chia hết cho 3"?', ['6'], 'Các số 3, 6, 9, 12, 15, 18: có 6 kết quả thuận lợi.'),
                mcq(2, 'Gieo một con xúc xắc cân đối. Các kết quả thuận lợi cho biến cố "Số chấm xuất hiện lớn hơn 4" là', ['mặt 5 chấm, mặt 6 chấm', 'mặt 4, 5, 6 chấm', 'mặt 1, 2, 3, 4 chấm', 'mặt 6 chấm'], 'A', 'Số chấm lớn hơn 4 là 5 và 6.'),
                sa(3, 'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Có bao nhiêu kết quả thuận lợi cho biến cố "Số được chọn có tổng các chữ số bằng 5"?', ['5'], 'Các số 14, 23, 32, 41, 50: có 5 kết quả thuận lợi.'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 31 ----------------
    {
      slug: 'bai-31-cach-tinh-xac-suat-cua-bien-co-bang-ti-so',
      difficulty: 2,
      objectives: `- Tính xác suất của một biến cố bằng tỉ số giữa số kết quả thuận lợi và số kết quả có thể, khi các kết quả có thể đồng khả năng.
- Vận dụng tính xác suất trong trò chơi, tình huống thực tế; tìm số lượng khi biết xác suất.`,
      prerequisites: '- Kết quả có thể, kết quả thuận lợi (Bài 30).\n- Phân số, tỉ số, tỉ số phần trăm (Toán 6).',
      concepts: r`Xác suất của biến cố \(E\), kí hiệu \(P(E)\).`,
      formulas: r`\(P(E) = \dfrac{\text{số kết quả thuận lợi cho } E}{\text{số kết quả có thể}}\) (các kết quả có thể đồng khả năng).`,
      properties: r`- \(0 \le P(E) \le 1\).
- Biến cố chắc chắn có xác suất bằng 1; biến cố không thể có xác suất bằng 0.`,
      themes: [
        {
          title: 'Tính xác suất bằng tỉ số',
          description: 'Tính xác suất trong trò chơi, thí nghiệm và tình huống thực tế.',
          types: [
            {
              slug: 'tinh-xac-suat-bien-co',
              title: 'Tính xác suất của một biến cố',
              levels: [1, 2, 3],
              knowledge: r`Khi các kết quả có thể đồng khả năng: \(P(E) = \dfrac{k}{n}\), \(k\) là số kết quả thuận lợi cho \(E\), \(n\) là số kết quả có thể.`,
              signs: 'Đề cho thí nghiệm có các kết quả đồng khả năng và một biến cố, yêu cầu tính xác suất.',
              method: 'Đếm số kết quả có thể và số kết quả thuận lợi, lập tỉ số và rút gọn.',
              steps: r`- **Bước 1.** Kiểm tra các kết quả đồng khả năng; đếm số kết quả có thể \(n\).
- **Bước 2.** Liệt kê, đếm số kết quả thuận lợi \(k\).
- **Bước 3.** Tính \(P(E) = \dfrac{k}{n}\) và rút gọn.`,
              mistakes: '- Lấy số kết quả không thuận lợi làm tử số.\n- Dùng tỉ số khi các kết quả không đồng khả năng (ví dụ chỉ đếm số màu bi).',
              example: 'Một hộp có 5 viên bi đỏ, 3 viên bi xanh và 2 viên bi vàng có cùng kích thước, khối lượng. Lấy ngẫu nhiên một viên bi. Tính xác suất của các biến cố A: "Lấy được viên bi màu đỏ" và B: "Lấy được viên bi không phải màu xanh".',
              solution: r`Có 10 kết quả có thể, đồng khả năng. Biến cố A có 5 kết quả thuận lợi: \(P(A) = \dfrac{5}{10} = \dfrac12\). Biến cố B có \(5 + 2 = 7\) kết quả thuận lợi: \(P(B) = \dfrac{7}{10}\).`,
              exercises: [
                mcq(1, 'Gieo một con xúc xắc cân đối. Xác suất của biến cố "Số chấm xuất hiện là số chẵn" là', [r`\(\dfrac12\)`, r`\(\dfrac13\)`, r`\(\dfrac16\)`, r`\(\dfrac23\)`], 'A', r`Có 3 kết quả thuận lợi (2, 4, 6) trong 6 kết quả: \(P = \dfrac36 = \dfrac12\).`),
                tf(2, 'Rút ngẫu nhiên một tấm thẻ từ 10 tấm thẻ cùng loại đánh số 1; 2; …; 10. Mỗi khẳng định sau đúng hay sai?', [
                  [r`Xác suất rút được thẻ số 7 là \(\dfrac{1}{10}\).`, true],
                  [r`Xác suất rút được thẻ ghi số lẻ là \(\dfrac12\).`, true],
                  [r`Xác suất rút được thẻ ghi số nguyên tố là \(\dfrac12\).`, false],
                  ['Xác suất rút được thẻ ghi số lớn hơn 10 là 1.', false],
                ], r`c) Các số nguyên tố 2, 3, 5, 7: xác suất \(\dfrac{4}{10} = \dfrac25\). d) Đây là biến cố không thể, xác suất bằng 0.`),
                sa(2, 'Một lớp có 40 học sinh, trong đó có 16 bạn nữ. Chọn ngẫu nhiên một học sinh để trực nhật. Tính xác suất chọn được một bạn nam.', ['0,6', '3/5'], r`Có 24 bạn nam: \(P = \dfrac{24}{40} = \dfrac35\).`),
                sa(3, 'Chọn ngẫu nhiên một số tự nhiên từ 1 đến 30. Tính xác suất để số được chọn chia hết cho cả 2 và 3 (viết dưới dạng phân số tối giản).', ['1/6'], r`Số chia hết cho cả 2 và 3 là số chia hết cho 6: 6, 12, 18, 24, 30. \(P = \dfrac{5}{30} = \dfrac16\).`),
              ],
            },
            {
              slug: 'xac-suat-tinh-huong-thuc-te',
              title: 'Xác suất trong tình huống thực tế',
              levels: [2, 3],
              knowledge: 'Công thức tính xác suất bằng tỉ số; đọc dữ liệu từ bảng, biểu đồ.',
              signs: 'Chọn ngẫu nhiên một người, sản phẩm, ngày… trong một nhóm được mô tả bằng lời, bảng số liệu hoặc biểu đồ.',
              method: 'Lấy tổng số đối tượng làm số kết quả có thể, đếm số đối tượng thỏa mãn biến cố, lập tỉ số.',
              steps: `- **Bước 1.** Xác định tổng số đối tượng (số kết quả có thể).
- **Bước 2.** Đếm các đối tượng thỏa mãn biến cố (đọc bảng, biểu đồ).
- **Bước 3.** Tính tỉ số và trả lời.`,
              mistakes: '- Đọc sai số liệu trên bảng, biểu đồ.\n- Lấy sai tổng số đối tượng.',
              example: r`Kết quả khảo sát môn thể thao yêu thích nhất của 40 học sinh lớp 8A:
| Môn | Bóng đá | Cầu lông | Bơi | Bóng rổ |
|---|---|---|---|---|
| Số học sinh | 15 | 10 | 9 | 6 |

Chọn ngẫu nhiên một học sinh của lớp. Tính xác suất học sinh đó thích cầu lông hoặc bơi nhất.`,
              solution: r`Có 40 kết quả có thể, đồng khả năng; số kết quả thuận lợi \(10 + 9 = 19\). Xác suất \(\dfrac{19}{40}\).`,
              exercises: [
                sa(2, 'Một hộp có 50 chiếc bút, trong đó có 2 chiếc bị hỏng. Lấy ngẫu nhiên một chiếc bút. Tính xác suất lấy được bút tốt.', ['0,96', '24/25'], r`\(P = \dfrac{48}{50} = 0{,}96\).`),
                sa(3, 'Một nhóm 25 học sinh có số bạn sinh vào mỗi quý như sau: Quý I: 5 bạn; Quý II: 8 bạn; Quý III: 7 bạn; Quý IV: 5 bạn. Chọn ngẫu nhiên một bạn. Tính xác suất bạn đó sinh vào sáu tháng đầu năm.', ['0,52', '13/25'], r`Sáu tháng đầu năm gồm quý I và quý II: \(5 + 8 = 13\) bạn. \(P = \dfrac{13}{25} = 0{,}52\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng xác suất',
          description: 'Tìm số lượng khi biết xác suất.',
          types: [
            {
              slug: 'tim-so-ket-qua-khi-biet-xac-suat',
              title: 'Tính số kết quả khi biết xác suất',
              levels: [3, 4],
              knowledge: r`\(P(E) = \dfrac{k}{n}\): biết \(P(E)\) và \(n\) thì \(k = n\cdot P(E)\); biết \(P(E)\) và \(k\) thì \(n = \dfrac{k}{P(E)}\).`,
              signs: 'Đề cho xác suất của một biến cố và yêu cầu tìm số viên bi, số học sinh, số tấm thẻ…',
              method: 'Gọi số cần tìm là x, biểu diễn số kết quả có thể và số kết quả thuận lợi theo x, lập phương trình rồi giải.',
              steps: `- **Bước 1.** Gọi ẩn (số bi, số thẻ…), biểu diễn số kết quả có thể và số kết quả thuận lợi theo ẩn.
- **Bước 2.** Lập phương trình: số kết quả thuận lợi : số kết quả có thể = xác suất đã cho.
- **Bước 3.** Giải, kiểm tra nghiệm là số tự nhiên, kết luận.`,
              mistakes: '- Quên rằng tổng số kết quả thay đổi khi thêm bi vào hộp.\n- Không kiểm tra nghiệm là số tự nhiên.',
              example: r`Một hộp có 6 viên bi đỏ và một số viên bi xanh có cùng kích thước, khối lượng. Lấy ngẫu nhiên một viên bi, xác suất lấy được viên bi đỏ là \(\dfrac25\). Hỏi trong hộp có bao nhiêu viên bi xanh?`,
              solution: r`Gọi số bi xanh là \(x\) (\(x\) là số tự nhiên). \(\dfrac{6}{6 + x} = \dfrac25 \Leftrightarrow 30 = 12 + 2x \Leftrightarrow x = 9\). Trong hộp có 9 viên bi xanh.`,
              exercises: [
                sa(3, r`Một lớp có 36 học sinh. Chọn ngẫu nhiên một học sinh, xác suất chọn được học sinh nữ là \(\dfrac49\). Lớp có bao nhiêu học sinh nữ?`, ['16'], r`Số học sinh nữ: \(36\cdot\dfrac49 = 16\).`, 'học sinh'),
                sa(3, 'Trong một hộp có 4 viên bi trắng và một số viên bi đen cùng loại. Xác suất lấy ngẫu nhiên được viên bi trắng là 0,2. Hỏi trong hộp có bao nhiêu viên bi đen?', ['16'], r`\(\dfrac{4}{4 + x} = 0{,}2 \Leftrightarrow 4 + x = 20 \Leftrightarrow x = 16\).`, 'viên'),
                sa(4, r`Một hộp có 5 viên bi đỏ và 7 viên bi xanh cùng loại. Cần thêm vào hộp bao nhiêu viên bi đỏ (cùng loại) để xác suất lấy ngẫu nhiên được một viên bi đỏ bằng \(\dfrac23\)?`, ['9'], r`\(\dfrac{5 + x}{12 + x} = \dfrac23 \Leftrightarrow 15 + 3x = 24 + 2x \Leftrightarrow x = 9\). (Kiểm tra: \(\dfrac{14}{21} = \dfrac23\).)`, 'viên'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 32 ----------------
    {
      slug: 'bai-32-moi-lien-he-giua-xac-suat-thuc-nghiem-voi-xac-suat-va-ung-dung',
      difficulty: 2,
      objectives: `- Nhận biết mối liên hệ giữa xác suất thực nghiệm của một biến cố với xác suất của biến cố đó.
- Dùng xác suất thực nghiệm để ước lượng xác suất; dùng xác suất để dự đoán số lần xảy ra, ước lượng số lượng trong thực tế.`,
      prerequisites: '- Xác suất thực nghiệm (Toán 6).\n- Tính xác suất bằng tỉ số (Bài 31).',
      concepts: 'Xác suất thực nghiệm; ước lượng xác suất bằng xác suất thực nghiệm; dự đoán, ước lượng số lượng.',
      formulas: r`Xác suất thực nghiệm của \(E\) sau \(n\) lần thử: \(\dfrac{m}{n}\) (\(m\) là số lần \(E\) xảy ra). Khi \(n\) đủ lớn: \(P(E) \approx \dfrac{m}{n}\).`,
      properties: '- Khi số lần thực hiện thí nghiệm càng lớn thì xác suất thực nghiệm của biến cố càng gần với xác suất của biến cố đó.\n- Số lần biến cố E xảy ra trong N lần thử xấp xỉ N·P(E).',
      themes: [
        {
          title: 'Xác suất thực nghiệm và xác suất',
          description: 'Tính xác suất thực nghiệm; ước lượng xác suất.',
          types: [
            {
              slug: 'xac-suat-thuc-nghiem-uoc-luong',
              title: 'Tính xác suất thực nghiệm, ước lượng xác suất',
              levels: [1, 2, 3],
              knowledge: r`Xác suất thực nghiệm của \(E\) \(=\) số lần \(E\) xảy ra \(:\) tổng số lần thử; khi số lần thử lớn, xác suất thực nghiệm xấp xỉ \(P(E)\).`,
              signs: 'Đề cho kết quả của nhiều lần thử (bảng thống kê, số liệu ghi chép), yêu cầu tính xác suất thực nghiệm hoặc ước lượng xác suất.',
              method: 'Đếm số lần biến cố xảy ra, chia cho tổng số lần thử; với số lần thử lớn dùng kết quả đó ước lượng xác suất.',
              steps: r`- **Bước 1.** Xác định tổng số lần thử \(n\).
- **Bước 2.** Đếm số lần biến cố xảy ra \(m\).
- **Bước 3.** Tính \(\dfrac{m}{n}\) và kết luận \(P(E) \approx \dfrac{m}{n}\).`,
              mistakes: '- Chia cho số lần biến cố không xảy ra.\n- Cho rằng với ít lần thử, xác suất thực nghiệm bằng đúng xác suất.',
              example: 'Gieo một con xúc xắc 200 lần, mặt 6 chấm xuất hiện 36 lần. Tính xác suất thực nghiệm của biến cố "Gieo được mặt 6 chấm" và so sánh với xác suất của biến cố đó.',
              solution: r`Xác suất thực nghiệm: \(\dfrac{36}{200} = 0{,}18\). Xác suất: \(\dfrac16 \approx 0{,}167\). Hai số khá gần nhau vì số lần gieo tương đối lớn.`,
              exercises: [
                sa(1, 'Tung một đồng xu 50 lần thấy có 22 lần xuất hiện mặt sấp. Tính xác suất thực nghiệm của biến cố "Xuất hiện mặt sấp".', ['0,44', '11/25'], r`\(\dfrac{22}{50} = 0{,}44\).`),
                mcq(2, 'Một cửa hàng ghi lại: trong 500 khách hàng có 120 người thanh toán bằng thẻ. Xác suất để một khách hàng của cửa hàng thanh toán bằng thẻ được ước lượng khoảng', ['0,24', '0,12', '0,5', '0,76'], 'A', r`\(\dfrac{120}{500} = 0{,}24\).`),
                tf(3, 'Gieo một con xúc xắc cân đối 600 lần. Mỗi khẳng định sau đúng hay sai?', [
                  [r`Xác suất của biến cố "Gieo được mặt 1 chấm" là \(\dfrac16\).`, true],
                  ['Mặt 1 chấm chắc chắn xuất hiện đúng 100 lần.', false],
                  ['Số lần xuất hiện mặt 1 chấm có thể ước lượng khoảng 100 lần.', true],
                  [r`Gieo càng nhiều lần thì xác suất thực nghiệm của biến cố "Gieo được mặt 1 chấm" càng gần \(\dfrac16\).`, true],
                ], r`b) Sai: \(600\cdot\dfrac16 = 100\) chỉ là số lần ước lượng, không chắc chắn. Các ý còn lại đúng.`),
              ],
            },
          ],
        },
        {
          title: 'Ứng dụng của xác suất',
          description: 'Dự đoán số lần xảy ra; ước lượng số lượng.',
          types: [
            {
              slug: 'du-doan-so-lan-xay-ra',
              title: 'Dùng xác suất để dự báo số lần xảy ra',
              legacy: ['Dùng xác suất để dự báo, ước lượng'],
              levels: [2, 3],
              knowledge: r`Trong \(N\) lần thử, số lần biến cố \(E\) xảy ra xấp xỉ \(N\cdot P(E)\).`,
              signs: 'Đề cho xác suất (hoặc tỉ lệ ước lượng từ số liệu cũ), hỏi trong N lần thử, N sản phẩm, N người có khoảng bao nhiêu lần biến cố xảy ra.',
              method: 'Nhân số lần thử (số đối tượng) với xác suất hoặc xác suất thực nghiệm.',
              steps: `- **Bước 1.** Xác định xác suất P(E) (tính bằng tỉ số hoặc ước lượng từ thực nghiệm).
- **Bước 2.** Tính N·P(E).
- **Bước 3.** Trả lời, dùng từ "khoảng", "ước tính".`,
              mistakes: '- Khẳng định số lần xảy ra chắc chắn bằng N·P(E).\n- Dùng nhầm xác suất của biến cố ngược lại.',
              example: 'Tỉ lệ sản phẩm lỗi của một nhà máy được ước lượng là 2%. Trong một lô 5 000 sản phẩm, ước tính có khoảng bao nhiêu sản phẩm lỗi?',
              solution: r`\(5000\cdot0{,}02 = 100\). Ước tính có khoảng 100 sản phẩm lỗi.`,
              exercises: [
                sa(2, 'Gieo một con xúc xắc cân đối 300 lần. Ước tính số lần xuất hiện mặt có số chấm là số chẵn.', ['150'], r`\(P = \dfrac12\), số lần ước tính \(300\cdot\dfrac12 = 150\).`, 'lần'),
                sa(3, 'Theo thống kê, trong 1 000 hạt giống của một loại cây có 920 hạt nảy mầm. Nếu gieo 5 000 hạt giống loại này thì ước tính có bao nhiêu hạt nảy mầm?', ['4600'], r`Xác suất nảy mầm ước lượng \(0{,}92\); \(5000\cdot0{,}92 = 4600\) hạt.`, 'hạt'),
              ],
            },
            {
              slug: 'uoc-luong-so-luong',
              title: 'Ước lượng số lượng phần tử của một tập hợp',
              levels: [3, 4],
              knowledge: 'Xác suất thực nghiệm xấp xỉ xác suất: tỉ lệ trong mẫu quan sát xấp xỉ tỉ lệ trong toàn bộ tập hợp.',
              signs: 'Đề yêu cầu ước lượng số cá trong hồ, số bi trong hộp… bằng cách đánh dấu, lấy mẫu, thử nhiều lần.',
              method: 'Gọi số cần ước lượng là x; viết xác suất theo x, cho xấp xỉ bằng xác suất thực nghiệm; giải tìm x.',
              steps: `- **Bước 1.** Gọi ẩn, viết xác suất của biến cố theo ẩn.
- **Bước 2.** Ước lượng xác suất đó bằng xác suất thực nghiệm, lập đẳng thức.
- **Bước 3.** Giải, làm tròn hợp lí, trả lời.`,
              mistakes: '- Lập tỉ lệ ngược.\n- Quên cộng số phần tử đã biết vào tổng số.',
              example: 'Để ước lượng số cá trong một hồ, người ta bắt 100 con, đánh dấu rồi thả lại xuống hồ. Sau một thời gian, bắt ngẫu nhiên 80 con thì thấy có 4 con có đánh dấu. Ước lượng số cá trong hồ.',
              solution: r`Gọi số cá trong hồ là \(x\). Xác suất bắt được cá có đánh dấu là \(\dfrac{100}{x}\), xác suất thực nghiệm là \(\dfrac{4}{80}\). \(\dfrac{100}{x} \approx \dfrac{4}{80}\) nên \(x \approx 2000\). Trong hồ có khoảng 2 000 con cá.`,
              exercises: [
                sa(3, 'Một hộp có 6 viên bi đỏ và một số viên bi xanh cùng loại. Lấy ngẫu nhiên một viên, xem màu rồi trả lại; lặp lại 200 lần thì có 40 lần lấy được bi đỏ. Ước lượng số bi xanh trong hộp.', ['24'], r`\(P(\text{đỏ}) \approx \dfrac{40}{200} = 0{,}2\). \(\dfrac{6}{6 + x} = 0{,}2 \Leftrightarrow x = 24\).`, 'viên'),
                sa(4, 'Người ta thả 200 con cá có đánh dấu vào một hồ. Sau đó bắt ngẫu nhiên 150 con thì thấy có 6 con có đánh dấu. Ước lượng tổng số cá trong hồ (kể cả số cá đã thả).', ['5000'], r`\(\dfrac{200}{x} \approx \dfrac{6}{150}\) nên \(x \approx \dfrac{200\cdot150}{6} = 5000\).`, 'con'),
              ],
            },
          ],
        },
      ],
    },
  ],
};
