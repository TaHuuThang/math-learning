/** Ngân hàng câu hỏi GĐ4 – Chương VIII. Mở đầu về tính xác suất của biến cố (Bài 30 – Bài 32). */
import { es, mc, r, sa, tf, type BankLesson } from './types';

const LK = 'liet-ke-ket-qua-co-the';
const DK = 'nhan-biet-dong-kha-nang';
const TL = 'ket-qua-thuan-loi';

const B30: BankLesson = {
  slug: 'bai-30-ket-qua-co-the-va-ket-qua-thuan-loi',
  questions: [
    mc(1, LK, 'Gieo một con xúc xắc. Số kết quả có thể của phép thử là', [r`\(6\)`, r`\(1\)`, r`\(3\)`, r`\(12\)`], 'Xúc xắc có 6 mặt: 1, 2, 3, 4, 5, 6 chấm.', [
      undefined,
      'Có nhiều kết quả có thể.',
      'Đó là số mặt chẵn hoặc lẻ.',
      'Đó là số kết quả khi gieo xúc xắc và tung đồng xu.',
    ]),
    mc(1, LK, 'Tung một đồng xu. Các kết quả có thể là', ['Sấp; Ngửa', 'Sấp', 'Ngửa; Ngửa', 'Sấp; Ngửa; Đứng'], 'Đồng xu có hai mặt: sấp (S) và ngửa (N).', [
      undefined,
      'Còn kết quả Ngửa.',
      'Liệt kê trùng, thiếu Sấp.',
      'Đồng xu không có kết quả "đứng".',
    ]),
    mc(2, LK, 'Tung đồng thời hai đồng xu. Số kết quả có thể là', [r`\(4\)`, r`\(2\)`, r`\(3\)`, r`\(8\)`], 'Các kết quả: SS, SN, NS, NN.', [
      undefined,
      'Đó là số kết quả khi tung một đồng xu.',
      'Gộp nhầm SN và NS thành một.',
      'Đó là số kết quả khi tung ba đồng xu.',
    ]),
    mc(2, LK, 'Gieo đồng thời hai con xúc xắc. Số kết quả có thể là', [r`\(36\)`, r`\(12\)`, r`\(6\)`, r`\(21\)`], r`Mỗi xúc xắc có 6 khả năng: \(6\cdot6 = 36\).`, [
      undefined,
      'Cộng thay vì nhân.',
      'Đó là số kết quả khi gieo một xúc xắc.',
      'Coi các cặp như (1; 2) và (2; 1) là một.',
    ]),
    mc(2, LK, 'Hộp có 3 thẻ ghi số 1, 2, 3. Rút lần lượt hai thẻ (không trả lại) và ghi số theo thứ tự rút. Số kết quả có thể là', [r`\(6\)`, r`\(9\)`, r`\(3\)`, r`\(5\)`], r`Lần đầu 3 khả năng, lần sau còn 2: \(3\cdot2 = 6\) (12, 13, 21, 23, 31, 32).`, [
      undefined,
      'Không trả lại thẻ nên không có 11, 22, 33.',
      'Bỏ qua thứ tự rút.',
      'Đếm thiếu.',
    ]),
    mc(1, DK, 'Phép thử nào sau đây có các kết quả có thể đồng khả năng?', ['Gieo một con xúc xắc cân đối', 'Gieo một con xúc xắc bị lệch tâm', 'Lấy một viên bi trong hộp có 5 bi đỏ và 1 bi xanh rồi ghi màu', 'Quay một vòng quay chia thành các ô không bằng nhau'], 'Xúc xắc cân đối thì mỗi mặt có khả năng xuất hiện như nhau.', [
      undefined,
      'Xúc xắc lệch thì có mặt dễ xuất hiện hơn.',
      'Màu đỏ có khả năng cao hơn.',
      'Ô lớn có khả năng cao hơn.',
    ]),
    mc(2, DK, 'Hộp có 4 viên bi đỏ và 1 viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên và ghi màu. Hai kết quả "lấy được bi đỏ" và "lấy được bi xanh"', ['không đồng khả năng vì số bi đỏ nhiều hơn', 'đồng khả năng vì chỉ có hai màu', 'đồng khả năng vì lấy ngẫu nhiên', 'không xác định được'], 'Có 4 bi đỏ nhưng chỉ 1 bi xanh nên khả năng lấy được bi đỏ lớn hơn.', [
      undefined,
      'Số màu không quyết định đồng khả năng.',
      'Lấy ngẫu nhiên từng viên mới đồng khả năng, không phải từng màu.',
      'Xác định được.',
    ]),
    mc(1, TL, 'Gieo một con xúc xắc. Số kết quả thuận lợi cho biến cố "số chấm xuất hiện là số lẻ" là', [r`\(3\)`, r`\(2\)`, r`\(6\)`, r`\(1\)`], 'Các kết quả thuận lợi: 1, 3, 5.', [
      undefined,
      'Đếm thiếu.',
      'Đó là số kết quả có thể.',
      'Đếm thiếu.',
    ]),
    mc(2, TL, 'Rút ngẫu nhiên một thẻ trong 15 thẻ đánh số từ 1 đến 15. Số kết quả thuận lợi cho biến cố "số trên thẻ chia hết cho 4" là', [r`\(3\)`, r`\(4\)`, r`\(2\)`, r`\(5\)`], 'Các số 4, 8, 12.', [
      undefined,
      '16 không có trong các thẻ.',
      'Đếm thiếu.',
      'Đếm thừa.',
    ]),
    mc(2, TL, 'Gieo một con xúc xắc. Số kết quả thuận lợi cho biến cố "số chấm là số nguyên tố" là', [r`\(3\)`, r`\(4\)`, r`\(2\)`, r`\(5\)`], 'Các số nguyên tố: 2, 3, 5.', [
      undefined,
      'Số 1 không phải số nguyên tố.',
      'Thiếu số 2 (số nguyên tố chẵn duy nhất).',
      'Đếm thừa.',
    ]),
    mc(3, TL, 'Gieo đồng thời hai con xúc xắc. Số kết quả thuận lợi cho biến cố "tổng số chấm bằng 5" là', [r`\(4\)`, r`\(2\)`, r`\(5\)`, r`\(6\)`], 'Các cặp: (1; 4), (2; 3), (3; 2), (4; 1).', [
      undefined,
      'Bỏ qua thứ tự hai xúc xắc.',
      'Đếm thừa.',
      'Đó là số kết quả có tổng bằng 7.',
    ]),
    mc(3, TL, 'Tung đồng thời hai đồng xu. Số kết quả thuận lợi cho biến cố "có ít nhất một mặt ngửa" là', [r`\(3\)`, r`\(1\)`, r`\(2\)`, r`\(4\)`], 'Các kết quả SN, NS, NN.', [
      undefined,
      'Đó là "cả hai mặt ngửa".',
      'Đó là "đúng một mặt ngửa".',
      'SS không thuận lợi.',
    ]),
    mc(3, TL, 'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Số kết quả thuận lợi cho biến cố "số được chọn chia hết cho 10" là', [r`\(9\)`, r`\(10\)`, r`\(90\)`, r`\(8\)`], 'Các số 10, 20, …, 90.', [
      undefined,
      '100 không phải số có hai chữ số.',
      'Đó là số kết quả có thể.',
      'Đếm thiếu.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, LK, 'Gieo một con xúc xắc cân đối.', [
      ['Có 6 kết quả có thể.', true, 'Sáu mặt.'],
      ['"7 chấm" là một kết quả có thể.', false, 'Xúc xắc có nhiều nhất 6 chấm.'],
      ['Các kết quả có thể là đồng khả năng.', true, 'Xúc xắc cân đối.'],
      ['"1 chấm" là một kết quả có thể.', true, 'Một mặt của xúc xắc.'],
    ]),
    tf(2, LK, 'Tung đồng thời hai đồng xu.', [
      ['SN và NS là hai kết quả khác nhau.', true, 'Phân biệt đồng xu thứ nhất và thứ hai.'],
      ['Có 4 kết quả có thể.', true, 'SS, SN, NS, NN.'],
      ['Có 3 kết quả có thể.', false, 'Không được gộp SN và NS.'],
      ['NN là một kết quả có thể.', true, 'Cả hai mặt ngửa.'],
    ]),
    tf(2, LK, 'Hộp có 2 bi đỏ (Đ1, Đ2) và 1 bi xanh (X) cùng kích thước.', [
      ['Lấy một viên, liệt kê theo từng viên có 3 kết quả có thể.', true, 'Đ1, Đ2, X.'],
      ['Lấy cùng lúc hai viên có 3 kết quả có thể.', true, 'Đ1Đ2, Đ1X, Đ2X.'],
      ['Lấy một viên, hai kết quả "đỏ" và "xanh" đồng khả năng.', false, 'Có 2 bi đỏ, 1 bi xanh.'],
      ['Liệt kê theo từng viên thì các kết quả đồng khả năng.', true, 'Các viên bi như nhau.'],
    ]),
    tf(1, DK, 'Xét tính đồng khả năng:', [
      ['Tung đồng xu cân đối: hai mặt S, N đồng khả năng.', true, 'Đồng xu cân đối.'],
      ['Gieo xúc xắc cân đối: sáu mặt đồng khả năng.', true, 'Xúc xắc cân đối.'],
      ['Vòng quay chia 4 ô không bằng nhau: 4 kết quả đồng khả năng.', false, 'Ô lớn dễ dừng hơn.'],
      ['Rút ngẫu nhiên một trong 10 thẻ giống nhau: các kết quả đồng khả năng.', true, 'Các thẻ như nhau.'],
    ]),
    tf(2, DK, 'Lớp có 20 bạn nam và 15 bạn nữ. Chọn ngẫu nhiên một bạn.', [
      ['Mỗi bạn có khả năng được chọn như nhau.', true, 'Chọn ngẫu nhiên.'],
      ['Có 35 kết quả có thể (theo từng bạn).', true, r`\(20 + 15\).`],
      ['"Chọn được nam" và "chọn được nữ" đồng khả năng.', false, 'Số nam nhiều hơn số nữ.'],
      ['Khả năng chọn được bạn nam lớn hơn.', true, '20 > 15.'],
    ]),
    tf(1, TL, 'Gieo một con xúc xắc; xét biến cố "số chấm lớn hơn 4".', [
      ['Các kết quả thuận lợi là 5 và 6.', true, 'Lớn hơn 4.'],
      ['Có 2 kết quả thuận lợi.', true, '5 và 6.'],
      ['4 là kết quả thuận lợi.', false, '4 không lớn hơn 4.'],
      ['6 là kết quả thuận lợi.', true, '6 > 4.'],
    ]),
    tf(2, TL, 'Rút một thẻ trong 20 thẻ đánh số từ 1 đến 20; xét biến cố "số trên thẻ là số chính phương".', [
      ['Các kết quả thuận lợi là 1, 4, 9, 16.', true, 'Bình phương của 1, 2, 3, 4.'],
      ['Có 4 kết quả thuận lợi.', true, 'Bốn số 1, 4, 9, 16.'],
      ['25 là kết quả thuận lợi.', false, 'Không có thẻ số 25.'],
      ['20 không phải kết quả thuận lợi.', true, '20 không là số chính phương.'],
    ]),
    tf(3, TL, 'Gieo đồng thời hai con xúc xắc.', [
      ['Biến cố "tổng bằng 2" có 1 kết quả thuận lợi.', true, '(1; 1).'],
      ['Biến cố "tổng bằng 12" có 1 kết quả thuận lợi.', true, '(6; 6).'],
      ['Biến cố "tổng bằng 7" có 6 kết quả thuận lợi.', true, '(1;6), (2;5), (3;4), (4;3), (5;2), (6;1).'],
      ['Biến cố "tổng bằng 1" có 1 kết quả thuận lợi.', false, 'Tổng nhỏ nhất là 2: biến cố không thể.'],
    ]),
    tf(3, TL, 'Xét các biến cố khi gieo một con xúc xắc.', [
      ['"Số chấm không vượt quá 6" là biến cố chắc chắn.', true, 'Mọi kết quả đều thuận lợi.'],
      ['"Số chấm bằng 0" là biến cố không thể.', true, 'Không có kết quả thuận lợi.'],
      ['Biến cố không thể có ít nhất một kết quả thuận lợi.', false, 'Không có kết quả thuận lợi nào.'],
      ['Mọi kết quả có thể đều thuận lợi cho biến cố chắc chắn.', true, 'Định nghĩa.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, LK, 'Gieo một con xúc xắc và tung một đồng xu. Có bao nhiêu kết quả có thể?', '12', r`\(6\cdot2 = 12\) kết quả.`),
    sa(2, LK, 'Từ 4 bạn An, Bình, Chi, Dũng chọn một bạn làm lớp trưởng và một bạn khác làm lớp phó. Có bao nhiêu kết quả có thể?', '12', r`Lớp trưởng 4 cách, lớp phó còn 3 cách: \(4\cdot3 = 12\).`),
    sa(2, TL, 'Rút một thẻ trong 30 thẻ đánh số từ 1 đến 30. Có bao nhiêu kết quả thuận lợi cho biến cố "số trên thẻ chia hết cho cả 3 và 5"?', '2', 'Chia hết cho cả 3 và 5 là chia hết cho 15: các số 15, 30.'),
    sa(2, TL, 'Gieo một con xúc xắc. Có bao nhiêu kết quả thuận lợi cho biến cố "số chấm là ước của 6"?', '4', 'Các ước của 6 là 1, 2, 3, 6.'),
    sa(3, TL, 'Gieo đồng thời hai con xúc xắc. Có bao nhiêu kết quả thuận lợi cho biến cố "hai mặt có số chấm bằng nhau"?', '6', '(1;1), (2;2), (3;3), (4;4), (5;5), (6;6).'),
    sa(3, TL, 'Tung đồng thời ba đồng xu. Có bao nhiêu kết quả thuận lợi cho biến cố "có đúng hai mặt ngửa"?', '3', 'Có 8 kết quả có thể; thuận lợi: NNS, NSN, SNN.'),
    // ---- Tự luận ----
    es(2, LK, 'Tung một đồng xu và gieo một con xúc xắc. Liệt kê tất cả các kết quả có thể của phép thử.', r`Có \(2\cdot6 = 12\) kết quả: S1, S2, S3, S4, S5, S6, N1, N2, N3, N4, N5, N6 (chữ chỉ mặt đồng xu, số chỉ số chấm xúc xắc).`, r`0,5 điểm: liệt kê có hệ thống, không thiếu.
0,5 điểm: đếm đúng 12 kết quả.`),
    es(2, DK, 'Hộp có 3 viên bi đỏ và 2 viên bi vàng cùng kích thước. Lấy ngẫu nhiên một viên.\na) Hai kết quả "lấy được bi đỏ" và "lấy được bi vàng" có đồng khả năng không? Vì sao?\nb) Liệt kê các kết quả có thể sao cho chúng đồng khả năng.', r`a) Không, vì số bi đỏ (3) nhiều hơn số bi vàng (2) nên lấy được bi đỏ dễ hơn.
b) Đánh số các viên bi: Đ1, Đ2, Đ3, V1, V2. Có 5 kết quả đồng khả năng.`, r`0,5 điểm: câu a có giải thích.
0,5 điểm: câu b đánh số và liệt kê đúng.`),
    es(2, TL, 'Rút ngẫu nhiên một thẻ trong 12 thẻ đánh số từ 1 đến 12. Liệt kê các kết quả thuận lợi cho mỗi biến cố:\nA: "Số trên thẻ là số chẵn"; B: "Số trên thẻ chia hết cho 3"; C: "Số trên thẻ lớn hơn 12".', r`A: 2, 4, 6, 8, 10, 12 (6 kết quả).
B: 3, 6, 9, 12 (4 kết quả).
C: không có kết quả thuận lợi (biến cố không thể).`, r`0,5 điểm: liệt kê đúng A và B.
0,5 điểm: nhận ra C là biến cố không thể.`),
    es(3, TL, 'Gieo đồng thời hai con xúc xắc. Có bao nhiêu kết quả thuận lợi cho biến cố "tổng số chấm chia hết cho 5"? Liệt kê các kết quả đó.', r`Tổng chia hết cho 5 là tổng bằng 5 hoặc 10.
Tổng 5: (1;4), (2;3), (3;2), (4;1). Tổng 10: (4;6), (5;5), (6;4).
Có 7 kết quả thuận lợi.`, r`0,5 điểm: xác định đúng tổng 5 và 10.
0,5 điểm: liệt kê và đếm đúng 7 kết quả.`),
    es(3, TL, 'Hai bạn An và Bình chơi oẳn tù tì (mỗi bạn chọn một trong ba: búa, kéo, bao). Hãy cho biết:\na) Số kết quả có thể.\nb) Số kết quả thuận lợi cho biến cố "An thắng" và cho biến cố "Hai bạn hòa".', r`a) Mỗi bạn có 3 cách chọn: \(3\cdot3 = 9\) kết quả.
b) An thắng: (búa; kéo), (kéo; bao), (bao; búa): 3 kết quả. Hòa: hai bạn chọn giống nhau: 3 kết quả.`, r`0,5 điểm: câu a.
0,5 điểm: câu b, liệt kê đúng hai biến cố.`),
  ],
};

const TX = 'tinh-xac-suat-bien-co';
const TH = 'xac-suat-tinh-huong-thuc-te';
const TK = 'tim-so-ket-qua-khi-biet-xac-suat';

const B31: BankLesson = {
  slug: 'bai-31-cach-tinh-xac-suat-cua-bien-co-bang-ti-so',
  questions: [
    mc(1, TX, r`Khi các kết quả có thể đồng khả năng, xác suất của biến cố \(E\) bằng`, ['số kết quả thuận lợi cho E chia cho số kết quả có thể', 'số kết quả có thể chia cho số kết quả thuận lợi cho E', 'số kết quả thuận lợi trừ số kết quả có thể', 'số kết quả thuận lợi nhân số kết quả có thể'], 'Công thức tính xác suất bằng tỉ số.', [
      undefined,
      'Đảo ngược tỉ số.',
      'Không phải phép trừ.',
      'Không phải phép nhân.',
    ]),
    mc(1, TX, 'Gieo một con xúc xắc cân đối. Xác suất xuất hiện mặt 6 chấm là', [r`\(\dfrac16\)`, r`\(\dfrac12\)`, r`\(6\)`, r`\(\dfrac13\)`], r`1 kết quả thuận lợi trong 6 kết quả có thể.`, [
      undefined,
      'Đó là xác suất mặt chẵn.',
      'Xác suất không lớn hơn 1.',
      'Đếm sai.',
    ]),
    mc(1, TX, 'Tung một đồng xu cân đối. Xác suất xuất hiện mặt ngửa là', [r`\(\dfrac12\)`, r`\(1\)`, r`\(0\)`, r`\(2\)`], r`1 kết quả thuận lợi trong 2 kết quả.`, [
      undefined,
      'Đó là biến cố chắc chắn.',
      'Đó là biến cố không thể.',
      'Xác suất không lớn hơn 1.',
    ]),
    mc(2, TX, 'Gieo một con xúc xắc cân đối. Xác suất của biến cố "số chấm chia hết cho 3" là', [r`\(\dfrac13\)`, r`\(\dfrac12\)`, r`\(\dfrac16\)`, r`\(\dfrac23\)`], r`Thuận lợi: 3, 6. \(P = \dfrac26 = \dfrac13\).`, [
      undefined,
      'Đếm sai số kết quả thuận lợi.',
      'Chỉ đếm một kết quả.',
      'Đó là xác suất biến cố đối.',
    ]),
    mc(2, TX, 'Hộp có 3 bi đỏ, 5 bi xanh, 2 bi vàng cùng kích thước. Lấy ngẫu nhiên một viên. Xác suất lấy được bi xanh là', [r`\(\dfrac12\)`, r`\(\dfrac52\)`, r`\(\dfrac15\)`, r`\(\dfrac{3}{10}\)`], r`\(P = \dfrac{5}{10} = \dfrac12\).`, [
      undefined,
      'Chia cho số bi vàng.',
      'Nhầm 1 trong 5 bi xanh.',
      'Đó là xác suất lấy được bi đỏ.',
    ]),
    mc(2, TX, r`Với mọi biến cố \(E\), xác suất \(P(E)\) luôn thỏa mãn`, [r`\(0 \le P(E) \le 1\)`, r`\(P(E) > 1\)`, r`\(P(E) < 0\)`, r`\(P(E) = 1\)`], 'Số kết quả thuận lợi không vượt quá số kết quả có thể.', [
      undefined,
      'Không thể lớn hơn 1.',
      'Không thể âm.',
      'Chỉ biến cố chắc chắn mới có xác suất 1.',
    ]),
    mc(3, TX, 'Gieo đồng thời hai con xúc xắc cân đối. Xác suất để tổng số chấm bằng 8 là', [r`\(\dfrac{5}{36}\)`, r`\(\dfrac16\)`, r`\(\dfrac18\)`, r`\(\dfrac19\)`], r`Thuận lợi: (2;6), (3;5), (4;4), (5;3), (6;2). \(P = \dfrac{5}{36}\).`, [
      undefined,
      'Đó là xác suất tổng bằng 7.',
      'Nhầm tổng 8 với số kết quả.',
      'Đó là xác suất tổng bằng 9.',
    ]),
    mc(3, TX, 'Tung đồng thời hai đồng xu cân đối. Xác suất để hai mặt giống nhau là', [r`\(\dfrac12\)`, r`\(\dfrac14\)`, r`\(\dfrac13\)`, r`\(\dfrac34\)`], r`Thuận lợi: SS, NN. \(P = \dfrac24 = \dfrac12\).`, [
      undefined,
      'Chỉ đếm một kết quả.',
      'Gộp SN và NS nên chỉ có 3 kết quả.',
      'Đếm thừa.',
    ]),
    mc(2, TH, 'Lớp 8A có 36 học sinh, trong đó có 16 bạn nữ. Chọn ngẫu nhiên một bạn. Xác suất chọn được bạn nam là', [r`\(\dfrac59\)`, r`\(\dfrac49\)`, r`\(\dfrac{20}{16}\)`, r`\(\dfrac12\)`], r`Có 20 bạn nam: \(P = \dfrac{20}{36} = \dfrac59\).`, [
      undefined,
      'Đó là xác suất chọn bạn nữ.',
      'Chia cho số bạn nữ.',
      'Số nam và nữ khác nhau.',
    ]),
    mc(3, TH, 'Một vòng quay chia thành 8 ô bằng nhau: 1 ô "100 điểm", 2 ô "50 điểm", các ô còn lại "0 điểm". Quay một lần. Xác suất được điểm (khác 0) là', [r`\(\dfrac38\)`, r`\(\dfrac18\)`, r`\(\dfrac58\)`, r`\(\dfrac35\)`], r`Có 3 ô được điểm: \(P = \dfrac38\).`, [
      undefined,
      'Chỉ tính ô 100 điểm.',
      'Đó là xác suất được 0 điểm.',
      'Chia nhầm cho số ô 0 điểm.',
    ]),
    mc(3, TH, 'Một khóa số gồm hai chữ số (từ 00 đến 99). Đoán ngẫu nhiên một lần. Xác suất đoán đúng là', [r`\(\dfrac{1}{100}\)`, r`\(\dfrac{1}{99}\)`, r`\(\dfrac{1}{10}\)`, r`\(\dfrac{1}{20}\)`], 'Có 100 mã từ 00 đến 99, chỉ 1 mã đúng.', [
      undefined,
      'Bỏ sót mã 00.',
      'Đó là xác suất đoán đúng một chữ số.',
      'Không có cơ sở.',
    ]),
    mc(3, TK, r`Hộp có 6 bi đỏ và một số bi xanh. Lấy ngẫu nhiên một viên, xác suất lấy được bi đỏ là \(\dfrac25\). Số bi xanh trong hộp là`, [r`\(9\)`, r`\(15\)`, r`\(4\)`, r`\(6\)`], r`Tổng số bi \(6 : \dfrac25 = 15\); số bi xanh \(15 - 6 = 9\).`, [
      undefined,
      'Đó là tổng số bi.',
      'Tính sai.',
      'Đó là số bi đỏ.',
    ]),
    mc(4, TK, r`Hộp có 4 bi trắng và một số bi đen; xác suất lấy được bi trắng là \(\dfrac12\). Bỏ thêm 4 bi đen vào hộp. Khi đó xác suất lấy được bi trắng là`, [r`\(\dfrac13\)`, r`\(\dfrac14\)`, r`\(\dfrac12\)`, r`\(\dfrac25\)`], r`Ban đầu có 4 bi đen (tổng 8). Sau khi thêm: 4 trắng, 8 đen; \(P = \dfrac{4}{12} = \dfrac13\).`, [
      undefined,
      'Tính sai tổng số bi.',
      'Xác suất đã thay đổi.',
      'Tính sai.',
    ]),
    mc(4, TK, r`Một túi có 10 phiếu, trong đó có một số phiếu trúng thưởng; xác suất rút được phiếu trúng thưởng là \(0{,}3\). Cần bỏ thêm bao nhiêu phiếu không trúng thưởng để xác suất này còn \(0{,}2\)?`, [r`\(5\)`, r`\(3\)`, r`\(2\)`, r`\(15\)`], r`Có 3 phiếu trúng. \(\dfrac{3}{10 + y} = 0{,}2 \iff 10 + y = 15 \iff y = 5\).`, [
      undefined,
      'Đó là số phiếu trúng thưởng.',
      'Tính sai.',
      'Đó là tổng số phiếu sau khi thêm.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, TX, 'Gieo một con xúc xắc cân đối.', [
      [r`Xác suất xuất hiện mặt 4 chấm là \(\dfrac16\).`, true, '1 trong 6.'],
      [r`Xác suất số chấm chẵn là \(\dfrac12\).`, true, '3 trong 6.'],
      ['Xác suất xuất hiện mặt 7 chấm là 0.', true, 'Biến cố không thể.'],
      [r`Xác suất số chấm không vượt quá 6 là \(\dfrac56\).`, false, 'Biến cố chắc chắn có xác suất 1.'],
    ]),
    tf(2, TX, 'Hộp có 12 viên bi cùng kích thước: 5 đỏ, 4 xanh, 3 vàng. Lấy ngẫu nhiên một viên.', [
      [r`\(P(\text{đỏ}) = \dfrac{5}{12}\).`, true, '5 trong 12.'],
      [r`\(P(\text{xanh}) = \dfrac13\).`, true, r`\(\dfrac{4}{12}\).`],
      [r`\(P(\text{vàng}) = \dfrac13\).`, false, r`\(\dfrac{3}{12} = \dfrac14\).`],
      [r`\(P(\text{không đỏ}) = \dfrac{7}{12}\).`, true, '7 bi không đỏ.'],
    ]),
    tf(2, TX, 'Rút ngẫu nhiên một thẻ trong 20 thẻ đánh số từ 1 đến 20.', [
      [r`Xác suất rút được số chẵn là \(\dfrac12\).`, true, '10 trong 20.'],
      [r`Xác suất rút được số chia hết cho 5 là \(\dfrac15\).`, true, '5, 10, 15, 20.'],
      [r`Xác suất rút được số nguyên tố là \(\dfrac25\).`, true, '2, 3, 5, 7, 11, 13, 17, 19: 8 số.'],
      [r`Xác suất rút được số lớn hơn 20 là \(\dfrac{1}{20}\).`, false, 'Biến cố không thể, xác suất 0.'],
    ]),
    tf(3, TX, 'Gieo đồng thời hai con xúc xắc cân đối.', [
      ['Có 36 kết quả có thể.', true, r`\(6\cdot6\).`],
      [r`Xác suất tổng bằng 7 là \(\dfrac16\).`, true, r`\(\dfrac{6}{36}\).`],
      [r`Xác suất tổng bằng 2 là \(\dfrac{1}{36}\).`, true, 'Chỉ (1; 1).'],
      [r`Xác suất tổng bằng 13 là \(\dfrac{1}{36}\).`, false, 'Biến cố không thể.'],
    ]),
    tf(2, TX, 'Tung một đồng xu cân đối hai lần liên tiếp.', [
      ['Có 4 kết quả có thể.', true, 'SS, SN, NS, NN.'],
      [r`Xác suất cả hai lần ngửa là \(\dfrac14\).`, true, 'Chỉ NN.'],
      [r`Xác suất có ít nhất một lần sấp là \(\dfrac34\).`, true, 'SS, SN, NS.'],
      [r`Xác suất có đúng một lần ngửa là \(\dfrac14\).`, false, r`SN, NS: \(\dfrac24 = \dfrac12\).`],
    ]),
    tf(2, TH, 'Lớp có 40 học sinh, trong đó 15 bạn thích bóng đá. Chọn ngẫu nhiên một bạn.', [
      [r`Xác suất chọn được bạn thích bóng đá là \(\dfrac38\).`, true, r`\(\dfrac{15}{40}\).`],
      [r`Xác suất chọn được bạn không thích bóng đá là \(\dfrac58\).`, true, r`\(\dfrac{25}{40}\).`],
      ['Tổng hai xác suất trên bằng 1.', true, 'Hai biến cố bù nhau.'],
      [r`Xác suất chọn được bạn thích bóng đá là \(\dfrac{15}{25}\).`, false, 'Phải chia cho tổng số học sinh.'],
    ]),
    tf(3, TH, 'Một đợt rút thăm có 100 phiếu, trong đó 1 phiếu giải nhất, 5 phiếu giải nhì, 10 phiếu giải ba. Rút ngẫu nhiên một phiếu.', [
      [r`Xác suất trúng giải nhất là \(\dfrac{1}{100}\).`, true, '1 trong 100.'],
      [r`Xác suất trúng một giải bất kì là \(\dfrac{4}{25}\).`, true, r`\(\dfrac{16}{100}\).`],
      [r`Xác suất không trúng giải là \(\dfrac{21}{25}\).`, true, r`\(\dfrac{84}{100}\).`],
      [r`Xác suất trúng giải nhì là \(\dfrac15\).`, false, r`\(\dfrac{5}{100} = \dfrac{1}{20}\).`],
    ]),
    tf(3, TK, r`Hộp có 5 bi đỏ và một số bi khác màu; xác suất lấy được bi đỏ là \(\dfrac14\).`, [
      ['Hộp có tổng cộng 20 viên bi.', true, r`\(5 : \dfrac14\).`],
      ['Có 15 viên bi không phải màu đỏ.', true, r`\(20 - 5\).`],
      [r`Xác suất lấy được bi không đỏ là \(\dfrac34\).`, true, r`\(1 - \dfrac14\).`],
      ['Hộp có tổng cộng 9 viên bi.', false, 'Tổng là 20.'],
    ]),
    tf(4, TK, r`Hộp có \(x\) bi xanh và 6 bi đỏ; xác suất lấy được bi xanh là \(\dfrac25\).`, [
      [r`\(\dfrac{x}{x + 6} = \dfrac25\).`, true, 'Công thức xác suất.'],
      [r`\(x = 4\).`, true, r`\(5x = 2x + 12\).`],
      ['Hộp có tổng cộng 10 viên bi.', true, r`\(4 + 6\).`],
      [r`\(x = 12\).`, false, r`\(x = 4\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, TX, 'Hộp có 20 tấm thẻ, trong đó 8 tấm màu xanh. Rút ngẫu nhiên một tấm. Tính xác suất rút được thẻ màu xanh (viết dạng phân số tối giản).', '2/5', r`\(\dfrac{8}{20} = \dfrac25\).`),
    sa(3, TH, 'Một vòng quay chia thành 12 ô bằng nhau, trong đó 3 ô có quà. Quay một lần. Tính xác suất không trúng quà.', '3/4', r`Có 9 ô không có quà: \(\dfrac{9}{12} = \dfrac34\).`),
    sa(4, TK, r`Một lớp có 18 bạn nữ. Chọn ngẫu nhiên một bạn, xác suất chọn được bạn nữ là \(0{,}45\). Lớp có bao nhiêu học sinh?`, '40', r`\(18 : 0{,}45 = 40\) học sinh.`),
    // ---- Tự luận ----
    es(2, TX, 'Gieo một con xúc xắc cân đối. Tính xác suất của các biến cố:\nA: "Số chấm là số chẵn"; B: "Số chấm chia hết cho 3"; C: "Số chấm lớn hơn 6".', r`Có 6 kết quả đồng khả năng.
\(P(A) = \dfrac36 = \dfrac12\); \(P(B) = \dfrac26 = \dfrac13\); \(P(C) = 0\) (biến cố không thể).`, r`0,25 điểm: nêu số kết quả có thể.
0,75 điểm: tính đúng ba xác suất (mỗi xác suất 0,25 điểm).`),
    es(3, TX, 'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của các biến cố:\nA: "Tổng số chấm bằng 9"; B: "Tổng số chấm lớn hơn hoặc bằng 10".', r`Có 36 kết quả đồng khả năng.
A: (3;6), (4;5), (5;4), (6;3): \(P(A) = \dfrac{4}{36} = \dfrac19\).
B: tổng 10: (4;6), (5;5), (6;4); tổng 11: (5;6), (6;5); tổng 12: (6;6). \(P(B) = \dfrac{6}{36} = \dfrac16\).`, r`0,5 điểm: biến cố A.
0,5 điểm: biến cố B.`),
    es(3, TH, 'Một hộp có 25 tấm phiếu đánh số từ 1 đến 25. Rút ngẫu nhiên một phiếu. Tính xác suất của các biến cố:\nA: "Số trên phiếu chia hết cho 4"; B: "Số trên phiếu có chứa chữ số 2".', r`A: 4, 8, 12, 16, 20, 24: \(P(A) = \dfrac{6}{25}\).
B: 2, 12, 20, 21, 22, 23, 24, 25: \(P(B) = \dfrac{8}{25}\).`, r`0,5 điểm: biến cố A.
0,5 điểm: biến cố B.`),
    es(3, TK, r`Một túi có 3 viên bi đỏ và một số viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên, xác suất lấy được bi xanh là \(0{,}7\). Hỏi trong túi có bao nhiêu viên bi xanh?`, r`Gọi số bi xanh là \(x\) (\(x\) nguyên dương).
\(\dfrac{x}{x + 3} = 0{,}7 \iff x = 0{,}7x + 2{,}1 \iff 0{,}3x = 2{,}1 \iff x = 7\).
Trong túi có 7 viên bi xanh.`, r`0,5 điểm: lập đúng phương trình.
0,5 điểm: giải đúng và trả lời.`),
    es(4, TK, r`Một hộp có 10 viên bi gồm bi đỏ và bi xanh, xác suất lấy được bi đỏ là \(\dfrac35\). Cần bỏ thêm vào hộp bao nhiêu viên bi xanh để xác suất lấy được bi đỏ bằng \(\dfrac12\)?`, r`Số bi đỏ: \(10\cdot\dfrac35 = 6\).
Gọi số bi xanh thêm vào là \(y\): \(\dfrac{6}{10 + y} = \dfrac12 \iff 10 + y = 12 \iff y = 2\).
Cần bỏ thêm 2 viên bi xanh.`, r`0,5 điểm: tính đúng số bi đỏ.
0,5 điểm: lập phương trình, giải đúng.`),
  ],
};

const XT = 'xac-suat-thuc-nghiem-uoc-luong';
const DD = 'du-doan-so-lan-xay-ra';
const UL = 'uoc-luong-so-luong';

const B32: BankLesson = {
  slug: 'bai-32-moi-lien-he-giua-xac-suat-thuc-nghiem-voi-xac-suat-va-ung-dung',
  questions: [
    mc(1, XT, 'Tung một đồng xu 40 lần thấy có 18 lần xuất hiện mặt ngửa. Xác suất thực nghiệm của biến cố "mặt ngửa xuất hiện" là', [r`\(\dfrac{9}{20}\)`, r`\(\dfrac{9}{11}\)`, r`\(\dfrac{11}{20}\)`, r`\(18\)`], r`\(\dfrac{18}{40} = \dfrac{9}{20}\).`, [
      undefined,
      'Chia cho số lần sấp.',
      'Đó là xác suất thực nghiệm của mặt sấp.',
      'Đó là số lần, chưa chia.',
    ]),
    mc(1, XT, 'Xác suất thực nghiệm của biến cố E sau n lần thực hiện phép thử bằng', ['số lần E xảy ra chia cho n', 'n chia cho số lần E xảy ra', 'số lần E xảy ra', 'số lần E không xảy ra chia cho n'], 'Định nghĩa xác suất thực nghiệm.', [
      undefined,
      'Đảo ngược tỉ số.',
      'Chưa chia cho số lần thử.',
      'Đó là của biến cố "E không xảy ra".',
    ]),
    mc(2, XT, 'Gieo một con xúc xắc 60 lần, mặt 6 chấm xuất hiện 12 lần. Xác suất thực nghiệm xuất hiện mặt 6 chấm là', [r`\(\dfrac15\)`, r`\(\dfrac16\)`, r`\(5\)`, r`\(\dfrac{1}{10}\)`], r`\(\dfrac{12}{60} = \dfrac15\).`, [
      undefined,
      'Đó là xác suất lí thuyết.',
      'Đảo ngược tỉ số.',
      'Tính sai.',
    ]),
    mc(2, XT, 'Khi số lần thực hiện phép thử càng lớn thì xác suất thực nghiệm của một biến cố', ['càng gần với xác suất của biến cố đó', 'càng xa xác suất của biến cố đó', 'luôn bằng 0,5', 'luôn bằng xác suất của biến cố đó'], 'Mối liên hệ giữa xác suất thực nghiệm và xác suất.', [
      undefined,
      'Ngược lại.',
      'Không có cơ sở.',
      'Chỉ gần bằng, không luôn bằng.',
    ]),
    mc(2, XT, r`Kiểm tra 400 bóng đèn thấy có 6 bóng hỏng. Xác suất thực nghiệm của biến cố "bóng đèn bị hỏng" là`, [r`\(0{,}015\)`, r`\(0{,}06\)`, r`\(0{,}15\)`, r`\(6\)`], r`\(\dfrac{6}{400} = 0{,}015\).`, [
      undefined,
      'Chia nhầm cho 100.',
      'Đặt sai dấu phẩy.',
      'Đó là số bóng hỏng.',
    ]),
    mc(3, XT, r`Bạn Minh ném 50 quả bóng vào rổ, trúng 32 quả. Ước lượng xác suất Minh ném trượt là`, [r`\(0{,}36\)`, r`\(0{,}64\)`, r`\(0{,}32\)`, r`\(18\)`], r`Số lần trượt \(50 - 32 = 18\); \(\dfrac{18}{50} = 0{,}36\).`, [
      undefined,
      'Đó là xác suất ném trúng.',
      'Nhầm số quả trúng với tỉ lệ.',
      'Đó là số lần trượt.',
    ]),
    mc(3, XT, r`Tung một đồng xu 100 lần được 47 lần sấp. Xác suất thực nghiệm của biến cố "mặt ngửa" là`, [r`\(0{,}53\)`, r`\(0{,}47\)`, r`\(0{,}5\)`, r`\(53\)`], r`Số lần ngửa \(100 - 47 = 53\); \(\dfrac{53}{100} = 0{,}53\).`, [
      undefined,
      'Đó là của mặt sấp.',
      'Đó là xác suất lí thuyết.',
      'Đó là số lần, chưa chia.',
    ]),
    mc(2, DD, r`Xác suất nảy mầm của một loại hạt giống khoảng \(0{,}9\). Gieo 500 hạt, dự đoán số hạt nảy mầm khoảng`, [r`\(450\)`, r`\(50\)`, r`\(500\)`, r`\(90\)`], r`\(500\cdot0{,}9 = 450\).`, [
      undefined,
      'Đó là số hạt không nảy mầm.',
      'Không phải mọi hạt đều nảy mầm.',
      'Nhầm tỉ lệ với số hạt.',
    ]),
    mc(2, DD, r`Xác suất thực nghiệm một sản phẩm bị lỗi là \(0{,}02\). Trong 1500 sản phẩm, dự đoán có khoảng bao nhiêu sản phẩm lỗi?`, [r`\(30\)`, r`\(3\)`, r`\(300\)`, r`\(75\)`], r`\(1500\cdot0{,}02 = 30\).`, [
      undefined,
      'Đặt sai dấu phẩy.',
      'Đặt sai dấu phẩy.',
      'Tính sai.',
    ]),
    mc(3, DD, 'Thống kê 2000 trẻ sơ sinh ở một bệnh viện thấy có 1036 bé trai. Dự đoán trong 1000 trẻ sơ sinh tiếp theo có khoảng bao nhiêu bé gái?', [r`\(482\)`, r`\(518\)`, r`\(1036\)`, r`\(500\)`], r`Xác suất thực nghiệm bé gái \(\dfrac{964}{2000} = 0{,}482\); dự đoán \(1000\cdot0{,}482 = 482\).`, [
      undefined,
      'Đó là số bé trai dự đoán.',
      'Đó là số bé trai đã thống kê.',
      'Dùng xác suất 0,5 thay vì xác suất thực nghiệm.',
    ]),
    mc(3, DD, r`Xác suất thực nghiệm một khách vào cửa hàng mua hàng là \(0{,}25\). Mỗi ngày có 240 khách vào cửa hàng. Dự đoán số khách mua hàng mỗi ngày khoảng`, [r`\(60\)`, r`\(25\)`, r`\(240\)`, r`\(96\)`], r`\(240\cdot0{,}25 = 60\).`, [
      undefined,
      'Nhầm tỉ lệ phần trăm với số khách.',
      'Không phải mọi khách đều mua.',
      'Tính sai.',
    ]),
    mc(3, UL, 'Hộp có 20 bi trắng và một số bi đen. Lấy ngẫu nhiên một viên, ghi màu rồi trả lại; làm 100 lần thấy 25 lần được bi trắng. Ước lượng số bi đen trong hộp là', [r`\(60\)`, r`\(80\)`, r`\(75\)`, r`\(5\)`], r`Tỉ lệ bi trắng \(\approx 0{,}25\) nên tổng số bi \(\approx 20 : 0{,}25 = 80\); số bi đen \(\approx 60\).`, [
      undefined,
      'Đó là tổng số bi.',
      'Đó là số lần lấy được bi đen.',
      'Tính sai.',
    ]),
    mc(4, UL, 'Để ước lượng số cá trong hồ, người ta bắt 60 con, đánh dấu rồi thả lại. Vài ngày sau bắt 80 con thì có 4 con được đánh dấu. Số cá trong hồ ước lượng khoảng', [r`\(1200\)`, r`\(320\)`, r`\(4800\)`, r`\(140\)`], r`\(\dfrac{4}{80} \approx \dfrac{60}{N}\) nên \(N \approx \dfrac{60\cdot80}{4} = 1200\).`, [
      undefined,
      'Tính sai tỉ lệ.',
      'Quên chia cho 4.',
      'Cộng thay vì lập tỉ lệ.',
    ]),
    mc(4, UL, 'Trong một vườn quốc gia, người ta đánh dấu 50 con chim rồi thả. Lần sau bắt 120 con thì có 6 con được đánh dấu. Số chim ước lượng khoảng', [r`\(1000\)`, r`\(720\)`, r`\(300\)`, r`\(176\)`], r`\(N \approx \dfrac{50\cdot120}{6} = 1000\).`, [
      undefined,
      'Tính sai.',
      'Tính sai.',
      'Cộng các số.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, XT, 'Gieo một con xúc xắc 30 lần, mặt 1 chấm xuất hiện 6 lần.', [
      [r`Xác suất thực nghiệm của mặt 1 chấm là \(\dfrac15\).`, true, r`\(\dfrac{6}{30}\).`],
      [r`Xác suất (lí thuyết) của mặt 1 chấm là \(\dfrac16\).`, true, 'Xúc xắc cân đối.'],
      ['Hai xác suất trên bằng nhau.', false, r`\(\dfrac15 \ne \dfrac16\).`],
      [r`Gieo nhiều lần hơn thì xác suất thực nghiệm thường gần \(\dfrac16\) hơn.`, true, 'Mối liên hệ.'],
    ]),
    tf(2, XT, 'Xét tính đúng sai về xác suất thực nghiệm:', [
      ['Xác suất thực nghiệm phụ thuộc vào kết quả các lần thử.', true, 'Thử lại có thể khác.'],
      ['Có thể dùng xác suất thực nghiệm để ước lượng xác suất khi không tính được bằng lí thuyết.', true, 'Với số lần thử đủ lớn.'],
      ['Xác suất thực nghiệm luôn bằng xác suất.', false, 'Chỉ xấp xỉ.'],
      ['Xác suất thực nghiệm luôn nằm trong đoạn từ 0 đến 1.', true, 'Số lần xảy ra không vượt quá số lần thử.'],
    ]),
    tf(2, XT, 'Kiểm tra 200 sản phẩm thấy 190 sản phẩm đạt và 10 sản phẩm lỗi.', [
      [r`Xác suất thực nghiệm sản phẩm lỗi là \(0{,}05\).`, true, r`\(\dfrac{10}{200}\).`],
      [r`Xác suất thực nghiệm sản phẩm đạt là \(0{,}95\).`, true, r`\(\dfrac{190}{200}\).`],
      ['Tổng hai xác suất thực nghiệm bằng 1.', true, r`\(0{,}05 + 0{,}95\).`],
      ['Xác suất thực nghiệm sản phẩm lỗi là 10.', false, 'Phải chia cho 200.'],
    ]),
    tf(1, XT, 'Gieo một con xúc xắc 100 lần, mặt có số chấm chẵn xuất hiện 52 lần.', [
      [r`Xác suất thực nghiệm của mặt chẵn là \(0{,}52\).`, true, r`\(\dfrac{52}{100}\).`],
      [r`Xác suất thực nghiệm của mặt lẻ là \(0{,}48\).`, true, r`\(\dfrac{48}{100}\).`],
      ['Xác suất thực nghiệm của mặt chẵn bằng 52%.', true, r`\(0{,}52 = 52\%\).`],
      [r`Xác suất thực nghiệm của mặt chẵn là \(\dfrac12\).`, false, r`Đó là xác suất lí thuyết; thực nghiệm là \(0{,}52\).`],
    ]),
    tf(3, XT, 'Một cầu thủ đá 40 quả phạt đền, vào lưới 30 quả.', [
      [r`Xác suất thực nghiệm đá vào là \(0{,}75\).`, true, r`\(\dfrac{30}{40}\).`],
      [r`Xác suất thực nghiệm đá trượt là \(0{,}25\).`, true, r`\(\dfrac{10}{40}\).`],
      ['Có thể dự đoán trong 20 quả tiếp theo vào khoảng 15 quả.', true, r`\(20\cdot0{,}75\).`],
      ['Chắc chắn cầu thủ sẽ đá vào đúng 15 trong 20 quả tiếp theo.', false, 'Dự đoán chỉ là gần đúng.'],
    ]),
    tf(2, DD, r`Một vận động viên có xác suất thực nghiệm bắn trúng mục tiêu khoảng \(0{,}6\).`, [
      ['Bắn 50 lần, dự đoán trúng khoảng 30 lần.', true, r`\(50\cdot0{,}6\).`],
      ['Bắn 100 lần, dự đoán trúng khoảng 60 lần.', true, r`\(100\cdot0{,}6\).`],
      ['Bắn 10 lần thì chắc chắn trúng đúng 6 lần.', false, 'Chỉ là dự đoán gần đúng.'],
      ['Kết quả dự đoán là số gần đúng.', true, 'Dựa vào xác suất ước lượng.'],
    ]),
    tf(3, DD, 'Thống kê 500 ngày ở một địa phương thấy có 120 ngày có mưa.', [
      [r`Xác suất thực nghiệm của biến cố "có mưa" là \(0{,}24\).`, true, r`\(\dfrac{120}{500}\).`],
      ['Trong 30 ngày, dự đoán có khoảng 7 ngày mưa.', true, r`\(30\cdot0{,}24 = 7{,}2\).`],
      ['Trong 100 ngày, dự đoán có khoảng 24 ngày mưa.', true, r`\(100\cdot0{,}24\).`],
      [r`Xác suất thực nghiệm của biến cố "không mưa" là \(0{,}24\).`, false, r`Là \(0{,}76\).`],
    ]),
    tf(3, UL, 'Hộp có 30 bi đỏ và một số bi xanh. Lấy ngẫu nhiên một viên, ghi màu rồi trả lại; làm 200 lần thấy 60 lần được bi đỏ.', [
      [r`Xác suất thực nghiệm lấy được bi đỏ là \(0{,}3\).`, true, r`\(\dfrac{60}{200}\).`],
      ['Ước lượng tổng số bi trong hộp là 100.', true, r`\(30 : 0{,}3\).`],
      ['Ước lượng số bi xanh là 70.', true, r`\(100 - 30\).`],
      ['Ước lượng số bi xanh là 140.', false, 'Đó là số lần lấy được bi xanh.'],
    ]),
    tf(4, UL, 'Đánh dấu 40 con cá rồi thả lại hồ; lần sau bắt 50 con thì có 5 con được đánh dấu.', [
      ['Tỉ lệ cá có dấu trong lần bắt sau là 10%.', true, r`\(\dfrac{5}{50}\).`],
      ['Ước lượng số cá trong hồ khoảng 400 con.', true, r`\(40 : 0{,}1\).`],
      ['Ước lượng số cá trong hồ khoảng 250 con.', false, 'Tính sai tỉ lệ.'],
      ['Cần giả thiết cá đánh dấu đã hòa trộn đều với cá trong hồ.', true, 'Để tỉ lệ trong mẫu xấp xỉ tỉ lệ trong hồ.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, XT, 'Tung một đồng xu 80 lần được 44 lần ngửa. Tính xác suất thực nghiệm của biến cố "mặt ngửa" (viết dạng số thập phân).', '0,55', r`\(\dfrac{44}{80} = 0{,}55\).`),
    sa(2, DD, r`Xác suất thực nghiệm ném trúng rổ của một bạn là \(0{,}7\). Nếu bạn đó ném 40 lần, dự đoán số lần trúng là bao nhiêu?`, '28', r`\(40\cdot0{,}7 = 28\).`),
    sa(3, DD, 'Kiểm tra 1000 sản phẩm thấy 12 sản phẩm lỗi. Dự đoán trong 25 000 sản phẩm có khoảng bao nhiêu sản phẩm lỗi?', '300', r`Xác suất thực nghiệm \(0{,}012\); \(25\,000\cdot0{,}012 = 300\).`),
    sa(3, UL, 'Hộp có 15 bi vàng và một số bi khác màu. Lấy ngẫu nhiên một viên, ghi màu rồi trả lại; làm 120 lần thấy 30 lần được bi vàng. Ước lượng số bi khác màu trong hộp.', '45', r`Tỉ lệ bi vàng \(\approx 0{,}25\), tổng \(\approx 60\) bi; bi khác màu \(\approx 45\).`),
    sa(4, UL, 'Đánh dấu 80 con chim rồi thả. Lần sau bắt 100 con thì có 8 con được đánh dấu. Ước lượng số chim trong khu vực.', '1000', r`\(N \approx \dfrac{80\cdot100}{8} = 1000\).`),
    // ---- Tự luận ----
    es(2, XT, 'Tung một đồng xu 60 lần, ghi được 27 lần mặt sấp.\na) Tính xác suất thực nghiệm của biến cố "mặt sấp" và "mặt ngửa".\nb) So sánh với xác suất lí thuyết 0,5 và nhận xét.', r`a) Sấp: \(\dfrac{27}{60} = 0{,}45\); ngửa: \(\dfrac{33}{60} = 0{,}55\).
b) Hai xác suất thực nghiệm gần 0,5 nhưng không bằng; nếu tung nhiều lần hơn thì thường gần 0,5 hơn.`, r`0,5 điểm: câu a.
0,5 điểm: câu b, nhận xét đúng mối liên hệ.`),
    es(3, XT, 'Ba vận động viên tập bắn: A bắn 50 phát trúng 40 phát; B bắn 40 phát trúng 36 phát; C bắn 60 phát trúng 45 phát. Tính xác suất thực nghiệm bắn trúng của mỗi người. Nên chọn ai đi thi đấu? Vì sao?', r`A: \(\dfrac{40}{50} = 0{,}8\); B: \(\dfrac{36}{40} = 0{,}9\); C: \(\dfrac{45}{60} = 0{,}75\).
Nên chọn B vì xác suất thực nghiệm bắn trúng cao nhất.`, r`0,5 điểm: tính đúng ba xác suất.
0,5 điểm: lựa chọn và giải thích.`),
    es(3, DD, 'Khảo sát ngẫu nhiên 400 học sinh một trường thấy có 120 bạn bị cận thị. Trường có 1500 học sinh. Hãy dự đoán số học sinh bị cận thị của trường.', r`Xác suất thực nghiệm: \(\dfrac{120}{400} = 0{,}3\).
Dự đoán số học sinh bị cận thị: \(1500\cdot0{,}3 = 450\) (học sinh).`, r`0,5 điểm: tính đúng xác suất thực nghiệm.
0,5 điểm: dự đoán đúng 450 học sinh.`),
    es(3, DD, 'Một nhà máy kiểm tra 2000 sản phẩm thấy có 50 sản phẩm lỗi.\na) Dự đoán số sản phẩm lỗi trong lô 8000 sản phẩm.\nb) Nếu mỗi sản phẩm lỗi tốn 15 000 đồng để sửa, ước tính chi phí sửa lỗi của lô hàng.', r`a) Xác suất thực nghiệm \(\dfrac{50}{2000} = 0{,}025\); dự đoán \(8000\cdot0{,}025 = 200\) sản phẩm lỗi.
b) Chi phí khoảng \(200\cdot15\,000 = 3\,000\,000\) đồng.`, r`0,5 điểm: câu a.
0,5 điểm: câu b.`),
    es(4, UL, 'Để ước lượng số cá trong một hồ, người ta bắt 120 con, đánh dấu rồi thả lại. Một tuần sau bắt 150 con thì có 9 con được đánh dấu.\na) Ước lượng số cá trong hồ.\nb) Nêu hai giả thiết cần có để ước lượng này hợp lí.', r`a) \(\dfrac{9}{150} \approx \dfrac{120}{N}\) nên \(N \approx \dfrac{120\cdot150}{9} = 2000\) con.
b) Cá đánh dấu đã hòa trộn đều với cá trong hồ; số cá trong hồ không thay đổi đáng kể giữa hai lần bắt (không có cá chết, cá mới sinh nhiều).`, r`0,5 điểm: câu a.
0,5 điểm: câu b, nêu đủ hai giả thiết.`),
  ],
};

export const BANK_CHUONG_8: BankLesson[] = [B30, B31, B32];
