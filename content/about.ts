import { v3 } from "@/lib/media";

/**
 * The About page, section by section (app/about/page.tsx). Approved copy:
 * edit the words here, not in the page.
 *
 * Public only: what the studio believes, the people and how they work.
 * Nothing about ownership, pay, agreements or any other internal business
 * matter belongs on this page.
 *
 * Photography is the figurine set in the V3 Website folder of the public
 * bucket (lib/media.ts), named by person. Who is who comes from the
 * filenames and what each figurine holds, never from faces: Rob holds the
 * cat and the motorcycle helmet, Q the burger and the football shirts,
 * Brad wears the cap and carries the bat and the iPad. Every photograph is
 * shown whole (no crop): `width` and `height` are the file's own.
 * scripts/check-media.mjs confirms each file resolves: run
 * `npm run check:media` after any change.
 */

export const aboutMeta = {
  path: "/about/",
  title: "About madebyobra | Merchandise Design & Manufacturing Studio",
  crumb: "About",
  description:
    "Meet the team behind madebyobra, a British merchandise design, product development and manufacturing studio working with agencies, festivals, events, artists and brands.",
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
      file: v3("Q.jpg"),
      ...figurine,
      alt: "Q as a figurine on a grass plinth, holding a burger in one hand and a stack of football shirts in the other",
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

export const connected = {
  title: "It works because the three parts are connected.",
  stages: [
    "A lot of merchandise is created in stages.",
    "The creative team designs something.",
    "The supplier tries to make it.",
    "The factory compromises it.",
    "And somewhere along the way the original idea gets diluted.",
  ],
  approach: [
    "We try to avoid that.",
    "Commercial, creative and manufacturing are considered together from the start.",
  ],
  /** Who does what, set one per line. */
  roles: [
    "Rob understands the brief and the audience.",
    "Brad develops the product and protects the creative intent.",
    "Q makes sure it can be manufactured properly.",
  ],
  after: [
    "That means decisions about fabric, fit, construction, colour, branding, trims and finish are made deliberately rather than left until the end.",
    "The result should feel considered from every angle.",
  ],
  /** Set a step stronger, one per line. */
  closing: [
    "Not promotional.",
    "Not generic.",
    "Not like something that already existed before the logo went on it.",
  ],
};

export const original = {
  /** Two lines: the statement. */
  title: ["Original product.", "Not promotional product."],
  paragraphs: [
    "This is probably the clearest way to describe what we care about.",
    "We want branded merchandise to feel original.",
    "That means thinking about the silhouette, the fabric, the weight, the fit, the collar, the trim, the branding method, the labels, the packaging and the way the whole collection works together.",
    "None of those decisions are particularly exciting on their own.",
    "Together, they are the difference between a product people want and something that feels like a giveaway.",
    "We are meticulous about that distinction.",
  ],
};

/** Anchored at #how-we-work: the homepage, Services and the agency guide link here. */
export const process = {
  title: "From idea to finished product.",
  paragraphs: [
    "Some clients come to us with a finished creative direction.",
    "Some have a rough idea.",
    "Some just know they want to make something genuinely good.",
    "We can work from any of those starting points.",
    "Our role is to help turn the idea into a properly developed product, then manage sampling, refinement, manufacturing, quality control, packaging and delivery.",
    "We stay involved because the small decisions made during production are often the ones that determine whether the final product feels right.",
  ],
};

export const closing = {
  title: ["Commercial.", "Creative.", "Manufacturing."],
  line: "Three different parts of the same process.",
  /**
   * GROUP_PHOTO_TO_CONFIRM: the group photograph of Rob, Q and Brad, as a
   * TeamPhoto (its V3 Website filename exactly as stored, its pixel size
   * and alt text), once the filename is confirmed. Shown whole above the
   * closing words; left null, the section closes on the words alone.
   */
  photo: null as TeamPhoto | null,
};
