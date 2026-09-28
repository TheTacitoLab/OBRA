import { Section } from "../site/Section";
import { ArrowLink } from "../site/Button";

export function AboutPreview() {
  return (
    <Section id="about-preview" tone="bone" size="compact">
      <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-8">
        <div className="flex flex-col gap-4 md:col-span-4">
          <h2 className="type-headline">The studio.</h2>
          <ArrowLink href="/about/">About madebyobra</ArrowLink>
        </div>
        <p className="type-statement md:col-span-8 lg:col-span-7 lg:col-start-6">
          madebyobra is a bespoke merchandise studio. We use proven product
          blocks as the starting point and develop the product around your
          brand, with direct manufacturing and pricing that works at scale.
        </p>
      </div>
    </Section>
  );
}
