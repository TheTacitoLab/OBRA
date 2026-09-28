"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { navLinks, primaryCta } from "@/content/site";
import { siteConfig, socialLinks } from "@/lib/siteConfig";

/**
 * Minimal fixed header. No background of its own: its colour follows the
 * surface beneath it (see --nav-fg in globals.css). It slips away while the
 * reader scrolls down and returns on the first scroll up, so it never sits
 * over copy for long.
 */
export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const isCurrent = useCallback(
    (href: string) =>
      pathname === href || (href !== "/" && pathname.startsWith(href)),
    [pathname],
  );

  // Hide on scroll down, reveal on scroll up. Always visible near the top.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      if (y < 24) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Close the menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the menu is open: lock scrolling, make the page inert, trap focus
  // in the menu, close on Escape, and return focus to the toggle afterwards.
  useEffect(() => {
    const page = document.getElementById("page");
    if (!open) {
      page?.removeAttribute("inert");
      return;
    }
    const toggle = toggleRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    page?.setAttribute("inert", "");
    const focusTimer = window.setTimeout(
      () => firstLinkRef.current?.focus(),
      80,
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      page?.removeAttribute("inert");
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header
        className="site-header"
        data-hidden={hidden && !open ? "true" : "false"}
        data-menu-open={open ? "true" : "false"}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo className="relative z-[70] w-[6.75rem] sm:w-[7.5rem]" />

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link u-wipe"
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={primaryCta.href} className="btn btn-nav">
              {primaryCta.label}
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="burger relative z-[70] -mr-3 lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="burger__line" aria-hidden="true" />
            <span className="burger__line" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Full-screen menu below the desktop breakpoint. Always mounted so the
          close transition can run; inert while closed so nothing inside can
          take focus. */}
      <div
        id="site-menu"
        className="site-menu lg:hidden"
        data-open={open ? "true" : "false"}
        inert={!open}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex h-full w-full max-w-[90rem] flex-col justify-between px-5 pb-8 pt-28 sm:px-8"
        >
          <ul className="biglist flex flex-col">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className="site-menu__item"
                style={{ "--i": index } as React.CSSProperties}
              >
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  className="biglink type-link-sm"
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                >
                  <span className="u-wipe u-lime">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="site-menu__item mt-10 flex flex-col gap-8"
            style={{ "--i": navLinks.length } as React.CSSProperties}
          >
            <Link href={primaryCta.href} className="btn btn-primary self-start">
              {primaryCta.label}
            </Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 type-small text-muted">
              <a href={`mailto:${siteConfig.email}`} className="u-wipe">
                {siteConfig.email}
              </a>
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="u-wipe"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
