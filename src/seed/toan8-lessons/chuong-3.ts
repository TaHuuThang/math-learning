/** Chương III. Tứ giác – nội dung bài học giai đoạn 3 (Bài 10 – Bài 14). */
import { fc, gx, r, th, type LessonContent } from './types';

const BAI_10: LessonContent = {
  slug: 'bai-10-tu-giac',
  applications: r`- Nhận biết và đo góc của các khung hình tứ giác trong đời sống: khung cửa, mảnh ruộng, viên gạch lát.
- Kiểm tra một khung tứ giác có "vuông" hay không bằng cách đo góc, đo đường chéo.
- Tính góc còn thiếu khi thiết kế, cắt ghép các tấm vật liệu hình tứ giác.`,
  theory: [
    th('definition', 'Tứ giác', r`**Tứ giác** \(ABCD\) là hình gồm bốn đoạn thẳng \(AB\), \(BC\), \(CD\), \(DA\), trong đó không có hai đoạn thẳng nào cùng nằm trên một đường thẳng.
- Các điểm \(A, B, C, D\) là các **đỉnh**; các đoạn \(AB, BC, CD, DA\) là các **cạnh**; \(AC\), \(BD\) là hai **đường chéo**.
- Hai cạnh cùng xuất phát tại một đỉnh là hai cạnh kề; hai cạnh không kề là hai cạnh đối.`),
    th('definition', 'Tứ giác lồi', r`**Tứ giác lồi** là tứ giác luôn nằm về một phía của đường thẳng chứa bất kì cạnh nào của tứ giác. Khi nói tứ giác mà không giải thích gì thêm, ta hiểu đó là tứ giác lồi.`),
    th('theorem', 'Tổng các góc của một tứ giác', r`Tổng các góc của một tứ giác bằng \(360^\circ\).
Giải thích: đường chéo \(AC\) chia tứ giác thành hai tam giác \(ABC\) và \(ACD\); tổng các góc của hai tam giác là \(2\cdot180^\circ = 360^\circ\).`,
      r`\widehat{A} + \widehat{B} + \widehat{C} + \widehat{D} = 360^\circ`,
      r`Tứ giác có \(\widehat{A} = 80^\circ\), \(\widehat{B} = 110^\circ\), \(\widehat{C} = 70^\circ\) thì \(\widehat{D} = 360^\circ - 260^\circ = 100^\circ\).`),
    th('property', 'Góc ngoài của tứ giác', r`Góc kề bù với một góc của tứ giác gọi là góc ngoài tại đỉnh đó. Tổng bốn góc ngoài (mỗi đỉnh một góc) của tứ giác cũng bằng \(360^\circ\).`),
    th('special', 'Trường hợp đặc biệt', r`- Tứ giác có ba góc vuông thì góc còn lại cũng vuông.
- Một tứ giác không thể có cả bốn góc nhọn (tổng sẽ nhỏ hơn \(360^\circ\)), cũng không thể có cả bốn góc tù.`),
    th('note', 'Lưu ý', r`Khi giải bài về cạnh và đường chéo, thường chia tứ giác thành các tam giác rồi dùng bất đẳng thức tam giác, tổng ba góc của tam giác hoặc các trường hợp bằng nhau của tam giác.`),
  ],
  formulas: [
    {
      group: 'Góc của tứ giác',
      items: [
        fc('Tổng các góc của tứ giác', r`\widehat{A} + \widehat{B} + \widehat{C} + \widehat{D} = 360^\circ`, r`- \(\widehat{A}, \widehat{B}, \widehat{C}, \widehat{D}\): bốn góc của tứ giác \(ABCD\)`, r`\(\widehat{A} = \widehat{B} = 90^\circ\), \(\widehat{C} = 120^\circ\) thì \(\widehat{D} = 60^\circ\).`),
        fc('Góc ngoài', r`\widehat{A}_{\text{ngoài}} = 180^\circ - \widehat{A}`, r`- \(\widehat{A}\): góc trong tại đỉnh \(A\)`, r`\(\widehat{A} = 70^\circ\) thì góc ngoài tại \(A\) bằng \(110^\circ\).`),
      ],
    },
    {
      group: 'Cạnh và đường chéo',
      items: [
        fc('Bất đẳng thức tam giác', r`AC < AB + BC`, r`- \(AB, BC, AC\): ba cạnh của tam giác \(ABC\)`, r`Trong tứ giác \(ABCD\): \(AC < AB + BC\) và \(AC < AD + DC\).`),
      ],
    },
  ],
  examples: {
    'tinh-so-do-goc-tu-giac': [
      gx(1, r`Tứ giác \(ABCD\) có \(\widehat{A} = 80^\circ\), \(\widehat{B} = 110^\circ\), \(\widehat{C} = 70^\circ\). Tính \(\widehat{D}\).`,
        `A(0,0) B(6,0) C(7,4) D(1,3.5)\nABCDA`,
        r`Tứ giác \(ABCD\); \(\widehat{A} = 80^\circ\), \(\widehat{B} = 110^\circ\), \(\widehat{C} = 70^\circ\)`, r`\(\widehat{D} = ?\)`,
        'Biết ba góc, tìm góc thứ tư nhờ tổng các góc của tứ giác.',
        'Tổng các góc của một tứ giác bằng \\(360^\\circ\\).',
        [r`\(\widehat{A} + \widehat{B} + \widehat{C} + \widehat{D} = 360^\circ\).`, r`\(\widehat{D} = 360^\circ - (80^\circ + 110^\circ + 70^\circ) = 360^\circ - 260^\circ = 100^\circ\).`],
        r`\(\widehat{D} = 100^\circ\).`),
      gx(2, r`Tứ giác \(ABCD\) có các góc tỉ lệ \(\widehat{A} : \widehat{B} : \widehat{C} : \widehat{D} = 1 : 2 : 3 : 4\). Tính các góc của tứ giác.`,
        `A(0,0) B(5,0) C(6,3) D(2,4)\nABCDA`,
        r`Tứ giác \(ABCD\); \(\widehat{A} : \widehat{B} : \widehat{C} : \widehat{D} = 1 : 2 : 3 : 4\)`, r`Tính \(\widehat{A}, \widehat{B}, \widehat{C}, \widehat{D}\)`,
        'Bốn góc chia \\(360^\\circ\\) theo tỉ lệ; dùng tính chất dãy tỉ số bằng nhau.',
        'Tổng các góc của tứ giác; tính chất dãy tỉ số bằng nhau.',
        [r`Đặt \(\widehat{A} = k\), \(\widehat{B} = 2k\), \(\widehat{C} = 3k\), \(\widehat{D} = 4k\).`, r`\(k + 2k + 3k + 4k = 360^\circ\) nên \(10k = 360^\circ\), \(k = 36^\circ\).`, r`\(\widehat{A} = 36^\circ\), \(\widehat{B} = 72^\circ\), \(\widehat{C} = 108^\circ\), \(\widehat{D} = 144^\circ\).`],
        r`\(36^\circ\); \(72^\circ\); \(108^\circ\); \(144^\circ\).`,
        'Kiểm tra lại: tổng bốn góc vừa tìm phải bằng \\(360^\\circ\\).'),
      gx(3, r`Tứ giác \(ABCD\) có \(\widehat{C} = 70^\circ\), \(\widehat{D} = 80^\circ\). Các tia phân giác của góc \(A\) và góc \(B\) cắt nhau tại \(I\). Tính \(\widehat{AIB}\).`,
        `A(0,0) B(7,0) C(5.5,4.5) D(1.5,4) I(3.6,2.1)\nABCDA AI BI\ngoc(A,I,B)`,
        r`Tứ giác \(ABCD\), \(\widehat{C} = 70^\circ\), \(\widehat{D} = 80^\circ\); \(AI\), \(BI\) là phân giác của \(\widehat{A}\), \(\widehat{B}\)`, r`\(\widehat{AIB} = ?\)`,
        r`Trong tam giác \(AIB\) chỉ cần biết \(\widehat{IAB} + \widehat{IBA} = \dfrac{\widehat{A} + \widehat{B}}{2}\); còn \(\widehat{A} + \widehat{B}\) tính được từ tổng các góc của tứ giác.`,
        'Tổng các góc của tứ giác, của tam giác; tính chất tia phân giác.',
        [r`\(\widehat{A} + \widehat{B} = 360^\circ - (\widehat{C} + \widehat{D}) = 360^\circ - 150^\circ = 210^\circ\).`, r`Vì \(AI\), \(BI\) là phân giác: \(\widehat{IAB} + \widehat{IBA} = \dfrac{\widehat{A} + \widehat{B}}{2} = 105^\circ\).`, r`Trong tam giác \(AIB\): \(\widehat{AIB} = 180^\circ - 105^\circ = 75^\circ\).`],
        r`\(\widehat{AIB} = 75^\circ\).`,
        r`Tổng quát: \(\widehat{AIB} = \dfrac{\widehat{C} + \widehat{D}}{2}\).`),
    ],
    'canh-goc-duong-cheo-tu-giac': [
      gx(3, r`Cho tứ giác \(ABCD\) có \(AB = AD\), \(CB = CD\). Chứng minh \(AC\) là đường trung trực của \(BD\) và \(\widehat{B} = \widehat{D}\).`,
        `A(3,6) B(0,3) C(3,-2) D(6,3) H(3,3)\nABCDA AC BD:dash\nvuong(A,H,B)`,
        r`Tứ giác \(ABCD\); \(AB = AD\), \(CB = CD\)`, r`\(AC\) là đường trung trực của \(BD\); \(\widehat{ABC} = \widehat{ADC}\)`,
        r`\(A\) và \(C\) cùng cách đều hai đầu đoạn \(BD\). Để có góc bằng nhau, chứng minh hai tam giác \(ABC\) và \(ADC\) bằng nhau.`,
        'Tính chất đường trung trực; trường hợp bằng nhau cạnh – cạnh – cạnh.',
        [r`\(AB = AD\) nên \(A\) thuộc đường trung trực của \(BD\); \(CB = CD\) nên \(C\) thuộc đường trung trực của \(BD\).`, r`Hai điểm phân biệt \(A\), \(C\) cùng thuộc đường trung trực của \(BD\) nên \(AC\) là đường trung trực của \(BD\).`, r`Xét \(\triangle ABC\) và \(\triangle ADC\): \(AB = AD\), \(CB = CD\), \(AC\) chung, nên \(\triangle ABC = \triangle ADC\) (c.c.c).`, r`Suy ra \(\widehat{ABC} = \widehat{ADC}\).`],
        r`\(AC\) là đường trung trực của \(BD\) và \(\widehat{B} = \widehat{D}\).`,
        'Tứ giác như vậy thường gọi là "hình cánh diều": hai đường chéo vuông góc với nhau.'),
      gx(4, r`Cho tứ giác lồi \(ABCD\) có chu vi \(P\). Chứng minh tổng hai đường chéo lớn hơn nửa chu vi và nhỏ hơn chu vi: \(\dfrac{P}{2} < AC + BD < P\).`,
        `A(0,0) B(6,-0.5) C(7,4) D(1,3.5) O(3.14,1.79)\nABCDA AC BD`,
        r`Tứ giác lồi \(ABCD\), \(P = AB + BC + CD + DA\); \(O\) là giao điểm của \(AC\) và \(BD\)`, r`\(\dfrac{P}{2} < AC + BD < P\)`,
        'Chia tứ giác thành các tam giác: dùng bất đẳng thức tam giác cho bốn tam giác có đỉnh \\(O\\) (vế trái) và bốn tam giác tạo bởi một đường chéo với hai cạnh (vế phải).',
        'Bất đẳng thức tam giác; trong tứ giác lồi hai đường chéo cắt nhau.',
        [r`Gọi \(O\) là giao điểm hai đường chéo. Trong các tam giác \(OAB\), \(OBC\), \(OCD\), \(ODA\): \(OA + OB > AB\), \(OB + OC > BC\), \(OC + OD > CD\), \(OD + OA > DA\).`, r`Cộng vế: \(2(OA + OC) + 2(OB + OD) > P\), tức \(2(AC + BD) > P\), nên \(AC + BD > \dfrac{P}{2}\).`, r`Trong các tam giác \(ABC\), \(ADC\), \(ABD\), \(CBD\): \(AC < AB + BC\), \(AC < AD + DC\), \(BD < AB + AD\), \(BD < CB + CD\).`, r`Cộng vế: \(2(AC + BD) < 2P\), nên \(AC + BD < P\).`],
        r`\(\dfrac{P}{2} < AC + BD < P\).`,
        'Bài về bất đẳng thức trong tứ giác: viết bất đẳng thức tam giác cho từng tam giác rồi cộng vế.'),
    ],
  },
  notes: {
    'tinh-so-do-goc-tu-giac': 'Đặt ẩn cho góc chưa biết, lập đẳng thức tổng bốn góc bằng \\(360^\\circ\\); khi có tia phân giác, xét tam giác chứa góc cần tìm.',
    'canh-goc-duong-cheo-tu-giac': 'Kẻ đường chéo để chia tứ giác thành tam giác; với bất đẳng thức, viết đủ các bất đẳng thức tam giác rồi cộng vế.',
  },
};

const BAI_11: LessonContent = {
  slug: 'bai-11-hinh-thang-can',
  applications: r`- Mặt cắt của con đê, lòng mương, chân bàn ghế, mái nhà thường có dạng hình thang cân.
- Tính diện tích mảnh đất, tấm kính hình thang: \(S = \dfrac{(a + b)h}{2}\).
- Thiết kế đối xứng (cửa sổ, logo) dựa vào tính đối xứng của hình thang cân.`,
  theory: [
    th('definition', 'Hình thang', r`**Hình thang** là tứ giác có hai cạnh đối song song. Hai cạnh song song gọi là hai **đáy**, hai cạnh còn lại là hai **cạnh bên**. Đoạn vuông góc kẻ từ một đỉnh đến đáy đối diện là **đường cao**.`),
    th('property', 'Góc của hình thang', r`Trong hình thang \(ABCD\) (\(AB \parallel CD\)), hai góc kề một cạnh bên bù nhau.`, r`\widehat{A} + \widehat{D} = 180^\circ,\quad \widehat{B} + \widehat{C} = 180^\circ`),
    th('definition', 'Hình thang vuông, hình thang cân', r`- **Hình thang vuông** là hình thang có một góc vuông.
- **Hình thang cân** là hình thang có hai góc kề một đáy bằng nhau.`),
    th('theorem', 'Tính chất của hình thang cân', r`Trong hình thang cân:
- Hai góc kề một đáy bằng nhau.
- Hai cạnh bên bằng nhau.
- Hai đường chéo bằng nhau.`, r`AD = BC,\quad AC = BD`),
    th('condition', 'Dấu hiệu nhận biết hình thang cân', r`- Hình thang có hai góc kề một đáy bằng nhau là hình thang cân.
- Hình thang có hai đường chéo bằng nhau là hình thang cân.`),
    th('note', 'Lưu ý', r`Hình thang có hai cạnh bên bằng nhau **chưa chắc** là hình thang cân (có thể là hình bình hành). Muốn chứng minh hình thang cân, dùng góc kề đáy hoặc đường chéo.`),
    th('special', 'Trường hợp đặc biệt', r`- Hình thang có hai cạnh bên song song thì hai cạnh bên bằng nhau và hai đáy bằng nhau.
- Hình thang có hai đáy bằng nhau thì hai cạnh bên song song và bằng nhau.`),
  ],
  formulas: [
    {
      group: 'Góc và cạnh',
      items: [
        fc('Hai góc kề cạnh bên bù nhau', r`\widehat{A} + \widehat{D} = 180^\circ`, r`- \(ABCD\) là hình thang, \(AB \parallel CD\)`, r`\(\widehat{A} = 110^\circ\) thì \(\widehat{D} = 70^\circ\).`),
        fc('Hình thang cân', r`\widehat{C} = \widehat{D},\ \widehat{A} = \widehat{B},\ AD = BC,\ AC = BD`, r`- \(ABCD\) là hình thang cân, đáy \(AB\), \(CD\)`, r`\(\widehat{D} = 65^\circ\) thì \(\widehat{C} = 65^\circ\), \(\widehat{A} = \widehat{B} = 115^\circ\).`),
      ],
    },
    {
      group: 'Diện tích',
      items: [
        fc('Diện tích hình thang', r`S = \dfrac{(a + b)\,h}{2}`, r`- \(a, b\): độ dài hai đáy
- \(h\): chiều cao`, r`\(a = 4\), \(b = 10\), \(h = 3\): \(S = \dfrac{14\cdot3}{2} = 21\).`, 'Cùng đơn vị đo.'),
      ],
    },
  ],
  examples: {
    'tinh-goc-canh-hinh-thang': [
      gx(1, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 110^\circ\), \(\widehat{B} = 125^\circ\). Tính \(\widehat{C}\), \(\widehat{D}\).`,
        `A(2,3) B(6,3) C(8,0) D(0,0)\nABCDA`,
        r`Hình thang \(ABCD\), \(AB \parallel CD\); \(\widehat{A} = 110^\circ\), \(\widehat{B} = 125^\circ\)`, r`\(\widehat{C}, \widehat{D} = ?\)`,
        'Hai góc kề một cạnh bên của hình thang bù nhau.',
        'Góc trong cùng phía tạo bởi hai đường thẳng song song.',
        [r`\(AB \parallel CD\) nên \(\widehat{A} + \widehat{D} = 180^\circ\), suy ra \(\widehat{D} = 70^\circ\).`, r`Tương tự \(\widehat{B} + \widehat{C} = 180^\circ\), suy ra \(\widehat{C} = 55^\circ\).`],
        r`\(\widehat{C} = 55^\circ\), \(\widehat{D} = 70^\circ\).`),
      gx(2, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 2\widehat{D}\). Tính các góc của hình thang.`,
        `A(2,3.46) B(6,3.46) C(8,0) D(0,0)\nABCDA`,
        r`Hình thang cân \(ABCD\), \(AB \parallel CD\); \(\widehat{A} = 2\widehat{D}\)`, r`Tính \(\widehat{A}, \widehat{B}, \widehat{C}, \widehat{D}\)`,
        'Kết hợp: hai góc kề cạnh bên bù nhau và hai góc kề một đáy bằng nhau.',
        'Góc của hình thang; tính chất hình thang cân.',
        [r`\(\widehat{A} + \widehat{D} = 180^\circ\) và \(\widehat{A} = 2\widehat{D}\) nên \(3\widehat{D} = 180^\circ\), \(\widehat{D} = 60^\circ\), \(\widehat{A} = 120^\circ\).`, r`Hình thang cân: \(\widehat{C} = \widehat{D} = 60^\circ\), \(\widehat{B} = \widehat{A} = 120^\circ\).`],
        r`\(\widehat{A} = \widehat{B} = 120^\circ\), \(\widehat{C} = \widehat{D} = 60^\circ\).`),
      gx(3, r`Hình thang cân \(ABCD\) có đáy nhỏ \(AB = 4\) cm, đáy lớn \(CD = 10\) cm và \(\widehat{D} = 45^\circ\). Tính đường cao \(AH\) và diện tích hình thang.`,
        `A(3,3) B(7,3) C(10,0) D(0,0) H(3,0) K(7,0)\nABCDA AH:dash BK:dash\nvuong(A,H,D) vuong(B,K,C)`,
        r`Hình thang cân \(ABCD\), \(AB = 4\) cm, \(CD = 10\) cm, \(\widehat{D} = 45^\circ\); \(AH \perp CD\), \(BK \perp CD\)`, r`\(AH = ?\); \(S_{ABCD} = ?\)`,
        r`Kẻ hai đường cao \(AH\), \(BK\): \(ABKH\) là hình chữ nhật, hai tam giác vuông hai bên bằng nhau nên \(DH = KC\).`,
        'Tính chất hình thang cân; tam giác vuông cân; diện tích hình thang.',
        [r`\(\triangle ADH = \triangle BCK\) (cạnh huyền \(AD = BC\), góc nhọn \(\widehat{D} = \widehat{C}\)) nên \(DH = CK\).`, r`\(HK = AB = 4\) nên \(DH = \dfrac{10 - 4}{2} = 3\) cm.`, r`\(\triangle ADH\) vuông tại \(H\) có \(\widehat{D} = 45^\circ\) nên vuông cân: \(AH = DH = 3\) cm.`, r`\(S = \dfrac{(4 + 10)\cdot3}{2} = 21\) (cm²).`],
        r`\(AH = 3\) cm; \(S = 21\) cm².`,
        'Với hình thang cân, hạ hai đường cao từ hai đỉnh đáy nhỏ là cách làm quen thuộc.'),
    ],
    'chung-minh-doan-thang-goc-bang-nhau-hinh-thang-can': [
      gx(3, r`Cho hình thang cân \(ABCD\) (\(AB \parallel CD\)), hai đường chéo cắt nhau tại \(O\). Chứng minh \(\widehat{ACD} = \widehat{BDC}\) và \(OC = OD\).`,
        `A(2,3) B(6,3) C(8,0) D(0,0) O(4,2)\nABCDA AC BD`,
        r`Hình thang cân \(ABCD\), \(AB \parallel CD\); \(O = AC \cap BD\)`, r`\(\widehat{ACD} = \widehat{BDC}\); \(OC = OD\)`,
        r`Hai góc cần chứng minh là hai góc tương ứng của \(\triangle ADC\) và \(\triangle BCD\).`,
        'Tính chất hình thang cân; trường hợp bằng nhau c.g.c; tam giác cân.',
        [r`Xét \(\triangle ADC\) và \(\triangle BCD\): \(AD = BC\) (cạnh bên hình thang cân), \(\widehat{ADC} = \widehat{BCD}\) (góc kề đáy), \(DC\) chung.`, r`Do đó \(\triangle ADC = \triangle BCD\) (c.g.c), suy ra \(\widehat{ACD} = \widehat{BDC}\).`, r`Tam giác \(OCD\) có \(\widehat{OCD} = \widehat{ODC}\) nên cân tại \(O\), do đó \(OC = OD\).`],
        r`\(\widehat{ACD} = \widehat{BDC}\) và \(OC = OD\).`,
        'Từ \\(OC = OD\\) và \\(AC = BD\\) suy ra thêm \\(OA = OB\\).'),
      gx(4, r`Cho hình thang cân \(ABCD\) (\(AB \parallel CD\), \(AB < CD\)). Gọi \(E\) là giao điểm của các đường thẳng \(AD\) và \(BC\), \(O\) là giao điểm hai đường chéo, \(M\) là trung điểm của \(CD\). Chứng minh ba điểm \(E\), \(O\), \(M\) thẳng hàng.`,
        `A(2,3) B(6,3) C(8,0) D(0,0) O(4,2) E(4,6) M(4,0)\nDC DE CE AB AC BD EM:dash`,
        r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)); \(E = AD \cap BC\); \(O = AC \cap BD\); \(MC = MD\)`, r`\(E, O, M\) thẳng hàng`,
        r`Chứng minh cả ba điểm cùng nằm trên đường trung trực của \(CD\): mỗi điểm cách đều \(C\) và \(D\).`,
        'Tính chất hình thang cân; tam giác cân; đường trung trực của đoạn thẳng.',
        [r`\(\widehat{EDC} = \widehat{ECD}\) (hai góc kề đáy \(CD\)) nên \(\triangle EDC\) cân tại \(E\): \(ED = EC\).`, r`Theo ví dụ trước, \(OC = OD\).`, r`\(MC = MD\) (\(M\) là trung điểm của \(CD\)).`, r`Ba điểm \(E\), \(O\), \(M\) cách đều \(C\) và \(D\) nên cùng nằm trên đường trung trực của \(CD\). Vậy chúng thẳng hàng.`],
        r`\(E\), \(O\), \(M\) thẳng hàng (cùng nằm trên trục đối xứng của hình thang cân).`,
        'Chứng minh thẳng hàng: chỉ ra các điểm cùng thuộc một đường thẳng đặc biệt (trung trực, phân giác…).'),
    ],
    'chung-minh-hinh-thang-can': [
      gx(2, r`Cho tam giác \(ABC\) cân tại \(A\). Một đường thẳng song song với \(BC\) cắt \(AB\), \(AC\) lần lượt tại \(D\), \(E\). Chứng minh \(BDEC\) là hình thang cân.`,
        `A(0,6) B(-4,0) C(4,0) D(-2,3) E(2,3)\nABCA DE`,
        r`\(\triangle ABC\) cân tại \(A\); \(D \in AB\), \(E \in AC\), \(DE \parallel BC\)`, r`\(BDEC\) là hình thang cân`,
        'Chứng minh là hình thang trước (có cặp cạnh song song), rồi chỉ ra hai góc kề một đáy bằng nhau.',
        'Định nghĩa hình thang, hình thang cân; tam giác cân.',
        [r`\(DE \parallel BC\) nên \(BDEC\) là hình thang (đáy \(DE\), \(BC\)).`, r`\(\triangle ABC\) cân tại \(A\) nên \(\widehat{B} = \widehat{C}\).`, r`Hình thang \(BDEC\) có hai góc kề đáy \(BC\) bằng nhau nên là hình thang cân.`],
        r`\(BDEC\) là hình thang cân.`),
      gx(3, r`Cho tam giác \(ABC\) cân tại \(A\), các đường phân giác \(BD\), \(CE\) (\(D \in AC\), \(E \in AB\)). Chứng minh \(BEDC\) là hình thang cân có \(ED = EB\).`,
        `A(0,6) B(-4,0) C(4,0) D(1.9,3.16) E(-1.9,3.16)\nABCA BD CE ED`,
        r`\(\triangle ABC\) cân tại \(A\); \(BD\), \(CE\) là phân giác`, r`\(BEDC\) là hình thang cân; \(ED = EB\)`,
        r`Cần \(ED \parallel BC\): chứng minh \(AD = AE\) để \(\triangle ADE\) cân, khi đó \(\widehat{AED} = \widehat{ABC}\) (đồng vị).`,
        'Trường hợp bằng nhau g.c.g; tam giác cân; góc đồng vị, so le trong; dấu hiệu hình thang cân.',
        [r`\(\triangle ABD = \triangle ACE\) (g.c.g): \(\widehat{A}\) chung, \(AB = AC\), \(\widehat{ABD} = \widehat{ACE} = \dfrac{\widehat{B}}{2}\). Suy ra \(AD = AE\).`, r`\(\triangle ADE\) cân tại \(A\) nên \(\widehat{AED} = \dfrac{180^\circ - \widehat{A}}{2} = \widehat{ABC}\). Hai góc này ở vị trí đồng vị nên \(ED \parallel BC\).`, r`Hình thang \(BEDC\) có \(\widehat{B} = \widehat{C}\) nên là hình thang cân.`, r`\(\widehat{EDB} = \widehat{DBC}\) (so le trong) \(= \widehat{EBD}\) nên \(\triangle EBD\) cân tại \(E\): \(ED = EB\).`],
        r`\(BEDC\) là hình thang cân và \(ED = EB\).`,
        'Phân giác cùng với song song thường tạo ra tam giác cân.'),
    ],
  },
  notes: {
    'tinh-goc-canh-hinh-thang': 'Xác định đúng hai đáy; dùng "hai góc kề cạnh bên bù nhau" cho mọi hình thang, "hai góc kề đáy bằng nhau" chỉ cho hình thang cân.',
    'chung-minh-doan-thang-goc-bang-nhau-hinh-thang-can': 'Tìm hai tam giác chứa hai đoạn (hai góc) cần chứng minh, dùng cạnh bên, đường chéo, góc kề đáy bằng nhau.',
    'chung-minh-hinh-thang-can': 'Hai bước: chứng minh hình thang (cặp cạnh song song), rồi dùng một trong hai dấu hiệu (góc kề đáy hoặc đường chéo).',
  },
};

const BAI_12: LessonContent = {
  slug: 'bai-12-hinh-binh-hanh',
  applications: r`- Cơ cấu hình bình hành giữ mặt phẳng luôn song song: giá treo đèn, cầu nâng, thước kẻ song song, cửa xếp.
- Tìm trung điểm, kiểm tra thẳng hàng nhờ tính chất đường chéo.
- Tính diện tích mảnh đất hình bình hành: \(S = a\cdot h\).`,
  theory: [
    th('definition', 'Hình bình hành', r`**Hình bình hành** là tứ giác có các cạnh đối song song.`, r`AB \parallel CD,\quad AD \parallel BC`),
    th('theorem', 'Tính chất của hình bình hành', r`Trong hình bình hành:
- Các cạnh đối bằng nhau.
- Các góc đối bằng nhau.
- Hai đường chéo cắt nhau tại trung điểm của mỗi đường.`, r`AB = CD,\ AD = BC;\ \widehat{A} = \widehat{C},\ \widehat{B} = \widehat{D};\ OA = OC,\ OB = OD`),
    th('property', 'Hai góc kề một cạnh', r`Hai góc kề một cạnh của hình bình hành bù nhau (vì là hình thang).`, r`\widehat{A} + \widehat{B} = 180^\circ`),
    th('condition', 'Dấu hiệu nhận biết hình bình hành', r`- Tứ giác có các cạnh đối song song.
- Tứ giác có các cạnh đối bằng nhau.
- Tứ giác có hai cạnh đối song song và bằng nhau.
- Tứ giác có các góc đối bằng nhau.
- Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường.`),
    th('special', 'Trường hợp đặc biệt', r`- Hình thang có hai cạnh bên song song là hình bình hành.
- Giao điểm \(O\) của hai đường chéo là **tâm đối xứng** của hình bình hành: mọi đường thẳng qua \(O\) cắt hai cạnh đối tại hai điểm đối xứng qua \(O\).`),
    th('note', 'Lưu ý', r`Tứ giác có hai cạnh đối song song, hai cạnh kia bằng nhau **chưa chắc** là hình bình hành (có thể là hình thang cân). Dấu hiệu "song song và bằng nhau" phải nói về **cùng một cặp** cạnh đối.`),
  ],
  formulas: [
    {
      group: 'Tính chất',
      items: [
        fc('Cạnh đối, góc đối', r`AB = CD,\ AD = BC,\ \widehat{A} = \widehat{C},\ \widehat{B} = \widehat{D}`, r`- \(ABCD\) là hình bình hành`, r`\(\widehat{A} = 65^\circ\) thì \(\widehat{C} = 65^\circ\), \(\widehat{B} = \widehat{D} = 115^\circ\).`),
        fc('Đường chéo', r`OA = OC = \dfrac{AC}{2},\quad OB = OD = \dfrac{BD}{2}`, r`- \(O\): giao điểm hai đường chéo`, r`\(AC = 12\), \(BD = 8\) thì \(OA = 6\), \(OB = 4\).`),
      ],
    },
    {
      group: 'Chu vi, diện tích',
      items: [
        fc('Chu vi hình bình hành', r`P = 2(a + b)`, r`- \(a, b\): hai cạnh kề`, r`\(a = 9\), \(b = 6\): \(P = 30\).`),
        fc('Diện tích hình bình hành', r`S = a\cdot h`, r`- \(a\): một cạnh (đáy)
- \(h\): chiều cao ứng với cạnh đó`, r`\(a = 8\), \(h = 5\): \(S = 40\).`),
      ],
    },
  ],
  examples: {
    'tinh-goc-canh-hinh-binh-hanh': [
      gx(1, r`Hình bình hành \(ABCD\) có \(\widehat{A} = 65^\circ\). Tính các góc còn lại.`,
        `A(0,0) B(5,0) C(7,3) D(2,3)\nABCDA`,
        r`Hình bình hành \(ABCD\); \(\widehat{A} = 65^\circ\)`, r`\(\widehat{B}, \widehat{C}, \widehat{D} = ?\)`,
        'Dùng góc đối bằng nhau và hai góc kề một cạnh bù nhau.',
        'Tính chất góc của hình bình hành.',
        [r`\(\widehat{C} = \widehat{A} = 65^\circ\) (góc đối).`, r`\(\widehat{B} = 180^\circ - 65^\circ = 115^\circ\) (kề cạnh \(AB\)); \(\widehat{D} = \widehat{B} = 115^\circ\).`],
        r`\(\widehat{C} = 65^\circ\); \(\widehat{B} = \widehat{D} = 115^\circ\).`),
      gx(2, r`Hình bình hành \(ABCD\) có chu vi 30 cm và \(AB - AD = 3\) cm. Hai đường chéo \(AC = 12\) cm, \(BD = 8\) cm cắt nhau tại \(O\). Tính \(AB\), \(AD\), \(OA\), \(OB\).`,
        `A(0,0) B(5,0) C(7,3) D(2,3) O(3.5,1.5)\nABCDA AC BD`,
        r`Hình bình hành \(ABCD\), chu vi 30 cm, \(AB - AD = 3\) cm, \(AC = 12\) cm, \(BD = 8\) cm`, r`\(AB, AD, OA, OB = ?\)`,
        'Chu vi cho tổng hai cạnh kề; kết hợp với hiệu để tìm từng cạnh. Đường chéo bị chia đôi tại \\(O\\).',
        'Cạnh đối bằng nhau; hai đường chéo cắt nhau tại trung điểm mỗi đường.',
        [r`Chu vi \(= 2(AB + AD) = 30\) nên \(AB + AD = 15\).`, r`Kết hợp \(AB - AD = 3\): \(AB = 9\) cm, \(AD = 6\) cm.`, r`\(OA = \dfrac{AC}{2} = 6\) cm; \(OB = \dfrac{BD}{2} = 4\) cm.`],
        r`\(AB = 9\) cm, \(AD = 6\) cm, \(OA = 6\) cm, \(OB = 4\) cm.`),
    ],
    'dung-tinh-chat-hinh-binh-hanh': [
      gx(2, r`Cho hình bình hành \(ABCD\). Kẻ \(AH \perp BD\), \(CK \perp BD\) (\(H, K \in BD\)). Chứng minh \(AH = CK\).`,
        `A(0,0) B(4,0) C(6,3) D(2,3) H(2.77,1.85) K(3.23,1.15)\nABCDA BD AH CK\nvuong(A,H,B) vuong(C,K,D)`,
        r`Hình bình hành \(ABCD\); \(AH \perp BD\), \(CK \perp BD\)`, r`\(AH = CK\)`,
        r`\(AH\), \(CK\) là cạnh của hai tam giác vuông \(ABH\), \(CDK\); chúng có cạnh huyền bằng nhau và một góc nhọn bằng nhau.`,
        'Tính chất hình bình hành; góc so le trong; trường hợp bằng nhau cạnh huyền – góc nhọn.',
        [r`\(AB = CD\) (cạnh đối hình bình hành) và \(AB \parallel CD\) nên \(\widehat{ABH} = \widehat{CDK}\) (so le trong).`, r`\(\triangle ABH\) và \(\triangle CDK\) vuông tại \(H\), \(K\) có cạnh huyền \(AB = CD\) và góc nhọn bằng nhau nên bằng nhau.`, r`Suy ra \(AH = CK\).`],
        r`\(AH = CK\).`),
      gx(3, r`Cho hình bình hành \(ABCD\). Gọi \(E\), \(F\) lần lượt là trung điểm của \(AB\), \(CD\). Chứng minh \(DE = BF\) và \(DE \parallel BF\).`,
        `A(0,0) B(6,0) C(8,3) D(2,3) E(3,0) F(5,3)\nABCDA DE BF`,
        r`Hình bình hành \(ABCD\); \(EA = EB\), \(FC = FD\)`, r`\(DE = BF\); \(DE \parallel BF\)`,
        r`Chứng minh \(DEBF\) là hình bình hành: có cặp cạnh \(EB\), \(DF\) song song và bằng nhau.`,
        'Tính chất và dấu hiệu nhận biết hình bình hành.',
        [r`\(EB = \dfrac{AB}{2}\), \(DF = \dfrac{CD}{2}\) mà \(AB = CD\) nên \(EB = DF\).`, r`\(EB \parallel DF\) (vì \(AB \parallel CD\)).`, r`Tứ giác \(DEBF\) có hai cạnh đối \(EB\), \(DF\) song song và bằng nhau nên là hình bình hành.`, r`Do đó \(DE = BF\) và \(DE \parallel BF\).`],
        r`\(DE = BF\) và \(DE \parallel BF\).`,
        'Muốn chứng minh hai đoạn vừa song song vừa bằng nhau, hãy chứng minh chúng là hai cạnh đối của một hình bình hành.'),
    ],
    'chung-minh-hinh-binh-hanh': [
      gx(2, r`Cho tam giác \(ABC\), \(M\) là trung điểm của \(BC\). Lấy điểm \(D\) sao cho \(M\) là trung điểm của \(AD\). Chứng minh \(ABDC\) là hình bình hành.`,
        `A(1,4) B(0,0) C(5,0) M(2.5,0) D(4,-4)\nABCA AD:dash BD DC`,
        r`\(\triangle ABC\); \(MB = MC\); \(MA = MD\)`, r`\(ABDC\) là hình bình hành`,
        r`Hai đoạn \(AD\), \(BC\) là hai đường chéo của tứ giác \(ABDC\) và cắt nhau tại trung điểm \(M\) của mỗi đường.`,
        'Dấu hiệu: hai đường chéo cắt nhau tại trung điểm của mỗi đường.',
        [r`Tứ giác \(ABDC\) có hai đường chéo \(AD\) và \(BC\) cắt nhau tại \(M\).`, r`\(M\) là trung điểm của \(BC\) và của \(AD\).`, r`Vậy \(ABDC\) là hình bình hành.`],
        r`\(ABDC\) là hình bình hành.`),
      gx(3, r`Cho hình bình hành \(ABCD\), \(O\) là giao điểm hai đường chéo. Trên đường chéo \(AC\) lấy hai điểm \(E\), \(F\) sao cho \(AE = CF\) (\(E\) nằm giữa \(A\) và \(O\)). Chứng minh \(BEDF\) là hình bình hành.`,
        `A(0,0) B(6,0) C(8,4) D(2,4) O(4,2) E(1.6,0.8) F(6.4,3.2)\nABCDA AC BD BEDFB`,
        r`Hình bình hành \(ABCD\), \(O = AC \cap BD\); \(E, F \in AC\), \(AE = CF\)`, r`\(BEDF\) là hình bình hành`,
        r`Tứ giác \(BEDF\) có hai đường chéo \(EF\) và \(BD\) cùng đi qua \(O\); cần \(OE = OF\).`,
        'Tính chất đường chéo hình bình hành; dấu hiệu nhận biết hình bình hành.',
        [r`\(O\) là trung điểm của \(AC\) và \(BD\): \(OA = OC\), \(OB = OD\).`, r`\(OE = OA - AE\), \(OF = OC - CF\) mà \(OA = OC\), \(AE = CF\) nên \(OE = OF\).`, r`Tứ giác \(BEDF\) có hai đường chéo \(BD\), \(EF\) cắt nhau tại trung điểm \(O\) của mỗi đường nên là hình bình hành.`],
        r`\(BEDF\) là hình bình hành.`),
    ],
    'thang-hang-dong-quy-hinh-binh-hanh': [
      gx(3, r`Cho hình bình hành \(ABCD\), \(O\) là giao điểm hai đường chéo. Gọi \(M\), \(N\) lần lượt là trung điểm của \(AD\), \(BC\). Chứng minh ba điểm \(M\), \(O\), \(N\) thẳng hàng.`,
        `A(0,0) B(6,0) C(8,3) D(2,3) O(4,1.5) M(1,1.5) N(7,1.5)\nABCDA AC BD AN CM MN:dash`,
        r`Hình bình hành \(ABCD\), \(O = AC \cap BD\); \(MA = MD\), \(NB = NC\)`, r`\(M, O, N\) thẳng hàng`,
        r`Tìm một hình bình hành nhận \(AC\) và \(MN\) làm hai đường chéo: khi đó \(MN\) đi qua trung điểm \(O\) của \(AC\).`,
        'Dấu hiệu hình bình hành; hai đường chéo cắt nhau tại trung điểm mỗi đường; một đoạn thẳng chỉ có một trung điểm.',
        [r`\(AM = \dfrac{AD}{2}\), \(NC = \dfrac{BC}{2}\) mà \(AD = BC\) nên \(AM = NC\); lại có \(AM \parallel NC\).`, r`Tứ giác \(AMCN\) có \(AM\), \(NC\) song song và bằng nhau nên là hình bình hành.`, r`Hai đường chéo \(AC\), \(MN\) của nó cắt nhau tại trung điểm của \(AC\), chính là \(O\).`, r`Vậy \(MN\) đi qua \(O\): \(M\), \(O\), \(N\) thẳng hàng.`],
        r`\(M\), \(O\), \(N\) thẳng hàng.`,
        'Chứng minh thẳng hàng: chỉ ra đoạn thẳng nối hai điểm đi qua trung điểm đã biết.'),
      gx(4, r`Cho hình bình hành \(ABCD\). Gọi \(E\), \(F\) lần lượt là trung điểm của \(AB\), \(CD\); \(M\) là giao điểm của \(AF\) và \(DE\); \(N\) là giao điểm của \(BF\) và \(CE\). Chứng minh ba đường thẳng \(AC\), \(EF\), \(MN\) đồng quy.`,
        `A(0,0) B(8,0) C(10,4) D(2,4) E(4,0) F(6,4) M(3,2) N(7,2) I(5,2)\nABCDA AF DE BF CE AC:dash EF MN:dash`,
        r`Hình bình hành \(ABCD\); \(E\), \(F\) là trung điểm của \(AB\), \(CD\); \(M = AF \cap DE\), \(N = BF \cap CE\)`, r`\(AC\), \(EF\), \(MN\) đồng quy`,
        r`Ba đoạn \(AC\), \(EF\), \(MN\) cùng đi qua trung điểm \(I\) của \(EF\) nếu \(AECF\) và \(EMFN\) đều là hình bình hành.`,
        'Dấu hiệu, tính chất hình bình hành; ba đường thẳng đồng quy khi cùng đi qua một điểm.',
        [r`\(AE = CF\), \(AE \parallel CF\) nên \(AECF\) là hình bình hành, suy ra \(AF \parallel CE\).`, r`Tương tự \(EB = DF\), \(EB \parallel DF\) nên \(EBFD\) là hình bình hành, suy ra \(DE \parallel BF\).`, r`Tứ giác \(EMFN\) có \(EM \parallel NF\) và \(MF \parallel EN\) nên là hình bình hành. Hai đường chéo \(EF\), \(MN\) cắt nhau tại trung điểm \(I\) của \(EF\).`, r`Hai đường chéo \(AC\), \(EF\) của hình bình hành \(AECF\) cũng cắt nhau tại trung điểm \(I\) của \(EF\).`, r`Vậy \(AC\), \(EF\), \(MN\) cùng đi qua \(I\): ba đường thẳng đồng quy.`],
        r`Ba đường thẳng \(AC\), \(EF\), \(MN\) đồng quy tại trung điểm của \(EF\).`,
        'Chứng minh đồng quy: tìm một điểm chung (thường là trung điểm) mà cả ba đường cùng đi qua.'),
    ],
  },
  notes: {
    'tinh-goc-canh-hinh-binh-hanh': 'Góc đối bằng nhau, hai góc kề một cạnh bù nhau; chu vi bằng hai lần tổng hai cạnh kề.',
    'dung-tinh-chat-hinh-binh-hanh': 'Dùng cạnh đối bằng nhau, song song (tạo góc so le trong) để chứng minh các tam giác bằng nhau.',
    'chung-minh-hinh-binh-hanh': 'Chọn dấu hiệu phù hợp với giả thiết: có trung điểm → dùng đường chéo; có song song và bằng nhau → dùng một cặp cạnh đối.',
    'thang-hang-dong-quy-hinh-binh-hanh': 'Đưa về "đoạn thẳng đi qua trung điểm của đường chéo"; một đoạn thẳng chỉ có một trung điểm.',
  },
};

const BAI_13: LessonContent = {
  slug: 'bai-13-hinh-chu-nhat',
  applications: r`- Thợ xây kiểm tra khung cửa, nền nhà có vuông hay không bằng cách đo hai đường chéo.
- Tính diện tích, chu vi các vật hình chữ nhật: sân, phòng, màn hình.
- Trung tuyến ứng với cạnh huyền giúp xác định tâm đường tròn đi qua ba đỉnh tam giác vuông.`,
  theory: [
    th('definition', 'Hình chữ nhật', r`**Hình chữ nhật** là tứ giác có bốn góc vuông. Hình chữ nhật cũng là một hình bình hành, một hình thang cân.`),
    th('theorem', 'Tính chất của hình chữ nhật', r`Hình chữ nhật có tất cả các tính chất của hình bình hành và hình thang cân. Đặc biệt: **hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường**.`, r`AC = BD,\quad OA = OB = OC = OD`),
    th('condition', 'Dấu hiệu nhận biết hình chữ nhật', r`- Tứ giác có ba góc vuông.
- Hình thang cân có một góc vuông.
- Hình bình hành có một góc vuông.
- Hình bình hành có hai đường chéo bằng nhau.`),
    th('theorem', 'Trung tuyến ứng với cạnh huyền', r`- Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.
- Ngược lại, nếu một tam giác có đường trung tuyến ứng với một cạnh bằng nửa cạnh ấy thì tam giác đó vuông.`, r`\triangle ABC \text{ vuông tại } A,\ MB = MC \Rightarrow AM = \dfrac{BC}{2}`),
    th('special', 'Trường hợp đặc biệt', r`Tam giác vuông có một góc \(30^\circ\): cạnh góc vuông đối diện góc \(30^\circ\) bằng nửa cạnh huyền.`),
    th('note', 'Lưu ý', r`Hình bình hành có hai đường chéo **vuông góc** là hình thoi, không phải hình chữ nhật. Dấu hiệu hình chữ nhật dùng hai đường chéo **bằng nhau**.`),
  ],
  formulas: [
    {
      group: 'Hình chữ nhật',
      items: [
        fc('Đường chéo hình chữ nhật', r`AC = BD,\ OA = OB = OC = OD = \dfrac{AC}{2}`, r`- \(O\): giao điểm hai đường chéo`, r`\(AC = 10\) cm thì \(OA = OB = 5\) cm.`),
        fc('Chu vi, diện tích', r`P = 2(a + b),\quad S = a\cdot b`, r`- \(a, b\): chiều dài, chiều rộng`, r`\(a = 8\), \(b = 5\): \(P = 26\), \(S = 40\).`),
      ],
    },
    {
      group: 'Tam giác vuông',
      items: [
        fc('Trung tuyến ứng với cạnh huyền', r`AM = \dfrac{BC}{2}`, r`- \(\triangle ABC\) vuông tại \(A\)
- \(M\): trung điểm cạnh huyền \(BC\)`, r`\(BC = 13\) cm thì \(AM = 6{,}5\) cm.`),
      ],
    },
  ],
  examples: {
    'chung-minh-hinh-chu-nhat': [
      gx(2, r`Cho tam giác \(ABC\) vuông tại \(A\), \(M\) là một điểm trên cạnh \(BC\). Kẻ \(MD \perp AB\) (\(D \in AB\)), \(ME \perp AC\) (\(E \in AC\)). Chứng minh \(ADME\) là hình chữ nhật.`,
        `A(0,0) B(0,4) C(6,0) M(3,2) D(0,2) E(3,0)\nABCA MD ME\nvuong(B,A,C) vuong(A,D,M) vuong(A,E,M)`,
        r`\(\triangle ABC\) vuông tại \(A\); \(M \in BC\); \(MD \perp AB\), \(ME \perp AC\)`, r`\(ADME\) là hình chữ nhật`,
        'Đếm số góc vuông của tứ giác \\(ADME\\).',
        'Dấu hiệu: tứ giác có ba góc vuông.',
        [r`\(\widehat{DAE} = 90^\circ\) (tam giác vuông tại \(A\)).`, r`\(\widehat{ADM} = 90^\circ\) (\(MD \perp AB\)); \(\widehat{AEM} = 90^\circ\) (\(ME \perp AC\)).`, r`Tứ giác \(ADME\) có ba góc vuông nên là hình chữ nhật.`],
        r`\(ADME\) là hình chữ nhật.`),
      gx(3, r`Cho tam giác \(ABC\) cân tại \(A\), đường cao \(AH\). Gọi \(I\) là trung điểm của \(AC\), \(K\) là điểm đối xứng với \(H\) qua \(I\). Chứng minh \(AHCK\) là hình chữ nhật.`,
        `A(0,5) B(-3,0) C(3,0) H(0,0) I(1.5,2.5) K(3,5)\nABCA AH HK:dash AK CK\nvuong(A,H,C)`,
        r`\(\triangle ABC\) cân tại \(A\), \(AH \perp BC\); \(IA = IC\); \(IH = IK\)`, r`\(AHCK\) là hình chữ nhật`,
        r`\(I\) là trung điểm của hai đoạn \(AC\) và \(HK\) nên \(AHCK\) là hình bình hành; cần thêm một góc vuông.`,
        'Dấu hiệu hình bình hành (đường chéo); dấu hiệu hình chữ nhật (hình bình hành có một góc vuông).',
        [r`Tứ giác \(AHCK\) có hai đường chéo \(AC\), \(HK\) cắt nhau tại trung điểm \(I\) của mỗi đường nên là hình bình hành.`, r`\(AH \perp BC\) nên \(\widehat{AHC} = 90^\circ\).`, r`Hình bình hành \(AHCK\) có một góc vuông nên là hình chữ nhật.`],
        r`\(AHCK\) là hình chữ nhật.`),
    ],
    'dung-tinh-chat-hinh-chu-nhat': [
      gx(2, r`Hình chữ nhật \(ABCD\) có hai đường chéo cắt nhau tại \(O\), \(AC = 10\) cm và \(\widehat{OAB} = 30^\circ\). Tính \(OA\), \(OB\) và \(\widehat{AOB}\).`,
        `A(0,0) B(6,0) C(6,3.46) D(0,3.46) O(3,1.73)\nABCDA AC BD`,
        r`Hình chữ nhật \(ABCD\), \(O = AC \cap BD\), \(AC = 10\) cm, \(\widehat{OAB} = 30^\circ\)`, r`\(OA, OB = ?\); \(\widehat{AOB} = ?\)`,
        'Hai đường chéo bằng nhau và cắt nhau tại trung điểm nên \\(OA = OB\\): tam giác \\(OAB\\) cân.',
        'Tính chất đường chéo hình chữ nhật; tam giác cân.',
        [r`\(OA = OB = \dfrac{AC}{2} = 5\) cm.`, r`\(\triangle OAB\) cân tại \(O\) nên \(\widehat{OBA} = \widehat{OAB} = 30^\circ\).`, r`\(\widehat{AOB} = 180^\circ - 2\cdot30^\circ = 120^\circ\).`],
        r`\(OA = OB = 5\) cm; \(\widehat{AOB} = 120^\circ\).`),
      gx(3, r`Cho hình chữ nhật \(ABCD\). Kẻ \(AH \perp BD\), \(CK \perp BD\) (\(H, K \in BD\)). Chứng minh \(AHCK\) là hình bình hành.`,
        `A(0,0) B(6,0) C(6,4) D(0,4) H(1.85,2.77) K(4.15,1.23)\nABCDA BD AH CK AK:dash CH:dash\nvuong(A,H,B) vuong(C,K,D)`,
        r`Hình chữ nhật \(ABCD\); \(AH \perp BD\), \(CK \perp BD\)`, r`\(AHCK\) là hình bình hành`,
        r`\(AH\) và \(CK\) cùng vuông góc với \(BD\) nên song song; chứng minh thêm \(AH = CK\).`,
        'Quan hệ vuông góc – song song; trường hợp bằng nhau cạnh huyền – góc nhọn; dấu hiệu hình bình hành.',
        [r`\(AH \perp BD\), \(CK \perp BD\) nên \(AH \parallel CK\).`, r`\(\triangle AHD\) và \(\triangle CKB\) vuông tại \(H\), \(K\): \(AD = CB\), \(\widehat{ADH} = \widehat{CBK}\) (so le trong, \(AD \parallel BC\)). Nên \(\triangle AHD = \triangle CKB\), suy ra \(AH = CK\).`, r`Tứ giác \(AHCK\) có \(AH\), \(CK\) song song và bằng nhau nên là hình bình hành.`],
        r`\(AHCK\) là hình bình hành.`),
    ],
    'trung-tuyen-ung-voi-canh-huyen': [
      gx(2, r`Tam giác \(ABC\) vuông tại \(A\) có đường trung tuyến \(AM = 6{,}5\) cm. Tính \(BC\).`,
        `A(0,0) B(0,5) C(12,0) M(6,2.5)\nABCA AM\nvuong(B,A,C)`,
        r`\(\triangle ABC\) vuông tại \(A\); \(MB = MC\); \(AM = 6{,}5\) cm`, r`\(BC = ?\)`,
        'Trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.',
        'Tính chất đường trung tuyến ứng với cạnh huyền.',
        [r`\(AM = \dfrac{BC}{2}\).`, r`\(BC = 2AM = 2\cdot6{,}5 = 13\) (cm).`],
        r`\(BC = 13\) cm.`),
      gx(3, r`Cho tam giác \(ABC\) vuông tại \(A\) có \(\widehat{B} = 60^\circ\), đường trung tuyến \(AM\). Chứng minh tam giác \(AMB\) đều và \(AB = \dfrac{BC}{2}\).`,
        `A(0,0) B(0,3) C(5.2,0) M(2.6,1.5)\nABCA AM\nvuong(B,A,C)`,
        r`\(\triangle ABC\) vuông tại \(A\), \(\widehat{B} = 60^\circ\); \(MB = MC\)`, r`\(\triangle AMB\) đều; \(AB = \dfrac{BC}{2}\)`,
        r`\(MA = MB\) nên tam giác \(AMB\) cân; tam giác cân có một góc \(60^\circ\) là tam giác đều.`,
        'Trung tuyến ứng với cạnh huyền; tam giác cân có một góc 60° là tam giác đều.',
        [r`\(AM = \dfrac{BC}{2} = MB\) nên \(\triangle AMB\) cân tại \(M\).`, r`Tam giác cân \(AMB\) có \(\widehat{B} = 60^\circ\) nên là tam giác đều.`, r`Do đó \(AB = MB = \dfrac{BC}{2}\).`],
        r`\(\triangle AMB\) đều và \(AB = \dfrac{BC}{2}\).`,
        'Đây là tính chất "cạnh góc vuông đối diện góc 30° bằng nửa cạnh huyền" (vì \\(\\widehat{C} = 30^\\circ\\)).'),
      gx(4, r`Cho tam giác nhọn \(ABC\) có các đường cao \(BD\), \(CE\). Gọi \(M\), \(N\) lần lượt là trung điểm của \(BC\), \(DE\). Chứng minh \(MN \perp DE\).`,
        `A(2,6) B(0,0) C(8,0) D(4,4) E(0.8,2.4) M(4,0) N(2.4,3.2)\nABCA BD CE DE MD:dash ME:dash MN\nvuong(B,D,C) vuong(C,E,B)`,
        r`\(\triangle ABC\) nhọn; \(BD \perp AC\), \(CE \perp AB\); \(MB = MC\); \(ND = NE\)`, r`\(MN \perp DE\)`,
        r`\(M\) là trung điểm cạnh huyền chung của hai tam giác vuông \(BDC\), \(BEC\); từ đó \(MD = ME\) và \(MN\) là trung tuyến của tam giác cân \(MDE\).`,
        'Trung tuyến ứng với cạnh huyền; trong tam giác cân, đường trung tuyến ứng với cạnh đáy đồng thời là đường cao.',
        [r`\(\triangle BDC\) vuông tại \(D\), \(DM\) là trung tuyến nên \(MD = \dfrac{BC}{2}\).`, r`\(\triangle BEC\) vuông tại \(E\), \(EM\) là trung tuyến nên \(ME = \dfrac{BC}{2}\).`, r`Suy ra \(MD = ME\): \(\triangle MDE\) cân tại \(M\).`, r`\(MN\) là trung tuyến ứng với đáy \(DE\) nên cũng là đường cao: \(MN \perp DE\).`],
        r`\(MN \perp DE\).`,
        'Khi thấy nhiều góc vuông chung một cạnh huyền, hãy nghĩ đến trung điểm cạnh huyền.'),
    ],
  },
  notes: {
    'chung-minh-hinh-chu-nhat': 'Đã có hình bình hành thì chỉ cần thêm một góc vuông hoặc hai đường chéo bằng nhau; chưa có thì đếm đủ ba góc vuông.',
    'dung-tinh-chat-hinh-chu-nhat': 'Bốn đoạn \\(OA, OB, OC, OD\\) bằng nhau tạo ra các tam giác cân – rất hay dùng để tính góc.',
    'trung-tuyen-ung-voi-canh-huyen': 'Tìm tam giác vuông và trung điểm cạnh huyền; nhiều tam giác vuông chung cạnh huyền thì các đỉnh góc vuông cách đều trung điểm đó.',
  },
};

const BAI_14: LessonContent = {
  slug: 'bai-14-hinh-thoi-va-hinh-vuong',
  applications: r`- Hoa văn gạch lát, mắt lưới, biển báo giao thông hình thoi; ô bàn cờ, gạch men hình vuông.
- Cơ cấu hình thoi trong kích nâng ô tô: hai đường chéo vuông góc giúp nâng thẳng đứng.
- Tính diện tích hình thoi theo hai đường chéo: \(S = \dfrac{d_1d_2}{2}\).`,
  theory: [
    th('definition', 'Hình thoi', r`**Hình thoi** là tứ giác có bốn cạnh bằng nhau. Hình thoi cũng là một hình bình hành.`),
    th('theorem', 'Tính chất của hình thoi', r`Hình thoi có tất cả các tính chất của hình bình hành. Ngoài ra:
- Hai đường chéo vuông góc với nhau.
- Hai đường chéo là các đường phân giác của các góc của hình thoi.`, r`AC \perp BD`),
    th('condition', 'Dấu hiệu nhận biết hình thoi', r`- Tứ giác có bốn cạnh bằng nhau.
- Hình bình hành có hai cạnh kề bằng nhau.
- Hình bình hành có hai đường chéo vuông góc.
- Hình bình hành có một đường chéo là đường phân giác của một góc.`),
    th('definition', 'Hình vuông', r`**Hình vuông** là tứ giác có bốn góc vuông và bốn cạnh bằng nhau. Hình vuông vừa là hình chữ nhật, vừa là hình thoi.`),
    th('condition', 'Dấu hiệu nhận biết hình vuông', r`- Hình chữ nhật có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là phân giác của một góc.
- Hình thoi có một góc vuông, hoặc hai đường chéo bằng nhau.`),
    th('property', 'Sơ đồ quan hệ giữa các tứ giác', r`Mỗi mũi tên ghi điều kiện thêm vào để được tứ giác đặc biệt hơn.

[sodo]
T(1.5,0) Tứ giác
H(1.5,1) Hình thang
C(0,2) Hình thang cân
B(2.5,2) Hình bình hành
N(1.5,3)* Hình chữ nhật
O(3.5,3)* Hình thoi
V(2.5,4)** Hình vuông
T > H : 2 cạnh đối song song
H > C : 2 góc kề đáy bằng nhau
H > B : 2 cạnh bên song song
C > N : 1 góc vuông
B > N : 1 góc vuông
B > O : 2 cạnh kề bằng nhau
N > V : 2 cạnh kề bằng nhau
O > V : 1 góc vuông
[/sodo]`),
    th('note', 'Lưu ý', r`Muốn dùng dấu hiệu "đường chéo vuông góc" hay "đường chéo là phân giác" thì tứ giác phải **là hình bình hành** trước.`),
  ],
  formulas: [
    {
      group: 'Hình thoi',
      items: [
        fc('Chu vi hình thoi', r`P = 4a`, r`- \(a\): độ dài cạnh`, r`\(a = 6\) cm: \(P = 24\) cm.`),
        fc('Diện tích hình thoi', r`S = \dfrac{d_1\,d_2}{2}`, r`- \(d_1, d_2\): độ dài hai đường chéo`, r`\(d_1 = 8\), \(d_2 = 6\): \(S = 24\).`),
      ],
    },
    {
      group: 'Hình vuông',
      items: [
        fc('Chu vi, diện tích hình vuông', r`P = 4a,\quad S = a^2`, r`- \(a\): độ dài cạnh`, r`\(a = 5\) cm: \(P = 20\) cm, \(S = 25\) cm².`),
        fc('Đường chéo hình vuông', r`AC = BD,\ AC \perp BD,\ OA = OB = OC = OD`, r`- \(O\): giao điểm hai đường chéo`, r`Tam giác \(OAB\) vuông cân tại \(O\).`),
      ],
    },
  ],
  examples: {
    'tinh-goc-canh-hinh-thoi': [
      gx(1, r`Hình thoi \(ABCD\) có chu vi 24 cm và \(\widehat{A} = 50^\circ\). Tính độ dài cạnh và các góc của hình thoi.`,
        `A(0,0) B(5,0) C(8.2,3.8) D(3.2,3.8)\nABCDA`,
        r`Hình thoi \(ABCD\), chu vi 24 cm, \(\widehat{A} = 50^\circ\)`, r`Cạnh \(= ?\); \(\widehat{B}, \widehat{C}, \widehat{D} = ?\)`,
        'Hình thoi có bốn cạnh bằng nhau và là hình bình hành.',
        'Định nghĩa, tính chất hình thoi.',
        [r`Cạnh hình thoi: \(24 : 4 = 6\) (cm).`, r`\(\widehat{C} = \widehat{A} = 50^\circ\); \(\widehat{B} = \widehat{D} = 180^\circ - 50^\circ = 130^\circ\).`],
        r`Cạnh 6 cm; \(\widehat{C} = 50^\circ\), \(\widehat{B} = \widehat{D} = 130^\circ\).`),
      gx(2, r`Hình thoi \(ABCD\) có hai đường chéo \(AC = 8\) cm, \(BD = 6\) cm cắt nhau tại \(O\) và \(\widehat{BAC} = 35^\circ\). Tính diện tích hình thoi, \(\widehat{AOB}\) và các góc của hình thoi.`,
        `A(0,3) B(4,6) C(8,3) D(4,0) O(4,3)\nABCDA AC BD\nvuong(A,O,B)`,
        r`Hình thoi \(ABCD\), \(AC = 8\) cm, \(BD = 6\) cm, \(\widehat{BAC} = 35^\circ\)`, r`\(S = ?\); \(\widehat{AOB} = ?\); các góc của hình thoi`,
        'Đường chéo hình thoi vuông góc và là phân giác của các góc.',
        'Tính chất đường chéo hình thoi; diện tích hình thoi.',
        [r`\(S = \dfrac{AC\cdot BD}{2} = \dfrac{8\cdot6}{2} = 24\) (cm²).`, r`\(AC \perp BD\) nên \(\widehat{AOB} = 90^\circ\).`, r`\(AC\) là phân giác góc \(A\): \(\widehat{BAD} = 2\cdot35^\circ = 70^\circ\); \(\widehat{BCD} = 70^\circ\); \(\widehat{ABC} = \widehat{ADC} = 110^\circ\).`],
        r`\(S = 24\) cm²; \(\widehat{AOB} = 90^\circ\); các góc \(70^\circ, 110^\circ, 70^\circ, 110^\circ\).`),
    ],
    'dung-tinh-chat-hinh-thoi-hinh-vuong': [
      gx(2, r`Cho hình vuông \(ABCD\), \(O\) là giao điểm hai đường chéo. Chứng minh tam giác \(OAB\) vuông cân.`,
        `A(0,4) B(4,4) C(4,0) D(0,0) O(2,2)\nABCDA AC BD\nvuong(A,O,B)`,
        r`Hình vuông \(ABCD\); \(O = AC \cap BD\)`, r`\(\triangle OAB\) vuông cân tại \(O\)`,
        'Hình vuông vừa là hình chữ nhật (đường chéo bằng nhau) vừa là hình thoi (đường chéo vuông góc).',
        'Tính chất đường chéo của hình chữ nhật, hình thoi.',
        [r`Hình vuông là hình chữ nhật nên \(OA = OB\).`, r`Hình vuông là hình thoi nên \(AC \perp BD\), tức \(\widehat{AOB} = 90^\circ\).`, r`Vậy \(\triangle OAB\) vuông cân tại \(O\).`],
        r`\(\triangle OAB\) vuông cân tại \(O\).`),
      gx(3, r`Cho hình vuông \(ABCD\). Trên các cạnh \(AB\), \(BC\) lấy \(E\), \(F\) sao cho \(AE = BF\). Chứng minh \(DE = AF\) và \(DE \perp AF\).`,
        `A(0,4) B(4,4) C(4,0) D(0,0) E(1.5,4) F(4,2.5) I(1.32,3.51)\nABCDA DE AF\nvuong(A,I,E)`,
        r`Hình vuông \(ABCD\); \(E \in AB\), \(F \in BC\), \(AE = BF\); \(I = DE \cap AF\)`, r`\(DE = AF\); \(DE \perp AF\)`,
        r`Hai tam giác vuông \(DAE\) và \(ABF\) bằng nhau; từ cặp góc bằng nhau suy ra góc tại \(I\) vuông.`,
        'Tính chất hình vuông; trường hợp bằng nhau c.g.c; tổng hai góc nhọn trong tam giác vuông.',
        [r`\(\triangle DAE\) và \(\triangle ABF\): \(DA = AB\), \(\widehat{DAE} = \widehat{ABF} = 90^\circ\), \(AE = BF\). Nên \(\triangle DAE = \triangle ABF\) (c.g.c), suy ra \(DE = AF\) và \(\widehat{ADE} = \widehat{BAF}\).`, r`Trong \(\triangle DAE\) vuông tại \(A\): \(\widehat{ADE} + \widehat{AED} = 90^\circ\).`, r`Xét \(\triangle AIE\): \(\widehat{IAE} + \widehat{AEI} = \widehat{ADE} + \widehat{AED} = 90^\circ\), nên \(\widehat{AIE} = 90^\circ\).`],
        r`\(DE = AF\) và \(DE \perp AF\).`,
        'Chứng minh vuông góc: tìm tam giác có hai góc nhọn với tổng bằng 90°.'),
    ],
    'chung-minh-hinh-thoi-hinh-vuong': [
      gx(2, r`Cho tam giác \(ABC\) cân tại \(A\), \(M\) là trung điểm của \(BC\). Lấy \(D\) đối xứng với \(A\) qua \(M\). Chứng minh \(ABDC\) là hình thoi.`,
        `A(0,6) B(-3,0) C(3,0) M(0,0) D(0,-6)\nABDCA AD BC`,
        r`\(\triangle ABC\) cân tại \(A\); \(MB = MC\); \(MA = MD\)`, r`\(ABDC\) là hình thoi`,
        'Chứng minh hình bình hành (đường chéo cắt nhau tại trung điểm), sau đó có hai cạnh kề bằng nhau.',
        'Dấu hiệu hình bình hành; dấu hiệu hình thoi.',
        [r`Tứ giác \(ABDC\) có hai đường chéo \(AD\), \(BC\) cắt nhau tại trung điểm \(M\) của mỗi đường nên là hình bình hành.`, r`Hình bình hành \(ABDC\) có hai cạnh kề \(AB = AC\) nên là hình thoi.`],
        r`\(ABDC\) là hình thoi.`),
      gx(3, r`Cho hình chữ nhật \(ABCD\) có \(AB = 2AD\). Gọi \(M\), \(N\) lần lượt là trung điểm của \(AB\), \(CD\). Chứng minh \(AMND\) là hình vuông.`,
        `A(0,3) B(6,3) C(6,0) D(0,0) M(3,3) N(3,0)\nABCDA MN`,
        r`Hình chữ nhật \(ABCD\), \(AB = 2AD\); \(MA = MB\), \(NC = ND\)`, r`\(AMND\) là hình vuông`,
        r`Đi qua các bước: hình bình hành → hình chữ nhật (góc vuông) → hình vuông (hai cạnh kề bằng nhau).`,
        'Dấu hiệu hình bình hành, hình chữ nhật, hình vuông.',
        [r`\(AM = \dfrac{AB}{2}\), \(DN = \dfrac{CD}{2}\), \(AB = CD\), \(AB \parallel CD\) nên \(AM\), \(DN\) song song và bằng nhau: \(AMND\) là hình bình hành.`, r`\(\widehat{A} = 90^\circ\) nên \(AMND\) là hình chữ nhật.`, r`\(AM = \dfrac{AB}{2} = AD\): hình chữ nhật có hai cạnh kề bằng nhau nên \(AMND\) là hình vuông.`],
        r`\(AMND\) là hình vuông.`),
    ],
    'dieu-kien-hinh-thoi-hinh-vuong': [
      gx(3, r`Cho tam giác \(ABC\) vuông tại \(A\), \(M\) là trung điểm của \(BC\). Kẻ \(MD \perp AB\), \(ME \perp AC\) (\(D \in AB\), \(E \in AC\)).
a) Tứ giác \(ADME\) là hình gì?
b) Tam giác \(ABC\) cần thêm điều kiện gì để \(ADME\) là hình vuông?`,
        `A(0,0) B(0,4) C(4,0) M(2,2) D(0,2) E(2,0)\nABCA MD ME AM:dash\nvuong(B,A,C) vuong(A,D,M) vuong(A,E,M)`,
        r`\(\triangle ABC\) vuông tại \(A\); \(MB = MC\); \(MD \perp AB\), \(ME \perp AC\)`, r`a) \(ADME\) là hình gì? b) Điều kiện để \(ADME\) là hình vuông`,
        r`a) Đếm góc vuông. b) Hình chữ nhật là hình vuông khi đường chéo \(AM\) là phân giác góc \(A\); kết hợp \(MA = MB\).`,
        'Dấu hiệu hình chữ nhật, hình vuông; trung tuyến ứng với cạnh huyền.',
        [r`a) \(ADME\) có ba góc vuông (\(\widehat{A}\), \(\widehat{D}\), \(\widehat{E}\)) nên là hình chữ nhật.`, r`b) Hình chữ nhật \(ADME\) là hình vuông khi và chỉ khi đường chéo \(AM\) là phân giác của \(\widehat{DAE}\), tức \(\widehat{BAM} = 45^\circ\).`, r`\(MA = MB = \dfrac{BC}{2}\) nên \(\triangle MAB\) cân tại \(M\): \(\widehat{B} = \widehat{BAM}\).`, r`Do đó \(ADME\) là hình vuông khi và chỉ khi \(\widehat{B} = 45^\circ\), tức \(\triangle ABC\) vuông cân tại \(A\).`],
        r`a) Hình chữ nhật. b) Khi tam giác \(ABC\) vuông cân tại \(A\).`,
        'Bài tìm điều kiện: giả sử hình đã là hình vuông, suy ra điều kiện, rồi kiểm tra điều kiện đó là đủ.'),
      gx(4, r`Cho hình bình hành \(ABCD\) có \(AB = 2AD\). Gọi \(E\), \(F\) lần lượt là trung điểm của \(AB\), \(CD\).
a) Chứng minh \(AEFD\) là hình thoi.
b) Hình bình hành \(ABCD\) cần thêm điều kiện gì để \(AEFD\) là hình vuông?`,
        `A(0,0) B(6,0) C(7.5,2.6) D(1.5,2.6) E(3,0) F(4.5,2.6)\nABCDA EF`,
        r`Hình bình hành \(ABCD\), \(AB = 2AD\); \(EA = EB\), \(FC = FD\)`, r`a) \(AEFD\) là hình thoi; b) Điều kiện để \(AEFD\) là hình vuông`,
        r`a) Hình bình hành có hai cạnh kề bằng nhau. b) Hình thoi là hình vuông khi có một góc vuông.`,
        'Dấu hiệu hình bình hành, hình thoi, hình vuông.',
        [r`a) \(AE = DF\) (nửa hai cạnh đối bằng nhau) và \(AE \parallel DF\) nên \(AEFD\) là hình bình hành.`, r`\(AE = \dfrac{AB}{2} = AD\): hình bình hành có hai cạnh kề bằng nhau nên là hình thoi.`, r`b) Hình thoi \(AEFD\) là hình vuông khi và chỉ khi \(\widehat{DAE} = 90^\circ\).`, r`\(\widehat{DAE} = \widehat{DAB}\) nên điều kiện là \(\widehat{A} = 90^\circ\), tức \(ABCD\) là hình chữ nhật.`],
        r`a) \(AEFD\) là hình thoi. b) Khi \(ABCD\) là hình chữ nhật (có \(AB = 2AD\)).`),
    ],
  },
  notes: {
    'tinh-goc-canh-hinh-thoi': 'Dùng bốn cạnh bằng nhau, đường chéo vuông góc và là phân giác; diện tích hình thoi bằng nửa tích hai đường chéo.',
    'dung-tinh-chat-hinh-thoi-hinh-vuong': 'Hình vuông có đủ tính chất của hình chữ nhật và hình thoi: tận dụng cả cạnh bằng nhau lẫn góc vuông.',
    'chung-minh-hinh-thoi-hinh-vuong': 'Thường đi theo chuỗi: hình bình hành → hình chữ nhật / hình thoi → hình vuông, mỗi bước một dấu hiệu.',
    'dieu-kien-hinh-thoi-hinh-vuong': 'Giả sử tứ giác đã là hình cần tìm, suy ra điều kiện của hình ban đầu; trình bày lại theo chiều thuận.',
  },
};

export const CHUONG_3: LessonContent[] = [BAI_10, BAI_11, BAI_12, BAI_13, BAI_14];
