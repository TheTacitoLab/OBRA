import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { JsonLd } from "@/components/site/JsonLd";
import { pageHref, products } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const page = {
  path: "/what-we-make/",
  title: "What we make",
  description:
    "Headwear, t-shirts, tops, sportswear, retro football shirts, trainingwear and more: bespoke merchandise from madebyobra, developed around your brand.",
  intro:
    "Proven product blocks across headwear, tees, tops, sportswear and more, developed into pieces that feel like part of your collection.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function WhatWeMakePage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          ...page,
          crumbs: [{ name: "Home", path: "/" }, { name: page.title }],
        })}
      />
      <LandingPage
        title={`${page.title}.`}
        intro={page.intro}
        related={products.map((entry) => ({
          label: entry.label,
          href: pageHref(entry.slug),
        }))}
      />
    </>
  );
}
