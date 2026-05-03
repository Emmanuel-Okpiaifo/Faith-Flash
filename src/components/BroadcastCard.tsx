interface BroadcastCardProps {
  title: string
  category: string
  date: string
  videoId: string
  description: string
  thumbnail?: string
  onClick?: () => void
}

export function BroadcastCard({ title, videoId, date, category, thumbnail, description, onClick }: BroadcastCardProps) {
  const thumbUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <article className="broadcast-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="broadcast-card__media">
        <img 
          src={thumbUrl} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div className="broadcast-card__overlay">
          <div className="broadcast-card__meta">
            {category} • {date}
          </div>
          <h3 className="broadcast-card__title">{title}</h3>
          <p className="tile__text" style={{ marginTop: '0.5rem', opacity: 0, height: 0, overflow: 'hidden', transition: 'all 0.3s' }} id="desc">
            {description}
          </p>
        </div>
      </div>
      <style>{`
        .broadcast-card:hover #desc {
          opacity: 0.8;
          height: auto;
          margin-top: 1rem;
        }
      `}</style>
    </article>
  )
}
