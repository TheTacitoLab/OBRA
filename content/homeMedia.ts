import { pageHref } from "@/content/site";
import { v3 } from "@/lib/media";
import type { MosaicNode } from "@/lib/mosaic";

/**
 * The homepage's image-led sections, in one place: every photograph, the
 * label set over it, where it leads, its alt text, how it is framed on
 * desktop and on phones, and how the tiles are arranged at each
 * breakpoint. Components read from here; no image URL or crop appears
 * anywhere else.
 *
 * Photographs are the V3 website set in the public Supabase bucket
 * (lib/media.ts builds the URLs): `file` is the path under the bucket's
 * madebyobra/ folder, exactly as stored ("V3 Website/agency.png"). Names
 * are case-sensitive and irregular (agency, festival, artist; hoods;
 * techpacks), so copy them from the bucket rather than guessing. A file
 * replaced under a new name must be switched here, because the old name
 * stops resolving. scripts/check-media.mjs confirms every file is public
 * and resizes whole: run `npm run check:media` after any change.
 *
 * The images are clean: labels are live text, never part of the picture.
 * Labels are lower case with a full stop, like the wordmark.
 *
 * Framing, per photograph (objectPosition / cropScale /
 * preferredAspectRatio, with mobile overrides):
 *
 * - `aspect`: the frame the photograph is best seen in, width / height
 *   (`4 / 5` is the sources' own shape). The collage is built around these
 *   (lib/mosaic.ts), so each tile is drawn at its photograph's frame
 *   rather than the photograph being forced into a fixed box. A layout can
 *   give a tile a different frame at one breakpoint ({ id, aspect }).
 * - `position`: object-position, the point kept in frame when the frame is
 *   narrower or wider than the file.
 * - `zoom`: optional tightening (1.1 = 10% closer), around `position`. It
 *   only ever zooms in: to show more of a photograph, give it a frame
 *   closer to its own shape instead (no letterboxing, no empty bars).
 * - `mobile`: the same three for phones (below 768px), where they differ.
 * - `labels`: "lime" (default) for the darker photographs, set over a low
 *   scrim; "ink" for pale ones, which need no scrim.
 * - `tint`: optional, one of the palette's soft colours laid over the
 *   photograph (multiplied, at part strength, so the picture and its
 *   filter still read). It lifts when the tile is hovered or focused.
 *
 * Layouts are trees of rows and columns of tile ids, one per breakpoint
 * (sm: phones, md: from 768px, lg: from 1024px). A row sets tiles side by
 * side at one height, a column stacks them at one width.
 */

export type Framing = { aspect?: number; position?: string; zoom?: number };

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
  mobile?: Framing;
  labels?: "lime" | "ink";
  tint?: Tint;
};

/**
 * The palette's three soft colours and stone, its warm neutral (--color-*
 * in app/globals.css).
 */
export type Tint = "clay-soft" | "blue-soft" | "lime-soft" | "stone";

export type Tile = {
  /** Also the analytics category. */
  id: string;
  label: string;
  /** A live route (checked against the app's routes), or null. */
  href: string | null;
  photo: Photo;
};

export type CollageLayout = { sm: MosaicNode; md: MosaicNode; lg: MosaicNode };

const portrait = { width: 1080, height: 1350 };

/**
 * Who for. Five photographs and five names, nothing else: the audience
 * pages do the explaining. The photographs are pale, high-key images, so
 * their labels are set in ink. Each carries a soft tint, mixed
 * so no two tiles that share an edge share a colour at any breakpoint.
 * Agencies, festivals, events and artists all touch one another at some
 * width, so they take four different colours; brands matches agencies,
 * which it only ever meets at a corner.
 */
export const whoForTiles: Tile[] = [
  {
    id: "agencies",
    label: "agencies.",
    href: pageHref("agencies"),
    photo: {
      file: v3("agency.png"),
      ...portrait,
      alt: "A designer in a cap pinning work to a studio moodboard wall",
      aspect: 1.05,
      position: "35% 30%",
      labels: "ink",
      tint: "clay-soft",
      // Tall on phones: his face and the wall he is working on.
      mobile: { aspect: 0.62, position: "38% 50%" },
    },
  },
  {
    id: "festivals",
    label: "festivals.",
    href: pageHref("festivals"),
    photo: {
      file: v3("festival.png"),
      ...portrait,
      alt: "A festival crowd with arms raised around a man in a white madebyobra T-shirt",
      aspect: 0.78,
      position: "50% 35%",
      labels: "ink",
      tint: "blue-soft",
      mobile: { aspect: 1.3, position: "50% 30%" },
    },
  },
  {
    id: "events",
    label: "events.",
    href: pageHref("events"),
    photo: {
      file: v3("events.png"),
      ...portrait,
      alt: "madebyobra event lanyards for London 2026 laid over a crowd",
      aspect: 0.9,
      position: "50% 50%",
      labels: "ink",
      tint: "lime-soft",
      mobile: { aspect: 1.3, position: "50% 45%" },
    },
  },
  {
    id: "artists",
    label: "artists.",
    href: pageHref("artists"),
    photo: {
      file: v3("artist.png"),
      ...portrait,
      alt: "A DJ in a football shirt performing at the decks",
      aspect: 4 / 5,
      // Her face in the upper third, her hands on the decks below: the
      // smoke above her head gives way to her (eyes about 43% down the
      // file). Landscape on desktop, square on tablets.
      position: "45% 56%",
      labels: "ink",
      tint: "stone",
      mobile: { aspect: 1.15, position: "45% 65%" },
    },
  },
  {
    id: "brands",
    label: "brands.",
    href: pageHref("brands"),
    photo: {
      file: v3("brands.png"),
      ...portrait,
      alt: "A model seated on a stool in a ROKOR Sport sweatshirt and a black cap",
      aspect: 4 / 5,
      // Head to the chest print in a landscape frame, with a little air
      // above the cap.
      position: "45% 4%",
      labels: "ink",
      tint: "clay-soft",
      mobile: { aspect: 1.15 },
    },
  },
];

/**
 * A lead, two portraits and a stacked pair, in one short row on desktop;
 * on phones a tall lead beside two landscapes, then a pair.
 */
export const whoForLayout: CollageLayout = {
  lg: {
    row: [
      "agencies",
      "festivals",
      "events",
      { col: [{ id: "artists", aspect: 1.5 }, { id: "brands", aspect: 1.5 }] },
    ],
  },
  md: {
    col: [
      { row: [{ id: "agencies", aspect: 1.3 }, "festivals"] },
      {
        row: [
          { id: "events", aspect: 1 },
          { id: "artists", aspect: 1 },
          { id: "brands", aspect: 1 },
        ],
      },
    ],
  },
  sm: {
    col: [
      { row: ["agencies", { col: ["festivals", "events"] }] },
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
      file: v3("retro_jerseys.png"),
      ...portrait,
      alt: "A stack of five custom retro football jerseys in different colours and patterns, each with the madebyobra wordmark",
      // Wide enough to read as a stack of several designs; anchored to the
      // top so the label sits on the lower folds.
      aspect: 1.3,
      position: "50% 0%",
      mobile: { aspect: 1.3, position: "50% 0%" },
    },
  },
  {
    id: "t-shirts",
    label: "t-shirts.",
    href: pageHref("t-shirts"),
    photo: {
      file: v3("t-shirts.png"),
      ...portrait,
      alt: "Four T-shirts stacked at the collar in black, charcoal, rust and white",
      // Tall, so all four garments stack in frame.
      aspect: 0.75,
      position: "50% 50%",
      mobile: { aspect: 0.85, position: "50% 45%" },
    },
  },
  {
    id: "hoodies",
    label: "hoodies.",
    href: pageHref("tops"),
    photo: {
      file: v3("hoods.png"),
      ...portrait,
      alt: "A rust hood surrounded by hoods in black, stone, cream and blue",
      aspect: 4 / 5,
      position: "50% 45%",
      mobile: { aspect: 0.85, position: "50% 45%" },
    },
  },
  {
    id: "tops",
    label: "tops.",
    href: pageHref("tops"),
    photo: {
      file: v3("tops.png"),
      ...portrait,
      alt: "Crewneck sweatshirts in rust, stone and black with ribbed collars",
      aspect: 1.05,
      position: "50% 50%",
      mobile: { aspect: 1.1 },
    },
  },
  {
    id: "headwear",
    label: "caps.",
    href: pageHref("headwear"),
    photo: {
      file: v3("caps.png"),
      ...portrait,
      alt: "Six-panel caps in black, stone, green, rust and blue",
      // Near square and central, so several caps and colours stay in view.
      aspect: 1.05,
      position: "50% 50%",
      mobile: { aspect: 1.1 },
    },
  },
];

/** Jerseys lead, T-shirts stand tall, hoodies over tops and caps. */
export const makeLayout: CollageLayout = {
  lg: {
    row: [
      "retro-football-shirts",
      "t-shirts",
      { col: [{ id: "hoodies", aspect: 1.5 }, { row: ["tops", "headwear"] }] },
    ],
  },
  md: {
    col: [
      { row: ["retro-football-shirts", { id: "t-shirts", aspect: 0.62 }] },
      {
        row: [
          { id: "hoodies", aspect: 1 },
          { id: "tops", aspect: 1 },
          { id: "headwear", aspect: 1 },
        ],
      },
    ],
  },
  sm: {
    col: [
      "retro-football-shirts",
      { row: ["t-shirts", "hoodies"] },
      { row: ["tops", "headwear"] },
    ],
  },
};

export const handleTiles: Tile[] = [
  {
    id: "manufacturing",
    label: "manufacturing.",
    href: "/services/#sampling-and-manufacturing",
    photo: {
      file: v3("manufacturing.png"),
      ...portrait,
      alt: "Thread cones in rust, olive and cream on an industrial sewing machine",
      // The rust cone and the machine head together.
      aspect: 0.95,
      position: "55% 55%",
      mobile: { aspect: 1.2, position: "50% 60%" },
    },
  },
  {
    id: "branding",
    label: "branding.",
    href: "/services/#branding-and-packaging",
    photo: {
      file: v3("branding.png"),
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
      file: v3("packaging.png"),
      ...portrait,
      alt: "Frosted garment bags printed with the madebyobra name",
      aspect: 1.3,
      position: "50% 40%",
      mobile: { aspect: 1 },
    },
  },
  {
    id: "logistics",
    label: "logistics.",
    href: "/services/#logistics",
    photo: {
      file: v3("logistics.png"),
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
      file: v3("techpacks.png"),
      ...portrait,
      alt: "madebyobra technical drawings of a jacket, joggers and sweatshirts",
      aspect: 0.92,
      position: "50% 40%",
      mobile: { aspect: 1 },
    },
  },
  {
    id: "e-commerce",
    label: "e-commerce.",
    href: "/services/#e-commerce",
    photo: {
      file: v3("e-commerce.png"),
      ...portrait,
      alt: "An online store page with a product grid of hoodies, T-shirts and sweatpants",
      // The product grid at the top of the page.
      aspect: 1.3,
      position: "50% 6%",
      mobile: { aspect: 1.45 },
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
      "manufacturing",
      { row: ["branding", "logistics"] },
      { row: ["packaging", "tech-packs"] },
      "e-commerce",
    ],
  },
};
