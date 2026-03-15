import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import NextTopLoader from "nextjs-toploader";
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
          <NextTopLoader color="#18181b" height={2} showSpinner={false} />
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
