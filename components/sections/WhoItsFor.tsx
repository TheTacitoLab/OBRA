import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";
import { Reveal } from "../Reveal";

const audiences = ["Festivals", "Artists", "Creators", "Culture-led brands"];

export function WhoItsFor() {
  return (
    <section id="who" className="border-t border-line py-24 sm:py-32 md:py-40">
      <Container>
        <Reveal>
          <SectionLabel className="justify-center">
            WHO IT&apos;S FOR
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 text-center">
            <p className="text-label text-ash">For</p>
            <ul className="mt-6 space-y-2">
              {audiences.map((audience) => (
                <li key={audience} className="text-display text-white">
                  {audience}
                </li>
              ))}
            </ul>
            <p className="text-display mt-8 font-black text-yellow">
              With a crowd
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
