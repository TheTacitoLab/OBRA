import { Sheet } from "./Sheet";
import { Container } from "../site/Container";

export function Collection() {
  return (
    <Sheet id="design-by-collection" tone="clay">
      <Container className="flex flex-1 flex-col justify-between py-28 md:py-36">
        <h2 className="type-display max-w-[9ch]">Design by collection.</h2>
        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12 md:gap-x-12">
          <p className="type-lede max-w-[30ch] text-muted md:col-span-6 lg:col-span-5">
            We build each range as a whole, balancing hero products, accessible
            price points and stronger-margin pieces.
          </p>
          <p className="type-lede max-w-[30ch] text-muted md:col-span-6 lg:col-span-5 lg:col-start-8">
            Then we shape bundles, retail structure and forecasting around the
            audience, so the collection works commercially as well as
            creatively.
          </p>
        </div>
      </Container>
    </Sheet>
  );
}
