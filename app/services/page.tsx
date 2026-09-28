import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { LandingPage } from "@/components/landing/LandingPage";
import { JsonLd } from "@/components/site/JsonLd";
import { services } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const page = {
  path: "/services/",
  title: "Services",
  description:
    "madebyobra services: creative direction, product development, sampling and manufacturing, procurement and costing, branding and packaging, e-commerce, fulfilment, event support and logistics.",
  intro:
    "Everything between the first idea and finished stock at your door, handled in one place.",
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
      <LandingPage title="Our services." intro={page.intro}>
        <section data-tone="bone" className="bg-bg text-fg">
          <Container className="pb-24 md:pb-32">
            <h2 className="sr-only">All services</h2>
            <ol className="border-t border-line">
              {services.map((service, index) => (
                <li
                  key={service.slug}
                  id={service.slug}
                  className="grid scroll-mt-28 gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-x-12 md:py-10"
                >
                  <span className="type-meta text-muted md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-title md:col-span-4">{service.title}</h3>
                  <p className="type-body max-w-[44ch] text-muted md:col-span-6">
                    {service.description}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </LandingPage>
    </>
  );
}
