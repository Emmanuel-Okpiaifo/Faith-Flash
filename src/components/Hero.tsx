import { Link } from 'react-router-dom'
import { site } from '../content/site'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <p className="hero__eyebrow">{site.church}</p>
        <h1 id="hero-title" className="hero__title">
          {site.department}
        </h1>
        <p className="hero__lede">{site.tagline}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={site.youtube.channelUrl} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
          <Link className="btn btn--ghost" to="/online-tv">
            Envoys Online TV
          </Link>
        </div>
      </div>
      <div className="hero__media" aria-hidden>
        <div className="hero__video-placeholder">
          <span>Hero video or image — replace in Hero.tsx or add background asset</span>
        </div>
      </div>
    </section>
  )
}
