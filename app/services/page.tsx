import type { Metadata } from "next";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { PageHero } from "@/components/landing/PageHero";
import { ArrowLink } from "@/components/site/Button";
import { Editorial } from "@/components/site/Editorial";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import { services } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const page = {
  path: "/services/",
  title: "Services",
  description:
    "madebyobra services: creative direction, product development, sampling and manufacturing, procurement and costing, branding and packaging, e-commerce, fulfilment, event support and logistics.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          ...page,
          crumbs: [{ name: "Home", path: "/" }, { name: page.title }],
        })}
      />

      <PageHero
        title="Services."
        aside={
          <div className="flex flex-col gap-head">
            <p className="type-lede">
              Everything between the first idea and finished stock at your
              door, handled in one place.
            </p>
            <p className="type-body text-muted">
              Nine services. Most projects use several, and one team runs
              them all.
            </p>
          </div>
        }
      />

      {/* No top padding: the list follows straight on from the hero. Each
          row carries the service slug as its id, so /services/#fulfilment
          lands on the row, clear of the fixed header. */}
      <Section tone="bone" size="compact" containerClassName="pt-0">
        <h2 className="sr-only">All services</h2>
        <ol className="index-list">
          {services.map((service, index) => (
            <li
              key={service.slug}
              id={service.slug}
              className="index-row grid scroll-mt-24 grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 md:grid-cols-12 md:gap-x-8 lg:gap-x-12"
            >
              <span className="type-meta pt-1 text-muted md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="type-title md:col-span-4 lg:col-span-3">
                {service.title}
              </h3>
              <p className="type-body col-start-2 mt-2 max-w-[44ch] text-muted md:col-span-7 md:col-start-6 md:mt-0 lg:col-span-6 lg:col-start-5">
                {service.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Copy left, heading right. */}
      <Section tone="stone">
        <Editorial
          reverse
          heading={<h2 className="type-display">One team, end to end.</h2>}
          aside={
            <div className="flex flex-col gap-5">
              <p className="type-lede text-muted">
                We manage the whole project from the first brief to production
                and delivery: creative, product, factories, costing, packaging,
                freight and the shop it sells through.
              </p>
              <p className="type-body text-muted">
                Stock arrives retail-ready, with nothing left for you to
                stitch together.
              </p>
              <div>
                <ArrowLink href="/about/">How we work</ArrowLink>
              </div>
            </div>
          }
        />
      </Section>

      <ClosingCta />
    </>
  );
}
