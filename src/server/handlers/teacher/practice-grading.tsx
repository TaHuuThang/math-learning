import { HttpError, redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { sql } from '../../db';
import { intParam } from '../common';
import { getQuestions, toView } from '../../../domain/questions';
import { Badge, Button, EmptyState, Html, Notice, PageTitle, Panel, PostForm } from '../../../ui/components/ui';
import { LEVEL_LABELS, TYPE_LABELS, formatDate } from '../../../shared/labels';
import { renderRich } from '../../../shared/richtext';

interface PendingRow {
  id: number;
  questionId: number;
  studentName: string;
  className: string | null;
  response: { text?: string; images?: number[] };
  createdAt: Date;
  sessionId: number;
  sessionTitle: string;
}

/** Bài tự luận học sinh làm trong luyện tập, chờ giáo viên chấm (chỉ học sinh thuộc lớp của giáo viên). */
async function pendingPractice(ctx: Ctx, limit: number): Promise<PendingRow[]> {
  const user = requireTeacher(ctx);
  const all = user.role === 'admin';
  return ctx.db.many<PendingRow>(sql`
    select r.id, r.question_id, u.full_name as student_name,
      (select string_agg(c.name, ', ') from class_members m join classes c on c.id = m.class_id where m.student_id = r.user_id and (${all} or c.teacher_id = ${user.id})) as class_name,
      r.response, r.created_at, s.id as session_id, s.title as session_title
    from question_responses r join practice_sessions s on s.id = r.practice_session_id join users u on u.id = r.user_id
    where r.status = 'pending' and r.practice_session_id is not null
      and (${all} or exists (select 1 from class_members m join classes c on c.id = m.class_id where m.student_id = r.user_id and c.teacher_id = ${user.id}))
    order by r.created_at limit ${limit}`);
}

export async function practiceGradingPage(ctx: Ctx): Promise<Res> {
  requireTeacher(ctx);
  const rows = await pendingPractice(ctx, 20);
  const questions = await getQuestions(ctx.db, [...new Set(rows.map((r) => r.questionId))]);
  const byId = new Map(questions.map((q) => [q.id, q]));
  return page(
    ctx,
    { title: 'Chấm tự luận luyện tập', layout: 'dashboard', section: 'tests' },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/de-kiem-tra', label: 'Đề kiểm tra' }, { label: 'Chấm tự luận luyện tập' }]}
        title="Chấm bài tự luận trong luyện tập"
        sub="Bài tự luận học sinh lớp thầy/cô làm khi luyện tập. Hệ thống không tự kết luận đúng sai câu tự luận – thầy/cô chấm theo hướng dẫn chấm."
      />
      {rows.length ? (
        <div className="space-y-6">
          {rows.map((r) => {
            const q = byId.get(r.questionId);
            if (!q) return null;
            const view = toView(q, false);
            return (
              <Panel key={r.id} className="p-5 md:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-[13px]">
                  <strong className="text-[15px]">{r.studentName}</strong>
                  {r.className && <Badge tone="gray">{r.className}</Badge>}
                  <Badge>{TYPE_LABELS[q.type]}</Badge>
                  <Badge tone="gray">{LEVEL_LABELS[q.level]}</Badge>
                  <span className="text-ink-3">
                    {r.sessionTitle} · {formatDate(r.createdAt)}
                  </span>
                </div>
                <Html className="prose-math text-[16px]" html={view.stemHtml} />
                {view.mediaHtml.map((h, i) => (
                  <Html key={i} className="mt-3 flex justify-center rounded-xl border border-line p-3" html={h} />
                ))}
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl bg-mist p-4">
                    <div className="mb-1 text-sm font-bold text-ink-2">Bài làm của học sinh</div>
                    <Html className="prose-math" html={renderRich(r.response?.text || '(không có chữ)')} />
                    {r.response?.images?.map((img) => (
                      <a key={img} href={`/media/${img}`} target="_blank" rel="noreferrer">
                        <img src={`/media/${img}`} alt="Ảnh bài làm" className="mt-2 max-h-80 w-auto rounded-lg border border-line" />
                      </a>
                    ))}
                  </div>
                  <div className="rounded-xl border border-line p-4">
                    <div className="mb-1 text-sm font-bold text-ink-2">Lời giải tham khảo</div>
                    {q.solution ? <Html className="prose-math text-[15px]" html={renderRich(q.solution)} /> : <p className="text-ink-3">Chưa có.</p>}
                    {q.rubric && (
                      <>
                        <div className="mb-1 mt-3 text-sm font-bold text-ink-2">Hướng dẫn chấm</div>
                        <Html className="prose-math text-[15px]" html={renderRich(q.rubric)} />
                      </>
                    )}
                  </div>
                </div>
                <PostForm action={`/giao-vien/cham-luyen-tap/${r.id}`} className="mt-4 grid gap-3 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-end">
                  <label className="block text-sm font-semibold text-ink-2">
                    Điểm đạt (tối đa {q.points.toLocaleString('vi-VN')})
                    <input type="number" name="diem" min={0} max={q.points} step={0.25} required className="mt-1.5 w-full rounded-xl border border-line-2 px-3 py-2 text-[15px]" />
                  </label>
                  <label className="block text-sm font-semibold text-ink-2">
                    Nhận xét cho học sinh
                    <input name="nhan-xet" maxLength={1000} className="mt-1.5 w-full rounded-xl border border-line-2 px-3 py-2 text-[15px]" placeholder="Ví dụ: Lập luận đúng, thiếu kết luận." />
                  </label>
                  <Button>Lưu điểm</Button>
                </PostForm>
              </Panel>
            );
          })}
        </div>
      ) : (
        <EmptyState title="Không có bài tự luận nào chờ chấm">Khi học sinh lớp thầy/cô nộp câu tự luận trong luyện tập, bài sẽ hiện ở đây.</EmptyState>
      )}
      <Notice tone="info" className="mt-6">
        Điểm và nhận xét hiện ngay trong trang kết quả luyện tập của học sinh. Bài tự luận trong đề kiểm tra được chấm ở trang “Kết quả” của từng đề.
      </Notice>
    </>,
  );
}

export async function practiceGradingAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const id = intParam(ctx, 'id');
  const rows = await pendingPractice(ctx, 500);
  const row = rows.find((r) => r.id === id);
  if (!row) throw new HttpError(404, 'Không tìm thấy bài làm chờ chấm (có thể đã được chấm).');
  const [q] = await getQuestions(ctx.db, [row.questionId]);
  const form = await ctx.form();
  const pts = form.num('diem');
  if (pts === null || pts < 0 || pts > q.points) return redirect('/giao-vien/cham-luyen-tap', { type: 'error', message: `Điểm phải từ 0 đến ${q.points}.` }, ctx);
  const frac = q.points ? pts / q.points : 0;
  const status = frac >= 0.999 ? 'correct' : frac <= 0 ? 'incorrect' : 'partial';
  await ctx.db.tx(async (t) => {
    await t.exec(sql`
      update question_responses set status = ${status}, score = ${frac}, points_awarded = ${pts}, feedback = ${form.str('nhan-xet', 1000) || null},
        graded_by = ${user.id}, graded_at = now()
      where id = ${id} and status = 'pending'`);
    // cập nhật lại tổng kết của lượt luyện tập
    await t.exec(sql`
      update practice_sessions s set
        pending_count = (select count(*) from question_responses r where r.practice_session_id = s.id and r.status = 'pending'),
        correct_count = (select count(*) from question_responses r where r.practice_session_id = s.id and r.status = 'correct'),
        partial_count = (select count(*) from question_responses r where r.practice_session_id = s.id and r.status = 'partial'),
        incorrect_count = (select count(*) from question_responses r where r.practice_session_id = s.id and r.status = 'incorrect' and coalesce(r.response->>'kind', '') <> 'empty'),
        score = (select coalesce(sum(r.points_awarded), 0) from question_responses r where r.practice_session_id = s.id)
      where s.id = ${row.sessionId} and s.status = 'submitted'`);
  });
  return redirect('/giao-vien/cham-luyen-tap', { type: 'success', message: `Đã chấm bài của ${row.studentName}.` }, ctx);
}
