'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'ko' | 'en'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ko',
  setLang: () => {},
  toggleLang: () => {},
})

export function LanguageProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    // 쿠키에 저장된 값이 없을 때만 브라우저 언어로 보정
    const cookie = document.cookie.split('; ').find(r => r.startsWith('lang='))
    if (!cookie) {
      const browserLang = navigator.language.toLowerCase()
      const detected = browserLang.startsWith('ko') ? 'ko' : 'en'
      setLang(detected)
    }
  }, [])

  const setLang = (next: Lang) => {
    document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    setLangState(next)
  }

  const toggleLang = () => setLang(lang === 'ko' ? 'en' : 'ko')

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
