import { Sheet } from "./Sheet";
import { Collage } from "./Collage";
import { Container } from "../site/Container";
import { whoFor } from "@/content/home";
import { whoForLayout, whoForTiles } from "@/content/homeMedia";

/**
 * The first chapter, rising over the hero: the five audiences as one quick
 * editorial row, each leading to its own page. A compact head (title on one
 * line, the copy beside it), and the section sizes to its content rather
 * than the screen, so the lime statement is already arriving beneath it.
 */
export function WhoFor() {
  return (
    <Sheet
      id="who-for"
      tone="ink"
      last
      sectionClassName="sheet--round sheet--auto"
    >
      <Container className="home-chapter home-chapter--who">
        <div className="chapter-head">
          <h2 className="type-display type-display-tight" data-reveal="left">
            {whoFor.title}
          </h2>
          <p
            className="chapter-head__copy type-lede text-muted"
            data-reveal="right"
            data-reveal-delay="1"
          >
            {whoFor.copy}
          </p>
        </div>
        <Collage
          className="home-chapter__media"
          tiles={whoForTiles}
          layout={whoForLayout}
          event="who_for_tile_click"
          section="who_for"
        />
      </Container>
    </Sheet>
  );
}
