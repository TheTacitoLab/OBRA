import { Section } from "./Section";
import { audiences } from "@/content/festival-landing";

export function AudienceColumns() {
  return (
    <Section
      eyebrow={audiences.eyebrow}
      heading={audiences.heading}
      headingId="festival-audiences-heading"
    >
      <p className="text-lede mt-6 max-w-3xl text-ash">{audiences.intro}</p>

      <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
        {audiences.columns.map((column) => (
          <article
            key={column.heading}
            className="flex flex-col border-t border-line pt-6"
          >
            <h3 className="text-headline text-[1.35rem] text-white sm:text-[1.5rem]">
              {column.heading}
            </h3>
            <p className="text-tag mt-3 text-mute">{column.roles}</p>
            <p className="text-body mt-4 text-ash">{column.body}</p>
          </article>
        ))}
      </div>

      <p className="text-body mt-10 max-w-3xl text-ash">{audiences.closing}</p>
    </Section>
  );
}
