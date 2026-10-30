import { es, ge, mcq, r, sa, type MapChapter } from './types';

/** Chương IV. Định lí Thalès – Bài 15 đến Bài 17. */
export const CHUONG_4: MapChapter = {
  code: 'IV',
  objectives: `- Giải thích định lí Thalès và định lí Thalès đảo trong tam giác.
- Mô tả đường trung bình của tam giác và giải thích tính chất của nó.
- Giải thích tính chất đường phân giác trong của tam giác.
- Vận dụng để tính độ dài, chứng minh song song, giải bài toán thực tế (đo khoảng cách, chiều cao).`,
  keyPoints: `- Tỉ số của hai đoạn thẳng, đoạn thẳng tỉ lệ.
- Định lí Thalès và định lí Thalès đảo.
- Đường trung bình của tam giác: song song với cạnh thứ ba và bằng nửa cạnh đó.
- Đường phân giác của một góc chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề.`,
  formulas: r`\(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)) \(\Rightarrow \dfrac{AM}{AB} = \dfrac{AN}{AC}\); \(\dfrac{AM}{MB} = \dfrac{AN}{NC}\).
\(M\), \(N\) là trung điểm của \(AB\), \(AC\) \(\Rightarrow MN \parallel BC\), \(MN = \dfrac{BC}{2}\).
\(AD\) là đường phân giác của góc \(A\) (\(D \in BC\)) \(\Rightarrow \dfrac{DB}{DC} = \dfrac{AB}{AC}\).`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 1 (VietJack, Hoatieu) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-4a', objectives: 'Củng cố định lí Thalès, đường trung bình và tính chất đường phân giác của tam giác; vận dụng tính độ dài, chứng minh song song.' },
    { slug: 'bai-tap-cuoi-chuong-4', objectives: 'Ôn tập toàn Chương IV: hệ thống định lí Thalès, đường trung bình, đường phân giác; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 15 ----------------
    {
      slug: 'bai-15-dinh-li-thales-trong-tam-giac',
      difficulty: 2,
      objectives: `- Nhận biết tỉ số của hai đoạn thẳng, đoạn thẳng tỉ lệ.
- Giải thích định lí Thalès và định lí Thalès đảo trong tam giác.
- Vận dụng tính độ dài đoạn thẳng, chứng minh hai đường thẳng song song, giải bài toán đo đạc thực tế.`,
      prerequisites: '- Tỉ lệ thức và tính chất của tỉ lệ thức (Toán 7).\n- Hai đường thẳng song song (Toán 7).',
      concepts: 'Tỉ số của hai đoạn thẳng; đoạn thẳng tỉ lệ.',
      theorems: `- Định lí Thalès: Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.
- Định lí Thalès đảo: Nếu một đường thẳng cắt hai cạnh của một tam giác và định ra trên hai cạnh này những đoạn thẳng tương ứng tỉ lệ thì đường thẳng đó song song với cạnh còn lại của tam giác.`,
      formulas: r`\(MN \parallel BC\) \(\Rightarrow \dfrac{AM}{AB} = \dfrac{AN}{AC}\); \(\dfrac{AM}{MB} = \dfrac{AN}{NC}\); \(\dfrac{MB}{AB} = \dfrac{NC}{AC}\).`,
      properties: '- Tỉ số của hai đoạn thẳng là tỉ số độ dài của chúng theo cùng một đơn vị đo, không phụ thuộc vào đơn vị đo.\n- Định lí Thalès vẫn đúng khi đường thẳng song song cắt phần kéo dài của hai cạnh.',
      themes: [
        {
          title: 'Đoạn thẳng tỉ lệ',
          description: 'Tỉ số của hai đoạn thẳng; nhận biết các đoạn thẳng tỉ lệ.',
          types: [
            {
              slug: 'doan-thang-ti-le',
              title: 'Đoạn thẳng tỉ lệ',
              levels: [1, 2],
              knowledge: r`Tỉ số của hai đoạn thẳng \(\dfrac{AB}{CD}\) (cùng đơn vị đo). Hai đoạn \(AB\), \(CD\) tỉ lệ với \(A'B'\), \(C'D'\) nếu \(\dfrac{AB}{CD} = \dfrac{A'B'}{C'D'}\).`,
              signs: 'Đề yêu cầu tính tỉ số hai đoạn thẳng hoặc kiểm tra hai cặp đoạn thẳng có tỉ lệ hay không.',
              method: 'Đổi các độ dài về cùng một đơn vị, lập tỉ số rồi rút gọn; so sánh hai tỉ số.',
              steps: `- **Bước 1.** Đổi về cùng đơn vị đo.
- **Bước 2.** Lập tỉ số và rút gọn.
- **Bước 3.** So sánh các tỉ số (nếu cần) và kết luận.`,
              mistakes: '- Lập tỉ số khi hai đoạn chưa cùng đơn vị (ví dụ 3 dm và 40 cm).\n- Đảo thứ tự hai đoạn trong tỉ số.',
              example: r`Cho \(AB = 6\) cm, \(CD = 2\) dm. Tính \(\dfrac{AB}{CD}\). Hai đoạn \(AB\), \(CD\) có tỉ lệ với hai đoạn \(EF = 9\) cm, \(GH = 30\) cm không?`,
              solution: r`\(CD = 20\) cm nên \(\dfrac{AB}{CD} = \dfrac{6}{20} = \dfrac{3}{10}\). Lại có \(\dfrac{EF}{GH} = \dfrac{9}{30} = \dfrac{3}{10}\). Vậy \(AB\), \(CD\) tỉ lệ với \(EF\), \(GH\).`,
              exercises: [
                mcq(1, r`Cho \(AB = 3\) cm, \(CD = 12\) cm. Tỉ số \(\dfrac{AB}{CD}\) bằng`, [r`\(\dfrac{1}{4}\)`, r`\(4\)`, r`\(\dfrac{1}{3}\)`, r`\(\dfrac{1}{12}\)`], 'A', r`\(\dfrac{AB}{CD} = \dfrac{3}{12} = \dfrac{1}{4}\).`),
                sa(2, r`Cho \(AB = 1{,}2\) m và \(CD = 80\) cm. Tính tỉ số \(\dfrac{AB}{CD}\).`, ['1,5', '3/2'], r`\(AB = 120\) cm nên \(\dfrac{AB}{CD} = \dfrac{120}{80} = \dfrac{3}{2} = 1{,}5\).`),
              ],
            },
          ],
        },
        {
          title: 'Định lí Thalès và định lí Thalès đảo',
          description: 'Tính độ dài, chứng minh song song, chứng minh hệ thức và đo đạc thực tế.',
          types: [
            {
              slug: 'tinh-do-dai-dinh-li-thales',
              title: 'Dùng định lí Thalès tính độ dài đoạn thẳng',
              levels: [2, 3],
              knowledge: r`Định lí Thalès: \(MN \parallel BC\) thì \(\dfrac{AM}{AB} = \dfrac{AN}{AC}\), \(\dfrac{AM}{MB} = \dfrac{AN}{NC}\).`,
              signs: 'Tam giác có một đường thẳng song song với một cạnh, biết một số đoạn trên hai cạnh còn lại; cần tính đoạn chưa biết.',
              method: 'Viết tỉ lệ thức theo định lí Thalès với ba đoạn đã biết và một đoạn cần tìm, rồi giải tỉ lệ thức.',
              steps: `- **Bước 1.** Chỉ ra đường thẳng song song với một cạnh của tam giác.
- **Bước 2.** Viết tỉ lệ thức chứa đoạn cần tìm (chọn đúng các đoạn tương ứng).
- **Bước 3.** Giải tỉ lệ thức (nhân chéo) và kết luận.`,
              mistakes: '- Ghép sai đoạn tương ứng (AM với NC thay vì AN).\n- Dùng định lí khi hai đường thẳng chưa chắc song song.',
              example: r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 3\) cm, \(MB = 2\) cm, \(AN = 4{,}5\) cm. Tính \(NC\) và \(AC\).`,
              solution: r`Theo định lí Thalès: \(\dfrac{AM}{MB} = \dfrac{AN}{NC}\), tức là \(\dfrac{3}{2} = \dfrac{4{,}5}{NC}\), suy ra \(NC = 3\) cm và \(AC = 7{,}5\) cm.`,
              exercises: [
                sa(2, r`Tam giác \(ABC\) có \(MN \parallel BC\) (\(M \in AB\), \(N \in AC\)), \(AM = 4\) cm, \(AB = 10\) cm, \(AC = 15\) cm. Tính \(AN\).`, ['6'], r`\(\dfrac{AM}{AB} = \dfrac{AN}{AC}\) nên \(AN = \dfrac{4\cdot15}{10} = 6\) cm.`, 'cm'),
                ge(3, r`Cho tam giác \(ABC\) có \(DE \parallel BC\) (\(D \in AB\), \(E \in AC\)) như hình vẽ. Biết \(AD = 6\) cm, \(DB = 4\) cm, \(AE = 4{,}5\) cm. Tính \(EC\) và \(AC\).`, `A(2,5) B(0,0) C(6,0) D(0.8,2) E(4.4,2)
ABCA
DE`, r`Vì \(DE \parallel BC\) nên \(\dfrac{AD}{DB} = \dfrac{AE}{EC}\), tức là \(\dfrac{6}{4} = \dfrac{4{,}5}{EC}\). Suy ra \(EC = 3\) cm, \(AC = 4{,}5 + 3 = 7{,}5\) cm.`),
              ],
            },
            {
              slug: 'chung-minh-song-song-he-thuc-thales',
              title: 'Dùng định lí Thalès chứng minh hệ thức, hai đường thẳng song song',
              levels: [3, 4],
              knowledge: 'Định lí Thalès (thuận và đảo); tính chất của tỉ lệ thức.',
              signs: 'Đề cho các đoạn thẳng trên hai cạnh tam giác (hoặc hình thang) và yêu cầu chứng minh song song, hoặc chứng minh một đẳng thức tích, tỉ số.',
              method: 'Chứng minh song song: chỉ ra các đoạn thẳng tỉ lệ rồi dùng định lí đảo. Chứng minh hệ thức: viết các tỉ lệ thức theo định lí Thalès rồi biến đổi.',
              steps: `- **Bước 1.** Xác định tam giác và đường thẳng cắt hai cạnh của nó.
- **Bước 2.** Lập các tỉ số tương ứng (từ số liệu hoặc từ giả thiết song song).
- **Bước 3.** So sánh, biến đổi tỉ lệ thức để được kết luận.`,
              mistakes: '- Dùng định lí đảo với các đoạn không tương ứng (một đoạn trên cạnh này với đoạn kéo dài cạnh kia).\n- Biến đổi tỉ lệ thức sai khi nhân chéo.',
              example: r`Cho tam giác \(ABC\), \(M \in AB\), \(N \in AC\) với \(AM = 2\) cm, \(MB = 3\) cm, \(AN = 3\) cm, \(NC = 4{,}5\) cm. Chứng minh \(MN \parallel BC\).`,
              solution: r`\(\dfrac{AM}{MB} = \dfrac{2}{3}\) và \(\dfrac{AN}{NC} = \dfrac{3}{4{,}5} = \dfrac{2}{3}\). Do đó \(\dfrac{AM}{MB} = \dfrac{AN}{NC}\), theo định lí Thalès đảo \(MN \parallel BC\).`,
              exercises: [
                mcq(3, r`Tam giác \(ABC\) có \(AB = 9\) cm, \(AC = 12\) cm. Trên \(AB\) lấy \(M\) sao cho \(AM = 3\) cm, trên \(AC\) lấy \(N\). Đường thẳng \(MN\) song song với \(BC\) khi \(AN\) bằng`, ['4 cm', '3 cm', '6 cm', '8 cm'], 'A', r`\(MN \parallel BC\) khi \(\dfrac{AN}{AC} = \dfrac{AM}{AB} = \dfrac{1}{3}\), tức là \(AN = 4\) cm.`),
                es(4, r`Cho hình thang \(ABCD\) (\(AB \parallel CD\)), \(O\) là giao điểm của hai đường chéo. Chứng minh \(OA\cdot OD = OB\cdot OC\).`, r`Trong tam giác \(OCD\), đường thẳng \(AB\) song song với \(CD\) và cắt các tia đối của \(OC\), \(OD\) tại \(A\), \(B\). Theo định lí Thalès (trường hợp cắt phần kéo dài) \(\dfrac{OA}{OC} = \dfrac{OB}{OD}\), suy ra \(OA\cdot OD = OB\cdot OC\).`),
              ],
            },
            {
              slug: 'do-dac-thuc-te-dinh-li-thales',
              title: 'Bài toán thực tế: đo khoảng cách, chiều cao',
              levels: [3],
              knowledge: 'Định lí Thalès; tỉ lệ thức.',
              signs: 'Cần đo một khoảng cách không đến được (qua sông, hồ) hoặc chiều cao; đề mô tả cách đặt các điểm để có các đường thẳng song song.',
              method: 'Mô hình hóa bằng một tam giác có đường thẳng song song với một cạnh; đoạn cần đo nằm trên một cạnh; dùng định lí Thalès để tính.',
              steps: `- **Bước 1.** Vẽ hình, xác định tam giác và cặp đường thẳng song song.
- **Bước 2.** Viết tỉ lệ thức chứa đoạn cần tìm và các đoạn đo được.
- **Bước 3.** Tính và trả lời bằng đơn vị thực tế.`,
              mistakes: '- Ghép sai đoạn tương ứng do vẽ hình không chính xác.\n- Quên đơn vị khi trả lời.',
              example: r`Để đo khoảng cách \(AB\) giữa hai điểm ở hai bờ sông, người ta chọn điểm \(O\) sao cho \(O\), \(A\), \(B\) thẳng hàng, rồi chọn \(C\), \(D\) sao cho \(O\), \(C\), \(D\) thẳng hàng và \(AC \parallel BD\) (như hình). Đo được \(OA = 12\) m, \(OC = 15\) m, \(CD = 25\) m. Tính \(AB\).
[hinh]
O(0,0) A(3,2) B(8,5.33) C(3.75,0) D(10,0)
OB OD AC BD
[/hinh]`,
              solution: r`Trong tam giác \(OBD\) có \(AC \parallel BD\) nên \(\dfrac{OA}{AB} = \dfrac{OC}{CD}\), tức là \(\dfrac{12}{AB} = \dfrac{15}{25}\). Suy ra \(AB = \dfrac{12\cdot25}{15} = 20\) m.`,
              exercises: [
                sa(3, r`Với cách đo như ví dụ, nếu đo được \(OA = 10\) m, \(OC = 8\) m, \(CD = 12\) m thì khoảng cách \(AB\) bằng bao nhiêu mét?`, ['15'], r`\(\dfrac{OA}{AB} = \dfrac{OC}{CD}\) nên \(AB = \dfrac{10\cdot12}{8} = 15\) m.`, 'm'),
                sa(3, r`Một khung mái nhà có dạng tam giác \(ABC\). Người ta làm một thanh ngang \(MN\) song song với \(BC\) (\(M \in AB\), \(N \in AC\)). Biết \(AM = 1{,}2\) m, \(MB = 0{,}8\) m, \(AC = 2{,}5\) m. Tính \(AN\).`, ['1,5'], r`\(AB = 2\) m. Vì \(MN \parallel BC\) nên \(\dfrac{AN}{AC} = \dfrac{AM}{AB}\), suy ra \(AN = \dfrac{2{,}5\cdot1{,}2}{2} = 1{,}5\) m.`, 'm'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 16 ----------------
    {
      slug: 'bai-16-duong-trung-binh-cua-tam-giac',
      difficulty: 2,
      objectives: `- Mô tả đường trung bình của tam giác.
- Giải thích tính chất đường trung bình của tam giác.
- Vận dụng để tính độ dài, chứng minh song song, thẳng hàng và nhận biết tứ giác đặc biệt.`,
      prerequisites: '- Định lí Thalès, định lí Thalès đảo (Bài 15).\n- Hình bình hành, hình chữ nhật, hình thoi (Chương III).',
      concepts: 'Đường trung bình của tam giác (đoạn thẳng nối trung điểm hai cạnh).',
      theorems: 'Đường trung bình của tam giác thì song song với cạnh thứ ba và bằng nửa cạnh ấy.',
      formulas: r`\(M\), \(N\) là trung điểm của \(AB\), \(AC\) \(\Rightarrow MN \parallel BC\) và \(MN = \dfrac{BC}{2}\).`,
      properties: '- Mỗi tam giác có ba đường trung bình.\n- Đường thẳng đi qua trung điểm một cạnh của tam giác và song song với cạnh thứ hai thì đi qua trung điểm của cạnh thứ ba.',
      themes: [
        {
          title: 'Đường trung bình và tính chất',
          description: 'Tính độ dài; chứng minh song song, thẳng hàng.',
          types: [
            {
              slug: 'tinh-do-dai-duong-trung-binh',
              title: 'Tính độ dài đoạn thẳng dựa vào đường trung bình',
              levels: [1, 2, 3],
              knowledge: r`Đường trung bình \(MN\) của tam giác \(ABC\) bằng nửa cạnh \(BC\).`,
              signs: 'Đề có trung điểm của hai cạnh tam giác và yêu cầu tính cạnh thứ ba, đoạn nối trung điểm, chu vi; bài toán đo khoảng cách qua vật cản.',
              method: 'Chỉ ra đường trung bình rồi dùng hệ thức MN = BC : 2.',
              steps: `- **Bước 1.** Chỉ ra hai trung điểm và tam giác chứa chúng.
- **Bước 2.** Kết luận đoạn nối hai trung điểm là đường trung bình.
- **Bước 3.** Áp dụng MN = BC : 2 (hoặc BC = 2MN).`,
              mistakes: '- Nhầm cạnh thứ ba (cạnh không chứa hai trung điểm).\n- Gọi đoạn nối trung điểm một cạnh với một đỉnh là đường trung bình (đó là đường trung tuyến).',
              example: r`Hai điểm \(B\), \(C\) bị ngăn bởi một hồ nước. Chọn điểm \(A\) ở ngoài hồ, gọi \(M\), \(N\) là trung điểm của \(AB\), \(AC\); đo được \(MN = 45\) m. Tính \(BC\).`,
              solution: r`\(MN\) là đường trung bình của tam giác \(ABC\) nên \(BC = 2MN = 90\) m.`,
              exercises: [
                sa(1, r`\(MN\) là đường trung bình của tam giác \(ABC\) (\(MN \parallel BC\)) và \(MN = 7\) cm. Tính \(BC\).`, ['14'], r`\(BC = 2MN = 14\) cm.`, 'cm'),
                sa(2, 'Tam giác ABC có chu vi 30 cm. Tính chu vi của tam giác có ba đỉnh là trung điểm ba cạnh của tam giác ABC.', ['15'], 'Mỗi cạnh của tam giác mới là một đường trung bình, bằng nửa cạnh tương ứng của tam giác ABC. Chu vi bằng 30 : 2 = 15 cm.', 'cm'),
                sa(3, r`Để đo khoảng cách giữa hai cây \(B\), \(C\) ở hai đầu một ao, bạn Minh chọn điểm \(A\), cắm cọc tại trung điểm \(M\) của \(AB\), trung điểm \(N\) của \(AC\) và đo được \(MN = 38\) m. Khoảng cách \(BC\) là bao nhiêu mét?`, ['76'], r`\(MN\) là đường trung bình của tam giác \(ABC\) nên \(BC = 2\cdot38 = 76\) m.`, 'm'),
              ],
            },
            {
              slug: 'song-song-thang-hang-duong-trung-binh',
              title: 'Chứng minh hai đường thẳng song song, ba điểm thẳng hàng',
              levels: [3, 4],
              knowledge: 'Tính chất đường trung bình; đường thẳng qua trung điểm một cạnh song song cạnh thứ hai thì đi qua trung điểm cạnh thứ ba; tiên đề Euclid.',
              signs: 'Hình có nhiều trung điểm; đề yêu cầu chứng minh song song, thẳng hàng, trung điểm hay tỉ số đoạn thẳng.',
              method: 'Tạo các đường trung bình (thường lấy thêm trung điểm phụ) để có các đường song song; dùng tiên đề Euclid để suy ra thẳng hàng.',
              steps: `- **Bước 1.** Xác định (hoặc lấy thêm) trung điểm để có đường trung bình.
- **Bước 2.** Suy ra các cặp đường thẳng song song.
- **Bước 3.** Dùng tiên đề Euclid hoặc tính chất trung điểm để kết luận.`,
              mistakes: '- Kết luận thẳng hàng mà chưa chỉ ra hai đường thẳng cùng đi qua một điểm và cùng song song với một đường thẳng.',
              example: r`Cho tam giác \(ABC\), \(M\) là trung điểm của \(AB\). Qua \(M\) kẻ đường thẳng song song với \(BC\), cắt \(AC\) tại \(N\). Chứng minh \(N\) là trung điểm của \(AC\).`,
              solution: r`Vì \(MN \parallel BC\), theo định lí Thalès \(\dfrac{AN}{NC} = \dfrac{AM}{MB} = 1\), suy ra \(AN = NC\): \(N\) là trung điểm của \(AC\).`,
              exercises: [
                es(3, r`Cho hình thang \(ABCD\) (\(AB \parallel CD\)), \(M\), \(N\) lần lượt là trung điểm của \(AD\), \(BC\). Chứng minh \(MN \parallel CD\).`, r`Gọi \(I\) là trung điểm của \(AC\). \(MI\) là đường trung bình của tam giác \(ADC\) nên \(MI \parallel DC\). \(NI\) là đường trung bình của tam giác \(CAB\) nên \(NI \parallel AB\), mà \(AB \parallel DC\) nên \(NI \parallel DC\).
Qua \(I\) chỉ có một đường thẳng song song với \(DC\) (tiên đề Euclid) nên \(M\), \(I\), \(N\) thẳng hàng, do đó \(MN \parallel CD\).`),
                es(4, r`Cho tam giác \(ABC\), đường trung tuyến \(AM\). Gọi \(I\) là trung điểm của \(AM\); tia \(BI\) cắt \(AC\) tại \(D\). Chứng minh \(AD = \dfrac{1}{2}DC\).`, r`Gọi \(E\) là trung điểm của \(DC\). \(ME\) là đường trung bình của tam giác \(BCD\) nên \(ME \parallel BD\).
Trong tam giác \(AME\), \(I\) là trung điểm của \(AM\) và \(ID \parallel ME\) nên \(D\) là trung điểm của \(AE\).
Vậy \(AD = DE = EC\), suy ra \(AD = \dfrac12 DC\).`),
              ],
            },
          ],
        },
        {
          title: 'Đường trung bình và tứ giác',
          description: 'Nhận biết tứ giác đặc biệt có các đỉnh là trung điểm.',
          types: [
            {
              slug: 'tu-giac-tao-boi-trung-diem',
              title: 'Chứng minh tứ giác đặc biệt nhờ đường trung bình',
              levels: [3, 4],
              knowledge: 'Tính chất đường trung bình; dấu hiệu nhận biết hình bình hành, hình chữ nhật, hình thoi, hình vuông.',
              signs: 'Tứ giác có các đỉnh là trung điểm các cạnh của một tứ giác (hoặc tam giác) khác.',
              method: 'Dùng đường trung bình của các tam giác tạo bởi đường chéo để có các cặp cạnh song song và bằng nhau; điều kiện về đường chéo của tứ giác ban đầu quyết định dạng tứ giác mới.',
              steps: `- **Bước 1.** Vẽ đường chéo của tứ giác ban đầu.
- **Bước 2.** Mỗi cạnh của tứ giác mới là đường trung bình của một tam giác: song song và bằng nửa đường chéo.
- **Bước 3.** Kết luận hình bình hành; thêm điều kiện (đường chéo vuông góc, bằng nhau) cho hình chữ nhật, hình thoi.`,
              mistakes: '- Nhầm: hai đường chéo vuông góc cho hình thoi (thực ra cho hình chữ nhật), hai đường chéo bằng nhau cho hình chữ nhật (thực ra cho hình thoi).',
              example: r`Cho tứ giác \(ABCD\); \(E\), \(F\), \(G\), \(H\) lần lượt là trung điểm của \(AB\), \(BC\), \(CD\), \(DA\). Chứng minh \(EFGH\) là hình bình hành.`,
              solution: r`\(EF\) là đường trung bình của tam giác \(ABC\): \(EF \parallel AC\), \(EF = \dfrac{AC}{2}\). \(HG\) là đường trung bình của tam giác \(ADC\): \(HG \parallel AC\), \(HG = \dfrac{AC}{2}\).
Do đó \(EF \parallel HG\) và \(EF = HG\): \(EFGH\) là hình bình hành.`,
              exercises: [
                mcq(3, r`Tứ giác \(ABCD\) có hai đường chéo bằng nhau (\(AC = BD\)). Tứ giác có bốn đỉnh là trung điểm bốn cạnh của \(ABCD\) là`, ['hình thoi', 'hình chữ nhật', 'hình vuông', 'hình thang cân'], 'A', r`Tứ giác mới là hình bình hành có hai cạnh kề lần lượt bằng \(\dfrac{AC}{2}\) và \(\dfrac{BD}{2}\). Khi \(AC = BD\), hai cạnh kề bằng nhau nên đó là hình thoi.`),
                es(4, r`Với tứ giác \(ABCD\) và hình bình hành \(EFGH\) ở ví dụ, hai đường chéo \(AC\), \(BD\) cần điều kiện gì để \(EFGH\) là hình chữ nhật? là hình vuông?`, r`\(EF \parallel AC\), \(FG \parallel BD\). \(EFGH\) là hình chữ nhật khi \(EF \perp FG\), tức là \(AC \perp BD\).
\(EFGH\) là hình vuông khi đồng thời \(AC \perp BD\) và \(AC = BD\) (hai cạnh kề \(\dfrac{AC}{2}\), \(\dfrac{BD}{2}\) bằng nhau).`),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 17 ----------------
    {
      slug: 'bai-17-tinh-chat-duong-phan-giac-cua-tam-giac',
      difficulty: 2,
      objectives: `- Giải thích tính chất đường phân giác trong của tam giác.
- Vận dụng để tính độ dài, tỉ số đoạn thẳng; kết hợp với định lí Thalès để chứng minh.`,
      prerequisites: '- Định lí Thalès (Bài 15).\n- Tia phân giác của một góc; diện tích tam giác.',
      concepts: 'Đường phân giác trong của tam giác.',
      theorems: 'Trong tam giác, đường phân giác của một góc chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với hai cạnh kề hai đoạn ấy.',
      formulas: r`\(AD\) là đường phân giác của góc \(A\) trong \(\triangle ABC\) (\(D \in BC\)) \(\Rightarrow \dfrac{DB}{DC} = \dfrac{AB}{AC}\).`,
      properties: r`- Từ \(\dfrac{DB}{DC} = \dfrac{AB}{AC}\) suy ra \(\dfrac{DB}{BC} = \dfrac{AB}{AB + AC}\) (tính chất của dãy tỉ số bằng nhau).`,
      themes: [
        {
          title: 'Tính chất đường phân giác của tam giác',
          description: 'Tính độ dài, tỉ số; kết hợp với định lí Thalès.',
          types: [
            {
              slug: 'tinh-do-dai-canh-duong-phan-giac',
              title: 'Tính độ dài cạnh',
              levels: [1, 2],
              knowledge: r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC}\); tính chất dãy tỉ số bằng nhau.`,
              signs: 'Tam giác có đường phân giác của một góc; biết một số cạnh, đoạn thẳng và cần tính đoạn còn lại.',
              method: 'Viết tỉ lệ thức theo tính chất đường phân giác; nếu biết cả cạnh BC, dùng tính chất dãy tỉ số bằng nhau.',
              steps: r`- **Bước 1.** Viết \(\dfrac{DB}{DC} = \dfrac{AB}{AC}\).
- **Bước 2.** Thay số; nếu biết \(BC\) thì dùng \(\dfrac{DB}{AB} = \dfrac{DC}{AC} = \dfrac{BC}{AB + AC}\).
- **Bước 3.** Tính và kết luận.`,
              mistakes: '- Ghép sai: viết DB/DC = AC/AB.\n- Áp dụng cho đường trung tuyến hoặc đường cao.',
              example: r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 9\) cm, \(BC = 10\) cm, \(AD\) là đường phân giác. Tính \(DB\), \(DC\).`,
              solution: r`\(\dfrac{DB}{AB} = \dfrac{DC}{AC} = \dfrac{DB + DC}{AB + AC} = \dfrac{10}{15} = \dfrac{2}{3}\). Suy ra \(DB = 4\) cm, \(DC = 6\) cm.`,
              exercises: [
                sa(1, r`\(AD\) là đường phân giác của tam giác \(ABC\), \(AB = 4\) cm, \(AC = 6\) cm, \(DB = 2\) cm. Tính \(DC\).`, ['3'], r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac{2}{3}\) nên \(DC = 3\) cm.`, 'cm'),
                sa(2, r`Tam giác \(ABC\) có \(AB = 5\) cm, \(AC = 7\) cm, \(BC = 6\) cm, \(AD\) là đường phân giác. Tính \(DB\).`, ['2,5'], r`\(\dfrac{DB}{AB} = \dfrac{BC}{AB + AC} = \dfrac{6}{12}\) nên \(DB = 2{,}5\) cm.`, 'cm'),
              ],
            },
            {
              slug: 'ti-so-dien-tich-duong-phan-giac',
              title: 'Tính tỉ số đoạn thẳng, tỉ số diện tích nhờ đường phân giác',
              levels: [2, 3],
              knowledge: r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC}\); hai tam giác có chung đường cao thì tỉ số diện tích bằng tỉ số hai đáy.`,
              signs: 'Đề hỏi tỉ số hai đoạn trên cạnh đối diện, hoặc tỉ số (giá trị) diện tích các tam giác được đường phân giác chia ra.',
              method: r`Tính \(\dfrac{DB}{DC}\) theo tính chất đường phân giác; tam giác \(ABD\), \(ACD\) có chung đường cao từ \(A\) nên \(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac{DB}{DC}\).`,
              steps: `- **Bước 1.** Tính tỉ số DB : DC.
- **Bước 2.** Chuyển sang tỉ số diện tích (chung đường cao từ A).
- **Bước 3.** Tính diện tích cần tìm (nếu biết diện tích tam giác ban đầu).`,
              mistakes: '- Lấy tỉ số diện tích bằng bình phương tỉ số cạnh (nhầm với hai tam giác đồng dạng).',
              example: r`Tam giác \(ABC\) có \(AB = 3\) cm, \(AC = 5\) cm, \(AD\) là đường phân giác. Tính tỉ số diện tích hai tam giác \(ABD\) và \(ACD\).`,
              solution: r`Hai tam giác có chung đường cao kẻ từ \(A\) nên \(\dfrac{S_{ABD}}{S_{ACD}} = \dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac{3}{5}\).`,
              exercises: [
                mcq(2, r`\(AD\) là đường phân giác của tam giác \(ABC\), \(AB = 8\) cm, \(AC = 12\) cm. Tỉ số \(\dfrac{DB}{DC}\) bằng`, [r`\(\dfrac{2}{3}\)`, r`\(\dfrac{3}{2}\)`, r`\(\dfrac{2}{5}\)`, r`\(\dfrac{3}{5}\)`], 'A', r`\(\dfrac{DB}{DC} = \dfrac{AB}{AC} = \dfrac{8}{12} = \dfrac{2}{3}\).`),
                sa(3, r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 8\) cm, diện tích 21 cm², \(AD\) là đường phân giác. Tính diện tích tam giác \(ABD\).`, ['9'], r`\(\dfrac{DB}{BC} = \dfrac{AB}{AB + AC} = \dfrac{6}{14} = \dfrac{3}{7}\). Hai tam giác \(ABD\), \(ABC\) chung đường cao từ \(A\) nên \(S_{ABD} = \dfrac37\cdot21 = 9\) cm².`, 'cm²'),
              ],
            },
            {
              slug: 'phan-giac-ket-hop-thales',
              title: 'Kết hợp tính chất đường phân giác và định lí Thalès',
              levels: [3, 4],
              knowledge: 'Tính chất đường phân giác; định lí Thalès; góc so le trong; dấu hiệu nhận biết hình thoi.',
              signs: 'Hình có đường phân giác và đường thẳng song song với một cạnh; cần tính đoạn thẳng hoặc chứng minh tỉ lệ thức, tam giác cân, hình thoi.',
              method: 'Dùng tính chất đường phân giác để có tỉ số trên cạnh đối diện, rồi dùng định lí Thalès để chuyển tỉ số sang cạnh khác.',
              steps: `- **Bước 1.** Viết tỉ số do đường phân giác tạo ra.
- **Bước 2.** Viết tỉ số do đường thẳng song song tạo ra (định lí Thalès).
- **Bước 3.** Ghép các tỉ số bằng nhau, tính hoặc kết luận.`,
              mistakes: '- Dùng định lí Thalès trong tam giác không chứa đường thẳng song song.',
              example: r`Tam giác \(ABC\) có \(AB = 6\) cm, \(AC = 9\) cm, đường phân giác \(AD\). Qua \(D\) kẻ \(DE \parallel AB\) (\(E \in AC\)). Tính \(EC\) và \(AE\).`,
              solution: r`\(\dfrac{DB}{DC} = \dfrac{6}{9} = \dfrac23\) nên \(\dfrac{CD}{CB} = \dfrac35\). Trong tam giác \(CAB\) có \(DE \parallel AB\): \(\dfrac{CE}{CA} = \dfrac{CD}{CB} = \dfrac35\).
Do đó \(CE = 5{,}4\) cm và \(AE = 3{,}6\) cm.`,
              exercises: [
                sa(3, r`Tam giác \(ABC\) có \(AB = 10\) cm, \(AC = 15\) cm, đường phân giác \(AD\). Qua \(D\) kẻ \(DE \parallel AB\) (\(E \in AC\)). Tính \(EC\).`, ['9'], r`\(\dfrac{DB}{DC} = \dfrac{10}{15} = \dfrac23\) nên \(\dfrac{CD}{CB} = \dfrac35\). Theo định lí Thalès: \(\dfrac{CE}{CA} = \dfrac{CD}{CB} = \dfrac35\), suy ra \(CE = 9\) cm.`, 'cm'),
                es(4, r`Cho tam giác \(ABC\), đường phân giác \(AD\). Qua \(D\) kẻ đường thẳng song song với \(AB\) cắt \(AC\) tại \(E\) và đường thẳng song song với \(AC\) cắt \(AB\) tại \(F\). Chứng minh \(AEDF\) là hình thoi và \(\dfrac{BF}{FA} = \dfrac{AB}{AC}\).`, r`\(AEDF\) có \(AE \parallel DF\), \(AF \parallel DE\) nên là hình bình hành; đường chéo \(AD\) là phân giác của góc \(A\) nên \(AEDF\) là hình thoi.
Trong tam giác \(BAC\) có \(DF \parallel AC\): \(\dfrac{BF}{FA} = \dfrac{BD}{DC}\). Mà \(\dfrac{BD}{DC} = \dfrac{AB}{AC}\) nên \(\dfrac{BF}{FA} = \dfrac{AB}{AC}\).`),
              ],
            },
          ],
        },
      ],
    },
  ],
};
