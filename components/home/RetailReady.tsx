import { Sheet } from "./Sheet";
import { Container } from "../site/Container";

export function RetailReady() {
  return (
    <Sheet id="retail-ready" tone="stone">
      <Container className="flex flex-1 flex-col justify-between py-28 md:py-36">
        <h2 className="type-display max-w-[10ch]">From idea to retail-ready.</h2>
        <div className="mt-16 md:mt-24 md:grid md:grid-cols-12">
          <p className="type-lede max-w-[34ch] md:col-span-7 lg:col-span-6">
            We manage the whole project from the first brief through to
            production and delivery, so the finished product arrives at your
            door ready to sell or gift.
          </p>
        </div>
      </Container>
    </Sheet>
  );
}
