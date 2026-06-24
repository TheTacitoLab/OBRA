import Link from "next/link";
import Image from "next/image";
import { Asterisk } from "./brand/Marks";
import { privacyHref, siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        {/* Contact + meta */}
        <div className="grid gap-10 border-b border-line py-16 sm:grid-cols-3">
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
            <a
              href={`https://instagram.com/${siteConfig.social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-fit text-body text-white underline-offset-4 transition-colors hover:text-yellow hover:underline"
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
          <p className="text-label text-ash">© 2026 OBRA · Limited Edition</p>
        </div>
      </div>
    </footer>
  );
}
