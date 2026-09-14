import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    title: "Ambient Notes",
    description:
      "Local-first sticky notes for iPhone, iPad, and the web. Work offline, organize notes by place, and optionally sync an end-to-end encrypted private space. Supports photos, doodles, reminders, widgets, and real-time collaboration on individual notes.",
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
      "Real-time collaborative whiteboard with an infinite canvas, live cursors, presence, and conflict-free Yjs sync over WebSockets. Create notes, shapes, connected arrows, images, and pressure-sensitive drawings; work offline, follow collaborators, present with cursor chat and a laser pointer, and export boards as PNGs.",
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
      "A fast, installable Pokédex powered by the PokéAPI. Browse all 1,025 Pokémon with search, generation and type filters, detailed stats and evolution pages, favorites, and light/dark mode. Build teams of up to six to compare stats, weaknesses, and type coverage.",
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
      "A responsive manga discovery app with a curated library, title and genre search, reusable series pages, and chapter filtering with clear links to independent reading sites.",
    repo: "https://github.com/anorga/manga-react-app",
    liveUrl: "https://manga-react-app.vercel.app/",
    image: "/images/read-manga-collection.webp",
    imageAspectRatio: "36 / 25",
    imageFocalPoint: "50% 50%",
    tags: ["React", "TypeScript", "React Router", "Vite"],
  },
  {
    title: "Atmos",
    description:
      "A calm weather dashboard with worldwide city search, current conditions, hourly and seven-day forecasts, and landscapes that adapt to the weather and time of day. Save favorite places and find the best time outside with a transparent forecast-based recommendation.",
    repo: "https://github.com/anorga/weather-app",
    liveUrl: "https://atmos-weather-phi.vercel.app/",
    image: "/images/atmos.webp",
    imageAspectRatio: "36 / 25",
    imageFocalPoint: "50% 50%",
    tags: ["React", "TypeScript", "Vite", "Open-Meteo", "SVG"],
  },
];
