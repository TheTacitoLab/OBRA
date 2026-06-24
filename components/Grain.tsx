import type { CSSProperties } from "react";

/**
 * Film-grain overlay (desaturated fractal-noise SVG, see `.bg-grain`).
 * Drop it over the gradient or any coloured panel. Decorative + non-interactive.
 */
export function Grain({
  className = "",
  opacity = 0.13,
  blend = "soft-light",
}: {
  className?: string;
  opacity?: number;
  blend?: CSSProperties["mixBlendMode"];
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-grain ${className}`}
      style={{ opacity, mixBlendMode: blend }}
    />
  );
}
