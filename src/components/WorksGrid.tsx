'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { pickLang } from '@/lib/translations'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

type Artwork = {
  _id: string
  slug: string | null
  title: { ko?: string; en?: string } | null
  year: string | null
  image: SanityImageSource | null
}

type Props = {
  artworks: Artwork[]
}

export default function WorksGrid({ artworks }: Props) {
  const { lang } = useLanguage()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {artworks.map((artwork) => (
        <Link key={artwork._id} href={`/works/${artwork.slug}`} className="group block">
          <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
            {artwork.image && (
              <Image
                src={urlFor(artwork.image).width(800).height(600).fit('crop').url()}
                alt={pickLang(artwork.title?.ko, artwork.title?.en, lang)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-opacity duration-300 group-hover:opacity-80"
              />
            )}
          </div>
          <div className="mt-3 space-y-0.5">
            <p className="text-sm font-medium text-zinc-900">
              {pickLang(artwork.title?.ko, artwork.title?.en, lang)}
            </p>
            <p className="text-sm text-zinc-400">{artwork.year}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
