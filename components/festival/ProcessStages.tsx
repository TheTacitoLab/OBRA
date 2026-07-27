import { Section } from "./Section";
import { process } from "@/content/festival-landing";

export function ProcessStages() {
  return (
    <Section
      id="festival-process"
      eyebrow={process.eyebrow}
      heading={
        <>
          <span className="block">{process.headingLineOne}</span>
          <span className="block">{process.headingLineTwo}</span>
        </>
      }
      headingId="festival-process-heading"
      layout="centre"
      size="large"
      background="blend-down-electric"
      intro={<p className="text-lede text-ash">{process.intro}</p>}
    >
      <ol className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {process.stages.map((stage) => (
          <li key={stage.n} className="bg-void/80 p-6 sm:p-7">
            <p className="font-display text-[2rem] font-extrabold leading-none text-yellow">
              {stage.n}
            </p>
            <h3 className="mt-4 font-display text-[1.3rem] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-white">
              {stage.heading}
            </h3>
            <p className="text-body text-pretty mt-3 text-ash">{stage.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
