/**
 * Cấu trúc Toán 8 – Kết nối tri thức với cuộc sống (GDPT 2018).
 * Số tiết lấy từ "PPCT TOÁN 8 – năm học 2026-2027" của giáo viên.
 * Dạng toán (topics) theo "Các chuyên đề Toán 8 Kết nối tri thức" tập 1, 2.
 */

export interface SeedLesson {
  slug: string;
  number?: number;
  title: string;
  kind: 'lesson' | 'practice' | 'review' | 'activity';
  periods: number;
  topics?: string[];
}

export interface SeedChapter {
  code: string;
  semester: 1 | 2;
  title: string;
  kind: 'chapter' | 'activity';
  description?: string;
  lessons: SeedLesson[];
}

const L = (number: number, slug: string, title: string, periods: number, topics: string[]): SeedLesson => ({
  number,
  slug,
  title,
  kind: 'lesson',
  periods,
  topics,
});
const P = (slug: string, periods: number): SeedLesson => ({ slug, title: 'Luyện tập chung', kind: 'practice', periods });
const R = (slug: string, chapterCode: string, periods: number): SeedLesson => ({
  slug,
  title: `Bài tập cuối chương ${chapterCode}`,
  kind: 'review',
  periods,
});
const A = (slug: string, title: string, periods: number): SeedLesson => ({ slug, title, kind: 'activity', periods });

export const TOAN8_CHAPTERS: SeedChapter[] = [
  {
    code: 'I',
    semester: 1,
    kind: 'chapter',
    title: 'Đa thức',
    description: 'Đơn thức, đa thức nhiều biến và các phép tính cộng, trừ, nhân, chia.',
    lessons: [
      L(1, 'bai-1-don-thuc', 'Đơn thức', 2, [
        'Nhận diện đơn thức',
        'Thu gọn đơn thức, xác định hệ số và phần biến',
        'Tìm bậc của đơn thức',
        'Cộng, trừ các đơn thức đồng dạng',
      ]),
      L(2, 'bai-2-da-thuc', 'Đa thức', 2, ['Nhận diện đa thức', 'Thu gọn đa thức', 'Tìm bậc của đa thức', 'Tính giá trị của đa thức']),
      L(3, 'bai-3-phep-cong-va-phep-tru-da-thuc', 'Phép cộng và phép trừ đa thức', 1, ['Thực hiện cộng, trừ đa thức', 'Tìm đa thức chưa biết']),
      P('luyen-tap-chung-1a', 2),
      L(4, 'bai-4-phep-nhan-da-thuc', 'Phép nhân đa thức', 2, [
        'Nhân hai đơn thức',
        'Nhân đơn thức với đa thức',
        'Nhân đa thức với đa thức',
        'Chứng minh giá trị biểu thức không phụ thuộc vào biến',
        'Chứng minh đẳng thức',
      ]),
      L(5, 'bai-5-phep-chia-da-thuc-cho-don-thuc', 'Phép chia đa thức cho đơn thức', 1, [
        'Chia đơn thức cho đơn thức',
        'Chia đa thức cho đơn thức',
        'Tìm đa thức chưa biết khi biết tích hoặc thương',
      ]),
      P('luyen-tap-chung-1b', 2),
      R('bai-tap-cuoi-chuong-1', 'I', 1),
    ],
  },
  {
    code: 'II',
    semester: 1,
    kind: 'chapter',
    title: 'Hằng đẳng thức đáng nhớ và ứng dụng',
    description: 'Bảy hằng đẳng thức đáng nhớ và phân tích đa thức thành nhân tử.',
    lessons: [
      L(6, 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu', 'Hiệu hai bình phương. Bình phương của một tổng hay một hiệu', 2, [
        'Hoàn thành các hằng đẳng thức',
        'Tính giá trị của biểu thức, rút gọn biểu thức',
        'Tìm x, chứng minh, tìm giá trị lớn nhất – nhỏ nhất',
      ]),
      L(7, 'bai-7-lap-phuong-cua-mot-tong-lap-phuong-cua-mot-hieu', 'Lập phương của một tổng. Lập phương của một hiệu', 3, [
        'Hoàn thành các hằng đẳng thức',
        'Tính giá trị của biểu thức, rút gọn biểu thức',
        'Tìm x và các dạng khác',
      ]),
      L(8, 'bai-8-tong-va-hieu-hai-lap-phuong', 'Tổng và hiệu hai lập phương', 2, [
        'Hoàn thành các hằng đẳng thức đã biết',
        'Tính giá trị của biểu thức',
        'Rút gọn, chứng minh và các dạng khác',
      ]),
      P('luyen-tap-chung-2a', 2),
      L(9, 'bai-9-phan-tich-da-thuc-thanh-nhan-tu', 'Phân tích đa thức thành nhân tử', 2, [
        'Phương pháp đặt nhân tử chung',
        'Phương pháp sử dụng hằng đẳng thức',
        'Phương pháp nhóm hạng tử',
        'Tìm đại lượng chưa biết (tìm x)',
        'Tính giá trị của biểu thức',
        'Tách hạng tử, thêm bớt hạng tử (nâng cao)',
      ]),
      P('luyen-tap-chung-2b', 2),
      R('bai-tap-cuoi-chuong-2', 'II', 1),
    ],
  },
  {
    code: 'III',
    semester: 1,
    kind: 'chapter',
    title: 'Tứ giác',
    description: 'Tứ giác, hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông.',
    lessons: [
      L(10, 'bai-10-tu-giac', 'Tứ giác', 1, ['Tính số đo góc', 'Mối liên hệ giữa cạnh, góc và đường chéo của tứ giác']),
      L(11, 'bai-11-hinh-thang-can', 'Hình thang cân', 2, [
        'Tính số đo góc, độ dài cạnh của hình thang, hình thang cân',
        'Chứng minh tứ giác là hình thang, hình thang cân',
        'Chứng minh đoạn thẳng bằng nhau, góc bằng nhau',
      ]),
      P('luyen-tap-chung-3a', 1),
      L(12, 'bai-12-hinh-binh-hanh', 'Hình bình hành', 3, [
        'Dùng tính chất hình bình hành để chứng minh quan hệ hình học',
        'Chứng minh tứ giác là hình bình hành',
        'Chứng minh ba điểm thẳng hàng, ba đường thẳng đồng quy',
      ]),
      P('luyen-tap-chung-3b', 2),
      L(13, 'bai-13-hinh-chu-nhat', 'Hình chữ nhật', 1, [
        'Chứng minh tứ giác là hình chữ nhật',
        'Dùng tính chất hình chữ nhật để chứng minh quan hệ hình học',
        'Đường trung tuyến ứng với cạnh huyền của tam giác vuông',
      ]),
      L(14, 'bai-14-hinh-thoi-va-hinh-vuong', 'Hình thoi và hình vuông', 2, [
        'Chứng minh tứ giác là hình thoi, hình vuông',
        'Dùng tính chất hình thoi, hình vuông để chứng minh',
        'Tìm điều kiện để tứ giác là hình thoi, hình vuông',
      ]),
      P('luyen-tap-chung-3c', 2),
      R('bai-tap-cuoi-chuong-3', 'III', 1),
    ],
  },
  {
    code: 'IV',
    semester: 1,
    kind: 'chapter',
    title: 'Định lí Thalès',
    description: 'Định lí Thalès, đường trung bình và tính chất đường phân giác của tam giác.',
    lessons: [
      L(15, 'bai-15-dinh-li-thales-trong-tam-giac', 'Định lí Thalès trong tam giác', 3, [
        'Đoạn thẳng tỉ lệ',
        'Dùng định lí Thalès tính độ dài đoạn thẳng',
        'Dùng định lí Thalès chứng minh hệ thức, hai đường thẳng song song',
      ]),
      L(16, 'bai-16-duong-trung-binh-cua-tam-giac', 'Đường trung bình của tam giác', 1, [
        'Tính độ dài đoạn thẳng dựa vào đường trung bình',
        'Chứng minh hai đường thẳng song song, ba điểm thẳng hàng',
      ]),
      L(17, 'bai-17-tinh-chat-duong-phan-giac-cua-tam-giac', 'Tính chất đường phân giác của tam giác', 1, [
        'Tính độ dài cạnh',
        'Kết hợp tính chất đường phân giác và định lí Thalès',
      ]),
      P('luyen-tap-chung-4a', 2),
      R('bai-tap-cuoi-chuong-4', 'IV', 2),
    ],
  },
  {
    code: 'V',
    semester: 1,
    kind: 'chapter',
    title: 'Dữ liệu và biểu đồ',
    description: 'Thu thập, phân loại, biểu diễn và phân tích dữ liệu.',
    lessons: [
      L(18, 'bai-18-thu-thap-va-phan-loai-du-lieu', 'Thu thập và phân loại dữ liệu', 1, ['Xác định phương pháp thu thập dữ liệu', 'Phân loại dữ liệu']),
      L(19, 'bai-19-bieu-dien-du-lieu-bang-bang-bieu-do', 'Biểu diễn dữ liệu bằng bảng, biểu đồ', 2, [
        'Chọn dạng biểu đồ phù hợp với dữ liệu và mục đích',
        'Vẽ biểu đồ biểu diễn dữ liệu',
      ]),
      L(20, 'bai-20-phan-tich-so-lieu-thong-ke-dua-vao-bieu-do', 'Phân tích số liệu thống kê dựa vào biểu đồ', 2, [
        'Đọc, phân tích biểu đồ cột và cột kép',
        'Đọc, phân tích biểu đồ đoạn thẳng',
        'Đọc, phân tích biểu đồ hình quạt tròn',
      ]),
      P('luyen-tap-chung-5a', 2),
      R('bai-tap-cuoi-chuong-5', 'V', 1),
    ],
  },
  {
    code: 'TN1',
    semester: 1,
    kind: 'activity',
    title: 'Hoạt động thực hành trải nghiệm (Học kì I)',
    lessons: [
      A('hdtn-cong-thuc-lai-kep', 'Công thức lãi kép', 1),
      A('hdtn-tinh-toan-da-thuc-geogebra', 'Thực hiện tính toán trên đa thức với phần mềm GeoGebra', 1),
      A('hdtn-ve-hinh-don-gian-geogebra', 'Vẽ hình đơn giản với phần mềm GeoGebra', 2),
      A('hdtn-phan-tich-khi-hau-viet-nam', 'Phân tích đặc điểm khí hậu Việt Nam', 2),
    ],
  },
  {
    code: 'VI',
    semester: 2,
    kind: 'chapter',
    title: 'Phân thức đại số',
    description: 'Phân thức đại số, tính chất cơ bản và các phép tính với phân thức.',
    lessons: [
      L(21, 'bai-21-phan-thuc-dai-so', 'Phân thức đại số', 1, [
        'Xác định tử thức, mẫu thức',
        'Hai phân thức bằng nhau',
        'Tìm điều kiện xác định của phân thức',
        'Tính giá trị của phân thức',
        'Bài toán thực tế về phân thức',
      ]),
      L(22, 'bai-22-tinh-chat-co-ban-cua-phan-thuc-dai-so', 'Tính chất cơ bản của phân thức đại số', 3, [
        'Vận dụng tính chất cơ bản của phân thức',
        'Rút gọn phân thức',
        'Quy đồng mẫu thức nhiều phân thức',
        'Bài tập tổng hợp',
      ]),
      P('luyen-tap-chung-6a', 2),
      L(23, 'bai-23-phep-cong-va-phep-tru-phan-thuc-dai-so', 'Phép cộng và phép trừ phân thức đại số', 3, [
        'Cộng hai phân thức',
        'Trừ hai phân thức',
        'Cộng, trừ nhiều phân thức',
        'Bài toán thực tế',
      ]),
      L(24, 'bai-24-phep-nhan-va-phep-chia-phan-thuc-dai-so', 'Phép nhân và phép chia phân thức đại số', 2, [
        'Nhân phân thức',
        'Chia phân thức',
        'Tìm thành phần chưa biết',
        'Bài tập tổng hợp các phép tính',
        'Bài toán thực tế',
      ]),
      P('luyen-tap-chung-6b', 1),
      R('bai-tap-cuoi-chuong-6', 'VI', 1),
    ],
  },
  {
    code: 'VII',
    semester: 2,
    kind: 'chapter',
    title: 'Phương trình bậc nhất và hàm số bậc nhất',
    description: 'Phương trình bậc nhất một ẩn, giải toán bằng cách lập phương trình, hàm số bậc nhất.',
    lessons: [
      L(25, 'bai-25-phuong-trinh-bac-nhat-mot-an', 'Phương trình bậc nhất một ẩn', 2, [
        'Kiểm tra một số có là nghiệm của phương trình',
        'Nhận dạng phương trình bậc nhất một ẩn',
        'Giải phương trình bậc nhất một ẩn',
        'Giải phương trình đưa được về dạng ax + b = 0',
        'Tìm giá trị của ẩn để biểu thức nhận giá trị cho trước',
        'Bài toán thực tế dẫn tới phương trình',
      ]),
      L(26, 'bai-26-giai-bai-toan-bang-cach-lap-phuong-trinh', 'Giải bài toán bằng cách lập phương trình', 2, [
        'Bài toán chuyển động',
        'Bài toán chu vi, diện tích hình chữ nhật',
        'Bài toán năng suất',
        'Bài toán tỉ số phần trăm',
      ]),
      P('luyen-tap-chung-7a', 2),
      L(27, 'bai-27-khai-niem-ham-so-va-do-thi-cua-ham-so', 'Khái niệm hàm số và đồ thị của hàm số', 2, [
        'Tính giá trị của hàm số',
        'Hàm số cho bởi bảng, công thức',
        'Tọa độ của một điểm trên mặt phẳng tọa độ',
        'Vẽ và đọc đồ thị hàm số',
      ]),
      L(28, 'bai-28-ham-so-bac-nhat-va-do-thi-cua-ham-so-bac-nhat', 'Hàm số bậc nhất và đồ thị của hàm số bậc nhất', 2, [
        'Nhận dạng hàm số bậc nhất',
        'Tính giá trị của hàm số',
        'Vẽ đồ thị hàm số bậc nhất',
        'Bài toán thực tế về hàm số bậc nhất',
      ]),
      L(29, 'bai-29-he-so-goc-cua-duong-thang', 'Hệ số góc của đường thẳng', 2, [
        'Xác định hệ số góc của đường thẳng',
        'Nhận biết hai đường thẳng song song, cắt nhau',
        'Tìm hàm số bậc nhất thỏa mãn yêu cầu',
        'Tìm tham số để hai đường thẳng song song hoặc cắt nhau',
      ]),
      P('luyen-tap-chung-7b', 1),
      R('bai-tap-cuoi-chuong-7', 'VII', 1),
    ],
  },
  {
    code: 'VIII',
    semester: 2,
    kind: 'chapter',
    title: 'Mở đầu về tính xác suất của biến cố',
    description: 'Kết quả có thể, kết quả thuận lợi, xác suất của biến cố và xác suất thực nghiệm.',
    lessons: [
      L(30, 'bai-30-ket-qua-co-the-va-ket-qua-thuan-loi', 'Kết quả có thể và kết quả thuận lợi', 1, [
        'Liệt kê, đếm các kết quả có thể',
        'Liệt kê, đếm các kết quả thuận lợi cho một biến cố',
      ]),
      L(31, 'bai-31-cach-tinh-xac-suat-cua-bien-co-bang-ti-so', 'Cách tính xác suất của biến cố bằng tỉ số', 2, [
        'Tính xác suất của một biến cố',
        'Tính số kết quả khi biết xác suất',
      ]),
      L(32, 'bai-32-moi-lien-he-giua-xac-suat-thuc-nghiem-voi-xac-suat-va-ung-dung', 'Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng', 3, [
        'Tính xác suất thực nghiệm, ước lượng xác suất',
        'Dùng xác suất để dự báo, ước lượng',
      ]),
      P('luyen-tap-chung-8a', 2),
      R('bai-tap-cuoi-chuong-8', 'VIII', 1),
    ],
  },
  {
    code: 'IX',
    semester: 2,
    kind: 'chapter',
    title: 'Tam giác đồng dạng',
    description: 'Hai tam giác đồng dạng, các trường hợp đồng dạng, định lí Pythagore, hình đồng dạng.',
    lessons: [
      L(33, 'bai-33-hai-tam-giac-dong-dang', 'Hai tam giác đồng dạng', 2, [
        'Chứng minh hai tam giác đồng dạng, tìm tỉ số đồng dạng',
        'Tính độ dài cạnh qua tam giác đồng dạng',
        'Chứng minh đẳng thức',
        'Toán thực tế',
      ]),
      L(34, 'bai-34-ba-truong-hop-dong-dang-cua-hai-tam-giac', 'Ba trường hợp đồng dạng của hai tam giác', 3, [
        'Chứng minh hai tam giác đồng dạng',
        'Tỉ số đoạn thẳng, tỉ số chu vi, tỉ số diện tích',
        'Chứng minh hệ thức về cạnh, góc bằng nhau',
        'Toán thực tế',
      ]),
      P('luyen-tap-chung-9a', 2),
      L(35, 'bai-35-dinh-li-pythagore-va-ung-dung', 'Định lí Pythagore và ứng dụng', 2, [
        'Tính độ dài một cạnh của tam giác vuông',
        'Dùng định lí Pythagore đảo nhận biết tam giác vuông',
        'Ứng dụng thực tế',
      ]),
      L(36, 'bai-36-cac-truong-hop-dong-dang-cua-hai-tam-giac-vuong', 'Các trường hợp đồng dạng của hai tam giác vuông', 2, [
        'Chứng minh hai tam giác vuông đồng dạng',
        'Dùng tam giác vuông đồng dạng để giải toán',
        'Tỉ số diện tích hai tam giác',
        'Toán thực tế',
      ]),
      L(37, 'bai-37-hinh-dong-dang', 'Hình đồng dạng', 1, ['Nhận biết hình đồng dạng, hình đồng dạng phối cảnh']),
      P('luyen-tap-chung-9b', 2),
      R('bai-tap-cuoi-chuong-9', 'IX', 1),
    ],
  },
  {
    code: 'X',
    semester: 2,
    kind: 'chapter',
    title: 'Một số hình khối trong thực tiễn',
    description: 'Hình chóp tam giác đều, hình chóp tứ giác đều: diện tích xung quanh và thể tích.',
    lessons: [
      L(38, 'bai-38-hinh-chop-tam-giac-deu', 'Hình chóp tam giác đều', 2, [
        'Nhận biết hình chóp tam giác đều',
        'Tính diện tích xung quanh',
        'Tính thể tích',
        'Bài tập tổng hợp',
        'Bài toán thực tế',
      ]),
      L(39, 'bai-39-hinh-chop-tu-giac-deu', 'Hình chóp tứ giác đều', 2, [
        'Nhận biết hình chóp tứ giác đều',
        'Tính diện tích xung quanh',
        'Tính thể tích',
        'Bài tập tổng hợp',
        'Bài toán thực tế',
      ]),
      P('luyen-tap-chung-10a', 1),
      R('bai-tap-cuoi-chuong-10', 'X', 1),
    ],
  },
  {
    code: 'TN2',
    semester: 2,
    kind: 'activity',
    title: 'Hoạt động thực hành trải nghiệm (Học kì II)',
    lessons: [
      A('hdtn-ham-so-bac-nhat-trong-tai-chinh', 'Một vài ứng dụng của hàm số bậc nhất trong tài chính', 1),
      A('hdtn-do-chieu-cao-khoang-cach', 'Ứng dụng định lí Thalès, định lí Pythagore và tam giác đồng dạng để đo chiều cao, khoảng cách', 1),
      A('hdtn-phan-thuc-va-do-thi-geogebra', 'Thực hiện tính toán trên phân thức đại số và vẽ đồ thị với phần mềm GeoGebra', 1),
      A('hdtn-thi-nghiem-ngau-nhien-excel', 'Mô tả thí nghiệm ngẫu nhiên với phần mềm Excel', 1),
    ],
  },
];

/** Phân phối chương trình Toán 8 năm học 2026-2027 (chép từ tệp PPCT của giáo viên). */
export interface SeedPlanItem {
  title: string;
  lesson: string | null;
  periods: number;
  from: number;
  to: number;
  weeks: string;
  equipment?: string;
  note?: string;
}

const pi = (title: string, lesson: string | null, periods: number, from: number, to: number, weeks: string, extra: Partial<SeedPlanItem> = {}): SeedPlanItem => ({
  title,
  lesson,
  periods,
  from,
  to,
  weeks,
  ...extra,
});

const PM = 'Phần mềm toán học';
const XS = 'Bộ thiết bị dạy xác suất thống kê';
const HK = 'Bộ thiết bị dạy học trực quan (các hình khối trong thực tiễn)';

export const TOAN8_PPCT_2026: SeedPlanItem[] = [
  pi('Bài 1. Đơn thức', 'bai-1-don-thuc', 2, 1, 2, '1'),
  pi('Bài 2. Đa thức', 'bai-2-da-thuc', 2, 3, 4, '1'),
  pi('Bài 3. Phép cộng và phép trừ đa thức', 'bai-3-phep-cong-va-phep-tru-da-thuc', 1, 5, 5, '2'),
  pi('Luyện tập chung', 'luyen-tap-chung-1a', 2, 6, 7, '2'),
  pi('Bài 4. Phép nhân đa thức', 'bai-4-phep-nhan-da-thuc', 2, 8, 9, '2, 3'),
  pi('Bài 5. Phép chia đa thức cho đơn thức', 'bai-5-phep-chia-da-thuc-cho-don-thuc', 1, 10, 10, '3'),
  pi('Luyện tập chung', 'luyen-tap-chung-1b', 2, 11, 12, '3'),
  pi('Bài tập cuối chương I', 'bai-tap-cuoi-chuong-1', 1, 13, 13, '4', { note: 'KTĐGTX2' }),
  pi('Bài 10. Tứ giác', 'bai-10-tu-giac', 1, 14, 14, '4'),
  pi('Bài 11. Hình thang cân', 'bai-11-hinh-thang-can', 2, 15, 16, '4'),
  pi('Luyện tập chung', 'luyen-tap-chung-3a', 1, 17, 17, '5'),
  pi('Bài 12. Hình bình hành', 'bai-12-hinh-binh-hanh', 3, 18, 20, '5'),
  pi('Luyện tập chung', 'luyen-tap-chung-3b', 2, 21, 22, '6'),
  pi('Bài 13. Hình chữ nhật', 'bai-13-hinh-chu-nhat', 1, 23, 23, '6'),
  pi('Bài 14. Hình thoi và hình vuông', 'bai-14-hinh-thoi-va-hinh-vuong', 2, 24, 25, '6, 7'),
  pi('Luyện tập chung', 'luyen-tap-chung-3c', 2, 26, 27, '7', { note: 'KTĐGTX3' }),
  pi('Bài tập cuối chương III', 'bai-tap-cuoi-chuong-3', 1, 28, 28, '7'),
  pi('Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu', 'bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu', 2, 29, 30, '8'),
  pi('Bài 7. Lập phương của một tổng. Lập phương của một hiệu', 'bai-7-lap-phuong-cua-mot-tong-lap-phuong-cua-mot-hieu', 3, 31, 33, '8, 9'),
  pi('Ôn tập giữa học kì I', null, 1, 34, 34, '9'),
  pi('Kiểm tra giữa học kì I', null, 2, 35, 36, '9'),
  pi('Bài 8. Tổng và hiệu hai lập phương', 'bai-8-tong-va-hieu-hai-lap-phuong', 2, 37, 38, '10'),
  pi('Luyện tập chung', 'luyen-tap-chung-2a', 2, 39, 40, '10'),
  pi('Bài 9. Phân tích đa thức thành nhân tử', 'bai-9-phan-tich-da-thuc-thanh-nhan-tu', 2, 41, 42, '11'),
  pi('Luyện tập chung', 'luyen-tap-chung-2b', 2, 43, 44, '11'),
  pi('Bài tập cuối chương II', 'bai-tap-cuoi-chuong-2', 1, 45, 45, '12', { note: 'KTĐGTX4' }),
  pi('Bài 15. Định lí Thalès trong tam giác', 'bai-15-dinh-li-thales-trong-tam-giac', 3, 46, 48, '12'),
  pi('Bài 16. Đường trung bình của tam giác', 'bai-16-duong-trung-binh-cua-tam-giac', 1, 49, 49, '13'),
  pi('Bài 17. Tính chất đường phân giác của tam giác', 'bai-17-tinh-chat-duong-phan-giac-cua-tam-giac', 1, 50, 50, '13'),
  pi('Luyện tập chung', 'luyen-tap-chung-4a', 2, 51, 52, '13'),
  pi('Bài tập cuối chương IV', 'bai-tap-cuoi-chuong-4', 2, 53, 54, '14'),
  pi('Bài 18. Thu thập và phân loại dữ liệu', 'bai-18-thu-thap-va-phan-loai-du-lieu', 1, 55, 55, '14'),
  pi('Bài 19. Biểu diễn dữ liệu bằng bảng, biểu đồ', 'bai-19-bieu-dien-du-lieu-bang-bang-bieu-do', 2, 56, 57, '14, 15'),
  pi('Bài 20. Phân tích số liệu thống kê dựa vào biểu đồ', 'bai-20-phan-tich-so-lieu-thong-ke-dua-vao-bieu-do', 2, 58, 59, '15'),
  pi('Luyện tập chung', 'luyen-tap-chung-5a', 2, 60, 61, '15, 16'),
  pi('Bài tập cuối chương V', 'bai-tap-cuoi-chuong-5', 1, 62, 62, '16'),
  pi('Ôn tập cuối học kì I', null, 2, 63, 64, '16'),
  pi('Kiểm tra cuối học kì I', null, 2, 65, 66, '17'),
  pi('Công thức lãi kép', 'hdtn-cong-thuc-lai-kep', 1, 67, 67, '17'),
  pi('Thực hiện tính toán trên đa thức với phần mềm GeoGebra', 'hdtn-tinh-toan-da-thuc-geogebra', 1, 68, 68, '17', { equipment: PM }),
  pi('Vẽ hình đơn giản với phần mềm GeoGebra', 'hdtn-ve-hinh-don-gian-geogebra', 2, 69, 70, '18', { equipment: PM }),
  pi('Phân tích đặc điểm khí hậu Việt Nam', 'hdtn-phan-tich-khi-hau-viet-nam', 2, 71, 72, '18'),
  pi('Bài 21. Phân thức đại số', 'bai-21-phan-thuc-dai-so', 1, 73, 73, '19'),
  pi('Bài 22. Tính chất cơ bản của phân thức đại số', 'bai-22-tinh-chat-co-ban-cua-phan-thuc-dai-so', 3, 74, 76, '19'),
  pi('Luyện tập chung', 'luyen-tap-chung-6a', 2, 77, 78, '20'),
  pi('Bài 23. Phép cộng và phép trừ phân thức đại số', 'bai-23-phep-cong-va-phep-tru-phan-thuc-dai-so', 3, 79, 81, '20, 21'),
  pi('Bài 24. Phép nhân và phép chia phân thức đại số', 'bai-24-phep-nhan-va-phep-chia-phan-thuc-dai-so', 2, 82, 83, '21'),
  pi('Luyện tập chung', 'luyen-tap-chung-6b', 1, 84, 84, '21', { note: 'KTĐGTX6' }),
  pi('Bài tập cuối chương VI', 'bai-tap-cuoi-chuong-6', 1, 85, 85, '22'),
  pi('Bài 33. Hai tam giác đồng dạng', 'bai-33-hai-tam-giac-dong-dang', 2, 86, 87, '22'),
  pi('Bài 34. Ba trường hợp đồng dạng của hai tam giác', 'bai-34-ba-truong-hop-dong-dang-cua-hai-tam-giac', 3, 88, 90, '22, 23'),
  pi('Luyện tập chung', 'luyen-tap-chung-9a', 2, 91, 92, '23'),
  pi('Bài 35. Định lí Pythagore và ứng dụng', 'bai-35-dinh-li-pythagore-va-ung-dung', 2, 93, 94, '24'),
  pi('Bài 36. Các trường hợp đồng dạng của hai tam giác vuông', 'bai-36-cac-truong-hop-dong-dang-cua-hai-tam-giac-vuong', 2, 95, 96, '24', { note: 'KTĐGTX7' }),
  pi('Bài 37. Hình đồng dạng', 'bai-37-hinh-dong-dang', 1, 97, 97, '25'),
  pi('Luyện tập chung', 'luyen-tap-chung-9b', 2, 98, 99, '25'),
  pi('Bài tập cuối chương IX', 'bai-tap-cuoi-chuong-9', 1, 100, 100, '25'),
  pi('Ôn tập giữa học kì II', null, 1, 101, 101, '26'),
  pi('Kiểm tra giữa học kì II', null, 2, 102, 103, '26'),
  pi('Bài 25. Phương trình bậc nhất một ẩn', 'bai-25-phuong-trinh-bac-nhat-mot-an', 2, 104, 105, '26, 27'),
  pi('Bài 26. Giải bài toán bằng cách lập phương trình', 'bai-26-giai-bai-toan-bang-cach-lap-phuong-trinh', 2, 106, 107, '27'),
  pi('Luyện tập chung', 'luyen-tap-chung-7a', 2, 108, 109, '27, 28'),
  pi('Bài 27. Khái niệm hàm số và đồ thị của hàm số', 'bai-27-khai-niem-ham-so-va-do-thi-cua-ham-so', 2, 110, 111, '28'),
  pi('Bài 28. Hàm số bậc nhất và đồ thị của hàm số bậc nhất', 'bai-28-ham-so-bac-nhat-va-do-thi-cua-ham-so-bac-nhat', 2, 112, 113, '28, 29'),
  pi('Bài 29. Hệ số góc của đường thẳng', 'bai-29-he-so-goc-cua-duong-thang', 2, 114, 115, '29'),
  pi('Luyện tập chung', 'luyen-tap-chung-7b', 1, 116, 116, '29'),
  pi('Bài tập cuối chương VII', 'bai-tap-cuoi-chuong-7', 1, 117, 117, '30'),
  pi('Bài 38. Hình chóp tam giác đều', 'bai-38-hinh-chop-tam-giac-deu', 2, 118, 119, '30', { equipment: HK }),
  pi('Bài 39. Hình chóp tứ giác đều', 'bai-39-hinh-chop-tu-giac-deu', 2, 120, 121, '30, 31', { equipment: HK, note: 'Bài học STEM: hộp quà hình chóp tứ giác đều. KTĐGTX8' }),
  pi('Luyện tập chung', 'luyen-tap-chung-10a', 1, 122, 122, '31'),
  pi('Bài tập cuối chương X', 'bai-tap-cuoi-chuong-10', 1, 123, 123, '31'),
  pi('Bài 30. Kết quả có thể và kết quả thuận lợi', 'bai-30-ket-qua-co-the-va-ket-qua-thuan-loi', 1, 124, 124, '31', { equipment: XS }),
  pi('Bài 31. Cách tính xác suất của biến cố bằng tỉ số', 'bai-31-cach-tinh-xac-suat-cua-bien-co-bang-ti-so', 2, 125, 126, '32', { equipment: XS }),
  pi('Bài 32. Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng', 'bai-32-moi-lien-he-giua-xac-suat-thuc-nghiem-voi-xac-suat-va-ung-dung', 3, 127, 129, '32, 33', { equipment: XS }),
  pi('Luyện tập chung', 'luyen-tap-chung-8a', 2, 130, 131, '33'),
  pi('Ôn tập cuối học kì II', null, 2, 132, 133, '33, 34'),
  pi('Kiểm tra cuối học kì II', null, 2, 134, 135, '34'),
  pi('Bài tập cuối chương VIII', 'bai-tap-cuoi-chuong-8', 1, 136, 136, '34'),
  pi('Một vài ứng dụng của hàm số bậc nhất trong tài chính', 'hdtn-ham-so-bac-nhat-trong-tai-chinh', 1, 137, 137, '35'),
  pi('Ứng dụng định lí Thalès, định lí Pythagore và tam giác đồng dạng để đo chiều cao, khoảng cách', 'hdtn-do-chieu-cao-khoang-cach', 1, 138, 138, '35', {
    equipment: 'Bộ thước thực hành đo chiều cao, đo khoảng cách ngoài trời',
  }),
  pi('Thực hiện tính toán trên phân thức đại số và vẽ đồ thị với phần mềm GeoGebra', 'hdtn-phan-thuc-va-do-thi-geogebra', 1, 139, 139, '35', {
    equipment: 'Phần mềm dạy học, phòng máy tính',
  }),
  pi('Mô tả thí nghiệm ngẫu nhiên với phần mềm Excel', 'hdtn-thi-nghiem-ngau-nhien-excel', 1, 140, 140, '35', { equipment: 'Phần mềm dạy học, phòng máy tính' }),
];
