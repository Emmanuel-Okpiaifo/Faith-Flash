import { useEffect, useRef, useState } from 'react'
import { appHref } from '../lib/appHref'
import { ensureDflipLoaded } from '../lib/dflipRuntime'
import { takeMagazineSource } from '../lib/warmMagazine'

/**
 * Embeds the DearFlip Lite (v1.7, CC BY-NC-ND 4.0) flipbook viewer around a
 * same-origin PDF. The plugin's files are served from /public/dflip/ verbatim
 * — no modifications, in line with the Lite license. Scripts are loaded once
 * and cached on the window; subsequent instances reuse them.
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

function pageModeFor(width: number) {
  return width < 960 ? 1 : 2
}

function viewerHeight(width: number) {
  const single = width < 960
  const fromWidth = width * (single ? 1.42 : 0.76)
  const fromScreen = Math.max(480, window.innerHeight * 0.82)
  return Math.round(Math.min(fromWidth, fromScreen))
}

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

        stage.innerHTML = ''
        const book = document.createElement('div')
        const width = stage.clientWidth || window.innerWidth
        book.className = '_df_book'
        book.setAttribute('source', pdfUrl)
        book.setAttribute('id', `dflip_${Math.random().toString(36).slice(2, 10)}`)
        book.setAttribute('webgl', 'true')
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
        const flip = w.jQuery(book).flipBook(pdfUrl, {
          height: viewerHeight(width),
          webgl: true,
          backgroundColor: '#F8F8F6',
          autoEnableOutline: false,
          autoEnableThumbnail: false,
          pageMode: pageModeFor(width),
          singlePageMode: 1,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 0,
          paddingRight: 0,
          forceFit: true,
          onReady: () => {
            if (!cancelled) setStatus('ready')
          },
          ...(source.kind === 'file'
            ? {
                docParameters: {
                  data: source.data,
                  cMapUrl: appHref('/dflip/js/libs/cmaps/'),
                  cMapPacked: true,
                  imageResourcesPath: appHref('/dflip/images/pdfjs/'),
                  disableAutoFetch: true,
                  disableStream: true,
                },
              }
            : {}),
        })

        let mode = pageModeFor(width)
        let resizeTimer = 0
        const fit = () => {
          const nextWidth = stage.clientWidth || window.innerWidth
          const nextMode = pageModeFor(nextWidth)
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
