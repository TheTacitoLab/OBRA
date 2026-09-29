import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { Button, ArrowLink } from "../site/Button";

/**
 * The opening statement. One word per line on phones (see .type-hero
 * .word), two lines from 768px, sized to the viewport at every width, with
 * the second line on the lime block.
 */
export function Hero() {
  return (
    <Sheet id="top" tone="bone" sectionClassName="sheet--hero">
      <Container className="flex flex-1 flex-col pb-12 pt-20 sm:pt-28 lg:pb-16 lg:pt-36">
        <h1 className="type-hero">
          <span className="rise-line">
            <span>
              <span className="word">Less </span>
              <span className="word">bland.</span>
            </span>
          </span>
          <span
            className="rise-line"
            style={{ "--d": "0.08s" } as React.CSSProperties}
          >
            <span>
              {/* One block on desktop: the first mark carries the space so
                  the two join; on phones each word is a line with its own. */}
              <span className="word">
                <span className="mark">More </span>
              </span>
              <span className="word">
                <span className="mark">brand.</span>
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-head grid gap-y-7 md:grid-cols-12 md:gap-x-8 lg:mt-[clamp(2rem,4vh,3.5rem)]">
          <div
            className="fade-in flex flex-col gap-4 md:col-span-7 lg:col-span-6"
            style={{ "--d": "0.4s" } as React.CSSProperties}
          >
            <p className="type-lede max-w-[30ch]">
              madebyobra creates bespoke merchandise for brands, artists,
              festivals, events and agencies.
            </p>
            <p className="type-body max-w-[42ch] text-muted">
              We design, develop and manufacture retail-ready collections,
              from limited runs to large-scale production.
            </p>
          </div>

          <div
            className="fade-in flex flex-wrap items-center gap-x-7 gap-y-3 md:col-span-5 md:items-end md:justify-end md:self-end lg:col-span-6"
            style={{ "--d": "0.55s" } as React.CSSProperties}
          >
            {/* Plain anchors: Sheets.tsx scrolls these to the sheet's flow
                position, which a router-driven scrollIntoView would not. */}
            <Button href="#start-a-project" plain>
              Start a project
            </Button>
            <ArrowLink href="#what-we-make" plain>
              See what we make
            </ArrowLink>
          </div>
        </div>
      </Container>
    </Sheet>
  );
}
