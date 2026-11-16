import type { Ctx } from '../../http/context';
import type { QuestionFilters } from '../../../domain/questions';

/** Đọc bộ lọc ngân hàng câu hỏi từ địa chỉ trang (dùng chung cho danh sách và xuất tệp). */
export function questionFilters(ctx: Ctx, userId: string, textbookId: number): QuestionFilters & { mine: boolean } {
  const mine = ctx.query.get('cua-toi') === '1';
  return {
    textbookId,
    lessonId: Number(ctx.query.get('bai')) || null,
    topicId: Number(ctx.query.get('dang')) || null,
    type: ctx.query.get('loai') || null,
    level: Number(ctx.query.get('muc')) || null,
    status: ctx.query.get('trang-thai') || null,
    mineOf: mine ? userId : null,
    search: ctx.query.get('q')?.slice(0, 80) || null,
    issues: ctx.query.get('canh-bao') === '1',
    mine,
  };
}
