import type { Metadata } from "next";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { PageHero } from "@/components/landing/PageHero";
import { ProductIndex } from "@/components/landing/ProductIndex";
import { ArrowLink, Button } from "@/components/site/Button";
import { Editorial } from "@/components/site/Editorial";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import { primaryCta, products } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";
import { contactHref } from "@/lib/siteConfig";

const page = {
  path: "/what-we-make/",
  title: "What we make: custom apparel and merchandise",
  crumb: "What we make",
  description:
    "Headwear, t-shirts, tops, sportswear, retro football shirts, trainingwear, accessories and more: bespoke merchandise from madebyobra.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function WhatWeMakePage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          ...page,
          crumbs: [{ name: "Home", path: "/" }, { name: page.crumb }],
        })}
      />

      <PageHero
        size="default"
        title="What we make."
        mark="make."
        aside={
          <div className="flex flex-col gap-body">
            <p className="type-lede">
              Seven categories we develop most often, plus the pieces that
              come up on request, every one made to sit in a collection.
            </p>
            <div>
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
            </div>
          </div>
        }
      />

      {/* No top padding: the index follows straight on from the hero. */}
      <Section tone="bone" size="compact" containerClassName="pt-0">
        <ProductIndex products={products} />
      </Section>

      {/* Copy left, heading right: everything beyond the six categories. */}
      <Section tone="stone" size="compact">
        <Editorial
          reverse
          headingAlign="right"
          mobileAlignRight
          heading={<h2 className="type-display">+ More.</h2>}
          aside={
            <div className="flex flex-col gap-5">
              <p className="type-lede text-muted">
                Outerwear, scarves, drinkware, packaging and one-off pieces are
                made the same way. If it belongs in the range, ask.
              </p>
              <div>
                <ArrowLink href={contactHref}>Ask about a product</ArrowLink>
              </div>
            </div>
          }
        />
      </Section>

      <ClosingCta />
    </>
  );
}
