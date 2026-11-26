"use client";

import { useEffect, useRef } from "react";

/**
 * The film behind the hero: dark, navy-graded footage of the work being
 * made, muted, on a loop, filling the hero behind the title.
 *
 * It is kept out of the page's loading altogether. The element is
 * rendered with no source, so nothing is fetched while the page loads;
 * once the page has finished loading this gives it a source, plays it and
 * fades it in over the plain navy that was there until then. It is not
 * loaded at all for a reader who has asked for reduced motion or reduced
 * data, or who is on a slow connection, and it is paused whenever the
 * hero is scrolled out of sight or the tab is hidden.
 *
 * Two encodes of the same film (public/media): a 720p one, and a tall
 * centre crop for phones held upright, which would show only that middle
 * strip of the wide one anyway. Purely decorative: no sound, hidden from
 * assistive technology, out of the tab order.
 */
const WIDE = "/media/hero-wide.mp4";
const TALL = "/media/hero-tall.mp4";

type Connection = { saveData?: boolean; effectiveType?: string };

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "")
    )
      return;

    const hero = video.closest<HTMLElement>(".sheet");
    let ready = false;
    let timer = 0;
    let frame = 0;

    // The hero is the first thing on the page: it is in sight until the
    // reader has scrolled its own height.
    const sync = () => {
      frame = 0;
      if (!ready) return;
      const inSight =
        !document.hidden && (!hero || window.scrollY < hero.offsetHeight);
      if (!inSight) {
        video.pause();
        return;
      }
      if (!video.getAttribute("src")) {
        const upright =
          window.innerWidth < 768 && window.innerHeight > window.innerWidth;
        video.muted = true;
        video.src = upright ? TALL : WIDE;
      }
      video.play().catch(() => {
        // Autoplay refused (a low-power mode, say): the navy stays.
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    const begin = () => {
      timer = window.setTimeout(() => {
        ready = true;
        sync();
      }, 400);
    };
    const show = () => {
      video.dataset.on = "true";
    };

    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    video.addEventListener("playing", show, { once: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);

    return () => {
      window.removeEventListener("load", begin);
      video.removeEventListener("playing", show);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("visibilitychange", schedule);
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video"
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}
