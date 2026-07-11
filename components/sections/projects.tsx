import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <Section id="projects">
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

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.1}>
            <article className="group/project flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/70 hover:shadow-xl focus-within:border-accent/70 focus-within:shadow-xl">
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
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted transition-colors duration-300 group-hover/project:border-foreground/15"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-5 text-sm font-medium">
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
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
