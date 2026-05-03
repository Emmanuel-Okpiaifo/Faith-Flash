import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { LiveTicker } from '../components/LiveTicker'
import { LiveBackground } from '../components/LiveBackground'
import { Preloader } from '../components/Preloader'

export function MainLayout() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="shell">
      <Preloader />
      <LiveBackground />
      <LiveTicker />
      <SiteHeader scrolled={scrolled} />
      <main className="shell__main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
