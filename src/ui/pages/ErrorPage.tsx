import { page } from '../../server/http/render';
import type { Ctx, Res } from '../../server/http/context';
import { buttonClass } from '../components/ui';

const TITLES: Record<number, string> = {
  400: 'Yêu cầu không hợp lệ',
  403: 'Không có quyền truy cập',
  404: 'Không tìm thấy trang',
  405: 'Thao tác không hợp lệ',
  413: 'Dữ liệu quá lớn',
  415: 'Dữ liệu không hợp lệ',
  500: 'Máy chủ gặp lỗi',
};

export function renderErrorPage(ctx: Ctx, status: number, message: string): Res {
  const title = TITLES[status] ?? 'Có lỗi xảy ra';
  return page(
    ctx,
    { title, status },
    <section className="o-li le-vo mx-auto my-6 max-w-3xl rounded-[22px] border border-line px-8 py-14 md:px-20">
      <p className="text-[56px] font-extrabold leading-none text-tim-700">{status}</p>
      <h1 className="mt-3 text-2xl font-bold">{title}</h1>
      <p className="mt-2 max-w-lg text-ink-2">{message}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/" className={buttonClass('primary')}>
          Về trang chủ
        </a>
        {status === 403 && !ctx.user && (
          <a href={`/dang-nhap?next=${encodeURIComponent(ctx.path)}`} className={buttonClass('secondary')}>
            Đăng nhập
          </a>
        )}
      </div>
    </section>,
  );
}
