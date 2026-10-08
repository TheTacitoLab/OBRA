import { siteConfig } from "@/lib/siteConfig";

/**
 * Cookie consent: what the visitor chose, where it is kept, and how it maps
 * onto Google Consent Mode v2.
 *
 * Three categories. Essential is always on: the site sets no cookies of its
 * own, and the one thing it stores is this choice (in localStorage, under
 * CONSENT_KEY). Analytics (Google Analytics 4) and marketing (the LinkedIn
 * Insight Tag) are off until the visitor turns them on, and neither script
 * is requested before then (components/site/CookieConsent.tsx).
 *
 * A choice lasts CONSENT_MAX_AGE_DAYS, then the banner asks again. Bump
 * CONSENT_VERSION when the categories or the tools behind them change, so
 * every visitor is asked afresh.
 */
export const CONSENT_KEY = "mbo-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 365;

/** Dispatched on window to open the preferences (the footer button). */
export const OPEN_CONSENT_EVENT = "mbo:cookie-settings";

export type ConsentChoice = { analytics: boolean; marketing: boolean };

/** As stored: short keys, the version and when the choice was made. */
type StoredConsent = { v: number; a: boolean; m: boolean; t: number };

const MAX_AGE_MS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

/** The visitor's current choice, or null if they have not made one. */
export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<StoredConsent>;
    if (stored.v !== CONSENT_VERSION || typeof stored.t !== "number") return null;
    if (Date.now() - stored.t > MAX_AGE_MS) return null;
    return { analytics: stored.a === true, marketing: stored.m === true };
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  const stored: StoredConsent = {
    v: CONSENT_VERSION,
    a: choice.analytics,
    m: choice.marketing,
    t: Date.now(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
}

/** The Consent Mode v2 signals for a choice. */
export function consentModeFor(choice: ConsentChoice) {
  const marketing = choice.marketing ? "granted" : "denied";
  return {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  } as const;
}

/**
 * The inline script at the very top of <head> (app/layout.tsx). It runs
 * before any tag can load and:
 *
 * 1. defines gtag() on the dataLayer and sets every Consent Mode signal to
 *    denied by default;
 * 2. re-applies a stored choice straight away, so a returning visitor's
 *    tags start with the right state;
 * 3. loads Google Tag Manager, only when a container ID is configured
 *    (lib/siteConfig.ts), after the defaults.
 *
 * Built from the constants above so the two halves cannot drift apart.
 */
export function consentBootstrapScript() {
  const gtmId = siteConfig.analytics.gtmId;
  const gtm = gtmId
    ? `(function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`
    : "";
  return [
    "window.dataLayer=window.dataLayer||[];",
    "window.gtag=function(){window.dataLayer.push(arguments);};",
    "gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});",
    "gtag('set','ads_data_redaction',true);",
    `try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_KEY)})||'null');`,
    `if(c&&c.v===${CONSENT_VERSION}&&typeof c.t==='number'&&Date.now()-c.t<=${MAX_AGE_MS}){`,
    "var m=c.m?'granted':'denied';",
    "gtag('consent','update',{analytics_storage:c.a?'granted':'denied',ad_storage:m,ad_user_data:m,ad_personalization:m});}",
    "}catch(e){}",
    gtm,
  ].join("");
}
