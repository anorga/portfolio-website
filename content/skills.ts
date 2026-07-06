import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiSharp,
  SiDotnet,
  SiGit,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa6";

export interface Skill {
  name: string;
  Icon: IconType;
  color: string;
}

export const skills: Skill[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "var(--foreground)" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "C#", Icon: SiSharp, color: "#239120" },
  { name: ".NET", Icon: SiDotnet, color: "#512BD4" },
  { name: "SQL", Icon: FaDatabase, color: "#64748B" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
];
