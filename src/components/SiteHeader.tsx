import { useState, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'

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
  const location = useLocation()
  const menuId = useId()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpen])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__bar">
        <NavLink to="/" className="site-header__dept" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', minWidth: 0 }}>
          <img
            src="https://www.rccgtheenvoys.org/images/envoys1.png"
            alt=""
            width={40}
            height={40}
            style={{ height: '40px', width: '40px', borderRadius: '50%', flexShrink: 0, objectFit: 'contain', objectPosition: 'center', background: '#000' }}
          />
          <span style={{ fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            FAITH FLASH
          </span>
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

        <button
          type="button"
          className={`mobile-toggle ${isOpen ? 'mobile-toggle--open' : ''}`}
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="mobile-toggle__bars" aria-hidden>
            <span className="mobile-toggle__bar mobile-toggle__bar--1" />
            <span className="mobile-toggle__bar mobile-toggle__bar--2" />
            <span className="mobile-toggle__bar mobile-toggle__bar--3" />
          </span>
        </button>
      </div>

      {/* Portal: header uses backdrop-filter, which traps position:fixed to the pill — clip menu. */}
      {createPortal(
        <div
          id={menuId}
          className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          aria-hidden={!isOpen}
          inert={!isOpen ? true : undefined}
        >
          <div
            className="mobile-nav__backdrop"
            aria-hidden
            onClick={() => setIsOpen(false)}
          />
          <nav className="mobile-nav__panel" aria-label="Primary navigation">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `mobile-nav__link nav-link${isActive ? ' nav-link--active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>,
        document.body
      )}
    </header>
  )
}
