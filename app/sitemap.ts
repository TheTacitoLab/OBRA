import type { MetadataRoute } from "next";
import { agencyPage } from "@/content/agencies";
import { audiences, pageHref, products } from "@/content/site";
import { noteHref, notes } from "@/content/notes";
import { privacyHref, siteConfig, contactHref } from "@/lib/siteConfig";

/**
 * XML sitemap: canonical, indexable pages only, each URL exactly as its
 * canonical tag gives it (https, no www, trailing slash, per
 * `trailingSlash: true` in next.config.ts). Leave out anything noindex
 * (campaign landing pages), redirects, the 404 and query-string variants.
 *
 * `lastmod` appears only where a real content date exists: a note's
 * published or updated date, and the agencies page's hand-set `modified`.
 * The other static pages carry none rather than claiming to change on
 * every deploy.
 */

// Required by `output: "export"`: generated once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    modified?: string,
  ) => ({
    url: `${siteConfig.url}${path}`,
    ...(modified ? { lastModified: modified } : {}),
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    entry(contactHref, 0.9),
    entry("/who-for/", 0.8),
    entry("/what-we-make/", 0.8),
    entry("/services/", 0.8),
    entry("/about/", 0.7),
    entry("/notes/", 0.7, "weekly"),
    ...audiences.map((page) =>
      page.slug === "agencies"
        ? entry(agencyPage.path, 0.9, "monthly", agencyPage.modified)
        : entry(pageHref(page.slug), 0.8),
    ),
    ...products.map((page) => entry(pageHref(page.slug), 0.7)),
    ...notes.map((note) =>
      entry(noteHref(note.slug), 0.5, "yearly", note.updated ?? note.date),
    ),
    entry(privacyHref, 0.1, "yearly"),
  ];
}
