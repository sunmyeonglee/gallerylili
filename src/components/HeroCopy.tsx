"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroCopy() {
  const { lang } = useLanguage();

  return (
    <p className="text-sm md:text-base font-medium tracking-wide text-center break-keep whitespace-pre-line text-white/70 leading-relaxed">
      {lang === "ko"
        ? "과학관과 공공 전시를 위한\n대형 인터랙티브 키네틱 시스템을 제작합니다"
        : "We build large-scale interactive kinetic systems\nfor science centers and public exhibitions"}
    </p>
  );
}
