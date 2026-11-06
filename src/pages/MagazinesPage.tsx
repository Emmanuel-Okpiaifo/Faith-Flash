import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { appHref } from '../lib/appHref'

export function MagazinesPage() {
  const magazines = site.magazines

  return (
    <main className="page" style={{ paddingTop: '140px' }}>
      <section className="band">
        <div className="container">
          <div className="section-heading">
            <div className="live-pulse">
              <div className="live-pulse__dot" />
              The Reading Room
            </div>
            <h1 className="section-heading__title">
              Faith Flash <span style={{ color: 'var(--color-accent)' }}>Magazines</span>
            </h1>
            <p className="hero__lede">
              Print-quality recaps, convention journals, and announcements from the Faith Flash desk —
              open each magazine as a 3D flipbook, right here in your browser.
            </p>
          </div>

          <div className="magazine-grid">
            {magazines.map((m) => (
              <article key={m.slug} className="magazine-card">
                <div
                  className="magazine-card__cover"
                  style={{
                    background: `linear-gradient(145deg, ${m.accent} 0%, #0a0a0a 85%)`,
                  }}
                  aria-hidden
                >
                  <span className="magazine-card__issue">{m.issue}</span>
                  <h2 className="magazine-card__title">{m.title}</h2>
                  <span className="magazine-card__theme">{m.theme}</span>
                </div>
                <div className="magazine-card__content">
                  <p className="magazine-card__status">{m.status}</p>
                  <p className="magazine-card__description">{m.description}</p>
                  <dl className="magazine-card__meta">
                    <div>
                      <dt>Convention</dt>
                      <dd>{m.issue}</dd>
                    </div>
                    <div>
                      <dt>Dates</dt>
                      <dd>{m.dates}</dd>
                    </div>
                  </dl>
                  <div className="magazine-card__actions">
                    <Link to={`/magazines/${m.slug}`} className="btn btn--accent">
                      Open Flipbook
                    </Link>
                    <a
                      href={appHref(m.file)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn--outline"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .magazine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2.5rem;
        }
        .magazine-card {
          background: #0a0a0a;
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .magazine-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-accent);
          box-shadow: var(--shadow-huge), 0 0 20px rgba(46, 204, 113, 0.12);
        }
        .magazine-card__cover {
          aspect-ratio: 3/4;
          position: relative;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #fff;
          overflow: hidden;
        }
        .magazine-card__cover::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.18), transparent 55%);
          pointer-events: none;
        }
        .magazine-card__issue {
          font-family: var(--font-sub);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 0.75rem;
        }
        .magazine-card__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.8rem);
          line-height: 1;
          letter-spacing: 0.01em;
          margin: 0 0 0.75rem 0;
        }
        .magazine-card__theme {
          font-family: var(--font-sub);
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.9);
        }
        .magazine-card__content {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-grow: 1;
        }
        .magazine-card__status {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent);
          margin: 0;
        }
        .magazine-card__description {
          color: var(--color-text-muted);
          line-height: 1.55;
          margin: 0;
        }
        .magazine-card__meta {
          display: grid;
          gap: 0.75rem;
          margin: 0;
          padding: 1rem 0 0 0;
          border-top: 1px solid var(--color-line);
        }
        .magazine-card__meta > div {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.85rem;
        }
        .magazine-card__meta dt {
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.75rem;
        }
        .magazine-card__meta dd {
          color: var(--color-text);
          margin: 0;
          text-align: right;
        }
        .magazine-card__actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: auto;
          padding-top: 0.5rem;
        }
        .magazine-card__actions .btn {
          padding: 0.75rem 1.25rem;
          font-size: 0.85rem;
          text-decoration: none;
        }
      `}</style>
    </main>
  )
}
