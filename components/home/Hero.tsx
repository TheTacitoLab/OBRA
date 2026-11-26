import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { Slot } from "./Slot";
import { hero } from "@/content/home";

/**
 * The opening statement, on navy and exactly the first screen: "Where
 * great [ideas] are made", centred. What the studio is sits on its own
 * band beneath (Pitch.tsx), and a minimal "Find out more" with an arrow at
 * the foot of the hero leads on to it.
 *
 * The middle line is the highlight: navy type on one wide block of solid
 * colour, changing through hero.words ("ideas" on lime, "products" on
 * lilac, "activations" on off-white). The block is a fruit machine
 * (Slot.tsx): three reels spin and stop left to right on the next word,
 * and once the last has stopped the word stands in one piece on its full
 * colour.
 *
 * From 768px "Where great" and "are made" are small centred lines above
 * and below the block, which leads. On phones every line is the block's
 * full width, four of them: "Where" / "great" / the block / "are made".
 *
 * The word in the heading itself is a visually hidden "ideas", so it
 * reads "Where great ideas are made" to search engines and screen
 * readers; the block that draws the words is decoration (aria-hidden,
 * every word drawn from data-word).
 */
export function Hero() {
  return (
    <Sheet id="top" tone="navy" sectionClassName="sheet--hero">
      <Container className="flex flex-1 flex-col pb-7 pt-[5.75rem] sm:pb-9 sm:pt-28 lg:pb-9 lg:pt-[var(--hero-top)]">
        <div className="hero-stage">
          <div className="hero-lockup">
            <h1 className="type-hero">
              <span className="rise-line type-hero__top">
                <span>
                  <span className="word">Where </span>
                  <span className="word">great </span>
                </span>
              </span>
              <span
                className="rise-line"
                style={{ "--d": "0.08s" } as React.CSSProperties}
              >
                <span>
                  <span className="sr-only">{hero.words[0].text} </span>
                  <Slot />
                </span>
              </span>
              <span
                className="rise-line type-hero__base"
                style={{ "--d": "0.16s" } as React.CSSProperties}
              >
                <span>are made</span>
              </span>
            </h1>
          </div>

          <a
            href="#intro"
            className="hero-more fade-in"
            style={{ "--d": "0.5s" } as React.CSSProperties}
          >
            <span>Find out more</span>
            <svg
              className="hero-more__arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" />
            </svg>
          </a>
        </div>
      </Container>
    </Sheet>
  );
}
