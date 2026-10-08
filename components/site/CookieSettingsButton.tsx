"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";

/** Reopens the cookie preferences (components/site/CookieConsent.tsx). */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      <span className="u-wipe">Cookie settings</span>
    </button>
  );
}
