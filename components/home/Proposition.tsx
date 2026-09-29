import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";

export function Proposition() {
  return (
    <Section id="proposition" tone="stone">
      {/* Copy left, statement right in three deliberate lines from lg. */}
      <Editorial
        reverse
        wide
        heading={
          <h2 className="type-display type-display-long">
            <span className="lg:block">Your merchandise </span>
            <span className="lg:block">should feel like </span>
            <span className="lg:block">your product.</span>
          </h2>
        }
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede text-muted">
              Proven product blocks give us the starting point. Everything else
              is built around your brand.
            </p>
            <ArrowLink href="/about/">How we work</ArrowLink>
          </div>
        }
      />
    </Section>
  );
}
