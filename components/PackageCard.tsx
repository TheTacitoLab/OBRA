"use client";

import { useId, useState } from "react";
import { Arrow, Asterisk } from "./brand/Marks";
import { Button } from "./Button";
import type { ReleasePackage } from "@/lib/packages";

const INITIAL_VISIBLE = 5;

/**
 * A single production-package card.
 *
 * - Name, quantity and summary are always visible (the shortened view).
 * - On mobile the details (benefits + best-for) collapse into an accordion so
 *   the stacked cards stay scannable; on desktop they are always shown.
 * - On desktop the benefit list shows ~5 items with a "View everything
 *   included" disclosure for the rest; on mobile the accordion already gates
 *   the list, so all benefits show once it is open.
 *
 * All copy is server-rendered (stays indexable); the client layer only drives
 * the two disclosures. Motion is CSS-only and neutralised under
 * `prefers-reduced-motion` by the global stylesheet.
 */
export function PackageCard({
  pkg,
  accent,
  wide = false,
  className = "",
}: {
  pkg: ReleasePackage;
  accent: string;
  wide?: boolean;
  className?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const bodyId = useId();
  const restId = useId();

  const visible = pkg.benefits.slice(0, INITIAL_VISIBLE);
  const rest = pkg.benefits.slice(INITIAL_VISIBLE);
  const hasMore = rest.length > 0;

  return (
    <article
      className={`group relative flex h-full flex-col rounded-sm border border-line bg-void p-6 transition-colors duration-500 hover:border-mute sm:p-8 ${className}`}
    >
      {/* Header — always visible (the shortened card on mobile) */}
      <h3
        className={`font-display font-bold uppercase leading-[1.04] tracking-[-0.01em] text-white ${
          wide ? "text-[clamp(1.9rem,2.6vw,2.6rem)]" : "text-[clamp(1.6rem,2vw,2.1rem)]"
        }`}
      >
        {pkg.name}
      </h3>
      <p
        className={`mt-2 font-display font-bold ${accent} ${
          wide ? "text-[clamp(1.4rem,2vw,1.9rem)]" : "text-[1.25rem]"
        }`}
      >
        {pkg.quantity}
      </p>
      <p className="text-body mt-4 text-ash">{pkg.summary}</p>

      {/* Mobile-only accordion toggle */}
      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-controls={bodyId}
        onClick={() => setMobileOpen((v) => !v)}
        className="text-tag mt-5 inline-flex items-center gap-2 self-start py-2 text-yellow sm:hidden"
      >
        {mobileOpen ? "Hide details" : "View details"}
        <Arrow
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            mobileOpen ? "-rotate-90" : "rotate-90"
          }`}
        />
      </button>

      {/* Details — collapsed on mobile, always open on desktop */}
      <div
        id={bodyId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out sm:[grid-template-rows:1fr] ${
          mobileOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="text-tag mt-6 text-mute sm:mt-8">What you get</p>
          <ul className="mt-4 space-y-3">
            {visible.map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <Asterisk className="mt-1 h-3.5 w-3.5 shrink-0 text-yellow" />
                <span className="text-body text-white/90">{benefit}</span>
              </li>
            ))}
          </ul>

          {hasMore && (
            <>
              {/* Desktop-only "view everything" toggle */}
              <button
                type="button"
                aria-expanded={viewAll}
                aria-controls={restId}
                onClick={() => setViewAll((v) => !v)}
                className="text-tag mt-4 hidden items-center gap-2 self-start py-2 text-yellow sm:inline-flex"
              >
                {viewAll ? "Show fewer details" : "View everything included"}
                <Arrow
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    viewAll ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </button>

              {/* Remaining benefits — always shown on mobile (parent gates
                  them), toggled on desktop. Always in the DOM for indexing. */}
              <div
                id={restId}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out max-sm:[grid-template-rows:1fr] ${
                  viewAll ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                }`}
              >
                <ul className="min-h-0 space-y-3 pt-3">
                  {rest.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <Asterisk className="mt-1 h-3.5 w-3.5 shrink-0 text-yellow" />
                      <span className="text-body text-white/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div className="mt-8 border-t border-line pt-5">
            <p className="text-tag text-mute">Best for</p>
            <p className="text-body mt-2 text-ash">{pkg.bestFor}</p>
          </div>
        </div>
      </div>

      {/* CTA — always visible, consistent across all cards */}
      <div className="mt-auto pt-6 sm:pt-8">
        <Button
          href={`/brief/?package=${pkg.id}`}
          variant="secondary"
          className="w-full justify-between"
        >
          {pkg.ctaLabel}
        </Button>
      </div>
    </article>
  );
}
