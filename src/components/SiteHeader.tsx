import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/online-tv', label: 'Online TV' },
  { to: '/testimonies', label: 'Testimonies' },
  { to: '/podcasts', label: 'Audio' },
] as const

interface SiteHeaderProps {
  scrolled?: boolean
}

export function SiteHeader({ scrolled }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__bar">
        <NavLink to="/" className="site-header__dept" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
          <img src="https://www.rccgtheenvoys.org/images/envoys1.png" alt="Logo" style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
          <span style={{ fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>FAITH FLASH</span>
        </NavLink>
        
        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="hero__title"
              style={{ fontSize: '2.5rem', textDecoration: 'none' }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}
