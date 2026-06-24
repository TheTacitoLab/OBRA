import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { JerseySlot } from "../JerseySlot";
import { Asterisk } from "../brand/Marks";

const deliverables = [
  "Design concept",
  "Artwork direction",
  "Jersey mockups",
  "Tech pack",
  "Sample",
  "Production",
  "Packaging",
];

export function WhatYouGet() {
  return (
    <section id="what" className="blend-down-purple py-24 sm:py-32 md:py-40">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div>
            <Reveal>
              <h2 className="text-headline max-w-md text-white">
                A full jersey drop, handled in one place.
              </h2>
            </Reveal>

            <Reveal>
              <ul className="mt-12 border-t border-line">
                {deliverables.map((item, i) => (
                  <li
                    key={item}
                    className="group flex items-center gap-5 border-b border-line py-5"
                  >
                    <span className="w-8 shrink-0 text-label text-ash">
                      0{i + 1}
                    </span>
                    <Asterisk className="h-4 w-4 shrink-0 text-yellow transition-transform duration-500 group-hover:rotate-90" />
                    <span className="text-lede text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="flex flex-col gap-5">
            <Reveal>
              <JerseySlot label="JERSEY 01 / FRONT" className="aspect-[4/5]" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-5">
                <JerseySlot
                  label="DETAIL"
                  caption="Crest"
                  variant="slate"
                  className="aspect-square"
                />
                <JerseySlot
                  label="DETAIL"
                  caption="Fabric"
                  variant="slate"
                  className="aspect-square"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
