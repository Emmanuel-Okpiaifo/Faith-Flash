import { site } from '../content/site'
import { TestimonyBubble } from '../components/TestimonyBubble'

export function TestimoniesPage() {
  const count = site.testimonies.length

  return (
    <main className="page" style={{ paddingTop: '140px' }}>
      <section className="band fire-wall-band">
        <div className="fire-wall-band__ambient" aria-hidden />
        <div className="fire-wall-band__mesh" aria-hidden />
        <div className="container">
          <div className="section-heading fire-wall-intro" style={{ textAlign: 'center', maxWidth: '48rem', marginInline: 'auto' }}>
            <div className="live-pulse live-pulse--accent" style={{ marginInline: 'auto' }}>
              <div className="live-pulse__dot" />
              The Fire Wall
            </div>
            <h1 className="hero__title" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
              Fire <span style={{ color: 'var(--color-accent)' }}>Encounters</span>
            </h1>
            <p className="hero__lede" style={{ marginInline: 'auto' }}>
              Every testimony is a reminder that God is still moving—evidence that faith finds expression. Your encounter could ignite an entire generation.
            </p>
            <p className="fire-wall-intro__stats" aria-label={`${count} testimonies`}>
              <strong>{count}</strong> stories of faith on record
            </p>
          </div>

          <div className="testimony-wall">
            {site.testimonies.map((t) => (
              <TestimonyBubble key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band--tint" id="contact">
        <div className="container">
          <div style={{ maxWidth: '600px', marginInline: 'auto', textAlign: 'center' }}>
            <div className="section-heading">
              <h2 className="section-heading__title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>Share Your Testimony</h2>
              <p className="hero__lede" style={{ marginInline: 'auto', marginBottom: '2rem' }}>Congratulations! We are excited about what God is doing in your life. Click below to share your encounter with us.</p>
            </div>

            <a
              href="https://bit.ly/Rccgenvoystestimonies"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--accent"
              style={{ display: 'inline-block', padding: '0.9rem 2.5rem', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}
            >
              Fill Testimony Form
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
