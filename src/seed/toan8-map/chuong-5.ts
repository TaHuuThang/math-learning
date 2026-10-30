import { es, mcq, r, sa, tf, type MapChapter } from './types';

const SACH = `[bieudo]
loai: cot
tieude: Số sách quyên góp của các lớp khối 8
nhan: 8A; 8B; 8C; 8D
so lieu: 45; 60; 50; 35
donvi: cuốn
[/bieudo]`;

const HSG = `[bieudo]
loai: cotkep
tieude: Số học sinh giỏi của các lớp khối 8
nhan: 8A; 8B; 8C; 8D
so lieu: 8; 10; 6; 9
so lieu 2: 12; 11; 11; 9
ten: Học kì I; Học kì II
donvi: học sinh
[/bieudo]`;

const MUON_SACH = `[bieudo]
loai: doanthang
tieude: Số lượt mượn sách ở thư viện trường
nhan: T9; T10; T11; T12; T1
so lieu: 120; 150; 180; 140; 160
donvi: lượt
[/bieudo]`;

const NHIET_DO = `[bieudo]
loai: doanthang
tieude: Nhiệt độ trong một ngày ở một địa phương
nhan: 6 giờ; 9 giờ; 12 giờ; 15 giờ; 18 giờ
so lieu: 22; 26; 31; 30; 27
donvi: °C
[/bieudo]`;

const THE_THAO = `[bieudo]
loai: quat
tieude: Môn thể thao yêu thích của 200 học sinh
nhan: Bóng đá; Cầu lông; Bơi lội; Cờ vua
so lieu: 40; 25; 20; 15
[/bieudo]`;

/** Chương V. Dữ liệu và biểu đồ – Bài 18 đến Bài 20. Số liệu trong ví dụ, bài tập là số liệu minh họa. */
export const CHUONG_5: MapChapter = {
  code: 'V',
  objectives: `- Thu thập, phân loại dữ liệu theo các tiêu chí cho trước từ nhiều nguồn; nhận biết tính hợp lí của dữ liệu.
- Lựa chọn và biểu diễn dữ liệu bằng bảng, biểu đồ thích hợp; chuyển dữ liệu giữa các dạng biểu diễn.
- Phân tích, xử lí số liệu ở biểu đồ để phát hiện vấn đề, quy luật đơn giản và giải quyết vấn đề.`,
  keyPoints: `- Thu thập trực tiếp (quan sát, phỏng vấn, phiếu hỏi, thí nghiệm) và gián tiếp (nguồn có sẵn).
- Dữ liệu định tính (định danh, có thứ tự) và dữ liệu định lượng (rời rạc, liên tục).
- Công dụng của biểu đồ tranh, cột, cột kép, đoạn thẳng, hình quạt tròn; nhận biết biểu đồ gây hiểu lầm.`,
  formulas: r`Tỉ lệ phần trăm của một phần: \(\dfrac{a}{N}\cdot100\%\) (\(a\) là số lượng của phần đó, \(N\) là tổng).
Góc ở tâm của hình quạt biểu diễn \(p\%\): \(p\%\cdot360^\circ\).
Tỉ lệ tăng (giảm) từ giá trị \(a\) đến giá trị \(b\): \(\dfrac{b - a}{a}\cdot100\%\).`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 1 (VietJack, Hoatieu) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-5a', objectives: 'Củng cố thu thập, phân loại dữ liệu; lựa chọn, biểu diễn và phân tích dữ liệu bằng bảng, biểu đồ.' },
    { slug: 'bai-tap-cuoi-chuong-5', objectives: 'Ôn tập toàn Chương V: các loại dữ liệu, các dạng biểu đồ và phân tích số liệu; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 18 ----------------
    {
      slug: 'bai-18-thu-thap-va-phan-loai-du-lieu',
      difficulty: 1,
      objectives: `- Thực hiện thu thập dữ liệu bằng phương pháp phù hợp (trực tiếp, gián tiếp).
- Phân loại dữ liệu theo các tiêu chí: định tính, định lượng; rời rạc, liên tục.
- Nhận biết tính hợp lí, tính đại diện của dữ liệu.`,
      prerequisites: '- Thu thập, phân loại, biểu diễn dữ liệu (Toán 6, Toán 7).',
      concepts: 'Thu thập trực tiếp, gián tiếp; dữ liệu định tính (định danh, có thứ tự); dữ liệu định lượng (rời rạc, liên tục); tính hợp lí, tính đại diện của dữ liệu.',
      properties: `- Dữ liệu định lượng là các số; dữ liệu định tính là các từ, kí hiệu (hoặc số chỉ dùng để mã hóa).
- Dữ liệu rời rạc nhận các giá trị đếm được (số học sinh, số bàn thắng); dữ liệu liên tục là kết quả đo (chiều cao, cân nặng, thời gian).`,
      themes: [
        {
          title: 'Thu thập dữ liệu',
          description: 'Chọn phương pháp thu thập; đánh giá dữ liệu có hợp lí, có đại diện hay không.',
          types: [
            {
              slug: 'phuong-phap-thu-thap-du-lieu',
              title: 'Xác định phương pháp thu thập dữ liệu',
              levels: [1, 2],
              knowledge: 'Thu thập trực tiếp: quan sát, phỏng vấn, lập phiếu hỏi, làm thí nghiệm. Thu thập gián tiếp: từ nguồn có sẵn (sách, báo, Internet, niên giám thống kê…).',
              signs: 'Đề nêu một nội dung cần tìm hiểu và hỏi nên thu thập dữ liệu bằng cách nào.',
              method: 'Xét dữ liệu có sẵn ở nguồn tin cậy hay phải tự tạo ra (đo, đếm, hỏi, thí nghiệm) để chọn phương pháp.',
              steps: `- **Bước 1.** Xác định đối tượng và nội dung cần thu thập.
- **Bước 2.** Nếu đã có nguồn tin cậy công bố, chọn thu thập gián tiếp; nếu chưa có, chọn quan sát, phỏng vấn, phiếu hỏi hoặc thí nghiệm.
- **Bước 3.** Nêu cụ thể nguồn hoặc công cụ thu thập.`,
              mistakes: '- Dùng thí nghiệm cho dữ liệu chỉ có thể tra cứu (lượng mưa nhiều năm).\n- Hỏi quá ít người hoặc chỉ hỏi một nhóm nhỏ không đại diện.',
              example: `Nêu phương pháp thu thập dữ liệu phù hợp:
a) Nhiệt độ trung bình các tháng năm 2025 ở Hà Nội.
b) Môn thể thao yêu thích của học sinh lớp 8A.
c) Thời gian một viên bi lăn hết một máng nghiêng.`,
              solution: `a) Thu thập gián tiếp từ trung tâm khí tượng hoặc niên giám thống kê.
b) Thu thập trực tiếp bằng phỏng vấn hoặc phiếu hỏi các bạn lớp 8A.
c) Thu thập trực tiếp bằng làm thí nghiệm và đo thời gian.`,
              exercises: [
                mcq(1, 'Để biết số giờ ngủ mỗi ngày của các bạn trong lớp, cách thu thập dữ liệu phù hợp nhất là', ['Lập phiếu hỏi các bạn trong lớp', 'Tra cứu trên Internet', 'Làm thí nghiệm', 'Đọc sách giáo khoa'], 'A', 'Số giờ ngủ của các bạn trong lớp chưa có ở nguồn nào, cần hỏi trực tiếp từng bạn.'),
                tf(2, 'Mỗi khẳng định sau đúng hay sai?', [
                  ['Số dân của các tỉnh năm 2024 nên thu thập gián tiếp từ niên giám thống kê.', true],
                  ['Thời gian chạy 100 m của học sinh lớp 8A được thu thập bằng cách đo trực tiếp.', true],
                  ['Để biết màu sắc yêu thích của học sinh cả trường, chỉ cần hỏi 3 bạn ngồi cạnh.', false],
                  ['Lượng mưa các tháng năm 2025 ở Huế được thu thập bằng cách làm thí nghiệm.', false],
                ], 'a) Đúng. b) Đúng. c) Sai: 3 bạn không đại diện cho cả trường. d) Sai: lượng mưa đã được trạm khí tượng đo, ta thu thập gián tiếp.'),
              ],
            },
            {
              slug: 'tinh-hop-li-dai-dien-du-lieu',
              title: 'Đánh giá tính hợp lí, tính đại diện của dữ liệu',
              levels: [2, 3],
              knowledge: 'Dữ liệu hợp lí phải đúng định dạng, nằm trong phạm vi thực tế, phù hợp với tổng thể; mẫu điều tra cần đại diện cho toàn bộ đối tượng.',
              signs: 'Đề cho một bảng dữ liệu hoặc mô tả cách điều tra, hỏi dữ liệu có hợp lí, có đại diện không.',
              method: 'Kiểm tra từng giá trị với phạm vi thực tế, kiểm tra tổng với tổng thể; kiểm tra mẫu có bao quát các nhóm của đối tượng không.',
              steps: `- **Bước 1.** Đối chiếu từng giá trị với phạm vi thực tế (chiều cao, điểm số…).
- **Bước 2.** Kiểm tra các tổng, tỉ lệ có phù hợp (ví dụ tổng không vượt quá sĩ số).
- **Bước 3.** Xét mẫu điều tra có đủ lớn, có thuộc mọi nhóm của tổng thể không; kết luận.`,
              mistakes: '- Kết luận dữ liệu hợp lí chỉ vì các giá trị đều là số.\n- Cho rằng hỏi một nhóm đặc biệt (câu lạc bộ Toán) là đại diện cho cả trường.',
              example: `a) Bạn Hà ghi chiều cao (cm) của 6 bạn: 152; 148; 15,5; 160; 147; 155. Giá trị nào không hợp lí?
b) Để biết môn học yêu thích của học sinh toàn trường, bạn An chỉ hỏi các bạn trong câu lạc bộ Toán. Mẫu này có đại diện không?`,
              solution: `a) 15,5 cm không hợp lí (chiều cao học sinh lớp 8 không thể là 15,5 cm; có thể ghi nhầm 155).
b) Không đại diện: các bạn câu lạc bộ Toán thường thích môn Toán hơn, chưa phản ánh học sinh toàn trường.`,
              exercises: [
                mcq(2, 'Lớp 8B có 40 học sinh, mỗi bạn tham gia đúng một câu lạc bộ. Bảng ghi: Bóng đá 15; Cầu lông 12; Cờ vua 8; Bơi 18. Dữ liệu này', ['không hợp lí vì tổng số học sinh là 53, lớn hơn 40', 'hợp lí', 'không hợp lí vì có câu lạc bộ ít người', 'không hợp lí vì câu lạc bộ Bơi đông nhất'], 'A', '15 + 12 + 8 + 18 = 53 > 40, mâu thuẫn với việc mỗi bạn tham gia đúng một câu lạc bộ.'),
                tf(3, 'Một cửa hàng muốn biết khách hàng thích loại nước uống nào nên phỏng vấn 20 khách mua hàng vào sáng thứ Hai. Mỗi khẳng định sau đúng hay sai?', [
                  ['Đây là cách thu thập dữ liệu trực tiếp.', true],
                  ['Mẫu 20 khách sáng thứ Hai chắc chắn đại diện cho mọi khách hàng.', false],
                  ['Nên phỏng vấn khách ở nhiều thời điểm khác nhau để kết quả đại diện hơn.', true],
                  ['Kết quả phỏng vấn (tên loại nước) là dữ liệu định lượng.', false],
                ], 'a) Đúng (phỏng vấn). b) Sai: khách buổi sáng thứ Hai có thể khác khách cuối tuần. c) Đúng. d) Sai: tên loại nước là dữ liệu định tính.'),
              ],
            },
          ],
        },
        {
          title: 'Phân loại dữ liệu',
          description: 'Dữ liệu định tính, định lượng; rời rạc, liên tục.',
          types: [
            {
              slug: 'phan-loai-du-lieu',
              title: 'Phân loại dữ liệu',
              levels: [1, 2],
              knowledge: 'Dữ liệu định tính: định danh (không so sánh được) hoặc có thứ tự (so sánh được). Dữ liệu định lượng: rời rạc (đếm) hoặc liên tục (đo).',
              signs: 'Đề liệt kê các loại dữ liệu và yêu cầu chỉ ra loại nào định tính, định lượng, rời rạc, liên tục.',
              method: 'Xét dữ liệu có phải là số đo, số đếm không; nếu là chữ thì xét có sắp được thứ tự không.',
              steps: `- **Bước 1.** Dữ liệu là số (dùng để tính toán)? → định lượng; ngược lại → định tính.
- **Bước 2.** Định lượng: có được do đếm → rời rạc; do đo → liên tục.
- **Bước 3.** Định tính: có thứ tự tự nhiên (tốt, khá…) → có thứ tự; không → định danh.`,
              mistakes: '- Xếp số áo, số báo danh vào dữ liệu định lượng (đó là mã, không dùng để tính).\n- Nhầm dữ liệu có thứ tự với định lượng.',
              example: 'Phân loại các dữ liệu: tên các tỉnh; số học sinh mỗi lớp; xếp loại học lực (Tốt, Khá, Đạt, Chưa đạt); cân nặng (kg) của học sinh.',
              solution: '- Tên các tỉnh: định tính, định danh.\n- Số học sinh mỗi lớp: định lượng, rời rạc.\n- Xếp loại học lực: định tính, có thứ tự.\n- Cân nặng: định lượng, liên tục.',
              exercises: [
                mcq(1, 'Dữ liệu nào sau đây là dữ liệu định lượng?', ['Chiều cao (cm) của học sinh lớp 8A', 'Môn học yêu thích', 'Màu áo đồng phục', 'Nơi sinh'], 'A', 'Chiều cao là số đo nên là dữ liệu định lượng (liên tục). Các dữ liệu còn lại là định tính.'),
                mcq(2, 'Dữ liệu "mức độ hài lòng: Rất hài lòng, Hài lòng, Bình thường, Không hài lòng" là', ['dữ liệu định tính có thể sắp thứ tự', 'dữ liệu định lượng rời rạc', 'dữ liệu định lượng liên tục', 'dữ liệu định tính không thể sắp thứ tự'], 'A', 'Các mức độ là từ ngữ (định tính) và sắp xếp được từ cao đến thấp.'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 19 ----------------
    {
      slug: 'bai-19-bieu-dien-du-lieu-bang-bang-bieu-do',
      difficulty: 2,
      objectives: `- Lựa chọn và biểu diễn dữ liệu bằng bảng, biểu đồ thích hợp: biểu đồ tranh, cột, cột kép, đoạn thẳng, hình quạt tròn.
- Chuyển dữ liệu từ dạng biểu diễn này sang dạng biểu diễn khác.`,
      prerequisites: '- Đọc, vẽ biểu đồ tranh, biểu đồ cột (Toán 6); biểu đồ đoạn thẳng, hình quạt tròn (Toán 7).\n- Tỉ số phần trăm.',
      concepts: 'Bảng thống kê; biểu đồ tranh; biểu đồ cột; biểu đồ cột kép; biểu đồ đoạn thẳng; biểu đồ hình quạt tròn.',
      formulas: r`Tỉ lệ phần trăm \(\dfrac{a}{N}\cdot100\%\); góc ở tâm của hình quạt biểu diễn \(p\%\) là \(p\%\cdot360^\circ\).`,
      properties: `- Biểu đồ cột (cột kép): so sánh số liệu giữa các đối tượng (giữa hai nhóm).
- Biểu đồ đoạn thẳng: biểu diễn sự thay đổi của một đại lượng theo thời gian.
- Biểu đồ hình quạt tròn: biểu diễn tỉ lệ phần trăm của các thành phần so với tổng thể.`,
      themes: [
        {
          title: 'Lựa chọn dạng biểu diễn',
          description: 'Chọn bảng, biểu đồ phù hợp với loại dữ liệu và mục đích.',
          types: [
            {
              slug: 'chon-dang-bieu-do',
              title: 'Chọn dạng biểu đồ phù hợp với dữ liệu và mục đích',
              levels: [1, 2],
              knowledge: 'Công dụng của từng loại biểu đồ: cột (so sánh), cột kép (so sánh hai nhóm), đoạn thẳng (thay đổi theo thời gian), hình quạt tròn (cơ cấu, tỉ lệ phần trăm).',
              signs: 'Đề nêu dữ liệu và mục đích (so sánh, theo dõi xu hướng, thể hiện cơ cấu) và hỏi nên dùng biểu đồ nào.',
              method: 'Xác định mục đích biểu diễn rồi chọn loại biểu đồ có công dụng tương ứng.',
              steps: `- **Bước 1.** Dữ liệu theo thời gian? → biểu đồ đoạn thẳng.
- **Bước 2.** Cần thể hiện các phần của một tổng thể (tỉ lệ %)? → biểu đồ hình quạt tròn.
- **Bước 3.** So sánh giữa các đối tượng? → biểu đồ cột; so sánh hai nhóm cùng lúc → cột kép.`,
              mistakes: '- Dùng biểu đồ hình quạt tròn cho dữ liệu không tạo thành một tổng thể (ví dụ nhiệt độ các tháng).\n- Dùng biểu đồ đoạn thẳng cho dữ liệu không theo thời gian.',
              example: `Chọn biểu đồ phù hợp:
a) Nhiệt độ trung bình 12 tháng ở Đà Lạt.
b) Tỉ lệ các loại rác thải sinh hoạt của một gia đình.
c) Số học sinh nam, nữ của bốn lớp khối 8.`,
              solution: 'a) Biểu đồ đoạn thẳng. b) Biểu đồ hình quạt tròn. c) Biểu đồ cột kép.',
              exercises: [
                mcq(1, 'Để biểu diễn sự thay đổi số học sinh của một trường qua các năm học, nên dùng', ['Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn', 'Biểu đồ tranh', 'Biểu đồ cột kép'], 'A', 'Dữ liệu thay đổi theo thời gian nên dùng biểu đồ đoạn thẳng.'),
                mcq(2, 'Để so sánh điểm trung bình môn Toán và môn Ngữ văn của 5 lớp, biểu đồ phù hợp nhất là', ['Biểu đồ cột kép', 'Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng', 'Biểu đồ tranh'], 'A', 'So sánh hai nhóm số liệu (Toán, Ngữ văn) giữa các lớp nên dùng biểu đồ cột kép.'),
              ],
            },
          ],
        },
        {
          title: 'Biểu diễn và chuyển đổi dữ liệu',
          description: 'Vẽ biểu đồ từ bảng; chuyển số liệu sang tỉ lệ phần trăm để vẽ biểu đồ hình quạt tròn.',
          types: [
            {
              slug: 've-bieu-do',
              title: 'Vẽ biểu đồ biểu diễn dữ liệu',
              levels: [2, 3],
              knowledge: 'Cách vẽ biểu đồ cột, cột kép, đoạn thẳng: trục ngang ghi đối tượng (mốc thời gian), trục đứng ghi số liệu theo một tỉ lệ thống nhất; tên biểu đồ, chú giải.',
              signs: 'Đề cho bảng số liệu và yêu cầu vẽ biểu đồ (có thể kèm nhận xét).',
              method: 'Chọn loại biểu đồ, chọn tỉ lệ trên trục đứng, vẽ cột (điểm) theo số liệu, ghi đủ tên, đơn vị, chú giải.',
              steps: `- **Bước 1.** Vẽ hai trục; trục ngang ghi tên đối tượng hoặc mốc thời gian.
- **Bước 2.** Chọn khoảng chia trên trục đứng phù hợp với số liệu lớn nhất.
- **Bước 3.** Vẽ cột (hoặc chấm điểm rồi nối thành đoạn thẳng), ghi số liệu, tên biểu đồ, đơn vị, chú giải.`,
              mistakes: '- Chia trục đứng không đều hoặc không bắt đầu từ 0.\n- Thiếu tên biểu đồ, đơn vị hoặc chú giải (biểu đồ cột kép).',
              example: 'Vẽ biểu đồ cột biểu diễn số cây trồng được của các lớp: 8A: 30 cây; 8B: 25 cây; 8C: 40 cây; 8D: 35 cây.',
              solution: `Trục ngang ghi tên lớp, trục đứng chia mỗi vạch 10 cây, vẽ bốn cột có chiều cao tương ứng:

[bieudo]
loai: cot
tieude: Số cây trồng được của các lớp khối 8
nhan: 8A; 8B; 8C; 8D
so lieu: 30; 25; 40; 35
donvi: cây
[/bieudo]`,
              exercises: [
                es(2, 'Chiều cao (cm) của một cây đậu sau 1, 2, 3, 4, 5 tuần lần lượt là 4; 9; 15; 22; 26. Vẽ biểu đồ đoạn thẳng biểu diễn dữ liệu trên và nhận xét.', `[bieudo]
loai: doanthang
tieude: Chiều cao của cây đậu
nhan: Tuần 1; Tuần 2; Tuần 3; Tuần 4; Tuần 5
so lieu: 4; 9; 15; 22; 26
donvi: cm
[/bieudo]

Nhận xét: cây cao dần theo thời gian; tuần 4 tăng nhiều nhất (7 cm), tuần 5 tăng chậm lại (4 cm).`),
                es(3, 'Số học sinh nam, nữ tham gia các câu lạc bộ: Bóng rổ (nam 12, nữ 5); Cầu lông (nam 8, nữ 10); Múa (nam 2, nữ 14). Vẽ biểu đồ cột kép và nhận xét.', `[bieudo]
loai: cotkep
tieude: Học sinh tham gia các câu lạc bộ
nhan: Bóng rổ; Cầu lông; Múa
so lieu: 12; 8; 2
so lieu 2: 5; 10; 14
ten: Nam; Nữ
donvi: học sinh
[/bieudo]

Nhận xét: câu lạc bộ Bóng rổ có nhiều nam hơn nữ; Múa có nhiều nữ hơn nam rất nhiều; Cầu lông có số nam, nữ gần bằng nhau.`),
              ],
            },
            {
              slug: 'chuyen-du-lieu-sang-bieu-do-quat',
              title: 'Chuyển dữ liệu từ bảng sang biểu đồ hình quạt tròn',
              levels: [2, 3],
              knowledge: r`Tỉ lệ phần trăm \(\dfrac{a}{N}\cdot100\%\); góc ở tâm của hình quạt \(p\%\cdot360^\circ\).`,
              signs: 'Đề cho số lượng các thành phần của một tổng thể và yêu cầu tính tỉ lệ phần trăm, góc ở tâm hoặc vẽ biểu đồ hình quạt tròn.',
              method: 'Tính tổng, tính tỉ lệ phần trăm từng thành phần (tổng phải bằng 100%), rồi biểu diễn trên hình tròn.',
              steps: `- **Bước 1.** Tính tổng số lượng N.
- **Bước 2.** Tính tỉ lệ phần trăm từng thành phần; kiểm tra tổng bằng 100%.
- **Bước 3.** (Nếu vẽ) đổi sang góc ở tâm, chia hình tròn và ghi chú giải.`,
              mistakes: '- Chia cho số lượng của một thành phần thay vì chia cho tổng.\n- Các tỉ lệ cộng lại khác 100% mà không phát hiện sai sót.',
              example: 'Kết quả khảo sát 40 học sinh về phương tiện đến trường: Xe đạp 18; Đi bộ 10; Xe buýt 8; Bố mẹ đưa 4. Lập bảng tỉ lệ phần trăm và biểu diễn bằng biểu đồ hình quạt tròn.',
              solution: `Tỉ lệ: Xe đạp \\(\\dfrac{18}{40} = 45\\%\\); Đi bộ 25%; Xe buýt 20%; Bố mẹ đưa 10% (tổng 100%).

[bieudo]
loai: quat
tieude: Phương tiện đến trường của 40 học sinh
nhan: Xe đạp; Đi bộ; Xe buýt; Bố mẹ đưa
so lieu: 18; 10; 8; 4
[/bieudo]`,
              exercises: [
                sa(2, 'Khảo sát 50 học sinh, có 12 em chọn môn Toán là môn yêu thích nhất. Tỉ lệ phần trăm số em chọn môn Toán là bao nhiêu?', ['24'], r`\(\dfrac{12}{50}\cdot100\% = 24\%\).`, '%'),
                sa(3, 'Trong biểu đồ hình quạt tròn, thành phần chiếm 25% được biểu diễn bởi hình quạt có góc ở tâm bằng bao nhiêu độ?', ['90'], r`\(25\%\cdot360^\circ = 90^\circ\).`, '°'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 20 ----------------
    {
      slug: 'bai-20-phan-tich-so-lieu-thong-ke-dua-vao-bieu-do',
      difficulty: 2,
      objectives: `- Phát hiện vấn đề, quy luật đơn giản dựa trên phân tích số liệu ở biểu đồ cột, cột kép, đoạn thẳng, hình quạt tròn.
- Giải quyết vấn đề đơn giản liên quan đến các số liệu đó.
- Nhận biết biểu đồ biểu diễn sai hoặc gây hiểu lầm.`,
      prerequisites: '- Các loại biểu đồ (Bài 19).\n- Tỉ số, tỉ số phần trăm.',
      concepts: 'Xu hướng tăng, giảm; giá trị lớn nhất, nhỏ nhất; mức tăng (giảm); tỉ lệ tăng (giảm); biểu đồ gây hiểu lầm.',
      formulas: r`Tỉ lệ tăng (giảm) từ \(a\) đến \(b\): \(\dfrac{b - a}{a}\cdot100\%\). Số lượng ứng với \(p\%\) của tổng \(N\): \(p\%\cdot N\).`,
      properties: '- Mức tăng = giá trị sau − giá trị trước (âm nghĩa là giảm).\n- Biểu đồ có trục đứng không bắt đầu từ 0 hoặc chia không đều dễ gây hiểu lầm về độ chênh lệch.',
      themes: [
        {
          title: 'Đọc và phân tích biểu đồ',
          description: 'Đọc số liệu, so sánh, tính mức tăng giảm, tỉ lệ phần trăm từ biểu đồ.',
          types: [
            {
              slug: 'phan-tich-bieu-do-cot',
              title: 'Đọc, phân tích biểu đồ cột và cột kép',
              levels: [1, 2, 3],
              knowledge: 'Chiều cao cột biểu diễn số liệu; biểu đồ cột kép so sánh hai nhóm số liệu tại cùng đối tượng.',
              signs: 'Đề cho biểu đồ cột (cột kép) và hỏi giá trị lớn nhất, nhỏ nhất, tổng, chênh lệch, tỉ lệ tăng giảm.',
              method: 'Đọc chính xác số liệu từng cột (theo chú giải với cột kép), lập phép tính theo câu hỏi.',
              steps: `- **Bước 1.** Đọc tên biểu đồ, đơn vị, chú giải.
- **Bước 2.** Ghi lại số liệu từng cột cần dùng.
- **Bước 3.** Tính (tổng, hiệu, tỉ lệ phần trăm) và trả lời kèm đơn vị.`,
              mistakes: '- Nhầm hai dãy cột trong biểu đồ cột kép.\n- Tính tỉ lệ tăng chia cho giá trị sau thay vì giá trị trước.',
              example: `Biểu đồ dưới đây cho biết số học sinh giỏi của các lớp khối 8 ở hai học kì. Lớp nào có số học sinh giỏi tăng nhiều nhất từ học kì I sang học kì II?

${HSG}`,
              solution: 'Mức tăng: 8A tăng 4; 8B tăng 1; 8C tăng 5; 8D không đổi. Lớp 8C tăng nhiều nhất (5 học sinh).',
              exercises: [
                mcq(1, `Theo biểu đồ, lớp nào quyên góp được nhiều sách nhất?

${SACH}`, ['8B', '8A', '8C', '8D'], 'A', 'Cột của lớp 8B cao nhất (60 cuốn).'),
                sa(2, `Theo biểu đồ, cả bốn lớp quyên góp được tổng cộng bao nhiêu cuốn sách?

${SACH}`, ['190'], '45 + 60 + 50 + 35 = 190 cuốn.', 'cuốn'),
                sa(3, `Theo biểu đồ, tổng số học sinh giỏi của bốn lớp ở học kì II tăng bao nhiêu phần trăm so với học kì I (làm tròn đến hàng đơn vị)?

${HSG}`, ['30'], r`Học kì I: \(8 + 10 + 6 + 9 = 33\); học kì II: \(12 + 11 + 11 + 9 = 43\). Tỉ lệ tăng \(\dfrac{43 - 33}{33}\cdot100\% \approx 30\%\).`, '%'),
              ],
            },
            {
              slug: 'phan-tich-bieu-do-doan-thang',
              title: 'Đọc, phân tích biểu đồ đoạn thẳng',
              levels: [1, 2, 3],
              knowledge: 'Mỗi điểm biểu diễn số liệu tại một thời điểm; đoạn thẳng đi lên là tăng, đi xuống là giảm, càng dốc thay đổi càng nhanh.',
              signs: 'Đề cho biểu đồ đoạn thẳng và hỏi thời điểm lớn nhất, nhỏ nhất, mức tăng giảm, xu hướng, khoảng thời gian thay đổi nhanh nhất.',
              method: 'Đọc số liệu tại các mốc, tính mức thay đổi giữa các mốc liên tiếp và so sánh.',
              steps: `- **Bước 1.** Đọc số liệu tại từng mốc thời gian.
- **Bước 2.** Tính mức thay đổi giữa các mốc cần xét.
- **Bước 3.** So sánh, nhận xét xu hướng và trả lời.`,
              mistakes: '- Đánh giá tốc độ thay đổi bằng mắt mà không tính mức thay đổi.\n- Nhầm mốc thời gian.',
              example: `Biểu đồ cho biết số lượt mượn sách ở thư viện trường. Tháng nào có nhiều lượt mượn nhất? Từ tháng 11 đến tháng 12 số lượt mượn thay đổi thế nào?

${MUON_SACH}`,
              solution: 'Tháng 11 có nhiều lượt mượn nhất (180 lượt). Từ tháng 11 đến tháng 12 giảm 180 − 140 = 40 lượt.',
              exercises: [
                mcq(1, `Theo biểu đồ, tháng có số lượt mượn sách ít nhất là

${MUON_SACH}`, ['Tháng 9', 'Tháng 10', 'Tháng 12', 'Tháng 1'], 'A', 'Điểm thấp nhất ứng với tháng 9 (120 lượt).'),
                sa(2, `Theo biểu đồ, từ tháng 9 đến tháng 11 số lượt mượn sách tăng bao nhiêu phần trăm?

${MUON_SACH}`, ['50'], r`\(\dfrac{180 - 120}{120}\cdot100\% = 50\%\).`, '%'),
                mcq(3, `Theo biểu đồ, trong khoảng 3 giờ nào nhiệt độ tăng nhanh nhất?

${NHIET_DO}`, ['Từ 9 giờ đến 12 giờ', 'Từ 6 giờ đến 9 giờ', 'Từ 12 giờ đến 15 giờ', 'Từ 15 giờ đến 18 giờ'], 'A', 'Mức tăng: 6 → 9 giờ tăng 4 °C; 9 → 12 giờ tăng 5 °C; sau 12 giờ nhiệt độ giảm. Nhanh nhất là từ 9 giờ đến 12 giờ.'),
              ],
            },
            {
              slug: 'phan-tich-bieu-do-quat-tron',
              title: 'Đọc, phân tích biểu đồ hình quạt tròn',
              levels: [1, 2, 3],
              knowledge: r`Mỗi hình quạt biểu diễn tỉ lệ phần trăm của một thành phần; số lượng ứng với \(p\%\) của tổng \(N\) là \(p\%\cdot N\).`,
              signs: 'Đề cho biểu đồ hình quạt tròn (kèm tổng số) và hỏi tỉ lệ, số lượng của các thành phần hoặc so sánh chúng.',
              method: 'Đọc tỉ lệ phần trăm, nhân với tổng để được số lượng; so sánh các thành phần.',
              steps: r`- **Bước 1.** Đọc tỉ lệ phần trăm của các thành phần cần dùng.
- **Bước 2.** Tính số lượng: \(p\%\cdot N\).
- **Bước 3.** So sánh, trả lời.`,
              mistakes: '- Lấy tỉ lệ phần trăm làm số lượng.\n- Quên nhân với tổng số.',
              example: `Biểu đồ cho biết môn thể thao yêu thích của 200 học sinh. Có bao nhiêu học sinh thích bóng đá?

${THE_THAO}`,
              solution: r`Bóng đá chiếm 40% nên số học sinh thích bóng đá là \(40\%\cdot200 = 80\) học sinh.`,
              exercises: [
                sa(1, `Theo biểu đồ, môn được yêu thích nhất chiếm bao nhiêu phần trăm?

${THE_THAO}`, ['40'], 'Bóng đá chiếm tỉ lệ lớn nhất: 40%.', '%'),
                sa(2, `Theo biểu đồ, có bao nhiêu học sinh chọn môn Cầu lông?

${THE_THAO}`, ['50'], r`\(25\%\cdot200 = 50\) học sinh.`, 'học sinh'),
                sa(3, `Theo biểu đồ, số học sinh chọn Bóng đá nhiều hơn số học sinh chọn Cờ vua bao nhiêu em?

${THE_THAO}`, ['50'], r`\((40\% - 15\%)\cdot200 = 25\%\cdot200 = 50\) em.`, 'em'),
              ],
            },
          ],
        },
        {
          title: 'Đánh giá biểu đồ',
          description: 'Phát hiện biểu đồ biểu diễn sai hoặc gây hiểu lầm.',
          types: [
            {
              slug: 'bieu-do-gay-hieu-lam',
              title: 'Nhận biết biểu đồ biểu diễn sai, gây hiểu lầm',
              levels: [3, 4],
              knowledge: 'Biểu đồ đúng cần: trục đứng bắt đầu từ 0 và chia đều; tổng các tỉ lệ trong biểu đồ hình quạt bằng 100%; số liệu khớp với bảng.',
              signs: 'Đề cho một biểu đồ (hoặc mô tả biểu đồ) và hỏi biểu đồ có hợp lí, có gây hiểu lầm không.',
              method: 'Kiểm tra trục, tỉ lệ chia, tổng phần trăm, sự khớp giữa số liệu và hình vẽ; so sánh độ chênh lệch thực tế với cảm nhận từ hình.',
              steps: `- **Bước 1.** Kiểm tra trục đứng: có bắt đầu từ 0, có chia đều không.
- **Bước 2.** Với biểu đồ hình quạt: kiểm tra tổng các tỉ lệ bằng 100%.
- **Bước 3.** So sánh chênh lệch thực tế với chênh lệch thể hiện trên hình; kết luận.`,
              mistakes: '- Chỉ nhìn chiều cao cột để kết luận mà không đọc giá trị trên trục.',
              example: 'Doanh thu tháng của hai cửa hàng A, B là 98 triệu đồng và 102 triệu đồng. Một biểu đồ cột có trục đứng bắt đầu từ 96 khiến cột B cao gấp ba lần cột A. Biểu đồ này có gây hiểu lầm không? Vì sao?',
              solution: r`Có. Trên hình, cột B cao gấp ba cột A, nhưng thực tế B chỉ hơn A \(\dfrac{102 - 98}{98}\cdot100\% \approx 4\%\). Nguyên nhân: trục đứng không bắt đầu từ 0.`,
              exercises: [
                tf(3, 'Mỗi khẳng định sau về biểu đồ đúng hay sai?', [
                  ['Biểu đồ cột có trục đứng không bắt đầu từ 0 có thể làm chênh lệch giữa các cột trông lớn hơn thực tế.', true],
                  ['Trong biểu đồ hình quạt tròn, tổng các tỉ lệ phần trăm phải bằng 100%.', true],
                  ['Trục đứng của biểu đồ cột có thể chia không đều miễn là ghi đủ số.', false],
                  ['Cột cao gấp đôi luôn có nghĩa là số liệu gấp đôi, dù trục bắt đầu từ bất kì giá trị nào.', false],
                ], 'a) Đúng. b) Đúng. c) Sai: chia không đều làm sai lệch hình ảnh. d) Sai: chỉ đúng khi trục bắt đầu từ 0.'),
                es(4, 'Một biểu đồ hình quạt tròn về phương tiện đến trường ghi: Xe đạp 45%, Đi bộ 30%, Xe buýt 20%, Khác 10%. Biểu đồ này sai ở đâu? Nêu cách kiểm tra lại.', 'Tổng các tỉ lệ là 45% + 30% + 20% + 10% = 105% ≠ 100%, nên ít nhất một số liệu bị sai. Cần đối chiếu lại số lượng từng nhóm với tổng số học sinh được khảo sát và tính lại các tỉ lệ.'),
              ],
            },
          ],
        },
      ],
    },
  ],
};
