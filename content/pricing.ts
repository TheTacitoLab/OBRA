/**
 * Published prices. Only approved figures go here, exactly as approved:
 * intermediate price breaks that have not been supplied are not published
 * and must not be interpolated.
 *
 * Standard custom football shirts, approved September 2026. Still to
 * confirm before adding to the copy: whether the prices include VAT, and
 * what the standard specification includes.
 */
export const footballShirtPricing = {
  /** Minimum order, per design. */
  minimum: 25,
  first: { quantity: 25, price: "£26.95" },
  last: { quantity: 2500, price: "£15.95" },
  /** At and above this quantity, priced to the project. */
  projectPricedFrom: 5000,
} as const;

export const formatQuantity = (quantity: number) =>
  quantity.toLocaleString("en-GB");
