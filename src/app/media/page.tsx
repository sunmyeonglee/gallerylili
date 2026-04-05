import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { client, draftClient } from '@/sanity/lib/client'
import { PRESS_QUERY, VIDEOS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Media',
  description: 'Press coverage and videos of Gallery Lili kinetic installations.',
  alternates: { canonical: 'https://www.gallerylili.com/media' },
}

type PressArticle = {
  _id: string
  publication: string
  title: string
  url: string
  date: string | null
  logo: string | null
}

type VideoItem = {
  _id: string
  title: string
  youtubeUrl: string
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default async function MediaPage() {
  const { isEnabled } = await draftMode()
  const c = isEnabled ? draftClient : client

  const [press, videos] = await Promise.all([
    c.fetch(PRESS_QUERY),
    c.fetch(VIDEOS_QUERY),
  ])

  return (
    <main className="pt-32 pb-24 px-5 md:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-20">

        {/* Videos */}
        {videos.length > 0 && (
          <section>
            <h1 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(videos as VideoItem[]).map((video) => {
                const id = getYouTubeId(video.youtubeUrl)
                if (!id) return null
                return (
                  <div key={video._id}>
                    <div className="relative aspect-video bg-zinc-100 overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-none"
                      />
                    </div>
                    <p className="text-sm text-zinc-700 mt-2">{video.title}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Press */}
        {press.length > 0 && (
          <section>
            <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">Press</h2>
            <div className="flex flex-col divide-y divide-zinc-100">
              {(press as PressArticle[]).map((article) => (
                <a
                  key={article._id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 group"
                >
                  <div>
                    <p className="text-sm text-zinc-900 group-hover:opacity-60 transition-opacity">
                      {article.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">{article.publication}</p>
                  </div>
                  <span className="text-zinc-300 text-sm ml-4 shrink-0">↗</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {press.length === 0 && videos.length === 0 && (
          <p className="text-sm text-zinc-400">Coming soon.</p>
        )}
      </div>
    </main>
  )
}
