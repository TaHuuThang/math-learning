import { HttpError, redirect, type Ctx, type Res } from '../../http/context';
import { page } from '../../http/render';
import { requireTeacher } from '../../auth/guards';
import { sql } from '../../db';
import { intParam, uuidParam } from '../common';
import { destroyUserSessions } from '../../auth/session';
import { generateTempPassword } from '../../auth/password';
import {
  addExistingStudentToClass,
  addNewStudentToClass,
  classMembers,
  createClass,
  currentSchoolYear,
  getClassForUser,
  listClasses,
  regenerateJoinCode,
  removeMember,
  teacherCanManageStudent,
  teacherStudents,
  updateClass,
} from '../../../domain/classes';
import { audit, normalizeUsername, setPassword, UserInputError } from '../../../domain/users';
import { leaderboard } from '../../../domain/gamification';
import { Badge, Button, EmptyState, ErrorList, Field, Notice, PageTitle, Panel, PostForm, Select, buttonClass } from '../../../ui/components/ui';
import { formatDate, formatDateTime, percent } from '../../../shared/labels';

export async function classesPage(ctx: Ctx, errors?: string[], values?: Record<string, string>): Promise<Res> {
  const user = requireTeacher(ctx);
  const classes = await listClasses(ctx.db, user);
  return page(
    ctx,
    { title: 'Lớp học', layout: 'dashboard', section: 'classes', status: errors ? 422 : 200 },
    <>
      <PageTitle title="Lớp học" sub="Mỗi lớp có một mã để học sinh tự tham gia. Thầy/cô cũng có thể tạo tài khoản cho học sinh ngay trong lớp." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          {classes.length ? (
            <Panel className="overflow-x-auto">
              <table className="data-table min-w-[560px]">
                <thead>
                  <tr>
                    <th>Lớp</th>
                    <th>Năm học</th>
                    <th>Mã lớp</th>
                    <th>Học sinh</th>
                    {user.role === 'admin' && <th>Giáo viên</th>}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {classes.map((c) => (
                    <tr key={c.id}>
                      <td className="font-semibold">
                        {c.name} {c.status === 'archived' && <Badge tone="gray">Lưu trữ</Badge>}
                      </td>
                      <td>{c.schoolYear}</td>
                      <td className="font-mono font-bold tracking-wider">{c.joinCode}</td>
                      <td>{c.memberCount}</td>
                      {user.role === 'admin' && <td>{c.teacherName}</td>}
                      <td className="text-right">
                        <a href={`/giao-vien/lop/${c.id}`} className={buttonClass('quiet', 'sm')}>
                          Mở lớp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
          ) : (
            <EmptyState title="Chưa có lớp nào">Tạo lớp ở khung bên cạnh, ví dụ 8A1 năm học {currentSchoolYear()}.</EmptyState>
          )}
        </div>
        <Panel className="h-fit p-5">
          <h2 className="text-lg font-extrabold">Tạo lớp mới</h2>
          <div className="mt-3">
            <ErrorList errors={errors} />
          </div>
          <PostForm action="/giao-vien/lop" className="space-y-3">
            <Field label="Tên lớp" name="name" required maxLength={40} placeholder="8A1" defaultValue={values?.name} />
            <Field label="Năm học" name="school_year" required defaultValue={values?.schoolYear ?? currentSchoolYear()} hint="Dạng 2026-2027" />
            <Select label="Khối" name="grade_level" defaultValue={values?.gradeLevel ?? '8'} options={[6, 7, 8, 9].map((g) => ({ value: g, label: `Lớp ${g}` }))} />
            <Button className="w-full">Tạo lớp</Button>
          </PostForm>
        </Panel>
      </div>
    </>,
  );
}

export async function createClassAction(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const form = await ctx.form();
  const values = { name: form.str('name', 40), schoolYear: form.str('school_year', 9), gradeLevel: form.str('grade_level', 2) };
  try {
    const id = await createClass(ctx.db, user.id, { name: values.name, schoolYear: values.schoolYear, gradeLevel: Number(values.gradeLevel) });
    return redirect(`/giao-vien/lop/${id}`, { type: 'success', message: `Đã tạo lớp ${values.name}.` }, ctx);
  } catch (err) {
    if (err instanceof UserInputError) return classesPage(ctx, [err.message], values);
    throw err;
  }
}

async function loadClass(ctx: Ctx) {
  const user = requireTeacher(ctx);
  const c = await getClassForUser(ctx.db, intParam(ctx, 'id'), user);
  if (!c) throw new HttpError(404, 'Không tìm thấy lớp hoặc lớp không do thầy/cô quản lý.');
  return { user, c };
}

export async function classDetailPage(ctx: Ctx, opts: { errors?: string[]; created?: { username: string; password: string; name: string } } = {}): Promise<Res> {
  const { c } = await loadClass(ctx);
  const members = await classMembers(ctx.db, c.id);
  const top = await leaderboard(ctx.db, { range: 'week', classId: c.id, limit: 5 });
  return page(
    ctx,
    { title: `Lớp ${c.name}`, layout: 'dashboard', section: 'classes', status: opts.errors ? 422 : 200 },
    <>
      <PageTitle
        crumbs={[{ href: '/giao-vien/lop', label: 'Lớp học' }, { label: c.name }]}
        title={`Lớp ${c.name}`}
        sub={`Năm học ${c.schoolYear} · ${c.memberCount} học sinh · giáo viên ${c.teacherName}`}
        actions={
          <a href={`/giao-vien/thong-ke?lop=${c.id}`} className={buttonClass('secondary', 'md')}>
            Thống kê lớp
          </a>
        }
      />
      {opts.created && (
        <Notice tone="success" className="mb-5">
          Đã tạo tài khoản cho <strong>{opts.created.name}</strong>. Tên đăng nhập: <strong className="font-mono">{opts.created.username}</strong> – mật khẩu tạm:{' '}
          <strong className="font-mono">{opts.created.password}</strong>. Hãy ghi lại và đưa cho học sinh; mật khẩu này sẽ không hiển thị lại.
        </Notice>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <Panel className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <div className="text-[14px] text-ink-3">Mã lớp – học sinh nhập ở trang cá nhân hoặc khi đăng ký</div>
              <div className="mt-1 font-mono text-[34px] font-extrabold tracking-[0.18em] text-tim-700">{c.joinCode}</div>
            </div>
            <div className="flex gap-2">
              <button type="button" data-copy={c.joinCode} className={buttonClass('secondary', 'sm')}>
                Sao chép mã
              </button>
              <PostForm action={`/giao-vien/lop/${c.id}/ma-moi`} confirm="Tạo mã lớp mới? Mã cũ sẽ không dùng được nữa.">
                <button className={buttonClass('quiet', 'sm')}>Tạo mã mới</button>
              </PostForm>
            </div>
          </Panel>

          <Panel className="overflow-x-auto">
            {members.length ? (
              <table className="data-table min-w-[720px]">
                <thead>
                  <tr>
                    <th>Học sinh</th>
                    <th>Bài học xong</th>
                    <th>Câu đã làm</th>
                    <th>Tỉ lệ đúng</th>
                    <th>XP</th>
                    <th>Đăng nhập gần nhất</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div className="font-semibold">{m.fullName}</div>
                        <div className="font-mono text-[12px] text-ink-3">@{m.username}</div>
                      </td>
                      <td>{m.lessonsCompleted}</td>
                      <td>{m.answered}</td>
                      <td>{m.answered ? `${percent(m.correct, m.answered)}%` : '–'}</td>
                      <td className="font-semibold text-tim-700">{m.xp}</td>
                      <td className="text-[13px] text-ink-3">{m.lastLoginAt ? formatDateTime(m.lastLoginAt) : 'Chưa đăng nhập'}</td>
                      <td className="whitespace-nowrap text-right">
                        <PostForm action={`/giao-vien/lop/${c.id}/dat-lai-mat-khau`} className="inline" confirm={`Đặt lại mật khẩu cho ${m.fullName}?`}>
                          <input type="hidden" name="student_id" value={m.id} />
                          <button className={buttonClass('quiet', 'sm')}>Đặt lại mật khẩu</button>
                        </PostForm>{' '}
                        <PostForm action={`/giao-vien/lop/${c.id}/xoa-hoc-sinh`} className="inline" confirm={`Xóa ${m.fullName} khỏi lớp? Tài khoản và kết quả học tập vẫn được giữ.`}>
                          <input type="hidden" name="student_id" value={m.id} />
                          <button className={buttonClass('ghost', 'sm', 'text-le hover:bg-le-soft')}>Xóa khỏi lớp</button>
                        </PostForm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-5">
                <EmptyState title="Lớp chưa có học sinh">Đưa mã lớp cho học sinh, hoặc tạo tài khoản học sinh ở khung bên cạnh.</EmptyState>
              </div>
            )}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Tạo tài khoản học sinh</h2>
            <div className="mt-3">
              <ErrorList errors={opts.errors} />
            </div>
            <PostForm action={`/giao-vien/lop/${c.id}/them-hoc-sinh`} className="space-y-3">
              <Field label="Họ và tên" name="full_name" required maxLength={120} />
              <Field label="Tên đăng nhập" name="username" required maxLength={40} hint="Chữ thường không dấu, số, dấu chấm. VD: an.nguyen" />
              <Field label="Mật khẩu (để trống để tạo tự động)" name="password" maxLength={128} />
              <Button className="w-full">Tạo và thêm vào lớp</Button>
            </PostForm>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Thêm học sinh đã có tài khoản</h2>
            <PostForm action={`/giao-vien/lop/${c.id}/them-co-san`} className="mt-3 flex items-end gap-2">
              <Field label="Tên đăng nhập" name="username" required maxLength={40} className="flex-1" />
              <Button variant="secondary" className="mb-[1px]">
                Thêm
              </Button>
            </PostForm>
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Tích cực nhất 7 ngày qua</h2>
            {top.length ? (
              <ol className="mt-2 space-y-1.5 text-[15px]">
                {top.map((t) => (
                  <li key={t.userId} className="flex justify-between">
                    <span>
                      {t.rank}. {t.fullName}
                    </span>
                    <span className="font-semibold text-tim-700">{t.xp} XP</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-[14px] text-ink-2">Chưa có hoạt động trong tuần.</p>
            )}
          </Panel>
          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Thông tin lớp</h2>
            <PostForm action={`/giao-vien/lop/${c.id}/sua`} className="mt-3 space-y-3">
              <Field label="Tên lớp" name="name" required defaultValue={c.name} maxLength={40} />
              <Field label="Năm học" name="school_year" required defaultValue={c.schoolYear} />
              <Select label="Trạng thái" name="status" defaultValue={c.status} options={[{ value: 'active', label: 'Đang học' }, { value: 'archived', label: 'Lưu trữ (không nhận học sinh mới)' }]} />
              <Button variant="secondary">Lưu thông tin lớp</Button>
            </PostForm>
            <p className="mt-3 text-[12px] text-ink-3">Tạo ngày {formatDate(c.createdAt)}</p>
          </Panel>
        </div>
      </div>
    </>,
  );
}

export async function classAction(ctx: Ctx): Promise<Res> {
  const { user, c } = await loadClass(ctx);
  const form = await ctx.form();
  const back = `/giao-vien/lop/${c.id}`;
  const action = ctx.params.action;
  try {
    switch (action) {
      case 'ma-moi':
        await regenerateJoinCode(ctx.db, c.id);
        return redirect(back, { type: 'success', message: 'Đã tạo mã lớp mới.' }, ctx);
      case 'sua':
        await updateClass(ctx.db, c.id, { name: form.str('name', 40), schoolYear: form.str('school_year', 9), status: form.str('status') });
        return redirect(back, { type: 'success', message: 'Đã lưu thông tin lớp.' }, ctx);
      case 'them-hoc-sinh': {
        const password = form.str('password', 128) || generateTempPassword();
        const username = normalizeUsername(form.str('username', 60));
        const fullName = form.str('full_name', 120);
        const id = await addNewStudentToClass(ctx.db, c.id, c.gradeLevel, { username, password, fullName });
        await audit(ctx.db, user.id, 'create_student', id, { classId: c.id });
        return classDetailPage(ctx, { created: { username, password, name: fullName } });
      }
      case 'them-co-san':
        await addExistingStudentToClass(ctx.db, c.id, form.str('username', 60));
        return redirect(back, { type: 'success', message: 'Đã thêm học sinh vào lớp.' }, ctx);
      case 'xoa-hoc-sinh':
        await removeMember(ctx.db, c.id, form.str('student_id', 40));
        return redirect(back, { type: 'success', message: 'Đã xóa học sinh khỏi lớp.' }, ctx);
      case 'dat-lai-mat-khau': {
        const studentId = form.str('student_id', 40);
        return resetStudentPassword(ctx, studentId, back);
      }
      default:
        throw new HttpError(404);
    }
  } catch (err) {
    if (err instanceof UserInputError) {
      if (action === 'them-hoc-sinh') return classDetailPage(ctx, { errors: [err.message] });
      return redirect(back, { type: 'error', message: err.message }, ctx);
    }
    throw err;
  }
}

async function resetStudentPassword(ctx: Ctx, studentId: string, back: string): Promise<Res> {
  const user = requireTeacher(ctx);
  if (!/^[0-9a-f-]{36}$/i.test(studentId) || !(await teacherCanManageStudent(ctx.db, user, studentId))) {
    throw new HttpError(403, 'Thầy/cô chỉ đặt lại mật khẩu cho học sinh trong lớp mình.');
  }
  const password = generateTempPassword();
  await setPassword(ctx.db, studentId, password);
  await destroyUserSessions(ctx.db, studentId);
  await audit(ctx.db, user.id, 'reset_password', studentId);
  const s = await ctx.db.one<{ fullName: string; username: string }>(sql`select full_name, username from users where id = ${studentId}`);
  return redirect(back, { type: 'success', message: `Mật khẩu mới của ${s?.fullName} (@${s?.username}): ${password} – hãy ghi lại, mật khẩu không hiển thị lại.` }, ctx);
}

// ---------------- Học sinh (mọi lớp) ----------------

export async function studentsPage(ctx: Ctx): Promise<Res> {
  const user = requireTeacher(ctx);
  const q = ctx.query.get('q')?.slice(0, 60) ?? '';
  const rows = await teacherStudents(ctx.db, user, q || null);
  return page(
    ctx,
    { title: 'Học sinh', layout: 'dashboard', section: 'students' },
    <>
      <PageTitle title="Học sinh" sub="Học sinh trong các lớp thầy/cô quản lý, kèm tiến độ và kết quả luyện tập." />
      <form method="get" className="mb-4 flex max-w-md gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Tìm theo tên hoặc tên đăng nhập"
          aria-label="Tìm học sinh"
          className="w-full rounded-xl border border-line-2 bg-white px-3.5 py-2.5 text-[15px] focus:border-tim-500 focus:outline-none"
        />
        <button className={buttonClass('secondary', 'md')}>Tìm</button>
      </form>
      {rows.length ? (
        <Panel className="overflow-x-auto">
          <table className="data-table min-w-[760px]">
            <thead>
              <tr>
                <th>Học sinh</th>
                <th>Lớp</th>
                <th>Bài học xong</th>
                <th>Câu đã làm</th>
                <th>Tỉ lệ đúng</th>
                <th>XP</th>
                <th>Trạng thái</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="font-semibold">{s.fullName}</div>
                    <div className="font-mono text-[12px] text-ink-3">@{s.username}</div>
                  </td>
                  <td>{s.classes}</td>
                  <td>{s.lessonsCompleted}</td>
                  <td>{s.answered}</td>
                  <td>{s.answered ? `${percent(s.correct, s.answered)}%` : '–'}</td>
                  <td className="font-semibold text-tim-700">{s.xp}</td>
                  <td>{s.status === 'active' ? <Badge tone="tre">Hoạt động</Badge> : <Badge tone="le">Bị khóa</Badge>}</td>
                  <td className="text-right">
                    <PostForm action={`/giao-vien/hoc-sinh/${s.id}/dat-lai-mat-khau`} confirm={`Đặt lại mật khẩu cho ${s.fullName}?`}>
                      <button className={buttonClass('quiet', 'sm')}>Đặt lại mật khẩu</button>
                    </PostForm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      ) : (
        <EmptyState title={q ? 'Không tìm thấy học sinh phù hợp' : 'Chưa có học sinh'}>
          {q ? 'Thử từ khóa khác.' : 'Học sinh xuất hiện ở đây khi tham gia lớp của thầy/cô.'}
        </EmptyState>
      )}
    </>,
  );
}

export async function studentResetAction(ctx: Ctx): Promise<Res> {
  return resetStudentPassword(ctx, uuidParam(ctx, 'id'), '/giao-vien/hoc-sinh');
}
