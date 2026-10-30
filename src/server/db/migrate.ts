import m001 from '../../../migrations/001_init.sql';
import { Database } from './index';

/** Danh sách migration theo thứ tự. Thêm tệp mới: tạo migrations/00N_ten.sql rồi khai báo ở đây. */
export const MIGRATIONS: { version: string; sql: string }[] = [{ version: '001_init', sql: m001 }];

const LOCK_ID = 727_001;

export async function migrate(db: Database, log: (msg: string) => void = console.log): Promise<string[]> {
  const applied: string[] = [];
  await db.withConnection(async (conn) => {
    await conn.query('select pg_advisory_lock($1)', [LOCK_ID]);
    try {
      await conn.simpleQuery(
        'create table if not exists schema_migrations (version text primary key, applied_at timestamptz not null default now())',
      );
      const done = new Set((await conn.query<{ version: string }>('select version from schema_migrations')).rows.map((r) => r.version));
      for (const m of MIGRATIONS) {
        if (done.has(m.version)) continue;
        log(`Áp dụng migration ${m.version}…`);
        await conn.simpleQuery('begin');
        try {
          await conn.simpleQuery(m.sql);
          await conn.query('insert into schema_migrations (version) values ($1)', [m.version]);
          await conn.simpleQuery('commit');
        } catch (err) {
          await conn.simpleQuery('rollback').catch(() => undefined);
          throw err;
        }
        applied.push(m.version);
      }
    } finally {
      await conn.query('select pg_advisory_unlock($1)', [LOCK_ID]).catch(() => undefined);
    }
  });
  return applied;
}
