"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { t, pickLang, ui } from "@/lib/translations";
import ArtworkCarousel from "@/components/ArtworkCarousel";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type BilingualField = { ko?: string; en?: string } | null | undefined;

type ArtworkImage = {
  _key: string;
  asset: SanityImageSource;
  group?: string;
  caption?: string;
};

type Props = {
  title: BilingualField;
  artist: { name: BilingualField } | null | undefined;
  year: string | null | undefined;
  medium: BilingualField;
  dimensions: { ko?: string; en?: string } | null | undefined;
  location: BilingualField;
  description: BilingualField;
  images: ArtworkImage[];
  videoFile: { asset: { url: string } } | null | undefined;
  videoUrl: string | null | undefined;
  docentFile: { asset: { url: string } } | null | undefined;
  docentUrl: string | null | undefined;
};

export default function ArtworkDetailContent({
  title,
  artist,
  year,
  medium,
  dimensions,
  location,
  description,
  images,
  videoFile,
  videoUrl,
  docentFile,
  docentUrl,
}: Props) {
  const { lang } = useLanguage();

  const titleMain = pickLang(title?.ko, title?.en, lang);

  const dimensionStr = dimensions ? pickLang(dimensions.ko, dimensions.en, lang) : null

  const videoSrc = videoFile?.asset?.url ?? videoUrl ?? null;
  const docentSrc = docentFile?.asset?.url ?? docentUrl ?? null;

  return (
    <div className="flex flex-col gap-10">
      {/* 캐러셀 */}
      {images?.length > 0 && (
        <ArtworkCarousel images={images} alt={titleMain} videoSrc={videoSrc} isVideoFile={!!videoFile} docentSrc={docentSrc} />
      )}

      {/* 작품 정보 — 캐러셀 화살표 spacer로 이미지 폭에 맞춤 */}
      <div className="flex items-start gap-3">
        <div className="hidden md:block w-8 shrink-0" />
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-xl font-medium text-zinc-900">{titleMain}</h1>

          {/* 메타 — 테이블 형식 */}
          <dl className="border border-zinc-200 grid grid-cols-2 md:flex md:divide-x md:divide-zinc-200">
            {(artist?.name?.ko || artist?.name?.en) && (
              <div className="flex flex-col px-4 py-3 border-b border-r border-zinc-200 md:border-b-0 md:border-r-0 md:px-5">
                <dt className="text-xs text-zinc-400 mb-1 text-center">{t(ui.artwork.artist, lang)}</dt>
                <dd className="text-sm text-zinc-900 text-center">{pickLang(artist.name?.ko, artist.name?.en, lang)}</dd>
              </div>
            )}
            {year && (
              <div className="flex flex-col px-4 py-3 border-b border-zinc-200 md:border-b-0 md:border-l md:border-l-zinc-200 md:px-5">
                <dt className="text-xs text-zinc-400 mb-1 text-center">{t(ui.artwork.year, lang)}</dt>
                <dd className="text-sm text-zinc-900 text-center">{year}</dd>
              </div>
            )}
            {(medium?.ko || medium?.en) && (
              <div className="flex flex-col flex-1 px-4 py-3 border-b border-r border-zinc-200 md:border-b-0 md:border-r-0 md:border-l md:border-l-zinc-200 md:px-5">
                <dt className="text-xs text-zinc-400 mb-1 text-center">{t(ui.artwork.medium, lang)}</dt>
                <dd className="text-sm text-zinc-900 text-center break-keep">{pickLang(medium?.ko, medium?.en, lang)}</dd>
              </div>
            )}
            {dimensionStr && (
              <div className="flex flex-col px-4 py-3 border-b border-zinc-200 md:border-b-0 md:border-l md:border-l-zinc-200 md:px-5">
                <dt className="text-xs text-zinc-400 mb-1 text-center">{t(ui.artwork.dimensions, lang)}</dt>
                <dd className="text-sm text-zinc-900 text-center">{dimensionStr}</dd>
              </div>
            )}
            {(location?.ko || location?.en) && (
              <div className="flex flex-col flex-1 col-span-2 px-4 py-3 md:col-span-1 md:border-l md:border-l-zinc-200 md:px-5">
                <dt className="text-xs text-zinc-400 mb-1 text-center">{lang === "ko" ? "위치" : "Location"}</dt>
                <dd className="text-sm text-zinc-900 text-center break-keep">{pickLang(location?.ko, location?.en, lang)}</dd>
              </div>
            )}
          </dl>

          {(description?.ko || description?.en) && (
            <p className="text-sm text-zinc-600 leading-7 whitespace-pre-line mt-6">
              {pickLang(description?.ko, description?.en, lang)}
            </p>
          )}
        </div>
        <div className="hidden md:block w-8 shrink-0" />
      </div>
    </div>
  );
}

