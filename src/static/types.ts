import type { QuestionView } from '../domain/questions';
import type { AnswerKey, QuestionSettings } from '../shared/grading';

/** Dữ liệu chung nạp vào mọi trang của bản HTML (assets/du-lieu.js → window.ML_DATA). */
export interface OfflineData {
  bookTitle: string;
  exportedAt: string;
  lessons: { slug: string; label: string; chapterCode: string; chapter: string; kind: string }[];
  chapters: { code: string; title: string; kind: string; lessons: string[] }[];
  achievements: { code: string; name: string; description: string; icon: string; tier: string; xp: number }[];
}

/** Câu hỏi kèm đáp án – bản HTML chấm ngay trong trình duyệt. */
export interface OfflineQuestion extends QuestionView {
  key: {
    answers: AnswerKey[];
    settings: QuestionSettings;
    solutionHtml?: string;
    acceptedHtml?: string[];
  };
}

export interface OfflinePractice {
  questions: OfflineQuestion[];
  context: 'practice' | 'challenge';
  limit: number;
  /** Đề theo cấu trúc mức độ (kiểm tra cuối chương): số câu mỗi mức. */
  plan?: Record<number, number>;
  restartHref: string;
  backHref: string;
  backLabel: string;
}

declare global {
  interface Window {
    ML_DATA?: OfflineData;
  }
}
