/**
 * Shared by the click tracker (components/site/Attribution.tsx) and the
 * brief form: the campaign parameters carried from a landing page to the
 * form, and the tracked enquiry types the form recognises.
 */
export const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/** Tracked CTAs that lead to the brief form, as they read in the inbox. */
export const ENQUIRY_LABELS: Record<string, string> = {
  agency_send_brief: "Agency brief",
  agency_trade_pricing: "Agency trade pricing",
};
