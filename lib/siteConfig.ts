export type NavLink = { label: string; href: string };

/**
 * Single source of truth for site-wide constants (name, contact, social).
 */
export const siteConfig = {
  name: "OBRA",
  url: "https://byobra.com",
  // TODO: confirm the final public contact address with the client.
  email: "hello@byobra.com",
  tagline: "One process. Start to finish.",
  description:
    "OBRA creates limited edition football jerseys for festivals, artists, creators and culture-led brands. We take your drop from concept to creation, covering design, mockups, tech packs, sampling and production.",
  social: {
    // TODO: add real social handles once confirmed.
    instagram: "", // TODO
    tiktok: "", // TODO
    x: "", // TODO
  },
} as const;

/** Anchor navigation into the homepage sections. */
export const navLinks: NavLink[] = [
  { label: "Who it's for", href: "#who" },
  { label: "What you get", href: "#what" },
  { label: "Process", href: "#process" },
  { label: "Why OBRA", href: "#why" },
];

export const briefHref = "/brief";
export const privacyHref = "/privacy";
