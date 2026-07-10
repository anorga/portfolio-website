"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { site } from "@/content/site";

function useTypewriter(words: readonly string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const done = text === current;
    const cleared = text === "";

    let delay = deleting ? 50 : 110;
    if (done && !deleting) delay = 1400;
    if (cleared && deleting) delay = 400;

    const timeout = setTimeout(() => {
      if (!deleting && done) {
        setDeleting(true);
      } else if (deleting && cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const role = useTypewriter(site.roles);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[620px] w-[980px] -translate-x-1/2 [background:radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_12%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_40%,black,transparent)]"
      />
      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted"
        >
          <MapPin className="h-4 w-4 text-accent" />
          {site.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-bold tracking-tight text-accent sm:text-7xl"
        >
          {site.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 text-2xl font-semibold sm:text-4xl"
        >
          <span>{role}</span>
          <span className="ml-1 inline-block w-0.5 animate-pulse bg-foreground align-middle">
            &nbsp;
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          Crafting intuitive, visually engaging websites and applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-base font-medium text-accent-fg transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FileText className="h-5 w-5" />
            Resume
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-base font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
        >
          Learn more <ArrowRight className="h-4 w-4 rotate-90" />
        </motion.a>
      </div>
    </section>
  );
}
