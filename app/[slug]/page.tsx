import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { JsonLd } from "@/components/site/JsonLd";
import {
  audiences,
  findLandingPage,
  pageHref,
  products,
} from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

/**
 * One template for the audience pages (/festivals/, /artists/, /events/,
 * /culture-led-brands/) and the product pages (/headwear/, /t-shirts/, /tops/,
 * /sportswear/, /retro-football-shirts/, /trainingwear/). Every slug is
 * pre-rendered at build time; anything else is a 404.
 */

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return [...audiences, ...products].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findLandingPage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: pageHref(slug),
  });
}

export default async function Landing({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = findLandingPage(slug);
  if (!page) notFound();

  const isAudience = audiences.some((entry) => entry.slug === slug);
  const parent = isAudience
    ? { label: "Who for", href: "/who-for/" }
    : { label: "What we make", href: "/what-we-make/" };
  const siblings = (isAudience ? audiences : products)
    .filter((entry) => entry.slug !== slug)
    .map((entry) => ({ label: entry.label, href: pageHref(entry.slug) }));
  const related = isAudience
    ? siblings
    : [...siblings, { label: "+ More", href: "/what-we-make/" }];

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          path: pageHref(slug),
          title: page.title,
          description: page.description,
          crumbs: [
            { name: "Home", path: "/" },
            { name: parent.label, path: parent.href },
            { name: page.title },
          ],
        })}
      />
      <LandingPage
        title={page.title}
        intro={page.intro}
        parent={parent}
        related={related}
        relatedTitle={isAudience ? "Also for." : "Also make."}
      />
    </>
  );
}
