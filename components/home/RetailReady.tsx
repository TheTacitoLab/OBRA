import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";
import { MarkedTitle } from "../site/MarkedTitle";

/** What "ready" covers, as plain words rather than tags. */
const covers = [
  "Packaging",
  "Labels",
  "SKUs",
  "Barcodes",
  "Product data",
  "POS preparation",
  "Stock information",
  "Fulfilment preparation",
];

/**
 * Retail ready: the commercial side of the product, between What we make
 * and Services. Heading left with the block on READY., copy right, then the
 * eight things it covers as a quiet typographic grid.
 */
export function RetailReady() {
  return (
    <Section id="retail-ready" tone="stone" rounded>
      <Editorial
        heading={
          <h2 className="type-display">
            <MarkedTitle title="Retail ready." mark="ready." />
          </h2>
        }
        aside={
          <div className="flex flex-col gap-5" data-reveal-group="right">
            <p className="type-lede">
              Good merchandise still has to work when it reaches the real world.
            </p>
            <p className="type-body text-muted">
              We can prepare products with the packaging, labels, SKUs, barcodes
              and stock information needed for retail, events and fulfilment.
            </p>
            <div>
              <ArrowLink href="/services/#event-support">
                Retail &amp; event support
              </ArrowLink>
            </div>
          </div>
        }
      />
      <ul
        aria-label="What retail ready covers"
        className="mt-body grid gap-x-6 gap-y-3 min-[25rem]:grid-cols-2 md:grid-cols-4 md:gap-y-4 md:mt-section-sm xl:max-w-[70rem]"
        data-reveal-group="up"
      >
        {covers.map((item) => (
          <li key={item} className="type-title">
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
