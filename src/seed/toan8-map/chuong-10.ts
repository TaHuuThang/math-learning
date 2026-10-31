import { es, mcq, r, sa, tf, type MapChapter } from './types';

/** Chương X. Một số hình khối trong thực tiễn – Bài 38, Bài 39. */
export const CHUONG_10: MapChapter = {
  code: 'X',
  objectives: `- Mô tả đỉnh, mặt đáy, mặt bên, cạnh bên, đường cao, trung đoạn của hình chóp tam giác đều và hình chóp tứ giác đều; tạo lập các hình đó.
- Tính diện tích xung quanh, thể tích của hình chóp tam giác đều, hình chóp tứ giác đều.
- Giải quyết bài toán thực tiễn gắn với các hình khối này.`,
  keyPoints: r`- Hình chóp tam giác đều: đáy là tam giác đều, các mặt bên là những tam giác cân bằng nhau có chung đỉnh.
- Hình chóp tứ giác đều: đáy là hình vuông, các mặt bên là những tam giác cân bằng nhau có chung đỉnh.
- Diện tích xung quanh \(S_{xq} = p\cdot d\) (\(p\): nửa chu vi đáy, \(d\): trung đoạn); thể tích \(V = \dfrac13 S\cdot h\) (\(S\): diện tích đáy, \(h\): chiều cao).`,
  formulas: r`\[S_{xq} = p\cdot d;\qquad S_{tp} = S_{xq} + S_{\text{đáy}};\qquad V = \dfrac13 S\cdot h\]`,
  verify: { status: 'verified', note: 'Tên chương, tên bài và thứ tự đối chiếu với mục lục SGK Toán 8 Kết nối tri thức tập 2 (VietJack) và PPCT 2026-2027.' },
  aux: [
    { slug: 'luyen-tap-chung-10a', objectives: 'Củng cố nhận biết, tính diện tích xung quanh và thể tích của hình chóp tam giác đều, hình chóp tứ giác đều.' },
    { slug: 'bai-tap-cuoi-chuong-10', objectives: 'Ôn tập toàn Chương X: hình chóp tam giác đều, hình chóp tứ giác đều và bài toán thực tế; chuẩn bị kiểm tra cuối chương.' },
  ],
  lessons: [
    // ---------------- Bài 38 ----------------
    {
      slug: 'bai-38-hinh-chop-tam-giac-deu',
      difficulty: 2,
      objectives: `- Mô tả đỉnh, mặt đáy, mặt bên, cạnh bên, đường cao, trung đoạn của hình chóp tam giác đều; tạo lập hình chóp tam giác đều.
- Tính diện tích xung quanh, thể tích của hình chóp tam giác đều.
- Giải quyết bài toán thực tiễn gắn với hình chóp tam giác đều.`,
      prerequisites: '- Tam giác đều, diện tích tam giác (Toán 6, Toán 7); hình lăng trụ đứng tam giác (Toán 7).\n- Định lí Pythagore (Bài 35).',
      concepts: r`Hình chóp tam giác đều \(S.ABC\): đỉnh \(S\); mặt đáy \(ABC\) là tam giác đều; mặt bên; cạnh bên; đường cao \(SH\) (\(H\) là trọng tâm tam giác đáy); trung đoạn (đường cao của mặt bên kẻ từ đỉnh \(S\)).`,
      formulas: r`\(S_{xq} = p\cdot d\) (\(p\): nửa chu vi đáy, \(d\): trung đoạn); \(V = \dfrac13 S\cdot h\) (\(S\): diện tích đáy, \(h\): chiều cao).`,
      properties: `- Hình chóp tam giác đều có 4 mặt (1 mặt đáy, 3 mặt bên), 6 cạnh (3 cạnh đáy, 3 cạnh bên), 4 đỉnh.
- Các cạnh bên bằng nhau; các mặt bên là những tam giác cân bằng nhau.
- Diện tích toàn phần bằng tổng diện tích xung quanh và diện tích đáy.`,
      themes: [
        {
          title: 'Hình chóp tam giác đều',
          description: 'Các yếu tố của hình chóp tam giác đều.',
          types: [
            {
              slug: 'nhan-biet-hinh-chop-tam-giac-deu',
              title: 'Nhận biết hình chóp tam giác đều',
              levels: [1, 2],
              knowledge: 'Hình chóp tam giác đều có đáy là tam giác đều, các mặt bên là những tam giác cân bằng nhau có chung đỉnh; 4 mặt, 6 cạnh, 4 đỉnh.',
              signs: 'Đề yêu cầu gọi tên đỉnh, mặt đáy, mặt bên, cạnh bên, đường cao, trung đoạn; tính độ dài các cạnh bằng nhau; nhận biết hình khai triển.',
              method: 'Dựa vào định nghĩa: đáy là tam giác đều, các cạnh bên bằng nhau, mặt bên là tam giác cân.',
              steps: r`- **Bước 1.** Xác định đỉnh \(S\) và mặt đáy.
- **Bước 2.** Liệt kê mặt bên, cạnh bên, cạnh đáy; dùng tính chất các cạnh bên bằng nhau, các cạnh đáy bằng nhau.
- **Bước 3.** Xác định đường cao (từ \(S\) vuông góc với đáy) và trung đoạn (từ \(S\) vuông góc với một cạnh đáy, nằm trong mặt bên).`,
              mistakes: '- Nhầm trung đoạn với cạnh bên hoặc với đường cao của hình chóp.\n- Cho rằng mặt bên luôn là tam giác đều (thường chỉ là tam giác cân).',
              example: r`Cho hình chóp tam giác đều \(S.ABC\) có \(SA = 5\) cm, \(AB = 6\) cm. Kể tên các mặt bên, cạnh bên, mặt đáy; tính \(SB\), \(BC\).`,
              solution: r`Mặt bên: \(SAB\), \(SBC\), \(SCA\); cạnh bên: \(SA\), \(SB\), \(SC\); mặt đáy: \(ABC\). \(SB = SA = 5\) cm; \(BC = AB = 6\) cm.`,
              exercises: [
                mcq(1, 'Hình chóp tam giác đều có bao nhiêu cạnh?', ['6', '4', '3', '8'], 'A', '3 cạnh đáy và 3 cạnh bên.'),
                tf(2, r`Cho hình chóp tam giác đều \(S.ABC\). Mỗi khẳng định sau đúng hay sai?`, [
                  [r`Đáy \(ABC\) là tam giác đều.`, true],
                  [r`Các cạnh bên \(SA\), \(SB\), \(SC\) bằng nhau.`, true],
                  [r`Mặt bên \(SAB\) luôn là tam giác đều.`, false],
                  ['Hình chóp có 4 mặt.', true],
                ], r`Mặt bên là tam giác cân tại \(S\), chỉ là tam giác đều khi cạnh bên bằng cạnh đáy.`),
              ],
            },
          ],
        },
        {
          title: 'Diện tích xung quanh và thể tích',
          description: 'Tính diện tích xung quanh, thể tích; bài tập tổng hợp.',
          types: [
            {
              slug: 'dien-tich-xung-quanh-chop-tam-giac',
              title: 'Tính diện tích xung quanh của hình chóp tam giác đều',
              legacy: ['Tính diện tích xung quanh'],
              levels: [2, 3],
              knowledge: r`\(S_{xq} = p\cdot d\), \(p = \dfrac{3a}{2}\) với \(a\) là cạnh đáy, \(d\) là trung đoạn; khi biết cạnh bên \(b\): \(d^2 = b^2 - \left(\dfrac a2\right)^2\).`,
              signs: 'Đề cho cạnh đáy và trung đoạn (hoặc cạnh bên), yêu cầu tính diện tích xung quanh, diện tích toàn phần.',
              method: 'Tính nửa chu vi đáy, xác định trung đoạn (dùng định lí Pythagore nếu chỉ biết cạnh bên), áp dụng công thức.',
              steps: r`- **Bước 1.** Tính nửa chu vi đáy \(p = \dfrac{3a}{2}\).
- **Bước 2.** Tìm trung đoạn \(d\) (nếu biết cạnh bên \(b\): \(d^2 = b^2 - \left(\dfrac a2\right)^2\)).
- **Bước 3.** \(S_{xq} = p\cdot d\).`,
              mistakes: '- Dùng chu vi đáy thay cho nửa chu vi.\n- Dùng cạnh bên thay cho trung đoạn.',
              example: 'Tính diện tích xung quanh của hình chóp tam giác đều có cạnh đáy 6 cm và trung đoạn 5 cm.',
              solution: r`\(p = \dfrac{3\cdot6}{2} = 9\) cm; \(S_{xq} = 9\cdot5 = 45\) cm².`,
              exercises: [
                sa(2, 'Tính diện tích xung quanh của hình chóp tam giác đều có cạnh đáy 8 cm và trung đoạn 10 cm.', ['120'], r`\(p = 12\) cm, \(S_{xq} = 12\cdot10 = 120\) cm².`, 'cm²'),
                sa(3, 'Hình chóp tam giác đều có cạnh đáy 6 cm và cạnh bên 5 cm. Tính diện tích xung quanh.', ['36'], r`Trung đoạn \(d = \sqrt{5^2 - 3^2} = 4\) cm; \(p = 9\) cm; \(S_{xq} = 36\) cm².`, 'cm²'),
              ],
            },
            {
              slug: 'the-tich-chop-tam-giac',
              title: 'Tính thể tích của hình chóp tam giác đều',
              legacy: ['Tính thể tích'],
              levels: [2, 3],
              knowledge: r`\(V = \dfrac13 S\cdot h\), \(S\) là diện tích tam giác đáy, \(h\) là chiều cao của hình chóp.`,
              signs: 'Đề cho diện tích đáy (hoặc cạnh đáy và chiều cao tam giác đáy) và chiều cao hình chóp; hoặc cho thể tích, tìm chiều cao.',
              method: 'Tính diện tích đáy rồi áp dụng công thức thể tích; khi biết thể tích thì h = 3V : S.',
              steps: r`- **Bước 1.** Tính diện tích đáy \(S = \dfrac12\cdot a\cdot h_{\text{đáy}}\).
- **Bước 2.** \(V = \dfrac13 S\cdot h\) (hoặc \(h = \dfrac{3V}{S}\)).
- **Bước 3.** Ghi đơn vị thể tích (cm³, m³).`,
              mistakes: '- Quên nhân với 1/3.\n- Nhầm chiều cao hình chóp với trung đoạn hoặc với chiều cao tam giác đáy.',
              example: 'Hình chóp tam giác đều có cạnh đáy 6 cm, chiều cao của tam giác đáy khoảng 5,2 cm và chiều cao của hình chóp 10 cm. Tính thể tích hình chóp.',
              solution: r`\(S = \dfrac12\cdot6\cdot5{,}2 = 15{,}6\) cm². \(V = \dfrac13\cdot15{,}6\cdot10 = 52\) cm³.`,
              exercises: [
                sa(2, 'Hình chóp tam giác đều có diện tích đáy 27 cm² và chiều cao 8 cm. Tính thể tích của hình chóp.', ['72'], r`\(V = \dfrac13\cdot27\cdot8 = 72\) cm³.`, 'cm³'),
                sa(3, 'Một hình chóp tam giác đều có thể tích 60 cm³ và diện tích đáy 20 cm². Tính chiều cao của hình chóp.', ['9'], r`\(h = \dfrac{3V}{S} = \dfrac{180}{20} = 9\) cm.`, 'cm'),
              ],
            },
            {
              slug: 'tong-hop-chop-tam-giac',
              title: 'Bài tập tổng hợp về hình chóp tam giác đều',
              legacy: ['Bài tập tổng hợp'],
              levels: [3, 4],
              knowledge: 'Định lí Pythagore trong mặt bên (cạnh bên – trung đoạn – nửa cạnh đáy) và trong tam giác đáy; công thức diện tích xung quanh, toàn phần, thể tích.',
              signs: 'Đề cho các yếu tố gián tiếp (cạnh bên, mọi cạnh bằng nhau…), yêu cầu tính nhiều đại lượng.',
              method: 'Dùng định lí Pythagore để tìm trung đoạn hoặc chiều cao còn thiếu, rồi áp dụng công thức.',
              steps: `- **Bước 1.** Vẽ hình, xác định tam giác vuông chứa đại lượng cần tìm.
- **Bước 2.** Tính trung đoạn (hoặc cạnh, chiều cao) bằng định lí Pythagore.
- **Bước 3.** Tính diện tích xung quanh, toàn phần, thể tích theo yêu cầu.`,
              mistakes: '- Xác định sai tam giác vuông (lấy cả cạnh đáy thay vì nửa cạnh đáy).\n- Làm tròn sớm ở các bước trung gian.',
              example: 'Hình chóp tam giác đều có cạnh đáy 10 cm, cạnh bên 13 cm. Tính diện tích xung quanh.',
              solution: r`Trung đoạn \(d = \sqrt{13^2 - 5^2} = 12\) cm; \(p = 15\) cm; \(S_{xq} = 15\cdot12 = 180\) cm².`,
              exercises: [
                sa(3, 'Hình chóp tam giác đều có cạnh bên 10 cm và cạnh đáy 12 cm. Tính diện tích xung quanh.', ['144'], r`\(d = \sqrt{10^2 - 6^2} = 8\) cm; \(p = 18\) cm; \(S_{xq} = 144\) cm².`, 'cm²'),
                es(4, r`Hình chóp tam giác đều \(S.ABC\) có tất cả các cạnh đều bằng 6 cm. Tính diện tích toàn phần của hình chóp (làm tròn đến hàng phần mười).`, r`Các mặt đều là tam giác đều cạnh 6 cm. Trung đoạn (cũng là chiều cao của tam giác đáy): \(d = \sqrt{6^2 - 3^2} = \sqrt{27} \approx 5{,}196\) cm.
\(S_{xq} = 9\cdot\sqrt{27} \approx 46{,}77\) cm²; \(S_{\text{đáy}} = \dfrac12\cdot6\cdot\sqrt{27} \approx 15{,}59\) cm².
\(S_{tp} \approx 46{,}77 + 15{,}59 = 62{,}36 \approx 62{,}4\) cm².`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng thực tế',
          description: 'Lều, hộp quà, chi tiết trang trí có dạng hình chóp tam giác đều.',
          types: [
            {
              slug: 'thuc-te-chop-tam-giac',
              title: 'Bài toán thực tế về hình chóp tam giác đều',
              legacy: ['Bài toán thực tế'],
              levels: [3],
              knowledge: 'Diện tích xung quanh (lượng vật liệu phủ các mặt bên), thể tích (lượng chứa, khối lượng vật liệu).',
              signs: 'Lều, hộp quà, khối gỗ, chi tiết trang trí có dạng hình chóp tam giác đều.',
              method: 'Nhận ra dạng hình chóp, xác định cạnh đáy, trung đoạn, chiều cao, rồi áp dụng công thức phù hợp với câu hỏi.',
              steps: `- **Bước 1.** Xác định đại lượng cần tính là diện tích (mặt nào) hay thể tích.
- **Bước 2.** Áp dụng công thức.
- **Bước 3.** Tính thêm theo yêu cầu (khối lượng, chi phí), trả lời kèm đơn vị.`,
              mistakes: '- Tính cả diện tích đáy khi đề chỉ cần các mặt bên (hoặc ngược lại).\n- Nhầm đơn vị diện tích và thể tích.',
              example: 'Một chiếc lều có dạng hình chóp tam giác đều, cạnh đáy 3 m, trung đoạn 2,5 m, không có mặt đáy. Tính diện tích vải cần để làm lều.',
              solution: r`\(p = 4{,}5\) m; diện tích vải \(S_{xq} = 4{,}5\cdot2{,}5 = 11{,}25\) m².`,
              exercises: [
                sa(3, 'Một hộp quà có dạng hình chóp tam giác đều với cạnh đáy 12 cm và trung đoạn 15 cm. Người ta dán giấy màu phủ kín ba mặt bên. Tính diện tích giấy màu cần dùng (không tính mép dán).', ['270'], r`\(p = 18\) cm; \(S_{xq} = 18\cdot15 = 270\) cm².`, 'cm²'),
                sa(3, 'Một khối gỗ có dạng hình chóp tam giác đều với diện tích đáy 36 cm² và chiều cao 10 cm. Biết mỗi xăng-ti-mét khối gỗ nặng 0,8 g. Tính khối lượng của khối gỗ.', ['96'], r`\(V = \dfrac13\cdot36\cdot10 = 120\) cm³; khối lượng \(120\cdot0{,}8 = 96\) g.`, 'g'),
              ],
            },
          ],
        },
      ],
    },
    // ---------------- Bài 39 ----------------
    {
      slug: 'bai-39-hinh-chop-tu-giac-deu',
      difficulty: 2,
      objectives: `- Mô tả đỉnh, mặt đáy, mặt bên, cạnh bên, đường cao, trung đoạn của hình chóp tứ giác đều; tạo lập hình chóp tứ giác đều.
- Tính diện tích xung quanh, thể tích của hình chóp tứ giác đều.
- Giải quyết bài toán thực tiễn gắn với hình chóp tứ giác đều.`,
      prerequisites: '- Hình vuông, diện tích hình vuông (Toán 6).\n- Hình chóp tam giác đều (Bài 38); định lí Pythagore (Bài 35).',
      concepts: r`Hình chóp tứ giác đều \(S.ABCD\): đỉnh \(S\); mặt đáy \(ABCD\) là hình vuông; mặt bên; cạnh bên; đường cao \(SO\) (\(O\) là giao điểm hai đường chéo của đáy); trung đoạn.`,
      formulas: r`\(S_{xq} = p\cdot d\) (\(p = 2a\) là nửa chu vi đáy cạnh \(a\), \(d\) là trung đoạn); \(V = \dfrac13 a^2 h\).`,
      properties: r`- Hình chóp tứ giác đều có 5 mặt (1 mặt đáy, 4 mặt bên), 8 cạnh (4 cạnh đáy, 4 cạnh bên), 5 đỉnh.
- Các cạnh bên bằng nhau; các mặt bên là những tam giác cân bằng nhau.
- Chiều cao \(h\), trung đoạn \(d\) và nửa cạnh đáy liên hệ: \(d^2 = h^2 + \left(\dfrac a2\right)^2\).`,
      themes: [
        {
          title: 'Hình chóp tứ giác đều',
          description: 'Các yếu tố của hình chóp tứ giác đều.',
          types: [
            {
              slug: 'nhan-biet-hinh-chop-tu-giac-deu',
              title: 'Nhận biết hình chóp tứ giác đều',
              levels: [1, 2],
              knowledge: 'Hình chóp tứ giác đều có đáy là hình vuông, các mặt bên là những tam giác cân bằng nhau có chung đỉnh; 5 mặt, 8 cạnh, 5 đỉnh.',
              signs: 'Đề yêu cầu gọi tên các yếu tố, tính độ dài các cạnh bằng nhau, đếm số mặt, cạnh, đỉnh, nhận biết hình khai triển.',
              method: 'Dựa vào định nghĩa: đáy là hình vuông, các cạnh bên bằng nhau.',
              steps: r`- **Bước 1.** Xác định đỉnh \(S\) và mặt đáy hình vuông.
- **Bước 2.** Liệt kê mặt bên, cạnh bên, cạnh đáy.
- **Bước 3.** Xác định đường cao \(SO\) (\(O\) là giao điểm hai đường chéo của đáy) và trung đoạn.`,
              mistakes: '- Cho rằng đáy là hình chữ nhật hoặc hình thoi bất kì.\n- Nhầm trung đoạn với cạnh bên.',
              example: r`Cho hình chóp tứ giác đều \(S.ABCD\) có \(SA = 5\) cm, \(AB = 4\) cm. Kể tên các mặt bên, cạnh bên; tính \(SC\), \(CD\).`,
              solution: r`Mặt bên: \(SAB\), \(SBC\), \(SCD\), \(SDA\); cạnh bên: \(SA\), \(SB\), \(SC\), \(SD\). \(SC = SA = 5\) cm; \(CD = AB = 4\) cm.`,
              exercises: [
                mcq(1, 'Hình chóp tứ giác đều có mặt đáy là', ['hình vuông', 'hình chữ nhật', 'hình thoi', 'tam giác đều'], 'A', 'Theo định nghĩa, đáy của hình chóp tứ giác đều là hình vuông.'),
                sa(2, 'Hình chóp tứ giác đều có tất cả bao nhiêu cạnh?', ['8'], '4 cạnh đáy và 4 cạnh bên.'),
                tf(2, r`Cho hình chóp tứ giác đều \(S.ABCD\) có \(SA = 7\) cm, \(AB = 5\) cm. Mỗi khẳng định sau đúng hay sai?`, [
                  [r`\(SC = 7\) cm.`, true],
                  [r`\(BC = 7\) cm.`, false],
                  ['Hình chóp có 5 mặt.', true],
                  [r`Chân đường cao kẻ từ \(S\) là giao điểm hai đường chéo của đáy.`, true],
                ], r`\(BC = AB = 5\) cm (đáy là hình vuông). Các ý còn lại đúng.`),
              ],
            },
          ],
        },
        {
          title: 'Diện tích xung quanh và thể tích',
          description: 'Tính diện tích xung quanh, thể tích; bài tập tổng hợp.',
          types: [
            {
              slug: 'dien-tich-xung-quanh-chop-tu-giac',
              title: 'Tính diện tích xung quanh của hình chóp tứ giác đều',
              legacy: ['Tính diện tích xung quanh'],
              levels: [2, 3],
              knowledge: r`\(S_{xq} = p\cdot d\), \(p = 2a\); \(S_{tp} = S_{xq} + a^2\).`,
              signs: 'Đề cho cạnh đáy và trung đoạn (hoặc cạnh bên), yêu cầu tính diện tích xung quanh, toàn phần.',
              method: 'Tính nửa chu vi đáy, xác định trung đoạn (định lí Pythagore nếu cần), áp dụng công thức.',
              steps: r`- **Bước 1.** Tính \(p = 2a\).
- **Bước 2.** Tìm trung đoạn \(d\) (biết cạnh bên \(b\): \(d^2 = b^2 - \left(\dfrac a2\right)^2\)).
- **Bước 3.** \(S_{xq} = p\cdot d\); nếu cần, \(S_{tp} = S_{xq} + a^2\).`,
              mistakes: '- Dùng chu vi đáy 4a thay cho nửa chu vi 2a.\n- Quên cộng diện tích đáy khi tính diện tích toàn phần.',
              example: 'Tính diện tích xung quanh của hình chóp tứ giác đều có cạnh đáy 4 cm và trung đoạn 6 cm.',
              solution: r`\(p = 2\cdot4 = 8\) cm; \(S_{xq} = 8\cdot6 = 48\) cm².`,
              exercises: [
                sa(2, 'Hình chóp tứ giác đều có cạnh đáy 10 cm và trung đoạn 12 cm. Tính diện tích xung quanh.', ['240'], r`\(p = 20\) cm; \(S_{xq} = 240\) cm².`, 'cm²'),
                sa(3, 'Hình chóp tứ giác đều có cạnh đáy 6 cm và cạnh bên 5 cm. Tính diện tích toàn phần.', ['84'], r`\(d = \sqrt{5^2 - 3^2} = 4\) cm; \(S_{xq} = 12\cdot4 = 48\) cm²; \(S_{tp} = 48 + 36 = 84\) cm².`, 'cm²'),
              ],
            },
            {
              slug: 'the-tich-chop-tu-giac',
              title: 'Tính thể tích của hình chóp tứ giác đều',
              legacy: ['Tính thể tích'],
              levels: [2, 3],
              knowledge: r`\(V = \dfrac13 S\cdot h = \dfrac13 a^2 h\).`,
              signs: 'Đề cho cạnh đáy và chiều cao, hoặc cho thể tích và yêu cầu tìm chiều cao, cạnh đáy.',
              method: 'Tính diện tích đáy a², áp dụng công thức; biết thể tích thì giải ngược.',
              steps: r`- **Bước 1.** Tính diện tích đáy \(S = a^2\).
- **Bước 2.** \(V = \dfrac13 S\cdot h\) (hoặc \(h = \dfrac{3V}{S}\), \(a^2 = \dfrac{3V}{h}\)).
- **Bước 3.** Ghi đơn vị thể tích.`,
              mistakes: '- Quên nhân 1/3.\n- Dùng trung đoạn thay cho chiều cao.',
              example: 'Tính thể tích của hình chóp tứ giác đều có cạnh đáy 6 cm và chiều cao 10 cm.',
              solution: r`\(V = \dfrac13\cdot6^2\cdot10 = 120\) cm³.`,
              exercises: [
                sa(2, 'Tính thể tích của hình chóp tứ giác đều có cạnh đáy 9 cm và chiều cao 10 cm.', ['270'], r`\(V = \dfrac13\cdot81\cdot10 = 270\) cm³.`, 'cm³'),
                sa(3, 'Một hình chóp tứ giác đều có thể tích 200 cm³ và chiều cao 6 cm. Tính độ dài cạnh đáy.', ['10'], r`\(a^2 = \dfrac{3\cdot200}{6} = 100\), \(a = 10\) cm.`, 'cm'),
              ],
            },
            {
              slug: 'tong-hop-chop-tu-giac',
              title: 'Bài tập tổng hợp về hình chóp tứ giác đều',
              legacy: ['Bài tập tổng hợp'],
              levels: [3, 4],
              knowledge: r`\(d^2 = h^2 + \left(\dfrac a2\right)^2\) (chiều cao, trung đoạn, nửa cạnh đáy); công thức diện tích, thể tích.`,
              signs: 'Đề cho hai trong ba đại lượng cạnh đáy, chiều cao, trung đoạn (hoặc cạnh bên), yêu cầu tính diện tích và thể tích.',
              method: 'Dùng định lí Pythagore trong tam giác vuông tạo bởi chiều cao, trung đoạn và nửa cạnh đáy để tìm đại lượng còn thiếu.',
              steps: r`- **Bước 1.** Vẽ tam giác vuông \(SOM\) (\(M\) là trung điểm một cạnh đáy): \(SO = h\), \(OM = \dfrac a2\), \(SM = d\).
- **Bước 2.** Tính đại lượng còn thiếu bằng định lí Pythagore.
- **Bước 3.** Tính diện tích xung quanh, toàn phần, thể tích.`,
              mistakes: r`- Lấy \(OM = a\) thay vì \(\dfrac a2\).
- Nhầm trung đoạn với cạnh bên.`,
              example: 'Hình chóp tứ giác đều có cạnh đáy 8 cm, chiều cao 3 cm. Tính trung đoạn, diện tích xung quanh và thể tích.',
              solution: r`\(d = \sqrt{3^2 + 4^2} = 5\) cm; \(S_{xq} = 16\cdot5 = 80\) cm²; \(V = \dfrac13\cdot64\cdot3 = 64\) cm³.`,
              exercises: [
                sa(3, 'Hình chóp tứ giác đều có cạnh đáy 12 cm và chiều cao 8 cm. Tính trung đoạn của hình chóp.', ['10'], r`\(d = \sqrt{8^2 + 6^2} = 10\) cm.`, 'cm'),
                es(4, 'Hình chóp tứ giác đều có cạnh đáy 10 cm và trung đoạn 13 cm. Tính diện tích toàn phần và thể tích của hình chóp.', r`\(S_{xq} = 20\cdot13 = 260\) cm²; \(S_{tp} = 260 + 100 = 360\) cm².
Chiều cao \(h = \sqrt{13^2 - 5^2} = 12\) cm; \(V = \dfrac13\cdot100\cdot12 = 400\) cm³.`),
              ],
            },
          ],
        },
        {
          title: 'Vận dụng thực tế',
          description: 'Mái nhà, lều, vật trang trí có dạng hình chóp tứ giác đều.',
          types: [
            {
              slug: 'thuc-te-chop-tu-giac',
              title: 'Bài toán thực tế về hình chóp tứ giác đều',
              legacy: ['Bài toán thực tế'],
              levels: [3],
              knowledge: 'Diện tích xung quanh (mái, vải phủ), thể tích (không gian bên trong, lượng vật liệu).',
              signs: 'Mái nhà, lều, kim tự tháp, chặn giấy, hộp đựng có dạng hình chóp tứ giác đều.',
              method: 'Nhận ra dạng hình chóp tứ giác đều, xác định kích thước, áp dụng công thức phù hợp với câu hỏi.',
              steps: `- **Bước 1.** Xác định đại lượng cần tính (diện tích các mặt bên hay thể tích).
- **Bước 2.** Áp dụng công thức.
- **Bước 3.** Tính thêm theo yêu cầu (chi phí, khối lượng), trả lời kèm đơn vị.`,
              mistakes: '- Tính nhầm cả diện tích đáy cho mái nhà.\n- Nhầm đơn vị diện tích, thể tích.',
              example: 'Một chiếc lều có dạng hình chóp tứ giác đều, cạnh đáy 4 m, chiều cao 3 m. Tính thể tích không khí bên trong lều.',
              solution: r`\(V = \dfrac13\cdot4^2\cdot3 = 16\) m³.`,
              exercises: [
                sa(3, 'Một mái nhà có dạng hình chóp tứ giác đều với cạnh đáy 6 m và trung đoạn 4 m. Tính diện tích mái nhà (diện tích xung quanh).', ['48'], r`\(S_{xq} = 12\cdot4 = 48\) m².`, 'm²'),
                sa(3, 'Một chiếc chặn giấy bằng thủy tinh có dạng hình chóp tứ giác đều với cạnh đáy 6 cm và chiều cao 5 cm. Mỗi xăng-ti-mét khối thủy tinh nặng 2,5 g. Tính khối lượng chiếc chặn giấy.', ['150'], r`\(V = \dfrac13\cdot36\cdot5 = 60\) cm³; khối lượng \(60\cdot2{,}5 = 150\) g.`, 'g'),
              ],
            },
          ],
        },
      ],
    },
  ],
};
