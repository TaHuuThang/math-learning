import { createContext, useContext } from 'react';
import type { Flash, SessionUser } from '../server/http/context';

export interface ViewCtx {
  user: SessionUser | null;
  path: string;
  query: Record<string, string>;
  csrfToken: string;
  flash: Flash | null;
}

export const AppContext = createContext<ViewCtx>({ user: null, path: '/', query: {}, csrfToken: '', flash: null });

export function useApp() {
  return useContext(AppContext);
}
