"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Arrow } from "./brand/Marks";

/**
 * Mobile-only sticky CTA.
 *
 * Appears once the reader passes `showAfterId` and hides again when
 * `hideAtId` enters view, so it never covers the final CTA. Animates transform
 * and opacity only, and is pinned out of the way for reduced-motion users
 * rather than sliding.
 */
export function StickyCta({
  href,
  label,
  showAfterId,
  hideAtId,
}: {
  href: string;
  label: string;
  showAfterId: string;
  hideAtId: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById(showAfterId);
    const end = document.getElementById(hideAtId);
    if (!trigger || !end) return;

    let passedTrigger = false;
    let atEnd = false;
    const sync = () => setVisible(passedTrigger && !atEnd);

    const triggerObserver = new IntersectionObserver(
      ([entry]) => {
        // Visible once the trigger section has scrolled above the viewport.
        passedTrigger = entry.boundingClientRect.top < 0;
        sync();
      },
      { threshold: 0 },
    );
    const endObserver = new IntersectionObserver(
      ([entry]) => {
        atEnd = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );

    triggerObserver.observe(trigger);
    endObserver.observe(end);
    return () => {
      triggerObserver.disconnect();
      endObserver.disconnect();
    };
  }, [showAfterId, hideAtId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-void/95 p-3 backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href={href}
        tabIndex={visible ? undefined : -1}
        className="group flex min-h-[44px] w-full items-center justify-between gap-3 rounded-full bg-yellow px-6 py-3 text-label text-void"
      >
        <span>{label}</span>
        <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
