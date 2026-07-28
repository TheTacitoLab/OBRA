import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * robots.txt. The site had none, so the sitemap was never declared to crawlers.
 */

// Required by `output: "export"`: generated once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
