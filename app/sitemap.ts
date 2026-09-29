import type { MetadataRoute } from "next";
import { audiences, pageHref, products } from "@/content/site";
import { noteHref, notes } from "@/content/notes";
import { privacyHref, siteConfig, startHref } from "@/lib/siteConfig";

/**
 * XML sitemap. `trailingSlash: true` in next.config.ts means the canonical
 * form of every URL carries a trailing slash, so they are listed that way.
 * Only the notes carry `lastmod` (their published date); the static pages
 * would otherwise claim to change on every deploy.
 */

// Required by `output: "export"`: generated once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    modified?: Date,
  ) => ({
    url: `${siteConfig.url}${path}`,
    ...(modified ? { lastModified: modified } : {}),
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    entry(startHref, 0.9),
    entry("/who-for/", 0.8),
    entry("/what-we-make/", 0.8),
    entry("/services/", 0.8),
    entry("/about/", 0.7),
    entry("/notes/", 0.7, "weekly"),
    ...audiences.map((page) => entry(pageHref(page.slug), 0.8)),
    ...products.map((page) => entry(pageHref(page.slug), 0.7)),
    ...notes.map((note) =>
      entry(noteHref(note.slug), 0.5, "yearly", new Date(note.date)),
    ),
    entry(privacyHref, 0.1, "yearly"),
  ];
}
