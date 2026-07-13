"use client";

import { useRef, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "motion/react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const transitionPending = useRef(false);

  const actionLabel =
    resolvedTheme === "dark"
      ? "Switch to light theme"
      : resolvedTheme === "light"
        ? "Switch to dark theme"
        : "Change color theme";

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
    <motion.button
      type="button"
      aria-label={actionLabel}
      title={actionLabel}
      onClick={toggleTheme}
      whileHover={shouldReduceMotion ? undefined : { y: -1, scale: 1.04 }}
      whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.92 }}
      className="group inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-foreground/20 bg-background/45 text-foreground shadow-sm transition-[background-color,border-color,color,box-shadow] duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-md active:bg-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Sun
        aria-hidden
        className="hidden h-5 w-5 transition-transform duration-300 group-hover:rotate-12 dark:block"
      />
      <Moon
        aria-hidden
        className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12 dark:hidden"
      />
    </motion.button>
  );
}
