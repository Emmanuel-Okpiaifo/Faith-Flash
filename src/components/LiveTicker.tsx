import { site } from '../content/site'

export function LiveTicker() {
  const items = [
    `MANDATE: ${site.department} Kingdom Broadcast`,
    'WE ARE THE SENT ONES — RAISING A SUPERNATURAL ARMY',
    'New Fire Encounter reported from the Marketplace',
    'Supernatural Upgrade: New Testimony shared',
    'Deployment Notice: Next Broadcast starts soon',
    ...site.episodes.map(ep => `VICTORY: ${ep.title}`),
  ]

  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {/* Repeat items twice for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="ticker-item">
            <div className="ticker-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
