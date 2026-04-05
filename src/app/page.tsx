import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { client, draftClient } from '@/sanity/lib/client'
import { ARTWORKS_LIST_QUERY, INSTALLATIONS_QUERY } from '@/sanity/lib/queries'
import WorksGrid from '@/components/WorksGrid'
import InstallationsGrid from '@/components/InstallationsGrid'

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
  description: 'Gallery Lili specializes in kinetic art, automata, and moving sculptural works.',
  image: 'https://www.gallerylili.com/opengraph-image.png',
}

export default async function HomePage() {
  const { isEnabled } = await draftMode()
  const c = isEnabled ? draftClient : client

  const [artworks, installations] = await Promise.all([
    c.fetch(ARTWORKS_LIST_QUERY),
    c.fetch(INSTALLATIONS_QUERY),
  ])

  return (
    <main className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 헤드라인 */}
      <section className="pt-32 pb-16 px-5 md:px-8 max-w-7xl mx-auto">
        <h1 className="sr-only">Gallery Lili</h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">
          We build large-scale interactive kinetic systems for science centers and public exhibitions
        </p>
      </section>

      {/* Selected Installations */}
      {installations.length > 0 && (
        <section className="pb-20 px-5 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">
            Selected institutional projects
          </h2>
          <InstallationsGrid installations={installations} />
          <div className="mt-8">
            <Link href="/installations" className="text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-colors">
              View all installations →
            </Link>
          </div>
        </section>
      )}

      {/* Works */}
      <section className="px-5 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">Works</h2>
        <WorksGrid artworks={artworks} />
      </section>
    </main>
  )
}
