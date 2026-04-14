import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { ARTWORKS_LIST_QUERY, INSTALLATIONS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import WorksGrid from "@/components/WorksGrid";
import InstallationsList from "@/components/InstallationsList";
import HeroCopy from "@/components/HeroCopy";
import HeroVideo from "@/components/HeroVideo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery Lili",
  description:
    "갤러리 릴리는 키네틱 아트, 오토마타, 움직이는 조형물을 전문으로 하는 갤러리입니다. Gallery Lili specializes in kinetic art, automata, and moving sculptural works.",
  alternates: { canonical: "https://www.gallerylili.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ArtGallery",
  name: "Gallery Lili",
  url: "https://www.gallerylili.com",
  description:
    "Gallery Lili specializes in kinetic art, automata, and moving sculptural works.",
  image: "https://www.gallerylili.com/opengraph-image.png",
};

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const c = isEnabled ? draftClient : client;

  const [artworks, installations, settings] = await Promise.all([
    c.fetch(ARTWORKS_LIST_QUERY),
    c.fetch(INSTALLATIONS_QUERY),
    c.fetch(SITE_SETTINGS_QUERY),
  ]);

  const heroVideoUrl: string | null = settings?.heroVideoUrl ?? null;
  const previewArtworks = artworks.slice(0, 6);

  return (
    <main className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 히어로 */}
      <section className="relative min-h-svh flex flex-col justify-center overflow-hidden">
        {/* 배경 영상 */}
        {heroVideoUrl && <HeroVideo src={heroVideoUrl} />}
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />

        {/* 텍스트 */}
        <div className="relative z-10 px-5 md:px-8 max-w-7xl mx-auto w-full">
          <HeroCopy inverted />
        </div>

        {/* 스크롤 화살표 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="animate-bounce"
          >
            <path
              d="M8 2L8 18M8 18L2 12M8 18L14 12"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* In the collection of */}
      {installations.length > 0 && (
        <section className="py-20 px-5 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">
            In the collection of
          </h2>
          <InstallationsList installations={installations} />
        </section>
      )}

      {/* Works 미리보기 */}
      {previewArtworks.length > 0 && (
        <section className="px-5 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-zinc-400 mb-8">
            Works
          </h2>
          <WorksGrid artworks={previewArtworks} />
          <div className="mt-8">
            <Link
              href="/works"
              className="inline-block border border-zinc-300 px-6 py-3 text-xs tracking-widest uppercase text-zinc-900 hover:bg-zinc-900 hover:border-zinc-900 hover:text-white transition-colors"
            >
              View all works
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
