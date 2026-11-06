import { Link } from 'react-router-dom'
import { site } from '../content/site'

const LOGO = 'https://www.rccgtheenvoys.org/images/envoys1.png'

function SocialIcon({ label }: { label: string }) {
  if (label === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.7h2V21h2.8v-9.8h2.3l.4-2.7h-2.7z" />
      </svg>
    )
  }
  if (label === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
    </svg>
  )
}

const faithFlashLinks = [
  { to: '/', label: 'Home' },
  { to: '/online-tv', label: 'Media' },
  { to: '/testimonies', label: 'Testimonies' },
  { to: '/magazines', label: 'Magazines' },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer reveal">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <img src={LOGO} alt="" className="site-footer__logo" width={160} height={48} />
            <p className="site-footer__blurb">{site.desk}</p>
          </div>
          <div>
            <h2 className="site-footer__title">Faith Flash</h2>
            <ul className="site-footer__links">
              {faithFlashLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="site-footer__title">The Church</h2>
            <ul className="site-footer__links">
              {site.churchLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="site-footer__title">Contact</h2>
            <ul className="site-footer__links">
              <li>{site.contact.address}</li>
              <li>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>
                <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              </li>
            </ul>
            <ul className="site-footer__socials">
              {site.socials.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    <SocialIcon label={item.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="site-footer__bar">
          <span>© {year} {site.church}</span>
          <span>{site.churchWord}</span>
          <span>{site.serviceTimes}</span>
        </div>
      </div>
    </footer>
  )
}
