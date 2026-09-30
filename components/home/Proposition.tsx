import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";
import { MarkedTitle } from "../site/MarkedTitle";

/** The idea in one statement: copy left, the title right, on white. */
export function Proposition() {
  return (
    <Section id="proposition" tone="white" rounded>
      <Editorial
        reverse
        wide
        heading={
          <h2 className="type-display type-display-long">
            <span className="block">
              Your <br className="md:hidden" />
              merchandise
            </span>
            <span className="block">should feel like</span>
            <span className="block">
              <MarkedTitle title="your product." mark="your product." />
            </span>
          </h2>
        }
        aside={
          <div className="flex flex-col gap-5" data-reveal-group="left">
            <p className="type-lede">
              There&rsquo;s a difference between putting a logo on blanks and
              creating an original product that makes people go wow.
            </p>
            <p className="type-body text-muted">
              We develop every collection around your brand, your audience and
              the reason you&rsquo;re making it, so the finished product feels
              like something people genuinely want to own, wear and hang onto.
            </p>
            <div>
              <ArrowLink href="/what-we-make/">What we make</ArrowLink>
            </div>
          </div>
        }
      />
    </Section>
  );
}
