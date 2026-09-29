import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";

export function Proposition() {
  return (
    <Section id="proposition" tone="blue-soft" size="compact">
      {/* Copy left, statement right in three deliberate lines from lg. */}
      <Editorial
        reverse
        wide
        heading={
          <h2 className="type-display type-display-long">
            <span className="block">Your merchandise</span>
            <span className="block">should feel like</span>
            <span className="block">
              <span className="mark">your product.</span>
            </span>
          </h2>
        }
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede text-muted">
              Start with the right product, then build the details around the
              brief.
            </p>
            <ArrowLink href="/about/#how-we-work">How we work</ArrowLink>
          </div>
        }
      />
    </Section>
  );
}
