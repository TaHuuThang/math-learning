import type { Ctx, Res } from './context';

export type Handler = (ctx: Ctx) => Promise<Res>;

interface Route {
  method: 'GET' | 'POST';
  pattern: string;
  regex: RegExp;
  keys: string[];
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  private add(method: Route['method'], pattern: string, handler: Handler) {
    const keys: string[] = [];
    const regex = new RegExp(
      '^' +
        pattern.replace(/\/:([a-zA-Z]+)/g, (_, key: string) => {
          keys.push(key);
          return '/([^/]+)';
        }) +
        '/?$',
    );
    this.routes.push({ method, pattern, regex, keys, handler });
    return this;
  }

  get(pattern: string, handler: Handler) {
    return this.add('GET', pattern, handler);
  }

  post(pattern: string, handler: Handler) {
    return this.add('POST', pattern, handler);
  }

  match(method: string, path: string): { handler: Handler; params: Record<string, string> } | 'method-not-allowed' | null {
    let pathMatched = false;
    for (const r of this.routes) {
      const m = r.regex.exec(path);
      if (!m) continue;
      pathMatched = true;
      if (r.method !== method && !(method === 'HEAD' && r.method === 'GET')) continue;
      const params: Record<string, string> = {};
      r.keys.forEach((k, i) => {
        try {
          params[k] = decodeURIComponent(m[i + 1]);
        } catch {
          params[k] = m[i + 1];
        }
      });
      return { handler: r.handler, params };
    }
    return pathMatched ? 'method-not-allowed' : null;
  }

  list() {
    return this.routes.map((r) => `${r.method} ${r.pattern}`);
  }
}
