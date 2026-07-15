import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="safe-section-x mx-auto w-full max-w-6xl 2xl:max-w-7xl">
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-3xl font-bold tracking-tight sm:text-4xl ${className}`}
    >
      {children}
    </h2>
  );
}

interface SectionIntroProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  align?: "left" | "center";
  className?: string;
  descriptionClassName?: string;
}

export function SectionIntro({
  title,
  description,
  eyebrow,
  align = "left",
  className = "",
  descriptionClassName = "",
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <SectionHeading>{title}</SectionHeading>
      {description && (
        <p
          className={`mt-4 leading-relaxed text-muted ${
            centered ? "mx-auto" : ""
          } ${descriptionClassName || "max-w-2xl"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
