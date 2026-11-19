import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { stories } from './stories.mjs';
import { leadId, cardIds, briefIds } from './frontpage.mjs';

assert.equal(stories.length, 50);
assert.equal(new Set(stories.map(story => story.id)).size, 50);
assert.equal(cardIds.length, 12);
assert.equal(briefIds.length, 37);
assert.equal(new Set([leadId, ...cardIds, ...briefIds]).size, 50);
assert([leadId, ...cardIds, ...briefIds].every(id => stories.some(story => story.id === id)));
for (const [index, story] of stories.entries()) {
  assert.equal(story.id, index + 1);
  assert.equal(story.lines.length, 2);
  assert(story.lines.every(line => line.trim().length > 0));
  assert(['event', 'first_report'].includes(story.basis));
  assert(story.timing.length > 20 && story.sources.length >= 1);
  for (const source of story.sources) assert.equal(new URL(source).protocol, 'https:');
}

const png = readFileSync(new URL('./entry.png', import.meta.url));
assert(png.length < 1048576, 'PNG must be under one MiB.');
assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
const crc32 = (bytes) => {
  let value = 0xffffffff;
  for (const byte of bytes) {
    value ^= byte;
    for (let bit = 0; bit < 8; bit++) value = (value >>> 1) ^ ((value & 1) ? 0xedb88320 : 0);
  }
  return (value ^ 0xffffffff) >>> 0;
};
let offset = 8;
let header;
let ended = false;
const compressed = [];
const chunks = [];
while (offset < png.length) {
  assert(offset + 12 <= png.length, 'Truncated chunk.');
  const length = png.readUInt32BE(offset);
  const end = offset + 12 + length;
  assert(end <= png.length, 'Chunk extends beyond the file.');
  const type = png.toString('ascii', offset + 4, offset + 8);
  const data = png.subarray(offset + 8, offset + 8 + length);
  assert.equal(crc32(png.subarray(offset + 4, end - 4)), png.readUInt32BE(end - 4), `CRC mismatch: ${type}`);
  chunks.push(type);
  if (type === 'IHDR') {
    assert.equal(header, undefined, 'Duplicate header.');
    assert.equal(offset, 8);
    assert.equal(length, 13);
    header = data;
  }
  if (type === 'IDAT') compressed.push(data);
  if (type === 'IEND') {
    assert.equal(length, 0);
    assert.equal(end, png.length, 'Trailing data after IEND.');
    ended = true;
  }
  offset = end;
}
assert(header && ended && compressed.length);
const width = header.readUInt32BE(0);
const height = header.readUInt32BE(4);
assert.equal(width, 1024);
assert.equal(height, 1024);
assert.equal(header[8], 8, 'Expect eight-bit channels.');
assert.equal(header[10], 0);
assert.equal(header[11], 0);
assert.equal(header[12], 0, 'Expect a non-interlaced image.');
const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[header[9]];
assert(channels, 'Unsupported screenshot color model.');
const raw = inflateSync(Buffer.concat(compressed));
const stride = width * channels + 1;
assert.equal(raw.length, stride * height, 'PNG data must cover every pixel.');
for (let row = 0; row < height; row++) assert(raw[row * stride] <= 4, 'Invalid row filter.');

// Exercise the actual entrypoint twice, from a different working directory.
const scratch = mkdtempSync(join(tmpdir(), 'news1118-copy-test-'));
try {
  for (let run = 1; run <= 2; run++) {
    const directory = join(scratch, `run-${run}`);
    const processResult = spawnSync(process.execPath, [fileURLToPath(new URL('./main.ts', import.meta.url))], {
      cwd: tmpdir(), env: { ...process.env, MAKEFUN_OUTPUT_DIR: directory }, encoding: 'utf8', timeout: 5000,
    });
    assert.equal(processResult.status, 0, processResult.stderr || String(processResult.error));
    assert.deepEqual(readFileSync(join(directory, 'entry.png')), png, 'Output differs from committed image.');
  }
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
console.log(JSON.stringify({ valid: true, width, height, bytes: png.length, validatedChunks: chunks.length, stories: stories.length, largeIllustratedPanels: 1 + cardIds.length, compactBriefs: briefIds.length, offlineRunsIdentical: true, sha256: createHash('sha256').update(png).digest('hex') }, null, 2));
