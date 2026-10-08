"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { ENQUIRY_LABELS, UTM_PARAMS } from "@/lib/attribution";
import { contactHref } from "@/lib/siteConfig";

/**
 * Click events and campaign attribution. A link marked
 * `data-track="get_in_touch_click"` (with optional `data-track-section` and
 * `data-track-category`) is reported through lib/analytics.ts, which sends
 * nothing unless the visitor has allowed analytics.
 *
 * Plain-anchor links to the enquiry form also carry any utm_* parameters
 * the visitor arrived with, and the agency guide's tracked buttons their
 * event name (as `enquiry`), so the enquiry that lands in the inbox says
 * where it came from. The query string is added at click time only: the
 * links in the HTML stay clean, the form's canonical stays /contact/, and
 * nothing is written to the device.
 */
export function Attribution() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[data-track]",
      );
      const name = link?.dataset.track;
      if (!link || !name) return;
      const internal = link.origin === window.location.origin;
      track(name, {
        section: link.dataset.trackSection,
        category: link.dataset.trackCategory,
        destination: internal ? link.pathname + link.hash : undefined,
      });
      if (!internal || link.pathname !== contactHref) return;
      const url = new URL(link.href);
      if (ENQUIRY_LABELS[name]) url.searchParams.set("enquiry", name);
      const current = new URLSearchParams(window.location.search);
      for (const key of UTM_PARAMS) {
        const value = current.get(key);
        if (value) url.searchParams.set(key, value);
      }
      if (url.href !== link.href) link.href = url.toString();
    };
    // Capture phase, so the href is decorated before the browser follows it.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
