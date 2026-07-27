/**
 * Festival landing page FAQ.
 *
 * Single source of truth for both the visible accordion and the FAQPage
 * JSON-LD, so the markup cannot drift out of sync with the visible text.
 * Copy is verbatim from the landing-page strategy document, Section 3.
 */

export type FaqItem = {
  /** Stable id, used for the accordion anchor and analytics. */
  id: string;
  question: string;
  /** One entry per paragraph. Rendered in order. */
  answer: string[];
};

export const festivalFaq: FaqItem[] = [
  {
    id: "minimum-order",
    question: "What is the minimum order for custom festival football shirts?",
    answer: [
      "Fifty units, through our Concept Release. That covers a fully custom design, a pre-production sample and complete production management. Most festival merchandise releases sit at 100 units or above, where the production cost per unit improves and more fabric and construction options open up.",
    ],
  },
  {
    id: "who-designs",
    question: "Can OBRA create the design, or do we need to supply artwork?",
    answer: [
      "We can create it. Most projects arrive as an idea, a set of brand assets and a rough direction. We handle design, artwork direction and the technical work needed to manufacture it. If you have a designer or an in-house creative team, we work alongside them and take their artwork through to production.",
    ],
  },
  {
    id: "production-ready-files",
    question: "Do we need production-ready files to start?",
    answer: [
      "No. No technical files, tech packs or factory specifications are required. That work is part of what we do.",
    ],
  },
  {
    id: "sample-approval",
    question: "Can we approve a sample before production?",
    answer: [
      "Yes, on every project including 50-unit releases. A pre-production sample is manufactured and approved before bulk production begins. If something needs changing, it changes at that point rather than after 500 units exist.",
    ],
  },
  {
    id: "production-time",
    question: "How long does production take?",
    answer: [
      "Our indicative route is nine weeks from brief to delivery, with sampling around week four and production starting around week six. The real figure depends on quantity, construction, how many designs are in the release, packaging, delivery destination and how quickly approvals come back. If your date is tight we will tell you at the brief stage whether it is achievable.",
    ],
  },
  {
    id: "multiple-designs",
    question: "Can we produce more than one design?",
    answer: [
      "Yes. Multiple designs and colourways are supported from the Edition Release upwards and are common for festivals running stage identities, artist collaborations, crew shirts or sponsor editions. At lower quantities, splitting across designs also splits your stock, so we will talk through whether one strong design serves the release better.",
    ],
  },
  {
    id: "sponsor-branding",
    question: "Can sponsor branding be included?",
    answer: [
      "Yes. Front, sleeve, back and short placements are all available and sponsor integration is one of the reasons the format works for festivals. Bring the sponsor's brand guidelines and approval process into the brief early, because sponsor sign-off is one of the most common causes of delay.",
    ],
  },
  {
    id: "fabrics",
    question: "What fabrics are available?",
    answer: [
      "Lightweight performance fabrics for a technical feel and heavier lifestyle weights for a retail garment with more structure. Choice widens with quantity. At Major Release and above, custom fabric weights, textures and finishes can be developed for the project. We will recommend based on the price point, the audience and how the shirt is meant to feel.",
    ],
  },
  {
    id: "collars-trims",
    question: "Can you do custom collars, ribbing and trims?",
    answer: [
      "Yes. Collar development, ribbed collars and cuffs, custom colours, woven badges, embroidery, branded tapes and trims are all part of the development stage rather than optional extras chosen from a list.",
    ],
  },
  {
    id: "labels-packaging",
    question: "Can you supply custom labels and packaging?",
    answer: [
      "Yes. Custom woven neck labels, swing tags, retail care labels and custom packaging are all available. Retail-ready finishing matters if the shirt is going onto a rail or into an online store alongside other products.",
    ],
  },
  {
    id: "large-volumes",
    question: "Can OBRA handle several thousand units?",
    answer: [
      "Yes. Our Volume Programme runs from 2,500 to 10,000 units and above, with reserved manufacturing capacity, staggered production, multiple delivery destinations and a dedicated production lead. Multiple designs and multiple collections within one programme are supported.",
    ],
  },
  {
    id: "international-delivery",
    question: "Can you deliver internationally?",
    answer: [
      "Yes. We are based in the UK and manage international freight and multi-destination delivery. Tell us the delivery country and date at the brief stage, because freight route and customs handling affect the critical path.",
    ],
  },
  {
    id: "pricing",
    question: "How is pricing calculated and why is there no price list?",
    answer: [
      "Every project is quoted individually because the cost drivers change with every release. The main ones are quantity, design complexity, fabric, construction, labels and trims, packaging, sampling requirements, delivery destination and timeline. A 500-unit single-design release and a 500-unit three-design release with custom packaging are different products at different costs. Send a brief with an approximate quantity and target date and you will get a real number rather than a range that means nothing.",
    ],
  },
  {
    id: "what-to-prepare",
    question: "What do we need to have ready before contacting you?",
    answer: [
      "Very little. The event or project name, roughly who it is for, an approximate quantity if you have one and your target delivery date. Everything else, including the design, the specification and the final quantity, gets worked out together.",
    ],
  },
];
