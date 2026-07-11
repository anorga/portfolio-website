"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
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
        const current = navLinks.find((l) => visible.has(l.href.slice(1)));
        setActive(current ? current.href.slice(1) : "");
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const link of navLinks) {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    function closeMenu(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    // Wait for the menu to collapse so the scroll position is computed
    // against a stable layout, then scroll.
    setTimeout(
      () =>
        target?.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
        }),
      shouldReduceMotion ? 0 : 250,
    );
  }

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6">
      <div className="glass-shell relative mx-auto max-w-6xl rounded-[1.75rem]">
        {/* Glass layer kept separate: backdrop-filter on the container would
            make it the backdrop root and break the mobile menu's own blur, and a
            negative z-index child loses its blur in Chromium. */}
        <div aria-hidden className="glass" />
        <nav className="relative mx-auto flex h-14 items-center justify-between px-5 sm:px-6">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight transition-colors hover:text-accent"
        >
          {site.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-accent"
                  />
                )}
              </a>
            );
          })}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-[transform,border-color,color] duration-200 hover:border-accent hover:text-accent active:scale-95"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -18, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 18, scale: 0.8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-3 right-3 h-0.5 origin-left rounded-full bg-accent/70"
        />

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
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
              <div className="relative flex flex-col px-6 py-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.04 + index * 0.035,
                      duration: shouldReduceMotion ? 0 : 0.2,
                    }}
                    className="py-3 text-base font-medium text-muted transition-colors hover:text-accent"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
