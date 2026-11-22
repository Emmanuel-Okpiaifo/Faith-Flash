import { appHref } from './appHref'

/**
 * Loads the DearFlip Lite runtime once. The plugin files in /public/dflip stay
 * unmodified (CC BY-NC-ND 4.0). Later opens reuse the same scripts.
 */

type JQueryStatic = ((cb: () => void) => void) & {
  fn?: { flipBook?: (url: string, opts: unknown) => unknown }
}

type DflipDefaults = {
  threejsSrc?: string
  pdfjsSrc?: string
  pdfjsWorkerSrc?: string
  mockupjsSrc?: string
  soundFile?: string
}

type TextureLoader = {
  setCrossOrigin?: (value: string) => unknown
}

type DflipWindow = Window & {
  jQuery?: JQueryStatic
  dFlipLocation?: string
  THREE?: unknown
  MOCKUP?: { textureLoader?: TextureLoader }
  DFLIP?: { autoDetectLocation?: number; defaults?: DflipDefaults }
  __dflipLoader__?: Promise<void>
  __dflipWebgl__?: Promise<void>
}

function assetUrl(relativePath: string): string {
  const relative = appHref(relativePath)
  if (/^https?:\/\//i.test(relative)) return relative
  // DearFlip rebuilds its asset URLs from `window.dFlipLocation`, so pin them
  // to an absolute origin. Autodetect in dflip.min.js walks <script> tags and
  // only works on the shelf route; on the viewer route it falls through to
  // page-relative paths (e.g. /magazines/js/libs/three.min.js) and 404s.
  return new URL(relative, window.location.origin).toString()
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

  // Pin the plugin's asset root *before* dflip.min.js evaluates. Otherwise its
  // autodetect pass is what sets `window.dFlipLocation`, and it only matches
  // script tags whose src contains "js/dflip." — reliable from the shelf but
  // flaky across SPA route changes, where it was leaving three.min.js and
  // sound/turn2.mp3 pointed at page-relative URLs that 404.
  const base = assetUrl('/dflip/')
  w.dFlipLocation = base

  w.__dflipLoader__ = (async () => {
    loadStylesheet(assetUrl('/dflip/css/dflip.min.css'))
    loadStylesheet(assetUrl('/dflip/css/themify-icons.min.css'))
    await loadScript(assetUrl('/dflip/js/libs/jquery.min.js'))
    await loadScript(assetUrl('/dflip/js/dflip.min.js'))

    // dflip.min.js registers a $(document).ready handler that rewrites its
    // defaults (pdfjsSrc, threejsSrc, mockupjsSrc, soundFile) to absolute URLs
    // under dFlipLocation. jQuery queues that handler on a microtask even when
    // the document is already ready, so if we call flipBook() before it has
    // flushed, dflip ends up loading pdf.min.js / three.min.js at page-
    // relative paths (e.g. /magazines/js/libs/pdf.min.js) that 404 on SPA
    // routes. Those 404s cascade into a renderer crash on iOS WebKit.
    //
    // Wait for ready to flush, then overwrite the defaults ourselves to be
    // robust against any version of dflip whose ready handler doesn't do the
    // rewrite (or does it against the wrong base).
    const jq = w.jQuery
    if (typeof jq === 'function') {
      await new Promise<void>((resolve) => jq(() => resolve()))
    }
    const defaults = w.DFLIP?.defaults
    if (defaults) {
      defaults.pdfjsSrc = `${base}js/libs/pdf.min.js`
      defaults.pdfjsWorkerSrc = `${base}js/libs/pdf.worker.min.js`
      defaults.threejsSrc = `${base}js/libs/three.min.js`
      defaults.mockupjsSrc = `${base}js/libs/mockup.min.js`
      defaults.soundFile = `${base}sound/turn2.mp3`
    }
  })()

  return w.__dflipLoader__
}

/**
 * Loads the 3D page-turn runtime and allows ImageKit page photos to become
 * WebGL textures. Without the anonymous CORS flag those photos stay blank.
 */
export function ensureFlipWebgl(): Promise<void> {
  const w = window as DflipWindow
  if (w.__dflipWebgl__) return w.__dflipWebgl__

  w.__dflipWebgl__ = (async () => {
    await ensureDflipLoaded()
    if (!w.THREE) await loadScript(assetUrl('/dflip/js/libs/three.min.js'))
    if (!w.MOCKUP) await loadScript(assetUrl('/dflip/js/libs/mockup.min.js'))
    w.MOCKUP?.textureLoader?.setCrossOrigin?.('anonymous')
  })().catch((error: unknown) => {
    w.__dflipWebgl__ = undefined
    throw error
  })

  return w.__dflipWebgl__
}
