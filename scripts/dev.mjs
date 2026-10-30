// Chế độ phát triển: dựng lại và khởi động lại máy chủ khi sửa mã trong src/ hoặc migrations/.
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let server = null;
let timer = null;

function rebuild() {
  const r = spawnSync(process.execPath, [path.join(root, 'scripts/build.mjs'), '--dev'], { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) {
    console.log('Dựng lỗi – sửa mã rồi lưu lại tệp.');
    return;
  }
  if (server) server.kill();
  server = spawn(process.execPath, [path.join(root, 'dist/server.mjs'), 'serve'], { cwd: root, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' } });
}

for (const dir of ['src', 'migrations']) {
  fs.watch(path.join(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 150);
  });
}
rebuild();
process.on('SIGINT', () => {
  server?.kill();
  process.exit(0);
});
