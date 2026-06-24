import { Hero } from "@/components/sections/Hero";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { Process } from "@/components/sections/Process";
import { WhyObra } from "@/components/sections/WhyObra";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoItsFor />
      <WhatYouGet />
      <Process />
      <WhyObra />
      <ClosingCTA />
    </>
  );
}
