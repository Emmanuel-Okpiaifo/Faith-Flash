interface PodcastCardProps {
  title: string
  series: string
  description: string
  duration: string
  date: string
}

export function PodcastCard({ title, series, description, duration, date }: PodcastCardProps) {
  return (
    <div className="audio-card">
      <button className="audio-card__play" aria-label="Play">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      </button>
      <div className="audio-card__info">
        <div className="audio-card__meta">
          {series} • {date} • {duration}
        </div>
        <h3 className="audio-card__title">{title}</h3>
        <p className="tile__text">{description}</p>
      </div>
    </div>
  )
}
