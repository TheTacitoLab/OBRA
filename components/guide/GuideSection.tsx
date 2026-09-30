import type { ReactNode } from "react";

/**
 * One chapter of a long-form guide: the H2, then the body. Direct children
 * sit on the reading measure; anything marked `guide-wide` (bands, prices,
 * callouts) takes the full container. Chapters are separated by space,
 * not rules, and do not animate: the read stays calm.
 *
 * `tone` turns a chapter into a rounded panel (the short version, on stone).
 */
export function GuideSection({
  id,
  title,
  tone,
  children,
}: {
  id: string;
  title: ReactNode;
  tone?: "stone";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-tone={tone}
      className={`guide-section ${tone ? "guide-panel guide-wide bg-bg text-fg" : ""}`}
    >
      <h2 id={`${id}-title`} className="guide-h2">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * A broad editorial interruption across the container, on a softly rounded
 * block: lime with ink type, ink with bone type, or stone with a lime
 * detail. The key words can sit on the lime block (.mark). Use a few, for
 * advice worth remembering, not for repeating the paragraph above.
 */
export function Callout({
  children,
  support,
  tone = "lime",
}: {
  children: ReactNode;
  support?: ReactNode;
  tone?: "lime" | "ink" | "stone";
}) {
  return (
    <div
      className={`callout callout--${tone} guide-wide`}
      data-tone={tone === "lime" ? undefined : tone}
    >
      <p className="callout__text">{children}</p>
      {support && <p className="callout__support">{support}</p>}
    </div>
  );
}
