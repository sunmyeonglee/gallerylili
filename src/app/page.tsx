import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import LandingHero from "@/components/LandingHero";

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
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  const fallbackImage: string | null = settings?.heroImageUrl ?? null;
  const images: (string | null)[] = settings?.landingImages ?? [
    null,
    null,
    null,
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingHero images={images} fallbackImage={fallbackImage} />
    </main>
  );
}
