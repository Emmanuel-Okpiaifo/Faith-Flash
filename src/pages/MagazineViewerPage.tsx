import { Link, useParams } from 'react-router-dom'
import { site } from '../content/site'
import { appHref } from '../lib/appHref'
import { DearFlipViewer } from '../components/DearFlipViewer'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

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
      <Seo
        title="Unending Open Doors | Mercy Convention 2026 | Faith Flash"
        description="Open Unending Open Doors, the Faith Flash recap magazine for Mercy Convention 2026 at RCCG The Envoys, Ikeja, held 14 to 22 October 2026."
        path={`/magazines/${magazine.slug}`}
        keywords="Unending Open Doors, Mercy Convention 2026, Faith Flash magazine, RCCG The Envoys, Pastor Daniel Olawande, Dr. Nifemi Olawande"
        image={appHref(magazine.cover)}
      />
      <PageHero
        eyebrow={magazine.issue}
        title={magazine.title}
        lede={`${magazine.dates}. A recap magazine from the Faith Flash desk.`}
      />
      <section className="band magazine-viewer">
        <div className="container">
          <div className="magazine-viewer__header reveal">
            <Link to="/magazines" className="nav-link magazine-viewer__back">
              ← All magazines
            </Link>
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="btn btn--outline">
              Open PDF in new tab
            </a>
          </div>
        </div>
        <div className="magazine-viewer__stage-wrap reveal">
          <DearFlipViewer pdfUrl={pdfUrl} title={magazine.title} />
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
        .magazine-viewer {
          padding-top: 1.5rem;
        }
        .magazine-viewer__stage-wrap {
          width: min(1440px, calc(100% - 1.5rem));
          margin: 0 auto;
          background: #fff;
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          padding: 0.35rem 0.35rem 0.5rem;
        }
        .dearflip,
        .dearflip__stage {
          position: relative;
          width: 100%;
          min-height: min(82vh, 980px);
        }
        .dearflip .df-container,
        .dearflip ._df_book {
          width: 100%;
          max-width: none;
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
        @media (max-width: 960px) {
          .magazine-viewer { padding-top: 1rem; }
          .magazine-viewer__stage-wrap {
            width: 100%;
            border-radius: 0;
            border-left: 0;
            border-right: 0;
            padding: 0;
          }
          .dearflip,
          .dearflip__stage {
            min-height: 78vh;
          }
        }
      `}</style>
    </>
  )
}
