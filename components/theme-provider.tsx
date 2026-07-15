"use client";

import { useEffect } from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from "next-themes";
import { MotionConfig } from "motion/react";
import type { ComponentProps } from "react";

function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;

    const color = resolvedTheme === "dark" ? "#0c0a09" : "#fafaf9";
    document.documentElement.style.colorScheme = resolvedTheme;
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute("content", color);
  }, [resolvedTheme]);

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
