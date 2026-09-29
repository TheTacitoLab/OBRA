import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { Block } from "../site/Block";
import { ArrowLink } from "../site/Button";

/**
 * Factory direct: the manufacturing side. Heading left, the scale line
 * right, three blocks of unequal width in one row, then the experience
 * statement in a quiet two-column row; the one place on the homepage it
 * appears.
 */
export function Procurement() {
  return (
    <Section id="factory-direct" tone="bone">
      <Editorial
        heading={<h2 className="type-display">Factory direct.</h2>}
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede">
              Small runs when you&rsquo;re testing. Thousands when it works.
            </p>
            <p className="type-body text-muted">
              Direct factory relationships, so a one-off project, a limited
              edition and a repeat programme all run through the same setup.
            </p>
            <ArrowLink href="/services/#procurement-and-costing">
              Procurement and costing
            </ArrowLink>
          </div>
        }
      />
      <div className="mt-body grid gap-3 md:grid-cols-12 md:gap-4 xl:items-start">
        <Block
          tone="stone"
          title="Sampling and QC"
          className="md:col-span-12 xl:col-span-5 xl:min-h-[16rem] xl:justify-between"
        >
          <p>
            Every product is sampled, approved and checked in production
            before it ships.
          </p>
        </Block>
        <Block
          tone="accent"
          title="Costed to the budget"
          className="md:col-span-6 xl:col-span-3"
        >
          <p>
            Specification, volume and finish are balanced together, so the
            numbers work before the sample does.
          </p>
        </Block>
        <Block
          tone="outline"
          title="Retail-ready at your door"
          className="md:col-span-6 xl:col-span-4"
        >
          <p>
            We manage production through to delivery so stock arrives ready
            to sell, use or gift.
          </p>
        </Block>
      </div>
      <div className="mt-body grid gap-y-4 md:grid-cols-12 md:gap-x-8 md:items-end lg:gap-x-12">
        <p className="type-lede md:col-span-7">
          31 years of combined manufacturing experience across sport and
          fashion.
        </p>
        <p className="type-body text-muted md:col-span-5 lg:col-span-4 lg:col-start-9">
          That experience goes beyond production. We understand brand, margin,
          positioning and how the product needs to work commercially once it
          leaves the factory.
        </p>
      </div>
    </Section>
  );
}
