import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { Preloader } from '../components/Preloader'
import { scheduleMagazineWarmup } from '../lib/warmMagazine'

export function MainLayout() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    const target = id ? document.getElementById(id) : null
    if (target) {
      target.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const mode = pathname.startsWith('/magazines/')
      ? 'reader'
      : pathname === '/magazines'
        ? 'shelf'
        : 'background'
    return scheduleMagazineWarmup(mode)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const nodes = [...document.querySelectorAll('.reveal')]
    const reveal = () => {
      const view = window.innerHeight || document.documentElement.clientHeight
      nodes.forEach((node) => {
        if (node.classList.contains('reveal--visible')) return
        const rect = node.getBoundingClientRect()
        if (rect.top < view * 0.92 && rect.bottom > 48) {
          node.classList.add('reveal--visible')
        }
      })
    }
    reveal()
    const frame = requestAnimationFrame(reveal)
    const later = window.setTimeout(reveal, 600)
    window.addEventListener('scroll', reveal, { passive: true })
    window.addEventListener('resize', reveal)
    window.addEventListener('load', reveal)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(later)
      window.removeEventListener('scroll', reveal)
      window.removeEventListener('resize', reveal)
      window.removeEventListener('load', reveal)
    }
  }, [pathname])

  return (
    <div className="shell">
      <Preloader />
      <SiteHeader scrolled={scrolled} />
      <main className="shell__main">
        <div key={pathname} className="shell__page">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
