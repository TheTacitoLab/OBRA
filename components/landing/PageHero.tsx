import type { ReactNode } from "react";
import { Section, type SectionSize } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { MarkedTitle } from "../site/MarkedTitle";
import { longestWordEm } from "@/lib/titleFit";

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
 * `full` (the product pages) sizes the h1 to its own words: the
 * longest word fills the space it has, capped higher for a very short title
 * (TOPS) than for the rest. Side by side (a short title from lg, the rest
 * from xl) the copy sits beside the title, not at the far edge: a short
 * title gets a tight composition, a long one wraps across the width the
 * copy leaves and the copy lines up with its last line. Otherwise title,
 * copy and action stack. See .fit-* in globals.css; there are no per-page
 * pixel values.
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
}: {
  title: string;
  mark?: string;
  aside: ReactNode;
  full?: boolean;
  size?: SectionSize;
}) {
  const heading = mark ? <MarkedTitle title={title} mark={mark} /> : title;
  if (full) {
    const em = longestWordEm(title);
    return (
      <Section tone="bone" size={size} hero>
        <div
          className={`fit-hero ${em <= 3.5 ? "fit-hero--short" : ""}`}
          style={{ "--fit-em": em } as React.CSSProperties}
        >
          <h1 className="fit-title">{heading}</h1>
          <div className="fit-aside">{aside}</div>
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
