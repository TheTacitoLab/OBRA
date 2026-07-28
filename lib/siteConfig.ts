export type NavLink = { label: string; href: string };

/**
 * Single source of truth for site-wide constants (name, contact, social).
 */
export const siteConfig = {
  name: "OBRA",
  url: "https://madebyobra.com",
  // TODO: confirm the exact mailbox; the domain is madebyobra.com.
  email: "hello@madebyobra.com",
  tagline: "One process. Start to finish.",
  description:
    "OBRA creates limited edition football jerseys for festivals, artists, creators and culture-led brands. We take your drop from concept to creation, covering design, mockups, tech packs, sampling and production.",
  social: {
    instagram: "madebyobra",
  },
  // Web3Forms access keys (public by design; used client-side by the forms).
  web3formsKeys: {
    homepage: "57be4d91-f32e-4d51-8c6f-72794532f19a",
    brief: "4655dc33-4151-4db9-b958-aa76e53a50e8",
  },
} as const;

// Trailing slashes are required: next.config.ts sets `trailingSlash: true`, so
// the non-slash form 301s. next/link normalises rendered hrefs, but the raw
// literals are published in the RSC payloads and client chunks, where crawlers
// pick them up and then report the redirect.
export const briefHref = "/brief/";
export const privacyHref = "/privacy/";
export const festivalHref = "/custom-football-shirts-for-festivals/";

/** Anchor navigation into the homepage sections. */
export const navLinks: NavLink[] = [
  { label: "Who it's for", href: "#who" },
  { label: "What you get", href: "#what" },
  { label: "Process", href: "#process" },
  { label: "Packages", href: "#custom-football-jersey-production" },
  { label: "Why OBRA", href: "#why" },
];

/** Anchor navigation into the festival landing page's own sections. */
export const festivalNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Why jerseys", href: "#festival-benefits" },
  { label: "Process", href: "#festival-process" },
  { label: "Packages", href: "#festival-packages" },
  { label: "Questions", href: "#festival-faq" },
];

/**
 * Navigation for the page currently being viewed.
 *
 * Section anchors only work on the page that owns them, so each landing page
 * gets its own set plus a link home. Anywhere else (the brief and privacy
 * pages) falls back to a link home plus the homepage sections as absolute
 * URLs, so nothing points at a section that is not there.
 */
export function navLinksFor(pathname: string): NavLink[] {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;

  if (path === "/") return navLinks;
  if (path === festivalHref) return festivalNavLinks;

  return [
    { label: "Home", href: "/" },
    ...navLinks.map((link) => ({ ...link, href: `/${link.href}` })),
  ];
}

/** Sector landing pages, linked from the footer. */
export const sectorLinks: NavLink[] = [
  { label: "Festival football shirts", href: festivalHref },
];
