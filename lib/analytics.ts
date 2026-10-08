import { readConsent } from "@/lib/consent";
import { siteConfig } from "@/lib/siteConfig";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (event: string, options?: { props: Record<string, string> }) => void;
  }
}

/**
 * Non-identifying context for an event. Never names, email addresses,
 * phone numbers, company names or anything typed into a form.
 */
export type TrackParams = {
  /** Where on the page: "hero", "who_for", "header" and so on. */
  section?: string;
  /** What was chosen: an audience, a product or a service slug. */
  category?: string;
  /** Where the link leads, as a site path. */
  destination?: string;
};

/**
 * Report one event (get_in_touch_click, who_for_tile_click,
 * product_tile_click, service_tile_click, notes_click,
 * contact_form_submit), only once the visitor has allowed analytics. Goes
 * to GTM's dataLayer when a container is configured, to GA4 directly
 * otherwise; nothing is queued before consent, so nothing is sent later
 * on behalf of a visitor who had not agreed at the time.
 */
export function track(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  if (!readConsent()?.analytics) return;
  const payload: Record<string, string> = { page_path: window.location.pathname };
  for (const [key, value] of Object.entries(params)) {
    if (value) payload[key] = value.slice(0, 100);
  }
  if (siteConfig.analytics.gtmId) window.dataLayer?.push({ event, ...payload });
  else window.gtag?.("event", event, payload);
  window.plausible?.(event, { props: payload });
}
