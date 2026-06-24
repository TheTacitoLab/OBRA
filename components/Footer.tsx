import Link from "next/link";
import { Wordmark } from "./brand/Wordmark";
import { Asterisk } from "./brand/Marks";
import { privacyHref, siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        {/* Contact + meta */}
        <div className="grid gap-12 border-b border-line py-16 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <div>
            <p className="max-w-md text-lede text-ash">{siteConfig.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-tag text-ash">Contact</h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 block w-fit text-body text-white underline-offset-4 transition-colors hover:text-yellow hover:underline"
              >
                {siteConfig.email}
              </a>
              <a
                href={`https://instagram.com/${siteConfig.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-fit text-body text-white underline-offset-4 transition-colors hover:text-yellow hover:underline"
              >
                Instagram
              </a>
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
        </div>

        {/* Large wordmark */}
        <div className="py-14">
          <Wordmark className="block text-[clamp(4rem,17vw,15rem)] text-white" />
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-3 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label text-ash">© 2026 OBRA · Limited Edition</p>
          <p className="flex items-center gap-2 text-label text-ash">
            <Asterisk className="h-3 w-3 text-yellow" />
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
