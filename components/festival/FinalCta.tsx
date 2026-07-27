import { Container } from "../Container";
import { Button } from "../Button";
import { Asterisk } from "../brand/Marks";
import { finalCta } from "@/content/festival-landing";
import { siteConfig } from "@/lib/siteConfig";

export function FinalCta() {
  return (
    <section
      id="festival-final-cta"
      aria-labelledby="festival-final-heading"
      /* Flat brand surface rather than an image, so the 4.5:1 contrast holds at
         every breakpoint until the specified background asset lands. Bottom
         padding clears the sticky mobile CTA. */
      className="border-t border-line bg-obsidian py-20 pb-32 sm:py-28 sm:pb-32 md:py-32 md:pb-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2
              id="festival-final-heading"
              className="font-display text-[clamp(1.9rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.015em] text-white"
            >
              <span className="block">{finalCta.headingLineOne}</span>
              <span className="block">{finalCta.headingLineTwo}</span>
            </h2>

            <div className="mt-7 max-w-2xl space-y-4">
              <p className="text-lede text-ash">{finalCta.body[0]}</p>
              <p className="text-body text-ash">{finalCta.body[1]}</p>
            </div>

            <div className="mt-9">
              <Button href={finalCta.cta.href}>{finalCta.cta.label}</Button>
            </div>

            <p className="text-body mt-6 text-mute">
              {finalCta.contactLead}{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-white underline decoration-yellow underline-offset-4 transition-colors hover:text-yellow"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div className="rounded-sm border border-line bg-void p-7 sm:p-8">
            <h3 className="text-tag text-mute">{finalCta.expectationsHeading}</h3>
            <ul className="mt-5 space-y-3">
              {finalCta.expectations.map((item) => (
                <li key={item} className="flex gap-3">
                  <Asterisk className="mt-1 h-3.5 w-3.5 shrink-0 text-yellow" />
                  <span className="text-body text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-body mt-6 border-t border-line pt-5 text-ash">
              {finalCta.reassurance}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
