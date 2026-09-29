export type Step = { title: string; text?: string };

/**
 * A hairline list of steps: the development steps on a product page, the
 * project steps on About. Title and copy stacked; with `wide` (full-width
 * lists only) they sit side by side from lg, so each step reads as one row.
 * Separators run between rows only.
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
  const row = wide ? "lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-x-12" : "";
  const text = wide ? "lg:mt-0" : "";
  return (
    <ol className={`index-list ${className}`}>
      {steps.map((step) => (
        <li key={step.title} className={`index-row grid ${row}`}>
          <h3 className="type-title">{step.title}</h3>
          {step.text && (
            <p className={`type-body mt-2 text-muted ${text}`}>{step.text}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
