import { useEffect, useId, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../content/site'

const PHOTO_MS = 1700
const LOCK_MS = 1500
const FADE_MS = 450
const RING = 'RCCG THE ENVOYS • FAITH FLASH • '.repeat(3)

function prefersStill() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Preloader() {
  const { pathname } = useLocation()
  const [active, setActive] = useState(() => pathname === '/' && !prefersStill())
  const [beat, setBeat] = useState(0)
  const [closing, setClosing] = useState(false)
  const ringId = `intro-ring-${useId().replace(/:/g, '')}`

  useEffect(() => {
    if (!active) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    site.intro.forEach((slide) => {
      const img = new Image()
      img.src = slide.image
    })
    return () => {
      document.body.style.overflow = previous
    }
  }, [active])

  useEffect(() => {
    if (!active || closing) return
    const delay = beat < site.intro.length ? PHOTO_MS : LOCK_MS
    const timer = window.setTimeout(() => {
      if (beat < site.intro.length) {
        setBeat((current) => current + 1)
        return
      }
      setClosing(true)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [active, beat, closing])

  useEffect(() => {
    if (!closing) return
    const timer = window.setTimeout(() => setActive(false), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [closing])

  if (!active) return null

  const photo = beat < site.intro.length ? site.intro[beat] : null
  const caption = photo ? photo.caption : 'FAITH FLASH'

  return (
    <div className={`intro${closing ? ' intro--out' : ''}`} role="status" aria-live="polite" aria-label="Faith Flash">
      <div className="intro__stage" key={caption}>
        <div className="intro__badge">
          <img
            src={photo ? photo.image : site.logo}
            alt=""
            className={photo ? 'intro__circle' : 'intro__circle intro__circle--logo'}
            style={photo && 'focus' in photo ? { objectPosition: photo.focus } : undefined}
          />
          <svg className="intro__ring" viewBox="0 0 100 100" aria-hidden="true">
            <path
              id={ringId}
              fill="none"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
            <text className="intro__ring-text">
              <textPath href={`#${ringId}`} textLength="239" lengthAdjust="spacing">
                {RING}
              </textPath>
            </text>
          </svg>
        </div>
        <p className="intro__caption">{caption}</p>
      </div>
      <style>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          background: #0D0D0D;
          color: #fff;
        }
        .intro--out { animation: introOut ${FADE_MS}ms ease forwards; }
        .intro__stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: min(92vw, 420px);
          animation: introIn 0.45s ease both;
        }
        .intro__badge {
          position: relative;
          width: min(78vw, 320px);
          height: min(78vw, 320px);
        }
        .intro__circle {
          position: absolute;
          inset: 16%;
          width: 68%;
          height: 68%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center 22%;
        }
        .intro__circle--logo {
          object-fit: contain;
          object-position: center;
          inset: 26%;
          width: 48%;
          height: 48%;
          border-radius: 0;
        }
        .intro__ring {
          position: absolute;
          inset: 0;
          overflow: visible;
          animation: introSpin 16s linear infinite;
        }
        .intro__ring-text {
          fill: #E7B84B;
          font-family: var(--font-display);
          font-size: 3.85px;
          letter-spacing: 0.35px;
          text-transform: uppercase;
        }
        .intro__caption {
          margin: 1.6rem 0 0;
          text-align: center;
          font-family: var(--font-display);
          font-size: clamp(1.45rem, 5vw, 2.15rem);
          font-weight: 400;
          letter-spacing: 0.03em;
          line-height: 1.05;
          text-transform: uppercase;
        }
        @keyframes introSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes introIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes introOut {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </div>
  )
}
