import { ThemedImage } from "@/components/ui/themed-image";
import { GlassInteraction } from "@/components/ui/glass-interaction";
import { ChevronDown, Globe, Code2 } from "lucide-react";
import { projects } from "@/content/projects";
import type { Project } from "@/lib/types";
import { PlaySurface } from "@/components/ui/play-surface";
import { MotionTitle } from "@/components/ui/motion-system";
import { ProjectIndex } from "@/components/ui/project-index";
import { Reveal } from "@/components/ui/reveal";

export function Projects() {
  const [featured, ...otherProjects] = projects;
  return (
    <section
      id="projects"
      className="work-section page-width"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected work / Independent projects</p>
          <MotionTitle id="work-title" lines={["things I’ve", "made."]} />
        </div>
        <ProjectIndex />
      </div>
      <article
        id={featured.id}
        className="featured-project"
        aria-labelledby="featured-title"
      >
        <div className="featured-copy">
          <div className="featured-title-group">
            <p className="eyebrow">Featured product · iOS & web</p>
            <h3 id="featured-title">{featured.title}</h3>
            <p className="project-deck">
              A little space for everyday thoughts.
            </p>
          </div>
          <div className="featured-detail-group">
            <p className="project-description">{featured.description}</p>
            <ProjectTags project={featured} />
            <ProjectLinks project={featured} />
          </div>
        </div>
        <PlaySurface className="featured-art" intensity={0.25}>
          <div className="project-frame-label">
            <span>Ambient Notes</span>
            <span>Product / iOS + Web</span>
          </div>
          <ProjectImage project={featured} featured />
        </PlaySurface>
        <details className="engineering-details">
          <summary>
            <span>
              Behind the build{" "}
              <span className="detail-hint">
                The decisions that make it work
              </span>
            </span>
            <ChevronDown size={18} aria-hidden />
          </summary>
          <div className="engineering-grid">
            <div>
              <h4>Capture first</h4>
              <p>
                Notes save on the device first. SQLite and a durable sync outbox
                keep writing available offline and carry changes to linked
                devices.
              </p>
            </div>
            <div>
              <h4>Privacy in the architecture</h4>
              <p>
                Note content is encrypted before it syncs. The ASP.NET Core API
                and PostgreSQL handle storage without receiving the content key.
              </p>
            </div>
            <div>
              <h4>Built for each screen</h4>
              <p>
                One Expo and React Native client adapts to quick capture on a
                phone, a spatial board on larger screens, and keyboard
                navigation on the web.
              </p>
            </div>
          </div>
        </details>
      </article>
      <div className="project-grid">
        {otherProjects.slice(0, 2).map((project) => (
          <Reveal className="project-reveal" key={project.title}>
            <article id={project.id} className="project-card">
              <PlaySurface className="project-art" intensity={0.25}>
                <div className="project-frame-label">
                  <span>{project.title}</span>
                  <span>Web application</span>
                </div>
                <ProjectImage project={project} />
              </PlaySurface>
              <div className="project-card-copy">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ProjectTags project={project} />
                <ProjectLinks project={project} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="more-work">
        <h3>More things I’ve built</h3>
        <div className="more-work-grid">
          {otherProjects.slice(2).map((project) => (
            <article id={project.id} key={project.id} className="small-project">
              <ProjectImage project={project} compact />
              <div>
                <p className="project-category">{project.category}</p>
                <h4>{project.title}</h4>
                <p className="project-description">{project.description}</p>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectImage({
  project,
  featured = false,
  compact = false,
}: {
  project: Project;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <a
      className={`project-image${featured ? " featured-image" : ""}${compact ? " small-project-image" : ""}`}
      href={project.liveUrl ?? project.repo}
      target="_blank"
      rel="noreferrer"
      aria-label={`Explore ${project.title} in a new tab`}
      draggable={false}
    >
      <GlassInteraction />
      <span
        className="project-image-viewport"
        style={{ aspectRatio: project.imageAspectRatio }}
      >
        <ThemedImage
          draggable={false}
          src={project.image}
          darkSrc={project.darkImage}
          quality={featured ? 90 : undefined}
          fetchPriority={featured ? "high" : undefined}
          alt={project.imageAlt ?? `${project.title} app screenshot`}
          fill
          sizes={
            compact
              ? "(min-width: 600px) 160px, 112px"
              : featured
                ? "(min-width: 1440px) 1334px, 100vw"
                : "(min-width: 760px) 560px, 100vw"
          }
          style={{
            objectFit: "cover",
            objectPosition: project.imageFocalPoint,
          }}
        />
      </span>
      <span className="image-link-label">Explore project</span>
    </a>
  );
}

function ProjectTags({ project }: { project: Project }) {
  return (
    <ul className="project-tags" aria-label={`${project.title} technologies`}>
      {project.tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${project.title} in a new tab`}
        >
          <Globe size={16} aria-hidden />
          Visit project
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`Read ${project.title} source code on GitHub in a new tab`}
        >
          <Code2 size={17} aria-hidden />
          Source code
        </a>
      )}
    </div>
  );
}
