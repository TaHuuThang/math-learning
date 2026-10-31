import { es, ge, mcq, r, sa, tf, type MapChapter } from './types';

/** Chương IX. Tam giác đồng dạng – Bài 33 đến Bài 37. Kí hiệu đồng dạng: \backsim (∽). */
export const CHUONG_9: MapChapter = {
  code: 'IX',
  objectives: `- Mô tả định nghĩa hai tam giác đồng dạng; giải thích các trường hợp đồng dạng của hai tam giác, của hai tam giác vuông.
- Giải thích định lí Pythagore (thuận và đảo); tính độ dài đoạn thẳng bằng định lí Pythagore.
- Nhận biết hình đồng dạng phối cảnh, hình đồng dạng qua các hình ảnh cụ thể.
- Vận dụng tam giác đồng dạng, định lí Pythagore giải bài toán thực tiễn (đo chiều cao, khoảng cách).`,
  keyPoints: r`- \(\triangle A'B'C' \backsim \triangle ABC\): các góc tương ứng bằng nhau, các cạnh tương ứng tỉ lệ; tỉ số đồng dạng \(k = \dfrac{A'B'}{AB}\).
- Đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại tạo thành một tam giác đồng dạng với tam giác đã cho.
- Ba trường hợp đồng dạng: cạnh – cạnh – cạnh, cạnh – góc – cạnh, góc – góc; các trường hợp đồng dạng của tam giác vuông.
- Định lí Pythagore: tam giác vuông có bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông; định lí đảo.
- Hình đồng dạng phối cảnh (tâm, tỉ số); hình đồng dạng.`,
  formulas: r`\[\triangle A'B'C' \backsim \triangle ABC \Rightarrow \dfrac{A'B'}{AB} = \dfrac{B'C'}{BC} = \dfrac{C'A'}{CA} = k;\qquad \dfrac{P'}{P} = k;\qquad \dfrac{S'}{S} = k^2\]
\[\triangle ABC \text{ vuông tại } A \Leftrightarrow BC^2 = AB^2 + AC^2\]`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 2 (VietJack) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-9a', objectives: 'Củng cố định nghĩa tam giác đồng dạng và ba trường hợp đồng dạng của hai tam giác; tính độ dài, chứng minh hệ thức.' },
    { slug: 'luyen-tap-chung-9b', objectives: 'Củng cố định lí Pythagore, các trường hợp đồng dạng của tam giác vuông và hình đồng dạng; bài toán thực tế.' },
    { slug: 'bai-tap-cuoi-chuong-9', objectives: 'Ôn tập toàn Chương IX: tam giác đồng dạng, định lí Pythagore, hình đồng dạng; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 33 ----------------
    {
      slug: 'bai-33-hai-tam-giac-dong-dang',
      difficulty: 2,
      objectives: `- Mô tả định nghĩa hai tam giác đồng dạng, tỉ số đồng dạng.
- Nhận biết tính chất của hai tam giác đồng dạng; định lí về đường thẳng song song với một cạnh của tam giác.
- Tính độ dài, chứng minh đẳng thức đơn giản và giải bài toán thực tế bằng tam giác đồng dạng.`,
      prerequisites: '- Định lí Thalès, hệ quả của định lí Thalès (Chương IV).\n- Tam giác bằng nhau (Toán 7); tỉ lệ thức (Toán 7).',
      concepts: r`Hai tam giác đồng dạng, kí hiệu \(\triangle A'B'C' \backsim \triangle ABC\); tỉ số đồng dạng \(k\); các đỉnh, góc, cạnh tương ứng.`,
      properties: r`- \(\triangle A'B'C' \backsim \triangle ABC\) nếu \(\widehat{A'} = \widehat{A}\), \(\widehat{B'} = \widehat{B}\), \(\widehat{C'} = \widehat{C}\) và \(\dfrac{A'B'}{AB} = \dfrac{B'C'}{BC} = \dfrac{C'A'}{CA} = k\).
- Mỗi tam giác đồng dạng với chính nó. Nếu \(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(k\) thì \(\triangle ABC \backsim \triangle A'B'C'\) theo tỉ số \(\dfrac1k\).
- Nếu \(\triangle A''B''C'' \backsim \triangle A'B'C'\) và \(\triangle A'B'C' \backsim \triangle ABC\) thì \(\triangle A''B''C'' \backsim \triangle ABC\).
- Hai tam giác bằng nhau thì đồng dạng với nhau theo tỉ số 1.`,
      theorems: r`Nếu một đường thẳng cắt hai cạnh của một tam giác và song song với cạnh còn lại thì nó tạo thành một tam giác mới đồng dạng với tam giác đã cho: \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)) \(\Rightarrow \triangle AMN \backsim \triangle ABC\). Định lí vẫn đúng khi đường thẳng cắt phần kéo dài hai cạnh của tam giác.`,
      themes: [
        {
          title: 'Định nghĩa và tỉ số đồng dạng',
          description: 'Nhận biết hai tam giác đồng dạng, tỉ số đồng dạng; tính độ dài.',
          types: [
            {
              slug: 'dinh-nghia-ti-so-dong-dang',
              title: 'Nhận biết hai tam giác đồng dạng, tìm tỉ số đồng dạng',
              legacy: ['Chứng minh hai tam giác đồng dạng, tìm tỉ số đồng dạng'],
              levels: [1, 2],
              knowledge: r`Định nghĩa: các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ; tỉ số đồng dạng của \(\triangle A'B'C'\) với \(\triangle ABC\) là \(k = \dfrac{A'B'}{AB}\).`,
              signs: 'Đề cho kí hiệu đồng dạng hoặc số đo góc, độ dài cạnh của hai tam giác; hỏi các cặp góc bằng nhau, tỉ lệ thức, tỉ số đồng dạng.',
              method: 'Đọc các cặp đỉnh tương ứng theo đúng thứ tự trong kí hiệu, suy ra các cặp góc bằng nhau và các tỉ số cạnh bằng nhau.',
              steps: r`- **Bước 1.** Xác định các cặp đỉnh tương ứng (cùng vị trí trong kí hiệu).
- **Bước 2.** Viết các cặp góc bằng nhau và dãy tỉ số cạnh tương ứng.
- **Bước 3.** Tính tỉ số đồng dạng \(k\) từ một cặp cạnh đã biết (chú ý chiều so sánh).`,
              mistakes: r`- Viết sai thứ tự đỉnh tương ứng trong kí hiệu.
- Nhầm tỉ số \(k\) của \(\triangle A'B'C'\) với \(\triangle ABC\) và tỉ số \(\dfrac1k\) của \(\triangle ABC\) với \(\triangle A'B'C'\).`,
              example: r`Cho \(\triangle MNP \backsim \triangle ABC\) theo tỉ số \(\dfrac23\). Viết các cặp góc bằng nhau, dãy tỉ số cạnh tương ứng. Tam giác \(ABC\) đồng dạng với tam giác \(MNP\) theo tỉ số nào?`,
              solution: r`\(\widehat{M} = \widehat{A}\), \(\widehat{N} = \widehat{B}\), \(\widehat{P} = \widehat{C}\); \(\dfrac{MN}{AB} = \dfrac{NP}{BC} = \dfrac{PM}{CA} = \dfrac23\). Tam giác \(ABC\) đồng dạng với tam giác \(MNP\) theo tỉ số \(\dfrac32\).`,
              exercises: [
                mcq(1, r`Cho \(\triangle ABC \backsim \triangle DEF\). Khẳng định nào sau đây đúng?`, [r`\(\widehat{B} = \widehat{E}\)`, r`\(\widehat{B} = \widehat{F}\)`, r`\(\dfrac{AB}{DE} = \dfrac{BC}{DF}\)`, r`\(\widehat{A} = \widehat{E}\)`], 'A', r`Đỉnh \(B\) tương ứng với đỉnh \(E\) nên \(\widehat{B} = \widehat{E}\).`),
                sa(2, r`Cho \(\triangle ABC \backsim \triangle A'B'C'\) theo tỉ số đồng dạng \(k = \dfrac35\). Tam giác \(A'B'C'\) đồng dạng với tam giác \(ABC\) theo tỉ số nào? (viết dưới dạng phân số)`, ['5/3'], r`Tỉ số đồng dạng ngược lại là \(\dfrac1k = \dfrac53\).`),
                tf(2, r`Cho \(\triangle MNP \backsim \triangle HIK\) với \(MN = 3\) cm, \(HI = 6\) cm. Mỗi khẳng định sau đúng hay sai?`, [
                  [r`Tỉ số đồng dạng của \(\triangle MNP\) với \(\triangle HIK\) là \(\dfrac12\).`, true],
                  [r`\(\widehat{N} = \widehat{K}\).`, false],
                  [r`\(\dfrac{NP}{IK} = \dfrac12\).`, true],
                  [r`\(\triangle HIK \backsim \triangle MNP\) theo tỉ số 2.`, true],
                ], r`\(k = \dfrac{MN}{HI} = \dfrac12\). Đỉnh \(N\) tương ứng với \(I\) nên \(\widehat{N} = \widehat{I}\), ý b sai. Các ý còn lại đúng.`),
              ],
            },
            {
              slug: 'tinh-do-dai-qua-dong-dang',
              title: 'Tính độ dài cạnh qua tam giác đồng dạng',
              levels: [2, 3],
              knowledge: r`Nếu \(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(k\) thì \(A'B' = k\cdot AB\), \(B'C' = k\cdot BC\), \(C'A' = k\cdot CA\).`,
              signs: 'Đề cho hai tam giác đồng dạng và độ dài một số cạnh, yêu cầu tính các cạnh còn lại.',
              method: 'Ghép đúng các cặp cạnh tương ứng, tìm tỉ số đồng dạng rồi tính các cạnh chưa biết bằng tỉ lệ thức.',
              steps: `- **Bước 1.** Viết dãy tỉ số các cạnh tương ứng.
- **Bước 2.** Thay các số đã biết, tìm tỉ số đồng dạng k.
- **Bước 3.** Tính cạnh chưa biết.`,
              mistakes: '- Ghép sai cặp cạnh tương ứng (cạnh nhỏ nhất của tam giác này phải ứng với cạnh nhỏ nhất của tam giác kia).',
              example: r`Cho \(\triangle ABC \backsim \triangle DEF\) có \(AB = 4\) cm, \(BC = 6\) cm, \(CA = 5\) cm và \(DE = 6\) cm. Tính \(EF\), \(FD\).`,
              solution: r`\(k = \dfrac{DE}{AB} = \dfrac64 = \dfrac32\). Suy ra \(EF = \dfrac32\cdot6 = 9\) cm, \(FD = \dfrac32\cdot5 = 7{,}5\) cm.`,
              exercises: [
                sa(2, r`Cho \(\triangle ABC \backsim \triangle MNP\) có \(AB = 6\) cm, \(BC = 9\) cm, \(MN = 4\) cm. Tính \(NP\).`, ['6'], r`\(\dfrac{MN}{AB} = \dfrac{NP}{BC} \Rightarrow NP = \dfrac{4\cdot9}{6} = 6\) cm.`, 'cm'),
                sa(3, r`Cho \(\triangle ABC \backsim \triangle DEF\) có \(AB = 3\) cm, \(BC = 5\) cm, \(CA = 4\) cm và cạnh lớn nhất của tam giác \(DEF\) dài 15 cm. Tính độ dài cạnh nhỏ nhất của tam giác \(DEF\).`, ['9'], r`Cạnh lớn nhất \(BC = 5\) ứng với \(EF = 15\) nên \(k = 3\). Cạnh nhỏ nhất \(DE = 3\cdot3 = 9\) cm.`, 'cm'),
              ],
            },
          ],
        },
        {
          title: 'Định lí về tam giác đồng dạng tạo bởi đường thẳng song song',
          description: 'Đường thẳng song song với một cạnh; chứng minh đẳng thức.',
          types: [
            {
              slug: 'dong-dang-tu-duong-song-song',
              title: 'Chứng minh tam giác đồng dạng nhờ đường thẳng song song với một cạnh',
              levels: [2, 3],
              knowledge: r`\(MN \parallel BC\), \(M \in AB\), \(N \in AC\) \(\Rightarrow \triangle AMN \backsim \triangle ABC\); suy ra \(\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}\).`,
              signs: 'Hình có một đường thẳng song song với một cạnh của tam giác; yêu cầu chứng minh đồng dạng, tính độ dài.',
              method: 'Chỉ ra đường thẳng song song với một cạnh, áp dụng định lí, viết đúng thứ tự đỉnh tương ứng rồi lập tỉ lệ thức.',
              steps: r`- **Bước 1.** Chỉ ra \(MN \parallel BC\) (\(M\) thuộc \(AB\), \(N\) thuộc \(AC\)).
- **Bước 2.** Kết luận \(\triangle AMN \backsim \triangle ABC\).
- **Bước 3.** Lập tỉ lệ thức \(\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}\) để tính.`,
              mistakes: r`- Viết \(\triangle AMN \backsim \triangle ACB\) (sai thứ tự đỉnh).
- Lập tỉ số \(\dfrac{AM}{MB} = \dfrac{MN}{BC}\) (sai: phải là \(\dfrac{AM}{AB}\)).`,
              example: r`Cho tam giác \(ABC\), \(M\) thuộc \(AB\), \(N\) thuộc \(AC\) sao cho \(MN \parallel BC\). Biết \(AM = 2\) cm, \(MB = 4\) cm, \(BC = 9\) cm. Tính \(MN\).`,
              solution: r`\(MN \parallel BC\) nên \(\triangle AMN \backsim \triangle ABC\), suy ra \(\dfrac{MN}{BC} = \dfrac{AM}{AB} = \dfrac{2}{6} = \dfrac13\). Vậy \(MN = 3\) cm.`,
              exercises: [
                sa(2, r`Cho tam giác \(ABC\), điểm \(M\) thuộc \(AB\), \(N\) thuộc \(AC\) sao cho \(MN \parallel BC\). Biết \(AM = 3\) cm, \(AB = 9\) cm, \(BC = 12\) cm. Tính \(MN\).`, ['4'], r`\(\dfrac{MN}{BC} = \dfrac{AM}{AB} = \dfrac13\) nên \(MN = 4\) cm.`, 'cm'),
                ge(3, r`Cho tam giác \(ABC\) có \(AB = 8\) cm, \(AC = 10\) cm. Trên cạnh \(AB\) lấy điểm \(D\) sao cho \(AD = 6\) cm; qua \(D\) kẻ đường thẳng song song với \(BC\), cắt \(AC\) tại \(E\). a) Chứng minh \(\triangle ADE \backsim \triangle ABC\). b) Tính \(AE\).`, `A(2,5) B(0,0) C(7,0) D(0.5,1.25) E(5.75,1.25)
AB BC CA DE`, r`a) \(DE \parallel BC\), \(D \in AB\), \(E \in AC\) nên \(\triangle ADE \backsim \triangle ABC\).
b) \(\dfrac{AE}{AC} = \dfrac{AD}{AB} = \dfrac68 = \dfrac34\), suy ra \(AE = \dfrac34\cdot10 = 7{,}5\) cm.`),
              ],
            },
            {
              slug: 'chung-minh-dang-thuc-dong-dang',
              title: 'Chứng minh đẳng thức',
              levels: [3, 4],
              knowledge: r`Từ hai tam giác đồng dạng suy ra tỉ lệ thức giữa các cạnh tương ứng; \(\dfrac{a}{b} = \dfrac{c}{d} \Leftrightarrow ad = bc\).`,
              signs: 'Đề yêu cầu chứng minh đẳng thức tích của các đoạn thẳng hoặc tỉ lệ thức, trong hình có các đường thẳng song song.',
              method: 'Đưa đẳng thức tích về tỉ lệ thức; tìm hai tam giác chứa các đoạn thẳng đó và chứng minh chúng đồng dạng.',
              steps: `- **Bước 1.** Viết đẳng thức cần chứng minh dưới dạng tỉ lệ thức.
- **Bước 2.** Chọn hai tam giác có các cạnh nằm trong tỉ lệ thức, chứng minh chúng đồng dạng.
- **Bước 3.** Suy ra tỉ lệ thức, biến đổi về đẳng thức cần chứng minh.`,
              mistakes: '- Chọn hai tam giác mà các cạnh không tương ứng.\n- Viết sai thứ tự đỉnh dẫn đến tỉ lệ thức sai.',
              example: r`Cho tam giác \(ABC\), đường thẳng song song với \(BC\) cắt \(AB\), \(AC\) lần lượt tại \(M\), \(N\). Chứng minh \(AM\cdot AC = AN\cdot AB\).`,
              solution: r`\(MN \parallel BC\) nên \(\triangle AMN \backsim \triangle ABC\), suy ra \(\dfrac{AM}{AB} = \dfrac{AN}{AC}\), do đó \(AM\cdot AC = AN\cdot AB\).`,
              exercises: [
                ge(3, r`Cho hình thang \(ABCD\) (\(AB \parallel CD\)), hai đường chéo cắt nhau tại \(O\). Chứng minh \(OA\cdot OD = OB\cdot OC\).`, `D(0,0) C(6,0) B(4,3) A(1,3) O(2.67,2)
AB BC CD DA AC BD`, r`Trong tam giác \(OCD\), đường thẳng \(AB \parallel CD\) cắt phần kéo dài của hai cạnh \(OC\), \(OD\) tại \(A\), \(B\) nên \(\triangle OAB \backsim \triangle OCD\).
Suy ra \(\dfrac{OA}{OC} = \dfrac{OB}{OD}\), do đó \(OA\cdot OD = OB\cdot OC\).`),
                es(4, r`Cho tam giác \(ABC\), điểm \(M\) thuộc cạnh \(BC\). Qua \(M\) kẻ đường thẳng song song với \(AB\) cắt \(AC\) tại \(N\) và đường thẳng song song với \(AC\) cắt \(AB\) tại \(P\). Chứng minh \(\dfrac{AP}{AB} + \dfrac{AN}{AC} = 1\).`, r`\(MP \parallel AC\) nên \(\triangle BPM \backsim \triangle BAC\), suy ra \(\dfrac{BP}{BA} = \dfrac{BM}{BC}\), do đó \(\dfrac{AP}{AB} = 1 - \dfrac{BP}{AB} = 1 - \dfrac{BM}{BC} = \dfrac{CM}{BC}\).
\(MN \parallel AB\) nên \(\triangle CNM \backsim \triangle CAB\), suy ra \(\dfrac{CN}{CA} = \dfrac{CM}{CB}\), do đó \(\dfrac{AN}{AC} = 1 - \dfrac{CM}{BC} = \dfrac{BM}{BC}\).
Cộng lại: \(\dfrac{AP}{AB} + \dfrac{AN}{AC} = \dfrac{CM + BM}{BC} = 1\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng thực tế',
          description: 'Đo khoảng cách gián tiếp nhờ đường thẳng song song.',
          types: [
            {
              slug: 'thuc-te-tam-giac-dong-dang',
              title: 'Bài toán thực tế về tam giác đồng dạng',
              legacy: ['Toán thực tế'],
              levels: [3],
              knowledge: 'Định lí về đường thẳng song song với một cạnh của tam giác; tỉ số các cạnh tương ứng của hai tam giác đồng dạng.',
              signs: 'Đo khoảng cách giữa hai điểm không đến được (qua ao, hồ), kích thước các vật có thanh ngang song song với cạnh đáy.',
              method: 'Mô hình hóa bằng tam giác có một đường thẳng song song với một cạnh, lập tỉ lệ thức để tính đại lượng cần tìm.',
              steps: `- **Bước 1.** Vẽ hình mô tả, xác định hai tam giác đồng dạng.
- **Bước 2.** Lập tỉ lệ thức giữa các cạnh tương ứng.
- **Bước 3.** Tính, trả lời kèm đơn vị.`,
              mistakes: '- Lập tỉ số giữa các cạnh không tương ứng (dùng MB thay cho AB).\n- Quên đổi đơn vị.',
              example: 'Để đo khoảng cách BC giữa hai điểm ở hai bên một cái hồ, người ta chọn điểm A, rồi xác định M trên đoạn AB, N trên đoạn AC sao cho MN ∥ BC. Đo được AM = 10 m, AB = 40 m, MN = 12 m. Tính BC.',
              solution: r`\(MN \parallel BC\) nên \(\triangle AMN \backsim \triangle ABC\), suy ra \(\dfrac{MN}{BC} = \dfrac{AM}{AB} = \dfrac14\). Vậy \(BC = 4\cdot12 = 48\) m.`,
              exercises: [
                sa(3, r`Để đo khoảng cách \(BC\) giữa hai điểm ở hai bờ một cái ao, người ta chọn điểm \(A\) ở ngoài ao, lấy \(M\) trên đoạn \(AB\) và \(N\) trên đoạn \(AC\) sao cho \(MN \parallel BC\). Đo được \(AM = 15\) m, \(MB = 30\) m, \(MN = 18\) m. Tính \(BC\).`, ['54'], r`\(AB = 45\) m. \(\dfrac{MN}{BC} = \dfrac{AM}{AB} = \dfrac13\) nên \(BC = 54\) m.`, 'm'),
                sa(3, r`Một chiếc thang chữ A có hai chân \(AB = AC = 3\) m. Thanh ngang \(DE\) song song với mặt đất \(BC\) (\(D\) thuộc \(AB\), \(E\) thuộc \(AC\)), \(AD = 1\) m, \(DE = 0{,}6\) m. Tính khoảng cách \(BC\) giữa hai chân thang.`, ['1,8'], r`\(\triangle ADE \backsim \triangle ABC\) nên \(\dfrac{DE}{BC} = \dfrac{AD}{AB} = \dfrac13\), suy ra \(BC = 1{,}8\) m.`, 'm'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 34 ----------------
    {
      slug: 'bai-34-ba-truong-hop-dong-dang-cua-hai-tam-giac',
      difficulty: 3,
      objectives: `- Giải thích các trường hợp đồng dạng của hai tam giác: cạnh – cạnh – cạnh, cạnh – góc – cạnh, góc – góc.
- Vận dụng chứng minh hai tam giác đồng dạng; tính độ dài, tỉ số chu vi; chứng minh hệ thức, góc bằng nhau; giải bài toán thực tế.`,
      prerequisites: '- Hai tam giác đồng dạng, định lí về đường thẳng song song với một cạnh (Bài 33).\n- Tổng ba góc trong tam giác, các trường hợp bằng nhau của tam giác (Toán 7).',
      concepts: 'Trường hợp đồng dạng cạnh – cạnh – cạnh (c.c.c), cạnh – góc – cạnh (c.g.c), góc – góc (g.g).',
      theorems: r`- **c.c.c:** Nếu ba cạnh của tam giác này tỉ lệ với ba cạnh của tam giác kia thì hai tam giác đó đồng dạng.
- **c.g.c:** Nếu hai cạnh của tam giác này tỉ lệ với hai cạnh của tam giác kia và hai góc tạo bởi các cặp cạnh đó bằng nhau thì hai tam giác đó đồng dạng.
- **g.g:** Nếu hai góc của tam giác này lần lượt bằng hai góc của tam giác kia thì hai tam giác đó đồng dạng.`,
      properties: r`Nếu \(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(k\) thì tỉ số chu vi của hai tam giác cũng bằng \(k\).`,
      themes: [
        {
          title: 'Các trường hợp đồng dạng',
          description: 'Chứng minh hai tam giác đồng dạng theo c.c.c, c.g.c, g.g.',
          types: [
            {
              slug: 'dong-dang-ccc',
              title: 'Chứng minh đồng dạng theo trường hợp cạnh – cạnh – cạnh',
              levels: [1, 2],
              knowledge: r`\(\dfrac{A'B'}{AB} = \dfrac{B'C'}{BC} = \dfrac{C'A'}{CA} \Rightarrow \triangle A'B'C' \backsim \triangle ABC\) (c.c.c).`,
              signs: 'Đề cho độ dài ba cạnh của mỗi tam giác, không cho góc.',
              method: 'Sắp xếp ba cạnh của mỗi tam giác theo thứ tự tăng dần, lập ba tỉ số tương ứng và so sánh.',
              steps: `- **Bước 1.** Sắp xếp các cạnh của mỗi tam giác theo thứ tự nhỏ – vừa – lớn.
- **Bước 2.** Lập ba tỉ số các cạnh tương ứng và so sánh.
- **Bước 3.** Ba tỉ số bằng nhau thì hai tam giác đồng dạng; xác định đỉnh tương ứng (đỉnh chung của hai cạnh tương ứng) và viết kí hiệu.`,
              mistakes: '- Ghép cạnh theo thứ tự tên gọi mà không theo độ lớn.\n- Viết sai thứ tự đỉnh tương ứng.',
              example: r`Cho \(\triangle ABC\) có \(AB = 4\) cm, \(BC = 5\) cm, \(CA = 6\) cm và \(\triangle DEF\) có \(DE = 10\) cm, \(EF = 12\) cm, \(FD = 8\) cm. Hai tam giác có đồng dạng không? Viết kí hiệu.`,
              solution: r`Sắp xếp: \(AB = 4 < BC = 5 < CA = 6\); \(FD = 8 < DE = 10 < EF = 12\). \(\dfrac{FD}{AB} = \dfrac{DE}{BC} = \dfrac{EF}{CA} = 2\) nên hai tam giác đồng dạng (c.c.c).
Đỉnh \(B\) (chung của \(AB\), \(BC\)) ứng với \(D\) (chung của \(FD\), \(DE\)); \(A\) ứng với \(F\); \(C\) ứng với \(E\). Vậy \(\triangle FDE \backsim \triangle ABC\).`,
              exercises: [
                mcq(1, 'Bộ ba độ dài nào sau đây là độ dài ba cạnh của một tam giác đồng dạng với tam giác có độ dài các cạnh 3 cm, 4 cm, 5 cm?', ['6 cm, 8 cm, 10 cm', '6 cm, 8 cm, 9 cm', '4 cm, 5 cm, 6 cm', '3 cm, 5 cm, 7 cm'], 'A', r`\(\dfrac63 = \dfrac84 = \dfrac{10}{5} = 2\).`),
                tf(2, r`Cho \(\triangle ABC\) có \(AB = 2\) cm, \(BC = 3\) cm, \(CA = 4\) cm và \(\triangle MNP\) có \(MN = 6\) cm, \(NP = 8\) cm, \(PM = 4\) cm. Mỗi khẳng định sau đúng hay sai?`, [
                  ['Hai tam giác đồng dạng, tỉ số đồng dạng của tam giác ABC với tam giác MNP là 1/2.', true],
                  [r`\(\triangle ABC \backsim \triangle MNP\).`, false],
                  [r`\(\triangle ABC \backsim \triangle PMN\).`, true],
                  [r`\(\widehat{B} = \widehat{N}\).`, false],
                ], r`\(\dfrac{AB}{PM} = \dfrac{BC}{MN} = \dfrac{CA}{NP} = \dfrac12\). Đỉnh tương ứng: \(A \leftrightarrow P\), \(B \leftrightarrow M\), \(C \leftrightarrow N\). Vậy \(\triangle ABC \backsim \triangle PMN\) và \(\widehat{B} = \widehat{M}\).`),
              ],
            },
            {
              slug: 'dong-dang-cgc',
              title: 'Chứng minh đồng dạng theo trường hợp cạnh – góc – cạnh',
              levels: [2, 3],
              knowledge: r`\(\dfrac{A'B'}{AB} = \dfrac{A'C'}{AC}\) và \(\widehat{A'} = \widehat{A}\) \(\Rightarrow \triangle A'B'C' \backsim \triangle ABC\) (c.g.c).`,
              signs: 'Đề cho hai cặp cạnh và góc xen giữa; thường hai tam giác có chung một góc hoặc có hai góc đối đỉnh.',
              method: 'Chỉ ra cặp góc bằng nhau, lập tỉ số hai cặp cạnh kề với hai góc đó và so sánh.',
              steps: `- **Bước 1.** Chỉ ra hai góc bằng nhau (góc chung, góc đối đỉnh…).
- **Bước 2.** Lập tỉ số hai cặp cạnh kề với hai góc đó (ghép cạnh nhỏ với cạnh nhỏ).
- **Bước 3.** Kết luận đồng dạng (c.g.c), viết đúng thứ tự đỉnh.`,
              mistakes: '- Góc bằng nhau không xen giữa hai cặp cạnh tỉ lệ.\n- Ghép tỉ số sai cặp cạnh (không để ý thứ tự "chéo").',
              example: r`Cho tam giác \(ABC\) có \(AB = 8\) cm, \(AC = 12\) cm, \(BC = 10\) cm. Trên \(AB\) lấy \(D\) sao cho \(AD = 6\) cm, trên \(AC\) lấy \(E\) sao cho \(AE = 4\) cm. Chứng minh \(\triangle AED \backsim \triangle ABC\) và tính \(DE\).`,
              solution: r`\(\dfrac{AE}{AB} = \dfrac48 = \dfrac12\), \(\dfrac{AD}{AC} = \dfrac{6}{12} = \dfrac12\), \(\widehat{A}\) chung, nên \(\triangle AED \backsim \triangle ABC\) (c.g.c).
Suy ra \(\dfrac{ED}{BC} = \dfrac12\), do đó \(DE = 5\) cm.`,
              exercises: [
                sa(2, r`Cho \(\triangle ABC\) và \(\triangle DEF\) có \(\widehat{A} = \widehat{D}\), \(AB = 4\) cm, \(AC = 6\) cm, \(DE = 6\) cm. Cần \(DF\) bằng bao nhiêu xăng-ti-mét để \(\triangle ABC \backsim \triangle DEF\)?`, ['9'], r`Cần \(\dfrac{DE}{AB} = \dfrac{DF}{AC}\), tức là \(\dfrac64 = \dfrac{DF}{6}\), suy ra \(DF = 9\) cm.`, 'cm'),
                ge(3, r`Cho tam giác \(ABC\) có \(AB = 12\) cm, \(AC = 15\) cm, \(BC = 18\) cm. Trên cạnh \(AB\) lấy điểm \(M\) sao cho \(AM = 10\) cm, trên cạnh \(AC\) lấy điểm \(N\) sao cho \(AN = 8\) cm. a) Chứng minh \(\triangle ANM \backsim \triangle ABC\). b) Tính \(MN\).`, `A(2.25,3.31) B(0,0) C(6,0) M(0.38,0.55) N(4.25,1.54)
AB BC CA MN`, r`a) \(\dfrac{AN}{AB} = \dfrac{8}{12} = \dfrac23\), \(\dfrac{AM}{AC} = \dfrac{10}{15} = \dfrac23\) và \(\widehat{A}\) chung nên \(\triangle ANM \backsim \triangle ABC\) (c.g.c).
b) \(\dfrac{NM}{BC} = \dfrac23\), suy ra \(MN = \dfrac23\cdot18 = 12\) cm.`),
              ],
            },
            {
              slug: 'dong-dang-gg',
              title: 'Chứng minh đồng dạng theo trường hợp góc – góc',
              legacy: ['Chứng minh hai tam giác đồng dạng'],
              levels: [2, 3],
              knowledge: r`\(\widehat{A'} = \widehat{A}\), \(\widehat{B'} = \widehat{B}\) \(\Rightarrow \triangle A'B'C' \backsim \triangle ABC\) (g.g); tổng ba góc của tam giác bằng \(180^\circ\); góc đối đỉnh, góc so le trong, góc đồng vị.`,
              signs: 'Đề cho số đo góc, góc chung, góc đối đỉnh, đường thẳng song song, đường cao (góc vuông).',
              method: 'Tìm hai cặp góc bằng nhau (có thể tính góc thứ ba từ tổng ba góc), kết luận đồng dạng (g.g).',
              steps: `- **Bước 1.** Tìm cặp góc bằng nhau thứ nhất (thường là góc chung hoặc góc đối đỉnh).
- **Bước 2.** Tìm cặp góc bằng nhau thứ hai (giả thiết, song song, góc vuông, tính toán).
- **Bước 3.** Kết luận đồng dạng (g.g), viết đúng thứ tự đỉnh.`,
              mistakes: '- Viết sai thứ tự đỉnh tương ứng.\n- Chỉ dựa vào một cặp góc bằng nhau.',
              example: r`Tam giác \(ABC\) có \(\widehat{A} = 60^\circ\), \(\widehat{B} = 50^\circ\); tam giác \(DEF\) có \(\widehat{D} = 60^\circ\), \(\widehat{F} = 70^\circ\). Chứng minh hai tam giác đồng dạng.`,
              solution: r`\(\widehat{C} = 180^\circ - 60^\circ - 50^\circ = 70^\circ\). Ta có \(\widehat{A} = \widehat{D}\), \(\widehat{C} = \widehat{F}\) nên \(\triangle ABC \backsim \triangle DEF\) (g.g).`,
              exercises: [
                mcq(2, r`Tam giác \(ABC\) có \(\widehat{A} = 70^\circ\), \(\widehat{B} = 60^\circ\). Tam giác \(MNP\) nào sau đây đồng dạng với tam giác \(ABC\)?`, [r`\(\widehat{M} = 70^\circ\), \(\widehat{P} = 50^\circ\)`, r`\(\widehat{M} = 60^\circ\), \(\widehat{N} = 40^\circ\)`, r`\(\widehat{M} = 70^\circ\), \(\widehat{N} = 70^\circ\)`, r`\(\widehat{N} = 80^\circ\), \(\widehat{P} = 30^\circ\)`], 'A', r`\(\widehat{C} = 180^\circ - 70^\circ - 60^\circ = 50^\circ\). Tam giác \(MNP\) có \(\widehat{M} = 70^\circ = \widehat{A}\), \(\widehat{P} = 50^\circ = \widehat{C}\) nên \(\triangle ABC \backsim \triangle MNP\) (g.g).`),
                sa(3, r`Cho hình thang \(ABCD\) (\(AB \parallel CD\)) có \(AB = 4\) cm, \(CD = 10\) cm; hai đường chéo cắt nhau tại \(O\). Biết \(OA = 2\) cm, tính \(OC\).`, ['5'], r`\(\widehat{OAB} = \widehat{OCD}\), \(\widehat{OBA} = \widehat{ODC}\) (so le trong) nên \(\triangle OAB \backsim \triangle OCD\) (g.g). \(\dfrac{OA}{OC} = \dfrac{AB}{CD} = \dfrac{4}{10}\), suy ra \(OC = 5\) cm.`, 'cm'),
                ge(3, r`Cho tam giác nhọn \(ABC\), hai đường cao \(BD\) và \(CE\) cắt nhau tại \(H\). Chứng minh \(\triangle ABD \backsim \triangle ACE\) và \(AD\cdot AC = AE\cdot AB\).`, `A(2.5,5) B(0,0) C(6,0) D(4.03,2.82) E(1.2,2.4) H(2.5,1.75)
AB BC CA BD CE
vuong(B,D,A) vuong(C,E,A)`, r`Xét \(\triangle ABD\) và \(\triangle ACE\): \(\widehat{A}\) chung, \(\widehat{ADB} = \widehat{AEC} = 90^\circ\) nên \(\triangle ABD \backsim \triangle ACE\) (g.g).
Suy ra \(\dfrac{AB}{AC} = \dfrac{AD}{AE}\), do đó \(AD\cdot AC = AE\cdot AB\).`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng các trường hợp đồng dạng',
          description: 'Tỉ số đoạn thẳng, chu vi; hệ thức, góc bằng nhau; bài toán thực tế.',
          types: [
            {
              slug: 'ti-so-doan-thang-chu-vi',
              title: 'Tỉ số đoạn thẳng, tỉ số chu vi của hai tam giác đồng dạng',
              legacy: ['Tỉ số đoạn thẳng, tỉ số chu vi, tỉ số diện tích'],
              levels: [2, 3],
              knowledge: r`Nếu \(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(k\) thì tỉ số hai cạnh tương ứng bất kì và tỉ số hai chu vi đều bằng \(k\).`,
              signs: 'Đề cho hai tam giác đồng dạng (hoặc chứng minh được), hỏi tỉ số chu vi, chu vi của một tam giác, hoặc độ dài cạnh khi biết tổng, hiệu.',
              method: 'Tìm tỉ số đồng dạng k từ một cặp cạnh tương ứng; tỉ số chu vi bằng k; dùng tính chất dãy tỉ số bằng nhau khi biết tổng, hiệu.',
              steps: r`- **Bước 1.** Xác định hai tam giác đồng dạng và tỉ số \(k\).
- **Bước 2.** Áp dụng \(\dfrac{P'}{P} = k\) hoặc tính chất dãy tỉ số bằng nhau.
- **Bước 3.** Tính đại lượng cần tìm.`,
              mistakes: r`- Lấy tỉ số chu vi bằng \(k^2\).
- Xác định \(k\) ngược chiều.`,
              example: r`Cho \(\triangle A'B'C' \backsim \triangle ABC\), \(A'B' = 3\) cm, \(AB = 6\) cm, chu vi tam giác \(ABC\) bằng 24 cm. Tính chu vi tam giác \(A'B'C'\).`,
              solution: r`\(k = \dfrac{A'B'}{AB} = \dfrac12\). Chu vi tam giác \(A'B'C'\) bằng \(\dfrac12\cdot24 = 12\) cm.`,
              exercises: [
                mcq(2, r`Cho \(\triangle ABC \backsim \triangle MNP\) có \(AB = 3\) cm, \(MN = 6\) cm. Tỉ số chu vi của tam giác \(ABC\) và tam giác \(MNP\) là`, [r`\(\dfrac12\)`, r`\(2\)`, r`\(\dfrac14\)`, r`\(4\)`], 'A', r`Tỉ số chu vi bằng tỉ số đồng dạng \(\dfrac{AB}{MN} = \dfrac12\).`),
                sa(2, r`Cho \(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(k = \dfrac23\). Chu vi tam giác \(ABC\) là 30 cm. Tính chu vi tam giác \(A'B'C'\).`, ['20'], r`\(P' = \dfrac23\cdot30 = 20\) cm.`, 'cm'),
                sa(3, r`Hai tam giác đồng dạng có tỉ số chu vi bằng \(\dfrac35\). Hiệu độ dài hai cạnh tương ứng của chúng là 6 cm. Tính độ dài cạnh lớn hơn trong hai cạnh đó.`, ['15'], r`Hai cạnh tương ứng là \(3t\) và \(5t\); \(5t - 3t = 6 \Leftrightarrow t = 3\). Cạnh lớn hơn dài 15 cm.`, 'cm'),
              ],
            },
            {
              slug: 'he-thuc-canh-goc-bang-nhau',
              title: 'Chứng minh hệ thức về cạnh, góc bằng nhau',
              levels: [3, 4],
              knowledge: 'Hai tam giác đồng dạng có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.',
              signs: 'Đề yêu cầu chứng minh hai góc bằng nhau, đẳng thức dạng AB² = AD·AC, hoặc tỉ lệ thức bằng cách dùng tam giác đồng dạng.',
              method: 'Chọn cặp tam giác chứa các góc, cạnh cần xét; chứng minh chúng đồng dạng (thường c.g.c từ tỉ lệ thức hoặc g.g), rồi suy ra điều phải chứng minh.',
              steps: `- **Bước 1.** Phân tích kết luận: cần tỉ lệ thức nào, cặp góc nào.
- **Bước 2.** Chứng minh hai tam giác chứa chúng đồng dạng.
- **Bước 3.** Suy ra điều phải chứng minh.`,
              mistakes: '- Dùng chính điều cần chứng minh làm giả thiết.\n- Ghép sai đỉnh tương ứng nên suy ra sai cặp góc.',
              example: r`Cho tam giác \(ABC\), điểm \(D\) thuộc cạnh \(AC\) sao cho \(\widehat{ABD} = \widehat{ACB}\). Chứng minh \(AB^2 = AD\cdot AC\).`,
              solution: r`Xét \(\triangle ABD\) và \(\triangle ACB\): \(\widehat{A}\) chung, \(\widehat{ABD} = \widehat{ACB}\) nên \(\triangle ABD \backsim \triangle ACB\) (g.g). Suy ra \(\dfrac{AB}{AC} = \dfrac{AD}{AB}\), do đó \(AB^2 = AD\cdot AC\).`,
              exercises: [
                sa(3, r`Cho tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 9\) cm. Điểm \(D\) thuộc cạnh \(AC\) sao cho \(\widehat{ABD} = \widehat{ACB}\). Tính \(AD\).`, ['4'], r`\(\triangle ABD \backsim \triangle ACB\) (g.g) nên \(AB^2 = AD\cdot AC\), suy ra \(AD = \dfrac{36}{9} = 4\) cm.`, 'cm'),
                ge(4, r`Cho tam giác \(ABC\) có \(AB = 4\) cm, \(AC = 8\) cm. Trên cạnh \(AC\) lấy điểm \(D\) sao cho \(AD = 2\) cm. Chứng minh \(\widehat{ABD} = \widehat{ACB}\).`, `A(0,0) B(1.2,2.75) C(6,0) D(1.5,0)
AB BC CA BD`, r`\(\dfrac{AD}{AB} = \dfrac24 = \dfrac12\), \(\dfrac{AB}{AC} = \dfrac48 = \dfrac12\) và \(\widehat{A}\) chung nên \(\triangle ADB \backsim \triangle ABC\) (c.g.c), với \(D\) ứng với \(B\), \(B\) ứng với \(C\).
Suy ra \(\widehat{ABD} = \widehat{ACB}\).`),
              ],
            },
            {
              slug: 'thuc-te-truong-hop-dong-dang',
              title: 'Bài toán thực tế vận dụng các trường hợp đồng dạng',
              legacy: ['Toán thực tế'],
              levels: [3],
              knowledge: 'Tia sáng mặt trời song song tạo các góc bằng nhau; góc tới bằng góc phản xạ; trường hợp đồng dạng góc – góc.',
              signs: 'Đo chiều cao bằng bóng nắng, bằng gương phẳng, bằng cọc ngắm; đo khoảng cách gián tiếp.',
              method: 'Chỉ ra hai tam giác có hai cặp góc bằng nhau (g.g), lập tỉ lệ thức giữa các cạnh tương ứng để tính.',
              steps: `- **Bước 1.** Vẽ sơ đồ, đặt tên các điểm.
- **Bước 2.** Chứng minh hai tam giác đồng dạng (thường g.g).
- **Bước 3.** Lập tỉ lệ thức, tính và trả lời.`,
              mistakes: '- Ghép chiều cao của vật này với bóng của vật kia.\n- Quên chiều cao từ mắt người tới mặt đất.',
              example: 'Một cột cờ có bóng trên mặt đất dài 8 m. Cùng thời điểm đó, một chiếc cọc cao 1,5 m cắm vuông góc với mặt đất có bóng dài 2 m. Tính chiều cao của cột cờ.',
              solution: r`Hai tam giác tạo bởi vật, bóng và tia nắng có góc vuông và góc tạo bởi tia nắng với mặt đất bằng nhau nên đồng dạng (g.g). \(\dfrac{h}{1{,}5} = \dfrac{8}{2}\), suy ra \(h = 6\) m.`,
              exercises: [
                sa(3, 'Bóng của một tòa nhà trên mặt đất dài 36 m. Cùng thời điểm đó, một cây cột cao 2 m có bóng dài 3 m. Tính chiều cao của tòa nhà.', ['24'], r`\(\dfrac{h}{2} = \dfrac{36}{3}\), suy ra \(h = 24\) m.`, 'm'),
                sa(3, 'Để đo chiều cao AB của một cây, bạn Nam đặt một chiếc gương nhỏ nằm ngang trên mặt đất tại điểm C cách gốc cây B là 9 m, rồi lùi lại đến điểm E cách gương 1,5 m thì nhìn thấy ngọn cây trong gương. Mắt Nam ở D, cách mặt đất 1,6 m (DE vuông góc với mặt đất). Tính chiều cao của cây, biết góc tới bằng góc phản xạ.', ['9,6'], r`\(\widehat{ACB} = \widehat{DCE}\), \(\widehat{ABC} = \widehat{DEC} = 90^\circ\) nên \(\triangle ABC \backsim \triangle DEC\) (g.g). \(\dfrac{AB}{DE} = \dfrac{BC}{EC}\), suy ra \(AB = \dfrac{1{,}6\cdot9}{1{,}5} = 9{,}6\) m.`, 'm'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 35 ----------------
    {
      slug: 'bai-35-dinh-li-pythagore-va-ung-dung',
      difficulty: 2,
      objectives: `- Giải thích định lí Pythagore và định lí Pythagore đảo.
- Tính độ dài cạnh trong tam giác vuông và các đoạn thẳng trong hình phẳng; nhận biết tam giác vuông.
- Giải quyết bài toán thực tiễn bằng định lí Pythagore.`,
      prerequisites: '- Tam giác vuông, tổng ba góc của tam giác (Toán 7).\n- Bình phương, căn bậc hai số học (Toán 7).',
      concepts: 'Cạnh huyền, cạnh góc vuông; định lí Pythagore; định lí Pythagore đảo.',
      formulas: r`\(\triangle ABC\) vuông tại \(A\): \(BC^2 = AB^2 + AC^2\); \(AB^2 = BC^2 - AC^2\).`,
      theorems: r`- **Định lí Pythagore:** Trong một tam giác vuông, bình phương độ dài cạnh huyền bằng tổng bình phương độ dài hai cạnh góc vuông.
- **Định lí Pythagore đảo:** Nếu một tam giác có bình phương độ dài một cạnh bằng tổng bình phương độ dài hai cạnh kia thì tam giác đó là tam giác vuông.`,
      themes: [
        {
          title: 'Định lí Pythagore',
          description: 'Tính độ dài cạnh tam giác vuông và đoạn thẳng trong hình phẳng.',
          types: [
            {
              slug: 'tinh-canh-tam-giac-vuong',
              title: 'Tính độ dài một cạnh của tam giác vuông',
              levels: [1, 2, 3],
              knowledge: r`\(\triangle ABC\) vuông tại \(A\): \(BC^2 = AB^2 + AC^2\); cạnh góc vuông \(AB^2 = BC^2 - AC^2\).`,
              signs: 'Tam giác vuông biết hai cạnh (hoặc biết tỉ số hai cạnh và một cạnh), yêu cầu tính cạnh còn lại.',
              method: 'Xác định cạnh huyền (đối diện góc vuông), viết hệ thức Pythagore rồi tính.',
              steps: `- **Bước 1.** Xác định góc vuông và cạnh huyền.
- **Bước 2.** Viết hệ thức Pythagore.
- **Bước 3.** Thay số, tính bình phương rồi lấy căn bậc hai số học.`,
              mistakes: '- Nhầm cạnh huyền với cạnh góc vuông (cộng thay vì trừ).\n- Quên lấy căn bậc hai.',
              example: r`a) Tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\) cm, \(AC = 8\) cm. Tính \(BC\).
b) Tam giác \(DEF\) vuông tại \(D\) có \(EF = 13\) cm, \(DE = 5\) cm. Tính \(DF\).`,
              solution: r`a) \(BC^2 = 36 + 64 = 100\), \(BC = 10\) cm.
b) \(DF^2 = 169 - 25 = 144\), \(DF = 12\) cm.`,
              exercises: [
                mcq(1, r`Tam giác \(MNP\) vuông tại \(M\). Khẳng định nào sau đây đúng?`, [r`\(NP^2 = MN^2 + MP^2\)`, r`\(MN^2 = NP^2 + MP^2\)`, r`\(MP^2 = MN^2 + NP^2\)`, r`\(NP = MN + MP\)`], 'A', r`Cạnh huyền là \(NP\) (đối diện góc vuông \(M\)).`),
                sa(2, r`Tam giác \(ABC\) vuông tại \(A\) có \(BC = 17\) cm, \(AB = 8\) cm. Tính \(AC\).`, ['15'], r`\(AC^2 = 289 - 64 = 225\), \(AC = 15\) cm.`, 'cm'),
                sa(3, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB : AC = 3 : 4\) và \(BC = 20\) cm. Tính \(AB\).`, ['12'], r`Đặt \(AB = 3t\), \(AC = 4t\): \(9t^2 + 16t^2 = 400 \Leftrightarrow t^2 = 16 \Leftrightarrow t = 4\). \(AB = 12\) cm.`, 'cm'),
              ],
            },
            {
              slug: 'tinh-do-dai-trong-hinh-phang',
              title: 'Tính độ dài đoạn thẳng trong hình phẳng bằng định lí Pythagore',
              levels: [2, 3, 4],
              knowledge: 'Đường chéo hình chữ nhật; hai đường chéo hình thoi vuông góc tại trung điểm mỗi đường; đường cao của tam giác cân ứng với cạnh đáy đồng thời là đường trung tuyến; đường cao hình thang cân.',
              signs: 'Đề yêu cầu tính đường chéo, đường cao, cạnh của hình chữ nhật, hình thoi, tam giác cân, hình thang cân.',
              method: 'Kẻ thêm đường cao hoặc đường chéo để tạo tam giác vuông chứa đoạn thẳng cần tính, rồi áp dụng định lí Pythagore.',
              steps: `- **Bước 1.** Tìm (hoặc tạo) tam giác vuông chứa đoạn thẳng cần tính.
- **Bước 2.** Tính các cạnh còn lại của tam giác vuông đó từ giả thiết.
- **Bước 3.** Áp dụng định lí Pythagore.`,
              mistakes: '- Quên rằng hai đường chéo hình thoi cắt nhau tại trung điểm mỗi đường (dùng cả đường chéo thay vì một nửa).\n- Kẻ đường cao nhưng không giải thích vì sao chân đường cao chia đáy thành hai phần bằng nhau.',
              example: 'Hình thoi ABCD có hai đường chéo AC = 6 cm, BD = 8 cm. Tính độ dài cạnh của hình thoi.',
              solution: r`Gọi \(O\) là giao điểm hai đường chéo: \(OA = 3\) cm, \(OB = 4\) cm, \(\widehat{AOB} = 90^\circ\). \(AB^2 = 9 + 16 = 25\), \(AB = 5\) cm.`,
              exercises: [
                sa(2, 'Tính độ dài đường chéo của hình chữ nhật có hai kích thước 9 cm và 12 cm.', ['15'], r`\(d^2 = 81 + 144 = 225\), \(d = 15\) cm.`, 'cm'),
                sa(3, r`Tam giác \(ABC\) cân tại \(A\) có \(AB = AC = 10\) cm, \(BC = 12\) cm. Tính độ dài đường cao \(AH\).`, ['8'], r`\(H\) là trung điểm của \(BC\) nên \(BH = 6\) cm. \(AH^2 = 100 - 36 = 64\), \(AH = 8\) cm.`, 'cm'),
                ge(4, r`Cho hình thang cân \(ABCD\) (\(AB \parallel CD\)) có \(AB = 6\) cm, \(CD = 12\) cm, cạnh bên \(AD = 5\) cm. Tính chiều cao và diện tích của hình thang.`, `D(0,0) C(12,0) B(9,4) A(3,4) H(3,0) K(9,0)
AB BC CD DA AH:dash BK:dash
vuong(A,H,D) vuong(B,K,C)`, r`Kẻ \(AH \perp CD\), \(BK \perp CD\). \(\triangle ADH = \triangle BCK\) (cạnh huyền – góc nhọn) nên \(DH = CK = \dfrac{12 - 6}{2} = 3\) cm.
\(AH^2 = AD^2 - DH^2 = 25 - 9 = 16\), \(AH = 4\) cm. Diện tích \(S = \dfrac{(6 + 12)\cdot4}{2} = 36\) cm².`),
              ],
            },
          ],
        },
        {
          title: 'Định lí Pythagore đảo',
          description: 'Nhận biết tam giác vuông từ độ dài ba cạnh.',
          types: [
            {
              slug: 'nhan-biet-tam-giac-vuong',
              title: 'Dùng định lí Pythagore đảo nhận biết tam giác vuông',
              levels: [1, 2],
              knowledge: r`Nếu \(BC^2 = AB^2 + AC^2\) thì tam giác \(ABC\) vuông tại \(A\).`,
              signs: 'Đề cho độ dài ba cạnh, hỏi tam giác có vuông không, vuông tại đỉnh nào.',
              method: 'So sánh bình phương cạnh lớn nhất với tổng bình phương hai cạnh còn lại.',
              steps: `- **Bước 1.** Xác định cạnh lớn nhất.
- **Bước 2.** Tính bình phương cạnh lớn nhất và tổng bình phương hai cạnh kia.
- **Bước 3.** Bằng nhau thì tam giác vuông tại đỉnh đối diện cạnh lớn nhất; khác nhau thì không vuông.`,
              mistakes: '- So sánh với cạnh không phải là cạnh lớn nhất.\n- Xác định sai đỉnh của góc vuông.',
              example: 'Tam giác có độ dài ba cạnh là 7 cm, 24 cm, 25 cm có phải là tam giác vuông không?',
              solution: r`\(25^2 = 625\); \(7^2 + 24^2 = 49 + 576 = 625\). Theo định lí Pythagore đảo, tam giác đó vuông (góc vuông đối diện cạnh 25 cm).`,
              exercises: [
                mcq(1, 'Tam giác có độ dài ba cạnh nào sau đây **không** phải là tam giác vuông?', ['6 cm, 8 cm, 11 cm', '6 cm, 8 cm, 10 cm', '9 cm, 12 cm, 15 cm', '8 cm, 15 cm, 17 cm'], 'A', r`\(6^2 + 8^2 = 100 \ne 11^2 = 121\). Các bộ còn lại: \(6^2 + 8^2 = 10^2\); \(9^2 + 12^2 = 15^2\); \(8^2 + 15^2 = 17^2\).`),
                tf(2, r`Cho tam giác \(ABC\) có \(AB = 9\) cm, \(BC = 15\) cm, \(CA = 12\) cm. Mỗi khẳng định sau đúng hay sai?`, [
                  [r`\(BC^2 = AB^2 + AC^2\).`, true],
                  [r`Tam giác \(ABC\) vuông tại \(B\).`, false],
                  [r`Tam giác \(ABC\) vuông tại \(A\).`, true],
                  ['Diện tích tam giác ABC bằng 54 cm².', true],
                ], r`\(225 = 81 + 144\) nên tam giác vuông tại \(A\) (đối diện cạnh \(BC\)). Diện tích \(\dfrac{9\cdot12}{2} = 54\) cm².`),
              ],
            },
          ],
        },
        {
          title: 'Ứng dụng thực tế',
          description: 'Thang dựa tường, cây gãy, màn hình, khoảng cách.',
          types: [
            {
              slug: 'ung-dung-thuc-te-pythagore',
              title: 'Ứng dụng thực tế của định lí Pythagore',
              legacy: ['Ứng dụng thực tế'],
              levels: [2, 3],
              knowledge: 'Định lí Pythagore trong các tình huống có tam giác vuông: thang dựa tường, cây gãy, đường chéo màn hình, khoảng cách theo hai hướng vuông góc.',
              signs: 'Tình huống thực tế mô tả được bằng một tam giác vuông với hai cạnh đã biết (hoặc biết tổng hai cạnh).',
              method: 'Mô hình hóa bằng tam giác vuông, xác định cạnh huyền, áp dụng định lí Pythagore.',
              steps: `- **Bước 1.** Vẽ hình, xác định tam giác vuông và các cạnh đã biết.
- **Bước 2.** Áp dụng định lí Pythagore (lập phương trình nếu cần).
- **Bước 3.** Tính, làm tròn theo yêu cầu, trả lời.`,
              mistakes: '- Nhầm chiều dài thang (cạnh huyền) với chiều cao bức tường.\n- Làm tròn quá sớm ở các bước trung gian.',
              example: 'Một chiếc thang dài 5 m dựa vào bức tường thẳng đứng, chân thang cách chân tường 1,4 m. Hỏi đầu thang cách mặt đất bao nhiêu mét?',
              solution: r`\(h^2 = 5^2 - 1{,}4^2 = 25 - 1{,}96 = 23{,}04\), \(h = 4{,}8\) m.`,
              exercises: [
                sa(2, 'Một chiếc ti vi có màn hình hình chữ nhật với chiều rộng 36 inch và chiều cao 27 inch. Tính độ dài đường chéo màn hình.', ['45'], r`\(d^2 = 36^2 + 27^2 = 1296 + 729 = 2025\), \(d = 45\) inch.`, 'inch'),
                sa(3, 'Một cây cao 8 m bị gió bão làm gãy; ngọn cây chạm đất cách gốc 4 m, phần thân còn lại vẫn đứng thẳng. Hỏi chỗ gãy cách gốc cây bao nhiêu mét?', ['3'], r`Gọi khoảng cách từ gốc đến chỗ gãy là \(x\) (m), phần gãy dài \(8 - x\). \(x^2 + 16 = (8 - x)^2 \Leftrightarrow 16 = 64 - 16x \Leftrightarrow x = 3\).`, 'm'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 36 ----------------
    {
      slug: 'bai-36-cac-truong-hop-dong-dang-cua-hai-tam-giac-vuong',
      difficulty: 3,
      objectives: `- Giải thích các trường hợp đồng dạng của hai tam giác vuông, trường hợp đặc biệt cạnh huyền – cạnh góc vuông.
- Vận dụng tính độ dài, chứng minh hệ thức, tính tỉ số đường cao, tỉ số diện tích; giải bài toán thực tế.`,
      prerequisites: '- Ba trường hợp đồng dạng của hai tam giác (Bài 34).\n- Định lí Pythagore (Bài 35).',
      concepts: 'Hai tam giác vuông đồng dạng; trường hợp đặc biệt cạnh huyền – cạnh góc vuông; tỉ số hai đường cao tương ứng; tỉ số diện tích.',
      theorems: `- Hai tam giác vuông đồng dạng với nhau nếu: một góc nhọn của tam giác vuông này bằng một góc nhọn của tam giác vuông kia; hoặc hai cạnh góc vuông của tam giác vuông này tỉ lệ với hai cạnh góc vuông của tam giác vuông kia.
- **Trường hợp đặc biệt:** Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này tỉ lệ với cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó đồng dạng.`,
      properties: r`- Nếu hai tam giác đồng dạng theo tỉ số \(k\) thì tỉ số hai đường cao tương ứng bằng \(k\), tỉ số diện tích bằng \(k^2\).
- Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\): \(\triangle HBA \backsim \triangle ABC\), \(\triangle HAC \backsim \triangle ABC\); suy ra \(AB^2 = BH\cdot BC\), \(AC^2 = CH\cdot BC\), \(AH^2 = BH\cdot CH\), \(AB\cdot AC = BC\cdot AH\).`,
      themes: [
        {
          title: 'Các trường hợp đồng dạng của tam giác vuông',
          description: 'Góc nhọn bằng nhau; hai cạnh góc vuông tỉ lệ; cạnh huyền – cạnh góc vuông.',
          types: [
            {
              slug: 'chung-minh-tam-giac-vuong-dong-dang',
              title: 'Chứng minh hai tam giác vuông đồng dạng',
              levels: [1, 2, 3],
              knowledge: 'Hai tam giác vuông đồng dạng khi có một cặp góc nhọn bằng nhau, hoặc hai cạnh góc vuông tỉ lệ, hoặc cạnh huyền và một cạnh góc vuông tỉ lệ.',
              signs: 'Hai tam giác vuông (kí hiệu góc vuông, đường cao, hình chữ nhật…), cần chứng minh đồng dạng.',
              method: 'Ngoài cặp góc vuông, tìm thêm một cặp góc nhọn bằng nhau, hoặc tỉ số hai cặp cạnh góc vuông, hoặc tỉ số cạnh huyền – cạnh góc vuông.',
              steps: `- **Bước 1.** Chỉ ra hai tam giác vuông (vuông tại đỉnh nào).
- **Bước 2.** Tìm thêm một điều kiện: góc nhọn bằng nhau (góc chung, cùng phụ với một góc) hoặc cặp cạnh tỉ lệ.
- **Bước 3.** Kết luận đồng dạng, viết đúng thứ tự đỉnh (hai đỉnh góc vuông tương ứng với nhau).`,
              mistakes: '- Viết hai đỉnh góc vuông không tương ứng với nhau.\n- Dùng trường hợp cạnh huyền – cạnh góc vuông nhưng lập tỉ số cạnh huyền của tam giác này với cạnh góc vuông của tam giác kia.',
              example: r`Cho tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\). Chứng minh \(\triangle HBA \backsim \triangle ABC\).`,
              solution: r`\(\triangle HBA\) vuông tại \(H\), \(\triangle ABC\) vuông tại \(A\), có \(\widehat{B}\) chung nên \(\triangle HBA \backsim \triangle ABC\).`,
              exercises: [
                mcq(1, 'Cặp tam giác vuông nào sau đây đồng dạng với nhau?', [r`\(\triangle ABC\) vuông tại \(A\) có \(\widehat{B} = 40^\circ\) và \(\triangle DEF\) vuông tại \(D\) có \(\widehat{F} = 50^\circ\)`, r`\(\triangle ABC\) vuông tại \(A\) có \(\widehat{B} = 40^\circ\) và \(\triangle DEF\) vuông tại \(D\) có \(\widehat{E} = 45^\circ\)`, r`\(\triangle ABC\) vuông tại \(A\) có \(\widehat{B} = 30^\circ\) và \(\triangle DEF\) vuông tại \(D\) có \(\widehat{E} = 70^\circ\)`, r`\(\triangle ABC\) vuông tại \(A\) có \(AB = 3\), \(AC = 4\) và \(\triangle DEF\) vuông tại \(D\) có \(DE = 6\), \(DF = 9\)`], 'A', r`\(\triangle DEF\) có \(\widehat{E} = 90^\circ - 50^\circ = 40^\circ = \widehat{B}\) nên \(\triangle ABC \backsim \triangle DEF\).`),
                ge(2, r`Cho tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\). Chứng minh \(\triangle HAC \backsim \triangle ABC\).`, `A(1.8,2.4) B(0,0) C(5,0) H(1.8,0)
AB BC CA AH
vuong(B,A,C) vuong(A,H,C)`, r`\(\triangle HAC\) vuông tại \(H\), \(\triangle ABC\) vuông tại \(A\), có \(\widehat{C}\) chung nên \(\triangle HAC \backsim \triangle ABC\).`),
                sa(3, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 6\) cm, \(BC = 10\) cm; tam giác \(DEF\) vuông tại \(D\) có \(DE = 9\) cm, \(EF = 15\) cm. Chứng tỏ hai tam giác đồng dạng và tính \(DF\).`, ['12'], r`\(\dfrac{EF}{BC} = \dfrac{DE}{AB} = \dfrac32\) nên \(\triangle DEF \backsim \triangle ABC\) (cạnh huyền – cạnh góc vuông). \(AC = \sqrt{100 - 36} = 8\) cm, \(DF = \dfrac32\cdot8 = 12\) cm.`, 'cm'),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng tam giác vuông đồng dạng',
          description: 'Hệ thức trong tam giác vuông; tỉ số đường cao, diện tích; bài toán thực tế.',
          types: [
            {
              slug: 'giai-toan-tam-giac-vuong-dong-dang',
              title: 'Dùng tam giác vuông đồng dạng tính độ dài, chứng minh hệ thức',
              legacy: ['Dùng tam giác vuông đồng dạng để giải toán'],
              levels: [2, 3, 4],
              knowledge: r`Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\): \(AB^2 = BH\cdot BC\), \(AC^2 = CH\cdot BC\), \(AH^2 = BH\cdot CH\), \(AB\cdot AC = BC\cdot AH\) (suy ra từ các cặp tam giác vuông đồng dạng).`,
              signs: 'Tam giác vuông có đường cao ứng với cạnh huyền; yêu cầu tính đoạn thẳng hoặc chứng minh hệ thức dạng tích.',
              method: 'Chọn cặp tam giác vuông đồng dạng chứa các đoạn thẳng cần dùng, lập tỉ lệ thức rồi tính (kết hợp định lí Pythagore).',
              steps: `- **Bước 1.** Chứng minh cặp tam giác vuông đồng dạng phù hợp.
- **Bước 2.** Lập tỉ lệ thức, đưa về hệ thức tích.
- **Bước 3.** Thay số tính (kết hợp định lí Pythagore nếu cần).`,
              mistakes: '- Dùng nhầm cặp tam giác dẫn tới tỉ lệ thức sai.\n- Quên rằng BH + HC = BC.',
              example: r`Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\), \(BH = 4\) cm, \(HC = 9\) cm. Tính \(AH\).`,
              solution: r`\(\triangle HBA \backsim \triangle HAC\) (vuông tại \(H\), \(\widehat{HBA} = \widehat{HAC}\) vì cùng phụ với \(\widehat{HAB}\)). Suy ra \(\dfrac{HB}{HA} = \dfrac{HA}{HC}\), \(AH^2 = 4\cdot9 = 36\), \(AH = 6\) cm.`,
              exercises: [
                sa(2, r`Tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\), \(BH = 3\) cm, \(BC = 12\) cm. Tính \(AB\).`, ['6'], r`\(\triangle HBA \backsim \triangle ABC\) nên \(AB^2 = BH\cdot BC = 36\), \(AB = 6\) cm.`, 'cm'),
                sa(3, r`Tam giác \(ABC\) vuông tại \(A\) có \(AB = 15\) cm, \(AC = 20\) cm, đường cao \(AH\). Tính \(AH\).`, ['12'], r`\(BC = \sqrt{225 + 400} = 25\) cm. \(AB\cdot AC = BC\cdot AH\) nên \(AH = \dfrac{15\cdot20}{25} = 12\) cm.`, 'cm'),
                es(4, r`Cho tam giác \(ABC\) vuông tại \(A\), đường cao \(AH\). Chứng minh \(AH^2 = BH\cdot CH\).`, r`\(\widehat{HBA} = \widehat{HAC}\) (cùng phụ với \(\widehat{HAB}\)). Hai tam giác vuông \(HBA\) và \(HAC\) (vuông tại \(H\)) có cặp góc nhọn bằng nhau nên \(\triangle HBA \backsim \triangle HAC\).
Suy ra \(\dfrac{HB}{HA} = \dfrac{HA}{HC}\), do đó \(AH^2 = BH\cdot CH\).`),
              ],
            },
            {
              slug: 'ti-so-duong-cao-dien-tich',
              title: 'Tỉ số đường cao, tỉ số diện tích hai tam giác đồng dạng',
              legacy: ['Tỉ số diện tích hai tam giác'],
              levels: [3, 4],
              knowledge: r`Nếu hai tam giác đồng dạng theo tỉ số \(k\) thì tỉ số hai đường cao tương ứng bằng \(k\) và tỉ số diện tích bằng \(k^2\).`,
              signs: 'Đề yêu cầu tính tỉ số diện tích, diện tích của tam giác đồng dạng, diện tích phần còn lại, hoặc tỉ số hai đường cao.',
              method: r`Tìm tỉ số đồng dạng \(k\), áp dụng \(\dfrac{h'}{h} = k\), \(\dfrac{S'}{S} = k^2\).`,
              steps: r`- **Bước 1.** Chứng minh hai tam giác đồng dạng, xác định \(k\).
- **Bước 2.** Áp dụng \(\dfrac{h'}{h} = k\), \(\dfrac{S'}{S} = k^2\).
- **Bước 3.** Tính đại lượng cần tìm (có thể lấy hiệu diện tích).`,
              mistakes: r`- Dùng \(\dfrac{S'}{S} = k\).
- Xác định \(k\) ngược chiều.`,
              example: r`Cho \(\triangle DEF \backsim \triangle ABC\) có \(DE = 9\) cm, \(AB = 6\) cm. Diện tích tam giác \(ABC\) bằng 20 cm². Tính diện tích tam giác \(DEF\).`,
              solution: r`\(k = \dfrac{DE}{AB} = \dfrac32\). \(\dfrac{S_{DEF}}{S_{ABC}} = k^2 = \dfrac94\), suy ra \(S_{DEF} = \dfrac94\cdot20 = 45\) cm².`,
              exercises: [
                sa(3, r`Cho tam giác \(ABC\) có diện tích 36 cm². Điểm \(M\) thuộc \(AB\), \(N\) thuộc \(AC\) sao cho \(MN \parallel BC\) và \(AM = \dfrac13 AB\). Tính diện tích tứ giác \(BMNC\).`, ['32'], r`\(\triangle AMN \backsim \triangle ABC\) theo tỉ số \(\dfrac13\) nên \(S_{AMN} = \dfrac19\cdot36 = 4\) cm². \(S_{BMNC} = 36 - 4 = 32\) cm².`, 'cm²'),
                sa(3, r`Hai tam giác đồng dạng có tỉ số diện tích bằng \(\dfrac49\). Một đường cao của tam giác lớn hơn dài 12 cm. Tính đường cao tương ứng của tam giác nhỏ hơn.`, ['8'], r`\(k^2 = \dfrac49\) nên \(k = \dfrac23\). Đường cao tương ứng: \(\dfrac23\cdot12 = 8\) cm.`, 'cm'),
                es(4, r`Chứng minh rằng nếu \(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(k\) thì tỉ số diện tích của hai tam giác bằng \(k^2\).`, r`Kẻ đường cao \(A'H'\), \(AH\). Hai tam giác vuông \(A'B'H'\) và \(ABH\) có \(\widehat{B'} = \widehat{B}\) nên đồng dạng, suy ra \(\dfrac{A'H'}{AH} = \dfrac{A'B'}{AB} = k\).
Do đó \(\dfrac{S_{A'B'C'}}{S_{ABC}} = \dfrac{\frac12 B'C'\cdot A'H'}{\frac12 BC\cdot AH} = k\cdot k = k^2\).`),
              ],
            },
            {
              slug: 'thuc-te-tam-giac-vuong-dong-dang',
              title: 'Bài toán thực tế về tam giác vuông đồng dạng',
              legacy: ['Toán thực tế'],
              levels: [3],
              knowledge: 'Hai tam giác vuông có một cặp góc nhọn bằng nhau thì đồng dạng; ứng dụng đo chiều cao, khoảng cách.',
              signs: 'Đo chiều cao vật bằng bóng, bằng cọc ngắm; đo chiều rộng sông, khoảng cách tới vật không đến được.',
              method: 'Chỉ ra hai tam giác vuông có một cặp góc nhọn bằng nhau (góc đối đỉnh, góc chung, tia nắng song song), lập tỉ lệ thức.',
              steps: `- **Bước 1.** Vẽ sơ đồ, chỉ ra hai tam giác vuông.
- **Bước 2.** Chứng minh chúng đồng dạng (cặp góc nhọn bằng nhau).
- **Bước 3.** Lập tỉ lệ thức, tính và trả lời.`,
              mistakes: '- Ghép sai cặp cạnh tương ứng.\n- Dùng khoảng cách tới người thay cho khoảng cách tới đỉnh bóng.',
              example: 'Để đo chiều cao AC của một cây, người ta cắm một cọc DE cao 2 m vuông góc với mặt đất rồi đặt mắt ở điểm F trên mặt đất sao cho F, E, C thẳng hàng. Đo được FD = 3 m, FA = 15 m (F, D, A thẳng hàng). Tính chiều cao của cây.',
              solution: r`\(\triangle FDE\) và \(\triangle FAC\) vuông tại \(D\), \(A\), có \(\widehat{F}\) chung nên đồng dạng. \(\dfrac{AC}{DE} = \dfrac{FA}{FD} = 5\), suy ra \(AC = 10\) m.`,
              exercises: [
                sa(3, 'Một người cao 1,6 m đứng cách cột đèn 4 m thì bóng của người đó trên mặt đất dài 2 m (đỉnh bóng của người trùng với đỉnh bóng do cột đèn tạo ra). Tính chiều cao của cột đèn.', ['4,8'], r`Gọi \(T\) là đỉnh bóng. Hai tam giác vuông có chung góc tại \(T\) nên đồng dạng: \(\dfrac{h}{1{,}6} = \dfrac{4 + 2}{2} = 3\), \(h = 4{,}8\) m.`, 'm'),
                ge(3, r`Để đo chiều rộng \(AB\) của một khúc sông (\(A\), \(B\) ở hai bờ, \(AB \perp BD\)), người ta chọn các điểm \(C\), \(D\) trên bờ có điểm \(B\) sao cho \(B\), \(C\), \(D\) thẳng hàng, rồi xác định điểm \(E\) sao cho \(ED \perp BD\) và \(A\), \(C\), \(E\) thẳng hàng. Đo được \(BC = 20\) m, \(CD = 5\) m, \(DE = 6\) m. Tính \(AB\).`, `B(0,0) C(4,0) D(5,0) A(0,4.8) E(5,-1.2)
AB BD AE DE
vuong(A,B,C) vuong(C,D,E)`, r`\(\triangle ABC\) vuông tại \(B\), \(\triangle EDC\) vuông tại \(D\), \(\widehat{ACB} = \widehat{ECD}\) (đối đỉnh) nên \(\triangle ABC \backsim \triangle EDC\).
\(\dfrac{AB}{ED} = \dfrac{BC}{DC}\), suy ra \(AB = \dfrac{6\cdot20}{5} = 24\) m.`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 37 ----------------
    {
      slug: 'bai-37-hinh-dong-dang',
      difficulty: 1,
      objectives: `- Nhận biết hình đồng dạng phối cảnh (hình vị tự), tâm và tỉ số đồng dạng phối cảnh.
- Nhận biết hình đồng dạng qua các hình ảnh cụ thể; nhận biết vẻ đẹp của hình đồng dạng trong tự nhiên, nghệ thuật, kiến trúc, công nghệ.`,
      prerequisites: '- Hai tam giác đồng dạng (Bài 33–36).\n- Tỉ lệ bản đồ, tỉ số (Toán 6, Toán 7).',
      concepts: 'Hình đồng dạng phối cảnh (hình vị tự); tâm đồng dạng phối cảnh; tỉ số đồng dạng; hình đồng dạng.',
      properties: r`- Hình \(H'\) là hình đồng dạng phối cảnh của hình \(H\) với tâm \(O\), tỉ số \(k\) (\(k > 0\)) nếu mỗi điểm \(M\) thuộc \(H\) ứng với điểm \(M'\) thuộc \(H'\) nằm trên tia \(OM\) sao cho \(OM' = k\cdot OM\) (và ngược lại).
- Hình \(H\) được gọi là đồng dạng với hình \(H'\) nếu hình \(H\) bằng một hình đồng dạng phối cảnh của hình \(H'\).
- Hai hình tròn bất kì, hai hình vuông bất kì, hai tam giác đều bất kì luôn đồng dạng với nhau.`,
      themes: [
        {
          title: 'Hình đồng dạng phối cảnh',
          description: 'Tâm, tỉ số đồng dạng phối cảnh.',
          types: [
            {
              slug: 'hinh-dong-dang-phoi-canh',
              title: 'Nhận biết hình đồng dạng phối cảnh, tâm và tỉ số',
              legacy: ['Nhận biết hình đồng dạng, hình đồng dạng phối cảnh'],
              levels: [1, 2],
              knowledge: r`\(H'\) đồng dạng phối cảnh với \(H\) theo tâm \(O\), tỉ số \(k\): mỗi điểm \(M\) thuộc \(H\) ứng với điểm \(M'\) trên tia \(OM\), \(OM' = k\cdot OM\).`,
              signs: 'Hình vẽ có một điểm O và hai hình mà các cặp điểm tương ứng thẳng hàng với O; yêu cầu xác định tâm, tỉ số, tính độ dài tương ứng.',
              method: 'Nối các cặp điểm tương ứng; giao điểm là tâm O; tỉ số k = OM\' : OM.',
              steps: r`- **Bước 1.** Xác định các cặp điểm tương ứng.
- **Bước 2.** Tìm tâm \(O\) (giao điểm của các đường thẳng nối các cặp điểm tương ứng).
- **Bước 3.** Tính \(k = \dfrac{OM'}{OM}\) (\(k > 1\): phóng to; \(k < 1\): thu nhỏ); mọi đoạn thẳng của \(H'\) bằng \(k\) lần đoạn tương ứng của \(H\).`,
              mistakes: r`- Tính tỉ số ngược \(\dfrac{OM}{OM'}\).
- Lấy điểm \(M'\) trên tia đối của tia \(OM\).`,
              example: r`Tam giác \(A'B'C'\) là hình đồng dạng phối cảnh của tam giác \(ABC\) với tâm \(O\) như hình vẽ, \(OA = 2\) cm, \(OA' = 4\) cm. Tìm tỉ số đồng dạng. So sánh \(B'C'\) với \(BC\).
[hinh]
O(0,0) A(1,1.5) B(2,0.5) C(2.2,1.6) A'(2,3) B'(4,1) C'(4.4,3.2)
ABCA A'B'C'A'
OA':dash OB':dash OC':dash
[/hinh]`,
              solution: r`Tỉ số đồng dạng \(k = \dfrac{OA'}{OA} = 2\). Tam giác \(A'B'C'\) đồng dạng với tam giác \(ABC\) theo tỉ số 2 nên \(B'C' = 2BC\).`,
              exercises: [
                mcq(1, r`Hình \(H'\) là hình đồng dạng phối cảnh của hình \(H\) với tâm \(O\), tỉ số \(k = 2\). Điểm \(M\) thuộc \(H\) có \(OM = 3\) cm. Điểm \(M'\) tương ứng thuộc \(H'\) cách \(O\) một khoảng`, ['6 cm', '1,5 cm', '5 cm', '9 cm'], 'A', r`\(OM' = 2\cdot OM = 6\) cm.`),
                tf(2, r`Tam giác \(A'B'C'\) là hình đồng dạng phối cảnh của tam giác \(ABC\) với tâm \(O\), tỉ số \(k = \dfrac12\). Mỗi khẳng định sau đúng hay sai?`, [
                  [r`Ba điểm \(O\), \(A\), \(A'\) thẳng hàng.`, true],
                  [r`\(OA' = 2OA\).`, false],
                  [r`\(\triangle A'B'C' \backsim \triangle ABC\) theo tỉ số \(\dfrac12\).`, true],
                  [r`Chu vi tam giác \(A'B'C'\) gấp đôi chu vi tam giác \(ABC\).`, false],
                ], r`\(A'\) nằm trên tia \(OA\) và \(OA' = \dfrac12 OA\). Hai tam giác đồng dạng theo tỉ số \(\dfrac12\) nên chu vi tam giác \(A'B'C'\) bằng một nửa chu vi tam giác \(ABC\).`),
              ],
            },
          ],
        },
        {
          title: 'Hình đồng dạng',
          description: 'Nhận biết hình đồng dạng; tính kích thước theo tỉ lệ.',
          types: [
            {
              slug: 'nhan-biet-hinh-dong-dang',
              title: 'Nhận biết hình đồng dạng trong thực tế',
              levels: [1, 2],
              knowledge: 'Hai hình đồng dạng có cùng hình dạng, có thể khác kích thước; các góc tương ứng bằng nhau, các độ dài tương ứng tỉ lệ.',
              signs: 'Đề cho các hình (hình học hoặc hình ảnh thực tế), hỏi cặp hình nào đồng dạng.',
              method: 'So sánh hình dạng: các góc tương ứng có bằng nhau không, tỉ số các kích thước tương ứng có bằng nhau không.',
              steps: `- **Bước 1.** Xác định loại hình.
- **Bước 2.** So sánh các góc và tỉ số các kích thước tương ứng.
- **Bước 3.** Kết luận.`,
              mistakes: '- Cho rằng hai hình chữ nhật bất kì luôn đồng dạng.\n- Cho rằng hai hình thoi có cạnh tỉ lệ thì đồng dạng (còn cần các góc bằng nhau).',
              example: 'Trong các cặp hình sau, cặp nào luôn đồng dạng: hai hình vuông; hai hình chữ nhật; hai tam giác đều; hai hình thoi?',
              solution: 'Hai hình vuông và hai tam giác đều luôn đồng dạng (các góc bằng nhau, các cạnh tỉ lệ). Hai hình chữ nhật hoặc hai hình thoi không phải lúc nào cũng đồng dạng.',
              exercises: [
                mcq(1, 'Cặp hình nào sau đây luôn đồng dạng?', ['Hai hình tròn', 'Hai hình chữ nhật', 'Hai hình thoi', 'Hai tam giác cân'], 'A', 'Hai hình tròn bất kì luôn đồng dạng.'),
                tf(2, 'Mỗi khẳng định sau đúng hay sai?', [
                  ['Hai hình vuông bất kì luôn đồng dạng.', true],
                  ['Hình chữ nhật kích thước 2 cm × 3 cm đồng dạng với hình chữ nhật kích thước 4 cm × 6 cm.', true],
                  ['Hình chữ nhật kích thước 2 cm × 3 cm đồng dạng với hình chữ nhật kích thước 3 cm × 4 cm.', false],
                  ['Hai hình thoi có cạnh bằng nhau luôn đồng dạng.', false],
                ], 'b) Tỉ số 4 : 2 = 6 : 3 = 2: đúng. c) 3 : 2 ≠ 4 : 3: sai. d) Các góc có thể khác nhau: sai.'),
              ],
            },
            {
              slug: 'kich-thuoc-hinh-dong-dang',
              title: 'Tính kích thước của hình đồng dạng (ảnh, bản vẽ, mô hình)',
              levels: [2, 3],
              knowledge: 'Hai hình đồng dạng theo tỉ số k thì mọi độ dài tương ứng tỉ lệ k; tỉ lệ bản vẽ 1 : n nghĩa là độ dài thật gấp n lần độ dài trên bản vẽ.',
              signs: 'Ảnh phóng to, thu nhỏ; bản vẽ, bản đồ, mô hình theo tỉ lệ; yêu cầu tính kích thước thật hoặc kích thước trên hình.',
              method: 'Xác định tỉ số đồng dạng (tỉ lệ), nhân hoặc chia các kích thước tương ứng, đổi đơn vị.',
              steps: `- **Bước 1.** Xác định tỉ số k (kích thước hình mới : kích thước tương ứng của hình cũ).
- **Bước 2.** Kích thước mới = k × kích thước cũ.
- **Bước 3.** Đổi đơn vị, trả lời.`,
              mistakes: '- Nhầm chiều tỉ lệ (thu nhỏ hay phóng to).\n- Quên đổi đơn vị.',
              example: 'Một mô hình ô tô theo tỉ lệ 1 : 20 dài 22 cm. Ô tô thật dài bao nhiêu mét?',
              solution: r`Chiều dài thật \(22\cdot20 = 440\) cm \(= 4{,}4\) m.`,
              exercises: [
                sa(2, 'Một bức ảnh hình chữ nhật kích thước 10 cm × 15 cm được phóng to thành bức ảnh đồng dạng có chiều dài 45 cm. Tính chiều rộng của bức ảnh mới.', ['30'], r`Tỉ số \(k = \dfrac{45}{15} = 3\); chiều rộng mới \(3\cdot10 = 30\) cm.`, 'cm'),
                sa(3, 'Trên bản vẽ tỉ lệ 1 : 100, một phòng học hình chữ nhật có kích thước 8 cm × 6 cm. Tính diện tích thực tế của phòng học.', ['48'], r`Kích thước thật: 8 m × 6 m. Diện tích \(48\) m².`, 'm²'),
              ],
            },
          ],
        },
      ],
    },
  ],
};
