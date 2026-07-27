import Link from "next/link";
import { Container } from "../Container";
import { SectionLabel } from "../SectionLabel";
import { Button } from "../Button";
import { Polaroid } from "../Polaroid";
import { Asterisk } from "../brand/Marks";
import { Marquee } from "../Marquee";
import { breadcrumb, hero } from "@/content/festival-landing";

export function FestivalHero() {
  return (
    <section
      aria-labelledby="festival-hero-heading"
      className="blend-down-purple pb-16 pt-28 sm:pt-32 md:pb-20"
    >
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8">
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

        {/* Headline and image share the row, both aligned to the top so the
            image sits high on the page rather than dropping below the copy. */}
        <div className="grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <SectionLabel>{hero.eyebrow}</SectionLabel>

            {/* One H1 element. The three lines are a styling decision. */}
            <h1
              id="festival-hero-heading"
              className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.9rem)] font-extrabold uppercase leading-[0.97] tracking-[-0.015em] text-white"
            >
              <span className="block">{hero.headingLineOne}</span>
              <span className="block">{hero.headingLineTwo}</span>
              <span className="block">{hero.headingLineThree}</span>
            </h1>

            <div className="text-pretty mt-7 space-y-4">
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

          {/* Two instant photos, overlapping and tilted, matching the pair on
              the homepage. */}
          <div className="relative mx-auto flex w-full max-w-sm flex-col items-center lg:mt-2 lg:block lg:h-full lg:min-h-[32rem] lg:max-w-none">
            <Polaroid
              src="/jerseys/obra-jersey-festival.webp"
              alt="A festival-goer wearing a purple tie-dye OBRA football shirt with the griffin crest"
              caption="OBRA · Festival"
              className="w-[80%] -rotate-3 lg:absolute lg:left-0 lg:top-0 lg:w-[58%] lg:-rotate-6"
            />
            <Polaroid
              src="/jerseys/obra-jersey-flatlay.webp"
              alt="OBRA football jerseys laid flat, including a purple jacquard shirt with the OBRA wordmark and griffin crest"
              caption="OBRA · Jerseys"
              className="-mt-10 w-[74%] rotate-3 lg:absolute lg:bottom-0 lg:right-0 lg:z-10 lg:mt-0 lg:w-[54%] lg:rotate-[5deg]"
            />
          </div>
        </div>
      </Container>

      {/* Proof bar. Same treatment as the homepage billing marquee. The track
          itself is aria-hidden and duplicated, so the list below carries the
          same copy for assistive tech and for indexing. */}
      <div className="mt-14 border-y border-white/10 py-6">
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
