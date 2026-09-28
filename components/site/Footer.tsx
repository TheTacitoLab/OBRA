import Link from "next/link";
import { Container } from "./Container";
import { navLinks, primaryCta } from "@/content/site";
import { privacyHref, siteConfig, socialLinks } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer data-tone="ink" className="bg-bg text-fg">
      <Container className="pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="logo w-[9rem]" aria-hidden="true" />
            <p className="type-body mt-6 max-w-xs text-muted">
              A bespoke merchandise studio creating original products for
              brands, artists, events and organisations.
            </p>
            <Link
              href={primaryCta.href}
              className="btn btn-primary mt-8"
            >
              {primaryCta.label}
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-7 md:col-start-6">
            <div>
              <h2 className="type-meta text-muted">Site</h2>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="type-small u-wipe">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={privacyHref} className="type-small u-wipe">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="type-meta text-muted">Contact</h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="type-small u-wipe"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="type-meta text-muted">Follow</h2>
              <ul className="mt-4 space-y-2.5">
                {socialLinks.map((link) => (
                  <li key={link.url}>
                    {/* rel="me" ties the page to the profile, the same
                        association as schema.org sameAs. */}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="type-small u-wipe"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 type-meta text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 madebyobra. A TACITO Group company.</p>
          <p>Bespoke merchandise, made properly.</p>
        </div>
      </Container>
    </footer>
  );
}
