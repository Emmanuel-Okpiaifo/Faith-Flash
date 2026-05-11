import { YouTubeEmbed } from '../components/YouTubeEmbed'

export function OnlineTVPage() {

  const announcementVideos = [
    {
      id: 'ann-1',
      title: 'Upcoming Miracle Service',
      date: '2026-05-18',
      description: 'Join us for a night of divine encounter and healing.',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: 'ann-2',
      title: 'Global Impact Initiative Launch',
      date: '2026-05-25',
      description: 'Deploying the Kingdom across nations.',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: 'ann-3',
      title: 'Summer Revival Blast',
      date: '2026-06-01',
      description: 'A season of fire, transformation, and breakthrough.',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: 'ann-4',
      title: 'Leadership Summit 2026',
      date: '2026-06-15',
      description: 'Equipping visionary Sent Ones for kingdom dominion.',
      videoId: 'dQw4w9WgXcQ',
    },
  ]

  return (
    <main className="page" style={{ paddingTop: '140px' }}>
      <section className="band">
        <div className="container">
          <div className="section-heading">
            <div className="live-pulse">
              <div className="live-pulse__dot" />
              Faith Flash Media
            </div>
            <h1 className="section-heading__title">Faith Flash <span style={{ color: 'var(--color-accent)' }}>Podcasts</span></h1>
            <p className="hero__lede">Conversations that heal. Teachings that guide. Messages recorded straight from the fire of revival.</p>
          </div>

          <div className="coming-soon-container">
            <div className="coming-soon-card">
              <div className="coming-soon-icon">🔥</div>
              <h2 className="coming-soon-title">Podcast Series Coming Soon</h2>
              <p className="coming-soon-text">We're preparing transformative conversations with Kingdom leaders, marketplace prophets, and fire-carriers. Episodes are in production and will debut soon.</p>
              <div className="coming-soon-details">
                <div className="detail-item">
                  <span className="detail-label">Series</span>
                  <span className="detail-value">UPGRADE • WISDOM • ENCOUNTER</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Format</span>
                  <span className="detail-value">30-40 min deep-dive conversations</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Release</span>
                  <span className="detail-value">Weekly • Every Friday</span>
                </div>
              </div>
              <button className="btn btn--accent" style={{ marginTop: '2rem' }}>Notify Me When Live</button>
            </div>
          </div>
        </div>
      </section>

      <section className="band" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-heading">
            <div className="live-pulse">
              <div className="live-pulse__dot" />
              Inside Access
            </div>
            <h2 className="section-heading__title">What's <span style={{ color: 'var(--color-accent)' }}>Happening?</span></h2>
            <p className="hero__lede">Stay connected to every move of the Spirit. Important updates, upcoming events, and ministry announcements delivered straight to you.</p>
          </div>

          <div className="announcement-grid">
            {announcementVideos.map((video) => (
              <div key={video.id} className="announcement-card">
                <div className="announcement-card__video-wrapper">
                  <div className="announcement-card__video">
                    <YouTubeEmbed videoId={video.videoId} title={video.title} />
                  </div>
                  <div className="announcement-card__badge">Announcement</div>
                </div>
                <div className="announcement-card__content">
                  <h3 className="announcement-card__title">{video.title}</h3>
                  <p className="announcement-card__date">{new Date(video.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  <p className="announcement-card__description">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .coming-soon-container {
          max-width: 900px;
          margin-inline: auto;
          padding: 3rem 2rem;
        }
        .coming-soon-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: var(--shadow-huge);
        }
        .coming-soon-icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          display: block;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .coming-soon-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0;
          color: var(--color-text);
        }
        .coming-soon-text {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          margin: 1.5rem 0 2rem 0;
          line-height: 1.6;
          max-width: 700px;
          margin-inline: auto;
        }
        .coming-soon-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
          padding: 2rem 0;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
        }
        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .detail-label {
          font-size: 0.85rem;
          color: var(--color-accent);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .detail-value {
          font-size: 1rem;
          color: var(--color-text);
          font-weight: 500;
        }

        .announcement-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin-inline: auto;
        }
        .announcement-card {
          background: #0a0a0a;
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .announcement-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-accent);
          box-shadow: var(--shadow-huge), 0 0 20px rgba(255, 192, 61, 0.1);
        }
        .announcement-card__video-wrapper {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #000;
        }
        .announcement-card__video {
          width: 100%;
          height: 100%;
        }
        .announcement-card__badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--color-accent);
          color: #000;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .announcement-card__content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .announcement-card__title {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.75rem 0;
          color: var(--color-text);
          line-height: 1.3;
        }
        .announcement-card__date {
          font-size: 0.85rem;
          color: var(--color-accent);
          margin: 0 0 1rem 0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .announcement-card__description {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          margin: 0;
          line-height: 1.5;
          flex-grow: 1;
        }
      `}</style>
    </main>
  )
}
