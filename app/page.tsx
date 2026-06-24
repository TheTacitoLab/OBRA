import { Hero } from "@/components/sections/Hero";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { Process } from "@/components/sections/Process";
import { WhyObra } from "@/components/sections/WhyObra";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Marquee } from "@/components/Marquee";
import { Asterisk } from "@/components/brand/Marks";

// Decorative billing strip — festival "line-up" energy. The same deliverables
// appear, accessibly, in the What You Get list.
const lineup = [
  "Design concept",
  "Artwork direction",
  "Jersey mockups",
  "Tech pack",
  "Sample",
  "Production",
  "Packaging",
];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="border-y border-line bg-obsidian py-5">
        <Marquee duration={42}>
          {lineup.map((word) => (
            <span key={word} className="flex items-center">
              <span className="px-7 text-label text-ash">{word}</span>
              <Asterisk className="h-3.5 w-3.5 text-coral" />
            </span>
          ))}
        </Marquee>
      </div>

      <WhoItsFor />
      <WhatYouGet />
      <Process />
      <WhyObra />
      <ClosingCTA />
    </>
  );
}
