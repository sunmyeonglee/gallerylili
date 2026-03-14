"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, ui } from "@/lib/translations";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all bg-white ${
        menuOpen ? "backdrop-blur-md" : ""
      }`}
    >
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-5 md:px-8 py-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-widest uppercase text-zinc-900"
          onClick={() => setMenuOpen(false)}
        >
          Gallery Lili
        </Link>

        {/* 데스크탑 nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/works"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
          >
            {t(ui.nav.works, lang)}
          </Link>
          <Link
            href="/about"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
          >
            {t(ui.nav.about, lang)}
          </Link>

          <div className="flex items-center gap-1 text-sm tracking-wide text-zinc-900">
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

        {/* 햄버거 버튼 (모바일) */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴"
        >
          <span
            className={`block h-px bg-zinc-900 transition-all origin-center ${menuOpen ? "translate-y-1.25 rotate-45" : ""}`}
          />
          <span
            className={`block h-px bg-zinc-900 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px bg-zinc-900 transition-all origin-center ${menuOpen ? "-translate-y-2.25 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col px-5 pb-8 gap-6">
          <Link
            href="/works"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            {t(ui.nav.works, lang)}
          </Link>
          <Link
            href="/about"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            {t(ui.nav.about, lang)}
          </Link>

          <div className="flex items-center gap-1 text-sm tracking-wide text-zinc-900">
            <button
              onClick={() => { setLang("ko"); setMenuOpen(false); }}
              className={`cursor-pointer transition-opacity hover:opacity-60 ${lang === "ko" ? "opacity-100" : "opacity-40"}`}
              aria-label="한국어"
            >
              KR
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => { setLang("en"); setMenuOpen(false); }}
              className={`cursor-pointer transition-opacity hover:opacity-60 ${lang === "en" ? "opacity-100" : "opacity-40"}`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
