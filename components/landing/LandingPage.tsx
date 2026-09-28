import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "../site/Container";
import { BigList, type BigLink } from "../home/BigList";
import { primaryCta } from "@/content/site";

type Parent = { label: string; href: string };

/**
 * Shared template for the audience and product landing pages, the two index
 * pages, services and about. Establishes hierarchy (parent link, h1, intro),
 * a related list and the closing call to action. Real content lands later.
 */
export function LandingPage({
  title,
  intro,
  parent,
  children,
  related,
  relatedTitle,
  cta = true,
}: {
  title: string;
  intro: string;
  parent?: Parent;
  children?: ReactNode;
  related?: BigLink[];
  relatedTitle?: string;
  cta?: boolean;
}) {
  return (
    <>
      <section data-tone="bone" className="bg-bg text-fg">
        <Container className="flex min-h-[72svh] flex-col justify-end pb-16 pt-40 md:min-h-[78svh] md:pb-24 md:pt-48">
          {parent && (
            <p className="type-small mb-8 text-muted">
              <Link href={parent.href} className="u-wipe">
                {parent.label}
              </Link>
            </p>
          )}
          <h1 className="type-page max-w-[12ch]">{title}</h1>
          <div className="mt-12 md:grid md:grid-cols-12">
            <p className="type-lede max-w-[32ch] md:col-span-7 lg:col-span-6 lg:col-start-7">
              {intro}
            </p>
          </div>
        </Container>
      </section>

      {children}

      {related && related.length > 0 && (
        <section data-tone="ink" className="bg-bg text-fg">
          <Container className="py-24 md:py-32">
            {relatedTitle && <h2 className="type-display">{relatedTitle}</h2>}
            <BigList
              className={relatedTitle ? "mt-14 md:mt-20" : ""}
              size="type-link-sm"
              items={related}
            />
          </Container>
        </section>
      )}

      {cta && <ClosingCta />}
    </>
  );
}

export function ClosingCta() {
  return (
    <section data-tone="clay" className="bg-bg text-fg">
      <Container className="py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="type-display">Start a project.</h2>
            <p className="type-lede mt-8 max-w-[30ch] text-muted">
              Tell us what you&rsquo;re looking to make, roughly how many you
              need and when you need it.
            </p>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <Link href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
