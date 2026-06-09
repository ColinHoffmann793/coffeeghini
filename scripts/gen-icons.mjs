// One-off PWA icon generator. Run with:
//   npm install sharp --no-save && node scripts/gen-icons.mjs
// Produces the PNG icons referenced by public/manifest.webmanifest + index.html.
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

// Coffee cup on the app's latte→espresso gradient (matches the in-app avatar).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c79a6e"/>
      <stop offset="1" stop-color="#3b2417"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <g transform="translate(115,130) scale(12)" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/>
    <path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16"/>
    <path d="M8 3c0 1-1 1-1 2.2M11.5 3c0 1-1 1-1 2.2"/>
  </g>
</svg>`

const buf = Buffer.from(svg)
const targets = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]

for (const [name, size] of targets) {
  await sharp(buf).resize(size, size).png().toFile(join(pub, name))
  console.log('wrote', name, `${size}x${size}`)
}
