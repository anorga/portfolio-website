export interface Project {
  title: string;
  description: string;
  repo: string;
  liveUrl?: string;
  image: string;
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
