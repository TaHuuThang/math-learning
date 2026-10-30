import { type Ctx, type Res, redirect, safeNext, serializeCookie } from '../http/context';
import { page } from '../http/render';
import { createSession, destroySession, loginBlocked, recordLoginAttempt, SESSION_COOKIE } from '../auth/session';
import { verifyPassword } from '../auth/password';
import { audit, countAdmins, createUser, findLoginUser, normalizeUsername, UserInputError } from '../../domain/users';
import { joinClassByCode } from '../../domain/classes';
import { Button, ErrorList, Field, PostForm, Select } from '../../ui/components/ui';
import { sql } from '../db';
import { BRAND } from '../../shared/brand';

const DUMMY_HASH = 'scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$' + 'A'.repeat(86) + '==';

function setSessionCookie(ctx: Ctx, token: string) {
  ctx.outCookies.push(serializeCookie(SESSION_COOKIE, token, { secure: ctx.secure, maxAge: ctx.config.sessionDays * 86400 }));
}

function homeFor(role: string) {
  return role === 'teacher' || role === 'admin' ? '/giao-vien' : '/';
}

// ---------------- Đăng nhập ----------------

function LoginForm({ next, username, errors }: { next: string; username?: string; errors?: string[] }) {
  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight">Đăng nhập</h1>
      <p className="mt-1 text-[15px] text-ink-2">Dùng tên đăng nhập thầy cô cấp hoặc tài khoản em đã tạo.</p>
      <div className="mt-6">
        <ErrorList errors={errors} />
        <PostForm action={`/dang-nhap?next=${encodeURIComponent(next)}`} className="space-y-4">
          <Field label="Tên đăng nhập" name="username" defaultValue={username} required autoComplete="username" maxLength={40} />
          <Field label="Mật khẩu" name="password" type="password" required autoComplete="current-password" maxLength={128} />
          <Button className="w-full" size="lg">
            Đăng nhập
          </Button>
        </PostForm>
        <p className="mt-6 text-center text-[15px] text-ink-2">
          Chưa có tài khoản?{' '}
          <a href="/dang-ky" className="font-semibold text-tim-700 hover:underline">
            Đăng ký tài khoản học sinh
          </a>
        </p>
        <p className="mt-2 text-center text-[13px] text-ink-3">Quên mật khẩu? Nhờ thầy cô đặt lại mật khẩu trong trang quản lý lớp.</p>
      </div>
    </>
  );
}

export async function loginPage(ctx: Ctx): Promise<Res> {
  const next = safeNext(ctx.query.get('next'));
  if (ctx.user) return redirect(next === '/' ? homeFor(ctx.user.role) : next);
  if ((await countAdmins(ctx.db)) === 0) return redirect('/cai-dat-ban-dau');
  return page(ctx, { title: 'Đăng nhập', layout: 'auth' }, <LoginForm next={next} />);
}

export async function loginSubmit(ctx: Ctx): Promise<Res> {
  const form = await ctx.form();
  const next = safeNext(ctx.query.get('next'));
  const username = normalizeUsername(form.str('username', 60));
  const password = form.str('password', 200);
  const fail = (msg: string, status = 401) => {
    const r = page(ctx, { title: 'Đăng nhập', layout: 'auth', status }, <LoginForm next={next} username={username} errors={[msg]} />);
    return r;
  };
  if (!username || !password) return fail('Nhập tên đăng nhập và mật khẩu.', 422);
  if (await loginBlocked(ctx.db, username, ctx.ip)) {
    return fail('Đăng nhập sai quá nhiều lần. Hãy thử lại sau 15 phút.', 429);
  }
  const user = await findLoginUser(ctx.db, username);
  // Luôn chạy băm để thời gian phản hồi như nhau dù có hay không có tài khoản
  const ok = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) {
    await recordLoginAttempt(ctx.db, username, ctx.ip, false);
    return fail('Tên đăng nhập hoặc mật khẩu không đúng.');
  }
  if (user.status !== 'active') {
    await recordLoginAttempt(ctx.db, username, ctx.ip, false);
    return fail('Tài khoản đang bị khóa. Hãy liên hệ thầy cô hoặc quản trị viên.', 403);
  }
  await recordLoginAttempt(ctx.db, username, ctx.ip, true);
  const token = await createSession(ctx.db, user.id, { ip: ctx.ip, userAgent: String(ctx.req.headers['user-agent'] ?? ''), days: ctx.config.sessionDays });
  setSessionCookie(ctx, token);
  return redirect(next === '/' ? homeFor(user.role) : next);
}

export async function logout(ctx: Ctx): Promise<Res> {
  if (ctx.sessionTokenHash) await destroySession(ctx.db, ctx.sessionTokenHash);
  ctx.outCookies.push(serializeCookie(SESSION_COOKIE, '', { maxAge: 0, secure: ctx.secure }));
  ctx.setFlash({ type: 'info', message: 'Em đã đăng xuất.' });
  return redirect('/');
}

// ---------------- Đăng ký học sinh ----------------

interface RegisterValues {
  fullName?: string;
  username?: string;
  gradeLevel?: string;
  classCode?: string;
  school?: string;
}

async function RegisterView(ctx: Ctx, values: RegisterValues = {}, errors?: string[], status = 200): Promise<Res> {
  const grades = await ctx.db.many<{ level: number; status: string }>(sql`select level, status from grades where status <> 'hidden' order by level`);
  return page(
    ctx,
    { title: 'Đăng ký', layout: 'auth', status },
    <>
      <h1 className="text-2xl font-extrabold tracking-tight">Tạo tài khoản học sinh</h1>
      <p className="mt-1 text-[15px] text-ink-2">Tài khoản giáo viên do quản trị viên của trường cấp.</p>
      <div className="mt-6">
        <ErrorList errors={errors} />
        <PostForm action="/dang-ky" className="space-y-4">
          <Field label="Họ và tên" name="full_name" defaultValue={values.fullName} required autoComplete="name" maxLength={120} />
          <Field
            label="Tên đăng nhập"
            name="username"
            defaultValue={values.username}
            required
            autoComplete="username"
            maxLength={40}
            hint="3–40 kí tự: chữ thường không dấu, số, dấu chấm, gạch dưới. Ví dụ: an.nguyen8a1"
          />
          <Field label="Mật khẩu" name="password" type="password" required autoComplete="new-password" hint="Ít nhất 8 kí tự, có cả chữ và số." maxLength={128} />
          <Field label="Nhập lại mật khẩu" name="password2" type="password" required autoComplete="new-password" maxLength={128} />
          <Select
            label="Khối lớp"
            name="grade_level"
            defaultValue={values.gradeLevel ?? '8'}
            options={grades.map((g) => ({ value: g.level, label: g.status === 'active' ? `Lớp ${g.level}` : `Lớp ${g.level} (nội dung sắp ra mắt)` }))}
          />
          <Field label="Trường (không bắt buộc)" name="school" defaultValue={values.school} maxLength={120} />
          <Field label="Mã lớp (nếu thầy cô đã cho)" name="class_code" defaultValue={values.classCode} maxLength={10} hint="Gồm 6 kí tự, ví dụ K7P2QX. Có thể nhập sau ở trang cá nhân." />
          <Button className="w-full" size="lg">
            Tạo tài khoản
          </Button>
        </PostForm>
        <p className="mt-6 text-center text-[15px] text-ink-2">
          Đã có tài khoản?{' '}
          <a href="/dang-nhap" className="font-semibold text-tim-700 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </>,
  );
}

export async function registerPage(ctx: Ctx): Promise<Res> {
  if (ctx.user) return redirect('/');
  return RegisterView(ctx);
}

export async function registerSubmit(ctx: Ctx): Promise<Res> {
  if (ctx.user) return redirect('/');
  const form = await ctx.form();
  const values: RegisterValues = {
    fullName: form.str('full_name', 120),
    username: normalizeUsername(form.str('username', 60)),
    gradeLevel: form.str('grade_level', 2),
    classCode: form.str('class_code', 10),
    school: form.str('school', 120),
  };
  const password = form.str('password', 200);
  if (password !== form.str('password2', 200)) return RegisterView(ctx, values, ['Hai lần nhập mật khẩu không khớp.'], 422);
  const grade = Number(values.gradeLevel);
  if (![6, 7, 8, 9].includes(grade)) return RegisterView(ctx, values, ['Chọn khối lớp.'], 422);
  let userId: string;
  let joined: string | null = null;
  try {
    userId = await ctx.db.tx(async (t) => {
      const id = await createUser(t, {
        username: values.username!,
        password,
        fullName: values.fullName!,
        role: 'student',
        gradeLevel: grade,
        school: values.school || null,
      });
      if (values.classCode) joined = (await joinClassByCode(t, id, values.classCode)).name;
      return id;
    });
  } catch (err) {
    if (err instanceof UserInputError) return RegisterView(ctx, values, [err.message], 422);
    throw err;
  }
  await audit(ctx.db, userId, 'register', userId);
  const token = await createSession(ctx.db, userId, { ip: ctx.ip, userAgent: String(ctx.req.headers['user-agent'] ?? ''), days: ctx.config.sessionDays });
  setSessionCookie(ctx, token);
  ctx.setFlash({ type: 'success', message: joined ? `Chào mừng em! Em đã vào lớp ${joined}.` : `Chào mừng em đến với ${BRAND}!` });
  return redirect('/');
}

// ---------------- Cài đặt ban đầu: tạo quản trị viên đầu tiên ----------------

async function SetupView(ctx: Ctx, values: { fullName?: string; username?: string } = {}, errors?: string[], status = 200): Promise<Res> {
  return page(
    ctx,
    { title: 'Cài đặt ban đầu', layout: 'auth', status },
    <>
      <h1 className="text-2xl font-extrabold tracking-tight">Tạo tài khoản quản trị</h1>
      <p className="mt-1 text-[15px] text-ink-2">
        Hệ thống chưa có quản trị viên. Tài khoản tạo ở đây có toàn quyền: tạo tài khoản giáo viên, quản lý chương trình và mọi lớp học. Trang này tự khóa sau khi tạo xong.
      </p>
      <div className="mt-6">
        <ErrorList errors={errors} />
        <PostForm action="/cai-dat-ban-dau" className="space-y-4">
          <Field label="Họ và tên" name="full_name" defaultValue={values.fullName} required maxLength={120} />
          <Field label="Tên đăng nhập" name="username" defaultValue={values.username} required maxLength={40} autoComplete="username" />
          <Field label="Mật khẩu" name="password" type="password" required autoComplete="new-password" hint="Ít nhất 8 kí tự, có cả chữ và số." maxLength={128} />
          <Field label="Nhập lại mật khẩu" name="password2" type="password" required autoComplete="new-password" maxLength={128} />
          <Button className="w-full" size="lg">
            Tạo tài khoản quản trị
          </Button>
        </PostForm>
      </div>
    </>,
  );
}

export async function setupPage(ctx: Ctx): Promise<Res> {
  if ((await countAdmins(ctx.db)) > 0) return redirect('/dang-nhap');
  return SetupView(ctx);
}

export async function setupSubmit(ctx: Ctx): Promise<Res> {
  if ((await countAdmins(ctx.db)) > 0) return redirect('/dang-nhap');
  const form = await ctx.form();
  const values = { fullName: form.str('full_name', 120), username: normalizeUsername(form.str('username', 60)) };
  const password = form.str('password', 200);
  if (password !== form.str('password2', 200)) return SetupView(ctx, values, ['Hai lần nhập mật khẩu không khớp.'], 422);
  let id: string;
  try {
    id = await ctx.db.tx(async (t) => {
      // Khóa để hai người không cùng tạo quản trị viên đầu tiên
      await t.exec(sql`lock table users in share row exclusive mode`);
      const existing = await t.one<{ n: number }>(sql`select count(*)::int as n from users u join roles r on r.id = u.role_id where r.code = 'admin'`);
      if (existing!.n > 0) throw new UserInputError('Đã có quản trị viên.');
      return createUser(t, { username: values.username, password, fullName: values.fullName, role: 'admin' });
    });
  } catch (err) {
    if (err instanceof UserInputError) return SetupView(ctx, values, [err.message], 422);
    throw err;
  }
  await audit(ctx.db, id, 'setup_admin', id);
  const token = await createSession(ctx.db, id, { ip: ctx.ip, userAgent: String(ctx.req.headers['user-agent'] ?? ''), days: ctx.config.sessionDays });
  setSessionCookie(ctx, token);
  ctx.setFlash({ type: 'success', message: 'Đã tạo tài khoản quản trị. Bước tiếp theo: tạo tài khoản giáo viên.' });
  return redirect('/quan-tri/tai-khoan');
}
