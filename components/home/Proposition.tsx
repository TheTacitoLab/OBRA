import { Sheet } from "./Sheet";
import { Container } from "../site/Container";

export function Proposition() {
  return (
    <Sheet id="proposition" tone="bone">
      <Container className="flex flex-1 flex-col justify-center py-28 md:py-36">
        <h2 className="type-display max-w-[14ch]">
          Your merchandise should feel like your product.
        </h2>
        <div className="mt-12 md:mt-16 md:grid md:grid-cols-12">
          <p className="type-lede max-w-[28ch] md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
            Proven product blocks give us the starting point. Everything else
            is built around your brand.
          </p>
        </div>
      </Container>
    </Sheet>
  );
}
