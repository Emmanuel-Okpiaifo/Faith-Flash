import { Link, useParams } from 'react-router-dom'
import { site } from '../content/site'
import { appHref } from '../lib/appHref'
import { DearFlipViewer } from '../components/DearFlipViewer'
import { PageHero } from '../components/PageHero'

export function MagazineViewerPage() {
  const { slug } = useParams<{ slug: string }>()
  const magazine = site.magazines.find((m) => m.slug === slug)

  if (!magazine) {
    return (
      <>
        <PageHero
          eyebrow="The Reading Room"
          title="Magazine not found"
          lede="We couldn’t find that issue. Head back to the magazine shelf to pick another."
        />
        <section className="band">
          <div className="container" style={{ textAlign: 'center' }}>
            <Link to="/magazines" className="btn btn--accent" style={{ textDecoration: 'none' }}>
              Back to magazines
            </Link>
          </div>
        </section>
      </>
    )
  }

  const pdfUrl = appHref(magazine.file)

  return (
    <>
      <PageHero eyebrow={magazine.issue} title={magazine.title} lede={magazine.dates} />
      <section className="band">
        <div className="container">
          <div className="magazine-viewer__header reveal">
            <Link to="/magazines" className="nav-link magazine-viewer__back">
              ← All magazines
            </Link>
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="btn btn--outline">
              Open PDF in new tab
            </a>
          </div>
          <div className="magazine-viewer__stage-wrap reveal">
            <DearFlipViewer pdfUrl={pdfUrl} title={magazine.title} height={720} />
          </div>
        </div>
      </section>

      <style>{`
        .magazine-viewer__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .magazine-viewer__back {
          font-size: 0.95rem;
        }
        .magazine-viewer__header .btn {
          text-decoration: none;
        }
        .magazine-viewer__stage-wrap {
          background: #fff;
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          padding: 1rem;
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
          border: 3px solid rgba(13, 13, 13, 0.12);
          border-top-color: var(--color-accent);
          animation: dflip-spin 0.9s linear infinite;
        }
        @keyframes dflip-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 720px) {
          .magazine-viewer__stage-wrap { padding: 0.5rem; }
          .dearflip__stage, .dearflip { min-height: 420px; }
        }
      `}</style>
    </>
  )
}
