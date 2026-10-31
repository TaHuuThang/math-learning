/** Tạo public/favicon.svg từ logo trong src/shared/logo.ts:  npx tsx scripts/make-favicon.ts */
import fs from 'node:fs';
import path from 'node:path';
import { faviconSvg } from '../src/shared/logo';
import { AUTHOR, BRAND } from '../src/shared/brand';

const out = path.resolve(import.meta.dirname, '../public/favicon.svg');
fs.writeFileSync(out, faviconSvg(`${BRAND} – © ${AUTHOR}`));
console.log('Đã tạo', out);
