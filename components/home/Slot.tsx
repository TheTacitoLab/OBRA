"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content/home";

/**
 * The hero's block: the headline's highlight, as a fruit machine.
 *
 * Three reels stand side by side, each showing its third of the block. A
 * reel is a strip of four cells (the three words and the first again, so
 * it can run on for ever), and each cell is that reel's slice of a word on
 * its colour. Every few seconds the reels spin downwards together at one
 * speed and stop left to right on the next word, each settling with a
 * small bounce. While they stand, the word is shown over them in one
 * piece (.slot__rest), so at rest the block is a single clean colour with
 * no joins.
 *
 * Where every reel is depends only on the time since the block mounted,
 * so a throttled tab or a pause while off screen picks up in the right
 * place. Nothing runs under prefers-reduced-motion or without script: the
 * block then stays on the first word. The whole block is decoration; the
 * heading's own word is a visually hidden "ideas" (Hero.tsx).
 */

/** How long a word stands, in ms. */
const HOLD = 2300;
/** How long each reel takes to stop, left to right, in ms. */
const SPIN = [1000, 1350, 1700];
/** How many cells each reel runs on: whole rounds of the words, plus one. */
const CELLS = [7, 10, 13];
const STEP = HOLD + SPIN[SPIN.length - 1];
/** Longer on the first word, while the page loads in. */
const DELAY = 800;

/** The cells down a strip: the word due next is always the one above. */
const STRIP = [0, 2, 1, 0];
const WORDS = hero.words.length;

/**
 * How far through its run a reel is, 0 to 1, for a share of its time: at
 * one speed for the first 62%, then slowing into place, a little past it
 * and back.
 */
const BACK = 1.2;
const CRUISE = 0.62;
const SPEED = (BACK + 3) / (1 + CRUISE * (BACK + 2));
function run(x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  if (x < CRUISE) return SPEED * x;
  const from = SPEED * CRUISE;
  const s = (x - CRUISE) / (1 - CRUISE) - 1;
  return from + (1 - from) * (1 + (BACK + 1) * s * s * s + BACK * s * s);
}

const wordStyle = (word: (typeof hero.words)[number]) =>
  ({
    "--ink-l": word.left,
    "--ink-w": word.width,
  }) as React.CSSProperties;

export function Slot() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const strips = Array.from(
      root.querySelectorAll<HTMLElement>(".slot__strip"),
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = performance.now() + DELAY;
    let frame = 0;
    let visible = true;
    let shown = "";

    const draw = () => {
      frame = 0;
      const elapsed = Math.max(0, performance.now() - start);
      const step = Math.floor(elapsed / STEP);
      const since = elapsed - step * STEP;
      const spinning = since >= HOLD;
      strips.forEach((strip, reel) => {
        // In cells: `step` at rest, running on to the next word in a spin.
        const at =
          step + (spinning ? CELLS[reel] * run((since - HOLD) / SPIN[reel]) : 0);
        const cell = ((at % WORDS) + WORDS) % WORDS;
        strip.style.transform = `translate3d(0, ${(cell - WORDS) * (100 / STRIP.length)}%, 0)`;
      });
      // The word in one piece, whenever the reels stand.
      const state = spinning ? "spin" : String(step % WORDS);
      if (state !== shown) {
        shown = state;
        if (spinning) root.dataset.spin = "true";
        else {
          root.dataset.word = state;
          delete root.dataset.spin;
        }
      }
      frame = requestAnimationFrame(draw);
    };

    const sync = () => {
      const on = visible && !reduce.matches;
      if (on && !frame) frame = requestAnimationFrame(draw);
      if (!on && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    reduce.addEventListener("change", sync);
    sync();

    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", sync);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className="slot" aria-hidden="true">
      <span className="slot__reels">
        {[0, 1, 2].map((column) => (
          <span
            key={column}
            className="slot__col"
            style={{ "--col": column } as React.CSSProperties}
          >
            <span className="slot__strip">
              {STRIP.map((index, cell) => (
                <span key={cell} className="slot__cell">
                  <span
                    className={`slot__word slot__word--${index + 1}`}
                    style={wordStyle(hero.words[index])}
                    data-word={hero.words[index].text}
                  />
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
      {/* The word at rest, in one piece over the stopped reels. */}
      {hero.words.map((word, index) => (
        <span
          key={word.text}
          className={`slot__rest slot__rest--${index + 1} slot__word--${index + 1}`}
          style={wordStyle(word)}
          data-word={word.text}
        />
      ))}
    </span>
  );
}
