import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ARTWORKS_LIST_QUERY } from '@/sanity/lib/queries'
import WorksGrid from '@/components/WorksGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Works',
  description: '갤러리 릴리의 작품 컬렉션. Kinetic art, automata, and moving sculptural works by Gallery Lili.',
  alternates: { canonical: 'https://www.gallerylili.com/works' },
  openGraph: {
    title: 'Works — Gallery Lili',
    description: '갤러리 릴리의 작품 컬렉션.',
    url: 'https://www.gallerylili.com/works',
  },
}

export default async function WorksPage() {
  const artworks = await client.fetch(ARTWORKS_LIST_QUERY)

  return (
    <main className="pt-32 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <WorksGrid artworks={artworks} />
    </main>
  )
}
