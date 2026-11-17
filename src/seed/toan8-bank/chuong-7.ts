/** Ngân hàng câu hỏi GĐ4 – Chương VII. Phương trình bậc nhất và hàm số bậc nhất (Bài 25 – Bài 29). */
import { es, mc, r, sa, tf, type BankLesson } from './types';

const KN = 'kiem-tra-nghiem';
const ND = 'nhan-dang-phuong-trinh-bac-nhat';
const GI = 'giai-phuong-trinh-bac-nhat';
const DV = 'phuong-trinh-dua-ve-ax-b';
const TX = 'tim-x-de-bieu-thuc-nhan-gia-tri';
const TT = 'thuc-te-dan-toi-phuong-trinh';

const B25: BankLesson = {
  slug: 'bai-25-phuong-trinh-bac-nhat-mot-an',
  questions: [
    mc(1, KN, r`\(x = 2\) là nghiệm của phương trình nào sau đây?`, [r`\(3x - 6 = 0\)`, r`\(2x + 4 = 0\)`, r`\(x + 2 = 0\)`, r`\(5x = 2\)`], r`Thay \(x = 2\): \(3\cdot2 - 6 = 0\). Các phương trình còn lại không thỏa mãn.`, [
      undefined,
      r`\(2\cdot2 + 4 = 8 \ne 0\).`,
      r`\(2 + 2 = 4 \ne 0\).`,
      r`\(5\cdot2 = 10 \ne 2\).`,
    ]),
    mc(2, KN, r`Số nào sau đây là nghiệm của phương trình \(2(x - 1) = x + 3\)?`, [r`\(5\)`, r`\(1\)`, r`\(-5\)`, r`\(4\)`], r`Thay \(x = 5\): vế trái \(2\cdot4 = 8\), vế phải \(5 + 3 = 8\).`, [
      undefined,
      'Vế trái 0, vế phải 4.',
      'Vế trái −12, vế phải −2.',
      'Vế trái 6, vế phải 7.',
    ]),
    mc(1, ND, 'Phương trình nào sau đây là phương trình bậc nhất một ẩn?', [r`\(2x - 5 = 0\)`, r`\(x^2 - 1 = 0\)`, r`\(0x + 3 = 0\)`, r`\(\dfrac1x + 2 = 0\)`], r`Dạng \(ax + b = 0\) với \(a = 2 \ne 0\).`, [
      undefined,
      r`Có \(x^2\).`,
      r`Hệ số \(a = 0\).`,
      'Ẩn ở mẫu.',
    ]),
    mc(1, ND, r`Phương trình \(3 - 0{,}5y = 0\) là phương trình bậc nhất ẩn \(y\) với hệ số`, [r`\(a = -0{,}5\), \(b = 3\)`, r`\(a = 3\), \(b = -0{,}5\)`, r`\(a = 0{,}5\), \(b = 3\)`, r`\(a = -0{,}5\), \(b = -3\)`], r`Viết lại \(-0{,}5y + 3 = 0\): \(a = -0{,}5\), \(b = 3\).`, [
      undefined,
      'Nhầm vị trí hệ số.',
      'Quên dấu trừ của hệ số \\(a\\).',
      'Sai dấu của \\(b\\).',
    ]),
    mc(1, GI, r`Nghiệm của phương trình \(4x - 12 = 0\) là`, [r`\(x = 3\)`, r`\(x = -3\)`, r`\(x = 8\)`, r`\(x = 16\)`], r`\(4x = 12 \iff x = 3\).`, [
      undefined,
      'Sai dấu khi chuyển vế.',
      'Trừ thay vì chia.',
      'Cộng thay vì chia.',
    ]),
    mc(2, GI, r`Nghiệm của phương trình \(7 - 2x = 0\) là`, [r`\(x = \dfrac72\)`, r`\(x = -\dfrac72\)`, r`\(x = \dfrac27\)`, r`\(x = 5\)`], r`\(-2x = -7 \iff x = \dfrac72\).`, [
      undefined,
      'Sai dấu khi chia cho \\(-2\\).',
      'Chia ngược.',
      'Trừ thay vì chia.',
    ]),
    mc(2, GI, r`Nghiệm của phương trình \(\dfrac23x + 4 = 0\) là`, [r`\(x = -6\)`, r`\(x = 6\)`, r`\(x = -\dfrac83\)`, r`\(x = -\dfrac23\)`], r`\(\dfrac23x = -4 \iff x = -4\cdot\dfrac32 = -6\).`, [
      undefined,
      'Sai dấu.',
      r`Nhân với \(\dfrac23\) thay vì chia.`,
      'Không có cơ sở.',
    ]),
    mc(2, DV, r`Nghiệm của phương trình \(3(x - 2) = x + 4\) là`, [r`\(x = 5\)`, r`\(x = 1\)`, r`\(x = 3\)`, r`\(x = -5\)`], r`\(3x - 6 = x + 4 \iff 2x = 10 \iff x = 5\).`, [
      undefined,
      r`Bỏ ngoặc sai thành \(3x - 2\).`,
      'Chuyển vế sai.',
      'Sai dấu.',
    ]),
    mc(3, DV, r`Nghiệm của phương trình \(\dfrac{x + 1}{2} - \dfrac{x - 2}{3} = 2\) là`, [r`\(x = 5\)`, r`\(x = 13\)`, r`\(x = 1\)`, r`\(x = -5\)`], r`Nhân hai vế với 6: \(3(x + 1) - 2(x - 2) = 12 \iff x + 7 = 12 \iff x = 5\).`, [
      undefined,
      r`Quên đổi dấu: \(-2(x - 2) = -2x + 4\), không phải \(-2x - 4\).`,
      'Quên nhân vế phải với 6.',
      'Sai dấu khi chuyển vế.',
    ]),
    mc(4, DV, r`Phương trình \(2(x - 1) - 3 = 2x - 5\)`, [r`nghiệm đúng với mọi \(x\)`, 'vô nghiệm', r`có nghiệm duy nhất \(x = 0\)`, r`có nghiệm duy nhất \(x = 5\)`], r`Vế trái \(2x - 5\) bằng vế phải với mọi \(x\): \(0x = 0\).`, [
      undefined,
      r`Vô nghiệm khi được \(0x = c\) với \(c \ne 0\).`,
      'Mọi số đều là nghiệm, không chỉ 0.',
      'Mọi số đều là nghiệm.',
    ]),
    mc(3, TX, r`Giá trị của \(x\) để hai biểu thức \(5x - 3\) và \(2x + 9\) có giá trị bằng nhau là`, [r`\(x = 4\)`, r`\(x = 2\)`, r`\(x = -4\)`, r`\(x = 12\)`], r`\(5x - 3 = 2x + 9 \iff 3x = 12 \iff x = 4\).`, [
      undefined,
      'Chuyển vế sai.',
      'Sai dấu.',
      'Quên chia cho 3.',
    ]),
    mc(3, TT, r`Một hình chữ nhật có chu vi 50 cm, chiều dài hơn chiều rộng 5 cm. Gọi chiều rộng là \(x\) (cm). Phương trình nào sau đây đúng?`, [r`\(2(x + x + 5) = 50\)`, r`\(x + x + 5 = 50\)`, r`\(x(x + 5) = 50\)`, r`\(2x + 5 = 50\)`], 'Chu vi bằng hai lần tổng chiều dài và chiều rộng.', [
      undefined,
      'Quên nhân 2.',
      'Đó là diện tích.',
      'Đó là nửa chu vi viết sai.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, KN, r`Xét phương trình \(2x + 1 = x + 4\).`, [
      [r`\(x = 3\) là nghiệm.`, true, 'Hai vế cùng bằng 7.'],
      [r`\(x = 1\) là nghiệm.`, false, 'Vế trái 3, vế phải 5.'],
      [r`Tại \(x = 3\), vế trái bằng 7.`, true, r`\(2\cdot3 + 1\).`],
      ['Phương trình có nghiệm duy nhất.', true, r`Tương đương \(x = 3\).`],
    ]),
    tf(1, ND, 'Xét tính đúng sai:', [
      [r`\(5x + 2 = 0\) là phương trình bậc nhất một ẩn.`, true, r`\(a = 5 \ne 0\).`],
      [r`\(x^2 = 4\) là phương trình bậc nhất một ẩn.`, false, r`Có \(x^2\).`],
      [r`\(0x - 3 = 0\) là phương trình bậc nhất một ẩn.`, false, r`\(a = 0\).`],
      [r`\(2 - 3t = 0\) là phương trình bậc nhất ẩn \(t\).`, true, r`\(a = -3 \ne 0\).`],
    ]),
    tf(2, GI, 'Xét tính đúng sai:', [
      [r`Phương trình \(3x = 0\) có nghiệm \(x = 0\).`, true, 'Chia hai vế cho 3.'],
      [r`Phương trình \(-2x = 8\) có nghiệm \(x = -4\).`, true, 'Chia cho \\(-2\\).'],
      [r`Phương trình \(\dfrac{x}{5} = 2\) có nghiệm \(x = 10\).`, true, 'Nhân hai vế với 5.'],
      [r`Phương trình \(4x - 1 = 0\) có nghiệm \(x = 4\).`, false, r`Nghiệm là \(x = \dfrac14\).`],
    ]),
    tf(2, GI, 'Xét tính đúng sai về các quy tắc biến đổi phương trình:', [
      ['Khi chuyển một hạng tử từ vế này sang vế kia phải đổi dấu hạng tử đó.', true, 'Quy tắc chuyển vế.'],
      ['Nhân hai vế với cùng một số khác 0 được phương trình có cùng tập nghiệm.', true, 'Quy tắc nhân.'],
      ['Có thể chia hai vế của phương trình cho 0.', false, 'Không chia cho 0.'],
      [r`\(x + 7 = 10 \iff x = 3\).`, true, 'Chuyển vế.'],
    ]),
    tf(3, DV, r`Giải phương trình \(2(x + 3) - (x - 1) = 10\).`, [
      [r`Bỏ ngoặc được \(2x + 6 - x + 1 = 10\).`, true, 'Đổi dấu khi bỏ ngoặc có dấu trừ.'],
      [r`Thu gọn được \(x + 7 = 10\).`, true, 'Cộng các hạng tử đồng dạng.'],
      [r`Nghiệm là \(x = 3\).`, true, 'Chuyển vế.'],
      [r`Nghiệm là \(x = 17\).`, false, 'Chuyển vế sai dấu.'],
    ]),
    tf(4, DV, 'Xét tính đúng sai:', [
      [r`Phương trình \(3(x - 1) = 3x + 2\) vô nghiệm.`, true, r`\(0x = 5\).`],
      [r`Phương trình \(2(x + 1) = 2x + 2\) nghiệm đúng với mọi \(x\).`, true, r`\(0x = 0\).`],
      [r`Phương trình \(0x = 5\) có nghiệm \(x = 0\).`, false, r`\(0\cdot0 = 0 \ne 5\).`],
      [r`Phương trình \(0x = 0\) vô nghiệm.`, false, 'Mọi số đều là nghiệm.'],
    ]),
    tf(2, TX, r`Cho biểu thức \(A = 4x - 7\).`, [
      [r`\(A = 5\) khi \(x = 3\).`, true, r`\(12 - 7\).`],
      [r`\(A = 0\) khi \(x = \dfrac74\).`, true, r`\(4x = 7\).`],
      [r`\(A = -7\) khi \(x = 0\).`, true, 'Thay số.'],
      [r`\(A = 9\) khi \(x = 2\).`, false, r`\(A = 9\) khi \(x = 4\).`],
    ]),
    tf(3, TT, r`Vé vào bảo tàng: người lớn 40 000 đồng, trẻ em 25 000 đồng. Một nhóm gồm 2 người lớn và \(x\) trẻ em trả tổng cộng 205 000 đồng.`, [
      [r`Phương trình: \(80\,000 + 25\,000x = 205\,000\).`, true, 'Tổng tiền vé.'],
      [r`\(x = 5\).`, true, r`\(25\,000x = 125\,000\).`],
      [r`\(x = 8{,}2\).`, false, 'Quên trừ tiền vé người lớn.'],
      [r`Điều kiện của \(x\) là số nguyên dương.`, true, 'Số trẻ em.'],
    ]),
    // ---- Tự luận ----
    es(2, GI, r`Giải các phương trình: a) \(5x - 15 = 0\); b) \(\dfrac23x - \dfrac12 = 0\).`, r`a) \(5x = 15 \iff x = 3\).
b) \(\dfrac23x = \dfrac12 \iff x = \dfrac12\cdot\dfrac32 = \dfrac34\).`, r`0,5 điểm: câu a.
0,5 điểm: câu b.`),
    es(2, KN, r`Kiểm tra xem mỗi số \(x = -1\), \(x = 2\), \(x = 3\) có là nghiệm của phương trình \(x^2 - x = 2\) không.`, r`\(x = -1\): \(1 + 1 = 2\). Là nghiệm.
\(x = 2\): \(4 - 2 = 2\). Là nghiệm.
\(x = 3\): \(9 - 3 = 6 \ne 2\). Không là nghiệm.`, r`0,5 điểm: kiểm tra đúng hai số \(-1\) và \(2\).
0,5 điểm: kiểm tra đúng số 3 và kết luận.`),
    es(3, DV, r`Giải các phương trình: a) \(5(x - 2) - 3(x + 1) = 7\); b) \(\dfrac{2x - 1}{3} - \dfrac{x - 2}{2} = 1\).`, r`a) \(5x - 10 - 3x - 3 = 7 \iff 2x = 20 \iff x = 10\).
b) Nhân hai vế với 6: \(2(2x - 1) - 3(x - 2) = 6 \iff 4x - 2 - 3x + 6 = 6 \iff x = 2\).`, r`0,5 điểm: câu a.
0,5 điểm: câu b, khử mẫu và đổi dấu đúng.`),
    es(4, DV, r`Giải các phương trình: a) \((x + 1)^2 - (x - 1)^2 = 16\); b) \((x - 2)(x + 2) - x(x - 3) = 5\).`, r`a) \(4x = 16 \iff x = 4\).
b) \(x^2 - 4 - x^2 + 3x = 5 \iff 3x = 9 \iff x = 3\).`, r`0,5 điểm: câu a, dùng hằng đẳng thức rút gọn đúng.
0,5 điểm: câu b.`),
    es(3, TT, r`Mẹ An mua 3 kg táo và 2 kg cam hết 270 nghìn đồng. Biết mỗi ki-lô-gam táo đắt hơn mỗi ki-lô-gam cam 15 nghìn đồng. Tính giá mỗi ki-lô-gam cam.`, r`Gọi giá mỗi kg cam là \(x\) (nghìn đồng), \(x > 0\); giá mỗi kg táo là \(x + 15\).
Phương trình: \(3(x + 15) + 2x = 270 \iff 5x + 45 = 270 \iff x = 45\) (thỏa mãn).
Vậy mỗi kg cam giá 45 nghìn đồng.`, r`0,5 điểm: chọn ẩn, lập đúng phương trình.
0,5 điểm: giải đúng và trả lời.`),
  ],
};

const CD = 'bai-toan-chuyen-dong';
const NS = 'bai-toan-nang-suat';
const PT = 'bai-toan-ti-so-phan-tram';
const DT = 'bai-toan-chu-vi-dien-tich';
const ST = 'bai-toan-quan-he-so-tuoi';

const B26: BankLesson = {
  slug: 'bai-26-giai-bai-toan-bang-cach-lap-phuong-trinh',
  questions: [
    mc(2, ST, 'Bước đầu tiên khi giải bài toán bằng cách lập phương trình là', ['chọn ẩn và đặt điều kiện cho ẩn', 'giải phương trình', 'trả lời bài toán', 'kiểm tra nghiệm'], 'Lập phương trình bắt đầu từ chọn ẩn, đơn vị và điều kiện.', [
      undefined,
      'Phải có phương trình trước.',
      'Đó là bước cuối.',
      'Kiểm tra sau khi giải.',
    ]),
    mc(2, ST, r`Tổng của hai số là 45, số lớn gấp 4 lần số nhỏ. Gọi số nhỏ là \(x\), phương trình là`, [r`\(x + 4x = 45\)`, r`\(4x = 45\)`, r`\(x + 4 = 45\)`, r`\(x\cdot4x = 45\)`], r`Số lớn là \(4x\); tổng hai số là \(x + 4x\).`, [
      undefined,
      'Quên cộng số nhỏ.',
      '"Gấp 4 lần" là nhân 4.',
      'Đó là tích.',
    ]),
    mc(2, ST, r`Năm nay mẹ 36 tuổi, con 8 tuổi. Sau \(x\) năm nữa tuổi mẹ gấp 3 lần tuổi con. Phương trình là`, [r`\(36 + x = 3(8 + x)\)`, r`\(36 = 3(8 + x)\)`, r`\(36 + x = 3\cdot8 + x\)`, r`\(36 - x = 3(8 - x)\)`], r`Sau \(x\) năm, mẹ \(36 + x\) tuổi, con \(8 + x\) tuổi.`, [
      undefined,
      'Tuổi mẹ cũng tăng thêm \\(x\\).',
      'Phải nhân 3 với cả tuổi con sau \\(x\\) năm.',
      '"Sau" thì cộng thêm năm.',
    ]),
    mc(2, CD, r`Một ô tô đi với vận tốc \(x\) (km/h) trong 3 giờ thì được quãng đường`, [r`\(3x\) km`, r`\(\dfrac{x}{3}\) km`, r`\(x + 3\) km`, r`\(\dfrac3x\) km`], r`Quãng đường bằng vận tốc nhân thời gian.`, [
      undefined,
      'Chia thay vì nhân.',
      'Cộng thay vì nhân.',
      'Đó là thời gian đi 3 km.',
    ]),
    mc(3, CD, r`Một xe máy đi từ A đến B với vận tốc 30 km/h; một ô tô đi với vận tốc 45 km/h thì đến B sớm hơn 1 giờ. Gọi quãng đường AB là \(x\) (km), phương trình là`, [r`\(\dfrac{x}{30} - \dfrac{x}{45} = 1\)`, r`\(\dfrac{x}{45} - \dfrac{x}{30} = 1\)`, r`\(30x - 45x = 1\)`, r`\(\dfrac{x}{30} + \dfrac{x}{45} = 1\)`], r`Thời gian xe máy \(\dfrac{x}{30}\) lớn hơn thời gian ô tô \(\dfrac{x}{45}\) là 1 giờ.`, [
      undefined,
      'Thời gian ô tô ít hơn nên hiệu này âm.',
      'Nhân thay vì chia.',
      'Hai thời gian không cộng lại.',
    ]),
    mc(3, CD, r`Một ca nô có vận tốc riêng \(x\) (km/h), vận tốc dòng nước 3 km/h. Vận tốc ca nô khi xuôi dòng là`, [r`\(x + 3\) km/h`, r`\(x - 3\) km/h`, r`\(3x\) km/h`, r`\(x\) km/h`], 'Xuôi dòng: vận tốc riêng cộng vận tốc dòng nước.', [
      undefined,
      'Đó là vận tốc ngược dòng.',
      'Không nhân.',
      'Chưa cộng vận tốc dòng nước.',
    ]),
    mc(4, CD, 'Hai xe khởi hành cùng lúc từ hai địa điểm A và B cách nhau 180 km, đi ngược chiều nhau với vận tốc 40 km/h và 50 km/h. Sau bao lâu hai xe gặp nhau?', [r`\(2\) giờ`, r`\(4{,}5\) giờ`, r`\(3{,}6\) giờ`, r`\(18\) giờ`], r`Gọi thời gian là \(t\): \(40t + 50t = 180 \iff t = 2\) giờ.`, [
      undefined,
      'Chỉ dùng vận tốc xe thứ nhất.',
      'Chỉ dùng vận tốc xe thứ hai.',
      'Dùng hiệu vận tốc.',
    ]),
    mc(3, NS, r`Theo kế hoạch, mỗi ngày một tổ làm 40 sản phẩm trong \(x\) ngày. Thực tế mỗi ngày làm 50 sản phẩm nên xong sớm hơn 2 ngày (số sản phẩm không đổi). Phương trình là`, [r`\(40x = 50(x - 2)\)`, r`\(40x = 50(x + 2)\)`, r`\(40(x - 2) = 50x\)`, r`\(40 + x = 50 + x - 2\)`], r`Tổng sản phẩm: kế hoạch \(40x\), thực tế \(50(x - 2)\).`, [
      undefined,
      'Xong sớm thì số ngày ít hơn.',
      'Đặt sai vị trí số ngày.',
      'Năng suất nhân thời gian, không cộng.',
    ]),
    mc(3, NS, 'Một xưởng dự định may 1200 chiếc áo, mỗi ngày may 50 chiếc. Thực tế mỗi ngày may được 60 chiếc. Xưởng hoàn thành sớm hơn dự định bao nhiêu ngày?', [r`\(4\)`, r`\(20\)`, r`\(24\)`, r`\(10\)`], r`Dự định \(1200 : 50 = 24\) ngày; thực tế \(1200 : 60 = 20\) ngày; sớm 4 ngày.`, [
      undefined,
      'Đó là số ngày thực tế.',
      'Đó là số ngày dự định.',
      'Đó là số áo may thêm mỗi ngày.',
    ]),
    mc(2, PT, r`Giá một chiếc áo sau khi giảm 10% là 180 000 đồng. Gọi giá ban đầu là \(x\) (đồng), phương trình là`, [r`\(0{,}9x = 180\,000\)`, r`\(x - 10 = 180\,000\)`, r`\(1{,}1x = 180\,000\)`, r`\(0{,}1x = 180\,000\)`], 'Giảm 10% thì còn 90% giá ban đầu.', [
      undefined,
      '10% không phải 10 đồng.',
      'Đó là tăng 10%.',
      'Đó là số tiền được giảm.',
    ]),
    mc(3, PT, 'Một người gửi tiết kiệm với lãi suất 6%/năm. Sau một năm, người đó nhận được cả gốc lẫn lãi 53 000 000 đồng. Số tiền gửi ban đầu là', ['50 000 000 đồng', '49 820 000 đồng', '47 000 000 đồng', '56 180 000 đồng'], r`Gọi số tiền gửi là \(x\): \(1{,}06x = 53\,000\,000 \iff x = 50\,000\,000\).`, [
      undefined,
      'Tính 6% trên số tiền nhận được là sai.',
      '6% không phải 6 triệu đồng.',
      'Nhân thay vì chia.',
    ]),
    mc(2, DT, 'Một hình chữ nhật có chiều dài gấp đôi chiều rộng và chu vi 36 cm. Chiều rộng hình chữ nhật là', [r`\(6\) cm`, r`\(12\) cm`, r`\(9\) cm`, r`\(18\) cm`], r`\(2(x + 2x) = 36 \iff 6x = 36 \iff x = 6\) cm.`, [
      undefined,
      'Đó là chiều dài.',
      'Chia 36 cho 4 như hình vuông.',
      'Đó là nửa chu vi.',
    ]),
    mc(3, DT, 'Một mảnh vườn hình vuông. Nếu tăng một cạnh thêm 2 m và giảm cạnh kia đi 1 m thì được hình chữ nhật có diện tích lớn hơn diện tích mảnh vườn 6 m². Cạnh mảnh vườn là', [r`\(8\) m`, r`\(6\) m`, r`\(4\) m`, r`\(10\) m`], r`\((x + 2)(x - 1) = x^2 + 6 \iff x - 2 = 6 \iff x = 8\) m.`, [
      undefined,
      'Thử lại: \\(8\\cdot5 = 40 \\ne 36 + 6\\).',
      'Thử lại không thỏa mãn.',
      'Thử lại không thỏa mãn.',
    ]),
    // ---- Đúng/Sai ----
    tf(2, ST, 'Xét tính đúng sai về các bước giải bài toán bằng cách lập phương trình:', [
      ['Chọn ẩn và đặt điều kiện thích hợp cho ẩn.', true, 'Bước 1.'],
      ['Biểu diễn các đại lượng chưa biết theo ẩn.', true, 'Bước 1.'],
      ['Không cần đối chiếu nghiệm với điều kiện của ẩn.', false, 'Phải đối chiếu trước khi trả lời.'],
      ['Trả lời đúng câu hỏi của đề bài.', true, 'Bước 3.'],
    ]),
    tf(2, ST, r`Tổng hai số là 60, số này hơn số kia 14. Gọi số nhỏ là \(x\).`, [
      [r`Số lớn là \(x + 14\).`, true, 'Hơn 14.'],
      [r`Phương trình: \(2x + 14 = 60\).`, true, r`\(x + x + 14 = 60\).`],
      [r`Số nhỏ là 23.`, true, r`\(2x = 46\).`],
      [r`Số lớn là 46.`, false, r`Số lớn là 37.`],
    ]),
    tf(3, ST, r`Tuổi bố gấp 4 lần tuổi con; 20 năm nữa tuổi bố gấp 2 lần tuổi con. Gọi tuổi con hiện nay là \(x\).`, [
      [r`Tuổi bố hiện nay là \(4x\).`, true, 'Gấp 4 lần.'],
      [r`Phương trình: \(4x + 20 = 2(x + 20)\).`, true, 'Sau 20 năm.'],
      [r`\(x = 10\).`, true, r`\(2x = 20\).`],
      ['Bố hiện nay 30 tuổi.', false, 'Bố 40 tuổi.'],
    ]),
    tf(2, CD, r`Một ô tô đi từ A đến B hết 3 giờ với vận tốc \(x\) (km/h); lúc về tăng vận tốc thêm 10 km/h nên chỉ hết 2,5 giờ.`, [
      [r`Phương trình: \(3x = 2{,}5(x + 10)\).`, true, 'Quãng đường đi và về bằng nhau.'],
      [r`\(x = 50\).`, true, r`\(0{,}5x = 25\).`],
      ['Quãng đường AB dài 150 km.', true, r`\(3\cdot50\).`],
      ['Vận tốc lúc về là 55 km/h.', false, 'Là 60 km/h.'],
    ]),
    tf(3, CD, r`Một ca nô xuôi dòng từ A đến B hết 3 giờ và ngược dòng từ B về A hết 4 giờ; vận tốc dòng nước 3 km/h. Gọi vận tốc riêng của ca nô là \(x\) (km/h).`, [
      [r`Vận tốc xuôi dòng là \(x + 3\).`, true, 'Cộng vận tốc dòng nước.'],
      [r`Phương trình: \(3(x + 3) = 4(x - 3)\).`, true, 'Quãng đường bằng nhau.'],
      [r`\(x = 21\).`, true, r`\(3x + 9 = 4x - 12\).`],
      ['Quãng đường AB dài 63 km.', false, r`\(3\cdot24 = 72\) km.`],
    ]),
    tf(4, CD, 'Lúc 7 giờ một xe máy đi từ A với vận tốc 36 km/h. Lúc 8 giờ một ô tô cũng đi từ A cùng chiều với vận tốc 54 km/h. Gọi \\(t\\) là thời gian ô tô đi đến lúc gặp xe máy.', [
      ['Khi gặp nhau, xe máy đã đi lâu hơn ô tô 1 giờ.', true, 'Xuất phát sớm hơn 1 giờ.'],
      [r`Phương trình: \(54t = 36(t + 1)\).`, true, 'Cùng quãng đường từ A.'],
      [r`\(t = 2\).`, true, r`\(18t = 36\).`],
      ['Hai xe gặp nhau lúc 9 giờ.', false, 'Gặp lúc 10 giờ.'],
    ]),
    tf(3, NS, r`Theo kế hoạch mỗi ngày làm 30 sản phẩm; thực tế mỗi ngày làm 40 sản phẩm nên xong sớm hơn 3 ngày (số sản phẩm không đổi). Gọi \(x\) là số ngày theo kế hoạch.`, [
      [r`Tổng số sản phẩm là \(30x\).`, true, 'Năng suất nhân thời gian.'],
      [r`Phương trình: \(30x = 40(x - 3)\).`, true, 'Số sản phẩm không đổi.'],
      [r`\(x = 12\).`, true, r`\(10x = 120\).`],
      ['Tổng số sản phẩm là 480.', false, r`\(30\cdot12 = 360\).`],
    ]),
    tf(2, PT, 'Giá một chiếc áo sau khi tăng 20% là 360 000 đồng. Gọi giá ban đầu là \\(x\\) đồng.', [
      [r`Phương trình: \(1{,}2x = 360\,000\).`, true, 'Tăng 20% thì bằng 120%.'],
      [r`\(x = 300\,000\).`, true, 'Chia cho 1,2.'],
      [r`\(x = 288\,000\).`, false, 'Tính 20% trên giá mới là sai.'],
      ['Số tiền tăng thêm là 60 000 đồng.', true, r`\(360\,000 - 300\,000\).`],
    ]),
    tf(3, PT, 'Năm ngoái một nhà máy sản xuất 1000 sản phẩm; năm nay tăng 15% so với năm ngoái.', [
      ['Năm nay nhà máy sản xuất 1150 sản phẩm.', true, r`\(1000\cdot1{,}15\).`],
      ['Số sản phẩm tăng thêm là 150.', true, r`\(15\%\cdot1000\).`],
      ['Để năm sau đạt 1380 sản phẩm thì phải tăng 20% so với năm nay.', true, r`\(1150\cdot1{,}2 = 1380\).`],
      ['Năm nay nhà máy sản xuất 1015 sản phẩm.', false, '15% không phải 15 sản phẩm.'],
    ]),
    tf(3, DT, r`Một hình chữ nhật có chiều dài hơn chiều rộng 7 m và chu vi 54 m. Gọi chiều rộng là \(x\) (m).`, [
      [r`Phương trình: \(2(x + x + 7) = 54\).`, true, 'Chu vi.'],
      ['Chiều rộng là 10 m.', true, r`\(4x + 14 = 54\).`],
      ['Chiều dài là 17 m.', true, r`\(10 + 7\).`],
      ['Diện tích là 270 m².', false, r`\(10\cdot17 = 170\) m².`],
    ]),
    // ---- Tự luận ----
    es(2, ST, 'Tìm hai số biết tổng của chúng là 72 và số lớn gấp 5 lần số nhỏ.', r`Gọi số nhỏ là \(x\); số lớn là \(5x\).
Phương trình: \(x + 5x = 72 \iff x = 12\).
Hai số là 12 và 60.`, r`0,5 điểm: chọn ẩn, lập đúng phương trình.
0,5 điểm: giải đúng và trả lời.`),
    es(3, CD, 'Một người đi xe đạp từ A đến B với vận tốc 15 km/h, lúc về đi với vận tốc 12 km/h. Tổng thời gian đi và về là 4 giờ 30 phút. Tính quãng đường AB.', r`Gọi quãng đường AB là \(x\) (km), \(x > 0\).
Thời gian đi \(\dfrac{x}{15}\) giờ, thời gian về \(\dfrac{x}{12}\) giờ. 4 giờ 30 phút = 4,5 giờ.
Phương trình: \(\dfrac{x}{15} + \dfrac{x}{12} = 4{,}5 \iff \dfrac{4x + 5x}{60} = 4{,}5 \iff 9x = 270 \iff x = 30\) (thỏa mãn).
Quãng đường AB dài 30 km.`, r`0,5 điểm: chọn ẩn, đổi đơn vị và lập đúng phương trình.
0,5 điểm: giải đúng và trả lời.`),
    es(3, PT, 'Tháng trước hai cửa hàng bán được tổng cộng 500 sản phẩm. Tháng này cửa hàng A bán tăng 10%, cửa hàng B bán tăng 20% so với tháng trước, nên cả hai bán được 570 sản phẩm. Tính số sản phẩm mỗi cửa hàng bán được trong tháng trước.', r`Gọi số sản phẩm cửa hàng A bán tháng trước là \(x\) (\(0 < x < 500\)); cửa hàng B bán \(500 - x\).
Phương trình: \(1{,}1x + 1{,}2(500 - x) = 570 \iff 600 - 0{,}1x = 570 \iff x = 300\) (thỏa mãn).
Tháng trước cửa hàng A bán 300, cửa hàng B bán 200 sản phẩm.`, r`0,5 điểm: chọn ẩn, lập đúng phương trình.
0,5 điểm: giải đúng và trả lời.`),
    es(3, NS, 'Theo kế hoạch, mỗi ngày một tổ sản xuất làm 48 sản phẩm. Thực tế mỗi ngày tổ làm thêm 12 sản phẩm nên hoàn thành sớm hơn kế hoạch 2 ngày và còn làm thêm được 24 sản phẩm. Tính số sản phẩm tổ phải làm theo kế hoạch.', r`Gọi số sản phẩm theo kế hoạch là \(x\) (\(x\) nguyên dương).
Số ngày theo kế hoạch \(\dfrac{x}{48}\); thực tế làm \(x + 24\) sản phẩm, mỗi ngày 60 sản phẩm, hết \(\dfrac{x + 24}{60}\) ngày.
Phương trình: \(\dfrac{x}{48} - \dfrac{x + 24}{60} = 2\). Nhân hai vế với 240: \(5x - 4x - 96 = 480 \iff x = 576\) (thỏa mãn).
Theo kế hoạch tổ phải làm 576 sản phẩm.`, r`0,5 điểm: biểu diễn đúng thời gian theo kế hoạch và thực tế, lập phương trình.
0,5 điểm: giải đúng và trả lời.`),
  ],
};

const HS = 'ham-so-cho-boi-bang-cong-thuc';
const GH = 'tinh-gia-tri-ham-so';
const TD = 'toa-do-diem';
const VD = 've-doc-do-thi';

const B27: BankLesson = {
  slug: 'bai-27-khai-niem-ham-so-va-do-thi-cua-ham-so',
  questions: [
    mc(1, HS, r`Đại lượng \(y\) là hàm số của đại lượng \(x\) nếu`, [r`mỗi giá trị của \(x\) xác định được đúng một giá trị của \(y\)`, r`mỗi giá trị của \(y\) xác định được đúng một giá trị của \(x\)`, r`\(x\) và \(y\) luôn bằng nhau`, r`\(y\) luôn nhận giá trị dương`], 'Định nghĩa hàm số.', [
      undefined,
      'Đảo vai trò hai đại lượng.',
      'Không cần bằng nhau.',
      'Không có điều kiện về dấu.',
    ]),
    mc(2, HS, r`Bảng nào sau đây KHÔNG cho \(y\) là hàm số của \(x\)?`, [r`\(x\): 1; 1; 2 và \(y\) tương ứng: 2; 3; 4`, r`\(x\): 1; 2; 3 và \(y\) tương ứng: 5; 5; 5`, r`\(x\): 0; 1; 2 và \(y\) tương ứng: 1; 2; 3`, r`\(x\): \(-1\); 0; 1 và \(y\) tương ứng: 1; 0; 1`], r`Giá trị \(x = 1\) ứng với hai giá trị \(y\) là 2 và 3.`, [
      undefined,
      'Hàm hằng vẫn là hàm số.',
      'Mỗi \\(x\\) ứng với một \\(y\\).',
      'Hai \\(x\\) khác nhau có thể cùng một \\(y\\).',
    ]),
    mc(2, HS, r`Công thức nào sau đây cho \(y\) là hàm số của \(x\)?`, [r`\(y = 2x - 3\)`, r`\(y^2 = x\)`, r`\(|y| = x + 1\)`, r`\(x = 5\)`], r`Mỗi \(x\) cho đúng một \(y = 2x - 3\).`, [
      undefined,
      r`\(x = 4\) ứng với \(y = 2\) và \(y = -2\).`,
      r`\(x = 1\) ứng với \(y = 2\) và \(y = -2\).`,
      r`Với \(x = 5\) thì \(y\) nhận mọi giá trị.`,
    ]),
    mc(1, GH, r`Cho hàm số \(f(x) = 3x - 1\). Giá trị \(f(2)\) là`, [r`\(5\)`, r`\(6\)`, r`\(7\)`, r`\(1\)`], r`\(f(2) = 3\cdot2 - 1 = 5\).`, [
      undefined,
      'Quên trừ 1.',
      'Cộng 1 thay vì trừ.',
      'Tính sai.',
    ]),
    mc(2, GH, r`Cho hàm số \(f(x) = x^2 - 3x\). Giá trị \(f(-1)\) là`, [r`\(4\)`, r`\(-2\)`, r`\(2\)`, r`\(-4\)`], r`\(f(-1) = 1 + 3 = 4\).`, [
      undefined,
      r`Sai dấu: \(-3\cdot(-1) = 3\).`,
      'Tính sai.',
      r`Tính nhầm \((-1)^2 = -1\).`,
    ]),
    mc(3, GH, r`Cho hàm số \(f(x) = 2x + 5\). Giá trị của \(a\) để \(f(a) = 11\) là`, [r`\(3\)`, r`\(27\)`, r`\(8\)`, r`\(-3\)`], r`\(2a + 5 = 11 \iff a = 3\).`, [
      undefined,
      r`Đó là \(f(11)\).`,
      'Chuyển vế sai.',
      'Sai dấu.',
    ]),
    mc(3, GH, 'Giá cước một hãng taxi: 10 000 đồng cho km đầu tiên, mỗi km tiếp theo 12 000 đồng. Số tiền phải trả khi đi 10 km là', ['118 000 đồng', '120 000 đồng', '130 000 đồng', '108 000 đồng'], r`\(y = 10\,000 + 12\,000(x - 1)\). Khi \(x = 10\): \(10\,000 + 108\,000 = 118\,000\) đồng.`, [
      undefined,
      'Tính cả 10 km theo giá 12 000 đồng.',
      'Cộng thừa một km.',
      'Quên km đầu tiên.',
    ]),
    mc(1, TD, r`Điểm \(M(-3; 2)\) có hoành độ là`, [r`\(-3\)`, r`\(2\)`, r`\(3\)`, r`\(-2\)`], 'Hoành độ viết trước.', [
      undefined,
      'Đó là tung độ.',
      'Sai dấu.',
      'Nhầm và sai dấu.',
    ]),
    mc(1, TD, 'Điểm nào sau đây nằm trên trục hoành?', [r`\((4; 0)\)`, r`\((0; 4)\)`, r`\((1; 1)\)`, r`\((-4; 2)\)`], 'Điểm trên trục hoành có tung độ bằng 0.', [
      undefined,
      'Điểm này nằm trên trục tung.',
      'Tung độ khác 0.',
      'Tung độ khác 0.',
    ]),
    mc(2, TD, r`Điểm nằm trên trục tung và có tung độ bằng \(-5\) là`, [r`\((0; -5)\)`, r`\((-5; 0)\)`, r`\((-5; -5)\)`, r`\((5; 0)\)`], 'Điểm trên trục tung có hoành độ bằng 0.', [
      undefined,
      'Điểm này nằm trên trục hoành.',
      'Hoành độ khác 0.',
      'Điểm này nằm trên trục hoành.',
    ]),
    mc(2, VD, r`Điểm nào sau đây thuộc đồ thị hàm số \(y = 2x\)?`, [r`\((1; 2)\)`, r`\((2; 1)\)`, r`\((1; 3)\)`, r`\((0; 2)\)`], r`\(2\cdot1 = 2\) đúng bằng tung độ.`, [
      undefined,
      r`\(2\cdot2 = 4 \ne 1\).`,
      r`\(2\cdot1 = 2 \ne 3\).`,
      r`\(2\cdot0 = 0 \ne 2\).`,
    ]),
    mc(3, VD, r`Dựa vào đồ thị hàm số \(y = f(x)\) dưới đây, khi \(x = 2\) thì \(y\) bằng
[bieudo]
loai: dothi
ham so: 0,5x + 1
x: -2; 4
y: -1; 4
[/bieudo]`, [r`\(2\)`, r`\(1\)`, r`\(3\)`, r`\(4\)`], r`Từ \(x = 2\) gióng lên đồ thị rồi sang trục tung được \(y = 2\) (kiểm tra: \(0{,}5\cdot2 + 1 = 2\)).`, [
      undefined,
      r`Đó là giá trị tại \(x = 0\).`,
      r`Đó là giá trị tại \(x = 4\).`,
      'Đọc nhầm hoành độ.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, HS, 'Xét tính đúng sai:', [
      [r`\(y = 5\) (với mọi \(x\)) là một hàm số (hàm hằng).`, true, 'Mỗi \\(x\\) ứng với đúng một giá trị 5.'],
      [r`\(y = x^2\) là một hàm số.`, true, 'Mỗi \\(x\\) cho đúng một \\(y\\).'],
      [r`Bảng có một giá trị \(x\) ứng với hai giá trị \(y\) cho \(y\) là hàm số của \(x\).`, false, 'Vi phạm định nghĩa.'],
      ['Hàm số có thể được cho bằng bảng.', true, 'Hoặc bằng công thức.'],
    ]),
    tf(2, GH, r`Cho hàm số \(f(x) = -2x + 3\).`, [
      [r`\(f(0) = 3\).`, true, 'Thay số.'],
      [r`\(f(1) = 1\).`, true, r`\(-2 + 3\).`],
      [r`\(f(-1) = 1\).`, false, r`\(f(-1) = 5\).`],
      [r`\(f(1{,}5) = 0\).`, true, r`\(-3 + 3\).`],
    ]),
    tf(3, GH, r`Cho hàm số \(f(x) = x^2 - 4\).`, [
      [r`\(f(2) = 0\).`, true, r`\(4 - 4\).`],
      [r`\(f(-2) = 0\).`, true, r`\(4 - 4\).`],
      [r`\(f(x) = -4\) khi \(x = 0\).`, true, r`\(x^2 = 0\).`],
      [r`\(f(3) = 9\).`, false, r`\(f(3) = 5\).`],
    ]),
    tf(1, TD, r`Cho điểm \(A(2; -3)\).`, [
      ['Hoành độ của A là 2.', true, 'Viết trước.'],
      [r`Tung độ của A là \(-3\).`, true, 'Viết sau.'],
      ['A nằm trên trục hoành.', false, 'Tung độ khác 0.'],
      [r`A khác điểm \(B(-3; 2)\).`, true, 'Thứ tự tọa độ khác nhau.'],
    ]),
    tf(2, TD, r`Cho các điểm \(A(1; 1)\), \(B(4; 1)\), \(C(4; 3)\).`, [
      [r`\(AB\) song song với trục hoành.`, true, 'Cùng tung độ 1.'],
      [r`\(AB = 3\).`, true, r`\(4 - 1\).`],
      [r`\(BC = 2\).`, true, r`\(3 - 1\).`],
      [r`Điểm \(D\) để \(ABCD\) là hình chữ nhật là \(D(3; 1)\).`, false, r`\(D(1; 3)\).`],
    ]),
    tf(2, VD, r`Xét đồ thị hàm số \(y = 3x\).`, [
      ['Đồ thị đi qua gốc tọa độ.', true, r`\(3\cdot0 = 0\).`],
      [r`Đồ thị đi qua điểm \((1; 3)\).`, true, r`\(3\cdot1 = 3\).`],
      [r`Đồ thị đi qua điểm \((3; 1)\).`, false, r`\(3\cdot3 = 9 \ne 1\).`],
      [r`Đồ thị đi qua điểm \((-1; -3)\).`, true, r`\(3\cdot(-1) = -3\).`],
    ]),
    tf(3, VD, r`Hàm số \(y = f(x)\) cho bởi bảng: \(x = -1; 0; 1; 2\) tương ứng \(y = 3; 2; 1; 0\).`, [
      ['Đồ thị gồm 4 điểm.', true, 'Mỗi cặp giá trị là một điểm.'],
      [r`Điểm \((2; 0)\) thuộc đồ thị.`, true, 'Có trong bảng.'],
      [r`Điểm \((0; 2)\) thuộc đồ thị.`, true, 'Có trong bảng.'],
      ['Đồ thị là đường thẳng nối các điểm.', false, 'Hàm số cho bởi bảng có đồ thị là các điểm rời rạc.'],
    ]),
    tf(2, HS, r`Quãng đường \(s\) (km) một ô tô đi được sau \(t\) giờ là \(s = 60t\).`, [
      [r`\(s\) là hàm số của \(t\).`, true, 'Mỗi \\(t\\) cho đúng một \\(s\\).'],
      [r`Khi \(t = 2\) thì \(s = 120\).`, true, r`\(60\cdot2\).`],
      [r`\(s = 90\) khi \(t = 1{,}5\).`, true, r`\(60\cdot1{,}5\).`],
      [r`\(t\) là một hằng số.`, false, r`\(t\) là biến số.`],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, GH, r`Cho hàm số \(f(x) = 4x - 7\). Tính \(f(3)\).`, '5', r`\(f(3) = 12 - 7 = 5\).`),
    sa(2, GH, r`Cho hàm số \(f(x) = x^2 + 2x\). Tính \(f(-3)\).`, '3', r`\(f(-3) = 9 - 6 = 3\).`),
    sa(3, GH, r`Cho hàm số \(f(x) = 3x - 2\). Tìm \(x\) để \(f(x) = 10\).`, '4', r`\(3x - 2 = 10 \iff x = 4\).`),
    sa(1, TD, r`Cho điểm \(A(-2; 5)\). Tính tổng hoành độ và tung độ của điểm \(A\).`, '3', r`Hoành độ \(-2\), tung độ 5; tổng \(-2 + 5 = 3\).`),
    sa(2, TD, r`Cho ba điểm \(A(1; 2)\), \(B(5; 2)\), \(C(5; 5)\). Tính diện tích tam giác \(ABC\).`, '6', r`\(AB = 4\) (song song trục hoành), \(BC = 3\) (song song trục tung) nên tam giác vuông tại \(B\): diện tích \(\dfrac{4\cdot3}{2} = 6\).`),
    sa(3, VD, r`Đồ thị hàm số \(f(x) = x^2 - 1\) đi qua điểm \(M(2; m)\). Tìm \(m\).`, '3', r`\(m = f(2) = 4 - 1 = 3\).`),
    // ---- Tự luận ----
    es(2, HS, r`Mỗi công thức sau có cho \(y\) là hàm số của \(x\) không? Giải thích. a) \(y = |x|\); b) \(|y| = x\).`, r`a) Có: mỗi giá trị \(x\) cho đúng một giá trị \(y = |x|\).
b) Không: chẳng hạn \(x = 3\) ứng với hai giá trị \(y = 3\) và \(y = -3\).`, r`0,5 điểm: câu a, có giải thích.
0,5 điểm: câu b, chỉ ra phản ví dụ.`),
    es(2, GH, r`Cho hàm số \(f(x) = 2x^2 - 1\). Tính \(f(0)\), \(f(-1)\), \(f\left(\dfrac12\right)\) và so sánh \(f(2)\) với \(f(-2)\).`, r`\(f(0) = -1\); \(f(-1) = 1\); \(f\left(\dfrac12\right) = \dfrac12 - 1 = -\dfrac12\).
\(f(2) = 7\), \(f(-2) = 7\) nên \(f(2) = f(-2)\).`, r`0,5 điểm: tính đúng ba giá trị.
0,5 điểm: tính và so sánh đúng \(f(2)\), \(f(-2)\).`),
    es(2, TD, r`Biểu diễn các điểm \(A(2; 1)\), \(B(-1; 3)\), \(C(0; -2)\), \(D(-3; 0)\) trên mặt phẳng tọa độ. Điểm nào nằm trên các trục tọa độ?`, r`Biểu diễn các điểm như hình. \(C\) nằm trên trục tung (hoành độ 0), \(D\) nằm trên trục hoành (tung độ 0).
[bieudo]
loai: dothi
diem: A(2; 1); B(-1; 3); C(0; -2); D(-3; 0)
x: -4; 3
y: -3; 4
[/bieudo]`, r`0,5 điểm: biểu diễn đúng bốn điểm.
0,5 điểm: chỉ đúng hai điểm trên các trục và giải thích.`),
    es(3, VD, r`Hàm số \(y = f(x)\) cho bởi bảng: \(x = -2; -1; 0; 1; 2\) tương ứng \(y = -4; -2; 0; 2; 4\).
a) Vẽ đồ thị của hàm số. b) Viết công thức của hàm số và nhận xét về vị trí các điểm.`, r`a) Đồ thị gồm 5 điểm \((-2; -4)\), \((-1; -2)\), \((0; 0)\), \((1; 2)\), \((2; 4)\).
[bieudo]
loai: dothi
diem: A(-2; -4); B(-1; -2); E(0; 0); C(1; 2); D(2; 4)
x: -3; 3
y: -5; 5
[/bieudo]
b) Mỗi giá trị \(y\) gấp đôi \(x\): \(y = 2x\). Các điểm cùng nằm trên một đường thẳng đi qua gốc tọa độ.`, r`0,5 điểm: biểu diễn đúng năm điểm.
0,5 điểm: tìm đúng công thức và nhận xét.`),
    es(3, GH, r`Cước điện thoại của một gói cước gồm phí thuê bao 20 000 đồng mỗi tháng và 800 đồng cho mỗi phút gọi.
a) Viết công thức tính số tiền \(y\) (đồng) phải trả trong tháng khi gọi \(x\) phút.
b) Tính số tiền khi gọi 150 phút. c) Nếu phải trả 100 000 đồng thì đã gọi bao nhiêu phút?`, r`a) \(y = 800x + 20\,000\).
b) \(x = 150\): \(y = 120\,000 + 20\,000 = 140\,000\) đồng.
c) \(800x + 20\,000 = 100\,000 \iff x = 100\) phút.`, r`0,25 điểm: câu a.
0,25 điểm: câu b.
0,5 điểm: câu c.`),
  ],
};

const N8 = 'nhan-dang-ham-so-bac-nhat';
const BG = 'bang-gia-tri-ham-so-bac-nhat';
const VT = 've-do-thi-ham-so-bac-nhat';
const DH = 'diem-thuoc-do-thi-tim-he-so';
const T8 = 'thuc-te-ham-so-bac-nhat';

const B28: BankLesson = {
  slug: 'bai-28-ham-so-bac-nhat-va-do-thi-cua-ham-so-bac-nhat',
  questions: [
    mc(1, N8, 'Hàm số nào sau đây là hàm số bậc nhất?', [r`\(y = 2 - 3x\)`, r`\(y = x^2 + 1\)`, r`\(y = 0x + 5\)`, r`\(y = \dfrac1x\)`], r`Dạng \(y = ax + b\) với \(a = -3 \ne 0\).`, [
      undefined,
      r`Có \(x^2\).`,
      r`\(a = 0\).`,
      'Biến ở mẫu.',
    ]),
    mc(1, N8, r`Hàm số \(y = 5 - x\) có hệ số \(a\), \(b\) là`, [r`\(a = -1\), \(b = 5\)`, r`\(a = 5\), \(b = -1\)`, r`\(a = 1\), \(b = 5\)`, r`\(a = -1\), \(b = -5\)`], r`Viết lại \(y = -x + 5\) nên \(a = -1\), \(b = 5\).`, [
      undefined,
      'Nhầm vị trí.',
      'Quên dấu trừ.',
      'Sai dấu của \\(b\\).',
    ]),
    mc(2, N8, r`Hàm số \(y = (m - 3)x + 1\) là hàm số bậc nhất khi`, [r`\(m \ne 3\)`, r`\(m \ne -3\)`, r`\(m = 3\)`, r`\(m > 3\)`], r`Cần \(a = m - 3 \ne 0\).`, [
      undefined,
      'Sai dấu.',
      r`Khi đó \(a = 0\).`,
      r`\(m < 3\) cũng thỏa mãn.`,
    ]),
    mc(1, BG, r`Cho hàm số \(y = 2x - 1\). Khi \(x = 3\) thì \(y\) bằng`, [r`\(5\)`, r`\(7\)`, r`\(6\)`, r`\(-5\)`], r`Thay \(x = 3\): \(y = 2\cdot3 - 1 = 5\).`, [
      undefined,
      'Cộng 1 thay vì trừ.',
      'Quên trừ 1.',
      'Sai dấu.',
    ]),
    mc(2, BG, r`Hàm số \(y = -3x + 2\) nhận giá trị bằng 8 khi`, [r`\(x = -2\)`, r`\(x = 2\)`, r`\(x = -\dfrac{10}{3}\)`, r`\(x = 26\)`], r`\(-3x + 2 = 8 \iff x = -2\).`, [
      undefined,
      'Sai dấu.',
      'Chuyển vế sai.',
      r`Đó là giá trị \(y\) tại \(x = -8\).`,
    ]),
    mc(2, VT, r`Đồ thị hàm số \(y = 2x - 4\) cắt trục tung tại điểm`, [r`\((0; -4)\)`, r`\((-4; 0)\)`, r`\((2; 0)\)`, r`\((0; 2)\)`], r`Cho \(x = 0\) được \(y = -4\).`, [
      undefined,
      'Đảo tọa độ.',
      'Đó là giao điểm với trục hoành.',
      'Sai.',
    ]),
    mc(2, VT, r`Đồ thị hàm số \(y = 2x - 4\) cắt trục hoành tại điểm`, [r`\((2; 0)\)`, r`\((0; -4)\)`, r`\((-2; 0)\)`, r`\((4; 0)\)`], r`Cho \(y = 0\): \(2x = 4\), \(x = 2\).`, [
      undefined,
      'Đó là giao điểm với trục tung.',
      'Sai dấu.',
      'Quên chia cho 2.',
    ]),
    mc(3, VT, r`Đồ thị hàm số \(y = ax\) (\(a \ne 0\)) là một đường thẳng`, ['đi qua gốc tọa độ', 'song song với trục hoành', 'song song với trục tung', 'không đi qua gốc tọa độ'], r`\(x = 0\) cho \(y = 0\).`, [
      undefined,
      r`Chỉ khi \(a = 0\).`,
      'Không thể.',
      r`\((0; 0)\) luôn thuộc đồ thị.`,
    ]),
    mc(2, DH, r`Điểm nào sau đây thuộc đồ thị hàm số \(y = -2x + 3\)?`, [r`\((1; 1)\)`, r`\((1; -1)\)`, r`\((0; -3)\)`, r`\((2; 1)\)`], r`\(-2\cdot1 + 3 = 1\).`, [
      undefined,
      r`\(-2 + 3 = 1 \ne -1\).`,
      r`\(y(0) = 3\).`,
      r`\(y(2) = -1\).`,
    ]),
    mc(3, DH, r`Đồ thị hàm số \(y = ax + 2\) đi qua điểm \((1; 5)\). Giá trị của \(a\) là`, [r`\(3\)`, r`\(7\)`, r`\(-3\)`, r`\(5\)`], r`\(5 = a + 2 \iff a = 3\).`, [
      undefined,
      'Cộng thay vì trừ.',
      'Sai dấu.',
      'Lấy tung độ làm hệ số.',
    ]),
    mc(4, DH, r`Hàm số \(y = ax + b\) có đồ thị đi qua hai điểm \((0; 1)\) và \((2; 5)\) là`, [r`\(y = 2x + 1\)`, r`\(y = x + 1\)`, r`\(y = 2x + 5\)`, r`\(y = 3x - 1\)`], r`Qua \((0; 1)\) nên \(b = 1\); qua \((2; 5)\) nên \(5 = 2a + 1\), \(a = 2\).`, [
      undefined,
      r`Không đi qua \((2; 5)\).`,
      r`Không đi qua \((0; 1)\).`,
      r`Không đi qua \((0; 1)\).`,
    ]),
    mc(3, T8, 'Một bể đang có 20 lít nước, mỗi phút vòi chảy thêm vào 5 lít. Lượng nước \\(y\\) (lít) trong bể sau \\(x\\) phút là', [r`\(y = 5x + 20\)`, r`\(y = 20x + 5\)`, r`\(y = 5x - 20\)`, r`\(y = 25x\)`], 'Lượng ban đầu cộng lượng chảy thêm.', [
      undefined,
      'Nhầm vai trò hai số.',
      'Nước chảy vào thì tăng.',
      'Không có cơ sở.',
    ]),
    mc(4, T8, 'Hãng taxi A tính 20 000 đồng mở cửa và 9 000 đồng mỗi km; hãng B tính 15 000 đồng mở cửa và 10 000 đồng mỗi km. Đi bao nhiêu ki-lô-mét thì số tiền hai hãng bằng nhau?', [r`\(5\) km`, r`\(10\) km`, r`\(3\) km`, r`\(15\) km`], r`\(20\,000 + 9\,000x = 15\,000 + 10\,000x \iff x = 5\).`, [
      undefined,
      'Thử lại không bằng nhau.',
      'Thử lại không bằng nhau.',
      'Thử lại không bằng nhau.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, N8, 'Xét tính đúng sai:', [
      [r`\(y = 3x\) là hàm số bậc nhất.`, true, r`\(a = 3\), \(b = 0\).`],
      [r`\(y = -x + 1\) là hàm số bậc nhất.`, true, r`\(a = -1\).`],
      [r`\(y = 4\) là hàm số bậc nhất.`, false, 'Hàm hằng, \\(a = 0\\).'],
      [r`\(y = 2x^2\) là hàm số bậc nhất.`, false, r`Có \(x^2\).`],
    ]),
    tf(2, N8, r`Cho hàm số \(y = (2m - 4)x + m\).`, [
      [r`Là hàm số bậc nhất khi \(m \ne 2\).`, true, r`\(2m - 4 \ne 0\).`],
      [r`Với \(m = 3\), hàm số là \(y = 2x + 3\).`, true, 'Thay số.'],
      [r`Với \(m = 2\), hàm số là \(y = 2\).`, true, r`\(a = 0\), \(b = 2\).`],
      [r`Với \(m = 2\), đây là hàm số bậc nhất.`, false, 'Là hàm hằng.'],
    ]),
    tf(1, BG, r`Cho hàm số \(y = x + 3\).`, [
      [r`Khi \(x = 0\) thì \(y = 3\).`, true, 'Thay số.'],
      [r`Khi \(x = -3\) thì \(y = 0\).`, true, 'Thay số.'],
      [r`Khi \(x = 2\) thì \(y = 6\).`, false, r`\(y = 5\).`],
      [r`Khi \(x = -1\) thì \(y = 2\).`, true, 'Thay số.'],
    ]),
    tf(2, VT, r`Xét đồ thị hàm số \(y = -x + 2\).`, [
      [r`Đi qua điểm \((0; 2)\).`, true, 'Giao với trục tung.'],
      [r`Đi qua điểm \((2; 0)\).`, true, 'Giao với trục hoành.'],
      ['Là một đường thẳng.', true, 'Đồ thị hàm số bậc nhất.'],
      [r`Đi qua điểm \((1; 3)\).`, false, r`\(y(1) = 1\).`],
    ]),
    tf(3, VT, r`Vẽ trên cùng mặt phẳng tọa độ đồ thị \(d_1: y = 2x - 2\) và \(d_2: y = -x + 4\).`, [
      [r`Hai đồ thị cắt nhau tại \((2; 2)\).`, true, r`\(2x - 2 = -x + 4 \iff x = 2\).`],
      [r`\(d_1\) cắt trục tung tại \((0; -2)\).`, true, 'Cho \\(x = 0\\).'],
      [r`\(d_2\) cắt trục hoành tại \((4; 0)\).`, true, 'Cho \\(y = 0\\).'],
      [r`Hai đồ thị cắt nhau tại \((1; 3)\).`, false, r`\((1; 3)\) không thuộc \(d_1\).`],
    ]),
    tf(2, DH, r`Cho hàm số \(y = 3x - 1\).`, [
      [r`\(A(1; 2)\) thuộc đồ thị.`, true, r`\(3 - 1 = 2\).`],
      [r`\(B(0; -1)\) thuộc đồ thị.`, true, 'Giao với trục tung.'],
      [r`\(C(2; 6)\) thuộc đồ thị.`, false, r`\(y(2) = 5\).`],
      [r`\(D(-1; -4)\) thuộc đồ thị.`, true, r`\(-3 - 1 = -4\).`],
    ]),
    tf(3, DH, r`Đồ thị hàm số \(y = ax - 3\) đi qua điểm \(M(2; 1)\).`, [
      [r`\(1 = 2a - 3\).`, true, 'Thay tọa độ.'],
      [r`\(a = 2\).`, true, r`\(2a = 4\).`],
      [r`Đồ thị đi qua điểm \((0; -3)\).`, true, r`\(b = -3\).`],
      [r`\(a = -1\).`, false, r`\(a = 2\).`],
    ]),
    tf(4, DH, r`Hàm số \(y = ax + b\) có đồ thị đi qua \(A(1; 4)\) và \(B(-1; 0)\).`, [
      [r`\(a + b = 4\).`, true, r`Qua \(A\).`],
      [r`\(-a + b = 0\).`, true, r`Qua \(B\).`],
      [r`Hàm số là \(y = 2x + 2\).`, true, r`Giải được \(a = b = 2\).`],
      [r`Đồ thị đi qua \((0; 4)\).`, false, r`Đi qua \((0; 2)\).`],
    ]),
    tf(3, T8, 'Một hãng taxi tính 12 000 đồng mở cửa và 11 000 đồng mỗi km. Gọi \\(y\\) (đồng) là số tiền khi đi \\(x\\) km.', [
      [r`\(y = 11\,000x + 12\,000\).`, true, 'Phần cố định cộng phần theo km.'],
      ['Đi 10 km phải trả 122 000 đồng.', true, r`\(110\,000 + 12\,000\).`],
      ['Với 100 000 đồng đi được tối đa 8 km.', true, r`\(11\,000\cdot8 + 12\,000 = 100\,000\).`],
      [r`\(y\) là hàm hằng.`, false, r`\(a = 11\,000 \ne 0\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, BG, r`Cho hàm số \(y = -2x + 7\). Tìm \(x\) để \(y = -3\).`, '5', r`\(-2x + 7 = -3 \iff x = 5\).`),
    sa(3, DH, r`Tìm \(m\) để đồ thị hàm số \(y = (m - 1)x + 3\) đi qua điểm \((2; 9)\).`, '4', r`\(9 = 2(m - 1) + 3 \iff m - 1 = 3 \iff m = 4\).`),
    sa(4, T8, 'Một bể chứa 200 lít nước, mỗi phút chảy ra 8 lít. Sau bao nhiêu phút bể còn 40 lít?', '20', r`\(200 - 8x = 40 \iff x = 20\) phút.`, { unit: 'phút' }),
    // ---- Tự luận ----
    es(2, VT, r`Vẽ đồ thị hàm số \(y = 2x + 2\).`, r`Cho \(x = 0\) thì \(y = 2\): điểm \((0; 2)\). Cho \(y = 0\) thì \(x = -1\): điểm \((-1; 0)\). Đồ thị là đường thẳng đi qua hai điểm đó.
[bieudo]
loai: dothi
ham so: 2x + 2
diem: P(0; 2); Q(-1; 0)
x: -3; 2
y: -2; 5
[/bieudo]`, r`0,5 điểm: tìm đúng hai điểm.
0,5 điểm: vẽ đúng đường thẳng.`),
    es(3, DH, r`Xác định hàm số \(y = ax + b\) biết đồ thị đi qua \(A(2; 3)\) và cắt trục tung tại điểm có tung độ \(-1\).`, r`Cắt trục tung tại tung độ \(-1\) nên \(b = -1\).
Đi qua \(A(2; 3)\): \(3 = 2a - 1 \iff a = 2\).
Hàm số là \(y = 2x - 1\).`, r`0,5 điểm: tìm đúng \(b\).
0,5 điểm: tìm đúng \(a\) và kết luận.`),
    es(4, T8, r`Gói cước Internet A: 100 000 đồng mỗi tháng cộng 1 000 đồng cho mỗi GB dữ liệu; gói B: 160 000 đồng mỗi tháng, không giới hạn dữ liệu.
a) Viết công thức tính số tiền \(y_A\), \(y_B\) mỗi tháng khi dùng \(x\) GB.
b) Dùng bao nhiêu GB thì hai gói bằng tiền? Khi nào nên chọn gói A?`, r`a) \(y_A = 1\,000x + 100\,000\); \(y_B = 160\,000\).
b) \(1\,000x + 100\,000 = 160\,000 \iff x = 60\) GB. Nếu dùng ít hơn 60 GB mỗi tháng thì gói A rẻ hơn; dùng nhiều hơn 60 GB thì nên chọn gói B.`, r`0,5 điểm: câu a.
0,5 điểm: câu b, tìm đúng 60 GB và kết luận lựa chọn.`),
  ],
};

const XG = 'xac-dinh-he-so-goc';
const SC = 'song-song-cat-nhau';
const TS = 'tim-tham-so-song-song-cat-nhau';
const TF9 = 'tim-ham-so-bac-nhat';

const B29: BankLesson = {
  slug: 'bai-29-he-so-goc-cua-duong-thang',
  questions: [
    mc(1, XG, r`Hệ số góc của đường thẳng \(y = -4x + 1\) là`, [r`\(-4\)`, r`\(1\)`, r`\(4\)`, r`\(-1\)`], r`Hệ số góc là hệ số \(a\) của \(x\).`, [
      undefined,
      'Đó là tung độ gốc.',
      'Quên dấu trừ.',
      'Sai.',
    ]),
    mc(1, XG, r`Hệ số góc của đường thẳng \(y = \dfrac{3 - 2x}{5}\) là`, [r`\(-\dfrac25\)`, r`\(\dfrac35\)`, r`\(-2\)`, r`\(3\)`], r`\(y = -\dfrac25x + \dfrac35\).`, [
      undefined,
      'Đó là hệ số tự do.',
      'Quên chia cho 5.',
      'Sai.',
    ]),
    mc(2, XG, r`Đường thẳng nào sau đây tạo với trục \(Ox\) một góc tù?`, [r`\(y = -2x + 1\)`, r`\(y = 2x - 1\)`, r`\(y = x\)`, r`\(y = 0{,}5x + 3\)`], r`Hệ số góc âm thì góc tạo với \(Ox\) là góc tù.`, [
      undefined,
      r`\(a = 2 > 0\): góc nhọn.`,
      r`\(a = 1 > 0\): góc nhọn.`,
      r`\(a = 0{,}5 > 0\): góc nhọn.`,
    ]),
    mc(2, XG, r`Đường thẳng \(y = ax - 1\) có hệ số góc bằng 3. Khi đó`, [r`\(a = 3\)`, r`\(a = -1\)`, r`\(a = -3\)`, r`\(a = \dfrac13\)`], r`Hệ số góc chính là \(a\).`, [
      undefined,
      'Đó là tung độ gốc.',
      'Sai dấu.',
      'Nghịch đảo.',
    ]),
    mc(1, SC, r`Vị trí của hai đường thẳng \(y = 2x + 1\) và \(y = 2x - 5\) là`, ['song song', 'cắt nhau', 'trùng nhau', 'cắt nhau tại một điểm trên trục tung'], r`Cùng hệ số góc 2, tung độ gốc khác nhau.`, [
      undefined,
      'Cùng hệ số góc nên không cắt nhau.',
      'Tung độ gốc khác nhau.',
      'Không cắt nhau.',
    ]),
    mc(1, SC, r`Vị trí của hai đường thẳng \(y = 3x + 2\) và \(y = -x + 2\) là`, ['cắt nhau tại một điểm trên trục tung', 'song song', 'trùng nhau', 'cắt nhau tại một điểm trên trục hoành'], 'Hệ số góc khác nhau và cùng tung độ gốc 2.', [
      undefined,
      'Hệ số góc khác nhau.',
      'Hệ số góc khác nhau.',
      r`Giao điểm là \((0; 2)\).`,
    ]),
    mc(2, SC, r`Đường thẳng nào sau đây song song với đường thẳng \(y = -3x + 1\)?`, [r`\(y = -3x + 5\)`, r`\(y = 3x + 1\)`, r`\(y = -3x + 1\)`, r`\(y = x - 3\)`], 'Cùng hệ số góc \\(-3\\), tung độ gốc khác 1.', [
      undefined,
      'Hệ số góc khác.',
      'Trùng nhau.',
      'Hệ số góc khác.',
    ]),
    mc(2, TS, r`Giá trị của \(m\) để đường thẳng \(y = (m + 2)x + 1\) song song với đường thẳng \(y = 5x - 3\) là`, [r`\(m = 3\)`, r`\(m = 7\)`, r`\(m = -3\)`, r`\(m = 5\)`], r`\(m + 2 = 5\) và \(1 \ne -3\) nên \(m = 3\).`, [
      undefined,
      'Cộng thay vì trừ.',
      'Sai dấu.',
      r`Khi đó hệ số góc là 7.`,
    ]),
    mc(3, TS, r`Giá trị của \(m\) để hai đường thẳng \(y = (m - 1)x + 2m\) và \(y = 3x + 4\) trùng nhau là`, [r`không có giá trị nào của \(m\)`, r`\(m = 4\)`, r`\(m = 2\)`, r`\(m = 3\)`], r`Cần \(m - 1 = 3\) và \(2m = 4\), tức \(m = 4\) và \(m = 2\): mâu thuẫn.`, [
      undefined,
      r`Khi \(m = 4\): \(y = 3x + 8\), song song chứ không trùng.`,
      r`Khi \(m = 2\): \(y = x + 4\), cắt nhau.`,
      'Không thỏa mãn điều kiện nào.',
    ]),
    mc(3, TS, r`Giá trị của \(m\) để hai đường thẳng \(y = 2x + m - 1\) và \(y = -x + 5\) cắt nhau tại một điểm trên trục tung là`, [r`\(m = 6\)`, r`\(m = 4\)`, r`\(m = 5\)`, r`\(m = -6\)`], r`Hệ số góc khác nhau; cùng tung độ gốc: \(m - 1 = 5 \iff m = 6\).`, [
      undefined,
      'Trừ thay vì cộng.',
      'Quên trừ 1.',
      'Sai dấu.',
    ]),
    mc(3, TF9, r`Hàm số \(y = ax + b\) có đồ thị song song với đường thẳng \(y = 2x - 1\) và đi qua điểm \((1; 4)\) là`, [r`\(y = 2x + 2\)`, r`\(y = 2x - 1\)`, r`\(y = 4x\)`, r`\(y = -2x + 6\)`], r`\(a = 2\); \(4 = 2 + b \iff b = 2\).`, [
      undefined,
      r`Trùng với đường đã cho và không đi qua \((1; 4)\).`,
      'Hệ số góc khác 2.',
      'Hệ số góc khác 2.',
    ]),
    mc(4, TF9, r`Hàm số \(y = ax + b\) có đồ thị cắt trục tung tại điểm có tung độ 5 và đi qua giao điểm của hai đường thẳng \(y = x + 1\), \(y = -x + 3\) là`, [r`\(y = -3x + 5\)`, r`\(y = 3x + 5\)`, r`\(y = -x + 5\)`, r`\(y = -3x + 2\)`], r`Giao điểm: \(x + 1 = -x + 3 \iff x = 1\), \(y = 2\). \(b = 5\); \(2 = a + 5 \iff a = -3\).`, [
      undefined,
      r`Không đi qua \((1; 2)\).`,
      r`Không đi qua \((1; 2)\).`,
      'Tung độ gốc khác 5.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, XG, 'Xét tính đúng sai về hệ số góc:', [
      [r`\(y = 5x - 2\) có hệ số góc 5.`, true, r`\(a = 5\).`],
      [r`\(y = -x\) có hệ số góc \(-1\).`, true, r`\(a = -1\).`],
      [r`\(y = 3 - 2x\) có hệ số góc 3.`, false, r`Hệ số góc là \(-2\).`],
      [r`\(y = \dfrac{x}{2} + 1\) có hệ số góc \(\dfrac12\).`, true, r`\(a = \dfrac12\).`],
    ]),
    tf(2, XG, r`Xét góc tạo bởi đường thẳng \(y = ax + b\) (\(a \ne 0\)) với trục \(Ox\).`, [
      [r`Nếu \(a > 0\) thì góc đó là góc nhọn.`, true, 'Tính chất hệ số góc.'],
      [r`Nếu \(a < 0\) thì góc đó là góc tù.`, true, 'Tính chất hệ số góc.'],
      [r`Đường thẳng \(y = 3x + 1\) tạo với \(Ox\) góc tù.`, false, r`\(a = 3 > 0\): góc nhọn.`],
      [r`Đường thẳng \(y = -0{,}5x + 4\) tạo với \(Ox\) góc tù.`, true, r`\(a < 0\).`],
    ]),
    tf(1, SC, r`Cho \(d_1: y = x + 3\), \(d_2: y = x - 1\), \(d_3: y = -2x + 3\).`, [
      [r`\(d_1 \parallel d_2\).`, true, 'Cùng hệ số góc, khác tung độ gốc.'],
      [r`\(d_1\) cắt \(d_3\).`, true, 'Hệ số góc khác nhau.'],
      [r`\(d_1\) và \(d_3\) cắt nhau tại một điểm trên trục tung.`, true, 'Cùng tung độ gốc 3.'],
      [r`\(d_2 \parallel d_3\).`, false, 'Hệ số góc khác nhau.'],
    ]),
    tf(2, SC, 'Xét tính đúng sai về hai đường thẳng \\(y = ax + b\\) và \\(y = a\'x + b\'\\) (\\(a, a\' \\ne 0\\)):', [
      [r`Nếu \(a \ne a'\) thì hai đường thẳng cắt nhau.`, true, 'Điều kiện cắt nhau.'],
      [r`Nếu \(a = a'\) và \(b \ne b'\) thì hai đường thẳng song song.`, true, 'Điều kiện song song.'],
      [r`Nếu \(a = a'\) và \(b = b'\) thì hai đường thẳng trùng nhau.`, true, 'Điều kiện trùng nhau.'],
      [r`Nếu \(a \ne a'\) thì hai đường thẳng song song.`, false, 'Khi đó chúng cắt nhau.'],
    ]),
    tf(2, TS, r`Cho \(d: y = (m - 2)x + 3\) (\(m \ne 2\)) và \(d': y = 4x - 1\).`, [
      [r`\(d \parallel d'\) khi \(m = 6\).`, true, r`\(m - 2 = 4\), \(3 \ne -1\).`],
      [r`\(d\) cắt \(d'\) khi \(m \ne 6\) (và \(m \ne 2\)).`, true, 'Hệ số góc khác nhau.'],
      [r`\(d\) trùng \(d'\) khi \(m = 6\).`, false, 'Tung độ gốc khác nhau nên không trùng.'],
      [r`Với \(m = 3\), \(d: y = x + 3\).`, true, 'Thay số.'],
    ]),
    tf(3, TS, r`Cho \(d: y = 2x + 3m - 1\) và \(d': y = -x + 8\).`, [
      [r`\(d\) cắt \(d'\) với mọi \(m\).`, true, r`\(2 \ne -1\).`],
      [r`\(d\) và \(d'\) cắt nhau tại một điểm trên trục tung khi \(m = 3\).`, true, r`\(3m - 1 = 8\).`],
      [r`Khi \(m = 3\), giao điểm là \((0; 8)\).`, true, 'Cùng tung độ gốc 8.'],
      [r`\(d \parallel d'\) khi \(m = 3\).`, false, 'Không bao giờ song song.'],
    ]),
    tf(3, TF9, r`Hàm số \(y = ax + b\) có đồ thị song song với \(y = -2x + 1\) và đi qua \((2; 1)\).`, [
      [r`\(a = -2\).`, true, 'Song song nên cùng hệ số góc.'],
      [r`\(b = 5\).`, true, r`\(1 = -4 + b\).`],
      [r`Hàm số là \(y = -2x + 5\).`, true, 'Kết hợp.'],
      [r`Đồ thị đi qua \((0; 1)\).`, false, r`Đi qua \((0; 5)\).`],
    ]),
    tf(2, XG, r`Cho hai đường thẳng \(y = 2x + 1\) và \(y = 3x + 1\).`, [
      [r`Hệ số góc của hai đường thẳng là 2 và 3.`, true, 'Hệ số của \\(x\\).'],
      [r`Đường thẳng \(y = 3x + 1\) dốc hơn.`, true, 'Hệ số góc dương lớn hơn thì góc tạo với \\(Ox\\) lớn hơn.'],
      [r`Cả hai cắt trục tung tại \((0; 1)\).`, true, 'Cùng tung độ gốc 1.'],
      ['Hai đường thẳng song song.', false, 'Hệ số góc khác nhau nên cắt nhau.'],
    ]),
    tf(4, TF9, r`Hàm số \(y = ax + b\) có đồ thị đi qua \(A(1; 3)\) và \(B(3; 7)\).`, [
      [r`\(a = 2\).`, true, r`\(2a = 4\).`],
      [r`\(b = 1\).`, true, r`\(3 = 2 + b\).`],
      [r`Đồ thị song song với đường thẳng \(y = 2x\).`, true, 'Cùng hệ số góc, khác tung độ gốc.'],
      [r`Đồ thị cắt trục hoành tại \(\left(\dfrac12; 0\right)\).`, false, r`Cắt tại \(\left(-\dfrac12; 0\right)\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, XG, r`Tìm hệ số góc của đường thẳng \(y = \dfrac{4x - 6}{2}\).`, '2', r`\(y = 2x - 3\) nên hệ số góc là 2.`),
    sa(2, TS, r`Tìm \(m\) để đường thẳng \(y = (2m + 1)x - 3\) song song với đường thẳng \(y = 7x + 2\).`, '3', r`\(2m + 1 = 7 \iff m = 3\); \(-3 \ne 2\).`),
    sa(3, TS, r`Tìm \(m\) để hai đường thẳng \(y = (m + 1)x + 2\) và \(y = (3 - m)x + 5\) song song với nhau.`, '1', r`\(m + 1 = 3 - m \iff m = 1\); tung độ gốc \(2 \ne 5\) và hệ số góc \(2 \ne 0\).`),
    sa(4, TF9, r`Hàm số \(y = ax + b\) có đồ thị đi qua \((-1; 2)\) và \((3; 10)\). Tính \(a + b\).`, '6', r`\(-a + b = 2\), \(3a + b = 10\) nên \(a = 2\), \(b = 4\); \(a + b = 6\).`),
    // ---- Tự luận ----
    es(2, SC, r`Xét vị trí tương đối của từng cặp đường thẳng: \(d_1: y = 3x - 1\); \(d_2: y = 3x + 2\); \(d_3: y = -x + 2\).`, r`\(d_1\), \(d_2\): cùng hệ số góc 3, khác tung độ gốc nên song song.
\(d_1\), \(d_3\): hệ số góc khác nhau nên cắt nhau.
\(d_2\), \(d_3\): hệ số góc khác nhau và cùng tung độ gốc 2 nên cắt nhau tại điểm \((0; 2)\) trên trục tung.`, r`0,5 điểm: kết luận đúng cặp \(d_1\), \(d_2\) và \(d_1\), \(d_3\).
0,5 điểm: kết luận đúng cặp \(d_2\), \(d_3\) và chỉ ra giao điểm.`),
    es(3, TS, r`Cho \(d: y = (m + 1)x + m - 2\) (\(m \ne -1\)) và \(d': y = 2x + 1\). Tìm \(m\) để:
a) \(d \parallel d'\); b) \(d\) cắt \(d'\) tại một điểm trên trục tung.`, r`a) \(m + 1 = 2\) và \(m - 2 \ne 1\): \(m = 1\) (thỏa mãn).
b) \(m + 1 \ne 2\) và \(m - 2 = 1\): \(m = 3\) (khi đó hệ số góc 4 khác 2, thỏa mãn).`, r`0,5 điểm: câu a, có kiểm tra điều kiện tung độ gốc.
0,5 điểm: câu b, có kiểm tra điều kiện hệ số góc.`),
    es(3, TF9, r`Xác định hàm số bậc nhất có đồ thị song song với đường thẳng \(y = 3x\) và đi qua điểm \((1; 5)\).`, r`Song song với \(y = 3x\) nên \(a = 3\), \(b \ne 0\).
Đi qua \((1; 5)\): \(5 = 3 + b \iff b = 2\) (thỏa mãn).
Hàm số là \(y = 3x + 2\).`, r`0,5 điểm: tìm đúng \(a\).
0,5 điểm: tìm đúng \(b\) và kết luận.`),
    es(4, TF9, r`Tìm \(m\) để ba đường thẳng \(y = 2x - 1\), \(y = -x + 5\) và \(y = mx + 1\) cùng đi qua một điểm.`, r`Giao điểm của hai đường đầu: \(2x - 1 = -x + 5 \iff x = 2\), \(y = 3\). Điểm \((2; 3)\).
Đường thẳng thứ ba đi qua \((2; 3)\): \(3 = 2m + 1 \iff m = 1\).
Vậy \(m = 1\).`, r`0,5 điểm: tìm đúng giao điểm của hai đường thẳng đầu.
0,5 điểm: tìm đúng \(m\).`),
  ],
};

export const BANK_CHUONG_7: BankLesson[] = [B25, B26, B27, B28, B29];
