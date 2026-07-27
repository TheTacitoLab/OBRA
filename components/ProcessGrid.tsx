"use client";

import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import { Asterisk } from "./brand/Marks";
import { processStages } from "@/lib/process";

/**
 * Stage accents: a curated warm -> cool sweep drawn from the brand accents, so
 * the numbers stay controlled and cohesive while subtly echoing the timeline.
 * The stage data itself is shared with the festival landing page timeline.
 */
const accents = [
  "text-coral",
  "text-flare",
  "text-magenta",
  "text-violet",
  "text-electric",
  "text-coral",
];

const steps = processStages.map((stage, i) => ({
  ...stage,
  accent: accents[i],
}));

// House easing curve (matches components/Reveal.tsx).
const EASE = [0.22, 1, 0.36, 1] as const;

// Each panel's base delay grows with its week number, so the gaps between
// Sampling (wk 4) -> Production (wk 6) -> Delivery (wk 9) read as longer,
// deliberately-built-in time. Kept modest so the sequence stays considered,
// not slow.
const HEAD_DELAY = 0.2;
const WEEK_STEP = 0.08;
const panelDelay = (weekNo: number) => HEAD_DELAY + (weekNo - 1) * WEEK_STEP;

const panelVariants: Variants = {
  hidden: { opacity: 0 },
  show: (weekNo: number) => ({
    opacity: 1,
    transition: {
      delay: panelDelay(weekNo),
      duration: 0.5,
      ease: EASE,
      delayChildren: panelDelay(weekNo) + 0.06,
      staggerChildren: 0.08,
    },
  }),
};

// Groups (title + week) that stagger their own children after activating.
const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// Fine inset border that fades up as the panel activates -> reads as the
// border subtly brightening, travelling panel to panel.
const brightenVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.85, ease: EASE } },
};

const numberVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  hover: { y: -5, transition: { duration: 0.35, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// Restrained scale + rotate settle as the final flourish per panel.
const asteriskVariants: Variants = {
  hidden: { opacity: 0, scale: 0.65, rotate: -55 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: EASE } },
  hover: { rotate: 90, transition: { duration: 0.4, ease: EASE } },
};

export function ProcessGrid() {
  const reduce = useReducedMotion();

  return (
    <motion.ol
      variants={{ hidden: {}, show: {} }}
      initial={reduce ? false : "hidden"}
      animate={reduce ? "show" : undefined}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 auto-rows-fr gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
    >
      {steps.map((step) => (
        <motion.li
          key={step.n}
          custom={step.weekNo}
          variants={panelVariants}
          whileHover={reduce ? undefined : "hover"}
          className="group relative flex min-h-[13.5rem] flex-col justify-between bg-void p-8 transition-colors duration-500 hover:bg-obsidian sm:min-h-[15rem] sm:p-9 lg:min-h-[16.5rem] lg:p-10"
        >
          {/* Entrance brighten: fine inset ring fades in as the panel activates. */}
          <motion.span
            aria-hidden="true"
            variants={brightenVariants}
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
          />

          {/* Stage number, top-left. */}
          <motion.span
            variants={numberVariants}
            className={`font-display text-[3.5rem] font-extrabold leading-none sm:text-[4rem] lg:text-[4.5rem] ${step.accent}`}
          >
            {step.n}
          </motion.span>

          {/* Title + week, bottom-left. */}
          <motion.div variants={groupVariants} className="relative">
            <motion.h3 variants={fadeUp} className="text-headline text-white">
              {step.title}
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-2 text-label text-ash">
              {step.week}
            </motion.p>
          </motion.div>

          {/* Yellow asterisk, top-right. Animated last as the final flourish. */}
          <motion.span
            variants={asteriskVariants}
            className="absolute right-8 top-8 text-yellow sm:right-9 sm:top-9 lg:right-10 lg:top-10"
          >
            <Asterisk className="h-5 w-5" />
          </motion.span>
        </motion.li>
      ))}
    </motion.ol>
  );
}
