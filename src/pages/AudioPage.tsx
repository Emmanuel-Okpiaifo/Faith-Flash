import { PageHero } from '../components/PageHero'

export function AudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Audio"
        title="The Sound of Revival"
        lede="Life can be loud, but truth speaks in stillness. Meet yourself wherever you are. Listen to messages that heal, teachings that guide, and conversations that ignite purpose."
      />
      <section className="band" id="audio">
        <div className="container">
          <div className="coming-soon-container">
            <div className="coming-soon-card reveal">
              <h2 className="coming-soon-title">Audio Messages Coming Soon</h2>
              <p className="coming-soon-text">
                Messages for marketplace ambassadors are being prepared. This shelf will hold them when they are ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
