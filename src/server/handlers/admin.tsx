import { HttpError, redirect, type Ctx, type Res } from '../http/context';
import { page } from '../http/render';
import { requireAdmin } from '../auth/guards';
import { paging, queryString, uuidParam } from './common';
import { sql } from '../db';
import { generateTempPassword } from '../auth/password';
import { destroyUserSessions } from '../auth/session';
import { audit, createUser, listUsers, normalizeUsername, setPassword, UserInputError } from '../../domain/users';
import { systemInfo } from '../../domain/stats';
import type { Role } from '../http/context';
import { Badge, Button, ErrorList, Field, Notice, PageTitle, Pager, Panel, PostForm, Select, buttonClass } from '../../ui/components/ui';
import { ROLE_LABELS, formatDateTime } from '../../shared/labels';

export async function adminSystemPage(ctx: Ctx): Promise<Res> {
  requireAdmin(ctx);
  const grades = await ctx.db.many<{ id: number; level: number; name: string; status: string; textbooks: number }>(sql`
    select g.id, g.level, g.name, g.status, (select count(*)::int from textbooks t where t.grade_id = g.id) as textbooks
    from grades g order by g.level`);
  const info = await systemInfo(ctx.db);
  const logs = await ctx.db.many<{ id: number; action: string; target: string | null; createdAt: Date; actor: string | null }>(sql`
    select a.id, a.action, a.target, a.created_at, u.full_name as actor from audit_logs a left join users u on u.id = a.actor_id
    order by a.created_at desc limit 15`);
  return page(
    ctx,
    { title: 'Khối lớp & hệ thống', layout: 'dashboard', section: 'system' },
    <>
      <PageTitle title="Khối lớp & hệ thống" sub="Mở hoặc ẩn khối lớp; xem tình trạng cơ sở dữ liệu và nhật ký thao tác quan trọng." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel className="p-5">
          <h2 className="mb-3 text-lg font-extrabold">Khối lớp</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Khối</th>
                <th>Bộ sách</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id}>
                  <td className="font-semibold">Toán {g.level}</td>
                  <td>{g.textbooks ? `${g.textbooks} bộ sách` : <span className="text-ink-3">Chưa có nội dung</span>}</td>
                  <td>
                    <PostForm action="/quan-tri/khoi-lop" className="flex items-center gap-2">
                      <input type="hidden" name="grade_id" value={g.id} />
                      <select name="status" defaultValue={g.status} aria-label={`Trạng thái Toán ${g.level}`} className="rounded-lg border border-line-2 px-2 py-1 text-[14px]">
                        <option value="active">Đang mở</option>
                        <option value="coming_soon">Sắp ra mắt</option>
                        <option value="hidden">Ẩn</option>
                      </select>
                      <button className={buttonClass('quiet', 'sm')}>Lưu</button>
                    </PostForm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[13px] text-ink-3">Chỉ mở khối lớp khi đã có bộ sách và bài học. Khối "Sắp ra mắt" hiện trên trang chủ nhưng không vào được.</p>
        </Panel>
        <Panel className="p-5">
          <h2 className="mb-3 text-lg font-extrabold">Hệ thống</h2>
          <dl className="space-y-2 text-[14px]">
            <div>
              <dt className="text-ink-3">PostgreSQL</dt>
              <dd className="font-mono text-[13px]">{info.version.split(' on ')[0]}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Phiên bản lược đồ</dt>
              <dd className="font-mono text-[13px]">{info.migrations}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Dung lượng CSDL</dt>
              <dd>{info.dbSize}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Tài khoản / phiên đăng nhập còn hạn</dt>
              <dd>
                {info.users} / {info.sessions}
              </dd>
            </div>
          </dl>
        </Panel>
        <Panel className="p-5 xl:col-span-2">
          <h2 className="mb-3 text-lg font-extrabold">Nhật ký thao tác gần đây</h2>
          {logs.length ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Người thực hiện</th>
                  <th>Thao tác</th>
                  <th>Đối tượng</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.id}>
                    <td className="text-[13px]">{formatDateTime(l.createdAt)}</td>
                    <td>{l.actor ?? '–'}</td>
                    <td className="font-mono text-[13px]">{l.action}</td>
                    <td className="font-mono text-[12px] text-ink-3">{l.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-[14px] text-ink-2">Chưa có thao tác nào.</p>
          )}
        </Panel>
      </div>
    </>,
  );
}

export async function adminGradeAction(ctx: Ctx): Promise<Res> {
  const user = requireAdmin(ctx);
  const form = await ctx.form();
  const status = form.str('status');
  if (!['active', 'coming_soon', 'hidden'].includes(status)) throw new HttpError(400);
  await ctx.db.exec(sql`update grades set status = ${status} where id = ${form.int('grade_id')}`);
  await audit(ctx.db, user.id, 'grade_status', String(form.int('grade_id')), { status });
  return redirect('/quan-tri', { type: 'success', message: 'Đã cập nhật trạng thái khối lớp.' }, ctx);
}

export async function adminAccountsPage(ctx: Ctx, opts: { errors?: string[]; created?: { username: string; password: string } } = {}): Promise<Res> {
  const me = requireAdmin(ctx);
  const role = ctx.query.get('vai-tro') ?? '';
  const q = ctx.query.get('q')?.slice(0, 60) ?? '';
  const pg = paging(ctx, 40);
  const { rows, total } = await listUsers(ctx.db, { role, search: q || undefined, limit: pg.limit, offset: pg.offset });
  return page(
    ctx,
    { title: 'Tài khoản', layout: 'dashboard', section: 'accounts', status: opts.errors ? 422 : 200 },
    <>
      <PageTitle title="Tài khoản" sub={`${total} tài khoản. Giáo viên do quản trị viên tạo; học sinh tự đăng ký hoặc do giáo viên tạo trong lớp.`} />
      {opts.created && (
        <Notice tone="success" className="mb-5">
          Đã tạo tài khoản <strong className="font-mono">{opts.created.username}</strong> với mật khẩu <strong className="font-mono">{opts.created.password}</strong>. Hãy gửi cho người dùng và nhắc đổi mật khẩu sau khi đăng nhập.
        </Notice>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <form method="get" className="mb-4 flex flex-wrap items-end gap-2">
            <Select label="Vai trò" name="vai-tro" defaultValue={role} autoSubmit options={[{ value: '', label: 'Tất cả' }, { value: 'admin', label: 'Quản trị viên' }, { value: 'teacher', label: 'Giáo viên' }, { value: 'student', label: 'Học sinh' }]} />
            <Field label="Tìm" name="q" defaultValue={q} />
            <button className={buttonClass('secondary', 'md')}>Lọc</button>
          </form>
          <Panel className="overflow-x-auto">
            <table className="data-table min-w-[720px]">
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Đăng nhập gần nhất</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="font-semibold">{u.fullName}</div>
                      <div className="font-mono text-[12px] text-ink-3">@{u.username}</div>
                    </td>
                    <td>
                      {ROLE_LABELS[u.role]}
                      {u.gradeLevel ? ` lớp ${u.gradeLevel}` : ''}
                    </td>
                    <td>{u.status === 'active' ? <Badge tone="tre">Hoạt động</Badge> : <Badge tone="le">Bị khóa</Badge>}</td>
                    <td className="text-[13px] text-ink-3">{u.lastLoginAt ? formatDateTime(u.lastLoginAt) : 'Chưa đăng nhập'}</td>
                    <td className="whitespace-nowrap text-right">
                      {u.id !== me.id && (
                        <>
                          <PostForm action={`/quan-tri/tai-khoan/${u.id}`} className="inline" confirm={`Đặt lại mật khẩu cho ${u.fullName}?`}>
                            <input type="hidden" name="_action" value="reset" />
                            <button className={buttonClass('quiet', 'sm')}>Đặt lại mật khẩu</button>
                          </PostForm>{' '}
                          <PostForm action={`/quan-tri/tai-khoan/${u.id}`} className="inline" confirm={u.status === 'active' ? `Khóa tài khoản ${u.fullName}?` : undefined}>
                            <input type="hidden" name="_action" value={u.status === 'active' ? 'lock' : 'unlock'} />
                            <button className={buttonClass(u.status === 'active' ? 'ghost' : 'quiet', 'sm', u.status === 'active' ? 'text-le hover:bg-le-soft' : '')}>
                              {u.status === 'active' ? 'Khóa' : 'Mở khóa'}
                            </button>
                          </PostForm>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
          <Pager page={pg.page} pages={pg.pages(total)} base={`/quan-tri/tai-khoan${queryString({ 'vai-tro': role, q })}`} />
        </div>
        <Panel className="h-fit p-5">
          <h2 className="mb-3 text-lg font-extrabold">Tạo tài khoản</h2>
          <ErrorList errors={opts.errors} />
          <PostForm action="/quan-tri/tai-khoan" className="space-y-3">
            <Select label="Vai trò" name="role" defaultValue="teacher" options={[{ value: 'teacher', label: 'Giáo viên' }, { value: 'admin', label: 'Quản trị viên' }, { value: 'student', label: 'Học sinh (lớp 8)' }]} />
            <Field label="Họ và tên" name="full_name" required maxLength={120} />
            <Field label="Tên đăng nhập" name="username" required maxLength={40} />
            <Field label="Trường" name="school" maxLength={120} />
            <Field label="Mật khẩu (để trống để tạo tự động)" name="password" maxLength={128} />
            <Button className="w-full">Tạo tài khoản</Button>
          </PostForm>
        </Panel>
      </div>
    </>,
  );
}

export async function adminCreateAccount(ctx: Ctx): Promise<Res> {
  const me = requireAdmin(ctx);
  const form = await ctx.form();
  const role = form.str('role') as Role;
  if (!['admin', 'teacher', 'student'].includes(role)) throw new HttpError(400);
  const password = form.str('password', 128) || generateTempPassword() + 'A';
  const username = normalizeUsername(form.str('username', 60));
  try {
    const id = await createUser(ctx.db, { username, password, fullName: form.str('full_name', 120), role, gradeLevel: 8, school: form.str('school', 120) || null });
    await audit(ctx.db, me.id, 'create_user', id, { role });
  } catch (err) {
    if (err instanceof UserInputError) return adminAccountsPage(ctx, { errors: [err.message] });
    throw err;
  }
  return adminAccountsPage(ctx, { created: { username, password } });
}

export async function adminAccountAction(ctx: Ctx): Promise<Res> {
  const me = requireAdmin(ctx);
  const id = uuidParam(ctx, 'id');
  if (id === me.id) throw new HttpError(400, 'Không tự khóa hoặc đặt lại mật khẩu tài khoản của chính mình ở đây.');
  const target = await ctx.db.one<{ fullName: string; username: string }>(sql`select full_name, username from users where id = ${id}`);
  if (!target) throw new HttpError(404);
  const form = await ctx.form();
  const action = form.str('_action');
  if (action === 'lock' || action === 'unlock') {
    await ctx.db.exec(sql`update users set status = ${action === 'lock' ? 'locked' : 'active'}, updated_at = now() where id = ${id}`);
    if (action === 'lock') await destroyUserSessions(ctx.db, id);
    await audit(ctx.db, me.id, action === 'lock' ? 'lock_user' : 'unlock_user', id);
    return redirect('/quan-tri/tai-khoan', { type: 'success', message: action === 'lock' ? `Đã khóa ${target.fullName}.` : `Đã mở khóa ${target.fullName}.` }, ctx);
  }
  if (action === 'reset') {
    const password = generateTempPassword();
    await setPassword(ctx.db, id, password);
    await destroyUserSessions(ctx.db, id);
    await audit(ctx.db, me.id, 'reset_password', id);
    return redirect('/quan-tri/tai-khoan', { type: 'success', message: `Mật khẩu mới của ${target.fullName} (@${target.username}): ${password}` }, ctx);
  }
  throw new HttpError(400);
}

export function registerAdminRoutes(r: import('../http/router').Router) {
  r.get('/quan-tri', adminSystemPage);
  r.post('/quan-tri/khoi-lop', adminGradeAction);
  r.get('/quan-tri/tai-khoan', (ctx) => adminAccountsPage(ctx));
  r.post('/quan-tri/tai-khoan', adminCreateAccount);
  r.post('/quan-tri/tai-khoan/:id', adminAccountAction);
}
