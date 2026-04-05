import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { client, draftClient } from "@/sanity/lib/client";
import { INSTALLATIONS_QUERY } from "@/sanity/lib/queries";
import InstallationsGrid from "@/components/InstallationsGrid";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Selected Installations",
  description:
    "Selected institutional projects by Gallery Lili — large-scale interactive kinetic systems for science centers and public exhibitions.",
  alternates: { canonical: "https://www.gallerylili.com/installations" },
};

export default async function InstallationsPage() {
  const { isEnabled } = await draftMode();
  const installations = await (isEnabled ? draftClient : client).fetch(INSTALLATIONS_QUERY);

  return (
    <main className="pt-32 pb-24 px-5 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-xs tracking-widest uppercase text-zinc-400 mb-12">
        Selected institutional projects
      </h1>

      <InstallationsGrid installations={installations} />

      {installations.length === 0 && (
        <p className="text-sm text-zinc-400">No installations yet.</p>
      )}
    </main>
  );
}
