import { findAudience, type PageEntry } from "./site";

/**
 * The four "Who for" pages: /festivals/, /events/, /brands/ and /artists/.
 * Titles, descriptions and the enormous-list labels stay in content/site.ts
 * (the nav, footer and index pages read them); everything the landing page
 * itself says lives here, keyed by the same slug.
 *
 * Width rules for the display headings, measured against the type scale at
 * weight 900: every word in `headline` is 11 characters or fewer (it sets
 * full width), and `productsHeading` sits in a 7/12 column so its words stay
 * at 7 characters or fewer. `benefitsHeading` sets full width.
 */

export type AudiencePoint = { title: string; text: string };

export type AudienceContent = {
  slug: string;
  /** Hero statement in sentence case, 2-5 words, ending with a full stop. */
  headline: string;
  /** One or two sentences: what madebyobra does for this audience. */
  intro: string;
  /** What we do, specific to the audience. Three or four items. */
  points: AudiencePoint[];
  /** Product slugs from content/site.ts, most relevant first. */
  products: string[];
  /** Section title above the product list. Short words only. */
  /** Overrides the phone title tier when the longest word is glyph-narrow. */
  headlineTier?: "short" | "mid" | "default" | "long";
  productsHeading: string;
  /** Why those products for this audience, one sentence or two. */
  productNote: string;
  /** Service slugs from content/site.ts, in display order. */
  services: string[];
  /** Section title above the benefits. Full width, short words. */
  benefitsHeading: string;
  /** Three commercial or operational benefits. The first is the lead block. */
  benefits: AudiencePoint[];
  /** Closing call to action copy, where it should differ from the default. */
  ctaCopy?: string;
};

export const audienceContent: AudienceContent[] = [
  {
    slug: "festivals",
    headline: "Part of the experience.",
    headlineTier: "mid",
    intro:
      "The festival’s own product line: limited editions, retail ranges and crew product, built on proven blocks and delivered to site ready to sell.",
    points: [
      {
        title: "Limited editions",
        text: "The year’s shirt, the one-off colourway, the piece that only exists on site. Reasons to join the queue.",
      },
      {
        title: "Retail ranges",
        text: "Hero pieces, entry price points and margin pieces planned as one range, with the stand in mind from the first sample.",
      },
      {
        title: "Crew and staff ranges",
        text: "Team product cut from the same range as the retail line, so the whole site reads as one place.",
      },
      {
        title: "Made for the queue",
        text: "Products chosen for how festival retail works: easy to size, easy to carry and wearable the same day.",
      },
    ],
    products: ["t-shirts", "retro-football-shirts", "headwear", "tops"],
    productsHeading: "Made for the field.",
    productNote:
      "Tees and shirts carry the year. Caps and hoodies cover the weather. All of it sells from a rail with a queue in front of it.",
    services: [
      "product-development",
      "sampling-and-manufacturing",
      "procurement-and-costing",
      "e-commerce",
      "event-support",
      "logistics",
    ],
    benefitsHeading: "Ready for the weekend.",
    benefits: [
      {
        title: "POS-ready stock",
        text: "Every line labelled, bagged and boxed by size, with restock split out from opening stock so the team can find it on Saturday night without opening every box.",
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
    ctaCopy:
      "Tell us the dates, the capacity and what sold last year, and we’ll come back with a range and a plan for the stand.",
  },
  {
    slug: "events",
    headline: "Made for the moment.",
    intro:
      "Product built around the event identity, from delegate gifting to the retail stand and the crew, produced and delivered to the date.",
    points: [
      {
        title: "Event identity",
        text: "One product family for the whole event: the same trims, labels and finish across gifting, retail and crew.",
      },
      {
        title: "Gifting",
        text: "Delegate, speaker and VIP pieces people actually keep, packed per recipient and ready to hand over.",
      },
      {
        title: "Retail and pop-ups",
        text: "Short runs for the stand or the pop-up, with a range sized for a two-day window rather than a season.",
      },
      {
        title: "Crew and volunteers",
        text: "Team product that reads as part of the event rather than a uniform, sized and delivered by role.",
      },
    ],
    products: ["tops", "headwear", "t-shirts", "trainingwear"],
    productsHeading: "Made for the date.",
    productNote:
      "Pieces that work as a gift and on a rail. Hoodies and caps people keep wearing, tees for the crew and the pop-up.",
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
        text: "Sampling and production planned back from the event date, with freight, customs and delivery to the venue handled from our side, so the only date you track is the one on the invitation.",
      },
      {
        title: "Gifting quantities",
        text: "From a few dozen to a few thousand, packed per recipient and labelled by day, session or table.",
      },
      {
        title: "Temporary activations",
        text: "One-off runs for pop-ups and activations, with the point of sale set up for the days it runs and the leftover stock planned for.",
      },
    ],
    ctaCopy:
      "Tell us the date, the numbers and who it’s for, and we’ll come back with product, quantities and a delivery plan.",
  },
  {
    slug: "brands",
    headline: "Your brand, as product.",
    intro:
      "Custom product development for campaigns, drops and brand extensions: proven blocks, built around your brand until they read as part of the range.",
    points: [
      {
        title: "Product development",
        text: "Proven blocks developed to your standard: fabric, fit, trims, labels and packaging, sampled until it is right.",
      },
      {
        title: "Brand extension",
        text: "Product that sits beside your core range rather than a merch line off to the side of it.",
      },
      {
        title: "Campaigns and drops",
        text: "Limited runs built around a launch or a moment, timed and sized so they land on the day and sell through.",
      },
      {
        title: "Customer merchandise",
        text: "Pieces for customers, members and staff that carry the brand properly, at quantities that make sense.",
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
        title: "Costed to the budget",
        text: "Direct factory relationships let us shape specification, volume and finish to the number you have, rather than trimming the idea to fit a catalogue. The piece stays the piece.",
      },
      {
        title: "Ready for your store",
        text: "Listings, product data and stock ready for your e-commerce, with fulfilment handled if you would rather not hold stock.",
      },
      {
        title: "Repeatable",
        text: "Once a block is developed it re-runs at the same specification and cost, so a drop can become a line.",
      },
    ],
    ctaCopy:
      "Tell us what you’re launching, roughly how many and the budget you’re working to, and we’ll come back with a range.",
  },
  {
    slug: "artists",
    headline: "Merch worth keeping.",
    intro:
      "Tour ranges, drops and apparel developed around the identity, with sampling, production and fulfilment handled, so the merch is as considered as the work.",
    points: [
      {
        title: "Tour ranges",
        text: "A range planned around the dates: the hero piece, the tee everyone buys and the piece that carries the margin.",
      },
      {
        title: "Drops",
        text: "Limited runs around a release or a moment, timed and sized to sell through rather than sit in boxes.",
      },
      {
        title: "Jerseys and apparel",
        text: "Football shirts, jerseys, hoodies and tees on proven blocks, so the fit is right before the artwork goes on.",
      },
      {
        title: "Identity",
        text: "Product your audience wears as a signal long after the show, because it was designed as a piece rather than a print.",
      },
    ],
    products: ["retro-football-shirts", "tops", "t-shirts", "headwear"],
    productsHeading: "Made for the tour.",
    productNote:
      "The football shirt and the hoodie are the hero pieces. The tee and the cap are the ones everybody buys.",
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
        text: "Storage, pick and pack and direct-to-fan delivery from our side, so a drop does not turn into a week of parcels on the kitchen table. Returns and re-runs handled the same way.",
      },
      {
        title: "Stock by city",
        text: "Splits by venue and size, with restock routed ahead to the next date rather than following the van.",
      },
      {
        title: "Store-ready",
        text: "Product listings, data and a store set up before the announcement, so the link works the moment it is posted.",
      },
    ],
    ctaCopy:
      "Tell us the dates or the release, roughly how many and where it needs to go, and we’ll come back with a range and a plan.",
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
