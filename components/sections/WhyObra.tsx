import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";
import { Reveal } from "../Reveal";

export function WhyObra() {
  return (
    <section id="why" className="border-t border-line">
      <GradientSurface intensity="soft" className="py-24 sm:py-32 md:py-44">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <SectionLabel className="justify-center">WHY OBRA</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-display mt-8 text-white">
                This is not print-on-demand, teamwear or a blank shirt with a
                logo on it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lede mx-auto mt-8 max-w-2xl text-white/85">
                OBRA is a football jersey studio creating unique, retail-ready
                jerseys designed to tell your story.
              </p>
            </Reveal>
          </div>
        </Container>
      </GradientSurface>
    </section>
  );
}
