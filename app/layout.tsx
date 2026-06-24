import type { Metadata } from "next";
import { Archivo, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    default: "OBRA — Limited Edition Football Jerseys, Concept to Creation",
    template: "%s · OBRA",
  },
  description: siteConfig.description,
  openGraph: {
    title: "OBRA — Limited Edition Football Jerseys",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OBRA — Limited Edition Football Jerseys",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
