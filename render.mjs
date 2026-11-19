import { readFileSync, writeFileSync, mkdtempSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { stories, sections } from './stories.mjs';

// All illustration geometry is original. Icons share a restrained two-ink vocabulary.
const ink = '#17272b';
const accent = '#a53827';
const paper = '#f5f1e7';
const muted = '#b6afa0';
const path = (d, color = ink, fill = 'none') => `<path d="${d}" stroke="${color}" fill="${fill}"/>`;
const circle = (x, y, r, color = ink, fill = 'none') => `<circle cx="${x}" cy="${y}" r="${r}" stroke="${color}" fill="${fill}"/>`;
const rect = (x, y, w, h, color = ink, fill = 'none', radius = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" stroke="${color}" fill="${fill}"/>`;
const label = (x, y, text, size = 18, color = ink) => `<text x="${x}" y="${y}" fill="${color}" stroke="none" text-anchor="middle" font-family="Barlow" font-size="${size}" font-weight="700">${text}</text>`;
const head = (x, y, r = 4) => circle(x, y, r);
const wave = (y) => path(`M3 ${y}q5-4 10 0t10 0t10 0t10 0`);
const tank = () => rect(3, 27, 39, 12, ink, 'none', 6) + path('M10 27l5-10h17l5 10M23 17V12h18M10 33h25') + circle(11, 33, 2) + circle(34, 33, 2);
const atom = () => `<g transform="translate(24 24)"><ellipse rx="21" ry="8"/><ellipse rx="21" ry="8" transform="rotate(60)"/><ellipse rx="21" ry="8" transform="rotate(120)"/></g>` + circle(24, 24, 3, accent, accent);
const globe = () => circle(24, 24, 20) + path('M4 24h40M24 4c-13 11-13 29 0 40M24 4c13 11 13 29 0 40M8 12q16 10 32 0M8 36q16-10 32 0');
const document = () => path('M9 4h23l8 8v32H9zM32 4v9h8M15 21h18M15 28h18M15 35h11');
const chip = () => rect(10, 10, 28, 28, ink, 'none', 3) + path('M17 3v7M25 3v7M33 3v7M17 38v7M25 38v7M33 38v7M3 17h7M3 25h7M3 33h7M38 17h7M38 25h7M38 33h7');
const gavel = () => path('M8 8l7-7 16 16-7 7zM13 5l16 16M21 21l-5 5M16 26l-9 9q-3 3 0 5t5-1l10-10M25 40h19v5H22');
const icons = {
  summit: () => head(10, 16) + head(25, 10) + head(39, 16) + path('M2 34v-7q8-9 16 0M15 29v-8q10-10 20 0v8M32 27q8-9 15 0v7M3 35h42v7H3z') + path('M25 0v5M25 0h12v6H25', accent),
  euroshield: () => path('M24 3L43 10v15q0 12-19 21Q5 37 5 25V10z') + label(24, 32, '€', 30, accent),
  missile: () => path('M13 30L35 8l9-3-3 9-22 22zM13 30l-8 2 5-10 11-2M19 36l-2 8 10-5 2-11') + circle(33, 15, 3, accent) + path('M8 38l-6 7M12 42l-3 4M4 34l-3 3', accent),
  tankclock: () => `<g transform="translate(0 7) scale(.87)">${tank()}</g>` + circle(35, 12, 11, accent, paper) + path('M35 5v8l5 3', accent),
  peacereport: () => document() + `<g fill="${paper}">${path('M5 34q8-13 14-11l4 8q8-8 17-6l-10 10q-9 6-18 2l-7 4z', accent, paper)}</g>` + path('M38 23l5-3M39 24l5 1', accent),
  tank: () => tank() + path('M4 44h39', accent) + path('M43 9l4-3M43 15h4', accent),
  border: () => path('M24 2v6m0 5v6m0 5v6m0 5v11', accent) + head(10, 17) + head(38, 17) + path('M3 39V28q7-10 14 0v11M31 39V28q7-10 14 0v11M6 40v6M14 40v6M34 40v6M42 40v6M3 12V3h13v7H3M45 12V3H32v7h13'),
  asean: () => circle(22, 25, 18) + path('M15 36V15m5 23V11m5 27V11m5 25V15M12 23l3 5M17 19l3 5M28 19l-3 5M33 23l-3 5') + path('M34 4h11v11M44 5L31 18', accent),
  atom,
  pact: () => path('M2 16l10-7 9 9-10 18-9-6zM46 16L36 9l-12 6q-10-1-10 5 1 6 9 0l13 12-9 10-16-10M27 42l-8-8M32 37l-8-8M37 32l-7-7M36 32l10-5') + path('M4 13l6 4M44 13l-6 4', accent),
  gavel,
  speaker: () => path('M4 43h40M8 41V23h32v18M4 23h40L24 10zM13 28v10m7-10v10m8-10v10m7-10v10M24 10V2h13v6H24') + path('M15 46h18', accent),
  construction: () => path('M10 45V5M4 45h14M4 5h37L10 16M10 5l23 11M37 6v17M37 23v5q0 5-5 5M22 45V35h20v10') + path('M25 18v10M31 18v10', accent),
  micjustice: () => rect(8, 3, 13, 25, ink, 'none', 7) + path('M3 18v5q0 11 12 11t12-11v-5M15 35v9M6 44h18M9 11h10M9 17h10') + path('M30 29l5-5 11 11-5 5zM35 36l-7 9', accent),
  sanctions: () => rect(3, 7, 41, 31) + path('M8 13h29M8 31h12') + circle(25, 25, 17, accent, paper) + path('M14 36l22-22', accent) + label(25, 30, '$', 23),
  prison: () => rect(5, 5, 38, 39) + path('M14 6v37M24 6v37M34 6v37M6 14h36M6 35h36') + circle(24, 24, 5, accent, paper),
  drought: () => circle(33, 12, 8, accent) + path('M33 0v2M33 22v3M21 12h-3M43 12h4M24 3l2 2M42 3l-2 2M24 21l2-2', accent) + path('M2 36q11-7 21-2t23-1M4 44h40M19 34l-3 6 4 5M33 35l3 9M16 40l-9-1M37 39l8-1'),
  mine: () => path('M2 27L17 7l15 19M10 27l7-9 5 7M17 7l5 7h-9M4 30h24M3 36h20M3 42h20') + path('M35 21q-15 18-5 23 12 6 15-4 2-6-10-19z', accent) + path('M34 40q5 0 5-5', accent),
  boat: () => path('M3 26h41L36 38H12zM15 24V7l21 17H15M15 7V2') + wave(42) + path('M4 11l5 4M6 7l3 3', accent),
  child: () => head(24, 10, 7) + path('M14 43V25q10-11 20 0v18M24 25v20M13 28L5 36M35 28l8 8M17 45h14') + path('M2 7h10M7 2v10', accent),
  inflation: () => path('M3 45h42M8 40V29h7v11M21 40V23h7v17M34 40V16h7v24') + path('M6 22L37 4M27 3h11v11', accent),
  wages: () => path('M2 45h44M6 40V28h9v12M20 40V21h9v19M34 40V11h9v29', accent) + path('M4 21l35-15M32 3l8 2-3 8') + label(14, 17, '$', 18),
  electricity: () => path('M9 3v13M22 3v13M3 16h25v10q0 10-12 10v10M8 22h15') + path('M36 3l-8 22h10l-6 21 15-27H36z', accent),
  chipprice: () => chip() + label(24, 31, '$', 25, accent),
  spy: () => path('M2 24Q24 1 46 24 24 47 2 24z') + circle(24, 24, 10) + circle(24, 24, 3, accent, accent) + path('M8 5l6 6M40 5l-6 6M8 43l6-6M40 43l-6-6', accent),
  bankai: () => path('M2 15L24 3l22 12H2M5 42h38M3 46h42M10 20v15M20 20v15M30 20v6M40 20v6') + rect(28, 27, 17, 15, accent, paper, 3) + circle(33, 33, 1, accent, accent) + circle(40, 33, 1, accent, accent) + path('M32 38h8M37 27v-4', accent),
  aihearing: () => `<g transform="translate(20 1) scale(.57)">${chip()}</g>` + path('M7 18l6-6 17 17-6 6zM10 15l17 17M21 31L8 44M25 43h20', accent) + label(34, 19, 'AI', 15),
  sciencevote: () => `<g transform="translate(0 1) scale(.86)">${atom()}</g>` + circle(35, 36, 10, accent, paper) + path('M28 43l14-14', accent),
  birdflu: () => path('M8 25q-5 6-4 12 4 9 18 7 15-1 16-15V15q0-9-9-9-7 1-7 9v5Q12 11 8 18l9 13q6 5 10-1M14 44v3M27 44v3M38 14l8 4-8 4') + circle(32, 13, 1, ink, ink) + path('M27 5q-3-6 1-5l3 4 3-4q5-1 2 6', accent),
  orbital: () => path('M3 43q18-12 42 0M10 45q14-6 26 0') + `<g transform="rotate(-28 24 18)">${rect(17, 11, 13, 13)}${rect(1, 9, 11, 17)}${rect(35, 9, 11, 17)}${path('M12 17h5M30 17h5M23 24v6')}</g>` + path('M21 31l-7 8M27 31l7 8', accent) + circle(24, 40, 4, accent),
  stocktake: () => globe() + circle(35, 35, 11, accent, paper) + path('M29 35l4 4 8-10', accent),
  fossiltreaty: () => path('M18 3Q-2 27 6 38q12 14 24-1Q40 26 18 3z') + rect(27, 18, 18, 26, accent, paper) + path('M31 25h10M31 31h10M31 37h6', accent),
  egypt: () => path('M1 36L17 9l16 27zM17 9l6 27M24 36l13-19 10 19M1 43h45') + circle(34, 12, 9, accent, paper) + path('M40 19l6 8', accent) + label(34, 16, '€', 14, accent),
  carbon: () => path('M16 2L3 18h7L1 31h13v14h6V31h13l-9-13h7z') + rect(28, 21, 18, 24, accent, paper) + path('M32 27h10M32 33h10', accent) + circle(37, 40, 3, accent),
  microbe: () => circle(20, 21, 13) + path('M20 2v6M20 34v7M1 21h6M33 21h7M7 7l5 5M29 31l5 5M7 35l5-5M30 11l5-5') + circle(17, 17, 2) + circle(24, 25, 2) + `<g transform="rotate(36 36 36)">${rect(30, 23, 12, 24, accent, paper, 6)}${path('M30 35h12', accent)}</g>`,
  brainpill: () => path('M23 9q-9-10-14 2-9 3-6 12-6 8 3 13 1 9 12 6l5-4V9M23 9q9-10 14 2 9 3 6 12M7 15q7-3 9 3M5 28q11 1 10 11M14 8l1 6M23 25l-7-2M30 9v11') + `<g transform="rotate(43 35 35)">${rect(28, 21, 14, 26, accent, paper, 7)}${path('M28 34h14', accent)}</g>`,
  voyager: () => path('M5 7q0 24 23 24L5 7zM9 26l-5 13M12 31l13 12M21 29l8-9M26 18l6-6M29 7l8 8M31 21l12 9-5 7-12-9M23 37l-6 6') + circle(28, 19, 3, accent, accent) + path('M40 2v7M36 6h8', accent),
  cricket: () => path('M8 28L23 6l8 6-15 23zM7 29l10 7-7 10-9-7zM31 23v21M37 23v21M43 23v21M29 20h16') + circle(36, 8, 6, accent) + path('M34 3q6 5 3 10', accent),
  book: () => path('M3 7q12-7 21 0 9-7 21 0v34q-12-7-21 0-9-7-21 0zM24 7v34M8 14h10M8 20h10M30 31h9') + label(35, 25, 'Aa', 17, accent),
  aid: () => rect(4, 14, 40, 30) + path('M4 14l9-10h23l8 10M24 4v10M17 29h14M24 22v14', accent) + path('M2 46L46 2'),
};

const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const fontRoot = process.env.NEWS_FONT_ROOT ?? '/usr/share/fonts/truetype/sand-box/google';
const barlow = readFileSync(join(fontRoot, 'Barlow Condensed/BarlowCondensed-Bold.ttf')).toString('base64');
const baskerville = readFileSync(join(fontRoot, 'Libre Baskerville/LibreBaskerville-VariableFont_wght.ttf')).toString('base64');
const definitions = `<defs><style>
  @font-face{font-family:Barlow;src:url(data:font/ttf;base64,${barlow}) format('truetype');font-weight:700}
  @font-face{font-family:Baskerville;src:url(data:font/ttf;base64,${baskerville}) format('truetype');font-weight:100 900}
  .headline{font-family:Barlow;font-weight:700;font-size:31px;fill:${ink}}
  .small{font-family:Barlow;font-weight:700}
</style></defs>`;

const rules = [];
const columns = [];
for (let col = 0; col < 4; col++) {
  const left = 22 + col * 245;
  columns.push(`<rect x="${left}" y="157" width="245" height="26" fill="${ink}"/>
    <text class="small" x="${left + 122.5}" y="176" fill="${paper}" font-size="19" letter-spacing=".9" text-anchor="middle">${sections[col]}</text>`);
  if (col) rules.push(`<path d="M${left} 184V996" stroke="${muted}" stroke-width="1"/>`);
  for (let row = 0; row < 10; row++) {
    const story = stories[col * 10 + row];
    const top = 185 + row * 81;
    if (!icons[story.icon]) throw new Error(`Missing illustration for story ${story.id}`);
    columns.push(`<g class="story" data-id="${story.id}">
      <title>${escape(story.lines.join(' '))}</title>
      <g transform="translate(${left + 6} ${top + 18}) scale(.88)" stroke="${ink}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" fill="none">${icons[story.icon]()}</g>
      <g class="headline" data-max-width="185">
        <text x="${left + 53}" y="${top + 33}">${escape(story.lines[0])}</text>
        <text x="${left + 53}" y="${top + 65}">${escape(story.lines[1])}</text>
      </g>
    </g>`);
    if (row !== 9) rules.push(`<path d="M${left + 7} ${top + 80}h231" stroke="${muted}" stroke-width=".7"/>`);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="World news of Wednesday 18 November 2026: forty illustrated reports">
  ${definitions}
  <rect width="1024" height="1024" fill="${paper}"/>
  <path d="M22 12h980M22 131h980" stroke="${ink}" stroke-width="3"/>
  <text x="22" y="44" font-family="Baskerville" font-size="29" font-weight="700" fill="${ink}">THE WORLD IN ONE DAY</text>
  <text class="small" x="1002" y="40" text-anchor="end" font-size="21" fill="${accent}" letter-spacing="1.4">40 ILLUSTRATED REPORTS</text>
  <text class="small" x="512" y="116" font-size="87" text-anchor="middle" letter-spacing="2" fill="${accent}">18 NOVEMBER 2026</text>
  <text class="small" x="512" y="150" font-size="18" text-anchor="middle" letter-spacing="2" fill="${ink}">WEDNESDAY · GLOBAL EDITION · EVENTS &amp; FIRST REPORTS</text>
  ${rules.join('\n')}
  ${columns.join('\n')}
  <path d="M22 998h980" stroke="${ink}" stroke-width="3"/>
  <path d="M22 1006h980" stroke="${accent}" stroke-width="1"/>
</svg>`;

const scratch = mkdtempSync(join(tmpdir(), 'news1118-chromium-'));
const html = join(scratch, 'front-page.html');
writeFileSync(html, `<!doctype html><html lang="en"><meta charset="utf-8"><title>18 November 2026 — The World in One Day</title><style>html,body{margin:0;padding:0;width:1024px;height:1024px;overflow:hidden;background:${paper}}svg{display:block}</style>${svg}</html>`);

class DevTools {
  constructor(socket) {
    this.socket = socket;
    this.pending = new Map();
    this.listeners = new Map();
    this.sequence = 0;
    socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (pending) {
          this.pending.delete(message.id);
          if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
          else pending.resolve(message.result);
        }
      } else if (this.listeners.has(message.method)) {
        const listener = this.listeners.get(message.method);
        this.listeners.delete(message.method);
        listener(message.params);
      }
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.sequence;
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  once(method) { return new Promise(resolve => this.listeners.set(method, resolve)); }
}

const chrome = spawn(process.env.CHROME ?? 'google-chrome', [
  '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu',
  '--hide-scrollbars', '--disable-background-networking', '--disable-extensions',
  '--no-first-run', '--remote-debugging-port=0', `--user-data-dir=${join(scratch, 'profile')}`, 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] });
let browserErrors = '';
chrome.stderr.on('data', chunk => { browserErrors = (browserErrors + chunk).slice(-4000); });
let socket;
try {
  const activePort = join(scratch, 'profile', 'DevToolsActivePort');
  for (let i = 0; !existsSync(activePort); i++) {
    if (i > 150 || chrome.exitCode !== null) throw new Error(`Chromium failed to start: ${browserErrors}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  const port = readFileSync(activePort, 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find(target => target.type === 'page');
  if (!target) throw new Error('No Chromium page target was created.');
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  const browser = new DevTools(socket);
  await browser.send('Page.enable');
  await browser.send('Emulation.setDeviceMetricsOverride', { width: 1024, height: 1024, deviceScaleFactor: 1, mobile: false });
  const loaded = browser.once('Page.loadEventFired');
  await browser.send('Page.navigate', { url: pathToFileURL(html).href });
  await loaded;
  const typography = await browser.send('Runtime.evaluate', {
    expression: `document.fonts.ready.then(() => {
      return [...document.querySelectorAll('.headline')].map(group => {
        const texts = [...group.querySelectorAll('text')];
        let size = 31;
        while (Math.max(...texts.map(text => text.getComputedTextLength())) > 185 && size > 25) {
          size -= .25; group.style.fontSize = size + 'px';
        }
        const maxWidth = Math.max(...texts.map(text => text.getComputedTextLength()));
        return {id: Number(group.parentNode.dataset.id), fontSize: size, maxWidth};
      });
    })`,
    awaitPromise: true, returnByValue: true,
  });
  if (typography.exceptionDetails) throw new Error(JSON.stringify(typography.exceptionDetails));
  const metrics = typography.result.value;
  const overflow = metrics.filter(item => item.maxWidth > 185.1);
  if (overflow.length) throw new Error(`Headline overflow: ${JSON.stringify(overflow)}`);
  const screenshot = await browser.send('Page.captureScreenshot', {
    format: 'png', captureBeyondViewport: false,
    clip: { x: 0, y: 0, width: 1024, height: 1024, scale: 1 },
  });
  writeFileSync(new URL('./entry.png', import.meta.url), Buffer.from(screenshot.data, 'base64'));
  await browser.send('Runtime.evaluate', { expression: `document.querySelector('svg').style.width='300px'; document.querySelector('svg').style.height='300px'` });
  await browser.send('Emulation.setDeviceMetricsOverride', { width: 300, height: 300, deviceScaleFactor: 1, mobile: false });
  const preview = await browser.send('Page.captureScreenshot', {
    format: 'png', captureBeyondViewport: false,
    clip: { x: 0, y: 0, width: 300, height: 300, scale: 1 },
  });
  const previewPath = join(tmpdir(), 'news1118-preview-300.png');
  writeFileSync(previewPath, Buffer.from(preview.data, 'base64'));
  writeFileSync(join(tmpdir(), 'news1118-typography.json'), JSON.stringify(metrics, null, 2));
  console.log(JSON.stringify({ renderer: 'headless Chromium / HTML + SVG', stories: metrics.length, minHeadlinePx: Math.min(...metrics.map(m => m.fontSize)), image: resolve('entry.png'), preview: previewPath }, null, 2));
} finally {
  if (socket) socket.close();
  chrome.kill('SIGTERM');
  await new Promise(resolve => chrome.once('exit', resolve));
  rmSync(scratch, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
}
