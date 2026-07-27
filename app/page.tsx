import { Hero } from "@/components/sections/Hero";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { Process } from "@/components/sections/Process";
import { Packages } from "@/components/sections/Packages";
import { WhyObra } from "@/components/sections/WhyObra";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Overview } from "@/components/sections/Overview";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoItsFor />
      <WhatYouGet />
      <Process />
      <Packages />
      <WhyObra />
      <ClosingCTA />
      <Overview />
    </>
  );
}
