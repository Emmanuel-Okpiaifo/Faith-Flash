import type { ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
}

export function PageHero({ eyebrow, title, lede }: PageHeroProps) {
  return (
    <header className="page-hero">
      <p className="page-hero__eyebrow">{eyebrow}</p>
      <h1 className="page-hero__title">{title}</h1>
      {lede ? <p className="page-hero__lede">{lede}</p> : null}
    </header>
  )
}
