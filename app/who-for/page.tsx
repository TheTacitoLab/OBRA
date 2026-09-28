import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { JsonLd } from "@/components/site/JsonLd";
import { audiences, pageHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const page = {
  path: "/who-for/",
  title: "Who for",
  description:
    "madebyobra makes bespoke merchandise for festivals, artists, events and culture-led brands: original products developed around the brand, produced at scale.",
  intro:
    "Festivals, artists, events and culture-led brands. Different audiences, the same approach: original product built around the brand.",
};

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function WhoForPage() {
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
        related={audiences.map((entry) => ({
          label: entry.label,
          href: pageHref(entry.slug),
        }))}
      />
    </>
  );
}
