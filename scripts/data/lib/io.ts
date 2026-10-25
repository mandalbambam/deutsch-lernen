import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { createGunzip } from 'node:zlib';
import type { Readable } from 'node:stream';
import bz2 from 'unbzip2-stream';

function lines(stream: Readable): AsyncIterable<string> {
  return createInterface({ input: stream, crlfDelay: Infinity });
}

/** Async line iterator over a plain, .gz or .bz2 file. */
export function readLines(path: string): AsyncIterable<string> {
  const raw = createReadStream(path, { highWaterMark: 1 << 20 });
  if (path.endsWith('.gz')) return lines(raw.pipe(createGunzip()));
  if (path.endsWith('.bz2')) return lines(raw.pipe(bz2()));
  return lines(raw);
}

/** Reads a whole (small) .bz2 file into memory. */
export function readBz2Buffer(path: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    createReadStream(path)
      .pipe(bz2())
      .on('data', (chunk: Buffer) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks)))
      .on('error', reject);
  });
}

/** Minimal ustar reader: returns regular files contained in a tar buffer. */
export function untar(buf: Buffer): Map<string, Buffer> {
  const files = new Map<string, Buffer>();
  let offset = 0;
  while (offset + 512 <= buf.length) {
    const header = buf.subarray(offset, offset + 512);
    if (header.every((b) => b === 0)) break;
    const name = header.subarray(0, 100).toString('utf8').replace(/\0.*$/s, '');
    const prefix = header.subarray(345, 500).toString('utf8').replace(/\0.*$/s, '');
    const size = parseInt(header.subarray(124, 136).toString('utf8').replace(/\0.*$/s, '').trim() || '0', 8);
    const type = String.fromCharCode(header[156] || 48);
    const start = offset + 512;
    if (type === '0' || type === '\0') {
      files.set(prefix ? `${prefix}/${name}` : name, buf.subarray(start, start + size));
    }
    offset = start + Math.ceil(size / 512) * 512;
  }
  return files;
}
