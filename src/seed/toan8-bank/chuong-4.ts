/** Ngân hàng câu hỏi GĐ4 – Chương IV. Định lí Thalès (Bài 15 – Bài 17). */
import { es, ge, mc, r, sa, tf, type BankLesson } from './types';

const CM = { unit: 'cm' };
const CM2 = { unit: 'cm²' };
const M = { unit: 'm' };

const TL = 'doan-thang-ti-le';
const TD = 'tinh-do-dai-dinh-li-thales';
const CS = 'chung-minh-song-song-he-thuc-thales';
const DT = 'do-dac-thuc-te-dinh-li-thales';

const B15: BankLesson = {
  slug: 'bai-15-dinh-li-thales-trong-tam-giac',
  questions: [
    mc(1, TL, r`Cho \(AB = 4\) cm, \(CD = 6\) cm. Tỉ số \(\dfrac{AB}{CD}\) bằng`, [r`\(\dfrac23\)`, r`\(\dfrac32\)`, r`\(2\)`, r`\(24\)`], r`\(\dfrac{AB}{CD} = \dfrac46 = \dfrac23\).`, [
      undefined,
      r`Đó là \(\dfrac{CD}{AB}\).`,
      'Đó là hiệu hai độ dài.',
      'Đó là tích hai độ dài.',
    ]),
    mc(1, TL, r`Cho \(AB = 30\) cm, \(CD = 2\) m. Tỉ số \(\dfrac{AB}{CD}\) bằng`, [r`\(\dfrac{3}{20}\)`, r`\(15\)`, r`\(\dfrac32\)`, r`\(\dfrac{20}{3}\)`], r`Đổi \(CD = 200\) cm: \(\dfrac{AB}{CD} = \dfrac{30}{200} = \dfrac{3}{20}\).`, [
      undefined,
      'Chưa đổi về cùng đơn vị.',
      'Đổi sai đơn vị (2 m = 200 cm).',
      'Đảo ngược tỉ số.',
    ]),
    mc(2, TL, r`Biết \(\dfrac{AB}{CD} = \dfrac35\) và \(CD = 15\) cm. Độ dài \(AB\) là`, [r`\(9\) cm`, r`\(25\) cm`, r`\(5\) cm`, r`\(45\) cm`], r`\(AB = \dfrac35\cdot15 = 9\) cm.`, [
      undefined,
      r`Đã tính \(\dfrac53\cdot15\).`,
      r`Đã tính \(15 : 3\).`,
      r`Đã tính \(3\cdot15\).`,
    ]),
    mc(2, TL, r`Cho \(AB = 2\) cm, \(CD = 3\) cm. Hai đoạn thẳng \(AB\), \(CD\) tỉ lệ với hai đoạn thẳng \(MN\), \(PQ\) khi`, [r`\(MN = 4\) cm, \(PQ = 6\) cm`, r`\(MN = 3\) cm, \(PQ = 2\) cm`, r`\(MN = 4\) cm, \(PQ = 5\) cm`, r`\(MN = 6\) cm, \(PQ = 4\) cm`], r`Cần \(\dfrac{MN}{PQ} = \dfrac{AB}{CD} = \dfrac23\); chỉ có \(\dfrac46 = \dfrac23\).`, [
      undefined,
      r`\(\dfrac32 \ne \dfrac23\).`,
      r`\(\dfrac45 \ne \dfrac23\).`,
      r`\(\dfrac64 = \dfrac32 \ne \dfrac23\).`,
    ]),
    mc(2, TD, r`Tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)), \(AD = 2\) cm, \(DB = 3\) cm, \(AE = 4\) cm. Độ dài \(EC\) là`, [r`\(6\) cm`, r`\(\dfrac83\) cm`, r`\(5\) cm`, r`\(10\) cm`], r`Định lí Thalès: \(\dfrac{AD}{DB} = \dfrac{AE}{EC}\), tức \(\dfrac23 = \dfrac{4}{EC}\), \(EC = 6\) cm.`, [
      undefined,
      'Lập tỉ lệ thức bị đảo một vế.',
      'Cộng thêm 1 không có cơ sở.',
      r`Đó là \(AC\).`,
    ]),
    mc(2, TD, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 3\) cm, \(AB = 9\) cm, \(AC = 12\) cm. Độ dài \(AN\) là`, [r`\(4\) cm`, r`\(9\) cm`, r`\(8\) cm`, r`\(36\) cm`], r`\(\dfrac{AN}{AC} = \dfrac{AM}{AB} = \dfrac13\) nên \(AN = 4\) cm.`, [
      undefined,
      'Nhầm tỉ số.',
      r`Đó là \(NC\).`,
      'Nhân thay vì chia.',
    ]),
    mc(3, TD, r`Tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)), \(AD = 4\) cm, \(DB = 2\) cm, \(AC = 9\) cm. Độ dài \(AE\) là`, [r`\(6\) cm`, r`\(3\) cm`, r`\(4{,}5\) cm`, r`\(13{,}5\) cm`], r`\(\dfrac{AE}{AC} = \dfrac{AD}{AB} = \dfrac46 = \dfrac23\) nên \(AE = 6\) cm.`, [
      undefined,
      r`Đó là \(EC\).`,
      'Chia đôi \\(AC\\) không có cơ sở.',
      r`Đã tính \(\dfrac{AB}{AD}\cdot AC\).`,
    ]),
    mc(3, TD, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có hai cạnh bên \(AD\), \(BC\) kéo dài cắt nhau tại \(E\); \(EA = 3\) cm, \(AD = 6\) cm, \(EB = 4\) cm. Độ dài \(BC\) là`, [r`\(8\) cm`, r`\(2\) cm`, r`\(4{,}5\) cm`, r`\(12\) cm`], r`Trong tam giác \(EDC\), \(AB \parallel DC\): \(\dfrac{EA}{AD} = \dfrac{EB}{BC}\), tức \(\dfrac36 = \dfrac{4}{BC}\), \(BC = 8\) cm.`, [
      undefined,
      'Lập tỉ lệ thức bị đảo.',
      'Lập tỉ lệ thức sai cặp đoạn.',
      r`Đó là \(EC\).`,
    ]),
    mc(3, CS, r`Tam giác \(ABC\), lấy \(D \in AB\), \(E \in AC\) sao cho \(\dfrac{AD}{DB} = \dfrac{AE}{EC}\). Khẳng định nào sau đây đúng?`, [r`\(DE \parallel BC\)`, r`\(DE \perp BC\)`, r`\(DE = BC\)`, r`\(DE = \dfrac{BC}{2}\)`], 'Theo định lí Thalès đảo, \\(DE \\parallel BC\\).', [
      undefined,
      'Thalès đảo cho quan hệ song song.',
      r`\(DE < BC\).`,
      'Chỉ đúng khi \\(D\\), \\(E\\) là trung điểm.',
    ]),
    mc(3, CS, r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 9\) cm; \(D \in AB\) với \(AD = 2\) cm. Điểm \(E\) trên \(AC\) sao cho \(DE \parallel BC\) thì \(AE\) bằng`, [r`\(3\) cm`, r`\(6\) cm`, r`\(4{,}5\) cm`, r`\(2\) cm`], r`\(\dfrac{AE}{AC} = \dfrac{AD}{AB} = \dfrac13\) nên \(AE = 3\) cm.`, [
      undefined,
      r`Đó là \(EC\).`,
      'Chia đôi \\(AC\\) không có cơ sở.',
      r`\(AE\) không bằng \(AD\).`,
    ]),
    mc(3, CS, r`Tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)). Hệ thức nào sau đây đúng?`, [r`\(AD\cdot EC = AE\cdot DB\)`, r`\(AD\cdot AE = DB\cdot EC\)`, r`\(AD\cdot DB = AE\cdot EC\)`, r`\(AD\cdot AC = AE\cdot DB\)`], r`\(\dfrac{AD}{DB} = \dfrac{AE}{EC}\) nên \(AD\cdot EC = AE\cdot DB\).`, [
      undefined,
      'Nhân chéo sai.',
      'Nhân chéo sai.',
      r`Đúng phải là \(AD\cdot AC = AE\cdot AB\).`,
    ]),
    mc(4, CS, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có \(O\) là giao điểm hai đường chéo. Đường thẳng qua \(O\) song song với \(AB\) cắt \(AD\), \(BC\) lần lượt tại \(M\), \(N\). Khẳng định nào sau đây đúng?`, [r`\(OM = ON\)`, r`\(OM = AB\)`, r`\(MN = CD\)`, r`\(OM = OA\)`], r`Dùng Thalès trong các tam giác \(ACD\), \(BDC\) và \(\dfrac{AO}{AC} = \dfrac{BO}{BD}\) suy ra \(\dfrac{OM}{DC} = \dfrac{ON}{DC}\), tức \(OM = ON\).`, [
      undefined,
      'Không có dữ kiện.',
      r`\(MN < CD\).`,
      'Không có dữ kiện.',
    ]),
    mc(3, DT, r`Để đo khoảng cách \(AB\) qua một con kênh, người ta chọn điểm \(O\) sao cho \(O\), \(A\), \(B\) thẳng hàng và hai điểm \(C\), \(D\) sao cho \(O\), \(C\), \(D\) thẳng hàng, \(AC \parallel BD\). Đo được \(OA = 6\) m, \(OC = 9\) m, \(CD = 12\) m. Khoảng cách \(AB\) là`, [r`\(8\) m`, r`\(18\) m`, r`\(4{,}5\) m`, r`\(12\) m`], r`Trong tam giác \(OBD\), \(AC \parallel BD\): \(\dfrac{OA}{AB} = \dfrac{OC}{CD}\), \(AB = \dfrac{6\cdot12}{9} = 8\) m.`, [
      undefined,
      'Lập tỉ lệ thức bị đảo.',
      'Lập tỉ lệ thức sai cặp đoạn.',
      r`Đó là \(CD\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, TL, r`Cho \(AB = 3\) cm, \(CD = 5\) cm, \(EF = 6\) cm, \(GH = 10\) cm.`, [
      [r`\(\dfrac{AB}{CD} = \dfrac35\).`, true, 'Tính trực tiếp.'],
      [r`\(\dfrac{EF}{GH} = \dfrac35\).`, true, r`\(\dfrac{6}{10} = \dfrac35\).`],
      [r`\(AB\), \(CD\) tỉ lệ với \(EF\), \(GH\).`, true, 'Hai tỉ số bằng nhau.'],
      [r`\(AB\), \(CD\) tỉ lệ với \(GH\), \(EF\).`, false, r`\(\dfrac{GH}{EF} = \dfrac53 \ne \dfrac35\).`],
    ]),
    tf(2, TL, 'Xét tính đúng sai:', [
      ['Tỉ số của hai đoạn thẳng không phụ thuộc vào đơn vị đo.', true, 'Hai đoạn được đo cùng một đơn vị.'],
      [r`Nếu \(AB = 1{,}2\) m, \(CD = 40\) cm thì \(\dfrac{AB}{CD} = 3\).`, true, r`\(\dfrac{120}{40} = 3\).`],
      [r`Nếu \(\dfrac{AB}{CD} = \dfrac23\) và \(CD = 12\) cm thì \(AB = 18\) cm.`, false, r`\(AB = 8\) cm.`],
      [r`Luôn có \(\dfrac{AB}{CD} = \dfrac{CD}{AB}\).`, false, 'Chỉ đúng khi \\(AB = CD\\).'],
    ]),
    tf(2, TD, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 2\) cm, \(MB = 4\) cm, \(AN = 3\) cm.`, [
      [r`\(\dfrac{AM}{MB} = \dfrac{AN}{NC}\).`, true, 'Định lí Thalès.'],
      [r`\(NC = 6\) cm.`, true, r`\(\dfrac24 = \dfrac{3}{NC}\).`],
      [r`\(AC = 9\) cm.`, true, r`\(3 + 6\).`],
      [r`\(\dfrac{AN}{AC} = \dfrac12\).`, false, r`\(\dfrac{AN}{AC} = \dfrac39 = \dfrac13\).`],
    ]),
    tf(3, TD, r`Tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)), \(AD = 5\) cm, \(AB = 15\) cm, \(EC = 8\) cm.`, [
      [r`\(\dfrac{AD}{AB} = \dfrac13\).`, true, r`\(\dfrac{5}{15}\).`],
      [r`\(\dfrac{AE}{AC} = \dfrac13\).`, true, 'Định lí Thalès.'],
      [r`\(\dfrac{EC}{AC} = \dfrac23\).`, true, r`\(1 - \dfrac13\).`],
      [r`\(AE = 6\) cm.`, false, r`\(AC = 12\) cm nên \(AE = 4\) cm.`],
    ]),
    tf(3, CS, r`Tam giác \(ABC\) có \(AB = 12\) cm, \(AC = 15\) cm. Lấy \(D \in AB\), \(E \in AC\) với \(AD = 4\) cm, \(AE = 5\) cm.`, [
      [r`\(\dfrac{AD}{AB} = \dfrac13\).`, true, 'Tính trực tiếp.'],
      [r`\(\dfrac{AE}{AC} = \dfrac13\).`, true, 'Tính trực tiếp.'],
      [r`\(DE \parallel BC\).`, true, 'Định lí Thalès đảo.'],
      [r`\(DE \parallel BC\) chỉ xảy ra khi \(AB = AC\).`, false, 'Thalès đảo không cần tam giác cân.'],
    ]),
    tf(3, CS, r`Tam giác \(ABC\), lấy \(D \in AB\), \(E \in AC\) với \(AD = 3\), \(DB = 4\), \(AE = 4\), \(EC = 5\) (cm).`, [
      [r`\(\dfrac{AD}{DB} = \dfrac34\).`, true, 'Tính trực tiếp.'],
      [r`\(\dfrac{AE}{EC} = \dfrac45\).`, true, 'Tính trực tiếp.'],
      [r`\(DE \parallel BC\).`, false, 'Hai tỉ số khác nhau.'],
      [r`\(DE\) không song song với \(BC\).`, true, 'Nếu song song thì hai tỉ số phải bằng nhau (Thalès).'],
    ]),
    tf(4, CS, r`Tứ giác \(ABCD\) có \(O\) là giao điểm hai đường chéo; \(OE \parallel BC\) (\(E \in AB\)), \(OF \parallel CD\) (\(F \in AD\)).`, [
      [r`\(\dfrac{AE}{EB} = \dfrac{AO}{OC}\).`, true, r`Thalès trong \(\triangle ABC\).`],
      [r`\(\dfrac{AF}{FD} = \dfrac{AO}{OC}\).`, true, r`Thalès trong \(\triangle ACD\).`],
      [r`\(EF \parallel BD\).`, true, r`Thalès đảo trong \(\triangle ABD\).`],
      [r`\(EF \parallel AC\).`, false, r`\(EF \parallel BD\) mà \(BD\) cắt \(AC\) nên \(EF\) không song song với \(AC\).`],
    ]),
    tf(3, TD, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có hai cạnh bên kéo dài cắt nhau tại \(E\); \(EA = 2\) cm, \(AD = 4\) cm, \(EB = 3\) cm.`, [
      [r`\(\dfrac{EA}{AD} = \dfrac{EB}{BC}\).`, true, r`Thalès trong \(\triangle EDC\).`],
      [r`\(BC = 6\) cm.`, true, r`\(\dfrac24 = \dfrac{3}{BC}\).`],
      [r`\(\dfrac{EA}{ED} = \dfrac13\).`, true, r`\(ED = 6\) cm.`],
      [r`\(EC = 6\) cm.`, false, r`\(EC = 3 + 6 = 9\) cm.`],
    ]),
    tf(3, DT, r`Đo khoảng cách \(AB\) qua một hồ: \(O\), \(A\), \(B\) thẳng hàng; \(O\), \(C\), \(D\) thẳng hàng; \(AC \parallel BD\); \(OA = 10\) m, \(OC = 8\) m, \(CD = 12\) m.`, [
      [r`\(\dfrac{OA}{AB} = \dfrac{OC}{CD}\).`, true, r`Thalès trong \(\triangle OBD\).`],
      [r`\(AB = 15\) m.`, true, r`\(\dfrac{10\cdot12}{8}\).`],
      [r`\(OB = 25\) m.`, true, r`\(10 + 15\).`],
      [r`\(AB = 9{,}6\) m.`, false, 'Lập tỉ lệ thức bị đảo.'],
    ]),
    tf(2, TL, r`Cho \(AB = 6\), \(CD = 9\), \(A'B' = 4\), \(C'D' = 6\) (cm).`, [
      [r`\(\dfrac{AB}{CD} = \dfrac23\).`, true, 'Rút gọn \\(\\dfrac69\\).'],
      [r`\(\dfrac{A'B'}{C'D'} = \dfrac23\).`, true, 'Rút gọn \\(\\dfrac46\\).'],
      [r`\(AB\), \(CD\) tỉ lệ với \(A'B'\), \(C'D'\).`, true, 'Hai tỉ số bằng nhau.'],
      [r`\(\dfrac{AB}{A'B'} = \dfrac23\).`, false, r`\(\dfrac64 = \dfrac32\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, TL, r`Cho \(AB = 15\) cm, \(CD = 2\) dm. Tính tỉ số \(\dfrac{AB}{CD}\).`, '3/4', r`\(CD = 20\) cm, \(\dfrac{AB}{CD} = \dfrac{15}{20} = \dfrac34\).`),
    sa(2, TD, r`Tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)), \(AD = 6\) cm, \(DB = 4\) cm, \(AE = 9\) cm. Tính \(EC\).`, '6', r`\(\dfrac64 = \dfrac{9}{EC}\) nên \(EC = 6\) cm.`, CM),
    sa(3, TD, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 4\) cm, \(MB = 6\) cm, \(AC = 15\) cm. Tính \(AN\).`, '6', r`\(\dfrac{AN}{AC} = \dfrac{AM}{AB} = \dfrac{4}{10}\) nên \(AN = 6\) cm.`, CM),
    sa(3, TD, r`Hình thang \(ABCD\) (\(AB \parallel CD\)) có hai cạnh bên kéo dài cắt nhau tại \(E\); \(EA = 4\) cm, \(AD = 5\) cm, \(EC = 18\) cm. Tính \(EB\).`, '8', r`\(\dfrac{EB}{EC} = \dfrac{EA}{ED} = \dfrac49\) nên \(EB = 8\) cm.`, CM),
    sa(3, CS, r`Tam giác \(ABC\) có \(AB = 10\) cm, \(AC = 15\) cm; \(D \in AB\) với \(AD = 4\) cm. Tìm độ dài \(AE\) (\(E \in AC\)) để \(DE \parallel BC\).`, '6', r`\(DE \parallel BC \iff \dfrac{AE}{AC} = \dfrac{AD}{AB} = \dfrac25\), \(AE = 6\) cm.`, CM),
    sa(3, DT, r`Đo khoảng cách \(AB\) qua sông: \(O\), \(A\), \(B\) thẳng hàng; \(O\), \(C\), \(D\) thẳng hàng; \(AC \parallel BD\); \(OA = 12\) m, \(OC = 9\) m, \(CD = 6\) m. Tính \(AB\).`, '8', r`\(\dfrac{OA}{AB} = \dfrac{OC}{CD}\) nên \(AB = \dfrac{12\cdot6}{9} = 8\) m.`, M),
    // ---- Tự luận ----
    es(2, TL, r`a) Tính tỉ số \(\dfrac{AB}{CD}\) biết \(AB = 45\) cm, \(CD = 0{,}6\) m.
b) Tìm \(AB\), \(CD\) biết \(\dfrac{AB}{CD} = \dfrac53\) và \(AB - CD = 8\) cm.`, r`a) \(CD = 60\) cm, \(\dfrac{AB}{CD} = \dfrac{45}{60} = \dfrac34\).
b) \(\dfrac{AB}{5} = \dfrac{CD}{3} = \dfrac{AB - CD}{2} = 4\), nên \(AB = 20\) cm, \(CD = 12\) cm.`, r`0,5 điểm: câu a, đổi đơn vị và rút gọn đúng.
0,5 điểm: câu b, dùng dãy tỉ số bằng nhau đúng.`),
    es(3, TD, r`Tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)), \(AD = 3\) cm, \(DB = 5\) cm, \(AC = 12\) cm. Tính \(AE\) và \(EC\).`, r`\(DE \parallel BC\) nên \(\dfrac{AE}{AC} = \dfrac{AD}{AB} = \dfrac38\).
\(AE = \dfrac38\cdot12 = 4{,}5\) cm; \(EC = 12 - 4{,}5 = 7{,}5\) cm.`, r`0,5 điểm: viết đúng tỉ lệ thức Thalès.
0,5 điểm: tính đúng \(AE\), \(EC\).`),
    es(4, CS, r`Cho tam giác \(ABC\). Lấy \(D \in AB\), \(E \in AC\) sao cho \(\dfrac{AD}{AB} = \dfrac{AE}{AC} = \dfrac13\) và lấy \(F \in BC\) sao cho \(BF = \dfrac{BC}{3}\). Chứng minh \(DE \parallel BC\), \(EF \parallel AB\) và \(BDEF\) là hình bình hành.`, r`\(\dfrac{AD}{AB} = \dfrac{AE}{AC}\) nên \(DE \parallel BC\) (Thalès đảo).
\(\dfrac{CE}{CA} = \dfrac23\) và \(\dfrac{CF}{CB} = \dfrac23\) nên \(EF \parallel AB\) (Thalès đảo trong \(\triangle CAB\)).
Tứ giác \(BDEF\) có \(BD \parallel EF\), \(DE \parallel BF\) nên là hình bình hành.`, r`0,25 điểm: chứng minh \(DE \parallel BC\).
0,5 điểm: tính đúng hai tỉ số và chứng minh \(EF \parallel AB\).
0,25 điểm: kết luận hình bình hành.`),
    es(3, DT, r`Để đo khoảng cách giữa hai điểm \(A\), \(B\) ở hai bờ một con sông, người ta chọn điểm \(O\) sao cho \(O\), \(A\), \(B\) thẳng hàng, rồi chọn \(C\), \(D\) sao cho \(O\), \(C\), \(D\) thẳng hàng và \(AC \parallel BD\). Đo được \(OA = 15\) m, \(OC = 12\) m, \(CD = 20\) m. Tính khoảng cách \(AB\).`, r`Trong tam giác \(OBD\) có \(A \in OB\), \(C \in OD\), \(AC \parallel BD\).
Theo định lí Thalès: \(\dfrac{OA}{AB} = \dfrac{OC}{CD}\), tức \(\dfrac{15}{AB} = \dfrac{12}{20}\).
\(AB = \dfrac{15\cdot20}{12} = 25\) (m).`, r`0,5 điểm: chỉ ra tam giác và đường song song, viết đúng tỉ lệ thức.
0,5 điểm: tính đúng \(AB = 25\) m.`),
    ge(3, TD, r`Cho tam giác \(ABC\) có \(AB = 9\) cm, \(AC = 12\) cm. Trên cạnh \(AB\) lấy điểm \(D\) sao cho \(AD = 3\) cm. Qua \(D\) kẻ đường thẳng song song với \(BC\) cắt \(AC\) tại \(E\). Tính \(AE\) và \(EC\).`, `A(2,6) B(0,0) C(9,0) D(1.33,4) E(4.33,4)
ABCA DE`, r`\(DE \parallel BC\) nên theo định lí Thalès: \(\dfrac{AE}{AC} = \dfrac{AD}{AB} = \dfrac39 = \dfrac13\).
\(AE = \dfrac13\cdot12 = 4\) cm; \(EC = 12 - 4 = 8\) cm.`, r`0,5 điểm: viết đúng tỉ lệ thức Thalès.
0,5 điểm: tính đúng \(AE = 4\) cm, \(EC = 8\) cm.`),
    ge(4, CS, r`Cho hình thang \(ABCD\) (\(AB \parallel CD\)). Một đường thẳng song song với hai đáy cắt \(AD\), \(BC\) lần lượt tại \(M\), \(N\). Chứng minh \(\dfrac{AM}{MD} = \dfrac{BN}{NC}\).`, `A(2,4) B(6,4) C(9,0) D(0,0) M(1.2,2.4) N(7.2,2.4) O(4.8,2.4)
ABCDA MN AC:dash`, r`Gọi \(O\) là giao điểm của \(MN\) với đường chéo \(AC\).
Trong \(\triangle ACD\), \(MO \parallel DC\): \(\dfrac{AM}{MD} = \dfrac{AO}{OC}\).
Trong \(\triangle CAB\), \(ON \parallel AB\): \(\dfrac{BN}{NC} = \dfrac{AO}{OC}\).
Do đó \(\dfrac{AM}{MD} = \dfrac{BN}{NC}\).`, r`0,25 điểm: kẻ thêm đường chéo, xác định giao điểm \(O\).
0,5 điểm: viết đúng hai tỉ lệ thức Thalès.
0,25 điểm: kết luận.`),
  ],
};

const TB = 'tinh-do-dai-duong-trung-binh';
const SS = 'song-song-thang-hang-duong-trung-binh';
const TG = 'tu-giac-tao-boi-trung-diem';

const B16: BankLesson = {
  slug: 'bai-16-duong-trung-binh-cua-tam-giac',
  questions: [
    mc(1, TB, 'Đường trung bình của tam giác là đoạn thẳng nối', ['trung điểm hai cạnh của tam giác', 'một đỉnh với trung điểm cạnh đối diện', 'hai đỉnh của tam giác', 'chân hai đường cao'], 'Theo định nghĩa, đường trung bình nối trung điểm hai cạnh của tam giác.', [
      undefined,
      'Đó là đường trung tuyến.',
      'Đó là một cạnh.',
      'Không phải định nghĩa.',
    ]),
    mc(1, TB, r`Tam giác \(ABC\) có \(BC = 12\) cm; \(M\), \(N\) là trung điểm của \(AB\), \(AC\). Độ dài \(MN\) là`, [r`\(6\) cm`, r`\(12\) cm`, r`\(24\) cm`, r`\(3\) cm`], r`\(MN = \dfrac{BC}{2} = 6\) cm.`, [
      undefined,
      'Đường trung bình bằng nửa cạnh thứ ba.',
      'Không nhân đôi.',
      'Chia đôi hai lần.',
    ]),
    mc(1, TB, 'Mỗi tam giác có bao nhiêu đường trung bình?', [r`\(3\)`, r`\(1\)`, r`\(2\)`, r`\(6\)`], 'Mỗi cặp cạnh cho một đường trung bình; tam giác có 3 cặp cạnh.', [
      undefined,
      'Có 3 cặp cạnh.',
      'Có 3 cặp cạnh.',
      'Đếm trùng.',
    ]),
    mc(2, TB, r`Tam giác \(ABC\) có \(M\), \(N\) là trung điểm của \(AB\), \(AC\) và \(MN = 7\) cm. Độ dài \(BC\) là`, [r`\(14\) cm`, r`\(3{,}5\) cm`, r`\(7\) cm`, r`\(21\) cm`], r`\(BC = 2MN = 14\) cm.`, [
      undefined,
      'Chia thay vì nhân.',
      r`\(BC = 2MN\).`,
      'Nhân 3 nhầm.',
    ]),
    mc(2, TB, r`Tam giác \(ABC\) có \(AB = 6\), \(AC = 8\), \(BC = 10\) (cm). Chu vi tam giác có ba đỉnh là trung điểm ba cạnh là`, [r`\(12\) cm`, r`\(24\) cm`, r`\(48\) cm`, r`\(6\) cm`], r`Ba cạnh của tam giác đó là 3, 4, 5 cm; chu vi 12 cm (bằng nửa chu vi tam giác \(ABC\)).`, [
      undefined,
      r`Đó là chu vi \(\triangle ABC\).`,
      'Nhân đôi nhầm.',
      'Chia 4 nhầm.',
    ]),
    mc(2, TB, r`Tam giác \(ABC\) có \(M\), \(N\) là trung điểm của \(AB\), \(AC\). Khẳng định nào sau đây đúng?`, [r`\(MN \parallel BC\)`, r`\(MN \perp BC\)`, r`\(MN = BC\)`, r`\(MN \parallel AB\)`], 'Đường trung bình song song với cạnh thứ ba.', [
      undefined,
      'Song song chứ không vuông góc.',
      r`\(MN = \dfrac{BC}{2}\).`,
      r`\(M\) nằm trên \(AB\).`,
    ]),
    mc(3, TB, r`Tam giác \(ABC\) có \(M\) là trung điểm \(AB\); đường thẳng qua \(M\) song song với \(BC\) cắt \(AC\) tại \(N\). Biết \(AC = 10\) cm, độ dài \(AN\) là`, [r`\(5\) cm`, r`\(10\) cm`, r`\(2{,}5\) cm`, r`\(20\) cm`], r`Đường thẳng qua trung điểm một cạnh, song song cạnh thứ hai thì đi qua trung điểm cạnh thứ ba: \(AN = 5\) cm.`, [
      undefined,
      r`\(N\) là trung điểm \(AC\).`,
      'Chia đôi hai lần.',
      'Nhân đôi nhầm.',
    ]),
    mc(3, TB, r`Tam giác \(ABC\) đều cạnh 8 cm; \(M\), \(N\) là trung điểm \(AB\), \(AC\). Chu vi tứ giác \(BMNC\) là`, [r`\(20\) cm`, r`\(16\) cm`, r`\(24\) cm`, r`\(12\) cm`], r`\(BM = 4\), \(MN = 4\), \(NC = 4\), \(CB = 8\): chu vi 20 cm.`, [
      undefined,
      r`Quên cạnh \(MN\).`,
      r`Đó là chu vi \(\triangle ABC\).`,
      'Tính thiếu cạnh.',
    ]),
    mc(3, SS, r`Tam giác \(ABC\) có \(M\), \(N\), \(P\) lần lượt là trung điểm của \(AB\), \(AC\), \(BC\). Tứ giác \(BMNP\) là`, ['hình bình hành', 'hình thang cân không phải hình bình hành', 'hình chữ nhật', 'hình thoi'], r`\(MN \parallel BP\) và \(MN = \dfrac{BC}{2} = BP\) nên \(BMNP\) là hình bình hành.`, [
      undefined,
      'Có một cặp cạnh song song và bằng nhau.',
      'Không có góc vuông nói chung.',
      'Các cạnh kề nói chung không bằng nhau.',
    ]),
    mc(3, SS, r`Tam giác \(ABC\) có đường trung tuyến \(AM\), \(I\) là trung điểm của \(AM\), \(BI\) cắt \(AC\) tại \(D\). Tỉ số \(\dfrac{AD}{DC}\) bằng`, [r`\(\dfrac12\)`, r`\(1\)`, r`\(2\)`, r`\(\dfrac13\)`], r`Gọi \(E\) là trung điểm \(DC\): \(ME \parallel BD\) nên \(D\) là trung điểm \(AE\). Do đó \(AD = DE = EC\), \(\dfrac{AD}{DC} = \dfrac12\).`, [
      undefined,
      r`\(D\) không là trung điểm \(AC\).`,
      'Đảo ngược tỉ số.',
      r`Đó là \(\dfrac{AD}{AC}\).`,
    ]),
    mc(3, TG, r`Tứ giác \(ABCD\) có \(E\), \(F\), \(G\), \(H\) lần lượt là trung điểm của \(AB\), \(BC\), \(CD\), \(DA\). Tứ giác \(EFGH\) luôn là`, ['hình bình hành', 'hình chữ nhật', 'hình thoi', 'hình vuông'], r`\(EF\) và \(HG\) cùng song song và bằng nửa \(AC\) nên \(EFGH\) là hình bình hành.`, [
      undefined,
      'Chỉ khi hai đường chéo vuông góc.',
      'Chỉ khi hai đường chéo bằng nhau.',
      'Chỉ khi hai đường chéo bằng nhau và vuông góc.',
    ]),
    mc(4, TG, r`Tứ giác \(ABCD\) có \(AC \perp BD\); \(E\), \(F\), \(G\), \(H\) là trung điểm các cạnh \(AB\), \(BC\), \(CD\), \(DA\). Tứ giác \(EFGH\) là`, ['hình chữ nhật', 'hình thoi không có góc vuông', 'hình vuông', 'hình thang cân không phải hình bình hành'], r`\(EFGH\) là hình bình hành có \(EF \parallel AC\), \(FG \parallel BD\) mà \(AC \perp BD\) nên \(EF \perp FG\): hình chữ nhật.`, [
      undefined,
      'Có góc vuông.',
      'Cần thêm \\(AC = BD\\).',
      'Đã là hình bình hành.',
    ]),
    mc(4, TG, r`Tứ giác \(ABCD\) có \(AC = BD = 10\) cm; \(E\), \(F\), \(G\), \(H\) là trung điểm các cạnh. Tứ giác \(EFGH\) là`, ['hình thoi cạnh 5 cm', 'hình thoi cạnh 10 cm', 'hình chữ nhật có hai cạnh 5 cm và 10 cm', 'hình vuông cạnh 5 cm'], r`\(EF = \dfrac{AC}{2} = 5\), \(FG = \dfrac{BD}{2} = 5\): hình bình hành có hai cạnh kề bằng nhau là hình thoi cạnh 5 cm.`, [
      undefined,
      'Cạnh bằng nửa đường chéo.',
      'Hai cạnh kề bằng nhau (cùng 5 cm).',
      'Chưa biết hai đường chéo có vuông góc không.',
    ]),
    mc(4, SS, r`Tam giác \(ABC\) có \(D\), \(E\), \(M\) lần lượt là trung điểm của \(AB\), \(AC\), \(BC\). Khẳng định nào sau đây đúng?`, [r`\(AM\) và \(DE\) cắt nhau tại trung điểm của mỗi đoạn`, r`\(AM \perp DE\)`, r`\(AM = DE\)`, r`\(DE\) đi qua trọng tâm tam giác \(ABC\)`], r`\(ME \parallel AD\), \(ME = AD\) nên \(ADME\) là hình bình hành; hai đường chéo \(AM\), \(DE\) cắt nhau tại trung điểm mỗi đường.`, [
      undefined,
      'Chỉ đúng khi tam giác cân tại \\(A\\).',
      'Không có dữ kiện.',
      r`\(DE\) cắt \(AM\) tại trung điểm, trọng tâm nằm ở \(\dfrac23\) đoạn \(AM\) kể từ \(A\).`,
    ]),
    // ---- Đúng/Sai ----
    tf(1, TB, r`Tam giác \(ABC\) có \(M\), \(N\) là trung điểm của \(AB\), \(AC\) và \(BC = 16\) cm.`, [
      [r`\(MN\) là đường trung bình của tam giác \(ABC\).`, true, 'Nối trung điểm hai cạnh.'],
      [r`\(MN \parallel BC\).`, true, 'Tính chất đường trung bình.'],
      [r`\(MN = 8\) cm.`, true, 'Nửa cạnh \\(BC\\).'],
      [r`\(MN = 16\) cm.`, false, r`\(MN = \dfrac{BC}{2}\).`],
    ]),
    tf(2, TB, r`Tam giác \(ABC\) có \(AB = 8\), \(AC = 10\), \(BC = 12\) (cm); \(M\), \(N\), \(P\) là trung điểm của \(AB\), \(AC\), \(BC\).`, [
      [r`\(MN = 6\) cm.`, true, r`\(\dfrac{BC}{2}\).`],
      [r`\(NP = 4\) cm.`, true, r`\(\dfrac{AB}{2}\).`],
      [r`\(MP = 5\) cm.`, true, r`\(\dfrac{AC}{2}\).`],
      [r`Chu vi tam giác \(MNP\) bằng 30 cm.`, false, 'Chu vi là 15 cm.'],
    ]),
    tf(2, TB, r`Tam giác \(ABC\) đều cạnh 6 cm; \(D\), \(E\), \(F\) là trung điểm của \(AB\), \(AC\), \(BC\).`, [
      [r`\(DE = 3\) cm.`, true, 'Nửa cạnh \\(BC\\).'],
      [r`Tam giác \(DEF\) đều.`, true, 'Ba cạnh cùng bằng 3 cm.'],
      [r`Chu vi tam giác \(DEF\) bằng 9 cm.`, true, r`\(3\cdot3\).`],
      [r`\(DE \parallel AB\).`, false, r`\(DE \parallel BC\).`],
    ]),
    tf(3, TB, r`Để đo khoảng cách hai điểm \(B\), \(C\) ở hai đầu một hồ, người ta chọn điểm \(A\) và trung điểm \(M\), \(N\) của \(AB\), \(AC\); đo được \(MN = 35\) m.`, [
      [r`\(MN\) là đường trung bình của tam giác \(ABC\).`, true, 'Nối trung điểm hai cạnh.'],
      [r`\(BC = 70\) m.`, true, r`\(2MN\).`],
      [r`\(MN \parallel BC\).`, true, 'Tính chất đường trung bình.'],
      [r`\(BC = 17{,}5\) m.`, false, 'Chia thay vì nhân.'],
    ]),
    tf(3, SS, r`Tam giác \(ABC\) có \(M\) là trung điểm \(AB\); qua \(M\) kẻ đường thẳng song song với \(BC\) cắt \(AC\) tại \(N\).`, [
      [r`\(N\) là trung điểm của \(AC\).`, true, 'Định lí đường thẳng đi qua trung điểm một cạnh.'],
      [r`\(MN = \dfrac{BC}{2}\).`, true, 'Đường trung bình.'],
      [r`\(MN\) là đường trung bình của tam giác \(ABC\).`, true, 'Nối hai trung điểm.'],
      [r`\(AN = \dfrac{BC}{2}\).`, false, r`\(AN = \dfrac{AC}{2}\).`],
    ]),
    tf(3, SS, r`Tam giác \(ABC\) có \(D\), \(E\), \(F\) lần lượt là trung điểm của \(AB\), \(AC\), \(BC\).`, [
      [r`\(DE \parallel BF\) và \(DE = BF\).`, true, r`\(DE = \dfrac{BC}{2} = BF\).`],
      [r`\(DEFB\) là hình bình hành.`, true, 'Một cặp cạnh song song và bằng nhau.'],
      [r`\(ADFE\) là hình bình hành.`, true, r`\(EF \parallel AD\), \(EF = AD\).`],
      [r`\(DEFB\) là hình thoi.`, false, r`Cần \(BD = BF\), tức \(AB = BC\).`],
    ]),
    tf(4, SS, r`Tam giác \(ABC\) có trung tuyến \(AM\), \(I\) là trung điểm \(AM\), \(BI\) cắt \(AC\) tại \(D\); \(E\) là trung điểm \(DC\).`, [
      [r`\(ME \parallel BD\).`, true, r`Đường trung bình của \(\triangle BCD\).`],
      [r`\(D\) là trung điểm của \(AE\).`, true, r`Trong \(\triangle AME\): qua trung điểm \(I\), \(ID \parallel ME\).`],
      [r`\(AD = DE = EC\).`, true, 'Kết hợp hai ý trên.'],
      [r`\(BI = ID\).`, false, r`\(ID = \dfrac{ME}{2} = \dfrac{BD}{4}\) nên \(BI = 3ID\).`],
    ]),
    tf(3, TG, r`Tứ giác \(ABCD\) có \(E\), \(F\), \(G\), \(H\) là trung điểm của \(AB\), \(BC\), \(CD\), \(DA\).`, [
      [r`\(EF \parallel AC\) và \(EF = \dfrac{AC}{2}\).`, true, r`Đường trung bình của \(\triangle ABC\).`],
      [r`\(HG \parallel AC\).`, true, r`Đường trung bình của \(\triangle ADC\).`],
      [r`\(EFGH\) là hình bình hành.`, true, 'Một cặp cạnh song song và bằng nhau.'],
      [r`\(EFGH\) luôn là hình chữ nhật.`, false, 'Chỉ khi hai đường chéo vuông góc.'],
    ]),
    tf(4, TG, r`Tứ giác \(ABCD\) có \(E\), \(F\), \(G\), \(H\) là trung điểm của \(AB\), \(BC\), \(CD\), \(DA\).`, [
      [r`Nếu \(AC \perp BD\) thì \(EFGH\) là hình chữ nhật.`, true, 'Hai cạnh kề song song với hai đường chéo.'],
      [r`Nếu \(AC = BD\) thì \(EFGH\) là hình thoi.`, true, 'Hai cạnh kề bằng nửa hai đường chéo.'],
      [r`Chu vi \(EFGH\) bằng \(AC + BD\).`, true, r`\(2\left(\dfrac{AC}{2} + \dfrac{BD}{2}\right)\).`],
      [r`Nếu \(ABCD\) là hình chữ nhật thì \(EFGH\) là hình chữ nhật.`, false, 'Hình chữ nhật có hai đường chéo bằng nhau nên \\(EFGH\\) là hình thoi.'],
    ]),
    tf(2, TB, r`Tam giác \(ABC\) có \(M\), \(N\) là trung điểm của \(AB\), \(AC\) và \(MN = 5{,}5\) cm.`, [
      [r`\(BC = 11\) cm.`, true, r`\(2MN\).`],
      [r`\(MN \parallel BC\).`, true, 'Tính chất đường trung bình.'],
      [r`\(AM = MB\).`, true, r`\(M\) là trung điểm.`],
      [r`\(AN = 5{,}5\) cm.`, false, r`\(AN = \dfrac{AC}{2}\); không có dữ kiện về \(AC\).`],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, TB, r`Tam giác \(ABC\) có \(BC = 18\) cm; \(M\), \(N\) là trung điểm của \(AB\), \(AC\). Tính \(MN\).`, '9', r`\(MN = \dfrac{18}{2} = 9\) cm.`, CM),
    sa(2, TB, r`Tam giác \(ABC\) có \(M\), \(N\) là trung điểm của \(AB\), \(AC\) và \(MN = 6{,}5\) cm. Tính \(BC\).`, '13', r`\(BC = 2MN = 13\) cm.`, CM),
    sa(2, TB, 'Một tam giác có chu vi 36 cm. Tính chu vi tam giác có ba đỉnh là trung điểm ba cạnh của tam giác đó.', '18', 'Mỗi cạnh của tam giác mới bằng nửa một cạnh của tam giác ban đầu nên chu vi bằng \\(36 : 2 = 18\\) cm.', CM),
    sa(3, TB, r`Tam giác \(ABC\) có \(AB = 6\), \(AC = 7\), \(BC = 8\) (cm); \(D\), \(E\) là trung điểm của \(AB\), \(AC\). Tính chu vi tứ giác \(BDEC\).`, '18,5', r`\(BD = 3\), \(DE = 4\), \(EC = 3{,}5\), \(CB = 8\); chu vi \(18{,}5\) cm.`, CM),
    sa(3, SS, r`Tam giác \(ABC\) có trung tuyến \(AM\), \(I\) là trung điểm \(AM\), \(BI\) cắt \(AC\) tại \(D\). Biết \(AC = 12\) cm, tính \(AD\).`, '4', r`Lấy \(E\) là trung điểm \(DC\) thì \(AD = DE = EC = \dfrac{AC}{3} = 4\) cm.`, CM),
    sa(4, TG, r`Tứ giác \(ABCD\) có \(AC = 10\) cm, \(BD = 14\) cm. Tính chu vi tứ giác có bốn đỉnh là trung điểm bốn cạnh của \(ABCD\).`, '24', r`Chu vi bằng \(AC + BD = 24\) cm.`, CM),
    sa(4, TG, r`Tứ giác \(ABCD\) có \(AC \perp BD\), \(AC = 8\) cm, \(BD = 6\) cm. Tính diện tích tứ giác có bốn đỉnh là trung điểm bốn cạnh của \(ABCD\).`, '12', r`Tứ giác đó là hình chữ nhật có hai cạnh \(\dfrac{AC}{2} = 4\) cm và \(\dfrac{BD}{2} = 3\) cm; diện tích 12 cm².`, CM2),
    // ---- Tự luận ----
    es(2, TB, r`Tam giác \(ABC\) có \(AB = 10\), \(AC = 12\), \(BC = 14\) (cm); \(M\), \(N\), \(P\) lần lượt là trung điểm của \(AB\), \(AC\), \(BC\).
a) Tính chu vi tam giác \(MNP\). b) Chứng minh \(MN \parallel BC\).`, r`a) \(MN = 7\), \(NP = 5\), \(MP = 6\) (đường trung bình); chu vi \(MNP\) là 18 cm.
b) \(MN\) nối trung điểm hai cạnh \(AB\), \(AC\) nên là đường trung bình, do đó \(MN \parallel BC\).`, r`0,5 điểm: tính đúng ba cạnh và chu vi.
0,5 điểm: chứng minh \(MN \parallel BC\).`),
    es(4, SS, r`Cho tam giác \(ABC\), điểm \(D\) thuộc cạnh \(AC\) sao cho \(AD = \dfrac13AC\). Gọi \(M\) là trung điểm của \(BC\), \(I\) là giao điểm của \(BD\) và \(AM\). Chứng minh \(I\) là trung điểm của \(AM\).`, r`Gọi \(E\) là trung điểm của \(DC\); khi đó \(AD = DE = EC\).
\(ME\) là đường trung bình của \(\triangle BCD\) nên \(ME \parallel BD\), tức \(ME \parallel DI\).
Trong \(\triangle AME\): \(D\) là trung điểm của \(AE\) và \(DI \parallel ME\) nên \(I\) là trung điểm của \(AM\).`, r`0,25 điểm: lấy trung điểm \(E\) và chỉ ra \(AD = DE = EC\).
0,5 điểm: chứng minh \(ME \parallel BD\).
0,25 điểm: kết luận \(I\) là trung điểm \(AM\).`),
    ge(2, TB, r`Để đo khoảng cách giữa hai điểm \(B\), \(C\) bị ngăn bởi một hồ nước, người ta chọn điểm \(A\) ở ngoài hồ, xác định trung điểm \(M\) của \(AB\), trung điểm \(N\) của \(AC\) rồi đo được \(MN = 42\) m. Tính khoảng cách \(BC\) và giải thích.`, `A(3,7) B(0,0) C(10,0) M(1.5,3.5) N(6.5,3.5)
AB AC MN BC:dash`, r`\(M\), \(N\) là trung điểm của \(AB\), \(AC\) nên \(MN\) là đường trung bình của tam giác \(ABC\).
Do đó \(MN = \dfrac{BC}{2}\), suy ra \(BC = 2\cdot42 = 84\) (m).`, r`0,5 điểm: chỉ ra \(MN\) là đường trung bình.
0,5 điểm: tính đúng \(BC = 84\) m.`),
    ge(3, TG, r`Cho tứ giác \(ABCD\) có hai đường chéo \(AC = BD\). Gọi \(E\), \(F\), \(G\), \(H\) lần lượt là trung điểm của \(AB\), \(BC\), \(CD\), \(DA\). Chứng minh \(EFGH\) là hình thoi.`, `A(0,0) B(6,-3) C(8,0) D(2,3.93) E(3,-1.5) F(7,-1.5) G(5,1.96) H(1,1.96)
ABCDA AC:dash BD:dash EFGHE`, r`\(EF\) là đường trung bình của \(\triangle ABC\): \(EF \parallel AC\), \(EF = \dfrac{AC}{2}\). Tương tự \(HG \parallel AC\), \(HG = \dfrac{AC}{2}\).
Do đó \(EFGH\) là hình bình hành.
\(FG\) là đường trung bình của \(\triangle BCD\): \(FG = \dfrac{BD}{2}\). Vì \(AC = BD\) nên \(EF = FG\).
Hình bình hành có hai cạnh kề bằng nhau là hình thoi.`, r`0,5 điểm: chứng minh \(EFGH\) là hình bình hành.
0,25 điểm: chứng minh \(EF = FG\).
0,25 điểm: kết luận hình thoi.`),
    ge(4, TG, r`Cho tam giác \(ABC\) có \(AB < AC\), đường cao \(AH\). Gọi \(M\), \(N\), \(P\) lần lượt là trung điểm của \(AB\), \(AC\), \(BC\). Chứng minh \(MNPH\) là hình thang cân.`, `A(2,5) B(0,0) C(9,0) H(2,0) M(1,2.5) N(5.5,2.5) P(4.5,0)
ABCA AH:dash MN NP HM MP:dash HN:dash
vuong(A,H,C)`, r`\(MN\) là đường trung bình của \(\triangle ABC\) nên \(MN \parallel BC\), tức \(MN \parallel HP\): \(MNPH\) là hình thang.
\(MP\) là đường trung bình của \(\triangle ABC\) nên \(MP = \dfrac{AC}{2}\).
\(HN\) là trung tuyến ứng với cạnh huyền của tam giác vuông \(AHC\) nên \(HN = \dfrac{AC}{2}\).
Hình thang \(MNPH\) có hai đường chéo \(MP = HN\) nên là hình thang cân.`, r`0,25 điểm: chứng minh \(MNPH\) là hình thang.
0,5 điểm: chứng minh \(MP = HN = \dfrac{AC}{2}\).
0,25 điểm: kết luận hình thang cân.`),
  ],
};

const PG = 'tinh-do-dai-canh-duong-phan-giac';
const DS = 'ti-so-dien-tich-duong-phan-giac';
const KT = 'phan-giac-ket-hop-thales';

const B17: BankLesson = {
  slug: 'bai-17-tinh-chat-duong-phan-giac-cua-tam-giac',
  questions: [
    mc(1, PG, r`Tam giác \(ABC\) có \(AD\) là đường phân giác (\(D \in BC\)). Khẳng định nào sau đây đúng?`, [r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC}\)`, r`\(\dfrac{DB}{DC} = \dfrac{AC}{AB}\)`, r`\(\dfrac{DB}{AB} = \dfrac{AC}{DC}\)`, r`\(DB = DC\)`], 'Đường phân giác chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề hai đoạn ấy.', [
      undefined,
      'Đảo ngược tỉ số.',
      'Ghép sai cặp đoạn.',
      'Chỉ đúng khi tam giác cân tại \\(A\\).',
    ]),
    mc(1, PG, r`Tam giác \(ABC\) có \(AB = 4\) cm, \(AC = 6\) cm, \(AD\) là đường phân giác. Tỉ số \(\dfrac{DB}{DC}\) bằng`, [r`\(\dfrac23\)`, r`\(\dfrac32\)`, r`\(1\)`, r`\(\dfrac25\)`], r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac46 = \dfrac23\).`, [
      undefined,
      'Đảo ngược tỉ số.',
      'Tam giác không cân.',
      r`Đó là \(\dfrac{DB}{BC}\).`,
    ]),
    mc(2, PG, r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 8\) cm, \(AD\) là đường phân giác và \(DB = 3\) cm. Độ dài \(DC\) là`, [r`\(4\) cm`, r`\(\dfrac94\) cm`, r`\(5\) cm`, r`\(6\) cm`], r`\(\dfrac{3}{DC} = \dfrac68\) nên \(DC = 4\) cm.`, [
      undefined,
      'Lập tỉ lệ thức bị đảo.',
      'Cộng thêm 2 không có cơ sở.',
      r`Nhầm \(DC\) với \(AB\).`,
    ]),
    mc(2, PG, r`Tam giác \(ABC\) có \(AB = 5\), \(AC = 7\), \(BC = 6\) (cm), đường phân giác \(AD\). Độ dài \(DB\) là`, [r`\(2{,}5\) cm`, r`\(3{,}5\) cm`, r`\(3\) cm`, r`\(\dfrac57\) cm`], r`\(\dfrac{DB}{5} = \dfrac{DC}{7} = \dfrac{6}{12}\) nên \(DB = 2{,}5\) cm.`, [
      undefined,
      r`Đó là \(DC\).`,
      r`\(D\) không là trung điểm vì \(AB \ne AC\).`,
      'Đó chỉ là tỉ số hai cạnh.',
    ]),
    mc(2, PG, r`Tam giác \(ABC\) cân tại \(A\) có đường phân giác \(AD\). Khẳng định nào sau đây đúng?`, [r`\(D\) là trung điểm của \(BC\)`, r`\(DB = 2DC\)`, r`\(D\) trùng với \(B\)`, r`\(\dfrac{DB}{DC} = \dfrac{AB}{BC}\)`], r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC} = 1\) nên \(D\) là trung điểm \(BC\).`, [
      undefined,
      'Tỉ số bằng 1.',
      r`\(D\) nằm giữa \(B\) và \(C\).`,
      r`Tỉ số đúng là \(\dfrac{AB}{AC}\).`,
    ]),
    mc(2, PG, r`Tam giác \(ABC\) có \(AB = 8\), \(AC = 12\), \(BC = 15\) (cm), đường phân giác \(AD\). Độ dài \(DC\) là`, [r`\(9\) cm`, r`\(6\) cm`, r`\(7{,}5\) cm`, r`\(10\) cm`], r`\(\dfrac{DB}{8} = \dfrac{DC}{12} = \dfrac{15}{20}\) nên \(DC = 9\) cm.`, [
      undefined,
      r`Đó là \(DB\).`,
      r`\(D\) không là trung điểm.`,
      'Tính sai tỉ số.',
    ]),
    mc(2, DS, r`Tam giác \(ABC\) có \(AB = 3\) cm, \(AC = 5\) cm, đường phân giác \(AD\). Tỉ số \(\dfrac{S_{ABD}}{S_{ACD}}\) bằng`, [r`\(\dfrac35\)`, r`\(\dfrac53\)`, r`\(\dfrac{9}{25}\)`, r`\(\dfrac38\)`], r`Hai tam giác chung đường cao kẻ từ \(A\) nên tỉ số diện tích bằng \(\dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac35\).`, [
      undefined,
      'Đảo ngược tỉ số.',
      'Không bình phương: hai tam giác không đồng dạng.',
      r`Đó là \(\dfrac{S_{ABD}}{S_{ABC}}\).`,
    ]),
    mc(3, DS, r`Tam giác \(ABC\) có diện tích 40 cm², \(AB = 6\) cm, \(AC = 10\) cm, đường phân giác \(AD\). Diện tích tam giác \(ABD\) là`, [r`\(15\) cm²`, r`\(25\) cm²`, r`\(24\) cm²`, r`\(20\) cm²`], r`\(\dfrac{S_{ABD}}{S_{ABC}} = \dfrac{DB}{BC} = \dfrac{6}{16}\) nên \(S_{ABD} = 15\) cm².`, [
      undefined,
      r`Đó là \(S_{ACD}\).`,
      r`Tính nhầm \(\dfrac{6}{10}\cdot40\).`,
      r`\(D\) không là trung điểm.`,
    ]),
    mc(3, DS, r`Tam giác \(ABC\) có \(AB : AC = 2 : 3\), đường phân giác \(AD\) và \(S_{ACD} = 30\) cm². Diện tích tam giác \(ABD\) là`, [r`\(20\) cm²`, r`\(45\) cm²`, r`\(12\) cm²`, r`\(50\) cm²`], r`\(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac23\) nên \(S_{ABD} = 20\) cm².`, [
      undefined,
      'Đảo ngược tỉ số.',
      r`Tính nhầm \(\dfrac25\cdot30\).`,
      r`Đó là \(S_{ABC}\).`,
    ]),
    mc(2, PG, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\), \(AC = 8\), \(BC = 10\) (cm), đường phân giác \(AD\). Độ dài \(BD\) là`, [r`\(\dfrac{30}{7}\) cm`, r`\(\dfrac{40}{7}\) cm`, r`\(5\) cm`, r`\(3\) cm`], r`\(\dfrac{BD}{6} = \dfrac{DC}{8} = \dfrac{10}{14}\) nên \(BD = \dfrac{30}{7}\) cm.`, [
      undefined,
      r`Đó là \(DC\).`,
      r`\(D\) không là trung điểm.`,
      'Tính sai.',
    ]),
    mc(3, KT, r`Tam giác \(ABC\) có \(AB = 6\), \(AC = 9\), \(BC = 10\) (cm), đường phân giác \(AD\); qua \(D\) kẻ \(DE \parallel AB\) (\(E \in AC\)). Độ dài \(AE\) là`, [r`\(3{,}6\) cm`, r`\(5{,}4\) cm`, r`\(4{,}5\) cm`, r`\(3\) cm`], r`\(\dfrac{DB}{DC} = \dfrac23\) nên \(\dfrac{CD}{CB} = \dfrac35\). Thalès trong \(\triangle CAB\): \(\dfrac{CE}{CA} = \dfrac35\), \(CE = 5{,}4\) cm, \(AE = 3{,}6\) cm.`, [
      undefined,
      r`Đó là \(CE\).`,
      r`\(E\) không là trung điểm.`,
      'Tính sai tỉ số.',
    ]),
    mc(3, KT, r`Tam giác \(ABC\) có \(AB = 8\), \(AC = 12\) (cm), đường phân giác \(AD\); qua \(D\) kẻ \(DE \parallel AC\) (\(E \in AB\)). Độ dài \(AE\) là`, [r`\(4{,}8\) cm`, r`\(3{,}2\) cm`, r`\(4\) cm`, r`\(6\) cm`], r`\(\dfrac{BD}{BC} = \dfrac{8}{20} = \dfrac25\); Thalès: \(\dfrac{BE}{BA} = \dfrac25\), \(BE = 3{,}2\) cm, \(AE = 4{,}8\) cm.`, [
      undefined,
      r`Đó là \(BE\).`,
      r`\(E\) không là trung điểm.`,
      'Tính sai.',
    ]),
    mc(4, KT, r`Tam giác \(ABC\) có trung tuyến \(AM\). Tia phân giác của góc \(AMB\) cắt \(AB\) tại \(D\), tia phân giác của góc \(AMC\) cắt \(AC\) tại \(E\). Khẳng định nào sau đây đúng?`, [r`\(DE \parallel BC\)`, r`\(DE \perp BC\)`, r`\(DE = BC\)`, r`\(DE \parallel AM\)`], r`\(\dfrac{DA}{DB} = \dfrac{MA}{MB} = \dfrac{MA}{MC} = \dfrac{EA}{EC}\) nên \(DE \parallel BC\) (Thalès đảo).`, [
      undefined,
      'Thalès đảo cho quan hệ song song.',
      r`\(DE < BC\).`,
      r`\(D\), \(E\) nằm hai bên \(AM\).`,
    ]),
    mc(4, KT, r`Tam giác \(ABC\) có \(AB = 4\), \(AC = 6\), \(BC = 5\) (cm). Tia phân giác góc ngoài tại \(A\) cắt đường thẳng \(BC\) tại \(E\). Độ dài \(EB\) là`, [r`\(10\) cm`, r`\(2\) cm`, r`\(15\) cm`, r`\(4\) cm`], r`\(\dfrac{EB}{EC} = \dfrac{AB}{AC} = \dfrac23\); \(E\) nằm ngoài đoạn \(BC\), phía \(B\): \(EC - EB = 5\). Suy ra \(EB = 10\) cm.`, [
      undefined,
      r`Đó là \(DB\) của phân giác trong.`,
      r`Đó là \(EC\).`,
      'Tính sai.',
    ]),
    // ---- Đúng/Sai ----
    tf(1, PG, r`Tam giác \(ABC\) có \(AD\) là đường phân giác (\(D \in BC\)).`, [
      [r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC}\).`, true, 'Tính chất đường phân giác.'],
      [r`\(\dfrac{DB}{AB} = \dfrac{DC}{AC}\).`, true, 'Hoán vị trung tỉ.'],
      [r`Luôn có \(DB = DC\).`, false, r`Chỉ khi \(AB = AC\).`],
      [r`Nếu \(AB = AC\) thì \(DB = DC\).`, true, 'Tỉ số bằng 1.'],
    ]),
    tf(2, PG, r`Tam giác \(ABC\) có \(AB = 6\), \(AC = 9\), \(BC = 10\) (cm), đường phân giác \(AD\).`, [
      [r`\(\dfrac{DB}{DC} = \dfrac23\).`, true, r`\(\dfrac69\).`],
      [r`\(DB = 4\) cm.`, true, r`\(\dfrac25\cdot10\).`],
      [r`\(DC = 6\) cm.`, true, r`\(\dfrac35\cdot10\).`],
      [r`\(DB = 5\) cm.`, false, r`\(D\) không là trung điểm.`],
    ]),
    tf(2, PG, r`Tam giác \(ABC\) có \(AB = 12\) cm, \(AC = 18\) cm, đường phân giác \(AD\) và \(DC = 9\) cm.`, [
      [r`\(DB = 6\) cm.`, true, r`\(\dfrac{DB}{9} = \dfrac{12}{18}\).`],
      [r`\(BC = 15\) cm.`, true, r`\(6 + 9\).`],
      [r`\(\dfrac{DB}{DC} = \dfrac23\).`, true, 'Tính chất đường phân giác.'],
      [r`\(DB = 13{,}5\) cm.`, false, 'Lập tỉ lệ thức bị đảo.'],
    ]),
    tf(2, DS, r`Tam giác \(ABC\) có \(AB = 4\) cm, \(AC = 7\) cm, đường phân giác \(AD\).`, [
      [r`\(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac47\).`, true, 'Chung đường cao từ \\(A\\).'],
      [r`\(\dfrac{BD}{DC} = \dfrac47\).`, true, 'Tính chất đường phân giác.'],
      [r`\(\dfrac{S_{ABD}}{S_{ABC}} = \dfrac{4}{11}\).`, true, r`\(\dfrac{BD}{BC} = \dfrac{4}{11}\).`],
      [r`\(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac{16}{49}\).`, false, 'Không bình phương tỉ số.'],
    ]),
    tf(3, DS, r`Tam giác \(ABC\) có diện tích 60 cm², \(AB = 5\) cm, \(AC = 7\) cm, đường phân giác \(AD\).`, [
      [r`\(S_{ABD} = 25\) cm².`, true, r`\(\dfrac{5}{12}\cdot60\).`],
      [r`\(S_{ACD} = 35\) cm².`, true, r`\(\dfrac{7}{12}\cdot60\).`],
      [r`\(S_{ACD} - S_{ABD} = 10\) cm².`, true, r`\(35 - 25\).`],
      [r`\(S_{ABD} = 30\) cm².`, false, r`\(D\) không là trung điểm.`],
    ]),
    tf(2, PG, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 9\), \(AC = 12\), \(BC = 15\) (cm), đường phân giác \(AD\).`, [
      [r`\(\dfrac{BD}{DC} = \dfrac34\).`, true, r`\(\dfrac{9}{12}\).`],
      [r`\(BD = \dfrac{45}{7}\) cm.`, true, r`\(\dfrac37\cdot15\).`],
      [r`\(DC = \dfrac{60}{7}\) cm.`, true, r`\(\dfrac47\cdot15\).`],
      [r`\(BD = 7{,}5\) cm.`, false, r`\(D\) không là trung điểm.`],
    ]),
    tf(3, KT, r`Tam giác \(ABC\) có \(AB = 6\), \(AC = 9\), \(BC = 10\) (cm), đường phân giác \(AD\); qua \(D\) kẻ \(DE \parallel AB\) (\(E \in AC\)).`, [
      [r`\(DC = 6\) cm.`, true, r`\(\dfrac35\cdot10\).`],
      [r`\(\dfrac{CE}{CA} = \dfrac35\).`, true, r`Thalès: \(\dfrac{CE}{CA} = \dfrac{CD}{CB}\).`],
      [r`\(AE = 3{,}6\) cm.`, true, r`\(9 - 5{,}4\).`],
      [r`\(CE = 6\) cm.`, false, r`\(CE = 5{,}4\) cm.`],
    ]),
    tf(4, KT, r`Tam giác \(ABC\) có trung tuyến \(AM\); \(MD\), \(ME\) lần lượt là tia phân giác của các góc \(AMB\), \(AMC\) (\(D \in AB\), \(E \in AC\)).`, [
      [r`\(\dfrac{DA}{DB} = \dfrac{MA}{MB}\).`, true, r`Tính chất phân giác trong \(\triangle AMB\).`],
      [r`\(\dfrac{EA}{EC} = \dfrac{MA}{MC}\).`, true, r`Tính chất phân giác trong \(\triangle AMC\).`],
      [r`\(DE \parallel BC\).`, true, r`\(MB = MC\) nên hai tỉ số bằng nhau; Thalès đảo.`],
      [r`\(DE = \dfrac{BC}{2}\).`, false, r`Chỉ khi \(D\), \(E\) là trung điểm, tức \(MA = MB\).`],
    ]),
    tf(4, KT, r`Tam giác \(ABC\) có \(AB \ne AC\); \(AD\), \(AE\) lần lượt là tia phân giác trong và tia phân giác góc ngoài tại \(A\) (\(D\), \(E\) thuộc đường thẳng \(BC\)).`, [
      [r`\(AD \perp AE\).`, true, 'Phân giác của hai góc kề bù vuông góc với nhau.'],
      [r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC}\).`, true, 'Tính chất phân giác trong.'],
      [r`\(\dfrac{EB}{EC} = \dfrac{AB}{AC}\).`, true, 'Tính chất phân giác ngoài.'],
      [r`\(D\) là trung điểm của \(BC\).`, false, r`Vì \(AB \ne AC\).`],
    ]),
    tf(3, DS, r`Tam giác \(ABC\) có \(AB = 4\) cm, \(BC = 6\) cm, \(BE\) là đường phân giác (\(E \in AC\)).`, [
      [r`\(\dfrac{AE}{EC} = \dfrac23\).`, true, r`\(\dfrac{AB}{BC} = \dfrac46\).`],
      [r`\(\dfrac{S_{ABE}}{S_{CBE}} = \dfrac23\).`, true, 'Chung đường cao từ \\(B\\).'],
      [r`\(AE = \dfrac25AC\).`, true, r`\(\dfrac{AE}{AC} = \dfrac{2}{5}\).`],
      [r`\(\dfrac{AE}{EC} = \dfrac32\).`, false, 'Đảo ngược tỉ số.'],
    ]),
    // ---- Trả lời ngắn ----
    sa(1, PG, r`Tam giác \(ABC\) có \(AB = 8\) cm, \(AC = 12\) cm, đường phân giác \(AD\) và \(DB = 4\) cm. Tính \(DC\).`, '6', r`\(\dfrac{4}{DC} = \dfrac{8}{12}\) nên \(DC = 6\) cm.`, CM),
    sa(2, PG, r`Tam giác \(ABC\) có \(AB = 3\), \(AC = 5\), \(BC = 6{,}4\) (cm), đường phân giác \(AD\). Tính \(DB\).`, '2,4', r`\(\dfrac{DB}{3} = \dfrac{DC}{5} = \dfrac{6{,}4}{8} = 0{,}8\) nên \(DB = 2{,}4\) cm.`, CM),
    sa(2, DS, r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 9\) cm, đường phân giác \(AD\). Tính tỉ số \(\dfrac{S_{ABD}}{S_{ACD}}\).`, '2/3', r`\(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac23\).`),
    sa(3, DS, r`Tam giác \(ABC\) có diện tích 72 cm², \(AB = 7\) cm, \(AC = 11\) cm, đường phân giác \(AD\). Tính diện tích tam giác \(ABD\).`, '28', r`\(S_{ABD} = \dfrac{7}{18}\cdot72 = 28\) cm².`, CM2),
    sa(3, KT, r`Tam giác \(ABC\) có \(AB = 10\), \(AC = 15\), \(BC = 20\) (cm), đường phân giác \(AD\); qua \(D\) kẻ \(DE \parallel AC\) (\(E \in AB\)). Tính \(AE\).`, '6', r`\(\dfrac{BD}{BC} = \dfrac{10}{25} = \dfrac25\); Thalès: \(BE = \dfrac25\cdot10 = 4\) cm; \(AE = 6\) cm.`, CM),
    sa(4, KT, r`Tam giác \(ABC\) có \(AB = 3\), \(AC = 5\), \(BC = 4\) (cm). Tia phân giác góc ngoài tại \(A\) cắt đường thẳng \(BC\) tại \(E\). Tính \(EB\).`, '6', r`\(\dfrac{EB}{EC} = \dfrac35\), \(E\) nằm ngoài đoạn \(BC\) về phía \(B\): \(EC = EB + 4\). Giải được \(EB = 6\) cm.`, CM),
    // ---- Tự luận ----
    es(2, PG, r`Tam giác \(ABC\) có \(AB = 12\) cm, \(AC = 18\) cm, \(BC = 20\) cm, đường phân giác \(AD\). Tính \(DB\), \(DC\).`, r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac23\), nên \(\dfrac{DB}{2} = \dfrac{DC}{3} = \dfrac{20}{5} = 4\).
\(DB = 8\) cm, \(DC = 12\) cm.`, r`0,5 điểm: viết đúng tính chất đường phân giác.
0,5 điểm: tính đúng \(DB\), \(DC\).`),
    es(3, DS, r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 10\) cm, diện tích 48 cm², đường phân giác \(AD\).
a) Tính tỉ số diện tích hai tam giác \(ABD\) và \(ACD\). b) Tính diện tích mỗi tam giác.`, r`a) Hai tam giác chung đường cao kẻ từ \(A\): \(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac35\).
b) \(S_{ABD} = \dfrac38\cdot48 = 18\) cm², \(S_{ACD} = 30\) cm².`, r`0,5 điểm: câu a, giải thích vì sao tỉ số diện tích bằng \(\dfrac{DB}{DC}\).
0,5 điểm: câu b, tính đúng hai diện tích.`),
    es(3, KT, r`Tam giác \(ABC\) có \(AB = 10\) cm, \(AC = 15\) cm, \(BC = 20\) cm, đường phân giác \(AD\). Qua \(D\) kẻ \(DE \parallel AB\) (\(E \in AC\)). Tính \(DB\), \(DC\), \(AE\), \(EC\).`, r`\(\dfrac{DB}{DC} = \dfrac{10}{15}\) nên \(DB = 8\) cm, \(DC = 12\) cm.
Thalès trong \(\triangle CAB\): \(\dfrac{CE}{CA} = \dfrac{CD}{CB} = \dfrac{12}{20} = \dfrac35\), nên \(CE = 9\) cm, \(AE = 6\) cm.`, r`0,5 điểm: tính đúng \(DB\), \(DC\).
0,5 điểm: dùng Thalès tính đúng \(CE\), \(AE\).`),
    es(4, KT, r`Cho tam giác \(ABC\), đường phân giác \(AD\). Kẻ \(DH \perp AB\), \(DK \perp AC\). Dùng diện tích, chứng minh \(\dfrac{DB}{DC} = \dfrac{AB}{AC}\).`, r`\(D\) nằm trên tia phân giác góc \(A\) nên \(DH = DK\).
\(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac{\frac12AB\cdot DH}{\frac12AC\cdot DK} = \dfrac{AB}{AC}\).
Mặt khác hai tam giác chung đường cao kẻ từ \(A\) nên \(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac{DB}{DC}\).
Do đó \(\dfrac{DB}{DC} = \dfrac{AB}{AC}\).`, r`0,25 điểm: nêu \(DH = DK\).
0,25 điểm: tính tỉ số diện tích theo \(AB\), \(AC\).
0,5 điểm: tính tỉ số diện tích theo \(DB\), \(DC\) và kết luận.`),
    ge(2, PG, r`Tam giác \(ABC\) có \(AB = 4\) cm, \(AC = 6\) cm, \(BC = 7{,}5\) cm, đường phân giác \(AD\). Tính \(DB\) và \(DC\).`, `A(2.42,3.19) B(0,0) C(7.5,0) D(3,0)
ABCA AD
goc(B,A,D) goc(D,A,C)`, r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac46 = \dfrac23\).
\(\dfrac{DB}{2} = \dfrac{DC}{3} = \dfrac{7{,}5}{5} = 1{,}5\), nên \(DB = 3\) cm, \(DC = 4{,}5\) cm.`, r`0,5 điểm: viết đúng tính chất đường phân giác.
0,5 điểm: tính đúng \(DB\), \(DC\).`),
    ge(3, DS, r`Tam giác \(ABC\) có \(AB = 5\) cm, \(AC = 8\) cm, đường phân giác \(AD\), đường cao \(AH\). Biết diện tích tam giác \(ABC\) là 39 cm². Chứng minh \(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac58\) và tính diện tích tam giác \(ABD\).`, `A(2.33,4.42) B(0,0) C(9,0) D(3.46,0) H(2.33,0)
ABCA AD AH:dash
vuong(A,H,C)`, r`\(S_{ABD} = \dfrac12AH\cdot DB\), \(S_{ACD} = \dfrac12AH\cdot DC\) nên \(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac58\).
\(S_{ABD} = \dfrac{5}{13}S_{ABC} = \dfrac{5}{13}\cdot39 = 15\) cm².`, r`0,5 điểm: chứng minh tỉ số diện tích.
0,5 điểm: tính đúng \(S_{ABD} = 15\) cm².`),
    ge(4, KT, r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 12\) cm, đường phân giác \(AD\). Qua \(D\) kẻ \(DE \parallel AC\) (\(E \in AB\)) và \(DF \parallel AB\) (\(F \in AC\)). Chứng minh \(AEDF\) là hình thoi và tính độ dài cạnh của hình thoi.`, `A(3.9,4.56) B(0,0) C(15,0) D(5,0) E(1.3,1.52) F(7.6,3.04)
ABCA AD DE DF`, r`\(AEDF\) có các cạnh đối song song nên là hình bình hành; đường chéo \(AD\) là tia phân giác góc \(A\) nên \(AEDF\) là hình thoi.
\(\dfrac{BD}{BC} = \dfrac{AB}{AB + AC} = \dfrac{6}{18} = \dfrac13\).
Thalès trong \(\triangle BAC\) (\(DE \parallel AC\)): \(\dfrac{BE}{BA} = \dfrac{BD}{BC} = \dfrac13\), nên \(BE = 2\) cm, \(AE = 4\) cm.
Cạnh hình thoi bằng 4 cm.`, r`0,5 điểm: chứng minh \(AEDF\) là hình thoi.
0,25 điểm: tính \(\dfrac{BD}{BC} = \dfrac13\).
0,25 điểm: dùng Thalès tính cạnh 4 cm.`),
  ],
};

export const BANK_CHUONG_4: BankLesson[] = [B15, B16, B17];
