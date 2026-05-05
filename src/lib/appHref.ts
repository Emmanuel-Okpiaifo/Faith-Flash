/**
 * Resolves in-app paths against Vite `base` so links work on root deploys and subpath hosts (e.g. GitHub Pages).
 */
export function appHref(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const base = import.meta.env.BASE_URL ?? '/'
  const trimmed = path.replace(/^\//, '')
  return `${base}${trimmed}`
}
