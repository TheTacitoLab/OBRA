"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's scroll cue: a chunky arrow in the bottom-right corner of the
 * hero that, as the reader starts to scroll, turns over and becomes a bare
 * smiley, holds a moment and fades. Driven by scroll position, not time.
 *
 * It sits outside the sheet stack, fixed at the corner the hero's frame
 * occupies at the top of the page, so the sheet sliding over the hero does
 * not cover it, and it blends with whatever is beneath (near-black on bone,
 * light on soft black). Purely decorative: hidden from assistive tech and
 * not clickable. Under prefers-reduced-motion it is a still arrow that
 * simply goes when the page moves.
 */

// The arrow head and the smile share one shape: two cubic curves whose
// control points collapse onto the line for the chevron.
const CHEVRON = [4, 13, 4, 13, 12, 21, 12, 21, 12, 21, 12, 21, 20, 13];
const SMILE = [5, 13, 7, 18.5, 9.5, 20, 12, 20, 14.5, 20, 17, 18.5, 19, 13];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const ramp = (p: number, from: number, to: number) =>
  clamp01((p - from) / (to - from));

function pathFor(t: number) {
  const v = CHEVRON.map((a, i) => a + (SMILE[i] - a) * t);
  return `M${v[0]} ${v[1]} C${v[2]} ${v[3]} ${v[4]} ${v[5]} ${v[6]} ${v[7]} C${v[8]} ${v[9]} ${v[10]} ${v[11]} ${v[12]} ${v[13]}`;
}

export function ScrollCue() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cue = ref.current;
    const frame = document.querySelector<HTMLElement>("[data-hero-frame]");
    if (!cue || !frame) return;
    const spin = cue.querySelector<SVGGElement>("[data-spin]");
    const stem = cue.querySelector<SVGLineElement>("[data-stem]");
    const head = cue.querySelector<SVGPathElement>("[data-head]");
    const eyes = cue.querySelector<SVGGElement>("[data-eyes]");
    if (!spin || !stem || !head || !eyes) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const next =
      document.querySelector<HTMLElement>("#who-for .biglist") ??
      document.querySelector<HTMLElement>("#who-for");
    let raf = 0;
    // Scroll distance the whole interaction plays out over.
    let span = window.innerHeight * 0.5;

    // Where an element sits in the page flow, whatever the sticky sheets
    // and their transforms are doing at the moment: offsets are summed up
    // to the element's sheet, the sheet's place comes from the heights of
    // the sheets before it, and the stack's own position is untouched by
    // either.
    const stack = frame.closest<HTMLElement>(".sheets");
    const flowTop = (el: HTMLElement) => {
      const sheet = el.closest<HTMLElement>(".sheet");
      let y = 0;
      let node: HTMLElement | null = el;
      while (node && node !== sheet) {
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      if (!sheet || !stack) {
        while (node) {
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return y;
      }
      let prev = sheet.previousElementSibling as HTMLElement | null;
      while (prev) {
        y += prev.offsetHeight;
        prev = prev.previousElementSibling as HTMLElement | null;
      }
      return y + stack.getBoundingClientRect().top + window.scrollY;
    };

    // Pin the cue to the hero frame's bottom-right corner as it sits with
    // the page at the top (or the first screen's, when the hero runs past
    // it), and size the timeline so the cue has gone before the next
    // section's first row scrolls up to where it sits.
    const place = () => {
      const rect = frame.getBoundingClientRect();
      const styles = getComputedStyle(frame);
      const gutter = parseFloat(styles.paddingBottom);
      const right = rect.right - parseFloat(styles.paddingRight);
      const bottom = Math.min(
        flowTop(frame) + frame.offsetHeight - gutter,
        document.documentElement.clientHeight - gutter,
      );
      const top = Math.round(bottom - cue.offsetHeight);
      cue.style.left = `${Math.round(right - cue.offsetWidth)}px`;
      cue.style.top = `${top}px`;
      span = next
        ? Math.max(120, flowTop(next) - top - 24)
        : window.innerHeight * 0.5;
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const p = clamp01(y / span);
      cue.dataset.state = y > 2 ? "moving" : "rest";
      if (reduce.matches) {
        cue.style.opacity = y > 2 ? "0" : "1";
        cue.style.visibility = y > 2 ? "hidden" : "visible";
        return;
      }
      const turn = 360 * easeOut(ramp(p, 0.08, 0.55));
      const morph = easeOut(ramp(p, 0.15, 0.55));
      const fade = 1 - ramp(p, 0.78, 1);
      spin.style.transform = `rotate(${turn}deg)`;
      stem.style.transform = `scaleY(${1 - ramp(p, 0.08, 0.4)})`;
      head.setAttribute("d", pathFor(morph));
      eyes.style.opacity = String(ramp(p, 0.4, 0.55));
      cue.style.opacity = String(fade);
      cue.style.transform = `scale(${1 - 0.1 * ramp(p, 0.78, 1)})`;
      cue.style.visibility = p >= 1 ? "hidden" : "visible";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      place();
      onScroll();
    };
    place();
    update();
    cue.dataset.ready = "true";
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(place);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="scroll-cue" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <g data-spin>
          <line data-stem x1="12" y1="3" x2="12" y2="20" />
          <path data-head d={pathFor(0)} />
          <g data-eyes style={{ opacity: 0 }}>
            <circle cx="8.5" cy="8.5" r="1.7" />
            <circle cx="15.5" cy="8.5" r="1.7" />
          </g>
        </g>
      </svg>
    </div>
  );
}
