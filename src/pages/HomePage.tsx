import { useNavigate } from 'react-router-dom'
import { site } from '../content/site'
import { TestimonyBubble } from '../components/TestimonyBubble'
import { MagneticButton } from '../components/MagneticButton'
import { HouseHero } from '../components/HouseHero'
import { Seo, homeJsonLd } from '../components/Seo'
import { useMemo } from 'react'

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

  return (
    <>
      <Seo
        title="Faith Flash | Announcements and Testimonies | RCCG The Envoys"
        description="Faith Flash is the announcements and testimony desk of RCCG The Envoys. This is where faith finds expression through the news of the house, testimonies, and magazines."
        path="/"
        keywords="Faith Flash, RCCG The Envoys, testimonies, church announcements, We Are Sent To Nations, Night of Mercy, Pastor Daniel Olawande"
        image={site.shareImage}
        jsonLd={homeJsonLd}
      />
      <HouseHero />

      <section className="band" id="programs">
        <div className="container">
          <div className="section-heading reveal" style={{ textAlign: 'center' }}>
            <h2 className="section-heading__title">Church Programs</h2>
            <p className="hero__lede" style={{ marginInline: 'auto' }}>
              The weekly services at RCCG The Envoys. {site.churchWord}.
            </p>
          </div>
          <div className="announcement-grid stagger reveal">
            {site.programs.map((item) => (
              <article key={item.id} className="announcement-card">
                <div className="announcement-card__content">
                  <div className="announcement-card__badge">{item.when}</div>
                  <h3 className="announcement-card__title">{item.title}</h3>
                  <p className="announcement-card__description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band meet-team">
        <div className="container">
          <div className="section-heading reveal" style={{ textAlign: 'center' }}>
            <h2 className="section-heading__title">
              Meet The <span style={{ color: 'var(--color-accent)' }}>Team</span>
            </h2>
            <p className="team-section__subtext">
              The people carrying the fire behind Faith Flash.
            </p>
          </div>

          <div className="team-grid stagger reveal">
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

      <section className="band" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-heading reveal" style={{ textAlign: 'center' }}>
            <h2 className="section-heading__title">Testimonies</h2>
          </div>
          <div className="testimony-wall stagger reveal">
            {site.testimonies.slice(0, 2).map((t) => (
              <TestimonyBubble key={t.id} {...t} />
            ))}
          </div>
          <div className="reveal" style={{ marginTop: '4rem', textAlign: 'center' }}>
            <MagneticButton className="btn--accent" onClick={() => navigate('/testimonies')}>Join The Testimonies Wall</MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
