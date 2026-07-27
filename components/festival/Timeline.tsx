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
      layout="split"
      background="blend-up-magenta"
      intro={
        <div className="space-y-4">
          <p className="text-lede text-ash">{timeline.intro[0]}</p>
          <p className="text-body text-ash">{timeline.intro[1]}</p>
        </div>
      }
    >
      {/* Vertical with a connecting rule on mobile, horizontal from sm up. */}
      <ol className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
        {processStages.map((stage) => (
          <li key={stage.n} className="bg-void/80 p-5 sm:p-6">
            <p className="text-tag text-mute">{stage.n}</p>
            <p className="mt-2 font-display text-[1.25rem] font-bold uppercase leading-[1.1] text-white">
              {stage.title}
            </p>
            <p className="text-label mt-1.5 text-yellow">{stage.week}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h3 className="font-display text-[1.2rem] font-bold uppercase tracking-[0.01em] text-yellow">
            {timeline.variablesHeading}
          </h3>
          <p className="text-body text-pretty mt-4 text-ash">{timeline.variablesIntro}</p>
          <ul className="mt-5 border-t border-white/15">
            {timeline.variables.map((item) => (
              <li key={item} className="text-body border-b border-white/15 py-3 text-white/90">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <p className="text-lede text-pretty border-l-2 border-yellow bg-void/70 p-6 text-white">
            {timeline.emphasis}
          </p>
          <p className="text-body text-pretty text-ash">{timeline.buffer}</p>
          <Button href={timeline.cta.href} variant="secondary">
            {timeline.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
