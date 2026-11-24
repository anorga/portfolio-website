"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { createLiquidType } from "@/lib/liquid-type";

export function KineticType({
  text = "chris anorga.",
  closing = false,
}: {
  text?: string;
  closing?: boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion !== false || !stage.current || !canvas.current) return;
    return createLiquidType(stage.current, canvas.current);
  }, [reducedMotion, text]);
  const Tag = closing ? "h2" : "h1";
  return (
    <div className={`liquid-stage${closing ? " liquid-closing" : ""}`}>
      <div className="liquid-ink" ref={stage}>
        <Tag
          id={closing ? "contact-title" : "intro-title"}
          className="liquid-word"
          aria-label={text}
        >
          {text.split(" ").map((word, index) => (
            <span className="liquid-word-group" key={index} aria-hidden>
              {Array.from(word).map((letter, i) => (
                <span className="liquid-glyph" key={i}>
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </Tag>
        <canvas ref={canvas} className="liquid-canvas" aria-hidden />
      </div>
      {!closing && (
        <p className="liquid-hint">
          <span className="hint-spark" aria-hidden>
            +
          </span>{" "}
          <span className="hint-mouse">Move your cursor.</span>
          <span className="hint-touch">Move your finger.</span> This type is
          alive.
        </p>
      )}
    </div>
  );
}
