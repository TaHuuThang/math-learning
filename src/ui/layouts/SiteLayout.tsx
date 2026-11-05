import type { ReactNode } from 'react';
import {
  LuBookmark, LuChevronDown, LuLayoutDashboard, LuLogOut, LuMenu, LuSearch, LuShield, LuUser } from 'react-icons/lu';
import { useApp } from '../app-context';
import { Logo } from '../components/Logo';
import { FlashBanner, PostForm, buttonClass, cx } from '../components/ui';
import { ROLE_LABELS } from '../../shared/labels';
import { COPYRIGHT, COPYRIGHT_NOTE } from '../../shared/brand';

const NAV = [
  { href: '/', label: 'Trang chủ', match: (p: string) => p === '/' },
  { href: '/chuong-trinh', label: 'Chương trình học', match: (p: string) => p.startsWith('/chuong-trinh') || p.startsWith('/hoc') },
  { href: '/cong-thuc', label: 'Công thức', match: (p: string) => p.startsWith('/cong-thuc') },
  { href: '/luyen-tap', label: 'Luyện tập', match: (p: string) => p.startsWith('/luyen-tap') || p.startsWith('/thu-thach') },
  { href: '/kiem-tra', label: 'Kiểm tra', match: (p: string) => p.startsWith('/kiem-tra') },
  { href: '/thanh-tich', label: 'Thành tích', match: (p: string) => p.startsWith('/thanh-tich') },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts.length > 1 ? parts[parts.length - 1][0] : parts[0][0] ?? '?').toUpperCase();
}

function UserMenu() {
  const { user } = useApp();
  if (!user) return null;
  return (
    <details className="relative" data-menu>
      <summary className="flex items-center gap-2 rounded-xl border border-line bg-white py-1.5 pl-1.5 pr-2.5 hover:border-tim-300">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tim-100 font-bold text-tim-800">{initials(user.fullName)}</span>
        <span className="hidden max-w-[150px] truncate text-sm font-semibold lg:block">{user.fullName}</span>
        <LuChevronDown className="text-ink-3" aria-hidden="true" />
      </summary>
      <div className="absolute right-0 z-30 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-[0_12px_32px_-12px_rgba(30,21,75,0.35)]">
        <div className="px-3 py-2">
          <div className="truncate font-semibold">{user.fullName}</div>
          <div className="text-[13px] text-ink-3">
            {ROLE_LABELS[user.role]}
            {user.gradeLevel ? ` lớp ${user.gradeLevel}` : ''} · @{user.username}
          </div>
        </div>
        <hr className="my-1 border-line" />
        <a href="/ca-nhan" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] hover:bg-tim-50">
          <LuUser aria-hidden="true" /> Trang cá nhân
        </a>
        <a href="/goc-hoc-tap" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] hover:bg-tim-50">
          <LuBookmark aria-hidden="true" /> Góc học tập
        </a>
        {(user.role === 'teacher' || user.role === 'admin') && (
          <a href="/giao-vien" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] hover:bg-tim-50">
            <LuLayoutDashboard aria-hidden="true" /> Trang giáo viên
          </a>
        )}
        {user.role === 'admin' && (
          <a href="/quan-tri" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[15px] hover:bg-tim-50">
            <LuShield aria-hidden="true" /> Quản trị hệ thống
          </a>
        )}
        <PostForm action="/dang-xuat">
          <button type="submit" className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[15px] text-le hover:bg-le-soft">
            <LuLogOut aria-hidden="true" /> Đăng xuất
          </button>
        </PostForm>
      </div>
    </details>
  );
}

export function SiteHeader() {
  const { user, path } = useApp();
  return (
    <header className="site-header sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label="Điều hướng chính" className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = n.match(path);
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={active ? 'page' : undefined}
                className={cx('rounded-lg px-3 py-2 text-[15px] font-medium hover:bg-tim-50 hover:text-tim-800', active ? 'text-ink' : 'text-ink-2')}
              >
                <span className={active ? 'hl font-semibold' : ''}>{n.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href="/tim-kiem" className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-[17px] text-ink-2 hover:border-tim-300 hover:text-tim-800" aria-label="Tìm kiếm kiến thức" title="Tìm kiếm kiến thức">
            <LuSearch aria-hidden="true" />
          </a>
          {user ? (
            <UserMenu />
          ) : (
            <>
              <a href="/dang-nhap" className={buttonClass('ghost', 'sm', 'max-sm:hidden')}>
                Đăng nhập
              </a>
              <a href="/dang-ky" className={buttonClass('primary', 'sm')}>
                Đăng ký
              </a>
            </>
          )}
          <details className="relative lg:hidden" data-menu>
            <summary className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-xl" aria-label="Mở menu">
              <LuMenu aria-hidden="true" />
            </summary>
            <nav aria-label="Điều hướng chính (di động)" className="absolute right-0 z-30 mt-2 w-60 rounded-2xl border border-line bg-white p-2 shadow-[0_12px_32px_-12px_rgba(30,21,75,0.35)]">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className={cx('block rounded-lg px-3 py-2.5 text-[15px] hover:bg-tim-50', n.match(path) && 'bg-tim-50 font-semibold text-tim-800')}>
                  {n.label}
                </a>
              ))}
              {!user && (
                <a href="/dang-nhap" className="block rounded-lg px-3 py-2.5 text-[15px] hover:bg-tim-50">
                  Đăng nhập
                </a>
              )}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer mt-20 border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <Logo size="lg" />
          <p className="mt-3 max-w-sm text-sm text-ink-2">
            Học Toán THCS theo Chương trình GDPT 2018. Đang mở Toán 8 – bộ sách Kết nối tri thức với cuộc sống; Toán 6, 7, 9 đang được biên soạn.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-bold text-ink">Học tập</h2>
          <ul className="space-y-1.5 text-sm text-ink-2">
            <li><a className="hover:text-tim-700" href="/hoc/toan-8">Mục lục Toán 8</a></li>
            <li><a className="hover:text-tim-700" href="/luyen-tap">Luyện tập theo bài</a></li>
            <li><a className="hover:text-tim-700" href="/thu-thach">Thử thách Toán học</a></li>
            <li><a className="hover:text-tim-700" href="/chuong-trinh/toan-8/ppct">Phân phối chương trình</a></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-bold text-ink">Giáo viên</h2>
          <ul className="space-y-1.5 text-sm text-ink-2">
            <li><a className="hover:text-tim-700" href="/giao-vien">Trang giáo viên</a></li>
            <li><a className="hover:text-tim-700" href="/giao-vien/cau-hoi">Ngân hàng câu hỏi</a></li>
            <li><a className="hover:text-tim-700" href="/giao-vien/de-kiem-tra">Đề kiểm tra</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-x-6 gap-y-1 px-4 py-4 text-[13px] text-ink-3 md:px-6">
          <span className="font-semibold text-ink-2">{COPYRIGHT}</span>
          <span>{COPYRIGHT_NOTE}</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <>
      <a href="#noi-dung" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Bỏ qua điều hướng
      </a>
      <SiteHeader />
      <main id="noi-dung" className={cx('mx-auto px-4 pt-6 md:px-6', wide ? 'max-w-[1400px]' : 'max-w-[1240px]')}>
        <div className="mb-4 empty:hidden">
          <FlashBanner />
        </div>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
