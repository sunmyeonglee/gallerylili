'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  ko: { message: '페이지를 찾을 수 없습니다.', back: '작품 목록으로' },
  en: { message: 'Page not found.',            back: 'Back to Works' },
}

export default function NotFound() {
  const { lang } = useLanguage()
  const { message, back } = content[lang]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-8">
      <p className="text-sm text-zinc-400">{message}</p>
      <Link href="/" className="text-sm text-zinc-900 underline underline-offset-4">
        {back}
      </Link>
    </main>
  )
}
