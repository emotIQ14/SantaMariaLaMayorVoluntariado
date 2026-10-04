// Uso: node render.js nombre   (genera nombre.png y nombre.pdf desde nombre.html)
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');
(async () => {
  const name = process.argv[2];
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1200 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.resolve(name + '.html'));
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.screenshot({ path: name + '.png', fullPage: true });
  await p.pdf({ path: name + '.pdf', width: '1080px', height: h + 'px', printBackground: true, pageRanges: '1' });
  console.log('altura', h);
  await b.close();
})();
