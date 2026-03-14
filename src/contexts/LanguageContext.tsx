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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ko')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('gallerylili-lang') as Lang | null
    if (saved === 'ko' || saved === 'en') {
      setLangState(saved)
    } else {
      const browserLang = navigator.language.toLowerCase()
      setLangState(browserLang.startsWith('ko') ? 'ko' : 'en')
    }
    setMounted(true)
  }, [])

  const setLang = (next: Lang) => {
    localStorage.setItem('gallerylili-lang', next)
    setLangState(next)
  }

  const toggleLang = () => setLang(lang === 'ko' ? 'en' : 'ko')

  if (!mounted) return null

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
