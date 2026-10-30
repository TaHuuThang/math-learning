import { sql, type Database } from '../server/db';
import { gradeResponse, normalizeResponse, type GradeStatus } from '../shared/grading';
import { awardXp, evaluateAchievements, type EarnedAchievement } from './gamification';
import { getQuestion, revealAnswer, type AnswerReveal } from './questions';

export const XP_CORRECT = 10;
export const XP_CHALLENGE = 20;

export interface PracticeFeedback extends AnswerReveal {
  status: GradeStatus;
  score: number | null;
  correctCount?: number;
  xpGained: number;
  achievements: EarnedAchievement[];
}

export class PracticeError extends Error {}

/** Chấm một câu luyện tập / thử thách, lưu bài làm, cộng điểm kinh nghiệm, xét huy hiệu. */
export async function submitPracticeAnswer(
  db: Database,
  userId: string,
  questionId: number,
  rawResponse: unknown,
  context: 'practice' | 'challenge',
): Promise<PracticeFeedback> {
  const q = await getQuestion(db, questionId);
  if (!q || q.status !== 'published') throw new PracticeError('Câu hỏi không tồn tại hoặc đã bị ẩn.');
  const response = normalizeResponse(q.type, rawResponse);
  if (!response) throw new PracticeError('Bài làm không hợp lệ.');
  const grade = gradeResponse(q.type, q.answers, q.settings, response);

  return db.tx(async (t) => {
    // Chống gửi dồn dập: tối đa 1 lần nộp mỗi câu trong 2 giây
    const recent = await t.one(sql`
      select 1 from question_responses where user_id = ${userId} and question_id = ${questionId}
        and created_at > now() - interval '2 seconds'`);
    if (recent) throw new PracticeError('Bạn vừa nộp câu này. Đợi một chút rồi thử lại.');
    await t.exec(sql`
      insert into question_responses (user_id, question_id, context, response, status, score, points_awarded)
      values (${userId}, ${questionId}, ${context}, ${response}, ${grade.status}, ${grade.score},
        ${grade.score === null ? null : grade.score * q.points})`);
    let xpGained = 0;
    if (grade.status === 'correct') {
      xpGained += await awardXp(t, userId, context === 'challenge' ? XP_CHALLENGE : XP_CORRECT, context === 'challenge' ? 'challenge_correct' : 'practice_correct', `q:${questionId}`);
    }
    const achievements = await evaluateAchievements(t, userId);
    return { status: grade.status, score: grade.score, correctCount: grade.correctCount, xpGained, achievements, ...revealAnswer(q) };
  });
}
