import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    title: "Ambient Notes",
    description:
      "Local-first sticky notes for iPhone, iPad, and the web. Notes work offline and can sync as an encrypted private space, with photos, doodles, reminders, widgets, and real-time sharing for individual notes.",
    liveUrl: "https://ambientnotes.app/",
    image: "/images/ambient-notes.png",
    imageAspectRatio: "40 / 21",
    imageFocalPoint: "50% 50%",
    tags: [
      "Expo",
      "React Native",
      "TypeScript",
      "ASP.NET Core",
      "PostgreSQL",
      "SQLite",
      "End-to-end encryption",
    ],
  },
  {
    title: "Driftboard",
    description:
      "Multiplayer whiteboard with live cursors, presence, and conflict-free sync built on CRDTs (Yjs) over WebSockets. Infinite canvas with sticky notes, shapes, and freehand drawing; offline-ready via IndexedDB with per-user undo/redo. Custom Node.js sync server implementing the y-websocket protocol.",
    repo: "https://github.com/anorga/driftboard",
    liveUrl: "https://driftboard-waem.onrender.com",
    image: "/images/driftboard.png",
    imageAspectRatio: "8 / 5",
    imageFocalPoint: "50% 48%",
    tags: ["React", "TypeScript", "Yjs (CRDTs)", "WebSockets", "Node.js", "Vite", "Tailwind CSS"],
  },
  {
    title: "Pokédex App",
    description:
      "A fast, installable Pokédex (PWA) powered by the PokéAPI. Browse 1,000+ Pokémon with search and filters, detailed stat and evolution pages, side-by-side comparison, favorites, and light/dark mode.",
    repo: "https://github.com/anorga/pokedex",
    liveUrl: "https://pokedex-navy-delta.vercel.app/",
    image: "/images/pokedex.png",
    imageAspectRatio: "8 / 5",
    imageFocalPoint: "50% 38%",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "PWA", "PokéAPI"],
  },
  {
    title: "Read Manga App",
    description:
      "Application for manga enthusiasts that aggregates external links to read popular manga, kept constantly updated. Best viewed on mobile.",
    repo: "https://github.com/anorga/manga-react-app",
    liveUrl: "https://readmangas.xyz/",
    image: "/images/readmangas.webp",
    imageAspectRatio: "2 / 1",
    imageFocalPoint: "50% 28%",
    tags: ["React", "React Router", "Bootstrap"],
  },
  {
    title: "Atmos",
    description:
      "A calm weather dashboard with worldwide city search, hourly and seven-day forecasts, and landscapes that change with the weather. Save favorite places and find the best time outside with a forecast-based recommendation.",
    repo: "https://github.com/anorga/weather-app",
    liveUrl: "https://atmos-weather-phi.vercel.app/",
    image: "/images/atmos.webp",
    imageAspectRatio: "36 / 25",
    imageFocalPoint: "50% 50%",
    tags: ["React", "TypeScript", "Vite", "Open-Meteo", "SVG"],
  },
];
