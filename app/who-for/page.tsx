import type { Metadata } from "next";
import Link from "next/link";
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

      <Section tone="ink" size="compact">
        <h2 className="sr-only">Who we work with</h2>
        <BigList
          size="type-link"
          items={audiences.map((audience) => ({
            label: audience.label,
            href: pageHref(audience.slug),
          }))}
        />
      </Section>

      {/* Short column left, the four audiences as a two-column hairline list. */}
      <Section tone="bone" size="compact">
        <div className="grid gap-y-head md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4 lg:col-span-3">
            <h2 className="type-headline">In brief.</h2>
            <p className="type-body mt-3 max-w-[26ch] text-muted">
              What the range has to do changes. How we make it does not.
            </p>
          </div>
          <ul className="grid border-t border-line md:col-span-8 md:grid-cols-2 md:gap-x-8 lg:col-span-9 lg:gap-x-12">
            {audiences.map((audience) => (
              <li
                key={audience.slug}
                className="border-b border-line py-5 md:py-6"
              >
                <h3 className="type-title">
                  {/* 44px tap target; the underline stays on the text. */}
                  <Link
                    href={pageHref(audience.slug)}
                    className="-my-3 inline-block py-3"
                  >
                    <span className="u-wipe">{audience.label}</span>
                  </Link>
                </h3>
                <p className="type-body mt-2 max-w-[36ch] text-muted">
                  {audience.intro}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
