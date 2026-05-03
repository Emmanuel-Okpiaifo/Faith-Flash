import { useState } from 'react'
import { site } from '../content/site'
import { TestimonyBubble } from '../components/TestimonyBubble'

export function TestimoniesPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="page" style={{ paddingTop: '140px' }}>
      <section className="band">
        <div className="container">
          <div className="section-heading" style={{ textAlign: 'center' }}>
            <div className="live-pulse" style={{ marginInline: 'auto' }}>
              <div className="live-pulse__dot" />
              The Fire Wall
            </div>
            <h1 className="hero__title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>Fire Encounters</h1>
            <p className="hero__lede" style={{ marginInline: 'auto' }}>Your encounter with the supernatural could be the spark that sets a generation on fire.</p>
          </div>
          
          <div className="testimony-wall">
            {site.testimonies.map((t) => (
              <TestimonyBubble key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band--tint" id="contact">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="form-card">
            <div className="section-heading" style={{ textAlign: 'center' }}>
              <h2 className="section-heading__title">Report an Encounter</h2>
              <p className="hero__lede" style={{ marginInline: 'auto' }}>We are a shouting church. How has the fire of the Holy Spirit upgraded your life?</p>
            </div>

            {submitted ? (
              <div className="notice notice--success">
                <h3 className="audio-card__title">Encounter Reported!</h3>
                <p className="tile__text">Your encounter has been recorded in the Fire Hub. Our team will review it for global broadcast to the burning generation.</p>
                <button className="btn btn--accent" style={{ marginTop: '1.5rem' }} onClick={() => setSubmitted(false)}>
                  Report another
                </button>
              </div>
            ) : (
              <form className="testimony-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="field__label" htmlFor="name">Envoy Name</label>
                  <input className="field__input" type="text" id="name" required placeholder="Envoy John Doe" />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="email">Email for Impartation</label>
                  <input className="field__input" type="email" id="email" required placeholder="envoy@fire.com" />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="story">The Encounter</label>
                  <textarea
                    className="field__input"
                    id="story"
                    required
                    style={{ minHeight: '160px', resize: 'vertical' }}
                    placeholder="Describe your encounter with the fire..."
                  ></textarea>
                </div>
                <button className="btn btn--accent" type="submit">
                  Submit Encounter Report
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
