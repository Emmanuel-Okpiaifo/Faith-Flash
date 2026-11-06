import { useEffect, useRef, useState } from 'react'
import { appHref } from '../lib/appHref'

/**
 * Embeds the DearFlip Lite (v1.7, CC BY-NC-ND 4.0) flipbook viewer around a
 * same-origin PDF. The plugin's files are served from /public/dflip/ verbatim
 * — no modifications, in line with the Lite license. Scripts are loaded once
 * and cached on the window; subsequent instances reuse them.
 */

type DflipWindow = Window & {
  jQuery?: unknown
  DFLIP?: {
    defaults?: Record<string, unknown>
    parseBooks?: () => void
  }
  __dflipLoader__?: Promise<void>
}

function assetHref(path: string): string {
  return appHref(path)
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

function ensureDflipLoaded(): Promise<void> {
  const w = window as DflipWindow
  if (w.__dflipLoader__) return w.__dflipLoader__

  w.__dflipLoader__ = (async () => {
    loadStylesheet(assetHref('/dflip/css/dflip.min.css'))
    loadStylesheet(assetHref('/dflip/css/themify-icons.min.css'))
    await loadScript(assetHref('/dflip/js/libs/jquery.min.js'))
    await loadScript(assetHref('/dflip/js/dflip.min.js'))
  })()

  return w.__dflipLoader__
}

interface DearFlipViewerProps {
  pdfUrl: string
  title: string
  height?: number
}

export function DearFlipViewer({ pdfUrl, title, height = 720 }: DearFlipViewerProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    const stage = stageRef.current
    if (!stage) return

    ;(async () => {
      try {
        await ensureDflipLoaded()
        if (cancelled || !stage) return

        stage.innerHTML = ''
        const book = document.createElement('div')
        book.className = '_df_book'
        book.setAttribute('source', pdfUrl)
        book.setAttribute('id', `dflip_${Math.random().toString(36).slice(2, 10)}`)
        book.setAttribute('height', String(height))
        book.setAttribute('webgl', 'true')
        book.setAttribute('backgroundcolor', '#0a0a0a')
        book.setAttribute('autoEnableOutline', 'false')
        book.setAttribute('autoEnableThumbnail', 'false')
        stage.appendChild(book)

        const w = window as DflipWindow & {
          jQuery?: ((el: Element) => { flipBook: (url: string, opts: unknown) => unknown })
        }
        if (typeof w.jQuery !== 'function') {
          throw new Error('DearFlip runtime unavailable')
        }
        w.jQuery(book).flipBook(pdfUrl, {
          height,
          webgl: true,
          backgroundColor: '#0a0a0a',
          autoEnableOutline: false,
          autoEnableThumbnail: false,
          pageMode: 2,
        })

        setStatus('ready')
      } catch (err) {
        if (cancelled) return
        setErrorMsg(err instanceof Error ? err.message : 'Unable to load flipbook')
        setStatus('error')
      }
    })()

    return () => {
      cancelled = true
      if (stage) stage.innerHTML = ''
    }
  }, [pdfUrl, height])

  return (
    <div className="dearflip" aria-label={`${title} flipbook`}>
      {status === 'loading' && (
        <div className="dearflip__status" role="status">
          <span className="dearflip__spinner" aria-hidden />
          Loading flipbook…
        </div>
      )}
      {status === 'error' && (
        <div className="dearflip__status dearflip__status--error" role="alert">
          <p>We couldn’t load the flipbook{errorMsg ? ` (${errorMsg})` : ''}.</p>
          <p>
            You can still{' '}
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="nav-link">
              open the PDF directly
            </a>
            .
          </p>
        </div>
      )}
      <div ref={stageRef} className="dearflip__stage" />
    </div>
  )
}
