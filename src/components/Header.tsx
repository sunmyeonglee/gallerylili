"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/concepts", label: "Concepts" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // bg 전환용

  if (pathname?.startsWith("/studio")) return null;

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;
  const textColor = transparent ? "text-white" : "text-zinc-900";
  const strokeColor = transparent ? "rgba(255,255,255,0.9)" : "#18181b";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LangToggle = ({ className = "" }: { className?: string }) => (
    <div
      className={`flex items-center gap-1 text-sm tracking-wide ${textColor} ${className}`}
    >
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
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? "bg-transparent" : "bg-white"
      }`}
    >
      {/* ── 데스크탑 ── */}
      <div className="hidden md:flex items-center px-8 py-5 max-w-7xl mx-auto relative">
        <Link
          href="/"
          className={`text-xl font-bold tracking-widest uppercase transition-colors duration-300 ${textColor}`}
          onClick={() => setMenuOpen(false)}
        >
          Gallery Lili
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wide uppercase hover:opacity-60 transition-opacity duration-300 ${textColor}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto">
          <LangToggle />
        </div>
      </div>

      {/* ── 모바일 공통 ── */}
      <div className="md:hidden flex items-center justify-between px-5 py-6">
        <Link
          href="/"
          className={`text-base font-bold tracking-widest uppercase transition-colors duration-300 ${textColor}`}
          onClick={() => setMenuOpen(false)}
        >
          Gallery Lili
        </Link>
        <button
          className="flex items-center justify-center w-8 h-8 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴"
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <line
              x1="1"
              y1="2"
              x2="19"
              y2="2"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                transformOrigin: "10px 2px",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
            <line
              x1="1"
              y1="8"
              x2="19"
              y2="8"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
            <line
              x1="1"
              y1="14"
              x2="19"
              y2="14"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                transformOrigin: "10px 14px",
                transform: menuOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
                transition: "transform 0.2s ease",
              }}
            />
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col px-5 pb-8 gap-6 max-w-7xl mx-auto bg-white">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-wide text-zinc-900 hover:opacity-60 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-1 text-sm tracking-wide text-zinc-900">
            <button
              onClick={() => {
                setLang("ko");
                setMenuOpen(false);
              }}
              className={`cursor-pointer transition-opacity hover:opacity-60 ${lang === "ko" ? "opacity-100" : "opacity-40"}`}
              aria-label="한국어"
            >
              KR
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => {
                setLang("en");
                setMenuOpen(false);
              }}
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
