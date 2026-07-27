import { Section } from "./Section";
import { Button } from "../Button";
import { spec } from "@/content/festival-landing";

export function SpecOptions() {
  return (
    <Section eyebrow={spec.eyebrow} heading={spec.heading} headingId="festival-spec-heading">
      <p className="text-lede mt-6 max-w-3xl text-ash">{spec.intro}</p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {spec.columns.map((column) => (
          <article key={column.heading} className="border-t border-line pt-6">
            <h3 className="text-headline text-[1.25rem] text-white">{column.heading}</h3>
            <p className="text-body mt-3 text-ash">{column.body}</p>
          </article>
        ))}
      </div>

      <p className="text-body mt-12 max-w-3xl rounded-sm border border-line bg-obsidian p-6 text-ash sm:p-7">
        {spec.honestyNote}
      </p>

      <div className="mt-9">
        <Button href={spec.cta.href} variant="secondary">
          {spec.cta.label}
        </Button>
      </div>
    </Section>
  );
}
