import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { CONCEPT_PROJECTS_QUERY } from "@/sanity/lib/queries";
import ConceptsGrid from "@/components/ConceptsGrid";
import PageHeader from "@/components/PageHeader";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Concepts — Gallery Lili",
  alternates: { canonical: "https://www.gallerylili.com/concepts" },
};

export default async function ConceptsPage() {
  const { isEnabled } = await draftMode();
  const projects = await (isEnabled ? draftClient : client).fetch(CONCEPT_PROJECTS_QUERY);

  return (
    <main className="pt-28 md:pt-40 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <PageHeader
        title="Concepts"
        ko="이 페이지의 작업들은 완성된 작품이 아닙니다. 제안 가능한 컨셉으로서, 구조나 기술적 세부보다 경험과 인상에 집중합니다."
        en="The works presented here are not finished pieces. They are proposable concepts — each focused on experience and impression rather than technical resolution."
      />
      <ConceptsGrid projects={projects} />
    </main>
  );
}
