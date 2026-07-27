import { Section } from "./Section";
import { audiences } from "@/content/festival-landing";

export function AudienceColumns() {
  return (
    <Section
      eyebrow={audiences.eyebrow}
      heading={audiences.heading}
      headingId="festival-audiences-heading"
      layout="split"
      intro={<p className="text-lede text-ash">{audiences.intro}</p>}
    >
      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {audiences.columns.map((column) => (
          <article key={column.heading} className="border-t border-white/15 pt-6">
            <h3 className="text-balance font-display text-[clamp(1.2rem,1.7vw,1.5rem)] font-bold uppercase leading-[1.1] tracking-[0.01em] text-yellow">
              {column.heading}
            </h3>
            <p className="text-body text-pretty mt-4 text-ash">{column.body}</p>
          </article>
        ))}
      </div>

      <p className="text-body text-pretty mt-12 max-w-3xl text-ash">{audiences.closing}</p>
    </Section>
  );
}
