// Khai báo kiểu React tối giản – CHỈ dùng khi không cài được @types/react (môi trường không có mạng).
// Khi có mạng: `npm install` rồi `npm run typecheck` dùng kiểu chính thức.
declare module 'react' {
  export type Key = string | number;
  export interface ReactElement<P = any> {
    type: any;
    props: P;
    key: string | null;
  }
  export type ReactNode = ReactElement | string | number | bigint | boolean | null | undefined | Iterable<ReactNode>;
  export type FC<P = {}> = (props: P) => ReactNode;
  export type ComponentType<P = any> = (props: P) => ReactNode;
  export type ComponentProps<T> = T extends (props: infer P) => any ? P : never;
  export interface Context<T> {
    Provider: (p: { value: T; children?: ReactNode }) => ReactElement;
  }
  export function createContext<T>(v: T): Context<T>;
  export function useContext<T>(c: Context<T>): T;
  export function useState<S>(init: S | (() => S)): [S, (v: S | ((prev: S) => S)) => void];
  export function useEffect(fn: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useRef<T>(init: T): { current: T };
  export function useRef<T>(init: T | null): { current: T | null };
  export function useId(): string;
  export type CSSProperties = Record<string, string | number | undefined>;
  export interface DOMAttributes<T> {
    children?: ReactNode;
    dangerouslySetInnerHTML?: { __html: string };
    onClick?: (e: any) => void;
    onChange?: (e: any) => void;
  }
  export interface HTMLAttributes<T> extends DOMAttributes<T> {
    className?: string;
    id?: string;
    style?: CSSProperties;
    title?: string;
    role?: string;
    [k: `aria-${string}`]: any;
    [k: `data-${string}`]: any;
  }
  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    name?: string;
    value?: string | number;
    form?: string;
  }
  export interface SVGAttributes<T> extends HTMLAttributes<T> {
    [k: string]: any;
  }
  export const Fragment: any;
}
declare module 'react/jsx-runtime' {
  import type { ReactElement, ReactNode, Key } from 'react';
  export namespace JSX {
    type Element = ReactElement;
    type ElementType = string | ((props: any) => ReactNode);
    interface IntrinsicElements {
      [el: string]: { onChange?: (e: any) => void; onClick?: (e: any) => void; [k: string]: any };
    }
    interface IntrinsicAttributes {
      key?: Key | null;
    }
    interface ElementChildrenAttribute {
      children: {};
    }
  }
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
declare module 'react-dom/server' {
  export function renderToString(el: any): string;
}
declare module 'react-dom/client' {
  export function hydrateRoot(container: Element, el: any): unknown;
  export function createRoot(container: Element): { render(el: any): void; unmount(): void };
}
