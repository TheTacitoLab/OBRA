import { Sheet } from "./Sheet";
import { Container } from "../site/Container";
import { ArrowLink } from "../site/Button";
import { hero } from "@/content/home";
import { primaryCta } from "@/content/site";

/**
 * The opening statement, on navy: "Where great [ideas] are made".
 *
 * From 768px it is a squared-off lockup of three lines, all the same
 * width: "Where great", then the turning word, then "are made", each set
 * at the size that makes its ink span the lockup. On phones it is one
 * word per line at one size (see .type-hero in globals.css).
 *
 * The middle word is the highlight: navy type on a solid block that turns
 * one way, a quarter at a time, like the side of a cube, through
 * hero.words (.hero-cube, CSS only), the block lime, then lilac, then
 * off-white. In the lockup the block is always the full width and every
 * word is sized to fill it, so "ideas", the shortest, is the largest.
 *
 * Only the first word is real text, so the heading reads "Where great
 * ideas are made" to search engines and screen readers; the other faces
 * are drawn from data-word and hidden from assistive technology. The copy
 * stays small beneath, saying plainly who the studio is for and what it
 * does, with one action.
 */
const wordStyle = (word: (typeof hero.words)[number]) =>
  ({
    "--ink-l": word.left,
    "--ink-w": word.width,
  }) as React.CSSProperties;

export function Hero() {
  return (
    <Sheet id="top" tone="navy" sectionClassName="sheet--hero">
      <Container
        data-hero-frame
        className="flex flex-1 flex-col pb-9 pt-[4.75rem] sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-[clamp(6.5rem,14vh,9rem)]"
      >
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
                <span className="hero-cube__box">
                  {hero.words.map((word, index) =>
                    index === 0 ? (
                      <span
                        key={word.text}
                        className="hero-cube__face"
                        style={wordStyle(word)}
                      >
                        <span className="hero-cube__word">{word.text} </span>
                      </span>
                    ) : (
                      <span
                        key={word.text}
                        className="hero-cube__face"
                        style={wordStyle(word)}
                        data-word={word.text}
                        aria-hidden="true"
                      />
                    ),
                  )}
                </span>
              </span>
            </span>
            <span
              className="rise-line type-hero__base"
              style={{ "--d": "0.16s" } as React.CSSProperties}
            >
              <span>
                <span className="word">are </span>
                <span className="word">made</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Copy and actions sit under the headline on the left; the
            bottom-right corner is the scroll cue's (ScrollCue.tsx). */}
        <div className="mt-head grid gap-y-7 md:grid-cols-12 md:gap-x-8 lg:mt-[clamp(2rem,4vh,3.5rem)]">
          <div
            className="fade-in flex flex-col gap-6 md:col-span-8 lg:col-span-6"
            style={{ "--d": "0.4s" } as React.CSSProperties}
          >
            <div className="max-w-[54ch]">
              <p className="type-body text-muted">{hero.copy}</p>
              <p className="type-body mt-2 font-medium text-fg">{hero.line}</p>
            </div>
            <div className="pr-16 md:pr-0">
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
        </div>
      </Container>
    </Sheet>
  );
}
