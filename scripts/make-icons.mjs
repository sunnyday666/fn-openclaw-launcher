/**
 * Generate the app icons as PNGs, with no image-library dependency.
 *
 * fnOS needs ICON.PNG / ICON_256.PNG at the package root and
 * app/ui/images/icon_{64,256}.png for the desktop entry. Rather than ship
 * opaque binaries, the artwork is described here and rendered with a tiny
 * rasteriser + PNG encoder (zlib is in Node's stdlib).
 *
 * Usage: node scripts/make-icons.mjs
 */

import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

// ----------------------------------------------------------------- PNG writer

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

/** Encode RGBA pixels (Uint8Array, w*h*4) as a PNG buffer. */
function encodePng(pixels, w, h) {
  const raw = Buffer.alloc(h * (w * 4 + 1));
  for (let y = 0; y < h; y += 1) {
    raw[y * (w * 4 + 1)] = 0; // filter: none
    Buffer.from(pixels.buffer, pixels.byteOffset + y * w * 4, w * 4).copy(
      raw,
      y * (w * 4 + 1) + 1,
    );
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// -------------------------------------------------------------------- shapes

/** Signed distance to a rounded rectangle centred in a `size` box. */
function sdRoundRect(x, y, size, inset, radius) {
  const half = size / 2 - inset;
  const dx = Math.abs(x - size / 2) - (half - radius);
  const dy = Math.abs(y - size / 2) - (half - radius);
  const ax = Math.max(dx, 0);
  const ay = Math.max(dy, 0);
  return Math.hypot(ax, ay) + Math.min(Math.max(dx, dy), 0) - radius;
}

/**
 * The mark: an open pincer — a claw, for a project whose mascot is a space
 * lobster. The ring thickens away from the opening so the two ends read as
 * tapering jaw tips.
 *
 * Returns a signed distance; negative is inside.
 */
function sdClaw(x, y, size) {
  const cx = size / 2;
  const cy = size * 0.515;
  const r = x - cx;
  const s = y - cy;
  const dist = Math.hypot(r, s);
  const angle = Math.atan2(s, r);

  // Angular distance from the opening: 0 at the gap, PI opposite it.
  const gapAngle = -Math.PI / 2;
  const delta = Math.abs(((angle - gapAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
  const backness = 0.5 - 0.5 * Math.cos(Math.min(Math.PI, delta));

  // Thick at the back of the jaw, tapering to thin tips at the opening.
  const outerR = size * (0.255 + 0.048 * backness);
  const innerR = size * (0.192 - 0.062 * backness);
  const mid = (outerR + innerR) / 2;
  const half = (outerR - innerR) / 2;
  const ring = Math.abs(dist - mid) - half;

  // Subtracting a V wedge: keep the ring outside the sector (SDF max(-wedge)).
  const openHalf = 0.5;
  const innerFloor = innerR * 0.85;
  const sector = (delta - openHalf) * Math.max(dist, 1e-3);
  const wedge = Math.max(sector, innerFloor - dist);
  return Math.max(ring, -wedge);
}

function smoothstep(edge0, edge1, v) {
  const t = Math.min(1, Math.max(0, (v - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// ------------------------------------------------------------------ renderer

function render(size) {
  const SS = 4; // supersampling factor for anti-aliasing
  const px = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let rSum = 0;
      let gSum = 0;
      let bSum = 0;
      let aSum = 0;

      for (let sy = 0; sy < SS; sy += 1) {
        for (let sx = 0; sx < SS; sx += 1) {
          const fx = x + (sx + 0.5) / SS;
          const fy = y + (sy + 0.5) / SS;

          // Background: rounded square with a warm vertical gradient.
          const bgD = sdRoundRect(fx, fy, size, size * 0.035, size * 0.225);
          const bgA = 1 - smoothstep(-0.9, 0.9, bgD);

          const t = fy / size;
          let R = 232 + (200 - 232) * t;
          let G = 112 + (85 - 112) * t;
          let B = 63 + (43 - 63) * t;

          // Foreground: white claw.
          const clawD = sdClaw(fx, fy, size);
          const clawA = 1 - smoothstep(-0.9, 0.9, clawD);
          if (clawA > 0) {
            R = R * (1 - clawA) + 255 * clawA;
            G = G * (1 - clawA) + 255 * clawA;
            B = B * (1 - clawA) + 253 * clawA;
          }

          const a = bgA;
          rSum += R * a;
          gSum += G * a;
          bSum += B * a;
          aSum += a;
        }
      }

      const n = SS * SS;
      const outA = aSum / n;
      const i = (y * size + x) * 4;
      if (outA > 0.0001) {
        px[i] = Math.round(rSum / aSum);
        px[i + 1] = Math.round(gSum / aSum);
        px[i + 2] = Math.round(bSum / aSum);
        px[i + 3] = Math.round(outA * 255);
      }
    }
  }

  return encodePng(px, size, size);
}

// ----------------------------------------------------------------------- main

const targets = [
  { file: path.join(ROOT, 'ICON.PNG'), size: 256 },
  { file: path.join(ROOT, 'ICON_256.PNG'), size: 256 },
  { file: path.join(ROOT, 'app', 'ui', 'images', 'icon.PNG'), size: 256 },
  { file: path.join(ROOT, 'app', 'ui', 'images', 'icon_64.png'), size: 64 },
  { file: path.join(ROOT, 'app', 'ui', 'images', 'icon_256.png'), size: 256 },
];

for (const { file, size } of targets) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const png = render(size);
  fs.writeFileSync(file, png);
  console.log(`wrote ${path.relative(ROOT, file)} (${size}x${size}, ${png.length} bytes)`);
}
