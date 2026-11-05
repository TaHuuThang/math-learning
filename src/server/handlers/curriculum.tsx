import { LuArrowLeft, LuArrowRight, LuCircleCheck, LuClock, LuMap, LuPencilRuler, LuPresentation, LuSigma, LuStar } from 'react-icons/lu';
import { HttpError, redirect, type Ctx, type Res } from '../http/context';
import { page } from '../http/render';
import { requireBook } from './common';
import { requireUser, isStaff } from '../auth/guards';
import {
  chapterLabel,
  flattenLessons,
  getCourseTree,
  getLessonBySlug,
  getLessonQuestionCounts,
  getLessonSections,
  getTeachingPlan,
  lessonLabel,
  listGrades,
  type ChapterNode,
  type LessonNode,
} from '../../domain/curriculum';
import { completeLesson, reopenLesson, touchLesson } from '../../domain/progress';
import { CHAPTER_STATE_LABELS, getThemesByLesson, summarizeChapter, type ThemeNode } from '../../domain/knowledge';
import { ChapterStats, mapTotals, MapTotalsBar, topicHref } from './knowledge';
import { DifficultyBadge, LessonMetaPanel, VerifyBadge, VerifyNotice } from '../../ui/components/knowledge';
import { Badge, LinkButton, Notice, Panel, PageTitle, PostForm, ProgressBar, buttonClass, cx, Breadcrumbs, inputClass } from '../../ui/components/ui';
import { ExamplesSection, FormulaSection, LegacyExamples, LessonIntro, LessonToc, NotesBlock, TheorySection, TopicGuideSection, type TocId } from '../../ui/components/lesson-v3';
import {
  getFavoriteFormulaIds,
  getLessonExamples,
  getLessonFormulas,
  getLessonNote,
  getViewedExampleIds,
  isLessonFavorite,
  saveLessonNote,
  toggleLessonFavorite,
} from '../../domain/lesson-content';
import { LESSON_KIND_LABELS, TYPE_LABELS, formatDate, percent } from '../../shared/labels';
import type { QuestionType } from '../../shared/grading';

function LessonStatusIcon({ l }: { l: LessonNode }) {
  if (l.progress === 'completed') return <LuCircleCheck className="shrink-0 text-tre" aria-label="Đã học xong" />;
  if (l.progress === 'in_progress') return <span className="mx-[3px] h-2.5 w-2.5 shrink-0 rounded-full bg-hl ring-2 ring-[#f2df95]" aria-label="Đang học" />;
  return <span className="mx-[3px] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-line-2" aria-hidden="true" />;
}

// ---------------- /chuong-trinh ----------------

export async function programPage(ctx: Ctx): Promise<Res> {
  const grades = await listGrades(ctx.db);
  const book = await requireBook(ctx);
  const tree = await getCourseTree(ctx.db, book.id, ctx.user?.id ?? null);
  const themes = await getThemesByLesson(ctx.db, book.id);
  return page(
    ctx,
    { title: 'Chương trình học' },
    <>
      <PageTitle title="Chương trình học" sub="Toán THCS theo Chương trình giáo dục phổ thông 2018. Mỗi khối lớp theo một bộ sách giáo khoa." />
      <div className="grid gap-4 md:grid-cols-4">
        {grades.map((g) => {
          const active = g.status === 'active' && g.textbookSlug;
          return (
            <div key={g.id} className={cx('rounded-[22px] border p-5', active ? 'border-tim-700 bg-white shadow-[0_3px_0_0_#3b2a8c]' : 'o-li border-line')}>
              <div className="flex items-start justify-between">
                <span className={cx('text-[44px] font-extrabold leading-none', active ? 'text-tim-700' : 'text-line-2')}>{g.level}</span>
                {active ? <Badge tone="tre">Đang mở</Badge> : <Badge tone="gray">Sắp ra mắt</Badge>}
              </div>
              <div className="mt-3 font-bold">Toán {g.level}</div>
              <div className="text-[14px] text-ink-3">{active ? `Kết nối tri thức · ${g.lessonCount} bài` : 'Nội dung đang được biên soạn'}</div>
              {active && (
                <a href={`/hoc/${g.textbookSlug}`} className={buttonClass('primary', 'sm', 'mt-4')}>
                  Vào học Toán {g.level}
                </a>
              )}
            </div>
          );
        })}
      </div>

      <section className="mt-12" aria-labelledby="tong-quan">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="tong-quan" className="text-2xl font-extrabold tracking-tight">
            {book.title} – {book.series}
          </h2>
          <a href={`/chuong-trinh/${book.slug}/ppct`} className="text-[15px] font-semibold text-tim-700 hover:underline">
            Phân phối chương trình năm học
          </a>
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
                      <a href={`/hoc/${book.slug}/chuong/${encodeURIComponent(c.code)}`} className="font-semibold hover:text-tim-700 hover:underline">
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
          <LinkButton href={`/hoc/${book.slug}`}>Xem mục lục chi tiết</LinkButton>
          <LinkButton href={`/hoc/${book.slug}/ban-do`} variant="secondary">
            <LuMap aria-hidden="true" /> Bản đồ kiến thức
          </LinkButton>
        </div>
      </section>
    </>,
  );
}

// ---------------- /hoc/:book – mục lục ----------------

export async function coursePage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx, ctx.params.book);
  const tree = await getCourseTree(ctx.db, book.id, ctx.user?.id ?? null);
  const themes = await getThemesByLesson(ctx.db, book.id);
  const all = flattenLessons(tree);
  const done = all.filter((l) => l.progress === 'completed').length;
  const isStudent = ctx.user?.role === 'student';
  return page(
    ctx,
    { title: `Mục lục ${book.title}` },
    <>
      <PageTitle
        crumbs={[{ href: '/chuong-trinh', label: 'Chương trình học' }, { label: book.title }]}
        title={`${book.title} – mục lục`}
        sub={`${book.series} · ${book.program}. Bấm tên chương để xem mục tiêu, chủ đề, hệ thống dạng toán và kiểm tra cuối chương.`}
        actions={
          <>
            <LinkButton href={`/hoc/${book.slug}/ban-do`}>
              <LuMap aria-hidden="true" /> Bản đồ kiến thức
            </LinkButton>
            <LinkButton href={`/chuong-trinh/${book.slug}/ppct`} variant="secondary">
              Phân phối chương trình
            </LinkButton>
          </>
        }
      />
      <MapTotalsBar t={mapTotals(tree, themes)} />
      {isStudent && (
        <Panel className="mb-8 flex flex-wrap items-center gap-6 p-5">
          <div className="min-w-[220px] flex-1">
            <div className="mb-2 flex justify-between text-[15px]">
              <span className="font-semibold">Tiến độ của em</span>
              <span className="text-ink-3">
                {done}/{all.length} mục đã học xong
              </span>
            </div>
            <ProgressBar value={percent(done, all.length)} tone="tre" label="Tiến độ toàn chương trình" />
          </div>
        </Panel>
      )}
      <div className="space-y-10">
        {tree.map((s) => (
          <section key={s.id} aria-labelledby={`hk-${s.number}`}>
            <h2 id={`hk-${s.number}`} className="mb-4 text-xl font-extrabold">
              {s.name}
            </h2>
            <div className="grid gap-5 lg:grid-cols-2">
              {s.chapters.map((c) => (
                <ChapterCard key={c.id} c={c} bookSlug={book.slug} themes={themes} showProgress={isStudent} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>,
  );
}

function ChapterCard({ c, bookSlug, themes, showProgress }: { c: ChapterNode; bookSlug: string; themes: Map<number, ThemeNode[]>; showProgress: boolean }) {
  const sum = summarizeChapter(c, themes);
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-line bg-mist/60 px-5 py-4">
        <div className="flex items-baseline gap-3">
          <span className="text-[26px] font-extrabold leading-none text-tim-700">{c.kind === 'chapter' ? c.code : '★'}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-extrabold">
              <a href={`/hoc/${bookSlug}/chuong/${encodeURIComponent(c.code)}`} className="hover:text-tim-700 hover:underline">
                {c.kind === 'chapter' ? `Chương ${c.code}. ${c.title}` : c.title}
              </a>
            </h3>
            {c.description && <p className="text-[13px] text-ink-3">{c.description}</p>}
            <ChapterStats c={c} themes={themes} />
          </div>
          {showProgress && <Badge tone={sum.state === 'done' ? 'tre' : sum.state === 'in_progress' ? 'hl' : 'gray'}>{CHAPTER_STATE_LABELS[sum.state]}</Badge>}
        </div>
        {showProgress && (
          <div className="mt-3">
            <ProgressBar value={percent(sum.completed, sum.lessons)} tone="tre" label={`Tiến độ ${c.title}`} />
            <div className="mt-1 text-[12px] text-ink-3">
              {sum.completed}/{sum.lessons} mục đã học xong
            </div>
          </div>
        )}
      </div>
      <ol className="divide-y divide-line">
        {c.lessons.map((l) => (
          <li key={l.id}>
            <a href={`/hoc/${bookSlug}/bai/${l.slug}`} className="flex items-center gap-3 px-5 py-3 hover:bg-tim-50/60">
              <LessonStatusIcon l={l} />
              <span className={cx('min-w-0 flex-1 text-[15px]', l.kind === 'lesson' ? 'font-medium' : 'text-ink-2')}>{lessonLabel(l)}</span>
              {l.topicCount > 0 && <span className="hidden text-[12.5px] text-ink-3 sm:inline">{l.topicCount} dạng</span>}
              {l.questionCount > 0 && <LuPencilRuler className="shrink-0 text-tim-400" aria-label={`${l.questionCount} bài tập`} />}
              <span className="w-12 shrink-0 text-right text-[13px] text-ink-3">{l.periods} tiết</span>
            </a>
          </li>
        ))}
      </ol>
      <a href={`/hoc/${bookSlug}/chuong/${encodeURIComponent(c.code)}`} className="block border-t border-line px-5 py-2.5 text-[14px] font-semibold text-tim-700 hover:bg-tim-50">
        Mở trang chương →
      </a>
    </Panel>
  );
}

// ---------------- /chuong-trinh/:book/ppct ----------------

export async function teachingPlanPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx, ctx.params.book);
  const plan = await getTeachingPlan(ctx.db, book.id);
  if (!plan) throw new HttpError(404, 'Chưa có phân phối chương trình.');
  const total = plan.items.reduce((n, i) => n + i.periods, 0);
  return page(
    ctx,
    { title: plan.title, wide: true },
    <>
      <PageTitle
        crumbs={[{ href: '/chuong-trinh', label: 'Chương trình học' }, { href: `/hoc/${book.slug}`, label: book.title }, { label: 'Phân phối chương trình' }]}
        title={plan.title}
        sub={`${plan.items.length} mục, ${total} tiết, 35 tuần. Bấm vào tên bài để mở bài học.`}
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
                <td>{i.lessonSlug ? <a className="font-medium text-tim-800 hover:underline" href={`/hoc/${book.slug}/bai/${i.lessonSlug}`}>{i.title}</a> : <strong>{i.title}</strong>}</td>
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
    </>,
  );
}

// ---------------- /hoc/:book/bai/:slug – trang bài học ----------------

export async function lessonPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx, ctx.params.book);
  const lesson = await getLessonBySlug(ctx.db, book.id, ctx.params.slug);
  const staff = isStaff(ctx.user);
  if (!lesson || ((lesson.status !== 'published' || lesson.chapterStatus !== 'published') && !staff)) throw new HttpError(404, 'Không tìm thấy bài học.');
  if (ctx.user?.role === 'student') await touchLesson(ctx.db, ctx.user.id, lesson.id);
  const [tree, sections, themesAll, counts, formulas, examplesByTopic] = await Promise.all([
    getCourseTree(ctx.db, book.id, ctx.user?.id ?? null, staff),
    getLessonSections(ctx.db, lesson.id, !staff),
    getThemesByLesson(ctx.db, book.id, staff),
    getLessonQuestionCounts(ctx.db, lesson.id),
    getLessonFormulas(ctx.db, lesson.id, !staff),
    getLessonExamples(ctx.db, lesson.id, !staff),
  ]);
  const user = ctx.user;
  const [favorite, favFormulas, note, viewed] = user
    ? await Promise.all([isLessonFavorite(ctx.db, user.id, lesson.id), getFavoriteFormulaIds(ctx.db, user.id), getLessonNote(ctx.db, user.id, lesson.id), getViewedExampleIds(ctx.db, user.id)])
    : [false, new Set<number>(), null, new Set<number>()];
  const themes = themesAll.get(lesson.id) ?? [];
  const topicCount = themes.reduce((n, th) => n + th.topics.length, 0);
  const flat = flattenLessons(tree);
  const idx = flat.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
  const me = flat[idx];
  const completed = me?.progress === 'completed';
  const totalQuestions = Object.values(counts).reduce((a, b) => a + (b ?? 0), 0);
  const chapterItems = flat.filter((l) => l.chapterId === lesson.chapterId);
  const label = lessonLabel(lesson);
  const chapterName = chapterLabel({ kind: lesson.chapterKind, code: lesson.chapterCode, title: lesson.chapterTitle });
  const here = `/hoc/${book.slug}/bai/${lesson.slug}`;
  const exampleGroups = themes.flatMap((th) =>
    th.topics
      .filter((t) => examplesByTopic.get(t.id)?.length)
      .map((t) => ({ topic: t, href: topicHref(book.slug, lesson.slug, t), examples: examplesByTopic.get(t.id)! })),
  );
  const theoryItems = sections.filter((s) => s.kind !== 'objective' && s.kind !== 'example');
  const legacyObjectives = sections.filter((s) => s.kind === 'objective').map((s) => s.body);
  const hasLegacyExamples = sections.some((s) => s.kind === 'example');
  const isLesson = lesson.kind === 'lesson';
  const toc: TocId[] = ['gioi-thieu'];
  if (theoryItems.length || isLesson) toc.push('kham-pha');
  if (formulas.length) toc.push('cong-thuc');
  if (exampleGroups.length || hasLegacyExamples) toc.push('vi-du');
  if (themes.length) toc.push('dang-toan');
  toc.push('bai-tap', 'ghi-chu');
  const num = (id: TocId) => toc.indexOf(id) + 1;
  const posInChapter = chapterItems.findIndex((l) => l.id === lesson.id) + 1;

  return page(
    ctx,
    { title: label, description: lesson.summary ?? `${label} – ${book.title}` },
    <div className="lesson-grid grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="lesson-main min-w-0">
        <Breadcrumbs
          items={[
            { href: `/hoc/${book.slug}`, label: book.title },
            { href: `/hoc/${book.slug}#hk-${lesson.semesterNumber}`, label: lesson.semesterName },
            { href: `/hoc/${book.slug}/chuong/${encodeURIComponent(lesson.chapterCode)}`, label: chapterName },
            { label },
          ]}
        />
        <header className="o-li le-vo rounded-[22px] border border-line px-6 py-7 sm:pl-24">
          <div className="flex flex-wrap items-center gap-2 text-[13px]">
            {lesson.kind !== 'lesson' && <Badge tone="cam">{LESSON_KIND_LABELS[lesson.kind]}</Badge>}
            {lesson.code && <Badge tone="gray">Mã bài {lesson.code}</Badge>}
            <DifficultyBadge level={lesson.difficulty} />
            {lesson.status !== 'published' && <Badge tone="gray">Bản nháp – học sinh chưa thấy</Badge>}
            {staff && <VerifyBadge status={lesson.verifyStatus} note={lesson.verifyNote} />}
            {completed ? <Badge tone="tre">Đã học xong</Badge> : me?.progress === 'in_progress' ? <Badge tone="hl">Đang học</Badge> : null}
            {favorite && <Badge tone="hl">★ Bài yêu thích</Badge>}
          </div>
          <h1 className="mt-2 text-[30px] font-extrabold leading-tight tracking-tight md:text-[38px]">{label}</h1>
          {lesson.summary && <p className="mt-2 max-w-2xl text-[16px] text-ink-2">{lesson.summary}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-ink-2">
            <span className="inline-flex items-center gap-1.5">
              <LuClock aria-hidden="true" /> {lesson.periods ?? 0} tiết{lesson.estimatedMinutes ? ` (khoảng ${lesson.estimatedMinutes} phút)` : ''}
            </span>
            {topicCount > 0 && <span>{topicCount} dạng toán</span>}
            {formulas.length > 0 && <span>{formulas.length} công thức</span>}
            {exampleGroups.length > 0 && <span>{exampleGroups.reduce((n, g) => n + g.examples.length, 0)} ví dụ</span>}
            <span>{totalQuestions} bài tập</span>
          </div>
          <div className="no-print mt-5 flex flex-wrap gap-2">
            {totalQuestions > 0 && <LinkButton href={`/luyen-tap/bai/${lesson.slug}`}>Luyện tập bài này</LinkButton>}
            {user ? (
              <PostForm action={`${here}/yeu-thich`}>
                <button className={buttonClass('secondary', 'md')} aria-pressed={favorite}>
                  {favorite ? <LuStar aria-hidden="true" className="fill-current text-cam" /> : <LuStar aria-hidden="true" />} {favorite ? 'Bỏ yêu thích' : 'Lưu bài yêu thích'}
                </button>
              </PostForm>
            ) : null}
            <button type="button" data-present-toggle aria-pressed="false" className={buttonClass('secondary', 'md')}>
              <LuPresentation aria-hidden="true" /> <span data-present-label>Trình chiếu</span>
            </button>
            {staff && (
              <LinkButton href={`/giao-vien/bai-hoc/${lesson.id}`} variant="ghost">
                Soạn nội dung
              </LinkButton>
            )}
          </div>
        </header>

        <div className="lesson-body mt-8 space-y-12">
          <LessonToc ids={toc} variant="chips" />
          {staff && <VerifyNotice status={lesson.verifyStatus} note={lesson.verifyNote} />}

          <LessonIntro
            n={num('gioi-thieu')}
            d={{
              title: label,
              position: `${isLesson ? 'Bài' : 'Mục'} thứ ${posInChapter}/${chapterItems.length} của ${chapterName} · ${lesson.semesterName}`,
              objectives: [lesson.objectives, ...legacyObjectives].filter(Boolean).join('\n') || null,
              concepts: lesson.concepts,
              prerequisites: lesson.prerequisites,
              applications: lesson.applications,
            }}
          />

          {toc.includes('kham-pha') && (
            <TheorySection
              n={num('kham-pha')}
              sections={sections}
              empty={
                <>
                  <Notice tone="info">
                    Phần lí thuyết chi tiết của bài này đang được biên soạn. Dưới đây là tóm tắt từ bản đồ kiến thức.
                    {staff ? ' Giáo viên thêm mục kiến thức bằng nút "Soạn nội dung".' : ''}
                  </Notice>
                  <div className="mt-4">
                    <LessonMetaPanel m={lesson} />
                  </div>
                </>
              }
            />
          )}

          {formulas.length > 0 && (
            <FormulaSection
              n={num('cong-thuc')}
              formulas={formulas}
              allHref="/cong-thuc"
              fav={(f) =>
                user ? (
                  <PostForm action={`/cong-thuc/${f.id}/yeu-thich`}>
                    <input type="hidden" name="next" value={`${here}#ct-${f.id}`} />
                    <button className="fav-btn" aria-pressed={favFormulas.has(f.id)} title={favFormulas.has(f.id) ? 'Bỏ khỏi công thức yêu thích' : 'Lưu vào công thức yêu thích'}>
                      {favFormulas.has(f.id) ? '★' : '☆'}
                    </button>
                  </PostForm>
                ) : null
              }
            />
          )}

          {toc.includes('vi-du') && (
            <>
              {exampleGroups.length > 0 && <ExamplesSection n={num('vi-du')} groups={exampleGroups} viewed={viewed} />}
              {hasLegacyExamples && (
                <section aria-labelledby={exampleGroups.length ? undefined : 'vi-du'}>
                  {!exampleGroups.length && (
                    <h2 id="vi-du" className="mb-4 scroll-mt-24 text-[22px] font-extrabold tracking-tight">
                      <span className="mr-2 text-tim-400">{num('vi-du')}.</span>Ví dụ minh họa
                    </h2>
                  )}
                  <LegacyExamples sections={sections} />
                </section>
              )}
            </>
          )}

          {themes.length > 0 && <TopicGuideSection n={num('dang-toan')} themes={themes} topicHref={(t) => topicHref(book.slug, lesson.slug, t)} />}

          <section aria-labelledby="bai-tap">
            <h2 id="bai-tap" className="mb-4 scroll-mt-24 text-[22px] font-extrabold tracking-tight">
              <span className="mr-2 text-tim-400">{num('bai-tap')}.</span>Luyện tập
            </h2>
            {totalQuestions > 0 ? (
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
                <p className="mt-3 text-[15px] text-ink-2">Làm từng câu, xem đáp án và lời giải ngay sau khi kiểm tra. Mỗi câu đúng lần đầu được 10 XP. Làm sai, em sẽ được gợi ý dạng toán cần ôn lại.</p>
                <LinkButton href={`/luyen-tap/bai/${lesson.slug}`} className="mt-4">
                  Bắt đầu luyện tập
                </LinkButton>
              </Panel>
            ) : (
              <p className="text-[15px] text-ink-2">Bài này chưa có câu hỏi luyện tập.</p>
            )}
          </section>

          <NotesBlock n={num('ghi-chu')}>
            {user ? (
              <PostForm action={`${here}/ghi-chu`} className="rounded-[20px] border border-line bg-white p-5">
                <label htmlFor="note-body" className="sr-only">
                  Ghi chú của em
                </label>
                <textarea id="note-body" name="body" rows={5} maxLength={5000} defaultValue={note?.body ?? ''} className={cx(inputClass, "min-h-[120px] text-[15.5px]")} placeholder="Ví dụ: Nhớ đổi dấu khi bỏ ngoặc có dấu trừ phía trước…" />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button className={buttonClass('primary', 'sm')}>Lưu ghi chú</button>
                  {note && <span className="text-[13px] text-ink-3">Lưu lúc {formatDate(note.updatedAt)}</span>}
                  <a href="/goc-hoc-tap" className="ml-auto text-[13.5px] font-semibold text-tim-700 hover:underline">
                    Góc học tập của em →
                  </a>
                </div>
              </PostForm>
            ) : (
              <Notice tone="info">
                <a href={`/dang-nhap?next=${encodeURIComponent(ctx.path)}`} className="font-semibold underline">
                  Đăng nhập
                </a>{' '}
                để viết ghi chú, lưu bài và công thức yêu thích.
              </Notice>
            )}
          </NotesBlock>

          {ctx.user?.role === 'student' && (
            <section className="no-print rounded-[22px] border-2 border-dashed border-tim-200 p-6 text-center">
              {completed ? (
                <>
                  <p className="font-semibold text-tre">Em đã đánh dấu học xong mục này.</p>
                  <PostForm action={`${here}/hoc-lai`} className="mt-3">
                    <button className={buttonClass('quiet', 'sm')}>Đánh dấu là đang học lại</button>
                  </PostForm>
                </>
              ) : (
                <>
                  <p className="text-[15px] text-ink-2">Đọc xong lý thuyết và ví dụ? Đánh dấu để lưu tiến độ (+20 XP lần đầu).</p>
                  <PostForm action={`${here}/hoan-thanh`} className="mt-3">
                    <button className={buttonClass('primary', 'lg')}>
                      <LuCircleCheck aria-hidden="true" /> Đánh dấu đã học xong
                    </button>
                  </PostForm>
                </>
              )}
            </section>
          )}
          {!ctx.user && (
            <Notice tone="info">
              <a href={`/dang-nhap?next=${encodeURIComponent(ctx.path)}`} className="font-semibold underline">
                Đăng nhập
              </a>{' '}
              để lưu tiến độ học và làm bài luyện tập.
            </Notice>
          )}

          <nav className="no-print flex flex-wrap justify-between gap-3 border-t border-line pt-6" aria-label="Chuyển bài">
            {prev ? (
              <a href={`/hoc/${book.slug}/bai/${prev.slug}`} className="group flex max-w-[48%] items-center gap-2 text-[15px] text-ink-2 hover:text-tim-800">
                <LuArrowLeft aria-hidden="true" className="shrink-0" />
                <span className="truncate">{lessonLabel(prev)}</span>
              </a>
            ) : (
              <span />
            )}
            {next && (
              <a href={`/hoc/${book.slug}/bai/${next.slug}`} className="group ml-auto flex max-w-[48%] items-center gap-2 text-right text-[15px] font-semibold text-tim-800 hover:underline">
                <span className="truncate">{lessonLabel(next)}</span>
                <LuArrowRight aria-hidden="true" className="shrink-0" />
              </a>
            )}
          </nav>
        </div>
        {formulas.length > 0 && (
          <a href="#cong-thuc" className="formula-fab no-print" aria-label="Xem nhanh công thức của bài">
            <LuSigma aria-hidden="true" /> <span className="fab-label">Công thức</span>
          </a>
        )}
      </div>

      <aside className="lesson-sidebar no-print">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[22px] border border-line bg-white p-3">
          <LessonToc ids={toc} variant="side" />
          <div className="border-t border-line px-2 pb-2 pt-3">
            <div className="text-[13px] text-ink-3">{book.title}</div>
            <div className="text-[15px] font-bold">{chapterName}</div>
            <div className="mt-2">
              <ProgressBar
                tone="tre"
                value={percent(chapterItems.filter((l) => l.progress === 'completed').length, chapterItems.length)}
                label="Tiến độ chương"
              />
              <div className="mt-1 text-[12px] text-ink-3">
                {chapterItems.filter((l) => l.progress === 'completed').length}/{chapterItems.length} mục đã học xong
              </div>
            </div>
          </div>
          <nav aria-label="Danh sách chương và bài">
            {tree.flatMap((s) =>
              s.chapters.map((c) => (
                <details key={c.id} open={c.id === lesson.chapterId} className="group border-t border-line">
                  <summary className="flex items-center gap-2 rounded-lg px-2 py-2 text-[14px] font-semibold hover:bg-tim-50">
                    <span className="w-7 shrink-0 text-tim-400">{c.kind === 'chapter' ? c.code : '★'}</span>
                    <span className="min-w-0 flex-1 truncate">{c.title}</span>
                  </summary>
                  <ul className="pb-2">
                    {c.lessons.map((l) => (
                      <li key={l.id}>
                        <a
                          href={`/hoc/${book.slug}/bai/${l.slug}`}
                          aria-current={l.id === lesson.id ? 'page' : undefined}
                          className={cx(
                            'flex items-center gap-2 rounded-lg py-1.5 pl-9 pr-2 text-[13.5px]',
                            l.id === lesson.id ? 'bg-tim-700 font-semibold text-white' : 'text-ink-2 hover:bg-tim-50',
                          )}
                        >
                          {l.id !== lesson.id && <LessonStatusIcon l={l} />}
                          <span className="min-w-0 flex-1 truncate">{lessonLabel(l)}</span>
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
    </div>,
  );
}

/** Lưu / bỏ bài yêu thích. */
export async function toggleFavoriteLessonAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx, ctx.params.book);
  const lesson = await getLessonBySlug(ctx.db, book.id, ctx.params.slug);
  if (!lesson) throw new HttpError(404);
  const on = await toggleLessonFavorite(ctx.db, user.id, lesson.id);
  return redirect(`/hoc/${book.slug}/bai/${lesson.slug}`, { type: 'success', message: on ? 'Đã lưu vào bài yêu thích.' : 'Đã bỏ khỏi bài yêu thích.' }, ctx);
}

/** Lưu ghi chú cá nhân của bài (để trống để xóa). */
export async function saveNoteAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx, ctx.params.book);
  const lesson = await getLessonBySlug(ctx.db, book.id, ctx.params.slug);
  if (!lesson) throw new HttpError(404);
  const form = await ctx.form();
  const body = form.text('body', 5000);
  await saveLessonNote(ctx.db, user.id, lesson.id, body);
  return redirect(`/hoc/${book.slug}/bai/${lesson.slug}#ghi-chu`, { type: 'success', message: body.trim() ? 'Đã lưu ghi chú.' : 'Đã xóa ghi chú.' }, ctx);
}

export async function completeLessonAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx, ctx.params.book);
  const lesson = await getLessonBySlug(ctx.db, book.id, ctx.params.slug);
  if (!lesson || lesson.status !== 'published') throw new HttpError(404);
  const back = `/hoc/${book.slug}/bai/${lesson.slug}`;
  if (user.role !== 'student') return redirect(back, { type: 'info', message: 'Chỉ tài khoản học sinh được ghi tiến độ.' }, ctx);
  const res = await completeLesson(ctx.db, user.id, lesson.id);
  const parts = ['Đã lưu: em học xong mục này.'];
  if (res.xp) parts.push(`+${res.xp} XP.`);
  if (res.achievements.length) parts.push(`Huy hiệu mới: ${res.achievements.map((a) => a.name).join(', ')}.`);
  return redirect(back, { type: 'success', message: parts.join(' ') }, ctx);
}

export async function reopenLessonAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx, ctx.params.book);
  const lesson = await getLessonBySlug(ctx.db, book.id, ctx.params.slug);
  if (!lesson) throw new HttpError(404);
  await reopenLesson(ctx.db, user.id, lesson.id);
  return redirect(`/hoc/${book.slug}/bai/${lesson.slug}`, { type: 'info', message: 'Đã chuyển mục này về trạng thái đang học.' }, ctx);
}
