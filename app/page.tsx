import type { Metadata } from "next";
import { Sheets } from "@/components/home/Sheets";
import { Hero } from "@/components/home/Hero";
import { ScrollCue } from "@/components/home/ScrollCue";
import { WhoFor } from "@/components/home/WhoFor";
import { Proposition } from "@/components/home/Proposition";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Collection } from "@/components/home/Collection";
import { RetailReady } from "@/components/home/RetailReady";
import { Procurement } from "@/components/home/Procurement";
import { NotesPreview } from "@/components/home/NotesPreview";
import { Contact } from "@/components/home/Contact";
import { Reveal } from "@/components/site/Reveal";
import { JsonLd } from "@/components/site/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { buildHomeSchema } from "@/lib/schema/organization";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "madebyobra | Merchandise and product studio",
  absolute: true,
  description: siteConfig.description,
  path: "/",
  ogTitle: "Less bland. More brand.",
});

/**
 * The homepage sells the idea; the deeper pages explain how it is made.
 * The hero and the audiences stack as sheets; the sections that follow
 * alternate title and copy from side to side, each one settling in as it
 * arrives, on backgrounds with a softly rounded top edge.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeSchema()} />
      <Reveal />
      <Sheets>
        <Hero />
        <WhoFor />
      </Sheets>
      <ScrollCue />
      <Proposition />
      <AboutPreview />
      <Collection />
      <RetailReady />
      <Procurement />
      <NotesPreview />
      <Contact />
    </>
  );
}
