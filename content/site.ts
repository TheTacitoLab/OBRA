import { startHref } from "@/lib/siteConfig";

export type NavLink = { label: string; href: string };

/**
 * Everything the homepage, footer and landing pages read from: the
 * audiences, the product categories, the services and the nav. The richer
 * per-audience content lives in content/audiences.ts; notes in
 * content/notes.ts.
 */

/** Primary navigation, in order. */
export const navLinks: NavLink[] = [
  { label: "Who for", href: "/who-for/" },
  { label: "What we make", href: "/what-we-make/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Notes", href: "/notes/" },
];

export const primaryCta = { label: "Start a project", href: startHref };

export type PageEntry = {
  slug: string;
  /** Label as it appears in the enormous homepage lists (uppercase via CSS). */
  label: string;
  /** Page <title>. */
  title: string;
  description: string;
  /** One short sentence used in previews and indexes. */
  intro: string;
};

/** Who for: the four audiences, in display order. */
export const audiences: PageEntry[] = [
  {
    slug: "festivals",
    label: "Festivals",
    title: "Merchandise for festivals",
    description:
      "Bespoke festival merchandise from madebyobra: original products built around the festival, limited editions, staff ranges and POS-ready stock, produced at scale.",
    intro:
      "Merchandise as part of the experience: limited editions, retail ranges and staff product, ready for the site.",
  },
  {
    slug: "events",
    label: "Events",
    title: "Merchandise for events",
    description:
      "Bespoke event merchandise from madebyobra: branded product, gifting and retail built around the event identity, with production and logistics handled to the date.",
    intro:
      "Product built around the event identity, from gifting to retail, delivered to the date.",
  },
  {
    slug: "brands",
    label: "Brands",
    title: "Merchandise for brands",
    description:
      "Bespoke merchandise for brands from madebyobra: custom product development, brand extensions, campaign drops and customer merchandise that feels like real product.",
    intro:
      "Custom product development for campaigns, drops and brand extensions that belong in your world.",
  },
  {
    slug: "artists",
    label: "Artists",
    title: "Merchandise for artists",
    description:
      "Bespoke artist merchandise from madebyobra: tour ranges, drops, jerseys and apparel developed around the identity, with production and fulfilment handled.",
    intro:
      "Tour ranges, drops and apparel that carry the identity, with production and fulfilment handled.",
  },
];

/** What we make: product category landing pages. */
export const products: PageEntry[] = [
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
    intro: "Performance pieces designed and manufactured around your brand.",
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

export const findAudience = (slug: string) =>
  audiences.find((page) => page.slug === slug);

export const findProduct = (slug: string) =>
  products.find((page) => page.slug === slug);

export const findService = (slug: string) =>
  services.find((service) => service.slug === slug);
