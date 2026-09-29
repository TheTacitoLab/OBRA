import type { Metadata } from "next";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { PageHero } from "@/components/landing/PageHero";
import { Steps, type Step } from "@/components/landing/Steps";
import { Block } from "@/components/site/Block";
import { ArrowLink } from "@/components/site/Button";
import { Editorial } from "@/components/site/Editorial";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const page = {
  path: "/about/",
  title: "About",
  description:
    "madebyobra is a bespoke merchandise studio. We design, develop and manufacture merchandise that feels like real product, with direct factory relationships and costing that works at scale.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

/** The six steps every project runs through. */
const steps: Step[] = [
  {
    title: "Brief",
    text: "What you want to make, roughly how many and by when.",
  },
  {
    title: "Concept and range direction",
    text: "Concepts, artwork and the shape of the range: hero pieces, entry price points, margin pieces.",
  },
  {
    title: "The right base",
    text: "The pattern, fit and construction each product starts from, chosen for the job it has to do.",
  },
  {
    title: "Sampling and approval",
    text: "Samples to sign off before anything runs.",
  },
  {
    title: "Production and QC",
    text: "Made through our factory network and checked in production before it ships.",
  },
  {
    title: "Delivery",
    text: "Finished stock, retail-ready, where it needs to be.",
  },
];

/** What development covers, once the block is chosen. */
const development = [
  {
    title: "The right base",
    text: "Patterns, fits and constructions that have already run in production. The fundamentals are settled before the brief arrives.",
  },
  {
    title: "Developed to the brief",
    text: "Fabric, fit, colour and trims, then labels, tags and packaging. The development budget goes where it is visible.",
  },
  {
    title: "Built as a collection",
    text: "Hero pieces, entry price points and margin pieces, planned together so the range works commercially as well as creatively.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          ...page,
          crumbs: [{ name: "Home", path: "/" }, { name: page.title }],
        })}
      />

      <PageHero
        full
        title="A product studio for merchandise."
        aside={
          <div className="flex flex-col gap-head">
            <p className="type-lede">
              madebyobra is a bespoke merchandise studio creating original
              products for brands, artists, events and organisations.
            </p>
            <p className="type-body text-muted">
              The name is also the maker&rsquo;s mark on everything we
              produce. A TACITO Group company.
            </p>
          </div>
        }
      />

      {/* Copy left, heading right, then the six steps at full width. */}
      <Section tone="stone">
        <Editorial
          reverse
          heading={<h2 className="type-display">How we work.</h2>}
          aside={
            <p className="type-lede text-muted">
              One team from the first brief to delivery. Every project runs
              through the same six steps.
            </p>
          }
        />
        <Steps wide steps={steps} className="mt-body" />
      </Section>

      {/* Heading left, copy right, then three blocks of unequal size. */}
      <Section tone="bone" size="compact">
        <Editorial
          heading={<h2 className="type-display">Factory direct.</h2>}
          aside={
            <div className="flex flex-col gap-5">
              <p className="type-lede text-muted">
                Direct factory relationships across headwear, tees, tops,
                sportswear and trainingwear. Sampling and QC run through the
                same network.
              </p>
              <div>
                <ArrowLink href="/services/#procurement-and-costing">
                  Procurement and costing
                </ArrowLink>
              </div>
            </div>
          }
        />
        <div className="mt-body grid gap-3 md:grid-cols-12 md:gap-4 lg:grid-rows-2">
          <Block
            tone="stone"
            title="Direct relationships"
            className="md:col-span-12 lg:col-span-7 lg:row-span-2 lg:min-h-[24rem] lg:justify-between"
          >
            <p>
              No agents and no middle layer. We work with the factories
              directly, which is what keeps the costing honest and the
              sampling quick.
            </p>
          </Block>
          <Block
            tone="accent"
            title="Sampling and QC"
            className="md:col-span-6 lg:col-span-5"
          >
            <p>
              Every product is sampled and approved before it runs, then
              checked in production before it ships.
            </p>
          </Block>
          <Block
            tone="outline"
            title="Costed to the budget"
            className="md:col-span-6 lg:col-span-5"
          >
            <p>
              Specification, volume and finish, balanced against the budget
              you actually have.
            </p>
          </Block>
        </div>
      </Section>

      {/* Heading across seven columns, statement beside it, then a
          three-column hairline row. */}
      <Section tone="blue-soft">
        <div className="grid gap-y-head md:grid-cols-12 md:gap-x-8 md:items-end lg:gap-x-12">
          <h2 className="type-display md:col-span-12 lg:col-span-7">
            Made, not decorated.
          </h2>
          <p className="type-statement md:col-span-8 lg:col-span-5 lg:col-start-8">
            Every product starts from a base that already works and is
            developed to the brief, so it reads as part of a collection
            rather than a blank with a logo added.
          </p>
        </div>
        {/* Three unequal columns from lg; a single column before that. */}
        <ul className="mt-body grid gap-y-6 lg:grid-cols-12 lg:gap-x-12">
          {development.map((item, index) => (
            <li
              key={item.title}
              className={`border-t border-line pt-5 first:border-t-0 first:pt-0 lg:border-t-0 lg:pt-0 ${
                ["lg:col-span-5", "lg:col-span-4", "lg:col-span-3"][index]
              }`}
            >
              <h3 className="type-title">{item.title}</h3>
              <p className="type-body mt-2 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Copy left, heading right-aligned. */}
      <Section tone="ink">
        <Editorial
          reverse
          headingAlign="right"
          mobileAlignRight
          heading={<h2 className="type-display">Why real product.</h2>}
          aside={
            <div className="flex flex-col gap-5">
              <p className="type-lede text-muted">
                Merchandise gets worn, photographed and kept when it feels
                like something you would have bought anyway.
              </p>
              <p className="type-body text-muted">
                Fit, fabric, label and packaging all say whether a piece was
                made or just printed. Product that works as product sells
                better, lasts longer and does more for the brand.
              </p>
              <div>
                <ArrowLink href="/what-we-make/">What we make</ArrowLink>
              </div>
            </div>
          }
        />
      </Section>

      <ClosingCta />
    </>
  );
}
