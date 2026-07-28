import Link from "next/link";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { SectionLabel } from "../SectionLabel";
import { Button } from "../Button";
import { PackageCard } from "../PackageCard";
import { releasePackages, type PackageId } from "@/lib/packages";
import { festivalHref } from "@/lib/siteConfig";

// Number accent per package — a controlled warm→cool sweep from the brand
// palette. Core sits in brand yellow to reinforce its prominence.
const accentById: Record<PackageId, string> = {
  concept: "text-coral",
  core: "text-flare",
  edition: "text-magenta",
  major: "text-violet",
  volume: "text-electric",
};

// Desktop composition: three cards on row one, two wider cards on row two;
// tablet drops to two columns with the Volume Programme spanning both.
function colSpan(id: PackageId): string {
  if (id === "major") return "lg:col-span-3";
  if (id === "volume") return "md:col-span-2 lg:col-span-3";
  return "lg:col-span-2";
}

const wideIds: PackageId[] = ["major", "volume"];

export function Packages() {
  return (
    <section
      id="custom-football-jersey-production"
      className="py-24 sm:py-32 md:py-40"
    >
      <Container>
        <Reveal>
          <SectionLabel>Production levels</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] text-white">
            Custom football jersey production,{" "}
            <br className="hidden lg:block" />
            built to scale
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6 max-w-3xl space-y-4">
            <p className="text-lede text-ash">
              From your first 50-piece release to a 10,000-unit production
              programme, OBRA provides the design, development and manufacturing
              infrastructure needed to bring custom football jerseys to market.
            </p>
            <p className="text-body text-ash">
              Whether you are creating festival merchandise, a creator drop, a
              brand collaboration or a large-scale retail collection, we help you
              choose the right production level and manage the complete process
              from concept to delivery. The Core and Edition levels are the usual
              starting point for{" "}
              <Link
                href={festivalHref}
                className="text-white underline decoration-yellow underline-offset-4 transition-colors hover:text-yellow"
              >
                festival merchandise releases
              </Link>
              .
            </p>
          </div>
        </Reveal>

        {/* Rendered without a Reveal wrapper: a single scroll-reveal around the
            whole (very tall, on mobile) grid can leave the cards stuck at
            opacity 0 until an unreachable amount is on screen. */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-6">
          {releasePackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              accent={accentById[pkg.id]}
              wide={wideIds.includes(pkg.id)}
              className={colSpan(pkg.id)}
            />
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-14 flex flex-col items-start gap-5 rounded-sm border border-line bg-obsidian p-8 sm:mt-16 sm:p-10">
            <p className="text-headline text-white">Not sure where to start?</p>
            <p className="text-body max-w-2xl text-ash">
              You do not need to know the exact fabric, construction or
              production quantity before speaking with us. Tell us what you are
              creating, who it is for and when you need it. We will help you
              establish the right specification, quantity and production route.
            </p>
            <Button href="/brief/?package=unsure">Start a brief</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
