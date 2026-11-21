import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Root deploy (Netlify/Vercel custom domain): leave unset — defaults to `/`.
// Subpath (e.g. GitHub Pages `https://user.github.io/repo/`): set in `.env.production`:
//   VITE_DEPLOY_BASE=/repo-name/
// `import.meta.env.BASE_URL` and the router basename follow this automatically.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_DEPLOY_BASE?.trim() || '/'
  return {
    plugins: [react()],
    base: base.endsWith('/') || base === '/' ? base : `${base}/`,
    // Mirror the Netlify /magazines/files/* → ImageKit proxy so local
    // `vite` / `vite preview` exercise the same same-origin PDF path the
    // production site uses (needed for pdf.js Range requests on WebKit).
    server: {
      proxy: {
        '/magazines/files': {
          target: 'https://ik.imagekit.io',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/magazines\/files/, '/emmzy26/faithflash/magazines'),
        },
      },
    },
    preview: {
      proxy: {
        '/magazines/files': {
          target: 'https://ik.imagekit.io',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/magazines\/files/, '/emmzy26/faithflash/magazines'),
        },
      },
    },
  }
})
