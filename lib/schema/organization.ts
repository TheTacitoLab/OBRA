import { siteConfig, socialLinks } from "@/lib/siteConfig";

const SITE = siteConfig.url;

/**
 * The one Organization node, shared by every page-level graph. The stable @id
 * keeps it a single entity across pages, and `sameAs` lists the canonical
 * profile URLs the platforms themselves serve, matching the footer links
 * character for character. That matters because the OBRA name collides with
 * unrelated entities, so the profile set is what disambiguates us.
 */
export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: siteConfig.name,
    url: `${SITE}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/brand/obra-white.svg`,
    },
    email: siteConfig.email,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "enquiries",
    },
    sameAs: socialLinks.map((link) => link.url),
    parentOrganization: {
      "@type": "Organization",
      name: "TACITO Group",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
  };
}

/** Standalone Organization schema for the homepage script tag. */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    ...organizationNode(),
  };
}
