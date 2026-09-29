import type { ReactNode } from "react";

export type Tone = "bone" | "ink" | "stone" | "clay" | "blue";

/**
 * One homepage chapter. Full viewport height minimum, its own tone, and the
 * inner wrapper that Sheets.tsx moves and dims as the next chapter rises.
 */
export function Sheet({
  id,
  tone,
  last = false,
  className = "",
  sectionClassName = "",
  children,
}: {
  id: string;
  tone: Tone;
  last?: boolean;
  className?: string;
  sectionClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      data-last={last ? "true" : undefined}
      className={`sheet ${sectionClassName}`}
    >
      <div className={`sheet__inner ${className}`}>{children}</div>
    </section>
  );
}
