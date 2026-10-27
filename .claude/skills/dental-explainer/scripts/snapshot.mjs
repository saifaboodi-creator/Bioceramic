// Screenshot an explainer at given seconds and report console errors.
//   node .claude/skills/dental-explainer/scripts/snapshot.mjs explainers/<slug> <outDir> 2 10.5 24
// The engine restores its playhead from localStorage (<persistKey>:t), so we
// set it before load, then pause.
import { createRequire } from 'node:module';
// require() (not import) finds the globally pre-installed Playwright.
const { chromium } = createRequire(import.meta.url)('playwright');
import { readFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [dirArg, outArg, ...times] = process.argv.slice(2);
const dir = resolve(dirArg), out = resolve(outArg);
mkdirSync(out, { recursive: true });
const key = (readFileSync(join(dir, 'scene.jsx'), 'utf8').match(/persistKey="([^"]+)"/) || [])[1];
if (!key) { console.error('scene.jsx needs a persistKey="..." on <Stage>'); process.exit(1); }

const browser = await chromium.launch();
const errors = [];
for (const t of times) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 764 } });
  page.on('pageerror', e => errors.push(`${t}s: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`${t}s: ${m.text()}`); });
  await page.addInitScript(([k, v]) => localStorage.setItem(k + ':t', v), [key, String(t)]);
  await page.goto(pathToFileURL(join(dir, 'index.html')).href);
  await page.keyboard.press('Space');          // pause
  await page.waitForTimeout(700);              // let fonts + entry tweens settle
  const file = join(out, `t${String(t).replace('.', '_')}.png`);
  await page.screenshot({ path: file });
  console.log(`saved ${file}`);
  await page.close();
}
await browser.close();
console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join('\n')}` : 'No console errors.');
