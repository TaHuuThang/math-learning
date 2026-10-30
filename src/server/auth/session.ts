import { sql, type Queryable } from '../db';
import type { Role, SessionUser } from '../http/context';
import { randomToken, sha256 } from './password';

export const SESSION_COOKIE = 'ml_session';

/** Tạo phiên mới; trả về mã phiên gốc (chỉ lưu bản băm SHA-256 trong CSDL). */
export async function createSession(db: Queryable, userId: string, info: { ip: string; userAgent: string; days: number }) {
  const token = randomToken(32);
  await db.exec(sql`
    insert into sessions (user_id, token_hash, expires_at, ip, user_agent)
    values (${userId}, ${sha256(token)}, now() + make_interval(days => ${info.days}), ${info.ip}, ${info.userAgent.slice(0, 300)})`);
  await db.exec(sql`update users set last_login_at = now() where id = ${userId}`);
  return token;
}

export async function loadSession(db: Queryable, token: string, days: number): Promise<{ user: SessionUser; tokenHash: string } | null> {
  if (!token || token.length > 100) return null;
  const tokenHash = sha256(token);
  const row = await db.one<{
    id: string;
    username: string;
    fullName: string;
    role: Role;
    gradeLevel: number | null;
    lastSeenAt: Date;
  }>(sql`
    select u.id, u.username, u.full_name, r.code as role, g.level as grade_level, s.last_seen_at
    from sessions s
    join users u on u.id = s.user_id
    join roles r on r.id = u.role_id
    left join students st on st.user_id = u.id
    left join grades g on g.id = st.grade_id
    where s.token_hash = ${tokenHash} and s.expires_at > now() and u.status = 'active'`);
  if (!row) return null;
  // Gia hạn phiên trượt, tối đa mỗi 10 phút ghi một lần
  if (Date.now() - row.lastSeenAt.getTime() > 10 * 60_000) {
    await db.exec(sql`
      update sessions set last_seen_at = now(), expires_at = now() + make_interval(days => ${days})
      where token_hash = ${tokenHash}`);
  }
  return {
    tokenHash,
    user: { id: row.id, username: row.username, fullName: row.fullName, role: row.role, gradeLevel: row.gradeLevel },
  };
}

export async function destroySession(db: Queryable, tokenHash: string) {
  await db.exec(sql`delete from sessions where token_hash = ${tokenHash}`);
}

export async function destroyUserSessions(db: Queryable, userId: string, exceptHash?: string | null) {
  await db.exec(sql`delete from sessions where user_id = ${userId} and token_hash <> ${exceptHash ?? ''}`);
}

const WINDOW_MINUTES = 15;
const MAX_FAILURES_PER_USER = 5;
const MAX_FAILURES_PER_IP = 30;

/** Giới hạn đăng nhập sai: 5 lần/tài khoản hoặc 30 lần/địa chỉ IP trong 15 phút. */
export async function loginBlocked(db: Queryable, username: string, ip: string): Promise<boolean> {
  const row = await db.one<{ byUser: number; byIp: number }>(sql`
    select
      count(*) filter (where lower(username) = lower(${username}))::int as by_user,
      count(*) filter (where ip = ${ip})::int as by_ip
    from login_attempts
    where not success and created_at > now() - make_interval(mins => ${WINDOW_MINUTES})
      and (lower(username) = lower(${username}) or ip = ${ip})`);
  return !!row && (row.byUser >= MAX_FAILURES_PER_USER || row.byIp >= MAX_FAILURES_PER_IP);
}

export async function recordLoginAttempt(db: Queryable, username: string, ip: string, success: boolean) {
  await db.exec(sql`insert into login_attempts (username, ip, success) values (${username.slice(0, 60)}, ${ip}, ${success})`);
  if (success) {
    await db.exec(sql`delete from login_attempts where lower(username) = lower(${username}) and not success`);
  }
  // dọn dữ liệu cũ
  await db.exec(sql`delete from login_attempts where created_at < now() - interval '2 days'`);
}
