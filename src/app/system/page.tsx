import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SystemContent from "@/components/SystemContent";

export const metadata: Metadata = {
  title: "System — Gallery Lili",
  alternates: { canonical: "https://www.gallerylili.com/system" },
};

export default function SystemPage() {
  return (
    <main className="pt-28 md:pt-32 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <PageHeader
        title="System"
        ko="갤러리 릴리의 서비스 구조와 운영 방식을 설명합니다."
        en="How Gallery Lili works — our services, process, and operating structure."
      />
      <SystemContent />
    </main>
  );
}
