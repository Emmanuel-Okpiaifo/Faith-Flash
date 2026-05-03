interface TestimonyCardProps {
  name: string
  quote: string
  initials: string
}

export function TestimonyCard({ name, quote, initials }: TestimonyCardProps) {
  return (
    <article className="testimony-card">
      <p className="testimony-card__quote">“{quote}”</p>
      <div className="testimony-card__author">
        <div className="testimony-card__avatar">{initials}</div>
        <span className="field__label">{name}</span>
      </div>
    </article>
  )
}
