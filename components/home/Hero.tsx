import { Sheet } from "./Sheet";
import { Container } from "../site/Container";

export function Hero() {
  return (
    <Sheet id="top" tone="bone">
      <Container className="flex flex-1 flex-col justify-between pb-10 pt-32 sm:pb-12 md:pt-40 lg:pb-16">
        <h1 className="type-hero">
          <span className="rise-line">
            <span>More product.</span>
          </span>
          <span className="rise-line" style={{ "--d": "0.1s" } as React.CSSProperties}>
            <span>Less promo.</span>
          </span>
        </h1>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <div
            className="fade-in md:col-span-7 lg:col-span-6"
            style={{ "--d": "0.5s" } as React.CSSProperties}
          >
            <p className="type-lede max-w-[24ch]">
              madebyobra creates bespoke merchandise for brands, artists, events
              and organisations.
            </p>
            <p className="type-lede mt-5 max-w-[30ch] text-muted">
              Original products developed with freedom, bespoke manufacturing
              and pricing that actually works at scale.
            </p>
          </div>

          <div
            className="fade-in flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-5 md:justify-end lg:col-span-6"
            style={{ "--d": "0.65s" } as React.CSSProperties}
          >
            {/* Plain anchors: Sheets.tsx scrolls these to the sheet's flow
                position, which a router-driven scrollIntoView would not. */}
            <a href="#start-a-project" className="btn btn-primary">
              Start a project
            </a>
            <a href="#what-we-make" className="type-small u-wipe u-lime">
              See what we make
            </a>
          </div>
        </div>
      </Container>
    </Sheet>
  );
}
