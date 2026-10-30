import { useRef, useState } from 'react';
import { BadgeMark } from '../ui/components/badge';
import { completeLesson, exportJson, importJson, isPersistent, load, reopenLesson, resetAll, stats, type EarnedBadge } from './store';
import type { OfflineData } from './types';

const data = (): OfflineData => window.ML_DATA!;
const root = () => document.body.dataset.root ?? '';
const lessonHref = (slug: string) => `${root()}bai/${slug}.html`;
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

function Bar({ value, tone = 'tim' }: { value: number; tone?: 'tim' | 'tre' }) {
  return (
    <div className={tone === 'tre' ? 'bar bar-tre' : 'bar'} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

function Line({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line py-2.5 last:border-0">
      <span className="text-[15px] text-ink-2">{label}</span>
      <span className="text-lg font-bold tabular-nums">{value}</span>
    </div>
  );
}

const btn = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-semibold';

export function ContinuePanel() {
  const s = load();
  const lesson = data().lessons.find((l) => l.slug === s.last);
  const first = data().lessons[0];
  if (!lesson) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[15px] text-ink-2">Em chưa mở bài học nào trên máy này. Bắt đầu với bài đầu tiên của chương trình.</p>
        {first && (
          <a href={lessonHref(first.slug)} className={`${btn} bg-tim-700 text-white hover:bg-tim-800`}>
            Học {first.label}
          </a>
        )}
      </div>
    );
  }
  const done = !!s.completed[lesson.slug];
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <div className="min-w-0">
        <div className="text-[14px] text-ink-3">{lesson.chapter}</div>
        <div className="mt-1 text-xl font-bold">{lesson.label}</div>
        <span className={`mt-2 inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${done ? 'border-[#bfe5d0] bg-tre-soft text-tre' : 'border-[#f2df95] bg-hl-soft text-[#7a5a00]'}`}>
          {done ? 'Đã học xong' : 'Đang học'}
        </span>
      </div>
      <a href={lessonHref(lesson.slug)} className={`${btn} bg-tim-700 text-white hover:bg-tim-800`}>
        Mở bài học
      </a>
    </div>
  );
}

export function StatsPanel() {
  const st = stats();
  return (
    <>
      <div className="mb-2 flex items-center justify-between text-[14px]">
        <span className="font-semibold">Cấp {st.level}</span>
        <span className="text-ink-3">
          {st.levelCurrent}/{st.levelNext} XP
        </span>
      </div>
      <Bar value={pct(st.levelCurrent, st.levelNext)} />
      <div className="mt-3">
        <Line label="Mục đã học xong" value={`${st.completed}/${st.total}`} />
        <Line label="Câu đã làm" value={st.answered} />
        <Line label="Tỉ lệ chính xác" value={`${st.accuracy}%`} />
        <Line label="Chuỗi ngày luyện tập" value={`${st.streak} ngày`} />
      </div>
      <a href={`${root()}tien-do.html`} className={`${btn} mt-3 w-full bg-mist text-ink-2 hover:bg-tim-50`}>
        Xem tiến độ & huy hiệu
      </a>
    </>
  );
}

export function LessonComplete({ slug }: { slug: string }) {
  const [done, setDone] = useState(() => !!load().completed[slug]);
  const [msg, setMsg] = useState<string | null>(null);
  const finish = () => {
    const r = completeLesson(slug);
    setDone(true);
    const parts = ['Đã lưu: em học xong mục này.'];
    if (r.xp) parts.push(`+${r.xp} XP.`);
    if (r.badges.length) parts.push(`Huy hiệu mới: ${r.badges.map((b: EarnedBadge) => b.name).join(', ')}.`);
    setMsg(parts.join(' '));
    window.dispatchEvent(new Event('ml-progress'));
  };
  const undo = () => {
    reopenLesson(slug);
    setDone(false);
    setMsg('Đã chuyển mục này về trạng thái đang học.');
    window.dispatchEvent(new Event('ml-progress'));
  };
  return (
    <div>
      {msg && (
        <p role="status" className="mb-3 rounded-xl border border-[#bfe5d0] bg-tre-soft px-4 py-2 text-[15px] text-[#0f5c3e]">
          {msg}
        </p>
      )}
      {done ? (
        <>
          <p className="font-semibold text-tre">Em đã đánh dấu học xong mục này.</p>
          <button type="button" onClick={undo} className={`${btn} mt-3 bg-mist text-ink-2 hover:bg-tim-50`}>
            Đánh dấu là đang học lại
          </button>
        </>
      ) : (
        <>
          <p className="text-[15px] text-ink-2">Đọc xong lý thuyết và ví dụ? Đánh dấu để lưu tiến độ trên máy này (+20 XP lần đầu).</p>
          <button type="button" onClick={finish} className={`${btn} mt-3 bg-tim-700 px-6 py-3.5 text-base text-white shadow-[0_2px_0_0_#1e154b] hover:bg-tim-800`}>
            Đánh dấu đã học xong
          </button>
        </>
      )}
    </div>
  );
}

const STATUS_TEXT: Record<string, [string, string]> = {
  correct: ['Đúng', 'border-[#bfe5d0] bg-tre-soft text-tre'],
  partial: ['Một phần', 'border-[#f2df95] bg-hl-soft text-[#7a5a00]'],
  incorrect: ['Sai', 'border-[#f6c4c6] bg-le-soft text-le'],
  pending: ['Tự luận', 'border-[#f3d6a8] bg-cam-soft text-cam'],
};

export function ProgressPage() {
  const [, force] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [note, setNote] = useState<string | null>(null);
  const s = load();
  const st = stats();
  const d = data();
  const labelOf = (slug?: string) => d.lessons.find((l) => l.slug === slug)?.label ?? '';

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `tien-do-math-learning-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  const restore = async (file: File) => {
    try {
      importJson(await file.text());
      setNote('Đã khôi phục tiến độ từ tệp sao lưu.');
      force((n) => n + 1);
    } catch (err) {
      setNote((err as Error).message);
    }
  };

  return (
    <div className="space-y-8">
      {!isPersistent() && (
        <p role="alert" className="rounded-xl border border-[#f3d6a8] bg-cam-soft px-4 py-3 text-[15px] text-[#7a4200]">
          Trình duyệt đang chặn bộ nhớ nên tiến độ chỉ giữ đến khi đóng trang. Hãy mở tệp bằng Chrome, Edge hoặc Firefox ở chế độ thường.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[18px] border border-line bg-white p-5">
          <div className="text-[14px] text-ink-3">Điểm kinh nghiệm</div>
          <div className="text-3xl font-extrabold text-tim-700">{st.xp} XP</div>
          <div className="mt-2 flex justify-between text-[13px] text-ink-3">
            <span>Cấp {st.level}</span>
            <span>
              {st.levelCurrent}/{st.levelNext}
            </span>
          </div>
          <Bar value={pct(st.levelCurrent, st.levelNext)} />
        </div>
        <div className="rounded-[18px] border border-line bg-white p-5">
          <div className="text-[14px] text-ink-3">Tiến độ học tập</div>
          <div className="text-3xl font-extrabold">{pct(st.completed, st.total)}%</div>
          <div className="mt-2 text-[13px] text-ink-3">
            {st.completed}/{st.total} mục học xong · {st.inProgress} đang học
          </div>
        </div>
        <div className="rounded-[18px] border border-line bg-white p-5">
          <div className="text-[14px] text-ink-3">Câu đã làm</div>
          <div className="text-3xl font-extrabold">{st.answered}</div>
          <div className="mt-2 text-[13px] text-ink-3">Tỉ lệ chính xác {st.accuracy}%</div>
        </div>
        <div className="rounded-[18px] border border-line bg-white p-5">
          <div className="text-[14px] text-ink-3">Chuỗi luyện tập</div>
          <div className="text-3xl font-extrabold">{st.streak} ngày</div>
          <div className="mt-2 text-[13px] text-ink-3">{st.badges} huy hiệu</div>
        </div>
      </div>

      <section aria-labelledby="huy-hieu">
        <h2 id="huy-hieu" className="mb-4 text-xl font-extrabold">
          Huy hiệu
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {d.achievements.map((a) => (
            <li key={a.code} className={`flex items-center gap-4 rounded-2xl border bg-white p-4 ${s.badges[a.code] ? 'border-line' : 'border-dashed border-line-2'}`}>
              <BadgeMark icon={a.icon} tier={a.tier} earned={!!s.badges[a.code]} size={56} />
              <div className="min-w-0">
                <div className="font-bold">{a.name}</div>
                <div className="text-[14px] text-ink-2">{a.description}</div>
                {s.badges[a.code] && <div className="mt-0.5 text-[12px] text-ink-3">Đạt ngày {new Date(s.badges[a.code]).toLocaleDateString('vi-VN')}</div>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="theo-chuong">
          <h2 id="theo-chuong" className="mb-3 text-xl font-extrabold">
            Tiến độ theo chương
          </h2>
          <div className="divide-y divide-line rounded-[18px] border border-line bg-white">
            {d.chapters.map((c) => {
              const done = c.lessons.filter((l) => s.completed[l]).length;
              return (
                <div key={c.code} className="grid items-center gap-3 px-5 py-3 sm:grid-cols-[minmax(0,1fr)_160px]">
                  <a href={c.lessons[0] ? lessonHref(c.lessons[0]) : '#'} className="truncate text-[15px] font-medium hover:text-tim-700">
                    {c.kind === 'chapter' ? `Chương ${c.code}. ${c.title}` : c.title}
                  </a>
                  <div>
                    <Bar value={pct(done, c.lessons.length)} tone="tre" />
                    <div className="mt-0.5 text-[12px] text-ink-3">
                      {done}/{c.lessons.length} mục
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section aria-labelledby="lich-su">
          <h2 id="lich-su" className="mb-3 text-xl font-extrabold">
            Lịch sử luyện tập gần đây
          </h2>
          {s.responses.length ? (
            <ul className="divide-y divide-line rounded-[18px] border border-line bg-white">
              {[...s.responses]
                .reverse()
                .slice(0, 20)
                .map((r, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 px-5 py-2.5">
                    <span className="min-w-0">
                      <span className="block truncate text-[14px]">
                        Câu #{r.q}
                        {r.lesson ? ` – ${labelOf(r.lesson)}` : ''}
                        {r.c === 'challenge' ? ' (thử thách)' : ''}
                      </span>
                      <span className="text-[12px] text-ink-3">{new Date(r.t).toLocaleString('vi-VN')}</span>
                    </span>
                    <span className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-semibold ${STATUS_TEXT[r.s][1]}`}>{STATUS_TEXT[r.s][0]}</span>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="rounded-[18px] border-2 border-dashed border-line-2 bg-white/60 px-5 py-8 text-center text-[15px] text-ink-2">
              Chưa có lượt luyện tập nào trên máy này.{' '}
              <a className="font-semibold text-tim-700 underline" href={`${root()}luyen-tap.html`}>
                Bắt đầu luyện tập
              </a>
            </p>
          )}
        </section>
      </div>

      <section aria-labelledby="sao-luu" className="rounded-[18px] border border-line bg-white p-5">
        <h2 id="sao-luu" className="text-lg font-extrabold">
          Sao lưu tiến độ
        </h2>
        <p className="mt-1 text-[14px] text-ink-2">Tiến độ lưu trong trình duyệt của máy này. Tải tệp sao lưu để chuyển sang máy khác hoặc phòng khi xóa dữ liệu trình duyệt.</p>
        {note && (
          <p role="status" className="mt-3 rounded-xl bg-tim-50 px-4 py-2 text-[14px]">
            {note}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={download} className={`${btn} border-2 border-tim-700 bg-white text-tim-800 hover:bg-tim-50`}>
            Tải tệp sao lưu
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className={`${btn} bg-mist text-ink-2 hover:bg-tim-50`}>
            Khôi phục từ tệp
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = (e.target as HTMLInputElement).files?.[0];
              if (f) void restore(f);
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Xóa toàn bộ tiến độ, câu đã làm và huy hiệu trên máy này?')) {
                resetAll();
                setNote('Đã xóa tiến độ trên máy này.');
                force((n) => n + 1);
              }
            }}
            className={`${btn} text-le hover:bg-le-soft`}
          >
            Xóa tiến độ
          </button>
        </div>
      </section>
    </div>
  );
}
