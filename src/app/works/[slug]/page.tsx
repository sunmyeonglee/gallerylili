import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { ARTWORK_DETAIL_QUERY, ARTWORK_META_QUERY } from '@/sanity/lib/queries'
import ArtworkDetailContent from '@/components/ArtworkDetailContent'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await client.fetch(ARTWORK_META_QUERY, { slug })

  if (!data) return {}

  const title = data.title?.ko ?? data.title?.en ?? ''
  const description = data.description ?? ''

  return {
    title: `${title} — Gallery Lilly`,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      ...(data.image && {
        images: [{ url: data.image, width: 1200, height: 630, alt: title }],
      }),
    },
  }
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params
  const artwork = await client.fetch(ARTWORK_DETAIL_QUERY, { slug })

  if (!artwork) notFound()

  return (
    <main className="pt-28 pb-24 px-8 max-w-5xl mx-auto">
      <ArtworkDetailContent
        title={artwork.title}
        artist={artwork.artist}
        year={artwork.year}
        medium={artwork.medium}
        dimensions={artwork.dimensions}
        description={artwork.description}
        images={artwork.images ?? []}
        videoFile={artwork.videoFile}
        videoUrl={artwork.videoUrl}
      />
    </main>
  )
}
