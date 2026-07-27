/**
 * Single source of truth for OBRA's production packages.
 *
 * Reused by the homepage packages section (`components/sections/Packages.tsx`),
 * the homepage CTA links, and the brief-page release picker
 * (`components/ReleaseSelector.tsx`). Keep marketing copy here and rendering
 * logic in the components. No prices — quantities only.
 */

export type PackageId = "concept" | "core" | "edition" | "major" | "volume";

/** Package id plus the "unsure" escape hatch used only by the brief picker. */
export type BriefPackageId = PackageId | "unsure";

export type ReleasePackage = {
  id: PackageId;
  /** Package name — rendered as an H3 on the homepage. */
  name: string;
  /** Human-readable starting quantity, e.g. "From 50 units". Never a price. */
  quantity: string;
  /** Homepage lead line (one sentence). */
  summary: string;
  /** Homepage supporting paragraph. */
  fullDescription: string;
  /** Condensed one-liner for the brief-page radio card. */
  shortDescription: string;
  benefits: string[];
  bestFor: string;
  ctaLabel: string;
};

export const releasePackages: ReleasePackage[] = [
  {
    id: "concept",
    name: "Concept Release",
    quantity: "From 50 units",
    summary:
      "A fully supported route into custom football jersey production.",
    fullDescription:
      "You do not need technical files, manufacturing knowledge or every detail figured out. We help shape the idea, guide the important product decisions and manage your first release from initial concept through to finished delivery.",
    shortDescription:
      "Fully guided support for first launches and limited releases.",
    benefits: [
      "Hands-on guidance throughout the project",
      "Support refining your initial jersey concept",
      "One fully custom football jersey design",
      "A curated choice of proven fabrics and construction options",
      "Advice on fit, collars, cuffs, trims and branding",
      "Production-ready artwork and technical specifications",
      "Pre-production sample and approval process",
      "Manufacturing, quality control and delivery",
      "A clear route to scale future orders",
    ],
    bestFor:
      "First launches, limited-edition football shirts, creator drops and brands testing a new product.",
    ctaLabel: "START A CONCEPT RELEASE",
  },
  {
    id: "core",
    name: "Core Release",
    quantity: "From 100 units",
    summary:
      "Greater product choice, improved production pricing and more room to make the jersey your own.",
    fullDescription:
      "The Core Release is designed for commercial merchandise launches where quality, presentation and margin all matter.",
    shortDescription:
      "Greater product choice and stronger commercial production pricing.",
    benefits: [
      "Everything required to take the jersey from concept to delivery",
      "A wider choice of premium performance and lifestyle fabrics",
      "More collar, cuff, ribbing and trim options",
      "Greater flexibility across fit and garment construction",
      "Custom woven labels and branded finishing",
      "Multiple colourway options where production splits allow",
      "More flexible size allocations",
      "Access to a lower production cost bracket",
      "Full sampling, manufacturing and quality-control management",
    ],
    bestFor:
      "Festivals, creators, events and culture-led brands launching custom football shirt merchandise.",
    ctaLabel: "START A CORE RELEASE",
  },
  {
    id: "edition",
    name: "Edition Release",
    quantity: "From 500 units",
    summary:
      "Built for larger merchandise releases, campaigns and multi-design collections.",
    fullDescription:
      "The Edition Release provides the flexibility to develop a broader product offer while benefiting from stronger bulk football jersey pricing.",
    shortDescription:
      "For larger campaigns, collections and multi-design releases.",
    benefits: [
      "Multiple jersey designs or colourways",
      "Broader fabric, trim and construction choices",
      "Flexible allocation across designs and sizes",
      "Custom woven labels, swing tags and packaging options",
      "Improved volume production pricing",
      "Dedicated sampling and approval schedule",
      "Enhanced production quality control",
      "Split delivery options",
      "Dedicated project management",
    ],
    bestFor:
      "Festival merchandise, creator collections, brand campaigns and established product drops.",
    ctaLabel: "START AN EDITION RELEASE",
  },
  {
    id: "major",
    name: "Major Release",
    quantity: "From 1,000 units",
    summary:
      "Advanced custom football jersey manufacturing for major events, established brands and retail-ready collections.",
    fullDescription:
      "At this level, OBRA can support deeper product development, specialist construction and more complex production requirements.",
    shortDescription:
      "For major events, established brands and retail-ready programmes.",
    benefits: [
      "Bespoke garment development",
      "Access to our extended fabric and trim library",
      "Multiple products, designs and colourways",
      "Custom fabric weights, textures and finishes",
      "Bespoke collars, ribbing and branded trims",
      "Access to custom jacquard development",
      "Custom packaging and retail labelling",
      "Reserved factory capacity",
      "Structured sampling and approval stages",
      "Multi-location delivery planning",
      "Dedicated production oversight",
    ],
    bestFor:
      "Major festivals, national campaigns, established merchandise brands and retail programmes.",
    ctaLabel: "START A MAJOR RELEASE",
  },
  {
    id: "volume",
    name: "Volume Programme",
    quantity: "From 2,500 to 10,000+ units",
    summary:
      "Large-scale football jersey production supported by dedicated planning, manufacturing and delivery infrastructure.",
    fullDescription:
      "At this level, OBRA becomes an extension of your operation. We coordinate capacity, critical paths, approvals, quality control and delivery around your wider commercial programme.",
    shortDescription:
      "For large-scale production and ongoing merchandise programmes.",
    benefits: [
      "Bespoke commercial and volume pricing",
      "Multiple products, collections and seasonal releases",
      "Custom-developed fabrics, finishes and construction",
      "Specialist jacquards, trims and embellishments",
      "Dedicated sampling and approval programme",
      "Reserved manufacturing capacity",
      "Staggered production and delivery schedules",
      "International freight coordination",
      "Multiple delivery destinations",
      "Ongoing and repeat production planning",
      "Dedicated OBRA production lead",
      "Full critical-path and quality-control management",
    ],
    bestFor:
      "Global brands, festival groups, retail collections and long-term production partnerships.",
    ctaLabel: "DISCUSS A VOLUME PROGRAMME",
  },
];

/** Brief-page-only option shown after the five real packages. */
export const unsureOption = {
  id: "unsure" as const,
  name: "Not sure yet",
  quantity: "",
  shortDescription: "Help me choose the right production route.",
};

export type VolumeOption = {
  value: string;
  label: string;
  /** Package suggested for this volume (null = no recommendation). */
  recommends: PackageId | null;
};

export const volumeOptions: VolumeOption[] = [
  { value: "50-99", label: "50–99 units", recommends: "concept" },
  { value: "100-249", label: "100–249 units", recommends: "core" },
  { value: "250-499", label: "250–499 units", recommends: "core" },
  { value: "500-999", label: "500–999 units", recommends: "edition" },
  { value: "1000-2499", label: "1,000–2,499 units", recommends: "major" },
  { value: "2500-4999", label: "2,500–4,999 units", recommends: "volume" },
  { value: "5000-9999", label: "5,000–9,999 units", recommends: "volume" },
  { value: "10000-plus", label: "10,000+ units", recommends: "volume" },
  { value: "unsure", label: "Not sure yet", recommends: null },
];

const VALID_PARAMS: readonly BriefPackageId[] = [
  "concept",
  "core",
  "edition",
  "major",
  "volume",
  "unsure",
];

/** Narrow an untrusted query value to a valid package id (or null). */
export function parsePackageParam(value: string | null | undefined): BriefPackageId | null {
  if (!value) return null;
  return VALID_PARAMS.includes(value as BriefPackageId)
    ? (value as BriefPackageId)
    : null;
}

/** Look up a package by id (excludes the brief-only "unsure" option). */
export function getPackage(id: PackageId): ReleasePackage | undefined {
  return releasePackages.find((p) => p.id === id);
}

/** The lowest volume range that maps to a given package, if any. */
export function lowestVolumeFor(id: PackageId): VolumeOption | undefined {
  return volumeOptions.find((v) => v.recommends === id);
}
