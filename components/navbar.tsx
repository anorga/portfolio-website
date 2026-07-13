"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, site } from "@/content/site";

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const current = navLinks.find((link) =>
          visible.has(link.href.slice(1)),
        );
        setActive(current ? current.href.slice(1) : "");
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    for (const link of navLinks) {
      const element = document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}

function useCompactNavigation() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(
      "#main-content > section:first-child",
    );

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompact(
          !entry.isIntersecting && entry.boundingClientRect.bottom <= 80,
        );
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return compact;
}

function focusHashDestination(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : "";
  const destination = id ? document.getElementById(id) : null;

  if (!destination) return;

  const hadTabIndex = destination.hasAttribute("tabindex");
  if (!hadTabIndex) destination.setAttribute("tabindex", "-1");

  destination.focus({ preventScroll: true });

  if (!hadTabIndex) {
    destination.addEventListener(
      "blur",
      () => destination.removeAttribute("tabindex"),
      { once: true },
    );
  }
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection();
  const compact = useCompactNavigation();
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !open) return;

      event.preventDefault();
      setOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        open &&
        event.target instanceof Node &&
        !shellRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  function handleHashClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const href = event.currentTarget.getAttribute("href");
    setOpen(false);

    if (href?.startsWith("#")) {
      window.setTimeout(() => focusHashDestination(href), 0);
    }
  }

  const navMotion = shouldReduceMotion
    ? undefined
    : { y: -1, scale: 1.015 };
  const tapMotion = shouldReduceMotion ? undefined : { y: 0, scale: 0.97 };

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6">
      <div
        ref={shellRef}
        className={`glass-shell relative mx-auto rounded-[1.75rem] transition-[width,max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 ${
          compact
            ? "w-[calc(100%-0.5rem)] max-w-5xl sm:w-[calc(100%-1rem)] md:w-[calc(100%-1.5rem)] xl:w-full 2xl:max-w-6xl"
            : "w-full max-w-6xl 2xl:max-w-7xl"
        }`}
      >
        {/* The separate material layer lets the menu retain its own blur. */}
        <div aria-hidden className="glass" />

        <nav
          aria-label="Primary navigation"
          className={`relative mx-auto flex h-14 items-center justify-between transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 ${
            compact ? "px-4 sm:px-5" : "px-5 sm:px-6"
          }`}
        >
          <motion.a
            href="#main-content"
            aria-label={`${site.name}, back to the top`}
            onClick={handleHashClick}
            whileHover={navMotion}
            whileTap={tapMotion}
            className="inline-flex min-h-11 items-center rounded-full px-2 text-lg font-bold tracking-tight transition-[background-color,color] duration-200 hover:bg-accent/10 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {site.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </motion.a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={handleHashClick}
                  whileHover={navMotion}
                  whileTap={tapMotion}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-200 hover:bg-accent/10 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      aria-hidden
                      layoutId="nav-active"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-accent"
                    />
                  )}
                </motion.a>
              );
            })}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <motion.button
              ref={menuButtonRef}
              type="button"
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
              whileHover={shouldReduceMotion ? undefined : { y: -1, scale: 1.04 }}
              whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.92 }}
              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-foreground/20 bg-background/45 text-foreground shadow-sm transition-[background-color,border-color,color,box-shadow] duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-md active:bg-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -18, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 18, scale: 0.8 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
                >
                  {open ? (
                    <X aria-hidden className="h-5 w-5" />
                  ) : (
                    <Menu aria-hidden className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-3 right-3 h-0.5 origin-left rounded-full bg-accent/70 motion-reduce:hidden"
        />

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0, y: -8, scale: 0.985 }}
              animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, y: -6, scale: 0.99 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.26,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-shell absolute inset-x-0 top-full mt-2 overflow-hidden rounded-3xl md:hidden"
            >
              <div aria-hidden className="glass" />
              <div className="relative flex flex-col gap-1 p-2">
                {navLinks.map((link, index) => {
                  const isActive = active === link.href.slice(1);

                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={handleHashClick}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={
                        shouldReduceMotion ? undefined : { x: 4, scale: 1.005 }
                      }
                      whileTap={
                        shouldReduceMotion ? undefined : { x: 2, scale: 0.985 }
                      }
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.04 + index * 0.035,
                        duration: shouldReduceMotion ? 0 : 0.2,
                      }}
                      className={`group flex min-h-12 touch-manipulation items-center justify-between rounded-2xl px-4 text-base font-medium transition-[background-color,color] duration-200 hover:bg-accent/10 hover:text-accent active:bg-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-muted"
                      }`}
                    >
                      <span>{link.name}</span>
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 rounded-full transition-[background-color,transform] duration-200 ${
                          isActive
                            ? "scale-100 bg-accent"
                            : "scale-75 bg-border group-hover:bg-accent"
                        }`}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
