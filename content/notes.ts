/**
 * Notes: the editorial index. Projects, product development, merchandise
 * observations, manufacturing insight, launches and the occasional opinion.
 *
 * The three entries below are EXAMPLE notes written to establish the page
 * structure, tone and length. Replace them with real pieces before launch.
 * Dates are ISO strings; newest first is handled by `notesByDate`.
 *
 * Planned agency pieces (cluster "agencies"; each links into /agencies/
 * and, where relevant, /services/, product pages and, once built,
 * /pricing/ and /how-we-work/):
 *   1. How to brief a merchandise manufacturer: an agency production checklist
 *   2. How long does custom merchandise take? A realistic production timeline
 *   3. How much does custom merchandise cost? What agencies should expect in
 *      a production quote
 *   4. Custom merchandise minimum orders explained: what MOQ actually applies to
 *   5. White-label merchandise production: how agencies can outsource
 *      production without losing the client relationship
 * Publish each with a real author, `cluster: "agencies"` and `toc: true`
 * when it runs long.
 */

export type NoteCategory =
  | "Product development"
  | "Manufacturing"
  | "Merchandise"
  | "Projects"
  | "Events"
  | "Launches"
  | "Opinion";

/**
 * Body blocks. Text may carry inline links written as [label](/path/), for
 * contextual links into the commercial pages (/agencies/, /services/, a
 * product page); `p` and list items render them, headings do not.
 */
export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "ul"; items: string[] };

/** A real, named person. Never a placeholder or a pen name. */
export type NoteAuthor = { name: string; role: string; url?: string };

/**
 * Topic clusters: a note in a cluster ends with a link to that cluster's
 * commercial page, and that page lists the cluster's notes.
 */
export const noteClusters = {
  agencies: {
    href: "/agencies/",
    heading: "Producing merchandise for a client?",
    text: "How we work with agencies: quantities, pricing, sampling, deadlines and white-label production, in one guide.",
    label: "Custom merchandise for agencies",
  },
} as const;

export type NoteCluster = keyof typeof noteClusters;

export type Note = {
  slug: string;
  title: string;
  standfirst: string;
  /** ISO date first published, e.g. "2026-09-10". */
  date: string;
  /**
   * ISO date of the last substantive edit, shown as "Updated" and used for
   * dateModified and the sitemap. Leave unset rather than moving it for a
   * typo fix.
   */
  updated?: string;
  /** Leave unset and the studio is credited; never invent a byline. */
  author?: NoteAuthor;
  category: NoteCategory;
  body: NoteBlock[];
  /**
   * Lead and share image from public/, at its own pixel size; alt says
   * what is visible. The wordmark card is used when unset.
   */
  image?: { src: string; width: number; height: number; alt: string };
  /** Show an "On this page" list built from the h2s (long pieces only). */
  toc?: boolean;
  /** Slugs of related notes, most relevant first; the latest otherwise. */
  related?: string[];
  cluster?: NoteCluster;
};

export const notes: Note[] = [
  {
    slug: "blanks-are-not-product",
    title: "Blanks are not product",
    standfirst:
      "Why every product we make starts from a base that already works, and what that frees up for the brand.",
    date: "2026-09-10",
    category: "Product development",
    body: [
      {
        type: "p",
        text: "A blank is a finished product waiting for a logo. A base is a pattern, a fit and a construction that have been through production before, that we know how to cost, sample and scale. It is the difference between decorating and developing.",
      },
      {
        type: "p",
        text: "Starting from a base that has already run takes the risk out of the parts of a product nobody thanks you for: the fit that runs true across sizes, the neckline that holds its shape, the seam that survives the fortieth wash. Those problems are solved before the brief arrives.",
      },
      {
        type: "h2",
        text: "Where the freedom goes",
      },
      {
        type: "p",
        text: "With the foundations settled, the development budget goes where it is visible: fabric, colour, trims, labels, the way the product is packed and presented. A tee that is developed rather than decorated has its own tag, its own label and its own feel in the hand. Nobody has to be told it is bespoke.",
      },
      {
        type: "p",
        text: "It also changes what a first order can be. A base that has already run at volume prices the same way whether the first run is two hundred pieces or two thousand, so the range can start small without looking small.",
      },
    ],
  },
  {
    slug: "costing-a-collection",
    title: "Costing a collection: hero, entry and margin",
    standfirst:
      "A range works commercially when every piece has a job. Here is how we balance the three that matter.",
    date: "2026-08-22",
    category: "Merchandise",
    body: [
      {
        type: "p",
        text: "The mistake most ranges make is treating every product the same way: same margin target, same quantity, same place on the rail. A collection is a structure, and each piece in it should be doing something the others are not.",
      },
      {
        type: "h2",
        text: "Three jobs",
      },
      {
        type: "p",
        text: "The hero piece is the one people photograph. It carries the identity, it can cost more to make and it can sell at a price that reflects that. The entry piece is the one everybody can afford, and it moves in volume. The margin piece looks premium, costs less to produce than it appears to, and quietly pays for the rest.",
      },
      {
        type: "p",
        text: "Quantities follow from those jobs, not from a gut feel about what will sell. We forecast the entry piece deepest, the hero piece with the most sizes protected, and the margin piece with the cleanest replenishment path.",
      },
      {
        type: "p",
        text: "Bundles, price ladders and the order on the rail all come out of the same plan. When the structure is right, the creative work has somewhere commercial to land.",
      },
    ],
  },
  {
    slug: "what-actually-sells-on-site",
    title: "What actually sells on site",
    standfirst:
      "Notes from a season of festival retail: the products that moved, the ones that did not, and why the difference was rarely the design.",
    date: "2026-07-30",
    category: "Events",
    body: [
      {
        type: "p",
        text: "Festival retail is a short window with long queues. The products that do well are the ones that fit that reality: easy to find in the size you need, easy to carry, easy to wear the same day. Design matters, but only after those three.",
      },
      {
        type: "p",
        text: "The shirt that sold out by Saturday afternoon was not the most elaborate one on the stand. It was the one that was clearly the year’s shirt, in a colour that read from twenty metres, with the size split forecast against last year’s data instead of a spreadsheet default.",
      },
      {
        type: "h2",
        text: "Where stock goes wrong",
      },
      {
        type: "p",
        text: "Most lost sales on site are operational. Stock in the wrong tent, sizes split evenly when the crowd is not, staff who cannot find the restock. Merch planning, point-of-sale support and the boring work of labelling boxes properly are worth more than another colourway.",
      },
      {
        type: "p",
        text: "We now plan the stand alongside the range: what goes where, what gets restocked from where, and what the team on the day needs printed on the box to make it work.",
      },
    ],
  },
];

export const notesByDate = () =>
  [...notes].sort((a, b) => (a.date < b.date ? 1 : -1));

export const findNote = (slug: string) =>
  notes.find((note) => note.slug === slug);

export const noteHref = (slug: string) => `/notes/${slug}/`;

/** Newest first. */
export const notesInCluster = (cluster: NoteCluster) =>
  notesByDate().filter((note) => note.cluster === cluster);

/** Up to three notes to read next: the chosen ones, then the latest. */
export function relatedNotes(note: Note) {
  const chosen = (note.related ?? [])
    .map(findNote)
    .filter((entry): entry is Note => Boolean(entry));
  const rest = notesByDate().filter(
    (entry) => entry.slug !== note.slug && !chosen.includes(entry),
  );
  return [...chosen, ...rest].slice(0, 3);
}

/** Anchor id for an h2, stable across edits unless the heading changes. */
export const headingId = (block: { text: string; id?: string }) =>
  block.id ??
  block.text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function formatNoteDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
