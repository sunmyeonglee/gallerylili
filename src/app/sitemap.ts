import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'

const SLUGS_QUERY = defineQuery(`*[_type == "artwork" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.gallerylili.com'
  const artworks = await client.fetch(SLUGS_QUERY)

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...artworks.map((a: { slug: string; _updatedAt: string }) => ({
      url: `${base}/works/${a.slug}`,
      lastModified: new Date(a._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
