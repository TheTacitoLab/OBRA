import type { Metadata } from "next";
import { Sheets } from "@/components/home/Sheets";
import { Hero } from "@/components/home/Hero";
import { WhoFor } from "@/components/home/WhoFor";
import { WhatWeMake } from "@/components/home/WhatWeMake";
import { Proposition } from "@/components/home/Proposition";
import { Services } from "@/components/home/Services";
import { Collection } from "@/components/home/Collection";
import { Procurement } from "@/components/home/Procurement";
import { SelectedProducts } from "@/components/home/SelectedProducts";
import { AboutPreview } from "@/components/home/AboutPreview";
import { NotesPreview } from "@/components/home/NotesPreview";
import { Contact } from "@/components/home/Contact";
import { JsonLd } from "@/components/site/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { buildHomeSchema } from "@/lib/schema/organization";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = pageMetadata({
  title: "madebyobra | Bespoke merchandise studio",
  absolute: true,
  description: siteConfig.description,
  path: "/",
  ogTitle: "More product. Less promo.",
});

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeSchema()} />
      {/* The opening three chapters stack as sheets; the rest of the page
          flows normally with sections of deliberately different heights. */}
      <Sheets>
        <Hero />
        <WhoFor />
        <WhatWeMake />
      </Sheets>
      <Proposition />
      <Services />
      <Collection />
      <Procurement />
      <SelectedProducts />
      <AboutPreview />
      <NotesPreview />
      <Contact />
    </>
  );
}
