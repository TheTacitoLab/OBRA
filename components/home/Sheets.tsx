"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const DARK_TONES = new Set(["ink", "clay"]);

/**
 * Drives the stacked-sheet scroll on the homepage.
 *
 * The page is a run of stacks (`SheetGroup`, a `.sheets` element each):
 * the hero with Who for, then each statement with the chapter that rises
 * over it. The stacking itself is plain CSS (`position: sticky` on each
 * .sheet inside its stack), so the page scrolls normally with no
 * JavaScript. This script adds:
 *
 * 1. `--sheet-top`: a sheet taller than the viewport sticks only once it has
 *    been read to the bottom, instead of pinning at its top and cutting off
 *    the rest.
 * 2. `--rise` / `--cover` (0-1): how far a sheet has risen into view and how
 *    far the next sheet in its stack has covered it, for the subtle content
 *    movement and dimming in globals.css. Skipped under
 *    prefers-reduced-motion.
 * 3. `data-nav` on <html>: the tone of the surface beneath the fixed
 *    header, so the header text switches between ink and bone.
 * 4. Anchor links to a sheet scroll to the sheet's position in the document
 *    flow. Browsers otherwise scroll a sticky element to wherever it is
 *    pinned, which lands a tall sheet with its title above the fold.
 */
export function Sheets({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const groups = Array.from(
      root.querySelectorAll<HTMLElement>(":scope > .sheets"),
    );
    const stacks = groups.map((group) =>
      Array.from(group.querySelectorAll<HTMLElement>(":scope > .sheet")),
    );
    const sheets = stacks.flat();
    if (sheets.length === 0) return;
    const stackOf = new Map<HTMLElement, HTMLElement[]>();
    const groupOf = new Map<HTMLElement, HTMLElement>();
    stacks.forEach((stack, index) =>
      stack.forEach((sheet) => {
        stackOf.set(sheet, stack);
        groupOf.set(sheet, groups[index]);
      }),
    );
    // The next sheet in the same stack: the one that slides over this one.
    const nextInStack = (sheet: HTMLElement) => {
      const stack = stackOf.get(sheet) ?? [];
      return stack[stack.indexOf(sheet) + 1];
    };

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

    // The tone under the header's midline (the bar is 3.5rem tall, 4.25rem
    // from lg): whatever is painted there, read from the section or footer
    // around the topmost element that is not the header itself. Toned
    // tiles inside a section do not count, or the bar would flicker as
    // tiles and the gaps between them pass beneath it.
    const headerTone = () => {
      const x = html.clientWidth / 2;
      for (const el of document.elementsFromPoint(x, 34)) {
        if (el.closest(".site-header, .site-menu")) continue;
        const surface = el.closest<HTMLElement>(
          "section[data-tone], footer[data-tone]",
        );
        return surface?.dataset.tone ?? "bone";
      }
      return "bone";
    };

    const update = () => {
      frame = 0;
      const vh = viewport();

      if (!reduce.matches && !phone.matches) {
        const rects = new Map(
          sheets.map((sheet) => [sheet, sheet.getBoundingClientRect()]),
        );
        sheets.forEach((sheet, index) => {
          const rect = rects.get(sheet)!;
          const next = nextInStack(sheet);
          // How far the next sheet has slid over this one's visible part. A
          // sheet shorter than the viewport (the hero, a statement) starts
          // uncovered even though the next sheet is already on screen
          // beneath it.
          const visible = Math.min(rect.height, vh);
          const cover = next
            ? clamp((rect.bottom - rects.get(next)!.top) / visible)
            : 0;
          // The hero is in place from the start; every later sheet rises
          // into view.
          const rise = index === 0 ? 1 : clamp((vh - rect.top) / vh);
          sheet.style.setProperty("--cover", cover.toFixed(3));
          sheet.style.setProperty("--rise", rise.toFixed(3));
        });
      }

      if (DARK_TONES.has(headerTone())) html.dataset.nav = "dark";
      else delete html.dataset.nav;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    // Where a sheet sits in normal flow: its stack's top plus the heights of
    // every sheet before it in that stack. Sticky offsets never enter into
    // it, and the stacks themselves are never sticky or transformed.
    const flowTop = (target: HTMLElement) => {
      const stack = stackOf.get(target);
      const group = groupOf.get(target);
      if (!stack || !group) return null;
      let top = group.getBoundingClientRect().top + window.scrollY;
      for (const sheet of stack) {
        if (sheet === target) break;
        top += sheet.offsetHeight;
      }
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
    // In-page links: "#who-for", and "/#who-for" while already on the
    // homepage.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#") && window.location.pathname === "/"
          ? href.slice(1)
          : null;
      if (!hash) return;
      if (scrollToHash(hash, true)) {
        event.preventDefault();
        history.pushState(null, "", hash);
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
      if (!target || !sheet || !stackOf.has(sheet)) return;
      const next = nextInStack(sheet);
      if (!next) return;
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
    <div ref={ref} className="sheet-stack">
      {children}
    </div>
  );
}

/**
 * One stack of sheets. Each sheet but the last pins while the next slides
 * over it; `lap` rounds the stack's join with the one before.
 */
export function SheetGroup({
  lap = false,
  children,
}: {
  lap?: boolean;
  children: ReactNode;
}) {
  return <div className={`sheets ${lap ? "sheets--lap" : ""}`}>{children}</div>;
}
