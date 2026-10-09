/**
 * The About page, section by section (app/about/page.tsx). Approved copy:
 * edit the words here, not in the page. Lines in a `sequence` are set one
 * per line, typographically, never as cards.
 *
 * Public only: origin, people, expertise and how the team works. Nothing
 * about ownership, pay, agreements or any other internal business matter
 * belongs on this page.
 */

export const aboutMeta = {
  path: "/about/",
  title: "About madebyobra | Merchandise Design & Manufacturing Studio",
  crumb: "About",
  description:
    "Meet the team behind madebyobra, a British merchandise design, product development and manufacturing studio working with agencies, festivals, events, artists and brands.",
};

export const aboutHero = {
  title: "About madebyobra.",
  mark: "madebyobra.",
  lede: "We started with retro football shirts and accidentally built a merchandise studio.",
  body: [
    "What began as a fairly simple idea has grown into a full-service design, product development and manufacturing business working across agencies, festivals, events, artists and brands.",
    "That escalation is mostly our own fault.",
  ],
};

export const origin = {
  title: "It started with a football shirt.",
  paragraphs: [
    "madebyobra started when Rob spotted an opportunity to develop bespoke retro football jerseys for festivals and events.",
    "He called Q, who knew how to actually make them properly.",
    "What started as football shirts fairly quickly became T-shirts, hoodies, headwear, sportswear, packaging, full merchandise collections and the increasingly dangerous belief that we could probably make almost anything if the brief was good enough.",
    "The original idea was simple: merchandise should feel like a proper product, not something picked from a catalogue because somebody remembered the event needed a T-shirt.",
    "That bit hasn’t changed.",
  ],
};

export const growth = {
  title: "Then people started asking for more stuff.",
  before: [
    "The more projects we worked on, the more obvious it became that the interesting part wasn’t just making one product.",
    "It was building the whole thing properly.",
  ],
  sequence: [
    "The product.",
    "The fit.",
    "The fabric.",
    "The artwork.",
    "The trims.",
    "The packaging.",
    "The way it arrives.",
  ],
  after: [
    "So madebyobra grew from a specialist retro jersey idea into a broader merchandise design and manufacturing studio.",
    "We now work across apparel, sportswear, headwear and accessories, helping clients develop individual hero products and complete collections from concept through to production and delivery.",
  ],
};

export type Person = {
  name: string;
  role: string;
  paragraphs: string[];
  /**
   * Brands a person has designed for, set as "His previous work includes
   * design for A, B, C and D." Only names confirmed by the person
   * themselves: never guessed. Null keeps the sentence off the page.
   */
  brands?: string[] | null;
  /** Follows the brands sentence (or the paragraphs, without one). */
  afterBrands?: string[];
  short: string;
  /**
   * A portrait from the public bucket, when there is one. The layout
   * keeps a 4:5 frame above the name for it; until then the name leads.
   */
  photo?: { file: string; alt: string; position?: string } | null;
};

export const team = {
  title: "Three people. Three different parts of the problem.",
  lede: "Commercial. Creative. Manufacturing.",
  aside: "That’s basically the arrangement.",
  people: [
    {
      name: "Rob",
      role: "Co-founder / Commercial",
      paragraphs: [
        "Rob started madebyobra and handles the commercial side of the business.",
        "That means clients, ideas, new business, pricing, marketing, websites, systems and generally asking everyone else whether something is possible before occasionally finding out he has already promised it.",
        "He sits between the client, the creative and the factory, turning the original idea into a clear brief and making sure the project keeps moving.",
      ],
      short: "Rob finds the work and causes the problems.",
      photo: null,
    },
    {
      name: "Q",
      role: "Co-founder / Manufacturing",
      paragraphs: [
        "Q is the reason most of Rob’s ideas can actually be made.",
        "He leads manufacturing, sourcing and production, working with our factory network on feasibility, costing, materials, quality control and delivery.",
        "Years of factory relationships and manufacturing experience mean Q understands the bit that is very easy to underestimate: turning a nice drawing into thousands of physical products that all need to look right and arrive where they are supposed to.",
      ],
      short: "Q makes sure the problems are manufacturable.",
      photo: null,
    },
    {
      name: "Brad",
      role: "Creative Director",
      paragraphs: [
        "Brad leads creative direction and product design for our key projects and bespoke collections.",
        "He develops garment concepts, graphics, artwork and product direction, then works with the rest of the team to make sure what looked good on screen still looks good when it becomes an actual garment.",
        "Before madebyobra, Brad built his experience designing for some very recognisable names.",
      ],
      // BRAD_BRANDS_TO_CONFIRM: the brands Brad has designed for, exactly
      // as he would name them, e.g. ["Brand A", "Brand B", "Brand C"].
      // Left null until confirmed; the sentence appears once it is set.
      brands: null,
      afterBrands: [
        "That experience is useful because merchandise sits in a slightly awkward place between fashion, product, brand and manufacturing.",
        "Brad makes sure we don’t solve that problem by making something boring.",
      ],
      short: "Brad stops us making ugly things.",
      photo: null,
    },
  ] satisfies Person[],
};

export const fit = {
  title: "It works because we don’t all do the same job.",
  opening: [
    "A lot of merchandise businesses start with a catalogue.",
    "We tend to start with the idea.",
  ],
  roles: [
    "Rob looks at what the client is actually trying to achieve.",
    "Brad works out what the product should become.",
    "Q works out how to manufacture it properly.",
  ],
  closing: [
    "Then everyone argues about fabric weights, collars, colours and whether a tiny detail anybody else would ignore is worth changing.",
    "Usually it is.",
    "That combination of commercial, creative and manufacturing thinking is the point of madebyobra.",
  ],
  wants: [
    "We don’t want design disconnected from production.",
    "We don’t want manufacturing dictating every creative decision.",
    "And we don’t want clients stuck coordinating five suppliers just to get one collection made.",
  ],
};

export const beliefs = {
  title: "Make less stuff. Make better stuff.",
  before: [
    "There is already enough bad merchandise in the world.",
    "We are much more interested in making products people genuinely want to wear, keep, collect or buy.",
    "That normally means thinking harder about the product before making thousands of them.",
  ],
  sequence: [
    "Better fit.",
    "Better fabric.",
    "Better detail.",
    "Better creative.",
    "Better decisions.",
  ],
  after: ["Nothing revolutionary.", "Just surprisingly easy to get wrong."],
};

/** Anchored at #how-we-work: the agency guide and the homepage link here. */
export const howWeWork = {
  title: "From idea to actual thing.",
  steps: [
    {
      name: "Idea",
      text: "We understand what you’re trying to make, who it’s for, how many you need, what you want to spend and when it needs to arrive.",
    },
    {
      name: "Development",
      text: "We turn that into a real product specification, working through construction, fabrics, colours, artwork, trims and finishing.",
    },
    {
      name: "Sample",
      text: "A physical pre-production sample is made and photographed for approval before bulk production.",
    },
    {
      name: "Production",
      text: "Once approved, we coordinate manufacturing, quality control and the agreed packaging requirements.",
    },
    {
      name: "Delivery",
      text: "Finished stock goes where it needs to go.",
    },
  ],
};

export const closing = {
  title: "We’re still building it.",
  paragraphs: [
    "madebyobra is deliberately still a small studio.",
    "It means the people discussing the brief are also the people thinking about the product, speaking to the factory and caring whether the finished thing is any good.",
    "As we grow, we’d quite like to keep that bit.",
  ],
  prompt: "Got something in mind?",
};
