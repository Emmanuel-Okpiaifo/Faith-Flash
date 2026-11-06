import { site } from '../content/site'
import { NotifyForm } from '../components/NotifyForm'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export function OnlineTVPage() {
  return (
    <>
      <Seo
        title="Online TV | Faith Flash | RCCG The Envoys"
        description="Watch Faith Flash Online TV from RCCG The Envoys. Livestreams and house features will live here when they are ready."
        path="/online-tv"
        keywords="Faith Flash Online TV, RCCG The Envoys live, Envoys YouTube"
        image={site.logo}
      />
      <PageHero
        eyebrow="Online TV"
        title="Faith Flash Online TV"
        lede="Livestreams and house features from RCCG The Envoys will live here when they are ready."
      />

      <section className="band" id="podcasts">
        <div className="container">
          <div className="coming-soon-container">
            <div className="coming-soon-card reveal">
              <h2 className="coming-soon-title">Being prepared</h2>
              <p className="coming-soon-text">
                Faith Flash Online TV is not on air yet. Leave your name and we will write when a livestream or house feature is ready.
              </p>
              <NotifyForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
