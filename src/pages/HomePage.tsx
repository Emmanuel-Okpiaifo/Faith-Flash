import { useNavigate } from 'react-router-dom'
import { site } from '../content/site'
import { BroadcastCard } from '../components/BroadcastCard'
import { TestimonyBubble } from '../components/TestimonyBubble'
import { MagneticButton } from '../components/MagneticButton'
import { useVideoModal } from '../context/VideoModalContext'
import { useEffect, useMemo, useRef } from 'react'

type TeamMember = {
  path: string
  name: string
  role: string
  image: string
  priority: number
}

/** Any new image in this folder is picked up; extension is filtered so stray files are ignored. */
const teamAssetModules = import.meta.glob('../assets/img/Team-Members/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const TEAM_IMAGE_EXT = /\.(jpe?g|png|webp)$/i

export function HomePage() {
  const navigate = useNavigate()
  const { openModal } = useVideoModal()
  const scrollRefs = useRef<HTMLDivElement[]>([])
  const teamMembers = useMemo<TeamMember[]>(() => {
    return Object.entries(teamAssetModules)
      .filter(([path]) => TEAM_IMAGE_EXT.test(path))
      .map(([path, image]) => {
        const raw = path.split('/').pop()?.replace(/\.[^.]+$/i, '') ?? ''
        const roleMatch = raw.match(/\(([^)]+)\)/)
        const role = roleMatch?.[1]?.trim() ?? 'Team Member'
        const name = raw.replace(/\s*\([^)]+\)\s*$/, '').trim()
        const roleKey = role.toLowerCase()
        const priority =
          roleKey === 'assistant team lead'
            ? 1
            : roleKey === 'team lead'
              ? 0
              : 2

        return { path, name, role, image, priority }
      })
      .sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority
        return a.name.localeCompare(b.name)
      })
  }, [])

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
              This is where Faith finds Expression
            </div>
            <div className="hero__card-body">
              <h3 className="hero__card-title">Envoys Heartbeat</h3>
              <p className="hero__card-meta">Where stories breathe and voices rise!</p>
            </div>
          </div>
        </div>

        <div className="hero__actions">
          <MagneticButton className="btn--accent" onClick={() => navigate('/online-tv')}>
            Enter The Faith Hub
          </MagneticButton>
          <MagneticButton className="btn--outline" onClick={() => navigate('/testimonies')}>
            Report Testimony
          </MagneticButton>
        </div>
      </section>

      <section className="band reveal meet-team" ref={addToRefs}>
        <div className="container">
          <div className="section-heading" style={{ textAlign: 'center' }}>
            <h2 className="section-heading__title">
              Meet The <span style={{ color: 'var(--color-accent)' }}>Team</span>
            </h2>
            <p className="team-section__subtext">
              The people carrying the fire behind Faith Flash.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <article
                key={member.path}
                className={[
                  'team-card',
                  member.priority < 2 ? 'team-card--featured' : '',
                  member.name === 'Emmanuel Okpiaifo' ? 'team-card--photo-zoom-out' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="team-card__media">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="team-card__content">
                  <h3 className="team-card__name">{member.name}</h3>
                  <p
                    className={[
                      'team-card__role',
                      member.role.toLowerCase() === 'assistant team lead'
                        ? 'team-card__role--assistant-lead'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
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
