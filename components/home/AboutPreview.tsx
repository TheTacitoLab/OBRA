import { Section } from "../site/Section";
import { ArrowLink } from "../site/Button";

/** The studio in one breath: title left, statement and link right. */
export function AboutPreview() {
  return (
    <Section id="about-preview" tone="ink" size="compact" rounded>
      <div className="grid gap-y-4 md:grid-cols-12 md:gap-x-8 md:gap-y-6">
        <h2 className="type-display md:col-span-5" data-reveal="left">
          The studio.
        </h2>
        <p
          className="type-statement md:col-span-7 md:row-span-2 lg:col-span-7 lg:col-start-6"
          data-reveal="right"
          data-reveal-delay="1"
        >
          Merchandise that feels like real product, made by people who know what
          it costs, what it sells for and what is left at the end.
        </p>
        <div
          className="md:col-span-5 md:col-start-1 md:self-end"
          data-reveal="left"
          data-reveal-delay="2"
        >
          <ArrowLink href="/about/">About madebyobra</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
