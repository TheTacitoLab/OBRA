import type { CSSProperties, ReactNode } from "react";

/**
 * Infinite horizontal marquee. Content is duplicated so the -50% loop is
 * seamless; pauses on hover, and stops entirely under prefers-reduced-motion
 * (via `.animate-marquee`). Decorative — keep meaningful copy elsewhere too.
 */
export function Marquee({
  children,
  className = "",
  duration = 32,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const style = {
    "--marquee-duration": `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div aria-hidden className={`group flex overflow-hidden ${className}`}>
      <div
        className="flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
        style={style}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
