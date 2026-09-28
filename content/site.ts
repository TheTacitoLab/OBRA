import { startHref } from "@/lib/siteConfig";

export type NavLink = { label: string; href: string };

/**
 * Everything the homepage and the placeholder landing pages read from: the
 * audiences, the product categories, the services and the nav. Landing page
 * copy is deliberately short; the pages exist to establish routing,
 * hierarchy and SEO structure, and are populated properly later.
 */

/** Primary navigation, in order. */
export const navLinks: NavLink[] = [
  { label: "Who for", href: "/who-for/" },
  { label: "What we make", href: "/what-we-make/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
];

export const primaryCta = { label: "Start a project", href: startHref };

export type LandingPage = {
  slug: string;
  /** Title as it appears in the enormous homepage lists (uppercase via CSS). */
  label: string;
  /** Page <title> and h1. */
  title: string;
  description: string;
  /** One short sentence under the h1. */
  intro: string;
};

/** Who For: audience landing pages. */
export const audiences: LandingPage[] = [
  {
    slug: "festivals",
    label: "Festivals",
    title: "Merchandise for festivals",
    description:
      "Bespoke festival merchandise from madebyobra: original products built around your festival brand, produced at scale and delivered retail-ready.",
    intro:
      "Original products built around your festival, from the first brief to on-site retail.",
  },
  {
    slug: "artists",
    label: "Artists",
    title: "Merchandise for artists",
    description:
      "Bespoke artist merchandise from madebyobra: tour, release and online collections developed around your identity and produced at scale.",
    intro:
      "Tour, release and online collections that feel like part of the work.",
  },
  {
    slug: "events",
    label: "Events",
    title: "Merchandise for events",
    description:
      "Bespoke event merchandise from madebyobra: collections planned, produced and delivered around your dates, with stock and retail support on the day.",
    intro:
      "Collections planned around your dates, with stock and retail support on the day.",
  },
  {
    slug: "culture-led-brands",
    label: "Culture-led brands",
    title: "Merchandise for culture-led brands",
    description:
      "Bespoke merchandise for culture-led brands from madebyobra: proper product ranges developed around your brand, not blanks with a logo added.",
    intro:
      "Proper product, developed around your brand, that belongs in your world rather than beside it.",
  },
];

/** What We Make: product category landing pages. */
export const products: LandingPage[] = [
  {
    slug: "headwear",
    label: "Headwear",
    title: "Headwear",
    description:
      "Bespoke headwear from madebyobra: caps, beanies and bucket hats developed around your brand, with custom trims, labels and packaging.",
    intro:
      "Caps, beanies and bucket hats developed around your brand, down to the trims and labels.",
  },
  {
    slug: "t-shirts",
    label: "T-shirts",
    title: "T-shirts",
    description:
      "Bespoke t-shirts from madebyobra: proven blanks as the starting point, then fabric, fit, print and finishing built around your brand.",
    intro:
      "Proven blocks as the starting point. Fabric, fit, print and finishing built around you.",
  },
  {
    slug: "tops",
    label: "Tops",
    title: "Tops",
    description:
      "Bespoke tops from madebyobra: hoodies, sweatshirts, jerseys and long sleeves developed as part of a collection rather than as blanks.",
    intro:
      "Hoodies, sweatshirts, jerseys and long sleeves, developed as part of a range.",
  },
  {
    slug: "sportswear",
    label: "Sportswear",
    title: "Sportswear",
    description:
      "Bespoke sportswear from madebyobra: performance pieces designed and manufactured around your brand through our factory network.",
    intro:
      "Performance pieces designed and manufactured around your brand.",
  },
  {
    slug: "retro-football-shirts",
    label: "Retro football shirts",
    title: "Retro football shirts",
    description:
      "Bespoke retro football shirts from madebyobra: fully custom shirts for festivals, artists, events and brands, from short runs to production programmes.",
    intro:
      "Fully custom shirts, from short runs to full production programmes.",
  },
  {
    slug: "trainingwear",
    label: "Trainingwear",
    title: "Trainingwear",
    description:
      "Bespoke trainingwear from madebyobra: tracksuits, warm-ups and training pieces developed around your brand and produced at scale.",
    intro:
      "Tracksuits, warm-ups and training pieces developed around your brand.",
  },
];

export type Service = { slug: string; title: string; description: string };

export const services: Service[] = [
  {
    slug: "creative-direction",
    title: "Creative Direction",
    description: "Concepts, artwork and range direction.",
  },
  {
    slug: "product-development",
    title: "Product Development",
    description: "Proven product blocks developed around your brand.",
  },
  {
    slug: "sampling-and-manufacturing",
    title: "Sampling & Manufacturing",
    description:
      "Sampling, production and quality control through our factory network.",
  },
  {
    slug: "procurement-and-costing",
    title: "Procurement & Costing",
    description:
      "Direct factory relationships let us shape the product around your budget, balancing specification, volume and finish.",
  },
  {
    slug: "branding-and-packaging",
    title: "Branding & Packaging",
    description: "Labels, trims, tags, packaging and finishing details.",
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    description: "Store setup, product listings and retail-ready product data.",
  },
  {
    slug: "fulfilment",
    title: "Fulfilment",
    description: "Storage, pick and pack, and direct-to-customer delivery.",
  },
  {
    slug: "event-support",
    title: "Event Support",
    description:
      "Merch planning, stock preparation, POS support and on-site retail requirements.",
  },
  {
    slug: "logistics",
    title: "Logistics",
    description:
      "Freight, import, customs and getting finished stock where it needs to be.",
  },
];

/** Contact form options. */
export const quantityOptions = [
  "25–99",
  "100–249",
  "250–499",
  "500–999",
  "1,000–4,999",
  "5,000+",
];

export const budgetOptions = [
  "Under £5k",
  "£5k–£10k",
  "£10k–£25k",
  "£25k–£50k",
  "£50k+",
  "Not sure yet",
];

export const pageHref = (slug: string) => `/${slug}/`;

export function findLandingPage(slug: string) {
  return (
    audiences.find((page) => page.slug === slug) ??
    products.find((page) => page.slug === slug)
  );
}
