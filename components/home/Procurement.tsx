import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { Block } from "../site/Block";
import { ArrowLink } from "../site/Button";

export function Procurement() {
  return (
    <Section id="factory-direct" tone="bone">
      <Editorial
        heading={<h2 className="type-display">Factory direct.</h2>}
        aside={
          <div className="flex flex-col gap-5">
            <p className="type-lede text-muted">
              Direct factory relationships let us shape the product around
              your budget, balancing specification, volume and finish.
            </p>
            <ArrowLink href="/services/#procurement-and-costing">
              Procurement and costing
            </ArrowLink>
          </div>
        }
      />
      <div className="mt-body grid gap-3 md:grid-cols-12 md:grid-rows-2 md:gap-4">
        <Block
          tone="stone"
          meta="01"
          title="Sampling and QC through our factory network"
          className="md:col-span-7 md:row-span-2 md:min-h-[24rem]"
        >
          <p>
            Every product is sampled, approved and checked in production
            before it ships. The factories are ones we work with directly,
            across headwear, tees, tops, sportswear and trainingwear.
          </p>
        </Block>
        <Block
          tone="accent"
          meta="02"
          title="Costed to the budget"
          className="md:col-span-5"
        >
          <p>
            Specification, volume and finish are balanced together, so the
            number works before the sample does.
          </p>
        </Block>
        <Block
          tone="outline"
          meta="03"
          title="Retail-ready at your door"
          className="md:col-span-5"
        >
          <p>
            We manage the whole project from the first brief to production and
            delivery. The finished product arrives ready to sell or gift.
          </p>
        </Block>
      </div>
    </Section>
  );
}
