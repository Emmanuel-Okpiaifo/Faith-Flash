/**
 * Browser checks for the magazine viewer.
 *
 * Every iOS browser is WebKit (Safari, Chrome, Firefox, Edge). iPadOS 13+
 * reports itself as Macintosh, so a touch-capable Mac UA counts as an iPad.
 * Desktop Safari is WebKit too, but it is not an iPhone or iPad.
 */

export function isIphone(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iPhone|iPod/.test(navigator.userAgent)
}

/** iPadOS 13+ reports itself as Macintosh, so a touch-capable Mac UA counts as an iPad. */
export function isIpad(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPad/.test(ua)) return true
  return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1
}

export function isIosDevice(): boolean {
  return isIphone() || isIpad()
}

export function isWebkitEngine(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const vendor = navigator.vendor || ''
  const desktopSafari =
    /^Apple/.test(vendor) && /Safari\//.test(ua) && !/Chrome\/|Chromium\/|CriOS\/|FxiOS\/|EdgiOS\//.test(ua)
  return isIosDevice() || desktopSafari
}
