"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ConceptsHeader() {
  const { lang } = useLanguage();

  return (
    <div className="mb-16">
      <h1 className="text-xs tracking-widest uppercase text-zinc-400 mb-4">
        Concepts
      </h1>
      <p className="text-sm text-zinc-500 max-w-md leading-8 whitespace-pre-line break-keep">
        {lang === "ko"
          ? "이 페이지의 작업들은 완성된 작품이 아닙니다. 제안 가능한 컨셉으로서, 구조나 기술적 세부보다 경험과 인상에 집중합니다."
          : "The works presented here are not finished pieces. They are proposable concepts — each focused on experience and impression rather than technical resolution."}
      </p>
    </div>
  );
}
