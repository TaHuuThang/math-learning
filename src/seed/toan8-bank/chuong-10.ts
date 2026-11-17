/** Ngân hàng câu hỏi GĐ4 – Chương X. Một số hình khối trong thực tiễn (Bài 38 – Bài 39). */
import { es, ge, mc, r, sa, tf, type BankLesson } from './types';

const CM = { unit: 'cm' };
const CM2 = { unit: 'cm²' };
const CM3 = { unit: 'cm³' };
const M2 = { unit: 'm²' };

const CHOP_TAM_GIAC = `S(4,7.5) B(0,0) C(7,0) A(5,3.2) O(4,1.07) M(3.5,0)
BC SB SC SM
AB:dash AC:dash SA:dash SO:dash OM:dash
vuong(S,O,M) vuong(S,M,C)`;

const CHOP_TU_GIAC = `S(4,6) A(0,0) B(6,0) C(8,2) D(2,2) O(4,1) M(3,0)
ABC SA SB SC SM
AD:dash DC:dash SD:dash SO:dash OM:dash AC:dash BD:dash
vuong(S,M,B) vuong(S,O,M)`;

const NB = 'nhan-biet-hinh-chop-tam-giac-deu';
const XQ = 'dien-tich-xung-quanh-chop-tam-giac';
const TT = 'the-tich-chop-tam-giac';
const TH = 'tong-hop-chop-tam-giac';
const TTE = 'thuc-te-chop-tam-giac';

const B38: BankLesson = {
  slug: 'bai-38-hinh-chop-tam-giac-deu',
  questions: [
    mc(1, NB, 'Mặt đáy của hình chóp tam giác đều là', ['tam giác đều', 'tam giác cân', 'tam giác vuông', 'hình vuông'], 'Hình chóp tam giác đều có đáy là tam giác đều.', [
      undefined,
      'Tam giác cân là các mặt bên.',
      'Đáy không phải tam giác vuông.',
      'Đáy hình vuông là của hình chóp tứ giác đều.',
    ]),
    mc(1, NB, 'Các mặt bên của hình chóp tam giác đều là', ['những tam giác cân bằng nhau có chung đỉnh', 'những tam giác vuông', 'những hình chữ nhật bằng nhau', 'những hình thang cân'], 'Các mặt bên là những tam giác cân bằng nhau có chung đỉnh của hình chóp.', [
      undefined,
      'Mặt bên là tam giác cân.',
      'Hình chữ nhật là mặt bên của hình lăng trụ đứng.',
      'Mặt bên là tam giác.',
    ]),
    mc(1, NB, 'Hình chóp tam giác đều có bao nhiêu cạnh?', ['6', '4', '8', '9'], '3 cạnh đáy và 3 cạnh bên: 6 cạnh.', [
      undefined,
      'Đó là số đỉnh (hoặc số mặt).',
      'Đó là số cạnh của hình chóp tứ giác.',
      'Đó là số cạnh của hình lăng trụ tam giác.',
    ]),
    mc(2, NB, 'Hình chóp tam giác đều có bao nhiêu mặt (kể cả mặt đáy)?', ['4', '3', '5', '6'], '1 mặt đáy và 3 mặt bên: 4 mặt.', [
      undefined,
      'Chưa tính mặt đáy.',
      'Đó là số mặt của hình chóp tứ giác.',
      'Đó là số cạnh.',
    ]),
    mc(2, NB, r`Trong hình chóp tam giác đều \(S.ABC\), trung đoạn là`, [r`đường cao của mặt bên kẻ từ đỉnh \(S\)`, r`đường cao \(SO\) của hình chóp`, r`cạnh bên \(SA\)`, 'đường cao của tam giác đáy'], r`Trung đoạn là đường cao vẽ từ đỉnh \(S\) của mỗi mặt bên.`, [
      undefined,
      'Đó là đường cao của hình chóp.',
      'Đó là cạnh bên.',
      'Đường cao của tam giác đáy nằm trong mặt đáy.',
    ]),
    mc(2, XQ, 'Hình chóp tam giác đều có cạnh đáy 5 cm và trung đoạn 8 cm. Diện tích xung quanh là', [r`\(60\) cm²`, r`\(120\) cm²`, r`\(40\) cm²`, r`\(20\) cm²`], r`\(S_{xq} = p\cdot d = 7{,}5\cdot8 = 60\) cm².`, [
      undefined,
      'Dùng chu vi thay cho nửa chu vi.',
      'Đó là tích cạnh đáy và trung đoạn.',
      'Đó là diện tích một mặt bên.',
    ]),
    mc(3, XQ, 'Hình chóp tam giác đều có cạnh đáy 10 cm và cạnh bên 13 cm. Diện tích xung quanh là', [r`\(180\) cm²`, r`\(195\) cm²`, r`\(360\) cm²`, r`\(130\) cm²`], r`Trung đoạn \(d = \sqrt{13^2 - 5^2} = 12\) cm; \(S_{xq} = 15\cdot12 = 180\) cm².`, [
      undefined,
      'Dùng cạnh bên thay cho trung đoạn.',
      'Dùng chu vi thay cho nửa chu vi.',
      'Nhân cạnh đáy với cạnh bên.',
    ]),
    mc(3, XQ, 'Hình chóp tam giác đều có diện tích xung quanh 54 cm² và cạnh đáy 6 cm. Trung đoạn bằng', [r`\(6\) cm`, r`\(3\) cm`, r`\(9\) cm`, r`\(18\) cm`], r`Nửa chu vi đáy \(p = 9\) cm; \(d = \dfrac{54}{9} = 6\) cm.`, [
      undefined,
      'Chia cho chu vi thay vì nửa chu vi.',
      'Đó là nửa chu vi đáy.',
      'Chia cho cạnh đáy rồi nhân 2.',
    ]),
    mc(2, TT, 'Hình chóp tam giác đều có diện tích đáy 20 cm² và chiều cao 9 cm. Thể tích là', [r`\(60\) cm³`, r`\(180\) cm³`, r`\(90\) cm³`, r`\(29\) cm³`], r`\(V = \dfrac13\cdot20\cdot9 = 60\) cm³.`, [
      undefined,
      r`Quên nhân \(\dfrac13\).`,
      r`Nhân \(\dfrac12\) thay vì \(\dfrac13\).`,
      'Cộng thay vì nhân.',
    ]),
    mc(3, TT, 'Hình chóp tam giác đều có thể tích 40 cm³ và diện tích đáy 12 cm². Chiều cao là', [r`\(10\) cm`, r`\(\dfrac{10}{3}\) cm`, r`\(28\) cm`, r`\(480\) cm`], r`\(h = \dfrac{3V}{S} = \dfrac{120}{12} = 10\) cm.`, [
      undefined,
      'Quên nhân 3.',
      'Lấy hiệu, không phải thương.',
      'Nhân thay vì chia.',
    ]),
    mc(3, TT, 'Một hình chóp tam giác đều và một hình lăng trụ đứng tam giác có cùng đáy và cùng chiều cao. Tỉ số thể tích hình chóp so với hình lăng trụ là', [r`\(\dfrac13\)`, r`\(\dfrac12\)`, r`\(3\)`, r`\(1\)`], r`\(V_{\text{chóp}} = \dfrac13 Sh\), \(V_{\text{lăng trụ}} = Sh\).`, [
      undefined,
      r`Hệ số là \(\dfrac13\), không phải \(\dfrac12\).`,
      'Đảo ngược tỉ số.',
      'Hai thể tích không bằng nhau.',
    ]),
    mc(3, TH, 'Tứ diện đều có cạnh 2 cm (bốn mặt là tam giác đều). Diện tích toàn phần là', [r`\(4\sqrt3\) cm²`, r`\(3\sqrt3\) cm²`, r`\(\sqrt3\) cm²`, r`\(8\) cm²`], r`Mỗi mặt có diện tích \(\dfrac{2^2\sqrt3}{4} = \sqrt3\) cm²; bốn mặt: \(4\sqrt3\) cm².`, [
      undefined,
      'Chỉ tính ba mặt bên.',
      'Đó là diện tích một mặt.',
      r`Dùng nhầm diện tích mỗi mặt là \(\dfrac{a^2}{2}\).`,
    ]),
    mc(4, TH, 'Hình chóp tam giác đều có diện tích xung quanh 72 cm² và trung đoạn 6 cm. Cạnh đáy bằng', [r`\(8\) cm`, r`\(4\) cm`, r`\(12\) cm`, r`\(24\) cm`], r`\(p = \dfrac{72}{6} = 12\) cm nên chu vi đáy 24 cm, cạnh đáy \(8\) cm.`, [
      undefined,
      'Chia chu vi cho 6.',
      'Đó là nửa chu vi đáy.',
      'Đó là chu vi đáy.',
    ]),
    mc(3, TTE, 'Một hộp quà có dạng hình chóp tam giác đều, cạnh đáy 10 cm, trung đoạn 12 cm. Diện tích giấy cần để dán kín ba mặt bên là', [r`\(180\) cm²`, r`\(360\) cm²`, r`\(120\) cm²`, r`\(60\) cm²`], r`\(S_{xq} = 15\cdot12 = 180\) cm².`, [
      undefined,
      'Dùng chu vi thay cho nửa chu vi.',
      'Nhân cạnh đáy với trung đoạn.',
      'Đó là diện tích một mặt bên.',
    ]),
    mc(3, TTE, 'Một khối pha lê có dạng hình chóp tam giác đều, diện tích đáy 43,3 cm² và chiều cao 12 cm. Thể tích khối pha lê là', [r`\(173{,}2\) cm³`, r`\(519{,}6\) cm³`, r`\(259{,}8\) cm³`, r`\(55{,}3\) cm³`], r`\(V = \dfrac13\cdot43{,}3\cdot12 = 173{,}2\) cm³.`, [
      undefined,
      r`Quên nhân \(\dfrac13\).`,
      r`Nhân \(\dfrac12\) thay vì \(\dfrac13\).`,
      'Cộng thay vì nhân.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, NB, r`Cho hình chóp tam giác đều \(S.ABC\).`, [
      [r`Đáy \(ABC\) là tam giác đều.`, true, 'Theo định nghĩa.'],
      [r`\(SA = SB = SC\).`, true, 'Các cạnh bên bằng nhau.'],
      ['Hình chóp có 4 đỉnh.', true, r`Gồm \(S\), \(A\), \(B\), \(C\).`],
      ['Các mặt bên luôn là tam giác đều.', false, 'Là tam giác cân; chỉ đều khi là tứ diện đều.'],
    ]),
    tf(2, NB, r`Hình chóp tam giác đều \(S.ABC\) có \(O\) là tâm tam giác đáy, \(M\) là trung điểm của \(BC\).`, [
      [r`\(SO\) là đường cao của hình chóp.`, true, 'Chân đường cao là tâm đáy.'],
      [r`\(SM\) là một trung đoạn.`, true, r`Tam giác \(SBC\) cân tại \(S\) nên \(SM \perp BC\).`],
      [r`\(SM \perp BC\).`, true, 'Trung tuyến của tam giác cân.'],
      [r`\(SM = SB\).`, false, r`\(SB\) là cạnh huyền của tam giác vuông \(SMB\) nên \(SM < SB\).`],
    ]),
    tf(2, XQ, 'Hình chóp tam giác đều có cạnh đáy 8 cm và trung đoạn 10 cm.', [
      ['Nửa chu vi đáy là 12 cm.', true, r`\(\dfrac{3\cdot8}{2}\).`],
      ['Diện tích một mặt bên là 40 cm².', true, r`\(\dfrac12\cdot8\cdot10\).`],
      ['Diện tích xung quanh là 120 cm².', true, r`\(12\cdot10\).`],
      ['Diện tích xung quanh là 240 cm².', false, 'Dùng chu vi thay cho nửa chu vi.'],
    ]),
    tf(3, XQ, 'Hình chóp tam giác đều có cạnh đáy 16 cm và cạnh bên 10 cm.', [
      ['Trung đoạn bằng 6 cm.', true, r`\(\sqrt{100 - 64}\).`],
      ['Mỗi mặt bên có diện tích 48 cm².', true, r`\(\dfrac12\cdot16\cdot6\).`],
      ['Diện tích xung quanh là 144 cm².', true, r`\(24\cdot6\).`],
      ['Diện tích xung quanh là 240 cm².', false, 'Dùng cạnh bên thay cho trung đoạn.'],
    ]),
    tf(2, TT, 'Hình chóp tam giác đều có diện tích đáy 27 cm² và chiều cao 10 cm.', [
      ['Thể tích hình chóp là 90 cm³.', true, r`\(\dfrac13\cdot27\cdot10\).`],
      ['Hình lăng trụ đứng có cùng đáy, cùng chiều cao có thể tích 270 cm³.', true, r`\(27\cdot10\).`],
      ['Thể tích hình chóp là 270 cm³.', false, r`Quên nhân \(\dfrac13\).`],
      ['Nếu chiều cao tăng gấp đôi, đáy giữ nguyên thì thể tích tăng gấp đôi.', true, 'Thể tích tỉ lệ với chiều cao.'],
    ]),
    tf(3, TT, 'Hình chóp tam giác đều có thể tích 50 cm³ và chiều cao 6 cm.', [
      ['Diện tích đáy là 25 cm².', true, r`\(\dfrac{3\cdot50}{6}\).`],
      [r`Diện tích đáy là \(\dfrac{25}{3}\) cm².`, false, 'Quên nhân 3.'],
      ['Giữ nguyên đáy, tăng chiều cao thêm 3 cm thì thể tích là 75 cm³.', true, r`\(\dfrac13\cdot25\cdot9\).`],
      ['Diện tích đáy giảm một nửa, chiều cao tăng gấp đôi thì thể tích không đổi.', true, 'Tích đáy và chiều cao không đổi.'],
    ]),
    tf(3, TH, 'Tứ diện đều có cạnh 4 cm (bốn mặt đều là tam giác đều).', [
      [r`Trung đoạn bằng \(2\sqrt3\) cm.`, true, r`\(\sqrt{16 - 4}\).`],
      [r`Diện tích xung quanh là \(12\sqrt3\) cm².`, true, r`\(6\cdot2\sqrt3\).`],
      [r`Diện tích toàn phần là \(16\sqrt3\) cm².`, true, 'Bốn mặt bằng nhau.'],
      [r`Diện tích toàn phần là \(12\sqrt3\) cm².`, false, 'Chưa cộng mặt đáy.'],
    ]),
    tf(4, TH, r`Hình chóp tam giác đều \(S.ABC\) có cạnh đáy 6 cm; \(M\) là trung điểm \(BC\), trung đoạn \(SM = 5\) cm; \(O\) là tâm đáy.`, [
      [r`\(AM = 3\sqrt3\) cm.`, true, 'Đường cao tam giác đều cạnh 6.'],
      [r`\(OM = \dfrac13AM = \sqrt3\) cm.`, true, r`\(O\) là trọng tâm tam giác \(ABC\).`],
      [r`Chiều cao \(SO = \sqrt{22}\) cm.`, true, r`\(\sqrt{25 - 3}\).`],
      ['Diện tích xung quanh là 90 cm².', false, r`\(S_{xq} = 9\cdot5 = 45\) cm².`],
    ]),
    tf(3, TTE, 'Một chiếc lều có dạng hình chóp tam giác đều (không có đáy), cạnh đáy 3 m, trung đoạn 2,5 m.', [
      ['Lều có 3 mặt bên bằng vải.', true, 'Hình chóp tam giác đều có 3 mặt bên.'],
      ['Diện tích vải làm ba mặt bên là 11,25 m².', true, r`\(4{,}5\cdot2{,}5\).`],
      ['Nếu cần thêm 20% vải cho đường may thì phải dùng 13,5 m² vải.', true, r`\(11{,}25\cdot1{,}2\).`],
      ['Diện tích vải làm ba mặt bên là 22,5 m².', false, 'Dùng chu vi thay cho nửa chu vi.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, XQ, 'Hình chóp tam giác đều có cạnh đáy 7 cm và trung đoạn 10 cm. Tính diện tích xung quanh.', '105', r`\(p = 10{,}5\) cm; \(S_{xq} = 10{,}5\cdot10 = 105\) cm².`, CM2),
    sa(3, TT, 'Hình chóp tam giác đều có diện tích đáy 36 cm² và thể tích 96 cm³. Tính chiều cao.', '8', r`\(h = \dfrac{3V}{S} = \dfrac{288}{36} = 8\) cm.`, CM),
    sa(3, TTE, 'Một khối pha lê có dạng hình chóp tam giác đều với diện tích đáy 15 cm², chiều cao 8 cm. Biết mỗi cm³ pha lê nặng 2,5 g, tính khối lượng khối pha lê.', '100', r`\(V = \dfrac13\cdot15\cdot8 = 40\) cm³; khối lượng \(40\cdot2{,}5 = 100\) g.`, { unit: 'g' }),
    // ---- Tự luận ----
    es(2, NB, 'Một hình chóp tam giác đều có cạnh đáy 5 cm và cạnh bên 7 cm. Hình chóp có bao nhiêu mặt, bao nhiêu đỉnh, bao nhiêu cạnh? Tính tổng độ dài tất cả các cạnh.', r`Hình chóp tam giác đều có 4 mặt (1 đáy, 3 mặt bên), 4 đỉnh, 6 cạnh (3 cạnh đáy, 3 cạnh bên).
Tổng độ dài các cạnh: \(3\cdot5 + 3\cdot7 = 36\) cm.`, r`0,5 điểm: nêu đúng số mặt, đỉnh, cạnh.
0,5 điểm: tính đúng tổng độ dài.`),
    es(3, XQ, 'Hình chóp tam giác đều có cạnh đáy 24 cm và cạnh bên 13 cm. Tính trung đoạn và diện tích xung quanh của hình chóp.', r`Trung đoạn là đường cao của mặt bên (tam giác cân), chia cạnh đáy thành hai đoạn 12 cm: \(d = \sqrt{13^2 - 12^2} = 5\) cm.
Nửa chu vi đáy \(p = 36\) cm; \(S_{xq} = 36\cdot5 = 180\) cm².`, r`0,5 điểm: tính đúng trung đoạn.
0,5 điểm: tính đúng diện tích xung quanh.`),
    es(3, TT, r`Hình chóp tam giác đều có cạnh đáy 4 cm và chiều cao 6 cm. Tính diện tích đáy và thể tích hình chóp (làm tròn kết quả đến hàng phần trăm).`, r`Đường cao tam giác đáy: \(\sqrt{4^2 - 2^2} = 2\sqrt3\) cm.
Diện tích đáy \(S = \dfrac12\cdot4\cdot2\sqrt3 = 4\sqrt3 \approx 6{,}93\) cm².
\(V = \dfrac13\cdot4\sqrt3\cdot6 = 8\sqrt3 \approx 13{,}86\) cm³.`, r`0,5 điểm: tính đúng diện tích đáy.
0,5 điểm: tính đúng thể tích.`),
    es(4, TH, 'Hình chóp tam giác đều có diện tích xung quanh 120 cm² và cạnh đáy 8 cm. Tính trung đoạn và độ dài cạnh bên (làm tròn đến hàng phần trăm).', r`Nửa chu vi đáy \(p = 12\) cm; trung đoạn \(d = \dfrac{120}{12} = 10\) cm.
Trong tam giác vuông tạo bởi trung đoạn, nửa cạnh đáy (4 cm) và cạnh bên: cạnh bên \(= \sqrt{10^2 + 4^2} = \sqrt{116} \approx 10{,}77\) cm.`, r`0,5 điểm: tính đúng trung đoạn.
0,5 điểm: tính đúng cạnh bên.`),
    ge(2, XQ, r`Cho hình chóp tam giác đều \(S.ABC\) có cạnh đáy \(BC = 9\) cm; \(M\) là trung điểm \(BC\), trung đoạn \(SM = 12\) cm. Giải thích vì sao \(SM \perp BC\) và tính diện tích xung quanh của hình chóp.`, CHOP_TAM_GIAC, r`Mặt bên \(SBC\) là tam giác cân tại \(S\), \(SM\) là trung tuyến nên cũng là đường cao: \(SM \perp BC\).
Nửa chu vi đáy \(p = \dfrac{3\cdot9}{2} = 13{,}5\) cm; \(S_{xq} = p\cdot d = 13{,}5\cdot12 = 162\) cm².`, r`0,5 điểm: giải thích \(SM \perp BC\).
0,5 điểm: tính đúng diện tích xung quanh.`),
    ge(3, TH, r`Cho hình chóp tam giác đều \(S.ABC\) có cạnh đáy \(AB = 16\) cm, cạnh bên \(SA = 17\) cm; \(M\) là trung điểm \(BC\). Tính trung đoạn \(SM\), diện tích xung quanh và diện tích toàn phần của hình chóp (làm tròn đến hàng phần trăm).`, CHOP_TAM_GIAC, r`Tam giác \(SMC\) vuông tại \(M\), \(MC = 8\) cm: \(SM = \sqrt{17^2 - 8^2} = 15\) cm.
\(S_{xq} = 24\cdot15 = 360\) cm².
Đường cao tam giác đáy \(AM = \sqrt{16^2 - 8^2} = 8\sqrt3\) cm, diện tích đáy \(\dfrac12\cdot16\cdot8\sqrt3 = 64\sqrt3 \approx 110{,}85\) cm².
\(S_{tp} \approx 360 + 110{,}85 = 470{,}85\) cm².`, r`0,25 điểm: tính đúng \(SM\).
0,25 điểm: tính đúng \(S_{xq}\).
0,5 điểm: tính diện tích đáy và \(S_{tp}\).`),
    ge(4, TH, r`Cho hình chóp tam giác đều \(S.ABC\) có cạnh đáy 12 cm, chiều cao \(SO = 2\) cm (\(O\) là tâm đáy), \(M\) là trung điểm \(BC\). Tính \(OM\), trung đoạn \(SM\), diện tích xung quanh và thể tích hình chóp (thể tích làm tròn đến hàng phần trăm).`, CHOP_TAM_GIAC, r`\(AM = \sqrt{12^2 - 6^2} = 6\sqrt3\) cm; \(O\) là trọng tâm nên \(OM = \dfrac13AM = 2\sqrt3\) cm.
Tam giác \(SOM\) vuông tại \(O\): \(SM = \sqrt{2^2 + (2\sqrt3)^2} = \sqrt{16} = 4\) cm.
\(S_{xq} = 18\cdot4 = 72\) cm².
Diện tích đáy \(\dfrac12\cdot12\cdot6\sqrt3 = 36\sqrt3\) cm²; \(V = \dfrac13\cdot36\sqrt3\cdot2 = 24\sqrt3 \approx 41{,}57\) cm³.`, r`0,25 điểm: tính đúng \(OM\).
0,25 điểm: tính đúng \(SM\).
0,25 điểm: tính \(S_{xq}\).
0,25 điểm: tính thể tích.`),
  ],
};

const NB4 = 'nhan-biet-hinh-chop-tu-giac-deu';
const XQ4 = 'dien-tich-xung-quanh-chop-tu-giac';
const TT4 = 'the-tich-chop-tu-giac';
const TH4 = 'tong-hop-chop-tu-giac';
const TTE4 = 'thuc-te-chop-tu-giac';

const B39: BankLesson = {
  slug: 'bai-39-hinh-chop-tu-giac-deu',
  questions: [
    mc(1, NB4, 'Mặt đáy của hình chóp tứ giác đều là', ['hình vuông', 'hình chữ nhật', 'hình thoi', 'tứ giác bất kì'], 'Hình chóp tứ giác đều có đáy là hình vuông.', [
      undefined,
      'Hình chữ nhật chưa chắc có các cạnh bằng nhau.',
      'Hình thoi chưa chắc có góc vuông.',
      'Đáy phải là tứ giác đều, tức hình vuông.',
    ]),
    mc(1, NB4, 'Hình chóp tứ giác đều có bao nhiêu mặt bên?', ['4', '5', '3', '6'], 'Mỗi cạnh đáy ứng với một mặt bên: 4 mặt bên.', [
      undefined,
      'Đó là tổng số mặt kể cả đáy.',
      'Đó là số mặt bên của hình chóp tam giác.',
      'Đó là số mặt của hình hộp.',
    ]),
    mc(1, NB4, 'Hình chóp tứ giác đều có bao nhiêu cạnh?', ['8', '4', '6', '12'], '4 cạnh đáy và 4 cạnh bên: 8 cạnh.', [
      undefined,
      'Mới đếm cạnh đáy hoặc cạnh bên.',
      'Đó là số cạnh của hình chóp tam giác.',
      'Đó là số cạnh của hình hộp.',
    ]),
    mc(2, NB4, r`Chân đường cao \(SO\) của hình chóp tứ giác đều \(S.ABCD\) là`, ['giao điểm hai đường chéo của đáy', r`trung điểm cạnh \(AB\)`, r`đỉnh \(A\)`, r`trung điểm cạnh \(SA\)`], r`\(O\) là tâm hình vuông đáy, tức giao điểm của \(AC\) và \(BD\).`, [
      undefined,
      'Trung điểm cạnh đáy là chân trung đoạn.',
      'Đường cao không đi qua đỉnh đáy.',
      'Điểm này không nằm trên mặt đáy.',
    ]),
    mc(2, NB4, r`Cho hình chóp tứ giác đều \(S.ABCD\). Khẳng định nào sau đây đúng?`, [r`\(SA = SB = SC = SD\)`, r`\(SA = AB\)`, r`\(SO = SA\)`, 'Các mặt bên là tam giác vuông'], 'Các cạnh bên của hình chóp đều bằng nhau.', [
      undefined,
      'Cạnh bên chưa chắc bằng cạnh đáy.',
      r`\(SA\) là cạnh huyền của tam giác vuông \(SOA\).`,
      'Các mặt bên là tam giác cân.',
    ]),
    mc(2, XQ4, 'Hình chóp tứ giác đều có cạnh đáy 6 cm và trung đoạn 9 cm. Diện tích xung quanh là', [r`\(108\) cm²`, r`\(216\) cm²`, r`\(54\) cm²`, r`\(144\) cm²`], r`\(S_{xq} = p\cdot d = 12\cdot9 = 108\) cm².`, [
      undefined,
      'Dùng chu vi thay cho nửa chu vi.',
      'Đó là diện tích hai mặt bên.',
      'Đó là diện tích toàn phần.',
    ]),
    mc(3, XQ4, 'Hình chóp tứ giác đều có cạnh đáy 16 cm và cạnh bên 17 cm. Diện tích xung quanh là', [r`\(480\) cm²`, r`\(544\) cm²`, r`\(960\) cm²`, r`\(240\) cm²`], r`Trung đoạn \(d = \sqrt{17^2 - 8^2} = 15\) cm; \(S_{xq} = 32\cdot15 = 480\) cm².`, [
      undefined,
      'Dùng cạnh bên thay cho trung đoạn.',
      'Dùng chu vi thay cho nửa chu vi.',
      'Đó là diện tích hai mặt bên.',
    ]),
    mc(3, XQ4, 'Hình chóp tứ giác đều có cạnh đáy 10 cm và chiều cao 12 cm. Diện tích xung quanh là', [r`\(260\) cm²`, r`\(240\) cm²`, r`\(520\) cm²`, r`\(130\) cm²`], r`Trung đoạn \(d = \sqrt{12^2 + 5^2} = 13\) cm; \(S_{xq} = 20\cdot13 = 260\) cm².`, [
      undefined,
      'Dùng chiều cao thay cho trung đoạn.',
      'Dùng chu vi thay cho nửa chu vi.',
      'Đó là diện tích hai mặt bên.',
    ]),
    mc(2, TT4, 'Hình chóp tứ giác đều có cạnh đáy 9 cm và chiều cao 10 cm. Thể tích là', [r`\(270\) cm³`, r`\(810\) cm³`, r`\(90\) cm³`, r`\(30\) cm³`], r`\(V = \dfrac13\cdot81\cdot10 = 270\) cm³.`, [
      undefined,
      r`Quên nhân \(\dfrac13\).`,
      'Dùng cạnh đáy thay cho diện tích đáy (quên nhân \\(\\dfrac13\\)).',
      'Dùng cạnh đáy thay cho diện tích đáy.',
    ]),
    mc(3, TT4, 'Hình chóp tứ giác đều có thể tích 200 cm³ và cạnh đáy 10 cm. Chiều cao là', [r`\(6\) cm`, r`\(2\) cm`, r`\(20\) cm`, r`\(60\) cm`], r`\(h = \dfrac{3V}{a^2} = \dfrac{600}{100} = 6\) cm.`, [
      undefined,
      'Quên nhân 3.',
      'Chia cho cạnh đáy thay vì diện tích đáy (quên nhân 3).',
      'Chia cho cạnh đáy thay vì diện tích đáy.',
    ]),
    mc(3, TT4, 'Nếu cạnh đáy của hình chóp tứ giác đều tăng gấp đôi và chiều cao giữ nguyên thì thể tích', ['tăng 4 lần', 'tăng 2 lần', 'tăng 8 lần', 'không đổi'], r`Diện tích đáy \(a^2\) tăng 4 lần nên thể tích tăng 4 lần.`, [
      undefined,
      'Diện tích đáy tăng theo bình phương cạnh.',
      'Chiều cao không đổi nên không tăng 8 lần.',
      'Diện tích đáy thay đổi.',
    ]),
    mc(3, TH4, 'Hình chóp tứ giác đều có cạnh đáy 6 cm và trung đoạn 5 cm. Diện tích toàn phần là', [r`\(96\) cm²`, r`\(60\) cm²`, r`\(156\) cm²`, r`\(66\) cm²`], r`\(S_{xq} = 12\cdot5 = 60\) cm², \(S_{đáy} = 36\) cm²; \(S_{tp} = 96\) cm².`, [
      undefined,
      'Đó mới là diện tích xung quanh.',
      'Dùng chu vi thay cho nửa chu vi.',
      'Cộng cạnh đáy thay cho diện tích đáy.',
    ]),
    mc(4, TH4, 'Hình chóp tứ giác đều có trung đoạn 13 cm và cạnh đáy 24 cm. Chiều cao của hình chóp là', [r`\(5\) cm`, r`\(\sqrt{313}\) cm`, r`\(1\) cm`, r`\(12\) cm`], r`Tam giác vuông tạo bởi chiều cao, trung đoạn và nửa cạnh đáy (12 cm): \(h = \sqrt{169 - 144} = 5\) cm.`, [
      undefined,
      'Cộng bình phương thay vì trừ.',
      'Trừ độ dài thay vì bình phương.',
      'Đó là nửa cạnh đáy.',
    ]),
    mc(3, TTE4, 'Một mái che có dạng hình chóp tứ giác đều (không có đáy), cạnh đáy 4 m, trung đoạn 3 m. Diện tích cần lợp mái là', [r`\(24\) m²`, r`\(48\) m²`, r`\(40\) m²`, r`\(12\) m²`], r`\(S_{xq} = 8\cdot3 = 24\) m².`, [
      undefined,
      'Dùng chu vi thay cho nửa chu vi.',
      'Cộng thêm diện tích đáy, trong khi mái không có đáy.',
      'Đó là diện tích hai mặt bên.',
    ]),
    mc(3, TTE4, 'Một chiếc chặn giấy bằng gỗ có dạng hình chóp tứ giác đều, cạnh đáy 6 cm, chiều cao 5 cm. Thể tích gỗ làm chặn giấy là', [r`\(60\) cm³`, r`\(180\) cm³`, r`\(10\) cm³`, r`\(120\) cm³`], r`\(V = \dfrac13\cdot36\cdot5 = 60\) cm³.`, [
      undefined,
      r`Quên nhân \(\dfrac13\).`,
      'Dùng cạnh đáy thay cho diện tích đáy.',
      r`Nhân \(\dfrac23\) thay vì \(\dfrac13\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, NB4, r`Cho hình chóp tứ giác đều \(S.ABCD\).`, [
      [r`Đáy \(ABCD\) là hình vuông.`, true, 'Theo định nghĩa.'],
      ['Hình chóp có 5 mặt.', true, '1 mặt đáy và 4 mặt bên.'],
      ['Hình chóp có 5 đỉnh.', true, r`\(S\) và bốn đỉnh đáy.`],
      ['Hình chóp có 6 cạnh.', false, 'Có 8 cạnh: 4 cạnh đáy, 4 cạnh bên.'],
    ]),
    tf(2, NB4, r`Hình chóp tứ giác đều \(S.ABCD\) có \(O\) là giao điểm \(AC\) và \(BD\), \(M\) là trung điểm của \(CD\).`, [
      [r`\(SO\) là đường cao của hình chóp.`, true, 'Chân đường cao là tâm đáy.'],
      [r`\(SM\) là một trung đoạn.`, true, r`Tam giác \(SCD\) cân tại \(S\).`],
      [r`\(SM \perp CD\).`, true, 'Trung tuyến của tam giác cân.'],
      [r`\(OM = CD\).`, false, r`\(OM = \dfrac{CD}{2}\).`],
    ]),
    tf(2, XQ4, 'Hình chóp tứ giác đều có cạnh đáy 10 cm và trung đoạn 8 cm.', [
      ['Nửa chu vi đáy là 20 cm.', true, r`\(\dfrac{4\cdot10}{2}\).`],
      ['Diện tích một mặt bên là 40 cm².', true, r`\(\dfrac12\cdot10\cdot8\).`],
      ['Diện tích xung quanh là 160 cm².', true, r`\(20\cdot8\).`],
      ['Diện tích toàn phần là 160 cm².', false, r`\(S_{tp} = 160 + 100 = 260\) cm².`],
    ]),
    tf(3, XQ4, 'Hình chóp tứ giác đều có cạnh đáy 6 cm và cạnh bên 5 cm.', [
      ['Trung đoạn bằng 4 cm.', true, r`\(\sqrt{25 - 9}\).`],
      ['Diện tích xung quanh là 48 cm².', true, r`\(12\cdot4\).`],
      ['Diện tích toàn phần là 84 cm².', true, r`\(48 + 36\).`],
      ['Diện tích xung quanh là 60 cm².', false, 'Dùng cạnh bên thay cho trung đoạn.'],
    ]),
    tf(2, TT4, 'Hình chóp tứ giác đều có cạnh đáy 3 cm và chiều cao 5 cm.', [
      ['Diện tích đáy là 9 cm².', true, r`\(3^2\).`],
      ['Thể tích là 15 cm³.', true, r`\(\dfrac13\cdot9\cdot5\).`],
      ['Thể tích là 45 cm³.', false, r`Quên nhân \(\dfrac13\).`],
      ['Nếu chiều cao tăng gấp 3, đáy giữ nguyên thì thể tích là 45 cm³.', true, r`\(3\cdot15\).`],
    ]),
    tf(3, TT4, 'Một hình hộp chữ nhật có đáy là hình vuông cạnh 4 cm, chiều cao 9 cm và một hình chóp tứ giác đều có cùng đáy, cùng chiều cao.', [
      ['Thể tích hình hộp là 144 cm³.', true, r`\(16\cdot9\).`],
      ['Thể tích hình chóp là 48 cm³.', true, r`\(\dfrac13\cdot16\cdot9\).`],
      [r`Thể tích hình chóp bằng \(\dfrac13\) thể tích hình hộp.`, true, 'Cùng đáy, cùng chiều cao.'],
      ['Thể tích hình chóp là 72 cm³.', false, r`Nhân \(\dfrac12\) thay vì \(\dfrac13\).`],
    ]),
    tf(3, TH4, 'Hình chóp tứ giác đều có cạnh đáy 16 cm và chiều cao 15 cm.', [
      ['Khoảng cách từ tâm đáy đến trung điểm một cạnh đáy là 8 cm.', true, 'Bằng nửa cạnh đáy.'],
      ['Trung đoạn bằng 17 cm.', true, r`\(\sqrt{225 + 64}\).`],
      ['Diện tích xung quanh là 544 cm².', true, r`\(32\cdot17\).`],
      ['Thể tích là 3840 cm³.', false, r`Quên \(\dfrac13\): \(V = 1280\) cm³.`],
    ]),
    tf(4, TH4, r`Hình chóp tứ giác đều \(S.ABCD\) có tất cả các cạnh đều bằng 4 cm.`, [
      ['Các mặt bên là tam giác đều.', true, 'Ba cạnh bằng nhau.'],
      [r`Trung đoạn bằng \(2\sqrt3\) cm.`, true, r`\(\sqrt{16 - 4}\).`],
      [r`Diện tích xung quanh là \(16\sqrt3\) cm².`, true, r`\(8\cdot2\sqrt3\).`],
      [r`Chiều cao bằng \(2\sqrt3\) cm.`, false, r`\(h = \sqrt{12 - 4} = 2\sqrt2\) cm.`],
    ]),
    tf(3, TTE4, 'Một công trình mái kính có dạng hình chóp tứ giác đều với cạnh đáy 35 m và chiều cao 21 m.', [
      ['Diện tích đáy là 1225 m².', true, r`\(35^2\).`],
      ['Thể tích không gian bên trong là 8575 m³.', true, r`\(\dfrac13\cdot1225\cdot21\).`],
      ['Thể tích không gian bên trong là 25 725 m³.', false, r`Quên nhân \(\dfrac13\).`],
      ['Nếu cạnh đáy giảm một nửa, chiều cao giữ nguyên thì thể tích giảm 4 lần.', true, 'Diện tích đáy giảm 4 lần.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, XQ4, 'Hình chóp tứ giác đều có cạnh đáy 7 cm và trung đoạn 9 cm. Tính diện tích xung quanh.', '126', r`\(S_{xq} = p\cdot d = 14\cdot9 = 126\) cm².`, CM2),
    sa(3, TT4, 'Hình chóp tứ giác đều có thể tích 75 cm³ và chiều cao 9 cm. Tính cạnh đáy.', '5', r`Diện tích đáy \(\dfrac{3\cdot75}{9} = 25\) cm² nên cạnh đáy \(5\) cm.`, CM),
    sa(3, TTE4, 'Một chiếc lều có dạng hình chóp tứ giác đều (không có đáy), cạnh đáy 2,4 m, trung đoạn 2 m. Tính diện tích vải làm lều.', '9,6', r`\(S_{xq} = 4{,}8\cdot2 = 9{,}6\) m².`, M2),
    // ---- Tự luận ----
    es(2, NB4, 'Một hình chóp tứ giác đều có cạnh đáy 6 cm và cạnh bên 8 cm. Cho biết hình chóp có bao nhiêu mặt, bao nhiêu đỉnh và tính tổng độ dài tất cả các cạnh.', r`Hình chóp tứ giác đều có 5 mặt (1 đáy hình vuông, 4 mặt bên), 5 đỉnh, 8 cạnh.
Tổng độ dài các cạnh: \(4\cdot6 + 4\cdot8 = 56\) cm.`, r`0,5 điểm: nêu đúng số mặt, số đỉnh.
0,5 điểm: tính đúng tổng độ dài các cạnh.`),
    es(3, XQ4, 'Hình chóp tứ giác đều có cạnh đáy 14 cm và cạnh bên 25 cm. Tính trung đoạn, diện tích xung quanh và diện tích toàn phần.', r`Trung đoạn \(d = \sqrt{25^2 - 7^2} = \sqrt{576} = 24\) cm.
\(S_{xq} = 28\cdot24 = 672\) cm²; \(S_{tp} = 672 + 14^2 = 868\) cm².`, r`0,5 điểm: tính đúng trung đoạn.
0,5 điểm: tính đúng \(S_{xq}\) và \(S_{tp}\).`),
    es(3, TT4, 'Hình chóp tứ giác đều có cạnh đáy 18 cm và trung đoạn 15 cm. Tính chiều cao và thể tích của hình chóp.', r`Chiều cao, trung đoạn và nửa cạnh đáy (9 cm) tạo thành tam giác vuông: \(h = \sqrt{15^2 - 9^2} = 12\) cm.
\(V = \dfrac13\cdot18^2\cdot12 = 1296\) cm³.`, r`0,5 điểm: tính đúng chiều cao.
0,5 điểm: tính đúng thể tích.`),
    es(4, TH4, 'Hình chóp tứ giác đều có thể tích 400 cm³ và chiều cao 12 cm. Tính cạnh đáy, trung đoạn và diện tích toàn phần.', r`Diện tích đáy \(\dfrac{3\cdot400}{12} = 100\) cm² nên cạnh đáy 10 cm.
Trung đoạn \(d = \sqrt{12^2 + 5^2} = 13\) cm.
\(S_{xq} = 20\cdot13 = 260\) cm²; \(S_{tp} = 260 + 100 = 360\) cm².`, r`0,25 điểm: tính đúng cạnh đáy.
0,25 điểm: tính đúng trung đoạn.
0,5 điểm: tính đúng diện tích toàn phần.`),
    ge(2, XQ4, r`Cho hình chóp tứ giác đều \(S.ABCD\) có cạnh đáy \(AB = 8\) cm, \(M\) là trung điểm \(AB\) và trung đoạn \(SM = 9\) cm. Tính diện tích xung quanh và diện tích toàn phần của hình chóp.`, CHOP_TU_GIAC, r`Nửa chu vi đáy \(p = 16\) cm; \(S_{xq} = p\cdot SM = 16\cdot9 = 144\) cm².
Diện tích đáy \(8^2 = 64\) cm²; \(S_{tp} = 144 + 64 = 208\) cm².`, r`0,5 điểm: tính đúng \(S_{xq}\).
0,5 điểm: tính đúng \(S_{tp}\).`),
    ge(3, TT4, r`Cho hình chóp tứ giác đều \(S.ABCD\) có cạnh đáy \(AB = 6\) cm, chiều cao \(SO = 10\) cm, \(M\) là trung điểm \(AB\). Tính thể tích hình chóp và độ dài trung đoạn \(SM\) (làm tròn đến hàng phần trăm).`, CHOP_TU_GIAC, r`\(V = \dfrac13\cdot6^2\cdot10 = 120\) cm³.
\(OM = \dfrac{AD}{2} = 3\) cm; tam giác \(SOM\) vuông tại \(O\): \(SM = \sqrt{10^2 + 3^2} = \sqrt{109} \approx 10{,}44\) cm.`, r`0,5 điểm: tính đúng thể tích.
0,5 điểm: tính đúng \(SM\).`),
    ge(4, TH4, r`Cho hình chóp tứ giác đều \(S.ABCD\) có cạnh đáy \(AB = 12\) cm, chiều cao \(SO = 8\) cm, \(M\) là trung điểm \(AB\). Tính trung đoạn \(SM\), diện tích toàn phần và thể tích của hình chóp.`, CHOP_TU_GIAC, r`\(OM = 6\) cm; tam giác \(SOM\) vuông tại \(O\): \(SM = \sqrt{8^2 + 6^2} = 10\) cm.
\(S_{xq} = 24\cdot10 = 240\) cm²; \(S_{tp} = 240 + 144 = 384\) cm².
\(V = \dfrac13\cdot144\cdot8 = 384\) cm³.`, r`0,25 điểm: tính đúng \(SM\).
0,5 điểm: tính đúng \(S_{tp}\).
0,25 điểm: tính đúng thể tích.`),
  ],
};

export const BANK_CHUONG_10: BankLesson[] = [B38, B39];
