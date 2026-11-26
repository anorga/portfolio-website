"use client";
import { useRef, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export function PlaySurface({
  children,
  className = "",
  scrollIntensity = 1,
}: {
  children: ReactNode;
  className?: string;
  scrollIntensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const tiltX = useSpring(0, { stiffness: 220, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 25 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollTilt = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [12 * scrollIntensity, 0, -5 * scrollIntensity],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [70 * scrollIntensity, 0, -30 * scrollIntensity],
  );
  const rotateX = useTransform(
    [tiltX, scrollTilt],
    (values) => Number(values[0]) + Number(values[1]),
  );
  function tiltToPointer(event: PointerEvent<HTMLDivElement>) {
    if (reduced || !event.isPrimary) return;
    const touch = event.pointerType === "touch";
    if (touch && !event.buttons) return;

    // Measure the stationary wrapper so the moving face cannot steer its own tilt.
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const x = Math.max(-1, Math.min(1, 2 * (event.clientX - box.left) / box.width - 1));
    const y = Math.max(-1, Math.min(1, 2 * (event.clientY - box.top) / box.height - 1));
    rotateY.set(x * (touch ? 11 : 9));
    tiltX.set(-y * (touch ? 8 : 7));
  }

  function settle() {
    tiltX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={ref}
      className={`play-surface ${className}`}
      onPointerEnter={tiltToPointer}
      onPointerDown={tiltToPointer}
      onPointerMove={tiltToPointer}
      onPointerUp={(event) => {
        if (event.isPrimary && event.pointerType !== "mouse") settle();
      }}
      onPointerCancel={settle}
      onPointerLeave={settle}
    >
      <motion.div
        className="play-surface-face"
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          y: reduced ? 0 : y,
          transformPerspective: 1200,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
