import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ARTWORKS_LIST_QUERY } from '@/sanity/lib/queries'
import WorksGrid from '@/components/WorksGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Gallery Lili',
  description: '갤러리 릴리는 키네틱 아트, 오토마타, 움직이는 조형물을 전문으로 하는 갤러리입니다. Gallery Lili specializes in kinetic art, automata, and moving sculptural works.',
  alternates: { canonical: 'https://www.gallerylili.com' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArtGallery',
  name: 'Gallery Lili',
  url: 'https://www.gallerylili.com',
  description: '갤러리 릴리는 키네틱 아트, 오토마타, 움직이는 조형물을 전문으로 하는 갤러리입니다. Gallery Lili specializes in kinetic art, automata, and moving sculptural works.',
  image: 'https://www.gallerylili.com/opengraph-image.png',
  sameAs: [],
}

export default async function HomePage() {
  const artworks = await client.fetch(ARTWORKS_LIST_QUERY)

  return (
    <main className="pt-32 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Gallery Lili — Kinetic Art, Automata &amp; Moving Sculptures</h1>
      <WorksGrid artworks={artworks} />
    </main>
  )
}
