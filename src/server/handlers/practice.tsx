import { LuPencilRuler, LuRocket } from 'react-icons/lu';
import { HttpError, json, type Ctx, type Res } from '../http/context';
import { page } from '../http/render';
import { DEFAULT_BOOK, requireBook, intParam } from './common';
import { getReviewLinks } from '../../domain/lesson-content';
import { requireUser } from '../auth/guards';
import { sql } from '../db';
import { chapterLabel, getCourseTree, getLessonById, getLessonBySlug, lessonLabel } from '../../domain/curriculum';
import { getQuestions, pickChapterTestIds, pickPracticeQuestionIds, toView, type PracticeScope } from '../../domain/questions';
import { getChapterByCode, getTopicById, topicKey } from '../../domain/knowledge';
import { CHAPTER_TEST_PLAN } from '../../ui/components/knowledge';
import { PracticeError, submitPracticeAnswer } from '../../domain/practice';
import { Island } from '../../ui/Island';
import { EmptyState, LinkButton, Notice, PageTitle, Panel, buttonClass } from '../../ui/components/ui';
import { TYPE_LABELS } from '../../shared/labels';
import { QUESTION_TYPES } from '../../shared/grading';

const SESSION_SIZE = 10;

export async function practiceHub(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const tree = await getCourseTree(ctx.db, book.id, ctx.user?.id ?? null);
  const typeCounts = await ctx.db.many<{ code: string; n: number }>(sql`
    select et.code, count(qq.id)::int as n from exercise_types et
    left join questions qq on qq.exercise_type_id = et.id and qq.status = 'published' and qq.textbook_id = ${book.id}
    group by et.code, et.sort_order order by et.sort_order`);
  const total = typeCounts.reduce((s, r) => s + r.n, 0);
  return page(
    ctx,
    { title: 'Luyện tập' },
    <>
      <PageTitle
        title="Luyện tập"
        sub="Chọn bài hoặc chương để luyện. Mỗi lượt gồm tối đa 10 câu, ưu tiên những câu em chưa làm đúng."
        actions={
          <LinkButton href="/thu-thach" variant="secondary">
            <LuRocket aria-hidden="true" /> Thử thách Toán học
          </LinkButton>
        }
      />
      <Panel className="mb-8 p-5">
        <h2 className="text-[15px] font-bold">5 hình thức bài tập</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {QUESTION_TYPES.map((t) => (
            <li key={t} className="rounded-xl bg-mist px-3 py-2.5">
              <div className="text-[14px] font-semibold">{TYPE_LABELS[t]}</div>
              <div className="text-[13px] text-ink-3">{typeCounts.find((r) => r.code === t)?.n ?? 0} câu</div>
            </li>
          ))}
        </ul>
      </Panel>
      {!ctx.user && (
        <Notice tone="info" className="mb-6">
          <a className="font-semibold underline" href="/dang-nhap?next=/luyen-tap">
            Đăng nhập
          </a>{' '}
          để làm bài – kết quả, điểm kinh nghiệm và huy hiệu được lưu vào tài khoản của em.
        </Notice>
      )}
      {total === 0 ? (
        <EmptyState icon={<LuPencilRuler />} title="Chưa có câu hỏi luyện tập">
          Giáo viên thêm câu hỏi trong Ngân hàng câu hỏi; câu đã xuất bản sẽ hiện ở đây.
        </EmptyState>
      ) : (
        <div className="space-y-8">
          {tree.map((s) => (
            <section key={s.id}>
              <h2 className="mb-3 text-xl font-extrabold">{s.name}</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {s.chapters
                  .filter((c) => c.lessons.some((l) => l.questionCount > 0))
                  .map((c) => {
                    const n = c.lessons.reduce((a, l) => a + l.questionCount, 0);
                    return (
                      <Panel key={c.id} className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h3 className="font-extrabold">{chapterLabel(c)}</h3>
                          <a href={`/luyen-tap/chuong/${encodeURIComponent(c.code)}`} className={buttonClass('quiet', 'sm')}>
                            Trộn cả chương ({n} câu)
                          </a>
                        </div>
                        <ul className="mt-3 divide-y divide-line">
                          {c.lessons
                            .filter((l) => l.questionCount > 0)
                            .map((l) => (
                              <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                                <span className="min-w-0 text-[15px]">{lessonLabel(l)}</span>
                                <span className="flex shrink-0 items-center gap-3">
                                  <span className="text-[13px] text-ink-3">{l.questionCount} câu</span>
                                  <a href={`/luyen-tap/bai/${l.slug}`} className={buttonClass('primary', 'sm')}>
                                    Luyện tập
                                  </a>
                                </span>
                              </li>
                            ))}
                        </ul>
                      </Panel>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      )}
    </>,
  );
}

async function sessionPage(
  ctx: Ctx,
  opts: {
    scope: PracticeScope;
    title: string;
    sub: string;
    crumbs: { href?: string; label: string }[];
    backHref: string;
    backLabel: string;
    context: 'practice' | 'challenge';
    pick?: () => Promise<number[]>;
  },
) {
  const user = requireUser(ctx);
  const ids = opts.pick ? await opts.pick() : await pickPracticeQuestionIds(ctx.db, opts.scope, user.id, opts.context === 'challenge' ? 5 : SESSION_SIZE);
  const full = await getQuestions(ctx.db, ids);
  const reviews = await getReviewLinks(ctx.db, full, { lesson: (slug) => `/hoc/${DEFAULT_BOOK}/bai/${slug}`, topic: (slug, key) => `/hoc/${DEFAULT_BOOK}/bai/${slug}/dang/${key}` });
  const questions = full.map((q) => ({ ...toView(q), review: reviews.get(q.id) }));
  return page(
    ctx,
    { title: opts.title },
    <div className="mx-auto max-w-4xl">
      <PageTitle crumbs={opts.crumbs} title={opts.title} sub={opts.sub} />
      {user.role !== 'student' && (
        <Notice tone="warn" className="mb-5">
          Em đang dùng tài khoản giáo viên: bài làm vẫn được chấm để xem thử, nhưng không cộng điểm kinh nghiệm hay huy hiệu.
        </Notice>
      )}
      {questions.length ? (
        <Island
          name="PracticeRunner"
          props={{ questions, context: opts.context, restartHref: ctx.path, backHref: opts.backHref, backLabel: opts.backLabel }}
        />
      ) : (
        <EmptyState icon={<LuPencilRuler />} title="Chưa có câu hỏi" action={<LinkButton href={opts.backHref}>{opts.backLabel}</LinkButton>}>
          Phần này chưa có câu hỏi luyện tập đã xuất bản.
        </EmptyState>
      )}
    </div>,
  );
}

export async function practiceLesson(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const lesson = await getLessonBySlug(ctx.db, book.id, ctx.params.slug);
  if (!lesson || lesson.status !== 'published') throw new HttpError(404, 'Không tìm thấy bài học.');
  const label = lessonLabel(lesson);
  return sessionPage(ctx, {
    scope: { kind: 'lesson', lessonId: lesson.id },
    title: `Luyện tập: ${label}`,
    sub: `Chương ${lesson.chapterCode}. ${lesson.chapterTitle}`,
    crumbs: [{ href: '/luyen-tap', label: 'Luyện tập' }, { label }],
    backHref: `/hoc/${book.slug}/bai/${lesson.slug}`,
    backLabel: 'Về bài học',
    context: 'practice',
  });
}

export async function practiceChapter(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const chapter = await ctx.db.one<{ id: number; code: string; title: string; kind: string }>(sql`
    select id, code, title, kind from chapters where textbook_id = ${book.id} and code = ${ctx.params.code}`);
  if (!chapter) throw new HttpError(404, 'Không tìm thấy chương.');
  const label = chapterLabel(chapter);
  return sessionPage(ctx, {
    scope: { kind: 'chapter', chapterId: chapter.id },
    title: `Luyện tập: ${label}`,
    sub: 'Câu hỏi trộn từ tất cả các bài trong chương.',
    crumbs: [{ href: '/luyen-tap', label: 'Luyện tập' }, { label }],
    backHref: '/luyen-tap',
    backLabel: 'Về trang luyện tập',
    context: 'practice',
  });
}

export async function practiceTopic(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const topic = await getTopicById(ctx.db, intParam(ctx, 'id'));
  const lesson = topic ? await getLessonById(ctx.db, topic.lessonId) : null;
  if (!topic || !lesson || lesson.textbookId !== book.id || topic.status !== 'published' || lesson.status !== 'published') {
    throw new HttpError(404, 'Không tìm thấy dạng toán.');
  }
  const back = `/hoc/${book.slug}/bai/${lesson.slug}/dang/${topicKey(topic)}`;
  return sessionPage(ctx, {
    scope: { kind: 'topic', topicId: topic.id },
    title: `Luyện tập dạng: ${topic.title}`,
    sub: lessonLabel(lesson),
    crumbs: [{ href: '/luyen-tap', label: 'Luyện tập' }, { href: back, label: topic.title }, { label: 'Luyện tập' }],
    backHref: back,
    backLabel: 'Về dạng toán',
    context: 'practice',
  });
}

export async function chapterTestPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const chapter = await getChapterByCode(ctx.db, book.id, ctx.params.code);
  if (!chapter || chapter.status !== 'published' || chapter.kind !== 'chapter') throw new HttpError(404, 'Không tìm thấy chương.');
  const label = chapterLabel(chapter);
  const back = `/hoc/${book.slug}/chuong/${encodeURIComponent(chapter.code)}`;
  return sessionPage(ctx, {
    scope: { kind: 'chapter', chapterId: chapter.id },
    title: `Kiểm tra cuối chương: ${label}`,
    sub: '10 câu chấm tự động, xếp từ dễ đến khó: 4 câu nhận biết, 3 câu thông hiểu, 2 câu vận dụng, 1 câu vận dụng cao (mức nào thiếu câu thì lấy câu ở mức gần nhất).',
    crumbs: [{ href: back, label }, { label: 'Kiểm tra cuối chương' }],
    backHref: back,
    backLabel: 'Về trang chương',
    context: 'practice',
    pick: () => pickChapterTestIds(ctx.db, chapter.id, CHAPTER_TEST_PLAN),
  });
}

export async function challengePage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  return sessionPage(ctx, {
    scope: { kind: 'challenge', textbookId: book.id },
    title: 'Thử thách Toán học',
    sub: '5 câu mức vận dụng – vận dụng cao. Mỗi câu đúng lần đầu được 20 XP.',
    crumbs: [{ href: '/luyen-tap', label: 'Luyện tập' }, { label: 'Thử thách' }],
    backHref: '/luyen-tap',
    backLabel: 'Về trang luyện tập',
    context: 'challenge',
  });
}

/** API chấm một câu luyện tập. */
export async function practiceAnswerApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ error: 'Phiên đăng nhập đã hết. Hãy đăng nhập lại.' }, 401);
  const body = (await ctx.json()) as { questionId?: unknown; response?: unknown; context?: unknown };
  const qid = Number(body.questionId);
  if (!Number.isInteger(qid) || qid <= 0) return json({ error: 'Thiếu mã câu hỏi.' }, 400);
  const context = body.context === 'challenge' ? 'challenge' : 'practice';
  try {
    const fb = await submitPracticeAnswer(ctx.db, ctx.user.id, qid, body.response, context);
    return json(fb);
  } catch (err) {
    if (err instanceof PracticeError) return json({ error: err.message }, 422);
    throw err;
  }
}

export async function mediaFile(ctx: Ctx): Promise<Res> {
  const id = intParam(ctx, 'id');
  const img = await ctx.db.one<{ mime: string; data: Buffer; isPublic: boolean }>(sql`select mime, data, is_public from images where id = ${id} and kind = 'upload'`);
  if (!img) throw new HttpError(404);
  // Ảnh minh họa bài học (công khai) ai cũng xem được; ảnh của câu hỏi cần đăng nhập.
  if (!img.isPublic) requireUser(ctx);
  return { type: 'bytes', status: 200, contentType: img.mime, body: img.data, cacheSeconds: 86400 };
}

