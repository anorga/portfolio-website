import Image from "next/image";
import { site } from "@/content/site";
import { PlaySurface } from "@/components/ui/play-surface";
import { MotionTitle } from "@/components/ui/motion-system";

export function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="page-width">
        <p className="eyebrow">The person behind the work</p>
        <MotionTitle
          id="about-title"
          lines={["curious mind.", "busy hands."]}
        />
        <div className="about-grid">
          <PlaySurface className="about-portrait">
            <div className="portrait-sticker">
              <Image
                src="/images/portrait-crop.jpg"
                alt="Chris Anorga"
                width={420}
                height={470}
                sizes="(max-width: 759px) 70vw, 360px"
                style={{ objectFit: "cover" }}
              />
              <span>Chris, away from the keyboard.</span>
            </div>
            <span className="portrait-note">Based in San Diego, CA</span>
          </PlaySurface>
          <div className="about-copy">
            <h3>
              I care about how it feels.
              <br />
              And how it works.
            </h3>
            <p>
              I’m Chris, a full-stack developer and Web Systems Analyst in San
              Diego. I work across customer-facing websites, internal tools,
              content architecture, and API integrations.
            </p>
            <p>
              I like taking a problem from “what do people need?” through to a
              working product: making the interface clear, the underlying
              systems reliable, and the next change easier to make.
            </p>
            <p>
              My independent projects are where I explore those ideas further,
              from offline-first mobile apps to real-time collaboration on the
              web.
            </p>
            <a
              className="button button-secondary"
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              A little more about me — résumé
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
