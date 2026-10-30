import { PgPool } from './pg/pool';
import { PgConnection, parseDatabaseUrl } from './pg/connection';
import { SqlFragment } from './sql';

export { sql } from './sql';
export { PgError } from './pg/protocol';

export interface Queryable {
  /** Trả về mọi dòng. */
  many<T = Record<string, unknown>>(q: SqlFragment): Promise<T[]>;
  /** Trả về dòng đầu tiên hoặc null. */
  one<T = Record<string, unknown>>(q: SqlFragment): Promise<T | null>;
  /** Trả về số dòng bị ảnh hưởng. */
  exec(q: SqlFragment): Promise<number>;
}

export interface Database extends Queryable {
  tx<R>(fn: (t: Queryable) => Promise<R>): Promise<R>;
  raw(text: string): Promise<void>;
  withConnection<R>(fn: (conn: PgConnection) => Promise<R>): Promise<R>;
  close(): Promise<void>;
}

function connectionQueryable(conn: PgConnection): Queryable {
  return {
    async many<T>(q: SqlFragment) {
      const { text, values } = q.compile();
      return (await conn.query<T>(text, values)).rows;
    },
    async one<T>(q: SqlFragment) {
      const { text, values } = q.compile();
      return (await conn.query<T>(text, values)).rows[0] ?? null;
    },
    async exec(q: SqlFragment) {
      const { text, values } = q.compile();
      return (await conn.query(text, values)).rowCount;
    },
  };
}

export function createDatabase(url: string, max = 10): Database {
  const cfg = parseDatabaseUrl(url);
  cfg.statementTimeoutMs = 30_000;
  const pool = new PgPool(cfg, max);
  return {
    async many<T>(q: SqlFragment) {
      const { text, values } = q.compile();
      return (await pool.query<T>(text, values)).rows;
    },
    async one<T>(q: SqlFragment) {
      const { text, values } = q.compile();
      return (await pool.query<T>(text, values)).rows[0] ?? null;
    },
    async exec(q: SqlFragment) {
      const { text, values } = q.compile();
      return (await pool.query(text, values)).rowCount;
    },
    async tx<R>(fn: (t: Queryable) => Promise<R>): Promise<R> {
      return pool.withConnection(async (conn) => {
        await conn.query('begin');
        try {
          const result = await fn(connectionQueryable(conn));
          await conn.query('commit');
          return result;
        } catch (err) {
          if (!conn.dead) await conn.query('rollback').catch(() => undefined);
          throw err;
        }
      });
    },
    async raw(text: string) {
      await pool.withConnection((conn) => conn.simpleQuery(text));
    },
    withConnection: (fn) => pool.withConnection(fn),
    close: () => pool.end(),
  };
}

let instance: Database | null = null;

export function getDb(): Database {
  if (!instance) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('Chưa cấu hình DATABASE_URL. Sao chép .env.example thành .env và điền chuỗi kết nối PostgreSQL.');
    }
    instance = createDatabase(url, Number(process.env.DB_POOL_MAX ?? 10));
  }
  return instance;
}

export async function closeDb() {
  if (instance) {
    await instance.close();
    instance = null;
  }
}
