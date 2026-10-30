import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFile, readConfig } from './config';
import { closeDb, getDb } from './db';
import { migrate } from './db/migrate';
import { seedAll } from '../seed/run';
import { createServer } from './http/server';
import { buildRouter } from './routes';
import { createUser, UserInputError } from '../domain/users';
import { exportHtml } from '../static/export';
import { BRAND } from '../shared/brand';

// .env ở thư mục đang đứng, hoặc ở thư mục dự án (cạnh dist/)
loadEnvFile();
loadEnvFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env'));

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : undefined;
}

async function serve() {
  const cfg = readConfig();
  const db = getDb();
  if (cfg.autoMigrate) {
    await migrate(db);
    await seedAll(db);
  }
  const server = createServer(buildRouter(), db, cfg);
  server.headersTimeout = 30_000;
  server.requestTimeout = 60_000;
  server.listen(cfg.port, cfg.host, () => {
    console.log(`${BRAND} đang chạy tại http://${cfg.host === '0.0.0.0' ? 'localhost' : cfg.host}:${cfg.port}`);
  });
  const shutdown = () => {
    console.log('Đang dừng máy chủ…');
    server.close(() => {
      closeDb().finally(() => process.exit(0));
    });
    setTimeout(() => process.exit(0), 5000).unref();
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

async function main() {
  const cmd = process.argv[2] ?? 'serve';
  switch (cmd) {
    case 'serve':
      await serve();
      return;
    case 'migrate': {
      const applied = await migrate(getDb());
      console.log(applied.length ? `Đã áp dụng: ${applied.join(', ')}` : 'Cơ sở dữ liệu đã ở phiên bản mới nhất.');
      break;
    }
    case 'seed':
      await migrate(getDb());
      await seedAll(getDb());
      console.log('Đã nạp dữ liệu khởi tạo (không ghi đè dữ liệu có sẵn).');
      break;
    case 'create-admin': {
      const username = arg('username');
      const password = arg('password');
      const fullName = arg('name') ?? 'Quản trị viên';
      if (!username || !password) {
        console.error('Cách dùng: node dist/server.mjs create-admin --username ten --password matkhau --name "Họ tên"');
        process.exitCode = 1;
        break;
      }
      await migrate(getDb());
      await seedAll(getDb());
      try {
        await createUser(getDb(), { username, password, fullName, role: 'admin' });
        console.log(`Đã tạo quản trị viên "${username}".`);
      } catch (err) {
        if (err instanceof UserInputError) {
          console.error(err.message);
          process.exitCode = 1;
        } else throw err;
      }
      break;
    }
    case 'export-html': {
      const out = path.resolve(arg('out') ?? 'math-learning-html');
      await migrate(getDb());
      await seedAll(getDb());
      await exportHtml(getDb(), out, path.join(readConfig().publicDir, 'assets'));
      break;
    }
    default:
      console.error(`Lệnh không hợp lệ: ${cmd}. Dùng: serve | migrate | seed | create-admin | export-html`);
      process.exitCode = 1;
  }
  await closeDb();
}

main().catch(async (err) => {
  console.error(err instanceof Error ? err.message : err);
  if (process.env.DEBUG) console.error(err);
  await closeDb().catch(() => undefined);
  process.exit(1);
});
