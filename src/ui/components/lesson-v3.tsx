/**
 * Bài học trực tuyến (giai đoạn 3) – dùng chung cho bản máy chủ và bản HTML:
 * Giới thiệu bài học · Khám phá kiến thức mới · Công thức cần nhớ · Ví dụ minh họa từng bước · Hướng dẫn giải các dạng toán.
 * Phần tương tác (xem lời giải từng bước, lọc công thức, yêu thích, ghi chú) gắn bằng JavaScript nhỏ ở trình duyệt;
 * khi không có JavaScript, mọi nội dung vẫn đọc được.
 */
import type { ReactNode } from 'react';
import { Badge, Html, Panel, Rich, buttonClass, cx } from './ui';
import { LevelBadges, ThemeList } from './knowledge';
import { renderMath } from '../../shared/richtext';
import { foldVi } from '../../shared/search';
import { SECTION_LABELS } from '../../shared/labels';
import type { LessonSection } from '../../domain/curriculum';
import type { FormulaCardRow, WorkedExampleRow } from '../../domain/lesson-content';
import type { ThemeNode, TopicNode } from '../../domain/knowledge';

export const LESSON_TOC = [
  { id: 'gioi-thieu', label: 'Giới thiệu bài học' },
  { id: 'kham-pha', label: 'Khám phá kiến thức mới' },
  { id: 'cong-thuc', label: 'Công thức cần nhớ' },
  { id: 'vi-du', label: 'Ví dụ minh họa' },
  { id: 'dang-toan', label: 'Hướng dẫn giải các dạng toán' },
  { id: 'bai-tap', label: 'Luyện tập' },
  { id: 'ghi-chu', label: 'Ghi chú của em' },
] as const;

export type TocId = (typeof LESSON_TOC)[number]['id'];

/** Mục lục nội dung bài học (thanh bên trên máy tính, dải chip trên điện thoại). */
export function LessonToc({ ids, variant }: { ids: TocId[]; variant: 'side' | 'chips' }) {
  const items = LESSON_TOC.filter((t) => ids.includes(t.id));
  if (variant === 'chips')
    return (
      <nav aria-label="Mục lục bài học" className="no-print -mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
        {items.map((t, i) => (
          <a key={t.id} href={`#${t.id}`} className="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[13.5px] font-medium text-ink-2 hover:border-tim-300 hover:text-tim-800">
            {i + 1}. {t.label}
          </a>
        ))}
      </nav>
    );
  return (
    <nav aria-label="Mục lục bài học" className="px-2 pb-3" data-toc>
      <div className="mb-1 text-[12px] font-bold uppercase tracking-wide text-ink-3">Mục lục bài học</div>
      <ol className="space-y-0.5">
        {items.map((t, i) => (
          <li key={t.id}>
            <a href={`#${t.id}`} data-toc-link={t.id} className="flex gap-2 rounded-lg px-2 py-1 text-[13.5px] text-ink-2 hover:bg-tim-50 hover:text-tim-800">
              <span className="w-4 shrink-0 text-right text-ink-3">{i + 1}</span> {t.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function SectionTitle({ id, n, children, sub }: { id: string; n?: number; children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="mb-4">
      <h2 id={id} className="scroll-mt-24 text-[22px] font-extrabold tracking-tight">
        {n !== undefined && <span className="mr-2 text-tim-400">{n}.</span>}
        {children}
      </h2>
      {sub && <p className="mt-1 text-[14.5px] text-ink-3">{sub}</p>}
    </div>
  );
}

// ---------------- 1. Giới thiệu bài học ----------------

export interface IntroData {
  title: string;
  position: string;
  objectives: string | null;
  concepts: string | null;
  prerequisites: string | null;
  applications: string | null;
}

export function LessonIntro({ d, n }: { d: IntroData; n: number }) {
  const rows: [string, string | null][] = [
    ['Mục tiêu cần đạt', d.objectives],
    ['Những kiến thức em cần nắm', d.concepts],
    ['Kiến thức nền cần ôn trước khi học', d.prerequisites],
    ['Ứng dụng thực tế', d.applications],
  ];
  return (
    <section aria-labelledby="gioi-thieu">
      <SectionTitle id="gioi-thieu" n={n} sub={d.position}>
        Giới thiệu bài học
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {rows
          .filter(([, v]) => v && v.trim())
          .map(([label, v], i) => (
            <div
              key={label}
              className={cx(
                'rounded-2xl px-5 py-4',
                i === 0 ? 'border-l-4 border-tim-700 bg-tim-50 md:col-span-2' : label === 'Ứng dụng thực tế' ? 'border border-tre/25 bg-tre-soft/40 md:col-span-2' : 'border border-line bg-white',
              )}
            >
              <h3 className="mb-1.5 text-[15px] font-extrabold text-tim-800">{label}</h3>
              <Rich src={v!} className="text-[15.5px]" />
            </div>
          ))}
      </div>
    </section>
  );
}

// ---------------- 2. Khám phá kiến thức mới ----------------

const KIND_TONE: Record<string, string> = {
  definition: 'bg-tim-700 text-white',
  concept: 'bg-tim-100 text-tim-800',
  theorem: 'bg-[#1d3f75] text-white',
  property: 'bg-tre-soft text-tre',
  rule: 'bg-cam-soft text-cam',
  formula: 'bg-tim-50 text-tim-700',
  special: 'bg-hl-soft text-ink',
  condition: 'bg-le-soft text-le',
  note: 'bg-hl-soft text-ink',
  knowledge: 'bg-tim-50 text-tim-700',
};

export function TheoryCard({ s }: { s: LessonSection }) {
  const isNote = s.kind === 'note' || s.kind === 'condition';
  return (
    <article id={`kt-${s.id}`} className={cx('scroll-mt-24 rounded-[20px] border px-5 py-5 md:px-6', isNote ? 'border-hl bg-hl-soft/60' : 'border-line bg-white')}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className={cx('rounded-md px-2 py-0.5 text-[12px] font-bold uppercase tracking-wide', KIND_TONE[s.kind] ?? KIND_TONE.knowledge)}>{SECTION_LABELS[s.kind] ?? 'Kiến thức'}</span>
        {s.status !== 'published' && <Badge tone="gray">Đang ẩn</Badge>}
      </div>
      {s.title && <h3 className="mb-2 text-[19px] font-extrabold leading-snug">{s.title}</h3>}
      <Rich src={s.body} className="text-[16.5px]" />
      {s.formula && (
        <div className="formula-frame isolate mt-4 px-5 py-3">
          <Rich src={/\\[\[(]/.test(s.formula) ? s.formula : `\\[${s.formula}\\]`} className="text-[17px]" />
        </div>
      )}
      {s.example && (
        <div className="mt-4 rounded-xl border border-dashed border-tim-200 bg-tim-50/50 px-4 py-3">
          <div className="mb-1 text-[13px] font-bold uppercase tracking-wide text-tim-700">Ví dụ</div>
          <Rich src={s.example} className="text-[15.5px]" />
        </div>
      )}
      {s.solution && (
        <details className="mt-3 rounded-xl bg-mist px-4 py-3">
          <summary className="cursor-pointer font-semibold text-tim-800">Xem lời giải</summary>
          <Rich src={s.solution} className="mt-2 text-[16px]" />
        </details>
      )}
    </article>
  );
}

export function TheorySection({ sections, n, empty }: { sections: LessonSection[]; n: number; empty?: ReactNode }) {
  const items = sections.filter((s) => s.kind !== 'objective' && s.kind !== 'example');
  return (
    <section aria-labelledby="kham-pha">
      <SectionTitle id="kham-pha" n={n} sub="Khái niệm, định nghĩa, tính chất, định lí, quy tắc – mỗi mục có giải thích, công thức và ví dụ ngắn.">
        Khám phá kiến thức mới
      </SectionTitle>
      {items.length ? <div className="space-y-5">{items.map((s) => <TheoryCard key={s.id} s={s} />)}</div> : empty}
    </section>
  );
}

// ---------------- 3. Công thức cần nhớ ----------------

export function FormulaCard({ f, fav, context }: { f: FormulaCardRow; fav?: ReactNode; context?: ReactNode }) {
  const text = foldVi(`${f.name} ${f.groupTitle} ${f.tex} ${f.symbols ?? ''}`);
  return (
    <article id={`ct-${f.id}`} data-formula={f.id} data-formula-text={text} className="formula-card scroll-mt-24 rounded-[20px] border border-line bg-white p-5">
      <div className="mb-2 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          {context && <div className="text-[12.5px] text-ink-3">{context}</div>}
          <h4 className="text-[16px] font-extrabold leading-snug text-tim-800">{f.name}</h4>
        </div>
        {fav}
      </div>
      <div className="formula-frame isolate overflow-x-auto px-4 py-3">
        <Html html={renderMath(f.tex, true)} className="text-[18px]" />
      </div>
      <dl className="mt-3 space-y-2 text-[14.5px]">
        {f.symbols && (
          <div>
            <dt className="font-bold text-ink">Kí hiệu</dt>
            <dd className="text-ink-2">
              <Rich src={f.symbols} />
            </dd>
          </div>
        )}
        {f.condition && (
          <div>
            <dt className="font-bold text-le">Điều kiện sử dụng</dt>
            <dd className="text-ink-2">
              <Rich src={f.condition} />
            </dd>
          </div>
        )}
        {f.example && (
          <div className="rounded-xl bg-tre-soft/60 px-3 py-2">
            <dt className="font-bold text-tre">Ví dụ áp dụng</dt>
            <dd className="text-ink">
              <Rich src={f.example} />
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}

/** Nhóm công thức theo chủ đề (tiêu đề nhóm). */
export function groupFormulas<T extends FormulaCardRow>(formulas: T[]): { group: string; items: T[] }[] {
  const out: { group: string; items: T[] }[] = [];
  for (const f of formulas) {
    const g = out.find((x) => x.group === f.groupTitle);
    if (g) g.items.push(f);
    else out.push({ group: f.groupTitle, items: [f] });
  }
  return out;
}

export function FormulaSection({ formulas, n, fav, allHref }: { formulas: FormulaCardRow[]; n: number; fav?: (f: FormulaCardRow) => ReactNode; allHref: string }) {
  return (
    <section aria-labelledby="cong-thuc" className="rounded-[24px] bg-tim-50/60 p-4 ring-1 ring-tim-100 md:p-6">
      <SectionTitle id="cong-thuc" n={n} sub="Công thức của bài, chia theo chủ đề; có ý nghĩa kí hiệu, điều kiện sử dụng và ví dụ áp dụng. Bấm ☆ để lưu công thức hay dùng.">
        CÔNG THỨC CẦN NHỚ
      </SectionTitle>
      <div className="space-y-6">
        {groupFormulas(formulas).map((g) => (
          <div key={g.group}>
            {g.group && <h3 className="mb-3 text-[16px] font-extrabold text-ink">{g.group}</h3>}
            <div className="grid gap-4 md:grid-cols-2">
              {g.items.map((f) => (
                <FormulaCard key={f.id} f={f} fav={fav?.(f)} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <a href={allHref} className="mt-5 inline-block text-[14.5px] font-semibold text-tim-700 hover:underline">
        Xem nhanh tất cả công thức Toán 8 →
      </a>
    </section>
  );
}

// ---------------- 4. Ví dụ minh họa từng bước ----------------

export function WorkedExample({ e, index, viewed, topicLink }: { e: WorkedExampleRow; index: number; viewed?: boolean; topicLink?: ReactNode }) {
  return (
    <article id={`vd-${e.id}`} data-example={e.id} className="worked-example scroll-mt-24 rounded-[20px] border border-line bg-white p-5 md:p-6">
      <header className="mb-2 flex flex-wrap items-center gap-2">
        <strong className="text-[16px] text-tim-700">Ví dụ {index}</strong>
        <LevelBadges levels={[e.level]} full />
        {e.status !== 'published' && <Badge tone="gray">Đang ẩn</Badge>}
        <span data-viewed-badge hidden={!viewed} className="rounded-md bg-tre-soft px-1.5 text-[11.5px] font-bold leading-5 text-tre">
          Đã xem lời giải
        </span>
        {topicLink && <span className="ml-auto text-[13px]">{topicLink}</span>}
      </header>
      <div className="ex-problem">
        <Rich src={e.problem} className="text-[16.5px]" />
      </div>
      {e.figure && (
        <div className="mt-3">
          <Rich src={`[hinh]\n${e.figure}\n[/hinh]`} />
        </div>
      )}
      {(e.given || e.toProve) && (
        <table className="gtkl mt-3 w-full max-w-xl text-[15px]">
          <tbody>
            {e.given && (
              <tr>
                <th className="w-12 align-top">GT</th>
                <td>
                  <Rich src={e.given} />
                </td>
              </tr>
            )}
            {e.toProve && (
              <tr>
                <th className="align-top">KL</th>
                <td>
                  <Rich src={e.toProve} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {(e.analysis || e.knowledge) && (
        <details className="ex-think mt-4 rounded-xl border border-tim-100 bg-tim-50/60 px-4 py-3">
          <summary className="cursor-pointer font-semibold text-tim-800">Phân tích đề và kiến thức cần dùng</summary>
          {e.analysis && (
            <div className="mt-2">
              <div className="text-[13px] font-bold uppercase tracking-wide text-tim-700">Phân tích đề bài</div>
              <Rich src={e.analysis} className="text-[15.5px]" />
            </div>
          )}
          {e.knowledge && (
            <div className="mt-3">
              <div className="text-[13px] font-bold uppercase tracking-wide text-tim-700">Kiến thức sử dụng</div>
              <Rich src={e.knowledge} className="text-[15.5px]" />
            </div>
          )}
        </details>
      )}
      <details className="ex-solution mt-3 rounded-xl bg-mist px-4 py-3" data-steps-root>
        <summary className="cursor-pointer font-semibold text-tim-800">Lời giải từng bước ({e.steps.length} bước)</summary>
        <ol className="ex-steps mt-3 space-y-2">
          {e.steps.map((s, i) => (
            <li key={i} data-step={i + 1} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tim-700 text-[12.5px] font-bold text-white">{i + 1}</span>
              <Rich src={s} className="min-w-0 flex-1 text-[16px]" />
            </li>
          ))}
        </ol>
        <div data-step-controls className="no-print mt-3 flex flex-wrap gap-2">
          <button type="button" data-step-next hidden className={buttonClass('primary', 'sm')}>
            Bước tiếp theo
          </button>
          <button type="button" data-step-all hidden className={buttonClass('secondary', 'sm')}>
            Xem toàn bộ lời giải
          </button>
          <button type="button" data-step-reset hidden className={buttonClass('quiet', 'sm')}>
            Ẩn lại để tự làm
          </button>
        </div>
        {e.answer && (
          <div data-after-steps className="mt-3 rounded-xl border-l-4 border-tre bg-white px-4 py-2.5">
            <span className="font-bold text-tre">Kết luận: </span>
            <Rich src={e.answer} inline className="text-[16px]" />
          </div>
        )}
        {e.tip && (
          <div data-after-steps className="mt-2 rounded-xl border-l-4 border-hl bg-white px-4 py-2.5">
            <span className="font-bold">Nhận xét – mẹo: </span>
            <Rich src={e.tip} inline className="text-[15.5px]" />
          </div>
        )}
      </details>
    </article>
  );
}

export interface TopicExamples {
  topic: { id: number; slug: string | null; title: string; levels: number[] };
  href: string;
  examples: WorkedExampleRow[];
}

export function ExamplesSection({ groups, n, viewed }: { groups: TopicExamples[]; n: number; viewed?: Set<number> }) {
  const total = groups.reduce((k, g) => k + g.examples.length, 0);
  return (
    <section aria-labelledby="vi-du">
      <SectionTitle id="vi-du" n={n} sub={`${total} ví dụ, xếp theo dạng toán và mức độ từ dễ đến khó. Mở "Lời giải từng bước" và tự nghĩ trước mỗi bước.`}>
        Ví dụ minh họa
      </SectionTitle>
      {groups.length > 1 && (
        <nav aria-label="Chọn dạng toán" className="no-print mb-5 flex flex-wrap gap-2" data-ex-chips>
          <a href="#vi-du" data-ex-chip="all" className="ex-chip ex-chip-on">
            Tất cả dạng ({total})
          </a>
          {groups.map((g, i) => (
            <a key={g.topic.id} href={`#vdg-${g.topic.id}`} data-ex-chip={g.topic.id} className="ex-chip">
              Dạng {i + 1}. {g.topic.title} ({g.examples.length})
            </a>
          ))}
        </nav>
      )}
      <div className="space-y-8">
        {groups.map((g) => (
          <div key={g.topic.id} id={`vdg-${g.topic.id}`} data-ex-group={g.topic.id} className="scroll-mt-24">
            <h3 className="mb-3 flex flex-wrap items-baseline gap-2 text-[17px] font-extrabold">
              <a href={g.href} className="hover:text-tim-700 hover:underline">
                {g.topic.title}
              </a>
              <a href={g.href} className="text-[13px] font-semibold text-tim-600 hover:underline">
                Phương pháp, lỗi sai, bài tập tự luyện →
              </a>
            </h3>
            <div className="space-y-4">
              {g.examples.map((e, i) => (
                <WorkedExample key={e.id} e={e} index={i + 1} viewed={viewed?.has(e.id)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- 5. Hướng dẫn giải các dạng toán ----------------

export function TopicGuideSection({ themes, topicHref, n }: { themes: ThemeNode[]; topicHref: (t: TopicNode) => string; n: number }) {
  return (
    <section aria-labelledby="dang-toan">
      <SectionTitle id="dang-toan" n={n} sub="Mỗi dạng có dấu hiệu nhận biết, kiến thức sử dụng, phương pháp, các bước giải, lưu ý, lỗi sai thường gặp, ví dụ và bài tập tự luyện.">
        Hướng dẫn giải các dạng toán
      </SectionTitle>
      <ThemeList themes={themes} topicHref={topicHref} />
    </section>
  );
}

/** Ví dụ trong mẫu cũ (mục "ví dụ" của bài, giai đoạn 1) – vẫn hiển thị nếu giáo viên giữ lại. */
export function LegacyExamples({ sections }: { sections: LessonSection[] }) {
  const examples = sections.filter((s) => s.kind === 'example');
  if (!examples.length) return null;
  return (
    <div className="space-y-4">
      {examples.map((s, i) => (
        <Panel key={s.id} className="p-5">
          <div className="mb-1 text-[14px] font-bold text-tim-700">
            Ví dụ {i + 1}
            {s.title ? `. ${s.title}` : ''}
          </div>
          <Rich src={s.body} className="text-[16.5px]" />
          {s.solution && (
            <details className="mt-3 rounded-xl bg-mist px-4 py-3">
              <summary className="font-semibold text-tim-800">Xem lời giải</summary>
              <Rich src={s.solution} className="mt-2 text-[16px]" />
            </details>
          )}
        </Panel>
      ))}
    </div>
  );
}

export function NotesBlock({ children, n }: { children: ReactNode; n: number }) {
  return (
    <section aria-labelledby="ghi-chu" className="no-print">
      <SectionTitle id="ghi-chu" n={n} sub="Ghi lại điều em thấy quan trọng, chỗ còn chưa hiểu để hỏi thầy cô. Chỉ mình em thấy ghi chú này.">
        Ghi chú của em
      </SectionTitle>
      {children}
    </section>
  );
}
