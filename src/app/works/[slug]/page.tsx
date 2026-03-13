import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { ARTWORK_DETAIL_QUERY } from '@/sanity/lib/queries'
import ArtworkDetailContent from '@/components/ArtworkDetailContent'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params
  const artwork = await client.fetch(ARTWORK_DETAIL_QUERY, { slug })

  if (!artwork) notFound()

  return (
    <main className="pt-28 pb-24 px-8 max-w-screen-lg mx-auto">
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
