"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickLang } from "@/lib/translations";

type Installation = {
  _id: string;
  slug: string | null;
  title: { ko?: string; en?: string } | null;
  year: string | null;
  location: { ko?: string; en?: string } | null;
  image: string | null;
};

export default function InstallationsList({ installations }: { installations: Installation[] }) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col divide-y divide-zinc-100">
      {installations.map((inst) => {
        const name = pickLang(inst.location?.ko, inst.location?.en, lang);
        if (!name) return null;
        return (
          <Link
            key={inst._id}
            href={`/works/${inst.slug}`}
            className="flex items-center gap-5 py-4 group"
          >
            <div className="relative w-20 h-14 shrink-0 overflow-hidden bg-zinc-100">
              {inst.image && (
                <Image
                  src={inst.image}
                  alt={name}
                  fill
                  className="object-cover md:grayscale transition-all duration-500 md:group-hover:grayscale-0"
                />
              )}
            </div>
            <div>
              <p className="text-sm text-zinc-900 group-hover:opacity-60 transition-opacity">
                {name}
              </p>
              {inst.year && (
                <p className="text-xs text-zinc-400 mt-0.5">{inst.year}</p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
