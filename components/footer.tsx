import { Mail } from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { navLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 lg:px-8">
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-muted transition-[transform,color] duration-200 hover:-translate-y-0.5 hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex gap-5">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-muted transition-[transform,color] duration-200 hover:-translate-y-0.5 hover:text-accent"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-[transform,color] duration-200 hover:-translate-y-0.5 hover:text-accent"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>

        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
