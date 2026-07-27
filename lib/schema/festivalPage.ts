/**
 * JSON-LD @graph for the festival landing page.
 *
 * Per the strategy document Section 7: Organization, WebSite, WebPage,
 * BreadcrumbList, Service and FAQPage. Deliberately no Product, no Offer
 * carrying a price, no Review and no AggregateRating - OBRA publishes no
 * public price and holds no eligible first-party reviews.
 *
 * The FAQPage node is derived from content/festival-faq.ts so it can never
 * drift from the visible accordion text. Note that Google retired FAQ rich
 * results on 7 May 2026, so this produces no visible search feature.
 */

import { festivalFaq } from "@/content/festival-faq";
import { releasePackages } from "@/lib/packages";
import { siteConfig } from "@/lib/siteConfig";

const SITE = "https://madebyobra.com";
const PAGE = `${SITE}/custom-football-shirts-for-festivals/`;

export const festivalPageMeta = {
  url: PAGE,
  title: "Custom Football Shirts for Festivals | OBRA",
  description:
    "OBRA designs, develops and manufactures fully custom football shirts for festivals. Guided 50-unit releases to 10,000+ unit production programmes, from concept to delivery.",
  ogTitle: "Custom Football Shirts for Festivals",
  ogDescription:
    "Fully custom festival football shirts, designed, developed and manufactured in one place. From 50 units to 10,000+.",
};

export function buildFestivalPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: siteConfig.name,
        url: `${SITE}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/brand/obra-white.svg`,
        },
        email: siteConfig.email,
        sameAs: [`https://instagram.com/${siteConfig.social.instagram}`],
        parentOrganization: {
          "@type": "Organization",
          name: "TACITO Group",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "GB",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: siteConfig.name,
        inLanguage: "en-GB",
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE}#webpage`,
        url: PAGE,
        name: festivalPageMeta.title,
        description: festivalPageMeta.description,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${PAGE}#service` },
        breadcrumb: { "@id": `${PAGE}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Custom Football Shirts for Festivals",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${PAGE}#service`,
        name: "Custom football shirt design and manufacturing for festivals",
        serviceType: "Custom football shirt manufacturing",
        provider: { "@id": `${SITE}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Place", name: "Europe" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Australia" },
        ],
        audience: {
          "@type": "BusinessAudience",
          name: "Festivals, event organisers, artists, record labels, brand partners and merchandise agencies",
        },
        description:
          "Design, development, sampling, production and delivery of fully custom football shirts for festivals and event merchandise programmes, from 50 units to 10,000 units and above.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Production levels",
          // Names and quantities come from the shared package data. No prices.
          itemListElement: releasePackages.map((pkg) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${pkg.name}, ${pkg.quantity.toLowerCase()}`,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE}#faq`,
        isPartOf: { "@id": `${PAGE}#webpage` },
        mainEntity: festivalFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.join(" "),
          },
        })),
      },
    ],
  };
}
