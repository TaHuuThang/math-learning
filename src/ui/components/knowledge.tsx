/**
 * Thành phần giao diện của bản đồ kiến thức – dùng chung cho bản máy chủ và bản HTML ngoại tuyến
 * (mọi đường dẫn truyền vào từ bên ngoài).
 */
import type { ReactNode } from 'react';
import { LuCircleAlert, LuCompass, LuListChecks, LuRoute, LuSearch, LuSigma, LuTriangleAlert } from 'react-icons/lu';
import { Badge, Panel, Rich, cx } from './ui';
import { DIFFICULTY_LABELS, LEVEL_LABELS, LEVEL_SHORT, VERIFY_LABELS, type Level, type ThemeNode, type TopicNode, type VerifyStatus } from '../../domain/knowledge';
import { TYPE_LABELS } from '../../shared/labels';
import { QUESTION_TYPES, type QuestionType } from '../../shared/grading';

const LEVEL_TONE: Record<Level, string> = {
  1: 'border-tre/40 bg-tre-soft text-[#24613d]',
  2: 'border-tim-200 bg-tim-50 text-tim-800',
  3: 'border-hl bg-hl-soft text-[#7a5a00]',
  4: 'border-le/40 bg-le-soft text-[#a3262f]',
};

export function LevelBadges({ levels, full }: { levels: Level[]; full?: boolean }) {
  if (!levels.length) return null;
  return (
    <span className="inline-flex flex-wrap gap-1" aria-label={`Mức độ: ${levels.map((l) => LEVEL_LABELS[l]).join(', ')}`}>
      {levels.map((l) => (
        <span key={l} title={LEVEL_LABELS[l]} className={cx('rounded-md border px-1.5 text-[11.5px] font-bold leading-5', LEVEL_TONE[l])}>
          {full ? LEVEL_LABELS[l] : LEVEL_SHORT[l]}
        </span>
      ))}
    </span>
  );
}

export function VerifyBadge({ status, note }: { status: VerifyStatus; note?: string | null }) {
  if (status === 'verified') return <Badge tone="tre">{VERIFY_LABELS.verified}</Badge>;
  return (
    <span title={note ?? undefined}>
      <Badge tone={status === 'needs_review' ? 'cam' : 'gray'}>{VERIFY_LABELS[status]}</Badge>
    </span>
  );
}

export function DifficultyBadge({ level }: { level: Level | null }) {
  if (!level) return null;
  return <Badge tone="gray">Mức khó: {DIFFICULTY_LABELS[level]}</Badge>;
}

/** Danh sách chủ đề → dạng toán của một bài. */
export function ThemeList({ themes, topicHref, compact }: { themes: ThemeNode[]; topicHref: (t: TopicNode) => string; compact?: boolean }) {
  let n = 0;
  return (
    <ol className={cx('space-y-4', compact && 'space-y-3')}>
      {themes.map((th, i) => (
        <li key={th.id || `khac-${i}`} className="rounded-2xl border border-line bg-white">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line px-4 py-3">
            <span className="text-[12px] font-bold uppercase tracking-wide text-tim-500">Chủ đề {th.id ? i + 1 : ''}</span>
            <span className="font-bold">{th.title}</span>
            {th.status === 'draft' && <Badge tone="gray">Đang ẩn</Badge>}
            {!compact && th.description && <span className="basis-full text-[13.5px] text-ink-3">{th.description}</span>}
          </div>
          {th.topics.length ? (
            <ul className="divide-y divide-line">
              {th.topics.map((t) => {
                n++;
                return (
                  <li key={t.id}>
                    <a href={topicHref(t)} className="group flex items-center gap-3 px-4 py-2.5 hover:bg-tim-50/70">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-tim-700 text-[13px] font-bold text-white">{n}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold group-hover:text-tim-800 group-hover:underline">{t.title}</span>
                        {!compact && t.method && <span className="line-clamp-1 block text-[13px] text-ink-3">{t.method}</span>}
                      </span>
                      <LevelBadges levels={t.levels} />
                      {t.status === 'draft' && <Badge tone="gray">Ẩn</Badge>}
                      <span className="hidden w-16 shrink-0 text-right text-[12.5px] text-ink-3 sm:block">{t.questionCount} bài tập</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-3 text-[14px] text-ink-3">Chủ đề chưa có dạng toán.</p>
          )}
        </li>
      ))}
    </ol>
  );
}

function Block({ icon, title, children, tone = 'plain', id }: { icon: ReactNode; title: string; children: ReactNode; tone?: 'plain' | 'warn' | 'tim'; id?: string }) {
  return (
    <section aria-labelledby={id} className={cx('rounded-2xl border px-5 py-4', tone === 'warn' ? 'border-hl bg-hl-soft' : tone === 'tim' ? 'border-tim-200 bg-tim-50' : 'border-line bg-white')}>
      <h2 id={id} className="mb-2 flex items-center gap-2 text-[17px] font-extrabold">
        <span className={tone === 'warn' ? 'text-[#a8781a]' : 'text-tim-600'} aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export interface TopicContent {
  knowledge: string | null;
  signs: string | null;
  method: string | null;
  steps: string | null;
  mistakes: string | null;
  example: string | null;
  exampleSolution: string | null;
}

/** Nội dung một dạng toán: kiến thức, dấu hiệu, phương pháp, các bước, lỗi sai, ví dụ. */
export function TopicArticle({ t }: { t: TopicContent }) {
  const empty = !t.knowledge && !t.signs && !t.method && !t.steps && !t.example;
  return (
    <div className="space-y-4">
      {empty && <p className="rounded-2xl border border-dashed border-line-2 px-5 py-4 text-[15px] text-ink-3">Nội dung của dạng toán này đang được biên soạn.</p>}
      {t.knowledge && (
        <Block icon={<LuCompass />} title="Kiến thức sử dụng" id="kien-thuc-su-dung" tone="tim">
          <Rich src={t.knowledge} className="text-[16px]" />
        </Block>
      )}
      {t.signs && (
        <Block icon={<LuSearch />} title="Dấu hiệu nhận biết" id="dau-hieu">
          <Rich src={t.signs} className="text-[16px]" />
        </Block>
      )}
      {(t.method || t.steps) && (
        <Block icon={<LuRoute />} title="Phương pháp giải" id="phuong-phap">
          {t.method && <Rich src={t.method} className="text-[16px]" />}
          {t.steps && (
            <div className="mt-3 rounded-xl bg-mist px-4 py-3">
              <div className="mb-1 flex items-center gap-1.5 text-[14px] font-bold text-tim-700">
                <LuListChecks aria-hidden="true" /> Các bước giải
              </div>
              <Rich src={t.steps} className="text-[15.5px]" />
            </div>
          )}
        </Block>
      )}
      {t.mistakes && (
        <Block icon={<LuTriangleAlert />} title="Lỗi sai thường gặp" id="loi-sai" tone="warn">
          <Rich src={t.mistakes} className="text-[15.5px]" />
        </Block>
      )}
      {t.example && (
        <Block icon={<LuSigma />} title="Ví dụ minh họa" id="vi-du-minh-hoa">
          <Rich src={t.example} className="text-[16.5px]" />
          {t.exampleSolution && (
            <details className="mt-3 rounded-xl bg-mist px-4 py-3">
              <summary className="font-semibold text-tim-800">Xem lời giải</summary>
              <Rich src={t.exampleSolution} className="mt-2 text-[16px]" />
            </details>
          )}
        </Block>
      )}
    </div>
  );
}

/** Số câu theo 5 hình thức và 4 mức độ của một dạng toán. */
export function QuestionCoverage({ byType, byLevel, levels }: { byType: Partial<Record<QuestionType, number>>; byLevel: Partial<Record<Level, number>>; levels: Level[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <div className="mb-1.5 text-[13px] font-bold text-ink-3">Theo hình thức</div>
        <ul className="space-y-1 text-[14px]">
          {QUESTION_TYPES.map((ty) => (
            <li key={ty} className="flex justify-between gap-3">
              <span>{TYPE_LABELS[ty]}</span>
              <span className={byType[ty] ? 'font-semibold' : 'text-ink-3'}>{byType[ty] ? `${byType[ty]} câu` : 'chưa có'}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="mb-1.5 text-[13px] font-bold text-ink-3">Theo mức độ</div>
        <ul className="space-y-1 text-[14px]">
          {([1, 2, 3, 4] as Level[]).map((l) => (
            <li key={l} className={cx('flex justify-between gap-3', !levels.includes(l) && 'text-ink-3')}>
              <span>
                {LEVEL_LABELS[l]}
                {!levels.includes(l) && ' (không áp dụng)'}
              </span>
              <span className={byLevel[l] ? 'font-semibold text-ink' : 'text-ink-3'}>{byLevel[l] ? `${byLevel[l]} câu` : levels.includes(l) ? 'chưa có' : '–'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export interface LessonMetaContent {
  code: string | null;
  difficulty: Level | null;
  prerequisites: string | null;
  concepts: string | null;
  formulas: string | null;
  properties: string | null;
  theorems: string | null;
  verifyStatus: VerifyStatus;
  verifyNote: string | null;
}

/** Tóm tắt bài: kiến thức nền tảng, khái niệm, công thức, tính chất, định lí. */
export function LessonMetaPanel({ m, showFormulas = true }: { m: LessonMetaContent; showFormulas?: boolean }) {
  const items: [string, string | null][] = [
    ['Kiến thức nền tảng', m.prerequisites],
    ['Khái niệm quan trọng', m.concepts],
    ['Tính chất', m.properties],
    ['Định lí', m.theorems],
    ...(showFormulas ? ([['Công thức', m.formulas]] as [string, string | null][]) : []),
  ];
  const shown = items.filter(([, v]) => v);
  if (!shown.length) return null;
  return (
    <section aria-labelledby="tom-tat-bai">
      <h2 id="tom-tat-bai" className="mb-3 text-xl font-extrabold">
        Tóm tắt bài học
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {shown.map(([k, v]) => (
          <div key={k} className={cx('rounded-2xl border border-line bg-white px-4 py-3', (k === 'Định lí' || k === 'Công thức') && 'md:col-span-2')}>
            <div className="mb-1 text-[13px] font-bold uppercase tracking-wide text-tim-600">{k}</div>
            <Rich src={v!} className="text-[15.5px]" />
          </div>
        ))}
      </div>
    </section>
  );
}

export interface ChapterContent {
  objectives: string | null;
  keyPoints: string | null;
  formulas: string | null;
}

export function ChapterOverview({ c }: { c: ChapterContent }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {c.objectives && (
        <Panel className="p-5">
          <h2 className="mb-2 text-lg font-extrabold">Mục tiêu cần đạt</h2>
          <Rich src={c.objectives} className="text-[15.5px]" />
        </Panel>
      )}
      {c.keyPoints && (
        <Panel className="p-5">
          <h2 className="mb-2 text-lg font-extrabold">Kiến thức trọng tâm</h2>
          <Rich src={c.keyPoints} className="text-[15.5px]" />
        </Panel>
      )}
      {c.formulas && (
        <div className="formula-frame isolate px-5 py-4 lg:col-span-2">
          <h2 className="mb-1 text-[15px] font-extrabold text-tim-700">Công thức cần nhớ</h2>
          <Rich src={c.formulas} className="text-[17px]" />
        </div>
      )}
    </div>
  );
}

/** Ghi chú cho mục cần kiểm tra lại với SGK. */
export function VerifyNotice({ status, note }: { status: VerifyStatus; note: string | null }) {
  if (status === 'verified' || !note) return null;
  return (
    <p className="flex items-start gap-2 rounded-xl border border-cam/40 bg-[#fff4ea] px-4 py-2.5 text-[14px] text-[#8a4b12]">
      <LuCircleAlert className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>
        <strong>{VERIFY_LABELS[status]}:</strong> {note}
      </span>
    </p>
  );
}

export { CHAPTER_TEST_PLAN } from '../../shared/pick';
