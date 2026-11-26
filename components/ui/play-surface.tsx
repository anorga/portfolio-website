"use client";
import { useRef, type ReactNode } from "react";
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
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const tiltX = useSpring(0, { stiffness: 130, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 130, damping: 22 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollTilt = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [12 * intensity, 0, -5 * intensity],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [70 * intensity, 0, -30 * intensity],
  );
  const rotateX = useTransform(
    [tiltX, scrollTilt],
    (values) => Number(values[0]) + Number(values[1]),
  );
  return (
    <motion.div
      ref={ref}
      className={`play-surface ${className}`}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        y: reduced ? 0 : y,
        transformPerspective: 1200,
      }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        rotateY.set(
          ((event.clientX - box.left) / box.width - 0.5) * 10 * intensity,
        );
        tiltX.set(
          -((event.clientY - box.top) / box.height - 0.5) * 10 * intensity,
        );
      }}
      onPointerLeave={() => {
        tiltX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
