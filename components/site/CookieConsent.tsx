"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  OPEN_CONSENT_EVENT,
  consentModeFor,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { privacyHref, siteConfig } from "@/lib/siteConfig";

declare global {
  interface Window {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

const NONE: ConsentChoice = { analytics: false, marketing: false };
const ALL: ConsentChoice = { analytics: true, marketing: true };

// Each tag is requested at most once per page load.
let gaRequested = false;
let linkedInRequested = false;

const addScript = (src: string) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

/**
 * Load what the choice allows, and nothing else. The Consent Mode defaults
 * and any stored choice were applied by the inline script in <head>
 * (lib/consent.ts) before this runs.
 *
 * With a GTM container configured, GTM is already on the page and its own
 * tags follow the consent signals, so nothing loads here: GA4 and LinkedIn
 * are never loaded twice. Without one, GA4 loads through gtag.js once
 * analytics is allowed and sends the page view itself; later client-side
 * navigations are counted by GA4's enhanced measurement (browser history
 * events), so no page view is ever sent by hand. LinkedIn Insight loads
 * only once marketing is allowed.
 */
function loadTags(choice: ConsentChoice) {
  const { gtmId, ga4Id, linkedInPartnerId } = siteConfig.analytics;
  if (gtmId) return;
  if (choice.analytics && !gaRequested) {
    gaRequested = true;
    window.gtag?.("js", new Date());
    window.gtag?.("config", ga4Id);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`);
  }
  if (choice.marketing && !linkedInRequested) {
    linkedInRequested = true;
    window._linkedin_partner_id = linkedInPartnerId;
    window._linkedin_data_partner_ids = [
      ...(window._linkedin_data_partner_ids ?? []),
      linkedInPartnerId,
    ];
    addScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }
}

/** First-party cookies each category's tags set, removed on opt-out. */
const COOKIES: Record<keyof ConsentChoice, RegExp> = {
  analytics: /^(_ga|_gid|_gat)/,
  marketing: /^(_gcl|li_|_li|ln_or|lidc|lms_)/,
};

function clearCookies(pattern: RegExp) {
  const host = window.location.hostname;
  const root = host.replace(/^www\./, "");
  const domains = ["", `; domain=${host}`, `; domain=.${root}`];
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (!name || !pattern.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

/**
 * The cookie banner and preferences. Shown until the visitor chooses, and
 * again whenever the footer's Cookie settings asks (OPEN_CONSENT_EVENT).
 * Three categories: essential (always on), analytics (Google Analytics)
 * and marketing (LinkedIn Insight). Accept and reject are equal in weight;
 * the categories open in place.
 *
 * Withdrawing a category that was on removes its cookies and reloads the
 * page, because a tag that has already run cannot be unloaded.
 *
 * Rendered only after hydration (nothing in the static HTML), early in the
 * page so keyboard users reach it before the content. When reopened it is
 * a non-modal dialog: focus moves into it, Escape closes it and focus goes
 * back to the button that opened it.
 */
export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [reopened, setReopened] = useState(false);
  const [manage, setManage] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>(NONE);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const stored = readConsent();
    if (stored) loadTags(stored);
    else setOpen(true);
    setReady(true);

    const onOpen = () => {
      openerRef.current = document.activeElement as HTMLElement | null;
      setDraft(readConsent() ?? NONE);
      setManage(true);
      setReopened(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  // Reopened from the footer: take focus.
  useEffect(() => {
    if (open && reopened) panelRef.current?.focus();
  }, [open, reopened]);

  const close = useCallback(() => {
    setOpen(false);
    setManage(false);
    if (reopened) openerRef.current?.focus();
    setReopened(false);
  }, [reopened]);

  useEffect(() => {
    if (!open || !reopened) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, reopened, close]);

  const apply = (choice: ConsentChoice) => {
    const previous = readConsent();
    writeConsent(choice);
    window.gtag?.("consent", "update", consentModeFor(choice));
    const withdrawn = (["analytics", "marketing"] as const).filter(
      (category) => previous?.[category] && !choice[category],
    );
    if (withdrawn.length) {
      withdrawn.forEach((category) => clearCookies(COOKIES[category]));
      window.location.reload();
      return;
    }
    loadTags(choice);
    close();
  };

  if (!ready || !open) return null;

  const options: {
    key: keyof ConsentChoice | "essential";
    name: string;
    text: string;
  }[] = [
    {
      key: "essential",
      name: "Essential",
      text: "Needed for the site to work, including remembering these choices. Always on.",
    },
    {
      key: "analytics",
      name: "Analytics",
      text: "Google Analytics, so we can see how people find and use the site.",
    },
    {
      key: "marketing",
      name: "Marketing",
      text: "The LinkedIn Insight Tag, so we can measure our LinkedIn advertising.",
    },
  ];

  return (
    <div
      ref={panelRef}
      className="consent"
      data-tone="ink"
      role={reopened ? "dialog" : "region"}
      aria-modal={reopened ? false : undefined}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <h2 id={titleId} className="consent__title">
        Cookies.
      </h2>
      <p className="consent__text">
        We use essential storage to run this site. With your permission
        we&rsquo;d also use analytics cookies to understand how it&rsquo;s
        used, and marketing cookies to measure our LinkedIn advertising.{" "}
        <Link href={`${privacyHref}#cookies`} className="text-link text-fg">
          Privacy policy
        </Link>
        .
      </p>

      {manage && (
        <fieldset className="consent__options">
          <legend className="sr-only">Cookie categories</legend>
          {options.map((option) => {
            const id = `${titleId}-${option.key}`;
            const essential = option.key === "essential";
            return (
              <div key={option.key} className="consent__option">
                <label htmlFor={id} className="consent__option-name">
                  {option.name}
                </label>
                <input
                  id={id}
                  type="checkbox"
                  role="switch"
                  className="switch"
                  checked={essential ? true : draft[option.key as keyof ConsentChoice]}
                  disabled={essential}
                  aria-describedby={`${id}-text`}
                  onChange={(event) => {
                    if (essential) return;
                    const checked = event.currentTarget.checked;
                    setDraft((value) => ({ ...value, [option.key]: checked }));
                  }}
                />
                <p id={`${id}-text`} className="consent__option-text">
                  {option.text}
                </p>
              </div>
            );
          })}
        </fieldset>
      )}

      <div className="consent__actions">
        <button type="button" className="btn btn-outline" onClick={() => apply(ALL)}>
          Accept all
        </button>
        <button type="button" className="btn btn-outline" onClick={() => apply(NONE)}>
          Reject non-essential
        </button>
      </div>
      <div className="consent__more flex flex-wrap items-center justify-between gap-x-4">
        {manage ? (
          <button
            type="button"
            className="btn btn-primary mt-1.5 w-full justify-center"
            onClick={() => apply(draft)}
          >
            Save choices
          </button>
        ) : (
          <button
            type="button"
            className="link-quiet cursor-pointer"
            onClick={() => {
              setDraft(readConsent() ?? NONE);
              setManage(true);
            }}
          >
            <span className="u-wipe u-static">Manage cookies</span>
          </button>
        )}
        {reopened && (
          <button
            type="button"
            className="link-quiet cursor-pointer"
            onClick={close}
          >
            <span className="u-wipe">Close</span>
          </button>
        )}
      </div>
    </div>
  );
}
