import Link from "next/link";
import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";
import { Button } from "../Button";
import { Asterisk } from "../brand/Marks";
import { Marquee } from "../Marquee";
import { AssetPlaceholder } from "./AssetPlaceholder";
import { breadcrumb, hero, heroImage } from "@/content/festival-landing";

export function FestivalHero() {
  return (
    <section aria-labelledby="festival-hero-heading" className="pb-16 pt-28 sm:pt-32 md:pb-20">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-tag text-mute">
            <li>
              <Link
                href="/"
                className="underline-offset-4 transition-colors hover:text-yellow hover:underline"
              >
                {breadcrumb.homeLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ash">
              {breadcrumb.currentLabel}
            </li>
          </ol>
        </nav>

        <SectionLabel>{hero.eyebrow}</SectionLabel>

        {/* One H1 element. The two lines are a styling decision, so the heading
            spans the full measure rather than sharing the row with the image. */}
        <h1
          id="festival-hero-heading"
          className="mt-5 font-display text-[clamp(2.2rem,5.2vw,5rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.015em] text-white"
        >
          <span className="block">{hero.headingLineOne}</span>
          <span className="block">{hero.headingLineTwo}</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div>
            <div className="max-w-2xl space-y-4">
              <p className="text-lede text-ash">{hero.standfirst[0]}</p>
              <p className="text-body text-ash">{hero.standfirst[1]}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={hero.primaryCta.href} className="justify-between sm:justify-start">
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                className="justify-between sm:justify-start"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* LCP slot. Replace with the real asset, preloaded and eager. */}
          <AssetPlaceholder
            asset={heroImage}
            className="mx-auto w-full max-w-sm lg:max-w-none"
          />
        </div>
      </Container>

      {/* Proof bar. Same treatment as the homepage billing marquee. The track
          itself is aria-hidden and duplicated, so the list below carries the
          same copy for assistive tech and for indexing. */}
      <div className="mt-14 border-y border-line bg-void py-6">
        <Marquee duration={36}>
          {hero.proofBar.map((item) => (
            <span key={item} className="flex items-center">
              <span className="px-8 font-display text-[1.75rem] font-extrabold uppercase leading-none tracking-tight text-white sm:text-[2.5rem]">
                {item}
              </span>
              <Asterisk className="h-5 w-5 text-yellow sm:h-7 sm:w-7" />
            </span>
          ))}
        </Marquee>
        <ul className="sr-only">
          {hero.proofBar.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
