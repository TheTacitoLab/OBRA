import type { ReactNode } from "react";
import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";

type Layout = "left" | "centre" | "split";

/**
 * Shared section wrapper for the festival landing page.
 *
 * Labels the section with its own H2 via aria-labelledby, keeps the vertical
 * rhythm consistent and offers the three heading layouts the page uses:
 * left, centred, or split with the heading on one half and the intro on the
 * other. `background` takes one of the blend utilities so the page can flow
 * through colour rather than sitting on flat black.
 */
export function Section({
  id,
  eyebrow,
  heading,
  headingId,
  intro,
  layout = "left",
  background = "",
  size = "default",
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  /** Rendered inside the H2. Accepts a fragment for a multi-line heading. */
  heading: ReactNode;
  headingId: string;
  /** Sits beside the heading when layout is "split", otherwise beneath it. */
  intro?: ReactNode;
  layout?: Layout;
  background?: string;
  size?: "default" | "large";
  children?: ReactNode;
  className?: string;
}) {
  const headingClass =
    size === "large"
      ? "font-display text-[clamp(2.1rem,4.8vw,4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.015em] text-balance text-white"
      : "font-display text-[clamp(1.9rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.015em] text-balance text-white";

  const headingBlock = (
    <>
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2 id={headingId} className={`${eyebrow ? "mt-5" : ""} ${headingClass}`}>
        {heading}
      </h2>
    </>
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`py-20 sm:py-28 md:py-32 ${background} ${className}`}
    >
      <Container>
        {layout === "split" ? (
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>{headingBlock}</div>
            {intro && <div className="text-pretty md:pt-2">{intro}</div>}
          </div>
        ) : layout === "centre" ? (
          <div className="mx-auto max-w-4xl text-center">
            {headingBlock}
            {intro && <div className="text-pretty mt-6">{intro}</div>}
          </div>
        ) : (
          <>
            {headingBlock}
            {intro && <div className="text-pretty mt-6 max-w-3xl">{intro}</div>}
          </>
        )}
        {children}
      </Container>
    </section>
  );
}
