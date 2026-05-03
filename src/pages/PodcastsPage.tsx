import { site } from '../content/site'
import { PodcastCard } from '../components/PodcastCard'

export function PodcastsPage() {
  return (
    <main className="page" style={{ paddingTop: '140px' }}>
      <section className="band">
        <div className="container">
          <div className="section-heading">
            <div className="live-pulse">
              <div className="live-pulse__dot" />
              Kingdom Frequencies
            </div>
            <h1 className="section-heading__title">The Sound of <span style={{ color: 'var(--color-accent)' }}>Revival</span></h1>
            <p className="hero__lede">Supernatural upgrades for the marketplace ambassador.</p>
          </div>
          
          <div className="studio-deck">
            {site.podcasts.map((p) => (
              <PodcastCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section className="band" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-heading__title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Global Deployment</h2>
          <div className="cta-row" style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn btn--outline" href="#">Apple Podcasts</a>
            <a className="btn btn--outline" href="#">Spotify</a>
            <a className="btn btn--outline" href="#">Amazon Music</a>
          </div>
        </div>
      </section>

      <style>{`
        .studio-deck {
          display: grid;
          gap: 1.5rem;
          max-width: 900px;
          margin-inline: auto;
          background: #0f0f0f;
          padding: 3rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-line);
          box-shadow: var(--shadow-huge);
        }
      `}</style>
    </main>
  )
}
