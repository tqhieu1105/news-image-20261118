import { readFileSync, writeFileSync, mkdtempSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { createFrontPage } from './frontpage.mjs';

const paper = '#f4eddd';
const fontRoot = process.env.NEWS_FONT_ROOT ?? '/usr/share/fonts/truetype/sand-box/google';
const barlow = readFileSync(join(fontRoot, 'Barlow Condensed/BarlowCondensed-Bold.ttf')).toString('base64');
const baskerville = readFileSync(join(fontRoot, 'Libre Baskerville/LibreBaskerville-VariableFont_wght.ttf')).toString('base64');
const fontFaces = `
@font-face{font-family:Barlow;src:url(data:font/ttf;base64,${barlow}) format('truetype');font-weight:700}
@font-face{font-family:Baskerville;src:url(data:font/ttf;base64,${baskerville}) format('truetype');font-weight:100 900}
`;
const svg = createFrontPage(fontFaces);

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
      return [...document.querySelectorAll('.fit')].map(group => {
        const texts = [...group.querySelectorAll('text')];
        let size = parseFloat(getComputedStyle(group).fontSize);
        const limit = Number(group.dataset.maxWidth);
        while (Math.max(...texts.map(text => text.getComputedTextLength())) > limit && size > 14) {
          size -= .25; group.style.fontSize = size + 'px';
        }
        const maxWidth = Math.max(...texts.map(text => text.getComputedTextLength()));
        return {id: Number(group.dataset.id), kind: group.dataset.kind, limit, fontSize: size, maxWidth};
      });
    })`,
    awaitPromise: true, returnByValue: true,
  });
  if (typography.exceptionDetails) throw new Error(JSON.stringify(typography.exceptionDetails));
  const metrics = typography.result.value;
  const overflow = metrics.filter(item => item.maxWidth > item.limit + .1);
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
  console.log(JSON.stringify({ renderer: 'headless Chromium / HTML + SVG', stories: metrics.length, largePanels: metrics.filter(m => m.kind !== 'brief').length, minLargeHeadlinePx: Math.min(...metrics.filter(m => m.kind === 'card').map(m => m.fontSize)), minBriefPx: Math.min(...metrics.filter(m => m.kind === 'brief').map(m => m.fontSize)), image: resolve('entry.png'), preview: previewPath }, null, 2));
} finally {
  if (socket) socket.close();
  chrome.kill('SIGTERM');
  await new Promise(resolve => chrome.once('exit', resolve));
  rmSync(scratch, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
}
