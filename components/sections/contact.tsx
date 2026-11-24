"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { KineticType } from "@/components/ui/kinetic-type";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const submitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    setStatus("submitting");
    try {
      const response = await fetch(site.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        form.reset();
        setStatus("success");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <p className="eyebrow page-width">
        Next up? Something we build together.
      </p>
      <KineticType text="let’s talk." closing />
      <div className="contact-grid page-width">
        <div className="contact-copy">
          <h3>
            Good things start
            <br />
            with a hello.
          </h3>
          <p>
            Have a role in mind, a question about a project, or something you’d
            like to build together? I’d like to hear about it.
          </p>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="contact-links">
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.resumeUrl} target="_blank" rel="noreferrer">
              Résumé
            </a>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          onChange={() => {
            if (status === "success" || status === "error") setStatus("idle");
          }}
          aria-label="Send Chris a message"
          aria-busy={submitting}
        >
          <div className="form-row">
            <label htmlFor="name">
              Name <span aria-hidden>*</span>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                disabled={submitting}
              />
            </label>
            <label htmlFor="email">
              Email <span aria-hidden>*</span>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                disabled={submitting}
              />
            </label>
          </div>
          <label htmlFor="subject">
            Subject <span className="optional">(optional)</span>
            <input id="subject" name="subject" disabled={submitting} />
          </label>
          <label htmlFor="message">
            Message <span aria-hidden>*</span>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              maxLength={1000}
              disabled={submitting}
              aria-describedby="message-hint"
            />
          </label>
          <p id="message-hint" className="form-hint">
            * Required fields. Up to 1,000 characters.
          </p>
          <div className="sr-only" aria-hidden>
            <label htmlFor="website">
              Website
              <input
                id="website"
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                disabled={submitting}
              />
            </label>
          </div>
          <div className="form-footer">
            <button
              className="button button-primary"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
            <div
              role="status"
              aria-live={status === "error" ? "assertive" : "polite"}
              aria-atomic="true"
            >
              {status === "success" && (
                <p>Thanks! Your message has been sent.</p>
              )}
              {status === "error" && (
                <p className="form-error">
                  Couldn’t send your message. Please{" "}
                  <a href={`mailto:${site.email}`}>email me directly</a>.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
