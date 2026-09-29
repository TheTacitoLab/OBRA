import { Section } from "../site/Section";
import { ArrowLink } from "../site/Button";

export function AboutPreview() {
  return (
    <Section id="about-preview" tone="ink" size="compact">
      <div className="grid gap-y-4 md:grid-cols-12 md:gap-x-8 md:gap-y-6">
        <h2 className="type-display-sm md:col-span-4">The studio.</h2>
        <p className="type-statement md:col-span-8 md:row-span-2 lg:col-span-7 lg:col-start-6">
          madebyobra is a bespoke merchandise studio. We use proven product
          blocks as the starting point and develop the product around your
          brand, with direct manufacturing and pricing that works at scale.
        </p>
        <div className="md:col-span-4 md:col-start-1">
          <ArrowLink href="/about/">About madebyobra</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
