import Link from "next/link";
import { Container } from "./Container";
import { Arrow } from "./Button";
import { audiences, navLinks, pageHref, primaryCta } from "@/content/site";
import { privacyHref, siteConfig, socialLinks } from "@/lib/siteConfig";

/** Compact editorial footer: wordmark, one set of links, contact, baseline. */
export function Footer() {
  const siteLinks = navLinks.filter((link) => link.href !== "/who-for/");
  return (
    <footer data-tone="ink" className="bg-bg text-fg">
      <Container className="py-section-sm">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="logo w-[8.5rem]" aria-hidden="true" />
            <p className="type-body mt-5 max-w-[30ch] text-muted">
              Bespoke merchandise for brands, artists, events and
              organisations. The maker&rsquo;s mark on everything we produce.
            </p>
            <Link href={primaryCta.href} className="btn btn-primary mt-7">
              <span>{primaryCta.label}</span>
              <Arrow />
            </Link>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-7 md:grid-cols-3"
          >
            <div>
              <h2 className="type-meta text-muted">
                <Link href="/who-for/" className="u-wipe">
                  Who for
                </Link>
              </h2>
              <ul className="mt-3 space-y-1.5">
                {audiences.map((audience) => (
                  <li key={audience.slug}>
                    <Link
                      href={pageHref(audience.slug)}
                      className="nav-link"
                    >
                      <span className="u-wipe">{audience.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="type-meta text-muted">Studio</h2>
              <ul className="mt-3 space-y-1.5">
                {siteLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="nav-link">
                      <span className="u-wipe">{link.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={primaryCta.href} className="nav-link">
                    <span className="u-wipe">{primaryCta.label}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h2 className="type-meta text-muted">Contact</h2>
              <ul className="mt-3 space-y-1.5">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="nav-link">
                    <span className="u-wipe break-all">{siteConfig.email}</span>
                  </a>
                </li>
                {socialLinks.map((link) => (
                  <li key={link.url}>
                    {/* rel="me" ties the page to the profile, the same
                        association as schema.org sameAs. */}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="nav-link"
                    >
                      <span className="u-wipe">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 type-meta text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 madebyobra. A TACITO Group company.</p>
          <Link href={privacyHref} className="u-wipe self-start">
            Privacy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
