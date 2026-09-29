"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const DARK_TONES = new Set(["ink", "clay"]);

/**
 * Drives the stacked-sheet scroll on the homepage.
 *
 * The stacking itself is plain CSS (`position: sticky` on each .sheet), so the
 * page scrolls normally with no JavaScript. This script adds three things:
 *
 * 1. `--sheet-top`: a sheet taller than the viewport sticks only once it has
 *    been read to the bottom, instead of pinning at its top and cutting off
 *    the rest.
 * 2. `--rise` / `--cover` (0-1): how far a sheet has risen into view and how
 *    far the next sheet has covered it, for the subtle content movement and
 *    dimming in globals.css. Skipped under prefers-reduced-motion.
 * 3. `data-nav` on <html>: the tone of the sheet beneath the fixed header, so
 *    the header text switches between ink and bone.
 * 4. Anchor links to a sheet scroll to the sheet's position in the document
 *    flow. Browsers otherwise scroll a sticky element to wherever it is
 *    pinned, which lands a tall sheet with its title above the fold.
 */
export function Sheets({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const sheets = Array.from(
      root.querySelectorAll<HTMLElement>(":scope > .sheet"),
    );
    if (sheets.length === 0) return;

    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Below 768px the sheets flow naturally (see globals.css), so the
    // progress values are not needed; the header tone still is.
    const phone = window.matchMedia("(max-width: 767px)");
    // The layout viewport height matches 100svh, which sizes the sheets.
    const viewport = () => html.clientHeight;
    let frame = 0;

    const measure = () => {
      const vh = viewport();
      for (const sheet of sheets) {
        const overflow = sheet.offsetHeight - vh;
        sheet.style.setProperty(
          "--sheet-top",
          overflow > 0 ? `${-overflow}px` : "0px",
        );
      }
    };

    const update = () => {
      frame = 0;
      const vh = viewport();
      const rects = sheets.map((sheet) => sheet.getBoundingClientRect());
      const tops = rects.map((rect) => rect.top);

      if (!reduce.matches && !phone.matches) {
        sheets.forEach((sheet, index) => {
          const nextTop = tops[index + 1];
          // How far the next sheet has slid over this one's visible part. A
          // sheet shorter than the viewport (the hero) starts uncovered even
          // though the next sheet is already on screen beneath it.
          const rect = rects[index];
          const visible = Math.min(rect.height, vh);
          const cover =
            nextTop === undefined
              ? 0
              : clamp((rect.bottom - nextTop) / visible);
          const rise = index === 0 ? 1 : clamp((vh - tops[index]) / vh);
          sheet.style.setProperty("--cover", cover.toFixed(3));
          sheet.style.setProperty("--rise", rise.toFixed(3));
        });
      }

      // The sheet under the header: the last one whose top has crossed the
      // header's midline (the bar is 3.5rem tall, 4.25rem from lg).
      let tone = sheets[0].dataset.tone ?? "bone";
      for (let index = 0; index < sheets.length; index += 1) {
        if (tops[index] > 36) break;
        tone = sheets[index].dataset.tone ?? tone;
      }
      if (DARK_TONES.has(tone)) html.dataset.nav = "dark";
      else delete html.dataset.nav;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    // Where a sheet sits in normal flow: the stack's top plus the heights of
    // every sheet before it. Sticky offsets never enter into it.
    const flowTop = (target: HTMLElement) => {
      const index = sheets.indexOf(target);
      if (index < 0) return null;
      let top = root.getBoundingClientRect().top + window.scrollY;
      for (let i = 0; i < index; i += 1) top += sheets[i].offsetHeight;
      return top;
    };
    const scrollToHash = (hash: string, smooth: boolean) => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      const top = target ? flowTop(target) : null;
      if (top === null) return false;
      window.scrollTo({
        top,
        behavior: smooth && !reduce.matches ? "smooth" : "auto",
      });
      return true;
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("#")) return;
      if (scrollToHash(href, true)) {
        event.preventDefault();
        history.pushState(null, "", href);
      }
    };
    const onHashChange = () => scrollToHash(window.location.hash, true);

    // Keyboard focus can land on a link the next sheet has already slid
    // over (the browser scrolls the link's box into view without knowing it
    // is painted under). Scroll so the link sits clear of the header with
    // the next sheet's edge beneath it, judged from geometry rather than
    // --cover, which is not written under prefers-reduced-motion.
    const onFocusIn = (event: FocusEvent) => {
      if (phone.matches) return;
      const target = event.target as HTMLElement | null;
      const sheet = target?.closest<HTMLElement>(".sheet") ?? null;
      if (!target || !sheet) return;
      const index = sheets.indexOf(sheet);
      const next = sheets[index + 1];
      if (index < 0 || !next) return;
      const vh = viewport();
      const rect = target.getBoundingClientRect();
      const nextTop = next.getBoundingClientRect().top;
      const header =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .height ?? 68;
      const clear = 24;
      const visible =
        rect.top >= header && rect.bottom + clear <= Math.min(nextTop, vh);
      if (visible) return;
      const sheetTop = flowTop(sheet);
      const nextFlowTop = flowTop(next);
      if (sheetTop === null || nextFlowTop === null) return;
      // Layout offset within the sheet, read from offsetTop so the inner
      // wrapper's cover transform (a shift and a 3% scale) does not skew it.
      let offset = 0;
      for (
        let node: HTMLElement | null = target;
        node && node !== sheet && sheet.contains(node);
        node = node.offsetParent as HTMLElement | null
      ) {
        offset += node.offsetTop;
      }
      const overflow = Math.max(0, sheet.offsetHeight - vh);
      // Pinned, the sheet sits at -overflow: a link far enough down stays on
      // screen, so scroll until the next sheet's edge is just beneath it.
      // Otherwise leave the sheet in flow with the link under the header.
      const pinnedTop = offset - overflow;
      const top =
        pinnedTop >= header + clear
          ? nextFlowTop - (pinnedTop + rect.height + clear)
          : sheetTop + offset - header - clear;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduce.matches ? "auto" : "smooth",
      });
    };

    const observer = new ResizeObserver(onResize);
    sheets.forEach((sheet) => observer.observe(sheet));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", schedule);
    phone.addEventListener("change", onResize);
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    root.addEventListener("focusin", onFocusIn);
    measure();
    update();
    // Arriving with a hash (from another page or a shared link): land on the
    // sheet's flow position once fonts and layout have settled.
    if (window.location.hash) {
      const land = () => scrollToHash(window.location.hash, false);
      land();
      document.fonts?.ready.then(land);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", schedule);
      phone.removeEventListener("change", onResize);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
      root.removeEventListener("focusin", onFocusIn);
      if (frame) cancelAnimationFrame(frame);
      delete html.dataset.nav;
    };
  }, []);

  return (
    <div ref={ref} className="sheets">
      {children}
    </div>
  );
}
