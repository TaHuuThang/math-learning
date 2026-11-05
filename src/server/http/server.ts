import http, { type IncomingMessage, type ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import type { Database } from '../db';
import type { AppConfig } from '../config';
import { loadSession, SESSION_COOKIE } from '../auth/session';
import { randomToken, safeEqual } from '../auth/password';
import {
  FormData,
  HttpError,
  RedirectSignal,
  parseCookies,
  serializeCookie,
  type Ctx,
  type Flash,
  type Res,
} from './context';
import type { Router } from './router';
import { parseMultipart, type UploadedFile } from './multipart';
import { renderErrorPage } from '../../ui/pages/ErrorPage';

const CSRF_COOKIE = 'ml_csrf';
const FLASH_COOKIE = 'ml_flash';
const MAX_BODY = 4 * 1024 * 1024;

const MIME: Record<string, string> = {
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

function securityHeaders(res: ServerResponse, secure: boolean) {
  res.setHeader('Content-Security-Policy', CSP);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (secure) res.setHeader('Strict-Transport-Security', 'max-age=15552000');
}

function readBody(req: IncomingMessage, limit: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (c: Buffer) => {
      size += c.length;
      if (size > limit) {
        reject(new HttpError(413, 'Dữ liệu gửi lên quá lớn.'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function clientIp(req: IncomingMessage, trustProxy: boolean): string {
  if (trustProxy) {
    const fwd = req.headers['x-forwarded-for'];
    const first = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0]?.trim();
    if (first) return first;
  }
  return req.socket.remoteAddress ?? 'unknown';
}

function serveStatic(cfg: AppConfig, urlPath: string, search: string, res: ServerResponse): boolean {
  const rel = decodeURIComponent(urlPath).replace(/^\/+/, '');
  const root = path.resolve(cfg.publicDir);
  const file = path.resolve(root, rel);
  if (!file.startsWith(root + path.sep)) return false;
  let stat: fs.Stats;
  try {
    stat = fs.statSync(file);
  } catch {
    return false;
  }
  if (!stat.isFile()) return false;
  res.statusCode = 200;
  res.setHeader('Content-Type', MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream');
  res.setHeader('Content-Length', stat.size);
  res.setHeader(
    'Cache-Control',
    search.includes('v=') || rel.startsWith('assets/katex/fonts/') || rel.startsWith('assets/chunks/')
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=300',
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  fs.createReadStream(file).pipe(res);
  return true;
}

function decodeFlash(raw: string | undefined): Flash | null {
  if (!raw) return null;
  try {
    const f = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'));
    if (f && typeof f.message === 'string' && ['success', 'error', 'info'].includes(f.type)) return f;
  } catch {
    /* bỏ qua */
  }
  return null;
}

export function createServer(router: Router, db: Database, cfg: AppConfig) {
  return http.createServer(async (req, res) => {
    const started = Date.now();
    const host = req.headers.host ?? 'localhost';
    const url = new URL(req.url ?? '/', `http://${host}`);
    const forwardedProto = cfg.trustProxy ? String(req.headers['x-forwarded-proto'] ?? '').split(',')[0] : '';
    const isHttps = 'encrypted' in req.socket || forwardedProto === 'https';
    const secureCookie = cfg.secureCookies === 'always' || (cfg.secureCookies === 'auto' && isHttps);
    securityHeaders(res, isHttps);

    const method = (req.method ?? 'GET').toUpperCase();
    if ((method === 'GET' || method === 'HEAD') && url.pathname.startsWith('/assets/')) {
      if (serveStatic(cfg, url.pathname, url.search, res)) return;
    }

    const cookies = parseCookies(req.headers.cookie);
    const outCookies: string[] = [];
    let csrfToken = cookies[CSRF_COOKIE];
    if (!csrfToken || csrfToken.length < 20 || csrfToken.length > 100) {
      csrfToken = randomToken(24);
      outCookies.push(serializeCookie(CSRF_COOKIE, csrfToken, { secure: secureCookie, maxAge: 60 * 60 * 24 * 30 }));
    }

    let formCache: FormData | null = null;
    let filesCache: UploadedFile[] = [];
    let bodyCache: Buffer | null = null;
    const body = async () => (bodyCache ??= await readBody(req, MAX_BODY));

    const ctx: Ctx = {
      req,
      method,
      url,
      path: url.pathname,
      params: {},
      query: url.searchParams,
      cookies,
      ip: clientIp(req, cfg.trustProxy),
      secure: secureCookie,
      user: null,
      sessionTokenHash: null,
      csrfToken,
      flash: null,
      outCookies,
      db,
      config: cfg,
      async form() {
        if (formCache) return formCache;
        const type = String(req.headers['content-type'] ?? '');
        if (type.startsWith('multipart/form-data')) {
          try {
            const parsed = parseMultipart(await body(), type);
            filesCache = parsed.files;
            formCache = new FormData(parsed.fields);
          } catch {
            throw new HttpError(400, 'Dữ liệu tải lên không hợp lệ.');
          }
          return formCache;
        }
        if (!type.startsWith('application/x-www-form-urlencoded')) throw new HttpError(415, 'Định dạng dữ liệu không được hỗ trợ.');
        formCache = new FormData(new URLSearchParams((await body()).toString('utf8')));
        return formCache;
      },
      async files() {
        await ctx.form();
        return filesCache;
      },
      async json() {
        const type = String(req.headers['content-type'] ?? '');
        if (!type.startsWith('application/json')) throw new HttpError(415, 'Cần dữ liệu JSON.');
        try {
          return JSON.parse((await body()).toString('utf8'));
        } catch {
          throw new HttpError(400, 'Dữ liệu JSON không hợp lệ.');
        }
      },
      setFlash(flash: Flash) {
        outCookies.push(
          serializeCookie(FLASH_COOKIE, Buffer.from(JSON.stringify(flash)).toString('base64url'), { secure: secureCookie, maxAge: 60 }),
        );
      },
    };

    let result: Res;
    try {
      // Phiên đăng nhập
      const token = cookies[SESSION_COOKIE];
      if (token) {
        const session = await loadSession(db, token, cfg.sessionDays);
        if (session) {
          ctx.user = session.user;
          ctx.sessionTokenHash = session.tokenHash;
        } else {
          outCookies.push(serializeCookie(SESSION_COOKIE, '', { maxAge: 0, secure: secureCookie }));
        }
      }

      if (method === 'POST') {
        // Chống CSRF: kiểm tra nguồn gửi + mã CSRF (double-submit cookie)
        const origin = req.headers.origin;
        if (origin && origin !== 'null') {
          let originHost = '';
          try {
            originHost = new URL(origin).host;
          } catch {
            /* không hợp lệ */
          }
          const allowed = String(req.headers['x-forwarded-host'] ?? host).split(',')[0].trim();
          if (originHost !== host && originHost !== allowed) throw new HttpError(403, 'Yêu cầu bị chặn vì đến từ trang khác.');
        }
        const headerToken = req.headers['x-csrf-token'];
        let sent = typeof headerToken === 'string' ? headerToken : '';
        if (!sent && /^(application\/x-www-form-urlencoded|multipart\/form-data)/.test(String(req.headers['content-type'] ?? ''))) {
          sent = (await ctx.form()).str('_csrf', 200);
        }
        if (!cookies[CSRF_COOKIE] || !sent || !safeEqual(sent, cookies[CSRF_COOKIE])) {
          throw new HttpError(403, 'Phiên làm việc đã hết hạn hoặc biểu mẫu không hợp lệ. Hãy tải lại trang và thử lại.');
        }
      }

      if (method === 'GET' && cookies[FLASH_COOKIE]) {
        ctx.flash = decodeFlash(cookies[FLASH_COOKIE]);
        outCookies.push(serializeCookie(FLASH_COOKIE, '', { maxAge: 0, secure: secureCookie }));
      }

      const match = router.match(method, url.pathname);
      if (match === 'method-not-allowed') throw new HttpError(405, 'Phương thức không được hỗ trợ.');
      if (!match) throw new HttpError(404);
      ctx.params = match.params;
      result = await match.handler(ctx);
    } catch (err) {
      if (err instanceof RedirectSignal) {
        result = { type: 'redirect', location: err.location };
      } else {
        const status = err instanceof HttpError ? err.status : 500;
        if (status >= 500) console.error(`[lỗi] ${method} ${url.pathname}:`, err);
        const message = err instanceof HttpError ? err.message : 'Máy chủ gặp lỗi khi xử lý yêu cầu. Lỗi đã được ghi lại.';
        const wantsJson = url.pathname.startsWith('/api/') || String(req.headers.accept ?? '').includes('application/json');
        result = wantsJson ? { type: 'json', status, data: { error: message } } : renderErrorPage(ctx, status, message);
      }
    }

    if (outCookies.length) res.setHeader('Set-Cookie', outCookies);
    switch (result.type) {
      case 'html':
        res.statusCode = result.status;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        res.end(method === 'HEAD' ? undefined : result.html);
        break;
      case 'redirect':
        res.statusCode = result.status ?? 303;
        res.setHeader('Location', result.location);
        res.end();
        break;
      case 'json':
        res.statusCode = result.status;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify(result.data));
        break;
      case 'bytes':
        res.statusCode = result.status;
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Cache-Control', result.cacheSeconds ? `private, max-age=${result.cacheSeconds}` : 'no-store');
        res.end(result.body);
        break;
    }
    if (process.env.LOG_REQUESTS === '1') console.log(`${method} ${url.pathname} ${res.statusCode} ${Date.now() - started}ms`);
  });
}
