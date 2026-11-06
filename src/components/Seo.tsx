import { useEffect } from 'react'
import { site, siteOrigin } from '../content/site'

type SeoProps = {
  title: string
  description: string
  path: string
  keywords?: string
  image?: string
  jsonLd?: Record<string, unknown>
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Seo({ title, description, path, keywords, image = site.shareImage, jsonLd }: SeoProps) {
  useEffect(() => {
    const url = `${siteOrigin}${path}`
    const share = image.startsWith('http') ? image : `${siteOrigin}${image.startsWith('/') ? image : `/${image}`}`
    document.title = title
    upsertMeta('name', 'description', description)
    if (keywords) upsertMeta('name', 'keywords', keywords)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'Faith Flash')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', share)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', share)
    upsertLink('canonical', url)

    const existing = document.getElementById('faith-flash-jsonld')
    existing?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.id = 'faith-flash-jsonld'
      script.type = 'application/ld+json'
      script.text = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.getElementById('faith-flash-jsonld')?.remove()
    }
  }, [title, description, path, keywords, image, jsonLd])

  return null
}

export const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Faith Flash',
  url: `${siteOrigin}/`,
  description: site.desk,
  publisher: {
    '@type': 'Organization',
    name: 'Faith Flash',
    description: 'The announcements and testimony desk of RCCG The Envoys. Not a separate church.',
    url: `${siteOrigin}/`,
    parentOrganization: {
      '@type': 'Organization',
      name: site.church,
      url: 'https://www.rccgtheenvoys.org',
    },
  },
}
