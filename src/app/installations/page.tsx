import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { INSTALLATIONS_QUERY } from "@/sanity/lib/queries";
import InstallationsList from "@/components/InstallationsList";
import PageHeader from "@/components/PageHeader";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Installations — Gallery Lili",
  alternates: { canonical: "https://www.gallerylili.com/installations" },
};

export default async function InstallationsPage() {
  const { isEnabled } = await draftMode();
  const installations = await (isEnabled ? draftClient : client).fetch(INSTALLATIONS_QUERY);

  return (
    <main className="pt-32 md:pt-40 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <PageHeader
        title="Installations"
        ko="국내외 과학관과 공공 기관에 설치된 작품들입니다. 각 설치는 해당 공간의 맥락과 관람객의 경험을 중심으로 설계되었습니다."
        en="Works installed in science centers and public institutions across Korea and beyond. Each installation is designed around the context of its space and the experience of its visitors."
      />
      <InstallationsList installations={installations} />
    </main>
  );
}
