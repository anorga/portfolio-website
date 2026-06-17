import type { IconType } from "react-icons";
import {
  SiReact,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si";

export interface Skill {
  name: string;
  Icon: IconType;
  color: string;
}

export const skills: Skill[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
];
