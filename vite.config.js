import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// `npm run dev`        -> http  on :5180 (used by the Claude preview panel)
// `npm run dev:https`  -> https on :5443 (self-signed; lets the phone camera work)
const useHttps = process.env.HTTPS === 'true'

// GitHub Pages serves project sites under /<repo>/, so the production *build*
// uses that base path. Dev keeps "/" so localhost + the preview panel work.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/coffeeghini/' : '/',
  plugins: [react(), ...(useHttps ? [basicSsl()] : [])],
  server: {
    host: true,
    port: useHttps ? 5443 : 5180,
    strictPort: true,
  },
}))
