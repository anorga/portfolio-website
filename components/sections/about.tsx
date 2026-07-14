import { Code2, RefreshCw, TrendingUp } from "lucide-react";
import { PortraitCard } from "@/components/sections/portrait-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { PointerGlow } from "@/components/ui/pointer-glow";
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

      <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start md:gap-x-10 md:gap-y-8 lg:gap-x-16 xl:gap-x-20">
        <Reveal className="md:col-start-2 md:row-start-1">
          <SectionHeading>About Me</SectionHeading>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {site.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={0.08}
          className="flex justify-center md:col-start-1 md:row-span-2 md:row-start-1 md:justify-start"
        >
          <PortraitCard />
        </Reveal>

        <Reveal delay={0.12} className="md:col-start-2 md:row-start-2">
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {site.aboutHighlights.map((item, i) => {
              const Icon = highlightIcons[i];

              return (
                <li
                  key={item.title}
                  className={i === 2 ? "sm:col-span-2 xl:col-span-1" : undefined}
                >
                  <PointerGlow
                    size={240}
                    className="h-full rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="group h-full rounded-2xl border border-border/70 bg-card/60 p-4 transition-[border-color] duration-300 ease-out group-hover/pointer:border-accent/40">
                      <span className="pointer-shift mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                        <Icon className="h-4.5 w-4.5" aria-hidden />
                      </span>
                      <h3 className="font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </PointerGlow>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
