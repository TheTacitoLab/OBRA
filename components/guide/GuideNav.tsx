import { sectionNumber } from "./GuideSection";

export type GuideNavEntry = { id: string; label: string; short: string };

/**
 * The guide's contents, in two forms that are never shown together: a
 * sticky rail beside the article from lg, and on phones and tablets a
 * compact strip that sticks under the site header and scrolls sideways.
 * Both live inside the guide, so they only appear once the reader reaches
 * it and leave when it ends. Plain fragment links; GuideSpy marks the
 * current section (aria-current) and keeps it in view within the strip.
 */
export function GuideRail({ entries }: { entries: GuideNavEntry[] }) {
  return (
    <nav aria-labelledby="guide-rail-title" className="guide-rail">
      <p id="guide-rail-title" className="eyebrow">
        On this page
      </p>
      <ol>
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="guide-link" data-guide-link="">
              <span className="guide-link__num" aria-hidden="true">
                {sectionNumber(index)}
              </span>
              <span>{entry.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuideStrip({ entries }: { entries: GuideNavEntry[] }) {
  return (
    <nav aria-label="On this page" className="guide-strip">
      <ol>
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="guide-link" data-guide-link="">
              <span className="guide-link__num" aria-hidden="true">
                {sectionNumber(index)}
              </span>
              <span>{entry.short}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
