import { siteConfig, socialLinks } from "@/lib/siteConfig";

const SITE = siteConfig.url;

/**
 * The one Organization node, shared by every page-level graph. The stable @id
 * keeps it a single entity across pages, and `sameAs` lists the canonical
 * profile URLs the platforms themselves serve.
 */
export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: siteConfig.name,
    url: `${SITE}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/brand/madebyobra.png`,
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

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: `${SITE}/`,
    name: siteConfig.name,
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE}/#organization` },
  };
}

/** Organization + WebSite graph for the homepage script tag. */
export function buildHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  };
}

type Crumb = { name: string; path?: string };

/**
 * WebPage + BreadcrumbList graph for a landing page. `crumbs` runs from Home
 * to the current page; the last crumb has no `item` by convention.
 */
export function buildPageSchema({
  path,
  title,
  description,
  crumbs,
}: {
  path: string;
  title: string;
  description: string;
  crumbs: Crumb[];
}) {
  const page = `${SITE}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      {
        "@type": "WebPage",
        "@id": `${page}#webpage`,
        url: page,
        name: title,
        description,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${SITE}/#website` },
        breadcrumb: { "@id": `${page}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${page}#breadcrumb`,
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          ...(crumb.path ? { item: `${SITE}${crumb.path}` } : {}),
        })),
      },
    ],
  };
}
