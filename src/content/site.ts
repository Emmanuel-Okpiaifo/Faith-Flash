/**
 * Central copy and media IDs — synchronized with rccgtheenvoys.org.
 * Placeholder episode and podcast titles below are unpublished. Do not render them.
 */
const imageKit = 'https://ik.imagekit.io/emmzy26'

function housePhoto(file: string) {
  return `${imageKit}/tr:w-1800,h-1012,fo-top,c-maintain_ratio/${encodeURI(file)}`
}

/** Full width, with the bottom event banner removed. */
function housePhotoClean(file: string, width: number) {
  return `${imageKit}/tr:cm-extract,x-0,y-0,w-iw,h-ih_mul_0.86:w-${width}/${encodeURI(file)}`
}

/** Square frame on the woman speaking and the man in white listening. */
function expressionPhoto(file: string) {
  return `${imageKit}/tr:cm-extract,x-iw_mul_0.02,y-ih_mul_0.02,w-ih_mul_0.9,h-ih_mul_0.9:w-1200/${encodeURI(file)}`
}

export const siteOrigin = 'https://faith-flash.netlify.app'

export const site = {
  church: 'RCCG The Envoys',
  department: 'Faith Flash',
  desk: 'Faith Flash is the announcements and testimony desk of RCCG The Envoys, Ikeja.',
  churchWord: 'We Are Sent To Nations',
  tagline: 'WE ARE THE SENT ONES — RAISING A SUPERNATURAL ARMY DEPLOYED INTO EVERY SPHERE.',
  vision:
    'We are the heart that embraces all with love: the voice that speaks change into people with hope, comfort, and peace. Showcasing radical faith through our conviction.',
  shareImage: housePhoto('IMG-20260906-WA0123.jpg'),
  logo: 'https://www.rccgtheenvoys.org/images/envoys1.png',
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
      name: 'Deborah Nemileh',
      quote: 'Last month was one of the hardest moments my family has ever faced. My cousin was kidnapped, and the kidnappers demanded a ransom of 40 million naira. Days of fear, tears, prayers, and uncertainty filled our hearts. After intense negotiations, the ransom was later reduced to 1 million naira.\n\nFor one painful week, she was held captive. During that time, she was shot close to her heart and also in her leg. But by the special grace and mercy of God, she survived every injury, every pain, and every terrifying moment.\n\nToday, she is alive, recovering, and doing well. God preserved her life when the situation looked impossible. We are overwhelmed with gratitude, because only God could have brought her back safely to us.\n\nIndeed, God is faithful, merciful, and powerful. Glory be to God for His protection, healing, and preservation over her life.',
      initials: 'DN',
    },
    {
      id: '2',
      name: 'Ibiwotisi Oluwasemilore',
      quote: 'I want to sincerely thank God for the access and favour He has given to me in my workplace.\n\nSometime last month, during one of the prayer sessions led by Pastor Ikenna at Envoys Virtual Connect, we prayed that God would make our work matter in the sight of those who matter. That prayer has truly become my reality.\n\nAs Papa always reminds us, that as envoys we must remain distinct everywhere we find ourselves, I noticed a need in my company and decided to write a proposal to my HOD on how it could be resolved.\n\nThe proposal was approved, and I worked on a few pieces at first. A few weeks later, my director called me to reproduce the same project on a much larger scale and within a very short timeframe. By God\'s grace, I was able to deliver it successfully.\n\nSince then, God has continually grant me undeniable access and favour far beyond my current level at work. Just last week, I was invited again for an even bigger project. Through all of this, God has opened doors for me and brought me into rooms that ordinarily my current position would not have access to.\n\nI am deeply grateful to Jesus for His faithfulness, favour, and the doors He keeps opening for me. All glory to God.',
      initials: 'IO',
    },
    {
      id: '3',
      name: 'Precious Sobande',
      quote: 'I attended Night of Mercy for the first time on the last Wednesday of April. After the prayers we were asked to give our offerings, but I was skeptical if I would give to God or not because all I had on me as at that moment was my transport money. I was encouraged to give because I had it in mind that I would be tagging along with someone back home, which I ended up not going with the person.\n\nI quietly talked to God about my transport money not being complete as a result of me giving my highest note as offering. The time for me to go home clocked and God marvelously made a way without me having to tell anyone that my transport money isn\'t complete or trek back home because I had it in mind to do that.\n\nThat same day, I was opportuned to go out for an unplanned visitation, and God blessed me with 100 times the money I paid for my offering without any notice. There is more! Onsite.\n\nThank you Jesus.',
      initials: 'PS',
    },
    {
      id: '4',
      name: 'Esther Olarenwaju',
      quote: 'For quite some time, my husband had been experiencing serious issues with one of his nostrils, and it had become a major concern for us as a family. The condition was troubling enough that we were already making plans to book an appointment with a specialist for proper medical attention the very next day.\n\nHowever, before taking that step, we decided to first report the matter to God at Night of Mercy. That Wednesday happened to be my husband\'s very first time attending the program, and I came before God with faith, asking Him to honor my husband\'s first-timer presence with divine healing. I specifically prayed that God would step in and perfect all that concerned him.\n\nTo the glory of God, the Lord answered our prayers instantly! That same affected nostril became perfectly normal, and it now feels as though there had never been any issue at all. Every fear, worry, and concern vanished completely by the mercy and healing power of God.\n\nMy second testimony is a testimony of remembrance by mercy. During Upper Wednesday Night of Mercy service, Papa repeatedly declared and emphasized that helpers would call and help us in the next 7 days. I held onto those prophetic words with faith, believing that God would remember me.\n\nTo the glory of God, just this Monday, my brother called me and informed me that my big mummy, who was preparing to return to the USA, specifically insisted on seeing me before her departure. When I got there, to my greatest surprise, she handed over some things I needed for the next season of my life to me.\n\nThank you Jesus for looking upon me with mercy. Hallelujah!',
      initials: 'EO',
    },
  ],
  magazines: [
    {
      slug: 'unending-open-doors-mercy-convention-2026',
      title: 'Unending Open Doors',
      issue: 'Mercy Convention 2026 Recap',
      dates: '14 – 22 October 2026',
      description:
        'A recap magazine capturing the Mercy Convention 2026 at RCCG The Envoys, Ikeja.',
      file: '/magazines/unending-open-doors-mercy-convention-2026.pdf',
      cover: '/magazines/unending-open-doors-mercy-convention-2026-cover.jpg',
    },
  ],
  quickLinks: [
    { label: 'Official Envoys Site', href: 'https://www.rccgtheenvoys.org', external: true },
    { label: 'Share Your Testimony', href: 'https://bit.ly/Rccgenvoystestimonies', external: true },
  ],
  contact: {
    address: 'The Envoys Centre, 6a Cocoa Industries Road, Ogba Industrial Estate, Ikeja, Lagos',
    email: 'hello@envoys.center',
    phone: '+2349062134890',
    phoneHref: 'tel:+2349062134890',
  },
  serviceTimes: 'Sundays 12:00 PM · Tuesdays 5:30 PM · Wednesdays 11:00 PM – 2:00 AM',
  churchLinks: [
    { label: 'Church home', href: 'https://www.rccgtheenvoys.org' },
    { label: 'Sermons', href: 'https://www.rccgtheenvoys.org/sermons' },
    { label: 'Giving', href: 'https://www.rccgtheenvoys.org/giving' },
    { label: 'Contact', href: 'https://www.rccgtheenvoys.org/contact' },
  ],
  socials: [
    { label: 'Facebook', href: 'https://facebook.com/rccgtheenvoys' },
    { label: 'Instagram', href: 'https://instagram.com/rccgtheenvoys' },
    { label: 'YouTube', href: 'https://www.youtube.com/@RCCGTheEnvoys' },
  ],
  /**
   * Google Form that receives “Notify me when live” signups.
   * Create a form with First name, Last name, and Email, then paste the
   * formResponse URL and each field’s entry id (entry.123…).
   */
  notifyForm: {
    action: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  intro: [
    {
      image: housePhoto('IMG-20260906-WA0123.jpg'),
      caption: 'REPORTS',
    },
    {
      image: housePhoto('IMG-20261004-WA0117.jpg'),
      caption: 'WITNESS',
    },
    {
      image: expressionPhoto('IMG-20260816-WA0035.jpg'),
      caption: 'EXPRESSION',
      focus: 'center center',
    },
  ],
  heroSlides: [
    {
      image: housePhotoClean('IMG-20260906-WA0123.jpg', 1800),
      imageMobile: `${imageKit}/${encodeURI('Envoys News_ Church Stage Presenters.png')}`,
      label: 'Envoys News · The house gathered',
    },
    {
      image: housePhotoClean('IMG-20261004-WA0117.jpg', 1800),
      imageMobile: `${imageKit}/${encodeURI('Prayerful Testimony on a Glowing Stage.png')}`,
      label: 'Testimony · A witness at the pulpit',
    },
    {
      image: housePhotoClean('IMG-20261017-WA0025(1).jpg', 1800),
      imageMobile: `${imageKit}/${encodeURI('Engaging Studio Conversation.png')}`,
      label: 'Mercy Convention · Day Three',
    },
    {
      image: housePhotoClean('IMG-20261004-WA0121.jpg', 1800),
      imageMobile: `${imageKit}/${encodeURI('Candid Interview on a Graceful Stage.png')}`,
      label: 'Celebration · Stories shared in the house',
    },
    {
      image: housePhotoClean('IMG-20260816-WA0035.jpg', 1800),
      imageMobile: `${imageKit}/${encodeURI('Tense Porch Conversation.png')}`,
      label: 'Outreach · Compassion beyond these walls',
    },
  ],
  programs: [
    {
      id: 'sunday-service',
      title: 'Sunday Service',
      when: 'Sundays · 12:00 PM',
      description: 'Weekly worship at The Envoys Center, Ikeja.',
    },
    {
      id: 'illumination-service',
      title: 'Illumination Service',
      when: 'Tuesdays · 5:30 PM',
      description: 'The Tuesday service at The Envoys Center, Ikeja.',
    },
    {
      id: 'night-of-mercy',
      title: 'Night of Mercy',
      when: 'Wednesdays · 11:00 PM – 2:00 AM',
      description: 'Midweek gathering at The Envoys Center, Ikeja.',
    },
  ],
} as const

export type Magazine = (typeof site.magazines)[number]
