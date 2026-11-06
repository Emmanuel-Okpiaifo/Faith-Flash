import { useEffect, useState } from 'react'
import { site } from '../content/site'

const SLIDE_MS = 5600

export function HouseHero() {
  const slides = site.heroSlides
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion, slides.length])

  function go(next: number) {
    setIndex((next + slides.length) % slides.length)
  }

  return (
    <section
      className="house-hero"
      aria-roledescription="carousel"
      aria-label="Faith Flash"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.label}
          className={`house-hero__slide${slideIndex === index ? ' house-hero__slide--active' : ''}`}
          aria-hidden={slideIndex !== index}
        >
          <img src={slide.image} alt="" />
        </div>
      ))}
      <div className="house-hero__scrim" />
      <div className="house-hero__copy">
        <h1 className="house-hero__title">Faith Flash</h1>
        <span className="house-hero__rule" />
        <p className="house-hero__mission">RAISING A SUPERNATURAL ARMY</p>
        <p className="house-hero__expression">This is where Faith finds Expression</p>
        <p className="house-hero__label">{slides[index].label}</p>
        <p className="house-hero__heartbeat">Envoys Heartbeat · Where stories breathe and voices rise!</p>
      </div>
      <div className="house-hero__controls">
        <div className="house-hero__dots" role="tablist" aria-label="Slides">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.label}
              type="button"
              role="tab"
              className={`house-hero__dot${slideIndex === index ? ' house-hero__dot--active' : ''}`}
              aria-label={slide.label}
              aria-selected={slideIndex === index}
              onClick={() => go(slideIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
