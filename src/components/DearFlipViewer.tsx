import { useEffect, useRef, useState } from 'react'
import { appHref } from '../lib/appHref'
import { ensureDflipLoaded, ensureFlipWebgl } from '../lib/dflipRuntime'
import { takeMagazineSource, type MagazineSource } from '../lib/warmMagazine'
import { isIosDevice, isIpad, isIphone, isWebkitEngine } from '../lib/webkit'

/**
 * Embeds DearFlip Lite (v1.7, CC BY-NC-ND 4.0). Plugin files in /public/dflip
 * stay unmodified. Scripts load once and stay on the window.
 *
 * iPhone and iPad do not render this magazine through pdf.js. The bundled
 * pdf.js 4.10 turns Safari's ImageDecoder on, and that decoder drops the
 * photographs while leaving the text, which is the blank-page report. Range
 * requests against ImageKit also fail on iOS because Content-Range is not
 * listed in Access-Control-Expose-Headers ("cross origin cannot load file").
 * Those devices get the pre-rendered page JPEGs inside the same 3D book
 * Android uses. An iPhone shows one page, and the stage is narrowed so the
 * pages beside it stay out of view. That narrowing is iPhone-only. iPad,
 * Android, other tablets, and computers keep DearFlip's own full-width book:
 * one page on a phone-width screen, both pages once the screen can hold them.
 * The photographs are WebGL textures, so pdf.js never runs on iOS.
 *
 * Desktop Safari still reads the PDF, with the decoder and range requests
 * turned off, and with the file URL included. Passing only the extra pdf.js
 * flags used to replace the whole getDocument argument and drop the URL.
 *
 * Desktop Chromium and Android stay on the full 3D PDF flipbook.
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
  /** Absolute page-image URLs, in order. Used on iOS instead of the PDF. */
  pages?: string[]
}

// DearFlip PAGE_MODE. Only an iPhone is forced to one page. Android, tablets,
// and computers follow the width of the screen: a phone-width window shows
// one page, and a window that can hold a spread shows both.
const SINGLE_PAGE = 1
const DOUBLE_PAGE = 2

function pageModeFor(width: number) {
  if (isIphone()) return SINGLE_PAGE
  if (isIpad()) return width >= 700 ? DOUBLE_PAGE : SINGLE_PAGE
  return width >= 768 ? DOUBLE_PAGE : SINGLE_PAGE
}

/** Portrait page height / width. A spread is about twice as wide, so shorter. */
function frameFor(availableWidth: number) {
  const single = pageModeFor(availableWidth) === SINGLE_PAGE
  const ratio = single ? 1.42 : 0.76
  const screenCap = Math.max(isIphone() ? 0 : 480, window.innerHeight * 0.82)
  const height = Math.round(Math.min(availableWidth * ratio, screenCap))
  // Landscape iPhone is short and wide. Fitting one page to that height while
  // leaving the stage full width keeps the neighboring pages on screen.
  // Android, tablets, and computers stay full width so DearFlip frames the
  // book itself.
  const width =
    isIphone() && availableWidth * ratio > screenCap
      ? Math.round(screenCap / ratio)
      : availableWidth
  return { width, height }
}

function availableWidth(stage: HTMLElement) {
  return stage.parentElement?.parentElement?.clientWidth || stage.clientWidth || window.innerWidth
}

function applyFrame(stage: HTMLElement, available: number) {
  const frame = frameFor(available)
  const shell = stage.parentElement
  if (shell) {
    const nextWidth = frame.width < available - 1 ? `${frame.width}px` : ''
    if (shell.style.width !== nextWidth) {
      shell.style.width = nextWidth
      shell.style.marginInline = nextWidth ? 'auto' : ''
    }
  }
  return frame
}

// pdf.js 4 replaced maxCanvasPixels with canvasMaxAreaInBytes (width * height * 4).
// 5 megapixels stays under the older iOS canvas ceiling.
const WEBKIT_CANVAS_BYTES = 5_242_880 * 4

function webkitDocParameters(pdfUrl: string, source: MagazineSource) {
  return {
    ...(source.kind === 'file' ? { data: source.data } : { url: pdfUrl }),
    cMapUrl: appHref('/dflip/js/libs/cmaps/'),
    cMapPacked: true,
    imageResourcesPath: appHref('/dflip/images/pdfjs/'),
    disableAutoFetch: true,
    disableStream: true,
    disableRange: true,
    isImageDecoderSupported: false,
    isOffscreenCanvasSupported: false,
    canvasMaxAreaInBytes: WEBKIT_CANVAS_BYTES,
    maxImageSize: 8 * 1024 * 1024,
    useSystemFonts: true,
  }
}

export function DearFlipViewer({ pdfUrl, title, poster, pages }: DearFlipViewerProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const pageKey = pages?.join('\n') ?? ''

  useEffect(() => {
    let cancelled = false
    const stage = stageRef.current
    if (!stage) return

    const pageList = pageKey ? pageKey.split('\n') : []
    const usePageImages = isIosDevice() && pageList.length > 0
    const webkit = isWebkitEngine()
    const sourceTask = usePageImages ? null : takeMagazineSource(pdfUrl)

    ;(async () => {
      try {
        const [source] = await Promise.all([
          sourceTask ? sourceTask.promise : Promise.resolve(null),
          usePageImages ? ensureFlipWebgl() : ensureDflipLoaded(),
        ])
        if (cancelled || !stage) return
        if (!usePageImages && !source) return

        stage.innerHTML = ''
        const book = document.createElement('div')
        const available = availableWidth(stage)
        const frame = applyFrame(stage, available)
        book.className = '_df_book'
        book.setAttribute('df-parsed', 'true')
        book.setAttribute('id', `dflip_${Math.random().toString(36).slice(2, 10)}`)
        const threeD = usePageImages || !webkit
        book.setAttribute('webgl', threeD ? 'true' : 'false')
        if (!threeD) book.setAttribute('hard', 'none')
        book.setAttribute('backgroundcolor', '#F8F8F6')
        if (!usePageImages) book.setAttribute('source', pdfUrl)
        stage.appendChild(book)

        const w = window as DflipWindow & {
          jQuery?: ((el: Element) => { flipBook: (url: string | string[], opts: unknown) => FlipBook })
        }
        if (typeof w.jQuery !== 'function') {
          throw new Error('DearFlip runtime unavailable')
        }

        const docParameters = usePageImages
          ? undefined
          : webkit
            ? webkitDocParameters(pdfUrl, source as MagazineSource)
            : source?.kind === 'file'
              ? {
                  data: source.data,
                  cMapUrl: appHref('/dflip/js/libs/cmaps/'),
                  cMapPacked: true,
                  imageResourcesPath: appHref('/dflip/images/pdfjs/'),
                  disableAutoFetch: true,
                  disableStream: true,
                }
              : undefined

        const flip = w.jQuery(book).flipBook(usePageImages ? pageList : pdfUrl, {
          height: frame.height,
          webgl: threeD,
          hard: threeD ? 'all' : 'none',
          backgroundColor: '#F8F8F6',
          autoEnableOutline: false,
          autoEnableThumbnail: false,
          enableDownload: !usePageImages,
          pageMode: pageModeFor(available),
          // Zoom-to-one-page is the iPhone framing. Other devices keep
          // DearFlip's own single-page style (booklet on a phone, zoom on a computer).
          ...(isIphone() ? { singlePageMode: 1 } : {}),
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 0,
          paddingRight: 0,
          forceFit: true,
          onReady: () => {
            if (!cancelled) setStatus('ready')
          },
          ...(docParameters ? { docParameters } : {}),
        })

        let mode = pageModeFor(available)
        let resizeTimer = 0
        const fit = () => {
          const available = availableWidth(stage)
          const next = applyFrame(stage, available)
          const nextMode = pageModeFor(available)
          if (nextMode !== mode) {
            flip.setPageMode?.(nextMode === 1)
            mode = nextMode
          }
          flip.height?.(next.height)
          flip.resize?.()
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
      sourceTask?.cancel()
      const node = stage as HTMLDivElement & { __dflipStop?: () => void }
      node.__dflipStop?.()
      node.__dflipStop = undefined
      if (stage) stage.innerHTML = ''
    }
  }, [pdfUrl, pageKey])

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
