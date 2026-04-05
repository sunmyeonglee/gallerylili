'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { pickLang } from '@/lib/translations'

type Installation = {
  _id: string
  title: { ko?: string; en?: string } | null
  year: string
  location: { ko?: string; en?: string } | null
  image: string | null
  slug: string | null
}

export default function InstallationsGrid({ installations }: { installations: Installation[] }) {
  const { lang } = useLanguage()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {installations.map((item) => {
        const card = (
          <div>
            <div className="relative aspect-4/3 overflow-hidden bg-zinc-100 mb-3">
              {item.image && (
                <Image
                  src={`${item.image}?w=480&h=360&fit=crop&auto=format`}
                  alt={pickLang(item.title?.ko, item.title?.en, lang)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
              )}
            </div>
            <p className="text-sm font-medium text-zinc-900">
              {pickLang(item.title?.ko, item.title?.en, lang)}
            </p>
            {(item.location?.ko || item.location?.en) && (
              <p className="text-sm text-zinc-400 mt-0.5">
                {pickLang(item.location?.ko, item.location?.en, lang)}
              </p>
            )}
            <p className="text-xs text-zinc-400">{item.year}</p>
          </div>
        )

        return item.slug ? (
          <Link key={item._id} href={`/works/${item.slug}`} className="group block">
            {card}
          </Link>
        ) : (
          <div key={item._id}>{card}</div>
        )
      })}
    </div>
  )
}
