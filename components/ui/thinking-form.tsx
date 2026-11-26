"use client";

import { useEffect, useId, useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { MODE_FRAMES, resolvePreset, type OrbState } from "thinking-orbs";
import { paintFrame } from "thinking-orbs/engine";

const forms: OrbState[] = [
  "weaving",
  "solving",
  "composing",
  "connecting",
  "shaping",
  "listening",
  "searching",
  "breathing",
  "working",
];

// The original ThinkingOrbs engine, painted at the element's actual resolution.
// Keep the tuned 64-point geometry while giving larger portfolio artwork crisp dots.
export function ThinkingForm({
  className = "",
  initial = "weaving",
  interactive = false,
}: {
  className?: string;
  initial?: OrbState;
  interactive?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState(initial);
  const statusId = useId();
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 110, damping: 16 });
  const y = useSpring(my, { stiffness: 110, damping: 16 });

  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext("2d");
    if (!element || !ctx || reduced === null) return;
    const preset = resolvePreset(form, 64);
    let raf = 0;
    let visible = false;
    let dark = document.documentElement.classList.contains("dark");
    const readTint = () => {
      const [r, g, b] = getComputedStyle(element)
        .getPropertyValue("--ink-color")
        .split(",")
        .map(Number);
      return { r, g, b };
    };
    let tint = readTint();
    let width = 0;
    const paint = (time: number) => {
      ctx.setTransform(width / 64, 0, 0, width / 64, 0, 0);
      ctx.clearRect(0, 0, 64, 64);
      const geometry = MODE_FRAMES[preset.mode](
        64,
        reduced ? 0.6 : time * 0.001 * preset.speed,
        preset.opts,
      );
      paintFrame(ctx, geometry, dark, tint);
    };
    let lastPaint = -Infinity;
    const tick = (time: number) => {
      if (time - lastPaint >= 1000 / 30 - 1) {
        paint(time);
        lastPaint = time;
      }
      raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (!width || !visible || document.hidden) return;
      paint(performance.now());
      if (!reduced) raf = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      width = Math.round(
        element.getBoundingClientRect().width *
          Math.min(devicePixelRatio || 1, 2),
      );
      element.width = element.height = width;
      sync();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const theme = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark");
      tint = readTint();
      sync();
    });
    resize.observe(element);
    intersection.observe(element);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      intersection.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [form, reduced]);

  const artwork = (
    <motion.canvas
      ref={canvas}
      aria-hidden
      style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
    />
  );
  if (!interactive)
    return (
      <div className={`thinking-form ${className}`} aria-hidden>
        {artwork}
      </div>
    );
  const position = forms.indexOf(form) + 1;
  return (
    <div className={`thinking-form ${className}`}>
      <button
        type="button"
        className="orb-switch"
        aria-label="Morph it into the next orb shape"
        aria-describedby={statusId}
        onClick={() =>
          setForm(
            (current) => forms[(forms.indexOf(current) + 1) % forms.length],
          )
        }
      >
        <span
          className="orb-art"
          onPointerMove={(event) => {
            if (reduced || event.pointerType !== "mouse") return;
            const box = event.currentTarget.getBoundingClientRect();
            mx.set((event.clientX - box.left - box.width / 2) * 0.14);
            my.set((event.clientY - box.top - box.height / 2) * 0.14);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          {artwork}
        </span>
        <span className="orb-controls">
          <span className="orb-readout" aria-hidden>
            <span className="orb-count">
              {String(position).padStart(2, "0")} /{" "}
              {String(forms.length).padStart(2, "0")}
            </span>
            <span className="orb-name" key={form}>
              {form}
            </span>
          </span>
          <span className="orb-trigger">
            Morph it <RotateCw size={16} aria-hidden />
          </span>
        </span>
      </button>
      <span id={statusId} className="sr-only" role="status" aria-atomic="true">
        {form}, shape {position} of {forms.length}
      </span>
    </div>
  );
}
