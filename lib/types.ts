export interface Project {
  id: string;
  cardColor: "cobalt" | "orange" | "mocha" | "sky";
  title: string;
  category: string;
  description: string;
  repo?: string;
  liveUrl?: string;
  image: string;
  darkImage?: string;
  imageAlt?: string;
  imageAspectRatio: `${number} / ${number}`;
  imageFocalPoint: `${number}% ${number}%`;
  tags: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
}
