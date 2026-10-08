/**
 * Site-wide constants. The visible brand name is always `madebyobra`, in one
 * word and lower case: it doubles as the maker's mark on the products.
 */
export const siteConfig = {
  name: "madebyobra",
  url: "https://madebyobra.com",
  // TODO: confirm the exact mailbox; the domain is madebyobra.com.
  email: "hello@madebyobra.com",
  description:
    "British bespoke merchandise design and manufacturing studio for agencies, festivals, events, artists and brands. Original apparel, product development and full-service production.",
  // Canonical profile URLs exactly as the platforms serve them. Footer links
  // and schema.org sameAs both read from here and must match character for
  // character so the profiles resolve to one entity.
  social: {
    instagram: {
      label: "Instagram",
      url: "https://www.instagram.com/madebyobra/",
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/madebyobra/",
    },
  },
  // Web3Forms access key (public by design; used client-side by the
  // enquiry form on /contact/).
  web3formsKey: "4655dc33-4151-4db9-b958-aa76e53a50e8",
  // Tracking IDs. Nothing loads until the visitor consents (see
  // components/site/CookieConsent.tsx). GA4 is loaded directly with gtag.js
  // while `gtmId` is null. To move to Google Tag Manager, set the container
  // ID here and configure GA4 and the LinkedIn Insight Tag inside the
  // container (with consent checks): the direct GA4 and LinkedIn loaders
  // then switch off, so nothing is counted twice.
  analytics: {
    gtmId: null as string | null,
    ga4Id: "G-Z8WND8F9RR",
    linkedInPartnerId: "9818722",
  },
} as const;

/** Social profiles, in footer display order. */
export const socialLinks = [
  siteConfig.social.instagram,
  siteConfig.social.linkedin,
];

// Trailing slashes are required: next.config.ts sets `trailingSlash: true`, so
// the non-slash form 301s. next/link normalises rendered hrefs, but the raw
// literals are published in the RSC payloads and client chunks.
/** The enquiry form. Every general "Get in touch" leads here. */
export const contactHref = "/contact/";
export const privacyHref = "/privacy/";
