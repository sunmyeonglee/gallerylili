"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith("/studio")) return null;

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
            href="/installations"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
          >
            Selected Installations
          </Link>
          <Link
            href="/"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
          >
            Works
          </Link>
          <Link
            href="/media"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
          >
            Media
          </Link>
          <Link
            href="/about"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
          >
            About
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
          className="md:hidden flex items-center justify-center w-8 h-8 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴"
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="1" y1="2" x2="19" y2="2"
              stroke="#18181b" strokeWidth="1.5" strokeLinecap="round"
              style={{
                transformOrigin: "10px 2px",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
            <line
              x1="1" y1="8" x2="19" y2="8"
              stroke="#18181b" strokeWidth="1.5" strokeLinecap="round"
              style={{
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
            <line
              x1="1" y1="14" x2="19" y2="14"
              stroke="#18181b" strokeWidth="1.5" strokeLinecap="round"
              style={{
                transformOrigin: "10px 14px",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col px-5 pb-8 gap-6">
          <Link
            href="/installations"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            Selected Installations
          </Link>
          <Link
            href="/"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            Works
          </Link>
          <Link
            href="/media"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            Media
          </Link>
          <Link
            href="/about"
            className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            About
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
