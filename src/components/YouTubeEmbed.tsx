type Props = {
  videoId: string
  title: string
  className?: string
}

export function YouTubeEmbed({ videoId, title, className }: Props) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`
  return (
    <div className={`youtube-embed ${className ?? ''}`.trim()}>
      <iframe
        title={title}
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
