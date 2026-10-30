import { LuClipboardCheck, LuFileQuestion, LuSchool, LuUsers } from 'react-icons/lu';
import type { Ctx, Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { teacherOverview } from '../../../domain/stats';
import { pendingGrading } from '../../../domain/tests';
import { listClasses } from '../../../domain/classes';
import { EmptyState, LinkButton, PageTitle, Panel } from '../../../ui/components/ui';
import { formatDateTime } from '../../../shared/labels';

export async function teacherHome(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const o = await teacherOverview(ctx.db, user);
  const pending = await pendingGrading(ctx.db, user, 8);
  const classes = (await listClasses(ctx.db, user)).filter((c) => c.status === 'active').slice(0, 6);
  const tiles = [
    { label: 'Lớp đang dạy', value: o.classes, href: '/giao-vien/lop', icon: LuSchool },
    { label: 'Học sinh', value: o.students, sub: `${o.activeStudents7d} học sinh luyện tập trong 7 ngày`, href: '/giao-vien/hoc-sinh', icon: LuUsers },
    { label: 'Câu hỏi đã xuất bản', value: o.questionsPublished, sub: `${o.questionsMine} câu do thầy/cô soạn`, href: '/giao-vien/cau-hoi', icon: LuFileQuestion },
    { label: 'Đề kiểm tra', value: o.tests, sub: `${o.testsPublished} đang phát · ${o.submissions7d} bài nộp trong 7 ngày`, href: '/giao-vien/de-kiem-tra', icon: LuClipboardCheck },
  ];
  return page(
    ctx,
    { title: 'Trang giáo viên', layout: 'dashboard', section: 'overview' },
    <>
      <PageTitle title={`Chào ${user.fullName}`} sub="Tổng quan lớp học, câu hỏi và bài kiểm tra của thầy/cô." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <a key={t.label} href={t.href} className="rounded-[18px] border border-line bg-white p-5 hover:border-tim-300">
              <Icon className="text-2xl text-tim-600" aria-hidden="true" />
              <div className="mt-3 text-3xl font-extrabold tabular-nums">{t.value}</div>
              <div className="font-semibold">{t.label}</div>
              {t.sub && <div className="mt-0.5 text-[13px] text-ink-3">{t.sub}</div>}
            </a>
          );
        })}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <h2 className="text-lg font-extrabold">Bài cần chấm tự luận</h2>
          {pending.length ? (
            <ul className="mt-3 divide-y divide-line">
              {pending.map((p) => (
                <li key={p.resultId} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{p.studentName}</div>
                    <div className="truncate text-[13px] text-ink-3">
                      {p.title} · nộp {formatDateTime(p.submittedAt)} · {p.pendingManual} câu
                    </div>
                  </div>
                  <LinkButton href={`/giao-vien/cham-bai/${p.resultId}`} size="sm">
                    Chấm
                  </LinkButton>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[15px] text-ink-2">Không có bài nào đang chờ chấm.</p>
          )}
        </Panel>
        <Panel className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Lớp học</h2>
            <a href="/giao-vien/lop" className="text-[14px] font-semibold text-tim-700 hover:underline">
              Quản lý lớp
            </a>
          </div>
          {classes.length ? (
            <ul className="mt-3 divide-y divide-line">
              {classes.map((c) => (
                <li key={c.id}>
                  <a href={`/giao-vien/lop/${c.id}`} className="flex items-center justify-between gap-3 py-2.5 hover:text-tim-800">
                    <span className="font-medium">
                      {c.name} <span className="text-[13px] text-ink-3">({c.schoolYear})</span>
                    </span>
                    <span className="text-[14px] text-ink-3">{c.memberCount} học sinh</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Chưa có lớp nào" action={<LinkButton href="/giao-vien/lop">Tạo lớp đầu tiên</LinkButton>}>
              Tạo lớp để có mã lớp cho học sinh tham gia và giao đề kiểm tra.
            </EmptyState>
          )}
        </Panel>
      </div>
    </>,
  );
}
