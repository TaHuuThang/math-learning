import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDatabase, sql } from '../../src/server/db';
import { parseArrayLiteral } from '../../src/server/db/pg/types';
import { parseDatabaseUrl } from '../../src/server/db/pg/connection';

const url = process.env.TEST_DATABASE_URL;

test('phân tích DATABASE_URL', () => {
  const c = parseDatabaseUrl('postgres://u%40x:p%3Aw@db.example.com:6543/hoc?sslmode=require');
  assert.equal(c.user, 'u@x');
  assert.equal(c.password, 'p:w');
  assert.equal(c.host, 'db.example.com');
  assert.equal(c.port, 6543);
  assert.equal(c.database, 'hoc');
  assert.deepEqual(c.ssl, { rejectUnauthorized: false });
  assert.equal(parseDatabaseUrl('postgres://a:b@h/d').ssl, false);
});

test('đọc mảng PostgreSQL', () => {
  assert.deepEqual(parseArrayLiteral('{1,2,3}'), ['1', '2', '3']);
  assert.deepEqual(parseArrayLiteral('{"a b","c\\"d",NULL}'), ['a b', 'c"d', null]);
  assert.deepEqual(parseArrayLiteral('{}'), []);
});

test('SQL template: giá trị luôn thành tham số', () => {
  const name = "x'; drop table users; --";
  const inner = sql`role = ${'teacher'}`;
  const q = sql`select * from users where name = ${name} and ${inner} limit ${5}`.compile();
  assert.equal(q.text, 'select * from users where name = $1 and role = $2 limit $3');
  assert.deepEqual(q.values, [name, 'teacher', 5]);
  const joined = sql`select ${sql.join([sql`${1}`, sql`${2}`])}`.compile();
  assert.equal(joined.text, 'select $1, $2');
});

test('kết nối PostgreSQL thật: SCRAM, kiểu dữ liệu, giao dịch, lỗi', { skip: !url }, async () => {
  for (const mode of ['disable', 'require']) {
    const db = createDatabase(`${url}${url!.includes('?') ? '&' : '?'}sslmode=${mode}`, 3);
    try {
      const row = await db.one<{ n: number; big: number; t: boolean; j: { a: number[] }; d: Date; arr: number[]; txt: string; nul: null; num: number }>(
        sql`select 1::int as n, 9007199254::bigint as big, true as t, ${{ a: [1, 2] }}::jsonb as j,
            '2026-10-30 22:05:01.5+07'::timestamptz as d, ${[3, 4, 5]}::int[] as arr, ${'Tiếng Việt có dấu ✓'}::text as txt,
            null as nul, 7.25::numeric as num`,
      );
      assert.ok(row);
      assert.equal(row.n, 1);
      assert.equal(row.big, 9007199254);
      assert.equal(row.t, true);
      assert.deepEqual(row.j, { a: [1, 2] });
      assert.equal(row.d.toISOString(), '2026-10-30T15:05:01.500Z');
      assert.deepEqual(row.arr, [3, 4, 5]);
      assert.equal(row.txt, 'Tiếng Việt có dấu ✓');
      assert.equal(row.nul, null);
      assert.equal(row.num, 7.25);

      await db.raw('create temporary table if not exists _t (id int primary key, v text)');
      // bảng tạm chỉ tồn tại trên một kết nối → dùng bảng thường có tên riêng
      await db.raw(`drop table if exists _pg_driver_test; create table _pg_driver_test (id int primary key, v text)`);
      await db.exec(sql`insert into _pg_driver_test values (${1}, ${'a'})`);
      await assert.rejects(
        db.tx(async (t) => {
          await t.exec(sql`insert into _pg_driver_test values (${2}, ${'b'})`);
          await t.exec(sql`insert into _pg_driver_test values (${1}, ${'trùng'})`);
        }),
        (err: Error & { code?: string }) => err.code === '23505',
      );
      const count = await db.one<{ c: number }>(sql`select count(*)::int as c from _pg_driver_test`);
      assert.equal(count?.c, 1, 'giao dịch lỗi phải được rollback');
      // kết nối vẫn dùng được sau lỗi
      const many = await Promise.all(Array.from({ length: 12 }, (_, i) => db.one<{ x: number }>(sql`select ${i}::int as x`)));
      assert.deepEqual(many.map((r) => r?.x), Array.from({ length: 12 }, (_, i) => i));
      await db.raw('drop table _pg_driver_test');
    } finally {
      await db.close();
    }
  }
});

test('sai mật khẩu báo lỗi rõ ràng', { skip: !url }, async () => {
  const bad = url!.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:sai-mat-khau@');
  const db = createDatabase(bad, 1);
  await assert.rejects(db.one(sql`select 1`), /password authentication failed|xác thực/);
  await db.close();
});
