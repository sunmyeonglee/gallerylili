"use client";

import { usePathname } from "next/navigation";
import { EnvelopeSimpleIcon, PhoneIcon, InstagramLogoIcon } from "@phosphor-icons/react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio") || pathname === "/") return null;
  return (
    <footer className="border-t border-zinc-100 py-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-start justify-between">
        <p className="text-sm text-zinc-400 tracking-wide">Gallery Lili © 2026</p>
        <div className="flex flex-col items-end gap-2">
          <a
            href="mailto:lili@gallerylili.com"
            className="flex items-center gap-1.5 text-sm text-zinc-400 tracking-wide hover:text-zinc-600 transition-colors"
          >
            <EnvelopeSimpleIcon size={14} weight="light" />
            lili@gallerylili.com
          </a>
          <a
            href="tel:+821052786053"
            className="flex items-center gap-1.5 text-sm text-zinc-400 tracking-wide hover:text-zinc-600 transition-colors"
          >
            <PhoneIcon size={14} weight="light" />
            +82-10-5278-6053
          </a>
          <a
            href="https://www.instagram.com/gal_lerylili/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-zinc-400 tracking-wide hover:text-zinc-600 transition-colors"
          >
            <InstagramLogoIcon size={14} weight="light" />
            @gal_lerylili
          </a>
        </div>
      </div>
    </footer>
  );
}
