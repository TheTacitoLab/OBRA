"use client";

import { useState, type FormEvent } from "react";
import { Arrow, Asterisk } from "./brand/Marks";
import { ReleaseSelector } from "./ReleaseSelector";
import { siteConfig } from "@/lib/siteConfig";

type Status = "idle" | "submitting" | "success" | "error";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
}: FieldProps) {
  const control =
    "mt-2 w-full rounded-sm border border-line bg-slate px-4 py-3 text-body text-white placeholder:text-mute focus-visible:border-yellow";
  return (
    <div>
      <label htmlFor={name} className="text-tag text-ash">
        {label}
        {required && <span className="text-yellow"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          className={control}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={control}
        />
      )}
    </div>
  );
}

/**
 * Lead-capture / brief form, submitted to Web3Forms from the client (works with
 * the static export). `compact` trims it for the homepage CTA; the full set is
 * used on /brief.
 */
export function BriefForm({
  compact = false,
  accessKey,
  subject = "New OBRA brief",
}: {
  compact?: boolean;
  accessKey: string;
  subject?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", subject);
    formData.append("from_name", "OBRA website");

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[18rem] flex-col items-start justify-center">
        <Asterisk className="h-8 w-8 text-yellow" />
        <p className="text-headline mt-4 text-white">Brief received.</p>
        <p className="text-body mt-2 text-ash">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — Web3Forms rejects the submission if this is filled. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Field label="Name" name="name" required placeholder="First and last" />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        placeholder="you@studio.com"
      />
      {!compact && (
        <Field
          label="Brand or project"
          name="brand"
          placeholder="Festival, label, artist, brand…"
        />
      )}
      {!compact && <ReleaseSelector />}
      <Field
        label="Tell us about your drop"
        name="message"
        textarea
        required
        placeholder="The concept, your audience, rough numbers…"
      />
      {!compact && (
        <Field label="Timeline" name="timeline" placeholder="When's the drop?" />
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-yellow px-7 py-3.5 text-label text-void transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-14px_rgba(252,222,22,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Start a brief"}
        <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {status === "error" && (
        <p className="text-body text-coral" role="alert">
          Something went wrong. Please email us at{" "}
          <a
            className="underline underline-offset-4"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
