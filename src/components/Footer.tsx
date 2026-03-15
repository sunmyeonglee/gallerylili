"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return (
    <footer className="border-t border-zinc-100 py-8 px-5 md:px-8">
      <p className="text-xs text-zinc-400 tracking-wide">
        Gallery Lili © 2026
      </p>
    </footer>
  );
}
