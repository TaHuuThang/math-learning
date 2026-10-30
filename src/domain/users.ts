import { sql, PgError, type Queryable } from '../server/db';
import { hashPassword, passwordProblem } from '../server/auth/password';
import type { Role } from '../server/http/context';

export const USERNAME_RE = /^[a-z0-9._-]{3,40}$/;

export function normalizeUsername(s: string) {
  return s.trim().toLowerCase();
}

export function usernameProblem(username: string): string | null {
  if (!USERNAME_RE.test(username)) return 'Tên đăng nhập gồm 3–40 kí tự: chữ thường không dấu, số, dấu chấm, gạch dưới hoặc gạch ngang.';
  return null;
}

export class UserInputError extends Error {}

export interface NewUser {
  username: string;
  password: string;
  fullName: string;
  role: Role;
  gradeLevel?: number;
  email?: string | null;
  school?: string | null;
}

/** Tạo tài khoản (kèm hồ sơ học sinh/giáo viên). Dùng trong giao dịch. */
export async function createUser(q: Queryable, input: NewUser): Promise<string> {
  const username = normalizeUsername(input.username);
  const problems = [usernameProblem(username), passwordProblem(input.password)].filter(Boolean) as string[];
  const fullName = input.fullName.trim().replace(/\s+/g, ' ');
  if (fullName.length < 2 || fullName.length > 120) problems.push('Họ và tên cần từ 2 đến 120 kí tự.');
  if (problems.length) throw new UserInputError(problems.join(' '));
  const hash = await hashPassword(input.password);
  let row: { id: string } | null;
  try {
    row = await q.one<{ id: string }>(sql`
      insert into users (username, email, password_hash, full_name, role_id)
      values (${username}, ${input.email?.trim() || null}, ${hash}, ${fullName}, (select id from roles where code = ${input.role}))
      returning id`);
  } catch (err) {
    if (err instanceof PgError && err.code === '23505') throw new UserInputError(`Tên đăng nhập "${username}" đã có người dùng.`);
    throw err;
  }
  const id = row!.id;
  if (input.role === 'student') {
    const grade = await q.one<{ id: number }>(sql`select id from grades where level = ${input.gradeLevel ?? 8}`);
    if (!grade) throw new UserInputError('Khối lớp không hợp lệ.');
    await q.exec(sql`insert into students (user_id, grade_id, school) values (${id}, ${grade.id}, ${input.school ?? null})`);
  } else if (input.role === 'teacher') {
    await q.exec(sql`insert into teachers (user_id, school) values (${id}, ${input.school ?? null})`);
  }
  return id;
}

export async function findLoginUser(q: Queryable, username: string) {
  return q.one<{ id: string; passwordHash: string; status: string; role: Role }>(sql`
    select u.id, u.password_hash, u.status, r.code as role
    from users u join roles r on r.id = u.role_id
    where lower(u.username) = lower(${normalizeUsername(username)})`);
}

export async function setPassword(q: Queryable, userId: string, password: string) {
  const problem = passwordProblem(password);
  if (problem) throw new UserInputError(problem);
  await q.exec(sql`update users set password_hash = ${await hashPassword(password)}, updated_at = now() where id = ${userId}`);
}

export async function getUserProfile(q: Queryable, userId: string) {
  return q.one<{
    id: string;
    username: string;
    fullName: string;
    email: string | null;
    role: Role;
    gradeLevel: number | null;
    school: string | null;
    createdAt: Date;
    lastLoginAt: Date | null;
  }>(sql`
    select u.id, u.username, u.full_name, u.email, r.code as role, g.level as grade_level,
      coalesce(st.school, t.school) as school, u.created_at, u.last_login_at
    from users u join roles r on r.id = u.role_id
    left join students st on st.user_id = u.id
    left join grades g on g.id = st.grade_id
    left join teachers t on t.user_id = u.id
    where u.id = ${userId}`);
}

export async function audit(q: Queryable, actorId: string | null, action: string, target: string | null, detail?: unknown) {
  await q.exec(sql`insert into audit_logs (actor_id, action, target, detail) values (${actorId}, ${action}, ${target}, ${detail ?? null})`);
}

export async function countAdmins(q: Queryable) {
  const r = await q.one<{ n: number }>(sql`select count(*)::int as n from users u join roles r on r.id = u.role_id where r.code = 'admin'`);
  return r?.n ?? 0;
}

export interface UserListRow {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  status: string;
  gradeLevel: number | null;
  createdAt: Date;
  lastLoginAt: Date | null;
}

export async function listUsers(q: Queryable, opts: { role?: string; search?: string; limit: number; offset: number }) {
  const role = opts.role && ['admin', 'teacher', 'student'].includes(opts.role) ? opts.role : null;
  const search = opts.search ? `%${opts.search.toLowerCase()}%` : null;
  const where = sql`
    where (${role}::text is null or r.code = ${role})
      and (${search}::text is null or lower(u.full_name) like ${search} or lower(u.username) like ${search})`;
  const rows = await q.many<UserListRow>(sql`
    select u.id, u.username, u.full_name, r.code as role, u.status, g.level as grade_level, u.created_at, u.last_login_at
    from users u join roles r on r.id = u.role_id
    left join students st on st.user_id = u.id left join grades g on g.id = st.grade_id
    ${where}
    order by r.id, u.full_name
    limit ${opts.limit} offset ${opts.offset}`);
  const total = await q.one<{ n: number }>(sql`select count(*)::int as n from users u join roles r on r.id = u.role_id ${where}`);
  return { rows, total: total?.n ?? 0 };
}
