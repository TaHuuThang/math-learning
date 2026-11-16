import { useEffect, useRef, useState } from 'react';

/** Kí hiệu toán chèn nhanh vào bài làm tự luận (viết theo cú pháp công thức của trang). */
const TOOLS: { label: string; title: string; before: string; after: string }[] = [
  { label: 'Công thức', title: 'Mở vùng công thức \\( … \\)', before: '\\(', after: '\\)' },
  { label: 'a/b', title: 'Phân số', before: '\\dfrac{', after: '}{}' },
  { label: 'xⁿ', title: 'Số mũ', before: '^{', after: '}' },
  { label: '√', title: 'Căn bậc hai', before: '\\sqrt{', after: '}' },
  { label: '·', title: 'Dấu nhân', before: ' \\cdot ', after: '' },
  { label: '≠', title: 'Khác', before: ' \\ne ', after: '' },
  { label: '≤', title: 'Nhỏ hơn hoặc bằng', before: ' \\le ', after: '' },
  { label: '≥', title: 'Lớn hơn hoặc bằng', before: ' \\ge ', after: '' },
  { label: '⇒', title: 'Suy ra', before: ' \\Rightarrow ', after: '' },
  { label: '⇔', title: 'Tương đương', before: ' \\Leftrightarrow ', after: '' },
  { label: '∠', title: 'Góc', before: '\\widehat{', after: '}' },
  { label: '△', title: 'Tam giác', before: '\\triangle ', after: '' },
  { label: '°', title: 'Độ', before: '^\\circ', after: '' },
  { label: '∥', title: 'Song song', before: ' \\parallel ', after: '' },
  { label: '⊥', title: 'Vuông góc', before: ' \\perp ', after: '' },
  { label: '∽', title: 'Đồng dạng', before: ' \\backsim ', after: '' },
];

type Renderer = typeof import('../shared/richtext');

export interface EssayValue {
  text?: string;
  images?: number[];
}

export default function EssayInput({
  id,
  value,
  onChange,
  disabled,
  onUpload,
}: {
  id: string;
  value: EssayValue | undefined;
  onChange: (v: EssayValue) => void;
  disabled?: boolean;
  /** Tải ảnh bài làm (chỉ bản trực tuyến): trả về mã ảnh. */
  onUpload?: (file: File) => Promise<number>;
}) {
  const text = value?.text ?? '';
  const images = value?.images ?? [];
  const ref = useRef<HTMLTextAreaElement>(null);
  const renderer = useRef<Renderer | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!showPreview) return;
    const t = window.setTimeout(async () => {
      renderer.current ??= await import('../shared/richtext');
      setPreview(renderer.current.renderRich(text || '…'));
    }, 150);
    return () => window.clearTimeout(t);
  }, [text, showPreview]);

  function insert(before: string, after: string) {
    const el = ref.current;
    if (!el || disabled) return;
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    // tự mở vùng công thức nếu con trỏ chưa nằm trong \( … \)
    const head = text.slice(0, start);
    const inMath = (head.match(/\\\(/g)?.length ?? 0) > (head.match(/\\\)/g)?.length ?? 0);
    const wrap = before.startsWith('\\(') || inMath ? ['', ''] : ['\\(', '\\)'];
    const next = text.slice(0, start) + wrap[0] + before + text.slice(start, end) + after + wrap[1] + text.slice(end);
    onChange({ text: next, images });
    const caret = start + wrap[0].length + before.length + (end - start);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(caret, caret);
    });
  }

  async function pick(e: { target: HTMLInputElement }) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !onUpload) return;
    if (file.size > 3 * 1024 * 1024) {
      setUploadError('Ảnh lớn hơn 3 MB. Hãy chụp lại với độ phân giải thấp hơn.');
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const imgId = await onUpload(file);
      onChange({ text, images: [...images, imgId].slice(0, 4) });
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink-2" htmlFor={id}>
        Bài làm của em
      </label>
      <div className="mb-2 flex flex-wrap gap-1.5" role="toolbar" aria-label="Chèn kí hiệu toán học">
        {TOOLS.map((t) => (
          <button
            key={t.title}
            type="button"
            title={t.title}
            aria-label={t.title}
            disabled={disabled}
            onClick={() => insert(t.before, t.after)}
            className="min-w-[38px] rounded-lg border border-line-2 bg-white px-2 py-1 text-[15px] font-semibold text-tim-800 hover:border-tim-300 hover:bg-tim-50 disabled:opacity-50"
          >
            {t.label}
          </button>
        ))}
      </div>
      <textarea
        id={id}
        ref={ref}
        rows={8}
        maxLength={10000}
        disabled={disabled}
        value={text}
        onChange={(e) => onChange({ text: e.target.value, images })}
        className="w-full rounded-xl border-2 border-line-2 bg-white px-4 py-3 text-[16px] leading-relaxed focus:border-tim-500 focus:outline-none focus:ring-4 focus:ring-tim-100"
        placeholder="Trình bày lời giải từng bước. Bấm các nút phía trên để chèn phân số, số mũ, căn, kí hiệu hình học…"
      />
      <div className="mt-2 flex flex-wrap items-center gap-3 text-[14px]">
        <button type="button" className="font-semibold text-tim-700 underline-offset-2 hover:underline" onClick={() => setShowPreview((v) => !v)}>
          {showPreview ? 'Ẩn xem trước' : 'Xem trước công thức'}
        </button>
        {onUpload && !disabled && (
          <label className="cursor-pointer font-semibold text-tim-700 underline-offset-2 hover:underline">
            {uploading ? 'Đang tải ảnh…' : 'Chèn ảnh bài làm (chụp vở)'}
            <input type="file" accept="image/png,image/jpeg,image/webp" capture="environment" className="sr-only" onChange={pick} disabled={uploading} />
          </label>
        )}
        <span className="text-[13px] text-ink-3">Câu tự luận do giáo viên chấm; bài làm được tự lưu.</span>
      </div>
      {uploadError && (
        <p role="alert" className="mt-2 text-[14px] text-le">
          {uploadError}
        </p>
      )}
      {images.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-3">
          {images.map((imgId) => (
            <li key={imgId} className="relative">
              <a href={`/media/${imgId}`} target="_blank" rel="noreferrer">
                <img src={`/media/${imgId}`} alt="Ảnh bài làm" className="h-28 w-auto rounded-lg border border-line object-cover" />
              </a>
              {!disabled && (
                <button
                  type="button"
                  aria-label="Bỏ ảnh này"
                  onClick={() => onChange({ text, images: images.filter((x) => x !== imgId) })}
                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-le text-sm font-bold text-white"
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {showPreview && <div className="prose-math mt-3 rounded-xl border border-dashed border-tim-300 bg-tim-50/40 p-4" dangerouslySetInnerHTML={{ __html: preview }} />}
    </div>
  );
}
