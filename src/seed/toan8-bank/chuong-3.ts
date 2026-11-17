/** Ngân hàng câu hỏi GĐ4 – Chương III. Tứ giác (Bài 10 – Bài 14). */
import { es, ge, mc, r, sa, tf, type BankLesson } from './types';

const DEG = { unit: '°' };
const CM = { unit: 'cm' };
const CM2 = { unit: 'cm²' };

const TSG = 'tinh-so-do-goc-tu-giac';
const CGD = 'canh-goc-duong-cheo-tu-giac';

const B10: BankLesson = {
  slug: 'bai-10-tu-giac',
  questions: [
    mc(1, TSG, 'Tổng các góc của một tứ giác bằng', [r`\(360^\circ\)`, r`\(180^\circ\)`, r`\(270^\circ\)`, r`\(540^\circ\)`], r`Đường chéo chia tứ giác thành hai tam giác nên tổng các góc là \(2\cdot180^\circ = 360^\circ\).`, [
      undefined,
      'Đó là tổng ba góc của một tam giác.',
      'Tổng các góc của tứ giác bằng tổng các góc của hai tam giác.',
      'Đó là tổng các góc của ngũ giác.',
    ]),
    mc(1, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = 70^\circ\), \(\widehat{B} = 80^\circ\), \(\widehat{C} = 110^\circ\). Số đo \(\widehat{D}\) là`, [r`\(100^\circ\)`, r`\(80^\circ\)`, r`\(120^\circ\)`, r`\(260^\circ\)`], r`\(\widehat{D} = 360^\circ - (70^\circ + 80^\circ + 110^\circ) = 360^\circ - 260^\circ = 100^\circ\).`, [
      undefined,
      r`Đó là góc ngoài tại \(D\).`,
      'Cộng sai tổng ba góc đã biết.',
      'Đó là tổng ba góc đã biết, chưa lấy \\(360^\\circ\\) trừ đi.',
    ]),
    mc(1, TSG, 'Một tứ giác có ba góc vuông. Góc còn lại có số đo là', [r`\(90^\circ\)`, r`\(180^\circ\)`, r`\(270^\circ\)`, r`\(60^\circ\)`], r`Góc còn lại bằng \(360^\circ - 3\cdot90^\circ = 90^\circ\).`, [
      undefined,
      r`\(360^\circ - 270^\circ = 90^\circ\).`,
      'Đó là tổng ba góc vuông.',
      'Nhầm tổng các góc của tứ giác.',
    ]),
    mc(2, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = \widehat{B} = 90^\circ\) và \(\widehat{C} = 2\widehat{D}\). Số đo \(\widehat{D}\) là`, [r`\(60^\circ\)`, r`\(120^\circ\)`, r`\(90^\circ\)`, r`\(45^\circ\)`], r`\(\widehat{C} + \widehat{D} = 360^\circ - 180^\circ = 180^\circ\) và \(\widehat{C} = 2\widehat{D}\) nên \(3\widehat{D} = 180^\circ\), \(\widehat{D} = 60^\circ\).`, [
      undefined,
      r`Đó là số đo \(\widehat{C}\).`,
      r`Nếu \(\widehat{D} = 90^\circ\) thì \(\widehat{C} = 180^\circ\), tổng vượt \(360^\circ\).`,
      r`Chia nhầm \(180^\circ\) cho 4.`,
    ]),
    mc(2, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = 65^\circ\). Góc ngoài tại đỉnh \(A\) có số đo là`, [r`\(115^\circ\)`, r`\(65^\circ\)`, r`\(295^\circ\)`, r`\(25^\circ\)`], r`Góc ngoài kề bù với góc trong: \(180^\circ - 65^\circ = 115^\circ\).`, [
      undefined,
      'Góc ngoài kề bù chứ không bằng góc trong.',
      r`Đã lấy \(360^\circ - 65^\circ\).`,
      r`Đã lấy \(90^\circ - 65^\circ\).`,
    ]),
    mc(2, TSG, r`Các góc của một tứ giác tỉ lệ với \(2 : 3 : 3 : 4\). Góc lớn nhất của tứ giác có số đo là`, [r`\(120^\circ\)`, r`\(90^\circ\)`, r`\(144^\circ\)`, r`\(60^\circ\)`], r`Mỗi phần bằng \(360^\circ : 12 = 30^\circ\). Các góc là \(60^\circ, 90^\circ, 90^\circ, 120^\circ\); góc lớn nhất là \(120^\circ\).`, [
      undefined,
      'Đó là góc ứng với 3 phần.',
      'Cộng sai tổng các tỉ số thành 10 phần.',
      'Đó là góc nhỏ nhất.',
    ]),
    mc(2, TSG, 'Một tứ giác có nhiều nhất bao nhiêu góc nhọn?', [r`\(3\)`, r`\(4\)`, r`\(2\)`, r`\(1\)`], r`Nếu cả 4 góc nhọn thì tổng nhỏ hơn \(360^\circ\), vô lí. Có tứ giác có 3 góc nhọn, ví dụ các góc \(80^\circ, 80^\circ, 80^\circ, 120^\circ\).`, [
      undefined,
      r`Bốn góc nhọn có tổng nhỏ hơn \(4\cdot90^\circ = 360^\circ\).`,
      r`Vẫn có tứ giác có 3 góc nhọn (\(80^\circ, 80^\circ, 80^\circ, 120^\circ\)).`,
      'Tứ giác có thể có nhiều hơn một góc nhọn.',
    ]),
    mc(2, TSG, 'Một tứ giác có nhiều nhất bao nhiêu góc tù?', [r`\(3\)`, r`\(4\)`, r`\(2\)`, r`\(1\)`], r`Bốn góc tù có tổng lớn hơn \(360^\circ\), vô lí. Có tứ giác có 3 góc tù, ví dụ \(100^\circ, 100^\circ, 100^\circ, 60^\circ\).`, [
      undefined,
      r`Bốn góc tù có tổng lớn hơn \(360^\circ\).`,
      r`Vẫn có tứ giác có 3 góc tù (\(100^\circ, 100^\circ, 100^\circ, 60^\circ\)).`,
      'Tứ giác có thể có nhiều hơn một góc tù.',
    ]),
    mc(2, TSG, 'Tổng các góc ngoài của một tứ giác (mỗi đỉnh lấy một góc ngoài) bằng', [r`\(360^\circ\)`, r`\(180^\circ\)`, r`\(720^\circ\)`, r`\(540^\circ\)`], r`Tổng góc trong và góc ngoài tại 4 đỉnh là \(4\cdot180^\circ = 720^\circ\); trừ tổng góc trong \(360^\circ\) còn \(360^\circ\).`, [
      undefined,
      r`Tính lại: \(720^\circ - 360^\circ = 360^\circ\).`,
      'Đó là tổng cả góc trong và góc ngoài.',
      'Tổng sai.',
    ]),
    mc(3, TSG, r`Tứ giác \(ABCD\) có \(\widehat{C} = 60^\circ\), \(\widehat{D} = 80^\circ\). Các tia phân giác của góc \(A\) và góc \(B\) cắt nhau tại \(I\). Số đo \(\widehat{AIB}\) là`, [r`\(70^\circ\)`, r`\(140^\circ\)`, r`\(110^\circ\)`, r`\(35^\circ\)`], r`\(\widehat{A} + \widehat{B} = 360^\circ - 140^\circ = 220^\circ\). Trong tam giác \(AIB\): \(\widehat{AIB} = 180^\circ - \dfrac{220^\circ}{2} = 70^\circ\).`, [
      undefined,
      r`Đó là \(\widehat{C} + \widehat{D}\), chưa chia đôi.`,
      r`Đó là \(\dfrac{\widehat{A} + \widehat{B}}{2}\), chưa lấy \(180^\circ\) trừ đi.`,
      r`Chia đôi hai lần.`,
    ]),
    mc(3, TSG, r`Tứ giác \(ABCD\) có \(\widehat{C} = \widehat{D} = 90^\circ\) và \(\widehat{A} - \widehat{B} = 20^\circ\). Số đo \(\widehat{A}\) là`, [r`\(100^\circ\)`, r`\(80^\circ\)`, r`\(110^\circ\)`, r`\(90^\circ\)`], r`\(\widehat{A} + \widehat{B} = 180^\circ\) và \(\widehat{A} - \widehat{B} = 20^\circ\) nên \(\widehat{A} = (180^\circ + 20^\circ) : 2 = 100^\circ\).`, [
      undefined,
      r`Đó là số đo \(\widehat{B}\).`,
      r`Cộng nhầm \(90^\circ + 20^\circ\).`,
      r`Khi đó \(\widehat{A} - \widehat{B} = 0\).`,
    ]),
    mc(3, CGD, r`Tứ giác \(ABCD\) có \(AB = AD\) và \(CB = CD\). Khẳng định nào sau đây đúng?`, [r`\(AC\) là đường trung trực của \(BD\)`, r`\(BD\) là đường trung trực của \(AC\)`, r`\(AC = BD\)`, r`\(AB = BC\)`], r`\(A\) và \(C\) cùng cách đều \(B\) và \(D\) nên cùng nằm trên đường trung trực của \(BD\); do đó \(AC\) là đường trung trực của \(BD\).`, [
      undefined,
      r`Chưa có \(B\), \(D\) cách đều \(A\) và \(C\).`,
      'Không có dữ kiện về độ dài hai đường chéo.',
      'Không có dữ kiện so sánh hai cạnh kề này.',
    ]),
    mc(3, CGD, r`Tứ giác \(ABCD\) có \(AB = 3\) cm, \(BC = 4\) cm, \(CD = 5\) cm, \(DA = 6\) cm. Độ dài đường chéo \(AC\) có thể là`, [r`\(6\) cm`, r`\(7\) cm`, r`\(8\) cm`, r`\(11\) cm`], r`Trong tam giác \(ABC\): \(AC < AB + BC = 7\) cm; trong tam giác \(ACD\): \(AC > DA - CD = 1\) cm. Chỉ có \(6\) cm thỏa mãn.`, [
      undefined,
      r`Bất đẳng thức tam giác là \(AC < 7\), không được bằng 7.`,
      r`\(AC\) phải nhỏ hơn \(AB + BC = 7\).`,
      r`\(11 = CD + DA\), nhưng \(AC\) còn phải nhỏ hơn \(AB + BC\).`,
    ]),
    mc(4, CGD, 'Một tứ giác lồi có chu vi 20 cm. Tổng độ dài hai đường chéo của nó có thể bằng', [r`\(15\) cm`, r`\(10\) cm`, r`\(20\) cm`, r`\(8\) cm`], r`Trong tứ giác lồi, tổng hai đường chéo lớn hơn nửa chu vi và nhỏ hơn chu vi: \(10 < AC + BD < 20\). Chỉ có \(15\) cm thỏa mãn.`, [
      undefined,
      'Tổng hai đường chéo lớn hơn nửa chu vi, không bằng.',
      'Tổng hai đường chéo nhỏ hơn chu vi, không bằng.',
      'Phải lớn hơn nửa chu vi (10 cm).',
    ]),
    mc(4, CGD, r`Với mọi tứ giác lồi \(ABCD\), khẳng định nào sau đây luôn đúng?`, [r`\(AC + BD > AB + CD\)`, r`\(AC + BD < AB + CD\)`, r`\(AC + BD = AB + CD\)`, r`\(AC > AB + BC\)`], r`Gọi \(O\) là giao điểm hai đường chéo: \(OA + OB > AB\), \(OC + OD > CD\). Cộng vế: \(AC + BD > AB + CD\).`, [
      undefined,
      'Ngược dấu bất đẳng thức.',
      'Hai tổng nói chung không bằng nhau.',
      r`Trái với bất đẳng thức tam giác trong tam giác \(ABC\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, TSG, 'Xét tính đúng sai của các khẳng định:', [
      [r`Tổng các góc của một tứ giác bằng \(360^\circ\).`, true, 'Định lí tổng các góc của tứ giác.'],
      ['Có tứ giác có cả bốn góc nhọn.', false, r`Tổng bốn góc nhọn nhỏ hơn \(360^\circ\).`],
      ['Có tứ giác có cả bốn góc vuông.', true, 'Ví dụ hình chữ nhật.'],
      ['Có tứ giác có cả bốn góc tù.', false, r`Tổng bốn góc tù lớn hơn \(360^\circ\).`],
    ]),
    tf(1, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = 80^\circ\), \(\widehat{B} = 90^\circ\), \(\widehat{C} = 100^\circ\).`, [
      [r`\(\widehat{D} = 90^\circ\).`, true, r`\(360^\circ - 270^\circ\).`],
      [r`\(\widehat{A} + \widehat{C} = 180^\circ\).`, true, r`\(80^\circ + 100^\circ\).`],
      [r`\(\widehat{D}\) là góc nhọn.`, false, r`\(\widehat{D} = 90^\circ\) là góc vuông.`],
      [r`Góc ngoài tại đỉnh \(B\) bằng \(90^\circ\).`, true, r`\(180^\circ - 90^\circ\).`],
    ]),
    tf(2, TSG, r`Tứ giác \(MNPQ\) có \(\widehat{M} = x\), \(\widehat{N} = 2x\), \(\widehat{P} = 3x\), \(\widehat{Q} = 4x\).`, [
      [r`\(10x = 360^\circ\).`, true, 'Tổng bốn góc của tứ giác.'],
      [r`\(x = 36^\circ\).`, true, r`\(360^\circ : 10\).`],
      [r`\(\widehat{Q} = 144^\circ\).`, true, r`\(4\cdot36^\circ\).`],
      [r`\(\widehat{N} = 60^\circ\).`, false, r`\(\widehat{N} = 72^\circ\).`],
    ]),
    tf(2, TSG, r`Tứ giác \(ABCD\) có góc ngoài tại các đỉnh \(A\), \(B\), \(C\) lần lượt bằng \(110^\circ\), \(70^\circ\), \(100^\circ\).`, [
      [r`\(\widehat{A} = 70^\circ\).`, true, r`\(180^\circ - 110^\circ\).`],
      [r`\(\widehat{B} = 110^\circ\).`, true, r`\(180^\circ - 70^\circ\).`],
      [r`\(\widehat{D} = 100^\circ\).`, true, r`\(\widehat{C} = 80^\circ\); \(\widehat{D} = 360^\circ - 70^\circ - 110^\circ - 80^\circ\).`],
      [r`Góc ngoài tại \(D\) bằng \(100^\circ\).`, false, r`Góc ngoài tại \(D\) là \(80^\circ\).`],
    ]),
    tf(3, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = 110^\circ\), \(\widehat{B} = 70^\circ\), \(\widehat{C} = 120^\circ\).`, [
      [r`\(\widehat{D} = 60^\circ\).`, true, r`\(360^\circ - 300^\circ\).`],
      [r`\(AD \parallel BC\).`, true, r`\(\widehat{A} + \widehat{B} = 180^\circ\): hai góc trong cùng phía bù nhau.`],
      [r`\(AB \parallel CD\).`, false, r`\(\widehat{B} + \widehat{C} = 190^\circ \ne 180^\circ\).`],
      [r`\(\widehat{A} + \widehat{B} = \widehat{C} + \widehat{D}\).`, true, r`Cả hai tổng đều bằng \(180^\circ\).`],
    ]),
    tf(3, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = 100^\circ\), \(\widehat{B} = 80^\circ\). Các tia phân giác của góc \(C\) và góc \(D\) cắt nhau tại \(K\).`, [
      [r`\(\widehat{C} + \widehat{D} = 180^\circ\).`, true, r`\(360^\circ - 180^\circ\).`],
      [r`\(\widehat{KCD} + \widehat{KDC} = 90^\circ\).`, true, 'Bằng nửa tổng \\(\\widehat{C} + \\widehat{D}\\).'],
      [r`\(\widehat{CKD} = 90^\circ\).`, true, r`\(180^\circ - 90^\circ\).`],
      [r`\(\widehat{CKD} = 100^\circ\).`, false, r`\(\widehat{CKD} = 90^\circ\).`],
    ]),
    tf(2, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = \widehat{B} = \widehat{C} = 80^\circ\).`, [
      [r`\(\widehat{D} = 120^\circ\).`, true, r`\(360^\circ - 240^\circ\).`],
      [r`\(\widehat{D}\) là góc tù.`, true, r`\(120^\circ > 90^\circ\).`],
      ['Tứ giác có ba góc nhọn.', true, r`Ba góc \(80^\circ\).`],
      [r`\(\widehat{A} + \widehat{B} + \widehat{C} = 270^\circ\).`, false, r`Tổng là \(240^\circ\).`],
    ]),
    tf(3, CGD, r`Tứ giác \(ABCD\) có \(AB = AD\) và \(CB = CD\).`, [
      [r`\(A\) thuộc đường trung trực của \(BD\).`, true, r`\(A\) cách đều \(B\) và \(D\).`],
      [r`\(AC \perp BD\).`, true, r`\(AC\) là đường trung trực của \(BD\).`],
      [r`\(\triangle ABC = \triangle ADC\).`, true, 'Trường hợp cạnh – cạnh – cạnh.'],
      [r`\(AB = CB\).`, false, 'Không có dữ kiện; nói chung hai cạnh kề này khác nhau.'],
    ]),
    tf(4, CGD, r`Cho tứ giác lồi \(ABCD\), \(O\) là giao điểm hai đường chéo.`, [
      [r`\(OA + OB > AB\).`, true, r`Bất đẳng thức tam giác trong \(\triangle OAB\).`],
      [r`\(AC + BD > AB + CD\).`, true, r`Cộng \(OA + OB > AB\) và \(OC + OD > CD\).`],
      [r`\(AC < AB + BC\).`, true, r`Bất đẳng thức tam giác trong \(\triangle ABC\).`],
      [r`\(AC + BD\) lớn hơn chu vi tứ giác.`, false, 'Tổng hai đường chéo nhỏ hơn chu vi.'],
    ]),
    tf(3, CGD, r`Tứ giác \(ABCD\) có \(AB = 2\), \(BC = 3\), \(CD = 4\), \(DA = 5\) (cm).`, [
      [r`\(AC < 5\) cm.`, true, r`\(AC < AB + BC = 5\).`],
      [r`\(AC > 1\) cm.`, true, r`\(AC > DA - CD = 1\).`],
      [r`\(BD < 7\) cm.`, true, r`\(BD < AB + AD = 7\).`],
      [r`\(BD\) có thể bằng 8 cm.`, false, r`\(BD < 7\) cm.`],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = 75^\circ\), \(\widehat{B} = 95^\circ\), \(\widehat{C} = 105^\circ\). Tính số đo \(\widehat{D}\) (độ).`, '85', r`\(\widehat{D} = 360^\circ - 275^\circ = 85^\circ\).`, DEG),
    sa(2, TSG, r`Các góc của một tứ giác tỉ lệ với \(3 : 4 : 5 : 6\). Tính số đo góc lớn nhất (độ).`, '120', r`Mỗi phần \(360^\circ : 18 = 20^\circ\); góc lớn nhất \(6\cdot20^\circ = 120^\circ\).`, DEG),
    sa(2, TSG, r`Tứ giác \(ABCD\) có \(\widehat{C} = \widehat{D} = 75^\circ\) và \(\widehat{A} = \widehat{B} + 30^\circ\). Tính số đo \(\widehat{A}\) (độ).`, '120', r`\(\widehat{A} + \widehat{B} = 210^\circ\) và \(\widehat{A} - \widehat{B} = 30^\circ\) nên \(\widehat{A} = 120^\circ\).`, DEG),
    sa(3, TSG, r`Tứ giác \(ABCD\) có \(\widehat{C} = 100^\circ\), \(\widehat{D} = 70^\circ\). Các tia phân giác của góc \(A\) và góc \(B\) cắt nhau tại \(I\). Tính \(\widehat{AIB}\) (độ).`, '85', r`\(\widehat{AIB} = 180^\circ - \dfrac{\widehat{A} + \widehat{B}}{2} = \dfrac{\widehat{C} + \widehat{D}}{2} = 85^\circ\).`, DEG),
    sa(3, TSG, r`Tứ giác \(ABCD\) có góc ngoài tại các đỉnh \(A\), \(B\), \(C\) lần lượt bằng \(100^\circ\), \(95^\circ\), \(85^\circ\). Tính số đo góc trong \(\widehat{D}\) (độ).`, '100', r`Tổng bốn góc ngoài bằng \(360^\circ\) nên góc ngoài tại \(D\) là \(80^\circ\); góc trong \(\widehat{D} = 100^\circ\).`, DEG),
    sa(3, CGD, r`Tứ giác \(ABCD\) có \(AB = 4\), \(BC = 7\), \(CD = 6\), \(DA = 3\) (cm). Biết độ dài đường chéo \(AC\) là một số nguyên (cm). Tìm giá trị lớn nhất có thể của \(AC\).`, '8', r`\(AC < AB + BC = 11\) và \(AC < AD + DC = 9\) nên \(AC \le 8\). Khi \(AC = 8\) cả hai tam giác \(ABC\), \(ACD\) đều tồn tại (\(8 > 7 - 4\), \(8 > 6 - 3\)).`, CM),
    sa(4, CGD, r`Một tứ giác lồi có chu vi 18 cm. Biết tổng độ dài hai đường chéo là một số nguyên (cm). Tổng đó nhỏ nhất có thể bằng bao nhiêu?`, '10', r`Tổng hai đường chéo lớn hơn nửa chu vi (9 cm) nên nhỏ nhất là 10 cm.`, CM),
    // ---- Tự luận ----
    es(2, TSG, r`Tứ giác \(ABCD\) có \(\widehat{A} = 65^\circ\), \(\widehat{B} = 117^\circ\), \(\widehat{C} = 71^\circ\).
a) Tính \(\widehat{D}\). b) Tính số đo góc ngoài tại đỉnh \(D\).`, r`a) \(\widehat{D} = 360^\circ - (65^\circ + 117^\circ + 71^\circ) = 360^\circ - 253^\circ = 107^\circ\).
b) Góc ngoài tại \(D\): \(180^\circ - 107^\circ = 73^\circ\).`, r`0,5 điểm: tính đúng \(\widehat{D} = 107^\circ\).
0,5 điểm: tính đúng góc ngoài \(73^\circ\).`),
    es(3, TSG, r`Tứ giác \(ABCD\) có các góc tỉ lệ \(\widehat{A} : \widehat{B} : \widehat{C} : \widehat{D} = 2 : 3 : 3 : 2\).
a) Tính các góc của tứ giác. b) Chứng minh \(AD \parallel BC\).`, r`a) Mỗi phần \(360^\circ : 10 = 36^\circ\): \(\widehat{A} = 72^\circ\), \(\widehat{B} = 108^\circ\), \(\widehat{C} = 108^\circ\), \(\widehat{D} = 72^\circ\).
b) \(\widehat{A} + \widehat{B} = 180^\circ\); đây là hai góc trong cùng phía tạo bởi cát tuyến \(AB\) với hai đường thẳng \(AD\), \(BC\) nên \(AD \parallel BC\).`, r`0,5 điểm: tính đúng bốn góc.
0,5 điểm: chỉ ra hai góc trong cùng phía bù nhau và kết luận song song.`),
    es(4, CGD, r`Chứng minh rằng trong một tứ giác lồi, tổng hai đường chéo lớn hơn tổng hai cạnh đối bất kì.`, r`Xét tứ giác lồi \(ABCD\), \(O\) là giao điểm hai đường chéo.
Trong \(\triangle OAB\): \(OA + OB > AB\); trong \(\triangle OCD\): \(OC + OD > CD\).
Cộng vế: \((OA + OC) + (OB + OD) > AB + CD\), tức \(AC + BD > AB + CD\).
Tương tự với hai tam giác \(OAD\), \(OBC\): \(AC + BD > AD + BC\).`, r`0,5 điểm: viết đúng hai bất đẳng thức tam giác có đỉnh \(O\).
0,5 điểm: cộng vế, kết luận và nêu tương tự cho cặp cạnh đối còn lại.`),
    ge(3, TSG, r`Tứ giác \(ABCD\) có \(\widehat{C} = 80^\circ\), \(\widehat{D} = 70^\circ\). Các tia phân giác của các góc ngoài tại đỉnh \(A\) và đỉnh \(B\) cắt nhau tại \(K\). Tính \(\widehat{AKB}\).`, `A(0,0) B(6,0) C(5.5,4) D(1,3.5) K(2.6,-2.4)
ABCDA AK BK
goc(A,K,B)`, r`\(\widehat{A} + \widehat{B} = 360^\circ - 80^\circ - 70^\circ = 210^\circ\).
Góc ngoài tại \(A\) bằng \(180^\circ - \widehat{A}\), tại \(B\) bằng \(180^\circ - \widehat{B}\).
\(\widehat{KAB} + \widehat{KBA} = \dfrac{360^\circ - (\widehat{A} + \widehat{B})}{2} = \dfrac{150^\circ}{2} = 75^\circ\).
Trong \(\triangle AKB\): \(\widehat{AKB} = 180^\circ - 75^\circ = 105^\circ\).`, r`0,25 điểm: tính được \(\widehat{A} + \widehat{B} = 210^\circ\).
0,5 điểm: tính được \(\widehat{KAB} + \widehat{KBA} = 75^\circ\) từ tính chất tia phân giác góc ngoài.
0,25 điểm: kết luận \(\widehat{AKB} = 105^\circ\).`),
  ],
};

const TG11 = 'tinh-goc-canh-hinh-thang';
const CB11 = 'chung-minh-doan-thang-goc-bang-nhau-hinh-thang-can';
const CT11 = 'chung-minh-hinh-thang-can';

const B11: BankLesson = {
  slug: 'bai-11-hinh-thang-can',
  questions: [
    mc(1, TG11, 'Hình thang là tứ giác có', ['hai cạnh đối song song', 'hai cạnh kề bằng nhau', 'bốn cạnh bằng nhau', 'hai đường chéo bằng nhau'], 'Theo định nghĩa, hình thang là tứ giác có hai cạnh đối song song.', [
      undefined,
      'Đó không phải dấu hiệu của hình thang.',
      'Đó là hình thoi.',
      'Hai đường chéo bằng nhau không đủ để có cạnh song song.',
    ]),
    mc(1, TG11, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 120^\circ\). Số đo \(\widehat{D}\) là`, [r`\(60^\circ\)`, r`\(120^\circ\)`, r`\(30^\circ\)`, r`\(240^\circ\)`], r`Hai góc kề cạnh bên \(AD\) bù nhau: \(\widehat{D} = 180^\circ - 120^\circ = 60^\circ\).`, [
      undefined,
      'Hai góc kề một cạnh bên bù nhau chứ không bằng nhau.',
      r`Đã lấy \(90^\circ\) trừ.`,
      r`Đã lấy \(360^\circ\) trừ.`,
    ]),
    mc(1, TG11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{C} = 70^\circ\). Số đo \(\widehat{D}\) là`, [r`\(70^\circ\)`, r`\(110^\circ\)`, r`\(20^\circ\)`, r`\(140^\circ\)`], r`Trong hình thang cân, hai góc kề một đáy bằng nhau: \(\widehat{D} = \widehat{C} = 70^\circ\).`, [
      undefined,
      r`\(110^\circ\) là số đo \(\widehat{A}\), \(\widehat{B}\).`,
      'Không có lí do để lấy góc phụ.',
      'Nhân đôi không đúng.',
    ]),
    mc(1, TG11, 'Khẳng định nào sau đây là SAI?', ['Trong hình thang cân, hai đáy luôn bằng nhau.', 'Trong hình thang cân, hai cạnh bên bằng nhau.', 'Trong hình thang cân, hai đường chéo bằng nhau.', 'Trong hình thang cân, hai góc kề một đáy bằng nhau.'], 'Hai đáy của hình thang cân nói chung khác nhau; ba khẳng định còn lại là tính chất của hình thang cân.', [
      'Khẳng định sai: hai đáy nói chung không bằng nhau.',
      'Đây là tính chất đúng.',
      'Đây là tính chất đúng.',
      'Đây là định nghĩa hình thang cân.',
    ]),
    mc(2, TG11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 3\widehat{D}\). Số đo \(\widehat{D}\) là`, [r`\(45^\circ\)`, r`\(60^\circ\)`, r`\(135^\circ\)`, r`\(30^\circ\)`], r`\(\widehat{A} + \widehat{D} = 180^\circ\), \(\widehat{A} = 3\widehat{D}\) nên \(4\widehat{D} = 180^\circ\), \(\widehat{D} = 45^\circ\).`, [
      undefined,
      r`Chia nhầm \(180^\circ\) cho 3.`,
      r`Đó là số đo \(\widehat{A}\).`,
      r`Chia nhầm \(180^\circ\) cho 6.`,
    ]),
    mc(2, TG11, r`Hình thang vuông \(ABCD\) có \(\widehat{A} = \widehat{D} = 90^\circ\), \(AB \parallel CD\) và \(\widehat{B} = 2\widehat{C}\). Số đo \(\widehat{C}\) là`, [r`\(60^\circ\)`, r`\(120^\circ\)`, r`\(90^\circ\)`, r`\(45^\circ\)`], r`\(\widehat{B} + \widehat{C} = 180^\circ\) (kề cạnh bên \(BC\)) và \(\widehat{B} = 2\widehat{C}\) nên \(\widehat{C} = 60^\circ\).`, [
      undefined,
      r`Đó là số đo \(\widehat{B}\).`,
      r`Khi đó \(\widehat{B} = 180^\circ\), vô lí.`,
      r`Chia nhầm cho 4.`,
    ]),
    mc(2, TG11, 'Diện tích hình thang có hai đáy 6 cm và 10 cm, chiều cao 4 cm là', [r`\(32\) cm²`, r`\(64\) cm²`, r`\(240\) cm²`, r`\(16\) cm²`], r`\(S = \dfrac{(6 + 10)\cdot4}{2} = 32\) (cm²).`, [
      undefined,
      'Quên chia 2.',
      'Đã nhân cả ba số.',
      'Mới tính tổng hai đáy.',
    ]),
    mc(3, TG11, r`Hình thang cân có đáy nhỏ 4 cm, đáy lớn 10 cm, góc kề đáy lớn bằng \(45^\circ\). Chiều cao của hình thang là`, [r`\(3\) cm`, r`\(6\) cm`, r`\(4\) cm`, r`\(7\) cm`], r`Hạ hai đường cao từ hai đỉnh đáy nhỏ: phần đáy lớn mỗi bên là \((10 - 4) : 2 = 3\) cm. Tam giác vuông có góc \(45^\circ\) là tam giác vuông cân nên chiều cao bằng 3 cm.`, [
      undefined,
      'Chưa chia đôi hiệu hai đáy.',
      'Nhầm chiều cao với đáy nhỏ.',
      'Đó là trung bình cộng hai đáy.',
    ]),
    mc(2, TG11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(AC = 8\) cm. Độ dài \(BD\) là`, [r`\(8\) cm`, r`\(4\) cm`, r`\(16\) cm`, 'Không xác định được'], r`Hai đường chéo của hình thang cân bằng nhau nên \(BD = AC = 8\) cm.`, [
      undefined,
      'Hai đường chéo bằng nhau, không chia đôi.',
      'Hai đường chéo bằng nhau, không nhân đôi.',
      'Tính chất hình thang cân cho biết hai đường chéo bằng nhau.',
    ]),
    mc(2, CT11, 'Dấu hiệu nào sau đây khẳng định một tứ giác là hình thang cân?', ['Hình thang có hai đường chéo bằng nhau', 'Hình thang có hai cạnh bên bằng nhau', 'Tứ giác có hai đường chéo bằng nhau', 'Tứ giác có hai góc bằng nhau'], 'Hình thang có hai đường chéo bằng nhau là hình thang cân.', [
      undefined,
      'Hình bình hành cũng có hai cạnh bên bằng nhau nhưng không phải hình thang cân.',
      'Tứ giác cần là hình thang trước.',
      'Hai góc bằng nhau phải là hai góc kề một đáy của một hình thang.',
    ]),
    mc(2, CT11, r`Tam giác \(ABC\) cân tại \(A\). Trên \(AB\), \(AC\) lấy \(D\), \(E\) sao cho \(AD = AE\). Tứ giác \(BDEC\) là`, ['hình thang cân', 'hình bình hành', 'hình thang vuông', 'hình chữ nhật'], r`\(\triangle ADE\) cân tại \(A\) nên \(\widehat{ADE} = \widehat{ABC}\), suy ra \(DE \parallel BC\). Hình thang \(BDEC\) có \(\widehat{B} = \widehat{C}\) nên là hình thang cân.`, [
      undefined,
      r`\(DE < BC\) nên không phải hình bình hành.`,
      'Không có góc vuông.',
      'Không có góc vuông.',
    ]),
    mc(3, CT11, r`Tứ giác \(ABCD\) có \(AB \parallel CD\) và \(\widehat{C} = \widehat{D}\). Khẳng định nào sau đây đúng?`, [r`\(ABCD\) là hình thang cân`, r`\(ABCD\) là hình bình hành`, r`\(ABCD\) là hình thang vuông`, r`\(ABCD\) không phải hình thang`], r`\(AB \parallel CD\) nên \(ABCD\) là hình thang; hai góc kề đáy \(CD\) bằng nhau nên là hình thang cân.`, [
      undefined,
      'Không có hai cặp cạnh đối song song.',
      'Không có dữ kiện góc vuông.',
      r`Có \(AB \parallel CD\) nên là hình thang.`,
    ]),
    mc(3, CB11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có hai đường chéo cắt nhau tại \(O\). Khẳng định nào sau đây đúng?`, [r`\(OA = OB\)`, r`\(OA = OC\)`, r`\(OA = AB\)`, r`\(OC = CD\)`], r`\(\triangle ADC = \triangle BCD\) (c.g.c) nên \(\widehat{ACD} = \widehat{BDC}\), suy ra \(OC = OD\); kết hợp \(AC = BD\) được \(OA = OB\).`, [
      undefined,
      r`\(O\) chia đường chéo theo tỉ số hai đáy, nói chung không là trung điểm.`,
      'Không có dữ kiện.',
      'Không có dữ kiện.',
    ]),
    mc(3, CB11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\), \(AB < CD\)) có hai cạnh bên kéo dài cắt nhau tại \(E\). Tam giác \(EAB\) là`, [r`tam giác cân tại \(E\)`, 'tam giác đều', 'tam giác vuông', r`tam giác cân tại \(A\)`], r`\(\widehat{EAB} = \widehat{EDC}\), \(\widehat{EBA} = \widehat{ECD}\) (đồng vị) và \(\widehat{EDC} = \widehat{ECD}\) nên \(\widehat{EAB} = \widehat{EBA}\): tam giác cân tại \(E\).`, [
      undefined,
      'Chưa có góc nào bằng \\(60^\\circ\\).',
      'Không có góc vuông.',
      'Hai góc bằng nhau là hai góc tại \\(A\\) và \\(B\\).',
    ]),
    mc(4, CB11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có hai đường chéo vuông góc với nhau tại \(O\). Tam giác \(OAB\) là`, ['tam giác vuông cân', 'tam giác đều', 'tam giác vuông không cân', 'tam giác tù'], r`Trong hình thang cân \(OA = OB\); lại có \(\widehat{AOB} = 90^\circ\) nên tam giác \(OAB\) vuông cân tại \(O\).`, [
      undefined,
      r`Góc ở đỉnh \(O\) là \(90^\circ\).`,
      r`\(OA = OB\) nên tam giác cân.`,
      r`Góc lớn nhất là \(90^\circ\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, TG11, 'Xét tính đúng sai:', [
      ['Hình thang có hai cạnh bên song song thì hai đáy bằng nhau.', true, 'Khi đó hình thang là hình bình hành.'],
      ['Hình thang vuông có hai góc vuông.', true, 'Một góc vuông kéo theo góc kề cùng cạnh bên cũng vuông.'],
      ['Hình thang cân có hai cạnh bên bằng nhau.', true, 'Tính chất của hình thang cân.'],
      ['Hình thang có hai cạnh bên bằng nhau là hình thang cân.', false, 'Hình bình hành có hai cạnh bên bằng nhau nhưng không phải hình thang cân.'],
    ]),
    tf(1, TG11, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 105^\circ\), \(\widehat{B} = 125^\circ\).`, [
      [r`\(\widehat{D} = 75^\circ\).`, true, r`\(180^\circ - 105^\circ\).`],
      [r`\(\widehat{C} = 55^\circ\).`, true, r`\(180^\circ - 125^\circ\).`],
      [r`\(\widehat{A} + \widehat{C} = 180^\circ\).`, false, r`\(105^\circ + 55^\circ = 160^\circ\).`],
      [r`\(ABCD\) là hình thang cân.`, false, r`\(\widehat{C} \ne \widehat{D}\).`],
    ]),
    tf(2, TG11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{D} = 65^\circ\).`, [
      [r`\(\widehat{C} = 65^\circ\).`, true, 'Hai góc kề đáy \\(CD\\) bằng nhau.'],
      [r`\(\widehat{A} = 115^\circ\).`, true, r`\(180^\circ - 65^\circ\).`],
      [r`\(\widehat{B} = 65^\circ\).`, false, r`\(\widehat{B} = \widehat{A} = 115^\circ\).`],
      [r`\(\widehat{A} + \widehat{C} = 180^\circ\).`, true, r`\(115^\circ + 65^\circ\).`],
    ]),
    tf(2, TG11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(AB = 6\) cm, \(CD = 12\) cm, \(AD = 5\) cm.`, [
      [r`\(BC = 5\) cm.`, true, 'Hai cạnh bên bằng nhau.'],
      ['Chu vi hình thang là 28 cm.', true, r`\(6 + 12 + 5 + 5\).`],
      [r`\(AC = BD\).`, true, 'Hai đường chéo bằng nhau.'],
      [r`\(AC = 5\) cm.`, false, 'Đường chéo khác cạnh bên.'],
    ]),
    tf(3, TG11, r`Hình thang cân \(ABCD\) có đáy nhỏ \(AB = 4\) cm, đáy lớn \(CD = 12\) cm, chiều cao 3 cm. Kẻ \(AH \perp CD\), \(BK \perp CD\).`, [
      [r`\(DH = 4\) cm.`, true, r`\((12 - 4) : 2\).`],
      ['Diện tích hình thang là 24 cm².', true, r`\(\dfrac{(4 + 12)\cdot3}{2}\).`],
      [r`\(HK = 4\) cm.`, true, r`\(HK = AB\).`],
      ['Diện tích hình thang là 48 cm².', false, 'Quên chia 2.'],
    ]),
    tf(2, CT11, 'Xét tính đúng sai của các dấu hiệu:', [
      ['Hình thang có hai góc kề một đáy bằng nhau là hình thang cân.', true, 'Định nghĩa hình thang cân.'],
      ['Hình thang có hai đường chéo bằng nhau là hình thang cân.', true, 'Dấu hiệu nhận biết.'],
      ['Tứ giác có hai góc kề một cạnh bằng nhau là hình thang cân.', false, 'Tứ giác cần là hình thang trước.'],
      ['Hình thang có hai cạnh bên bằng nhau là hình thang cân.', false, 'Hình bình hành là phản ví dụ.'],
    ]),
    tf(3, CT11, r`Tam giác \(ABC\) cân tại \(A\). Một đường thẳng song song với \(BC\) cắt \(AB\), \(AC\) lần lượt tại \(M\), \(N\).`, [
      [r`\(BMNC\) là hình thang.`, true, r`\(MN \parallel BC\).`],
      [r`\(\widehat{AMN} = \widehat{ABC}\).`, true, 'Hai góc đồng vị.'],
      [r`\(BMNC\) là hình thang cân.`, true, r`\(\widehat{B} = \widehat{C}\).`],
      [r`\(MN = BC\).`, false, r`\(MN < BC\).`],
    ]),
    tf(3, CB11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)), \(O\) là giao điểm hai đường chéo.`, [
      [r`\(\triangle ADC = \triangle BCD\).`, true, r`c.g.c: \(AD = BC\), \(\widehat{ADC} = \widehat{BCD}\), \(DC\) chung.`],
      [r`\(\widehat{ACD} = \widehat{BDC}\).`, true, 'Hai góc tương ứng.'],
      [r`\(\triangle OCD\) cân tại \(O\).`, true, 'Có hai góc ở đáy bằng nhau.'],
      [r`\(OA = OC\).`, false, r`Nói chung \(O\) không là trung điểm của \(AC\).`],
    ]),
    tf(4, CB11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\), \(AB < CD\)), \(E\) là giao điểm của \(AD\) và \(BC\), \(O\) là giao điểm hai đường chéo.`, [
      [r`\(EA = EB\).`, true, r`\(\triangle EAB\) cân tại \(E\).`],
      [r`\(ED = EC\).`, true, r`\(\triangle EDC\) cân tại \(E\).`],
      [r`\(EO\) là đường trung trực của \(AB\).`, true, r`\(E\) và \(O\) cùng cách đều \(A\), \(B\).`],
      [r`\(E\), \(O\) và trung điểm của \(AD\) thẳng hàng.`, false, r`\(EO\) đi qua trung điểm của \(AB\), \(CD\), không qua trung điểm của \(AD\).`],
    ]),
    tf(2, TG11, r`Hình thang vuông \(ABCD\) có \(\widehat{A} = \widehat{D} = 90^\circ\) và \(\widehat{B} = 120^\circ\).`, [
      [r`\(AB \parallel CD\).`, true, r`\(\widehat{A} + \widehat{D} = 180^\circ\).`],
      [r`\(\widehat{C} = 60^\circ\).`, true, r`\(360^\circ - 300^\circ\).`],
      [r`\(\widehat{C} = 120^\circ\).`, false, r`\(\widehat{C} = 60^\circ\).`],
      [r`Tổng bốn góc bằng \(360^\circ\).`, true, 'Tổng các góc của tứ giác.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, TG11, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 130^\circ\). Tính \(\widehat{D}\) (độ).`, '50', r`\(\widehat{D} = 180^\circ - 130^\circ = 50^\circ\).`, DEG),
    sa(2, TG11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} - \widehat{D} = 40^\circ\). Tính \(\widehat{A}\) (độ).`, '110', r`\(\widehat{A} + \widehat{D} = 180^\circ\), \(\widehat{A} - \widehat{D} = 40^\circ\) nên \(\widehat{A} = 110^\circ\).`, DEG),
    sa(2, TG11, 'Tính diện tích hình thang có hai đáy 7 cm và 13 cm, chiều cao 6 cm.', '60', r`\(S = \dfrac{(7 + 13)\cdot6}{2} = 60\) (cm²).`, CM2),
    sa(2, TG11, 'Hình thang cân có hai đáy 8 cm và 14 cm, cạnh bên 5 cm. Tính chu vi hình thang.', '32', r`Hai cạnh bên bằng nhau: chu vi \(8 + 14 + 5 + 5 = 32\) (cm).`, CM),
    sa(3, TG11, r`Hình thang cân \(ABCD\) có đáy nhỏ \(AB = 5\) cm, đáy lớn \(CD = 11\) cm, \(\widehat{D} = 45^\circ\). Tính chiều cao của hình thang.`, '3', r`Hạ đường cao \(AH\): \(DH = (11 - 5) : 2 = 3\) cm. Tam giác \(ADH\) vuông cân tại \(H\) nên \(AH = 3\) cm.`, CM),
    sa(3, TG11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có hai cạnh bên kéo dài cắt nhau tại \(E\) và \(\widehat{AEB} = 40^\circ\). Tính \(\widehat{D}\) (độ).`, '70', r`Tam giác \(EDC\) cân tại \(E\) nên \(\widehat{D} = (180^\circ - 40^\circ) : 2 = 70^\circ\).`, DEG),
    sa(3, CB11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(AC = 10\) cm, \(O\) là giao điểm hai đường chéo và \(OA = 3\) cm. Tính \(OD\).`, '7', r`\(OC = 10 - 3 = 7\) cm và trong hình thang cân \(OD = OC = 7\) cm.`, CM),
    // ---- Tự luận ----
    es(2, TG11, r`Hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{A} = 125^\circ\). Tính các góc còn lại của hình thang.`, r`\(\widehat{B} = \widehat{A} = 125^\circ\) (hai góc kề đáy \(AB\)).
\(\widehat{D} = 180^\circ - 125^\circ = 55^\circ\) (kề cạnh bên \(AD\)); \(\widehat{C} = \widehat{D} = 55^\circ\).`, r`0,5 điểm: tính đúng \(\widehat{B}\) và \(\widehat{D}\).
0,5 điểm: tính đúng \(\widehat{C}\), nêu đủ lí do.`),
    es(3, CT11, r`Cho tam giác \(ABC\) cân tại \(A\). Trên các cạnh \(AB\), \(AC\) lấy các điểm \(D\), \(E\) sao cho \(BD = CE\). Chứng minh \(BDEC\) là hình thang cân.`, r`\(AD = AB - BD = AC - CE = AE\) nên \(\triangle ADE\) cân tại \(A\): \(\widehat{ADE} = \dfrac{180^\circ - \widehat{A}}{2} = \widehat{ABC}\).
Hai góc ở vị trí đồng vị bằng nhau nên \(DE \parallel BC\): \(BDEC\) là hình thang.
Hình thang có \(\widehat{B} = \widehat{C}\) (tam giác \(ABC\) cân) nên là hình thang cân.`, r`0,25 điểm: chứng minh \(AD = AE\).
0,5 điểm: chứng minh \(DE \parallel BC\).
0,25 điểm: kết luận hình thang cân.`),
    es(4, CB11, r`Cho hình thang cân \(ABCD\) (\(AB \parallel CD\), \(AB < CD\)). Kẻ \(AH \perp CD\), \(BK \perp CD\) (\(H, K \in CD\)). Chứng minh \(DH = CK\) và \(DK = \dfrac{AB + CD}{2}\).`, r`Hai tam giác vuông \(ADH\), \(BCK\) có \(AD = BC\), \(\widehat{D} = \widehat{C}\) nên bằng nhau (cạnh huyền – góc nhọn), suy ra \(DH = CK\).
\(ABKH\) có \(AB \parallel HK\), \(AH \parallel BK\) và hai góc vuông nên \(HK = AB\).
\(DH = CK = \dfrac{CD - AB}{2}\), do đó \(DK = DH + HK = \dfrac{CD - AB}{2} + AB = \dfrac{AB + CD}{2}\).`, r`0,5 điểm: chứng minh \(DH = CK\).
0,5 điểm: chỉ ra \(HK = AB\) và tính được \(DK\).`),
  ],
};

const TG12 = 'tinh-goc-canh-hinh-binh-hanh';
const DT12 = 'dung-tinh-chat-hinh-binh-hanh';
const CH12 = 'chung-minh-hinh-binh-hanh';
const TH12 = 'thang-hang-dong-quy-hinh-binh-hanh';

const B12: BankLesson = {
  slug: 'bai-12-hinh-binh-hanh',
  questions: [
    mc(1, TG12, 'Hình bình hành là tứ giác có', ['các cạnh đối song song', 'hai cạnh đối bằng nhau', 'hai đường chéo bằng nhau', 'bốn góc bằng nhau'], 'Theo định nghĩa, hình bình hành là tứ giác có các cạnh đối song song.', [
      undefined,
      'Chỉ một cặp cạnh đối bằng nhau chưa đủ.',
      'Đó là tính chất của hình chữ nhật.',
      'Đó là hình chữ nhật.',
    ]),
    mc(1, TG12, r`Hình bình hành \(ABCD\) có \(\widehat{A} = 70^\circ\). Số đo \(\widehat{C}\) là`, [r`\(70^\circ\)`, r`\(110^\circ\)`, r`\(20^\circ\)`, r`\(140^\circ\)`], r`Các góc đối của hình bình hành bằng nhau: \(\widehat{C} = \widehat{A} = 70^\circ\).`, [
      undefined,
      r`\(110^\circ\) là số đo \(\widehat{B}\), \(\widehat{D}\).`,
      'Không có lí do lấy góc phụ.',
      'Góc đối bằng nhau, không gấp đôi.',
    ]),
    mc(1, TG12, r`Hình bình hành \(ABCD\) có \(\widehat{A} = 70^\circ\). Số đo \(\widehat{B}\) là`, [r`\(110^\circ\)`, r`\(70^\circ\)`, r`\(20^\circ\)`, r`\(290^\circ\)`], r`Hai góc kề một cạnh bù nhau: \(\widehat{B} = 180^\circ - 70^\circ = 110^\circ\).`, [
      undefined,
      r`\(\widehat{B}\) kề \(\widehat{A}\), không đối diện.`,
      'Không có lí do lấy góc phụ.',
      r`Đã lấy \(360^\circ\) trừ.`,
    ]),
    mc(2, TG12, r`Hình bình hành \(ABCD\) có \(\widehat{A} - \widehat{B} = 40^\circ\). Số đo \(\widehat{A}\) là`, [r`\(110^\circ\)`, r`\(70^\circ\)`, r`\(140^\circ\)`, r`\(40^\circ\)`], r`\(\widehat{A} + \widehat{B} = 180^\circ\), \(\widehat{A} - \widehat{B} = 40^\circ\) nên \(\widehat{A} = 110^\circ\).`, [
      undefined,
      r`Đó là \(\widehat{B}\).`,
      r`Cộng nhầm \(100^\circ + 40^\circ\).`,
      'Đó là hiệu hai góc.',
    ]),
    mc(2, TG12, 'Hình bình hành có hai cạnh kề dài 5 cm và 7 cm. Chu vi hình bình hành là', [r`\(24\) cm`, r`\(12\) cm`, r`\(35\) cm`, r`\(20\) cm`], r`Các cạnh đối bằng nhau: chu vi \(= 2(5 + 7) = 24\) cm.`, [
      undefined,
      'Quên nhân 2.',
      'Đó là tích hai cạnh.',
      r`Tính nhầm \(4\cdot5\).`,
    ]),
    mc(2, DT12, r`Hình bình hành \(ABCD\) có hai đường chéo cắt nhau tại \(O\), \(AC = 10\) cm, \(BD = 6\) cm. Tổng \(OA + OB\) bằng`, [r`\(8\) cm`, r`\(16\) cm`, r`\(5\) cm`, r`\(3\) cm`], r`\(O\) là trung điểm mỗi đường chéo: \(OA = 5\), \(OB = 3\), tổng 8 cm.`, [
      undefined,
      'Chưa chia đôi các đường chéo.',
      r`Đó chỉ là \(OA\).`,
      r`Đó chỉ là \(OB\).`,
    ]),
    mc(2, DT12, r`Hình bình hành \(ABCD\) có hai đường chéo cắt nhau tại \(O\). Khẳng định nào sau đây luôn đúng?`, [r`\(OA = OC\)`, r`\(OA = OB\)`, r`\(AC = BD\)`, r`\(AC \perp BD\)`], r`Hai đường chéo của hình bình hành cắt nhau tại trung điểm mỗi đường nên \(OA = OC\).`, [
      undefined,
      'Chỉ đúng khi hình bình hành là hình chữ nhật.',
      'Chỉ đúng khi là hình chữ nhật.',
      'Chỉ đúng khi là hình thoi.',
    ]),
    mc(2, CH12, 'Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường là', ['hình bình hành', 'hình thang cân', 'hình thang vuông', 'tứ giác không đặc biệt'], 'Đây là một dấu hiệu nhận biết hình bình hành.', [
      undefined,
      'Hai đường chéo hình thang cân nói chung không cắt nhau tại trung điểm.',
      'Không có dữ kiện góc vuông.',
      'Có dấu hiệu nhận biết hình bình hành.',
    ]),
    mc(2, CH12, 'Tứ giác nào sau đây chắc chắn là hình bình hành?', ['Tứ giác có một cặp cạnh đối vừa song song vừa bằng nhau', 'Tứ giác có hai cạnh đối song song, hai cạnh đối kia bằng nhau', 'Tứ giác có một cặp góc đối bằng nhau', 'Tứ giác có hai đường chéo bằng nhau'], 'Tứ giác có hai cạnh đối song song và bằng nhau là hình bình hành.', [
      undefined,
      'Hình thang cân cũng có tính chất này.',
      'Cần cả hai cặp góc đối bằng nhau.',
      'Hình thang cân cũng có hai đường chéo bằng nhau.',
    ]),
    mc(3, CH12, r`Tứ giác \(ABCD\) có \(\widehat{A} = \widehat{C} = 110^\circ\) và \(\widehat{B} = \widehat{D} = 70^\circ\). Tứ giác \(ABCD\) là`, ['hình bình hành', 'hình thang cân', 'hình chữ nhật', 'tứ giác không có cạnh nào song song'], 'Tứ giác có các góc đối bằng nhau là hình bình hành.', [
      undefined,
      'Hai góc bằng nhau ở đây là hai góc đối, không phải hai góc kề một đáy.',
      'Không có góc vuông.',
      r`\(\widehat{A} + \widehat{B} = 180^\circ\) nên \(AD \parallel BC\).`,
    ]),
    mc(3, DT12, r`Hình bình hành \(ABCD\) có \(E\), \(F\) lần lượt là trung điểm của \(AB\), \(CD\). Tứ giác \(AECF\) là`, ['hình bình hành', 'hình thang cân', 'hình chữ nhật', 'tứ giác không có cạnh nào song song'], r`\(AE = \dfrac{AB}{2} = \dfrac{CD}{2} = CF\) và \(AE \parallel CF\) nên \(AECF\) là hình bình hành.`, [
      undefined,
      'Có hai cạnh đối song song và bằng nhau.',
      'Không có góc vuông.',
      r`\(AE \parallel CF\).`,
    ]),
    mc(3, TH12, r`Hình bình hành \(ABCD\) có tâm \(O\). Một đường thẳng qua \(O\) cắt \(AB\), \(CD\) lần lượt tại \(M\), \(N\). Khẳng định nào sau đây đúng?`, [r`\(O\) là trung điểm của \(MN\)`, r`\(MN = AD\)`, r`\(MN \perp AB\)`, r`\(M\) là trung điểm của \(AB\)`], r`\(\triangle OAM = \triangle OCN\) (g.c.g: \(OA = OC\), góc so le trong, góc đối đỉnh) nên \(OM = ON\).`, [
      undefined,
      r`Chỉ đúng khi \(MN \parallel AD\).`,
      'Đường thẳng qua \\(O\\) bất kì.',
      'Đường thẳng qua \\(O\\) bất kì.',
    ]),
    mc(4, TH12, r`Hình bình hành \(ABCD\) có \(M\) là trung điểm của \(BC\); \(AM\) cắt \(BD\) tại \(G\). Khẳng định nào sau đây đúng?`, [r`\(G\) là trọng tâm tam giác \(ABC\)`, r`\(G\) là trung điểm của \(BD\)`, r`\(G\) là trung điểm của \(AM\)`, r`\(G\) là trọng tâm tam giác \(ABD\)`], r`Gọi \(O\) là giao điểm hai đường chéo, \(O\) là trung điểm \(AC\). Trong \(\triangle ABC\), \(AM\) và \(BO\) là hai đường trung tuyến, cắt nhau tại \(G\) nên \(G\) là trọng tâm.`, [
      undefined,
      r`Trung điểm của \(BD\) là \(O\), nằm trên \(AC\).`,
      r`\(G\) chia \(AM\) theo tỉ số \(2 : 1\).`,
      r`\(AM\) không phải trung tuyến của \(\triangle ABD\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, TG12, r`Cho hình bình hành \(ABCD\).`, [
      [r`\(AB = CD\).`, true, 'Các cạnh đối bằng nhau.'],
      [r`\(AB \parallel CD\).`, true, 'Định nghĩa hình bình hành.'],
      [r`\(\widehat{A} = \widehat{B}\).`, false, 'Hai góc kề một cạnh bù nhau, nói chung không bằng nhau.'],
      [r`\(\widehat{A} + \widehat{B} = 180^\circ\).`, true, 'Hai góc trong cùng phía.'],
    ]),
    tf(2, TG12, r`Hình bình hành \(ABCD\) có chu vi 30 cm và \(AB = 9\) cm.`, [
      [r`\(AD = 6\) cm.`, true, r`\(AB + AD = 15\).`],
      [r`\(CD = 9\) cm.`, true, r`\(CD = AB\).`],
      [r`\(BC = 9\) cm.`, false, r`\(BC = AD = 6\) cm.`],
      [r`\(AB + AD = 15\) cm.`, true, 'Bằng nửa chu vi.'],
    ]),
    tf(2, TG12, r`Hình bình hành \(ABCD\) có \(\widehat{A} = 3\widehat{B}\).`, [
      [r`\(\widehat{B} = 45^\circ\).`, true, r`\(4\widehat{B} = 180^\circ\).`],
      [r`\(\widehat{A} = 135^\circ\).`, true, r`\(3\cdot45^\circ\).`],
      [r`\(\widehat{C} = 45^\circ\).`, false, r`\(\widehat{C} = \widehat{A} = 135^\circ\).`],
      [r`\(\widehat{D} = 45^\circ\).`, true, r`\(\widehat{D} = \widehat{B}\).`],
    ]),
    tf(2, DT12, r`Hình bình hành \(ABCD\) có hai đường chéo \(AC = 12\) cm, \(BD = 8\) cm cắt nhau tại \(O\).`, [
      [r`\(OA = 6\) cm.`, true, 'Nửa đường chéo \\(AC\\).'],
      [r`\(OB = 4\) cm.`, true, 'Nửa đường chéo \\(BD\\).'],
      [r`\(OA = OB\).`, false, r`\(6 \ne 4\).`],
      [r`\(OC + OD = 10\) cm.`, true, r`\(6 + 4\).`],
    ]),
    tf(2, CH12, 'Xét tính đúng sai của các dấu hiệu nhận biết hình bình hành:', [
      ['Tứ giác có các cạnh đối bằng nhau là hình bình hành.', true, 'Dấu hiệu nhận biết.'],
      ['Tứ giác có các góc đối bằng nhau là hình bình hành.', true, 'Dấu hiệu nhận biết.'],
      ['Tứ giác có hai cạnh đối song song là hình bình hành.', false, 'Đó mới là hình thang.'],
      ['Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường là hình bình hành.', true, 'Dấu hiệu nhận biết.'],
    ]),
    tf(3, CH12, r`Cho tam giác \(ABC\), \(M\) là trung điểm của \(BC\). Lấy \(D\) sao cho \(M\) là trung điểm của \(AD\).`, [
      [r`\(MA = MD\) và \(MB = MC\).`, true, 'Theo cách lấy điểm.'],
      [r`\(ABDC\) là hình bình hành.`, true, 'Hai đường chéo cắt nhau tại trung điểm mỗi đường.'],
      [r`\(AB \parallel CD\).`, true, 'Cạnh đối của hình bình hành.'],
      [r`\(AB = AD\).`, false, 'Không có dữ kiện; nói chung khác nhau.'],
    ]),
    tf(3, DT12, r`Hình bình hành \(ABCD\); kẻ \(AH \perp BD\), \(CK \perp BD\) (\(H, K \in BD\)).`, [
      [r`\(\triangle ABH = \triangle CDK\).`, true, 'Cạnh huyền \\(AB = CD\\), góc nhọn so le trong bằng nhau.'],
      [r`\(AH = CK\).`, true, 'Hai cạnh tương ứng.'],
      [r`\(AH \parallel CK\).`, true, r`Cùng vuông góc với \(BD\).`],
      [r`\(AHCK\) là hình thang cân.`, false, r`\(AHCK\) có cặp cạnh \(AH\), \(CK\) song song và bằng nhau nên là hình bình hành.`],
    ]),
    tf(3, DT12, r`Hình bình hành \(ABCD\); lấy \(E \in AB\), \(F \in CD\) sao cho \(AE = CF\).`, [
      [r`\(EB = FD\).`, true, r`\(AB - AE = CD - CF\).`],
      [r`\(EBFD\) là hình bình hành.`, true, r`\(EB \parallel FD\) và \(EB = FD\).`],
      [r`\(DE \parallel BF\).`, true, 'Cạnh đối của hình bình hành \\(EBFD\\).'],
      [r`\(DE = AD\).`, false, 'Không có dữ kiện.'],
    ]),
    tf(3, TH12, r`Hình bình hành \(ABCD\) tâm \(O\); \(M\), \(N\) là trung điểm của \(AD\), \(BC\).`, [
      [r`\(AMCN\) là hình bình hành.`, true, r`\(AM \parallel NC\), \(AM = NC\).`],
      [r`\(MN\) đi qua \(O\).`, true, r`Hai đường chéo \(AC\), \(MN\) của \(AMCN\) cắt nhau tại trung điểm \(O\) của \(AC\).`],
      [r`\(M\), \(O\), \(N\) thẳng hàng.`, true, r`\(O\) thuộc \(MN\).`],
      [r`\(MN = AC\).`, false, r`\(MN = AB\), nói chung khác \(AC\).`],
    ]),
    tf(4, TH12, r`Hình bình hành \(ABCD\) tâm \(O\); lấy \(E \in AB\), \(F \in CD\) sao cho \(AE = CF\).`, [
      [r`\(AECF\) là hình bình hành.`, true, r`\(AE \parallel CF\), \(AE = CF\).`],
      [r`\(EF\) đi qua \(O\).`, true, r`\(EF\), \(AC\) là hai đường chéo của \(AECF\).`],
      [r`Ba đường thẳng \(AC\), \(EF\), \(BD\) đồng quy.`, true, r`Cùng đi qua \(O\).`],
      [r`\(EF \parallel AD\).`, false, r`Chỉ đúng khi \(AE = DF\), nói chung không có.`],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, TG12, r`Hình bình hành \(ABCD\) có \(\widehat{B} = 125^\circ\). Tính \(\widehat{D}\) (độ).`, '125', r`Hai góc đối bằng nhau: \(\widehat{D} = \widehat{B} = 125^\circ\).`, DEG),
    sa(1, TG12, r`Hình bình hành \(ABCD\) có \(\widehat{A} = 58^\circ\). Tính \(\widehat{B}\) (độ).`, '122', r`\(\widehat{B} = 180^\circ - 58^\circ = 122^\circ\).`, DEG),
    sa(2, TG12, r`Hình bình hành \(ABCD\) có chu vi 44 cm và \(AB = AD + 4\) (cm). Tính \(AB\).`, '13', r`\(AB + AD = 22\), \(AB - AD = 4\) nên \(AB = 13\) cm.`, CM),
    sa(2, TG12, r`Hình bình hành \(ABCD\) có \(\widehat{A} : \widehat{B} = 2 : 7\). Tính \(\widehat{A}\) (độ).`, '40', r`\(\widehat{A} + \widehat{B} = 180^\circ\); mỗi phần \(20^\circ\); \(\widehat{A} = 40^\circ\).`, DEG),
    sa(2, DT12, r`Hình bình hành \(ABCD\) có tâm \(O\) và \(OA = 4{,}5\) cm. Tính \(AC\).`, '9', r`\(O\) là trung điểm của \(AC\) nên \(AC = 2\cdot4{,}5 = 9\) cm.`, CM),
    sa(3, DT12, r`Hình bình hành \(ABCD\) có \(AB = 8\) cm, \(AD = 5\) cm. Tia phân giác của góc \(A\) cắt cạnh \(CD\) tại \(E\). Tính \(CE\).`, '3', r`\(\widehat{DEA} = \widehat{EAB}\) (so le trong) \(= \widehat{DAE}\) nên \(\triangle ADE\) cân tại \(D\): \(DE = AD = 5\) cm. \(CE = 8 - 5 = 3\) cm.`, CM),
    sa(3, TH12, r`Hình bình hành \(ABCD\) tâm \(O\). Một đường thẳng qua \(O\) cắt \(AB\) tại \(M\) và cắt \(CD\) tại \(N\). Biết \(AM = 3\) cm, tính \(CN\).`, '3', r`\(\triangle OAM = \triangle OCN\) (g.c.g) nên \(CN = AM = 3\) cm.`, CM),
    sa(4, TH12, r`Hình bình hành \(ABCD\) có \(BD = 18\) cm, \(M\) là trung điểm của \(BC\), \(AM\) cắt \(BD\) tại \(G\). Tính \(BG\).`, '6', r`\(G\) là trọng tâm tam giác \(ABC\) (giao của hai trung tuyến \(AM\), \(BO\)) nên \(BG = \dfrac23BO = \dfrac23\cdot9 = 6\) cm.`, CM),
    // ---- Tự luận ----
    es(2, TG12, r`Hình bình hành \(ABCD\) có \(\widehat{A} = 2\widehat{B}\), chu vi 26 cm và \(AB - AD = 3\) cm. Tính các góc và các cạnh của hình bình hành.`, r`\(\widehat{A} + \widehat{B} = 180^\circ\), \(\widehat{A} = 2\widehat{B}\) nên \(\widehat{B} = 60^\circ\), \(\widehat{A} = 120^\circ\); \(\widehat{C} = 120^\circ\), \(\widehat{D} = 60^\circ\).
\(AB + AD = 13\), \(AB - AD = 3\) nên \(AB = CD = 8\) cm, \(AD = BC = 5\) cm.`, r`0,5 điểm: tính đúng bốn góc.
0,5 điểm: tính đúng bốn cạnh.`),
    es(3, CH12, r`Cho hình bình hành \(ABCD\). Trên các cạnh \(AD\), \(BC\) lấy các điểm \(M\), \(N\) sao cho \(AM = CN\). Chứng minh tứ giác \(BMDN\) là hình bình hành.`, r`\(MD = AD - AM\), \(BN = BC - CN\); mà \(AD = BC\), \(AM = CN\) nên \(MD = BN\).
\(MD \parallel BN\) (vì \(AD \parallel BC\)).
Tứ giác \(BMDN\) có hai cạnh đối \(MD\), \(BN\) song song và bằng nhau nên là hình bình hành.`, r`0,5 điểm: chứng minh \(MD = BN\).
0,5 điểm: nêu \(MD \parallel BN\) và kết luận.`),
    ge(3, DT12, r`Cho hình bình hành \(ABCD\). Tia phân giác của góc \(A\) cắt \(CD\) tại \(E\), tia phân giác của góc \(C\) cắt \(AB\) tại \(F\). Chứng minh \(AECF\) là hình bình hành.`, `A(0,0) B(8,0) C(10,4) D(2,4) E(6.47,4) F(3.53,0)
ABCDA AE CF
goc(D,A,E) goc(B,C,F)`, r`\(\widehat{BAE} = \dfrac{\widehat{A}}{2}\), \(\widehat{DCF} = \dfrac{\widehat{C}}{2}\) và \(\widehat{A} = \widehat{C}\).
\(AB \parallel CD\) nên \(\widehat{BFC} = \widehat{DCF}\) (so le trong) \(= \dfrac{\widehat{C}}{2} = \widehat{BAE}\).
Hai góc đồng vị \(\widehat{BFC} = \widehat{BAE}\) nên \(AE \parallel FC\).
Tứ giác \(AECF\) có \(AF \parallel EC\) và \(AE \parallel FC\) nên là hình bình hành.`, r`0,25 điểm: nêu \(\widehat{A} = \widehat{C}\) và tính chất tia phân giác.
0,5 điểm: chứng minh \(AE \parallel FC\).
0,25 điểm: kết luận hình bình hành.`),
    ge(4, TH12, r`Cho hình bình hành \(ABCD\) có tâm \(O\). Gọi \(E\), \(F\) lần lượt là trung điểm của \(AB\), \(CD\). Chứng minh ba điểm \(E\), \(O\), \(F\) thẳng hàng và \(O\) là trung điểm của \(EF\).`, `A(0,0) B(8,0) C(10,4) D(2,4) O(5,2) E(4,0) F(6,4)
ABCDA AC BD EF:dash`, r`\(AE = \dfrac{AB}{2} = \dfrac{CD}{2} = CF\) và \(AE \parallel CF\) nên \(AECF\) là hình bình hành.
Hai đường chéo \(AC\), \(EF\) của hình bình hành \(AECF\) cắt nhau tại trung điểm mỗi đường.
Trung điểm của \(AC\) là \(O\), nên \(EF\) đi qua \(O\) và \(O\) là trung điểm của \(EF\). Vậy \(E\), \(O\), \(F\) thẳng hàng.`, r`0,5 điểm: chứng minh \(AECF\) là hình bình hành.
0,5 điểm: suy ra \(O\) là trung điểm của \(EF\), kết luận thẳng hàng.`),
  ],
};

const CN13 = 'chung-minh-hinh-chu-nhat';
const DT13 = 'dung-tinh-chat-hinh-chu-nhat';
const TT13 = 'trung-tuyen-ung-voi-canh-huyen';

const B13: BankLesson = {
  slug: 'bai-13-hinh-chu-nhat',
  questions: [
    mc(2, CN13, 'Hình chữ nhật là tứ giác có', ['bốn góc vuông', 'bốn cạnh bằng nhau', 'hai đường chéo vuông góc', 'một cặp cạnh đối song song'], 'Theo định nghĩa, hình chữ nhật là tứ giác có bốn góc vuông.', [
      undefined,
      'Đó là hình thoi.',
      'Đó là tính chất của hình thoi.',
      'Đó mới là hình thang.',
    ]),
    mc(2, CN13, 'Dấu hiệu nào sau đây khẳng định tứ giác là hình chữ nhật?', ['Hình bình hành có một góc vuông', 'Hình bình hành có hai đường chéo vuông góc', 'Hình thang có một góc vuông', 'Tứ giác có hai góc vuông'], 'Hình bình hành có một góc vuông là hình chữ nhật.', [
      undefined,
      'Đó là hình thoi.',
      'Đó là hình thang vuông.',
      'Cần ít nhất ba góc vuông.',
    ]),
    mc(2, CN13, r`Hình bình hành \(ABCD\) có \(AC = BD\). Khi đó \(ABCD\) là`, ['hình chữ nhật', 'hình thoi', 'hình vuông', 'tứ giác có bốn cạnh bằng nhau'], 'Hình bình hành có hai đường chéo bằng nhau là hình chữ nhật.', [
      undefined,
      'Hình thoi có hai đường chéo vuông góc.',
      'Chưa có hai cạnh kề bằng nhau.',
      'Chưa có dữ kiện về cạnh.',
    ]),
    mc(2, DT13, r`Hình chữ nhật \(ABCD\) có \(AC = 10\) cm. Độ dài \(BD\) là`, [r`\(10\) cm`, r`\(5\) cm`, r`\(20\) cm`, r`\(100\) cm`], r`Hai đường chéo của hình chữ nhật bằng nhau: \(BD = AC = 10\) cm.`, [
      undefined,
      'Không chia đôi.',
      'Không nhân đôi.',
      'Không bình phương.',
    ]),
    mc(2, DT13, r`Hình chữ nhật \(ABCD\) có tâm \(O\) và \(AC = 12\) cm. Độ dài \(OB\) là`, [r`\(6\) cm`, r`\(12\) cm`, r`\(3\) cm`, r`\(24\) cm`], r`\(OB = \dfrac{BD}{2} = \dfrac{AC}{2} = 6\) cm.`, [
      undefined,
      'Chưa chia đôi.',
      'Chia đôi hai lần.',
      'Nhân đôi nhầm.',
    ]),
    mc(2, DT13, 'Hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Diện tích hình chữ nhật là', [r`\(40\) cm²`, r`\(26\) cm²`, r`\(13\) cm²`, r`\(80\) cm²`], r`\(S = 8\cdot5 = 40\) cm².`, [
      undefined,
      'Đó là chu vi (đơn vị cm).',
      'Đó là nửa chu vi.',
      'Nhân đôi nhầm.',
    ]),
    mc(2, TT13, r`Tam giác \(ABC\) vuông tại \(A\) có \(BC = 10\) cm, \(AM\) là đường trung tuyến. Độ dài \(AM\) là`, [r`\(5\) cm`, r`\(10\) cm`, r`\(20\) cm`, r`\(2{,}5\) cm`], r`Trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền: \(AM = 5\) cm.`, [
      undefined,
      'Bằng nửa cạnh huyền.',
      'Không nhân đôi.',
      'Chia đôi hai lần.',
    ]),
    mc(3, TT13, r`Tam giác \(ABC\) có đường trung tuyến \(AM = \dfrac{BC}{2}\). Khẳng định nào sau đây đúng?`, [r`Tam giác \(ABC\) vuông tại \(A\)`, r`Tam giác \(ABC\) vuông tại \(B\)`, r`Tam giác \(ABC\) cân tại \(A\)`, r`Tam giác \(ABC\) đều`], 'Nếu trung tuyến ứng với một cạnh bằng nửa cạnh ấy thì tam giác vuông tại đỉnh xuất phát trung tuyến.', [
      undefined,
      r`Góc vuông đối diện cạnh \(BC\), tức là tại \(A\).`,
      'Không có dữ kiện về hai cạnh bên.',
      'Tam giác đều có trung tuyến lớn hơn nửa cạnh.',
    ]),
    mc(3, DT13, r`Hình chữ nhật \(ABCD\) có tâm \(O\) và \(\widehat{AOB} = 120^\circ\). Số đo \(\widehat{OAB}\) là`, [r`\(30^\circ\)`, r`\(60^\circ\)`, r`\(120^\circ\)`, r`\(15^\circ\)`], r`\(OA = OB\) nên \(\triangle OAB\) cân tại \(O\): \(\widehat{OAB} = (180^\circ - 120^\circ) : 2 = 30^\circ\).`, [
      undefined,
      'Chưa chia đôi.',
      r`Đó là \(\widehat{AOB}\).`,
      'Chia đôi hai lần.',
    ]),
    mc(3, CN13, r`Tam giác \(ABC\) vuông tại \(A\), \(M\) là một điểm trên cạnh \(BC\). Kẻ \(MD \perp AB\), \(ME \perp AC\) (\(D \in AB\), \(E \in AC\)). Tứ giác \(ADME\) là`, ['hình chữ nhật', 'hình thoi', 'hình vuông', 'hình thang vuông có hai đáy khác nhau'], r`Tứ giác \(ADME\) có ba góc vuông tại \(A\), \(D\), \(E\) nên là hình chữ nhật.`, [
      undefined,
      'Chưa có bốn cạnh bằng nhau.',
      r`Chỉ đúng khi \(M\) thuộc tia phân giác góc \(A\).`,
      'Có ba góc vuông nên hai đáy bằng nhau.',
    ]),
    mc(3, TT13, r`Tam giác \(ABC\) vuông tại \(A\) có \(\widehat{B} = 60^\circ\) và \(BC = 8\) cm. Độ dài \(AB\) là`, [r`\(4\) cm`, r`\(8\) cm`, r`\(2\) cm`, r`\(6\) cm`], r`Gọi \(M\) là trung điểm \(BC\): \(MA = MB = 4\) cm, tam giác \(MAB\) cân có góc \(60^\circ\) nên đều; \(AB = 4\) cm.`, [
      undefined,
      'Đó là cạnh huyền.',
      'Chia đôi hai lần.',
      'Không có cơ sở.',
    ]),
    mc(3, DT13, 'Một hình chữ nhật có chu vi 28 cm, chiều dài hơn chiều rộng 4 cm. Diện tích hình chữ nhật là', [r`\(45\) cm²`, r`\(28\) cm²`, r`\(32\) cm²`, r`\(49\) cm²`], r`Nửa chu vi 14 cm; chiều dài 9 cm, chiều rộng 5 cm; diện tích 45 cm².`, [
      undefined,
      'Nhầm chu vi với diện tích.',
      r`Tính nhầm chiều dài 8, chiều rộng 4.`,
      'Đó là diện tích hình vuông có cùng chu vi.',
    ]),
    mc(4, TT13, r`Tam giác \(ABC\) nhọn có các đường cao \(BD\), \(CE\); \(M\) là trung điểm của \(BC\). Tam giác \(MDE\) là`, [r`tam giác cân tại \(M\)`, 'tam giác đều', r`tam giác vuông tại \(M\)`, r`tam giác cân tại \(D\)`], r`\(MD\), \(ME\) là trung tuyến ứng với cạnh huyền chung \(BC\) của hai tam giác vuông \(BDC\), \(BEC\) nên \(MD = ME = \dfrac{BC}{2}\).`, [
      undefined,
      r`Chỉ đều khi \(\widehat{A} = 60^\circ\).`,
      r`Chỉ vuông khi \(\widehat{A} = 45^\circ\).`,
      r`Hai cạnh bằng nhau là \(MD\), \(ME\).`,
    ]),
    mc(4, TT13, r`Tam giác \(ABC\) vuông tại \(A\) có \(\widehat{B} = 70^\circ\), đường cao \(AH\), đường trung tuyến \(AM\). Số đo \(\widehat{HAM}\) là`, [r`\(50^\circ\)`, r`\(20^\circ\)`, r`\(70^\circ\)`, r`\(40^\circ\)`], r`\(\widehat{C} = 20^\circ\). \(MA = MC\) nên \(\widehat{MAC} = 20^\circ\); \(\widehat{HAC} = 90^\circ - 20^\circ = 70^\circ\). \(\widehat{HAM} = 70^\circ - 20^\circ = 50^\circ\).`, [
      undefined,
      r`Đó là \(\widehat{MAC}\).`,
      r`Đó là \(\widehat{HAC}\).`,
      'Tính sai hiệu.',
    ]),
    // ---- Đúng/Sai ----
    tf(2, CN13, 'Xét tính đúng sai của các dấu hiệu nhận biết hình chữ nhật:', [
      ['Hình bình hành có một góc vuông là hình chữ nhật.', true, 'Dấu hiệu nhận biết.'],
      ['Hình thang cân có một góc vuông là hình chữ nhật.', true, 'Dấu hiệu nhận biết.'],
      ['Tứ giác có ba góc vuông là hình chữ nhật.', true, 'Góc thứ tư cũng vuông.'],
      ['Hình bình hành có hai đường chéo vuông góc là hình chữ nhật.', false, 'Đó là hình thoi.'],
    ]),
    tf(2, DT13, r`Hình chữ nhật \(ABCD\) có tâm \(O\) và \(AC = 14\) cm.`, [
      [r`\(BD = 14\) cm.`, true, 'Hai đường chéo bằng nhau.'],
      [r`\(OA = 7\) cm.`, true, 'Nửa đường chéo.'],
      [r`\(OA = OB\).`, true, r`Cùng bằng 7 cm.`],
      [r`\(AC \perp BD\).`, false, 'Chỉ đúng khi là hình vuông.'],
    ]),
    tf(2, TT13, r`Tam giác \(ABC\) vuông tại \(A\), \(BC = 12\) cm, \(M\) là trung điểm của \(BC\).`, [
      [r`\(AM = 6\) cm.`, true, 'Nửa cạnh huyền.'],
      [r`\(MA = MB = MC\).`, true, 'Cùng bằng 6 cm.'],
      [r`\(\triangle MAB\) cân tại \(M\).`, true, r`\(MA = MB\).`],
      [r`\(AM = BC\).`, false, r`\(AM = \dfrac{BC}{2}\).`],
    ]),
    tf(3, TT13, r`Tam giác \(ABC\) có đường trung tuyến \(AM\) với \(AM = BM = CM\).`, [
      [r`Tam giác \(ABC\) vuông tại \(A\).`, true, 'Trung tuyến bằng nửa cạnh tương ứng.'],
      [r`\(\widehat{A} = \widehat{B} + \widehat{C}\).`, true, r`\(\widehat{A} = 90^\circ\).`],
      [r`Tam giác \(ABC\) vuông tại \(M\).`, false, r`\(M\) nằm trên cạnh \(BC\), không phải đỉnh.`],
      [r`\(\triangle AMB\) cân tại \(M\).`, true, r`\(MA = MB\).`],
    ]),
    tf(3, CN13, r`Tam giác \(ABC\) cân tại \(A\), đường cao \(AH\); \(I\) là trung điểm của \(AC\), \(K\) đối xứng với \(H\) qua \(I\).`, [
      [r`\(AHCK\) là hình bình hành.`, true, 'Hai đường chéo \\(AC\\), \\(HK\\) cắt nhau tại trung điểm mỗi đường.'],
      [r`\(\widehat{AHC} = 90^\circ\).`, true, r`\(AH \perp BC\).`],
      [r`\(AHCK\) là hình chữ nhật.`, true, 'Hình bình hành có một góc vuông.'],
      [r`\(AK = BC\).`, false, r`\(AK = HC = \dfrac{BC}{2}\).`],
    ]),
    tf(3, DT13, r`Hình chữ nhật \(ABCD\) có tâm \(O\) và \(\widehat{ACB} = 30^\circ\).`, [
      [r`\(\triangle OBC\) cân tại \(O\).`, true, r`\(OB = OC\).`],
      [r`\(\widehat{OBC} = 30^\circ\).`, true, 'Hai góc ở đáy tam giác cân.'],
      [r`\(\widehat{AOB} = 60^\circ\).`, true, 'Góc ngoài của tam giác \\(OBC\\).'],
      [r`\(AB = BC\).`, false, r`Khi đó \(\widehat{ACB} = 45^\circ\).`],
    ]),
    tf(3, TT13, r`Tam giác \(ABC\) vuông tại \(A\) có \(\widehat{C} = 30^\circ\), \(BC = 10\) cm và \(M\) là trung điểm của \(BC\).`, [
      [r`\(AB = 5\) cm.`, true, 'Cạnh đối diện góc \\(30^\\circ\\) bằng nửa cạnh huyền.'],
      [r`\(\triangle ABM\) là tam giác đều.`, true, r`\(AM = BM = AB = 5\) cm.`],
      [r`\(AM = 10\) cm.`, false, r`\(AM = 5\) cm.`],
      [r`\(\widehat{MAC} = 30^\circ\).`, true, r`\(MA = MC\).`],
    ]),
    tf(3, CN13, r`Tứ giác \(ABCD\) có hai đường chéo \(AC = BD\).`, [
      [r`\(ABCD\) chắc chắn là hình chữ nhật.`, false, 'Hình thang cân cũng có hai đường chéo bằng nhau.'],
      [r`Nếu thêm \(AC\), \(BD\) cắt nhau tại trung điểm mỗi đường thì \(ABCD\) là hình chữ nhật.`, true, 'Hình bình hành có hai đường chéo bằng nhau.'],
      [r`Nếu \(ABCD\) là hình bình hành thì nó là hình chữ nhật.`, true, 'Dấu hiệu nhận biết.'],
      [r`Nếu \(ABCD\) là hình thang thì nó là hình thang cân.`, true, 'Hình thang có hai đường chéo bằng nhau là hình thang cân.'],
    ]),
    tf(4, TT13, r`Tam giác \(ABC\) nhọn có các đường cao \(BD\), \(CE\); \(M\) là trung điểm của \(BC\), \(N\) là trung điểm của \(DE\).`, [
      [r`\(MD = \dfrac{BC}{2}\).`, true, r`Trung tuyến ứng với cạnh huyền trong \(\triangle BDC\).`],
      [r`\(ME = MD\).`, true, r`Cùng bằng \(\dfrac{BC}{2}\).`],
      [r`\(MN \perp DE\).`, true, 'Trung tuyến của tam giác cân \\(MDE\\) cũng là đường cao.'],
      [r`\(MN = DE\).`, false, 'Không có dữ kiện; nói chung khác nhau.'],
    ]),
    tf(2, DT13, r`Hình chữ nhật \(ABCD\) có \(AB = 9\) cm, \(BC = 4\) cm.`, [
      ['Chu vi là 26 cm.', true, r`\(2(9 + 4)\).`],
      ['Diện tích là 36 cm².', true, r`\(9\cdot4\).`],
      [r`\(CD = 4\) cm.`, false, r`\(CD = AB = 9\) cm.`],
      [r`\(AD = 4\) cm.`, true, r`\(AD = BC\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, TT13, r`Tam giác \(ABC\) vuông tại \(A\) có đường trung tuyến \(AM = 7{,}5\) cm. Tính \(BC\).`, '15', r`\(BC = 2AM = 15\) cm.`, CM),
    sa(2, DT13, r`Hình chữ nhật \(ABCD\) có tâm \(O\) và \(BD = 18\) cm. Tính \(OC\).`, '9', r`\(OC = \dfrac{AC}{2} = \dfrac{BD}{2} = 9\) cm.`, CM),
    sa(2, DT13, 'Hình chữ nhật có chu vi 34 cm và chiều dài 12 cm. Tính diện tích hình chữ nhật.', '60', r`Chiều rộng \(17 - 12 = 5\) cm; diện tích \(12\cdot5 = 60\) cm².`, CM2),
    sa(3, DT13, r`Hình chữ nhật \(ABCD\) có tâm \(O\) và \(\widehat{AOD} = 50^\circ\). Tính \(\widehat{OAD}\) (độ).`, '65', r`\(OA = OD\) nên \(\widehat{OAD} = (180^\circ - 50^\circ) : 2 = 65^\circ\).`, DEG),
    sa(3, TT13, r`Tam giác \(ABC\) vuông tại \(A\) có \(\widehat{B} = 35^\circ\), \(AM\) là đường trung tuyến. Tính \(\widehat{AMC}\) (độ).`, '70', r`\(MA = MB\) nên \(\widehat{MAB} = 35^\circ\); \(\widehat{AMC}\) là góc ngoài của \(\triangle AMB\): \(35^\circ + 35^\circ = 70^\circ\).`, DEG),
    sa(3, TT13, r`Tam giác \(ABC\) vuông tại \(A\) có \(BC = 20\) cm và \(\widehat{C} = 30^\circ\). Tính \(AB\).`, '10', r`Cạnh góc vuông đối diện góc \(30^\circ\) bằng nửa cạnh huyền: \(AB = 10\) cm.`, CM),
    sa(4, TT13, r`Tam giác \(ABC\) vuông tại \(A\) có \(\widehat{B} = 65^\circ\), đường cao \(AH\), đường trung tuyến \(AM\). Tính \(\widehat{HAM}\) (độ).`, '40', r`\(\widehat{C} = 25^\circ\); \(\widehat{MAC} = 25^\circ\) (vì \(MA = MC\)); \(\widehat{HAC} = 65^\circ\). \(\widehat{HAM} = 65^\circ - 25^\circ = 40^\circ\).`, DEG),
    // ---- Tự luận ----
    es(2, DT13, r`Hình chữ nhật \(ABCD\) có tâm \(O\), \(AC = 16\) cm và \(\widehat{AOB} = 60^\circ\).
a) Tính \(OA\), \(OB\). b) Chứng minh tam giác \(OAB\) đều và tính \(AB\).`, r`a) \(OA = OB = \dfrac{AC}{2} = 8\) cm (hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường).
b) Tam giác \(OAB\) cân tại \(O\) có \(\widehat{AOB} = 60^\circ\) nên là tam giác đều; \(AB = OA = 8\) cm.`, r`0,5 điểm: tính đúng \(OA\), \(OB\) có lí do.
0,5 điểm: chứng minh tam giác đều và tính \(AB\).`),
    es(3, CN13, r`Cho tam giác \(ABC\), đường trung tuyến \(AM\). Trên tia đối của tia \(MA\) lấy điểm \(D\) sao cho \(MD = MA\).
a) Chứng minh \(ABDC\) là hình bình hành.
b) Chứng minh nếu \(\widehat{BAC} = 90^\circ\) thì \(ABDC\) là hình chữ nhật.`, r`a) \(M\) là trung điểm của \(BC\) và \(AD\): hai đường chéo cắt nhau tại trung điểm mỗi đường nên \(ABDC\) là hình bình hành.
b) Hình bình hành \(ABDC\) có \(\widehat{BAC} = 90^\circ\) nên là hình chữ nhật.`, r`0,5 điểm: câu a.
0,5 điểm: câu b.`),
    es(3, TT13, r`Cho tam giác \(ABC\) vuông tại \(A\), \(M\) là trung điểm của \(BC\). Dựa vào hình chữ nhật, chứng minh \(AM = \dfrac{BC}{2}\).`, r`Lấy \(D\) đối xứng với \(A\) qua \(M\). Tứ giác \(ABDC\) có hai đường chéo cắt nhau tại trung điểm \(M\) của mỗi đường nên là hình bình hành; lại có \(\widehat{A} = 90^\circ\) nên là hình chữ nhật.
Hai đường chéo hình chữ nhật bằng nhau: \(AD = BC\), suy ra \(AM = \dfrac{AD}{2} = \dfrac{BC}{2}\).`, r`0,5 điểm: dựng điểm \(D\) và chứng minh \(ABDC\) là hình chữ nhật.
0,5 điểm: dùng hai đường chéo bằng nhau để kết luận.`),
    ge(3, CN13, r`Cho tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\). Gọi \(D\), \(E\) lần lượt là chân các đường vuông góc kẻ từ \(H\) xuống \(AB\), \(AC\).
a) Chứng minh \(ADHE\) là hình chữ nhật. b) Chứng minh \(AH = DE\).`, `A(0,0) B(0,4) C(6,0) H(1.85,2.77) D(0,2.77) E(1.85,0)
ABCA AH HD HE DE:dash
vuong(B,A,C) vuong(A,H,C) vuong(A,D,H) vuong(A,E,H)`, r`a) Tứ giác \(ADHE\) có \(\widehat{DAE} = 90^\circ\), \(\widehat{ADH} = 90^\circ\), \(\widehat{AEH} = 90^\circ\) nên là hình chữ nhật.
b) \(AH\) và \(DE\) là hai đường chéo của hình chữ nhật \(ADHE\) nên \(AH = DE\).`, r`0,5 điểm: câu a, chỉ đủ ba góc vuông.
0,5 điểm: câu b, nêu tính chất hai đường chéo.`),
    ge(4, TT13, r`Cho tam giác \(ABC\) vuông tại \(A\) (\(AB < AC\)), đường cao \(AH\), đường trung tuyến \(AM\). Chứng minh \(\widehat{HAM} = \widehat{B} - \widehat{C}\).`, `A(0,0) B(0,4) C(6,0) H(1.85,2.77) M(3,2)
ABCA AH AM
vuong(B,A,C) vuong(A,H,C)`, r`\(AM\) là trung tuyến ứng với cạnh huyền nên \(MA = MC\), \(\triangle MAC\) cân: \(\widehat{MAC} = \widehat{C}\).
Trong tam giác vuông \(AHC\): \(\widehat{HAC} = 90^\circ - \widehat{C} = \widehat{B}\).
Vì \(AB < AC\) nên \(\widehat{B} > \widehat{C}\), tia \(AM\) nằm giữa hai tia \(AH\), \(AC\): \(\widehat{HAM} = \widehat{HAC} - \widehat{MAC} = \widehat{B} - \widehat{C}\).`, r`0,25 điểm: chứng minh \(\widehat{MAC} = \widehat{C}\).
0,5 điểm: chứng minh \(\widehat{HAC} = \widehat{B}\).
0,25 điểm: lập luận vị trí tia và kết luận.`),
  ],
};

const TG14 = 'tinh-goc-canh-hinh-thoi';
const DT14 = 'dung-tinh-chat-hinh-thoi-hinh-vuong';
const CM14 = 'chung-minh-hinh-thoi-hinh-vuong';
const DK14 = 'dieu-kien-hinh-thoi-hinh-vuong';

const B14: BankLesson = {
  slug: 'bai-14-hinh-thoi-va-hinh-vuong',
  questions: [
    mc(1, TG14, 'Hình thoi là tứ giác có', ['bốn cạnh bằng nhau', 'bốn góc bằng nhau', 'hai đường chéo bằng nhau', 'một cặp cạnh đối song song'], 'Theo định nghĩa, hình thoi là tứ giác có bốn cạnh bằng nhau.', [
      undefined,
      'Đó là hình chữ nhật.',
      'Đó là tính chất hình chữ nhật.',
      'Đó mới là hình thang.',
    ]),
    mc(1, TG14, 'Hình thoi có cạnh 7 cm. Chu vi hình thoi là', [r`\(28\) cm`, r`\(14\) cm`, r`\(49\) cm`, r`\(21\) cm`], r`Bốn cạnh bằng nhau: chu vi \(4\cdot7 = 28\) cm.`, [
      undefined,
      'Mới lấy hai cạnh.',
      'Đó là bình phương cạnh.',
      'Mới lấy ba cạnh.',
    ]),
    mc(2, TG14, r`Hình thoi \(ABCD\) có \(\widehat{A} = 60^\circ\). Số đo \(\widehat{B}\) là`, [r`\(120^\circ\)`, r`\(60^\circ\)`, r`\(30^\circ\)`, r`\(90^\circ\)`], r`Hình thoi là hình bình hành nên hai góc kề một cạnh bù nhau: \(\widehat{B} = 120^\circ\).`, [
      undefined,
      r`Đó là số đo \(\widehat{C}\).`,
      'Nhầm với góc tạo bởi cạnh và đường chéo.',
      'Hình thoi này không có góc vuông.',
    ]),
    mc(2, TG14, 'Hình thoi có hai đường chéo dài 6 cm và 8 cm. Diện tích hình thoi là', [r`\(24\) cm²`, r`\(48\) cm²`, r`\(14\) cm²`, r`\(12\) cm²`], r`\(S = \dfrac{6\cdot8}{2} = 24\) cm².`, [
      undefined,
      'Quên chia 2.',
      'Đó là tổng hai đường chéo.',
      'Chia 4 nhầm.',
    ]),
    mc(2, TG14, 'Hình vuông có cạnh 5 cm. Diện tích hình vuông là', [r`\(25\) cm²`, r`\(20\) cm²`, r`\(10\) cm²`, r`\(50\) cm²`], r`\(S = 5^2 = 25\) cm².`, [
      undefined,
      'Đó là chu vi (đơn vị cm).',
      r`Tính nhầm \(5\cdot2\).`,
      'Nhân đôi nhầm.',
    ]),
    mc(2, DT14, 'Trong hình thoi, hai đường chéo', ['vuông góc với nhau', 'bằng nhau', 'song song với nhau', 'luôn bằng cạnh'], 'Hai đường chéo của hình thoi vuông góc với nhau và cắt nhau tại trung điểm mỗi đường.', [
      undefined,
      'Chỉ đúng khi hình thoi là hình vuông.',
      'Hai đường chéo luôn cắt nhau.',
      'Không đúng nói chung.',
    ]),
    mc(3, DT14, r`Hình thoi \(ABCD\) có \(\widehat{ABD} = 35^\circ\). Số đo \(\widehat{BAD}\) là`, [r`\(110^\circ\)`, r`\(70^\circ\)`, r`\(35^\circ\)`, r`\(145^\circ\)`], r`\(BD\) là phân giác góc \(B\) nên \(\widehat{ABC} = 70^\circ\); \(\widehat{BAD} = 180^\circ - 70^\circ = 110^\circ\).`, [
      undefined,
      r`Đó là \(\widehat{ABC}\).`,
      r`Đó là \(\widehat{ABD}\).`,
      r`Tính nhầm \(180^\circ - 35^\circ\).`,
    ]),
    mc(2, CM14, 'Hình bình hành có hai đường chéo vuông góc là', ['hình thoi', 'hình chữ nhật', 'hình vuông', 'hình thang cân không phải hình bình hành'], 'Đây là một dấu hiệu nhận biết hình thoi.', [
      undefined,
      'Hình chữ nhật cần hai đường chéo bằng nhau.',
      'Chưa có góc vuông hoặc hai đường chéo bằng nhau.',
      'Đã là hình bình hành.',
    ]),
    mc(2, CM14, 'Hình chữ nhật có hai cạnh kề bằng nhau là', ['hình vuông', 'hình bình hành không có góc vuông', 'hình thang cân có hai đáy khác nhau', 'tứ giác có đúng một góc vuông'], 'Hình chữ nhật có hai cạnh kề bằng nhau là hình vuông.', [
      undefined,
      'Hình chữ nhật có bốn góc vuông.',
      'Hai đáy của hình chữ nhật bằng nhau.',
      'Hình chữ nhật có bốn góc vuông.',
    ]),
    mc(3, CM14, r`Tứ giác \(ABCD\) có bốn cạnh bằng nhau và \(\widehat{A} = 90^\circ\). Khi đó \(ABCD\) là`, ['hình vuông', 'hình thoi không có góc vuông', 'hình chữ nhật có hai cạnh kề khác nhau', 'hình thang cân không phải hình chữ nhật'], 'Tứ giác có bốn cạnh bằng nhau là hình thoi; hình thoi có một góc vuông là hình vuông.', [
      undefined,
      r`Có \(\widehat{A} = 90^\circ\).`,
      'Bốn cạnh bằng nhau.',
      'Đã là hình thoi có góc vuông.',
    ]),
    mc(3, DK14, r`Hình chữ nhật \(ABCD\) là hình vuông khi`, [r`\(AC \perp BD\)`, r`\(AC = BD\)`, r`\(AB \parallel CD\)`, r`\(\widehat{A} = 90^\circ\)`], 'Hình chữ nhật có hai đường chéo vuông góc là hình vuông.', [
      undefined,
      'Mọi hình chữ nhật đều có hai đường chéo bằng nhau.',
      'Mọi hình chữ nhật đều có tính chất này.',
      'Mọi hình chữ nhật đều có góc vuông.',
    ]),
    mc(4, DK14, r`Tam giác \(ABC\) vuông tại \(A\), \(AD\) là đường phân giác (\(D \in BC\)). Kẻ \(DE \perp AB\), \(DF \perp AC\) (\(E \in AB\), \(F \in AC\)). Tứ giác \(AEDF\) là`, ['hình vuông', 'hình thoi không có góc vuông', 'hình chữ nhật có hai cạnh kề khác nhau', 'hình thang cân không phải hình chữ nhật'], r`\(AEDF\) có ba góc vuông nên là hình chữ nhật; đường chéo \(AD\) là phân giác góc \(A\) nên là hình vuông.`, [
      undefined,
      'Có góc vuông tại \\(A\\).',
      r`\(DE = DF\) vì \(D\) nằm trên tia phân giác.`,
      'Đã là hình chữ nhật có đường chéo là phân giác.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, TG14, 'Xét tính đúng sai:', [
      ['Hình thoi có bốn cạnh bằng nhau.', true, 'Định nghĩa.'],
      ['Hình vuông vừa là hình chữ nhật vừa là hình thoi.', true, 'Bốn góc vuông và bốn cạnh bằng nhau.'],
      ['Hình thoi có bốn góc bằng nhau.', false, 'Chỉ khi là hình vuông.'],
      ['Hình thoi cũng là hình bình hành.', true, 'Các cạnh đối bằng nhau.'],
    ]),
    tf(2, TG14, r`Hình thoi \(ABCD\) có tâm \(O\), \(AC = 10\) cm, \(BD = 24\) cm.`, [
      ['Diện tích hình thoi là 120 cm².', true, r`\(\dfrac{10\cdot24}{2}\).`],
      [r`\(OA = 5\) cm.`, true, 'Nửa đường chéo.'],
      ['Diện tích hình thoi là 240 cm².', false, 'Quên chia 2.'],
      [r`\(AC \perp BD\).`, true, 'Tính chất hình thoi.'],
    ]),
    tf(2, TG14, r`Hình thoi \(ABCD\) có \(\widehat{A} = 50^\circ\).`, [
      [r`\(\widehat{C} = 50^\circ\).`, true, 'Góc đối bằng nhau.'],
      [r`\(\widehat{B} = 130^\circ\).`, true, r`\(180^\circ - 50^\circ\).`],
      [r`\(\widehat{BAC} = 25^\circ\).`, true, r`\(AC\) là phân giác góc \(A\).`],
      [r`\(\widehat{ABD} = 50^\circ\).`, false, r`\(\widehat{ABD} = 130^\circ : 2 = 65^\circ\).`],
    ]),
    tf(2, DT14, r`Hình vuông \(ABCD\) có tâm \(O\).`, [
      [r`\(AC = BD\).`, true, 'Hình vuông là hình chữ nhật.'],
      [r`\(AC \perp BD\).`, true, 'Hình vuông là hình thoi.'],
      [r`\(\triangle OAB\) vuông cân tại \(O\).`, true, r`\(OA = OB\), \(\widehat{AOB} = 90^\circ\).`],
      [r`\(OA = AB\).`, false, r`\(OA\) là cạnh góc vuông, \(AB\) là cạnh huyền của \(\triangle OAB\).`],
    ]),
    tf(3, DT14, r`Hình thoi \(ABCD\) có tâm \(O\).`, [
      [r`\(AC\) là tia phân giác của góc \(A\).`, true, 'Tính chất hình thoi.'],
      [r`\(\triangle ABD\) cân tại \(A\).`, true, r`\(AB = AD\).`],
      [r`\(\triangle AOB\) vuông tại \(O\).`, true, r`\(AC \perp BD\).`],
      [r`\(\triangle ABC\) là tam giác đều.`, false, r`Chỉ đúng khi \(\widehat{B} = 60^\circ\).`],
    ]),
    tf(2, CM14, 'Xét tính đúng sai của các dấu hiệu:', [
      ['Hình bình hành có hai cạnh kề bằng nhau là hình thoi.', true, 'Dấu hiệu nhận biết.'],
      ['Hình bình hành có một đường chéo là phân giác của một góc là hình thoi.', true, 'Dấu hiệu nhận biết.'],
      ['Tứ giác có hai đường chéo vuông góc là hình thoi.', false, 'Cần là hình bình hành trước.'],
      ['Hình thoi có một góc vuông là hình vuông.', true, 'Dấu hiệu nhận biết.'],
    ]),
    tf(3, CM14, r`Hình chữ nhật \(ABCD\) có \(AB = 2AD\); \(M\), \(N\) lần lượt là trung điểm của \(AB\), \(CD\).`, [
      [r`\(AMND\) là hình chữ nhật.`, true, r`Hình bình hành \(AMND\) có \(\widehat{A} = 90^\circ\).`],
      [r`\(AM = AD\).`, true, r`\(AM = \dfrac{AB}{2} = AD\).`],
      [r`\(AMND\) là hình vuông.`, true, 'Hình chữ nhật có hai cạnh kề bằng nhau.'],
      [r`\(MBCN\) là hình thoi không có góc vuông.`, false, r`\(MBCN\) cũng là hình vuông.`],
    ]),
    tf(3, DK14, r`Cho hình bình hành \(ABCD\).`, [
      [r`Nếu \(AC \perp BD\) thì \(ABCD\) là hình thoi.`, true, 'Dấu hiệu nhận biết.'],
      [r`Nếu \(AC = BD\) thì \(ABCD\) là hình chữ nhật.`, true, 'Dấu hiệu nhận biết.'],
      [r`Nếu \(AC = BD\) và \(AC \perp BD\) thì \(ABCD\) là hình vuông.`, true, 'Vừa là hình chữ nhật vừa là hình thoi.'],
      [r`Nếu \(AB = BC\) thì \(ABCD\) là hình vuông.`, false, 'Mới là hình thoi.'],
    ]),
    tf(4, DK14, r`Cho tam giác \(ABC\), \(D\) là điểm trên cạnh \(BC\). Kẻ \(DE \parallel AC\) (\(E \in AB\)), \(DF \parallel AB\) (\(F \in AC\)).`, [
      [r`\(AEDF\) là hình bình hành.`, true, 'Các cạnh đối song song.'],
      [r`\(AEDF\) là hình thoi khi \(AD\) là tia phân giác của góc \(A\).`, true, 'Hình bình hành có đường chéo là phân giác.'],
      [r`\(AEDF\) là hình chữ nhật khi \(\widehat{A} = 90^\circ\).`, true, 'Hình bình hành có một góc vuông.'],
      [r`\(AEDF\) là hình vuông khi \(\widehat{A} = 90^\circ\).`, false, r`Cần thêm \(AD\) là phân giác góc \(A\).`],
    ]),
    tf(2, TG14, r`Hình vuông \(ABCD\) có cạnh 6 cm.`, [
      ['Chu vi là 24 cm.', true, r`\(4\cdot6\).`],
      ['Diện tích là 36 cm².', true, r`\(6^2\).`],
      [r`\(\widehat{CAB} = 45^\circ\).`, true, 'Đường chéo là phân giác góc vuông.'],
      ['Diện tích là 24 cm².', false, 'Nhầm với chu vi.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, TG14, 'Hình thoi có chu vi 36 cm. Tính độ dài cạnh hình thoi.', '9', r`Cạnh \(= 36 : 4 = 9\) cm.`, CM),
    sa(2, TG14, 'Hình thoi có hai đường chéo dài 12 cm và 9 cm. Tính diện tích hình thoi.', '54', r`\(S = \dfrac{12\cdot9}{2} = 54\) cm².`, CM2),
    sa(2, TG14, r`Hình thoi \(ABCD\) có \(\widehat{A} = 72^\circ\). Tính \(\widehat{ABD}\) (độ).`, '54', r`\(\widehat{ABC} = 108^\circ\); \(BD\) là phân giác nên \(\widehat{ABD} = 54^\circ\).`, DEG),
    sa(2, TG14, 'Hình vuông có chu vi 28 cm. Tính diện tích hình vuông.', '49', r`Cạnh 7 cm; diện tích \(7^2 = 49\) cm².`, CM2),
    sa(3, DT14, r`Hình thoi \(ABCD\) có \(\widehat{BAC} = 25^\circ\). Tính \(\widehat{ABC}\) (độ).`, '130', r`\(\widehat{BAD} = 50^\circ\) (đường chéo là phân giác); \(\widehat{ABC} = 180^\circ - 50^\circ = 130^\circ\).`, DEG),
    sa(3, DT14, 'Hình thoi có diện tích 96 cm² và một đường chéo dài 16 cm. Tính độ dài đường chéo còn lại.', '12', r`\(\dfrac{16\cdot d}{2} = 96 \Rightarrow d = 12\) cm.`, CM),
    sa(3, DT14, r`Cho hình vuông \(ABCD\) và điểm \(E\) nằm trong hình vuông sao cho tam giác \(EAB\) đều. Tính \(\widehat{ADE}\) (độ).`, '75', r`\(\widehat{DAE} = 90^\circ - 60^\circ = 30^\circ\); \(AD = AB = AE\) nên \(\triangle ADE\) cân tại \(A\): \(\widehat{ADE} = (180^\circ - 30^\circ) : 2 = 75^\circ\).`, DEG),
    sa(3, DK14, r`Hình thoi \(ABCD\) có hai đường chéo \(AC = 2x + 4\) và \(BD = 3x - 2\) (cm). Tìm \(x\) để \(ABCD\) là hình vuông.`, '6', r`Hình thoi là hình vuông khi hai đường chéo bằng nhau: \(2x + 4 = 3x - 2 \iff x = 6\).`),
    // ---- Tự luận ----
    es(2, TG14, r`Hình thoi \(ABCD\) có tâm \(O\) và \(\widehat{A} = 40^\circ\). Tính các góc của hình thoi và các góc của tam giác \(AOB\).`, r`\(\widehat{C} = 40^\circ\), \(\widehat{B} = \widehat{D} = 140^\circ\).
\(\widehat{OAB} = 20^\circ\), \(\widehat{OBA} = 70^\circ\) (đường chéo là phân giác), \(\widehat{AOB} = 90^\circ\) (hai đường chéo vuông góc).`, r`0,5 điểm: tính đúng bốn góc hình thoi.
0,5 điểm: tính đúng ba góc tam giác \(AOB\), có lí do.`),
    es(3, CM14, r`Cho tam giác \(ABC\), \(D\) là một điểm trên cạnh \(BC\). Kẻ \(DE \parallel AC\) (\(E \in AB\)), \(DF \parallel AB\) (\(F \in AC\)).
a) Chứng minh \(AEDF\) là hình bình hành.
b) Chứng minh nếu \(AD\) là tia phân giác của góc \(BAC\) thì \(AEDF\) là hình thoi.`, r`a) \(AE \parallel DF\), \(AF \parallel DE\) nên \(AEDF\) là hình bình hành.
b) Hình bình hành \(AEDF\) có đường chéo \(AD\) là tia phân giác của góc \(EAF\) nên là hình thoi.`, r`0,5 điểm: câu a.
0,5 điểm: câu b, nêu đúng dấu hiệu.`),
    es(3, DT14, r`Cho hình vuông \(ABCD\). Trên các cạnh \(AB\), \(AD\) lấy các điểm \(E\), \(F\) sao cho \(AE = AF\). Chứng minh \(CE = CF\).`, r`\(BE = AB - AE = AD - AF = DF\).
Hai tam giác vuông \(CBE\), \(CDF\) có \(CB = CD\), \(\widehat{B} = \widehat{D} = 90^\circ\), \(BE = DF\) nên bằng nhau (c.g.c).
Suy ra \(CE = CF\).`, r`0,5 điểm: chứng minh \(BE = DF\).
0,5 điểm: chứng minh hai tam giác bằng nhau và kết luận.`),
    es(4, DK14, r`Cho tam giác \(ABC\), \(D\) là điểm trên cạnh \(BC\); \(DE \parallel AC\) (\(E \in AB\)), \(DF \parallel AB\) (\(F \in AC\)). Tam giác \(ABC\) và điểm \(D\) cần thỏa mãn điều kiện gì để \(AEDF\) là hình vuông?`, r`\(AEDF\) là hình bình hành.
\(AEDF\) là hình chữ nhật \(\iff \widehat{A} = 90^\circ\).
\(AEDF\) là hình thoi \(\iff AD\) là tia phân giác của góc \(A\).
Vậy \(AEDF\) là hình vuông khi tam giác \(ABC\) vuông tại \(A\) và \(D\) là giao điểm của tia phân giác góc \(A\) với \(BC\).`, r`0,5 điểm: nêu đúng điều kiện để là hình chữ nhật và hình thoi.
0,5 điểm: kết hợp và kết luận đúng điều kiện hình vuông.`),
    ge(3, DT14, r`Cho hình thoi \(ABCD\) có \(\widehat{A} = 60^\circ\). Kẻ \(BH \perp AD\) (\(H \in AD\)). Chứng minh \(H\) là trung điểm của \(AD\).`, `A(0,0) B(2,3.46) C(6,3.46) D(4,0) H(2,0)
ABCDA BD BH:dash
vuong(B,H,D) goc(D,A,B)`, r`Tam giác \(ABD\) có \(AB = AD\) (cạnh hình thoi) và \(\widehat{A} = 60^\circ\) nên là tam giác đều.
Trong tam giác đều, đường cao \(BH\) cũng là đường trung tuyến, nên \(H\) là trung điểm của \(AD\).`, r`0,5 điểm: chứng minh tam giác \(ABD\) đều.
0,5 điểm: dùng tính chất đường cao – trung tuyến và kết luận.`),
  ],
};

export const BANK_CHUONG_3: BankLesson[] = [B10, B11, B12, B13, B14];
