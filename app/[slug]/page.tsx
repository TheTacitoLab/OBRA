import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { PageHero } from "@/components/landing/PageHero";
import { Steps, type Step } from "@/components/landing/Steps";
import { BigList } from "@/components/home/BigList";
import { ArrowLink, Button } from "@/components/site/Button";
import { Editorial } from "@/components/site/Editorial";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import { findProduct, pageHref, primaryCta, products } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema, type Crumb } from "@/lib/schema/organization";

/**
 * One template for the product pages (/headwear/, /t-shirts/, /tops/,
 * /sportswear/, /retro-football-shirts/, /trainingwear/, /accessories/).
 * Every slug in
 * content/site.ts is pre-rendered at build time; anything else is a 404.
 * The audience pages have their own static routes (app/festivals/ etc.).
 */

type Params = { slug: string };

const parent = { label: "What we make", href: "/what-we-make/" };

/** Fallback for a product without its own `develop` steps in content. */
const genericSteps: Step[] = [
  {
    title: "Start from the right base",
    text: "A pattern, fit and construction that has already run in production, so the fundamentals are settled before the brief arrives and the first run can be small without the re-run costing more.",
  },
  {
    title: "Detail it properly",
    text: "Fabric, fit, colour and trims first, then labels, tags and packaging, so the piece reads as part of the collection.",
  },
  {
    title: "Sample, approve, produce",
    text: "Samples for sign-off, then production and quality control through our factory network.",
  },
];

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findProduct(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: pageHref(slug),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = findProduct(slug);
  if (!page) notFound();

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: parent.label, path: parent.href },
    { name: page.label },
  ];
  const others = [
    ...products
      .filter((entry) => entry.slug !== slug)
      .map((entry) => ({ label: entry.label, href: pageHref(entry.slug) })),
    { label: "+ More", href: parent.href },
  ];

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          path: pageHref(slug),
          title: page.title,
          description: page.description,
          crumbs,
        })}
      />

      <PageHero
        full
        title={page.label}
        crumbs={crumbs}
        aside={
          <div className="flex flex-col gap-body">
            <p className="type-lede">{page.intro}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              {page.secondaryCta && (
                <ArrowLink href={page.secondaryCta.href}>
                  {page.secondaryCta.label}
                </ArrowLink>
              )}
            </div>
          </div>
        }
      />

      {/* Heading left, the three steps as a hairline list on the right. */}
      <Section tone="stone">
        <Editorial
          align="start"
          stackMd
          heading={<h2 className="type-display">How we develop it.</h2>}
          aside={<Steps steps={page.develop ?? genericSteps} />}
        />
      </Section>

      <Section tone="ink" size="compact">
        <h2 className="type-display">Also make.</h2>
        <BigList className="mt-body" size="type-link-xs" items={others} />
      </Section>

      <ClosingCta />
    </>
  );
}
