import { Section } from "./Section";
import { Button } from "../Button";
import { Arrow, Asterisk } from "../brand/Marks";
import { StartBriefForm } from "./StartBriefForm";
import { packageBriefHref, packages } from "@/content/festival-landing";
import { getPackage } from "@/lib/packages";

export function PackageComparison() {
  return (
    <Section
      id="festival-packages"
      eyebrow={packages.eyebrow}
      heading={packages.heading}
      headingId="festival-packages-heading"
      layout="centre"
      size="large"
      background="blend-down-magenta"
      intro={
        <div className="space-y-4">
          <p className="text-lede text-ash">{packages.intro[0]}</p>
          <p className="text-body text-ash">{packages.intro[1]}</p>
        </div>
      }
    >
      {/* Native disclosure: the five levels stay in the HTML for indexing and
          the control works without JavaScript. */}
      <details className="group mt-12">
        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-3 rounded-full border border-yellow bg-yellow px-9 py-4 text-label text-void transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-14px_rgba(252,222,22,0.55)] [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">{packages.toggleOpen}</span>
          <span className="hidden group-open:inline">{packages.toggleClose}</span>
          <Arrow className="h-4 w-4 rotate-90 transition-transform duration-300 group-open:-rotate-90" />
        </summary>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {packages.levels.map((level) => {
            // Name and quantity come from the shared package data so the two
            // places they appear on the site cannot drift apart.
            const base = getPackage(level.id);
            return (
              // Every level gets identical treatment, so the reader is not
              // steered towards one production level over another.
              <article
                key={level.id}
                className="flex h-full flex-col rounded-sm border border-white/12 bg-void/80 p-6 transition-colors duration-500 hover:border-white/30"
              >
                <h3 className="font-display text-[1.4rem] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-white">
                  {base?.name}
                </h3>
                <p className="text-tag mt-2 text-yellow">{base?.quantity}</p>
                <p className="text-body text-pretty mt-4 text-ash">{level.line}</p>

                <ul className="mt-6 space-y-2.5">
                  {level.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2.5">
                      <Asterisk className="mt-1 h-3 w-3 shrink-0 text-yellow" />
                      <span className="text-body text-white/90">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Button
                    href={packageBriefHref(level.id)}
                    variant="secondary"
                    className="w-full justify-between"
                  >
                    {level.ctaLabel}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </details>

      {/* Copy on the left, first step of the brief on the right. */}
      <div className="mt-14 rounded-sm border border-white/12 bg-void/70 p-8 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-left">
            <h3 className="text-balance font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em] text-white">
              {packages.footer.heading}
            </h3>
            <p className="text-lede text-pretty mt-4 text-ash">{packages.footer.body}</p>
          </div>
          <StartBriefForm />
        </div>
      </div>
    </Section>
  );
}
