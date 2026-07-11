"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Sun className="hidden h-5 w-5 transition-transform duration-300 group-hover:rotate-12 dark:block" />
      <Moon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12 dark:hidden" />
    </button>
  );
}
