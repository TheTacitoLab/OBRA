import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";
import { Reveal } from "../Reveal";

export function WhyObra() {
  return (
    <section id="why" className="border-t border-line">
      <GradientSurface intensity="soft" className="py-24 sm:py-32 md:py-44">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Reveal>
                <SectionLabel tone="text-white/85">04 / WHY OBRA</SectionLabel>
              </Reveal>
            </div>
            <div className="md:col-span-9">
              <Reveal delay={0.05}>
                <h2 className="text-display text-white">
                  This is not print-on-demand, teamwear or a blank shirt with a
                  logo on it.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lede mt-8 max-w-2xl text-white/85">
                  OBRA is a football jersey studio creating unique, retail-ready
                  jerseys designed to tell your story.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </GradientSurface>
    </section>
  );
}
