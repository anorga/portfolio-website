export const site = {
  name: "Chris Anorga",
  roles: ["Web Developer", "Front-End Developer"],
  location: "San Diego, CA",
  email: "anorga2990@gmail.com",
  phone: "+1 (619) 822-8877",
  githubHandle: "anorga",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/anorga",
  formspreeEndpoint: "https://formspree.io/f/xrgjnkaz",
  url: "https://anorga.xyz",
  description:
    "Chris Anorga — Web & Front-End Developer based in San Diego. Building intuitive, visually engaging websites and applications with React, TypeScript, and the MERN stack.",
  bio: [
    "I'm Chris, a Web Developer based in San Diego. I'm passionate about crafting high-quality web experiences, combining technical expertise with thoughtful design.",
    "The constantly evolving nature of web development inspires me to stay at the forefront of new technologies and to approach challenges with innovative solutions. My goal is to build intuitive, visually engaging websites and applications.",
    "With expertise across the MERN stack and content management systems like WordPress, I deliver comprehensive web solutions that exceed expectations. I'm always excited to turn ideas into reality.",
  ],
} as const;

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
] as const;
