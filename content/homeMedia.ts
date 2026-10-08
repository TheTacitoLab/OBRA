import { findAudience, pageHref } from "@/content/site";

/**
 * The homepage's image-led sections, in one place: every photograph, the
 * label set over it, where it leads, its alt text and its crop. Components
 * read from here; no image URL appears anywhere else.
 *
 * Photographs are in the public Supabase bucket (lib/media.ts builds the
 * URLs). `file` is the filename exactly as it is in the bucket's
 * madebyobra/ folder: the names are case-sensitive and do not follow one
 * pattern (retro_jerseys.png, t-shirts.png, techpacks.png), so copy them
 * from the bucket rather than guessing. scripts/check-media.mjs confirms
 * every file here is publicly reachable: run `npm run check:media` after
 * adding one.
 *
 * The images are clean: labels are live text, never part of the picture.
 * Labels are lower case with a full stop, like the wordmark.
 *
 * `area` is the tile's slot in that section's collage (.collage--* in
 * app/globals.css, one grid template per breakpoint). Adding a tile means
 * giving it a slot there too.
 *
 * `position` is the object-position of the crop: tiles change shape from
 * phone to desktop, so it keeps each photograph's subject in frame.
 *
 * `sizes` is how wide the tile renders at each breakpoint, so the browser
 * fetches a suitable width rather than the full-size file.
 */

export type Photo = {
  file: string;
  /** Pixel size of the file in the bucket. */
  width: number;
  height: number;
  /** What the photograph shows, plainly. Not a keyword list. */
  alt: string;
  position: string;
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
  area: string;
  sizes: string;
};

const portrait = { width: 1080, height: 1350 };

/** An audience's one-line description, as on the Who for page. */
const audienceIntro = (slug: string) => findAudience(slug)?.intro;

/**
 * Who for. No audience photography has been supplied yet, so each
 * audience is a block of the washed brand palette with its label and its
 * one-line description; give a tile a `photo` and it becomes a photograph
 * with a lime label.
 */
export const whoForTiles: Tile[] = [
  {
    id: "agencies",
    label: "agencies.",
    intro: audienceIntro("agencies"),
    href: pageHref("agencies"),
    photo: null,
    tone: "stone",
    area: "a",
    sizes: "(min-width: 1024px) 56vw, 100vw",
  },
  {
    id: "festivals",
    label: "festivals.",
    intro: audienceIntro("festivals"),
    href: pageHref("festivals"),
    photo: null,
    tone: "clay-soft",
    area: "b",
    sizes: "(min-width: 1024px) 40vw, 50vw",
  },
  {
    id: "events",
    label: "events.",
    intro: audienceIntro("events"),
    href: pageHref("events"),
    photo: null,
    tone: "blue-soft",
    area: "c",
    sizes: "(min-width: 1024px) 24vw, 50vw",
  },
  {
    id: "artists",
    label: "artists.",
    intro: audienceIntro("artists"),
    href: pageHref("artists"),
    photo: null,
    tone: "lime-soft",
    area: "d",
    sizes: "(min-width: 1024px) 32vw, 50vw",
  },
  {
    id: "brands",
    label: "brands.",
    intro: audienceIntro("brands"),
    href: pageHref("brands"),
    photo: null,
    tone: "bone",
    area: "e",
    sizes: "100vw",
  },
];

/**
 * What we make. Only categories with real photography are shown: hoodies
 * and accessories join when their images are in the bucket (hoodies would
 * lead to /tops/, accessories to /accessories/).
 */
export const makeTiles: Tile[] = [
  {
    id: "retro-football-shirts",
    label: "retro jerseys.",
    href: pageHref("retro-football-shirts"),
    photo: {
      file: "retro_jerseys.png",
      ...portrait,
      alt: "Custom retro football jersey fabrics developed by madebyobra",
      position: "50% 50%",
    },
    area: "j",
    sizes: "(min-width: 1024px) 48vw, (min-width: 768px) 64vw, 100vw",
  },
  {
    id: "t-shirts",
    label: "t-shirts.",
    href: pageHref("t-shirts"),
    photo: {
      file: "t-shirts.png",
      ...portrait,
      alt: "Heavyweight T-shirt collars in black, charcoal, rust and grey",
      position: "50% 45%",
    },
    area: "t",
    sizes: "(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 50vw",
  },
  {
    id: "tops",
    label: "tops.",
    href: pageHref("tops"),
    photo: {
      file: "tops.png",
      ...portrait,
      alt: "Crewneck sweatshirts in rust, stone and black with ribbed collars",
      position: "50% 50%",
    },
    area: "o",
    sizes: "(min-width: 1024px) 24vw, 50vw",
  },
  {
    id: "headwear",
    label: "caps.",
    href: pageHref("headwear"),
    photo: {
      file: "caps.png",
      ...portrait,
      alt: "Six-panel caps in black, stone, green, rust and blue",
      position: "40% 35%",
    },
    area: "c",
    sizes: "(min-width: 1024px) 24vw, 50vw",
  },
];

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
      file: "manufacturing.png",
      ...portrait,
      alt: "A machinist sewing a garment on a factory production line",
      position: "55% 40%",
    },
    area: "m",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "branding",
    label: "branding.",
    href: "/services/#branding-and-packaging",
    photo: {
      file: "branding.png",
      ...portrait,
      alt: "A madebyobra swing tag and orange embroidered logo on a white garment",
      // The letterpress swing tag sits in the top half.
      position: "40% 0%",
    },
    area: "b",
    sizes: "(min-width: 1024px) 34vw, 50vw",
  },
  {
    id: "packaging",
    label: "packaging.",
    href: "/services/#branding-and-packaging",
    photo: {
      file: "packaging.png",
      ...portrait,
      alt: "Frosted garment bags printed with the madebyobra name",
      position: "50% 50%",
    },
    area: "p",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
  },
  {
    id: "logistics",
    label: "logistics.",
    href: "/services/#logistics",
    photo: {
      file: "logistics.png",
      ...portrait,
      alt: "Sealing a green shipping box with madebyobra printed tape",
      position: "50% 45%",
    },
    area: "l",
    sizes: "(min-width: 1024px) 34vw, 50vw",
  },
  {
    id: "tech-packs",
    label: "tech packs.",
    href: "/services/#product-development",
    photo: {
      file: "techpacks.png",
      ...portrait,
      alt: "madebyobra technical drawings of a jacket, joggers and sweatshirts",
      position: "50% 40%",
    },
    area: "k",
    sizes: "(min-width: 1024px) 58vw, (min-width: 768px) 66vw, 50vw",
  },
  {
    id: "e-commerce",
    label: "e-commerce.",
    href: "/services/#e-commerce",
    photo: {
      file: "e-commerce.png",
      ...portrait,
      alt: "An online store page showing a collection of hoodies, T-shirts and sweatpants",
      position: "50% 18%",
    },
    area: "e",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 66vw, 100vw",
  },
];
