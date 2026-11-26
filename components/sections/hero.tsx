import { ThemedImage } from "@/components/ui/themed-image";
import { SiGithub } from "react-icons/si";
import { ArrowDownRight } from "lucide-react";
import { KineticType } from "@/components/ui/kinetic-type";
import { ThinkingForm } from "@/components/ui/thinking-form";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="intro-title">
      <div className="hero-meta page-width">
        <p>Chris Anorga / Developer & independent maker</p>
        <p>San Diego, California</p>
      </div>
      <KineticType />
      <div className="hero-bottom page-width">
        <div className="hero-copy">
          <h2>
            Designing interfaces.
            <br />
            <span>Building products.</span>
          </h2>
          <p className="hero-description">
            Full-stack developer based in San Diego. I build web and mobile
            apps, from the interface to the systems behind it.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              Explore my work
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="button button-secondary"
            >
              Resume
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label="Chris Anorga on GitHub"
            >
              <SiGithub size={22} aria-hidden />
            </a>
          </div>
          <a id="now-shipping" href="#ambient-notes" className="current-build">
            <ThemedImage
              src="/images/ambient-notes-icon.png"
              darkSrc="/images/ambient-notes-icon-dark.webp"
              alt=""
              width={52}
              height={52}
            />
            <span className="current-build-copy">
              <span className="current-build-label">Now shipping</span>
              <strong>Ambient Notes</strong>
              <span className="current-build-platforms">
                iPhone, iPad & web
              </span>
            </span>
            <span className="current-build-stub" aria-hidden>
              <ArrowDownRight size={24} />
            </span>
          </a>
        </div>
        <div className="hero-aside">
          <ThinkingForm className="hero-form" interactive />
        </div>
      </div>
      <div className="hero-bottom-line page-width">
        <span>Web / Mobile / Creative development</span>
        <a href="#projects">Keep exploring</a>
      </div>
    </section>
  );
}
