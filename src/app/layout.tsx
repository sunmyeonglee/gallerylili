import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { draftMode, cookies } from "next/headers";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import DraftModeBanner from "@/components/DraftModeBanner";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const gothicA1 = Gothic_A1({
  weight: ["300", "400", "500"],
  variable: "--font-ko",
  preload: false,
});

const standard = localFont({
  src: [
    { path: "../../public/font/standard-book-webfont.woff2", weight: "400", style: "normal" },
    { path: "../../public/font/standard-book-italic-webfont.woff2", weight: "400", style: "italic" },
    { path: "../../public/font/standard-bold-webfont.woff2", weight: "700", style: "normal" },
    { path: "../../public/font/standard-bold-italic-webfont.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-en",
});

const siteUrl = "https://www.gallerylili.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gallery Lili",
    template: "%s — Gallery Lili",
  },
  description:
    "갤러리 릴리는 키네틱 아트, 오토마타, 움직이는 조형물을 전문으로 하는 갤러리입니다. Gallery Lili specializes in kinetic art, automata, and moving sculptural works.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "Gallery Lili",
    title: "Gallery Lili",
    description:
      "갤러리 릴리는 키네틱 아트, 오토마타, 움직이는 조형물을 전문으로 하는 갤러리입니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery Lili",
    description:
      "갤러리 릴리는 키네틱 아트, 오토마타, 움직이는 조형물을 전문으로 하는 갤러리입니다.",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();
  const isDev = process.env.NODE_ENV === "development";
  const secret = process.env.DRAFT_MODE_SECRET ?? "";
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const initialLang = langCookie === "en" ? "en" : "ko";

  return (
    <html lang="ko">
      <body
        className={`${gothicA1.variable} ${standard.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {isDev && <DraftModeBanner isEnabled={isEnabled} secret={secret} />}
        <LanguageProvider initialLang={initialLang}>
          <NextTopLoader color="#18181b" height={2} showSpinner={false} />
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </LanguageProvider>
      </body>
      <GoogleAnalytics gaId="G-KMV2P4B7DJ" />
      <GoogleTagManager gtmId="GTM-TWG6TGW9" />
    </html>
  );
}
