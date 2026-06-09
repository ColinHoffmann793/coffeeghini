import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// `npm run dev`        -> http  on :5180 (used by the Claude preview panel)
// `npm run dev:https`  -> https on :5443 (self-signed; lets the phone camera work)
const useHttps = process.env.HTTPS === 'true'

// Base path resolution:
//   - GitHub Pages project site lives under /<repo>/  -> default build base "/coffeeghini/"
//   - Capacitor (native app) loads assets from the bundle root -> BASE_PATH=/ (npm run build:app)
//   - dev server stays at "/"
export default defineConfig(({ command }) => ({
  base: process.env.BASE_PATH ?? (command === 'build' ? '/coffeeghini/' : '/'),
  plugins: [react(), ...(useHttps ? [basicSsl()] : [])],
  server: {
    host: true,
    port: useHttps ? 5443 : 5180,
    strictPort: true,
  },
}))
