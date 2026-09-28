import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { LandingPage } from "@/components/landing/LandingPage";
import { JsonLd } from "@/components/site/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const page = {
  path: "/about/",
  title: "About",
  description:
    "madebyobra is a bespoke merchandise studio. We use proven product blocks as the starting point and develop the product around the client's brand, with direct manufacturing and pricing that works at scale.",
  intro:
    "A bespoke merchandise studio creating original products for brands, artists, events and organisations.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          ...page,
          crumbs: [{ name: "Home", path: "/" }, { name: page.title }],
        })}
      />
      <LandingPage title="About." intro={page.intro}>
        <section data-tone="bone" className="bg-bg text-fg">
          <Container className="pb-24 md:pb-32">
            <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-12 md:pt-16">
              <div className="type-lede space-y-6 md:col-span-7 lg:col-span-6 lg:col-start-7">
                <p>
                  We don&rsquo;t operate like a traditional promotional
                  merchandise supplier. We use proven product blocks as the
                  starting point and develop the product around your brand, so
                  the end result feels like part of a proper collection rather
                  than a blank with a logo added.
                </p>
                <p className="text-muted">
                  Substantial customisation, direct manufacturing relationships
                  and pricing that works commercially at scale. And the wider
                  commercial side too: product strategy, procurement,
                  e-commerce, fulfilment, event support and logistics.
                </p>
                <p className="text-muted">
                  madebyobra is the studio, and the maker&rsquo;s mark on
                  everything we produce. A TACITO Group company.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </LandingPage>
    </>
  );
}
