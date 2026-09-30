import { ArrowLink } from "../site/Button";

export type TocEntry = { id: string; label: string };

/** Two-digit section number, shared by the contents and the section kickers. */
export const sectionNumber = (index: number) => String(index + 1).padStart(2, "0");

/**
 * The contents list itself: ordinary fragment links, so every section is
 * reachable without JavaScript. TocSpy marks the current one.
 */
function TocList({ entries }: { entries: TocEntry[] }) {
  return (
    <ol className="toc">
      {entries.map((entry, index) => (
        <li key={entry.id}>
          <a href={`#${entry.id}`} className="toc-link" data-toc-link="">
            <span className="toc-num" aria-hidden="true">
              {sectionNumber(index)}
            </span>
            <span>{entry.label}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Desktop contents: a sticky rail beside the reading column, from lg. The
 * phone and tablet version is TocDisclosure; only one of the two is ever
 * displayed, so assistive tech meets one "On this page" navigation.
 */
export function TocRail({
  entries,
  cta,
}: {
  entries: TocEntry[];
  cta?: { label: string; href: string; track?: string };
}) {
  return (
    <nav aria-labelledby="toc-rail-title" className="guide-rail">
      <p id="toc-rail-title" className="eyebrow">
        On this page
      </p>
      <TocList entries={entries} />
      {cta && (
        <div className="mt-6 border-t border-line pt-4">
          <ArrowLink href={cta.href} track={cta.track}>
            {cta.label}
          </ArrowLink>
        </div>
      )}
    </nav>
  );
}

/** Phones and tablets: the same list folded into a native disclosure. */
export function TocDisclosure({ entries }: { entries: TocEntry[] }) {
  return (
    <nav aria-label="On this page" className="toc-disclosure lg:hidden">
      <details>
        <summary className="toc-summary">
          <span className="eyebrow">On this page</span>
          <span className="plus-icon" aria-hidden="true" />
        </summary>
        <TocList entries={entries} />
      </details>
    </nav>
  );
}
