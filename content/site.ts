export const site = {
  name: "Chris Anorga",
  roles: ["Full Stack Developer", "Web Systems Analyst"],
  location: "San Diego, CA",
  email: "anorga2990@gmail.com",
  githubHandle: "anorga",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/anorga",
  formspreeEndpoint: "https://formspree.io/f/xrgjnkaz",
  url: "https://anorga.xyz",
  description:
    "Chris Anorga is a Full Stack Developer and Web Systems Analyst based in San Diego, building reliable web applications with React, Next.js, .NET, and C#.",
  bio: [
    "I'm Chris, a full-stack developer and Web Systems Analyst based in San Diego. I build web platforms that make complex business needs easier for people to use and teams to maintain.",
    "My work spans customer-facing experiences, internal tools, content architecture, and API integrations. I'm most effective where product thinking and hands-on engineering meet: clarifying the problem, choosing a practical approach, and delivering a reliable result.",
  ],
  aboutHighlights: [
    {
      title: "Reliable delivery",
      description:
        "Clear requirements, sound architecture, and maintainable applications delivered through launch.",
    },
    {
      title: "Practical modernization",
      description:
        "Faster, scalable systems that make legacy sites and workflows easier to maintain.",
    },
    {
      title: "Measurable outcomes",
      description:
        "Work that has increased engagement, improved reported UX, and reduced operating costs.",
    },
  ],
} as const;

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
] as const;
