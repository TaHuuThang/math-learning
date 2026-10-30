/**
 * Bản đồ kiến thức Toán 8 – Kết nối tri thức với cuộc sống (GDPT 2018).
 * Thứ tự chương, bài theo mục lục SGK; số tiết, học kì theo PPCT 2026-2027 của giáo viên (src/seed/toan8-structure.ts).
 */
import { TOAN8_CHAPTERS } from '../toan8-structure';
import type { MapChapter } from './types';
import { CHUONG_1 } from './chuong-1';
import { CHUONG_2 } from './chuong-2';
import { CHUONG_3 } from './chuong-3';
import { CHUONG_4 } from './chuong-4';
import { CHUONG_5 } from './chuong-5';

const TN_NOTE =
  'Tên các hoạt động đối chiếu với SGK tập 1, 2 (VietJack, Hoatieu). Thứ tự các hoạt động trong mục này lấy theo PPCT 2026-2027, chưa đối chiếu số trang SGK – cần kiểm tra.';

const TN1: MapChapter = {
  code: 'TN1',
  objectives: '- Vận dụng kiến thức đa thức, hình học, thống kê vào tình huống thực tiễn.\n- Sử dụng phần mềm GeoGebra để tính toán với đa thức và vẽ hình.',
  keyPoints: '- Công thức lãi kép.\n- Tính toán đa thức và vẽ hình bằng GeoGebra.\n- Phân tích dữ liệu khí hậu bằng biểu đồ.',
  formulas: '',
  verify: { status: 'needs_review', note: TN_NOTE },
  lessons: [],
  aux: [
    { slug: 'hdtn-cong-thuc-lai-kep', objectives: 'Hiểu và sử dụng công thức lãi kép để tính số tiền nhận được sau một số kì gửi tiết kiệm.' },
    { slug: 'hdtn-tinh-toan-da-thuc-geogebra', objectives: 'Dùng GeoGebra để thu gọn, cộng, trừ, nhân, chia đa thức và kiểm tra kết quả tính tay.' },
    { slug: 'hdtn-ve-hinh-don-gian-geogebra', objectives: 'Dùng GeoGebra vẽ các hình tứ giác đặc biệt, kiểm nghiệm tính chất của chúng.' },
    { slug: 'hdtn-phan-tich-khi-hau-viet-nam', objectives: 'Thu thập, biểu diễn và phân tích số liệu khí hậu (nhiệt độ, lượng mưa) của các vùng ở Việt Nam bằng biểu đồ.' },
  ],
};

const TN2: MapChapter = {
  code: 'TN2',
  objectives: '- Vận dụng hàm số bậc nhất, định lí Thalès, định lí Pythagore, tam giác đồng dạng vào thực tiễn.\n- Sử dụng GeoGebra, Excel hỗ trợ tính toán và mô phỏng thí nghiệm ngẫu nhiên.',
  keyPoints: '- Ứng dụng hàm số bậc nhất trong tài chính.\n- Đo chiều cao, khoảng cách gián tiếp.\n- Tính toán phân thức, vẽ đồ thị bằng GeoGebra; mô tả thí nghiệm ngẫu nhiên bằng Excel.',
  formulas: '',
  verify: { status: 'needs_review', note: TN_NOTE },
  lessons: [],
  aux: [
    { slug: 'hdtn-ham-so-bac-nhat-trong-tai-chinh', objectives: 'Lập hàm số bậc nhất mô tả chi phí, tiền lãi, tiền cước… và dùng đồ thị để so sánh các phương án.' },
    { slug: 'hdtn-do-chieu-cao-khoang-cach', objectives: 'Đo chiều cao, khoảng cách không đo trực tiếp được bằng định lí Thalès, định lí Pythagore và tam giác đồng dạng.' },
    {
      slug: 'hdtn-phan-thuc-va-do-thi-geogebra',
      objectives: 'Dùng GeoGebra rút gọn, cộng, trừ, nhân, chia phân thức đại số và vẽ đồ thị hàm số bậc nhất.',
      title: {
        from: 'Thực hiện tính toán trên phân thức đại số và vẽ đồ thị với phần mềm GeoGebra',
        to: 'Thực hành tính toán trên phân thức đại số và vẽ đồ thị hàm số với phần mềm GeoGebra',
      },
      verify: { status: 'verified', note: 'Tên theo SGK (VietJack, Hoatieu). PPCT ghi "Thực hiện tính toán trên phân thức đại số và vẽ đồ thị với phần mềm GeoGebra".' },
    },
    { slug: 'hdtn-thi-nghiem-ngau-nhien-excel', objectives: 'Dùng Excel mô phỏng thí nghiệm ngẫu nhiên, tính xác suất thực nghiệm và so sánh với xác suất lí thuyết.' },
  ],
};

export const TOAN8_MAP: MapChapter[] = [CHUONG_1, CHUONG_2, CHUONG_3, CHUONG_4, CHUONG_5, TN1, TN2];

const ROMAN: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
const pad = (n: number) => String(n).padStart(2, '0');

/** Mã bài: T8.B01 … T8.B39; luyện tập chung T8.C1.LT1; bài tập cuối chương T8.C1.ON; hoạt động trải nghiệm T8.TN1.HD1. */
export function lessonCodes(): Map<string, string> {
  const codes = new Map<string, string>();
  for (const ch of TOAN8_CHAPTERS) {
    let lt = 0;
    let hd = 0;
    for (const l of ch.lessons) {
      if (l.kind === 'lesson') codes.set(l.slug, `T8.B${pad(l.number!)}`);
      else if (l.kind === 'practice') codes.set(l.slug, `T8.C${ROMAN[ch.code]}.LT${++lt}`);
      else if (l.kind === 'review') codes.set(l.slug, `T8.C${ROMAN[ch.code]}.ON`);
      else codes.set(l.slug, `T8.${ch.code}.HD${++hd}`);
    }
  }
  return codes;
}
