import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

export type Tone = "bone" | "ink" | "stone" | "clay" | "blue-soft" | "lime-soft";
export type SectionSize = "compact" | "default" | "large";

const padding: Record<SectionSize, string> = {
  compact: "py-section-sm",
  default: "py-section",
  large: "py-section-lg",
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
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  size?: SectionSize;
  as?: ElementType;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} data-tone={tone} className={`bg-bg text-fg ${className}`}>
      <Container className={`${padding[size]} ${containerClassName}`}>
        {children}
      </Container>
    </Tag>
  );
}
