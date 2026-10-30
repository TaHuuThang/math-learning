import type { ReactNode } from 'react';
import { Panel, Rich, cx } from './ui';
import { ThemeList } from './knowledge';
import { SECTION_LABELS } from '../../shared/labels';
import type { LessonSection } from '../../domain/curriculum';
import type { ThemeNode, TopicNode } from '../../domain/knowledge';

/**
 * Phần nội dung bài học: mục tiêu, kiến thức, công thức, ví dụ, chủ đề – dạng toán (dùng cho web và bản HTML).
 * Mục tiêu lấy từ mục nội dung "Mục tiêu" nếu có, nếu không lấy mục tiêu kiến thức của bài (bản đồ kiến thức).
 */
export function LessonBody({
  sections,
  themes,
  topicHref,
  lessonObjectives,
  meta,
}: {
  sections: LessonSection[];
  themes: ThemeNode[];
  topicHref: (t: TopicNode) => string;
  lessonObjectives?: string | null;
  meta?: ReactNode;
}) {
  const objectiveSections = sections.filter((s) => s.kind === 'objective');
  const objectives: { id: number | string; body: string }[] = objectiveSections.length
    ? objectiveSections
    : lessonObjectives
      ? [{ id: 'muc-tieu-bai', body: lessonObjectives }]
      : [];
  const knowledge = sections.filter((s) => s.kind === 'knowledge' || s.kind === 'note');
  const formulas = sections.filter((s) => s.kind === 'formula');
  const examples = sections.filter((s) => s.kind === 'example');
  return (
    <>
      {objectives.length > 0 && (
        <section aria-labelledby="muc-tieu">
          <h2 id="muc-tieu" className="mb-3 text-xl font-extrabold">
            Mục tiêu kiến thức
          </h2>
          <div className="rounded-2xl border-l-4 border-tim-700 bg-tim-50 px-5 py-4">
            {objectives.map((s) => (
              <Rich key={s.id} src={s.body} />
            ))}
          </div>
        </section>
      )}

      {meta}

      {knowledge.length > 0 && (
        <section aria-labelledby="kien-thuc">
          <h2 id="kien-thuc" className="mb-3 text-xl font-extrabold">
            Kiến thức
          </h2>
          <div className="space-y-6">
            {knowledge.map((s) => (
              <div key={s.id} className={s.kind === 'note' ? 'rounded-2xl border border-hl bg-hl-soft px-5 py-4' : ''}>
                {(s.title || s.kind === 'note') && <h3 className="mb-1.5 text-[17px] font-bold">{s.title ?? SECTION_LABELS.note}</h3>}
                <Rich src={s.body} className="text-[16.5px]" />
              </div>
            ))}
          </div>
        </section>
      )}

      {formulas.length > 0 && (
        <section aria-labelledby="cong-thuc">
          <h2 id="cong-thuc" className="mb-4 text-xl font-extrabold">
            Công thức
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {formulas.map((s) => (
              <div key={s.id} className={cx('formula-frame isolate px-5 py-4', formulas.length === 1 && 'md:col-span-2')}>
                {s.title && <div className="text-[14px] font-bold text-tim-700">{s.title}</div>}
                <Rich src={s.body} className="text-[17px]" />
              </div>
            ))}
          </div>
        </section>
      )}

      {examples.length > 0 && (
        <section aria-labelledby="vi-du">
          <h2 id="vi-du" className="mb-3 text-xl font-extrabold">
            Ví dụ
          </h2>
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
        </section>
      )}

      {themes.length > 0 && (
        <section aria-labelledby="dang-toan">
          <h2 id="dang-toan" className="mb-1 text-xl font-extrabold">
            Chủ đề và dạng toán
          </h2>
          <p className="mb-3 text-[14.5px] text-ink-3">Bấm vào từng dạng để xem dấu hiệu nhận biết, phương pháp, các bước giải, lỗi sai thường gặp và bài tập luyện tập.</p>
          <ThemeList themes={themes} topicHref={topicHref} />
        </section>
      )}
    </>
  );
}
