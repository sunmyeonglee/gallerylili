"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, ui } from "@/lib/translations";

export default function Header() {
  const { lang, toggleLang } = useLanguage();

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
        <button
          onClick={toggleLang}
          className="text-sm tracking-wide text-white hover:opacity-60 transition-opacity"
          aria-label="Toggle language"
        >
          {lang === "ko" ? "EN" : "KO"}
        </button>
      </nav>
    </header>
  );
}
