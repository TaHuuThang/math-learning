/**
 * Xuất bản HTML ngoại tuyến: một thư mục các trang .html mở thẳng bằng trình duyệt (file://)
 * hoặc đưa lên bất kì nơi lưu trữ web tĩnh nào. Nội dung lấy từ CSDL tại thời điểm xuất.
 *   node dist/server.mjs export-html --out ./math-learning-html
 */
import fs from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { LuArrowLeft, LuArrowRight, LuBookOpen, LuClipboardCheck, LuClock, LuMap, LuMenu, LuPencilRuler, LuPresentation, LuRocket } from 'react-icons/lu';
import { sql, type Database } from '../server/db';
import {
  chapterLabel,
  flattenLessons,
  getCourseTree,
  getLessonQuestionCounts,
  getLessonById,
  getLessonSections,
  getTeachingPlan,
  getTextbook,
  lessonLabel,
  listGrades,
  type ChapterNode,
  type LessonNode,
} from '../domain/curriculum';
import { getQuestions, imageHtml, latestQuestions, toView, type QuestionFull } from '../domain/questions';
import { listAchievements } from '../domain/gamification';
import { LessonBody } from '../ui/components/lesson';
import { CHAPTER_TEST_PLAN, ChapterOverview, DifficultyBadge, LessonMetaPanel, LevelBadges, QuestionCoverage, ThemeList, TopicArticle } from '../ui/components/knowledge';
import { LEVEL_LABELS as KLEVEL, countTopics, getChapterMetas, getThemesByLesson, getTopicById, getTopicQuestionCounts, summarizeChapter, topicKey, type Level, type TopicNode } from '../domain/knowledge';
import { ChapterStats, KnowledgeTree, MapTotalsBar, mapTotals } from '../server/handlers/knowledge';
import { AreaModel, BadgeMark } from '../ui/components/learning';
import { LogoMark, Wordmark } from '../ui/components/Logo';
import { Badge, Breadcrumbs, Notice, PageTitle, Panel, buttonClass, cx } from '../ui/components/ui';
import { LESSON_KIND_LABELS, LEVEL_LABELS, TYPE_LABELS, TYPE_SHORT, formatDate } from '../shared/labels';
import { QUESTION_TYPES, type QuestionType } from '../shared/grading';
import { escapeHtml, plainExcerpt, renderRich, renderRichInline } from '../shared/richtext';
import type { OfflineData, OfflinePractice, OfflineQuestion } from './types';
import { AUTHOR, BRAND, COPYRIGHT, COPYRIGHT_NOTE } from '../shared/brand';

interface Page {
  file: string;
  title: string;
  description?: string;
  body: ReactNode;
  nav?: 'home' | 'program' | 'practice' | 'progress';
  lesson?: string;
}

const depthOf = (file: string) => file.split('/').length - 1;

function rel(from: string, to: string) {
  return '../'.repeat(depthOf(from)) + to;
}

const NAV: { key: Page['nav']; file: string; label: string }[] = [
  { key: 'home', file: 'index.html', label: 'Trang chủ' },
  { key: 'program', file: 'chuong-trinh.html', label: 'Chương trình học' },
  { key: 'practice', file: 'luyen-tap.html', label: 'Luyện tập' },
  { key: 'progress', file: 'tien-do.html', label: 'Tiến độ & thành tích' },
];

function Layout({ page, children }: { page: Page; children: ReactNode }) {
  const R = (to: string) => rel(page.file, to);
  return (
    <>
      <header className="site-header sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 md:px-6">
          <a href={R('index.html')} className="flex items-center gap-2.5 text-ink no-underline" aria-label={`${BRAND} – Trang chủ`}>
            <LogoMark size={48} />
            <Wordmark size="md" />
          </a>
          <nav aria-label="Điều hướng chính" className="ml-6 hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.file}
                href={R(n.file)}
                aria-current={page.nav === n.key ? 'page' : undefined}
                className={cx('rounded-lg px-3 py-2 text-[15px] font-medium hover:bg-tim-50 hover:text-tim-800', page.nav === n.key ? 'text-ink' : 'text-ink-2')}
              >
                <span className={page.nav === n.key ? 'hl font-semibold' : ''}>{n.label}</span>
              </a>
            ))}
          </nav>
          <details className="relative ml-auto lg:hidden" data-menu>
            <summary className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-xl" aria-label="Mở menu">
              <LuMenu aria-hidden="true" />
            </summary>
            <nav aria-label="Điều hướng chính (di động)" className="absolute right-0 z-30 mt-2 w-60 rounded-2xl border border-line bg-white p-2 shadow-[0_12px_32px_-12px_rgba(30,21,75,0.35)]">
              {NAV.map((n) => (
                <a key={n.file} href={R(n.file)} className={cx('block rounded-lg px-3 py-2.5 text-[15px] hover:bg-tim-50', page.nav === n.key && 'bg-tim-50 font-semibold text-tim-800')}>
                  {n.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <main id="noi-dung" className="mx-auto max-w-[1240px] px-4 pt-6 md:px-6">
        {children}
      </main>
      <footer className="site-footer mt-20 border-t border-line bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-10 md:grid-cols-[1.4fr_1fr] md:px-6">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark size={96} variant="full" />
              <Wordmark size="lg" />
            </div>
            <p className="mt-3 max-w-md text-sm text-ink-2">
              Bản HTML ngoại tuyến – Toán 8, Kết nối tri thức với cuộc sống (GDPT 2018). Tiến độ và câu đã làm được lưu trong trình duyệt của máy đang dùng.
            </p>
          </div>
          <p className="text-sm text-ink-3">
            Lớp học, tài khoản, đề kiểm tra, giáo viên chấm bài và bảng xếp hạng cần bản chạy trên máy chủ. Xuất bản ngày {formatDate(new Date())}.
          </p>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-x-6 gap-y-1 px-4 py-4 text-[13px] text-ink-3 md:px-6">
            <span className="font-semibold text-ink-2">{COPYRIGHT}</span>
            <span>{COPYRIGHT_NOTE}</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function document_(page: Page) {
  const R = (to: string) => rel(page.file, to);
  const markup = renderToString(<Layout page={page}>{page.body}</Layout>);
  const title = page.title === BRAND ? page.title : `${page.title} – ${BRAND}`;
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(page.description ?? 'Học Toán 8 theo bộ sách Kết nối tri thức với cuộc sống.')}">
<meta name="author" content="${escapeHtml(AUTHOR)}">
<meta name="copyright" content="${escapeHtml(COPYRIGHT)}">
<meta name="theme-color" content="#3B2A8C">
<link rel="icon" href="${R('assets/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="${R('assets/katex/katex.min.css')}">
<link rel="stylesheet" href="${R('assets/app.css')}">
</head>
<body class="bg-paper" data-root="${'../'.repeat(depthOf(page.file))}"${page.lesson ? ` data-lesson="${escapeHtml(page.lesson)}"` : ''}>${markup}
<script src="${R('assets/du-lieu.js')}"></script>
<script src="${R('assets/ml-offline.js')}" defer></script>
</body>
</html>
`;
}

function json(id: string, value: unknown) {
  return <script type="application/json" id={id} dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, '\\u003c') }} />;
}

function NoScript() {
  return (
    <noscript>
      <Notice tone="warn">Phần này cần bật JavaScript trong trình duyệt.</Notice>
    </noscript>
  );
}

const Status = ({ slug }: { slug: string }) => <span className="ml-status" data-ls={slug} aria-label="Chưa học" />;

export async function exportHtml(db: Database, outDir: string, assetsDir: string, log: (m: string) => void = console.log) {
  const book = await getTextbook(db, 'toan-8');
  if (!book) throw new Error('Chưa có chương trình Toán 8 trong CSDL. Chạy "node dist/server.mjs seed" trước.');
  const tree = await getCourseTree(db, book.id, null);
  const flat = flattenLessons(tree);
  const grades = await listGrades(db);
  const plan = await getTeachingPlan(db, book.id);
  const achievements = (await listAchievements(db, null)).filter((a) => !['first_test', 'perfect_test'].includes(a.code));
  const questionRows = await db.many<{ id: number; lessonId: number; level: number; type: QuestionType }>(sql`
    select qq.id, qq.lesson_id, qq.level, et.code as type from questions qq join exercise_types et on et.id = qq.exercise_type_id
    join lessons l on l.id = qq.lesson_id
    where qq.textbook_id = ${book.id} and qq.status = 'published' and l.status = 'published' order by qq.id`);
  const full = await getQuestions(db, questionRows.map((q) => q.id));
  const uploads = new Map(
    (await db.many<{ id: number; mime: string; data: Buffer }>(sql`
      select i.id, i.mime, i.data from images i join question_images qi on qi.image_id = i.id
      where i.kind = 'upload' and qi.question_id = any(${full.map((q) => q.id)}::int[])`)).map((r) => [r.id, `data:${r.mime};base64,${r.data.toString('base64')}`]),
  );
  const lessonSlugById = new Map(flat.map((l) => [l.id, l.slug]));
  const themes = await getThemesByLesson(db, book.id);
  const chapterFile = (c: { code: string }) => `chuong-${c.code.toLowerCase()}.html`;

  const offline = (q: QuestionFull): OfflineQuestion => {
    const view = toView(q);
    view.mediaHtml = q.images.map((img) =>
      img.kind === 'upload' ? `<img src="${uploads.get(img.id) ?? ''}" alt="${escapeHtml(img.alt || 'Hình minh họa')}" class="max-w-full h-auto rounded-lg">` : imageHtml(img),
    );
    return {
      ...view,
      key: {
        answers: q.answers.map((a) => ({ label: a.label, content: a.content, isCorrect: a.isCorrect })),
        settings: q.settings,
        solutionHtml: q.solution ? renderRich(q.solution) : undefined,
        acceptedHtml: q.type === 'short_answer' ? q.answers.map((a) => renderRichInline(a.content)) : undefined,
      },
    };
  };
  const byLesson = new Map<number, QuestionFull[]>();
  for (const q of full) {
    if (!q.lessonId) continue;
    if (!byLesson.has(q.lessonId)) byLesson.set(q.lessonId, []);
    byLesson.get(q.lessonId)!.push(q);
  }

  const byTopic = new Map<number, QuestionFull[]>();
  for (const q of full) {
    if (!q.topicId) continue;
    if (!byTopic.has(q.topicId)) byTopic.set(q.topicId, []);
    byTopic.get(q.topicId)!.push(q);
  }
  const chapterMetas = new Map((await getChapterMetas(db, book.id)).map((c) => [c.id, c]));
  const topicFile = (lessonSlug: string, t: { id: number; slug: string | null }) => `dang/${lessonSlug}/${topicKey(t)}.html`;

  const pages: Page[] = [];
  const chapterSlugs = (c: ChapterNode) => c.lessons.map((l) => l.slug).join(',');
  const firstLesson = flat[0];

  // ---------------- Trang chủ ----------------
  const latest = await latestQuestions(db, book.id, 6);
  const challengeCount = full.filter((q) => q.level >= 3 && ['mcq', 'true_false', 'short_answer'].includes(q.type)).length;
  pages.push({
    file: 'index.html',
    title: BRAND,
    nav: 'home',
    body: (
      <>
        <section className="o-li le-vo overflow-hidden rounded-[28px] border border-line">
          <div className="grid items-center gap-10 px-6 py-10 sm:pl-24 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:py-16 md:pr-12 lg:pl-28">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-tim-700 shadow-[0_0_0_1px_var(--color-tim-200)]">
                {book.title} · {book.series}
              </p>
              <h1 className="text-[36px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[52px]">Học Toán 8 từng bài một, hiểu chắc từ gốc.</h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-2">
                Lý thuyết ngắn gọn, công thức trình bày rõ ràng, luyện tập ngay sau mỗi bài và theo dõi tiến độ của em – bám sát chương trình GDPT 2018.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {firstLesson && (
                  <a href={`bai/${firstLesson.slug}.html`} className={buttonClass('primary', 'lg')}>
                    Bắt đầu học <LuArrowRight aria-hidden="true" />
                  </a>
                )}
                <a href="chuong-trinh.html" className={buttonClass('secondary', 'lg')}>
                  Khám phá chương trình
                </a>
              </div>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-[15px]">
                <div>
                  <dt className="text-ink-3">Bài học</dt>
                  <dd className="text-2xl font-extrabold text-ink">{flat.length}</dd>
                </div>
                <div>
                  <dt className="text-ink-3">Câu hỏi luyện tập</dt>
                  <dd className="text-2xl font-extrabold text-ink">{full.length}</dd>
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

        <section className="mt-14" aria-labelledby="khoi-lop">
          <h2 id="khoi-lop" className="text-2xl font-extrabold tracking-tight">
            Chọn khối lớp
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {grades.map((g) => {
              const active = g.level === book.gradeLevel;
              const body = (
                <>
                  <span className={cx('text-[15px] font-semibold', active ? 'text-tim-100' : 'text-ink-3')}>Toán</span>
                  <span className={cx('block text-[64px] font-extrabold leading-none tracking-tight', active ? 'text-white' : 'text-line-2')}>{g.level}</span>
                  <span className="mt-4 block">
                    {active ? (
                      <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-white">
                        {flat.length} bài học <LuArrowRight aria-hidden="true" />
                      </span>
                    ) : (
                      <Badge tone="gray">Sắp ra mắt</Badge>
                    )}
                  </span>
                </>
              );
              return active ? (
                <a key={g.id} href="muc-luc.html" className="rounded-[22px] bg-tim-700 p-5 shadow-[0_4px_0_0_#1e154b] transition-transform hover:-translate-y-0.5">
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
            <section aria-labelledby="tiep-tuc">
              <h2 id="tiep-tuc" className="text-2xl font-extrabold tracking-tight">
                Tiếp tục học
              </h2>
              <Panel className="mt-4 p-6">
                <div data-panel="continue">
                  <NoScript />
                </div>
              </Panel>
            </section>
            <section aria-labelledby="chu-de">
              <div className="flex items-end justify-between gap-4">
                <h2 id="chu-de" className="text-2xl font-extrabold tracking-tight">
                  Chủ đề nổi bật
                </h2>
                <a href="muc-luc.html" className="text-[15px] font-semibold text-tim-700 hover:underline">
                  Xem mục lục đầy đủ
                </a>
              </div>
              <Panel className="mt-4 divide-y divide-line">
                {tree
                  .flatMap((s) => s.chapters.map((c) => ({ ...c, semester: s.number })))
                  .filter((c) => c.kind === 'chapter')
                  .map((c) => (
                    <a key={c.id} href={c.lessons[0] ? `bai/${c.lessons[0].slug}.html` : 'muc-luc.html'} className="group flex items-center gap-4 px-5 py-4 hover:bg-tim-50/60">
                      <span className="w-12 shrink-0 text-right text-[22px] font-extrabold text-tim-300 group-hover:text-tim-700">{c.code}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-3">
                          <span className="truncate text-[16px] font-semibold">{c.title}</span>
                          <span className="toc-leader hidden sm:block" aria-hidden="true" />
                          <span className="shrink-0 text-[14px] text-ink-3">
                            {c.lessons.length} bài · HK {c.semester === 1 ? 'I' : 'II'}
                          </span>
                        </span>
                        <span className="mt-2 block max-w-xs" data-cp={chapterSlugs(c)} hidden>
                          <span className="bar bar-tre block">
                            <span style={{ width: '0%' }} />
                          </span>
                          <span className="mt-0.5 block text-[12px] text-ink-3" data-cp-text />
                        </span>
                      </span>
                    </a>
                  ))}
              </Panel>
            </section>
            <section aria-labelledby="bai-tap-moi">
              <div className="flex items-end justify-between gap-4">
                <h2 id="bai-tap-moi" className="text-2xl font-extrabold tracking-tight">
                  Bài tập mới
                </h2>
                <a href="luyen-tap.html" className="text-[15px] font-semibold text-tim-700 hover:underline">
                  Tất cả bài luyện tập
                </a>
              </div>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {latest.map((q) => (
                  <li key={q.id}>
                    <a href={`luyen-tap/${q.lessonSlug}.html`} className="block h-full rounded-2xl border border-line bg-white p-4 hover:border-tim-300">
                      <span className="flex flex-wrap gap-1.5">
                        <Badge>{TYPE_SHORT[q.type]}</Badge>
                        <Badge tone="gray">{LEVEL_LABELS[q.level]}</Badge>
                      </span>
                      <span className="mt-2 block text-[15px] text-ink">{plainExcerpt(q.stem, 110)}</span>
                      <span className="mt-2 block text-[13px] text-ink-3">{lessonLabel({ kind: q.lessonKind, number: q.lessonNumber, title: q.lessonTitle })}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <aside className="space-y-8">
            <section aria-labelledby="thong-ke">
              <h2 id="thong-ke" className="text-xl font-extrabold tracking-tight">
                Thống kê tiến độ
              </h2>
              <Panel className="mt-4 p-5">
                <div data-panel="stats">
                  <NoScript />
                </div>
              </Panel>
            </section>
            <section aria-labelledby="thu-thach" className="rounded-[22px] bg-tim-800 p-6 text-white">
              <LuRocket className="text-3xl text-hl" aria-hidden="true" />
              <h2 id="thu-thach" className="mt-3 text-xl font-extrabold">
                Thử thách Toán học
              </h2>
              <p className="mt-2 text-[15px] text-tim-100">5 câu vận dụng và vận dụng cao chọn ngẫu nhiên từ {challengeCount} câu. Mỗi câu đúng lần đầu được 20 XP.</p>
              <a href="thu-thach.html" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-hl px-4 py-2.5 font-semibold text-ink hover:bg-white">
                Nhận thử thách <LuArrowRight aria-hidden="true" />
              </a>
            </section>
            <section aria-labelledby="thanh-tich">
              <div className="flex items-end justify-between">
                <h2 id="thanh-tich" className="text-xl font-extrabold tracking-tight">
                  Thành tích học tập
                </h2>
                <a href="tien-do.html" className="text-[14px] font-semibold text-tim-700 hover:underline">
                  Xem huy hiệu
                </a>
              </div>
              <Panel className="mt-4 grid grid-cols-4 gap-2 p-4">
                {achievements.map((a) => (
                  <span key={a.code} title={`${a.name}: ${a.description}`} className="flex justify-center">
                    <BadgeMark icon={a.icon} tier={a.tier} earned={false} size={46} />
                  </span>
                ))}
              </Panel>
            </section>
          </aside>
        </div>
      </>
    ),
  });

  // ---------------- Chương trình học ----------------
  pages.push({
    file: 'chuong-trinh.html',
    title: 'Chương trình học',
    nav: 'program',
    body: (
      <>
        <PageTitle title="Chương trình học" sub="Toán THCS theo Chương trình giáo dục phổ thông 2018. Bản HTML này gồm Toán 8 – Kết nối tri thức với cuộc sống." />
        <div className="grid gap-4 md:grid-cols-4">
          {grades.map((g) => {
            const active = g.level === book.gradeLevel;
            return (
              <div key={g.id} className={cx('rounded-[22px] border p-5', active ? 'border-tim-700 bg-white shadow-[0_3px_0_0_#3b2a8c]' : 'o-li border-line')}>
                <div className="flex items-start justify-between">
                  <span className={cx('text-[44px] font-extrabold leading-none', active ? 'text-tim-700' : 'text-line-2')}>{g.level}</span>
                  {active ? <Badge tone="tre">Đang mở</Badge> : <Badge tone="gray">Sắp ra mắt</Badge>}
                </div>
                <div className="mt-3 font-bold">Toán {g.level}</div>
                <div className="text-[14px] text-ink-3">{active ? `Kết nối tri thức · ${flat.length} bài` : 'Nội dung đang được biên soạn'}</div>
                {active && (
                  <a href="muc-luc.html" className={buttonClass('primary', 'sm', 'mt-4')}>
                    Vào học Toán {g.level}
                  </a>
                )}
              </div>
            );
          })}
        </div>
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight">
              {book.title} – {book.series}
            </h2>
            {plan && (
              <a href="ppct.html" className="text-[15px] font-semibold text-tim-700 hover:underline">
                Phân phối chương trình {plan.schoolYear}
              </a>
            )}
          </div>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {tree.map((s) => (
              <Panel key={s.id} className="p-6">
                <h3 className="text-lg font-extrabold">{s.name}</h3>
                <ul className="mt-3 space-y-2.5">
                  {s.chapters.map((c) => (
                    <li key={c.id} className="flex items-baseline gap-3">
                      <span className="w-10 shrink-0 text-right font-extrabold text-tim-400">{c.kind === 'chapter' ? c.code : '★'}</span>
                      <span className="min-w-0 flex-1">
                        <a href={`chuong/${chapterFile(c)}`} className="font-semibold hover:text-tim-700 hover:underline">
                          {c.title}
                        </a>
                        <span className="block">
                          <ChapterStats c={c} themes={themes} />
                          <span className="text-[13px] text-ink-3"> · {c.lessons.reduce((n, l) => n + (l.periods ?? 0), 0)} tiết</span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="muc-luc.html" className={buttonClass('primary', 'md')}>
              Xem mục lục chi tiết
            </a>
            <a href="ban-do-kien-thuc.html" className={buttonClass('secondary', 'md')}>
              <LuMap aria-hidden="true" /> Bản đồ kiến thức
            </a>
          </div>
        </section>
      </>
    ),
  });

  // ---------------- Mục lục ----------------
  pages.push({
    file: 'muc-luc.html',
    title: `Mục lục ${book.title}`,
    nav: 'program',
    body: (
      <>
        <PageTitle
          crumbs={[{ href: 'chuong-trinh.html', label: 'Chương trình học' }, { label: book.title }]}
          title={`${book.title} – mục lục`}
          sub={`${book.series} · ${book.program}. Bấm tên chương để xem mục tiêu, chủ đề, hệ thống dạng toán và kiểm tra cuối chương; vòng tròn xanh là mục em đã học xong.`}
          actions={
            <a href="ban-do-kien-thuc.html" className={buttonClass('primary', 'md')}>
              <LuMap aria-hidden="true" /> Bản đồ kiến thức
            </a>
          }
        />
        <MapTotalsBar t={mapTotals(tree, themes)} />
        <div className="space-y-10">
          {tree.map((s) => (
            <section key={s.id} aria-labelledby={`hk-${s.number}`}>
              <h2 id={`hk-${s.number}`} className="mb-4 text-xl font-extrabold">
                {s.name}
              </h2>
              <div className="grid gap-5 lg:grid-cols-2">
                {s.chapters.map((c) => (
                  <Panel key={c.id} className="overflow-hidden">
                    <div className="border-b border-line bg-mist/60 px-5 py-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[26px] font-extrabold leading-none text-tim-700">{c.kind === 'chapter' ? c.code : '★'}</span>
                        <div className="min-w-0">
                          <h3 className="font-extrabold">
                            <a href={`chuong/${chapterFile(c)}`} className="hover:text-tim-700 hover:underline">
                              {c.kind === 'chapter' ? `Chương ${c.code}. ${c.title}` : c.title}
                            </a>
                          </h3>
                          {c.description && <p className="text-[13px] text-ink-3">{c.description}</p>}
                          <ChapterStats c={c} themes={themes} />
                        </div>
                      </div>
                      <div className="mt-3" data-cp={chapterSlugs(c)} hidden>
                        <div className="bar bar-tre">
                          <span style={{ width: '0%' }} />
                        </div>
                        <div className="mt-1 text-[12px] text-ink-3" data-cp-text />
                      </div>
                    </div>
                    <ol className="divide-y divide-line">
                      {c.lessons.map((l) => (
                        <li key={l.id}>
                          <a href={`bai/${l.slug}.html`} className="flex items-center gap-3 px-5 py-3 hover:bg-tim-50/60">
                            <Status slug={l.slug} />
                            <span className={cx('min-w-0 flex-1 text-[15px]', l.kind === 'lesson' ? 'font-medium' : 'text-ink-2')}>{lessonLabel(l)}</span>
                            {l.topicCount > 0 && <span className="hidden text-[12.5px] text-ink-3 sm:inline">{l.topicCount} dạng</span>}
                            {l.questionCount > 0 && <LuPencilRuler className="shrink-0 text-tim-400" aria-label={`${l.questionCount} bài tập`} />}
                            <span className="w-12 shrink-0 text-right text-[13px] text-ink-3">{l.periods} tiết</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                    <a href={`chuong/${chapterFile(c)}`} className="block border-t border-line px-5 py-2.5 text-[14px] font-semibold text-tim-700 hover:bg-tim-50">
                      Mở trang chương →
                    </a>
                  </Panel>
                ))}
              </div>
            </section>
          ))}
        </div>
      </>
    ),
  });

  // ---------------- PPCT ----------------
  if (plan) {
    pages.push({
      file: 'ppct.html',
      title: plan.title,
      nav: 'program',
      body: (
        <>
          <PageTitle
            crumbs={[{ href: 'chuong-trinh.html', label: 'Chương trình học' }, { href: 'muc-luc.html', label: book.title }, { label: 'Phân phối chương trình' }]}
            title={plan.title}
            sub={`${plan.items.length} mục, ${plan.items.reduce((n, i) => n + i.periods, 0)} tiết. Bấm vào tên bài để mở bài học.`}
          />
          <Panel className="overflow-x-auto">
            <table className="data-table min-w-[820px]">
              <thead>
                <tr>
                  <th className="w-12">STT</th>
                  <th>Bài học</th>
                  <th className="w-20">Số tiết</th>
                  <th className="w-24">Tiết thứ</th>
                  <th className="w-24">Tuần</th>
                  <th>Thiết bị dạy học / ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {plan.items.map((i) => (
                  <tr key={i.position} className={i.lessonSlug ? '' : 'bg-hl-soft/50'}>
                    <td className="text-ink-3">{i.position}</td>
                    <td>
                      {i.lessonSlug ? (
                        <a className="font-medium text-tim-800 hover:underline" href={`bai/${i.lessonSlug}.html`}>
                          {i.title}
                        </a>
                      ) : (
                        <strong>{i.title}</strong>
                      )}
                    </td>
                    <td>{i.periods}</td>
                    <td className="tabular-nums">{i.periodFrom === i.periodTo ? i.periodFrom : `${i.periodFrom}–${i.periodTo}`}</td>
                    <td>{i.weeks}</td>
                    <td className="text-[14px] text-ink-2">
                      {i.equipment}
                      {i.equipment && i.note ? <br /> : null}
                      {i.note && <Badge tone="cam">{i.note}</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </>
      ),
    });
  }

  // ---------------- Bài học ----------------
  for (const [idx, l] of flat.entries()) {
    const file = `bai/${l.slug}.html`;
    const [sections, counts, detail] = await Promise.all([getLessonSections(db, l.id), getLessonQuestionCounts(db, l.id), getLessonById(db, l.id)]);
    const lessonThemes = themes.get(l.id) ?? [];
    const topicTotal = countTopics(lessonThemes);
    const prev = flat[idx - 1];
    const next = flat[idx + 1];
    const total = Object.values(counts).reduce((a, b) => a + (b ?? 0), 0);
    const label = lessonLabel(l);
    const chapterName = chapterLabel(l.chapter);
    pages.push({
      file,
      title: label,
      description: l.summary ?? `${label} – ${book.title}`,
      nav: 'program',
      lesson: l.slug,
      body: (
        <div className="lesson-grid grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="lesson-main min-w-0">
            <Breadcrumbs
              items={[
                { href: '../muc-luc.html', label: book.title },
                { href: `../muc-luc.html#hk-${l.semester.number}`, label: l.semester.name },
                { href: `../chuong/${chapterFile(l.chapter)}`, label: chapterName },
                { label },
              ]}
            />
            <header className="o-li le-vo rounded-[22px] border border-line px-6 py-7 sm:pl-24">
              <div className="flex flex-wrap items-center gap-2 text-[13px]">
                {l.kind !== 'lesson' && <Badge tone="cam">{LESSON_KIND_LABELS[l.kind]}</Badge>}
                {l.code && <Badge tone="gray">Mã bài {l.code}</Badge>}
                <DifficultyBadge level={detail?.difficulty ?? null} />
              </div>
              <h1 className="mt-2 text-[30px] font-extrabold leading-tight tracking-tight md:text-[38px]">{label}</h1>
              {l.summary && <p className="mt-2 max-w-2xl text-[16px] text-ink-2">{l.summary}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-ink-2">
                <span className="inline-flex items-center gap-1.5">
                  <LuClock aria-hidden="true" /> {l.periods ?? 0} tiết
                </span>
                {topicTotal > 0 && <span>{topicTotal} dạng toán</span>}
                <span>{total} bài tập</span>
              </div>
              <div className="no-print mt-5 flex flex-wrap gap-2">
                {total > 0 && (
                  <a href={`../luyen-tap/${l.slug}.html`} className={buttonClass('primary', 'md')}>
                    Luyện tập bài này
                  </a>
                )}
                <button type="button" data-present-toggle aria-pressed="false" className={buttonClass('secondary', 'md')}>
                  <LuPresentation aria-hidden="true" /> <span data-present-label>Trình chiếu</span>
                </button>
              </div>
            </header>
            <div className="lesson-body mt-8 space-y-10">
              {sections.length === 0 && (
                <Notice tone="info">
                  Phần lí thuyết chi tiết của mục này đang được biên soạn. {topicTotal > 0 ? 'Em có thể xem tóm tắt bài học và học theo từng dạng toán bên dưới.' : ''}
                </Notice>
              )}
              <LessonBody
                sections={sections}
                themes={lessonThemes}
                topicHref={(t) => `../dang/${l.slug}/${topicKey(t)}.html`}
                lessonObjectives={detail?.objectives}
                meta={detail ? <LessonMetaPanel m={detail} showFormulas={!sections.some((s) => s.kind === 'formula')} /> : null}
              />
              <section aria-labelledby="bai-tap">
                <h2 id="bai-tap" className="mb-3 text-xl font-extrabold">
                  Bài tập
                </h2>
                {total > 0 ? (
                  <Panel className="p-5">
                    <ul className="flex flex-wrap gap-2">
                      {(Object.entries(counts) as [QuestionType, number][]).map(([type, n]) => (
                        <li key={type}>
                          <Badge>
                            {TYPE_LABELS[type]}: {n}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[15px] text-ink-2">Làm từng câu, xem đáp án và lời giải ngay sau khi kiểm tra. Mỗi câu đúng lần đầu được 10 XP.</p>
                    <a href={`../luyen-tap/${l.slug}.html`} className={buttonClass('primary', 'md', 'mt-4')}>
                      Bắt đầu luyện tập
                    </a>
                  </Panel>
                ) : (
                  <p className="text-[15px] text-ink-2">Bài này chưa có câu hỏi luyện tập.</p>
                )}
              </section>
              <section className="no-print rounded-[22px] border-2 border-dashed border-tim-200 p-6 text-center">
                <div data-panel="complete" data-slug={l.slug}>
                  <NoScript />
                </div>
              </section>
              <nav className="no-print flex flex-wrap justify-between gap-3 border-t border-line pt-6" aria-label="Chuyển bài">
                {prev ? (
                  <a href={`${prev.slug}.html`} className="flex max-w-[48%] items-center gap-2 text-[15px] text-ink-2 hover:text-tim-800">
                    <LuArrowLeft aria-hidden="true" className="shrink-0" />
                    <span className="truncate">{lessonLabel(prev)}</span>
                  </a>
                ) : (
                  <span />
                )}
                {next && (
                  <a href={`${next.slug}.html`} className="ml-auto flex max-w-[48%] items-center gap-2 text-right text-[15px] font-semibold text-tim-800 hover:underline">
                    <span className="truncate">{lessonLabel(next)}</span>
                    <LuArrowRight aria-hidden="true" className="shrink-0" />
                  </a>
                )}
              </nav>
            </div>
          </div>
          <aside className="lesson-sidebar no-print">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[22px] border border-line bg-white p-3">
              <div className="px-2 pb-2 pt-1">
                <div className="text-[13px] text-ink-3">{book.title}</div>
                <div className="text-[15px] font-bold">{chapterName}</div>
                <div className="mt-2" data-cp={chapterSlugs(l.chapter)} hidden>
                  <div className="bar bar-tre">
                    <span style={{ width: '0%' }} />
                  </div>
                  <div className="mt-1 text-[12px] text-ink-3" data-cp-text />
                </div>
              </div>
              <nav aria-label="Danh sách chương và bài">
                {tree.flatMap((s) =>
                  s.chapters.map((c) => (
                    <details key={c.id} open={c.id === l.chapterId} className="border-t border-line">
                      <summary className="flex items-center gap-2 rounded-lg px-2 py-2 text-[14px] font-semibold hover:bg-tim-50">
                        <span className="w-7 shrink-0 text-tim-400">{c.kind === 'chapter' ? c.code : '★'}</span>
                        <span className="min-w-0 flex-1 truncate">{c.title}</span>
                      </summary>
                      <ul className="pb-2">
                        {c.lessons.map((x: LessonNode) => (
                          <li key={x.id}>
                            <a
                              href={`${x.slug}.html`}
                              aria-current={x.id === l.id ? 'page' : undefined}
                              className={cx('flex items-center gap-2 rounded-lg py-1.5 pl-9 pr-2 text-[13.5px]', x.id === l.id ? 'bg-tim-700 font-semibold text-white' : 'text-ink-2 hover:bg-tim-50')}
                            >
                              {x.id !== l.id && <Status slug={x.slug} />}
                              <span className="min-w-0 flex-1 truncate">{lessonLabel(x)}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )),
                )}
              </nav>
            </div>
          </aside>
        </div>
      ),
    });
  }

  // ---------------- Trang chương ----------------
  const allChapters = tree.flatMap((sm) => sm.chapters.map((c) => ({ c, sm })));
  for (const [ci, { c, sm }] of allChapters.entries()) {
    const meta = chapterMetas.get(c.id)!;
    const sum = summarizeChapter(c, themes);
    const label = chapterLabel(c);
    const lessonsOnly = c.lessons.filter((l) => l.kind === 'lesson');
    const synth = c.lessons.filter((l) => l.kind === 'practice' || l.kind === 'review');
    const chapterQs = c.lessons.flatMap((l) => byLesson.get(l.id) ?? []).filter((q) => ['mcq', 'true_false', 'short_answer'].includes(q.type));
    const prevC = allChapters[ci - 1]?.c;
    const nextC = allChapters[ci + 1]?.c;
    pages.push({
      file: `chuong/${chapterFile(c)}`,
      title: label,
      description: c.description ?? `${label} – ${book.title}`,
      nav: 'program',
      body: (
        <>
          <Breadcrumbs items={[{ href: '../muc-luc.html', label: book.title }, { href: `../muc-luc.html#hk-${sm.number}`, label: sm.name }, { label }]} />
          <header className="o-li le-vo rounded-[22px] border border-line px-6 py-7 sm:pl-24">
            <Badge>{sm.name}</Badge>
            <h1 className="mt-2 text-[30px] font-extrabold leading-tight tracking-tight md:text-[38px]">{label}</h1>
            {c.description && <p className="mt-2 max-w-2xl text-[16px] text-ink-2">{c.description}</p>}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[14.5px] text-ink-2">
              <span>
                <strong className="text-ink">{c.kind === 'chapter' ? lessonsOnly.length : c.lessons.length}</strong> {c.kind === 'chapter' ? 'bài học' : 'hoạt động'}
              </span>
              <span>
                <strong className="text-ink">{c.lessons.length}</strong> mục (kể cả luyện tập, ôn tập)
              </span>
              <span>
                <strong className="text-ink">{sum.topics}</strong> dạng toán
              </span>
              <span>
                <strong className="text-ink">{sum.questions}</strong> bài tập
              </span>
              <span>
                <strong className="text-ink">{c.lessons.reduce((n, l) => n + (l.periods ?? 0), 0)}</strong> tiết
              </span>
            </div>
            <div className="mt-4 max-w-md" data-cp={chapterSlugs(c)} hidden>
              <div className="bar bar-tre">
                <span style={{ width: '0%' }} />
              </div>
              <div className="mt-1 text-[13px] text-ink-3" data-cp-text />
            </div>
            <div className="no-print mt-5 flex flex-wrap gap-2">
              {c.lessons[0] && (
                <a href={`../bai/${c.lessons[0].slug}.html`} className={buttonClass('primary', 'md')}>
                  Bắt đầu học
                </a>
              )}
              {sum.questions > 0 && (
                <a href={`../luyen-tap/chuong-${c.code.toLowerCase()}.html`} className={buttonClass('secondary', 'md')}>
                  <LuPencilRuler aria-hidden="true" /> Luyện tập cả chương
                </a>
              )}
            </div>
          </header>
          <div className="mt-8 space-y-10">
            <ChapterOverview c={meta} />
            <section aria-labelledby="ds-bai">
              <h2 id="ds-bai" className="mb-3 text-xl font-extrabold">
                Danh sách bài học
              </h2>
              <Panel className="overflow-hidden">
                <ol className="divide-y divide-line">
                  {c.lessons.map((l) => (
                    <li key={l.id}>
                      <a href={`../bai/${l.slug}.html`} className="flex items-center gap-3 px-5 py-3 hover:bg-tim-50/60">
                        <Status slug={l.slug} />
                        <span className="min-w-0 flex-1">
                          <span className={cx('block text-[15.5px]', l.kind === 'lesson' ? 'font-semibold' : 'text-ink-2')}>{lessonLabel(l)}</span>
                          <span className="text-[12.5px] text-ink-3">
                            {l.code}
                            {l.kind !== 'lesson' ? ` · ${LESSON_KIND_LABELS[l.kind]}` : ''}
                          </span>
                        </span>
                        {l.kind === 'lesson' && (
                          <span className="hidden text-right text-[13px] text-ink-3 sm:block">
                            {countTopics(themes.get(l.id))} dạng · {l.questionCount} bài tập
                          </span>
                        )}
                        <span className="w-14 shrink-0 text-right text-[13px] text-ink-3">{l.periods} tiết</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </Panel>
            </section>
            {c.kind === 'chapter' && (
              <section aria-labelledby="he-thong-dang">
                <h2 id="he-thong-dang" className="mb-1 text-xl font-extrabold">
                  Chủ đề và hệ thống dạng toán
                </h2>
                <p className="mb-4 text-[14.5px] text-ink-3">
                  Kí hiệu mức độ: NB – {KLEVEL[1]}, TH – {KLEVEL[2]}, VD – {KLEVEL[3]}, VDC – {KLEVEL[4]}.
                </p>
                <div className="space-y-8">
                  {lessonsOnly.map((l) => (
                    <div key={l.id}>
                      <h3 className="mb-2 flex flex-wrap items-baseline gap-2 text-[17px] font-extrabold">
                        <a href={`../bai/${l.slug}.html`} className="hover:text-tim-700 hover:underline">
                          {lessonLabel(l)}
                        </a>
                        <span className="text-[12.5px] font-semibold text-ink-3">{l.code}</span>
                      </h3>
                      {themes.get(l.id)?.length ? (
                        <ThemeList themes={themes.get(l.id)!} topicHref={(t) => `../${topicFile(l.slug, t)}`} compact />
                      ) : (
                        <p className="text-[14px] text-ink-3">Bài này chưa có chủ đề, dạng toán.</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            {c.kind === 'chapter' && (
              <div className="grid gap-6 lg:grid-cols-2">
                <Panel className="p-5">
                  <h2 className="text-lg font-extrabold">Bài tập tổng hợp</h2>
                  <p className="mt-1 text-[14.5px] text-ink-2">Các tiết luyện tập chung, bài tập cuối chương và lượt luyện tập trộn câu hỏi của mọi dạng trong chương.</p>
                  <ul className="mt-3 space-y-1.5">
                    {synth.map((l) => (
                      <li key={l.id}>
                        <a href={`../bai/${l.slug}.html`} className="flex items-center gap-2 text-[15px] font-medium text-tim-800 hover:underline">
                          <LuBookOpen aria-hidden="true" className="shrink-0" /> {l.title}
                          <span className="text-[12.5px] font-normal text-ink-3">({l.code})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  {sum.questions > 0 && (
                    <a href={`../luyen-tap/chuong-${c.code.toLowerCase()}.html`} className={buttonClass('secondary', 'sm', 'mt-4')}>
                      Luyện tập trộn cả chương ({sum.questions} câu)
                    </a>
                  )}
                </Panel>
                <Panel className="p-5">
                  <h2 className="flex items-center gap-2 text-lg font-extrabold">
                    <LuClipboardCheck aria-hidden="true" className="text-tim-600" /> Kiểm tra cuối chương
                  </h2>
                  <p className="mt-1 text-[14.5px] text-ink-2">10 câu chấm tự động, xếp từ dễ đến khó. Làm xong xem ngay điểm, đáp án và lời giải.</p>
                  <table className="mt-3 w-full text-[14px]">
                    <thead>
                      <tr className="text-left text-[12.5px] text-ink-3">
                        <th className="py-1 font-semibold">Mức độ</th>
                        <th className="py-1 text-right font-semibold">Số câu trong đề</th>
                        <th className="py-1 text-right font-semibold">Câu có sẵn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([1, 2, 3, 4] as Level[]).map((lv) => (
                        <tr key={lv} className="border-t border-line">
                          <td className="py-1.5">{KLEVEL[lv]}</td>
                          <td className="py-1.5 text-right">{CHAPTER_TEST_PLAN[lv]}</td>
                          <td className="py-1.5 text-right text-ink-3">{chapterQs.filter((q) => q.level === lv).length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {chapterQs.length ? (
                    <a href={`../luyen-tap/kiem-tra-chuong-${c.code.toLowerCase()}.html`} className={buttonClass('primary', 'md', 'mt-4')}>
                      Làm bài kiểm tra cuối chương
                    </a>
                  ) : (
                    <p className="mt-3 text-[14px] text-ink-3">Chương chưa có câu hỏi chấm tự động.</p>
                  )}
                </Panel>
              </div>
            )}
            <nav className="no-print flex flex-wrap justify-between gap-3 border-t border-line pt-6" aria-label="Chuyển chương">
              {prevC ? (
                <a href={chapterFile(prevC)} className="flex max-w-[48%] items-center gap-2 text-[15px] text-ink-2 hover:text-tim-800">
                  <LuArrowLeft aria-hidden="true" className="shrink-0" /> <span className="truncate">{chapterLabel(prevC)}</span>
                </a>
              ) : (
                <span />
              )}
              {nextC && (
                <a href={chapterFile(nextC)} className="ml-auto flex max-w-[48%] items-center gap-2 text-right text-[15px] font-semibold text-tim-800 hover:underline">
                  <span className="truncate">{chapterLabel(nextC)}</span> <LuArrowRight aria-hidden="true" className="shrink-0" />
                </a>
              )}
            </nav>
          </div>
        </>
      ),
    });
  }

  // ---------------- Trang dạng toán ----------------
  const practicedTopics: { t: TopicNode; lessonSlug: string; label: string }[] = [];
  for (const l of flat) {
    const lessonThemes = themes.get(l.id) ?? [];
    const all = lessonThemes.flatMap((th) => th.topics);
    for (const [idx, tn] of all.entries()) {
      const t = (await getTopicById(db, tn.id))!;
      const counts = await getTopicQuestionCounts(db, t.id);
      const qs = (byTopic.get(t.id) ?? []).sort((a, b) => a.level - b.level || a.id - b.id).slice(0, 30);
      const label = lessonLabel(l);
      if (qs.length) practicedTopics.push({ t: tn, lessonSlug: l.slug, label });
      const here = topicFile(l.slug, t);
      const sib = (x: TopicNode) => `${topicKey(x)}.html`;
      pages.push({
        file: here,
        title: `${t.title} – ${label}`,
        description: t.method ?? `Dạng toán ${t.title} – ${label}`,
        nav: 'program',
        body: (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <Breadcrumbs
                items={[
                  { href: '../../muc-luc.html', label: book.title },
                  { href: `../../muc-luc.html#hk-${l.semester.number}`, label: l.semester.name },
                  { href: `../../chuong/${chapterFile(l.chapter)}`, label: chapterLabel(l.chapter) },
                  { href: `../../bai/${l.slug}.html`, label },
                  ...(t.themeTitle ? [{ href: `../../bai/${l.slug}.html#dang-toan`, label: t.themeTitle }] : []),
                  { label: t.title },
                ]}
              />
              <header className="rounded-[22px] border border-line bg-white px-6 py-6">
                <div className="flex flex-wrap items-center gap-2 text-[13px]">
                  <Badge>
                    Dạng toán {idx + 1}/{all.length}
                  </Badge>
                  {t.code && <span className="font-semibold text-ink-3">{t.code}</span>}
                </div>
                <h1 className="mt-2 text-[28px] font-extrabold leading-tight tracking-tight md:text-[34px]">{t.title}</h1>
                {t.themeTitle && <p className="mt-1 text-[15px] text-ink-2">Chủ đề: {t.themeTitle}</p>}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[14px] text-ink-2">
                  <span>Mức độ:</span>
                  {t.levels.length ? <LevelBadges levels={t.levels} full /> : <span className="text-ink-3">chưa phân loại</span>}
                  <span>· {counts.total} bài tập</span>
                </div>
                <div className="no-print mt-5 flex flex-wrap gap-2">
                  {qs.length > 0 && (
                    <a href={`../../luyen-tap/dang-${t.id}.html`} className={buttonClass('primary', 'md')}>
                      <LuPencilRuler aria-hidden="true" /> Luyện tập dạng này
                    </a>
                  )}
                  <a href={`../../bai/${l.slug}.html`} className={buttonClass('secondary', 'md')}>
                    Về bài học
                  </a>
                </div>
              </header>
              <div className="mt-6 space-y-6">
                <TopicArticle t={t} />
                <section aria-labelledby="bai-tap-luyen-tap">
                  <h2 id="bai-tap-luyen-tap" className="mb-3 text-xl font-extrabold">
                    Bài tập luyện tập
                  </h2>
                  {qs.length ? (
                    <ol className="space-y-3">
                      {qs.map((q, i) => {
                        const v = offline(q);
                        return (
                          <li key={q.id} className="rounded-2xl border border-line bg-white p-4">
                            <div className="mb-1 flex flex-wrap items-center gap-2 text-[12.5px]">
                              <strong className="text-tim-700">Bài {i + 1}</strong>
                              <Badge tone="gray">{TYPE_LABELS[q.type]}</Badge>
                              <LevelBadges levels={[q.level as Level]} />
                            </div>
                            <div className="prose-math text-[15.5px]" dangerouslySetInnerHTML={{ __html: v.stemHtml }} />
                            {v.mediaHtml.map((m, k) => (
                              <div key={k} className="mt-2" dangerouslySetInnerHTML={{ __html: m }} />
                            ))}
                            {v.options && (
                              <ul className="mt-2 grid gap-1 text-[15px] sm:grid-cols-2">
                                {v.options.map((o) => (
                                  <li key={o.label} className="flex gap-2">
                                    <strong>{o.label}.</strong> <span dangerouslySetInnerHTML={{ __html: o.html }} />
                                  </li>
                                ))}
                              </ul>
                            )}
                            {v.statements && (
                              <ul className="mt-2 space-y-1 text-[15px]">
                                {v.statements.map((o) => (
                                  <li key={o.label} className="flex gap-2">
                                    <strong>{o.label})</strong> <span dangerouslySetInnerHTML={{ __html: o.html }} />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p className="text-[15px] text-ink-2">Dạng này chưa có bài tập trong ngân hàng câu hỏi.</p>
                  )}
                  {qs.length > 0 && <p className="mt-3 text-[14.5px] text-ink-2">Đáp án và lời giải hiện ngay sau khi em làm từng câu trong phần luyện tập.</p>}
                </section>
                <Panel className="p-5">
                  <h2 className="mb-3 text-lg font-extrabold">Ngân hàng câu hỏi của dạng</h2>
                  <QuestionCoverage byType={counts.byType} byLevel={counts.byLevel} levels={t.levels} />
                </Panel>
                <nav className="no-print flex flex-wrap justify-between gap-3 border-t border-line pt-6" aria-label="Chuyển dạng toán">
                  {idx > 0 ? (
                    <a href={sib(all[idx - 1])} className="flex max-w-[48%] items-center gap-2 text-[15px] text-ink-2 hover:text-tim-800">
                      <LuArrowLeft aria-hidden="true" className="shrink-0" /> <span className="truncate">{all[idx - 1].title}</span>
                    </a>
                  ) : (
                    <span />
                  )}
                  {idx < all.length - 1 && (
                    <a href={sib(all[idx + 1])} className="ml-auto flex max-w-[48%] items-center gap-2 text-right text-[15px] font-semibold text-tim-800 hover:underline">
                      <span className="truncate">{all[idx + 1].title}</span> <LuArrowRight aria-hidden="true" className="shrink-0" />
                    </a>
                  )}
                </nav>
              </div>
            </div>
            <aside className="no-print">
              <div className="sticky top-20 rounded-[22px] border border-line bg-white p-4">
                <div className="text-[13px] text-ink-3">{chapterLabel(l.chapter)}</div>
                <a href={`../../bai/${l.slug}.html`} className="text-[15px] font-bold hover:underline">
                  {label}
                </a>
                <nav aria-label="Các dạng toán của bài" className="mt-3 space-y-3">
                  {lessonThemes.map((th, i) => (
                    <div key={th.id || `k${i}`}>
                      <div className="text-[12px] font-bold uppercase tracking-wide text-tim-500">{th.title}</div>
                      <ul className="mt-1">
                        {th.topics.map((x) => (
                          <li key={x.id}>
                            <a
                              href={sib(x)}
                              aria-current={x.id === t.id ? 'page' : undefined}
                              className={cx('block rounded-lg px-2 py-1.5 text-[13.5px]', x.id === t.id ? 'bg-tim-700 font-semibold text-white' : 'text-ink-2 hover:bg-tim-50')}
                            >
                              {x.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        ),
      });
    }
  }

  // ---------------- Bản đồ kiến thức ----------------
  pages.push({
    file: 'ban-do-kien-thuc.html',
    title: `Bản đồ kiến thức ${book.title}`,
    nav: 'program',
    body: (
      <>
        <PageTitle
          crumbs={[{ href: 'chuong-trinh.html', label: 'Chương trình học' }, { href: 'muc-luc.html', label: book.title }, { label: 'Bản đồ kiến thức' }]}
          title={`Bản đồ kiến thức ${book.title}`}
          sub={`${book.series} · ${book.program}. Học kì → Chương → Bài → Chủ đề → Dạng toán. Bấm vào tên để mở trang tương ứng.`}
        />
        <MapTotalsBar t={mapTotals(tree, themes)} />
        <KnowledgeTree
          tree={tree}
          themes={themes}
          chapterLink={(c) => `chuong/${chapterFile(c)}`}
          lessonLink={(l) => `bai/${l.slug}.html`}
          topicLink={(l, t) => topicFile(l.slug, t)}
        />
      </>
    ),
  });

  // ---------------- Luyện tập ----------------
  const practicePage = (file: string, title: string, sub: string, crumbs: { href?: string; label: string }[], data: OfflinePractice, lessonOf: Record<number, string>): Page => ({
    file,
    title,
    nav: 'practice',
    body: (
      <div className="mx-auto max-w-4xl">
        <PageTitle crumbs={crumbs} title={title} sub={sub} />
        <div data-local-practice="du-lieu-luyen-tap" data-lesson-of="bai-cua-cau">
          <NoScript />
        </div>
        {json('du-lieu-luyen-tap', data)}
        {json('bai-cua-cau', lessonOf)}
      </div>
    ),
  });
  const lessonOfAll = Object.fromEntries(full.filter((q) => q.lessonId).map((q) => [q.id, lessonSlugById.get(q.lessonId!)!]));
  const practiceLessons = flat.filter((l) => byLesson.get(l.id)?.length);
  for (const l of practiceLessons) {
    const qs = byLesson.get(l.id)!;
    const label = lessonLabel(l);
    pages.push(
      practicePage(
        `luyen-tap/${l.slug}.html`,
        `Luyện tập: ${label}`,
        chapterLabel(l.chapter),
        [{ href: '../luyen-tap.html', label: 'Luyện tập' }, { label }],
        { questions: qs.map(offline), context: 'practice', limit: 10, restartHref: `${l.slug}.html`, backHref: `../bai/${l.slug}.html`, backLabel: 'Về bài học' },
        Object.fromEntries(qs.map((q) => [q.id, l.slug])),
      ),
    );
  }
  const practiceChapters = tree.flatMap((s) => s.chapters).filter((c) => c.lessons.some((l) => byLesson.get(l.id)?.length));
  for (const c of practiceChapters) {
    const qs = c.lessons.flatMap((l) => byLesson.get(l.id) ?? []);
    const label = chapterLabel(c);
    pages.push(
      practicePage(
        `luyen-tap/chuong-${c.code.toLowerCase()}.html`,
        `Luyện tập: ${label}`,
        'Câu hỏi trộn từ tất cả các bài trong chương.',
        [{ href: '../luyen-tap.html', label: 'Luyện tập' }, { label }],
        { questions: qs.map(offline), context: 'practice', limit: 10, restartHref: `chuong-${c.code.toLowerCase()}.html`, backHref: '../luyen-tap.html', backLabel: 'Về trang luyện tập' },
        lessonOfAll,
      ),
    );
  }
  for (const { t, lessonSlug, label } of practicedTopics) {
    const qs = byTopic.get(t.id)!;
    pages.push(
      practicePage(
        `luyen-tap/dang-${t.id}.html`,
        `Luyện tập dạng: ${t.title}`,
        label,
        [{ href: '../luyen-tap.html', label: 'Luyện tập' }, { href: `../${topicFile(lessonSlug, t)}`, label: t.title }, { label: 'Luyện tập' }],
        { questions: qs.map(offline), context: 'practice', limit: 10, restartHref: `dang-${t.id}.html`, backHref: `../${topicFile(lessonSlug, t)}`, backLabel: 'Về dạng toán' },
        Object.fromEntries(qs.map((q) => [q.id, lessonSlug])),
      ),
    );
  }
  for (const c of tree.flatMap((sm) => sm.chapters).filter((x) => x.kind === 'chapter')) {
    const qs = c.lessons.flatMap((l) => byLesson.get(l.id) ?? []).filter((q) => ['mcq', 'true_false', 'short_answer'].includes(q.type));
    if (!qs.length) continue;
    const label = chapterLabel(c);
    pages.push(
      practicePage(
        `luyen-tap/kiem-tra-chuong-${c.code.toLowerCase()}.html`,
        `Kiểm tra cuối chương: ${label}`,
        '10 câu chấm tự động, xếp từ dễ đến khó: 4 câu nhận biết, 3 câu thông hiểu, 2 câu vận dụng, 1 câu vận dụng cao (mức nào thiếu câu thì lấy câu ở mức gần nhất).',
        [{ href: `../chuong/${chapterFile(c)}`, label }, { label: 'Kiểm tra cuối chương' }],
        {
          questions: qs.map(offline),
          context: 'practice',
          limit: 10,
          plan: CHAPTER_TEST_PLAN,
          restartHref: `kiem-tra-chuong-${c.code.toLowerCase()}.html`,
          backHref: `../chuong/${chapterFile(c)}`,
          backLabel: 'Về trang chương',
        },
        lessonOfAll,
      ),
    );
  }
  const challengeQs = full.filter((q) => q.level >= 3 && ['mcq', 'true_false', 'short_answer'].includes(q.type));
  pages.push({
    ...practicePage(
      'thu-thach.html',
      'Thử thách Toán học',
      '5 câu mức vận dụng – vận dụng cao, chọn ngẫu nhiên mỗi lượt. Mỗi câu đúng lần đầu được 20 XP.',
      [{ href: 'luyen-tap.html', label: 'Luyện tập' }, { label: 'Thử thách' }],
      { questions: challengeQs.map(offline), context: 'challenge', limit: 5, restartHref: 'thu-thach.html', backHref: 'luyen-tap.html', backLabel: 'Về trang luyện tập' },
      lessonOfAll,
    ),
  });
  pages.push({
    file: 'luyen-tap.html',
    title: 'Luyện tập',
    nav: 'practice',
    body: (
      <>
        <PageTitle
          title="Luyện tập"
          sub="Chọn bài hoặc chương để luyện. Mỗi lượt gồm tối đa 10 câu, ưu tiên những câu em chưa làm đúng. Bài làm được chấm ngay trên máy."
          actions={
            <a href="thu-thach.html" className={buttonClass('secondary', 'md')}>
              <LuRocket aria-hidden="true" /> Thử thách Toán học
            </a>
          }
        />
        <Panel className="mb-8 p-5">
          <h2 className="text-[15px] font-bold">5 hình thức bài tập</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {QUESTION_TYPES.map((t) => (
              <li key={t} className="rounded-xl bg-mist px-3 py-2.5">
                <div className="text-[14px] font-semibold">{TYPE_LABELS[t]}</div>
                <div className="text-[13px] text-ink-3">{full.filter((q) => q.type === t).length} câu</div>
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-8">
          {tree.map((s) => {
            const chapters = s.chapters.filter((c) => practiceChapters.includes(c));
            if (!chapters.length) return null;
            return (
              <section key={s.id}>
                <h2 className="mb-3 text-xl font-extrabold">{s.name}</h2>
                <div className="grid gap-4 lg:grid-cols-2">
                  {chapters.map((c) => (
                    <Panel key={c.id} className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="font-extrabold">{chapterLabel(c)}</h3>
                        <a href={`luyen-tap/chuong-${c.code.toLowerCase()}.html`} className={buttonClass('quiet', 'sm')}>
                          Trộn cả chương ({c.lessons.reduce((a, l) => a + (byLesson.get(l.id)?.length ?? 0), 0)} câu)
                        </a>
                      </div>
                      <ul className="mt-3 divide-y divide-line">
                        {c.lessons
                          .filter((l) => byLesson.get(l.id)?.length)
                          .map((l) => (
                            <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                              <span className="min-w-0 text-[15px]">{lessonLabel(l)}</span>
                              <span className="flex shrink-0 items-center gap-3">
                                <span className="text-[13px] text-ink-3">{byLesson.get(l.id)!.length} câu</span>
                                <a href={`luyen-tap/${l.slug}.html`} className={buttonClass('primary', 'sm')}>
                                  Luyện tập
                                </a>
                              </span>
                            </li>
                          ))}
                      </ul>
                    </Panel>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </>
    ),
  });

  // ---------------- Tiến độ & thành tích ----------------
  pages.push({
    file: 'tien-do.html',
    title: 'Tiến độ & thành tích',
    nav: 'progress',
    body: (
      <>
        <PageTitle title="Tiến độ & thành tích" sub="Bài đã học, câu đã làm, điểm kinh nghiệm và huy hiệu của em trên máy này." />
        <div data-panel="progress">
          <NoScript />
        </div>
      </>
    ),
  });

  // ---------------- Ghi tệp ----------------
  // Xuất lại vào thư mục của lần xuất trước: xóa trang cũ (bài đã đổi tên/xóa không còn sót lại).
  // Chỉ xóa khi thấy tệp đánh dấu, để không bao giờ đụng vào thư mục khác của người dùng.
  const MARK = '.math-learning-html';
  if (fs.existsSync(path.join(outDir, MARK))) {
    for (const d of ['bai', 'luyen-tap', 'assets']) fs.rmSync(path.join(outDir, d), { recursive: true, force: true });
    for (const f of fs.readdirSync(outDir)) if (f.endsWith('.html')) fs.rmSync(path.join(outDir, f));
  } else if (fs.existsSync(outDir) && fs.readdirSync(outDir).some((f) => f.endsWith('.html') || f === 'bai')) {
    throw new Error(`Thư mục ${outDir} đã có trang HTML không do lệnh export-html tạo – hãy chọn thư mục khác.`);
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, MARK), `Thư mục do lệnh export-html của ${BRAND} tạo. Xuất lại sẽ thay toàn bộ trang.\n`);
  fs.writeFileSync(path.join(outDir, '.nojekyll'), ''); // GitHub Pages phục vụ nguyên tệp, không qua Jekyll
  for (const p of pages) {
    const file = path.join(outDir, p.file);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, document_(p));
  }
  const assetsOut = path.join(outDir, 'assets');
  fs.mkdirSync(assetsOut, { recursive: true });
  for (const f of ['app.css', 'ml-offline.js', 'favicon.svg']) {
    const src = path.join(assetsDir, f);
    if (!fs.existsSync(src)) throw new Error(`Thiếu ${src} – hãy chạy "npm run build" trước.`);
    fs.copyFileSync(src, path.join(assetsOut, f));
  }
  fs.cpSync(path.join(assetsDir, 'katex'), path.join(assetsOut, 'katex'), { recursive: true });
  const data: OfflineData = {
    bookTitle: book.title,
    exportedAt: new Date().toISOString(),
    lessons: flat.map((l) => ({ slug: l.slug, label: lessonLabel(l), chapterCode: l.chapter.code, chapter: chapterLabel(l.chapter), kind: l.kind })),
    chapters: tree.flatMap((s) => s.chapters).map((c) => ({ code: c.code, title: c.title, kind: c.kind, lessons: c.lessons.map((l) => l.slug) })),
    achievements: achievements.map((a) => ({ code: a.code, name: a.name, description: a.description, icon: a.icon, tier: a.tier, xp: a.xpReward })),
  };
  fs.writeFileSync(path.join(assetsOut, 'du-lieu.js'), `window.ML_DATA = ${JSON.stringify(data).replace(/</g, '\\u003c')};\n`);
  fs.writeFileSync(
    path.join(outDir, 'HUONG-DAN.txt'),
    [
      `${BRAND} – BẢN HTML (Toán 8, Kết nối tri thức với cuộc sống)`,
      COPYRIGHT,
      '',
      '1. Giải nén cả thư mục (giữ nguyên thư mục "assets", "bai", "luyen-tap").',
      '2. Mở tệp index.html bằng Chrome, Edge hoặc Firefox.',
      '3. Tiến độ, câu đã làm và huy hiệu lưu trong trình duyệt của máy đang dùng.',
      '   Vào "Tiến độ & thành tích" để tải tệp sao lưu khi cần chuyển sang máy khác.',
      '4. Có thể đưa nguyên thư mục lên Google Drive (chia sẻ để tải về), GitHub Pages, Netlify',
      '   hoặc trang web của trường để học sinh mở bằng đường link.',
      '',
      'Bản HTML không có tài khoản, lớp học, đề kiểm tra, giáo viên chấm bài và bảng xếp hạng.',
      'Những chức năng đó cần bản chạy trên máy chủ (mã nguồn + PostgreSQL).',
      'Đáp án được chấm ngay trên máy nên học sinh có thể xem được đáp án trong mã trang:',
      'dùng bản HTML để tự học, dùng bản máy chủ khi cần kiểm tra lấy điểm.',
      '',
      `Xuất ngày ${formatDate(new Date())}: ${flat.length} mục bài học, ${full.length} câu hỏi, ${pages.length} trang.`,
      '',
    ].join('\r\n'),
  );
  log(`Đã xuất ${pages.length} trang HTML (${flat.length} bài học, ${practiceLessons.length + practiceChapters.length + 1} trang luyện tập) vào ${outDir}`);
  return { pages: pages.length, lessons: flat.length, questions: full.length };
}
