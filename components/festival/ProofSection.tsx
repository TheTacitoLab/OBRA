import { Section } from "./Section";
import { proof } from "@/content/festival-landing";

export function ProofSection() {
  return (
    <Section eyebrow={proof.eyebrow} heading={proof.heading} headingId="festival-proof-heading">
      <p className="text-lede mt-6 max-w-3xl text-ash">{proof.intro}</p>

      <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {proof.blocks.map((block) => (
          <article key={block.heading} className="bg-void p-7 sm:p-8">
            <h3 className="text-headline text-[1.25rem] text-white">{block.heading}</h3>
            <p className="text-body mt-3 text-ash">{block.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
