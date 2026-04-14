import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { ARTWORKS_LIST_QUERY } from "@/sanity/lib/queries";
import WorksGrid from "@/components/WorksGrid";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Works — Gallery Lili",
  alternates: { canonical: "https://www.gallerylili.com/works" },
};

export default async function WorksPage() {
  const { isEnabled } = await draftMode();
  const artworks = await (isEnabled ? draftClient : client).fetch(ARTWORKS_LIST_QUERY);

  return (
    <main className="pt-28 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <h1 className="sr-only">Works</h1>
      <WorksGrid artworks={artworks} />
    </main>
  );
}
