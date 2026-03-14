"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, ui } from "@/lib/translations";

export default function Header() {
  const { lang, setLang } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
      <Link
        href="/"
        className="text-sm font-medium tracking-widest uppercase text-white"
      >
        Gallery Lili
      </Link>

      <nav className="flex items-center gap-8">
        <Link
          href="/works"
          className="text-sm tracking-wide text-white hover:opacity-60 transition-opacity"
        >
          {t(ui.nav.works, lang)}
        </Link>
        <Link
          href="/about"
          className="text-sm tracking-wide text-white hover:opacity-60 transition-opacity"
        >
          {t(ui.nav.about, lang)}
        </Link>

        {/* 언어 토글 */}
        <div className="flex items-center gap-1 text-sm tracking-wide text-white">
          <button
            onClick={() => setLang("ko")}
            className={`cursor-pointer transition-opacity hover:opacity-60 ${lang === "ko" ? "opacity-100" : "opacity-40"}`}
            aria-label="한국어"
          >
            KR
          </button>
          <span className="opacity-40">|</span>
          <button
            onClick={() => setLang("en")}
            className={`cursor-pointer transition-opacity hover:opacity-60 ${lang === "en" ? "opacity-100" : "opacity-40"}`}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  );
}
