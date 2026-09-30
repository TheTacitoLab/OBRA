"use client";

import { useEffect } from "react";

/**
 * Marks the contents link of the section being read (aria-current, which
 * globals.css shows as the number on lime and a heavier label) in both the
 * rail and the phone strip, and keeps that link in view inside whichever
 * of the two scrolls: the strip sideways, a tall rail up and down. Only the
 * navigation moves, never the page. A section counts as current once its
 * top passes 35% of the way down the viewport. The links work without it.
 */
export function GuideSpy({ ids }: { ids: string[] }) {
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a[data-guide-link]"),
    );
    if (sections.length === 0 || links.length === 0) return;
    let frame = 0;
    let current: string | null | undefined;

    const reveal = (link: HTMLAnchorElement) => {
      const list = link.closest<HTMLElement>(".guide-strip ol, .guide-rail");
      if (!list || list.offsetParent === null) return;
      if (list.scrollWidth > list.clientWidth) {
        const left = link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2;
        list.scrollTo({ left: Math.max(0, left), behavior: "auto" });
      } else if (list.scrollHeight > list.clientHeight) {
        const top = link.offsetTop;
        if (top < list.scrollTop || top + link.offsetHeight > list.scrollTop + list.clientHeight) {
          list.scrollTop = top - list.clientHeight / 2;
        }
      }
    };

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let active: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > line) break;
        active = section.id;
      }
      if (active === current) return;
      current = active;
      for (const link of links) {
        if (active && link.hash === `#${active}`) {
          link.setAttribute("aria-current", "true");
          reveal(link);
        } else {
          link.removeAttribute("aria-current");
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);
  return null;
}
