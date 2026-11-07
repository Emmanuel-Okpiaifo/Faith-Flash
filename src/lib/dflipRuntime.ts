import { appHref } from './appHref'

/**
 * Loads the DearFlip Lite runtime once. The plugin files in /public/dflip stay
 * unmodified (CC BY-NC-ND 4.0). Later opens reuse the same scripts.
 */

type DflipWindow = Window & {
  jQuery?: unknown
  __dflipLoader__?: Promise<void>
}

function loadStylesheet(href: string): void {
  const marker = `link[data-dflip-asset="${href}"]`
  if (document.head.querySelector(marker)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.dflipAsset = href
  document.head.appendChild(link)
}

function loadScript(src: string): Promise<void> {
  const selector = `script[data-dflip-asset="${src}"]`
  const existing = document.head.querySelector<HTMLScriptElement>(selector)
  if (existing) {
    if (existing.dataset.loaded === 'true') return Promise.resolve()
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      })
    })
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.async = false
    s.dataset.dflipAsset = src
    s.addEventListener(
      'load',
      () => {
        s.dataset.loaded = 'true'
        resolve()
      },
      { once: true }
    )
    s.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true })
    document.head.appendChild(s)
  })
}

export function ensureDflipLoaded(): Promise<void> {
  const w = window as DflipWindow
  if (w.__dflipLoader__) return w.__dflipLoader__

  w.__dflipLoader__ = (async () => {
    loadStylesheet(appHref('/dflip/css/dflip.min.css'))
    loadStylesheet(appHref('/dflip/css/themify-icons.min.css'))
    await loadScript(appHref('/dflip/js/libs/jquery.min.js'))
    await loadScript(appHref('/dflip/js/dflip.min.js'))
  })()

  return w.__dflipLoader__
}
