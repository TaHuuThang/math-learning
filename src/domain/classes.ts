import crypto from 'node:crypto';
import { sql, PgError, type Database, type Queryable } from '../server/db';
import type { SessionUser } from '../server/http/context';
import { createUser, UserInputError, type NewUser } from './users';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateJoinCode() {
  return Array.from({ length: 6 }, () => CODE_CHARS[crypto.randomInt(CODE_CHARS.length)]).join('');
}

export function currentSchoolYear(now = new Date()) {
  // Năm học bắt đầu tháng 8
  const y = now.getUTCFullYear();
  return now.getUTCMonth() >= 7 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
}

export interface ClassRow {
  id: number;
  name: string;
  schoolYear: string;
  gradeLevel: number;
  joinCode: string;
  status: string;
  teacherId: string;
  teacherName: string;
  memberCount: number;
  createdAt: Date;
}

const CLASS_SELECT = sql`
  select c.id, c.name, c.school_year, g.level as grade_level, c.join_code, c.status, c.teacher_id, u.full_name as teacher_name,
    (select count(*)::int from class_members m where m.class_id = c.id) as member_count, c.created_at
  from classes c join grades g on g.id = c.grade_id join users u on u.id = c.teacher_id`;

export async function listClasses(q: Queryable, user: SessionUser): Promise<ClassRow[]> {
  const all = user.role === 'admin';
  return q.many<ClassRow>(sql`${CLASS_SELECT} where (${all}::boolean or c.teacher_id = ${user.id}) order by c.status, c.school_year desc, c.name`);
}

/** Lấy lớp nếu người dùng có quyền (giáo viên chủ quản hoặc quản trị). */
export async function getClassForUser(q: Queryable, id: number, user: SessionUser): Promise<ClassRow | null> {
  const c = await q.one<ClassRow>(sql`${CLASS_SELECT} where c.id = ${id}`);
  if (!c) return null;
  if (user.role !== 'admin' && c.teacherId !== user.id) return null;
  return c;
}

export async function createClass(db: Database, teacherId: string, input: { name: string; schoolYear: string; gradeLevel: number }) {
  const name = input.name.trim();
  if (!name || name.length > 40) throw new UserInputError('Tên lớp cần từ 1 đến 40 kí tự (ví dụ 8A1).');
  if (!/^\d{4}-\d{4}$/.test(input.schoolYear)) throw new UserInputError('Năm học viết dạng 2026-2027.');
  const grade = await db.one<{ id: number }>(sql`select id from grades where level = ${input.gradeLevel}`);
  if (!grade) throw new UserInputError('Khối lớp không hợp lệ.');
  const textbook = await db.one<{ id: number }>(sql`select id from textbooks where grade_id = ${grade.id} and is_default`);
  for (let i = 0; i < 5; i++) {
    try {
      const row = await db.one<{ id: number }>(sql`
        insert into classes (name, grade_id, textbook_id, school_year, teacher_id, join_code)
        values (${name}, ${grade.id}, ${textbook?.id ?? null}, ${input.schoolYear}, ${teacherId}, ${generateJoinCode()}) returning id`);
      return row!.id;
    } catch (err) {
      if (!(err instanceof PgError && err.code === '23505')) throw err;
    }
  }
  throw new Error('Không tạo được mã lớp duy nhất');
}

export async function updateClass(q: Queryable, id: number, input: { name: string; schoolYear: string; status: string }) {
  if (!input.name.trim() || input.name.length > 40) throw new UserInputError('Tên lớp cần từ 1 đến 40 kí tự.');
  if (!/^\d{4}-\d{4}$/.test(input.schoolYear)) throw new UserInputError('Năm học viết dạng 2026-2027.');
  await q.exec(sql`update classes set name = ${input.name.trim()}, school_year = ${input.schoolYear},
    status = ${input.status === 'archived' ? 'archived' : 'active'} where id = ${id}`);
}

export async function regenerateJoinCode(q: Queryable, id: number) {
  await q.exec(sql`update classes set join_code = ${generateJoinCode()} where id = ${id}`);
}

export interface MemberRow {
  id: string;
  username: string;
  fullName: string;
  status: string;
  joinedAt: Date;
  lastLoginAt: Date | null;
  lessonsCompleted: number;
  answered: number;
  correct: number;
  xp: number;
}

export async function classMembers(q: Queryable, classId: number): Promise<MemberRow[]> {
  return q.many<MemberRow>(sql`
    select u.id, u.username, u.full_name, u.status, m.joined_at, u.last_login_at,
      (select count(*)::int from learning_progress p where p.user_id = u.id and p.status = 'completed') as lessons_completed,
      (select count(*)::int from question_responses r where r.user_id = u.id and r.status <> 'pending') as answered,
      (select count(*)::int from question_responses r where r.user_id = u.id and r.status = 'correct') as correct,
      (select coalesce(sum(amount), 0)::int from xp_events e where e.user_id = u.id) as xp
    from class_members m join users u on u.id = m.student_id
    where m.class_id = ${classId} order by u.full_name`);
}

export async function addNewStudentToClass(db: Database, classId: number, gradeLevel: number, input: Omit<NewUser, 'role' | 'gradeLevel'>) {
  return db.tx(async (t) => {
    const id = await createUser(t, { ...input, role: 'student', gradeLevel });
    await t.exec(sql`insert into class_members (class_id, student_id) values (${classId}, ${id})`);
    return id;
  });
}

export async function addExistingStudentToClass(q: Queryable, classId: number, username: string) {
  const s = await q.one<{ id: string; role: string }>(sql`
    select u.id, r.code as role from users u join roles r on r.id = u.role_id where lower(u.username) = lower(${username.trim()})`);
  if (!s) throw new UserInputError(`Không có tài khoản "${username}".`);
  if (s.role !== 'student') throw new UserInputError('Chỉ thêm được tài khoản học sinh vào lớp.');
  const n = await q.exec(sql`insert into class_members (class_id, student_id) values (${classId}, ${s.id}) on conflict do nothing`);
  if (!n) throw new UserInputError('Học sinh này đã ở trong lớp.');
}

export async function removeMember(q: Queryable, classId: number, studentId: string) {
  await q.exec(sql`delete from class_members where class_id = ${classId} and student_id = ${studentId}`);
}

export async function joinClassByCode(q: Queryable, studentId: string, code: string): Promise<{ name: string }> {
  const c = await q.one<{ id: number; name: string; status: string }>(sql`
    select id, name, status from classes where join_code = ${code.trim().toUpperCase()}`);
  if (!c || c.status !== 'active') throw new UserInputError('Mã lớp không đúng hoặc lớp đã đóng. Hãy hỏi lại thầy cô mã lớp.');
  const n = await q.exec(sql`insert into class_members (class_id, student_id) values (${c.id}, ${studentId}) on conflict do nothing`);
  if (!n) throw new UserInputError(`Bạn đã ở trong lớp ${c.name}.`);
  return { name: c.name };
}

export async function studentClasses(q: Queryable, studentId: string) {
  return q.many<{ id: number; name: string; schoolYear: string; teacherName: string }>(sql`
    select c.id, c.name, c.school_year, u.full_name as teacher_name
    from class_members m join classes c on c.id = m.class_id join users u on u.id = c.teacher_id
    where m.student_id = ${studentId} order by c.school_year desc, c.name`);
}

/** Giáo viên chỉ quản lý học sinh trong lớp của mình; quản trị quản lý tất cả. */
export async function teacherCanManageStudent(q: Queryable, user: SessionUser, studentId: string) {
  if (user.role === 'admin') return true;
  const r = await q.one(sql`
    select 1 from class_members m join classes c on c.id = m.class_id where m.student_id = ${studentId} and c.teacher_id = ${user.id}`);
  return !!r;
}

export interface TeacherStudentRow extends MemberRow {
  classes: string;
}

export async function teacherStudents(q: Queryable, user: SessionUser, search: string | null): Promise<TeacherStudentRow[]> {
  const all = user.role === 'admin';
  const s = search ? `%${search.toLowerCase()}%` : null;
  return q.many<TeacherStudentRow>(sql`
    select u.id, u.username, u.full_name, u.status, min(m.joined_at) as joined_at, u.last_login_at,
      string_agg(distinct c.name, ', ') as classes,
      (select count(*)::int from learning_progress p where p.user_id = u.id and p.status = 'completed') as lessons_completed,
      (select count(*)::int from question_responses r where r.user_id = u.id and r.status <> 'pending') as answered,
      (select count(*)::int from question_responses r where r.user_id = u.id and r.status = 'correct') as correct,
      (select coalesce(sum(amount), 0)::int from xp_events e where e.user_id = u.id) as xp
    from class_members m join classes c on c.id = m.class_id join users u on u.id = m.student_id
    where (${all}::boolean or c.teacher_id = ${user.id})
      and (${s}::text is null or lower(u.full_name) like ${s} or lower(u.username) like ${s})
    group by u.id order by u.full_name limit 500`);
}
