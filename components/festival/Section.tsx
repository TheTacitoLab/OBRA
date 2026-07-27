import type { ReactNode } from "react";
import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";

/**
 * Shared section wrapper for the festival landing page. Labels the section with
 * its own H2 via aria-labelledby and keeps the vertical rhythm consistent with
 * the rest of the site.
 */
export function Section({
  id,
  eyebrow,
  heading,
  headingId,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  /** Rendered inside the H2. Accepts a fragment for a two-line heading. */
  heading: ReactNode;
  headingId: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`py-20 sm:py-28 md:py-32 ${className}`}
    >
      <Container>
        {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
        <h2
          id={headingId}
          className={`font-display text-[clamp(1.9rem,4vw,3.25rem)] font-extrabold uppercase leading-[1.03] tracking-[-0.015em] text-white ${
            eyebrow ? "mt-5" : ""
          }`}
        >
          {heading}
        </h2>
        {children}
      </Container>
    </section>
  );
}
