import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import HeroCopy from "@/components/HeroCopy";

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
  const settings = await (isEnabled ? draftClient : client).fetch(SITE_SETTINGS_QUERY);
  const heroImageUrl: string | null = settings?.heroImageUrl ?? null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative h-svh flex flex-col justify-end overflow-hidden">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt="Gallery Lili"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full pb-10 px-5 md:px-0 flex justify-start md:justify-center">
          <HeroCopy />
        </div>
      </section>
    </main>
  );
}
