import { Sheet } from "./Sheet";
import { Collage } from "./Collage";
import { Container } from "../site/Container";
import { ArrowLink } from "../site/Button";
import { whatWeMake } from "@/content/home";
import { makeLayout, makeTiles } from "@/content/homeMedia";

/**
 * The products, as a lookbook: copy left, the title right on one line with
 * MAKE. on the lime block (as on the What we make page), the photographs
 * framed around their subjects, then the way into the full range. Rises
 * over the first statement, and sizes to its content.
 */
/** The word set on the lime block, kept on the title's line. */
const MARK = "make.";

export function WhatWeMake() {
  const lead = whatWeMake.title.slice(0, -MARK.length);
  return (
    <Sheet
      id="what-we-make"
      tone="bone"
      last
      sectionClassName="sheet--round sheet--auto"
    >
      <Container className="home-chapter home-chapter--make">
        <div className="chapter-head chapter-head--reverse">
          <h2 className="type-display type-display-tight" data-reveal="right">
            {lead}
            <span className="mark mark--mid">{MARK}</span>
          </h2>
          <p
            className="chapter-head__copy type-lede text-muted"
            data-reveal="left"
            data-reveal-delay="1"
          >
            {whatWeMake.copy}
          </p>
        </div>
        <Collage
          className="home-chapter__media"
          tiles={makeTiles}
          layout={makeLayout}
          event="product_tile_click"
          section="what_we_make"
        />
        <div className="home-chapter__action" data-reveal="up">
          <ArrowLink strong href={whatWeMake.cta.href}>
            {whatWeMake.cta.label}
          </ArrowLink>
        </div>
      </Container>
    </Sheet>
  );
}
