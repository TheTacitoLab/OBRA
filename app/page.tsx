import type { Metadata } from "next";
import { Sheets, SheetGroup } from "@/components/home/Sheets";
import { Hero } from "@/components/home/Hero";
import { ScrollCue } from "@/components/home/ScrollCue";
import { WhoFor } from "@/components/home/WhoFor";
import { Statement } from "@/components/home/Statement";
import { WhatWeMake } from "@/components/home/WhatWeMake";
import { WhatWeHandle } from "@/components/home/WhatWeHandle";
import { Overview } from "@/components/home/Overview";
import { FinalCta } from "@/components/home/FinalCta";
import { ArrowLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { JsonLd } from "@/components/site/JsonLd";
import { homeMeta, statements } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { buildHomeSchema } from "@/lib/schema/organization";

export const metadata: Metadata = pageMetadata({
  title: homeMeta.title,
  absolute: true,
  description: homeMeta.description,
  path: "/",
  ogTitle: "Less bland. More brand.",
});

/**
 * The homepage alternates what the studio does with what it believes:
 * a visual chapter (who for, what we make, what we handle), then a
 * statement on a full brand colour, three times over; then the business
 * explained in full, and one way to get in touch.
 *
 * It runs as four stacks of sheets (Sheets.tsx): the hero with Who for,
 * then each statement with the chapter that rises over it. Every stack
 * after the first laps the one before with a rounded edge.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeSchema()} />
      <Reveal />
      <Sheets>
        <SheetGroup>
          <Hero />
          <WhoFor />
        </SheetGroup>
        <SheetGroup lap>
          <Statement id="our-view" tone="lime" lines={statements.product} />
          <WhatWeMake />
        </SheetGroup>
        <SheetGroup lap>
          <Statement
            id="by-collection"
            tone="clay"
            lines={statements.collection}
            textClassName="text-ink"
          />
          <WhatWeHandle />
        </SheetGroup>
        <SheetGroup lap>
          <Statement
            id="full-service"
            tone="ink"
            lines={statements.studio}
            textClassName="text-lime"
          >
            <ArrowLink href="/about/">About madebyobra</ArrowLink>
          </Statement>
          <Overview />
          <FinalCta />
        </SheetGroup>
      </Sheets>
      <ScrollCue />
    </>
  );
}
