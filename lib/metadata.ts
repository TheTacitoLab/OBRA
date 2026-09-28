import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Shared Open Graph card. Width and height must match the file in public/,
 * and the URL resolves to an absolute https://madebyobra.com/... URL via
 * `metadataBase` in the root layout.
 */
export const ogImage = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "madebyobra wordmark on warm bone",
};

type PageMetadata = {
  /** Fed through the root "%s | madebyobra" template unless `absolute` is true. */
  title: string;
  absolute?: boolean;
  description: string;
  /** Route path with a trailing slash, e.g. "/festivals/". */
  path: string;
  /** Share-card copy, where it should differ from the page title. */
  ogTitle?: string;
  ogDescription?: string;
};

/**
 * Complete metadata for one route, built from one per-page source.
 *
 * Next.js merges layout and page metadata per top-level key, replacing whole
 * objects rather than deep-merging them, so every route builds its full
 * `openGraph` block here instead of relying on that merge.
 */
export function pageMetadata({
  title,
  absolute = false,
  description,
  path,
  ogTitle,
  ogDescription,
}: PageMetadata): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      locale: "en_GB",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [ogImage],
    },
  };
}
