import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { ARTWORK_DETAIL_QUERY, ARTWORK_META_QUERY, ARTWORK_SLUGS_QUERY } from "@/sanity/lib/queries";
import ArtworkDetailContent from "@/components/ArtworkDetailContent";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const artworks = await client.fetch(ARTWORK_SLUGS_QUERY);
  return artworks.map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(ARTWORK_META_QUERY, { slug });

  if (!data) return {};

  const title = data.title?.ko ?? data.title?.en ?? "";
  const description = data.description ?? "";

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: `https://www.gallerylili.com/works/${slug}` },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://www.gallerylili.com/works/${slug}`,
      ...(data.image && {
        images: [{ url: `${data.image}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630, alt: title }],
      }),
    },
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const artwork = await (isEnabled ? draftClient : client).fetch(ARTWORK_DETAIL_QUERY, { slug });

  if (!artwork) notFound();

  const title = artwork.title?.ko ?? artwork.title?.en ?? "";
  const artistName = artwork.artist?.name?.ko ?? artwork.artist?.name?.en ?? "";
  const imageUrl = artwork.images?.[0]?.asset?.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: title,
    ...(artistName && {
      creator: { "@type": "Person", name: artistName },
    }),
    ...(artwork.year && { dateCreated: artwork.year }),
    ...(artwork.medium?.ko && { artMedium: artwork.medium.ko }),
    ...(artwork.dimensions?.ko && { size: artwork.dimensions.ko }),
    ...(artwork.description?.ko && { description: artwork.description.ko }),
    ...(imageUrl && { image: imageUrl }),
    url: `https://www.gallerylili.com/works/${slug}`,
    isPartOf: {
      "@type": "ArtGallery",
      name: "Gallery Lili",
      url: "https://www.gallerylili.com",
    },
  };

  return (
    <main className="pt-28 pb-24 px-5 md:px-8 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtworkDetailContent
        title={artwork.title}
        artist={artwork.artist}
        year={artwork.year}
        medium={artwork.medium}
        dimensions={artwork.dimensions}
        location={artwork.location}
        description={artwork.description}
        images={artwork.images ?? []}
        videoFile={artwork.videoFile}
        videoUrl={artwork.videoUrl}
      />
    </main>
  );
}
