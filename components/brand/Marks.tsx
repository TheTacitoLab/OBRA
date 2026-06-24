import type { SVGProps } from "react";

/**
 * Brand marks. Inline SVG so they inherit `currentColor` - colour them with
 * text colour (e.g. `className="text-coral"`). Decorative by default
 * (aria-hidden); pass a `title`/role if a mark ever needs to be announced.
 */

type MarkProps = SVGProps<SVGSVGElement>;

/** Recurring six-point asterisk motif - section markers, bullets, scroll cue. */
export function Asterisk({
  strokeWidth = 2.4,
  ...props
}: MarkProps & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3.5v17M4.65 7.75l14.7 8.5M19.35 7.75l-14.7 8.5" />
    </svg>
  );
}

/** Four-point sparkle. */
export function Star(props: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 1.5c.9 5.6 3.4 8.1 9 9-5.6.9-8.1 3.4-9 9-.9-5.6-3.4-8.1-9-9 5.6-.9 8.1-3.4 9-9Z" />
    </svg>
  );
}

/** Arrow - CTAs and "next" cues. Rotate 90deg for a downward scroll cue. */
export function Arrow({
  strokeWidth = 2,
  ...props
}: MarkProps & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
