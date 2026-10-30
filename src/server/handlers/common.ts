import { HttpError, type Ctx } from '../http/context';
import { getTextbook } from '../../domain/curriculum';

export const DEFAULT_BOOK = 'toan-8';

export async function requireBook(ctx: Ctx, slug = DEFAULT_BOOK) {
  const book = await getTextbook(ctx.db, slug);
  if (!book || (book.status !== 'published' && !(ctx.user && ctx.user.role !== 'student'))) throw new HttpError(404, 'Không tìm thấy chương trình học này.');
  return book;
}

export function intParam(ctx: Ctx, name: string): number {
  const v = ctx.params[name];
  if (!/^\d{1,9}$/.test(v ?? '')) throw new HttpError(404);
  return Number(v);
}

export function uuidParam(ctx: Ctx, name: string): string {
  const v = ctx.params[name];
  if (!/^[0-9a-f-]{36}$/i.test(v ?? '')) throw new HttpError(404);
  return v;
}

export function paging(ctx: Ctx, perPage: number) {
  const page = Math.max(1, Number(ctx.query.get('trang')) || 1);
  return { page, limit: perPage, offset: (page - 1) * perPage, pages: (total: number) => Math.max(1, Math.ceil(total / perPage)) };
}

/** Giữ lại tham số lọc khi phân trang. */
export function queryString(params: Record<string, string | number | null | undefined>) {
  const s = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== null && v !== undefined && v !== '') s.set(k, String(v));
  const str = s.toString();
  return str ? `?${str}` : '';
}
