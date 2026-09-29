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

/** Who for: the five audiences, in display order. */
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
      "Custom product development for campaigns, drops, collaborations and brand extensions that belong in your world.",
  },
  {
    slug: "artists",
    label: "Artists",
    title: "Merchandise for artists",
    description:
      "Bespoke artist merchandise from madebyobra: tour ranges, drops, jerseys and apparel made to the artist’s identity, with production and fulfilment handled.",
    intro:
      "Tour ranges, drops and apparel that carry the identity, with production and fulfilment handled.",
  },
  {
    slug: "agencies",
    label: "Agencies",
    title: "Merchandise for agencies",
    description:
      "madebyobra works behind the scenes with creative, experiential, event and brand agencies: product development and manufacturing for their clients, white label when needed.",
    intro:
      "Product development and manufacturing behind the scenes for your clients, white label when needed.",
  },
];

/** What we make: product category landing pages. */
export const products: PageEntry[] = [
  {
    slug: "headwear",
    label: "Headwear",
    title: "Headwear",
    description:
      "Bespoke headwear from madebyobra: caps, beanies and bucket hats with custom trims, labels and finishing.",
    intro: "Caps, beanies and bucket hats, with custom trims, labels and finishing.",
  },
  {
    slug: "t-shirts",
    label: "T-shirts",
    title: "T-shirts",
    description:
      "Bespoke t-shirts from madebyobra: different weights, fits, fabrics, print methods and finishing options.",
    intro:
      "Different weights, fits, fabrics, print methods and finishing options.",
  },
  {
    slug: "tops",
    label: "Tops",
    title: "Tops",
    description:
      "Bespoke tops from madebyobra: hoodies, sweatshirts, jerseys, polos and long sleeves made as part of a collection.",
    intro: "Hoodies, sweatshirts, jerseys, polos and long sleeves.",
  },
  {
    slug: "sportswear",
    label: "Sportswear",
    title: "Sportswear",
    description:
      "Bespoke sportswear from madebyobra: performance pieces built for training, teams and active use, made through our factory network.",
    intro: "Performance pieces built for training, teams and active use.",
  },
  {
    slug: "retro-football-shirts",
    label: "Retro football shirts",
    title: "Retro football shirts",
    description:
      "Bespoke retro football shirts from madebyobra: fully custom jerseys for festivals, artists, events, brands and agencies, from limited runs to larger production.",
    intro: "Fully custom jerseys, from limited runs to larger production.",
  },
  {
    slug: "trainingwear",
    label: "Trainingwear",
    title: "Trainingwear",
    description:
      "Bespoke trainingwear from madebyobra: tracksuits, warm-ups, technical tops and training pieces, produced at scale.",
    intro: "Tracksuits, warm-ups, technical tops and training pieces.",
  },
  {
    slug: "accessories",
    label: "Accessories",
    title: "Accessories",
    description:
      "Bespoke accessories from madebyobra: bags, socks, buffs and smaller branded products made to the same standard as the rest of the range.",
    intro: "Bags, socks, buffs and smaller branded products.",
  },
];

export type Service = { slug: string; title: string; description: string };

export const services: Service[] = [
  {
    slug: "creative-direction",
    title: "Creative Direction",
    description: "Concepts, artwork and collection direction.",
  },
  {
    slug: "product-development",
    title: "Product Development",
    description:
      "Fits, fabrics, trims and specifications worked into production-ready products.",
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
      "We balance specification, quantity and finish against the available budget.",
  },
  {
    slug: "branding-and-packaging",
    title: "Branding & Packaging",
    description: "Labels, trims, swing tags, packaging and final details.",
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
      "Stock planning, POS preparation and practical support for selling on site.",
  },
  {
    slug: "logistics",
    title: "Logistics",
    description: "Freight, import, customs and final delivery.",
  },
  {
    slug: "white-label-production",
    title: "White Label Production",
    description:
      "Behind-the-scenes product development and manufacturing for agencies and partners.",
  },
];

/** Contact form options. */
export const quantityOptions = [
  "Under 100",
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
