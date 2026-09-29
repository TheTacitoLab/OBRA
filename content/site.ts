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
  /** Product pages only: how this category is developed, three short steps. */
  develop?: { title: string; text: string }[];
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
      "Your client’s product, developed and made under your name, in the room or behind it.",
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
    intro:
      "Caps, beanies and bucket hats, with custom trims, labels and finishing.",
    develop: [
      {
        title: "Crown and construction",
        text: "Six-panel, five-panel, beanie or bucket: the shape and construction are settled first, so the sample is the one that goes into production.",
      },
      {
        title: "Peak, sweatband, closure",
        text: "Peak shape and underside, sweatband and closure, chosen so the cap wears like the reference.",
      },
      {
        title: "Embroidery and labels",
        text: "3D or flat embroidery, woven labels and inside tape, signed off on the sample before the run starts.",
      },
    ],
  },
  {
    slug: "t-shirts",
    label: "T-shirts",
    title: "T-shirts",
    description:
      "Bespoke t-shirts from madebyobra: different weights, fits, fabrics, print methods and finishing options.",
    intro:
      "Different weights, fits, fabrics, print methods and finishing options.",
    develop: [
      {
        title: "Weight and fit",
        text: "Fabric weight, fit and neckline chosen for how the tee will be worn and sold, from a boxy heavyweight to a lighter everyday cut.",
      },
      {
        title: "Print and finish",
        text: "Screen print, direct-to-garment, embroidery or applique, with placement and hand feel checked on the sample.",
      },
      {
        title: "Labels and packing",
        text: "Woven or printed labels, hem tags and folded, bagged and barcoded packing, so it lands as retail product.",
      },
    ],
  },
  {
    slug: "tops",
    label: "Tops",
    title: "Tops",
    description:
      "Bespoke tops from madebyobra: hoodies, sweatshirts, jerseys, polos and long sleeves made as part of a collection.",
    intro: "Hoodies, sweatshirts, jerseys, polos and long sleeves.",
    develop: [
      {
        title: "Base and weight",
        text: "Hoodie, crewneck, polo or long sleeve, in the fleece weight and fit the range calls for.",
      },
      {
        title: "Details that carry the brand",
        text: "Drawcords, rib, cuffs, zips and pocket bags, chosen before the artwork goes on.",
      },
      {
        title: "Sample and sign-off",
        text: "One sample to approve, then production with checks on the line before it ships.",
      },
    ],
  },
  {
    slug: "sportswear",
    label: "Sportswear",
    title: "Sportswear",
    description:
      "Bespoke sportswear from madebyobra: performance pieces built for training, teams and active use, made through our factory network.",
    intro: "Performance pieces built for training, teams and active use.",
    develop: [
      {
        title: "Fabric first",
        text: "Performance fabrics chosen for the use: wicking, stretch and weight matched to training, teams or the crowd.",
      },
      {
        title: "Fit and function",
        text: "Panelling, seams and trims worked for movement, with sizing set for the people wearing it.",
      },
      {
        title: "Sublimation and branding",
        text: "Full sublimation, heat transfers or embroidery, proofed on fabric before the run.",
      },
    ],
  },
  {
    slug: "retro-football-shirts",
    label: "Retro football shirts",
    title: "Retro football shirts",
    description:
      "Bespoke retro football shirts from madebyobra: fully custom jerseys for festivals, artists, events, brands and agencies, from limited runs to larger production.",
    intro: "Fully custom jerseys, from limited runs to larger production.",
    develop: [
      {
        title: "Cut and fabric",
        text: "The era, the collar, the fit and the knit, so the shirt reads right before a single stripe is placed.",
      },
      {
        title: "Design and sublimation",
        text: "Full sublimation for pattern and colour, with sponsor and crest placement proofed on the shirt.",
      },
      {
        title: "Numbers, names and packing",
        text: "Names, numbers and size runs planned for the release, packed and barcoded for sale.",
      },
    ],
  },
  {
    slug: "trainingwear",
    label: "Trainingwear",
    title: "Trainingwear",
    description:
      "Bespoke trainingwear from madebyobra: tracksuits, warm-ups, technical tops and training pieces, produced at scale.",
    intro: "Tracksuits, warm-ups, technical tops and training pieces.",
    develop: [
      {
        title: "Set or single piece",
        text: "Tracksuit, warm-up or technical top, planned as a set so the pieces match across fabrics and trims.",
      },
      {
        title: "Fabric and construction",
        text: "Weight, stretch and lining chosen for the climate and the use, with zips, pockets and rib settled on the sample.",
      },
      {
        title: "Sizing for teams",
        text: "Size runs and names planned for the squad or the crew, so the kit arrives sorted and ready to hand out.",
      },
    ],
  },
  {
    slug: "accessories",
    label: "Accessories",
    title: "Accessories",
    description:
      "Bespoke accessories from madebyobra: bags, socks, buffs and smaller branded products made to the same standard as the rest of the range.",
    intro: "Bags, socks, buffs and smaller branded products.",
    develop: [
      {
        title: "The right base",
        text: "Bag construction, sock knit or buff fabric chosen for how the piece will be used and sold, not just how it prints.",
      },
      {
        title: "Part of the range",
        text: "Colour, branding placement and labels matched to the collection, so a sock or a tote reads as the same product.",
      },
      {
        title: "Sample, then run",
        text: "One sample for sign-off, then the run, with checks on the line before anything ships.",
      },
    ],
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
