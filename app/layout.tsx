import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ogImage } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

// One grotesk for display and text. Variable weight, so the hero's 800 and
// the body's 400 come from the same file.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "madebyobra | Bespoke merchandise studio",
    template: "%s | madebyobra",
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // Fallback only: every route builds its complete `openGraph` block through
  // lib/metadata.ts, because a page-level `openGraph` replaces this object.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_GB",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${hanken.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bone text-ink">
        <a
          href="#main"
          className="btn btn-primary fixed left-4 top-4 z-[80] -translate-y-[200%] focus:translate-y-0"
        >
          <span>Skip to content</span>
        </a>
        <Header />
        {/* Wrapped so the header can make the page inert while its menu is open. */}
        <div id="page" className="flex flex-1 flex-col">
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
