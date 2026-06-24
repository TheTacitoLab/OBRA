import type { ReactNode } from "react";
import { Asterisk } from "./brand/Marks";

/** Mono micro-label with the asterisk motif - e.g. "01 / WHO IT'S FOR". */
export function SectionLabel({
  children,
  className = "",
  tone = "text-ash",
}: {
  children: ReactNode;
  className?: string;
  tone?: string;
}) {
  return (
    <p className={`flex items-center gap-3 text-label ${tone} ${className}`}>
      <Asterisk className="h-3.5 w-3.5 text-yellow" />
      <span>{children}</span>
    </p>
  );
}
