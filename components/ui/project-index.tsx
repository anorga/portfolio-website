"use client";

import { useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { PreviewGlass, ThemedImage } from "./themed-image";

export function ProjectIndex() {
  const [card, setCard] = useState({ index: 0, direction: 0 });
  const drag = useRef<{
    x: number;
    y: number;
    pointerId: number;
    started: number;
  } | null>(null);
  const suppressClick = useRef(false);
  const project = projects[card.index];

  function flip(direction: 1 | -1) {
    setCard(({ index }) => ({
      index: (index + direction + projects.length) % projects.length,
      direction,
    }));
  }

  return (
    <nav
      className="project-index"
      aria-label="Project index"
      onKeyDown={(event) => {
        if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey)
          return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        flip(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <div className="index-stack">
        {[2, 1].map((offset) => (
          <span
            key={offset}
            className={`index-sheet sheet-${offset}`}
            data-project-color={
              projects[(card.index + offset) % projects.length].cardColor
            }
            aria-hidden
          />
        ))}
        <a
          className="index-card"
          href={`#${project.id}`}
          aria-label={`Jump to ${project.title}`}
          draggable={false}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) {
              drag.current = null;
              return;
            }
            suppressClick.current = false;
            drag.current = {
              x: event.clientX,
              y: event.clientY,
              pointerId: event.pointerId,
              started: event.timeStamp,
            };
            if (event.pointerType === "mouse") {
              event.currentTarget.setPointerCapture(event.pointerId);
            }
          }}
          onPointerUp={(event) => {
            const start = drag.current;
            if (start?.pointerId !== event.pointerId) return;
            drag.current = null;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            suppressClick.current = Math.max(Math.abs(dx), Math.abs(dy)) > 12;
            if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy) * 1.4) {
              flip(dx < 0 ? 1 : -1);
            } else if (
              event.pointerType === "touch" &&
              !suppressClick.current &&
              event.timeStamp - start.started < 450
            ) {
              // Browsers can suppress their compatibility click immediately after a swipe.
              event.currentTarget.click();
              suppressClick.current = true;
            }
          }}
          onLostPointerCapture={() => {
            drag.current = null;
          }}
          onContextMenu={() => {
            drag.current = null;
          }}
          onClick={(event) => {
            if (event.detail && suppressClick.current) event.preventDefault();
            suppressClick.current = false;
          }}
        >
          <div
            className="index-print"
            key={project.id}
            data-project-color={project.cardColor}
            data-direction={card.direction}
          >
            <div className="index-legend">
              <span>Project index</span>
              <span>
                {String(card.index + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <div className="index-project">
              <span className="index-name">{project.title}</span>
              <span className="index-thumbnail">
                <PreviewGlass src={project.image} darkSrc={project.darkImage} />
                <span className="project-image-viewport">
                  <ThemedImage
                    src={project.image}
                    darkSrc={project.darkImage}
                    alt=""
                    fill
                    sizes="96px"
                    draggable={false}
                  />
                </span>
              </span>
            </div>
            <span className="index-destination">
              View project <ArrowDownRight size={17} aria-hidden />
            </span>
          </div>
        </a>
      </div>
      <div className="index-controls">
        <span aria-hidden>
          <span className="hint-mouse">Drag to flip</span>
          <span className="hint-touch">Swipe to flip</span>
        </span>
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => flip(-1)}
        >
          <ArrowLeft aria-hidden />
        </button>
        <button type="button" aria-label="Next project" onClick={() => flip(1)}>
          <ArrowRight aria-hidden />
        </button>
      </div>
      <span className="sr-only" role="status">
        {project.title}, {card.index + 1} of {projects.length}
      </span>
    </nav>
  );
}
