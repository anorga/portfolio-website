"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, site } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.getElementById(link.href.slice(1)),
    );
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = "";
        for (const section of sections) {
          if (section && section.getBoundingClientRect().top <= 180)
            current = section.id;
        }
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
        )
          current = "contact";
        setActive(current);
      });
    }
    const observer = new ResizeObserver(update);
    const main = document.getElementById("main-content");
    if (main) observer.observe(main);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 760px)");
    function onResize(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    desktop.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      desktop.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      <div className="home-signature page-width">
        <a
          href="#main-content"
          className="wordmark"
          onClick={() => setOpen(false)}
          aria-label={`${site.name}, back to the top`}
        >
          Chris Anorga<span aria-hidden>.</span>
        </a>
      </div>
      <header
        ref={header}
        className="site-header"
        onBlurCapture={(event) => {
          if (
            open &&
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            setOpen(false);
        }}
      >
        <div className="header-inner page-width">
          <nav aria-label="Primary navigation" className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={
                  active === link.href.slice(1) ? "location" : undefined
                }
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="header-controls">
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              className="icon-button menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <X size={21} aria-hidden />
              ) : (
                <Menu size={21} aria-hidden />
              )}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mobile-nav page-width"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={
                  active === link.href.slice(1) ? "location" : undefined
                }
              >
                {link.name}
              </a>
            ))}
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              View résumé
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
