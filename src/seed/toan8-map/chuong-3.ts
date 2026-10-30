import { es, ge, mcq, r, sa, type MapChapter } from './types';

/** Chương III. Tứ giác – Bài 10 đến Bài 14. */
export const CHUONG_3: MapChapter = {
  code: 'III',
  objectives: `- Mô tả tứ giác, tứ giác lồi; giải thích định lí tổng các góc của tứ giác.
- Giải thích tính chất về cạnh, góc, đường chéo của hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông.
- Nhận biết các tứ giác đặc biệt bằng dấu hiệu; vận dụng giải bài toán chứng minh, tính toán.`,
  keyPoints: `- Tổng các góc của một tứ giác bằng 360°.
- Định nghĩa, tính chất, dấu hiệu nhận biết của hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông.
- Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.`,
  formulas: r`\[\widehat{A} + \widehat{B} + \widehat{C} + \widehat{D} = 360^\circ\]
Tam giác \(ABC\) vuông tại \(A\), \(M\) là trung điểm của \(BC\) thì \(AM = \dfrac{BC}{2}\).`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 1 (VietJack, Hoatieu) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-3a', objectives: 'Củng cố tứ giác, tổng các góc của tứ giác và hình thang cân.' },
    { slug: 'luyen-tap-chung-3b', objectives: 'Củng cố hình bình hành: tính chất, dấu hiệu nhận biết; chứng minh ba điểm thẳng hàng, ba đường thẳng đồng quy.' },
    { slug: 'luyen-tap-chung-3c', objectives: 'Củng cố hình chữ nhật, hình thoi, hình vuông; phân biệt và nhận biết các tứ giác đặc biệt.' },
    { slug: 'bai-tap-cuoi-chuong-3', objectives: 'Ôn tập toàn Chương III: hệ thống định nghĩa, tính chất, dấu hiệu nhận biết các tứ giác đặc biệt; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 10 ----------------
    {
      slug: 'bai-10-tu-giac',
      difficulty: 1,
      objectives: `- Mô tả tứ giác, tứ giác lồi và các yếu tố: đỉnh, cạnh, góc, đường chéo.
- Giải thích định lí tổng các góc trong một tứ giác lồi bằng 360°.
- Vận dụng để tính số đo góc và so sánh các đoạn thẳng trong tứ giác.`,
      prerequisites: '- Tổng ba góc của một tam giác bằng 180° (Toán 7).\n- Bất đẳng thức tam giác (Toán 7).',
      concepts: 'Tứ giác; tứ giác lồi; hai đỉnh kề, hai đỉnh đối; hai cạnh kề, hai cạnh đối; đường chéo; góc ngoài của tứ giác.',
      theorems: r`Tổng các góc của một tứ giác bằng \(360^\circ\).`,
      properties: r`- Tứ giác lồi là tứ giác luôn nằm về một phía của đường thẳng chứa bất kì cạnh nào của nó.
- Góc ngoài và góc trong tại cùng một đỉnh của tứ giác kề bù (tổng bằng \(180^\circ\)).`,
      themes: [
        {
          title: 'Tứ giác và tổng các góc',
          description: 'Tính góc của tứ giác; quan hệ giữa cạnh, góc, đường chéo.',
          types: [
            {
              slug: 'tinh-so-do-goc-tu-giac',
              title: 'Tính số đo góc',
              levels: [1, 2, 3],
              knowledge: r`Tổng các góc của tứ giác bằng \(360^\circ\); góc ngoài và góc trong tại một đỉnh kề bù.`,
              signs: 'Đề cho số đo một số góc (hoặc quan hệ, tỉ lệ giữa các góc, hoặc góc ngoài) và yêu cầu tính các góc còn lại.',
              method: r`Dùng tổng bốn góc bằng \(360^\circ\), kết hợp các quan hệ đã cho để lập đẳng thức rồi tính.`,
              steps: r`- **Bước 1.** Viết \(\widehat{A} + \widehat{B} + \widehat{C} + \widehat{D} = 360^\circ\).
- **Bước 2.** Thay các góc đã biết, biểu diễn góc chưa biết theo quan hệ đề cho (tổng – hiệu, tỉ lệ…).
- **Bước 3.** Tính từng góc và kiểm tra tổng bằng \(360^\circ\).`,
              mistakes: r`- Dùng tổng \(180^\circ\) như với tam giác.
- Nhầm góc ngoài với góc trong tại cùng một đỉnh.`,
              example: r`Tứ giác \(ABCD\) có \(\widehat{A} = 70^\circ\), \(\widehat{B} = 110^\circ\), \(\widehat{C} = \widehat{D} + 40^\circ\). Tính \(\widehat{C}\), \(\widehat{D}\).`,
              solution: r`\(\widehat{C} + \widehat{D} = 360^\circ - 70^\circ - 110^\circ = 180^\circ\) và \(\widehat{C} - \widehat{D} = 40^\circ\).
Do đó \(\widehat{C} = 110^\circ\), \(\widehat{D} = 70^\circ\).`,
              exercises: [
                sa(1, r`Một tứ giác có ba góc lần lượt bằng \(90^\circ\), \(90^\circ\), \(120^\circ\). Góc còn lại bằng bao nhiêu độ?`, ['60'], r`\(360^\circ - 90^\circ - 90^\circ - 120^\circ = 60^\circ\).`, '°'),
                sa(2, r`Tứ giác \(ABCD\) có các góc \(A, B, C, D\) tỉ lệ với \(1; 2; 3; 4\). Tính số đo góc \(D\).`, ['144'], r`Đặt \(\widehat{A} = k\), \(\widehat{B} = 2k\), \(\widehat{C} = 3k\), \(\widehat{D} = 4k\). Ta có \(10k = 360^\circ\), suy ra \(k = 36^\circ\), \(\widehat{D} = 144^\circ\).`, '°'),
                ge(3, r`Cho tứ giác \(ABCD\) như hình vẽ, có \(\widehat{A} = \widehat{C} = 90^\circ\) và \(\widehat{B} = 2\widehat{D}\). Tính \(\widehat{B}\) và \(\widehat{D}\).`, `D(0,0) A(4,0) B(4,1.15) C(1.5,2.6)
ABCDA
vuong(D,A,B) vuong(B,C,D)`, r`\(\widehat{B} + \widehat{D} = 360^\circ - 90^\circ - 90^\circ = 180^\circ\). Mà \(\widehat{B} = 2\widehat{D}\) nên \(3\widehat{D} = 180^\circ\).
Vậy \(\widehat{D} = 60^\circ\), \(\widehat{B} = 120^\circ\).`),
              ],
            },
            {
              slug: 'canh-goc-duong-cheo-tu-giac',
              title: 'Mối liên hệ giữa cạnh, góc và đường chéo của tứ giác',
              levels: [3, 4],
              knowledge: 'Bất đẳng thức tam giác; tổng các góc của tam giác, tứ giác.',
              signs: 'Đề yêu cầu so sánh, chứng minh bất đẳng thức giữa các cạnh, đường chéo, chu vi của tứ giác.',
              method: 'Dùng đường chéo (hoặc giao điểm hai đường chéo) chia tứ giác thành các tam giác, áp dụng bất đẳng thức tam giác rồi cộng vế.',
              steps: `- **Bước 1.** Vẽ hai đường chéo, gọi O là giao điểm (tứ giác lồi).
- **Bước 2.** Viết bất đẳng thức tam giác cho các tam giác thích hợp.
- **Bước 3.** Cộng theo vế và rút gọn để được điều cần chứng minh.`,
              mistakes: '- Áp dụng bất đẳng thức tam giác cho ba điểm thẳng hàng.\n- Cộng vế hai bất đẳng thức ngược chiều.',
              example: r`Cho tứ giác lồi \(ABCD\). Chứng minh tổng hai đường chéo lớn hơn nửa chu vi: \(AC + BD > \dfrac{AB + BC + CD + DA}{2}\).`,
              solution: r`Gọi \(O\) là giao điểm của \(AC\) và \(BD\). Theo bất đẳng thức tam giác: \(OA + OB > AB\); \(OB + OC > BC\); \(OC + OD > CD\); \(OD + OA > DA\).
Cộng vế: \(2(OA + OB + OC + OD) > AB + BC + CD + DA\), tức là \(2(AC + BD) > AB + BC + CD + DA\).`,
              exercises: [
                es(3, r`Cho tứ giác \(ABCD\). Chứng minh \(AC + BD < AB + BC + CD + DA\).`, r`Trong các tam giác \(ABC\), \(ADC\), \(ABD\), \(BCD\): \(AC < AB + BC\); \(AC < AD + DC\); \(BD < BA + AD\); \(BD < BC + CD\).
Cộng vế: \(2(AC + BD) < 2(AB + BC + CD + DA)\), suy ra điều phải chứng minh.`),
                es(4, r`Cho tứ giác lồi \(ABCD\) có \(AB + BD \le AC + CD\). Chứng minh \(AB < AC\).`, r`Gọi \(O\) là giao điểm hai đường chéo. Ta có \(AB < OA + OB\) và \(CD < OC + OD\), nên \(AB + CD < AC + BD\).
Cộng vế với \(AB + BD \le AC + CD\): \(2AB + BD + CD < 2AC + CD + BD\), suy ra \(AB < AC\).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 11 ----------------
    {
      slug: 'bai-11-hinh-thang-can',
      difficulty: 2,
      objectives: `- Nhận biết hình thang, hình thang cân, hình thang vuông.
- Giải thích tính chất về góc kề một đáy, cạnh bên, đường chéo của hình thang cân.
- Nhận biết hình thang cân bằng dấu hiệu về góc kề một đáy hoặc về hai đường chéo.`,
      prerequisites: '- Hai đường thẳng song song, các cặp góc đồng vị, so le trong (Toán 7).\n- Các trường hợp bằng nhau của tam giác (Toán 7).\n- Tổng các góc của tứ giác (Bài 10).',
      concepts: 'Hình thang; đáy lớn, đáy nhỏ, cạnh bên, đường cao; hình thang vuông; hình thang cân.',
      properties: `- Trong hình thang, hai góc kề một cạnh bên bù nhau.
- Trong hình thang cân: hai cạnh bên bằng nhau; hai đường chéo bằng nhau; hai góc kề một đáy bằng nhau.`,
      theorems: `- Hình thang có hai góc kề một đáy bằng nhau là hình thang cân.
- Hình thang có hai đường chéo bằng nhau là hình thang cân.`,
      themes: [
        {
          title: 'Hình thang, hình thang cân và tính chất',
          description: 'Tính góc, độ dài; chứng minh đoạn thẳng, góc bằng nhau nhờ tính chất hình thang cân.',
          types: [
            {
              slug: 'tinh-goc-canh-hinh-thang',
              title: 'Tính số đo góc, độ dài cạnh của hình thang, hình thang cân',
              levels: [1, 2, 3],
              knowledge: 'Hai góc kề một cạnh bên của hình thang bù nhau; hình thang cân có hai góc kề một đáy bằng nhau, hai cạnh bên bằng nhau.',
              signs: 'Đề cho một số góc (hoặc quan hệ giữa các góc), độ dài các đáy của hình thang, hình thang cân và yêu cầu tính góc, đoạn thẳng còn lại.',
              method: 'Dùng tính chất góc kề cạnh bên bù nhau, tính chất của hình thang cân; với độ dài, kẻ thêm đường cao để tạo các đoạn bằng nhau.',
              steps: r`- **Bước 1.** Xác định cặp đáy song song, các góc kề cạnh bên, kề đáy.
- **Bước 2.** Áp dụng: góc kề cạnh bên có tổng \(180^\circ\); góc kề một đáy (hình thang cân) bằng nhau.
- **Bước 3.** Với độ dài đáy: kẻ hai đường cao từ hai đỉnh của đáy nhỏ, dùng các đoạn bằng nhau ở đáy lớn.`,
              mistakes: '- Cho rằng hai góc kề một đáy của hình thang bất kì bằng nhau.\n- Nhầm cặp góc bù nhau (phải là hai góc kề một cạnh bên, không phải kề một đáy).',
              example: r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{D} = 65^\circ\). Tính các góc còn lại.`,
              solution: r`\(\widehat{C} = \widehat{D} = 65^\circ\) (hai góc kề đáy \(CD\)). \(\widehat{A} = 180^\circ - \widehat{D} = 115^\circ\) (hai góc kề cạnh bên \(AD\)), \(\widehat{B} = \widehat{A} = 115^\circ\).`,
              exercises: [
                sa(1, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 110^\circ\). Tính \(\widehat{D}\).`, ['70'], r`Hai góc \(A\) và \(D\) kề cạnh bên \(AD\) nên bù nhau: \(\widehat{D} = 180^\circ - 110^\circ = 70^\circ\).`, '°'),
                sa(2, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\), \(AB < CD\)) có \(AB = 6\) cm, \(CD = 14\) cm. Kẻ đường cao \(AH\) (\(H\) thuộc \(CD\)). Tính \(DH\).`, ['4'], r`Kẻ thêm đường cao \(BK\). Khi đó \(HK = AB = 6\) cm và \(DH = CK\) (hai tam giác vuông \(AHD\), \(BKC\) bằng nhau). Do đó \(DH = \dfrac{14 - 6}{2} = 4\) cm.`, 'cm'),
                sa(3, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 2\widehat{D}\). Tính \(\widehat{C}\).`, ['60'], r`\(\widehat{A} + \widehat{D} = 180^\circ\) và \(\widehat{A} = 2\widehat{D}\) nên \(\widehat{D} = 60^\circ\). Hình thang cân nên \(\widehat{C} = \widehat{D} = 60^\circ\).`, '°'),
              ],
            },
            {
              slug: 'chung-minh-doan-thang-goc-bang-nhau-hinh-thang-can',
              title: 'Chứng minh đoạn thẳng bằng nhau, góc bằng nhau',
              levels: [3, 4],
              knowledge: 'Tính chất hình thang cân (cạnh bên, đường chéo, góc kề đáy bằng nhau); các trường hợp bằng nhau của tam giác.',
              signs: 'Đề cho hình thang cân, yêu cầu chứng minh hai đoạn thẳng hoặc hai góc bằng nhau, chứng minh tam giác cân.',
              method: 'Chọn hai tam giác chứa hai đoạn (góc) cần chứng minh, dùng tính chất hình thang cân để có các yếu tố bằng nhau rồi chứng minh hai tam giác bằng nhau.',
              steps: `- **Bước 1.** Xác định hai tam giác chứa các yếu tố cần chứng minh.
- **Bước 2.** Liệt kê các cạnh, góc bằng nhau (từ tính chất hình thang cân, cạnh chung, góc đối đỉnh…).
- **Bước 3.** Kết luận hai tam giác bằng nhau, suy ra yếu tố tương ứng.`,
              mistakes: '- Dùng tính chất của hình thang cân khi đề chỉ cho hình thang.\n- Ghi sai thứ tự đỉnh tương ứng của hai tam giác bằng nhau.',
              example: r`Cho hình thang cân \(ABCD\) (\(AB \parallel CD\)), \(O\) là giao điểm hai đường chéo. Chứng minh \(OA = OB\) và \(OC = OD\).`,
              solution: r`\(\triangle ABD\) và \(\triangle BAC\) có \(AD = BC\), \(BD = AC\), \(AB\) chung nên \(\triangle ABD = \triangle BAC\) (c.c.c), suy ra \(\widehat{ABD} = \widehat{BAC}\).
Do đó \(\triangle OAB\) cân tại \(O\): \(OA = OB\). Mà \(AC = BD\) nên \(OC = AC - OA = BD - OB = OD\).`,
              exercises: [
                ge(3, r`Cho hình thang cân \(ABCD\) (\(AB \parallel CD\), \(AB < CD\)). Gọi \(E\) là giao điểm của hai đường thẳng \(AD\) và \(BC\). Chứng minh các tam giác \(EDC\) và \(EAB\) là tam giác cân.`, `D(0,0) C(6,0) B(4.5,2) A(1.5,2) E(3,4)
DCBAD
AE BE`, r`Hình thang cân nên \(\widehat{D} = \widehat{C}\), do đó \(\triangle EDC\) cân tại \(E\).
Vì \(AB \parallel CD\) nên \(\widehat{EAB} = \widehat{D}\), \(\widehat{EBA} = \widehat{C}\) (đồng vị), suy ra \(\widehat{EAB} = \widehat{EBA}\): \(\triangle EAB\) cân tại \(E\).`),
                es(4, r`Cho hình thang cân \(ABCD\) (\(AB \parallel CD\)) có hai đường chéo vuông góc với nhau tại \(O\) và đường cao bằng \(h\). Chứng minh \(AB + CD = 2h\).`, r`Theo ví dụ, \(OA = OB\), \(OC = OD\); lại có \(\widehat{AOB} = 90^\circ\) nên \(\triangle OAB\), \(\triangle OCD\) vuông cân tại \(O\).
Kẻ đường thẳng qua \(O\) vuông góc với \(AB\) tại \(M\), cắt \(CD\) tại \(N\). Trong tam giác vuông cân \(OAB\), \(OM\) vừa là đường cao vừa là đường trung tuyến và \(\triangle OMA\) vuông cân nên \(OM = MA = \dfrac{AB}{2}\). Tương tự \(ON = \dfrac{CD}{2}\).
Vậy \(h = MN = OM + ON = \dfrac{AB + CD}{2}\), tức là \(AB + CD = 2h\).`),
              ],
            },
          ],
        },
        {
          title: 'Dấu hiệu nhận biết hình thang cân',
          description: 'Chứng minh một tứ giác là hình thang, hình thang cân.',
          types: [
            {
              slug: 'chung-minh-hinh-thang-can',
              title: 'Chứng minh tứ giác là hình thang, hình thang cân',
              levels: [2, 3],
              knowledge: 'Định nghĩa hình thang; dấu hiệu nhận biết hình thang cân (hai góc kề một đáy bằng nhau, hoặc hai đường chéo bằng nhau); góc đồng vị, so le trong.',
              signs: 'Đề yêu cầu chứng minh tứ giác là hình thang, hình thang cân (thường trong tam giác cân, có hai điểm trên hai cạnh bên).',
              method: 'Chứng minh có một cặp cạnh đối song song (hình thang), sau đó chứng minh hai góc kề một đáy bằng nhau hoặc hai đường chéo bằng nhau.',
              steps: `- **Bước 1.** Chứng minh hai cạnh đối song song (góc đồng vị, so le trong bằng nhau).
- **Bước 2.** Chứng minh hai góc kề một đáy bằng nhau (hoặc hai đường chéo bằng nhau).
- **Bước 3.** Kết luận theo dấu hiệu nhận biết.`,
              mistakes: '- Kết luận hình thang cân chỉ từ hai cạnh bên bằng nhau (hình bình hành cũng có hai cạnh bên bằng nhau).\n- Quên chứng minh tứ giác là hình thang trước.',
              example: r`Cho tam giác \(ABC\) cân tại \(A\). Trên \(AB\), \(AC\) lấy \(D\), \(E\) sao cho \(AD = AE\). Chứng minh \(BDEC\) là hình thang cân.`,
              solution: r`\(\triangle ADE\) cân tại \(A\) nên \(\widehat{ADE} = \dfrac{180^\circ - \widehat{A}}{2} = \widehat{ABC}\). Hai góc này ở vị trí đồng vị nên \(DE \parallel BC\): \(BDEC\) là hình thang.
Lại có \(\widehat{B} = \widehat{C}\) (hai góc kề đáy \(BC\)) nên \(BDEC\) là hình thang cân.`,
              exercises: [
                es(2, r`Tứ giác \(ABCD\) có \(AB \parallel CD\) và \(\widehat{C} = \widehat{D}\). Chứng minh \(ABCD\) là hình thang cân.`, r`\(AB \parallel CD\) nên \(ABCD\) là hình thang với hai đáy \(AB\), \(CD\). Hình thang có hai góc kề đáy \(CD\) bằng nhau nên là hình thang cân.`),
                ge(3, r`Cho tam giác \(ABC\) cân tại \(A\), các đường phân giác \(BD\), \(CE\) (\(D\) thuộc \(AC\), \(E\) thuộc \(AB\)). Chứng minh \(BEDC\) là hình thang cân.`, `A(3,5) B(0,0) C(6,0) D(4.48,2.54) E(1.52,2.54)
ABCA
BD CE ED`, r`\(\triangle ABD\) và \(\triangle ACE\) có: \(\widehat{A}\) chung, \(AB = AC\), \(\widehat{ABD} = \widehat{ACE}\) (nửa hai góc bằng nhau) nên \(\triangle ABD = \triangle ACE\) (g.c.g), suy ra \(AD = AE\).
Theo ví dụ, \(BEDC\) là hình thang cân (\(ED \parallel BC\), \(\widehat{B} = \widehat{C}\)).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 12 ----------------
    {
      slug: 'bai-12-hinh-binh-hanh',
      difficulty: 3,
      objectives: `- Nhận biết hình bình hành.
- Giải thích tính chất về cạnh, góc, đường chéo của hình bình hành.
- Nhận biết hình bình hành bằng các dấu hiệu; vận dụng chứng minh các quan hệ hình học.`,
      prerequisites: '- Hình thang (Bài 11).\n- Các trường hợp bằng nhau của tam giác; góc tạo bởi một đường thẳng cắt hai đường thẳng song song (Toán 7).',
      concepts: 'Hình bình hành; tâm của hình bình hành (giao điểm hai đường chéo).',
      properties: 'Trong hình bình hành: các cạnh đối bằng nhau; các góc đối bằng nhau; hai đường chéo cắt nhau tại trung điểm của mỗi đường.',
      theorems: `Dấu hiệu nhận biết hình bình hành:
- Tứ giác có các cạnh đối song song.
- Tứ giác có các cạnh đối bằng nhau.
- Tứ giác có hai cạnh đối song song và bằng nhau.
- Tứ giác có các góc đối bằng nhau.
- Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường.`,
      themes: [
        {
          title: 'Tính chất của hình bình hành',
          description: 'Tính góc, cạnh; dùng tính chất để chứng minh đoạn thẳng, góc bằng nhau.',
          types: [
            {
              slug: 'tinh-goc-canh-hinh-binh-hanh',
              title: 'Tính góc, cạnh của hình bình hành',
              levels: [1, 2],
              knowledge: 'Hình bình hành có các cạnh đối bằng nhau, các góc đối bằng nhau, hai góc kề một cạnh bù nhau, hai đường chéo cắt nhau tại trung điểm mỗi đường.',
              signs: 'Đề cho một số góc, cạnh, chu vi hoặc đường chéo của hình bình hành và yêu cầu tính các yếu tố khác.',
              method: 'Áp dụng trực tiếp tính chất về cạnh, góc, đường chéo của hình bình hành.',
              steps: `- **Bước 1.** Xác định cặp cạnh đối, cặp góc đối, cặp góc kề một cạnh.
- **Bước 2.** Áp dụng tính chất tương ứng.
- **Bước 3.** Tính và kết luận.`,
              mistakes: '- Cho rằng hai góc kề một cạnh của hình bình hành bằng nhau (thực ra chúng bù nhau).\n- Quên chu vi bằng 2 lần tổng hai cạnh kề.',
              example: r`Hình bình hành \(ABCD\) có \(\widehat{A} = 3\widehat{B}\). Tính các góc của hình bình hành.`,
              solution: r`\(\widehat{A} + \widehat{B} = 180^\circ\) và \(\widehat{A} = 3\widehat{B}\) nên \(\widehat{B} = 45^\circ\), \(\widehat{A} = 135^\circ\). Do đó \(\widehat{C} = \widehat{A} = 135^\circ\), \(\widehat{D} = \widehat{B} = 45^\circ\).`,
              exercises: [
                sa(1, r`Hình bình hành \(ABCD\) có \(\widehat{A} = 75^\circ\). Tính \(\widehat{C}\).`, ['75'], r`Hai góc đối của hình bình hành bằng nhau: \(\widehat{C} = \widehat{A} = 75^\circ\).`, '°'),
                sa(2, r`Hình bình hành \(ABCD\) có chu vi 40 cm và \(AB = 12\) cm. Tính \(BC\).`, ['8'], r`Chu vi \(= 2(AB + BC) = 40\), suy ra \(AB + BC = 20\), \(BC = 8\) cm.`, 'cm'),
              ],
            },
            {
              slug: 'dung-tinh-chat-hinh-binh-hanh',
              title: 'Dùng tính chất hình bình hành để chứng minh quan hệ hình học',
              levels: [2, 3],
              knowledge: 'Tính chất hình bình hành; các trường hợp bằng nhau của tam giác; góc so le trong, đối đỉnh.',
              signs: 'Đề cho hình bình hành và yêu cầu chứng minh hai đoạn thẳng, hai góc bằng nhau hoặc hai đường thẳng song song.',
              method: 'Dùng tính chất của hình bình hành để có các cạnh, góc bằng nhau rồi chứng minh hai tam giác bằng nhau (hoặc suy ra trực tiếp).',
              steps: `- **Bước 1.** Ghi các tính chất có được từ hình bình hành (cạnh đối, góc đối, đường chéo).
- **Bước 2.** Chọn hai tam giác chứa yếu tố cần chứng minh; chứng minh chúng bằng nhau.
- **Bước 3.** Suy ra kết luận.`,
              mistakes: '- Dùng "hai đường chéo bằng nhau" cho hình bình hành (chỉ đúng với hình chữ nhật).',
              example: r`Cho hình bình hành \(ABCD\), \(O\) là giao điểm hai đường chéo. Một đường thẳng qua \(O\) cắt \(AB\), \(CD\) lần lượt tại \(M\), \(N\). Chứng minh \(OM = ON\).`,
              solution: r`\(\triangle OAM\) và \(\triangle OCN\) có: \(OA = OC\) (tính chất đường chéo), \(\widehat{AOM} = \widehat{CON}\) (đối đỉnh), \(\widehat{OAM} = \widehat{OCN}\) (so le trong, \(AB \parallel CD\)).
Do đó \(\triangle OAM = \triangle OCN\) (g.c.g), suy ra \(OM = ON\).`,
              exercises: [
                mcq(2, r`Hình bình hành \(ABCD\) có hai đường chéo cắt nhau tại \(O\), \(AC = 10\) cm, \(BD = 6\) cm. Độ dài \(OA + OB\) bằng`, ['8 cm', '16 cm', '4 cm', '10 cm'], 'A', r`\(OA = \dfrac{AC}{2} = 5\) cm, \(OB = \dfrac{BD}{2} = 3\) cm, nên \(OA + OB = 8\) cm.`),
                ge(3, r`Cho hình bình hành \(ABCD\). Gọi \(E\), \(F\) lần lượt là trung điểm của \(AB\), \(CD\). Chứng minh \(DE = BF\).`, `D(0,0) C(5,0) B(6,3) A(1,3) E(3.5,3) F(2.5,0)
ABCDA
DE BF`, r`\(EB = \dfrac{AB}{2}\), \(DF = \dfrac{CD}{2}\) và \(AB = CD\) nên \(EB = DF\); lại có \(EB \parallel DF\).
Tứ giác \(EBFD\) có hai cạnh đối song song và bằng nhau nên là hình bình hành, suy ra \(DE = BF\).`),
              ],
            },
          ],
        },
        {
          title: 'Dấu hiệu nhận biết hình bình hành',
          description: 'Chứng minh một tứ giác là hình bình hành; chứng minh thẳng hàng, đồng quy.',
          types: [
            {
              slug: 'chung-minh-hinh-binh-hanh',
              title: 'Chứng minh tứ giác là hình bình hành',
              levels: [2, 3],
              knowledge: 'Năm dấu hiệu nhận biết hình bình hành.',
              signs: 'Đề yêu cầu chứng minh một tứ giác là hình bình hành; thường có trung điểm, đoạn thẳng bằng nhau, đường thẳng song song.',
              method: 'Chọn dấu hiệu phù hợp với dữ kiện: cạnh đối song song, cạnh đối bằng nhau, một cặp cạnh đối song song và bằng nhau, góc đối bằng nhau, hoặc đường chéo cắt nhau tại trung điểm mỗi đường.',
              steps: `- **Bước 1.** Xem dữ kiện liên quan đến cạnh, góc hay đường chéo.
- **Bước 2.** Chọn dấu hiệu và chứng minh đủ các điều kiện của dấu hiệu đó.
- **Bước 3.** Kết luận.`,
              mistakes: '- Dùng "hai cạnh đối bằng nhau" (một cặp) là chưa đủ, cần thêm song song hoặc cặp còn lại.\n- Dùng "hai đường chéo bằng nhau" để kết luận hình bình hành.',
              example: r`Cho hình bình hành \(ABCD\). Trên các cạnh \(AB\), \(CD\) lấy \(E\), \(F\) sao cho \(AE = CF\). Chứng minh \(DEBF\) là hình bình hành.`,
              solution: r`\(EB = AB - AE\), \(DF = CD - CF\), mà \(AB = CD\), \(AE = CF\) nên \(EB = DF\). Lại có \(EB \parallel DF\) (vì \(AB \parallel CD\)).
Tứ giác \(DEBF\) có hai cạnh đối song song và bằng nhau nên là hình bình hành.`,
              exercises: [
                mcq(2, 'Tứ giác nào sau đây chắc chắn là hình bình hành?', ['Tứ giác có hai cạnh đối song song', 'Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường', 'Tứ giác có hai đường chéo bằng nhau', 'Tứ giác có hai cạnh đối bằng nhau'], 'B', 'Chỉ dấu hiệu "hai đường chéo cắt nhau tại trung điểm của mỗi đường" đủ để kết luận hình bình hành. Các điều kiện còn lại có thể là hình thang, hình thang cân.'),
                es(3, r`Cho tam giác \(ABC\), \(M\) là trung điểm của \(BC\). Trên tia đối của tia \(MA\) lấy điểm \(D\) sao cho \(MD = MA\). Chứng minh \(ABDC\) là hình bình hành.`, r`Tứ giác \(ABDC\) có hai đường chéo \(AD\) và \(BC\) cắt nhau tại \(M\), mà \(M\) là trung điểm của cả \(AD\) và \(BC\). Vậy \(ABDC\) là hình bình hành.`),
              ],
            },
            {
              slug: 'thang-hang-dong-quy-hinh-binh-hanh',
              title: 'Chứng minh ba điểm thẳng hàng, ba đường thẳng đồng quy',
              levels: [3, 4],
              knowledge: 'Hai đường chéo của hình bình hành cắt nhau tại trung điểm mỗi đường; một đoạn thẳng chỉ có một trung điểm.',
              signs: 'Đề yêu cầu chứng minh ba điểm thẳng hàng hoặc ba đường thẳng cùng đi qua một điểm, trong hình có (hoặc tạo được) các hình bình hành chung đường chéo.',
              method: 'Chứng minh các tứ giác là hình bình hành có chung một đường chéo; khi đó các đường chéo còn lại cùng đi qua trung điểm của đường chéo chung.',
              steps: `- **Bước 1.** Tìm (hoặc chứng minh) các hình bình hành có chung một đường chéo.
- **Bước 2.** Suy ra các đường chéo còn lại đi qua trung điểm O của đường chéo chung.
- **Bước 3.** Kết luận các điểm thẳng hàng hoặc các đường thẳng đồng quy tại O.`,
              mistakes: '- Kết luận thẳng hàng chỉ dựa vào hình vẽ.\n- Quên chỉ ra hai đường chéo có chung trung điểm.',
              example: r`Cho hình bình hành \(ABCD\), \(O\) là giao điểm hai đường chéo. Trên \(AB\), \(CD\) lấy \(E\), \(F\) sao cho \(AE = CF\). Chứng minh \(E\), \(O\), \(F\) thẳng hàng.`,
              solution: r`\(AE = CF\) và \(AE \parallel CF\) nên \(AECF\) là hình bình hành. Hai đường chéo \(AC\), \(EF\) của nó cắt nhau tại trung điểm của \(AC\), chính là \(O\). Vậy \(EF\) đi qua \(O\), tức là \(E\), \(O\), \(F\) thẳng hàng.`,
              exercises: [
                es(3, r`Cho hình bình hành \(ABCD\). Gọi \(M\), \(N\) lần lượt là trung điểm của \(AB\), \(CD\). Chứng minh ba đường thẳng \(AC\), \(BD\), \(MN\) đồng quy.`, r`\(AM = CN\) và \(AM \parallel CN\) nên \(AMCN\) là hình bình hành; do đó \(MN\) đi qua trung điểm \(O\) của \(AC\).
Mà \(O\) cũng là trung điểm của \(BD\) (giao điểm hai đường chéo của \(ABCD\)). Vậy \(AC\), \(BD\), \(MN\) cùng đi qua \(O\).`),
                es(4, r`Cho hai hình bình hành \(ABCD\) và \(AECF\) có chung đường chéo \(AC\) (\(E\), \(F\) không thuộc \(AC\)). Chứng minh ba đường thẳng \(AC\), \(BD\), \(EF\) đồng quy.`, r`Gọi \(O\) là trung điểm của \(AC\). Trong hình bình hành \(ABCD\), \(BD\) đi qua \(O\). Trong hình bình hành \(AECF\), \(EF\) đi qua \(O\). Vậy ba đường thẳng cùng đi qua \(O\).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 13 ----------------
    {
      slug: 'bai-13-hinh-chu-nhat',
      difficulty: 3,
      objectives: `- Nhận biết hình chữ nhật.
- Giải thích tính chất về góc, đường chéo của hình chữ nhật.
- Nhận biết hình chữ nhật bằng dấu hiệu; vận dụng tính chất đường trung tuyến ứng với cạnh huyền của tam giác vuông.`,
      prerequisites: '- Hình thang cân, hình bình hành (Bài 11, Bài 12).\n- Tam giác cân, tam giác bằng nhau (Toán 7).',
      concepts: 'Hình chữ nhật; đường trung tuyến ứng với cạnh huyền.',
      formulas: r`Tam giác \(ABC\) vuông tại \(A\), \(M\) là trung điểm của \(BC\) thì \(AM = \dfrac{BC}{2}\).`,
      properties: `- Hình chữ nhật có tất cả tính chất của hình bình hành và của hình thang cân.
- Hai đường chéo của hình chữ nhật bằng nhau và cắt nhau tại trung điểm của mỗi đường.
- Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền; ngược lại, tam giác có đường trung tuyến bằng nửa cạnh tương ứng là tam giác vuông.`,
      theorems: `Dấu hiệu nhận biết hình chữ nhật:
- Tứ giác có ba góc vuông.
- Hình thang cân có một góc vuông.
- Hình bình hành có một góc vuông.
- Hình bình hành có hai đường chéo bằng nhau.`,
      themes: [
        {
          title: 'Hình chữ nhật',
          description: 'Dấu hiệu nhận biết và tính chất của hình chữ nhật.',
          types: [
            {
              slug: 'chung-minh-hinh-chu-nhat',
              title: 'Chứng minh tứ giác là hình chữ nhật',
              levels: [2, 3],
              knowledge: 'Bốn dấu hiệu nhận biết hình chữ nhật; dấu hiệu nhận biết hình bình hành.',
              signs: 'Đề có góc vuông, đường vuông góc, trung điểm, đối xứng và yêu cầu chứng minh tứ giác là hình chữ nhật.',
              method: 'Thường chứng minh tứ giác là hình bình hành rồi chỉ ra một góc vuông (hoặc hai đường chéo bằng nhau); hoặc chỉ ra ba góc vuông.',
              steps: `- **Bước 1.** Đếm số góc vuông đã có; nếu đủ ba góc thì kết luận ngay.
- **Bước 2.** Nếu chưa, chứng minh tứ giác là hình bình hành (hoặc hình thang cân).
- **Bước 3.** Chỉ ra một góc vuông hoặc hai đường chéo bằng nhau.`,
              mistakes: '- Kết luận hình chữ nhật từ "tứ giác có hai đường chéo bằng nhau" (thiếu điều kiện hình bình hành).\n- Kết luận từ hai góc vuông.',
              example: r`Cho tam giác \(ABC\) vuông tại \(A\), \(M\) là trung điểm của \(BC\). Lấy \(D\) sao cho \(M\) là trung điểm của \(AD\). Chứng minh \(ABDC\) là hình chữ nhật.`,
              solution: r`Tứ giác \(ABDC\) có hai đường chéo \(AD\), \(BC\) cắt nhau tại trung điểm \(M\) của mỗi đường nên là hình bình hành. Hình bình hành này có \(\widehat{BAC} = 90^\circ\) nên là hình chữ nhật.`,
              exercises: [
                mcq(2, r`Hình bình hành \(ABCD\) là hình chữ nhật khi`, [r`\(AC = BD\)`, r`\(AB = BC\)`, r`\(AC \perp BD\)`, r`\(AC\) là tia phân giác của góc \(A\)`], 'A', 'Hình bình hành có hai đường chéo bằng nhau là hình chữ nhật. Các điều kiện còn lại dẫn tới hình thoi.'),
                ge(3, r`Cho tam giác \(ABC\) cân tại \(A\), đường trung tuyến \(AM\). Gọi \(I\) là trung điểm của \(AC\), \(K\) là điểm sao cho \(I\) là trung điểm của \(MK\). Chứng minh \(AMCK\) là hình chữ nhật.`, `A(3,4) B(0,0) C(6,0) M(3,0) I(4.5,2) K(6,4)
ABCA
AM MK KC AK
vuong(A,M,C)`, r`Tứ giác \(AMCK\) có hai đường chéo \(AC\), \(MK\) cắt nhau tại trung điểm \(I\) của mỗi đường nên là hình bình hành.
Tam giác \(ABC\) cân tại \(A\) nên đường trung tuyến \(AM\) đồng thời là đường cao: \(\widehat{AMC} = 90^\circ\). Vậy \(AMCK\) là hình chữ nhật.`),
              ],
            },
            {
              slug: 'dung-tinh-chat-hinh-chu-nhat',
              title: 'Dùng tính chất hình chữ nhật để chứng minh quan hệ hình học',
              levels: [2, 3],
              knowledge: 'Hai đường chéo của hình chữ nhật bằng nhau và cắt nhau tại trung điểm mỗi đường; các góc đều vuông.',
              signs: 'Đề cho hình chữ nhật, yêu cầu tính đoạn thẳng, góc hoặc chứng minh hai đoạn thẳng bằng nhau, tam giác cân.',
              method: 'Dùng tính chất đường chéo (tạo các tam giác cân) và góc vuông, kết hợp tam giác bằng nhau.',
              steps: `- **Bước 1.** Gọi O là giao điểm hai đường chéo: OA = OB = OC = OD.
- **Bước 2.** Khai thác các tam giác cân, tam giác vuông tạo thành.
- **Bước 3.** Tính hoặc chứng minh theo yêu cầu.`,
              mistakes: '- Quên rằng giao điểm hai đường chéo cách đều bốn đỉnh của hình chữ nhật.',
              example: r`Hình chữ nhật \(ABCD\) có hai đường chéo cắt nhau tại \(O\) và \(\widehat{AOB} = 120^\circ\). Tính \(\widehat{OAB}\).`,
              solution: r`\(OA = OB\) (nửa hai đường chéo bằng nhau) nên \(\triangle OAB\) cân tại \(O\): \(\widehat{OAB} = \dfrac{180^\circ - 120^\circ}{2} = 30^\circ\).`,
              exercises: [
                sa(2, r`Hình chữ nhật \(ABCD\) có đường chéo \(AC = 10\) cm, hai đường chéo cắt nhau tại \(O\). Tính \(OB\).`, ['5'], r`\(BD = AC = 10\) cm và \(O\) là trung điểm của \(BD\) nên \(OB = 5\) cm.`, 'cm'),
                es(3, r`Cho hình chữ nhật \(ABCD\). Kẻ \(AH \perp BD\) (\(H\) thuộc \(BD\)) và \(CK \perp BD\) (\(K\) thuộc \(BD\)). Chứng minh \(AH = CK\).`, r`\(\triangle AHD\) và \(\triangle CKB\) vuông tại \(H\), \(K\) có \(AD = CB\) và \(\widehat{ADH} = \widehat{CBK}\) (so le trong, \(AD \parallel BC\)).
Do đó \(\triangle AHD = \triangle CKB\) (cạnh huyền – góc nhọn), suy ra \(AH = CK\).`),
              ],
            },
          ],
        },
        {
          title: 'Đường trung tuyến của tam giác vuông',
          description: 'Đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền và điều ngược lại.',
          types: [
            {
              slug: 'trung-tuyen-ung-voi-canh-huyen',
              title: 'Đường trung tuyến ứng với cạnh huyền của tam giác vuông',
              levels: [2, 3, 4],
              knowledge: 'Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền; tam giác có một đường trung tuyến bằng nửa cạnh tương ứng thì là tam giác vuông.',
              signs: 'Tam giác vuông có trung điểm của cạnh huyền; hoặc cần chứng minh một tam giác vuông khi biết trung tuyến bằng nửa cạnh.',
              method: 'Dùng trung tuyến bằng nửa cạnh huyền để có các đoạn bằng nhau và tam giác cân, từ đó tính độ dài, góc.',
              steps: r`- **Bước 1.** Xác định tam giác vuông và trung điểm \(M\) của cạnh huyền.
- **Bước 2.** Suy ra \(MA = MB = MC\); xét các tam giác cân \(MAB\), \(MAC\).
- **Bước 3.** Tính hoặc chứng minh theo yêu cầu.`,
              mistakes: '- Áp dụng tính chất cho trung tuyến ứng với cạnh góc vuông.\n- Nhầm trung tuyến với đường cao.',
              example: r`Cho tam giác \(ABC\) vuông tại \(A\), \(BC = 10\) cm, \(M\) là trung điểm của \(BC\). Tính \(AM\).`,
              solution: r`\(AM\) là đường trung tuyến ứng với cạnh huyền nên \(AM = \dfrac{BC}{2} = 5\) cm.`,
              exercises: [
                sa(2, r`Tam giác \(ABC\) vuông tại \(A\) có đường trung tuyến \(AM = 6{,}5\) cm. Tính \(BC\).`, ['13'], r`\(BC = 2AM = 13\) cm.`, 'cm'),
                es(3, r`Cho tam giác \(ABC\) có đường trung tuyến \(AM\) bằng nửa cạnh \(BC\). Chứng minh tam giác \(ABC\) vuông tại \(A\).`, r`\(MA = MB = MC\) nên các tam giác \(MAB\), \(MAC\) cân tại \(M\): \(\widehat{B} = \widehat{BAM}\), \(\widehat{C} = \widehat{CAM}\).
Suy ra \(\widehat{BAC} = \widehat{B} + \widehat{C}\). Mà \(\widehat{BAC} + \widehat{B} + \widehat{C} = 180^\circ\) nên \(\widehat{BAC} = 90^\circ\).`),
                sa(4, r`Tam giác \(ABC\) vuông tại \(A\) có \(\widehat{B} = 30^\circ\), đường cao \(AH\) và đường trung tuyến \(AM\). Tính số đo góc \(HAM\).`, ['30'], r`\(\widehat{C} = 60^\circ\) và \(MA = MC\) nên \(\triangle AMC\) cân có một góc \(60^\circ\), là tam giác đều: \(\widehat{AMC} = 60^\circ\).
Trong tam giác \(AHM\) vuông tại \(H\): \(\widehat{HAM} = 90^\circ - 60^\circ = 30^\circ\).`, '°'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 14 ----------------
    {
      slug: 'bai-14-hinh-thoi-va-hinh-vuong',
      difficulty: 3,
      objectives: `- Nhận biết hình thoi, hình vuông.
- Giải thích tính chất về đường chéo của hình thoi, hình vuông.
- Nhận biết hình thoi, hình vuông bằng dấu hiệu; tìm điều kiện để một tứ giác là hình thoi, hình vuông.`,
      prerequisites: '- Hình bình hành, hình chữ nhật (Bài 12, Bài 13).\n- Tia phân giác của một góc (Toán 7).',
      concepts: 'Hình thoi; hình vuông.',
      properties: `- Hình thoi có tất cả tính chất của hình bình hành; hai đường chéo vuông góc với nhau và là các đường phân giác của các góc của hình thoi.
- Hình vuông có tất cả tính chất của hình chữ nhật và hình thoi.`,
      theorems: `Dấu hiệu nhận biết hình thoi:
- Tứ giác có bốn cạnh bằng nhau.
- Hình bình hành có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là đường phân giác của một góc.

Dấu hiệu nhận biết hình vuông:
- Hình chữ nhật có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là đường phân giác của một góc.
- Hình thoi có một góc vuông, hoặc hai đường chéo bằng nhau.`,
      themes: [
        {
          title: 'Tính chất hình thoi, hình vuông',
          description: 'Tính góc, cạnh; chứng minh quan hệ hình học nhờ tính chất đường chéo.',
          types: [
            {
              slug: 'tinh-goc-canh-hinh-thoi',
              title: 'Tính góc, cạnh của hình thoi, hình vuông',
              levels: [1, 2],
              knowledge: 'Hình thoi có bốn cạnh bằng nhau, các góc đối bằng nhau, đường chéo là phân giác của các góc; hình vuông có bốn góc vuông, bốn cạnh bằng nhau.',
              signs: 'Đề cho chu vi, một góc hoặc một đường chéo của hình thoi, hình vuông và yêu cầu tính cạnh, góc.',
              method: 'Dùng bốn cạnh bằng nhau, tính chất góc và đường chéo là phân giác.',
              steps: `- **Bước 1.** Ghi các tính chất về cạnh, góc của hình thoi (hình vuông).
- **Bước 2.** Dùng đường chéo là phân giác để tính các góc nhỏ.
- **Bước 3.** Tính và kết luận.`,
              mistakes: '- Cho rằng hai đường chéo của hình thoi bằng nhau.\n- Quên đường chéo chia đôi góc của hình thoi.',
              example: r`Hình thoi \(ABCD\) có \(\widehat{A} = 60^\circ\) và cạnh 5 cm. Tính \(BD\) và các góc của hình thoi.`,
              solution: r`\(AB = AD\) và \(\widehat{A} = 60^\circ\) nên \(\triangle ABD\) đều: \(BD = 5\) cm.
\(\widehat{C} = \widehat{A} = 60^\circ\); \(\widehat{B} = \widehat{D} = 180^\circ - 60^\circ = 120^\circ\).`,
              exercises: [
                sa(1, 'Một hình thoi có chu vi 28 cm. Độ dài cạnh của hình thoi là bao nhiêu xăng-ti-mét?', ['7'], r`Bốn cạnh bằng nhau nên cạnh bằng \(28 : 4 = 7\) cm.`, 'cm'),
                sa(2, r`Hình thoi \(ABCD\) có \(\widehat{ABC} = 130^\circ\). Tính \(\widehat{ABD}\).`, ['65'], r`Đường chéo \(BD\) là phân giác của góc \(ABC\) nên \(\widehat{ABD} = 130^\circ : 2 = 65^\circ\).`, '°'),
              ],
            },
            {
              slug: 'dung-tinh-chat-hinh-thoi-hinh-vuong',
              title: 'Dùng tính chất hình thoi, hình vuông để chứng minh',
              levels: [2, 3],
              knowledge: 'Đường chéo hình thoi vuông góc và là phân giác; hình vuông có bốn cạnh bằng nhau, bốn góc vuông; tam giác bằng nhau.',
              signs: 'Đề cho hình thoi, hình vuông, yêu cầu chứng minh đoạn thẳng bằng nhau, vuông góc, khoảng cách bằng nhau.',
              method: 'Dùng tính chất phân giác, vuông góc của đường chéo, bốn cạnh bằng nhau để chứng minh các tam giác bằng nhau.',
              steps: `- **Bước 1.** Ghi tính chất của hình thoi (hình vuông) liên quan đến yêu cầu.
- **Bước 2.** Chọn và chứng minh hai tam giác bằng nhau.
- **Bước 3.** Suy ra đoạn thẳng bằng nhau, góc bằng nhau hoặc vuông góc.`,
              mistakes: '- Dùng tính chất "đường chéo bằng nhau" cho hình thoi.\n- Kết luận vuông góc mà chưa chứng minh tổng hai góc bằng 90°.',
              example: r`Cho hình thoi \(ABCD\), \(O\) là giao điểm hai đường chéo. Kẻ \(OH \perp AB\), \(OK \perp AD\). Chứng minh \(OH = OK\).`,
              solution: r`\(\triangle AHO\) và \(\triangle AKO\) vuông tại \(H\), \(K\), có \(AO\) chung và \(\widehat{HAO} = \widehat{KAO}\) (\(AC\) là phân giác góc \(A\)).
Do đó \(\triangle AHO = \triangle AKO\) (cạnh huyền – góc nhọn), suy ra \(OH = OK\).`,
              exercises: [
                mcq(2, 'Phát biểu nào sau đây **sai**?', ['Hai đường chéo của hình thoi vuông góc với nhau.', 'Hai đường chéo của hình thoi bằng nhau.', 'Hai đường chéo của hình vuông bằng nhau.', 'Hình vuông là hình thoi có một góc vuông.'], 'B', 'Hai đường chéo của hình thoi nói chung không bằng nhau (chỉ bằng nhau khi hình thoi là hình vuông).'),
                ge(3, r`Cho hình vuông \(ABCD\). Trên cạnh \(AB\) lấy \(E\), trên cạnh \(BC\) lấy \(F\) sao cho \(AE = BF\). Chứng minh \(DE = AF\) và \(DE \perp AF\).`, `A(0,4) B(4,4) C(4,0) D(0,0) E(1.5,4) F(4,2.5)
ABCDA
DE AF`, r`\(\triangle DAE\) và \(\triangle ABF\) có \(DA = AB\), \(\widehat{DAE} = \widehat{ABF} = 90^\circ\), \(AE = BF\) nên bằng nhau (c.g.c). Suy ra \(DE = AF\) và \(\widehat{ADE} = \widehat{BAF}\).
Gọi \(I\) là giao điểm của \(DE\) và \(AF\): \(\widehat{IAE} + \widehat{AEI} = \widehat{ADE} + \widehat{AED} = 90^\circ\), nên \(\widehat{AIE} = 90^\circ\), tức là \(DE \perp AF\).`),
              ],
            },
          ],
        },
        {
          title: 'Dấu hiệu nhận biết hình thoi, hình vuông',
          description: 'Chứng minh tứ giác là hình thoi, hình vuông; tìm điều kiện.',
          types: [
            {
              slug: 'chung-minh-hinh-thoi-hinh-vuong',
              title: 'Chứng minh tứ giác là hình thoi, hình vuông',
              levels: [2, 3],
              knowledge: 'Các dấu hiệu nhận biết hình thoi, hình vuông.',
              signs: 'Đề yêu cầu chứng minh một tứ giác là hình thoi hoặc hình vuông.',
              method: 'Thường chứng minh hình bình hành (hoặc hình chữ nhật) trước, sau đó thêm điều kiện về cạnh kề, đường chéo vuông góc hay đường chéo là phân giác.',
              steps: `- **Bước 1.** Chứng minh tứ giác là hình bình hành, hình chữ nhật hoặc hình thoi.
- **Bước 2.** Bổ sung một điều kiện của dấu hiệu nhận biết.
- **Bước 3.** Kết luận.`,
              mistakes: '- Kết luận hình thoi từ "tứ giác có hai đường chéo vuông góc" (thiếu điều kiện hình bình hành).\n- Kết luận hình vuông từ "tứ giác có bốn cạnh bằng nhau" (mới là hình thoi).',
              example: r`Cho hình bình hành \(ABCD\) có \(AC\) là tia phân giác của góc \(A\). Chứng minh \(ABCD\) là hình thoi.`,
              solution: r`Hình bình hành có một đường chéo là phân giác của một góc là hình thoi. Vậy \(ABCD\) là hình thoi.`,
              exercises: [
                mcq(2, r`Hình chữ nhật \(ABCD\) là hình vuông khi`, [r`\(AB = BC\)`, r`\(AC = BD\)`, r`\(AB \parallel CD\)`, r`\(\widehat{A} = 90^\circ\)`], 'A', 'Hình chữ nhật có hai cạnh kề bằng nhau là hình vuông. Các điều kiện còn lại hình chữ nhật nào cũng có.'),
                ge(3, r`Cho hình vuông \(ABCD\). Trên các cạnh \(AB\), \(BC\), \(CD\), \(DA\) lần lượt lấy \(E\), \(F\), \(G\), \(H\) sao cho \(AE = BF = CG = DH\). Chứng minh \(EFGH\) là hình vuông.`, `A(0,4) B(4,4) C(4,0) D(0,0) E(1,4) F(4,3) G(3,0) H(0,1)
ABCDA
EFGHE`, r`Các tam giác vuông \(AEH\), \(BFE\), \(CGF\), \(DHG\) bằng nhau (c.g.c), nên \(HE = EF = FG = GH\): \(EFGH\) là hình thoi.
Ngoài ra \(\widehat{AEH} = \widehat{BFE}\) nên \(\widehat{AEH} + \widehat{BEF} = \widehat{BFE} + \widehat{BEF} = 90^\circ\), suy ra \(\widehat{HEF} = 90^\circ\). Hình thoi có một góc vuông là hình vuông.`),
              ],
            },
            {
              slug: 'dieu-kien-hinh-thoi-hinh-vuong',
              title: 'Tìm điều kiện để tứ giác là hình thoi, hình vuông',
              levels: [3, 4],
              knowledge: 'Dấu hiệu nhận biết các tứ giác đặc biệt; mối quan hệ: hình vuông vừa là hình chữ nhật vừa là hình thoi.',
              signs: 'Đề hỏi tam giác (hoặc tứ giác ban đầu) cần thêm điều kiện gì để tứ giác tạo thành là hình thoi, hình chữ nhật, hình vuông.',
              method: 'Xác định tứ giác đã là hình gì; từ dấu hiệu nhận biết của hình cần đạt, suy ngược ra điều kiện của hình ban đầu.',
              steps: `- **Bước 1.** Chứng minh tứ giác luôn là một hình (thường là hình bình hành).
- **Bước 2.** Viết điều kiện cần thêm theo dấu hiệu (cạnh kề bằng nhau, góc vuông, đường chéo…).
- **Bước 3.** Chuyển điều kiện đó về điều kiện của hình ban đầu; kết luận.`,
              mistakes: '- Chỉ nêu điều kiện mà không giải thích vì sao đủ.\n- Quên trường hợp hình vuông cần đồng thời hai điều kiện.',
              example: r`Cho tam giác \(ABC\), \(M\) là trung điểm của \(BC\), \(D\) là điểm sao cho \(M\) là trung điểm của \(AD\). Tam giác \(ABC\) cần điều kiện gì để \(ABDC\) là hình thoi, hình chữ nhật, hình vuông?`,
              solution: r`\(ABDC\) luôn là hình bình hành (hai đường chéo cắt nhau tại trung điểm mỗi đường).
- Hình thoi khi \(AB = AC\), tức là tam giác \(ABC\) cân tại \(A\).
- Hình chữ nhật khi \(\widehat{BAC} = 90^\circ\), tức là tam giác \(ABC\) vuông tại \(A\).
- Hình vuông khi tam giác \(ABC\) vuông cân tại \(A\).`,
              exercises: [
                mcq(3, r`Cho hình bình hành \(ABCD\). Điều kiện nào sau đây làm cho \(ABCD\) trở thành hình thoi?`, [r`\(AC \perp BD\)`, r`\(AC = BD\)`, r`\(\widehat{A} = 90^\circ\)`, r`\(AB \parallel CD\)`], 'A', 'Hình bình hành có hai đường chéo vuông góc là hình thoi.'),
                es(4, r`Cho tam giác \(ABC\), điểm \(D\) thuộc cạnh \(BC\). Qua \(D\) kẻ \(DE \parallel AC\) (\(E\) thuộc \(AB\)) và \(DF \parallel AB\) (\(F\) thuộc \(AC\)).
a) Tứ giác \(AEDF\) là hình gì?
b) Điểm \(D\) ở vị trí nào trên \(BC\) thì \(AEDF\) là hình thoi?
c) Nếu tam giác \(ABC\) vuông tại \(A\) thì \(AEDF\) là hình gì? Khi đó \(D\) ở vị trí nào thì \(AEDF\) là hình vuông?`, r`a) \(AEDF\) có \(AE \parallel DF\), \(AF \parallel DE\) nên là hình bình hành.
b) \(AEDF\) là hình thoi khi đường chéo \(AD\) là phân giác của góc \(A\), tức là \(D\) là chân đường phân giác kẻ từ \(A\).
c) Khi \(\widehat{A} = 90^\circ\), hình bình hành \(AEDF\) là hình chữ nhật; nó là hình vuông khi \(D\) là chân đường phân giác kẻ từ \(A\).`),
              ],
            },
          ],
        },
      ],
    },
  ],
};
