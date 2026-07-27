import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * XML sitemap. `trailingSlash: true` in next.config.ts means the canonical form
 * of every URL carries a trailing slash, so they are listed that way here.
 *
 * `lastmod` is stamped at build time, which keeps it current on every deploy.
 */

// Required by `output: "export"`: the sitemap is generated once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/custom-football-shirts-for-festivals/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/brief/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
