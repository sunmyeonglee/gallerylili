'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'ko' | 'en'

interface LanguageContextType {
  lang: Lang
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ko',
  toggleLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')

  useEffect(() => {
    const saved = localStorage.getItem('gallerylili-lang') as Lang | null
    if (saved === 'ko' || saved === 'en') setLang(saved)
  }, [])

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'ko' ? 'en' : 'ko'
      localStorage.setItem('gallerylili-lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
