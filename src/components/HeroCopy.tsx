"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroCopy({ inverted = false }: { inverted?: boolean }) {
  const { lang } = useLanguage();

  return (
    <p className={`text-sm md:text-base max-w-xl leading-relaxed break-keep ${inverted ? "text-white/80" : "text-zinc-500"}`}>
      {lang === "ko"
        ? "과학관과 공공 전시를 위한 대형 인터랙티브 키네틱 시스템을 제작합니다."
        : "We build large-scale interactive kinetic systems for science centers and public exhibitions."}
    </p>
  );
}
