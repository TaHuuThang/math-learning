// Chạy kiểm thử đơn vị (node:test + tsx). Đặt TEST_DATABASE_URL để chạy thêm kiểm thử với PostgreSQL thật.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = fs
  .readdirSync(path.join(root, 'test/unit'))
  .filter((f) => f.endsWith('.test.ts'))
  .map((f) => path.join('test/unit', f));
const r = spawnSync(process.execPath, ['--import', 'tsx', '--test', '--test-reporter=spec', ...files], { cwd: root, stdio: 'inherit' });
process.exit(r.status ?? 1);
