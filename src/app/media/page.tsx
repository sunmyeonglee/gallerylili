import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { client, draftClient } from '@/sanity/lib/client'
import { PRESS_QUERY, VIDEOS_QUERY } from '@/sanity/lib/queries'
import PressSection from '@/components/PressSection'
import VideosSection from '@/components/VideosSection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Media',
  description: 'Press coverage and videos of Gallery Lili kinetic installations.',
  alternates: { canonical: 'https://www.gallerylili.com/media' },
}

export default async function MediaPage() {
  const { isEnabled } = await draftMode()
  const c = isEnabled ? draftClient : client

  const [press, videos] = await Promise.all([
    c.fetch(PRESS_QUERY),
    c.fetch(VIDEOS_QUERY),
  ])

  return (
    <main className="pt-32 md:pt-40 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-20">
        <VideosSection videos={videos} />
        <PressSection articles={press} />
        {press.length === 0 && videos.length === 0 && (
          <p className="text-sm text-zinc-400">Coming soon.</p>
        )}
      </div>
    </main>
  )
}
