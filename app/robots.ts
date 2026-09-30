import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * robots.txt. Every public page is open to every crawler, including the
 * CSS, JS and images needed to render them; nothing is disallowed.
 *
 * OAI-SearchBot (ChatGPT search) is named explicitly so the decision to be
 * found in ChatGPT search is on the record. It is a different control from
 * GPTBot (model training), which has no rule of its own and so falls under
 * `*`: allowed, as it always has been. Blocking training would be a
 * separate `{ userAgent: "GPTBot", disallow: "/" }` rule, a business
 * decision rather than a search one.
 *
 * robots.txt only controls crawling. Pages that should stay out of the
 * index use a noindex robots meta tag (pageMetadata's `noindex`) instead,
 * and preview deploys get an X-Robots-Tag header (scripts/preview-noindex.mjs).
 */

// Required by `output: "export"`: generated once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
