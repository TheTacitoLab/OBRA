import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { ArrowLink } from "../site/Button";
import { hero } from "@/content/home";
import { primaryCta } from "@/content/site";

/**
 * The opening statement, on navy: "Where great [ideas] are made", and one
 * action. What the studio is sits on its own band beneath (Pitch.tsx).
 *
 * The headline is a squared-off lockup: every line spans the same width.
 * From 768px that is three lines ("Where great" / the block / "are made"),
 * about four fifths of the page wide from 1024px; on phones four, the
 * full width ("Where" / "great" / the block / "are made"). Each line is
 * set at the size that makes its ink span the lockup.
 *
 * The middle line is the highlight: navy type on a solid block that turns
 * one way, a quarter at a time, like the side of a cube, through
 * hero.words (.hero-cube in globals.css, CSS only): "ideas" on lime,
 * "products" on lilac, "activations" on off-white. Each word is sized to
 * fill the block's width, so the block is taller for "ideas" than for the
 * long words, and "are made" moves to stay beneath it.
 *
 * The block is two panels that take turns: one turns away over the top
 * as the other comes up from beneath, and each changes its word while it
 * is out of sight. Only the first word on the first panel is real text,
 * so the heading reads "Where great ideas are made" to search engines
 * and screen readers; every other word is drawn from data-word and hidden
 * from assistive technology.
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
      aria-hidden={second ? "true" : undefined}
    >
      {PANEL_ORDER.map((index, slot) => {
        const word = hero.words[index];
        return !second && slot === 0 ? (
          <span
            key={word.text}
            className="hero-cube__side"
            style={wordStyle(word)}
          >
            <span className="hero-cube__word">{word.text} </span>
          </span>
        ) : (
          <span
            key={word.text}
            className="hero-cube__side"
            style={wordStyle(word)}
            data-word={word.text}
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}

export function Hero() {
  return (
    <Sheet id="top" tone="navy" sectionClassName="sheet--hero">
      <Container
        data-hero-frame
        className="flex flex-1 flex-col pb-9 pt-[5.75rem] sm:pb-12 sm:pt-28 lg:pb-12 lg:pt-[var(--hero-top)]"
      >
        {/* The lockup, and the one action: under it, or beside its foot on
            a landscape screen from 1200px (.hero-stage). The bottom-right
            corner is the scroll cue's (ScrollCue.tsx). */}
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
                <span className="hero-cube">
                  <Panel />
                  <Panel second />
                </span>
              </span>
              <span
                className="rise-line type-hero__base"
                style={{ "--d": "0.16s" } as React.CSSProperties}
              >
                <span>
                  <span className="hero-base">are made</span>
                </span>
              </span>
            </h1>
          </div>
          <div
            className="hero-action fade-in pr-16 md:pr-0"
            style={{ "--d": "0.4s" } as React.CSSProperties}
          >
            <ArrowLink
              strong
              href={primaryCta.href}
              track="get_in_touch_click"
              trackSection="hero"
            >
              {primaryCta.label}
            </ArrowLink>
          </div>
        </div>
      </Container>
    </Sheet>
  );
}
