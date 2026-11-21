/**
 * Detects WebKit-engine browsers. Specifically, every iOS browser (Safari,
 * Chrome/CriOS, Firefox/FxiOS, Edge/EdgiOS — all backed by WebKit on iOS)
 * plus desktop Safari on macOS. Returns false for Chromium, Firefox, and
 * Edge on every non-iOS platform.
 *
 * The Mercy Convention 2026 magazine (DearFlip Lite v1.7 + bundled pdf.js
 * 4.10) reliably crashes the WebKit renderer process on this PDF, so the
 * viewer swaps DearFlip out for the browser's native in-frame PDF renderer
 * on WebKit. On iOS Safari that is PDFKit, which paints every photo and
 * supports pinch-zoom, scroll, and share natively.
 */
export function isWebkitEngine(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const vendor = navigator.vendor || ''
  const touchMacLikeIpad =
    /Macintosh/.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1
  const iDevice = /iPad|iPhone|iPod/.test(ua) || touchMacLikeIpad
  const desktopSafari =
    /^Apple/.test(vendor) && /Safari\//.test(ua) && !/Chrome\/|Chromium\/|CriOS\/|FxiOS\/|EdgiOS\//.test(ua)
  return iDevice || desktopSafari
}
