/** Ngân hàng câu hỏi GĐ4 – Chương IX. Tam giác đồng dạng (phần 1: Bài 33 – Bài 35). */
import { es, ge, mc, r, sa, tf, type BankLesson } from './types';

const CM = { unit: 'cm' };
const M = { unit: 'm' };

const DN = 'dinh-nghia-ti-so-dong-dang';
const TD = 'tinh-do-dai-qua-dong-dang';
const SS = 'dong-dang-tu-duong-song-song';
const CD = 'chung-minh-dang-thuc-dong-dang';
const TT = 'thuc-te-tam-giac-dong-dang';

const B33: BankLesson = {
  slug: 'bai-33-hai-tam-giac-dong-dang',
  questions: [
    mc(1, DN, r`Cho \(\triangle A'B'C' \backsim \triangle ABC\). Khẳng định nào sau đây đúng?`, [r`\(\widehat{B'} = \widehat{B}\)`, r`\(A'B' = AB\)`, r`\(\widehat{B'} = \widehat{C}\)`, r`\(\dfrac{A'B'}{AB} = \dfrac{AC}{A'C'}\)`], 'Hai tam giác đồng dạng có các góc tương ứng bằng nhau, đọc theo thứ tự đỉnh trong kí hiệu.', [
      undefined,
      'Các cạnh tương ứng tỉ lệ, chưa chắc bằng nhau.',
      r`\(B'\) tương ứng với \(B\), không phải \(C\).`,
      'Tỉ số viết ngược một vế.',
    ]),
    mc(1, DN, r`Nếu \(\triangle DEF \backsim \triangle ABC\) theo tỉ số 2 thì \(\triangle ABC \backsim \triangle DEF\) theo tỉ số`, [r`\(\dfrac12\)`, r`\(2\)`, r`\(4\)`, r`\(1\)`], 'Tỉ số đồng dạng theo chiều ngược lại là số nghịch đảo.', [
      undefined,
      'Phải nghịch đảo.',
      'Không bình phương.',
      'Hai tam giác không bằng nhau.',
    ]),
    mc(1, DN, 'Hai tam giác bằng nhau thì đồng dạng với nhau theo tỉ số', [r`\(1\)`, r`\(0\)`, r`\(2\)`, 'không đồng dạng'], 'Các cạnh tương ứng bằng nhau nên tỉ số bằng 1.', [
      undefined,
      'Tỉ số đồng dạng luôn dương.',
      'Các cạnh bằng nhau.',
      'Hai tam giác bằng nhau là trường hợp đặc biệt của đồng dạng.',
    ]),
    mc(2, DN, r`\(\triangle MNP \backsim \triangle ABC\) có \(MN = 6\) cm, \(AB = 4\) cm. Tỉ số đồng dạng là`, [r`\(\dfrac32\)`, r`\(\dfrac23\)`, r`\(2\)`, r`\(24\)`], r`\(k = \dfrac{MN}{AB} = \dfrac64 = \dfrac32\).`, [
      undefined,
      'Đảo ngược tỉ số.',
      'Đó là hiệu hai cạnh.',
      'Đó là tích.',
    ]),
    mc(2, DN, r`\(\triangle ABC \backsim \triangle DEF\) có \(\widehat{A} = 50^\circ\), \(\widehat{B} = 70^\circ\). Số đo \(\widehat{F}\) là`, [r`\(60^\circ\)`, r`\(50^\circ\)`, r`\(70^\circ\)`, r`\(120^\circ\)`], r`\(\widehat{F} = \widehat{C} = 180^\circ - 120^\circ = 60^\circ\).`, [
      undefined,
      r`Đó là \(\widehat{D}\).`,
      r`Đó là \(\widehat{E}\).`,
      r`Đó là \(\widehat{A} + \widehat{B}\).`,
    ]),
    mc(2, TD, r`\(\triangle ABC \backsim \triangle MNP\) theo tỉ số \(\dfrac34\) và \(MN = 8\) cm. Độ dài \(AB\) là`, [r`\(6\) cm`, r`\(\dfrac{32}{3}\) cm`, r`\(24\) cm`, r`\(12\) cm`], r`\(\dfrac{AB}{MN} = \dfrac34\) nên \(AB = 6\) cm.`, [
      undefined,
      'Chia thay vì nhân.',
      'Chỉ nhân với 3.',
      'Tính sai.',
    ]),
    mc(3, TD, r`\(\triangle ABC \backsim \triangle DEF\) có \(AB = 4\), \(BC = 6\), \(CA = 5\) (cm) và \(DE = 6\) cm. Chu vi tam giác \(DEF\) là`, [r`\(22{,}5\) cm`, r`\(15\) cm`, r`\(22\) cm`, r`\(10\) cm`], r`Tỉ số \(\dfrac{DE}{AB} = \dfrac32\); chu vi \(DEF = \dfrac32\cdot15 = 22{,}5\) cm.`, [
      undefined,
      r`Đó là chu vi \(\triangle ABC\).`,
      'Tính sai.',
      'Nhân sai tỉ số.',
    ]),
    mc(2, SS, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)). Khẳng định nào sau đây đúng?`, [r`\(\triangle AMN \backsim \triangle ABC\)`, r`\(\triangle AMN \backsim \triangle ACB\)`, r`\(\triangle AMN \backsim \triangle BAC\)`, r`\(\triangle AMN = \triangle ABC\)`], 'Đường thẳng song song với một cạnh tạo tam giác đồng dạng; \\(M\\) tương ứng \\(B\\), \\(N\\) tương ứng \\(C\\).', [
      undefined,
      'Sai thứ tự đỉnh.',
      'Sai thứ tự đỉnh.',
      'Chỉ đồng dạng, không bằng nhau.',
    ]),
    mc(2, SS, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 3\) cm, \(AB = 9\) cm, \(BC = 12\) cm. Độ dài \(MN\) là`, [r`\(4\) cm`, r`\(9\) cm`, r`\(6\) cm`, r`\(36\) cm`], r`\(\dfrac{MN}{BC} = \dfrac{AM}{AB} = \dfrac13\) nên \(MN = 4\) cm.`, [
      undefined,
      'Tính sai tỉ số.',
      'Nhầm là đường trung bình.',
      'Nhân thay vì chia.',
    ]),
    mc(3, SS, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(AB = 3\) cm, \(CD = 6\) cm; hai đường chéo cắt nhau tại \(O\) và \(OC = 4\) cm. Độ dài \(OA\) là`, [r`\(2\) cm`, r`\(8\) cm`, r`\(1{,}5\) cm`, r`\(3\) cm`], r`\(\triangle OAB \backsim \triangle OCD\): \(\dfrac{OA}{OC} = \dfrac{AB}{CD} = \dfrac12\), \(OA = 2\) cm.`, [
      undefined,
      'Đảo ngược tỉ số.',
      'Tính sai.',
      r`Nhầm \(OA = AB\).`,
    ]),
    mc(3, SS, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)) và \(\dfrac{AM}{MB} = \dfrac23\). Tỉ số \(\dfrac{MN}{BC}\) là`, [r`\(\dfrac25\)`, r`\(\dfrac23\)`, r`\(\dfrac35\)`, r`\(\dfrac32\)`], r`\(\dfrac{AM}{AB} = \dfrac{2}{5}\) nên \(\dfrac{MN}{BC} = \dfrac25\).`, [
      undefined,
      r`Đó là \(\dfrac{AM}{MB}\), không phải \(\dfrac{AM}{AB}\).`,
      r`Đó là \(\dfrac{MB}{AB}\).`,
      'Đảo ngược.',
    ]),
    mc(3, CD, r`Tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)). Hệ thức nào sau đây đúng?`, [r`\(\dfrac{DE}{BC} = \dfrac{AD}{AB}\)`, r`\(\dfrac{DE}{BC} = \dfrac{AD}{DB}\)`, r`\(\dfrac{DE}{BC} = \dfrac{DB}{AB}\)`, r`\(DE\cdot BC = AD\cdot AB\)`], r`\(\triangle ADE \backsim \triangle ABC\) nên \(\dfrac{DE}{BC} = \dfrac{AD}{AB}\).`, [
      undefined,
      'Phải so với cả cạnh \\(AB\\).',
      'Sai đoạn.',
      'Không có hệ thức này.',
    ]),
    mc(4, CD, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(O\) là giao điểm hai đường chéo. Hệ thức nào sau đây đúng?`, [r`\(OA\cdot OD = OB\cdot OC\)`, r`\(OA\cdot OB = OC\cdot OD\)`, r`\(OA\cdot OC = OB\cdot OD\)`, r`\(OA = OC\)`], r`\(\triangle OAB \backsim \triangle OCD\): \(\dfrac{OA}{OC} = \dfrac{OB}{OD}\), suy ra \(OA\cdot OD = OB\cdot OC\).`, [
      undefined,
      'Nhân chéo sai.',
      'Nhân chéo sai.',
      'Chỉ khi hai đáy bằng nhau.',
    ]),
    mc(3, TT, r`Để đo chiều cao cây \(AB\), người ta đặt cọc \(CD\) cao 1,5 m vuông góc với mặt đất sao cho \(E\), \(D\), \(B\) thẳng hàng và \(E\), \(C\), \(A\) thẳng hàng trên mặt đất; đo được \(EC = 2\) m, \(EA = 10\) m. Chiều cao cây là`, [r`\(7{,}5\) m`, r`\(3\) m`, r`\(13{,}3\) m`, r`\(6\) m`], r`\(CD \parallel AB\) nên \(\triangle ECD \backsim \triangle EAB\): \(AB = \dfrac{CD\cdot EA}{EC} = \dfrac{1{,}5\cdot10}{2} = 7{,}5\) m.`, [
      undefined,
      'Lập tỉ lệ sai.',
      'Đảo ngược tỉ số.',
      'Tính sai.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, DN, r`Cho \(\triangle ABC \backsim \triangle DEF\) theo tỉ số 2.`, [
      [r`\(\widehat{A} = \widehat{D}\).`, true, 'Góc tương ứng.'],
      [r`\(AB = 2DE\).`, true, r`\(\dfrac{AB}{DE} = 2\).`],
      [r`\(\triangle DEF \backsim \triangle ABC\) theo tỉ số \(\dfrac12\).`, true, 'Nghịch đảo tỉ số.'],
      [r`\(BC = DE\).`, false, 'Không có dữ kiện; \\(BC = 2EF\\).'],
    ]),
    tf(2, DN, r`Tam giác \(ABC\) có \(AB = 3\), \(BC = 4\), \(CA = 5\); tam giác \(MNP\) có \(MN = 6\), \(NP = 8\), \(PM = 10\) và các góc tương ứng bằng nhau.`, [
      [r`\(\triangle MNP \backsim \triangle ABC\).`, true, 'Góc bằng nhau, cạnh tỉ lệ.'],
      ['Tỉ số đồng dạng là 2.', true, r`\(\dfrac{MN}{AB} = 2\).`],
      [r`Chu vi \(\triangle MNP\) gấp đôi chu vi \(\triangle ABC\).`, true, '24 và 12.'],
      [r`Tỉ số đồng dạng là \(\dfrac12\).`, false, 'Tỉ số của tam giác viết trước so với tam giác viết sau là 2.'],
    ]),
    tf(2, TD, r`\(\triangle ABC \backsim \triangle DEF\) theo tỉ số \(\dfrac32\); \(DE = 4\), \(EF = 6\), \(FD = 8\) (cm).`, [
      [r`\(AB = 6\) cm.`, true, r`\(\dfrac32\cdot4\).`],
      [r`\(BC = 9\) cm.`, true, r`\(\dfrac32\cdot6\).`],
      [r`\(CA = 12\) cm.`, true, r`\(\dfrac32\cdot8\).`],
      [r`Chu vi \(\triangle ABC\) bằng 18 cm.`, false, 'Chu vi là 27 cm.'],
    ]),
    tf(3, TD, r`\(\triangle A'B'C' \backsim \triangle ABC\); chu vi \(\triangle A'B'C'\) là 45 cm, chu vi \(\triangle ABC\) là 30 cm.`, [
      [r`Tỉ số đồng dạng là \(\dfrac32\).`, true, 'Bằng tỉ số chu vi.'],
      [r`Nếu \(AB = 8\) cm thì \(A'B' = 12\) cm.`, true, r`\(\dfrac32\cdot8\).`],
      [r`Nếu \(B'C' = 9\) cm thì \(BC = 6\) cm.`, true, r`\(9 : \dfrac32\).`],
      [r`Tỉ số đồng dạng là \(\dfrac23\).`, false, 'Đảo ngược.'],
    ]),
    tf(2, SS, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 2\) cm, \(MB = 3\) cm.`, [
      [r`\(\triangle AMN \backsim \triangle ABC\).`, true, 'Đường thẳng song song với một cạnh.'],
      [r`Tỉ số đồng dạng là \(\dfrac25\).`, true, r`\(\dfrac{AM}{AB}\).`],
      [r`\(\dfrac{MN}{BC} = \dfrac23\).`, false, r`\(\dfrac{MN}{BC} = \dfrac25\).`],
      [r`\(\dfrac{AN}{AC} = \dfrac25\).`, true, 'Tỉ số đồng dạng.'],
    ]),
    tf(3, SS, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(AB = 4\) cm, \(CD = 10\) cm; \(O\) là giao điểm hai đường chéo.`, [
      [r`\(\triangle OAB \backsim \triangle OCD\).`, true, r`\(AB \parallel CD\).`],
      [r`\(\dfrac{OA}{OC} = \dfrac25\).`, true, r`\(\dfrac{AB}{CD}\).`],
      [r`Nếu \(BD = 14\) cm thì \(OB = 4\) cm.`, true, r`\(OB = \dfrac27\cdot14\).`],
      [r`\(OA = OC\).`, false, 'Hai đáy khác nhau.'],
    ]),
    tf(3, CD, r`Tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)).`, [
      [r`\(\dfrac{AD}{AB} = \dfrac{AE}{AC}\).`, true, 'Định lí Thalès.'],
      [r`\(\dfrac{AD}{AB} = \dfrac{DE}{BC}\).`, true, 'Tam giác đồng dạng.'],
      [r`\(AD\cdot AC = AE\cdot AB\).`, true, 'Nhân chéo.'],
      [r`\(\dfrac{AD}{DB} = \dfrac{DE}{BC}\).`, false, r`Phải là \(\dfrac{AD}{AB}\).`],
    ]),
    tf(4, CD, r`Hình thang \(ABCD\) (\(AB \parallel CD\)), \(O\) là giao điểm hai đường chéo; đường thẳng qua \(O\) song song với \(AB\) cắt \(AD\), \(BC\) tại \(M\), \(N\).`, [
      [r`\(\dfrac{OM}{DC} = \dfrac{AO}{AC}\).`, true, r`\(\triangle AOM \backsim \triangle ACD\).`],
      [r`\(\dfrac{ON}{DC} = \dfrac{BO}{BD}\).`, true, r`\(\triangle BON \backsim \triangle BDC\).`],
      [r`\(\dfrac{AO}{AC} = \dfrac{BO}{BD}\).`, true, r`Từ \(\dfrac{OA}{OC} = \dfrac{OB}{OD}\).`],
      [r`\(OM = 2ON\).`, false, r`\(OM = ON\).`],
    ]),
    tf(3, TT, r`Để đo chiều cao cây \(AB\), người ta đặt cọc \(CD\) cao 1,2 m song song với cây; \(E\), \(D\), \(B\) thẳng hàng; \(E\), \(C\), \(A\) thẳng hàng trên mặt đất; \(EC = 1{,}5\) m, \(CA = 4{,}5\) m.`, [
      [r`\(\triangle ECD \backsim \triangle EAB\).`, true, r`\(CD \parallel AB\).`],
      [r`\(EA = 6\) m.`, true, r`\(1{,}5 + 4{,}5\).`],
      [r`Chiều cao cây là 4,8 m.`, true, r`\(\dfrac{1{,}2\cdot6}{1{,}5}\).`],
      [r`Chiều cao cây là 3,6 m.`, false, r`Dùng nhầm \(CA\) thay cho \(EA\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, TD, r`\(\triangle ABC \backsim \triangle DEF\) theo tỉ số \(\dfrac23\) và \(DE = 9\) cm. Tính \(AB\).`, '6', r`\(AB = \dfrac23\cdot9 = 6\) cm.`, CM),
    sa(3, SS, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 4\) cm, \(MB = 2\) cm, \(BC = 9\) cm. Tính \(MN\).`, '6', r`\(\dfrac{MN}{BC} = \dfrac{AM}{AB} = \dfrac46\), \(MN = 6\) cm.`, CM),
    sa(3, CD, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(O\) là giao điểm hai đường chéo, \(OA = 2\) cm, \(OC = 5\) cm, \(OB = 3\) cm. Tính \(OD\).`, '7,5', r`\(\dfrac{OA}{OC} = \dfrac{OB}{OD}\) nên \(OD = \dfrac{3\cdot5}{2} = 7{,}5\) cm.`, CM),
    sa(3, TT, r`Cọc \(CD\) cao 1,6 m đặt song song với cây \(AB\); \(E\), \(D\), \(B\) thẳng hàng; \(E\), \(C\), \(A\) thẳng hàng trên mặt đất; \(EC = 1{,}2\) m, \(CA = 6\) m. Tính chiều cao cây.`, '9,6', r`\(EA = 7{,}2\) m. \(AB = \dfrac{CD\cdot EA}{EC} = \dfrac{1{,}6\cdot7{,}2}{1{,}2} = 9{,}6\) m.`, M),
    // ---- Tự luận ----
    es(2, DN, r`Tam giác \(ABC\) có \(AB = 6\), \(BC = 8\), \(CA = 10\) (cm); tam giác \(DEF\) có \(DE = 9\), \(EF = 12\), \(FD = 15\) (cm) và \(\widehat{D} = \widehat{A}\), \(\widehat{E} = \widehat{B}\), \(\widehat{F} = \widehat{C}\). Chứng tỏ \(\triangle DEF \backsim \triangle ABC\) và tìm tỉ số đồng dạng.`, r`\(\dfrac{DE}{AB} = \dfrac96 = \dfrac32\); \(\dfrac{EF}{BC} = \dfrac{12}{8} = \dfrac32\); \(\dfrac{FD}{CA} = \dfrac{15}{10} = \dfrac32\).
Các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ nên \(\triangle DEF \backsim \triangle ABC\), tỉ số \(\dfrac32\).`, r`0,5 điểm: tính đúng ba tỉ số.
0,5 điểm: kết luận đúng với tỉ số.`),
    es(3, SS, r`Cho tam giác \(ABC\) có \(BC = 15\) cm. Trên \(AB\) lấy \(M\) sao cho \(AM = 2MB\); qua \(M\) kẻ đường thẳng song song với \(BC\) cắt \(AC\) tại \(N\). Chứng minh \(\triangle AMN \backsim \triangle ABC\) và tính \(MN\).`, r`\(MN \parallel BC\) nên \(\triangle AMN \backsim \triangle ABC\) (định lí về đường thẳng song song với một cạnh).
\(AM = 2MB\) nên \(\dfrac{AM}{AB} = \dfrac23\). Do đó \(\dfrac{MN}{BC} = \dfrac23\), \(MN = 10\) cm.`, r`0,5 điểm: chứng minh đồng dạng.
0,5 điểm: tính đúng tỉ số và \(MN\).`),
    es(3, TD, r`Cho \(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(\dfrac25\). Tam giác \(ABC\) có chu vi 40 cm, \(AB = 12\) cm, \(BC = 15\) cm. Tính các cạnh của tam giác \(A'B'C'\).`, r`\(CA = 40 - 12 - 15 = 13\) cm.
\(A'B' = \dfrac25\cdot12 = 4{,}8\) cm; \(B'C' = 6\) cm; \(C'A' = 5{,}2\) cm.`, r`0,25 điểm: tính \(CA\).
0,75 điểm: tính đúng ba cạnh.`),
    es(4, CD, r`Cho hình thang \(ABCD\) (\(AB \parallel CD\)), hai đường chéo cắt nhau tại \(O\).
a) Chứng minh \(\dfrac{OA}{OC} = \dfrac{AB}{CD}\). b) Tính \(AB\) biết \(OA = 3\) cm, \(OC = 7\) cm, \(CD = 14\) cm.`, r`a) \(AB \parallel CD\) nên \(\triangle OAB \backsim \triangle OCD\) (đường thẳng \(AB\) cắt phần kéo dài hai cạnh của \(\triangle OCD\)). Suy ra \(\dfrac{OA}{OC} = \dfrac{AB}{CD}\).
b) \(AB = \dfrac{OA}{OC}\cdot CD = \dfrac37\cdot14 = 6\) cm.`, r`0,5 điểm: câu a.
0,5 điểm: câu b.`),
    ge(3, SS, r`Cho tam giác \(ABC\) có \(AB = 8\) cm, \(AC = 10\) cm, \(BC = 12\) cm. Trên cạnh \(AB\) lấy \(M\) sao cho \(AM = 2\) cm; qua \(M\) kẻ đường thẳng song song với \(BC\) cắt \(AC\) tại \(N\). Chứng minh \(\triangle AMN \backsim \triangle ABC\) và tính \(MN\), \(AN\).`, `A(4.5,6.61) B(0,0) C(12,0) M(3.38,4.96) N(6.38,4.96)
ABCA MN`, r`\(MN \parallel BC\) nên \(\triangle AMN \backsim \triangle ABC\) với tỉ số \(\dfrac{AM}{AB} = \dfrac28 = \dfrac14\).
\(MN = \dfrac14BC = 3\) cm; \(AN = \dfrac14AC = 2{,}5\) cm.`, r`0,5 điểm: chứng minh đồng dạng, nêu tỉ số.
0,5 điểm: tính đúng \(MN\), \(AN\).`),
  ],
};

const CCC = 'dong-dang-ccc';
const CGC = 'dong-dang-cgc';
const GG = 'dong-dang-gg';
const TS = 'ti-so-doan-thang-chu-vi';
const HT = 'he-thuc-canh-goc-bang-nhau';
const TT4 = 'thuc-te-truong-hop-dong-dang';

const B34: BankLesson = {
  slug: 'bai-34-ba-truong-hop-dong-dang-cua-hai-tam-giac',
  questions: [
    mc(1, CCC, 'Tam giác có ba cạnh 2 cm, 3 cm, 4 cm đồng dạng với tam giác có ba cạnh nào sau đây?', ['4 cm, 6 cm, 8 cm', '3 cm, 4 cm, 5 cm', '2 cm, 4 cm, 6 cm', '4 cm, 6 cm, 9 cm'], r`\(\dfrac42 = \dfrac63 = \dfrac84 = 2\): ba cặp cạnh tỉ lệ.`, [
      undefined,
      'Các tỉ số khác nhau.',
      'Các tỉ số khác nhau.',
      r`\(\dfrac94 \ne 2\).`,
    ]),
    mc(2, CCC, r`Tam giác \(ABC\) có \(AB = 4\), \(BC = 5\), \(CA = 6\); tam giác \(MNP\) có \(MN = 12\), \(NP = 8\), \(PM = 10\). Khẳng định nào sau đây đúng?`, [r`\(\triangle ABC \backsim \triangle NPM\)`, r`\(\triangle ABC \backsim \triangle MNP\)`, r`\(\triangle ABC \backsim \triangle PMN\)`, r`\(\triangle ABC \backsim \triangle MPN\)`], r`Sắp xếp tăng dần: \(AB, BC, CA\) ứng với \(NP, PM, MN\) (tỉ số 2). Đỉnh \(A\) ứng \(N\), \(B\) ứng \(P\), \(C\) ứng \(M\).`, [
      undefined,
      'Sai thứ tự đỉnh tương ứng.',
      'Sai thứ tự đỉnh tương ứng.',
      'Sai thứ tự đỉnh tương ứng.',
    ]),
    mc(2, CGC, r`Hai tam giác \(ABC\) và \(DEF\) có \(\widehat{A} = \widehat{D}\) và \(\dfrac{AB}{DE} = \dfrac{AC}{DF}\). Khi đó`, [r`\(\triangle ABC \backsim \triangle DEF\)`, r`\(\triangle ABC \backsim \triangle EDF\)`, r`\(\triangle ABC = \triangle DEF\)`, 'hai tam giác không đồng dạng'], 'Trường hợp cạnh – góc – cạnh.', [
      undefined,
      'Sai thứ tự đỉnh.',
      'Chỉ đồng dạng.',
      'Đủ điều kiện c.g.c.',
    ]),
    mc(3, CGC, r`Tam giác \(ABC\) có \(AB = 12\) cm, \(AC = 18\) cm. Lấy \(D \in AB\), \(E \in AC\) với \(AD = 6\) cm, \(AE = 4\) cm. Khẳng định nào sau đây đúng?`, [r`\(\triangle ADE \backsim \triangle ACB\)`, r`\(\triangle ADE \backsim \triangle ABC\)`, r`\(DE \parallel BC\)`, r`\(\triangle ADE = \triangle ACB\)`], r`\(\dfrac{AD}{AC} = \dfrac{6}{18} = \dfrac13\), \(\dfrac{AE}{AB} = \dfrac{4}{12} = \dfrac13\), góc \(A\) chung: \(\triangle ADE \backsim \triangle ACB\) (c.g.c).`, [
      undefined,
      r`\(\dfrac{AD}{AB} = \dfrac12 \ne \dfrac{AE}{AC} = \dfrac29\).`,
      'Không có tỉ số Thalès bằng nhau.',
      'Chỉ đồng dạng.',
    ]),
    mc(2, GG, 'Hai tam giác có hai cặp góc tương ứng bằng nhau thì', ['đồng dạng', 'bằng nhau', 'đều là tam giác cân', 'đều là tam giác vuông'], 'Trường hợp góc – góc.', [
      undefined,
      'Chỉ đồng dạng.',
      'Không có cơ sở.',
      'Không có cơ sở.',
    ]),
    mc(2, GG, r`Tam giác \(ABC\) có \(\widehat{A} = 60^\circ\), \(\widehat{B} = 50^\circ\); tam giác \(DEF\) có \(\widehat{D} = 60^\circ\), \(\widehat{F} = 70^\circ\). Khẳng định nào sau đây đúng?`, [r`\(\triangle ABC \backsim \triangle DEF\)`, r`\(\triangle ABC \backsim \triangle DFE\)`, 'Hai tam giác không đồng dạng', r`\(\triangle ABC \backsim \triangle EDF\)`], r`\(\widehat{C} = 70^\circ = \widehat{F}\), \(\widehat{A} = \widehat{D}\) nên \(\triangle ABC \backsim \triangle DEF\).`, [
      undefined,
      'Sai thứ tự đỉnh.',
      'Có hai cặp góc bằng nhau.',
      'Sai thứ tự đỉnh.',
    ]),
    mc(3, GG, r`Tam giác \(ABC\) có \(AB = 4\) cm, \(AC = 8\) cm; điểm \(D\) trên \(AC\) sao cho \(\widehat{ABD} = \widehat{ACB}\). Độ dài \(AD\) là`, [r`\(2\) cm`, r`\(4\) cm`, r`\(6\) cm`, r`\(1\) cm`], r`\(\triangle ABD \backsim \triangle ACB\) (g.g) nên \(AB^2 = AD\cdot AC\), \(AD = \dfrac{16}{8} = 2\) cm.`, [
      undefined,
      'Nhầm \\(AD = AB\\).',
      r`Đó là \(DC\).`,
      'Tính sai.',
    ]),
    mc(2, TS, r`\(\triangle ABC \backsim \triangle DEF\) theo tỉ số \(\dfrac35\); chu vi tam giác \(DEF\) là 40 cm. Chu vi tam giác \(ABC\) là`, [r`\(24\) cm`, r`\(\dfrac{200}{3}\) cm`, r`\(40\) cm`, r`\(15\) cm`], r`Tỉ số chu vi bằng tỉ số đồng dạng: \(\dfrac35\cdot40 = 24\) cm.`, [
      undefined,
      'Chia thay vì nhân.',
      'Hai tam giác không bằng nhau.',
      'Tính sai.',
    ]),
    mc(3, TS, r`\(\triangle ABC \backsim \triangle DEF\) theo tỉ số \(\dfrac23\); chu vi \(\triangle DEF\) lớn hơn chu vi \(\triangle ABC\) là 10 cm. Chu vi tam giác \(ABC\) là`, [r`\(20\) cm`, r`\(30\) cm`, r`\(10\) cm`, r`\(15\) cm`], r`Gọi chu vi \(DEF\) là \(p\): \(p - \dfrac23p = 10 \iff p = 30\); chu vi \(ABC = 20\) cm.`, [
      undefined,
      r`Đó là chu vi \(\triangle DEF\).`,
      'Đó là hiệu chu vi.',
      'Tính sai.',
    ]),
    mc(3, HT, r`Tam giác \(ABC\) nhọn có các đường cao \(BD\), \(CE\). Hệ thức nào sau đây đúng?`, [r`\(AD\cdot AC = AE\cdot AB\)`, r`\(AD\cdot AB = AE\cdot AC\)`, r`\(AD = AE\)`, r`\(BD\cdot CE = AB\cdot AC\)`], r`\(\triangle ABD \backsim \triangle ACE\) (g.g) nên \(\dfrac{AB}{AC} = \dfrac{AD}{AE}\), suy ra \(AD\cdot AC = AE\cdot AB\).`, [
      undefined,
      'Nhân chéo sai.',
      'Chỉ đúng khi tam giác cân.',
      'Không có hệ thức này.',
    ]),
    mc(4, HT, r`Tam giác \(ABC\) nhọn có các đường cao \(BD\), \(CE\). Khi đó \(\triangle ADE \backsim \triangle ABC\) và`, [r`\(\widehat{ADE} = \widehat{ABC}\)`, r`\(\widehat{ADE} = \widehat{ACB}\)`, r`\(\widehat{AED} = \widehat{ABC}\)`, r`\(DE \parallel BC\)`], r`Từ \(AD\cdot AC = AE\cdot AB\) có \(\dfrac{AD}{AB} = \dfrac{AE}{AC}\); cùng góc \(A\) chung: \(\triangle ADE \backsim \triangle ABC\), \(D\) ứng với \(B\) nên \(\widehat{ADE} = \widehat{ABC}\).`, [
      undefined,
      r`\(D\) tương ứng với \(B\), không phải \(C\).`,
      r`\(E\) tương ứng với \(C\).`,
      'Nói chung không song song.',
    ]),
    mc(3, TT4, r`Để đo khoảng cách \(AB\) qua sông (\(AB \perp BD\)), người ta chọn \(C\) trên bờ với \(BC = 24\) m, \(CD = 10\) m, rồi đi theo hướng vuông góc với bờ đến \(E\) sao cho \(A\), \(C\), \(E\) thẳng hàng, \(DE = 15\) m. Khoảng cách \(AB\) là`, [r`\(36\) m`, r`\(6{,}25\) m`, r`\(16\) m`, r`\(9\) m`], r`\(\triangle ABC \backsim \triangle EDC\) (g.g: góc vuông, góc đối đỉnh) nên \(\dfrac{AB}{DE} = \dfrac{BC}{DC}\), \(AB = \dfrac{15\cdot24}{10} = 36\) m.`, [
      undefined,
      'Đảo ngược tỉ số.',
      'Lập sai tỉ lệ.',
      'Lập sai tỉ lệ.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, CCC, r`Tam giác \(ABC\) có ba cạnh 3, 4, 5 (cm); tam giác \(DEF\) có ba cạnh 6, 8, 10 (cm).`, [
      ['Tỉ số các cặp cạnh tương ứng đều bằng 2.', true, r`\(\dfrac63 = \dfrac84 = \dfrac{10}{5}\).`],
      [r`\(\triangle DEF \backsim \triangle ABC\).`, true, 'Trường hợp c.c.c.'],
      [r`Tỉ số đồng dạng của \(\triangle ABC\) so với \(\triangle DEF\) là \(\dfrac12\).`, true, 'Nghịch đảo.'],
      ['Hai tam giác bằng nhau.', false, 'Các cạnh không bằng nhau.'],
    ]),
    tf(2, CCC, r`Tam giác \(ABC\) có \(AB = 2\), \(BC = 3\), \(CA = 4\); tam giác \(A'B'C'\) có \(A'B' = 3\), \(B'C' = 4{,}5\), \(C'A' = 6\).`, [
      [r`\(\dfrac{A'B'}{AB} = \dfrac32\).`, true, 'Tính trực tiếp.'],
      [r`\(\triangle A'B'C' \backsim \triangle ABC\).`, true, 'Ba tỉ số bằng \\(\\dfrac32\\).'],
      [r`\(\widehat{B'} = \widehat{B}\).`, true, 'Góc tương ứng.'],
      [r`\(\widehat{A'} = \widehat{C}\).`, false, r`\(\widehat{A'} = \widehat{A}\).`],
    ]),
    tf(2, CGC, r`Tam giác \(ABC\) có \(\widehat{A} = 70^\circ\), \(AB = 6\), \(AC = 9\); tam giác \(DEF\) có \(\widehat{D} = 70^\circ\), \(DE = 4\), \(DF = 6\).`, [
      [r`\(\dfrac{AB}{DE} = \dfrac32\).`, true, 'Tính trực tiếp.'],
      [r`\(\dfrac{AC}{DF} = \dfrac32\).`, true, 'Tính trực tiếp.'],
      [r`\(\triangle ABC \backsim \triangle DEF\).`, true, 'Trường hợp c.g.c.'],
      [r`\(BC = EF\).`, false, r`\(BC = \dfrac32EF\).`],
    ]),
    tf(3, CGC, r`Tam giác \(ABC\) có \(AB = 8\), \(AC = 12\); lấy \(D \in AB\), \(E \in AC\) với \(AD = 3\), \(AE = 2\).`, [
      [r`\(\dfrac{AD}{AC} = \dfrac14\).`, true, r`\(\dfrac{3}{12}\).`],
      [r`\(\dfrac{AE}{AB} = \dfrac14\).`, true, r`\(\dfrac28\).`],
      [r`\(\triangle ADE \backsim \triangle ACB\).`, true, 'Trường hợp c.g.c, góc \\(A\\) chung.'],
      [r`\(DE \parallel BC\).`, false, r`\(\dfrac{AD}{AB} \ne \dfrac{AE}{AC}\).`],
    ]),
    tf(2, GG, 'Xét tính đúng sai của các khẳng định về hai tam giác đồng dạng theo trường hợp góc – góc:', [
      ['Hai tam giác vuông có một góc nhọn bằng nhau thì đồng dạng.', true, 'Thêm góc vuông: g.g.'],
      ['Hai tam giác đều luôn đồng dạng.', true, r`Các góc đều bằng \(60^\circ\).`],
      ['Hai tam giác cân có góc ở đỉnh bằng nhau thì đồng dạng.', true, 'Các góc ở đáy cũng bằng nhau.'],
      ['Hai tam giác có một cặp góc bằng nhau thì đồng dạng.', false, 'Cần hai cặp góc.'],
    ]),
    tf(3, GG, r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 9\) cm; \(D\) thuộc \(AC\) sao cho \(\widehat{ABD} = \widehat{ACB}\).`, [
      [r`\(\triangle ABD \backsim \triangle ACB\).`, true, 'g.g với góc \\(A\\) chung.'],
      [r`\(AB^2 = AD\cdot AC\).`, true, 'Từ tỉ số đồng dạng.'],
      [r`\(AD = 4\) cm.`, true, r`\(\dfrac{36}{9}\).`],
      [r`\(DC = 4\) cm.`, false, r`\(DC = 9 - 4 = 5\) cm.`],
    ]),
    tf(3, TS, r`\(\triangle ABC \backsim \triangle MNP\) có \(AB = 6\) cm, \(MN = 9\) cm; chu vi \(\triangle MNP\) là 36 cm.`, [
      [r`Tỉ số đồng dạng là \(\dfrac23\).`, true, r`\(\dfrac69\).`],
      [r`Chu vi \(\triangle ABC\) là 24 cm.`, true, r`\(\dfrac23\cdot36\).`],
      ['Hiệu hai chu vi là 12 cm.', true, r`\(36 - 24\).`],
      [r`Chu vi \(\triangle ABC\) là 54 cm.`, false, 'Nhân với nghịch đảo tỉ số.'],
    ]),
    tf(4, HT, r`Tam giác \(ABC\) nhọn có \(BD \perp AC\), \(CE \perp AB\), \(H\) là giao điểm của \(BD\) và \(CE\).`, [
      [r`\(\triangle ABD \backsim \triangle ACE\).`, true, 'Góc vuông và góc \\(A\\) chung.'],
      [r`\(AD\cdot AC = AE\cdot AB\).`, true, 'Từ tỉ số đồng dạng.'],
      [r`\(\triangle HBE \backsim \triangle HCD\).`, true, 'Góc vuông và góc đối đỉnh tại \\(H\\).'],
      [r`\(HB = HC\).`, false, 'Chỉ đúng khi tam giác cân tại \\(A\\).'],
    ]),
    tf(3, TT4, 'Cùng một thời điểm, bóng của một cột cờ trên mặt đất dài 9 m, bóng của một cây sào cao 2 m dài 1,5 m.', [
      ['Hai tam giác vuông tạo bởi vật, bóng và tia nắng đồng dạng.', true, 'Tia nắng song song nên có góc nhọn bằng nhau.'],
      ['Cột cờ cao 12 m.', true, r`\(\dfrac{2\cdot9}{1{,}5}\).`],
      ['Tỉ số giữa chiều dài bóng và chiều cao vật là như nhau.', true, 'Tam giác đồng dạng.'],
      ['Cột cờ cao 6,75 m.', false, 'Lập sai tỉ lệ.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, CCC, r`Tam giác \(ABC\) có \(AB = 5\), \(BC = 7\), \(CA = 8\) (cm). Tam giác \(DEF \backsim \triangle ABC\) có \(DE = 15\) cm. Tính chu vi tam giác \(DEF\).`, '60', r`Tỉ số \(\dfrac{15}{5} = 3\); chu vi \(DEF = 3\cdot20 = 60\) cm.`, CM),
    sa(3, GG, r`Tam giác \(ABC\) có \(AB = 10\) cm, \(AC = 25\) cm; \(D\) thuộc \(AC\) sao cho \(\widehat{ABD} = \widehat{ACB}\). Tính \(AD\).`, '4', r`\(AB^2 = AD\cdot AC\) nên \(AD = \dfrac{100}{25} = 4\) cm.`, CM),
    sa(3, TT4, r`Để đo khoảng cách \(AB\) qua sông (\(AB \perp BD\), \(DE \perp BD\), \(A\), \(C\), \(E\) thẳng hàng, \(C\) nằm giữa \(B\) và \(D\)), đo được \(BC = 30\) m, \(CD = 12\) m, \(DE = 18\) m. Tính \(AB\).`, '45', r`\(\triangle ABC \backsim \triangle EDC\) nên \(AB = \dfrac{DE\cdot BC}{CD} = \dfrac{18\cdot30}{12} = 45\) m.`, M),
    // ---- Tự luận ----
    es(2, CCC, r`Tam giác thứ nhất có ba cạnh 4 cm, 6 cm, 9 cm; tam giác thứ hai có ba cạnh 6 cm, 9 cm, 13,5 cm. Hai tam giác có đồng dạng không? Nếu có, tìm tỉ số đồng dạng của tam giác thứ hai so với tam giác thứ nhất.`, r`Sắp xếp các cạnh tăng dần và lập tỉ số: \(\dfrac64 = \dfrac96 = \dfrac{13{,}5}{9} = \dfrac32\).
Ba cặp cạnh tỉ lệ nên hai tam giác đồng dạng (c.c.c), tỉ số \(\dfrac32\).`, r`0,5 điểm: lập đúng ba tỉ số.
0,5 điểm: kết luận và nêu tỉ số.`),
    es(3, CGC, r`Tam giác \(ABC\) có \(AB = 9\) cm, \(AC = 12\) cm, \(BC = 15\) cm. Trên \(AB\) lấy \(D\) với \(AD = 4\) cm, trên \(AC\) lấy \(E\) với \(AE = 3\) cm. Chứng minh \(\triangle AED \backsim \triangle ABC\) và tính \(DE\).`, r`\(\dfrac{AE}{AB} = \dfrac39 = \dfrac13\), \(\dfrac{AD}{AC} = \dfrac{4}{12} = \dfrac13\), góc \(A\) chung nên \(\triangle AED \backsim \triangle ABC\) (c.g.c).
\(\dfrac{ED}{BC} = \dfrac13\), \(DE = 5\) cm.`, r`0,5 điểm: chứng minh đồng dạng, ghép đúng cặp cạnh.
0,5 điểm: tính đúng \(DE\).`),
    es(3, GG, r`Cho hình thang \(ABCD\) (\(AB \parallel CD\)) có \(\widehat{DAB} = \widehat{DBC}\). Chứng minh \(\triangle ABD \backsim \triangle BDC\) và \(BD^2 = AB\cdot DC\).`, r`\(AB \parallel CD\) nên \(\widehat{ABD} = \widehat{BDC}\) (so le trong); lại có \(\widehat{DAB} = \widehat{DBC}\).
Do đó \(\triangle ABD \backsim \triangle BDC\) (g.g).
Suy ra \(\dfrac{AB}{BD} = \dfrac{BD}{DC}\), tức \(BD^2 = AB\cdot DC\).`, r`0,5 điểm: chứng minh đồng dạng (đủ hai cặp góc).
0,5 điểm: suy ra hệ thức.`),
    es(3, TS, r`\(\triangle ABC \backsim \triangle A'B'C'\) theo tỉ số \(\dfrac34\); tổng chu vi của hai tam giác là 70 cm. Tính chu vi mỗi tam giác.`, r`Gọi chu vi \(A'B'C'\) là \(p\); chu vi \(ABC\) là \(\dfrac34p\).
\(p + \dfrac34p = 70 \iff p = 40\). Chu vi \(ABC\) là 30 cm, chu vi \(A'B'C'\) là 40 cm.`, r`0,5 điểm: lập đúng phương trình theo tỉ số chu vi.
0,5 điểm: tính đúng hai chu vi.`),
    es(4, HT, r`Tam giác \(ABC\) có \(AB = 4\) cm, \(AC = 6\) cm, \(BC = 8\) cm. Trên \(BC\) lấy \(D\) sao cho \(BD = 2\) cm. Chứng minh \(\triangle BDA \backsim \triangle BAC\), từ đó suy ra \(\widehat{BAD} = \widehat{BCA}\) và tính \(AD\).`, r`\(\dfrac{BD}{BA} = \dfrac24 = \dfrac12\), \(\dfrac{BA}{BC} = \dfrac48 = \dfrac12\), góc \(B\) chung nên \(\triangle BDA \backsim \triangle BAC\) (c.g.c).
Suy ra \(\widehat{BAD} = \widehat{BCA}\) (góc tương ứng) và \(\dfrac{AD}{CA} = \dfrac12\), \(AD = 3\) cm.`, r`0,5 điểm: chứng minh đồng dạng.
0,25 điểm: suy ra hai góc bằng nhau.
0,25 điểm: tính đúng \(AD\).`),
  ],
};

const TC = 'tinh-canh-tam-giac-vuong';
const TH5 = 'tinh-do-dai-trong-hinh-phang';
const NB = 'nhan-biet-tam-giac-vuong';
const UD = 'ung-dung-thuc-te-pythagore';

const B35: BankLesson = {
  slug: 'bai-35-dinh-li-pythagore-va-ung-dung',
  questions: [
    mc(1, TC, r`Tam giác \(ABC\) vuông tại \(A\). Hệ thức nào sau đây đúng?`, [r`\(BC^2 = AB^2 + AC^2\)`, r`\(AB^2 = AC^2 + BC^2\)`, r`\(AC^2 = AB^2 + BC^2\)`, r`\(BC = AB + AC\)`], r`Cạnh huyền \(BC\) đối diện góc vuông.`, [
      undefined,
      r`\(AB\) không phải cạnh huyền.`,
      r`\(AC\) không phải cạnh huyền.`,
      'Không cộng độ dài.',
    ]),
    mc(1, TC, 'Một tam giác vuông có hai cạnh góc vuông dài 5 cm và 12 cm. Cạnh huyền dài', [r`\(13\) cm`, r`\(17\) cm`, r`\(7\) cm`, r`\(169\) cm`], r`\(\sqrt{25 + 144} = \sqrt{169} = 13\) cm.`, [
      undefined,
      'Cộng hai cạnh.',
      'Trừ hai cạnh.',
      'Quên khai căn.',
    ]),
    mc(2, TC, 'Một tam giác vuông có cạnh huyền 10 cm, một cạnh góc vuông 6 cm. Cạnh góc vuông còn lại dài', [r`\(8\) cm`, r`\(4\) cm`, r`\(16\) cm`, r`\(\sqrt{136}\) cm`], r`\(\sqrt{100 - 36} = 8\) cm.`, [
      undefined,
      'Trừ hai cạnh.',
      'Cộng hai cạnh.',
      'Cộng bình phương thay vì trừ.',
    ]),
    mc(2, TC, 'Tam giác vuông cân có cạnh góc vuông bằng 3 cm thì cạnh huyền bằng', [r`\(3\sqrt2\) cm`, r`\(6\) cm`, r`\(9\) cm`, r`\(18\) cm`], r`\(\sqrt{9 + 9} = \sqrt{18} = 3\sqrt2\) cm.`, [
      undefined,
      'Cộng hai cạnh.',
      r`Đó là \(3^2\).`,
      'Quên khai căn.',
    ]),
    mc(3, TC, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB : AC = 5 : 12\) và \(BC = 26\) cm. Độ dài \(AB\) là`, [r`\(10\) cm`, r`\(24\) cm`, r`\(5\) cm`, r`\(13\) cm`], r`\(AB = 5k\), \(AC = 12k\): \(169k^2 = 676 \iff k = 2\); \(AB = 10\) cm.`, [
      undefined,
      r`Đó là \(AC\).`,
      'Chưa nhân với \\(k\\).',
      'Đó là nửa cạnh huyền.',
    ]),
    mc(2, NB, 'Bộ ba độ dài nào sau đây là độ dài ba cạnh của một tam giác vuông?', ['7; 24; 25', '4; 5; 6', '5; 6; 8', '6; 7; 9'], r`\(7^2 + 24^2 = 49 + 576 = 625 = 25^2\).`, [
      undefined,
      r`\(16 + 25 \ne 36\).`,
      r`\(25 + 36 \ne 64\).`,
      r`\(36 + 49 \ne 81\).`,
    ]),
    mc(2, NB, r`Tam giác \(ABC\) có \(AB = 9\), \(AC = 40\), \(BC = 41\). Khẳng định nào sau đây đúng?`, [r`Tam giác vuông tại \(A\)`, r`Tam giác vuông tại \(B\)`, r`Tam giác vuông tại \(C\)`, 'Tam giác không vuông'], r`\(BC^2 = 1681 = 81 + 1600 = AB^2 + AC^2\); góc vuông đối diện cạnh lớn nhất \(BC\).`, [
      undefined,
      r`Góc vuông đối diện cạnh \(BC\), tức tại \(A\).`,
      r`Góc vuông đối diện cạnh \(BC\).`,
      'Thỏa định lí Pythagore đảo.',
    ]),
    mc(2, TH5, 'Hình chữ nhật có hai cạnh 9 cm và 12 cm. Độ dài đường chéo là', [r`\(15\) cm`, r`\(21\) cm`, r`\(108\) cm`, r`\(225\) cm`], r`\(\sqrt{81 + 144} = 15\) cm.`, [
      undefined,
      'Cộng hai cạnh.',
      'Đó là diện tích.',
      'Quên khai căn.',
    ]),
    mc(3, TH5, 'Hình vuông có cạnh 4 cm. Độ dài đường chéo là', [r`\(4\sqrt2\) cm`, r`\(8\) cm`, r`\(16\) cm`, r`\(2\sqrt2\) cm`], r`\(\sqrt{16 + 16} = 4\sqrt2\) cm.`, [
      undefined,
      'Cộng hai cạnh.',
      'Đó là diện tích.',
      'Chia đôi nhầm.',
    ]),
    mc(3, TH5, 'Hình thoi có hai đường chéo dài 12 cm và 16 cm. Độ dài cạnh hình thoi là', [r`\(10\) cm`, r`\(14\) cm`, r`\(20\) cm`, r`\(28\) cm`], r`Nửa hai đường chéo là 6 cm và 8 cm, vuông góc nhau: cạnh \(\sqrt{36 + 64} = 10\) cm.`, [
      undefined,
      'Cộng nửa hai đường chéo.',
      'Dùng cả hai đường chéo mà không chia đôi.',
      'Cộng hai đường chéo.',
    ]),
    mc(4, TH5, 'Hình thang cân có hai đáy 4 cm và 10 cm, cạnh bên 5 cm. Chiều cao hình thang là', [r`\(4\) cm`, r`\(3\) cm`, r`\(5\) cm`, r`\(\sqrt{34}\) cm`], r`Phần đáy lớn mỗi bên \((10 - 4) : 2 = 3\) cm; chiều cao \(\sqrt{25 - 9} = 4\) cm.`, [
      undefined,
      'Đó là đoạn chiếu của cạnh bên.',
      'Đó là cạnh bên.',
      'Cộng bình phương thay vì trừ.',
    ]),
    mc(2, UD, 'Một chiếc thang dài 13 m dựa vào tường thẳng đứng, chân thang cách chân tường 5 m. Đầu thang ở độ cao', [r`\(12\) m`, r`\(8\) m`, r`\(18\) m`, r`\(\sqrt{194}\) m`], r`\(\sqrt{169 - 25} = 12\) m.`, [
      undefined,
      'Trừ độ dài.',
      'Cộng độ dài.',
      'Cộng bình phương.',
    ]),
    mc(3, UD, 'Một người đi 6 km về phía Bắc rồi đi tiếp 8 km về phía Đông. Khi đó người đó cách điểm xuất phát', [r`\(10\) km`, r`\(14\) km`, r`\(2\) km`, r`\(48\) km`], r`Hai hướng vuông góc: \(\sqrt{36 + 64} = 10\) km.`, [
      undefined,
      'Đó là quãng đường đã đi.',
      'Trừ độ dài.',
      'Nhân độ dài.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, TC, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\) cm, \(AC = 8\) cm.`, [
      [r`\(BC^2 = 100\).`, true, r`\(36 + 64\).`],
      [r`\(BC = 10\) cm.`, true, 'Khai căn.'],
      [r`\(BC = 14\) cm.`, false, 'Không cộng độ dài.'],
      [r`\(BC\) là cạnh lớn nhất.`, true, 'Cạnh huyền.'],
    ]),
    tf(2, TC, r`Tam giác \(MNP\) vuông tại \(M\) có \(NP = 17\) cm, \(MN = 8\) cm.`, [
      [r`\(MP^2 = 225\).`, true, r`\(289 - 64\).`],
      [r`\(MP = 15\) cm.`, true, 'Khai căn.'],
      ['Chu vi tam giác là 40 cm.', true, r`\(8 + 15 + 17\).`],
      [r`\(MP = 9\) cm.`, false, 'Không trừ độ dài.'],
    ]),
    tf(1, NB, 'Bộ ba độ dài nào là ba cạnh của tam giác vuông?', [
      ['3; 4; 5.', true, r`\(9 + 16 = 25\).`],
      ['6; 8; 10.', true, r`\(36 + 64 = 100\).`],
      ['2; 3; 4.', false, r`\(4 + 9 \ne 16\).`],
      ['5; 12; 13.', true, r`\(25 + 144 = 169\).`],
    ]),
    tf(2, NB, r`Tam giác \(ABC\) có \(AB = 15\), \(BC = 20\), \(AC = 25\).`, [
      [r`\(AC^2 = AB^2 + BC^2\).`, true, r`\(625 = 225 + 400\).`],
      [r`Tam giác vuông tại \(B\).`, true, r`Đối diện cạnh \(AC\).`],
      [r`Tam giác vuông tại \(A\).`, false, r`Góc vuông tại \(B\).`],
      [r`\(\widehat{A} + \widehat{C} = 90^\circ\).`, true, 'Hai góc nhọn của tam giác vuông.'],
    ]),
    tf(2, TH5, r`Hình chữ nhật \(ABCD\) có \(AB = 8\) cm, \(BC = 6\) cm, \(O\) là giao điểm hai đường chéo.`, [
      [r`\(AC = 10\) cm.`, true, r`\(\sqrt{64 + 36}\).`],
      [r`\(BD = 10\) cm.`, true, 'Hai đường chéo bằng nhau.'],
      [r`\(OA = 5\) cm.`, true, 'Nửa đường chéo.'],
      [r`\(AC = 14\) cm.`, false, 'Không cộng hai cạnh.'],
    ]),
    tf(3, TH5, 'Tam giác đều cạnh 4 cm.', [
      [r`Đường cao bằng \(2\sqrt3\) cm.`, true, r`\(\sqrt{16 - 4}\).`],
      [r`Bình phương đường cao bằng 12.`, true, r`\(16 - 4\).`],
      [r`Diện tích bằng \(4\sqrt3\) cm².`, true, r`\(\dfrac12\cdot4\cdot2\sqrt3\).`],
      ['Đường cao bằng 2 cm.', false, 'Đó là nửa cạnh.'],
    ]),
    tf(4, TH5, r`Hình thang cân \(ABCD\) có đáy nhỏ \(AB = 6\) cm, đáy lớn \(CD = 14\) cm, cạnh bên 5 cm; \(AH \perp CD\).`, [
      [r`\(DH = 4\) cm.`, true, r`\((14 - 6) : 2\).`],
      ['Chiều cao bằng 3 cm.', true, r`\(\sqrt{25 - 16}\).`],
      ['Diện tích bằng 30 cm².', true, r`\(\dfrac{(6 + 14)\cdot3}{2}\).`],
      [r`Đường chéo \(AC = 13\) cm.`, false, r`\(AC = \sqrt{3^2 + 10^2} = \sqrt{109}\) cm.`],
    ]),
    tf(2, UD, 'Một chiếc thang dài 5 m dựa vào tường thẳng đứng, chân thang cách chân tường 3 m.', [
      ['Đầu thang ở độ cao 4 m.', true, r`\(\sqrt{25 - 9}\).`],
      ['Thang, tường và mặt đất tạo thành tam giác vuông.', true, 'Tường vuông góc với mặt đất.'],
      ['Thang là cạnh huyền.', true, 'Đối diện góc vuông.'],
      ['Đầu thang ở độ cao 2 m.', false, 'Không trừ độ dài.'],
    ]),
    tf(3, UD, 'Hai thuyền cùng rời một bến: thuyền thứ nhất đi 9 km về hướng Bắc, thuyền thứ hai đi 12 km về hướng Đông.', [
      ['Hai thuyền cách nhau 15 km.', true, r`\(\sqrt{81 + 144}\).`],
      ['Hai hướng đi tạo thành góc vuông.', true, 'Bắc và Đông vuông góc.'],
      [r`\(15^2 = 9^2 + 12^2\).`, true, 'Định lí Pythagore.'],
      ['Hai thuyền cách nhau 21 km.', false, 'Không cộng độ dài.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(2, TC, 'Một tam giác vuông có hai cạnh góc vuông dài 9 cm và 40 cm. Tính cạnh huyền.', '41', r`\(\sqrt{81 + 1600} = \sqrt{1681} = 41\) cm.`, CM),
    sa(3, TH5, 'Hình thoi có hai đường chéo dài 10 cm và 24 cm. Tính độ dài cạnh hình thoi.', '13', r`\(\sqrt{5^2 + 12^2} = 13\) cm.`, CM),
    sa(3, UD, 'Một cây tre cao 9 m bị gió làm gãy, ngọn tre chạm đất cách gốc 3 m. Điểm gãy cách gốc bao nhiêu mét?', '4', r`Gọi khoảng cách từ gốc đến điểm gãy là \(x\): \(x^2 + 3^2 = (9 - x)^2 \iff 18x = 72 \iff x = 4\) m.`, M),
    // ---- Tự luận ----
    es(2, TC, r`Tam giác \(ABC\) vuông tại \(A\). Tính:
a) \(BC\) biết \(AB = 7\) cm, \(AC = 24\) cm; b) \(AB\) biết \(BC = 17\) cm, \(AC = 15\) cm.`, r`a) \(BC = \sqrt{49 + 576} = \sqrt{625} = 25\) cm.
b) \(AB = \sqrt{289 - 225} = \sqrt{64} = 8\) cm.`, r`0,5 điểm: câu a.
0,5 điểm: câu b.`),
    es(2, NB, 'Các tam giác có độ dài ba cạnh sau có phải tam giác vuông không? Nếu có, góc vuông đối diện cạnh nào?\na) 12 cm, 16 cm, 20 cm; b) 5 cm, 7 cm, 9 cm.', r`a) \(20^2 = 400 = 144 + 256 = 12^2 + 16^2\): tam giác vuông, góc vuông đối diện cạnh 20 cm.
b) \(9^2 = 81 \ne 25 + 49 = 74\): không phải tam giác vuông.`, r`0,5 điểm: câu a.
0,5 điểm: câu b.`),
    es(3, TH5, 'Một hình chữ nhật có chiều dài 24 cm và đường chéo 25 cm. Tính chiều rộng và diện tích hình chữ nhật.', r`Chiều rộng \(\sqrt{625 - 576} = \sqrt{49} = 7\) cm.
Diện tích \(24\cdot7 = 168\) cm².`, r`0,5 điểm: tính đúng chiều rộng.
0,5 điểm: tính đúng diện tích.`),
    es(3, UD, 'Màn hình một chiếc ti vi hình chữ nhật có chiều rộng 80 cm, chiều cao 60 cm. Tính độ dài đường chéo màn hình theo xăng-ti-mét và theo inch (1 inch ≈ 2,54 cm, làm tròn đến hàng đơn vị).', r`Đường chéo \(\sqrt{80^2 + 60^2} = \sqrt{10000} = 100\) cm.
Theo inch: \(100 : 2{,}54 \approx 39\) inch.`, r`0,5 điểm: tính đúng 100 cm.
0,5 điểm: đổi đúng sang inch.`),
    es(4, TH5, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\) cm, \(AC = 8\) cm; \(M\) là trung điểm của \(BC\). Tính \(AM\) và chu vi tam giác \(ABM\).`, r`\(BC = \sqrt{36 + 64} = 10\) cm.
\(AM\) là trung tuyến ứng với cạnh huyền nên \(AM = \dfrac{BC}{2} = 5\) cm; \(BM = 5\) cm.
Chu vi \(\triangle ABM = 6 + 5 + 5 = 16\) cm.`, r`0,5 điểm: tính \(BC\) bằng Pythagore.
0,5 điểm: tính \(AM\), \(BM\) và chu vi.`),
    ge(2, TC, r`Cho tam giác \(ABC\) vuông tại \(A\) có \(AB = 9\) cm, \(BC = 15\) cm. Tính \(AC\) và chu vi tam giác \(ABC\).`, `A(0,0) B(0,4.5) C(6,0)
ABCA
vuong(B,A,C)`, r`Theo định lí Pythagore: \(AC^2 = BC^2 - AB^2 = 225 - 81 = 144\), \(AC = 12\) cm.
Chu vi \(9 + 12 + 15 = 36\) cm.`, r`0,5 điểm: tính đúng \(AC\).
0,5 điểm: tính đúng chu vi.`),
    ge(3, TH5, r`Cho tam giác \(ABC\) cân tại \(A\) có \(AB = AC = 10\) cm, \(BC = 12\) cm. Kẻ đường cao \(AH\). Tính \(AH\) và diện tích tam giác \(ABC\).`, `A(0,4) B(-3,0) C(3,0) H(0,0)
ABCA AH
vuong(A,H,C)`, r`Trong tam giác cân, đường cao \(AH\) cũng là trung tuyến nên \(BH = 6\) cm.
\(AH = \sqrt{AB^2 - BH^2} = \sqrt{100 - 36} = 8\) cm.
Diện tích \(\dfrac12\cdot12\cdot8 = 48\) cm².`, r`0,25 điểm: chỉ ra \(BH = 6\) cm.
0,5 điểm: tính \(AH = 8\) cm.
0,25 điểm: tính diện tích.`),
  ],
};


const CM2 = { unit: 'cm²' };

const CMV = 'chung-minh-tam-giac-vuong-dong-dang';
const GTV = 'giai-toan-tam-giac-vuong-dong-dang';
const TSD = 'ti-so-duong-cao-dien-tich';
const TTV = 'thuc-te-tam-giac-vuong-dong-dang';

const B36: BankLesson = {
  slug: 'bai-36-cac-truong-hop-dong-dang-cua-hai-tam-giac-vuong',
  questions: [
    mc(1, CMV, 'Hai tam giác vuông đồng dạng với nhau nếu', ['có một góc nhọn bằng nhau', 'có một cạnh góc vuông bằng nhau', 'có cạnh huyền bằng nhau', 'có chu vi bằng nhau'], 'Hai tam giác vuông có thêm một cặp góc nhọn bằng nhau thì đồng dạng (g.g).', [
      undefined,
      'Một cặp cạnh bằng nhau chưa đủ.',
      'Cạnh huyền bằng nhau chưa đủ.',
      'Chu vi bằng nhau không liên quan đến đồng dạng.',
    ]),
    mc(1, CMV, r`Tam giác \(ABC\) vuông tại \(A\) và tam giác \(DEF\) vuông tại \(D\) có \(\widehat{B} = \widehat{E}\). Khẳng định nào sau đây đúng?`, [r`\(\triangle ABC \backsim \triangle DEF\)`, r`\(\triangle ABC \backsim \triangle EDF\)`, r`\(\triangle ABC \backsim \triangle DFE\)`, r`\(\triangle ABC = \triangle DEF\)`], r`Góc vuông \(A\) ứng với \(D\), \(\widehat{B} = \widehat{E}\) nên \(\triangle ABC \backsim \triangle DEF\).`, [
      undefined,
      r`\(A\) phải ứng với đỉnh góc vuông \(D\).`,
      r`\(B\) ứng với \(E\), không phải \(F\).`,
      'Chỉ đồng dạng, chưa chắc bằng nhau.',
    ]),
    mc(2, CMV, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 3\), \(AC = 4\); tam giác \(MNP\) vuông tại \(M\) có \(MN = 6\), \(MP = 8\). Khẳng định nào sau đây đúng?`, [r`\(\triangle ABC \backsim \triangle MNP\)`, r`\(\triangle ABC \backsim \triangle NMP\)`, r`\(\triangle ABC \backsim \triangle MPN\)`, 'Hai tam giác không đồng dạng'], r`\(\dfrac{MN}{AB} = \dfrac{MP}{AC} = 2\): hai cạnh góc vuông tỉ lệ nên \(\triangle ABC \backsim \triangle MNP\).`, [
      undefined,
      'Đỉnh góc vuông phải ứng với nhau.',
      r`\(AB\) ứng với \(MN\), nên \(B\) ứng với \(N\).`,
      'Hai cạnh góc vuông tỉ lệ nên đồng dạng.',
    ]),
    mc(2, CMV, 'Tam giác vuông có hai cạnh góc vuông 2 cm và 5 cm đồng dạng với tam giác vuông có hai cạnh góc vuông là', ['4 cm và 10 cm', '4 cm và 7 cm', '3 cm và 6 cm', '2 cm và 10 cm'], r`\(\dfrac42 = \dfrac{10}{5} = 2\): hai cạnh góc vuông tỉ lệ.`, [
      undefined,
      'Cộng thêm 2 cm, không phải nhân.',
      'Cộng thêm 1 cm, không phải nhân.',
      'Chỉ một cạnh thay đổi.',
    ]),
    mc(3, CMV, r`Tam giác \(ABC\) vuông tại \(A\) có đường cao \(AH\). Khẳng định nào sau đây đúng?`, [r`\(\triangle HBA \backsim \triangle ABC\)`, r`\(\triangle HAB \backsim \triangle ABC\)`, r`\(\triangle HBA \backsim \triangle ACB\)`, r`\(\triangle HCA \backsim \triangle ABC\)`], r`\(\widehat{BHA} = \widehat{BAC} = 90^\circ\), góc \(B\) chung nên \(\triangle HBA \backsim \triangle ABC\).`, [
      undefined,
      r`\(\widehat{HAB} = \widehat{C}\), không bằng \(\widehat{B}\).`,
      r`\(B\) phải ứng với \(B\).`,
      r`\(\widehat{HCA} = \widehat{C}\), không bằng \(\widehat{B}\).`,
    ]),
    mc(3, CMV, r`Tam giác \(ABC\) vuông tại \(A\) và tam giác \(A'B'C'\) vuông tại \(A'\) có \(\dfrac{B'C'}{BC} = \dfrac{A'B'}{AB} = \dfrac12\). Khi đó`, [r`\(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(\dfrac12\)`, r`\(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(2\)`, r`\(\triangle A'B'C' \backsim \triangle ACB\)`, r`\(\triangle A'B'C' = \triangle ABC\)`], 'Cạnh huyền và một cạnh góc vuông tỉ lệ thì hai tam giác vuông đồng dạng, tỉ số bằng tỉ số đó.', [
      undefined,
      'Đảo ngược tỉ số.',
      r`\(B'\) ứng với \(B\).`,
      'Các cạnh khác nhau.',
    ]),
    mc(3, GTV, r`Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\), \(BH = 4\) cm, \(BC = 9\) cm. Độ dài \(AB\) là`, [r`\(6\) cm`, r`\(36\) cm`, r`\(5\) cm`, r`\(13\) cm`], r`\(\triangle HBA \backsim \triangle ABC\) nên \(AB^2 = BH\cdot BC = 36\), \(AB = 6\) cm.`, [
      undefined,
      'Quên khai căn.',
      r`Đó là \(CH\).`,
      r`Cộng \(BH\) và \(BC\).`,
    ]),
    mc(3, GTV, r`Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\), \(HB = 4\) cm, \(HC = 9\) cm. Độ dài \(AH\) là`, [r`\(6\) cm`, r`\(36\) cm`, r`\(6{,}5\) cm`, r`\(13\) cm`], r`\(\triangle HBA \backsim \triangle HAC\) nên \(AH^2 = HB\cdot HC = 36\), \(AH = 6\) cm.`, [
      undefined,
      'Quên khai căn.',
      'Lấy trung bình cộng.',
      r`Đó là \(BC\).`,
    ]),
    mc(3, GTV, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\) cm, \(AC = 8\) cm, đường cao \(AH\). Độ dài \(AH\) là`, [r`\(4{,}8\) cm`, r`\(5\) cm`, r`\(7\) cm`, r`\(10\) cm`], r`\(BC = 10\) cm; \(AH\cdot BC = AB\cdot AC\) nên \(AH = \dfrac{48}{10} = 4{,}8\) cm.`, [
      undefined,
      'Đó là nửa cạnh huyền (trung tuyến).',
      'Lấy trung bình cộng hai cạnh.',
      r`Đó là \(BC\).`,
    ]),
    mc(2, GTV, r`Tam giác \(ABC\) vuông tại \(A\) và tam giác \(DEF\) vuông tại \(D\) có \(\triangle ABC \backsim \triangle DEF\), \(AB = 3\) cm, \(BC = 5\) cm, \(DE = 6\) cm. Độ dài \(EF\) là`, [r`\(10\) cm`, r`\(2{,}5\) cm`, r`\(8\) cm`, r`\(4\) cm`], r`Tỉ số \(\dfrac{DE}{AB} = 2\) nên \(EF = 2BC = 10\) cm.`, [
      undefined,
      'Chia thay vì nhân.',
      r`Đó là \(DF\).`,
      r`Đó là \(AC\).`,
    ]),
    mc(3, TSD, r`\(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số 3; \(A'H'\), \(AH\) là hai đường cao tương ứng. Tỉ số \(\dfrac{A'H'}{AH}\) bằng`, [r`\(3\)`, r`\(9\)`, r`\(\dfrac13\)`, r`\(6\)`], 'Tỉ số hai đường cao tương ứng bằng tỉ số đồng dạng.', [
      undefined,
      'Đó là tỉ số diện tích.',
      'Đảo ngược.',
      'Không nhân đôi.',
    ]),
    mc(3, TSD, r`\(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(\dfrac23\). Tỉ số diện tích của tam giác \(A'B'C'\) và tam giác \(ABC\) là`, [r`\(\dfrac49\)`, r`\(\dfrac23\)`, r`\(\dfrac94\)`, r`\(\dfrac43\)`], 'Tỉ số diện tích bằng bình phương tỉ số đồng dạng.', [
      undefined,
      'Chưa bình phương.',
      'Đảo ngược.',
      'Nhân đôi thay vì bình phương.',
    ]),
    mc(4, TSD, r`\(\triangle A'B'C' \backsim \triangle ABC\); diện tích tam giác \(A'B'C'\) là 50 cm², diện tích tam giác \(ABC\) là 32 cm². Tỉ số đồng dạng là`, [r`\(\dfrac54\)`, r`\(\dfrac{25}{16}\)`, r`\(\dfrac45\)`, r`\(\dfrac{16}{25}\)`], r`\(k^2 = \dfrac{50}{32} = \dfrac{25}{16}\) nên \(k = \dfrac54\).`, [
      undefined,
      'Đó là tỉ số diện tích, chưa khai căn.',
      'Đảo ngược.',
      'Đảo ngược và chưa khai căn.',
    ]),
    mc(3, TTV, 'Cùng một thời điểm, bóng của một tòa nhà trên mặt đất dài 24 m và bóng của một cột điện cao 3 m dài 4 m. Chiều cao tòa nhà là', [r`\(18\) m`, r`\(32\) m`, r`\(21\) m`, r`\(12\) m`], r`Hai tam giác vuông đồng dạng: \(\dfrac{h}{24} = \dfrac34\), \(h = 18\) m.`, [
      undefined,
      'Đảo ngược tỉ số.',
      'Lấy hiệu, không phải tỉ lệ.',
      'Tính sai.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, CMV, r`Tam giác \(ABC\) vuông tại \(A\) có \(\widehat{B} = 40^\circ\); tam giác \(DEF\) vuông tại \(D\) có \(\widehat{F} = 50^\circ\).`, [
      [r`\(\widehat{C} = 50^\circ\).`, true, 'Hai góc nhọn phụ nhau.'],
      [r`\(\widehat{E} = 40^\circ\).`, true, 'Hai góc nhọn phụ nhau.'],
      [r`\(\triangle ABC \backsim \triangle DEF\).`, true, r`Góc vuông và \(\widehat{B} = \widehat{E}\).`],
      [r`\(\triangle ABC \backsim \triangle DFE\).`, false, r`\(B\) ứng với \(E\), không phải \(F\).`],
    ]),
    tf(2, CMV, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\), \(AC = 9\); tam giác \(MNP\) vuông tại \(M\) có \(MN = 4\), \(MP = 6\).`, [
      [r`\(\dfrac{AB}{MN} = \dfrac32\).`, true, 'Tính trực tiếp.'],
      [r`\(\dfrac{AC}{MP} = \dfrac32\).`, true, 'Tính trực tiếp.'],
      [r`\(\triangle ABC \backsim \triangle MNP\).`, true, 'Hai cạnh góc vuông tỉ lệ.'],
      [r`\(\dfrac{BC}{NP} = \dfrac23\).`, false, r`Bằng tỉ số đồng dạng \(\dfrac32\).`],
    ]),
    tf(2, CMV, r`Tam giác \(ABC\) vuông tại \(A\) có \(BC = 10\), \(AB = 6\); tam giác \(DEF\) vuông tại \(D\) có \(EF = 5\), \(DE = 3\).`, [
      [r`\(\dfrac{BC}{EF} = 2\).`, true, 'Tính trực tiếp.'],
      [r`\(\dfrac{AB}{DE} = 2\).`, true, 'Tính trực tiếp.'],
      [r`\(\triangle ABC \backsim \triangle DEF\).`, true, 'Cạnh huyền và cạnh góc vuông tỉ lệ.'],
      [r`\(DF = 8\).`, false, r`\(DF = \sqrt{25 - 9} = 4\).`],
    ]),
    tf(3, CMV, r`Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\).`, [
      [r`\(\triangle HBA \backsim \triangle ABC\).`, true, r`Góc vuông, góc \(B\) chung.`],
      [r`\(\triangle HAC \backsim \triangle ABC\).`, true, r`Góc vuông, góc \(C\) chung.`],
      [r`\(\triangle HBA \backsim \triangle HAC\).`, true, r`Cùng đồng dạng với \(\triangle ABC\).`],
      [r`\(\triangle HBA \backsim \triangle HCA\).`, false, r`Sai thứ tự đỉnh: \(B\) ứng với \(A\).`],
    ]),
    tf(2, GTV, r`Tam giác \(ABC\) vuông tại \(A\) và tam giác \(DEF\) vuông tại \(D\) có \(\triangle ABC \backsim \triangle DEF\), \(AB = 5\), \(AC = 12\), \(DE = 10\).`, [
      [r`\(BC = 13\).`, true, r`\(\sqrt{25 + 144}\).`],
      [r`Tỉ số đồng dạng của \(\triangle DEF\) so với \(\triangle ABC\) là 2.`, true, r`\(\dfrac{10}{5}\).`],
      [r`\(DF = 24\).`, true, r`\(2\cdot12\).`],
      [r`\(EF = 13\).`, false, r`\(EF = 2\cdot13 = 26\).`],
    ]),
    tf(3, GTV, r`Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\), \(BH = 9\) cm, \(CH = 16\) cm.`, [
      [r`\(BC = 25\) cm.`, true, r`\(9 + 16\).`],
      [r`\(AH = 12\) cm.`, true, r`\(AH^2 = 9\cdot16\).`],
      [r`\(AB = 15\) cm.`, true, r`\(AB^2 = 9\cdot25\).`],
      [r`\(AC = 15\) cm.`, false, r`\(AC^2 = 16\cdot25\), \(AC = 20\) cm.`],
    ]),
    tf(4, GTV, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 15\) cm, \(AC = 20\) cm, đường cao \(AH\).`, [
      [r`\(BC = 25\) cm.`, true, r`\(\sqrt{225 + 400}\).`],
      [r`\(AH = 12\) cm.`, true, r`\(\dfrac{15\cdot20}{25}\).`],
      [r`\(BH = 9\) cm.`, true, r`\(\dfrac{AB^2}{BC} = \dfrac{225}{25}\).`],
      [r`\(CH = 9\) cm.`, false, r`\(CH = 25 - 9 = 16\) cm.`],
    ]),
    tf(3, TSD, r`\(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(\dfrac32\); \(A'H'\), \(AH\) là hai đường cao tương ứng.`, [
      [r`\(\dfrac{A'H'}{AH} = \dfrac32\).`, true, 'Bằng tỉ số đồng dạng.'],
      [r`Tỉ số diện tích bằng \(\dfrac94\).`, true, 'Bình phương tỉ số đồng dạng.'],
      [r`Nếu diện tích \(\triangle ABC\) là 20 cm² thì diện tích \(\triangle A'B'C'\) là 45 cm².`, true, r`\(\dfrac94\cdot20\).`],
      [r`Tỉ số diện tích bằng \(\dfrac32\).`, false, 'Phải bình phương.'],
    ]),
    tf(4, TSD, r`Tam giác \(ABC\) có diện tích 36 cm²; \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 2\) cm, \(MB = 4\) cm.`, [
      [r`\(\triangle AMN \backsim \triangle ABC\) theo tỉ số \(\dfrac13\).`, true, r`\(\dfrac{AM}{AB} = \dfrac26\).`],
      [r`Diện tích \(\triangle AMN\) là 4 cm².`, true, r`\(\dfrac19\cdot36\).`],
      [r`Diện tích tứ giác \(BMNC\) là 32 cm².`, true, r`\(36 - 4\).`],
      [r`Diện tích \(\triangle AMN\) là 12 cm².`, false, 'Phải dùng bình phương tỉ số.'],
    ]),
    tf(3, TTV, 'Một người cao 1,6 m đứng cách chân cột đèn 6 m. Dưới ánh đèn, bóng của người đó trên mặt đất dài 2 m, kéo dài ra xa cột đèn.', [
      ['Hai tam giác vuông tạo bởi người, cột đèn với tia sáng đồng dạng.', true, 'Có chung góc nhọn ở đầu bóng.'],
      ['Đầu bóng cách chân cột đèn 8 m.', true, r`\(6 + 2\).`],
      ['Cột đèn cao 6,4 m.', true, r`\(\dfrac{1{,}6\cdot8}{2}\).`],
      ['Cột đèn cao 4,8 m.', false, 'Dùng nhầm 6 m thay cho 8 m.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(3, GTV, r`Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\), \(BH = 2\) cm, \(CH = 8\) cm. Tính \(AH\).`, '4', r`\(\triangle HBA \backsim \triangle HAC\) nên \(AH^2 = HB\cdot HC = 16\), \(AH = 4\) cm.`, CM),
    sa(3, GTV, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 9\) cm, \(AC = 12\) cm, đường cao \(AH\). Tính \(AH\).`, '7,2', r`\(BC = 15\) cm; \(AH = \dfrac{AB\cdot AC}{BC} = \dfrac{108}{15} = 7{,}2\) cm.`, CM),
    sa(4, TSD, r`\(\triangle A'B'C' \backsim \triangle ABC\); diện tích hai tam giác lần lượt là 75 cm² và 27 cm². Biết \(AB = 6\) cm, tính \(A'B'\).`, '10', r`\(k^2 = \dfrac{75}{27} = \dfrac{25}{9}\) nên \(k = \dfrac53\); \(A'B' = \dfrac53\cdot6 = 10\) cm.`, CM),
    sa(3, TTV, 'Để đo chiều cao một cây, bạn An đặt một chiếc gương nằm ngang trên mặt đất cách gốc cây 8 m rồi lùi lại đến khi nhìn thấy ngọn cây trong gương. Lúc đó An đứng cách gương 1,2 m và mắt An cách mặt đất 1,5 m. Tính chiều cao của cây.', '10', r`Góc tới bằng góc phản xạ nên hai tam giác vuông đồng dạng: \(\dfrac{h}{8} = \dfrac{1{,}5}{1{,}2}\), \(h = 10\) m.`, M),
    // ---- Tự luận ----
    es(3, CMV, r`Cho tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\). Chứng minh \(\triangle HBA \backsim \triangle HAC\), từ đó suy ra \(AH^2 = HB\cdot HC\).`, r`\(\widehat{HBA} + \widehat{HAB} = 90^\circ\) và \(\widehat{HAC} + \widehat{HAB} = 90^\circ\) nên \(\widehat{HBA} = \widehat{HAC}\).
Hai tam giác vuông \(HBA\) và \(HAC\) có \(\widehat{HBA} = \widehat{HAC}\) nên \(\triangle HBA \backsim \triangle HAC\).
Suy ra \(\dfrac{HB}{HA} = \dfrac{HA}{HC}\), tức \(AH^2 = HB\cdot HC\).`, r`0,5 điểm: chứng minh hai góc nhọn bằng nhau và kết luận đồng dạng.
0,5 điểm: suy ra đúng hệ thức.`),
    es(4, GTV, r`Cho tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\) cm, \(AC = 8\) cm, đường cao \(AH\). Tính \(BC\), \(AH\), \(BH\), \(CH\).`, r`\(BC = \sqrt{36 + 64} = 10\) cm.
\(\triangle HBA \backsim \triangle ABC\) nên \(\dfrac{AH}{AC} = \dfrac{AB}{BC}\), \(AH = \dfrac{6\cdot8}{10} = 4{,}8\) cm; \(\dfrac{BH}{AB} = \dfrac{AB}{BC}\), \(BH = \dfrac{36}{10} = 3{,}6\) cm.
\(CH = 10 - 3{,}6 = 6{,}4\) cm.`, r`0,25 điểm: tính \(BC\).
0,5 điểm: lập tỉ số đồng dạng, tính \(AH\), \(BH\).
0,25 điểm: tính \(CH\).`),
    es(4, TSD, r`Cho tam giác \(ABC\) có diện tích 45 cm². Một đường thẳng song song với \(BC\) cắt \(AB\), \(AC\) lần lượt tại \(M\), \(N\) sao cho \(AM = 2MB\). Tính diện tích tam giác \(AMN\) và diện tích tứ giác \(BMNC\).`, r`\(MN \parallel BC\) nên \(\triangle AMN \backsim \triangle ABC\) với tỉ số \(\dfrac{AM}{AB} = \dfrac23\).
Tỉ số diện tích bằng \(\left(\dfrac23\right)^2 = \dfrac49\), nên \(S_{AMN} = \dfrac49\cdot45 = 20\) cm².
\(S_{BMNC} = 45 - 20 = 25\) cm².`, r`0,25 điểm: chỉ ra tỉ số đồng dạng \(\dfrac23\).
0,5 điểm: dùng tỉ số diện tích, tính \(S_{AMN}\).
0,25 điểm: tính diện tích tứ giác.`),
    ge(3, GTV, r`Cho tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\) có \(BH = 1{,}8\) cm, \(CH = 3{,}2\) cm. Chứng minh \(\triangle HBA \backsim \triangle ABC\) rồi tính \(AB\), \(AC\), \(AH\).`, `A(1.8,2.4) B(0,0) C(5,0) H(1.8,0)
ABCA AH
vuong(B,A,C)
vuong(A,H,C)`, r`\(\triangle HBA\) và \(\triangle ABC\) có \(\widehat{BHA} = \widehat{BAC} = 90^\circ\), góc \(B\) chung nên \(\triangle HBA \backsim \triangle ABC\) (g.g).
Suy ra \(\dfrac{BA}{BC} = \dfrac{BH}{BA}\), \(AB^2 = BH\cdot BC = 1{,}8\cdot5 = 9\), \(AB = 3\) cm.
Tương tự \(\triangle HAC \backsim \triangle ABC\): \(AC^2 = CH\cdot BC = 3{,}2\cdot5 = 16\), \(AC = 4\) cm.
\(AH = \dfrac{AB\cdot AC}{BC} = \dfrac{12}{5} = 2{,}4\) cm.`, r`0,25 điểm: chứng minh đồng dạng.
0,5 điểm: tính \(AB\), \(AC\).
0,25 điểm: tính \(AH\).`),
  ],
};

const PC = 'hinh-dong-dang-phoi-canh';
const NB7 = 'nhan-biet-hinh-dong-dang';
const KT = 'kich-thuoc-hinh-dong-dang';

const B37: BankLesson = {
  slug: 'bai-37-hinh-dong-dang',
  questions: [
    mc(1, PC, r`Hình \(\mathcal H'\) là hình đồng dạng phối cảnh của hình \(\mathcal H\) với tâm \(O\), tỉ số 2. Điểm \(M\) thuộc \(\mathcal H\) có \(OM = 3\) cm. Điểm \(M'\) tương ứng thỏa mãn`, [r`\(M'\) nằm trên tia \(OM\) và \(OM' = 6\) cm`, r`\(M'\) nằm trên tia \(OM\) và \(OM' = 1{,}5\) cm`, r`\(M'\) nằm trên tia đối của tia \(OM\) và \(OM' = 6\) cm`, r`\(M'\) nằm trên tia \(OM\) và \(OM' = 5\) cm`], r`Theo định nghĩa, \(M'\) thuộc tia \(OM\) và \(OM' = 2OM = 6\) cm.`, [
      undefined,
      'Chia thay vì nhân.',
      'Tỉ số dương nên cùng tia.',
      'Cộng thay vì nhân.',
    ]),
    mc(1, PC, r`Trong hình đồng dạng phối cảnh tâm \(O\), mỗi điểm \(M\) và điểm tương ứng \(M'\) cùng với \(O\) luôn`, ['thẳng hàng', 'tạo thành tam giác vuông', 'tạo thành tam giác đều', 'cách đều nhau'], r`\(M'\) nằm trên tia \(OM\) nên \(O\), \(M\), \(M'\) thẳng hàng.`, [
      undefined,
      'Ba điểm thẳng hàng, không tạo tam giác.',
      'Ba điểm thẳng hàng, không tạo tam giác.',
      'Khoảng cách tỉ lệ theo tỉ số, không bằng nhau.',
    ]),
    mc(2, PC, r`Tam giác \(A'B'C'\) là hình đồng dạng phối cảnh của tam giác \(ABC\) với tâm \(O\), tỉ số \(\dfrac12\). Biết \(BC = 8\) cm. Độ dài \(B'C'\) là`, [r`\(4\) cm`, r`\(16\) cm`, r`\(8\) cm`, r`\(2\) cm`], r`Các đoạn tương ứng tỉ lệ theo tỉ số \(\dfrac12\): \(B'C' = 4\) cm.`, [
      undefined,
      'Nhân với 2 thay vì \\(\\dfrac12\\).',
      'Hai hình không bằng nhau.',
      'Chia hai lần.',
    ]),
    mc(2, PC, r`Hình \(\mathcal H'\) là hình đồng dạng phối cảnh của hình \(\mathcal H\) với tâm \(O\); điểm \(A\) thuộc \(\mathcal H\) có \(OA = 4\) cm, điểm tương ứng \(A'\) có \(OA' = 10\) cm. Tỉ số đồng dạng là`, [r`\(\dfrac52\)`, r`\(\dfrac25\)`, r`\(6\)`, r`\(14\)`], r`\(k = \dfrac{OA'}{OA} = \dfrac{10}{4} = \dfrac52\).`, [
      undefined,
      'Đảo ngược tỉ số.',
      'Đó là hiệu.',
      'Đó là tổng.',
    ]),
    mc(2, PC, r`Hình \(\mathcal H'\) là hình đồng dạng phối cảnh của hình \(\mathcal H\) với tâm \(O\), tỉ số 1. Khi đó`, [r`\(\mathcal H'\) trùng với \(\mathcal H\)`, r`\(\mathcal H'\) đối xứng với \(\mathcal H\) qua \(O\)`, r`\(\mathcal H'\) có kích thước gấp đôi \(\mathcal H\)`, r`\(\mathcal H'\) chỉ gồm điểm \(O\)`], r`\(OM' = OM\) và \(M'\) trên tia \(OM\) nên \(M' \equiv M\) với mọi \(M\).`, [
      undefined,
      'Đối xứng tâm cần tia đối.',
      'Tỉ số 1 giữ nguyên kích thước.',
      'Chỉ khi tỉ số bằng 0.',
    ]),
    mc(1, NB7, 'Hai hình nào sau đây luôn đồng dạng?', ['Hai hình tròn', 'Hai hình chữ nhật', 'Hai tam giác cân', 'Hai hình thoi'], 'Mọi hình tròn đều đồng dạng với nhau (tỉ số bằng tỉ số hai bán kính).', [
      undefined,
      'Tỉ số chiều dài và chiều rộng có thể khác nhau.',
      'Góc ở đỉnh có thể khác nhau.',
      'Các góc có thể khác nhau.',
    ]),
    mc(1, NB7, 'Cặp hình nào sau đây không phải lúc nào cũng đồng dạng?', ['Hai hình chữ nhật', 'Hai hình vuông', 'Hai tam giác đều', 'Hai hình tròn'], 'Hai hình chữ nhật có tỉ số các cạnh khác nhau thì không đồng dạng (ví dụ 1 × 2 và 1 × 3).', [
      undefined,
      'Hai hình vuông luôn đồng dạng.',
      'Hai tam giác đều luôn đồng dạng.',
      'Hai hình tròn luôn đồng dạng.',
    ]),
    mc(2, NB7, 'Hình chữ nhật kích thước 4 cm × 6 cm đồng dạng với hình chữ nhật nào sau đây?', ['6 cm × 9 cm', '5 cm × 7 cm', '4 cm × 8 cm', '8 cm × 10 cm'], r`\(\dfrac64 = \dfrac96 = \dfrac32\): các kích thước tỉ lệ.`, [
      undefined,
      'Cộng thêm 1 cm, không tỉ lệ.',
      'Chỉ một cạnh thay đổi.',
      r`\(\dfrac84 \ne \dfrac{10}{6}\).`,
    ]),
    mc(2, NB7, 'Hình nào sau đây đồng dạng với hình vuông cạnh 3 cm?', ['Hình vuông cạnh 5 cm', 'Hình chữ nhật 3 cm × 5 cm', r`Hình thoi cạnh 3 cm có một góc \(60^\circ\)`, 'Tam giác đều cạnh 3 cm'], 'Hai hình vuông luôn đồng dạng.', [
      undefined,
      'Các cạnh không tỉ lệ với hình vuông.',
      'Các góc khác góc vuông.',
      'Khác loại hình.',
    ]),
    mc(2, KT, 'Hai hình vuông có cạnh 4 cm và 6 cm. Tỉ số đồng dạng của hình vuông nhỏ so với hình vuông lớn là', [r`\(\dfrac23\)`, r`\(\dfrac32\)`, r`\(\dfrac49\)`, r`\(2\)`], r`\(k = \dfrac46 = \dfrac23\).`, [
      undefined,
      'Đảo ngược.',
      'Đó là tỉ số diện tích.',
      'Đó là hiệu hai cạnh.',
    ]),
    mc(2, KT, 'Một bức ảnh kích thước 10 cm × 15 cm được phóng to thành ảnh đồng dạng có chiều rộng 20 cm. Chiều dài của ảnh mới là', [r`\(30\) cm`, r`\(25\) cm`, r`\(20\) cm`, r`\(45\) cm`], 'Tỉ số phóng to là 2 nên chiều dài mới là 30 cm.', [
      undefined,
      'Cộng thêm 10 cm, không tỉ lệ.',
      'Hình mới không phải hình vuông.',
      'Nhân với 3.',
    ]),
    mc(3, KT, 'Hai hình chữ nhật đồng dạng với tỉ số 3 (hình lớn so với hình nhỏ); hình nhỏ có diện tích 8 cm². Diện tích hình lớn là', [r`\(72\) cm²`, r`\(24\) cm²`, r`\(11\) cm²`, r`\(64\) cm²`], r`Các kích thước gấp 3 lần nên diện tích gấp \(3^2 = 9\) lần: \(72\) cm².`, [
      undefined,
      'Diện tích gấp \\(k^2\\), không phải \\(k\\) lần.',
      'Cộng 3.',
      r`Đó là \(8^2\).`,
    ]),
    mc(3, KT, 'Trên bản đồ tỉ lệ 1 : 50 000, khoảng cách giữa hai địa điểm là 4 cm. Khoảng cách thực tế là', [r`\(2\) km`, r`\(20\) km`, r`\(200\) m`, r`\(2\) m`], r`\(4\cdot50\,000 = 200\,000\) cm \(= 2\) km.`, [
      undefined,
      'Đổi đơn vị sai.',
      'Đổi đơn vị sai.',
      'Đổi đơn vị sai.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, PC, r`Hình \(\mathcal H'\) là hình đồng dạng phối cảnh của hình \(\mathcal H\) với tâm \(O\), tỉ số 3; \(A\) thuộc \(\mathcal H\) và \(A'\) là điểm tương ứng.`, [
      [r`\(O\), \(A\), \(A'\) thẳng hàng.`, true, r`\(A'\) nằm trên tia \(OA\).`],
      [r`\(OA' = 3OA\).`, true, 'Theo định nghĩa.'],
      [r`\(A'\) nằm trên tia \(OA\).`, true, 'Tỉ số dương.'],
      [r`\(OA = 3OA'\).`, false, 'Viết ngược.'],
    ]),
    tf(2, PC, r`Tam giác \(A'B'C'\) là hình đồng dạng phối cảnh của tam giác \(ABC\) với tâm \(O\) (không thuộc các đường thẳng \(AB\), \(BC\), \(CA\)), tỉ số 2.`, [
      [r`\(A'B' = 2AB\).`, true, 'Các đoạn tương ứng tỉ lệ.'],
      [r`\(A'B' \parallel AB\).`, true, r`Định lí Thalès đảo trong \(\triangle OA'B'\).`],
      [r`\(\triangle A'B'C' \backsim \triangle ABC\).`, true, 'Các cạnh tương ứng tỉ lệ.'],
      [r`Chu vi \(\triangle A'B'C'\) bằng chu vi \(\triangle ABC\).`, false, 'Chu vi gấp 2 lần.'],
    ]),
    tf(1, NB7, 'Xét tính đúng sai của các khẳng định về hai hình cùng loại bất kì:', [
      ['Hai hình tròn bất kì đồng dạng.', true, 'Tỉ số bằng tỉ số bán kính.'],
      ['Hai hình vuông bất kì đồng dạng.', true, 'Các cạnh tỉ lệ, các góc vuông.'],
      ['Hai tam giác đều bất kì đồng dạng.', true, r`Các góc đều \(60^\circ\).`],
      ['Hai hình chữ nhật bất kì đồng dạng.', false, 'Tỉ số hai kích thước có thể khác nhau.'],
    ]),
    tf(2, NB7, r`Hình chữ nhật \(ABCD\) có kích thước 2 cm × 3 cm, hình chữ nhật \(MNPQ\) có kích thước 4 cm × 6 cm, hình chữ nhật \(EFGH\) có kích thước 3 cm × 4 cm.`, [
      [r`\(ABCD\) đồng dạng với \(MNPQ\).`, true, r`\(\dfrac42 = \dfrac63\).`],
      [r`\(ABCD\) đồng dạng với \(EFGH\).`, false, r`\(\dfrac32 \ne \dfrac43\).`],
      [r`Tỉ số đồng dạng của \(MNPQ\) so với \(ABCD\) là 2.`, true, r`\(\dfrac42\).`],
      [r`\(MNPQ\) đồng dạng với \(EFGH\).`, false, r`\(\dfrac43 \ne \dfrac64\).`],
    ]),
    tf(2, NB7, 'Xét tính đúng sai của các khẳng định về hình thoi, lục giác đều và tam giác vuông cân:', [
      ['Hai hình thoi có một góc bằng nhau thì đồng dạng.', true, 'Các góc bằng nhau, các cạnh tỉ lệ.'],
      ['Hai hình thoi bất kì thì đồng dạng.', false, 'Các góc có thể khác nhau.'],
      ['Hai lục giác đều bất kì thì đồng dạng.', true, r`Các góc đều \(120^\circ\), các cạnh tỉ lệ.`],
      ['Hai tam giác vuông cân bất kì thì đồng dạng.', true, r`Các góc \(90^\circ\), \(45^\circ\), \(45^\circ\).`],
    ]),
    tf(2, KT, 'Hai hình vuông có cạnh lần lượt 3 cm và 5 cm.', [
      [r`Tỉ số đồng dạng của hình lớn so với hình nhỏ là \(\dfrac53\).`, true, 'Tỉ số hai cạnh.'],
      [r`Tỉ số chu vi bằng \(\dfrac53\).`, true, 'Bằng tỉ số đồng dạng.'],
      [r`Tỉ số diện tích bằng \(\dfrac53\).`, false, r`Bằng \(\dfrac{25}{9}\).`],
      ['Diện tích hình lớn là 25 cm².', true, r`\(5^2\).`],
    ]),
    tf(3, KT, 'Một mô hình ô tô tỉ lệ 1 : 18 đồng dạng với chiếc xe thật; mô hình dài 25 cm.', [
      ['Xe thật dài 4,5 m.', true, r`\(25\cdot18 = 450\) cm.`],
      ['Nếu xe thật cao 1,44 m thì mô hình cao 8 cm.', true, r`\(144 : 18\).`],
      ['Tỉ số đồng dạng của xe thật so với mô hình là 18.', true, 'Theo tỉ lệ mô hình.'],
      ['Xe thật dài 450 m.', false, 'Đổi đơn vị sai: 450 cm.'],
    ]),
    tf(3, KT, 'Một bức ảnh hình chữ nhật 6 cm × 9 cm được phóng to thành ảnh đồng dạng có chiều dài 27 cm.', [
      ['Tỉ số phóng to là 3.', true, r`\(\dfrac{27}{9}\).`],
      ['Chiều rộng ảnh mới là 18 cm.', true, r`\(3\cdot6\).`],
      ['Diện tích ảnh mới gấp 3 lần diện tích ảnh cũ.', false, r`Gấp \(3^2 = 9\) lần.`],
      ['Chu vi ảnh mới là 90 cm.', true, r`\(2(18 + 27)\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, PC, r`Hình \(\mathcal H'\) là hình đồng dạng phối cảnh của hình \(\mathcal H\) với tâm \(O\), tỉ số 2,5. Điểm \(M\) thuộc \(\mathcal H\) có \(OM = 4\) cm. Tính \(OM'\) với \(M'\) là điểm tương ứng.`, '10', r`\(OM' = 2{,}5\cdot4 = 10\) cm.`, CM),
    sa(2, PC, r`Tam giác \(A'B'C'\) là hình đồng dạng phối cảnh của tam giác \(ABC\) với tâm \(O\); \(OA = 3\) cm, \(OA' = 7{,}5\) cm. Tìm tỉ số đồng dạng.`, ['2,5', '5/2'], r`\(k = \dfrac{OA'}{OA} = \dfrac{7{,}5}{3} = 2{,}5\).`),
    sa(2, PC, r`Tam giác \(A'B'C'\) là hình đồng dạng phối cảnh của tam giác \(ABC\) với tâm \(O\), tỉ số \(\dfrac13\); \(AB = 12\) cm. Tính \(A'B'\).`, '4', r`\(A'B' = \dfrac13\cdot12 = 4\) cm.`, CM),
    sa(2, NB7, 'Trong các loại hình: hình tròn, hình vuông, hình chữ nhật, tam giác đều, hình thoi, lục giác đều, có bao nhiêu loại mà hai hình bất kì cùng loại luôn đồng dạng?', '4', 'Hình tròn, hình vuông, tam giác đều, lục giác đều: 4 loại. Hình chữ nhật và hình thoi không luôn đồng dạng.'),
    sa(2, KT, 'Hình chữ nhật kích thước 5 cm × 8 cm đồng dạng với một hình chữ nhật có chiều rộng 15 cm. Tính chiều dài hình chữ nhật đó.', '24', 'Tỉ số đồng dạng là 3 nên chiều dài là \\(3\\cdot8 = 24\\) cm.', CM),
    sa(3, KT, r`Hai hình vuông đồng dạng với tỉ số \(\dfrac32\) (hình lớn so với hình nhỏ); hình nhỏ có diện tích 16 cm². Tính diện tích hình lớn.`, '36', r`Diện tích gấp \(\left(\dfrac32\right)^2 = \dfrac94\) lần: \(\dfrac94\cdot16 = 36\) cm².`, CM2),
    sa(3, KT, 'Hai thành phố cách nhau 15 km. Trên bản đồ tỉ lệ 1 : 200 000, khoảng cách giữa hai thành phố là bao nhiêu xăng-ti-mét?', '7,5', r`15 km \(= 1\,500\,000\) cm; \(1\,500\,000 : 200\,000 = 7{,}5\) cm.`, CM),
    sa(3, KT, 'Mô hình một ngọn tháp được làm theo tỉ lệ 1 : 300 và cao 18 cm. Ngọn tháp thật cao bao nhiêu mét?', '54', r`\(18\cdot300 = 5400\) cm \(= 54\) m.`, M),
    // ---- Tự luận ----
    es(2, PC, r`Cho tam giác \(ABC\) và điểm \(O\) nằm ngoài tam giác. Nêu cách vẽ tam giác \(A'B'C'\) là hình đồng dạng phối cảnh của tam giác \(ABC\) với tâm \(O\), tỉ số 2 và cho biết quan hệ giữa các cạnh của hai tam giác.`, r`Trên các tia \(OA\), \(OB\), \(OC\) lấy \(A'\), \(B'\), \(C'\) sao cho \(OA' = 2OA\), \(OB' = 2OB\), \(OC' = 2OC\).
Trong \(\triangle OA'B'\) có \(\dfrac{OA}{OA'} = \dfrac{OB}{OB'} = \dfrac12\) nên \(AB \parallel A'B'\) và \(A'B' = 2AB\); tương tự \(B'C' = 2BC\), \(C'A' = 2CA\).
Vậy \(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số 2.`, r`0,5 điểm: nêu đúng cách vẽ.
0,5 điểm: chỉ ra các cạnh tương ứng gấp 2 lần.`),
    es(2, NB7, 'Cho ba hình chữ nhật: hình thứ nhất 6 cm × 10 cm, hình thứ hai 9 cm × 15 cm, hình thứ ba 8 cm × 12 cm. Những cặp hình nào đồng dạng với nhau? Giải thích.', r`Tỉ số chiều rộng : chiều dài lần lượt là \(\dfrac{6}{10} = \dfrac35\), \(\dfrac{9}{15} = \dfrac35\), \(\dfrac{8}{12} = \dfrac23\).
Chỉ hình thứ nhất và hình thứ hai đồng dạng (tỉ số đồng dạng \(\dfrac32\)); hình thứ ba không đồng dạng với hai hình còn lại.`, r`0,5 điểm: lập đúng các tỉ số.
0,5 điểm: kết luận đúng cặp đồng dạng.`),
    es(2, NB7, 'Giải thích vì sao hai hình vuông bất kì luôn đồng dạng nhưng hai hình chữ nhật thì không nhất thiết đồng dạng. Cho ví dụ minh họa.', r`Hai hình vuông cạnh \(a\) và \(b\) có các góc đều vuông và mọi cạnh tương ứng có cùng tỉ số \(\dfrac ba\) nên luôn đồng dạng.
Hai hình chữ nhật có các góc vuông nhưng tỉ số hai kích thước có thể khác nhau, ví dụ 1 cm × 2 cm và 1 cm × 3 cm: \(\dfrac11 \ne \dfrac32\) nên không đồng dạng.`, r`0,5 điểm: giải thích đúng cho hình vuông.
0,5 điểm: giải thích và nêu đúng ví dụ cho hình chữ nhật.`),
    es(3, KT, 'Một bức tranh kích thước 40 cm × 60 cm được in thu nhỏ thành bản in đồng dạng có chiều dài 15 cm. Tính tỉ số đồng dạng, chiều rộng của bản in và cho biết diện tích bản in bằng bao nhiêu phần diện tích bức tranh.', r`Tỉ số đồng dạng \(k = \dfrac{15}{60} = \dfrac14\).
Chiều rộng bản in \(\dfrac14\cdot40 = 10\) cm.
Diện tích bản in \(10\cdot15 = 150\) cm², bức tranh \(2400\) cm²: bằng \(\dfrac{1}{16} = k^2\) diện tích bức tranh.`, r`0,25 điểm: tính đúng tỉ số.
0,25 điểm: tính đúng chiều rộng.
0,5 điểm: so sánh đúng diện tích.`),
    es(3, KT, 'Trên bản vẽ tỉ lệ 1 : 100, một căn phòng hình chữ nhật có kích thước 5 cm × 4 cm. Tính kích thước thật, chu vi và diện tích thật của căn phòng.', r`Kích thước thật: \(5\cdot100 = 500\) cm \(= 5\) m và \(4\cdot100 = 400\) cm \(= 4\) m.
Chu vi \(2(5 + 4) = 18\) m; diện tích \(5\cdot4 = 20\) m².`, r`0,5 điểm: tính đúng kích thước thật.
0,5 điểm: tính đúng chu vi và diện tích.`),
    ge(2, PC, r`Trong hình vẽ, tam giác \(A'B'C'\) là hình đồng dạng phối cảnh của tam giác \(ABC\) với tâm \(O\), tỉ số 2. Biết \(AB = 3\) cm, \(BC = 4\) cm, \(CA = 5\) cm. Tính độ dài các cạnh và chu vi tam giác \(A'B'C'\).`, `O(0,0) A(1.4,2.2) B(2.2,0.6) C(3.2,1.8) A'(2.8,4.4) B'(4.4,1.2) C'(6.4,3.6)
ABCA A'B'C'A'
OA':dash OB':dash OC':dash`, r`Các đoạn tương ứng gấp 2 lần: \(A'B' = 6\) cm, \(B'C' = 8\) cm, \(C'A' = 10\) cm.
Chu vi \(\triangle A'B'C' = 6 + 8 + 10 = 24\) cm (gấp 2 lần chu vi \(\triangle ABC\)).`, r`0,5 điểm: tính đúng ba cạnh.
0,5 điểm: tính đúng chu vi.`),
    ge(2, KT, r`Hình chữ nhật \(ABCD\) có \(AB = 6\) cm, \(BC = 4\) cm; hình chữ nhật \(MNPQ\) đồng dạng với \(ABCD\) và có \(MN = 9\) cm (\(MN\) ứng với \(AB\)). Tính \(NP\), chu vi và diện tích hình chữ nhật \(MNPQ\).`, `A(0,0) B(3,0) C(3,2) D(0,2) M(4.5,0) N(9,0) P(9,3) Q(4.5,3)
ABCDA MNPQM`, r`Tỉ số đồng dạng \(k = \dfrac{MN}{AB} = \dfrac96 = \dfrac32\).
\(NP = \dfrac32\cdot4 = 6\) cm; chu vi \(2(9 + 6) = 30\) cm; diện tích \(9\cdot6 = 54\) cm².`, r`0,25 điểm: tính tỉ số đồng dạng.
0,25 điểm: tính \(NP\).
0,5 điểm: tính chu vi và diện tích.`),
    ge(3, KT, r`Hình vuông \(ABCD\) cạnh 2 cm có tâm \(O\). Hình vuông \(A'B'C'D'\) là hình đồng dạng phối cảnh của \(ABCD\) với tâm \(O\), tỉ số 2. Tính cạnh, diện tích hình vuông \(A'B'C'D'\) và diện tích phần nằm giữa hai hình vuông.`, `O(0,0) A(-1,-1) B(1,-1) C(1,1) D(-1,1) A'(-2,-2) B'(2,-2) C'(2,2) D'(-2,2)
ABCDA A'B'C'D'A'
OA':dash OC':dash`, r`Cạnh \(A'B' = 2AB = 4\) cm; diện tích \(A'B'C'D'\) là \(16\) cm².
Diện tích \(ABCD\) là \(4\) cm², nên phần nằm giữa hai hình vuông có diện tích \(16 - 4 = 12\) cm².`, r`0,25 điểm: tính đúng cạnh.
0,25 điểm: tính đúng diện tích hình lớn.
0,5 điểm: tính đúng diện tích phần giữa.`),
  ],
};

export const BANK_CHUONG_9: BankLesson[] = [B33, B34, B35, B36, B37];
