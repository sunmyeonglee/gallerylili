import type { Lang } from "@/contexts/LanguageContext";

export const ui = {
  nav: {
    works: { ko: "작품", en: "Works" },
    about: { ko: "갤러리 소개", en: "About" },
  },
  home: {
    latestWorks: { ko: "최신작", en: "Latest Works" },
    viewAll: { ko: "전체 보기", en: "View All" },
  },
  works: {
    pageTitle: { ko: "작품", en: "Works" },
  },
  artwork: {
    artist: { ko: "작가", en: "Artist" },
    year: { ko: "연도", en: "Year" },
    medium: { ko: "재료", en: "Medium" },
    dimensions: { ko: "크기", en: "Dimensions" },
    backToWorks: { ko: "← 작품 목록", en: "← Back to Works" },
  },
  about: {
    pageTitle: { ko: "갤러리 소개", en: "About" },
  },
} as const;

/** UI 번역 헬퍼 */
export function t(obj: { ko: string; en: string }, lang: Lang): string {
  return obj[lang];
}

/** 작품 이중 언어 필드 헬퍼 */
export function pickLang(
  ko: string | undefined,
  en: string | undefined,
  lang: Lang,
): string {
  if (lang === "en") return en || ko || "";
  return ko || en || "";
}
