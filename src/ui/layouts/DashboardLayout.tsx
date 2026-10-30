import type { ReactNode } from 'react';
import {
  LuChartColumn,
  LuClipboardCheck,
  LuFileQuestion,
  LuHouse,
  LuLayoutDashboard,
  LuLibrary,
  LuLogOut,
  LuMenu,
  LuSchool,
  LuSettings,
  LuUsers,
  LuKeyRound,
} from 'react-icons/lu';
import { useApp } from '../app-context';
import { LogoMark } from '../components/Logo';
import { FlashBanner, PostForm, cx } from '../components/ui';
import { ROLE_LABELS } from '../../shared/labels';

const TEACHER_NAV = [
  { key: 'overview', href: '/giao-vien', label: 'Tổng quan', icon: LuLayoutDashboard },
  { key: 'classes', href: '/giao-vien/lop', label: 'Lớp học', icon: LuSchool },
  { key: 'students', href: '/giao-vien/hoc-sinh', label: 'Học sinh', icon: LuUsers },
  { key: 'curriculum', href: '/giao-vien/chuong-trinh', label: 'Chương trình & bài học', icon: LuLibrary },
  { key: 'questions', href: '/giao-vien/cau-hoi', label: 'Ngân hàng câu hỏi', icon: LuFileQuestion },
  { key: 'tests', href: '/giao-vien/de-kiem-tra', label: 'Đề kiểm tra', icon: LuClipboardCheck },
  { key: 'stats', href: '/giao-vien/thong-ke', label: 'Thống kê kết quả', icon: LuChartColumn },
];

const ADMIN_NAV = [
  { key: 'accounts', href: '/quan-tri/tai-khoan', label: 'Tài khoản', icon: LuKeyRound },
  { key: 'system', href: '/quan-tri', label: 'Khối lớp & hệ thống', icon: LuSettings },
];

function NavList({ section }: { section?: string }) {
  const { user } = useApp();
  const item = (n: (typeof TEACHER_NAV)[number]) => {
    const Icon = n.icon;
    const active = section === n.key;
    return (
      <a
        key={n.key}
        href={n.href}
        aria-current={active ? 'page' : undefined}
        className={cx(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium',
          active ? 'bg-tim-700 text-white' : 'text-ink-2 hover:bg-tim-50 hover:text-tim-800',
        )}
      >
        <Icon aria-hidden="true" className="text-lg" />
        {n.label}
      </a>
    );
  };
  return (
    <nav aria-label="Quản lý" className="space-y-1">
      {TEACHER_NAV.map(item)}
      {user?.role === 'admin' && (
        <>
          <div className="px-3 pb-1 pt-5 text-[13px] font-semibold text-ink-3">Quản trị</div>
          {ADMIN_NAV.map(item)}
        </>
      )}
    </nav>
  );
}

export function DashboardLayout({ children, section }: { children: ReactNode; section?: string }) {
  const { user } = useApp();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[264px_minmax(0,1fr)]">
      <aside className="hidden border-r border-line bg-white lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen">
        <a href="/giao-vien" className="flex items-center gap-2.5 px-5 py-5">
          <LogoMark />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight">MATH LEARNING</span>
            <span className="block text-[12px] text-ink-3">Khu vực giáo viên</span>
          </span>
        </a>
        <div className="flex-1 overflow-y-auto px-3">
          <NavList section={section} />
        </div>
        <div className="border-t border-line p-3">
          <a href="/" className="flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-ink-2 hover:bg-tim-50">
            <LuHouse aria-hidden="true" /> Về trang học tập
          </a>
          <div className="mt-2 flex items-center justify-between gap-2 px-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{user?.fullName}</div>
              <div className="text-[12px] text-ink-3">{user ? ROLE_LABELS[user.role] : ''}</div>
            </div>
            <PostForm action="/dang-xuat">
              <button type="submit" className="rounded-lg p-2 text-ink-3 hover:bg-le-soft hover:text-le" aria-label="Đăng xuất" title="Đăng xuất">
                <LuLogOut aria-hidden="true" />
              </button>
            </PostForm>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-white px-4 lg:hidden">
          <details className="relative" data-menu>
            <summary className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-xl" aria-label="Mở menu quản lý">
              <LuMenu aria-hidden="true" />
            </summary>
            <div className="absolute left-0 z-30 mt-2 w-72 rounded-2xl border border-line bg-white p-2 shadow-lg">
              <NavList section={section} />
              <a href="/" className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-ink-2 hover:bg-tim-50">
                <LuHouse aria-hidden="true" /> Về trang học tập
              </a>
            </div>
          </details>
          <span className="font-extrabold tracking-tight">MATH LEARNING</span>
        </header>
        <main id="noi-dung" className="mx-auto max-w-[1180px] px-4 py-6 md:px-8 md:py-8">
          <div className="mb-4 empty:hidden">
            <FlashBanner />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
