/** Ngân hàng câu hỏi GĐ4 – Chương V. Dữ liệu và biểu đồ (Bài 18 – Bài 20). */
import { es, mc, r, sa, tf, type BankLesson } from './types';

const PCT = { unit: '%' };
const DEG = { unit: '°' };
const TR = { unit: 'triệu đồng' };

const PP = 'phuong-phap-thu-thap-du-lieu';
const HL = 'tinh-hop-li-dai-dien-du-lieu';
const PL = 'phan-loai-du-lieu';

const B18: BankLesson = {
  slug: 'bai-18-thu-thap-va-phan-loai-du-lieu',
  questions: [
    mc(1, PP, 'Để biết nhiệt độ cao nhất mỗi ngày ở Hà Nội trong tháng trước, cách thu thập dữ liệu phù hợp là', ['tra cứu số liệu của cơ quan khí tượng', 'phỏng vấn các bạn trong lớp', 'làm thí nghiệm trong phòng học', 'quan sát chiều cao cây trong sân trường'], 'Dữ liệu đã được cơ quan khí tượng đo và công bố, nên thu thập gián tiếp bằng cách tra cứu.', [
      undefined,
      'Các bạn không có số liệu đo chính xác.',
      'Không thể làm thí nghiệm để biết nhiệt độ ngày đã qua.',
      'Không liên quan đến nhiệt độ.',
    ]),
    mc(1, PP, 'Cách thu thập dữ liệu nào sau đây là thu thập trực tiếp?', ['Đếm số bạn đi xe đạp đến lớp', 'Lấy số liệu dân số từ niên giám thống kê', 'Tra cứu điểm chuẩn trên trang web của Sở Giáo dục', 'Đọc số liệu trong một bài báo'], 'Tự đếm (quan sát) là thu thập trực tiếp; ba cách còn lại lấy dữ liệu có sẵn nên là gián tiếp.', [
      undefined,
      'Lấy dữ liệu có sẵn là gián tiếp.',
      'Lấy dữ liệu có sẵn là gián tiếp.',
      'Lấy dữ liệu có sẵn là gián tiếp.',
    ]),
    mc(2, PP, 'Bạn Hà muốn biết thời gian ngủ mỗi đêm của các bạn lớp 8A. Cách làm phù hợp nhất là', ['phát phiếu hỏi cho tất cả các bạn trong lớp', 'hỏi 3 bạn ngồi cạnh mình', 'tra cứu trên Internet', 'hỏi giáo viên chủ nhiệm'], 'Đối tượng là các bạn trong lớp, có thể hỏi trực tiếp tất cả để có dữ liệu đầy đủ, chính xác.', [
      undefined,
      'Ba bạn không đại diện cho cả lớp.',
      'Internet không có dữ liệu riêng của lớp 8A.',
      'Giáo viên không biết thời gian ngủ của từng bạn.',
    ]),
    mc(1, PL, 'Dữ liệu nào sau đây là dữ liệu định lượng?', ['Cân nặng của học sinh', 'Màu áo yêu thích', 'Tên các môn học', 'Nơi sinh'], 'Cân nặng được biểu diễn bằng số nên là dữ liệu định lượng.', [
      undefined,
      'Không phải số nên là định tính.',
      'Không phải số nên là định tính.',
      'Không phải số nên là định tính.',
    ]),
    mc(1, PL, 'Dữ liệu nào sau đây là dữ liệu định tính?', ['Phương tiện đến trường', 'Số anh chị em', 'Chiều cao', 'Điểm kiểm tra'], 'Phương tiện (đi bộ, xe đạp…) không phải là số nên là dữ liệu định tính.', [
      undefined,
      'Là số đếm được nên định lượng.',
      'Là số đo được nên định lượng.',
      'Là số nên định lượng.',
    ]),
    mc(2, PL, 'Dữ liệu nào sau đây là dữ liệu định lượng rời rạc?', ['Số học sinh vắng mặt mỗi ngày', 'Chiều cao của học sinh (cm)', 'Thời gian chạy 100 m', 'Mức độ hài lòng'], 'Số học sinh vắng là số đếm được nên là dữ liệu định lượng rời rạc.', [
      undefined,
      'Đo được nên là định lượng liên tục.',
      'Đo được nên là định lượng liên tục.',
      'Không phải số nên là định tính.',
    ]),
    mc(2, PL, 'Dữ liệu định tính nào sau đây có thể sắp xếp theo thứ tự?', ['Xếp loại học tập: Tốt, Khá, Đạt, Chưa đạt', 'Màu sắc yêu thích', 'Môn thể thao yêu thích', 'Quê quán'], 'Các mức xếp loại học tập có thứ tự từ cao đến thấp.', [
      undefined,
      'Các màu không có thứ tự.',
      'Các môn thể thao không có thứ tự.',
      'Các tỉnh, thành không có thứ tự.',
    ]),
    mc(2, HL, r`Bạn Nam ghi chiều cao (cm) của 5 bạn lớp 8: \(152\); \(148\); \(1{,}55\); \(160\); \(157\). Giá trị không hợp lí là`, [r`\(1{,}55\)`, r`\(152\)`, r`\(160\)`, r`\(148\)`], r`Học sinh lớp 8 không thể cao \(1{,}55\) cm; có lẽ ghi theo mét, sai đơn vị.`, [
      undefined,
      'Giá trị hợp lí.',
      'Giá trị hợp lí.',
      'Giá trị hợp lí.',
    ]),
    mc(2, HL, r`Số học sinh các lớp khối 8 được ghi: 8A: 40; 8B: 38; 8C: \(-2\); 8D: 41. Giá trị không hợp lí là`, [r`\(-2\)`, r`\(40\)`, r`\(38\)`, r`\(41\)`], 'Số học sinh không thể là số âm.', [
      undefined,
      'Giá trị hợp lí.',
      'Giá trị hợp lí.',
      'Giá trị hợp lí.',
    ]),
    mc(3, HL, 'Để tìm hiểu môn thể thao được yêu thích nhất của học sinh toàn trường, cách chọn mẫu nào đại diện nhất?', ['Chọn ngẫu nhiên mỗi lớp 5 học sinh', 'Chọn 30 bạn trong đội bóng đá', 'Chọn tất cả học sinh lớp 6A', 'Chọn các bạn đến thư viện sáng thứ Hai'], 'Mẫu đại diện cần có mặt học sinh ở mọi lớp, mọi khối và được chọn ngẫu nhiên.', [
      undefined,
      'Các bạn đội bóng đều thích bóng đá: mẫu bị lệch.',
      'Chỉ có một lớp, một khối.',
      'Chỉ có nhóm bạn thích đọc sách.',
    ]),
    mc(3, HL, 'Một khảo sát trực tuyến về thời gian dùng mạng xã hội cho kết quả "trung bình 9 giờ mỗi ngày", nhưng phiếu chỉ được gửi trong một nhóm người dùng mạng rất nhiều. Nhận xét nào đúng?', ['Mẫu không đại diện nên kết quả không phản ánh đúng mọi người', 'Kết quả chính xác vì có nhiều người trả lời', 'Mọi người đều dùng mạng xã hội 9 giờ mỗi ngày', 'Dữ liệu thu được là dữ liệu định tính'], 'Người trả lời chỉ thuộc nhóm dùng mạng nhiều nên mẫu bị lệch, không đại diện.', [
      undefined,
      'Nhiều người nhưng cùng một nhóm vẫn không đại diện.',
      'Không thể suy ra cho mọi người từ mẫu lệch.',
      'Thời gian là dữ liệu định lượng.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, PP, 'Xét tính đúng sai về phương pháp thu thập dữ liệu:', [
      ['Phỏng vấn là cách thu thập trực tiếp.', true, 'Người thu thập tự hỏi để có dữ liệu.'],
      ['Lấy số liệu từ trang web của Tổng cục Thống kê là thu thập gián tiếp.', true, 'Dữ liệu có sẵn.'],
      ['Làm thí nghiệm là thu thập gián tiếp.', false, 'Tự làm để có dữ liệu nên là trực tiếp.'],
      ['Quan sát là cách thu thập trực tiếp.', true, 'Người thu thập tự quan sát.'],
    ]),
    tf(2, PP, 'Bạn An muốn biết số xe máy đi qua cổng trường trong 30 phút giờ tan học.', [
      ['Có thể đứng ở cổng trường để đếm trực tiếp.', true, 'Quan sát, đếm là trực tiếp.'],
      ['Đây là cách thu thập gián tiếp.', false, 'Tự đếm là trực tiếp.'],
      ['Nên ghi kết quả vào bảng kiểm đếm.', true, 'Giúp đếm chính xác.'],
      ['Chỉ cần hỏi một người bạn là có số liệu chính xác.', false, 'Một người bạn không có số liệu đếm.'],
    ]),
    tf(1, PL, 'Xét tính đúng sai về các loại dữ liệu:', [
      ['Cân nặng là dữ liệu định lượng.', true, 'Là số đo.'],
      ['Quê quán là dữ liệu định tính.', true, 'Không phải số.'],
      ['Điểm kiểm tra là dữ liệu định tính.', false, 'Điểm là số nên định lượng.'],
      ['Mức độ yêu thích (rất thích, thích, không thích) là dữ liệu định tính.', true, 'Không phải số, nhưng có thứ tự.'],
    ]),
    tf(2, PL, 'Một phiếu thông tin học sinh gồm các mục sau. Xét tính đúng sai:', [
      ['"Số giờ tự học mỗi ngày" là dữ liệu định lượng liên tục.', true, 'Thời gian đo được.'],
      ['"Số bạn thân" là dữ liệu định lượng rời rạc.', true, 'Đếm được.'],
      ['"Môn học yêu thích" là dữ liệu định lượng.', false, 'Không phải số.'],
      ['"Xếp loại rèn luyện" là dữ liệu định tính có thể sắp thứ tự.', true, 'Các mức có thứ tự.'],
    ]),
    tf(2, HL, r`Lớp 8B có 40 học sinh. Số học sinh vắng trong 6 ngày được ghi: \(1\); \(0\); \(2\); \(45\); \(1\); \(3\).`, [
      [r`Giá trị \(45\) không hợp lí.`, true, 'Lớn hơn sĩ số lớp.'],
      ['Các giá trị còn lại hợp lí.', true, 'Đều từ 0 đến 40.'],
      [r`Giá trị \(0\) không hợp lí.`, false, 'Có thể không có bạn nào vắng.'],
      [r`Cần kiểm tra lại giá trị \(45\).`, true, 'Có thể ghi nhầm.'],
    ]),
    tf(3, HL, 'Để biết tỉ lệ học sinh toàn trường bị cận thị, bạn Minh chỉ hỏi các bạn trong câu lạc bộ cờ vua.', [
      ['Mẫu có thể không đại diện cho toàn trường.', true, 'Chỉ một nhóm nhỏ, cùng sở thích.'],
      ['Kết luận cho toàn trường có thể sai lệch.', true, 'Do mẫu bị lệch.'],
      ['Mẫu tốt hơn là chọn ngẫu nhiên học sinh ở mọi lớp.', true, 'Có đủ các nhóm.'],
      ['Chỉ cần hỏi thật nhiều bạn trong câu lạc bộ cờ vua là đủ đại diện.', false, 'Vẫn chỉ là một nhóm.'],
    ]),
    tf(3, HL, 'Một bảng ghi tỉ lệ phương tiện đến trường của học sinh (mỗi bạn chọn đúng một phương tiện): đi bộ 25%, xe đạp 40%, xe buýt 15%, bố mẹ đưa 30%.', [
      ['Tổng các tỉ lệ bằng 110%.', true, r`\(25 + 40 + 15 + 30\).`],
      ['Dữ liệu trong bảng không hợp lí.', true, 'Tổng phải bằng 100%.'],
      ['Dữ liệu hợp lí vì mỗi tỉ lệ đều nhỏ hơn 100%.', false, 'Còn phải kiểm tra tổng.'],
      ['Cần kiểm tra lại số liệu.', true, 'Có số liệu ghi sai.'],
    ]),
    tf(2, PL, r`Dãy dữ liệu "Nhiệt độ trung bình các tháng (°C): \(17\); \(18\); \(20\); \(24\)".`, [
      ['Đây là dữ liệu định lượng.', true, 'Là số.'],
      ['Đây là dữ liệu liên tục.', true, 'Nhiệt độ đo được.'],
      ['Đây là dữ liệu định tính.', false, 'Là số.'],
      ['Có thể tính nhiệt độ trung bình của bốn tháng.', true, 'Dữ liệu định lượng tính được trung bình.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, PL, 'Trong các dữ liệu sau có bao nhiêu dữ liệu định lượng: chiều cao; màu mắt; số anh chị em; cân nặng; nơi sinh; môn học yêu thích?', '3', 'Dữ liệu định lượng: chiều cao, số anh chị em, cân nặng.'),
    sa(2, PL, 'Trong các dữ liệu sau có bao nhiêu dữ liệu định tính: điểm kiểm tra; loại sách yêu thích; số bạn nam; xếp loại học tập; nhiệt độ; tên các tỉnh?', '3', 'Dữ liệu định tính: loại sách yêu thích, xếp loại học tập, tên các tỉnh.'),
    sa(2, PL, 'Trong các dữ liệu sau có bao nhiêu dữ liệu định lượng rời rạc: số học sinh mỗi lớp; chiều cao; số ô tô qua trạm mỗi giờ; cân nặng; số trang sách?', '3', 'Đếm được: số học sinh, số ô tô, số trang sách. Chiều cao, cân nặng là liên tục.'),
    sa(1, PL, 'Một phiếu hỏi gồm 5 mục: họ và tên; năm sinh; cân nặng (kg); màu yêu thích; số giờ ngủ mỗi đêm. Có bao nhiêu mục thu được dữ liệu là số?', '3', 'Năm sinh, cân nặng, số giờ ngủ là dữ liệu số.'),
    sa(1, PP, 'Trong các cách sau có bao nhiêu cách thu thập dữ liệu trực tiếp: phỏng vấn; quan sát; làm thí nghiệm; tra cứu Internet; lập phiếu hỏi; đọc báo?', '4', 'Trực tiếp: phỏng vấn, quan sát, làm thí nghiệm, lập phiếu hỏi. Tra cứu Internet, đọc báo là gián tiếp.'),
    sa(2, PP, 'Bạn Lan phát phiếu khảo sát cho 45 bạn và thu về 36 phiếu. Tỉ lệ phiếu thu về là bao nhiêu phần trăm?', '80', r`\(\dfrac{36}{45}\cdot100\% = 80\%\).`, PCT),
    sa(2, HL, r`Điểm kiểm tra (thang điểm 10) của tổ 1 được ghi: \(8\); \(7\); \(9{,}5\); \(11\); \(6\); \(10\); \(-1\); \(7{,}5\). Có bao nhiêu giá trị không hợp lí?`, '2', r`Điểm phải từ 0 đến 10; \(11\) và \(-1\) không hợp lí.`),
    sa(2, HL, r`Thời gian chạy 100 m (giây) của 6 bạn: \(15{,}2\); \(14{,}8\); \(1{,}6\); \(16{,}0\); \(150\); \(15{,}5\). Có bao nhiêu giá trị không hợp lí?`, '2', r`\(1{,}6\) giây quá nhanh và \(150\) giây quá chậm so với thực tế; hai giá trị này không hợp lí.`),
    sa(3, HL, 'Lớp 8A có 40 học sinh, mỗi bạn chọn đúng một môn thể thao yêu thích. Bảng thống kê: bóng đá 18 bạn, cầu lông 12 bạn, bơi 8 bạn và môn khác (bị ghi thiếu). Số bạn chọn môn khác là bao nhiêu để dữ liệu hợp lí?', '2', r`\(40 - (18 + 12 + 8) = 2\).`),
    sa(3, HL, 'Bảng tỉ lệ học sinh chọn câu lạc bộ (mỗi bạn chọn đúng một câu lạc bộ): Toán 35%, Tiếng Anh 28%, Thể thao 22%, Mĩ thuật x%. Tìm x để dữ liệu hợp lí.', '15', r`Tổng phải bằng 100%: \(x = 100 - 85 = 15\).`, PCT),
    // ---- Tự luận ----
    es(2, PP, 'Bạn Mai muốn tìm hiểu số trang sách mỗi bạn lớp 8C đọc trong một tuần. Hãy nêu phương pháp thu thập dữ liệu phù hợp và viết hai câu hỏi cho phiếu khảo sát.', r`Thu thập trực tiếp bằng phiếu hỏi (hoặc phỏng vấn) tất cả học sinh lớp 8C.
Ví dụ câu hỏi:
- "Trong tuần qua, em đọc được khoảng bao nhiêu trang sách (không kể sách giáo khoa)?"
- "Em thường đọc sách vào thời gian nào: buổi sáng, buổi chiều, buổi tối?"`, r`0,5 điểm: nêu đúng phương pháp trực tiếp, đối tượng là cả lớp.
0,5 điểm: viết được hai câu hỏi rõ ràng, phù hợp mục đích.`),
    es(2, PL, 'Phiếu đăng kí câu lạc bộ gồm các mục: tên câu lạc bộ; số buổi tham gia mỗi tuần; quãng đường từ nhà đến trường (km); mức độ hứng thú (cao, trung bình, thấp). Phân loại dữ liệu của từng mục.', r`- Tên câu lạc bộ: định tính, không có thứ tự.
- Số buổi tham gia mỗi tuần: định lượng rời rạc.
- Quãng đường từ nhà đến trường: định lượng liên tục.
- Mức độ hứng thú: định tính, có thứ tự.`, r`0,5 điểm: phân loại đúng hai mục định lượng (rời rạc, liên tục).
0,5 điểm: phân loại đúng hai mục định tính (có/không có thứ tự).`),
    es(2, PP, 'Nên thu thập dữ liệu trực tiếp hay gián tiếp trong mỗi trường hợp? Giải thích.\na) Lượng mưa trung bình mỗi năm của Đà Nẵng trong 10 năm qua.\nb) Món ăn sáng yêu thích của các bạn trong lớp.', r`a) Gián tiếp: tra cứu số liệu của cơ quan khí tượng vì không thể tự đo lượng mưa của 10 năm đã qua.
b) Trực tiếp: hỏi hoặc phát phiếu cho các bạn trong lớp.`, r`0,5 điểm: câu a đúng và có giải thích.
0,5 điểm: câu b đúng và có giải thích.`),
    es(3, HL, r`Bạn Hùng ghi cân nặng (kg) của 8 bạn trong tổ: \(42\); \(45\); \(4{,}8\); \(50\); \(39\); \(450\); \(47\); \(44\).
a) Chỉ ra các giá trị không hợp lí và giải thích.
b) Nên xử lí các giá trị đó như thế nào trước khi tính cân nặng trung bình?`, r`a) \(4{,}8\) kg và \(450\) kg không hợp lí vì học sinh lớp 8 thường nặng khoảng 30 – 70 kg (có thể ghi nhầm dấu phẩy hoặc thừa chữ số).
b) Hỏi lại hoặc cân lại hai bạn đó để sửa số liệu; nếu không sửa được thì loại hai giá trị này khi tính trung bình.`, r`0,5 điểm: chỉ đúng hai giá trị và giải thích.
0,5 điểm: đề xuất cách xử lí hợp lí.`),
    es(3, HL, 'Để biết ý kiến phụ huynh toàn trường về việc thay đổi giờ vào học, nhà trường chỉ hỏi phụ huynh của lớp 9A và kết luận "đa số phụ huynh đồng ý". Kết luận này có đáng tin không? Hãy đề xuất cách chọn mẫu tốt hơn.', r`Không đáng tin: phụ huynh lớp 9A chỉ là một nhóm nhỏ của một khối, nhu cầu có thể khác các khối khác, nên mẫu không đại diện cho toàn trường.
Cách tốt hơn: chọn ngẫu nhiên phụ huynh ở tất cả các lớp của các khối 6, 7, 8, 9 (ví dụ mỗi lớp 8 – 10 phụ huynh), hoặc gửi phiếu cho toàn bộ phụ huynh.`, r`0,5 điểm: nhận xét mẫu không đại diện và giải thích.
0,5 điểm: đề xuất được cách chọn mẫu đại diện.`),
  ],
};

const CD = 'chon-dang-bieu-do';
const VB = 've-bieu-do';
const CQ = 'chuyen-du-lieu-sang-bieu-do-quat';

const B19: BankLesson = {
  slug: 'bai-19-bieu-dien-du-lieu-bang-bang-bieu-do',
  questions: [
    mc(1, CD, 'Để biểu diễn sự thay đổi nhiệt độ theo các giờ trong một ngày, nên dùng', ['biểu đồ đoạn thẳng', 'biểu đồ hình quạt tròn', 'biểu đồ tranh', 'biểu đồ cột kép'], 'Biểu đồ đoạn thẳng thể hiện rõ sự thay đổi theo thời gian.', [
      undefined,
      'Biểu đồ quạt dùng cho tỉ lệ các phần của tổng thể.',
      'Biểu đồ tranh dùng cho số lượng nhỏ, đơn giản.',
      'Cột kép dùng so sánh hai bộ dữ liệu.',
    ]),
    mc(1, CD, 'Để biểu diễn tỉ lệ các loại sách trong thư viện, nên dùng', ['biểu đồ hình quạt tròn', 'biểu đồ đoạn thẳng', 'biểu đồ cột kép', 'biểu đồ tranh'], 'Biểu đồ quạt tròn biểu diễn tỉ lệ các phần trong một tổng thể.', [
      undefined,
      'Không phải dữ liệu theo thời gian.',
      'Không có hai bộ dữ liệu cần so sánh.',
      'Khó thể hiện tỉ lệ phần trăm.',
    ]),
    mc(1, CD, 'Để so sánh số học sinh nam và số học sinh nữ của các lớp khối 8, nên dùng', ['biểu đồ cột kép', 'biểu đồ hình quạt tròn', 'biểu đồ đoạn thẳng', 'biểu đồ tranh với một loại biểu tượng'], 'Có hai bộ dữ liệu cùng loại (nam, nữ) trên các lớp: dùng cột kép.', [
      undefined,
      'Quạt tròn chỉ cho một tổng thể.',
      'Không phải dữ liệu theo thời gian.',
      'Một loại biểu tượng không phân biệt được nam, nữ.',
    ]),
    mc(2, CD, 'Để biểu diễn điểm số môn Toán của bạn An qua bốn lần kiểm tra trong năm và nhận xét sự tiến bộ, nên dùng', ['biểu đồ đoạn thẳng', 'biểu đồ hình quạt tròn', 'biểu đồ cột kép', 'bảng chỉ có một dòng'], 'Dữ liệu theo thời gian, cần thấy xu hướng tăng giảm: biểu đồ đoạn thẳng.', [
      undefined,
      'Bốn điểm số không phải các phần của một tổng thể.',
      'Chỉ có một bộ dữ liệu.',
      'Bảng không thể hiện trực quan xu hướng.',
    ]),
    mc(2, CD, 'Biểu đồ hình quạt tròn KHÔNG phù hợp để biểu diễn dữ liệu nào sau đây?', ['Lượng mưa các tháng trong năm', 'Tỉ lệ học sinh theo xếp loại học tập', 'Tỉ lệ các loại rác thải', 'Tỉ lệ các khoản chi tiêu của gia đình'], 'Lượng mưa các tháng không phải là các phần của một tổng thể cần so sánh tỉ lệ, mà là dữ liệu theo thời gian.', [
      'Đây là dữ liệu theo thời gian, nên dùng biểu đồ đoạn thẳng hoặc cột.',
      'Phù hợp vì là tỉ lệ các phần.',
      'Phù hợp vì là tỉ lệ các phần.',
      'Phù hợp vì là tỉ lệ các phần.',
    ]),
    mc(2, VB, 'Khi vẽ biểu đồ cột, trục đứng (trục số liệu) nên', ['bắt đầu từ 0 và chia đều', 'bắt đầu từ giá trị nhỏ nhất của dữ liệu', 'chia không đều cho đẹp', 'không cần ghi đơn vị'], 'Trục bắt đầu từ 0, chia đều thì chiều cao các cột tỉ lệ đúng với số liệu.', [
      undefined,
      'Làm chênh lệch giữa các cột trông lớn hơn thực tế.',
      'Làm sai lệch so sánh.',
      'Cần ghi đơn vị để đọc đúng.',
    ]),
    mc(2, VB, 'Trên một biểu đồ cột, mỗi vạch chia trên trục đứng ứng với 2 học sinh. Cột "Cờ vua" cao đúng 15 vạch. Số học sinh chọn cờ vua là', [r`\(30\)`, r`\(15\)`, r`\(17\)`, r`\(7{,}5\)`], r`\(15\cdot2 = 30\) học sinh.`, [
      undefined,
      'Chưa nhân với giá trị mỗi vạch.',
      'Cộng thay vì nhân.',
      'Chia thay vì nhân.',
    ]),
    mc(2, CQ, 'Lớp có 40 học sinh, trong đó 10 bạn đi bộ đến trường. Hình quạt biểu diễn nhóm đi bộ chiếm', [r`\(25\%\)`, r`\(10\%\)`, r`\(40\%\)`, r`\(4\%\)`], r`\(\dfrac{10}{40}\cdot100\% = 25\%\).`, [
      undefined,
      'Nhầm số học sinh với tỉ lệ phần trăm.',
      'Nhầm sĩ số với tỉ lệ.',
      r`Tính nhầm \(\dfrac{40}{10}\).`,
    ]),
    mc(2, CQ, r`Trong biểu đồ hình quạt tròn, phần chiếm \(25\%\) ứng với hình quạt có góc ở tâm bằng`, [r`\(90^\circ\)`, r`\(25^\circ\)`, r`\(45^\circ\)`, r`\(100^\circ\)`], r`\(25\%\cdot360^\circ = 90^\circ\).`, [
      undefined,
      r`Chưa nhân với \(360^\circ\).`,
      r`Nhân nhầm với \(180^\circ\).`,
      'Tính sai.',
    ]),
    mc(3, CQ, 'Một xưởng sản xuất 200 sản phẩm, trong đó có 30 sản phẩm loại C. Trên biểu đồ hình quạt tròn, góc ở tâm của hình quạt "loại C" là', [r`\(54^\circ\)`, r`\(15^\circ\)`, r`\(30^\circ\)`, r`\(60^\circ\)`], r`Tỉ lệ \(\dfrac{30}{200} = 15\%\); góc ở tâm \(15\%\cdot360^\circ = 54^\circ\).`, [
      undefined,
      'Đó là tỉ lệ phần trăm, chưa đổi ra góc.',
      'Nhầm số sản phẩm với số đo góc.',
      'Tính sai.',
    ]),
    mc(3, CQ, 'Một biểu đồ hình quạt tròn gồm bốn phần, ba phần chiếm 35%, 25% và 20%. Phần còn lại chiếm', [r`\(20\%\)`, r`\(80\%\)`, r`\(30\%\)`, r`\(25\%\)`], r`\(100\% - (35\% + 25\% + 20\%) = 20\%\).`, [
      undefined,
      'Đó là tổng ba phần đã biết.',
      'Tính sai.',
      'Tính sai.',
    ]),
    mc(3, VB, 'Doanh thu (tỉ đồng) của một công ty: năm 2020 là 120; năm 2021 là 135; năm 2022 là 150; năm 2023 là 140. Trên biểu đồ đoạn thẳng, đoạn nối điểm năm 2022 với năm 2023', ['đi xuống', 'đi lên', 'nằm ngang', 'không vẽ được'], 'Doanh thu giảm từ 150 xuống 140 nên đoạn thẳng đi xuống.', [
      undefined,
      'Doanh thu giảm.',
      'Hai giá trị khác nhau.',
      'Vẽ được bình thường.',
    ]),
    mc(3, CQ, 'Lớp có 60 học sinh: 24 bạn thích bóng đá, 18 bạn thích cầu lông, 12 bạn thích bơi, 6 bạn thích môn khác. Góc ở tâm của hình quạt "cầu lông" là', [r`\(108^\circ\)`, r`\(18^\circ\)`, r`\(30^\circ\)`, r`\(120^\circ\)`], r`Tỉ lệ \(\dfrac{18}{60} = 30\%\); góc \(30\%\cdot360^\circ = 108^\circ\).`, [
      undefined,
      'Nhầm số học sinh với số đo góc.',
      'Đó là tỉ lệ phần trăm.',
      'Tính sai.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, CD, 'Xét tính đúng sai:', [
      ['Biểu đồ đoạn thẳng phù hợp biểu diễn sự thay đổi theo thời gian.', true, 'Thấy rõ xu hướng.'],
      ['Biểu đồ hình quạt tròn biểu diễn tỉ lệ các phần trong một tổng thể.', true, 'Cả hình tròn là 100%.'],
      ['Biểu đồ cột kép dùng để so sánh hai bộ dữ liệu cùng loại.', true, 'Mỗi đối tượng có hai cột.'],
      ['Biểu đồ hình quạt tròn là lựa chọn tốt nhất để biểu diễn nhiệt độ các ngày trong tuần.', false, 'Nên dùng biểu đồ đoạn thẳng.'],
    ]),
    tf(2, CD, 'Chi tiêu hằng tháng của một gia đình: ăn uống 40%, học tập 20%, đi lại 15%, khác 25%.', [
      ['Dữ liệu phù hợp biểu diễn bằng biểu đồ hình quạt tròn.', true, 'Là tỉ lệ các phần của tổng chi tiêu.'],
      ['Tổng các tỉ lệ bằng 100%.', true, r`\(40 + 20 + 15 + 25 = 100\).`],
      ['Dữ liệu phù hợp nhất với biểu đồ đoạn thẳng.', false, 'Không phải dữ liệu theo thời gian.'],
      ['Có thể dùng biểu đồ cột để so sánh các khoản chi.', true, 'Biểu đồ cột cũng so sánh được.'],
    ]),
    tf(2, VB, 'Vẽ biểu đồ cột cho số sách bốn tổ đọc được: Tổ 1: 12; Tổ 2: 18; Tổ 3: 15; Tổ 4: 9.', [
      ['Trục ngang ghi tên các tổ.', true, 'Trục ngang ghi đối tượng.'],
      ['Cột cao nhất là của Tổ 2.', true, '18 là giá trị lớn nhất.'],
      ['Có thể cho trục đứng bắt đầu từ 9 cho đẹp.', false, 'Trục số liệu nên bắt đầu từ 0.'],
      ['Các cột có chiều rộng bằng nhau.', true, 'Quy ước vẽ biểu đồ cột.'],
    ]),
    tf(3, VB, 'Chuyển bảng nhiệt độ trung bình các tháng sang biểu đồ đoạn thẳng.', [
      ['Mỗi tháng ứng với một điểm trên biểu đồ.', true, 'Điểm có tọa độ (tháng; nhiệt độ).'],
      ['Nối các điểm liên tiếp bằng các đoạn thẳng.', true, 'Cách vẽ biểu đồ đoạn thẳng.'],
      ['Đoạn thẳng càng dốc thì nhiệt độ thay đổi càng nhanh.', true, 'Độ dốc thể hiện mức thay đổi.'],
      ['Có thể sắp xếp lại các tháng theo nhiệt độ tăng dần.', false, 'Phải giữ đúng thứ tự thời gian.'],
    ]),
    tf(2, CQ, 'Khảo sát 50 học sinh về môn học yêu thích: Toán 20 bạn, Ngữ văn 15 bạn, Tiếng Anh 10 bạn, môn khác 5 bạn.', [
      ['Toán chiếm 40%.', true, r`\(\dfrac{20}{50}\).`],
      ['Ngữ văn chiếm 30%.', true, r`\(\dfrac{15}{50}\).`],
      [r`Góc ở tâm của hình quạt "Tiếng Anh" là \(72^\circ\).`, true, r`\(20\%\cdot360^\circ\).`],
      [r`Góc ở tâm của hình quạt "môn khác" là \(5^\circ\).`, false, r`\(10\%\cdot360^\circ = 36^\circ\).`],
    ]),
    tf(3, CQ, 'Xét tính đúng sai về góc ở tâm của biểu đồ hình quạt tròn:', [
      [r`Phần chiếm 50% ứng với góc \(180^\circ\).`, true, r`\(0{,}5\cdot360^\circ\).`],
      [r`Phần chiếm 10% ứng với góc \(36^\circ\).`, true, r`\(0{,}1\cdot360^\circ\).`],
      [r`Tổng các góc ở tâm bằng \(360^\circ\).`, true, 'Cả hình tròn.'],
      [r`Phần chiếm 30% ứng với góc \(30^\circ\).`, false, r`\(0{,}3\cdot360^\circ = 108^\circ\).`],
    ]),
    tf(2, CD, 'Xét tính đúng sai:', [
      ['Biểu đồ tranh dùng các biểu tượng để biểu diễn số lượng.', true, 'Đặc điểm của biểu đồ tranh.'],
      ['Mỗi biểu tượng có thể biểu diễn nhiều đơn vị.', true, 'Cần ghi chú giá trị biểu tượng.'],
      ['Bảng thống kê không thể chuyển sang biểu đồ.', false, 'Có thể chuyển qua lại.'],
      ['Cùng một dữ liệu có thể biểu diễn bằng nhiều loại biểu đồ.', true, 'Tùy mục đích chọn loại phù hợp.'],
    ]),
    tf(3, VB, 'Vẽ biểu đồ cột kép biểu diễn số học sinh nam và nữ của ba lớp 8A, 8B, 8C.', [
      ['Cần chú giải màu cho hai bộ dữ liệu.', true, 'Để phân biệt nam, nữ.'],
      ['Mỗi lớp có hai cột đặt cạnh nhau.', true, 'Đặc điểm của biểu đồ cột kép.'],
      ['Chỉ cần một cột cho mỗi lớp.', false, 'Một cột không thể hiện được hai bộ dữ liệu.'],
      ['Trục đứng chia đều, bắt đầu từ 0.', true, 'Quy ước vẽ biểu đồ cột.'],
    ]),
    tf(3, CQ, r`Biểu đồ sau cho biết thời gian trong một ngày (24 giờ) của bạn Nam.
[bieudo]
loai: quat
tieude: Thời gian trong ngày của bạn Nam
nhan: Ngủ; Học; Vui chơi; Việc khác
so lieu: 35; 30; 15; 20
[/bieudo]`, [
      ['Tổng các tỉ lệ bằng 100%.', true, r`\(35 + 30 + 15 + 20\).`],
      [r`Hình quạt "Ngủ" có góc ở tâm \(126^\circ\).`, true, r`\(0{,}35\cdot360^\circ\).`],
      ['Thời gian học là 7,2 giờ.', true, r`\(30\%\cdot24\).`],
      ['Thời gian làm việc khác là 20 giờ.', false, r`\(20\%\cdot24 = 4{,}8\) giờ.`],
    ]),
    tf(2, VB, 'Vẽ biểu đồ tranh, mỗi biểu tượng ứng với 5 cuốn sách.', [
      ['20 cuốn được vẽ bằng 4 biểu tượng.', true, r`\(20 : 5\).`],
      ['12 cuốn được vẽ bằng 2 biểu tượng và một phần biểu tượng.', true, r`\(12 : 5 = 2{,}4\).`],
      ['30 cuốn được vẽ bằng 30 biểu tượng.', false, 'Chỉ cần 6 biểu tượng.'],
      ['Cần ghi chú mỗi biểu tượng ứng với 5 cuốn.', true, 'Để người đọc hiểu đúng.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, CQ, 'Lớp có 80 học sinh, trong đó 28 bạn thích đọc truyện. Hình quạt biểu diễn nhóm này chiếm bao nhiêu phần trăm?', '35', r`\(\dfrac{28}{80}\cdot100\% = 35\%\).`, PCT),
    sa(2, CQ, 'Một phần chiếm 15% tổng thể. Góc ở tâm của hình quạt biểu diễn phần đó là bao nhiêu độ?', '54', r`\(15\%\cdot360^\circ = 54^\circ\).`, DEG),
    sa(3, CQ, 'Một vườn có 120 cây, trong đó 42 cây cam. Tính góc ở tâm của hình quạt "cam" trên biểu đồ hình quạt tròn.', '126', r`\(\dfrac{42}{120}\cdot360^\circ = 126^\circ\).`, DEG),
    sa(3, CQ, r`Một biểu đồ hình quạt tròn có bốn phần; ba hình quạt có góc ở tâm \(90^\circ\), \(120^\circ\), \(60^\circ\). Phần còn lại chiếm bao nhiêu phần trăm?`, '25', r`Góc còn lại \(360^\circ - 270^\circ = 90^\circ\), chiếm \(\dfrac{90}{360} = 25\%\).`, PCT),
    sa(3, CQ, r`Hình quạt có góc ở tâm \(72^\circ\) biểu diễn bao nhiêu phần trăm của tổng thể?`, '20', r`\(\dfrac{72}{360} = 0{,}2 = 20\%\).`, PCT),
    sa(2, CQ, 'Bốn phần của một biểu đồ hình quạt tròn chiếm 32%, 28%, x% và 15%. Tìm x.', '25', r`\(x = 100 - (32 + 28 + 15) = 25\).`, PCT),
    sa(2, VB, 'Trên một biểu đồ cột, mỗi vạch chia trên trục đứng ứng với 5 đơn vị. Một cột cao đúng 7 vạch biểu diễn giá trị bao nhiêu?', '35', r`Giá trị bằng số vạch nhân với giá trị mỗi vạch: \(7\cdot5 = 35\).`),
    sa(3, VB, 'Trên một biểu đồ tranh, mỗi biểu tượng ứng với 10 học sinh. Lớp 8A được vẽ bằng 4 biểu tượng và nửa biểu tượng. Lớp 8A có bao nhiêu học sinh?', '45', r`\(4{,}5\cdot10 = 45\) học sinh.`),
    // ---- Tự luận ----
    es(2, CD, 'Nên dùng loại biểu đồ nào cho mỗi trường hợp? Giải thích.\na) Số ca mắc cúm mỗi tuần trong 10 tuần.\nb) So sánh số học sinh giỏi học kì I và học kì II của bốn lớp.\nc) Tỉ lệ các nhóm máu của học sinh trong trường.', r`a) Biểu đồ đoạn thẳng: dữ liệu theo thời gian, cần thấy xu hướng.
b) Biểu đồ cột kép: hai bộ dữ liệu cùng loại trên bốn lớp.
c) Biểu đồ hình quạt tròn: tỉ lệ các phần của một tổng thể.`, r`0,25 điểm mỗi câu a, b, c chọn đúng.
0,25 điểm: giải thích hợp lí.`),
    es(3, VB, 'Số học sinh giỏi của các khối: khối 6 có 25 bạn, khối 7 có 30 bạn, khối 8 có 28 bạn, khối 9 có 35 bạn. Nêu cách vẽ biểu đồ cột biểu diễn dữ liệu và nhận xét.', r`Trục ngang ghi các khối 6, 7, 8, 9; trục đứng ghi số học sinh, chia đều từ 0 đến 40 (mỗi vạch 5 bạn). Vẽ bốn cột rộng bằng nhau, cao lần lượt 25; 30; 28; 35; ghi tên biểu đồ và đơn vị.
[bieudo]
loai: cot
tieude: Số học sinh giỏi các khối
nhan: Khối 6; Khối 7; Khối 8; Khối 9
so lieu: 25; 30; 28; 35
donvi: học sinh
[/bieudo]
Nhận xét: khối 9 nhiều học sinh giỏi nhất, khối 6 ít nhất; tổng cộng 118 bạn.`, r`0,5 điểm: nêu đúng cách vẽ (trục, chia vạch từ 0, chiều cao cột, tên, đơn vị).
0,5 điểm: nhận xét đúng.`),
    es(3, CQ, 'Khảo sát 120 học sinh về phương tiện đến trường: đi bộ 30 bạn, xe đạp 54 bạn, xe buýt 24 bạn, bố mẹ đưa 12 bạn. Tính tỉ lệ phần trăm và góc ở tâm của mỗi phần để vẽ biểu đồ hình quạt tròn.', r`Đi bộ: 25% (\(90^\circ\)); xe đạp: 45% (\(162^\circ\)); xe buýt: 20% (\(72^\circ\)); bố mẹ đưa: 10% (\(36^\circ\)). Kiểm tra: tổng 100%, tổng các góc \(360^\circ\).
[bieudo]
loai: quat
tieude: Phương tiện đến trường của 120 học sinh
nhan: Đi bộ; Xe đạp; Xe buýt; Bố mẹ đưa
so lieu: 25; 45; 20; 10
[/bieudo]`, r`0,5 điểm: tính đúng bốn tỉ lệ phần trăm.
0,5 điểm: tính đúng bốn góc ở tâm.`),
  ],
};

const SACH = `[bieudo]
loai: cot
tieude: Số sách quyên góp của các lớp khối 8
nhan: 8A; 8B; 8C; 8D
so lieu: 45; 60; 40; 55
donvi: cuốn
[/bieudo]`;

const GIO = `[bieudo]
loai: cotkep
tieude: Số giờ tự học mỗi tuần
nhan: An; Bình; Chi; Dũng
so lieu: 6; 5; 9; 4
so lieu 2: 8; 7; 10; 8
ten: Tháng 9; Tháng 10
donvi: giờ
[/bieudo]`;

const DOANH = `[bieudo]
loai: doanthang
tieude: Doanh thu của một cửa hàng 6 tháng đầu năm
nhan: T1; T2; T3; T4; T5; T6
so lieu: 120; 95; 110; 125; 150; 145
donvi: triệu đồng
[/bieudo]`;

const CHI = `[bieudo]
loai: quat
tieude: Cơ cấu chi tiêu hằng tháng của một gia đình
nhan: Ăn uống; Học tập; Đi lại; Tiết kiệm; Khác
so lieu: 40; 20; 15; 10; 15
[/bieudo]`;

const PC = 'phan-tich-bieu-do-cot';
const PD = 'phan-tich-bieu-do-doan-thang';
const PQ = 'phan-tich-bieu-do-quat-tron';
const GH = 'bieu-do-gay-hieu-lam';

const B20: BankLesson = {
  slug: 'bai-20-phan-tich-so-lieu-thong-ke-dua-vao-bieu-do',
  questions: [
    mc(1, PC, `Quan sát biểu đồ. Lớp nào quyên góp được nhiều sách nhất?\n${SACH}`, ['8B', '8A', '8C', '8D'], 'Cột của lớp 8B cao nhất (60 cuốn).', [
      undefined,
      '8A có 45 cuốn.',
      '8C có 40 cuốn, ít nhất.',
      '8D có 55 cuốn.',
    ]),
    mc(2, PC, `Quan sát biểu đồ. Tổng số sách cả khối 8 quyên góp được là\n${SACH}`, [r`\(200\) cuốn`, r`\(190\) cuốn`, r`\(160\) cuốn`, r`\(60\) cuốn`], r`\(45 + 60 + 40 + 55 = 200\) cuốn.`, [
      undefined,
      'Cộng sai.',
      'Bỏ sót một lớp.',
      'Đó là số sách của lớp nhiều nhất.',
    ]),
    mc(3, PC, `Quan sát biểu đồ. Số sách của lớp 8B chiếm bao nhiêu phần trăm tổng số sách?\n${SACH}`, [r`\(30\%\)`, r`\(60\%\)`, r`\(25\%\)`, r`\(20\%\)`], r`\(\dfrac{60}{200}\cdot100\% = 30\%\).`, [
      undefined,
      'Nhầm số sách với tỉ lệ.',
      'Đó là tỉ lệ nếu bốn lớp bằng nhau.',
      'Đó là tỉ lệ của lớp 8C.',
    ]),
    mc(2, PC, `Quan sát biểu đồ. Bạn nào có số giờ tự học tăng nhiều nhất từ tháng 9 sang tháng 10?\n${GIO}`, ['Dũng', 'An', 'Bình', 'Chi'], 'Mức tăng: An 2 giờ, Bình 2 giờ, Chi 1 giờ, Dũng 4 giờ.', [
      undefined,
      'An chỉ tăng 2 giờ.',
      'Bình chỉ tăng 2 giờ.',
      'Chi có nhiều giờ nhất nhưng chỉ tăng 1 giờ.',
    ]),
    mc(3, PC, `Quan sát biểu đồ. Tổng số giờ tự học của bốn bạn trong tháng 10 tăng bao nhiêu phần trăm so với tháng 9?\n${GIO}`, [r`\(37{,}5\%\)`, r`\(9\%\)`, r`\(27{,}3\%\)`, r`\(137{,}5\%\)`], r`Tháng 9: 24 giờ; tháng 10: 33 giờ. Tỉ lệ tăng \(\dfrac{33 - 24}{24}\cdot100\% = 37{,}5\%\).`, [
      undefined,
      'Đó là số giờ tăng, chưa đổi ra phần trăm.',
      'Chia nhầm cho số giờ tháng 10.',
      'Đó là tỉ số giữa tháng 10 và tháng 9, chưa trừ đi 100%.',
    ]),
    mc(1, PD, `Quan sát biểu đồ. Tháng nào cửa hàng có doanh thu thấp nhất?\n${DOANH}`, ['Tháng 2', 'Tháng 1', 'Tháng 5', 'Tháng 6'], 'Điểm thấp nhất trên đường gấp khúc ứng với tháng 2 (95 triệu đồng).', [
      undefined,
      'Tháng 1 là 120 triệu đồng.',
      'Tháng 5 cao nhất.',
      'Tháng 6 là 145 triệu đồng.',
    ]),
    mc(2, PD, `Quan sát biểu đồ. Doanh thu tăng liên tục trong giai đoạn nào?\n${DOANH}`, ['Từ tháng 2 đến tháng 5', 'Từ tháng 1 đến tháng 3', 'Từ tháng 4 đến tháng 6', 'Từ tháng 1 đến tháng 6'], 'Từ tháng 2 đến tháng 5 đường gấp khúc luôn đi lên: 95; 110; 125; 150.', [
      undefined,
      'Tháng 1 sang tháng 2 giảm.',
      'Tháng 5 sang tháng 6 giảm.',
      'Có lúc giảm.',
    ]),
    mc(3, PD, `Quan sát biểu đồ. Doanh thu tháng 5 tăng bao nhiêu phần trăm so với tháng 4?\n${DOANH}`, [r`\(20\%\)`, r`\(25\%\)`, r`\(16{,}7\%\)`, r`\(125\%\)`], r`\(\dfrac{150 - 125}{125}\cdot100\% = 20\%\).`, [
      undefined,
      'Đó là số tiền tăng (triệu đồng).',
      'Chia nhầm cho doanh thu tháng 5.',
      'Nhầm tỉ lệ.',
    ]),
    mc(1, PQ, `Quan sát biểu đồ. Khoản chi nào chiếm tỉ lệ lớn nhất?\n${CHI}`, ['Ăn uống', 'Học tập', 'Tiết kiệm', 'Khác'], 'Ăn uống chiếm 40%, lớn nhất.', [
      undefined,
      'Học tập chiếm 20%.',
      'Tiết kiệm chiếm 10%, nhỏ nhất.',
      'Khác chiếm 15%.',
    ]),
    mc(2, PQ, `Quan sát biểu đồ. Nếu thu nhập hằng tháng của gia đình là 20 triệu đồng thì số tiền chi cho học tập là\n${CHI}`, ['4 triệu đồng', '2 triệu đồng', '8 triệu đồng', '20 triệu đồng'], r`\(20\cdot20\% = 4\) triệu đồng.`, [
      undefined,
      'Đó là tiền tiết kiệm (10%).',
      'Đó là tiền ăn uống (40%).',
      'Đó là tổng thu nhập.',
    ]),
    mc(3, PQ, `Quan sát biểu đồ. Nếu thu nhập hằng tháng là 25 triệu đồng thì trong một năm (12 tháng) gia đình tiết kiệm được\n${CHI}`, ['30 triệu đồng', '2,5 triệu đồng', '300 triệu đồng', '25 triệu đồng'], r`Mỗi tháng tiết kiệm \(25\cdot10\% = 2{,}5\) triệu đồng; một năm \(2{,}5\cdot12 = 30\) triệu đồng.`, [
      undefined,
      'Đó là tiền tiết kiệm của một tháng.',
      'Nhầm thu nhập cả năm với tiền tiết kiệm.',
      'Đó là thu nhập một tháng.',
    ]),
    mc(3, GH, 'Một biểu đồ cột so sánh số khách của hai cửa hàng: cửa hàng A có 980 khách, cửa hàng B có 1000 khách, nhưng trục số liệu bắt đầu từ 950 nên cột B trông cao gần gấp đôi cột A. Nhận định nào đúng?', ['Biểu đồ gây hiểu lầm vì trục số liệu không bắt đầu từ 0', 'Cửa hàng B có số khách gấp đôi cửa hàng A', 'Cửa hàng A có nhiều khách hơn', 'Biểu đồ biểu diễn hoàn toàn chính xác'], r`Thực tế B chỉ hơn A khoảng \(\dfrac{20}{980} \approx 2\%\); trục bắt đầu từ 950 làm chênh lệch trông lớn hơn nhiều.`, [
      undefined,
      r`\(1000\) không gấp đôi \(980\).`,
      'A ít khách hơn B.',
      'Trục không bắt đầu từ 0 gây hiểu lầm.',
    ]),
    mc(4, GH, 'Một biểu đồ hình quạt tròn về loại trái cây yêu thích ghi: Xoài 40%, Cam 35%, Chuối 25%, Táo 10%. Nhận định nào đúng?', ['Biểu đồ sai vì tổng các tỉ lệ bằng 110%', 'Biểu đồ sai vì có bốn phần', 'Biểu đồ đúng', 'Biểu đồ sai vì Xoài chiếm tỉ lệ lớn nhất'], r`\(40 + 35 + 25 + 10 = 110 \ne 100\); tổng các phần của biểu đồ quạt phải bằng 100%.`, [
      undefined,
      'Số phần không quan trọng.',
      'Tổng khác 100% nên sai.',
      'Không có lí do.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, PC, `Quan sát biểu đồ và xét tính đúng sai:\n${SACH}`, [
      ['Lớp 8B quyên góp được 60 cuốn.', true, 'Đọc trên biểu đồ.'],
      ['Lớp 8C quyên góp ít nhất.', true, '40 cuốn.'],
      ['Lớp 8A quyên góp nhiều hơn lớp 8D.', false, r`\(45 < 55\).`],
      ['Cả khối quyên góp được 200 cuốn.', true, r`\(45 + 60 + 40 + 55\).`],
    ]),
    tf(2, PC, `Quan sát biểu đồ và xét tính đúng sai:\n${GIO}`, [
      ['Trong tháng 9, Chi có số giờ tự học nhiều nhất.', true, '9 giờ.'],
      ['Số giờ tự học của Dũng tăng gấp đôi.', true, r`Từ 4 lên 8 giờ.`],
      ['Cả bốn bạn đều tăng số giờ tự học.', true, 'Mỗi bạn đều tăng ít nhất 1 giờ.'],
      ['Bình tăng 3 giờ.', false, r`Từ 5 lên 7 giờ, tăng 2 giờ.`],
    ]),
    tf(1, PD, `Quan sát biểu đồ và xét tính đúng sai:\n${DOANH}`, [
      ['Doanh thu cao nhất vào tháng 5.', true, '150 triệu đồng.'],
      ['Từ tháng 1 sang tháng 2 doanh thu giảm.', true, 'Từ 120 xuống 95.'],
      ['Doanh thu tháng 6 cao hơn tháng 5.', false, r`\(145 < 150\).`],
      ['Doanh thu tháng 3 là 110 triệu đồng.', true, 'Đọc trên biểu đồ.'],
    ]),
    tf(3, PD, `Quan sát biểu đồ và xét tính đúng sai:\n${DOANH}`, [
      ['Tổng doanh thu 6 tháng là 745 triệu đồng.', true, r`\(120 + 95 + 110 + 125 + 150 + 145\).`],
      ['Doanh thu trung bình mỗi tháng khoảng 124,2 triệu đồng.', true, r`\(745 : 6 \approx 124{,}2\).`],
      ['Từ tháng 2 đến tháng 5 doanh thu tăng thêm 55 triệu đồng.', true, r`\(150 - 95\).`],
      ['Doanh thu tháng 6 giảm 10% so với tháng 5.', false, r`Giảm \(\dfrac{5}{150} \approx 3{,}3\%\).`],
    ]),
    tf(2, PQ, `Quan sát biểu đồ và xét tính đúng sai:\n${CHI}`, [
      ['Ăn uống chiếm 40%.', true, 'Đọc trên biểu đồ.'],
      ['Khoản "Đi lại" và khoản "Khác" bằng nhau.', true, 'Cùng 15%.'],
      ['Khoản học tập gấp đôi khoản tiết kiệm.', true, '20% và 10%.'],
      ['Tiết kiệm là khoản lớn thứ hai.', false, 'Tiết kiệm là khoản nhỏ nhất.'],
    ]),
    tf(3, PQ, `Quan sát biểu đồ. Thu nhập hằng tháng của gia đình là 18 triệu đồng.\n${CHI}`, [
      ['Tiền ăn uống là 7,2 triệu đồng.', true, r`\(18\cdot40\%\).`],
      ['Tiền đi lại là 2,7 triệu đồng.', true, r`\(18\cdot15\%\).`],
      ['Tiền tiết kiệm là 1,8 triệu đồng.', true, r`\(18\cdot10\%\).`],
      ['Tiền học tập là 2 triệu đồng.', false, r`\(18\cdot20\% = 3{,}6\) triệu đồng.`],
    ]),
    tf(3, GH, 'Xét tính đúng sai về các biểu đồ gây hiểu lầm:', [
      ['Biểu đồ cột có trục số liệu không bắt đầu từ 0 có thể gây hiểu lầm.', true, 'Chênh lệch trông lớn hơn thực tế.'],
      ['Biểu đồ hình quạt có tổng tỉ lệ khác 100% là biểu đồ sai.', true, 'Cả hình tròn ứng với 100%.'],
      ['Trục số liệu chia không đều có thể làm sai lệch xu hướng.', true, 'Khoảng cách không tỉ lệ với giá trị.'],
      ['Biểu đồ có màu sắc đẹp thì luôn chính xác.', false, 'Màu sắc không quyết định độ chính xác.'],
    ]),
    tf(4, GH, 'Một biểu đồ đoạn thẳng về doanh số có trục ngang ghi các năm 2019, 2020, 2022, 2023 (thiếu năm 2021) và các mốc được đặt cách đều nhau.', [
      ['Biểu đồ có thể gây hiểu lầm về tốc độ thay đổi.', true, 'Khoảng 2020 – 2022 là hai năm nhưng vẽ như một năm.'],
      ['Khoảng cách các mốc trên trục ngang nên tương ứng với thời gian thực.', true, 'Để độ dốc phản ánh đúng.'],
      ['Biểu đồ vẫn hoàn toàn chính xác.', false, 'Thiếu một năm và vẽ sai khoảng cách.'],
      ['Nên bổ sung số liệu năm 2021 hoặc ghi chú rõ.', true, 'Cách sửa hợp lí.'],
    ]),
    tf(2, PC, `Quan sát biểu đồ và xét tính đúng sai:\n${GIO}`, [
      ['Tổng số giờ tự học của bốn bạn trong tháng 10 là 33 giờ.', true, r`\(8 + 7 + 10 + 8\).`],
      ['Tổng số giờ tự học của bốn bạn trong tháng 9 là 24 giờ.', true, r`\(6 + 5 + 9 + 4\).`],
      ['Trong tháng 10, An tự học nhiều hơn Chi.', false, 'An 8 giờ, Chi 10 giờ.'],
      ['Trong tháng 10, Bình tự học ít giờ nhất.', true, '7 giờ.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, PC, `Quan sát biểu đồ. Lớp 8D quyên góp nhiều hơn lớp 8A bao nhiêu cuốn sách?\n${SACH}`, '10', r`\(55 - 45 = 10\) cuốn.`, { unit: 'cuốn' }),
    sa(3, PD, `Quan sát biểu đồ. Tính tổng doanh thu quý II (tháng 4, 5, 6).\n${DOANH}`, '420', r`\(125 + 150 + 145 = 420\) triệu đồng.`, TR),
    sa(3, PQ, `Quan sát biểu đồ. Thu nhập hằng tháng của gia đình là 30 triệu đồng. Tính số tiền chi cho ăn uống.\n${CHI}`, '12', r`\(30\cdot40\% = 12\) triệu đồng.`, TR),
    sa(4, GH, 'Một biểu đồ cột so sánh hai sản phẩm A (bán được 480 chiếc) và B (bán được 500 chiếc), trục số liệu bắt đầu từ 470. Trên biểu đồ, cột B cao gấp bao nhiêu lần cột A?', '3', r`Chiều cao cột trên hình: A ứng với \(480 - 470 = 10\), B ứng với \(500 - 470 = 30\); cột B cao gấp 3 lần, trong khi thực tế B chỉ hơn A khoảng 4%.`),
    // ---- Tự luận ----
    es(2, PC, `Quan sát biểu đồ.\n${SACH}\na) Sắp xếp các lớp theo thứ tự số sách quyên góp giảm dần.\nb) Tính tỉ lệ phần trăm số sách của mỗi lớp so với tổng số sách.`, r`a) 8B (60), 8D (55), 8A (45), 8C (40).
b) Tổng 200 cuốn: 8A 22,5%; 8B 30%; 8C 20%; 8D 27,5%.`, r`0,5 điểm: câu a.
0,5 điểm: câu b, tính đúng bốn tỉ lệ.`),
    es(3, PD, `Quan sát biểu đồ.\n${DOANH}\na) Nhận xét xu hướng doanh thu trong 6 tháng.\nb) Tính tỉ lệ phần trăm doanh thu tháng 6 giảm so với tháng 5 (làm tròn đến hàng phần mười).`, r`a) Doanh thu giảm từ tháng 1 sang tháng 2, sau đó tăng liên tục từ tháng 2 đến tháng 5 (cao nhất 150 triệu đồng), rồi giảm nhẹ ở tháng 6.
b) \(\dfrac{150 - 145}{150}\cdot100\% \approx 3{,}3\%\).`, r`0,5 điểm: nhận xét đúng các giai đoạn tăng, giảm.
0,5 điểm: tính đúng tỉ lệ giảm.`),
    es(3, PQ, `Quan sát biểu đồ.\n${CHI}\nThu nhập hằng tháng của gia đình là 24 triệu đồng.\na) Tính số tiền của từng khoản chi.\nb) Gia đình muốn tăng tiết kiệm lên 15% bằng cách giảm khoản "Khác". Khi đó khoản "Khác" còn bao nhiêu phần trăm và bao nhiêu tiền?`, r`a) Ăn uống 9,6 triệu; học tập 4,8 triệu; đi lại 3,6 triệu; tiết kiệm 2,4 triệu; khác 3,6 triệu đồng.
b) Tiết kiệm tăng 5% nên khoản "Khác" giảm còn \(15\% - 5\% = 10\%\), tức \(2{,}4\) triệu đồng.`, r`0,5 điểm: câu a, tính đúng năm khoản.
0,5 điểm: câu b, lập luận và tính đúng.`),
    es(4, GH, 'Một quảng cáo viết "Doanh số tăng vọt!" kèm biểu đồ cột: năm 2024 doanh số 200 tỉ đồng, năm 2025 doanh số 210 tỉ đồng, trục số liệu bắt đầu từ 195.\na) Trên biểu đồ, cột năm 2025 cao gấp mấy lần cột năm 2024?\nb) Doanh số thực tế tăng bao nhiêu phần trăm? Biểu đồ có gây hiểu lầm không? Nên sửa thế nào?', r`a) Chiều cao trên hình ứng với \(200 - 195 = 5\) và \(210 - 195 = 15\): cột năm 2025 cao gấp 3 lần.
b) Thực tế tăng \(\dfrac{10}{200}\cdot100\% = 5\%\). Biểu đồ gây hiểu lầm vì trục không bắt đầu từ 0; cần vẽ lại với trục số liệu bắt đầu từ 0.
[bieudo]
loai: cot
tieude: Doanh số hai năm
nhan: 2024; 2025
so lieu: 200; 210
donvi: tỉ đồng
[/bieudo]`, r`0,25 điểm: câu a.
0,5 điểm: tính đúng tỉ lệ tăng thực tế và chỉ ra nguyên nhân gây hiểu lầm.
0,25 điểm: đề xuất cách vẽ lại.`),
  ],
};

export const BANK_CHUONG_5: BankLesson[] = [B18, B19, B20];
