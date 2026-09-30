import { findAudience, type PageEntry } from "./site";

/**
 * Four of the five "Who for" pages: /festivals/, /events/, /brands/ and
 * /artists/. /agencies/ is a long-form guide with its own page and content
 * (content/agencies.ts). Titles, descriptions and the enormous-list labels
 * stay in content/site.ts (the nav, footer and index pages read them);
 * everything the landing page itself says lives here, keyed by the same
 * slug.
 *
 * Width rules for the display headings, measured against the type scale at
 * weight 900: every word in `headline` is 11 characters or fewer (it sets
 * full width), and `productsHeading` sits in a 7/12 column so its words stay
 * at 7 characters or fewer. `benefitsHeading` sets full width. A "\n" in a
 * heading forces the line break there.
 */

export type AudiencePoint = { title: string; text: string };

export type AudienceContent = {
  slug: string;
  /** Hero statement in sentence case, 2-5 words, ending with a full stop. */
  headline: string;
  /** The end of the headline set on the lime block, when it has one. */
  headlineMark?: string;
  /** Overrides the phone title tier when the longest word is glyph-narrow. */
  headlineTier?: "short" | "mid" | "default" | "long";
  /** One or two sentences: what madebyobra does for this audience. */
  intro: string;
  /** A second, shorter line beneath the intro. */
  secondary?: string;
  /** A second call to action beside Start a project. */
  secondaryCta?: { label: string; href: string };
  /** Title of the first section; defaults to "What we do for {label}." */
  pointsHeading?: string;
  /** What we do, specific to the audience. Three to five items. */
  points: AudiencePoint[];
  /** Product slugs from content/site.ts, most relevant first. */
  products: string[];
  /** Section title above the product list. Short words only. */
  productsHeading: string;
  /** Why those products for this audience, one sentence or two. */
  productNote: string;
  /** Retail readiness for this audience: a short heading and one line. */
  ready?: { heading: string; mark?: string; text: string; link?: { label: string; href: string } };
  /** Service slugs from content/site.ts, in display order. */
  services: string[];
  /** Section title above the benefits. Full width, short words. */
  benefitsHeading?: string;
  /** Three commercial or operational benefits. The first is the lead block. */
  benefits?: AudiencePoint[];
  /** A closing statement before the call to action. */
  statement?: { heading: string; text: string };
  /** Closing call to action copy, where it should differ from the default. */
  ctaCopy?: string;
};

export const audienceContent: AudienceContent[] = [
  {
    slug: "festivals",
    headline: "Part of the experience.",
    headlineTier: "mid",
    intro:
      "The festival’s own product line: limited drops, retail ranges, crew product and gifting, planned as one collection and delivered to site ready to sell.",
    points: [
      {
        title: "Limited drops",
        text: "The year’s shirt, the one-off colourway, the piece that only exists on site. Reasons to join the queue.",
      },
      {
        title: "Retail ranges",
        text: "Hero pieces, entry price points and margin pieces planned as one range, with bundles and the stand in mind from the first sample.",
      },
      {
        title: "Crew and staff ranges",
        text: "Team product cut from the same range as the retail line, so the whole site reads as one place.",
      },
      {
        title: "Gifting and partners",
        text: "Artist, sponsor and partner pieces, packed and labelled so they are ready to hand over, or fulfilled direct to the recipient.",
      },
    ],
    products: ["t-shirts", "retro-football-shirts", "headwear", "tops"],
    productsHeading: "Made for the field.",
    productNote:
      "Tees and shirts carry the year. Caps and hoodies cover the weather. All of it sells from a rail with a queue in front of it.",
    ready: {
      heading: "Retail ready.",
      mark: "ready.",
      text: "From barcodes and product data to packaging and stock preparation, we can get the collection ready to sell before it reaches site.",
      link: { label: "Event support", href: "/services/#event-support" },
    },
    services: [
      "product-development",
      "sampling-and-manufacturing",
      "procurement-and-costing",
      "e-commerce",
      "event-support",
      "fulfilment",
      "logistics",
    ],
    benefitsHeading: "Stocked for the weekend.",
    benefits: [
      {
        title: "POS-ready stock",
        text: "Every line labelled, bagged and boxed by size. Restock is split out from opening stock, so the team can find it on Saturday night without opening every box.",
      },
      {
        title: "Size forecasting",
        text: "Splits built from previous years and who is coming, so the sizes people want are still on the rail on Sunday.",
      },
      {
        title: "On-site restock",
        text: "Reserve stock staged and labelled by line, so a restock is a box number rather than a search.",
      },
    ],
    statement: {
      heading: "One event\nor a full calendar.",
      text: "We can build the product and production setup once, then use it across future events and collections.",
    },
    ctaCopy:
      "Dates, capacity and what sold last year are enough to plan the range and the stand.",
  },
  {
    slug: "events",
    headline: "Made for the moment.",
    intro:
      "Gifting for the delegates, a stand for the retail, kit for the crew: one product family, produced and delivered for the day itself.",
    points: [
      {
        title: "Branded product",
        text: "One product family for the whole event: the same trims, labels and finish across gifting, retail, crew and sponsors.",
      },
      {
        title: "Gifting",
        text: "Delegate, speaker and VIP pieces people actually keep, packed per recipient and ready to hand over.",
      },
      {
        title: "Retail and pop-ups",
        text: "Short runs for the stand or the pop-up, with a range sized for a two-day window, not a season.",
      },
      {
        title: "Sponsors, crew and volunteers",
        text: "Sponsor activation product and team kit that read as part of the event rather than a uniform, sized and delivered by role.",
      },
    ],
    products: ["tops", "headwear", "t-shirts", "trainingwear"],
    productsHeading: "Gift or rail.",
    productNote:
      "Pieces that work as a gift and on a rail. Hoodies and caps people keep wearing, tees for the crew and the pop-up.",
    ready: {
      heading: "Ready to use.",
      text: "Retail, gifting or activation stock can arrive labelled, packed and ready to use.",
      link: { label: "Event support", href: "/services/#event-support" },
    },
    services: [
      "creative-direction",
      "product-development",
      "sampling-and-manufacturing",
      "branding-and-packaging",
      "event-support",
      "logistics",
    ],
    benefitsHeading: "There on the day.",
    benefits: [
      {
        title: "Delivered to the date",
        text: "Sampling and production are planned back from the event date. Freight, customs and delivery to the venue run from our side, so the only date you track is the one on the invitation.",
      },
      {
        title: "Gifting quantities",
        text: "From a few dozen to a few thousand, with quantities planned to the guest list and labelled by day, session or table.",
      },
      {
        title: "Leftover stock planned for",
        text: "Runs sized to the days the stand is open, with the point of sale set up for those days and what is left at the end decided before production, not after.",
      },
    ],
    ctaCopy:
      "Give us the date, the numbers and who it’s for. Product, quantities and delivery follow from that.",
  },
  {
    slug: "brands",
    headline: "Your brand,\nas product.",
    headlineTier: "default",
    intro:
      "Pieces developed to your standard, for a campaign, a drop, a collaboration or a permanent line beside the core range.",
    points: [
      {
        title: "Product development",
        text: "Fabric, fit, trims, labels and packaging to your standard, sampled until it is right.",
      },
      {
        title: "Brand extension",
        text: "Product that sits beside your core range, not off to the side of it.",
      },
      {
        title: "Campaigns, drops and collaborations",
        text: "Limited runs for a launch, a collaboration or a moment, timed and sized so they land on the day and sell through.",
      },
      {
        title: "Retail product and limited runs",
        text: "Pieces for customers, members and staff that sell as product, in limited runs or at quantities that make sense.",
      },
    ],
    products: ["t-shirts", "tops", "headwear", "sportswear", "trainingwear"],
    productsHeading: "Part of the range.",
    productNote:
      "Categories that already sell for brands, developed so each piece reads as your product rather than a blank with a logo on it.",
    services: [
      "creative-direction",
      "product-development",
      "sampling-and-manufacturing",
      "procurement-and-costing",
      "branding-and-packaging",
      "e-commerce",
    ],
    benefitsHeading: "Product, not promo.",
    benefits: [
      {
        title: "Built to the number",
        text: "Direct factory relationships let us move the spec, the quantity and the finish to the number you have, instead of trimming the idea to fit a catalogue. The piece stays the piece.",
      },
      {
        title: "Ready for your store",
        text: "Listings, product data and stock ready for your e-commerce, with fulfilment handled if you would rather not hold stock.",
      },
      {
        title: "Repeatable",
        text: "Once a product is developed it re-runs at the same specification and cost, so a drop can become a line.",
      },
    ],
    statement: {
      heading: "Start small.\nScale when\nit works.",
      text: "Use a smaller run to prove the idea, then move into larger production without starting the whole process again.",
    },
    ctaCopy:
      "What you’re launching, a rough number and the budget you’re working to. That’s enough to start a range.",
  },
  {
    slug: "artists",
    headline: "Product worth keeping.",
    headlineTier: "mid",
    intro:
      "The tour range, the drop and the jersey, made to the identity and as considered as the work, with production and delivery taken care of.",
    points: [
      {
        title: "Tour merchandise",
        text: "A range planned around the dates and the rooms, with quantities set so the last night is not spent selling off the first night’s stock.",
      },
      {
        title: "Drops",
        text: "Limited runs around a release, an announcement or a tour date, sized to sell out, not sit in boxes.",
      },
      {
        title: "Jerseys and apparel",
        text: "Football shirts, jerseys, hoodies and tees with the fit right before the artwork goes on.",
      },
      {
        title: "Audience and community",
        text: "Product your audience wears as a signal long after the show, because it was designed as a piece rather than a print.",
      },
    ],
    products: ["retro-football-shirts", "tops", "t-shirts", "headwear"],
    productsHeading: "Made for the tour.",
    productNote:
      "The football shirt and the hoodie are the hero pieces. The tee and the cap are the ones everybody buys.",
    ready: {
      heading: "Ready to sell.",
      text: "Products can arrive labelled, packed and ready for tour retail, online sales or fulfilment.",
      link: { label: "Fulfilment", href: "/services/#fulfilment" },
    },
    services: [
      "creative-direction",
      "product-development",
      "sampling-and-manufacturing",
      "e-commerce",
      "fulfilment",
      "event-support",
    ],
    benefitsHeading: "From drop to doorstep.",
    benefits: [
      {
        title: "Fulfilment handled",
        text: "A drop does not turn into a week of parcels on the kitchen table. Stock sits with us, orders go straight to fans, and returns and re-runs work the same way.",
      },
      {
        title: "Stock by city",
        text: "Splits by venue and size, with restock routed ahead to the next date instead of following the van.",
      },
      {
        title: "Live before the announcement",
        text: "Product listings, data and a store set up before the announcement, so the link works the moment it is posted.",
      },
    ],
    ctaCopy:
      "Send the tour dates or the release, where the stock needs to go and how many you expect to sell. We’ll build the range around it.",
  },
];

export const findAudienceContent = (slug: string) =>
  audienceContent.find((entry) => entry.slug === slug);

/**
 * The site.ts entry (title, description, label) and the page content for one
 * audience, together. Throws at build time for an unknown slug so a route
 * cannot ship with an empty page.
 */
export function getAudience(slug: string): {
  page: PageEntry;
  content: AudienceContent;
} {
  const page = findAudience(slug);
  const content = findAudienceContent(slug);
  if (!page || !content) {
    throw new Error(`No audience content for "${slug}"`);
  }
  return { page, content };
}
