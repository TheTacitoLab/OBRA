import { Section } from "../site/Section";
import { ArrowLink } from "../site/Button";

export function AboutPreview() {
  return (
    <Section id="about-preview" tone="ink" size="compact">
      <div className="grid gap-y-4 md:grid-cols-12 md:gap-x-8 md:gap-y-6">
        <h2 className="type-display-sm md:col-span-5">The studio.</h2>
        <p className="type-statement md:col-span-7 md:row-span-2 lg:col-span-7 lg:col-start-6">
          Merchandise that feels like real product, made by people who know
          what it costs, what it sells for and what is left at the end.
        </p>
        <div className="md:col-span-5 md:col-start-1 md:self-end">
          <ArrowLink href="/about/">About madebyobra</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
