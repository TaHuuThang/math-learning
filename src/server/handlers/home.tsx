import { LuArrowRight, LuCrown, LuFlame, LuRocket, LuTrophy } from 'react-icons/lu';
import type { Ctx, Res } from '../http/context';
import { page } from '../http/render';
import { getCourseTree, getDefaultTextbookForGrade, listGrades, chapterLabel, lessonLabel } from '../../domain/curriculum';
import { continueLesson, platformStats, userStats } from '../../domain/progress';
import { latestQuestions } from '../../domain/questions';
import { leaderboard, listAchievements } from '../../domain/gamification';
import { AreaModel, BadgeMark, StatLine } from '../../ui/components/learning';
import { Badge, LinkButton, Panel, ProgressBar, buttonClass, cx } from '../../ui/components/ui';
import { LEVEL_LABELS, TYPE_SHORT, percent } from '../../shared/labels';
import { plainExcerpt } from '../../shared/richtext';
import { sql } from '../db';

export async function homePage(ctx: Ctx): Promise<Res> {
  const db = ctx.db;
  const user = ctx.user;
  const grades = await listGrades(db);
  const book = await getDefaultTextbookForGrade(db, user?.gradeLevel ?? 8);
  const tree = book ? await getCourseTree(db, book.id, user?.id ?? null) : [];
  const chapters = tree.flatMap((s) => s.chapters.map((c) => ({ ...c, semester: s.number })));
  const isStudent = user?.role === 'student';
  const cont = isStudent ? await continueLesson(db, user.id) : null;
  const stats = isStudent && book ? await userStats(db, user.id, book.id) : null;
  const platform = await platformStats(db);
  const latest = book ? await latestQuestions(db, book.id, 6) : [];
  const leaders = await leaderboard(db, { range: 'all', limit: 5 });
  const achievements = await listAchievements(db, isStudent ? user.id : null);
  const challengeCount = book
    ? ((await db.one<{ n: number }>(sql`
        select count(*)::int as n from questions qq join exercise_types et on et.id = qq.exercise_type_id
        where qq.textbook_id = ${book.id} and qq.status = 'published' and qq.level >= 3 and et.code in ('mcq', 'true_false', 'short_answer')`))?.n ?? 0)
    : 0;
  const firstLesson = tree[0]?.chapters[0]?.lessons[0];
  const startHref = cont ? `/hoc/${cont.textbookSlug}/bai/${cont.slug}` : user ? (firstLesson ? `/hoc/toan-8/bai/${firstLesson.slug}` : '/hoc/toan-8') : '/dang-ky';

  return page(
    ctx,
    { title: 'MATH LEARNING', description: 'Học Toán 8 theo bộ sách Kết nối tri thức với cuộc sống: bài học, luyện tập, kiểm tra và theo dõi tiến độ.' },
    <>
      {/* ===== HERO: trang vở ô li ===== */}
      <section className="o-li le-vo overflow-hidden rounded-[28px] border border-line">
        <div className="grid items-center gap-10 px-6 py-10 sm:pl-24 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:py-16 md:pr-12 lg:pl-28">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-tim-700 shadow-[0_0_0_1px_var(--color-tim-200)]">
              Toán 8 · Kết nối tri thức với cuộc sống
            </p>
            <h1 className="text-[36px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[52px]">
              Học Toán 8 từng bài một, hiểu chắc từ gốc.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-2">
              Lý thuyết ngắn gọn, công thức trình bày rõ ràng, luyện tập ngay sau mỗi bài và theo dõi tiến độ của em – bám sát chương trình GDPT 2018.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={startHref} size="lg">
                {cont ? 'Học tiếp' : 'Bắt đầu học'} <LuArrowRight aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/chuong-trinh" variant="secondary" size="lg">
                Khám phá chương trình
              </LinkButton>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-[15px]">
              <div>
                <dt className="text-ink-3">Bài học</dt>
                <dd className="text-2xl font-extrabold text-ink">{platform.lessons}</dd>
              </div>
              <div>
                <dt className="text-ink-3">Câu hỏi luyện tập</dt>
                <dd className="text-2xl font-extrabold text-ink">{platform.questions}</dd>
              </div>
              <div>
                <dt className="text-ink-3">Hình thức bài tập</dt>
                <dd className="text-2xl font-extrabold text-ink">5</dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-center rounded-3xl bg-white/85 p-5 shadow-[0_0_0_1px_var(--color-line)] md:p-8">
            <AreaModel />
          </div>
        </div>
      </section>

      {/* ===== CHỌN KHỐI LỚP ===== */}
      <section className="mt-14" aria-labelledby="khoi-lop">
        <h2 id="khoi-lop" className="text-2xl font-extrabold tracking-tight">
          Chọn khối lớp
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {grades.map((g) => {
            const active = g.status === 'active' && g.textbookSlug;
            const body = (
              <>
                <span className={cx('text-[15px] font-semibold', active ? 'text-tim-100' : 'text-ink-3')}>Toán</span>
                <span className={cx('block text-[64px] font-extrabold leading-none tracking-tight', active ? 'text-white' : 'text-line-2')}>{g.level}</span>
                <span className="mt-4 block">
                  {active ? (
                    <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-white">
                      {g.lessonCount} bài học <LuArrowRight aria-hidden="true" />
                    </span>
                  ) : (
                    <Badge tone="gray">Sắp ra mắt</Badge>
                  )}
                </span>
              </>
            );
            return active ? (
              <a key={g.id} href={`/hoc/${g.textbookSlug}`} className="group rounded-[22px] bg-tim-700 p-5 shadow-[0_4px_0_0_#1e154b] transition-transform hover:-translate-y-0.5">
                {body}
              </a>
            ) : (
              <div key={g.id} aria-disabled="true" className="o-li rounded-[22px] border border-line p-5">
                {body}
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-8">
          {/* ===== TIẾP TỤC HỌC ===== */}
          <section aria-labelledby="tiep-tuc">
            <h2 id="tiep-tuc" className="text-2xl font-extrabold tracking-tight">
              Tiếp tục học
            </h2>
            <Panel className="mt-4 p-6">
              {cont ? (
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div className="min-w-0">
                    <div className="text-[14px] text-ink-3">
                      Chương {cont.chapterCode}. {cont.chapterTitle}
                    </div>
                    <div className="mt-1 text-xl font-bold">{lessonLabel(cont)}</div>
                    <div className="mt-2">
                      {cont.status === 'completed' ? <Badge tone="tre">Đã học xong</Badge> : <Badge tone="hl">Đang học</Badge>}
                    </div>
                  </div>
                  <LinkButton href={`/hoc/${cont.textbookSlug}/bai/${cont.slug}`}>Mở bài học</LinkButton>
                </div>
              ) : user && isStudent ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[15px] text-ink-2">Em chưa mở bài học nào. Bắt đầu với bài đầu tiên của Toán 8.</p>
                  {firstLesson && <LinkButton href={`/hoc/toan-8/bai/${firstLesson.slug}`}>Học {lessonLabel(firstLesson)}</LinkButton>}
                </div>
              ) : user ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[15px] text-ink-2">Tài khoản giáo viên không ghi tiến độ học. Mở trang giáo viên để quản lý lớp và nội dung.</p>
                  <LinkButton href="/giao-vien">Trang giáo viên</LinkButton>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-lg text-[15px] text-ink-2">Đăng nhập để lưu bài đã học, câu đã làm và quay lại đúng chỗ đang học dở.</p>
                  <div className="flex gap-2">
                    <LinkButton href="/dang-nhap" variant="secondary">
                      Đăng nhập
                    </LinkButton>
                    <LinkButton href="/dang-ky">Tạo tài khoản</LinkButton>
                  </div>
                </div>
              )}
            </Panel>
          </section>

          {/* ===== CHỦ ĐỀ NỔI BẬT: mục lục chương ===== */}
          <section aria-labelledby="chu-de">
            <div className="flex items-end justify-between gap-4">
              <h2 id="chu-de" className="text-2xl font-extrabold tracking-tight">
                Chủ đề nổi bật
              </h2>
              <a href="/hoc/toan-8" className="text-[15px] font-semibold text-tim-700 hover:underline">
                Xem mục lục đầy đủ
              </a>
            </div>
            <Panel className="mt-4 divide-y divide-line">
              {chapters
                .filter((c) => c.kind === 'chapter')
                .map((c) => {
                  const done = c.lessons.filter((l) => l.progress === 'completed').length;
                  const first = c.lessons[0];
                  return (
                    <a key={c.id} href={first ? `/hoc/toan-8/bai/${first.slug}` : '/hoc/toan-8'} className="group flex items-center gap-4 px-5 py-4 hover:bg-tim-50/60">
                      <span className="w-12 shrink-0 text-right text-[22px] font-extrabold text-tim-300 group-hover:text-tim-700">{c.code}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-3">
                          <span className="truncate text-[16px] font-semibold">{c.title}</span>
                          <span className="toc-leader hidden sm:block" aria-hidden="true" />
                          <span className="shrink-0 text-[14px] text-ink-3">
                            {isStudent ? `${done}/${c.lessons.length} bài` : `${c.lessons.length} bài · HK ${c.semester === 1 ? 'I' : 'II'}`}
                          </span>
                        </span>
                        {isStudent && (
                          <span className="mt-2 block max-w-xs">
                            <ProgressBar value={percent(done, c.lessons.length)} tone="tre" label={`Tiến độ ${chapterLabel(c)}`} />
                          </span>
                        )}
                      </span>
                    </a>
                  );
                })}
            </Panel>
          </section>

          {/* ===== BÀI TẬP MỚI ===== */}
          <section aria-labelledby="bai-tap-moi">
            <div className="flex items-end justify-between gap-4">
              <h2 id="bai-tap-moi" className="text-2xl font-extrabold tracking-tight">
                Bài tập mới
              </h2>
              <a href="/luyen-tap" className="text-[15px] font-semibold text-tim-700 hover:underline">
                Tất cả bài luyện tập
              </a>
            </div>
            {latest.length ? (
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {latest.map((q) => (
                  <li key={q.id}>
                    <a href={`/luyen-tap/bai/${q.lessonSlug}`} className="block h-full rounded-2xl border border-line bg-white p-4 hover:border-tim-300">
                      <span className="flex flex-wrap gap-1.5">
                        <Badge>{TYPE_SHORT[q.type]}</Badge>
                        <Badge tone="gray">{LEVEL_LABELS[q.level]}</Badge>
                      </span>
                      <span className="mt-2 line-clamp-2 block text-[15px] text-ink">{plainExcerpt(q.stem, 110)}</span>
                      <span className="mt-2 block text-[13px] text-ink-3">{lessonLabel({ kind: q.lessonKind, number: q.lessonNumber, title: q.lessonTitle })}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink-2">Chưa có câu hỏi nào được xuất bản.</p>
            )}
          </section>
        </div>

        <aside className="space-y-8">
          {/* ===== THỐNG KÊ TIẾN ĐỘ ===== */}
          <section aria-labelledby="thong-ke">
            <h2 id="thong-ke" className="text-xl font-extrabold tracking-tight">
              Thống kê tiến độ
            </h2>
            <Panel className="mt-4 p-5">
              {stats ? (
                <>
                  <div className="mb-2 flex items-center justify-between text-[14px]">
                    <span className="font-semibold">Cấp {stats.level}</span>
                    <span className="text-ink-3">
                      {stats.levelCurrent}/{stats.levelNext} XP
                    </span>
                  </div>
                  <ProgressBar value={percent(stats.levelCurrent, stats.levelNext)} label="Tiến tới cấp tiếp theo" />
                  <div className="mt-3">
                    <StatLine label="Bài đã học xong" value={`${stats.lessonsCompleted}/${stats.lessonsTotal}`} />
                    <StatLine label="Câu đã làm" value={stats.answered} />
                    <StatLine label="Tỉ lệ chính xác" value={`${stats.accuracy}%`} />
                    <StatLine label="Chuỗi ngày luyện tập" value={`${stats.streak} ngày`} />
                  </div>
                  <a href="/ca-nhan" className={buttonClass('quiet', 'sm', 'mt-3 w-full')}>
                    Xem trang cá nhân
                  </a>
                </>
              ) : (
                <>
                  <StatLine label="Bài học đang mở" value={platform.lessons} />
                  <StatLine label="Bài có nội dung lý thuyết" value={platform.lessonsWithContent} />
                  <StatLine label="Câu hỏi đã xuất bản" value={platform.questions} />
                  <StatLine label="Học sinh đang học" value={platform.students} />
                  {!user && <p className="mt-3 text-[13px] text-ink-3">Đăng nhập bằng tài khoản học sinh để xem tiến độ của riêng em.</p>}
                </>
              )}
            </Panel>
          </section>

          {/* ===== THỬ THÁCH TOÁN HỌC ===== */}
          <section aria-labelledby="thu-thach" className="rounded-[22px] bg-tim-800 p-6 text-white">
            <LuRocket className="text-3xl text-hl" aria-hidden="true" />
            <h2 id="thu-thach" className="mt-3 text-xl font-extrabold">
              Thử thách Toán học
            </h2>
            <p className="mt-2 text-[15px] text-tim-100">
              5 câu vận dụng và vận dụng cao chọn ngẫu nhiên từ Toán 8. Mỗi câu đúng được 20 XP.
            </p>
            {challengeCount > 0 ? (
              <a href="/thu-thach" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-hl px-4 py-2.5 font-semibold text-ink hover:bg-white">
                Nhận thử thách <LuArrowRight aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-4 text-[14px] text-tim-200">Chưa có câu hỏi vận dụng nào được xuất bản.</p>
            )}
          </section>

          {/* ===== BẢNG XẾP HẠNG ===== */}
          <section aria-labelledby="xep-hang">
            <div className="flex items-end justify-between">
              <h2 id="xep-hang" className="text-xl font-extrabold tracking-tight">
                Bảng xếp hạng
              </h2>
              <a href="/thanh-tich#xep-hang" className="text-[14px] font-semibold text-tim-700 hover:underline">
                Xem thêm
              </a>
            </div>
            <Panel className="mt-4 p-2">
              {leaders.length ? (
                <ol>
                  {leaders.map((r) => (
                    <li key={r.userId} className={cx('flex items-center gap-3 rounded-xl px-3 py-2.5', r.userId === user?.id && 'bg-hl-soft')}>
                      <span className={cx('flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold', r.rank === 1 ? 'bg-hl text-ink' : 'bg-mist text-ink-2')}>
                        {r.rank === 1 ? <LuCrown aria-label="Hạng 1" /> : r.rank}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-medium">{r.fullName}</span>
                      <span className="text-[14px] font-bold tabular-nums text-tim-700">{r.xp} XP</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="px-3 py-4 text-[15px] text-ink-2">
                  <LuTrophy className="mr-1 inline text-tim-500" aria-hidden="true" />
                  Bảng xếp hạng sẽ xuất hiện khi học sinh bắt đầu học và luyện tập.
                </p>
              )}
            </Panel>
          </section>
        </aside>
      </div>

      {/* ===== THÀNH TÍCH HỌC TẬP ===== */}
      <section className="mt-14" aria-labelledby="thanh-tich">
        <div className="flex items-end justify-between gap-4">
          <h2 id="thanh-tich" className="text-2xl font-extrabold tracking-tight">
            Thành tích học tập
          </h2>
          <a href="/thanh-tich" className="text-[15px] font-semibold text-tim-700 hover:underline">
            Tất cả huy hiệu
          </a>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {achievements.map((a) => (
            <li key={a.code} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3">
              <BadgeMark icon={a.icon} tier={a.tier} earned={!!a.earnedAt} size={48} />
              <span className="min-w-0">
                <span className="block text-[14px] font-bold leading-tight">{a.name}</span>
                <span className="mt-0.5 block text-[12px] leading-snug text-ink-3">{a.description}</span>
              </span>
            </li>
          ))}
        </ul>
        {isStudent && stats && stats.streak > 0 && (
          <p className="mt-4 flex items-center gap-2 text-[15px] text-ink-2">
            <LuFlame className="text-cam" aria-hidden="true" /> Em đang có chuỗi {stats.streak} ngày luyện tập liên tiếp.
          </p>
        )}
      </section>
    </>,
  );
}
