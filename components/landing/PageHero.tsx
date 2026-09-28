import Link from "next/link";
import type { ReactNode } from "react";
import { Section, type SectionSize } from "../site/Section";
import { Editorial } from "../site/Editorial";

export type Parent = { label: string; href: string };

/**
 * Top padding that clears the fixed header on every page hero, from the
 * same tokens the sections use (see --spacing-header in globals.css).
 */
const heroTop = "pt-hero";

/**
 * The type-page size is tuned so an 11-character word ("MERCHANDISE") fits
 * a 320px viewport. A longer word (there is one: "Trainingwear") drops to
 * 12vw so it still clears the gutters; the cap stays the same on desktop.
 */
function pageTitleClass(title: string) {
  const longest = Math.max(
    ...title.split(/\s+/).map((word) => word.replace(/[.,]$/, "").length),
  );
  return longest > 11 ? "type-page type-page-long" : "type-page";
}

/**
 * The opening section of a studio page. Two layouts:
 *
 * `full` runs the h1 at type-page across the whole width, with an optional
 * parent link above it and the supporting copy in the right-hand column
 * beneath (the product and audience landing pages, About).
 *
 * The default puts the h1 at type-display-xl into the Editorial composition
 * with the copy beside it, bottom-aligned (the index pages: What we make,
 * Who for, Services).
 */
export function PageHero({
  title,
  aside,
  parent,
  full = false,
  size = "large",
}: {
  title: string;
  aside: ReactNode;
  parent?: Parent;
  full?: boolean;
  size?: SectionSize;
}) {
  if (full) {
    return (
      <Section tone="bone" size={size} containerClassName={heroTop}>
        {parent && (
          <p className="type-small text-muted">
            {/* 44px tap target; the underline stays on the text via the span. */}
            <Link
              href={parent.href}
              className="inline-flex min-h-11 items-center"
            >
              <span className="u-wipe">{parent.label}</span>
            </Link>
          </p>
        )}
        <h1 className={`${pageTitleClass(title)} ${parent ? "mt-2 md:mt-4" : ""}`}>
          {title}
        </h1>
        <div className="mt-head grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
            {aside}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section tone="bone" size={size} containerClassName={heroTop}>
      <Editorial
        heading={<h1 className="type-display-xl">{title}</h1>}
        aside={aside}
      />
    </Section>
  );
}
