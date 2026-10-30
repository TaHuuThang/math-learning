import type { QuestionType } from './grading';

export const TYPE_LABELS: Record<QuestionType, string> = {
  mcq: 'Trắc nghiệm 4 phương án',
  true_false: 'Đúng/Sai 4 ý',
  short_answer: 'Trả lời ngắn',
  essay: 'Tự luận',
  geometry_essay: 'Tự luận hình học',
};

export const TYPE_SHORT: Record<QuestionType, string> = {
  mcq: 'Trắc nghiệm',
  true_false: 'Đúng/Sai',
  short_answer: 'Trả lời ngắn',
  essay: 'Tự luận',
  geometry_essay: 'Hình học',
};

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Nhận biết',
  2: 'Thông hiểu',
  3: 'Vận dụng',
  4: 'Vận dụng cao',
};

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Quản trị viên',
  teacher: 'Giáo viên',
  student: 'Học sinh',
};

export const SECTION_LABELS: Record<string, string> = {
  objective: 'Mục tiêu',
  knowledge: 'Kiến thức',
  formula: 'Công thức',
  example: 'Ví dụ',
  note: 'Ghi nhớ',
};

export const LESSON_KIND_LABELS: Record<string, string> = {
  lesson: 'Bài học',
  practice: 'Luyện tập chung',
  review: 'Bài tập cuối chương',
  activity: 'Hoạt động thực hành trải nghiệm',
};

export const STATUS_LABELS: Record<string, string> = {
  draft: 'Bản nháp',
  published: 'Đã xuất bản',
  archived: 'Lưu trữ',
  closed: 'Đã đóng',
};

export const TIME_ZONE = 'Asia/Ho_Chi_Minh';

export function formatDateTime(d: Date | string | null | undefined): string {
  if (!d) return '';
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: TIME_ZONE,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(d));
}

export function formatDate(d: Date | string | null | undefined): string {
  if (!d) return '';
  return new Intl.DateTimeFormat('vi-VN', { timeZone: TIME_ZONE, day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(d));
}

export function formatNumber(n: number, digits = 2): string {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: digits }).format(n);
}

export function percent(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}
