import { footballShirtPricing } from "@/content/pricing";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Homepage copy, section by section, in page order. Inline links use the
 * site's [label](/path/) syntax (components/site/RichText.tsx) and point
 * only at live routes. The photography, labels and tile links are in
 * content/homeMedia.ts.
 */

/** The page's search job: bespoke merchandise, design and manufacturing. */
export const homeMeta = {
  title: "Bespoke Merchandise Design and Manufacturing | madebyobra",
  description: siteConfig.description,
};

export const hero = {
  copy: "madebyobra is a British bespoke merchandise design and manufacturing studio creating original products for agencies, festivals, events, artists and brands. From product development and sampling through to manufacturing, packaging and delivery, we turn ideas into merchandise people actually want to own.",
};

export const whoFor = {
  title: "Who for.",
  copy: "We work with the people responsible for turning an idea into a product, whether that’s a client campaign, next year’s festival collection, a tour, an event or something a brand wants to put its name on.",
};

export const whatWeMake = {
  title: "What we make.",
  copy: "Original products, developed around the audience and the idea rather than pulled from a generic promotional catalogue.",
  cta: { label: "Explore what we make", href: "/what-we-make/" },
};

export const whatWeHandle = {
  title: "What we handle.",
  copy: "From developing the product to getting it ready for the people receiving, selling or distributing it, madebyobra can manage much more than the manufacturing run.",
  cta: { label: "Explore our services", href: "/services/" },
};

/** The three statements between the chapters. Each line is a line break. */
export const statements = {
  product: ["Your merchandise should feel like your product."],
  collection: ["We design by collection, for your audience."],
  studio: ["Full service studio.", "From concept to creation."],
};

export type OverviewTopic = { title: string; paragraphs: string[] };

/**
 * The business explained in full, for buyers who want the detail and for
 * search. Visible, ordinary HTML: never collapsed or hidden.
 */
export const overview = {
  title: "Bespoke merchandise design and manufacturing.",
  lead: [
    "madebyobra is a British bespoke merchandise design and manufacturing studio creating original apparel and custom merchandise for agencies, festivals, events, artists and brands. We work as a merchandise manufacturer and product development partner, helping teams take ideas from early concepts and sampling through to production, packaging and delivery.",
    "We work with organisations that want merchandise to feel like a genuine product rather than something chosen from a promotional catalogue and decorated afterwards. A project might involve one standout product, a complete merchandise collection or production support for an idea developed by an existing creative team.",
    "Our role can begin with an early reference, a finished design or a full technical brief. We help establish what can realistically be manufactured within the required quantity, budget and delivery date, then coordinate the agreed development and production work.",
  ],
  topics: [
    {
      title: "Merchandise for agencies, festivals, events, artists and brands.",
      paragraphs: [
        "For creative, experiential and activation agencies, madebyobra provides full-service and [white label merchandise](/agencies/) production while integrating with existing creative teams. We can help assess manufacturing feasibility, develop product specifications, coordinate sampling and manage production behind the scenes, allowing the agency to maintain control of the client relationship.",
        "For festivals, we develop contemporary [festival merchandise](/festivals/) collections including custom football jerseys, casualwear, T-shirts, headwear, artist collaborations, partner merchandise and festival crew clothing. We can work alongside organisers, creative teams and appointed merchandise operators, coordinating product development and manufacturing around the festival’s required goods-in date.",
        "For events, we develop and manufacture [event merchandise](/events/) for conferences, exhibitions, trade shows, sporting events and live brand experiences. This can include attendee merchandise, delegate gifts, event staff clothing, commercial partner products and retail collections, with production and packing requirements planned around how the event will actually operate.",
        "For musicians and artists, we create [artist merchandise](/artists/) for tours, releases, collaborations and merch drops. We can work alongside artist managers, labels, creative teams and existing merchandise or fulfilment companies, providing a manufacturing route for original products without requiring the existing sales and distribution operation to change.",
        "For brands, we develop [brand merchandise](/brands/), custom apparel, campaign merchandise and collaborative product collections. We work with existing designers and brand teams to translate the creative direction into manufacturable products while coordinating the agreed development, sampling and production process.",
      ],
    },
    {
      title: "Custom apparel and merchandise products.",
      paragraphs: [
        "Our product range covers contemporary casualwear, sportswear and accessories. This includes [custom retro football jerseys](/retro-football-shirts/), [custom T-shirts](/t-shirts/), heavyweight T-shirts, [hoodies, sweatshirts and tops](/tops/), [headwear](/headwear/), [sportswear](/sportswear/), [trainingwear](/trainingwear/) and selected [accessories](/accessories/).",
        "Standard custom projects can use our established garment blocks and manufacturing methods, with appropriate opportunities to adapt fabrics, colours, graphics, embroidery, badges, labels, trims and packaging.",
        // The only approved general minimum-order statement. Other
        // categories have their own minimums: never imply they start here.
        `Retro football jerseys remain one of madebyobra’s most distinctive products. They provide extensive opportunities for colour, collars, panel design, badges and sponsor-style artwork, making them particularly relevant for festivals, artists, campaigns, collaborations and cultural projects. Our lowest minimum order is ${footballShirtPricing.minimum} units for custom football jerseys.`,
        "For briefs requiring a completely new garment fit, construction method or specialist component, bespoke product development can also be explored where the quantity, budget and technical requirements make it practical.",
      ],
    },
    {
      title: "Merchandise production services.",
      paragraphs: [
        "madebyobra provides [merchandise production services](/services/) that can extend beyond the manufacturing run itself. Depending on the project scope, our work can include concept and product development, garment specifications, technical packs, sampling, branding applications, manufacturing coordination, quality control, garment labels, packaging, stock identification, logistics and preparation for an existing retail or fulfilment operation.",
        "Some clients already have complete designs and simply need a reliable merchandise manufacturer. Others involve us earlier so that product development and manufacturing considerations can influence the creative process before the final specification is approved.",
        "Where ecommerce, fulfilment, event support or additional logistics are required, these can be discussed and scoped around the project rather than being assumed as standard manufacturing services.",
      ],
    },
    {
      title: "How madebyobra works.",
      paragraphs: [
        "We have spent time establishing product blocks, manufacturing methods and supplier relationships that allow us to keep the buying process straightforward. Clients do not need to understand every part of garment manufacturing before approaching us.",
        "We normally begin by understanding what is being made, who it is for, the approximate quantity, the working budget and when the finished products need to arrive. From there, we can recommend an appropriate manufacturing route, explain the available customisation and prepare a clear quotation around the agreed specification.",
        "Working directly with manufacturing partners gives us greater control over product development and allows more of the garment itself to be considered. At suitable quantities, custom manufacturing can also be commercially competitive with more conventional merchandise sourcing, although the appropriate route depends on the product and specification.",
        "A physical pre-production sample forms part of the approval process before bulk manufacturing. Once the product is approved, we coordinate production, quality checks and agreed finishing, packing and delivery requirements.",
        "Have an unusual idea or a one-off project in mind? Send it over. Not every interesting project fits neatly into a standard category, and we’re always happy to discuss what’s possible.",
      ],
    },
  ] satisfies OverviewTopic[],
  /**
   * /how-we-work/ is not built yet: How we work lives on About (the same
   * fallback as the agency guide, agencyLinks.howWeWork). Switch it here
   * once the page exists.
   */
  links: [
    { label: "How we work", href: "/about/#how-we-work" },
    { label: "Our services", href: "/services/" },
  ],
};

export const finalCta = {
  title: "Have something in mind?",
  mark: "in mind?",
  copy: "Whether you’ve got a finished brief or the beginnings of an idea, we’d be happy to hear about it.",
};
