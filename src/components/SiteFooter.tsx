import { site } from '../content/site'
import { appHref } from '../lib/appHref'

const FOOTER_LOGO = 'https://www.rccgtheenvoys.org/images/envoys1.png'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img
                src={FOOTER_LOGO}
                alt=""
                width={50}
                height={50}
                style={{ height: '50px', width: '50px', borderRadius: '50%', border: '1px solid var(--color-accent)', objectFit: 'contain', objectPosition: 'center', background: '#000' }}
              />
              <h3 className="site-header__dept">{site.department}</h3>
            </div>
            <p className="tile__text" style={{ maxWidth: '30ch' }}>{site.tagline}</p>
          </div>
          <div>
            <h4 className="audio-card__meta" style={{ color: '#fff' }}>Connect</h4>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {site.quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.external ? l.href : appHref(l.href)}
                    className="nav-link"
                    style={{ fontSize: '0.75rem' }}
                    {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-line)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <span>© {year} {site.church}</span>
          <span>Built for the Digital Harvest</span>
        </div>
      </div>
    </footer>
  )
}
