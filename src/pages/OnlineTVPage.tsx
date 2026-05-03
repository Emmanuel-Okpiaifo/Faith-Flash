import { site } from '../content/site'
import { BroadcastCard } from '../components/BroadcastCard'
import { YouTubeEmbed } from '../components/YouTubeEmbed'
import { useVideoModal } from '../context/VideoModalContext'

export function OnlineTVPage() {
  const { openModal } = useVideoModal()

  return (
    <main className="page" style={{ paddingTop: '140px' }}>
      <section className="band">
        <div className="container">
          <div className="live-pulse">
            <div className="live-pulse__dot" />
            Live Fire Feed
          </div>
          <div className="broadcast-monitor">
            <div className="broadcast-monitor__screen">
              <YouTubeEmbed videoId={site.youtube.liveEmbedVideoId} title="Live" />
            </div>
            <div className="broadcast-monitor__meta">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <h1 className="broadcast-card__title" style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>Global Fire Hub</h1>
                  <p className="nav-link" style={{ marginTop: '0.5rem' }}>1,248 Envoys currently burning online</p>
                </div>
                <button className="btn btn--accent" style={{ padding: '0.75rem 1.5rem' }}>Join The Shout</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">Program <span style={{ color: 'var(--color-accent)' }}>Guide</span></h2>
            <p className="hero__lede">Explore past broadcasts and special recaps.</p>
          </div>
          
          <div className="tile-grid">
            {site.episodes.map((ep) => (
              <BroadcastCard 
                key={ep.title} 
                {...ep} 
                onClick={() => openModal(ep)}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .broadcast-monitor {
          background: #000;
          border-radius: 40px;
          padding: 2rem;
          border: 1px solid var(--color-line);
          box-shadow: var(--shadow-huge), var(--shadow-gold);
        }
        .broadcast-monitor__screen {
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 2rem;
          aspect-ratio: 16/9;
        }
      `}</style>
    </main>
  )
}
