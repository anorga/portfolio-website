export interface Project {
  title: string;
  description: string;
  repo: string;
  liveUrl?: string;
  image: string;
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
