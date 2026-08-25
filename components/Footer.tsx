import Link from "next/link";
import Image from "next/image";
import { Asterisk } from "./brand/Marks";
import {
  privacyHref,
  sectorLinks,
  siteConfig,
  socialLinks,
} from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        {/* Contact + meta */}
        <div className="grid gap-10 border-b border-line py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-tag text-ash">Contact</h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block w-fit text-body text-white underline-offset-4 transition-colors hover:text-yellow hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <h2 className="text-tag text-ash">Follow</h2>
            <ul className="mt-3 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.url}>
                  {/* rel="me" ties the page to the profile for entity
                      matching, the same association as schema.org sameAs. */}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="block w-fit text-body text-white underline-offset-4 transition-colors hover:text-yellow hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-tag text-ash">Services</h2>
            <ul className="mt-3 space-y-2">
              {sectorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block w-fit text-body text-white underline-offset-4 transition-colors hover:text-yellow hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-tag text-ash">Legal</h2>
            <Link
              href={privacyHref}
              className="mt-3 inline-block text-body text-white underline-offset-4 transition-colors hover:text-yellow hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>

        {/* Large wordmark */}
        <div className="py-14">
          <Image
            src="/brand/obra-white.svg"
            alt="OBRA"
            width={1104}
            height={426}
            className="h-auto w-full max-w-2xl md:max-w-4xl"
          />
        </div>

        {/* Baseline */}
        <div className="flex items-center gap-3 border-t border-line py-8">
          <Asterisk className="h-3 w-3 text-yellow" />
          <p className="text-label text-ash">© 2026 OBRA · a TACITO Group company</p>
        </div>
      </div>
    </footer>
  );
}
