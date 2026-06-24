import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";
import { Reveal } from "../Reveal";

const notThis = ["Print-on-demand", "Teamwear", "Blanks"];

export function WhyObra() {
  return (
    <section id="why" className="border-t border-line">
      <GradientSurface intensity="soft" className="py-24 sm:py-32 md:py-44">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <SectionLabel className="text-center">WHY OBRA</SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-8">
                <p className="text-display text-yellow">This is not</p>
                <ul className="mt-2 space-y-1">
                  {notThis.map((item) => (
                    <li key={item} className="text-display text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lede mx-auto mt-10 max-w-2xl text-white/85">
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
