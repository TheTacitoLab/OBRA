"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { Asterisk } from "./brand/Marks";
import { briefHref, navLinks } from "@/lib/siteConfig";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Swap to a solid void background once the hero scrolls away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-void/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label="OBRA home"
          className="relative z-50 inline-flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/obra-white.svg"
            alt=""
            width={1104}
            height={426}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-label text-ash transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-yellow transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          <Button href={briefHref}>Start a brief</Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-50 -mr-2 inline-flex h-11 w-11 items-center justify-center text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-6" aria-hidden>
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-void md:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav
              aria-label="Mobile"
              className="flex h-full flex-col justify-center gap-2 px-6 pb-16 pt-24"
            >
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="border-b border-line">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 py-5 text-headline text-white"
                    >
                      <span className="text-label text-ash">0{i + 1}</span>
                      <span className="flex-1">{link.label}</span>
                      <Asterisk className="h-4 w-4 text-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href={briefHref} className="w-full justify-between">
                  Start a brief
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
