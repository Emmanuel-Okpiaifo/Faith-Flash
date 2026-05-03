import { YouTubeEmbed } from './YouTubeEmbed'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoData: {
    title: string
    videoId: string
    description: string
    category: string
    date: string
  } | null
}

export function VideoModal({ isOpen, onClose, videoData }: VideoModalProps) {
  if (!videoData) return null

  return (
    <div className={`modal-overlay ${isOpen ? 'modal-overlay--open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div style={{ aspectRatio: '16/9', width: '100%', background: '#000' }}>
          <YouTubeEmbed videoId={videoData.videoId} title={videoData.title} />
        </div>
        <div style={{ padding: '3rem' }}>
          <div className="broadcast-card__meta" style={{ marginBottom: '1rem' }}>
            {videoData.category} • {videoData.date}
          </div>
          <h2 className="section-heading__title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
            {videoData.title}
          </h2>
          <p className="hero__lede" style={{ fontSize: '1.1rem', color: 'var(--color-text)' }}>
            {videoData.description}
          </p>
        </div>
      </div>
    </div>
  )
}
