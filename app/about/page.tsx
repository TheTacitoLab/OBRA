import type { Metadata } from "next";
import { ArrowLink } from "@/components/site/Button";
import { JsonLd } from "@/components/site/JsonLd";
import { MarkedTitle } from "@/components/site/MarkedTitle";
import { Section } from "@/components/site/Section";
import {
  aboutHero,
  aboutMeta,
  closing,
  connected,
  original,
  people,
  process,
  team,
  type Person,
} from "@/content/about";
import { primaryCta } from "@/content/site";
import { mediaSources } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";
import { longestWordEm } from "@/lib/titleFit";

export const metadata: Metadata = pageMetadata({
  title: aboutMeta.title,
  absolute: true,
  description: aboutMeta.description,
  path: aboutMeta.path,
});

/** Paragraphs of running copy. */
function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="about-prose">
      {paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}

/**
 * One person, one full-width section: the figurine whole beside the copy
 * (the sides swap from one person to the next on desktop), stacked on
 * phones and tablets with the photograph first.
 */
function PersonSection({ person, index }: { person: Person; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <Section tone={reverse ? "ink" : "bone"} size="compact" rounded>
      <article className={`person ${reverse ? "person--reverse" : ""}`}>
        {/* A plain img, as on the homepage (lib/media.ts resizes it). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="person__photo"
          {...mediaSources(person.photo.file)}
          sizes="(min-width: 1024px) 34rem, min(28rem, 90vw)"
          width={person.photo.width}
          height={person.photo.height}
          alt={person.photo.alt}
          loading="lazy"
          decoding="async"
          data-reveal="up"
        />
        <div className="person__text" data-reveal="up" data-reveal-delay="1">
          <h3 className="person__name">{person.name}</h3>
          <p className="person__role">{person.role}</p>
          <div className="person__copy">
            {person.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <p className="person__closing">{person.closing}</p>
        </div>
      </article>
    </Section>
  );
}

/**
 * About: serious about product, with personality. The words carry the
 * credibility and the figurine photography carries the humour. One
 * editorial system with the homepage's information section (heading left,
 * copy right, both starting at the same line; stacked on phones), each
 * person in a full-width section of their own, the sides alternating, and
 * the group photograph as the close. No cards, no icons. #how-we-work (the
 * homepage, Services and the agency guide link to it) is the process.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildPageSchema({
          path: aboutMeta.path,
          title: aboutMeta.title,
          description: aboutMeta.description,
          crumbs: [{ name: "Home", path: "/" }, { name: aboutMeta.crumb }],
        })}
      />

      <Section tone="bone" size="large" hero>
        <div
          className="fit-hero fit-hero--solo"
          style={{ "--fit-em": longestWordEm(aboutHero.title) } as React.CSSProperties}
        >
          <h1 className="fit-title">
            <MarkedTitle title={aboutHero.title} mark={aboutHero.mark} />
          </h1>
        </div>
        <div className="article-split about-intro">
          <div data-reveal="up">
            <p className="about-intro__lead">{aboutHero.intro}</p>
            <p className="about-statement">{aboutHero.statement}</p>
          </div>
          <div data-reveal="up" data-reveal-delay="1">
            <Prose paragraphs={aboutHero.paragraphs} />
          </div>
        </div>
      </Section>

      <Section tone="stone" size="large" rounded>
        <div className="article-split">
          <h2 className="type-display-sm" data-reveal="up">
            {team.title}
          </h2>
          <div data-reveal="up" data-reveal-delay="1">
            <p className="about-team-line">{team.line}</p>
            <p className="about-team-copy">{team.copy}</p>
          </div>
        </div>
      </Section>

      {people.map((person, index) => (
        <PersonSection key={person.name} person={person} index={index} />
      ))}

      <Section tone="stone" rounded>
        <div className="article-split">
          <h2 className="about-heading">{connected.title}</h2>
          <div>
            <Prose paragraphs={[...connected.stages, ...connected.approach]} />
            <ul className="about-lines" aria-label="Who does what">
              {connected.roles.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Prose paragraphs={connected.after} />
            <p className="about-strong">
              {connected.closing.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="lime" rounded>
        <h2 className="type-display-sm" data-reveal="up">
          {original.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="article-split about-original__body">
          <div aria-hidden="true" />
          <Prose paragraphs={original.paragraphs} />
        </div>
      </Section>

      <Section id="how-we-work" tone="bone" rounded className="scroll-mt-16">
        <div className="article-split">
          <h2 className="about-heading">{process.title}</h2>
          <Prose paragraphs={process.paragraphs} />
        </div>
      </Section>

      <Section tone="ink" size="large" rounded className="cta-dark">
        {closing.photo && (
          // The whole group, never cropped: the frame is the photograph's
          // own shape at every width.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="about-group"
            {...mediaSources(closing.photo.file)}
            sizes="(min-width: 1536px) 88rem, 100vw"
            width={closing.photo.width}
            height={closing.photo.height}
            alt={closing.photo.alt}
            loading="lazy"
            decoding="async"
            data-reveal="up"
            style={
              {
                "--ratio": closing.photo.width / closing.photo.height,
              } as React.CSSProperties
            }
          />
        )}
        <div className={`article-split ${closing.photo ? "about-close--after-photo" : ""}`}>
          <div
            className="about-close__fit"
            style={
              {
                "--fit-em": longestWordEm(closing.title.join(" ")),
              } as React.CSSProperties
            }
          >
            <h2 className="about-close__title">
              {closing.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div>
            <p className="about-close__line">{closing.line}</p>
            <ArrowLink
              strong
              href={primaryCta.href}
              track="get_in_touch_click"
              trackSection="about_close"
            >
              {primaryCta.label}
            </ArrowLink>
          </div>
        </div>
      </Section>
    </>
  );
}
