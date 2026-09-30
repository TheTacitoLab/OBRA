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

export type OgImage = typeof ogImage;

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
  /** A page-specific share image (a real photograph); the wordmark card otherwise. */
  image?: OgImage;
  /** Present for notes: typed as an article with its dates and author. */
  article?: { publishedTime: string; modifiedTime?: string; authors?: string[] };
  /**
   * noindex, follow. For conversion-only pages (paid or outbound campaign
   * landing pages) that repeat an organic page's proposition; keep such a
   * page out of app/sitemap.ts as well. Never set on an organic page.
   */
  noindex?: boolean;
};

/**
 * Complete metadata for one route, built from one per-page source.
 *
 * Next.js merges layout and page metadata per top-level key, replacing whole
 * objects rather than deep-merging them, so every route builds its full
 * `openGraph` block here instead of relying on that merge. Twitter card tags
 * need nothing here: Next.js fills them from `openGraph` (title,
 * description, image) and picks summary_large_image because there is one.
 */
export function pageMetadata({
  title,
  absolute = false,
  description,
  path,
  ogTitle,
  ogDescription,
  image = ogImage,
  article,
  noindex = false,
}: PageMetadata): Metadata {
  const shared = {
    url: path,
    siteName: siteConfig.name,
    locale: "en_GB",
    title: ogTitle ?? title,
    description: ogDescription ?? description,
    images: [image],
  };
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: article
      ? {
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime ?? article.publishedTime,
          ...(article.authors?.length ? { authors: article.authors } : {}),
          ...shared,
        }
      : { type: "website", ...shared },
  };
}
