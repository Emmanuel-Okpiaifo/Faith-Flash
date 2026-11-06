import { useState, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/online-tv', label: 'Media' },
  { to: '/testimonies', label: 'Testimonies' },
  { to: '/magazines', label: 'Magazines' },
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
        <NavLink to="/" className="site-header__brand">
          <img
            src="https://www.rccgtheenvoys.org/images/envoys1.png"
            alt="RCCG The Envoys"
            className="site-header__logo"
          />
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
