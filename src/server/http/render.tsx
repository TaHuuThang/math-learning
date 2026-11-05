import fs from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { AppContext, type ViewCtx } from '../../ui/app-context';
import { SiteLayout } from '../../ui/layouts/SiteLayout';
import { DashboardLayout } from '../../ui/layouts/DashboardLayout';
import { AuthLayout } from '../../ui/layouts/AuthLayout';
import { escapeHtml } from '../../shared/richtext';
import type { Ctx, Res } from './context';
import { AUTHOR, BRAND, COPYRIGHT } from '../../shared/brand';

let manifest: Record<string, string> | null = null;

function assetVersion(publicDir: string, name: string): string {
  if (!manifest) {
    try {
      manifest = JSON.parse(fs.readFileSync(path.join(publicDir, 'assets', 'manifest.json'), 'utf8'));
    } catch {
      manifest = {};
    }
  }
  return manifest![name] ?? 'dev';
}

export function resetAssetManifest() {
  manifest = null;
}

export type LayoutKind = 'site' | 'dashboard' | 'auth';

export interface PageOptions {
  title: string;
  description?: string;
  layout?: LayoutKind;
  status?: number;
  /** Mục đang chọn trên thanh bên dashboard */
  section?: string;
  wide?: boolean;
}

export function viewCtx(ctx: Ctx): ViewCtx {
  return {
    user: ctx.user,
    path: ctx.path,
    query: Object.fromEntries(ctx.query.entries()),
    csrfToken: ctx.csrfToken,
    flash: ctx.flash,
  };
}

export function page(ctx: Ctx, opts: PageOptions, body: ReactNode): Res {
  const v = viewCtx(ctx);
  const layout = opts.layout ?? 'site';
  const content =
    layout === 'dashboard' ? (
      <DashboardLayout section={opts.section}>{body}</DashboardLayout>
    ) : layout === 'auth' ? (
      <AuthLayout>{body}</AuthLayout>
    ) : (
      <SiteLayout wide={opts.wide}>{body}</SiteLayout>
    );
  const markup = renderToString(<AppContext.Provider value={v}>{content}</AppContext.Provider>);
  const dir = ctx.config.publicDir;
  const title = opts.title === BRAND ? opts.title : `${opts.title} – ${BRAND}`;
  const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(opts.description ?? 'Học Toán THCS theo chương trình GDPT 2018 – bài học, luyện tập, kiểm tra và theo dõi tiến độ.')}">
<meta name="csrf-token" content="${escapeHtml(ctx.csrfToken)}">${ctx.user ? '\n<meta name="ml-user" content="1">' : ''}
<meta name="author" content="${escapeHtml(AUTHOR)}">
<meta name="copyright" content="${escapeHtml(COPYRIGHT)}">
<meta name="theme-color" content="#3B2A8C">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap">
<link rel="stylesheet" href="/assets/katex/katex.min.css?v=${assetVersion(dir, 'katex.css')}">
<link rel="stylesheet" href="/assets/app.css?v=${assetVersion(dir, 'app.css')}">
<script type="module" src="/assets/app.js?v=${assetVersion(dir, 'app.js')}"></script>
</head>
<body class="${layout === 'dashboard' ? 'bg-mist' : 'bg-paper'}">${markup}</body>
</html>`;
  return { type: 'html', status: opts.status ?? 200, html };
}
