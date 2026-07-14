"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "min-h-12 w-full rounded-xl border border-control-border bg-background/85 px-4 py-3 text-foreground shadow-sm outline-none transition-[border-color,box-shadow,background-color,opacity] duration-200 placeholder:text-muted/70 hover:border-accent/70 focus:border-accent focus:bg-background focus:ring-4 focus:ring-accent/15 disabled:cursor-wait disabled:opacity-70";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const isSubmitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function clearResolvedStatus() {
    if (status === "success" || status === "error") setStatus("idle");
  }

  return (
    <Section
      id="contact"
      className="relative !pb-0 !pt-12 sm:!pb-0 sm:!pt-16"
    >
      <PointerGlow
        size={760}
        className="pointer-focus-none overflow-hidden rounded-t-[2rem] border border-b-0 border-border/70 bg-card/70 shadow-sm sm:rounded-t-[2.5rem]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-accent/6 blur-3xl"
        />

        <div className="relative px-5 pb-10 pt-12 sm:px-10 sm:pb-12 lg:px-14 lg:pb-14 lg:pt-16">
          <Reveal>
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Start a conversation
            </p>
            <SectionHeading className="text-center">Get in Touch</SectionHeading>
            <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-muted">
              Have a question or want to work together? Send me a message and
              I&apos;ll get back to you as soon as possible.
            </p>
          </Reveal>

          <div className="relative mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
            <Reveal delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
                <ContactItem icon={<MapPin className="h-5 w-5" />} label="Location">
                  {site.location}
                </ContactItem>
                <ContactLink
                  href={`mailto:${site.email}`}
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                >
                  {site.email}
                </ContactLink>
                <ContactLink
                  href={site.github}
                  icon={<Github className="h-5 w-5" />}
                  label="GitHub"
                  external
                  className="sm:col-span-2 md:col-span-1 lg:col-span-1"
                >
                  github.com/{site.githubHandle}
                </ContactLink>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-[1.75rem] border border-border/80 bg-background/70 p-5 shadow-sm backdrop-blur-sm sm:p-7 lg:p-8">
                <div className="mb-6">
                  <h3 id="contact-form-heading" className="text-xl font-semibold tracking-tight">
                    Send a message
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">
                    Fields marked with an asterisk are required.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  onChange={clearResolvedStatus}
                  aria-labelledby="contact-form-heading"
                  aria-busy={isSubmitting}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field
                    label="Name"
                    name="name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    required
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    disabled={isSubmitting}
                    required
                  />
                  <Field
                    label="Subject"
                    name="subject"
                    autoComplete="off"
                    disabled={isSubmitting}
                    className="sm:col-span-2"
                  />
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium"
                    >
                      Message
                      <RequiredMark />
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      maxLength={1000}
                      disabled={isSubmitting}
                      aria-describedby="message-hint"
                      className={`${fieldClassName} min-h-36 resize-y`}
                    />
                    <p id="message-hint" className="mt-1.5 text-xs text-muted">
                      Up to 1,000 characters.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="pressable group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent-solid px-7 py-3 font-medium text-accent-fg transition-[transform,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:cursor-wait disabled:opacity-65"
                    >
                      {isSubmitting ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                      ) : (
                        <Send
                          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      )}
                      {isSubmitting ? "Sending…" : "Send Message"}
                    </button>

                    <div
                      id="contact-form-status"
                      aria-live={status === "error" ? "assertive" : "polite"}
                      aria-atomic="true"
                      className="min-h-6 text-sm"
                    >
                      {status === "success" && (
                        <p className="flex items-start gap-2 text-foreground">
                          <CircleCheck
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                            aria-hidden
                          />
                          Thanks! Your message has been sent.
                        </p>
                      )}
                      {status === "error" && (
                        <p className="flex items-start gap-2 text-error">
                          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                          <span>
                            Something went wrong. Please{" "}
                            <a
                              href={`mailto:${site.email}`}
                              className="font-semibold underline decoration-current/50 underline-offset-2 hover:decoration-current"
                            >
                              email me directly
                            </a>
                            .
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </PointerGlow>
    </Section>
  );
}

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-20 items-center gap-3 rounded-2xl border border-border/70 bg-background/55 px-4 py-3 text-muted shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-sm text-foreground">{children}</span>
      </span>
    </div>
  );
}

function ContactLink({
  href,
  icon,
  label,
  external = false,
  className = "",
  children,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group/contact flex min-h-20 items-center gap-3 rounded-2xl border border-border/70 bg-background/55 px-4 py-3 text-muted shadow-sm transition-[transform,border-color,color,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-background/85 hover:shadow-md active:translate-y-0 active:scale-[0.985] focus-visible:border-accent ${className}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-200 group-hover/contact:-translate-y-0.5 group-hover/contact:scale-105">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-sm text-foreground">{children}</span>
      </span>
    </a>
  );
}

function RequiredMark() {
  return (
    <>
      <span className="text-accent" aria-hidden>
        {" "}*
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  disabled = false,
  autoComplete,
  inputMode,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "text";
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required && <RequiredMark />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={fieldClassName}
      />
    </div>
  );
}
