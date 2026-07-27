import Link from "next/link";
import { Section } from "./Section";
import { Button } from "../Button";
import { Asterisk } from "../brand/Marks";
import { packageBriefHref, packages } from "@/content/festival-landing";
import { getPackage } from "@/lib/packages";

export function PackageComparison() {
  return (
    <Section
      id="festival-packages"
      eyebrow={packages.eyebrow}
      heading={packages.heading}
      headingId="festival-packages-heading"
    >
      <div className="mt-6 max-w-3xl space-y-4">
        <p className="text-lede text-ash">{packages.intro[0]}</p>
        <p className="text-body text-ash">
          {packages.intro[1]}{" "}
          <Link
            href={packages.homepageLink.href}
            className="text-white underline decoration-yellow underline-offset-4 transition-colors hover:text-yellow"
          >
            {packages.homepageLink.label}
          </Link>
          .
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {packages.levels.map((level) => {
          // Name and quantity come from the shared package data so the two
          // places they appear on the site cannot drift apart.
          const base = getPackage(level.id);
          const featured = level.id === "core";
          return (
            <article
              key={level.id}
              className={`flex h-full flex-col rounded-sm border p-6 transition-colors duration-500 ${
                featured
                  ? "border-white/40 bg-obsidian max-sm:order-first"
                  : "border-line bg-void hover:border-mute"
              }`}
            >
              <h3 className="font-display text-[1.4rem] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-white">
                {base?.name}
              </h3>
              <p className="text-tag mt-2 text-yellow">{base?.quantity}</p>
              <p className="text-body mt-4 text-ash">{level.line}</p>

              <ul className="mt-6 space-y-2.5">
                {level.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2.5">
                    <Asterisk className="mt-1 h-3 w-3 shrink-0 text-yellow" />
                    <span className="text-body text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <Button
                  href={packageBriefHref(level.id)}
                  variant={featured ? "primary" : "secondary"}
                  className="w-full justify-between"
                >
                  {level.ctaLabel}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-sm border border-line bg-obsidian p-7 sm:p-8">
        <h3 className="text-headline text-[1.35rem] text-white">{packages.footer.heading}</h3>
        <p className="text-body max-w-2xl text-ash">{packages.footer.body}</p>
        <Button href={packages.footer.cta.href}>{packages.footer.cta.label}</Button>
      </div>
    </Section>
  );
}
