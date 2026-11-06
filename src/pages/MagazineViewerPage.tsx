import { Link, useParams } from 'react-router-dom'
import { site } from '../content/site'
import { appHref } from '../lib/appHref'
import { DearFlipViewer } from '../components/DearFlipViewer'

export function MagazineViewerPage() {
  const { slug } = useParams<{ slug: string }>()
  const magazine = site.magazines.find((m) => m.slug === slug)

  if (!magazine) {
    return (
      <main className="page" style={{ paddingTop: '140px' }}>
        <section className="band">
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="section-heading">
              <h1 className="section-heading__title">Magazine not found</h1>
              <p className="hero__lede">
                We couldn’t find that issue. Head back to the magazine shelf to pick another.
              </p>
            </div>
            <Link to="/magazines" className="btn btn--accent" style={{ textDecoration: 'none' }}>
              Back to magazines
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const pdfUrl = appHref(magazine.file)

  return (
    <main className="page magazine-viewer-page" style={{ paddingTop: '140px' }}>
      <section className="band">
        <div className="container">
          <div className="magazine-viewer__header">
            <div>
              <Link to="/magazines" className="nav-link magazine-viewer__back">
                ← All magazines
              </Link>
              <h1 className="section-heading__title magazine-viewer__title">
                {magazine.title}
              </h1>
              <p className="magazine-viewer__meta">
                <span>{magazine.issue}</span>
                <span aria-hidden>·</span>
                <span>{magazine.theme}</span>
                <span aria-hidden>·</span>
                <span>{magazine.dates}</span>
              </p>
              <p className="magazine-viewer__status">{magazine.status}</p>
            </div>
            <div className="magazine-viewer__actions">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--outline"
              >
                Open PDF in new tab
              </a>
            </div>
          </div>

          <div className="magazine-viewer__stage-wrap">
            <DearFlipViewer pdfUrl={pdfUrl} title={magazine.title} height={720} />
          </div>

          <p className="magazine-viewer__credit">
            Flipbook powered by{' '}
            <a
              href="https://js.dearflip.com/"
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              DearFlip (Lite)
            </a>{' '}
            — licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              CC BY-NC-ND 4.0
            </a>
            .
          </p>
        </div>
      </section>

      <style>{`
        .magazine-viewer__header {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .magazine-viewer__back {
          display: inline-block;
          margin-bottom: 1rem;
          font-size: 0.8rem;
        }
        .magazine-viewer__title {
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          margin: 0 0 0.75rem 0;
        }
        .magazine-viewer__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          color: var(--color-text-muted);
          font-family: var(--font-sub);
          letter-spacing: 0.05em;
          font-size: 0.95rem;
          margin: 0 0 0.5rem 0;
        }
        .magazine-viewer__meta span[aria-hidden] {
          color: var(--color-accent);
        }
        .magazine-viewer__status {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent);
        }
        .magazine-viewer__actions {
          display: flex;
          align-items: flex-end;
        }
        .magazine-viewer__actions .btn {
          text-decoration: none;
          padding: 0.75rem 1.25rem;
          font-size: 0.85rem;
        }
        .magazine-viewer__stage-wrap {
          background: #0a0a0a;
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          padding: 1rem;
          box-shadow: var(--shadow-huge);
        }
        .magazine-viewer__credit {
          margin-top: 1.25rem;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-align: center;
        }

        .dearflip {
          position: relative;
          min-height: 480px;
        }
        .dearflip__stage {
          width: 100%;
          min-height: 480px;
        }
        .dearflip__status {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: var(--color-text-muted);
          pointer-events: none;
        }
        .dearflip__status--error {
          pointer-events: auto;
          text-align: center;
        }
        .dearflip__spinner {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.15);
          border-top-color: var(--color-accent);
          animation: dflip-spin 0.9s linear infinite;
        }
        @keyframes dflip-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 720px) {
          .magazine-viewer__header { flex-direction: column; align-items: flex-start; }
          .magazine-viewer__actions { align-items: flex-start; }
          .magazine-viewer__stage-wrap { padding: 0.5rem; }
          .dearflip__stage, .dearflip { min-height: 420px; }
        }
      `}</style>
    </main>
  )
}
