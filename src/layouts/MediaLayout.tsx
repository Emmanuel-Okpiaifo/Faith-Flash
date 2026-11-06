import { NavLink, Outlet } from 'react-router-dom'

const tabs = [
  { to: '/online-tv', label: 'Podcasts', end: true },
  { to: '/online-tv/audio', label: 'Audio', end: false },
] as const

export function MediaLayout() {
  return (
    <main className="page media-shell">
      <nav className="media-switch rise-in" aria-label="Media">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `media-switch__link${isActive ? ' media-switch__link--active' : ''}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </main>
  )
}
