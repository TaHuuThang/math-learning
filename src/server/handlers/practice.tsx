import { LuChartBar, LuHistory, LuPencilRuler, LuRocket, LuRotateCcw, LuTarget } from 'react-icons/lu';
import { HttpError, json, redirect, type Ctx, type Res } from '../http/context';
import { page } from '../http/render';
import { DEFAULT_BOOK, intParam, paging, requireBook } from './common';
import { requireUser } from '../auth/guards';
import { sql } from '../db';
import { sniffImage } from '../http/multipart';
import { chapterLabel, getCourseTree, getLessonById, getLessonBySlug, lessonLabel, topicOptions } from '../../domain/curriculum';
import { getChapterByCode, getTopicById, topicKey } from '../../domain/knowledge';
import { PracticeError, submitPracticeAnswer } from '../../domain/practice';
import {
  KIND_LABELS,
  MASTERY_LABELS,
  SessionError,
  checkSessionAnswer,
  createSession,
  existingFeedback,
  formatDuration,
  getSession,
  listSessions,
  saveSessionDraft,
  sessionQuestions,
  sessionResult,
  submitSession,
  topicMastery,
  wrongQuestions,
  type MasteryLevel,
  type ResultItem,
  type SessionConfig,
  type SessionKind,
  type SessionMode,
  type SessionRow,
} from '../../domain/practice-sessions';
import { Island } from '../../ui/Island';
import { Badge, Button, EmptyState, Html, LinkButton, Notice, PageTitle, Pager, Panel, PostForm, ProgressBar, buttonClass, cx } from '../../ui/components/ui';
import { LEVEL_LABELS, TYPE_LABELS, TYPE_SHORT, formatDate } from '../../shared/labels';
import { QUESTION_TYPES, type QuestionType } from '../../shared/grading';
import { AREA_LABELS, CHAPTER_AREAS, DEFAULT_LEVEL_WEIGHTS, type ExamOrder } from '../../shared/exam-gen';
import { CHAPTER_TEST_PLAN } from '../../shared/pick';
import { escapeHtml, plainExcerpt, renderRich } from '../../shared/richtext';
import type { AnswerValue } from '../../islands/shared';

const AUTO_TYPES: QuestionType[] = ['mcq', 'true_false', 'short_answer'];

type Tab = 'bai' | 'dang' | 'chuong' | 'tong-hop' | 'muc-do' | 'de';
const TABS: { key: Tab; label: string; desc: string }[] = [
  { key: 'bai', label: 'Theo bài', desc: 'Chọn một bài, loại câu hỏi và mức độ. Ưu tiên câu em chưa làm đúng.' },
  { key: 'dang', label: 'Theo dạng toán', desc: 'Tập trung một kĩ năng: câu sắp từ cơ bản đến nâng cao, có nhắc lại kiến thức cần nhớ trước khi làm.' },
  { key: 'chuong', label: 'Theo chương', desc: 'Trộn câu của cả chương, đủ 4 mức độ, đảo thứ tự câu và phương án.' },
  { key: 'tong-hop', label: 'Tổng hợp', desc: 'Chọn nhiều chương đã học; câu hỏi được cân đối giữa Đại số, Hình học và Thống kê – Xác suất.' },
  { key: 'muc-do', label: 'Theo mức độ', desc: 'Luyện riêng một mức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) hoặc kết hợp nhiều mức.' },
  { key: 'de', label: 'Tạo đề luyện tập', desc: 'Tự tạo đề có thời gian: chọn phạm vi, số câu từng loại, mức độ; làm xong mới chấm.' },
];

function Check({ name, value, label, checked }: { name: string; value: string | number; label: string; checked?: boolean }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-[15px] hover:border-tim-300">
      <input type="checkbox" name={name} value={value} defaultChecked={checked} className="h-4 w-4 accent-[#3b2a8c]" />
      {label}
    </label>
  );
}

function Radio({ name, value, label, checked, hint }: { name: string; value: string; label: string; checked?: boolean; hint?: string }) {
  return (
    <label className="flex items-start gap-2 rounded-xl border border-line bg-white px-3 py-2 text-[15px] hover:border-tim-300">
      <input type="radio" name={name} value={value} defaultChecked={checked} className="mt-1 h-4 w-4 accent-[#3b2a8c]" />
      <span>
        {label}
        {hint && <span className="block text-[13px] text-ink-3">{hint}</span>}
      </span>
    </label>
  );
}

function SelectBox({ label, name, options, value, multiple, size }: { label: string; name: string; options: { value: string | number; label: string; group?: string }[]; value?: string | number | null; multiple?: boolean; size?: number }) {
  const groups = new Map<string, typeof options>();
  for (const o of options) {
    const g = o.group ?? '';
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(o);
  }
  return (
    <div>
      <label htmlFor={`f-${name}`} className="mb-1.5 block text-sm font-semibold text-ink-2">
        {label}
      </label>
      <select
        id={`f-${name}`}
        name={name}
        defaultValue={value === null || value === undefined ? undefined : String(value)}
        multiple={multiple}
        size={size}
        className="w-full rounded-xl border border-line-2 bg-white px-3 py-2.5 text-[15px] focus:border-tim-500 focus:outline-none focus:ring-4 focus:ring-tim-100"
      >
        {[...groups.entries()].map(([g, opts]) =>
          g ? (
            <optgroup key={g} label={g}>
              {opts.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ) : (
            opts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))
          ),
        )}
      </select>
    </div>
  );
}

/** Các tùy chọn chung: hình thức, mức độ, số câu, chế độ, thời gian, thứ tự. */
function CommonOptions({ tab, levels = [1, 2, 3, 4], types = AUTO_TYPES, count = 10, mode = 'practice', order }: { tab: Tab; levels?: number[]; types?: QuestionType[]; count?: number; mode?: SessionMode; order?: ExamOrder }) {
  const exam = tab === 'de';
  const defOrder = order ?? (tab === 'dang' || tab === 'bai' ? 'level' : tab === 'de' ? 'type' : 'random');
  return (
    <div className="space-y-5">
      {exam ? (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-2">Số câu từng hình thức</legend>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {QUESTION_TYPES.map((t) => (
              <label key={t} className="block rounded-xl border border-line bg-white px-3 py-2 text-[14px]">
                <span className="font-semibold">{TYPE_SHORT[t]}</span>
                <input type="number" name={`so-${t}`} min={0} max={40} defaultValue={{ mcq: 12, true_false: 2, short_answer: 4, essay: 1, geometry_essay: 0 }[t]} className="mt-1 w-full rounded-lg border border-line-2 px-2 py-1.5 text-[15px]" />
              </label>
            ))}
          </div>
          <p className="mt-1.5 text-[13px] text-ink-3">Câu tự luận được lưu để giáo viên chấm; khi nộp em xem được lời giải tham khảo.</p>
        </fieldset>
      ) : (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-2">Hình thức câu hỏi</legend>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {QUESTION_TYPES.map((t) => (
              <Check key={t} name="loai" value={t} label={TYPE_LABELS[t]} checked={types.includes(t)} />
            ))}
          </div>
        </fieldset>
      )}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink-2">Mức độ</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((l) => (
            <Check key={l} name="muc" value={l} label={`${l}. ${LEVEL_LABELS[l]}`} checked={levels.includes(l)} />
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!exam && <SelectBox label="Số câu" name="so-cau" value={count} options={[5, 10, 15, 20, 25, 30, 40].map((n) => ({ value: n, label: `${n} câu` }))} />}
        <SelectBox
          label="Thời gian làm bài"
          name="thoi-gian"
          value={exam ? 45 : 0}
          options={[{ value: 0, label: 'Không giới hạn' }, ...[10, 15, 20, 30, 45, 60, 90].map((n) => ({ value: n, label: `${n} phút` }))]}
        />
        <SelectBox
          label="Thứ tự câu"
          name="thu-tu"
          value={defOrder}
          options={[
            { value: 'level', label: 'Từ dễ đến khó' },
            { value: 'random', label: 'Ngẫu nhiên' },
            { value: 'type', label: 'Theo phần: TN → Đ/S → TLN → Tự luận' },
          ]}
        />
      </div>
      {!exam && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-2">Cách làm</legend>
          <div className="grid gap-2 md:grid-cols-2">
            <Radio name="che-do" value="practice" label="Luyện tập – chấm từng câu" hint="Bấm Kiểm tra để biết đúng sai, xem lời giải và kiến thức cần ôn ngay." checked={mode === 'practice'} />
            <Radio name="che-do" value="exam" label="Làm như đề kiểm tra" hint="Làm hết rồi nộp; có thể đặt thời gian; chấm khi nộp." checked={mode === 'exam'} />
          </div>
        </fieldset>
      )}
      <label className="flex items-center gap-2 text-[15px]">
        <input type="checkbox" name="dao-phuong-an" value="1" defaultChecked className="h-4 w-4 accent-[#3b2a8c]" /> Đảo thứ tự phương án trắc nghiệm
      </label>
    </div>
  );
}

async function practiceData(ctx: Ctx) {
  const book = await requireBook(ctx);
  const tree = await getCourseTree(ctx.db, book.id, ctx.user?.id ?? null);
  const typeCounts = await ctx.db.many<{ code: QuestionType; n: number }>(sql`
    select et.code, count(qq.id)::int as n from exercise_types et
    left join questions qq on qq.exercise_type_id = et.id and qq.status = 'published' and qq.textbook_id = ${book.id}
    group by et.code, et.sort_order order by et.sort_order`);
  const topicQ = await ctx.db.many<{ id: number; n: number }>(sql`
    select topic_id as id, count(*)::int as n from questions where status = 'published' and textbook_id = ${book.id} and topic_id is not null group by topic_id`);
  const topics = (await topicOptions(ctx.db, book.id)).filter((t) => topicQ.some((x) => x.id === t.id));
  const topicCount = new Map(topicQ.map((t) => [t.id, t.n]));
  const chapters = tree.flatMap((s) => s.chapters.filter((c) => c.kind === 'chapter').map((c) => ({ ...c, semester: s.name, n: c.lessons.reduce((a, l) => a + l.questionCount, 0) })));
  return { book, tree, typeCounts, topics, topicCount, chapters };
}

export async function practiceHub(ctx: Ctx): Promise<Res> {
  const { book, typeCounts, topics, topicCount, chapters } = await practiceData(ctx);
  const tabParam = ctx.query.get('kieu') as Tab | null;
  const tab: Tab = TABS.some((t) => t.key === tabParam) ? tabParam! : 'bai';
  const preLesson = Number(ctx.query.get('bai')) || null;
  const preTopic = Number(ctx.query.get('dang')) || null;
  const preChapter = Number(ctx.query.get('chuong')) || null;
  const total = typeCounts.reduce((s, r) => s + r.n, 0);
  const lessonOpts = chapters.flatMap((c) =>
    c.lessons.filter((l) => l.questionCount > 0).map((l) => ({ value: l.id, label: `${lessonLabel(l)} (${l.questionCount} câu)`, group: chapterLabel(c) })),
  );
  const info = TABS.find((t) => t.key === tab)!;
  return page(
    ctx,
    { title: 'Luyện tập' },
    <>
      <PageTitle
        title="Luyện tập"
        sub={`Ngân hàng có ${total.toLocaleString('vi-VN')} câu hỏi đã kiểm duyệt. Chọn cách luyện phù hợp với em.`}
        actions={
          <>
            {ctx.user && (
              <>
                <LinkButton href="/luyen-tap/lich-su" variant="quiet">
                  <LuHistory aria-hidden="true" /> Lịch sử
                </LinkButton>
                <LinkButton href="/luyen-tap/tien-do" variant="quiet">
                  <LuChartBar aria-hidden="true" /> Tiến độ
                </LinkButton>
                <LinkButton href="/luyen-tap/cau-hay-sai" variant="quiet">
                  <LuRotateCcw aria-hidden="true" /> Câu hay sai
                </LinkButton>
              </>
            )}
            <LinkButton href="/thu-thach" variant="secondary">
              <LuRocket aria-hidden="true" /> Thử thách
            </LinkButton>
          </>
        }
      />
      {!ctx.user && (
        <Notice tone="info" className="mb-6">
          <a className="font-semibold underline" href={`/dang-nhap?next=${encodeURIComponent(ctx.path + ctx.url.search)}`}>
            Đăng nhập
          </a>{' '}
          để làm bài – kết quả, lịch sử, câu hay sai và mức thành thạo từng dạng toán được lưu vào tài khoản của em.
        </Notice>
      )}
      <div className="mb-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {QUESTION_TYPES.map((t) => (
          <div key={t} className="rounded-2xl border border-line bg-white px-4 py-3">
            <div className="text-[14px] font-semibold">{TYPE_LABELS[t]}</div>
            <div className="text-[13px] text-ink-3">{(typeCounts.find((r) => r.code === t)?.n ?? 0).toLocaleString('vi-VN')} câu</div>
          </div>
        ))}
      </div>

      <nav aria-label="Cách luyện tập" className="mb-0 flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map((t) => (
          <a
            key={t.key}
            href={`/luyen-tap?kieu=${t.key}`}
            aria-current={t.key === tab ? 'page' : undefined}
            className={cx('shrink-0 rounded-t-xl px-4 py-2.5 text-[15px] font-semibold', t.key === tab ? 'border border-b-white border-line bg-white text-tim-800 -mb-px' : 'text-ink-3 hover:text-tim-700')}
          >
            {t.label}
          </a>
        ))}
      </nav>
      <Panel className="rounded-t-none border-t-0 p-5 md:p-7">
        <p className="mb-5 text-[15px] text-ink-2">{info.desc}</p>
        {total === 0 ? (
          <EmptyState icon={<LuPencilRuler />} title="Chưa có câu hỏi luyện tập">
            Giáo viên thêm câu hỏi trong Ngân hàng câu hỏi; câu đã duyệt sẽ hiện ở đây.
          </EmptyState>
        ) : (
          <PostForm action="/luyen-tap/tao" className="space-y-6">
            <input type="hidden" name="kieu" value={tab} />
            {tab === 'bai' && <SelectBox label="Bài học" name="bai" value={preLesson ?? lessonOpts[0]?.value} options={lessonOpts} />}
            {tab === 'dang' && (
              <SelectBox
                label="Dạng toán"
                name="dang"
                value={preTopic ?? topics[0]?.id}
                options={topics.map((t) => ({ value: t.id, label: `${t.label} (${topicCount.get(t.id) ?? 0} câu)`, group: t.lesson }))}
              />
            )}
            {tab === 'chuong' && <SelectBox label="Chương" name="chuong" value={preChapter ?? chapters[0]?.id} options={chapters.filter((c) => c.n > 0).map((c) => ({ value: c.id, label: `${chapterLabel(c)} (${c.n} câu)`, group: c.semester }))} />}
            {(tab === 'tong-hop' || tab === 'muc-do' || tab === 'de') && (
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-ink-2">{tab === 'muc-do' ? 'Phạm vi (bỏ trống = cả chương trình)' : 'Các chương đã học'}</legend>
                <div className="grid gap-2 md:grid-cols-2">
                  {chapters
                    .filter((c) => c.n > 0)
                    .map((c) => (
                      <label key={c.id} className="flex items-start gap-2 rounded-xl border border-line bg-white px-3 py-2 text-[14.5px] hover:border-tim-300">
                        <input type="checkbox" name="chuong" value={c.id} defaultChecked={tab === 'tong-hop' ? c.semester === chapters[0]?.semester : false} className="mt-1 h-4 w-4 accent-[#3b2a8c]" />
                        <span>
                          {chapterLabel(c)}
                          <span className="block text-[12.5px] text-ink-3">
                            {AREA_LABELS[CHAPTER_AREAS[c.code] ?? 'algebra']} · {c.n} câu
                          </span>
                        </span>
                      </label>
                    ))}
                </div>
                {tab !== 'muc-do' && (
                  <label className="mt-3 flex items-center gap-2 text-[15px]">
                    <input type="checkbox" name="can-doi" value="1" defaultChecked className="h-4 w-4 accent-[#3b2a8c]" /> Cân đối giữa Số và Đại số, Hình học, Thống kê – Xác suất
                  </label>
                )}
              </fieldset>
            )}
            <CommonOptions
              tab={tab}
              levels={tab === 'muc-do' ? [3] : [1, 2, 3, 4]}
              count={tab === 'tong-hop' ? 20 : tab === 'chuong' ? 15 : 10}
              mode={tab === 'de' ? 'exam' : 'practice'}
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">{tab === 'de' ? 'Tạo đề và bắt đầu làm' : 'Bắt đầu luyện tập'}</Button>
              <span className="text-[14px] text-ink-3">Câu hỏi lấy ngẫu nhiên, không trùng lặp, chỉ trong phạm vi em chọn.</span>
            </div>
          </PostForm>
        )}
      </Panel>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-extrabold">Luyện nhanh theo bài</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {chapters
            .filter((c) => c.n > 0)
            .map((c) => (
              <Panel key={c.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-extrabold">{chapterLabel(c)}</h3>
                  <a href={`/luyen-tap?kieu=chuong&chuong=${c.id}`} className={buttonClass('quiet', 'sm')}>
                    Trộn cả chương ({c.n} câu)
                  </a>
                </div>
                <ul className="mt-3 divide-y divide-line">
                  {c.lessons
                    .filter((l) => l.questionCount > 0)
                    .map((l) => (
                      <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                        <a href={`/luyen-tap?kieu=bai&bai=${l.id}`} className="min-w-0 text-[15px] hover:text-tim-700">
                          {lessonLabel(l)}
                        </a>
                        <span className="flex shrink-0 items-center gap-3">
                          <span className="text-[13px] text-ink-3">{l.questionCount} câu</span>
                          <PostForm action="/luyen-tap/tao" className="inline">
                            <input type="hidden" name="kieu" value="bai" />
                            <input type="hidden" name="bai" value={l.id} />
                            <input type="hidden" name="nhanh" value="1" />
                            <button className={buttonClass('primary', 'sm')}>Luyện 10 câu</button>
                          </PostForm>
                        </span>
                      </li>
                    ))}
                </ul>
              </Panel>
            ))}
        </div>
      </section>
      <p className="mt-6 text-[14px] text-ink-3">Sách: {book.title}</p>
    </>,
  );
}

// ---------------- Tạo phiên từ biểu mẫu ----------------

function parseLevels(vals: string[]): number[] {
  const l = [...new Set(vals.map(Number).filter((n) => n >= 1 && n <= 4))].sort();
  return l.length ? l : [1, 2, 3, 4];
}

function parseTypes(vals: string[], fallback: QuestionType[] = AUTO_TYPES): QuestionType[] {
  const t = vals.filter((v): v is QuestionType => (QUESTION_TYPES as string[]).includes(v));
  return t.length ? [...new Set(t)] : fallback;
}

async function chapterNames(ctx: Ctx, ids: number[]) {
  const rows = await ctx.db.many<{ id: number; code: string; title: string; kind: string }>(sql`select id, code, title, kind from chapters where id = any(${ids}::int[]) order by sort_order`);
  return rows;
}

export async function createSessionAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx);
  const form = await ctx.form();
  const tab = form.str('kieu') as Tab | 'thu-thach' | 'cuoi-chuong';
  const quick = form.str('nhanh') === '1';
  const levels = quick ? [1, 2, 3, 4] : parseLevels(form.all('muc'));
  const types = quick ? AUTO_TYPES : parseTypes(form.all('loai'));
  const count = Math.min(50, Math.max(3, form.int('so-cau') ?? 10));
  const order: ExamOrder = (['level', 'random', 'type'] as const).find((o) => o === form.str('thu-tu')) ?? 'level';
  const shuffleOptions = quick ? true : form.str('dao-phuong-an') === '1';
  const timeRaw = form.int('thoi-gian') ?? 0;
  let mode: SessionMode = form.str('che-do') === 'exam' ? 'exam' : 'practice';
  const base: SessionConfig = { scope: {}, types, levels, count, order, shuffleOptions, timeLimit: timeRaw > 0 ? timeRaw : null, scopeLabel: '' };
  let kind: SessionKind = 'lesson';
  let title = 'Luyện tập';
  let back = '/luyen-tap';

  if (tab === 'bai') {
    const lesson = await getLessonById(ctx.db, form.int('bai') ?? 0);
    if (!lesson || lesson.textbookId !== book.id || lesson.status !== 'published') throw new HttpError(404, 'Không tìm thấy bài học.');
    kind = 'lesson';
    base.scope = { lessonIds: [lesson.id] };
    base.scopeLabel = lessonLabel(lesson);
    title = `Luyện tập: ${lessonLabel(lesson)}`;
    back = `/luyen-tap?kieu=bai&bai=${lesson.id}`;
  } else if (tab === 'dang') {
    const topic = await getTopicById(ctx.db, form.int('dang') ?? 0);
    const lesson = topic ? await getLessonById(ctx.db, topic.lessonId) : null;
    if (!topic || !lesson || lesson.textbookId !== book.id || topic.status !== 'published') throw new HttpError(404, 'Không tìm thấy dạng toán.');
    kind = 'topic';
    base.scope = { topicIds: [topic.id] };
    base.scopeLabel = `${topic.title} – ${lessonLabel(lesson)}`;
    title = `Luyện dạng: ${topic.title}`;
    base.order = form.has('thu-tu') ? order : 'level';
    back = `/luyen-tap/dang/${topic.id}`;
  } else if (tab === 'chuong' || tab === 'cuoi-chuong') {
    const ch = (await chapterNames(ctx, [form.int('chuong') ?? 0]))[0];
    if (!ch) throw new HttpError(404, 'Không tìm thấy chương.');
    base.scope = { chapterIds: [ch.id] };
    base.scopeLabel = chapterLabel(ch);
    if (tab === 'cuoi-chuong') {
      kind = 'chapter_test';
      mode = 'exam';
      Object.assign(base, { types: AUTO_TYPES, levels: [1, 2, 3, 4], count: 10, levelWeights: CHAPTER_TEST_PLAN, order: 'level', shuffleOptions: true, timeLimit: 20 });
      title = `Kiểm tra cuối chương: ${chapterLabel(ch)}`;
      back = `/hoc/${book.slug}/chuong/${encodeURIComponent(ch.code)}`;
    } else {
      kind = 'chapter';
      base.levelWeights = levels.length === 4 ? DEFAULT_LEVEL_WEIGHTS : undefined;
      title = `Luyện tập: ${chapterLabel(ch)}`;
      back = `/luyen-tap?kieu=chuong&chuong=${ch.id}`;
    }
  } else if (tab === 'tong-hop' || tab === 'muc-do' || tab === 'de') {
    const ids = form
      .all('chuong')
      .map(Number)
      .filter((n) => n > 0);
    const chs = ids.length ? await chapterNames(ctx, ids) : [];
    if (tab !== 'muc-do' && !chs.length) return redirect(`/luyen-tap?kieu=${tab}`, { type: 'error', message: 'Chọn ít nhất một chương.' }, ctx);
    base.scope = chs.length ? { chapterIds: chs.map((c) => c.id) } : {};
    base.scopeLabel = chs.length ? chs.map((c) => `Chương ${c.code}`).join(', ') : 'Cả chương trình Toán 8';
    base.balanceAreas = form.str('can-doi') === '1';
    if (tab === 'tong-hop') {
      kind = 'mixed';
      base.levelWeights = levels.length === 4 ? DEFAULT_LEVEL_WEIGHTS : undefined;
      title = `Luyện tập tổng hợp: ${base.scopeLabel}`;
    } else if (tab === 'muc-do') {
      kind = 'level';
      title = `Luyện mức ${levels.map((l) => LEVEL_LABELS[l]).join(' + ')}${chs.length ? ` – ${base.scopeLabel}` : ''}`;
      base.order = form.has('thu-tu') ? order : 'random';
    } else {
      kind = 'mixed';
      mode = 'exam';
      const tc: Partial<Record<QuestionType, number>> = {};
      for (const t of QUESTION_TYPES) {
        const n = Math.min(40, Math.max(0, form.int(`so-${t}`) ?? 0));
        if (n) tc[t] = n;
      }
      const sum = Object.values(tc).reduce((a, b) => a + (b ?? 0), 0);
      if (!sum) return redirect('/luyen-tap?kieu=de', { type: 'error', message: 'Nhập số câu cho ít nhất một hình thức.' }, ctx);
      if (sum > 60) return redirect('/luyen-tap?kieu=de', { type: 'error', message: 'Đề luyện tập tối đa 60 câu.' }, ctx);
      base.typeCounts = tc;
      base.types = Object.keys(tc) as QuestionType[];
      base.count = sum;
      base.levelWeights = levels.length === 4 ? DEFAULT_LEVEL_WEIGHTS : undefined;
      title = `Đề luyện tập ${sum} câu: ${base.scopeLabel}`;
    }
    back = `/luyen-tap?kieu=${tab}`;
  } else if (tab === 'thu-thach') {
    kind = 'challenge';
    mode = 'practice';
    Object.assign(base, { types: AUTO_TYPES, levels: [3, 4], count: 5, order: 'level', shuffleOptions: true, timeLimit: null, scopeLabel: 'Cả chương trình' });
    title = 'Thử thách Toán học';
    back = '/thu-thach';
  } else throw new HttpError(400, 'Kiểu luyện tập không hợp lệ.');

  if (mode === 'practice') base.timeLimit = null;
  const res = await createSession(ctx.db, user.id, book.id, kind, mode, title, base);
  if (!res.id) return redirect(back, { type: 'error', message: res.error ?? 'Không tạo được lượt luyện tập.' }, ctx);
  if (res.shortfall) ctx.setFlash({ type: 'info', message: `Ngân hàng chỉ đủ ${base.count - res.shortfall}/${base.count} câu phù hợp – đề gồm các câu hiện có.` });
  return redirect(`/luyen-tap/phien/${res.id}`);
}

// ---------------- Trang làm bài ----------------

async function ownSession(ctx: Ctx): Promise<SessionRow> {
  const user = requireUser(ctx);
  const s = await getSession(ctx.db, intParam(ctx, 'id'));
  if (!s || s.userId !== user.id) throw new HttpError(404, 'Không tìm thấy lượt luyện tập.');
  return s;
}

/** Chủ bài, quản trị viên hoặc giáo viên dạy lớp của học sinh được xem kết quả. */
async function viewableSession(ctx: Ctx): Promise<SessionRow> {
  const user = requireUser(ctx);
  const s = await getSession(ctx.db, intParam(ctx, 'id'));
  if (!s) throw new HttpError(404, 'Không tìm thấy lượt luyện tập.');
  if (s.userId === user.id || user.role === 'admin') return s;
  if (user.role === 'teacher') {
    const ok = await ctx.db.one(sql`
      select 1 from class_members m join classes c on c.id = m.class_id where m.student_id = ${s.userId} and c.teacher_id = ${user.id} limit 1`);
    if (ok) return s;
  }
  throw new HttpError(404, 'Không tìm thấy lượt luyện tập.');
}

export async function sessionPage(ctx: Ctx): Promise<Res> {
  const s = await ownSession(ctx);
  if (s.status === 'submitted') return redirect(`/luyen-tap/ket-qua/${s.id}`);
  const book = await requireBook(ctx);
  const { questions, full, reviews } = await sessionQuestions(ctx.db, s, book.slug);
  const { feedback, answers } = s.mode === 'practice' ? await existingFeedback(ctx.db, s, full, reviews) : { feedback: {}, answers: {} };
  const initialAnswers = { ...(s.draftAnswers as Record<string, AnswerValue>), ...(answers as Record<string, AnswerValue>) };
  let intro: { title: string; knowledge: string | null; steps: string | null; href: string } | null = null;
  if (s.kind === 'topic' && s.config.scope.topicIds?.length) {
    const t = await getTopicById(ctx.db, s.config.scope.topicIds[0]);
    const l = t ? await getLessonById(ctx.db, t.lessonId) : null;
    if (t && l) intro = { title: t.title, knowledge: t.knowledge, steps: t.steps, href: `/hoc/${book.slug}/bai/${l.slug}/dang/${topicKey(t)}` };
  }
  return page(
    ctx,
    { title: s.title },
    <div className="mx-auto max-w-6xl">
      <PageTitle
        crumbs={[{ href: '/luyen-tap', label: 'Luyện tập' }, { label: KIND_LABELS[s.kind] }]}
        title={s.title}
        sub={`${s.config.scopeLabel} · ${s.questionIds.length} câu · ${s.mode === 'practice' ? 'Luyện tập – chấm từng câu' : `Làm đề – chấm khi nộp${s.timeLimitMinutes ? ` · ${s.timeLimitMinutes} phút` : ''}`}`}
      />
      {ctx.user!.role !== 'student' && (
        <Notice tone="warn" className="mb-5">
          Em đang dùng tài khoản giáo viên: bài làm vẫn được chấm để xem thử.
        </Notice>
      )}
      {intro && (
        <details open className="mb-5 rounded-2xl border border-hl bg-hl-soft/60 p-5">
          <summary className="cursor-pointer text-[16px] font-bold">Kiến thức cần nhớ trước khi làm – {intro.title}</summary>
          {intro.knowledge && <Html className="prose-math mt-3 text-[15.5px]" html={renderRich(intro.knowledge)} />}
          {intro.steps && (
            <div className="mt-3">
              <div className="text-sm font-bold text-ink-2">Các bước giải</div>
              <Html className="prose-math text-[15.5px]" html={renderRich(intro.steps)} />
            </div>
          )}
          <a href={intro.href} className="mt-3 inline-block font-semibold text-tim-700 underline underline-offset-2">
            Xem phương pháp và ví dụ minh họa
          </a>
        </details>
      )}
      <Island
        name="SessionRunner"
        props={{
          sessionId: s.id,
          title: s.title,
          mode: s.mode,
          questions,
          deadline: s.deadlineAt ? s.deadlineAt.toISOString() : null,
          serverNow: new Date().toISOString(),
          initialAnswers,
          initialFlagged: s.flagged,
          initialFeedback: feedback,
          backHref: '/luyen-tap',
        }}
      />
    </div>,
  );
}

function sessionApiError(err: unknown): Res {
  if (err instanceof SessionError) return json({ error: err.message }, 422);
  throw err;
}

export async function sessionCheckApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ error: 'Phiên đăng nhập đã hết. Hãy đăng nhập lại.' }, 401);
  const s = await getSession(ctx.db, intParam(ctx, 'id'));
  if (!s || s.userId !== ctx.user.id) return json({ error: 'Không tìm thấy lượt luyện tập.' }, 404);
  const body = (await ctx.json()) as { questionId?: unknown; response?: unknown };
  const qid = Number(body.questionId);
  if (!Number.isInteger(qid) || qid <= 0) return json({ error: 'Thiếu mã câu hỏi.' }, 400);
  try {
    return json(await checkSessionAnswer(ctx.db, s, qid, body.response, DEFAULT_BOOK));
  } catch (err) {
    return sessionApiError(err);
  }
}

export async function sessionSaveApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ error: 'Phiên đăng nhập đã hết.' }, 401);
  const s = await getSession(ctx.db, intParam(ctx, 'id'));
  if (!s || s.userId !== ctx.user.id) return json({ error: 'Không tìm thấy lượt luyện tập.' }, 404);
  const body = (await ctx.json()) as { answers?: Record<string, unknown>; flagged?: unknown };
  try {
    await saveSessionDraft(ctx.db, s, body.answers ?? {}, body.flagged);
    return json({ ok: true });
  } catch (err) {
    return sessionApiError(err);
  }
}

export async function sessionSubmitApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ error: 'Phiên đăng nhập đã hết. Hãy đăng nhập lại.' }, 401);
  const s = await getSession(ctx.db, intParam(ctx, 'id'));
  if (!s || s.userId !== ctx.user.id) return json({ error: 'Không tìm thấy lượt luyện tập.' }, 404);
  const body = (await ctx.json()) as { answers?: Record<string, unknown> };
  try {
    const sum = await submitSession(ctx.db, s, body.answers ?? null);
    if (sum.achievements.length) ctx.setFlash({ type: 'success', message: `Em vừa nhận huy hiệu: ${sum.achievements.map((a) => a.name).join(', ')}.` });
    return json({ redirect: `/luyen-tap/ket-qua/${s.id}` });
  } catch (err) {
    return sessionApiError(err);
  }
}

// ---------------- Kết quả ----------------

const STATUS_TEXT: Record<string, { label: string; tone: 'tre' | 'le' | 'hl' | 'tim' | 'gray' }> = {
  correct: { label: 'Đúng', tone: 'tre' },
  partial: { label: 'Đúng một phần', tone: 'hl' },
  incorrect: { label: 'Sai', tone: 'le' },
  pending: { label: 'Chờ giáo viên chấm', tone: 'tim' },
  blank: { label: 'Chưa làm', tone: 'gray' },
};

function describeAnswer(it: ResultItem): string {
  const r = it.response as AnswerValue | null;
  if (!r) return '<em>Chưa làm</em>';
  if (it.type === 'mcq') return r.choice ? `Chọn <strong>${escapeHtml(r.choice)}</strong>` : '<em>Chưa làm</em>';
  if (it.type === 'true_false')
    return (
      Object.entries(r.values ?? {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}) <strong>${v ? 'Đúng' : 'Sai'}</strong>`)
        .join(' · ') || '<em>Chưa làm</em>'
    );
  if (it.type === 'short_answer') return `<strong>${escapeHtml(r.text ?? '')}</strong>`;
  return renderRich(r.text || '…') + (r.images?.length ? r.images.map((i) => `<a href="/media/${i}" target="_blank" rel="noreferrer"><img src="/media/${i}" alt="Ảnh bài làm" class="mt-2 h-40 w-auto rounded-lg border border-line"></a>`).join(' ') : '');
}

function correctAnswerHtml(it: ResultItem): string | null {
  if (it.type === 'mcq' && it.reveal.correctChoice) return `<strong>${escapeHtml(it.reveal.correctChoice)}</strong>`;
  if (it.type === 'true_false' && it.reveal.correctValues)
    return Object.entries(it.reveal.correctValues)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}) <strong>${v ? 'Đúng' : 'Sai'}</strong>`)
      .join(' · ');
  if (it.type === 'short_answer' && it.reveal.acceptedHtml) return it.reveal.acceptedHtml.join(' hoặc ') + (it.view.unit ? ` ${escapeHtml(it.view.unit)}` : '');
  return null;
}

function StatCard({ label, value, tone = 'tim', sub }: { label: string; value: string; tone?: 'tim' | 'tre' | 'le' | 'hl' | 'gray'; sub?: string }) {
  const bg = { tim: 'bg-tim-50 text-tim-800', tre: 'bg-tre-soft text-tre', le: 'bg-le-soft text-le', hl: 'bg-hl-soft text-[#7a5a00]', gray: 'bg-mist text-ink-2' }[tone];
  return (
    <div className={cx('rounded-2xl p-4', bg)}>
      <div className="text-[13px] text-ink-3">{label}</div>
      <div className="text-2xl font-extrabold md:text-3xl">{value}</div>
      {sub && <div className="text-[12.5px] text-ink-3">{sub}</div>}
    </div>
  );
}

export async function sessionResultPage(ctx: Ctx): Promise<Res> {
  const s = await viewableSession(ctx);
  if (s.status !== 'submitted') return redirect(`/luyen-tap/phien/${s.id}`);
  const book = await requireBook(ctx);
  const own = s.userId === ctx.user!.id;
  const { items, byTopic, weak, ten } = await sessionResult(ctx.db, s, book.slug);
  const total = items.length;
  const graded = total - (s.pendingCount ?? 0);
  const accuracy = graded ? Math.round((((s.correctCount ?? 0) + 0) / graded) * 100) : 0;
  const owner = own ? null : await ctx.db.one<{ fullName: string }>(sql`select full_name from users where id = ${s.userId}`);
  const wrongIds = items.filter((i) => i.status === 'incorrect' || i.status === 'partial' || i.status === 'blank').map((i) => i.view.id);
  return page(
    ctx,
    { title: `Kết quả: ${s.title}` },
    <div className="mx-auto max-w-5xl">
      <PageTitle
        crumbs={[{ href: '/luyen-tap', label: 'Luyện tập' }, ...(own ? [{ href: '/luyen-tap/lich-su', label: 'Lịch sử' }] : []), { label: 'Kết quả' }]}
        title={s.title}
        sub={`${owner ? `${owner.fullName} · ` : ''}${s.config.scopeLabel} · nộp lúc ${formatDate(s.submittedAt!)} · ${KIND_LABELS[s.kind]}`}
      />
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Điểm (thang 10)" value={ten.toLocaleString('vi-VN')} sub={s.pendingCount ? `chưa tính ${s.pendingCount} câu tự luận` : undefined} />
        <StatCard label="Tổng số câu" value={String(total)} tone="gray" />
        <StatCard label="Câu đúng" value={String(s.correctCount ?? 0)} tone="tre" sub={s.partialCount ? `+ ${s.partialCount} câu đúng một phần` : undefined} />
        <StatCard label="Câu sai" value={String((s.incorrectCount ?? 0) + (s.partialCount ?? 0))} tone="le" />
        <StatCard label="Chưa làm" value={String(s.blankCount ?? 0)} tone="hl" sub={s.pendingCount ? `${s.pendingCount} câu chờ chấm` : undefined} />
        <StatCard label="Tỉ lệ chính xác" value={`${accuracy}%`} tone="tre" sub={`Thời gian: ${formatDuration(s.durationSeconds)}`} />
      </div>

      {own && (
        <div className="mt-6 flex flex-wrap gap-3">
          {wrongIds.length > 0 && (
            <PostForm action={`/luyen-tap/ket-qua/${s.id}/lam-lai`} className="inline">
              <input type="hidden" name="kieu" value="sai" />
              <Button>
                <LuRotateCcw aria-hidden="true" /> Làm lại {wrongIds.length} câu sai / chưa làm
              </Button>
            </PostForm>
          )}
          <PostForm action={`/luyen-tap/ket-qua/${s.id}/lam-lai`} className="inline">
            <input type="hidden" name="kieu" value="moi" />
            <Button variant="secondary">Tạo lượt mới cùng cấu hình</Button>
          </PostForm>
          <PostForm action={`/luyen-tap/ket-qua/${s.id}/lam-lai`} className="inline">
            <input type="hidden" name="kieu" value="tat-ca" />
            <Button variant="quiet">Làm lại đúng các câu này</Button>
          </PostForm>
          <LinkButton href="/luyen-tap" variant="quiet">
            Về trang luyện tập
          </LinkButton>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Panel className="overflow-x-auto p-0">
          <h2 className="border-b border-line px-5 py-3 text-lg font-extrabold">Kết quả theo dạng toán</h2>
          <table className="data-table min-w-[480px]">
            <thead>
              <tr>
                <th>Dạng toán / chủ đề</th>
                <th className="w-20">Số câu</th>
                <th className="w-40">Đạt</th>
              </tr>
            </thead>
            <tbody>
              {byTopic.map((t) => (
                <tr key={t.key}>
                  <td className="text-[14px]">
                    {t.href ? (
                      <a href={t.href} className="font-semibold hover:text-tim-700">
                        {t.title}
                      </a>
                    ) : (
                      t.title
                    )}
                    {t.lessonTitle && <div className="text-[12.5px] text-ink-3">{t.lessonTitle}</div>}
                  </td>
                  <td className="text-[14px]">{t.total}</td>
                  <td>{t.pct === null ? <span className="text-[13px] text-ink-3">chờ chấm</span> : <ProgressBar value={t.pct} tone={t.pct >= 60 ? 'tre' : 'tim'} label={`${t.pct}%`} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <Panel className="p-5">
          <h2 className="text-lg font-extrabold">Kiến thức cần ôn tập</h2>
          {weak.length ? (
            <ul className="mt-3 space-y-3">
              {weak.map((w) => (
                <li key={w.key} className="rounded-xl border border-line bg-white p-3">
                  <div className="font-semibold">{w.title}</div>
                  <div className="text-[13px] text-ink-3">
                    Đạt {w.pct}% ({Math.round(w.earned * 10) / 10}/{w.graded} câu){w.lessonTitle ? ` · ${w.lessonTitle}` : ''}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {w.href && (
                      <a href={w.href} className={buttonClass('quiet', 'sm')}>
                        Ôn phương pháp
                      </a>
                    )}
                    {own && w.topicId && (
                      <PostForm action="/luyen-tap/tao" className="inline">
                        <input type="hidden" name="kieu" value="dang" />
                        <input type="hidden" name="dang" value={w.topicId} />
                        <input type="hidden" name="nhanh" value="1" />
                        <button className={buttonClass('secondary', 'sm')}>Luyện lại dạng này</button>
                      </PostForm>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-[15px] text-ink-2">
              {graded ? 'Em làm tốt tất cả các dạng trong lượt này. Hãy thử mức Vận dụng – Vận dụng cao hoặc chuyển sang bài tiếp theo.' : 'Các câu tự luận đang chờ giáo viên chấm.'}
            </p>
          )}
          {weak.length > 0 && <p className="mt-4 text-[14px] text-ink-3">Gợi ý: đọc lại phần “Kiến thức sử dụng” và ví dụ minh họa của dạng, rồi luyện lại 5–10 câu cùng dạng.</p>}
        </Panel>
      </div>

      <h2 className="mb-3 mt-10 text-xl font-extrabold">Xem lại bài làm và lời giải</h2>
      <ol className="space-y-5">
        {items.map((it, i) => {
          const st = STATUS_TEXT[it.status];
          const ans = correctAnswerHtml(it);
          return (
            <li key={it.view.id}>
              <article className="rounded-[22px] border border-line bg-white p-5 md:p-7">
                <header className="mb-3 flex flex-wrap items-center gap-2 text-[13px]">
                  <h3 className="mr-1 text-lg font-extrabold">Câu {i + 1}</h3>
                  <Badge>{TYPE_SHORT[it.type]}</Badge>
                  <Badge tone="gray">{LEVEL_LABELS[it.view.level]}</Badge>
                  <Badge tone={st.tone}>{st.label}</Badge>
                  {it.pointsAwarded !== null && it.status === 'correct' && it.type !== 'mcq' && it.type !== 'true_false' && it.type !== 'short_answer' && (
                    <span className="text-ink-3">{it.pointsAwarded.toLocaleString('vi-VN')} điểm</span>
                  )}
                </header>
                <Html className="prose-math text-[16.5px]" html={it.view.stemHtml} />
                {it.view.mediaHtml.map((h, k) => (
                  <Html key={k} className="mt-3 flex justify-center rounded-xl border border-line bg-white p-3" html={h} />
                ))}
                {it.view.options && (
                  <ul className="mt-3 grid gap-2 md:grid-cols-2">
                    {it.view.options.map((o) => {
                      const chosen = (it.response as AnswerValue | null)?.choice === o.label;
                      const right = it.reveal.correctChoice === o.label;
                      return (
                        <li key={o.label} className={cx('rounded-xl border-2 px-3 py-2 text-[15px]', right ? 'border-tre bg-tre-soft' : chosen ? 'border-le bg-le-soft' : 'border-line')}>
                          <strong className="mr-1">{o.label}.</strong>
                          <Html className="prose-math inline" html={o.html} />
                          {it.reveal.notesHtml?.[o.label] && (chosen || right) && <Html className="prose-math mt-1 block text-[13.5px] text-ink-2" html={it.reveal.notesHtml[o.label]} />}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {it.view.statements && (
                  <ul className="mt-3 space-y-1.5 text-[15px]">
                    {it.view.statements.map((st2) => {
                      const v = (it.response as AnswerValue | null)?.values?.[st2.label];
                      const c = it.reveal.correctValues?.[st2.label];
                      return (
                        <li key={st2.label} className={cx('rounded-xl px-3 py-2', v === undefined ? 'bg-mist' : v === c ? 'bg-tre-soft' : 'bg-le-soft')}>
                          <strong>{st2.label})</strong> <Html className="prose-math inline" html={st2.html} /> –{' '}
                          <span className="text-ink-2">
                            em chọn <strong>{v === undefined ? '…' : v ? 'Đúng' : 'Sai'}</strong>, đáp án <strong>{c ? 'Đúng' : 'Sai'}</strong>
                          </span>
                          {it.reveal.notesHtml?.[st2.label] && <Html className="prose-math mt-0.5 block text-[13.5px] text-ink-2" html={it.reveal.notesHtml[st2.label]} />}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {!it.view.options && !it.view.statements && (
                  <div className="mt-3 rounded-xl bg-mist px-4 py-3 text-[15px]">
                    <span className="text-[13px] font-semibold text-ink-3">Bài làm của em: </span>
                    <Html className="prose-math" html={describeAnswer(it)} />
                    {it.note && <p className="mt-1 text-[13.5px] text-ink-2">{it.note}</p>}
                  </div>
                )}
                {ans && it.type === 'short_answer' && (
                  <p className="mt-2 text-[15px]">
                    Đáp số đúng: <Html className="prose-math inline" html={ans} />
                  </p>
                )}
                {it.feedback && (
                  <p className="mt-2 rounded-xl bg-tim-50 px-4 py-2 text-[15px]">
                    <strong>Nhận xét của giáo viên:</strong> {it.feedback}
                  </p>
                )}
                {it.reveal.solutionHtml && (
                  <details className="mt-3 rounded-xl border border-line bg-white px-4 py-3" open={it.status !== 'correct'}>
                    <summary className="cursor-pointer font-semibold text-tim-800">{it.status === 'pending' ? 'Lời giải tham khảo và hướng dẫn chấm' : 'Lời giải'}</summary>
                    <Html className="prose-math mt-2" html={it.reveal.solutionHtml} />
                    {it.rubricHtml && (
                      <div className="mt-3">
                        <div className="text-sm font-bold text-ink-2">Hướng dẫn chấm</div>
                        <Html className="prose-math text-[15px]" html={it.rubricHtml} />
                      </div>
                    )}
                  </details>
                )}
                {it.review && (it.status === 'incorrect' || it.status === 'partial' || it.status === 'blank') && (
                  <p className="mt-3 text-[15px]">
                    <strong>Ôn lại:</strong>{' '}
                    <a href={it.review.href} className="font-semibold text-tim-700 underline underline-offset-2">
                      {it.review.label}
                    </a>
                    {it.review.lessonHref && (
                      <>
                        {' · '}
                        <a href={it.review.lessonHref} className="text-tim-700 underline underline-offset-2">
                          {it.review.lessonTitle}
                        </a>
                      </>
                    )}
                  </p>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>,
  );
}

/** Làm lại: câu sai, đúng các câu cũ (đảo lại), hoặc lượt mới cùng cấu hình. */
export async function retrySessionAction(ctx: Ctx): Promise<Res> {
  const s = await ownSession(ctx);
  const form = await ctx.form();
  const kind = form.str('kieu');
  let cfg: SessionConfig = { ...s.config };
  let title = s.title;
  let sessionKind: SessionKind = s.kind;
  if (kind === 'sai') {
    const rows = await ctx.db.many<{ questionId: number }>(sql`
      select question_id from question_responses where practice_session_id = ${s.id} and status in ('incorrect', 'partial')`);
    const ids = rows.map((r) => r.questionId);
    if (!ids.length) return redirect(`/luyen-tap/ket-qua/${s.id}`, { type: 'info', message: 'Không có câu sai để làm lại.' }, ctx);
    cfg = { ...cfg, scope: { questionIds: ids }, count: ids.length, typeCounts: undefined, levelWeights: undefined, levels: [1, 2, 3, 4], types: [...QUESTION_TYPES], order: 'level', balanceAreas: false };
    title = `Làm lại câu sai – ${s.title}`.slice(0, 200);
    sessionKind = 'retry';
  } else if (kind === 'tat-ca') {
    cfg = { ...cfg, scope: { questionIds: s.questionIds }, count: s.questionIds.length, typeCounts: undefined, levelWeights: undefined, levels: [1, 2, 3, 4], types: [...QUESTION_TYPES], balanceAreas: false };
    sessionKind = 'retry';
    title = `Làm lại – ${s.title}`.slice(0, 200);
  }
  const res = await createSession(ctx.db, s.userId, s.textbookId, sessionKind, s.mode, title, cfg);
  if (!res.id) return redirect(`/luyen-tap/ket-qua/${s.id}`, { type: 'error', message: res.error ?? 'Không tạo được lượt mới.' }, ctx);
  return redirect(`/luyen-tap/phien/${res.id}`);
}

// ---------------- Lịch sử, câu hay sai, tiến độ ----------------

export async function historyPage(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx);
  const pg = paging(ctx, 25);
  const { rows, total } = await listSessions(ctx.db, user.id, pg.limit, pg.offset);
  const overall = await ctx.db.one<{ answered: number; correct: number; sessions: number }>(sql`
    select count(*)::int as answered, count(*) filter (where status = 'correct')::int as correct,
      (select count(*)::int from practice_sessions where user_id = ${user.id} and status = 'submitted') as sessions
    from question_responses where user_id = ${user.id} and status <> 'pending'`);
  const wrong = await wrongQuestions(ctx.db, user.id, book.id, 200);
  return page(
    ctx,
    { title: 'Lịch sử luyện tập' },
    <>
      <PageTitle crumbs={[{ href: '/luyen-tap', label: 'Luyện tập' }, { label: 'Lịch sử' }]} title="Lịch sử luyện tập" sub="Chỉ em (và giáo viên lớp em) xem được trang này." actions={<LinkButton href="/luyen-tap/tien-do" variant="secondary">Xem tiến độ và mức thành thạo</LinkButton>} />
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <StatCard label="Lượt đã hoàn thành" value={String(overall?.sessions ?? 0)} />
        <StatCard label="Câu đã trả lời" value={String(overall?.answered ?? 0)} tone="gray" />
        <StatCard label="Tỉ lệ đúng chung" value={`${overall?.answered ? Math.round((overall.correct / overall.answered) * 100) : 0}%`} tone="tre" />
        <a href="/luyen-tap/cau-hay-sai" className="block">
          <StatCard label="Câu cần làm lại" value={String(wrong.length)} tone="le" sub="Bấm để xem" />
        </a>
      </div>
      {rows.length ? (
        <Panel className="overflow-x-auto">
          <table className="data-table min-w-[820px]">
            <thead>
              <tr>
                <th className="w-36">Thời gian</th>
                <th>Lượt luyện tập</th>
                <th className="w-28">Số câu</th>
                <th className="w-28">Đúng</th>
                <th className="w-24">Điểm</th>
                <th className="w-28">Làm trong</th>
                <th className="w-28" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const gradedMax = (r.maxScore ?? 0) - 0;
                const ten = r.status === 'submitted' && gradedMax ? Math.round(((r.score ?? 0) / gradedMax) * 40) / 4 : null;
                return (
                  <tr key={r.id}>
                    <td className="text-[13px]">{formatDate(r.startedAt)}</td>
                    <td className="text-[14px]">
                      <div className="font-semibold">{r.title}</div>
                      <div className="text-[12.5px] text-ink-3">
                        {KIND_LABELS[r.kind]} · {r.mode === 'practice' ? 'Luyện tập' : 'Làm đề'}
                      </div>
                    </td>
                    <td className="text-[14px]">{r.questionIds.length}</td>
                    <td className="text-[14px]">{r.status === 'submitted' ? `${r.correctCount ?? 0}/${r.questionIds.length}` : '–'}</td>
                    <td className="text-[14px] font-semibold">{ten === null ? '–' : ten.toLocaleString('vi-VN')}</td>
                    <td className="text-[13px]">{r.status === 'submitted' ? formatDuration(r.durationSeconds) : <Badge tone="hl">Đang làm</Badge>}</td>
                    <td className="text-right">
                      <a href={r.status === 'submitted' ? `/luyen-tap/ket-qua/${r.id}` : `/luyen-tap/phien/${r.id}`} className={buttonClass('quiet', 'sm')}>
                        {r.status === 'submitted' ? 'Xem lại' : 'Làm tiếp'}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      ) : (
        <EmptyState icon={<LuHistory />} title="Chưa có lượt luyện tập nào" action={<LinkButton href="/luyen-tap">Bắt đầu luyện tập</LinkButton>}>
          Các lượt luyện tập và đề em tạo sẽ được lưu ở đây.
        </EmptyState>
      )}
      <Pager page={pg.page} pages={pg.pages(total)} base="/luyen-tap/lich-su" />
    </>,
  );
}

export async function wrongQuestionsPage(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx);
  const rows = await wrongQuestions(ctx.db, user.id, book.id, 100);
  return page(
    ctx,
    { title: 'Câu hay sai' },
    <>
      <PageTitle
        crumbs={[{ href: '/luyen-tap', label: 'Luyện tập' }, { label: 'Câu hay sai' }]}
        title="Câu hay sai"
        sub="Những câu em từng làm sai và lần gần nhất vẫn chưa đúng. Làm lại đến khi đúng thì câu sẽ rời khỏi danh sách."
        actions={
          rows.length > 0 && (
            <PostForm action="/luyen-tap/cau-hay-sai/lam-lai">
              <Button>
                <LuTarget aria-hidden="true" /> Làm lại {Math.min(20, rows.length)} câu sai nhiều nhất
              </Button>
            </PostForm>
          )
        }
      />
      {rows.length ? (
        <Panel className="overflow-x-auto">
          <table className="data-table min-w-[760px]">
            <thead>
              <tr>
                <th>Câu hỏi</th>
                <th className="w-56">Bài · dạng toán</th>
                <th className="w-24">Số lần sai</th>
                <th className="w-32">Lần gần nhất</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.questionId}>
                  <td className="text-[14px]">
                    <Badge className="mb-1">{TYPE_SHORT[r.type]}</Badge> <Badge tone="gray">{LEVEL_LABELS[r.level]}</Badge>
                    <div>{plainExcerpt(r.stem, 140)}</div>
                  </td>
                  <td className="text-[13px]">
                    {r.lessonTitle ? `${r.lessonNumber ? `Bài ${r.lessonNumber}. ` : ''}${r.lessonTitle}` : '–'}
                    {r.topicTitle && <div className="text-ink-3">{r.topicTitle}</div>}
                  </td>
                  <td className="text-[14px] font-semibold text-le">
                    {r.wrongCount}/{r.attempts}
                  </td>
                  <td className="text-[13px]">{formatDate(r.lastAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      ) : (
        <EmptyState icon={<LuTarget />} title="Không có câu nào cần làm lại" action={<LinkButton href="/luyen-tap">Luyện tập tiếp</LinkButton>}>
          Tuyệt vời! Những câu em làm sai sẽ xuất hiện ở đây để em luyện lại.
        </EmptyState>
      )}
    </>,
  );
}

export async function retryWrongAction(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx);
  const rows = await wrongQuestions(ctx.db, user.id, book.id, 20);
  if (!rows.length) return redirect('/luyen-tap/cau-hay-sai', { type: 'info', message: 'Không có câu sai để làm lại.' }, ctx);
  const ids = rows.map((r) => r.questionId);
  const res = await createSession(ctx.db, user.id, book.id, 'retry', 'practice', 'Làm lại các câu hay sai', {
    scope: { questionIds: ids },
    types: [...QUESTION_TYPES],
    levels: [1, 2, 3, 4],
    count: ids.length,
    order: 'level',
    shuffleOptions: true,
    timeLimit: null,
    scopeLabel: 'Câu hay sai',
  });
  if (!res.id) return redirect('/luyen-tap/cau-hay-sai', { type: 'error', message: res.error ?? 'Không tạo được lượt luyện tập.' }, ctx);
  return redirect(`/luyen-tap/phien/${res.id}`);
}

const MASTERY_TONE: Record<MasteryLevel, 'gray' | 'le' | 'hl' | 'tim' | 'tre'> = { none: 'gray', review: 'le', learning: 'hl', good: 'tim', mastered: 'tre' };

export async function progressPage(ctx: Ctx): Promise<Res> {
  const user = requireUser(ctx);
  const book = await requireBook(ctx);
  const rows = await topicMastery(ctx.db, user.id, book.id);
  const chapters = new Map<number, { code: string; title: string; lessons: Map<number, { title: string; number: number | null; slug: string; topics: typeof rows }> }>();
  for (const r of rows) {
    if (!chapters.has(r.chapterId)) chapters.set(r.chapterId, { code: r.chapterCode, title: r.chapterTitle, lessons: new Map() });
    const ch = chapters.get(r.chapterId)!;
    if (!ch.lessons.has(r.lessonId)) ch.lessons.set(r.lessonId, { title: r.lessonTitle, number: r.lessonNumber, slug: r.lessonSlug, topics: [] });
    ch.lessons.get(r.lessonId)!.topics.push(r);
  }
  const counts = Object.fromEntries((Object.keys(MASTERY_LABELS) as MasteryLevel[]).map((m) => [m, rows.filter((r) => r.mastery === m && r.questionCount > 0).length])) as Record<MasteryLevel, number>;
  return page(
    ctx,
    { title: 'Tiến độ luyện tập' },
    <>
      <PageTitle
        crumbs={[{ href: '/luyen-tap', label: 'Luyện tập' }, { label: 'Tiến độ' }]}
        title="Tiến độ và mức thành thạo"
        sub="Mức thành thạo mỗi dạng toán tính theo 8 lần làm gần nhất: Thành thạo khi đạt từ 85% và đã làm ít nhất 6 câu."
        actions={<LinkButton href="/luyen-tap/lich-su" variant="secondary">Lịch sử luyện tập</LinkButton>}
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(MASTERY_LABELS) as MasteryLevel[]).map((m) => (
          <Badge key={m} tone={MASTERY_TONE[m]}>
            {MASTERY_LABELS[m]}: {counts[m]} dạng
          </Badge>
        ))}
      </div>
      <div className="space-y-6">
        {[...chapters.entries()].map(([cid, ch]) => {
          const all = [...ch.lessons.values()].flatMap((l) => l.topics);
          const totalQ = all.reduce((s, t) => s + t.questionCount, 0);
          const doneQ = all.reduce((s, t) => s + Math.min(t.distinctCorrect, t.questionCount), 0);
          return (
            <Panel key={cid} className="p-5">
              <details>
                <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
                  <span className="font-extrabold">
                    Chương {ch.code}. {ch.title}
                  </span>
                  <span className="w-full max-w-xs">
                    <ProgressBar value={totalQ ? Math.round((doneQ / totalQ) * 100) : 0} tone="tre" label={`${doneQ}/${totalQ} câu đã làm đúng`} />
                  </span>
                </summary>
                <div className="mt-4 space-y-4">
                  {[...ch.lessons.entries()].map(([lid, l]) => (
                    <div key={lid}>
                      <h3 className="text-[15px] font-bold">{l.number ? `Bài ${l.number}. ` : ''}{l.title}</h3>
                      <ul className="mt-2 divide-y divide-line rounded-xl border border-line">
                        {l.topics.map((t) => (
                          <li key={t.topicId} className="flex flex-wrap items-center gap-3 px-3 py-2.5 text-[14px]">
                            <a href={`/hoc/${book.slug}/bai/${l.slug}/dang/${topicKey({ id: t.topicId, slug: t.topicSlug })}`} className="min-w-0 flex-1 hover:text-tim-700">
                              {t.topicTitle}
                            </a>
                            <span className="text-[12.5px] text-ink-3">
                              {t.answered ? `${Math.round((t.recent ?? 0) * 100)}% gần đây · ${t.answered} lần làm` : `${t.questionCount} câu`}
                            </span>
                            <Badge tone={MASTERY_TONE[t.mastery]}>{MASTERY_LABELS[t.mastery]}</Badge>
                            {t.questionCount > 0 && (
                              <PostForm action="/luyen-tap/tao" className="inline">
                                <input type="hidden" name="kieu" value="dang" />
                                <input type="hidden" name="dang" value={t.topicId} />
                                <input type="hidden" name="nhanh" value="1" />
                                <button className={buttonClass('quiet', 'sm')}>Luyện</button>
                              </PostForm>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            </Panel>
          );
        })}
      </div>
    </>,
  );
}

// ---------------- Đường dẫn cũ → trang mới ----------------

export async function practiceLesson(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const lesson = await getLessonBySlug(ctx.db, book.id, ctx.params.slug);
  if (!lesson || lesson.status !== 'published') throw new HttpError(404, 'Không tìm thấy bài học.');
  return redirect(`/luyen-tap?kieu=bai&bai=${lesson.id}`);
}

export async function practiceChapter(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const chapter = await getChapterByCode(ctx.db, book.id, ctx.params.code);
  if (!chapter) throw new HttpError(404, 'Không tìm thấy chương.');
  return redirect(`/luyen-tap?kieu=chuong&chuong=${chapter.id}`);
}

/** Trang bắt đầu luyện một dạng toán: nhắc kiến thức cần nhớ, chọn số câu rồi bắt đầu. */
export async function practiceTopic(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const topic = await getTopicById(ctx.db, intParam(ctx, 'id'));
  const lesson = topic ? await getLessonById(ctx.db, topic.lessonId) : null;
  if (!topic || !lesson || lesson.textbookId !== book.id || topic.status !== 'published' || lesson.status !== 'published') throw new HttpError(404, 'Không tìm thấy dạng toán.');
  const back = `/hoc/${book.slug}/bai/${lesson.slug}/dang/${topicKey(topic)}`;
  const counts = await ctx.db.many<{ level: number; n: number }>(sql`
    select level, count(*)::int as n from questions where topic_id = ${topic.id} and status = 'published' group by level order by level`);
  const n = counts.reduce((s, c) => s + c.n, 0);
  return page(
    ctx,
    { title: `Luyện dạng: ${topic.title}` },
    <div className="mx-auto max-w-3xl">
      <PageTitle crumbs={[{ href: '/luyen-tap', label: 'Luyện tập' }, { href: back, label: topic.title }, { label: 'Luyện tập' }]} title={`Luyện dạng: ${topic.title}`} sub={`${lessonLabel(lesson)} · ${n} câu, sắp từ cơ bản đến nâng cao`} />
      <Panel className="p-5 md:p-7">
        <h2 className="text-lg font-extrabold">Kiến thức cần nhớ</h2>
        {topic.knowledge ? <Html className="prose-math mt-2 text-[15.5px]" html={renderRich(topic.knowledge)} /> : <p className="mt-2 text-ink-3">Xem lại bài học trước khi làm.</p>}
        {topic.steps && (
          <>
            <h3 className="mt-4 text-[15px] font-bold">Các bước giải</h3>
            <Html className="prose-math mt-1 text-[15.5px]" html={renderRich(topic.steps)} />
          </>
        )}
        <a href={back} className="mt-3 inline-block font-semibold text-tim-700 underline underline-offset-2">
          Xem phương pháp và ví dụ minh họa đầy đủ
        </a>
        <div className="mt-4 flex flex-wrap gap-2 text-[13px]">
          {counts.map((c) => (
            <Badge key={c.level} tone="gray">
              {LEVEL_LABELS[c.level]}: {c.n} câu
            </Badge>
          ))}
        </div>
      </Panel>
      {ctx.user ? (
        <Panel className="mt-5 p-5 md:p-7">
          <PostForm action="/luyen-tap/tao" className="space-y-5">
            <input type="hidden" name="kieu" value="dang" />
            <input type="hidden" name="dang" value={topic.id} />
            <CommonOptions tab="dang" types={[...QUESTION_TYPES]} count={Math.min(10, Math.max(5, n))} />
            <Button size="lg" disabled={!n}>
              Bắt đầu luyện dạng này
            </Button>
          </PostForm>
        </Panel>
      ) : (
        <Notice tone="info" className="mt-5">
          <a className="font-semibold underline" href={`/dang-nhap?next=${encodeURIComponent(ctx.path)}`}>
            Đăng nhập
          </a>{' '}
          để luyện tập và lưu kết quả.
        </Notice>
      )}
    </div>,
  );
}

export async function chapterTestPage(ctx: Ctx): Promise<Res> {
  const book = await requireBook(ctx);
  const chapter = await getChapterByCode(ctx.db, book.id, ctx.params.code);
  if (!chapter || chapter.status !== 'published' || chapter.kind !== 'chapter') throw new HttpError(404, 'Không tìm thấy chương.');
  requireUser(ctx);
  const label = chapterLabel(chapter);
  const back = `/hoc/${book.slug}/chuong/${encodeURIComponent(chapter.code)}`;
  return page(
    ctx,
    { title: `Kiểm tra cuối chương: ${label}` },
    <div className="mx-auto max-w-3xl">
      <PageTitle crumbs={[{ href: back, label }, { label: 'Kiểm tra cuối chương' }]} title={`Kiểm tra cuối chương: ${label}`} />
      <Panel className="p-6">
        <ul className="list-disc space-y-1 pl-5 text-[15.5px]">
          <li>10 câu chấm tự động (trắc nghiệm, Đúng/Sai, trả lời ngắn), xếp từ dễ đến khó: 4 nhận biết, 3 thông hiểu, 2 vận dụng, 1 vận dụng cao.</li>
          <li>Thời gian 20 phút, hết giờ bài tự nộp. Phương án trắc nghiệm được đảo thứ tự.</li>
          <li>Nộp bài xong em xem điểm, kết quả theo dạng toán, lời giải và kiến thức cần ôn.</li>
        </ul>
        <PostForm action="/luyen-tap/tao" className="mt-5">
          <input type="hidden" name="kieu" value="cuoi-chuong" />
          <input type="hidden" name="chuong" value={chapter.id} />
          <Button size="lg">Bắt đầu làm bài</Button>
        </PostForm>
      </Panel>
    </div>,
  );
}

export async function challengePage(ctx: Ctx): Promise<Res> {
  await requireBook(ctx);
  return page(
    ctx,
    { title: 'Thử thách Toán học' },
    <div className="mx-auto max-w-3xl">
      <PageTitle crumbs={[{ href: '/luyen-tap', label: 'Luyện tập' }, { label: 'Thử thách' }]} title="Thử thách Toán học" sub="5 câu mức vận dụng – vận dụng cao, chọn ngẫu nhiên trong cả chương trình. Mỗi câu đúng lần đầu được 20 XP." />
      <Panel className="p-6">
        {ctx.user ? (
          <PostForm action="/luyen-tap/tao">
            <input type="hidden" name="kieu" value="thu-thach" />
            <Button size="lg">
              <LuRocket aria-hidden="true" /> Nhận thử thách
            </Button>
          </PostForm>
        ) : (
          <LinkButton href="/dang-nhap?next=/thu-thach">Đăng nhập để nhận thử thách</LinkButton>
        )}
      </Panel>
    </div>,
  );
}

/** API cũ: chấm một câu ngoài phiên (giữ để tương thích). */
export async function practiceAnswerApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ error: 'Phiên đăng nhập đã hết. Hãy đăng nhập lại.' }, 401);
  const body = (await ctx.json()) as { questionId?: unknown; response?: unknown; context?: unknown };
  const qid = Number(body.questionId);
  if (!Number.isInteger(qid) || qid <= 0) return json({ error: 'Thiếu mã câu hỏi.' }, 400);
  const context = body.context === 'challenge' ? 'challenge' : 'practice';
  try {
    return json(await submitPracticeAnswer(ctx.db, ctx.user.id, qid, body.response, context));
  } catch (err) {
    if (err instanceof PracticeError) return json({ error: err.message }, 422);
    throw err;
  }
}

/** Học sinh tải ảnh bài làm tự luận (chụp vở). */
export async function uploadResponseImageApi(ctx: Ctx): Promise<Res> {
  if (!ctx.user) return json({ error: 'Phiên đăng nhập đã hết. Hãy đăng nhập lại.' }, 401);
  const file = (await ctx.files()).find((f) => f.field === 'file');
  if (!file || !file.data.length) return json({ error: 'Chưa chọn ảnh.' }, 400);
  if (file.data.length > 3 * 1024 * 1024) return json({ error: 'Ảnh lớn hơn 3 MB.' }, 413);
  const mime = sniffImage(file.data);
  if (!mime) return json({ error: 'Chỉ nhận ảnh PNG, JPEG hoặc WebP.' }, 415);
  const recent = await ctx.db.one<{ n: number }>(sql`
    select count(*)::int as n from images where created_by = ${ctx.user.id} and purpose = 'response' and created_at > now() - interval '1 hour'`);
  if ((recent?.n ?? 0) >= 40) return json({ error: 'Em đã tải quá nhiều ảnh trong một giờ. Thử lại sau.' }, 429);
  const row = await ctx.db.one<{ id: number }>(sql`
    insert into images (kind, mime, data, byte_size, alt, created_by, is_public, purpose)
    values ('upload', ${mime}, ${file.data}, ${file.data.length}, 'Ảnh bài làm', ${ctx.user.id}, false, 'response') returning id`);
  return json({ id: row!.id });
}

export async function mediaFile(ctx: Ctx): Promise<Res> {
  const id = intParam(ctx, 'id');
  const img = await ctx.db.one<{ mime: string; data: Buffer; isPublic: boolean; purpose: string; createdBy: string | null }>(sql`
    select mime, data, is_public, purpose, created_by from images where id = ${id} and kind = 'upload'`);
  if (!img) throw new HttpError(404);
  // Ảnh bài học công khai; ảnh câu hỏi cần đăng nhập; ảnh bài làm chỉ chủ bài và giáo viên xem được.
  if (!img.isPublic) {
    const user = requireUser(ctx);
    if (img.purpose === 'response' && img.createdBy !== user.id && user.role === 'student') throw new HttpError(404);
  }
  return { type: 'bytes', status: 200, contentType: img.mime, body: img.data, cacheSeconds: 86400 };
}
