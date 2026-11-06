import { NotifyForm } from '../components/NotifyForm'
import { PageHero } from '../components/PageHero'

export function OnlineTVPage() {
  return (
    <>
      <PageHero
        eyebrow="Podcasts"
        title="Faith Flash Podcasts"
        lede="Conversations that heal. Teachings that guide. Messages recorded straight from the fire of revival."
      />

      <section className="band" id="podcasts">
        <div className="container">
          <div className="coming-soon-container">
            <div className="coming-soon-card reveal">
              <h2 className="coming-soon-title">Podcast Series Coming Soon</h2>
              <p className="coming-soon-text">
                We're preparing transformative conversations with Kingdom leaders, marketplace prophets, and fire-carriers. Episodes are in production and will debut soon.
              </p>
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
              <NotifyForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
