export type Step = { title: string; text?: string };

/**
 * A numbered hairline list: the three development steps on a product page,
 * the six project steps on About. Number in a narrow left column, title and
 * copy stacked beside it. With `wide` (full-width lists only) the title and
 * copy sit side by side from lg, so each step reads as one row.
 */
export function Steps({
  steps,
  wide = false,
  className = "",
}: {
  steps: Step[];
  wide?: boolean;
  className?: string;
}) {
  const row = wide
    ? "lg:grid-cols-[3rem_minmax(0,18rem)_minmax(0,1fr)] lg:gap-x-12"
    : "";
  const text = wide ? "lg:col-start-3 lg:mt-0" : "";
  return (
    <ol className={`index-list ${className}`}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={`index-row grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 ${row}`}
        >
          <span className="type-meta pt-1 text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="type-title">{step.title}</h3>
          {step.text && (
            <p className={`type-body col-start-2 mt-2 text-muted ${text}`}>
              {step.text}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
