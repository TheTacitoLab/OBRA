import { Section } from "./Section";
import { proof } from "@/content/festival-landing";

export function ProofSection() {
  return (
    <Section
      eyebrow={proof.eyebrow}
      heading={proof.heading}
      headingId="festival-proof-heading"
      layout="centre"
      size="large"
      background="blend-down-purple"
      intro={<p className="text-lede text-ash">{proof.intro}</p>}
    >
      <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {proof.blocks.map((block) => (
          <article
            key={block.heading}
            className="flex flex-col items-center bg-void/80 p-8 text-center sm:p-9"
          >
            <h3 className="text-balance font-display text-[1.25rem] font-bold uppercase leading-[1.1] tracking-[0.01em] text-yellow">
              {block.heading}
            </h3>
            <p className="text-body text-pretty mt-4 text-ash">{block.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
