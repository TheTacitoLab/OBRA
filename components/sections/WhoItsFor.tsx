import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";
import { Reveal } from "../Reveal";

export function WhoItsFor() {
  return (
    <section id="who" className="border-t border-line py-24 sm:py-32 md:py-40">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <SectionLabel>01 / WHO IT&apos;S FOR</SectionLabel>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal delay={0.05}>
              <h2 className="text-display text-white">
                For festivals, artists, creators and culture-led brands with a
                crowd.
              </h2>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
