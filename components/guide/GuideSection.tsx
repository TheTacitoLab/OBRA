import type { ReactNode } from "react";

/**
 * One chapter of a long-form guide: a small numbered kicker (the contents
 * label, so a reader arriving from the contents knows where they are), the
 * H2, then the body. Direct children sit on the reading measure; anything
 * marked `guide-wide` (bands, pricing, panels) takes the full main column.
 *
 * `tone` turns the chapter into a full panel: "ink" for the one dark
 * feature, "stone" for the summary. Panels bleed to the screen edge below
 * lg and sit in the main column beside the contents from lg.
 */
export function GuideSection({
  id,
  number,
  label,
  title,
  titleClassName = "guide-h2",
  tone,
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: ReactNode;
  titleClassName?: string;
  tone?: "ink" | "stone";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-tone={tone}
      className={`guide-section ${tone ? `guide-panel bg-bg text-fg` : ""}`}
    >
      <header className="guide-head" data-reveal="soft">
        <p className="guide-kicker">
          <span>{number}</span>
          {label}
        </p>
        <h2 id={`${id}-title`} className={titleClassName}>
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

/**
 * An editorial pull line: set large in the display face, the key words on
 * the lime block, a rule above. For advice worth remembering, not for
 * repeating what the paragraph above just said.
 */
export function Callout({
  children,
  support,
}: {
  children: ReactNode;
  support?: ReactNode;
}) {
  return (
    <div className="callout guide-wide" data-reveal="soft">
      <p className="callout__text">{children}</p>
      {support && <p className="callout__support">{support}</p>}
    </div>
  );
}
