import { v3 } from "@/lib/media";

/**
 * The About page, section by section (app/about/page.tsx). Approved copy:
 * edit the words here, not in the page. The page tells one story: who we
 * are, the team, and why we created madebyobra.
 *
 * Public only: the people, where the business came from and why it cares
 * about merchandise. Nothing about ownership, pay, agreements or any other
 * internal business matter belongs on this page.
 *
 * Photography is the figurine set in the V3 Website folder of the public
 * bucket (lib/media.ts). Who is who comes from the brief and the files,
 * never from faces: Rob is Rob.jpg (the cat and the motorcycle helmet),
 * Q is the file the brief names for him (the car key and the football
 * shirts), Brad is brad.png (the cap, the bat and the iPad). Every
 * photograph is shown whole (no crop): `width` and `height` are the
 * file's own. scripts/check-media.mjs confirms each file resolves: run
 * `npm run check:media` after any change.
 */

export const aboutMeta = {
  path: "/about/",
  title: "About madebyobra | Merchandise Design & Manufacturing Studio",
  crumb: "About",
  description:
    "Meet the team behind madebyobra, a merchandise design, product development and manufacturing studio working with agencies, festivals, events, artists and brands.",
};

export type TeamPhoto = { file: string; width: number; height: number; alt: string };

/** The figurine portraits: 2:3, the whole figure on its plinth. */
const figurine = { width: 1024, height: 1536 };

export const aboutHero = {
  title: "About madebyobra.",
  mark: "madebyobra.",
  /** Leads into the statement. */
  intro: "madebyobra is a merchandise design and manufacturing studio built around a simple idea:",
  statement: "Branded merchandise should feel like an original product, not a promotional one.",
  paragraphs: [
    "We work with agencies, festivals, events, artists and brands to develop apparel and merchandise with the same attention to product, fit, fabric, construction and detail you would expect from a proper clothing collection.",
    "From the first idea through design, development, sampling and manufacturing, we stay close to every part of the process.",
    "We care about the minor details more than is probably necessary.",
    "But that is kind of the point.",
  ],
};

/** The soft black banner before the people. Anchored at #how-we-work (the
 * homepage, Services and the agency guide link there). */
export const team = {
  title: "Our team.",
  line: "Commercial. Creative. Manufacturing.",
  copy: "madebyobra works because those three things sit together.",
};

export type Person = {
  name: string;
  role: string;
  paragraphs: string[];
  /** The last line, set a step stronger. */
  closing: string;
  photo: TeamPhoto;
};

/** One full-width section each, in this order (the layout alternates). */
export const people: Person[] = [
  {
    name: "Rob",
    role: "Co-founder / Commercial Director",
    paragraphs: [
      "Rob leads the commercial side of madebyobra, working with clients from the first conversation through to the final brief.",
      "He is responsible for understanding what the project needs to achieve, who the product is for, how the collection should work commercially and making sure the creative and manufacturing teams are solving the right problem.",
      "His role is to keep the original idea clear all the way through the process.",
      "Not just get something made.",
    ],
    closing: "Get the right thing made.",
    photo: {
      file: v3("Rob.jpg"),
      ...figurine,
      alt: "Rob as a figurine on a grass plinth, holding a black and white cat and an open-face motorcycle helmet",
    },
  },
  {
    name: "Q",
    role: "Co-founder / Operations Director",
    paragraphs: [
      "Q leads manufacturing, sourcing and production.",
      "He works directly with our factory network on materials, construction, costing, feasibility, quality control and delivery.",
      "His experience means design decisions are considered alongside how the product will actually be made, rather than discovering problems after the artwork has been signed off.",
      "That matters because a good product is not just a good visual.",
    ],
    closing: "It has to feel right in your hands too.",
    photo: {
      // The file the brief names for Q, exactly as stored.
      file: v3("file_00000000bc08821087dc3bb02f4180f1.jpg"),
      ...figurine,
      alt: "Q as a figurine on a grass plinth, holding out a car key with a stack of football shirts over his other arm",
    },
  },
  {
    name: "Brad",
    role: "Creative Director",
    paragraphs: [
      "Brad leads creative direction and product design across our key projects and bespoke collections.",
      "His work covers garment concepts, graphics, colour, fit, trims, artwork and the small details that give a product its own identity.",
      // General wording only: no brand names unless Brad confirms them.
      "He brings experience from some of the world’s most recognised fashion and sportswear brands into madebyobra, helping us approach merchandise as product design rather than decoration.",
      "His job is to make sure the finished product feels like it could only belong to that brand, artist, festival or event.",
    ],
    closing: "That distinction is central to how we work.",
    photo: {
      // The file is named in lower case, unlike the others.
      file: v3("brad.png"),
      ...figurine,
      alt: "Brad as a figurine on a grass plinth in a cap, with a bat on his shoulder and an iPad and pencil under his arm",
    },
  },
];

/** The story after the team: one section, the copy exactly as approved. */
export const why = {
  title: "Why we created madebyobra.",
  paragraphs: [
    "madebyobra came from running two sports apparel brands and then working closely with a designer who had already created product for some of the biggest teams, events, festivals and brands. Between us, we understood the commercial side, the creative side and the manufacturing side and we kept coming back to the same thought: merchandise could be so much better than it usually was.",
    "Too often, it felt like the thing that got dealt with at the end. The campaign, event or brand experience had all the thought and energy put into it, then the merchandise was treated as something that simply needed to exist. We never really understood that because it is often one of the only physical things people actually take away with them.",
    "That is why we are building madebyobra around the idea of designing by collection, not just by product. We want a merch collection to feel more like the drop of a fashion brand, where the fit, fabric, colour, trims, labels, packaging and presentation have all been thought about together. The point is not just to make something that looks good but to create a product and retail experience that feels authentic to the audience and relevant to the culture around it.",
    "We care about the small details because they are normally what make the difference. If we can create something people genuinely want to buy, wear and keep and it still reminds them of the moment, place or experience it came from years later, then we have done what we set out to do.",
  ],
};

export const closing = {
  line: "Original merchandise for agencies, festivals, events, artists and brands.",
  /**
   * GROUP_PHOTO_TO_CONFIRM: the group photograph of Rob, Q and Brad, as a
   * TeamPhoto (its V3 Website filename exactly as stored, its pixel size
   * and alt text), once the filename is confirmed. Shown whole above the
   * closing line; left null, the page closes on the line alone.
   */
  photo: null as TeamPhoto | null,
};
