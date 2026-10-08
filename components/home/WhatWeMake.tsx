import { Sheet } from "./Sheet";
import { Collage } from "./Collage";
import { Container } from "../site/Container";
import { Editorial } from "../site/Editorial";
import { Button } from "../site/Button";
import { MarkedTitle } from "../site/MarkedTitle";
import { whatWeMake } from "@/content/home";
import { makeTiles } from "@/content/homeMedia";

/**
 * The products, as photographs: copy left, the title right with MAKE. on
 * the lime block (as on the What we make page), then the collage and the
 * way into the full range. Rises over the first statement.
 */
export function WhatWeMake() {
  return (
    <Sheet id="what-we-make" tone="bone" last sectionClassName="sheet--round">
      <Container className="py-section">
        <Editorial
          reverse
          heading={
            <h2 className="type-display">
              <MarkedTitle title={whatWeMake.title} mark="make." />
            </h2>
          }
          aside={
            <p
              className="type-lede max-w-[34ch] text-muted"
              data-reveal="left"
              data-reveal-delay="1"
            >
              {whatWeMake.copy}
            </p>
          }
        />
        <Collage
          className="mt-body"
          variant="make"
          tiles={makeTiles}
          event="product_tile_click"
          section="what_we_make"
        />
        <div className="mt-body" data-reveal="up">
          <Button href={whatWeMake.cta.href}>{whatWeMake.cta.label}</Button>
        </div>
      </Container>
    </Sheet>
  );
}
