import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Đọc tệp .env (nếu có) – không ghi đè biến môi trường đã đặt sẵn. */
export function loadEnvFile(file = path.resolve(process.cwd(), '.env')) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!m || line.trimStart().startsWith('#')) continue;
    let value = m[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}

export interface AppConfig {
  port: number;
  host: string;
  trustProxy: boolean;
  secureCookies: 'auto' | 'always' | 'never';
  autoMigrate: boolean;
  sessionDays: number;
  publicDir: string;
  isProduction: boolean;
}

export function readConfig(): AppConfig {
  const secure = (process.env.COOKIE_SECURE ?? 'auto').toLowerCase();
  return {
    port: Number(process.env.PORT ?? 3000),
    host: process.env.HOST ?? '0.0.0.0',
    trustProxy: process.env.TRUST_PROXY === '1' || process.env.TRUST_PROXY === 'true',
    secureCookies: secure === 'true' || secure === 'always' ? 'always' : secure === 'false' || secure === 'never' ? 'never' : 'auto',
    autoMigrate: process.env.AUTO_MIGRATE !== '0',
    sessionDays: Number(process.env.SESSION_DAYS ?? 30),
    publicDir: process.env.PUBLIC_DIR ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public'),
    isProduction: process.env.NODE_ENV !== 'development',
  };
}
