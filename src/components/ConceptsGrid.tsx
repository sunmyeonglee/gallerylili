"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickLang } from "@/lib/translations";

type ConceptProject = {
  _id: string;
  title: { ko?: string; en?: string } | null;
  concept: { ko?: string; en?: string } | null;
  images: string[];
};

export default function ConceptsGrid({ projects }: { projects: ConceptProject[] }) {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100">
      {projects.map((project) => {
        const title = pickLang(project.title?.ko, project.title?.en, lang);
        const concept = pickLang(project.concept?.ko, project.concept?.en, lang);
        const image = project.images?.[0];

        return (
          <div key={project._id} className="relative aspect-4/3 bg-zinc-200 overflow-hidden">
            {/* 이미지 */}
            {image && (
              <Image
                src={image}
                alt={title ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}

            {/* 하단 그라디언트 */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 to-transparent" />

            {/* 텍스트 — 좌측 하단 */}
            <div className="absolute bottom-0 left-0 p-5 z-10">
              {title && (
                <p className="text-xs tracking-widest uppercase text-white/60 mb-1">
                  {title}
                </p>
              )}
              {concept && (
                <p className="text-sm text-white leading-relaxed break-keep max-w-xs">
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
