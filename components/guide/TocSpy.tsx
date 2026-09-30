"use client";

import { useEffect } from "react";

/**
 * Marks the contents link for the section being read (aria-current, which
 * globals.css turns into the lime number and a heavier label), and folds the
 * phone contents away once a destination is chosen. The section counts as
 * current once its top passes 30% of the way down the viewport. Everything
 * works without this script; it only adds the highlight.
 */
export function TocSpy({ ids }: { ids: string[] }) {
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a[data-toc-link]"),
    );
    if (sections.length === 0 || links.length === 0) return;
    let frame = 0;
    let current: string | null | undefined;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
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
          keepInView(link);
        } else {
          link.removeAttribute("aria-current");
        }
      }
    };
    // On a short screen the rail scrolls within itself; keep the current
    // entry inside it. Only the rail moves, never the page.
    const keepInView = (link: HTMLAnchorElement) => {
      const rail = link.closest<HTMLElement>(".guide-rail");
      if (!rail || rail.scrollHeight <= rail.clientHeight) return;
      const top = link.offsetTop;
      const bottom = top + link.offsetHeight;
      if (top < rail.scrollTop || bottom > rail.scrollTop + rail.clientHeight) {
        rail.scrollTop = top - rail.clientHeight / 2;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Closing the disclosure before the browser follows the fragment means
    // the scroll target is measured with the list already folded away.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a[data-toc-link]");
      link?.closest("details")?.removeAttribute("open");
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);
  return null;
}
