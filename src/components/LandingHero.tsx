"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
          <p className="text-sm text-white/60 leading-relaxed">
            We build large-scale interactive kinetic systems for science centers
            and public exhibitions
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
        <div className="absolute inset-0 bg-black/40" />

        {/* 중앙 콘텐츠 */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8">
          <h1
            className="font-medium tracking-[0.25em] uppercase text-white leading-none mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Gallery Lili
          </h1>
          <p
            className="text-white/80 leading-relaxed mb-10 tracking-wide"
            style={{ fontSize: "clamp(0.8rem, 1.1vw, 1.1rem)" }}
          >
            We build large-scale interactive kinetic systems
            <br />
            for science centers and public exhibitions
          </p>

          {/* 버튼 */}
          <div className="flex gap-3">
            {navButtons.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => { stopTimer(); setActiveIndex(i); }}
                onMouseLeave={startTimer}
                style={{
                  width: "clamp(11rem, 15vw, 16rem)",
                  height: "clamp(3rem, 4.5vw, 4rem)",
                  fontSize: "clamp(0.7rem, 0.9vw, 0.9rem)",
                }}
                className={`flex items-center justify-center border tracking-widest uppercase transition-colors duration-300 ${
                  i === activeIndex
                    ? "border-white bg-white text-zinc-900"
                    : "border-white/40 text-white/60 hover:border-white hover:bg-white hover:text-zinc-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
