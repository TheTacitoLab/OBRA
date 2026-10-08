import { Sheet } from "./Sheet";
import { Collage } from "./Collage";
import { Container } from "../site/Container";
import { Editorial } from "../site/Editorial";
import { whoFor } from "@/content/home";
import { whoForTiles } from "@/content/homeMedia";

/**
 * The first chapter, rising over the hero: the five audiences as an
 * editorial collage, each leading to its own page. Title left, copy right.
 */
export function WhoFor() {
  return (
    <Sheet id="who-for" tone="ink" last sectionClassName="sheet--round">
      <Container className="py-section">
        <Editorial
          heading={<h2 className="type-display">{whoFor.title}</h2>}
          aside={
            <p
              className="type-lede max-w-[38ch] text-muted"
              data-reveal="right"
              data-reveal-delay="1"
            >
              {whoFor.copy}
            </p>
          }
        />
        <Collage
          className="mt-body"
          variant="who"
          tiles={whoForTiles}
          event="who_for_tile_click"
          section="who_for"
        />
      </Container>
    </Sheet>
  );
}
