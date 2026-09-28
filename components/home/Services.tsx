import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { ServicesGrid } from "./ServicesGrid";

export function Services() {
  return (
    <Sheet id="services" tone="bone">
      <Container className="flex flex-1 flex-col py-28 md:py-36">
        <h2 className="type-display">Our services.</h2>
        <div className="mt-14 md:mt-20">
          <ServicesGrid />
        </div>
      </Container>
    </Sheet>
  );
}
