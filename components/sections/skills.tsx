"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { Pause, Play } from "lucide-react";
import { useInView } from "motion/react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { skills, type Skill } from "@/content/skills";

const skillRows = [skills.slice(0, 6), skills.slice(6)];

export function Skills() {
  const [paused, setPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeIsVisible = useInView(marqueeRef, { margin: "150px" });

  return (
    <Section
      id="skills"
      className="relative mx-3 overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/55 !py-20 shadow-sm sm:mx-6 sm:rounded-[3rem] sm:!py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl"
      />

      <div className="relative">
        <Reveal>
          <SectionHeading className="text-center">Technologies</SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            Tools and frameworks I use to build modern web experiences.
          </p>
        </Reveal>
        <button
          type="button"
          aria-pressed={paused}
          aria-label={
            paused
              ? "Resume technology animation"
              : "Pause technology animation"
          }
          onClick={() => setPaused((value) => !value)}
          className="skill-pause absolute right-0 top-0 hidden h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-border bg-background/70 text-muted transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0 active:scale-95 sm:inline-flex"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>

      <div ref={marqueeRef} className="relative mt-12">
        <Reveal delay={0.08} className="space-y-4">
          {skillRows.map((row, index) => (
            <SkillMarquee
              key={index}
              skills={row}
              reverse={index === 1}
              paused={paused || !marqueeIsVisible}
            />
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

function SkillMarquee({
  skills: row,
  reverse = false,
  paused = false,
}: {
  skills: Skill[];
  reverse?: boolean;
  paused?: boolean;
}) {
  const penChip = useRef<HTMLDivElement | null>(null);

  function clearPenHover() {
    if (!penChip.current) return;
    delete penChip.current.dataset.penHover;
    penChip.current.style.removeProperty("--pen-shift-x");
    penChip.current.style.removeProperty("--pen-shift-y");
    penChip.current = null;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "pen" || !(event.target instanceof Element)) {
      return;
    }

    const chip = event.target.closest<HTMLDivElement>(".skill-chip");
    if (!chip || !event.currentTarget.contains(chip)) return;

    if (penChip.current !== chip) {
      clearPenHover();
      penChip.current = chip;
      chip.dataset.penHover = "";
    }

    const rect = chip.getBoundingClientRect();
    const x = rect.width ? (event.clientX - rect.left) / rect.width - 0.5 : 0;
    const y = rect.height ? (event.clientY - rect.top) / rect.height - 0.5 : 0;
    chip.style.setProperty("--pen-shift-x", `${x * 5}px`);
    chip.style.setProperty("--pen-shift-y", `${y * 5}px`);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={clearPenHover}
      onPointerCancel={clearPenHover}
      className="skill-marquee overflow-hidden py-1 [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        className={`skill-track ${reverse ? "skill-track-reverse" : ""} ${paused ? "skill-track-paused" : ""}`}
      >
        <SkillGroup skills={row} />
        <SkillGroup skills={row} duplicate />
      </div>
    </div>
  );
}

function SkillGroup({
  skills: row,
  duplicate = false,
}: {
  skills: Skill[];
  duplicate?: boolean;
}) {
  return (
    <div
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 gap-4"
    >
      {row.map(({ name, Icon, color }) => (
        <div
          key={name}
          className="skill-chip group flex min-w-44 cursor-default items-center justify-center gap-3 overflow-hidden rounded-2xl border border-border/80 bg-background/80 px-6 py-5 shadow-sm transition-[transform,translate,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
        >
          <Icon
            className="h-7 w-7 shrink-0 transition duration-300 ease-out group-hover:-rotate-3 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_10px_var(--brand))]"
            style={{ color, "--brand": color } as CSSProperties}
            aria-hidden
          />
          <span className="font-semibold">{name}</span>
        </div>
      ))}
    </div>
  );
}
