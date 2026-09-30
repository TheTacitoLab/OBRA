import Link from "next/link";
import { Section } from "../site/Section";
import { Editorial } from "../site/Editorial";
import { ArrowLink } from "../site/Button";
import { services } from "@/content/site";

/**
 * The ten services as a numbered editorial list: two columns from 768px,
 * separators between rows only. The numbers are the one place on the site
 * they are kept, because the list is referenced by number elsewhere.
 */
export function Services() {
  return (
    <Section id="services" tone="bone">
      <Editorial
        heading={<h2 className="type-display">Services.</h2>}
        aside={
          <div className="flex flex-col gap-4">
            <p className="type-lede text-muted">
              Everything between the first idea and finished stock at your door,
              handled in one place.
            </p>
            <p className="type-body text-muted">
              Use what you need. We can handle individual stages or the whole
              project.
            </p>
            <div className="pt-1">
              <ArrowLink href="/services/">All services</ArrowLink>
            </div>
          </div>
        }
      />
      <ol className="numlist mt-body grid md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
        {services.map((service, index) => (
          <li key={service.slug}>
            <Link
              href={`/services/#${service.slug}`}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 py-5 md:py-6"
            >
              <span className="type-meta pt-1.5 text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="type-title block">
                  <span className="u-wipe u-lime">{service.title}</span>
                </span>
                <span className="type-body mt-1.5 block max-w-[34ch] text-muted">
                  {service.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
