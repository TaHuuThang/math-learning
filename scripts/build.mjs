// Dựng ứng dụng: máy chủ (dist/server.mjs), mã trình duyệt (dist/public/assets), CSS Tailwind, phông KaTeX.
// Chạy: node scripts/build.mjs   (thêm --dev để không nén mã)
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
const dev = process.argv.includes('--dev');
const dist = path.join(root, 'dist');
const assets = path.join(dist, 'public', 'assets');

const hash = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 10);

async function buildServer() {
  await build({
    entryPoints: [path.join(root, 'src/server/main.ts')],
    outfile: path.join(dist, 'server.mjs'),
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node20',
    jsx: 'automatic',
    loader: { '.sql': 'text' },
    define: { 'process.env.NODE_ENV': '"production"' },
    banner: { js: "import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);" },
    legalComments: 'none',
    sourcemap: dev ? 'inline' : false,
    logLevel: 'warning',
  });
}

async function buildClient() {
  fs.rmSync(path.join(assets, 'chunks'), { recursive: true, force: true });
  const res = await build({
    entryPoints: { app: path.join(root, 'src/client/main.tsx') },
    outdir: assets,
    entryNames: '[name]',
    chunkNames: 'chunks/[name]-[hash]',
    bundle: true,
    splitting: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2020',
    jsx: 'automatic',
    minify: !dev,
    define: { 'process.env.NODE_ENV': dev ? '"development"' : '"production"' },
    legalComments: 'none',
    metafile: true,
    logLevel: 'warning',
  });
  return res.metafile;
}

/** Mã trình duyệt cho bản HTML ngoại tuyến: một tệp IIFE (chạy được khi mở bằng file://). */
async function buildOffline() {
  await build({
    entryPoints: [path.join(root, 'src/static/main.tsx')],
    outfile: path.join(assets, 'ml-offline.js'),
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: 'es2020',
    jsx: 'automatic',
    minify: !dev,
    define: { 'process.env.NODE_ENV': dev ? '"development"' : '"production"' },
    legalComments: 'none',
    logLevel: 'warning',
  });
}

/** Quét lớp Tailwind trong mã nguồn rồi biên dịch bằng API của tailwindcss v4 (không cần công cụ ngoài). */
async function buildCss() {
  const { compile } = await import(require.resolve('tailwindcss').replace(/lib\.js$/, 'lib.mjs'));
  const twDir = path.dirname(require.resolve('tailwindcss/package.json'));
  const candidates = new Set();
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(tsx?|jsx?)$/.test(e.name)) {
        for (const tok of fs.readFileSync(p, 'utf8').split(/[\s"'`{}<>;]+/)) {
          if (tok && tok.length < 120 && /^[!-]?[a-z@\[][\w\-:/.\[\]#%()+=&>*~!,]*$/i.test(tok)) candidates.add(tok);
        }
      }
    }
  };
  walk(path.join(root, 'src'));
  const input = fs.readFileSync(path.join(root, 'src/styles/app.css'), 'utf8');
  const compiler = await compile(input, {
    base: path.join(root, 'src/styles'),
    loadStylesheet: async (id, base) => {
      let file;
      if (id === 'tailwindcss') file = path.join(twDir, 'index.css');
      else if (id.startsWith('tailwindcss/')) file = path.join(twDir, id.slice('tailwindcss/'.length));
      else file = path.resolve(base, id);
      return { path: file, base: path.dirname(file), content: fs.readFileSync(file, 'utf8') };
    },
  });
  let css = compiler.build([...candidates]);
  if (!dev) css = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*\n/g, '\n');
  fs.writeFileSync(path.join(assets, 'app.css'), css);
  return css;
}

function copyKatex() {
  const katexDir = path.dirname(require.resolve('katex/package.json'));
  const out = path.join(assets, 'katex');
  fs.mkdirSync(path.join(out, 'fonts'), { recursive: true });
  fs.copyFileSync(path.join(katexDir, 'dist/katex.min.css'), path.join(out, 'katex.min.css'));
  for (const f of fs.readdirSync(path.join(katexDir, 'dist/fonts'))) {
    if (f.endsWith('.woff2') || f.endsWith('.woff')) fs.copyFileSync(path.join(katexDir, 'dist/fonts', f), path.join(out, 'fonts', f));
  }
}

function copyPublic() {
  const src = path.join(root, 'public');
  if (!fs.existsSync(src)) return;
  for (const f of fs.readdirSync(src)) fs.copyFileSync(path.join(src, f), path.join(assets, f));
}

const t0 = Date.now();
fs.mkdirSync(assets, { recursive: true });
await Promise.all([buildServer(), buildClient(), buildOffline()]);
const css = await buildCss();
copyKatex();
copyPublic();
const manifest = {
  'app.js': hash(fs.readFileSync(path.join(assets, 'app.js'))),
  'app.css': hash(css),
  'katex.css': hash(fs.readFileSync(path.join(assets, 'katex/katex.min.css'))),
};
fs.writeFileSync(path.join(assets, 'manifest.json'), JSON.stringify(manifest, null, 2));
const kb = (f) => (fs.statSync(path.join(assets, f)).size / 1024).toFixed(0) + ' KB';
console.log(`Đã dựng xong trong ${Date.now() - t0} ms – server.mjs ${(fs.statSync(path.join(dist, 'server.mjs')).size / 1024).toFixed(0)} KB, app.js ${kb('app.js')}, ml-offline.js ${kb('ml-offline.js')}, app.css ${kb('app.css')}`);
