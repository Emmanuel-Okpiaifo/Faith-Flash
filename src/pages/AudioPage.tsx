import { site } from '../content/site'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export function AudioPage() {
  return (
    <>
      <Seo
        title="Audio | Faith Flash | RCCG The Envoys"
        description="Faith Flash Audio from RCCG The Envoys. Conversations and teachings from the house will appear here when episodes are ready."
        path="/online-tv/audio"
        keywords="Faith Flash podcast, Faith Flash audio, RCCG The Envoys"
        image={site.logo}
      />
      <PageHero
        eyebrow="Audio"
        title="Faith Flash Audio"
        lede="Conversations and teachings from the house will appear here when episodes are ready."
      />
      <section className="band" id="audio">
        <div className="container">
          <div className="coming-soon-container">
            <div className="coming-soon-card reveal">
              <h2 className="coming-soon-title">Audio Messages Coming Soon</h2>
              <p className="coming-soon-text">
                Faith Flash Audio is being prepared. Nothing is published here until the episodes are ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
