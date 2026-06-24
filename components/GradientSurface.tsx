import type { ReactNode } from "react";
import { Grain } from "./Grain";

/**
 * Full-bleed brand gradient surface with film grain and a slow, subtle drift
 * (disabled under prefers-reduced-motion via the `.animate-drift` rule).
 *
 * - `intensity="soft"` adds a void wash so the colour reads more restrained.
 * - `topScrim` / `bottomScrim` fade the edges to void so the section can blend
 *   smoothly into the black surfaces above/below it.
 */
export function GradientSurface({
  children,
  className = "",
  intensity = "full",
  drift = true,
  bottomScrim = true,
  topScrim = false,
}: {
  children?: ReactNode;
  className?: string;
  intensity?: "full" | "soft";
  drift?: boolean;
  bottomScrim?: boolean;
  topScrim?: boolean;
}) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <div
        aria-hidden
        className={`absolute inset-0 obra-gradient ${drift ? "animate-drift" : ""}`}
      />
      {intensity === "soft" && (
        <div aria-hidden className="absolute inset-0 scrim-soft" />
      )}
      <Grain opacity={0.14} />
      {topScrim && <div aria-hidden className="absolute inset-0 scrim-top" />}
      {bottomScrim && <div aria-hidden className="absolute inset-0 scrim-bottom" />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
