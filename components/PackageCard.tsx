"use client";

import { useId, useState } from "react";
import { Arrow, Asterisk } from "./brand/Marks";
import { Button } from "./Button";
import type { ReleasePackage } from "@/lib/packages";

const INITIAL_VISIBLE = 5;

/**
 * A single production-package card. Server-renders all copy (including the
 * collapsed benefits, so everything stays indexable); the client layer only
 * drives the "View everything included" disclosure. Height animation uses the
 * grid-rows 0fr→1fr technique so nothing outside the card reflows abruptly, and
 * it is neutralised automatically under `prefers-reduced-motion` (global CSS
 * clamps transitions).
 */
export function PackageCard({
  pkg,
  index,
  accent,
  wide = false,
  className = "",
}: {
  pkg: ReleasePackage;
  index: number;
  accent: string;
  wide?: boolean;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();

  const visible = pkg.benefits.slice(0, INITIAL_VISIBLE);
  const rest = pkg.benefits.slice(INITIAL_VISIBLE);
  const hasMore = rest.length > 0;
  const featured = pkg.featured;

  return (
    <article
      className={`group relative flex h-full flex-col rounded-sm border p-6 transition-colors duration-500 sm:p-8 ${
        featured
          ? "border-yellow/60 bg-obsidian hover:border-yellow"
          : "border-line bg-void hover:border-mute"
      } ${className}`}
    >
      {/* Editorial index + utility badge */}
      <div className="flex items-start justify-between gap-4">
        <span className="text-tag text-mute">
          {String(index + 1).padStart(2, "0")}
        </span>
        {pkg.badge && (
          <span
            className={`text-tag rounded-full px-3 py-1 ${
              featured ? "bg-yellow text-void" : "border border-line text-ash"
            }`}
          >
            {pkg.badge}
          </span>
        )}
      </div>

      {/* Package name (H3) */}
      <h3
        className={`mt-5 font-display font-bold uppercase leading-[1.04] tracking-[-0.01em] text-white ${
          wide ? "text-[clamp(1.9rem,2.6vw,2.6rem)]" : "text-[clamp(1.6rem,2vw,2.1rem)]"
        }`}
      >
        {pkg.name}
      </h3>

      {/* Starting quantity — highly visible, never a price */}
      <p
        className={`mt-2 font-display font-bold ${accent} ${
          wide ? "text-[clamp(1.4rem,2vw,1.9rem)]" : "text-[1.25rem]"
        }`}
      >
        {pkg.quantity}
      </p>

      {/* Summary */}
      <p className="text-body mt-4 text-ash">{pkg.summary}</p>

      {/* What you get */}
      <p className="text-tag mt-8 text-mute">What you get</p>
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
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={regionId}
            onClick={() => setExpanded((v) => !v)}
            className="text-tag mt-4 inline-flex items-center gap-2 self-start rounded-sm py-2 text-yellow hover:underline"
          >
            {expanded ? "Show fewer details" : "View everything included"}
            <Arrow
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                expanded ? "-rotate-90" : "rotate-90"
              }`}
            />
          </button>

          {/* Remaining benefits — always in the DOM, visually collapsed */}
          <div
            id={regionId}
            className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <ul
              className={`min-h-0 space-y-3 pt-1 transition-opacity duration-300 ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
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

      {/* Best for */}
      <div className="mt-8 border-t border-line pt-5">
        <p className="text-tag text-mute">Best for</p>
        <p className="text-body mt-2 text-ash">{pkg.bestFor}</p>
      </div>

      {/* CTA — pinned to the bottom so cards in a row align */}
      <div className="mt-auto pt-8">
        <Button
          href={`/brief?package=${pkg.id}`}
          variant={featured ? "primary" : "secondary"}
          className="w-full justify-between"
        >
          {pkg.ctaLabel}
        </Button>
      </div>
    </article>
  );
}
