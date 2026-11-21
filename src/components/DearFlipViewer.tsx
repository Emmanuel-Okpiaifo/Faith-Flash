import { useEffect, useRef, useState } from 'react'
import { appHref } from '../lib/appHref'
import { ensureDflipLoaded } from '../lib/dflipRuntime'
import { takeMagazineSource } from '../lib/warmMagazine'
import { isWebkitEngine } from '../lib/webkit'

/**
 * Embeds the DearFlip Lite (v1.7, CC BY-NC-ND 4.0) flipbook viewer around the
 * magazine PDF. The plugin's files are served from /public/dflip/ verbatim
 * (no modifications, per the Lite license). Scripts are loaded once and
 * cached on the window; subsequent opens reuse them.
 *
 * iOS Safari hardening: when the user agent is WebKit we switch the viewer
 * into a mode that is safe on iOS devices with tight per-tab memory and
 * per-canvas pixel limits. iOS caps a single canvas backing store at roughly
 * 4096×4096 pixels regardless of device memory (and roughly ~5 MP on older
 * devices); pdf.js's default `maxCanvasPixels` is 16777216 (~4096²), which
 * straddles that limit. Our 52-page magazine has 200 DPI JPEG photos that
 * easily push rendered pages past the iOS canvas ceiling, so photos come
 * back blank on real iPhones while page geometry still draws. Capping
 * maxCanvasPixels, dropping to a single-page spread, and turning off the
 * WebGL 3D flip + three.js runtime on iOS keeps rendering inside the device
 * budget and lets every photo paint.
 *
 * Desktop and Android stay on the full 3D flipbook.
 */

type DflipWindow = Window & {
  jQuery?: unknown
}

interface FlipBook {
  resize?: () => void
  setPageMode?: (single: boolean) => void
  height?: (value: number) => void
}

interface DearFlipViewerProps {
  pdfUrl: string
  title: string
  poster?: string
}

function pageModeFor(width: number, forceSingle: boolean) {
  if (forceSingle) return 1
  return width < 960 ? 1 : 2
}

function viewerHeight(width: number) {
  const single = width < 960
  const fromWidth = width * (single ? 1.42 : 0.76)
  const fromScreen = Math.max(480, window.innerHeight * 0.82)
  return Math.round(Math.min(fromWidth, fromScreen))
}

// iOS Safari silently fails to back a canvas larger than roughly 4096×4096
// on recent iPhones, and closer to ~5 MP on older devices. pdf.js's default
// maxCanvasPixels is 16777216 (~4096²) — right at that ceiling, so page
// renders that happen to be one pixel over end up with blank photo regions.
// Cap below the limit so pdf.js downsamples the offending pages instead.
// This is the value the pdf.js community has long recommended for iOS.
const IOS_MAX_CANVAS_PIXELS = 5_242_880

export function DearFlipViewer({ pdfUrl, title, poster }: DearFlipViewerProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    const stage = stageRef.current
    if (!stage) return
    const sourceTask = takeMagazineSource(pdfUrl)

    ;(async () => {
      try {
        const [source] = await Promise.all([sourceTask.promise, ensureDflipLoaded()])
        if (cancelled || !stage) return

        const webkit = isWebkitEngine()
        stage.innerHTML = ''
        const book = document.createElement('div')
        const width = stage.clientWidth || window.innerWidth
        book.className = '_df_book'
        book.setAttribute('source', pdfUrl)
        book.setAttribute('id', `dflip_${Math.random().toString(36).slice(2, 10)}`)
        // On iOS/macOS Safari, drop WebGL, drop the hard-cover 3D geometry,
        // and force single-page so pdf.js only has one page rasterised at a
        // time. This keeps total GPU + canvas backing-store memory inside
        // the per-tab budget and makes photo decoding reliable.
        book.setAttribute('webgl', webkit ? 'false' : 'true')
        if (webkit) book.setAttribute('hard', 'none')
        book.setAttribute('backgroundcolor', '#F8F8F6')
        book.setAttribute('autoEnableOutline', 'false')
        book.setAttribute('autoEnableThumbnail', 'false')
        stage.appendChild(book)

        const w = window as DflipWindow & {
          jQuery?: ((el: Element) => { flipBook: (url: string, opts: unknown) => FlipBook })
        }
        if (typeof w.jQuery !== 'function') {
          throw new Error('DearFlip runtime unavailable')
        }
        const docExtra = webkit
          ? {
              cMapUrl: appHref('/dflip/js/libs/cmaps/'),
              cMapPacked: true,
              imageResourcesPath: appHref('/dflip/images/pdfjs/'),
              maxImageSize: 8 * 1024 * 1024,
              disableFontFace: false,
              useSystemFonts: true,
            }
          : {}
        const flip = w.jQuery(book).flipBook(pdfUrl, {
          height: viewerHeight(width),
          webgl: !webkit,
          hard: webkit ? 'none' : 'all',
          maxCanvasPixels: webkit ? IOS_MAX_CANVAS_PIXELS : undefined,
          backgroundColor: '#F8F8F6',
          autoEnableOutline: false,
          autoEnableThumbnail: false,
          pageMode: pageModeFor(width, webkit),
          singlePageMode: 1,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 0,
          paddingRight: 0,
          forceFit: true,
          onReady: () => {
            if (!cancelled) setStatus('ready')
          },
          ...(source.kind === 'file' && !webkit
            ? {
                docParameters: {
                  data: source.data,
                  cMapUrl: appHref('/dflip/js/libs/cmaps/'),
                  cMapPacked: true,
                  imageResourcesPath: appHref('/dflip/images/pdfjs/'),
                  disableAutoFetch: true,
                  disableStream: true,
                  ...docExtra,
                },
              }
            : webkit
              ? {
                  // On iOS keep pdf.js in byte-range streaming mode so it
                  // never holds the whole 13 MB file in a Uint8Array at the
                  // same time as decoded page canvases.
                  docParameters: { ...docExtra },
                }
              : {}),
        })

        let mode = pageModeFor(width, webkit)
        let resizeTimer = 0
        const fit = () => {
          const nextWidth = stage.clientWidth || window.innerWidth
          const nextMode = pageModeFor(nextWidth, webkit)
          if (nextMode !== mode) {
            flip.setPageMode?.(nextMode === 1)
            mode = nextMode
          }
          flip.height?.(viewerHeight(nextWidth))
        }
        const onResize = () => {
          window.clearTimeout(resizeTimer)
          resizeTimer = window.setTimeout(fit, 120)
        }
        const observer = new ResizeObserver(onResize)
        observer.observe(stage)
        window.addEventListener('resize', onResize)
        const settle = window.setTimeout(fit, 400)
        const reveal = window.setTimeout(() => {
          if (!cancelled) setStatus('ready')
        }, 20000)

        const stop = () => {
          window.clearTimeout(resizeTimer)
          window.clearTimeout(settle)
          window.clearTimeout(reveal)
          observer.disconnect()
          window.removeEventListener('resize', onResize)
        }
        if (cancelled) stop()
        ;(stage as HTMLDivElement & { __dflipStop?: () => void }).__dflipStop = stop
      } catch (err) {
        if (cancelled) return
        if (err instanceof DOMException && err.name === 'AbortError') return
        setErrorMsg(err instanceof Error ? err.message : 'Unable to load flipbook')
        setStatus('error')
      }
    })()

    return () => {
      cancelled = true
      sourceTask.cancel()
      const node = stage as HTMLDivElement & { __dflipStop?: () => void }
      node.__dflipStop?.()
      node.__dflipStop = undefined
      if (stage) stage.innerHTML = ''
    }
  }, [pdfUrl])

  return (
    <div className="dearflip" aria-label={`${title} flipbook`}>
      {status === 'loading' && (
        <div className="dearflip__status" role="status">
          {poster ? <img src={poster} alt="" className="dearflip__poster" /> : null}
          <span className="dearflip__status-chip">
            <span className="dearflip__spinner" aria-hidden />
            Opening the magazine…
          </span>
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
