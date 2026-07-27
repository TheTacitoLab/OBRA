import { Section } from "./Section";
import { benefits } from "@/content/festival-landing";

export function BenefitGrid() {
  return (
    <Section
      eyebrow={benefits.eyebrow}
      heading={benefits.heading}
      headingId="festival-benefits-heading"
    >
      <div className="mt-6 max-w-2xl space-y-4">
        <p className="text-lede text-ash">{benefits.intro[0]}</p>
        <p className="text-body text-ash">{benefits.intro[1]}</p>
      </div>

      <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {benefits.blocks.map((block) => (
          <article key={block.heading} className="bg-void p-7 sm:p-8">
            <h3 className="text-headline text-[1.35rem] text-white sm:text-[1.5rem]">
              {block.heading}
            </h3>
            <p className="text-body mt-3 text-ash">{block.body}</p>
          </article>
        ))}
      </div>

      <p className="text-lede mt-10 max-w-3xl border-l-2 border-yellow bg-obsidian p-6 text-white sm:p-7">
        {benefits.honestyNote}
      </p>
    </Section>
  );
}
