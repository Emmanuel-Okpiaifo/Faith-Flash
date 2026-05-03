import { useEffect, useState } from 'react'

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="preloader">
      <div className="preloader__content">
        <div className="preloader__logo">
          <div className="preloader__spinner">
             <img src="https://www.rccgtheenvoys.org/images/envoys1.png" alt="Logo" className="preloader__icon" />
             <svg className="preloader__svg" viewBox="0 0 100 100">
               <path
                 id="curve"
                 fill="transparent"
                 d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
               />
               <text className="preloader__text">
                 <textPath xlinkHref="#curve">
                   RCCG THE ENVOYS • THE SENT ONES • RCCG THE ENVOYS • THE SENT ONES •
                 </textPath>
               </text>
             </svg>
          </div>
        </div>
        <div className="preloader__footer">
          THE SENT ONES
        </div>
      </div>
      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeOut 0.5s ease 2.2s forwards;
        }

        .preloader__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
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
          width: 80px;
          height: 80px;
          border-radius: 50%;
          z-index: 2;
        }

        .preloader__svg {
          position: absolute;
          inset: 0;
          animation: rotate 10s linear infinite;
        }

        .preloader__text {
          fill: var(--color-accent);
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .preloader__footer {
          font-family: var(--font-display);
          letter-spacing: 0.5em;
          font-size: 0.8rem;
          color: #fff;
          opacity: 0.5;
          animation: pulse 1.5s infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
