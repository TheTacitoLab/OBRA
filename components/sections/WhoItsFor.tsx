import { Container } from "../Container";
import { Reveal } from "../Reveal";

const audiences = ["Festivals", "Artists", "Creators", "Culture-led brands"];

export function WhoItsFor() {
  return (
    <section id="who" className="py-24 sm:py-32 md:py-40">
      <Container>
        <Reveal>
          <div className="text-center">
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
