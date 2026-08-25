import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Shared Open Graph card, used by every route until per-page artwork exists
 * (festivals page first). Width and height must match the actual file in
 * public/, and the URL resolves to an absolute https://madebyobra.com/... URL
 * via `metadataBase` in the root layout, which most share crawlers require.
 */
export const ogImage = {
  url: "/og-default.jpg",
  width: 1200,
  height: 600,
  alt: "White OBRA wordmark and arrow on a grainy purple and orange gradient",
};

type PageMetadata = {
  /** Fed through the root "%s | OBRA" template unless `absolute` is true. */
  title: string;
  absolute?: boolean;
  description: string;
  /** Route path with a trailing slash, e.g. "/brief/". */
  path: string;
  /** Share-card copy, where it should differ from the page title. */
  ogTitle?: string;
  ogDescription?: string;
};

/**
 * Complete metadata for one route, built from one per-page source.
 *
 * Next.js merges layout and page metadata per top-level key, replacing whole
 * objects rather than deep-merging them: a page that sets any `openGraph`
 * field drops the layout's og:site_name, og:locale and og:type, and a page
 * that sets no `twitter` key used to inherit the layout's homepage values
 * wholesale. Every route therefore builds its full `openGraph` block here
 * instead of relying on that merge. Genuinely global fields that survive the
 * merge intact (metadataBase, robots, the title template) stay in the root
 * layout.
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
