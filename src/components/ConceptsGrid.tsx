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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
      {projects.map((project) => {
        const title = pickLang(project.title?.ko, project.title?.en, lang);
        const concept = pickLang(project.concept?.ko, project.concept?.en, lang);

        return (
          <div key={project._id}>
            {/* 메인 이미지 */}
            {project.images?.[0] && (
              <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
                <Image
                  src={project.images[0]}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}

            {/* 추가 이미지 (있을 경우 작게) */}
            {project.images?.length > 1 && (
              <div className="grid grid-cols-2 gap-1 mt-1">
                {project.images.slice(1, 3).map((url, i) => (
                  <div key={i} className="relative aspect-4/3 overflow-hidden bg-zinc-100">
                    <Image
                      src={url}
                      alt={`${title} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 텍스트 */}
            <div className="mt-4 space-y-1.5">
              {title && (
                <p className="text-sm font-medium text-zinc-900">{title}</p>
              )}
              {concept && (
                <p className="text-sm text-zinc-500 leading-relaxed break-keep">
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
