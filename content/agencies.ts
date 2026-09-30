import type { FaqItem } from "@/components/guide/Faq";
import type { GuideImage } from "@/components/guide/Figures";
import type { Crumb } from "@/lib/schema/organization";
import { startHref } from "@/lib/siteConfig";
import { footballShirtPricing, formatQuantity } from "./pricing";
import { findAudience } from "./site";

/**
 * /agencies/: the primary organic page for agency buyers, a long-form
 * guide. The prose itself is in app/agencies/page.tsx; this file holds what
 * the page, its metadata, the contents and the sitemap share.
 *
 * Only facts supplied for the page or already published on the site belong
 * here. Unconfirmed commercial detail stays out rather than being hedged in.
 */

const entry = findAudience("agencies");
if (!entry) throw new Error('No audience entry for "agencies"');

export const agencyPage = {
  path: "/agencies/",
  /** The full <title>, not run through the "%s | madebyobra" template. */
  title: "Custom Merchandise for Agencies | White-Label Production | madebyobra",
  description: entry.description,
  ogTitle: "Custom merchandise production for agencies",
  /**
   * The date this page's content last changed, set by hand. The sitemap's
   * lastmod and the WebPage dateModified read it, so it moves only when the
   * page genuinely changes, never on every deploy.
   */
  modified: "2026-09-30",
  crumbs: [{ name: "Home", path: "/" }, { name: "Agencies" }] as Crumb[],
};

/** Click events for this page's calls to action (see Attribution.tsx). */
export const agencyEvents = {
  sendBrief: "agency_send_brief",
  tradePricing: "agency_trade_pricing",
  briefDownload: "agency_brief_download",
  pricing: "agency_pricing_click",
  howWeWork: "agency_how_we_work_click",
  product: "agency_product_click",
} as const;

/**
 * Where the page's links go. Three destinations the page wants do not
 * exist yet; each points at the nearest live page until it does, and
 * switching is a one-line change here (plus the route and its sitemap
 * entry). Nothing links to a URL that would 404.
 */
export const agencyLinks = {
  start: startHref,
  whatWeMake: "/what-we-make/",
  services: "/services/",
  whiteLabelService: "/services/#white-label-production",
  footballShirts: "/retro-football-shirts/",
  /** /pricing/ is not built: the only published prices are the football
   * shirts, on this page. */
  pricing: "#football-shirts",
  /** /how-we-work/ is not built: How we work lives on About for now. */
  howWeWork: "/about/#how-we-work",
  /**
   * The Agency Merchandise Brief Template. There is no document yet, so
   * this is null and every download link stays hidden; add the file to
   * public/downloads/ and set its path here to switch them all on.
   */
  briefTemplate: null as string | null,
  /** /work/ is not built and there is no publishable project yet: no link. */
  work: null as string | null,
};

/** The contents: every chapter, in page order. */
export const agencySections = [
  { id: "how-agencies-use-madebyobra", label: "How agencies use madebyobra" },
  { id: "quantity", label: "What your quantity lets you make" },
  { id: "direct-to-factory", label: "Why direct-to-factory matters" },
  { id: "what-we-make", label: "What we can make" },
  { id: "white-label", label: "White-label agency production" },
  { id: "concept-to-production", label: "From concept to something manufacturable" },
  { id: "pricing", label: "Pricing and trade margins" },
  { id: "sampling", label: "Sampling and approvals" },
  { id: "deadlines", label: "Planning around your deadline" },
  { id: "pitch-support", label: "Pitch support" },
  { id: "packaging-and-handover", label: "Packaging and handover" },
  { id: "brief", label: "Writing a useful manufacturing brief" },
  { id: "when-custom-is-worth-it", label: "When custom manufacturing is worth it" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "faqs", label: "FAQs" },
  { id: "short-version", label: "The short version" },
] as const;

export type AgencySectionId = (typeof agencySections)[number]["id"];

/**
 * Real photography for the page. Empty until genuine images exist: no
 * stock, no mock-ups presented as product. What we make shows `products`
 * (finished garments and details: collars, badges, labels, trims). `proof`
 * is its own block after Common mistakes and is for finished products,
 * approved samples, development studies, permitted client work and
 * sample-to-production comparisons; label anything unproduced "Concept"
 * and a studio piece "Studio development study". Client work needs the
 * client's written permission.
 */
export const agencyImages: { products: GuideImage[]; proof: GuideImage[] } = {
  products: [],
  proof: [],
};

const shirts = footballShirtPricing;

/**
 * FAQ answers are complete in the HTML (see Faq.tsx). Inline links use
 * [label](/path/). No FAQPage structured data: Google shows FAQ rich
 * results only for authoritative government and health sites, and the
 * visible markup already reads as questions and answers.
 */
export const agencyFaqs: FaqItem[] = [
  {
    id: "faq-custom-bespoke-white-label",
    question:
      "What is the difference between custom, bespoke and white-label merchandise?",
    answer: [
      "The terms get used loosely, so here is how we use them.",
      "Custom usually means a proven product block adapted for the project: colour, artwork, branding, labels, trims and packaging. Bespoke goes into the product itself: purpose-developed fits, construction, specialist fabrics and custom components, engineered around the project.",
      "White-label describes the working relationship rather than the product. We handle the product and manufacturing work behind your agency, and your relationship with the client remains yours. A white-label project can be custom or bespoke.",
    ],
  },
  {
    id: "faq-best-quantities",
    question: "What quantities are best for custom merchandise?",
    answer: [
      "It depends how original the product needs to be. Under 250 units, work with proven product blocks and customise them intelligently. Between 250 and 1,000 units is the sweet spot for many original collections: enough volume to move well beyond decorated blanks without entering huge-volume manufacturing. Above 1,000 units, completely bespoke development becomes far more viable.",
      "These are planning bands rather than universal factory laws. A football shirt, a heavyweight tee and a technical jacket have different manufacturing economics. [How quantity changes what you can make](#quantity).",
    ],
  },
  {
    id: "faq-fully-bespoke",
    question: "Can you manufacture a completely bespoke product?",
    answer: [
      "Yes. Purpose-developed fits, construction, specialist fabrics and custom components become far more viable once quantities move past 1,000 units.",
      "Below that there are practical limits. Some fabrics have dye minimums, specialist trims have production minimums, and completely custom components do not always make commercial sense for a small run. We would rather tell you early which parts of the idea the quantity supports.",
    ],
  },
  {
    id: "faq-cost-vs-blanks",
    question: "Is custom manufacturing more expensive than using blanks?",
    answer: [
      "Not necessarily, and not always cheaper either. Compare the finished cost, not the blank price.",
      "A premium blank bought through a traditional merchandise supply chain means paying for somebody else's garment before any branding has happened, then print or embroidery, sometimes relabelling, then handling and supplier margin. We work directly with our manufacturing partners, so at the right quantity the finished cost of an original product can come surprisingly close to the finished cost of a decorated premium blank. The product and the quantity decide which way it falls.",
    ],
  },
  {
    id: "faq-trade-pricing",
    question: "Do you offer merchandise trade pricing for agencies?",
    answer: [
      "Agency projects can be quoted on a trade basis where appropriate. Where we have established product pricing, such as [our standard custom football shirts](#football-shirts), we publish it.",
      "A quote should make clear what is driving the number: fabric, construction, quantity, branding method, custom trims, labels, packaging, sampling, development and delivery. If you know the budget, tell us, and we can show you where it is worth spending.",
    ],
  },
  {
    id: "faq-white-label",
    question: "Can you work white label?",
    answer: [
      "Yes. Agency projects can be run through your team, with madebyobra handling the product and manufacturing work behind the scenes. Where direct technical input would make the project easier, we can join the conversation as a product specialist if you want us there.",
      "Agree the working relationship before the project starts. Client communication, documentation, samples, approvals, packaging and delivery responsibilities should all be clear from the start.",
    ],
  },
  {
    id: "faq-contact-client",
    question: "Will you contact our client?",
    answer: [
      "Direct client involvement is agreed with the agency first. Where you prefer to control every client interaction, we stay behind the agency. Your relationship with the client remains yours.",
    ],
  },
  {
    id: "faq-client-meetings",
    question: "Can you join a client meeting?",
    answer: [
      "Yes, if you want us there. Where specialist product knowledge would help the conversation, we can join as a product specialist, introduced in whatever way suits your relationship with the client. That is agreed with you before the meeting.",
    ],
  },
  {
    id: "faq-pitch-support",
    question: "Can you support an agency pitch?",
    answer: [
      "Yes. We are happy to help establish whether a product idea is feasible before it reaches the client, whether that is a quick commercial sense-check or indicative pricing.",
      "If a speculative pitch needs original visual concepts or detailed development work, we agree that scope separately, so early guidance does not turn into a full unpaid product-development programme.",
    ],
  },
  {
    id: "faq-moq",
    question: "What is your MOQ?",
    answer: [
      `It depends on the product and the production route. Standard custom football shirts start at ${shirts.minimum} units per design.`,
      "For most projects a better question is: at my quantity, how much of this product can realistically be customised? Some fabrics have dye minimums and specialist trims have production minimums, so the answer changes with the product and the specification.",
    ],
  },
  {
    id: "faq-fifty-bespoke",
    question: "Can you make 50 completely bespoke garments?",
    answer: [
      "Usually not in the fully bespoke sense. At 50 units, custom fabrics, specialist trims and purpose-built components rarely make commercial sense for the run.",
      `That does not mean the result has to look generic. A proven product block with intelligent customisation (colour, artwork, branding, labels, trims and packaging) can still create something highly distinctive. Standard custom football shirts start at ${shirts.minimum} units per design.`,
    ],
  },
  {
    id: "faq-samples",
    question: "Do you make samples?",
    answer: [
      "Yes. Before the main production run, a physical pre-production sample is made and photographed for approval. The approved sample remains at the factory as the production reference.",
      "Decide who has final sample authority before the sample arrives. Otherwise feedback has an extraordinary ability to multiply.",
    ],
  },
  {
    id: "faq-lead-time",
    question: "How far in advance should we brief you?",
    answer: [
      "As soon as the date is known. For event-led projects, the current planning guidance is to allow around twelve weeks from brief to delivery, although exact timing depends on the product, artwork readiness, sampling, approvals and freight.",
      "That window covers product setup, artwork approval, sampling, possible revisions, production, quality control, packing, freight and goods-in, not just factory sewing time. If a finish is too risky for the deadline, we would rather tell you early.",
    ],
  },
  {
    id: "faq-agency-artwork",
    question: "Can you work from our agency's artwork?",
    answer: [
      "Yes. Send finished artwork if you have it, and references if you do not. Artwork behaves differently on product: colours change across materials, embroidery has physical depth and logos often need scaling once they are on an actual body. We check it against the production method, and the sample is where it is confirmed.",
    ],
  },
  {
    id: "faq-range-design",
    question: "Can madebyobra design the range?",
    answer: [
      "Yes. [Creative direction](/services/#creative-direction), meaning concepts, artwork and collection direction, is one of our services, alongside developing the products themselves.",
      "Some agencies bring finished creative and use us for product development and manufacturing; others want design input too. For speculative pitch work, design scope is agreed separately.",
    ],
  },
  {
    id: "faq-deliver-to-client",
    question: "Can you deliver directly to our client?",
    answer: [
      "Yes. Tell us where the product is going and what the destination expects, whether that is the client, a venue, a warehouse, a retail stand or an existing fulfilment partner. On a white-label project, agree what the packing, paperwork and labelling should show before production starts.",
    ],
  },
  {
    id: "faq-retail-ready",
    question: "Can you produce retail-ready merchandise?",
    answer: [
      "Yes. Labelling, barcodes, bagging, carton packing, size separation, swing tags and packaging can all be built into the production plan. Tell us the requirements early, so they are part of production rather than fixed at the end.",
    ],
  },
  {
    id: "faq-high-volume",
    question: "Can you handle high-volume campaigns?",
    answer: [
      "Our manufacturing network has capacity of up to 40,000 units per week across the network. That figure matters for scale, but capacity alone does not guarantee a particular project slot.",
      `Product construction, materials, factory allocation and timing still need checking against the real brief, so speak to us early. At higher volumes the scale may justify developing the product itself, and football-shirt runs of ${formatQuantity(shirts.projectPricedFrom)} or more are priced to the project.`,
    ],
  },
];

/** Tracking for links inside the FAQ copy, by destination. */
export function agencyLinkAttributes(href: string) {
  if (href === agencyLinks.pricing) return { "data-track": agencyEvents.pricing };
  return undefined;
}
