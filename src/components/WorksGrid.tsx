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
  location: { ko?: string; en?: string } | null
  image: SanityImageSource | null
}

type Props = {
  artworks: Artwork[]
}

export default function WorksGrid({ artworks }: Props) {
  const { lang } = useLanguage()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {artworks.map((artwork, i) => (
        <Link key={artwork._id} href={`/works/${artwork.slug}`} className="group block">
          <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
            {artwork.image && (
              <Image
                src={urlFor(artwork.image).width(600).height(450).fit('crop').format('webp').quality(80).url()}
                alt={pickLang(artwork.title?.ko, artwork.title?.en, lang)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={i < 3}
                className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            )}
          </div>
          <div className="mt-3 space-y-0.5">
            <h2 className="text-sm font-medium text-zinc-900">
              {pickLang(artwork.title?.ko, artwork.title?.en, lang)}
            </h2>
            <p className="text-sm text-zinc-400">{artwork.year}</p>
            {(artwork.location?.ko || artwork.location?.en) && (
              <p className="text-xs text-zinc-400">
                {pickLang(artwork.location?.ko, artwork.location?.en, lang)}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
