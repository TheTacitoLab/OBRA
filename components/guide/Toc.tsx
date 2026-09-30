export type TocEntry = { id: string; label: string };

/**
 * "On this page": one quiet contents block at the start of a long read.
 * Ordinary fragment links on the reading column, two across where it has
 * room and one on phones; nothing sticky, no highlighting, no script.
 */
export function OnThisPage({ entries }: { entries: TocEntry[] }) {
  return (
    <nav aria-labelledby="on-this-page" className="on-this-page">
      <h2 id="on-this-page" className="eyebrow">
        On this page
      </h2>
      <ol>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`}>{entry.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
