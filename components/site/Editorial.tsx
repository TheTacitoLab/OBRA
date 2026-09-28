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
  headingAlign = "left",
  mobileAlignRight = false,
  align = "end",
  className = "",
}: {
  heading: ReactNode;
  aside?: ReactNode;
  reverse?: boolean;
  headingAlign?: "left" | "right";
  mobileAlignRight?: boolean;
  align?: "start" | "end";
  className?: string;
}) {
  const headingCols = reverse
    ? "md:col-span-7 md:col-start-6 md:order-2"
    : "md:col-span-7 lg:col-span-8";
  const asideCols = reverse
    ? "md:col-span-5 md:col-start-1 md:order-1 lg:col-span-4"
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
      <div className={`${headingCols} ${headingText}`}>{heading}</div>
      {aside && <div className={asideCols}>{aside}</div>}
    </div>
  );
}
