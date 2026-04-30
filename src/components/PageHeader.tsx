"use client";

import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  title: string;
  ko: string;
  en: string;
};

export default function PageHeader({ title, ko, en }: Props) {
  const { lang } = useLanguage();

  return (
    <div className="py-10 mb-16 text-center">
      <h1 className="text-xs tracking-wider uppercase text-zinc-400 mb-4">
        {title}
      </h1>
      <p className="text-sm text-zinc-500 max-w-2xl mx-auto leading-relaxed break-keep">
        {lang === "ko" ? ko : en}
      </p>
    </div>
  );
}
