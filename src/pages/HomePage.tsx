import { useNavigate } from 'react-router-dom'
import { site } from '../content/site'
import { BroadcastCard } from '../components/BroadcastCard'
import { TestimonyBubble } from '../components/TestimonyBubble'
import { MagneticButton } from '../components/MagneticButton'
import { useVideoModal } from '../context/VideoModalContext'
import { useEffect, useRef } from 'react'

export function HomePage() {
  const navigate = useNavigate()
  const { openModal } = useVideoModal()
  const scrollRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    scrollRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el)
    }
  }

  return (
    <>
      <section className="hero">
        <h1 className="hero__title">
          Faith Flash
        </h1>
        
        <div className="hero__mission">
          RAISING A<br />SUPERNATURAL ARMY
        </div>

        <div className="hero__visual-container">
          <img 
            src={site.heroImage} 
            alt="Faith Flash Hero" 
            className="hero__image"
          />
          
          <div className="hero__floating-card">
            <div className="hero__card-header">
              Next Kingdom Deployment
            </div>
            <div className="hero__card-body">
              <h3 className="hero__card-title">Live Service</h3>
              <p className="hero__card-meta">Sunday • 1:00 PM • The Nest</p>
            </div>
          </div>
        </div>

        <div className="hero__actions">
          <MagneticButton className="btn--accent" onClick={() => navigate('/online-tv')}>
            Enter The Fire Hub
          </MagneticButton>
          <MagneticButton className="btn--outline" onClick={() => navigate('/testimonies')}>
            Report Testimony
          </MagneticButton>
        </div>
      </section>

      <section className="band reveal" ref={addToRefs}>
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">The <span style={{ color: 'var(--color-accent)' }}>Fire Archive</span></h2>
            <p className="hero__lede">Catch up on every fiery broadcast and spiritual awakening.</p>
          </div>
          <div className="tile-grid">
            {site.episodes.slice(0, 3).map((ep) => (
              <BroadcastCard 
                key={ep.title} 
                {...ep} 
                onClick={() => openModal(ep)}
              />
            ))}
          </div>
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <MagneticButton className="btn--outline" onClick={() => navigate('/online-tv')}>View All Encounters</MagneticButton>
          </div>
        </div>
      </section>

      <section className="band reveal" ref={addToRefs} style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-heading" style={{ textAlign: 'center' }}>
            <h2 className="section-heading__title">Fire <span style={{ color: 'var(--color-accent)' }}>Encounters</span></h2>
          </div>
          <div className="testimony-wall">
            {site.testimonies.slice(0, 2).map((t) => (
              <TestimonyBubble key={t.id} {...t} />
            ))}
          </div>
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <MagneticButton className="btn--accent" onClick={() => navigate('/testimonies')}>Join The Fire Wall</MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
