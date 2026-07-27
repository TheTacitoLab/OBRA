import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { ProcessGrid } from "../ProcessGrid";

export function Process() {
  return (
    <section id="process" className="blend-up-purple py-24 sm:py-32 md:py-40">
      <Container>
        <Reveal>
          <h2 className="font-display text-[clamp(2.7rem,6.24vw,5.4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.015em] text-white">
            You bring the idea,{" "}
            <br className="hidden md:block" />
            we handle the rest.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-lede mt-6 max-w-2xl text-ash">
            We have built the design, development and production infrastructure
            needed to take your jersey from idea to delivery. Fewer mistakes, no
            surprise costs and none of the production stress.
          </p>
        </Reveal>

        <div className="mt-14 sm:mt-16">
          <ProcessGrid />
        </div>
      </Container>
    </section>
  );
}
