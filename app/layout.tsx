import type { Metadata } from "next";
import { Archivo, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ogImage } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

// Body + lede.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Micro labels, section numbers, metadata, eyebrows.
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Display / headlines.
// TODO: load Breul Grotesk via next/font/local from /public/fonts/*.woff2 when
// the licensed files are available, then point --font-display at it. Archivo is
// the interim heavy-grotesk fallback so the build stays green.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Football Jerseys From Concept to Creation | OBRA",
    template: "%s | OBRA",
  },
  description: siteConfig.description,
  // Rendered on every route: pages inherit this whole-key value.
  robots: { index: true, follow: true },
  // Fallback only. Every route builds its complete `openGraph` block through
  // lib/metadata.ts, because a page-level `openGraph` replaces this whole
  // object rather than merging into it; this remains for any future route
  // that ships without page metadata.
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
    <html
      lang="en-GB"
      className={`${inter.variable} ${spaceMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Site-wide film grain, blended over everything. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] bg-grain opacity-[0.08] mix-blend-soft-light"
        />
      </body>
    </html>
  );
}
