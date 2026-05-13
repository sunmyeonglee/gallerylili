import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import PageHeader from "@/components/PageHeader";
import SystemContent from "@/components/SystemContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "System — Gallery Lili",
  alternates: { canonical: "https://www.gallerylili.com/services" },
};

export default async function ServicesPage() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <main className="pt-28 md:pt-32 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <PageHeader
        title="System"
        ko="갤러리 릴리의 서비스 구조와 운영 방식을 설명합니다."
        en="How Gallery Lili works — our services, process, and operating structure."
      />
      <SystemContent
        rateBasic={settings?.maintenanceRateBasic ?? "~10%"}
        rateStandard={settings?.maintenanceRateStandard ?? "~20%"}
        ratePremium={settings?.maintenanceRatePremium ?? "~30%"}
      />
    </main>
  );
}
