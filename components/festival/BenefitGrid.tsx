import { Section } from "./Section";
import { benefits } from "@/content/festival-landing";

export function BenefitGrid() {
  return (
    <Section
      eyebrow={benefits.eyebrow}
      heading={benefits.heading}
      headingId="festival-benefits-heading"
      layout="centre"
      size="large"
      background="blend-up-purple"
      intro={
        <div className="space-y-4">
          <p className="text-lede text-ash">{benefits.intro[0]}</p>
          <p className="text-body text-ash">{benefits.intro[1]}</p>
        </div>
      }
    >
      <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.blocks.map((block) => (
          <article
            key={block.heading}
            className="flex flex-col items-center bg-void/80 p-8 text-center sm:p-9"
          >
            <h3 className="text-balance font-display text-[clamp(1.45rem,2.1vw,1.9rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em] text-white">
              {block.heading}
            </h3>
            <p className="text-body text-pretty mt-4 text-ash">{block.body}</p>
          </article>
        ))}
      </div>

      {/* Closing note, full width across the section. */}
      <p className="text-lede text-balance mt-10 w-full border-l-2 border-yellow bg-void/70 p-7 text-white sm:p-9">
        {benefits.honestyNote}
      </p>
    </Section>
  );
}
