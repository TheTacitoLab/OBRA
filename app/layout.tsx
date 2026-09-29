import type { Metadata } from "next";
import { DM_Sans, Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ogImage } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";

// Two families: the display face for headings, navigation and buttons, and
// DM Sans for running text. Both are variable fonts, so every weight comes
// from one file each.
//
// Aeonik is the intended display typeface. It is a licensed font and is not
// bundled here; Figtree is the closest available stand-in (geometric-leaning,
// round full stop, weights to 900). To drop Aeonik in once the licensed
// files are in the repo:
//
//   import localFont from "next/font/local";
//   const aeonik = localFont({
//     src: [
//       { path: "./fonts/Aeonik-Regular.woff2", weight: "400" },
//       { path: "./fonts/Aeonik-Medium.woff2", weight: "500" },
//       { path: "./fonts/Aeonik-Bold.woff2", weight: "700" },
//       { path: "./fonts/Aeonik-Black.woff2", weight: "900" },
//     ],
//     variable: "--font-aeonik",
//     display: "swap",
//   });
//
// and add `aeonik.variable` to the <html> className below. The display
// stack in globals.css prefers --font-aeonik when it is defined and falls
// back to --font-figtree otherwise, so nothing else changes; update
// --font-ascent and --font-cap there to Aeonik's metrics for the lime block.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "madebyobra | Merchandise and product studio",
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
    <html
      lang="en-GB"
      className={`${figtree.variable} ${dmSans.variable} h-full`}
    >
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
