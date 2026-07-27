import { Section } from "./Section";
import { Button } from "../Button";
import { timeline } from "@/content/festival-landing";
import { processStages } from "@/lib/process";

export function Timeline() {
  return (
    <Section
      eyebrow={timeline.eyebrow}
      heading={timeline.heading}
      headingId="festival-timeline-heading"
    >
      <div className="mt-6 max-w-3xl space-y-4">
        <p className="text-lede text-ash">{timeline.intro[0]}</p>
        <p className="text-body text-ash">{timeline.intro[1]}</p>
      </div>

      {/* Vertical with a connecting rule on mobile, horizontal from sm up. */}
      <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {processStages.map((stage) => (
          <li key={stage.n} className="bg-void p-5 sm:p-6">
            <p className="text-tag text-mute">{stage.n}</p>
            <p className="text-headline mt-2 text-[1.2rem] text-white">{stage.title}</p>
            <p className="text-label mt-1.5 text-yellow">{stage.week}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h3 className="text-headline text-[1.35rem] text-white">
            {timeline.variablesHeading}
          </h3>
          <p className="text-body mt-3 text-ash">{timeline.variablesIntro}</p>
          <ul className="mt-5 border-t border-line">
            {timeline.variables.map((item) => (
              <li key={item} className="text-body border-b border-line py-3 text-white/90">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <p className="text-lede border-l-2 border-yellow bg-obsidian p-6 text-white">
            {timeline.emphasis}
          </p>
          <p className="text-body text-ash">{timeline.buffer}</p>
          <Button href={timeline.cta.href} variant="secondary">
            {timeline.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
