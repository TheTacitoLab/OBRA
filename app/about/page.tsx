import type { Metadata } from "next";
import { PageHero } from "@/components/landing/PageHero";
import { ArrowLink } from "@/components/site/Button";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/site/Section";
import {
  aboutHero,
  aboutMeta,
  beliefs,
  closing,
  fit,
  growth,
  howWeWork,
  origin,
  team,
  type Person,
} from "@/content/about";
import { primaryCta } from "@/content/site";
import { mediaSources } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { buildPageSchema } from "@/lib/schema/organization";

export const metadata: Metadata = pageMetadata({
  title: aboutMeta.title,
  absolute: true,
  description: aboutMeta.description,
  path: aboutMeta.path,
});

/** Paragraphs of running copy; the first can lead at lede size. */
function Prose({ paragraphs, lead = false }: { paragraphs: string[]; lead?: boolean }) {
  return (
    <div className={`about-prose ${lead ? "about-prose--lead" : ""}`}>
      {paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}

/** Short lines set one per line in the display face. Not cards. */
function Sequence({
  lines,
  label,
  sentences = false,
}: {
  lines: string[];
  label: string;
  /** Full sentences rather than short fragments: a calmer size. */
  sentences?: boolean;
}) {
  return (
    <ul
      className={`about-sequence ${sentences ? "about-sequence--sentences" : ""}`}
      aria-label={label}
    >
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

/** "A, B, C and D" */
const listOf = (names: string[]) =>
  names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

function PersonColumn({ person }: { person: Person }) {
  return (
    <article className="person">
      {person.photo && (
        // A plain img, as on the homepage (lib/media.ts resizes it).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="person__photo"
          {...mediaSources(person.photo.file)}
          sizes="(min-width: 1024px) 30vw, 100vw"
          alt={person.photo.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: person.photo.position ?? "50% 30%" }}
        />
      )}
      <h3 className="person__name">{person.name}</h3>
      <p className="person__role">{person.role}</p>
      <div className="person__copy">
        {person.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        {person.brands && person.brands.length > 0 && (
          <p>His previous work includes design for {listOf(person.brands)}.</p>
        )}
        {person.afterBrands?.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <p className="person__short">
        <span className="person__short-label">Short version:</span>{" "}
        {person.short}
      </p>
    </article>
  );
}

/**
 * About: three people who make things together. Human and short, set in
 * the site's own voice: big display headings, plain reading columns,
 * typographic lists instead of cards, and plain text links instead of
 * buttons. #how-we-work (the agency guide and the homepage link to it)
 * is the process section.
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

      <PageHero
        full
        title={aboutHero.title}
        mark={aboutHero.mark}
        aside={
          <div className="flex flex-col gap-4">
            <p className="type-lede">{aboutHero.lede}</p>
            {aboutHero.body.map((text) => (
              <p key={text} className="type-body text-muted">
                {text}
              </p>
            ))}
            <div className="mt-2">
              <ArrowLink
                strong
                href={primaryCta.href}
                track="get_in_touch_click"
                trackSection="about_hero"
              >
                {primaryCta.label}
              </ArrowLink>
            </div>
          </div>
        }
      />

      <Section tone="stone">
        <div className="about-split">
          <h2 className="type-display-sm about-split__title">{origin.title}</h2>
          <Prose paragraphs={origin.paragraphs} lead />
        </div>
      </Section>

      <Section tone="bone">
        <div className="about-split">
          <h2 className="type-display-sm about-split__title">{growth.title}</h2>
          <div>
            <Prose paragraphs={growth.before} />
            <Sequence lines={growth.sequence} label="What building it properly covers" />
            <Prose paragraphs={growth.after} />
          </div>
        </div>
      </Section>

      <Section tone="ink" size="large">
        <div className="about-split about-split--top">
          <h2 className="type-display-sm about-split__title">{team.title}</h2>
          <div>
            <p className="about-team-lede">{team.lede}</p>
            <p className="type-body mt-3 text-muted">{team.aside}</p>
          </div>
        </div>
        <div className="people">
          {team.people.map((person) => (
            <PersonColumn key={person.name} person={person} />
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="about-split">
          <h2 className="type-display-sm about-split__title">{fit.title}</h2>
          <div>
            <Prose paragraphs={fit.opening} lead />
            <Sequence lines={fit.roles} label="Who does what" sentences />
            <Prose paragraphs={fit.closing} />
            <Prose paragraphs={fit.wants} />
          </div>
        </div>
      </Section>

      <Section tone="lime">
        <div className="about-split">
          <h2 className="type-display-sm about-split__title">{beliefs.title}</h2>
          <div>
            <Prose paragraphs={beliefs.before} lead />
            <Sequence lines={beliefs.sequence} label="What better means" />
            <Prose paragraphs={beliefs.after} />
          </div>
        </div>
      </Section>

      <Section id="how-we-work" tone="bone" className="scroll-mt-16">
        <h2 className="type-display-sm">{howWeWork.title}</h2>
        <ol className="index-list about-steps">
          {howWeWork.steps.map((step) => (
            <li key={step.name} className="index-row about-step">
              <h3 className="about-step__name">{step.name}</h3>
              <p className="type-body max-w-[52ch] text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="clay" size="large">
        <div className="about-split">
          <h2 className="type-display about-split__title text-ink">{closing.title}</h2>
          <div>
            <Prose paragraphs={closing.paragraphs} lead />
            <p className="about-prompt">{closing.prompt}</p>
            <ArrowLink
              strong
              href={primaryCta.href}
              className="text-ink"
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
