import Link from "next/link";
import { Marquee } from "./Marquee";
import { Wordmark } from "./brand/Wordmark";
import { Asterisk } from "./brand/Marks";
import { privacyHref, siteConfig } from "@/lib/siteConfig";

const marqueeWords = [
  "LIMITED EDITION",
  "CONCEPT TO CREATION",
  "FOOTBALL JERSEYS",
  "ONE PROCESS",
];

const accentCycle = ["text-coral", "text-electric", "text-magenta", "text-flare"];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      {/* Marquee strip */}
      <div className="border-b border-line py-6">
        <Marquee duration={36}>
          {marqueeWords.map((word, i) => (
            <span key={word} className="flex items-center">
              <span className="px-8 font-display text-[1.75rem] font-extrabold uppercase leading-none tracking-tight text-white sm:text-[2.5rem]">
                {word}
              </span>
              <Asterisk
                className={`h-5 w-5 sm:h-7 sm:w-7 ${accentCycle[i % accentCycle.length]}`}
              />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        {/* Contact + meta */}
        <div className="grid gap-12 border-b border-line py-16 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <div>
            <p className="text-label text-ash">{siteConfig.name}</p>
            <p className="mt-4 max-w-md text-lede text-ash">{siteConfig.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-tag text-ash">Contact</h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 inline-block text-body text-white underline-offset-4 transition-colors hover:text-coral hover:underline"
              >
                {siteConfig.email}
              </a>
              {/* TODO: link social handles once confirmed (see siteConfig.social) */}
              <ul className="mt-6 space-y-1.5 text-body text-ash">
                <li>Instagram — soon</li>
                <li>TikTok — soon</li>
              </ul>
            </div>

            <div>
              <h2 className="text-tag text-ash">Legal</h2>
              <Link
                href={privacyHref}
                className="mt-3 inline-block text-body text-white underline-offset-4 transition-colors hover:text-coral hover:underline"
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
            <Asterisk className="h-3 w-3 text-coral" />
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
