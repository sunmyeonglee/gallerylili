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
  dimensions:
    | { width?: number; height?: number; depth?: number }
    | null
    | undefined;
  description: BilingualField;
  images: ArtworkImage[];
  videoFile: { asset: { url: string } } | null | undefined;
  videoUrl: string | null | undefined;
};

export default function ArtworkDetailContent({
  title,
  artist,
  year,
  medium,
  dimensions,
  description,
  images,
  videoFile,
  videoUrl,
}: Props) {
  const { lang } = useLanguage();

  const titleMain = pickLang(title?.ko, title?.en, lang);

  const dimensionStr = dimensions
    ? [dimensions.width, dimensions.height, dimensions.depth]
        .filter(Boolean)
        .join(" × ")
    : null;

  const videoSrc = videoFile?.asset?.url ?? videoUrl ?? null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
      {/* 캐러셀 */}
      <div>
        {images?.length > 0 && (
          <ArtworkCarousel images={images} alt={titleMain} videoSrc={videoSrc} isVideoFile={!!videoFile} />
        )}
      </div>

      {/* 작품 정보 */}
      <div className="flex flex-col gap-6 lg:pt-2">
        <div>
          <h1 className="text-xl font-medium text-zinc-900">{titleMain}</h1>
        </div>

        <dl className="flex flex-col gap-2 text-sm">
          {(artist?.name?.ko || artist?.name?.en) && (
            <div className="grid gap-3" style={{ gridTemplateColumns: lang === "ko" ? "3.5rem 1fr" : "6rem 1fr" }}>
              <dt className="text-zinc-400">
                {t(ui.artwork.artist, lang)}
              </dt>
              <dd className="text-zinc-700">
                {pickLang(artist.name?.ko, artist.name?.en, lang)}
              </dd>
            </div>
          )}
          {year && (
            <div className="grid gap-3" style={{ gridTemplateColumns: lang === "ko" ? "3.5rem 1fr" : "6rem 1fr" }}>
              <dt className="text-zinc-400">
                {t(ui.artwork.year, lang)}
              </dt>
              <dd className="text-zinc-700">{year}</dd>
            </div>
          )}
          {(medium?.ko || medium?.en) && (
            <div className="grid gap-3" style={{ gridTemplateColumns: lang === "ko" ? "3.5rem 1fr" : "6rem 1fr" }}>
              <dt className="text-zinc-400">
                {t(ui.artwork.medium, lang)}
              </dt>
              <dd className="text-zinc-700">
                {pickLang(medium?.ko, medium?.en, lang)}
              </dd>
            </div>
          )}
          {dimensionStr && (
            <div className="grid gap-3" style={{ gridTemplateColumns: lang === "ko" ? "3.5rem 1fr" : "6rem 1fr" }}>
              <dt className="text-zinc-400">
                {t(ui.artwork.dimensions, lang)}
              </dt>
              <dd className="text-zinc-700">{dimensionStr} mm</dd>
            </div>
          )}
        </dl>

        {(description?.ko || description?.en) && (
          <p className="text-sm text-zinc-600 leading-7 whitespace-pre-line">
            {pickLang(description?.ko, description?.en, lang)}
          </p>
        )}
      </div>
    </div>
  );
}
