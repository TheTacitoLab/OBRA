import { Sheet } from "./Sheet";
import { HeroVideo } from "./HeroVideo";
import { Container } from "../site/Container";
import { hero } from "@/content/home";

/**
 * The opening statement, on navy and exactly the first screen: "Where
 * great [ideas] are made", centred, over a quiet film of the work being
 * made (HeroVideo.tsx). What the studio is sits on its own band beneath
 * (Pitch.tsx), and a minimal "Find out more" with an arrow at the foot of
 * the hero leads on to it.
 *
 * The middle line is the highlight: navy type on one wide block of solid
 * colour that turns a quarter at a time, always the same way, like the
 * side of a cube, through hero.words ("ideas" on lime, "products" on
 * lilac, "activations" on off-white). CSS only (.hero-cube in
 * globals.css). Three words do not go round four sides, so the block is
 * two panels that take turns: one goes over the top as the other comes up
 * from beneath, and each changes its word while it is round the back.
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
const wordStyle = (word: (typeof hero.words)[number]) =>
  ({
    "--ink-l": word.left,
    "--ink-w": word.width,
  }) as React.CSSProperties;

/**
 * A panel shows on every other step, so over three words it carries the
 * first, the third, then the second.
 */
const PANEL_ORDER = [0, 2, 1];

function Panel({ second = false }: { second?: boolean }) {
  return (
    <span
      className={`hero-cube__panel${second ? " hero-cube__panel--b" : ""}`}
    >
      {PANEL_ORDER.map((index) => (
        <span
          key={index}
          className={`hero-cube__side hero-cube__side--${index + 1}`}
          style={wordStyle(hero.words[index])}
          data-word={hero.words[index].text}
        />
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <Sheet id="top" tone="navy" sectionClassName="sheet--hero">
      <HeroVideo />
      <Container className="relative flex flex-1 flex-col pb-7 pt-[5.75rem] sm:pb-9 sm:pt-28 lg:pb-9 lg:pt-[var(--hero-top)]">
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
                className="rise-line rise-line--cube"
                style={{ "--d": "0.08s" } as React.CSSProperties}
              >
                <span>
                  <span className="sr-only">{hero.words[0].text} </span>
                  <span className="hero-cube" aria-hidden="true">
                    <Panel />
                    <Panel second />
                  </span>
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
