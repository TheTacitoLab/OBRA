import type { ReactNode } from "react";

/**
 * The asymmetric editorial composition used through the site: a large
 * heading across roughly 60% of the width and supporting content across
 * roughly 30%, bottom-aligned. `reverse` puts the content first and the
 * heading on the right; `headingAlign` right-aligns the heading (desktop
 * and, with `mobileAlignRight`, on phones too, while copy stays left).
 */
export function Editorial({
  heading,
  aside,
  reverse = false,
  wide = false,
  stackMd = false,
  headingAlign = "left",
  mobileAlignRight = false,
  align = "end",
  className = "",
}: {
  heading: ReactNode;
  aside?: ReactNode;
  /** Content first, heading on the right. Stacks on tablets, splits from lg. */
  reverse?: boolean;
  /** Heading takes 8 columns from lg (used with `reverse` for long lines). */
  wide?: boolean;
  /** Stack on tablets and split only from lg (for asides that hold lists). */
  stackMd?: boolean;
  headingAlign?: "left" | "right";
  mobileAlignRight?: boolean;
  align?: "start" | "end";
  className?: string;
}) {
  const headingCols = reverse
    ? wide
      ? "md:col-span-12 lg:col-span-8 lg:col-start-5 lg:order-2"
      : "md:col-span-12 lg:col-span-7 lg:col-start-6 lg:order-2"
    : stackMd
      ? "md:col-span-12 lg:col-span-8"
      : "md:col-span-7 lg:col-span-8";
  const asideCols = reverse
    ? "md:col-span-8 lg:col-span-4 lg:col-start-1 lg:order-1"
    : stackMd
      ? "md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9"
      : "md:col-span-5 lg:col-span-4 lg:col-start-9";
  const headingText = [
    headingAlign === "right" ? "md:text-right" : "",
    mobileAlignRight ? "text-right md:text-left" : "",
    mobileAlignRight && headingAlign === "right" ? "md:text-right" : "",
  ].join(" ");
  const alignItems = align === "end" ? "md:items-end" : "md:items-start";

  return (
    <div
      className={`grid gap-y-head md:grid-cols-12 md:gap-x-8 lg:gap-x-12 ${alignItems} ${className}`}
    >
      <div
        className={`${headingCols} ${headingText}`}
        data-reveal={reverse ? "right" : "left"}
      >
        {heading}
      </div>
      {aside && <div className={`reveal-after ${asideCols}`}>{aside}</div>}
    </div>
  );
}
