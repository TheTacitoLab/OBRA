import { findAudience, pageHref } from "@/content/site";
import type { MosaicNode } from "@/lib/mosaic";

/**
 * The homepage's image-led sections, in one place: every photograph, the
 * label set over it, where it leads, its alt text, how it is framed, and
 * how the tiles are arranged at each breakpoint. Components read from
 * here; no image URL or crop appears anywhere else.
 *
 * Photographs are in the public Supabase bucket (lib/media.ts builds the
 * URLs). `file` is the filename exactly as it is in the bucket's
 * madebyobra/ folder: the names are case-sensitive and do not follow one
 * pattern (retro_jerseys (1).png, t-shirts.png, techpacks.png, hoods.png),
 * so copy them from the bucket rather than guessing. A replacement
 * uploaded under a new name (Supabase adds " (1)") must be switched here:
 * the old name stops resolving. scripts/check-media.mjs confirms every file
 * here is publicly reachable: run `npm run check:media` after a change.
 *
 * The images are clean: labels are live text, never part of the picture.
 * Labels are lower case with a full stop, like the wordmark.
 *
 * Framing, per photograph (the brief's objectPosition / cropScale /
 * preferredAspectRatio):
 *
 * - `aspect`: the frame the photograph is best seen in, width / height
 *   (`4 / 5` is the sources' own shape; `6 / 5` a little wider). The
 *   collage is built around these (lib/mosaic.ts), so a tile is drawn at
 *   its photograph's aspect rather than the photograph being forced into
 *   a fixed box. A layout can give a tile a different frame at one
 *   breakpoint ({ id, aspect }) where the composition needs it.
 * - `position`: object-position, the point kept in frame when the frame is
 *   narrower or wider than the file.
 * - `zoom`: optional tightening (1.1 = 10% closer), around `position`. It
 *   only ever zooms in: to show more of a photograph, give it a frame
 *   closer to its own shape instead (no letterboxing, no empty bars).
 *
 * Layouts are trees of rows and columns of tile ids, one per breakpoint
 * (sm: phones, md: from 768px, lg: from 1024px). A row sets tiles side by
 * side at one height, a column stacks them at one width.
 */

export type Photo = {
  file: string;
  /** Pixel size of the file in the bucket. */
  width: number;
  height: number;
  /** What the photograph shows, plainly. Not a keyword list. */
  alt: string;
  aspect: number;
  position: string;
  zoom?: number;
};

/** Panel colour for a tile without a photograph (a [data-tone] value). */
export type TileTone = "stone" | "bone" | "clay-soft" | "blue-soft" | "lime-soft";

export type Tile = {
  /** Also the analytics category. */
  id: string;
  label: string;
  /** One line in the panel's upper left, shown while `photo` is null. */
  intro?: string;
  /** A live route (checked against the app's routes), or null. */
  href: string | null;
  photo: Photo | null;
  /** Shown while `photo` is null. */
  tone?: TileTone;
  /** The panel's frame while `photo` is null (a photograph brings its own). */
  aspect?: number;
};

export type CollageLayout = { sm: MosaicNode; md: MosaicNode; lg: MosaicNode };

const portrait = { width: 1080, height: 1350 };

/** An audience's one-line description, as on the Who for page. */
const audienceIntro = (slug: string) => findAudience(slug)?.intro;

/**
 * Who for. No audience photography has been supplied yet, so each
 * audience is a block of the washed brand palette with its label and its
 * one-line description; give a tile a `photo` and it becomes a photograph
 * with a lime label. The frames are portrait-leaning so people, hands and
 * scenes will sit in them without heavy cropping.
 */
export const whoForTiles: Tile[] = [
  {
    id: "agencies",
    label: "agencies.",
    intro: audienceIntro("agencies"),
    href: pageHref("agencies"),
    photo: null,
    tone: "stone",
    aspect: 1,
  },
  {
    id: "festivals",
    label: "festivals.",
    intro: audienceIntro("festivals"),
    href: pageHref("festivals"),
    photo: null,
    tone: "clay-soft",
    aspect: 3 / 4,
  },
  {
    id: "events",
    label: "events.",
    intro: audienceIntro("events"),
    href: pageHref("events"),
    photo: null,
    tone: "blue-soft",
    aspect: 3 / 4,
  },
  {
    id: "artists",
    label: "artists.",
    intro: audienceIntro("artists"),
    href: pageHref("artists"),
    photo: null,
    tone: "lime-soft",
    aspect: 1,
  },
  {
    id: "brands",
    label: "brands.",
    intro: audienceIntro("brands"),
    href: pageHref("brands"),
    photo: null,
    tone: "bone",
    aspect: 1,
  },
];

/** A lead, two tall frames and a stacked pair: one quick row. */
export const whoForLayout: CollageLayout = {
  lg: { row: ["agencies", "festivals", "events", { col: ["artists", "brands"] }] },
  md: {
    col: [
      { row: [{ id: "agencies", aspect: 1.3 }, "festivals"] },
      { row: [{ id: "events", aspect: 1 }, "artists", "brands"] },
    ],
  },
  sm: {
    col: [
      { id: "agencies", aspect: 1.35 },
      { row: [{ id: "festivals", aspect: 0.85 }, { id: "events", aspect: 0.85 }] },
      { row: ["artists", "brands"] },
    ],
  },
};

/**
 * What we make. Only categories with real photography are shown;
 * accessories joins when its image is in the bucket. Hoodies lead to the
 * tops page, which covers hoodies and sweatshirts.
 */
export const makeTiles: Tile[] = [
  {
    id: "retro-football-shirts",
    label: "retro jerseys.",
    href: pageHref("retro-football-shirts"),
    photo: {
      file: "retro_jerseys (1).png",
      ...portrait,
      alt: "A stack of five custom retro football jerseys in different colours and patterns, each with the madebyobra wordmark",
      // Wide enough to read as a stack of four designs; anchored to the
      // top so the label sits on the yellow and purple folds, clear of the
      // printed wordmarks.
      aspect: 6 / 5,
      position: "50% 0%",
    },
  },
  {
    id: "t-shirts",
    label: "t-shirts.",
    href: pageHref("t-shirts"),
    photo: {
      file: "t-shirts.png",
      ...portrait,
      alt: "Heavyweight T-shirt collars in black, charcoal, rust and grey",
      // Tall, so all four collars stack in frame.
      aspect: 18 / 25,
      position: "50% 50%",
    },
  },
  {
    id: "hoodies",
    label: "hoodies.",
    href: pageHref("tops"),
    photo: {
      file: "hoods.png",
      ...portrait,
      alt: "A rust hood surrounded by hoods in black, stone, cream and blue",
      aspect: 4 / 5,
      position: "50% 42%",
    },
  },
  {
    id: "tops",
    label: "tops.",
    href: pageHref("tops"),
    photo: {
      file: "tops.png",
      ...portrait,
      alt: "Crewneck sweatshirts in rust, stone and black with ribbed collars",
      aspect: 1,
      position: "50% 50%",
    },
  },
  {
    id: "headwear",
    label: "caps.",
    href: pageHref("headwear"),
    photo: {
      file: "caps.png",
      ...portrait,
      alt: "Six-panel caps in black, stone, green, rust and blue",
      // Square and central, so several caps and colours stay in view.
      aspect: 1,
      position: "50% 50%",
    },
  },
];

/** Jerseys lead, T-shirts stand tall, hoodies over tops and caps. */
export const makeLayout: CollageLayout = {
  lg: {
    row: [
      "retro-football-shirts",
      "t-shirts",
      { col: [{ id: "hoodies", aspect: 1.4 }, { row: ["tops", "headwear"] }] },
    ],
  },
  md: {
    col: [
      { row: ["retro-football-shirts", { id: "t-shirts", aspect: 0.62 }] },
      { row: [{ id: "hoodies", aspect: 1 }, "tops", "headwear"] },
    ],
  },
  sm: {
    col: [
      { id: "retro-football-shirts", aspect: 1.15 },
      { row: ["t-shirts", "hoodies"] },
      { row: ["tops", "headwear"] },
    ],
  },
};

/**
 * What we handle. Each leads to its row on the services page (the rows
 * carry the service slugs as ids); branding and packaging share one.
 */
export const handleTiles: Tile[] = [
  {
    id: "manufacturing",
    label: "manufacturing.",
    href: "/services/#sampling-and-manufacturing",
    photo: {
      file: "manufacturing (1).png",
      ...portrait,
      alt: "Thread cones in rust, olive and cream on an industrial sewing machine",
      // The rust cone and the machine head together.
      aspect: 0.95,
      position: "55% 55%",
    },
  },
  {
    id: "branding",
    label: "branding.",
    href: "/services/#branding-and-packaging",
    photo: {
      file: "branding.png",
      ...portrait,
      alt: "A madebyobra swing tag and orange embroidered logo on a white garment",
      // Near full frame: the swing tag above, the embroidery below.
      aspect: 0.92,
      position: "40% 30%",
    },
  },
  {
    id: "packaging",
    label: "packaging.",
    href: "/services/#branding-and-packaging",
    photo: {
      file: "packaging.png",
      ...portrait,
      alt: "Frosted garment bags printed with the madebyobra name",
      aspect: 1.3,
      position: "50% 40%",
    },
  },
  {
    id: "logistics",
    label: "logistics.",
    href: "/services/#logistics",
    photo: {
      file: "logistics.png",
      ...portrait,
      alt: "Sealing a green shipping box with madebyobra printed tape",
      aspect: 0.92,
      position: "50% 45%",
    },
  },
  {
    id: "tech-packs",
    label: "tech packs.",
    href: "/services/#product-development",
    photo: {
      file: "techpacks.png",
      ...portrait,
      alt: "madebyobra technical drawings of a jacket, joggers and sweatshirts",
      aspect: 0.92,
      position: "50% 40%",
    },
  },
  {
    id: "e-commerce",
    label: "e-commerce.",
    href: "/services/#e-commerce",
    photo: {
      file: "e-commerce.png",
      ...portrait,
      alt: "An online store page showing a collection of hoodies, T-shirts and sweatpants",
      // The hanging garments at the top of the page, not the price grid.
      aspect: 1.3,
      position: "50% 8%",
    },
  },
];

/** Manufacturing leads; two landscape frames over three near-square. */
export const handleLayout: CollageLayout = {
  lg: {
    row: [
      "manufacturing",
      {
        col: [
          { row: ["e-commerce", "packaging"] },
          { row: ["branding", "logistics", "tech-packs"] },
        ],
      },
    ],
  },
  md: {
    col: [
      {
        row: [
          { id: "manufacturing", aspect: 0.8 },
          {
            col: [
              { id: "e-commerce", aspect: 1.55 },
              { id: "packaging", aspect: 1.55 },
            ],
          },
        ],
      },
      {
        row: [
          { id: "branding", aspect: 1 },
          { id: "logistics", aspect: 1 },
          { id: "tech-packs", aspect: 1 },
        ],
      },
    ],
  },
  sm: {
    col: [
      { id: "manufacturing", aspect: 1.2 },
      { row: ["branding", "logistics"] },
      { row: [{ id: "packaging", aspect: 1 }, { id: "tech-packs", aspect: 1 }] },
      { id: "e-commerce", aspect: 1.45 },
    ],
  },
};
