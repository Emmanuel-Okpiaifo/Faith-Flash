type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  center?: boolean
  titleId?: string
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', center, titleId }: Props) {
  const alignment = center ? 'center' : align
  return (
    <header className={`section-heading section-heading--${alignment}`}>
      {eyebrow ? <span className="section-heading__eyebrow">{eyebrow}</span> : null}
      <h2 id={titleId} className="section-heading__title">
        {title}
      </h2>
      {subtitle ? <p className="section-heading__subtitle">{subtitle}</p> : null}
    </header>
  )
}
