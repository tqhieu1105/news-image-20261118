import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// The contest runs this offline; rendering is completed before submission.
const source = new URL('./entry.png', import.meta.url);
const png = readFileSync(source);
if (png.length > 1048576 || png.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
  throw new Error('The committed entry must be a PNG no larger than 1 MiB.');
}
if (png.readUInt32BE(16) !== 1024 || png.readUInt32BE(20) !== 1024) {
  throw new Error('The committed front page must be exactly 1024 by 1024.');
}
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDirectory, { recursive: true });
copyFileSync(source, join(outputDirectory, 'entry.png'));
