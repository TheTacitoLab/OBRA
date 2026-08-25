import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { Process } from "@/components/sections/Process";
import { Packages } from "@/components/sections/Packages";
import { WhyObra } from "@/components/sections/WhyObra";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Overview } from "@/components/sections/Overview";
import { pageMetadata } from "@/lib/metadata";
import { buildOrganizationSchema } from "@/lib/schema/organization";
import { siteConfig } from "@/lib/siteConfig";

// Canonical and og:url resolve against `metadataBase` in the root layout,
// trailing-slashed to match `trailingSlash: true`.
export const metadata: Metadata = pageMetadata({
  title: "Football Jerseys From Concept to Creation | OBRA",
  absolute: true,
  description: siteConfig.description,
  path: "/",
  ogTitle: "Football Jerseys From Concept to Creation",
});

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, first-party JSON built at compile time from site constants.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationSchema()),
        }}
      />

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
