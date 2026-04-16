import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { CONCEPT_PROJECTS_QUERY } from "@/sanity/lib/queries";
import ConceptsGrid from "@/components/ConceptsGrid";
import ConceptsHeader from "@/components/ConceptsHeader";

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
      <ConceptsHeader />
      <ConceptsGrid projects={projects} />
    </main>
  );
}
