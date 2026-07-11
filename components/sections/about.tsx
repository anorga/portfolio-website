import Image from "next/image";
import { Code2, Users, Workflow } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

const highlightIcons = [Code2, Workflow, Users] as const;

export function About() {
  return (
    <Section
      id="about"
      className="relative isolate overflow-hidden !py-16 sm:!py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl"
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-20">
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            A little about me
          </p>
          <SectionHeading>About Me</SectionHeading>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {site.bio.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "text-foreground/90" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {site.aboutHighlights.map((item, i) => {
              const Icon = highlightIcons[i];

              return (
                <li
                  key={item.title}
                  className="group rounded-2xl border border-border/70 bg-card/60 p-4 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
                >
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                    <Icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <h3 className="font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal
          delay={0.1}
          className="flex justify-center lg:col-start-1 lg:row-start-1 lg:justify-start"
        >
          <div className="group relative aspect-[4/5] w-full max-w-[420px]">
            <div
              aria-hidden
              className="absolute inset-6 -z-10 translate-x-5 translate-y-5 rounded-[2rem] bg-accent/14 blur-2xl transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3"
            />
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-card shadow-xl ring-1 ring-foreground/8 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-2xl">
              <Image
                src="/images/portrait.jpeg"
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 55vw, calc(100vw - 48px)"
                className="origin-[center_65%] scale-[1.35] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.39]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-white/5"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
