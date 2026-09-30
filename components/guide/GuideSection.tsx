import type { ReactNode } from "react";

/** Two-digit section number, shared by the contents and the chapters. */
export const sectionNumber = (index: number) => String(index + 1).padStart(2, "0");

/**
 * One numbered chapter of a long-form guide, always the same anatomy:
 * number and title, a short introduction opposite them (beneath them on
 * narrow columns), then the body. The body sits on the reading measure;
 * callouts and the few structured blocks (bands, prices) take the whole
 * article column. Chapters are separated by space alone and do not animate.
 */
export function GuideChapter({
  id,
  number,
  title,
  intro,
  final = false,
  children,
}: {
  id: string;
  number: string;
  title: ReactNode;
  intro: ReactNode;
  /** The closing chapter: the same anatomy on a stone panel. */
  final?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-tone={final ? "stone" : undefined}
      className={`chapter ${final ? "chapter--final bg-bg text-fg" : ""}`}
    >
      <div className="chapter__open">
        <div>
          <p className="chapter__num" aria-hidden="true">
            {number}
          </p>
          <h2 id={`${id}-title`} className="chapter__title">
            {title}
          </h2>
        </div>
        <p className="chapter__intro">{intro}</p>
      </div>
      <div className="chapter__body">{children}</div>
    </section>
  );
}

/**
 * The guide's one callout: a line worth remembering, in the display face on
 * a softly rounded lime block. Used a few times across the whole guide.
 */
export function Callout({
  children,
  support,
}: {
  children: ReactNode;
  support?: ReactNode;
}) {
  return (
    <div className="callout">
      <p className="callout__text">{children}</p>
      {support && <p className="callout__support">{support}</p>}
    </div>
  );
}
