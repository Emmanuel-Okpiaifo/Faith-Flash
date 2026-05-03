interface TestimonyBubbleProps {
  name: string
  quote: string
  initials: string
}

export function TestimonyBubble({ name, quote, initials }: TestimonyBubbleProps) {
  return (
    <article className="testimony-bubble">
      <p className="testimony-bubble__quote">“{quote}”</p>
      <div className="testimony-bubble__author">
        <div className="avatar-circle">{initials}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 900, color: '#fff' }}>{name}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Verified Member</span>
        </div>
      </div>
    </article>
  )
}
