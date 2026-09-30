import type { ReactNode } from "react";
import { Section, type SectionSize } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { MarkedTitle } from "../site/MarkedTitle";
import { Breadcrumbs } from "../site/Breadcrumbs";
import type { Crumb } from "@/lib/schema/organization";

/**
 * The type-page phone size steps by the title's longest word, so a short
 * title ("Tops", "Headwear") leads its page while an 11-character word
 * ("Merchandise") still fits a 320px viewport and a longer one
 * ("Trainingwear") drops a step. The desktop cap is the same for all.
 */
export type TitleTier = "short" | "mid" | "default" | "long";

export function pageTitleClass(title: string, tier?: TitleTier) {
  const longest = Math.max(
    ...title.split(/\s+/).map((word) => word.replace(/[.,:!?]$/, "").length),
  );
  const chosen: TitleTier =
    tier ??
    (longest <= 7
      ? "short"
      : longest <= 9
        ? "mid"
        : longest <= 11
          ? "default"
          : "long");
  return chosen === "default" ? "type-page" : `type-page type-page-${chosen}`;
}

/**
 * The opening section of a studio page. Two layouts:
 *
 * `full` runs the h1 at type-page across the whole width, with optional
 * breadcrumbs above it and the supporting copy in the right-hand column
 * beneath (the product and audience landing pages, About).
 *
 * The default puts the h1 at type-display-xl into the Editorial composition
 * with the copy beside it, bottom-aligned (the index pages: What we make,
 * Who for, Services).
 *
 * `mark` is the end of the title to set on the lime block, on its own line.
 */
export function PageHero({
  title,
  mark,
  aside,
  full = false,
  size = "large",
  crumbs,
}: {
  title: string;
  mark?: string;
  aside: ReactNode;
  full?: boolean;
  size?: SectionSize;
  /** The page's breadcrumb trail (the same array as its BreadcrumbList). */
  crumbs?: Crumb[];
}) {
  const heading = mark ? <MarkedTitle title={title} mark={mark} /> : title;
  if (full) {
    return (
      <Section tone="bone" size={size} hero>
        {crumbs && <Breadcrumbs crumbs={crumbs} className="mb-6 md:mb-8" />}
        <h1 className={pageTitleClass(title)}>{heading}</h1>
        <div className="mt-head grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
            {aside}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section tone="bone" size={size} hero>
      <Editorial
        stackMd
        heading={<h1 className="type-display-xl">{heading}</h1>}
        aside={aside}
      />
    </Section>
  );
}
