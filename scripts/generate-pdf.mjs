#!/usr/bin/env node
/**
 * PDF generator v3 — render each pack as a SINGLE PDF in one Chromium pass.
 * This way the CJK font is subset only once per PDF, keeping files small.
 *
 * Strategy per pack:
 *  1. Visit each doc page, extract <main> body HTML
 *  2. Read all dist/_astro/*.css and concatenate
 *  3. Build one big HTML string: <style>{css}</style> + cover + TOC + each doc body
 *  4. page.setContent() and page.pdf()
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { mkdirSync, existsSync, readFileSync, statSync, readdirSync } from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import fs from 'node:fs';
import { extname } from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PDF_OUT = path.join(DIST, 'pdf');

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}
mkdirSync(PDF_OUT, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};

function startServer(port = 4321) {
  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0].replace(/^\/gps-content-promotion/, '');
    if (urlPath === '' || urlPath === '/') urlPath = '/index.html';
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    const filePath = path.join(DIST, urlPath);
    if (!existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404); res.end('404'); return;
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

const ALL_DOCS = [
  { slug: 'overview', title: '制度導讀', titleEn: 'Operating Model Overview', category: 'governance', url: '/gps-content-promotion/governance/overview/' },
  { slug: 'charter', title: '工作章程', titleEn: 'Working Charter', category: 'governance', url: '/gps-content-promotion/governance/charter/' },
  { slug: 'group-cards', title: '六組導覽卡', titleEn: 'Six Groups Guide', category: 'governance', url: '/gps-content-promotion/governance/group-cards/' },
  { slug: 'covenant', title: '工作公約', titleEn: 'Working Covenant', category: 'governance', url: '/gps-content-promotion/governance/covenant/' },
  { slug: 'pocket-cards', title: '口袋卡', titleEn: 'Pocket Cards', category: 'governance', url: '/gps-content-promotion/governance/pocket-cards/' },
  { slug: 'cs01', title: 'CS2-01 文字敘事組', titleEn: 'Text Narrative', category: 'toolkits', url: '/gps-content-promotion/toolkits/cs01/' },
  { slug: 'cs02', title: 'CS2-02 平面設計組', titleEn: 'Graphic Design', category: 'toolkits', url: '/gps-content-promotion/toolkits/cs02/' },
  { slug: 'cs03', title: 'CS2-03 動態攝影組', titleEn: 'Motion Photography', category: 'toolkits', url: '/gps-content-promotion/toolkits/cs03/' },
  { slug: 'cs04', title: 'CS2-04 社群互動組', titleEn: 'Community Engagement', category: 'toolkits', url: '/gps-content-promotion/toolkits/cs04/' },
  { slug: 'cs05', title: 'CS2-05 品牌管理組', titleEn: 'Brand Management', category: 'toolkits', url: '/gps-content-promotion/toolkits/cs05/' },
  { slug: 'cs06', title: 'CS2-06 服務體驗組', titleEn: 'Service Experience', category: 'toolkits', url: '/gps-content-promotion/toolkits/cs06/' },
];

const PACKS = [
  { name: 'full-set', title: 'GPS 內容推廣文件總集（全集）', docs: ALL_DOCS },
  { name: 'governance', title: 'GPS 內容推廣 · 治理文件', docs: ALL_DOCS.filter(d => d.category === 'governance') },
  { name: 'toolkits', title: 'GPS 內容推廣 · 六組 Toolkit', docs: ALL_DOCS.filter(d => d.category === 'toolkits') },
];

function loadAllSiteCSS() {
  const astroDir = path.join(DIST, '_astro');
  if (!existsSync(astroDir)) return '';
  return readdirSync(astroDir)
    .filter(f => f.endsWith('.css'))
    .map(f => readFileSync(path.join(astroDir, f), 'utf-8'))
    .join('\n\n');
}

const PRINT_OVERRIDES = `
/* PDF overrides */
@page { size: A4 portrait; margin: 16mm 14mm 18mm 14mm; }
* { font-family: sans-serif !important; }
body { font-size: 10pt !important; line-height: 1.55 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; margin: 0 !important; }
.no-print, .doc-nav, .skip-link, .site-footer, .controls, .copy-btn, .pagefind-ui, button { display: none !important; }
details, details[open] { display: block !important; }
details > summary { pointer-events: none; }
.project-body, .gate-collapse-body { display: block !important; }
.project, .gate-collapse { page-break-inside: avoid; break-inside: avoid; }
.case-compare { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10pt; }
.copy-block { page-break-inside: avoid; }
.toolkit-hero, .hero { padding: 14mm 12mm !important; }
.toolkit-hero::after, .hero::after { display: none !important; }
.toolkit-body, .gov-doc { padding: 8mm 12mm !important; max-width: none !important; min-height: 0 !important; background: transparent !important; }
h1, h2, h3, h4 { page-break-after: avoid; break-after: avoid; }
pre, code { font-family: monospace !important; }

.pdf-cover {
  height: 297mm; box-sizing: border-box; margin: -16mm -14mm 0 -14mm;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  background: linear-gradient(135deg, #26A7B0 0%, #1F8A92 55%, #574A63 130%);
  color: #fff; padding: 40mm 30mm; text-align: center;
  page-break-after: always; break-after: page;
}
.pdf-cover .eyebrow { font-size: 11pt; letter-spacing: .2em; opacity: .82; margin-bottom: 28pt; text-transform: uppercase; }
.pdf-cover h1 { font-size: 30pt !important; font-weight: 800; margin: 0 0 18pt !important; letter-spacing: -.02em; line-height: 1.2; color: #fff !important; }
.pdf-cover .sub { font-size: 13pt; opacity: .92; margin-bottom: 8pt; }
.pdf-cover .tagline { font-size: 11pt; opacity: .85; margin-top: 28pt; font-style: italic; }
.pdf-cover .meta { font-size: 10pt; opacity: .72; letter-spacing: .1em; margin-top: auto; padding-top: 40pt; }
.pdf-toc { padding: 8mm 12mm; page-break-after: always; break-after: page; }
.pdf-toc h2 { font-size: 22pt; color: #26A7B0; margin: 0 0 18pt; font-weight: 800; }
.pdf-toc-intro { color: #574A63; font-size: 10.5pt; margin-bottom: 24pt; }
.pdf-toc ol { list-style: none; padding: 0; margin: 0; }
.pdf-toc li { display: grid; grid-template-columns: 36pt 1fr auto; align-items: baseline; padding: 11pt 0; border-bottom: 1px dotted #E5E3EA; }
.pdf-toc .num { font-size: 14pt; font-weight: 800; color: #26A7B0; }
.pdf-toc .title { font-size: 12pt; color: #2B2A33; font-weight: 600; }
.pdf-toc .en { font-size: 9.5pt; color: #9D90AD; font-style: italic; }
.pdf-section { page-break-before: always; break-before: page; }
.pdf-section-divider { padding: 10mm 0 5mm; border-bottom: 2px solid #26A7B0; margin: 0 0 8mm; }
.pdf-section-divider .code { font-size: 9pt; letter-spacing: .15em; color: #9D90AD; text-transform: uppercase; }
.pdf-section-divider .title { font-size: 18pt; font-weight: 800; color: #26A7B0; margin: 4pt 0; }
.pdf-section-divider .title-en { font-size: 11pt; color: #574A63; font-style: italic; }
`;

async function buildPackHTML(browser, pack, siteCss) {
  // Extract each doc's body
  const bodies = [];
  for (const doc of pack.docs) {
    process.stdout.write(`  · ${doc.slug}`);
    const page = await browser.newPage();
    await page.goto(`http://localhost:4321${doc.url}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(600);
    await page.evaluate(() => {
      document.querySelectorAll('details').forEach(d => { d.open = true; });
    });
    await page.waitForTimeout(200);
    const body = await page.evaluate(() => {
      const sel = document.querySelector('.toolkit, article.gov-doc, .gov-html-doc');
      if (sel) return sel.outerHTML;
      const clone = document.body.cloneNode(true);
      clone.querySelectorAll('.doc-nav, .skip-link, .site-footer, .toolkit-footer').forEach(n => n.remove());
      return clone.innerHTML;
    });
    bodies.push({ doc, body });
    await page.close();
  }
  process.stdout.write('\n');

  const tocItems = pack.docs.map((d, i) =>
    `<li><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="title">${d.title}</span><span class="en">${d.titleEn}</span></li>`
  ).join('');

  const sections = bodies.map(({ doc, body }) => `
    <section class="pdf-section" id="${doc.slug}">
      <div class="pdf-section-divider">
        <div class="code">${doc.slug.toUpperCase()}</div>
        <div class="title">${doc.title}</div>
        <div class="title-en">${doc.titleEn}</div>
      </div>
      ${body}
    </section>
  `).join('\n');

  return `<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="UTF-8">
<title>${pack.title}</title>
<style>${siteCss}\n${PRINT_OVERRIDES}</style>
</head><body>
<div class="pdf-cover">
  <div class="eyebrow">GPS 內容推廣 · Document Set</div>
  <h1>${pack.title}</h1>
  <p class="sub">五份治理文件加六本組別 Toolkit</p>
  <p class="sub">螢幕閱讀版 · 字型不 embed</p>
  <div class="tagline">Before you need it. · 在您需要之前。</div>
  <div class="meta">資訊更新 2026-06 · 由現任主理人擬定 · ${pack.docs.length} 份文件</div>
</div>
<nav class="pdf-toc">
  <h2>目錄</h2>
  <p class="pdf-toc-intro">本 PDF 包含 ${pack.docs.length} 份文件，依下列順序排列。可使用 PDF 閱讀軟體的書籤側欄快速跳轉至各章。</p>
  <ol>${tocItems}</ol>
</nav>
${sections}
</body></html>`;
}

(async () => {
  console.log('Starting local server on :4321...');
  const server = await startServer(4321);
  console.log('Launching Chromium...');
  const browser = await chromium.launch();
  const siteCss = loadAllSiteCSS();
  console.log(`Loaded ${(siteCss.length / 1024).toFixed(0)} KB of site CSS\n`);

  try {
    for (const pack of PACKS) {
      console.log(`Building ${pack.name}.pdf (${pack.docs.length} docs)`);
      const html = await buildPackHTML(browser, pack, siteCss);
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      await page.emulateMedia({ media: 'print' });
      await page.waitForTimeout(400);
      const outPath = path.join(PDF_OUT, `${pack.name}.pdf`);
      await page.pdf({
        path: outPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '16mm', right: '14mm', bottom: '18mm', left: '14mm' },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `<div style="font-family: sans-serif; font-size: 8pt; color: #9D90AD; width: 100%; text-align: center; padding: 0 14mm;">
          <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>`,
      });
      await page.close();
      const sz = (statSync(outPath).size / 1024 / 1024).toFixed(2);
      console.log(`  ✓ ${pack.name}.pdf — ${sz} MB\n`);
    }
    console.log('✓ All PDFs generated.');
  } finally {
    await browser.close();
    server.close();
  }
})();
