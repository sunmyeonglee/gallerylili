"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickLang } from "@/lib/translations";

type ConceptProject = {
  _id: string;
  title: { ko?: string; en?: string } | null;
  concept: { ko?: string; en?: string } | null;
  images: string[];
};

export default function ConceptsGrid({
  projects,
}: {
  projects: ConceptProject[];
}) {
  const { lang } = useLanguage();
  const [touchedId, setTouchedId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-16">
      {projects.map((project) => {
        const title = pickLang(project.title?.ko, project.title?.en, lang);
        const concept = pickLang(
          project.concept?.ko,
          project.concept?.en,
          lang,
        );
        const image = project.images?.[0];
        const isTouched = touchedId === project._id;

        return (
          <div key={project._id}>
            {/* 이미지 */}
            <div
              className="group relative aspect-video bg-zinc-100 overflow-hidden mb-6"
              onTouchStart={() => setTouchedId(project._id)}
            >
              {image && (
                <Image
                  src={image}
                  alt={title ?? ""}
                  fill
                  className={`object-cover transition-all duration-500 ${isTouched ? "grayscale-0" : "grayscale md:group-hover:grayscale-0"}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>

            {/* 텍스트 */}
            <div className="space-y-1.5">
              {title && (
                <p className="text-sm tracking-widest uppercase text-zinc-400">
                  {title}
                </p>
              )}
              {concept && (
                <p className="text-sm text-zinc-600 leading-relaxed break-keep">
                  {concept}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
