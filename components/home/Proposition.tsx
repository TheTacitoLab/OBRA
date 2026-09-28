import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";

export function Proposition() {
  return (
    <Section id="proposition" tone="stone" size="large">
      <Editorial
        heading={
          <h2 className="type-display">
            Your merchandise should feel like your product.
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
