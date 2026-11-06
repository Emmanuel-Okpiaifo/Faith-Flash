import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { appHref } from '../lib/appHref'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export function MagazinesPage() {
  const magazines = site.magazines

  return (
    <>
      <Seo
        title="Magazines | Faith Flash | RCCG The Envoys"
        description="Read Faith Flash magazines from RCCG The Envoys, including the Mercy Convention 2026 recap Unending Open Doors. Open each issue as a flipbook in your browser."
        path="/magazines"
        keywords="Faith Flash magazine, Unending Open Doors, Mercy Convention 2026 magazine, RCCG The Envoys recap"
        image={appHref(magazines[0]?.cover ?? site.logo)}
      />
      <PageHero
        eyebrow="The Reading Room"
        title="Faith Flash Magazines"
        lede="Print-quality recaps and convention journals from the Faith Flash desk. Open each magazine as a flipbook, right here in your browser."
      />
      <section className="band">
        <div className="container">
          <div className="magazine-grid stagger reveal">
            {magazines.map((m) => (
              <article key={m.slug} className="magazine-card">
                <Link to={`/magazines/${m.slug}`} className="magazine-card__cover" aria-label={`Open ${m.title} flipbook`}>
                  <img
                    src={appHref(m.cover)}
                    alt={`${m.title} cover`}
                    className="magazine-card__cover-img"
                    loading="lazy"
                  />
                  <span className="magazine-card__open-badge" aria-hidden>
                    Open flipbook →
                  </span>
                </Link>
                <div className="magazine-card__content">
                  <h2 className="magazine-card__title">{m.title}</h2>
                  <p className="magazine-card__issue">{m.issue}</p>
                  <p className="magazine-card__dates">{m.dates}</p>
                  <div className="magazine-card__actions">
                    <Link to={`/magazines/${m.slug}`} className="btn btn--accent">
                      Read
                    </Link>
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
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.75rem;
          margin-top: 2.5rem;
          max-width: 1100px;
          margin-inline: auto;
        }
        .magazine-card {
          background: #fff;
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .magazine-card:hover {
          border-color: rgba(13, 13, 13, 0.2);
        }
        .magazine-card__cover {
          position: relative;
          display: block;
          aspect-ratio: 3/4;
          background: #EFEFEA;
          overflow: hidden;
          text-decoration: none;
        }
        .magazine-card__cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.4s ease;
        }
        .magazine-card:hover .magazine-card__cover-img {
          transform: scale(1.03);
        }
        .magazine-card__open-badge {
          position: absolute;
          left: 0.75rem;
          bottom: 0.75rem;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(6px);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.4rem 0.7rem;
          border-radius: 999px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .magazine-card:hover .magazine-card__open-badge,
        .magazine-card:focus-within .magazine-card__open-badge {
          opacity: 1;
          transform: translateY(0);
        }
        .magazine-card__content {
          padding: 1rem 1.1rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .magazine-card__title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          line-height: 1.1;
          letter-spacing: 0.01em;
          margin: 0;
          color: var(--color-text);
        }
        .magazine-card__issue {
          margin: 0;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
        }
        .magazine-card__dates {
          margin: 0;
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
        .magazine-card__actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        .magazine-card__actions .btn {
          padding: 0.5rem 0.9rem;
          font-size: 0.75rem;
          text-decoration: none;
          flex: 1;
          text-align: center;
        }

        @media (max-width: 480px) {
          .magazine-grid {
            grid-template-columns: 1fr;
            max-width: 320px;
          }
        }
      `}</style>
    </>
  )
}
