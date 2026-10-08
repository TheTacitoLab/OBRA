import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { Button } from "../site/Button";
import { hero } from "@/content/home";
import { primaryCta } from "@/content/site";

/**
 * The opening statement. One word per line on phones (see .type-hero
 * .word), two lines from 768px, sized to the viewport at every width, with
 * the second line on the lime block. The copy stays small beneath it,
 * saying plainly who the studio is for and what it does, with one action.
 */
export function Hero() {
  return (
    <Sheet id="top" tone="bone" sectionClassName="sheet--hero">
      <Container
        data-hero-frame
        className="flex flex-1 flex-col pb-12 pt-20 sm:pt-28 lg:pb-16 lg:pt-36"
      >
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

        {/* Copy and actions sit under the headline on the left; the
            bottom-right corner is the scroll cue's (ScrollCue.tsx). */}
        <div className="mt-head grid gap-y-7 md:grid-cols-12 md:gap-x-8 lg:mt-[clamp(2rem,4vh,3.5rem)]">
          <div
            className="fade-in flex flex-col gap-6 md:col-span-8 lg:col-span-6"
            style={{ "--d": "0.4s" } as React.CSSProperties}
          >
            <p className="type-body max-w-[54ch] text-muted">{hero.copy}</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pr-16 md:pr-0">
              <Button
                href={primaryCta.href}
                track="get_in_touch_click"
                trackSection="hero"
              >
                {primaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Sheet>
  );
}
