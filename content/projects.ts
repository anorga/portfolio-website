import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    title: "Ambient Notes",
    category: "Notes & everyday creativity",
    description:
      "Colorful notes, doodles, photos, and reminders for iPhone, iPad, and the web. Built to work offline, with optional encrypted sync and real-time collaboration on individual notes.",
    liveUrl: "https://ambientnotes.app/",
    image: "/images/ambient-notes-cover.webp",
    imageAlt:
      "Ambient Notes: A little note. A lot of you. Rounded blue lettering surrounded by Pip the pinned note, Dudley the dog, colorful stickers, and pastel paper notes, with the sage-green app icon.",
    imageAspectRatio: "8 / 5",
    imageFocalPoint: "50% 50%",
    tags: ["React Native", "ASP.NET Core", "PostgreSQL", "SQLite"],
  },
  {
    title: "Driftboard",
    category: "Real-time collaboration",
    description:
      "A shared canvas for thinking together. Live cursors, drawing, and an infinite whiteboard, with Yjs and WebSockets keeping concurrent edits in sync—even after working offline.",
    repo: "https://github.com/anorga/driftboard",
    liveUrl: "https://driftboard-waem.onrender.com",
    image: "/images/driftboard.png",
    imageAspectRatio: "8 / 5",
    imageFocalPoint: "50% 48%",
    tags: ["React", "TypeScript", "Yjs", "WebSockets"],
  },
  {
    title: "Pokédex App",
    category: "Search & discovery",
    description:
      "Explore 1,025 Pokémon, trace evolutions, and build a team. An installable web app that turns PokéAPI data into fast search, useful filters, and clear comparisons.",
    repo: "https://github.com/anorga/pokedex",
    liveUrl: "https://pokedex-navy-delta.vercel.app/",
    image: "/images/pokedex.png",
    imageAspectRatio: "8 / 5",
    imageFocalPoint: "50% 38%",
    tags: ["React", "TypeScript", "TanStack Query", "PWA"],
  },
  {
    title: "Read Manga App",
    category: "Content & discovery",
    description:
      "A manga library with title and genre search, reusable series pages, and chapter filtering.",
    repo: "https://github.com/anorga/manga-react-app",
    liveUrl: "https://manga-react-app.vercel.app/",
    image: "/images/read-manga-collection.webp",
    imageAspectRatio: "36 / 25",
    imageFocalPoint: "50% 50%",
    tags: ["React", "TypeScript", "React Router", "Vite"],
  },
  {
    title: "Atmos",
    category: "Weather & data visualization",
    description:
      "A calm weather dashboard with worldwide forecasts and landscapes that change with the weather and time of day.",
    repo: "https://github.com/anorga/weather-app",
    liveUrl: "https://atmos-weather-phi.vercel.app/",
    image: "/images/atmos.webp",
    imageAspectRatio: "36 / 25",
    imageFocalPoint: "50% 50%",
    tags: ["React", "TypeScript", "Vite", "Open-Meteo", "SVG"],
  },
];
