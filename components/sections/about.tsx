import { Code2, RefreshCw, TrendingUp } from "lucide-react";
import { PortraitCard } from "@/components/sections/portrait-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

const highlightIcons = [Code2, RefreshCw, TrendingUp] as const;

export function About() {
  return (
    <Section
      id="about"
      className="relative isolate -mt-6 overflow-hidden rounded-t-[2.5rem] bg-background !py-16 shadow-[0_-24px_70px_-55px_rgba(0,0,0,0.45)] ring-1 ring-border/40 sm:-mt-10 sm:rounded-t-[3.5rem] sm:!py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl"
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-20">
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <SectionHeading>About Me</SectionHeading>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {site.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
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
          <PortraitCard />
        </Reveal>
      </div>
    </Section>
  );
}
