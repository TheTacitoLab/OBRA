import { Sheet } from "./Sheet";
import { HeroVideo } from "./HeroVideo";
import { Container } from "../site/Container";
import { hero } from "@/content/home";

/**
 * The opening statement, on navy and exactly the first screen, over a
 * quiet film of the work being made (HeroVideo.tsx): "Where great ideas
 * are made", extra large and to the left, the last word on the lime
 * block. What the studio is sits on its own band beneath (Pitch.tsx).
 *
 * From 768px it is three lines at one size, "Where great" / "ideas are" /
 * "made", the first spanning the column. On phones it is four lines, each
 * fitted to the full width: "Where" / "great" / "ideas are" / "made" on a
 * full-width block.
 *
 * Beside it, a small line saying what the studio does and an arrow on to
 * the pitch: from 1024px on the right, level with "made"; below that,
 * under the headline.
 */
export function Hero() {
  return (
    <Sheet id="top" tone="navy" sectionClassName="sheet--hero">
      <HeroVideo />
      <Container className="relative flex flex-1 flex-col pb-7 pt-[5.75rem] sm:pb-9 sm:pt-28 lg:pb-9 lg:pt-[var(--hero-top)]">
        <div className="hero-stage">
          <div className="hero-lockup">
            <div className="hero-title">
              <h1 className="type-hero">
                <span className="rise-line type-hero__l1">
                  <span>
                    <span className="word">Where </span>
                    <span className="word">great </span>
                  </span>
                </span>
                <span
                  className="rise-line type-hero__l2"
                  style={{ "--d": "0.08s" } as React.CSSProperties}
                >
                  <span>ideas are </span>
                </span>
                <span
                  className="rise-line type-hero__l3"
                  style={{ "--d": "0.16s" } as React.CSSProperties}
                >
                  <span>
                    <span className="mark hero-made">made</span>
                  </span>
                </span>
              </h1>
              <div
                className="hero-sub fade-in"
                style={{ "--d": "0.45s" } as React.CSSProperties}
              >
                <p className="hero-sub__text">
                  {hero.sub.map((line) => (
                    // The trailing space keeps the lines apart in the text
                    // itself and is the word space where they run on.
                    <span key={line} className="line">
                      {line}{" "}
                    </span>
                  ))}
                </p>
                <a
                  href="#intro"
                  className="hero-sub__arrow"
                  aria-label="Find out more"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 4v15M5 12l7 7 7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Sheet>
  );
}
