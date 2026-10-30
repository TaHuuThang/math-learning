export interface SeedAchievement {
  code: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold';
  xp: number;
}

/** Danh mục huy hiệu. Điều kiện đạt được kiểm tra trong src/domain/gamification.ts. */
export const ACHIEVEMENTS: SeedAchievement[] = [
  { code: 'first_lesson', name: 'Bước chân đầu tiên', description: 'Hoàn thành bài học đầu tiên.', icon: 'book', tier: 'bronze', xp: 10 },
  { code: 'lessons_5', name: 'Chăm học', description: 'Hoàn thành 5 bài học.', icon: 'notebook', tier: 'silver', xp: 30 },
  { code: 'chapter_done', name: 'Chinh phục một chương', description: 'Hoàn thành mọi bài học của một chương.', icon: 'mountain', tier: 'gold', xp: 50 },
  { code: 'correct_10', name: 'Mười câu đúng', description: 'Trả lời đúng 10 câu hỏi khác nhau.', icon: 'target', tier: 'bronze', xp: 10 },
  { code: 'correct_50', name: 'Tay giải lão luyện', description: 'Trả lời đúng 50 câu hỏi khác nhau.', icon: 'brain', tier: 'silver', xp: 40 },
  { code: 'streak_3', name: 'Ba ngày liền mạch', description: 'Luyện tập 3 ngày liên tiếp.', icon: 'flame', tier: 'silver', xp: 20 },
  { code: 'first_test', name: 'Sẵn sàng kiểm tra', description: 'Nộp bài kiểm tra đầu tiên.', icon: 'clipboard', tier: 'bronze', xp: 10 },
  { code: 'perfect_test', name: 'Điểm 10 tròn trịa', description: 'Đạt điểm 10 trong một bài kiểm tra.', icon: 'crown', tier: 'gold', xp: 50 },
  { code: 'challenge_3', name: 'Nhà chinh phục thử thách', description: 'Trả lời đúng 3 câu trong Thử thách Toán học.', icon: 'rocket', tier: 'silver', xp: 30 },
  { code: 'xp_500', name: 'Ngôi sao Toán học', description: 'Đạt 500 điểm kinh nghiệm.', icon: 'star', tier: 'gold', xp: 0 },
];
