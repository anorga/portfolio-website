"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { Section, SectionIntro } from "@/components/ui/section";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/content/projects";
import type { Project } from "@/lib/types";

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projectRefs = useRef<Array<HTMLElement | null>>([]);
  const compactProjectRefs = useRef<Array<HTMLElement | null>>([]);
  const compactScrollTargetRef = useRef<number | null>(null);
  const compactScrollTargetTimeoutRef = useRef<number | null>(null);
  const updateCompactActiveRef = useRef<() => void>(() => undefined);
  const shouldReduceMotion = useReducedMotion();
  const activeProject = projects[activeIndex];

  useEffect(() => {
    const compactLayout = window.matchMedia("(max-width: 1279px)");
    let frame = 0;

    const cancelScrollTarget = () => {
      compactScrollTargetRef.current = null;

      if (compactScrollTargetTimeoutRef.current !== null) {
        window.clearTimeout(compactScrollTargetTimeoutRef.current);
        compactScrollTargetTimeoutRef.current = null;
      }
    };

    const updateActiveProject = () => {
      if (!compactLayout.matches) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;
        const focusLine = viewportTop + window.innerHeight * 0.46;
        const measurements = getCompactProjectMeasurements(
          compactProjectRefs.current,
        );

        const hasVisibleProject = measurements.some((project) => {
          const visibleHeight = Math.max(
            0,
            Math.min(project.bottom, viewportBottom) -
              Math.max(project.top, viewportTop),
          );

          return (
            visibleHeight >= Math.min(80, (project.bottom - project.top) * 0.16)
          );
        });

        if (!hasVisibleProject) return;

        const anchors = getOrderedProjectAnchors(measurements);
        const scrollTarget = compactScrollTargetRef.current;

        if (scrollTarget !== null) {
          const targetAnchor = anchors.find(
            (anchor) => anchor.index === scrollTarget,
          );
          const targetReached =
            targetAnchor &&
            Math.abs(targetAnchor.position - focusLine) <=
              Math.max(48, window.innerHeight * 0.07);

          if (!targetReached) {
            setActiveIndex(scrollTarget);
            return;
          }

          cancelScrollTarget();
        }

        setActiveIndex((current) =>
          getActiveProjectIndex(anchors, focusLine, current),
        );
      });
    };

    const cancelScrollTargetFromKeyboard = (event: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      ) {
        cancelScrollTarget();
      }
    };

    let compactListenersAttached = false;

    const attachCompactListeners = () => {
      if (compactListenersAttached) return;

      compactListenersAttached = true;
      window.addEventListener("scroll", updateActiveProject, { passive: true });
      window.addEventListener("resize", updateActiveProject);
      window.addEventListener("pointerdown", cancelScrollTarget, true);
      window.addEventListener("wheel", cancelScrollTarget, { passive: true });
      window.addEventListener("keydown", cancelScrollTargetFromKeyboard);
      updateActiveProject();
    };

    const detachCompactListeners = () => {
      if (!compactListenersAttached) return;

      compactListenersAttached = false;
      cancelAnimationFrame(frame);
      cancelScrollTarget();
      window.removeEventListener("scroll", updateActiveProject);
      window.removeEventListener("resize", updateActiveProject);
      window.removeEventListener("pointerdown", cancelScrollTarget, true);
      window.removeEventListener("wheel", cancelScrollTarget);
      window.removeEventListener("keydown", cancelScrollTargetFromKeyboard);
    };

    const syncCompactListeners = () => {
      if (compactLayout.matches) {
        attachCompactListeners();
      } else {
        detachCompactListeners();
      }
    };

    updateCompactActiveRef.current = updateActiveProject;
    compactLayout.addEventListener("change", syncCompactListeners);
    syncCompactListeners();

    return () => {
      compactLayout.removeEventListener("change", syncCompactListeners);
      detachCompactListeners();
      updateCompactActiveRef.current = () => undefined;
    };
  }, []);

  function selectProject(index: number, focusProject = false) {
    setActiveIndex(index);

    const project = projectRefs.current[index];
    if (!project) return;

    project.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "center",
    });

    if (focusProject) {
      project.focus({ preventScroll: true });
    }
  }

  function selectCompactProject(
    index: number,
    focusProject = false,
  ) {
    if (compactScrollTargetTimeoutRef.current !== null) {
      window.clearTimeout(compactScrollTargetTimeoutRef.current);
      compactScrollTargetTimeoutRef.current = null;
    }

    compactScrollTargetRef.current = shouldReduceMotion ? null : index;

    if (!shouldReduceMotion) {
      compactScrollTargetTimeoutRef.current = window.setTimeout(() => {
        if (compactScrollTargetRef.current === index) {
          compactScrollTargetRef.current = null;
          updateCompactActiveRef.current();
        }

        compactScrollTargetTimeoutRef.current = null;
      }, 1200);
    }

    setActiveIndex(index);

    const project = compactProjectRefs.current[index];
    if (!project) return;

    const targetAnchor = getOrderedProjectAnchors(
      getCompactProjectMeasurements(compactProjectRefs.current),
    ).find((anchor) => anchor.index === index);

    window.scrollTo({
      top: targetAnchor
        ? Math.max(0, targetAnchor.position - window.innerHeight * 0.46)
        : getLayoutTop(project),
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });

    if (focusProject) {
      project
        .querySelector<HTMLElement>("article")
        ?.focus({ preventScroll: true });
    }
  }

  return (
    <Section
      id="projects"
      className="relative !pb-12 !pt-16 sm:!pb-16 sm:!pt-20"
    >
      <Reveal>
        <SectionIntro
          eyebrow="Selected work"
          title="Projects"
          description={
            <>
              A sample of projects I&apos;ve built. Links to the live apps and
              source repositories are included.
            </>
          }
        />
      </Reveal>

      <div className="mt-10 hidden gap-14 xl:grid xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:gap-20 2xl:-ml-16 2xl:w-[calc(100%+8rem)] 2xl:max-w-[calc(100vw-4rem)] 2xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] 2xl:gap-24">
        <div>
          {projects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.article
                key={project.title}
                ref={(node) => {
                  projectRefs.current[index] = node;
                }}
                tabIndex={-1}
                onViewportEnter={() => setActiveIndex(index)}
                onFocusCapture={() => setActiveIndex(index)}
                viewport={{ amount: 0.55, margin: "-20% 0px -20% 0px" }}
                animate={{ x: !shouldReduceMotion && isActive ? 4 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                className="relative flex min-h-[58vh] flex-col justify-center rounded-xl border-b border-border/60 py-16 pl-6 outline-none first:pt-4 last:border-b-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <motion.span
                  aria-hidden
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
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
          <div className="sticky top-24 flex h-[calc(100svh-7rem)] flex-col justify-center">
            <PointerGlow
              size={620}
              pressable
              className="w-full rounded-[2rem] border border-border/70 bg-card shadow-2xl"
            >
              <a
                href={getProjectDestination(activeProject)}
                target="_blank"
                rel="noreferrer"
                aria-label={getProjectLinkLabel(activeProject)}
                className="group/preview block overflow-hidden rounded-[inherit]"
              >
                <div className="flex h-11 items-center gap-3 border-b border-border/70 bg-background/80 px-4 text-muted">
                  <div aria-hidden className="flex shrink-0 items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                  </div>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={activeProject.title}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 3 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -3 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                      className="min-w-0 flex-1 truncate rounded-full border border-border/70 bg-card/80 px-3 py-1 text-center text-[11px] font-medium sm:text-xs"
                    >
                      {getProjectHost(activeProject)}
                    </motion.span>
                  </AnimatePresence>
                  <ExternalLink
                    aria-hidden
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/preview:-translate-y-0.5 group-hover/preview:translate-x-0.5"
                  />
                </div>

                <div
                  className="relative aspect-[8/5] overflow-hidden bg-stone-950"
                >
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
                      className="pointer-shift absolute -inset-2"
                    >
                      <Image
                        src={activeProject.image}
                        alt={`${activeProject.title} project screenshot`}
                        fill
                        sizes="(min-width: 1536px) 760px, (min-width: 1280px) 52vw, 1px"
                        className="object-cover"
                        style={{ objectPosition: activeProject.imageFocalPoint }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/5"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.p
                        key={activeProject.title}
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, y: 5 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                        className="font-semibold"
                      >
                        {activeProject.title}
                      </motion.p>
                    </AnimatePresence>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-[transform,background-color] duration-200 group-hover/preview:-translate-y-0.5 group-hover/preview:bg-black/65 group-focus-visible/preview:-translate-y-0.5 group-focus-visible/preview:bg-black/65">
                      <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                      {activeProject.liveUrl ? "Open live" : "Open code"}
                    </span>
                  </div>
                </div>
              </a>
            </PointerGlow>

            <nav
              aria-label="Choose a project preview"
              className="mt-4 flex items-center justify-center gap-1"
            >
              {projects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={project.title}
                    type="button"
                    aria-label={`Show ${project.title}`}
                    aria-current={isActive ? "true" : undefined}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") setActiveIndex(index);
                    }}
                    onFocus={() => setActiveIndex(index)}
                    onClick={(event) => selectProject(index, event.detail === 0)}
                    className="group/dot inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
                  >
                    <span
                      aria-hidden
                      className={`h-2 rounded-full transition-[width,background-color,transform] duration-300 group-hover/dot:scale-125 ${
                        isActive ? "w-6 bg-accent" : "w-2 bg-muted/45"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <nav
        aria-label="Project progress"
        className="project-rail sticky z-20 mt-8 xl:hidden"
      >
        <div className="mx-auto flex min-h-12 max-w-md items-center gap-2 rounded-2xl border border-border/75 bg-background/90 px-2 shadow-lg shadow-foreground/[0.04] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
          <div className="flex min-w-0 flex-1 items-center pl-2 text-sm font-medium">
            <span className="mr-2 shrink-0 tabular-nums text-accent">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 truncate text-foreground">
              {activeProject.title}
            </span>
          </div>
          <div className="flex shrink-0 items-center">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={project.title}
                  type="button"
                  aria-label={`Go to ${project.title}`}
                  aria-current={isActive ? "true" : undefined}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") setActiveIndex(index);
                  }}
                  onFocus={() => setActiveIndex(index)}
                  onClick={(event) =>
                    selectCompactProject(index, event.detail === 0)
                  }
                  className="group/rail inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl outline-none transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                >
                  <span
                    aria-hidden
                    className={`h-1.5 rounded-full transition-[width,background-color,transform] duration-300 group-hover/rail:scale-y-125 ${
                      isActive ? "w-7 bg-accent" : "w-3 bg-muted/35"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="mt-6 grid gap-7 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:hidden">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const isWideTabletCard =
            index === 0 || index === projects.length - 1;

          return (
            <Reveal
              key={project.title}
              delay={index * 0.06}
              className={`h-full ${
                isWideTabletCard ? "lg:col-span-7" : "lg:col-span-5"
              }`}
            >
              <div
                ref={(node) => {
                  compactProjectRefs.current[index] = node;
                }}
                className="h-full"
              >
                <PointerGlow
                  pressable
                  className={`group/project h-full rounded-2xl border bg-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/70 hover:shadow-xl focus-within:-translate-y-1 focus-within:border-accent/70 focus-within:shadow-xl ${
                    isActive
                      ? "border-accent/55 shadow-lg shadow-accent/[0.07]"
                      : "border-border shadow-sm"
                  }`}
                >
                  <motion.article
                    aria-labelledby={`project-card-title-${index}`}
                    tabIndex={-1}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") setActiveIndex(index);
                    }}
                    onFocusCapture={() => setActiveIndex(index)}
                    animate={{ y: !shouldReduceMotion && isActive ? -2 : 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                    className="relative flex h-full flex-col overflow-hidden rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  >
                    <motion.span
                      aria-hidden
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                      className="absolute inset-x-6 top-0 z-10 h-0.5 origin-left rounded-full bg-accent"
                    />
                    <a
                      href={getProjectDestination(project)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={getProjectLinkLabel(project)}
                      className="group/media relative block touch-manipulation overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                      style={{ aspectRatio: project.imageAspectRatio }}
                    >
                      <div className="pointer-shift absolute -inset-2">
                        <Image
                          src={project.image}
                          alt={`${project.title} project screenshot`}
                          fill
                          sizes="(min-width: 1280px) 1px, (min-width: 768px) calc(50vw - 3.5rem), calc(100vw - 3rem)"
                          className="object-cover transition-transform duration-500 ease-out group-hover/project:scale-[1.035] group-focus-within/project:scale-[1.035]"
                          style={{ objectPosition: project.imageFocalPoint }}
                        />
                      </div>
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover/media:opacity-100 group-focus-visible/media:opacity-100"
                      />
                      <span
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-[transform,background-color] duration-200 group-hover/media:-translate-y-0.5 group-hover/media:bg-black/75 group-focus-visible/media:-translate-y-0.5 group-focus-visible/media:bg-black/75"
                      >
                        <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                        {project.liveUrl ? "Open live" : "Open code"}
                      </span>
                    </a>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-semibold tabular-nums text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden
                          className={`h-px flex-1 transition-colors duration-300 ${
                            isActive ? "bg-accent/45" : "bg-border/70"
                          }`}
                        />
                      </div>
                      <h3
                        id={`project-card-title-${index}`}
                        className="mt-2 text-xl font-semibold"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>
                      <ProjectTags project={project} />
                      <ProjectLinks project={project} />
                    </div>
                  </motion.article>
                </PointerGlow>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

interface CompactProjectMeasurement {
  index: number;
  top: number;
  bottom: number;
}

interface CompactProjectAnchor {
  index: number;
  position: number;
}

function getCompactProjectMeasurements(
  projectElements: Array<HTMLElement | null>,
): CompactProjectMeasurement[] {
  return projectElements
    .flatMap((project, index) => {
      if (!project) return [];

      const top = getLayoutTop(project);

      return [{ index, top, bottom: top + project.offsetHeight }];
    })
    .sort((a, b) => a.top - b.top || a.index - b.index);
}

function getLayoutTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;

  while (current) {
    top += current.offsetTop;
    current =
      current.offsetParent instanceof HTMLElement
        ? current.offsetParent
        : null;
  }

  return top;
}

function getOrderedProjectAnchors(
  measurements: CompactProjectMeasurement[],
): CompactProjectAnchor[] {
  const rows: Array<{
    top: number;
    bottom: number;
    projects: CompactProjectMeasurement[];
  }> = [];

  measurements.forEach((project) => {
    const currentRow = rows.at(-1);

    if (!currentRow || Math.abs(project.top - currentRow.top) > 8) {
      rows.push({
        top: project.top,
        bottom: project.bottom,
        projects: [project],
      });
      return;
    }

    currentRow.top = Math.min(currentRow.top, project.top);
    currentRow.bottom = Math.max(currentRow.bottom, project.bottom);
    currentRow.projects.push(project);
  });

  return rows.flatMap((row) => {
    const rowHeight = row.bottom - row.top;
    const orderedProjects = row.projects.sort((a, b) => a.index - b.index);

    return orderedProjects.map((project, projectIndex) => ({
      index: project.index,
      position:
        row.top +
        rowHeight * ((projectIndex + 1) / (orderedProjects.length + 1)),
    }));
  });
}

function getActiveProjectIndex(
  anchors: CompactProjectAnchor[],
  focusLine: number,
  currentIndex: number,
) {
  if (!anchors.length) return currentIndex;

  let nextAnchorIndex = 0;

  for (let index = 0; index < anchors.length - 1; index += 1) {
    const boundary = (anchors[index].position + anchors[index + 1].position) / 2;

    if (focusLine < boundary) break;
    nextAnchorIndex = index + 1;
  }

  const currentAnchorIndex = anchors.findIndex(
    (anchor) => anchor.index === currentIndex,
  );

  if (currentAnchorIndex === -1 || currentAnchorIndex === nextAnchorIndex) {
    return anchors[nextAnchorIndex].index;
  }

  const hysteresis = 18;

  if (nextAnchorIndex > currentAnchorIndex) {
    const forwardBoundary =
      (anchors[currentAnchorIndex].position +
        anchors[currentAnchorIndex + 1].position) /
      2;

    if (focusLine < forwardBoundary + hysteresis) return currentIndex;
  } else {
    const backwardBoundary =
      (anchors[currentAnchorIndex - 1].position +
        anchors[currentAnchorIndex].position) /
      2;

    if (focusLine > backwardBoundary - hysteresis) return currentIndex;
  }

  return anchors[nextAnchorIndex].index;
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
          aria-label={`View ${project.title} live project in a new tab`}
          className="group/live inline-flex min-h-11 touch-manipulation items-center gap-1.5 rounded-md text-accent transition-opacity hover:opacity-80"
        >
          <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
          Live
        </a>
      )}
      <a
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${project.title} source code on GitHub in a new tab`}
        className="group/code inline-flex min-h-11 touch-manipulation items-center gap-1.5 rounded-md text-muted transition-colors hover:text-foreground"
      >
        <Github className="h-4 w-4 transition-transform duration-200 group-hover/code:-translate-y-0.5" />
        Code
      </a>
    </div>
  );
}

function getProjectDestination(project: Project) {
  return project.liveUrl ?? project.repo;
}

function getProjectLinkLabel(project: Project) {
  return project.liveUrl
    ? `Open ${project.title} live project in a new tab`
    : `Open ${project.title} source code on GitHub in a new tab`;
}

function getProjectHost(project: Project) {
  try {
    return new URL(getProjectDestination(project)).hostname.replace(/^www\./, "");
  } catch {
    return project.title;
  }
}
