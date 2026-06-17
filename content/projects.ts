import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    title: "Pokedex App",
    description:
      "Pokedex web application built using data from PokeAPI. Search for any Pokemon to see base stats and type information.",
    repo: "https://github.com/anorga/pokedex",
    liveUrl: "https://pokedex-navy-delta.vercel.app/",
    image: "/images/pokedexApp.png",
    tags: ["React", "React Router", "Tailwind", "PokeAPI"],
  },
  {
    title: "Read Manga App",
    description:
      "Application for manga enthusiasts that aggregates external links to read popular manga, kept constantly updated. Best viewed on mobile.",
    repo: "https://github.com/anorga/manga-react-app",
    liveUrl: "https://readmangas.xyz/",
    image: "/images/readmangas.webp",
    tags: ["React", "React Router", "Bootstrap"],
  },
  {
    title: "Weather App",
    description:
      "Single Page Application that displays the daily forecast in cities of choice, powered by the Open Weather API.",
    repo: "https://github.com/anorga/weather-app",
    liveUrl: "https://master.d1g2odaawq5ejv.amplifyapp.com/",
    image: "/images/weatherapp.webp",
    tags: ["React", "TypeScript", "Bootstrap", "OpenWeather API"],
  },
];
