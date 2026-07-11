"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { Section, SectionHeading } from "@/components/ui/section";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/content/projects";
import type { Project } from "@/lib/types";

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeProject = projects[activeIndex];

  return (
    <Section id="projects" className="relative !py-24 sm:!py-32">
      <Reveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Selected work
        </p>
        <SectionHeading>Projects</SectionHeading>
        <p className="mt-4 max-w-2xl text-muted">
          A sample of projects I&apos;ve built. Links to the live apps and
          source repositories are included.
        </p>
      </Reveal>

      <div className="mt-10 hidden gap-14 lg:grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:gap-20">
        <div>
          {projects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.article
                key={project.title}
                onViewportEnter={() => setActiveIndex(index)}
                onFocusCapture={() => setActiveIndex(index)}
                viewport={{ amount: 0.55, margin: "-20% 0px -20% 0px" }}
                animate={{ x: isActive ? 4 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex min-h-[58vh] flex-col justify-center border-b border-border/60 py-16 pl-6 first:pt-4 last:border-b-0"
              >
                <motion.span
                  aria-hidden
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-y-16 left-0 w-0.5 origin-center rounded-full bg-accent"
                />
                <span className="text-sm font-semibold tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-3xl font-bold tracking-tight xl:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">
                  {project.description}
                </p>
                <ProjectTags project={project} />
                <ProjectLinks project={project} />
              </motion.article>
            );
          })}
        </div>

        <div className="relative">
          <div className="sticky top-24 flex h-[calc(100svh-7rem)] items-center">
            <PointerGlow
              size={620}
              className="w-full overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeProject.title}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 1.018 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.99 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeProject.image}
                      alt={`${activeProject.title} screenshot`}
                      fill
                      sizes="(min-width: 1280px) 650px, 52vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/5"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                  <p className="font-semibold">{activeProject.title}</p>
                  <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs backdrop-blur-md">
                    Live project
                  </span>
                </div>
              </div>
            </PointerGlow>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:hidden">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.06}>
            <PointerGlow className="h-full overflow-hidden rounded-2xl">
              <article className="group/project flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/70 hover:shadow-xl focus-within:border-accent/70 focus-within:shadow-xl">
                <a
                  href={project.liveUrl ?? project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    width={640}
                    height={360}
                    className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover/project:scale-[1.035]"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <ProjectTags project={project} />
                  <ProjectLinks project={project} />
                </div>
              </article>
            </PointerGlow>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectTags({ project }: { project: Project }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {project.tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted transition-colors duration-300 group-hover/project:border-foreground/15"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex items-center gap-5 text-sm font-medium">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="group/live inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-80"
        >
          <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
          Live
        </a>
      )}
      <a
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        className="group/code inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
      >
        <Github className="h-4 w-4 transition-transform duration-200 group-hover/code:-translate-y-0.5" />
        Code
      </a>
    </div>
  );
}
