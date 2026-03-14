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

  useEffect(() => {
    const saved = localStorage.getItem('gallerylili-lang') as Lang | null
    if (saved === 'ko' || saved === 'en') {
      setLangState(saved)
    } else {
      // 사용자가 명시적으로 선택한 적 없으면 브라우저 언어 사용
      const browserLang = navigator.language.toLowerCase()
      setLangState(browserLang.startsWith('ko') ? 'ko' : 'en')
    }
  }, [])

  const setLang = (next: Lang) => {
    localStorage.setItem('gallerylili-lang', next)
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
