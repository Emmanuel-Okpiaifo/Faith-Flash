import { useEffect, useId, useState } from 'react'

const HOLD_MS = 1000
const FADE_MS = 400

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const curveId = `preloader-curve-${useId().replace(/:/g, '')}`
  const topId = `${curveId}-top`
  const bottomId = `${curveId}-bottom`

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), HOLD_MS + FADE_MS)
    return () => window.clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="preloader" role="status" aria-live="polite" aria-label="RCCG The Envoys Faith Flash">
      <div className="preloader__content">
        <div className="preloader__logo">
          <div className="preloader__spinner">
            <img src="https://www.rccgtheenvoys.org/images/envoys1.png" alt="" className="preloader__icon" />
            <svg className="preloader__svg" viewBox="0 0 100 100" aria-hidden="true">
              <path id={topId} fill="none" d="M 8,50 A 42,42 0 0,1 92,50" />
              <path id={bottomId} fill="none" d="M 16,54 A 34,34 0 0,0 84,54" />
              <text className="preloader__text" textAnchor="middle">
                <textPath href={`#${topId}`} startOffset="50%">
                  RCCG THE ENVOYS
                </textPath>
              </text>
              <text className="preloader__text preloader__text--flash" textAnchor="middle">
                <textPath href={`#${bottomId}`} startOffset="50%">
                  FAITH FLASH
                </textPath>
              </text>
            </svg>
          </div>
        </div>
        <p className="preloader__footer">RCCG THE ENVOYS FAITH FLASH</p>
      </div>
      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          background: #F8F8F6;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeOut ${FADE_MS}ms ease ${HOLD_MS}ms forwards;
        }

        .preloader__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
          padding: 1.5rem;
        }

        .preloader__spinner {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preloader__icon {
          position: relative;
          z-index: 2;
          width: auto;
          height: 58px;
          object-fit: contain;
          object-position: center;
          background: transparent;
        }

        .preloader__svg {
          position: absolute;
          inset: 0;
          animation: rotate 10s linear infinite;
        }

        .preloader__text {
          fill: var(--color-accent);
          font-family: var(--font-display);
          font-size: 7px;
          font-weight: 400;
          letter-spacing: 1.1px;
          text-transform: uppercase;
        }

        .preloader__text--flash {
          font-size: 6.5px;
          letter-spacing: 1.6px;
        }

        .preloader__footer {
          margin: 0;
          font-family: var(--font-display);
          letter-spacing: 0.14em;
          font-size: clamp(0.85rem, 2.6vw, 1.05rem);
          color: var(--color-text);
          text-align: center;
          text-transform: uppercase;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </div>
  )
}
