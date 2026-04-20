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

export default function ConceptsGrid({
  projects,
}: {
  projects: ConceptProject[];
}) {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((project) => {
        const title = pickLang(project.title?.ko, project.title?.en, lang);
        const concept = pickLang(
          project.concept?.ko,
          project.concept?.en,
          lang,
        );
        const image = project.images?.[0];

        return (
          <div key={project._id}>
            {/* 이미지 */}
            <div className="relative aspect-4/3 bg-zinc-100 overflow-hidden mb-4">
              {image && (
                <Image
                  src={image}
                  alt={title ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>

            {/* 텍스트 */}
            <div className="space-y-1.5">
              {title && (
                <p className="text-xs tracking-widest uppercase text-zinc-400">
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
