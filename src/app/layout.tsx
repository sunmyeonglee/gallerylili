import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ConditionalHeader from "@/components/ConditionalHeader";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Gallery Lili",
  description: "Gallery Lili — Official Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ConditionalHeader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
