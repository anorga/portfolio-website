"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { Section, SectionHeading } from "@/components/ui/section";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

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
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" className="bg-card/40">
      <SectionHeading className="text-center">Get in Touch</SectionHeading>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted">
        Have a question or want to work together? Send me a message and I&apos;ll
        get back to you as soon as possible.
      </p>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          <ContactItem icon={<MapPin className="h-5 w-5" />}>
            {site.location}
          </ContactItem>
          <ContactItem icon={<Phone className="h-5 w-5" />}>
            {site.phone}
          </ContactItem>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 text-muted transition-colors hover:text-accent"
          >
            <span className="text-accent">
              <Mail className="h-5 w-5" />
            </span>
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-muted transition-colors hover:text-accent"
          >
            <span className="text-accent">
              <Github className="h-5 w-5" />
            </span>
            github.com/{site.githubHandle}
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:col-span-3 sm:grid-cols-2"
        >
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Subject" name="subject" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              maxLength={1000}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 font-medium text-accent-fg transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-sm text-accent" role="status">
                Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500" role="alert">
                Something went wrong. Please email me directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}

function ContactItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-muted">
      <span className="text-accent">{icon}</span>
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
