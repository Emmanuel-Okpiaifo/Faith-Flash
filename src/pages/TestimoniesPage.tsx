import { site } from '../content/site'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { TestimonyBubble } from '../components/TestimonyBubble'

export function TestimoniesPage() {
  const count = site.testimonies.length

  return (
    <>
      <Seo
        title="Fire Encounters | Testimonies | Faith Flash | RCCG The Envoys"
        description="Fire Encounters gathers testimonies from RCCG The Envoys, Ikeja. Read how God is moving in the house, and share your own testimony with Faith Flash."
        path="/testimonies"
        keywords="RCCG The Envoys testimonies, Fire Encounters, Faith Flash testimonies, Night of Mercy testimony, Ikeja church testimonies"
      />
      <PageHero
        eyebrow="The Fire Wall"
        title="Fire Encounters"
        lede={`${count} stories of faith on record. Every testimony is a reminder that God is still moving — evidence that faith finds expression.`}
      />

      <section className="band">
        <div className="container">
          <div className="testimony-wall stagger reveal">
            {site.testimonies.map((t) => (
              <TestimonyBubble key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band--tint" id="contact">
        <div className="container">
          <div className="section-heading reveal" style={{ textAlign: 'center', maxWidth: '36rem', marginInline: 'auto' }}>
            <h2 className="section-heading__title">Share Your Testimony</h2>
            <p className="hero__lede" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
              Congratulations. We are excited about what God is doing in your life. Share your encounter with us.
            </p>
            <a
              href="https://bit.ly/Rccgenvoystestimonies"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--gold"
              style={{ textDecoration: 'none' }}
            >
              Fill Testimony Form
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
