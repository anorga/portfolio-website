import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <SectionHeading>About Me</SectionHeading>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {site.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-2xl bg-accent/15 blur-xl"
            />
            <Image
              src="/images/portrait.jpeg"
              alt={`Portrait of ${site.name}`}
              width={360}
              height={360}
              className="rounded-2xl object-cover shadow-lg"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
