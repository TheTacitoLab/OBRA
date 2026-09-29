import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";

export function Collection() {
  return (
    <Section id="design-by-collection" tone="stone" size="large">
      <Editorial
        reverse
        headingAlign="right"
        mobileAlignRight
        align="start"
        heading={<h2 className="type-display">Design by collection.</h2>}
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede text-muted">
              We plan each range as a whole: the hero piece, the one everybody
              can afford and the one that carries the margin.
            </p>
            <p className="type-body max-w-[36ch] text-muted">
              Then the bundles, the quantities and the size split, worked out
              around who is buying so it sells through.
            </p>
          </div>
        }
      />
    </Section>
  );
}
