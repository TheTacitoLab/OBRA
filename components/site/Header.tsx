"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Arrow } from "./Button";
import {
  navLinks,
  primaryCta,
  audiences,
  products,
  pageHref,
} from "@/content/site";
import { siteConfig, socialLinks } from "@/lib/siteConfig";

/**
 * Compact fixed header. Transparent over the top of the page; once the
 * reader scrolls it becomes a quiet bar in the colour of the surface
 * beneath it (see --nav-bg in globals.css), slipping away on scroll down
 * and returning on the first scroll up.
 */
export function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // A nav item is current on its own page, on anything beneath it, and on
  // the landing pages it indexes (Who for on /festivals/, What we make on
  // /headwear/, and so on).
  const isCurrent = useCallback(
    (href: string) => {
      if (pathname === href) return true;
      if (href !== "/" && pathname.startsWith(href)) return true;
      const children =
        href === "/who-for/"
          ? audiences
          : href === "/what-we-make/"
            ? products
            : [];
      return children.some((page) => pathname.startsWith(pageHref(page.slug)));
    },
    [pathname],
  );

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      setScrolled(y > 12);
      if (y < 24) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
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

  // While the menu is open: lock scrolling, make the page inert, move focus
  // into the menu, close on Escape, and return focus to the toggle afterwards.
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
      60,
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
        data-scrolled={scrolled && !open ? "true" : "false"}
        data-menu-open={open ? "true" : "false"}
      >
        <div className="site-header__bar mx-auto w-full max-w-[140rem] px-5 sm:px-8 lg:px-12 2xl:px-16 3xl:px-20">
          <Logo className="relative z-[70] w-[6.5rem] sm:w-[7.25rem]" />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                  >
                    <span className="u-wipe">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={primaryCta.href} className="btn btn-nav">
              <span>{primaryCta.label}</span>
              <Arrow />
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
            <span className="burger__line burger__line--a" aria-hidden="true" />
            <span className="burger__line burger__line--b" aria-hidden="true" />
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
          className="mx-auto flex h-full w-full max-w-[140rem] flex-col overflow-y-auto px-5 pb-6 pt-20 sm:px-8"
        >
          <div>
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
            <ul
              className="site-menu__item mt-6 flex flex-wrap gap-x-5 gap-y-1"
              style={{ "--i": navLinks.length } as React.CSSProperties}
              aria-label="Who for"
            >
              {audiences.map((audience) => (
                <li key={audience.slug}>
                  <Link
                    href={pageHref(audience.slug)}
                    className="nav-link"
                  >
                    <span className="u-wipe text-muted">{audience.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="site-menu__item mt-10 flex flex-col gap-6"
            style={{ "--i": navLinks.length + 1 } as React.CSSProperties}
          >
            <Link href={primaryCta.href} className="btn btn-primary self-start">
              <span>{primaryCta.label}</span>
              <Arrow />
            </Link>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 type-small text-muted">
              <a href={`mailto:${siteConfig.email}`} className="nav-link">
                <span className="u-wipe">{siteConfig.email}</span>
              </a>
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="nav-link"
                >
                  <span className="u-wipe">{link.label}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
