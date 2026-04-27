'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { pickLang } from '@/lib/translations'

type Article = {
  _id: string
  publication: { ko?: string; en?: string } | null
  title: { ko?: string; en?: string } | null
  date: string | null
  images: string[] | null
  body: { ko?: string; en?: string } | null
}

export default function PressDetailContent({ article }: { article: Article }) {
  const { lang } = useLanguage()

  return (
    <main className="pt-32 md:pt-40 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <Link
        href="/media"
        className="text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block mr-1 align-middle"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="align-middle">Media</span>
      </Link>

      <div className="mt-12 max-w-3xl">
        <p className="text-xs text-zinc-400 mb-2">
          {pickLang(article.publication?.ko, article.publication?.en, lang)}{article.date && ` · ${article.date}`}
        </p>
        <h1 className="text-xl font-medium text-zinc-900">
          {pickLang(article.title?.ko, article.title?.en, lang)}
        </h1>
      </div>

      {article.images && article.images.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {article.images.map((url, i) => (
            <div key={i} className="relative aspect-4/3 bg-zinc-100 overflow-hidden">
              <Image
                src={url}
                alt={`${pickLang(article.title?.ko, article.title?.en, lang)} ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {article.body && (
        <div className="mt-10 max-w-3xl">
          <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
            {pickLang(article.body?.ko, article.body?.en, lang)}
          </p>
        </div>
      )}
    </main>
  )
}
