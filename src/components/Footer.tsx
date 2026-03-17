"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return (
    <footer className="border-t border-zinc-100 py-8 px-5 md:px-8 flex items-start justify-between">
      <p className="text-sm text-zinc-400 tracking-wide">Gallery Lili © 2026</p>
      <div className="flex flex-col items-end gap-1">
        <a
          href="mailto:lili@gallerylili.com"
          className="text-sm text-zinc-400 tracking-wide hover:text-zinc-600 transition-colors"
        >
          lili@gallerylili.com
        </a>
        <p className="text-sm text-zinc-400 tracking-wide">+82-10-5278-6053</p>
      </div>
    </footer>
  );
}
