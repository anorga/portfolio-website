"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { createCodeSculpture } from "@/lib/code-sculpture";
import { codeBird } from "@/lib/code-bird";
import { MotionTitle } from "@/components/ui/motion-system";

export function CodePlayground() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<ReturnType<typeof createCodeSculpture>>(undefined);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!canvas.current || reducedMotion === null) return;
    const scene = createCodeSculpture(canvas.current, codeBird, reducedMotion);
    controller.current = scene;
    return () => {
      scene?.destroy();
      controller.current = undefined;
    };
  }, [reducedMotion]);
  useEffect(() => {
    controller.current?.setPaused(paused);
  }, [paused, reducedMotion]);

  return (
    <section
      id="code-playground"
      className="code-playground"
      aria-labelledby="code-art-title"
    >
      <div className="page-width">
        <div className="code-art-heading">
          <div>
            <p className="eyebrow">Creative coding / Live experiment</p>
            <MotionTitle
              id="code-art-title"
              lines={["a flight of", "imagination."]}
            />
          </div>
          <p>
            Made from code.
            <br />
            Moved by you.
          </p>
        </div>
        <div className="code-art-stage">
          <canvas
            ref={canvas}
            className="code-art-canvas"
            role="img"
            aria-label="An origami crane formed from tiny source-code characters, slowly turning and flapping its folded wings."
          />
          <span className="code-art-bracket bracket-left" aria-hidden>
            {"{"}
          </span>
          <span className="code-art-bracket bracket-right" aria-hidden>
            {"}"}
          </span>
        </div>
        <div className="code-art-controls">
          <p>
            {reducedMotion ? (
              "A little imagination, written in code."
            ) : (
              <>
                <span className="hint-mouse">
                  Move your cursor through the bird.
                </span>
                <span className="hint-touch">
                  Move your finger through the bird.
                </span>
              </>
            )}
          </p>
          {!reducedMotion && (
            <div>
              <button
                className="button button-primary"
                type="button"
                disabled={paused}
                onClick={() => controller.current?.scatter()}
              >
                <RotateCcw size={15} aria-hidden /> Scatter & reform
              </button>
              <button
                className="icon-button"
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={
                  paused ? "Play code animation" : "Pause code animation"
                }
                aria-pressed={paused}
              >
                {paused ? (
                  <Play size={18} aria-hidden />
                ) : (
                  <Pause size={18} aria-hidden />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
