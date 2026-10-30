import { useState } from 'react';
import { PracticeCore, type Feedback, type GradeFn } from '../islands/PracticeRunner';
import { gradeResponse, normalizeResponse } from '../shared/grading';
import { hasCorrect, recordResponse } from './store';
import { chooseByLevel } from '../shared/pick';
import type { OfflinePractice, OfflineQuestion } from './types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Ưu tiên câu chưa làm đúng, sau đó ngẫu nhiên – giống bản trực tuyến. */
function pick(questions: OfflineQuestion[], limit: number, plan?: Record<number, number>) {
  const s = shuffle(questions);
  if (plan) return chooseByLevel(s, plan);
  return [...s.filter((q) => !hasCorrect(q.id)), ...s.filter((q) => hasCorrect(q.id))].slice(0, limit);
}

export default function LocalPractice({ data, lessonOf }: { data: OfflinePractice; lessonOf?: Record<number, string> }) {
  const [questions] = useState(() => pick(data.questions, data.limit, data.plan));
  const byId = new Map(questions.map((q) => [q.id, q]));

  const grade: GradeFn = async (view, answer, context) => {
    const q = byId.get(view.id)!;
    const response = normalizeResponse(q.type, answer);
    const g = gradeResponse(q.type, q.key.answers, q.key.settings, response);
    const saved = recordResponse({ q: q.id, s: g.status, c: context, lesson: lessonOf?.[q.id] });
    const fb: Feedback = {
      status: g.status,
      score: g.score,
      correctCount: g.correctCount,
      xpGained: saved.xp,
      achievements: saved.badges,
      solutionHtml: q.key.solutionHtml,
    };
    if (q.type === 'mcq') fb.correctChoice = q.key.answers.find((a) => a.isCorrect)?.label;
    if (q.type === 'true_false') fb.correctValues = Object.fromEntries(q.key.answers.map((a) => [a.label, a.isCorrect]));
    if (q.type === 'short_answer') fb.acceptedHtml = q.key.acceptedHtml;
    return fb;
  };

  return (
    <PracticeCore
      questions={questions}
      context={data.context}
      restartHref={data.restartHref}
      backHref={data.backHref}
      backLabel={data.backLabel}
      grade={grade}
      pendingText="Đã lưu bài làm – em tự đối chiếu với lời giải bên dưới."
      pendingSummary="câu tự luận: em tự đối chiếu với lời giải (bản HTML không có giáo viên chấm)."
    />
  );
}
