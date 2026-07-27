import { Section } from "./Section";
import { Button } from "../Button";
import { Asterisk } from "../brand/Marks";
import { planning } from "@/content/festival-landing";

export function PlanningChecklist() {
  return (
    <Section
      eyebrow={planning.eyebrow}
      heading={planning.heading}
      headingId="festival-planning-heading"
      layout="split"
      intro={
        <div className="space-y-4">
          <p className="text-lede text-ash">{planning.intro[0]}</p>
          <p className="text-body text-ash">{planning.intro[1]}</p>
        </div>
      }
    >
      {/* Questions first, then the inputs table. They stack questions-first on
          mobile because the DOM order already puts them first. */}
      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className="font-display text-[1.2rem] font-bold uppercase tracking-[0.01em] text-yellow">
            {planning.questionsHeading}
          </h3>
          <ul className="mt-6 space-y-3">
            {planning.questions.map((question) => (
              <li key={question} className="flex gap-3">
                <Asterisk className="mt-1 h-3.5 w-3.5 shrink-0 text-yellow" />
                <span className="text-body text-pretty text-white/90">{question}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{planning.tableCaption}</caption>
            <thead>
              <tr>
                {planning.tableHeadings.map((headingText) => (
                  <th
                    key={headingText}
                    scope="col"
                    className="text-tag border-b border-white/15 pb-3 pr-4 text-mute"
                  >
                    {headingText}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planning.inputs.map(([input, why]) => (
                <tr key={input}>
                  <th
                    scope="row"
                    className="text-body border-b border-white/15 py-3 pr-4 align-top font-medium text-white"
                  >
                    {input}
                  </th>
                  <td className="text-body border-b border-white/15 py-3 align-top text-ash">
                    {why}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-body text-pretty mx-auto mt-12 max-w-3xl text-center text-ash">
        {planning.closing}
      </p>

      <div className="mt-8 flex justify-center">
        <Button href={planning.cta.href} className="px-9 py-4 text-[0.8rem]">
          {planning.cta.label}
        </Button>
      </div>
    </Section>
  );
}
