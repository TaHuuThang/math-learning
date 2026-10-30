import { HttpError, RedirectSignal, type Ctx, type Role, type SessionUser } from '../http/context';

/** Bắt buộc đăng nhập; chưa đăng nhập → chuyển tới trang đăng nhập rồi quay lại. */
export function requireUser(ctx: Ctx): SessionUser {
  if (!ctx.user) {
    const next = ctx.method === 'GET' ? ctx.path + ctx.url.search : '/';
    throw new RedirectSignal(`/dang-nhap?next=${encodeURIComponent(next)}`);
  }
  return ctx.user;
}

export function requireRole(ctx: Ctx, ...roles: Role[]): SessionUser {
  const user = requireUser(ctx);
  if (!roles.includes(user.role)) throw new HttpError(403, 'Trang này dành cho ' + roles.map(roleName).join(' hoặc ') + '.');
  return user;
}

export const requireTeacher = (ctx: Ctx) => requireRole(ctx, 'teacher', 'admin');
export const requireAdmin = (ctx: Ctx) => requireRole(ctx, 'admin');

function roleName(r: Role) {
  return r === 'admin' ? 'quản trị viên' : r === 'teacher' ? 'giáo viên' : 'học sinh';
}

export function isStaff(user: SessionUser | null) {
  return !!user && (user.role === 'teacher' || user.role === 'admin');
}
