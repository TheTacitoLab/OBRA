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
    "madebyobra is a bespoke merchandise studio creating original products for brands, artists, festivals and events. We design, develop and manufacture collections that feel like real product, with the quality, detail and pricing to work properly at scale.",
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
  // Web3Forms access keys (public by design; used client-side by the forms).
  web3formsKeys: {
    homepage: "57be4d91-f32e-4d51-8c6f-72794532f19a",
    brief: "4655dc33-4151-4db9-b958-aa76e53a50e8",
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
export const startHref = "/start-a-project/";
export const privacyHref = "/privacy/";
