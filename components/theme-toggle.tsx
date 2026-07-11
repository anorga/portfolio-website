"use client";

import { useRef, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const transitionPending = useRef(false);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    if (transitionPending.current) return;

    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    if (!document.startViewTransition || shouldReduceMotion) {
      setTheme(nextTheme);
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    transitionPending.current = true;
    document.documentElement.dataset.themeTransition = "";

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });

    void transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});

    void transition.finished.finally(() => {
      transitionPending.current = false;
      delete document.documentElement.dataset.themeTransition;
    });
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Sun className="hidden h-5 w-5 transition-transform duration-300 group-hover:rotate-12 dark:block" />
      <Moon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12 dark:hidden" />
    </button>
  );
}
