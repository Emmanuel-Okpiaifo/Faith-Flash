import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../content/site'

const PHOTO_MS = 1800
const LOCK_MS = 1400
const FADE_MS = 500

function prefersStill() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Preloader() {
  const { pathname } = useLocation()
  const [active, setActive] = useState(() => pathname === '/' && !prefersStill())
  const [beat, setBeat] = useState(0)
  const [closing, setClosing] = useState(false)

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

  return (
    <div className={`intro${closing ? ' intro--out' : ''}`} role="status" aria-live="polite" aria-label="Faith Flash">
      {photo ? (
        <figure className="intro__frame" key={photo.caption}>
          <img src={photo.image} alt="" className="intro__photo" />
          <figcaption className="intro__caption">
            <p className="intro__kicker">RCCG THE ENVOYS</p>
            <p className="intro__title">{photo.caption}</p>
            <span className="intro__rule" />
            <p className="intro__count">
              {beat + 1} / {site.intro.length}
            </p>
          </figcaption>
        </figure>
      ) : (
        <div className="intro__lockup">
          <img src={site.logo} alt="RCCG The Envoys" className="intro__logo" />
          <span className="intro__rule" />
          <p className="intro__word">FAITH FLASH</p>
        </div>
      )}
      <style>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0d0d0d;
          color: #fff;
          display: grid;
          place-items: center;
        }
        .intro--out {
          animation: introOut ${FADE_MS}ms ease forwards;
        }
        .intro__frame,
        .intro__lockup {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: end center;
          animation: introIn 0.55s ease both;
        }
        .intro__lockup {
          place-items: center;
          gap: 1.1rem;
          align-content: center;
        }
        .intro__photo {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          object-position: center 12%;
        }
        .intro__frame::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(13,13,13,0.18) 0%, rgba(13,13,13,0.08) 40%, rgba(13,13,13,0.78) 100%);
        }
        .intro__caption {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 1.5rem 11vh;
          margin: 0;
        }
        .intro__kicker {
          margin: 0 0 0.7rem;
          color: #E7B84B;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .intro__title,
        .intro__word {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 400;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          line-height: 0.95;
        }
        .intro__title {
          font-size: clamp(2.2rem, 7vw, 5.4rem);
        }
        .intro__word {
          font-size: clamp(3rem, 10vw, 7rem);
        }
        .intro__rule {
          display: block;
          width: 3.25rem;
          height: 2px;
          margin: 1rem auto 0.85rem;
          background: #E7B84B;
        }
        .intro__lockup .intro__rule {
          margin: 0.2rem auto;
        }
        .intro__count {
          margin: 0;
          color: rgba(255,255,255,0.72);
          font-size: 0.75rem;
          letter-spacing: 0.22em;
        }
        .intro__logo {
          width: auto;
          height: 92px;
          object-fit: contain;
        }
        @keyframes introIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes introOut {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </div>
  )
}
