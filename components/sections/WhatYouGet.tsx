import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { Polaroid } from "../Polaroid";
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

          <Reveal className="md:h-full">
            <div className="relative mx-auto flex max-w-sm flex-col items-center md:block md:h-full md:max-w-none">
              <Polaroid
                src="/jerseys/obra-jersey-front.webp"
                alt="OBRA black-and-white striped football jersey with number 10, worn by a model"
                caption="OBRA · 10"
                className="w-[80%] -rotate-3 md:absolute md:left-0 md:top-[3%] md:w-[57%] md:-rotate-6"
              />
              <Polaroid
                src="/jerseys/obra-jersey-detail.webp"
                alt="OBRA jersey collar label and swing tag with a gold lion crest"
                caption="OBRA · Crest"
                className="-mt-10 w-[74%] rotate-3 md:absolute md:bottom-[3%] md:right-0 md:z-10 md:mt-0 md:w-[53%] md:rotate-[5deg]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
