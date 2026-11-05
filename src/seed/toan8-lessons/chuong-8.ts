/** Chương VIII. Mở đầu về tính xác suất của biến cố – nội dung bài học giai đoạn 3 (Bài 30 – Bài 32). */
import { ex, fc, r, th, type LessonContent } from './types';

const BAI_30: LessonContent = {
  slug: 'bai-30-ket-qua-co-the-va-ket-qua-thuan-loi',
  applications: r`- Liệt kê các khả năng trong trò chơi (tung đồng xu, gieo xúc xắc, rút thăm) để biết trò chơi có công bằng không.
- Liệt kê các trường hợp khi bốc thăm chia bảng, chọn ngẫu nhiên người trả lời.
- Là bước đầu tiên để tính xác suất của biến cố (Bài 31).`,
  theory: [
    th('concept', 'Phép thử và kết quả có thể', r`Một hoạt động mà ta không biết trước kết quả (gieo xúc xắc, tung đồng xu, rút thẻ ngẫu nhiên…) gọi là **phép thử ngẫu nhiên**. Mỗi khả năng có thể xảy ra là một **kết quả có thể**.`, undefined,
      r`Gieo một con xúc xắc có 6 kết quả có thể: 1; 2; 3; 4; 5; 6 chấm.`),
    th('definition', 'Kết quả đồng khả năng', r`Các kết quả có thể của một phép thử gọi là **đồng khả năng** nếu chúng có khả năng xảy ra như nhau (đồng xu, xúc xắc cân đối; các quả bóng giống hệt nhau chỉ khác số…).`),
    th('definition', 'Biến cố và kết quả thuận lợi', r`- **Biến cố** là một sự kiện liên quan đến kết quả của phép thử (ví dụ "số chấm là số chẵn").
- Một kết quả có thể làm cho biến cố \(E\) xảy ra gọi là **kết quả thuận lợi** cho \(E\).`, undefined,
      r`Gieo xúc xắc, biến cố "số chấm chẵn" có 3 kết quả thuận lợi: 2; 4; 6.`),
    th('special', 'Biến cố chắc chắn, biến cố không thể', r`- Biến cố **chắc chắn**: mọi kết quả có thể đều thuận lợi (gieo xúc xắc được số chấm nhỏ hơn 7).
- Biến cố **không thể**: không có kết quả thuận lợi nào (gieo xúc xắc được 7 chấm).`),
    th('rule', 'Liệt kê có hệ thống', r`Với phép thử gồm hai bước (tung hai đồng xu, gieo hai xúc xắc), lập **bảng** hoặc **sơ đồ cây** để không bỏ sót, không trùng lặp: bước thứ nhất có \(m\) khả năng, bước thứ hai có \(n\) khả năng thì có \(m\cdot n\) kết quả.`),
    th('note', 'Lưu ý', r`Muốn các kết quả đồng khả năng, hãy phân biệt từng đồ vật (đánh số các viên bi cùng màu) thay vì chỉ liệt kê theo màu.`),
  ],
  formulas: [
    {
      group: 'Đếm kết quả',
      items: [
        fc('Phép thử hai bước', r`\text{số kết quả} = m\cdot n`, r`- \(m\): số khả năng của bước thứ nhất
- \(n\): số khả năng của bước thứ hai`, r`Gieo hai xúc xắc: \(6\cdot6 = 36\) kết quả.`),
      ],
    },
  ],
  examples: {
    'liet-ke-ket-qua-co-the': [
      ex(1, r`Gieo một con xúc xắc cân đối. Liệt kê các kết quả có thể của phép thử.`,
        'Kết quả là số chấm xuất hiện trên mặt trên của xúc xắc.',
        'Kết quả có thể của phép thử.',
        [r`Xúc xắc có 6 mặt với số chấm từ 1 đến 6.`, r`Các kết quả có thể: 1; 2; 3; 4; 5; 6 chấm.`],
        'Có 6 kết quả có thể.'),
      ex(2, r`Tung đồng thời hai đồng xu cân đối. Liệt kê các kết quả có thể (S: sấp, N: ngửa).`,
        'Phép thử gồm hai đồng xu: liệt kê theo thứ tự đồng xu thứ nhất, đồng xu thứ hai.',
        'Liệt kê kết quả bằng bảng hoặc sơ đồ cây.',
        [r`Đồng xu thứ nhất có 2 khả năng (S, N); với mỗi khả năng, đồng xu thứ hai có 2 khả năng.`, r`Các kết quả: SS, SN, NS, NN.`],
        'Có 4 kết quả có thể: SS; SN; NS; NN.',
        'SN và NS là hai kết quả khác nhau – đừng gộp làm một.'),
    ],
    'nhan-biet-dong-kha-nang': [
      ex(1, r`Một hộp có 5 quả bóng cùng kích thước, khối lượng, được đánh số 1; 2; 3; 4; 5. Lấy ngẫu nhiên một quả. Các kết quả có thể có đồng khả năng không?`,
        'Các quả bóng giống hệt nhau trừ con số, lấy ngẫu nhiên.',
        'Kết quả đồng khả năng.',
        [r`Các kết quả có thể: lấy được bóng số 1; 2; 3; 4; 5.`, r`Các quả bóng như nhau và được lấy ngẫu nhiên nên mỗi quả có khả năng được lấy như nhau.`],
        'Năm kết quả là đồng khả năng.'),
      ex(2, r`Một hộp có 3 viên bi đỏ và 2 viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên. Hai kết quả "lấy được bi đỏ" và "lấy được bi xanh" có đồng khả năng không? Hãy liệt kê lại để được các kết quả đồng khả năng.`,
        'Số bi đỏ và bi xanh khác nhau nên khả năng lấy mỗi màu khác nhau.',
        'Kết quả đồng khả năng; cách đánh số để phân biệt đồ vật.',
        [r`Có 3 bi đỏ nhưng chỉ 2 bi xanh nên "lấy được bi đỏ" có khả năng xảy ra cao hơn: hai kết quả này không đồng khả năng.`, r`Đánh số các viên bi: Đ1, Đ2, Đ3, X1, X2. Khi đó có 5 kết quả đồng khả năng.`],
        'Không đồng khả năng; liệt kê theo từng viên bi được 5 kết quả đồng khả năng.'),
    ],
    'ket-qua-thuan-loi': [
      ex(1, r`Gieo một con xúc xắc cân đối. Liệt kê các kết quả thuận lợi cho biến cố \(A\): "Số chấm xuất hiện là số chẵn".`,
        'Chọn trong các kết quả có thể những kết quả làm \\(A\\) xảy ra.',
        'Kết quả thuận lợi cho biến cố.',
        [r`Các kết quả có thể: 1; 2; 3; 4; 5; 6.`, r`Số chẵn: 2; 4; 6.`],
        'Có 3 kết quả thuận lợi: 2; 4; 6.'),
      ex(2, r`Rút ngẫu nhiên một thẻ trong 20 thẻ được đánh số từ 1 đến 20. Liệt kê các kết quả thuận lợi cho biến cố \(B\): "Số trên thẻ chia hết cho 3" và biến cố \(C\): "Số trên thẻ là số nguyên tố".`,
        'Duyệt các số từ 1 đến 20 theo từng điều kiện.',
        'Kết quả thuận lợi; số nguyên tố; chia hết.',
        [r`\(B\): 3; 6; 9; 12; 15; 18 (6 kết quả).`, r`\(C\): 2; 3; 5; 7; 11; 13; 17; 19 (8 kết quả).`],
        r`\(B\) có 6 kết quả thuận lợi; \(C\) có 8 kết quả thuận lợi.`,
        'Số 1 không phải số nguyên tố.'),
      ex(3, r`Gieo đồng thời hai con xúc xắc cân đối. Có bao nhiêu kết quả có thể? Liệt kê các kết quả thuận lợi cho biến cố \(D\): "Tổng số chấm trên hai xúc xắc bằng 7".`,
        'Mỗi kết quả là một cặp (số chấm xúc xắc thứ nhất; số chấm xúc xắc thứ hai).',
        'Phép thử hai bước; kết quả thuận lợi.',
        [r`Số kết quả có thể: \(6\cdot6 = 36\).`, r`Các cặp có tổng 7: \((1; 6)\), \((2; 5)\), \((3; 4)\), \((4; 3)\), \((5; 2)\), \((6; 1)\).`],
        r`36 kết quả có thể; biến cố \(D\) có 6 kết quả thuận lợi.`,
        'Lập bảng 6 × 6, các ô có tổng bằng 7 nằm trên một đường chéo.'),
    ],
  },
  notes: {
    'liet-ke-ket-qua-co-the': 'Liệt kê theo thứ tự (bảng, sơ đồ cây) để không thiếu, không trùng; phép thử hai bước có \\(m\\cdot n\\) kết quả.',
    'nhan-biet-dong-kha-nang': 'Đồ vật giống nhau, chọn ngẫu nhiên thì đồng khả năng; số lượng mỗi loại khác nhau thì phải đánh số từng vật.',
    'ket-qua-thuan-loi': 'Đọc kĩ điều kiện của biến cố, duyệt hết các kết quả có thể và đếm lại.',
  },
};

const BAI_31: LessonContent = {
  slug: 'bai-31-cach-tinh-xac-suat-cua-bien-co-bang-ti-so',
  applications: r`- Đánh giá khả năng trúng thưởng, khả năng được chọn trong bốc thăm.
- Kiểm tra một trò chơi có công bằng hay không.
- Thiết kế vòng quay, hộp bốc thăm với xác suất trúng thưởng mong muốn.`,
  theory: [
    th('rule', 'Công thức tính xác suất', r`Khi các kết quả có thể của phép thử là **đồng khả năng**, xác suất của biến cố \(E\) bằng tỉ số giữa số kết quả thuận lợi cho \(E\) và tổng số kết quả có thể.`, r`P(E) = \dfrac{\text{số kết quả thuận lợi cho } E}{\text{số kết quả có thể}}`,
      r`Gieo xúc xắc, \(P(\text{số chấm chẵn}) = \dfrac36 = \dfrac12\).`),
    th('property', 'Giá trị của xác suất', r`- \(0 \le P(E) \le 1\).
- Biến cố chắc chắn có xác suất 1; biến cố không thể có xác suất 0.`),
    th('special', 'Biến cố "không xảy ra E"', r`Các kết quả không thuận lợi cho \(E\) là thuận lợi cho biến cố "\(E\) không xảy ra", nên xác suất của nó bằng \(1 - P(E)\).`, undefined,
      r`\(P(\text{lấy bi đỏ}) = \dfrac{5}{12}\) thì \(P(\text{không lấy bi đỏ}) = \dfrac{7}{12}\).`),
    th('condition', 'Điều kiện dùng công thức', r`Chỉ dùng công thức tỉ số khi các kết quả có thể **đồng khả năng**. Nếu chưa đồng khả năng, liệt kê lại (đánh số các đồ vật).`),
    th('note', 'Lưu ý', r`Các bước: (1) xác định phép thử, đếm số kết quả có thể; (2) đếm số kết quả thuận lợi; (3) lập tỉ số và rút gọn.`),
  ],
  formulas: [
    {
      group: 'Xác suất của biến cố',
      items: [
        fc('Xác suất bằng tỉ số', r`P(E) = \dfrac{k}{n}`, r`- \(k\): số kết quả thuận lợi cho \(E\)
- \(n\): số kết quả có thể (đồng khả năng)`, r`Hộp 12 bi có 5 bi đỏ: \(P(\text{đỏ}) = \dfrac{5}{12}\).`, 'Các kết quả có thể đồng khả năng.'),
        fc('Phạm vi của xác suất', r`0 \le P(E) \le 1`, r`- \(P = 0\): không thể; \(P = 1\): chắc chắn`, r`\(P(\text{gieo được 7 chấm}) = 0\).`),
        fc('Tìm số kết quả', r`k = P(E)\cdot n,\quad n = \dfrac{k}{P(E)}`, r`- \(k, n\): như trên`, r`5 bi đỏ, \(P(\text{đỏ}) = \dfrac13\) thì có \(15\) bi.`),
      ],
    },
  ],
  examples: {
    'tinh-xac-suat-bien-co': [
      ex(1, r`Gieo một con xúc xắc cân đối. Tính xác suất của biến cố "Mặt xuất hiện có 5 chấm".`,
        'Có 6 kết quả đồng khả năng, 1 kết quả thuận lợi.',
        'Công thức tính xác suất.',
        [r`Số kết quả có thể: 6; số kết quả thuận lợi: 1.`, r`\(P = \dfrac16\).`],
        r`\(\dfrac16\).`),
      ex(2, r`Một hộp có 12 viên bi cùng kích thước: 5 bi đỏ, 4 bi xanh, 3 bi vàng. Lấy ngẫu nhiên một viên. Tính xác suất của các biến cố: \(A\): "Lấy được bi đỏ"; \(B\): "Lấy được bi không phải màu vàng".`,
        '12 viên bi giống nhau trừ màu nên 12 kết quả đồng khả năng.',
        'Công thức tính xác suất.',
        [r`\(P(A) = \dfrac{5}{12}\).`, r`Bi không vàng gồm 5 đỏ và 4 xanh: 9 kết quả thuận lợi. \(P(B) = \dfrac{9}{12} = \dfrac34\).`],
        r`\(P(A) = \dfrac{5}{12}\); \(P(B) = \dfrac34\).`),
      ex(3, r`Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của các biến cố: \(C\): "Tổng số chấm bằng 7"; \(D\): "Hai mặt có số chấm bằng nhau".`,
        'Có 36 kết quả đồng khả năng (các cặp số chấm).',
        'Phép thử hai bước; công thức tính xác suất.',
        [r`Số kết quả có thể: \(6\cdot6 = 36\).`, r`\(C\): 6 kết quả \((1;6), (2;5), (3;4), (4;3), (5;2), (6;1)\), nên \(P(C) = \dfrac{6}{36} = \dfrac16\).`, r`\(D\): 6 kết quả \((1;1), (2;2), \dots, (6;6)\), nên \(P(D) = \dfrac16\).`],
        r`\(P(C) = P(D) = \dfrac16\).`),
    ],
    'xac-suat-tinh-huong-thuc-te': [
      ex(2, r`Lớp 8A có 40 học sinh, trong đó có 18 học sinh nam. Chọn ngẫu nhiên một bạn làm lớp trưởng. Tính xác suất bạn được chọn là học sinh nữ.`,
        'Mỗi học sinh có khả năng được chọn như nhau.',
        'Công thức tính xác suất.',
        [r`Số học sinh nữ: \(40 - 18 = 22\).`, r`\(P(\text{nữ}) = \dfrac{22}{40} = \dfrac{11}{20}\).`],
        r`\(\dfrac{11}{20}\).`),
      ex(3, r`Một vòng quay may mắn chia thành 12 ô bằng nhau: 1 ô "Giải nhất", 3 ô "Giải nhì", 4 ô "Giải ba", các ô còn lại ghi "Chúc may mắn". Quay một lần. Tính xác suất trúng một giải bất kì và xác suất không trúng giải.`,
        'Các ô bằng nhau nên 12 kết quả đồng khả năng; đếm số ô có giải.',
        'Công thức tính xác suất; biến cố không xảy ra.',
        [r`Số ô có giải: \(1 + 3 + 4 = 8\).`, r`\(P(\text{trúng giải}) = \dfrac{8}{12} = \dfrac23\).`, r`\(P(\text{không trúng}) = \dfrac{12 - 8}{12} = \dfrac13\).`],
        r`Trúng giải: \(\dfrac23\); không trúng: \(\dfrac13\).`,
        'Kiểm tra: tổng hai xác suất bằng 1.'),
    ],
    'tim-so-ket-qua-khi-biet-xac-suat': [
      ex(3, r`Một hộp có 5 viên bi đỏ và một số viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên, xác suất lấy được bi đỏ là \(\dfrac13\). Hỏi trong hộp có bao nhiêu viên bi xanh?`,
        'Từ xác suất và số kết quả thuận lợi suy ra tổng số kết quả.',
        r`\(P = \dfrac{k}{n} \Rightarrow n = \dfrac{k}{P}\).`,
        [r`Gọi tổng số bi là \(n\). \(\dfrac{5}{n} = \dfrac13\), nên \(n = 15\).`, r`Số bi xanh: \(15 - 5 = 10\).`],
        'Có 10 viên bi xanh.'),
      ex(4, r`Một túi có 4 viên bi trắng và một số viên bi đen cùng kích thước. Nếu bỏ thêm vào túi 2 viên bi trắng thì xác suất lấy ngẫu nhiên được bi trắng là \(\dfrac12\). Hỏi ban đầu trong túi có bao nhiêu viên bi đen, và khi đó xác suất lấy được bi trắng là bao nhiêu?`,
        'Gọi số bi đen là ẩn, lập phương trình từ xác suất sau khi thêm bi.',
        'Công thức tính xác suất; giải phương trình bậc nhất.',
        [r`Gọi số bi đen là \(x\) (\(x\) nguyên dương). Sau khi thêm: 6 bi trắng, tổng \(x + 6\) viên.`, r`\(\dfrac{6}{x + 6} = \dfrac12 \iff x + 6 = 12 \iff x = 6\).`, r`Ban đầu: \(P(\text{trắng}) = \dfrac{4}{4 + 6} = \dfrac25\).`],
        r`Ban đầu có 6 viên bi đen; xác suất lấy được bi trắng là \(\dfrac25\).`,
        'Bài toán xác suất có thể dẫn tới phương trình – nhớ đặt điều kiện cho ẩn.'),
    ],
  },
  notes: {
    'tinh-xac-suat-bien-co': 'Đếm đúng số kết quả có thể (đồng khả năng) và số kết quả thuận lợi; rút gọn tỉ số.',
    'xac-suat-tinh-huong-thuc-te': 'Xác định rõ phép thử và các kết quả đồng khả năng trong tình huống; tổng xác suất "xảy ra" và "không xảy ra" bằng 1.',
    'tim-so-ket-qua-khi-biet-xac-suat': 'Đặt ẩn cho số lượng chưa biết, lập phương trình từ công thức \\(P = \\dfrac{k}{n}\\), kiểm tra nghiệm nguyên dương.',
  },
};

const BAI_32: LessonContent = {
  slug: 'bai-32-moi-lien-he-giua-xac-suat-thuc-nghiem-voi-xac-suat-va-ung-dung',
  applications: r`- Ước lượng tỉ lệ sản phẩm lỗi, tỉ lệ nảy mầm của hạt giống, tỉ lệ ném trúng của vận động viên.
- Dự báo số lần xảy ra một sự kiện: số khách hàng, số trẻ sơ sinh là bé gái.
- Ước lượng số cá trong hồ, số chim trong vườn quốc gia bằng phương pháp bắt – thả – bắt lại.`,
  theory: [
    th('definition', 'Xác suất thực nghiệm', r`Thực hiện lặp lại một phép thử \(n\) lần, biến cố \(E\) xảy ra \(k\) lần. Tỉ số \(\dfrac{k}{n}\) gọi là **xác suất thực nghiệm** của \(E\).`, r`P_{\text{tn}}(E) = \dfrac{k}{n}`,
      r`Tung đồng xu 50 lần, ngửa 27 lần: xác suất thực nghiệm của "ngửa" là \(\dfrac{27}{50} = 0{,}54\).`),
    th('property', 'Mối liên hệ với xác suất', r`Khi số lần thử \(n\) càng lớn, xác suất thực nghiệm của \(E\) càng gần với xác suất của \(E\). Vì vậy, khi không tính được xác suất bằng lí thuyết, ta dùng xác suất thực nghiệm (với \(n\) đủ lớn) để **ước lượng** xác suất.`),
    th('rule', 'Dự đoán số lần xảy ra', r`Nếu biến cố \(E\) có xác suất (ước lượng) \(p\) thì khi thực hiện \(n\) lần phép thử, số lần \(E\) xảy ra khoảng \(n\cdot p\).`, r`\text{số lần} \approx n\cdot p`),
    th('rule', 'Ước lượng số lượng phần tử', r`Phương pháp bắt – đánh dấu – thả – bắt lại: đánh dấu \(m\) cá thể rồi thả lại; lần sau bắt \(n\) cá thể thấy \(k\) cá thể có dấu. Tỉ lệ có dấu trong mẫu xấp xỉ tỉ lệ trong cả quần thể \(N\):`, r`\dfrac{k}{n} \approx \dfrac{m}{N} \Rightarrow N \approx \dfrac{m\cdot n}{k}`),
    th('note', 'Lưu ý', r`Ước lượng và dự đoán chỉ là **gần đúng**; số lần thử càng nhiều, mẫu càng ngẫu nhiên thì kết quả càng đáng tin.`),
  ],
  formulas: [
    {
      group: 'Xác suất thực nghiệm và ứng dụng',
      items: [
        fc('Xác suất thực nghiệm', r`P_{\text{tn}}(E) = \dfrac{k}{n}`, r`- \(n\): số lần thử
- \(k\): số lần \(E\) xảy ra`, r`Ném rổ 40 lần trúng 26 lần: \(\dfrac{26}{40} = 0{,}65\).`),
        fc('Dự đoán số lần xảy ra', r`\text{số lần} \approx n\cdot p`, r`- \(n\): số lần thử dự kiến
- \(p\): xác suất (ước lượng) của biến cố`, r`\(p = 0{,}7\), giải 30 câu: khoảng 21 câu đúng.`),
        fc('Ước lượng số lượng (bắt – thả – bắt lại)', r`N \approx \dfrac{m\cdot n}{k}`, r`- \(m\): số cá thể đánh dấu
- \(n\): số cá thể bắt lần sau; \(k\): số có dấu trong đó`, r`\(m = 100\), \(n = 150\), \(k = 6\): \(N \approx 2500\).`),
      ],
    },
  ],
  examples: {
    'xac-suat-thuc-nghiem-uoc-luong': [
      ex(1, r`Tung một đồng xu 50 lần thấy có 27 lần xuất hiện mặt ngửa. Tính xác suất thực nghiệm của biến cố "Mặt ngửa xuất hiện".`,
        'Lấy số lần xảy ra chia tổng số lần tung.',
        'Xác suất thực nghiệm.',
        [r`\(n = 50\), \(k = 27\).`, r`\(P_{\text{tn}} = \dfrac{27}{50} = 0{,}54\).`],
        r`\(0{,}54\).`,
        'Xác suất lí thuyết là 0,5; số lần tung tăng lên thì xác suất thực nghiệm sẽ gần 0,5 hơn.'),
      ex(2, r`Bạn An tập ném bóng rổ 40 lần thì có 26 lần ném trúng. Tính xác suất thực nghiệm của biến cố "An ném trúng" và ước lượng khả năng An ném trúng ở lần ném tiếp theo.`,
        'Không tính được xác suất lí thuyết; dùng xác suất thực nghiệm để ước lượng.',
        'Xác suất thực nghiệm; ước lượng xác suất.',
        [r`\(P_{\text{tn}} = \dfrac{26}{40} = 0{,}65\).`, r`Có thể ước lượng xác suất An ném trúng ở lần tiếp theo khoảng \(0{,}65\).`],
        r`Khoảng \(0{,}65\) (tức 65%).`),
      ex(3, r`Một nhà máy kiểm tra ngẫu nhiên 500 sản phẩm thấy có 12 sản phẩm bị lỗi. Ước lượng xác suất một sản phẩm của nhà máy bị lỗi. Nhà máy cam kết tỉ lệ lỗi không vượt quá 2%; kết quả kiểm tra có phù hợp với cam kết không?`,
        'Ước lượng xác suất bằng xác suất thực nghiệm rồi so sánh với 2%.',
        'Xác suất thực nghiệm; tỉ lệ phần trăm.',
        [r`\(P_{\text{tn}} = \dfrac{12}{500} = 0{,}024 = 2{,}4\%\).`, r`\(2{,}4\% > 2\%\): tỉ lệ lỗi ước lượng cao hơn mức cam kết.`],
        'Xác suất lỗi khoảng 2,4%; kết quả kiểm tra chưa phù hợp với cam kết, cần kiểm tra thêm.',
        'Muốn kết luận chắc chắn hơn cần kiểm tra nhiều sản phẩm hơn.'),
    ],
    'du-doan-so-lan-xay-ra': [
      ex(2, r`Xác suất thực nghiệm để bạn Minh giải đúng một câu đố là 0,7. Nếu Minh giải 30 câu đố cùng loại, hãy dự đoán số câu Minh giải đúng.`,
        'Số lần xảy ra ≈ số lần thử × xác suất.',
        'Dự đoán số lần xảy ra của biến cố.',
        [r`Số câu đúng \(\approx 30\cdot0{,}7\).`, r`\(= 21\) (câu).`],
        'Khoảng 21 câu.'),
      ex(3, r`Thống kê 1000 trẻ sơ sinh ở một bệnh viện thấy có 512 bé trai. Hãy dự đoán trong 5000 trẻ sơ sinh tiếp theo có khoảng bao nhiêu bé gái.`,
        'Ước lượng xác suất sinh bé gái từ số liệu, rồi nhân với 5000.',
        'Xác suất thực nghiệm; dự đoán số lần xảy ra.',
        [r`Số bé gái trong 1000 trẻ: \(1000 - 512 = 488\).`, r`Xác suất (ước lượng) sinh bé gái: \(\dfrac{488}{1000} = 0{,}488\).`, r`Số bé gái dự đoán: \(5000\cdot0{,}488 = 2440\).`],
        'Khoảng 2440 bé gái.'),
    ],
    'uoc-luong-so-luong': [
      ex(3, r`Trong hộp có 50 viên bi trắng và một số viên bi đen cùng kích thước. Bạn Lan lấy ngẫu nhiên một viên, ghi màu rồi trả lại; lặp lại 100 lần thấy có 20 lần lấy được bi trắng. Ước lượng số bi đen trong hộp.`,
        'Xác suất thực nghiệm lấy được bi trắng xấp xỉ tỉ lệ bi trắng trong hộp.',
        'Xác suất thực nghiệm; ước lượng số lượng.',
        [r`Xác suất thực nghiệm lấy bi trắng: \(\dfrac{20}{100} = 0{,}2\).`, r`Gọi tổng số bi là \(N\): \(\dfrac{50}{N} \approx 0{,}2\), nên \(N \approx 250\).`, r`Số bi đen \(\approx 250 - 50 = 200\).`],
        'Khoảng 200 viên bi đen.'),
      ex(4, r`Để ước lượng số cá trong một hồ, người ta bắt 100 con, đánh dấu rồi thả lại hồ. Vài ngày sau, bắt ngẫu nhiên 150 con thì thấy có 6 con được đánh dấu. Ước lượng số cá trong hồ.`,
        'Tỉ lệ cá có dấu trong lần bắt sau xấp xỉ tỉ lệ cá có dấu trong cả hồ.',
        'Phương pháp bắt – đánh dấu – thả – bắt lại.',
        [r`Tỉ lệ cá có dấu trong mẫu: \(\dfrac{6}{150} = \dfrac{1}{25}\).`, r`Gọi số cá trong hồ là \(N\): \(\dfrac{100}{N} \approx \dfrac{1}{25}\).`, r`\(N \approx 2500\).`],
        'Hồ có khoảng 2500 con cá.',
        'Giả thiết: cá đánh dấu đã hòa trộn đều và số cá trong hồ không đổi giữa hai lần bắt.'),
    ],
  },
  notes: {
    'xac-suat-thuc-nghiem-uoc-luong': 'Xác suất thực nghiệm = số lần xảy ra : số lần thử; số lần thử lớn thì ước lượng đáng tin hơn.',
    'du-doan-so-lan-xay-ra': 'Số lần dự đoán ≈ số lần thử × xác suất; kết quả là số gần đúng.',
    'uoc-luong-so-luong': 'Lập tỉ lệ thức "tỉ lệ trong mẫu ≈ tỉ lệ trong tổng thể"; nêu rõ đây là ước lượng.',
  },
};

export const CHUONG_8: LessonContent[] = [BAI_30, BAI_31, BAI_32];
