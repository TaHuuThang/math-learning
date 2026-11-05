/** Chương V. Dữ liệu và biểu đồ – nội dung bài học giai đoạn 3 (Bài 18 – Bài 20). */
import { ex, fc, r, th, type LessonContent } from './types';

const CLB = `[bieudo]
loai: cot
tieude: Số học sinh tham gia các câu lạc bộ
nhan: Toán; Tiếng Anh; Bóng đá; Mĩ thuật
so lieu: 35; 42; 30; 18
donvi: học sinh
[/bieudo]`;

const HSG = `[bieudo]
loai: cotkep
tieude: Số học sinh giỏi của các lớp khối 8
nhan: 8A; 8B; 8C; 8D
so lieu: 7; 9; 5; 8
so lieu 2: 10; 12; 11; 8
ten: Học kì I; Học kì II
donvi: học sinh
[/bieudo]`;

const BAO_TANG = `[bieudo]
loai: doanthang
tieude: Số lượt khách tham quan một bảo tàng
nhan: 2019; 2020; 2021; 2022; 2023; 2024
so lieu: 58; 30; 20; 45; 60; 72
donvi: nghìn lượt
[/bieudo]`;

const RAC = `[bieudo]
loai: quat
tieude: Tỉ lệ các loại rác thải sinh hoạt của một khu dân cư
nhan: Hữu cơ; Nhựa; Giấy; Loại khác
so lieu: 55; 20; 15; 10
[/bieudo]`;

const BAI_18: LessonContent = {
  slug: 'bai-18-thu-thap-va-phan-loai-du-lieu',
  applications: r`- Khảo sát ý kiến học sinh về món ăn bán trú, câu lạc bộ, giờ học thêm.
- Thu thập số liệu thời tiết, dân số, giá cả từ các nguồn tin cậy để học tập và nghiên cứu.
- Kiểm tra số liệu trước khi dùng: phát hiện số liệu nhập sai, mẫu khảo sát không đại diện.`,
  theory: [
    th('concept', 'Dữ liệu', r`**Dữ liệu** là các thông tin thu thập được (số, chữ, hình ảnh, …) về một vấn đề cần tìm hiểu. Muốn rút ra kết luận đúng, cần thu thập dữ liệu đúng cách và kiểm tra tính hợp lí của dữ liệu.`),
    th('rule', 'Phương pháp thu thập dữ liệu', r`- **Thu thập trực tiếp**: quan sát, làm thí nghiệm, lập phiếu hỏi, phỏng vấn.
- **Thu thập gián tiếp**: lấy từ nguồn có sẵn như sách báo, trang web, cơ quan thống kê.`, undefined,
      r`Đếm số xe qua cổng trường là thu thập trực tiếp; lấy dân số các tỉnh từ trang của Tổng cục Thống kê là thu thập gián tiếp.`),
    th('definition', 'Phân loại dữ liệu', r`- **Dữ liệu định lượng** (là số): **rời rạc** (đếm được: số anh chị em) hoặc **liên tục** (đo được: chiều cao, cân nặng).
- **Dữ liệu định tính** (không phải là số): có thể **sắp thứ tự** (mức độ hài lòng, xếp loại) hoặc **không sắp thứ tự** (màu sắc, môn học yêu thích).`),
    th('condition', 'Tính hợp lí của dữ liệu', r`Dữ liệu hợp lí khi: đúng định dạng, đúng đơn vị, nằm trong phạm vi có thể xảy ra trong thực tế và phù hợp với câu hỏi khảo sát.`, undefined,
      r`Chiều cao học sinh lớp 8 là \(415\) cm là không hợp lí (có thể gõ nhầm từ \(145\)).`),
    th('condition', 'Tính đại diện của dữ liệu', r`Mẫu khảo sát phải **đại diện** cho toàn bộ đối tượng cần nghiên cứu: đủ lớn, được chọn ngẫu nhiên và có mặt các nhóm khác nhau (khối lớp, nam nữ, …).`),
    th('note', 'Lưu ý', r`Kết luận rút ra từ mẫu không đại diện (chỉ hỏi một nhóm nhỏ, cùng sở thích) dễ sai lệch. Trước khi phân tích, hãy loại bỏ hoặc kiểm tra lại các số liệu bất thường.`),
  ],
  formulas: [
    {
      group: 'Xử lí dữ liệu',
      items: [
        fc('Tỉ lệ phần trăm', r`\text{Tỉ lệ} = \dfrac{a}{n}\cdot100\%`, r`- \(a\): số đối tượng có tính chất cần xét
- \(n\): tổng số đối tượng`, r`12 trong 40 bạn đi xe đạp: \(\dfrac{12}{40}\cdot100\% = 30\%\).`),
        fc('Số trung bình cộng', r`\overline{x} = \dfrac{x_1 + x_2 + \dots + x_n}{n}`, r`- \(x_1, \dots, x_n\): các giá trị
- \(n\): số giá trị`, r`Trung bình của \(6; 7; 8\) là \(7\).`, 'Chỉ dùng cho dữ liệu định lượng.'),
      ],
    },
  ],
  examples: {
    'phuong-phap-thu-thap-du-lieu': [
      ex(1, r`Cho biết phương pháp thu thập dữ liệu trong mỗi trường hợp:
a) Đếm số xe máy đi qua cổng trường từ 6 giờ 30 đến 7 giờ.
b) Lấy số liệu dân số các tỉnh trên trang web của Tổng cục Thống kê.
c) Phát phiếu hỏi về món ăn yêu thích của các bạn trong lớp.`,
        'Xét xem người thu thập tự tạo ra dữ liệu (quan sát, hỏi) hay lấy từ nguồn có sẵn.',
        'Phương pháp thu thập trực tiếp, gián tiếp.',
        [r`a) Tự quan sát, đếm: thu thập **trực tiếp**.`, r`b) Lấy từ nguồn có sẵn: thu thập **gián tiếp**.`, r`c) Lập phiếu hỏi: thu thập **trực tiếp**.`],
        'a) trực tiếp; b) gián tiếp; c) trực tiếp.'),
      ex(2, r`Bạn Lan muốn tìm hiểu thời gian tự học ở nhà mỗi ngày của các bạn lớp 8A. Hãy đề xuất cách thu thập dữ liệu và thiết kế một câu hỏi trong phiếu khảo sát.`,
        'Đối tượng là các bạn trong lớp nên có thể hỏi trực tiếp; câu hỏi cần rõ ràng, có phương án dễ trả lời.',
        'Phương pháp thu thập trực tiếp bằng phiếu hỏi.',
        [r`Chọn phương pháp trực tiếp: phát phiếu hỏi cho tất cả học sinh lớp 8A (không ghi tên để các bạn trả lời trung thực).`, r`Câu hỏi: "Mỗi ngày em tự học ở nhà bao lâu?" với các lựa chọn: dưới 1 giờ; từ 1 đến dưới 2 giờ; từ 2 đến dưới 3 giờ; từ 3 giờ trở lên.`, r`Thu phiếu, đếm số bạn chọn mỗi phương án và ghi vào bảng thống kê.`],
        'Thu thập trực tiếp bằng phiếu hỏi với các khoảng thời gian rõ ràng, không trùng nhau.',
        'Các phương án trả lời không được chồng lấn (ví dụ "1–2 giờ" và "2–3 giờ" cùng chứa 2 giờ).'),
    ],
    'tinh-hop-li-dai-dien-du-lieu': [
      ex(2, r`Bạn Minh ghi chiều cao (cm) của 6 bạn trong tổ: \(152\); \(148\); \(1{,}55\); \(160\); \(415\); \(157\). Chỉ ra các dữ liệu không hợp lí.`,
        'So sánh từng số liệu với đơn vị và phạm vi chiều cao thực tế của học sinh lớp 8.',
        'Tính hợp lí của dữ liệu.',
        [r`Chiều cao học sinh lớp 8 thường từ khoảng \(130\) cm đến \(180\) cm.`, r`\(1{,}55\) ghi theo mét, sai đơn vị (đúng phải là \(155\) cm).`, r`\(415\) cm là không thể xảy ra, có thể gõ nhầm (ví dụ \(145\)).`],
        r`Hai dữ liệu không hợp lí: \(1{,}55\) và \(415\); cần đo hoặc ghi lại.`),
      ex(3, r`Để biết học sinh của trường thích môn thể thao nào nhất, bạn An hỏi 30 bạn trong đội bóng đá của trường và kết luận: "Đa số học sinh trường em thích bóng đá nhất". Kết luận này có đáng tin không? Hãy đề xuất cách chọn mẫu tốt hơn.`,
        'Xét xem mẫu 30 bạn trong đội bóng có đại diện cho toàn trường không.',
        'Tính đại diện của mẫu khảo sát.',
        [r`Các bạn trong đội bóng đá đương nhiên thích bóng đá nên mẫu bị lệch, không đại diện cho toàn trường.`, r`Kết luận vì vậy không đáng tin.`, r`Cách tốt hơn: chọn ngẫu nhiên mỗi lớp một số bạn (cả nam và nữ, đủ các khối 6 – 9), tổng số đủ lớn (ví dụ 10 bạn mỗi lớp).`],
        'Kết luận không đáng tin vì mẫu không đại diện; cần chọn mẫu ngẫu nhiên ở tất cả các lớp, các khối.',
        'Mẫu đại diện: đủ lớn, ngẫu nhiên, có mặt các nhóm khác nhau.'),
    ],
    'phan-loai-du-lieu': [
      ex(1, r`Phân loại các dữ liệu sau: a) Cân nặng (kg) của học sinh; b) Màu sắc yêu thích; c) Số anh chị em ruột; d) Mức độ hài lòng: rất hài lòng, hài lòng, không hài lòng.`,
        'Xét dữ liệu có phải là số không; nếu là số thì đếm hay đo; nếu không là số thì có sắp được thứ tự không.',
        'Dữ liệu định lượng (rời rạc, liên tục), dữ liệu định tính (có thứ tự, không có thứ tự).',
        [r`a) Cân nặng là số, đo được: định lượng **liên tục**.`, r`b) Màu sắc không phải số, không sắp thứ tự: định tính.`, r`c) Số anh chị em là số đếm được: định lượng **rời rạc**.`, r`d) Mức độ hài lòng không phải số nhưng sắp thứ tự được: định tính **có thứ tự**.`],
        'a) định lượng liên tục; b) định tính; c) định lượng rời rạc; d) định tính có thứ tự.'),
      ex(2, r`Phiếu thông tin học sinh gồm: họ và tên; năm sinh; chiều cao; xếp loại học tập (Tốt, Khá, Đạt, Chưa đạt); môn học yêu thích; số giờ ngủ mỗi đêm. Hãy phân loại các dữ liệu này.`,
        'Lần lượt xét từng mục theo hai câu hỏi: có phải là số? sắp thứ tự được không?',
        'Phân loại dữ liệu.',
        [r`Dữ liệu định lượng: năm sinh (rời rạc), chiều cao (liên tục), số giờ ngủ mỗi đêm (liên tục).`, r`Dữ liệu định tính: họ và tên, môn học yêu thích (không có thứ tự); xếp loại học tập (có thứ tự).`],
        'Định lượng: năm sinh, chiều cao, số giờ ngủ. Định tính: họ tên, môn học yêu thích, xếp loại học tập.',
        'Dữ liệu là số nhưng chỉ dùng làm mã (số báo danh) vẫn không dùng để tính toán như dữ liệu định lượng.'),
    ],
  },
  notes: {
    'phuong-phap-thu-thap-du-lieu': 'Tự quan sát, hỏi, thí nghiệm là trực tiếp; lấy từ nguồn có sẵn là gián tiếp. Câu hỏi khảo sát cần rõ ràng, các phương án không chồng nhau.',
    'tinh-hop-li-dai-dien-du-lieu': 'Kiểm tra đơn vị, phạm vi thực tế của từng số liệu; mẫu khảo sát phải đại diện cho toàn bộ đối tượng.',
    'phan-loai-du-lieu': 'Hỏi hai câu: dữ liệu có phải là số? Nếu là số thì đếm (rời rạc) hay đo (liên tục); nếu không thì có sắp thứ tự không.',
  },
};

const BAI_19: LessonContent = {
  slug: 'bai-19-bieu-dien-du-lieu-bang-bang-bieu-do',
  applications: r`- Trình bày kết quả khảo sát của lớp bằng biểu đồ trong giờ sinh hoạt, báo tường.
- Đọc nhanh thông tin trên báo, bản tin thời tiết, báo cáo kinh doanh.
- Chọn biểu đồ phù hợp để thuyết trình rõ ràng, thuyết phục.`,
  theory: [
    th('concept', 'Các cách biểu diễn dữ liệu', r`Dữ liệu có thể biểu diễn bằng **bảng thống kê**, **biểu đồ tranh**, **biểu đồ cột**, **biểu đồ cột kép**, **biểu đồ đoạn thẳng**, **biểu đồ hình quạt tròn**. Cùng một dữ liệu có thể chuyển từ dạng này sang dạng khác.`),
    th('rule', 'Chọn biểu đồ phù hợp', r`- So sánh số lượng của các đối tượng: **biểu đồ cột**.
- So sánh hai nhóm dữ liệu cùng loại: **biểu đồ cột kép**.
- Thể hiện sự thay đổi theo thời gian (xu hướng): **biểu đồ đoạn thẳng**.
- Thể hiện tỉ lệ các phần trong một tổng thể: **biểu đồ hình quạt tròn**.`),
    th('rule', 'Các bước vẽ biểu đồ cột', r`- Vẽ trục ngang (ghi đối tượng) và trục đứng (ghi số liệu), chọn đơn vị chia đều bắt đầu từ 0.
- Vẽ các cột có chiều rộng bằng nhau, chiều cao bằng số liệu.
- Ghi tên biểu đồ, đơn vị, chú giải (nếu là cột kép).`),
    th('rule', 'Chuyển dữ liệu sang biểu đồ hình quạt tròn', r`Tính tỉ lệ phần trăm của mỗi phần so với tổng; mỗi phần được biểu diễn bằng một hình quạt có góc ở tâm tương ứng.`, r`\text{Góc ở tâm} = \text{tỉ lệ phần trăm}\cdot360^\circ`,
      r`Phần chiếm \(25\%\) ứng với hình quạt có góc \(0{,}25\cdot360^\circ = 90^\circ\).`),
    th('note', 'Lưu ý', r`- Tổng các tỉ lệ trong biểu đồ hình quạt phải bằng \(100\%\).
- Trục số liệu của biểu đồ cột nên bắt đầu từ 0 và chia đều để không gây hiểu lầm.`),
  ],
  formulas: [
    {
      group: 'Biểu đồ hình quạt tròn',
      items: [
        fc('Tỉ lệ phần trăm của mỗi phần', r`p = \dfrac{a}{n}\cdot100\%`, r`- \(a\): số lượng của phần đó
- \(n\): tổng số lượng`, r`\(\dfrac{18}{40}\cdot100\% = 45\%\).`),
        fc('Góc ở tâm của hình quạt', r`\alpha = \dfrac{a}{n}\cdot360^\circ`, r`- \(\alpha\): số đo góc ở tâm
- \(a\), \(n\): như trên`, r`\(45\%\) ứng với \(0{,}45\cdot360^\circ = 162^\circ\).`),
      ],
    },
  ],
  examples: {
    'chon-dang-bieu-do': [
      ex(1, r`Nên dùng loại biểu đồ nào để biểu diễn: a) Lượng mưa các tháng trong năm; b) Tỉ lệ các loại rác thải của một khu phố; c) Số học sinh giỏi của các lớp khối 8?`,
        'Xác định mục đích: xem xu hướng theo thời gian, xem tỉ lệ trong tổng thể hay so sánh số lượng.',
        'Cách chọn biểu đồ phù hợp.',
        [r`a) Thay đổi theo thời gian: biểu đồ đoạn thẳng.`, r`b) Tỉ lệ các phần trong tổng thể: biểu đồ hình quạt tròn.`, r`c) So sánh số lượng các lớp: biểu đồ cột.`],
        'a) đoạn thẳng; b) hình quạt tròn; c) cột.'),
      ex(2, r`Bảng sau cho biết số học sinh nam và nữ tham gia các câu lạc bộ: Toán (12 nam, 10 nữ), Văn (5 nam, 14 nữ), Tiếng Anh (9 nam, 13 nữ), Thể thao (18 nam, 8 nữ). Nên chọn biểu đồ nào để so sánh số học sinh nam, nữ ở từng câu lạc bộ? Vì sao không nên dùng biểu đồ hình quạt?`,
        'Có hai nhóm dữ liệu (nam, nữ) trên cùng các đối tượng (câu lạc bộ).',
        'Biểu đồ cột kép; ý nghĩa của biểu đồ hình quạt tròn.',
        [r`Cần so sánh hai nhóm dữ liệu cùng loại trên từng câu lạc bộ: dùng biểu đồ cột kép.`, r`Biểu đồ hình quạt chỉ biểu diễn tỉ lệ các phần của **một** tổng thể, không so sánh trực tiếp được hai nhóm trên nhiều đối tượng.`],
        'Dùng biểu đồ cột kép.',
        'Nếu chỉ hỏi "tỉ lệ học sinh của mỗi câu lạc bộ trong tổng số" thì mới dùng hình quạt.'),
    ],
    've-bieu-do': [
      ex(2, r`Số sách các tổ của lớp 8A đọc được trong tháng 10: Tổ 1: 12 cuốn; Tổ 2: 18 cuốn; Tổ 3: 15 cuốn; Tổ 4: 9 cuốn. Vẽ biểu đồ cột biểu diễn dữ liệu trên.`,
        'Bốn đối tượng (tổ) cần so sánh số lượng: dùng biểu đồ cột.',
        'Các bước vẽ biểu đồ cột.',
        [r`Trục ngang ghi Tổ 1, Tổ 2, Tổ 3, Tổ 4; trục đứng ghi số sách, chia đều từ 0 đến 20 (mỗi vạch 2 hoặc 5 cuốn).`, r`Vẽ bốn cột rộng bằng nhau, cao lần lượt 12; 18; 15; 9.`, r`Ghi tên biểu đồ và đơn vị "cuốn".`],
        r`Biểu đồ:
[bieudo]
loai: cot
tieude: Số sách các tổ lớp 8A đọc trong tháng 10
nhan: Tổ 1; Tổ 2; Tổ 3; Tổ 4
so lieu: 12; 18; 15; 9
donvi: cuốn
[/bieudo]`),
      ex(3, r`Nhiệt độ trung bình (°C) các tháng đầu năm ở một thành phố: Tháng 1: 17; Tháng 2: 18; Tháng 3: 20; Tháng 4: 24; Tháng 5: 28; Tháng 6: 30. Vẽ biểu đồ phù hợp và nhận xét xu hướng nhiệt độ.`,
        'Dữ liệu thay đổi theo thời gian nên dùng biểu đồ đoạn thẳng.',
        'Biểu đồ đoạn thẳng; nhận xét xu hướng.',
        [r`Trục ngang: các tháng; trục đứng: nhiệt độ (°C).`, r`Đánh dấu 6 điểm (tháng, nhiệt độ) rồi nối liên tiếp bằng các đoạn thẳng.`, r`Nhận xét: nhiệt độ tăng liên tục từ tháng 1 đến tháng 6; tăng nhanh nhất từ tháng 3 sang tháng 4 và từ tháng 4 sang tháng 5 (tăng 4 °C).`],
        r`Biểu đồ đoạn thẳng cho thấy nhiệt độ tăng dần:
[bieudo]
loai: doanthang
tieude: Nhiệt độ trung bình các tháng
nhan: T1; T2; T3; T4; T5; T6
so lieu: 17; 18; 20; 24; 28; 30
donvi: °C
[/bieudo]`,
        'Đoạn thẳng càng dốc thì đại lượng thay đổi càng nhanh.'),
    ],
    'chuyen-du-lieu-sang-bieu-do-quat': [
      ex(2, r`Kết quả khảo sát phương tiện đến trường của 40 học sinh: đi bộ 10 bạn; xe đạp 18 bạn; xe buýt 4 bạn; bố mẹ đưa 8 bạn. Tính tỉ lệ phần trăm mỗi loại để biểu diễn bằng biểu đồ hình quạt tròn.`,
        'Mỗi hình quạt biểu diễn tỉ lệ phần trăm số học sinh so với tổng 40.',
        'Tỉ lệ phần trăm; biểu đồ hình quạt tròn.',
        [r`Đi bộ: \(\dfrac{10}{40}\cdot100\% = 25\%\); xe đạp: \(\dfrac{18}{40}\cdot100\% = 45\%\).`, r`Xe buýt: \(\dfrac{4}{40}\cdot100\% = 10\%\); bố mẹ đưa: \(\dfrac{8}{40}\cdot100\% = 20\%\).`, r`Kiểm tra: \(25\% + 45\% + 10\% + 20\% = 100\%\).`],
        r`Tỉ lệ: 25%; 45%; 10%; 20%.
[bieudo]
loai: quat
tieude: Phương tiện đến trường của 40 học sinh
nhan: Đi bộ; Xe đạp; Xe buýt; Bố mẹ đưa
so lieu: 25; 45; 10; 20
[/bieudo]`),
      ex(3, r`Một cửa hàng bán được 250 chiếc áo gồm: cỡ S 50 chiếc, cỡ M 100 chiếc, cỡ L 75 chiếc, cỡ XL 25 chiếc. Lập bảng tỉ lệ phần trăm và số đo góc ở tâm của mỗi hình quạt, rồi vẽ biểu đồ hình quạt tròn.`,
        'Tính tỉ lệ phần trăm trước, sau đó nhân với 360° để được góc ở tâm.',
        'Tỉ lệ phần trăm; góc ở tâm của hình quạt.',
        [r`Tỉ lệ: S \(\dfrac{50}{250} = 20\%\); M \(40\%\); L \(30\%\); XL \(10\%\).`, r`Góc ở tâm: S \(0{,}2\cdot360^\circ = 72^\circ\); M \(144^\circ\); L \(108^\circ\); XL \(36^\circ\).`, r`Kiểm tra: \(72^\circ + 144^\circ + 108^\circ + 36^\circ = 360^\circ\).`],
        r`Bảng: S 20% (72°); M 40% (144°); L 30% (108°); XL 10% (36°).
[bieudo]
loai: quat
tieude: Tỉ lệ áo bán được theo cỡ
nhan: S; M; L; XL
so lieu: 20; 40; 30; 10
[/bieudo]`,
        'Tổng các góc ở tâm luôn bằng 360°.'),
    ],
  },
  notes: {
    'chon-dang-bieu-do': 'Hỏi mục đích: so sánh (cột, cột kép), xu hướng theo thời gian (đoạn thẳng), tỉ lệ trong tổng thể (hình quạt).',
    've-bieu-do': 'Trục số liệu bắt đầu từ 0, chia đều; luôn ghi tên biểu đồ, đơn vị và chú giải.',
    'chuyen-du-lieu-sang-bieu-do-quat': 'Tính tỉ lệ phần trăm, kiểm tra tổng bằng 100%; góc ở tâm bằng tỉ lệ nhân 360°.',
  },
};

const BAI_20: LessonContent = {
  slug: 'bai-20-phan-tich-so-lieu-thong-ke-dua-vao-bieu-do',
  applications: r`- Đọc hiểu biểu đồ trên báo chí, bản tin, báo cáo của trường lớp.
- Phát hiện xu hướng (tăng, giảm) để dự đoán, lập kế hoạch: lượng khách, doanh thu, lượng mưa.
- Nhận ra biểu đồ "đánh lừa thị giác" trong quảng cáo để không bị hiểu sai.`,
  theory: [
    th('rule', 'Đọc biểu đồ', r`Xác định: tên biểu đồ, các đối tượng (trục ngang hoặc chú giải), đơn vị đo, giá trị của từng đối tượng.`),
    th('rule', 'Phân tích số liệu từ biểu đồ', r`- Tìm giá trị lớn nhất, nhỏ nhất; so sánh các giá trị.
- Tính tổng, hiệu, tỉ số, tỉ lệ phần trăm.
- Nhận xét xu hướng tăng, giảm theo thời gian; rút ra kết luận.`),
    th('property', 'Biểu đồ đoạn thẳng', r`Đoạn thẳng đi lên: đại lượng tăng; đi xuống: giảm; nằm ngang: không đổi. Đoạn càng dốc thì thay đổi càng nhanh.`),
    th('property', 'Biểu đồ hình quạt tròn', r`Cả hình tròn ứng với \(100\%\). Số lượng của một phần bằng tổng số nhân với tỉ lệ phần trăm của phần đó.`, r`a = n\cdot p\%`),
    th('note', 'Biểu đồ gây hiểu lầm', r`Một biểu đồ có thể gây hiểu lầm khi:
- Trục số liệu không bắt đầu từ 0 hoặc chia không đều (làm chênh lệch trông lớn hơn thực tế).
- Dùng hình vẽ có diện tích không tỉ lệ với số liệu.
- Tổng các phần trăm của biểu đồ hình quạt khác \(100\%\).`),
  ],
  formulas: [
    {
      group: 'Phân tích số liệu',
      items: [
        fc('Tỉ lệ phần trăm tăng (giảm)', r`\dfrac{\text{giá trị mới} - \text{giá trị cũ}}{\text{giá trị cũ}}\cdot100\%`, r`- Kết quả dương: tăng; âm: giảm`, r`Từ 60 lên 72: \(\dfrac{12}{60}\cdot100\% = 20\%\).`),
        fc('Số lượng từ tỉ lệ phần trăm', r`a = n\cdot p\%`, r`- \(n\): tổng số lượng
- \(p\%\): tỉ lệ của phần cần tính`, r`\(55\%\) của 4 tấn là \(2{,}2\) tấn.`),
      ],
    },
  ],
  examples: {
    'phan-tich-bieu-do-cot': [
      ex(1, r`Quan sát biểu đồ. Câu lạc bộ nào có nhiều học sinh tham gia nhất, ít nhất?
${CLB}`,
        'Đọc chiều cao các cột và so sánh.',
        'Đọc biểu đồ cột.',
        [r`Số học sinh: Toán 35; Tiếng Anh 42; Bóng đá 30; Mĩ thuật 18.`, r`Cột cao nhất là Tiếng Anh (42), thấp nhất là Mĩ thuật (18).`],
        'Nhiều nhất: Tiếng Anh (42 học sinh); ít nhất: Mĩ thuật (18 học sinh).'),
      ex(2, r`Với biểu đồ ở ví dụ trước (số học sinh tham gia các câu lạc bộ), tính tổng số học sinh tham gia và tỉ lệ phần trăm học sinh tham gia câu lạc bộ Toán.
${CLB}`,
        'Cộng các giá trị để có tổng, rồi lập tỉ số của câu lạc bộ Toán với tổng.',
        'Đọc biểu đồ cột; tỉ lệ phần trăm.',
        [r`Tổng: \(35 + 42 + 30 + 18 = 125\) (học sinh).`, r`Tỉ lệ câu lạc bộ Toán: \(\dfrac{35}{125}\cdot100\% = 28\%\).`],
        r`Tổng 125 học sinh; câu lạc bộ Toán chiếm 28%.`),
      ex(3, r`Biểu đồ sau cho biết số học sinh giỏi của các lớp khối 8 trong hai học kì. Lớp nào tiến bộ nhiều nhất? Số học sinh giỏi của cả khối tăng bao nhiêu phần trăm?
${HSG}`,
        'So sánh từng cặp cột của mỗi lớp; tính tổng mỗi học kì để tính tỉ lệ tăng.',
        'Đọc biểu đồ cột kép; tỉ lệ phần trăm tăng.',
        [r`Mức tăng: 8A tăng 3; 8B tăng 3; 8C tăng 6; 8D không đổi. Lớp 8C tiến bộ nhiều nhất.`, r`Tổng học kì I: \(7 + 9 + 5 + 8 = 29\); học kì II: \(10 + 12 + 11 + 8 = 41\).`, r`Tỉ lệ tăng: \(\dfrac{41 - 29}{29}\cdot100\% \approx 41{,}4\%\).`],
        r`Lớp 8C tiến bộ nhiều nhất; cả khối tăng khoảng 41,4%.`,
        'Tỉ lệ tăng luôn tính so với giá trị ban đầu (học kì I).'),
    ],
    'phan-tich-bieu-do-doan-thang': [
      ex(1, r`Quan sát biểu đồ. Năm nào bảo tàng đón nhiều khách nhất, ít khách nhất?
${BAO_TANG}`,
        'Tìm điểm cao nhất và thấp nhất trên đường gấp khúc.',
        'Đọc biểu đồ đoạn thẳng.',
        [r`Số lượt khách (nghìn lượt): 58; 30; 20; 45; 60; 72 ứng với các năm 2019 – 2024.`, r`Cao nhất năm 2024 (72 nghìn lượt), thấp nhất năm 2021 (20 nghìn lượt).`],
        'Nhiều nhất: 2024; ít nhất: 2021.'),
      ex(2, r`Dựa vào biểu đồ số lượt khách tham quan bảo tàng, cho biết giai đoạn nào số khách giảm, giai đoạn nào tăng. Từ năm 2023 đến năm 2024, số khách tăng bao nhiêu phần trăm?
${BAO_TANG}`,
        'Đường đi xuống là giảm, đi lên là tăng; tính tỉ lệ tăng so với năm 2023.',
        'Đọc xu hướng trên biểu đồ đoạn thẳng; tỉ lệ phần trăm tăng.',
        [r`Từ 2019 đến 2021 đường đi xuống: số khách giảm. Từ 2021 đến 2024 đường đi lên: số khách tăng.`, r`Tỉ lệ tăng 2023 – 2024: \(\dfrac{72 - 60}{60}\cdot100\% = 20\%\).`],
        'Giảm giai đoạn 2019 – 2021, tăng giai đoạn 2021 – 2024; năm 2024 tăng 20% so với 2023.'),
      ex(3, r`Nếu năm 2025 số khách tiếp tục tăng với cùng tỉ lệ như từ năm 2023 sang năm 2024 thì năm 2025 bảo tàng đón khoảng bao nhiêu lượt khách? Nhận xét về cách dự đoán này.
${BAO_TANG}`,
        'Dùng tỉ lệ tăng 20% vừa tính để ước lượng; dự đoán chỉ đúng khi điều kiện không thay đổi nhiều.',
        'Tỉ lệ phần trăm; dự đoán dựa vào xu hướng.',
        [r`Tỉ lệ tăng 2023 – 2024 là 20%.`, r`Dự đoán năm 2025: \(72\cdot(1 + 20\%) = 72\cdot1{,}2 = 86{,}4\) (nghìn lượt).`, r`Đây chỉ là ước lượng: số khách còn phụ thuộc thời tiết, dịch bệnh, sự kiện… nên có thể khác thực tế.`],
        r`Khoảng 86,4 nghìn lượt khách (ước lượng theo xu hướng).`,
        'Dự đoán từ biểu đồ cần nêu rõ giả thiết “giữ nguyên xu hướng”.'),
    ],
    'phan-tich-bieu-do-quat-tron': [
      ex(1, r`Quan sát biểu đồ. Loại rác nào chiếm tỉ lệ lớn nhất? Rác nhựa chiếm bao nhiêu phần trăm?
${RAC}`,
        'Đọc tỉ lệ ghi trên từng hình quạt.',
        'Đọc biểu đồ hình quạt tròn.',
        [r`Hữu cơ 55%; nhựa 20%; giấy 15%; loại khác 10%.`, r`Lớn nhất là rác hữu cơ (55%); rác nhựa chiếm 20%.`],
        'Rác hữu cơ chiếm tỉ lệ lớn nhất (55%); rác nhựa chiếm 20%.'),
      ex(2, r`Mỗi ngày khu dân cư thải ra 4 tấn rác với tỉ lệ như biểu đồ. Tính khối lượng mỗi loại rác.
${RAC}`,
        'Khối lượng mỗi loại bằng tổng khối lượng nhân tỉ lệ phần trăm.',
        r`\(a = n\cdot p\%\).`,
        [r`Hữu cơ: \(4\cdot55\% = 2{,}2\) tấn; nhựa: \(4\cdot20\% = 0{,}8\) tấn.`, r`Giấy: \(4\cdot15\% = 0{,}6\) tấn; loại khác: \(4\cdot10\% = 0{,}4\) tấn.`],
        r`2,2 tấn; 0,8 tấn; 0,6 tấn; 0,4 tấn.`),
      ex(3, r`Nếu tái chế được toàn bộ rác nhựa và rác giấy thì lượng rác phải xử lí của khu dân cư (4 tấn/ngày) giảm bao nhiêu phần trăm, bao nhiêu tấn mỗi tháng (30 ngày)?
${RAC}`,
        'Phần giảm là tổng tỉ lệ nhựa và giấy; đổi ra khối lượng mỗi ngày rồi nhân 30.',
        'Đọc biểu đồ hình quạt; tỉ lệ phần trăm.',
        [r`Tỉ lệ giảm: \(20\% + 15\% = 35\%\).`, r`Mỗi ngày giảm: \(4\cdot35\% = 1{,}4\) tấn.`, r`Mỗi tháng giảm: \(1{,}4\cdot30 = 42\) tấn.`],
        r`Giảm 35%, tức 42 tấn mỗi tháng.`,
        'Bài thực tế: nêu rõ phép tính và đơn vị ở mỗi bước.'),
    ],
    'bieu-do-gay-hieu-lam': [
      ex(3, r`Một tờ quảng cáo vẽ biểu đồ cột so sánh doanh số sản phẩm A (96 triệu đồng) và sản phẩm B (100 triệu đồng), nhưng trục doanh số bắt đầu từ 95 nên cột B cao gấp 5 lần cột A. Biểu đồ có gây hiểu lầm không? Vì sao? Nên sửa thế nào?`,
        'So sánh tỉ lệ chiều cao hai cột trên hình với tỉ lệ số liệu thật.',
        'Biểu đồ gây hiểu lầm; tỉ số, tỉ lệ phần trăm.',
        [r`Trên hình: cột A cao \(96 - 95 = 1\) đơn vị, cột B cao \(100 - 95 = 5\) đơn vị, nên B trông gấp 5 lần A.`, r`Thực tế: \(\dfrac{100}{96} \approx 1{,}04\), B chỉ hơn A khoảng 4%.`, r`Vậy biểu đồ gây hiểu lầm; cần vẽ lại với trục doanh số bắt đầu từ 0.`],
        r`Có gây hiểu lầm. Biểu đồ đúng:
[bieudo]
loai: cot
tieude: Doanh số hai sản phẩm
nhan: Sản phẩm A; Sản phẩm B
so lieu: 96; 100
donvi: triệu đồng
[/bieudo]`,
        'Khi đọc biểu đồ cột, luôn nhìn vạch bắt đầu của trục số liệu.'),
      ex(4, r`Một biểu đồ hình quạt về môn thể thao yêu thích ghi các tỉ lệ: Bóng đá 45%, Cầu lông 30%, Bơi lội 20%, Cờ vua 15%. Biểu đồ này đúng hay sai? Biết rằng các số 45; 30; 20; 15 thực ra là **số học sinh** chọn mỗi môn, hãy tính lại các tỉ lệ đúng.`,
        'Kiểm tra tổng các tỉ lệ; nếu số liệu là số học sinh thì phải chia cho tổng số học sinh.',
        'Tổng các tỉ lệ của biểu đồ hình quạt bằng 100%; tỉ lệ phần trăm.',
        [r`Tổng các tỉ lệ: \(45\% + 30\% + 20\% + 15\% = 110\% \ne 100\%\), nên biểu đồ sai.`, r`Tổng số học sinh: \(45 + 30 + 20 + 15 = 110\).`, r`Tỉ lệ đúng: bóng đá \(\dfrac{45}{110} \approx 40{,}9\%\); cầu lông \(\approx 27{,}3\%\); bơi lội \(\approx 18{,}2\%\); cờ vua \(\approx 13{,}6\%\).`],
        r`Biểu đồ sai; tỉ lệ đúng khoảng 40,9%; 27,3%; 18,2%; 13,6%.`,
        'Lỗi hay gặp: ghi thẳng số lượng thành phần trăm khi tổng không phải là 100.'),
    ],
  },
  notes: {
    'phan-tich-bieu-do-cot': 'Đọc đúng đơn vị và chú giải; tỉ lệ tăng giảm tính so với giá trị ban đầu.',
    'phan-tich-bieu-do-doan-thang': 'Đoạn đi lên là tăng, đi xuống là giảm; dự đoán dựa vào xu hướng chỉ là ước lượng.',
    'phan-tich-bieu-do-quat-tron': 'Số lượng mỗi phần bằng tổng nhân tỉ lệ phần trăm; tổng các tỉ lệ bằng 100%.',
    'bieu-do-gay-hieu-lam': 'Kiểm tra vạch bắt đầu của trục, cách chia đơn vị và tổng phần trăm trước khi tin vào biểu đồ.',
  },
};

export const CHUONG_5: LessonContent[] = [BAI_18, BAI_19, BAI_20];
