import { LuCrown, LuFlame } from 'react-icons/lu';
import { redirect, type Ctx, type Res } from '../http/context';
import { page } from '../http/render';
import { requireUser } from '../auth/guards';
import { verifyPassword } from '../auth/password';
import { destroyUserSessions } from '../auth/session';
import { sql } from '../db';
import { getDefaultTextbookForGrade, lessonLabel } from '../../domain/curriculum';
import { chapterProgress, continueLesson, practiceHistory, userStats } from '../../domain/progress';
import { leaderboard, listAchievements } from '../../domain/gamification';
import { joinClassByCode, studentClasses } from '../../domain/classes';
import { getUserProfile, setPassword, UserInputError } from '../../domain/users';
import { BadgeMark, StatLine, tierLabel } from '../../ui/components/learning';
import { Badge, Button, EmptyState, Field, LinkButton, PageTitle, Panel, PostForm, ProgressBar, buttonClass, cx } from '../../ui/components/ui';
import { ROLE_LABELS, TYPE_SHORT, formatDate, formatDateTime, percent } from '../../shared/labels';
import { plainExcerpt } from '../../shared/richtext';

export async function achievementsPage(ctx: Ctx): Promise<Res> {
  const isStudent = ctx.user?.role === 'student';
  const range = ctx.query.get('pham-vi') === 'tuan' ? 'week' : 'all';
  const achievements = await listAchievements(ctx.db, isStudent ? ctx.user!.id : null);
  const leaders = await leaderboard(ctx.db, { range, limit: 20 });
  const earned = achievements.filter((a) => a.earnedAt).length;
  return page(
    ctx,
    { title: 'Thành tích' },
    <>
      <PageTitle
        title="Thành tích"
        sub={isStudent ? `Em đã có ${earned}/${achievements.length} huy hiệu.` : 'Huy hiệu ghi nhận sự chăm chỉ và tiến bộ của học sinh.'}
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section aria-labelledby="huy-hieu">
          <h2 id="huy-hieu" className="mb-4 text-xl font-extrabold">
            Huy hiệu
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {achievements.map((a) => (
              <li key={a.code} className={cx('flex items-center gap-4 rounded-2xl border bg-white p-4', a.earnedAt ? 'border-line' : 'border-dashed border-line-2')}>
                <BadgeMark icon={a.icon} tier={a.tier} earned={!!a.earnedAt} size={60} />
                <div className="min-w-0">
                  <div className="font-bold">{a.name}</div>
                  <div className="text-[14px] text-ink-2">{a.description}</div>
                  <div className="mt-1 text-[12px] text-ink-3">
                    Huy hiệu {tierLabel(a.tier).toLowerCase()}
                    {a.xpReward ? ` · thưởng ${a.xpReward} XP` : ''}
                    {a.earnedAt ? ` · đạt ngày ${formatDate(a.earnedAt)}` : ''}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="xep-hang" id="xep-hang">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="xep-hang-title" className="text-xl font-extrabold">
              Bảng xếp hạng
            </h2>
            <div className="flex rounded-xl bg-mist p-1 text-[14px]" role="tablist" aria-label="Khoảng thời gian">
              <a href="/thanh-tich#xep-hang" role="tab" aria-selected={range === 'all'} className={cx('rounded-lg px-3 py-1', range === 'all' ? 'bg-white font-semibold shadow-sm' : 'text-ink-2')}>
                Tất cả
              </a>
              <a href="/thanh-tich?pham-vi=tuan#xep-hang" role="tab" aria-selected={range === 'week'} className={cx('rounded-lg px-3 py-1', range === 'week' ? 'bg-white font-semibold shadow-sm' : 'text-ink-2')}>
                7 ngày qua
              </a>
            </div>
          </div>
          <Panel className="p-2">
            {leaders.length ? (
              <ol>
                {leaders.map((r) => (
                  <li key={r.userId} className={cx('flex items-center gap-3 rounded-xl px-3 py-2.5', r.userId === ctx.user?.id && 'bg-hl-soft')}>
                    <span className={cx('flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold', r.rank <= 3 ? 'bg-tim-700 text-white' : 'bg-mist text-ink-2')}>
                      {r.rank === 1 ? <LuCrown aria-label="Hạng 1" /> : r.rank}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium">{r.fullName}</span>
                    <span className="font-bold tabular-nums text-tim-700">{r.xp} XP</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="px-3 py-6 text-center text-[15px] text-ink-2">Chưa có học sinh nào có điểm kinh nghiệm trong khoảng thời gian này.</p>
            )}
          </Panel>
          <p className="mt-3 text-[13px] text-ink-3">Điểm kinh nghiệm: câu luyện tập đúng lần đầu +10, câu thử thách +20, học xong một mục +20, nộp bài kiểm tra +20 cộng điểm theo kết quả.</p>
        </section>
      </div>
    </>,
  );
}

export async function profilePage(ctx: Ctx, errors?: { join?: string; password?: string }, status = 200): Promise<Res> {
  const user = requireUser(ctx);
  const profile = await getUserProfile(ctx.db, user.id);
  if (!profile) return redirect('/dang-xuat');
  const isStudent = user.role === 'student';
  const book = await getDefaultTextbookForGrade(ctx.db, profile.gradeLevel ?? 8);
  const stats = isStudent ? await userStats(ctx.db, user.id, book?.id ?? null) : null;
  const chapters = isStudent && book ? await chapterProgress(ctx.db, user.id, book.id) : [];
  const cont = isStudent ? await continueLesson(ctx.db, user.id) : null;
  const history = isStudent ? await practiceHistory(ctx.db, user.id, 20) : [];
  const badges = isStudent ? (await listAchievements(ctx.db, user.id)).filter((a) => a.earnedAt) : [];
  const classes = isStudent ? await studentClasses(ctx.db, user.id) : [];

  return page(
    ctx,
    { title: 'Trang cá nhân', status },
    <>
      <PageTitle title={profile.fullName} sub={`${ROLE_LABELS[profile.role]}${profile.gradeLevel ? ` lớp ${profile.gradeLevel}` : ''} · @${profile.username}${profile.school ? ` · ${profile.school}` : ''}`} />
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Panel className="p-5">
            <div className="text-[14px] text-ink-3">Điểm kinh nghiệm</div>
            <div className="text-3xl font-extrabold text-tim-700">{stats.xp} XP</div>
            <div className="mt-2 flex justify-between text-[13px] text-ink-3">
              <span>Cấp {stats.level}</span>
              <span>
                {stats.levelCurrent}/{stats.levelNext}
              </span>
            </div>
            <ProgressBar value={percent(stats.levelCurrent, stats.levelNext)} label="Tiến tới cấp tiếp theo" />
          </Panel>
          <Panel className="p-5">
            <div className="text-[14px] text-ink-3">Tiến độ học tập</div>
            <div className="text-3xl font-extrabold">{percent(stats.lessonsCompleted, stats.lessonsTotal)}%</div>
            <div className="mt-2 text-[13px] text-ink-3">
              {stats.lessonsCompleted}/{stats.lessonsTotal} mục học xong · {stats.lessonsInProgress} đang học
            </div>
          </Panel>
          <Panel className="p-5">
            <div className="text-[14px] text-ink-3">Câu đã làm</div>
            <div className="text-3xl font-extrabold">{stats.answered}</div>
            <div className="mt-2 text-[13px] text-ink-3">Tỉ lệ chính xác {stats.accuracy}%</div>
          </Panel>
          <Panel className="p-5">
            <div className="text-[14px] text-ink-3">Chuỗi luyện tập</div>
            <div className="flex items-center gap-2 text-3xl font-extrabold">
              <LuFlame className={stats.streak ? 'text-cam' : 'text-line-2'} aria-hidden="true" /> {stats.streak} ngày
            </div>
            <div className="mt-2 text-[13px] text-ink-3">{stats.rank ? `Hạng ${stats.rank} trên bảng xếp hạng` : 'Chưa có hạng'}</div>
          </Panel>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-8">
          {isStudent && (
            <section aria-labelledby="dang-hoc">
              <h2 id="dang-hoc" className="mb-3 text-xl font-extrabold">
                Bài học đang học
              </h2>
              <Panel className="p-5">
                {cont ? (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-[14px] text-ink-3">
                        Chương {cont.chapterCode}. {cont.chapterTitle}
                      </div>
                      <div className="text-lg font-bold">{lessonLabel(cont)}</div>
                    </div>
                    <LinkButton href={`/hoc/${cont.textbookSlug}/bai/${cont.slug}`}>Học tiếp</LinkButton>
                  </div>
                ) : (
                  <p className="text-[15px] text-ink-2">Em chưa mở bài học nào.</p>
                )}
              </Panel>
            </section>
          )}

          {chapters.length > 0 && (
            <section aria-labelledby="tien-do">
              <h2 id="tien-do" className="mb-3 text-xl font-extrabold">
                Tiến độ theo chương
              </h2>
              <Panel className="divide-y divide-line">
                {chapters.map((c) => (
                  <div key={c.code} className="grid items-center gap-3 px-5 py-3 sm:grid-cols-[minmax(0,1fr)_160px_110px]">
                    <div className="min-w-0 truncate text-[15px] font-medium">{c.kind === 'chapter' ? `Chương ${c.code}. ${c.title}` : c.title}</div>
                    <div>
                      <ProgressBar value={percent(c.completed, c.total)} tone="tre" label={`Tiến độ chương ${c.code}`} />
                      <div className="mt-0.5 text-[12px] text-ink-3">
                        {c.completed}/{c.total} mục
                      </div>
                    </div>
                    <div className="text-[13px] text-ink-3 sm:text-right">{c.answered ? `Đúng ${percent(c.correct, c.answered)}% (${c.answered} câu)` : 'Chưa luyện tập'}</div>
                  </div>
                ))}
              </Panel>
            </section>
          )}

          {isStudent && (
            <section aria-labelledby="lich-su">
              <h2 id="lich-su" className="mb-3 text-xl font-extrabold">
                Lịch sử luyện tập
              </h2>
              {history.length ? (
                <Panel className="overflow-x-auto">
                  <table className="data-table min-w-[560px]">
                    <thead>
                      <tr>
                        <th>Thời gian</th>
                        <th>Câu hỏi</th>
                        <th>Hình thức</th>
                        <th>Kết quả</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((h) => (
                        <tr key={h.id}>
                          <td className="whitespace-nowrap text-[13px] text-ink-3">{formatDateTime(h.createdAt)}</td>
                          <td>
                            <div className="text-[14px]">{plainExcerpt(h.stem, 80)}</div>
                            {h.lessonTitle && <div className="text-[12px] text-ink-3">{lessonLabel({ kind: h.lessonKind ?? 'lesson', number: h.lessonNumber, title: h.lessonTitle })}{h.context === 'test' ? ' · bài kiểm tra' : h.context === 'challenge' ? ' · thử thách' : ''}</div>}
                          </td>
                          <td className="text-[13px]">{TYPE_SHORT[h.type as keyof typeof TYPE_SHORT]}</td>
                          <td>
                            {h.status === 'correct' && <Badge tone="tre">Đúng</Badge>}
                            {h.status === 'partial' && <Badge tone="hl">Một phần</Badge>}
                            {h.status === 'incorrect' && <Badge tone="le">Sai</Badge>}
                            {h.status === 'pending' && <Badge tone="cam">Chờ chấm</Badge>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Panel>
              ) : (
                <EmptyState title="Chưa có lượt luyện tập nào" action={<LinkButton href="/luyen-tap">Bắt đầu luyện tập</LinkButton>} />
              )}
            </section>
          )}
        </div>

        <aside className="space-y-6">
          {isStudent && (
            <Panel className="p-5">
              <h2 className="text-lg font-extrabold">Huy hiệu ({badges.length})</h2>
              {badges.length ? (
                <ul className="mt-3 grid grid-cols-4 gap-2">
                  {badges.map((b) => (
                    <li key={b.code} title={`${b.name}: ${b.description}`} className="flex justify-center">
                      <BadgeMark icon={b.icon} tier={b.tier} earned size={52} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-[14px] text-ink-2">Học xong một mục hoặc làm đúng câu hỏi để nhận huy hiệu đầu tiên.</p>
              )}
              <a href="/thanh-tich" className={buttonClass('quiet', 'sm', 'mt-4 w-full')}>
                Xem tất cả huy hiệu
              </a>
            </Panel>
          )}

          {isStudent && (
            <Panel className="p-5">
              <h2 className="text-lg font-extrabold">Lớp học</h2>
              {classes.length ? (
                <ul className="mt-2 space-y-1.5 text-[15px]">
                  {classes.map((c) => (
                    <li key={c.id}>
                      <strong>{c.name}</strong> <span className="text-ink-3">({c.schoolYear}) – {c.teacherName}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-[14px] text-ink-2">Em chưa ở lớp nào.</p>
              )}
              <PostForm action="/ca-nhan/vao-lop" className="mt-4 flex items-end gap-2">
                <Field label="Mã lớp" name="code" placeholder="VD: K7P2QX" maxLength={10} className="flex-1" error={errors?.join} />
                <Button size="md" className="mb-[1px]">
                  Vào lớp
                </Button>
              </PostForm>
            </Panel>
          )}

          <Panel className="p-5">
            <h2 className="text-lg font-extrabold">Tài khoản</h2>
            <div className="mt-2">
              <StatLine label="Tên đăng nhập" value={<span className="text-[15px]">@{profile.username}</span>} />
              <StatLine label="Ngày tạo" value={<span className="text-[15px]">{formatDate(profile.createdAt)}</span>} />
              {profile.lastLoginAt && <StatLine label="Đăng nhập gần nhất" value={<span className="text-[15px]">{formatDateTime(profile.lastLoginAt)}</span>} />}
            </div>
            <PostForm action="/ca-nhan/mat-khau" className="mt-4 space-y-3">
              <h3 className="font-bold">Đổi mật khẩu</h3>
              <Field label="Mật khẩu hiện tại" name="current" type="password" required autoComplete="current-password" maxLength={128} />
              <Field label="Mật khẩu mới" name="password" type="password" required autoComplete="new-password" hint="Ít nhất 8 kí tự, có cả chữ và số." maxLength={128} error={errors?.password} />
              <Field label="Nhập lại mật khẩu mới" name="password2" type="password" required autoComplete="new-password" maxLength={128} />
              <Button variant="secondary">Đổi mật khẩu</Button>
            </PostForm>
          </Panel>
        </aside>
      </div>
    </>,
  );
}

export async function joinClassAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  if (user.role !== 'student') return redirect('/ca-nhan', { type: 'error', message: 'Chỉ tài khoản học sinh vào lớp bằng mã.' }, ctx);
  const form = await ctx.form();
  const code = form.str('code', 10);
  if (!code) return profilePage(ctx, { join: 'Nhập mã lớp.' }, 422);
  try {
    const c = await joinClassByCode(ctx.db, user.id, code);
    return redirect('/ca-nhan', { type: 'success', message: `Em đã vào lớp ${c.name}.` }, ctx);
  } catch (err) {
    if (err instanceof UserInputError) return profilePage(ctx, { join: err.message }, 422);
    throw err;
  }
}

export async function changePasswordAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const form = await ctx.form();
  const current = form.str('current', 200);
  const next = form.str('password', 200);
  if (next !== form.str('password2', 200)) return profilePage(ctx, { password: 'Hai lần nhập mật khẩu mới không khớp.' }, 422);
  const row = await ctx.db.one<{ passwordHash: string }>(sql`select password_hash from users where id = ${user.id}`);
  if (!row || !(await verifyPassword(current, row.passwordHash))) return profilePage(ctx, { password: 'Mật khẩu hiện tại không đúng.' }, 422);
  try {
    await setPassword(ctx.db, user.id, next);
  } catch (err) {
    if (err instanceof UserInputError) return profilePage(ctx, { password: err.message }, 422);
    throw err;
  }
  // Đăng xuất các thiết bị khác
  await destroyUserSessions(ctx.db, user.id, ctx.sessionTokenHash);
  return redirect('/ca-nhan', { type: 'success', message: 'Đã đổi mật khẩu. Các thiết bị khác đã bị đăng xuất.' }, ctx);
}
