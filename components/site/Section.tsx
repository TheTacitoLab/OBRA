import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

export type Tone =
  | "bone"
  | "white"
  | "ink"
  | "stone"
  | "clay"
  | "blue-soft"
  | "lime-soft";
export type SectionSize = "compact" | "default" | "large";

const padding: Record<SectionSize, string> = {
  compact: "py-section-sm",
  default: "py-section",
  large: "py-section-lg",
};
const paddingBottom: Record<SectionSize, string> = {
  compact: "pb-section-sm",
  default: "pb-section",
  large: "pb-section-lg",
};

/**
 * A toned page section with responsive vertical rhythm. Sizes differ on
 * purpose: a page should have compact and large sections, not one height.
 */
export function Section({
  id,
  tone = "bone",
  size = "default",
  as: Tag = "section",
  hero = false,
  rounded = false,
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  size?: SectionSize;
  as?: ElementType;
  /** First section of a page: top padding clears the fixed header. */
  hero?: boolean;
  /** A softly rounded top edge that laps over the section before it. */
  rounded?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  const rhythm = hero ? `hero-pad ${paddingBottom[size]}` : padding[size];
  return (
    <Tag
      id={id}
      data-tone={tone}
      className={`bg-bg text-fg ${rounded ? "section-round" : ""} ${className}`}
    >
      <Container className={`${rhythm} ${containerClassName}`}>
        {children}
      </Container>
    </Tag>
  );
}
