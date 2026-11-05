import type { IncomingMessage } from 'node:http';
import type { Database } from '../db';
import type { AppConfig } from '../config';

export type Role = 'admin' | 'teacher' | 'student';

export interface SessionUser {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  gradeLevel: number | null;
}

export interface Flash {
  type: 'success' | 'error' | 'info';
  message: string;
}

export class FormData {
  constructor(private readonly params: URLSearchParams) {}
  has(name: string) {
    return this.params.has(name);
  }
  /** Chuỗi đã cắt khoảng trắng hai đầu, giới hạn độ dài. */
  str(name: string, max = 2000): string {
    return (this.params.get(name) ?? '').trim().slice(0, max);
  }
  /** Chuỗi giữ nguyên xuống dòng (cho nội dung bài học, câu hỏi). */
  text(name: string, max = 20000): string {
    return (this.params.get(name) ?? '').replace(/\r\n?/g, '\n').slice(0, max);
  }
  int(name: string): number | null {
    const v = this.params.get(name);
    if (v === null || v.trim() === '') return null;
    const n = Number(v);
    return Number.isInteger(n) ? n : null;
  }
  num(name: string): number | null {
    const v = this.params.get(name);
    if (v === null || v.trim() === '') return null;
    const n = Number(v.replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  }
  bool(name: string): boolean {
    const v = this.params.get(name);
    return v === 'on' || v === '1' || v === 'true';
  }
  all(name: string): string[] {
    return this.params.getAll(name);
  }
  values(): Record<string, string> {
    return Object.fromEntries(this.params.entries());
  }
}

export interface Ctx {
  req: IncomingMessage;
  method: string;
  url: URL;
  path: string;
  params: Record<string, string>;
  query: URLSearchParams;
  cookies: Record<string, string>;
  ip: string;
  secure: boolean;
  user: SessionUser | null;
  sessionTokenHash: string | null;
  csrfToken: string;
  flash: Flash | null;
  outCookies: string[];
  db: Database;
  config: AppConfig;
  form(): Promise<FormData>;
  /** Tệp tải lên của biểu mẫu multipart/form-data (rỗng với biểu mẫu thường). */
  files(): Promise<import('./multipart').UploadedFile[]>;
  json(): Promise<unknown>;
  setFlash(flash: Flash): void;
}

export type Res =
  | { type: 'html'; status: number; html: string }
  | { type: 'redirect'; location: string; status?: number }
  | { type: 'json'; status: number; data: unknown }
  | { type: 'bytes'; status: number; contentType: string; body: Buffer | string; cacheSeconds?: number };

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message?: string,
  ) {
    super(message ?? (status === 404 ? 'Không tìm thấy trang' : status === 403 ? 'Bạn không có quyền truy cập' : 'Lỗi máy chủ'));
  }
}

/** Ném ra để chuyển hướng ngay (VD: chưa đăng nhập). */
export class RedirectSignal {
  constructor(readonly location: string) {}
}

export function redirect(location: string, flash?: Flash, ctx?: Ctx): Res {
  if (flash && ctx) ctx.setFlash(flash);
  return { type: 'redirect', location };
}

export function json(data: unknown, status = 200): Res {
  return { type: 'json', status, data };
}

/** Chỉ cho phép chuyển hướng nội bộ (chống open redirect). */
export function safeNext(next: string | null | undefined, fallback = '/'): string {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback;
  return next;
}

export function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    try {
      out[k] = decodeURIComponent(v);
    } catch {
      out[k] = v;
    }
  }
  return out;
}

export function serializeCookie(
  name: string,
  value: string,
  opts: { maxAge?: number; httpOnly?: boolean; secure?: boolean; sameSite?: 'Lax' | 'Strict'; path?: string } = {},
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${opts.path ?? '/'}`];
  if (opts.maxAge !== undefined) parts.push(`Max-Age=${opts.maxAge}`);
  if (opts.httpOnly !== false) parts.push('HttpOnly');
  if (opts.secure) parts.push('Secure');
  parts.push(`SameSite=${opts.sameSite ?? 'Lax'}`);
  return parts.join('; ');
}
