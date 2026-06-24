import { GradientSurface } from "../GradientSurface";
import { Container } from "../Container";
import { Reveal } from "../Reveal";

const notThis = ["Print-on-demand", "Teamwear", "Blanks"];

// Smaller than the full display scale so "Print-on-demand" stays on one line.
const lineClass =
  "font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-extrabold uppercase leading-[1.08] tracking-[-0.01em]";

export function WhyObra() {
  return (
    <section id="why">
      <GradientSurface
        intensity="soft"
        topScrim
        className="py-24 sm:py-32 md:py-44"
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div>
                <p className={`${lineClass} text-yellow`}>This is not</p>
                <ul className="mt-2 space-y-1">
                  {notThis.map((item) => (
                    <li
                      key={item}
                      className={`${lineClass} whitespace-nowrap text-white`}
                    >
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
