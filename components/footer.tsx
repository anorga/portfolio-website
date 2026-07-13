import { ArrowUp, Mail } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { navLinks, site } from "@/content/site";

const focusClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card";

export function Footer() {
  return (
    <footer className="relative pb-6 sm:pb-10">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 2xl:max-w-7xl">
        <PointerGlow
          size={820}
          className="pointer-focus-none -mt-px overflow-hidden rounded-b-[2rem] border border-t-0 border-border/70 bg-card/70 shadow-sm sm:rounded-b-[2.5rem]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-44 left-1/2 h-80 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-accent/8 blur-3xl"
          />

          <div className="relative px-5 pb-8 sm:px-10 sm:pb-10 lg:px-14">
            <div className="flex items-center gap-4 border-t border-border/70 pt-8 sm:pt-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {site.roles[0]}
              </span>
              <span aria-hidden className="h-px flex-1 bg-border/80" />
              <a
                href="#main-content"
                aria-label="Back to top"
                className={`group/top inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background/65 text-foreground shadow-sm transition-[transform,border-color,color,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:border-accent hover:bg-background hover:text-accent hover:shadow-md active:translate-y-0 active:scale-95 ${focusClassName}`}
              >
                <ArrowUp
                  className="h-5 w-5 transition-transform duration-200 group-hover/top:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </div>

            <a
              href="#main-content"
              aria-label={`Back to the top of ${site.name}'s portfolio`}
              className={`group/signature mt-10 block rounded-2xl py-2 text-center text-[clamp(3rem,11vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.065em] text-foreground transition-[transform,color] duration-300 hover:text-accent active:scale-[0.99] sm:mt-14 ${focusClassName}`}
            >
              <span aria-hidden>
                {site.name}
                <span className="text-accent transition-colors duration-300 group-hover/signature:text-foreground">
                  .
                </span>
              </span>
            </a>

            <div className="mt-10 grid gap-8 border-t border-border/70 pt-8 sm:mt-12 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <nav aria-label="Footer navigation">
                  <ul className="flex flex-wrap gap-x-2 gap-y-1" role="list">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted transition-[transform,color,background-color] duration-200 hover:-translate-y-0.5 hover:bg-background/70 hover:text-accent active:translate-y-0 active:scale-95 ${focusClassName}`}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <p className="mt-5 text-sm text-muted">
                  &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
                </p>
              </div>

              <div className="flex gap-2 sm:justify-end">
                <a
                  href={`mailto:${site.email}`}
                  aria-label={`Email ${site.name}`}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/55 text-muted shadow-sm transition-[transform,border-color,color,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:border-accent hover:bg-background hover:text-accent hover:shadow-md active:translate-y-0 active:scale-95 ${focusClassName}`}
                >
                  <Mail className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${site.name} on GitHub`}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/55 text-muted shadow-sm transition-[transform,border-color,color,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:border-accent hover:bg-background hover:text-accent hover:shadow-md active:translate-y-0 active:scale-95 ${focusClassName}`}
                >
                  <Github className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </PointerGlow>
      </div>
    </footer>
  );
}
