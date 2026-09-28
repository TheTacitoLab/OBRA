import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";

export function Collection() {
  return (
    <Section id="design-by-collection" tone="clay" size="large">
      <Editorial
        reverse
        headingAlign="right"
        mobileAlignRight
        align="start"
        heading={<h2 className="type-display">Design by collection.</h2>}
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede text-muted">
              We build each range as a whole, balancing hero products,
              accessible price points and stronger-margin pieces.
            </p>
            <p className="type-body max-w-[36ch] text-muted">
              Then we shape bundles, retail structure and forecasting around
              the audience, so the collection works commercially as well as
              creatively.
            </p>
          </div>
        }
      />
    </Section>
  );
}
