/**
 * Notes: the editorial index. Projects, product development, merchandise
 * observations, manufacturing insight, launches and the occasional opinion.
 *
 * The three entries below are EXAMPLE notes written to establish the page
 * structure, tone and length. Replace them with real pieces before launch.
 * Dates are ISO strings; newest first is handled by `notesByDate`.
 */

export type NoteCategory =
  | "Product development"
  | "Manufacturing"
  | "Merchandise"
  | "Projects"
  | "Events"
  | "Launches"
  | "Opinion";

export type NoteBlock = { type: "p" | "h2"; text: string };

export type Note = {
  slug: string;
  title: string;
  standfirst: string;
  /** ISO date, e.g. "2026-09-10". */
  date: string;
  category: NoteCategory;
  body: NoteBlock[];
};

export const notes: Note[] = [
  {
    slug: "proven-blocks-beat-blanks",
    title: "Proven blocks beat blanks",
    standfirst:
      "Why every product we make starts from a block that already works, and what that frees up for the brand.",
    date: "2026-09-10",
    category: "Product development",
    body: [
      {
        type: "p",
        text: "A blank is a finished product waiting for a logo. A block is a pattern, a fit and a construction that have been through production before, that we know how to cost, sample and scale. It is the difference between decorating and developing.",
      },
      {
        type: "p",
        text: "Starting from a proven block takes the risk out of the parts of a product nobody thanks you for: the fit that runs true across sizes, the neckline that holds its shape, the seam that survives the fortieth wash. Those problems are solved before the brief arrives.",
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
        text: "It also changes what a first order can be. A block that has already run at volume prices the same way whether the first run is two hundred pieces or two thousand, so the range can start small without looking small.",
      },
    ],
  },
  {
    slug: "costing-a-collection",
    title: "Costing a collection: hero, entry, margin",
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
        text: "The shirt that sold out by Saturday afternoon was not the most elaborate one on the stand. It was the one that was clearly the year's shirt, in a colour that read from twenty metres, with the size split forecast against last year's data instead of a spreadsheet default.",
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

export function formatNoteDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
