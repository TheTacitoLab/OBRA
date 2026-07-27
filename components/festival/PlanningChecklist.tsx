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
    >
      <div className="mt-6 max-w-3xl space-y-4">
        <p className="text-lede text-ash">{planning.intro[0]}</p>
        <p className="text-body text-ash">{planning.intro[1]}</p>
      </div>

      {/* Questions first, then the inputs table. They stack questions-first on
          mobile because the DOM order already puts them first. */}
      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <h3 className="text-headline text-[1.35rem] text-white">
            {planning.questionsHeading}
          </h3>
          <ul className="mt-5 space-y-3">
            {planning.questions.map((question) => (
              <li key={question} className="flex gap-3">
                <Asterisk className="mt-1 h-3.5 w-3.5 shrink-0 text-yellow" />
                <span className="text-body text-white/90">{question}</span>
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
                    className="text-tag border-b border-line pb-3 pr-4 text-mute"
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
                    className="text-body border-b border-line py-3 pr-4 align-top font-medium text-white"
                  >
                    {input}
                  </th>
                  <td className="text-body border-b border-line py-3 align-top text-ash">
                    {why}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-body mt-10 max-w-3xl text-ash">{planning.closing}</p>

      <div className="mt-8">
        <Button href={planning.cta.href} variant="secondary">
          {planning.cta.label}
        </Button>
      </div>
    </Section>
  );
}
