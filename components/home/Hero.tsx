import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { Button, ArrowLink } from "../site/Button";

/**
 * The opening statement. Four lines on phones and tablets (one word per
 * line, see .type-hero .word), two lines from 1024px, sized to the viewport.
 */
export function Hero() {
  return (
    <Sheet id="top" tone="bone">
      <Container className="flex flex-1 flex-col pb-10 pt-24 sm:pt-28 lg:pb-14 lg:pt-36">
        <h1 className="type-hero">
          <span className="rise-line">
            <span>
              <span className="word">More </span>
              <span className="word">product.</span>
            </span>
          </span>
          <span
            className="rise-line"
            style={{ "--d": "0.08s" } as React.CSSProperties}
          >
            <span>
              <span className="word">Less </span>
              <span className="word">promo.</span>
            </span>
          </span>
        </h1>

        <div className="mt-[clamp(1.75rem,5vh,4rem)] grid gap-y-7 md:grid-cols-12 md:gap-x-8 lg:mt-[clamp(2.5rem,7vh,5.5rem)]">
          <div
            className="fade-in flex flex-col gap-4 md:col-span-7 lg:col-span-6"
            style={{ "--d": "0.4s" } as React.CSSProperties}
          >
            <p className="type-lede max-w-[26ch]">
              madebyobra creates bespoke merchandise for brands, artists, events
              and organisations.
            </p>
            <p className="type-body max-w-[38ch] text-muted">
              Original products developed with freedom, bespoke manufacturing
              and pricing that actually works at scale.
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
