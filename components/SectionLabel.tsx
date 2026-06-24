import type { ReactNode } from "react";

/** Mono micro-label for section eyebrows, e.g. "WHO IT'S FOR". */
export function SectionLabel({
  children,
  className = "",
  tone = "text-yellow",
}: {
  children: ReactNode;
  className?: string;
  tone?: string;
}) {
  return <p className={`text-label ${tone} ${className}`}>{children}</p>;
}
