import { Hero } from "@/components/sections/Hero";
import { BillingMarquee } from "@/components/BillingMarquee";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { Process } from "@/components/sections/Process";
import { WhyObra } from "@/components/sections/WhyObra";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BillingMarquee />
      <WhoItsFor />
      <WhatYouGet />
      <Process />
      <WhyObra />
      <ClosingCTA />
    </>
  );
}
