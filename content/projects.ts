import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "ambient-notes",
    cardColor: "cobalt",
    title: "Ambient Notes",
    category: "Notes & everyday creativity",
    description:
      "Colorful notes, doodles, photos, and reminders for iPhone, iPad, and the web. Built to work offline, with optional encrypted sync and real-time collaboration on individual notes.",
    liveUrl: "https://ambientnotes.app/",
    image: "/images/ambient-notes-cover.webp",
    darkImage: "/images/ambient-notes-cover-dark.webp",
    imageAlt:
      "The Ambient Notes cover reads ‘A little note. A lot of you.’ Pip the pinned note, Dudley the dog, and stickers surround three paper notes.",
    imageAspectRatio: "8 / 5",
    imageFocalPoint: "50% 50%",
    tags: ["React Native", "ASP.NET Core", "PostgreSQL", "SQLite"],
  },
  {
    id: "driftboard",
    cardColor: "orange",
    title: "Driftboard",
    category: "Real-time collaboration",
    description:
      "A shared canvas for thinking together. Live cursors, drawing, and an infinite whiteboard, with Yjs and WebSockets keeping concurrent edits in sync—even after working offline.",
    repo: "https://github.com/anorga/driftboard",
    liveUrl: "https://driftboard-waem.onrender.com",
    image: "/images/driftboard-light.webp",
    darkImage: "/images/driftboard-dark.webp",
    imageAlt:
      "A Driftboard launch plan with three sticky notes and a diagram connecting the sync server to its clients.",
    imageAspectRatio: "8 / 5",
    imageFocalPoint: "50% 48%",
    tags: ["React", "TypeScript", "Yjs", "WebSockets"],
  },
  {
    id: "pokedex",
    cardColor: "mocha",
    title: "Pokédex App",
    category: "Search & discovery",
    description:
      "Explore 1,025 Pokémon, trace evolutions, and build a team. An installable web app that turns PokéAPI data into fast search, useful filters, and clear comparisons.",
    repo: "https://github.com/anorga/pokedex",
    liveUrl: "https://pokedex-navy-delta.vercel.app/",
    image: "/images/pokedex-light.webp",
    darkImage: "/images/pokedex.png",
    imageAlt:
      "The Pokédex grid with illustrated Pokémon cards and type filters.",
    imageAspectRatio: "8 / 5",
    imageFocalPoint: "50% 38%",
    tags: ["React", "TypeScript", "TanStack Query", "PWA"],
  },
  {
    id: "read-manga",
    cardColor: "sky",
    title: "Read Manga App",
    category: "Content & discovery",
    description:
      "A manga library with title and genre search, reusable series pages, and chapter filtering.",
    repo: "https://github.com/anorga/manga-react-app",
    liveUrl: "https://manga-react-app.vercel.app/",
    image: "/images/read-manga-covers-light.webp",
    darkImage: "/images/read-manga-collection.webp",
    imageAlt:
      "Attack on Titan, Chainsaw Man, and Jujutsu Kaisen from the Read Manga collection.",
    imageAspectRatio: "36 / 25",
    imageFocalPoint: "50% 50%",
    tags: ["React", "TypeScript", "React Router", "Vite"],
  },
  {
    id: "atmos",
    cardColor: "mocha",
    title: "Atmos",
    category: "Weather & data visualization",
    description:
      "A calm weather dashboard with worldwide forecasts and landscapes that change with the weather and time of day.",
    repo: "https://github.com/anorga/weather-app",
    liveUrl: "https://atmos-weather-phi.vercel.app/",
    image: "/images/atmos-day.webp",
    darkImage: "/images/atmos-night.webp",
    imageAlt:
      "The Atmos current conditions card with a temperature reading and an illustrated sky over rolling hills.",
    imageAspectRatio: "36 / 25",
    imageFocalPoint: "50% 50%",
    tags: ["React", "TypeScript", "Vite", "Open-Meteo", "SVG"],
  },
];
