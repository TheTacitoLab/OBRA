import type { Metadata } from "next";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { PageHero } from "@/components/landing/PageHero";
import { BigList } from "@/components/home/BigList";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import { audiences, pageHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

const page = {
  path: "/who-for/",
  title: "Who for",
  description:
    "madebyobra makes bespoke merchandise for festivals, events, brands and artists: original products developed around the identity, produced at scale.",
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

      <PageHero
        size="default"
        title="Who for."
        aside={
          <div className="flex flex-col gap-head">
            <p className="type-lede">
              Festivals, events, brands and artists. Different audiences, the
              same approach: original product built around the identity, not
              a blank with a logo added.
            </p>
            <p className="type-body text-muted">
              Four pages on what that looks like for each.
            </p>
          </div>
        }
      />

      {/* Each audience once: the enormous link with its sentence beneath. */}
      <Section tone="ink" size="compact">
        <h2 className="sr-only">Who we work with</h2>
        <BigList
          size="type-link"
          items={audiences.map((audience) => ({
            label: audience.label,
            href: pageHref(audience.slug),
            intro: audience.intro,
          }))}
        />
      </Section>

      <ClosingCta />
    </>
  );
}
