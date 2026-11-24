"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const label = !mounted
    ? "Change color theme"
    : resolvedTheme === "dark"
      ? "Switch to light theme"
      : "Switch to dark theme";
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun size={18} aria-hidden className="hidden dark:block" />
      <Moon size={18} aria-hidden className="dark:hidden" />
    </button>
  );
}
