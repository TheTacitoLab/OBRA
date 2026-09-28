import type { Metadata } from "next";
import { Sheets } from "@/components/home/Sheets";
import { Hero } from "@/components/home/Hero";
import { WhoFor } from "@/components/home/WhoFor";
import { Proposition } from "@/components/home/Proposition";
import { RetailReady } from "@/components/home/RetailReady";
import { Services } from "@/components/home/Services";
import { Collection } from "@/components/home/Collection";
import { WhatWeMake } from "@/components/home/WhatWeMake";
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
      <Sheets>
        <Hero />
        <WhoFor />
        <Proposition />
        <RetailReady />
        <Services />
        <Collection />
        <WhatWeMake />
        <Contact />
      </Sheets>
    </>
  );
}
