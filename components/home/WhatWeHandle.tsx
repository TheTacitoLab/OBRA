import { Sheet } from "./Sheet";
import { Collage } from "./Collage";
import { Container } from "../site/Container";
import { Editorial } from "../site/Editorial";
import { Button } from "../site/Button";
import { whatWeHandle } from "@/content/home";
import { handleLayout, handleTiles } from "@/content/homeMedia";

/**
 * Everything around the product: title left, copy right, then the services
 * as photographs, each leading to its row on the services page. Rises over
 * the second statement.
 */
export function WhatWeHandle() {
  return (
    <Sheet id="what-we-handle" tone="stone" last sectionClassName="sheet--round">
      <Container className="py-section">
        <Editorial
          heading={<h2 className="type-display">{whatWeHandle.title}</h2>}
          aside={
            <p
              className="type-lede max-w-[38ch] text-muted"
              data-reveal="right"
              data-reveal-delay="1"
            >
              {whatWeHandle.copy}
            </p>
          }
        />
        <Collage
          className="mt-body"
          tiles={handleTiles}
          layout={handleLayout}
          event="service_tile_click"
          section="what_we_handle"
        />
        <div className="mt-body" data-reveal="up">
          <Button href={whatWeHandle.cta.href}>{whatWeHandle.cta.label}</Button>
        </div>
      </Container>
    </Sheet>
  );
}
