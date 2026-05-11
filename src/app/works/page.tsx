import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { ARTWORKS_LIST_QUERY } from "@/sanity/lib/queries";
import WorksGrid from "@/components/WorksGrid";
import PageHeader from "@/components/PageHeader";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Works — Gallery Lili",
  alternates: { canonical: "https://www.gallerylili.com/works" },
};

export default async function WorksPage() {
  const { isEnabled } = await draftMode();
  const artworks = await (isEnabled ? draftClient : client).fetch(ARTWORKS_LIST_QUERY);

  return (
    <main className="pt-28 md:pt-32 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <PageHeader
        title="Works"
        ko="갤러리 릴리는 과학관, 공공 기관, 기업을 위한 대형 인터랙티브 키네틱 아트워크를 제작합니다. 각 작품은 공간과 관람객의 관계를 새롭게 정의합니다."
        en="Gallery Lili creates large-scale interactive kinetic artworks for science centers, public institutions, and corporations. Each work redefines the relationship between space and viewer."
      />
      <WorksGrid artworks={artworks} />
    </main>
  );
}
