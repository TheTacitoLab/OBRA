/**
 * Festival landing page copy.
 *
 * All strings are verbatim from the landing-page strategy document, Section 3.
 * Components consume this file, so a copy edit never requires a component edit.
 */

import type { PackageId } from "@/lib/packages";

export const festivalBriefHref = "/brief/?project=festival";

export function packageBriefHref(id: PackageId | "unsure"): string {
  return `/brief/?project=festival&package=${id}`;
}

/* ---------------------------------------------------------------- Section 1 */

export const hero = {
  eyebrow: "Festival merchandise",
  headingLineOne: "Custom football shirts",
  headingLineTwo: "for festivals",
  standfirst: [
    "We design, develop and manufacture fully custom football shirts for festivals, artists, sponsors and event merchandise programmes.",
    "From a guided 50-piece release to a production programme of 10,000 units and beyond, one team takes the project from first idea to delivered stock.",
  ],
  primaryCta: { label: "Start your jersey project", href: festivalBriefHref },
  // Points at this page's own process section, so the hero never sends a lead
  // off the landing page.
  secondaryCta: { label: "See how the process works", href: "#festival-process" },
  proofBar: [
    "From 50 units",
    "Design to delivery",
    "Sample approved before bulk production",
    "UK studio, international delivery",
    "Up to 10,000+ units",
  ],
};

/* ---------------------------------------------------------------- Section 2 */

export const benefits = {
  eyebrow: "Why the product works",
  heading: "More than event merchandise",
  intro: [
    "A football shirt behaves differently from the rest of a merchandise range. It carries a higher perceived value, so it can hold a higher retail price. It has a natural place for sponsor branding that does not look bolted on. And it gets worn long after the weekend, in places where a printed tee would not go.",
    "Festivals have already proved the format. Shirts released with Glastonbury, Tramlines, Truck and Y Not have shown that an audience will treat an event jersey as a collectable rather than a souvenir.",
  ],
  blocks: [
    {
      heading: "Sits at a higher price point",
      body: "Construction, fabric and finishing put a jersey in a different bracket from a printed tee. That changes what the product can return per unit sold and it changes how the range is priced around it.",
    },
    {
      heading: "Built for sponsors",
      body: "Front, sleeve, back and short placements are part of how the garment is designed, not an afterthought. Sponsor and partner branding reads as intentional because the format expects it.",
    },
    {
      heading: "Worn beyond the field",
      body: "A festival shirt goes to the pub, the match, the next festival. The event keeps travelling on the back of the person wearing it, which is worth more than a bag that stays in a cupboard.",
    },
    {
      heading: "Made to be collected",
      body: "Numbered runs, year-dated designs and single-edition drops create a reason to buy this year and again next year. Scarcity is a design decision, made at the point the quantity is set.",
    },
    {
      heading: "Photographs well",
      body: "Shirts shoot well flat, on a rail, on a person and in a crowd. That gives the marketing team assets for the announcement, the pre-sale, the weekend itself and the post-event recap.",
    },
    {
      heading: "Room for a whole collection",
      body: "Stage identities, artist collaborations, crew versions, sponsor editions and home and away colourways all sit naturally within one format. One product idea can carry a full range.",
    },
  ],
  honestyNote:
    "A jersey costs more to produce than a printed tee. It should be planned as the anchor product in a range rather than the volume product. We will tell you if it is the wrong choice for the audience.",
};

/* ---------------------------------------------------------------- Section 3 */

export const audiences = {
  eyebrow: "Who we work with",
  heading: "Built for festivals, artists and the teams behind them",
  intro:
    "Most festival merchandise projects have three people pulling in different directions. Someone is responsible for the revenue. Someone is protecting the creative direction. Someone has to get the boxes on site before gates open. OBRA works as one production partner across all three.",
  columns: [
    {
      heading: "If you own the commercial result",
      roles: "Head of Merchandise, Commercial Director, Head of Retail, Merchandise Manager.",
      body: "You need a product that sells through at a sensible margin, a quantity that does not leave you holding stock in October and a size split that does not run out of larges on day one. We help set the numbers before anything goes into production.",
    },
    {
      heading: "If you own the creative",
      roles: "Creative Director, Marketing Director, Festival Founder, artists and their teams.",
      body: "You need the shirt to look like the event, not like a template with a logo on it. Design, artwork direction, colour, trims and labels are all developed for the project. Nothing is chosen from a catalogue.",
    },
    {
      heading: "If you own the delivery",
      roles: "Event Production Manager, Operations Director, Production Director, agency project leads.",
      body: "You need dates that hold, a sample you have signed off and one person to ask when something changes. Approvals happen on a schedule and production runs against an agreed critical path.",
    },
  ],
  closing:
    "We also work behind the scenes for creative, merchandise and event agencies delivering festival jersey projects for their own clients.",
};

/* ---------------------------------------------------------------- Section 4 */

export const process = {
  eyebrow: "The process",
  headingLineOne: "You bring the idea,",
  headingLineTwo: "we handle the rest.",
  intro:
    "You do not need artwork files, factory specifications or manufacturing experience to start. An idea, an audience and a date are enough.",
  stages: [
    {
      n: "01",
      heading: "Brief",
      body: "We agree the audience, the quantity, the sales route, the target delivery date and the creative direction before any product work begins. Getting this right is what stops the project changing shape halfway through.",
    },
    {
      n: "02",
      heading: "Design",
      body: "We turn the idea into a complete jersey concept built around the festival, the artist or the campaign. You see mockups, not mood boards.",
    },
    {
      n: "03",
      heading: "Development",
      body: "We specify fabric, fit, construction, collar, trims and labels, then produce the technical pack the factory manufactures from. This is the stage most merchandise projects skip and the reason most of them arrive wrong.",
    },
    {
      n: "04",
      heading: "Approvals",
      body: "Design, artwork and specification are signed off in writing at set points. Nobody discovers a change after production has started.",
    },
    {
      n: "05",
      heading: "Sampling",
      body: "You hold the finished product and approve it before bulk manufacturing begins. If something needs to change, it changes now.",
    },
    {
      n: "06",
      heading: "Production",
      body: "Manufacturing runs against an agreed critical path. We manage the factory communication so you are not chasing it.",
    },
    {
      n: "07",
      heading: "Quality control",
      body: "Product is checked against the approved sample before it leaves the factory. Colour, print, construction, labelling and packing.",
    },
    {
      n: "08",
      heading: "Delivery",
      body: "We manage the route from production to your delivery address, including split deliveries and international freight where the project needs it.",
    },
  ],
};

/* ---------------------------------------------------------------- Section 5 */

export const spec = {
  eyebrow: "Product development",
  heading: "A jersey built around the release",
  intro:
    "Every OBRA jersey is developed from scratch. There is no template, no fixed catalogue and no standard body that gets a new print applied to it. What follows is the range of decisions available, not a list of things you have to specify.",
  columns: [
    {
      heading: "Fabric and fit",
      body: "Performance fabrics for a lighter, technical feel. Heavier lifestyle weights for a retail garment that hangs properly. Custom fit and body shape. Fabric weight and texture developed to the project at higher volumes.",
    },
    {
      heading: "Construction and detail",
      body: "Collar development, including ribbed collars and cuffs. Custom colours matched to the event palette. Sublimated all-over graphics. Embroidery. Woven badges. Sponsor and partner placements positioned as part of the design.",
    },
    {
      heading: "Branding and finishing",
      body: "Custom woven neck labels. Branded trims and tapes. Swing tags. Retail care and composition labels. Everything that separates a product from merchandise.",
    },
    {
      heading: "Presentation",
      body: "Custom packaging. Retail-ready presentation for a merchandise stand or an online store. Multiple colourways. Multiple designs across one release. Custom jacquard where the quantity supports it.",
    },
  ],
  honestyNote:
    "Not every option makes sense at every quantity. Custom jacquard, developed fabrics and bespoke trims need volume behind them to be worth doing. At 50 or 100 units we will steer you towards the decisions that make the biggest difference to the finished product and leave the rest for when the numbers support it.",
  cta: { label: "Discuss your jersey specification", href: festivalBriefHref },
};

/* ---------------------------------------------------------------- Section 6 */

export type FestivalPackage = {
  id: PackageId;
  line: string;
  benefits: string[];
  ctaLabel: string;
};

export const packages = {
  eyebrow: "Production levels",
  heading: "From first release to full festival programme",
  intro: [
    "Five production levels, set by quantity. Every project is quoted individually, because cost depends on the quantity, the design, the fabric, the construction, the trims, the packaging, the sampling and where it needs to be delivered.",
    "You do not need to pick one now. If you are not sure, start a brief and we will tell you which level fits.",
  ],
  /** Names and quantities come from lib/packages.ts, so they stay in sync. */
  levels: [
    {
      id: "concept",
      line: "For first launches and limited releases that need hands-on guidance.",
      benefits: [
        "Fully guided product development",
        "One fully custom jersey design",
        "A curated choice of proven fabrics and construction options",
        "Pre-production sample and approval",
        "Complete production management",
        "A clear route to scale the next release",
      ],
      ctaLabel: "Start a Concept Release",
    },
    {
      id: "core",
      line: "For commercial festival merchandise releases that need more product choice and stronger production pricing.",
      benefits: [
        "A wider choice of premium performance and lifestyle fabrics",
        "More collar, cuff, ribbing and trim options",
        "Greater flexibility across fit and construction",
        "Custom woven labels and branded finishing",
        "More flexible size allocation",
        "Access to a lower production cost bracket",
      ],
      ctaLabel: "Start a Core Release",
    },
    {
      id: "edition",
      line: "For campaigns, collections and multi-design festival releases.",
      benefits: [
        "Multiple jersey designs or colourways",
        "Broader fabric, trim and construction choices",
        "Flexible allocation across designs and sizes",
        "Custom woven labels, swing tags and packaging",
        "Improved volume pricing",
        "Dedicated sampling schedule and project management",
      ],
      ctaLabel: "Start an Edition Release",
    },
    {
      id: "major",
      line: "For major events, established festival brands and retail-ready collections.",
      benefits: [
        "Bespoke garment development",
        "Extended fabric and trim library",
        "Custom fabric weights, textures and finishes",
        "Multiple products, designs and colourways",
        "Reserved factory capacity",
        "Structured approval stages and multi-location delivery planning",
      ],
      ctaLabel: "Start a Major Release",
    },
    {
      id: "volume",
      line: "For festival groups, large-scale campaigns and ongoing merchandise programmes.",
      benefits: [
        "Bespoke commercial and volume pricing",
        "Multiple products, collections and seasonal releases",
        "Custom-developed fabrics, finishes and construction",
        "Reserved manufacturing capacity and staggered production",
        "International freight coordination and multiple delivery destinations",
        "A dedicated OBRA production lead",
      ],
      ctaLabel: "Discuss a Volume Programme",
    },
  ] satisfies FestivalPackage[],
  footer: {
    heading: "Not sure which level fits?",
    body: "Tell us the event, the audience size and the date. We will recommend a starting quantity and a production route.",
    /** Starts the brief here, then carries the answers into the full form. */
    nameLabel: "Your name",
    namePlaceholder: "First and last",
    emailLabel: "Email",
    emailPlaceholder: "you@festival.com",
    cta: { label: "Continue to the brief", href: packageBriefHref("unsure") },
    note: "We will take you to the rest of the brief with these details filled in.",
  },
};

/* ---------------------------------------------------------------- Section 7 */

export const timeline = {
  eyebrow: "Timeline",
  heading: "Plan backwards from the festival date",
  intro: [
    "Festival merchandise has one deadline that does not move. Everything else has to be planned back from it.",
    "The OBRA process runs to an indicative nine-week route from brief to delivery.",
  ],
  variablesHeading: "What changes it",
  variablesIntro: "That route is a starting point, not a promise. The final timeline depends on:",
  variables: [
    "Quantity",
    "Construction and fabric choice",
    "How many designs are in the release",
    "Sampling requirements and how many rounds are needed",
    "Packaging and retail finishing",
    "Delivery destination and freight route",
    "How quickly approvals come back from your side",
  ],
  emphasis:
    "Approval speed is the variable most within your control and the one that most often moves a delivery date. A week spent waiting for a sponsor sign-off is a week taken from production.",
  buffer:
    "We build sensible buffers into each stage so the decisions that matter, artwork approval, sample review and final quality checks, are not compressed into the last fortnight. If a date cannot be met safely, we will say so at the brief stage rather than at the production stage.",
  cta: { label: "Check your project timeline", href: festivalBriefHref },
};

/* ---------------------------------------------------------------- Section 8 */

export const planning = {
  eyebrow: "Commercial planning",
  heading: "Build the release around how it will sell",
  intro: [
    "The quantity question is the one that stalls most festival merchandise projects. Order too few and you sell out on Friday afternoon with two days left. Order too many and the margin sits in a storage unit until next summer.",
    "There is no universal formula and anyone offering one is guessing. What we can do is work through the variables with you before the number gets committed.",
  ],
  questionsHeading: "The questions we help you answer",
  questions: [
    "Should this be one hero jersey or a wider collection?",
    "Is the product built to sell before, during or after the event?",
    "Will different stages, artists or sponsors need separate designs?",
    "How should the size breakdown be split for this audience?",
    "What specification supports the retail price you have in mind?",
    "Is one delivery destination enough, or does stock need to land in more than one place?",
    "What happens if it sells out on day one and is replenishment realistic within the event window?",
    "What is the plan for anything unsold after the weekend?",
  ],
  tableCaption: "Planning inputs and why each one changes the quantity",
  tableHeadings: ["Input", "Why it changes the number"],
  inputs: [
    ["Capacity and number of days", "Sets the ceiling on footfall past the stand"],
    ["Previous merchandise performance", "The most reliable predictor you have, if it exists"],
    ["Sales channels in play", "Pre-event online, on-site, post-event, or all three"],
    ["Audience profile", "Buying behaviour varies enormously by genre and age"],
    ["Retail price", "Sets both the margin and the realistic conversion rate"],
    ["Artist and sponsor allocations", "Units committed before a single one is sold"],
    ["Number of designs", "Splits the same demand across more SKUs"],
    ["Size curve", "Wrong split loses sales even when total stock is right"],
  ],
  closing:
    "Bring whatever numbers you have, including none. We will help you establish a starting quantity and a production structure that can scale if the release performs.",
  cta: { label: "Plan your festival release", href: festivalBriefHref },
};

/* ---------------------------------------------------------------- Section 9 */

export const proof = {
  eyebrow: "Why OBRA",
  heading: "One partner across the whole project",
  intro:
    "Most festival merchandise problems are handover problems. The designer does not know what the factory can produce. The factory builds what the file says rather than what was intended. Nobody owns the gap. OBRA holds design, development and production together so the gap does not exist.",
  blocks: [
    {
      heading: "Design and manufacturing in one place",
      body: "The people designing the shirt understand what the factory can make. Specification decisions get taken with production reality in the room.",
    },
    {
      heading: "Technical development included",
      body: "Tech packs, fabric specification, construction detail and trim sourcing are part of the service, not a separate cost or your responsibility.",
    },
    {
      heading: "A sample before bulk",
      body: "Nothing goes into full production until you have approved a physical sample. This is the single biggest protection against an expensive mistake.",
    },
    {
      heading: "Approvals on a schedule",
      body: "Set stages, in writing. You know what you are signing off and when and so does the factory.",
    },
    {
      heading: "Built for 50 and for 10,000",
      body: "The same process runs at both ends. A first release gets the same development discipline as a retail programme.",
    },
    {
      heading: "No fixed catalogue",
      body: "Product decisions come from the project, the audience and the budget. We recommend the specification that suits the release, including the cheaper option when it is the right one.",
    },
  ],
};

/* --------------------------------------------------------------- Section 11 */

export const faqSection = {
  heading: "Festival football shirt questions",
};

/* --------------------------------------------------------------- Section 12 */

export const finalCta = {
  headingLineOne: "Your festival date is fixed.",
  headingLineTwo: "The production plan should be too.",
  body: [
    "You do not need the design finished, the quantity confirmed or the budget signed off to start a conversation.",
    "Tell us what you are creating, who it is for, roughly how many and when you need it on site. We will come back with the right specification, a realistic quantity and a production route that works to your date.",
  ],
  cta: { label: "Start your jersey project", href: festivalBriefHref },
  expectationsHeading: "The brief asks for:",
  expectations: [
    "Your name and contact details",
    "Festival, brand or project name",
    "Project type",
    "Production level, if you know it",
    "Estimated quantity",
    "What you are creating",
    "Target delivery date",
  ],
  reassurance:
    "No technical files are required to start. If you do not know the quantity or the specification yet, say so in the brief.",
  contactLead: "Prefer email?",
};

/** Sticky mobile CTA. */
export const stickyCta = {
  label: "Start your jersey project",
  href: festivalBriefHref,
};

export const breadcrumb = {
  homeLabel: "Home",
  currentLabel: "Custom Football Shirts for Festivals",
};
