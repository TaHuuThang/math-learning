import { LuArrowLeft, LuArrowRight, LuBookOpen, LuClipboardCheck, LuMap, LuPencilRuler } from 'react-icons/lu';
import { HttpError, type Ctx, type Res } from '../http/context';
import { page } from '../http/render';
import { requireBook } from './common';
import { isStaff } from '../auth/guards';
import { sql } from '../db';
import { chapterLabel, flattenLessons, getCourseTree, getLessonBySlug, lessonLabel, type ChapterNode, type LessonNode, type SemesterNode } from '../../domain/curriculum';
import {
  CHAPTER_STATE_LABELS,
  LEVEL_LABELS,
  countTopics,
  findChapter,
  getChapterByCode,
  getThemesByLesson,
  getTopicByKey,
  getTopicQuestionCounts,
  summarizeChapter,
  topicKey,
  type ChapterMeta,
  type Level,
  type ThemeNode,
  type TopicNode,
} from '../../domain/knowledge';
import { getQuestions, toView } from '../../domain/questions';
import { getTopicExamples, getViewedExampleIds } from '../../domain/lesson-content';
import { WorkedExample } from '../../ui/components/lesson-v3';
import { Badge, Breadcrumbs, Html, LinkButton, Notice, PageTitle, Panel, ProgressBar, buttonClass, cx } from '../../ui/components/ui';
import {
  CHAPTER_TEST_PLAN,
  ChapterOverview,
  LevelBadges,
  QuestionCoverage,
  ThemeList,
  TopicArticle,
  VerifyBadge,
  VerifyNotice,
} from '../../ui/components/knowledge';
import { LESSON_KIND_LABELS, TYPE_LABELS, percent } from '../../shared/labels';

const chapterHref = (book: string, code: string) => `/hoc/${book}/chuong/${encodeURIComponent(code)}`;
const lessonHref = (book: string, slug: string) => `/hoc/${book}/bai/${slug}`;
export const topicHref = (book: string, lessonSlug: string, t: { id: number; slug: string | null }) => `/hoc/${book}/bai/${lessonSlug}/dang/${topicKey(t)}`;

export function StatusDot({ l }: { l: LessonNode }) {
  if (l.progress === 'completed') return <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-tre" aria-label="Đã học xong" />;
  if (l.progress === 'in_progress') return <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-hl ring-2 ring-[#f2df95]" aria-label="Đang học" />;
  return <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-line-2" aria-label="Chưa học" />;
}

/** Dòng số liệu của một chương: số bài, số dạng toán, số bài tập. */
export function ChapterStats({ c, themes }: { c: ChapterNode; themes: Map<number, ThemeNode[]> }) {
  const sum = summarizeChapter(c, themes);
  return (
    <span className="text-[13px] text-ink-3">
      {c.lessons.filter((l) => l.kind === 'lesson').length || c.lessons.length} {c.kind === 'chapter' ? 'bài' : 'hoạt động'} · {sum.topics} dạng toán · {sum.questions} bài tập
    </span>
  );
}

// ---------------- /hoc/:book/chuong/:code ----------------

export async function chapterPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx, ctx.params.book);
  const staff = isStaff(ctx.user);
  const meta = await getChapterByCode(ctx.db, book.id, ctx.params.code);
  if (!meta || (meta.status !== 'published' && !staff)) throw new HttpError(404, 'Không tìm thấy chương.');
  const [tree, themes] = await Promise.all([getCourseTree(ctx.db, book.id, ctx.user?.id ?? null, staff), getThemesByLesson(ctx.db, book.id, staff)]);
  const found = findChapter(tree, meta.code);
  if (!found) throw new HttpError(404, 'Không tìm thấy chương.');
  const { chapter: c } = found;
  const sum = summarizeChapter(c, themes);
  const label = chapterLabel(c);
  const isStudent = ctx.user?.role === 'student';
  const levelCounts = await ctx.db.many<{ level: Level; n: number }>(sql`
    select qq.level, count(*)::int as n from questions qq join exercise_types et on et.id = qq.exercise_type_id join lessons l on l.id = qq.lesson_id
    where l.chapter_id = ${c.id} and qq.status = 'published' and l.status = 'published' and et.code in ('mcq', 'true_false', 'short_answer')
    group by qq.level`);
  const chapters = tree.flatMap((s) => s.chapters);
  const ci = chapters.findIndex((x) => x.id === c.id);
  const lessonsOnly = c.lessons.filter((l) => l.kind === 'lesson');
  const synth = c.lessons.filter((l) => l.kind === 'practice' || l.kind === 'review');

  return page(
    ctx,
    { title: label, description: meta.description ?? `${label} – ${book.title}` },
    <>
      <Breadcrumbs items={[{ href: `/hoc/${book.slug}`, label: book.title }, { href: `/hoc/${book.slug}#hk-${meta.semesterNumber}`, label: meta.semesterName }, { label }]} />
      <header className="o-li le-vo rounded-[22px] border border-line px-6 py-7 sm:pl-24">
        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          <Badge>{meta.semesterName}</Badge>
          {isStudent && <Badge tone={sum.state === 'done' ? 'tre' : sum.state === 'in_progress' ? 'hl' : 'gray'}>{CHAPTER_STATE_LABELS[sum.state]}</Badge>}
          {meta.status !== 'published' && <Badge tone="gray">Đang ẩn – học sinh chưa thấy</Badge>}
          {staff && <VerifyBadge status={meta.verifyStatus} note={meta.verifyNote} />}
        </div>
        <h1 className="mt-2 text-[30px] font-extrabold leading-tight tracking-tight md:text-[38px]">{label}</h1>
        {meta.description && <p className="mt-2 max-w-2xl text-[16px] text-ink-2">{meta.description}</p>}
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
        {isStudent && (
          <div className="mt-4 max-w-md">
            <ProgressBar value={percent(sum.completed, sum.lessons)} tone="tre" label="Tiến độ chương" />
            <div className="mt-1 text-[13px] text-ink-3">
              {sum.completed}/{sum.lessons} mục đã học xong
            </div>
          </div>
        )}
        <div className="no-print mt-5 flex flex-wrap gap-2">
          {c.lessons[0] && <LinkButton href={lessonHref(book.slug, (c.lessons.find((l) => l.progress !== 'completed') ?? c.lessons[0]).slug)}>{sum.started ? 'Học tiếp' : 'Bắt đầu học'}</LinkButton>}
          {sum.questions > 0 && (
            <LinkButton href={`/luyen-tap/chuong/${encodeURIComponent(c.code)}`} variant="secondary">
              <LuPencilRuler aria-hidden="true" /> Luyện tập cả chương
            </LinkButton>
          )}
          {staff && (
            <LinkButton href={`/giao-vien/chuong/${c.id}`} variant="ghost">
              Quản lý chương
            </LinkButton>
          )}
        </div>
      </header>

      <div className="mt-8 space-y-10">
        {staff && <VerifyNotice status={meta.verifyStatus} note={meta.verifyNote} />}
        <ChapterOverview c={meta} />

        <section aria-labelledby="ds-bai">
          <h2 id="ds-bai" className="mb-3 text-xl font-extrabold">
            Danh sách bài học
          </h2>
          <Panel className="overflow-hidden">
            <ol className="divide-y divide-line">
              {c.lessons.map((l) => (
                <li key={l.id}>
                  <a href={lessonHref(book.slug, l.slug)} className="flex items-center gap-3 px-5 py-3 hover:bg-tim-50/60">
                    <StatusDot l={l} />
                    <span className="min-w-0 flex-1">
                      <span className={cx('block text-[15.5px]', l.kind === 'lesson' ? 'font-semibold' : 'text-ink-2')}>{lessonLabel(l)}</span>
                      <span className="text-[12.5px] text-ink-3">
                        {l.code}
                        {l.kind !== 'lesson' ? ` · ${LESSON_KIND_LABELS[l.kind]}` : ''}
                        {l.status !== 'published' ? ' · bản nháp' : ''}
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
              Kí hiệu mức độ: NB – {LEVEL_LABELS[1]}, TH – {LEVEL_LABELS[2]}, VD – {LEVEL_LABELS[3]}, VDC – {LEVEL_LABELS[4]}.
            </p>
            <div className="space-y-8">
              {lessonsOnly.map((l) => (
                <div key={l.id}>
                  <h3 className="mb-2 flex flex-wrap items-baseline gap-2 text-[17px] font-extrabold">
                    <a href={lessonHref(book.slug, l.slug)} className="hover:text-tim-700 hover:underline">
                      {lessonLabel(l)}
                    </a>
                    <span className="text-[12.5px] font-semibold text-ink-3">{l.code}</span>
                  </h3>
                  {themes.get(l.id)?.length ? (
                    <ThemeList themes={themes.get(l.id)!} topicHref={(t) => topicHref(book.slug, l.slug, t)} compact />
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
                    <a href={lessonHref(book.slug, l.slug)} className="flex items-center gap-2 text-[15px] font-medium text-tim-800 hover:underline">
                      <LuBookOpen aria-hidden="true" className="shrink-0" /> {l.title}
                      <span className="text-[12.5px] font-normal text-ink-3">({l.code})</span>
                    </a>
                  </li>
                ))}
              </ul>
              {sum.questions > 0 && (
                <a href={`/luyen-tap/chuong/${encodeURIComponent(c.code)}`} className={buttonClass('secondary', 'sm', 'mt-4')}>
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
                      <td className="py-1.5">{LEVEL_LABELS[lv]}</td>
                      <td className="py-1.5 text-right">{CHAPTER_TEST_PLAN[lv]}</td>
                      <td className="py-1.5 text-right text-ink-3">{levelCounts.find((r) => Number(r.level) === lv)?.n ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {levelCounts.length ? (
                ctx.user ? (
                  <LinkButton href={`/luyen-tap/chuong/${encodeURIComponent(c.code)}/kiem-tra`} className="mt-4">
                    Làm bài kiểm tra cuối chương
                  </LinkButton>
                ) : (
                  <LinkButton href={`/dang-nhap?next=${encodeURIComponent(`/luyen-tap/chuong/${c.code}/kiem-tra`)}`} variant="secondary" className="mt-4">
                    Đăng nhập để làm bài
                  </LinkButton>
                )
              ) : (
                <p className="mt-3 text-[14px] text-ink-3">Chương chưa có câu hỏi chấm tự động.</p>
              )}
            </Panel>
          </div>
        )}

        <nav className="no-print flex flex-wrap justify-between gap-3 border-t border-line pt-6" aria-label="Chuyển chương">
          {ci > 0 ? (
            <a href={chapterHref(book.slug, chapters[ci - 1].code)} className="flex max-w-[48%] items-center gap-2 text-[15px] text-ink-2 hover:text-tim-800">
              <LuArrowLeft aria-hidden="true" className="shrink-0" /> <span className="truncate">{chapterLabel(chapters[ci - 1])}</span>
            </a>
          ) : (
            <span />
          )}
          {ci >= 0 && ci < chapters.length - 1 && (
            <a href={chapterHref(book.slug, chapters[ci + 1].code)} className="ml-auto flex max-w-[48%] items-center gap-2 text-right text-[15px] font-semibold text-tim-800 hover:underline">
              <span className="truncate">{chapterLabel(chapters[ci + 1])}</span> <LuArrowRight aria-hidden="true" className="shrink-0" />
            </a>
          )}
        </nav>
      </div>
    </>,
  );
}

// ---------------- /hoc/:book/bai/:slug/dang/:key ----------------

export async function topicPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx, ctx.params.book);
  const staff = isStaff(ctx.user);
  const lesson = await getLessonBySlug(ctx.db, book.id, ctx.params.slug);
  if (!lesson || ((lesson.status !== 'published' || lesson.chapterStatus !== 'published') && !staff)) throw new HttpError(404, 'Không tìm thấy bài học.');
  const topic = await getTopicByKey(ctx.db, lesson.id, ctx.params.key);
  if (!topic || ((topic.status !== 'published' || topic.themeStatus === 'draft') && !staff)) throw new HttpError(404, 'Không tìm thấy dạng toán.');
  const [themes, counts] = await Promise.all([getThemesByLesson(ctx.db, book.id, staff), getTopicQuestionCounts(ctx.db, topic.id)]);
  const lessonThemes = themes.get(lesson.id) ?? [];
  const all = lessonThemes.flatMap((th) => th.topics);
  const idx = all.findIndex((t) => t.id === topic.id);
  const qids = await ctx.db.many<{ id: number }>(sql`
    select id from questions where topic_id = ${topic.id} and status = 'published' order by level, id limit 30`);
  const questions = (await getQuestions(ctx.db, qids.map((r) => r.id))).map((q) => toView(q, false));
  const label = lessonLabel(lesson);
  const chapterName = chapterLabel({ kind: lesson.chapterKind, code: lesson.chapterCode, title: lesson.chapterTitle });
  const [examples, viewed] = await Promise.all([getTopicExamples(ctx.db, topic.id, !staff), ctx.user ? getViewedExampleIds(ctx.db, ctx.user.id) : Promise.resolve(new Set<number>())]);

  return page(
    ctx,
    { title: `${topic.title} – ${label}`, description: topic.method ?? `Dạng toán ${topic.title} – ${label}` },
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0">
        <Breadcrumbs
          items={[
            { href: `/hoc/${book.slug}`, label: book.title },
            { href: `/hoc/${book.slug}#hk-${lesson.semesterNumber}`, label: lesson.semesterName },
            { href: chapterHref(book.slug, lesson.chapterCode), label: chapterName },
            { href: lessonHref(book.slug, lesson.slug), label },
            ...(topic.themeTitle ? [{ href: `${lessonHref(book.slug, lesson.slug)}#dang-toan`, label: topic.themeTitle }] : []),
            { label: topic.title },
          ]}
        />
        <header className="rounded-[22px] border border-line bg-white px-6 py-6">
          <div className="flex flex-wrap items-center gap-2 text-[13px]">
            <Badge>Dạng toán{idx >= 0 ? ` ${idx + 1}/${all.length}` : ''}</Badge>
            {topic.code && <span className="font-semibold text-ink-3">{topic.code}</span>}
            {topic.status !== 'published' && <Badge tone="gray">Đang ẩn</Badge>}
          </div>
          <h1 className="mt-2 text-[28px] font-extrabold leading-tight tracking-tight md:text-[34px]">{topic.title}</h1>
          {topic.themeTitle && <p className="mt-1 text-[15px] text-ink-2">Chủ đề: {topic.themeTitle}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[14px] text-ink-2">
            <span>Mức độ:</span>
            {topic.levels.length ? <LevelBadges levels={topic.levels} full /> : <span className="text-ink-3">chưa phân loại</span>}
            <span>· {counts.total} bài tập</span>
          </div>
          <div className="no-print mt-5 flex flex-wrap gap-2">
            {counts.total > 0 &&
              (ctx.user ? (
                <LinkButton href={`/luyen-tap/dang/${topic.id}`}>
                  <LuPencilRuler aria-hidden="true" /> Luyện tập dạng này
                </LinkButton>
              ) : (
                <LinkButton href={`/dang-nhap?next=${encodeURIComponent(`/luyen-tap/dang/${topic.id}`)}`}>Đăng nhập để luyện tập</LinkButton>
              ))}
            <LinkButton href={lessonHref(book.slug, lesson.slug)} variant="secondary">
              Về bài học
            </LinkButton>
            {staff && (
              <LinkButton href={`/giao-vien/dang-toan/${topic.id}`} variant="ghost">
                Sửa dạng toán
              </LinkButton>
            )}
          </div>
        </header>

        <div className="mt-6 space-y-6">
          <TopicArticle
            t={topic}
            examples={
              examples.length ? (
                <div className="space-y-4">
                  {examples.map((e, i) => (
                    <WorkedExample key={e.id} e={e} index={i + 1} viewed={viewed.has(e.id)} />
                  ))}
                </div>
              ) : undefined
            }
          />

          <section aria-labelledby="bai-tap-luyen-tap">
            <h2 id="bai-tap-luyen-tap" className="mb-3 text-xl font-extrabold">
              Bài tập luyện tập
            </h2>
            {questions.length ? (
              <ol className="space-y-3">
                {questions.map((q, i) => (
                  <li key={q.id} className="rounded-2xl border border-line bg-white p-4">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-[12.5px]">
                      <strong className="text-tim-700">Bài {i + 1}</strong>
                      <Badge tone="gray">{TYPE_LABELS[q.type]}</Badge>
                      <LevelBadges levels={[q.level as Level]} />
                    </div>
                    <Html html={q.stemHtml} className="prose-math text-[15.5px]" />
                    {q.mediaHtml.map((m, k) => (
                      <Html key={k} html={m} className="mt-2" />
                    ))}
                    {q.options && (
                      <ul className="mt-2 grid gap-1 text-[15px] sm:grid-cols-2">
                        {q.options.map((o) => (
                          <li key={o.label} className="flex gap-2">
                            <strong>{o.label}.</strong> <Html html={o.html} />
                          </li>
                        ))}
                      </ul>
                    )}
                    {q.statements && (
                      <ul className="mt-2 space-y-1 text-[15px]">
                        {q.statements.map((o) => (
                          <li key={o.label} className="flex gap-2">
                            <strong>{o.label})</strong> <Html html={o.html} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-[15px] text-ink-2">Dạng này chưa có bài tập trong ngân hàng câu hỏi.</p>
            )}
            {counts.total > 0 && (
              <p className="mt-3 text-[14.5px] text-ink-2">Đáp án và lời giải hiện ngay sau khi em làm từng câu trong phần luyện tập.</p>
            )}
          </section>

          <Panel className="p-5">
            <h2 className="mb-3 text-lg font-extrabold">Ngân hàng câu hỏi của dạng</h2>
            <QuestionCoverage byType={counts.byType} byLevel={counts.byLevel} levels={topic.levels} />
          </Panel>

          <nav className="no-print flex flex-wrap justify-between gap-3 border-t border-line pt-6" aria-label="Chuyển dạng toán">
            {idx > 0 ? (
              <a href={topicHref(book.slug, lesson.slug, all[idx - 1])} className="flex max-w-[48%] items-center gap-2 text-[15px] text-ink-2 hover:text-tim-800">
                <LuArrowLeft aria-hidden="true" className="shrink-0" /> <span className="truncate">{all[idx - 1].title}</span>
              </a>
            ) : (
              <span />
            )}
            {idx >= 0 && idx < all.length - 1 && (
              <a href={topicHref(book.slug, lesson.slug, all[idx + 1])} className="ml-auto flex max-w-[48%] items-center gap-2 text-right text-[15px] font-semibold text-tim-800 hover:underline">
                <span className="truncate">{all[idx + 1].title}</span> <LuArrowRight aria-hidden="true" className="shrink-0" />
              </a>
            )}
          </nav>
        </div>
      </div>

      <aside className="no-print">
        <div className="sticky top-20 rounded-[22px] border border-line bg-white p-4">
          <div className="text-[13px] text-ink-3">{chapterName}</div>
          <a href={lessonHref(book.slug, lesson.slug)} className="text-[15px] font-bold hover:underline">
            {label}
          </a>
          <nav aria-label="Các dạng toán của bài" className="mt-3 space-y-3">
            {lessonThemes.map((th, i) => (
              <div key={th.id || `k${i}`}>
                <div className="text-[12px] font-bold uppercase tracking-wide text-tim-500">{th.title}</div>
                <ul className="mt-1">
                  {th.topics.map((t) => (
                    <li key={t.id}>
                      <a
                        href={topicHref(book.slug, lesson.slug, t)}
                        aria-current={t.id === topic.id ? 'page' : undefined}
                        className={cx('block rounded-lg px-2 py-1.5 text-[13.5px]', t.id === topic.id ? 'bg-tim-700 font-semibold text-white' : 'text-ink-2 hover:bg-tim-50')}
                      >
                        {t.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </div>,
  );
}

// ---------------- /hoc/:book/ban-do ----------------

export interface MapTotals {
  chapters: number;
  lessons: number;
  items: number;
  themes: number;
  topics: number;
  questions: number;
}

export function mapTotals(tree: SemesterNode[], themes: Map<number, ThemeNode[]>): MapTotals {
  const flat = flattenLessons(tree);
  return {
    chapters: tree.flatMap((s) => s.chapters).filter((c) => c.kind === 'chapter').length,
    lessons: flat.filter((l) => l.kind === 'lesson').length,
    items: flat.length,
    themes: flat.reduce((n, l) => n + (themes.get(l.id)?.filter((th) => th.id).length ?? 0), 0),
    topics: flat.reduce((n, l) => n + countTopics(themes.get(l.id)), 0),
    questions: flat.reduce((n, l) => n + l.questionCount, 0),
  };
}

/** Bản đồ kiến thức dạng cây – dùng chung cho bản máy chủ và bản HTML. */
export function KnowledgeTree({
  tree,
  themes,
  chapterLink,
  lessonLink,
  topicLink,
}: {
  tree: SemesterNode[];
  themes: Map<number, ThemeNode[]>;
  chapterLink: (c: ChapterNode) => string;
  lessonLink: (l: LessonNode) => string;
  topicLink: (l: LessonNode, t: TopicNode) => string;
}) {
  return (
    <div className="space-y-8">
      {tree.map((s) => (
        <section key={s.id} aria-labelledby={`bd-hk-${s.number}`}>
          <h2 id={`bd-hk-${s.number}`} className="mb-3 text-xl font-extrabold">
            {s.name}
          </h2>
          <div className="space-y-3">
            {s.chapters.map((c) => (
              <details key={c.id} className="group rounded-[20px] border border-line bg-white" open={c.kind === 'chapter'}>
                <summary className="flex cursor-pointer flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-4">
                  <span className="text-[22px] font-extrabold leading-none text-tim-700">{c.kind === 'chapter' ? c.code : '★'}</span>
                  <span className="font-extrabold">{c.title}</span>
                  <ChapterStats c={c} themes={themes} />
                  <a href={chapterLink(c)} className="ml-auto text-[14px] font-semibold text-tim-700 hover:underline">
                    Mở chương
                  </a>
                </summary>
                <ol className="space-y-4 border-t border-line px-5 py-4">
                  {c.lessons.map((l) => {
                    const ths = themes.get(l.id) ?? [];
                    return (
                      <li key={l.id}>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <a href={lessonLink(l)} className={cx('text-[15.5px] hover:underline', l.kind === 'lesson' ? 'font-bold' : 'text-ink-2')}>
                            {lessonLabel(l)}
                          </a>
                          <span className="text-[12px] text-ink-3">{l.code}</span>
                        </div>
                        {ths.length > 0 && (
                          <ul className="mt-1.5 space-y-1.5 border-l-2 border-tim-100 pl-4">
                            {ths.map((th, i) => (
                              <li key={th.id || `k${i}`}>
                                <span className="text-[13px] font-semibold text-tim-600">{th.title}</span>
                                <span className="ml-1 inline-flex flex-wrap gap-1.5 align-middle">
                                  {th.topics.map((t) => (
                                    <a key={t.id} href={topicLink(l, t)} className="rounded-lg bg-mist px-2 py-0.5 text-[13px] text-ink-2 hover:bg-tim-50 hover:text-tim-800">
                                      {t.title}
                                    </a>
                                  ))}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function MapTotalsBar({ t }: { t: MapTotals }) {
  const items: [number, string][] = [
    [t.chapters, 'chương'],
    [t.lessons, 'bài học'],
    [t.items, 'mục trong mục lục'],
    [t.themes, 'chủ đề'],
    [t.topics, 'dạng toán'],
    [t.questions, 'bài tập'],
  ];
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(([n, k]) => (
        <div key={k} className="rounded-2xl border border-line bg-white px-4 py-3">
          <div className="text-[26px] font-extrabold leading-none text-tim-700">{n}</div>
          <div className="mt-1 text-[13px] text-ink-3">{k}</div>
        </div>
      ))}
    </div>
  );
}

export async function knowledgeMapPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx, ctx.params.book);
  const staff = isStaff(ctx.user);
  const [tree, themes] = await Promise.all([getCourseTree(ctx.db, book.id, ctx.user?.id ?? null, staff), getThemesByLesson(ctx.db, book.id, staff)]);
  return page(
    ctx,
    { title: `Bản đồ kiến thức ${book.title}`, wide: true },
    <>
      <PageTitle
        crumbs={[{ href: '/chuong-trinh', label: 'Chương trình học' }, { href: `/hoc/${book.slug}`, label: book.title }, { label: 'Bản đồ kiến thức' }]}
        title={`Bản đồ kiến thức ${book.title}`}
        sub={`${book.series} · ${book.program}. Học kì → Chương → Bài → Chủ đề → Dạng toán. Bấm vào tên để mở trang tương ứng.`}
        actions={
          <LinkButton href={`/hoc/${book.slug}`} variant="secondary">
            <LuMap aria-hidden="true" /> Mục lục
          </LinkButton>
        }
      />
      <MapTotalsBar t={mapTotals(tree, themes)} />
      <KnowledgeTree
        tree={tree}
        themes={themes}
        chapterLink={(c) => chapterHref(book.slug, c.code)}
        lessonLink={(l) => lessonHref(book.slug, l.slug)}
        topicLink={(l, t) => topicHref(book.slug, l.slug, t)}
      />
      {!ctx.user && (
        <Notice tone="info" className="mt-8">
          Đăng nhập để lưu tiến độ và làm bài luyện tập theo từng dạng toán.
        </Notice>
      )}
    </>,
  );
}

export type { ChapterMeta };
