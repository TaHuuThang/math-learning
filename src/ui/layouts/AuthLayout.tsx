import type { ReactNode } from 'react';
import { LogoFull } from '../components/Logo';
import { FlashBanner } from '../components/ui';
import { COPYRIGHT } from '../../shared/brand';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="o-li min-h-screen px-4 py-8 md:py-14">
      <div className="mx-auto max-w-[460px]">
        <div className="mb-6 flex justify-center">
          <LogoFull size={132} />
        </div>
        <main id="noi-dung" className="rounded-[22px] border border-line bg-white p-6 shadow-[0_24px_48px_-24px_rgba(30,21,75,0.35)] md:p-8">
          <div className="mb-4 empty:hidden">
            <FlashBanner />
          </div>
          {children}
        </main>
        <p className="mt-6 text-center text-sm text-ink-3">
          <a href="/" className="hover:text-tim-700 hover:underline">
            Về trang chủ
          </a>
        </p>
        <p className="mt-2 text-center text-[12px] text-ink-3">{COPYRIGHT}</p>
      </div>
    </div>
  );
}
