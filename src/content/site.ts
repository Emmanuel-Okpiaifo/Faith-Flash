/**
 * Central copy and media IDs — synchronized with rccgtheenvoys.org.
 */
import heroImageAsset from '../assets/img/hero/WhatsApp Image 2026-05-03 at 6.34.06 PM.jpeg'

export const site = {
  church: 'RCCG The Envoys',
  department: 'Faith Flash',
  tagline: 'WE ARE THE SENT ONES — RAISING A SUPERNATURAL ARMY DEPLOYED INTO EVERY SPHERE.',
  vision:
    'We are the heart that embraces all with love: the voice that speaks change into people with hope, comfort, and peace. Showcasing radical faith through our conviction.',
  heroImage: heroImageAsset,
  youtube: {
    channelUrl: 'https://www.youtube.com/@RCCGTheEnvoys',
    liveEmbedVideoId: 'live', // Use 'live' to target the current live stream
    featuredVideoId: 'dQw4w9WgXcQ',
  },
  // Faith Flash specific podcast videos
  episodes: [
    {
      title: 'FAITH FLASH PODCAST — Marketplace Manifestation',
      videoId: 'dQw4w9WgXcQ',
      date: '2026-04-27',
      category: 'PODCAST',
      thumbnail: 'https://www.rccgtheenvoys.org/images/_DSC4325.jpg',
      description: 'Dominating your sphere of influence with supernatural authority.',
    },
    {
      title: 'FAITH FLASH PODCAST — Spiritual Intelligence',
      videoId: 'dQw4w9WgXcQ',
      date: '2026-04-20',
      category: 'PODCAST',
      thumbnail: 'https://www.rccgtheenvoys.org/images/_DSC4310.jpg',
      description: 'Deeply rooted in God’s Word to manifest Kingdom wisdom in the marketplace.',
    },
    {
      title: 'FAITH FLASH PODCAST — Global Deployment',
      videoId: 'dQw4w9WgXcQ',
      date: '2026-04-13',
      category: 'PODCAST',
      thumbnail: 'https://www.rccgtheenvoys.org/images/_DSC4309.jpg',
      description: 'The fire spreading across nations as we deploy the King’s peculiar troop.',
    },
    {
      title: 'FAITH FLASH PODCAST — Supernatural Encounter',
      videoId: 'dQw4w9WgXcQ',
      date: '2026-04-06',
      category: 'PODCAST',
      thumbnail: 'https://www.rccgtheenvoys.org/images/_DSC4354.jpg',
      description: 'Receiving the impartation needed for global impact and revival.',
    },
  ],
  podcasts: [
    {
      id: '1',
      title: 'The Sound of Marketplace Takeover',
      series: 'UPGRADE Series',
      description: 'How to maintain the fire while dominating your professional sphere.',
      duration: '24:15',
      date: '2026-04-25',
      embedUrl: '',
    },
    {
      id: '2',
      title: 'Spiritual Responsibility',
      series: 'WISDOM Series',
      description: 'Diligence and discipline for the burning generation of ambassadors.',
      duration: '18:30',
      date: '2026-04-18',
      embedUrl: '',
    },
    {
      id: '3',
      title: 'Deep Intimacy with The Spirit',
      series: 'ENCOUNTER Series',
      description: 'Cultivating the presence of God for supernatural audacity.',
      duration: '32:10',
      date: '2026-04-11',
      embedUrl: '',
    },
  ],
  testimonies: [
    {
      id: '1',
      name: 'Sarah J.',
      quote: 'My encounter at the Upgrade Service activated my conviction. I am now deploying Kingdom solutions in my tech role!',
      initials: 'SJ',
    },
    {
      id: '2',
      name: 'David O.',
      quote: 'The Envoys is where my ordinary life became extraordinary. I am truly one of the Sent Ones.',
      initials: 'DO',
    },
    {
      id: '3',
      name: 'Michael T.',
      quote: 'The Wisdom & Power service gave me the edge I needed in my business. I am set on fire!',
      initials: 'MT',
    },
    {
      id: '4',
      name: 'Grace E.',
      quote: 'This revival hub is my weekly spiritual gasoline. I am burning for the King!',
      initials: 'GE',
    },
  ],
  quickLinks: [
    { label: 'Official Envoys Site', href: 'https://www.rccgtheenvoys.org', external: true },
    { label: 'Report Testimony', href: '/testimonies#contact', external: false },
  ],
} as const
