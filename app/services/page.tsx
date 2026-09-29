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
    "madebyobra services: creative direction, product development, sampling and manufacturing, procurement and costing, branding and packaging, e-commerce, fulfilment, event support, logistics and white label production.",
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
        size="default"
        title="Services."
        aside={
          <div className="flex flex-col gap-head">
            <p className="type-lede">
              Everything between the first idea and finished stock at your
              door, handled in one place.
            </p>
            <p className="type-body text-muted">
              Use what you need. We can handle individual stages or the whole
              project.
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
              <h3 className="type-headline md:col-span-6">{service.title}</h3>
              <div className="col-start-2 mt-2 flex flex-col gap-3 md:col-span-5 md:col-start-8 md:mt-0 md:self-end">
                <p className="type-body max-w-[44ch] text-muted">
                  {service.description}
                </p>
                {service.slug === "white-label-production" && (
                  <div>
                    <ArrowLink href="/agencies/">Built for agencies</ArrowLink>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Copy left, heading right: the commercial side of the work. */}
      <Section tone="stone">
        <Editorial
          reverse
          heading={<h2 className="type-display">Range, quantity, price.</h2>}
          aside={
            <div className="flex flex-col gap-5">
              <p className="type-lede text-muted">
                Range structure, quantities and pricing are part of the job,
                not an afterthought.
              </p>
              <p className="type-body text-muted">
                Hero pieces carry the identity, entry pieces carry the volume,
                and the numbers are planned so stock sells through rather
                than sits in boxes. When something works, it re-runs without
                starting again.
              </p>
              <div>
                <ArrowLink href="/about/#how-we-work">How we work</ArrowLink>
              </div>
            </div>
          }
        />
      </Section>

      <ClosingCta />
    </>
  );
}
