import type { Ctx, Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { requireBook } from '../common';
import { sql } from '../../db';
import { listClasses } from '../../../domain/classes';
import { chapterStats, hardestQuestions, lessonCompletionStats, testAverages } from '../../../domain/stats';
import { lessonLabel } from '../../../domain/curriculum';
import { EmptyState, PageTitle, Panel, Select, buttonClass } from '../../../ui/components/ui';
import { TYPE_SHORT, formatNumber, percent } from '../../../shared/labels';
import { plainExcerpt } from '../../../shared/richtext';

export async function statsPage(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const book = await requireBook(ctx);
  const classes = await listClasses(ctx.db, user);
  const classId = Number(ctx.query.get('lop')) || null;
  const selected = classes.find((c) => c.id === classId) ?? null;
  const scopeIds = selected ? [selected.id] : classes.map((c) => c.id);
  const students = scopeIds.length
    ? (await ctx.db.many<{ id: string }>(sql`select distinct student_id as id from class_members where class_id = any(${scopeIds}::int[])`)).map((r) => r.id)
    : [];
  const [chapters, completion, hardest, tests] = await Promise.all([
    chapterStats(ctx.db, students, book.id),
    lessonCompletionStats(ctx.db, students, book.id),
    hardestQuestions(ctx.db, students),
    testAverages(ctx.db, user, selected?.id ?? null),
  ]);
  const answered = chapters.reduce((s, c) => s + c.answered, 0);
  const correct = chapters.reduce((s, c) => s + c.correct, 0);
  return page(
    ctx,
    { title: 'Thống kê kết quả', layout: 'dashboard', section: 'stats' },
    <>
      <PageTitle title="Thống kê kết quả" sub={`${selected ? `Lớp ${selected.name}` : 'Tất cả lớp của thầy/cô'} · ${students.length} học sinh · ${answered} lượt trả lời · tỉ lệ đúng ${percent(correct, answered)}%`} />
      <form method="get" className="mb-6 flex max-w-sm items-end gap-2">
        <Select
          label="Phạm vi"
          name="lop"
          className="flex-1"
          defaultValue={selected?.id ?? ''}
          autoSubmit
          options={[{ value: '', label: 'Tất cả lớp' }, ...classes.map((c) => ({ value: c.id, label: `${c.name} (${c.schoolYear})` }))]}
        />
        <button className={buttonClass('secondary', 'md')}>Xem</button>
      </form>
      {students.length === 0 ? (
        <EmptyState title="Chưa có dữ liệu">Thống kê xuất hiện khi lớp có học sinh học và luyện tập.</EmptyState>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <Panel className="p-5">
            <h2 className="mb-1 text-lg font-extrabold">Tỉ lệ trả lời đúng theo chương</h2>
            <p className="mb-4 text-[13px] text-ink-3">Gồm luyện tập, thử thách và kiểm tra (không tính câu chờ chấm).</p>
            <ul className="space-y-3">
              {chapters
                .filter((c) => c.kind === 'chapter')
                .map((c) => {
                  const rate = c.answered ? percent(c.correct, c.answered) : null;
                  return (
                    <li key={c.code}>
                      <div className="flex justify-between gap-3 text-[14px]">
                        <span className="truncate">
                          <strong className="text-tim-700">{c.code}.</strong> {c.title}
                        </span>
                        <span className="shrink-0 tabular-nums text-ink-2">{rate === null ? 'chưa có' : `${rate}% · ${c.answered} lượt · ${c.students} HS`}</span>
                      </div>
                      <div className="bar mt-1">
                        <span style={{ width: `${rate ?? 0}%`, background: rate !== null && rate < 50 ? 'var(--color-le)' : undefined }} />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Panel>
          <Panel className="p-5">
            <h2 className="mb-1 text-lg font-extrabold">Mức độ hoàn thành bài học</h2>
            <p className="mb-4 text-[13px] text-ink-3">Trung bình số mục mỗi học sinh đã đánh dấu học xong / số mục của chương.</p>
            <ul className="space-y-3">
              {completion
                .filter((c) => c.kind === 'chapter')
                .map((c) => {
                  const avg = students.length ? c.completions / students.length : 0;
                  const rate = percent(avg, c.lessons);
                  return (
                    <li key={c.code}>
                      <div className="flex justify-between gap-3 text-[14px]">
                        <span className="truncate">
                          <strong className="text-tim-700">{c.code}.</strong> {c.title}
                        </span>
                        <span className="shrink-0 tabular-nums text-ink-2">
                          {formatNumber(avg, 1)}/{c.lessons} mục
                        </span>
                      </div>
                      <div className="bar bar-tre mt-1">
                        <span style={{ width: `${rate}%` }} />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Panel>
          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Câu hỏi nhiều học sinh làm sai</h2>
            {hardest.length ? (
              <ol className="divide-y divide-line">
                {hardest.map((q) => (
                  <li key={q.id} className="py-2.5">
                    <div className="flex justify-between gap-3">
                      <a href={`/giao-vien/cau-hoi/${q.id}/xem`} className="min-w-0 text-[14px] hover:text-tim-700 hover:underline">
                        {plainExcerpt(q.stem, 100)}
                      </a>
                      <span className="shrink-0 text-[14px] font-bold text-le">{q.rate}% đúng</span>
                    </div>
                    <div className="text-[12px] text-ink-3">
                      #{q.id} · {TYPE_SHORT[q.type as keyof typeof TYPE_SHORT]} · {q.answered} lượt
                      {q.lessonTitle ? ` · ${lessonLabel({ kind: q.lessonKind ?? 'lesson', number: q.lessonNumber, title: q.lessonTitle })}` : ''}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-[14px] text-ink-2">Cần ít nhất 3 lượt trả lời cho một câu để thống kê.</p>
            )}
          </Panel>
          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Điểm trung bình bài kiểm tra</h2>
            {tests.length ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Đề</th>
                    <th>Bài nộp</th>
                    <th>TB (/10)</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <a href={`/giao-vien/de-kiem-tra/${t.id}/ket-qua`} className="hover:text-tim-700 hover:underline">
                          {t.title}
                        </a>
                      </td>
                      <td>{t.submitted}</td>
                      <td className="font-bold">{t.avgTen === null ? '–' : formatNumber(t.avgTen)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-[14px] text-ink-2">Chưa có đề kiểm tra.</p>
            )}
          </Panel>
        </div>
      )}
    </>,
  );
}
