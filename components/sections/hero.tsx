"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { site } from "@/content/site";

function useTypewriter(words: readonly string[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || words.length === 0) return;

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
  }, [deleting, enabled, index, text, words]);

  return text;
}

function usePageVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const heroIsVisible = useInView(heroRef, { amount: 0.1, margin: "120px" });
  const pageIsVisible = usePageVisibility();
  const animatedRole = useTypewriter(
    site.roles,
    !shouldReduceMotion && heroIsVisible && pageIsVisible,
  );
  const role = shouldReduceMotion ? site.roles[0] : animatedRole;
  const entrance = (y: number, delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.6,
      delay: shouldReduceMotion ? 0 : delay,
    },
  });

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[560px] -translate-x-1/2 rounded-full [background-image:radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_16%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 [background-image:radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_40%,black,transparent)]"
      />
      <div className="safe-section-x hero-stage mx-auto flex min-h-[88svh] max-w-6xl flex-col items-center justify-center py-24 text-center 2xl:max-w-7xl">
        <motion.p
          {...entrance(-12, 0)}
          className="hero-location mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm font-medium text-muted"
        >
          <MapPin className="h-4 w-4 text-accent" />
          {site.location}
        </motion.p>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-bold tracking-tight text-accent sm:text-7xl"
        >
          {site.name}
        </motion.h1>

        <motion.div
          {...entrance(12, 0.25)}
          aria-label={site.roles.join(" and ")}
          className="hero-role mt-4 min-h-[1.25em] text-2xl font-semibold sm:text-4xl"
        >
          <span aria-hidden>{role}</span>
          <span
            aria-hidden
            className={`ml-1 inline-block w-0.5 bg-foreground align-middle ${shouldReduceMotion ? "" : "animate-pulse"}`}
          >
            &nbsp;
          </span>
        </motion.div>

        <motion.p
          {...entrance(12, 0.4)}
          className="hero-tagline mt-6 max-w-xl text-lg text-muted"
        >
          Crafting intuitive, visually engaging websites and applications.
        </motion.p>

        <motion.div
          {...entrance(12, 0.55)}
          className="hero-actions mt-10 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${site.name}'s resume in a new tab`}
            className="pressable group inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-full bg-accent-solid px-7 py-3 text-base font-medium text-accent-fg transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FileText className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Resume
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${site.name}'s GitHub profile in a new tab`}
            className="group inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3 text-base font-medium shadow-sm transition-[transform,border-color,color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md active:translate-y-0 active:scale-[0.98] active:shadow-sm"
          >
            <Github className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            GitHub
          </a>
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            delay: shouldReduceMotion ? 0 : 0.9,
          }}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          className="hero-more group/more mt-14 inline-flex min-h-11 touch-manipulation items-center gap-1 rounded-full px-3 text-sm text-muted transition-[background-color,color] hover:bg-card/70 hover:text-accent active:bg-card sm:mt-16"
        >
          Learn more
          <ArrowRight className="h-4 w-4 rotate-90 transition-transform duration-200 group-hover/more:translate-y-0.5" />
        </motion.a>
      </div>
    </section>
  );
}
