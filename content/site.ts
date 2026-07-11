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
    "I'm Chris, a full-stack developer and Web Systems Analyst based in San Diego. I'm passionate about crafting high-quality web experiences, combining technical expertise with thoughtful design.",
    "The constantly evolving nature of web development inspires me to stay at the forefront of new technologies and to approach challenges with innovative solutions. My goal is to build intuitive, visually engaging websites and applications.",
  ],
  aboutHighlights: [
    {
      title: "Full-stack delivery",
      description: "React, Next.js, .NET, C#, and API integrations.",
    },
    {
      title: "Systems thinking",
      description: "Turning business requirements into reliable solutions.",
    },
    {
      title: "Close collaboration",
      description: "Working across design, engineering, and IT.",
    },
  ],
} as const;

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
] as const;
