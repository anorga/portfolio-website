"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import type { ComponentProps } from "react";

function ThemeColorSync() {
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const color = getComputedStyle(root)
        .getPropertyValue("--background")
        .trim();
      document
        .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
        ?.setAttribute("content", color);
    };
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    sync();
    return () => observer.disconnect();
  }, []);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeColorSync />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
