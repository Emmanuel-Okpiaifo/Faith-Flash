import { site } from '../content/site'
import { appHref } from './appHref'
import { ensureDflipLoaded } from './dflipRuntime'

/**
 * Quietly fetches the flipbook runtime and the issue PDF after the page is
 * already up. Opening the reader then uses those bytes. A cold open still
 * streams the file through DearFlip so the first pages are not blocked on the
 * rest of the download.
 *
 * DearFlip rewrites blob: URLs on https pages, so the bytes are passed in as
 * data instead of an object URL.
 */

const DFLIP_VERSION = '1.7.36'

const RUNTIME_FILES = [
  `/dflip/js/libs/pdf.min.js?ver=${DFLIP_VERSION}`,
  `/dflip/js/libs/pdf.worker.min.js?ver=${DFLIP_VERSION}`,
  `/dflip/js/libs/three.min.js?ver=${DFLIP_VERSION}`,
  `/dflip/js/libs/mockup.min.js?ver=${DFLIP_VERSION}`,
  `/dflip/js/libs/compatibility.js?ver=${DFLIP_VERSION}`,
]

type NetInfo = { saveData?: boolean; effectiveType?: string }

type Download = {
  promise: Promise<Uint8Array>
  data: Uint8Array | null
  received: number
  total: number
  abort: () => void
}

export type MagazineSource = { kind: 'file'; data: Uint8Array } | { kind: 'url' }

const downloads = new Map<string, Download>()
let runtimeStarted = false
let filesStarted = false

function canPrefetch(): boolean {
  const connection = (navigator as Navigator & { connection?: NetInfo }).connection
  if (!connection) return true
  if (connection.saveData) return false
  return connection.effectiveType !== 'slow-2g' && connection.effectiveType !== '2g'
}

function beginDownload(url: string): Download {
  const existing = downloads.get(url)
  if (existing) return existing

  const controller = new AbortController()
  const job: Download = {
    promise: Promise.resolve(new Uint8Array()),
    data: null,
    received: 0,
    total: 0,
    abort: () => controller.abort(),
  }

  job.promise = (async () => {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok || !response.body) throw new Error('magazine')
    job.total = Number(response.headers.get('content-length') || 0)
    const reader = response.body.getReader()
    const parts: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!value) continue
      parts.push(value)
      job.received += value.byteLength
    }
    const data = new Uint8Array(job.received)
    let offset = 0
    for (const part of parts) {
      data.set(part, offset)
      offset += part.byteLength
    }
    job.data = data
    return data
  })().catch((error: unknown) => {
    downloads.delete(url)
    throw error
  })

  downloads.set(url, job)
  return job
}

function warmRuntime(): void {
  if (runtimeStarted) return
  runtimeStarted = true
  void ensureDflipLoaded().catch(() => {
    runtimeStarted = false
  })
  for (const path of RUNTIME_FILES) {
    void fetch(appHref(path)).catch(() => {})
  }
}

function warmFiles(): void {
  if (filesStarted || !canPrefetch()) return
  filesStarted = true
  for (const magazine of site.magazines) {
    beginDownload(appHref(magazine.file))
  }
}

export function scheduleMagazineWarmup(mode: 'background' | 'shelf' | 'reader'): () => void {
  let dead = false
  let idle = 0
  let timer = 0

  const kick = () => {
    if (dead) return
    warmRuntime()
    if (mode !== 'reader') warmFiles()
  }

  if (mode !== 'background') {
    kick()
    return () => {
      dead = true
    }
  }

  const arm = () => {
    if (dead) return
    if (typeof window.requestIdleCallback === 'function') {
      idle = window.requestIdleCallback(kick, { timeout: 2500 })
    } else {
      timer = window.setTimeout(kick, 1000)
    }
  }

  if (document.readyState === 'complete') arm()
  else window.addEventListener('load', arm, { once: true })

  return () => {
    dead = true
    window.clearTimeout(timer)
    if (idle) window.cancelIdleCallback(idle)
    window.removeEventListener('load', arm)
  }
}

/**
 * Prefer bytes that were already fetched. If a quiet download is almost
 * finished, wait for it. Otherwise hand back the real URL so DearFlip can
 * stream the first pages, and stop the quiet download so the two don't fight.
 * The short delay lets React StrictMode remount without aborting the file.
 */
export function takeMagazineSource(url: string): {
  promise: Promise<MagazineSource>
  cancel: () => void
} {
  let timer = 0
  let cancel = () => {}

  const promise = new Promise<MagazineSource>((resolve, reject) => {
    let settled = false
    cancel = () => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      reject(new DOMException('aborted', 'AbortError'))
    }

    const finish = (source: MagazineSource) => {
      if (settled) return
      settled = true
      resolve(source)
    }

    const decide = () => {
      const job = downloads.get(url)
      if (!job) {
        finish({ kind: 'url' })
        return
      }
      if (job.data) {
        finish({ kind: 'file', data: job.data.slice() })
        return
      }
      const ratio = job.total > 0 ? job.received / job.total : 0
      if (ratio >= 0.8) {
        void job.promise.then(
          (data) => finish({ kind: 'file', data: data.slice() }),
          () => finish({ kind: 'url' }),
        )
        return
      }
      job.abort()
      downloads.delete(url)
      filesStarted = false
      finish({ kind: 'url' })
    }

    const job = downloads.get(url)
    if (!job || job.data) decide()
    else timer = window.setTimeout(decide, 80)
  })

  return { promise, cancel }
}
