import { ThinkingForm } from "@/components/ui/thinking-form";
import { MotionTitle } from "@/components/ui/motion-system";

const capabilities = [
  {
    title: "Interfaces & interactions",
    description:
      "Responsive websites, accessible interfaces, and apps that feel at home on their screen.",
    tools: "React · Next.js · React Native · TypeScript",
  },
  {
    title: "Systems & data",
    description:
      "APIs, databases, and synchronization that support the experience from behind the scenes.",
    tools: "C# · ASP.NET Core · PostgreSQL · SQLite",
  },
  {
    title: "From idea to delivery",
    description:
      "Turning requirements into maintainable software, with care for performance and the people using it.",
    tools: "Git · Vercel · Expo · Node.js",
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="skills-section page-width"
      aria-labelledby="skills-title"
    >
      <p className="eyebrow">How I work</p>
      <MotionTitle
        id="skills-title"
        lines={["what you see.", "how it works."]}
      />
      <div className="capability-grid">
        {capabilities.map((item, index) => (
          <article key={item.title} className="capability">
            <ThinkingForm
              className="capability-form"
              initial={(["shaping", "connecting", "solving"] as const)[index]}
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p className="capability-tools">{item.tools}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
