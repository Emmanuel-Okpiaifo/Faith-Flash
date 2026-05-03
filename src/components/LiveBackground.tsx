export function LiveBackground() {
  return (
    <div className="live-bg" aria-hidden="true">
      <div className="grid-overlay" />
      <div className="live-bg__blob live-bg__blob--1" style={{ background: 'var(--color-accent)' }} />
      <div className="live-bg__blob live-bg__blob--2" style={{ background: 'var(--color-accent-purple)' }} />
      <div className="live-bg__blob live-bg__blob--3" style={{ background: 'rgba(255, 255, 255, 0.05)' }} />
      <div className="scanlines" />
    </div>
  )
}
