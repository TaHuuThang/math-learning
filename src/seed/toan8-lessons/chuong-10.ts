/** Chương X. Một số hình khối trong thực tiễn – nội dung bài học giai đoạn 3 (Bài 38 – Bài 39). */
import { ex, fc, gx, r, th, type LessonContent } from './types';

const CHOP_TAM_GIAC = `S(4,7.5) B(0,0) C(7,0) A(5,3.2) O(4,1.07) M(3.5,0)
BC SB SC SM
AB:dash AC:dash SA:dash SO:dash OM:dash
vuong(S,O,M) vuong(S,M,C)`;

const CHOP_TU_GIAC = `S(4,6) A(0,0) B(6,0) C(8,2) D(2,2) O(4,1) M(3,0)
ABC SA SB SC SM
AD:dash DC:dash SD:dash SO:dash OM:dash AC:dash BD:dash
vuong(S,M,B)`;

const BAI_38: LessonContent = {
  slug: 'bai-38-hinh-chop-tam-giac-deu',
  applications: r`- Lều cắm trại, mái chòi, hộp quà, đồ chơi xếp hình có dạng hình chóp tam giác đều.
- Tính lượng vật liệu làm mặt bên (diện tích xung quanh) và sức chứa (thể tích).
- Nhận biết khối tứ diện đều trong cấu trúc phân tử, khung giàn.`,
  theory: [
    th('definition', 'Hình chóp tam giác đều', r`**Hình chóp tam giác đều** \(S.ABC\) có đáy \(ABC\) là tam giác đều, các mặt bên \(SAB\), \(SBC\), \(SCA\) là những tam giác cân bằng nhau có chung đỉnh \(S\).
- \(S\): đỉnh; \(ABC\): mặt đáy; \(SA, SB, SC\): cạnh bên; \(AB, BC, CA\): cạnh đáy.
- \(SO\): **đường cao** (\(O\) là trọng tâm của tam giác đáy).
- \(SM\): **trung đoạn** – đường cao của mặt bên kẻ từ \(S\) (\(M\) là trung điểm cạnh đáy).`),
    th('property', 'Tính chất', r`- Các cạnh bên bằng nhau; các mặt bên là các tam giác cân bằng nhau.
- Chân đường cao \(O\) là trọng tâm (cũng là tâm) của tam giác đều đáy: \(OM = \dfrac13\) đường cao của đáy.`),
    th('rule', 'Diện tích xung quanh, diện tích toàn phần', r`Diện tích xung quanh bằng tích của nửa chu vi đáy với trung đoạn; diện tích toàn phần bằng diện tích xung quanh cộng diện tích đáy.`, r`S_{xq} = p\cdot d;\quad S_{tp} = S_{xq} + S_{đáy}`,
      r`Cạnh đáy 6 cm, trung đoạn 4 cm: \(p = 9\), \(S_{xq} = 36\) cm².`),
    th('rule', 'Thể tích', r`Thể tích hình chóp tam giác đều bằng một phần ba tích của diện tích đáy với chiều cao.`, r`V = \dfrac13 S\cdot h`,
      r`Diện tích đáy 15,6 cm², chiều cao 10 cm: \(V = 52\) cm³.`),
    th('special', 'Tứ diện đều', r`Hình chóp tam giác đều có tất cả các cạnh bằng nhau gọi là **tứ diện đều**: bốn mặt là bốn tam giác đều bằng nhau.`),
    th('note', 'Lưu ý', r`Phân biệt **chiều cao** \(h = SO\) (dùng cho thể tích) và **trung đoạn** \(d = SM\) (dùng cho diện tích xung quanh). Tam giác \(SOM\) vuông tại \(O\), tam giác \(SMB\) vuông tại \(M\).`),
  ],
  formulas: [
    {
      group: 'Hình chóp tam giác đều',
      items: [
        fc('Diện tích xung quanh', r`S_{xq} = p\cdot d`, r`- \(p\): nửa chu vi đáy
- \(d\): trung đoạn`, r`Cạnh đáy 8, trung đoạn 3: \(S_{xq} = 12\cdot3 = 36\).`),
        fc('Thể tích', r`V = \dfrac13 S\cdot h`, r`- \(S\): diện tích đáy
- \(h\): chiều cao`, r`\(S = 15{,}6\), \(h = 10\): \(V = 52\).`),
      ],
    },
    {
      group: 'Tam giác đều ở đáy',
      items: [
        fc('Đường cao và diện tích tam giác đều', r`h_{đáy} = \dfrac{a\sqrt3}{2},\quad S_{đáy} = \dfrac{a^2\sqrt3}{4}`, r`- \(a\): cạnh đáy`, r`\(a = 6\): \(h_{đáy} = 3\sqrt3\), \(S_{đáy} = 9\sqrt3 \approx 15{,}6\).`),
        fc('Trung đoạn theo cạnh bên', r`d = \sqrt{b^2 - \left(\dfrac a2\right)^2}`, r`- \(b\): cạnh bên; \(a\): cạnh đáy`, r`\(b = 5\), \(a = 6\): \(d = 4\).`),
      ],
    },
  ],
  examples: {
    'nhan-biet-hinh-chop-tam-giac-deu': [
      gx(1, r`Cho hình chóp tam giác đều \(S.ABC\) như hình. Kể tên đỉnh, mặt đáy, các mặt bên, các cạnh bên, đường cao và một trung đoạn.`,
        CHOP_TAM_GIAC,
        r`Hình chóp tam giác đều \(S.ABC\); \(O\) là tâm đáy; \(M\) là trung điểm \(BC\)`, r`Gọi tên các yếu tố`,
        'Dựa vào định nghĩa các yếu tố của hình chóp tam giác đều.',
        'Định nghĩa hình chóp tam giác đều.',
        [r`Đỉnh \(S\); mặt đáy \(ABC\); các mặt bên \(SAB\), \(SBC\), \(SCA\).`, r`Các cạnh bên \(SA\), \(SB\), \(SC\); đường cao \(SO\); trung đoạn \(SM\) (đường cao của mặt bên \(SBC\)).`],
        r`Đỉnh \(S\), đáy \(ABC\), mặt bên \(SAB, SBC, SCA\), cạnh bên \(SA, SB, SC\), đường cao \(SO\), trung đoạn \(SM\).`),
      gx(2, r`Hình chóp tam giác đều có cạnh đáy 6 cm, cạnh bên 5 cm. Tính độ dài trung đoạn.`,
        CHOP_TAM_GIAC,
        r`Hình chóp tam giác đều \(S.ABC\); \(BC = 6\) cm, \(SB = 5\) cm; \(M\) là trung điểm \(BC\)`, r`\(SM = ?\)`,
        r`Mặt bên \(SBC\) là tam giác cân nên trung đoạn \(SM\) vuông góc với \(BC\) tại trung điểm \(M\).`,
        'Tính chất tam giác cân; định lí Pythagore.',
        [r`\(BM = \dfrac{BC}{2} = 3\) cm.`, r`\(\triangle SMB\) vuông tại \(M\): \(SM^2 = SB^2 - BM^2 = 25 - 9 = 16\).`, r`\(SM = 4\) cm.`],
        r`Trung đoạn bằng 4 cm.`),
    ],
    'dien-tich-xung-quanh-chop-tam-giac': [
      ex(2, r`Tính diện tích xung quanh của hình chóp tam giác đều có cạnh đáy 6 cm và trung đoạn 4 cm.`,
        'Áp dụng trực tiếp công thức \\(S_{xq} = p\\cdot d\\).',
        'Diện tích xung quanh hình chóp tam giác đều.',
        [r`Nửa chu vi đáy: \(p = \dfrac{3\cdot6}{2} = 9\) (cm).`, r`\(S_{xq} = 9\cdot4 = 36\) (cm²).`],
        r`\(S_{xq} = 36\) cm².`,
        'Có thể kiểm tra: ba mặt bên, mỗi mặt có diện tích \\(\\dfrac12\\cdot6\\cdot4 = 12\\).'),
      gx(3, r`Hình chóp tam giác đều có cạnh đáy 8 cm, cạnh bên 5 cm. Tính diện tích xung quanh và diện tích toàn phần.`,
        CHOP_TAM_GIAC,
        r`Hình chóp tam giác đều, cạnh đáy \(a = 8\) cm, cạnh bên \(b = 5\) cm`, r`\(S_{xq}, S_{tp} = ?\)`,
        'Chưa có trung đoạn: tính bằng định lí Pythagore trong mặt bên; diện tích đáy là diện tích tam giác đều.',
        'Định lí Pythagore; công thức diện tích xung quanh, toàn phần.',
        [r`Trung đoạn \(d = \sqrt{5^2 - 4^2} = 3\) (cm).`, r`\(S_{xq} = p\cdot d = 12\cdot3 = 36\) (cm²).`, r`\(S_{đáy} = \dfrac{8^2\sqrt3}{4} = 16\sqrt3 \approx 27{,}71\) (cm²).`, r`\(S_{tp} \approx 36 + 27{,}71 = 63{,}71\) (cm²).`],
        r`\(S_{xq} = 36\) cm²; \(S_{tp} = 36 + 16\sqrt3 \approx 63{,}71\) cm².`),
    ],
    'the-tich-chop-tam-giac': [
      ex(2, r`Một hình chóp tam giác đều có diện tích đáy 15,6 cm² và chiều cao 10 cm. Tính thể tích.`,
        'Áp dụng công thức \\(V = \\dfrac13 S h\\).',
        'Thể tích hình chóp tam giác đều.',
        [r`\(V = \dfrac13\cdot15{,}6\cdot10\).`, r`\(V = 52\) (cm³).`],
        r`\(V = 52\) cm³.`),
      gx(3, r`Hình chóp tam giác đều có cạnh đáy 6 cm và chiều cao 5 cm. Tính thể tích (làm tròn đến hàng phần trăm).`,
        CHOP_TAM_GIAC,
        r`Hình chóp tam giác đều, cạnh đáy 6 cm, chiều cao \(SO = 5\) cm`, r`\(V = ?\)`,
        'Tính diện tích tam giác đều ở đáy trước.',
        'Diện tích tam giác đều; thể tích hình chóp.',
        [r`\(S_{đáy} = \dfrac{6^2\sqrt3}{4} = 9\sqrt3\) (cm²).`, r`\(V = \dfrac13\cdot9\sqrt3\cdot5 = 15\sqrt3 \approx 25{,}98\) (cm³).`],
        r`\(V = 15\sqrt3 \approx 25{,}98\) cm³.`),
    ],
    'tong-hop-chop-tam-giac': [
      ex(3, r`Tính diện tích toàn phần của một tứ diện đều có cạnh 6 cm.`,
        'Tứ diện đều có 4 mặt là các tam giác đều bằng nhau.',
        'Tứ diện đều; diện tích tam giác đều.',
        [r`Mỗi mặt có diện tích \(\dfrac{6^2\sqrt3}{4} = 9\sqrt3\) (cm²).`, r`\(S_{tp} = 4\cdot9\sqrt3 = 36\sqrt3 \approx 62{,}35\) (cm²).`],
        r`\(S_{tp} = 36\sqrt3 \approx 62{,}35\) cm².`),
      gx(4, r`Hình chóp tam giác đều \(S.ABC\) có cạnh đáy 6 cm và chiều cao \(SO = 4\) cm. Tính trung đoạn và diện tích xung quanh (làm tròn đến hàng phần mười).`,
        CHOP_TAM_GIAC,
        r`Hình chóp tam giác đều \(S.ABC\), cạnh đáy 6 cm, \(SO = 4\) cm; \(M\) là trung điểm \(BC\)`, r`\(SM = ?\); \(S_{xq} = ?\)`,
        r`Tam giác \(SOM\) vuông tại \(O\); \(OM\) bằng \(\dfrac13\) đường cao của tam giác đều đáy.`,
        'Trọng tâm tam giác; định lí Pythagore; diện tích xung quanh.',
        [r`Đường cao của đáy: \(AM = \dfrac{6\sqrt3}{2} = 3\sqrt3\); \(O\) là trọng tâm nên \(OM = \dfrac13AM = \sqrt3\) (cm).`, r`\(\triangle SOM\) vuông tại \(O\): \(SM^2 = SO^2 + OM^2 = 16 + 3 = 19\), \(SM = \sqrt{19} \approx 4{,}36\) cm.`, r`\(S_{xq} = p\cdot SM = 9\sqrt{19} \approx 39{,}2\) (cm²).`],
        r`Trung đoạn \(\sqrt{19} \approx 4{,}4\) cm; \(S_{xq} \approx 39{,}2\) cm².`,
        'Bài tổng hợp: nhận ra tam giác vuông \\(SOM\\) nối chiều cao với trung đoạn.'),
    ],
    'thuc-te-chop-tam-giac': [
      ex(3, r`Một chiếc lều cắm trại có dạng hình chóp tam giác đều (không có đáy), cạnh đáy 2 m, trung đoạn 2,5 m. Tính diện tích vải cần dùng, biết phải thêm 10% vải cho các đường may.`,
        'Vải phủ các mặt bên: diện tích xung quanh, rồi cộng thêm 10%.',
        'Diện tích xung quanh; tỉ lệ phần trăm.',
        [r`\(S_{xq} = p\cdot d = \dfrac{3\cdot2}{2}\cdot2{,}5 = 7{,}5\) (m²).`, r`Vải cần dùng: \(7{,}5\cdot(1 + 10\%) = 8{,}25\) (m²).`],
        r`Cần 8,25 m² vải.`),
    ],
  },
  notes: {
    'nhan-biet-hinh-chop-tam-giac-deu': 'Đáy là tam giác đều, mặt bên là tam giác cân bằng nhau; chân đường cao là trọng tâm đáy; trung đoạn đi qua trung điểm cạnh đáy.',
    'dien-tich-xung-quanh-chop-tam-giac': 'Dùng trung đoạn (không dùng chiều cao); thiếu trung đoạn thì tính từ cạnh bên bằng Pythagore.',
    'the-tich-chop-tam-giac': 'Nhớ hệ số \\(\\dfrac13\\); diện tích đáy tam giác đều cạnh \\(a\\) là \\(\\dfrac{a^2\\sqrt3}{4}\\).',
    'tong-hop-chop-tam-giac': 'Hai tam giác vuông quan trọng: \\(SOM\\) (chiều cao – trung đoạn) và \\(SMB\\) (trung đoạn – cạnh bên).',
    'thuc-te-chop-tam-giac': 'Xác định cần diện tích (vật liệu bề mặt) hay thể tích (sức chứa); chú ý có hay không có mặt đáy.',
  },
};

const BAI_39: LessonContent = {
  slug: 'bai-39-hinh-chop-tu-giac-deu',
  applications: r`- Kim tự tháp Ai Cập, mái nhà, chụp đèn, hộp quà có dạng hình chóp tứ giác đều.
- Tính diện tích tôn, ngói lợp mái (diện tích xung quanh) và thể tích không gian dưới mái.
- So sánh thể tích hình chóp với hình hộp, hình lập phương cùng đáy, cùng chiều cao.`,
  theory: [
    th('definition', 'Hình chóp tứ giác đều', r`**Hình chóp tứ giác đều** \(S.ABCD\) có đáy \(ABCD\) là hình vuông, các mặt bên là những tam giác cân bằng nhau có chung đỉnh \(S\).
- Đường cao \(SO\): \(O\) là giao điểm hai đường chéo của hình vuông đáy.
- Trung đoạn \(SM\): đường cao của mặt bên kẻ từ \(S\) (\(M\) là trung điểm cạnh đáy).`),
    th('property', 'Tính chất', r`- Bốn cạnh bên bằng nhau; bốn mặt bên là các tam giác cân bằng nhau.
- \(OM\) bằng nửa cạnh đáy; tam giác \(SOM\) vuông tại \(O\).`, r`OM = \dfrac{a}{2}`),
    th('rule', 'Diện tích xung quanh, toàn phần', r`Diện tích xung quanh bằng nửa chu vi đáy nhân trung đoạn; diện tích toàn phần bằng diện tích xung quanh cộng diện tích đáy.`, r`S_{xq} = p\cdot d = 2a\cdot d;\quad S_{tp} = S_{xq} + a^2`),
    th('rule', 'Thể tích', r`Thể tích bằng một phần ba diện tích đáy nhân chiều cao.`, r`V = \dfrac13 a^2 h`, r`Cạnh đáy 6 cm, chiều cao 4 cm: \(V = \dfrac13\cdot36\cdot4 = 48\) cm³.`),
    th('special', 'Liên hệ với hình lập phương', r`Hình chóp có đáy là một mặt của hình lập phương cạnh \(a\) và đỉnh là tâm mặt đối diện có thể tích \(\dfrac13a^3\) – bằng một phần ba thể tích hình lập phương.`),
    th('note', 'Lưu ý', r`Muốn tính trung đoạn từ chiều cao (hoặc ngược lại), dùng tam giác vuông \(SOM\): \(SM^2 = SO^2 + OM^2\).`),
  ],
  formulas: [
    {
      group: 'Hình chóp tứ giác đều',
      items: [
        fc('Diện tích xung quanh', r`S_{xq} = p\cdot d = 2a\cdot d`, r`- \(a\): cạnh đáy; \(d\): trung đoạn`, r`\(a = 10\), \(d = 12\): \(S_{xq} = 240\).`),
        fc('Diện tích toàn phần', r`S_{tp} = S_{xq} + a^2`, r`- \(a^2\): diện tích đáy hình vuông`, r`\(240 + 100 = 340\).`),
        fc('Thể tích', r`V = \dfrac13 a^2 h`, r`- \(a\): cạnh đáy; \(h\): chiều cao`, r`\(a = 6\), \(h = 4\): \(V = 48\).`),
        fc('Chiều cao – trung đoạn', r`d^2 = h^2 + \left(\dfrac a2\right)^2`, r`- \(d\): trung đoạn; \(h\): chiều cao; \(a\): cạnh đáy`, r`\(h = 4\), \(a = 6\): \(d = 5\).`),
      ],
    },
  ],
  examples: {
    'nhan-biet-hinh-chop-tu-giac-deu': [
      gx(1, r`Cho hình chóp tứ giác đều \(S.ABCD\) như hình. Kể tên mặt đáy, các mặt bên, các cạnh bên, đường cao và một trung đoạn.`,
        CHOP_TU_GIAC,
        r`Hình chóp tứ giác đều \(S.ABCD\); \(O = AC \cap BD\); \(M\) là trung điểm \(AB\)`, r`Gọi tên các yếu tố`,
        'Dựa vào định nghĩa hình chóp tứ giác đều.',
        'Định nghĩa hình chóp tứ giác đều.',
        [r`Mặt đáy: hình vuông \(ABCD\); các mặt bên: \(SAB\), \(SBC\), \(SCD\), \(SDA\).`, r`Cạnh bên: \(SA\), \(SB\), \(SC\), \(SD\); đường cao \(SO\); trung đoạn \(SM\).`],
        r`Đáy \(ABCD\); 4 mặt bên; 4 cạnh bên; đường cao \(SO\); trung đoạn \(SM\).`),
      gx(2, r`Hình chóp tứ giác đều có cạnh đáy 10 cm, cạnh bên 13 cm. Tính trung đoạn.`,
        CHOP_TU_GIAC,
        r`Hình chóp tứ giác đều \(S.ABCD\); \(AB = 10\) cm, \(SA = 13\) cm; \(M\) là trung điểm \(AB\)`, r`\(SM = ?\)`,
        'Mặt bên là tam giác cân: trung đoạn vuông góc với cạnh đáy tại trung điểm.',
        'Định lí Pythagore.',
        [r`\(AM = 5\) cm.`, r`\(\triangle SMA\) vuông tại \(M\): \(SM^2 = 13^2 - 5^2 = 144\).`, r`\(SM = 12\) cm.`],
        r`Trung đoạn bằng 12 cm.`),
    ],
    'dien-tich-xung-quanh-chop-tu-giac': [
      ex(2, r`Hình chóp tứ giác đều có cạnh đáy 10 cm và trung đoạn 12 cm. Tính diện tích xung quanh và diện tích toàn phần.`,
        'Áp dụng công thức, diện tích đáy là diện tích hình vuông.',
        'Diện tích xung quanh, toàn phần của hình chóp tứ giác đều.',
        [r`\(p = \dfrac{4\cdot10}{2} = 20\) cm; \(S_{xq} = 20\cdot12 = 240\) (cm²).`, r`\(S_{tp} = 240 + 10^2 = 340\) (cm²).`],
        r`\(S_{xq} = 240\) cm², \(S_{tp} = 340\) cm².`),
      gx(3, r`Hình chóp tứ giác đều có cạnh đáy 6 cm và chiều cao 4 cm. Tính diện tích xung quanh.`,
        CHOP_TU_GIAC,
        r`Hình chóp tứ giác đều \(S.ABCD\), cạnh đáy 6 cm, \(SO = 4\) cm`, r`\(S_{xq} = ?\)`,
        r`Cần trung đoạn: dùng tam giác vuông \(SOM\) với \(OM\) bằng nửa cạnh đáy.`,
        'Định lí Pythagore; diện tích xung quanh.',
        [r`\(OM = 3\) cm; \(SM^2 = SO^2 + OM^2 = 16 + 9 = 25\), \(SM = 5\) cm.`, r`\(S_{xq} = p\cdot d = 12\cdot5 = 60\) (cm²).`],
        r`\(S_{xq} = 60\) cm².`),
    ],
    'the-tich-chop-tu-giac': [
      ex(2, r`Tính thể tích hình chóp tứ giác đều có cạnh đáy 6 cm và chiều cao 4 cm.`,
        'Diện tích đáy là \\(6^2\\).',
        'Thể tích hình chóp tứ giác đều.',
        [r`\(S_{đáy} = 36\) cm².`, r`\(V = \dfrac13\cdot36\cdot4 = 48\) (cm³).`],
        r`\(V = 48\) cm³.`),
      gx(3, r`Hình chóp tứ giác đều có thể tích 96 cm³ và cạnh đáy 6 cm. Tính chiều cao và trung đoạn (làm tròn đến hàng phần trăm).`,
        CHOP_TU_GIAC,
        r`Hình chóp tứ giác đều, \(V = 96\) cm³, cạnh đáy 6 cm`, r`\(SO = ?\); \(SM = ?\)`,
        r`Từ công thức thể tích suy ra chiều cao; sau đó dùng tam giác \(SOM\).`,
        'Thể tích hình chóp; định lí Pythagore.',
        [r`\(96 = \dfrac13\cdot36\cdot h\), nên \(h = 8\) cm.`, r`\(SM^2 = 8^2 + 3^2 = 73\), \(SM = \sqrt{73} \approx 8{,}54\) cm.`],
        r`Chiều cao 8 cm; trung đoạn \(\sqrt{73} \approx 8{,}54\) cm.`),
    ],
    'tong-hop-chop-tu-giac': [
      gx(3, r`Hình chóp tứ giác đều \(S.ABCD\) có cạnh đáy 8 cm và trung đoạn 5 cm. Tính chiều cao, thể tích và diện tích toàn phần.`,
        CHOP_TU_GIAC,
        r`Hình chóp tứ giác đều \(S.ABCD\), cạnh đáy 8 cm, \(SM = 5\) cm`, r`\(SO\), \(V\), \(S_{tp} = ?\)`,
        r`Tam giác \(SOM\) vuông tại \(O\), \(OM = 4\) cm cho chiều cao; rồi áp dụng các công thức.`,
        'Định lí Pythagore; thể tích; diện tích xung quanh, toàn phần.',
        [r`\(SO^2 = SM^2 - OM^2 = 25 - 16 = 9\), \(SO = 3\) cm.`, r`\(V = \dfrac13\cdot64\cdot3 = 64\) (cm³).`, r`\(S_{xq} = 16\cdot5 = 80\) cm²; \(S_{tp} = 80 + 64 = 144\) (cm²).`],
        r`\(SO = 3\) cm; \(V = 64\) cm³; \(S_{tp} = 144\) cm².`),
      ex(4, r`Từ một khối gỗ hình lập phương cạnh 6 cm, người ta gọt thành một hình chóp tứ giác đều có đáy là một mặt của hình lập phương và đỉnh là tâm của mặt đối diện. Tính thể tích phần gỗ bị gọt bỏ.`,
        'Hình chóp có cạnh đáy 6 cm và chiều cao bằng cạnh hình lập phương.',
        'Thể tích hình lập phương; thể tích hình chóp.',
        [r`Thể tích hình lập phương: \(6^3 = 216\) (cm³).`, r`Hình chóp có cạnh đáy 6 cm, chiều cao 6 cm: \(V = \dfrac13\cdot36\cdot6 = 72\) (cm³).`, r`Phần bị gọt bỏ: \(216 - 72 = 144\) (cm³).`],
        r`144 cm³ (bằng \(\dfrac23\) khối gỗ).`,
        'Hình chóp có cùng đáy và chiều cao với hình hộp thì có thể tích bằng \\(\\dfrac13\\) hình hộp.'),
    ],
    'thuc-te-chop-tu-giac': [
      ex(3, r`Kim tự tháp Kheops (Ai Cập) có dạng hình chóp tứ giác đều với cạnh đáy khoảng 230 m và chiều cao khoảng 147 m. Tính gần đúng thể tích của kim tự tháp.`,
        'Áp dụng công thức thể tích với số liệu gần đúng.',
        'Thể tích hình chóp tứ giác đều.',
        [r`Diện tích đáy: \(230^2 = 52\,900\) (m²).`, r`\(V \approx \dfrac13\cdot52\,900\cdot147 = 52\,900\cdot49 = 2\,592\,100\) (m³).`],
        r`Khoảng 2,6 triệu m³.`,
        'Số liệu thực tế là gần đúng nên kết quả chỉ nên làm tròn hợp lí.'),
    ],
  },
  notes: {
    'nhan-biet-hinh-chop-tu-giac-deu': 'Đáy là hình vuông, chân đường cao là giao điểm hai đường chéo; trung đoạn đi qua trung điểm cạnh đáy.',
    'dien-tich-xung-quanh-chop-tu-giac': 'Nửa chu vi đáy bằng \\(2a\\); thiếu trung đoạn thì tính qua chiều cao (tam giác \\(SOM\\)) hoặc cạnh bên.',
    'the-tich-chop-tu-giac': 'Nhớ hệ số \\(\\dfrac13\\); biết thể tích có thể suy ngược chiều cao hoặc cạnh đáy.',
    'tong-hop-chop-tu-giac': 'Tam giác vuông \\(SOM\\) với \\(OM = \\dfrac a2\\) nối chiều cao và trung đoạn – chìa khóa của các bài tổng hợp.',
    'thuc-te-chop-tu-giac': 'Xác định đúng đại lượng cần tính (vật liệu bề mặt hay thể tích), ghi đơn vị và làm tròn hợp lí.',
  },
};

export const CHUONG_10: LessonContent[] = [BAI_38, BAI_39];
