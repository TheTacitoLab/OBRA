import Link from "next/link";
import type { ReactNode } from "react";

/** Thin arrow used by buttons and arrow links. Decorative. */
export function Arrow({ className = "btn__arrow" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

type Variant = "primary" | "outline" | "nav";

/**
 * Solid, squared button. `plain` renders an <a> instead of next/link, for
 * in-page hash links the sheet script handles itself. `track` names the
 * click event (components/site/Attribution.tsx); a tracked link is always a
 * plain anchor, because the tracker decorates links to the brief form at
 * click time and next/link would navigate to its own href instead.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  plain = false,
  track,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  plain?: boolean;
  track?: string;
}) {
  const classes = `btn btn-${variant} ${className}`;
  if (plain || track) {
    return (
      <a href={href} className={classes} data-track={track}>
        <span>{children}</span>
        <Arrow />
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

/** Secondary action: text with an accent underline wipe and an arrow. */
export function ArrowLink({
  href,
  children,
  className = "",
  plain = false,
  track,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  plain?: boolean;
  track?: string;
}) {
  const classes = `link-arrow ${className}`;
  const inner = (
    <>
      <span className="u-wipe u-accent">{children}</span>
      <Arrow />
    </>
  );
  if (plain || track) {
    return (
      <a href={href} className={classes} data-track={track}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
