import { PgConfig, PgConnection, QueryResult } from './connection';

/** Nhóm kết nối PostgreSQL đơn giản: tối đa `max` kết nối, hàng đợi khi bận. */
export class PgPool {
  private idle: PgConnection[] = [];
  private total = 0;
  private waiters: { resolve: (c: PgConnection) => void; reject: (e: Error) => void }[] = [];
  private ended = false;

  constructor(
    private readonly cfg: PgConfig,
    private readonly max = 10,
  ) {}

  private async open(): Promise<PgConnection> {
    const conn = new PgConnection(this.cfg);
    conn.onClose = () => {
      const i = this.idle.indexOf(conn);
      if (i >= 0) {
        this.idle.splice(i, 1);
        this.total--;
      }
    };
    await conn.connect();
    return conn;
  }

  async acquire(): Promise<PgConnection> {
    if (this.ended) throw new Error('Pool đã đóng');
    while (this.idle.length) {
      const c = this.idle.pop()!;
      if (!c.dead) return c;
      this.total--;
    }
    if (this.total < this.max) {
      this.total++;
      try {
        return await this.open();
      } catch (err) {
        this.total--;
        throw err;
      }
    }
    return new Promise((resolve, reject) => this.waiters.push({ resolve, reject }));
  }

  release(conn: PgConnection) {
    if (conn.dead) {
      this.total--;
      const w = this.waiters.shift();
      if (w) {
        this.total++;
        this.open().then(w.resolve, (err) => {
          this.total--;
          w.reject(err);
        });
      }
      return;
    }
    const w = this.waiters.shift();
    if (w) w.resolve(conn);
    else this.idle.push(conn);
  }

  async query<T = Record<string, unknown>>(text: string, values: unknown[] = []): Promise<QueryResult<T>> {
    const conn = await this.acquire();
    try {
      return await conn.query<T>(text, values);
    } finally {
      this.release(conn);
    }
  }

  async withConnection<R>(fn: (conn: PgConnection) => Promise<R>): Promise<R> {
    const conn = await this.acquire();
    try {
      return await fn(conn);
    } finally {
      this.release(conn);
    }
  }

  async end() {
    this.ended = true;
    for (const w of this.waiters.splice(0)) w.reject(new Error('Pool đã đóng'));
    await Promise.all(this.idle.splice(0).map((c) => c.close()));
    this.total = 0;
  }

  stats() {
    return { total: this.total, idle: this.idle.length, waiting: this.waiters.length };
  }
}
