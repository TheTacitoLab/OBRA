"use client";

import { useEffect } from "react";

/**
 * Section entrances. Elements marked data-reveal (one element) or
 * data-reveal-group (its children, staggered) start a little low and
 * transparent and settle as they come into view; globals.css holds the
 * motion, gated on html[data-reveal] so nothing is hidden before this runs
 * or where it does not. Anything already on screen is marked in the same
 * tick, so there is no flash on load. Mounted by the homepage and the
 * agencies guide (which uses the quieter data-reveal="soft"); the gate is
 * removed again when it unmounts.
 */
export function Reveal() {
  useEffect(() => {
    const html = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-reveal-group]",
      ),
    );
    if (targets.length === 0) return;
    const show = (el: Element) => el.classList.add("is-in");
    const vh = window.innerHeight;
    const pending: HTMLElement[] = [];
    for (const el of targets) {
      const top = el.getBoundingClientRect().top;
      if (top < vh * 0.92) show(el);
      else pending.push(el);
    }
    html.dataset.reveal = "ready";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    pending.forEach((el) => observer.observe(el));
    // Printing never scrolls, so show everything before the page prints.
    const showAll = () => {
      pending.forEach(show);
      observer.disconnect();
    };
    window.addEventListener("beforeprint", showAll);
    return () => {
      window.removeEventListener("beforeprint", showAll);
      observer.disconnect();
      delete html.dataset.reveal;
    };
  }, []);
  return null;
}
