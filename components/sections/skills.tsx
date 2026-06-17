import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { skills } from "@/content/skills";

export function Skills() {
  return (
    <Section id="skills" className="bg-card/40">
      <Reveal>
        <SectionHeading className="text-center">Technologies</SectionHeading>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">
          Tools and frameworks I use to build modern web experiences.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {skills.map(({ name, Icon, color }, i) => (
          <Reveal key={name} delay={i * 0.06}>
            <div className="group flex items-center justify-center gap-3 rounded-xl border border-border bg-card px-6 py-6 transition-colors hover:border-accent">
              <Icon
                className="h-8 w-8 shrink-0 transition-transform group-hover:scale-110"
                style={{ color }}
                aria-hidden
              />
              <span className="text-lg font-semibold transition-colors group-hover:text-accent">
                {name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
