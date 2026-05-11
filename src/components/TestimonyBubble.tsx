import { useState } from 'react'

interface TestimonyBubbleProps {
  name: string
  quote: string
  initials: string
}

function monogram(name: string, initials: string) {
  const t = (initials ?? '').trim()
  if (t.length >= 1) return t.slice(0, 2).toUpperCase()
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function TestimonyBubble({ name, quote, initials }: TestimonyBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const words = quote.split(' ')
  const previewLength = 20
  const isLong = words.length > previewLength
  const preview = isLong ? words.slice(0, previewLength).join(' ') + '…' : quote
  const label = monogram(name, initials)

  return (
    <>
      <article
        className={`testimony-bubble${isLong ? ' testimony-bubble--interactive' : ''}`}
        onClick={() => isLong && setIsExpanded(true)}
        onKeyDown={(e) => {
          if (isLong && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            setIsExpanded(true)
          }
        }}
        role={isLong ? 'button' : undefined}
        tabIndex={isLong ? 0 : undefined}
        aria-expanded={isLong ? isExpanded : undefined}
      >
        <div className="testimony-bubble__quote-mark" aria-hidden>
          “
        </div>

        <p className="testimony-bubble__quote">{preview}</p>

        <div className="testimony-bubble__footer">
          <div className="testimony-bubble__author">
            <span className="testimony-bubble__avatar">{label}</span>
            <span className="testimony-bubble__name">{name}</span>
          </div>

          {isLong && (
            <span className="testimony-bubble__cta">
              Read full testimony
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>
      </article>

      {isExpanded && isLong && (
        <div
          className="testimony-modal__backdrop"
          onClick={() => setIsExpanded(false)}
          role="presentation"
        >
          <div
            className="testimony-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimony-modal-title"
          >
            <button
              type="button"
              className="testimony-modal__close"
              onClick={() => setIsExpanded(false)}
              aria-label="Close testimony"
            >
              ✕
            </button>

            <div>
              <p className="testimony-modal__eyebrow">Fire encounter</p>
              <h2 id="testimony-modal-title" className="testimony-modal__title">
                {name}
              </h2>
            </div>

            <div className="testimony-modal__body">{quote}</div>

            <div className="testimony-modal__footer">
              <button
                type="button"
                className="btn btn--outline testimony-modal__dismiss"
                onClick={() => setIsExpanded(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
