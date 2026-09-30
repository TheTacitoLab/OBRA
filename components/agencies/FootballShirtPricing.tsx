import { footballShirtPricing, formatQuantity } from "@/content/pricing";

/**
 * The published football-shirt prices as a four-up strip. Only the
 * approved points are shown; nothing between them is implied.
 */
export function FootballShirtPricing() {
  const { minimum, first, last, projectPricedFrom } = footballShirtPricing;
  const rows = [
    { term: "Minimum", value: `${minimum}`, unit: " per design" },
    { term: `At ${formatQuantity(first.quantity)} units`, value: first.price, unit: " each" },
    { term: `At ${formatQuantity(last.quantity)} units`, value: last.price, unit: " each" },
    { term: `${formatQuantity(projectPricedFrom)}+ units`, value: "Priced to the project" },
  ];
  return (
    <dl className="price-list guide-wide" aria-label="Standard custom football shirt pricing">
      {rows.map((row) => (
        <div key={row.term}>
          <dt>{row.term}</dt>
          <dd className={row.unit ? undefined : "price-list__words"}>
            {row.value}
            {row.unit && <small>{row.unit}</small>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
