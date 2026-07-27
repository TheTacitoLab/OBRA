import { Section } from "./Section";
import { Button } from "../Button";
import { spec } from "@/content/festival-landing";

export function SpecOptions() {
  return (
    <Section
      eyebrow={spec.eyebrow}
      heading={spec.heading}
      headingId="festival-spec-heading"
      layout="split"
      size="large"
      background="blend-up-electric"
      intro={<p className="text-lede text-ash">{spec.intro}</p>}
    >
      <div className="mt-14 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {spec.columns.map((column) => (
          <article key={column.heading} className="border-t border-white/15 pt-6">
            <h3 className="text-balance font-display text-[1.2rem] font-bold uppercase leading-[1.1] tracking-[0.01em] text-yellow">
              {column.heading}
            </h3>
            <p className="text-body text-pretty mt-4 text-ash">{column.body}</p>
          </article>
        ))}
      </div>

      <p className="text-body text-pretty mx-auto mt-12 max-w-3xl rounded-sm border border-white/12 bg-void/70 p-7 text-center text-ash sm:p-8">
        {spec.honestyNote}
      </p>

      <div className="mt-10 flex justify-center">
        <Button href={spec.cta.href} className="px-9 py-4 text-[0.8rem]">
          {spec.cta.label}
        </Button>
      </div>
    </Section>
  );
}
