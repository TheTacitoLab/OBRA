"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { budgetOptions, quantityOptions } from "@/content/site";
import { siteConfig } from "@/lib/siteConfig";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: (id: string) => React.ReactNode;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {children(id)}
      {hint && <p className="type-meta text-muted">{hint}</p>}
    </div>
  );
}

/**
 * Project brief form. Posts to Web3Forms from the client as multipart form
 * data (works with the static export). File attachments are forwarded as-is;
 * whether they arrive depends on the Web3Forms plan attached to the key.
 */
export function ProjectForm({
  accessKey,
  subject = "New project brief",
}: {
  accessKey: string;
  subject?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [files, setFiles] = useState<string[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const list = Array.from(event.target.files ?? []);
    const total = list.reduce((sum, file) => sum + file.size, 0);
    if (total > MAX_UPLOAD_BYTES) {
      setFileError("Please keep attachments under 10MB in total.");
      event.target.value = "";
      setFiles([]);
      return;
    }
    setFileError(null);
    setFiles(list.map((file) => file.name));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", subject);
    formData.append("from_name", "madebyobra website");

    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        form.reset();
        setFiles([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex min-h-[20rem] flex-col justify-center border-t border-line"
        role="status"
      >
        <p className="type-title mt-8">Brief received.</p>
        <p className="type-body mt-3 max-w-[40ch] text-muted">
          Thank you. We&rsquo;ll read it properly and come back to you with the
          best way to approach the project.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-x-10 gap-y-9 sm:grid-cols-2"
    >
      {/* Honeypot: Web3Forms rejects the submission if this is filled. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Field label="Name">
        {(id) => (
          <input
            id={id}
            name="name"
            type="text"
            required
            autoComplete="name"
            className="field__control"
          />
        )}
      </Field>

      <Field label="Company / Organisation">
        {(id) => (
          <input
            id={id}
            name="organisation"
            type="text"
            autoComplete="organization"
            className="field__control"
          />
        )}
      </Field>

      <Field label="Email">
        {(id) => (
          <input
            id={id}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field__control"
          />
        )}
      </Field>

      <Field label="What are you looking to make?">
        {(id) => (
          <input
            id={id}
            name="product"
            type="text"
            required
            placeholder="Caps, tees, a full range…"
            className="field__control"
          />
        )}
      </Field>

      <Field label="Estimated quantity">
        {(id) => (
          <select
            id={id}
            name="quantity"
            required
            defaultValue=""
            className="field__control"
          >
            <option value="" disabled>
              Select a range
            </option>
            {quantityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Target launch / event date">
        {(id) => (
          <input
            id={id}
            name="date"
            type="text"
            placeholder="A date, a month or a season"
            className="field__control"
          />
        )}
      </Field>

      <Field label="Budget range">
        {(id) => (
          <select
            id={id}
            name="budget"
            required
            defaultValue=""
            className="field__control"
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </Field>

      <div className="sm:col-span-2">
        <Field label="Tell us about the project">
          {(id) => (
            <textarea
              id={id}
              name="message"
              required
              rows={5}
              placeholder="The idea, the audience, where it will be sold or given…"
              className="field__control"
            />
          )}
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field
          label="Upload brief / artwork / references"
          hint="PDF, images or a deck. Up to 10MB in total."
        >
          {(id) => (
            <label className="file flex flex-wrap items-center gap-4 pt-1">
              <input
                id={id}
                name="attachment"
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.webp,.ai,.eps,.svg,.zip,.ppt,.pptx,.key"
                className="sr-only"
                onChange={onFiles}
              />
              <span className="btn btn-outline">Choose files</span>
              <span className="type-small text-muted">
                {files.length === 0
                  ? "No files chosen"
                  : files.length === 1
                    ? files[0]
                    : `${files.length} files chosen`}
              </span>
            </label>
          )}
        </Field>
        {fileError && (
          <p className="type-small mt-2 text-clay" role="alert">
            {fileError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary"
        >
          {status === "submitting" ? "Sending…" : "Send Project Brief"}
        </button>
        <p className="type-meta max-w-[36ch] text-muted">
          We only use your details to reply about this project.
        </p>
      </div>

      {status === "error" && (
        <p className="type-small text-clay sm:col-span-2" role="alert">
          Something went wrong sending the brief. Please email us at{" "}
          <a className="u-wipe u-static" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
