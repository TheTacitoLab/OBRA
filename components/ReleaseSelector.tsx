"use client";

import { useEffect, useId, useState } from "react";
import {
  getPackage,
  parsePackageParam,
  releasePackages,
  unsureOption,
  volumeOptions,
  type BriefPackageId,
} from "@/lib/packages";

const packageOptions = [
  ...releasePackages.map((p) => ({
    id: p.id as BriefPackageId,
    name: p.name,
    quantity: p.quantity,
    description: p.shortDescription,
  })),
  {
    id: "unsure" as BriefPackageId,
    name: unsureOption.name,
    quantity: unsureOption.quantity,
    description: unsureOption.shortDescription,
  },
];

const focusRing =
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-flare";

/**
 * Release-package + estimated-volume picker for the brief form.
 *
 * Uses real, accessible radio inputs (so the values are collected by the
 * form's FormData as `releasePackage` and `estimatedVolume`) with a
 * card/segmented visual layer. Package and volume stay synchronised, and a
 * `?package=` query parameter preselects a card. All motion is CSS-only, so it
 * is neutralised under `prefers-reduced-motion` by the global stylesheet.
 */
export function ReleaseSelector() {
  const [pkg, setPkg] = useState<BriefPackageId | "">("");
  const [volume, setVolume] = useState<string>("");
  const [helper, setHelper] = useState<string | null>(null);
  const helperId = useId();

  // Preselect from ?package= on load. Read from the URL directly (works with
  // the static export) and ignore anything invalid.
  useEffect(() => {
    const param = parsePackageParam(
      new URLSearchParams(window.location.search).get("package"),
    );
    if (param) setPkg(param);
  }, []);

  function choosePackage(id: BriefPackageId) {
    setPkg(id);
    // Explicit package choice: don't force a volume, just clear any
    // volume-derived helper so nothing contradicts the user.
    setHelper(null);
  }

  function chooseVolume(value: string) {
    setVolume(value);
    const option = volumeOptions.find((v) => v.value === value);
    if (option?.recommends) {
      setPkg(option.recommends);
      const name = getPackage(option.recommends)?.name;
      setHelper(name ? `Based on this volume, the ${name} is likely the best fit.` : null);
    } else {
      // "Not sure yet" — leave the package as-is, no recommendation.
      setHelper(null);
    }
  }

  // Volume ranges that suit the currently-selected package (for a subtle hint).
  const recommendedVolumes =
    pkg && pkg !== "unsure"
      ? volumeOptions.filter((v) => v.recommends === pkg).map((v) => v.value)
      : [];

  return (
    <>
      {/* Release package */}
      <fieldset>
        <legend className="text-label text-white">
          Which release fits your project?
        </legend>
        <p className="text-body mt-2 text-ash">
          Choose the closest option. If you are unsure, select &ldquo;Not sure
          yet&rdquo; and we will guide you.
        </p>

        <div className="mt-4 space-y-3">
          {packageOptions.map((option) => {
            const selected = pkg === option.id;
            return (
              <label key={option.id} className="relative block cursor-pointer">
                <input
                  type="radio"
                  name="releasePackage"
                  value={option.id}
                  checked={selected}
                  onChange={() => choosePackage(option.id)}
                  className="peer sr-only"
                />
                <span
                  className={`flex gap-4 rounded-sm border bg-slate p-4 transition-colors ${focusRing} ${
                    selected
                      ? "border-2 border-yellow bg-obsidian"
                      : "border border-line hover:border-mute"
                  }`}
                >
                  {/* Custom radio indicator (not colour-only: border + fill) */}
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      selected ? "border-yellow" : "border-mute"
                    }`}
                    aria-hidden="true"
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-yellow" />}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`text-body block font-medium ${selected ? "text-white" : "text-white/90"}`}
                    >
                      {option.name}
                    </span>
                    {option.quantity && (
                      <span className="text-tag mt-1 block text-ash">
                        {option.quantity}
                      </span>
                    )}
                    <span className="text-body mt-1 block text-ash">
                      {option.description}
                    </span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Estimated production volume */}
      <fieldset>
        <legend className="text-label text-white">
          Estimated production volume
        </legend>
        <p className="text-body mt-2 text-ash">
          An initial estimate is enough. We can confirm the final quantity
          during development.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {volumeOptions.map((option) => {
            const selected = volume === option.value;
            const recommended = !selected && recommendedVolumes.includes(option.value);
            return (
              <label key={option.value} className="relative block cursor-pointer">
                <input
                  type="radio"
                  name="estimatedVolume"
                  value={option.value}
                  checked={selected}
                  onChange={() => chooseVolume(option.value)}
                  className="peer sr-only"
                />
                <span
                  className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-sm border px-3 py-2 text-center transition-colors ${focusRing} ${
                    selected
                      ? "border-2 border-yellow bg-obsidian text-white"
                      : recommended
                        ? "border border-yellow/40 bg-slate text-ash hover:border-mute"
                        : "border border-line bg-slate text-ash hover:border-mute"
                  }`}
                >
                  <span className="text-body leading-tight">{option.label}</span>
                  {recommended && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow"
                      aria-hidden="true"
                    />
                  )}
                  {recommended && <span className="sr-only"> (recommended)</span>}
                </span>
              </label>
            );
          })}
        </div>

        <p
          id={helperId}
          role="status"
          aria-live="polite"
          className="text-body mt-3 min-h-[1.25rem] text-mute"
        >
          {helper}
        </p>
      </fieldset>
    </>
  );
}
