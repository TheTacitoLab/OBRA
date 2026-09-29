import type { Metadata } from "next";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { PageHero } from "@/components/landing/PageHero";
import { Editorial } from "@/components/site/Editorial";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const page = {
  path: "/about/",
  title: "About",
  description:
    "madebyobra is a merchandise and product studio for brands, artists, festivals, events and agencies. We design, develop and manufacture merchandise that feels like real product, from limited runs to larger production programmes.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

/** The six things the studio handles, in the order a project meets them. */
const handles = [
  {
    title: "Product development",
    text: "The fit, the fabric, the trims and the finish, worked out in samples before anything is specified for production.",
  },
  {
    title: "Manufacturing",
    text: "Direct factory relationships across headwear, tees, tops, sportswear and trainingwear, with sampling and quality control in production.",
  },
  {
    title: "Commercial understanding",
    text: "Product, quantity and price need to work together. We plan ranges with hero pieces, entry prices, margin, bundles and sell-through in mind, so less stock is left over.",
  },
  {
    title: "Retail readiness",
    text: "Barcodes, SKUs, labels and product data sorted before dispatch, so nobody has to open a box and start again.",
  },
  {
    title: "White-label support",
    text: "For agencies and partners we can develop and manufacture entirely under your name, with the client relationship left where it belongs.",
  },
  {
    title: "Logistics",
    text: "Freight, import, customs and delivery, plus storage, pick and pack and direct-to-customer fulfilment for anyone who does not want to hold stock.",
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
        title="Made, not decorated."
        aside={
          <div className="flex flex-col gap-4">
            <p className="type-lede">
              madebyobra is a merchandise and product studio for brands,
              artists, festivals, events and agencies.
            </p>
            <p className="type-body text-muted">
              We design, develop and manufacture retail-ready collections,
              from limited runs to larger production programmes.
            </p>
          </div>
        }
      />

      {/* The credibility line, high on the page and understated: a bold
          paragraph across seven columns, the maker's mark beside it. */}
      <Section tone="stone" size="compact">
        <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-8 md:items-end lg:gap-x-12">
          <p className="type-statement max-w-[34ch] md:col-span-8 lg:col-span-7">
            Our founders bring 31 years of combined manufacturing experience,
            alongside deep experience in brand, marketing and commercial
            planning across sport and fashion.
          </p>
          <p className="type-body text-muted md:col-span-4 lg:col-span-4 lg:col-start-9">
            The name is also the maker&rsquo;s mark on everything we produce.
            A TACITO Group company.
          </p>
        </div>
      </Section>

      {/* Heading left, copy right, then the six things we handle as
          editorial rows: title in one column, the explanation in the other. */}
      <Section id="how-we-work" tone="bone" className="scroll-mt-16">
        <Editorial
          heading={<h2 className="type-display">What we handle.</h2>}
          aside={
            <p className="type-lede text-muted">
              We think about how the collection will actually be sold, not
              just how it looks.
            </p>
          }
        />
        <ul className="index-list mt-body">
          {handles.map((item) => (
            <li key={item.title}>
              <div className="index-row md:grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
                <h3 className="type-headline md:col-span-5 lg:col-span-6">
                  {item.title}
                </h3>
                <p className="type-body mt-3 max-w-[44ch] text-muted md:col-span-7 md:mt-0 md:self-end lg:col-span-5 lg:col-start-8">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
