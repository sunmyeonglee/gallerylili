'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { pickLang } from '@/lib/translations'

type PressArticle = {
  _id: string
  publication: string
  title: { ko?: string; en?: string } | null
  url: string
  date: string | null
}

export default function PressSection({ articles }: { articles: PressArticle[] }) {
  const { lang } = useLanguage()

  if (articles.length === 0) return null

  return (
    <section>
      <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">Press</h2>
      <div className="flex flex-col divide-y divide-zinc-100">
        {articles.map((article) => (
          <a
            key={article._id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-4 group"
          >
            <div>
              <p className="text-sm text-zinc-900 group-hover:opacity-60 transition-opacity">
                {pickLang(article.title?.ko, article.title?.en, lang)}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {article.publication}{article.date && ` · ${article.date}`}
              </p>
            </div>
            <span className="text-zinc-300 text-sm ml-4 shrink-0">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
