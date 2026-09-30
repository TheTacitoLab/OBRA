"use client";

import { useEffect } from "react";
import { UTM_PARAMS } from "@/lib/attribution";
import { startHref } from "@/lib/siteConfig";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (event: string) => void;
  }
}

/**
 * Click events and campaign attribution, without an analytics stack of its
 * own. A link marked `data-track="agency_send_brief"` is reported to
 * whichever of gtag, a GTM dataLayer or Plausible is on the page; with none
 * installed (the case today) nothing is sent anywhere.
 *
 * Tracked links to the brief form also carry the event name (as `enquiry`)
 * and any utm_* parameters the visitor arrived with, so the brief that
 * lands in the inbox says where it came from. The query string is added at
 * click time only: the links in the HTML stay clean, the form's canonical
 * stays /start-a-project/, and nothing is written to the device.
 */
export function Attribution() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[data-track]",
      );
      const name = link?.dataset.track;
      if (!link || !name) return;
      window.gtag?.("event", name);
      window.dataLayer?.push({ event: name });
      window.plausible?.(name);
      if (
        link.origin !== window.location.origin ||
        link.pathname !== startHref
      ) {
        return;
      }
      const url = new URL(link.href);
      url.searchParams.set("enquiry", name);
      const current = new URLSearchParams(window.location.search);
      for (const key of UTM_PARAMS) {
        const value = current.get(key);
        if (value) url.searchParams.set(key, value);
      }
      link.href = url.toString();
    };
    // Capture phase, so the href is decorated before the browser follows it.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
