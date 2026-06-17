import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/content/experience";

export function Experience() {
  if (experience.length === 0) return null;

  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading>Experience</SectionHeading>
      </Reveal>

      <div className="mt-12 space-y-8 border-l border-border pl-6">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${i}`} delay={i * 0.08}>
            <div className="relative">
              <span
                aria-hidden
                className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-xl font-semibold">
                  {job.role}{" "}
                  <span className="text-accent">@ {job.company}</span>
                </h3>
                <span className="text-sm text-muted">{job.period}</span>
              </div>
              {job.location && (
                <p className="mt-1 text-sm text-muted">{job.location}</p>
              )}
              <p className="mt-3 text-muted">{job.description}</p>
              {job.highlights && job.highlights.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                  {job.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
