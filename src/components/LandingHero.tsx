"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

const navButtons = [
  { href: "/works", label: "Works" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
];

type Props = {
  images: (string | null)[];
  fallbackImage: string | null;
};

export default function LandingHero({ images, fallbackImage }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % navButtons.length);
    }, 3000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  return (
    <>
      {/* ── 모바일 ── */}
      <section className="md:hidden relative h-svh flex flex-col overflow-hidden">
        {navButtons.map((_, i) => {
          const src = images[i] || fallbackImage;
          return src ? (
            <Image
              key={i}
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover grayscale transition-opacity duration-1000 ease-in-out ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null;
        })}
        <div className="absolute inset-0 bg-black/40" />

        {/* 로고 + 설명 */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5">
          <h1 className="text-3xl font-medium tracking-[0.25em] uppercase text-white mb-4">
            Gallery Lili
          </h1>
          <p className="text-xs text-white/70 leading-relaxed break-keep">
            과학관과 공공 전시를 위한 대형 인터랙티브 키네틱 시스템을 제작합니다
          </p>
          <p className="text-xs text-white/40 leading-relaxed mt-0.5">
            We build large-scale interactive kinetic systems for science centers and public exhibitions
          </p>
        </div>

        {/* 버튼 */}
        <div className="relative z-10 flex flex-col px-5 pb-10 gap-3">
          {navButtons.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onTouchStart={() => setActiveIndex(i)}
              className="flex items-center justify-center h-14 border border-white/50 text-sm tracking-widest uppercase text-white/90 active:bg-white active:text-zinc-900 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── 데스크탑 ── */}
      <section className="hidden md:flex relative h-svh flex-col overflow-hidden">
        {navButtons.map((_, i) => {
          const src = images[i] || fallbackImage;
          return src ? (
            <Image
              key={i}
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover grayscale transition-opacity duration-1000 ease-in-out ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null;
        })}

        <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center text-center px-5 pt-12 pointer-events-none">
          <h1 className="text-4xl font-medium tracking-[0.25em] uppercase text-white mb-4">
            Gallery Lili
          </h1>
          <p className="text-sm text-white/70 leading-relaxed break-keep">
            과학관과 공공 전시를 위한 대형 인터랙티브 키네틱 시스템을 제작합니다
          </p>
          <p className="text-sm text-white/40 leading-relaxed mt-1">
            We build large-scale interactive kinetic systems for science centers and public exhibitions
          </p>
        </div>

        <div className="flex-1 flex flex-row">
          {navButtons.map(({ href, label }, i) => {
            const isActive = i === activeIndex;
            return (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => { stopTimer(); setActiveIndex(i); }}
                onMouseLeave={startTimer}
                className={`relative overflow-hidden transition-all duration-500 ease-in-out flex items-end justify-center pb-14 group cursor-pointer flex-1 ${
                  isActive ? "md:flex-2" : "md:flex-1"
                }`}
              >
                <div className={`absolute inset-0 transition-colors duration-500 group-active:bg-white ${
                  isActive ? "bg-black/20" : "bg-black/55"
                }`} />
                {i > 0 && (
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />
                )}
                <div className={`relative z-10 flex items-center gap-2 transition-all duration-500 group-active:text-zinc-900 ${
                  isActive ? "text-white text-2xl font-medium" : "text-white/50 text-base"
                }`}>
                  <span className="tracking-widest uppercase">{label}</span>
                  <ArrowRightIcon
                    size={20}
                    weight="bold"
                    className={`transition-all duration-500 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
