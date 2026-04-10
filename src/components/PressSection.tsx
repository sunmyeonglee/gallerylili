'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { pickLang } from '@/lib/translations'

type PressArticle = {
  _id: string
  publication: string
  title: { ko?: string; en?: string } | null
  url: string | null
  date: string | null
  slug: string | null
}

export default function PressSection({ articles }: { articles: PressArticle[] }) {
  const { lang } = useLanguage()

  if (articles.length === 0) return null

  return (
    <section>
      <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">Press</h2>
      <div className="flex flex-col divide-y divide-zinc-100">
        {articles.map((article) => {
          const title = pickLang(article.title?.ko, article.title?.en, lang)
          const meta = (
            <div>
              <p className="text-sm text-zinc-900 group-hover:opacity-60 transition-opacity">
                {title}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {article.publication}{article.date && ` · ${article.date}`}
              </p>
            </div>
          )

          if (article.slug) {
            return (
              <Link
                key={article._id}
                href={`/media/press/${article.slug}`}
                className="flex items-center justify-between py-4 group"
              >
                {meta}
                <svg className="text-zinc-300 ml-4 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7H12M12 7L7 2M12 7L7 12" />
                </svg>
              </Link>
            )
          }

          if (article.url) {
            return (
              <a
                key={article._id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 group"
              >
                {meta}
                <svg className="text-zinc-300 ml-4 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11L11 3M11 3H5M11 3V9" />
                </svg>
              </a>
            )
          }

          return (
            <div key={article._id} className="flex items-center justify-between py-4">
              {meta}
            </div>
          )
        })}
      </div>
    </section>
  )
}
