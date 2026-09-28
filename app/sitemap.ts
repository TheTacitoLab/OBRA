import type { MetadataRoute } from "next";
import { audiences, pageHref, products } from "@/content/site";
import { privacyHref, siteConfig, startHref } from "@/lib/siteConfig";

/**
 * XML sitemap. `trailingSlash: true` in next.config.ts means the canonical
 * form of every URL carries a trailing slash, so they are listed that way.
 * `lastmod` is stamped at build time, which keeps it current on every deploy.
 */

// Required by `output: "export"`: generated once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "monthly" | "yearly" = "monthly",
  ) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    entry(startHref, 0.9),
    entry("/who-for/", 0.8),
    entry("/what-we-make/", 0.8),
    entry("/services/", 0.8),
    entry("/about/", 0.6),
    ...audiences.map((page) => entry(pageHref(page.slug), 0.7)),
    ...products.map((page) => entry(pageHref(page.slug), 0.7)),
    entry(privacyHref, 0.1, "yearly"),
  ];
}
