import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    title: "Driftboard",
    description:
      "Multiplayer whiteboard with live cursors, presence, and conflict-free sync built on CRDTs (Yjs) over WebSockets. Infinite canvas with sticky notes, shapes, and freehand drawing; offline-ready via IndexedDB with per-user undo/redo. Custom Node.js sync server implementing the y-websocket protocol.",
    repo: "https://github.com/anorga/driftboard",
    liveUrl: "https://driftboard-waem.onrender.com",
    image: "/images/driftboard.png",
    tags: ["React", "TypeScript", "Yjs (CRDTs)", "WebSockets", "Node.js", "Vite", "Tailwind CSS"],
  },
  {
    title: "Pokédex App",
    description:
      "A fast, installable Pokédex (PWA) powered by the PokéAPI. Browse 1,000+ Pokémon with search and filters, detailed stat and evolution pages, side-by-side comparison, favorites, and light/dark mode.",
    repo: "https://github.com/anorga/pokedex",
    liveUrl: "https://pokedex-navy-delta.vercel.app/",
    image: "/images/pokedex.png",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "PWA", "PokéAPI"],
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
