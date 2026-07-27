"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Arrow } from "../brand/Marks";
import { packages } from "@/content/festival-landing";

const control =
  "mt-2 w-full rounded-sm border border-line bg-slate px-4 py-3 text-body text-white placeholder:text-mute focus-visible:border-yellow";

/** Keep what we hand to the URL short and free of control characters. */
function clean(value: string) {
  return Array.from(value.trim())
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join("")
    .slice(0, 120);
}

/**
 * First step of the brief, inline on the landing page.
 *
 * Collects name and email here so the visitor commits before they leave, then
 * continues to /brief/ with those answers, the festival project type and the
 * "not sure" production level already filled in.
 */
export function StartBriefForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { footer } = packages;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({
      project: "festival",
      package: "unsure",
    });
    if (clean(name)) params.set("name", clean(name));
    if (clean(email)) params.set("email", clean(email));
    router.push(`/brief/?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="festival-lead-name" className="text-tag text-ash">
            {footer.nameLabel}
          </label>
          <input
            id="festival-lead-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={footer.namePlaceholder}
            className={control}
          />
        </div>
        <div>
          <label htmlFor="festival-lead-email" className="text-tag text-ash">
            {footer.emailLabel}
          </label>
          <input
            id="festival-lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={footer.emailPlaceholder}
            className={control}
          />
        </div>
      </div>

      <button
        type="submit"
        className="group mt-5 inline-flex min-h-[44px] items-center justify-center gap-3 rounded-full bg-yellow px-7 py-3.5 text-label text-void transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-14px_rgba(252,222,22,0.55)]"
      >
        {footer.cta.label}
        <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="text-body mt-4 text-mute">{footer.note}</p>

      {/* Works without JavaScript: the plain link carries the same destination. */}
      <noscript>
        <a
          className="text-body mt-4 inline-block text-white underline decoration-yellow underline-offset-4"
          href={footer.cta.href}
        >
          {footer.cta.label}
        </a>
      </noscript>
    </form>
  );
}
