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
    <div className="mb-16">
      <h1 className="text-xs tracking-widest uppercase text-zinc-400 mb-4">
        {title}
      </h1>
      <p className="text-sm text-zinc-500 max-w-md leading-8 break-keep">
        {lang === "ko" ? ko : en}
      </p>
    </div>
  );
}
